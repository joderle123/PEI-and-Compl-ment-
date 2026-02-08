// =============================================================================
// IslandTravel.tsx
// 3D animated travel scene between islands (boat / airplane)
// Inner Worlds - Social-Emotional Learning Game
// =============================================================================

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../stores/gameStore';
import type { IslandId } from '../../types';

// ---------------------------------------------------------------------------
// Island display data
// ---------------------------------------------------------------------------

const ISLAND_INFO: Record<IslandId, { name: string; emoji: string; color: string }> = {
  volcano: { name: 'Vulkaninsel', emoji: '\u{1F30B}', color: '#FF6B35' },
  ocean: { name: 'Ozean-Insel', emoji: '\u{1F30A}', color: '#4A90D9' },
  forest: { name: 'Wald-Insel', emoji: '\u{1F33F}', color: '#4CAF50' },
  mountain: { name: 'Berg-Insel', emoji: '\u{1F3D4}\u{FE0F}', color: '#8D6E63' },
  garden: { name: 'Garten-Insel', emoji: '\u{1F338}', color: '#F48FB1' },
  night: { name: 'Nacht-Insel', emoji: '\u{1F319}', color: '#7E57C2' },
  rainbow: { name: 'Regenbogen-Insel', emoji: '\u{1F308}', color: '#FF7043' },
  home: { name: 'Heimat-Insel', emoji: '\u{1F3E0}', color: '#FFB74D' },
};

// ---------------------------------------------------------------------------
// Travel duration
// ---------------------------------------------------------------------------

const BOAT_DURATION = 6000; // 6 seconds
const AIRPLANE_DURATION = 5000; // 5 seconds

// ---------------------------------------------------------------------------
// Animated Ocean Plane
// ---------------------------------------------------------------------------

function OceanSurface({ color }: { color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const geoRef = useRef<THREE.PlaneGeometry>(null);

  useFrame(({ clock }) => {
    if (!geoRef.current) return;
    const t = clock.getElapsedTime();
    const pos = geoRef.current.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      pos.setY(
        i,
        Math.sin(x * 0.3 + t * 0.8) * 0.4 +
          Math.sin(z * 0.2 + t * 0.6) * 0.3 +
          Math.sin((x + z) * 0.15 + t * 1.2) * 0.2,
      );
    }
    pos.needsUpdate = true;
    geoRef.current.computeVertexNormals();
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
      <planeGeometry ref={geoRef} args={[200, 200, 80, 80]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.85}
        side={THREE.DoubleSide}
        roughness={0.3}
        metalness={0.1}
      />
    </mesh>
  );
}

// ---------------------------------------------------------------------------
// Boat model (low-poly)
// ---------------------------------------------------------------------------

function BoatModel({ progress, color }: { progress: number; color: string }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    // Forward movement along Z
    groupRef.current.position.z = -40 + progress * 80;
    // Bobbing
    groupRef.current.position.y = Math.sin(t * 1.5) * 0.3 + 0.2;
    // Gentle roll
    groupRef.current.rotation.z = Math.sin(t * 1.2) * 0.05;
    groupRef.current.rotation.x = Math.sin(t * 0.8) * 0.03;
  });

  return (
    <group ref={groupRef} position={[0, 0.2, -40]}>
      {/* Hull */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 0.8, 5]} />
        <meshStandardMaterial color="#5c3a1e" roughness={0.8} />
      </mesh>
      {/* Hull bottom taper */}
      <mesh position={[0, -0.3, 0]} scale={[0.7, 0.4, 1]}>
        <boxGeometry args={[2, 0.8, 5]} />
        <meshStandardMaterial color="#4a2e16" roughness={0.9} />
      </mesh>
      {/* Deck */}
      <mesh position={[0, 0.45, 0]}>
        <boxGeometry args={[1.8, 0.1, 4.5]} />
        <meshStandardMaterial color="#8B6914" roughness={0.7} />
      </mesh>
      {/* Mast */}
      <mesh position={[0, 2, -0.3]}>
        <cylinderGeometry args={[0.06, 0.08, 3.5, 8]} />
        <meshStandardMaterial color="#3e2710" roughness={0.9} />
      </mesh>
      {/* Sail */}
      <mesh position={[0.5, 2.2, -0.3]} rotation={[0, 0.2, 0]}>
        <planeGeometry args={[2.2, 2.5]} />
        <meshStandardMaterial
          color={color}
          side={THREE.DoubleSide}
          transparent
          opacity={0.9}
          emissive={color}
          emissiveIntensity={0.15}
        />
      </mesh>
      {/* Cabin */}
      <mesh position={[0, 0.85, 1.2]}>
        <boxGeometry args={[1.2, 0.7, 1.2]} />
        <meshStandardMaterial color="#6b4423" roughness={0.7} />
      </mesh>
      {/* Cabin roof */}
      <mesh position={[0, 1.3, 1.2]}>
        <boxGeometry args={[1.4, 0.1, 1.4]} />
        <meshStandardMaterial color="#4a2e16" roughness={0.8} />
      </mesh>
      {/* Bow decoration */}
      <mesh position={[0, 0.3, -2.8]}>
        <coneGeometry args={[0.3, 1, 6]} />
        <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.3} />
      </mesh>
      {/* Wake particles (simple white planes behind) */}
      {[0, 1, 2, 3].map((i) => (
        <mesh key={`wake-${i}`} position={[(i % 2 === 0 ? 0.5 : -0.5) * (1 + i * 0.2), -0.2, 3 + i * 0.8]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.3 + i * 0.15, 8]} />
          <meshStandardMaterial
            color="white"
            transparent
            opacity={0.3 - i * 0.06}
            emissive="white"
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
      {/* Player on boat */}
      <group position={[0, 1, 0.3]}>
        {/* Body */}
        <mesh position={[0, 0.4, 0]}>
          <boxGeometry args={[0.5, 0.6, 0.3]} />
          <meshStandardMaterial color="#4488cc" />
        </mesh>
        {/* Head */}
        <mesh position={[0, 0.9, 0]}>
          <sphereGeometry args={[0.22, 12, 12]} />
          <meshStandardMaterial color="#f4c69a" />
        </mesh>
        {/* Hat */}
        <mesh position={[0, 1.1, 0]}>
          <cylinderGeometry args={[0.18, 0.25, 0.15, 8]} />
          <meshStandardMaterial color="#2a6040" />
        </mesh>
      </group>
    </group>
  );
}

// ---------------------------------------------------------------------------
// Airplane model (low-poly)
// ---------------------------------------------------------------------------

function AirplaneModel({ progress, color }: { progress: number; color: string }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    // Forward along Z, ascending then descending arc
    groupRef.current.position.z = -50 + progress * 100;
    const arcHeight = Math.sin(progress * Math.PI) * 18;
    groupRef.current.position.y = 5 + arcHeight;
    // Gentle banking
    groupRef.current.rotation.z = Math.sin(t * 0.8) * 0.04;
    // Slight pitch based on arc
    const pitchPhase = Math.cos(progress * Math.PI) * 0.15;
    groupRef.current.rotation.x = pitchPhase;
  });

  return (
    <group ref={groupRef} position={[0, 5, -50]}>
      {/* Fuselage */}
      <mesh>
        <capsuleGeometry args={[0.5, 4, 8, 16]} />
        <meshStandardMaterial color="white" roughness={0.3} metalness={0.2} />
      </mesh>
      {/* Nose */}
      <mesh position={[0, 0, -2.8]}>
        <coneGeometry args={[0.5, 1.2, 12]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} />
      </mesh>
      {/* Wings */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.12, 7, 1.5]} />
        <meshStandardMaterial color="#e0e0e0" roughness={0.4} metalness={0.3} />
      </mesh>
      {/* Tail wing horizontal */}
      <mesh position={[0, 0.3, 2.5]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.08, 2.5, 0.8]} />
        <meshStandardMaterial color="#e0e0e0" roughness={0.4} />
      </mesh>
      {/* Tail wing vertical */}
      <mesh position={[0, 0.8, 2.5]}>
        <boxGeometry args={[0.08, 1.5, 0.8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.15} />
      </mesh>
      {/* Windows */}
      {[-1.2, -0.6, 0, 0.6, 1.2].map((zOff, i) => (
        <mesh key={`win-${i}`} position={[0.48, 0.15, zOff]}>
          <boxGeometry args={[0.08, 0.18, 0.25]} />
          <meshStandardMaterial color="#88ccff" emissive="#88ccff" emissiveIntensity={0.4} transparent opacity={0.8} />
        </mesh>
      ))}
      {/* Engines */}
      {[-2, 2].map((x, i) => (
        <group key={`engine-${i}`} position={[x, -0.15, 0]}>
          <mesh>
            <cylinderGeometry args={[0.25, 0.3, 1, 12]} />
            <meshStandardMaterial color="#888" roughness={0.5} metalness={0.5} />
          </mesh>
          {/* Engine glow */}
          <mesh position={[0, 0.6, 0]}>
            <sphereGeometry args={[0.18, 8, 8]} />
            <meshStandardMaterial
              color="#ff6600"
              emissive="#ff6600"
              emissiveIntensity={1.5}
              transparent
              opacity={0.6}
            />
          </mesh>
        </group>
      ))}
      {/* Player visible in cockpit */}
      <mesh position={[0, 0.1, -1.8]}>
        <sphereGeometry args={[0.18, 10, 10]} />
        <meshStandardMaterial color="#f4c69a" />
      </mesh>
    </group>
  );
}

// ---------------------------------------------------------------------------
// Distant island silhouette
// ---------------------------------------------------------------------------

function DistantIsland({
  position,
  color,
  scale,
}: {
  position: [number, number, number];
  color: string;
  scale: number;
}) {
  return (
    <group position={position}>
      {/* Main mountain */}
      <mesh>
        <coneGeometry args={[3 * scale, 4 * scale, 8]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.1}
          transparent
          opacity={0.7}
        />
      </mesh>
      {/* Secondary peak */}
      <mesh position={[1.5 * scale, -0.5 * scale, 0.5 * scale]}>
        <coneGeometry args={[2 * scale, 3 * scale, 6]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.5}
        />
      </mesh>
      {/* Base land mass */}
      <mesh position={[0, -2 * scale, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[5 * scale, 12]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.4}
        />
      </mesh>
      {/* Glow ring */}
      <mesh position={[0, -1.5 * scale, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[4.5 * scale, 6 * scale, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          transparent
          opacity={0.2}
        />
      </mesh>
    </group>
  );
}

// ---------------------------------------------------------------------------
// Animated clouds
// ---------------------------------------------------------------------------

function TravelClouds({ isAirplane }: { isAirplane: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  const clouds = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: -30 + Math.random() * 60,
        y: isAirplane ? 8 + Math.random() * 20 : 6 + Math.random() * 8,
        z: -60 + Math.random() * 120,
        scale: 1 + Math.random() * 3,
        speed: 0.2 + Math.random() * 0.5,
      })),
    [isAirplane],
  );

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.children.forEach((child, i) => {
      if (i < clouds.length) {
        child.position.x = clouds[i].x + Math.sin(t * clouds[i].speed + i) * 2;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {clouds.map((cloud) => (
        <mesh key={cloud.id} position={[cloud.x, cloud.y, cloud.z]}>
          <sphereGeometry args={[cloud.scale, 8, 8]} />
          <meshStandardMaterial
            color="white"
            transparent
            opacity={0.15}
            emissive="white"
            emissiveIntensity={0.05}
          />
        </mesh>
      ))}
    </group>
  );
}

// ---------------------------------------------------------------------------
// Seagulls / birds
// ---------------------------------------------------------------------------

function FlyingBirds() {
  const groupRef = useRef<THREE.Group>(null);

  const birds = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        id: i,
        x: -15 + Math.random() * 30,
        y: 5 + Math.random() * 10,
        z: -20 + Math.random() * 40,
        speed: 1 + Math.random() * 2,
        wingPhase: Math.random() * Math.PI * 2,
      })),
    [],
  );

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.children.forEach((birdGroup, i) => {
      if (i < birds.length) {
        const bird = birds[i];
        birdGroup.position.x = bird.x + Math.sin(t * 0.3 + i * 2) * 8;
        birdGroup.position.y = bird.y + Math.sin(t * bird.speed + bird.wingPhase) * 0.5;
        birdGroup.position.z = bird.z + Math.cos(t * 0.2 + i) * 5;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {birds.map((bird) => (
        <group key={bird.id} position={[bird.x, bird.y, bird.z]}>
          {/* Left wing */}
          <mesh position={[-0.3, 0, 0]} rotation={[0, 0, 0.3]}>
            <boxGeometry args={[0.5, 0.02, 0.15]} />
            <meshStandardMaterial color="#222" />
          </mesh>
          {/* Right wing */}
          <mesh position={[0.3, 0, 0]} rotation={[0, 0, -0.3]}>
            <boxGeometry args={[0.5, 0.02, 0.15]} />
            <meshStandardMaterial color="#222" />
          </mesh>
          {/* Body */}
          <mesh>
            <sphereGeometry args={[0.08, 6, 6]} />
            <meshStandardMaterial color="#333" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// ---------------------------------------------------------------------------
// Camera controller for travel
// ---------------------------------------------------------------------------

function TravelCamera({ vehicle, progress }: { vehicle: 'boat' | 'airplane'; progress: number }) {
  useFrame(({ camera, clock }) => {
    const t = clock.getElapsedTime();

    if (vehicle === 'boat') {
      const targetZ = -40 + progress * 80;
      camera.position.x = 8 + Math.sin(t * 0.3) * 1;
      camera.position.y = 6 + Math.sin(t * 0.2) * 0.5;
      camera.position.z = targetZ + 12;
      camera.lookAt(0, 1, targetZ);
    } else {
      const targetZ = -50 + progress * 100;
      const arcHeight = Math.sin(progress * Math.PI) * 18;
      camera.position.x = 12 + Math.sin(t * 0.25) * 2;
      camera.position.y = 10 + arcHeight + Math.sin(t * 0.15) * 1;
      camera.position.z = targetZ + 18;
      camera.lookAt(0, 5 + arcHeight, targetZ);
    }
  });

  return null;
}

// ---------------------------------------------------------------------------
// Scene lighting
// ---------------------------------------------------------------------------

function TravelLighting({ vehicle }: { vehicle: 'boat' | 'airplane' }) {
  const sunY = vehicle === 'airplane' ? 40 : 20;

  return (
    <>
      <ambientLight intensity={0.4} color="#8888cc" />
      <directionalLight
        position={[15, sunY, -10]}
        intensity={1.2}
        color="#ffddaa"
        castShadow
      />
      <directionalLight
        position={[-10, 8, 5]}
        intensity={0.3}
        color="#aaccff"
      />
      <hemisphereLight
        args={['#334477', '#112233', 0.5]}
      />
      {/* Sun disc */}
      <mesh position={[15, sunY, -60]}>
        <sphereGeometry args={[3, 16, 16]} />
        <meshBasicMaterial color="#ffcc66" transparent opacity={0.4} />
      </mesh>
      <mesh position={[15, sunY, -60]}>
        <sphereGeometry args={[5, 16, 16]} />
        <meshBasicMaterial color="#ffcc66" transparent opacity={0.1} />
      </mesh>
    </>
  );
}

// ---------------------------------------------------------------------------
// Main 3D Scene
// ---------------------------------------------------------------------------

function TravelScene({
  vehicle,
  progress,
  originColor,
  destColor,
}: {
  vehicle: 'boat' | 'airplane';
  progress: number;
  originColor: string;
  destColor: string;
}) {
  const oceanColor = vehicle === 'boat' ? '#1a4a7a' : '#0d2a4a';

  return (
    <>
      <TravelCamera vehicle={vehicle} progress={progress} />
      <TravelLighting vehicle={vehicle} />

      {/* Fog */}
      <fog attach="fog" args={['#0a1530', 30, 120]} />

      {/* Ocean */}
      <OceanSurface color={oceanColor} />

      {/* Origin island (behind, fading) */}
      <DistantIsland
        position={[-(5 - progress * 15), -1, -50]}
        color={originColor}
        scale={2 - progress * 1.5}
      />

      {/* Destination island (ahead, growing) */}
      <DistantIsland
        position={[(progress * 10 - 5), -1, 50 - progress * 20]}
        color={destColor}
        scale={0.5 + progress * 2}
      />

      {/* Vehicle */}
      {vehicle === 'boat' ? (
        <BoatModel progress={progress} color={destColor} />
      ) : (
        <AirplaneModel progress={progress} color={destColor} />
      )}

      {/* Clouds */}
      <TravelClouds isAirplane={vehicle === 'airplane'} />

      {/* Birds */}
      <FlyingBirds />

      {/* Post processing */}
      <EffectComposer>
        <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} intensity={0.5} />
        <Vignette eskil={false} offset={0.1} darkness={0.6} />
      </EffectComposer>
    </>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function IslandTravel() {
  const { travelOrigin, travelDestination, travelVehicle, completeTravel, setScreen } =
    useGameStore();

  const [progress, setProgress] = useState(0);
  const [showArrival, setShowArrival] = useState(false);
  const startTimeRef = useRef(Date.now());

  const vehicle = travelVehicle ?? 'boat';
  const duration = vehicle === 'boat' ? BOAT_DURATION : AIRPLANE_DURATION;

  const originInfo = travelOrigin ? ISLAND_INFO[travelOrigin] : null;
  const destInfo = travelDestination ? ISLAND_INFO[travelDestination] : null;

  // Animation loop
  useEffect(() => {
    startTimeRef.current = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const p = Math.min(elapsed / duration, 1);
      // Ease in-out cubic
      const eased = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      setProgress(eased);

      if (p < 1) {
        requestAnimationFrame(animate);
      } else {
        setShowArrival(true);
      }
    };

    requestAnimationFrame(animate);
  }, [duration]);

  // Auto-complete after arrival message
  useEffect(() => {
    if (showArrival) {
      const timer = setTimeout(() => {
        completeTravel();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [showArrival, completeTravel]);

  const handleSkip = useCallback(() => {
    completeTravel();
  }, [completeTravel]);

  const handleCancel = useCallback(() => {
    setScreen('island-map');
  }, [setScreen]);

  if (!originInfo || !destInfo) return null;

  return (
    <div className="h-screen w-screen relative overflow-hidden bg-[#0a1530]">
      {/* 3D Canvas */}
      <Canvas
        shadows
        camera={{ position: [8, 6, 12], fov: 55 }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.0,
        }}
        dpr={[1, 2]}
        style={{ width: '100%', height: '100%' }}
      >
        <TravelScene
          vehicle={vehicle}
          progress={progress}
          originColor={originInfo.color}
          destColor={destInfo.color}
        />
      </Canvas>

      {/* UI Overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 10 }}>
        {/* Top bar: origin -> destination */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute top-6 left-1/2 -translate-x-1/2"
        >
          <div className="glass-panel rounded-2xl px-8 py-4 border border-amber-400/20 flex items-center gap-4">
            <div className="text-center">
              <div className="text-2xl">{originInfo.emoji}</div>
              <div className="text-xs text-amber-200/70 font-title">{originInfo.name}</div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-16 h-0.5 rounded-full" style={{ background: `linear-gradient(90deg, ${originInfo.color}, ${destInfo.color})` }} />
              <div className="text-xl">
                {vehicle === 'boat' ? '\u{26F5}' : '\u{2708}\u{FE0F}'}
              </div>
              <div className="w-16 h-0.5 rounded-full" style={{ background: `linear-gradient(90deg, ${originInfo.color}, ${destInfo.color})` }} />
            </div>

            <div className="text-center">
              <div className="text-2xl">{destInfo.emoji}</div>
              <div className="text-xs text-amber-200/70 font-title">{destInfo.name}</div>
            </div>
          </div>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-24 left-1/2 -translate-x-1/2 w-80"
        >
          <div className="glass-panel rounded-xl px-4 py-3 border border-amber-400/15">
            <div className="flex justify-between text-xs text-amber-200/60 mb-1.5 font-title">
              <span>{vehicle === 'boat' ? 'Seereise' : 'Flugreise'}</span>
              <span>{Math.round(progress * 100)}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-black/40 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${progress * 100}%`,
                  background: `linear-gradient(90deg, ${originInfo.color}, ${destInfo.color})`,
                  boxShadow: `0 0 8px ${destInfo.color}80`,
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* Skip button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 right-8 pointer-events-auto"
        >
          <button
            onClick={handleSkip}
            className="glass-panel px-4 py-2 rounded-lg text-amber-200/60 text-sm border border-amber-400/15 hover:border-amber-400/30 hover:text-amber-200/90 transition-all"
          >
            Überspringen →
          </button>
        </motion.div>

        {/* Cancel button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-8 pointer-events-auto"
        >
          <button
            onClick={handleCancel}
            className="glass-panel px-4 py-2 rounded-lg text-amber-200/40 text-sm border border-amber-400/10 hover:border-amber-400/20 hover:text-amber-200/70 transition-all"
          >
            ← Karte
          </button>
        </motion.div>

        {/* Travel tip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-24 left-1/2 -translate-x-1/2 mt-2"
          style={{ marginBottom: '-2rem' }}
        >
          <TravelTip vehicle={vehicle} destName={destInfo.name} />
        </motion.div>

        {/* Arrival overlay */}
        <AnimatePresence>
          {showArrival && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="glass-panel rounded-3xl px-12 py-8 border border-amber-400/30 text-center"
              >
                <div className="text-5xl mb-3">{destInfo.emoji}</div>
                <h2
                  className="text-2xl font-title text-golden mb-2"
                  style={{ textShadow: '0 0 10px rgba(255,215,0,0.4)' }}
                >
                  Willkommen auf der
                </h2>
                <h1
                  className="text-3xl font-title text-golden font-bold"
                  style={{ textShadow: '0 0 15px rgba(255,215,0,0.5)' }}
                >
                  {destInfo.name}!
                </h1>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Travel tip component
// ---------------------------------------------------------------------------

function TravelTip({ vehicle, destName }: { vehicle: 'boat' | 'airplane'; destName: string }) {
  const tips = useMemo(() => {
    if (vehicle === 'boat') {
      return [
        `Die Wellen tragen dich sanft zur ${destName}...`,
        'Jede Reise beginnt mit einem einzigen Schritt.',
        'Das Meer verbindet alle Inseln miteinander.',
        'Atme tief ein - die Seeluft tut gut!',
      ];
    }
    return [
      `Du fliegst hoch über den Wolken zur ${destName}...`,
      'Von oben sieht die Welt ganz anders aus.',
      'Manchmal muss man Abstand nehmen, um klar zu sehen.',
      'Die Wolken erzählen Geschichten, wenn man genau hinsieht.',
    ];
  }, [vehicle, destName]);

  const [tipIndex] = useState(() => Math.floor(Math.random() * tips.length));

  return (
    <p className="text-amber-200/40 text-xs text-center italic max-w-64">
      {tips[tipIndex]}
    </p>
  );
}
