// =============================================================================
// Berginsel (Mountain Island) – Selbstwert & Identität
// Inner Worlds – Social-Emotional Learning Game
//
// Alle Texte auf Deutsch, warmherzig und auf Augenhöhe für 10–15-Jährige.
// Therapeutisch fundiert: Selbstmitgefühl, kognitive Umstrukturierung,
// Stärkenorientierung, Umgang mit Vergleichen und innerem Kritiker.
// =============================================================================

import type { Scenario, WisdomCard, Activity } from '../../../types';

// -----------------------------------------------------------------------------
// Local Types (extensions not yet in the shared type file)
// -----------------------------------------------------------------------------

/** Activity with step-by-step instructions */
export interface MountainActivity extends Activity {
  instructions: string[];
}

/** Non-player character living on the island */
export interface NPC {
  id: string;
  name: string;
  emoji: string;
  description: string;
  backstory: string;
}

// =============================================================================
// 1. SCENARIOS
// =============================================================================

export const mountainScenarios: Scenario[] = [
  // ---------------------------------------------------------------------------
  // Scenario 1 – Alle sind besser als ich
  // ---------------------------------------------------------------------------
  {
    id: 'mountain-scenario-1',
    islandId: 'mountain' as const,
    title: 'Alle sind besser als ich',
    description:
      'In der Schule hast du das Gefühl, dass alle anderen klüger, cooler oder beliebter sind als du. Der Vergleich drückt dich runter – aber stimmt das wirklich?',
    scenes: [
      {
        id: 'mt1-s1-intro',
        text: 'Montagmorgen, zweite Stunde, Deutsch. Frau Baumann gibt die Aufsätze zurück. Du schaust dich in der Klasse um: Lara strahlt, weil sie eine Eins hat. Tom neben dir hat eine Zwei. Sogar Ben, der eigentlich nie was macht, hat eine bessere Note als du.',
        speaker: 'Erzähler',
        speakerEmoji: '🏔️',
        choices: [],
      },
      {
        id: 'mt1-s1-grade',
        text: 'Dein Blatt liegt vor dir: eine Drei minus. Nicht schlecht – aber neben all den anderen Noten fühlt es sich plötzlich so klein an. Wie du selbst gerade.',
        speaker: 'Erzähler',
        speakerEmoji: '🏔️',
        choices: [],
      },
      {
        id: 'mt1-s1-thoughts',
        text: 'Alle sind besser als ich. In allem. Lara schreibt bessere Aufsätze, Tom versteht Mathe sofort, Mia ist beliebt, Noah ist witzig. Und ich? Ich bin … nichts Besonderes.',
        speaker: 'Spieler',
        speakerEmoji: '💭',
        choices: [],
      },
      {
        id: 'mt1-s1-companion',
        text: 'Dein Begleiter stupst dich leise an und schaut dich mit großen Augen an. Als wollte er sagen: «Hey, ich sehe dich. Und was du gerade denkst, stimmt so nicht ganz.»',
        speaker: 'Begleiter',
        speakerEmoji: '🐾',
        choices: [],
      },
      {
        id: 'mt1-s1-choice',
        text: 'Der Gedanke «Alle sind besser als ich» sitzt schwer in deinem Bauch. Was tust du damit?',
        speaker: 'Erzähler',
        speakerEmoji: '🏔️',
        choices: [
          {
            id: 'mt1-c-hide',
            text: 'Mein Blatt schnell umdrehen, damit niemand meine Note sieht.',
            consequence:
              'Du drehst das Blatt hastig um und rutschst tiefer in deinen Stuhl. Du hoffst, dass niemand fragt. Aber das Gefühl bleibt – schwer und drückend. Eine Note zu verstecken versteckt nicht das Gefühl dahinter. Und dieses Gefühl hat etwas Wichtiges zu sagen: Es tut weh, sich nicht gut genug zu fühlen. Das verdient Aufmerksamkeit, nicht Verstecken.',
            empathyPoints: 0,
            insightPoints: 1,
            couragePoints: 0,
            nextSceneId: null,
          },
          {
            id: 'mt1-c-compare',
            text: 'Mich ärgern und denken: «Ich werde nie so gut wie die anderen.»',
            consequence:
              'Der Gedanke dreht sich in deinem Kopf wie ein Karussell: «Nie gut genug, nie gut genug …» Aber Moment – kennst du diesen Gedanken-Trick? Wenn du dich mit anderen vergleichst, vergleichst du immer deine schwächste Seite mit ihrer stärksten. Das ist, als würdest du deinen Entwurf mit ihrem fertigen Bild vergleichen. Unfair, oder? Jeder Mensch hat Stärken, die andere nicht sehen – auch du.',
            empathyPoints: 0,
            insightPoints: 2,
            couragePoints: 0,
            nextSceneId: null,
          },
          {
            id: 'mt1-c-question',
            text: 'Innehalten und mich fragen: «Stimmt das wirklich, dass ALLE besser sind?»',
            consequence:
              'Du hältst kurz inne und überlegst: Ist das wirklich wahr? ALLE? In ALLEM? Hmm … Du erinnerst dich, dass Lara letzte Woche in Kunst total überfordert war – und du ihr geholfen hast. Tom hat dich um Rat gefragt, als er Stress mit seinem Freund hatte. Und Ben kann zwar gut schreiben, aber er hat dir gesagt, dass er dich um deine Kreativität beneidet. Dein Gedanken-Detektor meldet sich: «Alle sind besser als ich» ist ein Gedanken-Trick namens Verallgemeinerung. Die Wahrheit ist bunter – und du hast darin deinen eigenen, wertvollen Platz.',
            empathyPoints: 1,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: null,
          },
          {
            id: 'mt1-c-talk',
            text: 'Zu Tom rüberrutschen und ehrlich sagen: «Irgendwie fühle ich mich heute echt schlecht.»',
            consequence:
              'Du lehnst dich zu Tom rüber und flüsterst: «Ey, alle haben voll die guten Noten … Ich komm mir gerade ziemlich doof vor.» Tom schaut dich an und sagt: «Echt jetzt? Ich hab letzte Woche in Bio eine Fünf geschrieben. Und du hast mir erklärt, warum Zellen sich teilen – das hat mir voll geholfen!» Du blinzelst. Stimmt, das hattest du vergessen. Manchmal sehen andere deine Stärken deutlicher als du selbst. Sich verletzlich zu zeigen ist nicht schwach – es öffnet Türen zu ehrlichen Gesprächen.',
            empathyPoints: 3,
            insightPoints: 2,
            couragePoints: 3,
            nextSceneId: null,
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Scenario 2 – Das perfekte Leben
  // ---------------------------------------------------------------------------
  {
    id: 'mountain-scenario-2',
    islandId: 'mountain' as const,
    title: 'Das perfekte Leben',
    description:
      'Du scrollst durch Instagram und TikTok und alle scheinen das perfekte Leben zu haben. Warum fühlt sich deins dagegen so langweilig und gewöhnlich an?',
    scenes: [
      {
        id: 'mt2-s1-intro',
        text: 'Es ist Sonntagabend. Du liegst auf deinem Bett und scrollst durch dein Handy. Auf Instagram postet Jule Bilder von ihrem Urlaub auf Kreta – blaues Meer, perfektes Lächeln. Auf TikTok zeigt ein Mädchen in deinem Alter ihr riesiges Zimmer mit LED-Lichtern und einer Sammlung von Sneakern, die mehr kosten als dein ganzes Bücherregal.',
        speaker: 'Erzähler',
        speakerEmoji: '🏔️',
        choices: [],
      },
      {
        id: 'mt2-s1-scroll',
        text: 'Du scrollst weiter. Noch ein perfektes Foto. Noch ein Video von jemandem, der scheinbar alles hat: Freunde, Geld, Aussehen, Talent. 247 Likes. 1.200 Likes. 50.000 Likes. Je länger du scrollst, desto schwerer wird das Gefühl in deiner Brust.',
        speaker: 'Erzähler',
        speakerEmoji: '📱',
        choices: [],
      },
      {
        id: 'mt2-s1-thoughts',
        text: 'Alle haben so ein cooles Leben. Mein Zimmer ist klein, mein Leben ist langweilig, und ich sehe auch nicht so aus wie die. Warum habe ich nicht das, was andere haben? Was stimmt nicht mit mir?',
        speaker: 'Spieler',
        speakerEmoji: '💭',
        choices: [],
      },
      {
        id: 'mt2-s1-feeling',
        text: 'Du legst das Handy auf die Brust und starrst an die Decke. Ein Gefühl, das schwer einzuordnen ist, breitet sich aus – eine Mischung aus Neid, Traurigkeit und dem Gefühl, irgendwie nicht zu genügen. Dein Begleiter rollt sich neben dir zusammen und legt den Kopf auf deine Hand.',
        speaker: 'Erzähler',
        speakerEmoji: '🏔️',
        choices: [],
      },
      {
        id: 'mt2-s1-choice',
        text: 'Das Handy liegt neben dir. Die Gedanken kreisen. Was machst du?',
        speaker: 'Erzähler',
        speakerEmoji: '🏔️',
        choices: [
          {
            id: 'mt2-c-keep-scrolling',
            text: 'Weiterscrollen – vielleicht kommt ja noch was, das mich aufmuntert.',
            consequence:
              'Du nimmst das Handy wieder hoch und scrollst weiter. Noch ein perfektes Bild. Noch eins. Das Gefühl wird nicht besser – es wird schwerer. Studien zeigen: Je länger wir scrollen und uns vergleichen, desto schlechter fühlen wir uns. Social Media zeigt nur die Highlights, nie die normalen oder schwierigen Momente. Es ist wie ein Film, der nur aus den besten Szenen besteht – das ist nicht das echte Leben von irgendjemandem.',
            empathyPoints: 0,
            insightPoints: 1,
            couragePoints: 0,
            nextSceneId: null,
          },
          {
            id: 'mt2-c-phone-away',
            text: 'Das Handy bewusst weglegen und etwas anderes machen.',
            consequence:
              'Du legst das Handy in die Schublade – bewusst außer Reichweite. Dann stehst du auf und machst dir einen Kakao. Du setzt dich ans Fenster und schaust raus. Es ist nichts Spektakuläres da draußen, nur die Straße, ein paar Bäume, der Himmel wird langsam dunkel. Aber komischerweise fühlt es sich besser an als das Scrollen. Dein echtes Leben ist vielleicht nicht «instagrammable» – aber es ist deins, es ist real, und es hat Momente, die kein Filter besser machen kann. Das Handy wegzulegen war ein kleiner, aber kluger Schritt.',
            empathyPoints: 1,
            insightPoints: 3,
            couragePoints: 1,
            nextSceneId: null,
          },
          {
            id: 'mt2-c-think-critically',
            text: 'Mich fragen: «Was sehe ich hier eigentlich wirklich?»',
            consequence:
              'Du schaust dir Jules Foto noch einmal genau an. Perfektes Lächeln, blaues Meer … Aber du erinnerst dich, dass Jule letzte Woche in der Schule erzählt hat, dass sie sich mit ihrer Schwester gestritten hat und deswegen total genervt war. Davon steht nichts auf Instagram. Und das Mädchen mit dem riesigen Zimmer? Du weißt gar nicht, ob sie glücklich ist. Du siehst nur 15 Sekunden ihres Lebens, die sie extra ausgewählt hat. Dein Gedanken-Detektor schlägt an: «Das hier ist eine Bühne, kein Spiegel. Mein Wert hängt nicht davon ab, wie mein Leben im Vergleich zu einer Inszenierung aussieht.»',
            empathyPoints: 2,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: null,
          },
          {
            id: 'mt2-c-gratitude',
            text: 'Drei Dinge aufschreiben, die ich an meinem Leben mag – auch wenn sie klein sind.',
            consequence:
              'Du greifst nach einem Zettel und schreibst: «1. Mein Hund freut sich jeden Tag, wenn ich nach Hause komme. 2. Oma hat am Wochenende meinen Lieblingskuchen gebacken. 3. Beim letzten Spieleabend mit meinen Freunden haben wir so gelacht, dass mir der Bauch wehtat.» Du liest die drei Punkte noch einmal. Keiner davon würde auf Instagram viral gehen. Aber jeder einzelne bringt ein leises Lächeln in dein Gesicht. Dankbarkeit ist wie eine Brille, die dir zeigt, was da ist – statt was fehlt. Und was da ist, ist mehr als genug.',
            empathyPoints: 2,
            insightPoints: 2,
            couragePoints: 2,
            nextSceneId: null,
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Scenario 3 – Der innere Kritiker
  // ---------------------------------------------------------------------------
  {
    id: 'mountain-scenario-3',
    islandId: 'mountain' as const,
    title: 'Der innere Kritiker',
    description:
      'Du hast einen Fehler gemacht und dein innerer Kritiker ist gnadenlos laut. Er sagt dir, dass du nichts kannst und alles falsch machst. Wie gehst du mit dieser Stimme um?',
    scenes: [
      {
        id: 'mt3-s1-intro',
        text: 'Theaterprobe in der Aula. Du hast die Hauptrolle im Schulstück bekommen – eigentlich ein Grund, stolz zu sein. Aber heute Nachmittag bei der Generalprobe vor dem ganzen Kurs passiert es: Mitten im wichtigsten Monolog vergisst du deinen Text. Komplett. Stille. Alle schauen dich an.',
        speaker: 'Erzähler',
        speakerEmoji: '🏔️',
        choices: [],
      },
      {
        id: 'mt3-s1-mistake',
        text: 'Du stehst auf der Bühne, der Mund offen, aber es kommt nichts. Die Sekunden fühlen sich an wie Stunden. Die Souffleuse flüstert dir den Text zu, du murmelst ihn nach, aber der Moment ist kaputt. Frau Berger, die Regisseurin, klopft zweimal und sagt freundlich: «Kein Problem, das passiert. Von vorne!» Aber für dich fühlt es sich nicht nach «kein Problem» an.',
        speaker: 'Erzähler',
        speakerEmoji: '🎭',
        choices: [],
      },
      {
        id: 'mt3-s1-critic',
        text: 'Peinlich. Einfach nur peinlich. Alle haben es gesehen. Ich bin so schlecht. Warum habe ich die Rolle überhaupt angenommen? Ich kann das nicht. Ich vermassle alles. Ich hätte es wissen müssen – ich bin einfach nicht gut genug dafür.',
        speaker: 'Innerer Kritiker',
        speakerEmoji: '👤',
        choices: [],
      },
      {
        id: 'mt3-s1-feeling',
        text: 'Die Stimme in deinem Kopf ist laut und gemein. Sie klingt so überzeugend, als würde sie die Wahrheit sagen. Dein Gesicht brennt, dein Magen zieht sich zusammen, und am liebsten würdest du von der Bühne rennen und nie wiederkommen.',
        speaker: 'Erzähler',
        speakerEmoji: '🏔️',
        choices: [],
      },
      {
        id: 'mt3-s1-choice',
        text: 'Der innere Kritiker schreit dich an. Was tust du?',
        speaker: 'Erzähler',
        speakerEmoji: '🏔️',
        choices: [
          {
            id: 'mt3-c-believe',
            text: 'Dem Kritiker glauben und mir vornehmen, die Rolle abzugeben.',
            consequence:
              'Du denkst: «Der Kritiker hat recht. Ich kann das nicht.» Nach der Probe gehst du zu Frau Berger und sagst, du willst die Rolle abgeben. Sie sieht dich überrascht an und sagt: «Ich habe dich ausgewählt, weil du Talent hast. Ein vergessener Text ist kein Grund aufzuhören.» Du gehst trotzdem. Zu Hause merkst du: Die Erleichterung hält nicht lange. Stattdessen kommt ein neues Gefühl – Bedauern. Manchmal klingt der innere Kritiker so laut, dass wir ihm glauben. Aber er ist kein Experte – er ist nur die Angst, die sich als Wahrheit verkleidet.',
            empathyPoints: 0,
            insightPoints: 2,
            couragePoints: 0,
            nextSceneId: null,
          },
          {
            id: 'mt3-c-name',
            text: 'Den inneren Kritiker erkennen und ihm einen Namen geben: «Ach, du schon wieder.»',
            consequence:
              'Du merkst: Da ist sie wieder, diese gemeine Stimme. Aber diesmal versuchst du etwas Neues. Du gibst ihr einen Namen – sagen wir «Herr Miesepeter». Und du sagst innerlich: «Ach, Herr Miesepeter, du bist ja wieder da. Danke für deine Meinung, aber ich höre heute mal auf eine andere Stimme.» Es klingt fast lustig – und genau das ist der Trick. Wenn du den Kritiker als das erkennst, was er ist – ein übervorsichtiger Gedanke, kein Fakt – verliert er seine Macht. Du bist nicht deine Gedanken. Du bist die Person, die ihnen zuhört und entscheiden kann, welchen sie Glauben schenkt.',
            empathyPoints: 1,
            insightPoints: 3,
            couragePoints: 3,
            nextSceneId: null,
          },
          {
            id: 'mt3-c-friend',
            text: 'Mich fragen: «Was würde ich einer Freundin sagen, der das passiert?»',
            consequence:
              'Du stellst dir vor, deine beste Freundin stünde auf der Bühne und hätte den Text vergessen. Was würdest du zu ihr sagen? Bestimmt nicht: «Du bist schlecht und peinlich.» Du würdest sagen: «Hey, das passiert jedem mal! Du hast wochenlang geübt und warst richtig gut. Ein Aussetzer macht dich nicht schlecht – er macht dich menschlich.» Und dann merkst du: Warum bist du so viel netter zu anderen als zu dir selbst? Du verdienst dieselbe Freundlichkeit, die du anderen gibst. Selbstmitgefühl bedeutet, dein eigener guter Freund zu sein – gerade dann, wenn es schwer ist.',
            empathyPoints: 3,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: null,
          },
          {
            id: 'mt3-c-refocus',
            text: 'Tief durchatmen und mir sagen: «Ein Fehler ist nicht das Ende. Morgen ist die Aufführung, und ich werde üben.»',
            consequence:
              'Du atmest tief durch und sagst dir: «Okay, das war ein Fehler. Er fühlt sich gerade riesig an, aber er ist es nicht. Morgen ist die Aufführung, und ich habe noch Zeit zu üben.» Nach der Probe gehst du den Text noch dreimal durch. Am nächsten Tag stehst du auf der Bühne, und als die Stelle kommt, an der du gestern steckengeblieben bist, klopft dein Herz – aber die Worte kommen. Jeder einzelne. Das Publikum applaudiert. Du hast es geschafft! Nicht obwohl du einen Fehler gemacht hast, sondern weil du danach nicht aufgehört hast. Fehler sind keine Endpunkte – sie sind Zwischenstationen auf dem Weg zum Können.',
            empathyPoints: 1,
            insightPoints: 2,
            couragePoints: 3,
            nextSceneId: null,
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Scenario 4 – Das Kompliment
  // ---------------------------------------------------------------------------
  {
    id: 'mountain-scenario-4',
    islandId: 'mountain' as const,
    title: 'Das Kompliment',
    description:
      'Jemand macht dir ein ehrliches Kompliment. Klingt einfach? Für viele ist es unglaublich schwer, etwas Nettes über sich selbst anzunehmen. Kannst du es?',
    scenes: [
      {
        id: 'mt4-s1-intro',
        text: 'Kunstunterricht. Ihr malt Selbstporträts – nicht fotorealistisch, sondern so, wie ihr euch selbst seht. Du hast eine Mischung aus Farben und Formen gewählt, die irgendwie … dich zeigen. Du bist nicht sicher, ob es gut ist. Eigentlich findest du es komisch.',
        speaker: 'Erzähler',
        speakerEmoji: '🏔️',
        choices: [],
      },
      {
        id: 'mt4-s1-compliment',
        text: 'Frau Klein, die Kunstlehrerin, bleibt an deinem Platz stehen. Sie schaut lange auf dein Bild. Dann sagt sie laut genug, dass die Leute um dich herum es hören: «Das ist wirklich beeindruckend. Du hast eine ganz besondere Art, Farben einzusetzen. Da steckt echtes Talent drin.»',
        speaker: 'Frau Klein',
        speakerEmoji: '🎨',
        choices: [],
      },
      {
        id: 'mt4-s1-reaction',
        text: 'Dein Herz macht einen kleinen Sprung – aber sofort meldet sich eine andere Stimme in deinem Kopf: «Die sagt das doch nur, um nett zu sein. So toll ist das Bild gar nicht. Die anderen malen viel besser.»',
        speaker: 'Spieler',
        speakerEmoji: '💭',
        choices: [],
      },
      {
        id: 'mt4-s1-feeling',
        text: 'Es ist ein komisches Gefühl. Etwas in dir freut sich über das Kompliment – aber gleichzeitig will ein anderer Teil es sofort wegschieben, als hättest du es nicht verdient. Als wäre das Annehmen von etwas Nettem irgendwie … gefährlich.',
        speaker: 'Erzähler',
        speakerEmoji: '🏔️',
        choices: [],
      },
      {
        id: 'mt4-s1-choice',
        text: 'Frau Klein lächelt dich an und wartet. Deine Mitschüler schauen rüber. Wie reagierst du?',
        speaker: 'Erzähler',
        speakerEmoji: '🏔️',
        choices: [
          {
            id: 'mt4-c-deflect',
            text: '«Ach, das ist doch nicht so besonders. War eher Zufall.»',
            consequence:
              'Du winkst ab und sagst: «Ach, das war eher Zufall.» Frau Klein lächelt noch kurz und geht weiter. Der Moment ist vorbei. Und du merkst: Irgendwie fühlt sich das Abwehren nicht gut an. Als hättest du dir selbst etwas Schönes weggenommen. Viele Menschen wehren Komplimente ab – aus Gewohnheit, aus Unsicherheit, aus Angst, arrogant zu wirken. Aber ein Kompliment anzunehmen bedeutet nicht, eingebildet zu sein. Es bedeutet, zu akzeptieren, dass du Gutes in dir hast.',
            empathyPoints: 0,
            insightPoints: 2,
            couragePoints: 0,
            nextSceneId: null,
          },
          {
            id: 'mt4-c-compare',
            text: '«Finden Sie? Schauen Sie mal, was Lena gemalt hat – das ist WIRKLICH gut.»',
            consequence:
              'Du zeigst auf Lenas Bild und lenkst die Aufmerksamkeit weg von dir. Frau Klein sagt: «Lenas Bild ist auch toll – aber gerade rede ich über deins.» Du lächelst unsicher. Es ist ein Muster, das viele kennen: Statt ein Kompliment anzunehmen, zeigen wir auf jemand anderen, der es «mehr verdient» hat. Aber Wertschätzung ist kein Kuchen, von dem nur begrenzte Stücke da sind. Wenn Lena gut malt, macht das dein Bild nicht schlechter. Ihr beide dürft gleichzeitig gut sein.',
            empathyPoints: 1,
            insightPoints: 2,
            couragePoints: 0,
            nextSceneId: null,
          },
          {
            id: 'mt4-c-accept',
            text: '«Danke, das freut mich wirklich.» – Auch wenn es sich komisch anfühlt.',
            consequence:
              'Du holst Luft und sagst: «Danke, Frau Klein. Das freut mich echt.» Die Worte fühlen sich ungewohnt an im Mund – fast ein bisschen unbequem. Aber dann merkst du: Es fühlt sich auch … gut an. Warm. Frau Klein nickt und geht weiter. Und du schaust dein Bild noch einmal an – diesmal mit etwas freundlicheren Augen. «Danke» zu sagen ist wie eine Tür öffnen. Du lässt etwas Gutes rein, statt es draußen stehen zu lassen. Und weißt du was? Du hast es verdient, durch diese Tür zu gehen. Jedes Mal.',
            empathyPoints: 2,
            insightPoints: 3,
            couragePoints: 3,
            nextSceneId: null,
          },
          {
            id: 'mt4-c-reflect',
            text: 'Nichts sagen, aber nach der Stunde das Bild noch einmal in Ruhe anschauen und versuchen, es mit Frau Kleins Augen zu sehen.',
            consequence:
              'Du sagst nur leise «Danke» und schaust schnell weg. Aber nach der Stunde, als alle draußen sind, gehst du noch einmal zu deinem Bild. Du versuchst, es so zu sehen, wie Frau Klein es gesehen hat. Und tatsächlich – wenn du genau hinschaust, siehst du: Die Farben passen gut zusammen. Die Form hat etwas Eigenes. Es sieht aus wie … du. Und das ist nicht schlecht. Das ist besonders. Manchmal brauchen wir die Augen eines anderen Menschen, um zu sehen, was wir allein übersehen. Und manchmal brauchen wir einen ruhigen Moment, um ihr Geschenk wirklich anzunehmen.',
            empathyPoints: 2,
            insightPoints: 3,
            couragePoints: 1,
            nextSceneId: null,
          },
        ],
      },
    ],
  },
];

// =============================================================================
// 2. WISDOM CARDS
// =============================================================================

export const mountainWisdomCards: WisdomCard[] = [
  {
    id: 'mountain-wisdom-1',
    islandId: 'mountain' as const,
    text: 'Du bist mehr als deine Noten, dein Aussehen oder deine Likes. Dein Wert als Mensch steht nicht zur Debatte – er ist einfach da.',
    category: 'insight',
    collected: false,
  },
  {
    id: 'mountain-wisdom-2',
    islandId: 'mountain' as const,
    text: 'Sich mit anderen zu vergleichen ist, als würdest du einen Fisch danach bewerten, ob er klettern kann. Jeder hat seine eigene Stärke.',
    category: 'insight',
    collected: false,
  },
  {
    id: 'mountain-wisdom-3',
    islandId: 'mountain' as const,
    text: 'Selbstmitgefühl bedeutet, dir selbst ein guter Freund zu sein – besonders dann, wenn du einen Fehler machst.',
    category: 'strategy',
    collected: false,
  },
  {
    id: 'mountain-wisdom-4',
    islandId: 'mountain' as const,
    text: 'Dein innerer Kritiker ist laut, aber er ist kein Experte. Er verwechselt Angst mit Wahrheit.',
    category: 'insight',
    collected: false,
  },
  {
    id: 'mountain-wisdom-5',
    islandId: 'mountain' as const,
    text: 'Ein Kompliment annehmen ist kein Zeichen von Arroganz – es ist ein Zeichen von Selbstachtung.',
    category: 'courage',
    collected: false,
  },
  {
    id: 'mountain-wisdom-6',
    islandId: 'mountain' as const,
    text: 'Social Media zeigt Highlight-Reels, keine echten Leben. Vergleiche dein Kapitel 1 nicht mit dem Kapitel 20 von jemand anderem.',
    category: 'insight',
    collected: false,
  },
  {
    id: 'mountain-wisdom-7',
    islandId: 'mountain' as const,
    text: 'Fehler machen dich nicht kaputt – sie machen dich menschlich. Und menschlich sein ist keine Schwäche.',
    category: 'emotion',
    collected: false,
  },
  {
    id: 'mountain-wisdom-8',
    islandId: 'mountain' as const,
    text: 'Frag dich: «Würde ich das zu meiner besten Freundin sagen?» Wenn nicht, dann sag es auch nicht zu dir selbst.',
    category: 'strategy',
    collected: false,
  },
  {
    id: 'mountain-wisdom-9',
    islandId: 'mountain' as const,
    text: 'Du musst nicht perfekt sein, um wertvoll zu sein. Perfektion ist eine Illusion – du bist echt, und das ist besser.',
    category: 'emotion',
    collected: false,
  },
  {
    id: 'mountain-wisdom-10',
    islandId: 'mountain' as const,
    text: 'Deine Einzigartigkeit ist keine Schwäche, die du verstecken musst – sie ist deine Superkraft.',
    category: 'courage',
    collected: false,
  },
  {
    id: 'mountain-wisdom-11',
    islandId: 'mountain' as const,
    text: 'Dankbarkeit ist wie eine Brille: Sie verändert nicht, was da ist – aber sie zeigt dir, was du vorher übersehen hast.',
    category: 'strategy',
    collected: false,
  },
  {
    id: 'mountain-wisdom-12',
    islandId: 'mountain' as const,
    text: 'Sich verletzlich zu zeigen ist einer der mutigsten Schritte, die es gibt. Es bedeutet: «Ich bin nicht perfekt – und das ist okay.»',
    category: 'courage',
    collected: false,
  },
];

// =============================================================================
// 3. ACTIVITIES
// =============================================================================

export const mountainActivities: MountainActivity[] = [
  {
    id: 'mountain-activity-1',
    islandId: 'mountain' as const,
    type: 'journal',
    title: 'Brief an mich selbst',
    description:
      'Schreibe einen freundlichen Brief an dich selbst – so, wie du ihn an deine beste Freundin oder deinen besten Freund schreiben würdest. Eine Übung in Selbstmitgefühl und Wertschätzung.',
    instructions: [
      'Nimm dir ein Blatt Papier oder öffne dein Journal. Schaff dir einen ruhigen Moment – vielleicht mit Musik, die du magst.',
      'Stell dir vor, du schreibst einer Person, die du sehr gern hast und die gerade einen schwierigen Tag hat. Diese Person bist du selbst.',
      'Beginne den Brief mit «Liebe/r [dein Name],» und schreibe dann mindestens drei Dinge auf, die du an dir magst oder die dich besonders machen. Das können Eigenschaften sein, Talente, oder Dinge, die du für andere tust.',
      'Schreibe einen Absatz darüber, was du in letzter Zeit geschafft hast – auch kleine Dinge zählen. Bist du morgens aufgestanden, obwohl du müde warst? Hast du jemandem geholfen? Hast du etwas Neues ausprobiert?',
      'Beende den Brief mit einem ermutigenden Satz, den du gerade brauchst. Zum Beispiel: «Du bist genug, genau so wie du bist.» oder «Ich bin stolz auf dich.»',
      'Falte den Brief zusammen und leg ihn an einen Ort, wo du ihn wiederfindest. Lies ihn, wenn du einen schlechten Tag hast – du wirst staunen, wie gut es tut, freundliche Worte von dir selbst zu lesen.',
    ],
    completed: false,
  },
  {
    id: 'mountain-activity-2',
    islandId: 'mountain' as const,
    type: 'reflection',
    title: 'Stärken-Spiegel',
    description:
      'Entdecke deine persönlichen Stärken – nicht die, die andere von dir erwarten, sondern die, die wirklich zu dir gehören. Manchmal sehen wir unsere eigenen Stärken am schlechtesten.',
    instructions: [
      'Schreibe drei Stärken auf, die du an dir kennst. Das können Dinge sein wie: Humor, Kreativität, Zuhören-Können, Ehrlichkeit, Geduld, Tierliebe – alles zählt.',
      'Frage jetzt zwei Menschen, denen du vertraust (Eltern, Freunde, Geschwister): «Was findest du gut an mir? Was kann ich deiner Meinung nach besonders gut?» Schreibe ihre Antworten auf.',
      'Vergleiche die beiden Listen. Gibt es Überschneidungen? Gibt es Stärken, die andere an dir sehen, von denen du gar nichts wusstest? Das sind oft die spannendsten.',
      'Wähle eine Stärke aus, die dich überrascht hat. Schreibe auf, wann du diese Stärke zuletzt eingesetzt hast – vielleicht sogar ohne es zu merken.',
      'Erstelle deine persönliche «Stärken-Karte»: Schreibe deine fünf wichtigsten Stärken auf eine Karte oder zeichne sie als Symbole. Häng sie dort auf, wo du sie jeden Tag siehst.',
      'Erinnere dich: Stärken sind nicht nur Schulnoten und sportliche Leistungen. Freundlich sein, gut zuhören, kreativ denken, mutig Nein sagen – das alles sind echte Superkräfte.',
    ],
    completed: false,
  },
  {
    id: 'mountain-activity-3',
    islandId: 'mountain' as const,
    type: 'creative',
    title: 'Der Kritiker und der Coach',
    description:
      'Lerne, deinen inneren Kritiker zu erkennen – und ihm eine freundlichere Stimme gegenüberzustellen. In dieser Übung verwandelst du gemeine Selbstgespräche in ermutigende.',
    instructions: [
      'Nimm ein Blatt Papier und teile es in der Mitte in zwei Spalten. Schreibe links «Der Kritiker» und rechts «Der Coach».',
      'Denke an eine Situation, in der du dich schlecht gefühlt hast oder einen Fehler gemacht hast. Schreibe in die linke Spalte, was dein innerer Kritiker gesagt hat – zum Beispiel: «Du bist so peinlich» oder «Das schaffst du nie».',
      'Jetzt kommt der Coach: Schreibe in die rechte Spalte eine freundlichere, ehrlichere Version desselben Gedankens. Zum Beispiel: «Das war unangenehm, aber es passiert jedem mal» oder «Das war schwierig, aber du kannst daraus lernen».',
      'Mach das für mindestens drei Kritiker-Sätze. Du wirst merken: Der Coach ist genauso ehrlich – aber er hilft dir, statt dich runterzuziehen.',
      'Gib deinem Kritiker einen lustigen Namen (zum Beispiel «Herr Miesepeter» oder «Drama-Diva»). Das nimmt ihm die Macht. Wenn er sich das nächste Mal meldet, kannst du sagen: «Ach, du schon wieder!»',
      'Übe in den nächsten Tagen, den Kritiker zu bemerken, wenn er auftaucht. Du musst ihn nicht zum Schweigen bringen – es reicht, ihn zu erkennen und dann bewusst den Coach einzuschalten. Mit der Zeit wird die Coach-Stimme lauter und der Kritiker leiser.',
    ],
    completed: false,
  },
];

// =============================================================================
// 4. NPCs
// =============================================================================

export const mountainNPCs: NPC[] = [
  {
    id: 'mountain-npc-summit',
    name: 'Summit',
    emoji: '🦅',
    description:
      'Die weise Hüterin des Berggipfels. Summit ist eine majestätische Adlerin, die hoch über den Wolken lebt und von dort oben alles aus einer anderen Perspektive sieht. Sie hilft dir, über deine eigenen Gedanken hinauszuschauen und das große Bild zu erkennen.',
    backstory:
      'Summit war nicht immer so gelassen. Als junger Adler hatte sie Angst vor der Höhe – ausgerechnet sie, geboren auf dem höchsten Gipfel der Berginsel. Die anderen Adler flogen mühelos, während sie am Felsrand saß und sich fragte, was mit ihr nicht stimmte. «Ein Adler, der nicht fliegen will – wie peinlich», dachte sie. Doch eine alte Bergschildkröte sagte ihr eines Tages: «Du vergleichst dein Inneres mit dem Äußeren der anderen. Du siehst ihre Flügel, aber nicht ihre Zweifel.» Dieser Satz veränderte alles. Summit begann, Schritt für Schritt zu fliegen – nicht weil sie keine Angst mehr hatte, sondern weil sie lernte, sich trotz der Angst zu trauen. Heute sitzt sie auf dem Gipfel und erinnert jeden Besucher daran: «Du musst nicht der höchste Berg sein, um einen guten Ausblick zu haben. Manchmal reicht ein Hügel – solange du stehst.»',
  },
  {
    id: 'mountain-npc-echo',
    name: 'Echo',
    emoji: '🪨',
    description:
      'Ein nachdenklicher junger Steinbock, der in den Höhlen der Berginsel lebt. Echo wiederholt nicht nur Geräusche – er wiederholt auch die Gedanken, die du über dich selbst denkst. Und er hilft dir zu erkennen, welche davon wahr sind und welche nur Echos alter Verletzungen.',
    backstory:
      'Echo wuchs in einer Herde auf, in der alle Steinböcke danach beurteilt wurden, wie hoch sie springen konnten. Und Echo? Er war der Kleinste. Egal wie sehr er sich anstrengte, die anderen sprangen immer höher. «Klein-Echo», nannten sie ihn, manchmal nett gemeint, manchmal nicht. Irgendwann begann er, es selbst zu glauben: «Ich bin zu klein. Ich bin nicht genug.» Dieser Satz wurde sein ständiger Begleiter – ein Echo in seinem Kopf, das nie aufhörte. Erst als er tief in die Berghöhlen ging und dort sein eigenes Echo hörte – laut, klar und stark – verstand er etwas Wichtiges: Die Stimme in seinem Kopf war nicht die Wahrheit. Sie war nur ein Echo von Dingen, die andere gesagt hatten. Und er konnte entscheiden, welche Worte er in Zukunft wiederholen wollte. Seitdem hilft Echo anderen, ihre inneren Echos zu erkennen – und neue, freundlichere Worte zu finden, die es wert sind, wiederholt zu werden. Sein Lieblingssatz: «Was du dir immer wieder sagst, wird irgendwann zu dem, was du glaubst. Also wähle deine Worte gut.»',
  },
];
