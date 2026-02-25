// @ts-nocheck
import type { Companion, CompanionBackstory, CompanionReaction } from '../types';

// =============================================================================
// Companion-System – Tier-Begleiter mit Tiefgang
// =============================================================================
//
// Companions sind keine kosmetischen Begleiter. Sie sind emotionale Bezugsfiguren,
// die reagieren, kommentieren, und eine eigene Geschichte haben.
//
// Affektionslevel:
//   1: Folgt still (Standard)
//   2: Gibt Hinweise während Szenarien
//   3: Erzählt eigene Backstory (emotionaler Wendepunkt)
//   4: Spezial-Animationen freigeschaltet
//   5: Companion-spezifisches Finale-Element
// =============================================================================

export const companionTemplates: Omit<Companion, 'level' | 'evolutionStage'>[] = [
  {
    id: 'wolf',
    name: 'Lupo',
    type: 'wolf',
    trait: 'Mut & Stärke',
    description:
      'Lupo ist ein mutiger Wolf, der immer für seine Freunde einsteht. Er weiß, dass wahre Stärke nicht bedeutet, keine Angst zu haben – sondern trotzdem weiterzumachen.',
  },
  {
    id: 'owl',
    name: 'Sophia',
    type: 'owl',
    trait: 'Weisheit & Klarheit',
    description:
      'Sophia ist eine weise Eule, die gerne nachdenkt und kluge Lösungen findet. Sie weiß, dass es okay ist, sich Zeit zum Überlegen zu nehmen.',
  },
  {
    id: 'fox',
    name: 'Felix',
    type: 'fox',
    trait: 'Kreativität & Neugier',
    description:
      'Felix ist ein neugieriger Fuchs, der immer neue Wege entdeckt. Er weiß, dass jedes Problem eine kreative Lösung hat – man muss nur genau hinschauen.',
  },
  {
    id: 'turtle',
    name: 'Cleo',
    type: 'turtle',
    trait: 'Geduld & Ruhe',
    description:
      'Cleo ist eine geduldige Schildkröte, die sich nie hetzen lässt. Sie weiß, dass die besten Dinge Zeit brauchen und dass Pausen wichtig sind.',
  },
];

export const companionEmojis: Record<string, string> = {
  wolf: '🐺',
  owl: '🦉',
  fox: '🦊',
  turtle: '🐢',
};

// =============================================================================
// Companion-Backstories (freigeschaltet bei Affektionslevel 3)
// =============================================================================

export const companionBackstories: CompanionBackstory[] = [
  {
    type: 'wolf',
    story:
      '"Ich war einmal Teil eines Rudels. Ein großes, starkes Rudel. Wir jagten zusammen, ' +
      'schliefen zusammen, heulten zusammen den Mond an.\n\n' +
      'Aber ich war... anders. Die anderen Wölfe wollten immer nur kämpfen. Wer ist der Stärkste? ' +
      'Wer brüllt am lautesten? Wer hat am wenigsten Angst? Und ich? Ich hatte Angst. Oft sogar. ' +
      'Aber ich habe es versteckt, weil ein Wolf keine Angst zeigen darf.\n\n' +
      'Eines Tages hat ein Welpe aus dem Rudel geweint, weil er sich verlaufen hatte. ' +
      'Die anderen Wölfe sagten: \'Hör auf zu heulen. Ein Wolf weint nicht.\' ' +
      'Aber ich bin hingegangen und habe mich neben ihn gelegt. Einfach nur da sein.\n\n' +
      'Am nächsten Morgen wurde ich aus dem Rudel verstoßen. \'Zu weich\', sagten sie. ' +
      '\'Ein Wolf, der tröstet, ist kein richtiger Wolf.\'\n\n' +
      'Ich war lange allein. Und es hat wehgetan. Aber in dieser Zeit habe ich etwas gelernt: ' +
      'Stärke ist nicht, alleine klarzukommen. Stärke ist, Hilfe anzunehmen. ' +
      'Stärke ist, hinzugehen, wenn jemand weint. Stärke ist, Angst zuzugeben und trotzdem weiterzumachen.\n\n' +
      'Der Welpe von damals? Er hat mich später gefunden. Und jetzt sind wir ein Rudel. ' +
      'Ein kleines, ehrliches Rudel. Besser als hundert Wölfe, die nur so tun, als hätten sie keine Angst."',
    parallel:
      'Lupos Geschichte spiegelt das Thema aller Inseln: Emotionen zu zeigen wird oft als Schwäche gesehen. ' +
      'Aber wahre Stärke liegt in Verletzlichkeit, Ehrlichkeit und Verbindung – nicht in Härte.',
  },
  {
    type: 'owl',
    story:
      '"Ich galt immer als die Kluge. \'Sophia weiß alles\', sagten die anderen Tiere. ' +
      '\'Frag Sophia, die hat immer eine Antwort.\' Und ich? Ich habe mitgespielt. ' +
      'Ich habe so getan, als wüsste ich alles. Weil ich Angst hatte, was passiert, ' +
      'wenn ich sage: \'Ich weiß es nicht.\'\n\n' +
      'Dann kam der Tag, an dem ein junger Vogel zu mir kam. Er war traurig, ' +
      'weil seine Mutter weggeflogen war und nicht wiederkam. Er fragte: \'Sophia, kommt sie zurück?\' ' +
      'Und ich wusste es nicht. Ich wusste es wirklich nicht.\n\n' +
      'Aber statt das zu sagen, habe ich gelogen. \'Natürlich kommt sie zurück\', sagte ich. ' +
      'Weil ich dachte, das ist die kluge Antwort. Die, die er hören will. ' +
      'Seine Mutter kam nicht zurück. Und der Vogel hat mir nie wieder vertraut.\n\n' +
      'An dem Tag habe ich verstanden: Weisheit ist nicht, alles zu wissen. ' +
      'Weisheit ist, ehrlich zu sagen, was man nicht weiß. ' +
      'Weisheit ist, zuzuhören statt zu reden. ' +
      'Weisheit ist, \'Ich weiß es nicht, aber ich bin bei dir\' zu sagen, ' +
      'statt eine schöne Lüge zu erzählen.\n\n' +
      'Seitdem lüge ich nicht mehr. Auch wenn die Wahrheit wehtut. ' +
      'Weil eine ehrliche Antwort mehr wert ist als tausend kluge Worte."',
    parallel:
      'Sophias Geschichte zeigt: Der Druck, immer die Richtige Antwort zu haben, kann zu Unehrlichkeit führen. ' +
      'Wahre Weisheit ist Demut – zuzugeben, was man nicht weiß, und Raum für echte Gefühle zu lassen.',
  },
  {
    type: 'fox',
    story:
      '"Alle sagten: \'Felix ist so kreativ! Felix ist so neugierig! Felix findet immer eine Lösung!\' ' +
      'Und das stimmte. Ich hatte für alles eine Idee. Für alles einen Plan. Für alles einen Trick.\n\n' +
      'Das Problem war: Ich hatte für alles einen AUSWEG. Wenn etwas schwierig wurde – Ausrede. ' +
      'Wenn jemand mir zu nahe kam – Ablenkung. Wenn ich etwas fühlen sollte – Witz. ' +
      'Ich war der lustige Fuchs, der immer eine Pointe hatte. Und niemand hat gemerkt, ' +
      'dass hinter jedem Witz eine Frage steckte, die ich nicht stellen wollte: ' +
      '\'Mögt ihr mich auch, wenn ich nicht lustig bin?\'\n\n' +
      'Dann habe ich einen Freund verloren. Nicht weil er gegangen ist – ' +
      'sondern weil ich ihn so oft mit Witzen auf Abstand gehalten habe, ' +
      'dass er irgendwann aufgehört hat, mich wirklich zu kennen. ' +
      'Er hat gesagt: \'Felix, ich kenne dich seit Jahren, aber ich weiß nicht, wer du bist. ' +
      'Weil du nie echt bist.\'\n\n' +
      'Das hat wehgetan. Richtig wehgetan. Und zum ersten Mal habe ich keinen Witz gemacht. ' +
      'Zum ersten Mal habe ich einfach nur gesagt: \'Du hast recht. Und das macht mir Angst.\'\n\n' +
      'Neugier ist toll. Kreativität ist super. Aber sie dürfen kein Versteck sein. ' +
      'Manchmal muss man aufhören, clever zu sein, und einfach nur ehrlich."',
    parallel:
      'Felix zeigt ein häufiges Muster bei Jugendlichen: Humor und Cleverness als Abwehrmechanismus. ' +
      'Kreativität kann eine Flucht sein. Echte Verbindung erfordert, den Schutzschild abzulegen.',
  },
  {
    type: 'turtle',
    story:
      '"Ich ziehe mich in meinen Panzer zurück. Das weißt du. Alle wissen das über mich. ' +
      '\'Typisch Cleo – zieht sich zurück, wenn es schwierig wird.\'\n\n' +
      'Was sie nicht wissen: Mein Panzer war nicht immer da. Als ich klein war, hatte ich keinen. ' +
      'Ich war offen, verletzlich, zart. Und ich wurde verletzt. Oft. ' +
      'Kinder haben auf mir herumgetrampelt – wörtlich. ' +
      'Weil ich langsam war. Weil ich anders war. Weil ich nicht mithalten konnte.\n\n' +
      'Also habe ich mir einen Panzer gebaut. Schicht für Schicht. ' +
      'Jede Beleidigung ein neuer Ring. Jede Enttäuschung eine härtere Schale. ' +
      'Und irgendwann war ich sicher. Niemand konnte mir mehr wehtun.\n\n' +
      'Aber niemand konnte mir auch mehr nahe kommen. ' +
      'Mein Panzer hat mich geschützt – und gleichzeitig eingesperrt. ' +
      'Ich habe gemerkt: Geduld und Langsamkeit sind Stärken. ' +
      'Aber Rückzug als Dauerzustand ist ein Gefängnis.\n\n' +
      'Jetzt übe ich jeden Tag: Kopf rausstrecken. Nur ein bisschen. ' +
      'Nicht den ganzen Panzer ablegen – das wäre zu viel. ' +
      'Aber ein kleines Stück Verletzlichkeit zeigen. Jeden Tag ein kleines Stück mehr. ' +
      'Und weißt du was? Es wird leichter. Nicht einfach, aber leichter."',
    parallel:
      'Cleos Geschichte spiegelt das Garten-Thema: Mauern/Panzer als Schutzreaktion. ' +
      'Verletzlichkeit in sicheren Dosen wiederzuerlernen ist ein therapeutischer Kernprozess.',
  },
];

// =============================================================================
// Companion-Reaktionen (kontextabhängig)
// =============================================================================

export const companionReactions: Record<string, CompanionReaction> = {
  wolf: {
    goodChoice: [
      'Das war mutig. Echt mutig.',
      'So würde ich es auch machen – mit dem Herz voran.',
      'Du stehst für andere ein. Das macht dich stark.',
      'Genau richtig. Hinsehen statt wegsehen.',
      'Ich bin stolz auf dich. Wirklich.',
    ],
    wrongChoice: [
      'Hmm. Das hat sich nicht richtig angefühlt, oder?',
      'Wegsehen ist auch eine Entscheidung. Aber keine gute.',
      'Das war schwierig. Nächstes Mal versuchen wir es anders.',
      'Hey – Fehler passieren. Aufstehen ist, was zählt.',
    ],
    shadowEncounter: [
      'Ich spüre etwas... Dunkles. Aber nicht Böses. Etwas Trauriges.',
      'Hab keine Angst. Ich bin bei dir. Was auch immer da kommt.',
      'Diese Gestalt... sie erinnert mich an jemanden. An dich.',
    ],
    islandArrival: {
      volcano: 'Ich rieche... Asche. Hier brennt etwas – nicht nur der Vulkan.',
      ocean: 'Salz in der Luft. Und Trauer. Hier hat jemand viel geweint.',
      forest: 'Meine Nackenhaare stellen sich auf. Dieser Wald hat Angst.',
      mountain: 'Der Gipfel sieht weit weg aus. Aber wir schaffen das. Zusammen.',
      garden: 'Es riecht nach Blumen – aber auch nach etwas Verwelktem. Gebrochene Verbindungen.',
      night: 'So dunkel hier... aber die Dunkelheit ist nicht das Problem. Die Leere ist es.',
      rainbow: 'So viele Farben! Aber manche fehlen. Als hätte jemand sie versteckt.',
      home: 'Das fühlt sich vertraut an. Als wären wir endlich angekommen.',
    },
  },
  owl: {
    goodChoice: [
      'Klug. Wirklich klug. Nicht clever – klug. Das ist ein Unterschied.',
      'Du hast zugehört, bevor du gehandelt hast. Das können wenige.',
      'Hm, interessant. Du siehst tiefer als die meisten.',
      'Diese Entscheidung zeigt echte Weisheit.',
      'Nachdenken, bevor man handelt – das ist Stärke.',
    ],
    wrongChoice: [
      'Hm. Lass uns das nochmal durchdenken.',
      'Schnelle Antworten sind nicht immer die besten.',
      'Ich glaube, da steckt mehr dahinter, als du denkst.',
      'Kein Fehler ist verschwendet, wenn man daraus lernt.',
    ],
    shadowEncounter: [
      'Faszinierend... und beunruhigend. Diese Gestalt weiß Dinge über dich.',
      'Ich habe viel gesehen in meinem Leben. Aber das hier... das ist anders. Pass auf.',
      'Hör genau hin. Nicht alles, was sie sagt, ist falsch.',
    ],
    islandArrival: {
      volcano: 'Hitze vernebelt das Denken. Hier müssen wir mit kühlem Kopf vorgehen.',
      ocean: 'Das Meer birgt Geheimnisse in seiner Tiefe. Wie die Trauer.',
      forest: 'Stille kann laut sein. Dieser Wald schreit, ohne einen Ton.',
      mountain: 'Echos können lügen. Glaube nicht alles, was der Berg dir zuflüstert.',
      garden: 'Jede Blume erzählt eine Geschichte. Hör genau hin.',
      night: 'In der Dunkelheit sieht man am klarsten – wenn man die Augen öffnet.',
      rainbow: 'Vielfalt ist wie ein Prisma – sie bricht das Licht in alle Farben.',
      home: 'Hier endet unsere Reise. Aber das Wissen bleibt.',
    },
  },
  fox: {
    goodChoice: [
      'Ha! Damit hätte ich nicht gerechnet. Gut gemacht!',
      'Kreative Lösung! Du denkst um die Ecke.',
      'Das war clever – auf die gute Art.',
      'Du findest immer einen Weg. Gefällt mir!',
      'Manchmal ist die beste Antwort die, die niemand erwartet.',
    ],
    wrongChoice: [
      'Oops. Aber hey – aus Fehlern lernt man am meisten!',
      'Das war nicht ideal. Aber wir finden einen anderen Weg.',
      'Hmm, die Idee war nicht schlecht. Die Ausführung schon.',
      'Nächstes Mal überlegen wir zusammen, okay?',
    ],
    shadowEncounter: [
      'Whoa! Was ist DAS? Okay, okay, keine Panik... ich habe eine Idee. Nein, warte. Keine Idee.',
      'Diese Gestalt... ich kann sie nicht austricksen. Das ist neu. Und unheimlich.',
      'Ich glaube, hier hilft kein Trick. Nur Ehrlichkeit. Und das ist schwieriger.',
    ],
    islandArrival: {
      volcano: 'Heiß! Aber spannend. Hier gibt es bestimmt Geheimnisse unter der Lava.',
      ocean: 'Wasser, soweit das Auge reicht. Was liegt wohl darunter?',
      forest: 'Ein Labyrinth aus Bäumen! Mein Fuchsinstinkt kribbelt.',
      mountain: 'So hoch! Ob man von oben das ganze Spiel sehen kann?',
      garden: 'Blumen, Bienen, Schmetterlinge – und Dornen. Immer die Dornen.',
      night: 'Dunkel. Normalerweise bin ich nachts am besten. Aber hier ist es... anders.',
      rainbow: 'FARBEN! Überall! Das ist meine Insel! Oder... warte, was fehlt hier?',
      home: 'Wir sind da. Irgendwie fühlt es sich wie der Anfang an, nicht wie das Ende.',
    },
  },
  turtle: {
    goodChoice: [
      'Gut. Lass dir Zeit. Die richtige Entscheidung braucht keinen Applaus.',
      'Du hast geduldig zugehört. Das ist selten.',
      'Manchmal ist Nichtstun die mutigste Tat.',
      'Ruhig und bedacht. So meistert man schwierige Situationen.',
      'Du hast dir Zeit genommen. Das braucht mehr Mut, als die meisten denken.',
    ],
    wrongChoice: [
      'Hmm. Vielleicht zu schnell entschieden?',
      'Kein Drama. Atmen. Nochmal versuchen.',
      'Der Weg ist wichtiger als das Tempo. Auch Umwege zählen.',
      'Es ist okay. Fehler gehören zum Weg.',
    ],
    shadowEncounter: [
      '...Ich ziehe mich nicht zurück. Nicht diesmal. Wir stehen das zusammen durch.',
      'Diese Gestalt fühlt sich... vertraut an. Als hätte ich sie schon mal gesehen. In mir.',
      'Langsam. Nicht weglaufen. Anschauen. Atmen. Verstehen.',
    ],
    islandArrival: {
      volcano: 'So laut hier. Aber unter der Lava ist es bestimmt ganz still.',
      ocean: 'Wasser. Mein Element. Aber dieses Wasser fühlt sich schwer an.',
      forest: 'Dunkel und still. Ich kenne das – den Rückzug ins Innere.',
      mountain: 'Hoch. Aber wir müssen nicht rennen. Schritt für Schritt.',
      garden: 'Pflanzen brauchen Zeit. Wie Freundschaften. Wie Heilung.',
      night: 'Stille. Endlich. Aber... diese Stille ist anders. Zu still.',
      rainbow: 'Viele Farben. Viele Wege. Kein Grund zur Eile.',
      home: 'Zuhause. Endlich. Die längste Reise ist die nach innen.',
    },
  },
};

// =============================================================================
// Bestehende Funktionen (erweitert)
// =============================================================================

export const companionEncouragements: string[] = [
  'Du machst das toll!',
  'Ich bin stolz auf dich!',
  'Jeder Schritt zählt.',
  'Du bist stärker als du denkst.',
  'Zusammen schaffen wir das!',
  'Fehler sind Lernchancen.',
  'Deine Gefühle sind wichtig.',
  'Du bist einzigartig – und das ist super!',
  'Mut bedeutet, es trotzdem zu versuchen.',
  'Du bist nicht allein auf dieser Reise.',
  'Heute ist ein guter Tag zum Wachsen.',
  'Sei nett zu dir selbst!',
  'Kleine Schritte führen auch zum Ziel.',
  'Du darfst so fühlen, wie du fühlst.',
  'Hilfe holen ist eine Superkraft!',
];

export const getCompanionEmoji = (type: string): string => {
  return companionEmojis[type] || '🌟';
};

export const getRandomEncouragement = (): string => {
  return companionEncouragements[
    Math.floor(Math.random() * companionEncouragements.length)
  ];
};

/** Gibt die Backstory für einen Companion-Typ zurück */
export const getCompanionBackstory = (type: string): CompanionBackstory | undefined =>
  companionBackstories.find((b) => b.type === type);

/** Gibt eine kontextabhängige Reaktion zurück */
export const getCompanionReaction = (
  type: string,
  context: 'goodChoice' | 'wrongChoice' | 'shadowEncounter',
): string => {
  const reactions = companionReactions[type];
  if (!reactions) return '';
  const pool = reactions[context];
  return pool[Math.floor(Math.random() * pool.length)] || '';
};

/** Gibt den Insel-Ankunftskommentar zurück */
export const getIslandArrivalComment = (type: string, islandId: string): string => {
  const reactions = companionReactions[type];
  if (!reactions) return '';
  return reactions.islandArrival[islandId] || '';
};
