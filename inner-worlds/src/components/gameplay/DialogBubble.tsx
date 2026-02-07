import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface DialogBubbleProps {
  /** The full text to display (may be revealed with typewriter effect) */
  text: string;
  /** Name of the speaker */
  speaker: string;
  /** Emoji shown next to the speaker */
  speakerEmoji: string;
  /** True when the player is the speaker, false for NPCs */
  isPlayer: boolean;
  /** Called once the full text has been revealed */
  onComplete?: () => void;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Milliseconds between each character during the typewriter effect */
const CHAR_DELAY = 28;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const DialogBubble: React.FC<DialogBubbleProps> = ({
  text,
  speaker,
  speakerEmoji,
  isPlayer,
  onComplete,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const indexRef = useRef(0);

  // Reset when text changes
  useEffect(() => {
    setDisplayedText('');
    setIsComplete(false);
    indexRef.current = 0;
  }, [text]);

  // Typewriter effect
  useEffect(() => {
    if (isComplete) return;

    const tick = () => {
      indexRef.current += 1;
      const next = text.slice(0, indexRef.current);
      setDisplayedText(next);

      if (indexRef.current >= text.length) {
        setIsComplete(true);
        onComplete?.();
      } else {
        timeoutRef.current = setTimeout(tick, CHAR_DELAY);
      }
    };

    timeoutRef.current = setTimeout(tick, CHAR_DELAY);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [text, isComplete, onComplete]);

  // Allow skipping the typewriter by clicking
  const handleSkip = () => {
    if (isComplete) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setDisplayedText(text);
    setIsComplete(true);
    onComplete?.();
  };

  // Visual configuration
  const alignment = isPlayer ? 'items-end' : 'items-start';
  const slideFrom = isPlayer ? 60 : -60;

  const bubbleBg = isPlayer
    ? 'bg-primary/15 border-primary/30'
    : 'bg-white/80 border-white/50';

  const bubbleRound = isPlayer
    ? 'rounded-2xl rounded-br-sm'
    : 'rounded-2xl rounded-bl-sm';

  return (
    <motion.div
      className={`flex flex-col ${alignment} w-full gap-1`}
      initial={{ opacity: 0, x: slideFrom }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: 'spring', damping: 22, stiffness: 260 }}
    >
      {/* Speaker label */}
      <div
        className={`flex items-center gap-1.5 px-2 ${
          isPlayer ? 'flex-row-reverse' : 'flex-row'
        }`}
      >
        <span className="text-xl" role="img" aria-hidden="true">
          {speakerEmoji}
        </span>
        <span className="text-xs font-bold text-text-light uppercase tracking-wide">
          {speaker}
        </span>
      </div>

      {/* Bubble */}
      <div
        className={`
          relative max-w-[85%] px-4 py-3 shadow-md backdrop-blur-sm border
          cursor-pointer select-none
          ${bubbleBg} ${bubbleRound}
        `}
        onClick={handleSkip}
        title="Klicke zum Überspringen"
      >
        <p className="text-base leading-relaxed text-text whitespace-pre-wrap">
          {displayedText}
          {!isComplete && (
            <motion.span
              className="inline-block ml-0.5 w-0.5 h-4 bg-text/60 align-middle"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.6, repeat: Infinity }}
            />
          )}
        </p>
      </div>
    </motion.div>
  );
};

export default DialogBubble;
