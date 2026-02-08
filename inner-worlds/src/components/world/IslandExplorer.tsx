// =============================================================================
// IslandExplorer.tsx
// 2D top-down island exploration component for Inner Worlds
// A children's educational game (ages 10-15, German language)
// =============================================================================

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../stores/gameStore';
import { getIslandData } from '../../data';
import type { IslandId } from '../../types';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const MAP_WIDTH = 1200;
const MAP_HEIGHT = 900;
const AVATAR_SIZE = 40;
const NPC_SIZE = 48;
const MARKER_SIZE = 32;
const INTERACTION_RADIUS = 60;
const MOVE_SPEED = 3;
const MOBILE_MOVE_SPEED = 2.5;

// ---------------------------------------------------------------------------
// Type definitions (all using `as const` - no enums)
// ---------------------------------------------------------------------------

const ANIMATION_TYPES = {
  Float: 'float',
  Pulse: 'pulse',
  Glow: 'glow',
  Sway: 'sway',
  Shimmer: 'shimmer',
} as const;

type AnimationType = (typeof ANIMATION_TYPES)[keyof typeof ANIMATION_TYPES];

const PARTICLE_TYPES = {
  Ember: 'ember',
  Bubble: 'bubble',
  Firefly: 'firefly',
  Snowflake: 'snowflake',
  Petal: 'petal',
  Star: 'star',
  Prism: 'prism',
  Sparkle: 'sparkle',
} as const;

type ParticleType = (typeof PARTICLE_TYPES)[keyof typeof PARTICLE_TYPES];

const DIRECTIONS = {
  Up: 'up',
  Down: 'down',
  Left: 'left',
  Right: 'right',
} as const;

type Direction = (typeof DIRECTIONS)[keyof typeof DIRECTIONS];

interface Position {
  x: number;
  y: number;
}

interface TerrainObject {
  x: number;
  y: number;
  emoji: string;
  size: number;
  animation: AnimationType;
  opacity?: number;
}

interface IslandMapConfig {
  bgGradient: string;
  groundColor: string;
  ambientColor: string;
  terrainObjects: TerrainObject[];
  npcPositions: Position[];
  scenarioPositions: Position[];
  activityPositions: Position[];
  miniGamePosition: Position;
  particles: ParticleType;
}

interface NPCData {
  id: string;
  name: string;
  emoji: string;
  description: string;
  backstory: string;
}

interface IslandExplorerProps {
  onStartMiniGame: (gameType: string) => void;
  onBack: () => void;
}

// ---------------------------------------------------------------------------
// Island theme configurations (all 8 islands)
// ---------------------------------------------------------------------------

const ISLAND_CONFIGS: Record<string, IslandMapConfig> = {
  volcano: {
    bgGradient: 'radial-gradient(ellipse at 50% 80%, #3a1a0a 0%, #1a0800 40%, #0d0d1a 100%)',
    groundColor: '#2a1a0a',
    ambientColor: 'rgba(255, 80, 20, 0.08)',
    terrainObjects: [
      { x: 80, y: 120, emoji: '\u{1FAA8}', size: 44, animation: 'float' },
      { x: 300, y: 80, emoji: '\u{1F525}', size: 30, animation: 'pulse' },
      { x: 550, y: 60, emoji: '\u{1FAA8}', size: 50, animation: 'float' },
      { x: 900, y: 100, emoji: '\u{1F525}', size: 26, animation: 'pulse' },
      { x: 150, y: 450, emoji: '\u{1FAA8}', size: 36, animation: 'float' },
      { x: 700, y: 350, emoji: '\u{1F525}', size: 28, animation: 'pulse' },
      { x: 1050, y: 200, emoji: '\u{1FAA8}', size: 42, animation: 'float' },
      { x: 400, y: 700, emoji: '\u{1F525}', size: 32, animation: 'pulse' },
      { x: 1000, y: 650, emoji: '\u{1FAA8}', size: 38, animation: 'float' },
      { x: 200, y: 750, emoji: '\u{1F525}', size: 24, animation: 'pulse' },
      { x: 850, y: 500, emoji: '\u{1FAA8}', size: 46, animation: 'float' },
      { x: 500, y: 400, emoji: '\u{1F525}', size: 34, animation: 'pulse' },
      { x: 650, y: 780, emoji: '\u{1FAA8}', size: 40, animation: 'float' },
      { x: 100, y: 300, emoji: '\u{1F525}', size: 22, animation: 'pulse' },
      { x: 1100, y: 450, emoji: '\u{1FAA8}', size: 48, animation: 'float' },
    ],
    npcPositions: [
      { x: 200, y: 300 },
      { x: 650, y: 180 },
      { x: 400, y: 550 },
      { x: 900, y: 400 },
    ],
    scenarioPositions: [
      { x: 350, y: 350 },
      { x: 750, y: 300 },
      { x: 550, y: 700 },
    ],
    activityPositions: [
      { x: 500, y: 150 },
      { x: 250, y: 650 },
      { x: 950, y: 250 },
    ],
    miniGamePosition: { x: 1000, y: 600 },
    particles: 'ember',
  },

  ocean: {
    bgGradient: 'radial-gradient(ellipse at 50% 30%, #1a3a5c 0%, #0d2140 40%, #0d0d1a 100%)',
    groundColor: '#1a3050',
    ambientColor: 'rgba(60, 140, 220, 0.08)',
    terrainObjects: [
      { x: 100, y: 150, emoji: '\u{1F41A}', size: 28, animation: 'float' },
      { x: 350, y: 90, emoji: '\u{1FAB8}', size: 36, animation: 'sway' },
      { x: 600, y: 70, emoji: '\u{1F30A}', size: 40, animation: 'pulse' },
      { x: 900, y: 130, emoji: '\u{1F41A}', size: 32, animation: 'float' },
      { x: 200, y: 400, emoji: '\u{1FAB8}', size: 34, animation: 'sway' },
      { x: 750, y: 380, emoji: '\u{1F30A}', size: 38, animation: 'pulse' },
      { x: 1050, y: 250, emoji: '\u{1F41A}', size: 26, animation: 'float' },
      { x: 450, y: 650, emoji: '\u{1FAB8}', size: 30, animation: 'sway' },
      { x: 850, y: 700, emoji: '\u{1F30A}', size: 36, animation: 'pulse' },
      { x: 150, y: 600, emoji: '\u{1F41A}', size: 34, animation: 'float' },
      { x: 500, y: 300, emoji: '\u{1FAB8}', size: 28, animation: 'sway' },
      { x: 1100, y: 500, emoji: '\u{1F30A}', size: 42, animation: 'pulse' },
      { x: 300, y: 780, emoji: '\u{1F41A}', size: 30, animation: 'float' },
      { x: 700, y: 550, emoji: '\u{1FAB8}', size: 32, animation: 'sway' },
    ],
    npcPositions: [
      { x: 250, y: 250 },
      { x: 700, y: 200 },
      { x: 450, y: 500 },
      { x: 950, y: 350 },
    ],
    scenarioPositions: [
      { x: 400, y: 300 },
      { x: 800, y: 450 },
      { x: 200, y: 700 },
    ],
    activityPositions: [
      { x: 550, y: 180 },
      { x: 300, y: 550 },
      { x: 1000, y: 200 },
    ],
    miniGamePosition: { x: 900, y: 650 },
    particles: 'bubble',
  },

  forest: {
    bgGradient: 'radial-gradient(ellipse at 50% 60%, #0a2a0a 0%, #061806 40%, #0d0d1a 100%)',
    groundColor: '#0f1f0a',
    ambientColor: 'rgba(80, 200, 80, 0.06)',
    terrainObjects: [
      { x: 50, y: 100, emoji: '\u{1F332}', size: 50, animation: 'sway' },
      { x: 280, y: 60, emoji: '\u{1F344}', size: 28, animation: 'glow' },
      { x: 500, y: 80, emoji: '\u{1F332}', size: 54, animation: 'sway' },
      { x: 800, y: 50, emoji: '\u{1F332}', size: 48, animation: 'sway' },
      { x: 1050, y: 100, emoji: '\u{1F344}', size: 24, animation: 'glow' },
      { x: 150, y: 350, emoji: '\u{1F332}', size: 52, animation: 'sway' },
      { x: 650, y: 300, emoji: '\u{1F344}', size: 30, animation: 'glow' },
      { x: 950, y: 380, emoji: '\u{1F332}', size: 46, animation: 'sway' },
      { x: 350, y: 600, emoji: '\u{1F332}', size: 56, animation: 'sway' },
      { x: 700, y: 650, emoji: '\u{1F344}', size: 26, animation: 'glow' },
      { x: 100, y: 700, emoji: '\u{1F332}', size: 44, animation: 'sway' },
      { x: 1100, y: 550, emoji: '\u{1F332}', size: 50, animation: 'sway' },
      { x: 450, y: 400, emoji: '\u{1F344}', size: 32, animation: 'glow' },
      { x: 850, y: 750, emoji: '\u{1F332}', size: 48, animation: 'sway' },
      { x: 200, y: 200, emoji: '\u{1F344}', size: 22, animation: 'glow' },
      { x: 600, y: 500, emoji: '\u{1F332}', size: 52, animation: 'sway' },
    ],
    npcPositions: [
      { x: 300, y: 200 },
      { x: 700, y: 150 },
      { x: 500, y: 450 },
      { x: 850, y: 550 },
    ],
    scenarioPositions: [
      { x: 400, y: 350 },
      { x: 750, y: 500 },
      { x: 200, y: 550 },
    ],
    activityPositions: [
      { x: 550, y: 200 },
      { x: 300, y: 700 },
      { x: 1000, y: 300 },
      { x: 650, y: 750 },
    ],
    miniGamePosition: { x: 1050, y: 700 },
    particles: 'firefly',
  },

  mountain: {
    bgGradient: 'radial-gradient(ellipse at 50% 20%, #2a2a3a 0%, #1a1a2a 40%, #0d0d1a 100%)',
    groundColor: '#1e1e2e',
    ambientColor: 'rgba(160, 180, 220, 0.06)',
    terrainObjects: [
      { x: 100, y: 80, emoji: '\u{26F0}\u{FE0F}', size: 50, animation: 'float' },
      { x: 400, y: 60, emoji: '\u{1F3D4}\u{FE0F}', size: 56, animation: 'shimmer' },
      { x: 750, y: 90, emoji: '\u{26F0}\u{FE0F}', size: 44, animation: 'float' },
      { x: 1050, y: 70, emoji: '\u{1F3D4}\u{FE0F}', size: 52, animation: 'shimmer' },
      { x: 200, y: 350, emoji: '\u{1FAA8}', size: 36, animation: 'float' },
      { x: 600, y: 400, emoji: '\u{1F48E}', size: 28, animation: 'glow' },
      { x: 900, y: 300, emoji: '\u{1FAA8}', size: 40, animation: 'float' },
      { x: 350, y: 600, emoji: '\u{1F48E}', size: 32, animation: 'glow' },
      { x: 700, y: 700, emoji: '\u{1FAA8}', size: 34, animation: 'float' },
      { x: 150, y: 500, emoji: '\u{1F48E}', size: 26, animation: 'glow' },
      { x: 1000, y: 550, emoji: '\u{1FAA8}', size: 38, animation: 'float' },
      { x: 500, y: 250, emoji: '\u{1F48E}', size: 30, animation: 'glow' },
      { x: 850, y: 800, emoji: '\u{1FAA8}', size: 42, animation: 'float' },
    ],
    npcPositions: [
      { x: 250, y: 250 },
      { x: 650, y: 200 },
      { x: 400, y: 500 },
      { x: 850, y: 450 },
    ],
    scenarioPositions: [
      { x: 350, y: 300 },
      { x: 700, y: 350 },
      { x: 500, y: 650 },
    ],
    activityPositions: [
      { x: 500, y: 180 },
      { x: 200, y: 600 },
      { x: 900, y: 200 },
    ],
    miniGamePosition: { x: 1050, y: 650 },
    particles: 'snowflake',
  },

  garden: {
    bgGradient: 'radial-gradient(ellipse at 50% 70%, #1a2a1a 0%, #0d1a0d 40%, #0d0d1a 100%)',
    groundColor: '#152515',
    ambientColor: 'rgba(200, 140, 200, 0.06)',
    terrainObjects: [
      { x: 120, y: 130, emoji: '\u{1F338}', size: 30, animation: 'sway' },
      { x: 350, y: 80, emoji: '\u{1F98B}', size: 24, animation: 'float' },
      { x: 550, y: 100, emoji: '\u{1F33A}', size: 28, animation: 'sway' },
      { x: 800, y: 70, emoji: '\u{1F338}', size: 32, animation: 'sway' },
      { x: 1000, y: 130, emoji: '\u{1F98B}', size: 22, animation: 'float' },
      { x: 200, y: 400, emoji: '\u{1F33C}', size: 26, animation: 'sway' },
      { x: 650, y: 350, emoji: '\u{1F338}', size: 34, animation: 'sway' },
      { x: 900, y: 420, emoji: '\u{1F98B}', size: 20, animation: 'float' },
      { x: 400, y: 650, emoji: '\u{1F33A}', size: 30, animation: 'sway' },
      { x: 750, y: 700, emoji: '\u{1F338}', size: 28, animation: 'sway' },
      { x: 100, y: 600, emoji: '\u{1F98B}', size: 26, animation: 'float' },
      { x: 1100, y: 350, emoji: '\u{1F33C}', size: 32, animation: 'sway' },
      { x: 500, y: 500, emoji: '\u{1F338}', size: 36, animation: 'sway' },
      { x: 300, y: 300, emoji: '\u{1F98B}', size: 18, animation: 'float' },
      { x: 850, y: 600, emoji: '\u{1F33A}', size: 24, animation: 'sway' },
    ],
    npcPositions: [
      { x: 250, y: 300 },
      { x: 700, y: 200 },
      { x: 500, y: 500 },
      { x: 900, y: 400 },
    ],
    scenarioPositions: [
      { x: 400, y: 300 },
      { x: 800, y: 500 },
      { x: 250, y: 650 },
    ],
    activityPositions: [
      { x: 600, y: 150 },
      { x: 350, y: 500 },
      { x: 950, y: 300 },
      { x: 150, y: 450 },
    ],
    miniGamePosition: { x: 1050, y: 700 },
    particles: 'petal',
  },

  night: {
    bgGradient: 'radial-gradient(ellipse at 50% 30%, #1a0a3e 0%, #10082a 40%, #0d0d1a 100%)',
    groundColor: '#120a28',
    ambientColor: 'rgba(120, 80, 200, 0.08)',
    terrainObjects: [
      { x: 100, y: 120, emoji: '\u{1F3EE}', size: 32, animation: 'glow' },
      { x: 350, y: 70, emoji: '\u{2728}', size: 20, animation: 'pulse' },
      { x: 600, y: 100, emoji: '\u{1F3EE}', size: 28, animation: 'glow' },
      { x: 850, y: 60, emoji: '\u{2728}', size: 22, animation: 'pulse' },
      { x: 1050, y: 120, emoji: '\u{1F3EE}', size: 34, animation: 'glow' },
      { x: 200, y: 380, emoji: '\u{2728}', size: 18, animation: 'pulse' },
      { x: 500, y: 350, emoji: '\u{1F3EE}', size: 30, animation: 'glow' },
      { x: 750, y: 400, emoji: '\u{2728}', size: 24, animation: 'pulse' },
      { x: 950, y: 350, emoji: '\u{1F3EE}', size: 26, animation: 'glow' },
      { x: 300, y: 650, emoji: '\u{2728}', size: 20, animation: 'pulse' },
      { x: 650, y: 700, emoji: '\u{1F3EE}', size: 32, animation: 'glow' },
      { x: 1000, y: 600, emoji: '\u{2728}', size: 22, animation: 'pulse' },
      { x: 150, y: 500, emoji: '\u{1F3EE}', size: 28, animation: 'glow' },
      { x: 450, y: 800, emoji: '\u{2728}', size: 16, animation: 'pulse' },
      { x: 800, y: 550, emoji: '\u{1F3EE}', size: 30, animation: 'glow' },
    ],
    npcPositions: [
      { x: 250, y: 280 },
      { x: 650, y: 200 },
      { x: 450, y: 550 },
      { x: 900, y: 400 },
    ],
    scenarioPositions: [
      { x: 350, y: 350 },
      { x: 750, y: 450 },
      { x: 550, y: 700 },
    ],
    activityPositions: [
      { x: 500, y: 180 },
      { x: 200, y: 600 },
      { x: 850, y: 250 },
      { x: 400, y: 450 },
    ],
    miniGamePosition: { x: 1000, y: 700 },
    particles: 'star',
  },

  rainbow: {
    bgGradient: 'radial-gradient(ellipse at 50% 50%, #2a1a3a 0%, #1a1030 40%, #0d0d1a 100%)',
    groundColor: '#1a1230',
    ambientColor: 'rgba(180, 100, 255, 0.06)',
    terrainObjects: [
      { x: 100, y: 100, emoji: '\u{1F48E}', size: 30, animation: 'shimmer' },
      { x: 350, y: 80, emoji: '\u{1F308}', size: 44, animation: 'pulse' },
      { x: 600, y: 60, emoji: '\u{1F48E}', size: 26, animation: 'shimmer' },
      { x: 900, y: 100, emoji: '\u{1F308}', size: 40, animation: 'pulse' },
      { x: 1050, y: 70, emoji: '\u{1F48E}', size: 34, animation: 'shimmer' },
      { x: 200, y: 380, emoji: '\u{1F308}', size: 38, animation: 'pulse' },
      { x: 500, y: 320, emoji: '\u{1F48E}', size: 28, animation: 'shimmer' },
      { x: 750, y: 400, emoji: '\u{1F308}', size: 42, animation: 'pulse' },
      { x: 400, y: 650, emoji: '\u{1F48E}', size: 32, animation: 'shimmer' },
      { x: 850, y: 700, emoji: '\u{1F308}', size: 36, animation: 'pulse' },
      { x: 150, y: 550, emoji: '\u{1F48E}', size: 24, animation: 'shimmer' },
      { x: 1000, y: 500, emoji: '\u{1F308}', size: 46, animation: 'pulse' },
      { x: 650, y: 550, emoji: '\u{1F48E}', size: 30, animation: 'shimmer' },
      { x: 300, y: 750, emoji: '\u{1F308}', size: 40, animation: 'pulse' },
    ],
    npcPositions: [
      { x: 280, y: 250 },
      { x: 700, y: 180 },
      { x: 450, y: 500 },
      { x: 900, y: 380 },
    ],
    scenarioPositions: [
      { x: 380, y: 350 },
      { x: 780, y: 300 },
      { x: 550, y: 650 },
    ],
    activityPositions: [
      { x: 550, y: 180 },
      { x: 250, y: 600 },
      { x: 950, y: 250 },
    ],
    miniGamePosition: { x: 1050, y: 650 },
    particles: 'prism',
  },

  home: {
    bgGradient: 'radial-gradient(ellipse at 50% 60%, #2a1e10 0%, #1a1208 40%, #0d0d1a 100%)',
    groundColor: '#1e1608',
    ambientColor: 'rgba(255, 180, 80, 0.08)',
    terrainObjects: [
      { x: 80, y: 100, emoji: '\u{1F3E0}', size: 44, animation: 'glow' },
      { x: 350, y: 80, emoji: '\u{1FAB5}', size: 28, animation: 'float' },
      { x: 600, y: 60, emoji: '\u{1F3E0}', size: 40, animation: 'glow' },
      { x: 900, y: 100, emoji: '\u{1FAB5}', size: 32, animation: 'float' },
      { x: 1050, y: 80, emoji: '\u{1F3E0}', size: 46, animation: 'glow' },
      { x: 200, y: 370, emoji: '\u{1F3EE}', size: 24, animation: 'pulse' },
      { x: 500, y: 300, emoji: '\u{1FAB5}', size: 30, animation: 'float' },
      { x: 750, y: 400, emoji: '\u{1F3EE}', size: 26, animation: 'pulse' },
      { x: 950, y: 350, emoji: '\u{1FAB5}', size: 34, animation: 'float' },
      { x: 400, y: 650, emoji: '\u{1F3E0}', size: 42, animation: 'glow' },
      { x: 700, y: 700, emoji: '\u{1F3EE}', size: 22, animation: 'pulse' },
      { x: 150, y: 550, emoji: '\u{1FAB5}', size: 28, animation: 'float' },
      { x: 1100, y: 500, emoji: '\u{1F3EE}', size: 26, animation: 'pulse' },
      { x: 300, y: 800, emoji: '\u{1FAB5}', size: 30, animation: 'float' },
      { x: 850, y: 600, emoji: '\u{1F3E0}', size: 38, animation: 'glow' },
    ],
    npcPositions: [
      { x: 250, y: 280 },
      { x: 700, y: 200 },
      { x: 450, y: 500 },
      { x: 900, y: 400 },
    ],
    scenarioPositions: [
      { x: 400, y: 350 },
      { x: 750, y: 450 },
    ],
    activityPositions: [
      { x: 550, y: 180 },
      { x: 300, y: 600 },
      { x: 1000, y: 300 },
      { x: 200, y: 450 },
      { x: 850, y: 650 },
    ],
    miniGamePosition: { x: 1050, y: 750 },
    particles: 'sparkle',
  },
};

// ---------------------------------------------------------------------------
// CSS keyframe injection (runs once)
// ---------------------------------------------------------------------------

const KEYFRAMES_ID = 'island-explorer-keyframes';

const injectKeyframes = () => {
  if (document.getElementById(KEYFRAMES_ID)) return;
  const style = document.createElement('style');
  style.id = KEYFRAMES_ID;
  style.textContent = `
    @keyframes ie-float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-6px); }
    }
    @keyframes ie-pulse {
      0%, 100% { opacity: 0.7; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.15); }
    }
    @keyframes ie-glow {
      0%, 100% { filter: brightness(1) drop-shadow(0 0 4px rgba(255,215,0,0.3)); }
      50% { filter: brightness(1.3) drop-shadow(0 0 12px rgba(255,215,0,0.7)); }
    }
    @keyframes ie-sway {
      0%, 100% { transform: rotate(0deg); }
      25% { transform: rotate(3deg); }
      75% { transform: rotate(-3deg); }
    }
    @keyframes ie-shimmer {
      0%, 100% { filter: hue-rotate(0deg) brightness(1); }
      50% { filter: hue-rotate(30deg) brightness(1.3); }
    }
    @keyframes ie-bob {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-3px); }
    }
    @keyframes ie-particle-rise {
      0% { transform: translateY(0) translateX(0) scale(1); opacity: 0.8; }
      50% { opacity: 1; }
      100% { transform: translateY(-120px) translateX(20px) scale(0.3); opacity: 0; }
    }
    @keyframes ie-particle-float {
      0% { transform: translateY(0) translateX(0); opacity: 0; }
      20% { opacity: 0.8; }
      80% { opacity: 0.6; }
      100% { transform: translateY(-80px) translateX(30px); opacity: 0; }
    }
    @keyframes ie-particle-drift {
      0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
      20% { opacity: 0.7; }
      80% { opacity: 0.4; }
      100% { transform: translateY(60px) translateX(-40px) rotate(180deg); opacity: 0; }
    }
    @keyframes ie-particle-wander {
      0% { transform: translate(0, 0) scale(0.8); opacity: 0; }
      25% { transform: translate(10px, -15px) scale(1); opacity: 0.9; }
      50% { transform: translate(-5px, -30px) scale(1.1); opacity: 0.7; }
      75% { transform: translate(15px, -45px) scale(0.9); opacity: 0.5; }
      100% { transform: translate(0, -60px) scale(0.6); opacity: 0; }
    }
    @keyframes ie-marker-glow {
      0%, 100% { box-shadow: 0 0 8px 2px currentColor; transform: scale(1); }
      50% { box-shadow: 0 0 20px 6px currentColor; transform: scale(1.1); }
    }
    @keyframes ie-dpad-press {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(0.9); }
    }
    @keyframes ie-prompt-bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-4px); }
    }
  `;
  document.head.appendChild(style);
};

// ---------------------------------------------------------------------------
// Utility: distance between two points
// ---------------------------------------------------------------------------

const dist = (a: Position, b: Position): number =>
  Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);

// ---------------------------------------------------------------------------
// Utility: clamp value
// ---------------------------------------------------------------------------

const clamp = (val: number, min: number, max: number): number =>
  Math.max(min, Math.min(max, val));

// ---------------------------------------------------------------------------
// Utility: animation name from type
// ---------------------------------------------------------------------------

const animationName = (type: AnimationType): string => {
  const map: Record<AnimationType, string> = {
    float: 'ie-float',
    pulse: 'ie-pulse',
    glow: 'ie-glow',
    sway: 'ie-sway',
    shimmer: 'ie-shimmer',
  };
  return map[type];
};

// ---------------------------------------------------------------------------
// Utility: particle color for island type
// ---------------------------------------------------------------------------

const getParticleColor = (type: ParticleType): string => {
  const colors: Record<ParticleType, string> = {
    ember: '#ff6b20',
    bubble: '#60b0ff',
    firefly: '#a0ff60',
    snowflake: '#d0e8ff',
    petal: '#ffb0d0',
    star: '#c8b0ff',
    prism: '#ff80ff',
    sparkle: '#ffd080',
  };
  return colors[type];
};

// ---------------------------------------------------------------------------
// Sub-component: Particle system
// ---------------------------------------------------------------------------

const ParticleSystem: React.FC<{ type: ParticleType; count?: number }> = ({
  type,
  count = 15,
}) => {
  const particles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const color = getParticleColor(type);
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const duration = 4 + Math.random() * 6;
      const delay = Math.random() * 5;
      const size = 2 + Math.random() * 4;

      let animation = 'ie-particle-rise';
      if (type === 'bubble' || type === 'firefly') animation = 'ie-particle-float';
      if (type === 'snowflake' || type === 'petal') animation = 'ie-particle-drift';
      if (type === 'star' || type === 'prism' || type === 'sparkle')
        animation = 'ie-particle-wander';

      return { key: i, x, y, duration, delay, size, color, animation };
    });
  }, [type, count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.key}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
            animation: `${p.animation} ${p.duration}s ${p.delay}s infinite`,
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Sub-component: Terrain object
// ---------------------------------------------------------------------------

const TerrainItem: React.FC<{ obj: TerrainObject }> = ({ obj }) => (
  <div
    className="absolute select-none pointer-events-none"
    style={{
      left: obj.x,
      top: obj.y,
      fontSize: obj.size,
      lineHeight: 1,
      animation: `${animationName(obj.animation)} ${3 + Math.random() * 3}s ease-in-out infinite`,
      animationDelay: `${Math.random() * 2}s`,
      opacity: obj.opacity ?? 0.8,
    }}
    aria-hidden="true"
  >
    {obj.emoji}
  </div>
);

// ---------------------------------------------------------------------------
// Sub-component: Interactive marker (scenario/activity/mini-game)
// ---------------------------------------------------------------------------

const MARKER_COLORS = {
  scenario: '#ffd700',
  activity: '#40c080',
  miniGame: '#b060ff',
} as const;

type MarkerType = keyof typeof MARKER_COLORS;

const MarkerSpot: React.FC<{
  position: Position;
  type: MarkerType;
  label: string;
  isNear: boolean;
  onClick: () => void;
}> = ({ position, type, label, isNear, onClick }) => {
  const color = MARKER_COLORS[type];
  const emoji = type === 'scenario' ? '\u{1F4DC}' : type === 'activity' ? '\u{1F3AF}' : '\u{1F3AE}';

  return (
    <div
      className="absolute flex flex-col items-center cursor-pointer"
      style={{
        left: position.x - MARKER_SIZE / 2,
        top: position.y - MARKER_SIZE / 2,
      }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={label}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onClick();
      }}
    >
      <div
        className="rounded-full flex items-center justify-center"
        style={{
          width: MARKER_SIZE,
          height: MARKER_SIZE,
          color,
          animation: 'ie-marker-glow 2s ease-in-out infinite',
          backgroundColor: `${color}22`,
          border: `2px solid ${color}88`,
          fontSize: MARKER_SIZE * 0.55,
        }}
      >
        {emoji}
      </div>
      {isNear && (
        <div
          className="mt-1 text-xs font-bold whitespace-nowrap px-2 py-0.5 rounded"
          style={{
            color,
            backgroundColor: 'rgba(13,13,26,0.9)',
            border: `1px solid ${color}44`,
            animation: 'ie-prompt-bounce 1.5s ease-in-out infinite',
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Sub-component: NPC on the map
// ---------------------------------------------------------------------------

const NPCSprite: React.FC<{
  npc: NPCData;
  position: Position;
  isNear: boolean;
  onClick: () => void;
}> = ({ npc, position, isNear, onClick }) => (
  <div
    className="absolute flex flex-col items-center cursor-pointer"
    style={{
      left: position.x - NPC_SIZE / 2,
      top: position.y - NPC_SIZE / 2,
    }}
    onClick={onClick}
    role="button"
    tabIndex={0}
    aria-label={`Spreche mit ${npc.name}`}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') onClick();
    }}
  >
    {/* Glow ring behind NPC */}
    <div
      className="absolute rounded-full"
      style={{
        width: NPC_SIZE + 12,
        height: NPC_SIZE + 12,
        top: -6,
        left: -6,
        background: 'radial-gradient(circle, rgba(201,168,76,0.25) 0%, transparent 70%)',
        animation: 'ie-pulse 3s ease-in-out infinite',
      }}
      aria-hidden="true"
    />
    {/* NPC emoji */}
    <div
      className="relative rounded-full flex items-center justify-center"
      style={{
        width: NPC_SIZE,
        height: NPC_SIZE,
        backgroundColor: 'rgba(201,168,76,0.15)',
        border: '2px solid rgba(201,168,76,0.4)',
        fontSize: NPC_SIZE * 0.55,
        animation: 'ie-float 4s ease-in-out infinite',
      }}
    >
      {npc.emoji}
    </div>
    {/* NPC name */}
    <span
      className="mt-1 text-xs font-bold whitespace-nowrap"
      style={{ color: '#c9a84c', textShadow: '0 0 6px rgba(201,168,76,0.5)' }}
    >
      {npc.name}
    </span>
    {/* Interaction prompt */}
    {isNear && (
      <div
        className="mt-0.5 text-xs px-2 py-0.5 rounded whitespace-nowrap"
        style={{
          color: '#ffd700',
          backgroundColor: 'rgba(13,13,26,0.92)',
          border: '1px solid rgba(255,215,0,0.3)',
          animation: 'ie-prompt-bounce 1.5s ease-in-out infinite',
        }}
      >
        {'ontouchstart' in window ? 'Tippe zum Sprechen' : 'Dr\u00FCcke E zum Sprechen'}
      </div>
    )}
  </div>
);

// ---------------------------------------------------------------------------
// Sub-component: Player avatar
// ---------------------------------------------------------------------------

const PlayerAvatar: React.FC<{
  position: Position;
  facing: Direction;
  isMoving: boolean;
}> = ({ position, facing, isMoving }) => {
  const rotation =
    facing === 'up' ? -90 : facing === 'down' ? 90 : facing === 'left' ? 180 : 0;

  return (
    <div
      className="absolute z-30"
      style={{
        left: position.x - AVATAR_SIZE / 2,
        top: position.y - AVATAR_SIZE / 2,
        width: AVATAR_SIZE,
        height: AVATAR_SIZE,
        animation: isMoving ? 'ie-bob 0.4s ease-in-out infinite' : 'none',
      }}
    >
      {/* Avatar glow */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(201,168,76,0.3) 0%, transparent 70%)',
          transform: 'scale(1.8)',
        }}
        aria-hidden="true"
      />
      {/* Avatar body */}
      <div
        className="relative w-full h-full rounded-full flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #2a1a4e, #1a0a3e)',
          border: '2px solid rgba(201,168,76,0.6)',
          boxShadow: '0 0 12px rgba(201,168,76,0.3)',
          fontSize: AVATAR_SIZE * 0.6,
        }}
      >
        {'\u{1F9D9}'}
      </div>
      {/* Direction indicator */}
      <div
        className="absolute w-2 h-2 rounded-full"
        style={{
          backgroundColor: '#ffd700',
          boxShadow: '0 0 6px #ffd700',
          top: '50%',
          left: '50%',
          transform: `rotate(${rotation}deg) translateX(${AVATAR_SIZE / 2 + 4}px) translateY(-50%)`,
        }}
        aria-hidden="true"
      />
    </div>
  );
};

// ---------------------------------------------------------------------------
// Sub-component: Mobile D-pad
// ---------------------------------------------------------------------------

const MobileDPad: React.FC<{
  onDirectionStart: (dir: Direction) => void;
  onDirectionEnd: () => void;
}> = ({ onDirectionStart, onDirectionEnd }) => {
  const btnClass =
    'w-12 h-12 rounded-lg flex items-center justify-center text-xl select-none active:scale-90 transition-transform';
  const btnStyle: React.CSSProperties = {
    backgroundColor: 'rgba(201,168,76,0.15)',
    border: '1px solid rgba(201,168,76,0.3)',
    color: '#c9a84c',
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <button
        className={btnClass}
        style={btnStyle}
        onTouchStart={() => onDirectionStart('up')}
        onTouchEnd={onDirectionEnd}
        onMouseDown={() => onDirectionStart('up')}
        onMouseUp={onDirectionEnd}
        aria-label="Nach oben bewegen"
      >
        {'\u2191'}
      </button>
      <div className="flex gap-1">
        <button
          className={btnClass}
          style={btnStyle}
          onTouchStart={() => onDirectionStart('left')}
          onTouchEnd={onDirectionEnd}
          onMouseDown={() => onDirectionStart('left')}
          onMouseUp={onDirectionEnd}
          aria-label="Nach links bewegen"
        >
          {'\u2190'}
        </button>
        <button
          className={btnClass}
          style={btnStyle}
          onTouchStart={() => onDirectionStart('down')}
          onTouchEnd={onDirectionEnd}
          onMouseDown={() => onDirectionStart('down')}
          onMouseUp={onDirectionEnd}
          aria-label="Nach unten bewegen"
        >
          {'\u2193'}
        </button>
        <button
          className={btnClass}
          style={btnStyle}
          onTouchStart={() => onDirectionStart('right')}
          onTouchEnd={onDirectionEnd}
          onMouseDown={() => onDirectionStart('right')}
          onMouseUp={onDirectionEnd}
          aria-label="Nach rechts bewegen"
        >
          {'\u2192'}
        </button>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Sub-component: NPC Dialog modal
// ---------------------------------------------------------------------------

const NPCDialog: React.FC<{
  npc: NPCData;
  hasScenario: boolean;
  hasActivity: boolean;
  hasMiniGame: boolean;
  onStartScenario: () => void;
  onStartActivity: () => void;
  onStartMiniGame: () => void;
  onClose: () => void;
}> = ({
  npc,
  hasScenario,
  hasActivity,
  hasMiniGame,
  onStartScenario,
  onStartActivity,
  onStartMiniGame,
  onClose,
}) => (
  <motion.div
    className="fixed inset-0 z-50 flex items-center justify-center p-4"
    style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3, ease: 'easeOut' as const }}
    onClick={onClose}
  >
    <motion.div
      className="relative max-w-md w-full rounded-xl p-6"
      style={{
        background: 'linear-gradient(135deg, rgba(30,20,60,0.95), rgba(13,13,26,0.98))',
        border: '1px solid rgba(201,168,76,0.3)',
        boxShadow: '0 0 40px rgba(201,168,76,0.15), inset 0 1px 0 rgba(255,255,255,0.05)',
      }}
      initial={{ scale: 0.8, y: 30 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0.8, y: 30 }}
      transition={{ type: 'spring' as const, damping: 20, stiffness: 300 }}
      onClick={(e) => e.stopPropagation()}
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
          {npc.emoji}
        </div>
        <div>
          <h3
            className="text-xl font-bold"
            style={{ color: '#ffd700', textShadow: '0 0 8px rgba(255,215,0,0.3)' }}
          >
            {npc.name}
          </h3>
          <p className="text-sm" style={{ color: 'rgba(201,168,76,0.7)' }}>
            {npc.description}
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
        {npc.backstory}
      </div>

      {/* Action buttons */}
      <div className="flex flex-col gap-2">
        {hasScenario && (
          <button
            className="w-full py-2.5 px-4 rounded-lg font-bold text-sm transition-all hover:scale-[1.02]"
            style={{
              background: 'linear-gradient(135deg, rgba(255,215,0,0.2), rgba(201,168,76,0.1))',
              border: '1px solid rgba(255,215,0,0.4)',
              color: '#ffd700',
            }}
            onClick={onStartScenario}
          >
            {'\u{1F4DC}'} Geschichte starten
          </button>
        )}
        {hasActivity && (
          <button
            className="w-full py-2.5 px-4 rounded-lg font-bold text-sm transition-all hover:scale-[1.02]"
            style={{
              background: 'linear-gradient(135deg, rgba(64,192,128,0.2), rgba(64,192,128,0.1))',
              border: '1px solid rgba(64,192,128,0.4)',
              color: '#40c080',
            }}
            onClick={onStartActivity}
          >
            {'\u{1F3AF}'} \u00DCbung starten
          </button>
        )}
        {hasMiniGame && (
          <button
            className="w-full py-2.5 px-4 rounded-lg font-bold text-sm transition-all hover:scale-[1.02]"
            style={{
              background: 'linear-gradient(135deg, rgba(176,96,255,0.2), rgba(176,96,255,0.1))',
              border: '1px solid rgba(176,96,255,0.4)',
              color: '#b060ff',
            }}
            onClick={onStartMiniGame}
          >
            {'\u{1F3AE}'} Minispiel
          </button>
        )}

        {/* Divider */}
        <div className="my-1 border-t" style={{ borderColor: 'rgba(201,168,76,0.15)' }} />

        <button
          className="w-full py-2 px-4 rounded-lg text-sm transition-all hover:scale-[1.02]"
          style={{
            backgroundColor: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'rgba(200,200,200,0.7)',
          }}
          onClick={onClose}
        >
          Schlie\u00DFen
        </button>
      </div>
    </motion.div>
  </motion.div>
);

// ---------------------------------------------------------------------------
// Sub-component: HUD proximity dialog strip
// ---------------------------------------------------------------------------

const ProximityHint: React.FC<{ npc: NPCData }> = ({ npc }) => (
  <motion.div
    className="fixed bottom-24 left-1/2 z-40 max-w-sm w-full px-4"
    style={{ transform: 'translateX(-50%)' }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    transition={{ duration: 0.25, ease: 'easeOut' as const }}
  >
    <div
      className="rounded-xl p-3 flex items-center gap-3"
      style={{
        background: 'linear-gradient(135deg, rgba(30,20,60,0.92), rgba(13,13,26,0.95))',
        border: '1px solid rgba(201,168,76,0.25)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
      }}
    >
      <span className="text-2xl">{npc.emoji}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold truncate" style={{ color: '#c9a84c' }}>
          {npc.name}
        </p>
        <p className="text-xs truncate" style={{ color: 'rgba(200,180,140,0.7)' }}>
          {npc.description}
        </p>
      </div>
    </div>
  </motion.div>
);

// ==========================================================================
// Main component: IslandExplorer
// ==========================================================================

const IslandExplorer: React.FC<IslandExplorerProps> = ({ onStartMiniGame, onBack }) => {
  // ---- Store & data ----
  const activeIsland = useGameStore((s) => s.activeIsland);
  const islands = useGameStore((s) => s.islands);
  const setScreen = useGameStore((s) => s.setScreen);
  const completedScenarios = useGameStore((s) => s.completedScenarios);
  const completedActivities = useGameStore((s) => s.completedActivities);

  const islandId = activeIsland ?? ('volcano' as IslandId);
  const islandMeta = islands.find((i) => i.id === islandId);
  const islandData = useMemo(() => getIslandData(islandId), [islandId]);
  const config = ISLAND_CONFIGS[islandId] ?? ISLAND_CONFIGS['volcano'];

  // ---- Player state ----
  const [playerPos, setPlayerPos] = useState<Position>({ x: MAP_WIDTH / 2, y: MAP_HEIGHT / 2 });
  const [facing, setFacing] = useState<Direction>('right');
  const [isMoving, setIsMoving] = useState(false);
  const [dialogNPC, setDialogNPC] = useState<NPCData | null>(null);
  const [clickTarget, setClickTarget] = useState<Position | null>(null);

  // ---- Refs for game loop ----
  const keysRef = useRef(new Set<string>());
  const playerPosRef = useRef(playerPos);
  const clickTargetRef = useRef(clickTarget);
  const animFrameRef = useRef<number>(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const mobileDirRef = useRef<Direction | null>(null);

  // Keep refs in sync
  playerPosRef.current = playerPos;
  clickTargetRef.current = clickTarget;

  // ---- Touch detection ----
  const isTouchDevice = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }, []);

  // ---- NPC positions mapped to data ----
  const npcsWithPositions = useMemo(() => {
    const npcs = (islandData.npcs as NPCData[]) ?? [];
    return npcs.map((npc, i) => ({
      npc,
      position: config.npcPositions[i] ?? { x: 300 + i * 200, y: 300 + i * 100 },
    }));
  }, [islandData.npcs, config.npcPositions]);

  // ---- Scenario & activity data mapped to positions ----
  const scenarios = useMemo(() => {
    const data = islandData.scenarios ?? [];
    return data.map((s: { id: string; title: string }, i: number) => ({
      id: s.id,
      title: s.title,
      position: config.scenarioPositions[i] ?? { x: 400 + i * 150, y: 350 },
    }));
  }, [islandData.scenarios, config.scenarioPositions]);

  const activities = useMemo(() => {
    const data = islandData.activities ?? [];
    return data.map((a: { id: string; title: string }, i: number) => ({
      id: a.id,
      title: a.title,
      position: config.activityPositions[i] ?? { x: 500 + i * 150, y: 200 },
    }));
  }, [islandData.activities, config.activityPositions]);

  // ---- Nearest NPC calculation ----
  const nearestNPC = useMemo(() => {
    let nearest: { npc: NPCData; distance: number } | null = null;
    for (const { npc, position } of npcsWithPositions) {
      const d = dist(playerPos, position);
      if (d < INTERACTION_RADIUS && (!nearest || d < nearest.distance)) {
        nearest = { npc, distance: d };
      }
    }
    return nearest;
  }, [playerPos, npcsWithPositions]);

  // ---- Completion percentage ----
  const completionPercent = islandMeta?.completionPercent ?? 0;

  // ---- Inject CSS keyframes ----
  useEffect(() => {
    injectKeyframes();
  }, []);

  // ---- Keyboard input ----
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      keysRef.current.add(key);

      // 'E' to interact with nearest NPC
      if (key === 'e' && nearestNPC && !dialogNPC) {
        setDialogNPC(nearestNPC.npc);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current.delete(e.key.toLowerCase());
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [nearestNPC, dialogNPC]);

  // ---- Game loop (requestAnimationFrame) ----
  useEffect(() => {
    const loop = () => {
      const keys = keysRef.current;
      const mobileDir = mobileDirRef.current;
      const target = clickTargetRef.current;
      let dx = 0;
      let dy = 0;
      let moving = false;

      // Keyboard movement
      if (keys.has('arrowup') || keys.has('w')) { dy -= MOVE_SPEED; moving = true; }
      if (keys.has('arrowdown') || keys.has('s')) { dy += MOVE_SPEED; moving = true; }
      if (keys.has('arrowleft') || keys.has('a')) { dx -= MOVE_SPEED; moving = true; }
      if (keys.has('arrowright') || keys.has('d')) { dx += MOVE_SPEED; moving = true; }

      // Mobile d-pad movement
      if (mobileDir) {
        moving = true;
        if (mobileDir === 'up') dy -= MOBILE_MOVE_SPEED;
        if (mobileDir === 'down') dy += MOBILE_MOVE_SPEED;
        if (mobileDir === 'left') dx -= MOBILE_MOVE_SPEED;
        if (mobileDir === 'right') dx += MOBILE_MOVE_SPEED;
      }

      // Click-to-move
      if (target && !moving) {
        const current = playerPosRef.current;
        const tdx = target.x - current.x;
        const tdy = target.y - current.y;
        const tdist = Math.sqrt(tdx * tdx + tdy * tdy);
        if (tdist > 4) {
          const speed = MOVE_SPEED;
          dx = (tdx / tdist) * speed;
          dy = (tdy / tdist) * speed;
          moving = true;
        } else {
          setClickTarget(null);
        }
      }

      if (moving) {
        // Determine facing direction
        if (Math.abs(dx) > Math.abs(dy)) {
          setFacing(dx > 0 ? 'right' : 'left');
        } else if (dy !== 0) {
          setFacing(dy > 0 ? 'down' : 'up');
        }

        setPlayerPos((prev) => ({
          x: clamp(prev.x + dx, AVATAR_SIZE / 2, MAP_WIDTH - AVATAR_SIZE / 2),
          y: clamp(prev.y + dy, AVATAR_SIZE / 2, MAP_HEIGHT - AVATAR_SIZE / 2),
        }));
      }

      setIsMoving(moving);
      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  // ---- Click-to-move handler ----
  const handleMapClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (dialogNPC) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const scaleX = MAP_WIDTH / rect.width;
      const scaleY = MAP_HEIGHT / rect.height;
      const x = (e.clientX - rect.left) * scaleX;
      const y = (e.clientY - rect.top) * scaleY;
      setClickTarget({ x, y });
    },
    [dialogNPC],
  );

  // ---- Mobile d-pad handlers ----
  const handleDirStart = useCallback((dir: Direction) => {
    mobileDirRef.current = dir;
    setClickTarget(null);
  }, []);

  const handleDirEnd = useCallback(() => {
    mobileDirRef.current = null;
  }, []);

  // ---- NPC interaction ----
  const handleNPCClick = useCallback((npc: NPCData) => {
    setDialogNPC(npc);
    setClickTarget(null);
  }, []);

  // ---- Marker interactions ----
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

  const handleMiniGameStart = useCallback(
    (gameType: string) => {
      onStartMiniGame(gameType);
    },
    [onStartMiniGame],
  );

  // ---- Viewport scroll to follow player ----
  const viewportStyle = useMemo((): React.CSSProperties => {
    if (!viewportRef.current) return {};
    const vw = typeof window !== 'undefined' ? window.innerWidth : 800;
    const vh = typeof window !== 'undefined' ? window.innerHeight : 600;
    const tx = clamp(-(playerPos.x - vw / 2), -(MAP_WIDTH - vw), 0);
    const ty = clamp(-(playerPos.y - vh / 2), -(MAP_HEIGHT - vh), 0);
    return {
      transform: `translate(${tx}px, ${ty}px)`,
      transition: 'transform 0.15s ease-out',
    };
  }, [playerPos]);

  // ---- Dialog action handlers ----
  const handleDialogScenario = useCallback(() => {
    if (!dialogNPC) return;
    const scenario = scenarios[0];
    if (scenario) {
      handleScenarioStart(scenario.id);
    }
    setDialogNPC(null);
  }, [dialogNPC, scenarios, handleScenarioStart]);

  const handleDialogActivity = useCallback(() => {
    if (!dialogNPC) return;
    const activity = activities[0];
    if (activity) {
      handleActivityStart(activity.id);
    }
    setDialogNPC(null);
  }, [dialogNPC, activities, handleActivityStart]);

  const handleDialogMiniGame = useCallback(() => {
    handleMiniGameStart(islandId);
    setDialogNPC(null);
  }, [handleMiniGameStart, islandId]);

  // ==========================================================================
  // RENDER
  // ==========================================================================

  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{ backgroundColor: '#0d0d1a' }}
    >
      {/* ---- MAP VIEWPORT ---- */}
      <div ref={viewportRef} className="absolute inset-0 overflow-hidden">
        <div
          className="relative"
          style={{
            width: MAP_WIDTH,
            height: MAP_HEIGHT,
            background: config.bgGradient,
            ...viewportStyle,
          }}
          onClick={handleMapClick}
        >
          {/* Ambient overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ backgroundColor: config.ambientColor }}
            aria-hidden="true"
          />

          {/* Ground texture */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 30% 70%, ${config.groundColor}80 0%, transparent 50%),
                           radial-gradient(circle at 70% 30%, ${config.groundColor}60 0%, transparent 50%)`,
            }}
            aria-hidden="true"
          />

          {/* Particle system */}
          <ParticleSystem type={config.particles} count={18} />

          {/* Terrain decorations */}
          {config.terrainObjects.map((obj, i) => (
            <TerrainItem key={`terrain-${i}`} obj={obj} />
          ))}

          {/* Scenario markers */}
          {scenarios.map((s: { id: string; title: string; position: Position }, i: number) => {
            const isCompleted = completedScenarios.includes(s.id);
            const isNear = dist(playerPos, s.position) < INTERACTION_RADIUS;
            return (
              <MarkerSpot
                key={`scenario-${i}`}
                position={s.position}
                type="scenario"
                label={isCompleted ? `\u2713 ${s.title}` : s.title}
                isNear={isNear}
                onClick={() => {
                  if (isNear) handleScenarioStart(s.id);
                }}
              />
            );
          })}

          {/* Activity markers */}
          {activities.map((a: { id: string; title: string; position: Position }, i: number) => {
            const isCompleted = completedActivities.includes(a.id);
            const isNear = dist(playerPos, a.position) < INTERACTION_RADIUS;
            return (
              <MarkerSpot
                key={`activity-${i}`}
                position={a.position}
                type="activity"
                label={isCompleted ? `\u2713 ${a.title}` : a.title}
                isNear={isNear}
                onClick={() => {
                  if (isNear) handleActivityStart(a.id);
                }}
              />
            );
          })}

          {/* Mini-game marker */}
          {(() => {
            const isNear = dist(playerPos, config.miniGamePosition) < INTERACTION_RADIUS;
            return (
              <MarkerSpot
                position={config.miniGamePosition}
                type="miniGame"
                label="Minispiel"
                isNear={isNear}
                onClick={() => {
                  if (isNear) handleMiniGameStart(islandId);
                }}
              />
            );
          })()}

          {/* NPCs */}
          {npcsWithPositions.map(({ npc, position }) => (
            <NPCSprite
              key={npc.id}
              npc={npc}
              position={position}
              isNear={dist(playerPos, position) < INTERACTION_RADIUS}
              onClick={() => {
                if (dist(playerPosRef.current, position) < INTERACTION_RADIUS) {
                  handleNPCClick(npc);
                } else {
                  setClickTarget(position);
                }
              }}
            />
          ))}

          {/* Player avatar */}
          <PlayerAvatar position={playerPos} facing={facing} isMoving={isMoving} />
        </div>
      </div>

      {/* ---- HUD ---- */}

      {/* Top-left: Back button */}
      <motion.button
        className="fixed top-4 left-4 z-40 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all hover:scale-105"
        style={{
          background: 'linear-gradient(135deg, rgba(30,20,60,0.85), rgba(13,13,26,0.9))',
          border: '1px solid rgba(201,168,76,0.3)',
          color: '#c9a84c',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
        }}
        onClick={onBack}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' as const }}
      >
        {'\u2190'} Zur Karte
      </motion.button>

      {/* Top-center: Island name */}
      <motion.div
        className="fixed top-4 left-1/2 z-40 flex items-center gap-2 px-5 py-2 rounded-xl"
        style={{
          transform: 'translateX(-50%)',
          background: 'linear-gradient(135deg, rgba(30,20,60,0.85), rgba(13,13,26,0.9))',
          border: '1px solid rgba(201,168,76,0.3)',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' as const }}
      >
        <span className="text-xl">{islandMeta?.emoji ?? '\u{1F30B}'}</span>
        <span
          className="text-base font-bold"
          style={{ color: '#ffd700', textShadow: '0 0 8px rgba(255,215,0,0.3)' }}
        >
          {islandMeta?.name ?? 'Insel'}
        </span>
      </motion.div>

      {/* Top-right: Completion progress */}
      <motion.div
        className="fixed top-4 right-4 z-40 flex items-center gap-3 px-4 py-2 rounded-xl"
        style={{
          background: 'linear-gradient(135deg, rgba(30,20,60,0.85), rgba(13,13,26,0.9))',
          border: '1px solid rgba(201,168,76,0.3)',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
        }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.2, ease: 'easeOut' as const }}
      >
        <span className="text-xs font-bold" style={{ color: '#c9a84c' }}>
          Fortschritt
        </span>
        <div
          className="w-24 h-2 rounded-full overflow-hidden"
          style={{ backgroundColor: 'rgba(201,168,76,0.15)' }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, #c9a84c, #ffd700)',
              boxShadow: '0 0 8px rgba(255,215,0,0.5)',
            }}
            initial={{ width: 0 }}
            animate={{ width: `${completionPercent}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' as const }}
          />
        </div>
        <span className="text-xs font-bold" style={{ color: '#ffd700' }}>
          {completionPercent}%
        </span>
      </motion.div>

      {/* Bottom: Proximity hint when near NPC */}
      <AnimatePresence>
        {nearestNPC && !dialogNPC && (
          <ProximityHint npc={nearestNPC.npc} />
        )}
      </AnimatePresence>

      {/* Bottom: Mobile D-pad (touch devices only) */}
      {isTouchDevice && (
        <motion.div
          className="fixed bottom-6 left-6 z-40"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3, ease: 'easeOut' as const }}
        >
          <MobileDPad onDirectionStart={handleDirStart} onDirectionEnd={handleDirEnd} />
        </motion.div>
      )}

      {/* Mobile interact button */}
      {isTouchDevice && nearestNPC && !dialogNPC && (
        <motion.button
          className="fixed bottom-8 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold"
          style={{
            background: 'linear-gradient(135deg, rgba(255,215,0,0.3), rgba(201,168,76,0.15))',
            border: '2px solid rgba(255,215,0,0.5)',
            color: '#ffd700',
            boxShadow: '0 0 16px rgba(255,215,0,0.3)',
          }}
          onClick={() => setDialogNPC(nearestNPC.npc)}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ type: 'spring' as const, damping: 15, stiffness: 300 }}
          aria-label="Interagieren"
        >
          E
        </motion.button>
      )}

      {/* ---- NPC DIALOG MODAL ---- */}
      <AnimatePresence>
        {dialogNPC && (
          <NPCDialog
            npc={dialogNPC}
            hasScenario={scenarios.length > 0}
            hasActivity={activities.length > 0}
            hasMiniGame={true}
            onStartScenario={handleDialogScenario}
            onStartActivity={handleDialogActivity}
            onStartMiniGame={handleDialogMiniGame}
            onClose={() => setDialogNPC(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default IslandExplorer;
