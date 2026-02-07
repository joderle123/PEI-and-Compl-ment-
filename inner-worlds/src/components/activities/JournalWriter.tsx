import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../../stores/gameStore';
import type { IslandId } from '../../types';
import { getCompanionEmoji } from '../../data/companions';

interface JournalWriterProps {
  prompt?: string;
  islandId?: IslandId;
  onComplete: () => void;
}

export default function JournalWriter({ prompt, islandId, onComplete }: JournalWriterProps) {
  const { companion, addJournalEntry, addXP } = useGameStore();
  const [text, setText] = useState('');

  const actualPrompt = prompt || 'Was nimmst du heute mit?';
  const actualIslandId = islandId || (sessionStorage.getItem('activeIslandId') as IslandId) || 'volcano';
  const companionEmoji = companion ? getCompanionEmoji(companion.type) : '🌟';

  const handleSave = () => {
    if (text.trim()) {
      addJournalEntry({
        date: new Date().toISOString(),
        prompt: actualPrompt,
        response: text,
        islandId: actualIslandId,
      });
      addXP(15);
    }
    onComplete();
  };

  return (
    <div className="h-screen bg-gradient-to-b from-[#faf3e8] to-[#f5e6d0] flex items-center justify-center p-6 overflow-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-lg w-full"
      >
        {/* Companion */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-4xl animate-float">{companionEmoji}</span>
          <div className="bg-white/80 rounded-2xl px-4 py-2 shadow">
            <p className="text-gray-700 font-medium">
              Nimm dir einen Moment, um über deine Erfahrung nachzudenken.
            </p>
          </div>
        </div>

        {/* Journal card */}
        <div className="bg-[#fffef5] rounded-2xl shadow-xl border border-[#e8dcc8] p-6 relative overflow-hidden">
          {/* Paper lines effect */}
          <div className="absolute inset-0 pointer-events-none opacity-10">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="border-b border-blue-300"
                style={{ height: '28px' }}
              />
            ))}
          </div>

          <div className="relative z-10">
            <h2 className="text-xl font-bold text-[#6C5CE7] mb-1">
              📓 Mein Reflexions-Tagebuch
            </h2>
            <p className="text-xs text-gray-400 mb-4">
              Nur du kannst das lesen. Deine Gedanken gehören dir.
            </p>

            {/* Prompt */}
            <div className="bg-[#6C5CE7]/10 rounded-xl p-3 mb-4">
              <p className="text-[#6C5CE7] font-semibold italic">&quot;{actualPrompt}&quot;</p>
            </div>

            {/* Text area */}
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Schreibe deine Gedanken hier..."
              className="w-full bg-transparent border-none outline-none resize-none text-gray-700 leading-7 min-h-[200px] text-lg"
              rows={8}
            />

            {/* Character count */}
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-gray-400">
                {text.length} Zeichen
              </span>
              {text.length > 0 && (
                <span className="text-xs text-green-500">✨ Toll, dass du schreibst!</span>
              )}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-6 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            className="bg-[#6C5CE7] text-white font-bold py-3 px-8 rounded-full shadow-lg"
          >
            {text.trim() ? '💾 Speichern' : 'Weiter →'}
          </motion.button>
          {text.trim() === '' && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onComplete}
              className="text-gray-400 font-semibold py-3 px-6 hover:text-gray-600"
            >
              Überspringen
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
