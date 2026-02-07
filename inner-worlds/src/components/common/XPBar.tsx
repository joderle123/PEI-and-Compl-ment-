import { motion } from 'framer-motion';
import { useGameStore } from '../../stores/gameStore';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** XP required to advance one level */
const XP_PER_LEVEL = 100;

// ---------------------------------------------------------------------------
// Runic decoration SVG (small ornamental diamond / rune mark)
// ---------------------------------------------------------------------------

const RuneAccent: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    width="8"
    height="8"
    viewBox="0 0 8 8"
    className={className}
    aria-hidden="true"
  >
    <path d="M4 0 L8 4 L4 8 L0 4 Z" fill="currentColor" />
  </svg>
);

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const XPBar: React.FC = () => {
  const xp = useGameStore((state) => state.xp);
  const level = useGameStore((state) => state.level);

  // XP within the current level
  const currentLevelXP = xp % XP_PER_LEVEL;
  const progressPercent = (currentLevelXP / XP_PER_LEVEL) * 100;

  return (
    <div className="glass-panel w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl border border-amber-500/20">
      {/* ── Level badge ── ornate golden circle ── */}
      <motion.div
        className="relative flex items-center justify-center w-10 h-10 shrink-0"
        animate={{ rotate: [0, 3, -3, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut' as const,
        }}
      >
        {/* Outer ornate ring */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              'conic-gradient(from 0deg, #b8860b, #ffd700, #daa520, #ffd700, #b8860b)',
            padding: '2px',
          }}
        >
          <div className="w-full h-full rounded-full bg-stone-900/90" />
        </div>

        {/* Inner golden glow */}
        <div
          className="absolute inset-[3px] rounded-full"
          style={{
            background:
              'radial-gradient(circle at 40% 35%, rgba(255,215,0,0.15), transparent 70%)',
          }}
        />

        {/* Level number */}
        <span className="font-title text-golden relative z-10 text-sm font-bold leading-none">
          {level}
        </span>

        {/* Corner diamond accents */}
        <RuneAccent className="absolute -top-0.5 left-1/2 -translate-x-1/2 text-amber-400/60 scale-75" />
        <RuneAccent className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 text-amber-400/60 scale-75" />
      </motion.div>

      {/* ── Progress section ── */}
      <div className="flex-1 min-w-0">
        {/* Labels */}
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-semibold text-amber-300/90 flex items-center gap-1.5">
            <RuneAccent className="text-amber-500/50" />
            <span className="text-golden font-title">
              {currentLevelXP} / {XP_PER_LEVEL} EP
            </span>
          </span>
          <span className="font-title text-xs font-bold text-golden">
            Level {level}
          </span>
        </div>

        {/* Progress bar track */}
        <div className="relative w-full h-3 rounded-full overflow-hidden bg-stone-800/60 border border-amber-700/30">
          {/* Golden shimmer gradient fill */}
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{
              background:
                'linear-gradient(90deg, #92600a, #b8860b, #daa520, #ffd700, #ffe066)',
            }}
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{
              type: 'spring' as const,
              stiffness: 80,
              damping: 20,
            }}
          />

          {/* Shimmer overlay */}
          <motion.div
            className="absolute inset-0 rounded-full opacity-40"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(255,223,100,0.6) 40%, rgba(255,255,255,0.7) 50%, rgba(255,223,100,0.6) 60%, transparent 100%)',
              backgroundSize: '200% 100%',
            }}
            animate={{ backgroundPosition: ['200% center', '-200% center'] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'linear' as const,
            }}
          />

          {/* Subtle inner glow at the fill edge */}
          <motion.div
            className="absolute inset-y-0 rounded-full"
            style={{
              width: '4px',
              background:
                'radial-gradient(circle, rgba(255,215,0,0.9), transparent)',
              filter: 'blur(2px)',
            }}
            initial={{ left: 0 }}
            animate={{ left: `calc(${progressPercent}% - 2px)` }}
            transition={{
              type: 'spring' as const,
              stiffness: 80,
              damping: 20,
            }}
          />
        </div>

        {/* Runic underline decoration */}
        <div className="flex items-center justify-center gap-1 mt-1 opacity-30">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
          <RuneAccent className="text-amber-500 scale-50" />
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
        </div>
      </div>

      {/* ── Star decoration with golden glow ── */}
      <motion.span
        className="text-xl leading-none shrink-0 drop-shadow-[0_0_6px_rgba(255,215,0,0.6)]"
        role="img"
        aria-hidden="true"
        animate={{
          rotate: [0, 15, -15, 0],
          scale: [1, 1.1, 1],
          filter: [
            'drop-shadow(0 0 4px rgba(255,215,0,0.4))',
            'drop-shadow(0 0 8px rgba(255,215,0,0.8))',
            'drop-shadow(0 0 4px rgba(255,215,0,0.4))',
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut' as const,
        }}
      >
        &#x1F31F;
      </motion.span>
    </div>
  );
};

export default XPBar;
