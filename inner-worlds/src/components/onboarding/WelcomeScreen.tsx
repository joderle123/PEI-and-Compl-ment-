import { motion } from 'framer-motion';
import { useGameStore } from '../../stores/gameStore';
import type { GameScreen } from '../../types';

// ---------------------------------------------------------------------------
// Floating Island component for background decoration
// ---------------------------------------------------------------------------

interface FloatingIslandProps {
  emoji: string;
  size: string;
  top: string;
  left: string;
  delay: number;
  duration: number;
}

const FloatingIsland = ({ emoji, size, top, left, delay, duration }: FloatingIslandProps) => (
  <motion.div
    className="absolute select-none pointer-events-none"
    style={{ top, left, fontSize: size }}
    animate={{
      y: [0, -18, 0],
      rotate: [0, 3, -3, 0],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  >
    {emoji}
  </motion.div>
);

// ---------------------------------------------------------------------------
// Sparkle particle for extra magic
// ---------------------------------------------------------------------------

const Sparkle = ({ delay, left, top }: { delay: number; left: string; top: string }) => (
  <motion.div
    className="absolute text-xl pointer-events-none select-none"
    style={{ left, top }}
    animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
    transition={{ duration: 2.5, delay, repeat: Infinity, ease: 'easeInOut' }}
  >
    ✨
  </motion.div>
);

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

  return (
    <div className="relative h-full w-full overflow-hidden flex flex-col items-center justify-center bg-gradient-to-b from-primary-light via-primary to-secondary">
      {/* --- Background floating islands --- */}
      <FloatingIsland emoji="🏝️" size="3rem" top="8%" left="10%" delay={0} duration={4} />
      <FloatingIsland emoji="🌋" size="2.5rem" top="15%" left="78%" delay={0.5} duration={5} />
      <FloatingIsland emoji="🌿" size="2.8rem" top="60%" left="5%" delay={1} duration={4.5} />
      <FloatingIsland emoji="🌊" size="2.2rem" top="70%" left="85%" delay={1.5} duration={3.8} />
      <FloatingIsland emoji="🏔️" size="2.6rem" top="25%" left="88%" delay={0.8} duration={4.2} />
      <FloatingIsland emoji="🌸" size="2rem" top="80%" left="20%" delay={2} duration={5.2} />
      <FloatingIsland emoji="🌈" size="2.4rem" top="12%" left="45%" delay={0.3} duration={4.8} />
      <FloatingIsland emoji="🏠" size="2rem" top="55%" left="90%" delay={1.2} duration={3.5} />

      {/* --- Sparkles --- */}
      <Sparkle delay={0} left="20%" top="30%" />
      <Sparkle delay={0.7} left="75%" top="45%" />
      <Sparkle delay={1.4} left="40%" top="20%" />
      <Sparkle delay={2.1} left="60%" top="75%" />
      <Sparkle delay={0.4} left="85%" top="25%" />

      {/* --- Radial glow behind title --- */}
      <div className="absolute w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />

      {/* --- Content --- */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Game title */}
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold text-white tracking-wide drop-shadow-lg"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          INNER WORLDS
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mt-3 text-xl md:text-2xl font-semibold text-white/90 drop-shadow"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Entdecke deine Superkr&auml;fte
        </motion.p>

        {/* Decorative divider */}
        <motion.div
          className="mt-6 w-24 h-1 rounded-full bg-white/50"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        />

        {/* Description */}
        <motion.p
          className="mt-6 text-base md:text-lg text-white/85 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          Eine Reise zu deinen inneren St&auml;rken. Entdecke 8 magische Inseln
          und lerne deine Superkr&auml;fte kennen.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="mt-10 flex flex-col gap-4 w-full"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.button
            onClick={handleNewJourney}
            className="w-full py-4 px-8 rounded-2xl bg-white text-primary font-bold text-lg shadow-lg hover:shadow-xl cursor-pointer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Neue Reise beginnen
          </motion.button>

          {onboardingComplete && (
            <motion.button
              onClick={handleContinue}
              className="w-full py-4 px-8 rounded-2xl bg-white/20 backdrop-blur-sm text-white font-bold text-lg border-2 border-white/40 hover:bg-white/30 cursor-pointer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.5 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Reise fortsetzen
            </motion.button>
          )}
        </motion.div>

        {/* Version / footer */}
        <motion.p
          className="mt-12 text-xs text-white/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.8 }}
        >
          Inner Worlds &mdash; Social-Emotional Learning Game
        </motion.p>
      </motion.div>
    </div>
  );
};

export default WelcomeScreen;
