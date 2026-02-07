// =============================================================================
// Vulkaninsel (Volcano Island) – Wut & Emotionsregulation
// Inner Worlds – Social-Emotional Learning Game
//
// Alle Texte auf Deutsch, warmherzig und auf Augenhoehe fuer 10–15-Jaehrige.
// =============================================================================

import type { Scenario, WisdomCard, Activity } from '../../../types';

// -----------------------------------------------------------------------------
// Local Types (extensions not yet in the shared type file)
// -----------------------------------------------------------------------------

/** Activity with step-by-step instructions */
export interface VolcanoActivity extends Activity {
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

export const volcanoScenarios: Scenario[] = [
  // ---------------------------------------------------------------------------
  // Scenario 1 – Die unfaire Situation
  // ---------------------------------------------------------------------------
  {
    id: 'volcano-scenario-1',
    islandId: 'volcano',
    title: 'Die unfaire Situation',
    description:
      'Kai provoziert dich im Sportunterricht vor allen anderen. Die Wut steigt – was machst du damit?',
    scenes: [
      {
        id: 'v1-s1-intro',
        text: 'Es ist Donnerstagnachmittag – Sportunterricht, Basketball. Du hast dich eigentlich darauf gefreut, denn heute werden die Teams neu gemischt. Die Turnhalle riecht nach Holzboden und Gummi, und die Stimmung ist aufgekratzt.',
        speaker: 'narrator',
        speakerEmoji: '📖',
        choices: [],
      },
      {
        id: 'v1-s1-provocation',
        text: 'Kai stellt sich neben dich und sagt laut, damit alle es hören: «Oh nein, nicht du schon wieder in meinem Team! Du bist doch total schlecht. Wegen dir verlieren wir jedes Mal.» Ein paar Leute lachen.',
        speaker: 'Kai',
        speakerEmoji: '😏',
        choices: [],
      },
      {
        id: 'v1-s1-feeling',
        text: 'Dir schießt das Blut ins Gesicht. Dein Herz klopft schneller, deine Hände ballen sich zu Fäusten. Eine heiße Welle steigt vom Bauch bis in den Kopf – Wut. Die anderen schauen zu und warten auf deine Reaktion.',
        speaker: 'narrator',
        speakerEmoji: '🌋',
        choices: [],
      },
      {
        id: 'v1-s1-thoughts',
        text: 'Das ist so unfair! Ich hab gar nichts gemacht! Am liebsten würde ich … ja, was eigentlich?',
        speaker: 'player',
        speakerEmoji: '💭',
        choices: [],
      },
      {
        id: 'v1-s1-choice',
        text: 'Die Wut brennt in dir. Was tust du?',
        speaker: 'narrator',
        speakerEmoji: '🌋',
        choices: [
          {
            id: 'v1-s1-c-aggressive',
            text: 'Kai anschreien: «Halt die Klappe! Du bist doch selber der Schlechteste hier!»',
            consequence:
              'Du schreist Kai an. Für einen kurzen Moment fühlt es sich gut an – endlich raus mit der Wut! Aber dann wird Kai auch lauter. Ihr schreit euch gegenseitig an, bis die Sportlehrerin einschreitet. Beide müsst ihr euch an den Rand setzen. Du bist immer noch wütend, und jetzt auch frustriert, weil du gar nicht mitspielen darfst. Zurückschreien fühlt sich im Moment manchmal richtig an – aber meistens macht es die Situation nicht besser, sondern größer.',
            empathyPoints: 0,
            insightPoints: 0,
            couragePoints: 1,
            nextSceneId: null,
          },
          {
            id: 'v1-s1-c-breathe',
            text: 'Dich umdrehen, ein paar Schritte weggehen und tief durchatmen.',
            consequence:
              'Du drehst dich um und gehst ein paar Schritte weg. Es kostet dich richtig Kraft – ein Teil von dir will sich umdrehen und Kai anbrüllen. Aber du atmest tief ein … und langsam aus. Noch einmal. Und noch einmal. Die heiße Wut kühlt langsam ab, wie Lava, die erstarrt. Nach einer Minute merkst du: Du hast die Kontrolle behalten. Das war alles andere als einfach, aber du kannst stolz auf dich sein. Kai verliert schnell das Interesse, wenn er keine Reaktion bekommt.',
            empathyPoints: 1,
            insightPoints: 3,
            couragePoints: 1,
            nextSceneId: null,
          },
          {
            id: 'v1-s1-c-teacher',
            text: 'Zur Sportlehrerin gehen und ihr erzählen, was Kai gesagt hat.',
            consequence:
              'Du gehst zur Sportlehrerin und erzählst ihr ruhig, was passiert ist. Sie nickt verständnisvoll und spricht danach mit Kai unter vier Augen. Hilfe holen ist kein Petzen – es ist klug. Manche Situationen sind zu groß, um sie alleine zu lösen, und das ist völlig okay. Kai schmollt eine Weile, aber er hört auf, dich zu provozieren. Und du weißt jetzt: Du musst nicht alles alleine aushalten.',
            empathyPoints: 1,
            insightPoints: 2,
            couragePoints: 2,
            nextSceneId: null,
          },
          {
            id: 'v1-s1-c-calm',
            text: 'Ruhig, aber bestimmt sagen: «Das war nicht in Ordnung. Ich spiele genauso gern wie alle anderen.»',
            consequence:
              'Du holst einmal tief Luft und sagst ruhig, aber bestimmt: «Hey Kai, das war nicht in Ordnung. Ich spiele genauso gern Basketball wie alle anderen und gebe mein Bestes.» Kai sieht dich überrascht an – er hat wohl mit einer anderen Reaktion gerechnet. Ein paar Mitspieler nicken dir zu. Es fühlt sich richtig gut an, für dich selbst einzustehen, ohne dabei die Kontrolle zu verlieren. Das war wirklich mutig.',
            empathyPoints: 2,
            insightPoints: 2,
            couragePoints: 3,
            nextSceneId: null,
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Scenario 2 – Mobbing auf dem Schulhof
  // ---------------------------------------------------------------------------
  {
    id: 'volcano-scenario-2',
    islandId: 'volcano',
    title: 'Mobbing auf dem Schulhof',
    description:
      'Du siehst, wie Lina auf dem Schulhof von einer Gruppe schikaniert wird. Was tust du?',
    scenes: [
      {
        id: 'v1-s2-intro',
        text: 'Große Pause. Du schlenderst über den Schulhof, als du in der Nähe der Tischtennisplatte eine Gruppe bemerkst, die im Halbkreis steht. In der Mitte steht Lina aus der Parallelklasse.',
        speaker: 'narrator',
        speakerEmoji: '📖',
        choices: [],
      },
      {
        id: 'v1-s2-scene',
        text: '«Gib her, Lina! Oder traust du dich etwa nicht, nein zu sagen?» Einer aus der Gruppe greift nach ihrem Rucksack. Lina hält ihn fest umklammert. Ihre Augen sind feucht, aber sie sagt nichts.',
        speaker: 'narrator',
        speakerEmoji: '📖',
        choices: [],
      },
      {
        id: 'v1-s2-lina',
        text: 'Lina sieht sich hilfesuchend um. Für einen kurzen Moment treffen sich eure Blicke.',
        speaker: 'Lina',
        speakerEmoji: '😰',
        choices: [],
      },
      {
        id: 'v1-s2-feeling',
        text: 'Dein Magen zieht sich zusammen. Das ist so unfair! Gleichzeitig spürst du, wie dein Herz schneller schlägt – nicht nur Wut, sondern auch ein mulmiges Gefühl. Was, wenn die Gruppe sich dann gegen dich wendet?',
        speaker: 'narrator',
        speakerEmoji: '🌋',
        choices: [],
      },
      {
        id: 'v1-s2-choice',
        text: 'Du stehst ein paar Meter entfernt. Was machst du?',
        speaker: 'narrator',
        speakerEmoji: '🌋',
        choices: [
          {
            id: 'v1-s2-c-watch',
            text: 'Stehen bleiben und zuschauen, ohne etwas zu tun.',
            consequence:
              'Du bleibst stehen und schaust zu. Die Gruppe macht weiter, und Lina gibt irgendwann ihren Rucksack ab. Danach sitzt sie allein auf einer Bank und weint leise. Du merkst, wie sich ein unangenehmes Gefühl in dir breitmacht – als hättest du etwas Wichtiges verpasst. Zuzuschauen fühlt sich sicher an, aber es hinterlässt eine Leere. Lina hätte jemanden gebraucht, der auf ihrer Seite steht.',
            empathyPoints: 0,
            insightPoints: 1,
            couragePoints: 0,
            nextSceneId: null,
          },
          {
            id: 'v1-s2-c-leave',
            text: 'Weggehen und so tun, als hättest du nichts gesehen.',
            consequence:
              'Du drehst dich um und gehst weg. Das mulmige Gefühl im Bauch bleibt. In der nächsten Stunde kannst du dich kaum konzentrieren. Der Gedanke «Ich hätte etwas tun sollen» lässt dich nicht los. Weggehen war in dem Moment der einfachste Weg – aber manchmal nehmen wir so ein schlechtes Gefühl mit, das schwerer wiegt als die Angst davor, etwas zu sagen.',
            empathyPoints: 0,
            insightPoints: 1,
            couragePoints: 0,
            nextSceneId: null,
          },
          {
            id: 'v1-s2-c-intervene',
            text: 'Direkt hingehen und sagen: «Hey, lasst Lina in Ruhe!»',
            consequence:
              'Du gehst hin und sagst laut: «Hey, lasst sie in Ruhe! Das ist nicht cool.» Die Gruppe ist überrascht – damit haben sie nicht gerechnet. Einer murmelt «Ist doch nur Spaß» und sie ziehen ab. Lina sieht dich dankbar an und sagt leise «Danke». Dein Herz rast, aber du merkst: Du hast gerade etwas Mutiges getan. Es ist in Ordnung, wenn dir dabei die Knie gezittert haben – Mut bedeutet nicht, keine Angst zu haben.',
            empathyPoints: 2,
            insightPoints: 1,
            couragePoints: 3,
            nextSceneId: null,
          },
          {
            id: 'v1-s2-c-gethelp',
            text: 'Schnell eine Lehrkraft holen, die in der Nähe ist.',
            consequence:
              'Du rennst los und findest Herrn Weber, der Hofaufsicht hat. Du erzählst ihm schnell, was passiert. Er geht sofort zur Gruppe und greift ein. Lina ist erleichtert. Später kommt sie zu dir und bedankt sich. Hilfe holen ist nicht feige – es ist eine der mutigsten Entscheidungen, die du treffen kannst. Besonders wenn du merkst, dass eine Situation zu viel für eine Person allein ist. Manchmal ist der klügste Held der, der Verstärkung holt.',
            empathyPoints: 3,
            insightPoints: 2,
            couragePoints: 2,
            nextSceneId: null,
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Scenario 3 – Die schlechte Note
  // ---------------------------------------------------------------------------
  {
    id: 'volcano-scenario-3',
    islandId: 'volcano',
    title: 'Die schlechte Note',
    description:
      'Du bekommst eine schlechte Note, obwohl du viel gelernt hast. Die Wut und Enttäuschung kochen hoch – was nun?',
    scenes: [
      {
        id: 'v1-s3-intro',
        text: 'Montagmorgen, dritte Stunde, Mathe. Frau Schneider teilt die Klassenarbeiten aus. Du hast am ganzen Wochenende gelernt – diesmal muss es besser laufen als letztes Mal!',
        speaker: 'narrator',
        speakerEmoji: '📖',
        choices: [],
      },
      {
        id: 'v1-s3-grade',
        text: 'Du drehst das Blatt um und siehst es: eine Fünf. Rot unterstrichen. Überall Anmerkungen und Fehler. Du starrst auf die Note und kannst es nicht fassen.',
        speaker: 'narrator',
        speakerEmoji: '📖',
        choices: [],
      },
      {
        id: 'v1-s3-thoughts',
        text: 'Das kann nicht sein. Ich hab SO viel gelernt! Das ist total ungerecht! War die Arbeit zu schwer? Oder bin ich einfach … zu dumm dafür?',
        speaker: 'player',
        speakerEmoji: '💭',
        choices: [],
      },
      {
        id: 'v1-s3-feeling',
        text: 'Die Wut kocht in dir hoch wie Magma in einem Vulkan. Am liebsten würdest du das Blatt zerknüllen und durch die Klasse werfen. Aber warte – unter der Wut versteckt sich vielleicht noch etwas anderes. Enttäuschung? Traurigkeit? Manchmal kommen große Gefühle im Doppelpack.',
        speaker: 'narrator',
        speakerEmoji: '🌋',
        choices: [],
      },
      {
        id: 'v1-s3-choice',
        text: 'Die Note brennt vor dir auf dem Tisch. Was tust du?',
        speaker: 'narrator',
        speakerEmoji: '🌋',
        choices: [
          {
            id: 'v1-s3-c-tear',
            text: 'Die Arbeit wütend zerknüllen und in die Tasche stopfen.',
            consequence:
              'Du knüllst das Blatt zusammen und stopfst es tief in deinen Rucksack. Es fühlt sich kurz befreiend an, aber dann merkst du: Die Note ist dadurch nicht anders geworden. Und später, wenn du schauen willst, was du verbessern kannst, ist das Blatt ein zerknitterter Ball. Wut will raus – das ist total verständlich. Aber manchmal lohnt es sich, einen Weg zu finden, der dir danach nicht im Weg steht.',
            empathyPoints: 0,
            insightPoints: 1,
            couragePoints: 0,
            nextSceneId: null,
          },
          {
            id: 'v1-s3-c-blame',
            text: '«Die Arbeit war viel zu schwer! Frau Schneider kann einfach nicht erklären!»',
            consequence:
              'Du murmelst laut genug, dass es ein paar Leute hören: «Die Arbeit war total unfair!» Frau Schneider schaut dich kurz an. Es fühlt sich im Moment besser an, jemandem die Schuld zu geben – aber tief drinnen weißt du, dass es so einfach nicht ist. Manchmal sind Noten wirklich unfair. Aber wenn du nur nach außen schaust, verpasst du die Chance herauszufinden, was du nächstes Mal anders machen könntest.',
            empathyPoints: 0,
            insightPoints: 0,
            couragePoints: 1,
            nextSceneId: null,
          },
          {
            id: 'v1-s3-c-breathe',
            text: 'Tief durchatmen, die Arbeit umdrehen und dir vornehmen, sie später in Ruhe anzuschauen.',
            consequence:
              'Du legst die Arbeit mit der Note nach unten auf den Tisch und atmest dreimal tief durch. Gerade jetzt bist du zu aufgewühlt, um klar zu denken – und das ist okay. Später zu Hause schaust du dir die Fehler in Ruhe an und merkst: Einiges hast du tatsächlich verstanden, aber bei bestimmten Aufgaben hast du einen Denkfehler gemacht. Dein «Gedanken-Detektor» meldet sich: Der Gedanke «Ich bin zu dumm» ist ein Gedanken-Trick! Eine schlechte Note sagt nichts darüber aus, wer du bist. Sie zeigt nur, was du beim nächsten Mal anders üben kannst.',
            empathyPoints: 1,
            insightPoints: 3,
            couragePoints: 1,
            nextSceneId: null,
          },
          {
            id: 'v1-s3-c-talk',
            text: 'Nach der Stunde mit deiner besten Freundin oder deinem besten Freund darüber reden.',
            consequence:
              'Nach der Stunde erzählst du deiner besten Freundin, wie mies du dich fühlst. Sie sagt: «Das kenne ich, das ist echt frustrierend. Aber hey, du hast echt viel gelernt – vielleicht können wir nächstes Mal zusammen üben?» Es tut gut, gehört zu werden. Die Wut wird kleiner, wenn du sie aussprechen darfst. Und du merkst: Sich Hilfe suchen bedeutet nicht, schwach zu sein – es bedeutet, klug genug zu sein, nicht alles alleine tragen zu wollen.',
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
  // Scenario 4 – Das verratene Geheimnis
  // ---------------------------------------------------------------------------
  {
    id: 'volcano-scenario-4',
    islandId: 'volcano',
    title: 'Das verratene Geheimnis',
    description:
      'Deine beste Freundin Mia hat dein Geheimnis weitererzählt. Verrat und Wut – wie gehst du damit um?',
    scenes: [
      {
        id: 'v1-s4-intro',
        text: 'Du stehst im Schulflur und hörst plötzlich deinen Namen. Eine Gruppe aus deiner Klasse tuschelt und kichert. Dann sagt jemand laut genug, dass du es hörst: «Stimmt das echt? Das hat uns Mia erzählt!»',
        speaker: 'narrator',
        speakerEmoji: '📖',
        choices: [],
      },
      {
        id: 'v1-s4-realization',
        text: 'Dir wird schlagartig kalt. Mia ist deine beste Freundin. Du hattest ihr etwas Persönliches anvertraut – etwas, das nur sie wissen sollte. Und jetzt scheint es die halbe Klasse zu kennen.',
        speaker: 'narrator',
        speakerEmoji: '📖',
        choices: [],
      },
      {
        id: 'v1-s4-feeling',
        text: 'Wie konnte sie das tun? Ich hab ihr vertraut! Das war unser Geheimnis! Wut und Enttäuschung vermischen sich zu einem riesigen Knoten in deiner Brust. Es fühlt sich an, als hätte dir jemand den Boden unter den Füßen weggezogen.',
        speaker: 'player',
        speakerEmoji: '💭',
        choices: [],
      },
      {
        id: 'v1-s4-scene',
        text: 'Du siehst Mia am anderen Ende des Flurs. Sie hat dich noch nicht bemerkt. Dein Herz hämmert.',
        speaker: 'narrator',
        speakerEmoji: '🌋',
        choices: [],
      },
      {
        id: 'v1-s4-choice',
        text: 'Was tust du?',
        speaker: 'narrator',
        speakerEmoji: '🌋',
        choices: [
          {
            id: 'v1-s4-c-aggressive',
            text: 'Zu Mia stürmen und sie vor allen anschreien: «Wie konntest du das tun?!»',
            consequence:
              'Du stürmst zu Mia und schreist sie an: «Du hast mein Geheimnis verraten! Ich vertraue dir nie wieder!» Mia erschrickt und wird auch laut. Alle im Flur starren euch an. Am Ende stehst du da, immer noch wütend, und das Geheimnis ist jetzt noch öffentlicher als vorher. Mia weint. Deine Wut war berechtigt – aber der Weg, sie rauszulassen, hat die Situation für euch beide schlimmer gemacht.',
            empathyPoints: 0,
            insightPoints: 0,
            couragePoints: 1,
            nextSceneId: null,
          },
          {
            id: 'v1-s4-c-end-friendship',
            text: 'Beschließen, dass die Freundschaft vorbei ist. Ab sofort ignorierst du Mia komplett.',
            consequence:
              'Du beschließt: Das war es. Freundschaft beendet. In den nächsten Tagen ignorierst du Mia komplett. Sie versucht ein paarmal, mit dir zu reden, aber du gehst jedes Mal weg. Die Wut wird weniger, aber an ihre Stelle tritt etwas anderes – Traurigkeit. Ihr wart lange beste Freundinnen. Manchmal tun Menschen, die wir mögen, Dinge, die uns verletzen. Das heißt nicht, dass du verzeihen musst – aber ohne ein Gespräch wirst du nie erfahren, warum sie es getan hat.',
            empathyPoints: 0,
            insightPoints: 1,
            couragePoints: 1,
            nextSceneId: null,
          },
          {
            id: 'v1-s4-c-imessage',
            text: 'Mia zur Seite nehmen und mit Ich-Botschaften sagen, wie du dich fühlst.',
            consequence:
              'Du gehst zu Mia, nimmst sie zur Seite und sagst: «Mia, ich muss mit dir reden. Ich habe gehört, dass du anderen von meinem Geheimnis erzählt hast. Ich fühle mich total verletzt und verraten, weil ich dir vertraut habe.» Mia wird blass. «Es tut mir wirklich leid», sagt sie. «Mir ist es irgendwie rausgerutscht, und dann konnte ich es nicht mehr zurücknehmen. Das war nicht okay von mir.» Das Gespräch ist nicht einfach, aber Ich-Botschaften helfen dabei, deine Gefühle auszudrücken, ohne den anderen komplett anzugreifen. So hat ein Gespräch die Chance, ein Gespräch zu bleiben – und kein Streit zu werden.',
            empathyPoints: 3,
            insightPoints: 3,
            couragePoints: 3,
            nextSceneId: null,
          },
          {
            id: 'v1-s4-c-cooldown',
            text: 'Erstmal abkühlen. Du gehst woanders hin und sprichst später mit Mia, wenn du ruhiger bist.',
            consequence:
              'Du merkst: Gerade bist du zu aufgewühlt für ein vernünftiges Gespräch. Du gehst in den Pausenraum und setzt dich hin. Langsam ordnest du deine Gedanken. Was willst du Mia eigentlich sagen? Wie fühlst du dich wirklich? Nach der Schule schreibst du Mia eine Nachricht: «Ich muss mit dir reden. Können wir uns morgen treffen?» Das Gespräch am nächsten Tag ist ehrlich und ruhig. Sich Zeit zum Abkühlen zu nehmen ist kein Weglaufen – es ist ein Zeichen von Stärke. Du gibst deinem klugen Kopf die Chance, mitzureden, bevor nur die Wut das Wort hat.',
            empathyPoints: 2,
            insightPoints: 2,
            couragePoints: 2,
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

export const volcanoWisdomCards: WisdomCard[] = [
  {
    id: 'volcano-wisdom-1',
    islandId: 'volcano',
    text: 'Wut ist ein normales Gefühl – sie zeigt dir, dass dir etwas wichtig ist.',
    category: 'emotion',
    collected: false,
  },
  {
    id: 'volcano-wisdom-2',
    islandId: 'volcano',
    text: 'Tief durchatmen gibt deinem Gehirn Zeit, klug zu reagieren statt nur zu reagieren.',
    category: 'strategy',
    collected: false,
  },
  {
    id: 'volcano-wisdom-3',
    islandId: 'volcano',
    text: 'Wut ist okay – Gewalt ist es nicht. Du hast immer die Wahl, wie du reagierst.',
    category: 'insight',
    collected: false,
  },
  {
    id: 'volcano-wisdom-4',
    islandId: 'volcano',
    text: 'Hilfe holen ist kein Petzen. Es gehört echte Stärke dazu, sich Unterstützung zu suchen.',
    category: 'courage',
    collected: false,
  },
  {
    id: 'volcano-wisdom-5',
    islandId: 'volcano',
    text: 'Unter Wut verstecken sich oft andere Gefühle – Traurigkeit, Angst oder Enttäuschung. Es lohnt sich, genauer hinzuschauen.',
    category: 'emotion',
    collected: false,
  },
  {
    id: 'volcano-wisdom-6',
    islandId: 'volcano',
    text: 'Ich-Botschaften sind wie Brücken: «Ich fühle mich verletzt, weil …» öffnet Türen, die «Du bist schuld!» zuschlägt.',
    category: 'strategy',
    collected: false,
  },
  {
    id: 'volcano-wisdom-7',
    islandId: 'volcano',
    text: 'Dein Gedanken-Detektor hilft dir: Nur weil du etwas denkst, heißt das nicht, dass es stimmt. Gedanken sind keine Fakten.',
    category: 'insight',
    collected: false,
  },
  {
    id: 'volcano-wisdom-8',
    islandId: 'volcano',
    text: 'Sich Zeit zum Abkühlen zu nehmen ist kein Weglaufen – es ist klug. Dein Kopf denkt besser, wenn der Vulkan nicht gerade ausbricht.',
    category: 'strategy',
    collected: false,
  },
  {
    id: 'volcano-wisdom-9',
    islandId: 'volcano',
    text: 'Mut heißt nicht, keine Angst zu haben. Mut heißt, trotz der Angst das Richtige zu versuchen.',
    category: 'courage',
    collected: false,
  },
  {
    id: 'volcano-wisdom-10',
    islandId: 'volcano',
    text: 'Jeder Mensch hat einen inneren Vulkan. Die Frage ist nicht, ob er ausbricht – sondern ob du lernst, ihn zu steuern.',
    category: 'insight',
    collected: false,
  },
  {
    id: 'volcano-wisdom-11',
    islandId: 'volcano',
    text: 'Gefühle sind wie Wellen: Sie kommen und gehen. Auch die stärkste Wut hält nicht ewig an, wenn du sie nicht weiter fütterst.',
    category: 'emotion',
    collected: false,
  },
  {
    id: 'volcano-wisdom-12',
    islandId: 'volcano',
    text: 'Für sich selbst einstehen und dabei ruhig bleiben – das ist eine Superkraft, die du trainieren kannst.',
    category: 'courage',
    collected: false,
  },
];

// =============================================================================
// 3. ACTIVITIES
// =============================================================================

export const volcanoActivities: VolcanoActivity[] = [
  {
    id: 'volcano-activity-breathing',
    islandId: 'volcano',
    type: 'breathing',
    title: 'Vulkan-Atemübung',
    description:
      'Lerne die 4-7-8 Atemtechnik – sie hilft dir, den inneren Vulkan abzukühlen, bevor er ausbricht. Ärzte und Therapeuten empfehlen diese Übung, weil sie dein Nervensystem beruhigt.',
    instructions: [
      'Setz dich bequem hin oder stell dich locker hin. Lass die Schultern fallen.',
      'Schließe die Augen, wenn du magst – oder such dir einen ruhigen Punkt, den du anschaust.',
      'Atme langsam durch die Nase ein und zähle dabei in Gedanken bis 4.',
      'Halte den Atem an und zähle bis 7. Keine Sorge, das klappt mit der Übung immer besser.',
      'Atme ganz langsam durch den Mund aus und zähle bis 8. Stell dir vor, wie der Vulkan in dir Dampf ablässt.',
      'Wiederhole das Ganze 3 bis 4 Mal.',
      'Spüre nach: Wie fühlt sich dein Körper jetzt an? Ist die Wut ein bisschen kleiner geworden?',
    ],
    completed: false,
  },
  {
    id: 'volcano-activity-thermometer',
    islandId: 'volcano',
    type: 'assessment',
    title: 'Wut-Thermometer',
    description:
      'Wie heiß ist dein innerer Vulkan gerade? Mit dem Wut-Thermometer lernst du, deine Wut auf einer Skala von 1 bis 10 einzuschätzen – und herauszufinden, wann du handeln solltest.',
    instructions: [
      'Denk an eine Situation, die dich in letzter Zeit wütend gemacht hat. Stell sie dir möglichst genau vor.',
      'Wie wütend warst du? Gib deiner Wut eine Zahl von 1 bis 10. (1 = kaum spürbar, 5 = mittelmäßig brodeln, 10 = Vulkanausbruch)',
      'Achte auf deinen Körper: Ab welcher Stufe merkst du Veränderungen? Zum Beispiel schnellerer Herzschlag, heiße Ohren, geballte Fäuste?',
      'Das sind deine persönlichen Warnsignale – sie sagen dir: «Achtung, der Vulkan wird aktiv!»',
      'Überlege: Was hilft dir bei Stufe 3? Was bei Stufe 6? Was bei Stufe 9?',
      'Schreib dir für jede Stufe einen Trick auf. Je früher du reagierst, desto leichter ist es, die Wut zu steuern.',
    ],
    completed: false,
  },
  {
    id: 'volcano-activity-cooldown-toolkit',
    islandId: 'volcano',
    type: 'creative',
    title: 'Cool-Down Toolkit',
    description:
      'Bau dir dein persönliches Notfall-Set gegen Wut! Jeder Mensch hat andere Dinge, die helfen. Finde heraus, was bei dir funktioniert.',
    instructions: [
      'Überlege: Was hat dir schon einmal geholfen, dich zu beruhigen, wenn du richtig wütend warst?',
      'Schreibe mindestens 5 Dinge auf, die dir guttun könnten. Zum Beispiel: Musik hören, rennen, einen Ball kneten, kaltes Wasser über die Hände laufen lassen, mit jemandem reden, etwas zeichnen …',
      'Sortiere deine Liste: Was hilft schnell unterwegs (z.B. in der Schule)? Was hilft zu Hause?',
      'Erstelle deine persönliche Cool-Down-Karte – schreib deine Top-5-Strategien auf eine Karte oder in dein Handy.',
      'Tipp: Häng die Karte dort auf, wo du sie sehen kannst, wenn du sie brauchst. Im Vulkan-Moment vergisst man leicht die guten Ideen.',
    ],
    completed: false,
  },
];

// =============================================================================
// 4. NPCs
// =============================================================================

export const volcanoNPCs: NPC[] = [
  {
    id: 'volcano-npc-flamara',
    name: 'Flamara',
    emoji: '🔥',
    description:
      'Die Wächterin des Vulkans. Flamara ist eine feurige Gestalt mit warmem Lächeln, die den Vulkan seit Jahrhunderten hütet. Sie weiß alles über die Kraft der Wut – und wie man sie lenkt, statt von ihr überrollt zu werden.',
    backstory:
      'Flamara war nicht immer so gelassen. Als junge Vulkan-Wächterin ließ sie ihre Wut frei heraus – ganze Landstriche wurden von ihren Ausbrüchen versengt. Erst als sie lernte, dass ihre Kraft auch wärmen und beschützen kann, fand sie ihr Gleichgewicht. Heute hilft sie jedem, der auf die Vulkaninsel kommt, die eigene innere Flamme zu verstehen. Ihr Lieblingssatz: «Feuer zerstört – oder es leuchtet. Du entscheidest.»',
  },
  {
    id: 'volcano-npc-ash',
    name: 'Ash',
    emoji: '🌑',
    description:
      'Ein Teenager, der oft Ärger bekommt, weil seine Wut mit ihm durchgeht. Ash ist eigentlich ein netter Typ – aber wenn er sich ungerecht behandelt fühlt, explodiert er.',
    backstory:
      'Ash lebt am Fuß des Vulkans und kennt das Gefühl, wenn alles in einem hochkocht, nur zu gut. In der Schule hatte er ständig Stress: Prügeleien, Nachsitzen, Ärger mit Lehrkräften. Alle sagten, er sei ein «Problemkind». Aber seit er Flamara getroffen hat, lernt er Stück für Stück, seine Wut zu verstehen, statt sie nur rauszuschreien. Er ist noch mittendrin in diesem Prozess – und genau deshalb kann er so gut nachfühlen, wie es dir geht. Ash sagt gern: «Ich bin kein Vulkan, der nur ausbricht. Ich lerne gerade, mein eigenes Feuer zu steuern.»',
  },
];
