import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../../stores/gameStore';
import { Mood } from '../../types';
import EmotionWheel from '../common/EmotionWheel';
import { getTimeOfDayGreeting } from '../../utils/accessibility';
import { getCompanionEmoji } from '../../data/companions';

const moodResponses: Record<string, string> = {
  happy: 'Schön, dass es dir gut geht! 🌟',
  sad: 'Es ist okay, so zu fühlen. Ich bin bei dir. 💙',
  angry: 'Danke, dass du das mit mir teilst. Zusammen schaffen wir das.',
  anxious: 'Du bist nicht allein. Atme tief durch – ich bin hier.',
  calm: 'Wunderbar! Ein ruhiger Geist ist eine Superkraft. ✨',
  confused: 'Das ist völlig okay. Manchmal brauchen Dinge Zeit.',
  excited: 'Deine Energie ist ansteckend! Lass uns loslegen! 🎉',
  tired: 'Hör auf deinen Körper. Wir nehmen es heute ruhig.',
  lonely: 'Du bist nicht allein – ich bin immer hier für dich. 🤗',
  proud: 'Du hast allen Grund stolz zu sein! Feiere das! 🥳',
  frustrated: 'Frustration zeigt, dass dir etwas wichtig ist. Das ist Stärke.',
  hopeful: 'Hoffnung ist der erste Schritt zu etwas Großartigem! 🌈',
};

export default function MoodCheckIn() {
  const { companion, setCurrentMood, setScreen, settings } = useGameStore();
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [note, setNote] = useState('');

  const greeting = getTimeOfDayGreeting(settings.language);
  const companionEmoji = companion ? getCompanionEmoji(companion.type) : '🌟';

  const handleContinue = () => {
    if (selectedMood) {
      setCurrentMood(selectedMood, note || undefined);
    }
    setScreen('island-map');
  };

  const handleSkip = () => {
    setScreen('island-map');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFEAA7] to-[#FAB1A0] flex flex-col items-center justify-center p-6 overflow-auto">
      {/* Companion greeting */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-6"
      >
        <span className="text-5xl animate-float">{companionEmoji}</span>
        <div className="bg-white/80 backdrop-blur rounded-2xl px-5 py-3 shadow-lg">
          <p className="font-bold text-[#6C5CE7]">
            {greeting}, {companion?.name ? `mit ${companion.name}` : 'Abenteurer'}!
          </p>
          <p className="text-gray-600 text-sm">Schön, dass du wieder da bist.</p>
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-3xl font-extrabold text-white drop-shadow mb-2 text-center"
      >
        Wie geht es dir gerade?
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-white/80 mb-8 text-center"
      >
        Du musst nichts teilen, wenn du nicht möchtest.
      </motion.p>

      {/* Emotion Wheel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7 }}
      >
        <EmotionWheel
          onSelect={(mood) => setSelectedMood(mood)}
          selectedMood={selectedMood ?? undefined}
        />
      </motion.div>

      {/* Companion response */}
      {selectedMood && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 bg-white/80 backdrop-blur rounded-2xl px-5 py-3 shadow max-w-md text-center"
        >
          <span className="text-2xl mr-2">{companionEmoji}</span>
          <span className="text-gray-700 font-medium">
            {moodResponses[selectedMood] || 'Danke fürs Teilen!'}
          </span>
        </motion.div>
      )}

      {/* Optional note */}
      {selectedMood && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 w-full max-w-md"
        >
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Möchtest du noch etwas dazu sagen? (optional)"
            className="w-full p-4 rounded-2xl border-2 border-white/50 bg-white/60 backdrop-blur text-gray-700 placeholder-gray-400 resize-none focus:outline-none focus:border-[#6C5CE7]"
            rows={3}
          />
        </motion.div>
      )}

      {/* Buttons */}
      <div className="flex gap-4 mt-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleContinue}
          className="bg-white text-[#6C5CE7] font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all"
        >
          Weiter →
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSkip}
          className="text-white/70 font-semibold py-3 px-6 hover:text-white transition-all"
        >
          Überspringen
        </motion.button>
      </div>
    </div>
  );
}
