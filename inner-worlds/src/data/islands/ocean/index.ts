// @ts-nocheck
import type { Scenario, WisdomCard, Activity, IslandId } from '../../../types';

// Local interfaces
interface OceanActivity extends Activity {
  instructions: string[];
}

interface OceanNPC {
  id: string;
  name: string;
  emoji: string;
  description: string;
  backstory: string;
}

// NPCs
export const oceanNPCs: OceanNPC[] = [
  {
    id: 'marina',
    name: 'Marina',
    emoji: '🧜‍♀️',
    description: 'Eine Meerjungfrau, die einen geliebten Freund verloren hat',
    backstory: 'Marina schwamm einst mit ihrem besten Freund durch die Ozeane. Seit seinem Verschwinden singt sie traurige Lieder und versteht den Schmerz des Verlustes tief.'
  },
  {
    id: 'tiefgang',
    name: 'Tiefgang',
    emoji: '🐋',
    description: 'Ein weiser Wal, der die Tiefen der Emotionen kennt',
    backstory: 'Tiefgang hat Jahrhunderte gelebt und viel Traurigkeit gesehen. Er weiß, dass selbst die dunkelsten Gefühle wie Wellen kommen und gehen, und lehrt andere, durch den Schmerz zu tauchen.'
  },
  {
    id: 'coralie',
    name: 'Coralie',
    emoji: '🐚',
    description: 'Ein Einsiedlerkrebs, der sich in seinem Schneckenhaus versteckt',
    backstory: 'Coralie zieht sich zurück, wenn die Welt zu überwältigend wird. Sie kennt die Angst vor Verletzung und den Wunsch, sich zu schützen, indem man sich versteckt.'
  },
  {
    id: 'wellentanz',
    name: 'Wellentanz',
    emoji: '🌊',
    description: 'Ein Wellengeist, der die Bewegung der Gefühle verkörpert',
    backstory: 'Wellentanz ist die personifizierte Energie des Ozeans. Sie zeigt, wie Gefühle in Wellen kommen – manchmal sanft, manchmal stürmisch, aber immer in Bewegung.'
  }
];

// Scenarios
export const oceanScenarios: Scenario[] = [
  // Scenario 1: Der Verlust
  {
    id: 'ocean-scenario-1',
    title: 'Marinas Abschiedslied',
    description: 'Marina trauert um ihren verlorenen Freund. Sie muss lernen, ihren Schmerz anzuerkennen.',
    islandId: 'ocean' as IslandId,
    difficulty: 'medium',
    estimatedTime: '15-20 min',
    themes: ['Trauer', 'Verlust', 'Abschied'],
    scenes: [
      {
        id: 'o1-s1',
        content: 'Marina sitzt auf einem Felsen und starrt aufs Meer hinaus. Ihre Tränen vermischen sich mit dem Salzwasser. "Er ist einfach gegangen... und ich konnte nicht einmal auf Wiedersehen sagen."',
        choices: [
          {
            id: 'o1-s1-c1',
            text: 'Setz dich neben sie und schweige mit ihr',
            nextSceneId: 'o1-s2',
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 1 }
          },
          {
            id: 'o1-s1-c2',
            text: 'Sage ihr, dass die Zeit alle Wunden heilt',
            nextSceneId: 'o1-s2',
            points: { empathyPoints: 0, insightPoints: 1, couragePoints: 1 }
          },
          {
            id: 'o1-s1-c3',
            text: 'Frage sie, was sie an ihm am meisten vermisst',
            nextSceneId: 'o1-s2',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'o1-s2',
        content: 'Marina beginnt zu erzählen: "Wir sind zusammen durch die tiefsten Gräben geschwommen. Er hat mich zum Lachen gebracht, als ich dachte, ich würde ertrinken." Ihre Stimme bricht.',
        choices: [
          {
            id: 'o1-s2-c1',
            text: 'Ermutige sie, mehr zu erzählen',
            nextSceneId: 'o1-s3',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 1 }
          },
          {
            id: 'o1-s2-c2',
            text: 'Lenke sie ab, um den Schmerz zu vermeiden',
            nextSceneId: 'o1-s3',
            points: { empathyPoints: 0, insightPoints: 0, couragePoints: 0 }
          },
          {
            id: 'o1-s2-c3',
            text: 'Teile eine eigene Erfahrung mit Verlust',
            nextSceneId: 'o1-s3',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 3 }
          }
        ]
      },
      {
        id: 'o1-s3',
        content: 'Die Sonne beginnt unterzugehen. Marina flüstert: "Manchmal denke ich, wenn ich nur stark genug weine, kommt er zurück." Das Meer wird dunkler um euch herum.',
        choices: [
          {
            id: 'o1-s3-c1',
            text: 'Erkenne an, dass dieser Wunsch normal ist',
            nextSceneId: 'o1-s4',
            points: { empathyPoints: 3, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'o1-s3-c2',
            text: 'Sage ihr, dass sie akzeptieren muss, dass er weg ist',
            nextSceneId: 'o1-s4',
            points: { empathyPoints: 1, insightPoints: 2, couragePoints: 1 }
          },
          {
            id: 'o1-s3-c3',
            text: 'Frage, was ihr Freund wohl gewollt hätte',
            nextSceneId: 'o1-s4',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'o1-s4',
        content: 'Marina singt ein leises Lied – traurig, aber wunderschön. "Das haben wir immer zusammen gesungen. Jetzt singe ich allein." Die Melodie schwebt über den Wellen.',
        choices: [
          {
            id: 'o1-s4-c1',
            text: 'Summe leise mit',
            nextSceneId: 'o1-s5',
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 2 }
          },
          {
            id: 'o1-s4-c2',
            text: 'Höre einfach zu',
            nextSceneId: 'o1-s5',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 1 }
          },
          {
            id: 'o1-s4-c3',
            text: 'Sage ihr, wie mutig sie ist, noch zu singen',
            nextSceneId: 'o1-s5',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'o1-s5',
        content: 'Tiefgang taucht aus der Tiefe auf. "Trauer ist wie der Ozean – tief, weit und manchmal dunkel. Aber sie trägt auch Erinnerungen, die nie ertrinken." Er schaut Marina sanft an.',
        choices: [
          {
            id: 'o1-s5-c1',
            text: 'Frage Tiefgang, wie man mit so viel Schmerz lebt',
            nextSceneId: 'o1-s6',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'o1-s5-c2',
            text: 'Bleibe bei Marina und halte ihre Hand',
            nextSceneId: 'o1-s6',
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 1 }
          },
          {
            id: 'o1-s5-c3',
            text: 'Danke Tiefgang für seine Weisheit',
            nextSceneId: 'o1-s6',
            points: { empathyPoints: 1, insightPoints: 2, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'o1-s6',
        content: 'Marina lächelt zum ersten Mal durch ihre Tränen. "Vielleicht... vielleicht ist es okay, traurig zu sein. Vielleicht zeigt es nur, wie sehr ich geliebt habe." Die Sterne beginnen zu leuchten.',
        choices: [
          {
            id: 'o1-s6-c1',
            text: 'Bestätige, dass Trauer ein Zeichen von Liebe ist',
            nextSceneId: null,
            points: { empathyPoints: 3, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'o1-s6-c2',
            text: 'Biete an, öfter bei ihr zu sein',
            nextSceneId: null,
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'o1-s6-c3',
            text: 'Schlage vor, dass sie weiter singt – für ihn',
            nextSceneId: null,
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 3 }
          }
        ]
      }
    ],
    completed: false
  },

  // Scenario 2: Die Dunkelheit
  {
    id: 'ocean-scenario-2',
    title: 'In der Tiefe',
    description: 'Abstieg in die dunklen Gewässer, wo Depression lauert.',
    islandId: 'ocean' as IslandId,
    difficulty: 'hard',
    estimatedTime: '20-25 min',
    themes: ['Depression', 'Hoffnungslosigkeit', 'Licht finden'],
    scenes: [
      {
        id: 'o2-s1',
        content: 'Du sinkst tiefer und tiefer. Das Licht von oben wird schwächer. Hier unten ist alles schwer, langsam, und dunkel. Tiefgang erscheint neben dir. "Manche Tage fühlen sich so an, nicht wahr?"',
        choices: [
          {
            id: 'o2-s1-c1',
            text: 'Nicke und gestehe, dass du dich auch so fühlst',
            nextSceneId: 'o2-s2',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 3 }
          },
          {
            id: 'o2-s1-c2',
            text: 'Versuche, nach oben zum Licht zu schwimmen',
            nextSceneId: 'o2-s2',
            points: { empathyPoints: 1, insightPoints: 1, couragePoints: 2 }
          },
          {
            id: 'o2-s1-c3',
            text: 'Frage, ob das Gefühl jemals aufhört',
            nextSceneId: 'o2-s2',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'o2-s2',
        content: 'In der Dunkelheit siehst du schemenhafte Gestalten – Gedanken, die wie Schatten vorbeischweben. "Ich bin wertlos", flüstert einer. "Niemand versteht mich", sagt ein anderer.',
        choices: [
          {
            id: 'o2-s2-c1',
            text: 'Erkenne die Gedanken an, aber glaube ihnen nicht',
            nextSceneId: 'o2-s3',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 3 }
          },
          {
            id: 'o2-s2-c2',
            text: 'Versuche, die Gedanken zu bekämpfen',
            nextSceneId: 'o2-s3',
            points: { empathyPoints: 1, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'o2-s2-c3',
            text: 'Lass dich von den Gedanken verschlingen',
            nextSceneId: 'o2-s3',
            points: { empathyPoints: 1, insightPoints: 1, couragePoints: 0 }
          }
        ]
      },
      {
        id: 'o2-s3',
        content: 'Tiefgang spricht ruhig: "Die Tiefe ist Teil des Ozeans. Ohne sie gäbe es keine Wellen oben. Du musst nicht hier bleiben, aber du darfst dich nicht dafür schämen, hier zu sein."',
        choices: [
          {
            id: 'o2-s3-c1',
            text: 'Frage, wie man wieder nach oben kommt',
            nextSceneId: 'o2-s4',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'o2-s3-c2',
            text: 'Sage, dass du dich zu schwer fühlst zum Aufsteigen',
            nextSceneId: 'o2-s4',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 3 }
          },
          {
            id: 'o2-s3-c3',
            text: 'Bleibe still und lausche dem Druck der Tiefe',
            nextSceneId: 'o2-s4',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'o2-s4',
        content: 'Ein schwaches Leuchten erscheint – eine Tiefsee-Qualle. Ihr Licht ist klein, aber es ist da. "Selbst hier unten gibt es Licht", murmelt Tiefgang. "Manchmal muss man nur seine Augen anpassen."',
        choices: [
          {
            id: 'o2-s4-c1',
            text: 'Folge dem kleinen Licht',
            nextSceneId: 'o2-s5',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 3 }
          },
          {
            id: 'o2-s4-c2',
            text: 'Suche nach mehr Lichtern in der Dunkelheit',
            nextSceneId: 'o2-s5',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'o2-s4-c3',
            text: 'Frage Tiefgang, ob er dein Licht sein kann',
            nextSceneId: 'o2-s5',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 3 }
          }
        ]
      },
      {
        id: 'o2-s5',
        content: 'Plötzlich fühlst du eine Strömung – sanft, aber beständig, die dich nach oben zieht. "Das ist der Wille zum Leben", sagt Tiefgang. "Er ist immer da, auch wenn du ihn nicht spürst."',
        choices: [
          {
            id: 'o2-s5-c1',
            text: 'Lass dich von der Strömung tragen',
            nextSceneId: 'o2-s6',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'o2-s5-c2',
            text: 'Schwimme mit der Strömung',
            nextSceneId: 'o2-s6',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 3 }
          },
          {
            id: 'o2-s5-c3',
            text: 'Danke der Strömung für ihre Hilfe',
            nextSceneId: 'o2-s6',
            points: { empathyPoints: 3, insightPoints: 3, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'o2-s6',
        content: 'Du durchbrichst die Oberfläche. Das Sonnenlicht blendet dich, aber es fühlt sich wunderbar an. "Du bist zurückgekommen", sagt Tiefgang. "Und wenn du wieder sinkst – und das wirst du – weißt du jetzt, wie man aufsteigt."',
        choices: [
          {
            id: 'o2-s6-c1',
            text: 'Verspreche, um Hilfe zu bitten, wenn du wieder sinkst',
            nextSceneId: 'o2-s7',
            points: { empathyPoints: 3, insightPoints: 3, couragePoints: 3 }
          },
          {
            id: 'o2-s6-c2',
            text: 'Genieße den Moment im Licht',
            nextSceneId: 'o2-s7',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'o2-s6-c3',
            text: 'Frage, wie man anderen hilft, die in der Tiefe sind',
            nextSceneId: 'o2-s7',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'o2-s7',
        content: 'Tiefgang taucht wieder unter. "Die Tiefe wird immer Teil des Ozeans sein. Aber du bist mehr als deine dunkelsten Momente." Seine Worte bleiben bei dir, während du auf den Wellen schaukelst.',
        choices: [
          {
            id: 'o2-s7-c1',
            text: 'Atme die Hoffnung ein',
            nextSceneId: null,
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 3 }
          },
          {
            id: 'o2-s7-c2',
            text: 'Merke dir Tiefgangs Worte',
            nextSceneId: null,
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'o2-s7-c3',
            text: 'Entscheide, dass du nicht allein kämpfen musst',
            nextSceneId: null,
            points: { empathyPoints: 3, insightPoints: 3, couragePoints: 3 }
          }
        ]
      }
    ],
    completed: false
  },

  // Scenario 3: Das Versteck
  {
    id: 'ocean-scenario-3',
    title: 'Coralies Schneckenhaus',
    description: 'Coralie versteckt sich vor der Welt. Emotionale Vermeidung und der Mut, verletzlich zu sein.',
    islandId: 'ocean' as IslandId,
    difficulty: 'medium',
    estimatedTime: '15-20 min',
    themes: ['Vermeidung', 'Verletzlichkeit', 'Schutz'],
    scenes: [
      {
        id: 'o3-s1',
        content: 'Coralie hat sich tief in ihr Schneckenhaus zurückgezogen. Nur ihre kleinen Augen schauen heraus. "Geh weg", sagt sie leise. "Hier drinnen kann mir nichts passieren."',
        choices: [
          {
            id: 'o3-s1-c1',
            text: 'Respektiere ihren Wunsch und bleibe in der Nähe',
            nextSceneId: 'o3-s2',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 1 }
          },
          {
            id: 'o3-s1-c2',
            text: 'Versuche, sie rauszulocken',
            nextSceneId: 'o3-s2',
            points: { empathyPoints: 1, insightPoints: 1, couragePoints: 2 }
          },
          {
            id: 'o3-s1-c3',
            text: 'Frage, was sie so sehr erschreckt hat',
            nextSceneId: 'o3-s2',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'o3-s2',
        content: 'Nach einer Weile flüstert Coralie: "Da draußen... da draußen wird man enttäuscht. Man wird verletzt. Man fühlt zu viel." Ihre Stimme zittert. "Hier drinnen ist es sicher."',
        choices: [
          {
            id: 'o3-s2-c1',
            text: 'Erkenne an, dass Sicherheit wichtig ist',
            nextSceneId: 'o3-s3',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 1 }
          },
          {
            id: 'o3-s2-c2',
            text: 'Erzähle von einer Zeit, als du verletzt wurdest',
            nextSceneId: 'o3-s3',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 3 }
          },
          {
            id: 'o3-s2-c3',
            text: 'Frage, ob sie sich nicht auch einsam fühlt',
            nextSceneId: 'o3-s3',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'o3-s3',
        content: 'Coralie kommt ein kleines Stück heraus. "Manchmal... manchmal möchte ich rauskommen. Aber was, wenn ich dann noch mehr Schmerz fühle? Was, wenn ich zusammenbreche?"',
        choices: [
          {
            id: 'o3-s3-c1',
            text: 'Versichere ihr, dass du da sein wirst',
            nextSceneId: 'o3-s4',
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 2 }
          },
          {
            id: 'o3-s3-c2',
            text: 'Sage, dass Gefühle einen nicht zerbrechen können',
            nextSceneId: 'o3-s4',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'o3-s3-c3',
            text: 'Schlage vor, nur einen kleinen Schritt zu wagen',
            nextSceneId: 'o3-s4',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'o3-s4',
        content: 'Wellentanz erscheint, sanft und beruhigend. "Coralie, erinnerst du dich, wie es ist, auf den Wellen zu tanzen? Das Salz auf der Haut, den Wind?" Coralies Augen werden weich.',
        choices: [
          {
            id: 'o3-s4-c1',
            text: 'Frage Coralie nach ihren schönsten Erinnerungen',
            nextSceneId: 'o3-s5',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'o3-s4-c2',
            text: 'Lass Wellentanz weitersprechen',
            nextSceneId: 'o3-s5',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 1 }
          },
          {
            id: 'o3-s4-c3',
            text: 'Biete Coralie deine Hand an',
            nextSceneId: 'o3-s5',
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 3 }
          }
        ]
      },
      {
        id: 'o3-s5',
        content: 'Coralie kriecht langsam heraus. Sie zittert. "Ich habe solche Angst", gesteht sie. "Aber ich bin auch so müde vom Verstecken. Ich fühle mich wie lebendig begraben."',
        choices: [
          {
            id: 'o3-s5-c1',
            text: 'Sage ihr, wie mutig sie ist',
            nextSceneId: 'o3-s6',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 3 }
          },
          {
            id: 'o3-s5-c2',
            text: 'Bleibe ruhig neben ihr',
            nextSceneId: 'o3-s6',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 1 }
          },
          {
            id: 'o3-s5-c3',
            text: 'Erinnere sie, dass sie jederzeit zurück kann',
            nextSceneId: 'o3-s6',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'o3-s6',
        content: 'Coralie steht vollständig draußen. Eine Welle kommt und... sie lacht. Es ist ein kleines, erschrockenes Lachen, aber es ist echt. "Ich... ich hatte vergessen, wie sich das anfühlt."',
        choices: [
          {
            id: 'o3-s6-c1',
            text: 'Feiere diesen Moment mit ihr',
            nextSceneId: null,
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'o3-s6-c2',
            text: 'Frage, ob sie bereit ist, mehr zu fühlen',
            nextSceneId: null,
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'o3-s6-c3',
            text: 'Erkläre, dass Verletzlichkeit Stärke ist',
            nextSceneId: null,
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 3 }
          }
        ]
      }
    ],
    completed: false
  },

  // Scenario 4: Die Wellen der Emotion
  {
    id: 'ocean-scenario-4',
    title: 'Wellentanz und der Sturm',
    description: 'Lernen, dass Emotionen in Wellen kommen und dass auch schwere Gefühle vorbeigehen.',
    islandId: 'ocean' as IslandId,
    difficulty: 'medium',
    estimatedTime: '12-15 min',
    themes: ['Emotionale Wellen', 'Vergänglichkeit', 'Akzeptanz'],
    scenes: [
      {
        id: 'o4-s1',
        content: 'Der Ozean ist unruhig. Wellentanz wirbelt wild umher. "Fühlst du es?" ruft sie. "Die Traurigkeit kommt wie ein Sturm! Sie ist groß, so groß!" Die Wellen türmen sich auf.',
        choices: [
          {
            id: 'o4-s1-c1',
            text: 'Versuche, die Wellen zu stoppen',
            nextSceneId: 'o4-s2',
            points: { empathyPoints: 1, insightPoints: 1, couragePoints: 2 }
          },
          {
            id: 'o4-s1-c2',
            text: 'Frage Wellentanz, wie man durch Wellen taucht',
            nextSceneId: 'o4-s2',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'o4-s1-c3',
            text: 'Lass dich von der Welle tragen',
            nextSceneId: 'o4-s2',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 3 }
          }
        ]
      },
      {
        id: 'o4-s2',
        content: 'Eine riesige Welle überspült dich – Traurigkeit, Wut, Verzweiflung, alles auf einmal. Es fühlt sich an, als würdest du ertrinken. Aber dann... bist du auf der anderen Seite. Du atmest noch.',
        choices: [
          {
            id: 'o4-s2-c1',
            text: 'Erkenne, dass du überlebt hast',
            nextSceneId: 'o4-s3',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 3 }
          },
          {
            id: 'o4-s2-c2',
            text: 'Habe Angst vor der nächsten Welle',
            nextSceneId: 'o4-s3',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 1 }
          },
          {
            id: 'o4-s2-c3',
            text: 'Danke Wellentanz für die Lektion',
            nextSceneId: 'o4-s3',
            points: { empathyPoints: 3, insightPoints: 3, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'o4-s3',
        content: 'Wellentanz beruhigt sich etwas. "Siehst du?" sagt sie atemlos. "Ich komme immer wieder. Manchmal sanft, manchmal wild. Aber ich bleibe nie für immer gleich."',
        choices: [
          {
            id: 'o4-s3-c1',
            text: 'Verstehe, dass Gefühle sich verändern',
            nextSceneId: 'o4-s4',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'o4-s3-c2',
            text: 'Frage, wie man die Intensität aushält',
            nextSceneId: 'o4-s4',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'o4-s3-c3',
            text: 'Beobachte das Muster der Wellen',
            nextSceneId: 'o4-s4',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'o4-s4',
        content: 'Eine sanfte Welle folgt. Dann eine mittlere. Dann wieder eine wilde. "Manche Menschen versuchen, mich zu kontrollieren", sagt Wellentanz. "Aber das bin nicht ich. Ich bin die Bewegung selbst."',
        choices: [
          {
            id: 'o4-s4-c1',
            text: 'Akzeptiere, dass man Gefühle nicht kontrollieren kann',
            nextSceneId: 'o4-s5',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 3 }
          },
          {
            id: 'o4-s4-c2',
            text: 'Frage, wie man mit der Unvorhersehbarkeit umgeht',
            nextSceneId: 'o4-s5',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'o4-s4-c3',
            text: 'Lerne, auf den Wellen zu reiten',
            nextSceneId: 'o4-s5',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 3 }
          }
        ]
      },
      {
        id: 'o4-s5',
        content: 'Der Ozean wird ruhiger. Wellentanz flüstert: "Die stärksten Schwimmer kämpfen nicht gegen die Wellen. Sie bewegen sich mit ihnen." Das Wasser glitzert im Mondlicht.',
        choices: [
          {
            id: 'o4-s5-c1',
            text: 'Übe, mit den Gefühlswellen zu fließen',
            nextSceneId: 'o4-s6',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 3 }
          },
          {
            id: 'o4-s5-c2',
            text: 'Bedanke dich für diese Weisheit',
            nextSceneId: 'o4-s6',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'o4-s5-c3',
            text: 'Frage, was man tut, wenn man erschöpft ist',
            nextSceneId: 'o4-s6',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 3 }
          }
        ]
      },
      {
        id: 'o4-s6',
        content: 'Wellentanz umarmt dich sanft. "Du hast den Sturm überlebt. Und du wirst den nächsten auch überleben. Jedes Mal wirst du stärker, weiser, vertrauter mit meinen Rhythmen."',
        choices: [
          {
            id: 'o4-s6-c1',
            text: 'Glaube daran, dass du es schaffen wirst',
            nextSceneId: null,
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 3 }
          },
          {
            id: 'o4-s6-c2',
            text: 'Verspreche, nicht mehr gegen die Wellen zu kämpfen',
            nextSceneId: null,
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 3 }
          },
          {
            id: 'o4-s6-c3',
            text: 'Schwimme ruhig in der Stille nach dem Sturm',
            nextSceneId: null,
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 2 }
          }
        ]
      }
    ],
    completed: false
  },

  // Scenario 5: Heilung durch Verbindung
  {
    id: 'ocean-scenario-5',
    title: 'Das Riff der Heilung',
    description: 'Ein Korallenriff symbolisiert, wie Heilung durch Verbindung und Gemeinschaft geschieht.',
    islandId: 'ocean' as IslandId,
    difficulty: 'easy',
    estimatedTime: '10-15 min',
    themes: ['Heilung', 'Gemeinschaft', 'Unterstützung'],
    scenes: [
      {
        id: 'o5-s1',
        content: 'Du findest ein Korallenriff – bunt, lebendig, voller Bewegung. Jede Koralle wächst neben der anderen. "Wir heilen nie allein", sagt Marina, die neben dir schwimmt.',
        choices: [
          {
            id: 'o5-s1-c1',
            text: 'Frage, wie das Riff so stark wurde',
            nextSceneId: 'o5-s2',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'o5-s1-c2',
            text: 'Berühre vorsichtig eine Koralle',
            nextSceneId: 'o5-s2',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'o5-s1-c3',
            text: 'Beobachte, wie die Lebewesen zusammenarbeiten',
            nextSceneId: 'o5-s2',
            points: { empathyPoints: 3, insightPoints: 3, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'o5-s2',
        content: 'Marina zeigt auf eine gebrochene Koralle, die langsam heilt. "Siehst du? Die anderen um sie herum geben ihr Raum zum Wachsen. Sie urteilen nicht. Sie sind einfach da."',
        choices: [
          {
            id: 'o5-s2-c1',
            text: 'Verstehe, dass Heilung Zeit braucht',
            nextSceneId: 'o5-s3',
            points: { empathyPoints: 3, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'o5-s2-c2',
            text: 'Frage, ob du jemandem so helfen kannst',
            nextSceneId: 'o5-s3',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'o5-s2-c3',
            text: 'Erkenne dich selbst in der gebrochenen Koralle',
            nextSceneId: 'o5-s3',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 3 }
          }
        ]
      },
      {
        id: 'o5-s3',
        content: 'Ein Fischschwarm schwimmt vorbei, perfekt synchronisiert. "Manchmal", sagt Marina, "bedeutet Heilung, zu lernen, dass man Teil von etwas Größerem ist. Dass man nicht allein ist."',
        choices: [
          {
            id: 'o5-s3-c1',
            text: 'Denke an Menschen, die dich unterstützen',
            nextSceneId: 'o5-s4',
            points: { empathyPoints: 3, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'o5-s3-c2',
            text: 'Fühle dich immer noch isoliert',
            nextSceneId: 'o5-s4',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'o5-s3-c3',
            text: 'Frage, wie man um Hilfe bittet',
            nextSceneId: 'o5-s4',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 3 }
          }
        ]
      },
      {
        id: 'o5-s4',
        content: 'Alle vier – Marina, Tiefgang, Coralie und Wellentanz – versammeln sich am Riff. "Wir alle haben schwere Zeiten durchgemacht", sagt Tiefgang. "Aber wir sind hier, zusammen."',
        choices: [
          {
            id: 'o5-s4-c1',
            text: 'Teile deine eigenen schwierigen Gefühle',
            nextSceneId: 'o5-s5',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 3 }
          },
          {
            id: 'o5-s4-c2',
            text: 'Höre den Geschichten der anderen zu',
            nextSceneId: 'o5-s5',
            points: { empathyPoints: 3, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'o5-s4-c3',
            text: 'Danke ihnen für ihre Offenheit',
            nextSceneId: 'o5-s5',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'o5-s5',
        content: 'Das Riff scheint heller zu leuchten. Coralie flüstert: "Wenn ich meine Geschichte teile, fühlt sie sich weniger schwer an." Die anderen nicken. Auch du spürst eine Leichtigkeit.',
        choices: [
          {
            id: 'o5-s5-c1',
            text: 'Verspreche, deine Geschichte zu teilen',
            nextSceneId: 'o5-s6',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 3 }
          },
          {
            id: 'o5-s5-c2',
            text: 'Frage, wie man sichere Menschen findet',
            nextSceneId: 'o5-s6',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'o5-s5-c3',
            text: 'Biete an, für andere da zu sein',
            nextSceneId: 'o5-s6',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 3 }
          }
        ]
      },
      {
        id: 'o5-s6',
        content: 'Die Gruppe umarmt sich sanft. "Das Riff erinnert uns daran", sagt Marina, "dass wir stärker sind, wenn wir zusammen wachsen. Narben und alles."',
        choices: [
          {
            id: 'o5-s6-c1',
            text: 'Akzeptiere, dass Heilung möglich ist',
            nextSceneId: null,
            points: { empathyPoints: 3, insightPoints: 3, couragePoints: 3 }
          },
          {
            id: 'o5-s6-c2',
            text: 'Werde Teil dieser Gemeinschaft',
            nextSceneId: null,
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 3 }
          },
          {
            id: 'o5-s6-c3',
            text: 'Verspreche, nie aufzugeben',
            nextSceneId: null,
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 3 }
          }
        ]
      }
    ],
    completed: false
  },

  // Scenario 6: Die Perle im Schmerz
  {
    id: 'ocean-scenario-6',
    title: 'Die Perle der Transformation',
    description: 'Wie Schmerz und Traurigkeit uns formen können, ohne uns zu definieren.',
    islandId: 'ocean' as IslandId,
    difficulty: 'medium',
    estimatedTime: '15-20 min',
    themes: ['Transformation', 'Wachstum', 'Sinn finden'],
    scenes: [
      {
        id: 'o6-s1',
        content: 'Eine Auster liegt am Meeresboden. "Darf ich dir etwas zeigen?" fragt Tiefgang. Er öffnet sie vorsichtig – darin liegt eine wunderschöne Perle. "Weißt du, wie sie entsteht?"',
        choices: [
          {
            id: 'o6-s1-c1',
            text: 'Schüttle den Kopf und höre zu',
            nextSceneId: 'o6-s2',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'o6-s1-c2',
            text: 'Sage, dass Perlen aus Irritation entstehen',
            nextSceneId: 'o6-s2',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'o6-s1-c3',
            text: 'Berühre die Perle sanft',
            nextSceneId: 'o6-s2',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'o6-s2',
        content: 'Tiefgang erklärt: "Ein Sandkorn dringt ein – es tut weh, stört. Die Auster kann es nicht rauswerfen. Also umhüllt sie es, Schicht für Schicht, bis etwas Schönes entsteht."',
        choices: [
          {
            id: 'o6-s2-c1',
            text: 'Verstehe die Metapher',
            nextSceneId: 'o6-s3',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'o6-s2-c2',
            text: 'Frage, ob Schmerz also gut ist',
            nextSceneId: 'o6-s3',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'o6-s2-c3',
            text: 'Denke an deinen eigenen Schmerz',
            nextSceneId: 'o6-s3',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 3 }
          }
        ]
      },
      {
        id: 'o6-s3',
        content: '"Der Schmerz ist nicht gut", sagt Tiefgang sanft. "Aber manchmal können wir ihn in etwas verwandeln. Nicht weil wir müssen, sondern weil wir können."',
        choices: [
          {
            id: 'o6-s3-c1',
            text: 'Frage, wie man das macht',
            nextSceneId: 'o6-s4',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'o6-s3-c2',
            text: 'Sage, dass dein Schmerz zu groß ist',
            nextSceneId: 'o6-s4',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 3 }
          },
          {
            id: 'o6-s3-c3',
            text: 'Überlege, was deine Perle sein könnte',
            nextSceneId: 'o6-s4',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'o6-s4',
        content: 'Marina schwimmt näher. "Meine Perle ist meine Musik. Der Verlust hat mir beigebracht, tiefer zu singen, ehrlicher. Meine Trauer ist jetzt Teil meiner Melodien."',
        choices: [
          {
            id: 'o6-s4-c1',
            text: 'Bewundere ihre Transformation',
            nextSceneId: 'o6-s5',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'o6-s4-c2',
            text: 'Frage, ob der Schmerz dann weg ist',
            nextSceneId: 'o6-s5',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'o6-s4-c3',
            text: 'Teile eine Idee für deine eigene Transformation',
            nextSceneId: 'o6-s5',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 3 }
          }
        ]
      },
      {
        id: 'o6-s5',
        content: 'Coralie kommt aus ihrem Schneckenhaus. "Meine Perle ist, dass ich jetzt verstehe, wann ich Schutz brauche und wann ich mutig sein kann. Der Schmerz hat mich nicht zerbrochen – er hat mich gelehrt."',
        choices: [
          {
            id: 'o6-s5-c1',
            text: 'Erkenne, dass Wachstum aus Schmerz kommen kann',
            nextSceneId: 'o6-s6',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 3 }
          },
          {
            id: 'o6-s5-c2',
            text: 'Frage, wie lange die Transformation dauert',
            nextSceneId: 'o6-s6',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'o6-s5-c3',
            text: 'Danke ihnen für ihre Geschichten',
            nextSceneId: 'o6-s6',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'o6-s6',
        content: 'Tiefgang gibt dir die Perle. "Das ist für dich. Eine Erinnerung, dass dein Schmerz dich nicht definiert, aber er kann dich formen, wenn du bereit bist. Du entscheidest, wann."',
        choices: [
          {
            id: 'o6-s6-c1',
            text: 'Nimm die Perle an und verspreche, zu wachsen',
            nextSceneId: null,
            points: { empathyPoints: 3, insightPoints: 3, couragePoints: 3 }
          },
          {
            id: 'o6-s6-c2',
            text: 'Halte die Perle fest und fühle ihre Bedeutung',
            nextSceneId: null,
            points: { empathyPoints: 3, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'o6-s6-c3',
            text: 'Beginne, deine eigene Perle zu erschaffen',
            nextSceneId: null,
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 3 }
          }
        ]
      }
    ],
    completed: false
  }
];

// Activities
export const oceanActivities: OceanActivity[] = [
  {
    id: 'ocean-journal',
    title: 'Tagebuch der Tiefen',
    description: 'Schreibe deine tiefsten Gefühle auf, wie Botschaften in Flaschenpost.',
    type: 'reflection',
    duration: '10-15 min',
    difficulty: 'easy',
    islandId: 'ocean' as IslandId,
    instructions: [
      'Finde einen ruhigen Ort',
      'Schreibe über ein schwieriges Gefühl, das du gerade hast',
      'Beschreibe es wie eine Welle: Wie fühlt es sich an? Wie stark ist es?',
      'Schreibe, was du brauchst, wenn diese Welle kommt',
      'Unterschreibe als "Der Kapitän deines Ozeans"'
    ],
    completed: false
  },
  {
    id: 'ocean-meditation',
    title: 'Die Atem-Wellen',
    description: 'Eine Atemübung, die dich mit dem Rhythmus des Ozeans verbindet.',
    type: 'meditation',
    duration: '5-10 min',
    difficulty: 'easy',
    islandId: 'ocean' as IslandId,
    instructions: [
      'Setze oder lege dich bequem hin',
      'Schließe die Augen und stelle dir Wellen vor',
      'Atme ein (4 Sekunden) – die Welle kommt',
      'Halte den Atem (2 Sekunden) – die Welle am Höchsten',
      'Atme aus (6 Sekunden) – die Welle zieht sich zurück',
      'Wiederhole 10 Mal',
      'Öffne die Augen und spüre die Ruhe'
    ],
    completed: false
  },
  {
    id: 'ocean-reflection',
    title: 'Mein emotionaler Ozean',
    description: 'Kartiere deine emotionale Landschaft mit Meeresmetaphern.',
    type: 'creative',
    duration: '15-20 min',
    difficulty: 'medium',
    islandId: 'ocean' as IslandId,
    instructions: [
      'Zeichne einen Ozean auf Papier',
      'Male die Oberfläche: Wie geht es dir nach außen?',
      'Zeichne die mittlere Schicht: Was fühlst du wirklich?',
      'Male die Tiefe: Was verbirgst du vor anderen?',
      'Füge Meereslebewesen hinzu, die deine Gefühle repräsentieren',
      'Betrachte deine Karte: Was lernst du über dich?'
    ],
    completed: false
  },
  {
    id: 'ocean-grounding',
    title: 'Der Anker',
    description: 'Eine Erdungsübung für stürmische Gefühlsmomente.',
    type: 'breathing',
    duration: '5 min',
    difficulty: 'easy',
    islandId: 'ocean' as IslandId,
    instructions: [
      'Wenn die Emotionen zu stark werden, stelle dir vor, du bist ein Anker',
      'Spüre deine Füße auf dem Boden (oder deinen Körper auf dem Stuhl)',
      'Nenne 5 Dinge, die du siehst',
      'Nenne 4 Dinge, die du hören kannst',
      'Nenne 3 Dinge, die du fühlen kannst',
      'Nenne 2 Dinge, die du riechen kannst',
      'Nenne 1 Sache, für die du dankbar bist',
      'Atme tief. Du bist verankert.'
    ],
    completed: false
  },
  {
    id: 'ocean-letter',
    title: 'Brief an die Traurigkeit',
    description: 'Schreibe einen Brief an deine Traurigkeit, um sie besser zu verstehen.',
    type: 'creative',
    duration: '15 min',
    difficulty: 'medium',
    islandId: 'ocean' as IslandId,
    instructions: [
      'Beginne: "Liebe Traurigkeit..."',
      'Frage sie, warum sie hier ist',
      'Erkenne an, was sie dir zeigen möchte',
      'Schreibe, wie es sich anfühlt, sie zu tragen',
      'Sage ihr, was du brauchst',
      'Beende mit: "Ich sehe dich, und ich bin stark genug"',
      'Lies den Brief laut vor (wenn du möchtest)',
      'Bewahre ihn auf oder lass ihn symbolisch im Meer los'
    ],
    completed: false
  }
];

// Wisdom Cards
export const oceanWisdomCards: WisdomCard[] = [
  {
    id: 'ocean-wisdom-1',
    title: 'Die Tiefe des Ozeans',
    content: 'Traurigkeit ist wie der Ozean – manchmal still, manchmal stürmisch, aber immer tief. Es ist okay, sich verloren in den Wellen zu fühlen.',
    category: 'insight',
    islandId: 'ocean' as IslandId,
    rarity: 'common',
    collectionOrder: 1,
    collected: false
  },
  {
    id: 'ocean-wisdom-2',
    title: 'Tränen wie Salzwasser',
    content: 'Weinen ist nicht Schwäche. Es ist der Beweis, dass du tief fühlst, dass du mutig genug bist, deinen Schmerz anzuerkennen.',
    category: 'comfort',
    islandId: 'ocean' as IslandId,
    rarity: 'common',
    collectionOrder: 2,
    collected: false
  },
  {
    id: 'ocean-wisdom-3',
    title: 'Wellen der Emotion',
    content: 'Gefühle kommen in Wellen. Selbst die größte Welle ebbt irgendwann ab. Du musst nur atmen und treiben, bis sie vorüber ist.',
    category: 'strategy',
    islandId: 'ocean' as IslandId,
    rarity: 'common',
    collectionOrder: 3,
    collected: false
  },
  {
    id: 'ocean-wisdom-4',
    title: 'Die Kunst des Tauchens',
    content: 'Manchmal muss man durch den Schmerz tauchen, nicht um ihn. Auf der anderen Seite wartet Verständnis.',
    category: 'insight',
    islandId: 'ocean' as IslandId,
    rarity: 'rare',
    collectionOrder: 4,
    collected: false
  },
  {
    id: 'ocean-wisdom-5',
    title: 'Der Wal in der Tiefe',
    content: 'Auch in der dunkelsten Tiefe gibt es Leben, Bewegung, Schönheit. Depression lügt, wenn sie sagt, es gäbe keinen Weg nach oben.',
    category: 'comfort',
    islandId: 'ocean' as IslandId,
    rarity: 'rare',
    collectionOrder: 5,
    collected: false
  },
  {
    id: 'ocean-wisdom-6',
    title: 'Das Schneckenhaus',
    content: 'Es ist okay, sich manchmal zu verstecken. Aber vergiss nicht: Du bist mehr als dein Schutzpanzer. Du darfst auch verletzlich sein.',
    category: 'strategy',
    islandId: 'ocean' as IslandId,
    rarity: 'common',
    collectionOrder: 6,
    collected: false
  },
  {
    id: 'ocean-wisdom-7',
    title: 'Trauer als Liebe',
    content: 'Trauer ist Liebe ohne Ziel. Sie zeigt, wie tief du gefühlt hast, wie sehr du geliebt hast. Das ist keine Schwäche – es ist ein Geschenk.',
    category: 'insight',
    islandId: 'ocean' as IslandId,
    rarity: 'epic',
    collectionOrder: 7,
    collected: false
  },
  {
    id: 'ocean-wisdom-8',
    title: 'Die Strömung des Lebens',
    content: 'Manche Tage wirst du gegen die Strömung schwimmen. An anderen Tagen lass dich einfach treiben. Beide Arten zu sein sind okay.',
    category: 'strategy',
    islandId: 'ocean' as IslandId,
    rarity: 'common',
    collectionOrder: 8,
    collected: false
  },
  {
    id: 'ocean-wisdom-9',
    title: 'Das Korallenriff',
    content: 'Heilung geschieht in Gemeinschaft. Wie Korallen im Riff wachsen wir stärker, wenn wir nicht allein sind.',
    category: 'comfort',
    islandId: 'ocean' as IslandId,
    rarity: 'rare',
    collectionOrder: 9,
    collected: false
  },
  {
    id: 'ocean-wisdom-10',
    title: 'Die Perle der Transformation',
    content: 'Eine Perle entsteht aus Schmerz, aber sie wird zu etwas Schönem. Dein Schmerz definiert dich nicht, aber er kann dich formen.',
    category: 'insight',
    islandId: 'ocean' as IslandId,
    rarity: 'epic',
    collectionOrder: 10,
    collected: false
  },
  {
    id: 'ocean-wisdom-11',
    title: 'Der Rhythmus der Gezeiten',
    content: 'Wie die Gezeiten kommen und gehen auch deine Gefühle. Nichts ist permanent – weder die Traurigkeit noch die Freude.',
    category: 'insight',
    islandId: 'ocean' as IslandId,
    rarity: 'rare',
    collectionOrder: 11,
    collected: false
  },
  {
    id: 'ocean-wisdom-12',
    title: 'Biolumineszenz',
    content: 'Selbst in der tiefsten Dunkelheit gibt es Kreaturen, die ihr eigenes Licht tragen. Du trägst auch ein Licht in dir.',
    category: 'comfort',
    islandId: 'ocean' as IslandId,
    rarity: 'epic',
    collectionOrder: 12,
    collected: false
  },
  {
    id: 'ocean-wisdom-13',
    title: 'Der Atem des Wals',
    content: 'Wale tauchen tief, aber sie müssen an die Oberfläche kommen, um zu atmen. Vergiss nicht zu atmen, vergiss nicht aufzutauchen.',
    category: 'strategy',
    islandId: 'ocean' as IslandId,
    rarity: 'common',
    collectionOrder: 13,
    collected: false
  },
  {
    id: 'ocean-wisdom-14',
    title: 'Das Lied der Meerjungfrau',
    content: 'Deine Traurigkeit verdient es, gehört zu werden. Sing dein Lied, auch wenn es traurig ist. Jemand braucht es vielleicht.',
    category: 'comfort',
    islandId: 'ocean' as IslandId,
    rarity: 'rare',
    collectionOrder: 14,
    collected: false
  },
  {
    id: 'ocean-wisdom-15',
    title: 'Wellenkamm und Tal',
    content: 'Du kannst nicht nur auf dem Wellenkamm reiten. Die Täler gehören dazu. In jedem Tal sammelt sich die Kraft für die nächste Welle.',
    category: 'insight',
    islandId: 'ocean' as IslandId,
    rarity: 'rare',
    collectionOrder: 15,
    collected: false
  },
  {
    id: 'ocean-wisdom-16',
    title: 'Der Horizont',
    content: 'Der Horizont ist immer da, auch wenn der Sturm tobt. Es gibt immer eine Grenze zwischen Himmel und Meer, zwischen jetzt und später.',
    category: 'comfort',
    islandId: 'ocean' as IslandId,
    rarity: 'epic',
    collectionOrder: 16,
    collected: false
  }
];
