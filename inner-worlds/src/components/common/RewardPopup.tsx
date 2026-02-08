import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface RewardEvent {
  type: string;
  data: unknown;
  timestamp: number;
}

interface RewardPopupProps {
  lastEvent: RewardEvent | null;
  comboMultiplier: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

// ---------------------------------------------------------------------------
// Event type constants
// ---------------------------------------------------------------------------

const EVENT_LEVEL_UP = 'level-up';
const EVENT_ACHIEVEMENT = 'achievement-unlocked';
const EVENT_WISDOM_CARD = 'wisdom-card-found';
const EVENT_STREAK = 'streak-milestone';
const EVENT_ISLAND_UNLOCKED = 'island-unlocked';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

let particleIdCounter = 0;

const createParticles = (count: number, spread = 100): Particle[] =>
  Array.from({ length: count }, () => ({
    id: ++particleIdCounter,
    x: Math.random() * spread * 2 - spread,
    y: -(Math.random() * spread + 40),
    size: Math.random() * 4 + 2,
    delay: Math.random() * 0.5,
    duration: Math.random() * 1 + 1,
  }));

const createFullScreenParticles = (count: number): Particle[] =>
  Array.from({ length: count }, () => ({
    id: ++particleIdCounter,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 6 + 2,
    delay: Math.random() * 1.5,
    duration: Math.random() * 2 + 1,
  }));

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

/** Fire-colored particles for streak events */
const FireParticles: React.FC<{ particles: Particle[] }> = ({ particles }) => (
  <>
    {particles.map((p) => {
      const colors = ['#ff4500', '#ff6347', '#ffa500', '#ffd700'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      return (
        <motion.div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle, ${color}, #e8a838)`,
            boxShadow: `0 0 8px 2px ${color}66`,
            left: '50%',
            top: '50%',
          }}
          initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0.8, 0],
            x: p.x * 0.6,
            y: p.y,
            scale: [0, 1.2, 1, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: 'easeOut' as const,
          }}
        />
      );
    })}
  </>
);

/** Fullscreen golden particle burst for level-up */
const LevelUpParticles: React.FC<{ particles: Particle[] }> = ({ particles }) => (
  <>
    {particles.map((p) => (
      <motion.div
        key={p.id}
        className="absolute rounded-full pointer-events-none"
        style={{
          width: p.size,
          height: p.size,
          background: 'radial-gradient(circle, #ffd700, #f0c674)',
          boxShadow: '0 0 10px 3px rgba(255,215,0,0.5)',
          left: `${p.x}%`,
          top: `${p.y}%`,
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: [0, 1, 1, 0],
          scale: [0, 1.5, 1, 0],
          y: [0, -30, -60],
        }}
        transition={{
          duration: p.duration + 1,
          delay: p.delay,
          ease: 'easeOut' as const,
        }}
      />
    ))}
  </>
);

// ---------------------------------------------------------------------------
// Level Up Celebration
// ---------------------------------------------------------------------------

const LevelUpCelebration: React.FC<{ level: number }> = ({ level }) => {
  const particles = useMemo(() => createFullScreenParticles(30), []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' as const }}
    >
      {/* Golden radial background glow */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at center, rgba(255,215,0,0.15) 0%, rgba(232,168,56,0.05) 40%, transparent 70%)',
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.5, 1.2], opacity: [0, 0.8, 0.6] }}
        transition={{ duration: 1, ease: 'easeOut' as const }}
      />

      {/* Dramatic light rays */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0, rotate: 0 }}
        animate={{ opacity: [0, 0.3, 0.15], rotate: 360 }}
        transition={{ duration: 8, ease: 'linear' as const, repeat: Infinity }}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              width: '2px',
              height: '50vh',
              background:
                'linear-gradient(to top, rgba(255,215,0,0.3), transparent)',
              transformOrigin: 'bottom center',
              transform: `rotate(${i * 30}deg)`,
            }}
          />
        ))}
      </motion.div>

      {/* Particles */}
      <LevelUpParticles particles={particles} />

      {/* Central text */}
      <motion.div
        className="relative flex flex-col items-center gap-4"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: 'spring' as const,
          stiffness: 150,
          damping: 12,
          delay: 0.2,
        }}
      >
        <motion.h1
          className="font-title text-5xl md:text-6xl font-bold text-golden animate-golden-glow"
          style={{
            textShadow:
              '0 0 30px rgba(232,168,56,0.8), 0 0 60px rgba(232,168,56,0.4), 0 0 90px rgba(232,168,56,0.2)',
          }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut' as const,
          }}
        >
          LEVEL UP!
        </motion.h1>

        <motion.div
          className="glass-panel rounded-2xl px-8 py-3 border border-amber-500/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4, ease: 'easeOut' as const }}
        >
          <span className="font-title text-2xl text-golden font-semibold">
            Level {level}
          </span>
        </motion.div>

        <motion.p
          className="text-amber-300/70 text-sm font-title mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.7] }}
          transition={{ delay: 0.8, duration: 1.5, ease: 'easeOut' as const }}
        >
          Weiter so, Abenteurer!
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

// ---------------------------------------------------------------------------
// Achievement Unlocked
// ---------------------------------------------------------------------------

const AchievementUnlocked: React.FC<{
  icon: string;
  name: string;
  description: string;
}> = ({ icon, name, description }) => (
  <motion.div
    className="fixed top-6 right-0 z-50 max-w-sm pointer-events-auto"
    initial={{ x: '110%', opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: '110%', opacity: 0 }}
    transition={{
      type: 'spring' as const,
      stiffness: 120,
      damping: 18,
    }}
  >
    <div className="glass-panel rounded-l-2xl p-4 pr-6 border-l-2 border-y border-amber-500/40 mr-0">
      {/* Top label */}
      <motion.div
        className="flex items-center gap-2 mb-2"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, ease: 'easeOut' as const }}
      >
        <div className="h-px flex-1 bg-gradient-to-r from-amber-500/50 to-transparent" />
        <span className="font-title text-xs text-golden uppercase tracking-widest">
          Erfolg freigeschaltet
        </span>
        <div className="h-px flex-1 bg-gradient-to-l from-amber-500/50 to-transparent" />
      </motion.div>

      {/* Achievement content */}
      <div className="flex items-center gap-3">
        <motion.div
          className="flex items-center justify-center w-12 h-12 rounded-xl shrink-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(201,168,76,0.2), rgba(232,168,56,0.1))',
            border: '1px solid rgba(201,168,76,0.3)',
            boxShadow: '0 0 15px rgba(232,168,56,0.2)',
          }}
          animate={{
            boxShadow: [
              '0 0 15px rgba(232,168,56,0.2)',
              '0 0 25px rgba(232,168,56,0.4)',
              '0 0 15px rgba(232,168,56,0.2)',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut' as const,
          }}
        >
          <span className="text-2xl">{icon}</span>
        </motion.div>

        <div className="min-w-0">
          <h3 className="font-title text-golden font-bold text-sm truncate">
            {name}
          </h3>
          <p className="text-amber-200/60 text-xs mt-0.5 line-clamp-2">
            {description}
          </p>
        </div>
      </div>

      {/* Ornamental bottom line */}
      <div className="flex items-center justify-center gap-1 mt-3 opacity-30">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
        <svg width="8" height="8" viewBox="0 0 8 8" className="text-amber-500" aria-hidden="true">
          <path d="M4 0 L8 4 L4 8 L0 4 Z" fill="currentColor" />
        </svg>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
      </div>
    </div>
  </motion.div>
);

// ---------------------------------------------------------------------------
// Wisdom Card Found
// ---------------------------------------------------------------------------

const WisdomCardFound: React.FC<{ text: string }> = ({ text }) => (
  <motion.div
    className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3, ease: 'easeOut' as const }}
  >
    {/* Dimmed backdrop */}
    <motion.div
      className="absolute inset-0 bg-black/40"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    />

    {/* Card with flip animation */}
    <motion.div
      className="relative"
      style={{ perspective: '1000px' }}
    >
      <motion.div
        className="relative"
        initial={{ rotateY: 180, scale: 0.5, opacity: 0 }}
        animate={{ rotateY: 0, scale: 1, opacity: 1 }}
        exit={{ rotateY: -90, scale: 0.8, opacity: 0 }}
        transition={{
          type: 'spring' as const,
          stiffness: 100,
          damping: 15,
          delay: 0.1,
        }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div
          className="glass-panel rounded-2xl p-6 max-w-xs text-center border border-amber-500/30"
          style={{
            boxShadow:
              '0 0 30px rgba(232,168,56,0.2), 0 0 60px rgba(232,168,56,0.1)',
          }}
        >
          {/* Top ornament */}
          <motion.div
            className="flex items-center justify-center mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-500/50" />
            <span className="font-title text-xs text-golden uppercase tracking-widest mx-3">
              Weisheitskarte
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-500/50" />
          </motion.div>

          {/* Card icon */}
          <motion.div
            className="text-4xl mb-4"
            animate={{
              filter: [
                'drop-shadow(0 0 8px rgba(255,215,0,0.3))',
                'drop-shadow(0 0 16px rgba(255,215,0,0.6))',
                'drop-shadow(0 0 8px rgba(255,215,0,0.3))',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut' as const,
            }}
          >
            &#x1F4DC;
          </motion.div>

          {/* Wisdom text */}
          <motion.p
            className="font-title text-golden text-base leading-relaxed italic"
            style={{
              textShadow: '0 0 10px rgba(232,168,56,0.2)',
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5, ease: 'easeOut' as const }}
          >
            &ldquo;{text}&rdquo;
          </motion.p>

          {/* Bottom ornament */}
          <div className="flex items-center justify-center gap-1 mt-4 opacity-40">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
            <svg width="6" height="6" viewBox="0 0 8 8" className="text-amber-500" aria-hidden="true">
              <path d="M4 0 L8 4 L4 8 L0 4 Z" fill="currentColor" />
            </svg>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  </motion.div>
);

// ---------------------------------------------------------------------------
// Island Unlocked Celebration
// ---------------------------------------------------------------------------

const ISLAND_EMOJIS: Record<string, string> = {
  volcano: '\u{1F30B}',
  ocean: '\u{1F30A}',
  forest: '\u{1F332}',
  mountain: '\u26F0\uFE0F',
  garden: '\u{1F33A}',
  night: '\u{1F319}',
  rainbow: '\u{1F308}',
  home: '\u{1F3E0}',
};

const IslandUnlockedCelebration: React.FC<{
  islandId: string;
  islandName: string;
}> = ({ islandId, islandName }) => {
  const particles = useMemo(() => createFullScreenParticles(20), []);
  const emoji = ISLAND_EMOJIS[islandId] || '\u{1F3DD}\uFE0F';

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' as const }}
    >
      {/* Dramatic radial glow */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at center, rgba(108,92,231,0.2) 0%, rgba(45,27,78,0.1) 40%, transparent 70%)',
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.5, 1.2], opacity: [0, 0.8, 0.6] }}
        transition={{ duration: 1, ease: 'easeOut' as const }}
      />

      {/* Sparkle particles */}
      <LevelUpParticles particles={particles} />

      {/* Central content */}
      <motion.div
        className="relative flex flex-col items-center gap-4"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: 'spring' as const,
          stiffness: 150,
          damping: 12,
          delay: 0.15,
        }}
      >
        {/* Rotating glow ring */}
        <motion.div
          className="absolute"
          style={{
            width: '160px',
            height: '160px',
            borderRadius: '50%',
            border: '2px solid rgba(201,168,76,0.3)',
            boxShadow: '0 0 30px rgba(108,92,231,0.3), inset 0 0 30px rgba(108,92,231,0.15)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        />

        {/* Island emoji with pulsing glow */}
        <motion.div
          className="text-7xl"
          animate={{
            scale: [1, 1.15, 1],
            filter: [
              'drop-shadow(0 0 10px rgba(108,92,231,0.4))',
              'drop-shadow(0 0 25px rgba(108,92,231,0.7))',
              'drop-shadow(0 0 10px rgba(108,92,231,0.4))',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' as const }}
        >
          {emoji}
        </motion.div>

        {/* Title */}
        <motion.div
          className="text-center mt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <p
            className="font-title text-xs uppercase tracking-[0.3em] mb-1"
            style={{ color: 'rgba(201,168,76,0.7)' }}
          >
            Neue Insel entdeckt
          </p>
          <h2
            className="font-title text-3xl font-bold"
            style={{
              color: '#ffd700',
              textShadow: '0 0 20px rgba(255,215,0,0.4), 0 0 40px rgba(108,92,231,0.3)',
            }}
          >
            {islandName}
          </h2>
        </motion.div>

        {/* Glass panel with description */}
        <motion.div
          className="glass-panel rounded-xl px-6 py-3 border border-purple-500/30 mt-2"
          style={{ boxShadow: '0 0 20px rgba(108,92,231,0.2)' }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <p className="text-amber-200/80 text-sm text-center font-title">
            Eine neue Welt wartet auf dich!
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// ---------------------------------------------------------------------------
// Streak Milestone
// ---------------------------------------------------------------------------

const StreakMilestone: React.FC<{ count: number }> = ({ count }) => {
  const particles = useMemo(() => createParticles(12, 60), []);

  return (
    <motion.div
      className="fixed top-20 left-1/2 z-50 pointer-events-none"
      initial={{ opacity: 0, y: 30, x: '-50%', scale: 0.8 }}
      animate={{ opacity: 1, y: 0, x: '-50%', scale: 1 }}
      exit={{ opacity: 0, y: -40, x: '-50%', scale: 0.9 }}
      transition={{
        type: 'spring' as const,
        stiffness: 180,
        damping: 18,
      }}
    >
      <div className="relative">
        <FireParticles particles={particles} />

        <div
          className="glass-panel rounded-2xl px-6 py-3 border border-orange-500/30"
          style={{
            boxShadow:
              '0 0 20px rgba(255,69,0,0.2), 0 0 40px rgba(255,69,0,0.1)',
          }}
        >
          <motion.div
            className="flex items-center gap-2"
            animate={{
              filter: [
                'drop-shadow(0 0 4px rgba(255,69,0,0.3))',
                'drop-shadow(0 0 12px rgba(255,69,0,0.6))',
                'drop-shadow(0 0 4px rgba(255,69,0,0.3))',
              ],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut' as const,
            }}
          >
            <span className="text-2xl">&#x1F525;</span>
            <span
              className="font-title text-lg font-bold"
              style={{
                background:
                  'linear-gradient(135deg, #ff4500, #ffa500, #ffd700)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {count}er Serie!
            </span>
            <span className="text-2xl">&#x1F525;</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// ---------------------------------------------------------------------------
// Combo Indicator
// ---------------------------------------------------------------------------

const ComboIndicator: React.FC<{ multiplier: number }> = ({ multiplier }) => (
  <motion.div
    className="fixed bottom-6 right-6 z-40 pointer-events-none"
    initial={{ opacity: 0, scale: 0, x: 20 }}
    animate={{ opacity: 1, scale: 1, x: 0 }}
    exit={{ opacity: 0, scale: 0, x: 20 }}
    transition={{
      type: 'spring' as const,
      stiffness: 200,
      damping: 15,
    }}
  >
    <motion.div
      className="glass-panel rounded-xl px-4 py-2 border border-amber-500/25"
      animate={{
        boxShadow: [
          '0 0 10px rgba(232,168,56,0.15)',
          '0 0 20px rgba(232,168,56,0.3)',
          '0 0 10px rgba(232,168,56,0.15)',
        ],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut' as const,
      }}
    >
      <div className="flex items-center gap-2">
        <motion.span
          className="text-lg"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut' as const,
          }}
        >
          &#x26A1;
        </motion.span>
        <span className="font-title text-golden text-sm font-bold">
          {multiplier.toFixed(1)}x Combo
        </span>
      </div>
    </motion.div>
  </motion.div>
);

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

const RewardPopup: React.FC<RewardPopupProps> = ({
  lastEvent,
  comboMultiplier,
}) => {
  const [activeEvent, setActiveEvent] = useState<RewardEvent | null>(null);
  const dismissTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearDismissTimer = useCallback(() => {
    if (dismissTimerRef.current !== null) {
      clearTimeout(dismissTimerRef.current);
      dismissTimerRef.current = null;
    }
  }, []);

  // React to new events
  useEffect(() => {
    if (!lastEvent) return;

    clearDismissTimer();
    setActiveEvent(lastEvent);

    // Auto-dismiss durations based on event type
    const durations: Record<string, number> = {
      [EVENT_LEVEL_UP]: 3500,
      [EVENT_ACHIEVEMENT]: 4500,
      [EVENT_WISDOM_CARD]: 4000,
      [EVENT_STREAK]: 3000,
      [EVENT_ISLAND_UNLOCKED]: 4000,
    };

    const duration = durations[lastEvent.type] ?? 2500;

    dismissTimerRef.current = setTimeout(() => {
      setActiveEvent(null);
    }, duration);

    return clearDismissTimer;
  }, [lastEvent, clearDismissTimer]);

  // Extract event data safely
  const eventData = activeEvent?.data as Record<string, unknown> | undefined;

  return (
    <>
      <AnimatePresence mode="wait">
        {/* Level Up */}
        {activeEvent?.type === EVENT_LEVEL_UP && (
          <LevelUpCelebration
            key={`level-${activeEvent.timestamp}`}
            level={(eventData?.level as number) ?? 1}
          />
        )}

        {/* Achievement */}
        {activeEvent?.type === EVENT_ACHIEVEMENT && (
          <AchievementUnlocked
            key={`ach-${activeEvent.timestamp}`}
            icon={'\u{1F3C6}'}
            name={(eventData?.name as string) ?? 'Erfolg'}
            description={(eventData?.id as string) ?? ''}
          />
        )}

        {/* Wisdom Card */}
        {activeEvent?.type === EVENT_WISDOM_CARD && (
          <WisdomCardFound
            key={`wisdom-${activeEvent.timestamp}`}
            text={(eventData?.cardId as string) ?? 'Eine neue Weisheit wurde entdeckt!'}
          />
        )}

        {/* Streak */}
        {activeEvent?.type === EVENT_STREAK && (
          <StreakMilestone
            key={`streak-${activeEvent.timestamp}`}
            count={(eventData?.streak as number) ?? 3}
          />
        )}

        {/* Island Unlocked */}
        {activeEvent?.type === EVENT_ISLAND_UNLOCKED && (
          <IslandUnlockedCelebration
            key={`island-${activeEvent.timestamp}`}
            islandId={(eventData?.islandId as string) ?? ''}
            islandName={(eventData?.islandName as string) ?? 'Neue Insel'}
          />
        )}
      </AnimatePresence>

      {/* Combo Indicator - persistent when multiplier > 1 */}
      <AnimatePresence>
        {comboMultiplier > 1 && (
          <ComboIndicator
            key="combo"
            multiplier={comboMultiplier}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default RewardPopup;
