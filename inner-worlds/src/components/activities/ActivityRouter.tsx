import { useGameStore } from '../../stores/gameStore';
import { getIslandData } from '../../data';
import type { IslandId } from '../../types';
import BreathingExercise from './BreathingExercise';
import JournalWriter from './JournalWriter';

export default function ActivityRouter() {
  const { setScreen, addXP, completeActivity } = useGameStore();

  const activityId = sessionStorage.getItem('activeActivityId');
  const islandId = sessionStorage.getItem('activeIslandId') as IslandId;

  const data = getIslandData(islandId || 'volcano');
  const activity = data.activities.find((a: any) => a.id === activityId);

  const handleComplete = () => {
    if (activityId && islandId) {
      completeActivity(activityId, islandId);
    }
    addXP(20);
    setScreen('island');
  };

  if (!activity) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#faf3e8]">
        <div className="text-center">
          <p className="text-xl text-gray-600">Übung nicht gefunden</p>
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

  // Route based on activity type
  if (activity.type === 'breathing' || activity.type === 'meditation') {
    return <BreathingExercise type={islandId} onComplete={handleComplete} />;
  }

  if (activity.type === 'journal') {
    return (
      <JournalWriter
        prompt={activity.description}
        islandId={islandId}
        onComplete={handleComplete}
      />
    );
  }

  // Default: reflection/assessment/creative activities rendered as a journal-like interaction
  return (
    <div className="h-screen bg-gradient-to-b from-[#faf3e8] to-[#f0e6d8] flex items-center justify-center p-6 overflow-auto">
      <div className="max-w-lg w-full bg-white/90 backdrop-blur rounded-3xl p-8 shadow-xl">
        <div className="text-center mb-6">
          <span className="text-4xl mb-2 block">
            {activity.type === 'assessment' ? '📊' : activity.type === 'creative' ? '🎨' : '🪞'}
          </span>
          <h2 className="text-2xl font-bold text-[#6C5CE7]">{activity.title}</h2>
          <p className="text-gray-600 mt-2">{activity.description}</p>
        </div>

        {/* Instructions */}
        {activity.instructions && (
          <div className="space-y-3 mb-6">
            {activity.instructions.map((instruction: string, i: number) => (
              <div key={i} className="flex items-start gap-3">
                <span className="w-7 h-7 bg-[#6C5CE7]/10 rounded-full flex items-center justify-center flex-shrink-0 text-[#6C5CE7] font-bold text-sm">
                  {i + 1}
                </span>
                <p className="text-gray-700">{instruction}</p>
              </div>
            ))}
          </div>
        )}

        {/* Interactive area - simplified journal-style input */}
        <JournalWriter
          prompt={`Reflexion: ${activity.title}`}
          islandId={islandId}
          onComplete={handleComplete}
        />
      </div>
    </div>
  );
}
