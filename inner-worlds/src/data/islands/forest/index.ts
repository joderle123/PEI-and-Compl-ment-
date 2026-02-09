// @ts-nocheck
import type { Scenario, WisdomCard, Activity, IslandId } from '../../../types';

// =============================================================================
// Forest Island - Angst & Mut (Fear & Courage)
// Therapeutic educational content for CDSE Luxembourg, ages 10-15
// ALL content in German
// =============================================================================

// NPCs - empty array as specified
export const forestNPCs: any[] = [];

// -----------------------------------------------------------------------------
// Therapeutic Framework:
//
// Chapter 1 - "Schatten zwischen den Bäumen"
//   Teaches: Biology of fear (fight/flight/freeze), physical symptoms, normalizing
//   Key: "Angst ist dein Körper, der dich beschützen will. Sie ist nicht dein Feind."
//
// Chapter 2 - "Das Dunkel spricht"
//   Teaches: Anxiety spirals, avoidance behavior, how avoidance grows fear
//   Key: "Je mehr wir Angst vermeiden, desto größer wird sie."
//
// Chapter 3 - "Der Pfad der Mutproben"
//   Teaches: Gradual exposure, positive self-talk, breathing, progressive muscle
//            relaxation, "Was ist das Schlimmste?" technique
//   Key: "Mut ist nicht, keine Angst zu haben. Mut ist, trotz Angst das Richtige zu tun."
//
// Chapter 4 - "Der Wald gehört uns"
//   Teaches: Social courage, standing up for others, bystander effect,
//            fear as information not instruction
//   Key: "Jedes Mal, wenn du etwas trotz Angst tust, wirst du ein bisschen mutiger."
// -----------------------------------------------------------------------------

// =============================================================================
// Activities
// =============================================================================

interface ForestActivity extends Activity {
  instructions: string[];
}

export const forestActivities: ForestActivity[] = [
  {
    id: 'forest-activity-1',
    islandId: 'forest' as IslandId,
    title: 'Atem gegen die Angst',
    description: 'Eine Atemübung, die dir hilft, wenn die Angst kommt und dein Herz zu rasen beginnt.',
    type: 'breathing',
    completed: false,
    instructions: [
      'Setze oder stelle dich bequem hin. Lege eine Hand auf deinen Bauch und eine auf deine Brust.',
      'Atme langsam durch die Nase ein und zähle dabei bis 4. Spüre, wie sich dein Bauch hebt.',
      'Halte den Atem an und zähle bis 4. Stell dir vor, die Luft verteilt Ruhe in deinem ganzen Körper.',
      'Atme langsam durch den Mund aus und zähle bis 6. Stell dir vor, du pustest die Angst wie grauen Rauch von dir weg.',
      'Wiederhole das 5 Mal. Bei jedem Durchgang wird der Rauch heller, bis er verschwindet.',
      'Wenn du merkst, dass dein Herz ruhiger schlägt, sage leise zu dir: "Ich bin sicher. Die Angst ist nur ein Gefühl, und Gefühle gehen vorbei."',
      'Nutze diese Übung immer, wenn du merkst, dass Angst in dir aufsteigt: vor einer Prüfung, vor einem Gespräch, oder wenn du nachts nicht schlafen kannst.'
    ]
  },
  {
    id: 'forest-activity-2',
    islandId: 'forest' as IslandId,
    title: 'Angst-Tagebuch: Was mich beschäftigt',
    description: 'Schreibe über deine Ängste, um sie besser zu verstehen und kleiner zu machen.',
    type: 'journal',
    completed: false,
    instructions: [
      'Nimm ein Blatt Papier oder ein Heft. Schreibe das heutige Datum oben hin.',
      'Beantworte diese Frage ehrlich: "Wovor hatte ich heute oder diese Woche Angst?" Schreibe alles auf, auch wenn es dir klein vorkommt.',
      'Schreibe neben jede Angst eine Zahl von 1 bis 10: Wie stark war die Angst? (1 = kaum spürbar, 10 = ich konnte an nichts anderes denken)',
      'Wähle eine Angst aus und schreibe auf: "Was ist das Schlimmste, das passieren könnte?" Dann schreibe: "Was ist das Wahrscheinlichste, das passieren wird?"',
      'Oft ist das Wahrscheinlichste viel harmloser als das Schlimmste. Schreibe auf, was dir das zeigt.',
      'Schreibe einen Satz, der mit diesen Worten beginnt: "Auch wenn ich Angst habe, kann ich..."',
      'Lies dir alles noch einmal durch. Spüre nach: Fühlt sich die Angst jetzt etwas kleiner an? Aufschreiben nimmt Ängsten oft einen Teil ihrer Macht.'
    ]
  },
  {
    id: 'forest-activity-3',
    islandId: 'forest' as IslandId,
    title: 'Meine Mut-Momente',
    description: 'Eine Reflexion über Momente, in denen du trotz Angst mutig warst.',
    type: 'reflection',
    completed: false,
    instructions: [
      'Denke an drei Situationen in deinem Leben, in denen du Angst hattest, aber trotzdem etwas getan hast. Das können kleine Dinge sein: dich im Unterricht melden, jemand Neues ansprechen, etwas Schwieriges ausprobieren.',
      'Schreibe für jeden Moment auf: Was war die Situation? Wie hat sich die Angst angefühlt? Was hast du trotzdem getan?',
      'Schreibe auch auf: Was ist danach passiert? War es so schlimm, wie du befürchtet hattest?',
      'Lies deine drei Mut-Momente durch. Das bist du. Du hast das geschafft.',
      'Schreibe einen vierten Moment auf: eine Sache, vor der du JETZT Angst hast, die du aber gerne tun würdest.',
      'Schreibe daneben den kleinsten ersten Schritt, den du morgen machen könntest. Nicht den ganzen Berg, nur den ersten Schritt.',
      'Wenn du diesen Schritt gehst, komme hierher zurück und schreibe auf, wie es war. Jeder Mut-Moment, den du sammelst, macht den nächsten leichter.'
    ]
  },
  {
    id: 'forest-activity-4',
    islandId: 'forest' as IslandId,
    title: 'Körper-Entspannung: Anspannen und Loslassen',
    description: 'Progressive Muskelentspannung: Lerne, wie du die Anspannung der Angst aus deinem Körper loslassen kannst.',
    type: 'meditation',
    completed: false,
    instructions: [
      'Setze dich bequem hin oder lege dich auf den Rücken. Schließe die Augen.',
      'Balle beide Hände zu Fäusten. Drücke so fest du kannst, 5 Sekunden lang. Spüre die Anspannung. Dann lass los. Spüre den Unterschied: So fühlt sich Entspannung an.',
      'Ziehe die Schultern hoch zu den Ohren, 5 Sekunden. Halte die Anspannung. Dann lass sie fallen. Spüre, wie die Anspannung aus den Schultern fließt.',
      'Presse die Lippen fest zusammen und knirsche leicht mit den Zähnen, 5 Sekunden. Dann öffne den Mund und lasse den Kiefer locker hängen. Spüre die Erleichterung.',
      'Spanne den Bauch an, als würdest du dich auf einen Schlag vorbereiten, 5 Sekunden. Dann lasse los und atme tief aus. Angst sitzt oft im Bauch, und jetzt lässt du sie gehen.',
      'Drücke die Zehen fest in den Boden, 5 Sekunden. Dann lasse los. Spüre, wie sich deine Füße warm und schwer anfühlen.',
      'Liege oder sitze jetzt einen Moment still. Dein ganzer Körper ist entspannt. Sage zu dir: "Mein Körper ist ruhig. Mein Geist ist ruhig. Die Angst hat keinen Platz mehr, an dem sie sich festhalten kann."',
      'Nutze diese Übung vor dem Einschlafen, vor Prüfungen, oder wann immer du spürst, dass Angst deinen Körper anspannt.'
    ]
  }
];

// =============================================================================
// Wisdom Cards
// =============================================================================

export const forestWisdomCards: WisdomCard[] = [
  {
    id: 'forest-wisdom-1',
    islandId: 'forest' as IslandId,
    text: 'Angst ist dein Körper, der dich beschützen will. Dein Herz rast, deine Hände schwitzen, dein Bauch kribbelt. Das ist kein Fehler, sondern dein eingebautes Alarmsystem. Der Trick ist zu lernen: Wann warnt es dich vor echter Gefahr, und wann schlägt es falschen Alarm?',
    category: 'Angst verstehen',
    collected: false
  },
  {
    id: 'forest-wisdom-2',
    islandId: 'forest' as IslandId,
    text: 'Je mehr wir Angst vermeiden, desto größer wird sie. Wenn du vor etwas wegläufst, sagt dein Gehirn: "Aha, das war also wirklich gefährlich!" Und beim nächsten Mal wird die Angst noch stärker. Der einzige Weg, Angst kleiner zu machen, ist, ihr in kleinen Schritten zu begegnen.',
    category: 'Vermeidung',
    collected: false
  },
  {
    id: 'forest-wisdom-3',
    islandId: 'forest' as IslandId,
    text: 'Mut ist nicht, keine Angst zu haben. Mut ist, trotz Angst das Richtige zu tun. Die mutigsten Menschen der Welt hatten alle Angst. Sie haben nur gelernt, trotzdem den nächsten Schritt zu machen.',
    category: 'Mut',
    collected: false
  },
  {
    id: 'forest-wisdom-4',
    islandId: 'forest' as IslandId,
    text: 'Dein Atem ist deine Geheimwaffe gegen die Angst. Wenn du langsam und tief atmest, sagst du deinem Nervensystem: "Alles ist okay. Keine Gefahr." Vier Sekunden ein, vier halten, sechs aus. Probiere es aus, wenn die Angst kommt.',
    category: 'Werkzeuge',
    collected: false
  },
  {
    id: 'forest-wisdom-5',
    islandId: 'forest' as IslandId,
    text: 'Frage dich: "Was ist das Schlimmste, das passieren kann?" Meistens ist die Antwort viel harmloser, als die Angst dir einreden will. Und selbst wenn das Schlimmste passiert, wirst du damit umgehen können. Du bist stärker, als du denkst.',
    category: 'Werkzeuge',
    collected: false
  },
  {
    id: 'forest-wisdom-6',
    islandId: 'forest' as IslandId,
    text: 'Angst ist ein Gefühl, keine Tatsache. Wenn deine Angst sagt "Du schaffst das nicht", ist das keine Wahrheit. Es ist ein Gedanke, den du prüfen kannst. Frage dich: Stimmt das wirklich? Oder spricht da nur meine Angst?',
    category: 'Angst verstehen',
    collected: false
  },
  {
    id: 'forest-wisdom-7',
    islandId: 'forest' as IslandId,
    text: 'Jedes Mal, wenn du etwas trotz Angst tust, wirst du ein bisschen mutiger. Dein Gehirn lernt: "Ich habe das überlebt. Es war gar nicht so schlimm." Mit der Zeit wird die Angst leiser und dein Mut lauter.',
    category: 'Mut',
    collected: false
  },
  {
    id: 'forest-wisdom-8',
    islandId: 'forest' as IslandId,
    text: 'Für jemanden einzustehen, der Hilfe braucht, ist eine der mutigsten Sachen, die du tun kannst. Du musst kein Held sein. Manchmal reicht es, neben jemandem zu stehen und zu sagen: "Ich bin hier." Das ist sozialer Mut, und die Welt braucht mehr davon.',
    category: 'Sozialer Mut',
    collected: false
  }
];

// =============================================================================
// Scenarios
// =============================================================================

export const forestScenarios: Scenario[] = [
  // ---------------------------------------------------------------------------
  // Chapter 1: Schatten zwischen den Bäumen
  // Theme: What fear is biologically, normal vs excessive, physical symptoms
  // Key learning: "Angst ist dein Körper, der dich beschützen will."
  // ---------------------------------------------------------------------------
  {
    id: 'forest-scenario-1',
    islandId: 'forest' as IslandId,
    title: 'Schatten zwischen den Bäumen',
    description: 'Seltsame Geräusche im Wald. Finn kann sich nicht mehr bewegen. Was passiert in unserem Körper, wenn die Angst kommt?',
    scenes: [
      {
        id: 'f1-s1',
        speaker: 'Erzähler',
        speakerEmoji: '🌲',
        text: 'Der Waldpfad wird schmaler. Die Bäume stehen so dicht, dass kaum Licht durchkommt. Neben dir geht Finn, 12 Jahre alt, die Hände in den Jackentaschen. "Ist doch nur ein Wald", murmelt er, aber seine Stimme klingt unsicher. Plötzlich: ein Knacken im Unterholz. Dann ein Rascheln. Dann Stille. Finn bleibt stehen. Seine Augen werden groß. "Was war das?"',
        choices: [
          {
            id: 'f1-s1-c1',
            text: '"Wahrscheinlich nur ein Tier. Lass uns weitergehen."',
            consequence: 'Du versuchst, die Situation rational einzuschätzen. Das ist eine gute Strategie gegen Angst: Fakten prüfen statt Panik.',
            nextSceneId: 'f1-s2',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'f1-s1-c2',
            text: '"Ich höre es auch. Lass uns vorsichtig sein, aber nicht stehenbleiben."',
            consequence: 'Du nimmst Finns Angst ernst und schlägst gleichzeitig vor, weiterzumachen. So zeigst du: Vorsicht ist klug, Stillstand nicht.',
            nextSceneId: 'f1-s2',
            points: { empathyPoints: 2, insightPoints: 1, couragePoints: 2 }
          },
          {
            id: 'f1-s1-c3',
            text: '"Keine Ahnung, aber weglaufen hilft auch nicht. Komm, zusammen ist es weniger unheimlich."',
            consequence: 'Du zeigst Mut und Empathie zugleich. Gemeinsam Angst zu begegnen macht sie kleiner.',
            nextSceneId: 'f1-s2',
            points: { empathyPoints: 2, insightPoints: 1, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'f1-s2',
        speaker: 'Finn',
        speakerEmoji: '😰',
        text: 'Finn rührt sich nicht. Seine Beine scheinen am Boden festgewachsen. "Ich... ich kann nicht", flüstert er. Sein Gesicht ist bleich, seine Hände zittern. "Meine Beine gehorchen mir nicht." Wieder ein Rascheln, diesmal näher. Finn presst die Augen zusammen. Du siehst, wie sein Atem flach und schnell wird. Sein ganzer Körper ist angespannt, als wäre er aus Stein.',
        choices: [
          {
            id: 'f1-s2-c1',
            text: '"Finn, ich glaube, dein Körper ist gerade im Freeze-Modus. Das ist normal. Dein Gehirn versucht, dich zu schützen."',
            consequence: 'Genau richtig. Was Finn erlebt, heißt "Freeze" und ist eine von drei natürlichen Reaktionen auf Angst: Kampf (fight), Flucht (flight) oder Erstarren (freeze). Sein Körper macht das automatisch.',
            nextSceneId: 'f1-s3',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'f1-s2-c2',
            text: '"Hey, du zitterst ja. Und dein Atem ist ganz schnell. Hast du das gemerkt?"',
            consequence: 'Gut beobachtet. Zittern, schneller Atem, bleiche Haut, angespannte Muskeln: Das sind typische Angstsymptome. Der Körper schüttet Adrenalin aus und macht sich bereit für Gefahr, auch wenn gar keine echte da ist.',
            nextSceneId: 'f1-s3',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 1 }
          },
          {
            id: 'f1-s2-c3',
            text: 'Du nimmst Finns Hand. "Ich bin hier. Du bist nicht allein damit."',
            consequence: 'Manchmal braucht jemand mit Angst keine Erklärung, sondern einfach das Gefühl, nicht allein zu sein. Deine Nähe hilft Finns Nervensystem, sich zu beruhigen.',
            nextSceneId: 'f1-s3',
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'f1-s3',
        speaker: 'Erzähler',
        speakerEmoji: '🌲',
        text: 'Aus dem Gebüsch springt ein kleines Reh und hoppelt davon. Finn atmet zitternd aus. "Ein Reh. Es war nur ein Reh." Er schaut auf seine Hände, die immer noch zittern. "Aber warum... warum hat mein Körper so reagiert? Es war doch keine echte Gefahr." Er setzt sich auf einen Baumstamm. "Mein Herz rast immer noch. Und mir ist übel. Wegen einem Reh!"',
        choices: [
          {
            id: 'f1-s3-c1',
            text: '"Dein Gehirn hat ein uraltes Alarmsystem. Es warnt dich vor Gefahr, BEVOR du nachdenken kannst. Manchmal warnt es dich auch, wenn gar keine Gefahr da ist."',
            consequence: 'Richtig. Die Amygdala, ein Teil des Gehirns, löst den Alarm blitzschnell aus. Sie fragt nicht: "Ist es wirklich gefährlich?" Sie sagt: "Lieber einmal zu viel warnen als einmal zu wenig." Das hat unseren Vorfahren das Leben gerettet.',
            nextSceneId: 'f1-s4',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'f1-s3-c2',
            text: '"Fight, Flight oder Freeze. Das sind drei Reaktionen, die dein Körper bei Angst automatisch macht. Du warst im Freeze-Modus. Das ist keine Schwäche."',
            consequence: 'Genau. Kampf, Flucht oder Erstarren: Alle drei sind Überlebensstrategien. Manche Menschen rennen, manche kämpfen, manche erstarren. Keine Reaktion ist besser oder schlechter. Es ist dein Körper, der versucht, dich am Leben zu halten.',
            nextSceneId: 'f1-s4',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 0 }
          },
          {
            id: 'f1-s3-c3',
            text: '"Dein Körper hat gerade Adrenalin ausgeschüttet. Das ist ein Hormon, das dich auf Gefahr vorbereitet. Deshalb rast dein Herz und zittern deine Hände. Es geht vorbei."',
            consequence: 'Richtig erklärt. Adrenalin sorgt dafür, dass dein Herz schneller pumpt, deine Muskeln sich anspannen und deine Sinne schärfer werden. Das war für unsere Vorfahren überlebenswichtig. Heute löst der Körper dieselbe Reaktion aus, auch wenn die Gefahr nur ein Reh ist.',
            nextSceneId: 'f1-s4',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'f1-s4',
        speaker: 'Finn',
        speakerEmoji: '🤔',
        text: 'Finn wird ruhiger. Die Farbe kehrt in sein Gesicht zurück. "Also ist Angst nicht... kaputt? Ich meine, ich dachte, mit mir stimmt etwas nicht. Die anderen in meiner Klasse haben nie Angst. Jedenfalls sagen sie das." Er schaut dich an. "Ist Angst normal?"',
        choices: [
          {
            id: 'f1-s4-c1',
            text: '"Angst ist total normal. Jeder Mensch hat sie. Auch die, die behaupten, sie hätten keine. Angst ist dein Körper, der dich beschützen will. Sie ist nicht dein Feind."',
            consequence: 'Das ist die wichtigste Lektion. Angst ist kein Zeichen von Schwäche. Sie ist ein eingebautes Schutzsystem, das jeder Mensch hat. Problematisch wird es erst, wenn die Angst bei harmlosen Situationen anspringt und dich daran hindert, dein Leben zu leben.',
            nextSceneId: 'f1-s5',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 1 }
          },
          {
            id: 'f1-s4-c2',
            text: '"Jeder hat Angst. Die Frage ist nur, ob die Angst zu deiner Situation passt. Bei einem Reh im Wald war der Alarm zu laut. Aber der Alarm selbst ist nicht das Problem."',
            consequence: 'Klug unterschieden. Normale Angst schützt dich. Aber manchmal ist der Alarm lauter als er sein müsste. Dann hilft es, den Unterschied zu lernen: echte Gefahr oder falscher Alarm? So nimmst du deiner Angst nach und nach die Macht.',
            nextSceneId: 'f1-s5',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'f1-s4-c3',
            text: '"Die anderen haben auch Angst, Finn. Sie zeigen es nur nicht. Das bedeutet nicht, dass sie mutiger sind. Manchmal ist es sogar mutiger, ehrlich zu sagen: Ich habe Angst."',
            consequence: 'Stark gesagt. In unserer Gesellschaft tun viele so, als hätten sie keine Angst. Aber Angst zu verstecken macht sie nicht kleiner. Im Gegenteil: Wer Angst zugeben kann, kann sie auch besser verstehen und damit umgehen.',
            nextSceneId: 'f1-s5',
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'f1-s5',
        speaker: 'Finn',
        speakerEmoji: '😊',
        text: 'Finn steht langsam auf. Er atmet tief ein und aus. "Angst ist mein Körper, der mich beschützen will", wiederholt er leise, als würde er es sich einprägen. "Kein Feind. Ein Alarm." Er schaut den Waldpfad entlang. "Weißt du was? Der Wald sieht plötzlich gar nicht mehr so unheimlich aus." Er macht einen Schritt vorwärts. Dann noch einen. Sein Herzschlag ist ruhiger, seine Hände zittern nicht mehr. "Ich bin noch nicht mutig", sagt er. "Aber zumindest weiß ich jetzt, dass ich nicht kaputt bin."',
        choices: [
          {
            id: 'f1-s5-c1',
            text: '"Das ist schon der erste Schritt, Finn. Angst zu verstehen ist der Anfang von Mut."',
            consequence: 'Finn lächelt. Ihr geht weiter durch den Wald. Die Schatten zwischen den Bäumen sind noch da, aber sie haben ihre Macht verloren. Denn jetzt wisst ihr: Es sind nur Schatten. Und Angst ist nur ein Alarm, der manchmal zu laut klingelt.',
            nextSceneId: null,
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 1 }
          },
          {
            id: 'f1-s5-c2',
            text: '"Niemand ist immer mutig. Mut kommt in kleinen Momenten. Wie jetzt gerade, wo du weitergehst, obwohl du gerade noch erstarrt warst."',
            consequence: 'Finn nickt nachdenklich. Ihr geht zusammen weiter. Der Wald ist immer noch dunkel, aber Finn geht mit festeren Schritten. Er hat heute etwas Wichtiges gelernt: Angst ist kein Defekt. Sie ist ein Teil von ihm, der gute Absichten hat, aber manchmal übertreibt.',
            nextSceneId: null,
            points: { empathyPoints: 2, insightPoints: 1, couragePoints: 2 }
          }
        ]
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // Chapter 2: Das Dunkel spricht
  // Theme: Anxiety spirals, avoidance behavior, how anxiety grows
  // Key learning: "Je mehr wir Angst vermeiden, desto größer wird sie."
  // ---------------------------------------------------------------------------
  {
    id: 'forest-scenario-2',
    islandId: 'forest' as IslandId,
    title: 'Das Dunkel spricht',
    description: 'Finn verrät sein größtes Geheimnis: Die Angst hat sich ausgebreitet und beherrscht immer mehr Teile seines Lebens.',
    scenes: [
      {
        id: 'f2-s1',
        speaker: 'Finn',
        speakerEmoji: '😞',
        text: 'Ihr sitzt an einer Lichtung im Wald. Finn ist still geworden. Dann sagt er leise: "Kann ich dir was erzählen? Etwas, das niemand weiß?" Er wartet nicht auf deine Antwort. "Ich habe panische Angst vor Referaten. Vor der ganzen Klasse zu stehen und zu reden. Mein Herz rast, meine Stimme zittert, mir wird schwindelig. Letztes Mal bin ich einfach weggerannt. Mitten im Referat. Einfach raus."',
        choices: [
          {
            id: 'f2-s1-c1',
            text: '"Danke, dass du mir das erzählst. Das braucht Mut. Wie hat sich das angefühlt, als du rausgerannt bist?"',
            consequence: 'Du gibst Finn Raum, ohne zu urteilen. Das ist wichtig, denn Menschen mit Angst schämen sich oft für ihre Reaktionen. Zuhören ist der erste Schritt, um zu helfen.',
            nextSceneId: 'f2-s2',
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 1 }
          },
          {
            id: 'f2-s1-c2',
            text: '"Das klingt wirklich schlimm. Passiert das nur bei Referaten, oder auch in anderen Situationen?"',
            consequence: 'Eine kluge Frage. Angst hat die Tendenz, sich auszubreiten. Was als Angst vor einer bestimmten Sache anfängt, kann sich auf immer mehr Bereiche des Lebens ausweiten, wenn man sie nicht versteht.',
            nextSceneId: 'f2-s2',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'f2-s1-c3',
            text: '"Du bist nicht der Einzige mit dieser Angst. Viele Leute fürchten sich davor, vor anderen zu sprechen. Es gibt sogar einen Namen dafür."',
            consequence: 'Gut, dass du das sagst. Die Angst vor öffentlichem Sprechen ist eine der häufigsten Ängste weltweit. Zu wissen, dass man nicht allein ist, nimmt der Scham etwas von ihrer Kraft.',
            nextSceneId: 'f2-s2',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'f2-s2',
        speaker: 'Finn',
        speakerEmoji: '😟',
        text: 'Finn zupft nervös an einem Grashalm. "Das Schlimme ist: Zuerst war es nur bei Referaten. Dann hatte ich auch Angst, im Unterricht aufzuzeigen. Was, wenn ich eine falsche Antwort gebe und alle lachen? Dann wurde es schlimmer. Jetzt habe ich Angst, in der Kantine laut zu bestellen. Oder jemanden nach dem Weg zu fragen. Es breitet sich aus wie... wie Dunkelheit, die immer mehr Platz einnimmt."',
        choices: [
          {
            id: 'f2-s2-c1',
            text: '"Das nennt man eine Angstspirale. Die Angst fängt klein an und wird größer, weil du immer mehr Situationen vermeidest."',
            consequence: 'Genau. Eine Angstspirale funktioniert so: Du hast Angst vor etwas, also vermeidest du es. Die Vermeidung fühlt sich erstmal gut an. Aber dein Gehirn lernt: "Das war gefährlich, gut, dass wir geflohen sind." Beim nächsten Mal ist die Angst noch größer.',
            nextSceneId: 'f2-s3',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'f2-s2-c2',
            text: '"Ich verstehe. Jedes Mal, wenn du einer Angst ausweichst, sagst du deinem Gehirn: Diese Sache ist gefährlich. Und dann hat es immer mehr Grund, Alarm zu schlagen."',
            consequence: 'So ist es. Vermeidung ist wie ein Kredit: Sie fühlt sich kurzfristig gut an, aber langfristig zahlst du immer mehr Zinsen. Die Angst wächst mit jeder Vermeidung, weil dein Gehirn die Bestätigung bekommt: "Richtig, das war bedrohlich."',
            nextSceneId: 'f2-s3',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 0 }
          },
          {
            id: 'f2-s2-c3',
            text: '"Das klingt, als würde die Angst einen immer kleineren Raum für dich übrig lassen. Wie eine Dunkelheit, die von allen Seiten kommt."',
            consequence: 'Ein treffendes Bild. Angst, die sich ausbreitet, nimmt dir Stück für Stück deine Freiheit. Erst ein Referat, dann die Meldung im Unterricht, dann die Kantine. Der Raum, in dem du dich frei bewegen kannst, wird kleiner. Aber das Gute ist: Dieser Prozess ist umkehrbar. Jeder kleine mutige Schritt holt dir ein Stück Raum zurück.',
            nextSceneId: 'f2-s3',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'f2-s3',
        speaker: 'Finn',
        speakerEmoji: '😧',
        text: 'Finn starrt auf den Boden. "Und jetzt vermeide ich auch die Pausen. Ich esse allein auf der Toilette, weil ich Angst habe, dass jemand sieht, dass ich allein am Tisch sitze. Ich habe Angst, dass sie merken, dass ich Angst habe. Angst vor der Angst. Ist das verrückt?" Seine Stimme bricht fast.',
        choices: [
          {
            id: 'f2-s3-c1',
            text: '"Das ist nicht verrückt, Finn. Angst vor der Angst ist sogar sehr verbreitet. Aber weißt du was? Es zeigt, dass du deine Angst erkennst. Und das ist der erste Schritt, um sie zu bremsen."',
            consequence: 'Angst vor der Angst, Fachleute nennen es "Erwartungsangst", ist einer der stärksten Treiber der Angstspirale. Allein zu wissen, dass das ein bekanntes Muster ist und kein Zeichen von Verrücktheit, kann enorm helfen.',
            nextSceneId: 'f2-s4',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 1 }
          },
          {
            id: 'f2-s3-c2',
            text: '"Nein, Finn. Das ist nicht verrückt. Aber die Vermeidung macht es schlimmer. Jedes Mal, wenn du auf der Toilette isst statt in der Kantine, wird die Kantine ein bisschen angstmachender."',
            consequence: 'Hart, aber wahr. Vermeidung ist der Motor der Angstspirale. Jede vermiedene Situation wird beim nächsten Mal noch bedrohlicher, weil das Gehirn nie die Chance bekommt zu lernen: "Es war gar nicht gefährlich."',
            nextSceneId: 'f2-s4',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'f2-s3-c3',
            text: 'Du setzt dich neben Finn und sagst: "Ich finde es mutig, dass du das aussprichst. Viele Menschen tragen das leise mit sich herum und sagen nie etwas."',
            consequence: 'Manchmal ist das Wichtigste nicht, die Angst sofort zu lösen, sondern dem Menschen das Gefühl zu geben, dass er sich nicht schämen muss. Finns Offenheit ist tatsächlich ein Akt des Muts, auch wenn er sich nicht so anfühlt.',
            nextSceneId: 'f2-s4',
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'f2-s4',
        speaker: 'Erzähler',
        speakerEmoji: '🌲',
        text: 'Ein Windhauch geht durch die Bäume. Finn schaut hoch. "Wenn Vermeidung die Angst größer macht, was kann ich dann tun? Soll ich einfach alles machen, wovor ich Angst habe? Ich kann nicht morgen einfach ein Referat halten. Das schaffe ich nicht." Seine Augen flehen um eine Antwort, die nicht "Stell dich nicht so an" lautet.',
        choices: [
          {
            id: 'f2-s4-c1',
            text: '"Nicht alles auf einmal. Kleine Schritte. Vielleicht erst mal eine Frage im Unterricht stellen. Dann zwei. Dann in einer kleinen Gruppe reden. Dann vor der Klasse. Schritt für Schritt."',
            consequence: 'Das nennt man "graduelle Exposition" oder stufenweise Annäherung. Man baut eine Leiter der Angst: unten die Dinge, die nur ein bisschen Angst machen, oben die, die sehr viel Angst machen. Dann klettert man Sprosse für Sprosse. Nie alles auf einmal.',
            nextSceneId: 'f2-s5',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'f2-s4-c2',
            text: '"Mut bedeutet nicht, alles auf einmal zu machen. Mut bedeutet, den kleinsten Schritt zu wagen, den du gerade schaffst. Und morgen vielleicht einen winzigen Schritt mehr."',
            consequence: 'Perfekt gesagt. Mut ist kein Sprung, sondern ein Weg. Der kleinste mutige Schritt zählt: eine Bestellung an der Theke aufgeben, eine kurze Antwort im Unterricht geben. Jeder dieser Momente lehrt dein Gehirn: "Ich habe es überlebt. Es war okay."',
            nextSceneId: 'f2-s5',
            points: { empathyPoints: 2, insightPoints: 1, couragePoints: 2 }
          },
          {
            id: 'f2-s4-c3',
            text: '"Stell dir eine Leiter vor. Ganz unten stehen die Dinge, die nur ein kleines bisschen Angst machen. Ganz oben das Referat. Du kletterst Sprosse für Sprosse. Nie alles auf einmal."',
            consequence: 'Das ist die Angstleiter, ein bewährtes Werkzeug aus der Psychologie. Du schreibst alle angstmachenden Situationen auf und sortierst sie von "wenig Angst" bis "sehr viel Angst". Dann beginnst du unten. Erst wenn eine Sprosse sich okay anfühlt, gehst du zur nächsten. So baust du Stück für Stück Mut auf.',
            nextSceneId: 'f2-s5',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'f2-s5',
        speaker: 'Finn',
        speakerEmoji: '🌱',
        text: 'Finn denkt nach. Lange. Dann sagt er: "Kleine Schritte. Das klingt... machbar. Ich muss nicht morgen mutig sein. Ich muss nur morgen einen winzigen Schritt machen." Er steht auf und schaut den Waldpfad entlang, der tiefer in den Wald führt. "Weißt du, was mein erster kleiner Schritt sein könnte? Diesen Weg hier weitergehen. Auch wenn es dunkel wird." Er schaut dich an. "Aber nicht allein. Kommst du mit?"',
        choices: [
          {
            id: 'f2-s5-c1',
            text: '"Natürlich. Und wenn du irgendwann allein gehen willst, bin ich immer noch für dich da."',
            consequence: 'Finn lächelt. Ihr geht zusammen weiter in den dunkler werdenden Wald. Er hat heute etwas Entscheidendes verstanden: Je mehr wir Angst vermeiden, desto größer wird sie. Und Mut bedeutet nicht, keine Angst zu haben, sondern kleine Schritte zu machen, trotz der Angst.',
            nextSceneId: null,
            points: { empathyPoints: 2, insightPoints: 1, couragePoints: 2 }
          },
          {
            id: 'f2-s5-c2',
            text: '"Ich komme mit. Und egal, wie dunkel es wird, wir machen einfach immer nur den nächsten Schritt."',
            consequence: 'Finn nickt entschlossen. Zum ersten Mal seit langem geht er auf etwas zu, statt vor etwas wegzulaufen. Der Wald wird dunkler, aber Finn geht weiter. Nicht ohne Angst. Aber trotzdem. Und das ist der ganze Unterschied.',
            nextSceneId: null,
            points: { empathyPoints: 1, insightPoints: 1, couragePoints: 3 }
          },
          {
            id: 'f2-s5-c3',
            text: '"Und weißt du was, Finn? Morgen in der Schule: Iss nicht auf der Toilette. Setz dich in die Kantine. Auch wenn es sich komisch anfühlt. Das ist dein erster Schritt auf der Leiter."',
            consequence: 'Finn wird blass, dann grinst er zaghaft. "Die Kantine. Das ist Sprosse eins." Er hat jetzt ein konkretes Ziel. Nicht das Referat, nicht die perfekte Rede. Nur die Kantine. Nur sitzen und essen, wo andere auch sitzen und essen. Ein kleiner Schritt. Aber der wichtigste.',
            nextSceneId: null,
            points: { empathyPoints: 1, insightPoints: 2, couragePoints: 2 }
          }
        ]
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // Chapter 3: Der Pfad der Mutproben
  // Theme: Gradual exposure, positive self-talk, breathing, concrete tools
  // Key learning: "Mut ist nicht, keine Angst zu haben. Mut ist, trotz Angst
  //               das Richtige zu tun."
  // ---------------------------------------------------------------------------
  {
    id: 'forest-scenario-3',
    islandId: 'forest' as IslandId,
    title: 'Der Pfad der Mutproben',
    description: 'Der Wald stellt dir Herausforderungen. Kleine zuerst, dann größere. Hier lernst du echte Werkzeuge gegen die Angst.',
    scenes: [
      {
        id: 'f3-s1',
        speaker: 'Erzähler',
        speakerEmoji: '🌲',
        text: 'Ihr kommt an eine Weggabelung. An einem Holzschild steht: "Pfad der Mutproben. Wer hier geht, wird getestet. Nicht mit Monstern, sondern mit Wahrheit." Finn schluckt. "Was meint das?" Hinter dem Schild sieht der Wald anders aus: Die Bäume bilden Szenen, fast wie ein Theater. In der ersten Szene sitzt ein Kind in einer Schulklasse. Die Lehrerin stellt eine Frage. Das Kind weiß die Antwort, aber seine Hand bleibt unten.',
        choices: [
          {
            id: 'f3-s1-c1',
            text: '"Das Kind hat Angst, sich zu melden, weil es denkt, die anderen könnten lachen. Kennst du das Gefühl?"',
            consequence: 'Die Angst, vor anderen Fehler zu machen, ist eine der häufigsten sozialen Ängste bei Jugendlichen. Das Kind im Bild vermeidet es, sich zu melden, obwohl es die Antwort kennt. So nimmt es sich selbst die Chance, Erfolg zu erleben.',
            nextSceneId: 'f3-s2',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 1 }
          },
          {
            id: 'f3-s1-c2',
            text: '"Die erste Mutprobe. Was denkst du, Finn, was würde passieren, wenn das Kind die Hand hebt?"',
            consequence: 'Gute Frage. Meistens passiert das, wovor wir Angst haben, gar nicht. Niemand lacht. Die Lehrerin ist froh. Und das Kind merkt: Es war gar nicht so schlimm. Aber ohne den Versuch wird es das nie erfahren.',
            nextSceneId: 'f3-s2',
            points: { empathyPoints: 1, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'f3-s1-c3',
            text: '"Das Kind weiß die Antwort, aber die Angst hält es fest. Der Kopf sagt Ja, aber der Körper sagt Nein. Das ist ein Kampf, den viele Jugendliche jeden Tag führen."',
            consequence: 'Der Konflikt zwischen Wissen und Angst ist quälend. Du weißt, dass du es kannst. Aber dein Körper weigert sich. Das liegt daran, dass die Amygdala schneller reagiert als dein Verstand. Die gute Nachricht: Mit Übung kannst du lernen, deinem Verstand die Führung zurückzugeben.',
            nextSceneId: 'f3-s2',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'f3-s2',
        speaker: 'Finn',
        speakerEmoji: '😣',
        text: 'Finn starrt auf die Szene. "Das bin ich", flüstert er. "Jeden Tag." Die Szene verändert sich: Das Kind im Bild hebt zögernd die Hand. Die Klasse dreht sich um. Und... nichts passiert. Die Lehrerin lächelt. Das Kind antwortet. Ein paar nicken. Kein Gelächter. Finn beobachtet mit großen Augen. Dann sagt er: "Aber mein Kopf sagt mir vorher immer, dass alle lachen werden. Wie bringe ich meinen Kopf dazu, das nicht mehr zu sagen?"',
        choices: [
          {
            id: 'f3-s2-c1',
            text: '"Probiere positiven Selbsttalk. Statt: Alle werden lachen, sag dir: Ich kenne die Antwort. Ich bin vorbereitet. Es ist okay, Fehler zu machen."',
            consequence: 'Positiver Selbsttalk ist ein mächtiges Werkzeug. Dein Gehirn glaubt, was du ihm oft genug sagst. Wenn du dir immer sagst "Ich schaffe das nicht", glaubt es das. Wenn du sagst "Ich versuche es und sehe, was passiert", öffnet das neue Wege.',
            nextSceneId: 'f3-s3',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'f3-s2-c2',
            text: '"Frag dich: Was ist das Schlimmste, das passieren kann? Und dann: Wie wahrscheinlich ist das wirklich?"',
            consequence: 'Das ist die "Was ist das Schlimmste?"-Technik. Meistens ist die ehrliche Antwort: Jemand schaut kurz komisch. Nicht das Ende der Welt. Und die wahrscheinlichste Reaktion? Niemand kümmert sich darum. Die anderen denken an ihr eigenes Leben.',
            nextSceneId: 'f3-s3',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'f3-s2-c3',
            text: '"Du wirst deinen Kopf nicht sofort umstimmen können. Aber du kannst ihm zeigen, dass er falsch liegt. Indem du es versuchst und siehst: Es passiert nichts Schlimmes."',
            consequence: 'Das ist der Kern der stufenweisen Annäherung. Dein Gehirn lernt am besten durch Erfahrung, nicht durch Worte. Jedes Mal, wenn du etwas tust und die befürchtete Katastrophe nicht eintritt, lernt dein Gehirn ein Stück mehr, dass es sicher ist.',
            nextSceneId: 'f3-s3',
            points: { empathyPoints: 1, insightPoints: 2, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'f3-s3',
        speaker: 'Erzähler',
        speakerEmoji: '🌲',
        text: 'Die nächste Szene erscheint zwischen den Bäumen: Ein Jugendlicher steht vor seiner Klasse. Alle schauen. Sein Mund ist trocken. Sein Herz klopft im Hals. Die Hände zittern. Das Blatt mit seinen Notizen raschelt. Er öffnet den Mund und... kein Ton kommt raus. Finn greift sich an die Brust. "Das bin ich. Genau so war es bei meinem Referat." Der Wald scheint auf eine Antwort zu warten.',
        choices: [
          {
            id: 'f3-s3-c1',
            text: '"Finn, wenn dir das passiert, mach als Erstes das: Atme. Vier Sekunden ein, vier halten, sechs aus. Dein Atem beruhigt dein Nervensystem, bevor du auch nur ein Wort sagen musst."',
            consequence: 'Die 4-4-6-Atemtechnik aktiviert den Parasympathikus, den Teil deines Nervensystems, der für Entspannung zuständig ist. In dem Moment, wo dein Atem langsamer wird, bekommt dein Gehirn das Signal: "Keine akute Gefahr." Die Panik lässt nach.',
            nextSceneId: 'f3-s4',
            points: { empathyPoints: 1, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'f3-s3-c2',
            text: '"Versuche mal den Muskel-Trick: Balle unter dem Tisch die Fäuste, 5 Sekunden fest drücken, dann loslassen. Die Entspannung danach beruhigt deinen ganzen Körper."',
            consequence: 'Das ist progressive Muskelentspannung in der Kurzversion. Wenn du Muskeln bewusst anspannst und dann loslässt, entsteht ein Entspannungsreflex. Niemand merkt es, wenn du es unter dem Tisch machst. Aber dein Körper spürt den Unterschied sofort.',
            nextSceneId: 'f3-s4',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'f3-s3-c3',
            text: '"Sag dir in dem Moment: Mein Körper macht gerade Alarm. Aber ich bin in Sicherheit. Ich stehe in meiner Schule, nicht in einem brennenden Haus. Der Alarm ist zu laut."',
            consequence: 'Sich selbst daran zu erinnern, dass man in Sicherheit ist, nennt man "Realitätscheck". Dein Körper reagiert, als wäre eine Katastrophe im Gange. Aber die Realität ist: Du stehst in einer Schule, umgeben von Menschen, die dir nichts tun wollen. Diesen Unterschied bewusst zu benennen, hilft deinem Gehirn, den Alarm herunterzufahren.',
            nextSceneId: 'f3-s4',
            points: { empathyPoints: 1, insightPoints: 2, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'f3-s4',
        speaker: 'Finn',
        speakerEmoji: '💪',
        text: 'Finn schließt die Augen. Du siehst, wie er atmet: Ein... zwei... drei... vier. Hält. Und ausatmet. Langsam. Als er die Augen öffnet, ist sein Blick klarer. "Wow. Das funktioniert echt." Die Szene im Wald verändert sich. Der Jugendliche am Pult atmet auch. Dann öffnet er den Mund und spricht. Leise erst, dann fester. Er stolpert über ein Wort. Ein paar kichern. Aber er macht weiter. Und als er fertig ist, klatscht jemand. Dann noch jemand. Finn schaut zu. "Er hat es geschafft. Obwohl er Angst hatte."',
        choices: [
          {
            id: 'f3-s4-c1',
            text: '"Ja. Nicht perfekt. Aber er hat es getan. Und genau das ist Mut: Nicht perfekt sein, sondern trotz Angst handeln."',
            consequence: 'Mut ist nicht, keine Angst zu haben. Mut ist, trotz Angst das Richtige zu tun. Diese Erkenntnis verändert alles. Du musst nicht furchtlos sein, du musst nicht perfekt sein. Du musst nur den nächsten Schritt machen, auch wenn deine Knie zittern.',
            nextSceneId: 'f3-s5',
            points: { empathyPoints: 1, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'f3-s4-c2',
            text: '"Und schau: Ein paar haben gekichert. Das Schlimmste ist passiert. Und er hat es überlebt. Es war nicht das Ende der Welt."',
            consequence: 'Genau das ist der Punkt. Das Schlimmste ist passiert, jemand hat gelacht, und er hat es überlebt. Das Gehirn lernt: "Okay, das war unangenehm, aber nicht tödlich." Beim nächsten Mal wird die Angst ein kleines Stück leiser sein.',
            nextSceneId: 'f3-s5',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'f3-s4-c3',
            text: '"Merkst du, Finn? Er hat geatmet, er hat geredet, er hat gestolpert, und er hat weitergemacht. Jeder einzelne dieser Schritte war Mut."',
            consequence: 'Mut ist kein einzelner großer Moment. Mut besteht aus vielen kleinen Entscheidungen: Aufstehen, Mund aufmachen, Weitermachen, obwohl die Stimme zittert. Jede dieser kleinen Entscheidungen trainiert dein Mut-Muskel. Und wie jeder Muskel wird er stärker, je öfter du ihn benutzt.',
            nextSceneId: 'f3-s5',
            points: { empathyPoints: 2, insightPoints: 1, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'f3-s5',
        speaker: 'Finn',
        speakerEmoji: '🌟',
        text: 'Die Waldszenen verblassen. Finn steht da, die Hände nicht mehr in den Taschen, sondern an seinen Seiten. "Ich habe jetzt Werkzeuge", sagt er. "Atmen, wenn die Panik kommt. Mich fragen, was das Schlimmste ist, das passieren kann. Kleine Schritte statt große Sprünge. Und..." Er grinst. "...mir selbst sagen, dass ich es schaffe, statt mir selbst zu sagen, dass ich versage." Er atmet tief ein. "Mut ist nicht, keine Angst zu haben. Mut ist, trotz Angst das Richtige zu tun. Richtig?"',
        choices: [
          {
            id: 'f3-s5-c1',
            text: '"Genau, Finn. Und du hast heute bewiesen, dass du das kannst."',
            consequence: 'Finn strahlt. Er hat heute nicht nur Werkzeuge gelernt, er hat verstanden, was Mut wirklich bedeutet. Nicht die Abwesenheit von Angst, sondern das Handeln trotz Angst. Jeder kleine Schritt, den er von nun an trotz Angst macht, wird ihn stärker machen.',
            nextSceneId: null,
            points: { empathyPoints: 2, insightPoints: 1, couragePoints: 2 }
          },
          {
            id: 'f3-s5-c2',
            text: '"Richtig. Und vergiss nicht: Du musst es nicht allein schaffen. Hilfe zu holen ist auch Mut."',
            consequence: 'Finn nickt ernst. Er hat heute gelernt: Atemtechniken, positiver Selbsttalk, die "Was ist das Schlimmste?"-Frage, progressive Muskelentspannung und stufenweise Annäherung. Echte Werkzeuge für echte Ängste. Der Pfad der Mutproben endet hier, aber Finns Weg hat gerade erst begonnen.',
            nextSceneId: null,
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 1 }
          },
          {
            id: 'f3-s5-c3',
            text: '"Lass uns die Werkzeuge zusammenfassen: Atmen, wenn die Panik kommt. Fragen: Was ist das Schlimmste? Muskeln anspannen und loslassen. Und dir selbst sagen: Ich schaffe das."',
            consequence: 'Finn zählt an seinen Fingern mit: "Atmen. Fragen. Anspannen-Loslassen. Positiver Selbsttalk. Kleine Schritte." Er hat jetzt fünf konkrete Werkzeuge. Nicht abstrakte Ratschläge, sondern Dinge, die er sofort einsetzen kann. Das ist der Unterschied zwischen "Hab keine Angst" und "Hier ist, was du tun kannst, wenn die Angst kommt."',
            nextSceneId: null,
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          }
        ]
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // Chapter 4: Der Wald gehört uns
  // Theme: Social courage, standing up for others, fear as information
  // Key learning: "Jedes Mal, wenn du etwas trotz Angst tust, wirst du ein
  //               bisschen mutiger."
  // ---------------------------------------------------------------------------
  {
    id: 'forest-scenario-4',
    islandId: 'forest' as IslandId,
    title: 'Der Wald gehört uns',
    description: 'Ein neuer Schüler wird ausgegrenzt. Die Angst sagt dir: Halt dich raus. Aber ist das das Richtige?',
    scenes: [
      {
        id: 'f4-s1',
        speaker: 'Erzähler',
        speakerEmoji: '🌲',
        text: 'Der Wald öffnet sich zu einer großen Lichtung. Dort sitzt eine Gruppe Jugendlicher im Kreis und lacht. Abseits, hinter einem Baum, steht ein Junge allein. Er heißt Amir, ist neu und kennt noch niemanden. Er schaut sehnsüchtig zum Kreis, aber traut sich nicht hin. Finn flüstert: "Die Gruppe hat vorhin über ihn geredet. Gesagt, er soll nicht zu ihnen kommen. Ohne Grund. Einfach so."',
        choices: [
          {
            id: 'f4-s1-c1',
            text: '"Das ist nicht in Ordnung. Jemanden ohne Grund auszuschließen ist gemein."',
            consequence: 'Du erkennst sofort, dass hier etwas falsch läuft. Ausgrenzung ist eine der schmerzhaftesten Erfahrungen für Jugendliche. Und oft schauen alle zu, ohne etwas zu sagen.',
            nextSceneId: 'f4-s2',
            points: { empathyPoints: 2, insightPoints: 1, couragePoints: 2 }
          },
          {
            id: 'f4-s1-c2',
            text: '"Amir sieht traurig aus. Wie fühlt sich das wohl an, so dazustehen und zu wissen, dass man nicht willkommen ist?"',
            consequence: 'Du versetzt dich in Amirs Lage. Empathie, die Fähigkeit, die Gefühle anderer nachzuempfinden, ist der erste Schritt zu sozialem Mut. Denn wenn du fühlst, was der andere fühlt, fällt es schwerer, wegzuschauen.',
            nextSceneId: 'f4-s2',
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 1 }
          },
          {
            id: 'f4-s1-c3',
            text: '"Sollten wir etwas tun? Oder mischen wir uns besser nicht ein?"',
            consequence: 'Eine ehrliche Frage. Dein Kopf weiß, dass Ausgrenzung falsch ist. Aber dein Bauchgefühl sagt: Wenn du dich einmischst, könntest du selbst zum Außenseiter werden. Das ist soziale Angst, und sie hält viele Menschen davon ab, das Richtige zu tun.',
            nextSceneId: 'f4-s2',
            points: { empathyPoints: 1, insightPoints: 2, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'f4-s2',
        speaker: 'Finn',
        speakerEmoji: '😰',
        text: 'Finn beißt sich auf die Lippe. "Ich weiß, dass wir hingehen und etwas sagen sollten. Aber..." Er schaut zur Gruppe. "Was, wenn die dann über UNS reden? Was, wenn sie uns auch ausschließen? Ich habe gerade erst gelernt, mit meiner Angst umzugehen. Und jetzt soll ich mich gegen eine ganze Gruppe stellen?" Sein Atem wird schneller. Du siehst, wie die alte Angst in ihm hochsteigt.',
        choices: [
          {
            id: 'f4-s2-c1',
            text: '"Erinnerst du dich an deine Werkzeuge? Atme erst mal. Vier Sekunden ein, vier halten, sechs aus. Dann überlegen wir zusammen, was wir tun können."',
            consequence: 'Gut, dass du Finn an seine Werkzeuge erinnerst. In Stressmomenten vergessen wir oft, was wir gelernt haben. Finn atmet. Langsam wird sein Herzschlag ruhiger. Die Angst ist noch da, aber er kann wieder klar denken.',
            nextSceneId: 'f4-s3',
            points: { empathyPoints: 1, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'f4-s2-c2',
            text: '"Finn, die Angst sagt dir gerade: Halt dich raus, dann bist du sicher. Aber ist das wirklich das, was du willst? Willst du der sein, der zuschaut?"',
            consequence: 'Eine wichtige Frage. Angst gibt dir Informationen: "Das könnte unangenehm werden." Aber Angst gibt dir keine Anweisungen. Du entscheidest, ob du auf die Angst hörst oder ob du tust, was richtig ist. Angst ist Information, nicht Instruktion.',
            nextSceneId: 'f4-s3',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'f4-s2-c3',
            text: '"Wir müssen nicht die Gruppe konfrontieren. Wir können einfach zu Amir gehen. Manchmal reicht es, jemandem zu zeigen, dass er nicht allein ist."',
            consequence: 'Klug gedacht. Sozialer Mut muss nicht immer bedeuten, sich gegen eine Gruppe zu stellen. Manchmal ist der mutigste Schritt, sich neben den zu setzen, der allein ist. Das verändert die Situation, ohne einen Kampf auszulösen. Und für Amir kann genau das den ganzen Unterschied machen.',
            nextSceneId: 'f4-s3',
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'f4-s3',
        speaker: 'Erzähler',
        speakerEmoji: '🌲',
        text: 'Ihr geht zu Amir. Als er euch sieht, zuckt er zusammen, als erwarte er, weggeschickt zu werden. "Hey", sagst du. "Dürfen wir uns zu dir setzen?" Amir schaut ungläubig. "Zu mir? Aber die anderen..." Aus dem Kreis der Gruppe ruft jemand: "Hey, was macht ihr denn bei DEM? Kommt lieber hierher!" Finn versteinert. Seine Hände ballen sich. Die Gruppe beobachtet euch. Das ist der Moment, in dem Angst und Mut sich gegenüberstehen.',
        choices: [
          {
            id: 'f4-s3-c1',
            text: '"Wir bleiben hier. Amir ist genauso Teil dieser Lichtung wie ihr. Jeder ist willkommen."',
            consequence: 'Du sprichst ruhig und bestimmt. Keine Aggression, kein Vorwurf, nur eine klare Aussage. Die Gruppe wird still. Manche schauen beschämt weg. Sozialer Mut bedeutet nicht, laut zu schreien. Es bedeutet, ruhig und klar zu sagen, was richtig ist.',
            nextSceneId: 'f4-s4',
            points: { empathyPoints: 2, insightPoints: 1, couragePoints: 3 }
          },
          {
            id: 'f4-s3-c2',
            text: 'Du setzt dich demonstrativ neben Amir und sagst zu Finn: "Komm, setz dich. Hier ist ein guter Platz."',
            consequence: 'Manchmal sagen Taten mehr als Worte. Indem du dich neben Amir setzt, sendest du ein Signal an die ganze Lichtung: Dieser Mensch ist nicht allein. Finn setzt sich zögernd dazu. Amir lächelt zum ersten Mal.',
            nextSceneId: 'f4-s4',
            points: { empathyPoints: 2, insightPoints: 1, couragePoints: 2 }
          },
          {
            id: 'f4-s3-c3',
            text: 'Du schaust zur Gruppe und sagst: "Wisst ihr, wie sich das anfühlt, wenn man ausgeschlossen wird? Stellt euch vor, ihr wärt neu und niemand redet mit euch."',
            consequence: 'Du nutzt Empathie als Werkzeug. Statt die Gruppe anzuklagen, bittest du sie, sich in Amirs Lage zu versetzen. Einige in der Gruppe senken den Blick. Nachdenken ist der erste Schritt zur Veränderung.',
            nextSceneId: 'f4-s4',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'f4-s4',
        speaker: 'Finn',
        speakerEmoji: '😮',
        text: 'Etwas verändert sich. Ein Mädchen aus der Gruppe steht auf und kommt zu euch. "Kann ich mich auch hierher setzen?", fragt sie leise. "Ich fand es auch nicht okay, wie wir über Amir geredet haben. Ich wollte was sagen, aber ich hatte Angst." Dann noch jemand. Und noch jemand. Am Ende sitzt fast die halbe Gruppe bei euch. Finn schaut dich mit großen Augen an. "Die hatten auch Angst. Genau wie ich. Sie brauchten nur jemanden, der den ersten Schritt macht."',
        choices: [
          {
            id: 'f4-s4-c1',
            text: '"Genau. Oft wollen viele das Richtige tun, aber alle warten darauf, dass jemand anderes anfängt. Manchmal brauchst nur du den Mut für den ersten Schritt."',
            consequence: 'Das nennt man den "Bystander-Effekt": In einer Gruppe wartet jeder darauf, dass jemand anderes handelt. Aber es braucht nur eine Person, die den Anfang macht. Eine Person, die sagt: "Das ist nicht okay." Und plötzlich bewegen sich alle.',
            nextSceneId: 'f4-s5',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'f4-s4-c2',
            text: '"Siehst du, Finn? Angst ist eine Information, keine Anweisung. Sie sagt dir, dass etwas schwierig sein könnte. Aber sie entscheidet nicht, was du tust. Das tust du."',
            consequence: 'Angst als Information, nicht als Instruktion: Das ist eine der wichtigsten Lektionen. Angst sagt: "Achtung, das könnte unangenehm werden." Aber DU entscheidest, ob du trotzdem handelst. Deine Angst ist dein Berater, nicht dein Chef.',
            nextSceneId: 'f4-s5',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'f4-s4-c3',
            text: '"Die brauchten alle nur jemanden, der zeigt: Es ist okay, das Richtige zu tun. Manchmal verändert eine einzige Person die ganze Dynamik einer Gruppe."',
            consequence: 'Das ist die Kraft des positiven Vorbilds. In einer Gruppe, in der alle schweigen, braucht es nur eine Stimme, die sagt: "Nein, das ist nicht in Ordnung." Plötzlich trauen sich auch andere. Du musst nicht die lauteste Person im Raum sein. Du musst nur die erste sein, die den Mund aufmacht.',
            nextSceneId: 'f4-s5',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'f4-s5',
        speaker: 'Amir',
        speakerEmoji: '😊',
        text: 'Amir schaut in die Runde. "Ich dachte, hier will mich keiner", sagt er leise. "Ich war schon bereit aufzugeben und mich nie wieder zu trauen." Er schaut dich und Finn an. "Aber ihr seid gekommen. Trotz der Angst, dass die Gruppe euch ablehnt. Warum?" Finn antwortet, bevor du es kannst: "Weil Angst mir sagt, was passieren könnte. Aber sie sagt mir nicht, was richtig ist. Und das Richtige war, zu dir zu kommen."',
        choices: [
          {
            id: 'f4-s5-c1',
            text: '"Und jedes Mal, wenn du etwas trotz Angst tust, wirst du ein bisschen mutiger. Das gilt für uns alle hier."',
            consequence: 'Die Lichtung füllt sich mit Wärme. Amir ist nicht mehr allein. Finn hat seine Angst überwunden. Und alle haben gelernt: Jedes Mal, wenn du trotz Angst handelst, wächst dein Mut ein kleines Stück. Es wird nie völlig ohne Angst sein. Aber es wird leichter. Immer ein bisschen leichter.',
            nextSceneId: null,
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'f4-s5-c2',
            text: '"Finn, du bist gerade vom Jungen, der vor Referaten wegrennt, zum Jungen geworden, der für andere einsteht. Das ist Mut."',
            consequence: 'Finn wird rot, aber er lächelt. Er hat eine Reise hinter sich: Vom Erstarren im Wald über das Verstehen seiner Angst, das Lernen von Werkzeugen bis zum Einsetzen für andere. Die Angst ist nicht weg. Sie wird nie ganz weg sein. Aber Finn weiß jetzt: Er ist mutiger als seine Angst. Und das reicht.',
            nextSceneId: null,
            points: { empathyPoints: 2, insightPoints: 1, couragePoints: 3 }
          },
          {
            id: 'f4-s5-c3',
            text: '"Der Wald gehört nicht der Angst. Der Wald gehört uns. Allen. Und jeder hat hier einen Platz."',
            consequence: 'Alle auf der Lichtung nicken. Die Dunkelheit zwischen den Bäumen ist noch da, aber sie macht niemandem mehr Angst. Denn sie haben gelernt: Angst ist ein Teil des Lebens. Sie gehört dazu. Aber sie bestimmt nicht, wer du bist oder was du tust. Du bist der Mensch, der trotz Angst das Richtige tut. Und das ist genug.',
            nextSceneId: null,
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 2 }
          }
        ]
      }
    ]
  }
];
