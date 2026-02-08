import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../stores/gameStore';
import { Mood } from '../../types';
import EmotionWheel from '../common/EmotionWheel';
import { getTimeOfDayGreeting } from '../../utils/accessibility';
import { getCompanionEmoji } from '../../data/companions';

// ---------------------------------------------------------------------------
// Seeded random for deterministic star/ember layouts across renders
// ---------------------------------------------------------------------------

const seededRandom = (seed: number): number => {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
};

// ---------------------------------------------------------------------------
// Companion mood responses (German)
// ---------------------------------------------------------------------------

const moodResponses: Record<string, string> = {
  happy: 'Schön, dass es dir gut geht! 🌟',
  sad: 'Es ist okay, so zu fühlen. Ich bin bei dir. 💙',
  angry: 'Danke, dass du das mit mir teilst. Zusammen schaffen wir das.',
  anxious: 'Du bist nicht allein. Atme tief durch – ich bin hier.',
  calm: 'Wunderbar! Ein ruhiger Geist ist eine Superkraft. ✨',
  confused: 'Das ist völlig okay. Manchmal brauchen Dinge Zeit.',
  excited: 'Deine Energie ist ansteckend! Lass uns loslegen! 🎉',
  tired: 'Hör auf deinen Körper. Wir nehmen es heute ruhig.',
  lonely: 'Du bist nicht allein – ich bin immer hier für dich. 🤗',
  proud: 'Du hast allen Grund stolz zu sein! Feiere das! 🥳',
  frustrated: 'Frustration zeigt, dass dir etwas wichtig ist. Das ist Stärke.',
  hopeful: 'Hoffnung ist der erste Schritt zu etwas Großartigem! 🌈',
};

// ---------------------------------------------------------------------------
// Framer Motion variants
// ---------------------------------------------------------------------------

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' as const },
  },
};

// ---------------------------------------------------------------------------
// MoodCheckIn
// ---------------------------------------------------------------------------

export default function MoodCheckIn() {
  const { companion, setCurrentMood, setScreen, settings } = useGameStore();
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [note, setNote] = useState('');

  const greeting = getTimeOfDayGreeting(settings.language);
  const companionEmoji = companion ? getCompanionEmoji(companion.type) : '🌟';

  // -------------------------------------------------------------------------
  // Procedural background elements (memoised for stable layouts)
  // -------------------------------------------------------------------------

  const stars = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        top: `${seededRandom(i * 3 + 1) * 92 + 2}%`,
        left: `${seededRandom(i * 3 + 2) * 96 + 2}%`,
        size: seededRandom(i * 3 + 3) * 2 + 1,
        duration: seededRandom(i * 7 + 5) * 3 + 2,
        delay: seededRandom(i * 7 + 9) * 5,
      })),
    [],
  );

  const embers = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        left: `${seededRandom(i * 5 + 100) * 90 + 5}%`,
        bottom: `${seededRandom(i * 5 + 101) * -10}%`,
        size: seededRandom(i * 5 + 102) * 3 + 2,
        duration: seededRandom(i * 5 + 103) * 6 + 6,
        delay: seededRandom(i * 5 + 104) * 8,
      })),
    [],
  );

  // -------------------------------------------------------------------------
  // Handlers
  // -------------------------------------------------------------------------

  const handleContinue = () => {
    if (selectedMood) {
      setCurrentMood(selectedMood, note || undefined);
    }
    setScreen('island-map');
  };

  const handleSkip = () => {
    setScreen('island-map');
  };

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------

  return (
    <div
      className="relative h-full w-full overflow-hidden flex flex-col items-center"
      style={{
        background: `
          radial-gradient(ellipse 80% 60% at 50% 40%, rgba(45,27,78,0.7) 0%, transparent 70%),
          radial-gradient(ellipse 60% 50% at 30% 70%, rgba(108,92,231,0.15) 0%, transparent 60%),
          radial-gradient(ellipse 50% 40% at 75% 20%, rgba(201,168,76,0.06) 0%, transparent 50%),
          linear-gradient(180deg, #0d0d1a 0%, #1a0a2e 40%, #0d0d1a 100%)
        `,
      }}
    >
      {/* ── Star field ── */}
      {stars.map((s) => (
        <div
          key={`star-${s.id}`}
          className="star"
          style={{
            top: s.top,
            left: s.left,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}

      {/* ── Ember particles ── */}
      {embers.map((e) => (
        <div
          key={`ember-${e.id}`}
          className="ember"
          style={{
            left: e.left,
            bottom: e.bottom,
            width: `${e.size}px`,
            height: `${e.size}px`,
            animationDuration: `${e.duration}s`,
            animationDelay: `${e.delay}s`,
          }}
        />
      ))}

      {/* ── Fog layers ── */}
      <div className="fog-layer" style={{ opacity: 0.5 }} />
      <div
        className="fog-layer"
        style={{ animationDelay: '-8s', animationDuration: '28s', opacity: 0.3 }}
      />

      {/* ── Vignette overlay ── */}
      <div className="vignette absolute inset-0 z-10" />

      {/* ── Ambient central glow ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '500px',
          height: '500px',
          top: '35%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background:
            'radial-gradient(circle, rgba(201,168,76,0.06) 0%, rgba(108,92,231,0.03) 40%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* ── Scrollable content area ──                                    */}
      {/* ══════════════════════════════════════════════════════════════════ */}

      <div className="relative z-20 h-full w-full overflow-y-auto">
        <motion.div
          className="max-w-lg mx-auto px-6 py-8 sm:py-12 flex flex-col items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* ── Companion greeting ── */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3 mb-6 w-full max-w-md"
          >
            <motion.span
              className="text-5xl drop-shadow-[0_0_12px_rgba(201,168,76,0.3)]"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              {companionEmoji}
            </motion.span>
            <div className="glass-panel rounded-2xl px-5 py-3 border border-amber-500/20">
              <p className="font-title font-bold text-golden text-sm sm:text-base">
                {greeting}, {companion?.name ? `mit ${companion.name}` : 'Abenteurer'}!
              </p>
              <p className="text-amber-200/50 text-xs sm:text-sm mt-0.5">
                Schön, dass du wieder da bist.
              </p>
            </div>
          </motion.div>

          {/* ── Decorative ornament ── */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-3 mb-4"
            style={{ width: '100%', maxWidth: '260px' }}
          >
            <div
              style={{
                flex: 1,
                height: '1px',
                background:
                  'linear-gradient(90deg, transparent, rgba(201,168,76,0.5), rgba(201,168,76,0.2))',
              }}
            />
            <span style={{ color: 'rgba(201,168,76,0.6)', fontSize: '8px' }}>&#9670;</span>
            <span style={{ color: 'rgba(201,168,76,0.8)', fontSize: '12px' }}>&#9670;</span>
            <span style={{ color: 'rgba(201,168,76,0.6)', fontSize: '8px' }}>&#9670;</span>
            <div
              style={{
                flex: 1,
                height: '1px',
                background:
                  'linear-gradient(270deg, transparent, rgba(201,168,76,0.5), rgba(201,168,76,0.2))',
              }}
            />
          </motion.div>

          {/* ── Title ── */}
          <motion.h1
            variants={itemVariants}
            className="font-title text-golden animate-golden-glow text-center"
            style={{
              fontSize: 'clamp(1.8rem, 6vw, 2.8rem)',
              fontWeight: 700,
              letterSpacing: '0.1em',
              lineHeight: 1.2,
              filter: 'drop-shadow(0 0 20px rgba(201,168,76,0.25))',
            }}
          >
            Wie geht es dir gerade?
          </motion.h1>

          {/* ── Subtitle ── */}
          <motion.p
            variants={itemVariants}
            className="mt-2 mb-8 text-center"
            style={{
              color: 'rgba(232,213,163,0.55)',
              fontSize: 'clamp(0.85rem, 2.5vw, 1rem)',
              letterSpacing: '0.06em',
              textShadow: '0 1px 4px rgba(0,0,0,0.5)',
            }}
          >
            Du musst nichts teilen, wenn du nicht möchtest.
          </motion.p>

          {/* ── Emotion Wheel ── */}
          <motion.div
            variants={itemVariants}
          >
            <EmotionWheel
              onSelect={(mood) => setSelectedMood(mood)}
              selectedMood={selectedMood ?? undefined}
            />
          </motion.div>

          {/* ── Companion response to selected mood ── */}
          <AnimatePresence>
            {selectedMood && (
              <motion.div
                key="mood-response"
                initial={{ opacity: 0, y: 12, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ type: 'spring' as const, stiffness: 300, damping: 25 }}
                className="mt-6 glass-panel rounded-2xl px-5 py-3 max-w-md text-center border border-amber-500/20"
                style={{
                  boxShadow: '0 0 20px rgba(201,168,76,0.08), inset 0 0 20px rgba(201,168,76,0.03)',
                }}
              >
                <span className="text-2xl mr-2">{companionEmoji}</span>
                <span
                  className="font-medium"
                  style={{ color: '#e8d5a3', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}
                >
                  {moodResponses[selectedMood] || 'Danke fürs Teilen!'}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Optional note textarea ── */}
          <AnimatePresence>
            {selectedMood && (
              <motion.div
                key="note-input"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ delay: 0.15, duration: 0.4 }}
                className="mt-4 w-full max-w-md"
              >
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Möchtest du noch etwas dazu sagen? (optional)"
                  className="w-full p-4 rounded-2xl resize-none focus:outline-none transition-all duration-300"
                  style={{
                    background: 'rgba(13, 13, 26, 0.6)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(201, 168, 76, 0.2)',
                    color: '#e8e0d0',
                    fontSize: '0.9rem',
                    lineHeight: 1.6,
                    textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(201, 168, 76, 0.5)';
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(201,168,76,0.1), inset 0 0 20px rgba(201,168,76,0.03)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(201, 168, 76, 0.2)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  rows={3}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Buttons ── */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center gap-3 mt-8 w-full"
            style={{ maxWidth: '340px' }}
          >
            {/* Primary – Weiter */}
            <motion.button
              onClick={handleContinue}
              className="glass-panel ornate-border cursor-pointer relative w-full overflow-hidden"
              style={{
                padding: '0.9rem 2rem',
                borderRadius: '12px',
                borderColor: 'rgba(201,168,76,0.5)',
                color: '#f0c674',
                fontFamily: 'var(--font-title)',
                fontSize: '1.05rem',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textShadow: '0 0 12px rgba(232,168,56,0.3)',
                transition: 'all 0.3s ease',
              }}
              whileHover={{
                scale: 1.03,
                boxShadow:
                  '0 0 20px rgba(201,168,76,0.25), 0 0 40px rgba(201,168,76,0.1), inset 0 0 20px rgba(201,168,76,0.05)',
                borderColor: 'rgba(201,168,76,0.8)',
              }}
              whileTap={{ scale: 0.97 }}
            >
              {/* Shimmer sweep */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/10 to-transparent pointer-events-none"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
              <span className="relative z-[1]">Weiter &rarr;</span>
            </motion.button>

            {/* Secondary – Überspringen */}
            <motion.button
              onClick={handleSkip}
              className="cursor-pointer"
              style={{
                padding: '0.6rem 1.5rem',
                color: 'rgba(201,168,76,0.35)',
                fontFamily: 'var(--font-title)',
                fontSize: '0.85rem',
                fontWeight: 500,
                letterSpacing: '0.08em',
                background: 'none',
                border: 'none',
                transition: 'all 0.3s ease',
              }}
              whileHover={{ scale: 1.05, color: 'rgba(201,168,76,0.65)' }}
              whileTap={{ scale: 0.95 }}
            >
              Überspringen
            </motion.button>
          </motion.div>

          {/* ── Bottom ornament ── */}
          <motion.div
            variants={itemVariants}
            className="mt-8 mb-4 select-none pointer-events-none"
            style={{
              color: 'rgba(201,168,76,0.25)',
              fontSize: '8px',
              letterSpacing: '0.5em',
            }}
          >
            &#9671;&ensp;&#9670;&ensp;&#9671;
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
