import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../stores/gameStore';
import IslandExplorer from './IslandExplorer';
import { MiniGameModal } from '../games/MiniGames';
import type { GameType } from '../games/MiniGames';
import type { IslandId } from '../../types';
import SOSButton from '../common/SOSButton';
import CompanionWidget from '../common/CompanionWidget';

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function IslandView() {
  const {
    activeIsland,
    islands,
    setScreen,
    setActiveIsland,
    addXP,
  } = useGameStore();

  const [activeMiniGame, setActiveMiniGame] = useState<GameType | null>(null);

  const island = islands.find((i) => i.id === activeIsland);
  if (!island) return null;

  const handleBack = useCallback(() => {
    setActiveIsland(null);
    setScreen('island-map');
  }, [setActiveIsland, setScreen]);

  const handleStartMiniGame = useCallback((gameType: string) => {
    setActiveMiniGame(gameType as GameType);
  }, []);

  const handleMiniGameClose = useCallback(() => {
    setActiveMiniGame(null);
  }, []);

  const handleMiniGameComplete = useCallback(
    (xpEarned: number) => {
      addXP(xpEarned);
      setActiveMiniGame(null);
    },
    [addXP],
  );

  return (
    <div className="h-screen w-screen overflow-hidden relative bg-[#0d0d1a]">
      {/* Main 2D exploration view */}
      <IslandExplorer
        onStartMiniGame={handleStartMiniGame}
        onBack={handleBack}
      />

      {/* Mini-game overlay */}
      <AnimatePresence>
        {activeMiniGame && (
          <MiniGameModal
            gameType={activeMiniGame}
            islandId={island.id as IslandId}
            onClose={handleMiniGameClose}
            onComplete={handleMiniGameComplete}
          />
        )}
      </AnimatePresence>

      <CompanionWidget />
      <SOSButton />
    </div>
  );
}
