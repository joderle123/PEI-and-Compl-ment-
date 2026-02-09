import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../stores/gameStore';
import { getIslandData } from '../../data';
import type { Scenario } from '../../types';
import SOSButton from '../common/SOSButton';
import CompanionWidget from '../common/CompanionWidget';
import XPBar from '../common/XPBar';

// ---------------------------------------------------------------------------
// Island theme descriptions - what the player LEARNS on each island
// ---------------------------------------------------------------------------

const ISLAND_THEMES: Record<
  string,
  {
    title: string;
    subtitle: string;
    explanation: string;
    skills: string[];
    emoji: string;
    accentColor: string;
    glowColor: string;
  }
> = {
  volcano: {
    title: 'Die Vulkaninsel',
    subtitle: 'Wut verstehen und regulieren',
    explanation:
      'Wut ist ein normales Gef\u00FChl \u2013 aber wenn sie \u00FCberkocht, kann sie uns und andere verletzen. Auf dieser Insel lernst du, woher Wut kommt, wie du sie erkennst und was du tun kannst, wenn sie aufsteigt. Du wirst entdecken, dass Wut sogar eine Superkraft sein kann \u2013 wenn du lernst, sie richtig zu nutzen.',
    skills: ['Wut erkennen', 'Emotionsregulation', 'Impulskontrolle', 'Gesunder Ausdruck'],
    emoji: '\u{1F30B}',
    accentColor: '#FF6B35',
    glowColor: 'rgba(255,107,53,0.3)',
  },
  ocean: {
    title: 'Die Ozean-Insel',
    subtitle: 'Traurigkeit und Verlust verarbeiten',
    explanation:
      'Traurigkeit geh\u00F6rt zum Leben \u2013 manchmal verlieren wir Menschen, Orte oder Dinge, die uns wichtig sind. Auf dieser Insel lernst du, dass Trauern keine Schw\u00E4che ist, sondern zeigt, wie sehr du geliebt hast. Du wirst Wege finden, mit schwierigen Gef\u00FChlen umzugehen.',
    skills: ['Gef\u00FChle zulassen', 'Hilfe annehmen', 'Resilienz', 'Trost finden'],
    emoji: '\u{1F30A}',
    accentColor: '#4A90D9',
    glowColor: 'rgba(74,144,217,0.3)',
  },
  forest: {
    title: 'Die Wald-Insel',
    subtitle: 'Angst \u00FCberwinden und Mut finden',
    explanation:
      'Jeder hat vor etwas Angst \u2013 und das ist v\u00F6llig okay. Angst will uns sch\u00FCtzen. Aber manchmal h\u00E4lt sie uns zur\u00FCck. Auf dieser Insel lernst du den Unterschied zwischen hilfreicher und l\u00E4hmender Angst. Und du entdeckst, dass Mut nicht bedeutet, keine Angst zu haben \u2013 sondern trotzdem das Richtige zu tun.',
    skills: ['\u00C4ngste benennen', 'Mut \u00FCben', 'Perspektivwechsel', 'Schrittweises Handeln'],
    emoji: '\u{1F33F}',
    accentColor: '#4CAF50',
    glowColor: 'rgba(76,175,80,0.3)',
  },
  mountain: {
    title: 'Die Berg-Insel',
    subtitle: 'Selbstwert und innere St\u00E4rke',
    explanation:
      'Wie du \u00FCber dich selbst denkst, beeinflusst alles \u2013 deine Freundschaften, deine Entscheidungen, dein Gl\u00FCck. Auf dieser Insel erforschst du, wer du wirklich bist und was dich besonders macht. Du lernst, dich selbst zu akzeptieren \u2013 mit St\u00E4rken UND Schw\u00E4chen.',
    skills: ['Selbstbild', 'St\u00E4rken erkennen', 'Selbstmitgef\u00FChl', 'Grenzen setzen'],
    emoji: '\u{1F3D4}\u{FE0F}',
    accentColor: '#8D6E63',
    glowColor: 'rgba(141,110,99,0.3)',
  },
  garden: {
    title: 'Die Garten-Insel',
    subtitle: 'Empathie und Beziehungen',
    explanation:
      'Freundschaften und Beziehungen sind wie G\u00E4rten \u2013 sie brauchen Pflege, Geduld und Aufmerksamkeit. Auf dieser Insel lernst du, dich in andere hineinzuf\u00FChlen, Konflikte fair zu l\u00F6sen und echte Freundschaften aufzubauen. Denn niemand ist eine Insel \u2013 wir brauchen einander.',
    skills: ['Empathie', 'Kommunikation', 'Konfliktl\u00F6sung', 'Teamarbeit'],
    emoji: '\u{1F338}',
    accentColor: '#EC407A',
    glowColor: 'rgba(236,64,122,0.3)',
  },
  night: {
    title: 'Die Nacht-Insel',
    subtitle: 'Achtsamkeit und innere Ruhe',
    explanation:
      'In unserer lauten Welt vergessen wir oft, innezuhalten. Auf dieser Insel entdeckst du die Kraft der Stille. Du lernst, im Moment zu sein, deinen K\u00F6rper zu sp\u00FCren und deinen Geist zur Ruhe zu bringen \u2013 auch wenn alles um dich herum chaotisch ist.',
    skills: ['Achtsamkeit', 'Stressbew\u00E4ltigung', 'Meditation', 'Digitale Balance'],
    emoji: '\u{1F319}',
    accentColor: '#7E57C2',
    glowColor: 'rgba(126,87,194,0.3)',
  },
  rainbow: {
    title: 'Die Regenbogen-Insel',
    subtitle: 'Vielfalt und Zusammenleben',
    explanation:
      'Jeder Mensch ist einzigartig \u2013 und genau das macht unsere Welt so bunt. Auf dieser Insel lernst du, Unterschiede zu sch\u00E4tzen, Vorurteile zu erkennen und f\u00FCr Gerechtigkeit einzustehen. Denn eine Welt, in der alle gleich w\u00E4ren, w\u00E4re ziemlich langweilig.',
    skills: ['Toleranz', 'Vorurteile erkennen', 'Zivilcourage', 'Inklusion'],
    emoji: '\u{1F308}',
    accentColor: '#E84393',
    glowColor: 'rgba(232,67,147,0.3)',
  },
  home: {
    title: 'Die Heimat-Insel',
    subtitle: 'Alles zusammenf\u00FChren',
    explanation:
      'Du hast so viel gelernt auf deiner Reise! Auf dieser letzten Insel bringst du alles zusammen. Du \u00FCberlegst, wie du dein Wissen im echten Leben anwenden kannst \u2013 in der Schule, zu Hause, mit Freunden. Denn das wahre Abenteuer beginnt jetzt: drau\u00DFen in der Welt.',
    skills: ['Transfer', 'Zukunftsplanung', 'Selbstreflexion', 'Handeln'],
    emoji: '\u{1F3E0}',
    accentColor: '#FFB74D',
    glowColor: 'rgba(255,183,77,0.3)',
  },
};

// ---------------------------------------------------------------------------
// Chapter Card
// ---------------------------------------------------------------------------

function ChapterCard({
  scenario,
  chapterNumber,
  isCompleted,
  isLocked,
  isNext,
  accentColor,
  glowColor,
  onStart,
}: {
  scenario: Scenario;
  chapterNumber: number;
  isCompleted: boolean;
  isLocked: boolean;
  isNext: boolean;
  accentColor: string;
  glowColor: string;
  onStart: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 + chapterNumber * 0.08 }}
      className={`glass-panel rounded-2xl p-5 transition-all duration-300 ${
        isLocked ? 'opacity-40' : 'cursor-pointer'
      }`}
      style={{
        border: isNext
          ? `2px solid ${accentColor}`
          : isCompleted
            ? '1px solid rgba(72,199,142,0.4)'
            : '1px solid rgba(201,168,76,0.15)',
        boxShadow: isNext ? `0 0 20px ${glowColor}` : 'none',
      }}
      onClick={isLocked ? undefined : onStart}
      whileHover={!isLocked ? { scale: 1.02, y: -3 } : undefined}
      whileTap={!isLocked ? { scale: 0.98 } : undefined}
    >
      <div className="flex items-start gap-4">
        {/* Chapter number badge */}
        <div
          className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-title font-bold text-lg"
          style={{
            background: isCompleted
              ? 'linear-gradient(135deg, rgba(72,199,142,0.3), rgba(72,199,142,0.1))'
              : isNext
                ? `linear-gradient(135deg, ${accentColor}30, ${accentColor}10)`
                : 'linear-gradient(135deg, rgba(60,50,80,0.4), rgba(30,25,45,0.6))',
            border: isCompleted
              ? '1px solid rgba(72,199,142,0.5)'
              : isNext
                ? `1px solid ${accentColor}80`
                : '1px solid rgba(100,80,120,0.3)',
            color: isCompleted ? '#48c78e' : isNext ? accentColor : 'rgba(150,130,170,0.5)',
          }}
        >
          {isCompleted ? '\u2713' : isLocked ? '\u{1F512}' : chapterNumber}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className="text-xs font-title uppercase tracking-wider"
              style={{
                color: isCompleted
                  ? 'rgba(72,199,142,0.7)'
                  : isNext
                    ? `${accentColor}cc`
                    : 'rgba(201,168,76,0.4)',
              }}
            >
              Kapitel {chapterNumber}
            </span>
            {isCompleted && (
              <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(72,199,142,0.15)', color: '#48c78e' }}>
                Abgeschlossen
              </span>
            )}
            {isNext && (
              <motion.span
                className="text-xs px-2 py-0.5 rounded-full"
                style={{ background: `${accentColor}20`, color: accentColor }}
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                N\u00E4chstes Kapitel
              </motion.span>
            )}
          </div>
          <h3
            className="font-title font-bold text-base mb-1"
            style={{
              color: isLocked ? 'rgba(150,130,170,0.5)' : '#e8e0d0',
            }}
          >
            {scenario.title}
          </h3>
          <p
            className="text-sm leading-relaxed"
            style={{
              color: isLocked ? 'rgba(150,130,170,0.3)' : 'rgba(232,213,163,0.6)',
            }}
          >
            {scenario.description}
          </p>

          {/* Start button for next chapter */}
          {isNext && (
            <motion.button
              className="mt-3 px-5 py-2 rounded-xl font-title font-semibold text-sm"
              style={{
                background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`,
                color: '#0d0d1a',
                boxShadow: `0 0 15px ${glowColor}`,
              }}
              whileHover={{ scale: 1.05, boxShadow: `0 0 25px ${glowColor}` }}
              whileTap={{ scale: 0.95 }}
            >
              Geschichte starten \u2192
            </motion.button>
          )}

          {/* Replay button for completed chapters */}
          {isCompleted && (
            <button
              className="mt-3 px-4 py-1.5 rounded-lg font-title text-xs"
              style={{
                background: 'rgba(72,199,142,0.1)',
                color: 'rgba(72,199,142,0.7)',
                border: '1px solid rgba(72,199,142,0.2)',
              }}
            >
              Nochmal spielen
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Activity Card
// ---------------------------------------------------------------------------

function ActivityCard({
  title,
  description,
  emoji,
  isCompleted,
  isLocked,
  accentColor,
  onStart,
}: {
  title: string;
  description: string;
  emoji: string;
  isCompleted: boolean;
  isLocked: boolean;
  accentColor: string;
  onStart: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`glass-panel rounded-xl p-4 ${isLocked ? 'opacity-40' : 'cursor-pointer'}`}
      style={{
        border: isCompleted
          ? '1px solid rgba(72,199,142,0.3)'
          : `1px solid rgba(201,168,76,0.15)`,
      }}
      onClick={isLocked ? undefined : onStart}
      whileHover={!isLocked ? { scale: 1.03 } : undefined}
      whileTap={!isLocked ? { scale: 0.97 } : undefined}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">{emoji}</span>
        <div className="flex-1 min-w-0">
          <h4 className="font-title font-semibold text-sm" style={{ color: '#e8e0d0' }}>
            {title}
          </h4>
          <p className="text-xs" style={{ color: 'rgba(232,213,163,0.5)' }}>
            {description}
          </p>
        </div>
        {isCompleted ? (
          <span className="text-sm" style={{ color: '#48c78e' }}>{'\u2713'}</span>
        ) : !isLocked ? (
          <span className="text-sm" style={{ color: accentColor }}>{'\u2192'}</span>
        ) : (
          <span className="text-sm opacity-30">{'\u{1F512}'}</span>
        )}
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Main IslandHub Component
// ---------------------------------------------------------------------------

export default function IslandHub() {
  const {
    activeIsland,
    islands,
    completedScenarios,
    completedActivities,
    setScreen,
    setActiveIsland,
  } = useGameStore();

  const [showInfo, setShowInfo] = useState(true);

  const islandId = activeIsland || 'volcano';
  const island = islands.find((i) => i.id === islandId);
  const theme = ISLAND_THEMES[islandId] || ISLAND_THEMES.volcano;
  const islandData = useMemo(() => getIslandData(islandId), [islandId]);

  const scenarios: Scenario[] = islandData.scenarios;
  const activities = islandData.activities;

  // Determine which chapters are completed and which is next
  const completedChapterIds = new Set(completedScenarios);
  const firstIncompleteIndex = scenarios.findIndex(
    (s) => !completedChapterIds.has(s.id),
  );

  const handleBack = () => {
    setActiveIsland(null);
    setScreen('island-map');
  };

  const handleStartScenario = (scenario: Scenario) => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('activeScenarioId', scenario.id);
    }
    setScreen('scenario');
  };

  const handleStartActivity = (activityId: string) => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('activeActivityId', activityId);
    }
    setScreen('activity');
  };

  if (!island) return null;

  return (
    <div
      className="h-screen overflow-auto"
      style={{
        background: `
          radial-gradient(ellipse 80% 60% at 50% 15%, ${theme.glowColor} 0%, transparent 60%),
          linear-gradient(180deg, #0d0d1a 0%, #1a0a2e 40%, #0d0d1a 100%)
        `,
      }}
    >
      <div className="max-w-2xl mx-auto px-5 py-6">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBack}
            className="glass-panel px-4 py-2 rounded-xl text-sm font-title font-semibold cursor-pointer"
            style={{ border: '1px solid rgba(201,168,76,0.3)', color: '#c9a84c' }}
          >
            {'\u2190'} Karte
          </motion.button>

          <div className="w-40">
            <XPBar />
          </div>
        </div>

        {/* Island header with emoji and title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <motion.div
            className="text-6xl mb-3"
            animate={{
              filter: [
                `drop-shadow(0 0 10px ${theme.glowColor})`,
                `drop-shadow(0 0 25px ${theme.glowColor})`,
                `drop-shadow(0 0 10px ${theme.glowColor})`,
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            {theme.emoji}
          </motion.div>

          <h1
            className="font-title text-2xl font-bold mb-1"
            style={{ color: theme.accentColor, textShadow: `0 0 20px ${theme.glowColor}` }}
          >
            {theme.title}
          </h1>
          <p className="font-title text-sm" style={{ color: 'rgba(232,213,163,0.7)' }}>
            {theme.subtitle}
          </p>

          {/* Progress bar */}
          <div className="flex items-center justify-center gap-3 mt-3">
            <div
              className="w-48 h-2 rounded-full overflow-hidden"
              style={{ backgroundColor: 'rgba(201,168,76,0.1)' }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${scenarios.length > 0
                    ? (scenarios.filter((s) => completedChapterIds.has(s.id)).length / scenarios.length) * 100
                    : 0}%`,
                }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${theme.accentColor}, ${theme.accentColor}cc)`,
                  boxShadow: `0 0 8px ${theme.glowColor}`,
                }}
              />
            </div>
            <span className="text-xs font-title" style={{ color: 'rgba(201,168,76,0.5)' }}>
              {scenarios.filter((s) => completedChapterIds.has(s.id)).length}/{scenarios.length}
            </span>
          </div>
        </motion.div>

        {/* Theme explanation card - collapsible */}
        <AnimatePresence>
          {showInfo && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6"
            >
              <div
                className="glass-panel rounded-2xl p-5"
                style={{ border: `1px solid ${theme.accentColor}30` }}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h2
                    className="font-title font-bold text-base"
                    style={{ color: theme.accentColor }}
                  >
                    {'\u{1F4D6}'} Was du hier lernst
                  </h2>
                  <button
                    onClick={() => setShowInfo(false)}
                    className="text-xs shrink-0 cursor-pointer"
                    style={{ color: 'rgba(201,168,76,0.4)' }}
                  >
                    Ausblenden
                  </button>
                </div>

                <p className="text-sm leading-relaxed mb-4" style={{ color: '#e8e0d0' }}>
                  {theme.explanation}
                </p>

                <div className="flex flex-wrap gap-2">
                  {theme.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-3 py-1 rounded-full font-title"
                      style={{
                        background: `${theme.accentColor}15`,
                        color: `${theme.accentColor}cc`,
                        border: `1px solid ${theme.accentColor}30`,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!showInfo && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setShowInfo(true)}
            className="mb-4 text-xs font-title cursor-pointer"
            style={{ color: 'rgba(201,168,76,0.4)' }}
          >
            {'\u{1F4D6}'} Info anzeigen
          </motion.button>
        )}

        {/* Ornamental divider */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, transparent, ${theme.accentColor}40, transparent)` }} />
          <span className="font-title text-xs uppercase tracking-wider" style={{ color: `${theme.accentColor}80` }}>
            Geschichten
          </span>
          <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, transparent, ${theme.accentColor}40, transparent)` }} />
        </div>

        {/* Chapter list */}
        <div className="space-y-4 mb-8">
          {scenarios.map((scenario, index) => {
            const isCompleted = completedChapterIds.has(scenario.id);
            const isNext = index === firstIncompleteIndex;
            const isLocked = index > firstIncompleteIndex && firstIncompleteIndex !== -1;

            return (
              <ChapterCard
                key={scenario.id}
                scenario={scenario}
                chapterNumber={index + 1}
                isCompleted={isCompleted}
                isLocked={isLocked}
                isNext={isNext}
                accentColor={theme.accentColor}
                glowColor={theme.glowColor}
                onStart={() => handleStartScenario(scenario)}
              />
            );
          })}
        </div>

        {/* Activities section */}
        {activities.length > 0 && (
          <>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, transparent, ${theme.accentColor}40, transparent)` }} />
              <span className="font-title text-xs uppercase tracking-wider" style={{ color: `${theme.accentColor}80` }}>
                {'\u{1F3AF}'} \u00DCbungen
              </span>
              <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, transparent, ${theme.accentColor}40, transparent)` }} />
            </div>

            <div className="space-y-3 mb-8">
              {activities.map((activity: any, index: number) => {
                const isActivityCompleted = completedActivities.includes(activity.id);
                // Activities unlock after completing at least 1 chapter
                const chaptersCompleted = scenarios.filter((s) => completedChapterIds.has(s.id)).length;
                const isActivityLocked = chaptersCompleted < Math.min(index + 1, scenarios.length);

                const activityEmojis: Record<string, string> = {
                  breathing: '\u{1F32C}\u{FE0F}',
                  meditation: '\u{1F9D8}',
                  journal: '\u{1F4D3}',
                  reflection: '\u{1F4AD}',
                  assessment: '\u{1F4CA}',
                  creative: '\u{1F3A8}',
                };

                return (
                  <ActivityCard
                    key={activity.id}
                    title={activity.title}
                    description={activity.description}
                    emoji={activityEmojis[activity.type] || '\u{1F3AF}'}
                    isCompleted={isActivityCompleted}
                    isLocked={isActivityLocked}
                    accentColor={theme.accentColor}
                    onStart={() => handleStartActivity(activity.id)}
                  />
                );
              })}
            </div>
          </>
        )}

        {/* Bottom spacing */}
        <div className="h-24" />
      </div>

      {/* Floating companion and SOS */}
      <div style={{ zIndex: 15 }}>
        <CompanionWidget />
      </div>
      <div style={{ zIndex: 15 }}>
        <SOSButton />
      </div>
    </div>
  );
}
