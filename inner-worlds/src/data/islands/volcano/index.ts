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
    description: 'Die Wächterin des Feuers, die lehrt, die Kraft der Wut zu verstehen',
    backstory: 'Flamara ist seit Jahrtausenden die Hüterin des inneren Feuers. Sie weiß, dass Wut eine mächtige Kraft ist, die sowohl zerstören als auch transformieren kann. Mit ihrer Weisheit hilft sie jungen Seelen, ihre Glut zu zähmen.'
  },
  {
    id: 'ash',
    name: 'Ash',
    emoji: '🌑',
    description: 'Ein wütender Teenager, der lernen muss, mit seinen Emotionen umzugehen',
    backstory: 'Ash ist voller ungezähmter Wut und versteht nicht, warum er so schnell explodiert. Er fühlt sich oft missverstanden und allein mit seinen intensiven Gefühlen. Doch tief in ihm schlummert der Wunsch nach Frieden.'
  },
  {
    id: 'magmus',
    name: 'Magmus',
    emoji: '🪨',
    description: 'Ein geduldiger Golem aus erstarrter Lava, Meister der Gelassenheit',
    backstory: 'Magmus war einst flüssiges, tobendes Magma. Durch unendliche Geduld wurde er zu festem Gestein. Er kennt die Kraft des Abwartens und lehrt, dass selbst die heißeste Wut erkalten und zu Stärke werden kann.'
  },
  {
    id: 'zinnia',
    name: 'Zinnia',
    emoji: '🌺',
    description: 'Eine widerstandsfähige Blume, die in vulkanischem Boden wächst',
    backstory: 'Zinnia hat gelernt, selbst in der härtesten Umgebung zu blühen. Sie zeigt, dass man inmitten von Chaos und Hitze Schönheit finden kann. Ihre Wurzeln sind tief, ihre Blüten zart – ein perfektes Gleichgewicht.'
  }
];

// Scenarios
export const volcanoScenarios: Scenario[] = [
  {
    id: 'volcano-scenario-1',
    islandId: 'volcano' as IslandId,
    title: 'Die Begegnung mit Ash',
    description: 'Du triffst auf einen wütenden Jungen am Rande des Vulkans',
    scenes: [
      {
        id: 'v1-s1',
        text: 'Am Fuß des rauchenden Vulkans siehst du einen Jungen, der wütend Steine in die Glut wirft. Seine Fäuste sind geballt, sein Gesicht rot vor Zorn. "Lass mich in Ruhe!", schreit er, als er dich bemerkt.',
        choices: [
          {
            id: 'v1-s1-c1',
            text: 'Ruhig fragen, was passiert ist',
            nextSceneId: 'v1-s2',
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 1 }
          },
          {
            id: 'v1-s1-c2',
            text: 'Ihm Raum geben und beobachten',
            nextSceneId: 'v1-s2',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 0 }
          },
          {
            id: 'v1-s1-c3',
            text: 'Selbst auch einen Stein werfen',
            nextSceneId: 'v1-s2',
            points: { empathyPoints: 1, insightPoints: 0, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'v1-s2',
        text: 'Ash dreht sich zu dir um. "Alle sagen immer, ich soll mich beruhigen. Aber niemand versteht, wie es sich anfühlt, wenn alles in mir brennt!" Seine Stimme zittert zwischen Wut und Verzweiflung.',
        choices: [
          {
            id: 'v1-s2-c1',
            text: '"Ich möchte verstehen. Erzähl mir davon."',
            nextSceneId: 'v1-s3',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 1 }
          },
          {
            id: 'v1-s2-c2',
            text: '"Das Feuer in dir ist nicht schlecht – es braucht nur einen Weg."',
            nextSceneId: 'v1-s3',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'v1-s2-c3',
            text: '"Ich kenne das Gefühl. Manchmal kocht auch in mir alles über."',
            nextSceneId: 'v1-s3',
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'v1-s3',
        text: 'Ash setzt sich auf einen Felsen. "Heute hat mich mein bester Freund verraten. Er hat allen mein Geheimnis erzählt." Seine Hände zittern. "Ich wollte ihm nicht wehtun, aber ich habe ihn angeschrien und... jetzt hasst er mich wahrscheinlich."',
        choices: [
          {
            id: 'v1-s3-c1',
            text: '"Deine Wut war berechtigt. Verrat tut weh."',
            nextSceneId: 'v1-s4',
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 1 }
          },
          {
            id: 'v1-s3-c2',
            text: '"Was fühlst du jetzt, wenn du daran denkst?"',
            nextSceneId: 'v1-s4',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'v1-s3-c3',
            text: '"Vielleicht kannst du es noch wiedergutmachen."',
            nextSceneId: 'v1-s4',
            points: { empathyPoints: 1, insightPoints: 2, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'v1-s4',
        text: 'Plötzlich erscheint Flamara in einem Wirbel aus Funken. "Junger Ash, deine Wut ist wie das Feuer des Vulkans – kraftvoll und natürlich. Doch ein Vulkan muss lernen, wann er ausbricht und wann er ruht." Sie blickt zu dir. "Hilfst du ihm?"',
        choices: [
          {
            id: 'v1-s4-c1',
            text: '"Ja, gemeinsam finden wir einen Weg."',
            nextSceneId: 'v1-s5',
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 2 }
          },
          {
            id: 'v1-s4-c2',
            text: '"Was können wir tun, Flamara?"',
            nextSceneId: 'v1-s5',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'v1-s4-c3',
            text: 'Ash ansehen und nicken',
            nextSceneId: 'v1-s5',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'v1-s5',
        text: 'Flamara führt euch tiefer in den Vulkan. "Die erste Lektion: Erkenne das Feuer, bevor es außer Kontrolle gerät. Ash, was spürst du in deinem Körper, kurz bevor du explodierst?" Ash denkt nach. "Mein Herz rast... meine Fäuste ballen sich..."',
        choices: [
          {
            id: 'v1-s5-c1',
            text: '"Das sind deine Warnzeichen. Sie sind wichtig."',
            nextSceneId: 'v1-s6',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 0 }
          },
          {
            id: 'v1-s5-c2',
            text: '"Bei mir ist es genauso. Wir sind ähnlich."',
            nextSceneId: 'v1-s6',
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 1 }
          },
          {
            id: 'v1-s5-c3',
            text: '"Was könntest du in dem Moment tun?"',
            nextSceneId: 'v1-s6',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'v1-s6',
        text: 'Flamara lächelt. "Gut. Ihr beide habt heute etwas Wichtiges verstanden: Wut warnt uns, aber wir müssen nicht sofort handeln. Ash, gehe zu Magmus – er wird dir beibringen, wie man wartet." Ash blickt dich an. "Kommst du mit?"',
        choices: [
          {
            id: 'v1-s6-c1',
            text: '"Natürlich, ich bin an deiner Seite."',
            nextSceneId: null,
            points: { empathyPoints: 3, insightPoints: 0, couragePoints: 2 }
          },
          {
            id: 'v1-s6-c2',
            text: '"Ich glaube, du schaffst das alleine."',
            nextSceneId: null,
            points: { empathyPoints: 0, insightPoints: 2, couragePoints: 3 }
          },
          {
            id: 'v1-s6-c3',
            text: '"Lass uns gemeinsam lernen."',
            nextSceneId: null,
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 2 }
          }
        ]
      }
    ]
  },
  {
    id: 'volcano-scenario-2',
    islandId: 'volcano' as IslandId,
    title: 'Flamaras Lektion',
    description: 'Die Feuerwächterin zeigt dir die zwei Gesichter der Wut',
    scenes: [
      {
        id: 'v2-s1',
        text: 'Flamara steht vor einem See aus glühender Lava. "Schau genau hin. Siehst du die Zerstörung?" Die Lava frisst alles auf ihrem Weg. "Und doch – aus dieser Glut entsteht neues Land, fruchtbarer Boden. Wut ist genauso."',
        choices: [
          {
            id: 'v2-s1-c1',
            text: '"Wut kann also auch etwas Gutes schaffen?"',
            nextSceneId: 'v2-s2',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'v2-s1-c2',
            text: '"Aber die Zerstörung ist so groß..."',
            nextSceneId: 'v2-s2',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 1 }
          },
          {
            id: 'v2-s1-c3',
            text: 'Schweigend die Lava beobachten',
            nextSceneId: 'v2-s2',
            points: { empathyPoints: 1, insightPoints: 2, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'v2-s2',
        text: '"Genau", sagt Flamara. "Wut zeigt uns Grenzen. Sie sagt: \'Bis hierher und nicht weiter!\' Ohne Wut würden wir Ungerechtigkeit akzeptieren." Sie formt eine Flamme in ihrer Hand. "Die Kunst ist, das Feuer zu kontrollieren, nicht zu löschen."',
        choices: [
          {
            id: 'v2-s2-c1',
            text: '"Wie kontrolliere ich es, ohne es zu unterdrücken?"',
            nextSceneId: 'v2-s3',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'v2-s2-c2',
            text: '"Manchmal habe ich Angst vor meiner Wut."',
            nextSceneId: 'v2-s3',
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 2 }
          },
          {
            id: 'v2-s2-c3',
            text: '"Kannst du mir das beibringen?"',
            nextSceneId: 'v2-s3',
            points: { empathyPoints: 1, insightPoints: 2, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'v2-s3',
        text: 'Flamara nickt verständnisvoll. "Angst vor der eigenen Kraft ist weise. Doch höre: Wut braucht einen Kanal. Manche sprechen sie aus, andere schreiben, wieder andere bewegen sich." Sie zeigt auf verschiedene Vulkanöffnungen. "Jeder Vulkan hat seinen eigenen Weg."',
        choices: [
          {
            id: 'v2-s3-c1',
            text: '"Ich könnte meine Wut in Worte fassen."',
            nextSceneId: 'v2-s4',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 0 }
          },
          {
            id: 'v2-s3-c2',
            text: '"Bewegung hilft mir. Sport, Tanzen..."',
            nextSceneId: 'v2-s4',
            points: { empathyPoints: 1, insightPoints: 2, couragePoints: 3 }
          },
          {
            id: 'v2-s3-c3',
            text: '"Was ist, wenn nichts davon funktioniert?"',
            nextSceneId: 'v2-s4',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'v2-s4',
        text: 'Die Feuerwächterin lächelt warm. "Es gibt Momente, da ist die Wut zu groß für einen Kanal. Dann brauchst du die Vulkan-Atmung." Sie demonstriert: tief einatmen, langsam ausatmen wie Rauch. "So kühlst du die Glut, Atemzug für Atemzug."',
        choices: [
          {
            id: 'v2-s4-c1',
            text: 'Mit Flamara zusammen atmen',
            nextSceneId: 'v2-s5',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'v2-s4-c2',
            text: '"Wie oft soll ich das machen?"',
            nextSceneId: 'v2-s5',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'v2-s4-c3',
            text: 'Es selbst ausprobieren',
            nextSceneId: 'v2-s5',
            points: { empathyPoints: 1, insightPoints: 1, couragePoints: 3 }
          }
        ]
      },
      {
        id: 'v2-s5',
        text: 'Als du atmest, spürst du tatsächlich eine Veränderung. Die Hitze in dir wird ruhiger, geordneter. "Siehst du?", flüstert Flamara. "Dein inneres Feuer brennt noch, aber es tobt nicht mehr. Du bist der Meister deiner Flammen geworden."',
        choices: [
          {
            id: 'v2-s5-c1',
            text: '"Das fühlt sich... mächtig an."',
            nextSceneId: 'v2-s6',
            points: { empathyPoints: 1, insightPoints: 2, couragePoints: 3 }
          },
          {
            id: 'v2-s5-c2',
            text: '"Danke, Flamara. Ich verstehe jetzt."',
            nextSceneId: 'v2-s6',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 0 }
          },
          {
            id: 'v2-s5-c3',
            text: 'Einfach weitermachen und die Ruhe genießen',
            nextSceneId: 'v2-s6',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'v2-s6',
        text: 'Flamara legt dir eine warme Hand auf die Schulter. "Denke immer daran: Wut ist nicht dein Feind. Sie ist ein Bote. Wenn du lernst, ihre Botschaft zu hören, ohne von ihr überwältigt zu werden, wirst du unaufhaltsam sein." Das Feuer in ihren Augen tanzt voller Weisheit.',
        choices: [
          {
            id: 'v2-s6-c1',
            text: '"Ich werde diese Lektion weitergeben."',
            nextSceneId: null,
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'v2-s6-c2',
            text: '"Ich möchte mehr lernen."',
            nextSceneId: null,
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'v2-s6-c3',
            text: 'Flamara umarmen',
            nextSceneId: null,
            points: { empathyPoints: 3, insightPoints: 0, couragePoints: 3 }
          }
        ]
      }
    ]
  },
  {
    id: 'volcano-scenario-3',
    islandId: 'volcano' as IslandId,
    title: 'Magmus und die Kunst des Wartens',
    description: 'Der Golem aus Stein lehrt dich Geduld in der Hitze des Moments',
    scenes: [
      {
        id: 'v3-s1',
        text: 'Magmus sitzt unbeweglich wie ein Berg. Um ihn herum brodelt die Lava, doch er bleibt ruhig. "Setze dich", sagt er mit tiefer Stimme. "Ich zeige dir, was ich in tausend Jahren gelernt habe: Warten ist keine Schwäche, sondern die größte Stärke."',
        choices: [
          {
            id: 'v3-s1-c1',
            text: 'Neben ihm sitzen',
            nextSceneId: 'v3-s2',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'v3-s1-c2',
            text: '"Aber wenn ich warte, schlucke ich meine Wut runter!"',
            nextSceneId: 'v3-s2',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'v3-s1-c3',
            text: '"Wie hältst du es hier in der Hitze aus?"',
            nextSceneId: 'v3-s2',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 0 }
          }
        ]
      },
      {
        id: 'v3-s2',
        text: 'Ein tiefes Grollen kommt aus Magmus. Ist es ein Lachen? "Warten ist nicht Schweigen. Warten heißt: Ich gebe dem Sturm Zeit, sich zu legen. Dann handle ich klar, nicht blind." Er zeigt auf die Lava. "Glut, die zu schnell abkühlt, zerspringt. Langsame Abkühlung wird zu festem Fels."',
        choices: [
          {
            id: 'v3-s2-c1',
            text: '"Also soll ich meine Wut abkühlen lassen?"',
            nextSceneId: 'v3-s3',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'v3-s2-c2',
            text: '"Wie lange muss ich warten?"',
            nextSceneId: 'v3-s3',
            points: { empathyPoints: 1, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'v3-s2-c3',
            text: 'Schweigend die Lava beobachten',
            nextSceneId: 'v3-s3',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'v3-s3',
        text: 'Magmus hebt einen schweren Stein. "Fühle seine Temperatur." Er ist noch warm, aber nicht mehr glühend. "Vor Stunden war er flüssiges Feuer. Jetzt ist er stark genug, um ein Haus zu tragen. So wird Wut zu Weisheit – durch Zeit und Geduld."',
        choices: [
          {
            id: 'v3-s3-c1',
            text: 'Den Stein berühren und spüren',
            nextSceneId: 'v3-s4',
            points: { empathyPoints: 1, insightPoints: 2, couragePoints: 3 }
          },
          {
            id: 'v3-s3-c2',
            text: '"Was mache ich, wenn ich nicht warten kann?"',
            nextSceneId: 'v3-s4',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'v3-s3-c3',
            text: '"Ich verstehe. Zeit heilt wirklich."',
            nextSceneId: 'v3-s4',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 0 }
          }
        ]
      },
      {
        id: 'v3-s4',
        text: 'Der Golem nickt bedächtig. "Es gibt Notfälle, da musst du sofort handeln. Aber meistens? Meistens ist Warten besser. Zähle bis zehn. Gehe eine Runde. Atme dreimal tief. Gib deinem klugen Kopf Zeit, deinem wilden Herz zu helfen."',
        choices: [
          {
            id: 'v3-s4-c1',
            text: '"Das klingt so einfach... ist es das?"',
            nextSceneId: 'v3-s5',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 0 }
          },
          {
            id: 'v3-s4-c2',
            text: 'Es jetzt gleich ausprobieren',
            nextSceneId: 'v3-s5',
            points: { empathyPoints: 1, insightPoints: 1, couragePoints: 3 }
          },
          {
            id: 'v3-s4-c3',
            text: '"Mein Kopf und mein Herz als Team..."',
            nextSceneId: 'v3-s5',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'v3-s5',
        text: 'Plötzlich bebt die Erde. Die Lava beginnt zu steigen! Magmus bleibt sitzen. "Siehst du? Der Vulkan ist wütend. Aber ich renne nicht. Ich beobachte. Ich warte. Und siehe – die Lava findet einen anderen Weg." Tatsächlich fließt sie an euch vorbei.',
        choices: [
          {
            id: 'v3-s5-c1',
            text: 'Staunen über Magmus\' Ruhe',
            nextSceneId: 'v3-s6',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'v3-s5-c2',
            text: 'Selbst versuchen, ruhig zu bleiben',
            nextSceneId: 'v3-s6',
            points: { empathyPoints: 1, insightPoints: 2, couragePoints: 3 }
          },
          {
            id: 'v3-s5-c3',
            text: '"Hattest du keine Angst?"',
            nextSceneId: 'v3-s6',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'v3-s6',
        text: 'Magmus legt seine steinerne Hand auf deine. "Angst und Wut sind Schwestern. Beide schreien: \'Tu etwas!\' Doch manchmal ist das Beste, was du tun kannst, zu warten, bis du klar sehen kannst. Dann handelst du weise, nicht wild." Seine Augen funkeln wie Obsidian.',
        choices: [
          {
            id: 'v3-s6-c1',
            text: '"Ich werde das üben, jeden Tag."',
            nextSceneId: 'v3-s7',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'v3-s6-c2',
            text: '"Danke, Magmus. Du bist ein weiser Lehrer."',
            nextSceneId: 'v3-s7',
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 1 }
          },
          {
            id: 'v3-s6-c3',
            text: 'Still neben ihm sitzen bleiben',
            nextSceneId: 'v3-s7',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'v3-s7',
        text: 'Ihr sitzt zusammen, während die Sonne über dem Vulkan untergeht. Die Hitze des Tages weicht der Kühle der Nacht. "Siehst du?", murmelt Magmus. "Alles hat seine Zeit. Auch Wut. Sie kommt, sie geht. Du bleibst." Ein Gefühl tiefen Friedens erfüllt dich.',
        choices: [
          {
            id: 'v3-s7-c1',
            text: 'Den Moment in sich aufnehmen',
            nextSceneId: null,
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'v3-s7-c2',
            text: '"Ich bleibe. Das ist schön."',
            nextSceneId: null,
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 1 }
          },
          {
            id: 'v3-s7-c3',
            text: 'An Magmus anlehnen und ausruhen',
            nextSceneId: null,
            points: { empathyPoints: 2, insightPoints: 1, couragePoints: 3 }
          }
        ]
      }
    ]
  },
  {
    id: 'volcano-scenario-4',
    islandId: 'volcano' as IslandId,
    title: 'Zinnias Garten',
    description: 'Eine Blume zeigt dir, wie man inmitten von Härte erblüht',
    scenes: [
      {
        id: 'v4-s1',
        text: 'In einer Felsspalte entdeckst du die schönste Blume, die du je gesehen hast. Zinnia strahlt in leuchtenden Farben, obwohl um sie herum nur schwarzes Gestein ist. "Willkommen in meinem Garten", sagt sie sanft. "Hier lehre ich die schwierigste Lektion: Schönheit trotz Schmerz."',
        choices: [
          {
            id: 'v4-s1-c1',
            text: '"Wie schaffst du es, hier zu blühen?"',
            nextSceneId: 'v4-s2',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 0 }
          },
          {
            id: 'v4-s1-c2',
            text: '"Du bist wunderschön."',
            nextSceneId: 'v4-s2',
            points: { empathyPoints: 3, insightPoints: 0, couragePoints: 2 }
          },
          {
            id: 'v4-s1-c3',
            text: 'Die Blume vorsichtig berühren',
            nextSceneId: 'v4-s2',
            points: { empathyPoints: 2, insightPoints: 1, couragePoints: 3 }
          }
        ]
      },
      {
        id: 'v4-s2',
        text: 'Zinnia wiegt sich im warmen Wind. "Ich wähle jeden Tag, trotz der Hitze zu leben. Das Gestein ist hart, die Luft ist schwer – aber ich entscheide mich zu blühen. Wut kann ein steiniger Boden sein, auf dem trotzdem etwas Schönes wachsen kann."',
        choices: [
          {
            id: 'v4-s2-c1',
            text: '"Aber die Wut macht doch alles kaputt..."',
            nextSceneId: 'v4-s3',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 1 }
          },
          {
            id: 'v4-s2-c2',
            text: '"Wie finde ich die Kraft dazu?"',
            nextSceneId: 'v4-s3',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'v4-s2-c3',
            text: '"Lehrst du mich deine Art zu wachsen?"',
            nextSceneId: 'v4-s3',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'v4-s3',
        text: 'Die Blume neigt sich zu dir. "Schau auf meine Wurzeln. Sie sind tief und stark. Das ist mein Geheimnis: Ich bin verwurzelt in dem, was mir wichtig ist. Meine Werte, meine Liebe, meine Träume. Wenn der Sturm der Wut kommt, halten mich meine Wurzeln fest."',
        choices: [
          {
            id: 'v4-s3-c1',
            text: '"Was sind meine Wurzeln?"',
            nextSceneId: 'v4-s4',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'v4-s3-c2',
            text: 'Über die eigenen Werte nachdenken',
            nextSceneId: 'v4-s4',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'v4-s3-c3',
            text: '"Meine Familie ist meine Wurzel."',
            nextSceneId: 'v4-s4',
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'v4-s4',
        text: 'Zinnia lächelt (wenn Blumen lächeln können). "Gut! Und nun schau auf meine Blüten. Sie sind zart, verletzlich. Ich verstecke sie nicht. Wut will uns oft hart machen, aber wahre Stärke ist, weich zu bleiben, wo es zählt – im Herzen."',
        choices: [
          {
            id: 'v4-s4-c1',
            text: '"Aber wenn ich weich bin, werde ich verletzt."',
            nextSceneId: 'v4-s5',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 1 }
          },
          {
            id: 'v4-s4-c2',
            text: '"Wie schützt du dein weiches Herz?"',
            nextSceneId: 'v4-s5',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'v4-s4-c3',
            text: '"Ich will auch diese Balance finden."',
            nextSceneId: 'v4-s5',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'v4-s5',
        text: '"Du wirst verletzt werden", sagt Zinnia ehrlich. "Das ist Teil des Lebens. Aber jede Wunde lehrt dich etwas. Jeder Riss im Felsen lässt meine Wurzeln tiefer wachsen. Deine Wut zeigt dir, was dir wichtig ist – höre hin, aber lass sie nicht dein ganzes Wesen ausfüllen."',
        choices: [
          {
            id: 'v4-s5-c1',
            text: '"Meine Wut als Lehrerin betrachten..."',
            nextSceneId: 'v4-s6',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'v4-s5-c2',
            text: '"Das erfordert viel Mut."',
            nextSceneId: 'v4-s6',
            points: { empathyPoints: 2, insightPoints: 1, couragePoints: 3 }
          },
          {
            id: 'v4-s5-c3',
            text: '"Danke, dass du so offen bist."',
            nextSceneId: 'v4-s6',
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'v4-s6',
        text: 'Ein sanfter Regen beginnt zu fallen – eine Seltenheit am Vulkan. Zinnia fängt die Tropfen auf. "Siehst du? Selbst hier gibt es Momente der Sanftheit. Zwischen den Ausbrüchen der Wut gibt es immer Pausen. Nutze sie, um zu wachsen, zu heilen, zu blühen."',
        choices: [
          {
            id: 'v4-s6-c1',
            text: 'Den Regen auf der Haut spüren',
            nextSceneId: null,
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'v4-s6-c2',
            text: '"Ich werde diese Pausen achten."',
            nextSceneId: null,
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'v4-s6-c3',
            text: 'Zinnia ein Versprechen geben',
            nextSceneId: null,
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 3 }
          }
        ]
      }
    ]
  },
  {
    id: 'volcano-scenario-5',
    islandId: 'volcano' as IslandId,
    title: 'Der große Ausbruch',
    description: 'Der Vulkan erwacht – und du musst dich deiner größten Wut stellen',
    scenes: [
      {
        id: 'v5-s1',
        text: 'Der Boden bebt heftig. Flamara erscheint in Eile: "Der Vulkan bricht aus! Nicht der äußere – dein innerer! Erinnerst du dich an deine größte Wut? Sie steigt auf. Du musst dich ihr stellen, sonst wird sie dich verschlingen!" Bilder tauchen auf: Momente blanker Wut aus deinem Leben.',
        choices: [
          {
            id: 'v5-s1-c1',
            text: '"Ich bin bereit. Was muss ich tun?"',
            nextSceneId: 'v5-s2',
            points: { empathyPoints: 1, insightPoints: 2, couragePoints: 3 }
          },
          {
            id: 'v5-s1-c2',
            text: '"Ich habe Angst vor dieser Wut..."',
            nextSceneId: 'v5-s2',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 1 }
          },
          {
            id: 'v5-s1-c3',
            text: 'Tief atmen und sich konzentrieren',
            nextSceneId: 'v5-s2',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'v5-s2',
        text: 'Du stehst nun im Krater. Vor dir steigt eine riesige Gestalt aus Feuer auf – deine Wut, personifiziert. Sie schreit: "Du hast mich unterdrückt! Du hast mich ignoriert! Du hast dich für mich geschämt!" Die Hitze ist überwältigend.',
        choices: [
          {
            id: 'v5-s2-c1',
            text: '"Du hast Recht. Es tut mir leid."',
            nextSceneId: 'v5-s3',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'v5-s2-c2',
            text: '"Ich höre dir jetzt zu. Sprich."',
            nextSceneId: 'v5-s3',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'v5-s2-c3',
            text: '"Du bist ein Teil von mir. Ich nehme dich an."',
            nextSceneId: 'v5-s3',
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 3 }
          }
        ]
      },
      {
        id: 'v5-s3',
        text: 'Die Feuergestalt wird etwas kleiner. "Endlich! Endlich siehst du mich!" Sie zeigt dir Szenen: Ungerechtigkeiten, Verletzungen, Momente der Ohnmacht. "Ich wollte dich schützen! Ich wollte, dass du für dich einstehst! Warum hast du mich bekämpft?"',
        choices: [
          {
            id: 'v5-s3-c1',
            text: '"Ich dachte, du bist gefährlich."',
            nextSceneId: 'v5-s4',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'v5-s3-c2',
            text: '"Ich hatte Angst vor deiner Macht."',
            nextSceneId: 'v5-s4',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'v5-s3-c3',
            text: '"Ich verstehe jetzt – du wolltest helfen."',
            nextSceneId: 'v5-s4',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'v5-s4',
        text: 'Die Flammen tanzen sanfter. "Ich BIN mächtig. Aber Macht ist nicht schlecht. Gemeinsam können wir Grenzen setzen, ohne zu zerstören. Kannst du mir einen Platz in dir geben, ohne dass ich alles übernehme?" Es ist eine Frage voller Hoffnung.',
        choices: [
          {
            id: 'v5-s4-c1',
            text: '"Ja. Du darfst bei mir sein, als Beraterin."',
            nextSceneId: 'v5-s5',
            points: { empathyPoints: 3, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'v5-s4-c2',
            text: '"Ich brauche dich. Aber ich führe."',
            nextSceneId: 'v5-s5',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 3 }
          },
          {
            id: 'v5-s4-c3',
            text: '"Lass uns Partner sein, gleichberechtigt."',
            nextSceneId: 'v5-s5',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'v5-s5',
        text: 'Die Feuergestalt verwandelt sich. Sie wird zu einer warmen, kontrollierten Flamme in deinem Herzen. "Danke", flüstert sie. "Ich werde dich warnen, wenn Grenzen überschritten werden. Ich werde dir Kraft geben, wenn du sie brauchst. Aber ich werde nicht mehr explodieren – es sei denn, du bittest mich darum."',
        choices: [
          {
            id: 'v5-s5-c1',
            text: 'Die Flamme umarmen',
            nextSceneId: 'v5-s6',
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 3 }
          },
          {
            id: 'v5-s5-c2',
            text: '"Wir werden ein gutes Team sein."',
            nextSceneId: 'v5-s6',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'v5-s5-c3',
            text: 'Still die neue Balance spüren',
            nextSceneId: 'v5-s6',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'v5-s6',
        text: 'Der Vulkan beruhigt sich. Als du aus dem Krater steigst, sind alle da: Flamara, Magmus, Zinnia und Ash. Sie applaudieren. "Du hast es geschafft", sagt Flamara stolz. "Du hast deine Wut nicht besiegt – du hast sie integriert. Das ist wahre Meisterschaft."',
        choices: [
          {
            id: 'v5-s6-c1',
            text: '"Ich fühle mich... ganz."',
            nextSceneId: null,
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'v5-s6-c2',
            text: 'Alle umarmen',
            nextSceneId: null,
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 2 }
          },
          {
            id: 'v5-s6-c3',
            text: '"Danke, dass ihr an mich geglaubt habt."',
            nextSceneId: null,
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 1 }
          }
        ]
      }
    ]
  },
  {
    id: 'volcano-scenario-6',
    islandId: 'volcano' as IslandId,
    title: 'Die innere Ruhe',
    description: 'Du kehrst zum Vulkan zurück und findest eine neue Art des Friedens',
    scenes: [
      {
        id: 'v6-s1',
        text: 'Wochen später kehrst du zum Vulkan zurück. Er raucht friedlich. Du bist nicht mehr die gleiche Person. Ein Kind rennt vorbei und rempelt dich an, ohne sich zu entschuldigen. Früher wärst du explodiert. Jetzt spürst du die Wut aufsteigen – aber anders.',
        choices: [
          {
            id: 'v6-s1-c1',
            text: 'Tief atmen und die Wut beobachten',
            nextSceneId: 'v6-s2',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'v6-s1-c2',
            text: 'Mit der Wut innerlich sprechen',
            nextSceneId: 'v6-s2',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'v6-s1-c3',
            text: 'Bis zehn zählen, wie Magmus lehrte',
            nextSceneId: 'v6-s2',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'v6-s2',
        text: 'Die Wut meldet sich: "Er war unhöflich!" Aber sie schreit nicht mehr, sie informiert. Du nickst innerlich. "Danke für die Info. Aber das ist kein Notfall." Die Wut akzeptiert das und zieht sich zurück. Du fühlst dich ruhig, stark. Das Kind dreht sich um: "Oh, sorry!"',
        choices: [
          {
            id: 'v6-s2-c1',
            text: '"Kein Problem. Alles gut."',
            nextSceneId: 'v6-s3',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 1 }
          },
          {
            id: 'v6-s2-c2',
            text: 'Lächeln und weitergehen',
            nextSceneId: 'v6-s3',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'v6-s2-c3',
            text: '"Pass beim nächsten Mal auf, okay?"',
            nextSceneId: 'v6-s3',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 3 }
          }
        ]
      },
      {
        id: 'v6-s3',
        text: 'Flamara erscheint neben dir. "Ich habe gesehen, was passiert ist. Gut gemacht." Du lächelst. "Es war anders als früher. Die Wut war da, aber sie hat mich nicht überwältigt." Flamara nickt. "Du hast gelernt, der Vulkan zu sein, nicht die Lava."',
        choices: [
          {
            id: 'v6-s3-c1',
            text: '"Was ist der Unterschied?"',
            nextSceneId: 'v6-s4',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'v6-s3-c2',
            text: '"Ich bin das Gefäß, nicht das Feuer?"',
            nextSceneId: 'v6-s4',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'v6-s3-c3',
            text: 'Nachdenklich nicken',
            nextSceneId: 'v6-s4',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'v6-s4',
        text: '"Genau", sagt Flamara. "Der Vulkan enthält die Lava, aber er IST nicht die Lava. Du enthältst Wut, aber du BIST nicht die Wut. Du bist der Berg – stark, geerdet, beständig. Die Emotionen kommen und gehen, aber du bleibst." Diese Worte setzen sich tief in dir fest.',
        choices: [
          {
            id: 'v6-s4-c1',
            text: '"Ich bin der Berg... Das ist schön."',
            nextSceneId: 'v6-s5',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'v6-s4-c2',
            text: '"Werde ich jemals wieder explodieren?"',
            nextSceneId: 'v6-s5',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'v6-s4-c3',
            text: 'Flamara umarmen',
            nextSceneId: 'v6-s5',
            points: { empathyPoints: 3, insightPoints: 0, couragePoints: 3 }
          }
        ]
      },
      {
        id: 'v6-s5',
        text: 'Flamara lächelt sanft. "Vielleicht. Und das ist okay. Auch Berge brechen manchmal aus. Aber jetzt weißt du: Ein Ausbruch ist nicht das Ende der Welt. Danach kommt wieder Ruhe. Und aus der Asche wächst neues Leben." Ash kommt angelaufen, viel ruhiger als früher.',
        choices: [
          {
            id: 'v6-s5-c1',
            text: '"Ash! Wie geht es dir?"',
            nextSceneId: 'v6-s6',
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 1 }
          },
          {
            id: 'v6-s5-c2',
            text: 'Ash anlächeln',
            nextSceneId: 'v6-s6',
            points: { empathyPoints: 2, insightPoints: 1, couragePoints: 2 }
          },
          {
            id: 'v6-s5-c3',
            text: 'Abwarten, was er sagt',
            nextSceneId: 'v6-s6',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'v6-s6',
        text: '"Hey!", ruft Ash. "Ich habe mit meinem Freund gesprochen. Wir haben uns versöhnt!" Er strahlt. "Ich habe ihm gesagt, wie verletzt ich war, aber ohne zu schreien. Und er hat sich entschuldigt!" Du siehst, wie weit ihr beide gekommen seid.',
        choices: [
          {
            id: 'v6-s6-c1',
            text: '"Das ist wunderbar! Ich bin stolz auf dich."',
            nextSceneId: 'v6-s7',
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 1 }
          },
          {
            id: 'v6-s6-c2',
            text: '"Du hast die Lektionen gut gelernt."',
            nextSceneId: 'v6-s7',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'v6-s6-c3',
            text: 'Ash high-five geben',
            nextSceneId: 'v6-s7',
            points: { empathyPoints: 2, insightPoints: 0, couragePoints: 3 }
          }
        ]
      },
      {
        id: 'v6-s7',
        text: 'Ihr steht zu dritt am Kraterrand und blickt auf das glühende Herz des Vulkans. Flamara spricht: "Denkt immer daran: Euer inneres Feuer ist ein Geschenk. Es wärmt, es schützt, es transformiert. Respektiert es, nutzt es weise, und ihr werdet leuchten." Die Sonne geht unter und taucht alles in goldenes Licht.',
        choices: [
          {
            id: 'v6-s7-c1',
            text: 'Die Weisheit tief in sich aufnehmen',
            nextSceneId: null,
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'v6-s7-c2',
            text: '"Ich werde diese Lektion weitertragen."',
            nextSceneId: null,
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 3 }
          },
          {
            id: 'v6-s7-c3',
            text: 'Schweigend den Moment genießen',
            nextSceneId: null,
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 2 }
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
    content: 'Sei stark wie Stein in deinen Wurzeln (Werten), aber bleib weich wie Blütenblätter in deinem Herzen. Beides ist wichtig.',
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
    title: 'Ash\'s Lektion',
    content: 'Es ist okay, wütend zu sein UND Menschen zu lieben. Du kannst jemandem sagen "Das hat mich verletzt" ohne die Beziehung zu zerstören.',
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
