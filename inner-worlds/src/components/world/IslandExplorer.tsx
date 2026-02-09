// =============================================================================
// IslandExplorer.tsx
// 3D island exploration component using Three.js / @react-three/fiber / drei
// Inner Worlds - Social-Emotional Learning Game (ages 10-15, German language)
// =============================================================================

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
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
  waterColor: string;
  waterOpacity: number;
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
const INTERACT_DIST = 5;
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
    waterColor: '#cc3300',
    waterOpacity: 0.85,
    playerAccent: '#ff6b35',
    treeCount: 12,
    rockCount: 16,
    decorationCount: 16,
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
    waterColor: '#1a6aaa',
    waterOpacity: 0.75,
    playerAccent: '#4a90d9',
    treeCount: 10,
    rockCount: 12,
    decorationCount: 18,
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
    waterColor: '#2a5a3a',
    waterOpacity: 0.8,
    playerAccent: '#4caf50',
    treeCount: 24,
    rockCount: 14,
    decorationCount: 18,
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
    waterColor: '#5577aa',
    waterOpacity: 0.7,
    playerAccent: '#8d6e63',
    treeCount: 8,
    rockCount: 20,
    decorationCount: 14,
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
    waterColor: '#4a99bb',
    waterOpacity: 0.65,
    playerAccent: '#ec407a',
    treeCount: 12,
    rockCount: 8,
    decorationCount: 20,
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
    waterColor: '#1a1040',
    waterOpacity: 0.85,
    playerAccent: '#7e57c2',
    treeCount: 14,
    rockCount: 10,
    decorationCount: 16,
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
    waterColor: '#aa88dd',
    waterOpacity: 0.6,
    playerAccent: '#ff7043',
    treeCount: 12,
    rockCount: 12,
    decorationCount: 14,
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
    waterColor: '#3388aa',
    waterOpacity: 0.7,
    playerAccent: '#ffb74d',
    treeCount: 14,
    rockCount: 10,
    decorationCount: 18,
  },
};

// ---------------------------------------------------------------------------
// 3D Sub-components: Ground
// ---------------------------------------------------------------------------

function Ground({ theme }: { theme: IslandTheme }) {
  // Slightly lighter variant of ground for patches
  const patchColor = useMemo(() => {
    const c = new THREE.Color(theme.groundColor);
    c.offsetHSL(0.02, 0, 0.06);
    return '#' + c.getHexString();
  }, [theme.groundColor]);

  return (
    <group>
      {/* Main ground disc */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, -0.01, 0]}>
        <circleGeometry args={[GROUND_SIZE, 96]} />
        <meshStandardMaterial color={theme.groundColor} roughness={0.92} />
      </mesh>
      {/* Rim edge - beveled shoreline */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <ringGeometry args={[GROUND_SIZE - 2, GROUND_SIZE, 96]} />
        <meshStandardMaterial color={theme.groundEdgeColor} roughness={0.85} />
      </mesh>

      {/* Hills / terrain elevation */}
      <mesh position={[12, 0.5, -10]} castShadow receiveShadow>
        <sphereGeometry args={[4.5, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={theme.groundColor} roughness={0.92} flatShading />
      </mesh>
      <mesh position={[-15, 0.4, 8]} castShadow receiveShadow>
        <sphereGeometry args={[4, 14, 10, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={patchColor} roughness={0.92} flatShading />
      </mesh>
      <mesh position={[8, 0.35, 14]} castShadow receiveShadow>
        <sphereGeometry args={[3.5, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={theme.groundEdgeColor} roughness={0.92} flatShading opacity={0.8} transparent />
      </mesh>
      <mesh position={[-8, 0.3, -14]} castShadow receiveShadow>
        <sphereGeometry args={[3, 10, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={theme.groundColor} roughness={0.92} flatShading />
      </mesh>
      <mesh position={[20, 0.25, 5]} castShadow receiveShadow>
        <sphereGeometry args={[3, 10, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={patchColor} roughness={0.92} flatShading />
      </mesh>
      <mesh position={[-5, 0.2, 20]} castShadow receiveShadow>
        <sphereGeometry args={[2.5, 8, 6, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={theme.groundColor} roughness={0.92} flatShading />
      </mesh>

      {/* Large ground color patches for organic look */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[6, 0.005, 4]} receiveShadow>
        <circleGeometry args={[8, 24]} />
        <meshStandardMaterial color={patchColor} roughness={1} opacity={0.45} transparent />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-9, 0.005, -6]} receiveShadow>
        <circleGeometry args={[6, 20]} />
        <meshStandardMaterial color={theme.groundEdgeColor} roughness={1} opacity={0.3} transparent />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-14, 0.005, -2]} receiveShadow>
        <circleGeometry args={[5, 16]} />
        <meshStandardMaterial color={patchColor} roughness={1} opacity={0.35} transparent />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[15, 0.005, 10]} receiveShadow>
        <circleGeometry args={[4, 16]} />
        <meshStandardMaterial color={theme.groundEdgeColor} roughness={1} opacity={0.25} transparent />
      </mesh>

      {/* Paths radiating from center - wider and more visible */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 0]} receiveShadow>
        <planeGeometry args={[1.6, 34]} />
        <meshStandardMaterial color={theme.groundEdgeColor} roughness={0.85} opacity={0.4} transparent />
      </mesh>
      <mesh rotation={[-Math.PI / 2, Math.PI / 3, 0]} position={[0, 0.015, 0]} receiveShadow>
        <planeGeometry args={[1.5, 32]} />
        <meshStandardMaterial color={theme.groundEdgeColor} roughness={0.85} opacity={0.35} transparent />
      </mesh>
      <mesh rotation={[-Math.PI / 2, -Math.PI / 3, 0]} position={[0, 0.015, 0]} receiveShadow>
        <planeGeometry args={[1.5, 30]} />
        <meshStandardMaterial color={theme.groundEdgeColor} roughness={0.85} opacity={0.3} transparent />
      </mesh>
      <mesh rotation={[-Math.PI / 2, Math.PI / 6, 0]} position={[0, 0.015, 0]} receiveShadow>
        <planeGeometry args={[1.2, 26]} />
        <meshStandardMaterial color={theme.groundEdgeColor} roughness={0.85} opacity={0.25} transparent />
      </mesh>
      <mesh rotation={[-Math.PI / 2, -Math.PI / 6, 0]} position={[0, 0.015, 0]} receiveShadow>
        <planeGeometry args={[1.0, 22]} />
        <meshStandardMaterial color={theme.groundEdgeColor} roughness={0.85} opacity={0.2} transparent />
      </mesh>

      {/* Path border stones at center crossroads */}
      {[0, Math.PI / 3, -Math.PI / 3, Math.PI / 6].map((angle, i) => (
        <group key={`path-stones-${i}`}>
          {[3, 6, 9, 12, 16, 20].map((dist, j) => (
            <mesh
              key={`stone-${j}`}
              position={[Math.sin(angle) * dist + (j % 2 ? 0.8 : -0.8), 0.04, Math.cos(angle) * dist]}
              castShadow
            >
              <boxGeometry args={[0.15, 0.06, 0.15]} />
              <meshStandardMaterial color={theme.rockColor} roughness={0.9} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Center clearing - slightly raised platform */}
      <mesh position={[0, 0.03, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[3.5, 4, 0.08, 24]} />
        <meshStandardMaterial color={theme.groundEdgeColor} roughness={0.8} opacity={0.6} transparent />
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
      {/* Tree shadow on ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
        <circleGeometry args={[0.8, 8]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.12} />
      </mesh>
      {/* Dead tree: charred trunk + spiky dark cones + branch stubs */}
      {variant === 'dead' && (
        <>
          <mesh position={[0, 1.2, 0]} castShadow>
            <cylinderGeometry args={[0.12, 0.22, 2.4, 6]} />
            <meshStandardMaterial color={trunkColor} roughness={0.95} />
          </mesh>
          <mesh position={[0, 2.6, 0]} castShadow>
            <coneGeometry args={[0.55, 1.4, 5]} />
            <meshStandardMaterial color={foliageColor} roughness={0.9} />
          </mesh>
          <mesh position={[0, 3.4, 0]} castShadow>
            <coneGeometry args={[0.3, 0.8, 5]} />
            <meshStandardMaterial color={foliageSecondary} roughness={0.9} />
          </mesh>
          {/* Branch stubs */}
          <mesh position={[0.3, 1.8, 0]} rotation={[0, 0, 0.8]} castShadow>
            <cylinderGeometry args={[0.04, 0.06, 0.7, 4]} />
            <meshStandardMaterial color={trunkColor} roughness={0.95} />
          </mesh>
          <mesh position={[-0.25, 1.4, 0.15]} rotation={[0.3, 0, -0.7]} castShadow>
            <cylinderGeometry args={[0.03, 0.05, 0.5, 4]} />
            <meshStandardMaterial color={trunkColor} roughness={0.95} />
          </mesh>
        </>
      )}

      {/* Palm tree: curved trunk + coconuts + lush green sphere clusters */}
      {variant === 'palm' && (
        <>
          <mesh position={[0.2, 1.5, 0]} rotation={[0, 0, 0.15]} castShadow>
            <cylinderGeometry args={[0.1, 0.2, 3, 8]} />
            <meshStandardMaterial color={trunkColor} roughness={0.85} />
          </mesh>
          {/* Trunk rings for detail */}
          <mesh position={[0.15, 0.8, 0]} rotation={[0, 0, 0.15]} castShadow>
            <torusGeometry args={[0.16, 0.02, 4, 8]} />
            <meshStandardMaterial color={trunkColor} roughness={0.9} />
          </mesh>
          <mesh position={[0.4, 3.2, 0]} castShadow>
            <sphereGeometry args={[0.75, 8, 6]} />
            <meshStandardMaterial color={foliageColor} roughness={0.7} />
          </mesh>
          <mesh position={[0.1, 3.4, 0.4]} castShadow>
            <sphereGeometry args={[0.55, 8, 6]} />
            <meshStandardMaterial color={foliageSecondary} roughness={0.7} />
          </mesh>
          <mesh position={[0.6, 3.1, -0.2]} castShadow>
            <sphereGeometry args={[0.45, 8, 6]} />
            <meshStandardMaterial color={foliageColor} roughness={0.7} />
          </mesh>
          {/* Coconuts */}
          <mesh position={[0.3, 2.9, 0.15]} castShadow>
            <sphereGeometry args={[0.08, 6, 4]} />
            <meshStandardMaterial color="#8a6a3a" roughness={0.7} />
          </mesh>
          <mesh position={[0.45, 2.85, -0.05]} castShadow>
            <sphereGeometry args={[0.07, 6, 4]} />
            <meshStandardMaterial color="#7a5a2a" roughness={0.7} />
          </mesh>
        </>
      )}

      {/* Pine tree: stacked green cones (5 layers) */}
      {variant === 'pine' && (
        <>
          <mesh position={[0, 1.0, 0]} castShadow>
            <cylinderGeometry args={[0.1, 0.16, 2, 6]} />
            <meshStandardMaterial color={trunkColor} roughness={0.85} />
          </mesh>
          {/* Exposed roots */}
          <mesh position={[0.12, 0.05, 0.08]} rotation={[0.3, 0, 0.4]} castShadow>
            <cylinderGeometry args={[0.03, 0.04, 0.3, 4]} />
            <meshStandardMaterial color={trunkColor} roughness={0.9} />
          </mesh>
          <mesh position={[0, 2.2, 0]} castShadow>
            <coneGeometry args={[1.0, 1.4, 7]} />
            <meshStandardMaterial color={foliageColor} roughness={0.75} />
          </mesh>
          <mesh position={[0, 2.9, 0]} castShadow>
            <coneGeometry args={[0.8, 1.2, 7]} />
            <meshStandardMaterial color={foliageSecondary} roughness={0.75} />
          </mesh>
          <mesh position={[0, 3.5, 0]} castShadow>
            <coneGeometry args={[0.6, 1.0, 7]} />
            <meshStandardMaterial color={foliageColor} roughness={0.75} />
          </mesh>
          <mesh position={[0, 4.0, 0]} castShadow>
            <coneGeometry args={[0.4, 0.8, 6]} />
            <meshStandardMaterial color={foliageSecondary} roughness={0.75} />
          </mesh>
          <mesh position={[0, 4.4, 0]} castShadow>
            <coneGeometry args={[0.2, 0.5, 6]} />
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
  seed = 0,
}: {
  position: Vec3;
  rockColor: string;
  scale?: number;
  seed?: number;
}) {
  const variant = seed % 4;
  return (
    <group position={position} scale={scale}>
      {variant === 0 && (
        /* Single large rock */
        <mesh castShadow rotation={[0, seed * 0.7, 0.15]}>
          <dodecahedronGeometry args={[0.5, 0]} />
          <meshStandardMaterial color={rockColor} roughness={0.92} />
        </mesh>
      )}
      {variant === 1 && (
        /* Rock cluster (2 rocks) */
        <group rotation={[0, seed * 0.5, 0]}>
          <mesh castShadow position={[0, 0.15, 0]}>
            <dodecahedronGeometry args={[0.4, 0]} />
            <meshStandardMaterial color={rockColor} roughness={0.92} />
          </mesh>
          <mesh castShadow position={[0.3, 0.1, 0.2]} rotation={[0.2, 0.3, 0]}>
            <dodecahedronGeometry args={[0.25, 0]} />
            <meshStandardMaterial color={rockColor} roughness={0.92} />
          </mesh>
        </group>
      )}
      {variant === 2 && (
        /* Flat rock */
        <mesh castShadow rotation={[0.3, seed * 0.6, 0]} position={[0, 0.1, 0]}>
          <boxGeometry args={[0.8, 0.25, 0.6]} />
          <meshStandardMaterial color={rockColor} roughness={0.95} />
        </mesh>
      )}
      {variant === 3 && (
        /* Stacked rocks */
        <group rotation={[0, seed * 0.4, 0]}>
          <mesh castShadow position={[0, 0.15, 0]}>
            <dodecahedronGeometry args={[0.35, 0]} />
            <meshStandardMaterial color={rockColor} roughness={0.92} />
          </mesh>
          <mesh castShadow position={[0, 0.4, 0]}>
            <dodecahedronGeometry args={[0.2, 0]} />
            <meshStandardMaterial color={rockColor} roughness={0.9} />
          </mesh>
        </group>
      )}
    </group>
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
      {/* Shoes */}
      <mesh position={[-0.14, 0.06, 0.04]} castShadow>
        <boxGeometry args={[0.17, 0.1, 0.24]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.6} />
      </mesh>
      <mesh position={[0.14, 0.06, 0.04]} castShadow>
        <boxGeometry args={[0.17, 0.1, 0.24]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.6} />
      </mesh>
      {/* Left leg */}
      <mesh position={[-0.14, 0.3, 0]} castShadow>
        <boxGeometry args={[0.17, 0.5, 0.2]} />
        <meshStandardMaterial color={legColor} roughness={0.7} />
      </mesh>
      {/* Right leg */}
      <mesh position={[0.14, 0.3, 0]} castShadow>
        <boxGeometry args={[0.17, 0.5, 0.2]} />
        <meshStandardMaterial color={legColor} roughness={0.7} />
      </mesh>
      {/* Belt */}
      <mesh position={[0, 0.58, 0]} castShadow>
        <boxGeometry args={[0.52, 0.05, 0.32]} />
        <meshStandardMaterial color="#4a3a1a" roughness={0.8} />
      </mesh>
      {/* Torso */}
      <mesh position={[0, 0.95, 0]} castShadow>
        <boxGeometry args={[0.5, 0.65, 0.3]} />
        <meshStandardMaterial color={bodyColor} roughness={0.7} />
      </mesh>
      {/* Collar */}
      <mesh position={[0, 1.3, 0]} castShadow>
        <boxGeometry args={[0.22, 0.06, 0.18]} />
        <meshStandardMaterial color={skinColor} roughness={0.65} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 1.6, 0]} castShadow>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial color={skinColor} roughness={0.65} />
      </mesh>
      {/* Eyes */}
      <mesh position={[0.1, 1.65, 0.21]}>
        <boxGeometry args={[0.07, 0.07, 0.02]} />
        <meshBasicMaterial color="#222222" />
      </mesh>
      <mesh position={[-0.1, 1.65, 0.21]}>
        <boxGeometry args={[0.07, 0.07, 0.02]} />
        <meshBasicMaterial color="#222222" />
      </mesh>
      {/* Eye whites */}
      <mesh position={[0.1, 1.65, 0.205]}>
        <boxGeometry args={[0.09, 0.09, 0.015]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh position={[-0.1, 1.65, 0.205]}>
        <boxGeometry args={[0.09, 0.09, 0.015]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      {/* Mouth */}
      <mesh position={[0, 1.52, 0.21]}>
        <boxGeometry args={[0.1, 0.025, 0.02]} />
        <meshBasicMaterial color="#cc8877" />
      </mesh>
      {/* Left arm */}
      <mesh position={[-0.38, 0.9, 0]} castShadow>
        <boxGeometry args={[0.14, 0.55, 0.14]} />
        <meshStandardMaterial color={armColor} roughness={0.7} />
      </mesh>
      {/* Left hand */}
      <mesh position={[-0.38, 0.58, 0]}>
        <boxGeometry args={[0.09, 0.09, 0.09]} />
        <meshStandardMaterial color={skinColor} roughness={0.65} />
      </mesh>
      {/* Right arm */}
      <mesh position={[0.38, 0.9, 0]} castShadow>
        <boxGeometry args={[0.14, 0.55, 0.14]} />
        <meshStandardMaterial color={armColor} roughness={0.7} />
      </mesh>
      {/* Right hand */}
      <mesh position={[0.38, 0.58, 0]}>
        <boxGeometry args={[0.09, 0.09, 0.09]} />
        <meshStandardMaterial color={skinColor} roughness={0.65} />
      </mesh>
      {/* Shadow blob */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <circleGeometry args={[0.3, 10]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.15} />
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
      {/* Shadow blob on ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <circleGeometry args={[0.35, 12]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.2} />
      </mesh>
      {/* Shoes */}
      <mesh position={[-0.14, 0.08, 0.05]} castShadow>
        <boxGeometry args={[0.18, 0.12, 0.28]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.6} />
      </mesh>
      <mesh position={[0.14, 0.08, 0.05]} castShadow>
        <boxGeometry args={[0.18, 0.12, 0.28]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.6} />
      </mesh>
      {/* Left leg */}
      <mesh ref={leftLegRef} position={[-0.14, 0.3, 0]} castShadow>
        <boxGeometry args={[0.17, 0.5, 0.2]} />
        <meshStandardMaterial color="#3a3a5a" roughness={0.7} />
      </mesh>
      {/* Right leg */}
      <mesh ref={rightLegRef} position={[0.14, 0.3, 0]} castShadow>
        <boxGeometry args={[0.17, 0.5, 0.2]} />
        <meshStandardMaterial color="#3a3a5a" roughness={0.7} />
      </mesh>
      {/* Belt */}
      <mesh position={[0, 0.62, 0]} castShadow>
        <boxGeometry args={[0.52, 0.06, 0.32]} />
        <meshStandardMaterial color="#5a4020" roughness={0.8} />
      </mesh>
      {/* Torso */}
      <mesh position={[0, 0.95, 0]} castShadow>
        <boxGeometry args={[0.5, 0.65, 0.3]} />
        <meshStandardMaterial color={accentColor} roughness={0.7} />
      </mesh>
      {/* Collar/neck area */}
      <mesh position={[0, 1.32, 0]} castShadow>
        <boxGeometry args={[0.25, 0.08, 0.2]} />
        <meshStandardMaterial color="#f5d0b0" roughness={0.65} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 1.6, 0]} castShadow>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial color="#f5d0b0" roughness={0.65} />
      </mesh>
      {/* Eyes */}
      <mesh position={[0.1, 1.65, 0.21]}>
        <boxGeometry args={[0.07, 0.07, 0.02]} />
        <meshBasicMaterial color="#222222" />
      </mesh>
      <mesh position={[-0.1, 1.65, 0.21]}>
        <boxGeometry args={[0.07, 0.07, 0.02]} />
        <meshBasicMaterial color="#222222" />
      </mesh>
      {/* Eye whites */}
      <mesh position={[0.1, 1.65, 0.205]}>
        <boxGeometry args={[0.09, 0.09, 0.015]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh position={[-0.1, 1.65, 0.205]}>
        <boxGeometry args={[0.09, 0.09, 0.015]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      {/* Mouth - small smile */}
      <mesh position={[0, 1.52, 0.21]}>
        <boxGeometry args={[0.12, 0.03, 0.02]} />
        <meshBasicMaterial color="#cc8877" />
      </mesh>
      {/* Nose */}
      <mesh position={[0, 1.58, 0.22]}>
        <boxGeometry args={[0.06, 0.06, 0.04]} />
        <meshStandardMaterial color="#e8c0a0" roughness={0.7} />
      </mesh>
      {/* Hair - fuller style */}
      <mesh position={[0, 1.82, -0.02]} castShadow>
        <boxGeometry args={[0.44, 0.12, 0.46]} />
        <meshStandardMaterial color="#5a3820" roughness={0.8} />
      </mesh>
      {/* Hair bangs */}
      <mesh position={[0, 1.78, 0.18]} castShadow>
        <boxGeometry args={[0.38, 0.06, 0.08]} />
        <meshStandardMaterial color="#5a3820" roughness={0.8} />
      </mesh>
      {/* Hat base */}
      <mesh position={[0, 1.92, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.32, 0.12, 8]} />
        <meshStandardMaterial color={accentColor} roughness={0.6} />
      </mesh>
      {/* Hat brim */}
      <mesh position={[0, 1.87, 0]} castShadow>
        <cylinderGeometry args={[0.38, 0.38, 0.03, 12]} />
        <meshStandardMaterial color={accentColor} roughness={0.6} />
      </mesh>
      {/* Hat top */}
      <mesh position={[0, 2.05, 0]} castShadow>
        <coneGeometry args={[0.24, 0.3, 8]} />
        <meshStandardMaterial color={accentColor} roughness={0.6} />
      </mesh>
      {/* Hat badge */}
      <mesh position={[0, 1.96, 0.28]}>
        <boxGeometry args={[0.08, 0.08, 0.02]} />
        <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={0.3} roughness={0.3} metalness={0.5} />
      </mesh>
      {/* Backpack */}
      <mesh position={[0, 0.9, -0.22]} castShadow>
        <boxGeometry args={[0.32, 0.38, 0.16]} />
        <meshStandardMaterial color="#6a5a3a" roughness={0.8} />
      </mesh>
      {/* Backpack flap */}
      <mesh position={[0, 1.1, -0.3]} castShadow>
        <boxGeometry args={[0.28, 0.08, 0.06]} />
        <meshStandardMaterial color="#5a4a2a" roughness={0.8} />
      </mesh>
      {/* Backpack buckle */}
      <mesh position={[0, 1.06, -0.31]}>
        <boxGeometry args={[0.06, 0.06, 0.02]} />
        <meshStandardMaterial color="#c0a040" roughness={0.4} metalness={0.3} />
      </mesh>
      {/* Left arm */}
      <mesh ref={leftArmRef} position={[-0.38, 0.9, 0]} castShadow>
        <boxGeometry args={[0.14, 0.55, 0.14]} />
        <meshStandardMaterial color={accentColor} roughness={0.7} />
      </mesh>
      {/* Left hand */}
      <mesh position={[-0.38, 0.58, 0]}>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshStandardMaterial color="#f5d0b0" roughness={0.65} />
      </mesh>
      {/* Right arm */}
      <mesh ref={rightArmRef} position={[0.38, 0.9, 0]} castShadow>
        <boxGeometry args={[0.14, 0.55, 0.14]} />
        <meshStandardMaterial color={accentColor} roughness={0.7} />
      </mesh>
      {/* Right hand */}
      <mesh position={[0.38, 0.58, 0]}>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshStandardMaterial color="#f5d0b0" roughness={0.65} />
      </mesh>
      {/* Player glow ring on ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[0.4, 0.7, 16]} />
        <meshBasicMaterial color={accentColor} transparent opacity={0.25} />
      </mesh>
      {/* Outer glow ring (pulsing) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 0]}>
        <ringGeometry args={[0.7, 0.85, 16]} />
        <meshBasicMaterial color={accentColor} transparent opacity={0.1} />
      </mesh>
    </group>
  );
}

// ---------------------------------------------------------------------------
// 3D Sub-components: Player sparkle trail
// ---------------------------------------------------------------------------

function PlayerTrail({
  playerGroupRef,
  accentColor,
}: {
  playerGroupRef: { readonly current: THREE.Group | null };
  accentColor: string;
}) {
  const trailCount = 12;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const trail = useRef<Array<{ x: number; y: number; z: number; life: number }>>(
    Array.from({ length: trailCount }, () => ({ x: 0, y: -10, z: 0, life: 0 })),
  );
  const prevPos = useRef(new THREE.Vector3());
  const spawnTimer = useRef(0);

  useFrame((_state, delta) => {
    if (!meshRef.current || !playerGroupRef.current) return;

    const pp = playerGroupRef.current.position;
    const dx = pp.x - prevPos.current.x;
    const dz = pp.z - prevPos.current.z;
    const isMoving = Math.abs(dx) + Math.abs(dz) > 0.01;

    prevPos.current.copy(pp);
    spawnTimer.current += delta;

    // Spawn a new trail particle when moving
    if (isMoving && spawnTimer.current > 0.08) {
      spawnTimer.current = 0;
      // Find oldest particle
      let oldestIdx = 0;
      let oldestLife = Infinity;
      for (let i = 0; i < trailCount; i++) {
        if (trail.current[i].life < oldestLife) {
          oldestLife = trail.current[i].life;
          oldestIdx = i;
        }
      }
      trail.current[oldestIdx] = {
        x: pp.x + (Math.random() - 0.5) * 0.4,
        y: 0.15 + Math.random() * 0.3,
        z: pp.z + (Math.random() - 0.5) * 0.4,
        life: 1.0,
      };
    }

    // Update all particles
    for (let i = 0; i < trailCount; i++) {
      const p = trail.current[i];
      p.life -= delta * 1.5;
      p.y += delta * 0.5;
      if (p.life <= 0) {
        p.life = 0;
        dummy.position.set(0, -10, 0);
        dummy.scale.setScalar(0);
      } else {
        dummy.position.set(p.x, p.y, p.z);
        dummy.scale.setScalar(p.life * 0.08);
      }
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, trailCount]}>
      <sphereGeometry args={[1, 4, 3]} />
      <meshBasicMaterial color={accentColor} transparent opacity={0.6} />
    </instancedMesh>
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
  npcIndex,
}: {
  npcData: NPCData;
  position: Vec3;
  color: string;
  playerGroupRef: { readonly current: THREE.Group | null };
  onInteract: (npc: NPCData) => void;
  npcIndex: number;
}) {
  const [isNear, setIsNear] = useState(false);
  const prevNear = useRef(false);
  const frameCount = useRef(0);
  const bodyRef = useRef<THREE.Group>(null);

  useFrame(() => {
    frameCount.current++;
    // Idle bob + gentle sway animation
    if (bodyRef.current) {
      bodyRef.current.position.y = Math.sin(Date.now() * 0.002 + position[0]) * 0.05;
      bodyRef.current.rotation.y = Math.sin(Date.now() * 0.001 + position[2]) * 0.1;
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

  // Unique accessory per NPC index
  const accessoryType = npcIndex % 4;

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
        {/* Accessory 0: Wizard hat */}
        {accessoryType === 0 && (
          <group>
            <mesh position={[0, 1.85, 0]} castShadow>
              <cylinderGeometry args={[0.25, 0.28, 0.1, 8]} />
              <meshStandardMaterial color={color} roughness={0.6} />
            </mesh>
            <mesh position={[0, 2.15, 0]} castShadow>
              <coneGeometry args={[0.2, 0.5, 8]} />
              <meshStandardMaterial color={color} roughness={0.6} />
            </mesh>
          </group>
        )}
        {/* Accessory 1: Crown */}
        {accessoryType === 1 && (
          <mesh position={[0, 1.88, 0]} castShadow>
            <cylinderGeometry args={[0.22, 0.22, 0.12, 5]} />
            <meshStandardMaterial color="#ffd700" metalness={0.6} roughness={0.3} />
          </mesh>
        )}
        {/* Accessory 2: Scarf (torus around neck) */}
        {accessoryType === 2 && (
          <mesh position={[0, 1.2, 0]} castShadow>
            <torusGeometry args={[0.22, 0.05, 6, 8]} />
            <meshStandardMaterial color={color} roughness={0.7} />
          </mesh>
        )}
        {/* Accessory 3: Shoulder bag */}
        {accessoryType === 3 && (
          <group>
            <mesh position={[0.3, 0.7, 0.1]} castShadow>
              <boxGeometry args={[0.18, 0.2, 0.1]} />
              <meshStandardMaterial color="#8a6a3a" roughness={0.8} />
            </mesh>
            <mesh position={[0.15, 0.95, 0.05]} rotation={[0, 0, 0.3]} castShadow>
              <boxGeometry args={[0.35, 0.04, 0.04]} />
              <meshStandardMaterial color="#7a5a2a" roughness={0.8} />
            </mesh>
          </group>
        )}
        {/* Highlight ring when near */}
        {isNear && (
          <group>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
              <ringGeometry args={[0.8, 1.1, 16]} />
              <meshBasicMaterial color="#ffd700" transparent opacity={0.5} />
            </mesh>
            {/* Outer pulse ring */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
              <ringGeometry args={[1.1, 1.2, 16]} />
              <meshBasicMaterial color="#ffd700" transparent opacity={0.2} />
            </mesh>
          </group>
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
// 3D Sub-components: Central island landmark
// ---------------------------------------------------------------------------

function CentralLandmark({ islandId }: { islandId: string }) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((_state, delta) => {
    if (!meshRef.current) return;
    // Slow rotation for some landmarks
    if (islandId === 'rainbow' || islandId === 'night') {
      meshRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={meshRef} position={[0, 0, 0]}>
      {/* VOLCANO: Large volcanic cone in center */}
      {islandId === 'volcano' && (
        <group position={[0, 0, -2]}>
          <mesh position={[0, 2.5, 0]} castShadow>
            <coneGeometry args={[4, 5, 8]} />
            <meshStandardMaterial color="#2a1a0a" roughness={0.95} />
          </mesh>
          {/* Crater top */}
          <mesh position={[0, 5.0, 0]} rotation={[0, 0, 0]}>
            <cylinderGeometry args={[1.2, 1.8, 0.5, 8]} />
            <meshStandardMaterial color="#1a0a00" roughness={0.9} />
          </mesh>
          {/* Lava glow in crater */}
          <mesh position={[0, 5.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[1.0, 8]} />
            <meshStandardMaterial color="#ff4400" emissive="#ff2200" emissiveIntensity={0.8} roughness={0.2} />
          </mesh>
          <pointLight position={[0, 5.5, 0]} color="#ff4400" intensity={2} distance={15} />
          {/* Lava streams down sides */}
          <mesh position={[1.2, 2.0, 0.5]} rotation={[0, 0.3, 0.6]} castShadow>
            <planeGeometry args={[0.3, 3]} />
            <meshStandardMaterial color="#ff3300" emissive="#ff2200" emissiveIntensity={0.5} side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[-0.8, 1.8, -1.0]} rotation={[0, -0.5, -0.5]} castShadow>
            <planeGeometry args={[0.25, 2.5]} />
            <meshStandardMaterial color="#ff4400" emissive="#ff2200" emissiveIntensity={0.4} side={THREE.DoubleSide} />
          </mesh>
        </group>
      )}

      {/* OCEAN: Lighthouse */}
      {islandId === 'ocean' && (
        <group position={[0, 0, -3]}>
          {/* Tower */}
          <mesh position={[0, 2.5, 0]} castShadow>
            <cylinderGeometry args={[0.5, 0.8, 5, 8]} />
            <meshStandardMaterial color="#e8e0d0" roughness={0.7} />
          </mesh>
          {/* Red stripe */}
          <mesh position={[0, 2.5, 0]} castShadow>
            <cylinderGeometry args={[0.52, 0.55, 1, 8]} />
            <meshStandardMaterial color="#cc3333" roughness={0.7} />
          </mesh>
          {/* Lantern room */}
          <mesh position={[0, 5.2, 0]} castShadow>
            <cylinderGeometry args={[0.6, 0.55, 0.8, 8]} />
            <meshStandardMaterial color="#aaccff" transparent opacity={0.7} roughness={0.1} />
          </mesh>
          {/* Roof */}
          <mesh position={[0, 5.8, 0]} castShadow>
            <coneGeometry args={[0.65, 0.5, 8]} />
            <meshStandardMaterial color="#444444" metalness={0.3} roughness={0.6} />
          </mesh>
          {/* Light */}
          <pointLight position={[0, 5.2, 0]} color="#ffff88" intensity={2} distance={20} />
          {/* Base platform */}
          <mesh position={[0, 0.1, 0]} castShadow>
            <cylinderGeometry args={[1.2, 1.5, 0.2, 8]} />
            <meshStandardMaterial color="#8a8a8a" roughness={0.9} />
          </mesh>
        </group>
      )}

      {/* FOREST: Giant ancient tree */}
      {islandId === 'forest' && (
        <group position={[0, 0, -2]}>
          {/* Massive trunk */}
          <mesh position={[0, 2.5, 0]} castShadow>
            <cylinderGeometry args={[0.8, 1.5, 5, 8]} />
            <meshStandardMaterial color="#4a3018" roughness={0.9} />
          </mesh>
          {/* Root system */}
          {[0, 1, 2, 3, 4].map((j) => (
            <mesh key={j} position={[Math.cos(j * 1.26) * 1.2, 0.2, Math.sin(j * 1.26) * 1.2]} rotation={[Math.sin(j) * 0.3, j * 1.26, Math.cos(j) * 0.4]} castShadow>
              <cylinderGeometry args={[0.1, 0.2, 1.5, 4]} />
              <meshStandardMaterial color="#4a3018" roughness={0.9} />
            </mesh>
          ))}
          {/* Massive canopy */}
          <mesh position={[0, 5.5, 0]} castShadow>
            <sphereGeometry args={[3, 10, 8]} />
            <meshStandardMaterial color="#1a5a1a" roughness={0.8} />
          </mesh>
          <mesh position={[1.5, 5.0, 1]} castShadow>
            <sphereGeometry args={[2, 8, 6]} />
            <meshStandardMaterial color="#2a7a2a" roughness={0.8} />
          </mesh>
          <mesh position={[-1.2, 5.2, -0.8]} castShadow>
            <sphereGeometry args={[1.8, 8, 6]} />
            <meshStandardMaterial color="#1e6e1e" roughness={0.8} />
          </mesh>
          <mesh position={[0.5, 6.0, -0.5]} castShadow>
            <sphereGeometry args={[1.5, 8, 6]} />
            <meshStandardMaterial color="#2a8a2a" roughness={0.8} />
          </mesh>
        </group>
      )}

      {/* MOUNTAIN: Snow-capped peak */}
      {islandId === 'mountain' && (
        <group position={[0, 0, -4]}>
          {/* Main peak */}
          <mesh position={[0, 3.5, 0]} castShadow>
            <coneGeometry args={[5, 7, 6]} />
            <meshStandardMaterial color="#6a6060" roughness={0.9} />
          </mesh>
          {/* Snow cap */}
          <mesh position={[0, 6.2, 0]} castShadow>
            <coneGeometry args={[2, 2.5, 6]} />
            <meshStandardMaterial color="#e8e8f4" roughness={0.4} />
          </mesh>
          {/* Secondary peak */}
          <mesh position={[3, 2, -1]} castShadow>
            <coneGeometry args={[2.5, 4, 5]} />
            <meshStandardMaterial color="#7a6a5a" roughness={0.9} />
          </mesh>
          <mesh position={[3, 3.8, -1]} castShadow>
            <coneGeometry args={[1.0, 1.2, 5]} />
            <meshStandardMaterial color="#e0e0ec" roughness={0.4} />
          </mesh>
        </group>
      )}

      {/* GARDEN: Flower arch / gazebo */}
      {islandId === 'garden' && (
        <group position={[0, 0, -1]}>
          {/* Arch pillars */}
          <mesh position={[-1.2, 1.5, 0]} castShadow>
            <cylinderGeometry args={[0.08, 0.1, 3, 6]} />
            <meshStandardMaterial color="#e8e0d0" roughness={0.7} />
          </mesh>
          <mesh position={[1.2, 1.5, 0]} castShadow>
            <cylinderGeometry args={[0.08, 0.1, 3, 6]} />
            <meshStandardMaterial color="#e8e0d0" roughness={0.7} />
          </mesh>
          {/* Arch top */}
          <mesh position={[0, 3.1, 0]} rotation={[0, 0, 0]} castShadow>
            <torusGeometry args={[1.2, 0.08, 6, 12, Math.PI]} />
            <meshStandardMaterial color="#e8e0d0" roughness={0.7} />
          </mesh>
          {/* Flowers on arch */}
          {[0, 1, 2, 3, 4, 5, 6].map((j) => {
            const a = (j / 6) * Math.PI;
            return (
              <mesh key={j} position={[Math.cos(a) * 1.2, 3.1 + Math.sin(a) * 1.2, 0]} castShadow>
                <sphereGeometry args={[0.12, 6, 4]} />
                <meshStandardMaterial color={['#ff6080', '#ffaa40', '#ff80ff', '#ff4040', '#ff6080', '#ffaa40', '#ff80ff'][j]} roughness={0.5} />
              </mesh>
            );
          })}
          {/* Ground flowers around base */}
          {[0, 1, 2, 3].map((j) => (
            <group key={`gf-${j}`} position={[Math.cos(j * 1.57) * 1.8, 0, Math.sin(j * 1.57) * 1.8]}>
              <mesh position={[0, 0.15, 0]} castShadow>
                <cylinderGeometry args={[0.015, 0.02, 0.3, 4]} />
                <meshStandardMaterial color="#3a8a2a" roughness={0.7} />
              </mesh>
              <mesh position={[0, 0.32, 0]} castShadow>
                <coneGeometry args={[0.08, 0.1, 6]} />
                <meshStandardMaterial color={['#ff6080', '#ffaa40', '#8080ff', '#ff4040'][j]} roughness={0.5} />
              </mesh>
            </group>
          ))}
        </group>
      )}

      {/* NIGHT: Glowing moon orb on pedestal */}
      {islandId === 'night' && (
        <group position={[0, 0, -2]}>
          {/* Stone pedestal */}
          <mesh position={[0, 0.5, 0]} castShadow>
            <cylinderGeometry args={[1.0, 1.3, 1, 6]} />
            <meshStandardMaterial color="#2a2040" roughness={0.8} />
          </mesh>
          <mesh position={[0, 1.1, 0]} castShadow>
            <cylinderGeometry args={[0.6, 1.0, 0.3, 6]} />
            <meshStandardMaterial color="#3a3050" roughness={0.8} />
          </mesh>
          {/* Floating moon orb */}
          <mesh position={[0, 3.0, 0]}>
            <sphereGeometry args={[1.0, 16, 12]} />
            <meshStandardMaterial color="#e0d8f8" emissive="#c0b0e0" emissiveIntensity={0.5} roughness={0.3} metalness={0.1} />
          </mesh>
          {/* Inner glow ring */}
          <mesh position={[0, 3.0, 0]} rotation={[0.3, 0, 0.2]}>
            <torusGeometry args={[1.3, 0.04, 8, 24]} />
            <meshStandardMaterial color="#b0a0d0" emissive="#8070b0" emissiveIntensity={0.8} transparent opacity={0.6} />
          </mesh>
          <pointLight position={[0, 3.0, 0]} color="#c0b0e0" intensity={2.5} distance={18} />
          {/* Stars around moon */}
          {[0, 1, 2, 3, 4].map((j) => (
            <mesh key={j} position={[Math.cos(j * 1.26) * 2, 3 + Math.sin(j * 0.8) * 1, Math.sin(j * 1.26) * 2]}>
              <octahedronGeometry args={[0.08]} />
              <meshStandardMaterial color="#ffffff" emissive="#ddddff" emissiveIntensity={1} />
            </mesh>
          ))}
        </group>
      )}

      {/* RAINBOW: Crystal prism tower */}
      {islandId === 'rainbow' && (
        <group position={[0, 0, -2]}>
          {/* Base */}
          <mesh position={[0, 0.3, 0]} castShadow>
            <cylinderGeometry args={[1.5, 1.8, 0.6, 6]} />
            <meshStandardMaterial color="#d0c0e0" roughness={0.6} metalness={0.2} />
          </mesh>
          {/* Central crystal spire */}
          <mesh position={[0, 3, 0]} castShadow>
            <coneGeometry args={[0.8, 5, 6]} />
            <meshStandardMaterial color="#e0e8ff" metalness={0.8} roughness={0.1} />
          </mesh>
          {/* Orbiting color crystals */}
          {['#ff4040', '#ff8800', '#ffdd00', '#44cc44', '#4488ff', '#8844ff'].map((c, j) => (
            <mesh key={j} position={[Math.cos(j * 1.05) * 1.8, 1.5 + j * 0.5, Math.sin(j * 1.05) * 1.8]} castShadow>
              <octahedronGeometry args={[0.25]} />
              <meshStandardMaterial color={c} emissive={c} emissiveIntensity={0.3} metalness={0.6} roughness={0.15} />
            </mesh>
          ))}
          <pointLight position={[0, 3, 0]} color="#ffffff" intensity={1.5} distance={12} />
        </group>
      )}

      {/* HOME: Town hall / clock tower */}
      {islandId === 'home' && (
        <group position={[0, 0, -2]}>
          {/* Main building */}
          <mesh position={[0, 1.2, 0]} castShadow>
            <boxGeometry args={[2.5, 2.4, 1.8]} />
            <meshStandardMaterial color="#e8d0b0" roughness={0.8} />
          </mesh>
          {/* Roof */}
          <mesh position={[0, 2.8, 0]} castShadow>
            <coneGeometry args={[1.8, 1.2, 4]} />
            <meshStandardMaterial color="#cc4444" roughness={0.7} />
          </mesh>
          {/* Clock tower */}
          <mesh position={[0, 3.8, 0]} castShadow>
            <boxGeometry args={[0.8, 1.5, 0.8]} />
            <meshStandardMaterial color="#d8c0a0" roughness={0.8} />
          </mesh>
          <mesh position={[0, 4.8, 0]} castShadow>
            <coneGeometry args={[0.6, 0.8, 4]} />
            <meshStandardMaterial color="#8a6a5a" roughness={0.7} />
          </mesh>
          {/* Clock face */}
          <mesh position={[0, 3.9, 0.41]}>
            <circleGeometry args={[0.25, 12]} />
            <meshStandardMaterial color="#fffff0" roughness={0.5} />
          </mesh>
          {/* Door */}
          <mesh position={[0, 0.4, 0.91]}>
            <planeGeometry args={[0.5, 0.8]} />
            <meshStandardMaterial color="#5c3a20" />
          </mesh>
          {/* Windows */}
          {[-0.6, 0.6].map((x) => (
            <mesh key={x} position={[x, 1.2, 0.91]}>
              <planeGeometry args={[0.35, 0.35]} />
              <meshStandardMaterial color="#aaccff" emissive="#8899bb" emissiveIntensity={0.3} />
            </mesh>
          ))}
          <pointLight position={[0, 1, 1.5]} color="#ffcc88" intensity={0.6} distance={6} />
        </group>
      )}
    </group>
  );
}

// ---------------------------------------------------------------------------
// 3D Sub-components: Sky object (sun or moon)
// ---------------------------------------------------------------------------

function SkyObject({ islandId, theme }: { islandId: string; theme: IslandTheme }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
    }
  });

  const isMoon = islandId === 'night' || islandId === 'volcano';
  const pos: Vec3 = [theme.sunPosition[0] * 2.5, theme.sunPosition[1] * 2, theme.sunPosition[2] * 2.5];

  return (
    <group position={pos}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[isMoon ? 3 : 4, 16, 12]} />
        <meshBasicMaterial
          color={isMoon ? '#e0d8f0' : '#fff8e0'}
        />
      </mesh>
      {/* Glow halo */}
      <mesh>
        <ringGeometry args={[isMoon ? 3.2 : 4.2, isMoon ? 5 : 7, 24]} />
        <meshBasicMaterial
          color={isMoon ? '#c0b0d0' : '#fff0c0'}
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>
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
      {/* Light beam pillar */}
      {!completed && (
        <mesh position={[0, 2, 0]}>
          <cylinderGeometry args={[0.02, 0.15, 4, 6]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.4}
            transparent
            opacity={0.15}
            roughness={1}
          />
        </mesh>
      )}
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
      {/* ============ VOLCANO ============ */}
      {islandId === 'volcano' &&
        positions.map((pos, i) => (
          <group key={i} position={pos}>
            {i % 4 === 0 ? (
              /* Large lava pool with glow */
              <group>
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
                  <circleGeometry args={[0.8 + (i % 3) * 0.4, 10]} />
                  <meshStandardMaterial color="#ff4400" emissive="#ff2200" emissiveIntensity={0.7} roughness={0.2} />
                </mesh>
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.035, 0]}>
                  <ringGeometry args={[0.7 + (i % 3) * 0.4, 0.9 + (i % 3) * 0.4, 10]} />
                  <meshStandardMaterial color="#ff6600" emissive="#ff4400" emissiveIntensity={0.4} roughness={0.3} />
                </mesh>
                <pointLight position={[0, 0.5, 0]} color="#ff4400" intensity={0.8} distance={5} />
              </group>
            ) : i % 4 === 1 ? (
              /* Volcanic boulder stack */
              <group>
                <mesh position={[0, 0.25, 0]} castShadow>
                  <dodecahedronGeometry args={[0.35, 0]} />
                  <meshStandardMaterial color="#2a1a10" roughness={0.95} />
                </mesh>
                <mesh position={[0.15, 0.55, 0.1]} castShadow>
                  <dodecahedronGeometry args={[0.2, 0]} />
                  <meshStandardMaterial color="#3a2a1a" roughness={0.95} />
                </mesh>
              </group>
            ) : i % 4 === 2 ? (
              /* Smoke column - stacked transparent spheres */
              <group>
                <mesh position={[0, 0.5, 0]}>
                  <sphereGeometry args={[0.2, 6, 4]} />
                  <meshStandardMaterial color="#555555" transparent opacity={0.3} roughness={1} />
                </mesh>
                <mesh position={[0.05, 1.0, 0]}>
                  <sphereGeometry args={[0.25, 6, 4]} />
                  <meshStandardMaterial color="#666666" transparent opacity={0.2} roughness={1} />
                </mesh>
                <mesh position={[-0.05, 1.5, 0.05]}>
                  <sphereGeometry args={[0.3, 6, 4]} />
                  <meshStandardMaterial color="#777777" transparent opacity={0.12} roughness={1} />
                </mesh>
              </group>
            ) : (
              /* Cracked ground with lava glow */
              <group>
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
                  <planeGeometry args={[1.5, 0.06]} />
                  <meshStandardMaterial color="#ff3300" emissive="#ff2200" emissiveIntensity={0.5} />
                </mesh>
                <mesh rotation={[-Math.PI / 2, 0.7, 0]} position={[0, 0.02, 0]}>
                  <planeGeometry args={[1.0, 0.05]} />
                  <meshStandardMaterial color="#ff3300" emissive="#ff2200" emissiveIntensity={0.4} />
                </mesh>
              </group>
            )}
          </group>
        ))}

      {/* ============ OCEAN ============ */}
      {islandId === 'ocean' &&
        positions.map((pos, i) => (
          <group key={i} position={pos}>
            {i % 5 === 0 ? (
              /* Beach umbrella */
              <group>
                <mesh position={[0, 0.8, 0]} castShadow>
                  <cylinderGeometry args={[0.03, 0.04, 1.6, 6]} />
                  <meshStandardMaterial color="#8B6914" roughness={0.8} />
                </mesh>
                <mesh position={[0, 1.65, 0]} castShadow>
                  <coneGeometry args={[0.6, 0.3, 8]} />
                  <meshStandardMaterial color={['#ff4444', '#4488ff', '#ffaa00', '#44cc44'][i % 4]} roughness={0.6} />
                </mesh>
              </group>
            ) : i % 5 === 1 ? (
              /* Coral reef cluster */
              <group>
                <mesh position={[0, 0.35, 0]} castShadow>
                  <cylinderGeometry args={[0.06, 0.12, 0.7, 5]} />
                  <meshStandardMaterial color="#ff6080" roughness={0.7} />
                </mesh>
                <mesh position={[0.2, 0.3, 0.15]} castShadow>
                  <cylinderGeometry args={[0.05, 0.1, 0.6, 5]} />
                  <meshStandardMaterial color="#ff8060" roughness={0.7} />
                </mesh>
                <mesh position={[-0.15, 0.25, 0.1]} castShadow>
                  <cylinderGeometry args={[0.04, 0.08, 0.5, 5]} />
                  <meshStandardMaterial color="#ffaa80" roughness={0.7} />
                </mesh>
                <mesh position={[0.1, 0.2, -0.1]} castShadow>
                  <sphereGeometry args={[0.12, 6, 4]} />
                  <meshStandardMaterial color="#ff9988" roughness={0.5} />
                </mesh>
              </group>
            ) : i % 5 === 2 ? (
              /* Seashell */
              <mesh position={[0, 0.06, 0]} rotation={[0.2, i * 0.7, 0]} castShadow>
                <coneGeometry args={[0.18, 0.25, 7]} />
                <meshStandardMaterial color="#f0e0c0" roughness={0.5} metalness={0.15} />
              </mesh>
            ) : i % 5 === 3 ? (
              /* Driftwood */
              <mesh position={[0, 0.08, 0]} rotation={[0, i * 0.4, Math.PI / 2]} castShadow>
                <cylinderGeometry args={[0.06, 0.08, 1.0, 5]} />
                <meshStandardMaterial color="#a09070" roughness={0.95} />
              </mesh>
            ) : (
              /* Starfish */
              <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, i * 1.2]}>
                <circleGeometry args={[0.22, 5]} />
                <meshStandardMaterial color="#ff7050" roughness={0.6} />
              </mesh>
            )}
          </group>
        ))}

      {/* ============ FOREST ============ */}
      {islandId === 'forest' &&
        positions.map((pos, i) => (
          <group key={i} position={pos}>
            {i % 5 === 0 ? (
              /* Mushroom cluster */
              <group>
                <mesh position={[0, 0.15, 0]} castShadow>
                  <cylinderGeometry args={[0.04, 0.06, 0.3, 6]} />
                  <meshStandardMaterial color="#e8e0d0" roughness={0.7} />
                </mesh>
                <mesh position={[0, 0.33, 0]} castShadow>
                  <sphereGeometry args={[0.14, 8, 4, 0, Math.PI * 2, 0, Math.PI / 2]} />
                  <meshStandardMaterial color="#cc3333" roughness={0.6} />
                </mesh>
                <mesh position={[0.2, 0.1, 0.1]} castShadow>
                  <cylinderGeometry args={[0.03, 0.04, 0.2, 6]} />
                  <meshStandardMaterial color="#e8e0d0" roughness={0.7} />
                </mesh>
                <mesh position={[0.2, 0.22, 0.1]} castShadow>
                  <sphereGeometry args={[0.09, 6, 4, 0, Math.PI * 2, 0, Math.PI / 2]} />
                  <meshStandardMaterial color="#dd5555" roughness={0.6} />
                </mesh>
              </group>
            ) : i % 5 === 1 ? (
              /* Fallen log with moss */
              <group>
                <mesh position={[0, 0.12, 0]} rotation={[0, i * 0.3, Math.PI / 2]} castShadow>
                  <cylinderGeometry args={[0.12, 0.15, 1.5, 6]} />
                  <meshStandardMaterial color="#5c3a1e" roughness={0.9} />
                </mesh>
                <mesh position={[0.2, 0.22, 0]} castShadow>
                  <sphereGeometry args={[0.15, 6, 4]} />
                  <meshStandardMaterial color="#2a6a20" roughness={0.9} />
                </mesh>
              </group>
            ) : i % 5 === 2 ? (
              /* Large bush */
              <group>
                <mesh position={[0, 0.3, 0]} castShadow>
                  <sphereGeometry args={[0.35, 8, 6]} />
                  <meshStandardMaterial color="#2a6a20" roughness={0.8} />
                </mesh>
                <mesh position={[0.2, 0.25, 0.15]} castShadow>
                  <sphereGeometry args={[0.25, 6, 6]} />
                  <meshStandardMaterial color="#3a7a30" roughness={0.8} />
                </mesh>
              </group>
            ) : i % 5 === 3 ? (
              /* Fairy ring of small mushrooms */
              <group>
                {[0, 1, 2, 3, 4, 5].map((j) => (
                  <mesh key={j} position={[Math.cos(j * 1.05) * 0.4, 0.06, Math.sin(j * 1.05) * 0.4]} castShadow>
                    <cylinderGeometry args={[0.02, 0.03, 0.12, 4]} />
                    <meshStandardMaterial color="#f0e8d0" roughness={0.7} />
                  </mesh>
                ))}
              </group>
            ) : (
              /* Fern */
              <group>
                {[0, 1, 2].map((j) => (
                  <mesh key={j} position={[0, 0.15, 0]} rotation={[0.3, j * 2.1, 0]} castShadow>
                    <planeGeometry args={[0.5, 0.3]} />
                    <meshStandardMaterial color="#2a7a20" roughness={0.8} side={THREE.DoubleSide} />
                  </mesh>
                ))}
              </group>
            )}
          </group>
        ))}

      {/* ============ MOUNTAIN ============ */}
      {islandId === 'mountain' &&
        positions.map((pos, i) => (
          <group key={i} position={pos}>
            {i % 4 === 0 ? (
              /* Crystal cluster */
              <group>
                <mesh position={[0, 0.5, 0]} rotation={[0.1, i * 0.5, 0.05]} castShadow>
                  <coneGeometry args={[0.15, 1.0, 4]} />
                  <meshStandardMaterial color="#a0d0ff" metalness={0.6} roughness={0.2} />
                </mesh>
                <mesh position={[0.2, 0.35, 0.1]} rotation={[-0.15, 0, 0.25]} castShadow>
                  <coneGeometry args={[0.1, 0.7, 4]} />
                  <meshStandardMaterial color="#c0e0ff" metalness={0.6} roughness={0.2} />
                </mesh>
                <mesh position={[-0.1, 0.25, 0.15]} rotation={[0.1, 0.3, -0.15]} castShadow>
                  <coneGeometry args={[0.08, 0.5, 4]} />
                  <meshStandardMaterial color="#b0d8ff" metalness={0.5} roughness={0.25} />
                </mesh>
                <pointLight position={[0, 0.6, 0]} color="#a0d0ff" intensity={0.3} distance={3} />
              </group>
            ) : i % 4 === 1 ? (
              /* Stone cairn */
              <group>
                <mesh position={[0, 0.15, 0]} castShadow>
                  <dodecahedronGeometry args={[0.25, 0]} />
                  <meshStandardMaterial color="#7a7a7a" roughness={0.9} />
                </mesh>
                <mesh position={[0, 0.4, 0]} castShadow>
                  <dodecahedronGeometry args={[0.18, 0]} />
                  <meshStandardMaterial color="#8a8a8a" roughness={0.9} />
                </mesh>
                <mesh position={[0, 0.6, 0]} castShadow>
                  <dodecahedronGeometry args={[0.12, 0]} />
                  <meshStandardMaterial color="#9a9a9a" roughness={0.9} />
                </mesh>
              </group>
            ) : i % 4 === 2 ? (
              /* Snow patch */
              <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
                <circleGeometry args={[0.5 + (i % 3) * 0.3, 10]} />
                <meshStandardMaterial color="#e8e8f4" roughness={0.4} metalness={0.05} />
              </mesh>
            ) : (
              /* Small flag */
              <group>
                <mesh position={[0, 0.6, 0]} castShadow>
                  <cylinderGeometry args={[0.02, 0.03, 1.2, 4]} />
                  <meshStandardMaterial color="#6a5a4a" roughness={0.8} />
                </mesh>
                <mesh position={[0.12, 1.1, 0]} castShadow>
                  <planeGeometry args={[0.24, 0.15]} />
                  <meshStandardMaterial color={['#ff4444', '#44aaff', '#ffcc00'][i % 3]} side={THREE.DoubleSide} roughness={0.6} />
                </mesh>
              </group>
            )}
          </group>
        ))}

      {/* ============ GARDEN ============ */}
      {islandId === 'garden' &&
        positions.map((pos, i) => (
          <group key={i} position={pos}>
            {i % 5 === 0 ? (
              /* Flower cluster on stems */
              <group>
                {[0, 1, 2].map((j) => (
                  <group key={j} position={[(j - 1) * 0.15, 0, (j % 2) * 0.1]}>
                    <mesh position={[0, 0.2 + j * 0.05, 0]} castShadow>
                      <cylinderGeometry args={[0.015, 0.02, 0.4 + j * 0.1, 4]} />
                      <meshStandardMaterial color="#3a8a2a" roughness={0.7} />
                    </mesh>
                    <mesh position={[0, 0.42 + j * 0.1, 0]} castShadow>
                      <coneGeometry args={[0.1, 0.12, 6]} />
                      <meshStandardMaterial color={['#ff6080', '#ffaa40', '#ff80ff', '#8080ff', '#ff4040'][(i + j) % 5]} roughness={0.5} />
                    </mesh>
                  </group>
                ))}
              </group>
            ) : i % 5 === 1 ? (
              /* Garden bench */
              <group>
                <mesh position={[0, 0.2, 0]} castShadow>
                  <boxGeometry args={[0.8, 0.06, 0.3]} />
                  <meshStandardMaterial color="#8a6a3a" roughness={0.8} />
                </mesh>
                <mesh position={[-0.35, 0.1, 0]} castShadow>
                  <boxGeometry args={[0.06, 0.2, 0.25]} />
                  <meshStandardMaterial color="#7a5a2a" roughness={0.8} />
                </mesh>
                <mesh position={[0.35, 0.1, 0]} castShadow>
                  <boxGeometry args={[0.06, 0.2, 0.25]} />
                  <meshStandardMaterial color="#7a5a2a" roughness={0.8} />
                </mesh>
              </group>
            ) : i % 5 === 2 ? (
              /* Stepping stone */
              <mesh rotation={[-Math.PI / 2, 0, i * 0.5]} position={[0, 0.03, 0]} receiveShadow>
                <circleGeometry args={[0.25, 8]} />
                <meshStandardMaterial color="#b0a898" roughness={0.9} />
              </mesh>
            ) : i % 5 === 3 ? (
              /* Butterfly pair */
              <group>
                <mesh position={[0.1, 0.7 + Math.sin(i) * 0.3, 0]}>
                  <sphereGeometry args={[0.05, 4, 4]} />
                  <meshStandardMaterial color="#ff80ff" emissive="#ff80ff" emissiveIntensity={0.3} />
                </mesh>
                <mesh position={[-0.2, 0.9 + Math.sin(i + 1) * 0.2, 0.15]}>
                  <sphereGeometry args={[0.04, 4, 4]} />
                  <meshStandardMaterial color="#88ccff" emissive="#88ccff" emissiveIntensity={0.3} />
                </mesh>
              </group>
            ) : (
              /* Small fountain */
              <group>
                <mesh position={[0, 0.15, 0]} castShadow>
                  <cylinderGeometry args={[0.3, 0.35, 0.3, 8]} />
                  <meshStandardMaterial color="#a0a0a0" roughness={0.7} />
                </mesh>
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.3, 0]}>
                  <circleGeometry args={[0.25, 8]} />
                  <meshStandardMaterial color="#4488cc" roughness={0.2} metalness={0.1} />
                </mesh>
              </group>
            )}
          </group>
        ))}

      {/* ============ NIGHT ============ */}
      {islandId === 'night' &&
        positions.map((pos, i) => (
          <group key={i} position={pos}>
            {i % 4 === 0 ? (
              /* Floating lantern */
              <group position={[0, 1.5 + (i % 3) * 0.5, 0]}>
                <mesh castShadow>
                  <boxGeometry args={[0.28, 0.35, 0.28]} />
                  <meshStandardMaterial color="#ffcc44" emissive="#ffaa22" emissiveIntensity={0.7} transparent opacity={0.85} />
                </mesh>
                <mesh position={[0, 0.25, 0]}>
                  <coneGeometry args={[0.18, 0.15, 4]} />
                  <meshStandardMaterial color="#cc8822" roughness={0.7} />
                </mesh>
                <pointLight color="#ffaa22" intensity={0.8} distance={6} />
              </group>
            ) : i % 4 === 1 ? (
              /* Glowing crystal */
              <group>
                <mesh position={[0, 0.3, 0]} castShadow>
                  <octahedronGeometry args={[0.25]} />
                  <meshStandardMaterial color="#8060c0" emissive="#6040a0" emissiveIntensity={0.6} metalness={0.5} roughness={0.2} />
                </mesh>
                <pointLight position={[0, 0.3, 0]} color="#8060c0" intensity={0.4} distance={3} />
              </group>
            ) : i % 4 === 2 ? (
              /* Moon stone (large glowing rock) */
              <group>
                <mesh position={[0, 0.2, 0]} castShadow>
                  <dodecahedronGeometry args={[0.3, 0]} />
                  <meshStandardMaterial color="#c0b8d8" emissive="#9090c0" emissiveIntensity={0.2} roughness={0.5} />
                </mesh>
              </group>
            ) : (
              /* Firefly jar */
              <group>
                <mesh position={[0, 0.2, 0]} castShadow>
                  <cylinderGeometry args={[0.1, 0.12, 0.3, 8]} />
                  <meshStandardMaterial color="#c0d0e0" transparent opacity={0.4} roughness={0.1} />
                </mesh>
                <pointLight position={[0, 0.2, 0]} color="#aaff66" intensity={0.3} distance={2} />
              </group>
            )}
          </group>
        ))}

      {/* ============ RAINBOW ============ */}
      {islandId === 'rainbow' &&
        positions.map((pos, i) => (
          <group key={i} position={pos}>
            {i % 4 === 0 ? (
              /* Crystal prism cluster */
              <group>
                <mesh position={[0, 0.5, 0]} rotation={[0.2 * i, 0.3 * i, 0.1 * i]} castShadow>
                  <tetrahedronGeometry args={[0.35]} />
                  <meshStandardMaterial color={['#ff4040', '#ff8800', '#ffdd00', '#44cc44', '#4488ff', '#8844ff'][i % 6]} metalness={0.7} roughness={0.15} emissive={['#ff4040', '#ff8800', '#ffdd00', '#44cc44', '#4488ff', '#8844ff'][i % 6]} emissiveIntensity={0.2} />
                </mesh>
                <mesh position={[0.2, 0.3, 0.15]} rotation={[0.1, 0.5, 0.2]} castShadow>
                  <tetrahedronGeometry args={[0.2]} />
                  <meshStandardMaterial color={['#ff8800', '#ffdd00', '#44cc44', '#4488ff', '#8844ff', '#ff4040'][(i + 1) % 6]} metalness={0.7} roughness={0.15} />
                </mesh>
              </group>
            ) : i % 4 === 1 ? (
              /* Color fountain (stacked rings) */
              <group>
                {[0, 1, 2].map((j) => (
                  <mesh key={j} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1 + j * 0.25, 0]}>
                    <ringGeometry args={[0.15 + j * 0.1, 0.2 + j * 0.1, 12]} />
                    <meshStandardMaterial color={['#ff4040', '#44cc44', '#4488ff'][j]} emissive={['#ff4040', '#44cc44', '#4488ff'][j]} emissiveIntensity={0.3} transparent opacity={0.7} />
                  </mesh>
                ))}
              </group>
            ) : i % 4 === 2 ? (
              /* Mirror shard */
              <mesh position={[0, 0.3, 0]} rotation={[0.3, i * 0.8, 0.1]} castShadow>
                <planeGeometry args={[0.4, 0.5]} />
                <meshStandardMaterial color="#e0e8f8" metalness={0.9} roughness={0.05} side={THREE.DoubleSide} />
              </mesh>
            ) : (
              /* Rainbow ground ring */
              <group>
                {[0, 1, 2, 3, 4, 5].map((j) => (
                  <mesh key={j} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02 + j * 0.003, 0]}>
                    <ringGeometry args={[0.3 + j * 0.08, 0.35 + j * 0.08, 16]} />
                    <meshStandardMaterial color={['#ff0000', '#ff8800', '#ffff00', '#00cc00', '#0066ff', '#8800ff'][j]} transparent opacity={0.5} />
                  </mesh>
                ))}
              </group>
            )}
          </group>
        ))}

      {/* ============ HOME ============ */}
      {islandId === 'home' &&
        positions.map((pos, i) => (
          <group key={i} position={pos}>
            {i % 5 === 0 ? (
              /* Cozy house with chimney */
              <group>
                <mesh position={[0, 0.45, 0]} castShadow>
                  <boxGeometry args={[1.0, 0.9, 0.7]} />
                  <meshStandardMaterial color="#e8d0b0" roughness={0.8} />
                </mesh>
                <mesh position={[0, 1.05, 0]} castShadow>
                  <coneGeometry args={[0.65, 0.6, 4]} />
                  <meshStandardMaterial color="#cc4444" roughness={0.7} />
                </mesh>
                {/* Door */}
                <mesh position={[0, 0.25, 0.36]}>
                  <planeGeometry args={[0.25, 0.45]} />
                  <meshStandardMaterial color="#5c3a20" />
                </mesh>
                {/* Windows */}
                <mesh position={[0.25, 0.5, 0.36]}>
                  <planeGeometry args={[0.18, 0.18]} />
                  <meshStandardMaterial color="#aaccff" emissive="#8899bb" emissiveIntensity={0.3} />
                </mesh>
                <mesh position={[-0.25, 0.5, 0.36]}>
                  <planeGeometry args={[0.18, 0.18]} />
                  <meshStandardMaterial color="#aaccff" emissive="#8899bb" emissiveIntensity={0.3} />
                </mesh>
                {/* Chimney */}
                <mesh position={[0.3, 1.15, -0.15]} castShadow>
                  <boxGeometry args={[0.15, 0.4, 0.15]} />
                  <meshStandardMaterial color="#8a6a5a" roughness={0.9} />
                </mesh>
                <pointLight position={[0, 0.5, 0.5]} color="#ffcc88" intensity={0.4} distance={4} />
              </group>
            ) : i % 5 === 1 ? (
              /* Picket fence section */
              <group>
                {[0, 1, 2, 3].map((j) => (
                  <mesh key={j} position={[j * 0.2 - 0.3, 0.2, 0]} castShadow>
                    <boxGeometry args={[0.05, 0.4, 0.05]} />
                    <meshStandardMaterial color="#e8e0d0" roughness={0.8} />
                  </mesh>
                ))}
                <mesh position={[0, 0.3, 0]} castShadow>
                  <boxGeometry args={[0.7, 0.04, 0.04]} />
                  <meshStandardMaterial color="#e8e0d0" roughness={0.8} />
                </mesh>
                <mesh position={[0, 0.15, 0]} castShadow>
                  <boxGeometry args={[0.7, 0.04, 0.04]} />
                  <meshStandardMaterial color="#e8e0d0" roughness={0.8} />
                </mesh>
              </group>
            ) : i % 5 === 2 ? (
              /* Lamppost with warm glow */
              <group>
                <mesh position={[0, 0.9, 0]} castShadow>
                  <cylinderGeometry args={[0.04, 0.06, 1.8, 6]} />
                  <meshStandardMaterial color="#4a4a4a" metalness={0.5} roughness={0.4} />
                </mesh>
                <mesh position={[0, 1.85, 0]}>
                  <sphereGeometry args={[0.14, 8, 6]} />
                  <meshStandardMaterial color="#ffffaa" emissive="#ffcc44" emissiveIntensity={0.7} />
                </mesh>
                <pointLight position={[0, 1.9, 0]} color="#ffcc44" intensity={0.7} distance={6} />
              </group>
            ) : i % 5 === 3 ? (
              /* Mailbox */
              <group>
                <mesh position={[0, 0.45, 0]} castShadow>
                  <cylinderGeometry args={[0.03, 0.04, 0.9, 4]} />
                  <meshStandardMaterial color="#5a5a5a" roughness={0.7} />
                </mesh>
                <mesh position={[0, 0.95, 0.05]} castShadow>
                  <boxGeometry args={[0.2, 0.15, 0.12]} />
                  <meshStandardMaterial color="#4466cc" roughness={0.6} />
                </mesh>
              </group>
            ) : (
              /* Garden gnome (simple) */
              <group>
                <mesh position={[0, 0.12, 0]} castShadow>
                  <cylinderGeometry args={[0.08, 0.1, 0.24, 6]} />
                  <meshStandardMaterial color="#4488ff" roughness={0.7} />
                </mesh>
                <mesh position={[0, 0.3, 0]} castShadow>
                  <sphereGeometry args={[0.08, 6, 4]} />
                  <meshStandardMaterial color="#f5d0b0" roughness={0.65} />
                </mesh>
                <mesh position={[0, 0.42, 0]} castShadow>
                  <coneGeometry args={[0.08, 0.15, 6]} />
                  <meshStandardMaterial color="#ff3333" roughness={0.6} />
                </mesh>
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
    // Subtle camera breathing
    const t = Date.now() * 0.001;
    const breathX = Math.sin(t * 0.3) * 0.15;
    const breathY = Math.cos(t * 0.25) * 0.1;
    _desiredCam.set(
      target.x + CAM_OFFSET.x + breathX,
      CAM_OFFSET.y + breathY,
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

function SkyDome({ theme, islandId }: { theme: IslandTheme; islandId: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const starsRef = useRef<THREE.InstancedMesh>(null);
  const starDummy = useMemo(() => new THREE.Object3D(), []);

  // Is this a dark/night sky island?
  const isDarkSky = islandId === 'night' || islandId === 'volcano';
  const starCount = isDarkSky ? 80 : 0;

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

  // Place stars in upper hemisphere
  useEffect(() => {
    if (!starsRef.current || starCount === 0) return;
    const rng = makeRng(99999);
    for (let i = 0; i < starCount; i++) {
      const theta = rng() * Math.PI * 0.4 + 0.1; // upper portion
      const phi = rng() * Math.PI * 2;
      const r = 70;
      starDummy.position.set(
        r * Math.sin(theta) * Math.cos(phi),
        r * Math.cos(theta),
        r * Math.sin(theta) * Math.sin(phi),
      );
      starDummy.scale.setScalar(0.1 + rng() * 0.2);
      starDummy.updateMatrix();
      starsRef.current.setMatrixAt(i, starDummy.matrix);
    }
    starsRef.current.instanceMatrix.needsUpdate = true;
  }, [starCount, starDummy]);

  // Twinkle stars
  useFrame(() => {
    if (!starsRef.current || starCount === 0) return;
    const t = Date.now() * 0.001;
    for (let i = 0; i < starCount; i++) {
      starsRef.current.getMatrixAt(i, starDummy.matrix);
      starDummy.matrix.decompose(starDummy.position, starDummy.quaternion, starDummy.scale);
      const twinkle = 0.1 + Math.abs(Math.sin(t * 2 + i * 1.7)) * 0.2;
      starDummy.scale.setScalar(twinkle);
      starDummy.updateMatrix();
      starsRef.current.setMatrixAt(i, starDummy.matrix);
    }
    starsRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <mesh ref={meshRef} scale={[-1, 1, 1]}>
        <sphereGeometry args={[80, 32, 16]} />
        <meshBasicMaterial vertexColors side={THREE.BackSide} />
      </mesh>
      {starCount > 0 && (
        <instancedMesh ref={starsRef} args={[undefined, undefined, starCount]}>
          <sphereGeometry args={[1, 4, 3]} />
          <meshBasicMaterial color="#ffffff" />
        </instancedMesh>
      )}
    </group>
  );
}

// ---------------------------------------------------------------------------
// 3D Sub-components: Water ring around island
// ---------------------------------------------------------------------------

function WaterRing({ theme }: { theme: IslandTheme }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const geoRef = useRef<THREE.RingGeometry | null>(null);
  const origY = useRef<Float32Array | null>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);

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
      // Multiple wave frequencies for realistic water
      const wave1 = Math.sin(t * 1.5 + x * 0.3 + z * 0.3) * 0.15;
      const wave2 = Math.sin(t * 2.1 + x * 0.5 - z * 0.2) * 0.08;
      const wave3 = Math.cos(t * 0.8 + x * 0.15 + z * 0.4) * 0.1;
      pos.setY(i, origY.current[i] + wave1 + wave2 + wave3);
    }
    pos.needsUpdate = true;
    geoRef.current.computeVertexNormals();
    // Subtle emissive pulse for water glow
    if (matRef.current) {
      matRef.current.emissiveIntensity = 0.05 + Math.sin(t * 0.5) * 0.03;
    }
  });

  return (
    <group>
      {/* Main water surface */}
      <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.15, 0]}>
        <ringGeometry args={[GROUND_SIZE - 1, GROUND_SIZE + 18, 96, 8]} />
        <meshStandardMaterial
          ref={matRef}
          color={theme.waterColor}
          emissive={theme.waterColor}
          emissiveIntensity={0.05}
          transparent
          opacity={theme.waterOpacity}
          roughness={0.15}
          metalness={0.3}
        />
      </mesh>
      {/* Shallow water transition near shore */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
        <ringGeometry args={[GROUND_SIZE - 2, GROUND_SIZE + 1, 64]} />
        <meshStandardMaterial
          color={theme.waterColor}
          transparent
          opacity={theme.waterOpacity * 0.4}
          roughness={0.3}
        />
      </mesh>
      {/* Foam line at shore edge */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <ringGeometry args={[GROUND_SIZE - 0.5, GROUND_SIZE + 0.3, 64]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.25} roughness={0.9} />
      </mesh>
    </group>
  );
}

// ---------------------------------------------------------------------------
// 3D Sub-components: Ambient particles (InstancedMesh for performance)
// ---------------------------------------------------------------------------

function AmbientParticles({ islandId }: { theme: IslandTheme; islandId: string }) {
  const count = 50;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const offsets = useMemo(() => {
    const arr: Array<{
      x: number; y: number; z: number; speed: number; phase: number;
      driftX: number; driftZ: number;
    }> = [];
    const rng = makeRng((SEED_MAP[islandId] ?? 101) + 8888);
    for (let i = 0; i < count; i++) {
      const angle = rng() * Math.PI * 2;
      const r = 3 + rng() * (GROUND_SIZE - 6);
      arr.push({
        x: Math.cos(angle) * r,
        y: 0.5 + rng() * 6,
        z: Math.sin(angle) * r,
        speed: 0.3 + rng() * 0.7,
        phase: rng() * Math.PI * 2,
        driftX: (rng() - 0.5) * 2,
        driftZ: (rng() - 0.5) * 2,
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
      const xOff = Math.sin(t * 0.5 + o.phase) * o.driftX;
      const zOff = Math.cos(t * 0.3 + o.phase) * o.driftZ;
      dummy.position.set(o.x + xOff, o.y + yOff, o.z + zOff);
      // Pulsing scale for glow-like effect
      const pulse = 0.04 + Math.sin(t * 2.5 + o.phase) * 0.025;
      dummy.scale.setScalar(Math.max(0.01, pulse));
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 4]} />
      <meshStandardMaterial
        color={particleColor}
        emissive={particleColor}
        emissiveIntensity={0.8}
        transparent
        opacity={0.7}
        roughness={1}
      />
    </instancedMesh>
  );
}

// ---------------------------------------------------------------------------
// 3D Sub-components: Grass tufts (InstancedMesh)
// ---------------------------------------------------------------------------

function GrassTufts({ theme, islandId }: { theme: IslandTheme; islandId: string }) {
  const count = 180;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const grassData = useMemo(() => {
    const rng = makeRng((SEED_MAP[islandId] ?? 101) + 6666);
    const arr: Array<{
      x: number; z: number; scaleX: number; scaleY: number; scaleZ: number;
      baseRotY: number; phase: number;
    }> = [];
    for (let i = 0; i < count; i++) {
      const angle = rng() * Math.PI * 2;
      const r = 2 + rng() * (GROUND_SIZE - 4);
      arr.push({
        x: Math.cos(angle) * r,
        z: Math.sin(angle) * r,
        scaleX: 0.08 + rng() * 0.06,
        scaleY: 0.15 + rng() * 0.25,
        scaleZ: 0.08 + rng() * 0.06,
        baseRotY: rng() * Math.PI,
        phase: rng() * Math.PI * 2,
      });
    }
    return arr;
  }, [islandId]);

  useFrame(() => {
    if (!meshRef.current) return;
    const t = Date.now() * 0.001;
    for (let i = 0; i < count; i++) {
      const g = grassData[i];
      dummy.position.set(g.x, 0.08, g.z);
      dummy.scale.set(g.scaleX, g.scaleY, g.scaleZ);
      // Wind sway
      dummy.rotation.set(
        Math.sin(t * 1.2 + g.phase) * 0.15,
        g.baseRotY,
        Math.cos(t * 0.9 + g.phase + 1) * 0.1,
      );
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

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
      lightRef.current.shadow.camera.left = -40;
      lightRef.current.shadow.camera.right = 40;
      lightRef.current.shadow.camera.top = 40;
      lightRef.current.shadow.camera.bottom = -40;
      lightRef.current.shadow.bias = -0.0008;
      lightRef.current.shadow.normalBias = 0.02;
      lightRef.current.shadow.camera.updateProjectionMatrix();
    }
  }, []);

  return (
    <>
      <ambientLight intensity={theme.ambientIntensity} color={theme.ambientColor} />
      {/* Main sun/key light */}
      <directionalLight
        ref={lightRef}
        position={theme.sunPosition}
        intensity={theme.sunIntensity}
        color={theme.sunColor}
        castShadow
      />
      {/* Rim/back light from opposite side */}
      <directionalLight
        position={[-theme.sunPosition[0], theme.sunPosition[1] * 0.5, -theme.sunPosition[2]]}
        intensity={theme.sunIntensity * 0.18}
        color={theme.ambientColor}
      />
      {/* Fill light from the side for softer shadows */}
      <directionalLight
        position={[theme.sunPosition[2], theme.sunPosition[1] * 0.3, -theme.sunPosition[0]]}
        intensity={theme.sunIntensity * 0.1}
        color={theme.sunColor}
      />
      {/* Hemisphere light for natural sky/ground bounce */}
      <hemisphereLight
        color={theme.sunColor}
        groundColor={theme.groundColor}
        intensity={0.3}
      />
      {/* Center point light for warm glow near landmarks */}
      <pointLight
        position={[0, 3, 0]}
        color={theme.ambientColor}
        intensity={0.4}
        distance={15}
        decay={2}
      />
    </>
  );
}

// ---------------------------------------------------------------------------
// 3D Sub-components: Animated clouds
// ---------------------------------------------------------------------------

function CloudLayer({ theme }: { theme: IslandTheme }) {
  const groupRef = useRef<THREE.Group>(null);
  const cloudCount = 8;

  const clouds = useMemo(() => {
    const arr: Array<{
      x: number;
      z: number;
      y: number;
      scaleX: number;
      scaleZ: number;
      speed: number;
      phase: number;
    }> = [];
    const rng = makeRng(12345);
    for (let i = 0; i < cloudCount; i++) {
      const angle = (i / cloudCount) * Math.PI * 2 + rng() * 0.5;
      const r = 20 + rng() * 30;
      arr.push({
        x: Math.cos(angle) * r,
        z: Math.sin(angle) * r,
        y: 18 + rng() * 10,
        scaleX: 3 + rng() * 5,
        scaleZ: 2 + rng() * 3,
        speed: 0.3 + rng() * 0.5,
        phase: rng() * Math.PI * 2,
      });
    }
    return arr;
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;
    const t = Date.now() * 0.0001;
    groupRef.current.children.forEach((child, i) => {
      const cloud = clouds[i];
      if (!cloud) return;
      child.position.x = cloud.x + Math.sin(t * cloud.speed + cloud.phase) * 8;
      child.position.z = cloud.z + Math.cos(t * cloud.speed * 0.7 + cloud.phase) * 5;
    });
  });

  // Pick a cloud color based on theme sky
  const cloudColor = useMemo(() => {
    const sky = new THREE.Color(theme.skyColor);
    return new THREE.Color().lerpColors(sky, new THREE.Color('#ffffff'), 0.6).getHexString();
  }, [theme.skyColor]);

  return (
    <group ref={groupRef}>
      {clouds.map((c, i) => (
        <group key={i} position={[c.x, c.y, c.z]}>
          {/* Cloud puffs - 3 overlapping spheres */}
          <mesh>
            <sphereGeometry args={[c.scaleX * 0.5, 8, 6]} />
            <meshStandardMaterial
              color={`#${cloudColor}`}
              transparent
              opacity={0.5}
              roughness={1}
              flatShading
            />
          </mesh>
          <mesh position={[c.scaleX * 0.3, -0.3, 0.5]}>
            <sphereGeometry args={[c.scaleX * 0.4, 8, 6]} />
            <meshStandardMaterial
              color={`#${cloudColor}`}
              transparent
              opacity={0.45}
              roughness={1}
              flatShading
            />
          </mesh>
          <mesh position={[-c.scaleX * 0.25, 0.2, -0.3]}>
            <sphereGeometry args={[c.scaleZ * 0.45, 8, 6]} />
            <meshStandardMaterial
              color={`#${cloudColor}`}
              transparent
              opacity={0.4}
              roughness={1}
              flatShading
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// ---------------------------------------------------------------------------
// 3D: Ambient Wildlife (butterflies, fireflies based on island)
// ---------------------------------------------------------------------------

function AmbientWildlife({ islandId, theme }: { islandId: string; theme: IslandTheme }) {
  const groupRef = useRef<THREE.Group>(null);

  const creatures = useMemo(() => {
    const rng = makeRng((SEED_MAP[islandId] ?? 101) + 8888);
    const count = 8;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: -GROUND_SIZE / 2 + rng() * GROUND_SIZE,
      y: 1 + rng() * 3,
      z: -GROUND_SIZE / 2 + rng() * GROUND_SIZE,
      speed: 0.5 + rng() * 1.5,
      radius: 2 + rng() * 4,
      phase: rng() * Math.PI * 2,
      wingSpeed: 5 + rng() * 8,
      color: theme.foliageColor,
    }));
  }, [islandId, theme.foliageColor]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.children.forEach((creature, i) => {
      if (i >= creatures.length) return;
      const c = creatures[i];
      creature.position.x = c.x + Math.sin(t * c.speed + c.phase) * c.radius;
      creature.position.y = c.y + Math.sin(t * c.speed * 1.3 + c.phase) * 0.5;
      creature.position.z = c.z + Math.cos(t * c.speed * 0.7 + c.phase) * c.radius;
      // Wing flap for butterflies
      if (creature.children.length >= 2) {
        const wingAngle = Math.sin(t * c.wingSpeed) * 0.6;
        creature.children[0].rotation.z = wingAngle;
        creature.children[1].rotation.z = -wingAngle;
      }
    });
  });

  const isNight = islandId === 'night';
  const isOcean = islandId === 'ocean';

  return (
    <group ref={groupRef}>
      {creatures.map((c) => (
        <group key={c.id} position={[c.x, c.y, c.z]}>
          {isNight ? (
            // Fireflies for night island
            <mesh>
              <sphereGeometry args={[0.06, 6, 6]} />
              <meshStandardMaterial
                color="#aaff44"
                emissive="#aaff44"
                emissiveIntensity={1.5}
                transparent
                opacity={0.8}
              />
            </mesh>
          ) : isOcean ? (
            // Fish for ocean island
            <>
              <mesh>
                <capsuleGeometry args={[0.06, 0.15, 4, 8]} />
                <meshStandardMaterial color="#88ccee" roughness={0.3} />
              </mesh>
              <mesh position={[0, 0, 0.12]} rotation={[0, 0.3, 0]}>
                <boxGeometry args={[0.01, 0.08, 0.06]} />
                <meshStandardMaterial color="#66aacc" />
              </mesh>
            </>
          ) : (
            // Butterflies for other islands
            <>
              {/* Left wing */}
              <mesh position={[-0.06, 0, 0]} rotation={[0, 0, 0.3]}>
                <planeGeometry args={[0.15, 0.1]} />
                <meshStandardMaterial
                  color={c.color}
                  emissive={c.color}
                  emissiveIntensity={0.3}
                  side={THREE.DoubleSide}
                  transparent
                  opacity={0.8}
                />
              </mesh>
              {/* Right wing */}
              <mesh position={[0.06, 0, 0]} rotation={[0, 0, -0.3]}>
                <planeGeometry args={[0.15, 0.1]} />
                <meshStandardMaterial
                  color={c.color}
                  emissive={c.color}
                  emissiveIntensity={0.3}
                  side={THREE.DoubleSide}
                  transparent
                  opacity={0.8}
                />
              </mesh>
              {/* Body */}
              <mesh>
                <capsuleGeometry args={[0.015, 0.06, 4, 6]} />
                <meshStandardMaterial color="#333" />
              </mesh>
            </>
          )}
        </group>
      ))}
    </group>
  );
}




// ---------------------------------------------------------------------------
// 3D: Dock & Airport (departure points for inter-island travel)
// ---------------------------------------------------------------------------

function DockArea({ theme }: { theme: IslandTheme }) {
  const dockRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (glowRef.current) {
      const t = clock.getElapsedTime();
      glowRef.current.scale.setScalar(1 + Math.sin(t * 2) * 0.15);
      (glowRef.current.material as THREE.MeshStandardMaterial).opacity = 0.3 + Math.sin(t * 1.5) * 0.15;
    }
  });

  return (
    <group ref={dockRef} position={[-GROUND_SIZE + 3, 0, 0]}>
      {/* Wooden pier planks */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <mesh key={`plank-${i}`} position={[-i * 1.8, 0.15, 0]}>
          <boxGeometry args={[1.5, 0.15, 3]} />
          <meshStandardMaterial color="#6b4423" roughness={0.9} />
        </mesh>
      ))}
      {/* Pier posts */}
      {[0, 2, 4].map((i) => (
        <group key={`post-pair-${i}`}>
          <mesh position={[-i * 1.8, -0.3, 1.3]}>
            <cylinderGeometry args={[0.08, 0.1, 1, 6]} />
            <meshStandardMaterial color="#4a2e16" roughness={0.9} />
          </mesh>
          <mesh position={[-i * 1.8, -0.3, -1.3]}>
            <cylinderGeometry args={[0.08, 0.1, 1, 6]} />
            <meshStandardMaterial color="#4a2e16" roughness={0.9} />
          </mesh>
        </group>
      ))}
      {/* Bollards at end */}
      <mesh position={[-9.5, 0.5, 1]}>
        <cylinderGeometry args={[0.15, 0.15, 0.5, 8]} />
        <meshStandardMaterial color="#888" metalness={0.4} roughness={0.5} />
      </mesh>
      <mesh position={[-9.5, 0.5, -1]}>
        <cylinderGeometry args={[0.15, 0.15, 0.5, 8]} />
        <meshStandardMaterial color="#888" metalness={0.4} roughness={0.5} />
      </mesh>
      {/* Lantern on dock */}
      <mesh position={[-4, 1.5, 1.5]}>
        <cylinderGeometry args={[0.05, 0.06, 2, 6]} />
        <meshStandardMaterial color="#4a4a4a" />
      </mesh>
      <mesh position={[-4, 2.6, 1.5]}>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshStandardMaterial
          color="#FFD700"
          emissive="#FFD700"
          emissiveIntensity={0.8}
          transparent
          opacity={0.8}
        />
      </mesh>
      {/* Glow beacon at end */}
      <mesh ref={glowRef} position={[-9.5, 1.5, 0]}>
        <sphereGeometry args={[0.5, 12, 12]} />
        <meshStandardMaterial
          color={theme.waterColor}
          emissive={theme.waterColor}
          emissiveIntensity={0.6}
          transparent
          opacity={0.3}
        />
      </mesh>
      {/* Boat moored at dock */}
      <group position={[-10, -0.1, 0]} rotation={[0, Math.PI / 2, 0]}>
        <mesh>
          <boxGeometry args={[1.2, 0.5, 3]} />
          <meshStandardMaterial color="#5c3a1e" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.3, 0]}>
          <boxGeometry args={[1, 0.08, 2.5]} />
          <meshStandardMaterial color="#8B6914" roughness={0.7} />
        </mesh>
        <mesh position={[0, 1.2, -0.2]}>
          <cylinderGeometry args={[0.04, 0.06, 2, 6]} />
          <meshStandardMaterial color="#3e2710" roughness={0.9} />
        </mesh>
        <mesh position={[0.3, 1.3, -0.2]} rotation={[0, 0.1, 0]}>
          <planeGeometry args={[1, 1.2]} />
          <meshStandardMaterial
            color={theme.waterColor}
            side={THREE.DoubleSide}
            transparent
            opacity={0.85}
          />
        </mesh>
      </group>
      {/* Sign post */}
      <group position={[0.5, 0, 2]}>
        <mesh position={[0, 0.8, 0]}>
          <cylinderGeometry args={[0.05, 0.06, 1.6, 6]} />
          <meshStandardMaterial color="#4a2e16" roughness={0.9} />
        </mesh>
        <Html
          position={[0, 1.7, 0]}
          center
          distanceFactor={12}
          style={{ pointerEvents: 'none' }}
        >
          <div
            style={{
              background: 'rgba(30,20,60,0.9)',
              border: '1px solid rgba(201,168,76,0.4)',
              borderRadius: '6px',
              padding: '4px 10px',
              color: '#ffd700',
              fontSize: '11px',
              fontWeight: 'bold',
              whiteSpace: 'nowrap',
              textShadow: '0 0 6px rgba(255,215,0,0.3)',
            }}
          >
            {'\u26F5'} Hafen
          </div>
        </Html>
      </group>
    </group>
  );
}

function AirportArea({ theme }: { theme: IslandTheme }) {
  const beaconRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (beaconRef.current) {
      const t = clock.getElapsedTime();
      (beaconRef.current.material as THREE.MeshStandardMaterial).opacity = 0.4 + Math.sin(t * 3) * 0.3;
    }
  });

  return (
    <group position={[GROUND_SIZE - 6, 0.02, -GROUND_SIZE + 8]} rotation={[0, -Math.PI / 4, 0]}>
      {/* Runway */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3, 16]} />
        <meshStandardMaterial color="#333" roughness={0.9} />
      </mesh>
      {/* Runway center line */}
      {[-6, -4, -2, 0, 2, 4, 6].map((z) => (
        <mesh key={`line-${z}`} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, z]}>
          <planeGeometry args={[0.15, 1]} />
          <meshStandardMaterial color="#ddd" roughness={0.8} />
        </mesh>
      ))}
      {/* Runway edge lights */}
      {[-7, -5, -3, -1, 1, 3, 5, 7].map((z, i) => (
        <group key={`rlight-${i}`}>
          <mesh position={[1.5, 0.15, z]}>
            <sphereGeometry args={[0.08, 6, 6]} />
            <meshStandardMaterial
              color={z < 0 ? '#00ff44' : '#ff4400'}
              emissive={z < 0 ? '#00ff44' : '#ff4400'}
              emissiveIntensity={0.8}
            />
          </mesh>
          <mesh position={[-1.5, 0.15, z]}>
            <sphereGeometry args={[0.08, 6, 6]} />
            <meshStandardMaterial
              color={z < 0 ? '#00ff44' : '#ff4400'}
              emissive={z < 0 ? '#00ff44' : '#ff4400'}
              emissiveIntensity={0.8}
            />
          </mesh>
        </group>
      ))}
      {/* Control tower */}
      <group position={[4, 0, 2]}>
        <mesh position={[0, 1.5, 0]}>
          <boxGeometry args={[1.5, 3, 1.5]} />
          <meshStandardMaterial color="#555" roughness={0.7} />
        </mesh>
        <mesh position={[0, 3.3, 0]}>
          <boxGeometry args={[2, 0.8, 2]} />
          <meshStandardMaterial color="#444" roughness={0.6} metalness={0.2} />
        </mesh>
        {/* Tower windows */}
        {[0, Math.PI / 2, Math.PI, -Math.PI / 2].map((rot, i) => (
          <mesh
            key={`towerwin-${i}`}
            position={[
              Math.sin(rot) * 0.95,
              3.3,
              Math.cos(rot) * 0.95,
            ]}
            rotation={[0, rot, 0]}
          >
            <planeGeometry args={[1.2, 0.5]} />
            <meshStandardMaterial
              color="#88ccff"
              emissive="#88ccff"
              emissiveIntensity={0.4}
              transparent
              opacity={0.7}
            />
          </mesh>
        ))}
        {/* Beacon light */}
        <mesh ref={beaconRef} position={[0, 3.9, 0]}>
          <sphereGeometry args={[0.25, 8, 8]} />
          <meshStandardMaterial
            color="#ff3300"
            emissive="#ff3300"
            emissiveIntensity={1}
            transparent
            opacity={0.6}
          />
        </mesh>
      </group>
      {/* Small parked airplane */}
      <group position={[-3.5, 0.3, -3]} rotation={[0, Math.PI / 6, 0]} scale={0.5}>
        <mesh>
          <capsuleGeometry args={[0.4, 3, 6, 12]} />
          <meshStandardMaterial color="white" roughness={0.3} />
        </mesh>
        <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[0.08, 5, 1]} />
          <meshStandardMaterial color="#ddd" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.5, 2]}>
          <boxGeometry args={[0.06, 1.2, 0.6]} />
          <meshStandardMaterial color={theme.waterColor} />
        </mesh>
      </group>
      {/* Sign */}
      <Html
        position={[0, 2, -8.5]}
        center
        distanceFactor={12}
        style={{ pointerEvents: 'none' }}
      >
        <div
          style={{
            background: 'rgba(30,20,60,0.9)',
            border: '1px solid rgba(201,168,76,0.4)',
            borderRadius: '6px',
            padding: '4px 10px',
            color: '#ffd700',
            fontSize: '11px',
            fontWeight: 'bold',
            whiteSpace: 'nowrap',
            textShadow: '0 0 6px rgba(255,215,0,0.3)',
          }}
        >
          {'\u2708\uFE0F'} Flughafen
        </div>
      </Html>
    </group>
  );
}

// ---------------------------------------------------------------------------
// 3D Sub-components: Aurora Ribbons (Night island atmospheric ribbons)
// ---------------------------------------------------------------------------

function AuroraRibbons() {
  const groupRef = useRef<THREE.Group>(null);

  const ribbons = useMemo(() => {
    const rng = makeRng(606 + 3333);
    return Array.from({ length: 4 }, () => {
      const hue = rng();
      return {
        x: (rng() - 0.5) * 30,
        y: 14 + rng() * 6,
        z: (rng() - 0.5) * 30,
        width: 8 + rng() * 12,
        phase: rng() * Math.PI * 2,
        speed: 0.2 + rng() * 0.3,
        color: new THREE.Color().setHSL(hue, 0.7, 0.5),
        emissiveColor: new THREE.Color().setHSL(hue, 0.8, 0.4),
      };
    });
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.children.forEach((ribbon, i) => {
      if (i >= ribbons.length) return;
      const d = ribbons[i];
      ribbon.position.y = d.y + Math.sin(t * d.speed + d.phase) * 2;
      ribbon.rotation.x = Math.sin(t * 0.3 + d.phase) * 0.2;
      ribbon.rotation.z = Math.cos(t * 0.2 + d.phase) * 0.15;
      ribbon.scale.x = 1 + Math.sin(t * 0.5 + d.phase) * 0.2;
    });
  });

  return (
    <group ref={groupRef}>
      {ribbons.map((d, i) => (
        <mesh key={i} position={[d.x, d.y, d.z]} rotation={[0.3, 0, 0]}>
          <planeGeometry args={[d.width, 0.8, 8, 1]} />
          <meshStandardMaterial
            color={d.color}
            emissive={d.emissiveColor}
            emissiveIntensity={1.2}
            transparent
            opacity={0.35}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

// ---------------------------------------------------------------------------
// 3D Sub-components: Rainbow Arcs (Rainbow island prismatic arcs)
// ---------------------------------------------------------------------------

function RainbowArcs() {
  const groupRef = useRef<THREE.Group>(null);

  const arcs = useMemo(() => {
    const colors = ['#ff4444', '#ffaa22', '#ffee44', '#44cc44', '#4488ff'];
    return colors.map((color, i) => ({
      color,
      radius: 8 + i * 1.5,
      y: 6 + i * 0.3,
      phase: i * 0.5,
    }));
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.children.forEach((arc, i) => {
      if (i >= arcs.length) return;
      const d = arcs[i];
      arc.position.y = d.y + Math.sin(t * 0.3 + d.phase) * 0.5;
      arc.rotation.y = t * 0.05;
    });
  });

  return (
    <group ref={groupRef}>
      {arcs.map((d, i) => (
        <mesh key={i} position={[0, d.y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[d.radius, 0.12, 6, 32, Math.PI * 0.6]} />
          <meshStandardMaterial
            color={d.color}
            emissive={d.color}
            emissiveIntensity={0.5}
            transparent
            opacity={0.4}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

// ---------------------------------------------------------------------------
// 3D Sub-components: WeatherSystem (dramatic per-island atmosphere)
// Uses a single InstancedMesh with ~200 particles for performance.
// Each island gets unique weather: ash, rain, pollen, snow, petals, etc.
// ---------------------------------------------------------------------------

function WeatherSystem({ islandId, theme }: { islandId: string; theme: IslandTheme }) {
  const PARTICLE_COUNT = 200;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const colorsReady = useRef(false);

  // Reset instance colors when island changes
  useEffect(() => {
    colorsReady.current = false;
  }, [islandId]);

  // Per-particle spawn data (deterministic per island)
  const particles = useMemo(() => {
    const rng = makeRng((SEED_MAP[islandId] ?? 101) + 7777);
    const spawnR: Record<string, number> = {
      volcano: 30, ocean: 30, forest: 25, mountain: 30,
      garden: 28, night: 30, rainbow: 28, home: 25,
    };
    const hMin: Record<string, number> = {
      volcano: 8, ocean: 6, forest: 2, mountain: 8,
      garden: 1, night: 5, rainbow: 1, home: 0.5,
    };
    const hMax: Record<string, number> = {
      volcano: 20, ocean: 18, forest: 10, mountain: 22,
      garden: 8, night: 25, rainbow: 15, home: 6,
    };
    const sMin: Record<string, number> = {
      volcano: 0.05, ocean: 0.02, forest: 0.04, mountain: 0.03,
      garden: 0.05, night: 0.02, rainbow: 0.03, home: 0.03,
    };
    const sMax: Record<string, number> = {
      volcano: 0.1, ocean: 0.05, forest: 0.08, mountain: 0.06,
      garden: 0.1, night: 0.05, rainbow: 0.07, home: 0.06,
    };
    const radius = spawnR[islandId] ?? 25;
    const yMin = hMin[islandId] ?? 2;
    const yMax = hMax[islandId] ?? 12;
    const szMin = sMin[islandId] ?? 0.04;
    const szMax = sMax[islandId] ?? 0.08;

    const arr: Array<{
      x: number; y: number; z: number;
      phase: number; speed: number;
      driftX: number; driftZ: number;
      size: number;
    }> = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const angle = rng() * Math.PI * 2;
      const r = rng() * radius;
      arr.push({
        x: Math.cos(angle) * r,
        y: yMin + rng() * (yMax - yMin),
        z: Math.sin(angle) * r,
        phase: rng() * Math.PI * 2,
        speed: 0.5 + rng() * 1.0,
        driftX: (rng() - 0.5) * 2,
        driftZ: (rng() - 0.5) * 2,
        size: szMin + rng() * (szMax - szMin),
      });
    }
    return arr;
  }, [islandId]);

  // Pre-computed per-particle colors (RGB triplets in Float32Array)
  const pColors = useMemo(() => {
    const rng = makeRng((SEED_MAP[islandId] ?? 101) + 7778);
    const arr = new Float32Array(PARTICLE_COUNT * 3);
    const tmp = new THREE.Color();
    const baseColors: Record<string, string> = {
      volcano: '#555555', ocean: '#aaccee', forest: '#bbdd44',
      mountain: '#eeeeff', garden: '#ffbbcc', night: '#8888ff',
      rainbow: '#ffffff', home: '#ffdd88',
    };
    const base = new THREE.Color(baseColors[islandId] ?? '#ffffff');

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      tmp.copy(base);
      if (islandId === 'volcano' && rng() < 0.15) {
        tmp.setHex(0xff4400);
        tmp.offsetHSL(0, 0, rng() * 0.15);
      } else if (islandId === 'rainbow') {
        tmp.setHSL(rng(), 0.8, 0.6);
      } else if (islandId === 'night') {
        const hues = [0.3, 0.45, 0.6, 0.75, 0.85];
        tmp.setHSL(hues[Math.floor(rng() * hues.length)], 0.7, 0.5 + rng() * 0.3);
      } else if (islandId === 'garden') {
        tmp.setHSL(0.9 + rng() * 0.15, 0.5 + rng() * 0.3, 0.7 + rng() * 0.2);
      } else {
        tmp.offsetHSL((rng() - 0.5) * 0.05, 0, (rng() - 0.5) * 0.1);
      }
      arr[i * 3] = tmp.r;
      arr[i * 3 + 1] = tmp.g;
      arr[i * 3 + 2] = tmp.b;
    }
    return arr;
  }, [islandId]);

  // Material emissive config per island
  const matConfig = useMemo(() => {
    const cfgs: Record<string, { emissive: string; emissiveIntensity: number; opacity: number }> = {
      volcano: { emissive: '#ff4400', emissiveIntensity: 0.3, opacity: 0.6 },
      ocean: { emissive: '#4488cc', emissiveIntensity: 0.1, opacity: 0.4 },
      forest: { emissive: '#88aa00', emissiveIntensity: 0.4, opacity: 0.5 },
      mountain: { emissive: '#aabbcc', emissiveIntensity: 0.15, opacity: 0.7 },
      garden: { emissive: '#ff6699', emissiveIntensity: 0.3, opacity: 0.6 },
      night: { emissive: '#6644ff', emissiveIntensity: 0.8, opacity: 0.6 },
      rainbow: { emissive: '#ffffff', emissiveIntensity: 0.5, opacity: 0.5 },
      home: { emissive: '#ffcc44', emissiveIntensity: 0.4, opacity: 0.4 },
    };
    return cfgs[islandId] ?? cfgs.home;
  }, [islandId]);

  // Atmospheric point lights (use theme colors for cohesion)
  const atmosLights = useMemo(() => {
    const lights: Array<{ pos: Vec3; color: string; intensity: number; dist: number }> = [];
    if (islandId === 'volcano') {
      lights.push({ pos: [0, 8, 0], color: '#ff4400', intensity: 0.6, dist: 40 });
      lights.push({ pos: [10, 3, 10], color: '#ff6600', intensity: 0.3, dist: 20 });
    } else if (islandId === 'ocean') {
      lights.push({ pos: [0, 12, 0], color: theme.ambientColor, intensity: 0.2, dist: 35 });
    } else if (islandId === 'night') {
      lights.push({ pos: [-8, 15, 0], color: '#44ff88', intensity: 0.4, dist: 30 });
      lights.push({ pos: [8, 14, 5], color: '#6644ff', intensity: 0.4, dist: 30 });
      lights.push({ pos: [0, 16, -8], color: '#ff44aa', intensity: 0.3, dist: 25 });
    } else if (islandId === 'rainbow') {
      lights.push({ pos: [0, 10, 0], color: '#ff88ff', intensity: 0.3, dist: 30 });
    } else if (islandId === 'garden') {
      lights.push({ pos: [0, 6, 0], color: '#ffdd88', intensity: 0.3, dist: 25 });
    }
    // Subtle ground-level fog light using theme fog color for all islands
    lights.push({ pos: [0, 1.5, 0], color: theme.fogColor, intensity: 0.15, dist: 20 });
    return lights;
  }, [islandId, theme.ambientColor, theme.fogColor]);

  useFrame(() => {
    if (!meshRef.current) return;

    // Apply per-instance colors on first valid frame
    if (!colorsReady.current) {
      const c = new THREE.Color();
      for (let ci = 0; ci < PARTICLE_COUNT; ci++) {
        c.setRGB(pColors[ci * 3], pColors[ci * 3 + 1], pColors[ci * 3 + 2]);
        meshRef.current.setColorAt(ci, c);
      }
      if (meshRef.current.instanceColor) {
        meshRef.current.instanceColor.needsUpdate = true;
      }
      colorsReady.current = true;
    }

    const t = Date.now() * 0.001;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = particles[i];
      let x = p.x;
      let y = p.y;
      let z = p.z;
      let sx = p.size;
      let sy = p.size;
      let sz = p.size;

      // ---------- VOLCANO: ash fall + ember bursts ----------
      if (islandId === 'volcano') {
        const cycle = 12;
        if (i < 30) {
          // Embers: glow and rise with flicker
          y = 1 + ((p.y - 1 + t * 1.5 * p.speed) % cycle + cycle) % cycle;
          const flicker = 1.5 + Math.sin(t * 8 + p.phase) * 0.8;
          sx = sy = sz = p.size * flicker;
          x += Math.sin(t * 2 + p.phase * 3) * 1.5;
          z += Math.cos(t * 1.5 + p.phase * 2) * 1.0;
        } else {
          // Ash particles: slow fall with turbulence
          y = 20 - ((20 - p.y + t * 0.8 * p.speed) % cycle + cycle) % cycle;
          x += Math.sin(t * 0.5 + p.phase) * p.driftX * 2;
          z += Math.cos(t * 0.3 + p.phase) * p.driftZ * 2;
          x += Math.sin(t * 2 + p.phase * 3) * 0.3;
        }

      // ---------- OCEAN: rain + rolling mist ----------
      } else if (islandId === 'ocean') {
        const cycle = 12;
        if (i < 40) {
          // Mist/fog particles: large, slow, ground-hugging
          y = 0.5 + Math.sin(t * 0.2 + p.phase) * 1.5 + Math.abs(Math.sin(p.phase)) * 2;
          sx = sy = sz = p.size * 3;
          x = p.x + Math.sin(t * 0.15 + p.phase) * p.driftX * 5;
          z = p.z + Math.cos(t * 0.1 + p.phase) * p.driftZ * 5;
        } else {
          // Rain: fast falling elongated drops
          y = 18 - ((18 - p.y + t * 4.0 * p.speed) % cycle + cycle) % cycle;
          x += Math.sin(t * 0.1 + p.phase) * 0.5 + Math.sin(p.phase) * 0.3;
          sx = p.size * 0.4;
          sy = p.size * 4;
          sz = p.size * 0.4;
        }

      // ---------- FOREST: pollen/spores + falling leaves + light rays ----------
      } else if (islandId === 'forest') {
        const cycle = 8;
        if (i < 25) {
          // Falling leaves: larger, slow tumble
          y = 10 - ((10 - p.y + t * 0.4 * p.speed) % cycle + cycle) % cycle;
          sx = sy = sz = p.size * 2.5;
          x += Math.sin(t * 1.2 + p.phase * 3) * 2;
          z += Math.cos(t * 0.8 + p.phase) * 2;
        } else if (i >= 180) {
          // Light rays through canopy: tall thin vertical columns
          y = 8 + Math.sin(t * 0.1 + p.phase) * 0.5;
          sx = p.size * 0.5;
          sy = p.size * 8;
          sz = p.size * 0.5;
          x += Math.sin(t * 0.05 + p.phase) * 0.3;
        } else {
          // Pollen/spores: lazy floating spirals
          x += Math.sin(t * 0.8 + p.phase * 2) * 1.5;
          z += Math.cos(t * 0.6 + p.phase * 2 + 2) * 1.5;
          y += Math.sin(t * 0.3 + p.phase) * 0.8;
        }

      // ---------- MOUNTAIN: snow + wind streaks + cold fog ----------
      } else if (islandId === 'mountain') {
        const cycle = 14;
        if (i < 30) {
          // Wind streaks: fast horizontal motion, thin shapes
          const windX = ((p.x + t * 2.5) % 60 + 60) % 60 - 30;
          x = windX;
          y = 6 + Math.sin(p.phase) * 8;
          sx = p.size * 0.3;
          sy = p.size * 0.3;
          sz = p.size * 3;
        } else if (i >= 170) {
          // Cold blue fog: ground-level, slow-rolling
          y = 0.3 + Math.sin(t * 0.1 + p.phase) * 0.3;
          sx = sy = sz = p.size * 4;
          x = p.x + Math.sin(t * 0.08 + p.phase) * p.driftX * 6;
          z = p.z + Math.cos(t * 0.06 + p.phase) * p.driftZ * 6;
        } else {
          // Snow: gentle fall with wind gusts
          y = 22 - ((22 - p.y + t * 0.5 * p.speed) % cycle + cycle) % cycle;
          const gust = Math.sin(t * 0.15 + p.phase) > 0.7 ? 3.0 : 1.0;
          x += Math.sin(t * 0.5 + p.phase) * p.driftX * gust;
          z += Math.cos(t * 0.4 + p.phase) * p.driftZ * 0.5;
        }

      // ---------- GARDEN: flower petals + warm golden light ----------
      } else if (islandId === 'garden') {
        const cycle = 7;
        if (i >= 180) {
          // Warm golden light motes: float and pulse
          y = 4 + Math.sin(t * 0.4 + p.phase) * 2;
          sx = sy = sz = p.size * (1 + Math.sin(t * 2 + p.phase) * 0.5);
          x += Math.sin(t * 0.2 + p.phase) * 2;
          z += Math.cos(t * 0.15 + p.phase) * 2;
        } else {
          // Flower petals: gentle tumbling drift downward
          const petalY = p.y + Math.sin(t * 1.5 + p.phase) * 0.3;
          y = 8 - ((8 - petalY + t * 0.2 * p.speed) % cycle + cycle) % cycle;
          x += Math.sin(t * 0.6 + p.phase * 3) * 2;
          z += Math.cos(t * 0.5 + p.phase * 2) * 2;
        }

      // ---------- NIGHT: shooting stars + moonbeams + aurora particles ----------
      } else if (islandId === 'night') {
        if (i < 12) {
          // Shooting stars: fast diagonal streaks with fade
          const starCycle = ((t * 2 + p.phase * 5) % 12);
          if (starCycle < 0.8) {
            x = p.x + starCycle * 18;
            y = 22 - starCycle * 10;
            z = p.z + starCycle * 6;
            const fade = 1 - starCycle / 0.8;
            sx = sy = sz = p.size * 3 * fade;
          } else {
            sx = sy = sz = 0;
          }
        } else if (i < 60) {
          // Moonbeams: tall vertical columns of faint light
          y = 3 + Math.sin(t * 0.15 + p.phase) * 1;
          sx = p.size * 0.5;
          sy = p.size * 10;
          sz = p.size * 0.5;
          x += Math.sin(t * 0.05 + p.phase) * 0.5;
        } else {
          // Aurora particles: slow undulation at high altitude
          y = 12 + Math.sin(t * 0.3 + p.phase * 2) * 4;
          x += Math.sin(t * 0.2 + p.phase) * 5;
          z += Math.cos(t * 0.15 + p.phase + 1) * 3;
          sx = sy = sz = p.size * (1.5 + Math.sin(t * 0.5 + p.phase) * 0.8);
        }

      // ---------- RAINBOW: prismatic orbiting sparkles ----------
      } else if (islandId === 'rainbow') {
        const orbitR = 3 + Math.sin(p.phase) * 12;
        const orbitSpd = 0.1 + p.speed * 0.15;
        x = Math.cos(t * orbitSpd + p.phase) * orbitR;
        z = Math.sin(t * orbitSpd + p.phase) * orbitR;
        y = 1 + Math.sin(t * 0.5 + p.phase * 3) * 8;
        // Sparkle flash
        sx = sy = sz = p.size * (0.5 + Math.abs(Math.sin(t * 3 + p.phase * 5)) * 2);

      // ---------- HOME: warm rising motes + floating rune symbols ----------
      } else if (islandId === 'home') {
        const cycle = 5.5;
        if (i >= 180) {
          // Floating rune-like larger particles
          y = 2 + Math.sin(t * 0.2 + p.phase) * 1.5;
          sx = sy = sz = p.size * 3;
          x = p.x + Math.sin(t * 0.1 + p.phase) * 3;
          z = p.z + Math.cos(t * 0.08 + p.phase) * 3;
        } else {
          // Warm rising motes
          y = 0.5 + ((p.y - 0.5 + t * 0.15 * p.speed) % cycle + cycle) % cycle;
          x += Math.sin(t * 0.3 + p.phase) * 1.5;
          z += Math.cos(t * 0.25 + p.phase + 1) * 1.5;
          sx = sy = sz = p.size * (0.8 + Math.sin(t * 1.5 + p.phase) * 0.4);
        }
      }

      dummy.position.set(x, Math.max(0.05, y), z);
      dummy.scale.set(Math.max(0.001, sx), Math.max(0.001, sy), Math.max(0.001, sz));
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      {/* Main weather particle system (200 instances) */}
      <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]} frustumCulled={false}>
        <sphereGeometry args={[1, 5, 3]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive={matConfig.emissive}
          emissiveIntensity={matConfig.emissiveIntensity}
          transparent
          opacity={matConfig.opacity}
          roughness={1}
          depthWrite={false}
        />
      </instancedMesh>

      {/* Atmospheric point lights per island */}
      {atmosLights.map((l, i) => (
        <pointLight
          key={`weather-light-${i}`}
          position={l.pos}
          color={l.color}
          intensity={l.intensity}
          distance={l.dist}
          decay={2}
        />
      ))}

      {/* Night island: aurora borealis ribbons */}
      {islandId === 'night' && <AuroraRibbons />}

      {/* Rainbow island: prismatic arcs */}
      {islandId === 'rainbow' && <RainbowArcs />}
    </group>
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
  playerPosRef,
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
  playerPosRef: React.MutableRefObject<{ x: number; z: number }>;
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

  // Nearest NPC check + player pos sync (throttled in useFrame)
  useFrame(() => {
    frameCount.current++;
    // Sync player position for mini-map
    if (playerGroupRef.current) {
      playerPosRef.current.x = playerGroupRef.current.position.x;
      playerPosRef.current.z = playerGroupRef.current.position.z;
    }
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
      <SkyDome theme={theme} islandId={islandId} />

      {/* Lighting */}
      <SceneLighting theme={theme} />

      {/* Animated clouds */}
      <CloudLayer theme={theme} />

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

      {/* Dramatic per-island weather/atmosphere */}
      <WeatherSystem islandId={islandId} theme={theme} />

      {/* Central landmark */}
      <CentralLandmark islandId={islandId} />

      {/* Sun or Moon in sky */}
      <SkyObject islandId={islandId} theme={theme} />

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
          seed={i}
        />
      ))}

      {/* Island decorations */}
      <IslandDecorations islandId={islandId} positions={decoPositions} />

      {/* NPCs */}
      {npcs.map((npc, npcIdx) => (
        <NPCCharacter
          key={npc.data.id}
          npcData={npc.data}
          position={npc.pos}
          color={npc.color}
          playerGroupRef={playerGroupRef}
          onInteract={onNPCInteract}
          npcIndex={npcIdx}
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

      {/* Ambient wildlife (butterflies, fireflies, fish) */}
      <AmbientWildlife islandId={islandId} theme={theme} />

      {/* Dock area (harbor for boat travel) */}
      <DockArea theme={theme} />

      {/* Airport area (for airplane travel) */}
      <AirportArea theme={theme} />

      {/* Player character */}
      <PlayerCharacter
        accentColor={theme.playerAccent}
        keysRef={keysRef}
        mobileDirRef={mobileDirRef}
        clickTargetRef={clickTargetRef}
        groupRef={playerGroupRef}
      />

      {/* Player sparkle trail */}
      <PlayerTrail playerGroupRef={playerGroupRef} accentColor={theme.playerAccent} />

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

// ---------------------------------------------------------------------------
// Island travel data (for departure menu)
// ---------------------------------------------------------------------------

const TRAVEL_ISLAND_INFO: Record<string, { name: string; emoji: string }> = {
  volcano: { name: 'Vulkaninsel', emoji: '\u{1F30B}' },
  ocean: { name: 'Ozean-Insel', emoji: '\u{1F30A}' },
  forest: { name: 'Wald-Insel', emoji: '\u{1F33F}' },
  mountain: { name: 'Berg-Insel', emoji: '\u{1F3D4}\u{FE0F}' },
  garden: { name: 'Garten-Insel', emoji: '\u{1F338}' },
  night: { name: 'Nacht-Insel', emoji: '\u{1F319}' },
  rainbow: { name: 'Regenbogen-Insel', emoji: '\u{1F308}' },
  home: { name: 'Heimat-Insel', emoji: '\u{1F3E0}' },
};

const TRAVEL_CONNECTIONS: [string, string][] = [
  ['volcano', 'ocean'],
  ['ocean', 'forest'],
  ['volcano', 'mountain'],
  ['forest', 'garden'],
  ['mountain', 'night'],
  ['night', 'rainbow'],
  ['rainbow', 'home'],
  ['garden', 'home'],
  ['ocean', 'garden'],
  ['mountain', 'rainbow'],
];

function isAdjacentIsland(from: string, to: string): boolean {
  return TRAVEL_CONNECTIONS.some(
    ([a, b]) => (a === from && b === to) || (b === from && a === to),
  );
}

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

// ---------------------------------------------------------------------------
// HUD: Mini-map (GTA-style radar overlay)
// ---------------------------------------------------------------------------

function MiniMap({
  playerPosRef,
  npcs,
  scenarioMarkers,
  activityMarkers,
  theme,
}: {
  playerPosRef: React.MutableRefObject<{ x: number; z: number }>;
  npcs: Array<{ data: NPCData; pos: Vec3; color: string }>;
  scenarioMarkers: Array<ScenarioData & { pos: Vec3 }>;
  activityMarkers: Array<ActivityData & { pos: Vec3 }>;
  theme: IslandTheme;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 140;
    const half = size / 2;
    const scale = half / GROUND_SIZE; // map world coords to canvas

    let animId: number;

    const draw = () => {
      ctx.clearRect(0, 0, size, size);

      // Background circle
      ctx.beginPath();
      ctx.arc(half, half, half - 2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(10, 10, 30, 0.75)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(201, 168, 76, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Island ground circle
      ctx.beginPath();
      ctx.arc(half, half, (GROUND_SIZE * scale), 0, Math.PI * 2);
      ctx.fillStyle = `${theme.groundColor}30`;
      ctx.fill();
      ctx.strokeStyle = `${theme.groundColor}60`;
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // Player position
      const px = playerPosRef.current.x;
      const pz = playerPosRef.current.z;
      const mapX = half + px * scale;
      const mapZ = half + pz * scale;

      // NPCs (blue dots)
      for (const npc of npcs) {
        const nx = half + npc.pos[0] * scale;
        const nz = half + npc.pos[2] * scale;
        ctx.beginPath();
        ctx.arc(nx, nz, 3, 0, Math.PI * 2);
        ctx.fillStyle = npc.color;
        ctx.fill();
      }

      // Scenario markers (yellow diamonds)
      for (const s of scenarioMarkers) {
        const sx = half + s.pos[0] * scale;
        const sz = half + s.pos[2] * scale;
        ctx.save();
        ctx.translate(sx, sz);
        ctx.rotate(Math.PI / 4);
        ctx.fillStyle = '#ffd700';
        ctx.fillRect(-3, -3, 6, 6);
        ctx.restore();
      }

      // Activity markers (green triangles)
      for (const a of activityMarkers) {
        const ax = half + a.pos[0] * scale;
        const az = half + a.pos[2] * scale;
        ctx.beginPath();
        ctx.moveTo(ax, az - 4);
        ctx.lineTo(ax + 3.5, az + 3);
        ctx.lineTo(ax - 3.5, az + 3);
        ctx.closePath();
        ctx.fillStyle = '#44cc88';
        ctx.fill();
      }

      // Dock indicator (anchor icon - west side)
      const dockX = half + (-GROUND_SIZE + 3) * scale;
      const dockZ = half;
      ctx.beginPath();
      ctx.arc(dockX, dockZ, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#6699cc';
      ctx.fill();
      ctx.strokeStyle = '#88bbee';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Airport indicator (plane icon - northeast)
      const airX = half + (GROUND_SIZE - 6) * scale;
      const airZ = half + (-GROUND_SIZE + 8) * scale;
      ctx.beginPath();
      ctx.arc(airX, airZ, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#cc8844';
      ctx.fill();
      ctx.strokeStyle = '#eebb66';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Player arrow (white triangle pointing up)
      ctx.save();
      ctx.translate(mapX, mapZ);
      ctx.beginPath();
      ctx.moveTo(0, -5);
      ctx.lineTo(3.5, 4);
      ctx.lineTo(-3.5, 4);
      ctx.closePath();
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,215,0,0.6)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();

      // Compass directions
      ctx.fillStyle = 'rgba(201,168,76,0.5)';
      ctx.font = 'bold 8px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('N', half, 12);
      ctx.fillText('S', half, size - 5);
      ctx.fillText('W', 8, half + 3);
      ctx.fillText('O', size - 8, half + 3);

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, [playerPosRef, npcs, scenarioMarkers, activityMarkers, theme]);

  return (
    <div
      className="fixed bottom-20 right-4 z-40"
      style={{
        width: 140,
        height: 140,
        borderRadius: '50%',
        overflow: 'hidden',
        boxShadow: '0 0 20px rgba(0,0,0,0.6), inset 0 0 10px rgba(201,168,76,0.1)',
      }}
    >
      <canvas
        ref={canvasRef}
        width={140}
        height={140}
        style={{ width: 140, height: 140 }}
      />
    </div>
  );
}

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
  const unlockedIslands = useGameStore((s) => s.unlockedIslands);
  const startTravel = useGameStore((s) => s.startTravel);

  const islandId = activeIsland ?? ('volcano' as IslandId);
  const islandMeta = islands.find((i) => i.id === islandId);
  const islandData = useMemo(() => getIslandData(islandId), [islandId]);
  const theme = THEMES[islandId] ?? THEMES.volcano;

  // ---- Shared refs for Canvas communication ----
  const keysRef = useRef(new Set<string>());
  const mobileDirRef = useRef<string | null>(null);
  const playerPosRef = useRef({ x: 0, z: 0 });

  // ---- HUD state ----
  const [nearbyNPC, setNearbyNPC] = useState<NPCData | null>(null);
  const [dialogNPC, setDialogNPC] = useState<NPCData | null>(null);
  const [showTravelMenu, setShowTravelMenu] = useState(false);
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

  // Map NPC to their specific scenario/activity by index
  const getNPCContentIndex = useCallback(() => {
    if (!dialogNPC) return 0;
    const idx = npcsWithPositions.findIndex((n) => n.data.id === dialogNPC.id);
    return idx >= 0 ? idx : 0;
  }, [dialogNPC, npcsWithPositions]);

  const handleDialogScenario = useCallback((scenarioIndex?: number) => {
    const idx = scenarioIndex ?? getNPCContentIndex();
    const s = scenarioMarkers[idx] ?? scenarioMarkers[0];
    if (s) handleScenarioStart(s.id);
    setDialogNPC(null);
  }, [scenarioMarkers, handleScenarioStart, getNPCContentIndex]);

  const handleDialogActivity = useCallback((activityIndex?: number) => {
    const idx = activityIndex ?? getNPCContentIndex();
    const a = activityMarkers[idx] ?? activityMarkers[0];
    if (a) handleActivityStart(a.id);
    setDialogNPC(null);
  }, [activityMarkers, handleActivityStart, getNPCContentIndex]);

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

  // ---- Fade-in on load ----
  const [fadeIn, setFadeIn] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // ==========================================================================
  // RENDER
  // ==========================================================================

  return (
    <div className="fixed inset-0" style={{ backgroundColor: theme.skyColor }}>
      {/* Fade-in overlay */}
      <div
        className="fixed inset-0 z-[60] pointer-events-none transition-opacity duration-1000"
        style={{
          backgroundColor: '#0a0a0a',
          opacity: fadeIn ? 1 : 0,
        }}
      />
      {/* ---- 3D Canvas ---- */}
      <Canvas
        shadows
        camera={{ position: [15, 17, 15], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1 }}
        dpr={[1, 2]}
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
          playerPosRef={playerPosRef}
        />
        <EffectComposer>
          <Bloom luminanceThreshold={0.6} luminanceSmoothing={0.9} intensity={0.4} />
          <Vignette eskil={false} offset={0.1} darkness={0.5} />
        </EffectComposer>
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

      {/* Top-left: Travel button */}
      <button
        className="fixed top-4 left-36 z-40 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all hover:scale-105 cursor-pointer"
        style={{
          background: 'linear-gradient(135deg, rgba(30,20,60,0.9), rgba(13,13,26,0.95))',
          border: '1px solid rgba(100,180,255,0.4)',
          color: '#66bbff',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
        }}
        onClick={() => setShowTravelMenu(true)}
      >
        {'\u{1F6A2}'} Reisen
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

      {/* Mini-map (GTA-style bottom-right radar) */}
      <MiniMap
        playerPosRef={playerPosRef}
        npcs={npcsWithPositions}
        scenarioMarkers={scenarioMarkers}
        activityMarkers={activityMarkers}
        theme={theme}
      />

      {/* Quest Tracker (left side) */}
      <div
        className="fixed top-20 left-4 z-30 flex flex-col gap-1.5 max-h-[60vh] overflow-y-auto"
        style={{
          width: '220px',
          pointerEvents: 'none',
        }}
      >
        <div
          className="text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg"
          style={{
            color: 'rgba(201,168,76,0.8)',
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)',
            pointerEvents: 'auto',
          }}
        >
          {'\u{1F4DC}'} Geschichten
        </div>
        {scenarioMarkers.map((s) => {
          const done = completedScenarios.includes(s.id);
          return (
            <div
              key={s.id}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs"
              style={{
                background: 'rgba(0,0,0,0.4)',
                backdropFilter: 'blur(4px)',
                color: done ? 'rgba(100,200,100,0.7)' : 'rgba(255,215,0,0.7)',
                pointerEvents: 'auto',
              }}
            >
              <span>{done ? '\u2705' : '\u{1F4A0}'}</span>
              <span className="truncate">{s.title}</span>
            </div>
          );
        })}
        <div
          className="text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg mt-1"
          style={{
            color: 'rgba(64,192,128,0.8)',
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)',
            pointerEvents: 'auto',
          }}
        >
          {'\u{1F3AF}'} Aktivit{'\u00E4'}ten
        </div>
        {activityMarkers.map((a) => {
          const done = completedActivities.includes(a.id);
          return (
            <div
              key={a.id}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs"
              style={{
                background: 'rgba(0,0,0,0.4)',
                backdropFilter: 'blur(4px)',
                color: done ? 'rgba(100,200,100,0.7)' : 'rgba(64,192,128,0.7)',
                pointerEvents: 'auto',
              }}
            >
              <span>{done ? '\u2705' : '\u{1F4A0}'}</span>
              <span className="truncate">{a.title}</span>
            </div>
          );
        })}
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
          WASD = Bewegen &bull; Laufe zu NPCs & leuchtenden Markern &bull; E / Klick = Interagieren
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

      {/* ---- Travel Menu Modal ---- */}
      {showTravelMenu && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
          onClick={() => setShowTravelMenu(false)}
          role="presentation"
        >
          <div
            className="relative max-w-md w-full rounded-xl p-6"
            style={{
              background: 'linear-gradient(135deg, rgba(30,20,60,0.95), rgba(13,13,26,0.98))',
              border: '1px solid rgba(100,180,255,0.3)',
              boxShadow: '0 0 40px rgba(100,180,255,0.15), inset 0 1px 0 rgba(255,255,255,0.05)',
            }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Reiseziel wählen"
          >
            <h3
              className="text-xl font-bold mb-1"
              style={{ color: '#ffd700', textShadow: '0 0 8px rgba(255,215,0,0.3)' }}
            >
              {'\u{1F30D}'} Reiseziel w{'\u00E4'}hlen
            </h3>
            <p className="text-xs mb-4" style={{ color: 'rgba(200,200,220,0.6)' }}>
              {'\u26F5'} Boot (benachbarte Inseln) oder {'\u2708\uFE0F'} Flugzeug (entfernte Inseln)
            </p>

            <div className="flex flex-col gap-2 max-h-72 overflow-y-auto">
              {unlockedIslands
                .filter((id) => id !== islandId)
                .map((destId) => {
                  const info = TRAVEL_ISLAND_INFO[destId];
                  const adjacent = isAdjacentIsland(islandId, destId);
                  if (!info) return null;
                  return (
                    <button
                      key={destId}
                      className="w-full py-3 px-4 rounded-lg text-sm font-bold transition-all hover:scale-[1.02] cursor-pointer flex items-center gap-3"
                      style={{
                        background: adjacent
                          ? 'linear-gradient(135deg, rgba(100,180,255,0.15), rgba(100,180,255,0.05))'
                          : 'linear-gradient(135deg, rgba(255,180,100,0.15), rgba(255,180,100,0.05))',
                        border: adjacent
                          ? '1px solid rgba(100,180,255,0.3)'
                          : '1px solid rgba(255,180,100,0.3)',
                        color: adjacent ? '#88ccff' : '#ffcc88',
                      }}
                      onClick={() => {
                        setShowTravelMenu(false);
                        startTravel(
                          islandId,
                          destId as IslandId,
                          adjacent ? 'boat' : 'airplane',
                        );
                      }}
                    >
                      <span className="text-xl">{info.emoji}</span>
                      <span className="flex-1 text-left">{info.name}</span>
                      <span className="text-lg">
                        {adjacent ? '\u26F5' : '\u2708\uFE0F'}
                      </span>
                    </button>
                  );
                })}
            </div>

            <button
              className="w-full mt-3 py-2 px-4 rounded-lg text-sm transition-all hover:scale-[1.02] cursor-pointer"
              style={{
                backgroundColor: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(200,200,200,0.7)',
              }}
              onClick={() => setShowTravelMenu(false)}
            >
              Abbrechen
            </button>
          </div>
        </div>
      )}

      {/* ---- NPC Dialog Modal ---- */}
      {dialogNPC && (() => {
        const npcIdx = npcsWithPositions.findIndex((n) => n.data.id === dialogNPC.id);
        const npcScenario = scenarioMarkers[npcIdx];
        const npcActivity = activityMarkers[npcIdx];
        const isScenarioCompleted = npcScenario && completedScenarios.includes(npcScenario.id);
        const isActivityCompleted = npcActivity && completedActivities.includes(npcActivity.id);
        return (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0,0,0,0.75)' }}
            onClick={() => setDialogNPC(null)}
            role="presentation"
          >
            <div
              className="relative max-w-md w-full rounded-2xl p-6 max-h-[85vh] overflow-y-auto"
              style={{
                background: 'linear-gradient(135deg, rgba(30,20,60,0.97), rgba(13,13,26,0.99))',
                border: '1px solid rgba(201,168,76,0.35)',
                boxShadow: '0 0 50px rgba(201,168,76,0.12), inset 0 1px 0 rgba(255,255,255,0.05)',
              }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-label={`Dialog mit ${dialogNPC.name}`}
            >
              {/* NPC header with accent color */}
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-3xl shrink-0"
                  style={{
                    backgroundColor: 'rgba(201,168,76,0.1)',
                    border: '2px solid rgba(201,168,76,0.4)',
                    boxShadow: '0 0 15px rgba(201,168,76,0.15)',
                  }}
                >
                  {dialogNPC.emoji}
                </div>
                <div className="min-w-0">
                  <h3
                    className="text-xl font-bold truncate"
                    style={{ color: '#ffd700', textShadow: '0 0 8px rgba(255,215,0,0.3)' }}
                  >
                    {dialogNPC.name}
                  </h3>
                  <p className="text-sm" style={{ color: 'rgba(201,168,76,0.7)' }}>
                    {dialogNPC.description}
                  </p>
                </div>
              </div>

              {/* NPC speech bubble - progress-aware */}
              <div
                className="mb-5 p-4 rounded-xl text-sm leading-relaxed relative"
                style={{
                  backgroundColor: 'rgba(201,168,76,0.06)',
                  border: '1px solid rgba(201,168,76,0.2)',
                  color: 'rgba(230,215,180,0.95)',
                }}
              >
                <div
                  className="absolute -top-2 left-8 w-4 h-4 rotate-45"
                  style={{
                    backgroundColor: 'rgba(201,168,76,0.06)',
                    borderTop: '1px solid rgba(201,168,76,0.2)',
                    borderLeft: '1px solid rgba(201,168,76,0.2)',
                  }}
                />
                {isScenarioCompleted && isActivityCompleted ? (
                  <span>
                    <em>&ldquo;Du hast alles geschafft, was ich dir zeigen konnte. Ich bin stolz auf dich. Vergiss nicht, was du hier gelernt hast!&rdquo;</em>
                    <br /><br />
                    <span style={{ color: 'rgba(100,200,100,0.8)', fontSize: '12px' }}>
                      {'\u2728'} Du hast alle Inhalte von {dialogNPC.name} abgeschlossen!
                    </span>
                  </span>
                ) : isScenarioCompleted ? (
                  <span>
                    <em>&ldquo;Hey, du bist zur{'\u00FC'}ck! Unsere Geschichte war ziemlich intensiv, oder? Ich hab noch eine {'\u00DC'}bung f{'\u00FC'}r dich, wenn du bereit bist.&rdquo;</em>
                    <br /><br />
                    <span style={{ color: 'rgba(201,168,76,0.6)', fontSize: '12px' }}>
                      {'\u{1F4AA}'} Geschichte abgeschlossen &middot; {'\u{1F3AF}'} Aktivit{'\u00E4'}t verf{'\u00FC'}gbar
                    </span>
                  </span>
                ) : (
                  <span>{dialogNPC.backstory}</span>
                )}
              </div>

              {/* Available actions - NPC-specific */}
              <div className="flex flex-col gap-2.5">
                <p className="text-xs font-bold uppercase tracking-wider" style={{ color: 'rgba(201,168,76,0.5)' }}>
                  {dialogNPC.name} bietet an:
                </p>

                {/* This NPC's specific scenario */}
                {npcScenario && (
                  <button
                    className="w-full py-3 px-4 rounded-xl font-bold text-sm transition-all hover:scale-[1.02] cursor-pointer text-left flex items-center gap-3"
                    style={{
                      background: isScenarioCompleted
                        ? 'linear-gradient(135deg, rgba(100,200,100,0.1), rgba(100,200,100,0.05))'
                        : 'linear-gradient(135deg, rgba(255,215,0,0.15), rgba(201,168,76,0.08))',
                      border: isScenarioCompleted
                        ? '1px solid rgba(100,200,100,0.3)'
                        : '1px solid rgba(255,215,0,0.35)',
                      color: isScenarioCompleted ? '#88cc88' : '#ffd700',
                    }}
                    onClick={() => handleDialogScenario(npcIdx)}
                  >
                    <span className="text-xl">{isScenarioCompleted ? '\u2705' : '\u{1F4DC}'}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold">{npcScenario.title}</div>
                      <div className="text-xs opacity-60 mt-0.5">
                        {isScenarioCompleted ? 'Abgeschlossen - nochmal spielen?' : 'Geschichte erleben & Punkte sammeln'}
                      </div>
                    </div>
                    <span className="text-lg opacity-60">{'\u2192'}</span>
                  </button>
                )}

                {/* This NPC's specific activity */}
                {npcActivity && (
                  <button
                    className="w-full py-3 px-4 rounded-xl font-bold text-sm transition-all hover:scale-[1.02] cursor-pointer text-left flex items-center gap-3"
                    style={{
                      background: isActivityCompleted
                        ? 'linear-gradient(135deg, rgba(100,200,100,0.1), rgba(100,200,100,0.05))'
                        : 'linear-gradient(135deg, rgba(64,192,128,0.12), rgba(64,192,128,0.05))',
                      border: isActivityCompleted
                        ? '1px solid rgba(100,200,100,0.3)'
                        : '1px solid rgba(64,192,128,0.35)',
                      color: isActivityCompleted ? '#88cc88' : '#40c080',
                    }}
                    onClick={() => handleDialogActivity(npcIdx)}
                  >
                    <span className="text-xl">{isActivityCompleted ? '\u2705' : '\u{1F3AF}'}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold">{npcActivity.title}</div>
                      <div className="text-xs opacity-60 mt-0.5">
                        {isActivityCompleted ? 'Abgeschlossen - nochmal machen?' : 'Interaktive \u00DCbung'}
                      </div>
                    </div>
                    <span className="text-lg opacity-60">{'\u2192'}</span>
                  </button>
                )}

                {/* Mini-game option */}
                <button
                  className="w-full py-3 px-4 rounded-xl font-bold text-sm transition-all hover:scale-[1.02] cursor-pointer text-left flex items-center gap-3"
                  style={{
                    background: 'linear-gradient(135deg, rgba(176,96,255,0.12), rgba(176,96,255,0.05))',
                    border: '1px solid rgba(176,96,255,0.3)',
                    color: '#b060ff',
                  }}
                  onClick={handleDialogMiniGame}
                >
                  <span className="text-xl">{'\u{1F3AE}'}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold">Minispiel</div>
                    <div className="text-xs opacity-60 mt-0.5">Spiele ein Emotions-Minispiel</div>
                  </div>
                  <span className="text-lg opacity-60">{'\u2192'}</span>
                </button>

                {/* Show other available scenarios too */}
                {scenarioMarkers.length > 1 && (
                  <>
                    <div className="my-1 border-t" style={{ borderColor: 'rgba(201,168,76,0.1)' }} />
                    <p className="text-xs opacity-40" style={{ color: 'rgba(201,168,76,0.5)' }}>
                      Weitere Geschichten auf dieser Insel:
                    </p>
                    {scenarioMarkers.map((s, i) => {
                      if (i === npcIdx) return null;
                      const done = completedScenarios.includes(s.id);
                      return (
                        <button
                          key={s.id}
                          className="w-full py-2 px-4 rounded-lg text-xs transition-all hover:scale-[1.01] cursor-pointer text-left flex items-center gap-2"
                          style={{
                            backgroundColor: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            color: done ? 'rgba(150,200,150,0.7)' : 'rgba(200,190,170,0.6)',
                          }}
                          onClick={() => handleDialogScenario(i)}
                        >
                          <span>{done ? '\u2705' : '\u{1F4DC}'}</span>
                          <span>{s.title}</span>
                        </button>
                      );
                    })}
                  </>
                )}

                <div className="my-1 border-t" style={{ borderColor: 'rgba(201,168,76,0.1)' }} />
                <button
                  className="w-full py-2 px-4 rounded-lg text-sm transition-all hover:scale-[1.02] cursor-pointer"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'rgba(200,200,200,0.6)',
                  }}
                  onClick={() => setDialogNPC(null)}
                >
                  Tsch{'\u00FC'}ss, {dialogNPC.name}!
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
