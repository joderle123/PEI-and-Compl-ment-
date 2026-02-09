import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../stores/gameStore';
import { getIslandData } from '../../data';
import type { IslandId } from '../../types';

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
// Animated XP counter hook
// ---------------------------------------------------------------------------

function useAnimatedCounter(target: number, duration: number = 1200) {
  const [value, setValue] = useState(0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (target === 0) {
      setValue(0);
      return;
    }
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) * (1 - progress);
      setValue(Math.round(eased * target));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [target, duration]);

  return value;
}

// ---------------------------------------------------------------------------
// Island-themed floating particles
// ---------------------------------------------------------------------------

const ISLAND_PARTICLE_COLORS: Record<string, string[]> = {
  volcano: ['#ff6b35', '#ff4444', '#ffd700'],
  ocean: ['#74b9ff', '#0984e3', '#81ecec'],
  forest: ['#55efc4', '#00b894', '#a8e6cf'],
  mountain: ['#a29bfe', '#6c5ce7', '#dfe6e9'],
  garden: ['#fd79a8', '#e84393', '#fab1a0'],
  night: ['#6c5ce7', '#a29bfe', '#dfe6e9'],
  rainbow: ['#ff6b6b', '#ffeaa7', '#55efc4'],
  home: ['#ffd700', '#e8a838', '#c9a84c'],
};

function IslandParticles({ islandId, count = 8 }: { islandId: string; count?: number }) {
  const colors = ISLAND_PARTICLE_COLORS[islandId] || ISLAND_PARTICLE_COLORS.volcano;
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 2 + Math.random() * 4,
        color: colors[i % colors.length],
        duration: 4 + Math.random() * 6,
        delay: Math.random() * 3,
      })),
    [count, colors],
  );

  return (
    <>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
          }}
          animate={{
            opacity: [0, 0.6, 0],
            y: [0, -40, -80],
            scale: [0.5, 1, 0.3],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}
    </>
  );
}

// ---------------------------------------------------------------------------
// Scene illustration banner - cinematic header per island
// ---------------------------------------------------------------------------

const ISLAND_SCENE_ART: Record<string, {
  emoji: string;
  gradient: string;
  accentColor: string;
}> = {
  volcano: {
    emoji: '\u{1F30B}',
    gradient: 'linear-gradient(180deg, rgba(255,60,10,0.3) 0%, rgba(180,40,0,0.15) 50%, transparent 100%)',
    accentColor: '#ff6b35',
  },
  ocean: {
    emoji: '\u{1F30A}',
    gradient: 'linear-gradient(180deg, rgba(0,80,200,0.25) 0%, rgba(0,50,120,0.12) 50%, transparent 100%)',
    accentColor: '#74b9ff',
  },
  forest: {
    emoji: '\u{1F332}',
    gradient: 'linear-gradient(180deg, rgba(0,150,60,0.25) 0%, rgba(0,80,30,0.12) 50%, transparent 100%)',
    accentColor: '#55efc4',
  },
  mountain: {
    emoji: '\u{26F0}\u{FE0F}',
    gradient: 'linear-gradient(180deg, rgba(160,140,200,0.25) 0%, rgba(100,80,150,0.12) 50%, transparent 100%)',
    accentColor: '#a29bfe',
  },
  garden: {
    emoji: '\u{1F33A}',
    gradient: 'linear-gradient(180deg, rgba(255,150,200,0.25) 0%, rgba(200,80,140,0.12) 50%, transparent 100%)',
    accentColor: '#fd79a8',
  },
  night: {
    emoji: '\u{1F303}',
    gradient: 'linear-gradient(180deg, rgba(80,60,180,0.3) 0%, rgba(40,20,100,0.15) 50%, transparent 100%)',
    accentColor: '#6c5ce7',
  },
  rainbow: {
    emoji: '\u{1F308}',
    gradient: 'linear-gradient(180deg, rgba(255,200,0,0.25) 0%, rgba(255,100,50,0.12) 50%, transparent 100%)',
    accentColor: '#ffeaa7',
  },
  home: {
    emoji: '\u{1F3E0}',
    gradient: 'linear-gradient(180deg, rgba(201,168,76,0.25) 0%, rgba(150,120,50,0.12) 50%, transparent 100%)',
    accentColor: '#ffd700',
  },
};

function SceneIllustration({
  islandId,
  sceneIndex,
  totalScenes,
  title,
}: {
  islandId: string;
  sceneIndex: number;
  totalScenes: number;
  title: string;
}) {
  const art = ISLAND_SCENE_ART[islandId] || ISLAND_SCENE_ART.volcano;

  return (
    <motion.div
      className="relative overflow-hidden rounded-b-3xl mb-2"
      style={{
        height: '120px',
        background: art.gradient,
      }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Decorative island emoji with glow */}
      <motion.div
        className="absolute right-6 top-1/2 -translate-y-1/2 text-6xl opacity-20 select-none"
        animate={{
          y: [0, -6, 0],
          rotate: [-2, 2, -2],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          filter: `drop-shadow(0 0 20px ${art.accentColor})`,
        }}
      >
        {art.emoji}
      </motion.div>

      {/* Scene progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1">
        <motion.div
          className="h-full"
          style={{
            background: `linear-gradient(90deg, ${art.accentColor}, #ffd700)`,
            boxShadow: `0 0 8px ${art.accentColor}`,
          }}
          animate={{ width: `${((sceneIndex + 1) / totalScenes) * 100}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </div>

      {/* Title and scene indicator */}
      <div className="absolute bottom-4 left-5 right-20">
        <motion.p
          className="font-title text-xs uppercase tracking-[0.2em] mb-1"
          style={{ color: art.accentColor, opacity: 0.7 }}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 0.7, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          Szene {sceneIndex + 1} von {totalScenes}
        </motion.p>
        <motion.h2
          className="font-title text-lg font-bold text-golden tracking-wide"
          style={{
            textShadow: '0 0 15px rgba(255,215,0,0.3)',
          }}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          {title}
        </motion.h2>
      </div>

      {/* Top ornate line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${art.accentColor}40, transparent)`,
        }}
      />
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Helper: icon and color for dominant point type
// ---------------------------------------------------------------------------

function getChoiceIcon(choice: any): string {
  const pts = choice.points || choice;
  const e = pts.empathyPoints || 0;
  const ins = pts.insightPoints || 0;
  const c = pts.couragePoints || 0;
  const max = Math.max(e, ins, c);
  if (max === 0) return '\u2726';
  if (max === e) return '\u{1F497}';
  if (max === c) return '\u{1F981}';
  return '\u{1F4A1}';
}

function getChoiceSkillLabel(choice: any): string {
  const pts = choice.points || choice;
  const e = pts.empathyPoints || 0;
  const ins = pts.insightPoints || 0;
  const c = pts.couragePoints || 0;
  const max = Math.max(e, ins, c);
  if (max === 0) return '';
  if (max === e) return 'Empathie';
  if (max === c) return 'Mut';
  return 'Einsicht';
}

function getChoiceColor(choice: any): string {
  const pts = choice.points || choice;
  const e = pts.empathyPoints || 0;
  const ins = pts.insightPoints || 0;
  const c = pts.couragePoints || 0;
  const max = Math.max(e, ins, c);
  if (max === 0) return 'rgba(201,168,76,0.5)';
  if (max === e) return 'rgba(253,121,168,0.7)';
  if (max === c) return 'rgba(255,165,0,0.7)';
  return 'rgba(162,155,254,0.7)';
}


// ---------------------------------------------------------------------------
// Helper: smart consequence text generation
// ---------------------------------------------------------------------------

const EMPATHY_CONSEQUENCES = [
  'Dein Mitgef\u00FChl leuchtet auf. Du verstehst, was andere f\u00FChlen.',
  'Du hast mit dem Herzen gehandelt \u2013 das braucht echte St\u00E4rke.',
  'Empathie ist eine Superkraft, und du hast sie gerade eingesetzt.',
  'Du siehst die Welt durch die Augen anderer. Das ist selten.',
];
const INSIGHT_CONSEQUENCES = [
  'Kluge Entscheidung. Du siehst tiefer als die meisten.',
  'Nachdenken vor dem Handeln \u2013 das ist echte Weisheit.',
  'Dein Verstand schneidet durch den Nebel. Beeindruckende Einsicht.',
  'Du hast das Offensichtliche hinterfragt. Genau richtig.',
];
const COURAGE_CONSEQUENCES = [
  'Mutig! Nicht jeder h\u00E4tte sich das getraut.',
  'Dein Mut brennt hell. Du hast dich nicht einsch\u00FCchtern lassen.',
  'Manchmal braucht es Mut, das Richtige zu tun. Du hast ihn.',
  'Du bist mutig vorangegangen, w\u00E4hrend andere z\u00F6gern w\u00FCrden.',
];
const BALANCED_CONSEQUENCES = [
  'Eine ausgewogene Entscheidung \u2013 Kopf UND Herz arbeiten zusammen.',
  'Du hast alle Seiten abgewogen. Das zeigt echte Reife.',
  'Balance ist nicht Mittelma\u00DF \u2013 es ist die schwerste Kunst.',
];

function getSmartConsequence(choice: any): string {
  if (choice.consequence) return choice.consequence;
  const pts = choice.points || choice;
  const emp = pts.empathyPoints || 0;
  const ins = pts.insightPoints || 0;
  const cou = pts.couragePoints || 0;
  const total = emp + ins + cou;
  if (total === 0) return `Du hast gew\u00E4hlt: \u201E${choice.text}\u201C`;
  const hash = (choice.id || '').split('').reduce((a: number, c: string) => a + c.charCodeAt(0), 0);
  const max = Math.max(emp, ins, cou);
  if (emp === ins && ins === cou) return BALANCED_CONSEQUENCES[hash % BALANCED_CONSEQUENCES.length];
  if (max === emp) return EMPATHY_CONSEQUENCES[hash % EMPATHY_CONSEQUENCES.length];
  if (max === ins) return INSIGHT_CONSEQUENCES[hash % INSIGHT_CONSEQUENCES.length];
  return COURAGE_CONSEQUENCES[hash % COURAGE_CONSEQUENCES.length];
}

// ---------------------------------------------------------------------------
// Educational insight messages per skill
// ---------------------------------------------------------------------------

const LEARNING_MOMENTS: Record<string, string[]> = {
  empathy: [
    '\u{1F4DA} Wusstest du? Empathie bedeutet, sich in die Gef\u00FChle anderer hineinzuversetzen \u2013 das ist eine der wichtigsten sozialen F\u00E4higkeiten.',
    '\u{1F4DA} Forschung zeigt: Empathische Menschen haben st\u00E4rkere Freundschaften und f\u00FChlen sich gl\u00FCcklicher.',
    '\u{1F4DA} Tipp: Wenn jemand traurig ist, zeige ihm einfach, dass du da bist. Manchmal reicht schon Zuh\u00F6ren.',
  ],
  insight: [
    '\u{1F4DA} Wusstest du? Selbstreflexion hilft uns, bessere Entscheidungen zu treffen und aus Erfahrungen zu lernen.',
    '\u{1F4DA} Nachdenken ist wie ein Muskel \u2013 je \u00F6fter du \u00FCbst, desto st\u00E4rker wird er.',
    '\u{1F4DA} Tipp: Bevor du reagierst, z\u00E4hle bis 5 und frage dich: Was w\u00FCrde ich meinem besten Freund raten?',
  ],
  courage: [
    '\u{1F4DA} Wusstest du? Mut hei\u00DFt nicht, keine Angst zu haben \u2013 sondern trotz Angst das Richtige zu tun.',
    '\u{1F4DA} Studien zeigen: Wer sich traut, Grenzen zu setzen, wird von anderen mehr respektiert.',
    '\u{1F4DA} Tipp: Starte klein! Jeder mutige Schritt macht den n\u00E4chsten leichter.',
  ],
};

function getLearningMoment(choice: any): string | null {
  const pts = choice.points || choice;
  const emp = pts.empathyPoints || 0;
  const ins = pts.insightPoints || 0;
  const cou = pts.couragePoints || 0;
  const total = emp + ins + cou;
  if (total === 0) return null;
  const hash = (choice.id || '').split('').reduce((a: number, c: string) => a + c.charCodeAt(0), 0);
  const max = Math.max(emp, ins, cou);
  if (max === emp) return LEARNING_MOMENTS.empathy[hash % LEARNING_MOMENTS.empathy.length];
  if (max === ins) return LEARNING_MOMENTS.insight[hash % LEARNING_MOMENTS.insight.length];
  return LEARNING_MOMENTS.courage[hash % LEARNING_MOMENTS.courage.length];
}

// ---------------------------------------------------------------------------
// Island-themed background gradients
// ---------------------------------------------------------------------------

const SCENARIO_BG: Record<string, string> = {
  volcano: 'radial-gradient(ellipse at 50% 100%, rgba(255,60,10,0.15) 0%, transparent 50%), linear-gradient(180deg, #0d0d1a 0%, #2d1810 40%, #1a0a0a 100%)',
  ocean: 'radial-gradient(ellipse at 50% 100%, rgba(0,80,200,0.15) 0%, transparent 50%), linear-gradient(180deg, #0d0d1a 0%, #0a1a3a 40%, #050d1a 100%)',
  forest: 'radial-gradient(ellipse at 50% 100%, rgba(0,120,50,0.12) 0%, transparent 50%), linear-gradient(180deg, #0d0d1a 0%, #0a2d18 40%, #050d0a 100%)',
  mountain: 'radial-gradient(ellipse at 50% 100%, rgba(140,120,200,0.12) 0%, transparent 50%), linear-gradient(180deg, #0d0d1a 0%, #1a1530 40%, #0d0a1a 100%)',
  garden: 'radial-gradient(ellipse at 50% 100%, rgba(255,100,150,0.1) 0%, transparent 50%), linear-gradient(180deg, #0d0d1a 0%, #2d1828 40%, #1a0a15 100%)',
  night: 'radial-gradient(ellipse at 50% 20%, rgba(80,60,180,0.15) 0%, transparent 50%), linear-gradient(180deg, #050510 0%, #0d0d2e 40%, #050510 100%)',
  rainbow: 'radial-gradient(ellipse at 50% 100%, rgba(255,180,0,0.1) 0%, transparent 50%), linear-gradient(180deg, #0d0d1a 0%, #2d2018 40%, #1a150a 100%)',
  home: 'radial-gradient(ellipse at 50% 100%, rgba(201,168,76,0.12) 0%, transparent 50%), linear-gradient(180deg, #0d0d1a 0%, #1a1510 40%, #0d0d0a 100%)',
};

// ---------------------------------------------------------------------------
// Skill bar component for completion screen
// ---------------------------------------------------------------------------

function SkillBar({
  label,
  icon,
  value,
  color,
  delay,
}: {
  label: string;
  icon: string;
  value: number;
  color: string;
  delay: number;
}) {
  const maxWidth = Math.min(value * 10, 100);
  return (
    <motion.div
      className="flex items-center gap-3"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }}
    >
      <span className="text-xl w-8 text-center">{icon}</span>
      <div className="flex-1">
        <div className="flex justify-between mb-1">
          <span className="text-xs font-title font-semibold" style={{ color }}>{label}</span>
          <span className="text-xs font-bold" style={{ color }}>+{value}</span>
        </div>
        <div
          className="h-2 rounded-full overflow-hidden"
          style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{
              background: `linear-gradient(90deg, ${color}, ${color}cc)`,
              boxShadow: `0 0 8px ${color}80`,
            }}
            initial={{ width: 0 }}
            animate={{ width: `${maxWidth}%` }}
            transition={{ delay: delay + 0.3, duration: 0.8, ease: 'easeOut' }}
          />
        </div>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ScenarioPlayer() {
  const {
    activeIsland,
    addXP,
    completeScenario,
    collectWisdomCard,
    addJournalEntry,
    setScreen,
    totalEmpathyPoints,
    totalInsightPoints,
    totalCouragePoints,
  } = useGameStore();

  const scenarioId = sessionStorage.getItem('activeScenarioId');
  const islandId = (sessionStorage.getItem('activeIslandId') || activeIsland || 'volcano') as IslandId;

  const data = getIslandData(islandId);
  const scenario = data.scenarios.find((s: any) => s.id === scenarioId);

  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [textComplete, setTextComplete] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<any>(null);
  const [showConsequence, setShowConsequence] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [reflection, setReflection] = useState('');
  const [earnedXP, setEarnedXP] = useState(0);
  const [earnedEmpathy, setEarnedEmpathy] = useState(0);
  const [earnedInsight, setEarnedInsight] = useState(0);
  const [earnedCourage, setEarnedCourage] = useState(0);
  const [showGoldenFlash, setShowGoldenFlash] = useState(false);
  const [comboMultiplier, setComboMultiplier] = useState(1);
  const [showLearningMoment, setShowLearningMoment] = useState(false);

  const currentScene = scenario?.scenes?.[currentSceneIndex];
  const animatedXP = useAnimatedCounter(isComplete ? earnedXP : 0, 1500);

  // ─── Typewriter effect ───
  useEffect(() => {
    if (!currentScene) return;
    setDisplayedText('');
    setTextComplete(false);
    setSelectedChoice(null);
    setShowConsequence(false);
    setShowLearningMoment(false);

    const text = currentScene.text;
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.substring(0, i + 1));
        i++;
      } else {
        setTextComplete(true);
        clearInterval(timer);
      }
    }, 18);

    return () => clearInterval(timer);
  }, [currentSceneIndex, currentScene]);

  const skipTypewriter = () => {
    if (currentScene) {
      setDisplayedText(currentScene.text);
      setTextComplete(true);
    }
  };

  // ─── Choice selection ───
  const handleChoiceSelect = useCallback((choice: any) => {
    setSelectedChoice(choice);

    setShowGoldenFlash(true);
    setTimeout(() => setShowGoldenFlash(false), 400);

    setShowConsequence(true);

    // Show learning moment after a delay
    setTimeout(() => setShowLearningMoment(true), 1200);

    const pts = choice.points || choice;
    const empathy = pts.empathyPoints || 0;
    const insight = pts.insightPoints || 0;
    const courage = pts.couragePoints || 0;
    const points = empathy + insight + courage;
    const xp = points * 5 + 10;
    setEarnedXP((prev) => prev + xp);
    setEarnedEmpathy((prev) => prev + empathy);
    setEarnedInsight((prev) => prev + insight);
    setEarnedCourage((prev) => prev + courage);
    addXP(xp);

    if (points > 0) {
      setComboMultiplier((prev) => Math.min(prev + 0.25, 3));
      (useGameStore.getState() as any).increaseCombo?.();
    } else {
      (useGameStore.getState() as any).resetCombo?.();
    }

    (useGameStore.getState() as any).addSkillPoints?.(empathy, insight, courage);

    if (Math.random() < 0.3) {
      const wisdomCards = getIslandData(islandId).wisdomCards;
      if (wisdomCards.length > 0) {
        const randomCard = wisdomCards[Math.floor(Math.random() * wisdomCards.length)];
        collectWisdomCard(randomCard.id);
        (useGameStore.getState() as any).triggerEvent?.('wisdom-card-found', { cardId: randomCard.id });
      }
    }
  }, [addXP, collectWisdomCard, islandId]);

  // ─── Continue to next scene ───
  const handleContinue = () => {
    if (!selectedChoice) return;

    if (selectedChoice.nextSceneId === null) {
      setIsComplete(true);
      if (scenario) {
        completeScenario(scenario.id, islandId);
      }
    } else {
      const nextIndex = scenario?.scenes?.findIndex(
        (s: any) => s.id === selectedChoice.nextSceneId
      );
      if (nextIndex !== undefined && nextIndex >= 0) {
        setCurrentSceneIndex(nextIndex);
      } else {
        setCurrentSceneIndex((prev) => prev + 1);
      }
    }
  };

  // ─── Advance narrative-only scenes ───
  const handleAdvanceNarrative = () => {
    if (currentScene && (!currentScene.choices || currentScene.choices.length === 0)) {
      if (currentSceneIndex < (scenario?.scenes?.length || 0) - 1) {
        setCurrentSceneIndex((prev) => prev + 1);
      } else {
        setIsComplete(true);
        if (scenario) {
          completeScenario(scenario.id, islandId);
        }
      }
    }
  };

  // ─── Finish and return ───
  const handleFinish = () => {
    if (reflection.trim()) {
      addJournalEntry({
        date: new Date().toISOString(),
        prompt: `Reflexion zu "${scenario?.title}"`,
        response: reflection,
        islandId,
      });
    }
    setScreen('island');
  };

  // =====================================================================
  // Scenario not found
  // =====================================================================

  if (!scenario) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-b from-[#0d0d1a] to-[#1a0a2e]">
        <div className="fog-layer" />
        <div className="text-center relative z-10">
          <p className="text-xl text-[#e8e0d0]/70 font-title">Szenario nicht gefunden</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setScreen('island')}
            className="mt-4 px-6 py-2 rounded-full font-title text-sm ornate-border cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #92600a, #b8860b, #daa520)',
              color: '#1a0a2e',
            }}
          >
            Zur{'\u00FC'}ck
          </motion.button>
        </div>
      </div>
    );
  }

  // =====================================================================
  // Completion screen - dramatic with skill visualization
  // =====================================================================

  if (isComplete) {
    return (
      <div
        className="h-screen flex items-center justify-center p-4 overflow-auto relative"
        style={{ background: SCENARIO_BG[islandId] || SCENARIO_BG.volcano }}
      >
        <div className="vignette fixed inset-0 z-0" />
        <div className="fog-layer" />
        <IslandParticles islandId={islandId} count={12} />

        {/* Dramatic radial glow */}
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{
            background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.12) 0%, transparent 60%)',
          }}
        />

        {/* Rotating light rays */}
        <motion.div
          className="absolute pointer-events-none"
          style={{
            width: '600px',
            height: '600px',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: `conic-gradient(
              from 0deg,
              transparent 0deg,
              rgba(201,168,76,0.04) 15deg,
              transparent 30deg,
              transparent 90deg,
              rgba(201,168,76,0.04) 105deg,
              transparent 120deg,
              transparent 180deg,
              rgba(201,168,76,0.04) 195deg,
              transparent 210deg,
              transparent 270deg,
              rgba(201,168,76,0.04) 285deg,
              transparent 300deg,
              transparent 360deg
            )`,
            filter: 'blur(15px)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 80, damping: 18 }}
          className="glass-panel rounded-2xl p-6 md:p-8 max-w-lg w-full text-center relative z-10 ornate-border"
        >
          {/* Trophy icon */}
          <motion.div
            className="text-5xl mb-2"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 150, damping: 12, delay: 0.2 }}
            style={{
              filter: 'drop-shadow(0 0 20px rgba(255,215,0,0.4))',
            }}
          >
            {'\u{1F3C6}'}
          </motion.div>

          <motion.h2
            className="text-3xl md:text-4xl font-bold text-golden font-title mb-1 animate-golden-glow"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Geschafft!
          </motion.h2>

          <motion.p
            className="text-[#e8e0d0]/70 mb-4 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Du hast &quot;{scenario.title}&quot; abgeschlossen!
          </motion.p>

          {/* XP badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-5 py-2 mb-5 rounded-full"
            style={{
              background: 'linear-gradient(135deg, rgba(146,96,10,0.3), rgba(218,165,32,0.2))',
              border: '1px solid rgba(201,168,76,0.3)',
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, type: 'spring', stiffness: 120, damping: 15 }}
          >
            <motion.span
              className="text-xl"
              animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.15, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              {'\u2B50'}
            </motion.span>
            <span className="font-bold text-golden font-title text-lg">
              +{animatedXP} EP
            </span>
          </motion.div>

          {/* Skill bars visualization */}
          {(earnedEmpathy > 0 || earnedInsight > 0 || earnedCourage > 0) && (
            <motion.div
              className="mb-5 p-4 rounded-xl space-y-3"
              style={{
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid rgba(201,168,76,0.1)',
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.5 }}
            >
              <p className="text-xs font-title text-golden/60 uppercase tracking-[0.15em] mb-2">
                Deine Superkr{'\u00E4'}fte wachsen
              </p>
              {earnedEmpathy > 0 && (
                <SkillBar
                  label="Empathie"
                  icon={'\u{1F497}'}
                  value={earnedEmpathy}
                  color="#fd79a8"
                  delay={1.2}
                />
              )}
              {earnedInsight > 0 && (
                <SkillBar
                  label="Einsicht"
                  icon={'\u{1F4A1}'}
                  value={earnedInsight}
                  color="#a29bfe"
                  delay={1.4}
                />
              )}
              {earnedCourage > 0 && (
                <SkillBar
                  label="Mut"
                  icon={'\u{1F981}'}
                  value={earnedCourage}
                  color="#ffa502"
                  delay={1.6}
                />
              )}

              {/* Total skill progress */}
              <motion.div
                className="mt-3 pt-3 flex justify-around text-center"
                style={{ borderTop: '1px solid rgba(201,168,76,0.1)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.0 }}
              >
                <div>
                  <span className="text-lg">{'\u{1F497}'}</span>
                  <p className="text-xs text-pink-400/80 font-bold">{totalEmpathyPoints + earnedEmpathy}</p>
                </div>
                <div>
                  <span className="text-lg">{'\u{1F4A1}'}</span>
                  <p className="text-xs text-purple-400/80 font-bold">{totalInsightPoints + earnedInsight}</p>
                </div>
                <div>
                  <span className="text-lg">{'\u{1F981}'}</span>
                  <p className="text-xs text-amber-400/80 font-bold">{totalCouragePoints + earnedCourage}</p>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Reflection */}
          <motion.div
            className="text-left mb-5"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <h3 className="font-title text-golden text-sm font-semibold mb-2 flex items-center gap-2">
              <span className="text-lg">{'\u{1FA9E}'}</span>
              Was nimmst du aus dieser Geschichte mit?
            </h3>
            <textarea
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="Deine Gedanken... (optional)"
              className="w-full p-4 rounded-xl resize-none glass-panel text-[#e8e0d0] placeholder-[#a09888] focus:outline-none transition-all duration-300"
              style={{ border: '1px solid rgba(201,168,76,0.15)' }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'rgba(201,168,76,0.5)';
                e.currentTarget.style.boxShadow = '0 0 15px rgba(201,168,76,0.1)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(201,168,76,0.15)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              rows={3}
            />
            <p className="text-xs text-[#a09888] mt-1">Nur du kannst das lesen.</p>
          </motion.div>

          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 25px rgba(201,168,76,0.4), 0 0 50px rgba(201,168,76,0.15)',
            }}
            whileTap={{ scale: 0.95 }}
            onClick={handleFinish}
            className="font-title font-bold py-3 px-8 rounded-full ornate-border transition-all duration-300 cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #92600a, #b8860b, #daa520, #ffd700)',
              color: '#1a0a2e',
              boxShadow: '0 0 15px rgba(201,168,76,0.2)',
            }}
          >
            Weiter {'\u2192'}
          </motion.button>
        </motion.div>
      </div>
    );
  }

  // =====================================================================
  // Main gameplay screen
  // =====================================================================

  return (
    <div
      className="h-screen flex flex-col overflow-hidden relative"
      style={{ background: SCENARIO_BG[islandId] || SCENARIO_BG.volcano }}
    >
      {/* ── Atmospheric layers ── */}
      <div className="vignette fixed inset-0 z-0 pointer-events-none" />
      <div className="fog-layer" />
      <IslandParticles islandId={islandId} count={6} />

      {/* Golden flash overlay */}
      <AnimatePresence>
        {showGoldenFlash && (
          <motion.div
            className="fixed inset-0 z-50 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.25) 0%, transparent 70%)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
        )}
      </AnimatePresence>

      {/* ── Scene illustration banner ── */}
      <SceneIllustration
        islandId={islandId}
        sceneIndex={currentSceneIndex}
        totalScenes={scenario.scenes.length}
        title={scenario.title}
      />

      {/* ── Back button (floating) ── */}
      <motion.button
        whileHover={{ x: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setScreen('island')}
        className="absolute top-3 left-3 z-20 text-[#a09888] hover:text-golden font-title text-sm font-semibold transition-colors duration-300 px-3 py-1.5 rounded-lg cursor-pointer"
        style={{
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(8px)',
        }}
      >
        {'\u2190'} Zur{'\u00FC'}ck
      </motion.button>

      {/* ── Scene content ── */}
      <div className="flex-1 flex flex-col justify-start px-4 md:px-6 pb-4 overflow-auto relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSceneIndex}
            initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl mx-auto w-full"
          >
            {currentScene && (
              <>
                {/* ── Speaker display ── */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative flex items-center justify-center w-14 h-14 shrink-0">
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: 'conic-gradient(from 0deg, #b8860b, #ffd700, #daa520, #ffd700, #b8860b)',
                        padding: '2px',
                      }}
                      animate={{
                        boxShadow: [
                          '0 0 10px rgba(201,168,76,0.2)',
                          '0 0 20px rgba(201,168,76,0.4)',
                          '0 0 10px rgba(201,168,76,0.2)',
                        ],
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <div className="w-full h-full rounded-full bg-[#0d0d1a]/90" />
                    </motion.div>
                    <div
                      className="absolute inset-[3px] rounded-full"
                      style={{
                        background: 'radial-gradient(circle at 40% 35%, rgba(255,215,0,0.12), transparent 70%)',
                      }}
                    />
                    <motion.span
                      className="relative z-10 text-2xl"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      {currentScene.speakerEmoji || '\u{1F4DC}'}
                    </motion.span>
                  </div>

                  <div>
                    <span className="font-title text-golden font-bold text-lg tracking-wide block">
                      {currentScene.speaker && currentScene.speaker !== 'narrator'
                        ? (currentScene.speaker === 'player' ? 'Du' : currentScene.speaker)
                        : 'Erz\u00E4hler'}
                    </span>
                    <div className="flex gap-1 mt-1">
                      {scenario.scenes.map((_: any, i: number) => (
                        <div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                          style={{
                            background: i <= currentSceneIndex
                              ? 'linear-gradient(135deg, #c9a84c, #ffd700)'
                              : 'rgba(160,152,136,0.2)',
                            boxShadow: i === currentSceneIndex ? '0 0 6px rgba(201,168,76,0.6)' : 'none',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* ── Text bubble ── */}
                <motion.div
                  className="glass-panel rounded-2xl p-5 md:p-6 mb-4 cursor-pointer relative overflow-hidden"
                  style={{ borderTop: '2px solid rgba(201,168,76,0.2)' }}
                  onClick={() => {
                    if (!textComplete) skipTypewriter();
                    else if (!currentScene.choices || currentScene.choices.length === 0) handleAdvanceNarrative();
                  }}
                  whileHover={{ boxShadow: '0 0 20px rgba(201,168,76,0.08)' }}
                >
                  <div
                    className="absolute top-0 left-4 right-4 h-px"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)',
                    }}
                  />

                  <p className="text-[#e8e0d0] text-base md:text-lg leading-relaxed whitespace-pre-line">
                    {displayedText}
                    {!textComplete && (
                      <motion.span
                        className="inline-block ml-0.5 text-golden"
                        animate={{ opacity: [1, 0.2, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        |
                      </motion.span>
                    )}
                  </p>

                  {!textComplete && (
                    <motion.p
                      className="text-xs text-[#a09888]/50 mt-2 text-right"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2 }}
                    >
                      Tippe zum {'\u00DC'}berspringen
                    </motion.p>
                  )}
                </motion.div>

                {/* ── Consequence display ── */}
                <AnimatePresence>
                  {showConsequence && selectedChoice && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                      className="glass-panel ornate-border rounded-2xl p-5 mb-3"
                    >
                      <p className="text-[#e8e0d0] mb-3 leading-relaxed italic">
                        {getSmartConsequence(selectedChoice)}
                      </p>

                      {(() => {
                        const pts = selectedChoice.points || selectedChoice;
                        const emp = pts.empathyPoints || 0;
                        const ins = pts.insightPoints || 0;
                        const cou = pts.couragePoints || 0;
                        if (emp + ins + cou === 0) return null;
                        return (
                          <div className="flex items-center gap-4 text-sm flex-wrap mb-2">
                            {emp > 0 && (
                              <motion.span
                                className="text-pink-400 font-semibold flex items-center gap-1"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2, duration: 0.4 }}
                              >
                                {'\u{1F497}'} +{emp} Empathie
                              </motion.span>
                            )}
                            {ins > 0 && (
                              <motion.span
                                className="text-purple-400 font-semibold flex items-center gap-1"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.35, duration: 0.4 }}
                              >
                                {'\u{1F4A1}'} +{ins} Einsicht
                              </motion.span>
                            )}
                            {cou > 0 && (
                              <motion.span
                                className="text-amber-400 font-semibold flex items-center gap-1"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5, duration: 0.4 }}
                              >
                                {'\u{1F981}'} +{cou} Mut
                              </motion.span>
                            )}
                          </div>
                        );
                      })()}

                      {comboMultiplier > 1 && (
                        <motion.div
                          className="text-xs font-title text-golden font-semibold"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.6, type: 'spring', stiffness: 150, damping: 12 }}
                        >
                          {'\u2728'} Kombo x{comboMultiplier.toFixed(2)}
                        </motion.div>
                      )}

                      {/* Educational learning moment */}
                      <AnimatePresence>
                        {showLearningMoment && getLearningMoment(selectedChoice) && (
                          <motion.div
                            className="mt-3 p-3 rounded-xl text-xs leading-relaxed"
                            style={{
                              background: 'rgba(108,92,231,0.1)',
                              border: '1px solid rgba(108,92,231,0.2)',
                              color: '#dfe6e9',
                            }}
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.4 }}
                          >
                            {getLearningMoment(selectedChoice)}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <motion.button
                        whileHover={{
                          scale: 1.05,
                          boxShadow: '0 0 20px rgba(201,168,76,0.35)',
                        }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleContinue}
                        className="mt-4 font-title font-bold py-2.5 px-7 rounded-full ornate-border transition-all duration-300 cursor-pointer"
                        style={{
                          background: 'linear-gradient(135deg, #92600a, #b8860b, #daa520, #ffd700)',
                          color: '#1a0a2e',
                          boxShadow: '0 0 12px rgba(201,168,76,0.2)',
                        }}
                      >
                        Weiter {'\u2192'}
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* ── Choices with skill previews ── */}
                {textComplete &&
                  !selectedChoice &&
                  currentScene.choices &&
                  currentScene.choices.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="grid grid-cols-1 gap-2.5"
                    >
                      <div className="flex items-center justify-center gap-3 mb-1">
                        <RuneAccent className="text-amber-500/50" />
                        <span className="text-sm text-golden font-title font-semibold tracking-wider">
                          Was tust du?
                        </span>
                        <RuneAccent className="text-amber-500/50" />
                      </div>

                      {currentScene.choices.map((choice: any, choiceIndex: number) => {
                        const icon = getChoiceIcon(choice);
                        const skillLabel = getChoiceSkillLabel(choice);
                        const accentColor = getChoiceColor(choice);
                        return (
                          <motion.button
                            key={choice.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              delay: 0.1 + choiceIndex * 0.12,
                              duration: 0.35,
                            }}
                            whileHover={{
                              scale: 1.02,
                              x: 5,
                              boxShadow: `0 0 20px ${accentColor}30, 0 4px 20px rgba(0,0,0,0.3)`,
                            }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleChoiceSelect(choice)}
                            className="glass-panel-light p-4 rounded-xl text-left transition-all duration-300 group relative overflow-hidden cursor-pointer"
                            style={{
                              borderLeft: `3px solid ${accentColor}`,
                            }}
                          >
                            {/* Shimmer overlay */}
                            <div
                              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                              style={{
                                background: `linear-gradient(90deg, transparent 0%, ${accentColor}08 40%, ${accentColor}15 50%, ${accentColor}08 60%, transparent 100%)`,
                                backgroundSize: '200% 100%',
                                animation: 'shimmer 2s ease-in-out infinite',
                              }}
                            />

                            <div className="flex items-start gap-3 relative z-10">
                              <motion.span
                                className="text-lg mt-0.5 opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                                whileHover={{ scale: 1.2 }}
                              >
                                {icon}
                              </motion.span>
                              <div className="flex-1 min-w-0">
                                <span className="text-[#e8e0d0] font-medium leading-relaxed block">
                                  {choice.text}
                                </span>
                                {skillLabel && (
                                  <span
                                    className="inline-block mt-1.5 text-[10px] font-title font-bold uppercase tracking-[0.12em] px-2 py-0.5 rounded-full opacity-60 group-hover:opacity-90 transition-opacity"
                                    style={{
                                      background: `${accentColor}15`,
                                      border: `1px solid ${accentColor}40`,
                                      color: accentColor,
                                    }}
                                  >
                                    {icon} {skillLabel}
                                  </span>
                                )}
                              </div>
                            </div>
                          </motion.button>
                        );
                      })}
                    </motion.div>
                  )}

                {/* ── Narrative-only: click to continue ── */}
                {textComplete &&
                  (!currentScene.choices || currentScene.choices.length === 0) &&
                  !isComplete && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="text-center"
                    >
                      <motion.button
                        onClick={handleAdvanceNarrative}
                        className="text-golden/60 text-sm font-title hover:text-golden transition-colors duration-300 cursor-pointer"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        Klicke um fortzufahren...
                      </motion.button>
                    </motion.div>
                  )}
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
