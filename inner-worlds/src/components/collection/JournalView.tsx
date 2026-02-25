import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../stores/gameStore';
import { formatDate } from '../../utils/accessibility';
import type { IslandId } from '../../types';

// ---------------------------------------------------------------------------
// Island visual data
// ---------------------------------------------------------------------------

const ISLAND_META: Record<string, { emoji: string; name: string; color: string; glow: string }> = {
  volcano: { emoji: '\u{1F30B}', name: 'Vulkan', color: '#ff8c55', glow: 'rgba(255,69,0,0.15)' },
  ocean: { emoji: '\u{1F30A}', name: 'Ozean', color: '#5eb8ff', glow: 'rgba(30,144,255,0.15)' },
  forest: { emoji: '\u{1F33F}', name: 'Wald', color: '#5ee8c0', glow: 'rgba(0,184,148,0.15)' },
  mountain: { emoji: '\u{1F3D4}\uFE0F', name: 'Berg', color: '#a89cf5', glow: 'rgba(108,92,231,0.15)' },
  garden: { emoji: '\u{1F338}', name: 'Garten', color: '#fda5c0', glow: 'rgba(253,121,168,0.15)' },
  night: { emoji: '\u{1F319}', name: 'Nacht', color: '#98aedd', glow: 'rgba(100,120,180,0.15)' },
  rainbow: { emoji: '\u{1F308}', name: 'Regenbogen', color: '#f098c0', glow: 'rgba(232,67,147,0.15)' },
  home: { emoji: '\u{1F3E0}', name: 'Zuhause', color: '#fdd98e', glow: 'rgba(253,203,110,0.15)' },
};

const ENTRY_TYPE_LABELS: Record<string, { label: string; emoji: string; color: string }> = {
  reflection: { label: 'Reflexion', emoji: '\u{1F4AD}', color: '#c9a84c' },
  transfer: { label: 'Br\u00FCcke zur Realit\u00E4t', emoji: '\u{1F309}', color: '#5eb8ff' },
  shadow: { label: 'Schatten-Begegnung', emoji: '\u{1F311}', color: '#9966ff' },
  companion: { label: 'Begleiter-Gespr\u00E4ch', emoji: '\u{1F43E}', color: '#5ee8c0' },
  free: { label: 'Freier Eintrag', emoji: '\u{270D}\uFE0F', color: '#fda5c0' },
};

const MOOD_OPTIONS = [
  { emoji: '\u{1F60A}', label: 'Gl\u00FCcklich' },
  { emoji: '\u{1F914}', label: 'Nachdenklich' },
  { emoji: '\u{1F622}', label: 'Traurig' },
  { emoji: '\u{1F620}', label: 'W\u00FCtend' },
  { emoji: '\u{1F630}', label: '\u00C4ngstlich' },
  { emoji: '\u{1F60C}', label: 'Ruhig' },
  { emoji: '\u{1F929}', label: 'Begeistert' },
  { emoji: '\u{1F615}', label: 'Verwirrt' },
];

// ---------------------------------------------------------------------------
// Stats Summary Component
// ---------------------------------------------------------------------------

function JournalStats({
  totalEntries,
  islandCounts,
  moodCounts,
}: {
  totalEntries: number;
  islandCounts: Record<string, number>;
  moodCounts: Record<string, number>;
}) {
  const topMood = useMemo(() => {
    let max = 0;
    let topEmoji = '';
    for (const [emoji, count] of Object.entries(moodCounts)) {
      if (count > max) { max = count; topEmoji = emoji; }
    }
    return topEmoji || '\u{2014}';
  }, [moodCounts]);

  const activeIslands = Object.keys(islandCounts).length;

  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      <div
        className="glass-panel rounded-xl p-3 text-center"
        style={{ border: '1px solid rgba(201,168,76,0.2)' }}
      >
        <div className="text-2xl font-bold" style={{ color: '#ffd700' }}>{totalEntries}</div>
        <div className="text-xs" style={{ color: 'rgba(232,213,163,0.5)' }}>Eintr\u00E4ge</div>
      </div>
      <div
        className="glass-panel rounded-xl p-3 text-center"
        style={{ border: '1px solid rgba(201,168,76,0.2)' }}
      >
        <div className="text-2xl font-bold" style={{ color: '#ffd700' }}>{activeIslands}/8</div>
        <div className="text-xs" style={{ color: 'rgba(232,213,163,0.5)' }}>Inseln besucht</div>
      </div>
      <div
        className="glass-panel rounded-xl p-3 text-center"
        style={{ border: '1px solid rgba(201,168,76,0.2)' }}
      >
        <div className="text-2xl">{topMood}</div>
        <div className="text-xs" style={{ color: 'rgba(232,213,163,0.5)' }}>H\u00E4ufigstes Gef\u00FChl</div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Island Filter Tabs
// ---------------------------------------------------------------------------

function IslandFilterTabs({
  activeFilter,
  onFilter,
  islandCounts,
}: {
  activeFilter: string | null;
  onFilter: (id: string | null) => void;
  islandCounts: Record<string, number>;
}) {
  return (
    <div className="flex flex-wrap gap-2 mb-6 justify-center">
      <button
        className="px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer"
        style={{
          background: activeFilter === null ? 'rgba(255,215,0,0.2)' : 'rgba(255,255,255,0.05)',
          border: activeFilter === null ? '1px solid rgba(255,215,0,0.4)' : '1px solid rgba(255,255,255,0.1)',
          color: activeFilter === null ? '#ffd700' : 'rgba(200,200,200,0.5)',
        }}
        onClick={() => onFilter(null)}
      >
        Alle
      </button>
      {Object.entries(ISLAND_META).map(([id, meta]) => {
        const count = islandCounts[id] || 0;
        if (count === 0) return null;
        const isActive = activeFilter === id;
        return (
          <button
            key={id}
            className="px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer"
            style={{
              background: isActive ? `${meta.glow.replace('0.15', '0.3')}` : 'rgba(255,255,255,0.05)',
              border: isActive ? `1px solid ${meta.color}60` : '1px solid rgba(255,255,255,0.1)',
              color: isActive ? meta.color : 'rgba(200,200,200,0.5)',
            }}
            onClick={() => onFilter(isActive ? null : id)}
          >
            {meta.emoji} {meta.name} ({count})
          </button>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Single Journal Entry Card
// ---------------------------------------------------------------------------

function JournalEntryCard({
  entry,
  index,
  settings,
}: {
  entry: {
    id: string;
    date: string;
    prompt: string;
    response: string;
    islandId: IslandId;
    mood?: string;
    npcName?: string;
    entryType?: string;
    tags?: string[];
    emotionalIntensity?: number;
  };
  index: number;
  settings: { language: 'de' | 'fr' };
}) {
  const meta = ISLAND_META[entry.islandId] || { emoji: '\u{1F31F}', name: '?', color: '#c9a84c', glow: 'rgba(201,168,76,0.1)' };
  const typeInfo = ENTRY_TYPE_LABELS[entry.entryType || 'reflection'] || ENTRY_TYPE_LABELS.reflection;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="glass-panel rounded-2xl p-5 relative overflow-hidden"
      style={{
        borderLeft: `3px solid ${meta.color}60`,
        border: `1px solid rgba(201,168,76,0.12)`,
        borderLeftWidth: '3px',
        borderLeftColor: `${meta.color}60`,
        boxShadow: `0 0 15px ${meta.glow}`,
      }}
    >
      {/* Entry type badge */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span
            className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full"
            style={{
              background: `${typeInfo.color}15`,
              color: typeInfo.color,
              border: `1px solid ${typeInfo.color}30`,
            }}
          >
            {typeInfo.emoji} {typeInfo.label}
          </span>
          {entry.npcName && (
            <span className="text-xs" style={{ color: 'rgba(200,200,200,0.4)' }}>
              mit {entry.npcName}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {entry.mood && <span className="text-lg" title="Stimmung">{entry.mood}</span>}
          <span className="text-sm">{meta.emoji}</span>
        </div>
      </div>

      {/* Date */}
      <div className="text-xs mb-2" style={{ color: 'rgba(201,168,76,0.4)' }}>
        {formatDate(entry.date, settings.language)}
      </div>

      {/* Prompt */}
      <p
        className="text-sm font-semibold italic mb-2"
        style={{ color: meta.color }}
      >
        &ldquo;{entry.prompt}&rdquo;
      </p>

      {/* Response */}
      <p className="leading-relaxed text-sm" style={{ color: '#e8e0d0' }}>
        {entry.response}
      </p>

      {/* Emotional intensity bar */}
      {entry.emotionalIntensity && entry.emotionalIntensity > 0 && (
        <div className="flex items-center gap-2 mt-3">
          <span className="text-[10px]" style={{ color: 'rgba(200,200,200,0.3)' }}>Intensit\u00E4t</span>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((level) => (
              <div
                key={level}
                className="w-3 h-1.5 rounded-full"
                style={{
                  background: level <= (entry.emotionalIntensity ?? 0)
                    ? meta.color
                    : 'rgba(255,255,255,0.1)',
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Tags */}
      {entry.tags && entry.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {entry.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded-full"
              style={{
                background: 'rgba(255,255,255,0.05)',
                color: 'rgba(200,200,200,0.4)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Main Journal View: "Logbuch des Seelentauchers"
// ---------------------------------------------------------------------------

export default function JournalView() {
  const { journalEntries, settings, setScreen } = useGameStore();
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  // Computed stats
  const islandCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const entry of journalEntries) {
      counts[entry.islandId] = (counts[entry.islandId] || 0) + 1;
    }
    return counts;
  }, [journalEntries]);

  const moodCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const entry of journalEntries) {
      if (entry.mood) {
        counts[entry.mood] = (counts[entry.mood] || 0) + 1;
      }
    }
    return counts;
  }, [journalEntries]);

  // Filtered and sorted entries
  const filteredEntries = useMemo(() => {
    const entries = activeFilter
      ? journalEntries.filter((e) => e.islandId === activeFilter)
      : journalEntries;
    return [...entries].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  }, [journalEntries, activeFilter]);

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
            {'\u2190'} Zur\u00FCck
          </motion.button>
        </div>

        {/* Title: Logbuch des Seelentauchers */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-4xl block mb-2">{'\u{1F4D6}'}</span>
            <h1
              className="text-2xl font-title font-bold mb-1"
              style={{
                color: '#ffd700',
                textShadow: '0 0 20px rgba(255,215,0,0.3)',
              }}
            >
              Logbuch des Seelentauchers
            </h1>
            <p className="text-xs" style={{ color: 'rgba(232,213,163,0.5)' }}>
              Deine Reise durch die Inneren Welten. Nur du kannst das lesen.
            </p>
          </motion.div>
        </div>

        {/* Ornamental divider */}
        <div className="flex items-center justify-center gap-3 mb-6">
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

        {/* Stats Summary */}
        {journalEntries.length > 0 && (
          <JournalStats
            totalEntries={journalEntries.length}
            islandCounts={islandCounts}
            moodCounts={moodCounts}
          />
        )}

        {/* Island Filter Tabs */}
        {journalEntries.length > 0 && (
          <IslandFilterTabs
            activeFilter={activeFilter}
            onFilter={setActiveFilter}
            islandCounts={islandCounts}
          />
        )}

        {/* Entries */}
        <AnimatePresence mode="wait">
          {filteredEntries.length > 0 ? (
            <motion.div
              key={activeFilter || 'all'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {filteredEntries.map((entry, i) => (
                <JournalEntryCard
                  key={entry.id}
                  entry={entry}
                  index={i}
                  settings={settings}
                />
              ))}
            </motion.div>
          ) : journalEntries.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-8"
            >
              <p style={{ color: 'rgba(232,213,163,0.5)' }}>
                Keine Eintr{'\u00E4'}ge f{'\u00FC'}r diese Insel.
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-12"
            >
              <span className="text-5xl block mb-4">{'\u{1F4D6}'}</span>
              <p
                className="text-lg font-title"
                style={{ color: 'rgba(232,213,163,0.6)' }}
              >
                Dein Logbuch ist noch leer.
              </p>
              <p className="mt-2 text-sm" style={{ color: 'rgba(201,168,76,0.4)' }}>
                Spiele Geschichten und schreibe deine Reflexionen auf!
                Deine Eintr{'\u00E4'}ge werden hier gesammelt.
              </p>

              {/* Mood legend for future reference */}
              <div className="mt-8 glass-panel rounded-xl p-4" style={{ border: '1px solid rgba(201,168,76,0.15)' }}>
                <p className="text-xs font-bold mb-3" style={{ color: 'rgba(201,168,76,0.5)' }}>
                  Stimmungen, die du tracken kannst:
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {MOOD_OPTIONS.map((m) => (
                    <span
                      key={m.emoji}
                      className="text-xs px-2 py-1 rounded-full"
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        color: 'rgba(200,200,200,0.5)',
                      }}
                    >
                      {m.emoji} {m.label}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Journey Progress (at bottom) */}
        {journalEntries.length >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 glass-panel rounded-xl p-5"
            style={{ border: '1px solid rgba(201,168,76,0.15)' }}
          >
            <h3 className="text-sm font-bold mb-3" style={{ color: '#c9a84c' }}>
              {'\u{1F30D}'} Deine Insel-Reise
            </h3>
            <div className="flex gap-1.5 flex-wrap">
              {(['volcano', 'ocean', 'forest', 'mountain', 'garden', 'night', 'rainbow', 'home'] as IslandId[]).map((id) => {
                const meta = ISLAND_META[id];
                const count = islandCounts[id] || 0;
                return (
                  <div
                    key={id}
                    className="flex flex-col items-center gap-1 px-2 py-1.5 rounded-lg"
                    style={{
                      background: count > 0 ? `${meta.glow}` : 'rgba(255,255,255,0.02)',
                      border: count > 0 ? `1px solid ${meta.color}30` : '1px solid rgba(255,255,255,0.05)',
                      opacity: count > 0 ? 1 : 0.4,
                    }}
                  >
                    <span className="text-lg">{meta.emoji}</span>
                    <span className="text-[10px]" style={{ color: count > 0 ? meta.color : 'rgba(200,200,200,0.3)' }}>
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        <div className="h-20" />
      </div>
    </div>
  );
}
