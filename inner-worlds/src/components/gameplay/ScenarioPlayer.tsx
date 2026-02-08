import { useState, useEffect, useCallback, useRef } from 'react';
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
      // ease-out quad
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
// Ember particle component
// ---------------------------------------------------------------------------

const EmberParticles: React.FC<{ count?: number }> = ({ count = 4 }) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="ember"
        style={{
          left: `${15 + i * 20 + Math.random() * 10}%`,
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
// Helper: icon for dominant point type
// ---------------------------------------------------------------------------

function getChoiceIcon(choice: any): string {
  const pts = choice.points || choice;
  const e = pts.empathyPoints || 0;
  const ins = pts.insightPoints || 0;
  const c = pts.couragePoints || 0;
  const max = Math.max(e, ins, c);
  if (max === 0) return '\u2726'; // generic sparkle
  if (max === e) return '\u{1F497}'; // empathy heart
  if (max === c) return '\u{1F981}'; // courage lion
  return '\u{1F4A1}'; // insight bulb
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
  const [showGoldenFlash, setShowGoldenFlash] = useState(false);
  const [comboMultiplier, setComboMultiplier] = useState(1);

  const currentScene = scenario?.scenes?.[currentSceneIndex];

  // Animated counter for completion screen
  const animatedXP = useAnimatedCounter(isComplete ? earnedXP : 0, 1500);

  // ─── Typewriter effect (20ms speed) ───
  useEffect(() => {
    if (!currentScene) return;
    setDisplayedText('');
    setTextComplete(false);
    setSelectedChoice(null);
    setShowConsequence(false);

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
    }, 20);

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

    // Golden flash on consequence reveal
    setShowGoldenFlash(true);
    setTimeout(() => setShowGoldenFlash(false), 400);

    setShowConsequence(true);

    // Handle both flat and nested point structures
    const pts = choice.points || choice;
    const empathy = pts.empathyPoints || 0;
    const insight = pts.insightPoints || 0;
    const courage = pts.couragePoints || 0;
    const points = empathy + insight + courage;
    const xp = points * 5 + 10;
    setEarnedXP((prev) => prev + xp);
    addXP(xp);

    // Update combo multiplier
    if (points > 0) {
      setComboMultiplier((prev) => Math.min(prev + 0.25, 3));
      (useGameStore.getState() as any).increaseCombo?.();
    } else {
      (useGameStore.getState() as any).resetCombo?.();
    }

    // Add skill points
    (useGameStore.getState() as any).addSkillPoints?.(empathy, insight, courage);

    // Random wisdom card chance (30%)
    if (Math.random() < 0.3) {
      const wisdomCards = getIslandData(islandId).wisdomCards;
      if (wisdomCards.length > 0) {
        const randomCard = wisdomCards[Math.floor(Math.random() * wisdomCards.length)];
        collectWisdomCard(randomCard.id);
        (useGameStore.getState() as any).triggerEvent?.('wisdom-card-found', { card: randomCard });
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

  // ─── Finish and return to island ───
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
            className="mt-4 px-6 py-2 rounded-full font-title text-sm ornate-border"
            style={{
              background: 'linear-gradient(135deg, #92600a, #b8860b, #daa520)',
              color: '#1a0a2e',
            }}
          >
            Zur\u00FCck
          </motion.button>
        </div>
      </div>
    );
  }

  // =====================================================================
  // Completion screen
  // =====================================================================

  if (isComplete) {
    return (
      <div className="h-screen bg-gradient-to-b from-[#0d0d1a] via-[#1a0a2e] to-[#0d0d1a] flex items-center justify-center p-6 overflow-auto relative">
        {/* Dark vignette */}
        <div className="vignette fixed inset-0 z-0" />

        {/* Fog */}
        <div className="fog-layer" />

        {/* Golden particle burst embers */}
        <EmberParticles count={5} />

        {/* Background golden radial glow */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.08) 0%, transparent 60%)',
          }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            type: 'spring' as const,
            stiffness: 80,
            damping: 18,
          }}
          className="glass-panel rounded-2xl p-8 max-w-lg w-full text-center relative z-10 ornate-border"
        >
          {/* Geschafft! heading */}
          <motion.h2
            className="text-4xl font-bold text-golden font-title mb-2 animate-golden-glow"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' as const }}
          >
            Geschafft!
          </motion.h2>

          <motion.p
            className="text-[#e8e0d0]/70 mb-2 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5, ease: 'easeOut' as const }}
          >
            Du hast &quot;{scenario.title}&quot; abgeschlossen!
          </motion.p>

          {/* Animated XP counter */}
          <motion.div
            className="inline-flex items-center gap-2 px-5 py-2.5 mb-6 rounded-full"
            style={{
              background: 'linear-gradient(135deg, rgba(146,96,10,0.3), rgba(218,165,32,0.2))',
              border: '1px solid rgba(201,168,76,0.3)',
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, type: 'spring' as const, stiffness: 120, damping: 15 }}
          >
            <motion.span
              className="text-xl"
              animate={{
                rotate: [0, 15, -15, 0],
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut' as const,
              }}
            >
              &#x2B50;
            </motion.span>
            <span className="font-bold text-golden font-title text-lg">
              +{animatedXP} EP
            </span>
          </motion.div>

          {/* Reflection */}
          <motion.div
            className="text-left mb-6"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.5, ease: 'easeOut' as const }}
          >
            <h3 className="font-title text-golden text-sm font-semibold mb-2 flex items-center gap-2">
              <span className="text-lg">&#x1FA9E;</span>
              Was nimmst du aus dieser Geschichte mit?
            </h3>
            <textarea
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="Deine Gedanken... (optional)"
              className="w-full p-4 rounded-xl resize-none glass-panel text-[#e8e0d0] placeholder-[#a09888] focus:outline-none transition-all duration-300"
              style={{
                border: '1px solid rgba(201,168,76,0.15)',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'rgba(201,168,76,0.5)';
                e.currentTarget.style.boxShadow = '0 0 15px rgba(201,168,76,0.1)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(201,168,76,0.15)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              rows={4}
            />
            <p className="text-xs text-[#a09888] mt-1">Nur du kannst das lesen.</p>
          </motion.div>

          {/* Weiter button */}
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 25px rgba(201,168,76,0.4), 0 0 50px rgba(201,168,76,0.15)',
            }}
            whileTap={{ scale: 0.95 }}
            onClick={handleFinish}
            className="font-title font-bold py-3 px-8 rounded-full ornate-border transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #92600a, #b8860b, #daa520, #ffd700)',
              color: '#1a0a2e',
              boxShadow: '0 0 15px rgba(201,168,76,0.2)',
            }}
          >
            Weiter &#x2192;
          </motion.button>
        </motion.div>
      </div>
    );
  }

  // =====================================================================
  // Main gameplay screen
  // =====================================================================

  return (
    <div className="h-screen bg-gradient-to-b from-[#0d0d1a] to-[#1a0a2e] flex flex-col overflow-hidden relative">
      {/* ── Atmospheric layers ── */}
      <div className="vignette fixed inset-0 z-0 pointer-events-none" />
      <div className="fog-layer" />
      <EmberParticles count={4} />

      {/* Golden flash overlay on consequence */}
      <AnimatePresence>
        {showGoldenFlash && (
          <motion.div
            className="fixed inset-0 z-50 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.2) 0%, transparent 70%)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' as const }}
          />
        )}
      </AnimatePresence>

      {/* ── Top bar ── */}
      <div className="glass-panel flex items-center justify-between px-4 py-3 mx-3 mt-3 rounded-xl relative z-10">
        <motion.button
          whileHover={{ x: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setScreen('island')}
          className="text-[#a09888] hover:text-golden font-title text-sm font-semibold transition-colors duration-300"
        >
          &#x2190; Zur\u00FCck
        </motion.button>

        <span className="text-sm font-semibold text-golden font-title tracking-wide">
          {scenario.title}
        </span>

        {/* Progress dots */}
        <div className="flex gap-1.5">
          {scenario.scenes.map((_: any, i: number) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{
                background:
                  i <= currentSceneIndex
                    ? 'linear-gradient(135deg, #c9a84c, #ffd700)'
                    : 'rgba(160,152,136,0.25)',
                boxShadow:
                  i < currentSceneIndex
                    ? '0 0 6px rgba(201,168,76,0.5)'
                    : i === currentSceneIndex
                      ? '0 0 8px rgba(201,168,76,0.7)'
                      : 'none',
              }}
              animate={
                i === currentSceneIndex
                  ? { scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }
                  : {}
              }
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut' as const,
              }}
            />
          ))}
        </div>
      </div>

      {/* ── Scene content ── */}
      <div className="flex-1 flex flex-col justify-center px-6 pb-6 overflow-auto relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSceneIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: 'easeOut' as const }}
            className="max-w-2xl mx-auto w-full"
          >
            {currentScene && (
              <>
                {/* ── Speaker display ── */}
                <div className="flex items-center gap-3 mb-4">
                  {/* Golden ornate circle around emoji */}
                  <div className="relative flex items-center justify-center w-12 h-12 shrink-0">
                    {/* Outer ornate ring */}
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
                    {/* Inner glow */}
                    <div
                      className="absolute inset-[3px] rounded-full"
                      style={{
                        background:
                          'radial-gradient(circle at 40% 35%, rgba(255,215,0,0.12), transparent 70%)',
                      }}
                    />
                    <span className="relative z-10 text-2xl">
                      {currentScene.speakerEmoji || '\u{1F4DC}'}
                    </span>
                  </div>

                  <span className="font-title text-golden font-bold text-lg tracking-wide">
                    {!currentScene.speaker || currentScene.speaker === 'narrator'
                      ? 'Erz\u00E4hler'
                      : currentScene.speaker === 'player'
                        ? 'Du'
                        : currentScene.speaker}
                  </span>
                </div>

                {/* ── Text bubble ── */}
                <motion.div
                  className="glass-panel rounded-2xl p-6 mb-6 cursor-pointer relative overflow-hidden"
                  style={{
                    borderTop: '1px solid rgba(201,168,76,0.25)',
                  }}
                  onClick={() => {
                    if (!textComplete) skipTypewriter();
                    else if (!currentScene.choices || currentScene.choices.length === 0) handleAdvanceNarrative();
                  }}
                  whileHover={{
                    boxShadow: '0 0 20px rgba(201,168,76,0.08)',
                  }}
                >
                  {/* Subtle golden top accent line */}
                  <div
                    className="absolute top-0 left-4 right-4 h-px"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)',
                    }}
                  />

                  <p className="text-[#e8e0d0] text-lg leading-relaxed whitespace-pre-line">
                    {displayedText}
                    {!textComplete && (
                      <motion.span
                        className="inline-block ml-0.5 text-golden"
                        animate={{ opacity: [1, 0.2, 1] }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          ease: 'easeInOut' as const,
                        }}
                      >
                        |
                      </motion.span>
                    )}
                  </p>
                </motion.div>

                {/* ── Consequence display ── */}
                <AnimatePresence>
                  {showConsequence && selectedChoice && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{
                        type: 'spring' as const,
                        stiffness: 100,
                        damping: 15,
                      }}
                      className="glass-panel ornate-border rounded-2xl p-5 mb-4"
                    >
                      {/* Consequence text (handle missing) */}
                      {(selectedChoice.consequence || selectedChoice.text) && (
                        <p className="text-[#e8e0d0] mb-3 leading-relaxed">
                          {selectedChoice.consequence || `Du hast gew\u00E4hlt: "${selectedChoice.text}"`}
                        </p>
                      )}

                      {/* Point gains (handle both flat and nested) */}
                      {(() => {
                        const pts = selectedChoice.points || selectedChoice;
                        const emp = pts.empathyPoints || 0;
                        const ins = pts.insightPoints || 0;
                        const cou = pts.couragePoints || 0;
                        if (emp + ins + cou === 0) return null;
                        return (
                          <div className="flex items-center gap-4 text-sm flex-wrap">
                            {emp > 0 && (
                              <motion.span
                                className="text-pink-400 font-semibold"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2, ease: 'easeOut' as const, duration: 0.4 }}
                              >
                                &#x1F497; +{emp} Empathie
                              </motion.span>
                            )}
                            {ins > 0 && (
                              <motion.span
                                className="text-purple-400 font-semibold"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.35, ease: 'easeOut' as const, duration: 0.4 }}
                              >
                                &#x1F4A1; +{ins} Einsicht
                              </motion.span>
                            )}
                            {cou > 0 && (
                              <motion.span
                                className="text-amber-400 font-semibold"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5, ease: 'easeOut' as const, duration: 0.4 }}
                              >
                                &#x1F981; +{cou} Mut
                              </motion.span>
                            )}
                          </div>
                        );
                      })()}

                      {/* Combo multiplier display */}
                      {comboMultiplier > 1 && (
                        <motion.div
                          className="mt-2 text-xs font-title text-golden font-semibold"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.6, type: 'spring' as const, stiffness: 150, damping: 12 }}
                        >
                          &#x2728; Kombo x{comboMultiplier.toFixed(2)}
                        </motion.div>
                      )}

                      {/* Continue button */}
                      <motion.button
                        whileHover={{
                          scale: 1.05,
                          boxShadow: '0 0 20px rgba(201,168,76,0.35)',
                        }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleContinue}
                        className="mt-4 font-title font-bold py-2.5 px-7 rounded-full ornate-border transition-all duration-300"
                        style={{
                          background: 'linear-gradient(135deg, #92600a, #b8860b, #daa520, #ffd700)',
                          color: '#1a0a2e',
                          boxShadow: '0 0 12px rgba(201,168,76,0.2)',
                        }}
                      >
                        Weiter &#x2192;
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* ── Choices ── */}
                {textComplete &&
                  !selectedChoice &&
                  currentScene.choices &&
                  currentScene.choices.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: 'easeOut' as const }}
                      className="grid grid-cols-1 gap-3"
                    >
                      {/* "Was tust du?" prompt */}
                      <div className="flex items-center justify-center gap-3 mb-1">
                        <RuneAccent className="text-amber-500/50" />
                        <span className="text-sm text-golden font-title font-semibold tracking-wider">
                          Was tust du?
                        </span>
                        <RuneAccent className="text-amber-500/50" />
                      </div>

                      {currentScene.choices.map((choice: any, choiceIndex: number) => {
                        const icon = getChoiceIcon(choice);
                        return (
                          <motion.button
                            key={choice.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              delay: 0.1 + choiceIndex * 0.1,
                              duration: 0.35,
                              ease: 'easeOut' as const,
                            }}
                            whileHover={{
                              scale: 1.02,
                              x: 5,
                              boxShadow: '0 0 20px rgba(201,168,76,0.15), 0 4px 20px rgba(0,0,0,0.3)',
                            }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleChoiceSelect(choice)}
                            className="glass-panel-light p-4 rounded-xl text-left transition-all duration-300 border-l-4 group relative overflow-hidden"
                            style={{
                              borderLeftColor: 'rgba(201,168,76,0.6)',
                            }}
                          >
                            {/* Shimmer overlay on hover */}
                            <div
                              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                              style={{
                                background:
                                  'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.05) 40%, rgba(201,168,76,0.1) 50%, rgba(201,168,76,0.05) 60%, transparent 100%)',
                                backgroundSize: '200% 100%',
                                animation: 'shimmer 2s ease-in-out infinite',
                              }}
                            />

                            <div className="flex items-start gap-3 relative z-10">
                              <span className="text-lg mt-0.5 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                                {icon}
                              </span>
                              <span className="text-[#e8e0d0] font-medium leading-relaxed">
                                {choice.text}
                              </span>
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
                      transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' as const }}
                      className="text-center"
                    >
                      <motion.button
                        onClick={handleAdvanceNarrative}
                        className="text-golden/60 text-sm font-title hover:text-golden transition-colors duration-300"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          ease: 'easeInOut' as const,
                        }}
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
