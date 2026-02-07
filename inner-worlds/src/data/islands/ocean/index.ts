// =============================================================================
// Inner Worlds - Ozean-Insel (Ocean Island)
// Thema: Traurigkeit & Umgang mit schwierigen Gefuehlen
// Alle Texte auf Deutsch, geschrieben fuer 10-15-Jaehrige
// =============================================================================

import type { Scenario, WisdomCard, Activity } from '../../../types';

// -----------------------------------------------------------------------------
// NPC Interface (island-specific)
// -----------------------------------------------------------------------------

export interface OceanNPC {
  id: string;
  name: string;
  emoji: string;
  description: string;
  backstory: string;
}

// -----------------------------------------------------------------------------
// Extended Activity with instructions (ocean-specific)
// -----------------------------------------------------------------------------

export interface OceanActivity extends Activity {
  instructions: string[];
}

// =============================================================================
// 1. SCENARIOS
// =============================================================================

export const oceanScenarios: Scenario[] = [
  // ---------------------------------------------------------------------------
  // Szenario 1: Abschied nehmen
  // ---------------------------------------------------------------------------
  {
    id: 'ocean-scenario-1',
    islandId: 'ocean',
    title: 'Abschied nehmen',
    description:
      'Dein geliebtes Haustier ist gestorben. Wie gehst du mit dem Verlust um, und welche Reaktionen deiner Mitmenschen helfen dir wirklich?',
    scenes: [
      {
        id: 'ocean-s1-scene-1',
        text: 'Heute Morgen ist dein Hamster Kruemel nicht mehr aufgewacht. Du hast ihn seit drei Jahren gehabt -- er war jeden Tag fuer dich da. Dein Herz fuehlt sich ganz schwer an, als du vor seinem leeren Kaefig stehst. In deinen Augen brennen Traenen.',
        speaker: 'Erzaehler',
        speakerEmoji: '\u{1F30A}',
        choices: [
          {
            id: 'ocean-s1-c1a',
            text: 'Ich lasse die Traenen zu und weine um Kruemel.',
            consequence:
              'Die Traenen fliessen, und das ist gut so. Jede einzelne zeigt, wie viel dir Kruemel bedeutet hat. Trauer ist ein Zeichen von Liebe.',
            empathyPoints: 2,
            insightPoints: 3,
            couragePoints: 1,
            nextSceneId: 'ocean-s1-scene-2',
          },
          {
            id: 'ocean-s1-c1b',
            text: 'Ich versuche, nicht daran zu denken, und gehe einfach zur Schule.',
            consequence:
              'Du packst deinen Rucksack und gehst los. Aber das schwere Gefuehl bleibt. Es laesst sich nicht so leicht wegschieben, und das ist normal.',
            empathyPoints: 0,
            insightPoints: 1,
            couragePoints: 1,
            nextSceneId: 'ocean-s1-scene-2',
          },
          {
            id: 'ocean-s1-c1c',
            text: 'Ich erzaehle meiner Mutter davon, bevor ich gehe.',
            consequence:
              'Deine Mutter nimmt dich in den Arm. "Es tut mir so leid, Schatz", sagt sie leise. Es hilft, nicht allein damit zu sein.',
            empathyPoints: 2,
            insightPoints: 2,
            couragePoints: 2,
            nextSceneId: 'ocean-s1-scene-2',
          },
        ],
      },
      {
        id: 'ocean-s1-scene-2',
        text: 'In der grossen Pause erzaehlst du deiner Freundin Lena, was passiert ist. Sie schaut dich mitfuehlend an. Aber Max, der neben euch steht, hat es gehoert.',
        speaker: 'Erzaehler',
        speakerEmoji: '\u{1F30A}',
        choices: [
          {
            id: 'ocean-s1-c2a',
            text: 'Ich hoere zu, was Max sagt.',
            consequence:
              'Max zuckt die Schultern: "War doch nur ein Hamster. Hol dir halt einen neuen." Diese Worte tun weh, obwohl er es vielleicht nicht boese meint.',
            empathyPoints: 1,
            insightPoints: 2,
            couragePoints: 0,
            nextSceneId: 'ocean-s1-scene-3',
          },
          {
            id: 'ocean-s1-c2b',
            text: 'Ich bitte Max, uns allein zu lassen.',
            consequence:
              '"Hey Max, das ist gerade privat." Max zieht ab. Lena sagt: "Das war mutig. Erzaehl weiter, ich hoere dir zu." Du fuehlst dich ein kleines bisschen besser, weil jemand wirklich zuhoert.',
            empathyPoints: 1,
            insightPoints: 2,
            couragePoints: 3,
            nextSceneId: 'ocean-s1-scene-3',
          },
        ],
      },
      {
        id: 'ocean-s1-scene-3',
        text: 'Lena sagt leise: "Ich finde es total verstaendlich, dass du traurig bist. Kruemel war dein Freund." Max dagegen sagt: "Stell dich nicht so an, ist ja nicht so schlimm." Welche Reaktion hilft dir mehr?',
        speaker: 'Marina',
        speakerEmoji: '\u{1F9DC}\u{200D}\u{2640}\u{FE0F}',
        choices: [
          {
            id: 'ocean-s1-c3a',
            text: 'Lenas Worte helfen mir. Sie nimmt meine Gefuehle ernst.',
            consequence:
              'Genau. Wenn jemand sagt "Ich verstehe, dass du traurig bist", fuehlt man sich gesehen. Lena zeigt echtes Mitgefuehl -- sie wertet deine Trauer nicht ab.',
            empathyPoints: 3,
            insightPoints: 3,
            couragePoints: 0,
            nextSceneId: 'ocean-s1-scene-4',
          },
          {
            id: 'ocean-s1-c3b',
            text: 'Vielleicht hat Max recht und ich uebertreibe.',
            consequence:
              'Halt -- du uebertreibst nicht. Jeder Verlust darf wehtun, egal ob es ein Hamster, ein Hund oder ein Mensch ist. Wenn dir jemand wichtig war, dann ist Trauer die natuerlichste Reaktion der Welt.',
            empathyPoints: 1,
            insightPoints: 3,
            couragePoints: 1,
            nextSceneId: 'ocean-s1-scene-4',
          },
          {
            id: 'ocean-s1-c3c',
            text: 'Ich sage Max, dass seine Worte verletzend sind.',
            consequence:
              '"Max, das tut weh, wenn du sagst, es ist nicht schlimm. Fuer mich ist es das." Max wird still und sagt dann leiser: "Sorry, ich wusste nicht, was ich sagen soll." Manchmal sagen Leute ungeschickte Dinge, weil sie selbst nicht wissen, wie man mit Trauer umgeht.',
            empathyPoints: 2,
            insightPoints: 3,
            couragePoints: 3,
            nextSceneId: 'ocean-s1-scene-4',
          },
        ],
      },
      {
        id: 'ocean-s1-scene-4',
        text: 'Am Abend sitzt du auf deinem Bett. Der leere Kaefig steht noch da. Die Traurigkeit ist immer noch da, aber sie fuehlt sich anders an als heute Morgen -- ein bisschen weicher, weniger scharfkantig.',
        speaker: 'Tiefgang',
        speakerEmoji: '\u{1F40B}',
        choices: [
          {
            id: 'ocean-s1-c4a',
            text: 'Ich male ein Bild von Kruemel, um mich an ihn zu erinnern.',
            consequence:
              'Du malst Kruemel mit seinen grossen Augen und dem einen braunen Ohr. Waehrend du malst, musst du laecheln und weinen gleichzeitig. Das Bild wird deine Erinnerung bewahren.',
            empathyPoints: 1,
            insightPoints: 2,
            couragePoints: 2,
            nextSceneId: 'ocean-s1-scene-5',
          },
          {
            id: 'ocean-s1-c4b',
            text: 'Ich schreibe in mein Tagebuch, was Kruemel fuer mich bedeutet hat.',
            consequence:
              'Du schreibst ueber die lustigen Momente, als Kruemel in seinem Rad gerannt ist, und ueber die stillen Abende, an denen er auf deinem Schoss geschlafen hat. Worte koennen helfen, Erinnerungen festzuhalten.',
            empathyPoints: 1,
            insightPoints: 3,
            couragePoints: 1,
            nextSceneId: 'ocean-s1-scene-5',
          },
          {
            id: 'ocean-s1-c4c',
            text: 'Ich rede noch einmal mit meiner Mutter darueber.',
            consequence:
              'Deine Mutter setzt sich zu dir und erzaehlt, wie traurig sie war, als ihr Hund als Kind gestorben ist. "Trauer geht nicht einfach weg", sagt sie. "Aber mit der Zeit wird sie leiser." Es tut gut zu wissen, dass auch Erwachsene solche Gefuehle kennen.',
            empathyPoints: 2,
            insightPoints: 2,
            couragePoints: 2,
            nextSceneId: 'ocean-s1-scene-5',
          },
        ],
      },
      {
        id: 'ocean-s1-scene-5',
        text: 'Ein paar Tage spaeter denkst du an Kruemel, und es tut immer noch weh -- aber nicht mehr so stark. Du merkst: Trauer ist wie eine Welle. Manchmal kommt sie gross und ueberwaetigend, manchmal ist sie nur ein leises Rauschen. Und beides ist voellig okay.',
        speaker: 'Marina',
        speakerEmoji: '\u{1F9DC}\u{200D}\u{2640}\u{FE0F}',
        choices: [
          {
            id: 'ocean-s1-c5a',
            text: 'Ich werde Kruemel nie vergessen -- und das ist gut so.',
            consequence:
              'Die Erinnerung an Kruemel wird immer ein Teil von dir sein. Und die Liebe, die du fuer ihn empfunden hast, zeigt, wie gross dein Herz ist. Du hast gelernt: Trauer ist der Preis der Liebe, und dieser Preis ist es wert.',
            empathyPoints: 2,
            insightPoints: 3,
            couragePoints: 1,
            nextSceneId: null,
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Szenario 2: Das neue Kind
  // ---------------------------------------------------------------------------
  {
    id: 'ocean-scenario-2',
    islandId: 'ocean',
    title: 'Das neue Kind',
    description:
      'Ein neues Kind in deiner Klasse wirkt traurig und allein. Was tust du?',
    scenes: [
      {
        id: 'ocean-s2-scene-1',
        text: 'Seit einer Woche sitzt ein neues Maedchen in eurer Klasse. Sie heisst Amira. In den Pausen steht sie meistens allein am Rand des Schulhofs und schaut auf den Boden. Heute in der Mittagspause sitzt sie wieder allein an einem Tisch.',
        speaker: 'Erzaehler',
        speakerEmoji: '\u{1F30A}',
        choices: [
          {
            id: 'ocean-s2-c1a',
            text: 'Ich gehe zu Amira und setze mich zu ihr.',
            consequence:
              'Du nimmst dein Tablett und setzt dich gegenueber. Amira schaut ueberrascht auf. "Hi", sagst du. "Darf ich hier sitzen?" Sie nickt zaghaft.',
            empathyPoints: 3,
            insightPoints: 1,
            couragePoints: 3,
            nextSceneId: 'ocean-s2-scene-2a',
          },
          {
            id: 'ocean-s2-c1b',
            text: 'Ich beobachte sie erstmal weiter -- vielleicht will sie lieber allein sein.',
            consequence:
              'Du beobachtest Amira. Sie schaut immer wieder kurz hoch, als wuerde sie hoffen, dass jemand kommt. Dann senkt sie den Blick wieder. Es sieht nicht so aus, als wuerde sie freiwillig allein sitzen.',
            empathyPoints: 1,
            insightPoints: 2,
            couragePoints: 0,
            nextSceneId: 'ocean-s2-scene-2b',
          },
          {
            id: 'ocean-s2-c1c',
            text: 'Ich sage meinen Freunden, dass wir Amira einladen sollten.',
            consequence:
              'Du sagst zu deiner Gruppe: "Hey, sollen wir Amira fragen, ob sie zu uns kommen will?" Ein paar zucken die Schultern, aber Lena sagt: "Gute Idee, gehen wir zusammen hin."',
            empathyPoints: 3,
            insightPoints: 2,
            couragePoints: 2,
            nextSceneId: 'ocean-s2-scene-3',
          },
        ],
      },
      {
        id: 'ocean-s2-scene-2a',
        text: 'Amira ist zunaechst sehr still. Aber dann fragst du sie nach ihrem Lieblingsessen, und sie murmelt: "Ich mag Falafel." Du laechelst und sagst: "Cool, ich auch!" Ein winziges Laecheln huscht ueber ihr Gesicht.',
        speaker: 'Erzaehler',
        speakerEmoji: '\u{1F30A}',
        choices: [
          {
            id: 'ocean-s2-c2a-a',
            text: 'Ich frage, wie es ihr in der neuen Schule geht.',
            consequence:
              'Amira zoegert, dann sagt sie leise: "Es ist alles so anders hier. Ich vermisse meine alte Schule und meine Freunde." Du hoerst einfach zu, ohne etwas zu sagen. Manchmal ist zuhoeren das Beste, was man tun kann.',
            empathyPoints: 3,
            insightPoints: 2,
            couragePoints: 1,
            nextSceneId: 'ocean-s2-scene-4',
          },
          {
            id: 'ocean-s2-c2a-b',
            text: 'Ich erzaehle ihr etwas ueber unsere Klasse, damit sie sich weniger fremd fuehlt.',
            consequence:
              'Du erzaehlst ihr von der coolen Kunstlehrerin, vom lustigen Klassenhamster und davon, dass freitags immer Pizza in der Mensa gibt. Amira hoert aufmerksam zu, und ihre Schultern entspannen sich ein wenig.',
            empathyPoints: 2,
            insightPoints: 1,
            couragePoints: 1,
            nextSceneId: 'ocean-s2-scene-4',
          },
        ],
      },
      {
        id: 'ocean-s2-scene-2b',
        text: 'Marina, die Meerjungfrau, erscheint neben dir und sagt sanft: "Weisst du, manchmal warten traurige Menschen darauf, dass jemand den ersten Schritt macht. Es braucht nicht viel -- ein Laecheln, ein Hallo. Kleine Gesten koennen grosse Wellen schlagen."',
        speaker: 'Marina',
        speakerEmoji: '\u{1F9DC}\u{200D}\u{2640}\u{FE0F}',
        choices: [
          {
            id: 'ocean-s2-c2b-a',
            text: 'Okay, ich traue mich. Ich gehe zu Amira.',
            consequence:
              'Du stehst auf und gehst zu Amira. "Hey, ich bin es. Willst du dich zu uns setzen?" Amira schaut dich an, und in ihren Augen blitzt so etwas wie Erleichterung auf. "Wirklich?", fragt sie. "Ja, wirklich", sagst du.',
            empathyPoints: 3,
            insightPoints: 1,
            couragePoints: 3,
            nextSceneId: 'ocean-s2-scene-4',
          },
          {
            id: 'ocean-s2-c2b-b',
            text: 'Was, wenn sie mich ablehnt?',
            consequence:
              'Marina laechelt verstaendnisvoll: "Das kann passieren, und das waere okay. Aber die Chance, dass du ihren Tag besser machst, ist viel groesser als das Risiko. Und selbst wenn sie nein sagt -- du hast es versucht, und das zaehlt."',
            empathyPoints: 1,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: 'ocean-s2-scene-3',
          },
        ],
      },
      {
        id: 'ocean-s2-scene-3',
        text: 'Du und Lena geht zusammen zu Amiras Tisch. "Hey Amira, wir haben noch Platz bei uns. Willst du dich zu uns setzen?", fragt Lena freundlich. Amira zieht an ihrem Aermel und sagt leise: "Okay."',
        speaker: 'Erzaehler',
        speakerEmoji: '\u{1F30A}',
        choices: [
          {
            id: 'ocean-s2-c3a',
            text: 'Ich sorge dafuer, dass Amira sich in der Gruppe willkommen fuehlt.',
            consequence:
              'Du stellst Amira den anderen vor und achtest darauf, dass sie ins Gespraech einbezogen wird. Es dauert ein paar Minuten, aber dann lacht Amira zum ersten Mal leise mit. Es ist ein schoener Moment.',
            empathyPoints: 3,
            insightPoints: 2,
            couragePoints: 1,
            nextSceneId: 'ocean-s2-scene-4',
          },
          {
            id: 'ocean-s2-c3b',
            text: 'Ich lasse sie erstmal ankommen und draenge sie zu nichts.',
            consequence:
              'Du gibst Amira Raum. Sie sitzt einfach dabei und hoert zu. Manchmal braucht man erst einmal nur dazugehoeren, ohne gleich im Mittelpunkt zu stehen. Amira scheint erleichtert, einfach dabei sein zu duerfen.',
            empathyPoints: 3,
            insightPoints: 3,
            couragePoints: 0,
            nextSceneId: 'ocean-s2-scene-4',
          },
        ],
      },
      {
        id: 'ocean-s2-scene-4',
        text: 'Nach der Schule kommt Amira zu dir und sagt leise: "Danke. Du weisst gar nicht, wie viel das fuer mich bedeutet hat. Ich dachte, hier will niemand mit mir reden."',
        speaker: 'Amira',
        speakerEmoji: '\u{1F60A}',
        choices: [
          {
            id: 'ocean-s2-c4a',
            text: 'Ich sage ihr, dass sie jederzeit bei uns sitzen kann.',
            consequence:
              'Amira laechelt -- diesmal richtig. "Echt? Danke." Ihr wisst beide, dass dies der Anfang einer Freundschaft sein koennte. Manchmal reicht ein einziger Moment, um alles zu veraendern.',
            empathyPoints: 3,
            insightPoints: 2,
            couragePoints: 1,
            nextSceneId: 'ocean-s2-scene-5',
          },
          {
            id: 'ocean-s2-c4b',
            text: 'Ich frage sie, ob sie morgen zusammen zur Schule laufen will.',
            consequence:
              '"Ja, sehr gerne!", sagt Amira, und zum ersten Mal klingt ihre Stimme richtig froh. Ein gemeinsamer Schulweg -- das ist mehr als nur zusammen gehen. Es ist ein Zeichen: Du bist nicht allein.',
            empathyPoints: 3,
            insightPoints: 1,
            couragePoints: 2,
            nextSceneId: 'ocean-s2-scene-5',
          },
        ],
      },
      {
        id: 'ocean-s2-scene-5',
        text: 'Tiefgang, der alte Wal, taucht auf und brummt zufrieden: "Weisst du, was du heute gelernt hast? Dass eine kleine Geste -- ein Hallo, ein freier Platz, ein Laecheln -- die Welt fuer jemanden komplett veraendern kann. Nie unterschaetze die Kraft der Freundlichkeit."',
        speaker: 'Tiefgang',
        speakerEmoji: '\u{1F40B}',
        choices: [
          {
            id: 'ocean-s2-c5a',
            text: 'Ich werde in Zukunft mehr darauf achten, ob jemand allein ist.',
            consequence:
              'Das ist ein wundervoller Vorsatz. Die Welt braucht Menschen, die hinschauen und handeln. Du hast heute bewiesen, dass du so ein Mensch bist.',
            empathyPoints: 3,
            insightPoints: 3,
            couragePoints: 1,
            nextSceneId: null,
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Szenario 3: Die unsichtbare Wolke
  // ---------------------------------------------------------------------------
  {
    id: 'ocean-scenario-3',
    islandId: 'ocean',
    title: 'Die unsichtbare Wolke',
    description:
      'Seit Wochen fuehlt sich alles schwer und grau an, aber du weisst nicht warum. Was machst du mit diesem Gefuehl?',
    scenes: [
      {
        id: 'ocean-s3-scene-1',
        text: 'Seit einigen Wochen fuehlt sich alles irgendwie ... grau an. Nicht richtig traurig, aber auch nicht froh. Du hast keine Lust auf Dinge, die dir frueher Spass gemacht haben. Dein Skateboard steht in der Ecke, deine Buecher liegen ungelesen herum. Es ist, als wuerde eine unsichtbare Wolke ueber dir haengen.',
        speaker: 'Erzaehler',
        speakerEmoji: '\u{1F30A}',
        choices: [
          {
            id: 'ocean-s3-c1a',
            text: 'Ich versuche herauszufinden, warum ich mich so fuehle.',
            consequence:
              'Du denkst nach, aber du findest keinen klaren Grund. Nichts Schlimmes ist passiert. Es ist einfach ... da. Und das macht es besonders verwirrend.',
            empathyPoints: 0,
            insightPoints: 2,
            couragePoints: 1,
            nextSceneId: 'ocean-s3-scene-2',
          },
          {
            id: 'ocean-s3-c1b',
            text: 'Ich ignoriere das Gefuehl. Wird schon wieder.',
            consequence:
              'Du versuchst, es wegzuschieben, und manchmal klappt das fuer ein paar Stunden. Aber abends kommt die Wolke zurueck. Gefuehle lassen sich nicht auf Dauer ignorieren -- sie wollen gehoert werden.',
            empathyPoints: 0,
            insightPoints: 1,
            couragePoints: 0,
            nextSceneId: 'ocean-s3-scene-2',
          },
          {
            id: 'ocean-s3-c1c',
            text: 'Ich rede mit jemandem darueber.',
            consequence:
              'Du denkst darueber nach, mit wem du reden koenntest. Es braucht ein bisschen Mut, ueber Gefuehle zu sprechen, fuer die man keine Erklaerung hat. Aber der Gedanke, es zu versuchen, ist schon ein wichtiger Schritt.',
            empathyPoints: 1,
            insightPoints: 2,
            couragePoints: 3,
            nextSceneId: 'ocean-s3-scene-3',
          },
        ],
      },
      {
        id: 'ocean-s3-scene-2',
        text: 'Marina schwimmt neben dir her und sagt: "Weisst du, manchmal ist Traurigkeit wie Nebel im Ozean. Man sieht nicht klar, und man weiss nicht, woher er kommt. Aber das bedeutet nicht, dass etwas mit dir nicht stimmt. Manchmal gibt es keinen Grund -- und das ist okay."',
        speaker: 'Marina',
        speakerEmoji: '\u{1F9DC}\u{200D}\u{2640}\u{FE0F}',
        choices: [
          {
            id: 'ocean-s3-c2a',
            text: 'Es beruhigt mich, dass es okay ist, keinen Grund zu haben.',
            consequence:
              'Gefuehle brauchen nicht immer eine Erklaerung. Manchmal ist man einfach traurig, so wie man manchmal einfach muede ist. Das macht deine Gefuehle nicht weniger real oder wichtig.',
            empathyPoints: 1,
            insightPoints: 3,
            couragePoints: 0,
            nextSceneId: 'ocean-s3-scene-3',
          },
          {
            id: 'ocean-s3-c2b',
            text: 'Aber was soll ich dann machen, wenn ich den Grund nicht kenne?',
            consequence:
              'Marina antwortet: "Du musst den Grund nicht kennen, um dir Hilfe zu holen. Wenn du Bauchschmerzen hast, gehst du auch zum Arzt, ohne vorher genau zu wissen, was es ist. Bei Gefuehlen ist das genauso."',
            empathyPoints: 0,
            insightPoints: 3,
            couragePoints: 1,
            nextSceneId: 'ocean-s3-scene-3',
          },
        ],
      },
      {
        id: 'ocean-s3-scene-3',
        text: 'Du ueberlegst, mit wem du reden koenntest. Da gibt es verschiedene Moeglichkeiten: deine Eltern, die Schulsozialarbeiterin Frau Meier, dein bester Freund Jonas, oder du koenntest deine Gefuehle erstmal fuer dich aufschreiben.',
        speaker: 'Erzaehler',
        speakerEmoji: '\u{1F30A}',
        choices: [
          {
            id: 'ocean-s3-c3a',
            text: 'Ich rede mit meinen Eltern.',
            consequence:
              'Beim Abendessen sagst du: "Mama, Papa ... ich fuehle mich seit Wochen irgendwie komisch. Nicht richtig traurig, aber auch nicht gut." Dein Vater legt sein Handy weg und sagt: "Erzaehl mal." Und du merkst: Allein, dass jemand zuhoert, macht die Wolke schon ein bisschen heller.',
            empathyPoints: 1,
            insightPoints: 2,
            couragePoints: 3,
            nextSceneId: 'ocean-s3-scene-4',
          },
          {
            id: 'ocean-s3-c3b',
            text: 'Ich gehe zu Frau Meier, der Schulsozialarbeiterin.',
            consequence:
              'Du klopfst an ihre Tuer und sagst: "Ich weiss nicht genau, warum ich hier bin. Mir geht es nicht so gut." Frau Meier laechelt warm und sagt: "Du musst keinen Grund haben. Dass du hier bist, zeigt schon, dass du gut auf dich aufpasst." Es fuehlt sich an wie eine Erleichterung.',
            empathyPoints: 1,
            insightPoints: 2,
            couragePoints: 3,
            nextSceneId: 'ocean-s3-scene-4',
          },
          {
            id: 'ocean-s3-c3c',
            text: 'Ich schreibe meine Gefuehle erstmal auf.',
            consequence:
              'Du oeffnest ein Heft und schreibst einfach drauflos. "Ich weiss nicht, warum ich traurig bin. Alles fuehlt sich schwer an ..." Mit jedem Satz wird es klarer. Nicht unbedingt der Grund, aber das Gefuehl selbst. Schreiben ist wie ein Gespraech mit dir selbst.',
            empathyPoints: 0,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: 'ocean-s3-scene-4',
          },
          {
            id: 'ocean-s3-c3d',
            text: 'Ich erzaehle es meinem besten Freund Jonas.',
            consequence:
              'Jonas hoert dir zu und sagt: "Hey, das klingt nicht gut. Ich weiss nicht, was ich sagen soll, aber ich bin fuer dich da. Wollen wir morgen zusammen was machen?" Manchmal ist die beste Antwort auf Traurigkeit einfach: Ich bin da.',
            empathyPoints: 2,
            insightPoints: 1,
            couragePoints: 3,
            nextSceneId: 'ocean-s3-scene-4',
          },
        ],
      },
      {
        id: 'ocean-s3-scene-4',
        text: 'Ein paar Tage spaeter merkst du: Die Wolke ist noch da, aber sie ist nicht mehr ganz so dunkel. Du hast angefangen, ueber deine Gefuehle zu reden, und das hat geholfen. Es ist noch nicht alles gut, aber es geht in die richtige Richtung.',
        speaker: 'Erzaehler',
        speakerEmoji: '\u{1F30A}',
        choices: [
          {
            id: 'ocean-s3-c4a',
            text: 'Ich mache weiter und rede auch in Zukunft ueber meine Gefuehle.',
            consequence:
              'Du nimmst dir vor, regelmaessig mit jemandem zu reden. Es muss nicht jeden Tag sein, aber du weisst jetzt: Fuer sich behalten macht Gefuehle schwerer. Teilen macht sie leichter.',
            empathyPoints: 1,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: 'ocean-s3-scene-5',
          },
          {
            id: 'ocean-s3-c4b',
            text: 'Was, wenn die Wolke nicht weggeht?',
            consequence:
              'Marina sagt sanft: "Wenn die Wolke nach ein paar Wochen nicht heller wird, dann ist es Zeit, sich professionelle Hilfe zu holen. Das ist kein Zeichen von Schwaeche -- das ist klug. Auch Erwachsene brauchen manchmal Unterstuetzung."',
            empathyPoints: 0,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: 'ocean-s3-scene-5',
          },
        ],
      },
      {
        id: 'ocean-s3-scene-5',
        text: 'Tiefgang taucht langsam aus der Tiefe auf und sagt: "Ich habe in meinem langen Leben gelernt: Um Hilfe zu bitten ist eines der mutigsten Dinge, die man tun kann. Es bedeutet, dass du dir selbst wichtig genug bist, um fuer dich einzustehen. Das ist echte Staerke."',
        speaker: 'Tiefgang',
        speakerEmoji: '\u{1F40B}',
        choices: [
          {
            id: 'ocean-s3-c5a',
            text: 'Ich merke mir: Hilfe holen ist Staerke, nicht Schwaeche.',
            consequence:
              'Diesen Satz darfst du dir ganz fest merken. Denn er ist wahr. Die staerksten Menschen sind nicht die, die alles alleine schaffen, sondern die, die wissen, wann sie Unterstuetzung brauchen.',
            empathyPoints: 1,
            insightPoints: 3,
            couragePoints: 3,
            nextSceneId: null,
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Szenario 4: Streit zu Hause
  // ---------------------------------------------------------------------------
  {
    id: 'ocean-scenario-4',
    islandId: 'ocean',
    title: 'Streit zu Hause',
    description:
      'Deine Eltern streiten sich in letzter Zeit oft. Wie gehst du mit den Gefuehlen um, die das in dir ausloest?',
    scenes: [
      {
        id: 'ocean-s4-scene-1',
        text: 'Es ist Abend. Du sitzt in deinem Zimmer und versuchst, Hausaufgaben zu machen, aber du kannst dich nicht konzentrieren. Aus dem Wohnzimmer hoerst du wieder die lauten Stimmen deiner Eltern. Sie streiten sich -- schon zum dritten Mal diese Woche. Dein Magen zieht sich zusammen.',
        speaker: 'Erzaehler',
        speakerEmoji: '\u{1F30A}',
        choices: [
          {
            id: 'ocean-s4-c1a',
            text: 'Ich setze mir Kopfhoerer auf und hoere Musik.',
            consequence:
              'Die Musik uebertoebt die Stimmen, und fuer einen Moment kannst du durchatmen. Es ist okay, dich zu schuetzen und dir eine Pause von den Gefuehlen zu goennen.',
            empathyPoints: 0,
            insightPoints: 2,
            couragePoints: 1,
            nextSceneId: 'ocean-s4-scene-2',
          },
          {
            id: 'ocean-s4-c1b',
            text: 'Ich gehe ins Wohnzimmer und versuche, den Streit zu schlichten.',
            consequence:
              'Du gehst ins Wohnzimmer und sagst: "Bitte hoert auf zu streiten!" Deine Eltern schauen dich ueberrascht an. Es wird kurz still, aber du merkst: Die Spannung ist nicht weg. Es fuehlt sich an, als wuerdest du etwas tragen, das nicht deins ist.',
            empathyPoints: 1,
            insightPoints: 1,
            couragePoints: 2,
            nextSceneId: 'ocean-s4-scene-2',
          },
          {
            id: 'ocean-s4-c1c',
            text: 'Ich schreibe meiner Tante eine Nachricht.',
            consequence:
              'Du tippst: "Tante Sara, kannst du mich morgen anrufen? Ich brauch jemanden zum Reden." Es tut gut, zu wissen, dass es da draussen noch andere Menschen gibt, die fuer dich da sind.',
            empathyPoints: 1,
            insightPoints: 2,
            couragePoints: 3,
            nextSceneId: 'ocean-s4-scene-2',
          },
        ],
      },
      {
        id: 'ocean-s4-scene-2',
        text: 'Marina erscheint und setzt sich neben dich. "Das ist wirklich schwer", sagt sie leise. "Wenn Eltern sich streiten, kann sich das anfuehlen, als wuerde deine ganze Welt wackeln. Ich moechte dir etwas Wichtiges sagen: Der Streit deiner Eltern ist nicht deine Schuld."',
        speaker: 'Marina',
        speakerEmoji: '\u{1F9DC}\u{200D}\u{2640}\u{FE0F}',
        choices: [
          {
            id: 'ocean-s4-c2a',
            text: 'Aber vielleicht streiten sie wegen mir?',
            consequence:
              'Marina schuettelt sanft den Kopf: "Nein. Erwachsene streiten ueber Erwachsenen-Dinge. Selbst wenn dein Name mal faellt -- der Streit handelt von ihren Problemen, nicht von dir. Du bist ein Kind, und es ist nicht deine Aufgabe, die Probleme deiner Eltern zu loesen."',
            empathyPoints: 0,
            insightPoints: 3,
            couragePoints: 1,
            nextSceneId: 'ocean-s4-scene-3',
          },
          {
            id: 'ocean-s4-c2b',
            text: 'Ich habe solche Angst, dass sie sich trennen.',
            consequence:
              'Marina sagt: "Diese Angst ist voellig verstaendlich. Aber egal, was zwischen deinen Eltern passiert -- du wirst geliebt. Beide lieben dich, auch wenn sie gerade Probleme miteinander haben. Und was auch passiert, du wirst nicht allein sein."',
            empathyPoints: 1,
            insightPoints: 3,
            couragePoints: 1,
            nextSceneId: 'ocean-s4-scene-3',
          },
          {
            id: 'ocean-s4-c2c',
            text: 'Danke. Aber was kann ich tun?',
            consequence:
              'Marina laechelt: "Das Wichtigste ist, dass du auf dich selbst aufpasst. Du kannst den Streit deiner Eltern nicht loesen, aber du kannst dafuer sorgen, dass es dir so gut wie moeglich geht."',
            empathyPoints: 0,
            insightPoints: 2,
            couragePoints: 2,
            nextSceneId: 'ocean-s4-scene-3',
          },
        ],
      },
      {
        id: 'ocean-s4-scene-3',
        text: 'Am naechsten Tag in der Schule bist du muede und unkonzentriert. Deine Lehrerin fragt, ob alles okay ist. Was antwortest du?',
        speaker: 'Erzaehler',
        speakerEmoji: '\u{1F30A}',
        choices: [
          {
            id: 'ocean-s4-c3a',
            text: 'Ich sage: "Es ist gerade nicht so einfach zu Hause."',
            consequence:
              'Die Lehrerin nickt verstaendnisvoll und sagt: "Danke, dass du das sagst. Wenn du reden willst, bin ich da. Und Frau Meier von der Schulsozialarbeit auch." Es fuehlt sich gut an, ehrlich zu sein, ohne alles erzaehlen zu muessen.',
            empathyPoints: 1,
            insightPoints: 2,
            couragePoints: 3,
            nextSceneId: 'ocean-s4-scene-4',
          },
          {
            id: 'ocean-s4-c3b',
            text: 'Ich sage: "Alles gut" -- obwohl es das nicht ist.',
            consequence:
              'Die Lehrerin schaut dich kurz an, als wuerde sie dir nicht ganz glauben, aber sie draengt nicht. Manchmal ist man noch nicht bereit, darueber zu reden, und das ist okay. Aber vergiss nicht: Du musst es nicht fuer immer allein tragen.',
            empathyPoints: 0,
            insightPoints: 1,
            couragePoints: 0,
            nextSceneId: 'ocean-s4-scene-4',
          },
          {
            id: 'ocean-s4-c3c',
            text: 'Ich frage, ob ich kurz an die frische Luft kann.',
            consequence:
              'Die Lehrerin erlaubt es dir. Draussen holst du ein paar Mal tief Luft. Der Wind auf deiner Haut, der Himmel ueber dir -- fuer einen Moment ist die Welt ein bisschen weiter und der Druck auf deiner Brust ein bisschen leichter.',
            empathyPoints: 0,
            insightPoints: 2,
            couragePoints: 2,
            nextSceneId: 'ocean-s4-scene-4',
          },
        ],
      },
      {
        id: 'ocean-s4-scene-4',
        text: 'Deine Tante Sara ruft am Nachmittag an. "Hey Kleines, ich hab deine Nachricht bekommen. Was ist los?" Du erzaehlst ihr vom Streit deiner Eltern.',
        speaker: 'Tante Sara',
        speakerEmoji: '\u{1F469}',
        choices: [
          {
            id: 'ocean-s4-c4a',
            text: 'Ich erzaehle ihr, wie ich mich dabei fuehle.',
            consequence:
              '"Ich hab Angst und bin traurig, und manchmal bin ich auch wuetend, weil alles so ist", sagst du. Tante Sara hoert zu und sagt: "All diese Gefuehle machen Sinn. Und es ist stark von dir, sie mir zu erzaehlen." Du merkst, wie dir ein Stein vom Herzen faellt.',
            empathyPoints: 2,
            insightPoints: 2,
            couragePoints: 3,
            nextSceneId: 'ocean-s4-scene-5',
          },
          {
            id: 'ocean-s4-c4b',
            text: 'Ich frage sie, ob meine Eltern sich trennen werden.',
            consequence:
              'Tante Sara sagt ehrlich: "Das weiss ich nicht. Aber ich weiss, dass dich beide sehr lieben. Und egal was passiert -- du hast mich, du hast Oma und Opa, und du bist nicht allein. Versprochen." Es tut gut, diese Worte zu hoeren.',
            empathyPoints: 1,
            insightPoints: 2,
            couragePoints: 2,
            nextSceneId: 'ocean-s4-scene-5',
          },
        ],
      },
      {
        id: 'ocean-s4-scene-5',
        text: 'Tiefgang taucht auf und seine tiefe Stimme vibriert warm: "Wenn zu Hause Sturm ist, vergiss nie: Du bist nicht das Boot, das den Sturm ausloest. Du bist der Mensch, der lernt, sich bei Sturm in Sicherheit zu bringen. Kuemmere dich um dich. Such dir deine Menschen. Und vergiss nie: Du bist nicht schuld."',
        speaker: 'Tiefgang',
        speakerEmoji: '\u{1F40B}',
        choices: [
          {
            id: 'ocean-s4-c5a',
            text: 'Ich bin nicht schuld. Und ich darf mir Hilfe holen.',
            consequence:
              'Genau das. Du hast heute etwas sehr Wichtiges gelernt: Du kannst die Probleme der Erwachsenen nicht loesen, aber du kannst auf dich aufpassen. Du kannst dir Menschen suchen, die dir zuhoeren. Und du darfst alle Gefuehle fuehlen, die in dir aufkommen.',
            empathyPoints: 1,
            insightPoints: 3,
            couragePoints: 3,
            nextSceneId: 'ocean-s4-scene-6',
          },
        ],
      },
      {
        id: 'ocean-s4-scene-6',
        text: 'Spaeter am Abend kommt dein Vater in dein Zimmer. "Es tut mir leid, dass wir so laut waren", sagt er leise. "Das hat nichts mit dir zu tun. Wir haben dich lieb." Du spuerst, dass er es ernst meint. Die Wolke ist noch da, aber du weisst jetzt, dass sie nicht fuer immer bleiben wird.',
        speaker: 'Erzaehler',
        speakerEmoji: '\u{1F30A}',
        choices: [
          {
            id: 'ocean-s4-c6a',
            text: 'Ich sage meinem Vater, dass ich ihn auch lieb habe.',
            consequence:
              'Du umarmst ihn fest. In diesem Moment spuerst du: Auch wenn die Dinge gerade schwierig sind, gibt es Liebe in deinem Leben. Und manchmal ist Liebe der Anker, der dich durch den Sturm bringt.',
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

export const oceanWisdomCards: WisdomCard[] = [
  {
    id: 'ocean-wisdom-1',
    islandId: 'ocean',
    text: 'Traurigkeit ist wie eine Welle -- sie kommt und sie geht wieder. Du musst sie nicht festhalten, aber du darfst sie fuehlen.',
    category: 'emotion',
    collected: false,
  },
  {
    id: 'ocean-wisdom-2',
    islandId: 'ocean',
    text: 'Weinen ist keine Schwaeche. Es zeigt, dass du fuehlst -- und das ist eine Staerke.',
    category: 'courage',
    collected: false,
  },
  {
    id: 'ocean-wisdom-3',
    islandId: 'ocean',
    text: 'Du musst nicht immer wissen, warum du traurig bist. Manchmal ist das Gefuehl einfach da, und das ist okay.',
    category: 'insight',
    collected: false,
  },
  {
    id: 'ocean-wisdom-4',
    islandId: 'ocean',
    text: 'Um Hilfe zu bitten ist kein Zeichen von Schwaeche -- es ist eines der mutigsten Dinge, die du tun kannst.',
    category: 'courage',
    collected: false,
  },
  {
    id: 'ocean-wisdom-5',
    islandId: 'ocean',
    text: 'Wenn jemand traurig ist, braucht er oft keine Loesung, sondern jemanden, der einfach zuhoert.',
    category: 'strategy',
    collected: false,
  },
  {
    id: 'ocean-wisdom-6',
    islandId: 'ocean',
    text: 'Jeder Verlust darf wehtun -- egal wie klein er anderen erscheint. Deine Gefuehle sind immer gueltig.',
    category: 'emotion',
    collected: false,
  },
  {
    id: 'ocean-wisdom-7',
    islandId: 'ocean',
    text: 'Eine kleine Geste kann den ganzen Tag eines Menschen veraendern. Ein Laecheln, ein Hallo, ein freier Platz.',
    category: 'strategy',
    collected: false,
  },
  {
    id: 'ocean-wisdom-8',
    islandId: 'ocean',
    text: 'Es ist nicht deine Aufgabe, die Probleme der Erwachsenen zu loesen. Aber es ist deine Aufgabe, auf dich selbst aufzupassen.',
    category: 'insight',
    collected: false,
  },
  {
    id: 'ocean-wisdom-9',
    islandId: 'ocean',
    text: 'Trauer ist der Preis der Liebe. Und dieser Preis ist es wert.',
    category: 'emotion',
    collected: false,
  },
  {
    id: 'ocean-wisdom-10',
    islandId: 'ocean',
    text: 'Gefuehle fuer sich behalten macht sie schwerer. Gefuehle teilen macht sie leichter.',
    category: 'strategy',
    collected: false,
  },
  {
    id: 'ocean-wisdom-11',
    islandId: 'ocean',
    text: 'Die staerksten Menschen sind nicht die, die alles alleine schaffen, sondern die, die wissen, wann sie Hilfe brauchen.',
    category: 'courage',
    collected: false,
  },
  {
    id: 'ocean-wisdom-12',
    islandId: 'ocean',
    text: 'Auch an dunklen Tagen darfst du daran glauben: Die Sonne geht wieder auf. Immer.',
    category: 'insight',
    collected: false,
  },
];

// =============================================================================
// 3. ACTIVITIES
// =============================================================================

export const oceanActivities: OceanActivity[] = [
  {
    id: 'ocean-activity-1',
    islandId: 'ocean',
    type: 'creative',
    title: 'Gefuehlsflaschenpost',
    description:
      'Schreibe deine Gefuehle auf und schicke sie symbolisch aufs Meer hinaus. Manchmal hilft es, Dinge loszulassen, indem man sie in Worte fasst.',
    instructions: [
      'Setz dich an einen ruhigen Ort und schliesse fuer einen Moment die Augen.',
      'Ueberlege: Welches Gefuehl traegst du gerade mit dir herum? Es muss nichts Bestimmtes sein -- auch "ich weiss nicht genau" ist eine gueltige Antwort.',
      'Schreibe dieses Gefuehl auf -- so, wie es dir in den Sinn kommt. Es muss kein perfekter Satz sein. Auch einzelne Woerter oder ein Bild sind okay.',
      'Stell dir vor, du rollst den Zettel zusammen und steckst ihn in eine Flasche.',
      'Jetzt stellst du dir vor, wie du die Flasche ins Meer wirfst. Beobachte, wie die Wellen sie davontragen.',
      'Atme tief ein und aus. Du hast dein Gefuehl losgelassen. Es darf auf dem Meer treiben. Und du darfst dich jetzt ein bisschen leichter fuehlen.',
    ],
    completed: false,
  },
  {
    id: 'ocean-activity-2',
    islandId: 'ocean',
    type: 'breathing',
    title: 'Tiefsee-Tauchgang',
    description:
      'Ein Bodyscan als Unterwasser-Abenteuer: Tauche in deinen Koerper ein und spuere, wie es dir gerade geht. Entdecke, wo sich Gefuehle in deinem Koerper verstecken.',
    instructions: [
      'Setz dich bequem hin oder leg dich hin. Schliesse die Augen und stell dir vor, du tauchst langsam in einen warmen, ruhigen Ozean hinab.',
      'Starte bei deinem Kopf. Wie fuehlt sich dein Kopf an? Schwer? Leicht? Angespannt? Stell dir vor, warmes Wasser umfliesst deinen Kopf und loest jede Anspannung.',
      'Gleite tiefer -- zu deinen Schultern und Armen. Sind sie angespannt? Lass sie los, als wuerdest du im Wasser schweben.',
      'Weiter zu deiner Brust. Atme tief ein -- stell dir vor, du atmest durch Kiemen wie ein Fisch. Langsam ein, langsam aus. Wie fuehlt sich deine Brust an?',
      'Nun zum Bauch. Oft verstecken sich hier Sorgen und Aengste. Atme warmes Licht dorthin. Es ist okay, was auch immer du dort spuerst.',
      'Gleite zu deinen Beinen und Fuessen. Spuere den Boden unter dir -- oder stell dir den weichen Meeresboden vor.',
      'Tauche jetzt langsam wieder auf. Oeffne die Augen, wenn du bereit bist. Willkommen zurueck. Du hast gerade auf deinen Koerper gehoert, und das ist ein wichtiger Schritt.',
    ],
    completed: false,
  },
  {
    id: 'ocean-activity-3',
    islandId: 'ocean',
    type: 'reflection',
    title: 'Hilfe-Leuchtturm',
    description:
      'Baue deinen persoenlichen Leuchtturm: eine Liste von Menschen, die dir in schwierigen Zeiten Licht und Halt geben koennen.',
    instructions: [
      'Stell dir vor, du bist ein Schiff auf dem Meer. Manchmal wird das Meer stuermisch -- und dann brauchst du Leuchttuerme, die dir den Weg zeigen.',
      'Ueberlege: Wer sind die Menschen in deinem Leben, die dir guttun? Das koennen Familienmitglieder sein, Freunde, Lehrkraefte, Nachbarn oder andere Vertrauenspersonen.',
      'Schreibe mindestens drei Namen auf. Neben jeden Namen schreibst du, warum diese Person fuer dich ein Leuchtturm ist. Zum Beispiel: "Oma -- weil sie immer zuhoert und nie urteilt."',
      'Ueberlege fuer jede Person: Wie koenntest du sie erreichen, wenn du Hilfe brauchst? Telefon, persoenlich, per Nachricht?',
      'Wenn du magst, ergaenze die Liste mit professionellen Anlaufstellen: Schulsozialarbeit, Kinder- und Jugendtelefon (116 111), oder eine andere Beratungsstelle.',
      'Bewahre diese Liste an einem sicheren Ort auf. Dein Leuchtturm-Netzwerk ist immer fuer dich da -- auch wenn das Meer mal stuermisch wird.',
    ],
    completed: false,
  },
];

// =============================================================================
// 4. NPCs
// =============================================================================

export const oceanNPCs: OceanNPC[] = [
  {
    id: 'ocean-npc-marina',
    name: 'Marina',
    emoji: '\u{1F9DC}\u{200D}\u{2640}\u{FE0F}',
    description:
      'Eine Meerjungfrau, die lange Zeit ihre eigene Traurigkeit versteckt hat. Heute hilft sie anderen, ihre Gefuehle zu verstehen und anzunehmen.',
    backstory:
      'Marina lebte viele Jahre tief unten im Ozean und laechelte immer, wenn andere sie sahen. Niemand wusste, dass sie innerlich traurig war -- sie hatte ihre Heimat verloren, als die Stroemungen sich veraenderten. Eines Tages vertraute sie sich einem kleinen Seepferdchen an, und zum ersten Mal fuehlte sie sich leichter. Seitdem hat Marina gelernt: Gefuehle zu zeigen ist keine Schwaeche, sondern der mutigste Weg nach vorne. Heute schwimmt sie durch den Ozean und hilft jedem, der sich traut, ehrlich ueber seine Gefuehle zu sprechen.',
  },
  {
    id: 'ocean-npc-tiefgang',
    name: 'Tiefgang',
    emoji: '\u{1F40B}',
    description:
      'Ein alter, weiser Wal, der viel Verlust erlebt hat und Geschichten darueber erzaehlt, wie man trotz Trauer weitergehen kann.',
    backstory:
      'Tiefgang ist ueber hundert Jahre alt und hat in seinem langen Leben vieles erlebt: Er hat Freunde verloren, Stuerme ueberlebt und gesehen, wie sich die Meere veraenderten. Frueher hat ihn die Trauer manchmal so schwer gemacht, dass er kaum noch auftauchen konnte. Aber mit der Zeit hat er gelernt, dass Trauer und Freude im selben Herzen Platz haben. Er erzaehlt gerne Geschichten von frueheren Zeiten -- nicht um traurig zu machen, sondern um zu zeigen, dass man nach jedem Verlust wieder Licht finden kann. Seine tiefe, ruhige Stimme hat schon vielen Meeresbewohnern Trost gespendet.',
  },
];
