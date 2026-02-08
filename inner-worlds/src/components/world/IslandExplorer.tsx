// =============================================================================
// IslandExplorer.tsx
// 3D island exploration component using Three.js / @react-three/fiber / drei
// Inner Worlds - Social-Emotional Learning Game (ages 10-15, German language)
// =============================================================================

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useGameStore } from '../../stores/gameStore';
import { getIslandData } from '../../data';
import type { IslandId } from '../../types';

// ---------------------------------------------------------------------------
// Types (no enums per erasableSyntaxOnly)
// ---------------------------------------------------------------------------

interface IslandExplorerProps {
  onStartMiniGame: (gameType: string) => void;
  onBack: () => void;
}

interface NPCData {
  id: string;
  name: string;
  emoji: string;
  description: string;
  backstory: string;
}

interface ScenarioData {
  id: string;
  title: string;
}

interface ActivityData {
  id: string;
  title: string;
}

type TreeVariant =
  | 'dead'
  | 'palm'
  | 'pine'
  | 'short'
  | 'cherry'
  | 'mushroom'
  | 'crystal'
  | 'fruit';

interface IslandTheme {
  groundColor: string;
  groundEdgeColor: string;
  ambientColor: string;
  ambientIntensity: number;
  sunColor: string;
  sunIntensity: number;
  sunPosition: [number, number, number];
  fogColor: string;
  fogNear: number;
  fogFar: number;
  skyColor: string;
  treeVariant: TreeVariant;
  trunkColor: string;
  foliageColor: string;
  foliageSecondary: string;
  rockColor: string;
  playerAccent: string;
  treeCount: number;
  rockCount: number;
  decorationCount: number;
}

type Vec3 = [number, number, number];

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const MOVE_SPEED = 0.1;
const GROUND_SIZE = 35;
const INTERACT_DIST = 3.5;
const CAM_OFFSET = new THREE.Vector3(14, 16, 14);
const CAM_LERP = 0.04;

// Reusable temp vectors to avoid GC pressure in useFrame
const _moveDir = new THREE.Vector3();
const _desiredCam = new THREE.Vector3();
const _tmpVec = new THREE.Vector3();

// ---------------------------------------------------------------------------
// Seeded pseudo-random number generator (deterministic placement)
// ---------------------------------------------------------------------------

function makeRng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const SEED_MAP: Record<string, number> = {
  volcano: 101,
  ocean: 202,
  forest: 303,
  mountain: 404,
  garden: 505,
  night: 606,
  rainbow: 707,
  home: 808,
};

function generatePositions(
  count: number,
  seed: number,
  minR: number,
  maxR: number,
): Vec3[] {
  const rng = makeRng(seed);
  const result: Vec3[] = [];
  for (let i = 0; i < count; i++) {
    const angle = rng() * Math.PI * 2;
    const r = minR + rng() * (maxR - minR);
    result.push([Math.cos(angle) * r, 0, Math.sin(angle) * r]);
  }
  return result;
}

function generateNpcPositions(count: number, seed: number): Vec3[] {
  const rng = makeRng(seed + 5000);
  const result: Vec3[] = [];
  const sector = (Math.PI * 2) / Math.max(count, 1);
  for (let i = 0; i < count; i++) {
    const base = i * sector;
    const angle = base + rng() * sector * 0.5;
    const r = 8 + rng() * 10;
    result.push([Math.cos(angle) * r, 0, Math.sin(angle) * r]);
  }
  return result;
}

function generateMarkerPositions(count: number, seed: number): Vec3[] {
  const rng = makeRng(seed + 9000);
  const result: Vec3[] = [];
  const sector = (Math.PI * 2) / Math.max(count, 1);
  for (let i = 0; i < count; i++) {
    const base = i * sector + Math.PI / 4;
    const angle = base + rng() * sector * 0.4;
    const r = 6 + rng() * 15;
    result.push([Math.cos(angle) * r, 0.5, Math.sin(angle) * r]);
  }
  return result;
}

// ---------------------------------------------------------------------------
// Island theme configurations (all 8 islands)
// ---------------------------------------------------------------------------

const THEMES: Record<string, IslandTheme> = {
  volcano: {
    groundColor: '#3a2010',
    groundEdgeColor: '#1a0800',
    ambientColor: '#ff6b35',
    ambientIntensity: 0.35,
    sunColor: '#ff8844',
    sunIntensity: 0.8,
    sunPosition: [10, 20, 5],
    fogColor: '#1a0800',
    fogNear: 30,
    fogFar: 70,
    skyColor: '#330800',
    treeVariant: 'dead',
    trunkColor: '#1a1a1a',
    foliageColor: '#333333',
    foliageSecondary: '#222222',
    rockColor: '#4a3020',
    playerAccent: '#ff6b35',
    treeCount: 10,
    rockCount: 14,
    decorationCount: 8,
  },
  ocean: {
    groundColor: '#d4b896',
    groundEdgeColor: '#2e6ab0',
    ambientColor: '#87ceeb',
    ambientIntensity: 0.5,
    sunColor: '#ffffcc',
    sunIntensity: 1.0,
    sunPosition: [15, 25, 10],
    fogColor: '#4488bb',
    fogNear: 35,
    fogFar: 80,
    skyColor: '#87ceeb',
    treeVariant: 'palm',
    trunkColor: '#8B6914',
    foliageColor: '#2d8e2d',
    foliageSecondary: '#3aaa3a',
    rockColor: '#b0a090',
    playerAccent: '#4a90d9',
    treeCount: 7,
    rockCount: 10,
    decorationCount: 10,
  },
  forest: {
    groundColor: '#2d5a1e',
    groundEdgeColor: '#1a3a10',
    ambientColor: '#90ee90',
    ambientIntensity: 0.3,
    sunColor: '#fff8dc',
    sunIntensity: 0.65,
    sunPosition: [8, 18, 12],
    fogColor: '#1a3a1a',
    fogNear: 20,
    fogFar: 55,
    skyColor: '#4a7a4a',
    treeVariant: 'pine',
    trunkColor: '#5c3a1e',
    foliageColor: '#1e6e1e',
    foliageSecondary: '#2a8a2a',
    rockColor: '#555a50',
    playerAccent: '#4caf50',
    treeCount: 22,
    rockCount: 12,
    decorationCount: 12,
  },
  mountain: {
    groundColor: '#7a6a5a',
    groundEdgeColor: '#4a3a2a',
    ambientColor: '#c0c8d8',
    ambientIntensity: 0.4,
    sunColor: '#e8e0d8',
    sunIntensity: 0.85,
    sunPosition: [12, 22, 8],
    fogColor: '#8090a0',
    fogNear: 25,
    fogFar: 65,
    skyColor: '#8899aa',
    treeVariant: 'short',
    trunkColor: '#5c4030',
    foliageColor: '#3a6a30',
    foliageSecondary: '#4a7a40',
    rockColor: '#6a6060',
    playerAccent: '#8d6e63',
    treeCount: 6,
    rockCount: 18,
    decorationCount: 6,
  },
  garden: {
    groundColor: '#4a8a3a',
    groundEdgeColor: '#2a5a1a',
    ambientColor: '#ffc0cb',
    ambientIntensity: 0.5,
    sunColor: '#fff5ee',
    sunIntensity: 1.0,
    sunPosition: [10, 25, 10],
    fogColor: '#a8d8a8',
    fogNear: 35,
    fogFar: 80,
    skyColor: '#c8e0f8',
    treeVariant: 'cherry',
    trunkColor: '#6a4a2a',
    foliageColor: '#ffb7c5',
    foliageSecondary: '#ff99b0',
    rockColor: '#a0a0a0',
    playerAccent: '#ec407a',
    treeCount: 10,
    rockCount: 6,
    decorationCount: 14,
  },
  night: {
    groundColor: '#1a1030',
    groundEdgeColor: '#0d0820',
    ambientColor: '#9370db',
    ambientIntensity: 0.25,
    sunColor: '#c8b8ff',
    sunIntensity: 0.35,
    sunPosition: [5, 15, 10],
    fogColor: '#0d0820',
    fogNear: 20,
    fogFar: 50,
    skyColor: '#0a0618',
    treeVariant: 'mushroom',
    trunkColor: '#e0d8f0',
    foliageColor: '#9060c0',
    foliageSecondary: '#7040a0',
    rockColor: '#2a2040',
    playerAccent: '#7e57c2',
    treeCount: 12,
    rockCount: 8,
    decorationCount: 10,
  },
  rainbow: {
    groundColor: '#e8e0f0',
    groundEdgeColor: '#d0c0e0',
    ambientColor: '#ff80ff',
    ambientIntensity: 0.5,
    sunColor: '#ffffff',
    sunIntensity: 1.0,
    sunPosition: [10, 25, 10],
    fogColor: '#e0d0f0',
    fogNear: 30,
    fogFar: 80,
    skyColor: '#e0d0f0',
    treeVariant: 'crystal',
    trunkColor: '#c0c0c0',
    foliageColor: '#ff60ff',
    foliageSecondary: '#60c0ff',
    rockColor: '#d0b0e0',
    playerAccent: '#ff7043',
    treeCount: 10,
    rockCount: 10,
    decorationCount: 8,
  },
  home: {
    groundColor: '#6a8a4a',
    groundEdgeColor: '#4a5a2a',
    ambientColor: '#ffd700',
    ambientIntensity: 0.5,
    sunColor: '#fff8dc',
    sunIntensity: 0.95,
    sunPosition: [12, 20, 10],
    fogColor: '#c8d8b0',
    fogNear: 30,
    fogFar: 75,
    skyColor: '#87ceeb',
    treeVariant: 'fruit',
    trunkColor: '#5c3a20',
    foliageColor: '#2d8e2d',
    foliageSecondary: '#3aaa3a',
    rockColor: '#8a7a6a',
    playerAccent: '#ffb74d',
    treeCount: 12,
    rockCount: 8,
    decorationCount: 10,
  },
};

// ---------------------------------------------------------------------------
// 3D Sub-components: Ground
// ---------------------------------------------------------------------------

function Ground({ theme }: { theme: IslandTheme }) {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, -0.01, 0]}>
        <circleGeometry args={[GROUND_SIZE, 64]} />
        <meshStandardMaterial color={theme.groundColor} roughness={0.95} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        <ringGeometry args={[GROUND_SIZE - 2, GROUND_SIZE + 10, 64]} />
        <meshStandardMaterial
          color={theme.groundEdgeColor}
          transparent
          opacity={0.6}
          roughness={0.8}
        />
      </mesh>
      {/* Subtle ground patches for visual interest */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[6, 0.005, 4]} receiveShadow>
        <circleGeometry args={[7, 24]} />
        <meshStandardMaterial color={theme.groundColor} roughness={1} opacity={0.5} transparent />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-9, 0.005, -6]} receiveShadow>
        <circleGeometry args={[5, 24]} />
        <meshStandardMaterial color={theme.groundEdgeColor} roughness={1} opacity={0.3} transparent />
      </mesh>
      {/* Paths radiating from center */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <planeGeometry args={[1.4, 32]} />
        <meshStandardMaterial color={theme.groundEdgeColor} roughness={0.9} opacity={0.35} transparent />
      </mesh>
      <mesh rotation={[-Math.PI / 2, Math.PI / 3, 0]} position={[0, 0.01, 0]} receiveShadow>
        <planeGeometry args={[1.4, 30]} />
        <meshStandardMaterial color={theme.groundEdgeColor} roughness={0.9} opacity={0.3} transparent />
      </mesh>
      <mesh rotation={[-Math.PI / 2, -Math.PI / 3, 0]} position={[0, 0.01, 0]} receiveShadow>
        <planeGeometry args={[1.4, 28]} />
        <meshStandardMaterial color={theme.groundEdgeColor} roughness={0.9} opacity={0.25} transparent />
      </mesh>
      <mesh rotation={[-Math.PI / 2, Math.PI / 6, 0]} position={[0, 0.01, 0]} receiveShadow>
        <planeGeometry args={[1.0, 24]} />
        <meshStandardMaterial color={theme.groundEdgeColor} roughness={0.9} opacity={0.2} transparent />
      </mesh>
      {/* Extra ground patches for richness */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[12, 0.006, -8]} receiveShadow>
        <circleGeometry args={[4, 16]} />
        <meshStandardMaterial color={theme.groundEdgeColor} roughness={1} opacity={0.25} transparent />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-10, 0.006, 10]} receiveShadow>
        <circleGeometry args={[6, 16]} />
        <meshStandardMaterial color={theme.groundColor} roughness={1} opacity={0.4} transparent />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[5, 0.006, 15]} receiveShadow>
        <circleGeometry args={[3.5, 12]} />
        <meshStandardMaterial color={theme.groundEdgeColor} roughness={1} opacity={0.3} transparent />
      </mesh>
    </group>
  );
}

// ---------------------------------------------------------------------------
// 3D Sub-components: Tree (all 8 variants)
// ---------------------------------------------------------------------------

function Tree({
  position,
  variant,
  trunkColor,
  foliageColor,
  foliageSecondary,
  scale = 1,
}: {
  position: Vec3;
  variant: TreeVariant;
  trunkColor: string;
  foliageColor: string;
  foliageSecondary: string;
  scale?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);

  // Gentle sway animation for living trees
  useFrame((_state, delta) => {
    if (!groupRef.current) return;
    if (variant !== 'dead' && variant !== 'crystal') {
      groupRef.current.rotation.z = Math.sin(Date.now() * 0.001 + position[0]) * 0.02;
      groupRef.current.rotation.x = Math.sin(Date.now() * 0.0008 + position[2]) * 0.015;
    }
    // Crystal trees slowly rotate
    if (variant === 'crystal' && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Dead tree: charred trunk + spiky dark cone */}
      {variant === 'dead' && (
        <>
          <mesh position={[0, 1.2, 0]} castShadow>
            <cylinderGeometry args={[0.12, 0.2, 2.4, 6]} />
            <meshStandardMaterial color={trunkColor} roughness={0.95} />
          </mesh>
          <mesh position={[0, 2.6, 0]} castShadow>
            <coneGeometry args={[0.5, 1.2, 5]} />
            <meshStandardMaterial color={foliageColor} roughness={0.9} />
          </mesh>
          {/* Branch stubs */}
          <mesh position={[0.3, 1.8, 0]} rotation={[0, 0, 0.8]} castShadow>
            <cylinderGeometry args={[0.04, 0.06, 0.6, 4]} />
            <meshStandardMaterial color={trunkColor} roughness={0.95} />
          </mesh>
        </>
      )}

      {/* Palm tree: curved trunk + green sphere clusters */}
      {variant === 'palm' && (
        <>
          <mesh position={[0.2, 1.5, 0]} rotation={[0, 0, 0.15]} castShadow>
            <cylinderGeometry args={[0.1, 0.18, 3, 8]} />
            <meshStandardMaterial color={trunkColor} roughness={0.85} />
          </mesh>
          <mesh position={[0.4, 3.2, 0]} castShadow>
            <sphereGeometry args={[0.7, 8, 6]} />
            <meshStandardMaterial color={foliageColor} roughness={0.7} />
          </mesh>
          <mesh position={[0.1, 3.4, 0.3]} castShadow>
            <sphereGeometry args={[0.5, 8, 6]} />
            <meshStandardMaterial color={foliageSecondary} roughness={0.7} />
          </mesh>
        </>
      )}

      {/* Pine tree: stacked green cones */}
      {variant === 'pine' && (
        <>
          <mesh position={[0, 1.0, 0]} castShadow>
            <cylinderGeometry args={[0.1, 0.15, 2, 6]} />
            <meshStandardMaterial color={trunkColor} roughness={0.85} />
          </mesh>
          <mesh position={[0, 2.4, 0]} castShadow>
            <coneGeometry args={[0.9, 1.4, 6]} />
            <meshStandardMaterial color={foliageColor} roughness={0.75} />
          </mesh>
          <mesh position={[0, 3.2, 0]} castShadow>
            <coneGeometry args={[0.65, 1.1, 6]} />
            <meshStandardMaterial color={foliageSecondary} roughness={0.75} />
          </mesh>
          <mesh position={[0, 3.8, 0]} castShadow>
            <coneGeometry args={[0.4, 0.8, 6]} />
            <meshStandardMaterial color={foliageColor} roughness={0.75} />
          </mesh>
        </>
      )}

      {/* Short tree: thick trunk + small round canopy */}
      {variant === 'short' && (
        <>
          <mesh position={[0, 0.5, 0]} castShadow>
            <cylinderGeometry args={[0.15, 0.2, 1.0, 6]} />
            <meshStandardMaterial color={trunkColor} roughness={0.85} />
          </mesh>
          <mesh position={[0, 1.3, 0]} castShadow>
            <sphereGeometry args={[0.55, 8, 6]} />
            <meshStandardMaterial color={foliageColor} roughness={0.8} />
          </mesh>
        </>
      )}

      {/* Cherry blossom: brown trunk + pink sphere */}
      {variant === 'cherry' && (
        <>
          <mesh position={[0, 1.0, 0]} castShadow>
            <cylinderGeometry args={[0.1, 0.16, 2, 6]} />
            <meshStandardMaterial color={trunkColor} roughness={0.85} />
          </mesh>
          <mesh position={[0, 2.4, 0]} castShadow>
            <sphereGeometry args={[0.9, 10, 8]} />
            <meshStandardMaterial color={foliageColor} roughness={0.6} />
          </mesh>
          <mesh position={[0.5, 2.2, 0.3]} castShadow>
            <sphereGeometry args={[0.5, 8, 6]} />
            <meshStandardMaterial color={foliageSecondary} roughness={0.6} />
          </mesh>
        </>
      )}

      {/* Mushroom tree: thin stem + large flat glowing cap */}
      {variant === 'mushroom' && (
        <>
          <mesh position={[0, 1.0, 0]} castShadow>
            <cylinderGeometry args={[0.08, 0.12, 2, 6]} />
            <meshStandardMaterial color={trunkColor} roughness={0.6} />
          </mesh>
          <mesh position={[0, 2.3, 0]} castShadow>
            <cylinderGeometry args={[0.1, 0.8, 0.4, 10]} />
            <meshStandardMaterial
              color={foliageColor}
              emissive={foliageColor}
              emissiveIntensity={0.4}
              roughness={0.5}
            />
          </mesh>
          {/* Bioluminescent dots on cap */}
          <mesh position={[0.3, 2.35, 0.2]} castShadow>
            <sphereGeometry args={[0.08, 6, 4]} />
            <meshStandardMaterial
              color={foliageSecondary}
              emissive={foliageSecondary}
              emissiveIntensity={0.8}
            />
          </mesh>
          <mesh position={[-0.2, 2.35, -0.3]} castShadow>
            <sphereGeometry args={[0.06, 6, 4]} />
            <meshStandardMaterial
              color={foliageSecondary}
              emissive={foliageSecondary}
              emissiveIntensity={0.8}
            />
          </mesh>
          <pointLight
            position={[0, 2.5, 0]}
            color={foliageColor}
            intensity={0.5}
            distance={4}
          />
        </>
      )}

      {/* Crystal tree: metallic geometric shapes */}
      {variant === 'crystal' && (
        <>
          <mesh position={[0, 0.6, 0]} castShadow>
            <cylinderGeometry args={[0.06, 0.1, 1.2, 4]} />
            <meshStandardMaterial color={trunkColor} metalness={0.6} roughness={0.3} />
          </mesh>
          <mesh position={[0, 1.6, 0]} castShadow>
            <octahedronGeometry args={[0.5]} />
            <meshStandardMaterial
              color={foliageColor}
              metalness={0.7}
              roughness={0.2}
              emissive={foliageColor}
              emissiveIntensity={0.15}
            />
          </mesh>
          <mesh position={[0.3, 1.9, 0.2]} castShadow>
            <octahedronGeometry args={[0.3]} />
            <meshStandardMaterial
              color={foliageSecondary}
              metalness={0.7}
              roughness={0.2}
              emissive={foliageSecondary}
              emissiveIntensity={0.15}
            />
          </mesh>
          <mesh position={[-0.2, 2.1, -0.1]} castShadow>
            <tetrahedronGeometry args={[0.25]} />
            <meshStandardMaterial
              color={foliageColor}
              metalness={0.8}
              roughness={0.15}
            />
          </mesh>
        </>
      )}

      {/* Fruit tree: green canopy + small red fruit spheres */}
      {variant === 'fruit' && (
        <>
          <mesh position={[0, 1.0, 0]} castShadow>
            <cylinderGeometry args={[0.12, 0.18, 2, 6]} />
            <meshStandardMaterial color={trunkColor} roughness={0.85} />
          </mesh>
          <mesh position={[0, 2.4, 0]} castShadow>
            <sphereGeometry args={[0.85, 10, 8]} />
            <meshStandardMaterial color={foliageColor} roughness={0.7} />
          </mesh>
          <mesh position={[0.5, 2.6, 0.3]} castShadow>
            <sphereGeometry args={[0.5, 8, 6]} />
            <meshStandardMaterial color={foliageSecondary} roughness={0.7} />
          </mesh>
          {/* Fruits */}
          <mesh position={[0.4, 2.0, 0.4]}>
            <sphereGeometry args={[0.1, 6, 4]} />
            <meshStandardMaterial color="#ff3333" roughness={0.6} />
          </mesh>
          <mesh position={[-0.3, 2.1, -0.3]}>
            <sphereGeometry args={[0.1, 6, 4]} />
            <meshStandardMaterial color="#ff4444" roughness={0.6} />
          </mesh>
          <mesh position={[0.1, 1.9, -0.5]}>
            <sphereGeometry args={[0.08, 6, 4]} />
            <meshStandardMaterial color="#ff2222" roughness={0.6} />
          </mesh>
        </>
      )}
    </group>
  );
}

// ---------------------------------------------------------------------------
// 3D Sub-components: Rock
// ---------------------------------------------------------------------------

function Rock({
  position,
  rockColor,
  scale = 1,
}: {
  position: Vec3;
  rockColor: string;
  scale?: number;
}) {
  return (
    <mesh position={position} castShadow scale={scale}>
      <dodecahedronGeometry args={[0.5, 0]} />
      <meshStandardMaterial color={rockColor} roughness={0.92} />
    </mesh>
  );
}

// ---------------------------------------------------------------------------
// 3D Sub-components: Low-poly character body
// ---------------------------------------------------------------------------

function LowPolyBody({
  bodyColor,
  skinColor,
  legColor,
  armColor,
}: {
  bodyColor: string;
  skinColor: string;
  legColor: string;
  armColor: string;
}) {
  return (
    <group>
      {/* Torso */}
      <mesh position={[0, 0.95, 0]} castShadow>
        <boxGeometry args={[0.5, 0.7, 0.3]} />
        <meshStandardMaterial color={bodyColor} roughness={0.7} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 1.6, 0]} castShadow>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial color={skinColor} roughness={0.65} />
      </mesh>
      {/* Left arm */}
      <mesh position={[-0.38, 0.9, 0]} castShadow>
        <boxGeometry args={[0.14, 0.55, 0.14]} />
        <meshStandardMaterial color={armColor} roughness={0.7} />
      </mesh>
      {/* Right arm */}
      <mesh position={[0.38, 0.9, 0]} castShadow>
        <boxGeometry args={[0.14, 0.55, 0.14]} />
        <meshStandardMaterial color={armColor} roughness={0.7} />
      </mesh>
      {/* Left leg */}
      <mesh position={[-0.14, 0.3, 0]} castShadow>
        <boxGeometry args={[0.17, 0.6, 0.2]} />
        <meshStandardMaterial color={legColor} roughness={0.7} />
      </mesh>
      {/* Right leg */}
      <mesh position={[0.14, 0.3, 0]} castShadow>
        <boxGeometry args={[0.17, 0.6, 0.2]} />
        <meshStandardMaterial color={legColor} roughness={0.7} />
      </mesh>
    </group>
  );
}

// ---------------------------------------------------------------------------
// 3D Sub-components: Player character
// ---------------------------------------------------------------------------

function PlayerCharacter({
  accentColor,
  keysRef,
  mobileDirRef,
  clickTargetRef,
  groupRef,
}: {
  accentColor: string;
  keysRef: { readonly current: Set<string> };
  mobileDirRef: { readonly current: string | null };
  clickTargetRef: { current: THREE.Vector3 | null };
  groupRef: { current: THREE.Group | null };
}) {
  const internalRef = useRef<THREE.Group>(null);
  const walkCycle = useRef(0);
  const leftLegRef = useRef<THREE.Mesh>(null);
  const rightLegRef = useRef<THREE.Mesh>(null);
  const leftArmRef = useRef<THREE.Mesh>(null);
  const rightArmRef = useRef<THREE.Mesh>(null);

  useFrame((_state, delta) => {
    const group = internalRef.current;
    if (!group) return;

    const keys = keysRef.current;
    const mobileDir = mobileDirRef.current;
    const target = clickTargetRef.current;

    _moveDir.set(0, 0, 0);
    let isKeyMoving = false;

    // Keyboard movement
    if (keys.has('w') || keys.has('arrowup')) { _moveDir.z -= 1; isKeyMoving = true; }
    if (keys.has('s') || keys.has('arrowdown')) { _moveDir.z += 1; isKeyMoving = true; }
    if (keys.has('a') || keys.has('arrowleft')) { _moveDir.x -= 1; isKeyMoving = true; }
    if (keys.has('d') || keys.has('arrowright')) { _moveDir.x += 1; isKeyMoving = true; }

    // Mobile d-pad
    if (mobileDir === 'up') { _moveDir.z -= 1; isKeyMoving = true; }
    if (mobileDir === 'down') { _moveDir.z += 1; isKeyMoving = true; }
    if (mobileDir === 'left') { _moveDir.x -= 1; isKeyMoving = true; }
    if (mobileDir === 'right') { _moveDir.x += 1; isKeyMoving = true; }

    // Click-to-move
    if (!isKeyMoving && target) {
      const dx = target.x - group.position.x;
      const dz = target.z - group.position.z;
      const dist = Math.sqrt(dx * dx + dz * dz);
      if (dist > 0.5) {
        _moveDir.set(dx / dist, 0, dz / dist);
        isKeyMoving = true;
      } else {
        clickTargetRef.current = null;
      }
    }

    // Normalize diagonal movement
    if (_moveDir.length() > 0) {
      _moveDir.normalize();
    }

    const moving = _moveDir.length() > 0;
    const speed = MOVE_SPEED * delta * 60;

    if (moving) {
      const newX = group.position.x + _moveDir.x * speed;
      const newZ = group.position.z + _moveDir.z * speed;
      const distFromCenter = Math.sqrt(newX * newX + newZ * newZ);

      if (distFromCenter < GROUND_SIZE - 2) {
        group.position.x = newX;
        group.position.z = newZ;
      }

      // Rotate to face direction
      const targetAngle = Math.atan2(_moveDir.x, _moveDir.z);
      group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, targetAngle, 0.15);

      // Walk animation
      walkCycle.current += delta * 8;
      const swing = Math.sin(walkCycle.current) * 0.4;
      if (leftLegRef.current) leftLegRef.current.rotation.x = swing;
      if (rightLegRef.current) rightLegRef.current.rotation.x = -swing;
      if (leftArmRef.current) leftArmRef.current.rotation.x = -swing * 0.6;
      if (rightArmRef.current) rightArmRef.current.rotation.x = swing * 0.6;
    } else {
      // Reset walk animation
      if (leftLegRef.current) leftLegRef.current.rotation.x *= 0.85;
      if (rightLegRef.current) rightLegRef.current.rotation.x *= 0.85;
      if (leftArmRef.current) leftArmRef.current.rotation.x *= 0.85;
      if (rightArmRef.current) rightArmRef.current.rotation.x *= 0.85;
    }

    // Sync external ref
    groupRef.current = group;
  });

  return (
    <group ref={internalRef} position={[0, 0, 0]}>
      {/* Torso */}
      <mesh position={[0, 0.95, 0]} castShadow>
        <boxGeometry args={[0.5, 0.7, 0.3]} />
        <meshStandardMaterial color={accentColor} roughness={0.7} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 1.6, 0]} castShadow>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial color="#f5d0b0" roughness={0.65} />
      </mesh>
      {/* Eyes */}
      <mesh position={[0.1, 1.65, 0.21]}>
        <boxGeometry args={[0.06, 0.06, 0.02]} />
        <meshBasicMaterial color="#222222" />
      </mesh>
      <mesh position={[-0.1, 1.65, 0.21]}>
        <boxGeometry args={[0.06, 0.06, 0.02]} />
        <meshBasicMaterial color="#222222" />
      </mesh>
      {/* Hair */}
      <mesh position={[0, 1.82, 0]} castShadow>
        <boxGeometry args={[0.44, 0.08, 0.44]} />
        <meshStandardMaterial color="#5a3820" roughness={0.8} />
      </mesh>
      {/* Hat */}
      <mesh position={[0, 1.95, 0]} castShadow>
        <cylinderGeometry args={[0.28, 0.3, 0.15, 8]} />
        <meshStandardMaterial color={accentColor} roughness={0.6} />
      </mesh>
      <mesh position={[0, 2.08, 0]} castShadow>
        <coneGeometry args={[0.22, 0.3, 8]} />
        <meshStandardMaterial color={accentColor} roughness={0.6} />
      </mesh>
      {/* Backpack */}
      <mesh position={[0, 0.9, -0.22]} castShadow>
        <boxGeometry args={[0.3, 0.35, 0.15]} />
        <meshStandardMaterial color="#6a5a3a" roughness={0.8} />
      </mesh>
      {/* Left arm */}
      <mesh ref={leftArmRef} position={[-0.38, 0.9, 0]} castShadow>
        <boxGeometry args={[0.14, 0.55, 0.14]} />
        <meshStandardMaterial color={accentColor} roughness={0.7} />
      </mesh>
      {/* Right arm */}
      <mesh ref={rightArmRef} position={[0.38, 0.9, 0]} castShadow>
        <boxGeometry args={[0.14, 0.55, 0.14]} />
        <meshStandardMaterial color={accentColor} roughness={0.7} />
      </mesh>
      {/* Left leg */}
      <mesh ref={leftLegRef} position={[-0.14, 0.3, 0]} castShadow>
        <boxGeometry args={[0.17, 0.6, 0.2]} />
        <meshStandardMaterial color="#3a3a5a" roughness={0.7} />
      </mesh>
      {/* Right leg */}
      <mesh ref={rightLegRef} position={[0.14, 0.3, 0]} castShadow>
        <boxGeometry args={[0.17, 0.6, 0.2]} />
        <meshStandardMaterial color="#3a3a5a" roughness={0.7} />
      </mesh>
      {/* Player glow ring on ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[0.4, 0.6, 16]} />
        <meshBasicMaterial color={accentColor} transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

// ---------------------------------------------------------------------------
// 3D Sub-components: NPC character
// ---------------------------------------------------------------------------

function NPCCharacter({
  npcData,
  position,
  color,
  playerGroupRef,
  onInteract,
}: {
  npcData: NPCData;
  position: Vec3;
  color: string;
  playerGroupRef: { readonly current: THREE.Group | null };
  onInteract: (npc: NPCData) => void;
}) {
  const [isNear, setIsNear] = useState(false);
  const prevNear = useRef(false);
  const frameCount = useRef(0);
  const bodyRef = useRef<THREE.Group>(null);

  useFrame(() => {
    frameCount.current++;
    // Idle bob animation
    if (bodyRef.current) {
      bodyRef.current.position.y = Math.sin(Date.now() * 0.002 + position[0]) * 0.05;
    }
    // Proximity check (throttled)
    if (frameCount.current % 10 === 0 && playerGroupRef.current) {
      _tmpVec.set(position[0], position[1], position[2]);
      const d = playerGroupRef.current.position.distanceTo(_tmpVec);
      const near = d < INTERACT_DIST;
      if (near !== prevNear.current) {
        prevNear.current = near;
        setIsNear(near);
      }
    }
  });

  return (
    <group position={position}>
      <group ref={bodyRef}>
        {/* NPC body */}
        <LowPolyBody
          bodyColor={color}
          skinColor="#e8c8a0"
          legColor="#4a4a4a"
          armColor={color}
        />
        {/* Highlight ring when near */}
        {isNear && (
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
            <ringGeometry args={[0.8, 1.1, 16]} />
            <meshBasicMaterial color="#ffd700" transparent opacity={0.5} />
          </mesh>
        )}
      </group>
      {/* Clickable invisible sphere for easier click target */}
      <mesh
        position={[0, 1, 0]}
        onClick={(e) => {
          e.stopPropagation();
          if (isNear) onInteract(npcData);
        }}
      >
        <sphereGeometry args={[1.2, 8, 6]} />
        <meshBasicMaterial visible={false} />
      </mesh>
      {/* NPC name label */}
      <Html position={[0, 2.3, 0]} center>
        <div
          style={{
            color: '#ffd700',
            fontSize: 11,
            fontWeight: 'bold',
            textShadow: '0 0 6px rgba(0,0,0,0.8)',
            whiteSpace: 'nowrap',
            textAlign: 'center',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          <span style={{ fontSize: 16, display: 'block' }}>{npcData.emoji}</span>
          {npcData.name}
        </div>
      </Html>
      {/* Interaction prompt */}
      {isNear && (
        <Html position={[0, 2.9, 0]} center>
          <div
            style={{
              color: '#ffd700',
              fontSize: 10,
              fontWeight: 'bold',
              background: 'rgba(0,0,0,0.75)',
              padding: '2px 8px',
              borderRadius: 4,
              border: '1px solid rgba(255,215,0,0.3)',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              userSelect: 'none',
              animation: 'ie3d-bounce 1.5s ease-in-out infinite',
            }}
          >
            {'ontouchstart' in globalThis ? 'Tippe zum Sprechen' : 'E - Sprechen'}
          </div>
        </Html>
      )}
    </group>
  );
}

// ---------------------------------------------------------------------------
// 3D Sub-components: Interactive 3D marker
// ---------------------------------------------------------------------------

const MARKER_COLORS = {
  scenario: '#ffd700',
  activity: '#40c080',
  minigame: '#b060ff',
} as const;

type MarkerKind = keyof typeof MARKER_COLORS;

function InteractiveMarker({
  position,
  kind,
  label,
  completed,
  playerGroupRef,
  onClick,
}: {
  position: Vec3;
  kind: MarkerKind;
  label: string;
  completed: boolean;
  playerGroupRef: { readonly current: THREE.Group | null };
  onClick: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [isNear, setIsNear] = useState(false);
  const prevNear = useRef(false);
  const frameCount = useRef(0);
  const color = MARKER_COLORS[kind];

  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 1.5;
      meshRef.current.position.y = position[1] + 1 + Math.sin(Date.now() * 0.003) * 0.3;
    }
    frameCount.current++;
    if (frameCount.current % 10 === 0 && playerGroupRef.current) {
      _tmpVec.set(position[0], 0, position[2]);
      const pg = playerGroupRef.current.position;
      _tmpVec.y = pg.y;
      const d = pg.distanceTo(_tmpVec);
      const near = d < INTERACT_DIST;
      if (near !== prevNear.current) {
        prevNear.current = near;
        setIsNear(near);
      }
    }
  });

  return (
    <group position={[position[0], 0, position[2]]}>
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          if (isNear) onClick();
        }}
        castShadow
      >
        {kind === 'scenario' && <octahedronGeometry args={[0.35]} />}
        {kind === 'activity' && <icosahedronGeometry args={[0.3]} />}
        {kind === 'minigame' && <boxGeometry args={[0.4, 0.4, 0.4]} />}
        <meshStandardMaterial
          color={completed ? '#808080' : color}
          emissive={isNear ? color : '#000000'}
          emissiveIntensity={isNear ? 0.5 : 0.1}
          metalness={0.4}
          roughness={0.35}
        />
      </mesh>
      {/* Glow point light */}
      <pointLight
        position={[0, 1.2, 0]}
        color={color}
        intensity={isNear ? 1.0 : 0.3}
        distance={4}
      />
      {/* Ground marker ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[0.5, 0.7, 12]} />
        <meshBasicMaterial color={color} transparent opacity={isNear ? 0.5 : 0.2} />
      </mesh>
      {/* Label when near */}
      {isNear && (
        <Html position={[0, 2.2, 0]} center>
          <div
            style={{
              color,
              fontSize: 11,
              fontWeight: 'bold',
              background: 'rgba(0,0,0,0.8)',
              padding: '3px 10px',
              borderRadius: 4,
              border: `1px solid ${color}44`,
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          >
            {completed ? '\u2713 ' : ''}{label}
          </div>
        </Html>
      )}
    </group>
  );
}

// ---------------------------------------------------------------------------
// 3D Sub-components: Island-specific decorations
// ---------------------------------------------------------------------------

function IslandDecorations({
  islandId,
  positions,
}: {
  islandId: string;
  positions: Vec3[];
}) {
  return (
    <group>
      {islandId === 'volcano' &&
        positions.map((pos, i) => (
          <group key={i} position={pos}>
            {/* Lava pools */}
            {i % 2 === 0 ? (
              <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
                <circleGeometry args={[0.6 + (i % 3) * 0.3, 8]} />
                <meshStandardMaterial
                  color="#ff4400"
                  emissive="#ff2200"
                  emissiveIntensity={0.6}
                  roughness={0.3}
                />
              </mesh>
            ) : (
              /* Volcanic boulders */
              <mesh position={[0, 0.3, 0]} castShadow>
                <dodecahedronGeometry args={[0.3 + (i % 3) * 0.15, 0]} />
                <meshStandardMaterial color="#2a1a10" roughness={0.95} />
              </mesh>
            )}
            {i % 3 === 0 && (
              <pointLight position={[0, 0.3, 0]} color="#ff4400" intensity={0.4} distance={3} />
            )}
          </group>
        ))}

      {islandId === 'ocean' &&
        positions.map((pos, i) => (
          <group key={i} position={pos}>
            {i % 3 === 0 ? (
              /* Seashells */
              <mesh position={[0, 0.05, 0]} rotation={[0, i * 0.7, 0]} castShadow>
                <coneGeometry args={[0.15, 0.2, 6]} />
                <meshStandardMaterial color="#f0e0c0" roughness={0.6} />
              </mesh>
            ) : i % 3 === 1 ? (
              /* Coral */
              <group>
                <mesh position={[0, 0.3, 0]} castShadow>
                  <cylinderGeometry args={[0.05, 0.1, 0.6, 5]} />
                  <meshStandardMaterial color="#ff6080" roughness={0.7} />
                </mesh>
                <mesh position={[0.15, 0.35, 0.1]} castShadow>
                  <cylinderGeometry args={[0.04, 0.08, 0.5, 5]} />
                  <meshStandardMaterial color="#ff8060" roughness={0.7} />
                </mesh>
              </group>
            ) : (
              /* Starfish */
              <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, i * 1.2]}>
                <circleGeometry args={[0.2, 5]} />
                <meshStandardMaterial color="#ff9060" roughness={0.6} />
              </mesh>
            )}
          </group>
        ))}

      {islandId === 'forest' &&
        positions.map((pos, i) => (
          <group key={i} position={pos}>
            {i % 3 === 0 ? (
              /* Mushrooms */
              <group>
                <mesh position={[0, 0.12, 0]} castShadow>
                  <cylinderGeometry args={[0.04, 0.05, 0.24, 6]} />
                  <meshStandardMaterial color="#e8e0d0" roughness={0.7} />
                </mesh>
                <mesh position={[0, 0.28, 0]} castShadow>
                  <sphereGeometry args={[0.12, 8, 4, 0, Math.PI * 2, 0, Math.PI / 2]} />
                  <meshStandardMaterial color="#cc3333" roughness={0.6} />
                </mesh>
              </group>
            ) : i % 3 === 1 ? (
              /* Fallen log */
              <mesh position={[0, 0.1, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
                <cylinderGeometry args={[0.1, 0.12, 1.2, 6]} />
                <meshStandardMaterial color="#5c3a1e" roughness={0.9} />
              </mesh>
            ) : (
              /* Bush */
              <mesh position={[0, 0.25, 0]} castShadow>
                <sphereGeometry args={[0.3, 8, 6]} />
                <meshStandardMaterial color="#2a6a20" roughness={0.8} />
              </mesh>
            )}
          </group>
        ))}

      {islandId === 'mountain' &&
        positions.map((pos, i) => (
          <group key={i} position={pos}>
            {i % 2 === 0 ? (
              /* Crystal formations */
              <group>
                <mesh position={[0, 0.4, 0]} rotation={[0.1, i * 0.5, 0.05]} castShadow>
                  <coneGeometry args={[0.15, 0.8, 4]} />
                  <meshStandardMaterial color="#a0d0ff" metalness={0.5} roughness={0.3} />
                </mesh>
                <mesh position={[0.15, 0.3, 0.1]} rotation={[-0.1, 0, 0.2]} castShadow>
                  <coneGeometry args={[0.1, 0.5, 4]} />
                  <meshStandardMaterial color="#c0e0ff" metalness={0.5} roughness={0.3} />
                </mesh>
              </group>
            ) : (
              /* Snow patch */
              <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
                <circleGeometry args={[0.4 + (i % 3) * 0.2, 8]} />
                <meshStandardMaterial color="#e8e8f0" roughness={0.5} />
              </mesh>
            )}
          </group>
        ))}

      {islandId === 'garden' &&
        positions.map((pos, i) => (
          <group key={i} position={pos}>
            {/* Flowers on thin stems */}
            <mesh position={[0, 0.2, 0]} castShadow>
              <cylinderGeometry args={[0.02, 0.02, 0.4, 4]} />
              <meshStandardMaterial color="#3a8a2a" roughness={0.7} />
            </mesh>
            <mesh position={[0, 0.42, 0]} castShadow>
              <coneGeometry args={[0.08, 0.1, 6]} />
              <meshStandardMaterial
                color={
                  ['#ff6080', '#ffaa40', '#ff80ff', '#8080ff', '#ff4040'][i % 5]
                }
                roughness={0.5}
              />
            </mesh>
            {i % 4 === 0 && (
              /* Butterfly - simplified as small colored sphere */
              <mesh position={[0.3, 0.8 + Math.sin(i) * 0.3, 0.2]}>
                <sphereGeometry args={[0.05, 4, 4]} />
                <meshStandardMaterial
                  color="#ff80ff"
                  emissive="#ff80ff"
                  emissiveIntensity={0.3}
                />
              </mesh>
            )}
          </group>
        ))}

      {islandId === 'night' &&
        positions.map((pos, i) => (
          <group key={i} position={pos}>
            {i % 2 === 0 ? (
              /* Floating lantern */
              <group position={[0, 1.5 + (i % 3) * 0.5, 0]}>
                <mesh castShadow>
                  <boxGeometry args={[0.25, 0.3, 0.25]} />
                  <meshStandardMaterial
                    color="#ffcc44"
                    emissive="#ffaa22"
                    emissiveIntensity={0.6}
                    transparent
                    opacity={0.9}
                  />
                </mesh>
                <pointLight color="#ffaa22" intensity={0.6} distance={5} />
              </group>
            ) : (
              /* Glowing ground crystal */
              <mesh position={[0, 0.2, 0]} castShadow>
                <octahedronGeometry args={[0.2]} />
                <meshStandardMaterial
                  color="#8060c0"
                  emissive="#6040a0"
                  emissiveIntensity={0.5}
                  metalness={0.4}
                  roughness={0.3}
                />
              </mesh>
            )}
          </group>
        ))}

      {islandId === 'rainbow' &&
        positions.map((pos, i) => (
          <group key={i} position={pos}>
            {/* Colored crystal prisms */}
            <mesh
              position={[0, 0.5, 0]}
              rotation={[0.2 * i, 0.3 * i, 0.1 * i]}
              castShadow
            >
              <tetrahedronGeometry args={[0.3 + (i % 3) * 0.1]} />
              <meshStandardMaterial
                color={
                  ['#ff4040', '#ff8800', '#ffdd00', '#44cc44', '#4488ff', '#8844ff'][i % 6]
                }
                metalness={0.6}
                roughness={0.2}
                emissive={
                  ['#ff4040', '#ff8800', '#ffdd00', '#44cc44', '#4488ff', '#8844ff'][i % 6]
                }
                emissiveIntensity={0.15}
              />
            </mesh>
          </group>
        ))}

      {islandId === 'home' &&
        positions.map((pos, i) => (
          <group key={i} position={pos}>
            {i % 3 === 0 ? (
              /* Small house */
              <group>
                <mesh position={[0, 0.4, 0]} castShadow>
                  <boxGeometry args={[0.8, 0.8, 0.6]} />
                  <meshStandardMaterial color="#e8d0b0" roughness={0.8} />
                </mesh>
                <mesh position={[0, 0.95, 0]} castShadow>
                  <coneGeometry args={[0.6, 0.5, 4]} />
                  <meshStandardMaterial color="#cc4444" roughness={0.7} />
                </mesh>
                {/* Door */}
                <mesh position={[0, 0.25, 0.31]}>
                  <planeGeometry args={[0.2, 0.4]} />
                  <meshStandardMaterial color="#5c3a20" />
                </mesh>
              </group>
            ) : i % 3 === 1 ? (
              /* Fence post */
              <group>
                <mesh position={[0, 0.25, 0]} castShadow>
                  <boxGeometry args={[0.08, 0.5, 0.08]} />
                  <meshStandardMaterial color="#8a7a5a" roughness={0.85} />
                </mesh>
                <mesh position={[0.4, 0.25, 0]} castShadow>
                  <boxGeometry args={[0.08, 0.5, 0.08]} />
                  <meshStandardMaterial color="#8a7a5a" roughness={0.85} />
                </mesh>
                <mesh position={[0.2, 0.35, 0]} castShadow>
                  <boxGeometry args={[0.5, 0.06, 0.06]} />
                  <meshStandardMaterial color="#8a7a5a" roughness={0.85} />
                </mesh>
              </group>
            ) : (
              /* Lamppost */
              <group>
                <mesh position={[0, 0.8, 0]} castShadow>
                  <cylinderGeometry args={[0.04, 0.06, 1.6, 6]} />
                  <meshStandardMaterial color="#4a4a4a" metalness={0.5} roughness={0.4} />
                </mesh>
                <mesh position={[0, 1.65, 0]}>
                  <sphereGeometry args={[0.12, 8, 6]} />
                  <meshStandardMaterial
                    color="#ffffaa"
                    emissive="#ffcc44"
                    emissiveIntensity={0.6}
                  />
                </mesh>
                <pointLight
                  position={[0, 1.7, 0]}
                  color="#ffcc44"
                  intensity={0.5}
                  distance={5}
                />
              </group>
            )}
          </group>
        ))}
    </group>
  );
}

// ---------------------------------------------------------------------------
// 3D Sub-components: Camera controller
// ---------------------------------------------------------------------------

function CameraController({
  playerGroupRef,
}: {
  playerGroupRef: { readonly current: THREE.Group | null };
}) {
  const { camera } = useThree();

  useFrame(() => {
    if (!playerGroupRef.current) return;
    const target = playerGroupRef.current.position;
    _desiredCam.set(
      target.x + CAM_OFFSET.x,
      CAM_OFFSET.y,
      target.z + CAM_OFFSET.z,
    );
    camera.position.lerp(_desiredCam, CAM_LERP);
    camera.lookAt(target.x, 0.5, target.z);
  });

  return null;
}

// ---------------------------------------------------------------------------
// 3D Sub-components: Sky Dome (gradient sphere)
// ---------------------------------------------------------------------------

function SkyDome({ theme }: { theme: IslandTheme }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (!meshRef.current) return;
    const geo = meshRef.current.geometry;
    const pos = geo.getAttribute('position');
    const colors = new Float32Array(pos.count * 3);
    const topColor = new THREE.Color(theme.skyColor);
    const bottomColor = new THREE.Color(theme.fogColor);
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      const t = Math.max(0, Math.min(1, (y + 50) / 100));
      const c = new THREE.Color().lerpColors(bottomColor, topColor, t);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  }, [theme.skyColor, theme.fogColor]);

  return (
    <mesh ref={meshRef} scale={[-1, 1, 1]}>
      <sphereGeometry args={[80, 32, 16]} />
      <meshBasicMaterial vertexColors side={THREE.BackSide} />
    </mesh>
  );
}

// ---------------------------------------------------------------------------
// 3D Sub-components: Water ring around island
// ---------------------------------------------------------------------------

function WaterRing({ theme }: { theme: IslandTheme }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const geoRef = useRef<THREE.RingGeometry | null>(null);
  const origY = useRef<Float32Array | null>(null);

  useEffect(() => {
    if (!meshRef.current) return;
    geoRef.current = meshRef.current.geometry as THREE.RingGeometry;
    const pos = geoRef.current.getAttribute('position');
    origY.current = new Float32Array(pos.count);
    for (let i = 0; i < pos.count; i++) {
      origY.current[i] = pos.getY(i);
    }
  }, []);

  useFrame(() => {
    if (!geoRef.current || !origY.current) return;
    const pos = geoRef.current.getAttribute('position');
    const t = Date.now() * 0.001;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      pos.setY(i, origY.current[i] + Math.sin(t * 1.5 + x * 0.3 + z * 0.3) * 0.15);
    }
    pos.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.15, 0]}>
      <ringGeometry args={[GROUND_SIZE - 1, GROUND_SIZE + 12, 64, 4]} />
      <meshStandardMaterial
        color={theme.groundEdgeColor}
        transparent
        opacity={0.7}
        roughness={0.2}
        metalness={0.1}
      />
    </mesh>
  );
}

// ---------------------------------------------------------------------------
// 3D Sub-components: Ambient particles (InstancedMesh for performance)
// ---------------------------------------------------------------------------

function AmbientParticles({ theme, islandId }: { theme: IslandTheme; islandId: string }) {
  const count = 30;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const offsets = useMemo(() => {
    const arr: Array<{ x: number; y: number; z: number; speed: number; phase: number }> = [];
    const rng = makeRng((SEED_MAP[islandId] ?? 101) + 8888);
    for (let i = 0; i < count; i++) {
      const angle = rng() * Math.PI * 2;
      const r = 3 + rng() * (GROUND_SIZE - 6);
      arr.push({
        x: Math.cos(angle) * r,
        y: 1 + rng() * 5,
        z: Math.sin(angle) * r,
        speed: 0.3 + rng() * 0.7,
        phase: rng() * Math.PI * 2,
      });
    }
    return arr;
  }, [islandId]);

  const particleColor = useMemo(() => {
    const colors: Record<string, string> = {
      volcano: '#ff6622',
      ocean: '#66bbff',
      forest: '#aaff44',
      mountain: '#ffffff',
      garden: '#ffaacc',
      night: '#ddddff',
      rainbow: '#ff88ff',
      home: '#ffdd66',
    };
    return colors[islandId] ?? '#ffdd66';
  }, [islandId]);

  useFrame(() => {
    if (!meshRef.current) return;
    const t = Date.now() * 0.001;
    for (let i = 0; i < count; i++) {
      const o = offsets[i];
      const yOff = Math.sin(t * o.speed + o.phase) * 1.5;
      const xOff = Math.sin(t * 0.5 + o.phase) * 0.5;
      dummy.position.set(o.x + xOff, o.y + yOff, o.z);
      dummy.scale.setScalar(0.04 + Math.sin(t * 2 + o.phase) * 0.02);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 4]} />
      <meshBasicMaterial color={particleColor} transparent opacity={0.8} />
    </instancedMesh>
  );
}

// ---------------------------------------------------------------------------
// 3D Sub-components: Grass tufts (InstancedMesh)
// ---------------------------------------------------------------------------

function GrassTufts({ theme, islandId }: { theme: IslandTheme; islandId: string }) {
  const count = 120;
  const meshRef = useRef<THREE.InstancedMesh>(null);

  useEffect(() => {
    if (!meshRef.current) return;
    const dummy = new THREE.Object3D();
    const rng = makeRng((SEED_MAP[islandId] ?? 101) + 6666);
    for (let i = 0; i < count; i++) {
      const angle = rng() * Math.PI * 2;
      const r = 2 + rng() * (GROUND_SIZE - 4);
      dummy.position.set(Math.cos(angle) * r, 0.08, Math.sin(angle) * r);
      dummy.scale.set(0.08 + rng() * 0.06, 0.15 + rng() * 0.2, 0.08 + rng() * 0.06);
      dummy.rotation.y = rng() * Math.PI;
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [islandId, theme]);

  // Skip grass for some islands
  if (islandId === 'volcano' || islandId === 'ocean' || islandId === 'night') return null;

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <coneGeometry args={[1, 1, 4]} />
      <meshStandardMaterial color={theme.foliageColor} roughness={0.9} />
    </instancedMesh>
  );
}

// ---------------------------------------------------------------------------
// 3D Sub-components: Scene lighting (enhanced)
// ---------------------------------------------------------------------------

function SceneLighting({ theme }: { theme: IslandTheme }) {
  const lightRef = useRef<THREE.DirectionalLight>(null);

  useEffect(() => {
    if (lightRef.current) {
      lightRef.current.shadow.mapSize.width = 2048;
      lightRef.current.shadow.mapSize.height = 2048;
      lightRef.current.shadow.camera.left = -35;
      lightRef.current.shadow.camera.right = 35;
      lightRef.current.shadow.camera.top = 35;
      lightRef.current.shadow.camera.bottom = -35;
      lightRef.current.shadow.bias = -0.001;
      lightRef.current.shadow.camera.updateProjectionMatrix();
    }
  }, []);

  return (
    <>
      <ambientLight intensity={theme.ambientIntensity} color={theme.ambientColor} />
      <directionalLight
        ref={lightRef}
        position={theme.sunPosition}
        intensity={theme.sunIntensity}
        color={theme.sunColor}
        castShadow
      />
      {/* Rim light from opposite side */}
      <directionalLight
        position={[-theme.sunPosition[0], theme.sunPosition[1] * 0.5, -theme.sunPosition[2]]}
        intensity={theme.sunIntensity * 0.15}
        color={theme.ambientColor}
      />
      {/* Hemisphere light for softer bottom fill */}
      <hemisphereLight
        color={theme.sunColor}
        groundColor={theme.groundColor}
        intensity={0.25}
      />
    </>
  );
}

// ---------------------------------------------------------------------------
// 3D: Complete world scene (assembled inside Canvas)
// ---------------------------------------------------------------------------

function WorldScene({
  islandId,
  theme,
  keysRef,
  mobileDirRef,
  npcs,
  scenarioMarkers,
  activityMarkers,
  miniGamePos,
  completedScenarios,
  completedActivities,
  onNearbyNPC,
  onNPCInteract,
  onScenarioClick,
  onActivityClick,
  onMiniGameClick,
}: {
  islandId: string;
  theme: IslandTheme;
  keysRef: { readonly current: Set<string> };
  mobileDirRef: { readonly current: string | null };
  npcs: Array<{ data: NPCData; pos: Vec3; color: string }>;
  scenarioMarkers: Array<ScenarioData & { pos: Vec3 }>;
  activityMarkers: Array<ActivityData & { pos: Vec3 }>;
  miniGamePos: Vec3;
  completedScenarios: string[];
  completedActivities: string[];
  onNearbyNPC: (npc: NPCData | null) => void;
  onNPCInteract: (npc: NPCData) => void;
  onScenarioClick: (id: string) => void;
  onActivityClick: (id: string) => void;
  onMiniGameClick: () => void;
}) {
  const playerGroupRef = useMemo(() => ({ current: null as THREE.Group | null }), []);
  const clickTargetRef = useMemo(() => ({ current: null as THREE.Vector3 | null }), []);
  const frameCount = useRef(0);

  // Tree positions (deterministic based on island seed)
  const treePositions = useMemo(
    () => generatePositions(theme.treeCount, SEED_MAP[islandId] ?? 101, 5, GROUND_SIZE - 5),
    [theme.treeCount, islandId],
  );
  const treeScales = useMemo(
    () => {
      const rng = makeRng((SEED_MAP[islandId] ?? 101) + 300);
      return treePositions.map(() => 0.7 + rng() * 0.6);
    },
    [treePositions, islandId],
  );

  // Rock positions
  const rockPositions = useMemo(
    () => generatePositions(theme.rockCount, (SEED_MAP[islandId] ?? 101) + 200, 3, GROUND_SIZE - 4),
    [theme.rockCount, islandId],
  );
  const rockScales = useMemo(
    () => {
      const rng = makeRng((SEED_MAP[islandId] ?? 101) + 400);
      return rockPositions.map(() => 0.5 + rng() * 1.0);
    },
    [rockPositions, islandId],
  );

  // Decoration positions
  const decoPositions = useMemo(
    () => generatePositions(theme.decorationCount, (SEED_MAP[islandId] ?? 101) + 500, 4, GROUND_SIZE - 6),
    [theme.decorationCount, islandId],
  );

  // Nearest NPC check (throttled in useFrame)
  useFrame(() => {
    frameCount.current++;
    if (frameCount.current % 15 === 0 && playerGroupRef.current) {
      let closestNPC: NPCData | null = null;
      let closestDist = INTERACT_DIST;
      for (const npc of npcs) {
        _tmpVec.set(npc.pos[0], 0, npc.pos[2]);
        const pg = playerGroupRef.current.position;
        _tmpVec.y = pg.y;
        const d = pg.distanceTo(_tmpVec);
        if (d < closestDist) {
          closestNPC = npc.data;
          closestDist = d;
        }
      }
      onNearbyNPC(closestNPC);
    }
  });

  // Ground click → click-to-move
  const handleGroundClick = useCallback(
    (e: { stopPropagation: () => void; point: THREE.Vector3 }) => {
      e.stopPropagation();
      clickTargetRef.current = e.point.clone();
    },
    [clickTargetRef],
  );

  return (
    <>
      {/* Scene environment */}
      <color attach="background" args={[theme.skyColor]} />
      <fog attach="fog" args={[theme.fogColor, theme.fogNear, theme.fogFar]} />

      {/* Sky dome */}
      <SkyDome theme={theme} />

      {/* Lighting */}
      <SceneLighting theme={theme} />

      {/* Water ring around island */}
      <WaterRing theme={theme} />

      {/* Ground (clickable for click-to-move) */}
      <group onClick={handleGroundClick}>
        <Ground theme={theme} />
      </group>

      {/* Grass tufts */}
      <GrassTufts theme={theme} islandId={islandId} />

      {/* Ambient particles */}
      <AmbientParticles theme={theme} islandId={islandId} />

      {/* Trees */}
      {treePositions.map((pos, i) => (
        <Tree
          key={`tree-${i}`}
          position={pos}
          variant={theme.treeVariant}
          trunkColor={theme.trunkColor}
          foliageColor={theme.foliageColor}
          foliageSecondary={theme.foliageSecondary}
          scale={treeScales[i]}
        />
      ))}

      {/* Rocks */}
      {rockPositions.map((pos, i) => (
        <Rock
          key={`rock-${i}`}
          position={pos}
          rockColor={theme.rockColor}
          scale={rockScales[i]}
        />
      ))}

      {/* Island decorations */}
      <IslandDecorations islandId={islandId} positions={decoPositions} />

      {/* NPCs */}
      {npcs.map((npc) => (
        <NPCCharacter
          key={npc.data.id}
          npcData={npc.data}
          position={npc.pos}
          color={npc.color}
          playerGroupRef={playerGroupRef}
          onInteract={onNPCInteract}
        />
      ))}

      {/* Scenario markers */}
      {scenarioMarkers.map((s, i) => (
        <InteractiveMarker
          key={`scenario-${i}`}
          position={s.pos}
          kind="scenario"
          label={s.title}
          completed={completedScenarios.includes(s.id)}
          playerGroupRef={playerGroupRef}
          onClick={() => onScenarioClick(s.id)}
        />
      ))}

      {/* Activity markers */}
      {activityMarkers.map((a, i) => (
        <InteractiveMarker
          key={`activity-${i}`}
          position={a.pos}
          kind="activity"
          label={a.title}
          completed={completedActivities.includes(a.id)}
          playerGroupRef={playerGroupRef}
          onClick={() => onActivityClick(a.id)}
        />
      ))}

      {/* Mini-game marker */}
      <InteractiveMarker
        position={miniGamePos}
        kind="minigame"
        label="Minispiel"
        completed={false}
        playerGroupRef={playerGroupRef}
        onClick={onMiniGameClick}
      />

      {/* Player character */}
      <PlayerCharacter
        accentColor={theme.playerAccent}
        keysRef={keysRef}
        mobileDirRef={mobileDirRef}
        clickTargetRef={clickTargetRef}
        groupRef={playerGroupRef}
      />

      {/* Camera follow */}
      <CameraController playerGroupRef={playerGroupRef} />
    </>
  );
}

// ---------------------------------------------------------------------------
// CSS keyframes injection for Html labels
// ---------------------------------------------------------------------------

const KEYFRAMES_3D_ID = 'ie3d-keyframes';

function injectKeyframes3D() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(KEYFRAMES_3D_ID)) return;
  const style = document.createElement('style');
  style.id = KEYFRAMES_3D_ID;
  style.textContent = `
    @keyframes ie3d-bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-3px); }
    }
  `;
  document.head.appendChild(style);
}

// ---------------------------------------------------------------------------
// NPC colors per island
// ---------------------------------------------------------------------------

const NPC_COLORS: Record<string, string[]> = {
  volcano: ['#ff4444', '#ff8800', '#cc6622', '#993311'],
  ocean: ['#4488cc', '#66aaee', '#3377aa', '#5599dd'],
  forest: ['#448844', '#66aa44', '#338833', '#55bb55'],
  mountain: ['#887766', '#aa9988', '#776655', '#998877'],
  garden: ['#ee6688', '#cc4488', '#ff88aa', '#dd66aa'],
  night: ['#8866cc', '#aa88ee', '#6644aa', '#9977dd'],
  rainbow: ['#ff6644', '#ffaa22', '#44cc66', '#4488ff'],
  home: ['#cc8844', '#eeaa66', '#aa7733', '#ddbb88'],
};

// ==========================================================================
// Main component: IslandExplorer
// ==========================================================================

export default function IslandExplorer({ onStartMiniGame, onBack }: IslandExplorerProps) {
  // ---- Store ----
  const activeIsland = useGameStore((s) => s.activeIsland);
  const islands = useGameStore((s) => s.islands);
  const completedScenarios = useGameStore((s) => s.completedScenarios);
  const completedActivities = useGameStore((s) => s.completedActivities);
  const setScreen = useGameStore((s) => s.setScreen);

  const islandId = activeIsland ?? ('volcano' as IslandId);
  const islandMeta = islands.find((i) => i.id === islandId);
  const islandData = useMemo(() => getIslandData(islandId), [islandId]);
  const theme = THEMES[islandId] ?? THEMES.volcano;

  // ---- Shared refs for Canvas communication ----
  const keysRef = useRef(new Set<string>());
  const mobileDirRef = useRef<string | null>(null);

  // ---- HUD state ----
  const [nearbyNPC, setNearbyNPC] = useState<NPCData | null>(null);
  const [dialogNPC, setDialogNPC] = useState<NPCData | null>(null);
  const nearbyNPCRef = useRef<NPCData | null>(null);

  // Keep ref in sync
  nearbyNPCRef.current = nearbyNPC;

  // ---- Touch detection ----
  const isTouchDevice = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }, []);

  // ---- Inject CSS keyframes ----
  useEffect(() => {
    injectKeyframes3D();
  }, []);

  // ---- Keyboard input ----
  useEffect(() => {
    const handleDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      keysRef.current.add(key);
      if (key === 'e' && nearbyNPCRef.current && !dialogNPC) {
        setDialogNPC(nearbyNPCRef.current);
      }
    };
    const handleUp = (e: KeyboardEvent) => {
      keysRef.current.delete(e.key.toLowerCase());
    };
    window.addEventListener('keydown', handleDown);
    window.addEventListener('keyup', handleUp);
    return () => {
      window.removeEventListener('keydown', handleDown);
      window.removeEventListener('keyup', handleUp);
    };
  }, [dialogNPC]);

  // ---- NPC data with positions ----
  const npcsWithPositions = useMemo(() => {
    const npcs = (islandData.npcs as NPCData[]) ?? [];
    const positions = generateNpcPositions(npcs.length, SEED_MAP[islandId] ?? 101);
    const colors = NPC_COLORS[islandId] ?? NPC_COLORS.volcano;
    return npcs.map((npc, i) => ({
      data: npc,
      pos: positions[i] ?? ([0, 0, 0] as Vec3),
      color: colors[i % colors.length],
    }));
  }, [islandData.npcs, islandId]);

  // ---- Scenario markers ----
  const scenarioMarkers = useMemo(() => {
    const data = (islandData.scenarios ?? []) as ScenarioData[];
    const positions = generateMarkerPositions(data.length, SEED_MAP[islandId] ?? 101);
    return data.map((s, i) => ({
      ...s,
      pos: positions[i] ?? ([0, 0.5, 0] as Vec3),
    }));
  }, [islandData.scenarios, islandId]);

  // ---- Activity markers ----
  const activityMarkers = useMemo(() => {
    const data = (islandData.activities ?? []) as ActivityData[];
    const positions = generateMarkerPositions(
      data.length,
      (SEED_MAP[islandId] ?? 101) + 1000,
    );
    return data.map((a, i) => ({
      ...a,
      pos: positions[i] ?? ([0, 0.5, 0] as Vec3),
    }));
  }, [islandData.activities, islandId]);

  // ---- Mini-game position ----
  const miniGamePos = useMemo((): Vec3 => {
    const rng = makeRng((SEED_MAP[islandId] ?? 101) + 7777);
    const angle = rng() * Math.PI * 2;
    const r = 12 + rng() * 8;
    return [Math.cos(angle) * r, 0.5, Math.sin(angle) * r];
  }, [islandId]);

  // ---- Completion percentage ----
  const completionPercent = islandMeta?.completionPercent ?? 0;

  // ---- Handlers ----
  const handleNearbyNPC = useCallback((npc: NPCData | null) => {
    setNearbyNPC(npc);
  }, []);

  const handleNPCInteract = useCallback((npc: NPCData) => {
    setDialogNPC(npc);
  }, []);

  const handleScenarioStart = useCallback(
    (scenarioId: string) => {
      sessionStorage.setItem('activeScenarioId', scenarioId);
      setScreen('scenario');
    },
    [setScreen],
  );

  const handleActivityStart = useCallback(
    (activityId: string) => {
      sessionStorage.setItem('activeActivityId', activityId);
      setScreen('activity');
    },
    [setScreen],
  );

  const handleMiniGameClick = useCallback(() => {
    onStartMiniGame(islandId);
  }, [onStartMiniGame, islandId]);

  const handleDialogScenario = useCallback(() => {
    const s = scenarioMarkers[0];
    if (s) handleScenarioStart(s.id);
    setDialogNPC(null);
  }, [scenarioMarkers, handleScenarioStart]);

  const handleDialogActivity = useCallback(() => {
    const a = activityMarkers[0];
    if (a) handleActivityStart(a.id);
    setDialogNPC(null);
  }, [activityMarkers, handleActivityStart]);

  const handleDialogMiniGame = useCallback(() => {
    handleMiniGameClick();
    setDialogNPC(null);
  }, [handleMiniGameClick]);

  // ---- Mobile D-pad handlers ----
  const handleDirStart = useCallback((dir: string) => {
    mobileDirRef.current = dir;
  }, []);

  const handleDirEnd = useCallback(() => {
    mobileDirRef.current = null;
  }, []);

  // ==========================================================================
  // RENDER
  // ==========================================================================

  return (
    <div className="fixed inset-0" style={{ backgroundColor: theme.skyColor }}>
      {/* ---- 3D Canvas ---- */}
      <Canvas
        shadows
        camera={{ position: [15, 17, 15], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
      >
        <WorldScene
          islandId={islandId}
          theme={theme}
          keysRef={keysRef}
          mobileDirRef={mobileDirRef}
          npcs={npcsWithPositions}
          scenarioMarkers={scenarioMarkers}
          activityMarkers={activityMarkers}
          miniGamePos={miniGamePos}
          completedScenarios={completedScenarios}
          completedActivities={completedActivities}
          onNearbyNPC={handleNearbyNPC}
          onNPCInteract={handleNPCInteract}
          onScenarioClick={handleScenarioStart}
          onActivityClick={handleActivityStart}
          onMiniGameClick={handleMiniGameClick}
        />
      </Canvas>

      {/* ---- HUD Overlay ---- */}

      {/* Top-left: Back button */}
      <button
        className="fixed top-4 left-4 z-40 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all hover:scale-105 cursor-pointer"
        style={{
          background: 'linear-gradient(135deg, rgba(30,20,60,0.9), rgba(13,13,26,0.95))',
          border: '1px solid rgba(201,168,76,0.4)',
          color: '#c9a84c',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
        }}
        onClick={onBack}
      >
        {'\u2190'} Zur Karte
      </button>

      {/* Top-center: Island name */}
      <div
        className="fixed top-4 left-1/2 z-40 flex items-center gap-2 px-5 py-2 rounded-xl"
        style={{
          transform: 'translateX(-50%)',
          background: 'linear-gradient(135deg, rgba(30,20,60,0.9), rgba(13,13,26,0.95))',
          border: '1px solid rgba(201,168,76,0.4)',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
        }}
      >
        <span className="text-xl">{islandMeta?.emoji ?? '\u{1F30B}'}</span>
        <span
          className="text-base font-bold"
          style={{ color: '#ffd700', textShadow: '0 0 8px rgba(255,215,0,0.3)' }}
        >
          {islandMeta?.name ?? 'Insel'}
        </span>
      </div>

      {/* Top-right: Progress */}
      <div
        className="fixed top-4 right-4 z-40 flex items-center gap-3 px-4 py-2 rounded-xl"
        style={{
          background: 'linear-gradient(135deg, rgba(30,20,60,0.9), rgba(13,13,26,0.95))',
          border: '1px solid rgba(201,168,76,0.4)',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
        }}
      >
        <span className="text-xs font-bold" style={{ color: '#c9a84c' }}>
          Fortschritt
        </span>
        <div
          className="w-24 h-2 rounded-full overflow-hidden"
          style={{ backgroundColor: 'rgba(201,168,76,0.2)' }}
        >
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${completionPercent}%`,
              background: 'linear-gradient(90deg, #c9a84c, #ffd700)',
              boxShadow: '0 0 8px rgba(255,215,0,0.5)',
            }}
          />
        </div>
        <span className="text-xs font-bold" style={{ color: '#ffd700' }}>
          {completionPercent}%
        </span>
      </div>

      {/* Bottom: Controls hint */}
      {!isTouchDevice && (
        <div
          className="fixed bottom-4 left-1/2 z-30 px-4 py-2 rounded-xl text-xs"
          style={{
            transform: 'translateX(-50%)',
            background: 'rgba(0,0,0,0.6)',
            color: 'rgba(200,180,140,0.7)',
            backdropFilter: 'blur(4px)',
            border: '1px solid rgba(201,168,76,0.15)',
          }}
        >
          WASD / Pfeiltasten = Bewegen &bull; E = Interagieren &bull; Klick = Laufen
        </div>
      )}

      {/* Bottom: Proximity hint */}
      {nearbyNPC && !dialogNPC && (
        <div
          className="fixed bottom-16 left-1/2 z-40 max-w-sm w-full px-4"
          style={{ transform: 'translateX(-50%)' }}
        >
          <div
            className="rounded-xl p-3 flex items-center gap-3"
            style={{
              background: 'linear-gradient(135deg, rgba(30,20,60,0.92), rgba(13,13,26,0.95))',
              border: '1px solid rgba(201,168,76,0.3)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
            }}
          >
            <span className="text-2xl">{nearbyNPC.emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate" style={{ color: '#c9a84c' }}>
                {nearbyNPC.name}
              </p>
              <p className="text-xs truncate" style={{ color: 'rgba(200,180,140,0.7)' }}>
                {nearbyNPC.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Mobile D-pad */}
      {isTouchDevice && (
        <div className="fixed bottom-6 left-6 z-50">
          <div className="flex flex-col items-center gap-1">
            <button
              className="w-12 h-12 rounded-lg flex items-center justify-center text-xl select-none active:scale-90 transition-transform"
              style={{
                backgroundColor: 'rgba(201,168,76,0.2)',
                border: '1px solid rgba(201,168,76,0.4)',
                color: '#c9a84c',
              }}
              onTouchStart={() => handleDirStart('up')}
              onTouchEnd={handleDirEnd}
              onMouseDown={() => handleDirStart('up')}
              onMouseUp={handleDirEnd}
              aria-label="Nach oben bewegen"
            >
              {'\u2191'}
            </button>
            <div className="flex gap-1">
              <button
                className="w-12 h-12 rounded-lg flex items-center justify-center text-xl select-none active:scale-90 transition-transform"
                style={{
                  backgroundColor: 'rgba(201,168,76,0.2)',
                  border: '1px solid rgba(201,168,76,0.4)',
                  color: '#c9a84c',
                }}
                onTouchStart={() => handleDirStart('left')}
                onTouchEnd={handleDirEnd}
                onMouseDown={() => handleDirStart('left')}
                onMouseUp={handleDirEnd}
                aria-label="Nach links bewegen"
              >
                {'\u2190'}
              </button>
              <button
                className="w-12 h-12 rounded-lg flex items-center justify-center text-xl select-none active:scale-90 transition-transform"
                style={{
                  backgroundColor: 'rgba(201,168,76,0.2)',
                  border: '1px solid rgba(201,168,76,0.4)',
                  color: '#c9a84c',
                }}
                onTouchStart={() => handleDirStart('down')}
                onTouchEnd={handleDirEnd}
                onMouseDown={() => handleDirStart('down')}
                onMouseUp={handleDirEnd}
                aria-label="Nach unten bewegen"
              >
                {'\u2193'}
              </button>
              <button
                className="w-12 h-12 rounded-lg flex items-center justify-center text-xl select-none active:scale-90 transition-transform"
                style={{
                  backgroundColor: 'rgba(201,168,76,0.2)',
                  border: '1px solid rgba(201,168,76,0.4)',
                  color: '#c9a84c',
                }}
                onTouchStart={() => handleDirStart('right')}
                onTouchEnd={handleDirEnd}
                onMouseDown={() => handleDirStart('right')}
                onMouseUp={handleDirEnd}
                aria-label="Nach rechts bewegen"
              >
                {'\u2192'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile interact button */}
      {isTouchDevice && nearbyNPC && !dialogNPC && (
        <button
          className="fixed bottom-8 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold"
          style={{
            background: 'linear-gradient(135deg, rgba(255,215,0,0.3), rgba(201,168,76,0.15))',
            border: '2px solid rgba(255,215,0,0.5)',
            color: '#ffd700',
            boxShadow: '0 0 16px rgba(255,215,0,0.3)',
          }}
          onClick={() => setDialogNPC(nearbyNPC)}
          aria-label="Interagieren"
        >
          E
        </button>
      )}

      {/* ---- NPC Dialog Modal ---- */}
      {dialogNPC && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
          onClick={() => setDialogNPC(null)}
          role="presentation"
        >
          <div
            className="relative max-w-md w-full rounded-xl p-6"
            style={{
              background: 'linear-gradient(135deg, rgba(30,20,60,0.95), rgba(13,13,26,0.98))',
              border: '1px solid rgba(201,168,76,0.3)',
              boxShadow: '0 0 40px rgba(201,168,76,0.15), inset 0 1px 0 rgba(255,255,255,0.05)',
            }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label={`Dialog mit ${dialogNPC.name}`}
          >
            {/* NPC header */}
            <div className="flex items-center gap-4 mb-4">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
                style={{
                  backgroundColor: 'rgba(201,168,76,0.1)',
                  border: '2px solid rgba(201,168,76,0.4)',
                }}
              >
                {dialogNPC.emoji}
              </div>
              <div>
                <h3
                  className="text-xl font-bold"
                  style={{ color: '#ffd700', textShadow: '0 0 8px rgba(255,215,0,0.3)' }}
                >
                  {dialogNPC.name}
                </h3>
                <p className="text-sm" style={{ color: 'rgba(201,168,76,0.7)' }}>
                  {dialogNPC.description}
                </p>
              </div>
            </div>

            {/* Backstory */}
            <div
              className="mb-5 p-3 rounded-lg text-sm leading-relaxed"
              style={{
                backgroundColor: 'rgba(201,168,76,0.05)',
                border: '1px solid rgba(201,168,76,0.15)',
                color: 'rgba(220,200,160,0.9)',
              }}
            >
              {dialogNPC.backstory}
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-2">
              {scenarioMarkers.length > 0 && (
                <button
                  className="w-full py-2.5 px-4 rounded-lg font-bold text-sm transition-all hover:scale-[1.02] cursor-pointer"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,215,0,0.2), rgba(201,168,76,0.1))',
                    border: '1px solid rgba(255,215,0,0.4)',
                    color: '#ffd700',
                  }}
                  onClick={handleDialogScenario}
                >
                  {'\u{1F4DC}'} Geschichte starten
                </button>
              )}
              {activityMarkers.length > 0 && (
                <button
                  className="w-full py-2.5 px-4 rounded-lg font-bold text-sm transition-all hover:scale-[1.02] cursor-pointer"
                  style={{
                    background: 'linear-gradient(135deg, rgba(64,192,128,0.2), rgba(64,192,128,0.1))',
                    border: '1px solid rgba(64,192,128,0.4)',
                    color: '#40c080',
                  }}
                  onClick={handleDialogActivity}
                >
                  {'\u{1F3AF}'} {'\u00DC'}bung starten
                </button>
              )}
              <button
                className="w-full py-2.5 px-4 rounded-lg font-bold text-sm transition-all hover:scale-[1.02] cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, rgba(176,96,255,0.2), rgba(176,96,255,0.1))',
                  border: '1px solid rgba(176,96,255,0.4)',
                  color: '#b060ff',
                }}
                onClick={handleDialogMiniGame}
              >
                {'\u{1F3AE}'} Minispiel
              </button>
              <div className="my-1 border-t" style={{ borderColor: 'rgba(201,168,76,0.15)' }} />
              <button
                className="w-full py-2 px-4 rounded-lg text-sm transition-all hover:scale-[1.02] cursor-pointer"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(200,200,200,0.7)',
                }}
                onClick={() => setDialogNPC(null)}
              >
                Schlie{'\u00DF'}en
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
