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
    description: 'Eine Meerjungfrau, die als Hüterin der stillen Bucht über die Trauernden wacht',
    backstory: 'Marina verlor ihren kleinen Bruder an die tiefen Strömungen. Seitdem bewacht sie die stille Bucht und empfängt alle, die mit Trauer ankommen. Sie singt leise Lieder, die den Schmerz nicht wegnehmen, aber ihn erträglicher machen. Sie weiß: Wer trauert, braucht zuerst jemanden, der einfach da ist.'
  },
  {
    id: 'tiefgang',
    name: 'Tiefgang',
    emoji: '🐋',
    description: 'Ein uralter Wal, der die Tiefen der Gefühle kennt wie kein anderer',
    backstory: 'Tiefgang hat in seinen vierhundert Jahren so viel Verlust erlebt, dass sein Gesang die tiefsten Gräben des Ozeans füllt. Er hat gelernt, dass man durch den Schmerz hindurchtauchen muss – nicht drum herum. Seine Weisheit ist ruhig, geduldig und manchmal überraschend humorvoll. Er sagt gern: "Ich bin alt genug, um zu wissen, dass Tränen salzig sind – genau wie mein Zuhause."'
  },
  {
    id: 'coralie',
    name: 'Coralie',
    emoji: '🐚',
    description: 'Ein Einsiedlerkrebs, der sich nach dem Verlust ihrer Zwillingsschwester versteckt',
    backstory: 'Coralie und ihre Schwester Perla waren unzertrennlich – bis Perla eines Tages einfach nicht mehr da war. Seitdem trägt Coralie ein viel zu großes Schneckenhaus, in dem eigentlich Platz für zwei wäre. Sie versteckt sich vor der Welt, weil alles draußen sie an das erinnert, was fehlt. Tief in ihrem Herzen weiß sie, dass Verstecken nicht heilt – aber es fühlt sich sicherer an als Fühlen.'
  },
  {
    id: 'wellentanz',
    name: 'Wellentanz',
    emoji: '🌊',
    description: 'Ein Wellengeist, der die ungezähmte Kraft der Gefühle verkörpert',
    backstory: 'Wellentanz ist weder gut noch böse – sie ist die reine Bewegung der Emotionen. Sie kann sanft wiegen oder gewaltig toben. Sie hat selbst nie jemanden verloren, aber sie trägt die Trauer aller Meeresbewohner in ihren Strömungen. Sie lehrt, dass Gefühle wie Wellen sind: Man kann sie nicht aufhalten, aber man kann lernen, auf ihnen zu reiten.'
  }
];

// Scenarios
export const oceanScenarios: Scenario[] = [
  // Scenario 1: Die stille Bucht
  {
    id: 'ocean-scenario-1',
    title: 'Die stille Bucht',
    description: 'Du erreichst die Ozeaninsel – ein Ort der Stille nach dem Vulkan. Marina empfängt dich und zeigt dir, dass Traurigkeit zum Ozean gehört.',
    islandId: 'ocean' as IslandId,
    difficulty: 'easy',
    estimatedTime: '12-15 min',
    themes: ['Trauer erkennen', 'Stille aushalten', 'Ankommen'],
    scenes: [
      {
        id: 'o1-s1',
        content: 'Nach der Hitze der Vulkaninsel erreichst du einen stillen Strand. Kein Wind. Keine Wellen. Das Meer liegt da wie ein riesiger Spiegel. Es ist fast unheimlich ruhig. Auf der Vulkaninsel hast du gelernt, Wut zu verstehen – aber dieses Gefühl hier ist anders. Schwerer. Stiller. Etwas in dir fühlt sich leer an.',
        choices: [
          {
            id: 'o1-s1-c1',
            text: 'Setze dich an den Strand und lass die Stille auf dich wirken',
            nextSceneId: 'o1-s2',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'o1-s1-c2',
            text: 'Rufe laut über das Wasser – irgendjemand muss doch hier sein',
            nextSceneId: 'o1-s2',
            points: { empathyPoints: 1, insightPoints: 1, couragePoints: 3 }
          },
          {
            id: 'o1-s1-c3',
            text: 'Gehe vorsichtig zum Wasser und berühre die Oberfläche',
            nextSceneId: 'o1-s2',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'o1-s2',
        content: 'Das Wasser kräuselt sich, und ein Kopf taucht auf – Marina, eine Meerjungfrau mit Augen so tief wie der Ozean selbst. "Du bist also hier", sagt sie leise. "Die meisten kommen hierher, wenn sie etwas verloren haben. Oder jemanden." Sie mustert dich. "Was bringt dich zur stillen Bucht?"',
        choices: [
          {
            id: 'o1-s2-c1',
            text: '"Ich weiß nicht genau. Ich fühle mich einfach... leer."',
            nextSceneId: 'o1-s3',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'o1-s2-c2',
            text: '"Ich habe jemanden verloren und weiß nicht, wohin mit dem Gefühl."',
            nextSceneId: 'o1-s3',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 3 }
          },
          {
            id: 'o1-s2-c3',
            text: '"Ich wollte eigentlich stark sein. Aber hier fühle ich mich klein."',
            nextSceneId: 'o1-s3',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'o1-s3',
        content: 'Marina nickt langsam. "Weißt du, warum die Bucht so still ist? Weil Traurigkeit leise ist. Wut schreit und tobt – das hast du auf dem Vulkan gelernt. Aber Trauer... Trauer flüstert. Und manchmal schweigt sie ganz." Sie zeigt auf den Horizont. "Unter der Oberfläche ist ein ganzer Ozean voller Gefühle. Die Frage ist: Traust du dich hinzuschauen?"',
        choices: [
          {
            id: 'o1-s3-c1',
            text: '"Ich habe ein bisschen Angst davor, aber ja."',
            nextSceneId: 'o1-s4',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 3 }
          },
          {
            id: 'o1-s3-c2',
            text: '"Was passiert, wenn ich hinschaue und es zu viel wird?"',
            nextSceneId: 'o1-s4',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'o1-s3-c3',
            text: '"Auf dem Vulkan habe ich gelernt, dass Weglaufen nichts bringt. Also ja."',
            nextSceneId: 'o1-s4',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 3 }
          }
        ]
      },
      {
        id: 'o1-s4',
        content: 'Marina lächelt sanft. "Mutig. Das mag ich." Sie taucht kurz unter und kommt mit einer kleinen, leuchtenden Muschel zurück. "Hier. Halte sie ans Ohr." Du hörst leise Stimmen – wie ferne Erinnerungen. Lachen. Weinen. Flüstern. "Das ist der Klang der Trauer", sagt Marina. "Sie klingt nicht nur traurig. Sie klingt nach allem, was einmal war."',
        choices: [
          {
            id: 'o1-s4-c1',
            text: 'Höre genau hin und versuche, die Stimmen zu verstehen',
            nextSceneId: 'o1-s5',
            points: { empathyPoints: 3, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'o1-s4-c2',
            text: 'Halte die Muschel fest – sie fühlt sich wichtig an',
            nextSceneId: 'o1-s5',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'o1-s4-c3',
            text: '"Warum tut Erinnern so weh, Marina?"',
            nextSceneId: 'o1-s5',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'o1-s5',
        content: '"Erinnern tut weh, weil das, woran du dich erinnerst, dir wichtig war", sagt Marina. Ihre Stimme wird leiser. "Ich hatte einen kleinen Bruder. Er ist in die tiefen Strömungen geraten und... nie zurückgekommen." Sie dreht sich zum Meer. "Am Anfang wollte ich nie wieder ins Wasser. Aber dann habe ich verstanden: Die Trauer gehört zum Ozean. Und der Ozean gehört zu mir."',
        choices: [
          {
            id: 'o1-s5-c1',
            text: '"Es tut mir leid. Danke, dass du mir das erzählst."',
            nextSceneId: 'o1-s6',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'o1-s5-c2',
            text: '"Vermisst du ihn immer noch?"',
            nextSceneId: 'o1-s6',
            points: { empathyPoints: 3, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'o1-s5-c3',
            text: '"Wie hast du es geschafft, trotzdem weiterzumachen?"',
            nextSceneId: 'o1-s6',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'o1-s6',
        content: '"Jeden Tag", antwortet Marina. "Aber weißt du was? Das ist okay. Traurigkeit ist kein Feind. Sie ist wie das Meer – sie zeigt dir, wie tief du lieben kannst." Die ersten Wellen rollen sanft an den Strand. Die Stille bricht. "Willkommen auf der Ozeaninsel", sagt Marina und reicht dir die Hand. "Hier lernst du, dass man nicht immer stark sein muss. Manchmal ist das Mutigste, was du tun kannst, einfach zu fühlen."',
        choices: [
          {
            id: 'o1-s6-c1',
            text: 'Nimm ihre Hand und lass die erste Träne zu',
            nextSceneId: null,
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 3 }
          },
          {
            id: 'o1-s6-c2',
            text: '"Ich bin bereit, den Ozean kennenzulernen."',
            nextSceneId: null,
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 3 }
          },
          {
            id: 'o1-s6-c3',
            text: 'Nicke still und schau aufs Meer – zum ersten Mal ohne Angst',
            nextSceneId: null,
            points: { empathyPoints: 3, insightPoints: 3, couragePoints: 2 }
          }
        ]
      }
    ],
    completed: false
  },

  // Scenario 2: Tiefgangs Tauchgang
  {
    id: 'ocean-scenario-2',
    title: 'Tiefgangs Tauchgang',
    description: 'Der weise Wal Tiefgang lädt dich ein, in die Tiefe zu tauchen. Dort, wo es dunkel wird, warten wichtige Erkenntnisse über Traurigkeit und Stärke.',
    islandId: 'ocean' as IslandId,
    difficulty: 'medium',
    estimatedTime: '18-22 min',
    themes: ['Traurigkeit zulassen', 'Tiefe Gefühle', 'Stärke durch Verletzlichkeit'],
    scenes: [
      {
        id: 'o2-s1',
        content: 'Am nächsten Morgen vibriert das Wasser. Ein gewaltiger Schatten gleitet unter der Oberfläche. Dann taucht er auf – Tiefgang, ein Wal so groß wie ein Haus, mit Augen voller Jahrhunderte. "Na, Vulkankind", brummt er. "Marina sagt, du willst den Ozean verstehen. Dann musst du tauchen. Tief tauchen." Er zwinkert. "Keine Sorge, ich bin alt genug, um auf dich aufzupassen."',
        choices: [
          {
            id: 'o2-s1-c1',
            text: '"Wie tief müssen wir denn tauchen?"',
            nextSceneId: 'o2-s2',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'o2-s1-c2',
            text: '"Ich habe noch nie so tief getaucht. Aber ich vertraue dir."',
            nextSceneId: 'o2-s2',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 3 }
          },
          {
            id: 'o2-s1-c3',
            text: '"Was ist da unten in der Tiefe?"',
            nextSceneId: 'o2-s2',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'o2-s2',
        content: 'Tiefgang taucht mit dir ab. Die Sonne wird schwächer. Die Farben verschwinden – erst Rot, dann Orange, dann Gelb. "Merkst du, wie sich das anfühlt?" fragt er. "So fühlt sich Traurigkeit an. Sie nimmt dir langsam die Farben weg. Nicht auf einmal. Schleichend." Die Welt um euch wird blaugrau.',
        choices: [
          {
            id: 'o2-s2-c1',
            text: '"Ja... so fühlt es sich manchmal an. Als würde alles grau werden."',
            nextSceneId: 'o2-s3',
            points: { empathyPoints: 3, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'o2-s2-c2',
            text: '"Können wir die Farben zurückholen?"',
            nextSceneId: 'o2-s3',
            points: { empathyPoints: 1, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'o2-s2-c3',
            text: 'Schweige und spüre, was die Dunkelheit mit dir macht',
            nextSceneId: 'o2-s3',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 3 }
          }
        ]
      },
      {
        id: 'o2-s3',
        content: '"Die Farben kommen zurück", sagt Tiefgang ruhig. "Aber erst musst du durch die Dunkelheit. Das ist der Teil, den die meisten nicht aushalten." Schattenhafte Formen schweben um euch – Gedanken, die wie Quallen im Dunkeln treiben. "Ich hätte etwas tun müssen", flüstert einer. "Es ist meine Schuld", seufzt ein anderer. "Ich bin allein."',
        choices: [
          {
            id: 'o2-s3-c1',
            text: '"Sind das... meine Gedanken?"',
            nextSceneId: 'o2-s4',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'o2-s3-c2',
            text: 'Höre ihnen zu, ohne sie zu glauben',
            nextSceneId: 'o2-s4',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 3 }
          },
          {
            id: 'o2-s3-c3',
            text: '"Tiefgang, ich habe Angst. Es wird so dunkel hier."',
            nextSceneId: 'o2-s4',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 3 }
          }
        ]
      },
      {
        id: 'o2-s4',
        content: '"Angst ist erlaubt", sagt Tiefgang warm. "Ich bin vierhundert Jahre alt, und weißt du was? Ich habe immer noch Angst vor der Dunkelheit. Der Unterschied ist: Ich weiß jetzt, dass sie mich nicht frisst." Er leuchtet schwach – Biolumineszenz. "Siehst du? Selbst hier unten gibt es Licht. Du musst es nur in dir finden." Ein kleiner Tiefsee-Fisch schwimmt neugierig zu euch, leuchtend wie ein winziger Stern.',
        choices: [
          {
            id: 'o2-s4-c1',
            text: 'Lächle den kleinen Fisch an – er erinnert dich daran, dass es Schönes gibt',
            nextSceneId: 'o2-s5',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'o2-s4-c2',
            text: '"Also ist Traurigsein nicht schwach sein?"',
            nextSceneId: 'o2-s5',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'o2-s4-c3',
            text: '"Wie finde ich mein eigenes Licht?"',
            nextSceneId: 'o2-s5',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'o2-s5',
        content: 'Tiefgang lacht – ein tiefes, donnerndes Lachen, das den ganzen Ozean vibrieren lässt. "Schwach? Kind, Traurigkeit zulassen ist das Stärkste, was man tun kann! Jeder kann so tun, als wäre alles okay. Aber hinschauen, wo es wehtut? Dafür braucht man echten Mut." Er schaut dich an. "Auf dem Vulkan hast du gelernt, dass Wut nicht dein Feind ist. Hier lernst du dasselbe über Trauer."',
        choices: [
          {
            id: 'o2-s5-c1',
            text: '"Also soll ich die Traurigkeit nicht bekämpfen, sondern... annehmen?"',
            nextSceneId: 'o2-s6',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'o2-s5-c2',
            text: '"Aber es tut so weh. Wie halte ich das aus?"',
            nextSceneId: 'o2-s6',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 3 }
          },
          {
            id: 'o2-s5-c3',
            text: '"Danke, Tiefgang. Ich glaube, ich verstehe langsam."',
            nextSceneId: 'o2-s6',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'o2-s6',
        content: '"Du hältst es aus, indem du nicht allein bist", sagt er sanft. "Und indem du dir erlaubst, Pausen zu machen. Sogar Wale müssen zum Atmen auftauchen." Eine warme Strömung erfasst euch und beginnt, euch langsam nach oben zu tragen. Das Licht wird stärker. Die Farben kehren zurück – erst Blau, dann Grün, dann Gold.',
        choices: [
          {
            id: 'o2-s6-c1',
            text: 'Genieße das Auftauchen und atme tief ein',
            nextSceneId: 'o2-s7',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 3 }
          },
          {
            id: 'o2-s6-c2',
            text: '"Die Farben... sie kommen wirklich zurück!"',
            nextSceneId: 'o2-s7',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'o2-s6-c3',
            text: 'Drücke dich dankbar an Tiefgangs Seite',
            nextSceneId: 'o2-s7',
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'o2-s7',
        content: 'Ihr durchbrecht die Oberfläche. Die Sonne blendet wunderbar. Tiefgang bläst eine Fontäne in die Luft, die im Sonnenlicht einen Regenbogen erzeugt. "Siehst du? Durch die Dunkelheit hindurch, nicht drum herum. Und wenn du wieder sinkst – und das wirst du, das ist normal – dann weißt du jetzt: Da unten ist es dunkel, aber nicht für immer."',
        choices: [
          {
            id: 'o2-s7-c1',
            text: '"Und wenn ich wieder sinke, weiß ich, dass ich auftauchen kann."',
            nextSceneId: null,
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 3 }
          },
          {
            id: 'o2-s7-c2',
            text: '"Darf ich wiederkommen, wenn es zu dunkel wird?"',
            nextSceneId: null,
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'o2-s7-c3',
            text: 'Schaue den Regenbogen an und spüre, dass Hoffnung kein leeres Wort ist',
            nextSceneId: null,
            points: { empathyPoints: 3, insightPoints: 3, couragePoints: 2 }
          }
        ]
      }
    ],
    completed: false
  },

  // Scenario 3: Coralies Versteck
  {
    id: 'ocean-scenario-3',
    title: 'Coralies Versteck',
    description: 'Coralie, der Einsiedlerkrebs, versteckt sich vor der Welt. Um ihr zu helfen, musst du entdecken, dass Verletzlichkeit keine Schwäche ist – und dass sie ihren eigenen Verlust trägt.',
    islandId: 'ocean' as IslandId,
    difficulty: 'medium',
    estimatedTime: '15-20 min',
    themes: ['Vermeidung', 'Verletzlichkeit', 'Geteilte Trauer'],
    scenes: [
      {
        id: 'o3-s1',
        content: 'Marina führt dich zu einem Felsvorsprung unter Wasser. "Hier lebt Coralie", flüstert sie. "Aber sie kommt seit Wochen nicht mehr raus." Du siehst ein großes Schneckenhaus, das leicht zittert. Von drinnen hörst du ein leises: "Geht weg. Ich will niemanden sehen. Nie wieder."',
        choices: [
          {
            id: 'o3-s1-c1',
            text: 'Setze dich neben das Schneckenhaus und warte geduldig',
            nextSceneId: 'o3-s2',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 1 }
          },
          {
            id: 'o3-s1-c2',
            text: '"Hey Coralie. Ich gehe nicht weg. Ich setze mich einfach hierhin, okay?"',
            nextSceneId: 'o3-s2',
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 2 }
          },
          {
            id: 'o3-s1-c3',
            text: 'Frage Marina leise, warum Coralie sich versteckt',
            nextSceneId: 'o3-s2',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'o3-s2',
        content: 'Stille. Dann, ganz leise: "Warum bist du noch da? Alle gehen irgendwann." Zwei kleine Augen schauen aus dem Schneckenhaus. "Alle gehen. So ist das. Man gewöhnt sich an jemanden, und dann... puff." Coralies Stimme ist dünn wie eine Haarqualle.',
        choices: [
          {
            id: 'o3-s2-c1',
            text: '"Ich bin noch da. Und ich gehe erst, wenn du es möchtest."',
            nextSceneId: 'o3-s3',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'o3-s2-c2',
            text: '"Hast du jemanden verloren, Coralie?"',
            nextSceneId: 'o3-s3',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 3 }
          },
          {
            id: 'o3-s2-c3',
            text: '"Ich verstehe, warum du Angst hast. Ich habe auch Angst."',
            nextSceneId: 'o3-s3',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 3 }
          }
        ]
      },
      {
        id: 'o3-s3',
        content: 'Coralie kommt ein winziges Stück heraus. Ihre Scheren zittern. "Meine Schwester. Perla. Wir waren Zwillinge. Wir haben alles zusammen gemacht – zusammen gesucht, zusammen gelacht, zusammen geschlafen. Dieses Schneckenhaus..." Sie klopft leise dagegen. "Das war für uns beide. Jetzt bin ich allein darin, und es ist viel zu groß und viel zu leer."',
        choices: [
          {
            id: 'o3-s3-c1',
            text: '"Das klingt unglaublich schwer. Ein Zuhause, das sich leer anfühlt."',
            nextSceneId: 'o3-s4',
            points: { empathyPoints: 3, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'o3-s3-c2',
            text: '"Was würde Perla sagen, wenn sie dich jetzt sehen könnte?"',
            nextSceneId: 'o3-s4',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 3 }
          },
          {
            id: 'o3-s3-c3',
            text: 'Setze dich näher zu ihr, damit das Schneckenhaus sich weniger leer anfühlt',
            nextSceneId: 'o3-s4',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'o3-s4',
        content: 'Coralies Augen werden feucht. "Perla würde sagen: \'Coralie, du Blödkrabbe, komm raus da!\'" Sie lacht kurz durch die Tränen. "Sie war immer die Mutigere. Sie hat mich immer aus dem Schneckenhaus gezerrt. Und jetzt..." Sie verstummt. "Jetzt ist die mutige Hälfte von mir weg."',
        choices: [
          {
            id: 'o3-s4-c1',
            text: '"Vielleicht hat Perla dir mehr Mut dagelassen, als du denkst."',
            nextSceneId: 'o3-s5',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'o3-s4-c2',
            text: '"Du bist gerade mutig. Du erzählst mir von ihr. Das ist riesig."',
            nextSceneId: 'o3-s5',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 3 }
          },
          {
            id: 'o3-s4-c3',
            text: '"Du musst es nicht allein schaffen. Andere können auch mutig für dich sein."',
            nextSceneId: 'o3-s5',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'o3-s5',
        content: 'Coralie kriecht langsam aus dem Schneckenhaus. Ganz langsam. Ihr kleiner Körper zittert im offenen Wasser. "Alles tut weh da draußen", flüstert sie. "Der Ozean erinnert mich an sie. Das Licht erinnert mich an sie. Sogar die Stille." Sie schaut dich an. "Aber das Verstecken... das tut auch weh. Nur anders."',
        choices: [
          {
            id: 'o3-s5-c1',
            text: '"Vielleicht ist der Schmerz des Erinnerns besser als der Schmerz des Versteckens."',
            nextSceneId: 'o3-s6',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 3 }
          },
          {
            id: 'o3-s5-c2',
            text: '"Du darfst reingehen, wenn es zu viel wird. Aber probiere das Draußen."',
            nextSceneId: 'o3-s6',
            points: { empathyPoints: 3, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'o3-s5-c3',
            text: 'Nimm vorsichtig ihre kleine Schere und halte sie fest',
            nextSceneId: 'o3-s6',
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 3 }
          }
        ]
      },
      {
        id: 'o3-s6',
        content: 'Eine sanfte Strömung bringt einen kleinen, glitzernden Stein vorbei. Coralie fängt ihn auf. "Perla hat immer glitzernde Steine gesammelt", sagt sie leise. Und dann passiert es: Sie lacht und weint gleichzeitig. "Weißt du was? Ich glaube... ich glaube, sie wollte nicht, dass ich mich für immer verstecke. Sie wollte, dass ich lebe. Für uns beide." Coralie steckt den Stein in ihr Schneckenhaus. "Ich gehe nicht ganz raus. Noch nicht. Aber ich lasse die Tür offen."',
        choices: [
          {
            id: 'o3-s6-c1',
            text: '"Das ist mehr als genug, Coralie. Eine offene Tür ist ein Anfang."',
            nextSceneId: null,
            points: { empathyPoints: 3, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'o3-s6-c2',
            text: '"Perla wäre stolz auf dich. Und ich bin es auch."',
            nextSceneId: null,
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 3 }
          },
          {
            id: 'o3-s6-c3',
            text: '"Ich besuche dich wieder. Versprochen."',
            nextSceneId: null,
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 2 }
          }
        ]
      }
    ],
    completed: false
  },

  // Scenario 4: Der Sturm
  {
    id: 'ocean-scenario-4',
    title: 'Der Sturm',
    description: 'Ein gewaltiger emotionaler Sturm trifft die Ozeaninsel. Du musst lernen, die Wellen zu reiten, statt gegen sie zu kämpfen – und verstehen, wie sich Trauer von Wut unterscheidet.',
    islandId: 'ocean' as IslandId,
    difficulty: 'hard',
    estimatedTime: '20-25 min',
    themes: ['Emotionale Überwältigung', 'Loslassen', 'Resilienz'],
    scenes: [
      {
        id: 'o4-s1',
        content: 'Der Himmel verdunkelt sich. Wellentanz rast über das Wasser, aufgeregt und besorgt zugleich. "Er kommt! Der große Sturm!" Die Wellen werden höher. Marina, Tiefgang und Coralie versammeln sich. "Das passiert, wenn zu viel Trauer auf einmal aufbricht", erklärt Tiefgang. "Der Ozean kann es nicht mehr halten."',
        choices: [
          {
            id: 'o4-s1-c1',
            text: '"Was müssen wir tun?"',
            nextSceneId: 'o4-s2',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 3 }
          },
          {
            id: 'o4-s1-c2',
            text: '"Können wir den Sturm aufhalten?"',
            nextSceneId: 'o4-s2',
            points: { empathyPoints: 1, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'o4-s1-c3',
            text: '"Ich kenne Stürme. Auf dem Vulkan gab es auch welche – aus Feuer."',
            nextSceneId: 'o4-s2',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'o4-s2',
        content: 'Wellentanz wirbelt um dich herum. "Aufhalten? Nein! Genauso wenig wie du deine Gefühle aufhalten kannst!" Eine riesige Welle baut sich auf. Tiefgang brummt: "Erinnerst du dich an den Vulkan? Wut lässt Lava steigen. Traurigkeit macht Wellen. Beides ist Energie, die raus will." Die Welle kracht über euch zusammen.',
        choices: [
          {
            id: 'o4-s2-c1',
            text: 'Versuche, gegen die Welle anzukämpfen',
            nextSceneId: 'o4-s3',
            points: { empathyPoints: 1, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'o4-s2-c2',
            text: 'Tauche unter die Welle hindurch',
            nextSceneId: 'o4-s3',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 3 }
          },
          {
            id: 'o4-s2-c3',
            text: 'Lass dich von der Welle tragen, so wie Wellentanz es tut',
            nextSceneId: 'o4-s3',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 3 }
          }
        ]
      },
      {
        id: 'o4-s3',
        content: 'Du tauchst auf, prustend und keuchend. Die nächste Welle kommt schon. Und die nächste. Es hört nicht auf. Marina ruft dir zu: "Nicht kämpfen! Bewegung, nicht Widerstand!" Wellentanz zeigt dir, wie sie sich mit den Wellen bewegt – nicht gegen sie, sondern durch sie hindurch, auf und ab, wie ein Tanz.',
        choices: [
          {
            id: 'o4-s3-c1',
            text: 'Versuche, Wellentanz nachzumachen – Bewegung statt Widerstand',
            nextSceneId: 'o4-s4',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 3 }
          },
          {
            id: 'o4-s3-c2',
            text: '"Ich kann nicht! Es ist zu viel!"',
            nextSceneId: 'o4-s4',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'o4-s3-c3',
            text: 'Klammere dich an Tiefgang fest',
            nextSceneId: 'o4-s4',
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'o4-s4',
        content: 'Coralie – ausgerechnet Coralie! – krabbelt aus ihrem Schneckenhaus und hält sich an dir fest. "Zusammen!", piepst sie. "Perla hat immer gesagt: Stürme übersteht man zusammen!" Marina singt, und ihr Lied beruhigt die Wellen um euch herum ein kleines bisschen. Tiefgang bildet einen Wellenbrecher mit seinem riesigen Körper.',
        choices: [
          {
            id: 'o4-s4-c1',
            text: 'Halte Coralie fest und konzentriere dich auf Marinas Lied',
            nextSceneId: 'o4-s5',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'o4-s4-c2',
            text: '"Wenn Coralie mutig genug ist, bin ich es auch!"',
            nextSceneId: 'o4-s5',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 3 }
          },
          {
            id: 'o4-s4-c3',
            text: 'Achte darauf, dass alle in Sicherheit sind, nicht nur du',
            nextSceneId: 'o4-s5',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 3 }
          }
        ]
      },
      {
        id: 'o4-s5',
        content: 'Plötzlich bist du mitten im Auge des Sturms. Absolute Stille. Über dir: ein perfekter Kreis blauer Himmel, umrahmt von tobenden Wolken. "Das ist der Moment der Wahrheit", sagt Wellentanz sanft. "Im Zentrum jedes Sturms ist Ruhe. In dir auch. Egal wie wild es draußen tobt."',
        choices: [
          {
            id: 'o4-s5-c1',
            text: 'Atme tief durch und finde die Ruhe in dir',
            nextSceneId: 'o4-s6',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 3 }
          },
          {
            id: 'o4-s5-c2',
            text: '"Ich spüre es. Auch wenn alles stürmt, gibt es einen ruhigen Ort in mir."',
            nextSceneId: 'o4-s6',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'o4-s5-c3',
            text: 'Schaue nach oben zum blauen Himmel und erinnere dich, dass der Sturm enden wird',
            nextSceneId: 'o4-s6',
            points: { empathyPoints: 3, insightPoints: 3, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'o4-s6',
        content: 'Der Sturm legt sich. Langsam. Die Wellen werden kleiner. Die Wolken ziehen ab. Überall schwimmen Trümmer im Wasser – aber auch Dinge, die der Sturm aus der Tiefe an die Oberfläche gebracht hat: bunte Muscheln, vergessene Schätze, alte Erinnerungen. Marina flüstert: "Stürme zerstören nicht nur. Sie bringen auch Verborgenes ans Licht."',
        choices: [
          {
            id: 'o4-s6-c1',
            text: 'Sammle eine der Muscheln auf – eine Erinnerung, die du verdrängt hattest',
            nextSceneId: 'o4-s7',
            points: { empathyPoints: 3, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'o4-s6-c2',
            text: '"Ich habe den Sturm überlebt. Wir alle haben."',
            nextSceneId: 'o4-s7',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 3 }
          },
          {
            id: 'o4-s6-c3',
            text: 'Schaue deine Freunde an – zusammen habt ihr es geschafft',
            nextSceneId: 'o4-s7',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'o4-s7',
        content: 'Wellentanz legt sich erschöpft um eure Gruppe wie eine warme Decke aus Wasser. "Ihr wart großartig", murmelt sie. "Der nächste Sturm wird kommen. Aber jetzt wisst ihr: Reitet die Wellen. Haltet euch aneinander fest. Und vergesst nie – im Zentrum jedes Sturms ist Ruhe." Coralie nickt tapfer. Marina singt leise. Tiefgang atmet tief. Und du weißt: Du bist stärker, als du dachtest.',
        choices: [
          {
            id: 'o4-s7-c1',
            text: '"Danke, dass ihr bei mir wart. Allein hätte ich das nicht geschafft."',
            nextSceneId: null,
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 3 }
          },
          {
            id: 'o4-s7-c2',
            text: '"Ich habe keine Angst mehr vor Stürmen. Nicht weil sie harmlos sind – sondern weil ich weiß, was ich tun kann."',
            nextSceneId: null,
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 3 }
          },
          {
            id: 'o4-s7-c3',
            text: 'Umarme die Gruppe und genieße die Stille nach dem Sturm',
            nextSceneId: null,
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 2 }
          }
        ]
      }
    ],
    completed: false
  },

  // Scenario 5: Das Korallenriff der Erinnerungen
  {
    id: 'ocean-scenario-5',
    title: 'Das Korallenriff der Erinnerungen',
    description: 'Tief im Ozean liegt ein magisches Riff, in dem Erinnerungen an verlorene Liebste als leuchtende Korallen weiterleben. Ein Ort der Heilung und des Erinnerns.',
    islandId: 'ocean' as IslandId,
    difficulty: 'medium',
    estimatedTime: '15-20 min',
    themes: ['Erinnerung', 'Heilung', 'Weiterleben der Liebe'],
    scenes: [
      {
        id: 'o5-s1',
        content: 'Marina nimmt dich bei der Hand. "Ich möchte dir etwas Besonderes zeigen. Etwas, das mir geholfen hat, als ich dachte, ich überlebe die Trauer nicht." Ihr taucht zusammen ab – aber diesmal ist es nicht dunkel. Ein warmes, goldenes Leuchten kommt von unten. "Das ist das Korallenriff der Erinnerungen", flüstert Marina. "Hier lebt alles weiter, was wir geliebt haben."',
        choices: [
          {
            id: 'o5-s1-c1',
            text: 'Schwimme staunend näher – das Leuchten fühlt sich warm an',
            nextSceneId: 'o5-s2',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'o5-s1-c2',
            text: '"Was meinst du mit – hier lebt es weiter?"',
            nextSceneId: 'o5-s2',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'o5-s1-c3',
            text: '"Ist dein Bruder auch hier?"',
            nextSceneId: 'o5-s2',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'o5-s2',
        content: 'Marina schwimmt zu einer hellblauen Koralle, die sanft pulsiert. "Das ist seine", sagt sie leise. "Mein Bruder. Jede Koralle hier ist eine Erinnerung an jemanden, der vermisst wird." Sie berührt die Koralle, und für einen Moment siehst du ein Bild: zwei kleine Meerjungfrauen, die lachend durch Seetang schwimmen. "Er hat immer gelacht", sagt Marina mit feuchten Augen und einem halben Lächeln.',
        choices: [
          {
            id: 'o5-s2-c1',
            text: '"Das ist wunderschön, Marina. Er sieht aus wie du."',
            nextSceneId: 'o5-s3',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'o5-s2-c2',
            text: '"Tut es weh, hierher zu kommen?"',
            nextSceneId: 'o5-s3',
            points: { empathyPoints: 3, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'o5-s2-c3',
            text: 'Berühre auch die Koralle und teile den Moment mit Marina',
            nextSceneId: 'o5-s3',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 3 }
          }
        ]
      },
      {
        id: 'o5-s3',
        content: '"Manchmal tut es weh", gibt Marina zu. "Aber es ist ein guter Schmerz. Wie wenn man einen Muskel trainiert." Weiter hinten im Riff leuchtet eine kleine rosafarbene Koralle – Coralies. Sie schwimmt darauf zu und berührt sie. Zwei identische kleine Krabben tauchen auf, die miteinander spielen. "Perla", flüstert Coralie. "Meine Schwester war die mit dem rosa Panzer."',
        choices: [
          {
            id: 'o5-s3-c1',
            text: 'Lege Coralie sanft die Hand auf den Panzer',
            nextSceneId: 'o5-s4',
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 2 }
          },
          {
            id: 'o5-s3-c2',
            text: '"Sie sieht fröhlich aus. Ihr wart ein gutes Team."',
            nextSceneId: 'o5-s4',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'o5-s3-c3',
            text: '"Die Erinnerungen hier sind voller Liebe, nicht nur voller Schmerz."',
            nextSceneId: 'o5-s4',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'o5-s4',
        content: 'Tiefgang schwebt herbei und zeigt auf eine ganze Reihe alter, mächtiger Korallen. "Vierhundert Jahre Erinnerungen", sagt er ruhig. "Freunde. Familie. Ganze Walherden." Er ist nicht traurig dabei – er strahlt eine tiefe Ruhe aus. "Weißt du, was das Schönste ist? Die Korallen wachsen. Jedes Mal, wenn ich mich erinnere, wachsen sie ein Stück. Erinnerung ist keine Last. Sie ist Nahrung."',
        choices: [
          {
            id: 'o5-s4-c1',
            text: '"Also sterben Erinnerungen nie, solange wir uns erinnern?"',
            nextSceneId: 'o5-s5',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'o5-s4-c2',
            text: '"Das ist... das Tröstlichste, was ich je gehört habe."',
            nextSceneId: 'o5-s5',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'o5-s4-c3',
            text: '"Darf ich auch eine Koralle hier pflanzen? Für jemanden, den ich vermisse?"',
            nextSceneId: 'o5-s5',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 3 }
          }
        ]
      },
      {
        id: 'o5-s5',
        content: 'Marina, Coralie und Tiefgang schauen dich an. "Natürlich darfst du", sagt Marina. "Denke an die Person. An einen Moment, der dir wichtig ist. An ein Gefühl." Du schließt die Augen. Eine Erinnerung steigt auf – warm, lebendig, ein bisschen schmerzhaft, aber auch schön. Unter deinen Händen beginnt etwas zu wachsen. Langsam. Leuchtend.',
        choices: [
          {
            id: 'o5-s5-c1',
            text: 'Lass die Erinnerung fließen – die schönen und die traurigen Teile',
            nextSceneId: 'o5-s6',
            points: { empathyPoints: 3, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'o5-s5-c2',
            text: 'Konzentriere dich auf das, was diese Person dir beigebracht hat',
            nextSceneId: 'o5-s6',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'o5-s5-c3',
            text: 'Lächle durch die Tränen – weil Erinnern beides sein darf',
            nextSceneId: 'o5-s6',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 3 }
          }
        ]
      },
      {
        id: 'o5-s6',
        content: 'Deine Koralle leuchtet in deiner Lieblingsfarbe. Sie ist klein, aber sie ist da – und sie wird wachsen, jedes Mal, wenn du dich erinnerst. Das ganze Riff erstrahlt für einen Moment heller, als hätte es deine Koralle willkommen geheißen. "Siehst du?", sagt Tiefgang. "Was wir lieben, verschwindet nicht. Es verändert seine Form. Von einer Person wird eine Erinnerung. Von einer Erinnerung wird ein Teil von dir." Marina singt, und ihr Lied klingt zum ersten Mal nicht nur traurig – es klingt dankbar.',
        choices: [
          {
            id: 'o5-s6-c1',
            text: '"Danke. Diesen Ort werde ich nie vergessen."',
            nextSceneId: null,
            points: { empathyPoints: 3, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'o5-s6-c2',
            text: '"Ich werde wiederkommen und meine Koralle besuchen."',
            nextSceneId: null,
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'o5-s6-c3',
            text: '"Trauer ist nicht das Ende. Sie ist eine Brücke zu dem, was bleibt."',
            nextSceneId: null,
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 3 }
          }
        ]
      }
    ],
    completed: false
  },

  // Scenario 6: Die Perle
  {
    id: 'ocean-scenario-6',
    title: 'Die Perle',
    description: 'Das große Finale: Du entdeckst, dass Schmerz – wie Sand in einer Auster – zu etwas Wertvollem werden kann. Aber dafür musst du allen Ozean-Freunden helfen, ihre Trauer anzunehmen.',
    islandId: 'ocean' as IslandId,
    difficulty: 'hard',
    estimatedTime: '22-28 min',
    themes: ['Transformation', 'Akzeptanz', 'Hoffnung', 'Gemeinschaft'],
    scenes: [
      {
        id: 'o6-s1',
        content: 'Tiefgang ruft alle zusammen. Am tiefsten Punkt des Ozeans liegt eine riesige Auster – uralt, verwittert, voller Narben. "In ihr liegt die Perle des Ozeans", sagt Tiefgang feierlich. "Aber sie öffnet sich nur, wenn alle bereit sind, ihre Trauer wirklich anzunehmen. Nicht vergessen. Nicht verdrängen. Annehmen." Marina, Coralie und Wellentanz schauen einander unsicher an.',
        choices: [
          {
            id: 'o6-s1-c1',
            text: '"Was passiert, wenn die Auster sich öffnet?"',
            nextSceneId: 'o6-s2',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'o6-s1-c2',
            text: '"Ich helfe euch. Wir machen das zusammen."',
            nextSceneId: 'o6-s2',
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 3 }
          },
          {
            id: 'o6-s1-c3',
            text: '"Annehmen... das klingt einfacher, als es ist."',
            nextSceneId: 'o6-s2',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'o6-s2',
        content: 'Marina schwimmt als Erste vor. "Ich fange an", sagt sie mit zitternder Stimme. "Mein Bruder ist tot. Und ich... ich habe ihm nie gesagt, wie wichtig er mir war. Ich habe immer gedacht, wir haben noch Zeit." Tränen mischen sich mit dem Salzwasser. "Ich habe so lange sein Lied gesungen, damit ich ihn nicht loslassen muss. Aber... vielleicht muss ich nicht loslassen. Vielleicht muss ich nur akzeptieren, dass er in meinem Herzen lebt, nicht im Meer."',
        choices: [
          {
            id: 'o6-s2-c1',
            text: '"Du hast es ihm gezeigt, Marina. Jeden Tag, mit jedem Lied."',
            nextSceneId: 'o6-s3',
            points: { empathyPoints: 3, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'o6-s2-c2',
            text: 'Nimm sie in den Arm und lass sie weinen',
            nextSceneId: 'o6-s3',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'o6-s2-c3',
            text: '"Loslassen heißt nicht vergessen. Es heißt, weitertragen statt festhalten."',
            nextSceneId: 'o6-s3',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'o6-s3',
        content: 'Die Auster öffnet sich einen Spalt. Coralie ist als Nächste dran. Sie zittert am ganzen Körper. "Ich... ich habe mich versteckt, weil ich Angst hatte, noch jemanden zu verlieren. Wenn ich niemanden an mich ranlasse, kann mich nichts mehr verletzen." Pause. "Aber Perla... Perla hätte gesagt, dass ein Leben im Schneckenhaus kein Leben ist." Coralie kriecht ganz aus ihrem Haus. Zum ersten Mal. Komplett. "Das hier ist für dich, Perla."',
        choices: [
          {
            id: 'o6-s3-c1',
            text: '"Coralie, du bist der mutigste Krebs, den ich je getroffen habe."',
            nextSceneId: 'o6-s4',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 3 }
          },
          {
            id: 'o6-s3-c2',
            text: 'Stelle dich schützend neben sie – sie soll wissen, dass sie nicht allein ist',
            nextSceneId: 'o6-s4',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'o6-s3-c3',
            text: '"Du lässt nicht Perla los. Du lässt die Angst los. Das ist ein Unterschied."',
            nextSceneId: 'o6-s4',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 3 }
          }
        ]
      },
      {
        id: 'o6-s4',
        content: 'Die Auster öffnet sich weiter. Wellentanz kommt heran, ungewöhnlich ruhig. "Alle denken, ich fühle nichts, weil ich immer in Bewegung bin", sagt sie. "Aber ich trage die Trauer von allen. Jede Träne, die ins Meer fällt, wird Teil von mir." Sie wird ganz still – zum ersten Mal. "Manchmal wünsche ich mir, ich könnte aufhören zu fühlen. Aber dann... wäre ich kein Ozean mehr. Ich wäre nur Wasser."',
        choices: [
          {
            id: 'o6-s4-c1',
            text: '"Dein Fühlen macht dich lebendig, Wellentanz. Das ist deine Stärke."',
            nextSceneId: 'o6-s5',
            points: { empathyPoints: 3, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'o6-s4-c2',
            text: '"Du musst nicht alles allein tragen. Wir können dir helfen."',
            nextSceneId: 'o6-s5',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'o6-s4-c3',
            text: '"Du bist so viel mehr als nur Wasser. Du bist der Tanz. Die Bewegung. Das Leben."',
            nextSceneId: 'o6-s5',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'o6-s5',
        content: 'Tiefgang schaut dich an. "Jetzt du", sagt er. "Was trägst du mit dir? Was hast du verloren?" Alle vier schauen dich an – nicht fordernd, nicht ungeduldig. Einfach da. Bereit zuzuhören. Der Moment ist gekommen, in dem du nicht nur anderen hilfst, sondern dir selbst erlaubst, verletzlich zu sein.',
        choices: [
          {
            id: 'o6-s5-c1',
            text: 'Erzähle von deinem Verlust – zum ersten Mal ohne Angst',
            nextSceneId: 'o6-s6',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 3 }
          },
          {
            id: 'o6-s5-c2',
            text: '"Ich habe gelernt, dass Trauer zeigt, wie tief ich lieben kann."',
            nextSceneId: 'o6-s6',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 3 }
          },
          {
            id: 'o6-s5-c3',
            text: 'Weine einfach – manchmal brauchen Gefühle keine Worte',
            nextSceneId: 'o6-s6',
            points: { empathyPoints: 3, insightPoints: 3, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'o6-s6',
        content: 'Die Auster öffnet sich ganz. Darin liegt eine Perle – nicht perfekt rund, nicht makellos. Sie hat Unebenheiten und Rillen. Aber sie leuchtet wärmer als alles, was du je gesehen hast. Tiefgang hebt sie vorsichtig heraus. "Wisst ihr, wie eine Perle entsteht? Ein Sandkorn dringt in die Auster ein. Es tut weh. Es stört. Aber die Auster kämpft nicht dagegen. Sie umhüllt es, Schicht für Schicht, mit allem, was sie hat. Und aus dem Schmerz wird... das hier."',
        choices: [
          {
            id: 'o6-s6-c1',
            text: '"Unser Schmerz definiert uns nicht – aber er kann uns formen."',
            nextSceneId: 'o6-s7',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 3 }
          },
          {
            id: 'o6-s6-c2',
            text: '"Die Perle ist nicht perfekt. Und das macht sie erst richtig schön."',
            nextSceneId: 'o6-s7',
            points: { empathyPoints: 3, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'o6-s6-c3',
            text: 'Berühre die Perle und spüre ihre Wärme – die Wärme von verarbeiteter Trauer',
            nextSceneId: 'o6-s7',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'o6-s7',
        content: 'Die Perle beginnt zu leuchten und teilt sich in fünf kleine Perlen – eine für jeden von euch. Marina hält ihre an die Brust und summt. Coralie steckt ihre neben Perlas glitzernden Stein. Wellentanz lässt ihre zwischen ihren Wellen tanzen. Tiefgang schluckt seine mit einem Lächeln. "Und deine?" fragt er. Die letzte Perle schwebt vor dir – warm, leuchtend, imperfekt und wunderschön. Wie alles, was du auf dieser Insel gelernt hast.',
        choices: [
          {
            id: 'o6-s7-c1',
            text: 'Halte sie ans Herz. "Ich werde traurig sein, und das ist okay. Weil ich auch lieben kann."',
            nextSceneId: null,
            points: { empathyPoints: 3, insightPoints: 3, couragePoints: 3 }
          },
          {
            id: 'o6-s7-c2',
            text: '"Danke, Ozean. Danke, Marina, Tiefgang, Coralie, Wellentanz. Ihr habt mir gezeigt, dass Trauer kein Ende ist – sondern ein Anfang."',
            nextSceneId: null,
            points: { empathyPoints: 3, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'o6-s7-c3',
            text: 'Stecke die Perle ein und schwimme nach oben – zurück ins Licht, mit allem, was du gelernt hast',
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
