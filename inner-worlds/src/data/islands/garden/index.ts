// @ts-nocheck
// =============================================================================
// Garteninsel (Garden Island) – Empathie & Soziale Kompetenzen
// Inner Worlds – Social-Emotional Learning Game
//
// Alle Texte auf Deutsch, warmherzig und auf Augenhoehe fuer 10-15-Jaehrige.
// Therapeutisch fundiert: Perspektivuebernahme, emotionale Validierung,
// generationenuebergreifende Muster, aktives Zuhoeren, Ich-Botschaften,
// gewaltfreie Kommunikation, Vertrauensaufbau, Beziehungspflege.
//
// 4 Kapitel (progressive Schwierigkeit):
//   1. Verschiedene Blumen – Perspektivuebernahme
//   2. Der verletzte Gaertner – Empathie fuer den "Schwierigen"
//   3. Bruecken bauen – Aktives Zuhoeren & Ich-Botschaften
//   4. Der gemeinsame Garten – Teamwork & Beziehungspflege
// =============================================================================

import type { Scenario, WisdomCard, Activity, IslandId } from '../../../types';

// -----------------------------------------------------------------------------
// Local Types
// -----------------------------------------------------------------------------

interface GardenActivity extends Activity {
  instructions: string[];
}

// =============================================================================
// 1. NPCs
// =============================================================================

export const gardenNPCs: any[] = [];

// =============================================================================
// 2. SCENARIOS
// =============================================================================

export const gardenScenarios: Scenario[] = [
  // ---------------------------------------------------------------------------
  // Kapitel 1 – Verschiedene Blumen
  // Thema: Perspektivuebernahme, emotionale Entwertung, verschiedene Gefuehle
  // Kernlektion: "Nur weil du etwas anders fuehlst, heisst das nicht, dass
  //               das Gefuehl des anderen falsch ist."
  // Schwierigkeit: Einstieg
  // ---------------------------------------------------------------------------
  {
    id: 'garden-scenario-1',
    islandId: 'garden' as IslandId,
    title: 'Verschiedene Blumen',
    description:
      'Mia und Tom streiten sich – und beide sind ueberzeugt, Recht zu haben. ' +
      'Aber was passiert, wenn man anfaengt, mit den Augen des anderen zu sehen?',
    scenes: [
      // Scene 1: Der Streit
      {
        id: 'g1-s1',
        speaker: 'Erzaehler',
        speakerEmoji: '🌻',
        text:
          'Du gehst durch den Garten und hoerst Stimmen. Laute Stimmen. ' +
          'Hinter einer Hecke stehen Mia und Tom – zwei Freunde, die gerade ' +
          'ueberhaupt nicht freundlich zueinander sind. Mia hat Traenen in ' +
          'den Augen: "Du nimmst mich nie ernst!" Tom verdreht die Augen: ' +
          '"Du uebertreibst total! Es war doch nur ein Witz!" Mia verschraenkt ' +
          'die Arme: "Fuer DICH war es ein Witz. Fuer mich nicht." Die Stille ' +
          'danach ist schwerer als jedes Wort.',
        choices: [
          {
            id: 'g1-s1-c1',
            text:
              'Zu beiden gehen und ruhig sagen: "Hey, ich habe euch gehoert. ' +
              'Darf ich fragen, was passiert ist?"',
            consequence:
              'Dein ruhiges Eingreifen zeigt Respekt fuer beide Seiten. ' +
              'Niemand fuehlt sich angegriffen.',
            nextSceneId: 'g1-s2',
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 2 }
          },
          {
            id: 'g1-s1-c2',
            text:
              'Erstmal nur beobachten und versuchen zu verstehen, ' +
              'warum beide so aufgebracht sind.',
            consequence:
              'Du nimmst dir Zeit, die Situation zu verstehen, bevor du handelst. ' +
              'Manchmal ist Geduld die kluegste Reaktion.',
            nextSceneId: 'g1-s2',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'g1-s1-c3',
            text: 'Zu Mia gehen: "Hey, bist du okay? Du siehst verletzt aus."',
            consequence:
              'Du erkennst Mias Schmerz sofort und zeigst Mitgefuehl. ' +
              'Manchmal braucht es nur einen Menschen, der hinsieht.',
            nextSceneId: 'g1-s2',
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 1 }
          },
          {
            id: 'g1-s1-c4',
            text:
              'Weitergehen und so tun, als haettest du nichts gehoert. ' +
              'Ihr Streit geht dich nichts an.',
            consequence:
              'Du hast dich entschieden, wegzuschauen. Mia und Tom bleiben ' +
              'mit ihrem Konflikt allein. Gleichgueltigkeit ist das Gegenteil ' +
              'von Empathie – und manchmal schadet Nichtstun genauso wie falsches Handeln.',
            isWrong: true,
            nextSceneId: 'g1-s2',
            points: { empathyPoints: 0, insightPoints: 0, couragePoints: 0 }
          }
        ]
      },

      // Scene 2: Mias Perspektive
      {
        id: 'g1-s2',
        speaker: 'Mia',
        speakerEmoji: '🌷',
        text:
          'Mia wischt sich ueber die Augen. "Er hat in der Pause vor allen ueber ' +
          'mein Bild gelacht. Ich habe es fuer den Kunstunterricht gemalt – es ' +
          'bedeutet mir etwas. Und er hat gesagt, es sieht aus wie von einem ' +
          'Kindergartenkind." Tom stoeht: "Es WAR ein Witz! Alle haben gelacht! ' +
          'Warum bist du so empfindlich?" Du merkst: Fuer Tom war es ein harmloser ' +
          'Moment. Fuer Mia war es ein Angriff auf etwas, das ihr am Herzen liegt. ' +
          'Beide sehen die gleiche Situation – aber sie fuehlen etwas voellig ' +
          'Verschiedenes.',
        choices: [
          {
            id: 'g1-s2-c1',
            text:
              '"Tom, stell dir vor, jemand lacht ueber etwas, das DIR wirklich ' +
              'wichtig ist. Dein Fussball, dein Lieblingslied. Wie wuerde sich ' +
              'das anfuehlen?"',
            consequence:
              'Du leitest Tom zur Perspektivuebernahme an – eine der wichtigsten ' +
              'sozialen Faehigkeiten.',
            nextSceneId: 'g1-s3',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 1 }
          },
          {
            id: 'g1-s2-c2',
            text:
              '"Ich glaube, ihr habt den gleichen Moment ganz anders erlebt. ' +
              'Und das ist okay – aber es bedeutet, dass man nachfragen muss, ' +
              'statt zu vermuten."',
            consequence:
              'Du zeigst: Verschiedene Wahrnehmungen sind normal. Aber man muss ' +
              'darueber reden, statt Annahmen zu machen.',
            nextSceneId: 'g1-s3',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'g1-s2-c3',
            text:
              '"Mia, kannst du Tom erklaeren, was das Bild fuer dich bedeutet? ' +
              'Vielleicht weiss er das gar nicht."',
            consequence:
              'Du schaffst Raum fuer Mia, ihr Gefuehl zu erklaeren, statt es ' +
              'verteidigen zu muessen.',
            nextSceneId: 'g1-s3',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'g1-s2-c4',
            text:
              '"Mia, Tom hat recht – es war doch nur ein Witz. Du bist ' +
              'wirklich zu empfindlich. Nimm nicht alles so persoenlich."',
            consequence:
              'Du hast Mias Gefuehle abgewertet und Tom in seinem Verhalten ' +
              'bestaerkt. Mia fuehlt sich jetzt noch einsamer und unverstanden. ' +
              'Wenn jemand dir sagt, dass etwas wehtut, ist die Antwort nie: ' +
              '"Du uebertreibst."',
            isWrong: true,
            nextSceneId: 'g1-s3',
            points: { empathyPoints: 0, insightPoints: 0, couragePoints: 0 }
          }
        ]
      },

      // Scene 3: Toms Hintergrund
      {
        id: 'g1-s3',
        speaker: 'Tom',
        speakerEmoji: '🌿',
        text:
          'Tom ist ruhiger geworden. "Ich wollte sie nicht verletzen. Ehrlich. ' +
          'Ich hab nicht nachgedacht." Er zupft nervoes an einem Grashalm. "Bei ' +
          'mir zu Hause machen alle solche Witze. Mein grosser Bruder lacht mich ' +
          'auch aus, und ich soll mich nicht anstellen." Da ist es. Ein Satz, der ' +
          'viel erklaert. Tom hat gelernt, dass man ueber Spott hinweggehen soll – ' +
          'und er versteht nicht, warum Mia das nicht kann. Er entwertet ihre ' +
          'Gefuehle nicht aus Bosheit, sondern weil er nie gelernt hat, dass ' +
          'Gefuehle ernst genommen werden duerfen.',
        choices: [
          {
            id: 'g1-s3-c1',
            text:
              '"Tom, das was dein Bruder macht, ist auch nicht okay. Nur weil du ' +
              'gelernt hast, das auszuhalten, heisst das nicht, dass andere das ' +
              'auch muessen."',
            consequence:
              'Du zeigst Tom vorsichtig, dass seine eigene Erfahrung nicht ' +
              'der Massstab fuer alle ist.',
            nextSceneId: 'g1-s4',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'g1-s3-c2',
            text:
              '"Verstehe. Du reagierst so, weil du es selbst so gelernt hast. ' +
              'Aber Mia hat andere Erfahrungen – und ihre Gefuehle sind genauso ' +
              'gueltig wie deine."',
            consequence:
              'Du verbindest Toms Verhalten mit seiner Erfahrung, ohne ihn zu ' +
              'verurteilen. Das ist echte Einsicht.',
            nextSceneId: 'g1-s4',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'g1-s3-c3',
            text:
              '"Mia, hoerst du das? Tom wusste nicht, dass es dich verletzt. ' +
              'Und Tom – jetzt weisst du es. Was machst du damit?"',
            consequence:
              'Du stellst die entscheidende Frage: Was passiert, nachdem man ' +
              'verstanden hat? Wissen bringt Verantwortung.',
            nextSceneId: 'g1-s4',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'g1-s3-c4',
            text:
              '"Tom, dein Vater hat recht. Jungs sollten nicht so empfindlich ' +
              'sein. Stell dich nicht so an – und Mia sollte das auch lernen."',
            consequence:
              'Du hast genau das Muster verstaerkt, unter dem Tom leidet. Anstatt ' +
              'ihm zu helfen, den Kreislauf zu durchbrechen, hast du ihn tiefer ' +
              'hineingedrueckt. Gefuehle zu unterdruecken ist keine Staerke – ' +
              'es ist der Grund, warum Tom andere verletzt.',
            isWrong: true,
            nextSceneId: 'g1-s4',
            points: { empathyPoints: 0, insightPoints: 0, couragePoints: 0 }
          }
        ]
      },

      // Scene 4: Versoehnungsversuch
      {
        id: 'g1-s4',
        speaker: 'Erzaehler',
        speakerEmoji: '🌻',
        text:
          'Tom schaut Mia an. Wirklich an. Vielleicht zum ersten Mal seit dem ' +
          'Streit. "Okay. Ich... es tut mir leid. Ich hab nicht gewusst, wie ' +
          'wichtig dir das Bild ist." Mia nickt langsam. "Danke. Ich weiss, ' +
          'dass du keinen boesen Willen hattest. Aber es hat trotzdem wehgetan." ' +
          'Tom schluckt. "Dann... sag mir das naechstes Mal? Ich kann keine ' +
          'Gedanken lesen. Aber ich kann zuhoeren." Ein Laecheln. Klein, ' +
          'vorsichtig, aber echt. Der Garten um euch herum scheint ein kleines ' +
          'bisschen heller zu werden.',
        choices: [
          {
            id: 'g1-s4-c1',
            text:
              '"Das war stark von euch beiden. Tom, du hast zugehoert. Mia, du ' +
              'hast dein Gefuehl erklaert, ohne anzugreifen. Das ist echte ' +
              'Kommunikation."',
            consequence:
              'Du benennst genau, was gut gelaufen ist – und staerkst beide darin, ' +
              'diesen Weg weiterzugehen.',
            nextSceneId: 'g1-s5',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'g1-s4-c2',
            text:
              '"Wisst ihr, was gerade passiert ist? Ihr habt angefangen, mit den ' +
              'Augen des anderen zu sehen. Das veraendert alles."',
            consequence:
              'Du gibst dem Erlebnis einen Namen: Perspektivuebernahme. Wenn man ' +
              'weiss, wie es heisst, kann man es oefter tun.',
            nextSceneId: 'g1-s5',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 0 }
          },
          {
            id: 'g1-s4-c3',
            text:
              '"Das braucht Uebung. Aber der erste Schritt ist gemacht. Und der ' +
              'erste Schritt ist immer der schwerste."',
            consequence:
              'Du zeigst: Das war ein Anfang, kein perfektes Ende. Wachstum ' +
              'braucht Zeit.',
            nextSceneId: 'g1-s5',
            points: { empathyPoints: 1, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'g1-s4-c4',
            text:
              '"Das aendert doch nichts. Naechste Woche streitet ihr euch wieder. ' +
              'Ist doch immer das Gleiche mit euch."',
            consequence:
              'Du hast den zaghaften Versoehnungsversuch zerstoert. Mia und Tom ' +
              'haben gerade Mut gezeigt, und du hast ihn kleingemacht. Wer Fortschritt ' +
              'entwertet, nimmt anderen die Motivation, es weiter zu versuchen.',
            isWrong: true,
            nextSceneId: 'g1-s5',
            points: { empathyPoints: 0, insightPoints: 0, couragePoints: 0 }
          }
        ]
      },

      // Scene 5: Reflexion und Kernlektion
      {
        id: 'g1-s5',
        speaker: 'Erzaehler',
        speakerEmoji: '🌻',
        text:
          'Spaeter sitzt du allein im Garten und denkst nach. Mia und Tom – ' +
          'zwei verschiedene Blumen, die Wasser auf unterschiedliche Weise ' +
          'brauchen. Was fuer eine Rose naehrend ist, kann eine Orchidee ' +
          'ertraenken. Und genau so ist es mit Gefuehlen: Nur weil du etwas ' +
          'anders fuehlst, heisst das nicht, dass das Gefuehl des anderen ' +
          'falsch ist. Tom hat gelernt, Spott auszuhalten. Mia hat gelernt, ' +
          'dass Kunst ihr Herz ist. Keiner von beiden liegt falsch. Sie sind ' +
          'nur verschiedene Blumen. Im Garten wachsen nicht alle Blumen gleich. ' +
          'Aber jede einzelne hat das Recht auf Sonne.',
        choices: [
          {
            id: 'g1-s5-c1',
            text:
              '"Ich nehme mit: Bevor ich sage, dass jemand uebertreibt, frage ' +
              'ich lieber, warum es ihm so wichtig ist."',
            consequence:
              'Du hast eine Grundregel der Empathie verinnerlicht: erst ' +
              'verstehen, dann urteilen.',
            nextSceneId: null,
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 1 }
          },
          {
            id: 'g1-s5-c2',
            text:
              '"Verschiedene Gefuehle sind wie verschiedene Blumen – keines ' +
              'ist falsch, nur weil es anders aussieht."',
            consequence:
              'Du hast das Kernthema verstanden: Vielfalt gilt auch fuer ' +
              'Gefuehle, nicht nur fuer Meinungen.',
            nextSceneId: null,
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 0 }
          },
          {
            id: 'g1-s5-c3',
            text:
              '"Am schwierigsten war es, neutral zu bleiben. Ich wollte sofort ' +
              'Partei ergreifen – aber Zuhoeren war wichtiger."',
            consequence:
              'Deine Selbstreflexion zeigt: Du lernst nicht nur ueber andere, ' +
              'sondern auch ueber dich selbst.',
            nextSceneId: null,
            points: { empathyPoints: 1, insightPoints: 2, couragePoints: 3 }
          },
          {
            id: 'g1-s5-c4',
            text:
              '"Ehrlich gesagt war das alles uebertrieben. Manche Leute sind ' +
              'halt zu empfindlich – das ist deren Problem, nicht meins."',
            consequence:
              'Du hast die gesamte Lektion verpasst. Empathie beginnt damit, ' +
              'die Gefuehle anderer ernst zu nehmen – auch wenn du sie nicht ' +
              'teilst. Wer die Gefuehle anderer als "uebertrieben" abstempelt, ' +
              'baut Mauern statt Bruecken.',
            isWrong: true,
            nextSceneId: null,
            points: { empathyPoints: 0, insightPoints: 0, couragePoints: 0 }
          }
        ]
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // Kapitel 2 – Der verletzte Gaertner
  // Thema: Empathie fuer den "Schwierigen", generationenuebergreifende Muster,
  //         "hurt people hurt people"
  // Kernlektion: "Wer andere verletzt, hat oft selbst Schmerzen. Das
  //               entschuldigt nichts – aber es erklaert manches."
  // Schwierigkeit: Mittel
  // ---------------------------------------------------------------------------
  {
    id: 'garden-scenario-2',
    islandId: 'garden' as IslandId,
    title: 'Der verletzte Gaertner',
    description:
      'Tom hat Mia verletzt. Aber was, wenn hinter seinen harten Worten ' +
      'eigener Schmerz steckt? Manchmal muss man tiefer graben, um die ' +
      'Wurzeln eines Problems zu finden.',
    scenes: [
      // Scene 1: Tom allein
      {
        id: 'g2-s1',
        speaker: 'Erzaehler',
        speakerEmoji: '🌻',
        text:
          'Einige Tage nach dem Streit findest du Tom allein in einer Ecke des ' +
          'Gartens. Er sitzt auf einer Bank und starrt auf den Boden. Kein ' +
          'sarkastischer Kommentar, kein "Alles cool". Nur Stille. Du merkst: ' +
          'Irgendetwas stimmt nicht. Seine Schultern sind angespannt, seine ' +
          'Haende zu Faeusten geballt. Nicht wuetend – eher so, als wuerde er ' +
          'versuchen, etwas in sich drin festzuhalten. Etwas, das raus will, ' +
          'aber nicht darf.',
        choices: [
          {
            id: 'g2-s1-c1',
            text:
              'Dich neben ihn setzen, ohne etwas zu sagen. Einfach da sein.',
            consequence:
              'Manchmal ist Praesenz das staerkste Zeichen von Empathie. ' +
              'Du musst nicht reden, um fuer jemanden da zu sein.',
            nextSceneId: 'g2-s2',
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 1 }
          },
          {
            id: 'g2-s1-c2',
            text:
              '"Hey Tom. Du siehst aus, als haettest du einen harten Tag. ' +
              'Magst du reden?"',
            consequence:
              'Du bietest ein Gespraech an, ohne es aufzudraengen. Die ' +
              'Entscheidung liegt bei Tom.',
            nextSceneId: 'g2-s2',
            points: { empathyPoints: 2, insightPoints: 1, couragePoints: 3 }
          },
          {
            id: 'g2-s1-c3',
            text:
              'Ihn beobachten und ueberlegen, ob sein Verhalten gegenueber ' +
              'Mia vielleicht einen tieferen Grund hat.',
            consequence:
              'Du beginnst, hinter die Oberflaeche zu schauen. Verhalten ' +
              'hat immer eine Geschichte.',
            nextSceneId: 'g2-s2',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'g2-s1-c4',
            text:
              '"Tom hat Mia zum Weinen gebracht. Der verdient es, allein zu ' +
              'sitzen. Soll er mal sehen, wie sich das anfuehlt."',
            consequence:
              'Du hast entschieden, dass Tom bestraft werden soll, statt ' +
              'verstanden zu werden. Rache und Schadenfreude fuehlen sich ' +
              'kurz gut an, aber sie loesen kein Problem. Wer verletzt, ' +
              'braucht vielleicht selbst Hilfe – auch wenn das schwer zu akzeptieren ist.',
            isWrong: true,
            nextSceneId: 'g2-s2',
            points: { empathyPoints: 0, insightPoints: 0, couragePoints: 0 }
          }
        ]
      },

      // Scene 2: Toms Vater
      {
        id: 'g2-s2',
        speaker: 'Tom',
        speakerEmoji: '🌿',
        text:
          'Tom ist ueberrascht, dass du da bist. "Was willst du?" Nicht ' +
          'aggressiv, aber abwehrend. Dann, nach einer langen Pause: "Mein ' +
          'Vater sagt, ich soll mich nicht so anstellen. Wegen der Sache mit ' +
          'Mia. Er sagt, Jungs die sich entschuldigen, sind schwach." Er zupft ' +
          'einen Grashalm aus der Erde. "Er sagt das oft. Echte Maenner heulen ' +
          'nicht. Echte Maenner zeigen keine Schwaeche. Echte Maenner..." Er ' +
          'bricht ab. Dann, leise: "Echte Maenner sind einsam. Das sagt er ' +
          'nie dazu, aber ich sehe es jeden Abend, wenn er allein vor dem ' +
          'Fernseher sitzt."',
        choices: [
          {
            id: 'g2-s2-c1',
            text:
              '"Das muss wirklich schwer sein. Auf der einen Seite dein Vater, ' +
              'der dir sagt, wie ein Mann sein soll. Auf der anderen Seite ' +
              'dein eigenes Herz, das etwas anderes fuehlt."',
            consequence:
              'Du benennst den inneren Konflikt, den Tom erlebt – ohne ' +
              'seinen Vater schlecht zu machen.',
            nextSceneId: 'g2-s3',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 1 }
          },
          {
            id: 'g2-s2-c2',
            text:
              '"Dein Vater hat das vielleicht auch von SEINEM Vater gelernt. ' +
              'Manche Regeln werden weitergegeben, ohne dass jemand fragt, ' +
              'ob sie noch stimmen."',
            consequence:
              'Du zeigst Tom, dass sein Vater vielleicht selbst ein Opfer ' +
              'alter Muster ist. Das nennt man generationenuebergreifende Muster.',
            nextSceneId: 'g2-s3',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'g2-s2-c3',
            text:
              '"Glaubst DU das denn? Dass sich entschuldigen schwach ist?"',
            consequence:
              'Du fragst direkt – und gibst Tom den Raum, seine eigene ' +
              'Meinung zu finden, unabhaengig von seinem Vater.',
            nextSceneId: 'g2-s3',
            points: { empathyPoints: 1, insightPoints: 2, couragePoints: 3 }
          },
          {
            id: 'g2-s2-c4',
            text:
              '"Echt? Dein Vater sagt so was? Das erzaehl ich den anderen – ' +
              'die muessen wissen, was bei dir zu Hause los ist."',
            consequence:
              'Tom hat dir etwas Persoenliches anvertraut – und du willst es ' +
              'weitererzaehlen. Das ist Vertrauensbruch in seiner schlimmsten ' +
              'Form. Wer Geheimnisse anderer weitergibt, zerstoert nicht nur ' +
              'eine Freundschaft, sondern sorgt dafuer, dass sich die Person ' +
              'nie wieder jemandem oeffnet.',
            isWrong: true,
            nextSceneId: 'g2-s3',
            points: { empathyPoints: 0, insightPoints: 0, couragePoints: 0 }
          }
        ]
      },

      // Scene 3: Muster erkennen
      {
        id: 'g2-s3',
        speaker: 'Tom',
        speakerEmoji: '🌿',
        text:
          'Tom ist still. Lange. Dann: "Nein. Ich glaube... ich glaube, sich ' +
          'zu entschuldigen ist eigentlich mutig. Aber wenn mein Vater das hoert, ' +
          'schaut er mich so an, als haette ich ihn enttaeuscht." Seine Stimme ' +
          'wird leiser. "Und wisst ihr, was das Schlimmste ist? Ich merke, wie ' +
          'ich werde wie er. Mia hat geweint, und mein erster Gedanke war: ' +
          'Stell dich nicht so an. Genau wie mein Vater es zu mir sagt." Er ' +
          'schaut auf seine Haende. "Ich will nicht so werden. Ich will nicht ' +
          'so einsam werden wie er."',
        choices: [
          {
            id: 'g2-s3-c1',
            text:
              '"Dass du das erkennst, zeigt, dass du schon anders bist. Dein ' +
              'Vater fragt sich wahrscheinlich nie, ob sein Verhalten andere ' +
              'verletzt. Du schon."',
            consequence:
              'Du zeigst Tom den entscheidenden Unterschied: Selbstreflexion. ' +
              'Wer seine Muster sieht, kann sie veraendern.',
            nextSceneId: 'g2-s4',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'g2-s3-c2',
            text:
              '"Muster kann man durchbrechen. Es ist schwer. Aber du hast ' +
              'gerade den ersten Schritt gemacht: Du hast es ausgesprochen."',
            consequence:
              'Du ermutigst Tom und zeigst ihm, dass Veraenderung moeglich ' +
              'ist – Schritt fuer Schritt.',
            nextSceneId: 'g2-s4',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'g2-s3-c3',
            text:
              '"Tom, dein Vater tut mir leid. Nicht weil er boese ist – sondern ' +
              'weil ihm wahrscheinlich nie jemand gesagt hat, dass Gefuehle ' +
              'zeigen okay ist. Er hat auch Schmerzen."',
            consequence:
              'Du zeigst Empathie fuer den Vater, ohne sein Verhalten zu ' +
              'entschuldigen. Verstehen ist nicht Zustimmen.',
            nextSceneId: 'g2-s4',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 1 }
          },
          {
            id: 'g2-s3-c4',
            text:
              '"Dein Vater hat vielleicht recht. Zu viele Gefuehle zeigen ' +
              'macht dich nur angreifbar. Bleib lieber hart."',
            consequence:
              'Du hast das schaedliche Muster bestaerkt, das Tom gerade ' +
              'durchbrechen wollte. Er hat dir seinen inneren Kampf gezeigt, ' +
              'und du hast ihn zurueck in den Kaefig gedrueckt. Gefuehle zu ' +
              'unterdruecken fuehrt zu Einsamkeit – genau das, wovor Tom Angst hat.',
            isWrong: true,
            nextSceneId: 'g2-s4',
            points: { empathyPoints: 0, insightPoints: 0, couragePoints: 0 }
          }
        ]
      },

      // Scene 4: Wie man sich entschuldigt
      {
        id: 'g2-s4',
        speaker: 'Tom',
        speakerEmoji: '🌿',
        text:
          'Tom wischt sich schnell ueber die Augen. "Sag niemandem, dass ich..." ' +
          'Du unterbrichst sanft: "Tom, es gibt nichts, wofuer du dich schaemen ' +
          'musst. Traenen sind kein Zeichen von Schwaeche." Er atmet tief durch. ' +
          '"Ich will mich bei Mia entschuldigen. Richtig. Nicht so ein halbes ' +
          'Tut-mir-leid, wo man danach sagt: Aber du bist auch schuld. Eine ' +
          'echte Entschuldigung." Dann, fast flusternd: "Aber niemand hat mir ' +
          'je gezeigt, wie man das macht. Bei uns zu Hause entschuldigt sich ' +
          'niemand. Nie."',
        choices: [
          {
            id: 'g2-s4-c1',
            text:
              '"Eine echte Entschuldigung hat drei Teile: Sagen was man getan ' +
              'hat. Anerkennen, wie es den anderen verletzt hat. Und fragen, ' +
              'was man anders machen kann."',
            consequence:
              'Du gibst Tom ein konkretes Werkzeug an die Hand. Drei Schritte, ' +
              'die man sich merken kann.',
            nextSceneId: 'g2-s5',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'g2-s4-c2',
            text:
              '"Wollen wir es zusammen ueben? Ich kann Mia spielen und du ' +
              'probierst aus, was du sagen willst."',
            consequence:
              'Du bietest praktische Unterstuetzung statt nur Ratschlaege. ' +
              'Ueben ist besser als Nachdenken.',
            nextSceneId: 'g2-s5',
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 2 }
          },
          {
            id: 'g2-s4-c3',
            text:
              '"Das Wichtigste ist, dass du es ehrlich meinst. Mia wird den ' +
              'Unterschied spueren zwischen einem echten und einem auswendig ' +
              'gelernten Tut-mir-leid."',
            consequence:
              'Du betonst Authentizitaet statt perfekte Worte. Aufrichtigkeit ' +
              'ist wichtiger als Formulierung.',
            nextSceneId: 'g2-s5',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'g2-s4-c4',
            text:
              '"Sag Mia einfach, was sie hoeren will, dann hast du Ruhe. ' +
              'Ob du es ehrlich meinst, merkt sie eh nicht."',
            consequence:
              'Du hast Tom geraten, Mia zu manipulieren. Eine falsche ' +
              'Entschuldigung ist schlimmer als keine – weil sie Vertrauen ' +
              'vortaeuscht, das nicht da ist. Wenn Mia das durchschaut, und das ' +
              'wird sie, ist die Freundschaft endgueltig zerstoert.',
            isWrong: true,
            nextSceneId: 'g2-s5',
            points: { empathyPoints: 0, insightPoints: 0, couragePoints: 0 }
          }
        ]
      },

      // Scene 5: Reflexion und Kernlektion
      {
        id: 'g2-s5',
        speaker: 'Erzaehler',
        speakerEmoji: '🌻',
        text:
          'Am naechsten Tag spricht Tom mit Mia. Du bist nicht dabei – das war ' +
          'seine Entscheidung, und die richtige. Manche Gespraeche brauchen ' +
          'keinen Zuschauer. Spaeter findest du beide am Gartenteich sitzen. ' +
          'Nicht lachend, nicht umarmend. Aber nebeneinander. Das reicht fuer ' +
          'heute. Tom schaut zu dir herueber und nickt. Ein kleines Nicken, das ' +
          'sagt: Danke. Mia laechelt leise. Im Garten hast du heute etwas ' +
          'Wichtiges gelernt: Wer andere verletzt, hat oft selbst Schmerzen. ' +
          'Das entschuldigt nichts – aber es erklaert manches. Und manchmal ' +
          'ist Verstehen der erste Schritt zur Veraenderung. Tom muss nicht ' +
          'werden wie sein Vater. Er darf seinen eigenen Weg finden.',
        choices: [
          {
            id: 'g2-s5-c1',
            text:
              '"Hinter dem Gaertner, der Blumen zertrampelt, steckt manchmal ' +
              'ein Kind, dem nie jemand gezeigt hat, wie man pflanzt."',
            consequence:
              'Du hast die tiefste Ebene der Empathie erreicht: Verstehen, ' +
              'ohne zu entschuldigen. Das ist keine Schwaeche – das ist Staerke.',
            nextSceneId: null,
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 1 }
          },
          {
            id: 'g2-s5-c2',
            text:
              '"Ich lerne: Wenn jemand hart zu anderen ist, lohnt es sich zu ' +
              'fragen, wer vorher hart zu IHM war. Nicht um zu entschuldigen. ' +
              'Sondern um zu verstehen."',
            consequence:
              'Du verinnerlichst, dass Verhalten immer eine Geschichte hat. ' +
              'Wer die Geschichte kennt, kann anders reagieren.',
            nextSceneId: null,
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'g2-s5-c3',
            text:
              '"Tom hat heute den Kreislauf durchbrochen. Er hat sich ' +
              'entschuldigt, obwohl ihm nie beigebracht wurde wie. Das ist ' +
              'echte Staerke – nicht die Staerke, die sein Vater meint."',
            consequence:
              'Du erkennst: Echte Staerke zeigt sich darin, alte Muster ' +
              'zu verlassen, nicht darin, sie fortzusetzen.',
            nextSceneId: null,
            points: { empathyPoints: 1, insightPoints: 2, couragePoints: 3 }
          },
          {
            id: 'g2-s5-c4',
            text:
              '"Jetzt weiss ich, wie Leute ticken, die hart zu anderen sind. ' +
              'Das kann ich nutzen, um sie zu durchschauen und zu kontrollieren."',
            consequence:
              'Du hast Empathie als Waffe verstanden statt als Verbindung. ' +
              'Wer das Wissen ueber die Verletzlichkeit anderer nutzt, um sie ' +
              'zu manipulieren, hat die Lektion komplett verfehlt. Verstehen ' +
              'soll heilen – nicht verletzen.',
            isWrong: true,
            nextSceneId: null,
            points: { empathyPoints: 0, insightPoints: 0, couragePoints: 0 }
          }
        ]
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // Kapitel 3 – Bruecken bauen
  // Thema: Aktives Zuhoeren, Ich-Botschaften, Gewaltfreie Kommunikation,
  //         Konfliktloesung, "Was brauchst du?"
  // Kernlektion: "Gute Kommunikation heisst nicht, immer nett zu sein.
  //               Es heisst, ehrlich UND respektvoll zu sein."
  // Schwierigkeit: Mittel-Hoch
  // ---------------------------------------------------------------------------
  {
    id: 'garden-scenario-3',
    islandId: 'garden' as IslandId,
    title: 'Bruecken bauen',
    description:
      'Ein Schulprojekt, drei Gruppen, null Zusammenarbeit. Wenn niemand ' +
      'dem anderen zuhoert, wird jedes Projekt zur Katastrophe. Aber was, ' +
      'wenn man lernt, WIRKLICH hinzuhoeren?',
    scenes: [
      // Scene 1: Chaos im Klassenzimmer
      {
        id: 'g3-s1',
        speaker: 'Erzaehler',
        speakerEmoji: '🌻',
        text:
          'Chaos im Klassenzimmer. Frau Mueller hat ein Gruppenprojekt ' +
          'angekuendigt: "Ihr sollt gemeinsam einen Schulgarten planen." ' +
          'Das Problem? Die Sportler, die Kreativen und die Stillen koennen ' +
          'sich auf nichts einigen. Jonas von den Sportlern: "Wir brauchen ' +
          'eine Wiese zum Kicken!" Leila von den Kreativen: "Wir wollen ' +
          'Skulpturen und Farben!" Und Nuri, der bisher nichts gesagt hat, ' +
          'sitzt in der Ecke und zeichnet leise seinen eigenen Plan. Drei ' +
          'Gruppen, drei Visionen, null Kommunikation. Alle reden. Keiner hoert.',
        choices: [
          {
            id: 'g3-s1-c1',
            text:
              '"Moment mal – wir reden alle durcheinander. Koennen wir eine ' +
              'Regel einfuehren: Einer redet, die anderen hoeren WIRKLICH zu?"',
            consequence:
              'Du schlaegst eine Grundregel vor, die echtes Zuhoeren ' +
              'ueberhaupt erst ermoeglicht.',
            nextSceneId: 'g3-s2',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'g3-s1-c2',
            text:
              'Zu Nuri gehen: "Hey, du zeichnest da etwas. Magst du es den ' +
              'anderen zeigen?"',
            consequence:
              'Du beziehst jemanden ein, der sonst uebersehen wird. Leise ' +
              'Menschen haben oft die besten Ideen.',
            nextSceneId: 'g3-s2',
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 2 }
          },
          {
            id: 'g3-s1-c3',
            text:
              '"Statt zu streiten, was wir wollen – wie waere es, wenn jeder ' +
              'erst mal sagt, WARUM ihm das wichtig ist?"',
            consequence:
              'Du lenkst das Gespraech von Positionen zu Beduerfnissen. ' +
              'Das ist das Herzstück der gewaltfreien Kommunikation.',
            nextSceneId: 'g3-s2',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'g3-s1-c4',
            text:
              '"Hoert alle auf mich! Meine Idee ist die beste, und wer das ' +
              'nicht kapiert, kann ja gehen."',
            consequence:
              'Du hast versucht, dich mit Dominanz durchzusetzen – genau das ' +
              'Verhalten, das den Streit verschlimmert. Wer andere zum Schweigen ' +
              'bringt, gewinnt vielleicht die Diskussion, aber verliert das ' +
              'Vertrauen aller. Echte Zusammenarbeit entsteht durch Zuhoeren, ' +
              'nicht durch Befehlen.',
            isWrong: true,
            nextSceneId: 'g3-s2',
            points: { empathyPoints: 0, insightPoints: 0, couragePoints: 0 }
          }
        ]
      },

      // Scene 2: Aktives Zuhoeren einfuehren
      {
        id: 'g3-s2',
        speaker: 'Erzaehler',
        speakerEmoji: '🌻',
        text:
          'Jonas verschraenkt die Arme. "Warum soll ich zuhoeren? Die checken ' +
          'eh nicht, warum Sport wichtig ist." Leila rollt mit den Augen. "Und ' +
          'du checkst nicht, dass Kunst genauso zaehlt." Nuri sagt leise: ' +
          '"Eigentlich wuenschte ich mir einfach einen ruhigen Ort." Niemand ' +
          'hoert ihn. Du merkst: Das Problem ist nicht, dass sie verschiedene ' +
          'Ideen haben. Das Problem ist, dass keiner dem anderen WIRKLICH ' +
          'zuhoert. Zuhoeren heisst nicht nur warten, bis man selbst dran ist. ' +
          'Es heisst, wirklich verstehen wollen, was der andere sagt.',
        choices: [
          {
            id: 'g3-s2-c1',
            text:
              '"Lasst uns ein Experiment machen: Jonas, erzaehl zwei Minuten ' +
              'lang, warum dir Sport wichtig ist. Leila und Nuri – ihr hoert ' +
              'nur zu. Kein Unterbrechen, kein Augenrollen."',
            consequence:
              'Du fuehrst aktives Zuhoeren als konkrete Uebung ein. Theorie ' +
              'ist gut, Praxis ist besser.',
            nextSceneId: 'g3-s3',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'g3-s2-c2',
            text:
              '"Nuri hat gerade etwas gesagt, und keiner hat zugehoert. Nuri, ' +
              'wuerdest du das nochmal sagen – lauter diesmal?"',
            consequence:
              'Du machst sichtbar, wie leicht jemand uebersehen wird – und ' +
              'gibst ihm eine zweite Chance, gehoert zu werden.',
            nextSceneId: 'g3-s3',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'g3-s2-c3',
            text:
              '"Ich habe eine Idee: Bevor jemand etwas Neues sagt, muss er ' +
              'erst in eigenen Worten wiederholen, was der Vorredner gesagt ' +
              'hat. So stellen wir sicher, dass wir wirklich zuhoeren."',
            consequence:
              'Du fuehrst das aktive-Zuhoeren-Werkzeug der Zusammenfassung ' +
              'ein. Ein konkreter Schritt.',
            nextSceneId: 'g3-s3',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'g3-s2-c4',
            text:
              '"Nuri redet sowieso nie – also brauchen wir seine Meinung ' +
              'auch nicht. Wer nichts sagt, hat wohl nichts beizutragen."',
            consequence:
              'Du hast Nuri ausgeschlossen und ihm das Gefuehl gegeben, ' +
              'unsichtbar und unwichtig zu sein. Stille Menschen haben oft ' +
              'die besten Ideen – sie brauchen nur jemanden, der ihnen ' +
              'Raum gibt. Ausgrenzung ist eine der schaedlichsten Formen ' +
              'sozialen Verhaltens.',
            isWrong: true,
            nextSceneId: 'g3-s3',
            points: { empathyPoints: 0, insightPoints: 0, couragePoints: 0 }
          }
        ]
      },

      // Scene 3: Ich-Botschaften und Oeffnung
      {
        id: 'g3-s3',
        speaker: 'Jonas',
        speakerEmoji: '🌿',
        text:
          'Jonas erzaehlt. Zum ersten Mal ohne Unterbrechung. "Sport ist ' +
          'nicht nur Kicken. Nach der Scheidung meiner Eltern war Fussball ' +
          'der einzige Ort, wo ich mich normal gefuehlt habe. Der Garten... ' +
          'ich will einfach einen Ort, wo man sich bewegen und frei fuehlen ' +
          'kann, wenn alles zu viel wird." Stille. Leila schluckt. "Das ' +
          'wusste ich nicht." Jonas wird rot. "Ja, ist halt so." Dann sagst ' +
          'du: "Leila, kannst du in deinen eigenen Worten wiederholen, was ' +
          'Jonas gesagt hat?" Leila ueberlegt. "Er will nicht nur spielen. ' +
          'Er braucht einen Ort, wo er sich frei fuehlen kann." Jonas nickt ' +
          'ueberrascht. "Ja. Genau das."',
        choices: [
          {
            id: 'g3-s3-c1',
            text:
              '"Super, Leila. Jetzt du. Sag uns mit Ich-Botschaften, was dir ' +
              'wichtig ist: Ich fuehle mich..., weil..., und ich brauche..."',
            consequence:
              'Du fuehrst Ich-Botschaften ein – ein zentrales Werkzeug der ' +
              'gewaltfreien Kommunikation.',
            nextSceneId: 'g3-s4',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'g3-s3-c2',
            text:
              '"Seht ihr, was gerade passiert ist? Jonas hat sich geoeffnet, ' +
              'und ploetzlich ist es kein Streit mehr – sondern ein Gespraech. ' +
              'DAS passiert, wenn man wirklich zuhoert."',
            consequence:
              'Du machst den Unterschied zwischen Streiten und Kommunizieren ' +
              'sichtbar. Ein wichtiger Moment.',
            nextSceneId: 'g3-s4',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 0 }
          },
          {
            id: 'g3-s3-c3',
            text:
              '"Nuri, du warst sehr still. Ich moechte dich gerne einladen, ' +
              'als Naechster zu teilen. Was brauchst DU?"',
            consequence:
              'Du stellst die Schluesselfrage der gewaltfreien Kommunikation: ' +
              'Was brauchst du? Nicht: Was willst du?',
            nextSceneId: 'g3-s4',
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 2 }
          },
          {
            id: 'g3-s3-c4',
            text:
              '"Jonas, du heulst wegen deiner Eltern? Das ist doch keine ' +
              'Ausrede. Wir reden hier ueber den Garten, nicht ueber deine ' +
              'Probleme."',
            consequence:
              'Jonas hat sich geoeffnet und etwas sehr Persoenliches geteilt – ' +
              'und du hast es abgewertet. Wer den Mut anderer bestraft, sorgt ' +
              'dafuer, dass sich nie wieder jemand oeffnet. Persoenliche Geschichten ' +
              'zu teilen braucht Vertrauen, und du hast es gerade zerstoert.',
            isWrong: true,
            nextSceneId: 'g3-s4',
            points: { empathyPoints: 0, insightPoints: 0, couragePoints: 0 }
          }
        ]
      },

      // Scene 4: Die Loesung entsteht
      {
        id: 'g3-s4',
        speaker: 'Nuri',
        speakerEmoji: '🌱',
        text:
          'Nuri spricht leise, aber klar: "Ich fuehle mich oft unsichtbar ' +
          'in der Klasse. Nicht weil ihr gemein seid, sondern weil ich leise ' +
          'bin und leise Menschen uebersehen werden. Was ich brauche, ist ein ' +
          'Platz im Garten, wo man einfach... sein kann. Ohne Laerm, ohne ' +
          'Druck." Er zeigt seine Zeichnung: ein kleiner Bereich mit Baenken, ' +
          'Pflanzen und einem Wasserspiel. "Das hier." Jonas schaut die ' +
          'Zeichnung an. "Das ist richtig gut." Leila: "Was, wenn wir ALLE ' +
          'drei Ideen verbinden? Eine Wiese, einen Kunstraum UND einen ruhigen ' +
          'Bereich?" Ploetzlich reden sie miteinander – nicht gegeneinander.',
        choices: [
          {
            id: 'g3-s4-c1',
            text:
              '"Das ist der Wendepunkt! Ihr habt aufgehoert, eure Position ' +
              'zu verteidigen, und angefangen, einander zu verstehen. DAS ist ' +
              'echte Zusammenarbeit."',
            consequence:
              'Du benennst den Wendepunkt: von Positionen zu Beduerfnissen. ' +
              'Wenn man das Warum versteht, findet man das Wie.',
            nextSceneId: 'g3-s5',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'g3-s4-c2',
            text:
              '"Nuri, danke dass du das geteilt hast. Das brauchte Mut. Und ' +
              'Jonas, Leila – danke, dass ihr wirklich zugehoert habt."',
            consequence:
              'Du wuerdigst sowohl Nuris Mut als auch das echte Zuhoeren ' +
              'der anderen. Beides ist gleich wichtig.',
            nextSceneId: 'g3-s5',
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 2 }
          },
          {
            id: 'g3-s4-c3',
            text:
              '"Merkt ihr? Die Loesung war die ganze Zeit da. Ihr musstet nur ' +
              'aufhoeren zu kaempfen und anfangen zuzuhoeren."',
            consequence:
              'Du zeigst: Gute Loesungen entstehen durch Zuhoeren, nicht ' +
              'durch Durchsetzen. Das gilt ueberall.',
            nextSceneId: 'g3-s5',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'g3-s4-c4',
            text:
              '"Kompromisse sind fuer Schwache. Einer muss gewinnen, die ' +
              'anderen passen sich an. So laeuft das im echten Leben."',
            consequence:
              'Du hast die gemeinsame Loesung torpediert. Wer Zusammenarbeit ' +
              'als Schwaeche sieht, endet allein. Die besten Ergebnisse ' +
              'entstehen, wenn alle ihre Staerken einbringen – nicht wenn ' +
              'einer alle anderen unterdrueckt.',
            isWrong: true,
            nextSceneId: 'g3-s5',
            points: { empathyPoints: 0, insightPoints: 0, couragePoints: 0 }
          }
        ]
      },

      // Scene 5: Reflexion und Kernlektion
      {
        id: 'g3-s5',
        speaker: 'Erzaehler',
        speakerEmoji: '🌻',
        text:
          'Am Ende der Stunde hat die Gruppe einen gemeinsamen Plan. Er ist ' +
          'nicht perfekt. Jonas hat weniger Platz als gewuenscht, Leila muss ' +
          'eine Skulptur streichen, und Nuris ruhiger Bereich ist kleiner als ' +
          'in seiner Zeichnung. Aber alle fuehlen sich gehoert. Und DAS macht ' +
          'den Unterschied. Niemand ist wuetend. Niemand fuehlt sich ' +
          'uebergangen. Weil die Loesung nicht VON jemandem kam, sondern MIT ' +
          'allen entstanden ist. Gute Kommunikation heisst nicht, immer nett ' +
          'zu sein. Es heisst, ehrlich UND respektvoll zu sein. Bruecken ' +
          'werden nicht gebaut, indem man die eigene Seite verteidigt – ' +
          'sondern indem man den ersten Schritt auf die andere Seite wagt.',
        choices: [
          {
            id: 'g3-s5-c1',
            text:
              '"Ich nehme drei Werkzeuge mit: Aktiv zuhoeren. Ich-Botschaften ' +
              'benutzen. Und die Frage: Was brauchst du?"',
            consequence:
              'Du hast drei konkrete Kommunikationswerkzeuge verinnerlicht, ' +
              'die du sofort im Alltag einsetzen kannst.',
            nextSceneId: null,
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'g3-s5-c2',
            text:
              '"Am meisten hat mich beeindruckt, wie sich die Stimmung ' +
              'veraendert hat, als alle sich gehoert gefuehlt haben. ' +
              'Gehoert werden veraendert alles."',
            consequence:
              'Du erkennst eine tiefe Wahrheit: Menschen kaempfen oft nicht ' +
              'fuer ihre Idee – sondern dafuer, gehoert zu werden.',
            nextSceneId: null,
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 0 }
          },
          {
            id: 'g3-s5-c3',
            text:
              '"Die Bruecke entsteht nicht durch perfekte Worte, sondern ' +
              'durch den Willen, die andere Seite zu verstehen."',
            consequence:
              'Du hast die Essenz der Konfliktloesung erfasst: Nicht Technik, ' +
              'sondern der ehrliche Wille zur Verstaendigung.',
            nextSceneId: null,
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'g3-s5-c4',
            text:
              '"Ich-Botschaften und aktives Zuhoeren? Das klingt nach Therapie. ' +
              'Im echten Leben setzt sich der Staerkere durch."',
            consequence:
              'Du hast die Werkzeuge abgelehnt, die Konflikte loesen koennen. ' +
              'Wer glaubt, Staerke sei das einzige, was zaehlt, verwechselt ' +
              'Durchsetzung mit Verbindung. Die "staerksten" Menschen sind ' +
              'oft die einsamsten – weil niemand gerne mit jemandem redet, ' +
              'der nie zuhoert.',
            isWrong: true,
            nextSceneId: null,
            points: { empathyPoints: 0, insightPoints: 0, couragePoints: 0 }
          }
        ]
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // Kapitel 4 – Der gemeinsame Garten
  // Thema: Teamwork, Vertrauensaufbau, aufrichtig Entschuldigen,
  //         Beziehungspflege, Freundschaftspflege
  // Kernlektion: "Freundschaften sind wie Pflanzen – sie brauchen Pflege,
  //               Geduld und manchmal auch Regen."
  // Schwierigkeit: Hoch (Abschluss)
  // ---------------------------------------------------------------------------
  {
    id: 'garden-scenario-4',
    islandId: 'garden' as IslandId,
    title: 'Der gemeinsame Garten',
    description:
      'Der Schulgarten wird Realitaet. Aber echte Gemeinschaftsprojekte bringen ' +
      'echte Probleme: Enttaeuschung, Vertrauensbrueche und die Erkenntnis, ' +
      'dass Freundschaften Pflege brauchen – jeden Tag.',
    scenes: [
      // Scene 1: Der Aufbau beginnt
      {
        id: 'g4-s1',
        speaker: 'Erzaehler',
        speakerEmoji: '🌻',
        text:
          'Der Schulgarten wird gebaut! Nach dem erfolgreichen Plan geht es ' +
          'endlich los. Die Rollen sind verteilt: Jonas organisiert die ' +
          'Materialien, Leila gestaltet das Design, Nuri kuemmert sich um ' +
          'die Pflanzen, und du koordinierst das Ganze. Die ersten zwei Tage ' +
          'laufen fantastisch. Alle sind motiviert, alle packen an. Dann ' +
          'passiert es: Am dritten Tag taucht Jonas nicht auf. Kein Anruf, ' +
          'keine Nachricht, nichts. Ohne die Materialien steht alles still. ' +
          'Leila ist wuetend: "Typisch! Auf den kann man sich nie verlassen!" ' +
          'Nuri sagt nichts, aber du siehst die Enttaeuschung in seinen Augen.',
        choices: [
          {
            id: 'g4-s1-c1',
            text:
              '"Bevor wir urteilen – vielleicht ist etwas passiert. Wer von ' +
              'uns ruft Jonas an und fragt, ob alles okay ist?"',
            consequence:
              'Du gibst Jonas den Benefit of the Doubt, statt sofort zu ' +
              'verurteilen. Das ist Empathie in Aktion.',
            nextSceneId: 'g4-s2',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 1 }
          },
          {
            id: 'g4-s1-c2',
            text:
              '"Ich verstehe deinen Frust, Leila. Aber was koennen wir JETZT ' +
              'tun? Worauf haben wir gerade Einfluss?"',
            consequence:
              'Du lenkst den Fokus von Schuldzuweisung auf Loesung. Man ' +
              'kann nicht aendern, was passiert ist – aber was als Naechstes kommt.',
            nextSceneId: 'g4-s2',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'g4-s1-c3',
            text:
              '"Leila, erinnerst du dich, was wir gelernt haben? Erst ' +
              'zuhoeren, dann urteilen. Das gilt auch jetzt."',
            consequence:
              'Du erinnerst die Gruppe an die Kommunikationsregeln – auch ' +
              'dann, wenn es schwer ist, sich daran zu halten.',
            nextSceneId: 'g4-s2',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 2 }
          }
        ]
      },

      // Scene 2: Jonas' Erklaerung
      {
        id: 'g4-s2',
        speaker: 'Jonas',
        speakerEmoji: '🌿',
        text:
          'Am naechsten Tag kommt Jonas. Ohne Materialien. Mit gesenktem Kopf. ' +
          '"Es tut mir leid. Ich... mein Vater und meine Mutter haben vorgestern ' +
          'nacht wieder laut gestritten. Richtig heftig. Ich konnte nicht ' +
          'schlafen. Und gestern morgen... ich hab einfach alles vergessen. ' +
          'Ich hab nicht mal daran gedacht, Bescheid zu sagen." Leila wird ' +
          'still. Nuri schaut zu Boden. Du merkst: Hinter dem "Unzuverlaessigen" ' +
          'steckt ein Junge, der zu Hause kaempft. Aber das aendert nichts ' +
          'daran, dass das Team gelitten hat. Beide Dinge koennen gleichzeitig ' +
          'wahr sein: Mitgefuehl fuer Jonas UND die Erkenntnis, dass das Team ' +
          'eine Loesung braucht.',
        choices: [
          {
            id: 'g4-s2-c1',
            text:
              '"Jonas, danke dass du das erzaehlst. Das klingt wirklich schwer. ' +
              'Gleichzeitig – wir muessen zusammen eine Loesung finden, damit ' +
              'es nicht wieder passiert. Beides ist wichtig."',
            consequence:
              'Du zeigst Empathie UND Verantwortungsbewusstsein gleichzeitig. ' +
              'Das eine schliesst das andere nicht aus.',
            nextSceneId: 'g4-s3',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'g4-s2-c2',
            text:
              '"Das tut mir leid wegen zu Hause. Aber das Team braucht dich. ' +
              'Was koennten wir aendern, damit du Unterstuetzung hast, wenn ' +
              'es schwierig wird?"',
            consequence:
              'Du fragst nicht "Was hast du falsch gemacht?", sondern "Was ' +
              'brauchst du?" – die Frage, die alles veraendert.',
            nextSceneId: 'g4-s3',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'g4-s2-c3',
            text:
              '"Leila, ich weiss, du warst frustriert. Moechtest du Jonas ' +
              'sagen, wie es sich fuer dich angefuehlt hat – mit Ich-Botschaften?"',
            consequence:
              'Du foerderst ehrliche Kommunikation im Team, auch wenn es ' +
              'unbequem ist. Ehrlichkeit ist der Klebstoff, der Teams zusammenhaelt.',
            nextSceneId: 'g4-s3',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 3 }
          }
        ]
      },

      // Scene 3: Vertrauen reparieren
      {
        id: 'g4-s3',
        speaker: 'Leila',
        speakerEmoji: '🎨',
        text:
          'Leila atmet tief durch. "Okay. Jonas... ich war sauer. Nicht wegen ' +
          'der Materialien. Sondern weil ich dachte, dir ist unser Projekt ' +
          'egal. ICH habe mich nicht wichtig gefuehlt." Jonas schaut ' +
          'ueberrascht. "Es ist mir nicht egal! Ich war nur... ueberfordert." ' +
          'Leila nickt langsam. "Ich haette auch anrufen koennen. Statt ' +
          'wuetend zu sein, haette ich fragen koennen, ob alles okay ist. ' +
          'Das tut mir leid." Nuri, der Stille, sagt ploetzlich: "Ich glaube, ' +
          'Vertrauen heisst nicht, dass nie etwas schiefgeht. Sondern dass ' +
          'man danach ehrlich darueber redet."',
        choices: [
          {
            id: 'g4-s3-c1',
            text:
              '"Nuri hat etwas Wichtiges gesagt. Vertrauen ist keine Garantie, ' +
              'dass alles perfekt laeuft. Es ist die Entscheidung, einander ' +
              'trotzdem eine Chance zu geben."',
            consequence:
              'Du vertiefst Nuris Erkenntnis ueber Vertrauen. Vertrauen ' +
              'ist kein Zustand – es ist eine taegliche Entscheidung.',
            nextSceneId: 'g4-s4',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'g4-s3-c2',
            text:
              '"Leila, das war beeindruckend – du hast auch deinen eigenen ' +
              'Anteil erkannt. Eine Entschuldigung, die in beide Richtungen ' +
              'geht, ist selten und stark."',
            consequence:
              'Du wuerdigst, dass echtes Entschuldigen keine Einbahnstrasse ' +
              'ist. Beide koennen etwas lernen.',
            nextSceneId: 'g4-s4',
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 2 }
          },
          {
            id: 'g4-s3-c3',
            text:
              '"Wie waere es, wenn wir als Team eine Vereinbarung treffen: ' +
              'Wenn jemand nicht kann, sagt er Bescheid. Ohne Vorwuerfe. ' +
              'Und wenn jemand nicht Bescheid sagt, fragen wir erstmal nach, ' +
              'statt wuetend zu werden."',
            consequence:
              'Du schaffst eine konkrete Teamvereinbarung fuer die Zukunft. ' +
              'Strukturen helfen, wenn Gefuehle hochkochen.',
            nextSceneId: 'g4-s4',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 2 }
          }
        ]
      },

      // Scene 4: Der Regen
      {
        id: 'g4-s4',
        speaker: 'Erzaehler',
        speakerEmoji: '🌻',
        text:
          'Wochen vergehen. Der Garten waechst. Jonas bringt nicht nur ' +
          'Materialien, sondern auch selbstgemachte Limonade fuer die Gruppe. ' +
          'Leila malt ein Wandbild, das alle vier als Gaertner zeigt. Nuri ' +
          'hat einen kleinen Bereich nur fuer Schmetterlinge angelegt – ' +
          '"weil die auch leise sind und trotzdem wichtig", sagt er mit ' +
          'einem schuechternen Laecheln. Dann kommt der Regen. Drei Tage ' +
          'Dauerregen. Der Garten verwandelt sich in ein Schlammfeld. Jonas ' +
          'seufzt: "War alles umsonst." Leila starrt auf ihr zerlaufenes ' +
          'Wandbild. Nuri sagt nichts, aber sein Blick sagt alles. Enttaeuschung. ' +
          'Zweifel. War es die Muehe wert?',
        choices: [
          {
            id: 'g4-s4-c1',
            text:
              '"Wir haben den Garten nicht gebaut, weil es leicht ist. ' +
              'Sondern weil er uns wichtig ist. Und was uns wichtig ist, ' +
              'geben wir nicht nach dem ersten Regen auf."',
            consequence:
              'Du erinnerst die Gruppe an ihren gemeinsamen Wert. Motivation ' +
              'kommt nicht von aussen – sie kommt von Bedeutung.',
            nextSceneId: 'g4-s5',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 3 }
          },
          {
            id: 'g4-s4-c2',
            text:
              '"Wisst ihr, was Pflanzen nach dem Regen machen? Sie wachsen ' +
              'staerker. Weil die Wurzeln tiefer greifen muessen. Vielleicht ' +
              'ist das mit Freundschaften genauso."',
            consequence:
              'Du benutzt die Gartenmetapher, um Resilienz zu zeigen. ' +
              'Wachstum braucht auch schwierige Zeiten.',
            nextSceneId: 'g4-s5',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'g4-s4-c3',
            text:
              '"Es ist okay, enttaeuscht zu sein. Lasst uns das fuehlen. ' +
              'Und morgen schauen wir gemeinsam, was wir retten koennen."',
            consequence:
              'Du erlaubst Enttaeuschung, ohne in Aufgeben zu verfallen. ' +
              'Gefuehle zulassen ist der erste Schritt, sie zu ueberwinden.',
            nextSceneId: 'g4-s5',
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 2 }
          }
        ]
      },

      // Scene 5: Reflexion und Kernlektion
      {
        id: 'g4-s5',
        speaker: 'Erzaehler',
        speakerEmoji: '🌻',
        text:
          'Sie machen weiter. Nicht weil es perfekt laeuft, sondern weil sie ' +
          'fuereinander weitermachen. Jonas bringt neue Erde. Leila malt das ' +
          'Wandbild neu – diesmal mit wasserfester Farbe und einem neuen ' +
          'Detail: einem Regenbogen ueber dem Garten. Nuri pflanzt ' +
          'widerstandsfaehigere Blumen. Und du? Du hast die Gruppe ' +
          'zusammengehalten. Nicht durch grosse Reden, sondern durch da sein, ' +
          'zuhoeren, und manchmal einfach nur mitmachen. Als der Garten ' +
          'endlich blueht – schoener als vorher, weil die Wurzeln nach dem ' +
          'Regen tiefer reichen – stehen alle vier davor. Jonas sagt: "Wir ' +
          'haben das zusammen geschafft." Leila ergaenzt: "Trotz allem." ' +
          'Und Nuri, leise wie immer, aber mit fester Stimme: "Wegen allem." ' +
          'Freundschaften sind wie Pflanzen – sie brauchen Pflege, Geduld ' +
          'und manchmal auch Regen.',
        choices: [
          {
            id: 'g4-s5-c1',
            text:
              '"Was ich gelernt habe: Beziehungen sind Arbeit. Nicht die ' +
              'anstrengende Art – die lohnende Art. Die Art, bei der man ' +
              'am Ende auf etwas Schoenes schaut und weiss: Das haben wir ' +
              'zusammen gebaut."',
            consequence:
              'Du hast die Essenz der Beziehungspflege verstanden: Es lohnt ' +
              'sich, in Menschen zu investieren.',
            nextSceneId: null,
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'g4-s5-c2',
            text:
              '"Das Schoenste am Garten sind nicht die Blumen. Es sind die ' +
              'Menschen, die ihn zusammen gebaut haben. Und die Geschichten, ' +
              'die sie dabei geteilt haben."',
            consequence:
              'Du erkennst: Gemeinschaft und Verbindung sind wertvoller als ' +
              'jedes sichtbare Ergebnis.',
            nextSceneId: null,
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 2 }
          },
          {
            id: 'g4-s5-c3',
            text:
              '"Freundschaften ueberleben nicht, weil alles perfekt laeuft. ' +
              'Sie ueberleben, weil man sich entscheidet, sie zu pflegen – ' +
              'auch wenn es regnet. Besonders wenn es regnet."',
            consequence:
              'Du verinnerlichst die Kernbotschaft: Beziehungen sind keine ' +
              'Selbstverstaendlichkeit. Sie sind eine taegliche Entscheidung.',
            nextSceneId: null,
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 2 }
          }
        ]
      }
    ]
  }
];

// =============================================================================
// 3. WISDOM CARDS
// =============================================================================

export const gardenWisdomCards: WisdomCard[] = [
  {
    id: 'garden-wisdom-1',
    islandId: 'garden' as IslandId,
    title: 'Verschiedene Blumen, verschiedene Gefuehle',
    text:
      'Nur weil du etwas anders fuehlst, heisst das nicht, dass das Gefuehl ' +
      'des anderen falsch ist. Im Garten waechst jede Blume anders – und jede ' +
      'verdient Sonne. Deine Aufgabe ist nicht, die Gefuehle anderer zu ' +
      'bewerten, sondern sie zu respektieren.',
    category: 'Perspektivuebernahme',
    collected: false
  },
  {
    id: 'garden-wisdom-2',
    islandId: 'garden' as IslandId,
    title: 'Hinter der Haerte steckt Schmerz',
    text:
      'Wer andere verletzt, hat oft selbst Schmerzen. Das entschuldigt nichts – ' +
      'aber es erklaert manches. Und manchmal ist Verstehen der erste Schritt ' +
      'zur Veraenderung. Empathie heisst nicht zustimmen. Es heisst hinschauen.',
    category: 'Empathie',
    collected: false
  },
  {
    id: 'garden-wisdom-3',
    islandId: 'garden' as IslandId,
    title: 'Zuhoeren ist eine Superkraft',
    text:
      'Wirklich zuhoeren heisst nicht: warten, bis man selbst reden darf. Es ' +
      'heisst: mit voller Aufmerksamkeit da sein. Kein Handy, kein "Bei mir ' +
      'war das auch so". Nur Zuhoeren. Wer wirklich zuhoert, schenkt dem ' +
      'anderen das Wertvollste: das Gefuehl, wichtig zu sein.',
    category: 'Aktives Zuhoeren',
    collected: false
  },
  {
    id: 'garden-wisdom-4',
    islandId: 'garden' as IslandId,
    title: 'Ich-Botschaften statt Du-Vorwuerfe',
    text:
      '"Ich fuehle mich verletzt, weil..." oeffnet Tueren. "DU machst immer..." ' +
      'schliesst sie. Der Unterschied ist klein im Satz, aber riesig in der ' +
      'Wirkung. Probier es aus: Ersetze jedes "Du bist..." durch "Ich fuehle...".',
    category: 'Kommunikation',
    collected: false
  },
  {
    id: 'garden-wisdom-5',
    islandId: 'garden' as IslandId,
    title: 'Ehrlich UND respektvoll',
    text:
      'Gute Kommunikation heisst nicht, immer nett zu sein. Es heisst, ehrlich ' +
      'UND respektvoll zu sein – gleichzeitig. Ehrlichkeit ohne Respekt ist ' +
      'Grausamkeit. Respekt ohne Ehrlichkeit ist Luege. Beides zusammen ist ' +
      'die Grundlage jeder echten Beziehung.',
    category: 'Ehrlichkeit',
    collected: false
  },
  {
    id: 'garden-wisdom-6',
    islandId: 'garden' as IslandId,
    title: 'Vertrauen waechst langsam',
    text:
      'Vertrauen ist kein Lichtschalter – man kann es nicht einfach anknipsen. ' +
      'Es waechst wie eine Pflanze: langsam, mit Geduld, und es braucht die ' +
      'richtigen Bedingungen. Aber wenn es einmal Wurzeln geschlagen hat, ' +
      'haelt es auch Stuermen stand.',
    category: 'Vertrauen',
    collected: false
  },
  {
    id: 'garden-wisdom-7',
    islandId: 'garden' as IslandId,
    title: 'Echte Entschuldigungen',
    text:
      'Eine echte Entschuldigung hat drei Teile: Sagen, was man getan hat. ' +
      'Anerkennen, wie es den anderen verletzt hat. Und fragen, was man anders ' +
      'machen kann. Alles andere ist nur hoefliches Gerede. Und ja – sich ' +
      'entschuldigen braucht mehr Mut als sich zu verteidigen.',
    category: 'Verantwortung',
    collected: false
  },
  {
    id: 'garden-wisdom-8',
    islandId: 'garden' as IslandId,
    title: 'Freundschaften brauchen Pflege',
    text:
      'Freundschaften sind wie Pflanzen – sie brauchen Pflege, Geduld und ' +
      'manchmal auch Regen. Wer erwartet, dass sie von allein wachsen, wird ' +
      'enttaeuscht. Wer sie giesst – mit Ehrlichkeit, Zuhoeren und manchmal ' +
      'auch Verzeihen – wird mit den schoensten Blueten belohnt.',
    category: 'Beziehungspflege',
    collected: false
  }
];

// =============================================================================
// 4. ACTIVITIES
// =============================================================================

export const gardenActivities: GardenActivity[] = [
  // Activity 1: Aktives Zuhoeren
  {
    id: 'garden-activity-1',
    islandId: 'garden' as IslandId,
    title: 'Aktives Zuhoeren – Die 5-Minuten-Challenge',
    description:
      'Uebe aktives Zuhoeren mit einem konkreten Experiment, das deine ' +
      'Beziehungen sofort veraendern kann.',
    type: 'reflection',
    instructions: [
      'Bitte jemanden (Freund, Geschwister, Elternteil), dir fuenf Minuten ' +
        'lang etwas zu erzaehlen. Es kann alles sein – der Tag, ein Problem, ' +
        'ein Traum, eine Erinnerung.',
      'Deine Regeln waehrend der fuenf Minuten: Nicht unterbrechen. Kein ' +
        'Handy anfassen. Kein "Bei mir war das auch so". Nur zuhoeren. Mit ' +
        'voller Aufmerksamkeit.',
      'Zeige mit Koerpersprache, dass du zuhoerst: Augenkontakt (wenn es ' +
        'fuer euch beide okay ist), Nicken, offene Haltung. Dein Koerper sagt ' +
        'mehr als Worte.',
      'Wenn die Person fertig ist, fasse in deinen eigenen Worten zusammen, ' +
        'was du gehoert hast: "Du meinst also, dass..." Lass sie korrigieren, ' +
        'wenn du etwas falsch verstanden hast.',
      'Stelle eine Frage, die zeigt, dass du wirklich zugehoert hast. Nicht ' +
        '"Und dann?" sondern "Wie hast du dich dabei gefuehlt?" oder "Was hat ' +
        'dich am meisten beschaeftigt?"',
      'Frage am Ende: "Hast du dich gehoert gefuehlt?" – und hoere dir die ' +
        'Antwort genau an. Die Antwort wird dich ueberraschen.',
      'Schreibe danach auf: Was war schwer? Was hat dich ueberrascht? Was ' +
        'moechtest du oefter tun? Was hast du ueber die andere Person gelernt, ' +
        'das du vorher nicht wusstest?'
    ],
    points: 15,
    completed: false
  },

  // Activity 2: Freundschafts-Tagebuch
  {
    id: 'garden-activity-2',
    islandId: 'garden' as IslandId,
    title: 'Freundschafts-Tagebuch',
    description:
      'Reflektiere ueber eine wichtige Freundschaft und entdecke, was sie ' +
      'stark macht – und was sie von dir braucht.',
    type: 'journal',
    instructions: [
      'Denke an eine Freundschaft, die dir wichtig ist. Schreibe den Namen ' +
        'der Person auf ein Blatt Papier (oder in dein Tagebuch).',
      'Beantworte diese Fragen ehrlich: Was schaetze ich an dieser Person? ' +
        'Was bringt sie in mein Leben, das sonst niemand bringt? Was macht ' +
        'unsere Freundschaft besonders?',
      'Jetzt der schwierigere Teil: Gab es Momente, in denen es schwierig ' +
        'war? Einen Streit, ein Missverstaendnis, eine Enttaeuschung? Was ist ' +
        'genau passiert? Wie hast du dich gefuehlt?',
      'Was hast du daraus gelernt? Was wuerdest du heute anders machen? ' +
        'Gibt es etwas, das du noch nicht gesagt hast – das du aber sagen ' +
        'solltest?',
      'Letzte Frage: Was koenntest du HEUTE tun, um dieser Freundschaft ' +
        'etwas Gutes zu tun? Etwas Kleines reicht – eine Nachricht, ein Anruf, ' +
        'ein ehrliches Kompliment, eine Einladung zum Spaziergang.',
      'Bonus: Tu es. Heute noch. Und schreibe morgen auf, was passiert ist ' +
        'und wie es sich angefuehlt hat.'
    ],
    points: 15,
    completed: false
  },

  // Activity 3: Konflikte loesen
  {
    id: 'garden-activity-3',
    islandId: 'garden' as IslandId,
    title: 'Konflikte loesen – Mein Werkzeugkasten',
    description:
      'Erstelle deinen persoenlichen Werkzeugkasten fuer Konfliktsituationen, ' +
      'den du im echten Leben benutzen kannst.',
    type: 'reflection',
    instructions: [
      'Denke an einen Konflikt, den du kuerzlich hattest oder beobachtet hast. ' +
        'Schreibe kurz auf, was passiert ist – moeglichst neutral, ohne Schuld ' +
        'zuzuweisen.',
      'Perspektivenwechsel: Schreibe die Situation aus DEINER Sicht. Dann ' +
        'schreibe sie aus der Sicht der anderen Person. Versuche, grosszuegig ' +
        'zu sein und auch ihre Gruende zu sehen.',
      'Formuliere drei Ich-Botschaften, die du haettest sagen koennen: ' +
        '"Ich fuehle mich [Gefuehl], weil [Situation]. Ich wuensche mir ' +
        '[konkreter Wunsch]."',
      'Beduerfnisse erkennen: Was war das BEDUERFNIS hinter deiner Position? ' +
        'Und was war das Beduerfnis der anderen Person? (Tipp: Oft sind es ' +
        'Dinge wie Sicherheit, Zugehoerigkeit, Respekt, Fairness.)',
      'Schreibe einen moeglichen Kompromiss auf – eine Loesung, bei der beide ' +
        'Beduerfnisse beruecksichtigt werden. Nicht perfekt, aber fair.',
      'Erstelle eine kleine Karte (passt in die Hosentasche) mit deinen drei ' +
        'besten Werkzeugen fuer Konflikte. Zum Beispiel: 1. Tief durchatmen. ' +
        '2. Ich-Botschaft formulieren. 3. Fragen: Was brauchst du?'
    ],
    points: 20,
    completed: false
  },

  // Activity 4: Empathie-Training
  {
    id: 'garden-activity-4',
    islandId: 'garden' as IslandId,
    title: 'Empathie-Training – In fremden Schuhen',
    description:
      'Trainiere deine Faehigkeit, die Welt mit den Augen anderer zu sehen – ' +
      'besonders bei Menschen, die du nicht so gut verstehst.',
    type: 'creative',
    instructions: [
      'Waehle eine Person aus deinem Leben, mit der du oft verschiedener ' +
        'Meinung bist oder die du nicht so gut verstehst. Das kann ein ' +
        'Mitschueler, ein Geschwister oder ein Elternteil sein.',
      'Schreibe drei Dinge auf, die diese Person tut oder sagt, die dich ' +
        'nerven oder verletzen. Sei ehrlich – hier liest niemand mit.',
      'Jetzt der Perspektivwechsel: Stell dir vor, DU waerst diese Person. ' +
        'Schreibe einen kurzen Tagebucheintrag aus IHRER Sicht ueber einen ' +
        'typischen Tag. Was denkt sie? Was fuehlt sie? Wovor hat sie Angst?',
      'Ueberlege: Welche Sorgen, Aengste oder Wuensche hat diese Person, ' +
        'die du bisher nicht gesehen hast? Warum verhalt sie sich so, wie ' +
        'sie sich verhaelt? Was koennte hinter dem Verhalten stecken?',
      'Formuliere einen Satz, der mit "Ich verstehe jetzt, dass du..." ' +
        'beginnt. Dieser Satz muss nicht bedeuten, dass du zustimmst – nur, ' +
        'dass du versuchst zu verstehen.',
      'Fortgeschritten: Wenn du mutig genug bist, sprich mit der Person ' +
        'und sag ihr den Satz. Beobachte, was passiert. Oft oeffnet ein ' +
        'einziger Satz eine Tuer, die jahrelang verschlossen war.'
    ],
    points: 20,
    completed: false
  }
];
