import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../stores/gameStore';

const questions = [
  {
    question: 'Was fällt dir leicht?',
    options: ['Mit anderen reden', 'Alleine nachdenken', 'Kreativ sein', 'Anderen helfen'],
  },
  {
    question: 'Was ist manchmal schwer?',
    options: [
      'Meine Wut kontrollieren',
      'Über Gefühle reden',
      'Neue Leute kennenlernen',
      'Stillsitzen und warten',
    ],
  },
  {
    question: 'Wenn du gestresst bist...',
    options: [
      'Rede ich mit jemandem',
      'Ziehe ich mich zurück',
      'Werde ich wütend',
      'Bewege ich mich',
    ],
  },
  {
    question: 'Ich fühle mich stark, wenn...',
    options: [
      'Ich jemandem helfe',
      'Ich etwas schaffe',
      'Ich kreativ bin',
      'Ich mit Freunden bin',
    ],
  },
  {
    question: 'Für mich ist am wichtigsten...',
    options: ['Gerechtigkeit', 'Freundschaft', 'Freiheit', 'Sicherheit'],
  },
];

export default function SelfAssessment() {
  const { companion, completeOnboarding } = useGameStore();
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);

  const companionEmoji =
    companion?.type === 'wolf'
      ? '🐺'
      : companion?.type === 'owl'
        ? '🦉'
        : companion?.type === 'fox'
          ? '🦊'
          : '🐢';

  const handleSelect = (option: string) => {
    setSelected((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    );
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ((q) => q + 1);
      setSelected([]);
    } else {
      completeOnboarding();
    }
  };

  const q = questions[currentQ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#a29bfe] to-[#81ECEC] flex flex-col items-center justify-center p-6 overflow-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <h1 className="text-3xl font-extrabold text-white drop-shadow mb-2">
          Erzähl mir von dir...
        </h1>
        <p className="text-white/90 text-lg">
          Keine Sorge, es gibt keine richtigen oder falschen Antworten!
        </p>
      </motion.div>

      {/* Progress dots */}
      <div className="flex gap-2 mb-8">
        {questions.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all ${
              i === currentQ
                ? 'bg-white scale-125'
                : i < currentQ
                  ? 'bg-white/80'
                  : 'bg-white/30'
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="bg-white/90 backdrop-blur rounded-3xl p-8 max-w-lg w-full shadow-xl"
        >
          {/* Companion asking */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">{companionEmoji}</span>
            <div className="bg-[#6C5CE7]/10 rounded-2xl px-4 py-2 text-[#6C5CE7] font-semibold">
              {q.question}
            </div>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 gap-3">
            {q.options.map((option) => (
              <motion.button
                key={option}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelect(option)}
                className={`p-4 rounded-2xl text-left font-semibold transition-all border-2 ${
                  selected.includes(option)
                    ? 'border-[#6C5CE7] bg-[#6C5CE7]/10 text-[#6C5CE7]'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-[#6C5CE7]/50'
                }`}
              >
                <span className="mr-2">{selected.includes(option) ? '✓' : '○'}</span>
                {option}
              </motion.button>
            ))}
          </div>

          <p className="text-sm text-gray-400 mt-4 text-center">
            Du kannst mehrere Antworten wählen
          </p>
        </motion.div>
      </AnimatePresence>

      <div className="flex gap-4 mt-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
          className="bg-white text-[#6C5CE7] font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all"
        >
          {currentQ === questions.length - 1 ? '🚀 Abenteuer starten!' : 'Weiter →'}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
          className="text-white/70 font-semibold py-3 px-6 hover:text-white transition-all"
        >
          Überspringen
        </motion.button>
      </div>
    </div>
  );
}
