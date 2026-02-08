import { motion } from 'framer-motion';
import { useGameStore } from '../../stores/gameStore';
import { getIslandData } from '../../data';
import SOSButton from '../common/SOSButton';
import CompanionWidget from '../common/CompanionWidget';
import { getCompanionEmoji } from '../../data/companions';

// ---------------------------------------------------------------------------
// Small ornamental diamond SVG (reusable rune accent)
// ---------------------------------------------------------------------------

const RuneAccent: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    width="8"
    height="8"
    viewBox="0 0 8 8"
    className={className}
    aria-hidden="true"
  >
    <path d="M4 0 L8 4 L4 8 L0 4 Z" fill="currentColor" />
  </svg>
);

// ---------------------------------------------------------------------------
// Ember particle component
// ---------------------------------------------------------------------------

const EmberParticles: React.FC<{ count?: number }> = ({ count = 6 }) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="ember"
        style={{
          left: `${10 + i * 15 + Math.random() * 8}%`,
          bottom: `${-5 - Math.random() * 10}%`,
          animationDuration: `${6 + Math.random() * 6}s`,
          animationDelay: `${Math.random() * 4}s`,
          width: `${2 + Math.random() * 2}px`,
          height: `${2 + Math.random() * 2}px`,
        }}
      />
    ))}
  </>
);

// ---------------------------------------------------------------------------
// Star field component
// ---------------------------------------------------------------------------

const StarField: React.FC<{ count?: number }> = ({ count = 12 }) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="star"
        style={{
          left: `${5 + (i * 8) + Math.random() * 5}%`,
          top: `${3 + Math.random() * 25}%`,
          animationDuration: `${2 + Math.random() * 4}s`,
          animationDelay: `${Math.random() * 3}s`,
          width: `${1.5 + Math.random() * 1.5}px`,
          height: `${1.5 + Math.random() * 1.5}px`,
        }}
      />
    ))}
  </>
);

// ---------------------------------------------------------------------------
// Section header with ornamental diamond accents
// ---------------------------------------------------------------------------

const SectionHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex items-center justify-center gap-3 mb-5">
    <RuneAccent className="text-amber-500/50" />
    <RuneAccent className="text-amber-500/30" />
    <h2 className="text-2xl font-title text-golden font-bold tracking-wide animate-golden-glow">
      {children}
    </h2>
    <RuneAccent className="text-amber-500/30" />
    <RuneAccent className="text-amber-500/50" />
  </div>
);

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

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

  const typeIcons: Record<string, string> = {
    breathing: '🌬️',
    reflection: '🪞',
    assessment: '📊',
    creative: '🎨',
    meditation: '🧘',
    journal: '📓',
  };

  const primaryColor = island.colors[0];

  return (
    <div
      className="h-screen w-screen overflow-auto relative"
      style={{
        background: 'linear-gradient(180deg, #0d0d1a 0%, #1a0a2e 50%, #0d0d1a 100%)',
      }}
    >
      {/* ── Atmospheric layers ── */}
      <div className="vignette fixed inset-0 z-0 pointer-events-none" />
      <div className="fog-layer" />
      <EmberParticles count={6} />
      <StarField count={12} />

      {/* Colored radial glow behind island title */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 25%, ${primaryColor}18 0%, transparent 55%)`,
        }}
      />

      <div className="max-w-4xl mx-auto px-6 py-6 relative z-10">
        {/* ================================================================
            Top Bar
            ================================================================ */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' as const }}
          className="glass-panel rounded-xl px-4 py-3 mb-8 flex items-center justify-between"
        >
          {/* Back button */}
          <motion.button
            whileHover={{ x: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBack}
            className="text-[#a09888] hover:text-golden font-title text-sm font-semibold transition-colors duration-300"
          >
            &#x2190; Zur&uuml;ck zur Karte
          </motion.button>

          {/* Level badge + progress */}
          <div className="flex items-center gap-3">
            {/* Golden ornate level badge */}
            <div
              className="relative flex items-center justify-center w-9 h-9 shrink-0"
            >
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    'conic-gradient(from 0deg, #b8860b, #ffd700, #daa520, #ffd700, #b8860b)',
                  padding: '2px',
                }}
              >
                <div className="w-full h-full rounded-full bg-[#0d0d1a]/90" />
              </div>
              <span className="relative z-10 text-xs font-title font-bold text-golden">
                {island.level}
              </span>
            </div>

            {/* Progress bar */}
            <div className="flex items-center gap-2">
              <div
                className="w-24 h-2 rounded-full overflow-hidden"
                style={{
                  background: 'rgba(201,168,76,0.1)',
                  border: '1px solid rgba(201,168,76,0.15)',
                }}
              >
                <motion.div
                  className="h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${island.completionPercent}%` }}
                  transition={{ duration: 1, ease: 'easeOut' as const, delay: 0.3 }}
                  style={{
                    background: 'linear-gradient(90deg, #92600a, #b8860b, #daa520, #ffd700)',
                    boxShadow: '0 0 8px rgba(201,168,76,0.4)',
                  }}
                />
              </div>
              <span className="text-xs font-title font-semibold text-golden">
                {island.completionPercent}%
              </span>
            </div>
          </div>
        </motion.div>

        {/* ================================================================
            Island Title Section
            ================================================================ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' as const, delay: 0.1 }}
          className="text-center mb-8"
        >
          {/* Large emoji with pulsing aura ring */}
          <div className="relative inline-flex items-center justify-center mb-4">
            {/* Aura ring */}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 96,
                height: 96,
                border: `3px solid ${primaryColor}`,
                opacity: 0.4,
              }}
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut' as const,
              }}
            />
            {/* Outer glow ring */}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 110,
                height: 110,
                border: `1px solid ${primaryColor}`,
                opacity: 0.15,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.25, 0.1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut' as const,
                delay: 0.5,
              }}
            />
            <span className="text-7xl relative z-10 animate-float">{island.emoji}</span>
          </div>

          {/* Island name */}
          <h1 className="text-4xl font-title font-bold text-golden animate-golden-glow mb-3">
            {island.name}
          </h1>

          {/* Description */}
          <p className="text-lg text-[#e8e0d0]/80 max-w-xl mx-auto leading-relaxed">
            {island.description}
          </p>

          {/* Ornamental diamond divider */}
          <div className="flex items-center justify-center gap-2 mt-5">
            <div className="w-16 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.4))' }} />
            <RuneAccent className="text-amber-500/50" />
            <div className="w-16 h-px" style={{ background: 'linear-gradient(90deg, rgba(201,168,76,0.4), transparent)' }} />
          </div>
        </motion.div>

        {/* ================================================================
            Companion Intro
            ================================================================ */}
        {data.npcs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' as const }}
            className="glass-panel rounded-2xl p-5 mb-8 relative overflow-hidden"
            style={{
              borderLeft: '3px solid rgba(201,168,76,0.4)',
            }}
          >
            {/* Subtle golden top accent line */}
            <div
              className="absolute top-0 left-4 right-4 h-px"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)',
              }}
            />
            <div className="flex items-start gap-4">
              {/* Companion emoji in ornate golden circle */}
              <div className="relative flex items-center justify-center w-14 h-14 shrink-0">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      'conic-gradient(from 0deg, #b8860b, #ffd700, #daa520, #ffd700, #b8860b)',
                    padding: '2px',
                  }}
                >
                  <div className="w-full h-full rounded-full bg-[#0d0d1a]/90" />
                </div>
                <div
                  className="absolute inset-[3px] rounded-full"
                  style={{
                    background:
                      'radial-gradient(circle at 40% 35%, rgba(255,215,0,0.12), transparent 70%)',
                  }}
                />
                <span className="relative z-10 text-2xl">{companionEmoji}</span>
              </div>

              <div>
                <p className="font-title text-golden font-semibold text-sm mb-1">
                  {companion?.name || 'Begleiter'}
                </p>
                <p className="text-[#e8e0d0]/80 leading-relaxed text-sm">
                  Willkommen auf der {island.name}! Hier triffst du{' '}
                  {data.npcs.map((n: any) => `${n.emoji} ${n.name}`).join(' und ')}.{' '}
                  {data.npcs[0]?.backstory?.split('.')[0]}.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* ================================================================
            NPC Cards (2-column grid)
            ================================================================ */}
        {data.npcs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5, ease: 'easeOut' as const }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10"
          >
            {data.npcs.map((npc: any, npcIndex: number) => (
              <motion.div
                key={npc.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.5 + npcIndex * 0.12,
                  duration: 0.4,
                  ease: 'easeOut' as const,
                }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: '0 0 20px rgba(201,168,76,0.15), 0 4px 20px rgba(0,0,0,0.3)',
                }}
                className="glass-panel-light rounded-2xl p-5 transition-all duration-300 group cursor-default"
              >
                <div className="flex items-center gap-3 mb-3">
                  {/* NPC emoji in golden ornate circle (smaller) */}
                  <div className="relative flex items-center justify-center w-10 h-10 shrink-0">
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background:
                          'conic-gradient(from 0deg, #b8860b, #ffd700, #daa520, #ffd700, #b8860b)',
                        padding: '1.5px',
                      }}
                    >
                      <div className="w-full h-full rounded-full bg-[#1a0a2e]/90" />
                    </div>
                    <span className="relative z-10 text-xl">{npc.emoji}</span>
                  </div>

                  <span
                    className="font-title font-bold text-lg tracking-wide"
                    style={{ color: primaryColor }}
                  >
                    {npc.name}
                  </span>
                </div>
                <p className="text-[#e8e0d0]/70 text-sm leading-relaxed">
                  {npc.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* ================================================================
            Scenarios Section
            ================================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5, ease: 'easeOut' as const }}
          className="mb-10"
        >
          <SectionHeader>Geschichten</SectionHeader>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.scenarios.map((scenario: any, idx: number) => {
              const isCompleted = completedScenarios.includes(scenario.id);
              return (
                <motion.button
                  key={scenario.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.6 + idx * 0.1,
                    duration: 0.4,
                    ease: 'easeOut' as const,
                  }}
                  whileHover={{
                    scale: 1.03,
                    y: -3,
                    boxShadow: '0 0 25px rgba(201,168,76,0.15), 0 8px 25px rgba(0,0,0,0.3)',
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleStartScenario(scenario.id)}
                  className="glass-panel-light rounded-2xl p-5 text-left transition-all duration-300 group relative overflow-hidden"
                  style={{
                    borderLeft: '3px solid rgba(201,168,76,0.5)',
                  }}
                >
                  {/* Shimmer overlay on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background:
                        'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.04) 40%, rgba(201,168,76,0.08) 50%, rgba(201,168,76,0.04) 60%, transparent 100%)',
                      backgroundSize: '200% 100%',
                      animation: 'shimmer 2s ease-in-out infinite',
                    }}
                  />

                  <div className="flex items-center justify-between mb-2 relative z-10">
                    <span
                      className="text-xs font-title font-semibold px-2.5 py-1 rounded-full"
                      style={{
                        backgroundColor: `${primaryColor}20`,
                        color: primaryColor,
                        border: `1px solid ${primaryColor}30`,
                      }}
                    >
                      Geschichte {idx + 1}
                    </span>
                    {isCompleted && (
                      <motion.span
                        className="text-golden text-lg font-bold"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring' as const, stiffness: 200, damping: 12 }}
                      >
                        &#x2714;
                      </motion.span>
                    )}
                  </div>
                  <h3 className="font-title font-bold text-lg text-golden mb-1 relative z-10">
                    {scenario.title}
                  </h3>
                  <p className="text-[#e8e0d0]/70 text-sm leading-relaxed relative z-10">
                    {scenario.description}
                  </p>
                </motion.button>
              );
            })}
          </div>

          {data.scenarios.length === 0 && (
            <div className="glass-panel rounded-2xl p-6 text-center text-[#a09888]">
              Geschichten werden bald freigeschaltet...
            </div>
          )}
        </motion.div>

        {/* ================================================================
            Activities Section
            ================================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5, ease: 'easeOut' as const }}
          className="mb-10"
        >
          <SectionHeader>&Uuml;bungen</SectionHeader>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {data.activities.map((activity: any, actIdx: number) => {
              const isCompleted = completedActivities.includes(activity.id);
              return (
                <motion.button
                  key={activity.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.7 + actIdx * 0.08,
                    duration: 0.35,
                    ease: 'easeOut' as const,
                  }}
                  whileHover={{
                    scale: 1.03,
                    y: -2,
                    boxShadow: '0 0 20px rgba(201,168,76,0.12), 0 4px 15px rgba(0,0,0,0.3)',
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleStartActivity(activity.id)}
                  className="glass-panel-light rounded-2xl p-4 text-left transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between mb-3">
                    {/* Activity type icon in golden circle */}
                    <div className="relative flex items-center justify-center w-10 h-10 shrink-0">
                      <div
                        className="absolute inset-0 rounded-full"
                        style={{
                          background:
                            'conic-gradient(from 0deg, #b8860b, #ffd700, #daa520, #ffd700, #b8860b)',
                          padding: '1.5px',
                        }}
                      >
                        <div className="w-full h-full rounded-full bg-[#1a0a2e]/90" />
                      </div>
                      <span className="relative z-10 text-lg">
                        {typeIcons[activity.type] || '🎯'}
                      </span>
                    </div>

                    {isCompleted && (
                      <motion.span
                        className="text-golden text-base font-bold"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring' as const, stiffness: 200, damping: 12 }}
                      >
                        &#x2714;
                      </motion.span>
                    )}
                  </div>
                  <h3 className="font-title font-bold text-[#e8e0d0] text-sm mb-1 group-hover:text-golden transition-colors duration-300">
                    {activity.title}
                  </h3>
                  <p className="text-[#e8e0d0]/60 text-xs leading-relaxed">
                    {activity.description}
                  </p>
                </motion.button>
              );
            })}
          </div>

          {data.activities.length === 0 && (
            <div className="glass-panel rounded-2xl p-6 text-center text-[#a09888]">
              &Uuml;bungen werden bald freigeschaltet...
            </div>
          )}
        </motion.div>

        {/* ================================================================
            Wisdom Cards Section
            ================================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5, ease: 'easeOut' as const }}
          className="mb-10"
        >
          <SectionHeader>Weisheitskarten</SectionHeader>

          <div className="glass-panel rounded-2xl p-6 ornate-border">
            {/* Golden progress bar (XPBar-style) */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-[#e8e0d0]/80 font-title text-sm font-semibold">
                {collectedCount} von {data.wisdomCards.length} gesammelt
              </span>
              <div className="flex items-center gap-2">
                <div
                  className="w-36 h-2.5 rounded-full overflow-hidden"
                  style={{
                    background: 'rgba(201,168,76,0.1)',
                    border: '1px solid rgba(201,168,76,0.15)',
                  }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{
                      width:
                        data.wisdomCards.length > 0
                          ? `${(collectedCount / data.wisdomCards.length) * 100}%`
                          : '0%',
                    }}
                    transition={{ duration: 1.2, ease: 'easeOut' as const, delay: 0.8 }}
                    style={{
                      background: 'linear-gradient(90deg, #92600a, #b8860b, #daa520, #ffd700)',
                      boxShadow: '0 0 8px rgba(201,168,76,0.4)',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Wisdom card chips */}
            <div className="flex flex-wrap gap-2">
              {data.wisdomCards.slice(0, 6).map((card: any, cardIdx: number) => {
                const isCollected = collectedWisdomCardIds.includes(card.id);
                return (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: 0.9 + cardIdx * 0.06,
                      duration: 0.3,
                      ease: 'easeOut' as const,
                    }}
                    className="glass-panel-light px-3 py-2 rounded-xl text-xs font-medium transition-all duration-300"
                    style={
                      isCollected
                        ? {
                            borderColor: 'rgba(201,168,76,0.3)',
                          }
                        : {}
                    }
                  >
                    {isCollected ? (
                      <span className="text-golden font-title font-semibold">
                        {card.text.substring(0, 40)}...
                      </span>
                    ) : (
                      <span className="text-[#a09888]/50">&#x2753; ???</span>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Bottom spacing for scroll */}
        <div className="h-24" />
      </div>

      <CompanionWidget />
      <SOSButton />
    </div>
  );
}
