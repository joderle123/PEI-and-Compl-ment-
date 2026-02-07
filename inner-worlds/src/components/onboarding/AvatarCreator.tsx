import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../stores/gameStore';
import type { Avatar, GameScreen } from '../../types';

// ---------------------------------------------------------------------------
// Option data
// ---------------------------------------------------------------------------

const SKIN_COLORS = [
  { id: 'light-1', color: '#FDEBD0', label: 'Sehr hell' },
  { id: 'light-2', color: '#F5CBA7', label: 'Hell' },
  { id: 'medium-1', color: '#E0AC69', label: 'Mittel' },
  { id: 'medium-2', color: '#C68642', label: 'Mittel-dunkel' },
  { id: 'dark-1', color: '#8D5524', label: 'Dunkel' },
  { id: 'dark-2', color: '#5C3A1E', label: 'Sehr dunkel' },
];

const HAIR_STYLES = [
  { id: 'kurz', label: 'Kurz', emoji: '\uD83D\uDC87' },
  { id: 'lang', label: 'Lang', emoji: '\uD83D\uDC87\u200D\u2640\uFE0F' },
  { id: 'lockig', label: 'Lockig', emoji: '\uD83C\uDF00' },
  { id: 'zoepfe', label: 'Z\u00F6pfe', emoji: '\uD83C\uDF80' },
  { id: 'glatze', label: 'Glatze', emoji: '\uD83E\uDDD1\u200D\uD83E\uDDB2' },
  { id: 'undercut', label: 'Undercut', emoji: '\u2702\uFE0F' },
];

const HAIR_COLORS = [
  { id: 'blond', color: '#F7DC6F', label: 'Blond' },
  { id: 'braun', color: '#8B4513', label: 'Braun' },
  { id: 'schwarz', color: '#2C3E50', label: 'Schwarz' },
  { id: 'rot', color: '#E74C3C', label: 'Rot' },
  { id: 'blau', color: '#3498DB', label: 'Blau' },
  { id: 'gruen', color: '#2ECC71', label: 'Gr\u00FCn' },
];

const CLOTHING = [
  { id: 'tshirt', label: 'T-Shirt', emoji: '\uD83D\uDC55' },
  { id: 'hoodie', label: 'Hoodie', emoji: '\uD83E\uDDE5' },
  { id: 'kleid', label: 'Kleid', emoji: '\uD83D\uDC57' },
  { id: 'jacke', label: 'Jacke', emoji: '\uD83E\uDDE5' },
];

const ACCESSORIES = [
  { id: 'brille', label: 'Brille', emoji: '\uD83D\uDC53' },
  { id: 'kopfhoerer', label: 'Kopfh\u00F6rer', emoji: '\uD83C\uDFA7' },
  { id: 'kappe', label: 'Kappe', emoji: '\uD83E\uDDE2' },
  { id: 'rucksack', label: 'Rucksack', emoji: '\uD83C\uDF92' },
];

// ---------------------------------------------------------------------------
// Helper -- seeded random for deterministic star / ember layouts
// ---------------------------------------------------------------------------

const seededRandom = (seed: number): number => {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
};

// ---------------------------------------------------------------------------
// Framer Motion variants
// ---------------------------------------------------------------------------

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 260, damping: 22 },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 200, damping: 18, delay: 0.1 },
  },
};

// ---------------------------------------------------------------------------
// Section title sub-component
// ---------------------------------------------------------------------------

interface SectionTitleProps {
  children: React.ReactNode;
}

const SectionTitle = ({ children }: SectionTitleProps) => (
  <h3
    className="font-title text-sm tracking-[0.18em] uppercase mb-3"
    style={{
      color: '#e8d5a3',
      textShadow: '0 0 12px rgba(232,168,56,0.25)',
    }}
  >
    {children}
  </h3>
);

// ---------------------------------------------------------------------------
// Avatar preview sub-component
// ---------------------------------------------------------------------------

interface AvatarPreviewProps {
  skinColor: string;
  hairStyle: string;
  hairColor: string;
  clothing: string;
  accessories: string[];
  wheelchairOption: boolean;
  hijabOption: boolean;
}

const AvatarPreview = ({
  skinColor,
  hairStyle,
  hairColor,
  clothing,
  accessories,
  wheelchairOption,
  hijabOption,
}: AvatarPreviewProps) => {
  const skinColorValue =
    SKIN_COLORS.find((s) => s.id === skinColor)?.color ?? '#F5CBA7';
  const hairColorValue =
    HAIR_COLORS.find((h) => h.id === hairColor)?.color ?? '#8B4513';
  const hairEmoji =
    HAIR_STYLES.find((h) => h.id === hairStyle)?.emoji ?? '\uD83D\uDC87';
  const clothingEmoji =
    CLOTHING.find((c) => c.id === clothing)?.emoji ?? '\uD83D\uDC55';

  return (
    <motion.div
      className="relative flex flex-col items-center justify-center"
      layout
      transition={{ type: 'spring' as const, stiffness: 300, damping: 25 }}
    >
      {/* Ambient glow behind avatar */}
      <div
        className="absolute w-32 h-32 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, rgba(201,168,76,0.15) 0%, transparent 70%)`,
          filter: 'blur(20px)',
        }}
      />

      {/* Avatar body */}
      <div className="relative flex flex-col items-center">
        {/* Hair */}
        {!hijabOption && hairStyle !== 'glatze' && (
          <motion.div
            className="text-3xl -mb-3 z-10"
            key={hairStyle + hairColor}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring' as const, stiffness: 400 }}
          >
            <span
              style={{
                filter: `drop-shadow(0 0 4px ${hairColorValue})`,
              }}
            >
              {hairEmoji}
            </span>
          </motion.div>
        )}

        {/* Hijab */}
        {hijabOption && (
          <motion.div
            className="text-3xl -mb-3 z-10"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring' as const, stiffness: 400 }}
          >
            {'\uD83E\uDDD5'}
          </motion.div>
        )}

        {/* Face */}
        <motion.div
          className="w-20 h-20 rounded-full flex items-center justify-center text-4xl shadow-lg"
          style={{
            backgroundColor: skinColorValue,
            border: '3px solid rgba(201,168,76,0.4)',
            boxShadow: `0 0 20px rgba(201,168,76,0.15), inset 0 0 10px rgba(255,255,255,0.1)`,
          }}
          key={skinColor}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring' as const, stiffness: 400 }}
        >
          {'\uD83D\uDE0A'}
        </motion.div>

        {/* Clothing */}
        <motion.div
          className="text-4xl -mt-2"
          key={clothing}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring' as const, stiffness: 300 }}
        >
          {clothingEmoji}
        </motion.div>

        {/* Wheelchair */}
        {wheelchairOption && (
          <motion.div
            className="text-3xl -mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {'\u267F'}
          </motion.div>
        )}
      </div>

      {/* Accessories row */}
      <AnimatePresence>
        {accessories.length > 0 && (
          <motion.div
            className="flex gap-2 mt-2"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {accessories.map((accId) => {
              const acc = ACCESSORIES.find((a) => a.id === accId);
              return (
                <motion.span
                  key={accId}
                  className="text-2xl"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: 'spring' as const, stiffness: 400 }}
                >
                  {acc?.emoji}
                </motion.span>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hair color indicator */}
      {!hijabOption && hairStyle !== 'glatze' && (
        <div className="flex items-center gap-1.5 mt-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{
              backgroundColor: hairColorValue,
              border: '1px solid rgba(201,168,76,0.5)',
              boxShadow: `0 0 6px ${hairColorValue}66`,
            }}
          />
          <span
            className="text-xs"
            style={{ color: 'rgba(232,213,163,0.7)' }}
          >
            {HAIR_COLORS.find((h) => h.id === hairColor)?.label}
          </span>
        </div>
      )}
    </motion.div>
  );
};

// ---------------------------------------------------------------------------
// AvatarCreator
// ---------------------------------------------------------------------------

const AvatarCreator = () => {
  const { setAvatar, setScreen } = useGameStore();

  const [skinColor, setSkinColor] = useState('light-2');
  const [hairStyle, setHairStyle] = useState('kurz');
  const [hairColor, setHairColor] = useState('braun');
  const [clothing, setClothing] = useState('tshirt');
  const [accessories, setAccessories] = useState<string[]>([]);
  const [wheelchairOption, setWheelchairOption] = useState(false);
  const [hijabOption, setHijabOption] = useState(false);

  const toggleAccessory = (id: string) => {
    setAccessories((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id],
    );
  };

  const handleNext = () => {
    const avatar: Avatar = {
      skinColor,
      hairStyle,
      hairColor,
      clothing,
      accessories,
      wheelchairOption,
      hijabOption,
    };
    setAvatar(avatar);
    setScreen('onboarding-companion' as GameScreen);
  };

  // -------------------------------------------------------------------------
  // Memoised procedural background elements
  // -------------------------------------------------------------------------

  const stars = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        top: `${seededRandom(i * 3 + 50) * 92 + 2}%`,
        left: `${seededRandom(i * 3 + 51) * 96 + 2}%`,
        size: seededRandom(i * 3 + 52) * 2 + 1,
        duration: seededRandom(i * 7 + 53) * 3 + 2,
        delay: seededRandom(i * 7 + 54) * 5,
      })),
    [],
  );

  const embers = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        left: `${seededRandom(i * 5 + 150) * 90 + 5}%`,
        bottom: `${seededRandom(i * 5 + 151) * -10}%`,
        size: seededRandom(i * 5 + 152) * 3 + 2,
        duration: seededRandom(i * 5 + 153) * 6 + 6,
        delay: seededRandom(i * 5 + 154) * 8,
      })),
    [],
  );

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------

  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-b from-[#0d0015] via-[#1a0a2e] to-[#0a0a1a]">
      {/* ── Background layers ── */}

      {/* Vignette */}
      <div className="vignette absolute inset-0 pointer-events-none z-10" />

      {/* Star field */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {stars.map((s) => (
          <div
            key={`star-${s.id}`}
            className="star"
            style={{
              top: s.top,
              left: s.left,
              width: `${s.size}px`,
              height: `${s.size}px`,
              animationDuration: `${s.duration}s`,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Ember particles */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {embers.map((e) => (
          <div
            key={`ember-${e.id}`}
            className="ember"
            style={{
              left: e.left,
              bottom: e.bottom,
              width: `${e.size}px`,
              height: `${e.size}px`,
              animationDuration: `${e.duration}s`,
              animationDelay: `${e.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Fog layers */}
      <div className="fog-layer" style={{ opacity: 0.5 }} />
      <div
        className="fog-layer"
        style={{ animationDelay: '-10s', animationDuration: '28s', opacity: 0.3 }}
      />

      {/* Central ambient glow */}
      <div
        className="absolute pointer-events-none z-0"
        style={{
          width: '500px',
          height: '500px',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          background:
            'radial-gradient(circle, rgba(201,168,76,0.06) 0%, rgba(108,92,231,0.03) 40%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* ── Main scrollable content ── */}
      <div className="relative z-20 h-full w-full overflow-y-auto">
        <motion.div
          className="max-w-lg mx-auto px-4 py-8 sm:py-10 flex flex-col gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* ── Header ── */}
          <motion.div className="text-center" variants={titleVariants}>
            {/* Top ornament */}
            <motion.div
              className="mb-3 flex items-center justify-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="block w-10 h-px bg-gradient-to-r from-transparent to-amber-500/60" />
              <span className="text-amber-400/70 text-sm">{'\u2726'}</span>
              <span className="block w-10 h-px bg-gradient-to-l from-transparent to-amber-500/60" />
            </motion.div>

            <h1
              className="font-title text-golden text-2xl sm:text-3xl md:text-4xl tracking-wide animate-golden-glow"
              style={{
                filter: 'drop-shadow(0 0 20px rgba(201,168,76,0.25))',
              }}
            >
              Erstelle deinen Charakter
            </h1>

            <p
              className="mt-2 text-sm sm:text-base leading-relaxed max-w-sm mx-auto"
              style={{ color: 'rgba(232,213,163,0.6)' }}
            >
              Gestalte deinen Charakter so, wie du m&ouml;chtest!
            </p>

            {/* Bottom ornament */}
            <motion.div
              className="mt-3 flex items-center justify-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <span className="block w-14 h-px bg-gradient-to-r from-transparent to-amber-500/40" />
              <span style={{ color: 'rgba(201,168,76,0.5)', fontSize: '6px' }}>{'\u25C6'}</span>
              <span className="block w-14 h-px bg-gradient-to-l from-transparent to-amber-500/40" />
            </motion.div>
          </motion.div>

          {/* ── Avatar preview card ── */}
          <motion.div
            variants={itemVariants}
            className="self-center glass-panel rounded-2xl p-6 w-52 flex items-center justify-center"
            style={{
              border: '1px solid rgba(201,168,76,0.35)',
              boxShadow:
                '0 0 30px rgba(201,168,76,0.1), inset 0 0 40px rgba(201,168,76,0.03)',
            }}
          >
            <AvatarPreview
              skinColor={skinColor}
              hairStyle={hairStyle}
              hairColor={hairColor}
              clothing={clothing}
              accessories={accessories}
              wheelchairOption={wheelchairOption}
              hijabOption={hijabOption}
            />
          </motion.div>

          {/* ── Skin color ── */}
          <motion.section variants={itemVariants}>
            <SectionTitle>Hautfarbe</SectionTitle>
            <div className="grid grid-cols-6 gap-2">
              {SKIN_COLORS.map((sc) => (
                <motion.button
                  key={sc.id}
                  onClick={() => setSkinColor(sc.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-full aspect-square rounded-xl cursor-pointer transition-all duration-200"
                  style={{
                    backgroundColor: sc.color,
                    border:
                      skinColor === sc.id
                        ? '3px solid rgba(201,168,76,0.9)'
                        : '3px solid rgba(201,168,76,0.1)',
                    boxShadow:
                      skinColor === sc.id
                        ? '0 0 14px rgba(201,168,76,0.4), inset 0 0 6px rgba(255,255,255,0.15)'
                        : '0 0 4px rgba(0,0,0,0.3)',
                  }}
                  title={sc.label}
                />
              ))}
            </div>
          </motion.section>

          {/* ── Hair style ── */}
          <motion.section variants={itemVariants}>
            <SectionTitle>Frisur</SectionTitle>
            <div className="grid grid-cols-3 gap-2">
              {HAIR_STYLES.map((hs) => (
                <motion.button
                  key={hs.id}
                  onClick={() => setHairStyle(hs.id)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="glass-panel flex flex-col items-center py-3 px-3 rounded-xl cursor-pointer transition-all duration-200"
                  style={{
                    border:
                      hairStyle === hs.id
                        ? '2px solid rgba(201,168,76,0.8)'
                        : '2px solid rgba(201,168,76,0.1)',
                    boxShadow:
                      hairStyle === hs.id
                        ? '0 0 16px rgba(201,168,76,0.2), inset 0 0 12px rgba(201,168,76,0.05)'
                        : 'none',
                    background:
                      hairStyle === hs.id
                        ? 'rgba(201,168,76,0.08)'
                        : 'rgba(13,13,26,0.6)',
                  }}
                >
                  <span className="text-2xl">{hs.emoji}</span>
                  <span
                    className="text-xs font-semibold mt-1"
                    style={{
                      color:
                        hairStyle === hs.id
                          ? '#f0c674'
                          : 'rgba(232,213,163,0.6)',
                    }}
                  >
                    {hs.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.section>

          {/* ── Hair color ── */}
          <motion.section variants={itemVariants}>
            <SectionTitle>Haarfarbe</SectionTitle>
            <div className="grid grid-cols-6 gap-2">
              {HAIR_COLORS.map((hc) => (
                <motion.button
                  key={hc.id}
                  onClick={() => setHairColor(hc.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-full aspect-square rounded-xl cursor-pointer transition-all duration-200"
                  style={{
                    backgroundColor: hc.color,
                    border:
                      hairColor === hc.id
                        ? '3px solid rgba(201,168,76,0.9)'
                        : '3px solid rgba(201,168,76,0.1)',
                    boxShadow:
                      hairColor === hc.id
                        ? '0 0 14px rgba(201,168,76,0.4), inset 0 0 6px rgba(255,255,255,0.15)'
                        : '0 0 4px rgba(0,0,0,0.3)',
                  }}
                  title={hc.label}
                />
              ))}
            </div>
          </motion.section>

          {/* ── Clothing ── */}
          <motion.section variants={itemVariants}>
            <SectionTitle>Kleidung</SectionTitle>
            <div className="grid grid-cols-4 gap-2">
              {CLOTHING.map((c) => (
                <motion.button
                  key={c.id}
                  onClick={() => setClothing(c.id)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="glass-panel flex flex-col items-center py-3 px-2 rounded-xl cursor-pointer transition-all duration-200"
                  style={{
                    border:
                      clothing === c.id
                        ? '2px solid rgba(201,168,76,0.8)'
                        : '2px solid rgba(201,168,76,0.1)',
                    boxShadow:
                      clothing === c.id
                        ? '0 0 16px rgba(201,168,76,0.2), inset 0 0 12px rgba(201,168,76,0.05)'
                        : 'none',
                    background:
                      clothing === c.id
                        ? 'rgba(201,168,76,0.08)'
                        : 'rgba(13,13,26,0.6)',
                  }}
                >
                  <span className="text-2xl">{c.emoji}</span>
                  <span
                    className="text-xs font-semibold mt-1"
                    style={{
                      color:
                        clothing === c.id
                          ? '#f0c674'
                          : 'rgba(232,213,163,0.6)',
                    }}
                  >
                    {c.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.section>

          {/* ── Accessories ── */}
          <motion.section variants={itemVariants}>
            <SectionTitle>Accessoires</SectionTitle>
            <div className="grid grid-cols-2 gap-2">
              {ACCESSORIES.map((acc) => {
                const isSelected = accessories.includes(acc.id);
                return (
                  <motion.button
                    key={acc.id}
                    onClick={() => toggleAccessory(acc.id)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="glass-panel flex items-center gap-2 py-3 px-3 rounded-xl cursor-pointer transition-all duration-200"
                    style={{
                      border: isSelected
                        ? '2px solid rgba(201,168,76,0.8)'
                        : '2px solid rgba(201,168,76,0.1)',
                      boxShadow: isSelected
                        ? '0 0 16px rgba(201,168,76,0.2), inset 0 0 12px rgba(201,168,76,0.05)'
                        : 'none',
                      background: isSelected
                        ? 'rgba(201,168,76,0.08)'
                        : 'rgba(13,13,26,0.6)',
                    }}
                  >
                    <span className="text-xl">{acc.emoji}</span>
                    <span
                      className="text-sm font-semibold"
                      style={{
                        color: isSelected
                          ? '#f0c674'
                          : 'rgba(232,213,163,0.6)',
                      }}
                    >
                      {acc.label}
                    </span>
                    {isSelected && (
                      <motion.span
                        className="ml-auto text-sm font-bold"
                        style={{ color: '#c9a84c' }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring' as const, stiffness: 400 }}
                      >
                        {'\u2713'}
                      </motion.span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.section>

          {/* ── Toggles: wheelchair & hijab ── */}
          <motion.section className="flex flex-col gap-3" variants={itemVariants}>
            <SectionTitle>Weitere Optionen</SectionTitle>

            {/* Wheelchair toggle */}
            <button
              onClick={() => setWheelchairOption((v) => !v)}
              className="glass-panel flex items-center gap-3 py-3 px-4 rounded-xl cursor-pointer transition-all duration-200"
              style={{
                border: wheelchairOption
                  ? '2px solid rgba(201,168,76,0.8)'
                  : '2px solid rgba(201,168,76,0.1)',
                boxShadow: wheelchairOption
                  ? '0 0 16px rgba(201,168,76,0.15)'
                  : 'none',
                background: wheelchairOption
                  ? 'rgba(201,168,76,0.08)'
                  : 'rgba(13,13,26,0.6)',
              }}
            >
              <span className="text-2xl">{'\u267F'}</span>
              <span
                className="text-sm font-semibold"
                style={{
                  color: wheelchairOption
                    ? '#f0c674'
                    : 'rgba(232,213,163,0.6)',
                }}
              >
                Rollstuhl
              </span>
              <div
                className="ml-auto w-10 h-6 rounded-full flex items-center transition-all duration-300"
                style={{
                  background: wheelchairOption
                    ? 'linear-gradient(135deg, #c9a84c, #e8a838)'
                    : 'rgba(255,255,255,0.1)',
                  justifyContent: wheelchairOption ? 'flex-end' : 'flex-start',
                  boxShadow: wheelchairOption
                    ? '0 0 10px rgba(201,168,76,0.4)'
                    : 'none',
                }}
              >
                <motion.div
                  className="w-5 h-5 rounded-full shadow mx-0.5"
                  style={{
                    background: wheelchairOption
                      ? '#fff'
                      : 'rgba(232,213,163,0.5)',
                  }}
                  layout
                  transition={{ type: 'spring' as const, stiffness: 500, damping: 30 }}
                />
              </div>
            </button>

            {/* Hijab toggle */}
            <button
              onClick={() => setHijabOption((v) => !v)}
              className="glass-panel flex items-center gap-3 py-3 px-4 rounded-xl cursor-pointer transition-all duration-200"
              style={{
                border: hijabOption
                  ? '2px solid rgba(201,168,76,0.8)'
                  : '2px solid rgba(201,168,76,0.1)',
                boxShadow: hijabOption
                  ? '0 0 16px rgba(201,168,76,0.15)'
                  : 'none',
                background: hijabOption
                  ? 'rgba(201,168,76,0.08)'
                  : 'rgba(13,13,26,0.6)',
              }}
            >
              <span className="text-2xl">{'\uD83E\uDDD5'}</span>
              <span
                className="text-sm font-semibold"
                style={{
                  color: hijabOption
                    ? '#f0c674'
                    : 'rgba(232,213,163,0.6)',
                }}
              >
                Hijab
              </span>
              <div
                className="ml-auto w-10 h-6 rounded-full flex items-center transition-all duration-300"
                style={{
                  background: hijabOption
                    ? 'linear-gradient(135deg, #c9a84c, #e8a838)'
                    : 'rgba(255,255,255,0.1)',
                  justifyContent: hijabOption ? 'flex-end' : 'flex-start',
                  boxShadow: hijabOption
                    ? '0 0 10px rgba(201,168,76,0.4)'
                    : 'none',
                }}
              >
                <motion.div
                  className="w-5 h-5 rounded-full shadow mx-0.5"
                  style={{
                    background: hijabOption
                      ? '#fff'
                      : 'rgba(232,213,163,0.5)',
                  }}
                  layout
                  transition={{ type: 'spring' as const, stiffness: 500, damping: 30 }}
                />
              </div>
            </button>
          </motion.section>

          {/* ── "Weiter" button ── */}
          <motion.div
            className="pt-2 pb-8 flex justify-center"
            variants={itemVariants}
          >
            <motion.button
              onClick={handleNext}
              whileHover={{
                scale: 1.04,
                boxShadow:
                  '0 0 30px rgba(201,168,76,0.3), 0 0 60px rgba(201,168,76,0.12), inset 0 0 20px rgba(201,168,76,0.05)',
              }}
              whileTap={{ scale: 0.96 }}
              className="glass-panel ornate-border w-full max-w-xs py-4 rounded-2xl font-title font-bold text-lg tracking-wider uppercase cursor-pointer transition-all duration-300"
              style={{
                borderColor: 'rgba(201,168,76,0.5)',
                color: '#f0c674',
                textShadow: '0 0 12px rgba(232,168,56,0.3)',
                boxShadow:
                  '0 0 20px rgba(201,168,76,0.15), 0 0 40px rgba(201,168,76,0.06)',
              }}
            >
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
                style={{ borderRadius: 'inherit' }}
              >
                <motion.div
                  className="w-full h-full"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.08) 50%, transparent 100%)',
                  }}
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </motion.div>
              <span className="relative z-[1]">Weiter</span>
            </motion.button>
          </motion.div>

          {/* Bottom spacer */}
          <div className="h-4" />
        </motion.div>
      </div>
    </div>
  );
};

export default AvatarCreator;
