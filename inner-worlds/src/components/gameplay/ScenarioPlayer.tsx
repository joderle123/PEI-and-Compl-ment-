import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../stores/gameStore';
import { getIslandData } from '../../data';
import type { IslandId } from '../../types';

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

  const currentScene = scenario?.scenes?.[currentSceneIndex];

  // Typewriter effect
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
    }, 25);

    return () => clearInterval(timer);
  }, [currentSceneIndex, currentScene]);

  const skipTypewriter = () => {
    if (currentScene) {
      setDisplayedText(currentScene.text);
      setTextComplete(true);
    }
  };

  const handleChoiceSelect = useCallback((choice: any) => {
    setSelectedChoice(choice);
    setShowConsequence(true);

    const points = (choice.empathyPoints || 0) + (choice.insightPoints || 0) + (choice.couragePoints || 0);
    const xp = points * 5 + 10;
    setEarnedXP((prev) => prev + xp);
    addXP(xp);

    // Random wisdom card chance (30%)
    if (Math.random() < 0.3) {
      const wisdomCards = getIslandData(islandId).wisdomCards;
      if (wisdomCards.length > 0) {
        const randomCard = wisdomCards[Math.floor(Math.random() * wisdomCards.length)];
        collectWisdomCard(randomCard.id);
      }
    }
  }, [addXP, collectWisdomCard, islandId]);

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

  const handleAdvanceNarrative = () => {
    // For scenes without choices, just advance to next scene
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

  if (!scenario) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#faf3e8]">
        <div className="text-center">
          <p className="text-xl text-gray-600">Szenario nicht gefunden</p>
          <button
            onClick={() => setScreen('island')}
            className="mt-4 px-6 py-2 bg-[#6C5CE7] text-white rounded-full"
          >
            Zurück
          </button>
        </div>
      </div>
    );
  }

  // Completion screen
  if (isComplete) {
    return (
      <div className="h-screen bg-gradient-to-b from-[#FFEAA7] to-[#FAB1A0] flex items-center justify-center p-6 overflow-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/90 backdrop-blur rounded-3xl p-8 max-w-lg w-full shadow-xl text-center"
        >
          {/* Confetti emojis */}
          <div className="text-4xl mb-4">🎉 ✨ 🌟</div>

          <h2 className="text-2xl font-extrabold text-[#6C5CE7] mb-2">
            Geschafft!
          </h2>
          <p className="text-gray-600 mb-2">
            Du hast &quot;{scenario.title}&quot; abgeschlossen!
          </p>
          <div className="bg-[#FFEAA7] rounded-full inline-flex items-center gap-2 px-4 py-2 mb-6">
            <span>⭐</span>
            <span className="font-bold text-[#2d3436]">+{earnedXP} EP</span>
          </div>

          {/* Reflection */}
          <div className="text-left mb-6">
            <h3 className="font-bold text-gray-800 mb-2">
              🪞 Was nimmst du aus dieser Geschichte mit?
            </h3>
            <textarea
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="Deine Gedanken... (optional)"
              className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-[#6C5CE7] focus:outline-none resize-none"
              rows={4}
            />
            <p className="text-xs text-gray-400 mt-1">Nur du kannst das lesen.</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleFinish}
            className="bg-[#6C5CE7] text-white font-bold py-3 px-8 rounded-full shadow-lg"
          >
            Weiter →
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-b from-[#faf3e8] to-[#f0e6d8] flex flex-col overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between p-4">
        <button
          onClick={() => setScreen('island')}
          className="text-gray-500 hover:text-gray-700 font-semibold"
        >
          ← Zurück
        </button>
        <span className="text-sm font-semibold text-gray-500">
          {scenario.title}
        </span>
        {/* Progress dots */}
        <div className="flex gap-1">
          {scenario.scenes.map((_: any, i: number) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i === currentSceneIndex
                  ? 'bg-[#6C5CE7]'
                  : i < currentSceneIndex
                    ? 'bg-[#6C5CE7]/40'
                    : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Scene content */}
      <div className="flex-1 flex flex-col justify-center px-6 pb-6 overflow-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSceneIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-2xl mx-auto w-full"
          >
            {/* Speaker */}
            {currentScene && (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{currentScene.speakerEmoji}</span>
                  <span className="font-bold text-[#6C5CE7] text-lg">
                    {currentScene.speaker === 'narrator'
                      ? 'Erzähler'
                      : currentScene.speaker === 'player'
                        ? 'Du'
                        : currentScene.speaker}
                  </span>
                </div>

                {/* Text bubble */}
                <div
                  className="bg-white rounded-2xl p-6 shadow-lg mb-6 cursor-pointer"
                  onClick={() => {
                    if (!textComplete) skipTypewriter();
                    else if (!currentScene.choices || currentScene.choices.length === 0) handleAdvanceNarrative();
                  }}
                >
                  <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-line">
                    {displayedText}
                    {!textComplete && (
                      <span className="animate-pulse-soft">|</span>
                    )}
                  </p>
                </div>

                {/* Consequence display */}
                {showConsequence && selectedChoice && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#FFEAA7]/80 rounded-2xl p-5 mb-4 shadow"
                  >
                    <p className="text-gray-800 mb-3">{selectedChoice.consequence}</p>
                    <div className="flex items-center gap-4 text-sm">
                      {selectedChoice.empathyPoints > 0 && (
                        <span className="text-pink-500">💗 +{selectedChoice.empathyPoints} Empathie</span>
                      )}
                      {selectedChoice.insightPoints > 0 && (
                        <span className="text-purple-500">💡 +{selectedChoice.insightPoints} Einsicht</span>
                      )}
                      {selectedChoice.couragePoints > 0 && (
                        <span className="text-orange-500">🦁 +{selectedChoice.couragePoints} Mut</span>
                      )}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleContinue}
                      className="mt-4 bg-[#6C5CE7] text-white font-bold py-2 px-6 rounded-full"
                    >
                      Weiter →
                    </motion.button>
                  </motion.div>
                )}

                {/* Choices */}
                {textComplete &&
                  !selectedChoice &&
                  currentScene.choices &&
                  currentScene.choices.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="grid grid-cols-1 gap-3"
                    >
                      <p className="text-sm text-gray-500 font-semibold mb-1">
                        Was tust du?
                      </p>
                      {currentScene.choices.map((choice: any) => {
                        const maxPoints = Math.max(
                          choice.empathyPoints || 0,
                          choice.insightPoints || 0,
                          choice.couragePoints || 0
                        );
                        const borderColor =
                          maxPoints === choice.empathyPoints
                            ? '#fd79a8'
                            : maxPoints === choice.couragePoints
                              ? '#e17055'
                              : '#6C5CE7';

                        return (
                          <motion.button
                            key={choice.id}
                            whileHover={{ scale: 1.02, x: 5 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleChoiceSelect(choice)}
                            className="p-4 bg-white rounded-xl shadow hover:shadow-lg text-left transition-all border-l-4"
                            style={{ borderLeftColor: borderColor }}
                          >
                            <span className="text-gray-800 font-medium">{choice.text}</span>
                          </motion.button>
                        );
                      })}
                    </motion.div>
                  )}

                {/* Click to continue for narrative-only scenes */}
                {textComplete && (!currentScene.choices || currentScene.choices.length === 0) && !isComplete && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center"
                  >
                    <button
                      onClick={handleAdvanceNarrative}
                      className="text-gray-400 text-sm hover:text-gray-600 transition-colors"
                    >
                      Klicke um fortzufahren...
                    </button>
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
