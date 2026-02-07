import { motion } from 'framer-motion';
import { useGameStore } from '../../stores/gameStore';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** XP required to advance one level */
const XP_PER_LEVEL = 100;

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
    <div className="w-full flex items-center gap-3 px-4 py-2 bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm">
      {/* Level badge */}
      <div className="flex items-center justify-center w-9 h-9 rounded-full bg-primary text-white font-bold text-sm shrink-0 shadow-md">
        {level}
      </div>

      {/* Progress section */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-semibold text-text-light flex items-center gap-1">
            <span role="img" aria-hidden="true">
              &#x2B50;
            </span>
            {currentLevelXP} / {XP_PER_LEVEL} EP
          </span>
          <span className="text-xs font-bold text-primary">
            Level {level}
          </span>
        </div>

        {/* Progress bar track */}
        <div className="relative w-full h-3 rounded-full bg-primary-light/20 overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{
              background: 'linear-gradient(90deg, var(--color-primary), var(--color-secondary))',
            }}
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ type: 'spring', stiffness: 80, damping: 20 }}
          />

          {/* Shimmer overlay */}
          <motion.div
            className="absolute inset-0 rounded-full opacity-30"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
              backgroundSize: '200% 100%',
            }}
            animate={{ backgroundPosition: ['200% center', '-200% center'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      </div>

      {/* Star decoration */}
      <motion.span
        className="text-xl leading-none shrink-0"
        role="img"
        aria-hidden="true"
        animate={{ rotate: [0, 15, -15, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        &#x1F31F;
      </motion.span>
    </div>
  );
};

export default XPBar;
