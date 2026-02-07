import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../../stores/gameStore';
import type { Companion, CompanionType, GameScreen } from '../../types';

// ---------------------------------------------------------------------------
// Companion data
// ---------------------------------------------------------------------------

interface CompanionOption {
  type: CompanionType;
  id: string;
  name: string;
  emoji: string;
  trait: string;
  description: string;
  colors: { bg: string; border: string; glow: string };
}

const COMPANIONS: CompanionOption[] = [
  {
    type: 'wolf',
    id: 'lupo',
    name: 'Lupo',
    emoji: '🐺',
    trait: 'Mut & Stärke',
    description: 'Ich bin mutig und stehe für andere ein.',
    colors: {
      bg: 'from-blue-100 to-indigo-100',
      border: 'border-indigo-400',
      glow: 'shadow-indigo-200',
    },
  },
  {
    type: 'owl',
    id: 'sophia',
    name: 'Sophia',
    emoji: '🦉',
    trait: 'Weisheit & Klarheit',
    description: 'Ich denke nach und finde kluge Lösungen.',
    colors: {
      bg: 'from-amber-100 to-yellow-100',
      border: 'border-amber-400',
      glow: 'shadow-amber-200',
    },
  },
  {
    type: 'fox',
    id: 'felix',
    name: 'Felix',
    emoji: '🦊',
    trait: 'Kreativität & Neugier',
    description: 'Ich bin neugierig und finde neue Wege.',
    colors: {
      bg: 'from-orange-100 to-red-100',
      border: 'border-orange-400',
      glow: 'shadow-orange-200',
    },
  },
  {
    type: 'turtle',
    id: 'cleo',
    name: 'Cleo',
    emoji: '🐢',
    trait: 'Geduld & Ruhe',
    description: 'Ich nehme mir Zeit und bleibe gelassen.',
    colors: {
      bg: 'from-green-100 to-emerald-100',
      border: 'border-green-400',
      glow: 'shadow-green-200',
    },
  },
];

// ---------------------------------------------------------------------------
// Stagger animation variants
// ---------------------------------------------------------------------------

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 300, damping: 22 },
  },
};

// ---------------------------------------------------------------------------
// CompanionSelect
// ---------------------------------------------------------------------------

const CompanionSelect = () => {
  const { setCompanion, setScreen } = useGameStore();
  const [selected, setSelected] = useState<CompanionType | null>(null);

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

  return (
    <div className="h-full w-full overflow-y-auto bg-gradient-to-b from-bg via-white to-secondary/20">
      <motion.div
        className="max-w-lg mx-auto px-4 py-8 flex flex-col items-center gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h1 className="text-3xl font-extrabold text-primary">
            W&auml;hle deinen Begleiter
          </h1>
          <p className="text-text-light mt-2 text-sm leading-relaxed">
            Dein Begleiter wird dich auf deiner Reise unterst&uuml;tzen.
            <br />
            Jeder hat besondere St&auml;rken!
          </p>
        </motion.div>

        {/* Companion grid */}
        <motion.div
          className="grid grid-cols-2 gap-4 w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {COMPANIONS.map((comp) => {
            const isSelected = selected === comp.type;

            return (
              <motion.button
                key={comp.type}
                variants={cardVariants}
                onClick={() => handleSelect(comp.type)}
                className={`
                  relative flex flex-col items-center text-center p-5 rounded-2xl border-3
                  transition-colors cursor-pointer
                  bg-gradient-to-b ${comp.colors.bg}
                  ${
                    isSelected
                      ? `${comp.colors.border} shadow-lg ${comp.colors.glow}`
                      : 'border-transparent hover:border-gray-300'
                  }
                `}
                animate={isSelected ? { scale: 1.05 } : { scale: 1 }}
                whileHover={!isSelected ? { scale: 1.03 } : {}}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 350, damping: 20 }}
              >
                {/* Selected badge */}
                {isSelected && (
                  <motion.div
                    className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold shadow"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500 }}
                  >
                    &#10003;
                  </motion.div>
                )}

                {/* Emoji */}
                <motion.span
                  className="text-5xl mb-2"
                  animate={isSelected ? { y: [0, -6, 0] } : {}}
                  transition={
                    isSelected
                      ? { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
                      : {}
                  }
                >
                  {comp.emoji}
                </motion.span>

                {/* Name */}
                <h3 className="text-lg font-extrabold text-text">{comp.name}</h3>

                {/* Trait */}
                <span className="text-xs font-bold text-primary mt-0.5">{comp.trait}</span>

                {/* Description */}
                <p className="text-xs text-text-light mt-2 leading-snug italic">
                  &bdquo;{comp.description}&ldquo;
                </p>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Selected companion info */}
        {selected && (
          <motion.div
            className="bg-white/80 backdrop-blur rounded-2xl px-5 py-3 text-center shadow-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-sm text-text">
              <span className="font-bold">
                {COMPANIONS.find((c) => c.type === selected)?.name}
              </span>{' '}
              wird dein Begleiter sein!
            </p>
          </motion.div>
        )}

        {/* Next button */}
        <motion.button
          onClick={handleNext}
          disabled={!selected}
          className={`w-full max-w-xs py-4 rounded-2xl font-bold text-lg shadow-lg transition-all cursor-pointer ${
            selected
              ? 'bg-primary text-white hover:bg-primary-dark'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          whileHover={selected ? { scale: 1.03 } : {}}
          whileTap={selected ? { scale: 0.97 } : {}}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          Weiter
        </motion.button>
      </motion.div>
    </div>
  );
};

export default CompanionSelect;
