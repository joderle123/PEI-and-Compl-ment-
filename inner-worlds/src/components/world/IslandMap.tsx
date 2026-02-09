import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../stores/gameStore';
import type { Island, IslandId } from '../../types';
import SOSButton from '../common/SOSButton';
import CompanionWidget from '../common/CompanionWidget';
import XPBar from '../common/XPBar';
import SettingsPanel from '../common/SettingsPanel';

// ---------------------------------------------------------------------------
// Island positions on the map (percentage-based)
// ---------------------------------------------------------------------------

const islandPositions: Record<IslandId, { top: string; left: string }> = {
  volcano: { top: '12%', left: '15%' },
  ocean: { top: '8%', left: '48%' },
  forest: { top: '15%', left: '78%' },
  mountain: { top: '38%', left: '8%' },
  garden: { top: '42%', left: '72%' },
  night: { top: '62%', left: '20%' },
  rainbow: { top: '65%', left: '50%' },
  home: { top: '60%', left: '80%' },
};

// ---------------------------------------------------------------------------
// Golden connection paths between islands (subtle dotted golden lines)
// ---------------------------------------------------------------------------

const connectionPaths: [IslandId, IslandId][] = [
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

// ---------------------------------------------------------------------------
// Helper: parse percentage string to number
// ---------------------------------------------------------------------------

function pct(value: string): number {
  return parseFloat(value);
}

// ---------------------------------------------------------------------------
// IslandNode sub-component
// ---------------------------------------------------------------------------

function IslandNode({
  island,
  index,
  onClick,
}: {
  island: Island;
  index: number;
  onClick: () => void;
}) {
  const isUnlocked = island.unlocked;
  const pos = islandPositions[island.id];
  const circumference = 2 * Math.PI * 46; // ~289

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay: 0.3 + index * 0.1,
      }}
      whileHover={isUnlocked ? { scale: 1.18, y: -8 } : { scale: 1.02 }}
      whileTap={isUnlocked ? { scale: 0.92 } : {}}
      onClick={onClick}
      className={`absolute flex flex-col items-center gap-1.5 group -translate-x-1/2 -translate-y-1/2 focus:outline-none ${
        isUnlocked ? 'cursor-pointer' : 'cursor-not-allowed'
      }`}
      style={{ top: pos.top, left: pos.left }}
      aria-label={`${island.name}${isUnlocked ? '' : ' (gesperrt)'}`}
    >
      {/* Outer aura glow for unlocked islands */}
      {isUnlocked && (
        <motion.div
          className="absolute rounded-full animate-aura"
          animate={{
            boxShadow: [
              `0 0 20px 8px ${island.colors[0]}50, 0 0 60px 20px ${island.colors[0]}20`,
              `0 0 30px 12px ${island.colors[0]}70, 0 0 80px 30px ${island.colors[0]}30`,
              `0 0 20px 8px ${island.colors[0]}50, 0 0 60px 20px ${island.colors[0]}20`,
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: '110px',
            height: '110px',
            top: '-15px',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        />
      )}

      <div className="relative">
        {/* Completion ring SVG */}
        <svg
          className="absolute -inset-3 w-[calc(100%+24px)] h-[calc(100%+24px)]"
          viewBox="0 0 100 100"
        >
          {/* Background ring track */}
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke={isUnlocked ? `${island.colors[0]}30` : '#555555'}
            strokeWidth="3"
          />
          {/* Completion arc */}
          {isUnlocked && island.completionPercent > 0 && (
            <motion.circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke={island.colors[0]}
              strokeWidth="4"
              strokeDasharray={`${(island.completionPercent / 100) * circumference} ${circumference}`}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 1.5, delay: 0.5 + index * 0.1 }}
              style={{
                filter: `drop-shadow(0 0 4px ${island.colors[0]})`,
              }}
            />
          )}
        </svg>

        {/* Island circle body */}
        <div
          className={`relative w-20 h-20 rounded-full flex items-center justify-center text-4xl shadow-2xl transition-all duration-300 ${
            isUnlocked ? '' : 'grayscale opacity-40'
          }`}
          style={{
            background: isUnlocked
              ? `radial-gradient(circle at 35% 35%, ${island.colors[1]}, ${island.colors[0]}, ${island.colors[2]})`
              : 'radial-gradient(circle at 35% 35%, #3a3a3a, #222222, #111111)',
            boxShadow: isUnlocked
              ? `0 4px 20px ${island.colors[0]}80, inset 0 -4px 10px ${island.colors[2]}90`
              : '0 4px 15px rgba(0,0,0,0.6), inset 0 -4px 10px rgba(0,0,0,0.5)',
            border: isUnlocked
              ? `2px solid ${island.colors[0]}90`
              : '2px solid #44444480',
          }}
        >
          {isUnlocked ? (
            <motion.span
              animate={{ y: [0, -4, 0] }}
              transition={{
                duration: 2.5 + index * 0.3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="drop-shadow-lg"
              style={{
                filter: `drop-shadow(0 0 6px ${island.colors[0]})`,
              }}
            >
              {island.emoji}
            </motion.span>
          ) : (
            <span className="text-3xl opacity-60">&#x1F512;</span>
          )}
        </div>

        {/* Level badge for unlocked islands with progress */}
        {isUnlocked && island.completionPercent > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 1 + index * 0.1 }}
            className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #FFD700, #FFA500)',
              color: '#1a1a2e',
              border: '2px solid #FFD70090',
              boxShadow: '0 0 8px #FFD70060',
            }}
          >
            {island.level}
          </motion.div>
        )}

        {/* Locked chains visual */}
        {!isUnlocked && (
          <>
            <div
              className="absolute top-1/2 -left-3 w-[calc(100%+24px)] h-0.5 -translate-y-1/2 opacity-30"
              style={{
                background:
                  'repeating-linear-gradient(90deg, #888 0px, #888 4px, transparent 4px, transparent 8px)',
              }}
            />
            <div
              className="absolute left-1/2 -top-3 h-[calc(100%+24px)] w-0.5 -translate-x-1/2 opacity-30"
              style={{
                background:
                  'repeating-linear-gradient(180deg, #888 0px, #888 4px, transparent 4px, transparent 8px)',
              }}
            />
          </>
        )}
      </div>

      {/* Island name label */}
      <span
        className={`text-xs font-bold whitespace-nowrap px-3 py-1 rounded-full font-title transition-all duration-300 ${
          isUnlocked
            ? 'text-golden bg-black/50 backdrop-blur-sm border border-amber-400/30'
            : 'text-gray-500 bg-black/40 backdrop-blur-sm border border-gray-600/20'
        }`}
        style={
          isUnlocked
            ? {
                textShadow: '0 0 8px rgba(255,215,0,0.5)',
              }
            : {}
        }
      >
        {island.name}
      </span>

      {/* Tooltip on hover for locked islands */}
      {!isUnlocked && (
        <span className="absolute -bottom-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs text-amber-300/80 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap border border-amber-400/20">
          Schliesse zuerst eine andere Insel ab!
        </span>
      )}
    </motion.button>
  );
}

// ---------------------------------------------------------------------------
// Main IslandMap component
// ---------------------------------------------------------------------------

export default function IslandMap() {
  const { islands, activeIsland, setActiveIsland, setScreen, startTravel } = useGameStore();
  const [settingsOpen, setSettingsOpen] = useState(false);

  // ---- Memoised random arrays for decorative elements ----

  const stars = useMemo(
    () =>
      Array.from({ length: 50 }, (_, i) => ({
        id: i,
        top: `${Math.random() * 55}%`,
        left: `${Math.random() * 100}%`,
        size: 1 + Math.random() * 2.5,
        delay: Math.random() * 5,
        duration: 2 + Math.random() * 4,
        opacity: 0.3 + Math.random() * 0.7,
      })),
    [],
  );

  const embers = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        left: `${10 + Math.random() * 80}%`,
        size: 2 + Math.random() * 4,
        delay: Math.random() * 8,
        duration: 6 + Math.random() * 8,
        drift: -30 + Math.random() * 60,
      })),
    [],
  );

  const handleIslandClick = (island: Island) => {
    if (!island.unlocked) return;

    // If already on an island, travel with animation
    if (activeIsland && activeIsland !== island.id) {
      const adjacent = connectionPaths.some(
        ([a, b]) =>
          (a === activeIsland && b === island.id) ||
          (b === activeIsland && a === island.id),
      );
      startTravel(activeIsland, island.id, adjacent ? 'boat' : 'airplane');
    } else {
      // First visit or same island - direct navigation
      setActiveIsland(island.id);
      setScreen('island');
    }
  };

  return (
    <div className="h-screen w-screen relative overflow-hidden bg-black">
      {/* ================================================================= */}
      {/* LAYER 0: Deep dark ocean background gradient                      */}
      {/* ================================================================= */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 30%, #0d1b3e 0%, #0a0f2e 25%, #120a28 50%, #0a0610 75%, #000000 100%)',
        }}
      />

      {/* Secondary gradient overlay for depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, #06041a40 30%, #0d072880 60%, #000000cc 100%)',
        }}
      />

      {/* ================================================================= */}
      {/* LAYER 1: Twinkling stars                                          */}
      {/* ================================================================= */}
      {stars.map((star) => (
        <motion.div
          key={`star-${star.id}`}
          className="star absolute rounded-full"
          animate={{
            opacity: [star.opacity * 0.3, star.opacity, star.opacity * 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: 'easeInOut',
          }}
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            background: `radial-gradient(circle, #ffffffee, #aaccff80, transparent)`,
            boxShadow: `0 0 ${star.size * 2}px ${star.size}px rgba(180,200,255,${star.opacity * 0.3})`,
          }}
        />
      ))}

      {/* ================================================================= */}
      {/* LAYER 2: Floating embers                                          */}
      {/* ================================================================= */}
      {embers.map((ember) => (
        <motion.div
          key={`ember-${ember.id}`}
          className="ember absolute rounded-full"
          initial={{ y: '100vh', opacity: 0 }}
          animate={{
            y: [window?.innerHeight || 800, -50],
            x: [0, ember.drift],
            opacity: [0, 0.8, 0.9, 0.6, 0],
          }}
          transition={{
            duration: ember.duration,
            repeat: Infinity,
            delay: ember.delay,
            ease: 'easeOut',
          }}
          style={{
            left: ember.left,
            width: ember.size,
            height: ember.size,
            background: 'radial-gradient(circle, #ffaa44, #ff6600, transparent)',
            boxShadow: `0 0 ${ember.size * 2}px ${ember.size}px rgba(255,150,50,0.4)`,
          }}
        />
      ))}

      {/* ================================================================= */}
      {/* LAYER 3: Fog layers                                               */}
      {/* ================================================================= */}
      <motion.div
        className="fog-layer absolute w-[200%] h-40 opacity-[0.06] pointer-events-none"
        style={{
          top: '20%',
          background:
            'linear-gradient(90deg, transparent 0%, #8888cc30 20%, #6666aa20 50%, #8888cc30 80%, transparent 100%)',
          filter: 'blur(30px)',
        }}
        animate={{ x: ['-50%', '0%'] }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="fog-layer absolute w-[200%] h-48 opacity-[0.05] pointer-events-none"
        style={{
          top: '45%',
          background:
            'linear-gradient(90deg, transparent 0%, #554488 15%, transparent 40%, #443377 65%, transparent 100%)',
          filter: 'blur(40px)',
        }}
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 55, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="fog-layer absolute w-[200%] h-36 opacity-[0.04] pointer-events-none"
        style={{
          top: '70%',
          background:
            'linear-gradient(90deg, transparent, #223355 30%, #112244 60%, transparent)',
          filter: 'blur(35px)',
        }}
        animate={{ x: ['-30%', '20%'] }}
        transition={{ duration: 65, repeat: Infinity, ease: 'linear', repeatType: 'reverse' }}
      />

      {/* ================================================================= */}
      {/* LAYER 4: Mystic drifting clouds                                   */}
      {/* ================================================================= */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={`cloud-${i}`}
          className="absolute pointer-events-none"
          animate={{ x: ['-15%', '115%'] }}
          transition={{
            duration: 50 + i * 15,
            repeat: Infinity,
            ease: 'linear',
            delay: i * 8,
          }}
          style={{
            top: `${12 + i * 12}%`,
            width: `${120 + i * 30}px`,
            height: `${40 + i * 10}px`,
            background: `radial-gradient(ellipse, rgba(${80 + i * 15},${60 + i * 10},${120 + i * 10},0.08), transparent)`,
            filter: 'blur(20px)',
          }}
        />
      ))}

      {/* ================================================================= */}
      {/* LAYER 4.5: Nebula glow patches                                    */}
      {/* ================================================================= */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          top: '15%',
          left: '20%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(108,92,231,0.06) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
        animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute pointer-events-none"
        style={{
          top: '50%',
          right: '15%',
          width: '250px',
          height: '250px',
          background: 'radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.15, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />
      <motion.div
        className="absolute pointer-events-none"
        style={{
          bottom: '25%',
          left: '40%',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(76,150,201,0.05) 0%, transparent 70%)',
          filter: 'blur(35px)',
        }}
        animate={{ opacity: [0.25, 0.6, 0.25] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
      />

      {/* ================================================================= */}
      {/* LAYER 5: Ocean waves at bottom                                    */}
      {/* ================================================================= */}
      <div className="absolute bottom-0 left-0 right-0 h-36 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: [0, -300, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-0 w-[200%] h-20 opacity-20"
          style={{
            background:
              'repeating-linear-gradient(90deg, transparent, transparent 120px, rgba(60,40,120,0.4) 120px, rgba(60,40,120,0.4) 240px)',
            borderRadius: '60% 60% 0 0',
          }}
        />
        <motion.div
          animate={{ x: [0, 200, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-0 w-[200%] h-14 opacity-15"
          style={{
            background:
              'repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(30,20,80,0.5) 80px, rgba(30,20,80,0.5) 160px)',
            borderRadius: '50% 50% 0 0',
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-24"
          style={{
            background:
              'linear-gradient(180deg, transparent 0%, #06031a80 40%, #030210cc 70%, #000000 100%)',
          }}
        />
      </div>

      {/* ================================================================= */}
      {/* LAYER 6: Golden connection paths between islands                  */}
      {/* ================================================================= */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
        <defs>
          <linearGradient id="golden-line" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFD700" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#FFA500" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FFD700" stopOpacity="0.15" />
          </linearGradient>
          <filter id="glow-filter">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {connectionPaths.map(([from, to], i) => {
          const fromPos = islandPositions[from];
          const toPos = islandPositions[to];
          const bothUnlocked =
            islands.find((isl) => isl.id === from)?.unlocked &&
            islands.find((isl) => isl.id === to)?.unlocked;
          return (
            <g key={`path-${i}`}>
              {/* Base dotted line */}
              <line
                x1={`${pct(fromPos.left)}%`}
                y1={`${pct(fromPos.top)}%`}
                x2={`${pct(toPos.left)}%`}
                y2={`${pct(toPos.top)}%`}
                stroke="url(#golden-line)"
                strokeWidth="1.5"
                strokeDasharray="6 10"
                opacity={bothUnlocked ? '0.6' : '0.2'}
              />
              {/* Glowing overlay for unlocked connections */}
              {bothUnlocked && (
                <line
                  x1={`${pct(fromPos.left)}%`}
                  y1={`${pct(fromPos.top)}%`}
                  x2={`${pct(toPos.left)}%`}
                  y2={`${pct(toPos.top)}%`}
                  stroke="#FFD700"
                  strokeWidth="2"
                  strokeDasharray="4 16"
                  opacity="0.4"
                  filter="url(#glow-filter)"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="-20"
                    dur={`${2 + i * 0.3}s`}
                    repeatCount="indefinite"
                  />
                </line>
              )}
            </g>
          );
        })}
      </svg>

      {/* ================================================================= */}
      {/* LAYER 7: Vignette overlay                                         */}
      {/* ================================================================= */}
      <div
        className="vignette absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.5) 75%, rgba(0,0,0,0.85) 100%)',
          zIndex: 2,
        }}
      />

      {/* ================================================================= */}
      {/* UI LAYER: Title                                                   */}
      {/* ================================================================= */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute top-5 left-1/2 -translate-x-1/2 text-center"
        style={{ zIndex: 10 }}
      >
        {/* Ornate decorative line above title */}
        <div className="flex items-center justify-center gap-3 mb-1">
          <div
            className="w-16 h-px"
            style={{
              background: 'linear-gradient(90deg, transparent, #FFD700, transparent)',
            }}
          />
          <div
            className="w-2 h-2 rotate-45"
            style={{
              background: 'linear-gradient(135deg, #FFD700, #FFA500)',
              boxShadow: '0 0 6px #FFD70060',
            }}
          />
          <div
            className="w-16 h-px"
            style={{
              background: 'linear-gradient(90deg, transparent, #FFD700, transparent)',
            }}
          />
        </div>

        <h1
          className="text-2xl md:text-3xl font-title text-golden tracking-wider animate-golden-glow"
          style={{
            textShadow:
              '0 0 10px rgba(255,215,0,0.4), 0 0 30px rgba(255,165,0,0.2), 0 2px 4px rgba(0,0,0,0.8)',
          }}
        >
          Inselarchipel der Emotionen
        </h1>

        {/* Ornate decorative line below title */}
        <div className="flex items-center justify-center gap-3 mt-1">
          <div
            className="w-12 h-px"
            style={{
              background: 'linear-gradient(90deg, transparent, #FFD70080, transparent)',
            }}
          />
          <div
            className="w-1.5 h-1.5 rotate-45"
            style={{ background: '#FFD70060' }}
          />
          <div
            className="w-8 h-px"
            style={{
              background: 'linear-gradient(90deg, transparent, #FFD70060, transparent)',
            }}
          />
          <div
            className="w-1.5 h-1.5 rotate-45"
            style={{ background: '#FFD70060' }}
          />
          <div
            className="w-12 h-px"
            style={{
              background: 'linear-gradient(90deg, transparent, #FFD70080, transparent)',
            }}
          />
        </div>
      </motion.div>

      {/* ================================================================= */}
      {/* UI LAYER: XP Bar                                                  */}
      {/* ================================================================= */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute top-[5.5rem] left-1/2 -translate-x-1/2 w-72 md:w-80"
        style={{ zIndex: 10 }}
      >
        <div className="glass-panel rounded-xl px-3 py-2 border border-amber-400/10">
          <XPBar />
        </div>
      </motion.div>

      {/* ================================================================= */}
      {/* UI LAYER: Settings button                                         */}
      {/* ================================================================= */}
      <motion.button
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
        whileHover={{
          scale: 1.15,
          rotate: 90,
          boxShadow: '0 0 20px 6px rgba(255,215,0,0.3)',
        }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setSettingsOpen(true)}
        className="absolute top-5 right-5 w-11 h-11 glass-panel rounded-full flex items-center justify-center text-amber-300/80 text-xl hover:text-amber-200 transition-colors border border-amber-400/20 hover:border-amber-400/40"
        style={{ zIndex: 10 }}
        aria-label="Einstellungen"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      </motion.button>

      {/* ================================================================= */}
      {/* UI LAYER: Navigation buttons (Journal, Collection)                */}
      {/* ================================================================= */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute top-5 left-5 flex gap-2.5"
        style={{ zIndex: 10 }}
      >
        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow: '0 0 15px 4px rgba(255,215,0,0.2)',
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setScreen('journal')}
          className="glass-panel px-4 py-2.5 rounded-xl text-amber-200/90 text-sm font-title font-semibold tracking-wide border border-amber-400/20 hover:border-amber-400/40 hover:text-amber-100 transition-all duration-300 flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            <line x1="8" y1="7" x2="16" y2="7" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
          Tagebuch
        </motion.button>

        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow: '0 0 15px 4px rgba(255,215,0,0.2)',
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setScreen('collection')}
          className="glass-panel px-4 py-2.5 rounded-xl text-amber-200/90 text-sm font-title font-semibold tracking-wide border border-amber-400/20 hover:border-amber-400/40 hover:text-amber-100 transition-all duration-300 flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="3" width="20" height="18" rx="2" />
            <path d="M2 8h20" />
            <path d="M8 3v5" />
            <circle cx="12" cy="15" r="3" />
          </svg>
          Sammlung
        </motion.button>
      </motion.div>

      {/* ================================================================= */}
      {/* MAP LAYER: Island nodes                                           */}
      {/* ================================================================= */}
      <div className="absolute inset-0" style={{ zIndex: 5 }}>
        {islands.map((island, index) => (
          <IslandNode
            key={island.id}
            island={island}
            index={index}
            onClick={() => handleIslandClick(island)}
          />
        ))}
      </div>

      {/* ================================================================= */}
      {/* DECORATION: Compass Rose                                          */}
      {/* ================================================================= */}
      <motion.div
        className="absolute pointer-events-none select-none"
        style={{
          bottom: '2.5rem',
          left: '2rem',
          zIndex: 4,
          opacity: 0.15,
        }}
        initial={{ opacity: 0, rotate: -30, scale: 0.5 }}
        animate={{ opacity: 0.15, rotate: 0, scale: 1 }}
        transition={{ duration: 1.5, delay: 1.2, ease: 'easeOut' }}
      >
        <svg width="80" height="80" viewBox="0 0 80 80">
          {/* Compass ring */}
          <circle cx="40" cy="40" r="35" fill="none" stroke="#c9a84c" strokeWidth="1" opacity="0.6" />
          <circle cx="40" cy="40" r="30" fill="none" stroke="#c9a84c" strokeWidth="0.5" opacity="0.3" />
          {/* N-S line */}
          <line x1="40" y1="8" x2="40" y2="72" stroke="#c9a84c" strokeWidth="0.5" opacity="0.4" />
          {/* E-W line */}
          <line x1="8" y1="40" x2="72" y2="40" stroke="#c9a84c" strokeWidth="0.5" opacity="0.4" />
          {/* North arrow */}
          <polygon points="40,10 36,28 40,24 44,28" fill="#ffd700" opacity="0.8" />
          {/* South arrow */}
          <polygon points="40,70 36,52 40,56 44,52" fill="#c9a84c" opacity="0.4" />
          {/* East arrow */}
          <polygon points="70,40 52,36 56,40 52,44" fill="#c9a84c" opacity="0.4" />
          {/* West arrow */}
          <polygon points="10,40 28,36 24,40 28,44" fill="#c9a84c" opacity="0.4" />
          {/* Center dot */}
          <circle cx="40" cy="40" r="2" fill="#ffd700" opacity="0.6" />
          {/* Cardinal labels */}
          <text x="40" y="7" textAnchor="middle" fontSize="6" fill="#ffd700" fontWeight="bold" opacity="0.8">N</text>
          <text x="40" y="79" textAnchor="middle" fontSize="5" fill="#c9a84c" opacity="0.5">S</text>
          <text x="77" y="42" textAnchor="middle" fontSize="5" fill="#c9a84c" opacity="0.5">O</text>
          <text x="3" y="42" textAnchor="middle" fontSize="5" fill="#c9a84c" opacity="0.5">W</text>
        </svg>
      </motion.div>

      {/* ================================================================= */}
      {/* UI LAYER: Companion widget                                        */}
      {/* ================================================================= */}
      <div style={{ zIndex: 15 }}>
        <CompanionWidget />
      </div>

      {/* ================================================================= */}
      {/* UI LAYER: SOS Button                                              */}
      {/* ================================================================= */}
      <div style={{ zIndex: 15 }}>
        <SOSButton />
      </div>

      {/* ================================================================= */}
      {/* UI LAYER: Settings panel                                          */}
      {/* ================================================================= */}
      <AnimatePresence>
        {settingsOpen && (
          <SettingsPanel
            isOpen={settingsOpen}
            onClose={() => setSettingsOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
