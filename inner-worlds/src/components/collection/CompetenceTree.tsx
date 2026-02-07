import { motion } from 'framer-motion';
import { useGameStore } from '../../stores/gameStore';

const skills = [
  { name: 'Emotionsregulation', emoji: '🌋', color: '#e17055', angle: 0 },
  { name: 'Empathie', emoji: '🌸', color: '#fd79a8', angle: 60 },
  { name: 'Mut', emoji: '🌿', color: '#00b894', angle: 120 },
  { name: 'Selbstwert', emoji: '🏔️', color: '#6c5ce7', angle: 180 },
  { name: 'Achtsamkeit', emoji: '🌙', color: '#2d3436', angle: 240 },
  { name: 'Soziale Kompetenz', emoji: '🌈', color: '#e84393', angle: 300 },
];

export default function CompetenceTree() {
  const {
    xp,
    level,
    completedScenarios,
    completedActivities,
    collectedWisdomCardIds,
    journalEntries,
    setScreen,
  } = useGameStore();

  // Calculate skill levels based on completed content
  const getSkillLevel = (index: number): number => {
    const base = Math.floor(completedScenarios.length / 2) + Math.floor(completedActivities.length / 3);
    return Math.min(5, Math.max(1, base + (index % 3)));
  };

  return (
    <div className="h-screen bg-gradient-to-b from-[#faf3e8] to-[#e8f5e9] overflow-auto">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
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
          <h1 className="text-3xl font-extrabold text-[#6C5CE7] mb-2">🌳 Kompetenz-Baum</h1>
          <p className="text-gray-600">Deine wachsenden Fähigkeiten</p>
        </div>

        {/* Stats overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/80 rounded-2xl p-4 text-center shadow">
            <span className="text-2xl">⭐</span>
            <p className="text-2xl font-bold text-[#6C5CE7]">{xp}</p>
            <p className="text-xs text-gray-500">Erfahrungspunkte</p>
          </div>
          <div className="bg-white/80 rounded-2xl p-4 text-center shadow">
            <span className="text-2xl">🏆</span>
            <p className="text-2xl font-bold text-[#6C5CE7]">{level}</p>
            <p className="text-xs text-gray-500">Level</p>
          </div>
          <div className="bg-white/80 rounded-2xl p-4 text-center shadow">
            <span className="text-2xl">📖</span>
            <p className="text-2xl font-bold text-[#6C5CE7]">{completedScenarios.length}</p>
            <p className="text-xs text-gray-500">Geschichten</p>
          </div>
          <div className="bg-white/80 rounded-2xl p-4 text-center shadow">
            <span className="text-2xl">🃏</span>
            <p className="text-2xl font-bold text-[#6C5CE7]">{collectedWisdomCardIds.length}</p>
            <p className="text-xs text-gray-500">Weisheitskarten</p>
          </div>
        </div>

        {/* Tree visualization as petal diagram */}
        <div className="relative w-80 h-80 mx-auto mb-8">
          {/* Center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-[#6C5CE7] rounded-full flex items-center justify-center shadow-xl z-10">
            <span className="text-3xl">🌟</span>
          </div>

          {/* Skill petals */}
          {skills.map((skill, i) => {
            const skillLevel = getSkillLevel(i);
            const maxRadius = 120;
            const radius = (skillLevel / 5) * maxRadius;
            const angleRad = (skill.angle * Math.PI) / 180;
            const x = Math.cos(angleRad) * radius;
            const y = Math.sin(angleRad) * radius;

            return (
              <motion.div
                key={skill.name}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.1, type: 'spring' }}
                className="absolute top-1/2 left-1/2 flex flex-col items-center"
                style={{
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                }}
              >
                {/* Petal */}
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: skill.color }}
                >
                  <span className="text-2xl">{skill.emoji}</span>
                </div>
                <span className="text-xs font-bold text-gray-700 mt-1 whitespace-nowrap bg-white/80 px-2 py-0.5 rounded-full">
                  {skill.name}
                </span>
                <span className="text-xs text-gray-500">Lv.{skillLevel}</span>
              </motion.div>
            );
          })}

          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
            {skills.map((skill, i) => {
              const skillLevel = getSkillLevel(i);
              const maxRadius = 120;
              const radius = (skillLevel / 5) * maxRadius;
              const angleRad = (skill.angle * Math.PI) / 180;
              const x = 160 + Math.cos(angleRad) * radius;
              const y = 160 + Math.sin(angleRad) * radius;

              return (
                <line
                  key={skill.name}
                  x1="160"
                  y1="160"
                  x2={x}
                  y2={y}
                  stroke={skill.color}
                  strokeWidth="2"
                  strokeOpacity="0.3"
                />
              );
            })}
          </svg>
        </div>

        {/* Activity counts */}
        <div className="bg-white/80 rounded-2xl p-6 shadow mb-8">
          <h3 className="font-bold text-gray-800 mb-4">Deine Reise in Zahlen</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">🎯 Übungen absolviert</span>
              <span className="font-bold text-[#6C5CE7]">{completedActivities.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">📓 Tagebucheinträge</span>
              <span className="font-bold text-[#6C5CE7]">{journalEntries.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">🃏 Weisheitskarten</span>
              <span className="font-bold text-[#6C5CE7]">{collectedWisdomCardIds.length}</span>
            </div>
          </div>
        </div>

        <div className="h-20" />
      </div>
    </div>
  );
}
