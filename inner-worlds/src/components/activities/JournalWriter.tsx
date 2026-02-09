// @ts-nocheck
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

// Island accent colors for theming
const ACCENT: Record<string, string> = {
  volcano: '#ff6b35',
  ocean: '#74b9ff',
  forest: '#55efc4',
  mountain: '#a29bfe',
  garden: '#fd79a8',
  night: '#6c5ce7',
  rainbow: '#ffeaa7',
  home: '#ffd700',
};

export default function JournalWriter({ prompt, islandId, onComplete }: JournalWriterProps) {
  const { companion, addJournalEntry, addXP } = useGameStore();
  const [text, setText] = useState('');
  const [saved, setSaved] = useState(false);

  const actualPrompt = prompt || 'Was nimmst du heute mit?';
  const actualIslandId = islandId || (sessionStorage.getItem('activeIslandId') as IslandId) || 'volcano';
  const companionEmoji = companion ? getCompanionEmoji(companion.type) : '\u{1F31F}';
  const accent = ACCENT[actualIslandId] || '#ffd700';

  const handleSave = () => {
    if (text.trim()) {
      addJournalEntry({
        date: new Date().toISOString(),
        prompt: actualPrompt,
        response: text,
        islandId: actualIslandId,
      });
      addXP(15);
      setSaved(true);
      setTimeout(onComplete, 800);
    } else {
      onComplete();
    }
  };

  return (
    <div
      className="h-screen flex flex-col items-center justify-center p-6 overflow-auto relative"
      style={{
        background: `
          radial-gradient(ellipse at 50% 30%, ${accent}08 0%, transparent 50%),
          linear-gradient(180deg, #0d0d1a 0%, #1a1530 40%, #0d0d1a 100%)
        `,
      }}
    >
      {/* Subtle glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.4) 100%)',
        }}
      />

      {/* Saved celebration overlay */}
      {saved && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="text-center"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 120 }}
          >
            <div className="text-4xl mb-2">{'\u2728'}</div>
            <div
              className="text-sm font-bold"
              style={{ color: '#ffd700', textShadow: '0 0 15px rgba(255,215,0,0.4)' }}
            >
              Gespeichert!
            </div>
          </motion.div>
        </motion.div>
      )}

      <motion.div
        className="max-w-md w-full relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Companion speech */}
        <div className="flex items-start gap-3 mb-6">
          <motion.div
            className="w-12 h-12 rounded-full flex items-center justify-center text-2xl shrink-0"
            style={{
              background: `${accent}15`,
              border: `1.5px solid ${accent}35`,
            }}
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            {companionEmoji}
          </motion.div>
          <div
            className="rounded-2xl rounded-tl-md px-4 py-3 text-sm leading-relaxed"
            style={{
              backgroundColor: `${accent}08`,
              border: `1px solid ${accent}15`,
              color: 'rgba(232,224,208,0.8)',
            }}
          >
            {actualPrompt}
          </div>
        </div>

        {/* Writing area */}
        <div
          className="rounded-2xl p-5 mb-4"
          style={{
            backgroundColor: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(201,168,76,0.12)',
          }}
        >
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Deine Gedanken..."
            className="w-full bg-transparent border-none outline-none resize-none leading-7 min-h-[180px] text-base"
            style={{ color: '#e8e0d0' }}
            rows={7}
            autoFocus
          />
          <p className="text-xs mt-2" style={{ color: 'rgba(160,152,136,0.4)' }}>
            Nur du kannst das lesen.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: '0 0 25px rgba(201,168,76,0.3)' }}
            whileTap={{ scale: 0.97 }}
            onClick={handleSave}
            className="flex-1 py-3 px-6 rounded-xl font-bold text-sm cursor-pointer"
            style={{
              background: text.trim()
                ? 'linear-gradient(135deg, #92600a, #b8860b, #daa520, #ffd700)'
                : `${accent}15`,
              color: text.trim() ? '#1a0a2e' : accent,
              border: text.trim() ? 'none' : `1px solid ${accent}30`,
              boxShadow: text.trim() ? '0 0 15px rgba(201,168,76,0.2)' : 'none',
            }}
          >
            {text.trim() ? 'Speichern & weiter' : 'Weiter'} {'\u2192'}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
