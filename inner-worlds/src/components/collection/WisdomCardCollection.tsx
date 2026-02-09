import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../stores/gameStore';
import { getAllWisdomCards } from '../../data';

// ---------------------------------------------------------------------------
// Category styling for dark fantasy theme
// ---------------------------------------------------------------------------

const categoryColors: Record<string, { bg: string; border: string; glow: string }> = {
  emotion: {
    bg: 'linear-gradient(135deg, rgba(219,112,147,0.2), rgba(199,21,133,0.1))',
    border: 'rgba(219,112,147,0.5)',
    glow: 'rgba(219,112,147,0.3)',
  },
  strategy: {
    bg: 'linear-gradient(135deg, rgba(65,105,225,0.2), rgba(30,144,255,0.1))',
    border: 'rgba(65,105,225,0.5)',
    glow: 'rgba(65,105,225,0.3)',
  },
  insight: {
    bg: 'linear-gradient(135deg, rgba(138,43,226,0.2), rgba(108,92,231,0.1))',
    border: 'rgba(138,43,226,0.5)',
    glow: 'rgba(138,43,226,0.3)',
  },
  courage: {
    bg: 'linear-gradient(135deg, rgba(255,140,0,0.2), rgba(201,168,76,0.1))',
    border: 'rgba(255,140,0,0.5)',
    glow: 'rgba(255,140,0,0.3)',
  },
};

const categoryLabels: Record<string, string> = {
  emotion: '\u{1F497} Gef\u00FChl',
  strategy: '\u{1F6E1}\uFE0F Strategie',
  insight: '\u{1F4A1} Einsicht',
  courage: '\u{1F981} Mut',
};

export default function WisdomCardCollection() {
  const { collectedWisdomCardIds, setScreen } = useGameStore();
  const [flippedCard, setFlippedCard] = useState<string | null>(null);

  const allCards = getAllWisdomCards();
  const collectedCount = allCards.filter((c: any) =>
    collectedWisdomCardIds.includes(c.id),
  ).length;

  const progressPct = allCards.length > 0 ? (collectedCount / allCards.length) * 100 : 0;

  return (
    <div
      className="h-screen overflow-auto"
      style={{
        background: `
          radial-gradient(ellipse 80% 60% at 50% 20%, rgba(45,27,78,0.5) 0%, transparent 70%),
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
            {'\u{1F4DC}'} Weisheitskarten
          </motion.h1>
          <p style={{ color: 'rgba(232,213,163,0.7)' }}>
            {collectedCount} von {allCards.length} gesammelt
          </p>

          {/* Progress bar */}
          <div
            className="w-48 h-2 rounded-full mx-auto mt-3 overflow-hidden"
            style={{ backgroundColor: 'rgba(201,168,76,0.15)' }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, #c9a84c, #ffd700)',
                boxShadow: '0 0 8px rgba(255,215,0,0.4)',
              }}
            />
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {allCards.map((card: any, i: number) => {
            const isCollected = collectedWisdomCardIds.includes(card.id);
            const isFlipped = flippedCard === card.id;
            const colors = categoryColors[card.category] || categoryColors.insight;

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                whileHover={isCollected ? { y: -5, scale: 1.02 } : {}}
                onClick={() => isCollected && setFlippedCard(isFlipped ? null : card.id)}
                className={`relative h-48 rounded-2xl cursor-pointer ${
                  !isCollected ? 'opacity-40' : ''
                }`}
                style={{
                  perspective: '1000px',
                }}
              >
                <AnimatePresence mode="wait">
                  {isCollected && isFlipped ? (
                    <motion.div
                      key="back"
                      initial={{ rotateY: 90 }}
                      animate={{ rotateY: 0 }}
                      exit={{ rotateY: 90 }}
                      className="absolute inset-0 rounded-2xl p-4 flex flex-col justify-center items-center text-center"
                      style={{
                        background: colors.bg,
                        border: `1px solid ${colors.border}`,
                        boxShadow: `0 0 20px ${colors.glow}`,
                        backfaceVisibility: 'hidden',
                      }}
                    >
                      <p
                        className="text-sm font-semibold leading-relaxed"
                        style={{ color: '#e8e0d0' }}
                      >
                        {card.text}
                      </p>
                      <span
                        className="mt-3 text-xs"
                        style={{ color: 'rgba(201,168,76,0.7)' }}
                      >
                        {categoryLabels[card.category]}
                      </span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="front"
                      initial={{ rotateY: -90 }}
                      animate={{ rotateY: 0 }}
                      exit={{ rotateY: -90 }}
                      className="absolute inset-0 rounded-2xl p-4 flex flex-col justify-center items-center"
                      style={{
                        background: isCollected
                          ? colors.bg
                          : 'linear-gradient(135deg, rgba(40,30,60,0.6), rgba(20,15,35,0.8))',
                        border: isCollected
                          ? `1px solid ${colors.border}`
                          : '1px solid rgba(100,80,120,0.3)',
                        boxShadow: isCollected ? `0 0 15px ${colors.glow}` : 'none',
                        backfaceVisibility: 'hidden',
                      }}
                    >
                      {isCollected ? (
                        <>
                          <motion.span
                            className="text-4xl mb-2"
                            animate={{
                              filter: [
                                'drop-shadow(0 0 4px rgba(255,215,0,0.3))',
                                'drop-shadow(0 0 10px rgba(255,215,0,0.6))',
                                'drop-shadow(0 0 4px rgba(255,215,0,0.3))',
                              ],
                            }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                          >
                            {'\u2728'}
                          </motion.span>
                          <span
                            className="text-xs font-title font-semibold"
                            style={{ color: 'rgba(232,213,163,0.8)' }}
                          >
                            {categoryLabels[card.category]}
                          </span>
                          <span
                            className="text-xs mt-1"
                            style={{ color: 'rgba(201,168,76,0.5)' }}
                          >
                            Tippe zum Lesen
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="text-4xl mb-2 opacity-40">{'\u2753'}</span>
                          <span
                            className="text-xs"
                            style={{ color: 'rgba(150,130,170,0.6)' }}
                          >
                            Noch nicht entdeckt
                          </span>
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
          <div className="text-center mt-12">
            <span className="text-4xl block mb-4">{'\u{1F4DC}'}</span>
            <p style={{ color: 'rgba(232,213,163,0.6)' }}>
              Spiele Geschichten, um Weisheitskarten zu sammeln!
            </p>
          </div>
        )}

        <div className="h-20" />
      </div>
    </div>
  );
}
