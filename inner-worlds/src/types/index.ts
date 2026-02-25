// =============================================================================
// Inner Worlds - Social-Emotional Learning Game
// Comprehensive TypeScript Type Definitions
// =============================================================================

// -----------------------------------------------------------------------------
// Enums
// -----------------------------------------------------------------------------

/** Core emotions tracked throughout the game */
export const Mood = {
  Happy: 'happy',
  Sad: 'sad',
  Angry: 'angry',
  Anxious: 'anxious',
  Calm: 'calm',
  Confused: 'confused',
  Excited: 'excited',
  Tired: 'tired',
  Lonely: 'lonely',
  Proud: 'proud',
  Frustrated: 'frustrated',
  Hopeful: 'hopeful',
} as const;

export type Mood = (typeof Mood)[keyof typeof Mood];

// -----------------------------------------------------------------------------
// Scalar Type Aliases (Unions)
// -----------------------------------------------------------------------------

/** Companion animal species available in the game */
export type CompanionType = 'wolf' | 'owl' | 'fox' | 'turtle';

/** Unique identifier for each thematic island */
export type IslandId =
  | 'volcano'
  | 'ocean'
  | 'forest'
  | 'mountain'
  | 'garden'
  | 'night'
  | 'rainbow'
  | 'home';

/** Activity categories available on islands */
export type ActivityType =
  | 'breathing'
  | 'reflection'
  | 'journal'
  | 'meditation'
  | 'assessment'
  | 'creative';

/** All mini-game types available in the game */
export type MiniGameType =
  | 'memory'
  | 'catcher'
  | 'sorter'
  | 'emotion-compass'
  | 'feeling-puzzle'
  | 'mood-painter'
  | 'empathy-theater'
  | 'mindful-garden'
  | 'values-scale'
  | 'emotion-detective'
  | 'trust-bridge'
  | 'story-weaver';

/** Quest status tracking */
export type QuestStatus = 'locked' | 'available' | 'active' | 'completed';

/** Quest objective types */
export type ObjectiveType =
  | 'talk-to-npc'
  | 'complete-scenario'
  | 'play-minigame'
  | 'collect-items'
  | 'discover-location'
  | 'complete-activity'
  | 'reach-zone'
  | 'earn-skill-points';

/** Location types in the open world */
export type LocationType =
  | 'quest-giver'
  | 'mini-game-station'
  | 'hidden-secret'
  | 'meditation-spot'
  | 'story-shrine'
  | 'challenge-arena'
  | 'npc-home'
  | 'collectible'
  | 'portal'
  | 'landmark';

/** Supported UI languages */
export type Language = 'de' | 'fr';

/** Island difficulty / progression level (1 through 5) */
export type IslandLevel = 1 | 2 | 3 | 4 | 5;

/** All navigable screens within the game */
export type GameScreen =
  | 'welcome'
  | 'onboarding-avatar'
  | 'onboarding-companion'
  | 'onboarding-assessment'
  | 'mood-checkin'
  | 'world-map'
  | 'island-map'
  | 'island'
  | 'travel'
  | 'scenario'
  | 'activity'
  | 'mini-game'
  | 'quest-log'
  | 'journal'
  | 'collection'
  | 'settings'
  | 'sos'
  | 'dashboard';

// -----------------------------------------------------------------------------
// Avatar
// -----------------------------------------------------------------------------

/** Player-customisable avatar representation */
export interface Avatar {
  /** Skin tone selection */
  skinColor: string;
  /** Hairstyle variant identifier */
  hairStyle: string;
  /** Hair colour value */
  hairColor: string;
  /** Clothing item identifier */
  clothing: string;
  /** Optional accessory identifiers */
  accessories: string[];
  /** Whether the avatar uses a wheelchair */
  wheelchairOption: boolean;
  /** Whether the avatar wears a hijab */
  hijabOption: boolean;
}

// -----------------------------------------------------------------------------
// Companion
// -----------------------------------------------------------------------------

/** Evolutionary stage of the companion creature */
export type EvolutionStage = 'egg' | 'baby' | 'juvenile' | 'adult' | 'elder';

/** AI companion that accompanies the player throughout the game */
export interface Companion {
  /** Unique companion identifier */
  id: string;
  /** Display name chosen by the player */
  name: string;
  /** Animal species of the companion */
  type: CompanionType;
  /** Core personality trait the companion embodies */
  trait: string;
  /** Short narrative description of the companion */
  description: string;
  /** Current experience level */
  level: number;
  /** Current stage in the companion's evolution arc */
  evolutionStage: EvolutionStage;
}

// -----------------------------------------------------------------------------
// Mood Tracking
// -----------------------------------------------------------------------------

/** A single mood check-in entry recorded by the player */
export interface MoodEntry {
  /** The emotion selected during check-in */
  mood: Mood;
  /** ISO-8601 timestamp of when the entry was recorded */
  timestamp: string;
  /** Optional free-text note from the player */
  note?: string;
}

// -----------------------------------------------------------------------------
// Islands
// -----------------------------------------------------------------------------

/** A thematic island in the game world */
export interface Island {
  /** Unique island identifier */
  id: IslandId;
  /** Localised display name */
  name: string;
  /** Emoji icon representing the island */
  emoji: string;
  /** Short narrative description of the island */
  description: string;
  /** Social-emotional theme explored on this island */
  theme: string;
  /** Gradient colors [primary, mid, dark] */
  colors: string[];
  /** Whether the player has unlocked access to this island */
  unlocked: boolean;
  /** Percentage of island content completed (0-100) */
  completionPercent: number;
  /** Current difficulty / progression level of the island */
  level: IslandLevel;
}

// -----------------------------------------------------------------------------
// Scenarios, Scenes & Choices
// -----------------------------------------------------------------------------

/** A single choice presented to the player within a scene */
export interface Choice {
  /** Unique choice identifier */
  id: string;
  /** Display text for the choice */
  text: string;
  /** Narrative consequence text shown after selection */
  consequence: string;
  /** Empathy skill points awarded for this choice */
  empathyPoints: number;
  /** Insight skill points awarded for this choice */
  insightPoints: number;
  /** Courage skill points awarded for this choice */
  couragePoints: number;
  /** Identifier of the next scene to transition to, or null if terminal */
  nextSceneId: string | null;
}

/** A single scene within a scenario, containing dialogue and player choices */
export interface Scene {
  /** Unique scene identifier */
  id: string;
  /** Narrative or dialogue text displayed to the player */
  text: string;
  /** Name of the character speaking */
  speaker: string;
  /** Emoji representing the speaking character */
  speakerEmoji: string;
  /** Available choices the player can make in this scene */
  choices: Choice[];
}

/** A branching narrative scenario tied to a specific island */
export interface Scenario {
  /** Unique scenario identifier */
  id: string;
  /** The island this scenario belongs to */
  islandId: IslandId;
  /** Title of the scenario */
  title: string;
  /** Brief description of the scenario's premise */
  description: string;
  /** Ordered list of scenes that compose this scenario */
  scenes: Scene[];
}

// -----------------------------------------------------------------------------
// Wisdom Cards
// -----------------------------------------------------------------------------

/** A collectible card containing a social-emotional learning insight */
export interface WisdomCard {
  /** Unique card identifier */
  id: string;
  /** The island where this card can be earned */
  islandId: IslandId;
  /** The wisdom text displayed on the card */
  text: string;
  /** Thematic category of the wisdom (e.g. empathy, resilience) */
  category: string;
  /** Whether the player has collected this card */
  collected: boolean;
}

// -----------------------------------------------------------------------------
// Activities
// -----------------------------------------------------------------------------

/** An interactive activity available on an island */
export interface Activity {
  /** Unique activity identifier */
  id: string;
  /** The island this activity belongs to */
  islandId: IslandId;
  /** Category of the activity */
  type: ActivityType;
  /** Display title */
  title: string;
  /** Brief description of the activity */
  description: string;
  /** Whether the player has completed this activity */
  completed: boolean;
}

// -----------------------------------------------------------------------------
// Journal
// -----------------------------------------------------------------------------

/** A journal entry written by the player ("Logbuch des Seelentauchers") */
export interface JournalEntry {
  /** Unique entry identifier */
  id: string;
  /** ISO-8601 date string of when the entry was created */
  date: string;
  /** The reflection prompt presented to the player */
  prompt: string;
  /** The player's written response */
  response: string;
  /** The island context in which this entry was written */
  islandId: IslandId;
  /** Optional mood emoji at time of writing */
  mood?: string;
  /** Which scenario triggered this entry */
  scenarioId?: string;
  /** Which NPC was involved */
  npcName?: string;
  /** Type of journal entry */
  entryType?: 'reflection' | 'transfer' | 'shadow' | 'companion' | 'free';
  /** Emotional tags/themes */
  tags?: string[];
  /** Emotional intensity 1-5 */
  emotionalIntensity?: number;
}

// -----------------------------------------------------------------------------
// Settings
// -----------------------------------------------------------------------------

/** Player-configurable application settings */
export interface Settings {
  /** UI language */
  language: Language;
  /** Use a dyslexia-friendly font throughout the UI */
  dyslexiaFont: boolean;
  /** Enable high-contrast mode for improved accessibility */
  highContrast: boolean;
  /** Enable or disable sound effects */
  soundEnabled: boolean;
  /** Master volume level (0.0 to 1.0) */
  volume: number;
  /** Enable or disable background music */
  musicEnabled: boolean;
}

// -----------------------------------------------------------------------------
// Achievement
// -----------------------------------------------------------------------------

/** A game achievement that can be unlocked by the player */
export interface Achievement {
  /** Unique achievement identifier */
  id: string;
  /** Display name of the achievement */
  name: string;
  /** Description of how to unlock the achievement */
  description: string;
  /** Whether the achievement has been unlocked */
  unlocked: boolean;
  /** ISO-8601 timestamp of when the achievement was unlocked, or null */
  unlockedAt: string | null;
}

// -----------------------------------------------------------------------------
// Game Event (for animation triggers)
// -----------------------------------------------------------------------------

/** An event triggered for UI animations and feedback */
export interface GameEvent {
  /** Event type identifier (e.g. 'level-up', 'achievement-unlocked') */
  type: string;
  /** Arbitrary event payload */
  data: any;
  /** Unix timestamp (ms) of when the event was triggered */
  timestamp: number;
}

// -----------------------------------------------------------------------------
// Open World: Quests, Locations, NPCs
// -----------------------------------------------------------------------------

/** A single objective within a quest */
export interface QuestObjective {
  /** Unique objective identifier */
  id: string;
  /** Description of what the player must do */
  description: string;
  /** Type of objective */
  type: ObjectiveType;
  /** Target ID (e.g., NPC id, scenario id, location id) */
  targetId: string;
  /** Required count (e.g., collect 3 items) */
  requiredCount: number;
  /** Current progress count */
  currentCount: number;
  /** Whether this objective is complete */
  completed: boolean;
}

/** Reward given upon quest completion */
export interface QuestReward {
  /** XP earned */
  xp: number;
  /** Empathy points earned */
  empathyPoints: number;
  /** Insight points earned */
  insightPoints: number;
  /** Courage points earned */
  couragePoints: number;
  /** Wisdom card ID unlocked (optional) */
  wisdomCardId?: string;
  /** Achievement ID unlocked (optional) */
  achievementId?: string;
  /** Zone unlocked (optional) */
  zoneUnlock?: string;
}

/** A main story quest within an island */
export interface MainQuest {
  /** Unique quest identifier */
  id: string;
  /** Island this quest belongs to */
  islandId: IslandId;
  /** Chapter number (1-4) */
  chapter: number;
  /** Quest title */
  title: string;
  /** Narrative description */
  description: string;
  /** Story introduction text */
  storyIntro: string;
  /** Story conclusion text */
  storyConclusion: string;
  /** Current status */
  status: QuestStatus;
  /** Ordered list of objectives */
  objectives: QuestObjective[];
  /** Rewards for completing the quest */
  rewards: QuestReward;
  /** Scenario IDs tied to this quest */
  scenarioIds: string[];
  /** Mini-game IDs tied to this quest */
  miniGameIds: string[];
  /** ID of the NPC who gives this quest */
  questGiverId: string;
}

/** A side quest - optional but rewarding */
export interface SideQuest {
  /** Unique side quest identifier */
  id: string;
  /** Island this quest belongs to */
  islandId: IslandId;
  /** Quest title */
  title: string;
  /** Short description */
  description: string;
  /** Emoji icon for the quest */
  emoji: string;
  /** Current status */
  status: QuestStatus;
  /** Minimum chapter required to unlock */
  requiredChapter: number;
  /** Objectives to complete */
  objectives: QuestObjective[];
  /** Rewards for completing */
  rewards: QuestReward;
  /** Linked mini-game type (optional) */
  miniGameType?: MiniGameType;
  /** ID of the NPC who gives this quest */
  questGiverId: string;
  /** Dialogue shown when accepting the quest */
  acceptDialogue: string;
  /** Dialogue shown upon completion */
  completeDialogue: string;
  /** Zone where this quest is available */
  zone: string;
}

/** A point of interest in the open world */
export interface WorldLocation {
  /** Unique location identifier */
  id: string;
  /** Island this location belongs to */
  islandId: IslandId;
  /** Display name */
  name: string;
  /** Location type */
  type: LocationType;
  /** Emoji icon */
  emoji: string;
  /** Short description */
  description: string;
  /** 3D position [x, y, z] in the world */
  position: [number, number, number];
  /** Zone this location belongs to */
  zone: string;
  /** Whether this location is initially hidden */
  hidden: boolean;
  /** NPC ID present at this location (optional) */
  npcId?: string;
  /** Mini-game available here (optional) */
  miniGameType?: MiniGameType;
  /** Quest ID associated with this location (optional) */
  questId?: string;
  /** Interaction radius */
  interactRadius: number;
}

/** A fully-typed NPC in the open world */
export interface WorldNPC {
  /** Unique NPC identifier */
  id: string;
  /** Display name */
  name: string;
  /** Emoji icon */
  emoji: string;
  /** Role description */
  role: string;
  /** Island this NPC belongs to */
  islandId: IslandId;
  /** Backstory shown when first met */
  backstory: string;
  /** Idle dialogue lines (randomly selected) */
  idleDialogue: string[];
  /** Quest-related dialogue */
  questDialogue: {
    /** Dialogue when quest is available */
    available?: string;
    /** Dialogue when quest is in progress */
    inProgress?: string;
    /** Dialogue when quest is complete */
    completed?: string;
  };
  /** Zone where this NPC is found */
  zone: string;
  /** Position in the world */
  position: [number, number, number];
  /** Quest IDs this NPC is involved in */
  questIds: string[];
  /** Whether this NPC sells/trades items */
  isShopkeeper: boolean;
}

/** Island open-world configuration */
export interface IslandOpenWorld {
  /** Island identifier */
  islandId: IslandId;
  /** Main quests (one per chapter) */
  mainQuests: MainQuest[];
  /** Side quests */
  sideQuests: SideQuest[];
  /** Points of interest / locations */
  locations: WorldLocation[];
  /** NPCs */
  npcs: WorldNPC[];
  /** Zone definitions */
  zones: IslandZone[];
}

/** A zone within an island */
export interface IslandZone {
  /** Unique zone identifier */
  id: string;
  /** Display name */
  name: string;
  /** Description */
  description: string;
  /** Emoji icon */
  emoji: string;
  /** Chapter required to unlock */
  requiredChapter: number;
  /** Bounds in the 3D world [minX, minZ, maxX, maxZ] */
  bounds: [number, number, number, number];
  /** Theme color */
  color: string;
}

// -----------------------------------------------------------------------------
// Island Chapter Progression (progressive unlocking within islands)
// -----------------------------------------------------------------------------

/** Tracks which chapter a player has reached on a specific island */
export interface IslandProgress {
  /** The island this progress belongs to */
  islandId: IslandId;
  /** Current chapter unlocked (1-4, scenarios unlock progressively) */
  currentChapter: number;
  /** Whether the island's mystery/puzzle arc has been started */
  mysteryStarted: boolean;
  /** Whether the island's mystery/puzzle arc is fully solved */
  mysterySolved: boolean;
  /** Clues discovered on this island */
  discoveredClues: string[];
  /** Hidden areas/zones unlocked on this island */
  unlockedZones: string[];
  /** Main quest progress - IDs of completed main quests */
  completedMainQuests: string[];
  /** Side quest progress - IDs of completed side quests */
  completedSideQuests: string[];
  /** IDs of active (in-progress) quests */
  activeQuests: string[];
  /** Discovered location IDs */
  discoveredLocations: string[];
  /** Met NPC IDs */
  metNPCs: string[];
  /** Mini-games completed (by ID) */
  completedMiniGames: string[];
}

// -----------------------------------------------------------------------------
// Island Story (narrative arc per island)
// -----------------------------------------------------------------------------

/** A story-driven narrative arc for each island's mystery */
export interface IslandStory {
  /** The island this story belongs to */
  islandId: IslandId;
  /** Title of the island's overarching mystery */
  mysteryTitle: string;
  /** Short hook text shown when first arriving */
  hook: string;
  /** Chapter introductions shown when unlocking each chapter */
  chapterIntros: string[];
  /** Clue descriptions that can be discovered */
  clues: { id: string; text: string; chapter: number }[];
  /** Final revelation text when the mystery is solved */
  revelation: string;
}

// -----------------------------------------------------------------------------
// Shadow Self (Overarching Story Arc)
// -----------------------------------------------------------------------------

/** A shadow encounter that occurs on each island as part of the overarching narrative */
export interface ShadowEncounter {
  /** Island where this encounter takes place */
  islandId: IslandId;
  /** When during the island this encounter triggers (chapter completion) */
  triggerChapter: number;
  /** The shadow's appearance description for this island */
  appearance: string;
  /** The shadow's monologue - the uncomfortable truth it represents */
  monologue: string;
  /** The therapeutic message the player learns from this encounter */
  lesson: string;
  /** Player response choices for the shadow encounter */
  responses: ShadowResponse[];
  /** Visual effect intensity (0-1, increases with each island) */
  humanization: number;
}

/** A player response to the shadow self */
export interface ShadowResponse {
  /** Response text */
  text: string;
  /** Shadow's reaction to this response */
  reaction: string;
  /** Whether this response shows understanding/acceptance */
  isAccepting: boolean;
}

// -----------------------------------------------------------------------------
// Companion Backstory & Reactions
// -----------------------------------------------------------------------------

/** A companion's personal backstory, revealed at affection level 3 */
export interface CompanionBackstory {
  /** Companion type this belongs to */
  type: CompanionType;
  /** The backstory narrative (told in first person) */
  story: string;
  /** The therapeutic parallel to the game's themes */
  parallel: string;
}

/** Companion reactions to player choices */
export interface CompanionReaction {
  /** Reaction to good choices */
  goodChoice: string[];
  /** Reaction to wrong choices */
  wrongChoice: string[];
  /** Reaction to shadow encounters */
  shadowEncounter: string[];
  /** Island-specific comments when arriving */
  islandArrival: Record<IslandId, string>;
}

// -----------------------------------------------------------------------------
// Real-World Transfer Prompts
// -----------------------------------------------------------------------------

/** A transfer prompt connecting game content to real life */
export interface TransferPrompt {
  /** The scenario this prompt follows */
  scenarioId: string;
  /** The prompt text shown to the player */
  prompt: string;
  /** A hint/example to help the player think */
  hint: string;
}

// -----------------------------------------------------------------------------
// Game State
// -----------------------------------------------------------------------------

/** Root state object representing the entire game session */
export interface GameState {
  /** Currently active screen */
  currentScreen: GameScreen;
  /** Whether onboarding has been completed */
  onboardingComplete: boolean;
  /** The player's avatar configuration */
  avatar: Avatar | null;
  /** The player's chosen companion */
  companion: Companion | null;
  /** All islands in the game world */
  islands: Island[];
  /** Currently active island being viewed */
  activeIsland: IslandId | null;
  /** Total experience points earned */
  xp: number;
  /** Current player level */
  level: number;
  /** IDs of collected wisdom cards */
  collectedWisdomCardIds: string[];
  /** All journal entries authored by the player */
  journalEntries: JournalEntry[];
  /** Chronological history of mood check-ins */
  moodHistory: MoodEntry[];
  /** Current mood set at session start */
  currentMood: Mood | null;
  /** Player settings and preferences */
  settings: Settings;
  /** Set of scenario IDs the player has completed */
  completedScenarios: string[];
  /** Set of activity IDs the player has completed */
  completedActivities: string[];
  /** Set of island IDs the player has unlocked */
  unlockedIslands: IslandId[];

  /** Per-island chapter progression and mystery tracking */
  islandProgress: IslandProgress[];

  // Streak
  /** Current consecutive scenario completion streak */
  streak: number;
  /** Best streak ever achieved */
  bestStreak: number;

  // Achievements
  /** All game achievements (locked and unlocked) */
  achievements: Achievement[];

  // Skill point totals
  /** Total empathy skill points earned across all scenarios */
  totalEmpathyPoints: number;
  /** Total insight skill points earned across all scenarios */
  totalInsightPoints: number;
  /** Total courage skill points earned across all scenarios */
  totalCouragePoints: number;

  // Combo
  /** Current combo multiplier for consecutive good choices */
  comboMultiplier: number;

  // Events
  /** Last game event for animation triggers */
  lastEvent: GameEvent | null;

  // Travel
  /** Origin island when traveling between islands */
  travelOrigin: IslandId | null;
  /** Destination island when traveling between islands */
  travelDestination: IslandId | null;
  /** Travel vehicle: 'boat' for adjacent islands, 'airplane' for distant ones */
  travelVehicle: 'boat' | 'airplane' | null;

  // Quest system
  /** Currently active mini-game type */
  activeMiniGame: MiniGameType | null;
  /** ID of the currently viewed quest */
  activeQuestId: string | null;
  /** IDs of all completed mini-games across all islands */
  completedMiniGameIds: string[];

  // Shadow Self arc
  /** IDs of islands where the shadow self has been encountered */
  shadowEncountersCompleted: IslandId[];
  /** Whether the final shadow integration (Home island) is complete */
  shadowIntegrated: boolean;
  /** Companion affection level (1-5, increases with good choices) */
  companionAffection: number;
}
