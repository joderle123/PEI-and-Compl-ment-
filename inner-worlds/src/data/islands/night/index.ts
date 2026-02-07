// =============================================================================
// Inner Worlds - Night Island ("Nacht-Insel")
// Theme: Achtsamkeit & Stressmanagement (Mindfulness & Stress Management)
// All content in German, written for ages 10-15
// Therapeutically grounded: Mindfulness-based stress reduction, cognitive
// defusion, digital wellness, self-care strategies, prioritization skills
// =============================================================================

import type { Scenario, WisdomCard, Activity, IslandId } from '../../../types';

// -----------------------------------------------------------------------------
// Extended Activity type (adds instructions for guided activities)
// -----------------------------------------------------------------------------

interface NightActivity extends Activity {
  instructions: string[];
}

// -----------------------------------------------------------------------------
// NPC type for island characters
// -----------------------------------------------------------------------------

interface NightNPC {
  id: string;
  name: string;
  emoji: string;
  description: string;
  backstory: string;
}

// =============================================================================
// 1. SCENARIOS
// =============================================================================

export const nightScenarios: Scenario[] = [
  // ---------------------------------------------------------------------------
  // Scenario 1: "Die Pruefungswoche"
  // Teaching: Wenn alles auf einmal kommt, hilft es, Prioritaeten zu setzen,
  // grosse Aufgaben in kleine Schritte zu zerlegen und sich selbst nicht zu
  // vergessen. Perfektionismus ist nicht das Ziel - gutes Genug reicht.
  // ---------------------------------------------------------------------------
  {
    id: 'night-scenario-1',
    islandId: 'night' as IslandId,
    title: 'Die Pruefungswoche',
    description:
      'Naechste Woche stehen drei Tests an, dazu ein Projektabgabe und Sportturnier. Dein Kopf raucht, dein Schreibtisch quillt ueber. Wie schaffst du das alles, ohne dich selbst zu verlieren?',
    scenes: [
      {
        id: 'night-s1-scene-1',
        text: 'Sonntagabend. Du sitzt an deinem Schreibtisch und starrst auf die Liste: Mathe-Test am Dienstag, Englisch-Vokabeltest am Mittwoch, Erdkunde-Praesentation am Donnerstag, Projektabgabe Kunst am Freitag. Dein Magen zieht sich zusammen. Wo sollst du ueberhaupt anfangen? Luna, die Mondwaecherin, erscheint leise am Fenster. "Ich sehe, dass dein Kopf gerade sehr voll ist", sagt sie sanft. "Darf ich dir etwas zeigen?"',
        speaker: 'Luna',
        speakerEmoji: '\u{1F319}',
        choices: [
          {
            id: 'night-s1-c1a',
            text: '"Ja bitte, ich weiss echt nicht, wo ich anfangen soll. Alles fuehlt sich gleich dringend an."',
            consequence:
              'Luna nickt verstaendnisvoll. "Das ist ganz normal. Wenn alles gleich wichtig scheint, wird alles ueberwealtigend. Der erste Schritt ist: Sortieren. Nicht alles auf einmal loesen - sondern herausfinden, was zuerst dran ist."',
            empathyPoints: 1,
            insightPoints: 2,
            couragePoints: 1,
            nextSceneId: 'night-s1-scene-2a',
          },
          {
            id: 'night-s1-c1b',
            text: 'Versuchen, einfach draufloszulernen - irgendwas ist besser als nichts.',
            consequence:
              'Du schlaegst das Mathe-Buch auf, blaetterst aber nach zwei Minuten zu Englisch, dann zu Erdkunde. Nach einer halben Stunde hast du von allem ein bisschen angefangen und nichts richtig gemacht. Dein Kopf fuehlt sich noch voller an als vorher.',
            empathyPoints: 0,
            insightPoints: 1,
            couragePoints: 1,
            nextSceneId: 'night-s1-scene-2b',
          },
          {
            id: 'night-s1-c1c',
            text: 'Die Liste wegschieben und erstmal dein Handy nehmen - du brauchst eine Pause, bevor du anfaengst.',
            consequence:
              'Eine Stunde spaeter schaust du auf die Uhr. Du hast nur Videos geguckt und die Zeit ist einfach weggeflossen. Die Liste ist noch da, und jetzt hast du auch noch weniger Zeit. Manchmal tarnt sich Vermeidung als Pause.',
            empathyPoints: 0,
            insightPoints: 2,
            couragePoints: 0,
            nextSceneId: 'night-s1-scene-2b',
          },
        ],
      },
      {
        id: 'night-s1-scene-2a',
        text: 'Luna breitet ein sanftes Mondlicht ueber deinen Schreibtisch aus. "Stell dir vor, deine Aufgaben sind wie Sterne am Himmel. Manche leuchten heller, weil sie naeher sind - die stehen frueher an. Andere sind weiter weg und haben noch Zeit. Lass uns sortieren: Was ist morgen oder uebermorgen faellig? Und was hat noch laenger Zeit?"',
        speaker: 'Luna',
        speakerEmoji: '\u{1F319}',
        choices: [
          {
            id: 'night-s1-c2a1',
            text: 'Die Aufgaben nach Datum sortieren und mit der fruehesten anfangen - Mathe am Dienstag.',
            consequence:
              'Du schreibst eine Reihenfolge: 1. Mathe, 2. Englisch, 3. Erdkunde, 4. Kunst. Allein das Aufschreiben hilft. Ploetzlich ist es kein riesiger Berg mehr, sondern vier einzelne Huegel. Und heute Abend kuemmerst du dich nur um den ersten.',
            empathyPoints: 0,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: 'night-s1-scene-3',
          },
          {
            id: 'night-s1-c2a2',
            text: 'Fuer jede Aufgabe schaetzen, wie lange du brauchst, und einen Zeitplan machen.',
            consequence:
              'Du ueberlegst: Mathe braucht circa eine Stunde, Vokabeln 30 Minuten, Erdkunde-Praesentation zwei Stunden, Kunst-Projekt ist fast fertig. Wenn du es ueber die Woche verteilst, ist es machbar. Luna laechelt: "Siehst du? Es ist viel, aber es ist nicht unmoeglich."',
            empathyPoints: 0,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: 'night-s1-scene-3',
          },
        ],
      },
      {
        id: 'night-s1-scene-2b',
        text: 'Luna setzt sich neben dich. "Ich verstehe, dass du gerade ueberfordert bist. Dein Gehirn reagiert auf Stress manchmal mit Erstarrung oder Ablenkung - das ist eine ganz natuerliche Schutzreaktion. Aber sie hilft dir nicht weiter. Willst du es nochmal versuchen - diesmal mit einem kleinen Trick?"',
        speaker: 'Luna',
        speakerEmoji: '\u{1F319}',
        choices: [
          {
            id: 'night-s1-c2b1',
            text: '"Okay, zeig mir deinen Trick. Schlimmer kann es nicht werden."',
            consequence:
              'Luna laechelt. "Schreib alles auf, was du tun musst. Alles. Dann such dir die EINE Sache aus, die als Erstes dran ist. Nur diese eine. Alles andere existiert jetzt noch nicht." Du schreibst die Liste. Und ploetzlich wird aus dem Chaos Ordnung.',
            empathyPoints: 0,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: 'night-s1-scene-3',
          },
          {
            id: 'night-s1-c2b2',
            text: '"Ich ruf erstmal meine beste Freundin an. Vielleicht koennen wir zusammen lernen."',
            consequence:
              'Deine Freundin geht ran und sagt: "Mir geht es genauso! Lass uns einen Plan machen - wir telefonieren und lernen gleichzeitig." Es hilft zu wissen, dass du nicht die Einzige bist. Zusammen teilt ihr die Aufgaben auf und motiviert euch gegenseitig.',
            empathyPoints: 2,
            insightPoints: 2,
            couragePoints: 1,
            nextSceneId: 'night-s1-scene-3',
          },
        ],
      },
      {
        id: 'night-s1-scene-3',
        text: 'Es ist Mittwochabend. Mathe-Test und Vokabeltest hast du geschafft - nicht perfekt, aber okay. Jetzt sitzt du an der Erdkunde-Praesentation, aber du bist muede. Deine Augen brennen, und du hast das Gefuehl, seit Tagen nur noch zu lernen. Dein Koerper sagt dir etwas. Luna fragt leise: "Wann hast du das letzte Mal etwas getan, das dir gut tut? Nicht lernen, nicht funktionieren - sondern einfach nur sein?"',
        speaker: 'Luna',
        speakerEmoji: '\u{1F319}',
        choices: [
          {
            id: 'night-s1-c3a',
            text: 'Zugeben: "Ich weiss es nicht mehr. Ich hab nur noch gelernt."',
            consequence:
              'Luna nickt. "Dein Koerper und dein Kopf brauchen Pausen, um gut zu funktionieren. Lernen ohne Pause ist wie Rennen ohne Atmen - irgendwann geht nichts mehr. Goenn dir 30 Minuten. Geh raus, hoer Musik, beweg dich. Danach lernst du besser."',
            empathyPoints: 1,
            insightPoints: 3,
            couragePoints: 1,
            nextSceneId: 'night-s1-scene-4',
          },
          {
            id: 'night-s1-c3b',
            text: '"Ich kann jetzt keine Pause machen! Die Praesentation muss fertig werden!"',
            consequence:
              'Du arbeitest weiter, aber die Worte verschwimmen vor deinen Augen. Nach 20 Minuten merkst du, dass du dreimal denselben Satz gelesen hast, ohne ihn zu verstehen. Luna sagt sanft: "Siehst du? Dein Koerper hat schon entschieden. Er braucht eine Pause - ob du es erlaubst oder nicht."',
            empathyPoints: 0,
            insightPoints: 3,
            couragePoints: 0,
            nextSceneId: 'night-s1-scene-4',
          },
          {
            id: 'night-s1-c3c',
            text: 'Eine kurze Runde um den Block gehen, frische Luft schnappen, dann weiterarbeiten.',
            consequence:
              'Die kalte Abendluft tut gut. Du schaust kurz in den Nachthimmel, atmest tief durch. Als du zurueckkommst, fuehlt sich dein Kopf klarer an. Die Praesentation geht jetzt leichter von der Hand. Pausen sind keine verschwendete Zeit - sie sind Teil des Lernens.',
            empathyPoints: 0,
            insightPoints: 2,
            couragePoints: 2,
            nextSceneId: 'night-s1-scene-4',
          },
        ],
      },
      {
        id: 'night-s1-scene-4',
        text: 'Freitagnachmittag. Die Woche ist geschafft. Nicht alles war perfekt - in Mathe hast du eine Aufgabe nicht gekonnt, bei Erdkunde hast du einmal den Faden verloren. Aber du hast alles abgegeben, alles geschrieben, alles praesentiert. Du sitzt auf deinem Bett und fuehlst eine merkwuerdige Mischung aus Muedigkeit und Stolz. Luna erscheint ein letztes Mal. "Was hast du diese Woche ueber dich gelernt?"',
        speaker: 'Luna',
        speakerEmoji: '\u{1F319}',
        choices: [
          {
            id: 'night-s1-c4a',
            text: '"Dass ich mehr schaffe, als ich dachte - wenn ich es in kleine Teile zerlege und nicht alles auf einmal will."',
            consequence:
              'Luna strahlt. "Genau. Grosse Aufgaben werden klein, wenn du sie zerlegst. Und du musst nicht perfekt sein - du musst nur anfangen. Der Rest ergibt sich Schritt fuer Schritt." Du laechelst und fuehlst dich ein Stueckchen weiser als letzte Woche.',
            empathyPoints: 1,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: null,
          },
          {
            id: 'night-s1-c4b',
            text: '"Dass Pausen keine Schwaeche sind. Ohne Pausen waere ich zusammengebrochen."',
            consequence:
              'Luna nickt warm. "Selbstfuersorge ist kein Luxus - sie ist eine Notwendigkeit. Dein Kopf braucht Erholung, genau wie dein Koerper nach dem Sport. Wer sich keine Pausen erlaubt, arbeitet nicht haerter - sondern schlechter." Du nimmst dir vor, das nicht zu vergessen.',
            empathyPoints: 0,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: null,
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Scenario 2: "Gedankenkarussell"
  // Teaching: Gruebeln und Gedankenspiralen erkennen und unterbrechen.
  // Gedanken sind nicht Tatsachen. Achtsamkeit hilft, aus dem Karussell
  // auszusteigen. Schlafhygiene als Selbstfuersorge.
  // ---------------------------------------------------------------------------
  {
    id: 'night-scenario-2',
    islandId: 'night' as IslandId,
    title: 'Gedankenkarussell',
    description:
      'Es ist spaet, du liegst im Bett, aber dein Kopf hoert nicht auf. Gedanken drehen sich im Kreis: ueber den Tag, ueber morgen, ueber alles. Je mehr du versuchst zu schlafen, desto wacher wirst du.',
    scenes: [
      {
        id: 'night-s2-scene-1',
        text: 'Es ist 22:30 Uhr. Du hast das Licht ausgemacht, die Decke hochgezogen, die Augen geschlossen. Eigentlich bist du muede. Aber dein Kopf hat andere Plaene. "Hast du eigentlich die Hausaufgabe richtig gemacht?" "Was hat Mia heute damit gemeint, als sie das gesagt hat?" "Was, wenn morgen in Sport wieder Teams gewaehlt werden und du als Letztes drankommst?" Die Gedanken kommen wie Wellen - einer nach dem anderen, ohne Pause.',
        speaker: 'Erzaehler',
        speakerEmoji: '\u{1F30C}',
        choices: [
          {
            id: 'night-s2-c1a',
            text: 'Versuchen, die Gedanken zu stoppen: "Hoer auf! Ich will schlafen!"',
            consequence:
              'Je mehr du versuchst, nicht zu denken, desto lauter werden die Gedanken. Es ist wie der Versuch, nicht an einen rosa Elefanten zu denken - sofort ist er da. Gegen Gedanken zu kaempfen macht sie oft staerker.',
            empathyPoints: 0,
            insightPoints: 2,
            couragePoints: 0,
            nextSceneId: 'night-s2-scene-2',
          },
          {
            id: 'night-s2-c1b',
            text: 'Das Handy nehmen und nochmal durchs Internet scrollen, bis du muede genug bist.',
            consequence:
              'Das blaue Licht des Bildschirms strahlt dir ins Gesicht. Du scrollst und scrollst - TikTok, Instagram, YouTube. Eine Stunde spaeter bist du noch wacher als vorher, und jetzt hast du auch noch neue Gedanken im Kopf: Vergleiche, Sorgen, FOMO.',
            empathyPoints: 0,
            insightPoints: 2,
            couragePoints: 0,
            nextSceneId: 'night-s2-scene-2',
          },
          {
            id: 'night-s2-c1c',
            text: 'Die Gedanken einfach beobachten, ohne sie festzuhalten oder wegzuschicken.',
            consequence:
              'Du versuchst, die Gedanken kommen und gehen zu lassen, wie Wolken am Nachthimmel. Es ist nicht leicht - manche Gedanken ziehen dich rein. Aber allein der Versuch, sie zu beobachten statt mit ihnen zu kaempfen, veraendert etwas.',
            empathyPoints: 0,
            insightPoints: 3,
            couragePoints: 1,
            nextSceneId: 'night-s2-scene-3',
          },
        ],
      },
      {
        id: 'night-s2-scene-2',
        text: 'Es ist jetzt fast Mitternacht. Du bist muede UND aufgedreht gleichzeitig. Luna erscheint als sanftes Schimmern an deiner Zimmerdecke. "Ich kenne dieses Karussell", sagt sie leise. "Es dreht sich schneller, je mehr du versuchst, es anzuhalten. Aber es gibt einen anderen Weg: Du musst nicht einsteigen. Du kannst danebenstehen und zuschauen."',
        speaker: 'Luna',
        speakerEmoji: '\u{1F319}',
        choices: [
          {
            id: 'night-s2-c2a',
            text: '"Wie soll das gehen? Die Gedanken SIND in meinem Kopf, ich kann nicht einfach danebenstehen."',
            consequence:
              'Luna laechelt verstaendnisvoll. "Ich weiss, das klingt komisch. Aber probier es aus: Statt zu denken \'Ich bin nervoes wegen morgen\', sag dir: \'Ich bemerke, dass ich gerade einen Gedanken habe, der sagt: Du bist nervoes.\' Du bist nicht der Gedanke. Du bist die Person, die den Gedanken bemerkt."',
            empathyPoints: 0,
            insightPoints: 4,
            couragePoints: 1,
            nextSceneId: 'night-s2-scene-3',
          },
          {
            id: 'night-s2-c2b',
            text: '"Vielleicht hilft es, wenn ich die Gedanken aufschreibe? Dann sind sie aus meinem Kopf auf Papier."',
            consequence:
              'Luna nickt begeistert. "Das ist eine wunderbare Idee! Manche nennen es Sorgen-Ablage. Du schreibst auf, was dich beschaeftigt, und sagst dir: Darauf kann ich morgen schauen. Jetzt ist Schlafenszeit. Dein Notizbuch haelt die Sorgen fuer dich fest."',
            empathyPoints: 0,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: 'night-s2-scene-3',
          },
        ],
      },
      {
        id: 'night-s2-scene-3',
        text: 'Du probierst Lunas Rat aus. Entweder schreibst du die Gedanken auf, oder du versuchst, sie wie Wolken zu beobachten. Es funktioniert nicht sofort - manche Gedanken sind hartnackig. Aber langsam wird das Karussell ein bisschen langsamer. Luna sagt: "Jetzt lass uns deinen Koerper beruhigen. Dein Kopf folgt dem Koerper. Leg eine Hand auf deinen Bauch und atme so, dass sich deine Hand hebt und senkt."',
        speaker: 'Luna',
        speakerEmoji: '\u{1F319}',
        choices: [
          {
            id: 'night-s2-c3a',
            text: 'Die Bauchatmung ausprobieren: langsam einatmen, Bauch hebt sich, langsam ausatmen, Bauch senkt sich.',
            consequence:
              'Einatmen... eins, zwei, drei, vier. Ausatmen... eins, zwei, drei, vier, fuenf, sechs. Dein Koerper wird schwerer, waermer. Die Gedanken sind noch da, aber sie werden leiser, als wuerden sie sich von dir entfernen. Dein Atem gibt dir einen Anker.',
            empathyPoints: 0,
            insightPoints: 2,
            couragePoints: 2,
            nextSceneId: 'night-s2-scene-4',
          },
          {
            id: 'night-s2-c3b',
            text: 'Dir eine Geschichte vorstellen - einen ruhigen Ort, an dem du gerne waerst. Am Meer, im Wald, unter Sternen.',
            consequence:
              'Du stellst dir vor, auf einer warmen Wiese zu liegen und in den Sternenhimmel zu schauen. Jeder Stern ist ein Gedanke - weit weg, schoen anzusehen, aber er kann dir nichts tun. Langsam verschmelzen die Bilder in deinem Kopf, und die Grenze zwischen Wachsein und Traeumen wird weich.',
            empathyPoints: 0,
            insightPoints: 2,
            couragePoints: 1,
            nextSceneId: 'night-s2-scene-4',
          },
        ],
      },
      {
        id: 'night-s2-scene-4',
        text: 'Du wachst am naechsten Morgen auf. Du bist eingeschlafen - du weisst nicht genau wann, aber es ist passiert. Der Wecker klingelt, und du fuehlst dich... okay. Nicht perfekt, aber besser als du erwartet hast. Neben deinem Bett liegt das Notizbuch mit den Sorgen von gestern. Du schaust kurz rein. Im Morgenlicht sehen die Gedanken von gestern irgendwie... kleiner aus.',
        speaker: 'Erzaehler',
        speakerEmoji: '\u{1F30C}',
        choices: [
          {
            id: 'night-s2-c4a',
            text: 'Lesen, was du geschrieben hast, und dir fuer heute einen einzigen Punkt vornehmen, um den du dich kuemmerst.',
            consequence:
              'Du liest: "Angst wegen Sport", "Ob Mia sauer ist", "Mathe-Aufgabe". Du entscheidest: Heute fragst du Mia einfach, ob alles okay ist. Nur diesen einen Punkt. Luna fluestert: "Morgen-Sorgen sind oft kleiner als Nacht-Sorgen. Das Licht veraendert die Perspektive."',
            empathyPoints: 1,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: 'night-s2-scene-5',
          },
          {
            id: 'night-s2-c4b',
            text: 'Das Notizbuch zuklappen und dich daran erinnern, dass du es geschafft hast einzuschlafen - trotz allem.',
            consequence:
              'Das ist eine wichtige Erkenntnis: Dein Gehirn kann sich beruhigen. Es hat es gestern Nacht bewiesen. Nicht sofort, nicht perfekt - aber es ist passiert. Und was einmal geklappt hat, kann wieder klappen. Du hast jetzt Werkzeuge.',
            empathyPoints: 0,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: 'night-s2-scene-5',
          },
        ],
      },
      {
        id: 'night-s2-scene-5',
        text: 'Am Abend, als du dich bettfertig machst, denkst du an gestern. Du legst das Handy bewusst frueh weg, schreibst kurz drei Dinge auf, die heute gut waren, und legst das Notizbuch bereit fuer den Fall, dass das Karussell wieder startet. Luna leuchtet sanft. "Du baust dir gerade ein Abendritual auf. Das ist sehr klug. Dein Gehirn liebt Routinen - sie signalisieren: Jetzt ist Ruhezeit."',
        speaker: 'Luna',
        speakerEmoji: '\u{1F319}',
        choices: [
          {
            id: 'night-s2-c5a',
            text: '"Ich glaube, die Gedanken werden nicht komplett verschwinden. Aber ich lerne, anders mit ihnen umzugehen."',
            consequence:
              'Luna strahlt. "Das ist vielleicht die wichtigste Erkenntnis ueberhaupt. Es geht nicht darum, nie wieder zu gruebeln. Es geht darum, zu merken, wenn es passiert, und sanft aus dem Karussell auszusteigen. Und das kannst du jetzt." Du schlaefst an diesem Abend etwas schneller ein.',
            empathyPoints: 1,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: null,
          },
          {
            id: 'night-s2-c5b',
            text: '"Danke, Luna. Es hilft zu wissen, dass Gedanken nur Gedanken sind - und nicht die Wahrheit."',
            consequence:
              'Luna nickt. "Dein Gehirn erzaehlt dir Geschichten, den ganzen Tag. Manche sind hilfreich, manche nicht. Du darfst waehlen, welchen du zuhörst und welche du weiterziehen laesst. Gute Nacht." Das Mondlicht wird sanfter, und diesmal folgt die Ruhe.',
            empathyPoints: 0,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: null,
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Scenario 3: "Immer online"
  // Teaching: Bewusster Umgang mit sozialen Medien und digitalen Geraeten.
  // FOMO erkennen, Vergleichsfallen verstehen, digitale Pausen einlegen,
  // echte vs. digitale Verbindung unterscheiden.
  // ---------------------------------------------------------------------------
  {
    id: 'night-scenario-3',
    islandId: 'night' as IslandId,
    title: 'Immer online',
    description:
      'Dein Handy vibriert staendig. Jede Nachricht, jedes Like, jede Story zieht dich rein. Ohne Handy fuehlst du dich abgeschnitten. Aber mit Handy fuehlst du dich irgendwie auch nicht besser. Was passiert da eigentlich?',
    scenes: [
      {
        id: 'night-s3-scene-1',
        text: 'Du scrollst durch Instagram. Lea postet Bilder von ihrer Geburtstagsparty - du warst nicht eingeladen. Tim zeigt seine neuen Sneaker. Sophie hat 200 Likes auf ihrem letzten Bild. Du schaust auf dein eigenes Profil: 23 Likes. In deinem Bauch breitet sich ein merkwuerdiges Gefuehl aus - eine Mischung aus Neid, Traurigkeit und dem Drang, sofort etwas zu posten, das noch cooler ist.',
        speaker: 'Erzaehler',
        speakerEmoji: '\u{1F30C}',
        choices: [
          {
            id: 'night-s3-c1a',
            text: 'Das Handy kurz weglegen und in dich hineinfuehlen: Was genau fuehle ich gerade?',
            consequence:
              'Du haltst inne. Das Gefuehl ist... Einsamkeit? Nein, eher das Gefuehl, etwas zu verpassen. Nicht gut genug zu sein. Es tut weh, das zu spueren. Aber es zu benennen ist der erste Schritt. Pixel, der Handygeist, flackert neben dir auf.',
            empathyPoints: 1,
            insightPoints: 3,
            couragePoints: 1,
            nextSceneId: 'night-s3-scene-2',
          },
          {
            id: 'night-s3-c1b',
            text: 'Schnell ein eigenes Bild posten - vielleicht das vom letzten Wochenende, das ganz gut war.',
            consequence:
              'Du postest das Bild und schaust dann alle zwei Minuten nach den Likes. 5... 8... 12... Jedes Mal ein kleiner Kick. Aber er haelt nicht an. Du willst mehr. Und wenn niemand liked, fuehlt es sich an wie eine Ablehnung. Pixel, der Handygeist, erscheint leise. "Erkennst du das Muster?", fragt er.',
            empathyPoints: 0,
            insightPoints: 2,
            couragePoints: 0,
            nextSceneId: 'night-s3-scene-2',
          },
          {
            id: 'night-s3-c1c',
            text: 'Weiterscrollen - vielleicht wird das Gefuehl ja besser, wenn du genug ablenkst.',
            consequence:
              'Du scrollst weiter. Mehr Bilder, mehr Vergleiche, mehr von diesem nagenden Gefuehl. Eine halbe Stunde spaeter fuehlst du dich schlechter als vorher. Pixel, der Handygeist, materialisiert sich neben deinem Bildschirm. "Ich kenne diese Schleife", sagt er leise. "Ich war mal selbst darin gefangen."',
            empathyPoints: 0,
            insightPoints: 1,
            couragePoints: 0,
            nextSceneId: 'night-s3-scene-2',
          },
        ],
      },
      {
        id: 'night-s3-scene-2',
        text: 'Pixel schwebt neben dir - ein kleiner, leuchtender Geist, der wie ein Smartphone-Bildschirm schimmert. "Ich will dir etwas Wichtiges sagen", beginnt er. "Was du auf Social Media siehst, ist nicht das echte Leben. Es ist eine Highlight-Reel - die besten Momente, die besten Winkel, die besten Filter. Niemand postet, wie er allein auf dem Sofa sitzt und sich mies fuehlt. Aber JEDER tut das manchmal."',
        speaker: 'Pixel',
        speakerEmoji: '\u{1F4F1}',
        choices: [
          {
            id: 'night-s3-c2a',
            text: '"Ich weiss das eigentlich. Aber trotzdem fuehlt es sich so an, als haetten alle ein besseres Leben als ich."',
            consequence:
              'Pixel nickt. "Das ist das Fiese daran. Dein Kopf WEISS, dass es nur Bilder sind. Aber dein Gefuehl reagiert trotzdem. Das nennt man die Vergleichsfalle. Und Social Media ist wie eine Vergleichsmaschine - sie zeigt dir staendig, was andere haben und du nicht."',
            empathyPoints: 1,
            insightPoints: 3,
            couragePoints: 1,
            nextSceneId: 'night-s3-scene-3',
          },
          {
            id: 'night-s3-c2b',
            text: '"Aber was soll ich machen? Alle sind da drauf. Wenn ich nicht mitmache, verpasse ich alles."',
            consequence:
              'Pixel laechelt. "Das ist FOMO - Fear of Missing Out. Die Angst, etwas zu verpassen. Aber lass mich dir eine Gegenfrage stellen: Was verpasst du gerade in DEINEM echten Leben, waehrend du auf das Leben anderer schaust?" Das sitzt. Du denkst nach.',
            empathyPoints: 0,
            insightPoints: 4,
            couragePoints: 1,
            nextSceneId: 'night-s3-scene-3',
          },
        ],
      },
      {
        id: 'night-s3-scene-3',
        text: 'Am naechsten Tag in der Schule merkst du etwas: In der Pause sitzen fuenf Leute nebeneinander auf einer Bank - und alle starren auf ihre Handys. Keiner redet miteinander. Du schaust auf dein eigenes Handy in der Hand. Pixel fluestert aus dem Bildschirm: "Interessant, oder? Ihr seid zusammen und gleichzeitig allein. Was waere, wenn du dein Handy mal fuer eine Pause in die Tasche steckst?"',
        speaker: 'Pixel',
        speakerEmoji: '\u{1F4F1}',
        choices: [
          {
            id: 'night-s3-c3a',
            text: 'Das Handy wegstecken und jemanden neben dir ansprechen.',
            consequence:
              'Du steckst das Handy weg und sagst zu der Person neben dir: "Und, wie fandest du den Film in Deutsch?" Es entsteht ein echtes Gespraech. Ihr lacht. Du fuehlst dich danach... verbunden. Richtig verbunden. Nicht durch einen Bildschirm.',
            empathyPoints: 2,
            insightPoints: 2,
            couragePoints: 3,
            nextSceneId: 'night-s3-scene-4',
          },
          {
            id: 'night-s3-c3b',
            text: 'Beobachten, wie es sich anfuehlt, mal bewusst NICHT aufs Handy zu schauen.',
            consequence:
              'Die ersten Minuten sind unruhig. Deine Hand will zum Handy greifen, fast automatisch. Aber dann fangen deine Augen an, andere Sachen zu sehen: die Wolken, das Lachen der Fuenftklaessler, einen Hund auf dem Gehweg. Die Welt hat Farben, die dir hinter dem Bildschirm entgangen sind.',
            empathyPoints: 0,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: 'night-s3-scene-4',
          },
          {
            id: 'night-s3-c3c',
            text: '"Das ist echt schwer. Ohne Handy fuehle ich mich nackt."',
            consequence:
              'Pixel seufzt verstaendnisvoll. "Ich weiss. Dein Gehirn hat sich an die staendige Stimulation gewoehnt. Jede Benachrichtigung gibt dir einen kleinen Dopamin-Kick. Ohne das fuehlt sich alles erstmal leer an. Aber diese Leere ist eigentlich Stille - und Stille ist nicht leer. Sie ist der Raum, in dem du dich selbst hoeren kannst."',
            empathyPoints: 0,
            insightPoints: 3,
            couragePoints: 1,
            nextSceneId: 'night-s3-scene-4',
          },
        ],
      },
      {
        id: 'night-s3-scene-4',
        text: 'Am Abend ueberlegst du, ob du ein Experiment machen willst. Pixel schlaegt vor: "Wie waere es mit einer digitalen Pause? Nicht fuer immer - nur fuer einen Abend. Handy ab 20 Uhr in die Schublade, bis morgen frueh. Schau mal, wie sich das anfuehlt." Luna erscheint am Fenster und ergaenzt: "Ich bin auch da. Die Nacht ist voller Schaetze, die man nur ohne Bildschirm sieht."',
        speaker: 'Pixel',
        speakerEmoji: '\u{1F4F1}',
        choices: [
          {
            id: 'night-s3-c4a',
            text: 'Das Experiment ausprobieren: Handy in die Schublade, Abend ohne Bildschirm.',
            consequence:
              'Die erste Stunde ist seltsam. Du greifst mehrfach zur Schublade, ohne es zu wollen. Aber dann liest du ein Buch, malst etwas, redest mit deiner Schwester. Als du ins Bett gehst, merkst du: Der Abend war laenger und voller, als wenn du gescrollt haettest. Und du schlaefst schneller ein.',
            empathyPoints: 1,
            insightPoints: 2,
            couragePoints: 3,
            nextSceneId: 'night-s3-scene-5',
          },
          {
            id: 'night-s3-c4b',
            text: '"Einen ganzen Abend? Das ist zu viel. Aber ich kann eine Stunde probieren."',
            consequence:
              'Pixel laechelt. "Perfekt. Kleine Schritte zaehlen genauso. Eine Stunde ohne Handy ist schon ein Anfang." Du legst das Handy fuer eine Stunde weg und merkst: Die Welt geht nicht unter. Keine Nachricht ist so dringend, dass sie nicht eine Stunde warten kann.',
            empathyPoints: 0,
            insightPoints: 2,
            couragePoints: 2,
            nextSceneId: 'night-s3-scene-5',
          },
        ],
      },
      {
        id: 'night-s3-scene-5',
        text: 'Ein paar Tage spaeter fuehlt sich dein Verhaeltnis zum Handy anders an. Nicht perfekt - du scrollst immer noch, du vergleichst dich manchmal noch. Aber du merkst es jetzt, wenn es passiert. Pixel und Luna stehen zusammen an deinem Fenster. "Du musst nicht offline leben", sagt Pixel. "Aber du darfst waehlen, wann du online bist und wann du im echten Leben bist." Luna ergaenzt: "Balance. Darum geht es. Nicht um Verzicht, sondern um bewusste Entscheidungen."',
        speaker: 'Luna',
        speakerEmoji: '\u{1F319}',
        choices: [
          {
            id: 'night-s3-c5a',
            text: '"Ich will mir feste Zeiten setzen: Handy-Zeit und Ich-Zeit. Beides hat seinen Platz."',
            consequence:
              'Pixel und Luna nicken gleichzeitig. "Das ist weise", sagt Luna. "Technologie ist ein Werkzeug - kein Herrscher. Du entscheidest, wann du es benutzt, nicht umgekehrt." Du fuehlst dich freier als vorher. Nicht weil du auf etwas verzichtest, sondern weil du die Wahl hast.',
            empathyPoints: 1,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: null,
          },
          {
            id: 'night-s3-c5b',
            text: '"Das Wichtigste, was ich gelernt habe: Likes sagen nichts darueber, wer ich bin."',
            consequence:
              'Pixel leuchtet warm auf. "Genau. Dein Wert als Mensch wird nicht von einem Algorithmus bestimmt. Er wird bestimmt von dem, was du bist, nicht von dem, was du postest." Du legst das Handy auf den Nachttisch, mit dem Bildschirm nach unten. Heute Nacht brauchst du keine Benachrichtigungen. Du hast dich selbst.',
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
  // Scenario 4: "Zu viel auf einmal"
  // Teaching: Eigene Grenzen erkennen, Nein sagen lernen, Selbstfuersorge
  // als Staerke verstehen, nicht als Egoismus. ueberaktivitaet und
  // People-Pleasing erkennen.
  // ---------------------------------------------------------------------------
  {
    id: 'night-scenario-4',
    islandId: 'night' as IslandId,
    title: 'Zu viel auf einmal',
    description:
      'Fussball am Montag, Nachhilfe am Dienstag, Chor am Mittwoch, Kindergeburtstag am Samstag, und deine Oma fragt, ob du Sonntag vorbeikommst. Du willst alle gluecklich machen - aber wann machst du dich gluecklich?',
    scenes: [
      {
        id: 'night-s4-scene-1',
        text: 'Du schaust auf deinen Wochenplan. Jeder Tag ist voll. Eigentlich wolltest du heute einfach mal nichts tun - aber dann hat deine Freundin gefragt, ob du ihr beim Umzug hilfst, und du hast Ja gesagt. Jetzt sitzt du muede auf deinem Bett und fragst dich, warum du nicht einfach Nein sagen konntest. Luna erscheint und setzt sich neben dich. "Du siehst muede aus. Nicht die koerperliche Muedigkeit - eher so eine tiefe Erschoepfung von innen."',
        speaker: 'Luna',
        speakerEmoji: '\u{1F319}',
        choices: [
          {
            id: 'night-s4-c1a',
            text: '"Ja, ich bin staendig muede. Aber ich kann doch nicht einfach absagen - die Leute zaehlen auf mich."',
            consequence:
              'Luna nickt langsam. "Du bist ein Mensch, der fuer andere da sein will. Das ist eine schoene Eigenschaft. Aber lass mich dich etwas fragen: Wer ist fuer DICH da? Und wann bist du mal fuer dich selbst da?" Die Frage sitzt. Du musst schlucken.',
            empathyPoints: 1,
            insightPoints: 2,
            couragePoints: 1,
            nextSceneId: 'night-s4-scene-2',
          },
          {
            id: 'night-s4-c1b',
            text: '"Ich mag es, wenn alle mich moegen und mich brauchen. Wenn ich Nein sage, enttaeusche ich sie."',
            consequence:
              'Luna schaut dich warmherzig an. "Das nennt man People-Pleasing - du willst es allen recht machen. Und es kommt aus einem guten Herz. Aber es hat einen Preis: Du verlierst dich selbst dabei. Deine Beduerfnisse zaehlen genauso wie die der anderen."',
            empathyPoints: 0,
            insightPoints: 3,
            couragePoints: 1,
            nextSceneId: 'night-s4-scene-2',
          },
          {
            id: 'night-s4-c1c',
            text: '"Eigentlich wollte ich heute nur mein Buch lesen und frueh schlafen gehen. Aber das fuehlt sich so egoistisch an."',
            consequence:
              'Luna schuettelt sanft den Kopf. "Ich hoere dir zu, und was ich hoere, ist: Du bezeichnest deine eigenen Beduerfnisse als egoistisch. Aber sich Ruhe zu goennen ist nicht egoistisch. Es ist notwendig. Stell dir vor, du bist eine Batterie. Wenn du dich nie auflaedst, bist du irgendwann leer - fuer alle."',
            empathyPoints: 0,
            insightPoints: 3,
            couragePoints: 1,
            nextSceneId: 'night-s4-scene-2',
          },
        ],
      },
      {
        id: 'night-s4-scene-2',
        text: 'Am naechsten Tag in der Schule passiert es wieder. Dein Kumpel fragt, ob du am Wochenende bei seinem Projekt helfen kannst. Deine Lehrerin fragt, ob du beim Schulfest den Stand organisieren willst. Und deine Mutter schreibt, ob du nach der Schule Einkaufen gehen kannst. Dein Kalender platzt. In deinem Kopf schreit etwas: "STOPP! Ich kann nicht mehr!"',
        speaker: 'Erzaehler',
        speakerEmoji: '\u{1F30C}',
        choices: [
          {
            id: 'night-s4-c2a',
            text: 'Zu allem Ja sagen und hoffen, dass es irgendwie klappt.',
            consequence:
              'Du sagst Ja, Ja, Ja. Am Abend sitzt du mit einem Kloss im Hals da und weisst nicht, wie du das alles schaffen sollst. Dein Koerper meldet sich mit Kopfschmerzen und Bauchgrummeln. Er hat laengst begriffen, was dein Mund noch nicht sagen kann: Es ist zu viel.',
            empathyPoints: 0,
            insightPoints: 2,
            couragePoints: 0,
            nextSceneId: 'night-s4-scene-3',
          },
          {
            id: 'night-s4-c2b',
            text: 'Ehrlich zu deinem Kumpel sagen: "Ich wuerde gern, aber dieses Wochenende schaffe ich es echt nicht. Naechstes Mal?"',
            consequence:
              'Dein Kumpel zuckt die Schultern. "Kein Ding, kein Stress." Das war es? Kein Drama, keine Enttaeuschung? Du merkst: Du hast dir vorgestellt, dass Nein-Sagen viel schlimmer waere, als es tatsaechlich ist. Die meisten Menschen verstehen es, wenn man ehrlich ist.',
            empathyPoints: 1,
            insightPoints: 2,
            couragePoints: 3,
            nextSceneId: 'night-s4-scene-3',
          },
          {
            id: 'night-s4-c2c',
            text: 'Tief durchatmen und ueberlegen: Was MUSS ich tun, was WILL ich tun, und was kann warten?',
            consequence:
              'Du sortierst: Einkaufen fuer Mama - muss sein, dauert 30 Minuten. Schulfest-Stand - klingt cool, aber du sagst der Lehrerin, dass du nur einen kleinen Teil uebernehmen kannst. Kumpel-Projekt - verschieben auf naechste Woche. Ploetzlich wird der Berg handhabbar.',
            empathyPoints: 0,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: 'night-s4-scene-3',
          },
        ],
      },
      {
        id: 'night-s4-scene-3',
        text: 'Luna erscheint in der Mittagspause, als du allein auf einer Bank sitzt. "Ich will dir einen Satz mitgeben", sagt sie. "Nein ist ein ganzer Satz. Du musst dich nicht rechtfertigen, entschuldigen oder erklaeren. Ein freundliches Nein ist genauso gueltig wie ein Ja." Sie macht eine Pause. "Und noch etwas: Die Menschen, die dein Nein nicht respektieren, sind nicht die Menschen, fuer die du dich verbiegen solltest."',
        speaker: 'Luna',
        speakerEmoji: '\u{1F319}',
        choices: [
          {
            id: 'night-s4-c3a',
            text: '"Aber was, wenn die Leute dann sauer auf mich sind?"',
            consequence:
              'Luna antwortet ruhig: "Manche werden vielleicht kurz enttaeuscht sein. Und das darf sein. Die Enttaeuschung eines anderen auszuhalten ist nicht deine Aufgabe - es ist ihre. Und meistens ist die Enttaeuschung viel kleiner und kuerzer, als du befuerchtest. Wahre Freunde verstehen, dass du auch Grenzen hast."',
            empathyPoints: 1,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: 'night-s4-scene-4',
          },
          {
            id: 'night-s4-c3b',
            text: '"Ich glaube, ich habe Angst, nicht gebraucht zu werden. Wenn ich immer helfe, bin ich wichtig."',
            consequence:
              'Luna schaut dich mit warmen Augen an. "Das ist eine sehr ehrliche und mutige Erkenntnis. Aber hoer mir zu: Du bist nicht wichtig, WEIL du hilfst. Du bist wichtig, weil du DU bist. Mit oder ohne Hilfsbereitschaft. Dein Wert haengt nicht davon ab, was du fuer andere tust."',
            empathyPoints: 0,
            insightPoints: 4,
            couragePoints: 2,
            nextSceneId: 'night-s4-scene-4',
          },
        ],
      },
      {
        id: 'night-s4-scene-4',
        text: 'Am Wochenende hast du zum ersten Mal seit Wochen einen halben Tag nur fuer dich. Kein Plan, kein Termin, keine Verpflichtung. Du sitzt auf deinem Bett und... weisst gar nicht, was du mit dir anfangen sollst. Es fuehlt sich seltsam an, nichts tun zu muessen. Fast unruhig. Luna laechelt. "Es ist normal, dass Stille sich am Anfang komisch anfuehlt, wenn man Lärm gewoehnt ist. Gib dir Zeit."',
        speaker: 'Luna',
        speakerEmoji: '\u{1F319}',
        choices: [
          {
            id: 'night-s4-c4a',
            text: 'Einfach liegen bleiben und die Stille aushalten. Mal schauen, was passiert.',
            consequence:
              'Die ersten zehn Minuten sind unruhig. Dann wird es langsam stiller in deinem Kopf. Du hoerst die Voegel draussen. Du spuerst, wie muede du eigentlich bist. Und dann merkst du: Dein Koerper entspannt sich - zum ersten Mal seit Wochen richtig. Das ist es, was du gebraucht hast.',
            empathyPoints: 0,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: 'night-s4-scene-5',
          },
          {
            id: 'night-s4-c4b',
            text: 'Etwas tun, das du schon lange tun wolltest, aber nie Zeit dafuer hattest.',
            consequence:
              'Du holst dein Skizzenbuch raus, das seit Monaten in der Schublade lag. Du faengst an zu zeichnen - einfach so, ohne Ziel. Die Zeit vergeht, ohne dass du es merkst. Als du aufschaust, sind zwei Stunden vergangen und du fuehlst dich... lebendig. Das war keine verschwendete Zeit. Das war Selbstfuersorge.',
            empathyPoints: 0,
            insightPoints: 2,
            couragePoints: 2,
            nextSceneId: 'night-s4-scene-5',
          },
        ],
      },
      {
        id: 'night-s4-scene-5',
        text: 'Am Sonntagabend schaust du auf die vergangene Woche zurueck. Du hast zum ersten Mal Nein gesagt. Du hast dir freie Zeit genommen. Niemand ist boese auf dich. Die Welt dreht sich weiter. Luna erscheint ein letztes Mal. "Was nimmst du mit aus dieser Woche?"',
        speaker: 'Luna',
        speakerEmoji: '\u{1F319}',
        choices: [
          {
            id: 'night-s4-c5a',
            text: '"Dass ich nicht fuer alle da sein kann, wenn ich nicht auch fuer mich da bin. Selbstfuersorge ist kein Egoismus."',
            consequence:
              'Luna strahlt. "Du hast etwas verstanden, wofuer manche Menschen sehr lange brauchen: Man kann nicht aus einem leeren Becher einschenken. Sich selbst zu pflegen bedeutet, dass du auch fuer andere mehr Kraft hast - aber aus freien Stuecken, nicht aus Pflichtgefuehl." Du schlaefst mit einem Gefuehl von Frieden ein.',
            empathyPoints: 2,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: null,
          },
          {
            id: 'night-s4-c5b',
            text: '"Nein sagen wird leichter, je oefter man es uet. Und die meisten Leute sind gar nicht so enttaeuscht, wie ich dachte."',
            consequence:
              'Luna nickt laechelnd. "Ganz genau. Dein Gehirn hat dir Horrorfilme ueber die Reaktionen der anderen gezeigt, die nie passiert sind. Je oefter du deine Grenzen setzt und siehst, dass nichts Schlimmes passiert, desto selbstverstaendlicher wird es." Du fuehlst dich leichter. Als haettest du einen schweren Rucksack abgelegt.',
            empathyPoints: 1,
            insightPoints: 3,
            couragePoints: 3,
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

export const nightWisdomCards: WisdomCard[] = [
  {
    id: 'night-wisdom-1',
    islandId: 'night' as IslandId,
    text: 'Stress ist nicht der Feind \u2013 aber Dauerstress ist es. Lerne den Unterschied zwischen "gefordert" und "ueberfordert".',
    category: 'insight',
    collected: false,
  },
  {
    id: 'night-wisdom-2',
    islandId: 'night' as IslandId,
    text: 'Gedanken sind wie Wolken: Sie kommen und gehen. Du bist der Himmel \u2013 nicht die Wolken.',
    category: 'mindfulness',
    collected: false,
  },
  {
    id: 'night-wisdom-3',
    islandId: 'night' as IslandId,
    text: 'Dein Atem ist immer da. Egal wie chaotisch alles ist \u2013 drei tiefe Atemzuege bringen dich zurueck in den Moment.',
    category: 'strategy',
    collected: false,
  },
  {
    id: 'night-wisdom-4',
    islandId: 'night' as IslandId,
    text: 'Selbstfuersorge ist kein Luxus und kein Egoismus. Sie ist das Fundament, auf dem alles andere steht.',
    category: 'selfcare',
    collected: false,
  },
  {
    id: 'night-wisdom-5',
    islandId: 'night' as IslandId,
    text: 'Du musst nicht alles heute erledigen. Manche Sorgen duerfen bis morgen warten \u2013 und im Morgenlicht sehen sie oft ganz anders aus.',
    category: 'insight',
    collected: false,
  },
  {
    id: 'night-wisdom-6',
    islandId: 'night' as IslandId,
    text: 'Nein ist ein ganzer Satz. Du darfst Grenzen haben, ohne dich dafuer zu entschuldigen.',
    category: 'courage',
    collected: false,
  },
  {
    id: 'night-wisdom-7',
    islandId: 'night' as IslandId,
    text: 'Dein Wert als Mensch wird nicht durch Likes, Noten oder Leistung bestimmt. Du bist genug \u2013 genau so, wie du bist.',
    category: 'selfcare',
    collected: false,
  },
  {
    id: 'night-wisdom-8',
    islandId: 'night' as IslandId,
    text: 'Was du auf Social Media siehst, ist die Highlight-Reel anderer. Niemand postet seine schlechten Tage. Vergleiche dein echtes Leben nicht mit dem Showreel anderer.',
    category: 'insight',
    collected: false,
  },
  {
    id: 'night-wisdom-9',
    islandId: 'night' as IslandId,
    text: 'Grosse Aufgaben werden klein, wenn du sie in Stuecke zerlegst. Du musst den ganzen Berg nicht auf einmal besteigen \u2013 nur den naechsten Schritt.',
    category: 'strategy',
    collected: false,
  },
  {
    id: 'night-wisdom-10',
    islandId: 'night' as IslandId,
    text: 'Pausen sind keine verschwendete Zeit. Sie sind der Moment, in dem dein Gehirn verarbeitet, ordnet und sich erholt.',
    category: 'mindfulness',
    collected: false,
  },
  {
    id: 'night-wisdom-11',
    islandId: 'night' as IslandId,
    text: 'Stille fuehlt sich am Anfang komisch an, wenn man Laerm gewoehnt ist. Aber in der Stille findest du dich selbst.',
    category: 'mindfulness',
    collected: false,
  },
  {
    id: 'night-wisdom-12',
    islandId: 'night' as IslandId,
    text: 'Man kann nicht aus einem leeren Becher einschenken. Kuemmere dich um dich selbst, damit du auch fuer andere da sein kannst.',
    category: 'selfcare',
    collected: false,
  },
];

// =============================================================================
// 3. ACTIVITIES
// =============================================================================

export const nightActivities: NightActivity[] = [
  // ---------------------------------------------------------------------------
  // Activity 1: Sternen-Meditation (Breathing)
  // Guided breathing exercise with starry night visualization
  // ---------------------------------------------------------------------------
  {
    id: 'night-activity-1',
    islandId: 'night' as IslandId,
    type: 'breathing',
    title: 'Sternen-Meditation',
    description:
      'Eine beruhigende Atemuebung, bei der du dir vorstellst, unter einem riesigen Sternenhimmel zu liegen. Mit jedem Atemzug leuchten die Sterne heller \u2013 und dein Kopf wird ruhiger.',
    instructions: [
      'Suche dir einen bequemen Platz. Setz dich hin oder leg dich auf den Ruecken. Wenn du magst, schliesse die Augen.',
      'Stell dir vor, du liegst auf einer warmen, weichen Wiese. Ueber dir erstreckt sich ein riesiger Nachthimmel, voll mit tausenden Sternen. Die Luft ist mild, und alles ist still.',
      'EINATMEN (4 Sekunden): Atme langsam durch die Nase ein. Stell dir vor, wie mit jedem Einatmen die Sterne ueber dir ein bisschen heller leuchten. Zaehle leise: eins... zwei... drei... vier.',
      'HALTEN (4 Sekunden): Halte die Luft sanft an. Die Sterne leuchten in ihrer vollen Pracht. Alles ist ruhig. Zaehle: eins... zwei... drei... vier.',
      'AUSATMEN (6 Sekunden): Atme langsam durch den Mund aus \u2013 laenger als du eingeatmet hast. Die Sterne werden weicher, waermer. Zaehle: eins... zwei... drei... vier... fuenf... sechs. Spuere, wie Anspannung aus deinem Koerper fliesst.',
      'PAUSE (2 Sekunden): Warte zwei Sekunden. Spuere die Stille. Dann beginnt der naechste Zyklus.',
      'Wiederhole diesen Ablauf mindestens fuenf Mal. Mit jedem Durchgang sinkst du tiefer in die Entspannung. Wenn Gedanken auftauchen, stell dir vor, sie sind Sternschnuppen \u2013 sie ziehen vorbei und verschwinden.',
      'Zum Abschluss: Stell dir vor, wie du einen Stern vom Himmel pflueckst und in dein Herz legst. Er leuchtet dort weiter \u2013 ein kleines Licht, das du jederzeit wiederfinden kannst, wenn du Ruhe brauchst.',
      'Oeffne langsam die Augen. Spuere deinen Koerper, den Boden unter dir. Bemerke, wie sich die Ruhe von vorher von der Unruhe von davor unterscheidet.',
    ],
    completed: false,
  },

  // ---------------------------------------------------------------------------
  // Activity 2: Gedanken-Wolken (Reflection / Cognitive Defusion)
  // Based on ACT (Acceptance and Commitment Therapy) defusion techniques
  // ---------------------------------------------------------------------------
  {
    id: 'night-activity-2',
    islandId: 'night' as IslandId,
    type: 'reflection',
    title: 'Gedanken-Wolken',
    description:
      'Lerne, deine Gedanken zu beobachten, ohne dich von ihnen mitreissen zu lassen. Wie Wolken am Himmel kommen und gehen sie \u2013 du musst ihnen nicht hinterherlaufen.',
    instructions: [
      'Nimm dir 10 Minuten Zeit an einem ruhigen Ort. Du brauchst ein Blatt Papier und einen Stift.',
      'Schliesse fuer eine Minute die Augen und beobachte, welche Gedanken in deinem Kopf auftauchen. Versuche NICHT, sie zu steuern oder zu stoppen. Lass sie einfach kommen.',
      'Oeffne die Augen. Male oben auf dein Blatt eine Himmel-Linie. Fuer jeden Gedanken, den du bemerkt hast, male eine Wolke und schreibe den Gedanken hinein. Zum Beispiel: "Ich muss noch lernen" oder "War Mia sauer auf mich?"',
      'Schau dir jede Wolke an und frage dich: Ist das ein FAKT (etwas, das ich beweisen kann) oder ein GEDANKE (eine Vermutung, Sorge oder Bewertung)? Schreibe F oder G neben jede Wolke.',
      'Fuer jeden Gedanken (G): Formuliere ihn um. Statt "Mia ist sauer auf mich" schreibe: "Ich habe gerade den Gedanken, dass Mia sauer auf mich sein koennte." Spuere den Unterschied? Du bist nicht der Gedanke \u2013 du bist die Person, die den Gedanken BEMERKT.',
      'Stell dir vor, wie der Wind die Wolken langsam weiterschiebt. Manche Wolken sind gross und dunkel, manche klein und leicht. Alle ziehen vorbei. Keiner bleibt fuer immer.',
      'Zum Abschluss: Schreibe unter dein Wolkenbild einen Satz, der dir guttut. Zum Beispiel: "Gedanken kommen und gehen. Ich bin der Himmel." Haenge das Blatt auf, wo du es sehen kannst, wenn das Gedankenkarussell das naechste Mal startet.',
    ],
    completed: false,
  },

  // ---------------------------------------------------------------------------
  // Activity 3: Selbstfuersorge-Kalender (Creative)
  // Practical self-care planning activity
  // ---------------------------------------------------------------------------
  {
    id: 'night-activity-3',
    islandId: 'night' as IslandId,
    type: 'creative',
    title: 'Selbstfuersorge-Kalender',
    description:
      'Gestalte deinen eigenen Kalender mit kleinen Selbstfuersorge-Momenten fuer jeden Tag. Denn Selbstfuersorge passiert nicht von allein \u2013 du darfst sie planen wie einen wichtigen Termin.',
    instructions: [
      'Nimm ein Blatt Papier (A4 oder groesser) und teile es in 7 Spalten \u2013 eine fuer jeden Wochentag. Male die Spalten bunt an oder dekoriere sie, wie du magst.',
      'Brainstorme zuerst: Was tut dir gut? Schreibe mindestens 10 Dinge auf, die dir ein gutes Gefuehl geben. Das koennen kleine Sachen sein: ein Lied hoeren, in der Badewanne liegen, mit dem Hund spazieren gehen, zeichnen, ein bestimmtes Essen kochen, jemandem eine nette Nachricht schreiben...',
      'Sortiere deine Liste in drei Kategorien: KOERPER (Bewegung, Essen, Schlaf, Natur), KOPF (Lesen, Lernen, kreativ sein, Raetsel loesen), HERZ (Freunde treffen, Familie, Kuscheln, Ausdruecken was du fuehlst).',
      'Verteile fuer jeden Tag der Woche mindestens eine Selbstfuersorge-Aktion. Achte darauf, dass jede Kategorie (Koerper, Kopf, Herz) mindestens zweimal pro Woche vorkommt.',
      'Plane auch eine "Notfall-Selbstfuersorge" ein: Was tust du, wenn du ploetzlich gestresst, traurig oder ueberfordert bist? Schreibe drei Sofort-Strategien auf die Rueckseite deines Kalenders. Zum Beispiel: 3 tiefe Atemzuege, Lieblingslied anmachen, an die frische Luft gehen.',
      'Haenge deinen Kalender an einen Ort, wo du ihn jeden Tag siehst. Mache ein kleines Haekchen, wenn du eine Selbstfuersorge-Aktion gemacht hast. Es geht nicht darum, perfekt zu sein \u2013 sondern darum, dir selbst regelmaessig etwas Gutes zu tun.',
      'Am Ende der Woche: Schau zurueck. Was hat dir am meisten gutgetan? Was willst du naechste Woche beibehalten? Was willst du veraendern? Dein Kalender darf sich entwickeln, genau wie du.',
    ],
    completed: false,
  },
];

// =============================================================================
// 4. NPCs
// =============================================================================

export const nightNPCs: NightNPC[] = [
  {
    id: 'night-npc-luna',
    name: 'Luna',
    emoji: '\u{1F319}',
    description:
      'Eine sanfte Mondwaecherin, die in silbernem Licht leuchtet. Sie spricht mit ruhiger, warmer Stimme und scheint die Stille genauso zu schaetzen wie Worte.',
    backstory:
      'Luna huetet die Nacht seit Anbeginn der Zeit. Sie kennt die Stille wie niemand sonst \u2013 und sie weiss, dass Stille kein Feind ist, sondern ein Geschenk. Aber das war nicht immer so. Frueher hatte Luna Angst vor der Stille, denn in der Stille kamen die Gedanken \u2013 laut, wild, unkontrollierbar. Sie versuchte, die Nacht mit Licht zu fuellen, immer heller, immer lauter, nur um die Gedanken zu uebertönen. Doch je heller sie leuchtete, desto groesser wurden die Schatten. Erst als Luna lernte, die Stille nicht zu bekaempfen, sondern sie willkommen zu heissen, fand sie ihren Frieden. Sie entdeckte, dass die Nacht nicht bedrohlich ist \u2013 sie ist der Raum, in dem alles zur Ruhe kommen darf. Heute hilft Luna anderen, diesen Raum zu finden. Sie lehrt Achtsamkeit, Geduld und die Kunst, einfach da zu sein, ohne etwas tun zu muessen. "Die Nacht ist nicht leer", sagt sie oft. "Sie ist voller Moeglichkeiten, die man nur sieht, wenn man aufhoert zu rennen."',
  },
  {
    id: 'night-npc-pixel',
    name: 'Pixel',
    emoji: '\u{1F4F1}',
    description:
      'Ein kleiner, flackernder Geist, der wie ein Smartphone-Bildschirm schimmert. Er ist schnell, nervoes und voller Informationen \u2013 aber er lernt gerade, auch mal auf Standby zu gehen.',
    backstory:
      'Pixel wurde aus der digitalen Welt geboren \u2013 aus Millionen von Benachrichtigungen, Likes, Nachrichten und Scroll-Bewegungen. Frueher war er staendig aktiv: vibrieren, leuchten, piepsen, Aufmerksamkeit fordern. Er dachte, sein Wert bestehe darin, immer gebraucht zu werden, immer Neues zu zeigen, immer zu unterhalten. Aber irgendwann merkte Pixel, dass er erschoepft war. Und nicht nur er \u2013 auch die Menschen, die ihn benutzten. Er sah Kinder, die bis spaet in die Nacht auf Bildschirme starrten, die sich schlecht fuehlten nach dem Scrollen, die ihr echtes Leben verpassten, waehrend sie das Leben anderer anschauten. Pixel begann, sich zu fragen: Helfe ich wirklich? Oder mache ich alles schlimmer? Seitdem ist Pixel auf einer eigenen Reise. Er lernt, dass sein Wert nicht davon abhaengt, wie oft jemand auf ihn schaut. Er entdeckt die Schoenheit des Offline-Seins und hilft Kindern und Jugendlichen, einen gesunden Umgang mit der digitalen Welt zu finden. "Ich bin ein Werkzeug", sagt er heute. "Kein Herrscher. Du entscheidest, wann du mich brauchst \u2013 nicht umgekehrt."',
  },
];
