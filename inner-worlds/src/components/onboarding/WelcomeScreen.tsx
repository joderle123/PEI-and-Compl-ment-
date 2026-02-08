import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../../stores/gameStore';
import type { GameScreen } from '../../types';

// ---------------------------------------------------------------------------
// Helper – seeded random for deterministic layouts across renders
// ---------------------------------------------------------------------------

const seededRandom = (seed: number): number => {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
};

// ---------------------------------------------------------------------------
// Rune glyphs used as decorative background symbols
// ---------------------------------------------------------------------------

const RUNE_GLYPHS = [
  '\u16A0', // ᚠ
  '\u16A2', // ᚢ
  '\u16A6', // ᚦ
  '\u16B1', // ᚱ
  '\u16B7', // ᚷ
  '\u16BA', // ᚺ
  '\u16BE', // ᚾ
  '\u16C1', // ᛁ
  '\u16C7', // ᛇ
  '\u16C9', // ᛉ
  '\u16CB', // ᛋ
  '\u16CF', // ᛏ
  '\u16D2', // ᛒ
  '\u16D6', // ᛖ
  '\u16DA', // ᛚ
  '\u16DC', // ᛜ
  '\u16DE', // ᛞ
];

// ---------------------------------------------------------------------------
// WelcomeScreen
// ---------------------------------------------------------------------------

const WelcomeScreen = () => {
  const { onboardingComplete, setScreen } = useGameStore();

  const handleNewJourney = () => {
    setScreen('onboarding-avatar' as GameScreen);
  };

  const handleContinue = () => {
    setScreen('mood-checkin' as GameScreen);
  };

  // -------------------------------------------------------------------------
  // Memoised procedural elements so they survive re-renders without change
  // -------------------------------------------------------------------------

  const stars = useMemo(
    () =>
      Array.from({ length: 35 }, (_, i) => ({
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
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: `${seededRandom(i * 5 + 100) * 90 + 5}%`,
        bottom: `${seededRandom(i * 5 + 101) * -10}%`,
        size: seededRandom(i * 5 + 102) * 3 + 2,
        duration: seededRandom(i * 5 + 103) * 6 + 6,
        delay: seededRandom(i * 5 + 104) * 8,
      })),
    [],
  );

  const runes = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        glyph: RUNE_GLYPHS[i % RUNE_GLYPHS.length],
        top: `${seededRandom(i * 11 + 200) * 85 + 5}%`,
        left: `${seededRandom(i * 11 + 201) * 90 + 5}%`,
        size: seededRandom(i * 11 + 202) * 16 + 12,
        opacity: seededRandom(i * 11 + 203) * 0.12 + 0.04,
        duration: seededRandom(i * 11 + 204) * 5 + 4,
        delay: seededRandom(i * 11 + 205) * 6,
        rotation: seededRandom(i * 11 + 206) * 40 - 20,
      })),
    [],
  );

  // -------------------------------------------------------------------------
  // Framer Motion variants for staggered entrance
  // -------------------------------------------------------------------------

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.6,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: 'easeOut' as const },
    },
  };

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------

  return (
    <div
      className="relative h-full w-full overflow-hidden flex flex-col items-center justify-center"
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

      {/* ── Decorative rune glyphs ── */}
      {runes.map((r) => (
        <motion.span
          key={`rune-${r.id}`}
          className="absolute select-none pointer-events-none"
          style={{
            top: r.top,
            left: r.left,
            fontSize: `${r.size}px`,
            color: `rgba(201,168,76,${r.opacity})`,
            transform: `rotate(${r.rotation}deg)`,
            fontFamily: 'serif',
          }}
          animate={{ opacity: [r.opacity * 0.5, r.opacity, r.opacity * 0.5] }}
          transition={{
            duration: r.duration,
            delay: r.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {r.glyph}
        </motion.span>
      ))}

      {/* ── Fog layers ── */}
      <div className="fog-layer" style={{ opacity: 0.6 }} />
      <div
        className="fog-layer"
        style={{ animationDelay: '-8s', animationDuration: '28s', opacity: 0.4 }}
      />
      <div
        className="fog-layer"
        style={{ animationDelay: '-15s', animationDuration: '35s', opacity: 0.3 }}
      />

      {/* ── Vignette overlay ── */}
      <div className="vignette absolute inset-0 z-10" />

      {/* ── God-ray radial glow behind the title ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '600px',
          height: '600px',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -55%)',
          background:
            'radial-gradient(circle, rgba(201,168,76,0.08) 0%, rgba(108,92,231,0.04) 40%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* ── Subtle rotating god-ray ── */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: '500px',
          height: '500px',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -55%)',
          background: `conic-gradient(
            from 0deg,
            transparent 0deg,
            rgba(201,168,76,0.03) 15deg,
            transparent 30deg,
            transparent 90deg,
            rgba(201,168,76,0.03) 105deg,
            transparent 120deg,
            transparent 180deg,
            rgba(201,168,76,0.03) 195deg,
            transparent 210deg,
            transparent 270deg,
            rgba(201,168,76,0.03) 285deg,
            transparent 300deg,
            transparent 360deg
          )`,
          filter: 'blur(20px)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      />

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* ── Main content ── */}
      {/* ══════════════════════════════════════════════════════════════════ */}

      <motion.div
        className="relative z-20 flex flex-col items-center text-center px-6 max-w-lg"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* ── Small top ornament ── */}
        <motion.div
          variants={itemVariants}
          className="mb-4 select-none pointer-events-none"
          style={{
            color: 'rgba(201,168,76,0.5)',
            fontSize: '14px',
            letterSpacing: '0.6em',
          }}
        >
          &#9670;&ensp;&#9671;&ensp;&#9670;&ensp;&#9671;&ensp;&#9670;
        </motion.div>

        {/* ── Title ── */}
        <motion.h1
          variants={itemVariants}
          className="font-title text-golden animate-golden-glow"
          style={{
            fontSize: 'clamp(2.8rem, 8vw, 4.5rem)',
            fontWeight: 700,
            letterSpacing: '0.14em',
            lineHeight: 1.1,
            filter: 'drop-shadow(0 0 30px rgba(201,168,76,0.3))',
          }}
        >
          INNER WORLDS
        </motion.h1>

        {/* ── Subtitle ── */}
        <motion.p
          variants={itemVariants}
          className="font-title"
          style={{
            marginTop: '0.75rem',
            fontSize: 'clamp(1rem, 3vw, 1.35rem)',
            color: '#e8d5a3',
            letterSpacing: '0.18em',
            textShadow:
              '0 0 20px rgba(232,168,56,0.35), 0 0 40px rgba(232,168,56,0.12)',
          }}
        >
          Entdecke deine Superkr&auml;fte
        </motion.p>

        {/* ── Golden divider with diamond ornaments ── */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-3 mt-6"
          style={{ width: '100%', maxWidth: '320px' }}
        >
          <div
            style={{
              flex: 1,
              height: '1px',
              background:
                'linear-gradient(90deg, transparent, rgba(201,168,76,0.6), rgba(201,168,76,0.3))',
            }}
          />
          <span style={{ color: 'rgba(201,168,76,0.7)', fontSize: '6px' }}>&#9670;</span>
          <span style={{ color: 'rgba(201,168,76,0.9)', fontSize: '10px' }}>&#9670;</span>
          <span style={{ color: 'rgba(201,168,76,0.7)', fontSize: '6px' }}>&#9670;</span>
          <div
            style={{
              flex: 1,
              height: '1px',
              background:
                'linear-gradient(270deg, transparent, rgba(201,168,76,0.6), rgba(201,168,76,0.3))',
            }}
          />
        </motion.div>

        {/* ── Description ── */}
        <motion.p
          variants={itemVariants}
          style={{
            marginTop: '1.5rem',
            fontSize: 'clamp(0.9rem, 2.5vw, 1.05rem)',
            color: '#e8e0d0',
            lineHeight: 1.75,
            maxWidth: '380px',
            textShadow: '0 1px 4px rgba(0,0,0,0.5)',
          }}
        >
          Eine Reise zu deinen inneren St&auml;rken.
          <br />
          Entdecke 8 magische Inseln und lerne deine
          <br />
          verborgenen Superkr&auml;fte kennen.
        </motion.p>

        {/* ── Buttons ── */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col gap-4 w-full mt-10"
          style={{ maxWidth: '340px' }}
        >
          {/* Primary CTA – Neue Reise beginnen */}
          <motion.button
            onClick={handleNewJourney}
            className="glass-panel ornate-border cursor-pointer"
            style={{
              width: '100%',
              padding: '1rem 2rem',
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
            Neue Reise beginnen
          </motion.button>

          {/* Secondary CTA – Reise fortsetzen (only when onboarding is done) */}
          {onboardingComplete && (
            <motion.button
              onClick={handleContinue}
              className="glass-panel cursor-pointer"
              style={{
                width: '100%',
                padding: '0.9rem 2rem',
                borderRadius: '12px',
                borderColor: 'rgba(201,168,76,0.2)',
                color: 'rgba(232,213,163,0.85)',
                fontFamily: 'var(--font-title)',
                fontSize: '0.95rem',
                fontWeight: 500,
                letterSpacing: '0.1em',
                textShadow: '0 0 8px rgba(232,168,56,0.15)',
                transition: 'all 0.3s ease',
              }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{
                scale: 1.03,
                boxShadow:
                  '0 0 15px rgba(201,168,76,0.15), 0 0 30px rgba(201,168,76,0.06)',
                borderColor: 'rgba(201,168,76,0.5)',
              }}
              whileTap={{ scale: 0.97 }}
            >
              Reise fortsetzen
            </motion.button>
          )}
        </motion.div>

        {/* ── Bottom ornament ── */}
        <motion.div
          variants={itemVariants}
          className="mt-12 select-none pointer-events-none"
          style={{
            color: 'rgba(201,168,76,0.3)',
            fontSize: '10px',
            letterSpacing: '0.5em',
          }}
        >
          &#9671;&ensp;&#9670;&ensp;&#9671;
        </motion.div>

        {/* ── Footer ── */}
        <motion.p
          variants={itemVariants}
          className="font-title"
          style={{
            marginTop: '0.75rem',
            fontSize: '0.65rem',
            color: 'rgba(201,168,76,0.25)',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
          }}
        >
          Social-Emotional Learning
        </motion.p>
      </motion.div>
    </div>
  );
};

export default WelcomeScreen;
