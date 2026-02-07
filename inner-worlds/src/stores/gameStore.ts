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
  JournalEntry,
  Settings,
  Island,
} from '../types';

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

          return { xp: newXP, level: newLevel };
        }),

      completeScenario: (scenarioId: string, islandId: IslandId) =>
        set((state) => {
          if (state.completedScenarios.includes(scenarioId)) return state;

          const completedScenarios = [...state.completedScenarios, scenarioId];
          const islands = recalculateIslandCompletion(
            state.islands,
            islandId,
            completedScenarios,
            state.completedActivities,
          );

          return { completedScenarios, islands };
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
          return { collectedWisdomCardIds: [...state.collectedWisdomCardIds, cardId] };
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

          return { journalEntries: [...state.journalEntries, newEntry] };
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
      // Reset
      // ------------------------------------------------------------------

      resetGame: () => set(initialState),
    }),
    {
      name: 'inner-worlds-game',
    },
  ),
);
