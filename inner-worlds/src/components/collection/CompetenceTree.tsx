import { motion } from 'framer-motion';
import { useGameStore } from '../../stores/gameStore';

// ---------------------------------------------------------------------------
// Skill definitions with dark fantasy colors
// ---------------------------------------------------------------------------

const skills = [
  { name: 'Emotionsregulation', emoji: '\u{1F30B}', color: '#ff6b35', glowColor: 'rgba(255,107,53,0.3)', angle: 0 },
  { name: 'Empathie', emoji: '\u{1F338}', color: '#e878a0', glowColor: 'rgba(232,120,160,0.3)', angle: 60 },
  { name: 'Mut', emoji: '\u{1F332}', color: '#48c78e', glowColor: 'rgba(72,199,142,0.3)', angle: 120 },
  { name: 'Selbstwert', emoji: '\u26F0\uFE0F', color: '#8b78e6', glowColor: 'rgba(139,120,230,0.3)', angle: 180 },
  { name: 'Achtsamkeit', emoji: '\u{1F319}', color: '#6888b8', glowColor: 'rgba(104,136,184,0.3)', angle: 240 },
  { name: 'Soziale Kompetenz', emoji: '\u{1F308}', color: '#e878d8', glowColor: 'rgba(232,120,216,0.3)', angle: 300 },
];

export default function CompetenceTree() {
  const {
    xp,
    level,
    completedScenarios,
    completedActivities,
    collectedWisdomCardIds,
    journalEntries,
    totalEmpathyPoints,
    totalInsightPoints,
    totalCouragePoints,
    setScreen,
  } = useGameStore();

  const getSkillLevel = (index: number): number => {
    const base = Math.floor(completedScenarios.length / 2) + Math.floor(completedActivities.length / 3);
    return Math.min(5, Math.max(1, base + (index % 3)));
  };

  return (
    <div
      className="h-screen overflow-auto"
      style={{
        background: `
          radial-gradient(ellipse 80% 60% at 50% 30%, rgba(45,27,78,0.6) 0%, transparent 70%),
          linear-gradient(180deg, #0d0d1a 0%, #1a0a2e 50%, #0d0d1a 100%)
        `,
      }}
    >
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
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
            {'\u{1F333}'} Kompetenz-Baum
          </motion.h1>
          <p style={{ color: 'rgba(232,213,163,0.6)' }}>
            Deine wachsenden F{'\u00E4'}higkeiten
          </p>
        </div>

        {/* Stats overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { emoji: '\u2B50', value: xp, label: 'Erfahrungspunkte' },
            { emoji: '\u{1F3C6}', value: level, label: 'Level' },
            { emoji: '\u{1F4D6}', value: completedScenarios.length, label: 'Geschichten' },
            { emoji: '\u{1F4DC}', value: collectedWisdomCardIds.length, label: 'Weisheitskarten' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass-panel rounded-2xl p-4 text-center"
              style={{
                border: '1px solid rgba(201,168,76,0.2)',
              }}
            >
              <span className="text-2xl">{stat.emoji}</span>
              <p
                className="text-2xl font-bold font-title"
                style={{ color: '#ffd700' }}
              >
                {stat.value}
              </p>
              <p
                className="text-xs"
                style={{ color: 'rgba(201,168,76,0.5)' }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Skill points summary */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { label: 'Empathie', value: totalEmpathyPoints, color: '#e878a0', icon: '\u{1F497}' },
            { label: 'Einsicht', value: totalInsightPoints, color: '#8b78e6', icon: '\u{1F4A1}' },
            { label: 'Mut', value: totalCouragePoints, color: '#ff8c44', icon: '\u{1F981}' },
          ].map((sp) => (
            <div
              key={sp.label}
              className="glass-panel rounded-xl p-3 text-center"
              style={{ border: `1px solid ${sp.color}40` }}
            >
              <span className="text-lg">{sp.icon}</span>
              <p className="text-lg font-bold font-title" style={{ color: sp.color }}>
                {sp.value}
              </p>
              <p className="text-xs" style={{ color: `${sp.color}99` }}>{sp.label}</p>
            </div>
          ))}
        </div>

        {/* Tree visualization as petal diagram */}
        <div className="relative w-80 h-80 mx-auto mb-8">
          {/* Center glow */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: '100px',
              height: '100px',
              background: 'radial-gradient(circle, rgba(201,168,76,0.15) 0%, transparent 70%)',
              filter: 'blur(15px)',
            }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Center node */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full flex items-center justify-center z-10"
            style={{
              background: 'linear-gradient(135deg, rgba(108,92,231,0.4), rgba(45,27,78,0.6))',
              border: '2px solid rgba(201,168,76,0.4)',
              boxShadow: '0 0 20px rgba(201,168,76,0.2), inset 0 0 15px rgba(201,168,76,0.1)',
            }}
          >
            <motion.span
              className="text-3xl"
              animate={{
                filter: [
                  'drop-shadow(0 0 4px rgba(255,215,0,0.3))',
                  'drop-shadow(0 0 12px rgba(255,215,0,0.6))',
                  'drop-shadow(0 0 4px rgba(255,215,0,0.3))',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              {'\u{1F31F}'}
            </motion.span>
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
                {/* Petal with glow */}
                <motion.div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{
                    background: `radial-gradient(circle at 35% 35%, ${skill.color}60, ${skill.color}30)`,
                    border: `1px solid ${skill.color}80`,
                    boxShadow: `0 0 15px ${skill.glowColor}`,
                  }}
                  animate={{
                    boxShadow: [
                      `0 0 10px ${skill.glowColor}`,
                      `0 0 20px ${skill.glowColor}`,
                      `0 0 10px ${skill.glowColor}`,
                    ],
                  }}
                  transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <span className="text-2xl">{skill.emoji}</span>
                </motion.div>
                <span
                  className="text-xs font-title font-bold mt-1 whitespace-nowrap px-2 py-0.5 rounded-full"
                  style={{
                    color: skill.color,
                    background: 'rgba(0,0,0,0.5)',
                    border: `1px solid ${skill.color}30`,
                  }}
                >
                  {skill.name}
                </span>
                <span className="text-xs" style={{ color: 'rgba(201,168,76,0.5)' }}>
                  Lv.{skillLevel}
                </span>
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
                  strokeWidth="1.5"
                  strokeOpacity="0.25"
                  strokeDasharray="4 6"
                />
              );
            })}
          </svg>
        </div>

        {/* Activity counts */}
        <div
          className="glass-panel rounded-2xl p-6 mb-8"
          style={{ border: '1px solid rgba(201,168,76,0.2)' }}
        >
          <h3
            className="font-title font-bold mb-4"
            style={{ color: '#e8d5a3' }}
          >
            Deine Reise in Zahlen
          </h3>
          <div className="space-y-3">
            {[
              { emoji: '\u{1F3AF}', label: '\u00DCbungen absolviert', value: completedActivities.length },
              { emoji: '\u{1F4D3}', label: 'Tagebucheintr\u00E4ge', value: journalEntries.length },
              { emoji: '\u{1F4DC}', label: 'Weisheitskarten', value: collectedWisdomCardIds.length },
            ].map((item) => (
              <div key={item.label} className="flex justify-between items-center">
                <span style={{ color: 'rgba(232,213,163,0.7)' }}>
                  {item.emoji} {item.label}
                </span>
                <span className="font-bold font-title" style={{ color: '#ffd700' }}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="h-20" />
      </div>
    </div>
  );
}
