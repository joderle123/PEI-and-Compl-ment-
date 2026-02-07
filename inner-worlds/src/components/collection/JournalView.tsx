import { motion } from 'framer-motion';
import { useGameStore } from '../../stores/gameStore';
import { formatDate } from '../../utils/accessibility';

const islandEmojis: Record<string, string> = {
  volcano: '🌋',
  ocean: '🌊',
  forest: '🌿',
  mountain: '🏔️',
  garden: '🌸',
  night: '🌙',
  rainbow: '🌈',
  home: '🏠',
};

const islandColors: Record<string, string> = {
  volcano: '#e17055',
  ocean: '#0984e3',
  forest: '#00b894',
  mountain: '#6c5ce7',
  garden: '#fd79a8',
  night: '#2d3436',
  rainbow: '#e84393',
  home: '#fdcb6e',
};

export default function JournalView() {
  const { journalEntries, settings, setScreen } = useGameStore();

  const sortedEntries = [...journalEntries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="h-screen bg-gradient-to-b from-[#faf3e8] to-[#f5e6d0] overflow-auto">
      <div className="max-w-2xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setScreen('island-map')}
            className="px-4 py-2 bg-white/80 backdrop-blur rounded-full shadow text-gray-700 font-semibold"
          >
            ← Zurück
          </motion.button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-[#6C5CE7] mb-2">
            📓 Mein Reflexions-Tagebuch
          </h1>
          <p className="text-gray-500">
            Nur du kannst das lesen. Deine Gedanken gehören dir.
          </p>
        </div>

        {/* Entries */}
        {sortedEntries.length > 0 ? (
          <div className="space-y-4">
            {sortedEntries.map((entry, i) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-[#fffef5] rounded-2xl shadow border border-[#e8dcc8] p-5 border-l-4"
                style={{ borderLeftColor: islandColors[entry.islandId] || '#6c5ce7' }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-400">
                    {formatDate(entry.date, settings.language)}
                  </span>
                  <span className="text-sm">
                    {islandEmojis[entry.islandId] || '🌟'}
                  </span>
                </div>
                <p className="text-sm text-[#6C5CE7] font-semibold italic mb-2">
                  &quot;{entry.prompt}&quot;
                </p>
                <p className="text-gray-700 leading-relaxed">{entry.response}</p>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-12"
          >
            <span className="text-5xl block mb-4">📓</span>
            <p className="text-gray-500 text-lg">
              Du hast noch keine Einträge.
            </p>
            <p className="text-gray-400 mt-2">
              Spiele Geschichten und schreibe deine Reflexionen auf!
            </p>
          </motion.div>
        )}

        <div className="h-20" />
      </div>
    </div>
  );
}
