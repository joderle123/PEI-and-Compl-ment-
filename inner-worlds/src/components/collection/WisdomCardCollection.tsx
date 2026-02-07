import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../stores/gameStore';
import { getAllWisdomCards } from '../../data';

const categoryColors: Record<string, string> = {
  emotion: 'from-pink-400 to-rose-500',
  strategy: 'from-blue-400 to-cyan-500',
  insight: 'from-purple-400 to-violet-500',
  courage: 'from-orange-400 to-amber-500',
};

const categoryLabels: Record<string, string> = {
  emotion: '💗 Gefühl',
  strategy: '🛡️ Strategie',
  insight: '💡 Einsicht',
  courage: '🦁 Mut',
};

export default function WisdomCardCollection() {
  const { collectedWisdomCardIds, setScreen } = useGameStore();
  const [flippedCard, setFlippedCard] = useState<string | null>(null);

  const allCards = getAllWisdomCards();
  const collectedCount = allCards.filter((c: any) =>
    collectedWisdomCardIds.includes(c.id)
  ).length;

  return (
    <div className="h-screen bg-gradient-to-b from-[#faf3e8] to-[#f0e6d8] overflow-auto">
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
          <h1 className="text-3xl font-extrabold text-[#6C5CE7] mb-2">🃏 Weisheitskarten</h1>
          <p className="text-gray-600">
            {collectedCount} von {allCards.length} gesammelt
          </p>
          <div className="w-48 h-3 bg-gray-200 rounded-full mx-auto mt-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: allCards.length > 0 ? `${(collectedCount / allCards.length) * 100}%` : '0%' }}
              className="h-full bg-gradient-to-r from-[#6C5CE7] to-[#81ECEC] rounded-full"
            />
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {allCards.map((card: any) => {
            const isCollected = collectedWisdomCardIds.includes(card.id);
            const isFlipped = flippedCard === card.id;
            const gradient = categoryColors[card.category] || categoryColors.insight;

            return (
              <motion.div
                key={card.id}
                whileHover={isCollected ? { y: -5 } : {}}
                onClick={() => isCollected && setFlippedCard(isFlipped ? null : card.id)}
                className={`relative h-48 rounded-2xl shadow-lg cursor-pointer perspective-1000 ${
                  !isCollected ? 'opacity-50' : ''
                }`}
              >
                <AnimatePresence mode="wait">
                  {isCollected && isFlipped ? (
                    <motion.div
                      key="back"
                      initial={{ rotateY: 90 }}
                      animate={{ rotateY: 0 }}
                      exit={{ rotateY: 90 }}
                      className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-2xl p-4 flex flex-col justify-center items-center text-center`}
                    >
                      <p className="text-white text-sm font-semibold leading-relaxed">
                        {card.text}
                      </p>
                      <span className="mt-3 text-white/70 text-xs">
                        {categoryLabels[card.category]}
                      </span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="front"
                      initial={{ rotateY: -90 }}
                      animate={{ rotateY: 0 }}
                      exit={{ rotateY: -90 }}
                      className={`absolute inset-0 rounded-2xl p-4 flex flex-col justify-center items-center ${
                        isCollected
                          ? `bg-gradient-to-br ${gradient}`
                          : 'bg-gray-300'
                      }`}
                    >
                      {isCollected ? (
                        <>
                          <span className="text-4xl mb-2">✨</span>
                          <span className="text-white/80 text-xs font-semibold">
                            {categoryLabels[card.category]}
                          </span>
                          <span className="text-white/60 text-xs mt-1">
                            Tippe zum Lesen
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="text-4xl mb-2">❓</span>
                          <span className="text-gray-500 text-xs">Noch nicht entdeckt</span>
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {allCards.length === 0 && (
          <div className="text-center text-gray-500 mt-12">
            <span className="text-4xl block mb-4">🃏</span>
            <p>Spiele Geschichten, um Weisheitskarten zu sammeln!</p>
          </div>
        )}

        <div className="h-20" />
      </div>
    </div>
  );
}
