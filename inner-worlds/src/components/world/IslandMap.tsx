import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../stores/gameStore';
import type { Island, IslandId } from '../../types';
import SOSButton from '../common/SOSButton';
import CompanionWidget from '../common/CompanionWidget';
import XPBar from '../common/XPBar';
import SettingsPanel from '../common/SettingsPanel';

const islandPositions: Record<IslandId, { top: string; left: string }> = {
  volcano: { top: '12%', left: '15%' },
  ocean: { top: '8%', left: '48%' },
  forest: { top: '15%', left: '78%' },
  mountain: { top: '38%', left: '8%' },
  garden: { top: '42%', left: '72%' },
  night: { top: '62%', left: '20%' },
  rainbow: { top: '65%', left: '50%' },
  home: { top: '60%', left: '80%' },
};

function IslandNode({ island, onClick }: { island: Island; onClick: () => void }) {
  const isUnlocked = island.unlocked;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', bounce: 0.4, delay: Math.random() * 0.5 }}
      whileHover={isUnlocked ? { scale: 1.15, y: -5 } : {}}
      whileTap={isUnlocked ? { scale: 0.95 } : {}}
      onClick={onClick}
      className={`absolute flex flex-col items-center gap-1 group -translate-x-1/2 -translate-y-1/2 ${
        isUnlocked ? 'cursor-pointer' : 'cursor-not-allowed'
      }`}
      style={{
        top: islandPositions[island.id].top,
        left: islandPositions[island.id].left,
      }}
    >
      {/* Island circle */}
      <div className="relative">
        {/* Completion ring */}
        <svg className="absolute -inset-2 w-[calc(100%+16px)] h-[calc(100%+16px)]" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke={isUnlocked ? island.colors[0] + '40' : '#ccc'}
            strokeWidth="4"
          />
          {island.completionPercent > 0 && (
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke={island.colors[0]}
              strokeWidth="4"
              strokeDasharray={`${island.completionPercent * 2.89} 289`}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
            />
          )}
        </svg>

        <div
          className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl shadow-lg transition-all ${
            isUnlocked
              ? 'animate-float'
              : 'grayscale opacity-60'
          }`}
          style={{
            background: isUnlocked
              ? `linear-gradient(135deg, ${island.colors[0]}, ${island.colors[1]})`
              : '#d1d5db',
          }}
        >
          {isUnlocked ? island.emoji : '🔒'}
        </div>

        {/* Level badge */}
        {isUnlocked && island.completionPercent > 0 && (
          <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#FFEAA7] rounded-full flex items-center justify-center text-xs font-bold text-[#2d3436] shadow border-2 border-white">
            {island.level}
          </div>
        )}
      </div>

      {/* Island name */}
      <span
        className={`text-sm font-bold whitespace-nowrap px-2 py-0.5 rounded-full ${
          isUnlocked ? 'text-white bg-black/20 backdrop-blur-sm' : 'text-gray-400 bg-gray-100/80'
        }`}
      >
        {island.name}
      </span>

      {/* Tooltip for locked */}
      {!isUnlocked && (
        <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-gray-500 bg-white px-3 py-1 rounded-full shadow whitespace-nowrap">
          Schließe zuerst eine andere Insel ab!
        </span>
      )}
    </motion.button>
  );
}

export default function IslandMap() {
  const { islands, setActiveIsland, setScreen } = useGameStore();
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleIslandClick = (island: Island) => {
    if (island.unlocked) {
      setActiveIsland(island.id);
      setScreen('island');
    }
  };

  return (
    <div className="h-screen w-screen relative overflow-hidden">
      {/* Ocean background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #74b9ff 0%, #0984e3 40%, #0652DD 100%)',
        }}
      />

      {/* Animated waves */}
      <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden">
        <motion.div
          animate={{ x: [0, -200, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-0 w-[200%] h-16 opacity-30"
          style={{
            background:
              'repeating-linear-gradient(90deg, transparent, transparent 100px, rgba(255,255,255,0.3) 100px, rgba(255,255,255,0.3) 200px)',
            borderRadius: '50% 50% 0 0',
          }}
        />
      </div>

      {/* Clouds */}
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          animate={{ x: ['-10%', '110%'] }}
          transition={{ duration: 30 + i * 10, repeat: Infinity, ease: 'linear' }}
          className="absolute text-5xl opacity-20"
          style={{ top: `${5 + i * 8}%` }}
        >
          ☁️
        </motion.div>
      ))}

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-4 left-1/2 -translate-x-1/2 z-10 text-center"
      >
        <h1 className="text-2xl font-extrabold text-white drop-shadow-lg">
          🗺️ Inselarchipel der Emotionen
        </h1>
      </motion.div>

      {/* XP Bar */}
      <div className="absolute top-14 left-1/2 -translate-x-1/2 z-10 w-80">
        <XPBar />
      </div>

      {/* Settings button */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setSettingsOpen(true)}
        className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white text-xl hover:bg-white/30 transition-all"
      >
        ⚙️
      </motion.button>

      {/* Navigation buttons */}
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setScreen('journal')}
          className="px-3 py-2 bg-white/20 backdrop-blur rounded-full text-white text-sm font-semibold hover:bg-white/30 transition-all"
        >
          📓 Tagebuch
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setScreen('collection')}
          className="px-3 py-2 bg-white/20 backdrop-blur rounded-full text-white text-sm font-semibold hover:bg-white/30 transition-all"
        >
          🃏 Sammlung
        </motion.button>
      </div>

      {/* Islands */}
      <div className="absolute inset-0">
        {islands.map((island) => (
          <IslandNode
            key={island.id}
            island={island}
            onClick={() => handleIslandClick(island)}
          />
        ))}
      </div>

      {/* Companion */}
      <CompanionWidget />

      {/* SOS Button */}
      <SOSButton />

      {/* Settings Panel */}
      <AnimatePresence>
        {settingsOpen && (
          <SettingsPanel isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
