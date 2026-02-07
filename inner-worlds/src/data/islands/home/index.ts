// =============================================================================
// Inner Worlds - Heimat-Insel (Home Island)
// Theme: Integration & Transfer in den Alltag
// All content in German, written for ages 10-15
// Therapeutically grounded: consolidation of all learned skills, meta-reflection,
// transfer planning, normalizing setbacks, forward-looking resilience
// =============================================================================

import type { Scenario, WisdomCard, Activity, IslandId } from '../../../types';

// -----------------------------------------------------------------------------
// Extended Activity type (adds instructions for guided activities)
// -----------------------------------------------------------------------------

interface HomeActivity extends Activity {
  instructions: string[];
}

// -----------------------------------------------------------------------------
// NPC type for island characters
// -----------------------------------------------------------------------------

interface HomeNPC {
  id: string;
  name: string;
  emoji: string;
  description: string;
  backstory: string;
}

// =============================================================================
// 1. SCENARIOS
// =============================================================================

export const homeScenarios: Scenario[] = [
  // ---------------------------------------------------------------------------
  // Scenario 1: "Der Werkzeugkoffer"
  // Teaching: Im echten Leben braucht man oft mehrere Faehigkeiten gleichzeitig.
  // Emotionsregulation + Empathie + Kommunikation in einer komplexen Situation.
  // ---------------------------------------------------------------------------
  {
    id: 'home-scenario-1',
    islandId: 'home' as IslandId,
    title: 'Der Werkzeugkoffer',
    description:
      'In der Schule passiert etwas Kompliziertes: Ein Streit, ein Missverstaendnis und verletzte Gefuehle -- alles gleichzeitig. Hier brauchst du nicht nur ein Werkzeug, sondern deinen ganzen Koffer.',
    scenes: [
      {
        id: 'home-s1-scene-1',
        text: 'Montagmorgen. Du kommst in die Klasse und merkst sofort: Die Stimmung ist komisch. Deine beste Freundin Nora sitzt mit verschraenkten Armen da und schaut dich nicht an. Dein Kumpel Elias kommt zu dir und fluestert: "Hey, Nora ist sauer auf dich. Sie sagt, du haettest hinter ihrem Ruecken ueber sie geredet. Stimmt das?" Dein Magen zieht sich zusammen. Du hast keine Ahnung, wovon er redet.',
        speaker: 'Elias',
        speakerEmoji: '\u{1F466}',
        choices: [
          {
            id: 'home-s1-c1a',
            text: 'Tief durchatmen und erstmal nachdenken, bevor du reagierst.',
            consequence:
              'Du spuerst, wie die Aufregung in dir hochsteigt -- aber du erinnerst dich: Erst durchatmen, dann handeln. Du holst dreimal tief Luft. Dein Kopf wird klarer. Gut so -- der erste Schritt ist, nicht impulsiv zu reagieren.',
            empathyPoints: 1,
            insightPoints: 3,
            couragePoints: 1,
            nextSceneId: 'home-s1-scene-2',
          },
          {
            id: 'home-s1-c1b',
            text: 'Sofort zu Nora gehen und sagen: "Was soll das? Ich habe nichts gesagt!"',
            consequence:
              'Du stuerzt zu Nora. Deine Stimme ist lauter, als du willst. Nora verschraenkt die Arme noch fester: "Sicher. Luisa hat mir alles erzaehlt." Jetzt sind zwei Leute aufgebracht, und nichts ist geloest. Manchmal macht Impuls alles schlimmer.',
            empathyPoints: 0,
            insightPoints: 1,
            couragePoints: 1,
            nextSceneId: 'home-s1-scene-2',
          },
          {
            id: 'home-s1-c1c',
            text: 'Elias fragen: "Was genau hat Nora gehoert? Und von wem?"',
            consequence:
              'Elias erzaehlt: "Luisa hat wohl gesagt, du haettest ueber Noras Praesentation gelacht." Du erinnerst dich -- du hast in der Pause mit Luisa geredet und dabei ueber etwas ganz anderes gelacht. Ein Missverstaendnis. Aber fuer Nora fuehlt es sich real an.',
            empathyPoints: 1,
            insightPoints: 3,
            couragePoints: 1,
            nextSceneId: 'home-s1-scene-2',
          },
        ],
      },
      {
        id: 'home-s1-scene-2',
        text: 'Du weisst jetzt: Es war ein Missverstaendnis. Aber Nora ist wirklich verletzt. Ihre Praesentation letzte Woche war ihr super wichtig, und der Gedanke, dass du darueber gelacht hast, tut ihr weh. Du siehst, wie sie sich von den anderen abwendet. Dein innerer Guide fluestert: "Was brauchst du jetzt? Und was braucht Nora?"',
        speaker: 'Erzaehler',
        speakerEmoji: '\u{1F3E0}',
        choices: [
          {
            id: 'home-s1-c2a',
            text: 'Zu Nora gehen, ruhig bleiben und sagen: "Hey, ich merke, du bist verletzt. Koennen wir reden?"',
            consequence:
              'Nora schaut dich unsicher an, aber sie nickt. Deine ruhige Stimme zeigt ihr: Du nimmst sie ernst. Du nutzt gleich zwei Werkzeuge -- Emotionsregulation bei dir selbst und Empathie fuer Nora.',
            empathyPoints: 3,
            insightPoints: 2,
            couragePoints: 2,
            nextSceneId: 'home-s1-scene-3',
          },
          {
            id: 'home-s1-c2b',
            text: 'Erst mit Luisa reden, um das Missverstaendnis aufzuklaeren, und dann zu Nora gehen.',
            consequence:
              'Du findest Luisa und fragst: "Hey, was hast du Nora erzaehlt?" Luisa wird rot. "Ich habe gesehen, wie du gelacht hast, und dachte..." Du erklaerst, worueber du wirklich gelacht hast. Luisa merkt, dass sie vorschnell war. Jetzt habt ihr beide die Wahrheit -- und koennt gemeinsam zu Nora gehen.',
            empathyPoints: 2,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: 'home-s1-scene-3',
          },
        ],
      },
      {
        id: 'home-s1-scene-3',
        text: 'Du sitzt jetzt Nora gegenueber. Ihre Augen sind ein bisschen feucht. "Ich habe so hart an der Praesentation gearbeitet", sagt sie leise. "Und dann hoere ich, dass du darueber lachst. Das hat sich angefuehlt wie ein Stich." Du merkst: Es geht gar nicht nur um das Missverstaendnis. Es geht darum, dass Nora sich verletzlich gemacht hat und jetzt Angst hat, ausgelacht zu werden.',
        speaker: 'Nora',
        speakerEmoji: '\u{1F467}',
        choices: [
          {
            id: 'home-s1-c3a',
            text: '"Nora, ich habe nicht ueber deine Praesentation gelacht. Aber ich verstehe, warum es sich so angefuehlt hat. Deine Praesentation war echt mutig."',
            consequence:
              'Noras Schultern entspannen sich ein wenig. Du hast drei Dinge gleichzeitig gemacht: die Wahrheit gesagt, ihr Gefuehl anerkannt und ihr Mut gemacht. Das ist wie drei Werkzeuge auf einmal benutzen.',
            empathyPoints: 4,
            insightPoints: 2,
            couragePoints: 2,
            nextSceneId: 'home-s1-scene-4',
          },
          {
            id: 'home-s1-c3b',
            text: '"Es tut mir leid, dass du das gedacht hast. Ich habe ueber etwas ganz anderes gelacht. Kann ich dir erzaehlen, was wirklich passiert ist?"',
            consequence:
              'Nora hoert dir zu. Und je mehr du erklaerst, desto mehr entspannt sich ihr Gesicht. Am Ende sagt sie: "Okay... das ergibt Sinn. Ich haette dich vielleicht einfach fragen sollen, statt es zu glauben." Ihr beide lernt etwas: Direkt fragen ist besser als annehmen.',
            empathyPoints: 2,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: 'home-s1-scene-4',
          },
          {
            id: 'home-s1-c3c',
            text: '"Ich weiss, wie das ist, wenn man denkt, jemand lacht ueber einen. Das fuehlt sich richtig mies an."',
            consequence:
              'Nora schaut dich ueberrascht an. "Ja, genau so. Richtig mies." Dass du ihre Gefuehle in Worte fasst, zeigt ihr, dass du sie wirklich verstehst. Empathie heisst nicht nur zuhoeren -- sondern spiegeln, was der andere fuehlt.',
            empathyPoints: 4,
            insightPoints: 2,
            couragePoints: 1,
            nextSceneId: 'home-s1-scene-4',
          },
        ],
      },
      {
        id: 'home-s1-scene-4',
        text: 'Die Situation hat sich beruhigt. Nora laechelt wieder, und ihr redet normal miteinander. Elias kommt dazu: "Alles wieder gut?" Luisa steht ein paar Meter weiter und traut sich nicht so recht herzukommen. Sie fuehlt sich schuldig, weil sie das Geruecht weitergegeben hat.',
        speaker: 'Erzaehler',
        speakerEmoji: '\u{1F3E0}',
        choices: [
          {
            id: 'home-s1-c4a',
            text: 'Luisa rufen und sagen: "Hey, komm her. Es war ein Missverstaendnis, kein Drama. Alles gut."',
            consequence:
              'Luisa kommt erleichtert dazu. "Es tut mir leid, ich haette erst fragen sollen." Nora nickt: "Ja, beim naechsten Mal fragen wir alle erstmal nach." Ihr habt als Gruppe etwas gelernt: Missverstaendnisse passieren -- aber sie muessen keine Freundschaften zerstoeren.',
            empathyPoints: 3,
            insightPoints: 2,
            couragePoints: 2,
            nextSceneId: 'home-s1-scene-5',
          },
          {
            id: 'home-s1-c4b',
            text: 'Zu Nora sagen: "Wollen wir Luisa mit reinnehmen? Sie fuehlt sich auch nicht gut."',
            consequence:
              'Nora ueberlegt kurz, dann nickt sie. "Du hast recht. Sie wollte mir nicht wehtun." Ihr geht zusammen zu Luisa. Manchmal braucht es jemanden, der die Bruecke baut -- und heute warst du das.',
            empathyPoints: 3,
            insightPoints: 3,
            couragePoints: 1,
            nextSceneId: 'home-s1-scene-5',
          },
        ],
      },
      {
        id: 'home-s1-scene-5',
        text: 'Auf dem Heimweg denkst du ueber den Tag nach. Was heute Morgen wie eine Katastrophe angefangen hat, hat sich am Ende geloest. Und du merkst: Du hast nicht nur ein Werkzeug benutzt, sondern viele. Durchatmen, nachfragen, zuhoeren, die Perspektive wechseln, ehrlich reden, Bruecken bauen. Dein innerer Guide laechelt: "Siehst du? Du hast mehr drauf, als du denkst."',
        speaker: 'Guide',
        speakerEmoji: '\u{2728}',
        choices: [
          {
            id: 'home-s1-c5a',
            text: '"Stimmt. Ich bin froh, dass ich nicht einfach ausgerastet bin. Frueher haette ich das vielleicht gemacht."',
            consequence:
              'Der Guide nickt. "Das zeigt, wie sehr du gewachsen bist. Du hast Werkzeuge, die dir helfen -- und das Wichtigste ist: Du weisst, wann du welches brauchst." Du laechelst. Der Werkzeugkoffer ist voll. Und du weisst, wie man ihn benutzt.',
            empathyPoints: 2,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: null,
          },
          {
            id: 'home-s1-c5b',
            text: '"Es war trotzdem anstrengend. Aber die gute Art von anstrengend."',
            consequence:
              'Der Guide lacht leise. "Ja, das echte Leben ist manchmal anstrengend. Aber du bist dem nicht aus dem Weg gegangen. Du bist mittendurch gegangen. Und das, mein Freund, nennt man Wachstum." Du gehst nach Hause mit einem warmen Gefuehl in der Brust.',
            empathyPoints: 1,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: null,
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Scenario 2: "Rueckschlag"
  // Teaching: Scheitern ist normal und gehoert zum Wachstum dazu.
  // Sich wieder aufrappeln ist die eigentliche Staerke.
  // ---------------------------------------------------------------------------
  {
    id: 'home-scenario-2',
    islandId: 'home' as IslandId,
    title: 'Rueckschlag',
    description:
      'Du hast etwas versucht, woran dir viel lag -- und es hat nicht geklappt. Jetzt fuehlt sich alles schwer an. Aber Scheitern ist nicht das Ende. Es ist ein Zwischenstopp.',
    scenes: [
      {
        id: 'home-s2-scene-1',
        text: 'Du hast dich wochenlang auf den Kunstwettbewerb vorbereitet. Jeden Tag nach der Schule hast du gezeichnet, ausradiert, nochmal angefangen. Dein Bild -- eine Unterwasserwelt voller leuchtender Quallen -- war das Beste, was du je gemacht hast. Heute wurden die Ergebnisse ausgehaengt. Du hast nicht gewonnen. Nicht mal eine Erwaehnung. Du stehst vor der Tafel und das Papier verschwimmt vor deinen Augen.',
        speaker: 'Erzaehler',
        speakerEmoji: '\u{1F3E0}',
        choices: [
          {
            id: 'home-s2-c1a',
            text: 'Weggehen, bevor jemand dein Gesicht sieht. Du willst gerade nicht reden.',
            consequence:
              'Du gehst schnell in die Toilette und schliesst die Tuer. Dein Atem geht schnell. Die Enttaeuschung brennt in der Brust. Es ist okay, sich zurueckzuziehen, wenn man erstmal allein sein muss. Nicht jede Reaktion muss sofort perfekt sein.',
            empathyPoints: 0,
            insightPoints: 2,
            couragePoints: 1,
            nextSceneId: 'home-s2-scene-2',
          },
          {
            id: 'home-s2-c1b',
            text: 'Stehenbleiben und die Enttaeuschung zueinlassen. Die Traenen kommen, und das ist okay.',
            consequence:
              'Eine Traene laeuft ueber deine Wange. Du wischst sie nicht weg. Du stehst einfach da und laesst das Gefuehl da sein. Es tut weh -- aber du weisst inzwischen: Gefuehle, die man zulaesst, gehen leichter vorbei als Gefuehle, die man verdraengt.',
            empathyPoints: 0,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: 'home-s2-scene-2',
          },
          {
            id: 'home-s2-c1c',
            text: '"Das ist so unfair! Mein Bild war gut!" -- Du bist wuetend.',
            consequence:
              'Die Wut ist heiss und laut in dir. Warum haben die anderen gewonnen und nicht du? Es fuehlt sich ungerecht an. Wut ist eine natuerliche Reaktion auf Enttaeuschung -- aber sie zeigt dir auch, wie viel dir die Sache bedeutet hat.',
            empathyPoints: 0,
            insightPoints: 2,
            couragePoints: 1,
            nextSceneId: 'home-s2-scene-2',
          },
        ],
      },
      {
        id: 'home-s2-scene-2',
        text: 'Spaeter am Tag sitzt du auf der Bank im Schulhof. Alles fuehlt sich grau an. Dein Kopf fluestert gemeine Sachen: "Du bist einfach nicht gut genug. Warum hast du es ueberhaupt versucht?" Der Guide setzt sich neben dich. "Ich kenne diese Stimme", sagt er sanft. "Aber sie erzaehlt nicht die ganze Geschichte. Darf ich dir eine Frage stellen?"',
        speaker: 'Guide',
        speakerEmoji: '\u{2728}',
        choices: [
          {
            id: 'home-s2-c2a',
            text: '"Okay. Frag."',
            consequence:
              'Der Guide laechelt. "Hat das Zeichnen dir Spass gemacht? Waehrend du an dem Bild gearbeitet hast -- wie hat sich das angefuehlt?" Du denkst nach. Und ploetzlich erinnerst du dich an die Abende, an denen du vergessen hast, auf die Uhr zu schauen, weil du so vertieft warst. "Es hat sich gut angefuehlt", gibst du zu.',
            empathyPoints: 0,
            insightPoints: 3,
            couragePoints: 1,
            nextSceneId: 'home-s2-scene-3',
          },
          {
            id: 'home-s2-c2b',
            text: '"Ich will gerade keine Fragen. Ich will einfach, dass es nicht so wehtut."',
            consequence:
              'Der Guide nickt. "Das verstehe ich. Enttaeuschung tut weh, und es ist okay, das zu fuehlen. Du musst nicht sofort eine Lektion daraus ziehen. Manchmal darf man einfach traurig sein." Du lehnst dich zurueck. Manchmal ist die wichtigste Erlaubnis: Einfach traurig sein duerfen.',
            empathyPoints: 0,
            insightPoints: 3,
            couragePoints: 1,
            nextSceneId: 'home-s2-scene-3',
          },
        ],
      },
      {
        id: 'home-s2-scene-3',
        text: 'Am naechsten Tag triffst du zufaellig Frau Berger, die Kunstlehrerin, die in der Jury sass. Sie sieht dich und kommt zu dir. "Ich wollte dir etwas sagen", beginnt sie. "Dein Bild war wirklich gut. Die Entscheidung war knapp. Aber weisst du, was mir am meisten aufgefallen ist? Dein Mut, etwas Eigenes zu zeigen. Das trauen sich viele nicht."',
        speaker: 'Frau Berger',
        speakerEmoji: '\u{1F469}\u{200D}\u{1F3A8}',
        choices: [
          {
            id: 'home-s2-c3a',
            text: '"Danke. Aber es hat trotzdem nicht gereicht."',
            consequence:
              'Frau Berger nickt. "Ich verstehe die Enttaeuschung. Aber lass mich dir etwas erzaehlen: Als ich angefangen habe zu malen, habe ich dreizehn Wettbewerbe verloren, bevor ich den ersten gewonnen habe. Dreizehn. Jeder einzelne tat weh. Aber jeder hat mich besser gemacht." Du schluckst. Dreizehn Mal.',
            empathyPoints: 1,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: 'home-s2-scene-4',
          },
          {
            id: 'home-s2-c3b',
            text: '"Wirklich? Sie fanden mein Bild gut?"',
            consequence:
              'Frau Berger laechelt. "Ja. Die Quallen waren wunderschoen. Und das Licht, das du eingefangen hast -- das war etwas Besonderes." Ihre Worte waermen dich von innen. Manchmal sieht man vor lauter Enttaeuschung nicht mehr, was man tatsaechlich geschafft hat.',
            empathyPoints: 0,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: 'home-s2-scene-4',
          },
        ],
      },
      {
        id: 'home-s2-scene-4',
        text: 'Du sitzt abends an deinem Schreibtisch. Dein Zeichenblock liegt vor dir, zugeklappt. Du schaust ihn an. Ein Teil von dir will ihn in die Ecke werfen und nie wieder aufmachen. Ein anderer Teil erinnert sich an die leuchtenden Quallen und daran, wie stolz du warst, als du sie fertig hattest.',
        speaker: 'Erzaehler',
        speakerEmoji: '\u{1F3E0}',
        choices: [
          {
            id: 'home-s2-c4a',
            text: 'Den Block aufschlagen und einfach anfangen zu kritzeln. Nicht fuer einen Wettbewerb. Fuer dich.',
            consequence:
              'Dein Stift beruehrt das Papier, und zuerst sind es nur Linien ohne Sinn. Aber dann formt sich etwas -- ein kleiner Vogel, der in einen Sturm fliegt. Du musst laecheln. Das bist irgendwie du. Und du fliegst weiter.',
            empathyPoints: 0,
            insightPoints: 2,
            couragePoints: 4,
            nextSceneId: 'home-s2-scene-5',
          },
          {
            id: 'home-s2-c4b',
            text: 'Heute noch nicht. Aber den Block nicht in die Ecke werfen. Stattdessen sagst du dir: "Nicht heute, aber bald."',
            consequence:
              'Du legst den Block zurueck auf den Schreibtisch, sorgfaeltig. Das ist kein Aufgeben -- das ist eine Pause. Und Pausen sind manchmal genau das, was man braucht, bevor man weitermacht.',
            empathyPoints: 0,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: 'home-s2-scene-5',
          },
          {
            id: 'home-s2-c4c',
            text: 'Das Quallen-Bild nochmal anschauen und dir ueberlegen, was du naechstes Mal anders machen wuerdest.',
            consequence:
              'Du holst das Bild raus und betrachtest es mit neuen Augen. "Die Farben hier koennten kraeftiger sein", denkst du. "Und die Komposition..." Ploetzlich bist du nicht mehr traurig, sondern neugierig. Aus Rueckschlaegen lernen -- das ist eine Superkraft.',
            empathyPoints: 0,
            insightPoints: 4,
            couragePoints: 2,
            nextSceneId: 'home-s2-scene-5',
          },
        ],
      },
      {
        id: 'home-s2-scene-5',
        text: 'Der Guide erscheint ein letztes Mal. "Weisst du, was mich an dir beeindruckt?", sagt er. "Nicht, dass du es versucht hast. Sondern dass du nach dem Scheitern immer noch hier bist. Du bist nicht weggerannt. Du hast die Enttaeuschung gefuehlt, und du stehst immer noch."',
        speaker: 'Guide',
        speakerEmoji: '\u{2728}',
        choices: [
          {
            id: 'home-s2-c5a',
            text: '"Scheitern gehoert dazu, oder? Auch wenn es sich nicht so anfuehlt."',
            consequence:
              'Der Guide nickt. "Jeder Mensch, der etwas Grosses geschafft hat, ist vorher gescheitert. Nicht einmal, nicht zweimal -- oft viele Male. Der Unterschied ist: Sie sind aufgestanden. Und du stehst auch." Du atmest tief ein. Es tut noch ein bisschen weh. Aber es wird besser.',
            empathyPoints: 1,
            insightPoints: 3,
            couragePoints: 3,
            nextSceneId: null,
          },
          {
            id: 'home-s2-c5b',
            text: '"Ich glaube, ich habe mehr gelernt als die, die gewonnen haben."',
            consequence:
              'Der Guide laechelt breit. "Das ist einer der klügsten Saetze, die ich je gehoert habe. Gewinnen fuehlt sich gut an -- aber wachsen tut man meistens in den Momenten, die sich nicht gut anfuehlen." Du nimmst deinen Stift. Morgen zeichnest du weiter.',
            empathyPoints: 0,
            insightPoints: 4,
            couragePoints: 2,
            nextSceneId: null,
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Scenario 3: "Brief an mich"
  // Teaching: Selbstreflexion, Wachstum erkennen, sich selbst wertschaetzen.
  // ---------------------------------------------------------------------------
  {
    id: 'home-scenario-3',
    islandId: 'home' as IslandId,
    title: 'Brief an mich',
    description:
      'Du schreibst einen Brief an dein zukuenftiges Ich. Was hast du gelernt? Was willst du dir merken? Was wuenschst du dir? Manchmal ist der wichtigste Gespraechspartner man selbst.',
    scenes: [
      {
        id: 'home-s3-scene-1',
        text: 'Es ist ein ruhiger Nachmittag. Du sitzt an deinem Lieblingsplatz -- vielleicht am Schreibtisch, vielleicht im Park, vielleicht auf deinem Bett. Vor dir liegt ein leeres Blatt Papier. ZukunftsDu, eine schimmernde Version von dir selbst, sitzt dir gegenueber und laechelt. "Hey", sagt ZukunftsDu. "Ich bin du, ein Jahr von jetzt. Und ich habe eine Bitte: Schreib mir einen Brief. Erzaehl mir, wo du gerade stehst."',
        speaker: 'ZukunftsDu',
        speakerEmoji: '\u{1F31F}',
        choices: [
          {
            id: 'home-s3-c1a',
            text: '"Das klingt komisch... aber okay. Wo fange ich an?"',
            consequence:
              'ZukunftsDu laechelt. "Fang damit an, was du in letzter Zeit ueber dich gelernt hast. Ueber deine Gefuehle. Ueber den Umgang mit anderen." Du ueberlegst. Es ist erstaunlich, wie viel sich veraendert hat.',
            empathyPoints: 0,
            insightPoints: 2,
            couragePoints: 1,
            nextSceneId: 'home-s3-scene-2',
          },
          {
            id: 'home-s3-c1b',
            text: '"Einen Brief an mich selbst? Liest den ueberhaupt jemand?"',
            consequence:
              'ZukunftsDu grinst. "Ja -- du. In einem Jahr. Und glaub mir, du wirst froh sein, ihn zu haben. Manchmal vergisst man, wie weit man schon gekommen ist. Dieser Brief wird dich daran erinnern." Du nimmst den Stift.',
            empathyPoints: 0,
            insightPoints: 2,
            couragePoints: 2,
            nextSceneId: 'home-s3-scene-2',
          },
        ],
      },
      {
        id: 'home-s3-scene-2',
        text: 'Du beginnst zu schreiben. Die ersten Saetze kommen zoegerlich. Aber dann fliesst es. ZukunftsDu liest leise ueber deine Schulter und nickt. "Erzaehl mir von deinen groessten Erkenntnissen", sagt ZukunftsDu. "Was weisst du heute, das du vor einem halben Jahr noch nicht wusstest?"',
        speaker: 'ZukunftsDu',
        speakerEmoji: '\u{1F31F}',
        choices: [
          {
            id: 'home-s3-c2a',
            text: '"Ich habe gelernt, dass Gefuehle nicht mein Feind sind. Auch die unangenehmen nicht."',
            consequence:
              'Du schreibst: "Lieber Zukunfts-Ich, ich weiss jetzt, dass Wut, Angst und Traurigkeit keine Zeichen von Schwaeche sind. Sie sind Signale. Und wenn ich ihnen zuhoere, statt sie wegzudruecken, helfen sie mir, mich selbst besser zu verstehen." ZukunftsDu nickt: "Das ist eine der wichtigsten Lektionen ueberhaupt."',
            empathyPoints: 1,
            insightPoints: 4,
            couragePoints: 1,
            nextSceneId: 'home-s3-scene-3',
          },
          {
            id: 'home-s3-c2b',
            text: '"Ich habe gelernt, dass Mut nicht heisst, keine Angst zu haben."',
            consequence:
              'Du schreibst: "Lieber Zukunfts-Ich, ich dachte immer, mutige Menschen haben keine Angst. Aber das stimmt nicht. Mut ist, wenn du Angst hast UND es trotzdem machst. Jeder mutige Mensch kennt Angst." ZukunftsDu laechelt warm: "Vergiss das nie."',
            empathyPoints: 0,
            insightPoints: 3,
            couragePoints: 3,
            nextSceneId: 'home-s3-scene-3',
          },
          {
            id: 'home-s3-c2c',
            text: '"Ich habe gelernt, dass ich nicht allein sein muss mit schwierigen Sachen."',
            consequence:
              'Du schreibst: "Lieber Zukunfts-Ich, frueher habe ich versucht, alles allein zu schaffen. Aber ich weiss jetzt: Um Hilfe bitten ist kein Zeichen von Schwaeche. Es ist das Mutigste, was man tun kann." ZukunftsDu fluester: "Bitte vergiss das nie. Auch in einem Jahr nicht."',
            empathyPoints: 2,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: 'home-s3-scene-3',
          },
        ],
      },
      {
        id: 'home-s3-scene-3',
        text: 'ZukunftsDu lehnt sich vor. "Jetzt kommt der schwierigere Teil", sagt ZukunftsDu sanft. "Schreib auch ueber die Dinge, die noch schwer sind. Ueber die Baustellen. Denn Wachstum heisst nicht, dass alles perfekt ist -- sondern dass man weiss, woran man noch arbeiten moechte."',
        speaker: 'ZukunftsDu',
        speakerEmoji: '\u{1F31F}',
        choices: [
          {
            id: 'home-s3-c3a',
            text: '"Manchmal faellt es mir immer noch schwer, Nein zu sagen. Aber ich arbeite daran."',
            consequence:
              'Du schreibst ehrlich ueber die Momente, in denen du nachgegeben hast, obwohl du nicht wolltest. Und dann fuegest du hinzu: "Aber ich weiss jetzt, dass mein Nein genauso viel zaehlt wie mein Ja. Und ich uebe es, Stueck fuer Stueck." Ehrlichkeit mit sich selbst -- das ist die Grundlage fuer alles andere.',
            empathyPoints: 1,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: 'home-s3-scene-4',
          },
          {
            id: 'home-s3-c3b',
            text: '"Ich werde manchmal immer noch wuetend und sage Dinge, die ich nicht meine."',
            consequence:
              'Du schreibst: "Zukunfts-Ich, ich hoffe, du bist besser darin geworden, in der Wut eine Pause einzulegen. Ich weiss, dass die Wut nicht das Problem ist -- aber was ich in der Wut sage, manchmal schon." ZukunftsDu nickt: "Das ist so ehrlich. Und Ehrlichkeit ist der erste Schritt."',
            empathyPoints: 0,
            insightPoints: 4,
            couragePoints: 1,
            nextSceneId: 'home-s3-scene-4',
          },
          {
            id: 'home-s3-c3c',
            text: '"Ich vergleiche mich immer noch viel mit anderen. Und meistens schneide ich dabei schlecht ab."',
            consequence:
              'Du schreibst: "Zukunfts-Ich, bitte hoer auf, dich mit anderen zu vergleichen. Dein Weg ist deiner, und der ist gut genug." ZukunftsDu legt eine Hand auf deinen Arm. "Das, was du gerade geschrieben hast -- lies es, wenn du es wieder vergisst. Und du wirst es vergessen. Aber dann hast du diesen Brief."',
            empathyPoints: 0,
            insightPoints: 4,
            couragePoints: 1,
            nextSceneId: 'home-s3-scene-4',
          },
        ],
      },
      {
        id: 'home-s3-scene-4',
        text: 'ZukunftsDu steht auf und sagt: "Noch ein letzter Abschnitt. Schreib einen Wunsch an dich selbst. Etwas, das du dir fuer die Zukunft wuenschst. Nicht was du haben willst -- sondern wer du sein willst."',
        speaker: 'ZukunftsDu',
        speakerEmoji: '\u{1F31F}',
        choices: [
          {
            id: 'home-s3-c4a',
            text: '"Ich wuensche mir, dass ich der Mensch bin, der hinsieht, wenn jemand Hilfe braucht."',
            consequence:
              'Du schreibst: "Zukunfts-Ich, sei der Mensch, der nicht wegschaut. Sei der, der fragt: Alles gut bei dir? Sei der, der den leisen Menschen zuhoert." ZukunftsDu hat Traenen in den Augen. "Das ist wunderschoen. Und ich verspreche dir: Du wirst genau dieser Mensch sein."',
            empathyPoints: 4,
            insightPoints: 2,
            couragePoints: 2,
            nextSceneId: 'home-s3-scene-5',
          },
          {
            id: 'home-s3-c4b',
            text: '"Ich wuensche mir, dass ich mich selbst genauso behandle, wie ich meine Freunde behandle."',
            consequence:
              'Du schreibst: "Zukunfts-Ich, sei nett zu dir. Rede mit dir so, wie du mit deinem besten Freund reden wuerdest. Du verdienst die gleiche Freundlichkeit." ZukunftsDu laechelt: "Das ist vielleicht die schwerste Lektion von allen. Aber du bist auf dem richtigen Weg."',
            empathyPoints: 2,
            insightPoints: 4,
            couragePoints: 1,
            nextSceneId: 'home-s3-scene-5',
          },
          {
            id: 'home-s3-c4c',
            text: '"Ich wuensche mir, dass ich Fehler machen darf und trotzdem weiss, dass ich genug bin."',
            consequence:
              'Du schreibst: "Zukunfts-Ich, du wirst Fehler machen. Viele. Und das ist okay. Fehler bedeuten, dass du etwas versuchst. Und du bist immer, immer genug -- egal was passiert." ZukunftsDu fluestert: "Diesen Brief werde ich aufheben. Fuer immer."',
            empathyPoints: 1,
            insightPoints: 4,
            couragePoints: 2,
            nextSceneId: 'home-s3-scene-5',
          },
        ],
      },
      {
        id: 'home-s3-scene-5',
        text: 'Du faltest den Brief zusammen. ZukunftsDu beginnt langsam zu verblassen. "Danke", sagt ZukunftsDu leise. "Dieser Brief wird mich an alles erinnern, was du gelernt hast. An deine Staerken und an deine Baustellen. An deinen Mut und an deine Verletzlichkeit. An alles, was dich zu dir macht."',
        speaker: 'ZukunftsDu',
        speakerEmoji: '\u{1F31F}',
        choices: [
          {
            id: 'home-s3-c5a',
            text: '"Mach es gut, Zukunfts-Ich. Ich vertraue dir."',
            consequence:
              'ZukunftsDu winkt und loest sich in tausend kleine Lichtpunkte auf, die wie Gluehwuermchen durch den Raum schweben. Du schaust auf den Brief in deinen Haenden. Er fuehlt sich wertvoll an. Weil du wertvoll bist. Und weil du das jetzt auch weisst.',
            empathyPoints: 1,
            insightPoints: 3,
            couragePoints: 3,
            nextSceneId: null,
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Scenario 4: "Das Fest der Inseln"
  // Teaching: Alle gelernten Faehigkeiten kommen zusammen. NPCs aus allen Inseln
  // kehren zurueck. Feier des Wachstums und Blick in die Zukunft.
  // ---------------------------------------------------------------------------
  {
    id: 'home-scenario-4',
    islandId: 'home' as IslandId,
    title: 'Das Fest der Inseln',
    description:
      'Ein grosses Fest vereint alle Inseln. Bekannte Gesichter kehren zurueck, und gemeinsam feiert ihr alles, was ihr gelernt habt. Denn Wachstum verdient gefeiert zu werden.',
    scenes: [
      {
        id: 'home-s4-scene-1',
        text: 'Heute ist ein besonderer Tag. Die Heimat-Insel leuchtet in allen Farben, denn heute findet das Fest der Inseln statt -- ein Fest, bei dem alle zusammenkommen, die dich auf deiner Reise begleitet haben. Am Eingang steht ein grosses Banner: "Fuer alle, die gewachsen sind." Du siehst vertraute Gesichter: Timber, der Waldgeist, winkt dir zwischen den Baeumen zu. Marina, die Meerjungfrau, hat einen kleinen Brunnen mitgebracht, in dem bunte Fische schwimmen. Und da hinten -- ist das nicht Amadou mit seiner Djembe?',
        speaker: 'Erzaehler',
        speakerEmoji: '\u{1F3E0}',
        choices: [
          {
            id: 'home-s4-c1a',
            text: 'Zuerst zu Timber gehen und ihn begruessen.',
            consequence:
              'Timber leuchtet sanft, als er dich sieht. "Da bist du ja", sagt er warm. "Weisst du noch, als wir zusammen im Wald ueber Angst gesprochen haben? Schau dich an jetzt. Du bist so viel mutiger geworden." Sein Leuchten wird heller. "Und weisst du, was mich am meisten freut? Du hast gelernt, dass Mut und Angst zusammen existieren koennen."',
            empathyPoints: 1,
            insightPoints: 2,
            couragePoints: 2,
            nextSceneId: 'home-s4-scene-2',
          },
          {
            id: 'home-s4-c1b',
            text: 'Marina am Brunnen besuchen.',
            consequence:
              'Marina laechelt, als du kommst. "Erinnerst du dich an den Ozean?", fragt sie. "An die Wellen der Traurigkeit?" Du nickst. "Weisst du, was ich an dir bewundere?", sagt sie. "Du hast gelernt, dass Traurigkeit keine Schwaeche ist. Und du hast gelernt, darueber zu sprechen. Das koennen nicht mal alle Erwachsenen."',
            empathyPoints: 2,
            insightPoints: 2,
            couragePoints: 1,
            nextSceneId: 'home-s4-scene-2',
          },
          {
            id: 'home-s4-c1c',
            text: 'Zu Amadou gehen, der bereits trommelt.',
            consequence:
              'Amadou grinst dich an und schlaegt einen Willkommensrhythmus. "Hey! Erinnerst du dich, als wir ueber Vielfalt gesprochen haben? Ueber all die verschiedenen Menschen und Geschichten?" Er reicht dir eine kleine Trommel. "Heute feiern wir, dass verschieden sein das Beste ist, was es gibt."',
            empathyPoints: 2,
            insightPoints: 1,
            couragePoints: 2,
            nextSceneId: 'home-s4-scene-2',
          },
        ],
      },
      {
        id: 'home-s4-scene-2',
        text: 'Das Fest ist in vollem Gange. Ueberall gibt es Stationen, die an die verschiedenen Inseln erinnern. Am Vulkan-Stand kann man seine Wut in einen Boxsack schlagen und danach tief durchatmen. Am Garten-Stand gibt es Samen zum Einpflanzen -- als Symbol dafuer, dass Beziehungen gepflegt werden muessen. Am Nacht-Stand leuchten Sterne und man kann sich leise Geschichten erzaehlen. Der Guide tritt auf eine kleine Buehne und sagt: "Bevor wir weiterfeiern, moechte ich etwas Besonderes machen. Ich moechte, dass jeder von euch eine Sache teilt, die er auf dieser Reise gelernt hat."',
        speaker: 'Guide',
        speakerEmoji: '\u{2728}',
        choices: [
          {
            id: 'home-s4-c2a',
            text: '"Ich habe gelernt, dass es okay ist, nicht okay zu sein."',
            consequence:
              'Es wird still. Dann nicken viele. Timber sagt leise: "Das war auch meine groesste Lektion." Marina wischt sich eine Traene weg. Dein Satz hat etwas beruehrt, weil er wahr ist. Und weil jeder hier das Gleiche gefuehlt hat.',
            empathyPoints: 2,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: 'home-s4-scene-3',
          },
          {
            id: 'home-s4-c2b',
            text: '"Ich habe gelernt, dass meine Gefuehle mich nicht definieren -- aber sie sind wichtig."',
            consequence:
              'Amadou trommelt einen anerkennenden Rhythmus. "Ja!", ruft er. "Gefuehle kommen und gehen wie Musik. Aber du bist das ganze Lied, nicht nur ein einzelner Ton." Die Menge lacht und klatscht. Du hast etwas gesagt, das sitzt.',
            empathyPoints: 1,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: 'home-s4-scene-3',
          },
          {
            id: 'home-s4-c2c',
            text: '"Ich habe gelernt, dass man zusammen staerker ist als allein."',
            consequence:
              'Sofia nickt heftig. "Genau das! Als ich allein war, fuehlte sich alles riesig an. Aber mit anderen an meiner Seite wurde alles handhabbar." Der Guide laechelt. "Das ist der Kern von allem, was wir hier machen: Fuereinander da sein."',
            empathyPoints: 3,
            insightPoints: 2,
            couragePoints: 1,
            nextSceneId: 'home-s4-scene-3',
          },
        ],
      },
      {
        id: 'home-s4-scene-3',
        text: 'Es wird langsam dunkel und jemand hat Lichterketten aufgehaengt. Die Atmosphaere ist warm und friedlich. ZukunftsDu erscheint neben dir, schimmert leise im Lichterschein. "Schau dich um", sagt ZukunftsDu. "All diese Menschen und Wesen, die du getroffen hast. Jede Begegnung hat dich ein Stueckchen veraendert. Du bist nicht mehr dieselbe Person, die diese Reise begonnen hat."',
        speaker: 'ZukunftsDu',
        speakerEmoji: '\u{1F31F}',
        choices: [
          {
            id: 'home-s4-c3a',
            text: '"Stimmt. Ich hab mich veraendert. Und es fuehlt sich gut an."',
            consequence:
              'ZukunftsDu nickt. "Du hast gelernt, deine Wut zu verstehen, statt sie rauszulassen. Du hast gelernt, Traurigkeit zuzulassen, statt sie zu verstecken. Du hast gelernt, Angst zu spueren und trotzdem mutig zu sein. Das alles traegst du jetzt in dir -- fuer immer."',
            empathyPoints: 1,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: 'home-s4-scene-4',
          },
          {
            id: 'home-s4-c3b',
            text: '"Ich bin ein bisschen traurig, dass die Reise vorbei ist."',
            consequence:
              'ZukunftsDu laechelt sanft. "Die Reise ist nicht vorbei. Sie geht weiter -- jeden Tag, in jeder Situation. Der Unterschied ist: Jetzt hast du Werkzeuge. Und du weisst, dass du nicht allein bist." Du schaust auf das Fest und spuerst: Das stimmt. Es geht weiter.',
            empathyPoints: 1,
            insightPoints: 3,
            couragePoints: 1,
            nextSceneId: 'home-s4-scene-4',
          },
        ],
      },
      {
        id: 'home-s4-scene-4',
        text: 'Der Guide tritt noch einmal auf die Buehne. "Zum Abschluss unseres Festes habe ich eine letzte Aufgabe fuer euch", sagt er. "Keine schwere. Eine schoene. Ich moechte, dass jeder von euch sich eine Person aussucht, der er heute etwas Nettes sagt. Etwas Echtes. Etwas, das von Herzen kommt." Er schaut dich an. "Willst du anfangen?"',
        speaker: 'Guide',
        speakerEmoji: '\u{2728}',
        choices: [
          {
            id: 'home-s4-c4a',
            text: 'Zum Guide gehen und sagen: "Danke, dass du mich auf dieser Reise begleitet hast. Du hast mir gezeigt, dass ich mehr kann, als ich dachte."',
            consequence:
              'Der Guide schluckt und seine Augen werden feucht. "Das... das bedeutet mir sehr viel", sagt er leise. "Aber weisst du was? Alles, was du gelernt hast, war schon in dir. Ich habe nur geholfen, es zu finden." Ringsherum laecheln die anderen.',
            empathyPoints: 3,
            insightPoints: 2,
            couragePoints: 2,
            nextSceneId: 'home-s4-scene-5',
          },
          {
            id: 'home-s4-c4b',
            text: 'Zu Timber, Marina und den anderen gehen und sagen: "Danke, dass ihr mir eure Geschichten erzaehlt habt. Jede einzelne hat etwas in mir veraendert."',
            consequence:
              'Timber leuchtet heller. Marina laechelt. Amadou spielt einen sanften Rhythmus. Du spuerst, wie warm es sich anfuehlt, Dankbarkeit auszusprechen -- nicht nur zu fuehlen, sondern laut zu sagen. "Danke" ist eines der machtvollsten Woerter, die es gibt.',
            empathyPoints: 4,
            insightPoints: 1,
            couragePoints: 2,
            nextSceneId: 'home-s4-scene-5',
          },
          {
            id: 'home-s4-c4c',
            text: 'Dir selbst etwas sagen: "Ich bin stolz auf mich. Auf alles, was ich geschafft habe."',
            consequence:
              'Du sagst es leise, nur fuer dich. Aber ZukunftsDu hoert es und laechelt. Der Guide nickt wissend. Sich selbst anzuerkennen -- das ist vielleicht die mutigste Sache von allen. Und du hast es verdient.',
            empathyPoints: 1,
            insightPoints: 3,
            couragePoints: 3,
            nextSceneId: 'home-s4-scene-5',
          },
        ],
      },
      {
        id: 'home-s4-scene-5',
        text: 'Das Fest neigt sich dem Ende zu. Die Lichterketten leuchten wie kleine Sterne. Einer nach dem anderen verabschiedet sich -- aber nicht fuer immer. "Wir sind immer da", sagt Timber beim Gehen. "In deinem Kopf, in deinem Herzen, in deinem Werkzeugkoffer." Marina winkt vom Brunnen aus. ZukunftsDu steht neben dir und sagt: "Bereit fuer morgen?"',
        speaker: 'ZukunftsDu',
        speakerEmoji: '\u{1F31F}',
        choices: [
          {
            id: 'home-s4-c5a',
            text: '"Bereit. Nicht perfekt. Aber bereit."',
            consequence:
              'ZukunftsDu lacht. "Das ist die beste Antwort, die es gibt. Perfekt muss man nicht sein. Bereit reicht voellig." Du schaust auf die Insel, die leise leuchtet. In dir ist ein warmes Gefuehl -- wie eine Flamme, die niemand ausloeschen kann. Du bist gewachsen. Du bist staerker. Und was auch kommt -- du bist bereit.',
            empathyPoints: 2,
            insightPoints: 3,
            couragePoints: 3,
            nextSceneId: null,
          },
          {
            id: 'home-s4-c5b',
            text: '"Bereit. Und diesmal weiss ich: Ich muss es nicht allein schaffen."',
            consequence:
              'ZukunftsDu nickt. "Das ist die wichtigste Erkenntnis von allen." In der Ferne hoerst du Amadous Trommel, leise und stetig wie ein Herzschlag. Du laechelst. Die Reise geht weiter. Aber jetzt traegst du alles in dir, was du brauchst -- und du weisst, wo du Hilfe findest, wenn du sie brauchst.',
            empathyPoints: 2,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: null,
          },
        ],
      },
    ],
  },
];

// =============================================================================
// 2. WISDOM CARDS
// =============================================================================

export const homeWisdomCards: WisdomCard[] = [
  {
    id: 'home-wisdom-1',
    islandId: 'home' as IslandId,
    text: 'Du hast nicht nur ein Werkzeug -- du hast einen ganzen Koffer. Durchatmen, zuhoeren, Grenzen setzen, Hilfe holen. Benutze, was du brauchst.',
    category: 'strategy',
    collected: false,
  },
  {
    id: 'home-wisdom-2',
    islandId: 'home' as IslandId,
    text: 'Scheitern ist kein Zeichen, dass du aufhoeren sollst. Es ist ein Zeichen, dass du etwas Mutiges versucht hast.',
    category: 'courage',
    collected: false,
  },
  {
    id: 'home-wisdom-3',
    islandId: 'home' as IslandId,
    text: 'Wachstum ist kein gerader Weg. Manchmal geht es zurueck, bevor es vorwaerts geht. Und das ist voellig normal.',
    category: 'insight',
    collected: false,
  },
  {
    id: 'home-wisdom-4',
    islandId: 'home' as IslandId,
    text: 'Sei zu dir selbst so freundlich, wie du zu deinem besten Freund waerst. Du verdienst die gleiche Guete.',
    category: 'emotion',
    collected: false,
  },
  {
    id: 'home-wisdom-5',
    islandId: 'home' as IslandId,
    text: 'Im echten Leben kommen Probleme selten einzeln. Aber du hast gelernt, viele Werkzeuge gleichzeitig zu nutzen -- und das macht dich staerker, als du denkst.',
    category: 'strategy',
    collected: false,
  },
  {
    id: 'home-wisdom-6',
    islandId: 'home' as IslandId,
    text: 'Du musst nicht perfekt sein, um wertvoll zu sein. Du bist genug, genau so, wie du bist -- mit all deinen Ecken und Kanten.',
    category: 'emotion',
    collected: false,
  },
  {
    id: 'home-wisdom-7',
    islandId: 'home' as IslandId,
    text: 'Jede schwierige Situation, die du gemeistert hast, hat dir etwas beigebracht. Du bist die Summe all deiner Erfahrungen.',
    category: 'insight',
    collected: false,
  },
  {
    id: 'home-wisdom-8',
    islandId: 'home' as IslandId,
    text: 'Hilfe annehmen ist genauso mutig wie Hilfe geben. Beides braucht Vertrauen und Staerke.',
    category: 'courage',
    collected: false,
  },
  {
    id: 'home-wisdom-9',
    islandId: 'home' as IslandId,
    text: 'Die Menschen, die du auf deinem Weg triffst, veraendern dich -- und du veraenderst sie. Jede Begegnung zaehlt.',
    category: 'emotion',
    collected: false,
  },
  {
    id: 'home-wisdom-10',
    islandId: 'home' as IslandId,
    text: 'Wenn du nicht weisst, was du tun sollst, frag dich: Was wuerde ich meinem besten Freund in dieser Situation raten? Und dann nimm deinen eigenen Rat an.',
    category: 'strategy',
    collected: false,
  },
  {
    id: 'home-wisdom-11',
    islandId: 'home' as IslandId,
    text: 'Du darfst stolz auf dich sein -- nicht erst, wenn alles perfekt laeuft, sondern gerade dann, wenn es schwer war und du trotzdem weitergemacht hast.',
    category: 'courage',
    collected: false,
  },
  {
    id: 'home-wisdom-12',
    islandId: 'home' as IslandId,
    text: 'Die Reise endet hier nicht. Alles, was du gelernt hast, traegst du in dir -- fuer jeden Tag, jede Herausforderung, jedes Abenteuer, das noch kommt.',
    category: 'insight',
    collected: false,
  },
];

// =============================================================================
// 3. ACTIVITIES
// =============================================================================

export const homeActivities: HomeActivity[] = [
  // ---------------------------------------------------------------------------
  // Activity 1: Werkzeugkoffer (Reflection)
  // Ueberblick ueber alle gelernten Strategien
  // ---------------------------------------------------------------------------
  {
    id: 'home-activity-1',
    islandId: 'home' as IslandId,
    type: 'reflection',
    title: 'Werkzeugkoffer',
    description:
      'Erstelle einen Ueberblick ueber alle Strategien und Werkzeuge, die du auf deiner Reise gelernt hast. Dein persoenlicher Werkzeugkoffer fuer den Alltag.',
    instructions: [
      'Nimm dir ein Blatt Papier oder oeffne ein leeres Dokument. Zeichne einen grossen Koffer in die Mitte -- das ist dein Werkzeugkoffer.',
      'Denke zurueck an jede Insel, die du besucht hast. Was hast du dort gelernt? Schreibe fuer jede Insel mindestens ein "Werkzeug" auf. Zum Beispiel: Vulkan-Insel = "Tief durchatmen bei Wut", Ozean-Insel = "Ueber Traurigkeit reden hilft".',
      'Ordne deine Werkzeuge in Kategorien ein: Welche helfen bei Wut? Welche bei Angst? Welche bei Traurigkeit? Welche bei Konflikten mit anderen? Welche, wenn du dich allein fuehlst?',
      'Markiere die drei Werkzeuge, die dir persoenlich am meisten geholfen haben. Schreibe daneben, in welcher Situation du sie benutzt hast.',
      'Gibt es Situationen, fuer die du noch kein passendes Werkzeug hast? Schreibe sie auf. Ueberlege: Wen koenntest du fragen? Was koenntest du ausprobieren?',
      'Bewahre deinen Werkzeugkoffer an einem Ort auf, wo du ihn leicht findest. Wenn eine schwierige Situation kommt, schau drauf und waehle das passende Werkzeug aus. Dein Koffer waechst mit dir -- du kannst jederzeit neue Werkzeuge hinzufuegen.',
    ],
    completed: false,
  },

  // ---------------------------------------------------------------------------
  // Activity 2: Notfallplan (Creative)
  // Persoenlichen Krisenplan erstellen
  // ---------------------------------------------------------------------------
  {
    id: 'home-activity-2',
    islandId: 'home' as IslandId,
    type: 'creative',
    title: 'Notfallplan',
    description:
      'Erstelle deinen persoenlichen Notfallplan fuer richtig schwierige Tage. Mit Kontakten, Strategien und Erinnerungen an das, was dir hilft.',
    instructions: [
      'Nimm ein schoenes Blatt Papier oder eine Karteikarte. Schreibe oben gross: "Mein Notfallplan -- fuer Tage, die sich zu gross anfuehlen".',
      'Abschnitt 1 -- Meine Menschen: Schreibe 3-5 Personen auf, denen du vertraust und die du anrufen kannst, wenn es dir nicht gut geht. Schreibe ihren Namen und ihre Telefonnummer oder wie du sie erreichst.',
      'Abschnitt 2 -- Professionelle Hilfe: Notiere diese wichtigen Nummern: Kinder- und Jugendtelefon: 116 111 (kostenlos, anonym). Schreibe auch auf, ob es an deiner Schule eine Schulsozialarbeit oder Vertrauenslehrkraft gibt.',
      'Abschnitt 3 -- Was mir hilft: Schreibe 5 Dinge auf, die dir in schwierigen Momenten guttun. Zum Beispiel: Musik hoeren, rausgehen, zeichnen, mit dem Hund kuscheln, meine Lieblingsdecke, ein bestimmtes Lied.',
      'Abschnitt 4 -- Mein Mut-Satz: Schreibe einen Satz auf, den du dir selbst sagen kannst, wenn alles zu viel wird. Zum Beispiel: "Es geht vorbei. Ich habe schon Schwieriges geschafft." Oder: "Ich darf mir Hilfe holen."',
      'Falte den Plan und lege ihn an einen sicheren Ort -- zum Beispiel in deine Handyhuelle, in deinen Geldbeutel oder in die Schublade neben deinem Bett. Er ist da, wenn du ihn brauchst. Und allein das Wissen, dass er da ist, kann schon helfen.',
    ],
    completed: false,
  },

  // ---------------------------------------------------------------------------
  // Activity 3: Ziele-Kompass (Assessment)
  // SMART-Ziele setzen fuer die Zukunft
  // ---------------------------------------------------------------------------
  {
    id: 'home-activity-3',
    islandId: 'home' as IslandId,
    type: 'assessment',
    title: 'Ziele-Kompass',
    description:
      'Setze dir persoenliche Ziele fuer die naechsten Wochen und Monate. Ein Kompass, der dir zeigt, wohin du wachsen moechtest.',
    instructions: [
      'Stell dir einen Kompass vor. Jede Himmelsrichtung steht fuer einen Bereich deines Lebens: Norden = Schule & Lernen, Osten = Freundschaften & Beziehungen, Sueden = Gefuehle & innere Welt, Westen = Hobbys & Kreativitaet. Zeichne diesen Kompass auf.',
      'Waehle einen Bereich aus, in dem du wachsen moechtest. Formuliere ein konkretes Ziel. Nicht zu gross, nicht zu klein. Zum Beispiel: "Ich moechte innerhalb der naechsten zwei Wochen einmal jemandem ehrlich sagen, wie ich mich fuehle."',
      'Pruefe dein Ziel mit der SMART-Regel: S = Spezifisch (Ist klar, was genau du tun willst?), M = Messbar (Kannst du pruefen, ob du es geschafft hast?), A = Attraktiv (Willst du das wirklich?), R = Realistisch (Kannst du das in der Zeit schaffen?), T = Terminiert (Bis wann willst du es schaffen?).',
      'Schreibe unter dein Ziel: "Mein erster Schritt ist..." Zum Beispiel: "Mein erster Schritt ist, morgen in der Pause mit Lena zu reden und ihr zu sagen, dass ich sie vermisse."',
      'Ueberlege: Was koennte dich daran hindern? Und was kannst du tun, wenn ein Hindernis auftaucht? Schreibe einen Plan B auf. Zum Beispiel: "Wenn ich mich nicht traue, es persoenlich zu sagen, schreibe ich ihr eine Nachricht."',
      'Setze dir einen Erinnerungstermin -- zum Beispiel in zwei Wochen. Schau dann auf dein Ziel zurueck: Hast du es geschafft? Teilweise? Gar nicht? Jedes Ergebnis ist okay -- wichtig ist, dass du es versucht hast. Und dann setzt du dir das naechste Ziel.',
    ],
    completed: false,
  },
];

// =============================================================================
// 4. NPCs
// =============================================================================

export const homeNPCs: HomeNPC[] = [
  {
    id: 'home-npc-guide',
    name: 'Guide',
    emoji: '\u{2728}',
    description:
      'Ein weiser Begleiter, der die ganze Reise ueber an deiner Seite war. Er spricht ruhig und bedacht, und seine Worte haben die Waerme von jemandem, der dich wirklich kennt.',
    backstory:
      'Der Guide war selbst einmal ein Reisender wie du. Er hat jede Insel besucht, jeden Sturm erlebt, jede Traene geweint und jedes Lachen geteilt. Er hat gelernt, seine Wut zu verstehen, seine Traurigkeit zuzulassen und seine Angst als Kompass zu nutzen. Heute begleitet er andere auf ihrer Reise -- nicht als jemand, der alle Antworten hat, sondern als jemand, der die richtigen Fragen stellt. "Ich bin nicht hier, um dir zu sagen, was du tun sollst", sagt er oft. "Ich bin hier, um dich daran zu erinnern, dass du es schon weisst." Der Guide glaubt an jeden einzelnen Reisenden, den er trifft. Und sein groesster Stolz ist, wenn sie irgendwann nicht mehr seine Hilfe brauchen -- weil sie gelernt haben, ihr eigener Guide zu sein.',
  },
  {
    id: 'home-npc-zukunftsdu',
    name: 'ZukunftsDu',
    emoji: '\u{1F31F}',
    description:
      'Eine schimmernde, leicht durchsichtige Version von dir selbst -- du in einem Jahr. Sie/er strahlt eine ruhige Zuversicht aus und kennt dich besser als jeder andere.',
    backstory:
      'ZukunftsDu ist nicht wirklich aus der Zukunft. ZukunftsDu ist die Version von dir, die bereits in dir existiert -- die kluge, ruhige, mitfuehlende Stimme, die du manchmal hoerst, wenn du ganz still bist. Es ist die Stimme, die sagt: "Du schaffst das." Es ist die Stimme, die weiss, dass Fehler zum Wachsen gehoeren. ZukunftsDu kennt all deine Staerken, auch die, die du selbst noch nicht siehst. Und ZukunftsDu kennt all deine Schwaechen -- und liebt dich trotzdem, gerade deswegen. "Ich bin du", sagt ZukunftsDu manchmal. "Nur mit ein bisschen mehr Erfahrung. Aber alles, was ich kann, kannst du auch. Du weisst es nur noch nicht." ZukunftsDu taucht immer dann auf, wenn du Zweifel hast. Nicht um dir zu sagen, dass alles perfekt sein wird -- sondern um dich daran zu erinnern, dass du staerker bist, als du denkst.',
  },
];
