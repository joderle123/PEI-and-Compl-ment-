// @ts-nocheck
import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../stores/gameStore';
import { getIslandData } from '../../data';
import type { IslandId } from '../../types';

// ---------------------------------------------------------------------------
// Types for the chat-based conversation system
// ---------------------------------------------------------------------------

type ChatMessage = {
  id: string;
  type: 'npc' | 'player' | 'narrator' | 'thought';
  text: string;
  speaker?: string;
  speakerEmoji?: string;
};

type SkillToast = {
  id: string;
  icon: string;
  label: string;
  color: string;
};

// ---------------------------------------------------------------------------
// Island-themed backgrounds & accent colors
// ---------------------------------------------------------------------------

const ISLAND_THEME: Record<string, {
  bg: string;
  accent: string;
  accentSoft: string;
  emoji: string;
  bubbleNpc: string;
  bubblePlayer: string;
}> = {
  volcano: {
    bg: 'radial-gradient(ellipse at 50% 100%, rgba(255,60,10,0.12) 0%, transparent 50%), linear-gradient(180deg, #0d0d1a 0%, #2d1810 40%, #1a0a0a 100%)',
    accent: '#ff6b35',
    accentSoft: 'rgba(255,107,53,0.15)',
    emoji: '\u{1F30B}',
    bubbleNpc: 'rgba(255,107,53,0.08)',
    bubblePlayer: 'rgba(201,168,76,0.12)',
  },
  ocean: {
    bg: 'radial-gradient(ellipse at 50% 100%, rgba(0,80,200,0.12) 0%, transparent 50%), linear-gradient(180deg, #0d0d1a 0%, #0a1a3a 40%, #050d1a 100%)',
    accent: '#74b9ff',
    accentSoft: 'rgba(116,185,255,0.15)',
    emoji: '\u{1F30A}',
    bubbleNpc: 'rgba(116,185,255,0.08)',
    bubblePlayer: 'rgba(201,168,76,0.12)',
  },
  forest: {
    bg: 'radial-gradient(ellipse at 50% 100%, rgba(0,120,50,0.1) 0%, transparent 50%), linear-gradient(180deg, #0d0d1a 0%, #0a2d18 40%, #050d0a 100%)',
    accent: '#55efc4',
    accentSoft: 'rgba(85,239,196,0.15)',
    emoji: '\u{1F332}',
    bubbleNpc: 'rgba(85,239,196,0.08)',
    bubblePlayer: 'rgba(201,168,76,0.12)',
  },
  mountain: {
    bg: 'radial-gradient(ellipse at 50% 100%, rgba(140,120,200,0.1) 0%, transparent 50%), linear-gradient(180deg, #0d0d1a 0%, #1a1530 40%, #0d0a1a 100%)',
    accent: '#a29bfe',
    accentSoft: 'rgba(162,155,254,0.15)',
    emoji: '\u{26F0}\u{FE0F}',
    bubbleNpc: 'rgba(162,155,254,0.08)',
    bubblePlayer: 'rgba(201,168,76,0.12)',
  },
  garden: {
    bg: 'radial-gradient(ellipse at 50% 100%, rgba(255,100,150,0.08) 0%, transparent 50%), linear-gradient(180deg, #0d0d1a 0%, #2d1828 40%, #1a0a15 100%)',
    accent: '#fd79a8',
    accentSoft: 'rgba(253,121,168,0.15)',
    emoji: '\u{1F33A}',
    bubbleNpc: 'rgba(253,121,168,0.08)',
    bubblePlayer: 'rgba(201,168,76,0.12)',
  },
  night: {
    bg: 'radial-gradient(ellipse at 50% 20%, rgba(80,60,180,0.12) 0%, transparent 50%), linear-gradient(180deg, #050510 0%, #0d0d2e 40%, #050510 100%)',
    accent: '#6c5ce7',
    accentSoft: 'rgba(108,92,231,0.15)',
    emoji: '\u{1F303}',
    bubbleNpc: 'rgba(108,92,231,0.08)',
    bubblePlayer: 'rgba(201,168,76,0.12)',
  },
  rainbow: {
    bg: 'radial-gradient(ellipse at 50% 100%, rgba(255,180,0,0.08) 0%, transparent 50%), linear-gradient(180deg, #0d0d1a 0%, #2d2018 40%, #1a150a 100%)',
    accent: '#ffeaa7',
    accentSoft: 'rgba(255,234,167,0.15)',
    emoji: '\u{1F308}',
    bubbleNpc: 'rgba(255,234,167,0.08)',
    bubblePlayer: 'rgba(201,168,76,0.12)',
  },
  home: {
    bg: 'radial-gradient(ellipse at 50% 100%, rgba(201,168,76,0.1) 0%, transparent 50%), linear-gradient(180deg, #0d0d1a 0%, #1a1510 40%, #0d0d0a 100%)',
    accent: '#ffd700',
    accentSoft: 'rgba(255,215,0,0.15)',
    emoji: '\u{1F3E0}',
    bubbleNpc: 'rgba(255,215,0,0.08)',
    bubblePlayer: 'rgba(201,168,76,0.12)',
  },
};

// ---------------------------------------------------------------------------
// Consequence text generation (kept from original, simplified)
// ---------------------------------------------------------------------------

const CONSEQUENCE_POOL: Record<string, string[]> = {
  empathy: [
    'Dein Mitgef\u00FChl leuchtet auf. Du verstehst, was andere f\u00FChlen.',
    'Du hast mit dem Herzen gehandelt \u2013 das braucht echte St\u00E4rke.',
    'Empathie ist eine Superkraft, und du hast sie gerade eingesetzt.',
    'Du siehst die Welt durch die Augen anderer. Das ist selten.',
  ],
  insight: [
    'Kluge Entscheidung. Du siehst tiefer als die meisten.',
    'Nachdenken vor dem Handeln \u2013 das ist echte Weisheit.',
    'Dein Verstand schneidet durch den Nebel. Beeindruckende Einsicht.',
    'Du hast das Offensichtliche hinterfragt. Genau richtig.',
  ],
  courage: [
    'Mutig! Nicht jeder h\u00E4tte sich das getraut.',
    'Dein Mut brennt hell. Du hast dich nicht einsch\u00FCchtern lassen.',
    'Manchmal braucht es Mut, das Richtige zu tun. Du hast ihn.',
    'Du bist mutig vorangegangen, w\u00E4hrend andere z\u00F6gern w\u00FCrden.',
  ],
  balanced: [
    'Eine ausgewogene Entscheidung \u2013 Kopf UND Herz arbeiten zusammen.',
    'Du hast alle Seiten abgewogen. Das zeigt echte Reife.',
    'Balance ist nicht Mittelma\u00DF \u2013 es ist die schwerste Kunst.',
  ],
  wrong: [
    'Das war nicht die beste Entscheidung. Dein Gegen\u00FCber zieht sich zur\u00FCck.',
    'Hmm... das hat die Situation eher verschlechtert. Aber du kannst daraus lernen.',
    'Das hat wehgetan. Worte haben Macht \u2013 manchmal mehr als wir denken.',
    'Die Stimmung kippt. Vielleicht h\u00E4tte es einen besseren Weg gegeben.',
    'Du sp\u00FCrst sofort: Das war falsch. Aber Fehler sind auch Lehrer.',
    'Das Vertrauen ist angeknackst. N\u00E4chstes Mal genauer nachdenken.',
  ],
};

/** Determine if a choice is "wrong" (0 total points or explicitly marked) */
function isWrongChoice(choice: any): boolean {
  if (choice.isWrong) return true;
  const pts = choice.points || choice;
  const total = (pts.empathyPoints || 0) + (pts.insightPoints || 0) + (pts.couragePoints || 0);
  return total <= 0;
}

function getConsequenceText(choice: any): string {
  if (choice.consequence) return choice.consequence;
  const pts = choice.points || choice;
  const emp = pts.empathyPoints || 0;
  const ins = pts.insightPoints || 0;
  const cou = pts.couragePoints || 0;
  const total = emp + ins + cou;
  const hash = (choice.id || '').split('').reduce((a: number, c: string) => a + c.charCodeAt(0), 0);
  // Wrong choices get negative feedback
  if (total <= 0) return CONSEQUENCE_POOL.wrong[hash % CONSEQUENCE_POOL.wrong.length];
  const max = Math.max(emp, ins, cou);
  if (emp === ins && ins === cou) return CONSEQUENCE_POOL.balanced[hash % CONSEQUENCE_POOL.balanced.length];
  if (max === emp) return CONSEQUENCE_POOL.empathy[hash % CONSEQUENCE_POOL.empathy.length];
  if (max === ins) return CONSEQUENCE_POOL.insight[hash % CONSEQUENCE_POOL.insight.length];
  return CONSEQUENCE_POOL.courage[hash % CONSEQUENCE_POOL.courage.length];
}

function getSkillToasts(choice: any): SkillToast[] {
  const pts = choice.points || choice;
  const toasts: SkillToast[] = [];
  const total = (pts.empathyPoints || 0) + (pts.insightPoints || 0) + (pts.couragePoints || 0);
  // Wrong choice: show warning toast
  if (total <= 0) {
    toasts.push({ id: 'wrong', icon: '\u26A0\uFE0F', label: 'Fehlgriff', color: '#e74c3c' });
    return toasts;
  }
  if ((pts.empathyPoints || 0) > 0) toasts.push({ id: 'emp', icon: '\u{1F497}', label: 'Empathie', color: '#fd79a8' });
  if ((pts.insightPoints || 0) > 0) toasts.push({ id: 'ins', icon: '\u{1F4A1}', label: 'Einsicht', color: '#a29bfe' });
  if ((pts.couragePoints || 0) > 0) toasts.push({ id: 'cou', icon: '\u{1F981}', label: 'Mut', color: '#ffa502' });
  return toasts;
}

// ---------------------------------------------------------------------------
// Ambient floating particles
// ---------------------------------------------------------------------------

function AmbientParticles({ accent, count = 6 }: { accent: string; count?: number }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 2 + Math.random() * 3,
        dur: 5 + Math.random() * 7,
        delay: Math.random() * 4,
      })),
    [count],
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
            backgroundColor: accent,
            boxShadow: `0 0 ${p.size * 2}px ${accent}`,
          }}
          animate={{ opacity: [0, 0.5, 0], y: [0, -30, -60] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeOut' }}
        />
      ))}
    </>
  );
}

// ---------------------------------------------------------------------------
// Chat bubble components
// ---------------------------------------------------------------------------

function NpcBubble({
  msg,
  theme,
  isLatest,
}: {
  msg: ChatMessage;
  theme: typeof ISLAND_THEME.volcano;
  isLatest: boolean;
}) {
  return (
    <motion.div
      className="flex items-start gap-3 max-w-[88%]"
      initial={{ opacity: 0, x: -20, y: 10 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Avatar */}
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0"
        style={{
          background: theme.accentSoft,
          border: `1.5px solid ${theme.accent}40`,
          boxShadow: isLatest ? `0 0 12px ${theme.accent}25` : 'none',
        }}
      >
        {msg.speakerEmoji || '\u{1F4DC}'}
      </div>

      <div className="flex-1 min-w-0">
        {/* Speaker name */}
        {msg.speaker && (
          <p
            className="text-xs font-semibold mb-1 ml-1"
            style={{ color: theme.accent, opacity: 0.8 }}
          >
            {msg.speaker}
          </p>
        )}

        {/* Message bubble */}
        <div
          className="rounded-2xl rounded-tl-md px-4 py-3 leading-relaxed"
          style={{
            backgroundColor: theme.bubbleNpc,
            border: `1px solid ${theme.accent}15`,
            color: '#e8e0d0',
            fontSize: '0.95rem',
          }}
        >
          {msg.text}
        </div>
      </div>
    </motion.div>
  );
}

function NarratorBubble({ msg }: { msg: ChatMessage }) {
  return (
    <motion.div
      className="flex justify-center px-6"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div
        className="px-5 py-3 rounded-2xl text-center leading-relaxed max-w-[90%]"
        style={{
          backgroundColor: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.06)',
          color: 'rgba(232,224,208,0.8)',
          fontSize: '0.9rem',
          fontStyle: 'italic',
        }}
      >
        {msg.text}
      </div>
    </motion.div>
  );
}

function PlayerBubble({ msg }: { msg: ChatMessage }) {
  return (
    <motion.div
      className="flex justify-end"
      initial={{ opacity: 0, x: 20, y: 10 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="rounded-2xl rounded-tr-md px-4 py-3 max-w-[80%] leading-relaxed"
        style={{
          background: 'linear-gradient(135deg, rgba(201,168,76,0.18), rgba(201,168,76,0.08))',
          border: '1px solid rgba(201,168,76,0.25)',
          color: '#e8d5a3',
          fontSize: '0.95rem',
        }}
      >
        {msg.text}
      </div>
    </motion.div>
  );
}

function ThoughtBubble({ msg, theme }: { msg: ChatMessage; theme: typeof ISLAND_THEME.volcano }) {
  return (
    <motion.div
      className="flex justify-center px-4"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="px-5 py-3 rounded-2xl text-center leading-relaxed max-w-[85%]"
        style={{
          background: `linear-gradient(135deg, ${theme.accent}10, ${theme.accent}05)`,
          border: `1px solid ${theme.accent}20`,
          color: theme.accent,
          fontSize: '0.85rem',
          fontStyle: 'italic',
        }}
      >
        {msg.text}
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Skill toast notification
// ---------------------------------------------------------------------------

function SkillToastNotification({ toasts }: { toasts: SkillToast[] }) {
  if (toasts.length === 0) return null;
  return (
    <motion.div
      className="fixed top-4 right-4 z-50 flex flex-col gap-1.5 pointer-events-none"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30, transition: { duration: 0.3 } }}
      transition={{ duration: 0.4 }}
    >
      {toasts.map((t) => (
        <motion.div
          key={t.id}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full"
          style={{
            background: `${t.color}18`,
            border: `1px solid ${t.color}35`,
            backdropFilter: 'blur(12px)',
          }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          <span className="text-sm">{t.icon}</span>
          <span className="text-xs font-semibold" style={{ color: t.color }}>
            +{t.label}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Progress indicator (subtle dots)
// ---------------------------------------------------------------------------

function ProgressDots({ current, total, accent }: { current: number; total: number; accent: string }) {
  if (total <= 1) return null;
  return (
    <div className="flex items-center gap-1.5 justify-center">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className="rounded-full transition-all duration-500"
          style={{
            width: i === current ? '18px' : '5px',
            height: '5px',
            background: i <= current
              ? `linear-gradient(90deg, ${accent}, #ffd700)`
              : 'rgba(255,255,255,0.1)',
            boxShadow: i === current ? `0 0 8px ${accent}60` : 'none',
          }}
        />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main ScenarioPlayer component
// ---------------------------------------------------------------------------

export default function ScenarioPlayer() {
  const {
    activeIsland,
    addXP,
    completeScenario,
    collectWisdomCard,
    addJournalEntry,
    setScreen,
  } = useGameStore();

  const scenarioId = sessionStorage.getItem('activeScenarioId');
  const islandId = (sessionStorage.getItem('activeIslandId') || activeIsland || 'volcano') as IslandId;
  const theme = ISLAND_THEME[islandId] || ISLAND_THEME.volcano;

  const data = getIslandData(islandId);
  const scenario = data.scenarios.find((s: any) => s.id === scenarioId);

  // ─── State ───
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [chatLog, setChatLog] = useState<ChatMessage[]>([]);
  const [awaitingChoice, setAwaitingChoice] = useState(false);
  const [awaitingContinue, setAwaitingContinue] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [reflection, setReflection] = useState('');
  const [earnedXP, setEarnedXP] = useState(0);
  const [activeToasts, setActiveToasts] = useState<SkillToast[]>([]);
  const [showReflection, setShowReflection] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const msgCounter = useRef(0);

  const currentScene = scenario?.scenes?.[currentSceneIndex];

  // ─── Auto-scroll to bottom ───
  useEffect(() => {
    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, [chatLog, awaitingChoice, awaitingContinue]);

  // ─── Add scene text to chat when scene changes ───
  useEffect(() => {
    if (!currentScene) return;

    const isNarrator = !currentScene.speaker || currentScene.speaker === 'narrator';
    const isPlayer = currentScene.speaker === 'player';

    const newMsg: ChatMessage = {
      id: `msg-${++msgCounter.current}`,
      type: isNarrator ? 'narrator' : isPlayer ? 'player' : 'npc',
      text: currentScene.text,
      speaker: isNarrator
        ? undefined
        : isPlayer
        ? 'Du'
        : currentScene.speaker,
      speakerEmoji: currentScene.speakerEmoji,
    };

    setChatLog((prev) => [...prev, newMsg]);

    // Determine what to show after text
    if (currentScene.choices && currentScene.choices.length > 0) {
      // Slight delay before showing choices for dramatic effect
      setTimeout(() => setAwaitingChoice(true), 600);
    } else {
      setTimeout(() => setAwaitingContinue(true), 400);
    }
  }, [currentSceneIndex, currentScene]);

  // ─── Choice selection ───
  const handleChoiceSelect = useCallback(
    (choice: any) => {
      setAwaitingChoice(false);

      const wrong = isWrongChoice(choice);

      // Add player's choice to chat
      const playerMsg: ChatMessage = {
        id: `msg-${++msgCounter.current}`,
        type: 'player',
        text: choice.text,
      };
      setChatLog((prev) => [...prev, playerMsg]);

      // Calculate points
      const pts = choice.points || choice;
      const empathy = Math.max(0, pts.empathyPoints || 0);
      const insight = Math.max(0, pts.insightPoints || 0);
      const courage = Math.max(0, pts.couragePoints || 0);
      const points = empathy + insight + courage;

      if (wrong) {
        // Wrong choice: 0 XP, reset combo, no skill points
        (useGameStore.getState() as any).resetCombo?.();
      } else {
        // Good choice: normal XP reward
        const xp = points * 5 + 10;
        setEarnedXP((prev) => prev + xp);
        addXP(xp);
        if (points > 0) {
          (useGameStore.getState() as any).increaseCombo?.();
        }
        (useGameStore.getState() as any).addSkillPoints?.(empathy, insight, courage);
      }

      // Show skill toasts (warning for wrong, positive for good)
      const toasts = getSkillToasts(choice);
      if (toasts.length > 0) {
        setActiveToasts(toasts);
        setTimeout(() => setActiveToasts([]), wrong ? 3500 : 2500);
      }

      // Wisdom card chance - only on good choices
      if (!wrong && Math.random() < 0.3) {
        const wisdomCards = getIslandData(islandId).wisdomCards;
        if (wisdomCards.length > 0) {
          const randomCard = wisdomCards[Math.floor(Math.random() * wisdomCards.length)];
          collectWisdomCard(randomCard.id);
          (useGameStore.getState() as any).triggerEvent?.('wisdom-card-found', { cardId: randomCard.id });
        }
      }

      // Add consequence as response (after a beat)
      const consequenceText = getConsequenceText(choice);
      if (consequenceText) {
        setTimeout(() => {
          const consequenceMsg: ChatMessage = {
            id: `msg-${++msgCounter.current}`,
            // Wrong choices show as 'warning' type, good as 'thought'
            type: wrong ? 'narrator' : 'thought',
            text: wrong ? `\u26A0\uFE0F ${consequenceText}` : consequenceText,
          };
          setChatLog((prev) => [...prev, consequenceMsg]);

          // Then show continue prompt
          setTimeout(() => setAwaitingContinue(true), wrong ? 800 : 500);
        }, 800);
      } else {
        setTimeout(() => setAwaitingContinue(true), 500);
      }

      // Store choice info for navigation
      sessionStorage.setItem('lastChoiceNextScene', choice.nextSceneId || '');
    },
    [addXP, collectWisdomCard, islandId],
  );

  // ─── Continue to next scene ───
  const handleContinue = useCallback(() => {
    setAwaitingContinue(false);

    const nextSceneId = sessionStorage.getItem('lastChoiceNextScene');

    // Check if this was the last scene
    if (nextSceneId === 'null' || nextSceneId === '') {
      // Check if there are more scenes after current
      if (currentSceneIndex >= (scenario?.scenes?.length || 0) - 1) {
        setIsComplete(true);
        if (scenario) {
          completeScenario(scenario.id, islandId);
        }
        return;
      }
    }

    if (nextSceneId && nextSceneId !== 'null' && nextSceneId !== '') {
      const nextIndex = scenario?.scenes?.findIndex((s: any) => s.id === nextSceneId);
      if (nextIndex !== undefined && nextIndex >= 0) {
        setCurrentSceneIndex(nextIndex);
        sessionStorage.removeItem('lastChoiceNextScene');
        return;
      }
    }

    // Default: advance linearly
    if (currentSceneIndex < (scenario?.scenes?.length || 0) - 1) {
      setCurrentSceneIndex((prev) => prev + 1);
    } else {
      setIsComplete(true);
      if (scenario) {
        completeScenario(scenario.id, islandId);
      }
    }
    sessionStorage.removeItem('lastChoiceNextScene');
  }, [currentSceneIndex, scenario, completeScenario, islandId]);

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
      <div
        className="h-screen flex items-center justify-center"
        style={{ background: 'linear-gradient(180deg, #0d0d1a 0%, #1a0a2e 50%, #0d0d1a 100%)' }}
      >
        <div className="text-center">
          <p className="text-xl" style={{ color: '#e8e0d0' }}>
            Szenario nicht gefunden
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setScreen('island')}
            className="mt-4 px-6 py-2 rounded-full font-semibold text-sm cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, rgba(201,168,76,0.3), rgba(201,168,76,0.15))',
              border: '1px solid rgba(201,168,76,0.5)',
              color: '#ffd700',
            }}
          >
            Zur{'\u00FC'}ck
          </motion.button>
        </div>
      </div>
    );
  }

  // =====================================================================
  // Completion screen - emotional, not stat-heavy
  // =====================================================================

  if (isComplete) {
    return (
      <div
        className="h-screen flex flex-col items-center justify-center p-6 overflow-auto relative"
        style={{ background: theme.bg }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.08) 0%, transparent 60%)',
        }} />
        <AmbientParticles accent={theme.accent} count={8} />

        <motion.div
          className="max-w-md w-full text-center relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Celebration */}
          <motion.div
            className="text-6xl mb-4"
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 10, delay: 0.2 }}
            style={{ filter: `drop-shadow(0 0 20px ${theme.accent}60)` }}
          >
            {'\u2728'}
          </motion.div>

          <motion.h2
            className="text-3xl font-bold mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{ color: '#ffd700', textShadow: '0 0 20px rgba(255,215,0,0.3)' }}
          >
            Geschichte abgeschlossen
          </motion.h2>

          <motion.p
            className="text-sm mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            style={{ color: 'rgba(232,224,208,0.7)' }}
          >
            &ldquo;{scenario.title}&rdquo;
          </motion.p>

          {/* XP earned - subtle badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{
              background: 'rgba(201,168,76,0.1)',
              border: '1px solid rgba(201,168,76,0.25)',
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, type: 'spring' }}
          >
            <span className="text-lg">{'\u2B50'}</span>
            <span className="font-bold text-sm" style={{ color: '#ffd700' }}>
              +{earnedXP} EP verdient
            </span>
          </motion.div>

          {/* Reflection - conversational */}
          {!showReflection ? (
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
            >
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: `0 0 20px ${theme.accent}30` }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowReflection(true)}
                className="w-full py-3.5 px-6 rounded-xl font-semibold text-sm cursor-pointer transition-all"
                style={{
                  background: `${theme.accent}12`,
                  border: `1px solid ${theme.accent}30`,
                  color: theme.accent,
                }}
              >
                {'\u{1FA9E}'} Ich m\u00F6chte kurz dar\u00FCber nachdenken...
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03, boxShadow: '0 0 25px rgba(201,168,76,0.3)' }}
                whileTap={{ scale: 0.97 }}
                onClick={handleFinish}
                className="w-full py-3.5 px-6 rounded-xl font-bold cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #92600a, #b8860b, #daa520, #ffd700)',
                  color: '#1a0a2e',
                  boxShadow: '0 0 15px rgba(201,168,76,0.2)',
                }}
              >
                Weiter erkunden {'\u2192'}
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-left space-y-3"
            >
              <p className="text-sm" style={{ color: 'rgba(232,224,208,0.6)' }}>
                Was nimmst du aus dieser Geschichte mit?
              </p>
              <textarea
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                placeholder="Deine Gedanken..."
                className="w-full p-4 rounded-xl resize-none text-sm focus:outline-none transition-all duration-300"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(201,168,76,0.15)',
                  color: '#e8e0d0',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)';
                  e.currentTarget.style.boxShadow = '0 0 12px rgba(201,168,76,0.08)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(201,168,76,0.15)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                rows={3}
                autoFocus
              />
              <p className="text-xs" style={{ color: 'rgba(160,152,136,0.5)' }}>
                Nur du kannst das lesen.
              </p>
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: '0 0 25px rgba(201,168,76,0.3)' }}
                whileTap={{ scale: 0.97 }}
                onClick={handleFinish}
                className="w-full py-3.5 px-6 rounded-xl font-bold cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #92600a, #b8860b, #daa520, #ffd700)',
                  color: '#1a0a2e',
                  boxShadow: '0 0 15px rgba(201,168,76,0.2)',
                }}
              >
                {reflection.trim() ? 'Speichern & weiter' : 'Weiter erkunden'} {'\u2192'}
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </div>
    );
  }

  // =====================================================================
  // Main chat-based gameplay
  // =====================================================================

  return (
    <div
      className="h-screen flex flex-col overflow-hidden relative"
      style={{ background: theme.bg }}
    >
      {/* Atmospheric layers */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.4) 100%)',
        }}
      />
      <AmbientParticles accent={theme.accent} />

      {/* Skill gain toasts */}
      <AnimatePresence>
        {activeToasts.length > 0 && <SkillToastNotification toasts={activeToasts} />}
      </AnimatePresence>

      {/* ── Header ── */}
      <div
        className="relative z-20 flex items-center justify-between px-4 py-3"
        style={{
          background: 'rgba(13,13,26,0.7)',
          backdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${theme.accent}15`,
        }}
      >
        <motion.button
          whileHover={{ x: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setScreen('island')}
          className="text-sm font-semibold transition-colors duration-300 px-2 py-1 rounded-lg cursor-pointer"
          style={{ color: 'rgba(160,152,136,0.7)' }}
        >
          {'\u2190'} Zur\u00FCck
        </motion.button>

        <div className="flex flex-col items-center">
          <span className="text-xs font-semibold" style={{ color: theme.accent, opacity: 0.6 }}>
            {scenario.title}
          </span>
          <ProgressDots
            current={currentSceneIndex}
            total={scenario.scenes.length}
            accent={theme.accent}
          />
        </div>

        <div className="w-16" /> {/* spacer for centering */}
      </div>

      {/* ── Chat log ── */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 relative z-10">
        {chatLog.map((msg) => {
          switch (msg.type) {
            case 'npc':
              return (
                <NpcBubble
                  key={msg.id}
                  msg={msg}
                  theme={theme}
                  isLatest={msg.id === chatLog[chatLog.length - 1]?.id}
                />
              );
            case 'player':
              return <PlayerBubble key={msg.id} msg={msg} />;
            case 'narrator':
              return <NarratorBubble key={msg.id} msg={msg} />;
            case 'thought':
              return <ThoughtBubble key={msg.id} msg={msg} theme={theme} />;
            default:
              return null;
          }
        })}

        {/* Typing indicator before choices appear */}
        {!awaitingChoice && !awaitingContinue && chatLog.length > 0 && !isComplete && (
          <motion.div
            className="flex items-center gap-2 ml-13"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex gap-1 px-4 py-2 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.04)' }}>
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: theme.accent }}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.2, delay: i * 0.2, repeat: Infinity }}
                />
              ))}
            </div>
          </motion.div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* ── Choice area / Continue button ── */}
      <AnimatePresence mode="wait">
        {awaitingChoice && currentScene?.choices && (
          <motion.div
            key="choices"
            className="relative z-20 px-4 pb-4 pt-2 space-y-2"
            style={{
              background: 'linear-gradient(180deg, transparent 0%, rgba(13,13,26,0.9) 20%)',
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              className="text-center text-xs font-semibold tracking-wider mb-1"
              style={{ color: `${theme.accent}80` }}
            >
              Wie reagierst du?
            </p>

            {currentScene.choices.map((choice: any, i: number) => (
              <motion.button
                key={choice.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.3 }}
                whileHover={{
                  scale: 1.015,
                  boxShadow: `0 0 15px ${theme.accent}20`,
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleChoiceSelect(choice)}
                className="w-full text-left px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#e8e0d0',
                  fontSize: '0.9rem',
                }}
              >
                {choice.text}
              </motion.button>
            ))}
          </motion.div>
        )}

        {awaitingContinue && (
          <motion.div
            key="continue"
            className="relative z-20 px-4 pb-4 pt-2 flex justify-center"
            style={{
              background: 'linear-gradient(180deg, transparent 0%, rgba(13,13,26,0.9) 20%)',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: `0 0 15px ${theme.accent}30` }}
              whileTap={{ scale: 0.97 }}
              onClick={handleContinue}
              className="px-8 py-2.5 rounded-full font-semibold text-sm cursor-pointer"
              style={{
                background: `${theme.accent}15`,
                border: `1px solid ${theme.accent}35`,
                color: theme.accent,
              }}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              Weiter...
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
