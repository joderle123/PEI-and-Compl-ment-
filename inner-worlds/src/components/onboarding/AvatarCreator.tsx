import { useState } from 'react';
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
  { id: 'kurz', label: 'Kurz', emoji: '💇' },
  { id: 'lang', label: 'Lang', emoji: '💇‍♀️' },
  { id: 'lockig', label: 'Lockig', emoji: '🌀' },
  { id: 'zoepfe', label: 'Zöpfe', emoji: '🎀' },
  { id: 'glatze', label: 'Glatze', emoji: '🧑‍🦲' },
  { id: 'undercut', label: 'Undercut', emoji: '✂️' },
];

const HAIR_COLORS = [
  { id: 'blond', color: '#F7DC6F', label: 'Blond' },
  { id: 'braun', color: '#8B4513', label: 'Braun' },
  { id: 'schwarz', color: '#2C3E50', label: 'Schwarz' },
  { id: 'rot', color: '#E74C3C', label: 'Rot' },
  { id: 'blau', color: '#3498DB', label: 'Blau' },
  { id: 'gruen', color: '#2ECC71', label: 'Grün' },
];

const CLOTHING = [
  { id: 'tshirt', label: 'T-Shirt', emoji: '👕' },
  { id: 'hoodie', label: 'Hoodie', emoji: '🧥' },
  { id: 'kleid', label: 'Kleid', emoji: '👗' },
  { id: 'jacke', label: 'Jacke', emoji: '🧥' },
];

const ACCESSORIES = [
  { id: 'brille', label: 'Brille', emoji: '👓' },
  { id: 'kopfhoerer', label: 'Kopfhörer', emoji: '🎧' },
  { id: 'kappe', label: 'Kappe', emoji: '🧢' },
  { id: 'rucksack', label: 'Rucksack', emoji: '🎒' },
];

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

interface SectionTitleProps {
  children: React.ReactNode;
}

const SectionTitle = ({ children }: SectionTitleProps) => (
  <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-2">
    {children}
  </h3>
);

// ---------------------------------------------------------------------------
// Avatar preview
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
  const skinColorValue = SKIN_COLORS.find((s) => s.id === skinColor)?.color ?? '#F5CBA7';
  const hairColorValue = HAIR_COLORS.find((h) => h.id === hairColor)?.color ?? '#8B4513';
  const hairEmoji = HAIR_STYLES.find((h) => h.id === hairStyle)?.emoji ?? '💇';
  const clothingEmoji = CLOTHING.find((c) => c.id === clothing)?.emoji ?? '👕';

  return (
    <motion.div
      className="relative flex flex-col items-center justify-center"
      layout
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      {/* Avatar body */}
      <div className="relative flex flex-col items-center">
        {/* Hair */}
        {!hijabOption && hairStyle !== 'glatze' && (
          <motion.div
            className="text-3xl -mb-3 z-10"
            key={hairStyle + hairColor}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <span
              style={{
                filter: `drop-shadow(0 0 2px ${hairColorValue})`,
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
          >
            🧕
          </motion.div>
        )}

        {/* Face */}
        <motion.div
          className="w-20 h-20 rounded-full flex items-center justify-center text-4xl shadow-lg border-4 border-white/50"
          style={{ backgroundColor: skinColorValue }}
          key={skinColor}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          😊
        </motion.div>

        {/* Clothing */}
        <motion.div
          className="text-4xl -mt-2"
          key={clothing}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          {clothingEmoji}
        </motion.div>

        {/* Wheelchair */}
        {wheelchairOption && (
          <motion.div
            className="text-3xl -mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            ♿
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
                  transition={{ type: 'spring', stiffness: 400 }}
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
        <div className="flex items-center gap-1 mt-2">
          <div
            className="w-3 h-3 rounded-full border border-white/60"
            style={{ backgroundColor: hairColorValue }}
          />
          <span className="text-xs text-text-light">
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

  return (
    <div className="h-full w-full overflow-y-auto bg-gradient-to-b from-bg via-white to-primary-light/20">
      <motion.div
        className="max-w-lg mx-auto px-4 py-8 flex flex-col gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="text-center">
          <motion.h1
            className="text-3xl font-extrabold text-primary"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Erstelle deinen Charakter
          </motion.h1>
          <p className="text-text-light mt-1 text-sm">
            Gestalte deinen Charakter so, wie du m&ouml;chtest!
          </p>
        </div>

        {/* Avatar preview card */}
        <motion.div
          className="self-center bg-white rounded-3xl shadow-lg p-6 w-52 flex items-center justify-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 250 }}
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

        {/* Skin color */}
        <motion.section
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25 }}
        >
          <SectionTitle>Hautfarbe</SectionTitle>
          <div className="grid grid-cols-6 gap-2">
            {SKIN_COLORS.map((sc) => (
              <button
                key={sc.id}
                onClick={() => setSkinColor(sc.id)}
                className={`w-full aspect-square rounded-xl border-3 transition-all cursor-pointer ${
                  skinColor === sc.id
                    ? 'border-primary scale-110 shadow-md'
                    : 'border-transparent hover:border-primary-light'
                }`}
                style={{ backgroundColor: sc.color }}
                title={sc.label}
              />
            ))}
          </div>
        </motion.section>

        {/* Hair style */}
        <motion.section
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <SectionTitle>Frisur</SectionTitle>
          <div className="grid grid-cols-3 gap-2">
            {HAIR_STYLES.map((hs) => (
              <button
                key={hs.id}
                onClick={() => setHairStyle(hs.id)}
                className={`flex flex-col items-center py-2 px-3 rounded-xl border-2 transition-all cursor-pointer ${
                  hairStyle === hs.id
                    ? 'border-primary bg-primary/10 shadow-sm'
                    : 'border-gray-200 hover:border-primary-light bg-white'
                }`}
              >
                <span className="text-2xl">{hs.emoji}</span>
                <span className="text-xs font-semibold mt-1 text-text">{hs.label}</span>
              </button>
            ))}
          </div>
        </motion.section>

        {/* Hair color */}
        <motion.section
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
        >
          <SectionTitle>Haarfarbe</SectionTitle>
          <div className="grid grid-cols-6 gap-2">
            {HAIR_COLORS.map((hc) => (
              <button
                key={hc.id}
                onClick={() => setHairColor(hc.id)}
                className={`w-full aspect-square rounded-xl border-3 transition-all cursor-pointer ${
                  hairColor === hc.id
                    ? 'border-primary scale-110 shadow-md'
                    : 'border-transparent hover:border-primary-light'
                }`}
                style={{ backgroundColor: hc.color }}
                title={hc.label}
              />
            ))}
          </div>
        </motion.section>

        {/* Clothing */}
        <motion.section
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <SectionTitle>Kleidung</SectionTitle>
          <div className="grid grid-cols-4 gap-2">
            {CLOTHING.map((c) => (
              <button
                key={c.id}
                onClick={() => setClothing(c.id)}
                className={`flex flex-col items-center py-2 px-2 rounded-xl border-2 transition-all cursor-pointer ${
                  clothing === c.id
                    ? 'border-primary bg-primary/10 shadow-sm'
                    : 'border-gray-200 hover:border-primary-light bg-white'
                }`}
              >
                <span className="text-2xl">{c.emoji}</span>
                <span className="text-xs font-semibold mt-1 text-text">{c.label}</span>
              </button>
            ))}
          </div>
        </motion.section>

        {/* Accessories */}
        <motion.section
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.45 }}
        >
          <SectionTitle>Accessoires</SectionTitle>
          <div className="grid grid-cols-2 gap-2">
            {ACCESSORIES.map((acc) => (
              <button
                key={acc.id}
                onClick={() => toggleAccessory(acc.id)}
                className={`flex items-center gap-2 py-2 px-3 rounded-xl border-2 transition-all cursor-pointer ${
                  accessories.includes(acc.id)
                    ? 'border-primary bg-primary/10 shadow-sm'
                    : 'border-gray-200 hover:border-primary-light bg-white'
                }`}
              >
                <span className="text-xl">{acc.emoji}</span>
                <span className="text-sm font-semibold text-text">{acc.label}</span>
                {accessories.includes(acc.id) && (
                  <span className="ml-auto text-primary text-sm font-bold">&#10003;</span>
                )}
              </button>
            ))}
          </div>
        </motion.section>

        {/* Toggles: wheelchair & hijab */}
        <motion.section
          className="flex flex-col gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <SectionTitle>Weitere Optionen</SectionTitle>

          {/* Wheelchair toggle */}
          <button
            onClick={() => setWheelchairOption((v) => !v)}
            className={`flex items-center gap-3 py-3 px-4 rounded-xl border-2 transition-all cursor-pointer ${
              wheelchairOption
                ? 'border-primary bg-primary/10'
                : 'border-gray-200 bg-white hover:border-primary-light'
            }`}
          >
            <span className="text-2xl">&#9855;</span>
            <span className="text-sm font-semibold text-text">Rollstuhl</span>
            <div
              className={`ml-auto w-10 h-6 rounded-full flex items-center transition-colors ${
                wheelchairOption ? 'bg-primary justify-end' : 'bg-gray-300 justify-start'
              }`}
            >
              <div className="w-5 h-5 bg-white rounded-full shadow mx-0.5" />
            </div>
          </button>

          {/* Hijab toggle */}
          <button
            onClick={() => setHijabOption((v) => !v)}
            className={`flex items-center gap-3 py-3 px-4 rounded-xl border-2 transition-all cursor-pointer ${
              hijabOption
                ? 'border-primary bg-primary/10'
                : 'border-gray-200 bg-white hover:border-primary-light'
            }`}
          >
            <span className="text-2xl">&#129493;</span>
            <span className="text-sm font-semibold text-text">Hijab</span>
            <div
              className={`ml-auto w-10 h-6 rounded-full flex items-center transition-colors ${
                hijabOption ? 'bg-primary justify-end' : 'bg-gray-300 justify-start'
              }`}
            >
              <div className="w-5 h-5 bg-white rounded-full shadow mx-0.5" />
            </div>
          </button>
        </motion.section>

        {/* Next button */}
        <motion.div
          className="pt-2 pb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
        >
          <motion.button
            onClick={handleNext}
            className="w-full py-4 rounded-2xl bg-primary text-white font-bold text-lg shadow-lg hover:bg-primary-dark cursor-pointer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Weiter
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AvatarCreator;
