import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../stores/gameStore';
import type { CompanionType } from '../../types';

// ---------------------------------------------------------------------------
// Companion emoji map
// ---------------------------------------------------------------------------

const COMPANION_EMOJI: Record<CompanionType, string> = {
  wolf: '\uD83D\uDC3A',
  owl: '\uD83E\uDD89',
  fox: '\uD83E\uDD8A',
  turtle: '\uD83D\uDC22',
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

  const emoji = COMPANION_EMOJI[companion.type] || '\uD83D\uDC3E';

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start gap-1">
      {/* Speech bubble */}
      <AnimatePresence>
        {showBubble && (
          <motion.div
            className="relative ml-2 mb-1 max-w-[200px] bg-white/90 backdrop-blur-sm rounded-2xl rounded-bl-sm px-3 py-2 shadow-md"
            initial={{ opacity: 0, y: 8, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.8 }}
            transition={{ type: 'spring', damping: 18, stiffness: 280 }}
          >
            <p className="text-xs font-semibold text-text leading-snug">
              {ENCOURAGEMENTS[messageIndex]}
            </p>
            {/* Bubble tail */}
            <div className="absolute -bottom-1.5 left-3 w-3 h-3 bg-white/90 rotate-45 rounded-sm" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Companion avatar */}
      <motion.div
        className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full pl-3 pr-4 py-2 shadow-lg cursor-default select-none"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-3xl leading-none" role="img" aria-hidden="true">
          {emoji}
        </span>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-text leading-tight">
            {companion.name}
          </span>
          <span className="text-[10px] text-text-light font-medium">
            Level {companion.level}
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default CompanionWidget;
