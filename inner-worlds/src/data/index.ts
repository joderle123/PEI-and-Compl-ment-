import { volcanoScenarios, volcanoActivities, volcanoWisdomCards } from './islands/volcano';
import { oceanScenarios, oceanActivities, oceanWisdomCards } from './islands/ocean';
import { forestScenarios, forestActivities, forestWisdomCards } from './islands/forest';
import { mountainScenarios, mountainActivities, mountainWisdomCards } from './islands/mountain';
import { gardenScenarios, gardenActivities, gardenWisdomCards } from './islands/garden';
import { nightScenarios, nightActivities, nightWisdomCards } from './islands/night';
import { rainbowScenarios, rainbowActivities, rainbowWisdomCards } from './islands/rainbow';
import { homeScenarios, homeActivities, homeWisdomCards } from './islands/home';

// Shadow Self & Companion systems
export { shadowEncounters, getShadowEncounter, getShadowProgress, getCurrentHumanization } from './shadowSelf';
export { companionBackstories, companionReactions, getCompanionBackstory, getCompanionReaction, getIslandArrivalComment } from './companions';
export { transferPrompts, getTransferPrompt } from './transferPrompts';

// ---------------------------------------------------------------------------
// NPC data for each island (4 NPCs per island, one per scenario)
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// NPCs: Echte Jugendliche mit echten Problemen
// Jeder NPC hat: einen konkreten Konflikt, ein Geheimnis (Szene 3-4),
// eine Verbindung zu einem NPC auf einer anderen Insel, und einen Moment,
// in dem er den Spieler um Hilfe bittet (Empowerment).
// ---------------------------------------------------------------------------

const allNPCs: Record<string, any[]> = {
  // =========================================================================
  // VULKAN - Wut & Emotionsregulation
  // =========================================================================
  volcano: [
    {
      id: 'volcano-npc-1',
      name: 'Kai',
      emoji: '😤',
      age: 13,
      description: 'Eltern trennen sich, Wut als Schutzschild',
      backstory: '"Hey. Ich bin Kai. Bevor du fragst: Ja, ich bin sauer. Nein, ich will nicht dar\u00FCber reden. Oder... doch. Vielleicht. Mein Vater ist vor zwei Wochen ausgezogen. Ich hab gestern meinen besten Freund Liam angeschrien, weil er einen dummen Witz gemacht hat. Jetzt redet er nicht mehr mit mir."',
      secret: 'Kais Vater schreit auch immer. Kai hat panische Angst, wie sein Vater zu werden.',
      connection: { npcId: 'garden-npc-1', npcName: 'Liam', island: 'garden', relation: 'Kais bester Freund, den er angeschrien hat' },
    },
    {
      id: 'volcano-npc-2',
      name: 'Zara',
      emoji: '💢',
      age: 14,
      description: 'Mobbing-Opfer, das zur\u00FCckschl\u00E4gt',
      backstory: '"Ich bin Zara. Letzte Woche hab ich einem Jungen in der Schule eine geknallt. Alle sagen, ICH bin das Problem. Aber niemand fragt, warum ich zugeschlagen habe. Seit Monaten macht er sich \u00FCber mein Kopftuch lustig. Jeden. Einzelnen. Tag."',
      secret: 'Zara hat sich an niemanden gewandt, weil sie Angst hat, als Petze zu gelten. Sie tr\u00E4gt die Wut allein.',
      connection: { npcId: 'rainbow-npc-2', npcName: 'Noah', island: 'rainbow', relation: 'Noah hat die Situation in der Schule miterlebt und nichts gesagt' },
    },
    {
      id: 'volcano-npc-3',
      name: 'Ash',
      emoji: '😡',
      age: 14,
      description: 'Wut als Sekund\u00E4remotion \u00FCber Elterntrennung',
      backstory: '"Ich bin Ash. Fr\u00FCher dachte ich, ich bin einfach ein w\u00FCtender Mensch. Dass das halt so ist. Dass ich kaputt bin. Aber dann hab ich verstanden: Unter meiner Wut steckt was anderes. Was Weicheres. Und das macht mir mehr Angst als die Wut selbst."',
      secret: 'Ash hat seit der Trennung seiner Eltern nicht geweint. Nicht ein einziges Mal. Er h\u00E4lt alles zur\u00FCck.',
      connection: { npcId: 'ocean-npc-1', npcName: 'Marina', island: 'ocean', relation: 'Marina hat \u00E4hnlichen Verlust erlebt und versteht Ashs unterdr\u00FCckte Trauer' },
    },
    {
      id: 'volcano-npc-4',
      name: 'Milo',
      emoji: '🔥',
      age: 12,
      description: 'Wird gemobbt und traut sich nicht, sich zu wehren',
      backstory: '"Ich bin Milo. Ich werde so schnell w\u00FCtend, dass ich Angst vor mir selbst habe. Letztens hab ich mein Handy gegen die Wand geworfen. Dabei wollte ich eigentlich gegen die Wand schlagen. Was ist, wenn ich n\u00E4chstes Mal jemanden verletze?"',
      secret: 'Milos \u00E4lterer Bruder schl\u00E4gt ihn zuhause. Die Wutausbr\u00FCche sind ein Hilferuf, den niemand h\u00F6rt.',
      connection: { npcId: 'forest-npc-3', npcName: 'Elif', island: 'forest', relation: 'Elif ist Milos Klassenkameradin und merkt, dass etwas nicht stimmt' },
    },
  ],

  // =========================================================================
  // OZEAN - Trauer & Verlust
  // =========================================================================
  ocean: [
    {
      id: 'ocean-npc-1',
      name: 'Marina',
      emoji: '😢',
      age: 13,
      description: 'Oma gestorben, erste Erfahrung mit Tod',
      backstory: '"Ich bin Marina. Meine Oma ist vor drei Monaten gestorben. Alle sagen, es wird besser mit der Zeit. Aber es wird nicht besser. Es wird nur... anders. Manche Tage vergesse ich es fast. Und dann trifft es mich pl\u00F6tzlich wie eine Welle."',
      secret: 'Marina hat sich nicht von ihrer Oma verabschiedet. Sie war an dem Tag bei einer Freundin und hat nicht ans Telefon gegangen. Die Schuld frisst sie auf.',
      connection: { npcId: 'volcano-npc-3', npcName: 'Ash', island: 'volcano', relation: 'Ash versteht, was es hei\u00DFt, Gef\u00FChle zu unterdr\u00FCcken' },
    },
    {
      id: 'ocean-npc-2',
      name: 'Jonas',
      emoji: '😶',
      age: 14,
      description: 'Bester Freund ist weggezogen',
      backstory: '"Ich hei\u00DFe Jonas. Mein bester Freund Luis ist nach Berlin gezogen. Alle sagen, wir k\u00F6nnen ja videotelefonieren. Aber das ist nicht dasselbe. Es gibt niemanden mehr, mit dem ich in der Pause rumh\u00E4nge. Und ich wei\u00DF nicht, wie man neue Freunde findet."',
      secret: 'Jonas hat Luis noch nie gesagt, wie wichtig er ihm ist. Jetzt bereut er jedes unausgesprochene Wort.',
      connection: { npcId: 'garden-npc-3', npcName: 'Sophie', island: 'garden', relation: 'Sophie hat versucht, mit Jonas befreundet zu werden, aber er hat sie abgewiesen' },
    },
    {
      id: 'ocean-npc-3',
      name: 'Nour',
      emoji: '💧',
      age: 13,
      description: 'Hund eingeschl\u00E4fert, Eltern nehmen Trauer nicht ernst',
      backstory: '"Ich bin Nour. Mein Hund Balu musste eingeschl\u00E4fert werden. Er war 12 Jahre alt \u2013 so alt wie ich. Meine Eltern sagen: Es war nur ein Hund. Nur ein Hund? Er war mein bester Freund. Der Einzige, der nie genervt war, wenn ich traurig war."',
      secret: 'Nour redet nachts mit Balus leerem K\u00F6rbchen. Sie hat Angst, dass sie verr\u00FCckt wird.',
      connection: { npcId: 'night-npc-2', npcName: 'Ben', island: 'night', relation: 'Ben hat Nour online kennengelernt und ist der Einzige, der ihre Trauer ernst nimmt' },
    },
    {
      id: 'ocean-npc-4',
      name: 'Theo',
      emoji: '🌊',
      age: 14,
      description: 'Eltern gehen durch Scheidung, Vater zieht weg',
      backstory: '"Ich bin Theo. Meine Eltern trennen sich. Mein Vater zieht n\u00E4chsten Monat in eine andere Stadt. Alle fragen, wie es mir geht. Ich sage immer: Gut. Weil ich nicht wei\u00DF, wie ich das beschreiben soll. Es f\u00FChlt sich an, als w\u00FCrde jemand meinen Boden wegziehen."',
      secret: 'Theo gibt sich die Schuld an der Trennung. Er hat einmal geh\u00F6rt, wie seine Eltern \u00FCber ihn gestritten haben.',
      connection: { npcId: 'mountain-npc-1', npcName: 'Lena', island: 'mountain', relation: 'Lena k\u00E4mpft wie Theo mit Selbstvorw\u00FCrfen und Schuldgef\u00FChlen' },
    },
  ],

  // =========================================================================
  // WALD - Angst & Mut
  // =========================================================================
  forest: [
    {
      id: 'forest-npc-1',
      name: 'Yuki',
      emoji: '😰',
      age: 14,
      description: 'Soziale Angst, kann nicht vor der Klasse sprechen',
      backstory: '"Ich bin Yuki. N\u00E4chste Woche muss ich ein Referat halten. Allein bei dem Gedanken wird mir schlecht. Mein Herz rast, meine H\u00E4nde schwitzen, mein Kopf wird leer. Alle werden mich auslachen. Ich wei\u00DF es einfach."',
      secret: 'Yuki hatte letztes Jahr eine Panikattacke vor der Klasse. Seitdem vermeidet sie jede Situation, in der sie im Mittelpunkt steht.',
      connection: { npcId: 'mountain-npc-3', npcName: 'Emma', island: 'mountain', relation: 'Emma hat Yuki damals in der Panikattacke geholfen, aber sie haben sich entfremdet' },
    },
    {
      id: 'forest-npc-2',
      name: 'Tim',
      emoji: '😟',
      age: 12,
      description: 'Neue Schule, Angst vor dem Unbekannten',
      backstory: '"Ich bin Tim. Wir sind umgezogen und ich bin seit zwei Wochen an einer neuen Schule. Ich kenne niemanden. In der Pause stehe ich allein am Rand und tue so, als w\u00FCrde ich auf meinem Handy tippen. Dabei schreibe ich niemandem. Ich hab einfach... Angst."',
      secret: 'Tim wurde an seiner alten Schule gemobbt. Der Umzug war eigentlich eine Flucht. Aber die Angst ist mitgekommen.',
      connection: { npcId: 'rainbow-npc-1', npcName: 'Amir', island: 'rainbow', relation: 'Amir war selbst mal der Neue und h\u00E4tte Tim helfen k\u00F6nnen' },
    },
    {
      id: 'forest-npc-3',
      name: 'Elif',
      emoji: '😨',
      age: 13,
      description: 'Angst, Fehler zu machen (Perfektionismus)',
      backstory: '"Ich hei\u00DFe Elif. Ich bin die Beste in der Klasse. Immer. In allem. Und ich HASSE es. Weil jedes Mal, wenn ich keine Eins bekomme, f\u00FChlt es sich an wie eine Katastrophe. Meine Eltern sagen, sie sind immer stolz. Aber ich sehe ihre Gesichter, wenn ich eine Zwei nach Hause bringe."',
      secret: 'Elif hat angefangen, sich die Fingern\u00E4gel bis aufs Blut abzuknibbeln. Niemand hat es bemerkt. Sie versteckt ihre H\u00E4nde.',
      connection: { npcId: 'volcano-npc-4', npcName: 'Milo', island: 'volcano', relation: 'Elif sitzt neben Milo in der Klasse und bemerkt seine blauen Flecken' },
    },
    {
      id: 'forest-npc-4',
      name: 'Luis',
      emoji: '😣',
      age: 14,
      description: 'Angst vor Ablehnung beim Coming-out',
      backstory: '"Ich bin Luis. Ich hab ein Geheimnis, das mich auffrisst. Ich mag Jungs. Das wei\u00DF niemand. Nicht meine Eltern, nicht meine Freunde, niemand. Jedes Mal, wenn jemand schwul als Schimpfwort benutzt, stirbt ein kleines St\u00FCck von mir."',
      secret: 'Luis hat seinem besten Freund Jonas (Ozean) nie gesagt, warum er sich distanziert hat. Es ist nicht, weil er ihn nicht mag. Es ist, weil er ihn zu sehr mag.',
      connection: { npcId: 'ocean-npc-2', npcName: 'Jonas', island: 'ocean', relation: 'Jonas denkt, Luis hat sich von ihm distanziert, weil er weggezogen ist. Der wahre Grund ist ein anderer.' },
    },
  ],

  // =========================================================================
  // BERG - Selbstwert & Identit\u00E4t
  // =========================================================================
  mountain: [
    {
      id: 'mountain-npc-1',
      name: 'Lena',
      emoji: '😔',
      age: 13,
      description: 'K\u00F6rperbildprobleme, Social-Media-Vergleich',
      backstory: '"Ich bin Lena. Ich hasse meinen K\u00F6rper. Auf Instagram sehen alle perfekt aus. Und ich? Ich sehe... so aus. Gestern hab ich drei Stunden vor dem Spiegel gestanden und nur Fehler gesehen."',
      secret: 'Lena hat angefangen, Mahlzeiten auszulassen. Erst das Fr\u00FChst\u00FCck, dann das Mittagessen. Sie sagt, sie hat keinen Hunger. Aber die Wahrheit ist: Sie bestraft sich.',
      connection: { npcId: 'ocean-npc-4', npcName: 'Theo', island: 'ocean', relation: 'Theo und Lena chatten online. Er ist der Einzige, dem sie sich anvertraut.' },
    },
    {
      id: 'mountain-npc-2',
      name: 'David',
      emoji: '😤',
      age: 14,
      description: 'Leistungsdruck von den Eltern',
      backstory: '"Ich bin David. Mein Vater sagt: Nur die Besten schaffen es. Meine Mutter sagt: Wir wollen doch nur das Beste f\u00FCr dich. Aber was, wenn ihr Bestes nicht MEIN Bestes ist? Was, wenn ich nicht Arzt werden will? Was, wenn ich einfach nur... normal sein will?"',
      secret: 'David hat letzte Woche eine Klausur absichtlich verhauen. Nicht weil er es nicht konnte. Sondern um zu sehen, ob seine Eltern ihn auch lieben, wenn er nicht perfekt ist. Sie haben ihn eine Woche lang kaum angeschaut.',
      connection: { npcId: 'forest-npc-3', npcName: 'Elif', island: 'forest', relation: 'Elif und David vergleichen sich st\u00E4ndig. Sie merken nicht, dass sie beide unter dem gleichen Druck leiden.' },
    },
    {
      id: 'mountain-npc-3',
      name: 'Emma',
      emoji: '🥺',
      age: 13,
      description: 'F\u00FChlt sich unsichtbar, People-Pleaser',
      backstory: '"Ich bin Emma. Ich bin die Nette. Immer. F\u00FCr alle. Ich sage nie Nein. Wenn jemand traurig ist, tr\u00F6ste ich. Wenn jemand Hilfe braucht, helfe ich. Und wenn ICH traurig bin? Dann merkt es niemand. Weil ich immer l\u00E4chle."',
      secret: 'Emma hat das Gef\u00FChl, dass sie nur gemocht wird, wenn sie etwas f\u00FCr andere tut. Sie hat panische Angst davor, was passiert, wenn sie einmal Nein sagt.',
      connection: { npcId: 'forest-npc-1', npcName: 'Yuki', island: 'forest', relation: 'Emma hat Yuki bei der Panikattacke geholfen. Aber niemand hat gefragt, wie es Emma danach ging.' },
    },
    {
      id: 'mountain-npc-4',
      name: 'Sam',
      emoji: '😐',
      age: 14,
      description: 'Gender-Identit\u00E4t, f\u00FChlt sich in keiner Schublade zuhause',
      backstory: '"Ich bin Sam. Nicht Samuel, nicht Samantha. Einfach Sam. Ich wei\u00DF nicht, ob ich ein Junge bin oder ein M\u00E4dchen. Manchmal f\u00FChle ich mich wie beides. Manchmal wie keins. Ist das komisch? Alle anderen scheinen so sicher zu sein."',
      secret: 'Sam hat sich einen neuen Namen ausgesucht, traut sich aber nicht, ihn jemandem zu sagen. Der alte Name f\u00FChlt sich an wie ein Kost\u00FCm, das nicht passt.',
      connection: { npcId: 'rainbow-npc-3', npcName: 'Mia', island: 'rainbow', relation: 'Mia hat Sam als Erste mit dem gew\u00E4hlten Namen angesprochen. Es war der erste Moment, in dem Sam sich gesehen f\u00FChlte.' },
    },
  ],

  // =========================================================================
  // GARTEN - Empathie & Beziehungen
  // =========================================================================
  garden: [
    {
      id: 'garden-npc-1',
      name: 'Liam',
      emoji: '😕',
      age: 13,
      description: 'Freundschaft zerbrochen, wei\u00DF nicht warum',
      backstory: '"Ich bin Liam. Mein bester Freund Kai hat mich letzte Woche angeschrien. Einfach so. Wegen nichts. Seitdem rede ich nicht mehr mit ihm. Ich bin w\u00FCtend und traurig gleichzeitig. Wir kennen uns seit der Grundschule."',
      secret: 'Liam wei\u00DF nicht, dass Kais Eltern sich trennen. Er denkt, Kai hasst ihn. Aber er vermisst ihn so sehr, dass er jeden Abend fast eine Nachricht schreibt und sie dann l\u00F6scht.',
      connection: { npcId: 'volcano-npc-1', npcName: 'Kai', island: 'volcano', relation: 'Kai hat Liam angeschrien, weil seine Wut \u00FCber die Elterntrennung \u00FCbergekocht ist' },
    },
    {
      id: 'garden-npc-2',
      name: 'Hanna',
      emoji: '😣',
      age: 14,
      description: 'Toxische Freundschaft, kann sich nicht l\u00F6sen',
      backstory: '"Ich bin Hanna. Meine beste Freundin Jule kontrolliert mich. Sie bestimmt, mit wem ich rede, was ich anziehe, welche Musik ich h\u00F6re. Wenn ich was ohne sie mache, wird sie sauer und ignoriert mich tagelang. Alle sagen: Dann lass sie doch. Aber so einfach ist das nicht."',
      secret: 'Hanna hat Angst, ohne Jule niemanden zu haben. Jule hat daf\u00FCr gesorgt, dass Hanna keine anderen Freundinnen mehr hat.',
      connection: { npcId: 'night-npc-3', npcName: 'Jule', island: 'night', relation: 'Jule ist auf der Nacht-Insel. Dort lernt man, warum Jule so kontrollierend ist: Sie hat panische Angst, verlassen zu werden.' },
    },
    {
      id: 'garden-npc-3',
      name: 'Sophie',
      emoji: '😊',
      age: 13,
      description: 'Will helfen, aber grenzt sich nicht ab',
      backstory: '"Ich bin Sophie. Ich versuche immer, alle gl\u00FCcklich zu machen. Wenn jemand traurig ist, nehme ich seinen Schmerz auf mich. Das Problem? Jetzt bin ICH traurig. Und voller Schmerz, der mir gar nicht geh\u00F6rt."',
      secret: 'Sophie hat Jonas (Ozean) Freundschaft angeboten, aber er hat sie abgewiesen. Seitdem fragt sie sich: Bin ich zu viel?',
      connection: { npcId: 'ocean-npc-2', npcName: 'Jonas', island: 'ocean', relation: 'Jonas hat Sophie abgewiesen, nicht weil sie nervig ist, sondern weil er Angst vor neuer N\u00E4he hat' },
    },
    {
      id: 'garden-npc-4',
      name: 'Tom',
      emoji: '😬',
      age: 14,
      description: 'Hat einen Freund verraten und bereut es',
      backstory: '"Ich bin Tom. Ich hab was Schlimmes gemacht. Ein Freund hat mir ein Geheimnis anvertraut, und ich hab es weitergesagt. Nicht b\u00F6sartig \u2013 ich dachte, es ist nicht so wichtig. Aber f\u00FCr ihn war es alles. Jetzt redet er nicht mehr mit mir."',
      secret: 'Der Freund, den Tom verraten hat, ist Luis (Wald). Tom hat erz\u00E4hlt, dass Luis Jungs mag. Er bereut es zutiefst, aber er wei\u00DF nicht, wie man so etwas wiedergutmacht.',
      connection: { npcId: 'forest-npc-4', npcName: 'Luis', island: 'forest', relation: 'Tom hat Luis\' Geheimnis verraten. Luis vertraut niemandem mehr.' },
    },
  ],

  // =========================================================================
  // NACHT - Achtsamkeit & Digitale Balance
  // =========================================================================
  night: [
    {
      id: 'night-npc-1',
      name: 'Yuki',
      emoji: '📱',
      age: 14,
      description: 'Kann nicht schlafen, scrollt bis 3 Uhr morgens',
      backstory: '"Ich bin Yuki. Ja, dieselbe Yuki, die sich vor Referaten f\u00FCrchtet. Aber nachts hab ich ein anderes Problem: Ich kann nicht aufh\u00F6ren zu scrollen. TikTok, Insta, YouTube. Um 3 Uhr morgens bin ich immer noch wach und f\u00FChle mich leer. Am n\u00E4chsten Tag bin ich wie ein Zombie."',
      secret: 'Yuki scrollt nachts, weil sie Angst vor der Stille hat. In der Stille kommen die Gedanken. Und die Gedanken sagen Dinge, die sie nicht h\u00F6ren will.',
      connection: { npcId: 'forest-npc-1', npcName: 'Yuki', island: 'forest', relation: 'Dieselbe Yuki \u2013 ihre Angst f\u00FChrt zu Schlaflosigkeit, die zu digitalem Konsum f\u00FChrt' },
    },
    {
      id: 'night-npc-2',
      name: 'Ben',
      emoji: '🎮',
      age: 13,
      description: 'Gaming-Sucht, flieht vor dem Alltag',
      backstory: '"Ich bin Ben. Ich zocke. Viel. Meine Eltern sagen: Zu viel. Aber in der realen Welt bin ich niemand. Im Spiel bin ich ein Held. In der realen Welt h\u00F6rt mir keiner zu. Im Spiel h\u00F6ren sie zu."',
      secret: 'Bens Eltern streiten jede Nacht. Er setzt die Kopfh\u00F6rer auf, um es nicht zu h\u00F6ren. Das Gaming ist keine Sucht \u2013 es ist \u00DCberleben.',
      connection: { npcId: 'ocean-npc-3', npcName: 'Nour', island: 'ocean', relation: 'Ben hat Nour in einem Online-Spiel kennengelernt und ist der Einzige, mit dem sie \u00FCber Balu redet' },
    },
    {
      id: 'night-npc-3',
      name: 'Jule',
      emoji: '😰',
      age: 14,
      description: 'Kontrollierend aus Verlustangst',
      backstory: '"Ich bin Jule. Alle sagen, ich bin zu kontrollierend. Dass ich Hanna ersticke. Aber sie verstehen nicht: Wenn ich loslasse, gehen die Leute. Das war schon immer so. Meine Mutter. Mein Vater. Jede Freundin, die ich je hatte. Wenn ich Hanna nicht festhalte, verliere ich auch sie."',
      secret: 'Jules Mutter hat die Familie verlassen, als Jule 8 war. Ohne Erkl\u00E4rung, ohne Abschied. Seitdem klammert Jule an jeder Beziehung.',
      connection: { npcId: 'garden-npc-2', npcName: 'Hanna', island: 'garden', relation: 'Jule kontrolliert Hanna nicht aus B\u00F6sartigkeit, sondern aus panischer Verlustangst' },
    },
    {
      id: 'night-npc-4',
      name: 'Alina',
      emoji: '😶',
      age: 13,
      description: 'Gedankenkarussell, kann nicht abschalten',
      backstory: '"Ich bin Alina. Mein Kopf h\u00F6rt nie auf. Nie. Auch jetzt gerade nicht. Er sagt: Was, wenn du etwas Falsches sagst? Was, wenn sie dich nicht m\u00F6gen? Was, wenn morgen was Schlimmes passiert? Es ist wie ein Radio, das man nicht ausschalten kann."',
      secret: 'Alina z\u00E4hlt. Alles. Stufen, Atemz\u00FCge, Buchstaben in S\u00E4tzen. Es ist ihr Versuch, die unkontrollierbaren Gedanken zu kontrollieren. Sie hat niemandem davon erz\u00E4hlt.',
      connection: { npcId: 'mountain-npc-3', npcName: 'Emma', island: 'mountain', relation: 'Alina und Emma sind sich \u00E4hnlich: Beide versuchen, alles unter Kontrolle zu halten. Emma durch Nettsein, Alina durch Z\u00E4hlen.' },
    },
  ],

  // =========================================================================
  // REGENBOGEN - Vielfalt & Inklusion
  // =========================================================================
  rainbow: [
    {
      id: 'rainbow-npc-1',
      name: 'Amir',
      emoji: '🤔',
      age: 13,
      description: 'Zwischen zwei Kulturen, geh\u00F6rt nirgends richtig dazu',
      backstory: '"Ich bin Amir. Zu Hause bin ich zu deutsch. In der Schule bin ich zu arabisch. Mein Vater sagt, ich vergesse meine Wurzeln. Meine Mitsch\u00FCler sagen: Wo kommst du WIRKLICH her? Ich bin von HIER. Aber das reicht anscheinend nicht."',
      secret: 'Amir hat aufgeh\u00F6rt, arabisches Essen mit in die Schule zu nehmen, weil ein Mitsch\u00FCler gesagt hat, es stinkt. Er sch\u00E4mt sich f\u00FCr etwas, das er eigentlich liebt.',
      connection: { npcId: 'forest-npc-2', npcName: 'Tim', island: 'forest', relation: 'Amir war selbst mal der Neue. Er h\u00E4tte Tim helfen k\u00F6nnen, aber er hatte Angst, selbst wieder aufzufallen.' },
    },
    {
      id: 'rainbow-npc-2',
      name: 'Noah',
      emoji: '😣',
      age: 14,
      description: 'Bystander bei Mobbing, Gewissensbisse',
      backstory: '"Ich bin Noah. Ich bin kein Mobber. Ich bin der, der daneben steht und nichts sagt. Zara \u2013 ein M\u00E4dchen aus meiner Klasse \u2013 wird wegen ihres Kopftuchs fertiggemacht. Ich finde es falsch. Aber ich sage nichts. Weil ich Angst habe, dass sie dann MICH fertigmachen."',
      secret: 'Noahs \u00E4lterer Bruder ist offen rassistisch. Noah wei\u00DF, dass es falsch ist, aber er traut sich nicht, seinem eigenen Bruder zu widersprechen.',
      connection: { npcId: 'volcano-npc-2', npcName: 'Zara', island: 'volcano', relation: 'Noah hat zugesehen, wie Zara gemobbt wurde. Sein Schweigen hat sie genauso verletzt wie die Beleidigungen.' },
    },
    {
      id: 'rainbow-npc-3',
      name: 'Mia',
      emoji: '🌈',
      age: 13,
      description: 'LGBTQ+-Ally, wird daf\u00FCr ausgelacht',
      backstory: '"Ich bin Mia. Mein Freund Sam hat mir erz\u00E4hlt, dass er sich weder als Junge noch als M\u00E4dchen f\u00FChlt. Ich hab gesagt: Cool, dann bist du halt Sam. Seitdem nennen mich manche Leute in der Schule komisch. Weil ich Sam verteidige."',
      secret: 'Mia hat selbst Fragen \u00FCber ihre Identit\u00E4t. Aber sie stellt ihre eigene Reise zur\u00FCck, um f\u00FCr Sam stark zu sein.',
      connection: { npcId: 'mountain-npc-4', npcName: 'Sam', island: 'mountain', relation: 'Mia hat Sam als Erste mit dem gew\u00E4hlten Namen angesprochen' },
    },
    {
      id: 'rainbow-npc-4',
      name: 'Leyla',
      emoji: '💪',
      age: 14,
      description: 'Hat eine Behinderung, will nicht auf sie reduziert werden',
      backstory: '"Ich bin Leyla. Ich sitze im Rollstuhl. Und nein, ich bin nicht traurig dar\u00FCber. Ich bin sauer. Nicht wegen dem Rollstuhl \u2013 der ist okay. Sondern weil alle mich NUR als das M\u00E4dchen im Rollstuhl sehen. Meine Noten? Egal. Mein Humor? Egal. Mein Traum, Journalistin zu werden? Egal. Ich bin das M\u00E4dchen im Rollstuhl. Punkt."',
      secret: 'Leyla lehnt jede Hilfe ab, auch wenn sie sie braucht. Weil sie denkt: Hilfe annehmen = schw\u00E4cher sein.',
      connection: { npcId: 'mountain-npc-2', npcName: 'David', island: 'mountain', relation: 'David und Leyla sind Nachbarn. Er sieht den Rollstuhl nicht, er sieht Leyla. Und Leyla sieht in David den Einzigen, der sie nicht auf ihre Behinderung reduziert.' },
    },
  ],

  // =========================================================================
  // ZUHAUSE - Integration & Transfer
  // =========================================================================
  home: [
    {
      id: 'home-npc-1',
      name: 'Kai & Liam',
      emoji: '🤝',
      age: 13,
      description: 'Die Vers\u00F6hnung \u2013 Wut und Empathie vereint',
      backstory: '"Wir sind Kai und Liam. Erinnerst du dich an uns? Kai vom Vulkan und Liam aus dem Garten. Wir haben geredet. Richtig geredet. Es war hart. Aber es hat sich gelohnt."',
      secret: 'Kai hat Liam einen Brief geschrieben \u2013 den Brief, den der Spieler ihm auf dem Vulkan geholfen hat zu formulieren. Liam hat geweint, als er ihn gelesen hat.',
      connection: { npcId: 'volcano-npc-1', npcName: 'Kai', island: 'volcano', relation: 'Die Geschichte, die auf dem Vulkan begann, findet hier ihr Ende' },
    },
    {
      id: 'home-npc-2',
      name: 'Luis & Tom',
      emoji: '💬',
      age: 14,
      description: 'Vergebung und zweite Chancen',
      backstory: '"Wir sind Luis und Tom. Tom hat mein gr\u00F6\u00DFtes Geheimnis verraten. Ich dachte, ich k\u00F6nnte ihm nie vergeben. Aber hier habe ich gelernt: Vergeben hei\u00DFt nicht, dass es okay war. Es hei\u00DFt, dass ich mich entscheide, die Last nicht mehr zu tragen."',
      secret: 'Tom hat sich \u00F6ffentlich vor der Klasse bei Luis entschuldigt. Es war der mutigste Moment seines Lebens.',
      connection: { npcId: 'forest-npc-4', npcName: 'Luis', island: 'forest', relation: 'Die Geschichte von Verrat und Vergebung, die auf dem Wald und im Garten spielte' },
    },
    {
      id: 'home-npc-3',
      name: 'Zara & Noah',
      emoji: '✊',
      age: 14,
      description: 'Vom Bystander zum Ally',
      backstory: '"Ich bin Noah. Und ich habe mich ver\u00E4ndert. Als Zara das n\u00E4chste Mal beleidigt wurde, bin ich aufgestanden. Meine Stimme hat gezittert. Aber ich habe gesagt: Das ist nicht okay. Und wisst ihr was? Drei andere sind auch aufgestanden."',
      secret: 'Noah hat auch seinem Bruder widersprochen. Es gab Streit. Aber Noah schl\u00E4ft besser seitdem.',
      connection: { npcId: 'rainbow-npc-2', npcName: 'Noah', island: 'rainbow', relation: 'Noahs Transformation vom schweigenden Zuschauer zum aktiven Verb\u00FCndeten' },
    },
    {
      id: 'home-npc-4',
      name: 'Alle NPCs',
      emoji: '🌟',
      age: null,
      description: 'Die gro\u00DFe Zusammenkunft',
      backstory: '"Wir alle haben etwas gemeinsam: Wir haben uns getraut, hinzuschauen. Auf unsere Wut, unsere Trauer, unsere Angst, unsere Zweifel. Und wir haben verstanden: Diese Gef\u00FChle machen uns nicht kaputt. Sie machen uns menschlich."',
      secret: 'Jeder einzelne NPC hat eine Nachricht f\u00FCr den Spieler: Danke, dass du zugehh\u00F6rt hast.',
      connection: null,
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
