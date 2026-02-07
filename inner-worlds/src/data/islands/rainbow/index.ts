// =============================================================================
// Inner Worlds – Regenbogen-Insel (Rainbow Island)
// Theme: Vielfalt & Zusammenleben (Diversity & Living Together)
// =============================================================================

import type { Scenario, WisdomCard, Activity, IslandId } from '../../../types';

// -----------------------------------------------------------------------------
// Local types for island-specific data
// -----------------------------------------------------------------------------

interface NPC {
  id: string;
  name: string;
  emoji: string;
  description: string;
  backstory: string;
}

interface ExtendedActivity extends Activity {
  instructions: string[];
}

const ISLAND_ID: IslandId = 'rainbow';

// =============================================================================
// NPCs – Vielfältige Charaktere aus Luxemburgs multikultureller Gesellschaft
// =============================================================================

export const rainbowNPCs: NPC[] = [
  {
    id: 'npc-rainbow-sofia',
    name: 'Sofia',
    emoji: '🌻',
    description:
      'Sofia ist 13 und vor zwei Jahren mit ihrer Familie aus Portugal nach Luxemburg gezogen. Sie liebt Musik und kann drei Sprachen sprechen.',
    backstory:
      'Als Sofia nach Luxemburg kam, konnte sie kaum Deutsch. Die ersten Monate waren hart – sie fühlte sich oft unsichtbar, weil sie im Unterricht nichts sagen konnte. Heute hilft sie anderen Kindern, die neu ankommen, weil sie genau weiss, wie sich das anfühlt. Sofia sagt: "Jede Sprache, die du lernst, öffnet dir eine neue Tür zu den Menschen."',
  },
  {
    id: 'npc-rainbow-amadou',
    name: 'Amadou',
    emoji: '🥁',
    description:
      'Amadou ist 14 und in Luxemburg geboren. Seine Eltern kommen aus dem Senegal. Er spielt Djembé und trainiert Leichtathletik.',
    backstory:
      'Amadou hat manchmal das Gefühl, zwischen zwei Welten zu stehen – der Kultur seiner Eltern und dem Leben in Luxemburg. Früher hat ihn das verwirrt, aber heute sieht er es als Stärke. Er sagt: "Ich bin nicht halb-halb. Ich bin doppelt so viel." Amadou organisiert in seiner Schule ein jährliches Kulturfest, bei dem alle etwas aus ihrer Herkunft zeigen können.',
  },
  {
    id: 'npc-rainbow-lina',
    name: 'Lina',
    emoji: '📚',
    description:
      'Lina ist 12, in Luxemburg aufgewachsen und spricht Lëtzebuergesch, Deutsch und Französisch. Sie schreibt gerne Geschichten.',
    backstory:
      'Lina war früher schüchtern und hat sich nicht getraut, neue Kinder anzusprechen – vor allem, wenn sie anders aussahen oder eine andere Sprache sprachen. Dann kam Yasmine in ihre Klasse und alles änderte sich. Lina merkte, dass Neugier viel stärker ist als Unsicherheit. Heute sagt sie: "Die spannendsten Geschichten entstehen, wenn verschiedene Menschen zusammenkommen."',
  },
  {
    id: 'npc-rainbow-pierre',
    name: 'Pierre',
    emoji: '🎨',
    description:
      'Pierre ist 13, kommt aus einer französisch-luxemburgischen Familie und ist ein begeisterter Künstler. Er liebt Street-Art und Comics.',
    backstory:
      'Pierre wurde eine Zeit lang gemobbt, weil er lieber zeichnete als Fussball spielte. Manche nannten ihn "komisch". Das hat wehgetan, aber Pierre hat gelernt, dass anders sein kein Fehler ist – es ist sein Ding. Sein bestes Wandbild in der Schule zeigt Hände in verschiedenen Hautfarben, die zusammen ein Herz formen. Er sagt: "Wenn alle gleich wären, wäre die Welt ziemlich langweilig."',
  },
  {
    id: 'npc-rainbow-yasmine',
    name: 'Yasmine',
    emoji: '🌙',
    description:
      'Yasmine ist 12, trägt ein Kopftuch und ist die beste Mathematikerin ihrer Klasse. Sie liebt Rätsel und logisches Denken.',
    backstory:
      'Yasmine hat es satt, dass Leute sie zuerst über ihr Kopftuch definieren, statt über das, was sie kann. Sie hat gelernt, geduldig zu erklären, aber auch klar Grenzen zu setzen, wenn jemand respektlos wird. Yasmine sagt: "Frag mich ruhig, wenn du neugierig bist – aber respektvoll. Dann erzähle ich dir gerne alles." Sie träumt davon, Ingenieurin zu werden.',
  },
];

// =============================================================================
// Szenarien
// =============================================================================

export const rainbowScenarios: Scenario[] = [
  // ---------------------------------------------------------------------------
  // Szenario 1: Das neue Kind
  // ---------------------------------------------------------------------------
  {
    id: 'rainbow-scenario-das-neue-kind',
    islandId: ISLAND_ID,
    title: 'Das neue Kind',
    description:
      'Ein neues Kind aus einem anderen Land kommt in deine Klasse. Es spricht kaum Deutsch und wirkt unsicher. Wie gehst du damit um?',
    scenes: [
      {
        id: 'rainbow-s1-scene-1',
        text: 'Eure Lehrerin stellt ein neues Kind vor: "Das ist Mateo. Er kommt aus Brasilien und ist erst seit zwei Wochen in Luxemburg. Er lernt gerade Deutsch." Mateo steht vorne und lächelt unsicher. Einige in der Klasse tuscheln.',
        speaker: 'Erzähler',
        speakerEmoji: '📖',
        choices: [
          {
            id: 'rainbow-s1-sc1-c1',
            text: 'Ich lächle Mateo an und zeige auf den freien Platz neben mir.',
            consequence:
              'Mateo setzt sich neben dich. Er sieht erleichtert aus. Dein Lächeln hat ihm gezeigt: Hier bin ich willkommen.',
            empathyPoints: 3,
            insightPoints: 1,
            couragePoints: 2,
            nextSceneId: 'rainbow-s1-scene-2a',
          },
          {
            id: 'rainbow-s1-sc1-c2',
            text: 'Ich schaue kurz hin, sage aber nichts. Soll er sich halt irgendwo hinsetzen.',
            consequence:
              'Mateo setzt sich in die letzte Reihe, alleine. Er schaut auf den Tisch. Manchmal reicht schon ein kleines Zeichen, um jemandem den Tag zu retten – oder eben nicht.',
            empathyPoints: 0,
            insightPoints: 1,
            couragePoints: 0,
            nextSceneId: 'rainbow-s1-scene-2b',
          },
          {
            id: 'rainbow-s1-sc1-c3',
            text: 'Ich flüstere meinem Nachbarn zu: "Der kann bestimmt nicht mal richtig Deutsch."',
            consequence:
              'Mateo hat es gehört. Sein Lächeln verschwindet. Wörter können wehtun, auch wenn man sie nur flüstert. Vielleicht kannst du das noch geradebiegen.',
            empathyPoints: -1,
            insightPoints: 1,
            couragePoints: 0,
            nextSceneId: 'rainbow-s1-scene-2b',
          },
        ],
      },
      {
        id: 'rainbow-s1-scene-2a',
        text: 'In der Pause steht Mateo alleine auf dem Schulhof. Er versteht nicht, was die anderen rufen. Ein paar Kinder zeigen auf ihn und lachen, weil er seinen Rucksack "falsch" trägt. Sofia kommt zu dir: "Hey, erinnerst du dich, wie das für mich war, als ich neu hier ankam? Willst du Mateo vielleicht helfen?"',
        speaker: 'Sofia',
        speakerEmoji: '🌻',
        choices: [
          {
            id: 'rainbow-s1-sc2a-c1',
            text: 'Ich gehe zu Mateo und versuche, mit Händen und Füssen zu kommunizieren.',
            consequence:
              'Mateo lacht zum ersten Mal richtig. Ihr versteht euch nicht perfekt, aber eure Gesten und euer Lachen sagen mehr als tausend Worte. Kommunikation ist so viel mehr als nur Sprache.',
            empathyPoints: 3,
            insightPoints: 2,
            couragePoints: 2,
            nextSceneId: 'rainbow-s1-scene-3',
          },
          {
            id: 'rainbow-s1-sc2a-c2',
            text: 'Ich frage Sofia, ob sie mitkommen will – zusammen ist es leichter.',
            consequence:
              'Ihr geht zusammen zu Mateo. Sofia sagt ein paar Worte auf Portugiesisch – und Mateo strahlt. Portugiesisch und Brasilianisch sind sich ähnlich! Plötzlich hat Mateo zwei neue Freunde.',
            empathyPoints: 3,
            insightPoints: 2,
            couragePoints: 1,
            nextSceneId: 'rainbow-s1-scene-3',
          },
          {
            id: 'rainbow-s1-sc2a-c3',
            text: 'Ich will schon, aber die anderen könnten mich auch auslachen...',
            consequence:
              'Du zögerst. Das ist verständlich – es braucht Mut, gegen den Strom zu schwimmen. Aber manchmal ist ein kleiner mutiger Schritt alles, was es braucht.',
            empathyPoints: 1,
            insightPoints: 2,
            couragePoints: 0,
            nextSceneId: 'rainbow-s1-scene-3',
          },
        ],
      },
      {
        id: 'rainbow-s1-scene-2b',
        text: 'In der Pause siehst du, wie Mateo alleine an der Wand steht. Er versucht, sein Handy als Übersetzer zu benutzen, aber andere Kinder lachen darüber. Amadou kommt vorbei und sagt leise zu dir: "Weisst du, als meine Eltern hierherkamen, hat auch niemand mit ihnen geredet. Das vergisst man nie."',
        speaker: 'Amadou',
        speakerEmoji: '🥁',
        choices: [
          {
            id: 'rainbow-s1-sc2b-c1',
            text: 'Amadou hat recht. Ich gehe hin und zeige Mateo, wo die Kantine ist.',
            consequence:
              'Eine kleine Geste, aber für Mateo ist sie riesig. Er zeigt dir auf seinem Handy "Danke" auf Deutsch. Es ist nie zu spät, das Richtige zu tun.',
            empathyPoints: 3,
            insightPoints: 2,
            couragePoints: 2,
            nextSceneId: 'rainbow-s1-scene-3',
          },
          {
            id: 'rainbow-s1-sc2b-c2',
            text: 'Ich fühle mich schlecht wegen vorhin. Ich sage Amadou, dass ich nicht weiss, wie ich es wiedergutmachen kann.',
            consequence:
              'Amadou lächelt: "Fang einfach an. Geh hin und sag Hallo. Mehr braucht es erstmal nicht." Manchmal ist der schwierigste Schritt der erste.',
            empathyPoints: 2,
            insightPoints: 3,
            couragePoints: 1,
            nextSceneId: 'rainbow-s1-scene-3',
          },
          {
            id: 'rainbow-s1-sc2b-c3',
            text: 'Ich sage nichts und gehe mit meinen Freunden weg.',
            consequence:
              'Du gehst, aber das Bild von Mateo, wie er alleine an der Wand steht, geht dir nicht aus dem Kopf. Manchmal sagt unser Gewissen mehr als unsere Worte.',
            empathyPoints: 0,
            insightPoints: 2,
            couragePoints: 0,
            nextSceneId: 'rainbow-s1-scene-3',
          },
        ],
      },
      {
        id: 'rainbow-s1-scene-3',
        text: 'Ein paar Tage später bringt Mateo Brigadeiros mit – brasilianische Pralinen, die seine Mutter gemacht hat. Er bietet sie schüchtern der Klasse an. Einige Kinder greifen sofort zu, andere zögern. Mateo schaut dich an.',
        speaker: 'Erzähler',
        speakerEmoji: '📖',
        choices: [
          {
            id: 'rainbow-s1-sc3-c1',
            text: 'Ich nehme eine und sage "Obrigado!" – das Wort hat mir Sofia beigebracht.',
            consequence:
              'Mateos Augen leuchten. Er bringt dir das Wort "Brigadeiro" bei und erzählt euch mit Händen und Füssen, wie man sie macht. Ein kleines Wort in der Sprache des anderen kann Brücken bauen.',
            empathyPoints: 3,
            insightPoints: 2,
            couragePoints: 1,
            nextSceneId: 'rainbow-s1-scene-4',
          },
          {
            id: 'rainbow-s1-sc3-c2',
            text: 'Ich nehme eine und frage neugierig, was das ist.',
            consequence:
              'Mateo strahlt und erklärt – halb mit Worten, halb mit Gesten – wie Brigadeiros gemacht werden. Die ganze Klasse hört zu. Neugier ist eine Superkraft, die Menschen verbindet.',
            empathyPoints: 2,
            insightPoints: 2,
            couragePoints: 1,
            nextSceneId: 'rainbow-s1-scene-4',
          },
          {
            id: 'rainbow-s1-sc3-c3',
            text: 'Ich sage: "Die sehen komisch aus" und fasse sie nicht an.',
            consequence:
              'Mateos Gesicht wird traurig. Er hat sich so viel Mühe gegeben. Essen aus anderen Kulturen ist nicht "komisch" – es ist einfach anders. Und anders kann richtig lecker sein.',
            empathyPoints: -1,
            insightPoints: 1,
            couragePoints: 0,
            nextSceneId: 'rainbow-s1-scene-4',
          },
        ],
      },
      {
        id: 'rainbow-s1-scene-4',
        text: 'Es ist Freitag. Mateo hat in Mathe eine super Note bekommen – er war in Brasilien schon richtig gut. Lina schlägt vor, dass Mateo beim nächsten Gruppenprojekt mitmachen soll. Aber ein anderer aus der Klasse sagt: "Der versteht uns doch eh nicht richtig."',
        speaker: 'Lina',
        speakerEmoji: '📚',
        choices: [
          {
            id: 'rainbow-s1-sc4-c1',
            text: '"Mateo ist mega gut in Mathe. Und Sprache lernt man am besten, wenn man zusammenarbeitet."',
            consequence:
              'Lina nickt begeistert. Mateo kommt in eure Gruppe und liefert die besten Berechnungen. Am Ende bekommt ihr die beste Note. Verschiedene Stärken machen ein Team stark – nicht gleiche.',
            empathyPoints: 3,
            insightPoints: 3,
            couragePoints: 3,
            nextSceneId: null,
          },
          {
            id: 'rainbow-s1-sc4-c2',
            text: '"Lass ihm doch eine Chance. Du hättest das auch nicht gerne, wenn du neu wärst."',
            consequence:
              'Dein Klassenkamerad überlegt kurz und nickt dann. Perspektivwechsel wirkt. Mateo wird aufgenommen und zeigt allen eine brasilianische Methode, die sogar die Lehrerin beeindruckt.',
            empathyPoints: 3,
            insightPoints: 2,
            couragePoints: 2,
            nextSceneId: null,
          },
          {
            id: 'rainbow-s1-sc4-c3',
            text: 'Ich sage nichts, aber ich hole Mateo leise dazu, als die Gruppen sich aufteilen.',
            consequence:
              'Manchmal muss man nicht laut sein, um etwas Richtiges zu tun. Mateo merkt, dass du an ihn denkst, und lächelt dankbar. Jede freundliche Tat zählt, egal wie leise sie ist.',
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
  // Szenario 2: Cybermobbing
  // ---------------------------------------------------------------------------
  {
    id: 'rainbow-scenario-cybermobbing',
    islandId: ISLAND_ID,
    title: 'Cybermobbing',
    description:
      'In einem Klassenchat tauchen fiese Nachrichten über jemanden auf. Was tust du, wenn Mobbing digital wird?',
    scenes: [
      {
        id: 'rainbow-s2-scene-1',
        text: 'Abends vibriert dein Handy. Im Klassenchat hat jemand ein peinliches Foto von Nadia gepostet – heimlich in der Umkleide gemacht. Darunter stehen schon hässliche Kommentare. Dein Magen zieht sich zusammen. Yasmine schreibt dir privat: "Hast du das gesehen? Das ist so falsch."',
        speaker: 'Yasmine',
        speakerEmoji: '🌙',
        choices: [
          {
            id: 'rainbow-s2-sc1-c1',
            text: 'Ich schreibe in den Chat: "Leute, löscht das! Das ist Cybermobbing."',
            consequence:
              'Einige lachen, aber andere werden still. Dein Kommentar bricht das Schweigen. Manchmal braucht es nur eine Stimme, die sagt: Das ist nicht okay.',
            empathyPoints: 2,
            insightPoints: 2,
            couragePoints: 3,
            nextSceneId: 'rainbow-s2-scene-2',
          },
          {
            id: 'rainbow-s2-sc1-c2',
            text: 'Ich antworte Yasmine: "Ja, das ist schlimm. Lass uns zusammen überlegen, was wir tun können."',
            consequence:
              'Zusammen seid ihr stärker. Yasmine und du machen einen Plan. Wenn man sich Verbündete sucht, fühlt sich das Richtige weniger beängstigend an.',
            empathyPoints: 3,
            insightPoints: 2,
            couragePoints: 2,
            nextSceneId: 'rainbow-s2-scene-2',
          },
          {
            id: 'rainbow-s2-sc1-c3',
            text: 'Ich lese es, sage aber nichts. Ich will nicht zum nächsten Ziel werden.',
            consequence:
              'Verständlich – die Angst, selbst zur Zielscheibe zu werden, ist real. Aber Nadia ist jetzt ganz allein da draussen. Schweigen kann sich wie Zustimmung anfühlen.',
            empathyPoints: 0,
            insightPoints: 2,
            couragePoints: 0,
            nextSceneId: 'rainbow-s2-scene-2',
          },
          {
            id: 'rainbow-s2-sc1-c4',
            text: 'Ich mache einen Screenshot vom Chat als Beweis.',
            consequence:
              'Kluger Gedanke. Beweise sichern ist wichtig – sie können später helfen, wenn jemand leugnet, was passiert ist. Aber ein Screenshot allein reicht nicht.',
            empathyPoints: 1,
            insightPoints: 3,
            couragePoints: 1,
            nextSceneId: 'rainbow-s2-scene-2',
          },
        ],
      },
      {
        id: 'rainbow-s2-scene-2',
        text: 'Am nächsten Morgen in der Schule siehst du Nadia. Sie hat rote Augen und wirkt, als hätte sie nicht geschlafen. Sie geht an allen vorbei, ohne jemanden anzuschauen. Ein paar Kinder kichern, als sie vorbeigeht. Pierre steht neben dir und flüstert: "Das Foto wurde inzwischen auch in andere Gruppen geteilt."',
        speaker: 'Pierre',
        speakerEmoji: '🎨',
        choices: [
          {
            id: 'rainbow-s2-sc2-c1',
            text: 'Ich gehe zu Nadia und sage: "Hey, ich finde das total unfair, was passiert ist. Kann ich dir irgendwie helfen?"',
            consequence:
              'Nadia schaut dich überrascht an. Ihre Augen werden feucht: "Danke. Ich dachte, es ist allen egal." Manchmal ist es das Wichtigste, jemandem zu zeigen: Du bist nicht allein.',
            empathyPoints: 3,
            insightPoints: 1,
            couragePoints: 3,
            nextSceneId: 'rainbow-s2-scene-3',
          },
          {
            id: 'rainbow-s2-sc2-c2',
            text: 'Ich gehe mit Pierre zusammen zum Klassenlehrer und erzähle, was passiert ist.',
            consequence:
              'Der Lehrer nimmt es sofort ernst. Er bedankt sich, dass ihr den Mut hattet, es zu melden. Hilfe holen ist kein Petzen – es ist Verantwortung übernehmen.',
            empathyPoints: 2,
            insightPoints: 3,
            couragePoints: 3,
            nextSceneId: 'rainbow-s2-scene-3',
          },
          {
            id: 'rainbow-s2-sc2-c3',
            text: 'Ich sage zu Pierre: "Wir sollten alle bitten, das Foto zu löschen."',
            consequence:
              'Pierre nickt und ihr schreibt zusammen eine Nachricht an alle aus dem Chat. Manche löschen es, manche ignorieren es. Aber jeder gelöschte Beitrag ist ein kleiner Sieg.',
            empathyPoints: 2,
            insightPoints: 2,
            couragePoints: 2,
            nextSceneId: 'rainbow-s2-scene-3',
          },
        ],
      },
      {
        id: 'rainbow-s2-scene-3',
        text: 'Die Schule reagiert. Die Person, die das Foto gemacht hat, muss sich entschuldigen. In der Klasse gibt es eine Diskussion über Cybermobbing. Die Lehrerin fragt: "Warum glaubt ihr, ist es so leicht, online gemein zu sein?" Amadou meldet sich: "Weil man das Gesicht des anderen nicht sieht. Man vergisst, dass da ein echter Mensch ist."',
        speaker: 'Amadou',
        speakerEmoji: '🥁',
        choices: [
          {
            id: 'rainbow-s2-sc3-c1',
            text: '"Amadou hat recht. Online fühlt sich alles weniger real an – aber die Gefühle sind genauso echt."',
            consequence:
              'Mehrere nicken. Nadia schaut dich dankbar an. Die Klasse beginnt zu verstehen: Hinter jedem Bildschirm sitzt ein Mensch mit echten Gefühlen.',
            empathyPoints: 3,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: 'rainbow-s2-scene-4',
          },
          {
            id: 'rainbow-s2-sc3-c2',
            text: '"Ich glaube, viele machen mit, weil sie Angst haben, sonst selbst ausgeschlossen zu werden."',
            consequence:
              'Die Lehrerin nickt: "Das nennt man Gruppendruck. Und es braucht echten Mut, sich dagegen zu stellen." Deine Ehrlichkeit hilft der ganzen Klasse, das Problem besser zu verstehen.',
            empathyPoints: 2,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: 'rainbow-s2-scene-4',
          },
          {
            id: 'rainbow-s2-sc3-c3',
            text: 'Ich höre zu, sage aber nichts. Ich bin froh, dass es angesprochen wird.',
            consequence:
              'Zuhören ist auch wichtig. Nicht jeder muss laut sein, um etwas zu lernen. Das Wichtige ist, dass du verstehst, was passiert ist und warum es nicht okay war.',
            empathyPoints: 1,
            insightPoints: 2,
            couragePoints: 0,
            nextSceneId: 'rainbow-s2-scene-4',
          },
        ],
      },
      {
        id: 'rainbow-s2-scene-4',
        text: 'Eine Woche später siehst du, wie in einem anderen Chat jemand anfängt, sich über ein Kind aus der Parallelklasse lustig zu machen. Noch ist es harmlos – oder? Yasmine schreibt dir: "Kommt dir das bekannt vor?"',
        speaker: 'Yasmine',
        speakerEmoji: '🌙',
        choices: [
          {
            id: 'rainbow-s2-sc4-c1',
            text: 'Ich schreibe sofort im Chat: "Leute, lasst das. Wir wissen, wohin sowas führen kann."',
            consequence:
              'Diesmal reagieren mehr Leute positiv. Die Erfahrung mit Nadia hat etwas verändert. Du hast gelernt, dass man nicht warten muss, bis es schlimm wird, um etwas zu sagen. Prävention ist die beste Medizin.',
            empathyPoints: 3,
            insightPoints: 3,
            couragePoints: 3,
            nextSceneId: null,
          },
          {
            id: 'rainbow-s2-sc4-c2',
            text: 'Ich antworte Yasmine: "Ja. Lass uns zusammen reagieren, bevor es eskaliert."',
            consequence:
              'Gemeinsam schreibt ihr eine klare Nachricht. Die meisten hören auf. Ihr habt gelernt: Früh handeln verhindert, dass aus kleinen Sticheleien grosses Leid wird.',
            empathyPoints: 3,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: null,
          },
          {
            id: 'rainbow-s2-sc4-c3',
            text: 'Ich verlasse den Chat still und blockiere die Gruppe.',
            consequence:
              'Du schützt dich selbst – und das ist auch wichtig. Aber in der Gruppe geht es weiter. Manchmal muss man sich fragen: Reicht es, sich rauszuziehen, oder kann ich etwas bewirken?',
            empathyPoints: 1,
            insightPoints: 2,
            couragePoints: 1,
            nextSceneId: null,
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Szenario 3: Auslachen
  // ---------------------------------------------------------------------------
  {
    id: 'rainbow-scenario-auslachen',
    islandId: ISLAND_ID,
    title: 'Auslachen',
    description:
      'Jemand wird wegen seines Aussehens ausgelacht. Alle schauen zu – und du bist mittendrin.',
    scenes: [
      {
        id: 'rainbow-s3-scene-1',
        text: 'Auf dem Schulhof steht Jonas und wird von einer Gruppe ausgelacht. "Schau dir mal seine Schuhe an!" ruft einer. "Und die Hose – die ist doch von seinem grossen Bruder!" Ein anderer macht ein Foto. Jonas steht da und tut so, als würde er lachen, aber seine Augen sagen etwas anderes.',
        speaker: 'Erzähler',
        speakerEmoji: '📖',
        choices: [
          {
            id: 'rainbow-s3-sc1-c1',
            text: 'Ich gehe zu der Gruppe und sage: "Ist euch langweilig oder was? Lasst ihn in Ruhe."',
            consequence:
              'Die Gruppe ist überrascht. Niemand hatte erwartet, dass jemand etwas sagt. Jonas atmet auf. Dein Eingreifen hat den Moment gebrochen.',
            empathyPoints: 2,
            insightPoints: 1,
            couragePoints: 3,
            nextSceneId: 'rainbow-s3-scene-2',
          },
          {
            id: 'rainbow-s3-sc1-c2',
            text: 'Ich stelle mich neben Jonas und sage: "Hey, kommst du mit? Ich wollte grad in die Bibliothek."',
            consequence:
              'Eine elegante Lösung. Du holst Jonas raus, ohne die Situation eskalieren zu lassen. Manchmal ist der klügste Weg, jemanden einfach rauszuholen statt direkt zu konfrontieren.',
            empathyPoints: 3,
            insightPoints: 2,
            couragePoints: 2,
            nextSceneId: 'rainbow-s3-scene-2',
          },
          {
            id: 'rainbow-s3-sc1-c3',
            text: 'Ich schaue weg und gehe weiter. Ist nicht mein Problem.',
            consequence:
              'Du gehst, aber etwas in dir fühlt sich nicht gut. Jonas bleibt allein. Wenn alle wegsehen, gewinnt die Gemeinheit.',
            empathyPoints: 0,
            insightPoints: 1,
            couragePoints: 0,
            nextSceneId: 'rainbow-s3-scene-2',
          },
          {
            id: 'rainbow-s3-sc1-c4',
            text: 'Ich sage dem Kind mit dem Handy: "Lösch das Foto. Sofort. Das ist nicht cool."',
            consequence:
              'Das Kind zögert, löscht es dann aber. Gut – Fotos ohne Erlaubnis von anderen zu machen und zu verbreiten ist nicht nur gemein, sondern kann auch richtig Ärger geben.',
            empathyPoints: 2,
            insightPoints: 2,
            couragePoints: 3,
            nextSceneId: 'rainbow-s3-scene-2',
          },
        ],
      },
      {
        id: 'rainbow-s3-scene-2',
        text: 'Später in der Klasse merkst du, dass Jonas still ist. Er hat seinen Kopf gesenkt und kritzelt in sein Heft. Pierre setzt sich neben dich und sagt leise: "Jonas wird seit Wochen fertiggemacht. Nicht nur wegen den Klamotten. Die sagen auch Sachen über seine Familie. Sein Vater hat seine Arbeit verloren."',
        speaker: 'Pierre',
        speakerEmoji: '🎨',
        choices: [
          {
            id: 'rainbow-s3-sc2-c1',
            text: '"Das wusste ich nicht. Das macht es noch schlimmer. Können wir irgendwas tun?"',
            consequence:
              'Pierre nickt: "Vielleicht können wir ihn in unsere Gruppe holen. Nicht aus Mitleid, sondern weil er echt nett ist, wenn man ihn kennenlernt." Hinter jeder Geschichte steckt immer noch mehr Geschichte.',
            empathyPoints: 3,
            insightPoints: 3,
            couragePoints: 1,
            nextSceneId: 'rainbow-s3-scene-3',
          },
          {
            id: 'rainbow-s3-sc2-c2',
            text: '"Sollten wir vielleicht mit der Schulsozialarbeiterin reden?"',
            consequence:
              'Pierre überlegt: "Gute Idee. Die kann Jonas helfen, ohne dass es peinlich für ihn wird." Professionelle Hilfe einzuschalten ist manchmal das Beste, was man für jemanden tun kann.',
            empathyPoints: 2,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: 'rainbow-s3-scene-3',
          },
          {
            id: 'rainbow-s3-sc2-c3',
            text: '"Warum erzählt er es nicht einfach einem Lehrer?"',
            consequence:
              'Pierre seufzt: "Weil er Angst hat, dass es dann noch schlimmer wird. Und weil er sich schämt." Für Menschen, die gemobbt werden, fühlt sich Hilfe holen oft unmöglich an. Deshalb brauchen sie andere, die für sie einstehen.',
            empathyPoints: 1,
            insightPoints: 3,
            couragePoints: 0,
            nextSceneId: 'rainbow-s3-scene-3',
          },
        ],
      },
      {
        id: 'rainbow-s3-scene-3',
        text: 'Ein paar Tage später organisiert eure Klasse einen Flohmarkt. Jonas hat nichts zum Verkaufen mitgebracht. Die gleiche Gruppe fängt wieder an: "Klar, der hat ja nichts." Lina steht auf und sagt laut: "Jonas, willst du mir an meinem Stand helfen? Ich schaffe das alleine nicht."',
        speaker: 'Lina',
        speakerEmoji: '📚',
        choices: [
          {
            id: 'rainbow-s3-sc3-c1',
            text: 'Ich sage: "Gute Idee, Lina! Jonas, du kannst auch bei mir mitverkaufen."',
            consequence:
              'Jonas lächelt zum ersten Mal seit Tagen. Am Ende des Tages hat er mehr verkauft als die meisten anderen – er kann super mit Leuten reden, wenn man ihm die Chance gibt.',
            empathyPoints: 3,
            insightPoints: 2,
            couragePoints: 2,
            nextSceneId: 'rainbow-s3-scene-4',
          },
          {
            id: 'rainbow-s3-sc3-c2',
            text: 'Ich sage zu der Gruppe: "Wisst ihr, was arm ist? Leute runtermachen, um sich besser zu fühlen."',
            consequence:
              'Stille. Dein Satz hat gesessen. Manchmal muss man klar sagen, was Sache ist. Die Gruppe trollt sich. Jonas nickt dir dankbar zu.',
            empathyPoints: 2,
            insightPoints: 2,
            couragePoints: 3,
            nextSceneId: 'rainbow-s3-scene-4',
          },
          {
            id: 'rainbow-s3-sc3-c3',
            text: 'Ich gehe zu Jonas und frage leise: "Alles okay bei dir?"',
            consequence:
              'Jonas zuckt die Schultern, aber dann sagt er leise: "Nicht wirklich." Dass du fragst, bedeutet ihm viel. Manchmal braucht es nur jemanden, der wirklich hinsieht.',
            empathyPoints: 3,
            insightPoints: 2,
            couragePoints: 1,
            nextSceneId: 'rainbow-s3-scene-4',
          },
        ],
      },
      {
        id: 'rainbow-s3-scene-4',
        text: 'Am Ende des Schuljahres macht eure Klasse einen Film über das, was sie gelernt haben. Jonas hat eine Idee: einen kurzen Film über das Thema "Was man nicht sieht" – darüber, dass hinter jedem Menschen eine Geschichte steckt, die man nicht sofort erkennt. Er fragt dich, ob du mitmachen willst.',
        speaker: 'Erzähler',
        speakerEmoji: '📖',
        choices: [
          {
            id: 'rainbow-s3-sc4-c1',
            text: '"Mega gute Idee! Ich bin dabei. Lass uns alle fragen, ob sie ihre Geschichte erzählen wollen."',
            consequence:
              'Der Film wird ein Riesenerfolg. Jeder erzählt etwas, das die anderen nicht wussten. Es wird gelacht und geweint. Am Ende versteht die Klasse: Jeder Mensch verdient Respekt – egal, was man von aussen sieht.',
            empathyPoints: 3,
            insightPoints: 3,
            couragePoints: 3,
            nextSceneId: null,
          },
          {
            id: 'rainbow-s3-sc4-c2',
            text: '"Coole Idee! Ich kann beim Schnitt helfen, wenn du willst."',
            consequence:
              'Jonas freut sich riesig. Ihr arbeitet zusammen und entdeckt, dass ihr ein tolles Team seid. Aus einer schwierigen Erfahrung ist etwas Schönes gewachsen.',
            empathyPoints: 2,
            insightPoints: 2,
            couragePoints: 2,
            nextSceneId: null,
          },
          {
            id: 'rainbow-s3-sc4-c3',
            text: '"Ich weiss nicht, ob ich vor der Kamera gut bin, aber ich unterstütze dich."',
            consequence:
              'Jonas lächelt: "Du musst nicht vor die Kamera. Dass du da bist, reicht." Unterstützung hat viele Formen – und jede einzelne zählt.',
            empathyPoints: 2,
            insightPoints: 2,
            couragePoints: 1,
            nextSceneId: null,
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Szenario 4: Gerüchte
  // ---------------------------------------------------------------------------
  {
    id: 'rainbow-scenario-geruechte',
    islandId: ISLAND_ID,
    title: 'Gerüchte',
    description:
      'Ein Gerücht verbreitet sich in der Klasse wie ein Lauffeuer. Mitmachen, ignorieren oder stoppen – was machst du?',
    scenes: [
      {
        id: 'rainbow-s4-scene-1',
        text: 'Auf dem Weg zur Schule erzählt dir deine Freundin Mia flüsternd: "Hast du schon gehört? Angeblich hat sich Elif in Marco verliebt und ihm eine peinliche Nachricht geschrieben!" Du weisst nicht, ob das stimmt. Elif ist ein ruhiges Mädchen, das selten auffällt.',
        speaker: 'Erzähler',
        speakerEmoji: '📖',
        choices: [
          {
            id: 'rainbow-s4-sc1-c1',
            text: '"Woher weisst du das denn? Das klingt wie ein Gerücht."',
            consequence:
              'Mia überlegt: "Naja, Luca hat es erzählt... der hat es von irgendwem." Du merkst: Niemand weiss wirklich, ob es stimmt. Gerüchte sind wie ein Stille-Post-Spiel – nur dass es für die betroffene Person alles andere als ein Spiel ist.',
            empathyPoints: 2,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: 'rainbow-s4-scene-2',
          },
          {
            id: 'rainbow-s4-sc1-c2',
            text: '"Echt? Erzähl mal genau!" – Mich packt die Neugier.',
            consequence:
              'Mia erzählt dir alle Details. Es fühlt sich aufregend an, so einen "Insider" zu kennen. Aber halt – du verbreitest gerade Dinge über jemanden, ohne zu wissen, ob sie stimmen. Wie würdest du dich fühlen, wenn es um dich ginge?',
            empathyPoints: 0,
            insightPoints: 2,
            couragePoints: 0,
            nextSceneId: 'rainbow-s4-scene-2',
          },
          {
            id: 'rainbow-s4-sc1-c3',
            text: '"Lass uns nicht drüber reden. Wir wissen nicht, ob das stimmt, und es geht uns nichts an."',
            consequence:
              'Mia ist etwas überrascht, aber akzeptiert es. Du hast gerade eine Kette durchbrochen. Gerüchte leben davon, weitererzählt zu werden. Wer nicht weitererzählt, nimmt ihnen die Kraft.',
            empathyPoints: 3,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: 'rainbow-s4-scene-2',
          },
        ],
      },
      {
        id: 'rainbow-s4-scene-2',
        text: 'In der Schule merkst du, dass das Gerücht schon überall ist. Kinder kichern, wenn Elif vorbeigeht. Manche machen Kussgeräusche. Elif wird rot und geht schnell an allen vorbei. Sofia steht neben dir und sagt: "Ich kenne das Gefühl. Als ich neu war, haben sie gesagt, ich würde klauen, nur weil einmal Geld gefehlt hat. Es stimmte nicht, aber alle haben es geglaubt."',
        speaker: 'Sofia',
        speakerEmoji: '🌻',
        choices: [
          {
            id: 'rainbow-s4-sc2-c1',
            text: '"Das ist schrecklich, Sofia. Lass uns Elif helfen – du weisst ja, wie das ist."',
            consequence:
              'Sofia nickt entschlossen. Ihr geht zusammen zu Elif. Wenn jemand versteht, wie sich etwas anfühlt, kann diese Person die beste Unterstützung sein.',
            empathyPoints: 3,
            insightPoints: 2,
            couragePoints: 2,
            nextSceneId: 'rainbow-s4-scene-3',
          },
          {
            id: 'rainbow-s4-sc2-c2',
            text: '"Und wie hat es bei dir aufgehört?"',
            consequence:
              'Sofia seufzt: "Meine Lehrerin hat mit der Klasse geredet. Und ein Mädchen hat sich getraut zu sagen: Ich glaube das nicht." Sofia schaut dich an. Du verstehst die Botschaft: Einer muss anfangen.',
            empathyPoints: 2,
            insightPoints: 3,
            couragePoints: 1,
            nextSceneId: 'rainbow-s4-scene-3',
          },
          {
            id: 'rainbow-s4-sc2-c3',
            text: 'Ich höre Sofia zu und merke, wie ernst Gerüchte sein können, sage aber noch nichts.',
            consequence:
              'Sofias Geschichte macht Eindruck. Du denkst nach. Gerüchte sind keine harmlosen Witze – sie können Menschen richtig verletzen und ihr Vertrauen in andere zerstören.',
            empathyPoints: 1,
            insightPoints: 3,
            couragePoints: 0,
            nextSceneId: 'rainbow-s4-scene-3',
          },
        ],
      },
      {
        id: 'rainbow-s4-scene-3',
        text: 'In der Pause kommt Marco auf dich zu und sagt genervt: "Alle reden darüber, dass Elif mir geschrieben hat. Wisst ihr was? Sie hat mir eine ganz normale Nachricht geschickt und gefragt, ob ich ihre Mathe-Hausaufgaben habe. Das war alles! Irgendwer hat daraus etwas gemacht, das es nie war."',
        speaker: 'Erzähler',
        speakerEmoji: '📖',
        choices: [
          {
            id: 'rainbow-s4-sc3-c1',
            text: '"Willst du das der Klasse sagen? Ich stehe hinter dir."',
            consequence:
              'Marco nickt. Vor der Klasse erzählt er die Wahrheit. Du stehst neben ihm. Die meisten werden still. Die Wahrheit ist die stärkste Waffe gegen Gerüchte – aber sie braucht manchmal Unterstützung.',
            empathyPoints: 2,
            insightPoints: 2,
            couragePoints: 3,
            nextSceneId: 'rainbow-s4-scene-4',
          },
          {
            id: 'rainbow-s4-sc3-c2',
            text: '"Das ist echt unfair. Sollen wir zusammen zum Lehrer gehen?"',
            consequence:
              'Marco zögert, stimmt dann aber zu. Der Lehrer nimmt es ernst und spricht mit der Klasse. Erwachsene einzubeziehen ist kein Zeichen von Schwäche, sondern von Klugheit.',
            empathyPoints: 2,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: 'rainbow-s4-scene-4',
          },
          {
            id: 'rainbow-s4-sc3-c3',
            text: '"Krass, wie schnell aus einer normalen Nachricht so ein Ding werden kann."',
            consequence:
              'Marco seufzt: "Ja, in einer Stunde war es in der ganzen Schule." Du lernst: Gerüchte wachsen rasend schnell, aber die Wahrheit braucht oft viel länger, um gehört zu werden.',
            empathyPoints: 1,
            insightPoints: 3,
            couragePoints: 1,
            nextSceneId: 'rainbow-s4-scene-4',
          },
        ],
      },
      {
        id: 'rainbow-s4-scene-4',
        text: 'Nachdem die Wahrheit rausgekommen ist, gibt es eine Klassendiskussion. Lina sagt: "Stellt euch vor, jemand erzählt so etwas über EUCH. Wie würdet ihr euch fühlen?" Es ist still. Dann meldet sich Elif zum ersten Mal und sagt leise: "Ich habe drei Tage lang nicht geschlafen. Ich wollte nicht mehr in die Schule kommen."',
        speaker: 'Lina',
        speakerEmoji: '📚',
        choices: [
          {
            id: 'rainbow-s4-sc4-c1',
            text: '"Elif, es tut mir leid. Wir hätten früher etwas sagen müssen. Ab jetzt passe ich besser auf."',
            consequence:
              'Elif lächelt zaghaft. Deine ehrliche Entschuldigung und dein Versprechen bedeuten viel. Verantwortung zu übernehmen – auch wenn man nicht derjenige war, der das Gerücht gestartet hat – zeigt echte Stärke.',
            empathyPoints: 3,
            insightPoints: 3,
            couragePoints: 3,
            nextSceneId: null,
          },
          {
            id: 'rainbow-s4-sc4-c2',
            text: '"Können wir eine Regel machen? Wenn jemand ein Gerücht hört, fragt er zuerst die betroffene Person, ob es stimmt."',
            consequence:
              'Die Lehrerin findet die Idee klasse. Die Klasse stimmt ab und die Regel wird angenommen. Strukturen gegen Gerüchte helfen allen. Du hast die Klasse ein Stück besser gemacht.',
            empathyPoints: 2,
            insightPoints: 3,
            couragePoints: 3,
            nextSceneId: null,
          },
          {
            id: 'rainbow-s4-sc4-c3',
            text: 'Ich nicke still. Elifs Worte treffen mich tief und ich nehme mir vor, nie wieder ein Gerücht weiterzuerzählen.',
            consequence:
              'Manchmal verändert ein einziger ehrlicher Moment alles. Elifs Mut, ihre Gefühle zu zeigen, hat die ganze Klasse zum Nachdenken gebracht. Und du nimmst eine wichtige Lektion mit.',
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
// Weisheitskarten
// =============================================================================

export const rainbowWisdomCards: WisdomCard[] = [
  {
    id: 'rainbow-wisdom-01',
    islandId: ISLAND_ID,
    text: 'Vielfalt ist kein Problem, das gelöst werden muss – sie ist eine Stärke, die genutzt werden will.',
    category: 'insight',
    collected: false,
  },
  {
    id: 'rainbow-wisdom-02',
    islandId: ISLAND_ID,
    text: 'Du musst nicht alles verstehen, um respektvoll zu sein. Neugier und Offenheit reichen als Anfang.',
    category: 'strategy',
    collected: false,
  },
  {
    id: 'rainbow-wisdom-03',
    islandId: ISLAND_ID,
    text: 'Wenn du siehst, dass jemand unfair behandelt wird, und nichts sagst, dann hast du dich für die Seite der Unfairness entschieden.',
    category: 'courage',
    collected: false,
  },
  {
    id: 'rainbow-wisdom-04',
    islandId: ISLAND_ID,
    text: 'Hinter jedem Menschen steckt eine Geschichte, die du nicht kennst. Urteile langsam.',
    category: 'insight',
    collected: false,
  },
  {
    id: 'rainbow-wisdom-05',
    islandId: ISLAND_ID,
    text: 'Ein Gerücht zu stoppen braucht mehr Mut als es weiterzuerzählen. Sei mutig.',
    category: 'courage',
    collected: false,
  },
  {
    id: 'rainbow-wisdom-06',
    islandId: ISLAND_ID,
    text: 'Dazugehören ist ein Grundbedürfnis. Wenn du jemanden ausschliesst, nimmst du ihm etwas, das jeder Mensch braucht.',
    category: 'emotion',
    collected: false,
  },
  {
    id: 'rainbow-wisdom-07',
    islandId: ISLAND_ID,
    text: 'Vorurteile sind wie eine schmutzige Brille: Du siehst die Welt, aber nicht, wie sie wirklich ist.',
    category: 'insight',
    collected: false,
  },
  {
    id: 'rainbow-wisdom-08',
    islandId: ISLAND_ID,
    text: 'Du kannst nicht kontrollieren, was andere sagen. Aber du kannst kontrollieren, ob du es weiterträgst.',
    category: 'strategy',
    collected: false,
  },
  {
    id: 'rainbow-wisdom-09',
    islandId: ISLAND_ID,
    text: 'Hilfe holen ist kein Petzen. Petzen will jemandem schaden. Hilfe holen will jemandem helfen.',
    category: 'strategy',
    collected: false,
  },
  {
    id: 'rainbow-wisdom-10',
    islandId: ISLAND_ID,
    text: 'Wahre Stärke zeigt sich nicht darin, andere kleinzumachen, sondern darin, andere aufzubauen.',
    category: 'courage',
    collected: false,
  },
  {
    id: 'rainbow-wisdom-11',
    islandId: ISLAND_ID,
    text: 'Jede Sprache, die du hörst, jede Tradition, die du kennenlernst, macht deine Welt ein Stück grösser.',
    category: 'emotion',
    collected: false,
  },
  {
    id: 'rainbow-wisdom-12',
    islandId: ISLAND_ID,
    text: 'Zusammenleben heisst nicht, dass alle gleich sind. Es heisst, dass alle gleich wichtig sind.',
    category: 'insight',
    collected: false,
  },
];

// =============================================================================
// Aktivitäten
// =============================================================================

export const rainbowActivities: ExtendedActivity[] = [
  {
    id: 'rainbow-activity-schuh-tausch',
    islandId: ISLAND_ID,
    type: 'reflection',
    title: 'Schuh-Tausch',
    description:
      'Schlüpfe in die Schuhe eines anderen Menschen und versuche, die Welt aus seiner Perspektive zu sehen. Diese Übung hilft dir, Empathie zu stärken und Vorurteile zu erkennen.',
    instructions: [
      'Lies die folgende Geschichte aufmerksam durch: Amira ist 12, neu in der Klasse und trägt ein Kopftuch. In der Pause sitzt sie alleine, weil sie noch niemanden kennt. Zwei Mädchen gehen an ihr vorbei und kichern.',
      'Stell dir vor, du bist Amira. Schliesse kurz die Augen. Was fühlst du gerade? Wie fühlt sich dein Bauch an? Was denkst du?',
      'Jetzt stell dir vor, du bist eines der Mädchen, die gekichert haben. Warum hast du vielleicht gekichert? War es böse gemeint – oder war es Unsicherheit?',
      'Stell dir nun vor, du bist ein drittes Kind, das alles beobachtet. Was könntest du tun?',
      'Schreibe auf (oder denk darüber nach): Was hast du dabei gelernt? Gab es einen Moment, in dem du überrascht warst über deine eigenen Gedanken?',
      'Wiederhole diese Übung mit einer Situation aus deinem eigenen Alltag, in der du jemanden gesehen hast, der anders behandelt wurde.',
    ],
    completed: false,
  },
  {
    id: 'rainbow-activity-mobbing-radar',
    islandId: ISLAND_ID,
    type: 'assessment',
    title: 'Mobbing-Radar',
    description:
      'Lerne den Unterschied zwischen Spass, Necken und Mobbing zu erkennen. Dein inneres Radar wird geschärft, damit du Grenzen besser spüren kannst.',
    instructions: [
      'Lies jede Situation und entscheide: Ist das noch Spass, ist es grenzwertig oder ist es Mobbing?',
      'Situation 1: Dein Freund nennt dich "Nudel", weil du dünn bist. Ihr lacht beide. Er hört sofort auf, wenn du es dir nicht mehr gefällt. -- Denke nach: Was macht das zu Spass? (Antwort: Beide finden es lustig, es gibt Respekt für Grenzen.)',
      'Situation 2: Jemand macht jeden Tag einen Witz über deine Brille. Du hast schon gesagt, dass es nervt, aber die Person macht weiter. Andere lachen mit. -- Denke nach: Warum ist das kein Spass mehr? (Antwort: Es ist wiederholt, dein Nein wird ignoriert, es gibt ein Publikum.)',
      'Situation 3: Eine Gruppe schliesst jemanden absichtlich aus, lacht über ihn und verbreitet Gerüchte. Es passiert seit Wochen. -- Denke nach: Warum ist das Mobbing? (Antwort: Systematisch, wiederholt, Machtgefälle, Absicht zu verletzen.)',
      'Merke dir die drei Warnsignale: 1) Es ist wiederholt, nicht einmalig. 2) Die betroffene Person leidet. 3) Es gibt ein Ungleichgewicht – einer ist stärker oder in der Gruppe.',
      'Denke an eine Situation in deinem Umfeld. Wo würdest du sie auf deinem Radar einordnen? Was könntest du tun?',
    ],
    completed: false,
  },
  {
    id: 'rainbow-activity-courage-training',
    islandId: ISLAND_ID,
    type: 'creative',
    title: 'Courage-Training',
    description:
      'Übe Schritt für Schritt, wie du in schwierigen Situationen eingreifen kannst – von kleinen Gesten bis zu klaren Worten. Mut kann man trainieren wie einen Muskel.',
    instructions: [
      'Stufe 1 – Die stille Geste: Stell dir vor, jemand wird auf dem Schulhof ausgegrenzt. Übe, wie du dich einfach neben die Person stellst. Du musst nichts sagen – deine Anwesenheit alleine zeigt: Du bist nicht allein. Probiere es im Kopf durch.',
      'Stufe 2 – Die Ablenkung: Übe einen Satz, mit dem du jemanden aus einer unangenehmen Situation holen kannst. Zum Beispiel: "Hey, kommst du mit? Ich brauche deine Hilfe bei etwas." Sage den Satz laut vor dich hin, bis er sich natürlich anfühlt.',
      'Stufe 3 – Das klare Wort: Übe, wie du direkt sagst, dass etwas nicht okay ist. Zum Beispiel: "Hört auf damit. Das ist nicht fair." oder "Ich finde das nicht lustig." Sage es vor dem Spiegel oder nimm dich mit dem Handy auf.',
      'Stufe 4 – Hilfe holen: Manchmal reicht dein Eingreifen nicht. Übe den Satz: "Ich möchte melden, dass jemand gemobbt wird. Können Sie bitte helfen?" Das ist kein Petzen – das ist Verantwortung.',
      'Stufe 5 – Die Nachsorge: Nachdem du eingegriffen hast, geh zur betroffenen Person und frage: "Wie geht es dir? Kann ich noch etwas tun?" Manchmal ist das, was danach kommt, genauso wichtig.',
      'Wähle eine Stufe, die du diese Woche im echten Leben ausprobieren willst. Fang klein an – jeder mutige Schritt zählt.',
    ],
    completed: false,
  },
];
