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
    backstory: 'Timber steht seit tausend Jahren an der Schwelle des dunklen Waldes. Er hat unzählige Wanderer kommen und gehen sehen – manche voller Mut, manche voller Angst. Er weiß: Nur wer die Dunkelheit betritt, kann das Licht wirklich schätzen.'
  },
  {
    id: 'faye',
    name: 'Faye',
    emoji: '🧑',
    description: 'Ein mutiges Mädchen aus Syrien, das zwischen zwei Welten lebt',
    backstory: 'Faye floh mit ihrer Familie aus Damaskus nach Luxemburg. Sie spricht Arabisch, lernt Luxemburgisch und träumt auf Französisch. Zwischen zwei Kulturen zu leben hat sie gelehrt, dass Angst vor dem Fremden nur Angst vor einem Teil von sich selbst ist.'
  },
  {
    id: 'schattenfluesterer',
    name: 'Schattenflüsterer',
    emoji: '🦇',
    description: 'Eine geheimnisvolle Fledermaus, die in den Schatten zu Hause ist',
    backstory: 'Schattenflüsterer lebt dort, wo sich Licht und Dunkelheit treffen. Er kennt jede Angst, jeden Zweifel, jedes verborgene Gefühl – denn all das lebt in den Schatten. Seine Weisheit: Was du fürchtest, ist oft nur ein verzerrtes Bild von dir selbst.'
  },
  {
    id: 'lumi',
    name: 'Lumi',
    emoji: '🪲',
    description: 'Ein kleines, aber unglaublich mutiges Glühwürmchen',
    backstory: 'Lumi ist das kleinste Wesen im ganzen Wald, aber sie trägt ein Licht in sich, das selbst die tiefste Dunkelheit durchbrechen kann. Alle sagen ihr, sie sei zu klein für große Aufgaben – aber Lumi weiß, dass Mut keine Frage der Größe ist.'
  }
];

// Scenarios
export const forestScenarios: Scenario[] = [
  {
    id: 'forest-scenario-1',
    islandId: 'forest' as IslandId,
    title: 'Der dunkle Eingang',
    description: 'Der Wald ist dunkel und unheimlich. Timber spürt deine Angst.',
    npcId: 'timber',
    completed: false,
    scenes: [
      {
        id: 'f1-s1',
        text: 'Du stehst am Rand eines dunklen Waldes. Die Bäume ragen wie schwarze Finger in den grauen Himmel. Kein Vogel singt. Kein Wind weht. Nur Stille – und das Pochen deines eigenen Herzens. Dann bewegt sich etwas. Ein uralter Baum öffnet seine Augen. "Ich bin Timber", knarrt er. "Und ich rieche deine Angst."',
        choices: [
          {
            id: 'f1-s1-c1',
            text: 'Ja, ich habe Angst. Aber ich bin trotzdem hier.',
            points: 3,
            nextSceneId: 'f1-s2'
          },
          {
            id: 'f1-s1-c2',
            text: 'Ich habe keine Angst! (Deine Stimme zittert.)',
            points: 1,
            nextSceneId: 'f1-s2'
          },
          {
            id: 'f1-s1-c3',
            text: 'Was ist dieser Ort?',
            points: 2,
            nextSceneId: 'f1-s2'
          }
        ]
      },
      {
        id: 'f1-s2',
        text: 'Timber lacht leise – ein Geräusch wie raschelndes Laub. "Dieser Wald ist der Wald der Angst. Jeder, der hierher kommt, bringt seine eigene Dunkelheit mit. Auf dem Vulkan hast du die Wut kennengelernt. Im Ozean die Trauer. Hier wartet etwas anderes: die Angst." Seine Augen leuchten sanft. "Bereit für den ersten Schritt?"',
        choices: [
          {
            id: 'f1-s2-c1',
            text: 'Ich gehe hinein. Ein Schritt nach dem anderen.',
            points: 3,
            nextSceneId: 'f1-s3'
          },
          {
            id: 'f1-s2-c2',
            text: 'Kannst du mir sagen, was mich erwartet?',
            points: 2,
            nextSceneId: 'f1-s3'
          },
          {
            id: 'f1-s2-c3',
            text: 'Ich bleibe lieber hier am Rand.',
            points: 1,
            nextSceneId: 'f1-s3'
          }
        ]
      },
      {
        id: 'f1-s3',
        text: 'Du betrittst den Wald. Sofort verschluckt die Dunkelheit das Licht hinter dir. Dein Herz hämmert. Deine Hände werden feucht. Ein Ast knackt – du zuckst zusammen. Dein Körper schreit: Lauf weg! Aber Timber flüstert aus dem Boden: "Das ist nur dein Körper, der dich beschützen will. Angst ist ein Alarm – kein Befehl."',
        choices: [
          {
            id: 'f1-s3-c1',
            text: 'Ich atme tief ein und höre auf meinen Verstand, nicht auf den Alarm.',
            points: 3,
            nextSceneId: 'f1-s4'
          },
          {
            id: 'f1-s3-c2',
            text: 'Mein Herz rast, aber ich bleibe stehen.',
            points: 2,
            nextSceneId: 'f1-s4'
          },
          {
            id: 'f1-s3-c3',
            text: 'Ich gehe einen Schritt zurück, bevor ich weitergehe.',
            points: 1,
            nextSceneId: 'f1-s4'
          }
        ]
      },
      {
        id: 'f1-s4',
        text: 'Zwischen den Bäumen tauchen seltsame Formen auf – Gesichter in der Rinde, Hände aus Moos, flüsternde Stimmen. "Dreh um... du schaffst das nicht... du bist zu schwach..." Timber sagt: "Die Stimmen der Angst lügen. Sie klingen real, aber sie sind nur Echos alter Zweifel."',
        choices: [
          {
            id: 'f1-s4-c1',
            text: 'Ich sage laut: "Ihr seid nur Echos. Ihr seid nicht die Wahrheit."',
            points: 3,
            nextSceneId: 'f1-s5'
          },
          {
            id: 'f1-s4-c2',
            text: 'Ich ignoriere die Stimmen und gehe weiter.',
            points: 2,
            nextSceneId: 'f1-s5'
          },
          {
            id: 'f1-s4-c3',
            text: 'Ich halte mir die Ohren zu.',
            points: 1,
            nextSceneId: 'f1-s5'
          }
        ]
      },
      {
        id: 'f1-s5',
        text: 'Der Pfad führt zu einer Stelle, wo die Dunkelheit am dichtesten ist. Du kannst deine eigene Hand nicht sehen. Timber sagt: "Hier ist deine erste Prüfung. Geh zehn Schritte in die absolute Dunkelheit. Allein. Ohne Licht. Vertrau darauf, dass der Boden dich trägt."',
        choices: [
          {
            id: 'f1-s5-c1',
            text: 'Ich zähle laut und gehe: Eins... zwei... drei...',
            points: 3,
            nextSceneId: 'f1-s6'
          },
          {
            id: 'f1-s5-c2',
            text: 'Ich taste mich vorsichtig vorwärts, Schritt für Schritt.',
            points: 2,
            nextSceneId: 'f1-s6'
          },
          {
            id: 'f1-s5-c3',
            text: 'Zehn Schritte... das ist doch nicht so viel. Ich versuche es.',
            points: 2,
            nextSceneId: 'f1-s6'
          }
        ]
      },
      {
        id: 'f1-s6',
        text: 'Beim zehnten Schritt bricht Mondlicht durch die Baumkronen. Du stehst auf einer kleinen Lichtung. Die Angst ist noch da – aber sie hat dich nicht aufgehalten. Timber erscheint neben dir und neigt seine Krone. "Du hast den ersten Schritt getan. Nicht ohne Angst – sondern mit ihr. Das ist der Unterschied zwischen Feigheit und Mut. Willkommen im Wald der Angst."',
        choices: [
          {
            id: 'f1-s6-c1',
            text: 'Ich habe gelernt: Angst ist kein Stopp-Schild, sondern ein Wegbegleiter.',
            points: 3,
            nextSceneId: null
          },
          {
            id: 'f1-s6-c2',
            text: 'Danke, Timber. Ich bin bereit für das, was kommt.',
            points: 2,
            nextSceneId: null
          },
          {
            id: 'f1-s6-c3',
            text: 'Das war das Schwerste, was ich je gemacht habe – aber ich habe es geschafft.',
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
    title: 'Fayes zwei Welten',
    description: 'Faye lebt zwischen Syrien und Luxemburg – und du entdeckst deine eigene Angst vor dem Anderssein',
    npcId: 'faye',
    completed: false,
    scenes: [
      {
        id: 'f2-s1',
        text: 'Auf der Lichtung sitzt ein Mädchen zwischen zwei Wegen. Der eine ist mit Jasmin bewachsen und riecht nach Damaskus. Der andere ist mit Moos bedeckt und führt in einen Luxemburger Wald. "Ich bin Faye", sagt sie leise. "Und jeden Tag muss ich wählen, welchen Weg ich gehe. Aber egal welchen ich wähle – ich habe Angst, den anderen zu verlieren."',
        choices: [
          {
            id: 'f2-s1-c1',
            text: 'Du musst dich nicht entscheiden. Erzähl mir von beiden Wegen.',
            points: 3,
            nextSceneId: 'f2-s2'
          },
          {
            id: 'f2-s1-c2',
            text: 'Wovor hast du mehr Angst – zu vergessen oder nicht dazuzugehören?',
            points: 3,
            nextSceneId: 'f2-s2'
          },
          {
            id: 'f2-s1-c3',
            text: 'Das klingt sehr schwer.',
            points: 2,
            nextSceneId: 'f2-s2'
          }
        ]
      },
      {
        id: 'f2-s2',
        text: 'Fayes Augen werden feucht. "In der Schule sage ich, dass ich Luxemburgerin bin. Zu Hause bin ich Syrerin. Beim Mittagessen esse ich Kniddelen, abends kocht Mama Kibbeh. Meine Freundinnen fragen: \'Was bist du eigentlich?\' Und ich denke: Wenn ich die Wahrheit sage – dass ich beides bin – gehöre ich nirgendwo dazu."',
        choices: [
          {
            id: 'f2-s2-c1',
            text: 'Beides zu sein ist keine Schwäche – es ist eine Superkraft.',
            points: 3,
            nextSceneId: 'f2-s3'
          },
          {
            id: 'f2-s2-c2',
            text: 'Ich kenne das Gefühl, nicht ganz hineinzupassen.',
            points: 3,
            nextSceneId: 'f2-s3'
          },
          {
            id: 'f2-s2-c3',
            text: 'Was sagen deine Freundinnen, wenn du ehrlich bist?',
            points: 2,
            nextSceneId: 'f2-s3'
          }
        ]
      },
      {
        id: 'f2-s3',
        text: 'Faye steht auf. "Letzte Woche sollte ich in der Schule über meine Kultur erzählen. Mein Herz raste. Was, wenn sie lachen? Was, wenn sie Syrien nur mit Krieg verbinden? Ich habe fast abgesagt." Sie schaut dich an. "Hast du auch manchmal Angst, etwas von dir zu zeigen, das anders ist?"',
        choices: [
          {
            id: 'f2-s3-c1',
            text: 'Ja. Ich habe Angst, dass andere mich nicht verstehen, wenn ich zeige, wer ich wirklich bin.',
            points: 3,
            nextSceneId: 'f2-s4'
          },
          {
            id: 'f2-s3-c2',
            text: 'Manchmal verstecke ich Teile von mir, um dazuzugehören.',
            points: 3,
            nextSceneId: 'f2-s4'
          },
          {
            id: 'f2-s3-c3',
            text: 'Ich bin nicht sicher. Vielleicht.',
            points: 1,
            nextSceneId: 'f2-s4'
          }
        ]
      },
      {
        id: 'f2-s4',
        text: '"Ich habe den Vortrag dann doch gehalten", sagt Faye und ihre Stimme wird fester. "Ich habe von Damaskus erzählt. Vom Jasmin, der über die Mauern wächst. Von meiner Oma, die die besten Geschichten kannte. Und weißt du was? Sie haben nicht gelacht. Marie hat sogar geweint. Und Tim hat gesagt: \'Das ist viel cooler als mein langweiliges Esch.\'"',
        choices: [
          {
            id: 'f2-s4-c1',
            text: 'Siehst du? Deine Geschichte hat andere berührt. Dein Anderssein ist ein Geschenk.',
            points: 3,
            nextSceneId: 'f2-s5'
          },
          {
            id: 'f2-s4-c2',
            text: 'Die Angst hat dich fast davon abgehalten, etwas Schönes zu teilen.',
            points: 3,
            nextSceneId: 'f2-s5'
          },
          {
            id: 'f2-s4-c3',
            text: 'Das war sehr mutig von dir.',
            points: 2,
            nextSceneId: 'f2-s5'
          }
        ]
      },
      {
        id: 'f2-s5',
        text: 'Faye sieht die zwei Wege an. Plötzlich wachsen sie zusammen – Jasmin und Moos verschmelzen zu einem einzigen Pfad. "Ich muss nicht wählen", flüstert sie staunend. "Ich bin kein halbes Mädchen aus zwei Hälften. Ich bin ein ganzes Mädchen aus zwei Welten." Sie dreht sich zu dir. "Und du? Welchen Teil von dir versteckst du aus Angst?"',
        choices: [
          {
            id: 'f2-s5-c1',
            text: 'Ich verstecke Dinge, die mich anders machen. Aber vielleicht sollte ich sie zeigen.',
            points: 3,
            nextSceneId: 'f2-s6'
          },
          {
            id: 'f2-s5-c2',
            text: 'Du hast recht – Angst vor dem Anderssein nimmt uns einen Teil von uns selbst.',
            points: 3,
            nextSceneId: 'f2-s6'
          },
          {
            id: 'f2-s5-c3',
            text: 'Ich muss darüber nachdenken.',
            points: 2,
            nextSceneId: 'f2-s6'
          }
        ]
      },
      {
        id: 'f2-s6',
        text: 'Faye nimmt deine Hand. "Weißt du, was mir am meisten geholfen hat? Zu verstehen, dass die Angst vor dem Anderssein eigentlich Angst vor Ablehnung ist. Aber die Menschen, die dich für das ablehnen, was du wirklich bist, sind nicht die Menschen, bei denen du sein sollst." Der Jasmin-Moos-Pfad leuchtet golden. "Geh deinen eigenen Weg. Ganz."',
        choices: [
          {
            id: 'f2-s6-c1',
            text: 'Danke, Faye. Ich werde aufhören, Teile von mir zu verstecken.',
            points: 3,
            nextSceneId: null
          },
          {
            id: 'f2-s6-c2',
            text: 'Du bist eine Brückenbauerin – zwischen Welten und zwischen Herzen.',
            points: 3,
            nextSceneId: null
          },
          {
            id: 'f2-s6-c3',
            text: 'Deine Geschichte hat mir Mut gemacht, mich selbst zu zeigen.',
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
    title: 'Der Schattenflüsterer',
    description: 'Eine geheimnisvolle Fledermaus lehrt dich, dass Ängste nur Schatten sind',
    npcId: 'schattenfluesterer',
    completed: false,
    scenes: [
      {
        id: 'f3-s1',
        text: 'Tiefer im Wald wird es kälter. Du bemerkst, dass dein Schatten sich seltsam verhält – er bewegt sich anders als du. Plötzlich löst er sich vom Boden und steht dir gegenüber. Bevor du schreien kannst, flattert eine Fledermaus herab. "Keine Panik", piepst sie. "Ich bin der Schattenflüsterer. Und das dort – das ist dein Schatten-Ich. Der Teil von dir, den du nicht sehen willst."',
        choices: [
          {
            id: 'f3-s1-c1',
            text: 'Mein Schatten-Ich? Was bedeutet das?',
            points: 2,
            nextSceneId: 'f3-s2'
          },
          {
            id: 'f3-s1-c2',
            text: 'Ich habe Angst davor. Es sieht... dunkel aus.',
            points: 3,
            nextSceneId: 'f3-s2'
          },
          {
            id: 'f3-s1-c3',
            text: 'Bring es weg!',
            points: 1,
            nextSceneId: 'f3-s2'
          }
        ]
      },
      {
        id: 'f3-s2',
        text: 'Schattenflüsterer fliegt um deinen Schatten. "Jeder Mensch hat ein Schatten-Ich. Es besteht aus allem, was du fürchtest, versteckst, verleugnest. Deine Unsicherheit. Deine Eifersucht. Deine heimliche Wut. Die Dinge, für die du dich schämst." Dein Schatten wird größer. "Je mehr du ihn ignorierst, desto mächtiger wird er."',
        choices: [
          {
            id: 'f3-s2-c1',
            text: 'Dann will ich ihn kennenlernen, bevor er noch größer wird.',
            points: 3,
            nextSceneId: 'f3-s3'
          },
          {
            id: 'f3-s2-c2',
            text: 'Warum habe ich Angst vor einem Teil von mir selbst?',
            points: 3,
            nextSceneId: 'f3-s3'
          },
          {
            id: 'f3-s2-c3',
            text: 'Vielleicht sollte ich einfach nicht hinsehen.',
            points: 1,
            nextSceneId: 'f3-s3'
          }
        ]
      },
      {
        id: 'f3-s3',
        text: 'Schattenflüsterer führt dich in eine Höhle aus Wurzeln. An den Wänden flackern Bilder – Szenen aus deinem Leben. Du siehst dich selbst, wie du jemanden angelogen hast, um dazuzugehören. Wie du neidisch auf jemanden warst. Wie du vor etwas weggelaufen bist. "Das sind keine Monster", sagt die Fledermaus sanft. "Das sind Momente, die du vergessen willst. Aber sie brauchen deine Aufmerksamkeit."',
        choices: [
          {
            id: 'f3-s3-c1',
            text: 'Ich sehe hin. Es tut weh, aber ich sehe hin.',
            points: 3,
            nextSceneId: 'f3-s4'
          },
          {
            id: 'f3-s3-c2',
            text: 'Ich spreche zu den Bildern: "Ich erkenne euch an."',
            points: 3,
            nextSceneId: 'f3-s4'
          },
          {
            id: 'f3-s3-c3',
            text: 'Es ist schwer, diese Dinge anzusehen.',
            points: 2,
            nextSceneId: 'f3-s4'
          }
        ]
      },
      {
        id: 'f3-s4',
        text: 'Dein Schatten-Ich tritt vor dich. Es sieht aus wie du, aber seine Augen sind traurig. Es öffnet den Mund: "Warum hast du mich weggesperrt? Ich bin deine Angst, nicht genug zu sein. Ich bin dein Zweifel. Ich bin das Gefühl, dass alle anderen besser sind. Ich wollte dich nur beschützen – aber du hast mich zum Monster gemacht."',
        choices: [
          {
            id: 'f3-s4-c1',
            text: 'Es tut mir leid. Ich hätte dich nicht wegstoßen sollen.',
            points: 3,
            nextSceneId: 'f3-s5'
          },
          {
            id: 'f3-s4-c2',
            text: 'Du bist kein Monster. Du bist ein Teil von mir, den ich nicht verstanden habe.',
            points: 3,
            nextSceneId: 'f3-s5'
          },
          {
            id: 'f3-s4-c3',
            text: 'Was brauchst du von mir?',
            points: 2,
            nextSceneId: 'f3-s5'
          }
        ]
      },
      {
        id: 'f3-s5',
        text: 'Das Schatten-Ich streckt dir die Hand entgegen. Schattenflüsterer flüstert: "Das ist der schwierigste Moment. Die meisten Menschen rennen jetzt weg. Aber wenn du dein Schatten-Ich an die Hand nimmst – dann vereinst du Licht und Dunkelheit in dir. Dann kann keine Angst der Welt dich mehr zerbrechen."',
        choices: [
          {
            id: 'f3-s5-c1',
            text: 'Ich nehme die Hand meines Schattens. Wir gehören zusammen.',
            points: 3,
            nextSceneId: 'f3-s6'
          },
          {
            id: 'f3-s5-c2',
            text: 'Ich umarme mein Schatten-Ich. Du bist willkommen.',
            points: 3,
            nextSceneId: 'f3-s6'
          },
          {
            id: 'f3-s5-c3',
            text: 'Ich zögere... aber dann greife ich zu.',
            points: 2,
            nextSceneId: 'f3-s6'
          }
        ]
      },
      {
        id: 'f3-s6',
        text: 'Als du deinen Schatten berührst, durchströmt dich Wärme. Er verschmilzt mit dir – nicht weg, sondern hinein. Du fühlst dich... vollständiger. Stärker. Schattenflüsterer lächelt mit seinen kleinen Zähnen. "Siehst du? Du bist nicht trotz deiner Schatten wertvoll. Du bist wegen ihnen ganz. Wer seinen Schatten umarmt, den kann die Dunkelheit nicht mehr schrecken."',
        choices: [
          {
            id: 'f3-s6-c1',
            text: 'Ich bin nicht perfekt – und genau das macht mich vollständig.',
            points: 3,
            nextSceneId: 'f3-s7'
          },
          {
            id: 'f3-s6-c2',
            text: 'Meine Ängste sind keine Feinde mehr. Sie sind Lehrer.',
            points: 3,
            nextSceneId: 'f3-s7'
          },
          {
            id: 'f3-s6-c3',
            text: 'Danke, Schattenflüsterer. Das werde ich nie vergessen.',
            points: 2,
            nextSceneId: 'f3-s7'
          }
        ]
      },
      {
        id: 'f3-s7',
        text: 'Schattenflüsterer fliegt auf deine Schulter. "Eine letzte Sache", piepst er. "Die anderen im Wald brauchen dich. Timber, Faye, Lumi – sie kämpfen auch mit ihren Schatten. Was du heute gelernt hast, wirst du bald brauchen. Für sie. Und für den Wald selbst." Seine Worte klingen wie eine Warnung – und ein Versprechen.',
        choices: [
          {
            id: 'f3-s7-c1',
            text: 'Ich bin bereit, anderen zu helfen, ihre Schatten zu umarmen.',
            points: 3,
            nextSceneId: null
          },
          {
            id: 'f3-s7-c2',
            text: 'Was kommt auf den Wald zu? Was meinst du?',
            points: 2,
            nextSceneId: null
          },
          {
            id: 'f3-s7-c3',
            text: 'Ich werde da sein, wenn ich gebraucht werde.',
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
    title: 'Lumis Mission',
    description: 'Ein winziges Glühwürmchen muss Licht durch den dunkelsten Teil des Waldes tragen – gegen alle Stimmen, die sagen: unmöglich',
    npcId: 'lumi',
    completed: false,
    scenes: [
      {
        id: 'f4-s1',
        text: 'Ein winziges Leuchten nähert sich dir – es ist Lumi, das Glühwürmchen. Sie flackert aufgeregt. "Du musst mir helfen! Am Ende des Waldes liegt die Schattenschlucht. Dort ist ein junger Baum, der ohne Licht stirbt. Timber hat mich gebeten, ihm mein Licht zu bringen. Aber..." Sie flackert ängstlich. "Es ist der dunkelste Ort im ganzen Wald."',
        choices: [
          {
            id: 'f4-s1-c1',
            text: 'Ich komme mit dir. Zusammen schaffen wir das.',
            points: 3,
            nextSceneId: 'f4-s2'
          },
          {
            id: 'f4-s1-c2',
            text: 'Warum hat Timber ausgerechnet dich gefragt?',
            points: 2,
            nextSceneId: 'f4-s2'
          },
          {
            id: 'f4-s1-c3',
            text: 'Die Schattenschlucht? Das klingt gefährlich.',
            points: 2,
            nextSceneId: 'f4-s2'
          }
        ]
      },
      {
        id: 'f4-s2',
        text: 'Auf dem Weg trefft ihr eine Gruppe Waldtiere – Eichhörnchen, Käfer, ein Reh. Als sie hören, wohin ihr wollt, schütteln sie die Köpfe. "Unmöglich!", ruft das Eichhörnchen. "Kein Licht überlebt die Schattenschlucht!" Das Reh flüstert: "Andere haben es versucht. Alle sind gescheitert." Der Käfer lacht. "Du? Du bist doch viel zu klein, Lumi!"',
        choices: [
          {
            id: 'f4-s2-c1',
            text: 'Hört nicht auf sie, Lumi. Größe bestimmt nicht, was du kannst.',
            points: 3,
            nextSceneId: 'f4-s3'
          },
          {
            id: 'f4-s2-c2',
            text: 'Vielleicht haben sie recht... es klingt wirklich gefährlich.',
            points: 1,
            nextSceneId: 'f4-s3'
          },
          {
            id: 'f4-s2-c3',
            text: 'Warum versucht ihr es nicht selbst, statt andere kleinzumachen?',
            points: 3,
            nextSceneId: 'f4-s3'
          }
        ]
      },
      {
        id: 'f4-s3',
        text: 'Lumis Licht wird schwächer. Die Worte der anderen verletzen sie. "Vielleicht haben sie recht", piepst sie. "Ich bin nur ein Glühwürmchen. Was kann mein kleines Licht schon gegen die Dunkelheit ausrichten?" Noch mehr Tiere versammeln sich. "Gib auf, Lumi! Das ist nichts für dich!"',
        choices: [
          {
            id: 'f4-s3-c1',
            text: 'Lumi, erinnerst du dich? Timber hat DICH gewählt. Nicht das Reh, nicht das Eichhörnchen. DICH.',
            points: 3,
            nextSceneId: 'f4-s4'
          },
          {
            id: 'f4-s3-c2',
            text: 'In der dunkelsten Nacht ist das kleinste Licht am wichtigsten.',
            points: 3,
            nextSceneId: 'f4-s4'
          },
          {
            id: 'f4-s3-c3',
            text: 'Willst du wirklich aufgeben, weil andere es sagen?',
            points: 2,
            nextSceneId: 'f4-s4'
          }
        ]
      },
      {
        id: 'f4-s4',
        text: 'Lumi leuchtet wieder heller. Ihr betretet die Schattenschlucht. Die Dunkelheit ist erdrückend – dicker als Nebel, kälter als Eis. Lumis Licht ist nur ein winziger Punkt in der Schwärze. Die Schatten flüstern: "Du wirst versagen... dein Licht erlischt gleich... du bist zu schwach..." Lumi zittert, aber fliegt weiter.',
        choices: [
          {
            id: 'f4-s4-c1',
            text: 'Ich gehe dicht neben Lumi und sage: "Ich bin hier. Du bist nicht allein."',
            points: 3,
            nextSceneId: 'f4-s5'
          },
          {
            id: 'f4-s4-c2',
            text: 'Die Schatten lügen, Lumi! Dein Licht brennt noch!',
            points: 3,
            nextSceneId: 'f4-s5'
          },
          {
            id: 'f4-s4-c3',
            text: 'Weiter, Lumi. Schritt für Schritt. Flügelschlag für Flügelschlag.',
            points: 2,
            nextSceneId: 'f4-s5'
          }
        ]
      },
      {
        id: 'f4-s5',
        text: 'Am tiefsten Punkt der Schlucht erlischt Lumis Licht fast. Sie fällt. "Ich kann nicht mehr", weint sie. "Alle hatten recht. Ich bin zu klein. Zu schwach." Um euch herum lauert die totale Dunkelheit. Das ist der Moment der Wahrheit.',
        choices: [
          {
            id: 'f4-s5-c1',
            text: 'Ich fange Lumi auf und halte sie an mein Herz. "Dein Licht kommt von innen. Niemand kann es löschen."',
            points: 3,
            nextSceneId: 'f4-s6'
          },
          {
            id: 'f4-s5-c2',
            text: 'Lumi, der junge Baum braucht dich. Du bist seine einzige Hoffnung.',
            points: 3,
            nextSceneId: 'f4-s6'
          },
          {
            id: 'f4-s5-c3',
            text: 'Atme, Lumi. Erinnerst du dich an Timbers Worte? Angst ist ein Alarm, kein Befehl.',
            points: 2,
            nextSceneId: 'f4-s6'
          }
        ]
      },
      {
        id: 'f4-s6',
        text: 'Lumi atmet tief ein – und ihr Licht explodiert. Heller als je zuvor strahlt sie und durchbricht die Schattenschlucht. Vor euch steht der junge Baum, seine Blätter bereits welk. Lumi berührt ihn – und er blüht auf, golden und strahlend. Als ihr zurückkehrt, schweigen die Waldtiere staunend. Lumi sagt leise: "Sie sagten, es sei unmöglich. Aber \'unmöglich\' ist nur die Angst der anderen, verkleidet als Ratschlag."',
        choices: [
          {
            id: 'f4-s6-c1',
            text: 'Lass nie zu, dass die Angst anderer bestimmt, was du kannst.',
            points: 3,
            nextSceneId: null
          },
          {
            id: 'f4-s6-c2',
            text: 'Dein Licht war nie zu klein. Die anderen hatten nur zu viel Angst, es zu sehen.',
            points: 3,
            nextSceneId: null
          },
          {
            id: 'f4-s6-c3',
            text: 'Du hast bewiesen, dass Mut stärker ist als Gruppendruck.',
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
    title: 'Die Nacht der Prüfung',
    description: 'Du bist allein im Wald. Keine Hilfe. Nur du und deine Angst.',
    npcId: 'timber',
    completed: false,
    scenes: [
      {
        id: 'f5-s1',
        text: 'Die Sonne sinkt. Timber ruft dich zu sich. "Heute Nacht ist deine Prüfung", sagt er ernst. "Du wirst allein durch den Wald gehen. Ohne Lumi. Ohne Schattenflüsterer. Ohne Faye. Ohne mich." Er schaut dich lange an. "Du hast auf dem Vulkan Wut besiegt, im Ozean Trauer umarmt – jetzt ist die Angst dran. Aber diesmal bist du auf dich allein gestellt."',
        choices: [
          {
            id: 'f5-s1-c1',
            text: 'Ich bin bereit. Alles, was ich gelernt habe, trage ich in mir.',
            points: 3,
            nextSceneId: 'f5-s2'
          },
          {
            id: 'f5-s1-c2',
            text: 'Allein? Warum kann niemand mitkommen?',
            points: 2,
            nextSceneId: 'f5-s2'
          },
          {
            id: 'f5-s1-c3',
            text: 'Ich habe Angst. Aber ich weiß, dass Angst kein Stopp-Schild ist.',
            points: 3,
            nextSceneId: 'f5-s2'
          }
        ]
      },
      {
        id: 'f5-s2',
        text: 'Die Nacht bricht herein. Du bist allein. Der Wald knarzt, ächzt, flüstert. Jeder Schatten könnte ein Monster sein. Dein Herzschlag dröhnt in deinen Ohren. Plötzlich hörst du Schritte hinter dir – aber als du dich umdrehst, ist niemand da. Dein Körper will rennen. Jede Faser schreit: FLIEH!',
        choices: [
          {
            id: 'f5-s2-c1',
            text: 'Ich bleibe stehen. Ich atme. Vier Sekunden ein, vier halten, sechs aus. Wie Timber es gelehrt hat.',
            points: 3,
            nextSceneId: 'f5-s3'
          },
          {
            id: 'f5-s2-c2',
            text: 'Ich sage laut zu mir selbst: "Angst ist ein Alarm, kein Befehl."',
            points: 3,
            nextSceneId: 'f5-s3'
          },
          {
            id: 'f5-s2-c3',
            text: 'Ich renne ein paar Schritte, halte dann an und sammle mich.',
            points: 1,
            nextSceneId: 'f5-s3'
          }
        ]
      },
      {
        id: 'f5-s3',
        text: 'Der Wald zeigt dir Bilder. Du siehst dich selbst auf dem Vulkan – wie die Lava der Wut in dir brannte und du gelernt hast, sie nicht zu unterdrücken, sondern zu lenken. Die Erinnerung wärmt dich. Dann eine Stimme aus der Dunkelheit: "Du bist schwach. Du konntest deine Wut kaum kontrollieren. Was lässt dich glauben, du könntest die Angst besiegen?"',
        choices: [
          {
            id: 'f5-s3-c1',
            text: 'Ich habe auf dem Vulkan gelernt, dass Wut eine Kraft ist, wenn ich sie verstehe. Das gilt auch für die Angst.',
            points: 3,
            nextSceneId: 'f5-s4'
          },
          {
            id: 'f5-s3-c2',
            text: 'Ich will die Angst nicht besiegen. Ich will sie verstehen.',
            points: 3,
            nextSceneId: 'f5-s4'
          },
          {
            id: 'f5-s3-c3',
            text: 'Sei still. Du bist nur ein Echo.',
            points: 2,
            nextSceneId: 'f5-s4'
          }
        ]
      },
      {
        id: 'f5-s4',
        text: 'Neue Bilder: Du bist im Ozean. Du erinnerst dich an die Trauer, die Wellen, die dich verschlingen wollten. Du hast gelernt, nicht gegen sie anzukämpfen, sondern mit ihnen zu schwimmen. Die Dunkelheit flüstert wieder: "Aber hier gibt es kein Wasser. Hier gibt es nur Schwärze und Kälte. Hier bist du wirklich allein."',
        choices: [
          {
            id: 'f5-s4-c1',
            text: 'Im Ozean habe ich gelernt: Mitgefühl heilt. Auch Mitgefühl mit mir selbst – gerade jetzt.',
            points: 3,
            nextSceneId: 'f5-s5'
          },
          {
            id: 'f5-s4-c2',
            text: 'Ich bin nicht allein. Ich trage Faye, Lumi, Timber und Schattenflüsterer in meinem Herzen.',
            points: 3,
            nextSceneId: 'f5-s5'
          },
          {
            id: 'f5-s4-c3',
            text: 'Trauer hat mich gelehrt, verletzlich zu sein. Das hilft mir auch jetzt.',
            points: 2,
            nextSceneId: 'f5-s5'
          }
        ]
      },
      {
        id: 'f5-s5',
        text: 'Die Dunkelheit verdichtet sich zu einer Gestalt – deiner größten Angst. Sie ist riesig und hat dein Gesicht. "Du wirst versagen", sagt sie mit deiner Stimme. "Du wirst immer Angst haben. Du wirst nie genug sein. Du wirst allein bleiben." Sie steht zwischen dir und dem Ausgang des Waldes. Der einzige Weg raus – ist durch sie hindurch.',
        choices: [
          {
            id: 'f5-s5-c1',
            text: 'Ich gehe auf sie zu. "Du bist meine Angst. Und ich nehme dich an. Aber du bestimmst nicht meinen Weg."',
            points: 3,
            nextSceneId: 'f5-s6'
          },
          {
            id: 'f5-s5-c2',
            text: 'Ich erinnere mich an den Schattenflüsterer: Mein Schatten gehört zu mir. Ich strecke die Hand aus.',
            points: 3,
            nextSceneId: 'f5-s6'
          },
          {
            id: 'f5-s5-c3',
            text: 'Ich schließe die Augen und gehe geradeaus. Durch die Angst hindurch.',
            points: 2,
            nextSceneId: 'f5-s6'
          }
        ]
      },
      {
        id: 'f5-s6',
        text: 'Du gehst durch die Gestalt hindurch. Sie löst sich auf wie Nebel. Dahinter – die Morgendämmerung. Rosa und Gold am Horizont. Du hast die Nacht überlebt. Nicht weil du keine Angst hattest, sondern weil du sie angenommen hast. Du fällst auf die Knie. Tränen laufen. Aber es sind Tränen der Erleichterung, nicht der Angst.',
        choices: [
          {
            id: 'f5-s6-c1',
            text: 'Ich habe die dunkelste Nacht allein durchgestanden. Ich bin stärker, als ich dachte.',
            points: 3,
            nextSceneId: 'f5-s7'
          },
          {
            id: 'f5-s6-c2',
            text: 'Wut, Trauer, Angst – ich habe alle drei kennengelernt. Sie sind Teile von mir.',
            points: 3,
            nextSceneId: 'f5-s7'
          },
          {
            id: 'f5-s6-c3',
            text: 'Nie mehr werde ich meine Angst zum Feind machen.',
            points: 2,
            nextSceneId: 'f5-s7'
          }
        ]
      },
      {
        id: 'f5-s7',
        text: 'Timber steht am Waldrand und wartet. Seine alten Augen glänzen. "Du bist zurück", sagt er leise. "Nicht unversehrt – denn die Nacht hinterlässt immer Spuren. Aber ganz. Wer die Nacht der Prüfung besteht, den kann nichts mehr brechen." Er neigt seine Krone tief. "Aber ruh dich nicht zu lange aus. Der Wald braucht dich. Etwas Dunkles zieht auf."',
        choices: [
          {
            id: 'f5-s7-c1',
            text: 'Was auch kommt – ich bin bereit.',
            points: 3,
            nextSceneId: null
          },
          {
            id: 'f5-s7-c2',
            text: 'Diese Nacht hat mich verändert. Ich fürchte die Dunkelheit nicht mehr.',
            points: 2,
            nextSceneId: null
          },
          {
            id: 'f5-s7-c3',
            text: 'Danke, Timber. Was auch immer auf den Wald zukommt – ich werde kämpfen.',
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
    title: 'Der Wald erwacht',
    description: 'Ein dunkler Fluch liegt über dem Wald. Nur gemeinsam – mit Mut, Mitgefühl und Beherrschung – könnt ihr ihn retten.',
    npcId: 'timber',
    completed: false,
    scenes: [
      {
        id: 'f6-s1',
        text: 'Ein schwarzer Nebel kriecht durch den Wald. Die Bäume erstarren, die Vögel verstummen, die Blumen welken. Timber ächzt vor Schmerz – schwarze Adern ziehen sich durch seine Rinde. "Der Schattenfluch", stöhnt er. "Jemand hat so viel Angst angesammelt, dass sie den ganzen Wald vergiftet. Wenn wir nichts tun, stirbt der Wald – und mit ihm alles, was du hier gelernt hast."',
        choices: [
          {
            id: 'f6-s1-c1',
            text: 'Wie brechen wir den Fluch? Was muss ich tun?',
            points: 3,
            nextSceneId: 'f6-s2'
          },
          {
            id: 'f6-s1-c2',
            text: 'Ich habe die Nacht der Prüfung bestanden. Ich kann auch das schaffen.',
            points: 3,
            nextSceneId: 'f6-s2'
          },
          {
            id: 'f6-s1-c3',
            text: 'Der ganze Wald? Das ist... das ist zu viel für eine Person.',
            points: 1,
            nextSceneId: 'f6-s2'
          }
        ]
      },
      {
        id: 'f6-s2',
        text: 'Timber keuchst: "Du brauchst alle. Finde Faye, Schattenflüsterer und Lumi. Aber der Fluch hat sie getroffen – sie sind in ihren tiefsten Ängsten gefangen. Du musst sie befreien." Du rennst los. Als erstes findest du Faye – sie kauert auf dem Boden und weint. "Niemand will mich hier!", schluchzt sie. "Ich gehöre nirgendwohin! Ich sollte nie hergekommen sein!"',
        choices: [
          {
            id: 'f6-s2-c1',
            text: 'Faye, du gehörst zu BEIDEN Welten! Erinnerst du dich? Jasmin und Moos, vereint auf DEINEM Weg!',
            points: 3,
            nextSceneId: 'f6-s3'
          },
          {
            id: 'f6-s2-c2',
            text: 'Das ist der Fluch, der spricht, nicht die Wahrheit! Du bist eine Brückenbauerin, Faye!',
            points: 3,
            nextSceneId: 'f6-s3'
          },
          {
            id: 'f6-s2-c3',
            text: 'Ich nehme Fayes Hand und sage: "Ich bin hier. Du bist nicht allein."',
            points: 2,
            nextSceneId: 'f6-s3'
          }
        ]
      },
      {
        id: 'f6-s3',
        text: 'Faye erhebt sich, Tränen auf den Wangen, aber fest. "Danke. Der Fluch hat meine alte Angst benutzt." Zusammen findet ihr Schattenflüsterer – er ist in seiner eigenen Höhle eingesperrt, zitternd. "Meine Schatten! Sie sind echt geworden! Sie wollen mich verschlingen!" Sein Schatten-Ich tobt als Monster durch die Höhle. Hier brauchst du, was du auf dem Vulkan gelernt hast.',
        choices: [
          {
            id: 'f6-s3-c1',
            text: 'Ich stelle mich dem Schatten-Monster ruhig entgegen. Wut kontrollieren – nicht kämpfen, nicht fliehen, sondern verstehen.',
            points: 3,
            nextSceneId: 'f6-s4'
          },
          {
            id: 'f6-s3-c2',
            text: 'Schattenflüsterer! Dein Schatten ist kein Feind! Umarme ihn, so wie du es MIR beigebracht hast!',
            points: 3,
            nextSceneId: 'f6-s4'
          },
          {
            id: 'f6-s3-c3',
            text: 'Ich atme tief durch und erinnere mich an die Vulkan-Lektion: Starke Gefühle nicht unterdrücken, sondern lenken.',
            points: 2,
            nextSceneId: 'f6-s4'
          }
        ]
      },
      {
        id: 'f6-s4',
        text: 'Das Schatten-Monster schrumpft und wird wieder zu Schattenflüsterers sanftem Schatten-Ich. "Du hast meine eigene Lektion gegen den Fluch benutzt", staunt die Fledermaus. Zu dritt findet ihr Lumi – aber ihr Licht ist aus. Komplett. Sie liegt auf dem Boden, klein und dunkel. "Es hat keinen Sinn", piepst sie kaum hörbar. "Ich bin zu klein. Zu unwichtig. Mein Licht macht keinen Unterschied." Hier brauchst du, was du im Ozean gelernt hast.',
        choices: [
          {
            id: 'f6-s4-c1',
            text: 'Ich nehme Lumi vorsichtig in meine Hände und sage mit Mitgefühl: "Ich sehe dich. Dein Schmerz ist real. Aber er ist nicht die ganze Wahrheit."',
            points: 3,
            nextSceneId: 'f6-s5'
          },
          {
            id: 'f6-s4-c2',
            text: 'Im Ozean habe ich gelernt: Trauer braucht Empathie, nicht Lösungen. Ich halte Lumi einfach fest und weine mit ihr.',
            points: 3,
            nextSceneId: 'f6-s5'
          },
          {
            id: 'f6-s4-c3',
            text: 'Lumi, erinnerst du dich an die Schattenschlucht? Du hast den jungen Baum gerettet! Dein Licht macht einen Unterschied!',
            points: 2,
            nextSceneId: 'f6-s5'
          }
        ]
      },
      {
        id: 'f6-s5',
        text: 'Lumis Licht flackert – erst schwach, dann stärker. Sie fliegt auf. "Danke", flüstert sie. Ihr seid zu viert. Aber der schwarze Nebel wird dichter, der Fluch stärker. Timber steht im Zentrum des Waldes, fast vollständig von schwarzen Adern überzogen. "Ihr seid gekommen", ächzt er. "Aber der Fluch speist sich aus der Angst aller Wesen im Wald. Um ihn zu brechen, müsst ihr zeigen, dass Angst nicht das Letzte Wort hat. Zusammen."',
        choices: [
          {
            id: 'f6-s5-c1',
            text: 'Jeder von uns bringt etwas mit. Mut, Mitgefühl, Selbstkenntnis, Licht. Gemeinsam sind wir stärker als jeder Fluch.',
            points: 3,
            nextSceneId: 'f6-s6'
          },
          {
            id: 'f6-s5-c2',
            text: 'Faye – zeig dem Wald, dass man aus zwei Welten Brücken bauen kann. Lumi – leuchte! Schattenflüsterer – umarme die Schatten!',
            points: 3,
            nextSceneId: 'f6-s6'
          },
          {
            id: 'f6-s5-c3',
            text: 'Wir haben alle unsere Prüfungen bestanden. Das hier ist die letzte.',
            points: 2,
            nextSceneId: 'f6-s6'
          }
        ]
      },
      {
        id: 'f6-s6',
        text: 'Faye singt ein syrisches Lied – ihre Stimme durchbricht die Stille. Schattenflüsterer breitet seine Flügel aus und umarmt die Schatten des Waldes. Lumi strahlt mit aller Kraft und ihr Licht breitet sich aus wie eine goldene Welle. Du stehst in der Mitte und hältst alles zusammen – deine Wut nutzt du als Feuer gegen die Kälte, dein Mitgefühl als Heilung gegen den Schmerz, deinen Mut als Schild gegen die Angst. Der schwarze Nebel beginnt zu zerfallen.',
        choices: [
          {
            id: 'f6-s6-c1',
            text: 'Ich rufe in den Wald: "Angst ist nicht euer Feind! Sie gehört zu euch – aber sie bestimmt nicht, wer ihr seid!"',
            points: 3,
            nextSceneId: 'f6-s7'
          },
          {
            id: 'f6-s6-c2',
            text: 'Ich halte Lumis Licht, Fayes Stimme und Schattenflüsterers Umarmung in meinem Herzen – und lasse es leuchten.',
            points: 3,
            nextSceneId: 'f6-s7'
          },
          {
            id: 'f6-s6-c3',
            text: 'Wut, Trauer, Angst – alle drei vereint, alle drei verwandelt in Stärke!',
            points: 3,
            nextSceneId: 'f6-s7'
          }
        ]
      },
      {
        id: 'f6-s7',
        text: 'Der Fluch zerbricht. Der schwarze Nebel löst sich auf. Farbe kehrt in den Wald zurück – Grün, Gold, Silber, alle Farben der Natur. Die Bäume richten sich auf. Vögel singen. Blumen blühen. Timber öffnet seine Augen, frei von schwarzen Adern. "Du hast es geschafft", sagt er. "Nicht allein – aber du hast alle zusammengebracht. Wut gelenkt, Trauer in Mitgefühl verwandelt, Angst in Mut. Das ist die größte Lektion des Waldes: Du bist nicht deine Angst. Du bist der Mensch, der trotz der Angst handelt." Lumi strahlt, Faye lächelt, Schattenflüsterer verbeugt sich. Der Wald ist erwacht.',
        choices: [
          {
            id: 'f6-s7-c1',
            text: 'Dieser Wald hat mich für immer verändert. Ich trage euch alle in mir – Timber, Faye, Lumi, Schattenflüsterer.',
            points: 3,
            nextSceneId: null
          },
          {
            id: 'f6-s7-c2',
            text: 'Wut, Trauer, Angst – keine dieser Emotionen ist mein Feind. Sie sind Teile meiner Stärke.',
            points: 3,
            nextSceneId: null
          },
          {
            id: 'f6-s7-c3',
            text: 'Danke, ihr alle. Ich bin nicht furchtlos – aber ich bin mutig. Und das ist genug.',
            points: 3,
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
    title: 'Angst ist ein Alarm, kein Befehl',
    content: 'Dein Körper schlägt Alarm, wenn er Gefahr vermutet – rasendes Herz, feuchte Hände, flacher Atem. Aber ein Alarm ist ein Hinweis, keine Anweisung. Du entscheidest, ob du rennst oder bleibst.',
    collected: false
  },
  {
    id: 'forest-wisdom-2',
    islandId: 'forest' as IslandId,
    title: 'Mut ist nicht die Abwesenheit von Angst',
    content: 'Mut bedeutet nicht, keine Angst zu haben. Mut bedeutet, Angst zu spüren – und trotzdem den nächsten Schritt zu machen. Die mutigsten Menschen sind oft die, die am meisten zittern.',
    collected: false
  },
  {
    id: 'forest-wisdom-3',
    islandId: 'forest' as IslandId,
    title: 'Zwei Welten machen dich ganz',
    content: 'Wenn du zwischen Kulturen, Sprachen oder Identitäten lebst, bist du kein halber Mensch. Du bist ein ganzer Mensch mit doppelter Perspektive. Deine Brücke zwischen den Welten ist deine größte Stärke.',
    collected: false
  },
  {
    id: 'forest-wisdom-4',
    islandId: 'forest' as IslandId,
    title: 'Die Angst vor dem Anderssein ist Angst vor Ablehnung',
    content: 'Wenn du Teile von dir versteckst, um dazuzugehören, verlierst du genau das, was dich einzigartig macht. Die Menschen, die dich für dein wahres Ich ablehnen, sind nicht deine Menschen.',
    collected: false
  },
  {
    id: 'forest-wisdom-5',
    islandId: 'forest' as IslandId,
    title: 'Dein Schatten-Ich braucht eine Umarmung',
    content: 'Jeder Mensch hat Seiten, die er versteckt – Unsicherheit, Neid, Zweifel. Je mehr du sie wegsperrst, desto mächtiger werden sie. Umarme dein Schatten-Ich, und es wird vom Monster zum Verbündeten.',
    collected: false
  },
  {
    id: 'forest-wisdom-6',
    islandId: 'forest' as IslandId,
    title: 'Ängste werden kleiner, wenn du sie anschaust',
    content: 'Eine Angst, die du vermeidest, wächst. Eine Angst, die du ansiehst, schrumpft. Nicht sofort – aber mit jedem Blick verliert sie ein Stück ihrer Macht über dich.',
    collected: false
  },
  {
    id: 'forest-wisdom-7',
    islandId: 'forest' as IslandId,
    title: 'Das kleinste Licht besiegt die tiefste Dunkelheit',
    content: 'Du musst nicht groß, stark oder laut sein, um etwas zu bewirken. Wie Lumi beweist: In der dunkelsten Nacht ist das kleinste Licht das Wichtigste. Dein Beitrag zählt – egal wie klein er dir erscheint.',
    collected: false
  },
  {
    id: 'forest-wisdom-8',
    islandId: 'forest' as IslandId,
    title: '"Unmöglich" ist die Angst anderer, verkleidet als Ratschlag',
    content: 'Wenn andere dir sagen, du kannst etwas nicht schaffen, sprechen oft ihre eigenen Ängste. Höre auf Ratschläge – aber lass nicht zu, dass die Angst anderer deine Grenzen setzt.',
    collected: false
  },
  {
    id: 'forest-wisdom-9',
    islandId: 'forest' as IslandId,
    title: 'Gruppendruck ist ein Wind, keine Wahrheit',
    content: 'Wenn alle in eine Richtung drängen und du spürst, dass dein Weg ein anderer ist, dann folge deinen Wurzeln. Der Wind ändert sich – deine Werte bleiben.',
    collected: false
  },
  {
    id: 'forest-wisdom-10',
    islandId: 'forest' as IslandId,
    title: 'Allein sein ist nicht dasselbe wie einsam sein',
    content: 'In der Nacht der Prüfung lernst du: Du kannst allein sein und trotzdem die Stimmen aller in dir tragen, die dich je ermutigt haben. Einsamkeit ist ein Gefühl – allein sein kann eine Stärke sein.',
    collected: false
  },
  {
    id: 'forest-wisdom-11',
    islandId: 'forest' as IslandId,
    title: 'Wut, Trauer und Angst sind Geschwister',
    content: 'Auf dem Vulkan hast du Wut kennengelernt, im Ozean Trauer, im Wald Angst. Sie sind nicht getrennt – sie sind drei Seiten desselben Diamanten. Wer alle drei versteht, versteht sich selbst.',
    collected: false
  },
  {
    id: 'forest-wisdom-12',
    islandId: 'forest' as IslandId,
    title: 'Verletzlichkeit ist die mutigste Form der Stärke',
    content: 'Zuzugeben, dass du Angst hast, ist mutiger als so zu tun, als hättest du keine. Verletzlichkeit öffnet Türen, die Härte verschlossen hält.',
    collected: false
  },
  {
    id: 'forest-wisdom-13',
    islandId: 'forest' as IslandId,
    title: 'Atme, wenn die Angst kommt',
    content: 'Vier Sekunden einatmen, vier Sekunden halten, sechs Sekunden ausatmen. Dein Atem ist der Anker, der dich im Sturm festhält. Die Angst kann nicht bleiben, wenn der Atem ruhig fließt.',
    collected: false
  },
  {
    id: 'forest-wisdom-14',
    islandId: 'forest' as IslandId,
    title: 'Du bist nicht deine Angst',
    content: 'Angst ist etwas, das du FÜHLST – nicht etwas, das du BIST. Du bist der Mensch, der die Angst spürt und trotzdem handelt. Dieser Unterschied ist alles.',
    collected: false
  },
  {
    id: 'forest-wisdom-15',
    islandId: 'forest' as IslandId,
    title: 'Zusammen bricht kein Fluch',
    content: 'Allein kannst du vieles schaffen. Aber manche Dunkelheit braucht viele Lichter. Hilfe zu suchen ist kein Zeichen von Schwäche – es ist die Weisheit, die Grenzen der eigenen Kraft zu kennen.',
    collected: false
  },
  {
    id: 'forest-wisdom-16',
    islandId: 'forest' as IslandId,
    title: 'Der Wald erwacht in dir',
    content: 'Am Ende der Reise merkst du: Der dunkle Wald war nie ein Ort – er war ein Teil von dir. Und jetzt ist er nicht mehr dunkel. Er ist lebendig, bunt und stark. So wie du.',
    collected: false
  }
];

// Activities
export const forestActivities: ForestActivity[] = [
  {
    id: 'forest-activity-1',
    islandId: 'forest' as IslandId,
    title: 'Angst-Tagebuch: Brief an meine Angst',
    description: 'Schreibe einen Brief an deine größte Angst – und lass sie antworten',
    type: 'journal',
    completed: false,
    instructions: [
      'Nimm ein Blatt Papier und einen Stift.',
      'Schreibe oben: "Liebe Angst, ich muss dir etwas sagen..."',
      'Schreibe deiner Angst einen ehrlichen Brief. Was macht sie mit dir? Wie fühlt sie sich an? Was hat sie dir genommen?',
      'Drehe das Blatt um. Jetzt antwortet deine Angst: "Lieber Mensch, ich bin hier, weil..."',
      'Schreibe, was deine Angst dir sagen würde, wenn sie sprechen könnte. Warum ist sie da? Was will sie beschützen?',
      'Lies beide Seiten laut vor. Spüre nach: Hat sich etwas verändert?',
      'Schreibe zum Schluss einen Satz, der beginnt mit: "Ich höre dich, Angst, aber ich entscheide..."'
    ]
  },
  {
    id: 'forest-activity-2',
    islandId: 'forest' as IslandId,
    title: 'Atemübung: Timbers Wurzeln',
    description: 'Verwurzle dich wie ein alter Baum und finde Ruhe im Sturm',
    type: 'breathing',
    completed: false,
    instructions: [
      'Stelle dich aufrecht hin, die Füße fest auf dem Boden, hüftbreit auseinander.',
      'Stell dir vor, aus deinen Fußsohlen wachsen Wurzeln tief in die Erde – wie Timbers Wurzeln.',
      'Atme 4 Sekunden durch die Nase ein – spüre, wie Kraft aus der Erde durch die Wurzeln in dich aufsteigt.',
      'Halte den Atem 4 Sekunden – du bist fest verwurzelt, nichts kann dich umwerfen.',
      'Atme 6 Sekunden langsam durch den Mund aus – lass alle Angst wie trockene Blätter von dir fallen.',
      'Wiederhole 5 Runden. Bei jeder Runde werden deine Wurzeln tiefer und dein Stamm fester.',
      'Öffne die Augen und sage leise: "Ich stehe fest. Die Angst ist nur Wind."'
    ]
  },
  {
    id: 'forest-activity-3',
    islandId: 'forest' as IslandId,
    title: 'Schatten-Porträt: Mein ganzes Ich',
    description: 'Male dein Licht-Ich und dein Schatten-Ich und bringe sie zusammen',
    type: 'creative',
    completed: false,
    instructions: [
      'Nimm ein großes Blatt Papier und falte es in der Mitte.',
      'Auf die linke Seite male oder schreibe dein "Licht-Ich": Dinge, die du an dir magst, Stärken, gute Eigenschaften, Dinge, die du gern zeigst.',
      'Auf die rechte Seite male oder schreibe dein "Schatten-Ich": Ängste, Unsicherheiten, Dinge, die du versteckst, Eigenschaften, für die du dich schämst.',
      'Schaue beide Seiten an. Erkenne: Beides bist du. Beides gehört zusammen.',
      'Öffne das Blatt und male in die Mitte – auf die Falte – ein großes Herz. In das Herz schreibe: "Ich bin ganz."',
      'Male Linien vom Licht-Ich UND vom Schatten-Ich zum Herzen. Alles ist verbunden.',
      'Hänge das Bild an einen Ort, wo du es täglich sehen kannst.'
    ]
  },
  {
    id: 'forest-activity-4',
    islandId: 'forest' as IslandId,
    title: 'Lumis Licht-Meditation',
    description: 'Finde dein inneres Licht und lass es strahlen – auch wenn du dich klein fühlst',
    type: 'meditation',
    completed: false,
    instructions: [
      'Setze dich bequem hin und schließe die Augen. Atme dreimal tief ein und aus.',
      'Stell dir vor, du bist in der Schattenschlucht. Es ist komplett dunkel. Du kannst nichts sehen.',
      'Jetzt spüre ein winziges Licht in deiner Brust – wie Lumis Leuchten. Es ist klein, aber es ist DA.',
      'Mit jedem Einatmen wird das Licht ein bisschen heller. Mit jedem Ausatmen breitet es sich ein Stück weiter aus.',
      'Spüre, wie das Licht deine Arme, deine Beine, deinen Kopf erreicht. Du leuchtest.',
      'Höre die Stimmen, die sagen: "Du bist zu klein. Es reicht nicht." Und antworte: "Mein Licht ist genug."',
      'Spüre, wie dein Licht die Dunkelheit um dich herum erhellt. Du machst einen Unterschied.',
      'Öffne die Augen und nimm dieses Gefühl mit: Du bist nie zu klein, um zu leuchten.'
    ]
  },
  {
    id: 'forest-activity-5',
    islandId: 'forest' as IslandId,
    title: 'Reflexion: Meine drei Inseln',
    description: 'Verbinde die Lektionen von Vulkan, Ozean und Wald zu deiner persönlichen Stärke',
    type: 'reflection',
    completed: false,
    instructions: [
      'Nimm dir 15 Minuten in Ruhe. Du brauchst Papier und Stifte.',
      'Zeichne drei Inseln: einen Vulkan, einen Ozean und einen Wald.',
      'Auf den Vulkan schreibe: "Was ich über Wut gelernt habe..." und vervollständige den Satz.',
      'In den Ozean schreibe: "Was ich über Trauer gelernt habe..." und vervollständige den Satz.',
      'In den Wald schreibe: "Was ich über Angst gelernt habe..." und vervollständige den Satz.',
      'Zeichne Brücken zwischen den drei Inseln. Auf jede Brücke schreibe, wie die Lektionen zusammenhängen.',
      'In die Mitte – zwischen alle drei Inseln – zeichne DICH. Schreibe darunter: "Ich bin stärker als meine Wut, tiefer als meine Trauer und mutiger als meine Angst."',
      'Lies alles laut vor. Spüre, wie weit du gekommen bist.'
    ]
  }
];
