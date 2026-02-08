import {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { IslandId } from '../../types';

// =============================================================================
// Constants
// =============================================================================

const GAME_TYPES = {
  Memory: 'memory',
  Catcher: 'catcher',
  Sorter: 'sorter',
} as const;

/** Union of valid game type strings */
export type GameType = (typeof GAME_TYPES)[keyof typeof GAME_TYPES];

// =============================================================================
// Island-themed data
// =============================================================================

const MEMORY_CARDS: Record<IslandId, string[]> = {
  volcano:   ['😤', '😡', '🔥', '💢', '🌋', '😤', '😡', '🔥'],
  ocean:     ['😢', '😞', '🌊', '💧', '🐚', '😢', '😞', '🌊'],
  forest:    ['😰', '🦁', '🌲', '🍄', '🦊', '😰', '🦁', '🌲'],
  mountain:  ['💪', '⛰️', '👑', '🌟', '💎', '💪', '⛰️', '👑'],
  garden:    ['🤝', '💕', '🌸', '🦋', '🌈', '🤝', '💕', '🌸'],
  night:     ['🧘', '✨', '🌙', '🕯️', '🦉', '🧘', '✨', '🌙'],
  rainbow:   ['🌈', '🎨', '🎭', '🎪', '💎', '🌈', '🎨', '🎭'],
  home:      ['🏠', '❤️', '🫂', '🕊️', '🔑', '🏠', '❤️', '🫂'],
};

interface CatcherTheme {
  good: string;
  bad: string;
  goodLabel: string;
  badLabel: string;
}

const CATCHER_THEMES: Record<IslandId, CatcherTheme> = {
  volcano:  { good: '💧', bad: '🔥', goodLabel: 'Wassertropfen', badLabel: 'Feuerbälle' },
  ocean:    { good: '⭐', bad: '🌊', goodLabel: 'Hoffnungssterne', badLabel: 'Riesenwellen' },
  forest:   { good: '🌟', bad: '👻', goodLabel: 'Mutsterne', badLabel: 'Schattenängste' },
  mountain: { good: '💎', bad: '🪨', goodLabel: 'Vertrauensedelsteine', badLabel: 'Felsbrocken' },
  garden:   { good: '🌸', bad: '🌵', goodLabel: 'Freundschaftsblumen', badLabel: 'Dornen' },
  night:    { good: '🌙', bad: '⚡', goodLabel: 'Ruhe-Monde', badLabel: 'Stressblitze' },
  rainbow:  { good: '🎨', bad: '⬛', goodLabel: 'Farben', badLabel: 'Graue Blöcke' },
  home:     { good: '❤️', bad: '💔', goodLabel: 'Herzen', badLabel: 'Zerbrochene Herzen' },
};

interface SorterTheme {
  leftLabel: string;
  rightLabel: string;
  items: { text: string; correct: 'left' | 'right' }[];
}

const SORTER_THEMES: Record<IslandId, SorterTheme> = {
  volcano: {
    leftLabel: 'Gesund',
    rightLabel: 'Ungesund',
    items: [
      { text: 'Tief atmen', correct: 'left' },
      { text: 'Spazieren gehen', correct: 'left' },
      { text: 'Darüber reden', correct: 'left' },
      { text: 'Sport machen', correct: 'left' },
      { text: 'Bis 10 zählen', correct: 'left' },
      { text: 'Schreien', correct: 'right' },
      { text: 'Dinge werfen', correct: 'right' },
      { text: 'Andere beschuldigen', correct: 'right' },
      { text: 'Türen knallen', correct: 'right' },
      { text: 'Beleidigungen sagen', correct: 'right' },
    ],
  },
  ocean: {
    leftLabel: 'Hilft',
    rightLabel: 'Hilft nicht',
    items: [
      { text: 'Mit Freunden reden', correct: 'left' },
      { text: 'Tagebuch schreiben', correct: 'left' },
      { text: 'Weinen zulassen', correct: 'left' },
      { text: 'Musik hören', correct: 'left' },
      { text: 'Um Hilfe bitten', correct: 'left' },
      { text: 'Gefühle unterdrücken', correct: 'right' },
      { text: 'Sich isolieren', correct: 'right' },
      { text: 'So tun als ob alles ok ist', correct: 'right' },
      { text: 'Andere anschreien', correct: 'right' },
      { text: 'Aufgeben', correct: 'right' },
    ],
  },
  forest: {
    leftLabel: 'Mut',
    rightLabel: 'Vermeidung',
    items: [
      { text: 'Neues ausprobieren', correct: 'left' },
      { text: 'Um Hilfe bitten', correct: 'left' },
      { text: 'Fehler akzeptieren', correct: 'left' },
      { text: 'Ehrlich sein', correct: 'left' },
      { text: 'Für andere einstehen', correct: 'left' },
      { text: 'Sich verstecken', correct: 'right' },
      { text: 'Immer ja sagen', correct: 'right' },
      { text: 'Probleme ignorieren', correct: 'right' },
      { text: 'Ausreden erfinden', correct: 'right' },
      { text: 'Nie Risiken eingehen', correct: 'right' },
    ],
  },
  mountain: {
    leftLabel: 'Stärkt mich',
    rightLabel: 'Schwächt mich',
    items: [
      { text: 'An mich glauben', correct: 'left' },
      { text: 'Aus Fehlern lernen', correct: 'left' },
      { text: 'Mich selbst loben', correct: 'left' },
      { text: 'Ziele setzen', correct: 'left' },
      { text: 'Dankbar sein', correct: 'left' },
      { text: 'Mich vergleichen', correct: 'right' },
      { text: 'Perfekt sein wollen', correct: 'right' },
      { text: 'Mich selbst beleidigen', correct: 'right' },
      { text: 'Immer anderen gefallen', correct: 'right' },
      { text: 'Aufgeben bei Schwierigkeiten', correct: 'right' },
    ],
  },
  garden: {
    leftLabel: 'Empathisch',
    rightLabel: 'Nicht empathisch',
    items: [
      { text: 'Aktiv zuhören', correct: 'left' },
      { text: 'Gefühle anderer respektieren', correct: 'left' },
      { text: 'Trösten', correct: 'left' },
      { text: 'Sich entschuldigen', correct: 'left' },
      { text: 'Perspektive wechseln', correct: 'left' },
      { text: 'Auslachen', correct: 'right' },
      { text: 'Unterbrechen', correct: 'right' },
      { text: 'Gefühle kleinreden', correct: 'right' },
      { text: 'Nur an sich denken', correct: 'right' },
      { text: 'Ignorieren', correct: 'right' },
    ],
  },
  night: {
    leftLabel: 'Beruhigend',
    rightLabel: 'Stressig',
    items: [
      { text: 'Tief durchatmen', correct: 'left' },
      { text: 'Meditation', correct: 'left' },
      { text: 'Natur genießen', correct: 'left' },
      { text: 'Kreativ sein', correct: 'left' },
      { text: 'Langsam essen', correct: 'left' },
      { text: 'Ständig am Handy sein', correct: 'right' },
      { text: 'Zu viel Koffein', correct: 'right' },
      { text: 'Alles aufschieben', correct: 'right' },
      { text: 'Zu wenig schlafen', correct: 'right' },
      { text: 'Multitasking', correct: 'right' },
    ],
  },
  rainbow: {
    leftLabel: 'Vielfalt schätzen',
    rightLabel: 'Ausgrenzend',
    items: [
      { text: 'Neugierig auf andere Kulturen', correct: 'left' },
      { text: 'Unterschiede feiern', correct: 'left' },
      { text: 'Alle einladen', correct: 'left' },
      { text: 'Vorurteile hinterfragen', correct: 'left' },
      { text: 'Voneinander lernen', correct: 'left' },
      { text: 'Sich lustig machen', correct: 'right' },
      { text: 'Gruppen ausschließen', correct: 'right' },
      { text: 'Stereotypen verbreiten', correct: 'right' },
      { text: 'Nur mit Gleichen spielen', correct: 'right' },
      { text: 'Anders = schlecht denken', correct: 'right' },
    ],
  },
  home: {
    leftLabel: 'Verbindend',
    rightLabel: 'Trennend',
    items: [
      { text: 'Zeit zusammen verbringen', correct: 'left' },
      { text: 'Danke sagen', correct: 'left' },
      { text: 'Gemeinsam kochen', correct: 'left' },
      { text: 'Geschichten teilen', correct: 'left' },
      { text: 'Einander helfen', correct: 'left' },
      { text: 'Immer allein sein wollen', correct: 'right' },
      { text: 'Nie zuhören', correct: 'right' },
      { text: 'Streit suchen', correct: 'right' },
      { text: 'Versprechen brechen', correct: 'right' },
      { text: 'Geheimnisse verraten', correct: 'right' },
    ],
  },
};

const ISLAND_GRADIENTS: Record<IslandId, string> = {
  volcano:  'radial-gradient(ellipse at 50% 80%, #2d0a0a 0%, #1a0505 40%, #0d0d1a 100%)',
  ocean:    'radial-gradient(ellipse at 50% 80%, #0a1a2d 0%, #05101a 40%, #0d0d1a 100%)',
  forest:   'radial-gradient(ellipse at 50% 80%, #0a2d0a 0%, #051a05 40%, #0d0d1a 100%)',
  mountain: 'radial-gradient(ellipse at 50% 80%, #1a1a2d 0%, #0f0f1a 40%, #0d0d1a 100%)',
  garden:   'radial-gradient(ellipse at 50% 80%, #2d0a2d 0%, #1a051a 40%, #0d0d1a 100%)',
  night:    'radial-gradient(ellipse at 50% 80%, #0a0a2d 0%, #05051a 40%, #0d0d1a 100%)',
  rainbow:  'radial-gradient(ellipse at 50% 80%, #1a102d 0%, #0d081a 40%, #0d0d1a 100%)',
  home:     'radial-gradient(ellipse at 50% 80%, #2d1a0a 0%, #1a0f05 40%, #0d0d1a 100%)',
};

const WISDOM_MESSAGES: Record<IslandId, string> = {
  volcano:  'Wut ist eine natürliche Emotion. Lerne sie zu verstehen, nicht zu unterdrücken.',
  ocean:    'Traurigkeit zu fühlen ist mutig. Sie hilft uns, was uns wichtig ist, zu erkennen.',
  forest:   'Mut bedeutet nicht, keine Angst zu haben, sondern trotz der Angst zu handeln.',
  mountain: 'Du bist wertvoll, genau so wie du bist. Dein Wert hängt nicht von Leistung ab.',
  garden:   'Empathie ist die Brücke, die Herzen verbindet und Verständnis schafft.',
  night:    'In der Stille findest du die Antworten, die der Lärm des Alltags verbirgt.',
  rainbow:  'Unsere Unterschiede machen uns stark. Jeder Mensch bereichert die Welt.',
  home:     'Zugehörigkeit entsteht dort, wo wir uns sicher fühlen, wir selbst zu sein.',
};

// =============================================================================
// Helpers
// =============================================================================

/** Fisher-Yates shuffle */
function shuffle<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

let globalParticleId = 0;

function createCelebrationParticles(count: number) {
  return Array.from({ length: count }, () => ({
    id: ++globalParticleId,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 3 + Math.random() * 6,
    delay: Math.random() * 1.2,
    duration: 1.5 + Math.random() * 2,
    hue: Math.random() * 60 + 20, // warm golden range
  }));
}

// =============================================================================
// Celebration Overlay
// =============================================================================

function CelebrationOverlay({
  xpEarned,
  message,
  onClose,
}: {
  xpEarned: number;
  message: string;
  onClose: () => void;
}) {
  const particles = useMemo(() => createCelebrationParticles(30), []);

  return (
    <motion.div
      className="absolute inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' as const }}
    >
      {/* Dark backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: `radial-gradient(circle, hsl(${p.hue}, 90%, 60%), hsl(${p.hue}, 80%, 40%))`,
            boxShadow: `0 0 ${p.size * 2}px ${p.size}px hsla(${p.hue}, 90%, 50%, 0.4)`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0, 1.5, 1, 0],
            y: [0, -40, -80],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: 'easeOut' as const,
          }}
        />
      ))}

      {/* Central card */}
      <motion.div
        className="relative glass-panel rounded-2xl p-8 max-w-sm mx-4 border border-amber-500/30 text-center"
        style={{
          boxShadow: '0 0 40px rgba(255,215,0,0.15), 0 0 80px rgba(255,215,0,0.08)',
        }}
        initial={{ scale: 0.5, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring' as const, stiffness: 200, damping: 18, delay: 0.2 }}
      >
        {/* Trophy */}
        <motion.div
          className="text-6xl mb-4"
          animate={{
            scale: [1, 1.15, 1],
            filter: [
              'drop-shadow(0 0 8px rgba(255,215,0,0.4))',
              'drop-shadow(0 0 20px rgba(255,215,0,0.8))',
              'drop-shadow(0 0 8px rgba(255,215,0,0.4))',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' as const }}
        >
          🏆
        </motion.div>

        <h2 className="font-title text-golden text-2xl font-bold mb-2">
          Geschafft!
        </h2>

        <motion.div
          className="font-title text-amber-300 text-lg font-semibold mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, ease: 'easeOut' as const }}
        >
          +{xpEarned} EP verdient
        </motion.div>

        <motion.p
          className="text-amber-200/70 text-sm mb-6 italic leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, ease: 'easeOut' as const }}
        >
          &ldquo;{message}&rdquo;
        </motion.p>

        <motion.button
          className="glass-panel px-6 py-2.5 rounded-xl font-title text-golden font-semibold border border-amber-500/30 hover:border-amber-500/50 transition-colors"
          whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(255,215,0,0.3)' }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, ease: 'easeOut' as const }}
        >
          Weiter
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

// =============================================================================
// GAME 1: EmotionMemory (Memory Matching Game)
// =============================================================================

interface MemoryCard {
  id: number;
  emoji: string;
  flipped: boolean;
  matched: boolean;
}

function EmotionMemory({
  islandId,
  onComplete,
}: {
  islandId: IslandId;
  onComplete: (xp: number) => void;
}) {
  const emojis = MEMORY_CARDS[islandId];

  const [cards, setCards] = useState<MemoryCard[]>(() =>
    shuffle(
      emojis.flatMap((emoji, baseIndex) => [
        { id: baseIndex * 2, emoji, flipped: false, matched: false },
        { id: baseIndex * 2 + 1, emoji, flipped: false, matched: false },
      ]),
    ),
  );
  const [selected, setSelected] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [timer, setTimer] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lockRef = useRef(false);

  // Start timer
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimer((t) => t + 1);
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Stop timer on completion
  useEffect(() => {
    if (gameComplete && timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, [gameComplete]);

  const handleCardClick = useCallback(
    (cardId: number) => {
      if (lockRef.current || gameComplete) return;

      const card = cards.find((c) => c.id === cardId);
      if (!card || card.flipped || card.matched) return;

      const newSelected = [...selected, cardId];
      setCards((prev) =>
        prev.map((c) => (c.id === cardId ? { ...c, flipped: true } : c)),
      );

      if (newSelected.length === 2) {
        lockRef.current = true;
        setMoves((m) => m + 1);

        const first = cards.find((c) => c.id === newSelected[0]);
        const second = cards.find((c) => c.id === newSelected[1]);

        if (first && second && first.emoji === second.emoji) {
          // Match found
          setTimeout(() => {
            setCards((prev) => {
              const updated = prev.map((c) =>
                c.id === first.id || c.id === second.id
                  ? { ...c, matched: true }
                  : c,
              );
              // Check if all matched
              if (updated.every((c) => c.matched)) {
                setGameComplete(true);
                setShowCelebration(true);
              }
              return updated;
            });
            lockRef.current = false;
          }, 500);
        } else {
          // No match - flip back
          setTimeout(() => {
            setCards((prev) =>
              prev.map((c) =>
                c.id === newSelected[0] || c.id === newSelected[1]
                  ? { ...c, flipped: false }
                  : c,
              ),
            );
            lockRef.current = false;
          }, 800);
        }
        setSelected([]);
      } else {
        setSelected(newSelected);
      }
    },
    [cards, selected, gameComplete],
  );

  const xpEarned = Math.max(20, 50 - moves + Math.max(0, 60 - timer));

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <div className="glass-panel rounded-xl px-4 py-2 border border-amber-500/20">
          <span className="font-title text-golden text-sm">
            ⏱️ {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
          </span>
        </div>
        <h3 className="font-title text-golden text-lg font-bold">
          Emotions-Memory
        </h3>
        <div className="glass-panel rounded-xl px-4 py-2 border border-amber-500/20">
          <span className="font-title text-golden text-sm">
            🎯 {moves} Züge
          </span>
        </div>
      </div>

      {/* Card grid */}
      <div className="grid grid-cols-4 gap-2.5 w-full" style={{ perspective: '1000px' }}>
        {cards.map((card) => (
          <motion.button
            key={card.id}
            className="relative aspect-square rounded-xl focus:outline-none"
            style={{ transformStyle: 'preserve-3d' }}
            onClick={() => handleCardClick(card.id)}
            whileHover={!card.flipped && !card.matched ? { scale: 1.06 } : {}}
            whileTap={!card.flipped && !card.matched ? { scale: 0.94 } : {}}
            animate={{
              rotateY: card.flipped || card.matched ? 180 : 0,
              opacity: card.matched ? 0.5 : 1,
              scale: card.matched ? 0.9 : 1,
            }}
            transition={{
              duration: 0.4,
              ease: 'easeOut' as const,
            }}
            disabled={card.flipped || card.matched || lockRef.current}
          >
            {/* Card Back */}
            <div
              className="absolute inset-0 rounded-xl border-2 border-amber-500/40 flex items-center justify-center"
              style={{
                backfaceVisibility: 'hidden',
                background: 'linear-gradient(135deg, #1a0a2e, #0d0d1a, #1a0a2e)',
                boxShadow: '0 0 10px rgba(255,215,0,0.1), inset 0 0 20px rgba(255,215,0,0.05)',
              }}
            >
              <div
                className="w-8 h-8 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(255,215,0,0.2), transparent)',
                  boxShadow: '0 0 12px rgba(255,215,0,0.15)',
                }}
              />
              <span className="absolute font-title text-golden/40 text-lg">?</span>
            </div>

            {/* Card Front */}
            <div
              className="absolute inset-0 rounded-xl border-2 border-amber-500/50 flex items-center justify-center"
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                background: 'linear-gradient(135deg, #1a1030, #0d0d1a, #1a1030)',
                boxShadow: '0 0 15px rgba(255,215,0,0.15), inset 0 0 20px rgba(255,215,0,0.08)',
              }}
            >
              <span className="text-3xl sm:text-4xl drop-shadow-lg">{card.emoji}</span>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Progress indicator */}
      <div className="w-full glass-panel rounded-xl px-4 py-2 border border-amber-500/20">
        <div className="flex items-center justify-between mb-1">
          <span className="font-title text-golden/70 text-xs">Fortschritt</span>
          <span className="font-title text-golden/70 text-xs">
            {cards.filter((c) => c.matched).length / 2} / {cards.length / 2} Paare
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-stone-800/60 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, #92600a, #ffd700)',
            }}
            animate={{
              width: `${(cards.filter((c) => c.matched).length / cards.length) * 100}%`,
            }}
            transition={{ duration: 0.5, ease: 'easeOut' as const }}
          />
        </div>
      </div>

      {/* Celebration */}
      <AnimatePresence>
        {showCelebration && (
          <CelebrationOverlay
            xpEarned={xpEarned}
            message={WISDOM_MESSAGES[islandId]}
            onClose={() => onComplete(xpEarned)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// =============================================================================
// GAME 2: EmotionCatcher (Falling Items Game)
// =============================================================================

interface FallingItem {
  id: number;
  emoji: string;
  isGood: boolean;
  x: number;
  y: number;
  speed: number;
}

const CATCHER_AREA_WIDTH = 320;
const BASKET_WIDTH = 60;
const ITEM_SIZE = 36;
const SPAWN_INTERVAL_BASE = 900;
const TICK_MS = 30;

function EmotionCatcher({
  islandId,
  onComplete,
}: {
  islandId: IslandId;
  onComplete: (xp: number) => void;
}) {
  const theme = CATCHER_THEMES[islandId];

  const [basketX, setBasketX] = useState(CATCHER_AREA_WIDTH / 2 - BASKET_WIDTH / 2);
  const [items, setItems] = useState<FallingItem[]>([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [flashColor, setFlashColor] = useState<string | null>(null);
  const [comboCount, setComboCount] = useState(0);

  const itemIdRef = useRef(0);
  const gameAreaRef = useRef<HTMLDivElement | null>(null);
  const basketXRef = useRef(basketX);
  const scoreRef = useRef(0);
  const livesRef = useRef(3);
  const gameOverRef = useRef(false);
  const touchStartXRef = useRef<number | null>(null);
  const touchBasketStartRef = useRef(0);

  // Keep refs in sync
  useEffect(() => { basketXRef.current = basketX; }, [basketX]);
  useEffect(() => { scoreRef.current = score; }, [score]);
  useEffect(() => { livesRef.current = lives; }, [lives]);
  useEffect(() => { gameOverRef.current = gameOver; }, [gameOver]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOverRef.current) return;
      const step = 18;
      if (e.key === 'ArrowLeft' || e.key === 'a') {
        setBasketX((prev) => Math.max(0, prev - step));
      } else if (e.key === 'ArrowRight' || e.key === 'd') {
        setBasketX((prev) => Math.min(CATCHER_AREA_WIDTH - BASKET_WIDTH, prev + step));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Touch controls
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartXRef.current = touch.clientX;
    touchBasketStartRef.current = basketXRef.current;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (touchStartXRef.current === null || gameOverRef.current) return;
    const touch = e.touches[0];
    const delta = touch.clientX - touchStartXRef.current;
    const newX = Math.max(
      0,
      Math.min(CATCHER_AREA_WIDTH - BASKET_WIDTH, touchBasketStartRef.current + delta),
    );
    setBasketX(newX);
  }, []);

  // Spawn items
  useEffect(() => {
    if (gameOver) return;

    const spawnItem = () => {
      if (gameOverRef.current) return;
      const isGood = Math.random() > 0.35;
      const speed = 2 + Math.min(scoreRef.current * 0.12, 4);
      const newItem: FallingItem = {
        id: ++itemIdRef.current,
        emoji: isGood ? theme.good : theme.bad,
        isGood,
        x: Math.random() * (CATCHER_AREA_WIDTH - ITEM_SIZE),
        y: -ITEM_SIZE,
        speed: speed + Math.random() * 1.5,
      };
      setItems((prev) => [...prev, newItem]);
    };

    const interval = Math.max(
      350,
      SPAWN_INTERVAL_BASE - scoreRef.current * 30,
    );
    const spawner = setInterval(spawnItem, interval);
    return () => clearInterval(spawner);
  }, [gameOver, score, theme]);

  // Game loop: move items, detect catches
  useEffect(() => {
    if (gameOver) return;

    const gameLoop = setInterval(() => {
      if (gameOverRef.current) return;

      setItems((prev) => {
        const surviving: FallingItem[] = [];
        let scoreChange = 0;
        let livesChange = 0;
        let caught = false;
        let caughtBad = false;

        for (const item of prev) {
          const newY = item.y + item.speed;

          // Check if caught by basket
          const basketLeft = basketXRef.current;
          const basketRight = basketLeft + BASKET_WIDTH;
          const itemCenter = item.x + ITEM_SIZE / 2;
          const catchZoneTop = 370;
          const catchZoneBottom = 410;

          if (
            newY + ITEM_SIZE >= catchZoneTop &&
            newY <= catchZoneBottom &&
            itemCenter >= basketLeft - 8 &&
            itemCenter <= basketRight + 8
          ) {
            if (item.isGood) {
              scoreChange += 1;
              caught = true;
            } else {
              livesChange -= 1;
              caughtBad = true;
            }
            continue; // consumed
          }

          // Check if fallen off bottom
          if (newY > 430) {
            continue; // remove
          }

          surviving.push({ ...item, y: newY });
        }

        if (scoreChange > 0) {
          setScore((s) => s + scoreChange);
          setComboCount((c) => c + 1);
          setFlashColor('#22c55e');
          setTimeout(() => setFlashColor(null), 200);
        }
        if (caughtBad) {
          setComboCount(0);
          setFlashColor('#ef4444');
          setTimeout(() => setFlashColor(null), 200);
        }
        if (livesChange < 0) {
          setLives((l) => {
            const newLives = l + livesChange;
            if (newLives <= 0) {
              setGameOver(true);
              setShowCelebration(true);
            }
            return Math.max(0, newLives);
          });
        }
        if (caught) {
          // We handle the score update outside
        }

        return surviving;
      });
    }, TICK_MS);

    return () => clearInterval(gameLoop);
  }, [gameOver]);

  const xpEarned = Math.max(10, score * 5);

  return (
    <div className="flex flex-col items-center gap-3 w-full max-w-sm mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <div className="glass-panel rounded-xl px-3 py-1.5 border border-amber-500/20 flex gap-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.span
              key={i}
              className="text-lg"
              animate={{ opacity: i < lives ? 1 : 0.2, scale: i < lives ? 1 : 0.7 }}
              transition={{ duration: 0.3, ease: 'easeOut' as const }}
            >
              ❤️
            </motion.span>
          ))}
        </div>
        <h3 className="font-title text-golden text-base font-bold">
          Emotions-Fänger
        </h3>
        <div className="glass-panel rounded-xl px-3 py-1.5 border border-amber-500/20">
          <span className="font-title text-golden text-sm">
            ⭐ {score}
          </span>
        </div>
      </div>

      {/* Combo indicator */}
      <AnimatePresence>
        {comboCount >= 3 && (
          <motion.div
            className="font-title text-amber-300 text-xs font-bold"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' as const }}
          >
            🔥 {comboCount}er Combo!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions */}
      <div className="text-amber-200/50 text-xs text-center">
        Fange {theme.goodLabel} {theme.good} — vermeide {theme.badLabel} {theme.bad}
      </div>

      {/* Game area */}
      <div
        ref={gameAreaRef}
        className="relative rounded-2xl overflow-hidden border border-amber-500/20"
        style={{
          width: CATCHER_AREA_WIDTH,
          height: 430,
          background: 'linear-gradient(180deg, #0d0d1a 0%, #1a0a2e 100%)',
          boxShadow: flashColor
            ? `inset 0 0 40px ${flashColor}40`
            : 'inset 0 0 40px rgba(0,0,0,0.5)',
          transition: 'box-shadow 0.2s',
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        {/* Falling items */}
        {items.map((item) => (
          <motion.div
            key={item.id}
            className="absolute pointer-events-none select-none"
            style={{
              left: item.x,
              top: item.y,
              width: ITEM_SIZE,
              height: ITEM_SIZE,
              fontSize: '28px',
              lineHeight: `${ITEM_SIZE}px`,
              textAlign: 'center',
              filter: item.isGood
                ? 'drop-shadow(0 0 6px rgba(255,215,0,0.5))'
                : 'drop-shadow(0 0 6px rgba(255,50,50,0.5))',
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, ease: 'easeOut' as const }}
          >
            {item.emoji}
          </motion.div>
        ))}

        {/* Catch zone line */}
        <div
          className="absolute left-0 right-0 h-px opacity-20"
          style={{
            top: 375,
            background: 'linear-gradient(90deg, transparent, #ffd700, transparent)',
          }}
        />

        {/* Basket */}
        <motion.div
          className="absolute rounded-xl border-2 border-amber-500/60 flex items-center justify-center"
          style={{
            bottom: 20,
            left: basketX,
            width: BASKET_WIDTH,
            height: 40,
            background: 'linear-gradient(180deg, rgba(201,168,76,0.3), rgba(201,168,76,0.1))',
            boxShadow: '0 0 15px rgba(255,215,0,0.2), 0 -4px 15px rgba(255,215,0,0.1)',
          }}
          animate={{ x: 0 }}
          transition={{ duration: 0.05, ease: 'easeOut' as const }}
        >
          <span className="text-xl">🧺</span>
        </motion.div>

        {/* Speed indicator */}
        <div className="absolute top-2 left-2">
          <span className="text-amber-500/30 text-[10px] font-title">
            Tempo {Math.min(10, Math.floor(1 + score * 0.3))}
          </span>
        </div>
      </div>

      {/* Arrow controls for mobile */}
      <div className="flex gap-4 mt-1">
        <motion.button
          className="glass-panel w-14 h-14 rounded-xl border border-amber-500/30 flex items-center justify-center text-2xl text-golden"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9, backgroundColor: 'rgba(255,215,0,0.1)' }}
          onPointerDown={() => {
            if (!gameOver) setBasketX((p) => Math.max(0, p - 24));
          }}
        >
          ◀
        </motion.button>
        <motion.button
          className="glass-panel w-14 h-14 rounded-xl border border-amber-500/30 flex items-center justify-center text-2xl text-golden"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9, backgroundColor: 'rgba(255,215,0,0.1)' }}
          onPointerDown={() => {
            if (!gameOver) setBasketX((p) => Math.min(CATCHER_AREA_WIDTH - BASKET_WIDTH, p + 24));
          }}
        >
          ▶
        </motion.button>
      </div>

      {/* Celebration */}
      <AnimatePresence>
        {showCelebration && (
          <CelebrationOverlay
            xpEarned={xpEarned}
            message={WISDOM_MESSAGES[islandId]}
            onClose={() => onComplete(xpEarned)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// =============================================================================
// GAME 3: EmotionSorter (Sorting / Categorization Game)
// =============================================================================

interface SorterItem {
  text: string;
  correct: 'left' | 'right';
}

function EmotionSorter({
  islandId,
  onComplete,
}: {
  islandId: IslandId;
  onComplete: (xp: number) => void;
}) {
  const sorterTheme = SORTER_THEMES[islandId];

  const [shuffledItems] = useState<SorterItem[]>(() =>
    shuffle(sorterTheme.items),
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [gameComplete, setGameComplete] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [streak, setStreak] = useState(0);

  const currentItem = shuffledItems[currentIndex] as SorterItem | undefined;
  const totalItems = shuffledItems.length;

  const handleSort = useCallback(
    (side: 'left' | 'right') => {
      if (!currentItem || feedback !== null) return;

      const isCorrect = currentItem.correct === side;

      if (isCorrect) {
        setCorrectCount((c) => c + 1);
        setStreak((s) => s + 1);
      } else {
        setStreak(0);
      }

      setFeedback(isCorrect ? 'correct' : 'wrong');

      setTimeout(() => {
        setFeedback(null);
        setDragX(0);

        if (currentIndex + 1 >= totalItems) {
          setGameComplete(true);
          setShowCelebration(true);
        } else {
          setCurrentIndex((i) => i + 1);
        }
      }, 700);
    },
    [currentItem, currentIndex, totalItems, feedback],
  );

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameComplete || feedback !== null) return;
      if (e.key === 'ArrowLeft' || e.key === 'a') handleSort('left');
      if (e.key === 'ArrowRight' || e.key === 'd') handleSort('right');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameComplete, feedback, handleSort]);

  // Touch / drag handling
  const dragStartXRef = useRef(0);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (feedback !== null) return;
    setIsDragging(true);
    dragStartXRef.current = e.clientX;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [feedback]);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging || feedback !== null) return;
      const delta = e.clientX - dragStartXRef.current;
      setDragX(delta);
    },
    [isDragging, feedback],
  );

  const handlePointerUp = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);

    const threshold = 80;
    if (dragX < -threshold) {
      handleSort('left');
    } else if (dragX > threshold) {
      handleSort('right');
    } else {
      setDragX(0);
    }
  }, [isDragging, dragX, handleSort]);

  const xpEarned = Math.max(15, correctCount * 8);

  // Calculate tilt from drag
  const tilt = Math.max(-20, Math.min(20, dragX * 0.15));
  const dragOpacity = Math.max(0, 1 - Math.abs(dragX) / 250);

  // Side highlight
  const leftHighlight = dragX < -30 ? Math.min(1, Math.abs(dragX) / 120) : 0;
  const rightHighlight = dragX > 30 ? Math.min(1, dragX / 120) : 0;

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <div className="glass-panel rounded-xl px-3 py-1.5 border border-amber-500/20">
          <span className="font-title text-golden text-sm">
            ✅ {correctCount}/{totalItems}
          </span>
        </div>
        <h3 className="font-title text-golden text-base font-bold">
          Emotions-Sortierer
        </h3>
        <div className="glass-panel rounded-xl px-3 py-1.5 border border-amber-500/20">
          <span className="font-title text-golden text-sm">
            📋 {currentIndex + 1}/{totalItems}
          </span>
        </div>
      </div>

      {/* Streak */}
      <AnimatePresence>
        {streak >= 3 && (
          <motion.div
            className="font-title text-amber-300 text-xs font-bold"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' as const }}
          >
            🔥 {streak}er Serie!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sorting area */}
      <div className="relative w-full flex items-center justify-between gap-2 min-h-[280px]">
        {/* Left bucket */}
        <motion.button
          className="flex-1 glass-panel rounded-2xl border-2 py-6 px-3 flex flex-col items-center gap-2 transition-colors min-h-[200px]"
          style={{
            borderColor: leftHighlight > 0
              ? `rgba(34,197,94,${0.3 + leftHighlight * 0.5})`
              : feedback === 'correct' && currentItem?.correct === 'left'
                ? 'rgba(34,197,94,0.6)'
                : feedback === 'wrong' && currentItem?.correct !== 'left'
                  ? 'rgba(239,68,68,0.6)'
                  : 'rgba(201,168,76,0.2)',
            boxShadow: leftHighlight > 0
              ? `0 0 ${20 * leftHighlight}px rgba(34,197,94,${leftHighlight * 0.3})`
              : 'none',
          }}
          onClick={() => handleSort('left')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="text-3xl">📥</span>
          <span className="font-title text-golden text-sm font-bold text-center leading-tight">
            {sorterTheme.leftLabel}
          </span>
          {leftHighlight > 0 && (
            <motion.span
              className="text-green-400/80 text-xs font-title"
              initial={{ opacity: 0 }}
              animate={{ opacity: leftHighlight }}
            >
              Hierhin ziehen
            </motion.span>
          )}
        </motion.button>

        {/* Center item */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-44">
          <AnimatePresence mode="wait">
            {currentItem && !gameComplete && (
              <motion.div
                key={currentIndex}
                className="glass-panel rounded-2xl border-2 border-amber-500/30 px-4 py-6 text-center cursor-grab active:cursor-grabbing select-none touch-none"
                style={{
                  boxShadow: '0 0 20px rgba(255,215,0,0.1)',
                  rotate: tilt,
                  x: dragX,
                  opacity: dragOpacity,
                }}
                initial={{ opacity: 0, scale: 0.5, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  x: feedback === 'correct'
                    ? currentItem.correct === 'left' ? -200 : 200
                    : currentItem.correct === 'left' ? 200 : -200,
                  scale: 0.5,
                  rotate: feedback === 'correct' ? 0 : 15,
                }}
                transition={{ duration: 0.35, ease: 'easeOut' as const }}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
              >
                <span className="font-title text-golden text-base font-semibold leading-snug">
                  {currentItem.text}
                </span>

                {/* Feedback indicator */}
                <AnimatePresence>
                  {feedback !== null && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl flex items-center justify-center"
                      style={{
                        background: feedback === 'correct'
                          ? 'rgba(34,197,94,0.15)'
                          : 'rgba(239,68,68,0.15)',
                        borderColor: feedback === 'correct'
                          ? 'rgba(34,197,94,0.5)'
                          : 'rgba(239,68,68,0.5)',
                        borderWidth: 2,
                        borderStyle: 'solid',
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2, ease: 'easeOut' as const }}
                    >
                      <span className="text-4xl">
                        {feedback === 'correct' ? '✅' : '❌'}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right bucket */}
        <motion.button
          className="flex-1 glass-panel rounded-2xl border-2 py-6 px-3 flex flex-col items-center gap-2 transition-colors min-h-[200px]"
          style={{
            borderColor: rightHighlight > 0
              ? `rgba(34,197,94,${0.3 + rightHighlight * 0.5})`
              : feedback === 'correct' && currentItem?.correct === 'right'
                ? 'rgba(34,197,94,0.6)'
                : feedback === 'wrong' && currentItem?.correct !== 'right'
                  ? 'rgba(239,68,68,0.6)'
                  : 'rgba(201,168,76,0.2)',
            boxShadow: rightHighlight > 0
              ? `0 0 ${20 * rightHighlight}px rgba(34,197,94,${rightHighlight * 0.3})`
              : 'none',
          }}
          onClick={() => handleSort('right')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="text-3xl">📥</span>
          <span className="font-title text-golden text-sm font-bold text-center leading-tight">
            {sorterTheme.rightLabel}
          </span>
          {rightHighlight > 0 && (
            <motion.span
              className="text-green-400/80 text-xs font-title"
              initial={{ opacity: 0 }}
              animate={{ opacity: rightHighlight }}
            >
              Hierhin ziehen
            </motion.span>
          )}
        </motion.button>
      </div>

      {/* Instruction */}
      <div className="text-amber-200/40 text-xs text-center">
        Ziehe die Karte zum richtigen Eimer oder tippe auf einen Eimer
      </div>

      {/* Progress bar */}
      <div className="w-full glass-panel rounded-xl px-4 py-2 border border-amber-500/20">
        <div className="flex items-center justify-between mb-1">
          <span className="font-title text-golden/70 text-xs">Fortschritt</span>
          <span className="font-title text-golden/70 text-xs">
            {Math.round((correctCount / totalItems) * 100)}% richtig
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-stone-800/60 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, #92600a, #ffd700)',
            }}
            animate={{
              width: `${((currentIndex + (feedback !== null ? 1 : 0)) / totalItems) * 100}%`,
            }}
            transition={{ duration: 0.5, ease: 'easeOut' as const }}
          />
        </div>
      </div>

      {/* Celebration */}
      <AnimatePresence>
        {showCelebration && (
          <CelebrationOverlay
            xpEarned={xpEarned}
            message={WISDOM_MESSAGES[islandId]}
            onClose={() => onComplete(xpEarned)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// =============================================================================
// MiniGameModal Wrapper
// =============================================================================

interface MiniGameModalProps {
  gameType: 'memory' | 'catcher' | 'sorter';
  islandId: string;
  onClose: () => void;
  onComplete: (xpEarned: number) => void;
}

function MiniGameModal({ gameType, islandId, onClose, onComplete }: MiniGameModalProps) {
  const validIslandId = islandId as IslandId;
  const gradient = ISLAND_GRADIENTS[validIslandId] ?? ISLAND_GRADIENTS.volcano;

  const handleComplete = useCallback(
    (xp: number) => {
      onComplete(xp);
    },
    [onComplete],
  );

  const gameTitles: Record<string, string> = {
    memory: 'Emotions-Memory',
    catcher: 'Emotions-Fänger',
    sorter: 'Emotions-Sortierer',
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' as const }}
    >
      {/* Full-screen backdrop */}
      <motion.div
        className="absolute inset-0"
        style={{ background: gradient }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' as const }}
      />

      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Ambient floating particles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 3 + Math.random() * 4,
            height: 3 + Math.random() * 4,
            left: `${10 + Math.random() * 80}%`,
            background: 'radial-gradient(circle, rgba(255,215,0,0.4), transparent)',
            boxShadow: '0 0 8px rgba(255,215,0,0.2)',
          }}
          animate={{
            y: [0, -(100 + Math.random() * 200)],
            x: [0, -20 + Math.random() * 40],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'easeOut' as const,
          }}
          initial={{ bottom: '5%' }}
        />
      ))}

      {/* Close button */}
      <motion.button
        className="absolute top-4 right-4 z-50 w-10 h-10 glass-panel rounded-full flex items-center justify-center text-amber-300/80 hover:text-amber-100 border border-amber-500/30 hover:border-amber-500/50 transition-colors"
        onClick={onClose}
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, type: 'spring' as const, stiffness: 200, damping: 15 }}
        aria-label="Schließen"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </motion.button>

      {/* Game title */}
      <motion.div
        className="absolute top-4 left-1/2 -translate-x-1/2 z-40"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5, ease: 'easeOut' as const }}
      >
        <div className="flex items-center gap-3">
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-amber-500/40" />
          <span className="font-title text-golden/60 text-xs tracking-widest uppercase">
            {gameTitles[gameType] ?? 'Minispiel'}
          </span>
          <div className="h-px w-8 bg-gradient-to-l from-transparent to-amber-500/40" />
        </div>
      </motion.div>

      {/* Game container */}
      <motion.div
        className="relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto px-4 py-16 scrollbar-thin scrollbar-thumb-amber-900/30"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.95 }}
        transition={{ delay: 0.1, duration: 0.4, ease: 'easeOut' as const }}
      >
        {gameType === 'memory' && (
          <EmotionMemory islandId={validIslandId} onComplete={handleComplete} />
        )}
        {gameType === 'catcher' && (
          <EmotionCatcher islandId={validIslandId} onComplete={handleComplete} />
        )}
        {gameType === 'sorter' && (
          <EmotionSorter islandId={validIslandId} onComplete={handleComplete} />
        )}
      </motion.div>
    </motion.div>
  );
}

// =============================================================================
// Exports
// =============================================================================

export { EmotionMemory, EmotionCatcher, EmotionSorter, MiniGameModal };
export type { MiniGameModalProps };
