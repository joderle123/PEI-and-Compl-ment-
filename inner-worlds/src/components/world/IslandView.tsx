import { motion } from 'framer-motion';
import { useGameStore } from '../../stores/gameStore';
import { getIslandData } from '../../data';
import SOSButton from '../common/SOSButton';
import CompanionWidget from '../common/CompanionWidget';
import { getCompanionEmoji } from '../../data/companions';

export default function IslandView() {
  const {
    activeIsland,
    islands,
    companion,
    completedScenarios,
    completedActivities,
    collectedWisdomCardIds,
    setScreen,
    setActiveIsland,
  } = useGameStore();

  const island = islands.find((i) => i.id === activeIsland);
  if (!island) return null;

  const data = getIslandData(island.id);
  const companionEmoji = companion ? getCompanionEmoji(companion.type) : '🌟';

  const collectedCount = data.wisdomCards.filter((c: any) =>
    collectedWisdomCardIds.includes(c.id)
  ).length;

  const handleBack = () => {
    setActiveIsland(null);
    setScreen('island-map');
  };

  const handleStartScenario = (scenarioId: string) => {
    sessionStorage.setItem('activeScenarioId', scenarioId);
    sessionStorage.setItem('activeIslandId', island.id);
    setScreen('scenario');
  };

  const handleStartActivity = (activityId: string) => {
    sessionStorage.setItem('activeActivityId', activityId);
    sessionStorage.setItem('activeIslandId', island.id);
    setScreen('activity');
  };

  return (
    <div
      className="h-screen w-screen overflow-auto"
      style={{
        background: `linear-gradient(180deg, ${island.colors[0]}40 0%, ${island.colors[1]}60 50%, ${island.colors[2]}40 100%)`,
      }}
    >
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBack}
            className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur rounded-full shadow text-gray-700 font-semibold hover:bg-white transition-all"
          >
            ← Zurück zur Karte
          </motion.button>

          <div className="flex items-center gap-2 bg-white/80 backdrop-blur rounded-full px-4 py-2 shadow">
            <span className="text-sm font-semibold text-gray-600">Level {island.level}</span>
            <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${island.completionPercent}%`,
                  backgroundColor: island.colors[0],
                }}
              />
            </div>
            <span className="text-sm font-semibold text-gray-600">{island.completionPercent}%</span>
          </div>
        </motion.div>

        {/* Island Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-8"
        >
          <span className="text-6xl mb-2 block">{island.emoji}</span>
          <h1 className="text-4xl font-extrabold text-white drop-shadow-lg mb-2">
            {island.name}
          </h1>
          <p className="text-xl text-white/90 drop-shadow">{island.description}</p>
        </motion.div>

        {/* Companion intro */}
        {data.npcs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/80 backdrop-blur rounded-2xl p-5 mb-6 shadow-lg"
          >
            <div className="flex items-start gap-3">
              <span className="text-3xl">{companionEmoji}</span>
              <div>
                <p className="font-semibold text-[#6C5CE7]">{companion?.name || 'Begleiter'}</p>
                <p className="text-gray-700">
                  Willkommen auf der {island.name}! Hier triffst du{' '}
                  {data.npcs.map((n: any) => `${n.emoji} ${n.name}`).join(' und ')}.{' '}
                  {data.npcs[0]?.backstory?.split('.')[0]}.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* NPCs */}
        {data.npcs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
          >
            {data.npcs.map((npc: any) => (
              <div
                key={npc.id}
                className="bg-white/70 backdrop-blur rounded-2xl p-4 shadow"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{npc.emoji}</span>
                  <span className="font-bold text-lg" style={{ color: island.colors[0] }}>
                    {npc.name}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{npc.description}</p>
              </div>
            ))}
          </motion.div>
        )}

        {/* Scenarios */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-white drop-shadow mb-4">📖 Geschichten</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.scenarios.map((scenario: any, idx: number) => {
              const isCompleted = completedScenarios.includes(scenario.id);
              return (
                <motion.button
                  key={scenario.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * idx }}
                  whileHover={{ scale: 1.03, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleStartScenario(scenario.id)}
                  className="bg-white/80 backdrop-blur rounded-2xl p-5 shadow-lg text-left hover:shadow-xl transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: island.colors[0] + '20', color: island.colors[0] }}>
                      Geschichte {idx + 1}
                    </span>
                    {isCompleted && <span className="text-green-500 text-lg">✓</span>}
                  </div>
                  <h3 className="font-bold text-lg text-gray-800 mb-1">{scenario.title}</h3>
                  <p className="text-gray-600 text-sm">{scenario.description}</p>
                </motion.button>
              );
            })}
          </div>
          {data.scenarios.length === 0 && (
            <div className="bg-white/50 rounded-2xl p-6 text-center text-gray-500">
              Geschichten werden bald freigeschaltet...
            </div>
          )}
        </motion.div>

        {/* Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-white drop-shadow mb-4">🎯 Übungen</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {data.activities.map((activity: any) => {
              const isCompleted = completedActivities.includes(activity.id);
              const typeIcons: Record<string, string> = {
                breathing: '🌬️',
                reflection: '🪞',
                assessment: '📊',
                creative: '🎨',
                meditation: '🧘',
                journal: '📓',
              };
              return (
                <motion.button
                  key={activity.id}
                  whileHover={{ scale: 1.03, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleStartActivity(activity.id)}
                  className="bg-white/80 backdrop-blur rounded-2xl p-4 shadow text-left hover:shadow-lg transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{typeIcons[activity.type] || '🎯'}</span>
                    {isCompleted && <span className="text-green-500">✓</span>}
                  </div>
                  <h3 className="font-bold text-gray-800 mb-1">{activity.title}</h3>
                  <p className="text-gray-600 text-xs">{activity.description}</p>
                </motion.button>
              );
            })}
          </div>
          {data.activities.length === 0 && (
            <div className="bg-white/50 rounded-2xl p-6 text-center text-gray-500">
              Übungen werden bald freigeschaltet...
            </div>
          )}
        </motion.div>

        {/* Wisdom Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-white drop-shadow mb-4">🃏 Weisheitskarten</h2>
          <div className="bg-white/80 backdrop-blur rounded-2xl p-5 shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-700 font-semibold">
                {collectedCount} von {data.wisdomCards.length} gesammelt
              </span>
              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: data.wisdomCards.length > 0 ? `${(collectedCount / data.wisdomCards.length) * 100}%` : '0%',
                    backgroundColor: island.colors[0],
                  }}
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.wisdomCards.slice(0, 6).map((card: any) => {
                const isCollected = collectedWisdomCardIds.includes(card.id);
                return (
                  <div
                    key={card.id}
                    className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                      isCollected
                        ? 'bg-[#FFEAA7] text-gray-800'
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {isCollected ? card.text.substring(0, 40) + '...' : '❓ ???'}
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Bottom spacing */}
        <div className="h-20" />
      </div>

      <CompanionWidget />
      <SOSButton />
    </div>
  );
}
