// @ts-nocheck
import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useGameStore } from '../../stores/gameStore';
import IslandExplorer from './IslandExplorer';
import { MiniGameModal } from '../games/MiniGames';
import type { GameType } from '../games/MiniGames';
import type { IslandId } from '../../types';
import SOSButton from '../common/SOSButton';
import CompanionWidget from '../common/CompanionWidget';
import islandStories from '../../data/islandStories';

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
// Story-driven cinematic intro overlay
// ---------------------------------------------------------------------------

function IslandIntroCinematic({
  islandId,
  currentChapter,
  onComplete,
}: {
  islandId: string;
  currentChapter: number;
  onComplete: () => void;
}) {
  const info = ISLAND_INTRO[islandId] || ISLAND_INTRO.volcano;
  const story = islandStories[islandId];
  const [introPage, setIntroPage] = useState(0);

  // Page 0 = title + mystery hook, Page 1 = chapter intro
  const totalPages = 2;

  const handleNext = useCallback(() => {
    if (introPage < totalPages - 1) {
      setIntroPage((p) => p + 1);
    } else {
      onComplete();
    }
  }, [introPage, onComplete]);

  // Generate floating particles
  const particles = useMemo(() => Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 2 + Math.random() * 4,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 4,
  })), []);

  const chapterIntro = story?.chapterIntros?.[currentChapter - 1] || '';
  const mysteryHook = story?.hook || info.subtitle;
  const mysteryTitle = story?.mysteryTitle || '';

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      style={{
        background: `
          ${info.gradient},
          radial-gradient(ellipse 80% 60% at 50% 40%, rgba(45,27,78,0.8) 0%, transparent 70%),
          linear-gradient(180deg, #0d0d1a 0%, #1a0a2e 40%, #0d0d1a 100%)
        `,
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
      <AnimatePresence mode="wait">
        {introPage === 0 ? (
          /* Page 1: Title + Mystery Hook */
          <motion.div
            key="page-title"
            className="relative z-10 flex flex-col items-center text-center px-8 max-w-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
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
              className="font-title text-4xl md:text-5xl font-bold mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              style={{
                color: '#ffd700',
                textShadow: '0 0 30px rgba(255,215,0,0.4), 0 0 60px rgba(255,215,0,0.15)',
                letterSpacing: '0.1em',
              }}
            >
              {info.title}
            </motion.h1>

            {/* Mystery title */}
            {mysteryTitle && (
              <motion.p
                className="text-lg md:text-xl mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                style={{
                  color: '#e8d5a3',
                  textShadow: '0 0 15px rgba(232,168,56,0.3)',
                  letterSpacing: '0.06em',
                  fontStyle: 'italic',
                }}
              >
                &laquo; {mysteryTitle} &raquo;
              </motion.p>
            )}

            {/* Golden divider */}
            <motion.div
              className="flex items-center gap-3 my-3"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              style={{ width: '260px' }}
            >
              <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.6))' }} />
              <span style={{ color: 'rgba(201,168,76,0.8)', fontSize: '8px' }}>{'\u25C6'}</span>
              <div style={{ flex: 1, height: '1px', background: 'linear-gradient(270deg, transparent, rgba(201,168,76,0.6))' }} />
            </motion.div>

            {/* Mystery hook */}
            <motion.p
              className="text-sm md:text-base mb-6 max-w-md"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              style={{
                color: '#e0d8c8',
                lineHeight: 1.8,
                textShadow: '0 1px 4px rgba(0,0,0,0.5)',
              }}
            >
              {mysteryHook}
            </motion.p>

            {/* Chapter badge */}
            <motion.div
              className="flex items-center gap-2 px-5 py-2 rounded-full text-sm mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.5 }}
              style={{
                background: 'rgba(201,168,76,0.1)',
                border: '1px solid rgba(201,168,76,0.3)',
                color: 'rgba(201,168,76,0.8)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontSize: '0.75rem',
              }}
            >
              <span>{'\u{1F4D6}'}</span> Kapitel {currentChapter} von 4
            </motion.div>

            {/* Continue button */}
            <motion.button
              className="glass-panel ornate-border cursor-pointer px-8 py-3 rounded-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
              onClick={handleNext}
              style={{
                borderColor: 'rgba(201,168,76,0.5)',
                color: '#f0c674',
                fontFamily: 'var(--font-title)',
                fontSize: '1rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textShadow: '0 0 12px rgba(232,168,56,0.3)',
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 20px rgba(201,168,76,0.25)',
                borderColor: 'rgba(201,168,76,0.8)',
              }}
              whileTap={{ scale: 0.97 }}
            >
              Weiter
            </motion.button>
          </motion.div>
        ) : (
          /* Page 2: Chapter intro */
          <motion.div
            key="page-chapter"
            className="relative z-10 flex flex-col items-center text-center px-8 max-w-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Chapter number */}
            <motion.div
              className="mb-4 px-6 py-2 rounded-full"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{
                background: `linear-gradient(135deg, ${info.particleColor}20, ${info.particleColor}08)`,
                border: `1px solid ${info.particleColor}40`,
                color: info.particleColor,
                fontSize: '0.85rem',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}
            >
              Kapitel {currentChapter}: {currentChapter === 1 ? 'Erkennen' : currentChapter === 2 ? 'Verstehen' : currentChapter === 3 ? 'Handeln' : 'Meistern'}
            </motion.div>

            {/* Chapter intro text */}
            <motion.div
              className="overflow-y-auto max-h-[50vh] px-2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(201,168,76,0.3) transparent',
              }}
            >
              <p
                style={{
                  color: '#e0d8c8',
                  lineHeight: 1.9,
                  fontSize: 'clamp(0.88rem, 2.3vw, 1rem)',
                  textShadow: '0 1px 4px rgba(0,0,0,0.5)',
                  textAlign: 'left',
                }}
              >
                {chapterIntro}
              </p>
            </motion.div>

            {/* Divider */}
            <motion.div
              className="flex items-center gap-3 my-6"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              style={{ width: '180px' }}
            >
              <div style={{ flex: 1, height: '1px', background: `linear-gradient(90deg, transparent, ${info.particleColor}60)` }} />
              <span style={{ color: `${info.particleColor}80`, fontSize: '6px' }}>{'\u25C6'}</span>
              <div style={{ flex: 1, height: '1px', background: `linear-gradient(270deg, transparent, ${info.particleColor}60)` }} />
            </motion.div>

            {/* Start exploring button */}
            <motion.button
              className="glass-panel ornate-border cursor-pointer px-8 py-3 rounded-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              onClick={onComplete}
              style={{
                borderColor: `${info.particleColor}80`,
                color: '#f0c674',
                fontFamily: 'var(--font-title)',
                fontSize: '1.05rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textShadow: '0 0 12px rgba(232,168,56,0.3)',
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: `0 0 20px ${info.particleColor}40`,
                borderColor: `${info.particleColor}`,
              }}
              whileTap={{ scale: 0.97 }}
            >
              {'\u{1F9ED}'} Insel erkunden
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {Array.from({ length: totalPages }, (_, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-500"
            style={{
              width: i === introPage ? '20px' : '8px',
              height: '8px',
              background: i === introPage
                ? `linear-gradient(90deg, ${info.particleColor}, #ffd700)`
                : i < introPage
                  ? `${info.particleColor}80`
                  : 'rgba(255,255,255,0.15)',
              boxShadow: i === introPage ? `0 0 8px ${info.particleColor}60` : 'none',
            }}
          />
        ))}
      </div>
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
    islandProgress,
    startMystery,
  } = useGameStore();

  const [activeMiniGame, setActiveMiniGame] = useState<GameType | null>(null);
  const [showIntro, setShowIntro] = useState(true);

  const island = islands.find((i) => i.id === activeIsland);
  if (!island) return null;

  const progress = islandProgress?.find((ip) => ip.islandId === activeIsland) || { currentChapter: 1, mysteryStarted: false };

  // Auto-start mystery when entering island for the first time
  useEffect(() => {
    if (activeIsland && !progress.mysteryStarted) {
      startMystery(activeIsland);
    }
  }, [activeIsland, progress.mysteryStarted, startMystery]);

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
            currentChapter={progress.currentChapter}
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
