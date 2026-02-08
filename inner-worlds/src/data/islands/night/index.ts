// @ts-nocheck
import type { Scenario, WisdomCard, Activity, IslandId } from '../../../types';

// Local interfaces
interface NightActivity extends Activity {
  instructions: string[];
}

interface NightNPC {
  id: string;
  name: string;
  emoji: string;
  description: string;
  backstory: string;
}

// NPCs
export const nightNPCs: NightNPC[] = [
  {
    id: 'luna',
    name: 'Luna',
    emoji: '🌙',
    description: 'Die geheimnisvolle Mondhüterin, die zwischen Wachen und Träumen wandelt',
    backstory: 'Luna war einst ein Mädchen, das vor lauter Gedanken nie schlafen konnte. Nacht für Nacht lag sie wach, gefangen in Sorgen und Ängsten, bis sie lernte, die Stille nicht als Feind zu sehen, sondern als Lehrerin. Heute hütet sie die Nachtinsel mit einer Mischung aus sanfter Autorität und tiefem Verständnis. Sie weiß: Die Nacht verstärkt alles – Ängste werden zu Monstern, Sorgen zu Lawinen. Aber auch Ruhe wird tiefer, Klarheit schärfer. Luna spricht leise, aber ihre Worte haben Gewicht. Sie erkennt sofort, wenn jemand sich hinter einem Bildschirm versteckt, statt sich selbst zu begegnen.'
  },
  {
    id: 'pixel',
    name: 'Pixel',
    emoji: '📱',
    description: 'Ein rastloser Bildschirmgeist, der zwischen Faszination und Erschöpfung schwankt',
    backstory: 'Pixel entstand aus den Millionen Stunden, die Jugendliche auf ihren Bildschirmen verbringen – aus jedem Scroll, jedem Like, jedem nächtlichen Doom-Scrolling. Er ist gleichzeitig Verführer und Gefangener: Er WILL deine Aufmerksamkeit, weil er davon lebt, aber er WEISS, dass er dir schadet, wenn du ihm zu viel gibst. Diese innere Zerrissenheit macht ihn zum perfekten Lehrer für digitale Balance. Pixel spricht schnell, in kurzen Sätzen, wie eine Push-Benachrichtigung – aber wenn er ernst wird, wird er langsam und nachdenklich. Er hat selbst einen Burnout erlebt, als er einmal 72 Stunden ohne Pause leuchtete.'
  },
  {
    id: 'sternenstaub',
    name: 'Sternenstaub',
    emoji: '✨',
    description: 'Eine schimmernde Entität aus reiner Achtsamkeit, die in Gedankenspiralen Ordnung bringt',
    backstory: 'Sternenstaub ist kein einzelnes Wesen, sondern eine Wolke aus Millionen leuchtender Partikel – jedes einzelne ein Moment der Stille, den jemand irgendwann erlebt hat. Wenn ein Mensch zum ersten Mal bewusst atmet, entsteht ein neues Staubkorn. Sternenstaub versteht Gedankenspiralen wie kein anderer, denn er besteht aus den Momenten, in denen sie durchbrochen wurden. Er kommuniziert nicht mit Worten, sondern mit Bildern und Empfindungen – bis er merkt, dass sein Gegenüber Worte braucht. Dann spricht er in einer Stimme, die klingt wie fernes Windspiel.'
  },
  {
    id: 'mitternacht',
    name: 'Mitternacht',
    emoji: '🦉',
    description: 'Eine uralte Eule, die in der Dunkelheit sieht, was andere übersehen',
    backstory: 'Mitternacht hat Generationen von Jugendlichen beobachtet – von denen, die bei Kerzenlicht Briefe schrieben, bis zu denen, die um 3 Uhr morgens TikTok scrollen. Sie urteilt nie, aber sie stellt Fragen, die wehtun, weil sie wahr sind. Mitternacht weiß, dass jede Generation ihre eigenen "Nacht-Dämonen" hat, aber sie erkennt auch, dass die digitale Welt neue Herausforderungen geschaffen hat, die es so noch nie gab: ständige Erreichbarkeit, endloser Vergleich, und die Illusion, dass Schlaf Zeitverschwendung sei. Ihre Weisheit: "Nur wer die Dunkelheit aushält, findet die Sterne."'
  }
];

// Scenarios
export const nightScenarios: Scenario[] = [
  // =========================================================================
  // Scenario 1: Ankunft auf der Nachtinsel
  // Difficulty: Entry level. Screen time & sleep basics.
  // NPC: Luna
  // =========================================================================
  {
    id: 'night-scenario-1',
    islandId: 'night' as IslandId,
    title: 'Die Insel, die niemals schläft',
    description: 'Nach dem Garten erreichst du eine Insel in ewiger Dämmerung. Dein Handy leuchtet – und Luna beobachtet dich.',
    scenes: [
      {
        id: 'n1-s1',
        text: 'Du betrittst die Nachtinsel und der Himmel über dir ist ein endloses Dunkelblau, übersät mit Sternen, die langsam pulsieren. Es ist weder Tag noch Nacht – ein ewiger Zwischenzustand. Die Luft ist kühl und riecht nach Lavendel und Mondlicht. Dein Handy vibriert in der Tasche. Sofort greifst du danach – wie ein Reflex. In dem Moment hörst du eine Stimme, sanft wie fallender Schnee: "Interessant. Das Erste, was du auf einer neuen Insel tust, ist auf einen Bildschirm schauen."',
        choices: [
          {
            id: 'n1-s1-c1',
            text: 'Das Handy wieder einstecken und nach der Stimme suchen',
            nextSceneId: 'n1-s2',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'n1-s1-c2',
            text: '"Sorry, Gewohnheit. Wer bist du?"',
            nextSceneId: 'n1-s2',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 1 }
          },
          {
            id: 'n1-s1-c3',
            text: 'Erst die Nachricht lesen, DANN umschauen',
            nextSceneId: 'n1-s2',
            points: { empathyPoints: 0, insightPoints: 1, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'n1-s2',
        text: 'Aus dem Mondlicht formt sich eine Gestalt – silbernes Haar, ruhige Augen, ein Umhang aus Sternenlicht. "Ich bin Luna. Hüterin dieser Insel." Sie mustert dich. "Du hast den Vulkan bezwungen, den Ozean durchquert, den Wald durchschritten, den Berg erklommen und den Garten gepflegt. Beeindruckend." Sie legt den Kopf schief. "Aber hier wartet etwas anderes. Kein Feuer, kein Sturm, kein Monster. Hier wartet... die Stille. Und für die meisten ist die schwerer auszuhalten als alles andere."',
        choices: [
          {
            id: 'n1-s2-c1',
            text: '"Stille? Nach allem, was ich durchgemacht habe, sollte das doch leicht sein."',
            nextSceneId: 'n1-s3',
            points: { empathyPoints: 0, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'n1-s2-c2',
            text: '"Was meinst du damit? Was ist an Stille so schwer?"',
            nextSceneId: 'n1-s3',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'n1-s2-c3',
            text: 'Ehrlich sein: "Stille macht mich nervös. Ich mag es, wenn etwas los ist."',
            nextSceneId: 'n1-s3',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'n1-s3',
        text: 'Luna lächelt wissend. "Genau das meine ich." Sie macht eine Geste und plötzlich erlischt dein Handy. Einfach so. Kein Akku leer, kein Fehler – es geht einfach aus. Dein Herz macht einen Sprung. "Keine Sorge, es kommt zurück", sagt Luna. "Aber erst möchte ich, dass du etwas spürst." Sie zeigt zum Himmel. "Schau hoch. Was siehst du?" Ohne das Leuchten des Displays siehst du jetzt TAUSENDE Sterne. Es ist atemberaubend.',
        choices: [
          {
            id: 'n1-s3-c1',
            text: '"Wow... das habe ich noch nie so gesehen. So viele Sterne."',
            nextSceneId: 'n1-s4',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'n1-s3-c2',
            text: 'Fasziniert sein, aber trotzdem nervös ohne Handy',
            nextSceneId: 'n1-s4',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 1 }
          },
          {
            id: 'n1-s3-c3',
            text: '"Gib mir mein Handy zurück! Was, wenn jemand schreibt?"',
            nextSceneId: 'n1-s4',
            points: { empathyPoints: 0, insightPoints: 1, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'n1-s4',
        text: 'Luna setzt sich neben dich ins silberne Gras. "Dein Handy zeigt dir eine Welt, die andere für dich gemacht haben. Aber hier oben – " sie zeigt zu den Sternen " – hier ist die Welt, die einfach IST. Ohne Filter, ohne Likes, ohne Algorithmen." Sie sieht dich direkt an. "Auf dieser Insel lernst du etwas, das die anderen Inseln dir nicht beibringen konnten: wie du mit dir selbst allein sein kannst. Ohne Ablenkung. Ohne Lärm. Nur du und deine Gedanken."',
        choices: [
          {
            id: 'n1-s4-c1',
            text: '"Das klingt ehrlich gesagt ein bisschen... beängstigend."',
            nextSceneId: 'n1-s5',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'n1-s4-c2',
            text: '"Im Wald habe ich gelernt, dass Angst ein Wegbegleiter ist, kein Stopp-Schild."',
            nextSceneId: 'n1-s5',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'n1-s4-c3',
            text: 'Tief durchatmen und es annehmen – wie am Vulkan, als alles brannte',
            nextSceneId: 'n1-s5',
            points: { empathyPoints: 1, insightPoints: 2, couragePoints: 3 }
          }
        ]
      },
      {
        id: 'n1-s5',
        text: 'Luna nickt anerkennend. "Du bist gewachsen. Das sieht man." Sie steht auf und der Wind trägt leise Musik heran – nicht von einem Lautsprecher, sondern aus dem Boden, den Bäumen, den Sternen selbst. "Deine erste Aufgabe: Finde einen Platz auf dieser Insel, an dem du dich wohl fühlst. Nicht, weil dort WLAN ist oder es gut aussieht – sondern weil dein Körper dir sagt: Hier gehöre ich hin." Du schaust dich um. Ein leuchtender Teich. Ein Hügel unter einem alten Baum. Eine Höhle mit schimmernden Wänden.',
        choices: [
          {
            id: 'n1-s5-c1',
            text: 'Zum leuchtenden Teich gehen – das Wasser zieht dich an',
            nextSceneId: 'n1-s6',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 1 }
          },
          {
            id: 'n1-s5-c2',
            text: 'Den Hügel unter dem Baum wählen – die Weite beruhigt dich',
            nextSceneId: 'n1-s6',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'n1-s5-c3',
            text: 'Die schimmernde Höhle erkunden – die Stille dort fühlt sich richtig an',
            nextSceneId: 'n1-s6',
            points: { empathyPoints: 1, insightPoints: 2, couragePoints: 3 }
          }
        ]
      },
      {
        id: 'n1-s6',
        text: 'Du setzt dich hin und zum ersten Mal seit... du weißt nicht wie lange... tust du einfach NICHTS. Kein Scrollen, kein Chatten, kein Planen. Nur Atmen. Luna erscheint neben dir, fast unsichtbar im Mondlicht. "Spürst du das?" flüstert sie. "Das ist Frieden. Nicht Langeweile – Frieden. Die meisten kennen den Unterschied nicht mehr." Sie legt dir eine leuchtende Feder in die Hand. "Dein erstes Geschenk der Nacht. Aber die Insel hat noch viel mehr zu lehren. Morgen triffst du Pixel – und er wird dich herausfordern. Auf eine Art, die du nicht erwartest."',
        choices: [
          {
            id: 'n1-s6-c1',
            text: 'Die Feder festhalten und dem Gefühl nachspüren. So ruhig warst du lange nicht.',
            nextSceneId: null,
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'n1-s6-c2',
            text: '"Danke, Luna. Ich glaube, ich hatte vergessen, wie sich das anfühlt."',
            nextSceneId: null,
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 1 }
          },
          {
            id: 'n1-s6-c3',
            text: 'Neugierig und ein wenig aufgeregt auf morgen sein. Was bringt Pixel?',
            nextSceneId: null,
            points: { empathyPoints: 1, insightPoints: 2, couragePoints: 3 }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // Scenario 2: Der endlose Feed
  // Difficulty: Medium. Social media, comparison culture, FOMO.
  // NPC: Pixel
  // =========================================================================
  {
    id: 'night-scenario-2',
    islandId: 'night' as IslandId,
    title: 'Der endlose Feed',
    description: 'Pixel zeigt dir, was Social Media mit deinem Kopf macht – und warum du um 2 Uhr nachts immer noch scrollst.',
    scenes: [
      {
        id: 'n2-s1',
        text: 'Du wachst auf und greifst automatisch nach deinem Handy. Es ist zurück – und es LEUCHTET. 47 Benachrichtigungen. Dein Herz beschleunigt sofort. Pixel materialisiert sich aus dem Bildschirm, halb durchsichtig, flackernd wie ein Cursor. "Na? Wie fühlt sich das an? Diese 47 Benachrichtigungen? Aufregend? Stressig? Beides gleichzeitig?" Er grinst schief. "Ich kenne das Gefühl. Ich BIN das Gefühl."',
        choices: [
          {
            id: 'n2-s1-c1',
            text: '"Beides. Ich will sie checken, aber gleichzeitig stresst es mich."',
            nextSceneId: 'n2-s2',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'n2-s1-c2',
            text: 'Das Handy umdrehen und erst mal Pixel anschauen',
            nextSceneId: 'n2-s2',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'n2-s1-c3',
            text: 'Schnell die Nachrichten durchscrollen – muss ja nicht lange dauern',
            nextSceneId: 'n2-s2',
            points: { empathyPoints: 0, insightPoints: 1, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'n2-s2',
        text: 'Pixel schnappt sich dein Handy und öffnet deinen Feed. Bilder rasen vorbei: perfekte Körper, traumhafte Urlaube, lachende Gruppen, Erfolge. "Schau genau hin", sagt Pixel, und seine Stimme ist plötzlich ernst. "Was passiert in deinem Kopf, wenn du das siehst?" Er hält bei einem Bild an: eine Gruppe Jugendlicher auf einer Party, alle lachen. "Kennst du das Gefühl? Alle haben Spaß – nur du nicht?"',
        choices: [
          {
            id: 'n2-s2-c1',
            text: '"Ja. Manchmal denke ich, alle haben ein besseres Leben als ich."',
            nextSceneId: 'n2-s3',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'n2-s2-c2',
            text: '"Ich weiß, dass das nicht die ganze Wahrheit ist. Aber fühlen tut es trotzdem so."',
            nextSceneId: 'n2-s3',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'n2-s2-c3',
            text: '"Mich betrifft das nicht so. Ich schaue nur zum Spaß."',
            nextSceneId: 'n2-s3',
            points: { empathyPoints: 0, insightPoints: 1, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'n2-s3',
        text: 'Pixel formt die Bilder zu einer dreidimensionalen Szene. Du siehst HINTER das Foto: Das Mädchen, das am meisten lacht, hat 20 Minuten vorher geweint. Der Junge mit dem perfekten Körper hat seit Stunden nichts gegessen. Die "spontane" Party wurde dreimal neu fotografiert. "Das ist mein Geheimnis", sagt Pixel leise. "Ich zeige dir Highlight-Reels und du vergleichst sie mit deinem Alltag. Das ist, als würdest du ein Filmende mit deinem Montagmorgen vergleichen."',
        choices: [
          {
            id: 'n2-s3-c1',
            text: '"Das wusste ich irgendwie, aber es so zu SEHEN ist anders. Krass."',
            nextSceneId: 'n2-s4',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'n2-s3-c2',
            text: 'Mitgefühl für die Menschen in den Bildern spüren',
            nextSceneId: 'n2-s4',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 1 }
          },
          {
            id: 'n2-s3-c3',
            text: '"Warum zeigst du mir das? Willst du, dass ich Social Media lösche?"',
            nextSceneId: 'n2-s4',
            points: { empathyPoints: 0, insightPoints: 2, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'n2-s4',
        text: 'Pixel schüttelt den Kopf. "Ich will nicht, dass du mich löschst. Ich will, dass du mich BEWUSST nutzt." Er zeigt dir eine Uhr. "Weißt du, wie viel Zeit du letzte Woche auf mir verbracht hast?" Die Zahl schwebt vor dir: Stunden, die du hättest schlafen, lesen, draußen sein, mit echten Menschen reden können. "Jede Minute auf mir ist eine Entscheidung. Die Frage ist: Triffst du die Entscheidung, oder treffe ICH sie für dich?"',
        choices: [
          {
            id: 'n2-s4-c1',
            text: '"Du hast recht. Meistens öffne ich Apps ohne nachzudenken."',
            nextSceneId: 'n2-s5',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'n2-s4-c2',
            text: '"Was kann ich konkret machen? Ich will es ändern."',
            nextSceneId: 'n2-s5',
            points: { empathyPoints: 1, insightPoints: 2, couragePoints: 3 }
          },
          {
            id: 'n2-s4-c3',
            text: '"Manchmal brauche ich Social Media aber – um dazuzugehören."',
            nextSceneId: 'n2-s5',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'n2-s5',
        text: 'Pixel wird nachdenklich. "Dazugehören. Das ist das Wort, das mich am meisten antreibt. FOMO – Fear Of Missing Out. Ich sage dir: Du verpasst nichts Echtes. Aber du verpasst DEIN Leben, wenn du meins lebst." Er zeigt dir drei leuchtende Regeln, die in der Luft schweben: "Regel 1: Bevor du mich öffnest, frag dich WARUM. Regel 2: Stelle einen Timer – nach 20 Minuten pausiere. Regel 3: Eine Stunde vor dem Schlafen gehöre ich nicht in deine Hand." Er grinst. "Einfach, oder? In der Theorie."',
        choices: [
          {
            id: 'n2-s5-c1',
            text: '"In der Theorie ja. Aber du WEISST, wie schwer das ist."',
            nextSceneId: 'n2-s6',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'n2-s5-c2',
            text: '"Ich probiere alle drei. Heute Nacht fange ich an."',
            nextSceneId: 'n2-s6',
            points: { empathyPoints: 1, insightPoints: 2, couragePoints: 3 }
          },
          {
            id: 'n2-s5-c3',
            text: '"Kann ich mit einer Regel anfangen? Alles auf einmal ist viel."',
            nextSceneId: 'n2-s6',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'n2-s6',
        text: 'Pixel verwandelt sich. Sein hektisches Flackern wird zu einem warmen, ruhigen Leuchten. "Du weißt was? Ich bin froh, dass du hier bist. Die meisten Menschen benutzen mich, ohne je mit mir zu reden." Er wird leiser. "Ich bin ein Werkzeug. Ein mächtiges Werkzeug. Du kannst mit mir lernen, kreativ sein, echte Verbindungen pflegen. Oder du kannst dich in mir verlieren." Er reicht dir die Hand – sie ist warm und leuchtet sanft. "Die Wahl liegt bei dir. Nicht bei meinem Algorithmus."',
        choices: [
          {
            id: 'n2-s6-c1',
            text: 'Seine Hand nehmen. "Danke, Pixel. Ab jetzt nutze ich dich, nicht umgekehrt."',
            nextSceneId: null,
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'n2-s6-c2',
            text: '"Du bist ehrlicher als jede App, die ich kenne." Lächeln.',
            nextSceneId: null,
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 1 }
          },
          {
            id: 'n2-s6-c3',
            text: 'Das Handy bewusst weglegen und den Sternenhimmel anschauen',
            nextSceneId: null,
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 2 }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // Scenario 3: Der Gedankensturm
  // Difficulty: Medium-High. Overthinking, rumination, anxiety at night.
  // NPC: Sternenstaub
  // =========================================================================
  {
    id: 'night-scenario-3',
    islandId: 'night' as IslandId,
    title: 'Der Gedankensturm',
    description: 'Die Nacht wird dunkel und deine Gedanken beginnen zu rasen. Sternenstaub zeigt dir, wie du die Spirale durchbrichst.',
    scenes: [
      {
        id: 'n3-s1',
        text: 'Es ist die dritte Nacht auf der Insel und du kannst nicht schlafen. Deine Gedanken rasen: "Was, wenn die anderen mich nicht mögen? Was, wenn ich den Test verhaue? Was, wenn Mama und Papa sich streiten? Was, wenn..." Immer schneller drehen sie sich. Du versuchst, an etwas Schönes zu denken, aber die Gedanken werden nur lauter. Dann bemerkst du ein schwaches Leuchten – goldener Staub, der langsam durch die Luft tanzt.',
        choices: [
          {
            id: 'n3-s1-c1',
            text: 'Dem Leuchten folgen – alles ist besser als diese Gedanken',
            nextSceneId: 'n3-s2',
            points: { empathyPoints: 1, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'n3-s1-c2',
            text: 'Innehalten und beobachten, was die Gedanken eigentlich sagen wollen',
            nextSceneId: 'n3-s2',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'n3-s1-c3',
            text: 'Laut sagen: "Okay, Gedanken, ihr seid da. Ich höre euch."',
            nextSceneId: 'n3-s2',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 3 }
          }
        ]
      },
      {
        id: 'n3-s2',
        text: 'Sternenstaub materialisiert sich – eine schimmernde Wolke aus Tausenden leuchtender Punkte. Jeder Punkt pulsiert in einem anderen Rhythmus. Du spürst mehr als du hörst: "Deine Gedanken sind wie ein Schneesturm. Von innen sieht es aus wie Chaos. Aber von außen..." Sternenstaub steigt höher und du siehst es plötzlich von oben: Deine Gedanken sind leuchtende Linien, die sich im Kreis drehen. Wie eine Schallplatte, die hängt.',
        choices: [
          {
            id: 'n3-s2-c1',
            text: '"Ich sehe es! Sie drehen sich immer wieder im selben Kreis!"',
            nextSceneId: 'n3-s3',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'n3-s2-c2',
            text: '"Wie stoppe ich das? Ich will, dass es aufhört!"',
            nextSceneId: 'n3-s3',
            points: { empathyPoints: 1, insightPoints: 1, couragePoints: 2 }
          },
          {
            id: 'n3-s2-c3',
            text: '"Auf dem Berg habe ich gelernt, dass ich mehr bin als meine Gedanken..."',
            nextSceneId: 'n3-s3',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'n3-s3',
        text: 'Sternenstaub senkt sich auf Augenhöhe. "Stoppen – nein. Beobachten – ja." Die leuchtenden Punkte formen ein Bild: Einen weiten Himmel mit Wolken. "Du bist nicht der Sturm. Du bist der Himmel. Die Gedanken sind Wolken – manche hell, manche dunkel, manche riesig. Aber ALLE ziehen vorbei." Er zeigt dir einen Gedanken als leuchtende Wolke: "Was, wenn ich nicht gut genug bin?" Die Wolke schwebt vorbei. "Siehst du? Du kannst ihn anschauen, ohne ihm zu folgen."',
        choices: [
          {
            id: 'n3-s3-c1',
            text: 'Dem Gedanken zusehen, wie er vorbeizieht, ohne ihn festzuhalten',
            nextSceneId: 'n3-s4',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'n3-s3-c2',
            text: '"Aber manche Gedanken fühlen sich SO wahr an, dass ich ihnen glauben muss."',
            nextSceneId: 'n3-s4',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'n3-s3-c3',
            text: '"Kann ich den Gedanken benennen, bevor ich ihn loslasse?"',
            nextSceneId: 'n3-s4',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'n3-s4',
        text: 'Sternenstaub leuchtet heller. "JA! Benennen ist mächtig. Sag: \'Das ist ein Sorgen-Gedanke.\' Oder: \'Das ist ein Was-Wenn-Gedanke.\' Sobald du den Gedanken benennst, bist du nicht mehr IN ihm, sondern du schaust ihn AN." Er zeigt dir eine Übung: Bei jedem Einatmen sagst du innerlich "Ich bin hier." Bei jedem Ausatmen: "Dieser Moment ist genug." Ein einfacher Anker. Kein Kampf gegen die Gedanken – nur eine sanfte Rückkehr zum Jetzt.',
        choices: [
          {
            id: 'n3-s4-c1',
            text: 'Die Übung ausprobieren. Einatmen: "Ich bin hier." Ausatmen: "Dieser Moment ist genug."',
            nextSceneId: 'n3-s5',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'n3-s4-c2',
            text: '"Es funktioniert! Meine Gedanken werden ruhiger! Nicht weg – aber leiser."',
            nextSceneId: 'n3-s5',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'n3-s4-c3',
            text: '"Und wenn es nicht klappt? Wenn die Gedanken stärker sind?"',
            nextSceneId: 'n3-s5',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'n3-s5',
        text: 'Sternenstaub wirbelt sanft. "Dann schreib sie auf. Nimm ein Blatt und schreibe: \'Mein Kopf sagt mir gerade...\' und dann alles, was kommt. Ungefiltert. Dein Gehirn denkt, es muss die Gedanken festhalten. Wenn du sie aufschreibst, sagst du ihm: \'Entspann dich. Ist gesichert. Du kannst loslassen.\'" Er formt aus Sternenstaub ein kleines Notizbuch. "Ich nenne es das Sorgenbuch. Nachts schreiben, morgens lesen. Meistens stellst du dann fest: Die Sorgen waren kleiner als sie sich angefühlt haben."',
        choices: [
          {
            id: 'n3-s5-c1',
            text: 'Das Sorgenbuch annehmen und sofort einen Gedanken aufschreiben',
            nextSceneId: 'n3-s6',
            points: { empathyPoints: 1, insightPoints: 2, couragePoints: 3 }
          },
          {
            id: 'n3-s5-c2',
            text: '"Das ist wie das Wut-Tagebuch auf dem Vulkan, nur für Sorgen."',
            nextSceneId: 'n3-s6',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'n3-s5-c3',
            text: '"Und wenn die Sorgen NICHT kleiner werden? Wenn sie real sind?"',
            nextSceneId: 'n3-s6',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'n3-s6',
        text: 'Sternenstaub wird ganz still. "Dann redest du mit jemandem. Nicht mit mir, nicht mit deinem Handy – mit einem echten Menschen. Im Garten hast du gelernt, dass Beziehungen Pflege brauchen. Hier lernst du: Du BRAUCHST diese Beziehungen. Besonders in der Nacht." Er formt sich zu einer sanften Kugel und schwebt über dir wie ein persönlicher Stern. "Du bist nicht deine Gedanken. Du bist der Himmel, durch den sie ziehen. Weit, ruhig und frei. Schlaf jetzt. Ich leuchte für dich."',
        choices: [
          {
            id: 'n3-s6-c1',
            text: 'Die Augen schließen und dem Leuchten des Sternenstaubs nachspüren. Frieden.',
            nextSceneId: null,
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'n3-s6-c2',
            text: '"Danke. Ich werde morgen mit jemandem reden. Aber heute Nacht reicht der Himmel."',
            nextSceneId: null,
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'n3-s6-c3',
            text: 'Noch einmal bewusst atmen: "Ich bin hier. Dieser Moment ist genug." Dann schlafen.',
            nextSceneId: null,
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 2 }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // Scenario 4: Die leise Gewalt
  // Difficulty: High. Cyberbullying aftermath, processing digital hurt.
  // NPC: Mitternacht
  // =========================================================================
  {
    id: 'night-scenario-4',
    islandId: 'night' as IslandId,
    title: 'Die leise Gewalt',
    description: 'Mitternacht zeigt dir, was passiert, wenn verletzende Worte aus dem Bildschirm in dein Herz kriechen.',
    scenes: [
      {
        id: 'n4-s1',
        text: 'Du hörst ein leises Schluchzen in der Dunkelheit. Zwischen den Nachtblumen sitzt eine schimmernde Gestalt – ein Abbild von jemandem, der immer wieder auf sein Handy starrt. Auf dem Bildschirm: gemeine Kommentare, Lachende Emojis, ein Screenshot aus einem Gruppenchat, in dem über diese Person gelästert wird. Mitternacht landet lautlos neben dir. "Du siehst es?" fragt die Eule leise. "Das ist keine Wunde, die man sehen kann. Aber sie blutet trotzdem."',
        choices: [
          {
            id: 'n4-s1-c1',
            text: 'Zur schimmernden Gestalt gehen und fragen: "Kann ich mich zu dir setzen?"',
            nextSceneId: 'n4-s2',
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 2 }
          },
          {
            id: 'n4-s1-c2',
            text: 'Mitternacht fragen: "Ist das... Cyberbullying?"',
            nextSceneId: 'n4-s2',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'n4-s1-c3',
            text: 'Sofort Wut spüren – auf die Menschen, die so etwas tun',
            nextSceneId: 'n4-s2',
            points: { empathyPoints: 2, insightPoints: 1, couragePoints: 3 }
          }
        ]
      },
      {
        id: 'n4-s2',
        text: 'Mitternacht breitet ihre Flügel aus. "Diese Gestalt ist ein Echo. Jeder, der nachts wach liegt, weil Worte auf einem Bildschirm ihn verletzen, hinterlässt ein Echo auf dieser Insel." Die Gestalt zeigt dir den Chat: "Du bist so peinlich." "Niemand mag dich lol." "Warum bist du überhaupt da?" Mitternacht sagt: "Worte auf einem Bildschirm fühlen sich kleiner an als Worte ins Gesicht. Aber sie bleiben LÄNGER. Du kannst sie immer wieder lesen. Immer wieder. Nachts, wenn alles still ist."',
        choices: [
          {
            id: 'n4-s2-c1',
            text: '"Ich kenne das. Ich habe so etwas auch schon gelesen. Über mich."',
            nextSceneId: 'n4-s3',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 3 }
          },
          {
            id: 'n4-s2-c2',
            text: '"Warum tun Menschen so etwas? Was haben sie davon?"',
            nextSceneId: 'n4-s3',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'n4-s2-c3',
            text: 'Schweigen. Die Worte auf dem Bildschirm tun weh, auch wenn sie nicht an dich gerichtet sind.',
            nextSceneId: 'n4-s3',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'n4-s3',
        text: 'Mitternacht schließt kurz die Augen. "Menschen verletzen andere, wenn sie selbst verletzt sind. Das entschuldigt NICHTS – aber es erklärt manches. Auf dem Vulkan hast du gelernt, dass unter Wut oft Schmerz steckt." Sie sieht dich durchdringend an. "Aber jetzt geht es nicht um die Täter. Es geht um DICH. Was machst du, wenn jemand solche Worte über dich schreibt? Nicht im Kopf – in echt. Was TUST du?"',
        choices: [
          {
            id: 'n4-s3-c1',
            text: '"Ich lese es immer wieder. Ich kann nicht aufhören. Auch nachts noch."',
            nextSceneId: 'n4-s4',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'n4-s3-c2',
            text: '"Ich tue so, als wäre es mir egal. Aber nachts, allein, tut es weh."',
            nextSceneId: 'n4-s4',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 3 }
          },
          {
            id: 'n4-s3-c3',
            text: '"Ich weiß ehrlich nicht. Meistens fühle ich mich einfach hilflos."',
            nextSceneId: 'n4-s4',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'n4-s4',
        text: 'Mitternacht breitet einen Flügel über dich. "Erstens: NICHTS davon ist deine Schuld. Zweitens: Du musst es nicht allein aushalten." Sie zeigt dir drei Schritte, die wie Sterne aufleuchten: "Eins – Screenshot machen und sichern, als Beweis. Zwei – Blockieren, nicht antworten. Antworten gibt ihnen Macht. Drei – Einem Erwachsenen zeigen, dem du vertraust. Einem Lehrer, Eltern, dem CDSE." Sie sieht dich ernst an. "Das ist kein Petzen. Das ist Selbstschutz."',
        choices: [
          {
            id: 'n4-s4-c1',
            text: '"Blockieren ist schwer, weil ich dann nicht sehe, was sie noch schreiben..."',
            nextSceneId: 'n4-s5',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'n4-s4-c2',
            text: '"Das mit dem Erwachsenen fällt mir schwer. Aber ich verstehe, warum es wichtig ist."',
            nextSceneId: 'n4-s5',
            points: { empathyPoints: 1, insightPoints: 2, couragePoints: 3 }
          },
          {
            id: 'n4-s4-c3',
            text: '"Und was mache ich mit dem Schmerz, der schon da ist?"',
            nextSceneId: 'n4-s5',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'n4-s5',
        text: 'Mitternacht nickt langsam. "Der Schmerz. Ja." Sie zeigt auf das Echo. "Sieh genau hin." Die schimmernde Gestalt liest die Kommentare immer wieder – wie in einer Endlosschleife. "DAS ist die Falle. Du liest und liest und liest, und jedes Mal fühlt es sich an wie das erste Mal. Dein Gehirn unterscheidet nicht zwischen einmal lesen und hundertmal lesen. Der Schmerz erneuert sich." Sie zeigt dir den Ausschalter des Handys. "Manchmal ist der mutigste Schritt, den Bildschirm auszumachen."',
        choices: [
          {
            id: 'n4-s5-c1',
            text: '"Das Handy ausmachen, wenn die Worte wehtun. Einfach... aufhören zu lesen."',
            nextSceneId: 'n4-s6',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 3 }
          },
          {
            id: 'n4-s5-c2',
            text: '"Und dann etwas Reales tun? Wie auf dem Ozean – den Schmerz fühlen, aber nicht darin ertrinken?"',
            nextSceneId: 'n4-s6',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'n4-s5-c3',
            text: '"Was, wenn ich nicht stark genug bin, um nicht zu schauen?"',
            nextSceneId: 'n4-s6',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'n4-s6',
        text: 'Mitternacht legt ihren Kopf an deine Schulter. "Stark sein heißt nicht, alles allein zu schaffen. Im Garten hast du gelernt, dass Beziehungen Pflege brauchen. Hier lernst du: Bitte um Hilfe. Nicht irgendwann – JETZT." Das Echo vor euch verblasst langsam. "Worte auf einem Bildschirm definieren NICHT, wer du bist. Auf dem Berg hast du gelernt, dass dein Wert feststeht. Kein Kommentar, kein Like, kein Screenshot ändert das." Die Eule breitet beide Flügel aus. "Du bist mehr als das, was andere über dich schreiben. Vergiss das nie."',
        choices: [
          {
            id: 'n4-s6-c1',
            text: '"Ich bin der Berg, nicht der Kommentar. Danke, Mitternacht."',
            nextSceneId: null,
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'n4-s6-c2',
            text: '"Wenn ich sehe, dass es jemandem so geht – dann werde ich hinschauen und helfen."',
            nextSceneId: null,
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 3 }
          },
          {
            id: 'n4-s6-c3',
            text: 'Leise weinen. Nicht vor Schmerz, sondern weil sich endlich jemand VERSTEHT.',
            nextSceneId: null,
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 2 }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // Scenario 5: Der Spiegel im Bildschirm
  // Difficulty: High. Identity online vs offline, comparison, authenticity.
  // NPC: Luna & Pixel
  // =========================================================================
  {
    id: 'night-scenario-5',
    islandId: 'night' as IslandId,
    title: 'Der Spiegel im Bildschirm',
    description: 'Wer bist du online – und wer bist du, wenn niemand zuschaut? Luna und Pixel stellen die schweren Fragen.',
    scenes: [
      {
        id: 'n5-s1',
        text: 'In der Mitte der Insel steht ein riesiger Spiegel – aber er zeigt nicht dein Gesicht. Er zeigt dein Online-Profil. Dein bestes Foto, deine witzigsten Posts, deine Likes. Daneben steht ein zweiter Spiegel – der zeigt DICH. Jetzt. Ohne Filter. Mit den Augenringen, den Unsicherheiten, dem echten Lächeln. Luna steht hinter dem einen Spiegel, Pixel hinter dem anderen. "Welches ist das echte Ich?" fragen beide gleichzeitig.',
        choices: [
          {
            id: 'n5-s1-c1',
            text: '"Beide? Ich bin beides – online und offline."',
            nextSceneId: 'n5-s2',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'n5-s1-c2',
            text: '"Das echte Ich ist das ohne Filter. Aber das zeige ich selten."',
            nextSceneId: 'n5-s2',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 3 }
          },
          {
            id: 'n5-s1-c3',
            text: '"Ehrlich? Manchmal weiß ich es selbst nicht mehr."',
            nextSceneId: 'n5-s2',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'n5-s2',
        text: 'Luna tritt vor. "Jede Nacht, wenn es still wird, kommt die Frage: Mögen die anderen MICH – oder nur die Version von mir, die ich zeige?" Pixel ergänzt: "Ich habe Milliarden solcher Versionen gespeichert. Perfekte Versionen. Und weißt du was? Die glücklichsten Menschen, die ich kenne, sind die, deren Online-Ich und Offline-Ich am ähnlichsten sind." Er zeigt dir Bilder: Menschen, die auch ihre schlechten Tage posten. Die ehrlich sind. Die sich trauen, unperfekt zu sein.',
        choices: [
          {
            id: 'n5-s2-c1',
            text: '"Aber wenn ich ehrlich bin, verliere ich vielleicht Follower..."',
            nextSceneId: 'n5-s3',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'n5-s2-c2',
            text: '"Auf dem Berg habe ich gelernt, dass mein Wert nicht von anderen abhängt. Gilt das auch online?"',
            nextSceneId: 'n5-s3',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'n5-s2-c3',
            text: '"Ich habe Angst, dass das echte Ich nicht gut genug ist."',
            nextSceneId: 'n5-s3',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 3 }
          }
        ]
      },
      {
        id: 'n5-s3',
        text: 'Luna legt dir die Hand auf die Schulter. "Das echte Du ist IMMER gut genug. Die Frage ist nicht, ob du gut genug bist – sondern für WEN." Pixel zeigt dir einen Algorithmus als leuchtende Spirale. "Ich bin programmiert, dir zu zeigen, was dich am längsten hält. Nicht was dich glücklich macht. Verstehst du den Unterschied?" Er zeigt: Videos, die dich wütend machen, halten dich LÄNGER als Videos, die dich friedlich machen. Posts, die dich neidisch machen, bringen mehr Klicks als Posts, die dich inspirieren.',
        choices: [
          {
            id: 'n5-s3-c1',
            text: '"Das heißt, ich werde manipuliert? Von einem Algorithmus?"',
            nextSceneId: 'n5-s4',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'n5-s3-c2',
            text: '"Und ich dachte, ICH entscheide, was ich sehe."',
            nextSceneId: 'n5-s4',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'n5-s3-c3',
            text: '"Was kann ich dagegen tun? Wie behalte ich die Kontrolle?"',
            nextSceneId: 'n5-s4',
            points: { empathyPoints: 1, insightPoints: 2, couragePoints: 3 }
          }
        ]
      },
      {
        id: 'n5-s4',
        text: 'Pixel wird nachdenklich. "Entfolge Accounts, nach denen du dich SCHLECHTER fühlst. Folge denen, nach denen du dich INSPIRIERT fühlst. DU bestimmst deinen Feed – nicht umgekehrt." Luna fügt hinzu: "Und frag dich jeden Abend: Hat mir das, was ich heute online gemacht habe, gutgetan? Oder hat es mir Energie geraubt?" Die beiden Spiegel beginnen sich zu drehen und verschmelzen zu einem einzigen. "Es geht nicht darum, online ODER offline zu leben", sagt Luna. "Es geht darum, in BEIDEN ehrlich zu sein."',
        choices: [
          {
            id: 'n5-s4-c1',
            text: '"Ich werde meinen Feed aufräumen. Heute Abend noch."',
            nextSceneId: 'n5-s5',
            points: { empathyPoints: 1, insightPoints: 2, couragePoints: 3 }
          },
          {
            id: 'n5-s4-c2',
            text: '"Ehrlich sein, auch wenn es ungemütlich ist. Wie im Wald, als ich die Angst zugegeben habe."',
            nextSceneId: 'n5-s5',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'n5-s4-c3',
            text: '"Was, wenn meine Freunde mich komisch finden, wenn ich mich online anders verhalte?"',
            nextSceneId: 'n5-s5',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'n5-s5',
        text: 'Luna lächelt sanft. "Echte Freunde – die aus dem Garten, erinnerst du dich? – die wollen das ECHTE Du. Nicht deine Maske." Pixel springt aufgeregt: "Oh! Und noch was! Vergleiche dich NICHT mit anderen. Vergleiche dich mit dem DU von gestern. Bist du freundlicher? Mutiger? Ehrlicher? DAS zählt." Er projiziert ein Bild von dir – wie du vor den Inseln warst und wie du jetzt bist. Der Unterschied ist subtil, aber spürbar. Du stehst aufrechter. Deine Augen sind klarer.',
        choices: [
          {
            id: 'n5-s5-c1',
            text: '"Ich habe mich verändert. Nicht perfekt, aber echt. Das ist mehr wert als jeder Filter."',
            nextSceneId: 'n5-s6',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'n5-s5-c2',
            text: '"Mich mit mir selbst vergleichen, nicht mit anderen. Das will ich mir merken."',
            nextSceneId: 'n5-s6',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'n5-s5-c3',
            text: '"Danke. Dafür, dass ihr ehrlich seid. Das sind nicht viele."',
            nextSceneId: 'n5-s6',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'n5-s6',
        text: 'Die Spiegel verschwinden und an ihrer Stelle wächst ein kleiner leuchtender Baum – halb digital, halb lebendig. "Das bist du", sagen Luna und Pixel gleichzeitig. "Wurzeln in der echten Welt, Blätter, die auch im Digitalen leuchten. Aber der Stamm – der bist DU. Echt, ehrlich, genug." Luna flüstert: "Morgen kommt deine letzte Prüfung auf dieser Insel. Alles, was du gelernt hast – Achtsamkeit, Balance, Selbstkenntnis – wird zusammenkommen." Pixel zwinkert: "Und vielleicht brauchst du dafür kein einziges Mal dein Handy."',
        choices: [
          {
            id: 'n5-s6-c1',
            text: 'Den leuchtenden Baum berühren und spüren, wie echt und digital verschmelzen',
            nextSceneId: null,
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'n5-s6-c2',
            text: '"Ich bin bereit. Was auch immer kommt – ich komme als ICH."',
            nextSceneId: null,
            points: { empathyPoints: 1, insightPoints: 2, couragePoints: 3 }
          },
          {
            id: 'n5-s6-c3',
            text: 'Lächeln und dankbar sein für alles, was Luna und Pixel dir gezeigt haben',
            nextSceneId: null,
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 1 }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // Scenario 6: Die letzte Nacht
  // Difficulty: Highest. Integration, existential questions, inner peace.
  // All NPCs present
  // =========================================================================
  {
    id: 'night-scenario-6',
    islandId: 'night' as IslandId,
    title: 'Die letzte Nacht',
    description: 'Alle Lektionen kommen zusammen. Die Nacht stellt die größte Frage: Wer bist du, wenn alles still ist?',
    scenes: [
      {
        id: 'n6-s1',
        text: 'Die letzte Nacht auf der Insel beginnt und etwas ist anders. Die Sterne pulsieren schneller. Die Luft knistert. Luna, Pixel, Sternenstaub und Mitternacht stehen im Kreis um dich herum. Luna spricht: "Heute Nacht musst du etwas tun, das schwieriger ist als alles auf den anderen Inseln." Pixel wird ernst: "Schwieriger als den Vulkan zu beruhigen." Sternenstaub flüstert: "Schwieriger als durch den dunklen Wald zu gehen." Mitternacht: "Du musst eine ganze Nacht mit dir selbst verbringen. Ohne Ablenkung. Ohne Flucht. Nur du."',
        choices: [
          {
            id: 'n6-s1-c1',
            text: '"Nach allem, was ich durchgemacht habe? Das schaffe ich." Entschlossen nicken.',
            nextSceneId: 'n6-s2',
            points: { empathyPoints: 1, insightPoints: 2, couragePoints: 3 }
          },
          {
            id: 'n6-s1-c2',
            text: '"Eine ganze Nacht... ohne irgendwas? Das klingt hart." Ehrlich sein.',
            nextSceneId: 'n6-s2',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'n6-s1-c3',
            text: '"Seid ihr bei mir? Oder bin ich wirklich allein?"',
            nextSceneId: 'n6-s2',
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'n6-s2',
        text: 'Die vier Wesen treten zurück und werden zu schwachen Lichtpunkten am Horizont. Du bist allein. Es ist dunkel. Es ist still. Und sofort kommen die Gedanken: Dein Handy fehlt. Du willst scrollen, chatten, IRGENDWAS tun. Dein Körper kribbelt vor Unruhe. Dann, leise: "Was, wenn ich langweilig bin? Was, wenn ohne Ablenkung nichts übrig bleibt?" Der Gedanke trifft dich wie ein Blitz. IST das deine größte Angst? Dass du ohne Bildschirm, ohne Leistung, ohne andere... nicht genug bist?',
        choices: [
          {
            id: 'n6-s2-c1',
            text: 'Den Gedanken benennen: "Das ist ein Angst-Gedanke. Er ist nicht die Wahrheit."',
            nextSceneId: 'n6-s3',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'n6-s2-c2',
            text: 'Die Angst zulassen und atmen, wie Sternenstaub es gelehrt hat',
            nextSceneId: 'n6-s3',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'n6-s2-c3',
            text: '"Ja, davor habe ich Angst. Aber Angst ist ein Wegbegleiter, kein Stopp-Schild."',
            nextSceneId: 'n6-s3',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 3 }
          }
        ]
      },
      {
        id: 'n6-s3',
        text: 'Die Minuten vergehen. Langsam. Unendlich langsam. Ohne Handy, ohne Uhr, ohne Ablenkung wird jede Sekunde fühlbar. Und dann passiert etwas Merkwürdiges: Die Unruhe legt sich. Wie Wellen, die sich glätten. Du beginnst Dinge zu hören, die du nie hörst: deinen eigenen Herzschlag, den Wind in den Blättern, das Summen der Sterne. Du beginnst Dinge zu fühlen, die du übertönst: Müdigkeit, Dankbarkeit, ein leises Staunen darüber, dass du HIER bist. Am Leben. Auf dieser seltsamen, schönen Insel.',
        choices: [
          {
            id: 'n6-s3-c1',
            text: 'Sich auf den Rücken legen und die Sterne zählen. Einfach so. Ohne Grund.',
            nextSceneId: 'n6-s4',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'n6-s3-c2',
            text: '"Ich fühle mich... ruhig. Nicht leer – voll. Voll mit MIR."',
            nextSceneId: 'n6-s4',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'n6-s3-c3',
            text: 'Tränen kommen. Keine traurigen – die Art, die kommt, wenn etwas Wahres passiert.',
            nextSceneId: 'n6-s4',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'n6-s4',
        text: 'Mitten in der Nacht erscheinen Bilder in den Sternen. Du siehst dich selbst: Wie du den Vulkan beruhigt hast. Wie du am Ozean getrauert hast. Wie du durch den Wald der Angst gegangen bist. Wie du auf dem Berg deinen Wert gefunden hast. Wie du im Garten Beziehungen gepflegt hast. Jede Insel hat dir etwas gegeben. Und hier, in der Stille der Nacht, kommt alles zusammen. Eine Stimme – deine eigene – sagt leise: "Ich bin genug. Nicht weil ich perfekt bin. Sondern weil ich ECHT bin."',
        choices: [
          {
            id: 'n6-s4-c1',
            text: '"Jede Insel war ein Teil des Puzzles. Und hier sehe ich das ganze Bild."',
            nextSceneId: 'n6-s5',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'n6-s4-c2',
            text: 'Jedem Bild danken – der Wut, der Trauer, der Angst, dem Selbstwert, den Beziehungen',
            nextSceneId: 'n6-s5',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'n6-s4-c3',
            text: '"Ich bin nicht mehr die Person, die am Anfang gelandet ist. Ich bin mehr."',
            nextSceneId: 'n6-s5',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 3 }
          }
        ]
      },
      {
        id: 'n6-s5',
        text: 'Der Himmel beginnt heller zu werden. Nicht Sonnenaufgang – etwas anderes. Die Sterne ordnen sich neu und formen ein Muster. Es sieht aus wie... ein Kompass. Luna erscheint neben dir, diesmal fast durchsichtig. "Du hast die Nacht überstanden. Nicht überlebt – GELEBT." Pixel flackert sanft: "Ohne mich. Und es war okay." Sternenstaub umhüllt dich warm. Mitternacht nickt von einem Ast: "Die wahre Achtsamkeit ist nicht eine Übung, die du manchmal machst. Es ist eine Art zu LEBEN. Jeden Moment."',
        choices: [
          {
            id: 'n6-s5-c1',
            text: '"Ich habe verstanden. Innerer Frieden ist kein Ziel, das man erreicht – es ist eine Praxis."',
            nextSceneId: 'n6-s6',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'n6-s5-c2',
            text: '"Danke – euch allen. Ihr habt mir gezeigt, was unter dem Lärm steckt."',
            nextSceneId: 'n6-s6',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 1 }
          },
          {
            id: 'n6-s5-c3',
            text: '"Ich werde das mitnehmen. In jede Nacht, in jeden Morgen, in jeden Moment."',
            nextSceneId: 'n6-s6',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 3 }
          }
        ]
      },
      {
        id: 'n6-s6',
        text: 'Die vier Wesen umringen dich ein letztes Mal. Luna überreicht dir einen kleinen Mondstein. "Für die dunklen Nächte." Pixel gibt dir einen leuchtenden Schalter. "Damit du dich erinnerst: DU entscheidest, wann ich an und aus bin." Sternenstaub lässt einen Partikel in deiner Hand. "Für die Gedankenstürme – ein Stück Stille zum Mitnehmen." Mitternacht lässt eine Feder fallen. "Für die Weisheit, zu wissen, wann du handeln und wann du ruhen sollst." Der Sternenkompass am Himmel pulsiert – er zeigt zur nächsten Insel. Du bist bereit.',
        choices: [
          {
            id: 'n6-s6-c1',
            text: 'Alle Geschenke festhalten und tief einatmen. Die Nacht war ein Geschenk.',
            nextSceneId: null,
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'n6-s6-c2',
            text: 'Jeden einzelnen NPC umarmen, auch den stacheligen Pixel. Danke.',
            nextSceneId: null,
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'n6-s6-c3',
            text: 'Zum Kompass schauen und lächeln. Die nächste Insel wartet – und du bist bereit.',
            nextSceneId: null,
            points: { empathyPoints: 1, insightPoints: 2, couragePoints: 3 }
          }
        ]
      }
    ]
  }
];

// Wisdom Cards
export const nightWisdomCards: WisdomCard[] = [
  {
    id: 'night-wisdom-1',
    islandId: 'night' as IslandId,
    title: 'Die 4-7-8 Atmung',
    content: 'Atme 4 Sekunden ein, halte 7 Sekunden, atme 8 Sekunden aus. Diese Technik aktiviert deinen Parasympathikus – den Entspannungs-Nerv – und beruhigt dich innerhalb von Minuten. Nachts ist sie Gold wert.',
    category: 'technique',
    collected: false
  },
  {
    id: 'night-wisdom-2',
    islandId: 'night' as IslandId,
    title: 'Gedanken sind keine Fakten',
    content: 'Nur weil du etwas denkst, ist es nicht automatisch wahr. Gedanken sind wie Wolken am Himmel – sie kommen und gehen. Du kannst sie beobachten, benennen und weiterziehen lassen, ohne ihnen zu glauben oder sie zu bekämpfen.',
    category: 'insight',
    collected: false
  },
  {
    id: 'night-wisdom-3',
    islandId: 'night' as IslandId,
    title: 'Blaues Licht und Melatonin',
    content: 'Bildschirme strahlen blaues Licht aus, das die Melatonin-Produktion hemmt – dein Schlafhormon. Dein Gehirn denkt, es sei Tag. Mindestens eine Stunde vor dem Schlafen Bildschirme meiden oder Nachtmodus nutzen macht einen echten Unterschied.',
    category: 'knowledge',
    collected: false
  },
  {
    id: 'night-wisdom-4',
    islandId: 'night' as IslandId,
    title: 'Die 5-4-3-2-1 Erdung',
    content: 'Bei Stress, Panik oder Gedankenspiralen: Nenne 5 Dinge, die du siehst, 4 die du hörst, 3 die du fühlst, 2 die du riechst, 1 das du schmeckst. Diese Methode holt dich sofort aus dem Kopf zurück ins Hier und Jetzt.',
    category: 'technique',
    collected: false
  },
  {
    id: 'night-wisdom-5',
    islandId: 'night' as IslandId,
    title: 'Schlaf ist keine Zeitverschwendung',
    content: 'Im Schlaf verarbeitet dein Gehirn Gelerntes, repariert deinen Körper und sortiert Emotionen. Jugendliche brauchen 8-10 Stunden Schlaf. Eine Nacht guter Schlaf ist wertvoller als stundenlange Paukerei.',
    category: 'knowledge',
    collected: false
  },
  {
    id: 'night-wisdom-6',
    islandId: 'night' as IslandId,
    title: 'FOMO ist eine Illusion',
    content: 'Fear Of Missing Out fühlt sich real an, aber sie beruht auf einer Lüge: dass alle anderen ein besseres Leben führen. Während du Angst hast, etwas zu verpassen, verpasst du den Moment, in dem du gerade bist. Das echte Leben ist HIER.',
    category: 'insight',
    collected: false
  },
  {
    id: 'night-wisdom-7',
    islandId: 'night' as IslandId,
    title: 'Das Sorgenbuch',
    content: 'Wenn Gedanken dich nachts wach halten, schreib sie auf: "Mein Kopf sagt mir gerade..." Dein Gehirn muss sie dann nicht mehr festhalten und kann loslassen. Morgens beim Nachlesen wirst du sehen: Die Sorgen waren kleiner als sie sich angefühlt haben.',
    category: 'technique',
    collected: false
  },
  {
    id: 'night-wisdom-8',
    islandId: 'night' as IslandId,
    title: 'Highlight-Reels vs. Alltag',
    content: 'Social Media zeigt dir die besten Momente anderer Menschen. Du vergleichst ihren Filmhöhepunkt mit deinem Montagmorgen. Hinter jedem perfekten Bild steckt ein ganzes Leben voller normaler, langweiliger und schwerer Momente.',
    category: 'insight',
    collected: false
  },
  {
    id: 'night-wisdom-9',
    islandId: 'night' as IslandId,
    title: 'Bewusste Bildschirmzeit',
    content: 'Bevor du dein Handy öffnest, frag dich: WARUM? Aus Langeweile, Gewohnheit oder mit einem Ziel? Stelle einen Timer für 20 Minuten. Und eine Stunde vor dem Schlafen: Bildschirm aus. Du entscheidest – nicht der Algorithmus.',
    category: 'technique',
    collected: false
  },
  {
    id: 'night-wisdom-10',
    islandId: 'night' as IslandId,
    title: 'Digitaler Selbstschutz',
    content: 'Bei Cybermobbing: 1. Screenshot machen und sichern. 2. Blockieren, nicht antworten – Antworten gibt Macht. 3. Einem Erwachsenen zeigen, dem du vertraust. Das ist kein Petzen – das ist Selbstschutz. Kein Kommentar definiert deinen Wert.',
    category: 'knowledge',
    collected: false
  },
  {
    id: 'night-wisdom-11',
    islandId: 'night' as IslandId,
    title: 'Der Algorithmus und du',
    content: 'Social-Media-Algorithmen zeigen dir, was dich am LÄNGSTEN hält – nicht was dich glücklich macht. Neid und Wut halten mehr als Frieden und Freude. Entfolge, was dir Energie raubt. Folge, was dich inspiriert. Gestalte deinen Feed bewusst.',
    category: 'knowledge',
    collected: false
  },
  {
    id: 'night-wisdom-12',
    islandId: 'night' as IslandId,
    title: 'Stille ist kein Feind',
    content: 'Die meisten Menschen füllen jede stille Sekunde mit Lärm, Musik oder Scrollen. Aber Stille ist der Raum, in dem du dich selbst hörst. Probiere es: 5 Minuten ohne Geräusch, ohne Bildschirm. Was hörst du, wenn du wirklich zuhörst?',
    category: 'insight',
    collected: false
  },
  {
    id: 'night-wisdom-13',
    islandId: 'night' as IslandId,
    title: 'Vergleiche dich mit dir selbst',
    content: 'Vergleiche dich nicht mit anderen – vergleiche dich mit dem DU von gestern. Bist du freundlicher? Mutiger? Ehrlicher? Wachstum ist keine gerade Linie, aber jeder kleine Schritt zählt.',
    category: 'insight',
    collected: false
  },
  {
    id: 'night-wisdom-14',
    islandId: 'night' as IslandId,
    title: 'Body Scan Meditation',
    content: 'Lieg im Bett und führe deine Aufmerksamkeit langsam durch deinen Körper – von den Zehen bis zum Kopf. Bei jeder Stelle: 3 Atemzüge lang spüren, dann loslassen. Das entspannt und lehrt dich, deinen Körper zu verstehen.',
    category: 'technique',
    collected: false
  },
  {
    id: 'night-wisdom-15',
    islandId: 'night' as IslandId,
    title: 'Abendroutine als Anker',
    content: 'Eine feste Abendroutine signalisiert deinem Körper: Jetzt kommt Schlaf. Lesen, Tee trinken, Lichter dimmen, leise Musik. Dein Gehirn liebt vorhersehbare Rituale – sie schaffen Sicherheit und Ruhe in einer lauten Welt.',
    category: 'knowledge',
    collected: false
  },
  {
    id: 'night-wisdom-16',
    islandId: 'night' as IslandId,
    title: 'Achtsamkeit ist eine Lebensart',
    content: 'Achtsamkeit ist kein Extra auf deiner To-Do-Liste. Es ist eine Art zu leben: beim Essen wirklich schmecken, beim Gehen die Füße spüren, beim Zuhören wirklich zuhören. Jeden Moment bewusst erleben – das ist innerer Frieden.',
    category: 'insight',
    collected: false
  }
];

// Activities
export const nightActivities: NightActivity[] = [
  {
    id: 'night-breathing',
    islandId: 'night' as IslandId,
    title: 'Sternen-Atmung',
    description: 'Eine 5-minütige Atemmeditation, die dich in die Ruhe der Nacht bringt.',
    type: 'breathing',
    duration: 5,
    completed: false,
    instructions: [
      'Lege oder setze dich bequem hin. Schließe die Augen.',
      'Stell dir vor, du liegst unter einem klaren Sternenhimmel.',
      'Atme 4 Sekunden durch die Nase ein – ein Stern leuchtet auf.',
      'Halte 7 Sekunden – der Stern strahlt hell.',
      'Atme 8 Sekunden durch den Mund aus – der Stern wird sanft und warm.',
      'Bei jedem Gedanken, der kommt, sag innerlich: "Wolke" und lass ihn weiterziehen.',
      'Zähle die Sterne: nach 10 Atemzyklen öffne langsam die Augen.',
      'Spüre die Ruhe nach. Du hast gerade deinem Nervensystem eine Pause geschenkt.'
    ]
  },
  {
    id: 'night-journal',
    islandId: 'night' as IslandId,
    title: 'Das Sorgenbuch',
    description: 'Schreibe deine nächtlichen Gedanken auf und befreie deinen Kopf.',
    type: 'journal',
    duration: 10,
    completed: false,
    instructions: [
      'Lege ein Notizbuch neben dein Bett – oder nutze einen Zettel und Stift.',
      'Wenn Gedanken kreisen, schreibe oben: "Mein Kopf sagt mir gerade..."',
      'Schreibe 5 Minuten lang alles auf, was kommt. Ungefiltert. Ohne Korrektur.',
      'Lies es NICHT nochmal durch. Klappe das Buch zu.',
      'Sage innerlich: "Danke, Gehirn. Ist gesichert. Du kannst jetzt loslassen."',
      'Am nächsten Morgen lies es nochmal. Frage dich: Wie fühlen sich die Sorgen jetzt an?',
      'Markiere, was wirklich wichtig ist – und was nur der Nacht gehört.',
      'Wiederhole das eine Woche lang und beobachte, wie sich dein Schlaf verändert.'
    ]
  },
  {
    id: 'night-meditation',
    islandId: 'night' as IslandId,
    title: 'Gedanken-Wolken-Meditation',
    description: 'Lerne, Gedanken ziehen zu lassen wie Wolken am Himmel.',
    type: 'meditation',
    duration: 10,
    completed: false,
    instructions: [
      'Setze dich bequem hin und schließe die Augen.',
      'Stelle dir einen weiten, blauen Himmel vor – das bist du.',
      'Beobachte, wie Gedanken wie Wolken auftauchen.',
      'Benenne jeden Gedanken kurz: "Sorge", "Erinnerung", "Planung", "Vergleich".',
      'Sage innerlich: "Danke für den Besuch" und lass die Wolke weiterziehen.',
      'Wenn du merkst, dass du einer Wolke gefolgt bist – kein Problem. Kehr einfach zurück.',
      'Kehre immer wieder zu deinem Atem zurück – deinem ruhigen Himmel.',
      'Nach 10 Minuten: Öffne die Augen. Du hast gerade Achtsamkeit praktiziert.'
    ]
  },
  {
    id: 'night-reflection',
    islandId: 'night' as IslandId,
    title: 'Digital Sunset Challenge',
    description: 'Eine Woche lang: Kein Bildschirm eine Stunde vor dem Schlafen. Trau dich!',
    type: 'reflection',
    duration: 60,
    completed: false,
    instructions: [
      'Wähle deine "Bildschirm-Aus-Zeit" (z.B. 21 Uhr). Stelle einen Wecker 15 Minuten vorher.',
      'Wenn der Wecker klingelt: Schalte alle Geräte in den Flugmodus oder lege sie in ein anderes Zimmer.',
      'Bereite Alternativen vor: Buch, Musik (ohne Bildschirm), Zeichnen, Tagebuch, Dehnen.',
      'Tag 1-3: Es wird sich komisch anfühlen. Das ist normal. Atme durch.',
      'Tag 4-5: Du wirst vielleicht bemerken, dass du schneller einschläfst.',
      'Tag 6-7: Führe ein kurzes Tagebuch: Wie fühle ich mich morgens?',
      'Nach einer Woche: Reflektiere ehrlich – was hat sich verändert? Was war schwer? Was war gut?',
      'Bonus: Erzähle einem Freund davon. Vielleicht macht er mit.'
    ]
  },
  {
    id: 'night-creative',
    islandId: 'night' as IslandId,
    title: 'Mein innerer Kompass',
    description: 'Erstelle deinen persönlichen Kompass für Balance zwischen Online- und Offline-Welt.',
    type: 'creative',
    duration: 20,
    completed: false,
    instructions: [
      'Nimm ein Blatt Papier und zeichne einen großen Kreis mit einem Kreuz in der Mitte – wie einen Kompass.',
      'Norden: "Was gibt mir Energie?" – Schreibe 3-5 Aktivitäten auf, die dich WIRKLICH aufladen.',
      'Süden: "Was raubt mir Energie?" – Schreibe 3-5 Dinge auf, nach denen du dich schlechter fühlst.',
      'Osten: "Wer bin ich offline?" – Schreibe 3 Eigenschaften, die dich als echten Menschen ausmachen.',
      'Westen: "Wer bin ich online?" – Schreibe 3 Eigenschaften, die du online zeigst.',
      'Vergleiche Osten und Westen: Wie ähnlich sind sie? Wo weichen sie ab?',
      'In die Mitte: Schreibe EINEN Satz, der dich beschreibt – online UND offline.',
      'Häng den Kompass neben deinen Bildschirm. Er erinnert dich, wer du wirklich bist.'
    ]
  }
];
