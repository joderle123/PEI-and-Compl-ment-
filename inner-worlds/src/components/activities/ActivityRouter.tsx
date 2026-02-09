import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../../stores/gameStore';
import { getIslandData } from '../../data';
import type { IslandId } from '../../types';
import BreathingExercise from './BreathingExercise';
import JournalWriter from './JournalWriter';

export default function ActivityRouter() {
  const { setScreen, addXP, completeActivity } = useGameStore();
  const [currentStep, setCurrentStep] = useState(0);

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
      <div
        className="h-screen flex items-center justify-center"
        style={{
          background: 'linear-gradient(180deg, #0d0d1a 0%, #1a0a2e 50%, #0d0d1a 100%)',
        }}
      >
        <div className="text-center">
          <p className="text-xl" style={{ color: '#e8e0d0' }}>{'\u00DC'}bung nicht gefunden</p>
          <button
            onClick={() => setScreen('island')}
            className="mt-4 px-6 py-2 rounded-full cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, rgba(201,168,76,0.3), rgba(201,168,76,0.15))',
              border: '1px solid rgba(201,168,76,0.5)',
              color: '#ffd700',
            }}
          >
            Zur{'\u00FC'}ck
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

  const instructions: string[] = activity.instructions || [];
  const isLastStep = currentStep >= instructions.length - 1;

  // Default: reflection/assessment/creative activities with step-by-step dark fantasy UI
  return (
    <div
      className="h-screen flex flex-col items-center justify-center p-6 overflow-auto"
      style={{
        background: `
          radial-gradient(ellipse 80% 60% at 50% 30%, rgba(45,27,78,0.5) 0%, transparent 70%),
          linear-gradient(180deg, #0d0d1a 0%, #1a0a2e 50%, #0d0d1a 100%)
        `,
      }}
    >
      {/* Back button */}
      <button
        className="fixed top-4 left-4 z-50 flex items-center gap-2 px-4 py-2 rounded-xl text-sm cursor-pointer"
        style={{
          background: 'rgba(0,0,0,0.6)',
          border: '1px solid rgba(201,168,76,0.3)',
          color: '#c9a84c',
          backdropFilter: 'blur(8px)',
        }}
        onClick={() => setScreen('island')}
      >
        {'\u2190'} Zur{'\u00FC'}ck
      </button>

      <motion.div
        className="max-w-lg w-full rounded-2xl p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'linear-gradient(135deg, rgba(30,20,60,0.95), rgba(13,13,26,0.98))',
          border: '1px solid rgba(201,168,76,0.3)',
          boxShadow: '0 0 40px rgba(201,168,76,0.08), inset 0 1px 0 rgba(255,255,255,0.05)',
        }}
      >
        {/* Header */}
        <div className="text-center mb-6">
          <span className="text-4xl mb-3 block">
            {activity.type === 'assessment' ? '\u{1F4CA}' : activity.type === 'creative' ? '\u{1F3A8}' : '\u{1FA9E}'}
          </span>
          <h2
            className="text-2xl font-bold font-title"
            style={{ color: '#ffd700', textShadow: '0 0 15px rgba(255,215,0,0.3)' }}
          >
            {activity.title}
          </h2>
          <p className="mt-2 text-sm" style={{ color: 'rgba(232,213,163,0.8)' }}>
            {activity.description}
          </p>
        </div>

        {/* Step-by-step progress */}
        {instructions.length > 0 && (
          <>
            {/* Progress bar */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-bold" style={{ color: '#c9a84c' }}>
                Schritt {currentStep + 1}/{instructions.length}
              </span>
              <div
                className="flex-1 h-1.5 rounded-full overflow-hidden"
                style={{ backgroundColor: 'rgba(201,168,76,0.15)' }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #c9a84c, #ffd700)',
                    boxShadow: '0 0 8px rgba(255,215,0,0.4)',
                  }}
                  animate={{ width: `${((currentStep + 1) / instructions.length) * 100}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* Current instruction */}
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-5 rounded-xl mb-5"
              style={{
                backgroundColor: 'rgba(201,168,76,0.06)',
                border: '1px solid rgba(201,168,76,0.2)',
              }}
            >
              <div className="flex items-start gap-3">
                <span
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
                  style={{
                    background: 'linear-gradient(135deg, rgba(201,168,76,0.3), rgba(201,168,76,0.15))',
                    color: '#ffd700',
                    border: '1px solid rgba(201,168,76,0.4)',
                  }}
                >
                  {currentStep + 1}
                </span>
                <p className="leading-relaxed" style={{ color: '#e8e0d0' }}>
                  {instructions[currentStep]}
                </p>
              </div>
            </motion.div>

            {/* Navigation buttons */}
            <div className="flex gap-3">
              {currentStep > 0 && (
                <button
                  className="flex-1 py-3 px-4 rounded-xl text-sm font-bold cursor-pointer"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(200,200,200,0.7)',
                  }}
                  onClick={() => setCurrentStep((s) => s - 1)}
                >
                  {'\u2190'} Zur{'\u00FC'}ck
                </button>
              )}
              {!isLastStep ? (
                <button
                  className="flex-1 py-3 px-4 rounded-xl text-sm font-bold cursor-pointer transition-all hover:scale-[1.02]"
                  style={{
                    background: 'linear-gradient(135deg, rgba(201,168,76,0.25), rgba(201,168,76,0.12))',
                    border: '1px solid rgba(201,168,76,0.5)',
                    color: '#ffd700',
                  }}
                  onClick={() => setCurrentStep((s) => s + 1)}
                >
                  Weiter {'\u2192'}
                </button>
              ) : (
                <button
                  className="flex-1 py-3 px-4 rounded-xl text-sm font-bold cursor-pointer transition-all hover:scale-[1.02]"
                  style={{
                    background: 'linear-gradient(135deg, rgba(100,200,100,0.25), rgba(100,200,100,0.12))',
                    border: '1px solid rgba(100,200,100,0.5)',
                    color: '#88dd88',
                  }}
                  onClick={handleComplete}
                >
                  {'\u2705'} Abschlie{'\u00DF'}en & Punkte sammeln
                </button>
              )}
            </div>
          </>
        )}

        {/* No instructions: simple complete button */}
        {instructions.length === 0 && (
          <button
            className="w-full py-3 px-4 rounded-xl text-sm font-bold cursor-pointer transition-all hover:scale-[1.02]"
            style={{
              background: 'linear-gradient(135deg, rgba(100,200,100,0.25), rgba(100,200,100,0.12))',
              border: '1px solid rgba(100,200,100,0.5)',
              color: '#88dd88',
            }}
            onClick={handleComplete}
          >
            {'\u2705'} Abschlie{'\u00DF'}en
          </button>
        )}
      </motion.div>
    </div>
  );
}
