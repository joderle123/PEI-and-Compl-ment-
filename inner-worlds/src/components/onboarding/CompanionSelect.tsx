import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../stores/gameStore';
import type { Companion, CompanionType, GameScreen } from '../../types';

// ---------------------------------------------------------------------------
// Companion data – each entry defines the visual identity and lore
// ---------------------------------------------------------------------------

interface CompanionOption {
  type: CompanionType;
  id: string;
  name: string;
  emoji: string;
  trait: string;
  description: string;
  aura: {
    from: string;
    via: string;
    to: string;
    ring: string;
    glow: string;
    particle: string;
    selectedBg: string;
  };
}

const COMPANIONS: CompanionOption[] = [
  {
    type: 'wolf',
    id: 'lupo',
    name: 'Lupo',
    emoji: '\u{1F43A}',
    trait: 'Mut & St\u00E4rke',
    description: 'Ich bin mutig und stehe f\u00FCr andere ein.',
    aura: {
      from: '#6366f1',
      via: '#818cf8',
      to: '#3b82f6',
      ring: 'ring-indigo-400/60',
      glow: 'shadow-[0_0_30px_rgba(99,102,241,0.5)]',
      particle: 'bg-indigo-400',
      selectedBg: 'from-indigo-900/40 to-blue-900/40',
    },
  },
  {
    type: 'owl',
    id: 'sophia',
    name: 'Sophia',
    emoji: '\u{1F989}',
    trait: 'Weisheit & Klarheit',
    description: 'Ich denke nach und finde kluge L\u00F6sungen.',
    aura: {
      from: '#f59e0b',
      via: '#fbbf24',
      to: '#d97706',
      ring: 'ring-amber-400/60',
      glow: 'shadow-[0_0_30px_rgba(245,158,11,0.5)]',
      particle: 'bg-amber-400',
      selectedBg: 'from-amber-900/40 to-yellow-900/40',
    },
  },
  {
    type: 'fox',
    id: 'felix',
    name: 'Felix',
    emoji: '\u{1F98A}',
    trait: 'Kreativit\u00E4t & Neugier',
    description: 'Ich bin neugierig und finde neue Wege.',
    aura: {
      from: '#f97316',
      via: '#fb923c',
      to: '#ef4444',
      ring: 'ring-orange-400/60',
      glow: 'shadow-[0_0_30px_rgba(249,115,22,0.5)]',
      particle: 'bg-orange-400',
      selectedBg: 'from-orange-900/40 to-red-900/40',
    },
  },
  {
    type: 'turtle',
    id: 'cleo',
    name: 'Cleo',
    emoji: '\u{1F422}',
    trait: 'Geduld & Ruhe',
    description: 'Ich nehme mir Zeit und bleibe gelassen.',
    aura: {
      from: '#22c55e',
      via: '#4ade80',
      to: '#10b981',
      ring: 'ring-emerald-400/60',
      glow: 'shadow-[0_0_30px_rgba(34,197,94,0.5)]',
      particle: 'bg-emerald-400',
      selectedBg: 'from-green-900/40 to-emerald-900/40',
    },
  },
];

// ---------------------------------------------------------------------------
// Helper – generate random positions for background elements
// ---------------------------------------------------------------------------

interface StarDef {
  id: number;
  top: string;
  left: string;
  size: number;
  delay: number;
  duration: number;
}

interface EmberDef {
  id: number;
  left: string;
  delay: number;
  duration: number;
  size: number;
}

const generateStars = (count: number): StarDef[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 5,
    duration: Math.random() * 3 + 2,
  }));

const generateEmbers = (count: number): EmberDef[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 8,
    duration: Math.random() * 6 + 6,
    size: Math.random() * 4 + 2,
  }));

// ---------------------------------------------------------------------------
// Framer Motion variants
// ---------------------------------------------------------------------------

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.85 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 260, damping: 20 },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 200, damping: 18, delay: 0.1 },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 200, damping: 18, delay: 0.8 },
  },
};

// ---------------------------------------------------------------------------
// CompanionSelect
// ---------------------------------------------------------------------------

const CompanionSelect = () => {
  const { setCompanion, setScreen } = useGameStore();
  const [selected, setSelected] = useState<CompanionType | null>(null);

  // Memoize background particle arrays so they remain stable across renders
  const stars = useMemo(() => generateStars(40), []);
  const embers = useMemo(() => generateEmbers(15), []);

  const handleSelect = (type: CompanionType) => {
    setSelected(type);
  };

  const handleNext = () => {
    if (!selected) return;

    const companionData = COMPANIONS.find((c) => c.type === selected);
    if (!companionData) return;

    const companion: Companion = {
      id: companionData.id,
      name: companionData.name,
      type: companionData.type,
      trait: companionData.trait,
      description: companionData.description,
      level: 1,
      evolutionStage: 'egg',
    };

    setCompanion(companion);
    setScreen('onboarding-assessment' as GameScreen);
  };

  const selectedCompanion = COMPANIONS.find((c) => c.type === selected) ?? null;

  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-b from-[#0d0015] via-[#1a0a2e] to-[#0a0a1a]">
      {/* ----------------------------------------------------------------- */}
      {/* Background layers                                                 */}
      {/* ----------------------------------------------------------------- */}

      {/* Vignette overlay */}
      <div className="vignette absolute inset-0 pointer-events-none z-10" />

      {/* Stars */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {stars.map((s) => (
          <motion.div
            key={`star-${s.id}`}
            className="star absolute rounded-full bg-white"
            style={{
              top: s.top,
              left: s.left,
              width: s.size,
              height: s.size,
            }}
            animate={{ opacity: [0.2, 0.9, 0.2] }}
            transition={{
              duration: s.duration,
              delay: s.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Embers – floating upward */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {embers.map((e) => (
          <motion.div
            key={`ember-${e.id}`}
            className="ember absolute rounded-full bg-amber-500/70"
            style={{
              left: e.left,
              bottom: '-5%',
              width: e.size,
              height: e.size,
            }}
            animate={{
              y: [0, -window.innerHeight * 1.2],
              x: [0, Math.sin(e.id) * 60],
              opacity: [0, 0.8, 0.6, 0],
            }}
            transition={{
              duration: e.duration,
              delay: e.delay,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>

      {/* Fog layers */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-purple-900/20 to-transparent pointer-events-none z-0"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-indigo-950/30 to-transparent pointer-events-none z-0"
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Central ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none z-0" />

      {/* ----------------------------------------------------------------- */}
      {/* Main scrollable content                                           */}
      {/* ----------------------------------------------------------------- */}
      <div className="relative z-20 h-full w-full overflow-y-auto">
        <motion.div
          className="max-w-2xl mx-auto px-4 py-8 sm:py-12 flex flex-col items-center gap-8"
          initial="hidden"
          animate="visible"
        >
          {/* ----- Title ----- */}
          <motion.div className="text-center" variants={titleVariants}>
            {/* Decorative top ornament */}
            <motion.div
              className="mb-4 flex items-center justify-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="block w-12 h-px bg-gradient-to-r from-transparent to-amber-500/60" />
              <span className="text-amber-400/80 text-lg">\u2726</span>
              <span className="block w-12 h-px bg-gradient-to-l from-transparent to-amber-500/60" />
            </motion.div>

            <h1 className="font-title text-golden text-3xl sm:text-4xl md:text-5xl tracking-wide drop-shadow-[0_0_20px_rgba(255,200,50,0.3)]">
              W&auml;hle deinen Begleiter
            </h1>

            <p className="mt-3 text-amber-200/60 text-sm sm:text-base leading-relaxed max-w-md mx-auto">
              Ein treuer Gef&auml;hrte wird sich dir auf deiner Reise anschlie&szlig;en.
              <br />
              Sp&uuml;re, wer zu dir geh&ouml;rt.
            </p>

            {/* Decorative bottom ornament */}
            <motion.div
              className="mt-4 flex items-center justify-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <span className="block w-16 h-px bg-gradient-to-r from-transparent to-amber-500/40" />
              <span className="text-amber-500/50 text-xs">\u25C6</span>
              <span className="block w-16 h-px bg-gradient-to-l from-transparent to-amber-500/40" />
            </motion.div>
          </motion.div>

          {/* ----- Companion Grid ----- */}
          <motion.div
            className="grid grid-cols-2 gap-4 sm:gap-6 w-full"
            variants={containerVariants}
          >
            {COMPANIONS.map((comp) => {
              const isSelected = selected === comp.type;

              return (
                <motion.button
                  key={comp.type}
                  variants={cardVariants}
                  onClick={() => handleSelect(comp.type)}
                  whileHover={!isSelected ? { scale: 1.04, y: -4 } : {}}
                  whileTap={{ scale: 0.96 }}
                  animate={
                    isSelected
                      ? {
                          scale: 1.05,
                          boxShadow: `0 0 40px ${comp.aura.from}66, 0 0 80px ${comp.aura.from}33`,
                        }
                      : {
                          scale: 1,
                          boxShadow: `0 0 15px ${comp.aura.from}22`,
                        }
                  }
                  transition={{ type: 'spring' as const, stiffness: 300, damping: 22 }}
                  className={`
                    glass-panel relative flex flex-col items-center text-center
                    p-5 sm:p-6 rounded-2xl cursor-pointer
                    border-2 transition-colors duration-300 overflow-hidden
                    ${
                      isSelected
                        ? `border-amber-400/80 ${comp.aura.glow}`
                        : 'border-white/10 hover:border-white/25'
                    }
                  `}
                >
                  {/* Companion color aura background */}
                  <div
                    className={`
                      absolute inset-0 rounded-2xl opacity-${isSelected ? '40' : '15'}
                      bg-gradient-to-b ${isSelected ? comp.aura.selectedBg : 'from-white/5 to-transparent'}
                      transition-opacity duration-500 pointer-events-none
                    `}
                  />

                  {/* Pulsing aura ring behind emoji when selected */}
                  {isSelected && (
                    <motion.div
                      className="absolute top-6 sm:top-8 w-20 h-20 sm:w-24 sm:h-24 rounded-full pointer-events-none"
                      style={{
                        background: `radial-gradient(circle, ${comp.aura.from}44, transparent 70%)`,
                      }}
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.6, 0.3, 0.6],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  )}

                  {/* Checkmark badge */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        className="absolute -top-1 -right-1 w-8 h-8 rounded-full
                                   bg-gradient-to-br from-amber-400 to-amber-600
                                   text-[#1a0a2e] flex items-center justify-center
                                   text-sm font-bold shadow-lg shadow-amber-500/40 z-10"
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 90 }}
                        transition={{ type: 'spring' as const, stiffness: 400, damping: 15 }}
                      >
                        &#10003;
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Companion emoji */}
                  <motion.span
                    className="relative z-[1] text-5xl sm:text-6xl mb-3 drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]"
                    animate={
                      isSelected
                        ? { y: [0, -8, 0], rotate: [0, 2, -2, 0] }
                        : { y: 0, rotate: 0 }
                    }
                    transition={
                      isSelected
                        ? {
                            duration: 3,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }
                        : { duration: 0.3 }
                    }
                  >
                    {comp.emoji}
                  </motion.span>

                  {/* Name */}
                  <h3
                    className={`
                      relative z-[1] font-title text-lg sm:text-xl font-bold tracking-wide
                      ${isSelected ? 'text-golden' : 'text-amber-100/90'}
                      transition-colors duration-300
                    `}
                  >
                    {comp.name}
                  </h3>

                  {/* Trait */}
                  <span
                    className="relative z-[1] mt-1 text-xs sm:text-sm font-semibold tracking-wider uppercase"
                    style={{
                      color: isSelected ? comp.aura.via : `${comp.aura.via}99`,
                    }}
                  >
                    {comp.trait}
                  </span>

                  {/* Description */}
                  <p className="relative z-[1] mt-3 text-xs sm:text-sm text-amber-200/50 leading-relaxed italic">
                    &bdquo;{comp.description}&ldquo;
                  </p>

                  {/* Small floating particles per card when selected */}
                  {isSelected && (
                    <>
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={`p-${comp.type}-${i}`}
                          className={`absolute w-1.5 h-1.5 rounded-full ${comp.aura.particle} pointer-events-none`}
                          style={{
                            left: `${20 + i * 25}%`,
                            bottom: '10%',
                          }}
                          animate={{
                            y: [0, -60 - i * 15],
                            opacity: [0, 0.8, 0],
                            x: [0, (i - 1) * 12],
                          }}
                          transition={{
                            duration: 2.5 + i * 0.5,
                            delay: i * 0.4,
                            repeat: Infinity,
                            ease: 'easeOut',
                          }}
                        />
                      ))}
                    </>
                  )}
                </motion.button>
              );
            })}
          </motion.div>

          {/* ----- Selected companion info banner ----- */}
          <AnimatePresence mode="wait">
            {selectedCompanion && (
              <motion.div
                key={selectedCompanion.type}
                className="glass-panel w-full rounded-2xl px-6 py-4 border border-amber-500/30
                           flex items-center gap-4"
                initial={{ opacity: 0, y: 16, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ type: 'spring' as const, stiffness: 300, damping: 25 }}
              >
                {/* Glow accent on left side */}
                <div
                  className="w-1 h-10 rounded-full flex-shrink-0"
                  style={{
                    background: `linear-gradient(to bottom, ${selectedCompanion.aura.from}, ${selectedCompanion.aura.to})`,
                    boxShadow: `0 0 12px ${selectedCompanion.aura.from}88`,
                  }}
                />
                <div className="flex flex-col">
                  <p className="text-amber-100/90 text-sm sm:text-base">
                    <span className="font-title text-golden font-bold">
                      {selectedCompanion.name}
                    </span>
                    {' '}wird dein treuer Gef&auml;hrte sein.
                  </p>
                  <p className="text-amber-200/40 text-xs mt-0.5">
                    Gemeinsam beginnt euer Abenteuer als Ei&nbsp;{'\u{1F95A}'}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ----- "Weiter" button ----- */}
          <motion.div variants={buttonVariants} className="w-full flex justify-center">
            <motion.button
              onClick={handleNext}
              disabled={!selected}
              whileHover={selected ? { scale: 1.04, y: -2 } : {}}
              whileTap={selected ? { scale: 0.96 } : {}}
              className={`
                relative w-full max-w-xs py-4 rounded-2xl font-title font-bold text-lg
                tracking-wider uppercase transition-all duration-300 cursor-pointer
                border-2 overflow-hidden
                ${
                  selected
                    ? 'glass-panel border-amber-400/70 text-golden shadow-[0_0_30px_rgba(255,200,50,0.2)] hover:shadow-[0_0_50px_rgba(255,200,50,0.35)]'
                    : 'glass-panel border-white/10 text-white/25 cursor-not-allowed'
                }
              `}
            >
              {/* Button inner glow */}
              {selected && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-amber-500/10 pointer-events-none"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />
              )}
              <span className="relative z-[1]">Weiter</span>
            </motion.button>
          </motion.div>

          {/* Bottom spacer for safe scroll area */}
          <div className="h-4" />
        </motion.div>
      </div>
    </div>
  );
};

export default CompanionSelect;
