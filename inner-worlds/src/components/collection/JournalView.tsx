import { motion } from 'framer-motion';
import { useGameStore } from '../../stores/gameStore';
import { formatDate } from '../../utils/accessibility';

// ---------------------------------------------------------------------------
// Island visual data for dark fantasy theme
// ---------------------------------------------------------------------------

const islandEmojis: Record<string, string> = {
  volcano: '\u{1F30B}',
  ocean: '\u{1F30A}',
  forest: '\u{1F33F}',
  mountain: '\u{1F3D4}\uFE0F',
  garden: '\u{1F338}',
  night: '\u{1F319}',
  rainbow: '\u{1F308}',
  home: '\u{1F3E0}',
};

const islandAccentColors: Record<string, { border: string; glow: string; text: string }> = {
  volcano: { border: 'rgba(255,69,0,0.4)', glow: 'rgba(255,69,0,0.15)', text: '#ff8c55' },
  ocean: { border: 'rgba(30,144,255,0.4)', glow: 'rgba(30,144,255,0.15)', text: '#5eb8ff' },
  forest: { border: 'rgba(0,184,148,0.4)', glow: 'rgba(0,184,148,0.15)', text: '#5ee8c0' },
  mountain: { border: 'rgba(108,92,231,0.4)', glow: 'rgba(108,92,231,0.15)', text: '#a89cf5' },
  garden: { border: 'rgba(253,121,168,0.4)', glow: 'rgba(253,121,168,0.15)', text: '#fda5c0' },
  night: { border: 'rgba(100,120,180,0.4)', glow: 'rgba(100,120,180,0.15)', text: '#98aedd' },
  rainbow: { border: 'rgba(232,67,147,0.4)', glow: 'rgba(232,67,147,0.15)', text: '#f098c0' },
  home: { border: 'rgba(253,203,110,0.4)', glow: 'rgba(253,203,110,0.15)', text: '#fdd98e' },
};

const defaultAccent = { border: 'rgba(201,168,76,0.3)', glow: 'rgba(201,168,76,0.1)', text: '#c9a84c' };

export default function JournalView() {
  const { journalEntries, settings, setScreen } = useGameStore();

  const sortedEntries = [...journalEntries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <div
      className="h-screen overflow-auto"
      style={{
        background: `
          radial-gradient(ellipse 80% 60% at 50% 20%, rgba(45,27,78,0.5) 0%, transparent 70%),
          linear-gradient(180deg, #0d0d1a 0%, #1a0a2e 50%, #0d0d1a 100%)
        `,
      }}
    >
      <div className="max-w-2xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setScreen('island-map')}
            className="glass-panel px-4 py-2 rounded-xl text-sm font-title font-semibold cursor-pointer"
            style={{
              border: '1px solid rgba(201,168,76,0.3)',
              color: '#c9a84c',
            }}
          >
            {'\u2190'} Zur{'\u00FC'}ck
          </motion.button>
        </div>

        <div className="text-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-title font-bold mb-2"
            style={{
              color: '#ffd700',
              textShadow: '0 0 20px rgba(255,215,0,0.3)',
            }}
          >
            {'\u{1F4D3}'} Mein Reflexions-Tagebuch
          </motion.h1>
          <p style={{ color: 'rgba(232,213,163,0.6)' }}>
            Nur du kannst das lesen. Deine Gedanken geh{'\u00F6'}ren dir.
          </p>
        </div>

        {/* Ornamental divider */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div
            className="flex-1 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)' }}
          />
          <div
            className="w-1.5 h-1.5 rotate-45"
            style={{ background: 'rgba(201,168,76,0.5)' }}
          />
          <div
            className="flex-1 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)' }}
          />
        </div>

        {/* Entries */}
        {sortedEntries.length > 0 ? (
          <div className="space-y-4">
            {sortedEntries.map((entry, i) => {
              const accent = islandAccentColors[entry.islandId] || defaultAccent;
              return (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass-panel rounded-2xl p-5"
                  style={{
                    borderLeft: `3px solid ${accent.border}`,
                    border: `1px solid rgba(201,168,76,0.15)`,
                    borderLeftWidth: '3px',
                    borderLeftColor: accent.border,
                    boxShadow: `0 0 15px ${accent.glow}`,
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="text-xs font-title"
                      style={{ color: 'rgba(201,168,76,0.5)' }}
                    >
                      {formatDate(entry.date, settings.language)}
                    </span>
                    <span className="text-sm">
                      {islandEmojis[entry.islandId] || '\u{1F31F}'}
                    </span>
                  </div>
                  <p
                    className="text-sm font-title font-semibold italic mb-2"
                    style={{ color: accent.text }}
                  >
                    &ldquo;{entry.prompt}&rdquo;
                  </p>
                  <p className="leading-relaxed" style={{ color: '#e8e0d0' }}>
                    {entry.response}
                  </p>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-12"
          >
            <span className="text-5xl block mb-4">{'\u{1F4D3}'}</span>
            <p
              className="text-lg font-title"
              style={{ color: 'rgba(232,213,163,0.6)' }}
            >
              Du hast noch keine Eintr{'\u00E4'}ge.
            </p>
            <p className="mt-2" style={{ color: 'rgba(201,168,76,0.4)' }}>
              Spiele Geschichten und schreibe deine Reflexionen auf!
            </p>
          </motion.div>
        )}

        <div className="h-20" />
      </div>
    </div>
  );
}
