import { volcanoScenarios, volcanoActivities, volcanoWisdomCards } from './islands/volcano';
import { oceanScenarios, oceanActivities, oceanWisdomCards } from './islands/ocean';
import { forestScenarios, forestActivities, forestWisdomCards } from './islands/forest';
import { mountainScenarios, mountainActivities, mountainWisdomCards } from './islands/mountain';
import { gardenScenarios, gardenActivities, gardenWisdomCards } from './islands/garden';
import { nightScenarios, nightActivities, nightWisdomCards } from './islands/night';
import { rainbowScenarios, rainbowActivities, rainbowWisdomCards } from './islands/rainbow';
import { homeScenarios, homeActivities, homeWisdomCards } from './islands/home';

// ---------------------------------------------------------------------------
// NPC data for each island (4 NPCs per island, one per scenario)
// ---------------------------------------------------------------------------

const allNPCs: Record<string, any[]> = {
  volcano: [
    {
      id: 'volcano-npc-1',
      name: 'Ignis',
      emoji: '\u{1F525}',
      description: 'Der Feuerw\u00E4chter',
      backstory: '\u201EIch bin Ignis, der W\u00E4chter der Flammen. Wut ist wie Feuer \u2013 sie kann zerst\u00F6ren, aber auch w\u00E4rmen. Ich zeige dir, wie du dein inneres Feuer kontrollieren kannst.\u201C',
    },
    {
      id: 'volcano-npc-2',
      name: 'Magma',
      emoji: '\u{1F30B}',
      description: 'Die Lavaschmiedin',
      backstory: '\u201EHey! Ich bin Magma. Unter meiner harten Kruste brodelt es manchmal gewaltig. Kennst du das? Komm, ich erz\u00E4hl dir meine Geschichte.\u201C',
    },
    {
      id: 'volcano-npc-3',
      name: 'Ash',
      emoji: '\u{1F4A8}',
      description: 'Der Rauchgeist',
      backstory: '\u201EIch bin Ash. Fr\u00FCher hab ich alles in mich reingefressen, bis ich explodiert bin. Jetzt wei\u00DF ich: Es gibt bessere Wege. Willst du sie kennenlernen?\u201C',
    },
    {
      id: 'volcano-npc-4',
      name: 'Ember',
      emoji: '\u2728',
      description: 'Das Gl\u00FChw\u00FCrmchen',
      backstory: '\u201EHallo! Ich bin Ember. Ich leuchte am hellsten, wenn ich ruhig bin. Manchmal muss man die Hitze rauslassen, um sein wahres Licht zu finden.\u201C',
    },
  ],
  ocean: [
    {
      id: 'ocean-npc-1',
      name: 'Coral',
      emoji: '\u{1F41A}',
      description: 'Die Muschelsammlerin',
      backstory: '\u201EIch bin Coral. Jede Muschel hier erz\u00E4hlt eine Geschichte \u00FCber Verlust und Erinnerung. Manche Dinge gehen, aber die Sch\u00F6nheit bleibt.\u201C',
    },
    {
      id: 'ocean-npc-2',
      name: 'Tide',
      emoji: '\u{1F30A}',
      description: 'Der Wellenreiter',
      backstory: '\u201EHey, ich bin Tide. Trauer kommt in Wellen \u2013 manchmal stark, manchmal sanft. Ich hab gelernt, mit ihnen zu schwimmen statt gegen sie.\u201C',
    },
    {
      id: 'ocean-npc-3',
      name: 'Pearl',
      emoji: '\u{1FAAB}',
      description: 'Die Tiefseelotsin',
      backstory: '\u201EIch bin Pearl. In der Tiefe ist es dunkel, aber dort findet man die wertvollsten Sch\u00E4tze. Trauer kann uns st\u00E4rker machen, wenn wir sie zulassen.\u201C',
    },
    {
      id: 'ocean-npc-4',
      name: 'Drift',
      emoji: '\u{1F3B6}',
      description: 'Der Meeress\u00E4nger',
      backstory: '\u201EAhoi! Ich bin Drift. Wenn mir schwer ums Herz ist, singe ich. Manchmal hilft es, Gef\u00FChle in Worte zu fassen. Probier es mal!\u201C',
    },
  ],
  forest: [
    {
      id: 'forest-npc-1',
      name: 'Moss',
      emoji: '\u{1F33F}',
      description: 'Der Waldh\u00FCter',
      backstory: '\u201EIch bin Moss. Der Wald kann unheimlich wirken, aber Angst ist nur ein Zeichen, dass etwas Wichtiges kommt. Lass uns gemeinsam mutig sein.\u201C',
    },
    {
      id: 'forest-npc-2',
      name: 'Fern',
      emoji: '\u{1F33E}',
      description: 'Die Kletterranke',
      backstory: '\u201EHey! Ich bin Fern. Fr\u00FCher hatte ich Angst vor der Dunkelheit. Dann hab ich gemerkt: Im Dunkeln wachsen die spannendsten Dinge.\u201C',
    },
    {
      id: 'forest-npc-3',
      name: 'Owl',
      emoji: '\u{1F989}',
      description: 'Die Nachteule',
      backstory: '\u201EIch bin Owl. Ich sehe klar, auch wenn andere nichts erkennen. Angst versucht dich zu t\u00E4uschen \u2013 aber mit offenen Augen erkennst du die Wahrheit.\u201C',
    },
    {
      id: 'forest-npc-4',
      name: 'Fox',
      emoji: '\u{1F98A}',
      description: 'Der schlaue Fuchs',
      backstory: '\u201EHallo! Ich bin Fox. Mut bedeutet nicht, keine Angst zu haben. Es bedeutet, trotzdem weiterzugehen. Ich zeig dir wie.\u201C',
    },
  ],
  mountain: [
    {
      id: 'mountain-npc-1',
      name: 'Flint',
      emoji: '\u{1FAA8}',
      description: 'Der Steinmetz',
      backstory: '\u201EIch bin Flint. Wie ein Berg bin ich manchmal hart zu mir selbst. Aber ich lerne: Mein Wert h\u00E4ngt nicht davon ab, wie hoch ich klettere.\u201C',
    },
    {
      id: 'mountain-npc-2',
      name: 'Summit',
      emoji: '\u26F0\uFE0F',
      description: 'Die Gipfelstreberin',
      backstory: '\u201EHey, ich bin Summit! Jeder Gipfel sieht von unten unerreichbar aus. Aber Schritt f\u00FCr Schritt schaffen wir alles. Glaubst du an dich?\u201C',
    },
    {
      id: 'mountain-npc-3',
      name: 'Echo',
      emoji: '\u{1F4E3}',
      description: 'Das Bergecho',
      backstory: '\u201EIch bin Echo. Was du \u00FCber dich selbst sagst, hallt in deinem Kopf wider. Lass uns \u00FCben, freundlicher mit dir zu reden.\u201C',
    },
    {
      id: 'mountain-npc-4',
      name: 'Crystal',
      emoji: '\u{1F48E}',
      description: 'Der Kristallsucher',
      backstory: '\u201EIch bin Crystal. Unter Druck entstehen die sch\u00F6nsten Kristalle. Deine Erfahrungen machen dich einzigartig und wertvoll.\u201C',
    },
  ],
  garden: [
    {
      id: 'garden-npc-1',
      name: 'Bloom',
      emoji: '\u{1F33B}',
      description: 'Die G\u00E4rtnerin',
      backstory: '\u201EIch bin Bloom! Beziehungen sind wie Pflanzen \u2013 sie brauchen Pflege, Geduld und manchmal auch Regen. Komm, lass uns zusammen g\u00E4rtnern.\u201C',
    },
    {
      id: 'garden-npc-2',
      name: 'Thorn',
      emoji: '\u{1F339}',
      description: 'Der Dornenritter',
      backstory: '\u201EHey, ich bin Thorn. Ja, ich hab Dornen \u2013 die brauche ich manchmal, um mich zu sch\u00FCtzen. Aber ich lerne, wann ich sie einziehen kann.\u201C',
    },
    {
      id: 'garden-npc-3',
      name: 'Honey',
      emoji: '\u{1F41D}',
      description: 'Die flei\u00DFige Biene',
      backstory: '\u201EBzzzz! Ich bin Honey. Zusammenarbeit ist meine St\u00E4rke. Alleine bin ich klein, aber zusammen k\u00F6nnen wir Gro\u00DFes schaffen!\u201C',
    },
    {
      id: 'garden-npc-4',
      name: 'Root',
      emoji: '\u{1F331}',
      description: 'Der Wurzelweise',
      backstory: '\u201EIch bin Root. Die wichtigsten Dinge sieht man nicht \u2013 sie liegen unter der Oberfl\u00E4che. Wahre Freundschaft braucht tiefe Wurzeln.\u201C',
    },
  ],
  night: [
    {
      id: 'night-npc-1',
      name: 'Luna',
      emoji: '\u{1F319}',
      description: 'Die Mondw\u00E4chterin',
      backstory: '\u201EIch bin Luna. In der Stille der Nacht h\u00F6rst du endlich, was dein Herz dir sagen will. Komm, wir h\u00F6ren zusammen hin.\u201C',
    },
    {
      id: 'night-npc-2',
      name: 'Pixel',
      emoji: '\u{1F4F1}',
      description: 'Der Bildschirmgeist',
      backstory: '\u201EYo, ich bin Pixel! Fr\u00FCher war ich s\u00FCchtig nach Likes und Screens. Dann hab ich gemerkt: Das echte Leben ist draussen. Wollen wir reden?\u201C',
    },
    {
      id: 'night-npc-3',
      name: 'Star',
      emoji: '\u2B50',
      description: 'Der Sternendeuter',
      backstory: '\u201EIch bin Star. Jeder Stern am Himmel leuchtet in seinem eigenen Tempo. Achtsamkeit bedeutet, den Moment zu genie\u00DFen, ohne ihn festzuhalten.\u201C',
    },
    {
      id: 'night-npc-4',
      name: 'Dream',
      emoji: '\u{1F4AD}',
      description: 'Die Traumweberin',
      backstory: '\u201EHallo, ich bin Dream. Tr\u00E4ume zeigen uns, was wir wirklich wollen. Manchmal muss man abschalten, um wieder klar zu sehen.\u201C',
    },
  ],
  rainbow: [
    {
      id: 'rainbow-npc-1',
      name: 'Prism',
      emoji: '\u{1F308}',
      description: 'Der Farbenwandler',
      backstory: '\u201EIch bin Prism! Jede Farbe ist sch\u00F6n, aber zusammen ergeben sie einen Regenbogen. Vielfalt macht die Welt bunt.\u201C',
    },
    {
      id: 'rainbow-npc-2',
      name: 'Mosaic',
      emoji: '\u{1F3A8}',
      description: 'Die Mosaik-K\u00FCnstlerin',
      backstory: '\u201EHey, ich bin Mosaic! Aus vielen verschiedenen St\u00FCcken entsteht das sch\u00F6nste Bild. Unterschiede sind kein Problem \u2013 sie sind die L\u00F6sung.\u201C',
    },
    {
      id: 'rainbow-npc-3',
      name: 'Voice',
      emoji: '\u{1F399}\uFE0F',
      description: 'Der Geschichtenerz\u00E4hler',
      backstory: '\u201EIch bin Voice. Jeder Mensch hat eine einzigartige Geschichte. Wenn wir zuh\u00F6ren statt urteilen, entsteht echtes Verst\u00E4ndnis.\u201C',
    },
    {
      id: 'rainbow-npc-4',
      name: 'Bridge',
      emoji: '\u{1F309}',
      description: 'Die Br\u00FCckenbauerin',
      backstory: '\u201EIch bin Bridge. Zwischen Menschen baue ich Br\u00FCcken statt Mauern. Willst du mir helfen, eine neue Verbindung zu schaffen?\u201C',
    },
  ],
  home: [
    {
      id: 'home-npc-1',
      name: 'Keeper',
      emoji: '\u{1F3E0}',
      description: 'Der Heimath\u00FCter',
      backstory: '\u201EWillkommen zur\u00FCck! Ich bin Keeper. Hier bringst du alles zusammen, was du auf deiner Reise gelernt hast. Bist du bereit?\u201C',
    },
    {
      id: 'home-npc-2',
      name: 'Mirror',
      emoji: '\u{1FA9E}',
      description: 'Der Spiegel der Wahrheit',
      backstory: '\u201EIch bin Mirror. Ich zeige dir, wer du wirklich bist \u2013 nicht perfekt, aber wunderbar. Schau genau hin!\u201C',
    },
    {
      id: 'home-npc-3',
      name: 'Compass',
      emoji: '\u{1F9ED}',
      description: 'Der Wegweiser',
      backstory: '\u201EIch bin Compass. Die Reise endet hier nicht \u2013 sie beginnt erst richtig. Was du gelernt hast, kannst du jetzt in deinem Alltag nutzen.\u201C',
    },
    {
      id: 'home-npc-4',
      name: 'Spark',
      emoji: '\u{1F31F}',
      description: 'Der Funke der Hoffnung',
      backstory: '\u201EIch bin Spark! Du tr\u00E4gst jetzt ein Licht in dir, das nie erlischt. Teile es mit anderen \u2013 die Welt braucht dein Leuchten.\u201C',
    },
  ],
};

// ---------------------------------------------------------------------------
// Aggregated data exports
// ---------------------------------------------------------------------------

export const allScenarios: Record<string, any[]> = {
  volcano: volcanoScenarios,
  ocean: oceanScenarios,
  forest: forestScenarios,
  mountain: mountainScenarios,
  garden: gardenScenarios,
  night: nightScenarios,
  rainbow: rainbowScenarios,
  home: homeScenarios,
};

export const allActivities: Record<string, any[]> = {
  volcano: volcanoActivities,
  ocean: oceanActivities,
  forest: forestActivities,
  mountain: mountainActivities,
  garden: gardenActivities,
  night: nightActivities,
  rainbow: rainbowActivities,
  home: homeActivities,
};

export const allWisdomCards: Record<string, any[]> = {
  volcano: volcanoWisdomCards,
  ocean: oceanWisdomCards,
  forest: forestWisdomCards,
  mountain: mountainWisdomCards,
  garden: gardenWisdomCards,
  night: nightWisdomCards,
  rainbow: rainbowWisdomCards,
  home: homeWisdomCards,
};

export const getIslandData = (islandId: string) => ({
  scenarios: allScenarios[islandId] || [],
  activities: allActivities[islandId] || [],
  wisdomCards: allWisdomCards[islandId] || [],
  npcs: allNPCs[islandId] || [],
});

export const getAllWisdomCards = () => {
  return Object.values(allWisdomCards).flat();
};
