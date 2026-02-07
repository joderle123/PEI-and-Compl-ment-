import { useState, useEffect, useCallback, useRef } from 'react';

export type BreathPhase = 'inhale' | 'hold' | 'exhale' | 'rest';

interface BreathingPattern {
  inhale: number;
  hold: number;
  exhale: number;
  rest: number;
}

const patterns: Record<string, BreathingPattern> = {
  volcano: { inhale: 4, hold: 7, exhale: 8, rest: 0 },
  forest: { inhale: 4, hold: 4, exhale: 4, rest: 4 },
  ocean: { inhale: 5, hold: 0, exhale: 5, rest: 0 },
  night: { inhale: 6, hold: 2, exhale: 7, rest: 0 },
};

const phaseLabels: Record<BreathPhase, string> = {
  inhale: 'Einatmen...',
  hold: 'Halten...',
  exhale: 'Ausatmen...',
  rest: 'Pause...',
};

interface UseBreathingExerciseReturn {
  phase: BreathPhase;
  phaseLabel: string;
  progress: number;
  round: number;
  totalRounds: number;
  isActive: boolean;
  isComplete: boolean;
  secondsLeft: number;
  start: () => void;
  pause: () => void;
  reset: () => void;
}

export const useBreathingExercise = (
  type: string = 'volcano',
  totalRounds: number = 4
): UseBreathingExerciseReturn => {
  const pattern = patterns[type] || patterns.volcano;
  const [phase, setPhase] = useState<BreathPhase>('inhale');
  const [round, setRound] = useState(1);
  const [isActive, setIsActive] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const getPhaseDuration = useCallback(
    (p: BreathPhase): number => pattern[p],
    [pattern]
  );

  const currentDuration = getPhaseDuration(phase);
  const progress = currentDuration > 0 ? elapsed / currentDuration : 0;
  const secondsLeft = Math.max(0, currentDuration - elapsed);

  const getNextPhase = useCallback(
    (current: BreathPhase): { phase: BreathPhase; newRound: boolean } => {
      const order: BreathPhase[] = ['inhale', 'hold', 'exhale', 'rest'];
      const idx = order.indexOf(current);
      for (let i = 1; i <= order.length; i++) {
        const next = order[(idx + i) % order.length];
        if (pattern[next] > 0) {
          return { phase: next, newRound: next === 'inhale' && i > 0 };
        }
      }
      return { phase: 'inhale', newRound: true };
    },
    [pattern]
  );

  useEffect(() => {
    if (!isActive || isComplete) return;

    intervalRef.current = setInterval(() => {
      setElapsed((prev) => {
        const next = prev + 0.1;
        if (next >= currentDuration) {
          const { phase: nextPhase, newRound } = getNextPhase(phase);
          if (newRound) {
            const nextRound = round + 1;
            if (nextRound > totalRounds) {
              setIsComplete(true);
              setIsActive(false);
              return 0;
            }
            setRound(nextRound);
          }
          setPhase(nextPhase);
          return 0;
        }
        return next;
      });
    }, 100);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, isComplete, phase, currentDuration, round, totalRounds, getNextPhase]);

  const start = useCallback(() => {
    setIsActive(true);
    setIsComplete(false);
  }, []);

  const pause = useCallback(() => {
    setIsActive(false);
  }, []);

  const reset = useCallback(() => {
    setIsActive(false);
    setIsComplete(false);
    setPhase('inhale');
    setRound(1);
    setElapsed(0);
  }, []);

  return {
    phase,
    phaseLabel: phaseLabels[phase],
    progress,
    round,
    totalRounds,
    isActive,
    isComplete,
    secondsLeft,
    start,
    pause,
    reset,
  };
};
