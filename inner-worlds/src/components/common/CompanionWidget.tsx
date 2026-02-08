import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../stores/gameStore';
import type { CompanionType } from '../../types';

// ---------------------------------------------------------------------------
// Companion emoji map
// ---------------------------------------------------------------------------

const COMPANION_EMOJI: Record<CompanionType, string> = {
  wolf: '\uD83D\uDC3A',   // 🐺
  owl: '\uD83E\uDD89',    // 🦉
  fox: '\uD83E\uDD8A',    // 🦊
  turtle: '\uD83D\uDC22', // 🐢
};

// ---------------------------------------------------------------------------
// Aura colour per companion type (warm, magical tones)
// ---------------------------------------------------------------------------

const COMPANION_AURA: Record<CompanionType, string> = {
  wolf: 'rgba(147, 130, 220, 0.35)',   // soft violet
  owl: 'rgba(100, 180, 255, 0.35)',    // gentle blue
  fox: 'rgba(255, 170, 60, 0.35)',     // warm amber
  turtle: 'rgba(100, 210, 140, 0.35)', // fresh green
};

// ---------------------------------------------------------------------------
// Encouraging messages (German)
// ---------------------------------------------------------------------------

const ENCOURAGEMENTS: string[] = [
  'Du machst das toll!',
  'Ich bin stolz auf dich!',
  'Jeder Schritt z\u00E4hlt.',
  'Du bist nicht allein.',
  'Mut f\u00E4ngt im Herzen an.',
  'Atme tief durch \u2013 du schaffst das!',
  'Gef\u00FChle sind wie Wellen \u2013 sie kommen und gehen.',
  'Du wirst jeden Tag st\u00E4rker.',
  'Es ist okay, auch mal Pause zu machen.',
  'Zusammen sind wir stark!',
  'Deine Gef\u00FChle sind wichtig.',
  'Ich glaube an dich!',
];

// ---------------------------------------------------------------------------
// Small runic diamond SVG used for decorative accents
// ---------------------------------------------------------------------------

const RuneDiamond: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    width="6"
    height="6"
    viewBox="0 0 6 6"
    className={className}
    aria-hidden="true"
  >
    <path d="M3 0 L6 3 L3 6 L0 3 Z" fill="currentColor" />
  </svg>
);

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const CompanionWidget: React.FC = () => {
  const companion = useGameStore((state) => state.companion);
  const [messageIndex, setMessageIndex] = useState(0);
  const [showBubble, setShowBubble] = useState(false);

  // Rotate encouragement messages
  useEffect(() => {
    if (!companion) return;

    // Show first bubble after a short delay
    const initialTimeout = setTimeout(() => {
      setShowBubble(true);
    }, 2000);

    const interval = setInterval(() => {
      // Hide bubble
      setShowBubble(false);

      // After a brief pause, show next message
      setTimeout(() => {
        setMessageIndex((prev) => (prev + 1) % ENCOURAGEMENTS.length);
        setShowBubble(true);
      }, 1000);
    }, 8000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [companion]);

  // Don't render if no companion is set (before onboarding)
  if (!companion) return null;

  const emoji = COMPANION_EMOJI[companion.type] || '\uD83D\uDC3E'; // 🐾 fallback
  const auraColor = COMPANION_AURA[companion.type] || 'rgba(255,215,0,0.25)';

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start gap-1.5">
      {/* ── Speech bubble ── glass-panel with golden accent ── */}
      <AnimatePresence>
        {showBubble && (
          <motion.div
            className="relative ml-2 mb-1 max-w-[220px] glass-panel rounded-2xl rounded-bl-sm px-3.5 py-2.5 border border-amber-500/20"
            style={{
              boxShadow:
                '0 0 12px rgba(255,215,0,0.08), inset 0 1px 0 rgba(255,215,0,0.06)',
            }}
            initial={{ opacity: 0, y: 8, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.8 }}
            transition={{
              type: 'spring' as const,
              damping: 18,
              stiffness: 280,
            }}
          >
            {/* Top-left golden accent line */}
            <div
              className="absolute top-0 left-3 right-3 h-px"
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(255,215,0,0.3), transparent)',
              }}
            />

            <p className="text-xs font-semibold text-amber-100/90 leading-snug font-title">
              {ENCOURAGEMENTS[messageIndex]}
            </p>

            {/* Bubble tail */}
            <div
              className="absolute -bottom-1.5 left-3 w-3 h-3 rotate-45 rounded-sm"
              style={{
                background:
                  'linear-gradient(135deg, rgba(30,25,40,0.85), rgba(20,15,30,0.9))',
                borderRight: '1px solid rgba(255,215,0,0.15)',
                borderBottom: '1px solid rgba(255,215,0,0.15)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Companion avatar ── floating body with glass panel ── */}
      <motion.div
        className="glass-panel flex items-center gap-3 rounded-full pl-3 pr-4 py-2.5 border border-amber-500/20 cursor-default select-none"
        style={{
          boxShadow: `0 0 20px ${auraColor}, 0 4px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,215,0,0.06)`,
        }}
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut' as const,
        }}
      >
        {/* Mystical circle around emoji with pulsing aura */}
        <div className="relative flex items-center justify-center w-11 h-11 shrink-0">
          {/* Pulsing aura ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle, ${auraColor}, transparent 70%)`,
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.6, 0.25, 0.6],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut' as const,
            }}
          />

          {/* Ornate golden circle border */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                'conic-gradient(from 0deg, #b8860b, #ffd700, #daa520, #ffd700, #b8860b)',
              padding: '1.5px',
            }}
          >
            <div className="w-full h-full rounded-full bg-stone-900/80" />
          </div>

          {/* Inner magical shimmer */}
          <motion.div
            className="absolute inset-[2px] rounded-full"
            style={{
              background:
                'radial-gradient(circle at 35% 30%, rgba(255,215,0,0.1), transparent 60%)',
            }}
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut' as const,
            }}
          />

          {/* Companion emoji */}
          <span
            className="relative z-10 text-2xl leading-none"
            role="img"
            aria-hidden="true"
          >
            {emoji}
          </span>
        </div>

        {/* Name and level */}
        <div className="flex flex-col gap-0.5">
          {/* Name in golden Cinzel font */}
          <span className="font-title text-golden text-sm font-bold leading-tight">
            {companion.name}
          </span>

          {/* Level indicator with golden badge */}
          <span className="flex items-center gap-1">
            <RuneDiamond className="text-amber-500/50" />
            <span
              className="text-[10px] font-title font-semibold leading-tight"
              style={{
                background: 'linear-gradient(90deg, #daa520, #ffd700)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Level {companion.level}
            </span>
            <RuneDiamond className="text-amber-500/50" />
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default CompanionWidget;
