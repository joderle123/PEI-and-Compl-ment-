import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../../stores/gameStore';

const DASHBOARD_PASSWORD = 'cdse2024';

export default function PedagogDashboard() {
  const {
    islands,
    completedScenarios,
    completedActivities,
    moodHistory,
    collectedWisdomCardIds,
    setScreen,
  } = useGameStore();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (password === DASHBOARD_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Falsches Passwort');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="h-screen bg-[#faf3e8] flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-8 shadow-xl max-w-sm w-full"
        >
          <h2 className="text-2xl font-bold text-[#6C5CE7] mb-2 text-center">
            Pädagogen-Zugang
          </h2>
          <p className="text-gray-500 text-sm text-center mb-6">
            Dieser Bereich ist für Fachpersonal bestimmt.
          </p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            placeholder="Passwort"
            className="w-full p-3 border-2 border-gray-200 rounded-xl mb-3 focus:border-[#6C5CE7] focus:outline-none"
          />
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
          <button
            onClick={handleLogin}
            className="w-full bg-[#6C5CE7] text-white font-bold py-3 rounded-xl hover:bg-[#5541d6] transition-colors"
          >
            Anmelden
          </button>
          <button
            onClick={() => setScreen('island-map')}
            className="w-full mt-3 text-gray-400 hover:text-gray-600 font-semibold py-2"
          >
            Zurück zum Spiel
          </button>
        </motion.div>
      </div>
    );
  }

  // Calculate stats
  const moodCounts: Record<string, number> = {};
  moodHistory.forEach((entry) => {
    moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
  });

  const topMoods = Object.entries(moodCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const islandStats = islands.map((island) => ({
    name: island.name,
    emoji: island.emoji,
    completion: island.completionPercent,
    scenarios: completedScenarios.filter((id) => id.startsWith(island.id)).length,
    activities: completedActivities.filter((id) => id.startsWith(island.id)).length,
  }));

  const moodLabels: Record<string, string> = {
    happy: 'Glücklich', sad: 'Traurig', angry: 'Wütend', anxious: 'Ängstlich',
    calm: 'Ruhig', confused: 'Verwirrt', excited: 'Aufgeregt', tired: 'Müde',
    lonely: 'Einsam', proud: 'Stolz', frustrated: 'Frustriert', hopeful: 'Hoffnungsvoll',
  };

  return (
    <div className="h-screen bg-[#f5f5f5] overflow-auto">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">📊 Pädagogen-Dashboard</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setScreen('island-map')}
              className="px-4 py-2 bg-white rounded-lg shadow text-gray-600 font-semibold hover:bg-gray-50"
            >
              Zurück zum Spiel
            </button>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-4 py-2 bg-gray-200 rounded-lg text-gray-600 font-semibold hover:bg-gray-300"
            >
              Abmelden
            </button>
          </div>
        </div>

        {/* Privacy notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <p className="text-blue-700 text-sm">
            🔒 <strong>Datenschutz:</strong> Alle Daten sind anonymisiert und werden lokal gespeichert.
            Individuelle Spielerdaten sind nicht einsehbar. Keine Daten werden an Dritte übermittelt.
          </p>
        </div>

        {/* Overview cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow">
            <p className="text-3xl font-bold text-[#6C5CE7]">{completedScenarios.length}</p>
            <p className="text-sm text-gray-500">Szenarien abgeschlossen</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow">
            <p className="text-3xl font-bold text-[#00b894]">{completedActivities.length}</p>
            <p className="text-sm text-gray-500">Übungen absolviert</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow">
            <p className="text-3xl font-bold text-[#fdcb6e]">{collectedWisdomCardIds.length}</p>
            <p className="text-sm text-gray-500">Weisheitskarten</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow">
            <p className="text-3xl font-bold text-[#e17055]">{moodHistory.length}</p>
            <p className="text-sm text-gray-500">Stimmungs-Check-Ins</p>
          </div>
        </div>

        {/* Island progress */}
        <div className="bg-white rounded-xl p-6 shadow mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Insel-Fortschritt</h2>
          <div className="space-y-3">
            {islandStats.map((stat) => (
              <div key={stat.name} className="flex items-center gap-3">
                <span className="text-xl w-8">{stat.emoji}</span>
                <span className="text-sm font-semibold text-gray-700 w-40">{stat.name}</span>
                <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#6C5CE7] rounded-full transition-all"
                    style={{ width: `${stat.completion}%` }}
                  />
                </div>
                <span className="text-sm text-gray-500 w-12 text-right">{stat.completion}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mood trends */}
        {topMoods.length > 0 && (
          <div className="bg-white rounded-xl p-6 shadow mb-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Stimmungstrends (aggregiert)</h2>
            <div className="space-y-2">
              {topMoods.map(([mood, count]) => (
                <div key={mood} className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-gray-700 w-32">
                    {moodLabels[mood] || mood}
                  </span>
                  <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#FAB1A0] rounded-full"
                      style={{
                        width: `${(count / moodHistory.length) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-sm text-gray-500 w-8 text-right">{count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Suggestions */}
        <div className="bg-white rounded-xl p-6 shadow mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">💡 Vorgeschlagene Fokus-Bereiche</h2>
          <div className="space-y-2 text-gray-600">
            {completedScenarios.length === 0 && (
              <p>• Der/die Spieler*in hat noch keine Szenarien abgeschlossen. Ermutigen Sie zum Einstieg mit der Vulkaninsel.</p>
            )}
            {moodCounts['sad'] > 2 && (
              <p>• Häufige Traurigkeit gemeldet. Die Ozean-Insel bietet passende Inhalte.</p>
            )}
            {moodCounts['angry'] > 2 && (
              <p>• Häufige Wut gemeldet. Die Vulkaninsel-Übungen könnten hilfreich sein.</p>
            )}
            {moodCounts['anxious'] > 2 && (
              <p>• Häufige Ängstlichkeit gemeldet. Die Wald-Insel bietet Mut-Übungen.</p>
            )}
            {completedActivities.length < 3 && completedScenarios.length > 3 && (
              <p>• Viele Geschichten gespielt, aber wenige Übungen. Ermutigen Sie zur Nutzung der interaktiven Übungen.</p>
            )}
            {completedScenarios.length > 0 && moodHistory.length === 0 && (
              <p>• Stimmungs-Check-In wird nicht genutzt. Es kann hilfreich sein, den Nutzen des Mood-Trackings zu besprechen.</p>
            )}
            {completedScenarios.length > 5 && (
              <p>• Guter Fortschritt! Der/die Spieler*in ist aktiv engagiert.</p>
            )}
          </div>
        </div>

        <div className="h-20" />
      </div>
    </div>
  );
}
