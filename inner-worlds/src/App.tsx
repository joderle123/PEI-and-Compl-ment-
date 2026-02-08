import { useEffect } from 'react';
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

function App() {
  const { currentScreen, settings, lastEvent, comboMultiplier } = useGameStore();

  // Apply accessibility settings on mount and when they change
  useEffect(() => {
    toggleDyslexiaFont(settings.dyslexiaFont);
    toggleHighContrast(settings.highContrast);
  }, [settings.dyslexiaFont, settings.highContrast]);

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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
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
