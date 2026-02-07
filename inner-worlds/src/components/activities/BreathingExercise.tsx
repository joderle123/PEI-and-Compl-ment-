import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useBreathingExercise } from '../../hooks/useBreathingExercise';
import { useGameStore } from '../../stores/gameStore';
import type { IslandId } from '../../types';

const themeConfig: Record<string, { bg: string; circle: string[]; label: string }> = {
  volcano: {
    bg: 'linear-gradient(180deg, #2d1810 0%, #8b3a1e 50%, #cc5522 100%)',
    circle: ['#ff6b35', '#ff4444', '#cc2200'],
    label: 'Vulkan-Atemübung (4-7-8)',
  },
  forest: {
    bg: 'linear-gradient(180deg, #1a3a1a 0%, #2d5a2d 50%, #3d8a3d 100%)',
    circle: ['#55efc4', '#00b894', '#009432'],
    label: 'Waldatmung (Box-Breathing)',
  },
  ocean: {
    bg: 'linear-gradient(180deg, #0a2a4a 0%, #0652DD 50%, #74b9ff 100%)',
    circle: ['#74b9ff', '#0984e3', '#0652DD'],
    label: 'Tiefsee-Atmung',
  },
  night: {
    bg: 'linear-gradient(180deg, #0a0a2e 0%, #1a1a5e 50%, #4a3f8a 100%)',
    circle: ['#a29bfe', '#6C5CE7', '#4834d4'],
    label: 'Sternen-Meditation',
  },
};

interface BreathingExerciseProps {
  type?: string;
  onComplete: () => void;
}

export default function BreathingExercise({ type = 'volcano', onComplete }: BreathingExerciseProps) {
  const { addXP, completeActivity } = useGameStore();
  const config = themeConfig[type] || themeConfig.volcano;
  const {
    phase,
    phaseLabel,
    progress,
    round,
    totalRounds,
    isActive,
    isComplete,
    start,
    reset,
  } = useBreathingExercise(type, 4);

  useEffect(() => {
    if (isComplete) {
      addXP(30);
      const activityId = sessionStorage.getItem('activeActivityId');
      const islandId = sessionStorage.getItem('activeIslandId') as IslandId;
      if (activityId && islandId) {
        completeActivity(activityId, islandId);
      }
    }
  }, [isComplete, addXP, completeActivity]);

  const circleSize = phase === 'inhale' ? 1 + progress * 0.5 : phase === 'exhale' ? 1.5 - progress * 0.5 : phase === 'hold' ? 1.5 : 1;

  return (
    <div
      className="h-screen w-screen flex flex-col items-center justify-center overflow-hidden relative"
      style={{ background: config.bg }}
    >
      {/* Stars for night theme */}
      {type === 'night' &&
        Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse-soft"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
          />
        ))}

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-white/90 drop-shadow mb-2 text-center"
      >
        {config.label}
      </motion.h1>

      {/* Round counter */}
      <p className="text-white/60 mb-8">
        Runde {round} von {totalRounds}
      </p>

      {/* Breathing circle */}
      <div className="relative flex items-center justify-center mb-8">
        {/* Outer glow */}
        <motion.div
          animate={{ scale: circleSize, opacity: isActive ? 0.3 : 0.1 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="absolute w-56 h-56 rounded-full"
          style={{
            background: `radial-gradient(circle, ${config.circle[0]}80, transparent)`,
          }}
        />

        {/* Main circle */}
        <motion.div
          animate={{ scale: circleSize }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="w-44 h-44 rounded-full flex items-center justify-center shadow-2xl"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${config.circle[0]}, ${config.circle[1]}, ${config.circle[2]})`,
          }}
        >
          <div className="text-center">
            <p className="text-white text-xl font-bold drop-shadow">
              {isActive ? phaseLabel : isComplete ? '✨' : '🌬️'}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Phase indicator */}
      <div className="flex gap-3 mb-8">
        {['inhale', 'hold', 'exhale'].map((p) => (
          <div
            key={p}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              phase === p && isActive
                ? 'bg-white/30 text-white scale-110'
                : 'bg-white/10 text-white/40'
            }`}
          >
            {p === 'inhale' ? 'Einatmen' : p === 'hold' ? 'Halten' : 'Ausatmen'}
          </div>
        ))}
      </div>

      {/* Controls */}
      {!isActive && !isComplete && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={start}
          className="bg-white/20 backdrop-blur text-white font-bold py-3 px-8 rounded-full border border-white/30 hover:bg-white/30 transition-all"
        >
          {round > 1 ? 'Fortsetzen' : 'Starten'}
        </motion.button>
      )}

      {isComplete && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <p className="text-white text-xl font-bold mb-2">Wunderbar gemacht! 🌟</p>
          <p className="text-white/70 mb-4">Du hast dir einen Moment der Ruhe geschenkt.</p>
          <div className="bg-[#FFEAA7] rounded-full inline-flex items-center gap-2 px-4 py-2 mb-6">
            <span>⭐</span>
            <span className="font-bold text-[#2d3436]">+30 EP</span>
          </div>
          <br />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onComplete}
            className="bg-white text-[#6C5CE7] font-bold py-3 px-8 rounded-full shadow-lg"
          >
            Weiter →
          </motion.button>
        </motion.div>
      )}

      {/* Back button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        onClick={() => {
          reset();
          onComplete();
        }}
        className="absolute top-6 left-6 text-white/50 hover:text-white/80 font-semibold transition-all"
      >
        ← Beenden
      </motion.button>

      {/* Instruction text */}
      {!isActive && !isComplete && (
        <p className="absolute bottom-8 text-white/40 text-sm text-center px-8">
          Finde eine bequeme Position. Atme ruhig ein und aus.
          Die Übung führt dich durch {totalRounds} Runden.
        </p>
      )}
    </div>
  );
}
