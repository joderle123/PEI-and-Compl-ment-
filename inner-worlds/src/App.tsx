import { useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useGameStore } from './stores/gameStore';
import { toggleDyslexiaFont, toggleHighContrast } from './utils/accessibility';

// Screens
import WelcomeScreen from './components/onboarding/WelcomeScreen';
import AvatarCreator from './components/onboarding/AvatarCreator';
import CompanionSelect from './components/onboarding/CompanionSelect';
import SelfAssessment from './components/onboarding/SelfAssessment';
import MoodCheckIn from './components/onboarding/MoodCheckIn';
import IslandMap from './components/world/IslandMap';
import IslandView from './components/world/IslandView';
import IslandTravel from './components/world/IslandTravel';
import ScenarioPlayer from './components/gameplay/ScenarioPlayer';
import ActivityRouter from './components/activities/ActivityRouter';
import JournalView from './components/collection/JournalView';
import WisdomCardCollection from './components/collection/WisdomCardCollection';
import CompetenceTree from './components/collection/CompetenceTree';
import PedagogDashboard from './components/dashboard/PedagogDashboard';

// Common
import SOSButton from './components/common/SOSButton';
import RewardPopup from './components/common/RewardPopup';

// ---------------------------------------------------------------------------
// Transition variants – dramatic screen-specific animations
// ---------------------------------------------------------------------------

/* eslint-disable @typescript-eslint/no-explicit-any */
const TRANSITION_VARIANTS: Record<string, {
  initial: any;
  animate: any;
  exit: any;
  transition: any;
}> = {
  // Deep fade for story/scenario screens
  scenario: {
    initial: { opacity: 0, scale: 1.08, filter: 'blur(12px) brightness(0.3)' },
    animate: { opacity: 1, scale: 1, filter: 'blur(0px) brightness(1)' },
    exit: { opacity: 0, scale: 0.95, filter: 'blur(8px) brightness(1.5)' },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
  // Slide up for island exploration
  island: {
    initial: { opacity: 0, y: 40, filter: 'blur(6px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, y: -30, filter: 'blur(4px)' },
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  // Scale reveal for map
  map: {
    initial: { opacity: 0, scale: 0.92, filter: 'blur(8px)' },
    animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
    exit: { opacity: 0, scale: 1.05, filter: 'blur(4px)' },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
  // Quick fade for standard screens
  default: {
    initial: { opacity: 0, filter: 'blur(4px)' },
    animate: { opacity: 1, filter: 'blur(0px)' },
    exit: { opacity: 0, filter: 'blur(4px)' },
    transition: { duration: 0.35, ease: 'easeOut' },
  },
};

function getTransitionVariant(screen: string) {
  if (screen === 'scenario') return TRANSITION_VARIANTS.scenario;
  if (screen === 'island' || screen === 'travel') return TRANSITION_VARIANTS.island;
  if (screen === 'island-map' || screen === 'world-map') return TRANSITION_VARIANTS.map;
  return TRANSITION_VARIANTS.default;
}

// ---------------------------------------------------------------------------
// App
// ---------------------------------------------------------------------------

function App() {
  const { currentScreen, settings, lastEvent, comboMultiplier } = useGameStore();

  // Apply accessibility settings on mount and when they change
  useEffect(() => {
    toggleDyslexiaFont(settings.dyslexiaFont);
    toggleHighContrast(settings.highContrast);
  }, [settings.dyslexiaFont, settings.highContrast]);

  const variant = useMemo(() => getTransitionVariant(currentScreen), [currentScreen]);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen />;
      case 'onboarding-avatar':
        return <AvatarCreator />;
      case 'onboarding-companion':
        return <CompanionSelect />;
      case 'onboarding-assessment':
        return <SelfAssessment />;
      case 'mood-checkin':
        return <MoodCheckIn />;
      case 'island-map':
      case 'world-map':
        return <IslandMap />;
      case 'island':
        return <IslandView />;
      case 'travel':
        return <IslandTravel />;
      case 'scenario':
        return <ScenarioPlayer />;
      case 'activity':
        return <ActivityRouter />;
      case 'journal':
        return <JournalView />;
      case 'collection':
        return <WisdomCardCollection />;
      case 'settings':
        return <CompetenceTree />;
      case 'dashboard':
        return <PedagogDashboard />;
      case 'sos':
        return (
          <div className="h-screen bg-[#0d0d1a]">
            <SOSButton />
          </div>
        );
      default:
        return <WelcomeScreen />;
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#0d0d1a]">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={variant.initial}
          animate={variant.animate}
          exit={variant.exit}
          transition={variant.transition}
          className="h-full w-full"
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>

      {/* Global reward/celebration overlay */}
      <RewardPopup lastEvent={lastEvent} comboMultiplier={comboMultiplier} />
    </div>
  );
}

export default App;
