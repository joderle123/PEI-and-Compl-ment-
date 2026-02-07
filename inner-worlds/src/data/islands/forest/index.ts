// @ts-nocheck
import type { Scenario, WisdomCard, Activity, IslandId } from '../../../types';

// Local interfaces
interface ForestActivity extends Activity {
  instructions: string[];
}

interface ForestNPC {
  id: string;
  name: string;
  emoji: string;
  description: string;
  backstory: string;
}

// NPCs
export const forestNPCs: ForestNPC[] = [
  {
    id: 'timber',
    name: 'Timber',
    emoji: '🌲',
    description: 'Ein uralter Baumgeist, der im Herzen des Waldes wurzelt',
    backstory: 'Timber hat Hunderte von Jahren gesehen und kennt alle Geheimnisse der Angst und des Mutes. Seine Wurzeln reichen tief in die Erde, wo die ältesten Ängste schlafen.'
  },
  {
    id: 'faye',
    name: 'Faye',
    emoji: '🧑',
    description: 'Ein mutiges Mädchen aus Syrien, das neu in Luxemburg ist',
    backstory: 'Faye musste ihre Heimat verlassen und in Luxemburg neu anfangen. Sie versteht, wie es sich anfühlt, fremd zu sein und Angst vor dem Unbekannten zu haben.'
  },
  {
    id: 'schattenfluesterer',
    name: 'Schattenflüsterer',
    emoji: '🦇',
    description: 'Eine freundliche Fledermaus, die in den Schatten zu Hause ist',
    backstory: 'Schattenflüsterer wurde einst gefürchtet, bis jemand erkannte, dass Schatten nicht böse sind – sie sind einfach Teile von uns, die Aufmerksamkeit brauchen.'
  },
  {
    id: 'lumi',
    name: 'Lumi',
    emoji: '🪲',
    description: 'Ein kleines, aber unglaublich mutiges Glühwürmchen',
    backstory: 'Lumi ist winzig, aber ihr Licht hat schon viele durch die dunkelsten Nächte geführt. Sie beweist, dass Größe nichts mit Mut zu tun hat.'
  }
];

// Scenarios
export const forestScenarios: Scenario[] = [
  {
    id: 'forest-scenario-1',
    islandId: 'forest' as IslandId,
    title: 'Timbers Prüfung',
    description: 'Der alte Baumgeist zeigt dir den dunkelsten Teil des Waldes',
    npcId: 'timber',
    completed: false,
    scenes: [
      {
        id: 'f1-s1',
        text: 'Timber rauscht mit seinen Ästen. "Der dunkle Wald ruft dich", flüstert er. "Dort, wo das Licht kaum hinreicht, warten deine tiefsten Ängste. Bist du bereit?"',
        choices: [
          {
            id: 'f1-s1-c1',
            text: 'Ja, ich bin bereit. Zeig mir den Weg.',
            points: 3,
            nextSceneId: 'f1-s2'
          },
          {
            id: 'f1-s1-c2',
            text: 'Ich habe Angst, aber ich versuche es.',
            points: 2,
            nextSceneId: 'f1-s2'
          },
          {
            id: 'f1-s1-c3',
            text: 'Nein, das ist mir zu gruselig.',
            points: 1,
            nextSceneId: 'f1-s2'
          }
        ]
      },
      {
        id: 'f1-s2',
        text: 'Der Pfad wird dunkler. Du hörst seltsame Geräusche zwischen den Bäumen. Dein Herz klopft schneller, deine Handflächen werden feucht.',
        choices: [
          {
            id: 'f1-s2-c1',
            text: 'Ich atme tief durch und gehe weiter.',
            points: 3,
            nextSceneId: 'f1-s3'
          },
          {
            id: 'f1-s2-c2',
            text: 'Ich rufe nach Timber.',
            points: 2,
            nextSceneId: 'f1-s3'
          },
          {
            id: 'f1-s2-c3',
            text: 'Ich bleibe stehen und lausche.',
            points: 2,
            nextSceneId: 'f1-s3'
          }
        ]
      },
      {
        id: 'f1-s3',
        text: 'Plötzlich siehst du eine dunkle Gestalt. Sie kommt näher. "Das bin ich", erkennst du überrascht – es ist dein eigener Schatten, vergrößert durch die Dunkelheit.',
        choices: [
          {
            id: 'f1-s3-c1',
            text: 'Ich schaue meinem Schatten direkt in die Augen.',
            points: 3,
            nextSceneId: 'f1-s4'
          },
          {
            id: 'f1-s3-c2',
            text: 'Ich erkenne, dass mein Schatten zu mir gehört.',
            points: 3,
            nextSceneId: 'f1-s4'
          },
          {
            id: 'f1-s3-c3',
            text: 'Ich drehe mich weg.',
            points: 1,
            nextSceneId: 'f1-s4'
          }
        ]
      },
      {
        id: 'f1-s4',
        text: 'Timber erscheint neben dir. "Siehst du? Die Angst war nur ein Schatten. Aber jetzt kommt der wahre Test – geh tiefer hinein, wo niemand bei dir ist."',
        choices: [
          {
            id: 'f1-s4-c1',
            text: 'Ich gehe allein weiter.',
            points: 3,
            nextSceneId: 'f1-s5'
          },
          {
            id: 'f1-s4-c2',
            text: 'Ich bitte Timber, in meiner Nähe zu bleiben.',
            points: 2,
            nextSceneId: 'f1-s5'
          },
          {
            id: 'f1-s4-c3',
            text: 'Ich sage, dass ich genug gesehen habe.',
            points: 1,
            nextSceneId: 'f1-s5'
          }
        ]
      },
      {
        id: 'f1-s5',
        text: 'Im tiefsten Teil des Waldes findest du eine Lichtung. Dort steht ein Spiegel. In ihm siehst du dich selbst – aber auch alle deine Ängste als kleine Schatten um dich herum.',
        choices: [
          {
            id: 'f1-s5-c1',
            text: 'Ich benenne jede Angst beim Namen.',
            points: 3,
            nextSceneId: 'f1-s6'
          },
          {
            id: 'f1-s5-c2',
            text: 'Ich umarme mich selbst im Spiegel.',
            points: 3,
            nextSceneId: 'f1-s6'
          },
          {
            id: 'f1-s5-c3',
            text: 'Ich schaue nur kurz hin.',
            points: 1,
            nextSceneId: 'f1-s6'
          }
        ]
      },
      {
        id: 'f1-s6',
        text: 'Als du die Ängste anerkennst, werden sie durchsichtig. Timber lächelt: "Du hast verstanden – Angst verschwindet nicht, wenn man sie ignoriert. Aber wenn man sie ansieht, verliert sie ihre Macht." Du fühlst dich stärker.',
        choices: [
          {
            id: 'f1-s6-c1',
            text: 'Danke, Timber. Ich habe viel gelernt.',
            points: 3,
            nextSceneId: null
          },
          {
            id: 'f1-s6-c2',
            text: 'Ich werde wiederkommen, wenn ich Angst habe.',
            points: 2,
            nextSceneId: null
          },
          {
            id: 'f1-s6-c3',
            text: 'Das war schwer, aber wichtig.',
            points: 2,
            nextSceneId: null
          }
        ]
      }
    ]
  },
  {
    id: 'forest-scenario-2',
    islandId: 'forest' as IslandId,
    title: 'Fayes neuer Anfang',
    description: 'Ein Mädchen aus einem fernen Land teilt ihre Geschichte',
    npcId: 'faye',
    completed: false,
    scenes: [
      {
        id: 'f2-s1',
        text: 'Faye sitzt auf einem Baumstumpf, ihre Augen blicken in die Ferne. "In Damaskus hatte ich Freunde, eine Schule, ein Zuhause", sagt sie leise. "Hier in Luxemburg ist alles fremd. Die Sprache, die Gesichter, sogar der Himmel sieht anders aus."',
        choices: [
          {
            id: 'f2-s1-c1',
            text: 'Erzähl mir mehr von deinem alten Zuhause.',
            points: 3,
            nextSceneId: 'f2-s2'
          },
          {
            id: 'f2-s1-c2',
            text: 'Es wird besser werden, versprochen.',
            points: 2,
            nextSceneId: 'f2-s2'
          },
          {
            id: 'f2-s1-c3',
            text: 'Ich höre dir zu.',
            points: 2,
            nextSceneId: 'f2-s2'
          }
        ]
      },
      {
        id: 'f2-s2',
        text: '"Am ersten Tag in der Luxemburger Schule stand ich vor der Klasse. Alle starrten mich an. Ich verstand kein Wort Luxemburgisch. Mein Herz raste so schnell, dass ich dachte, es würde explodieren."',
        choices: [
          {
            id: 'f2-s2-c1',
            text: 'Das klingt furchtbar einsam.',
            points: 3,
            nextSceneId: 'f2-s3'
          },
          {
            id: 'f2-s2-c2',
            text: 'Hast du jemanden gefunden, der dir half?',
            points: 2,
            nextSceneId: 'f2-s3'
          },
          {
            id: 'f2-s2-c3',
            text: 'Kannst du jetzt Luxemburgisch?',
            points: 1,
            nextSceneId: 'f2-s3'
          }
        ]
      },
      {
        id: 'f2-s3',
        text: 'Faye nickt. "Ein Mädchen namens Marie lächelte mich an. Sie konnte kein Arabisch, ich kein Luxemburgisch, aber sie zeigte mir, wo die Bibliothek war. Dort malten wir zusammen. Bilder brauchen keine Worte."',
        choices: [
          {
            id: 'f2-s3-c1',
            text: 'Marie klingt nach einer echten Freundin.',
            points: 3,
            nextSceneId: 'f2-s4'
          },
          {
            id: 'f2-s3-c2',
            text: 'Was habt ihr gemalt?',
            points: 2,
            nextSceneId: 'f2-s4'
          },
          {
            id: 'f2-s3-c3',
            text: 'Hattest du noch immer Angst?',
            points: 2,
            nextSceneId: 'f2-s4'
          }
        ]
      },
      {
        id: 'f2-s4',
        text: '"Ja, ich hatte noch Angst. Angst, nie dazuzugehören. Angst, meine alte Heimat zu vergessen. Angst, dass ich zwischen zwei Welten stecken bleibe." Faye atmet tief. "Aber dann verstand ich etwas wichtiges."',
        choices: [
          {
            id: 'f2-s4-c1',
            text: 'Was hast du verstanden?',
            points: 3,
            nextSceneId: 'f2-s5'
          },
          {
            id: 'f2-s4-c2',
            text: 'Du musst nichts vergessen.',
            points: 2,
            nextSceneId: 'f2-s5'
          },
          {
            id: 'f2-s4-c3',
            text: 'Ich warte gespannt.',
            points: 2,
            nextSceneId: 'f2-s5'
          }
        ]
      },
      {
        id: 'f2-s5',
        text: '"Ich muss nicht zwischen den Welten wählen. Ich kann beide in mir tragen. Damaskus ist in meinem Herzen, und Luxemburg wird auch dort ein Zuhause finden. Ich bin nicht nur syrisch oder luxemburgisch – ich bin beides. Und das ist meine Stärke."',
        choices: [
          {
            id: 'f2-s5-c1',
            text: 'Das ist wunderschön und mutig.',
            points: 3,
            nextSceneId: 'f2-s6'
          },
          {
            id: 'f2-s5-c2',
            text: 'Du bist ein Brückenbauer zwischen Welten.',
            points: 3,
            nextSceneId: 'f2-s6'
          },
          {
            id: 'f2-s5-c3',
            text: 'Danke, dass du das mit mir teilst.',
            points: 2,
            nextSceneId: 'f2-s6'
          }
        ]
      },
      {
        id: 'f2-s6',
        text: 'Faye lächelt zum ersten Mal. "Heute habe ich in der Schule eine Geschichte auf Luxemburgisch erzählt – über ein syrisches Mädchen, das lernte, mutig zu sein. Alle hörten zu. Ich gehöre hierher, weil ich hier bin. Und ich bin mutig genug, neu anzufangen."',
        choices: [
          {
            id: 'f2-s6-c1',
            text: 'Du inspirierst mich, Faye.',
            points: 3,
            nextSceneId: null
          },
          {
            id: 'f2-s6-c2',
            text: 'Mut bedeutet nicht, keine Angst zu haben.',
            points: 3,
            nextSceneId: null
          },
          {
            id: 'f2-s6-c3',
            text: 'Danke für deine Geschichte.',
            points: 2,
            nextSceneId: null
          }
        ]
      }
    ]
  },
  {
    id: 'forest-scenario-3',
    islandId: 'forest' as IslandId,
    title: 'Freundschaft mit Schatten',
    description: 'Schattenflüsterer zeigt dir, dass Dunkelheit nicht böse ist',
    npcId: 'schattenfluesterer',
    completed: false,
    scenes: [
      {
        id: 'f3-s1',
        text: 'Schattenflüsterer hängt kopfüber von einem Ast. "Die meisten fürchten mich", piepst er. "Sie sehen meine Flügel und denken an Vampire, an Dunkelheit, an Monster. Aber ich bin nur eine kleine Fledermaus, die die Nacht liebt."',
        choices: [
          {
            id: 'f3-s1-c1',
            text: 'Ich finde dich nicht gruselig.',
            points: 3,
            nextSceneId: 'f3-s2'
          },
          {
            id: 'f3-s1-c2',
            text: 'Warum liebst du die Nacht?',
            points: 2,
            nextSceneId: 'f3-s2'
          },
          {
            id: 'f3-s1-c3',
            text: 'Ehrlich gesagt, habe ich ein bisschen Angst.',
            points: 2,
            nextSceneId: 'f3-s2'
          }
        ]
      },
      {
        id: 'f3-s2',
        text: '"Komm mit mir", sagt er und flattert in die Dämmerung. "Ich zeige dir, dass Schatten Freunde sein können. Jeder Mensch hat Schatten in sich – Teile, die er versteckt. Aber was versteckt wird, wird nur größer und gruseliger."',
        choices: [
          {
            id: 'f3-s2-c1',
            text: 'Ich folge dir in die Dämmerung.',
            points: 3,
            nextSceneId: 'f3-s3'
          },
          {
            id: 'f3-s2-c2',
            text: 'Welche Schatten habe ich?',
            points: 2,
            nextSceneId: 'f3-s3'
          },
          {
            id: 'f3-s2-c3',
            text: 'Ich bleibe lieber im Licht.',
            points: 1,
            nextSceneId: 'f3-s3'
          }
        ]
      },
      {
        id: 'f3-s3',
        text: 'Er führt dich zu einer Höhle. An der Wand tanzen Schatten – deine Wut, deine Traurigkeit, deine Eifersucht. "Das sind keine Monster", flüstert Schattenflüsterer. "Das sind Gefühle, die gesehen werden wollen."',
        choices: [
          {
            id: 'f3-s3-c1',
            text: 'Ich nähere mich meiner Wut.',
            points: 3,
            nextSceneId: 'f3-s4'
          },
          {
            id: 'f3-s3-c2',
            text: 'Ich spreche mit meiner Traurigkeit.',
            points: 3,
            nextSceneId: 'f3-s4'
          },
          {
            id: 'f3-s3-c3',
            text: 'Ich beobachte die Schatten aus der Distanz.',
            points: 1,
            nextSceneId: 'f3-s4'
          }
        ]
      },
      {
        id: 'f3-s4',
        text: 'Als du einen Schatten berührst, wird er warm und weich. "Siehst du?", sagt die Fledermaus. "Wenn du deine dunklen Gefühle anerkennst, verlieren sie ihre Macht über dich. Sie werden zu Verbündeten."',
        choices: [
          {
            id: 'f3-s4-c1',
            text: 'Ich umarme meine Schatten.',
            points: 3,
            nextSceneId: 'f3-s5'
          },
          {
            id: 'f3-s4-c2',
            text: 'Ich danke ihnen für ihre Botschaft.',
            points: 3,
            nextSceneId: 'f3-s5'
          },
          {
            id: 'f3-s4-c3',
            text: 'Ich verstehe jetzt ein bisschen mehr.',
            points: 2,
            nextSceneId: 'f3-s5'
          }
        ]
      },
      {
        id: 'f3-s5',
        text: 'Schattenflüsterer fliegt um dich herum. "Es gibt noch einen Schatten, den du ansehen musst – den größten von allen." Er führt dich zu einem dunklen Spiegel. Darin siehst du deine tiefste Angst.',
        choices: [
          {
            id: 'f3-s5-c1',
            text: 'Ich schaue direkt in den Spiegel.',
            points: 3,
            nextSceneId: 'f3-s6'
          },
          {
            id: 'f3-s5-c2',
            text: 'Ich frage meine Angst: "Was willst du mir sagen?"',
            points: 3,
            nextSceneId: 'f3-s6'
          },
          {
            id: 'f3-s5-c3',
            text: 'Ich drehe mich weg.',
            points: 0,
            nextSceneId: 'f3-s6'
          }
        ]
      },
      {
        id: 'f3-s6',
        text: 'Der Spiegel zeigt: Deine größte Angst ist, nicht genug zu sein. "Aber du bist genug", flüstert Schattenflüsterer. "Mit all deinen Schatten, mit all deinem Licht. Vollständig bist du nur mit beidem." Die Schatten verbeugen sich und verschmelzen sanft mit dir.',
        choices: [
          {
            id: 'f3-s6-c1',
            text: 'Ich nehme mich ganz an – Licht und Schatten.',
            points: 3,
            nextSceneId: null
          },
          {
            id: 'f3-s6-c2',
            text: 'Danke, Schattenflüsterer. Du bist ein wahrer Freund.',
            points: 3,
            nextSceneId: null
          },
          {
            id: 'f3-s6-c3',
            text: 'Ich werde meine Schatten nicht mehr verstecken.',
            points: 2,
            nextSceneId: null
          }
        ]
      }
    ]
  },
  {
    id: 'forest-scenario-4',
    islandId: 'forest' as IslandId,
    title: 'Lumis kleines Licht',
    description: 'Ein winziges Glühwürmchen beweist, dass Größe nichts mit Mut zu tun hat',
    npcId: 'lumi',
    completed: false,
    scenes: [
      {
        id: 'f4-s1',
        text: 'Lumi schwebt vor dir, ihr Licht flackert nervös. "Ich bin so klein", sagt sie. "Alle Tiere im Wald sind größer als ich. Sogar eine Ameise könnte mich übersehen. Wie soll ich jemals mutig sein, wenn ich so winzig bin?"',
        choices: [
          {
            id: 'f4-s1-c1',
            text: 'Größe hat nichts mit Mut zu tun.',
            points: 3,
            nextSceneId: 'f4-s2'
          },
          {
            id: 'f4-s1-c2',
            text: 'Erzähl mir von deinen Ängsten.',
            points: 2,
            nextSceneId: 'f4-s2'
          },
          {
            id: 'f4-s1-c3',
            text: 'Aber dein Licht ist wunderschön!',
            points: 2,
            nextSceneId: 'f4-s2'
          }
        ]
      },
      {
        id: 'f4-s2',
        text: '"Gestern Nacht", erzählt Lumi, "war ein kleiner Junge im Wald verloren. Er weinte und konnte den Weg nicht finden. Ich hörte ihn, aber ich dachte: Was kann ich schon tun? Ich bin nur ein kleines Glühwürmchen."',
        choices: [
          {
            id: 'f4-s2-c1',
            text: 'Aber du bist doch hingegangen, oder?',
            points: 3,
            nextSceneId: 'f4-s3'
          },
          {
            id: 'f4-s2-c2',
            text: 'Was ist dann passiert?',
            points: 2,
            nextSceneId: 'f4-s3'
          },
          {
            id: 'f4-s2-c3',
            text: 'Hast du ihm geholfen?',
            points: 2,
            nextSceneId: 'f4-s3'
          }
        ]
      },
      {
        id: 'f4-s3',
        text: 'Lumi leuchtet heller. "Ich flog zu ihm. Mein Licht war klein, aber in der Dunkelheit war es genug. Der Junge folgte mir. Schritt für Schritt. Ich hatte Angst, dass er mich übersehen würde, aber er sah mich. Er vertraute meinem kleinen Licht."',
        choices: [
          {
            id: 'f4-s3-c1',
            text: 'Siehst du? Du warst mutig!',
            points: 3,
            nextSceneId: 'f4-s4'
          },
          {
            id: 'f4-s3-c2',
            text: 'Hast du ihn nach Hause geführt?',
            points: 2,
            nextSceneId: 'f4-s4'
          },
          {
            id: 'f4-s3-c3',
            text: 'Hattest du keine Angst?',
            points: 2,
            nextSceneId: 'f4-s4'
          }
        ]
      },
      {
        id: 'f4-s4',
        text: '"Doch, ich hatte schreckliche Angst!", gibt Lumi zu. "Was, wenn mein Licht nicht reicht? Was, wenn ich ihn in die falsche Richtung führe? Was, wenn ich versage?" Ihr Licht flackert bei der Erinnerung.',
        choices: [
          {
            id: 'f4-s4-c1',
            text: 'Aber du hast es trotzdem getan.',
            points: 3,
            nextSceneId: 'f4-s5'
          },
          {
            id: 'f4-s4-c2',
            text: 'Das ist es, was Mut bedeutet.',
            points: 3,
            nextSceneId: 'f4-s5'
          },
          {
            id: 'f4-s4-c3',
            text: 'Was half dir, weiterzumachen?',
            points: 2,
            nextSceneId: 'f4-s5'
          }
        ]
      },
      {
        id: 'f4-s5',
        text: '"Ich dachte an all die anderen Glühwürmchen", sagt Lumi. "Wir sind klein, aber zusammen erhellen wir die Nacht. Und dann verstand ich: Ich muss nicht groß sein. Ich muss nur leuchten. Mein kleines Licht ist genug."',
        choices: [
          {
            id: 'f4-s5-c1',
            text: 'Jeder von uns hat ein Licht.',
            points: 3,
            nextSceneId: 'f4-s6'
          },
          {
            id: 'f4-s5-c2',
            text: 'Größe ist nicht wichtig – Leuchtkraft schon.',
            points: 3,
            nextSceneId: 'f4-s6'
          },
          {
            id: 'f4-s5-c3',
            text: 'Du bist ein Held, Lumi.',
            points: 2,
            nextSceneId: 'f4-s6'
          }
        ]
      },
      {
        id: 'f4-s6',
        text: 'Lumi strahlt hell. "Der Junge erreichte sein Zuhause. Seine Mutter weinte vor Freude. Und als er sich umdrehte, winkte er mir zu. \'Danke, kleines Licht\', sagte er. In diesem Moment verstand ich: Mut hat nichts mit Größe zu tun. Es geht darum, zu leuchten, wenn es dunkel ist."',
        choices: [
          {
            id: 'f4-s6-c1',
            text: 'Du hast mich gelehrt, meinem Licht zu vertrauen.',
            points: 3,
            nextSceneId: null
          },
          {
            id: 'f4-s6-c2',
            text: 'Ich werde auch leuchten, egal wie klein ich mich fühle.',
            points: 3,
            nextSceneId: null
          },
          {
            id: 'f4-s6-c3',
            text: 'Danke, Lumi. Du bist wirklich mutig.',
            points: 2,
            nextSceneId: null
          }
        ]
      }
    ]
  },
  {
    id: 'forest-scenario-5',
    islandId: 'forest' as IslandId,
    title: 'Der Druck der Gruppe',
    description: 'Timber hilft dir, gegen den Strom zu schwimmen',
    npcId: 'timber',
    completed: false,
    scenes: [
      {
        id: 'f5-s1',
        text: 'Timber ächzt im Wind. "Siehst du die jungen Bäume dort drüben? Sie alle wachsen in dieselbe Richtung – dorthin, wo der Wind sie drückt. Aber einer will anders wachsen. Schau, wie die anderen ihn ansehen."',
        choices: [
          {
            id: 'f5-s1-c1',
            text: 'Warum wächst er anders?',
            points: 2,
            nextSceneId: 'f5-s2'
          },
          {
            id: 'f5-s1-c2',
            text: 'Es braucht Mut, anders zu sein.',
            points: 3,
            nextSceneId: 'f5-s2'
          },
          {
            id: 'f5-s1-c3',
            text: 'Die anderen scheinen verärgert.',
            points: 2,
            nextSceneId: 'f5-s2'
          }
        ]
      },
      {
        id: 'f5-s2',
        text: 'Ein junger Baum spricht: "Alle sagen, ich soll mich beugen wie sie. \'Sei nicht anders\', flüstern sie. \'Du gehörst nicht dazu.\' Aber ich wachse zur Sonne, nicht zum Wind. Ist das falsch?"',
        choices: [
          {
            id: 'f5-s2-c1',
            text: 'Nein, du folgst deinem eigenen Licht.',
            points: 3,
            nextSceneId: 'f5-s3'
          },
          {
            id: 'f5-s2-c2',
            text: 'Vielleicht solltest du dich ein bisschen anpassen?',
            points: 1,
            nextSceneId: 'f5-s3'
          },
          {
            id: 'f5-s2-c3',
            text: 'Warum ist es dir so wichtig, anders zu sein?',
            points: 2,
            nextSceneId: 'f5-s3'
          }
        ]
      },
      {
        id: 'f5-s3',
        text: 'Timber rauscht: "Vor Jahren gab es eine Dürre. Alle Bäume, die sich vom Wind hatten beugen lassen, erreichten das Wasser nicht. Nur ein Baum hatte tief genug gegraben – der, der seinem eigenen Weg folgte. Er rettete alle."',
        choices: [
          {
            id: 'f5-s3-c1',
            text: 'Manchmal ist anders sein überlebenswichtig.',
            points: 3,
            nextSceneId: 'f5-s4'
          },
          {
            id: 'f5-s3-c2',
            text: 'Die Gruppe liegt nicht immer richtig.',
            points: 3,
            nextSceneId: 'f5-s4'
          },
          {
            id: 'f5-s3-c3',
            text: 'Aber es ist so schwer, allein zu sein.',
            points: 2,
            nextSceneId: 'f5-s4'
          }
        ]
      },
      {
        id: 'f5-s4',
        text: 'Der junge Baum zittert. "In der Schule lachen sie über mich, weil ich nicht die gleichen Sachen mag. Sie wollen alle dasselbe spielen, dieselben Videos schauen. Wenn ich Nein sage, bin ich der Außenseiter."',
        choices: [
          {
            id: 'f5-s4-c1',
            text: 'Deine Einzigartigkeit ist deine Stärke.',
            points: 3,
            nextSceneId: 'f5-s5'
          },
          {
            id: 'f5-s4-c2',
            text: 'Echte Freunde akzeptieren dich, wie du bist.',
            points: 3,
            nextSceneId: 'f5-s5'
          },
          {
            id: 'f5-s4-c3',
            text: 'Vielleicht findest du andere Außenseiter?',
            points: 2,
            nextSceneId: 'f5-s5'
          }
        ]
      },
      {
        id: 'f5-s5',
        text: 'Timber legt einen Ast auf den jungen Baum. "Gruppendruck ist wie ein starker Wind. Er fühlt sich mächtig an. Aber deine Wurzeln – deine Werte – sind stärker. Wenn du dich beugst, nur um dazuzugehören, verrätst du deine Wurzeln."',
        choices: [
          {
            id: 'f5-s5-c1',
            text: 'Ich werde meinen Wurzeln treu bleiben.',
            points: 3,
            nextSceneId: 'f5-s6'
          },
          {
            id: 'f5-s5-c2',
            text: 'Es ist mutiger, Nein zu sagen als Ja.',
            points: 3,
            nextSceneId: 'f5-s6'
          },
          {
            id: 'f5-s5-c3',
            text: 'Aber wie halte ich den Druck aus?',
            points: 2,
            nextSceneId: 'f5-s6'
          }
        ]
      },
      {
        id: 'f5-s6',
        text: 'Der junge Baum richtet sich auf. "Heute hat ein anderer Baum zu mir gesagt: \'Ich bewundere deinen Mut.\' Vielleicht bin ich nicht allein. Vielleicht inspiriere ich andere, auch ihren eigenen Weg zu gehen." Timber lächelt: "Ein mutiger Baum kann einen ganzen Wald verändern."',
        choices: [
          {
            id: 'f5-s6-c1',
            text: 'Ich werde mutig meinen Weg gehen.',
            points: 3,
            nextSceneId: null
          },
          {
            id: 'f5-s6-c2',
            text: 'Deine Geschichte gibt mir Kraft.',
            points: 2,
            nextSceneId: null
          },
          {
            id: 'f5-s6-c3',
            text: 'Danke, dass du mir Mut machst.',
            points: 2,
            nextSceneId: null
          }
        ]
      }
    ]
  },
  {
    id: 'forest-scenario-6',
    islandId: 'forest' as IslandId,
    title: 'Die Nacht des Sturms',
    description: 'Alle Waldbewohner zeigen dir, wie man Angst überwindet',
    npcId: 'lumi',
    completed: false,
    scenes: [
      {
        id: 'f6-s1',
        text: 'Dunkle Wolken ziehen auf. Timber ächzt: "Ein großer Sturm kommt." Lumi flackert nervös, Schattenflüsterer versteckt sich, Faye atmet schnell. Alle haben Angst. Du auch.',
        choices: [
          {
            id: 'f6-s1-c1',
            text: 'Wir schaffen das zusammen.',
            points: 3,
            nextSceneId: 'f6-s2'
          },
          {
            id: 'f6-s1-c2',
            text: 'Ich habe große Angst.',
            points: 2,
            nextSceneId: 'f6-s2'
          },
          {
            id: 'f6-s1-c3',
            text: 'Was sollen wir tun?',
            points: 2,
            nextSceneId: 'f6-s2'
          }
        ]
      },
      {
        id: 'f6-s2',
        text: 'Der Wind heult. Äste brechen. Faye erinnert sich: "In Syrien, als die Bomben fielen, hatte ich noch mehr Angst. Aber meine Mutter sagte: \'Atme. Zähle bis zehn.\'" Sie atmet demonstrativ ein und aus.',
        choices: [
          {
            id: 'f6-s2-c1',
            text: 'Ich atme mit Faye zusammen.',
            points: 3,
            nextSceneId: 'f6-s3'
          },
          {
            id: 'f6-s2-c2',
            text: 'Eins... zwei... drei...',
            points: 3,
            nextSceneId: 'f6-s3'
          },
          {
            id: 'f6-s2-c3',
            text: 'Hilft das wirklich?',
            points: 1,
            nextSceneId: 'f6-s3'
          }
        ]
      },
      {
        id: 'f6-s3',
        text: 'Schattenflüsterer ruft: "Meine Höhle! Dort sind wir sicher!" Aber der Weg ist dunkel und gruselig. Lumi zittert: "Ich... ich kann uns leuchten. Auch wenn mein Licht klein ist."',
        choices: [
          {
            id: 'f6-s3-c1',
            text: 'Dein Licht ist genau das, was wir brauchen, Lumi.',
            points: 3,
            nextSceneId: 'f6-s4'
          },
          {
            id: 'f6-s3-c2',
            text: 'Folgen wir Schattenflüsterer.',
            points: 2,
            nextSceneId: 'f6-s4'
          },
          {
            id: 'f6-s3-c3',
            text: 'Zusammen sind wir stark.',
            points: 3,
            nextSceneId: 'f6-s4'
          }
        ]
      },
      {
        id: 'f6-s4',
        text: 'In der Höhle angekommen, hört ihr den Sturm toben. Timber spricht: "Seht ihr? Draußen ist es gefährlich, aber hier, zusammen, sind wir sicher. Manchmal bedeutet Mut nicht, der Gefahr zu trotzen – sondern zu wissen, wann man Schutz suchen muss."',
        choices: [
          {
            id: 'f6-s4-c1',
            text: 'Es ist keine Schwäche, um Hilfe zu bitten.',
            points: 3,
            nextSceneId: 'f6-s5'
          },
          {
            id: 'f6-s4-c2',
            text: 'Wir haben alle geholfen.',
            points: 3,
            nextSceneId: 'f6-s5'
          },
          {
            id: 'f6-s4-c3',
            text: 'Ich bin froh, nicht allein zu sein.',
            points: 2,
            nextSceneId: 'f6-s5'
          }
        ]
      },
      {
        id: 'f6-s5',
        text: 'Faye erzählt Geschichten, Lumi macht sanftes Licht, Schattenflüsterer singt leise, Timber beschützt die Höhle. Jeder trägt bei, was er kann. Die Angst wird kleiner, die Gemeinschaft größer.',
        choices: [
          {
            id: 'f6-s5-c1',
            text: 'Zusammen können wir jeden Sturm überstehen.',
            points: 3,
            nextSceneId: 'f6-s6'
          },
          {
            id: 'f6-s5-c2',
            text: 'Jeder von euch ist wichtig.',
            points: 3,
            nextSceneId: 'f6-s6'
          },
          {
            id: 'f6-s5-c3',
            text: 'Die Angst fühlt sich schon kleiner an.',
            points: 2,
            nextSceneId: 'f6-s6'
          }
        ]
      },
      {
        id: 'f6-s6',
        text: 'Am Morgen ist der Sturm vorbei. Die Sonne scheint. Ihr tretet hinaus. "Wir haben es geschafft", sagt Lumi stolz. "Weil wir nicht allein waren", ergänzt Faye. Timber nickt: "Mut bedeutet auch, sich auf andere zu verlassen. Das ist die größte Stärke."',
        choices: [
          {
            id: 'f6-s6-c1',
            text: 'Ich werde diese Lektion nie vergessen.',
            points: 3,
            nextSceneId: null
          },
          {
            id: 'f6-s6-c2',
            text: 'Danke, meine Freunde.',
            points: 3,
            nextSceneId: null
          },
          {
            id: 'f6-s6-c3',
            text: 'Zusammen sind wir unbesiegbar.',
            points: 2,
            nextSceneId: null
          }
        ]
      }
    ]
  }
];

// Wisdom Cards
export const forestWisdomCards: WisdomCard[] = [
  {
    id: 'forest-wisdom-1',
    islandId: 'forest' as IslandId,
    title: 'Mut ist nicht die Abwesenheit von Angst',
    content: 'Mut bedeutet, Angst zu haben und trotzdem weiterzugehen. Die mutigsten Menschen sind oft die, die am meisten Angst haben – aber sie lassen sich davon nicht aufhalten.',
    collected: false
  },
  {
    id: 'forest-wisdom-2',
    islandId: 'forest' as IslandId,
    title: 'Schatten gehören zum Licht',
    content: 'Jeder Mensch hat dunkle Seiten – Wut, Traurigkeit, Eifersucht. Diese Gefühle zu verstecken macht sie nur stärker. Wenn du sie ansiehst und anerkennst, verlieren sie ihre Macht über dich.',
    collected: false
  },
  {
    id: 'forest-wisdom-3',
    islandId: 'forest' as IslandId,
    title: 'Größe ist keine Voraussetzung für Mut',
    content: 'Wie Lumi das Glühwürmchen beweist: Du musst nicht groß oder stark sein, um mutig zu sein. Manchmal ist das kleinste Licht in der Dunkelheit das hellste.',
    collected: false
  },
  {
    id: 'forest-wisdom-4',
    islandId: 'forest' as IslandId,
    title: 'Neuanfänge sind mutig',
    content: 'Etwas Neues zu beginnen – eine neue Schule, ein neues Land, ein neuer Freundeskreis – erfordert enormen Mut. Jeder Neuanfang ist ein Schritt ins Unbekannte.',
    collected: false
  },
  {
    id: 'forest-wisdom-5',
    islandId: 'forest' as IslandId,
    title: 'Anders sein ist eine Stärke',
    content: 'Wenn alle in dieselbe Richtung gehen und du spürst, dass dein Weg ein anderer ist, braucht es Mut, deinem inneren Kompass zu folgen. Aber deine Einzigartigkeit ist dein größtes Geschenk.',
    collected: false
  },
  {
    id: 'forest-wisdom-6',
    islandId: 'forest' as IslandId,
    title: 'Atmen beruhigt die Angst',
    content: 'Wenn die Angst kommt und dein Herz rast, atme bewusst. Tief ein, langsam aus. Dein Atem ist ein Anker, der dich ins Hier und Jetzt bringt.',
    collected: false
  },
  {
    id: 'forest-wisdom-7',
    islandId: 'forest' as IslandId,
    title: 'Gemeinsam sind wir stärker',
    content: 'Mut bedeutet nicht, alles allein zu schaffen. Um Hilfe zu bitten ist kein Zeichen von Schwäche – es zeigt, dass du weise genug bist, zu wissen, dass wir einander brauchen.',
    collected: false
  },
  {
    id: 'forest-wisdom-8',
    islandId: 'forest' as IslandId,
    title: 'Angst hat eine Botschaft',
    content: 'Angst ist nicht dein Feind. Sie ist ein Bote, der dir sagt: "Hier ist etwas Wichtiges. Sei vorsichtig, aber lass dich nicht lähmen." Höre die Botschaft, aber lass die Angst nicht das Steuer übernehmen.',
    collected: false
  },
  {
    id: 'forest-wisdom-9',
    islandId: 'forest' as IslandId,
    title: 'Deine Wurzeln halten dich',
    content: 'Wie ein Baum im Sturm: Deine Werte, deine Familie, deine wahren Freunde sind deine Wurzeln. Wenn der Wind des Gruppendrucks kommt, halten sie dich fest.',
    collected: false
  },
  {
    id: 'forest-wisdom-10',
    islandId: 'forest' as IslandId,
    title: 'Nein sagen ist mutig',
    content: 'Wenn alle Ja sagen und du fühlst, dass Nein das Richtige ist, erfordert dieses Nein mehr Mut als tausend Jas. Deine Grenzen zu setzen ist ein Akt der Selbstliebe.',
    collected: false
  },
  {
    id: 'forest-wisdom-11',
    islandId: 'forest' as IslandId,
    title: 'Du bist genug',
    content: 'Mit all deinen Ängsten, mit all deinen Makeln, mit all deinen Zweifeln – du bist genug. Du musst nichts beweisen, nichts werden, nichts erreichen, um wertvoll zu sein. Du bist es bereits.',
    collected: false
  },
  {
    id: 'forest-wisdom-12',
    islandId: 'forest' as IslandId,
    title: 'Verletzlichkeit ist Stärke',
    content: 'Zuzugeben, dass du Angst hast, dass du nicht weiterweißt, dass du verletzt bist – das erfordert enormen Mut. Verletzlichkeit ist keine Schwäche, sie ist das Tor zu echter Verbindung.',
    collected: false
  },
  {
    id: 'forest-wisdom-13',
    islandId: 'forest' as IslandId,
    title: 'Schutz suchen ist weise',
    content: 'Nicht jeder Sturm muss allein durchstanden werden. Zu wissen, wann du Schutz, Hilfe oder eine Pause brauchst, ist ein Zeichen von Weisheit, nicht von Feigheit.',
    collected: false
  },
  {
    id: 'forest-wisdom-14',
    islandId: 'forest' as IslandId,
    title: 'Kleine Schritte zählen',
    content: 'Du musst nicht mit einem großen Sprung über deine Angst hinwegspringen. Kleine Schritte, einer nach dem anderen, bringen dich genauso ans Ziel – und sind oft nachhaltiger.',
    collected: false
  },
  {
    id: 'forest-wisdom-15',
    islandId: 'forest' as IslandId,
    title: 'Zwischen zwei Welten zu stehen ist eine Gabe',
    content: 'Wenn du zwischen Kulturen, Sprachen oder Identitäten lebst, bist du kein Niemand – du bist ein Brückenbauer. Deine Fähigkeit, beide Welten zu verstehen, ist eine seltene Stärke.',
    collected: false
  },
  {
    id: 'forest-wisdom-16',
    islandId: 'forest' as IslandId,
    title: 'Dein Licht ist einzigartig',
    content: 'Niemand leuchtet genau wie du. Deine Art, Mut zu zeigen, ist anders als die aller anderen – und das ist perfekt so. Die Welt braucht dein spezifisches Licht.',
    collected: false
  }
];

// Activities
export const forestActivities: ForestActivity[] = [
  {
    id: 'forest-activity-1',
    islandId: 'forest' as IslandId,
    title: 'Angst-Tagebuch',
    description: 'Schreibe deine Ängste auf und entdecke ihre Botschaft',
    type: 'journal',
    completed: false,
    instructions: [
      'Nimm ein Notizbuch und einen Stift.',
      'Schreibe: "Ich habe Angst vor..." und liste alles auf, was dir einfällt.',
      'Wähle eine Angst aus und frage sie: "Was willst du mir sagen? Wovor willst du mich schützen?"',
      'Schreibe die Antwort auf, die dir in den Sinn kommt.',
      'Bedanke dich bei deiner Angst für ihre Botschaft.',
      'Schreibe nun: "Ich bin mutig genug, um..." und vervollständige den Satz.'
    ]
  },
  {
    id: 'forest-activity-2',
    islandId: 'forest' as IslandId,
    title: 'Atemübung: Der ruhige Baum',
    description: 'Atme wie ein Baum im Wind und finde innere Ruhe',
    type: 'breathing',
    completed: false,
    instructions: [
      'Stelle dich aufrecht hin, die Füße hüftbreit auseinander.',
      'Stell dir vor, deine Füße sind Wurzeln, die tief in die Erde reichen.',
      'Atme tief durch die Nase ein (4 Sekunden) – spüre, wie die Energie von den Wurzeln hochsteigt.',
      'Halte den Atem (4 Sekunden) – du bist stabil wie ein Baum.',
      'Atme langsam durch den Mund aus (6 Sekunden) – lass alle Angst wie Blätter im Wind davonfliegen.',
      'Wiederhole dies 5 Mal.',
      'Öffne die Augen und spüre deine Verwurzelung.'
    ]
  },
  {
    id: 'forest-activity-3',
    islandId: 'forest' as IslandId,
    title: 'Schatten-Freundschaft',
    description: 'Lerne deine dunklen Seiten kennen und akzeptiere sie',
    type: 'creative',
    completed: false,
    instructions: [
      'Nimm ein Blatt Papier und zeichne deine Silhouette.',
      'In die Silhouette schreibe oder male alle Gefühle, die du normalerweise versteckst: Wut, Neid, Traurigkeit, Angst.',
      'Außerhalb der Silhouette schreibe, warum du diese Gefühle versteckst.',
      'Nun zeichne Arme von der Silhouette zu den Gefühlen – umarme sie bildlich.',
      'Schreibe zu jedem Gefühl: "Ich sehe dich. Ich akzeptiere dich. Du gehörst zu mir."',
      'Hänge das Bild an einen Ort, wo du es sehen kannst.'
    ]
  },
  {
    id: 'forest-activity-4',
    islandId: 'forest' as IslandId,
    title: 'Mut-Meditation: Das innere Licht',
    description: 'Finde dein inneres Licht wie Lumi das Glühwürmchen',
    type: 'meditation',
    completed: false,
    instructions: [
      'Setze dich bequem hin, schließe die Augen.',
      'Atme einige Male tief ein und aus.',
      'Stell dir vor, in deiner Brust ist ein kleines Licht – dein Mut.',
      'Vielleicht ist es gerade klein wie Lumis Licht, aber es ist da.',
      'Mit jedem Einatmen wird das Licht ein bisschen heller.',
      'Mit jedem Ausatmen verteilt es sich in deinem ganzen Körper.',
      'Spüre, wie das Licht bis in deine Fingerspitzen, deine Zehen, deinen Kopf fließt.',
      'Sage leise zu dir: "Mein Licht ist genug. Ich bin genug."',
      'Öffne langsam die Augen und nimm dieses Licht mit in deinen Tag.'
    ]
  },
  {
    id: 'forest-activity-5',
    islandId: 'forest' as IslandId,
    title: 'Reflexion: Meine mutigen Momente',
    description: 'Erkenne und feiere deine eigenen mutigen Taten',
    type: 'reflection',
    completed: false,
    instructions: [
      'Nimm dir 10 Minuten Zeit in Ruhe.',
      'Denke an die letzten Wochen und Monate zurück.',
      'Schreibe mindestens 5 Momente auf, in denen du mutig warst – auch kleine Dinge zählen!',
      'Beispiele: Jemandem widersprochen, um Hilfe gebeten, etwas Neues ausprobiert, Nein gesagt.',
      'Lies die Liste laut vor (auch wenn du allein bist).',
      'Erkenne an: "Ich bin mutiger, als ich dachte."',
      'Ergänze die Liste regelmäßig mit neuen mutigen Momenten.'
    ]
  }
];
