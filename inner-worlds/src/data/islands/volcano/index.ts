// @ts-nocheck
import type { Scenario, WisdomCard, Activity, IslandId } from '../../../types';

interface VolcanoActivity extends Activity {
  instructions: string[];
}

interface NPC {
  id: string;
  name: string;
  emoji: string;
  description: string;
  backstory: string;
}

// NPCs
export const volcanoNPCs: NPC[] = [
  {
    id: 'flamara',
    name: 'Flamara',
    emoji: '🔥',
    description: 'Die sarkastische Wächterin des Vulkans, die mehr weiß als sie zugibt',
    backstory: 'Flamara war nicht immer eine Wächterin. Vor langer Zeit war sie selbst ein Teenager, der vor Wut fast alles verloren hätte. Seitdem hütet sie den Vulkan mit einer Mischung aus trockenem Humor und tiefer Weisheit. Sie nervt gerne – aber immer mit Absicht.'
  },
  {
    id: 'ash',
    name: 'Ash',
    emoji: '🌑',
    description: 'Ein patziger Teenager, dessen Wut ein Geheimnis verbirgt',
    backstory: 'Ash ist vor drei Monaten auf der Vulkaninsel gelandet und weigert sich seitdem, irgendjemanden an sich heranzulassen. Er ist laut, er ist wütend, und er hat für alles einen sarkastischen Kommentar. Was niemand weiß: Unter der ganzen Wut versteckt sich eine Traurigkeit, die er niemals zeigen würde.'
  },
  {
    id: 'magmus',
    name: 'Magmus',
    emoji: '🪨',
    description: 'Ein Golem aus erstarrter Lava mit extrem trockenem Humor',
    backstory: 'Magmus spricht in kurzen Sätzen und bewegt sich wie in Zeitlupe. Manche denken, er sei langsam – aber sein Verstand ist messerscharf. Er war einst tobende Lava und hat Jahrtausende gebraucht, um fest zu werden. Diese Erfahrung hat ihn gelehrt, dass Geduld die unterschätzteste Superkraft ist.'
  },
  {
    id: 'zinnia',
    name: 'Zinnia',
    emoji: '🌺',
    description: 'Eine rebellische Blume, die auf dem Vulkan einen geheimen Garten pflegt',
    backstory: 'Zinnia ist die Überraschung der Vulkaninsel: eine leuchtende Blume, die im härtesten Boden wächst. Was sie aber wirklich besonders macht, ist ihre Vergangenheit – sie war selbst einmal voller Zorn und hat gelernt, diese Energie in etwas Schönes zu verwandeln. Sie ist kein bisschen sanft, wenn es darauf ankommt.'
  }
];

// Scenarios
export const volcanoScenarios: Scenario[] = [
  {
    id: 'volcano-scenario-1',
    islandId: 'volcano' as IslandId,
    title: 'Ankunft auf der Vulkaninsel',
    description: 'Du wachst an einem unbekannten Ort auf – und der Boden unter dir ist heiß',
    scenes: [
      {
        id: 'v1-s1',
        speaker: 'narrator',
        speakerEmoji: '📜',
        text: 'Du öffnest die Augen. Über dir ein roter Himmel, unter dir warmer Fels. Dein Kopf brummt. Wo bist du? Als du dich aufrichtest, siehst du einen rauchenden Vulkan in der Ferne. Der Boden vibriert leicht. Alles riecht nach Schwefel und Abenteuer. Und dann hörst du eine Stimme hinter dir: "Na, gut geschlafen? Oder eher – schlecht gelandet?"',
        choices: [
          {
            id: 'v1-s1-c1',
            text: 'Erschrocken herumwirbeln: "Wer bist du?!"',
            consequence: 'Du reagierst wachsam – Vorsicht ist auch eine Form von Stärke.',
            nextSceneId: 'v1-s2',
            points: { empathyPoints: 0, insightPoints: 1, couragePoints: 3 }
          },
          {
            id: 'v1-s1-c2',
            text: 'Vorsichtig umdrehen und die Stimme mustern',
            consequence: 'Deine Einsicht hilft dir, die Situation erst zu beobachten, bevor du handelst.',
            nextSceneId: 'v1-s2',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'v1-s1-c3',
            text: '"Wo bin ich? Was ist hier los?"',
            consequence: 'Dein Einfühlungsvermögen zeigt sich in deinem ehrlichen Bedürfnis, die Situation zu verstehen.',
            nextSceneId: 'v1-s2',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'v1-s2',
        speaker: 'Flamara',
        speakerEmoji: '🔥',
        text: 'Vor dir steht eine Gestalt aus flackerndem Feuer – aber mit einem ziemlich lässigen Grinsen. "Ich bin Flamara. Wächterin dieser Insel. Und bevor du fragst: Nein, du träumst nicht. Ja, der Vulkan ist echt. Und ja, es wird noch weirder." Sie verschränkt die Arme. "Willkommen in den Inneren Welten. Du bist auf der Vulkaninsel gelandet. Hier dreht sich alles um..." Sie tippt dir an die Brust. "...das Feuer da drin."',
        choices: [
          {
            id: 'v1-s2-c1',
            text: '"Feuer? Meinst du... Wut?"',
            consequence: 'Deine Einsicht lässt dich die richtigen Fragen stellen.',
            nextSceneId: 'v1-s3',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'v1-s2-c2',
            text: '"Ich will hier weg! Sofort!"',
            consequence: 'Dein Mut zeigt sich, auch wenn er aus Unsicherheit entsteht.',
            nextSceneId: 'v1-s3',
            points: { empathyPoints: 0, insightPoints: 1, couragePoints: 3 }
          },
          {
            id: 'v1-s2-c3',
            text: '"Innere Welten? Klingt nach einem Videospiel."',
            consequence: 'Dein Einfühlungsvermögen hilft dir, die Situation mit Humor zu nehmen.',
            nextSceneId: 'v1-s3',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'v1-s3',
        speaker: 'Flamara',
        speakerEmoji: '🔥',
        text: 'Flamara lacht – ein Geräusch wie knisterndes Holz. "Clever. Ja, Wut. Jeder, der hier ankommt, hat irgendwas mit Wut zu klären. Nicht weil Wut schlecht ist – sondern weil die meisten nicht wissen, was sie damit sollen." Sie zeigt auf den Vulkan. "Siehst du den Rauch? Der reagiert auf DICH. Auf deine Emotionen." Tatsächlich – als du genauer hinschaust, pulsiert der Rauch im Rhythmus deines Herzschlags.',
        choices: [
          {
            id: 'v1-s3-c1',
            text: '"Das ist... unheimlich. Aber irgendwie cool."',
            consequence: 'Deine Einsicht verbindet Respekt mit Neugier – eine starke Mischung.',
            nextSceneId: 'v1-s4',
            points: { empathyPoints: 1, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'v1-s3-c2',
            text: '"Heißt das, der Vulkan spürt meine Gefühle?"',
            consequence: 'Deine Einsicht lässt dich die tiefere Bedeutung der Verbindung erkennen.',
            nextSceneId: 'v1-s4',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 0 }
          },
          {
            id: 'v1-s3-c3',
            text: 'Absichtlich an etwas Ärgerliches denken, um zu testen, ob es stimmt',
            consequence: 'Dein Mut treibt dich an, die Grenzen selbst auszutesten.',
            nextSceneId: 'v1-s4',
            points: { empathyPoints: 0, insightPoints: 2, couragePoints: 3 }
          }
        ]
      },
      {
        id: 'v1-s4',
        speaker: 'Flamara',
        speakerEmoji: '🔥',
        text: 'WUMM! Ein kleines Feuertierchen – halb Eidechse, halb Flamme – rennt direkt in dein Bein und stolpert weiter, ohne sich auch nur umzudrehen. Es tut weh! Dein Schienbein brennt. Der Vulkan spuckt sofort eine kleine Rauchwolke aus. Flamara beobachtet dich mit hochgezogener Augenbraue. "Und? Was machst du jetzt?"',
        choices: [
          {
            id: 'v1-s4-c1',
            text: '"HEY! Pass doch auf, du...!" – dem Tierchen hinterherrufen',
            consequence: 'Dein Mut zeigt sich in deiner direkten Reaktion – manchmal muss man laut werden.',
            nextSceneId: 'v1-s5',
            points: { empathyPoints: 0, insightPoints: 1, couragePoints: 3 }
          },
          {
            id: 'v1-s4-c2',
            text: 'Tief durchatmen und das Bein reiben – es war wahrscheinlich keine Absicht',
            consequence: 'Dein Einfühlungsvermögen hilft dir, auch im Schmerz Verständnis zu zeigen.',
            nextSceneId: 'v1-s5',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 0 }
          },
          {
            id: 'v1-s4-c3',
            text: 'Die Wut spüren, aber erst mal beobachten, was passiert',
            consequence: 'Deine Einsicht lehrt dich, Wut bewusst wahrzunehmen, statt blindlings zu reagieren.',
            nextSceneId: 'v1-s5',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'v1-s5',
        speaker: 'Flamara',
        speakerEmoji: '🔥',
        text: 'Flamara nickt langsam. "Interessant. Schau mal zum Vulkan." Der Rauch hat sich verändert – je nachdem, wie du reagiert hast. "Siehst du den Zusammenhang? Deine Reaktion steuert die Flammen. Nicht die Situation – DEINE Antwort darauf." Sie grinst. "Kleine Übung: Denk an etwas, das dich richtig nervt. Siehst du den Rauch steigen? Gut. Jetzt: Atme ein... zwei... drei... und lass los." Der Rauch wird langsamer, dünner.',
        choices: [
          {
            id: 'v1-s5-c1',
            text: 'Mitmachen und spüren, wie die Wut nachlässt – krass!',
            consequence: 'Deine Einsicht öffnet dir die Augen für die Macht der Selbstkontrolle.',
            nextSceneId: 'v1-s6',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'v1-s5-c2',
            text: '"Okay, das funktioniert echt. Aber ist das im echten Leben genauso einfach?"',
            consequence: 'Deine Einsicht hinterfragt klug, ob das Gelernte auch im Alltag funktioniert.',
            nextSceneId: 'v1-s6',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 0 }
          },
          {
            id: 'v1-s5-c3',
            text: '"Was, wenn die Wut zu stark ist zum Loslassen?"',
            consequence: 'Dein Einfühlungsvermögen zeigt sich in deiner ehrlichen Sorge um die schwierigen Momente.',
            nextSceneId: 'v1-s6',
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'v1-s6',
        speaker: 'Flamara',
        speakerEmoji: '🔥',
        text: 'Flamara legt dir kurz die Hand auf die Schulter – ihre Berührung ist warm, nicht heiß. "Gute Fragen. Und genau deshalb bist du hier." Sie schaut zum Vulkan, und ihr Grinsen verschwindet für einen Moment. "Morgen triffst du Ash. Er lebt hier seit drei Monaten und ist eine... wandelnde Zeitbombe. Alle anderen haben aufgegeben, ihm zu helfen." Sie sieht dich an. "Vielleicht schaffst du es. Oder er verscheucht dich in fünf Minuten. Mal sehen." Sie zwinkert und löst sich in Funken auf.',
        choices: [
          {
            id: 'v1-s6-c1',
            text: '"Warte – wer ist Ash? Flamara?!" Aber sie ist schon weg.',
            consequence: 'Deine Einsicht und dein Mut zeigen sich in deiner Neugier auf das Unbekannte.',
            nextSceneId: null,
            points: { empathyPoints: 1, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'v1-s6-c2',
            text: 'Neugierig sein. Jemand, dem noch niemand helfen konnte? Challenge accepted.',
            consequence: 'Dein Mut lässt dich jede Herausforderung als Chance sehen.',
            nextSceneId: null,
            points: { empathyPoints: 1, insightPoints: 1, couragePoints: 3 }
          },
          {
            id: 'v1-s6-c3',
            text: 'Ein mulmiges Gefühl haben, aber auch Mitgefühl – dieser Ash klingt einsam.',
            consequence: 'Dein Einfühlungsvermögen spürt die Einsamkeit hinter der Wut.',
            nextSceneId: null,
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 1 }
          }
        ]
      }
    ]
  },
  {
    id: 'volcano-scenario-2',
    islandId: 'volcano' as IslandId,
    title: 'Ashs Herausforderung',
    description: 'Ein wütender Junge, der kein Mitleid will – aber vielleicht etwas anderes braucht',
    scenes: [
      {
        id: 'v2-s1',
        speaker: 'narrator',
        speakerEmoji: '📜',
        text: 'Du findest Ash an einer Felswand. Er wirft Steine gegen das Gestein – WHAM, WHAM, WHAM – als hätte der Fels ihm etwas getan. Als er dich bemerkt, verdreht er die Augen. "Oh nein. Lass mich raten: Flamara hat dich geschickt, um mich zu \'retten\'." Er macht Anführungszeichen mit den Fingern. "Spar dir die Mühe. Die letzte Person, die das versucht hat, ist heulend weggerannt."',
        choices: [
          {
            id: 'v2-s1-c1',
            text: '"Ich bin nicht hier, um dich zu retten. Ich bin einfach hier."',
            consequence: 'Dein Einfühlungsvermögen zeigt sich in deiner unaufdringlichen Präsenz.',
            nextSceneId: 'v2-s2',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 1 }
          },
          {
            id: 'v2-s1-c2',
            text: '"Heulend? Was hast du gemacht?" – neugierig, nicht eingeschüchtert',
            consequence: 'Dein Mut zeigt sich darin, dass du dich nicht einschüchtern lässt.',
            nextSceneId: 'v2-s2',
            points: { empathyPoints: 1, insightPoints: 2, couragePoints: 3 }
          },
          {
            id: 'v2-s1-c3',
            text: 'Wortlos einen Stein aufheben und neben ihm gegen die Wand werfen',
            consequence: 'Dein Mut spricht durch Taten – manchmal sagt eine Geste mehr als tausend Worte.',
            nextSceneId: 'v2-s2',
            points: { empathyPoints: 2, insightPoints: 1, couragePoints: 3 }
          }
        ]
      },
      {
        id: 'v2-s2',
        speaker: 'Ash',
        speakerEmoji: '🌋',
        text: 'Ash mustert dich überrascht. So hat noch niemand reagiert. Er wirft noch einen Stein, aber weniger aggressiv. "Du bist komisch, weißt du das?" Stille. Dann: "Alle sagen immer \'Ash, beruhig dich\' oder \'Ash, warum bist du so wütend?\'. Als ob ICH das Problem wäre." Er tritt gegen einen Stein. "Du denkst, du weißt, warum ich wütend bin?"',
        choices: [
          {
            id: 'v2-s2-c1',
            text: '"Nee, keine Ahnung. Erzähl mal – wenn du willst."',
            consequence: 'Dein Einfühlungsvermögen gibt Ash den Raum, den er braucht.',
            nextSceneId: 'v2-s3',
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 1 }
          },
          {
            id: 'v2-s2-c2',
            text: '"Ich glaube, du weißt es selbst nicht so genau."',
            consequence: 'Deine Einsicht erkennt, was Ash selbst noch nicht sehen kann.',
            nextSceneId: 'v2-s3',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'v2-s2-c3',
            text: '"Ich weiß nur, dass Wut meistens einen Grund hat."',
            consequence: 'Deine Einsicht versteht, dass Wut immer eine Geschichte erzählt.',
            nextSceneId: 'v2-s3',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 0 }
          }
        ]
      },
      {
        id: 'v2-s3',
        speaker: 'Ash',
        speakerEmoji: '🌋',
        text: 'Ash öffnet den Mund, schließt ihn wieder. Öffnet ihn nochmal. "Ich bin wütend, weil..." Er stockt. Sein Blick wandert zum Vulkan, als suche er dort die Antwort. Plötzlich sagt er ganz leise etwas Seltsames: "Zu Hause war\'s leiser." Dann ballt er sofort die Fäuste, als hätte er zu viel gesagt. Der Vulkan spuckt eine Rauchwolke. Flamara erscheint kurz als Feuerfunke neben deinem Ohr und flüstert: "Achte auf das, was er NICHT sagt."',
        choices: [
          {
            id: 'v2-s3-c1',
            text: 'Nichts sagen. Einfach dasitzen. Ihm Zeit geben.',
            consequence: 'Dein Einfühlungsvermögen schenkt Ash die Stille, die er zum Öffnen braucht.',
            nextSceneId: 'v2-s4',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 1 }
          },
          {
            id: 'v2-s3-c2',
            text: '"Zu Hause? Vermisst du es?"',
            consequence: 'Dein Einfühlungsvermögen und deine Einsicht helfen dir, die richtige Frage zu stellen.',
            nextSceneId: 'v2-s4',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'v2-s3-c3',
            text: '"Ash... bist du vielleicht nicht nur wütend?"',
            consequence: 'Deine Einsicht erkennt, dass unter Ashs Wut etwas anderes verborgen liegt.',
            nextSceneId: 'v2-s4',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'v2-s4',
        speaker: 'Ash',
        speakerEmoji: '🌋',
        text: 'Ash dreht sich weg. Seine Schultern zittern. "Hör auf damit." Seine Stimme klingt anders – nicht wütend, sondern... brüchig. "Ich bin WÜTEND, okay? Nur wütend. Das ist alles." Aber du siehst es: Für einen winzigen Moment glänzen seine Augen verdächtig. Er wischt sich schnell übers Gesicht. "Verdammter Rauch hier." Es gibt keinen Rauch in der Nähe.',
        choices: [
          {
            id: 'v2-s4-c1',
            text: '"Ash, es ist okay, traurig zu sein. Das ist kein Zeichen von Schwäche."',
            consequence: 'Dein Einfühlungsvermögen gibt Ash die Erlaubnis, verletzlich zu sein.',
            nextSceneId: 'v2-s5',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'v2-s4-c2',
            text: '"Ich kenne das. Manchmal bin ich auch wütend, weil ich nicht traurig sein will."',
            consequence: 'Dein Einfühlungsvermögen und deine Einsicht schaffen eine Brücke der Verbindung.',
            nextSceneId: 'v2-s5',
            points: { empathyPoints: 3, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'v2-s4-c3',
            text: 'Ihm eine Hand auf die Schulter legen – vorsichtig',
            consequence: 'Dein Mut und dein Einfühlungsvermögen sprechen durch eine einfache Geste.',
            nextSceneId: 'v2-s5',
            points: { empathyPoints: 3, insightPoints: 0, couragePoints: 3 }
          }
        ]
      },
      {
        id: 'v2-s5',
        speaker: 'Ash',
        speakerEmoji: '🌋',
        text: 'Ash erstarrt. Dann bricht es aus ihm heraus: "Wenn ich wütend bin, muss ich nicht traurig sein! Verstehst du das?! Wut ist STARK! Traurigkeit ist..." Er sucht nach Worten. "...das Schlimmste." Seine Stimme ist jetzt kaum mehr als ein Flüstern. "Wenn ich aufhöre wütend zu sein, dann spüre ich alles andere. Und das..." Er schluckt. "...das halte ich nicht aus." Der Vulkan wird ganz still. Kein Rauch. Kein Grollen. Als würde er zuhören.',
        choices: [
          {
            id: 'v2-s5-c1',
            text: '"Du musst es nicht alleine aushalten. Dafür sind Leute da."',
            consequence: 'Dein Einfühlungsvermögen erinnert Ash daran, dass er nicht allein kämpfen muss.',
            nextSceneId: 'v2-s6',
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 2 }
          },
          {
            id: 'v2-s5-c2',
            text: '"Wut als Schutzschild... Das ist eigentlich ziemlich schlau. Aber es funktioniert nicht ewig."',
            consequence: 'Deine Einsicht durchschaut Ashs Schutzmechanismus mit Respekt und Klarheit.',
            nextSceneId: 'v2-s6',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'v2-s5-c3',
            text: '"Du hältst gerade viel mehr aus als du denkst. Du redest mit mir. DAS ist mutig."',
            consequence: 'Dein Mut erkennt Stärke in Ashs Verletzlichkeit.',
            nextSceneId: 'v2-s6',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 3 }
          }
        ]
      },
      {
        id: 'v2-s6',
        speaker: 'Ash',
        speakerEmoji: '🌋',
        text: 'Ash schweigt lange. Dann – zum ersten Mal – lächelt er. Ganz kurz, kaum sichtbar. "Du bist... okay, schätze ich. Nicht so nervig wie die anderen." Für Ash ist das quasi eine Liebeserklärung. Er steht auf und klopft sich den Staub ab. "Kommst du morgen wieder? Ich meine... mir egal. Mach was du willst." Aber er sieht dich dabei an, als wäre es ihm ganz und gar nicht egal.',
        choices: [
          {
            id: 'v2-s6-c1',
            text: '"Klar. Gleiche Zeit, gleicher Fels?"',
            consequence: 'Dein Einfühlungsvermögen schafft einen sicheren Ort für Ash.',
            nextSceneId: null,
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 1 }
          },
          {
            id: 'v2-s6-c2',
            text: '"Ich bin da. Und Ash? Du bist stärker als du denkst."',
            consequence: 'Dein Einfühlungsvermögen und dein Mut geben Ash Kraft und Zuversicht.',
            nextSceneId: null,
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'v2-s6-c3',
            text: 'Einfach nicken und gehen – mit einem guten Gefühl',
            consequence: 'Deine Einsicht sagt dir, dass manchmal ein stilles Gehen die stärkste Botschaft ist.',
            nextSceneId: null,
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 2 }
          }
        ]
      }
    ]
  },
  {
    id: 'volcano-scenario-3',
    islandId: 'volcano' as IslandId,
    title: 'Das Magma-Labyrinth',
    description: 'Ein Labyrinth, in dem deine Wut die Lava steigen lässt – bleib cool. Buchstäblich.',
    scenes: [
      {
        id: 'v3-s1',
        speaker: 'Magmus',
        speakerEmoji: '🪨',
        text: 'Magmus steht vor einem dunklen Höhleneingang. Er ist riesig, aus grauem Gestein, und bewegt sich in Zeitlupe. "Du." Er zeigt auf den Eingang. "Da rein." Du wartest auf mehr Erklärung. Er blinzelt. Langsam. "Dort drin steigt die Lava, wenn du wütend wirst. Dein Zorn ist dort... echt." Er macht eine Pause, die gefühlt drei Minuten dauert. "Bleib cool." Noch eine Pause. "Buchstäblich."',
        choices: [
          {
            id: 'v3-s1-c1',
            text: '"Und wenn ich es nicht schaffe, cool zu bleiben?"',
            consequence: 'Deine Einsicht lässt dich die Risiken abwägen, bevor du handelst.',
            nextSceneId: 'v3-s2',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'v3-s1-c2',
            text: '"Du bist nicht gerade ein Mann vieler Worte, oder?" – reingehen',
            consequence: 'Dein Mut treibt dich vorwärts, auch ohne alle Antworten zu haben.',
            nextSceneId: 'v3-s2',
            points: { empathyPoints: 1, insightPoints: 1, couragePoints: 3 }
          },
          {
            id: 'v3-s1-c3',
            text: '"Kommst du wenigstens mit?"',
            consequence: 'Dein Einfühlungsvermögen zeigt sich in deinem Wunsch nach Gemeinschaft.',
            nextSceneId: 'v3-s2',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'v3-s2',
        speaker: 'Magmus',
        speakerEmoji: '🪨',
        text: 'Im Innern der Höhle glühen die Wände orange. Es ist heiß, aber auszuhalten. Du folgst einem schmalen Pfad. Plötzlich – KNALL – ein Fels fällt von der Decke und blockiert den Weg direkt vor dir. Du springst zurück. Dein Herz rast. Und du siehst es: Die Lava an den Wänden steigt ein paar Zentimeter. Magmus\' Stimme dröhnt von irgendwo: "Das war ein Test. Du bist wärmer geworden. Nicht gut."',
        choices: [
          {
            id: 'v3-s2-c1',
            text: 'Tief durchatmen – die Vulkan-Atmung von Flamara! Ein, zwei, drei... aus.',
            consequence: 'Deine Einsicht erinnert dich an das, was du bereits gelernt hast.',
            nextSceneId: 'v3-s3',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'v3-s2-c2',
            text: '"Echt jetzt?! WARNUNG wäre nett gewesen!" – frustriert sein',
            consequence: 'Dein Mut zeigt sich auch in der Frustration – doch die Lava steigt.',
            nextSceneId: 'v3-s3',
            points: { empathyPoints: 0, insightPoints: 1, couragePoints: 3 }
          },
          {
            id: 'v3-s2-c3',
            text: 'Einen Moment stillstehen, die Angst anerkennen, dann weitergehen',
            consequence: 'Dein Einfühlungsvermögen für dich selbst hilft dir, die Angst zu akzeptieren.',
            nextSceneId: 'v3-s3',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'v3-s3',
        speaker: 'Magmus',
        speakerEmoji: '🪨',
        text: 'Du kommst an eine Gabelung. Rechts: ein breiter, gut beleuchteter Gang. Links: ein enger, dunkler Spalt, aber du hörst Wasser – Kühlung! Die Lava ist jetzt auf Kniehöhe. Du musst dich entscheiden, und zwar schnell. Magmus: "Wut sagt: schnell handeln. Weisheit sagt: denk erstmal nach. Wer gewinnt?"',
        choices: [
          {
            id: 'v3-s3-c1',
            text: 'Den breiten Weg nehmen – sieht sicherer aus',
            consequence: 'Deine Einsicht wägt die Optionen ab und wählt den sicheren Weg.',
            nextSceneId: 'v3-s4',
            points: { empathyPoints: 1, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'v3-s3-c2',
            text: 'Zum Wasser! Den engen Spalt nehmen – Instinkt folgen',
            consequence: 'Dein Mut folgt dem Instinkt – manchmal ist das die beste Entscheidung.',
            nextSceneId: 'v3-s4',
            points: { empathyPoints: 0, insightPoints: 2, couragePoints: 3 }
          },
          {
            id: 'v3-s3-c3',
            text: 'Drei Sekunden anhalten. Denken. Dann entscheiden.',
            consequence: 'Deine Einsicht lehrt dich, auch unter Druck einen klaren Kopf zu behalten.',
            nextSceneId: 'v3-s4',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'v3-s4',
        speaker: 'Magmus',
        speakerEmoji: '🪨',
        text: 'Egal welchen Weg du gewählt hast – du landest in einer großen Höhle. Die Lava brodelt unter dir auf einer Glasplattform. Und dann passiert etwas Fieses: Aus dem Nichts erscheint eine Stimme, die klingt wie jemand, der dich ärgert. "Du schaffst das eh nicht. Du bist zu schwach. Gib auf!" Die Lava schießt hoch! Das ist eine Illusion – aber sie FÜHLT sich echt an.',
        choices: [
          {
            id: 'v3-s4-c1',
            text: '"Das ist nicht echt! Das sind nur meine eigenen Zweifel!" – dagegen ankämpfen',
            consequence: 'Dein Mut und deine Einsicht erkennen die Illusion und kämpfen dagegen an.',
            nextSceneId: 'v3-s5',
            points: { empathyPoints: 0, insightPoints: 3, couragePoints: 3 }
          },
          {
            id: 'v3-s4-c2',
            text: 'Die Augen schließen. Atmen. An Ashs Worte denken: Wut ist manchmal nur Angst.',
            consequence: 'Dein Einfühlungsvermögen verbindet dich mit dem, was du von anderen gelernt hast.',
            nextSceneId: 'v3-s5',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 1 }
          },
          {
            id: 'v3-s4-c3',
            text: 'Sich selbst laut Mut zusprechen: "Ich bin stärker als das!"',
            consequence: 'Dein Mut gibt dir die Kraft, an dich selbst zu glauben.',
            nextSceneId: 'v3-s5',
            points: { empathyPoints: 1, insightPoints: 1, couragePoints: 3 }
          }
        ]
      },
      {
        id: 'v3-s5',
        speaker: 'Magmus',
        speakerEmoji: '🪨',
        text: 'Die Stimme wird leiser. Die Lava sinkt. Du hast es geschafft – fast. Der letzte Gang führt nach draußen, du kannst den Himmel sehen! Aber... Sackgasse. Eine Wand versperrt den Ausgang. Du drückst dagegen – sie bewegt sich nicht. Die Lava steigt wieder. Magmus\' Stimme, ganz ruhig: "Stärke ist nicht, alles allein zu schaffen."',
        choices: [
          {
            id: 'v3-s5-c1',
            text: '"Magmus! Ich brauche Hilfe!" – um Hilfe rufen',
            consequence: 'Dein Mut überwindet den Stolz und ruft um Hilfe – das erfordert wahre Stärke.',
            nextSceneId: 'v3-s6',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 3 }
          },
          {
            id: 'v3-s5-c2',
            text: 'Nachdenken: Was würde Magmus tun? Warten. Beobachten. Die Wand genauer anschauen.',
            consequence: 'Deine Einsicht sucht nach dem klugen Weg, nicht nach dem einfachen.',
            nextSceneId: 'v3-s6',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'v3-s5-c3',
            text: 'Akzeptieren, dass du Hilfe brauchst – das ist keine Schwäche',
            consequence: 'Dein Einfühlungsvermögen erkennt, dass Verletzlichkeit keine Schwäche ist.',
            nextSceneId: 'v3-s6',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'v3-s6',
        speaker: 'Magmus',
        speakerEmoji: '🪨',
        text: 'Magmus schiebt sich langsam – seeehr langsam – durch die Höhlenwand. Buchstäblich. Er IST Stein. "Du hast gerufen." Er legt seine riesige Hand auf die blockierende Wand und schiebt sie weg wie eine Tür. Frische Luft strömt rein. Die Lava zieht sich sofort zurück. Draußen wartet die Sonne.',
        choices: [
          {
            id: 'v3-s6-c1',
            text: '"Das war... intensiv. Danke, Magmus."',
            consequence: 'Dein Einfühlungsvermögen zeigt echte Dankbarkeit für die Hilfe.',
            nextSceneId: 'v3-s7',
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 1 }
          },
          {
            id: 'v3-s6-c2',
            text: '"Hättest du das nicht etwas SCHNELLER machen können?!" – lachen',
            consequence: 'Dein Mut findet sogar in der Erleichterung Platz für Humor.',
            nextSceneId: 'v3-s7',
            points: { empathyPoints: 1, insightPoints: 1, couragePoints: 3 }
          },
          {
            id: 'v3-s6-c3',
            text: '"Warum hast du mich nicht einfach getragen?"',
            consequence: 'Deine Einsicht hinterfragt, warum die Lektion so und nicht anders gelaufen ist.',
            nextSceneId: 'v3-s7',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'v3-s7',
        speaker: 'Magmus',
        speakerEmoji: '🪨',
        text: 'Magmus sieht dich an – und du schwörst, ein winziges Lächeln huscht über sein Steingesicht. "Nicht schlecht. Du hast den heißesten Teil ohne Explosion überstanden." Pause. "Ich bin beeindruckt." Noch eine Pause. "Das sage ich nicht oft." Die längste Pause der Welt. "Eigentlich nie." Er dreht sich um und bewegt sich langsam davon. Über die Schulter sagt er: "Morgen triffst du Zinnia. Sie ist... anders. Und du wirst überrascht sein." Du bleibst stehen, verschwitzt aber stolz.',
        choices: [
          {
            id: 'v3-s7-c1',
            text: 'Stolz auf sich selbst sein – das war WIRKLICH schwer',
            consequence: 'Dein Mut hat dich durch die härteste Prüfung getragen.',
            nextSceneId: null,
            points: { empathyPoints: 1, insightPoints: 2, couragePoints: 3 }
          },
          {
            id: 'v3-s7-c2',
            text: 'Darüber nachdenken, was man gelernt hat: Hilfe holen ist nicht schwach',
            consequence: 'Deine Einsicht fasst die wichtigste Lektion zusammen: Hilfe holen ist Stärke.',
            nextSceneId: null,
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'v3-s7-c3',
            text: '"Magmus!" Er dreht sich um. "Danke. Echt jetzt."',
            consequence: 'Dein Einfühlungsvermögen drückt echte Wertschätzung aus – das berührt sogar Stein.',
            nextSceneId: null,
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 2 }
          }
        ]
      }
    ]
  },
  {
    id: 'volcano-scenario-4',
    islandId: 'volcano' as IslandId,
    title: 'Zinnias Geheimnis',
    description: 'Ein Garten auf einem Vulkan? Zinnia zeigt dir, dass Wut Dinge erschaffen kann',
    scenes: [
      {
        id: 'v4-s1',
        speaker: 'Zinnia',
        speakerEmoji: '🌺',
        text: 'Das ergibt keinen Sinn. Mitten auf dem schwarzen Vulkangestein liegt ein Garten voller leuchtender Blumen – rot, orange, violett. Und mittendrin steht Zinnia, eine Blume so groß wie du, die dir direkt in die Augen schaut. "Überrascht?" Sie lacht. "Alle sind überrascht. Eine Blume auf einem Vulkan. Unmöglich, oder?" Sie streckt ein Blatt aus wie eine Hand. "Und doch bin ich hier. Die Frage ist: Wie?"',
        choices: [
          {
            id: 'v4-s1-c1',
            text: '"Der vulkanische Boden ist nährstoffreich – nach Ausbrüchen wächst alles besser!"',
            consequence: 'Deine Einsicht verbindet wissenschaftliches Wissen mit emotionaler Weisheit.',
            nextSceneId: 'v4-s2',
            points: { empathyPoints: 0, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'v4-s1-c2',
            text: '"Ehrlich? Keine Ahnung. Aber es ist wunderschön."',
            consequence: 'Dein Einfühlungsvermögen lässt dich die Schönheit in Unerwartetem erkennen.',
            nextSceneId: 'v4-s2',
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 1 }
          },
          {
            id: 'v4-s1-c3',
            text: '"Wie überlebst du die Hitze und die Ausbrüche?"',
            consequence: 'Deine Einsicht stellt die richtigen Fragen über Widerstandskraft.',
            nextSceneId: 'v4-s2',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'v4-s2',
        speaker: 'Zinnia',
        speakerEmoji: '🌺',
        text: '"Kluge Antwort!" Zinnia wiegt sich zufrieden. "Weißt du, was nach einem Vulkanausbruch passiert? ALLES wächst. Besser, schneller, stärker als vorher. Die Asche wird zu Dünger. Die Zerstörung wird zum Nährboden." Sie beugt sich vor, als würde sie ein Geheimnis verraten. "Und genau so funktioniert das mit Wut. Die gleiche Energie, die zerstören kann, kann auch erschaffen. Du wählst."',
        choices: [
          {
            id: 'v4-s2-c1',
            text: '"Wut als Energie zum Erschaffen? Das hat mir noch nie jemand gesagt."',
            consequence: 'Deine Einsicht öffnet sich für eine völlig neue Perspektive auf Wut.',
            nextSceneId: 'v4-s3',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'v4-s2-c2',
            text: '"Aber wenn ich wütend bin, will ich Dinge KAPUTTMACHEN, nicht aufbauen!"',
            consequence: 'Dein Einfühlungsvermögen für dich selbst zeigt ehrliche Selbstreflexion.',
            nextSceneId: 'v4-s3',
            points: { empathyPoints: 2, insightPoints: 1, couragePoints: 2 }
          },
          {
            id: 'v4-s2-c3',
            text: '"Zeig mir, wie das geht!"',
            consequence: 'Dein Mut treibt dich an, neue Dinge sofort auszuprobieren.',
            nextSceneId: 'v4-s3',
            points: { empathyPoints: 1, insightPoints: 1, couragePoints: 3 }
          }
        ]
      },
      {
        id: 'v4-s3',
        speaker: 'Zinnia',
        speakerEmoji: '🌺',
        text: 'Zinnia zeigt auf ein leeres Stück Vulkanboden. "Probier es aus. Denk an etwas, das dich richtig wütend macht." Du denkst nach – und spürst die Hitze in dir steigen. "Gut. Spürst du die Energie? Jetzt: Was willst du damit MACHEN? Nicht zerstören – stell dir vor, du drückst diese Kraft in den Boden, wie ein Samenkorn." Du konzentrierst dich – und aus dem schwarzen Boden sprießt ein winziger, leuchtender Trieb!',
        choices: [
          {
            id: 'v4-s3-c1',
            text: '"WHOA! Das hab ICH gemacht?!"',
            consequence: 'Dein Mut zeigt sich in deinem ehrlichen Staunen über die eigene Kraft.',
            nextSceneId: 'v4-s4',
            points: { empathyPoints: 1, insightPoints: 1, couragePoints: 3 }
          },
          {
            id: 'v4-s3-c2',
            text: '"Das ist... die gleiche Wut. Aber sie fühlt sich ganz anders an."',
            consequence: 'Deine Einsicht erkennt den feinen Unterschied in der Qualität der Emotion.',
            nextSceneId: 'v4-s4',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'v4-s3-c3',
            text: '"Kann man das mit allen Gefühlen machen?"',
            consequence: 'Deine Einsicht denkt weiter und fragt nach dem größeren Bild.',
            nextSceneId: 'v4-s4',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 0 }
          }
        ]
      },
      {
        id: 'v4-s4',
        speaker: 'Zinnia',
        speakerEmoji: '🌺',
        text: 'Zinnia strahlt. Dann wird sie plötzlich ernst und zeigt auf eine Ecke des Gartens, die du vorher nicht bemerkt hast. Verwelkte Blumen, vertrocknete Stängel, graue Erde. "Siehst du das? Das sind meine Fehler. Die Momente, wo ich meine Wut nicht genutzt, sondern verschluckt habe." Sie schüttelt die Blätter. "Verschluckte Wut vergiftet den Boden. Sie wird zu Bitterkeit. Und auf bitterem Boden wächst nichts."',
        choices: [
          {
            id: 'v4-s4-c1',
            text: '"Warte – DU warst auch mal wütend? Richtig wütend?"',
            consequence: 'Dein Einfühlungsvermögen entdeckt die gemeinsame Geschichte hinter der Weisheit.',
            nextSceneId: 'v4-s5',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 1 }
          },
          {
            id: 'v4-s4-c2',
            text: '"Also ist Wut runterschlucken genauso schlecht wie explodieren?"',
            consequence: 'Deine Einsicht erkennt die wichtige Balance zwischen Unterdrücken und Explodieren.',
            nextSceneId: 'v4-s5',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'v4-s4-c3',
            text: 'Die verwelkten Blumen vorsichtig berühren – sie tun dir leid',
            consequence: 'Dein Einfühlungsvermögen zeigt sich in deiner zärtlichen Geste gegenüber dem Verlorenen.',
            nextSceneId: 'v4-s5',
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'v4-s5',
        speaker: 'Zinnia',
        speakerEmoji: '🌺',
        text: 'Zinnia nickt. "Ich war wie Ash, damals. Voller Zorn. Aber dann hat mir jemand gezeigt, was ich dir zeige. Und langsam – ganz langsam – habe ich gelernt, die Feuerenergie umzuleiten." Sie sieht dich lange an. "Du hast dich verändert seit du hier bist, weißt du das? Am Anfang wärst du bei Magmus\' Labyrinth wahrscheinlich durchgedreht. Aber du hast durchgehalten."',
        choices: [
          {
            id: 'v4-s5-c1',
            text: '"Ich hab einfach gelernt, dass Wut nicht mein Feind ist."',
            consequence: 'Deine Einsicht hat die zentrale Lektion der Vulkaninsel verinnerlicht.',
            nextSceneId: 'v4-s6',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'v4-s5-c2',
            text: '"Na ja, ICH hätte das ohne Flamara, Ash und Magmus nicht geschafft."',
            consequence: 'Dein Einfühlungsvermögen erkennt den Wert jeder Begegnung auf deinem Weg.',
            nextSceneId: 'v4-s6',
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 1 }
          },
          {
            id: 'v4-s5-c3',
            text: '"Und was kommt jetzt? Ich bin bereit für mehr."',
            consequence: 'Dein Mut drängt nach vorne – bereit für jede neue Herausforderung.',
            nextSceneId: 'v4-s6',
            points: { empathyPoints: 0, insightPoints: 2, couragePoints: 3 }
          }
        ]
      },
      {
        id: 'v4-s6',
        speaker: 'Zinnia',
        speakerEmoji: '🌺',
        text: 'Zinnia wird still. Ihre Blüten zittern leicht. "Was jetzt kommt, ist... schwierig. Ich sage dir etwas, das du vielleicht nicht hören willst." Stille. "Flamara, Magmus, Ash und ich – wir streiten. Richtig. Und es wird hässlich." Ihr Blick ist sorgenvoll. "Jemand muss das klären. Und ich glaube..." Sie sieht dich an. "...das bist du." Der Vulkan grummelt, als würde er zustimmen.',
        choices: [
          {
            id: 'v4-s6-c1',
            text: '"Ihr streitet? Aber ihr seid doch ein Team!"',
            consequence: 'Dein Einfühlungsvermögen zeigt Sorge um die Gemeinschaft der Wächter.',
            nextSceneId: null,
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 1 }
          },
          {
            id: 'v4-s6-c2',
            text: '"Warum ich? Ich bin doch erst seit ein paar Tagen hier!"',
            consequence: 'Deine Einsicht hinterfragt, warum ausgerechnet du diese Rolle übernehmen sollst.',
            nextSceneId: null,
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'v4-s6-c3',
            text: '"Okay. Sag mir, worum es geht."',
            consequence: 'Dein Mut lässt dich die Herausforderung direkt annehmen.',
            nextSceneId: null,
            points: { empathyPoints: 1, insightPoints: 2, couragePoints: 3 }
          }
        ]
      }
    ]
  },
  {
    id: 'volcano-scenario-5',
    islandId: 'volcano' as IslandId,
    title: 'Der Streit der Wächter',
    description: 'Alle streiten, der Vulkan bebt, und du bist der Einzige, der das lösen kann',
    scenes: [
      {
        id: 'v5-s1',
        speaker: 'narrator',
        speakerEmoji: '📜',
        text: 'Du hörst sie schon von weitem. Flamara brüllt: "DU mit deiner ewigen Geduld! Während DU gewartet hast, wäre fast alles explodiert!" Magmus, untypisch laut: "Besser warten als blind drauflosrennen wie DU!" Ash steht am Rand und schreit: "Ihr seid BEIDE schuld!" Zinnia versucht zu schlichten, aber niemand hört ihr zu. Der Vulkan bebt so stark, dass Steine fallen. Das ist ernst.',
        choices: [
          {
            id: 'v5-s1-c1',
            text: '"HEY! ALLE MAL STOPP!" – laut und bestimmt',
            consequence: 'Dein Mut durchbricht das Chaos mit einer klaren Stimme.',
            nextSceneId: 'v5-s2',
            points: { empathyPoints: 0, insightPoints: 1, couragePoints: 3 }
          },
          {
            id: 'v5-s1-c2',
            text: 'Erst beobachten: Was ist passiert? Warum streiten sie?',
            consequence: 'Deine Einsicht lehrt dich, erst zu verstehen, bevor du handelst.',
            nextSceneId: 'v5-s2',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'v5-s1-c3',
            text: 'Zu Ash gehen – er sieht am aufgewühltesten aus',
            consequence: 'Dein Einfühlungsvermögen erkennt, wer am dringendsten Unterstützung braucht.',
            nextSceneId: 'v5-s2',
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'v5-s2',
        speaker: 'narrator',
        speakerEmoji: '📜',
        text: 'Stück für Stück bekommst du die Geschichte zusammen. Es gab eine Erdspalte, die sich gefährlich öffnete. Flamara wollte sofort handeln – Magmus wollte warten und beobachten. Flamara handelte, Magmus griff nicht ein. Die Spalte schloss sich, aber ein Teil von Zinnias Garten wurde zerstört. Jeder gibt dem anderen die Schuld. Flamara: "Er hätte mir helfen müssen!" Magmus: "Sie hätte nicht blindlings losrennen dürfen!" Zinnia leise: "Mein Garten..."',
        choices: [
          {
            id: 'v5-s2-c1',
            text: '"Flamara – du wolltest helfen. Magmus – du wolltest vorsichtig sein. Ihr hattet BEIDE recht."',
            consequence: 'Deine Einsicht findet die Wahrheit in beiden Perspektiven.',
            nextSceneId: 'v5-s3',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'v5-s2-c2',
            text: '"Wartet. Ich will JEDEN einzeln hören. Flamara zuerst."',
            consequence: 'Dein Einfühlungsvermögen gibt jedem die Chance, gehört zu werden.',
            nextSceneId: 'v5-s3',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'v5-s2-c3',
            text: '"Zinnia, wie geht es dir? Dein Garten..." – sich um die kümmern, die am meisten verletzt ist',
            consequence: 'Dein Einfühlungsvermögen kümmert sich zuerst um die, die am meisten verletzt sind.',
            nextSceneId: 'v5-s3',
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'v5-s3',
        speaker: 'narrator',
        speakerEmoji: '📜',
        text: 'Flamara mit verschränkten Armen: "Er denkt, mein Temperament ist das Problem!" Magmus, Arme vor der Brust: "Sie denkt, meine Geduld ist Schwäche." Ash platzt raus: "Und ICH finde, ihr seid beide Idioten!" Stille. Ash wird rot. "Sorry. Alte Gewohnheit." Er sieht dich an: "Was soll ich machen? Wie du es mir gezeigt hast?" Du erinnerst dich: Ash hat von dir gelernt.',
        choices: [
          {
            id: 'v5-s3-c1',
            text: '"Ash, atme erstmal. Und dann: Sag ihnen, was du WIRKLICH fühlst."',
            consequence: 'Dein Einfühlungsvermögen und deine Einsicht helfen Ash, das Gelernte anzuwenden.',
            nextSceneId: 'v5-s4',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'v5-s3-c2',
            text: '"Flamara, Magmus – Ash hat \'sorry\' gesagt. Könnt ihr das auch?"',
            consequence: 'Dein Mut fordert die Wächter heraus, ehrlich zu sich selbst zu sein.',
            nextSceneId: 'v5-s4',
            points: { empathyPoints: 1, insightPoints: 2, couragePoints: 3 }
          },
          {
            id: 'v5-s3-c3',
            text: '"Wisst ihr, was ICH sehe? Vier Leute, denen dieser Ort am Herzen liegt. Ihr streitet nicht, weil ihr euch hasst – sondern weil es euch wichtig ist."',
            consequence: 'Dein Einfühlungsvermögen und deine Einsicht enthüllen die wahre Ursache des Streits.',
            nextSceneId: 'v5-s4',
            points: { empathyPoints: 3, insightPoints: 3, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'v5-s4',
        speaker: 'narrator',
        speakerEmoji: '📜',
        text: 'Flamara und Magmus schauen sich an. Die Wut flackert noch. "Ich war nicht wütend auf dich," sagt Flamara plötzlich. Alle starren sie an. "Ich war... ich hatte ANGST. Als die Spalte sich öffnete, dachte ich, wir verlieren alles. Und als du nicht sofort reagiert hast, Magmus, dachte ich..." Ihre Stimme bricht. "...du hast aufgegeben." Magmus blinzelt. Langsam. "Ich hatte auch Angst. Deshalb habe ich gewartet. Angst und Warten sind bei mir dasselbe."',
        choices: [
          {
            id: 'v5-s4-c1',
            text: '"Seht ihr? Ihr hattet beide Angst! Die Wut war nur die Verpackung!"',
            consequence: 'Deine Einsicht durchschaut die Verpackung und findet die Angst darunter.',
            nextSceneId: 'v5-s5',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'v5-s4-c2',
            text: '"Flamara drückt Angst als Aktion aus. Magmus drückt Angst als Stillstand aus. Beides ist okay."',
            consequence: 'Deine Einsicht erkennt, dass jeder Angst anders ausdrückt – und beides ist gültig.',
            nextSceneId: 'v5-s5',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'v5-s4-c3',
            text: 'Leise zu Ash: "Siehst du? Auch die Großen haben Angst."',
            consequence: 'Dein Einfühlungsvermögen teilt diese wichtige Erkenntnis behutsam mit Ash.',
            nextSceneId: 'v5-s5',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'v5-s5',
        speaker: 'narrator',
        speakerEmoji: '📜',
        text: 'Magmus bewegt sich. Langsam, wie immer – aber er geht auf Flamara zu. "Dein Feuer ist keine Bedrohung. Es ist... Leidenschaft." Flamara schluckt. "Und deine Geduld ist keine Schwäche. Sie ist... Stärke." Sie sehen sich an. Zinnia flüstert: "Endlich!" Ash wischt sich verstohlen eine Träne ab und murmelt: "Bin nicht am Heulen. Ist der Rauch."',
        choices: [
          {
            id: 'v5-s5-c1',
            text: 'Ash ansehen und leise lächeln – ihr wisst beide, dass es kein Rauch ist',
            consequence: 'Dein Einfühlungsvermögen verbindet dich und Ash in einem stillen Moment der Wahrheit.',
            nextSceneId: 'v5-s6',
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 1 }
          },
          {
            id: 'v5-s5-c2',
            text: '"Und Zinnias Garten? Den bauen wir gemeinsam wieder auf."',
            consequence: 'Dein Einfühlungsvermögen denkt bereits an die nächste Aufgabe: Wiederaufbau.',
            nextSceneId: 'v5-s6',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'v5-s5-c3',
            text: 'Nichts sagen. Diesen Moment einfach wirken lassen.',
            consequence: 'Deine Einsicht weiß, dass manche Momente keine Worte brauchen.',
            nextSceneId: 'v5-s6',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'v5-s6',
        speaker: 'narrator',
        speakerEmoji: '📜',
        text: 'Sie schauen dich alle an. Flamara schüttelt ungläubig den Kopf. "Wie hast du das gemacht? Wir streiten seit TAGEN, und du kommst und..." Magmus: "Du hast zugehört." Pause. "Das tut fast niemand." Zinnia lächelt. "Du hast jeden von uns ernst genommen. Und du hast uns gezeigt, was unter der Wut steckt." Ash grinst: "Und das, obwohl du erst seit ein paar Tagen hier bist."',
        choices: [
          {
            id: 'v5-s6-c1',
            text: '"Ich hab von euch ALLEN gelernt. Flamara: Feuer spüren. Ash: Ehrlich sein. Magmus: Geduld haben. Zinnia: Umwandeln."',
            consequence: 'Deine Einsicht fasst zusammen, was jeder Wächter dich gelehrt hat.',
            nextSceneId: 'v5-s7',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'v5-s6-c2',
            text: '"Ich hab nichts Besonderes gemacht. Ich hab euch nur zugehört."',
            consequence: 'Dein Einfühlungsvermögen zeigt echte Bescheidenheit – Zuhören ist eine Superkraft.',
            nextSceneId: 'v5-s7',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 1 }
          },
          {
            id: 'v5-s6-c3',
            text: '"Nächstes Mal streitet euch nicht TAGELANG, bevor ihr redet, okay?"',
            consequence: 'Dein Mut spricht aus, was alle denken – mit einem Augenzwinkern.',
            nextSceneId: 'v5-s7',
            points: { empathyPoints: 1, insightPoints: 2, couragePoints: 3 }
          }
        ]
      },
      {
        id: 'v5-s7',
        speaker: 'narrator',
        speakerEmoji: '📜',
        text: 'Alle lachen. Der Vulkan beruhigt sich. Dann wird Flamara ernst. "Es gibt etwas, das du wissen musst. Der Vulkan... er reagiert auf UNS ALLE. Unsere Wut, unsere Angst, unsere Konflikte. Und gerade war er kurz davor..." Sie zögert. Magmus beendet den Satz: "...auszubrechen." Stille. Zinnia: "Und das wird er. Bald. Wenn wir nicht bereit sind." Alle Augen ruhen auf dir.',
        choices: [
          {
            id: 'v5-s7-c1',
            text: '"Dann müssen wir bereit sein. Zusammen."',
            consequence: 'Dein Mut inspiriert alle, gemeinsam für die Zukunft zu kämpfen.',
            nextSceneId: null,
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 3 }
          },
          {
            id: 'v5-s7-c2',
            text: 'Ein mulmiges Gefühl, aber auch Entschlossenheit. Du bist nicht mehr allein.',
            consequence: 'Deine Einsicht verbindet Angst mit Entschlossenheit – du bist nicht mehr allein.',
            nextSceneId: null,
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'v5-s7-c3',
            text: '"Was passiert, wenn der Vulkan ausbricht?"',
            consequence: 'Deine Einsicht stellt die entscheidende Frage, die alle beschäftigt.',
            nextSceneId: null,
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          }
        ]
      }
    ]
  },
  {
    id: 'volcano-scenario-6',
    islandId: 'volcano' as IslandId,
    title: 'Der große Ausbruch',
    description: 'Der Vulkan bricht aus – und nur alles, was du gelernt hast, kann die Insel retten',
    scenes: [
      {
        id: 'v6-s1',
        speaker: 'narrator',
        speakerEmoji: '📜',
        text: 'Es ist mitten in der Nacht, als der Boden so heftig bebt, dass du aus dem Schlaf gerissen wirst. Der Vulkan GLÜHT. Rot, orange, weiß. Flamara steht vor dir, und zum ersten Mal sieht sie aus, als hätte sie Angst. "Es ist soweit. Der Vulkan bricht aus. Und diesmal meine ich nicht den in deinem Kopf – den ECHTEN." Lava strömt bereits den Berg hinunter. "Alles, was du gelernt hast, wird jetzt gebraucht."',
        choices: [
          {
            id: 'v6-s1-c1',
            text: 'Tief atmen. Die Angst spüren. Aber nicht weglaufen. "Was muss ich tun?"',
            consequence: 'Dein Mut lässt dich die Angst spüren, ohne vor ihr wegzulaufen.',
            nextSceneId: 'v6-s2',
            points: { empathyPoints: 1, insightPoints: 2, couragePoints: 3 }
          },
          {
            id: 'v6-s1-c2',
            text: '"Wo sind die anderen? Wir schaffen das nur zusammen!"',
            consequence: 'Dein Einfühlungsvermögen denkt sofort an die anderen – Zusammenhalt ist Stärke.',
            nextSceneId: 'v6-s2',
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 2 }
          },
          {
            id: 'v6-s1-c3',
            text: 'Kurz die Augen schließen. Flamaras Lektion: Wut und Angst sind Boten, keine Feinde.',
            consequence: 'Deine Einsicht erinnert dich an die wichtigste Lektion: Gefühle sind Boten.',
            nextSceneId: 'v6-s2',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'v6-s2',
        speaker: 'narrator',
        speakerEmoji: '📜',
        text: 'Ihr rennt durch die Nacht. Ash kommt euch entgegen – seine Augen sind weit aufgerissen. "Die Lava! Sie kommt auf Zinnias Garten zu! Und Magmus – er steht einfach DA und RÜHRT SICH NICHT!" Du siehst es: Magmus steht mitten im Lavastrom, reglos. Ash schreit: "ER GIBT AUF! Warum tut er NICHTS?!" Ashs alte Wut flammt auf – seine Fäuste ballen sich.',
        choices: [
          {
            id: 'v6-s2-c1',
            text: '"Ash, erinnerst du dich? Wut ist manchmal Angst. Magmus hat Angst. Wie DU damals."',
            consequence: 'Dein Einfühlungsvermögen hilft Ash, seine eigene Angst zu erkennen.',
            nextSceneId: 'v6-s3',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 1 }
          },
          {
            id: 'v6-s2-c2',
            text: '"Ash! Atmen! Jetzt! Wir brauchen dich klar, nicht wütend!"',
            consequence: 'Dein Mut greift in der Krise durch und gibt klare Anweisungen.',
            nextSceneId: 'v6-s3',
            points: { empathyPoints: 1, insightPoints: 2, couragePoints: 3 }
          },
          {
            id: 'v6-s2-c3',
            text: '"Er gibt nicht auf – er ist eingefroren vor Angst. Wir müssen zu ihm."',
            consequence: 'Deine Einsicht erkennt sofort, was wirklich mit Magmus passiert.',
            nextSceneId: 'v6-s3',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'v6-s3',
        speaker: 'narrator',
        speakerEmoji: '📜',
        text: 'Ash schließt die Augen. Atmet. Öffnet sie wieder. "Okay. Ich bin klar." Ein winziges Lächeln: "Danke." Zusammen lauft ihr zu Magmus. Die Lava umspült ihn bereits, aber sein Steinleib hält stand. Flamara ruft: "MAGMUS! Wir brauchen dich!" Nichts. Er ist wie versteinert – buchstäblich und im übertragenen Sinn. Zinnia erscheint neben euch: "Er hat Angst, etwas falsch zu machen. Wie beim letzten Mal."',
        choices: [
          {
            id: 'v6-s3-c1',
            text: '"Magmus! Du musst nicht perfekt sein! Du musst nur DA sein!"',
            consequence: 'Dein Mut ruft Magmus die wichtigste Wahrheit zu: Präsenz zählt mehr als Perfektion.',
            nextSceneId: 'v6-s4',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 3 }
          },
          {
            id: 'v6-s3-c2',
            text: '"Magmus, du hast MIR beigebracht, dass Hilfe holen keine Schwäche ist. Lass UNS DIR helfen!"',
            consequence: 'Dein Einfühlungsvermögen dreht Magmus\' eigene Weisheit um und gibt sie ihm zurück.',
            nextSceneId: 'v6-s4',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'v6-s3-c3',
            text: 'Durch die Lava waten und Magmus\' steinerne Hand nehmen, egal wie heiß es ist',
            consequence: 'Dein Mut überwindet die Hitze – du reichst Magmus die Hand, egal was kommt.',
            nextSceneId: 'v6-s4',
            points: { empathyPoints: 2, insightPoints: 0, couragePoints: 3 }
          }
        ]
      },
      {
        id: 'v6-s4',
        speaker: 'narrator',
        speakerEmoji: '📜',
        text: 'Magmus bewegt sich. Langsam. Dann schneller. "Du hast... recht." Seine Stimme bebt. "Danke." Er steht auf – und plötzlich wird klar, wie RIESIG er ist. Er stellt sich vor den Lavastrom und lenkt ihn mit seinem Körper um. Flamara schießt Feuerstöße in die Luft, um die Druckwellen umzuleiten. Ash schleppt Steine. Zinnia breitet ihre Wurzeln aus, um den Boden zu festigen. Aber die Lava kommt immer schneller. Flamara dreht sich zu dir: "Du musst zum Krater! Der Vulkan... er ist WÜTEND. Wie ein Lebewesen. Und du bist der Einzige, der ihn beruhigen kann."',
        choices: [
          {
            id: 'v6-s4-c1',
            text: '"Den Vulkan BERUHIGEN? Wie beruhigt man einen VULKAN?!"',
            consequence: 'Deine Einsicht stellt die richtige Frage – Verstehen kommt vor dem Handeln.',
            nextSceneId: 'v6-s5',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'v6-s4-c2',
            text: '"Genauso, wie ich Ash beruhigt habe. Und euch alle. Zuhören."',
            consequence: 'Deine Einsicht verbindet alles Gelernte zu einer klaren Erkenntnis.',
            nextSceneId: 'v6-s5',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'v6-s4-c3',
            text: 'Ohne zu zögern losrennen – Richtung Krater',
            consequence: 'Dein Mut kennt kein Zögern – du handelst, wenn es darauf ankommt.',
            nextSceneId: 'v6-s5',
            points: { empathyPoints: 0, insightPoints: 1, couragePoints: 3 }
          }
        ]
      },
      {
        id: 'v6-s5',
        speaker: 'narrator',
        speakerEmoji: '📜',
        text: 'Du stehst am Kraterrand. Die Hitze ist unerträglich. Unter dir kocht das Magma wie ein wütendes Meer. Und dann SPÜRST du es – der Vulkan hat Gefühle. Uralte, tiefe, brodelnde Wut. Seit Jahrtausenden aufgestaut. Niemand hat je zugehört. Du schließt die Augen. Alles, was du gelernt hast, sammelt sich in dir: Flamaras Feuer verstehen. Ashs Schutzschild durchschauen. Magmus\' Geduld. Zinnias Verwandlung.',
        choices: [
          {
            id: 'v6-s5-c1',
            text: '"Ich höre dich. Du bist wütend. Du bist seit so langer Zeit wütend. Und niemand hat hingehört."',
            consequence: 'Dein Einfühlungsvermögen gibt dem Vulkan das, was er seit Jahrtausenden vermisst hat: Gehör.',
            nextSceneId: 'v6-s6',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'v6-s5-c2',
            text: '"Deine Wut ist berechtigt. Aber du musst nicht alles zerstören, um gehört zu werden."',
            consequence: 'Deine Einsicht findet die richtigen Worte für eine uralte Wut.',
            nextSceneId: 'v6-s6',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'v6-s5-c3',
            text: 'Nicht sprechen. Einfach FÜHLEN. Die Wut des Vulkans anerkennen. Da sein.',
            consequence: 'Dein Mut und dein Einfühlungsvermögen brauchen keine Worte – Präsenz ist genug.',
            nextSceneId: 'v6-s6',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 3 }
          }
        ]
      },
      {
        id: 'v6-s6',
        speaker: 'narrator',
        speakerEmoji: '📜',
        text: 'Der Vulkan... hört auf. Nicht sofort – langsam. Das Magma beruhigt sich. Die Erde hört auf zu beben. Der Krater dampft noch, aber das Feuer wird zu warmem Glühen. Du spürst es: Der Vulkan ist nicht weniger wütend. Er ist... VERSTANDEN. Zum ersten Mal seit Tausenden von Jahren. Und das reicht. Du sinkst auf die Knie, völlig erschöpft aber mit einem Gefühl, das du nicht beschreiben kannst.',
        choices: [
          {
            id: 'v6-s6-c1',
            text: 'Tränen laufen dir über die Wangen. Nicht aus Trauer – aus Erleichterung.',
            consequence: 'Dein Einfühlungsvermögen lässt die Tränen fließen – Erleichterung ist auch ein Gefühl.',
            nextSceneId: 'v6-s7',
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 2 }
          },
          {
            id: 'v6-s6-c2',
            text: '"Ich hab\'s geschafft..." Ungläubig flüstern.',
            consequence: 'Dein Mut hat das Unmögliche möglich gemacht.',
            nextSceneId: 'v6-s7',
            points: { empathyPoints: 1, insightPoints: 2, couragePoints: 3 }
          },
          {
            id: 'v6-s6-c3',
            text: 'Dem Vulkan leise danken – für die Lektion, für das Vertrauen',
            consequence: 'Dein Einfühlungsvermögen und deine Einsicht ehren die Verbindung mit dem Vulkan.',
            nextSceneId: 'v6-s7',
            points: { empathyPoints: 3, insightPoints: 3, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'v6-s7',
        speaker: 'Flamara',
        speakerEmoji: '🔥',
        text: 'Als du den Krater hinuntersteigst, stehen sie alle da. Flamara, Ash, Magmus, Zinnia. Flamara hat Tränen in den Augen – flüssige Lava, die golden leuchtet. "Du bist nicht mehr die Person, die hier angekommen ist." Ash grinst und boxt dir leicht gegen die Schulter: "Nicht schlecht. Für einen Neuling." Magmus legt dir seine schwere Hand auf den Kopf. "Gut." Pause. "Sehr gut." Zinnia lässt eine Blume aus dem Boden sprießen – direkt neben deinem Fuß. Hinter euch liegt die Insel im ersten Licht der Morgensonne. Dort, wo die Lava geflossen ist, glitzert neues, fruchtbares Land. Flamara lächelt. "Die nächste Insel wartet auf dich. Aber vergiss nie, was du hier gelernt hast: Wut ist eine Sprache. Und du sprichst sie jetzt fließend."',
        choices: [
          {
            id: 'v6-s7-c1',
            text: '"Ich werde euch nie vergessen. Jeden Einzelnen von euch."',
            consequence: 'Dein Einfühlungsvermögen hat tiefe Verbindungen geschaffen, die bleiben werden.',
            nextSceneId: null,
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 2 }
          },
          {
            id: 'v6-s7-c2',
            text: '"Ash – pass auf die anderen auf, ja?" Ash rollt die Augen, aber lächelt.',
            consequence: 'Dein Einfühlungsvermögen vertraut Ash die Verantwortung an – und er nimmt sie an.',
            nextSceneId: null,
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'v6-s7-c3',
            text: 'Einmal zurückschauen. Dann vorwärts. Die nächste Insel wartet.',
            consequence: 'Dein Mut und deine Einsicht tragen dich vorwärts – bereit für neue Abenteuer.',
            nextSceneId: null,
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 3 }
          }
        ]
      }
    ]
  }
];

// Activities
export const volcanoActivities: VolcanoActivity[] = [
  {
    id: 'volcano-breathing',
    islandId: 'volcano' as IslandId,
    title: 'Vulkan-Atmung',
    description: 'Eine Atemtechnik, die hilft, die innere Hitze zu kontrollieren',
    type: 'breathing',
    duration: 5,
    completed: false,
    instructions: [
      'Setze oder stelle dich bequem hin. Schließe die Augen.',
      'Stelle dir vor, du bist ein Vulkan. In deinem Bauch glüht die Lava deiner Wut.',
      'Atme tief durch die Nase ein (4 Sekunden). Spüre, wie die Lava ansteigt.',
      'Halte den Atem an (4 Sekunden). Die Lava wartet am Kraterrand.',
      'Atme langsam durch den Mund aus (6 Sekunden), als würdest du Rauch ablassen.',
      'Spüre, wie mit jedem Ausatmen die Lava ein bisschen abkühlt.',
      'Wiederhole das 5-10 Mal, bis du dich ruhiger fühlst.',
      'Deine Wut ist noch da, aber sie kontrolliert dich nicht mehr.'
    ]
  },
  {
    id: 'volcano-journal',
    islandId: 'volcano' as IslandId,
    title: 'Wut-Tagebuch',
    description: 'Schreibe deine Wut auf und verstehe sie besser',
    type: 'journal',
    duration: 10,
    completed: false,
    instructions: [
      'Nimm ein Notizbuch oder öffne eine Notiz-App.',
      'Schreibe oben: "Meine Wut vom [heutiges Datum]"',
      'Beantworte diese Fragen: Was hat mich heute wütend gemacht?',
      'Wie hat sich die Wut in meinem Körper angefühlt?',
      'Was wollte mir die Wut sagen? (z.B. "Das war unfair!" oder "Meine Grenze wurde überschritten!")',
      'Wie habe ich reagiert? Bin ich stolz auf meine Reaktion?',
      'Was könnte ich beim nächsten Mal anders machen?',
      'Schließe ab mit: "Meine Wut ist ein Teil von mir, und das ist okay."'
    ]
  },
  {
    id: 'volcano-art',
    islandId: 'volcano' as IslandId,
    title: 'Emotions-Vulkan',
    description: 'Male oder zeichne deinen inneren Vulkan',
    type: 'creative',
    duration: 15,
    completed: false,
    instructions: [
      'Nimm Papier und Stifte (am besten Rot, Orange, Gelb, aber auch Blau und Grün).',
      'Zeichne in die Mitte einen großen Vulkan – das bist du.',
      'Male die Lava in den Farben, die deine Wut für dich hat.',
      'Füge Symbole hinzu: Was macht dich wütend? (zeichne kleine Bilder drumherum)',
      'Jetzt male Dinge, die dir helfen, ruhig zu bleiben (Wasser, Bäume, Freunde).',
      'Schreibe Wörter auf den Vulkan, die beschreiben, wie du mit Wut umgehen willst.',
      'Hänge das Bild auf oder fotografiere es. Es ist dein Wut-Management-Plan.',
      'Jedes Mal, wenn du wütend bist, erinnere dich an dieses Bild.'
    ]
  },
  {
    id: 'volcano-meditation',
    islandId: 'volcano' as IslandId,
    title: 'Kühlende Lava',
    description: 'Eine geführte Meditation zur Beruhigung intensiver Emotionen',
    type: 'meditation',
    duration: 8,
    completed: false,
    instructions: [
      'Finde einen ruhigen Ort. Setze dich bequem hin oder lege dich hin.',
      'Schließe die Augen und atme ruhig.',
      'Stelle dir vor, du bist flüssige, heiße Lava. Du bist mächtig und glühend.',
      'Mit jedem Atemzug kühlst du ein bisschen ab. Du wirst langsamer, dichter.',
      'Du bist immer noch heiß, aber nicht mehr kochend. Du wirst zu festem Gestein.',
      'Spüre die Stärke des Gesteins. Du bist nicht mehr wild, sondern beständig.',
      'Du bist ein Berg. Stark. Geerdet. Ruhig. Emotionen fließen durch dich, aber du bleibst.',
      'Atme noch dreimal tief. Öffne die Augen. Nimm diese Ruhe mit in den Tag.'
    ]
  },
  {
    id: 'volcano-triggers',
    islandId: 'volcano' as IslandId,
    title: 'Wut-Auslöser Detektiv',
    description: 'Erkenne, was deine Wut auslöst und bereite dich vor',
    type: 'reflection',
    duration: 12,
    completed: false,
    instructions: [
      'Nimm Papier und teile es in drei Spalten: "Auslöser", "Reaktion", "Alternative"',
      'Denke an die letzten Male, wo du richtig wütend warst.',
      'Schreibe in "Auslöser": Was war der Grund? (z.B. "Bruder nimmt meine Sachen")',
      'Schreibe in "Reaktion": Wie hast du reagiert? (z.B. "Ich habe geschrien")',
      'Schreibe in "Alternative": Was könntest du stattdessen tun? (z.B. "Ruhig sagen: Frag mich erst")',
      'Suche nach Mustern: Gibt es Auslöser, die immer wiederkommen?',
      'Wähle die 3 häufigsten Auslöser und überlege dir für jeden einen konkreten Plan.',
      'Übe in Gedanken, wie du beim nächsten Mal anders reagierst.'
    ]
  }
];

// Wisdom Cards
export const volcanoWisdomCards: WisdomCard[] = [
  {
    id: 'volcano-wisdom-1',
    islandId: 'volcano' as IslandId,
    title: 'Die Natur der Wut',
    content: 'Wut ist nicht dein Feind. Sie ist ein Bote, der dir zeigt, dass eine Grenze überschritten wurde oder etwas Wichtiges in Gefahr ist.',
    category: 'wisdom',
    collected: false
  },
  {
    id: 'volcano-wisdom-2',
    islandId: 'volcano' as IslandId,
    title: 'Der Unterschied',
    content: 'Du bist nicht deine Wut. Du HAST Wut, aber du BIST der Berg, der sie enthält. Emotionen kommen und gehen, aber du bleibst.',
    category: 'wisdom',
    collected: false
  },
  {
    id: 'volcano-wisdom-3',
    islandId: 'volcano' as IslandId,
    title: 'Die Warnzeichen',
    content: 'Dein Körper warnt dich, bevor die Wut explodiert: schneller Herzschlag, geballte Fäuste, Hitze im Gesicht. Lerne, diese Zeichen zu erkennen.',
    category: 'wisdom',
    collected: false
  },
  {
    id: 'volcano-wisdom-4',
    islandId: 'volcano' as IslandId,
    title: 'Die Pause',
    content: 'Zwischen Auslöser und Reaktion liegt ein Raum. In diesem Raum liegt deine Kraft zu wählen. Atme. Zähle. Geh. Nutze die Pause.',
    category: 'wisdom',
    collected: false
  },
  {
    id: 'volcano-wisdom-5',
    islandId: 'volcano' as IslandId,
    title: 'Flamaras Weisheit',
    content: 'Kontrolliere das Feuer, lösche es nicht. Eine Welt ohne Wut wäre eine Welt ohne Gerechtigkeit, ohne Schutz, ohne Veränderung.',
    category: 'wisdom',
    collected: false
  },
  {
    id: 'volcano-wisdom-6',
    islandId: 'volcano' as IslandId,
    title: 'Magmus\' Geduld',
    content: 'Warten ist keine Schwäche. Die heißeste Lava wird zum stärksten Gestein, wenn sie Zeit bekommt abzukühlen. Gib dir diese Zeit.',
    category: 'wisdom',
    collected: false
  },
  {
    id: 'volcano-wisdom-7',
    islandId: 'volcano' as IslandId,
    title: 'Zinnias Balance',
    content: 'Die gleiche Energie, die zerstören kann, kann auch etwas Wunderschönes erschaffen. Wut ist Treibstoff – du wählst die Richtung.',
    category: 'wisdom',
    collected: false
  },
  {
    id: 'volcano-wisdom-8',
    islandId: 'volcano' as IslandId,
    title: 'Die Kraft des Kanals',
    content: 'Wut braucht einen Weg hinaus: Worte, Bewegung, Kunst. Finde deinen Kanal und nutze ihn, bevor die Wut dich überwältigt.',
    category: 'wisdom',
    collected: false
  },
  {
    id: 'volcano-wisdom-9',
    islandId: 'volcano' as IslandId,
    title: 'Die Botschaft verstehen',
    content: 'Frage deine Wut: "Was willst du mir sagen?" Oft zeigt sie dir, was dir wichtig ist. Höre zu, dann entscheide, wie du handelst.',
    category: 'wisdom',
    collected: false
  },
  {
    id: 'volcano-wisdom-10',
    islandId: 'volcano' as IslandId,
    title: 'Ashs Lektion',
    content: 'Wut ist oft ein Schutzschild. Darunter verstecken sich Traurigkeit, Angst oder Einsamkeit. Wer das versteht, versteht sich selbst.',
    category: 'wisdom',
    collected: false
  },
  {
    id: 'volcano-wisdom-11',
    islandId: 'volcano' as IslandId,
    title: 'Die Vulkan-Atmung',
    content: 'Einatmen (Lava steigt), Halten (Lava wartet), Ausatmen (Rauch entweicht). Mit jedem Atemzug wird die Glut kühler und kontrollierbarer.',
    category: 'wisdom',
    collected: false
  },
  {
    id: 'volcano-wisdom-12',
    islandId: 'volcano' as IslandId,
    title: 'Nach dem Ausbruch',
    content: 'Wenn du explodiert bist: Entschuldige dich, lerne daraus, mache weiter. Ein Ausbruch definiert dich nicht. Deine nächste Wahl tut es.',
    category: 'wisdom',
    collected: false
  },
  {
    id: 'volcano-wisdom-13',
    islandId: 'volcano' as IslandId,
    title: 'Die transformierte Wut',
    content: 'Aus erkalteter Lava wächst fruchtbarer Boden. Aus verstandener Wut wächst Weisheit, Mut und die Kraft, für dich einzustehen.',
    category: 'wisdom',
    collected: false
  },
  {
    id: 'volcano-wisdom-14',
    islandId: 'volcano' as IslandId,
    title: 'Die Auslöser kennen',
    content: 'Werde ein Detektiv deiner Wut. Je besser du weißt, was dich triggert, desto besser kannst du dich vorbereiten und anders reagieren.',
    category: 'wisdom',
    collected: false
  },
  {
    id: 'volcano-wisdom-15',
    islandId: 'volcano' as IslandId,
    title: 'Gemeinsam stärker',
    content: 'Du musst nicht allein mit deiner Wut kämpfen. Sprich mit Menschen, denen du vertraust. Gemeinsam findet ihr Wege, die du allein nicht siehst.',
    category: 'wisdom',
    collected: false
  },
  {
    id: 'volcano-wisdom-16',
    islandId: 'volcano' as IslandId,
    title: 'Das innere Feuer',
    content: 'Dein inneres Feuer ist ein Geschenk. Es wärmt dich, es schützt dich, es zeigt deine Leidenschaft. Respektiere es, und es wird dich leuchten lassen.',
    category: 'wisdom',
    collected: false
  }
];
