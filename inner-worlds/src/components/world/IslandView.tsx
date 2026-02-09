// @ts-nocheck
import { useState, useCallback, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useGameStore } from '../../stores/gameStore';
import IslandExplorer from './IslandExplorer';
import { MiniGameModal } from '../games/MiniGames';
import type { GameType } from '../games/MiniGames';
import type { IslandId } from '../../types';
import SOSButton from '../common/SOSButton';
import CompanionWidget from '../common/CompanionWidget';

// ---------------------------------------------------------------------------
// Island metadata for cinematic intro
// ---------------------------------------------------------------------------

const ISLAND_INTRO: Record<string, {
  emoji: string;
  title: string;
  subtitle: string;
  theme: string;
  gradient: string;
  particleColor: string;
}> = {
  volcano: {
    emoji: '\u{1F30B}',
    title: 'Vulkaninsel',
    subtitle: 'Lerne die Sprache der Wut',
    theme: 'Wut & Emotionsregulation',
    gradient: 'radial-gradient(ellipse at 50% 80%, rgba(255,80,20,0.4) 0%, rgba(180,40,0,0.2) 30%, transparent 70%)',
    particleColor: '#ff6b35',
  },
  ocean: {
    emoji: '\u{1F30A}',
    title: 'Ozeaninsel',
    subtitle: 'Tauche in die Tiefe der Gef\u00FChle',
    theme: 'Trauer & Verlust',
    gradient: 'radial-gradient(ellipse at 50% 80%, rgba(0,100,200,0.4) 0%, rgba(0,50,120,0.2) 30%, transparent 70%)',
    particleColor: '#74b9ff',
  },
  forest: {
    emoji: '\u{1F332}',
    title: 'Waldinsel',
    subtitle: 'Finde Mut im Dunkel',
    theme: 'Angst & Mut',
    gradient: 'radial-gradient(ellipse at 50% 80%, rgba(0,150,60,0.4) 0%, rgba(0,80,30,0.2) 30%, transparent 70%)',
    particleColor: '#55efc4',
  },
  mountain: {
    emoji: '\u{26F0}\u{FE0F}',
    title: 'Berginsel',
    subtitle: 'Erklimme deinen inneren Gipfel',
    theme: 'Selbstwert & Identit\u00E4t',
    gradient: 'radial-gradient(ellipse at 50% 80%, rgba(160,140,200,0.4) 0%, rgba(100,80,150,0.2) 30%, transparent 70%)',
    particleColor: '#a29bfe',
  },
  garden: {
    emoji: '\u{1F33A}',
    title: 'Garteninsel',
    subtitle: 'Pflege die Wurzeln deiner Beziehungen',
    theme: 'Beziehungen & Vertrauen',
    gradient: 'radial-gradient(ellipse at 50% 80%, rgba(255,150,200,0.4) 0%, rgba(200,80,140,0.2) 30%, transparent 70%)',
    particleColor: '#fd79a8',
  },
  night: {
    emoji: '\u{1F303}',
    title: 'Nachtinsel',
    subtitle: 'Entdecke die Stille in dir',
    theme: 'Achtsamkeit & digitale Balance',
    gradient: 'radial-gradient(ellipse at 50% 80%, rgba(80,60,180,0.4) 0%, rgba(40,20,100,0.2) 30%, transparent 70%)',
    particleColor: '#6c5ce7',
  },
  rainbow: {
    emoji: '\u{1F308}',
    title: 'Regenbogeninsel',
    subtitle: 'Feiere die Vielfalt des Lebens',
    theme: 'Diversit\u00E4t & Inklusion',
    gradient: 'radial-gradient(ellipse at 50% 80%, rgba(255,200,0,0.4) 0%, rgba(255,100,50,0.2) 30%, transparent 70%)',
    particleColor: '#ffeaa7',
  },
  home: {
    emoji: '\u{1F3E0}',
    title: 'Heimatinsel',
    subtitle: 'Bringe alles zusammen',
    theme: 'Integration & Transfer',
    gradient: 'radial-gradient(ellipse at 50% 80%, rgba(201,168,76,0.4) 0%, rgba(150,120,50,0.2) 30%, transparent 70%)',
    particleColor: '#ffd700',
  },
};

// ---------------------------------------------------------------------------
// Cinematic intro overlay
// ---------------------------------------------------------------------------

function IslandIntroCinematic({
  islandId,
  onComplete,
}: {
  islandId: string;
  onComplete: () => void;
}) {
  const info = ISLAND_INTRO[islandId] || ISLAND_INTRO.volcano;
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    timerRef.current = setTimeout(onComplete, 4500);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [onComplete]);

  // Generate floating particles
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 2 + Math.random() * 4,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 4,
  }));

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      onClick={onComplete}
      style={{
        background: `
          ${info.gradient},
          radial-gradient(ellipse 80% 60% at 50% 40%, rgba(45,27,78,0.8) 0%, transparent 70%),
          linear-gradient(180deg, #0d0d1a 0%, #1a0a2e 40%, #0d0d1a 100%)
        `,
        cursor: 'pointer',
      }}
    >
      {/* Floating particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: info.particleColor,
            boxShadow: `0 0 ${p.size * 3}px ${info.particleColor}`,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: [0, 0.8, 0],
            y: [20, -40, -80],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)',
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Island emoji with glow */}
        <motion.div
          className="text-8xl mb-6 select-none"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, type: 'spring', bounce: 0.3 }}
          style={{
            filter: `drop-shadow(0 0 30px ${info.particleColor}) drop-shadow(0 0 60px ${info.particleColor}40)`,
          }}
        >
          {info.emoji}
        </motion.div>

        {/* Title */}
        <motion.h1
          className="font-title text-5xl md:text-6xl font-bold mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            color: '#ffd700',
            textShadow: `0 0 30px rgba(255,215,0,0.4), 0 0 60px rgba(255,215,0,0.15)`,
            letterSpacing: '0.1em',
          }}
        >
          {info.title}
        </motion.h1>

        {/* Golden divider */}
        <motion.div
          className="flex items-center gap-3 my-4"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          style={{ width: '280px' }}
        >
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.6))' }} />
          <span style={{ color: 'rgba(201,168,76,0.8)', fontSize: '8px' }}>{'\u25C6'}</span>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(270deg, transparent, rgba(201,168,76,0.6))' }} />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-xl md:text-2xl mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          style={{
            color: '#e8d5a3',
            textShadow: '0 0 15px rgba(232,168,56,0.3)',
            letterSpacing: '0.08em',
          }}
        >
          {info.subtitle}
        </motion.p>

        {/* Theme tag */}
        <motion.div
          className="mt-4 px-5 py-2 rounded-full text-sm"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          style={{
            background: 'rgba(201,168,76,0.1)',
            border: '1px solid rgba(201,168,76,0.3)',
            color: 'rgba(201,168,76,0.8)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            fontSize: '0.75rem',
          }}
        >
          {info.theme}
        </motion.div>

        {/* Skip hint */}
        <motion.p
          className="mt-10 text-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 2.5, duration: 0.5 }}
          style={{ color: '#c9a84c' }}
        >
          Klicke, um fortzufahren
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function IslandView() {
  const {
    activeIsland,
    islands,
    setScreen,
    setActiveIsland,
    addXP,
  } = useGameStore();

  const [activeMiniGame, setActiveMiniGame] = useState<GameType | null>(null);
  const [showIntro, setShowIntro] = useState(true);

  const island = islands.find((i) => i.id === activeIsland);
  if (!island) return null;

  const handleBack = useCallback(() => {
    setActiveIsland(null);
    setScreen('island-map');
  }, [setActiveIsland, setScreen]);

  const handleStartMiniGame = useCallback((gameType: string) => {
    setActiveMiniGame(gameType as GameType);
  }, []);

  const handleMiniGameClose = useCallback(() => {
    setActiveMiniGame(null);
  }, []);

  const handleMiniGameComplete = useCallback(
    (xpEarned: number) => {
      addXP(xpEarned);
      setActiveMiniGame(null);
    },
    [addXP],
  );

  const handleIntroDone = useCallback(() => {
    setShowIntro(false);
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden relative bg-[#0d0d1a]">
      {/* Main 3D exploration view */}
      <IslandExplorer
        onStartMiniGame={handleStartMiniGame}
        onBack={handleBack}
      />

      {/* Island intro cinematic overlay */}
      <AnimatePresence>
        {showIntro && activeIsland && (
          <IslandIntroCinematic
            islandId={activeIsland}
            onComplete={handleIntroDone}
          />
        )}
      </AnimatePresence>

      {/* Mini-game overlay */}
      <AnimatePresence>
        {activeMiniGame && (
          <MiniGameModal
            gameType={activeMiniGame}
            islandId={island.id as IslandId}
            onClose={handleMiniGameClose}
            onComplete={handleMiniGameComplete}
          />
        )}
      </AnimatePresence>

      <CompanionWidget />
      <SOSButton />
    </div>
  );
}
