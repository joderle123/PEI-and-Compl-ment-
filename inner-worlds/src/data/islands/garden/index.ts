// @ts-nocheck
import type { Scenario, WisdomCard, Activity, IslandId } from '../../../types';

interface GardenActivity extends Activity {
  instructions: string[];
}

interface GardenNPC {
  id: string;
  name: string;
  emoji: string;
  description: string;
  backstory: string;
}

export const gardenNPCs: GardenNPC[] = [
  {
    id: 'flora',
    name: 'Flora',
    emoji: '👩‍🌾',
    description: 'Die weise Gärtnerin',
    backstory: 'Flora pflegt den Garten seit vielen Jahren und versteht die Bedürfnisse jeder Pflanze. Sie weiß, dass Zusammenleben Geduld, Verständnis und klare Grenzen braucht.'
  },
  {
    id: 'bluete',
    name: 'Blüte',
    emoji: '🌻',
    description: 'Die schüchterne Sonnenblume',
    backstory: 'Blüte möchte allen gefallen und hat Schwierigkeiten, Nein zu sagen. Sie lernt gerade, dass wahre Freundschaft bedeutet, ehrlich zu sein und auf eigene Bedürfnisse zu achten.'
  },
  {
    id: 'dornis',
    name: 'Dornis',
    emoji: '🌵',
    description: 'Der abwehrende Kaktus',
    backstory: 'Dornis wurde oft verletzt und schützt sich mit Stacheln. Hinter seiner rauen Schale verbirgt sich ein weiches Herz, das Freundschaft sucht, aber Angst vor Nähe hat.'
  },
  {
    id: 'wurzel',
    name: 'Wurzel',
    emoji: '🌱',
    description: 'Der neue Setzling',
    backstory: 'Wurzel ist neu im Garten und sucht Anschluss. Als Neuling kennt er noch nicht alle Regeln und braucht Freunde, die ihm helfen, sich einzuleben.'
  }
];

export const gardenScenarios: Scenario[] = [
  {
    id: 'garden-scenario-1',
    islandId: 'garden' as IslandId,
    title: 'Der Streit um den Sonnplatz',
    description: 'Blüte und Dornis streiten sich um den besten Platz im Garten.',
    scenes: [
      {
        id: 'g1-s1',
        text: 'Blüte und Dornis streiten laut um den sonnigsten Platz im Garten. Beide behaupten, sie hätten mehr Recht darauf. Du siehst, wie die Situation eskaliert.',
        choices: [
          {
            id: 'g1-s1-c1',
            text: 'Ich gehe dazwischen und schlage vor, dass sie sich den Platz teilen.',
            nextSceneId: 'g1-s2',
            points: 2
          },
          {
            id: 'g1-s1-c2',
            text: 'Ich unterstütze Blüte, weil sie schüchterner ist.',
            nextSceneId: 'g1-s2',
            points: 1
          },
          {
            id: 'g1-s1-c3',
            text: 'Ich sage nichts und schaue nur zu.',
            nextSceneId: 'g1-s2',
            points: 0
          }
        ]
      },
      {
        id: 'g1-s2',
        text: 'Flora kommt hinzu und erklärt, dass beide gute Gründe haben. Sie fragt euch, ob ihr verstehen könnt, warum der jeweils andere den Platz möchte.',
        choices: [
          {
            id: 'g1-s2-c1',
            text: 'Ich helfe beiden, ihre Perspektive zu erklären.',
            nextSceneId: 'g1-s3',
            points: 3
          },
          {
            id: 'g1-s2-c2',
            text: 'Ich erkläre nur Blütes Sichtweise.',
            nextSceneId: 'g1-s3',
            points: 1
          },
          {
            id: 'g1-s2-c3',
            text: 'Ich sage, dass der Streit unnötig ist.',
            nextSceneId: 'g1-s3',
            points: 0
          }
        ]
      },
      {
        id: 'g1-s3',
        text: 'Dornis gibt zu, dass er sich einsam fühlt und gehofft hatte, am Sonnplatz mehr Aufmerksamkeit zu bekommen. Blüte ist überrascht von dieser Offenheit.',
        choices: [
          {
            id: 'g1-s3-c1',
            text: 'Ich schlage vor, dass wir alle zusammen am Sonnplatz Zeit verbringen.',
            nextSceneId: 'g1-s4',
            points: 3
          },
          {
            id: 'g1-s3-c2',
            text: 'Ich sage Dornis, dass ich seine Einsamkeit verstehe.',
            nextSceneId: 'g1-s4',
            points: 2
          },
          {
            id: 'g1-s3-c3',
            text: 'Ich finde, dass Dornis zu empfindlich ist.',
            nextSceneId: 'g1-s4',
            points: 0
          }
        ]
      },
      {
        id: 'g1-s4',
        text: 'Blüte entschuldigt sich dafür, nicht nach Dornis Gefühlen gefragt zu haben. Sie hätte nur an ihren eigenen Wunsch nach Sonne gedacht.',
        choices: [
          {
            id: 'g1-s4-c1',
            text: 'Ich lobe Blüte für ihre ehrliche Entschuldigung.',
            nextSceneId: 'g1-s5',
            points: 2
          },
          {
            id: 'g1-s4-c2',
            text: 'Ich sage, dass beide Fehler gemacht haben.',
            nextSceneId: 'g1-s5',
            points: 1
          },
          {
            id: 'g1-s4-c3',
            text: 'Ich sage nichts dazu.',
            nextSceneId: 'g1-s5',
            points: 0
          }
        ]
      },
      {
        id: 'g1-s5',
        text: 'Dornis schlägt vor, einen Zeitplan zu machen, damit alle mal am Sonnplatz sein können. Er möchte auch lernen, seine Bedürfnisse freundlicher auszudrücken.',
        choices: [
          {
            id: 'g1-s5-c1',
            text: 'Ich helfe dabei, einen fairen Plan zu erstellen.',
            nextSceneId: 'g1-s6',
            points: 3
          },
          {
            id: 'g1-s5-c2',
            text: 'Ich finde die Idee gut, mache aber selbst nichts.',
            nextSceneId: 'g1-s6',
            points: 1
          },
          {
            id: 'g1-s5-c3',
            text: 'Ich denke, das ist zu kompliziert.',
            nextSceneId: 'g1-s6',
            points: 0
          }
        ]
      },
      {
        id: 'g1-s6',
        text: 'Flora bedankt sich bei dir für deine Hilfe. Der Konflikt hat allen gezeigt, wie wichtig es ist, einander zuzuhören und Kompromisse zu finden.',
        choices: [
          {
            id: 'g1-s6-c1',
            text: 'Ich freue mich, dass ich helfen konnte und alle etwas gelernt haben.',
            nextSceneId: null,
            points: 2
          },
          {
            id: 'g1-s6-c2',
            text: 'Ich hoffe, dass sie sich nicht mehr streiten.',
            nextSceneId: null,
            points: 1
          },
          {
            id: 'g1-s6-c3',
            text: 'Ich bin froh, dass es vorbei ist.',
            nextSceneId: null,
            points: 0
          }
        ]
      }
    ],
    completed: false
  },
  {
    id: 'garden-scenario-2',
    islandId: 'garden' as IslandId,
    title: 'Grenzen setzen lernen',
    description: 'Blüte muss lernen, Nein zu sagen, ohne sich schuldig zu fühlen.',
    scenes: [
      {
        id: 'g2-s1',
        text: 'Blüte sieht erschöpft aus. Sie hat allen Pflanzen geholfen, ihre Blätter zu ordnen, obwohl sie selbst dringend Wasser brauchte. Flora fragt dich um Rat.',
        choices: [
          {
            id: 'g2-s1-c1',
            text: 'Ich spreche mit Blüte über die Wichtigkeit, auf sich selbst zu achten.',
            nextSceneId: 'g2-s2',
            points: 3
          },
          {
            id: 'g2-s1-c2',
            text: 'Ich bringe Blüte Wasser und sage, sie soll pausieren.',
            nextSceneId: 'g2-s2',
            points: 2
          },
          {
            id: 'g2-s1-c3',
            text: 'Ich finde, Blüte ist selbst schuld, wenn sie nicht Nein sagt.',
            nextSceneId: 'g2-s2',
            points: 0
          }
        ]
      },
      {
        id: 'g2-s2',
        text: 'Blüte gesteht, dass sie Angst hat, andere zu enttäuschen. Sie glaubt, nur geliebt zu werden, wenn sie immer hilfsbereit ist.',
        choices: [
          {
            id: 'g2-s2-c1',
            text: 'Ich erkläre, dass wahre Freunde ihre Grenzen respektieren werden.',
            nextSceneId: 'g2-s3',
            points: 3
          },
          {
            id: 'g2-s2-c2',
            text: 'Ich sage, dass ich sie auch mag, wenn sie mal Nein sagt.',
            nextSceneId: 'g2-s3',
            points: 2
          },
          {
            id: 'g2-s2-c3',
            text: 'Ich verstehe ihre Sorge, sage aber nichts weiter.',
            nextSceneId: 'g2-s3',
            points: 1
          }
        ]
      },
      {
        id: 'g2-s3',
        text: 'Flora schlägt vor, dass Blüte übt, Nein zu sagen. Du sollst eine kleine Bitte stellen, die Blüte ablehnen kann, um es zu trainieren.',
        choices: [
          {
            id: 'g2-s3-c1',
            text: 'Ich stelle eine Bitte und ermutige Blüte, ehrlich zu antworten.',
            nextSceneId: 'g2-s4',
            points: 3
          },
          {
            id: 'g2-s3-c2',
            text: 'Ich stelle eine sehr leichte Bitte, damit es nicht schwer ist.',
            nextSceneId: 'g2-s4',
            points: 1
          },
          {
            id: 'g2-s3-c3',
            text: 'Ich stelle gar keine Bitte, das ist mir unangenehm.',
            nextSceneId: 'g2-s4',
            points: 0
          }
        ]
      },
      {
        id: 'g2-s4',
        text: 'Blüte sagt zum ersten Mal Nein und ist überrascht, dass du nicht böse bist. Sie fühlt sich erleichtert und ein bisschen stolz.',
        choices: [
          {
            id: 'g2-s4-c1',
            text: 'Ich lobe sie und erkläre, dass Grenzen gesund sind.',
            nextSceneId: 'g2-s5',
            points: 3
          },
          {
            id: 'g2-s4-c2',
            text: 'Ich sage, dass ich ihr Nein akzeptiere.',
            nextSceneId: 'g2-s5',
            points: 2
          },
          {
            id: 'g2-s4-c3',
            text: 'Ich nicke nur.',
            nextSceneId: 'g2-s5',
            points: 1
          }
        ]
      },
      {
        id: 'g2-s5',
        text: 'Dornis kommt vorbei und bittet Blüte um einen großen Gefallen. Das ist Blütes erste echte Chance, ihre neue Fähigkeit anzuwenden.',
        choices: [
          {
            id: 'g2-s5-c1',
            text: 'Ich ermutige Blüte, ehrlich zu prüfen, ob sie kann und will.',
            nextSceneId: 'g2-s6',
            points: 3
          },
          {
            id: 'g2-s5-c2',
            text: 'Ich schlage vor, dass ich stattdessen helfe.',
            nextSceneId: 'g2-s6',
            points: 1
          },
          {
            id: 'g2-s5-c3',
            text: 'Ich mische mich nicht ein.',
            nextSceneId: 'g2-s6',
            points: 0
          }
        ]
      },
      {
        id: 'g2-s6',
        text: 'Blüte erklärt Dornis freundlich, dass sie heute für sich sorgen muss. Dornis versteht es und fragt jemand anderen. Blüte strahlt vor Stolz.',
        choices: [
          {
            id: 'g2-s6-c1',
            text: 'Ich feiere ihren Erfolg und spreche über die Wichtigkeit von Selbstfürsorge.',
            nextSceneId: null,
            points: 3
          },
          {
            id: 'g2-s6-c2',
            text: 'Ich freue mich mit ihr.',
            nextSceneId: null,
            points: 2
          },
          {
            id: 'g2-s6-c3',
            text: 'Ich sage, dass es gut gelaufen ist.',
            nextSceneId: null,
            points: 1
          }
        ]
      }
    ],
    completed: false
  },
  {
    id: 'garden-scenario-3',
    islandId: 'garden' as IslandId,
    title: 'Vertrauen aufbauen',
    description: 'Wurzel ist neu und muss lernen, den anderen Pflanzen zu vertrauen.',
    scenes: [
      {
        id: 'g3-s1',
        text: 'Wurzel steht allein am Rand des Gartens. Flora erklärt dir, dass er neu ist und Schwierigkeiten hat, Vertrauen aufzubauen.',
        choices: [
          {
            id: 'g3-s1-c1',
            text: 'Ich gehe zu Wurzel und stelle mich freundlich vor.',
            nextSceneId: 'g3-s2',
            points: 3
          },
          {
            id: 'g3-s1-c2',
            text: 'Ich winke ihm von weitem zu.',
            nextSceneId: 'g3-s2',
            points: 1
          },
          {
            id: 'g3-s1-c3',
            text: 'Ich warte, bis er von selbst kommt.',
            nextSceneId: 'g3-s2',
            points: 0
          }
        ]
      },
      {
        id: 'g3-s2',
        text: 'Wurzel erzählt, dass er in seinem alten Garten schlechte Erfahrungen gemacht hat. Die anderen Pflanzen haben ihn ausgelacht, weil er klein war.',
        choices: [
          {
            id: 'g3-s2-c1',
            text: 'Ich höre aufmerksam zu und zeige Mitgefühl für seine Erfahrung.',
            nextSceneId: 'g3-s3',
            points: 3
          },
          {
            id: 'g3-s2-c2',
            text: 'Ich sage, dass dieser Garten anders ist.',
            nextSceneId: 'g3-s3',
            points: 2
          },
          {
            id: 'g3-s2-c3',
            text: 'Ich sage, dass er das vergessen sollte.',
            nextSceneId: 'g3-s3',
            points: 0
          }
        ]
      },
      {
        id: 'g3-s3',
        text: 'Du bietest an, Wurzel den anderen Pflanzen vorzustellen. Er ist nervös, willigt aber ein, weil du verständnisvoll warst.',
        choices: [
          {
            id: 'g3-s3-c1',
            text: 'Ich stelle ihn behutsam vor und achte auf seine Reaktionen.',
            nextSceneId: 'g3-s4',
            points: 3
          },
          {
            id: 'g3-s3-c2',
            text: 'Ich stelle ihn allen auf einmal vor.',
            nextSceneId: 'g3-s4',
            points: 1
          },
          {
            id: 'g3-s3-c3',
            text: 'Ich sage den anderen nur, dass er neu ist.',
            nextSceneId: 'g3-s4',
            points: 1
          }
        ]
      },
      {
        id: 'g3-s4',
        text: 'Blüte ist besonders freundlich zu Wurzel und lädt ihn ein, neben ihr zu wachsen. Wurzel ist unsicher, ob er das Angebot annehmen soll.',
        choices: [
          {
            id: 'g3-s4-c1',
            text: 'Ich ermutige ihn, es zu versuchen, und versichere ihm, dass Blüte nett ist.',
            nextSceneId: 'g3-s5',
            points: 3
          },
          {
            id: 'g3-s4-c2',
            text: 'Ich sage, dass er selbst entscheiden soll.',
            nextSceneId: 'g3-s5',
            points: 2
          },
          {
            id: 'g3-s4-c3',
            text: 'Ich mische mich nicht ein.',
            nextSceneId: 'g3-s5',
            points: 0
          }
        ]
      },
      {
        id: 'g3-s5',
        text: 'Wurzel nimmt das Angebot an, aber nach einigen Tagen kommen Zweifel. Er fragt dich, ob Blüte wirklich seine Freundin sein will oder nur nett tut.',
        choices: [
          {
            id: 'g3-s5-c1',
            text: 'Ich schlage vor, dass er ehrlich mit Blüte über seine Sorgen spricht.',
            nextSceneId: 'g3-s6',
            points: 3
          },
          {
            id: 'g3-s5-c2',
            text: 'Ich versichere ihm, dass Blüte aufrichtig ist.',
            nextSceneId: 'g3-s6',
            points: 2
          },
          {
            id: 'g3-s5-c3',
            text: 'Ich sage, dass er abwarten soll.',
            nextSceneId: 'g3-s6',
            points: 1
          }
        ]
      },
      {
        id: 'g3-s6',
        text: 'Wurzel spricht mit Blüte, die versichert ihm, dass sie gerne seine Freundin ist. Sie erklärt, dass Vertrauen Zeit braucht und sie geduldig sein wird.',
        choices: [
          {
            id: 'g3-s6-c1',
            text: 'Ich spreche mit beiden über den Aufbau von Vertrauen durch Ehrlichkeit.',
            nextSceneId: null,
            points: 3
          },
          {
            id: 'g3-s6-c2',
            text: 'Ich freue mich, dass sie sich verstehen.',
            nextSceneId: null,
            points: 2
          },
          {
            id: 'g3-s6-c3',
            text: 'Ich bin erleichtert, dass es geklärt ist.',
            nextSceneId: null,
            points: 1
          }
        ]
      }
    ],
    completed: false
  },
  {
    id: 'garden-scenario-4',
    islandId: 'garden' as IslandId,
    title: 'Ehrlichkeit oder Höflichkeit',
    description: 'Ein Dilemma zwischen der Wahrheit sagen und Gefühle schonen.',
    scenes: [
      {
        id: 'g4-s1',
        text: 'Dornis hat ein Lied komponiert und möchte es allen vorsingen. Es klingt... nicht gut. Er fragt dich nach deiner ehrlichen Meinung.',
        choices: [
          {
            id: 'g4-s1-c1',
            text: 'Ich sage freundlich die Wahrheit und biete konstruktive Tipps.',
            nextSceneId: 'g4-s2',
            points: 3
          },
          {
            id: 'g4-s1-c2',
            text: 'Ich lobe die Mühe, erwähne aber nichts über den Klang.',
            nextSceneId: 'g4-s2',
            points: 1
          },
          {
            id: 'g4-s1-c3',
            text: 'Ich sage, dass es toll ist, obwohl es nicht stimmt.',
            nextSceneId: 'g4-s2',
            points: 0
          }
        ]
      },
      {
        id: 'g4-s2',
        text: 'Dornis bemerkt dein Zögern und fragt direkt: "Findest du es wirklich gut, oder bist du nur höflich?" Er scheint echtes Feedback zu wollen.',
        choices: [
          {
            id: 'g4-s2-c1',
            text: 'Ich erkläre ehrlich und einfühlsam, was verbessert werden könnte.',
            nextSceneId: 'g4-s3',
            points: 3
          },
          {
            id: 'g4-s2-c2',
            text: 'Ich sage, dass es Übung braucht.',
            nextSceneId: 'g4-s3',
            points: 2
          },
          {
            id: 'g4-s2-c3',
            text: 'Ich bleibe bei meiner höflichen Lüge.',
            nextSceneId: 'g4-s3',
            points: 0
          }
        ]
      },
      {
        id: 'g4-s3',
        text: 'Dornis ist erst verletzt, denkt dann aber nach. Er dankt dir für deine Ehrlichkeit und sagt, dass falsche Komplimente ihm nicht helfen würden.',
        choices: [
          {
            id: 'g4-s3-c1',
            text: 'Ich erkläre, dass ehrliches Feedback ein Zeichen von Respekt ist.',
            nextSceneId: 'g4-s4',
            points: 3
          },
          {
            id: 'g4-s3-c2',
            text: 'Ich biete an, ihm beim Üben zu helfen.',
            nextSceneId: 'g4-s4',
            points: 2
          },
          {
            id: 'g4-s3-c3',
            text: 'Ich bin erleichtert, dass er nicht böse ist.',
            nextSceneId: 'g4-s4',
            points: 1
          }
        ]
      },
      {
        id: 'g4-s4',
        text: 'Blüte hört das Gespräch und gesteht, dass sie oft lügt, um niemanden zu verletzen. Sie fragt, wie man ehrlich sein kann, ohne gemein zu wirken.',
        choices: [
          {
            id: 'g4-s4-c1',
            text: 'Ich erkläre den Unterschied zwischen Ehrlichkeit mit Empathie und Grausamkeit.',
            nextSceneId: 'g4-s5',
            points: 3
          },
          {
            id: 'g4-s4-c2',
            text: 'Ich sage, dass der Tonfall wichtig ist.',
            nextSceneId: 'g4-s5',
            points: 2
          },
          {
            id: 'g4-s4-c3',
            text: 'Ich sage, dass Ehrlichkeit manchmal wehtut.',
            nextSceneId: 'g4-s5',
            points: 1
          }
        ]
      },
      {
        id: 'g4-s5',
        text: 'Flora schlägt eine Übung vor: Jeder sagt dem anderen etwas Ehrliches, aber auf freundliche Weise. Du sollst beginnen.',
        choices: [
          {
            id: 'g4-s5-c1',
            text: 'Ich gebe jemandem ehrliches, aber liebevolles Feedback.',
            nextSceneId: 'g4-s6',
            points: 3
          },
          {
            id: 'g4-s5-c2',
            text: 'Ich sage etwas Harmloses, aber Wahres.',
            nextSceneId: 'g4-s6',
            points: 2
          },
          {
            id: 'g4-s5-c3',
            text: 'Ich möchte nicht teilnehmen.',
            nextSceneId: 'g4-s6',
            points: 0
          }
        ]
      },
      {
        id: 'g4-s6',
        text: 'Die Übung zeigt allen, dass Ehrlichkeit und Freundlichkeit zusammenpassen können. Dornis übt sein Lied weiter und freut sich auf echtes Feedback.',
        choices: [
          {
            id: 'g4-s6-c1',
            text: 'Ich bespreche, wie wichtig Vertrauen für ehrliche Kommunikation ist.',
            nextSceneId: null,
            points: 3
          },
          {
            id: 'g4-s6-c2',
            text: 'Ich bin froh über die neue Offenheit im Garten.',
            nextSceneId: null,
            points: 2
          },
          {
            id: 'g4-s6-c3',
            text: 'Ich finde die Übung war interessant.',
            nextSceneId: null,
            points: 1
          }
        ]
      }
    ],
    completed: false
  },
  {
    id: 'garden-scenario-5',
    islandId: 'garden' as IslandId,
    title: 'Außenseiter und Zugehörigkeit',
    description: 'Wurzel fühlt sich ausgeschlossen, wenn die anderen ohne ihn spielen.',
    scenes: [
      {
        id: 'g5-s1',
        text: 'Blüte, Dornis und andere Pflanzen spielen ein Spiel. Wurzel steht abseits und schaut traurig zu. Niemand hat ihn eingeladen.',
        choices: [
          {
            id: 'g5-s1-c1',
            text: 'Ich gehe zu Wurzel und frage, ob er mitmachen möchte, dann lade ich ihn ein.',
            nextSceneId: 'g5-s2',
            points: 3
          },
          {
            id: 'g5-s1-c2',
            text: 'Ich rufe den anderen zu, dass Wurzel auch mitspielen will.',
            nextSceneId: 'g5-s2',
            points: 2
          },
          {
            id: 'g5-s1-c3',
            text: 'Ich denke, dass Wurzel selbst fragen sollte.',
            nextSceneId: 'g5-s2',
            points: 0
          }
        ]
      },
      {
        id: 'g5-s2',
        text: 'Wurzel kommt dazu, aber die Regeln sind kompliziert und er fühlt sich überfordert. Die anderen spielen einfach weiter, ohne ihm zu helfen.',
        choices: [
          {
            id: 'g5-s2-c1',
            text: 'Ich pausiere das Spiel und erkläre Wurzel geduldig die Regeln.',
            nextSceneId: 'g5-s3',
            points: 3
          },
          {
            id: 'g5-s2-c2',
            text: 'Ich versuche, ihm während des Spiels zu helfen.',
            nextSceneId: 'g5-s3',
            points: 2
          },
          {
            id: 'g5-s2-c3',
            text: 'Ich denke, er wird es schon lernen.',
            nextSceneId: 'g5-s3',
            points: 0
          }
        ]
      },
      {
        id: 'g5-s3',
        text: 'Wurzel macht einen Fehler und einige lachen. Er wird rot und will gehen. Du siehst, wie verletzt er ist.',
        choices: [
          {
            id: 'g5-s3-c1',
            text: 'Ich verteidige Wurzel und erkläre, dass Fehler beim Lernen normal sind.',
            nextSceneId: 'g5-s4',
            points: 3
          },
          {
            id: 'g5-s3-c2',
            text: 'Ich sage Wurzel, dass der Fehler nicht schlimm ist.',
            nextSceneId: 'g5-s4',
            points: 2
          },
          {
            id: 'g5-s3-c3',
            text: 'Ich lache mit, sage aber, dass es nur Spaß war.',
            nextSceneId: 'g5-s4',
            points: 0
          }
        ]
      },
      {
        id: 'g5-s4',
        text: 'Flora kommt hinzu und spricht mit der Gruppe über Inklusion. Sie fragt alle, wie es sich anfühlt, ausgeschlossen zu werden.',
        choices: [
          {
            id: 'g5-s4-c1',
            text: 'Ich teile eine eigene Erfahrung, um anderen zu zeigen, wie es sich anfühlt.',
            nextSceneId: 'g5-s5',
            points: 3
          },
          {
            id: 'g5-s4-c2',
            text: 'Ich höre zu, was die anderen sagen.',
            nextSceneId: 'g5-s5',
            points: 2
          },
          {
            id: 'g5-s4-c3',
            text: 'Ich finde, das wird übertrieben.',
            nextSceneId: 'g5-s5',
            points: 0
          }
        ]
      },
      {
        id: 'g5-s5',
        text: 'Blüte erinnert sich, wie sie sich als Neue fühlte, und entschuldigt sich bei Wurzel. Sie schlägt vor, ein einfacheres Spiel zu spielen, das alle kennen.',
        choices: [
          {
            id: 'g5-s5-c1',
            text: 'Ich lobe Blütes Empathie und helfe beim Aussuchen eines neuen Spiels.',
            nextSceneId: 'g5-s6',
            points: 3
          },
          {
            id: 'g5-s5-c2',
            text: 'Ich finde die Idee gut.',
            nextSceneId: 'g5-s6',
            points: 2
          },
          {
            id: 'g5-s5-c3',
            text: 'Ich will lieber beim alten Spiel bleiben.',
            nextSceneId: 'g5-s6',
            points: 0
          }
        ]
      },
      {
        id: 'g5-s6',
        text: 'Beim neuen Spiel ist Wurzel von Anfang an dabei und hat Spaß. Die Gruppe lernt, dass Zugehörigkeit bedeutet, aufeinander Rücksicht zu nehmen.',
        choices: [
          {
            id: 'g5-s6-c1',
            text: 'Ich spreche mit allen über Strategien, wie man Neue besser integrieren kann.',
            nextSceneId: null,
            points: 3
          },
          {
            id: 'g5-s6-c2',
            text: 'Ich bin froh, dass nun alle Spaß haben.',
            nextSceneId: null,
            points: 2
          },
          {
            id: 'g5-s6-c3',
            text: 'Ich finde, dass das neue Spiel auch gut ist.',
            nextSceneId: null,
            points: 1
          }
        ]
      }
    ],
    completed: false
  },
  {
    id: 'garden-scenario-6',
    islandId: 'garden' as IslandId,
    title: 'Perspektiven verstehen',
    description: 'Die Pflanzen streiten, weil jeder die Situation anders sieht.',
    scenes: [
      {
        id: 'g6-s1',
        text: 'Es gibt Streit im Garten: Die Büsche behaupten, die Blumen bekommen zu viel Wasser. Die Blumen sagen, sie brauchen es. Beide Seiten sind wütend.',
        choices: [
          {
            id: 'g6-s1-c1',
            text: 'Ich bitte beide Seiten, ihre Sichtweise zu erklären, ohne zu unterbrechen.',
            nextSceneId: 'g6-s2',
            points: 3
          },
          {
            id: 'g6-s1-c2',
            text: 'Ich versuche herauszufinden, wer recht hat.',
            nextSceneId: 'g6-s2',
            points: 1
          },
          {
            id: 'g6-s1-c3',
            text: 'Ich halte mich raus, das ist nicht mein Problem.',
            nextSceneId: 'g6-s2',
            points: 0
          }
        ]
      },
      {
        id: 'g6-s2',
        text: 'Die Büsche erklären, dass überschüssiges Wasser zu ihnen fließt und ihre Wurzeln faulen lässt. Die Blumen wussten das nicht und sind überrascht.',
        choices: [
          {
            id: 'g6-s2-c1',
            text: 'Ich helfe beiden zu verstehen, dass niemand absichtlich geschadet hat.',
            nextSceneId: 'g6-s3',
            points: 3
          },
          {
            id: 'g6-s2-c2',
            text: 'Ich sage den Blumen, dass sie vorsichtiger sein müssen.',
            nextSceneId: 'g6-s3',
            points: 1
          },
          {
            id: 'g6-s2-c3',
            text: 'Ich finde, die Büsche übertreiben.',
            nextSceneId: 'g6-s3',
            points: 0
          }
        ]
      },
      {
        id: 'g6-s3',
        text: 'Blüte (eine Blume) fühlt sich schuldig. Sie hatte keine Ahnung, dass ihr Verhalten anderen schadet. Sie fragt, was sie tun soll.',
        choices: [
          {
            id: 'g6-s3-c1',
            text: 'Ich schlage vor, gemeinsam eine Lösung zu finden, die allen hilft.',
            nextSceneId: 'g6-s4',
            points: 3
          },
          {
            id: 'g6-s3-c2',
            text: 'Ich sage, dass sie weniger Wasser nehmen soll.',
            nextSceneId: 'g6-s4',
            points: 1
          },
          {
            id: 'g6-s3-c3',
            text: 'Ich denke, die Büsche sollen sich anpassen.',
            nextSceneId: 'g6-s4',
            points: 0
          }
        ]
      },
      {
        id: 'g6-s4',
        text: 'Flora schlägt vor, dass jeder versucht, sich in die Lage des anderen zu versetzen. Sie bittet dich, das zu moderieren.',
        choices: [
          {
            id: 'g6-s4-c1',
            text: 'Ich leite eine Übung, bei der jeder die Perspektive des anderen beschreibt.',
            nextSceneId: 'g6-s5',
            points: 3
          },
          {
            id: 'g6-s4-c2',
            text: 'Ich bitte jeden, nochmal seine eigene Sicht zu erklären.',
            nextSceneId: 'g6-s5',
            points: 1
          },
          {
            id: 'g6-s4-c3',
            text: 'Ich will das nicht moderieren, das ist schwierig.',
            nextSceneId: 'g6-s5',
            points: 0
          }
        ]
      },
      {
        id: 'g6-s5',
        text: 'Durch die Übung verstehen beide Seiten einander besser. Die Blumen sehen das Problem der Büsche, die Büsche verstehen den Wasserbedarf der Blumen.',
        choices: [
          {
            id: 'g6-s5-c1',
            text: 'Ich helfe dabei, ein Bewässerungssystem zu planen, das allen gerecht wird.',
            nextSceneId: 'g6-s6',
            points: 3
          },
          {
            id: 'g6-s5-c2',
            text: 'Ich schlage vor, dass sie einen Kompromiss finden.',
            nextSceneId: 'g6-s6',
            points: 2
          },
          {
            id: 'g6-s5-c3',
            text: 'Ich bin froh, dass sie sich verstehen.',
            nextSceneId: 'g6-s6',
            points: 1
          }
        ]
      },
      {
        id: 'g6-s6',
        text: 'Die Lösung funktioniert und der Frieden ist wiederhergestellt. Flora lobt alle dafür, dass sie bereit waren, andere Perspektiven zu sehen.',
        choices: [
          {
            id: 'g6-s6-c1',
            text: 'Ich reflektiere mit der Gruppe über die Kraft der Perspektivübernahme.',
            nextSceneId: null,
            points: 3
          },
          {
            id: 'g6-s6-c2',
            text: 'Ich bin stolz auf die Gruppe.',
            nextSceneId: null,
            points: 2
          },
          {
            id: 'g6-s6-c3',
            text: 'Ich bin froh, dass der Streit vorbei ist.',
            nextSceneId: null,
            points: 1
          }
        ]
      }
    ],
    completed: false
  }
];

export const gardenWisdomCards: WisdomCard[] = [
  {
    id: 'garden-wisdom-1',
    title: 'Empathie beginnt mit Zuhören',
    content: 'Wenn du wirklich verstehen willst, wie sich jemand fühlt, höre mit deinem ganzen Herzen zu, nicht nur mit deinen Ohren.',
    category: 'Empathie',
    islandId: 'garden' as IslandId,
    collected: false
  },
  {
    id: 'garden-wisdom-2',
    title: 'Grenzen sind gesund',
    content: 'Nein zu sagen ist nicht gemein. Es bedeutet, dass du auf deine eigenen Bedürfnisse achtest. Das ist wichtig für echte Freundschaften.',
    category: 'Grenzen',
    islandId: 'garden' as IslandId,
    collected: false
  },
  {
    id: 'garden-wisdom-3',
    title: 'Vertrauen wächst langsam',
    content: 'Wie eine Pflanze braucht Vertrauen Zeit, Geduld und Pflege. Man kann es nicht erzwingen, aber man kann ihm Raum zum Wachsen geben.',
    category: 'Vertrauen',
    islandId: 'garden' as IslandId,
    collected: false
  },
  {
    id: 'garden-wisdom-4',
    title: 'Ehrlichkeit mit Freundlichkeit',
    content: 'Die Wahrheit zu sagen bedeutet nicht, grausam zu sein. Du kannst ehrlich sein und trotzdem die Gefühle anderer respektieren.',
    category: 'Ehrlichkeit',
    islandId: 'garden' as IslandId,
    collected: false
  },
  {
    id: 'garden-wisdom-5',
    title: 'Jeder hat eine Geschichte',
    content: 'Hinter jedem Verhalten steckt ein Grund. Wenn jemand abweisend ist, hat er vielleicht Angst. Wenn jemand zu viel redet, fühlt er sich vielleicht einsam.',
    category: 'Perspektive',
    islandId: 'garden' as IslandId,
    collected: false
  },
  {
    id: 'garden-wisdom-6',
    title: 'Konflikte sind Chancen',
    content: 'Streit ist unangenehm, aber er kann helfen, einander besser zu verstehen. Wichtig ist, wie du damit umgehst.',
    category: 'Konfliktlösung',
    islandId: 'garden' as IslandId,
    collected: false
  },
  {
    id: 'garden-wisdom-7',
    title: 'Zugehörigkeit schafft man gemeinsam',
    content: 'Niemand sollte sich ausgeschlossen fühlen. Achte darauf, wer am Rand steht, und lade ihn ein, Teil der Gruppe zu sein.',
    category: 'Inklusion',
    islandId: 'garden' as IslandId,
    collected: false
  },
  {
    id: 'garden-wisdom-8',
    title: 'Gefühle sind nicht richtig oder falsch',
    content: 'Alle Gefühle sind okay. Was zählt, ist, wie du mit ihnen umgehst und ob du die Gefühle anderer respektierst.',
    category: 'Emotionale Intelligenz',
    islandId: 'garden' as IslandId,
    collected: false
  },
  {
    id: 'garden-wisdom-9',
    title: 'Kompromisse sind keine Niederlagen',
    content: 'Wenn du in der Mitte triffst, bedeutet das nicht, dass du verloren hast. Es bedeutet, dass beide gewinnen.',
    category: 'Kompromiss',
    islandId: 'garden' as IslandId,
    collected: false
  },
  {
    id: 'garden-wisdom-10',
    title: 'Mitgefühl stärkt Verbindungen',
    content: 'Wenn du jemandem zeigst, dass du seine Gefühle verstehst, baust du Brücken. Mitgefühl macht Beziehungen stark.',
    category: 'Mitgefühl',
    islandId: 'garden' as IslandId,
    collected: false
  },
  {
    id: 'garden-wisdom-11',
    title: 'Entschuldigungen zeigen Mut',
    content: 'Es braucht Stärke, zuzugeben, dass du falsch lagst. Eine ehrliche Entschuldigung kann heilen.',
    category: 'Verantwortung',
    islandId: 'garden' as IslandId,
    collected: false
  },
  {
    id: 'garden-wisdom-12',
    title: 'Unterschiede bereichern',
    content: 'Nicht alle müssen gleich sein. Verschiedene Perspektiven und Persönlichkeiten machen eine Gruppe bunter und stärker.',
    category: 'Diversität',
    islandId: 'garden' as IslandId,
    collected: false
  },
  {
    id: 'garden-wisdom-13',
    title: 'Selbstfürsorge ist nicht egoistisch',
    content: 'Du kannst nur für andere da sein, wenn es dir selbst gut geht. Auf dich zu achten ist die Grundlage für gute Beziehungen.',
    category: 'Selbstfürsorge',
    islandId: 'garden' as IslandId,
    collected: false
  },
  {
    id: 'garden-wisdom-14',
    title: 'Aktives Zuhören schafft Nähe',
    content: 'Wirklich zuhören bedeutet: nicht unterbrechen, nicht sofort Lösungen anbieten, sondern einfach da sein und verstehen wollen.',
    category: 'Kommunikation',
    islandId: 'garden' as IslandId,
    collected: false
  },
  {
    id: 'garden-wisdom-15',
    title: 'Kleine Gesten, große Wirkung',
    content: 'Ein freundliches Wort, ein Lächeln, eine helfende Hand – kleine Taten der Freundlichkeit können den Tag von jemandem verändern.',
    category: 'Freundlichkeit',
    islandId: 'garden' as IslandId,
    collected: false
  },
  {
    id: 'garden-wisdom-16',
    title: 'Gemeinsam ist man stärker',
    content: 'Wenn alle aufeinander achten und füreinander da sind, kann die Gemeinschaft jede Herausforderung meistern.',
    category: 'Gemeinschaft',
    islandId: 'garden' as IslandId,
    collected: false
  }
];

export const gardenActivities: GardenActivity[] = [
  {
    id: 'garden-activity-1',
    title: 'Gefühls-Tagebuch',
    description: 'Reflektiere über deine Gefühle und die anderer Menschen.',
    instructions: [
      'Nimm dir jeden Abend fünf Minuten Zeit.',
      'Schreibe auf: Welches Gefühl hatte ich heute am stärksten?',
      'Überlege: Bei welcher Person habe ich heute ein Gefühl bemerkt? Welches war es?',
      'Frage dich: Wie habe ich darauf reagiert? Was könnte ich beim nächsten Mal anders machen?',
      'Nach einer Woche: Lies deine Einträge und suche nach Mustern.'
    ],
    points: 10,
    islandId: 'garden' as IslandId,
    completed: false
  },
  {
    id: 'garden-activity-2',
    title: 'Perspektiven-Wechsel',
    description: 'Übe, Situationen aus verschiedenen Blickwinkeln zu sehen.',
    instructions: [
      'Denke an einen aktuellen Konflikt oder eine Meinungsverschiedenheit.',
      'Schreibe auf, wie du die Situation siehst und was du fühlst.',
      'Nun versetze dich in die andere Person: Was könnte sie denken und fühlen?',
      'Gibt es einen dritten Beteiligten? Was ist dessen Sichtweise?',
      'Überlege: Hat sich deine Meinung verändert? Was hast du gelernt?'
    ],
    points: 15,
    islandId: 'garden' as IslandId,
    completed: false
  },
  {
    id: 'garden-activity-3',
    title: 'Freundlichkeits-Kette',
    description: 'Starte eine Kette von netten Gesten.',
    instructions: [
      'Tue heute etwas Nettes für jemanden (ein Kompliment, helfen, zuhören).',
      'Erkläre der Person das Konzept der Freundlichkeits-Kette.',
      'Bitte sie, auch etwas Nettes für jemand anderen zu tun.',
      'Diese Person soll es weitergeben – und so entsteht eine Kette.',
      'Nach einer Woche: Finde heraus, wie weit die Kette gekommen ist!'
    ],
    points: 20,
    islandId: 'garden' as IslandId,
    completed: false
  },
  {
    id: 'garden-activity-4',
    title: 'Grenzen-Übung',
    description: 'Lerne, deine Grenzen klar und freundlich zu kommunizieren.',
    instructions: [
      'Überlege: Wann habe ich zuletzt Ja gesagt, obwohl ich Nein meinte?',
      'Schreibe drei Sätze, mit denen du freundlich Nein sagen kannst.',
      'Übe diese Sätze laut vor dem Spiegel oder mit jemandem, dem du vertraust.',
      'In der nächsten Woche: Achte auf Momente, wo du Nein sagen möchtest.',
      'Versuche es mindestens einmal – und reflektiere, wie es sich anfühlte.'
    ],
    points: 15,
    islandId: 'garden' as IslandId,
    completed: false
  },
  {
    id: 'garden-activity-5',
    title: 'Aktives Zuhören',
    description: 'Verbessere deine Fähigkeit, anderen wirklich zuzuhören.',
    instructions: [
      'Bitte jemanden (Freund, Familie), dir von seinem Tag zu erzählen.',
      'Höre zu, ohne zu unterbrechen, Ratschläge zu geben oder von dir zu erzählen.',
      'Stelle Fragen, um besser zu verstehen: "Wie hast du dich dabei gefühlt?"',
      'Fasse am Ende zusammen, was du gehört hast: "Du meinst also..."',
      'Frage die Person: Fühlte sie sich gehört? Was war hilfreich an deinem Zuhören?'
    ],
    points: 15,
    islandId: 'garden' as IslandId,
    completed: false
  }
];
