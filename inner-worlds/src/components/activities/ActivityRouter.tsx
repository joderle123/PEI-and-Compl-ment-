// @ts-nocheck
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../stores/gameStore';
import { getIslandData } from '../../data';
import type { IslandId } from '../../types';
import BreathingExercise from './BreathingExercise';
import JournalWriter from './JournalWriter';

// ---------------------------------------------------------------------------
// Island themes for visual consistency
// ---------------------------------------------------------------------------

const ISLAND_ACCENT: Record<string, { accent: string; bg: string }> = {
  volcano: {
    accent: '#ff6b35',
    bg: 'radial-gradient(ellipse at 50% 100%, rgba(255,60,10,0.12) 0%, transparent 50%), linear-gradient(180deg, #0d0d1a 0%, #2d1810 40%, #1a0a0a 100%)',
  },
  ocean: {
    accent: '#74b9ff',
    bg: 'radial-gradient(ellipse at 50% 100%, rgba(0,80,200,0.12) 0%, transparent 50%), linear-gradient(180deg, #0d0d1a 0%, #0a1a3a 40%, #050d1a 100%)',
  },
  forest: {
    accent: '#55efc4',
    bg: 'radial-gradient(ellipse at 50% 100%, rgba(0,120,50,0.1) 0%, transparent 50%), linear-gradient(180deg, #0d0d1a 0%, #0a2d18 40%, #050d0a 100%)',
  },
  mountain: {
    accent: '#a29bfe',
    bg: 'radial-gradient(ellipse at 50% 100%, rgba(140,120,200,0.1) 0%, transparent 50%), linear-gradient(180deg, #0d0d1a 0%, #1a1530 40%, #0d0a1a 100%)',
  },
  garden: {
    accent: '#fd79a8',
    bg: 'radial-gradient(ellipse at 50% 100%, rgba(255,100,150,0.08) 0%, transparent 50%), linear-gradient(180deg, #0d0d1a 0%, #2d1828 40%, #1a0a15 100%)',
  },
  night: {
    accent: '#6c5ce7',
    bg: 'radial-gradient(ellipse at 50% 20%, rgba(80,60,180,0.12) 0%, transparent 50%), linear-gradient(180deg, #050510 0%, #0d0d2e 40%, #050510 100%)',
  },
  rainbow: {
    accent: '#ffeaa7',
    bg: 'radial-gradient(ellipse at 50% 100%, rgba(255,180,0,0.08) 0%, transparent 50%), linear-gradient(180deg, #0d0d1a 0%, #2d2018 40%, #1a150a 100%)',
  },
  home: {
    accent: '#ffd700',
    bg: 'radial-gradient(ellipse at 50% 100%, rgba(201,168,76,0.1) 0%, transparent 50%), linear-gradient(180deg, #0d0d1a 0%, #1a1510 40%, #0d0d0a 100%)',
  },
};

// ---------------------------------------------------------------------------
// Activity type icons
// ---------------------------------------------------------------------------

function getActivityIcon(type: string): string {
  switch (type) {
    case 'assessment': return '\u{1F50D}';
    case 'creative': return '\u{1F3A8}';
    case 'reflection': return '\u{1FA9E}';
    case 'roleplay': return '\u{1F3AD}';
    default: return '\u{2728}';
  }
}

// ---------------------------------------------------------------------------
// Ambient particles
// ---------------------------------------------------------------------------

function FloatingParticles({ accent }: { accent: string }) {
  const particles = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 2 + Math.random() * 3,
        dur: 6 + Math.random() * 6,
        delay: Math.random() * 3,
      })),
    [],
  );
  return (
    <>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: accent,
            boxShadow: `0 0 ${p.size * 2}px ${accent}`,
          }}
          animate={{ opacity: [0, 0.4, 0], y: [0, -25, -50] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeOut' }}
        />
      ))}
    </>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ActivityRouter() {
  const { setScreen, addXP, completeActivity } = useGameStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [isFinishing, setIsFinishing] = useState(false);

  const activityId = sessionStorage.getItem('activeActivityId');
  const islandId = sessionStorage.getItem('activeIslandId') as IslandId;

  const data = getIslandData(islandId || 'volcano');
  const activity = data.activities.find((a: any) => a.id === activityId);
  const theme = ISLAND_ACCENT[islandId] || ISLAND_ACCENT.volcano;

  const handleComplete = () => {
    setIsFinishing(true);
    if (activityId && islandId) {
      completeActivity(activityId, islandId);
    }
    addXP(20);
    // Brief celebration before returning
    setTimeout(() => setScreen('island'), 1200);
  };

  // ── Not found ──
  if (!activity) {
    return (
      <div
        className="h-screen flex items-center justify-center"
        style={{ background: 'linear-gradient(180deg, #0d0d1a 0%, #1a0a2e 50%, #0d0d1a 100%)' }}
      >
        <div className="text-center">
          <p className="text-xl" style={{ color: '#e8e0d0' }}>
            {'\u00DC'}bung nicht gefunden
          </p>
          <button
            onClick={() => setScreen('island')}
            className="mt-4 px-6 py-2 rounded-full cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, rgba(201,168,76,0.3), rgba(201,168,76,0.15))',
              border: '1px solid rgba(201,168,76,0.5)',
              color: '#ffd700',
            }}
          >
            Zur{'\u00FC'}ck
          </button>
        </div>
      </div>
    );
  }

  // ── Route special types ──
  if (activity.type === 'breathing' || activity.type === 'meditation') {
    return <BreathingExercise type={islandId} onComplete={handleComplete} />;
  }

  if (activity.type === 'journal') {
    return (
      <JournalWriter
        prompt={activity.description}
        islandId={islandId}
        onComplete={() => {
          if (activityId && islandId) completeActivity(activityId, islandId);
          addXP(20);
          setScreen('island');
        }}
      />
    );
  }

  const instructions: string[] = activity.instructions || [];
  const isLastStep = currentStep >= instructions.length - 1;

  // ── Immersive guided activity ──
  return (
    <div
      className="h-screen flex flex-col overflow-hidden relative"
      style={{ background: theme.bg }}
    >
      {/* Atmospheric overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.4) 100%)',
        }}
      />
      <FloatingParticles accent={theme.accent} />

      {/* Completion flash */}
      <AnimatePresence>
        {isFinishing && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="text-center"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 120 }}
            >
              <div className="text-5xl mb-2">{'\u2728'}</div>
              <div
                className="text-lg font-bold"
                style={{ color: '#ffd700', textShadow: '0 0 15px rgba(255,215,0,0.4)' }}
              >
                +20 EP
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Header ── */}
      <div
        className="relative z-20 flex items-center gap-3 px-4 py-3"
        style={{
          background: 'rgba(13,13,26,0.7)',
          backdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${theme.accent}15`,
        }}
      >
        <button
          className="text-sm font-semibold transition-colors duration-300 px-2 py-1 rounded-lg cursor-pointer"
          style={{ color: 'rgba(160,152,136,0.7)' }}
          onClick={() => setScreen('island')}
        >
          {'\u2190'}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-lg">{getActivityIcon(activity.type)}</span>
            <span
              className="text-sm font-bold truncate"
              style={{ color: '#ffd700' }}
            >
              {activity.title}
            </span>
          </div>
        </div>

        {/* Subtle progress dots */}
        {instructions.length > 1 && (
          <div className="flex items-center gap-1">
            {instructions.map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all duration-500"
                style={{
                  width: i === currentStep ? '14px' : '4px',
                  height: '4px',
                  background: i <= currentStep
                    ? `linear-gradient(90deg, ${theme.accent}, #ffd700)`
                    : 'rgba(255,255,255,0.1)',
                  boxShadow: i === currentStep ? `0 0 6px ${theme.accent}60` : 'none',
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Main content area ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10 overflow-auto">
        {instructions.length > 0 ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              className="max-w-lg w-full"
              initial={{ opacity: 0, y: 30, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Description (only on first step) */}
              {currentStep === 0 && activity.description && (
                <motion.p
                  className="text-center text-sm mb-6 leading-relaxed"
                  style={{ color: 'rgba(232,224,208,0.6)' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {activity.description}
                </motion.p>
              )}

              {/* Current instruction card */}
              <div
                className="rounded-2xl p-6 mb-6"
                style={{
                  background: `${theme.accent}08`,
                  border: `1px solid ${theme.accent}20`,
                }}
              >
                <p
                  className="text-lg leading-relaxed"
                  style={{ color: '#e8e0d0' }}
                >
                  {instructions[currentStep]}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        ) : (
          <motion.div
            className="max-w-lg w-full text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-5xl mb-4 block">{getActivityIcon(activity.type)}</span>
            <h2
              className="text-2xl font-bold mb-3"
              style={{ color: '#ffd700', textShadow: '0 0 15px rgba(255,215,0,0.3)' }}
            >
              {activity.title}
            </h2>
            <p className="text-sm mb-8 leading-relaxed" style={{ color: 'rgba(232,224,208,0.7)' }}>
              {activity.description}
            </p>
          </motion.div>
        )}
      </div>

      {/* ── Bottom action area ── */}
      <div
        className="relative z-20 px-6 pb-6 pt-2"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(13,13,26,0.8) 30%)',
        }}
      >
        {instructions.length > 0 ? (
          <div className="max-w-lg mx-auto flex gap-3">
            {currentStep > 0 && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="py-3 px-5 rounded-xl text-sm font-semibold cursor-pointer"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(200,200,200,0.6)',
                }}
                onClick={() => setCurrentStep((s) => s - 1)}
              >
                {'\u2190'}
              </motion.button>
            )}

            {!isLastStep ? (
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: `0 0 15px ${theme.accent}25` }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 py-3 px-6 rounded-xl text-sm font-bold cursor-pointer"
                style={{
                  background: `${theme.accent}15`,
                  border: `1px solid ${theme.accent}35`,
                  color: theme.accent,
                }}
                onClick={() => setCurrentStep((s) => s + 1)}
              >
                Weiter {'\u2192'}
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: '0 0 25px rgba(201,168,76,0.3)' }}
                whileTap={{ scale: 0.97 }}
                className="flex-1 py-3 px-6 rounded-xl text-sm font-bold cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #92600a, #b8860b, #daa520, #ffd700)',
                  color: '#1a0a2e',
                  boxShadow: '0 0 15px rgba(201,168,76,0.2)',
                }}
                onClick={handleComplete}
              >
                Abschlie{'\u00DF'}en {'\u2728'}
              </motion.button>
            )}
          </div>
        ) : (
          <div className="max-w-lg mx-auto">
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: '0 0 25px rgba(201,168,76,0.3)' }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-3 px-6 rounded-xl text-sm font-bold cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #92600a, #b8860b, #daa520, #ffd700)',
                color: '#1a0a2e',
                boxShadow: '0 0 15px rgba(201,168,76,0.2)',
              }}
              onClick={handleComplete}
            >
              Abschlie{'\u00DF'}en {'\u2728'}
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}
