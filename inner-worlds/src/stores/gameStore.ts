import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  GameState,
  GameScreen,
  Avatar,
  Companion,
  Mood,
  MoodEntry,
  IslandId,
  IslandLevel,
  IslandProgress,
  JournalEntry,
  Settings,
  Island,
  Achievement,
  GameEvent,
} from '../types';

// ---------------------------------------------------------------------------
// Combo multiplier steps
// ---------------------------------------------------------------------------

const COMBO_STEPS = [1, 1.5, 2, 2.5, 3] as const;

// ---------------------------------------------------------------------------
// Island unlock thresholds – total completedScenarios count → island to unlock
// ---------------------------------------------------------------------------

const ISLAND_UNLOCK_THRESHOLDS: readonly { threshold: number; islandId: IslandId }[] = [
  { threshold: 2, islandId: 'ocean' },
  { threshold: 4, islandId: 'forest' },
  { threshold: 6, islandId: 'mountain' },
  { threshold: 8, islandId: 'garden' },
  { threshold: 10, islandId: 'night' },
  { threshold: 12, islandId: 'rainbow' },
  { threshold: 14, islandId: 'home' },
] as const;

// ---------------------------------------------------------------------------
// Predefined achievements (German)
// ---------------------------------------------------------------------------

const PREDEFINED_ACHIEVEMENTS: Achievement[] = [
  { id: 'first-choice', name: 'Erste Entscheidung', description: 'Schließe dein erstes Szenario ab', unlocked: false, unlockedAt: null },
  { id: 'explorer', name: 'Entdecker', description: 'Besuche 3 verschiedene Inseln', unlocked: false, unlockedAt: null },
  { id: 'empathy-master', name: 'Empathie-Meister', description: 'Verdiene 50+ Empathie-Punkte', unlocked: false, unlockedAt: null },
  { id: 'courage-hero', name: 'Held des Muts', description: 'Verdiene 50+ Mut-Punkte', unlocked: false, unlockedAt: null },
  { id: 'wisdom-collector', name: 'Weisheitssammler', description: 'Sammle 10 Weisheitskarten', unlocked: false, unlockedAt: null },
  { id: 'streak-3', name: 'Auf einer Rolle!', description: 'Erreiche eine 3er-Serie', unlocked: false, unlockedAt: null },
  { id: 'streak-5', name: 'Unaufhaltsam', description: 'Erreiche eine 5er-Serie', unlocked: false, unlockedAt: null },
  { id: 'level-5', name: 'Aufsteiger', description: 'Erreiche Level 5', unlocked: false, unlockedAt: null },
  { id: 'level-10', name: 'Legendär', description: 'Erreiche Level 10', unlocked: false, unlockedAt: null },
  { id: 'journal-writer', name: 'Tagebuch-Autor', description: 'Schreibe 5 Tagebucheinträge', unlocked: false, unlockedAt: null },
];

// ---------------------------------------------------------------------------
// Store interface – combines state with actions
// ---------------------------------------------------------------------------

interface GameStore extends GameState {
  // Navigation
  setScreen: (screen: GameScreen) => void;

  // Onboarding
  setAvatar: (avatar: Avatar) => void;
  setCompanion: (companion: Companion) => void;
  completeOnboarding: () => void;

  // Mood
  setCurrentMood: (mood: Mood, note?: string) => void;

  // Progress
  addXP: (amount: number) => void;
  completeScenario: (scenarioId: string, islandId: IslandId) => void;
  completeActivity: (activityId: string, islandId: IslandId) => void;
  unlockIsland: (islandId: IslandId) => void;

  // Collections
  collectWisdomCard: (cardId: string) => void;

  // Journal
  addJournalEntry: (entry: Omit<JournalEntry, 'id'>) => void;

  // Settings
  updateSettings: (settings: Partial<Settings>) => void;

  // Islands
  setActiveIsland: (islandId: IslandId | null) => void;

  // Achievements
  unlockAchievement: (id: string) => void;

  // Skill points
  addSkillPoints: (empathy: number, insight: number, courage: number) => void;

  // Island Progress (chapters & mysteries)
  advanceChapter: (islandId: IslandId) => void;
  discoverClue: (islandId: IslandId, clueId: string) => void;
  unlockZone: (islandId: IslandId, zoneId: string) => void;
  startMystery: (islandId: IslandId) => void;
  solveMystery: (islandId: IslandId) => void;
  getIslandProgress: (islandId: IslandId) => IslandProgress;

  // Combo
  increaseCombo: () => void;
  resetCombo: () => void;

  // Events
  triggerEvent: (type: string, data: any) => void;

  // Travel
  startTravel: (origin: IslandId, destination: IslandId, vehicle: 'boat' | 'airplane') => void;
  completeTravel: () => void;

  // Reset
  resetGame: () => void;
}

// ---------------------------------------------------------------------------
// Island seed data (German)
// ---------------------------------------------------------------------------

const initialIslands: Island[] = [
  {
    id: 'volcano',
    name: 'Vulkaninsel',
    emoji: '\u{1F30B}',
    description: 'Wut & Emotionsregulation',
    theme: 'anger',
    colors: ['#FF6B35', '#FF4444', '#CC2200'],
    unlocked: true,
    completionPercent: 0,
    level: 1,
  },
  {
    id: 'ocean',
    name: 'Ozean-Insel',
    emoji: '\u{1F30A}',
    description: 'Traurigkeit & schwierige Gef\u00FChle',
    theme: 'sadness',
    colors: ['#4A90D9', '#2E6AB0', '#1A4A80'],
    unlocked: false,
    completionPercent: 0,
    level: 1,
  },
  {
    id: 'forest',
    name: 'Wald-Insel',
    emoji: '\u{1F33F}',
    description: 'Angst & Mut',
    theme: 'fear',
    colors: ['#4CAF50', '#2E7D32', '#1B5E20'],
    unlocked: false,
    completionPercent: 0,
    level: 1,
  },
  {
    id: 'mountain',
    name: 'Berg-Insel',
    emoji: '\u{1F3D4}\u{FE0F}',
    description: 'Selbstwert & Identit\u00E4t',
    theme: 'self-worth',
    colors: ['#8D6E63', '#6D4C41', '#4E342E'],
    unlocked: false,
    completionPercent: 0,
    level: 1,
  },
  {
    id: 'garden',
    name: 'Garten-Insel',
    emoji: '\u{1F338}',
    description: 'Empathie & Soziale Kompetenzen',
    theme: 'empathy',
    colors: ['#F48FB1', '#EC407A', '#C2185B'],
    unlocked: false,
    completionPercent: 0,
    level: 1,
  },
  {
    id: 'night',
    name: 'Nacht-Insel',
    emoji: '\u{1F319}',
    description: 'Achtsamkeit & Stressmanagement',
    theme: 'mindfulness',
    colors: ['#7E57C2', '#5C3D99', '#311B92'],
    unlocked: false,
    completionPercent: 0,
    level: 1,
  },
  {
    id: 'rainbow',
    name: 'Regenbogen-Insel',
    emoji: '\u{1F308}',
    description: 'Vielfalt & Zusammenleben',
    theme: 'diversity',
    colors: ['#FF7043', '#FFCA28', '#66BB6A'],
    unlocked: false,
    completionPercent: 0,
    level: 1,
  },
  {
    id: 'home',
    name: 'Heimat-Insel',
    emoji: '\u{1F3E0}',
    description: 'Integration & Transfer',
    theme: 'integration',
    colors: ['#FFB74D', '#FFA726', '#FB8C00'],
    unlocked: false,
    completionPercent: 0,
    level: 1,
  },
];

// ---------------------------------------------------------------------------
// Initial island progress (all islands start at chapter 1, no mystery started)
// ---------------------------------------------------------------------------

const initialIslandProgress: IslandProgress[] = [
  { islandId: 'volcano', currentChapter: 1, mysteryStarted: false, mysterySolved: false, discoveredClues: [], unlockedZones: ['entrance'] },
  { islandId: 'ocean', currentChapter: 1, mysteryStarted: false, mysterySolved: false, discoveredClues: [], unlockedZones: ['entrance'] },
  { islandId: 'forest', currentChapter: 1, mysteryStarted: false, mysterySolved: false, discoveredClues: [], unlockedZones: ['entrance'] },
  { islandId: 'mountain', currentChapter: 1, mysteryStarted: false, mysterySolved: false, discoveredClues: [], unlockedZones: ['entrance'] },
  { islandId: 'garden', currentChapter: 1, mysteryStarted: false, mysterySolved: false, discoveredClues: [], unlockedZones: ['entrance'] },
  { islandId: 'night', currentChapter: 1, mysteryStarted: false, mysterySolved: false, discoveredClues: [], unlockedZones: ['entrance'] },
  { islandId: 'rainbow', currentChapter: 1, mysteryStarted: false, mysterySolved: false, discoveredClues: [], unlockedZones: ['entrance'] },
  { islandId: 'home', currentChapter: 1, mysteryStarted: false, mysterySolved: false, discoveredClues: [], unlockedZones: ['entrance'] },
];

// ---------------------------------------------------------------------------
// Default settings
// ---------------------------------------------------------------------------

const defaultSettings: Settings = {
  language: 'de',
  dyslexiaFont: false,
  highContrast: false,
  soundEnabled: true,
  volume: 70,
  musicEnabled: true,
};

// ---------------------------------------------------------------------------
// Initial state (without actions)
// ---------------------------------------------------------------------------

const initialState: GameState = {
  // Game state
  currentScreen: 'welcome' as GameScreen,
  onboardingComplete: false,
  avatar: null,
  companion: null,

  // Progress
  xp: 0,
  level: 1,
  completedScenarios: [],
  completedActivities: [],
  unlockedIslands: ['volcano'] as IslandId[],

  // Island progress
  islandProgress: initialIslandProgress,

  // Islands
  islands: initialIslands,
  activeIsland: null,

  // Collections
  collectedWisdomCardIds: [],

  // Journal
  journalEntries: [],

  // Mood
  moodHistory: [],
  currentMood: null,

  // Settings
  settings: defaultSettings,

  // Streak
  streak: 0,
  bestStreak: 0,

  // Achievements
  achievements: PREDEFINED_ACHIEVEMENTS,

  // Skill point totals
  totalEmpathyPoints: 0,
  totalInsightPoints: 0,
  totalCouragePoints: 0,

  // Combo
  comboMultiplier: 1,

  // Events
  lastEvent: null,

  // Travel
  travelOrigin: null,
  travelDestination: null,
  travelVehicle: null,
};

// ---------------------------------------------------------------------------
// Helper – recalculate island completion percentage
// ---------------------------------------------------------------------------

const recalculateIslandCompletion = (
  islands: Island[],
  islandId: IslandId,
  completedScenarios: string[],
  completedActivities: string[],
): Island[] =>
  islands.map((island) => {
    if (island.id !== islandId) return island;

    const islandScenarios = completedScenarios.filter((id) =>
      id.startsWith(`${islandId}-`),
    );
    const islandActivities = completedActivities.filter((id) =>
      id.startsWith(`${islandId}-`),
    );

    const totalItems = islandScenarios.length + islandActivities.length;

    // Each island is considered to have roughly 10 items for 100 %
    const completionPercent = Math.min(totalItems * 10, 100);

    return { ...island, completionPercent };
  });

// ---------------------------------------------------------------------------
// Helper – try to unlock a single achievement (immutable)
// ---------------------------------------------------------------------------

const tryUnlockAchievement = (
  achievements: Achievement[],
  id: string,
): { achievements: Achievement[]; unlocked: boolean } => {
  const target = achievements.find((a) => a.id === id);
  if (!target || target.unlocked) return { achievements, unlocked: false };

  return {
    achievements: achievements.map((a) =>
      a.id === id
        ? { ...a, unlocked: true, unlockedAt: new Date().toISOString() }
        : a,
    ),
    unlocked: true,
  };
};

// ---------------------------------------------------------------------------
// Helper – extract unique island IDs from scenario IDs
// ---------------------------------------------------------------------------

const getUniqueIslandCount = (scenarioIds: string[]): number => {
  const islands = new Set<string>();
  for (const id of scenarioIds) {
    const dash = id.indexOf('-');
    if (dash > 0) {
      islands.add(id.substring(0, dash));
    }
  }
  return islands.size;
};

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

export const useGameStore = create<GameStore>()(
  persist(
    (set) => ({
      ...initialState,

      // ------------------------------------------------------------------
      // Navigation
      // ------------------------------------------------------------------

      setScreen: (screen: GameScreen) => set({ currentScreen: screen }),

      // ------------------------------------------------------------------
      // Onboarding
      // ------------------------------------------------------------------

      setAvatar: (avatar: Avatar) => set({ avatar }),

      setCompanion: (companion: Companion) => set({ companion }),

      completeOnboarding: () =>
        set({ onboardingComplete: true, currentScreen: 'island-map' as GameScreen }),

      // ------------------------------------------------------------------
      // Mood
      // ------------------------------------------------------------------

      setCurrentMood: (mood: Mood, note?: string) =>
        set((state) => {
          const entry: MoodEntry = {
            mood,
            note,
            timestamp: new Date().toISOString(),
          };

          return {
            currentMood: mood,
            moodHistory: [...state.moodHistory, entry],
          };
        }),

      // ------------------------------------------------------------------
      // Progress
      // ------------------------------------------------------------------

      addXP: (amount: number) =>
        set((state) => {
          const newXP = state.xp + amount;
          const newLevel = Math.floor(newXP / 100) + 1;

          let { achievements } = state;
          let lastEvent: GameEvent | null = state.lastEvent;

          // Trigger level-up event when level increases
          if (newLevel > state.level) {
            lastEvent = { type: 'level-up', data: { level: newLevel }, timestamp: Date.now() };
          }

          // Check level-based achievements
          if (newLevel >= 5) {
            const result = tryUnlockAchievement(achievements, 'level-5');
            achievements = result.achievements;
            if (result.unlocked) {
              lastEvent = { type: 'achievement-unlocked', data: { id: 'level-5', name: 'Aufsteiger' }, timestamp: Date.now() };
            }
          }
          if (newLevel >= 10) {
            const result = tryUnlockAchievement(achievements, 'level-10');
            achievements = result.achievements;
            if (result.unlocked) {
              lastEvent = { type: 'achievement-unlocked', data: { id: 'level-10', name: 'Legendär' }, timestamp: Date.now() };
            }
          }

          // Update island levels based on completion percentage
          const islands = state.islands.map((island) => {
            let newIslandLevel: IslandLevel = 1;
            if (island.completionPercent >= 100) newIslandLevel = 5;
            else if (island.completionPercent >= 75) newIslandLevel = 4;
            else if (island.completionPercent >= 50) newIslandLevel = 3;
            else if (island.completionPercent >= 25) newIslandLevel = 2;

            if (newIslandLevel !== island.level) {
              return { ...island, level: newIslandLevel };
            }
            return island;
          });

          return { xp: newXP, level: newLevel, achievements, lastEvent, islands };
        }),

      completeScenario: (scenarioId: string, islandId: IslandId) =>
        set((state) => {
          if (state.completedScenarios.includes(scenarioId)) return state;

          const completedScenarios = [...state.completedScenarios, scenarioId];
          let islands = recalculateIslandCompletion(
            state.islands,
            islandId,
            completedScenarios,
            state.completedActivities,
          );

          // Streak tracking
          const streak = state.streak + 1;
          const bestStreak = Math.max(streak, state.bestStreak);

          let { achievements } = state;
          let lastEvent: GameEvent | null = state.lastEvent;

          // first-choice: complete first scenario
          if (completedScenarios.length >= 1) {
            const result = tryUnlockAchievement(achievements, 'first-choice');
            achievements = result.achievements;
            if (result.unlocked) {
              lastEvent = { type: 'achievement-unlocked', data: { id: 'first-choice', name: 'Erste Entscheidung' }, timestamp: Date.now() };
            }
          }

          // explorer: visit 3 different islands
          if (getUniqueIslandCount(completedScenarios) >= 3) {
            const result = tryUnlockAchievement(achievements, 'explorer');
            achievements = result.achievements;
            if (result.unlocked) {
              lastEvent = { type: 'achievement-unlocked', data: { id: 'explorer', name: 'Entdecker' }, timestamp: Date.now() };
            }
          }

          // streak-3: 3-scenario streak
          if (streak >= 3) {
            const result = tryUnlockAchievement(achievements, 'streak-3');
            achievements = result.achievements;
            if (result.unlocked) {
              lastEvent = { type: 'streak-milestone', data: { streak: 3, name: 'Auf einer Rolle!' }, timestamp: Date.now() };
            }
          }

          // streak-5: 5-scenario streak
          if (streak >= 5) {
            const result = tryUnlockAchievement(achievements, 'streak-5');
            achievements = result.achievements;
            if (result.unlocked) {
              lastEvent = { type: 'streak-milestone', data: { streak: 5, name: 'Unaufhaltsam' }, timestamp: Date.now() };
            }
          }

          // Auto-unlock islands based on total completed scenarios
          let unlockedIslands = [...state.unlockedIslands];
          for (const { threshold, islandId: unlockId } of ISLAND_UNLOCK_THRESHOLDS) {
            if (
              completedScenarios.length >= threshold &&
              !unlockedIslands.includes(unlockId)
            ) {
              unlockedIslands = [...unlockedIslands, unlockId];
              islands = islands.map((island) =>
                island.id === unlockId
                  ? { ...island, unlocked: true }
                  : island,
              );
              const islandData = islands.find((i) => i.id === unlockId);
              lastEvent = {
                type: 'island-unlocked',
                data: {
                  islandId: unlockId,
                  islandName: islandData?.name ?? unlockId,
                },
                timestamp: Date.now(),
              };
            }
          }

          // Auto-advance chapter based on completed scenarios for this island
          const islandScenarioCount = completedScenarios.filter((id) =>
            id.startsWith(`${islandId}-scenario-`),
          ).length;
          const islandProgress = state.islandProgress.map((ip) => {
            if (ip.islandId !== islandId) return ip;
            // Each completed scenario can advance the chapter
            const newChapter = Math.min(Math.max(islandScenarioCount, ip.currentChapter), 4);
            if (newChapter === ip.currentChapter) return ip;
            const zoneNames = ['entrance', 'depths', 'heart', 'summit'];
            const newZone = zoneNames[newChapter - 1] || `zone-${newChapter}`;
            const unlockedZones = ip.unlockedZones.includes(newZone)
              ? ip.unlockedZones
              : [...ip.unlockedZones, newZone];
            const mysteryStarted = newChapter >= 1 || ip.mysteryStarted;
            return { ...ip, currentChapter: newChapter, unlockedZones, mysteryStarted };
          });

          return { completedScenarios, islands, unlockedIslands, streak, bestStreak, achievements, lastEvent, islandProgress };
        }),

      completeActivity: (activityId: string, islandId: IslandId) =>
        set((state) => {
          if (state.completedActivities.includes(activityId)) return state;

          const completedActivities = [...state.completedActivities, activityId];
          const islands = recalculateIslandCompletion(
            state.islands,
            islandId,
            state.completedScenarios,
            completedActivities,
          );

          return { completedActivities, islands };
        }),

      unlockIsland: (islandId: IslandId) =>
        set((state) => {
          if (state.unlockedIslands.includes(islandId)) return state;

          const unlockedIslands = [...state.unlockedIslands, islandId];
          const islands = state.islands.map((island) =>
            island.id === islandId ? { ...island, unlocked: true } : island,
          );

          return { unlockedIslands, islands };
        }),

      // ------------------------------------------------------------------
      // Collections
      // ------------------------------------------------------------------

      collectWisdomCard: (cardId: string) =>
        set((state) => {
          if (state.collectedWisdomCardIds.includes(cardId)) return state;

          const collectedWisdomCardIds = [...state.collectedWisdomCardIds, cardId];

          let { achievements } = state;
          let lastEvent: GameEvent | null = {
            type: 'wisdom-card-found',
            data: { cardId },
            timestamp: Date.now(),
          };

          // wisdom-collector: collect 10 wisdom cards
          if (collectedWisdomCardIds.length >= 10) {
            const result = tryUnlockAchievement(achievements, 'wisdom-collector');
            achievements = result.achievements;
            if (result.unlocked) {
              lastEvent = { type: 'achievement-unlocked', data: { id: 'wisdom-collector', name: 'Weisheitssammler' }, timestamp: Date.now() };
            }
          }

          return { collectedWisdomCardIds, achievements, lastEvent };
        }),

      // ------------------------------------------------------------------
      // Journal
      // ------------------------------------------------------------------

      addJournalEntry: (entry: Omit<JournalEntry, 'id'>) =>
        set((state) => {
          const newEntry: JournalEntry = {
            ...entry,
            id: `journal-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
          };

          const journalEntries = [...state.journalEntries, newEntry];

          let { achievements } = state;
          let lastEvent: GameEvent | null = state.lastEvent;

          // journal-writer: write 5 journal entries
          if (journalEntries.length >= 5) {
            const result = tryUnlockAchievement(achievements, 'journal-writer');
            achievements = result.achievements;
            if (result.unlocked) {
              lastEvent = { type: 'achievement-unlocked', data: { id: 'journal-writer', name: 'Tagebuch-Autor' }, timestamp: Date.now() };
            }
          }

          return { journalEntries, achievements, lastEvent };
        }),

      // ------------------------------------------------------------------
      // Settings
      // ------------------------------------------------------------------

      updateSettings: (newSettings: Partial<Settings>) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),

      // ------------------------------------------------------------------
      // Islands
      // ------------------------------------------------------------------

      setActiveIsland: (islandId: IslandId | null) =>
        set({ activeIsland: islandId }),

      // ------------------------------------------------------------------
      // Achievements
      // ------------------------------------------------------------------

      unlockAchievement: (id: string) =>
        set((state) => {
          const result = tryUnlockAchievement(state.achievements, id);
          if (!result.unlocked) return state;

          const achievement = result.achievements.find((a) => a.id === id);
          const lastEvent: GameEvent = {
            type: 'achievement-unlocked',
            data: { id, name: achievement?.name ?? id },
            timestamp: Date.now(),
          };

          return { achievements: result.achievements, lastEvent };
        }),

      // ------------------------------------------------------------------
      // Skill points
      // ------------------------------------------------------------------

      addSkillPoints: (empathy: number, insight: number, courage: number) =>
        set((state) => {
          const totalEmpathyPoints = state.totalEmpathyPoints + empathy;
          const totalInsightPoints = state.totalInsightPoints + insight;
          const totalCouragePoints = state.totalCouragePoints + courage;

          let { achievements } = state;
          let lastEvent: GameEvent | null = state.lastEvent;

          // empathy-master: earn 50+ total empathy points
          if (totalEmpathyPoints >= 50) {
            const result = tryUnlockAchievement(achievements, 'empathy-master');
            achievements = result.achievements;
            if (result.unlocked) {
              lastEvent = { type: 'achievement-unlocked', data: { id: 'empathy-master', name: 'Empathie-Meister' }, timestamp: Date.now() };
            }
          }

          // courage-hero: earn 50+ total courage points
          if (totalCouragePoints >= 50) {
            const result = tryUnlockAchievement(achievements, 'courage-hero');
            achievements = result.achievements;
            if (result.unlocked) {
              lastEvent = { type: 'achievement-unlocked', data: { id: 'courage-hero', name: 'Held des Muts' }, timestamp: Date.now() };
            }
          }

          return { totalEmpathyPoints, totalInsightPoints, totalCouragePoints, achievements, lastEvent };
        }),

      // ------------------------------------------------------------------
      // Island Progress (chapters & mysteries)
      // ------------------------------------------------------------------

      advanceChapter: (islandId: IslandId) =>
        set((state) => {
          const islandProgress = state.islandProgress.map((ip) => {
            if (ip.islandId !== islandId) return ip;
            const nextChapter = Math.min(ip.currentChapter + 1, 4);
            // Auto-unlock zone for the new chapter
            const zoneNames = ['entrance', 'depths', 'heart', 'summit'];
            const newZone = zoneNames[nextChapter - 1] || `zone-${nextChapter}`;
            const unlockedZones = ip.unlockedZones.includes(newZone)
              ? ip.unlockedZones
              : [...ip.unlockedZones, newZone];
            return { ...ip, currentChapter: nextChapter, unlockedZones };
          });
          const lastEvent: GameEvent = {
            type: 'chapter-unlocked',
            data: { islandId, chapter: islandProgress.find((ip) => ip.islandId === islandId)?.currentChapter },
            timestamp: Date.now(),
          };
          return { islandProgress, lastEvent };
        }),

      discoverClue: (islandId: IslandId, clueId: string) =>
        set((state) => {
          const islandProgress = state.islandProgress.map((ip) => {
            if (ip.islandId !== islandId) return ip;
            if (ip.discoveredClues.includes(clueId)) return ip;
            return { ...ip, discoveredClues: [...ip.discoveredClues, clueId] };
          });
          const lastEvent: GameEvent = {
            type: 'clue-discovered',
            data: { islandId, clueId },
            timestamp: Date.now(),
          };
          return { islandProgress, lastEvent };
        }),

      unlockZone: (islandId: IslandId, zoneId: string) =>
        set((state) => {
          const islandProgress = state.islandProgress.map((ip) => {
            if (ip.islandId !== islandId) return ip;
            if (ip.unlockedZones.includes(zoneId)) return ip;
            return { ...ip, unlockedZones: [...ip.unlockedZones, zoneId] };
          });
          return { islandProgress };
        }),

      startMystery: (islandId: IslandId) =>
        set((state) => {
          const islandProgress = state.islandProgress.map((ip) => {
            if (ip.islandId !== islandId) return ip;
            if (ip.mysteryStarted) return ip;
            return { ...ip, mysteryStarted: true };
          });
          const lastEvent: GameEvent = {
            type: 'mystery-started',
            data: { islandId },
            timestamp: Date.now(),
          };
          return { islandProgress, lastEvent };
        }),

      solveMystery: (islandId: IslandId) =>
        set((state) => {
          const islandProgress = state.islandProgress.map((ip) => {
            if (ip.islandId !== islandId) return ip;
            if (ip.mysterySolved) return ip;
            return { ...ip, mysterySolved: true };
          });
          const lastEvent: GameEvent = {
            type: 'mystery-solved',
            data: { islandId },
            timestamp: Date.now(),
          };
          return { islandProgress, lastEvent };
        }),

      getIslandProgress: (islandId: IslandId): IslandProgress => {
        const s = useGameStore.getState() as unknown as GameState;
        return (
          s.islandProgress.find((ip: IslandProgress) => ip.islandId === islandId) || {
            islandId,
            currentChapter: 1,
            mysteryStarted: false,
            mysterySolved: false,
            discoveredClues: [] as string[],
            unlockedZones: ['entrance'] as string[],
          }
        );
      },

      // ------------------------------------------------------------------
      // Combo
      // ------------------------------------------------------------------

      increaseCombo: () =>
        set((state) => {
          const currentIndex = COMBO_STEPS.findIndex((s) => s === state.comboMultiplier);
          const nextIndex = Math.min(
            (currentIndex === -1 ? 0 : currentIndex) + 1,
            COMBO_STEPS.length - 1,
          );
          return { comboMultiplier: COMBO_STEPS[nextIndex] };
        }),

      resetCombo: () => set({ comboMultiplier: 1 }),

      // ------------------------------------------------------------------
      // Events
      // ------------------------------------------------------------------

      triggerEvent: (type: string, data: any) =>
        set({ lastEvent: { type, data, timestamp: Date.now() } }),

      // ------------------------------------------------------------------
      // Travel
      // ------------------------------------------------------------------

      startTravel: (origin: IslandId, destination: IslandId, vehicle: 'boat' | 'airplane') =>
        set({
          travelOrigin: origin,
          travelDestination: destination,
          travelVehicle: vehicle,
          currentScreen: 'travel' as GameScreen,
        }),

      completeTravel: () =>
        set((state) => ({
          activeIsland: state.travelDestination,
          currentScreen: 'island' as GameScreen,
          travelOrigin: null,
          travelDestination: null,
          travelVehicle: null,
        })),

      // ------------------------------------------------------------------
      // Reset
      // ------------------------------------------------------------------

      resetGame: () => set(initialState),
    }),
    {
      name: 'inner-worlds-game',
    },
  ),
);
