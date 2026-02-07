// =============================================================================
// Inner Worlds - Forest Island ("Wald-Insel")
// Theme: Angst & Mut (Fear & Courage)
// All content in German, written for ages 10-15
// Therapeutically grounded: CBT-based cognitive restructuring, exposure
// hierarchy concepts, growth mindset
// =============================================================================

import type { Scenario, WisdomCard, Activity, IslandId } from '../../../types';

// -----------------------------------------------------------------------------
// Extended Activity type (adds instructions for guided activities)
// -----------------------------------------------------------------------------

interface ForestActivity extends Activity {
  instructions: string[];
}

// -----------------------------------------------------------------------------
// NPC type for island characters
// -----------------------------------------------------------------------------

interface ForestNPC {
  id: string;
  name: string;
  emoji: string;
  description: string;
  backstory: string;
}

// =============================================================================
// 1. SCENARIOS
// =============================================================================

export const forestScenarios: Scenario[] = [
  // ---------------------------------------------------------------------------
  // Scenario 1: "Das Referat"
  // Teaching: Mut bedeutet nicht, keine Angst zu haben - sondern trotz Angst
  // weiterzumachen. Vorbereitung und kleine Schritte helfen.
  // ---------------------------------------------------------------------------
  {
    id: 'forest-scenario-1',
    islandId: 'forest' as IslandId,
    title: 'Das Referat',
    description:
      'Du musst naechste Woche ein Referat vor der ganzen Klasse halten. Allein der Gedanke daran laesst dein Herz schneller schlagen. Wie gehst du damit um?',
    scenes: [
      {
        id: 'forest-s1-scene-1',
        text: 'Deine Lehrerin hat gerade die Referat-Themen verteilt. Du schaust auf dein Blatt: "Die Geheimnisse des Regenwaldes". Eigentlich ein cooles Thema - aber der Gedanke, vor 25 Leuten zu sprechen, schnuert dir den Hals zu. Dein Herz pocht. Neben dir fluestert dein Freund Leo: "Hey, alles gut bei dir? Du siehst ein bisschen blass aus."',
        speaker: 'Erzaehler',
        speakerEmoji: '\u{1F33F}',
        choices: [
          {
            id: 'forest-s1-c1a',
            text: 'Ehrlich sein: "Mir graut es total vor dem Referat. Ich hasse es, vor allen zu reden."',
            consequence:
              'Leo nickt verstaendnisvoll. "Geht mir auch so manchmal. Wollen wir zusammen ueben?" Es fuehlt sich gut an, nicht allein damit zu sein.',
            empathyPoints: 2,
            insightPoints: 1,
            couragePoints: 2,
            nextSceneId: 'forest-s1-scene-2a',
          },
          {
            id: 'forest-s1-c1b',
            text: 'Abwinken: "Alles easy, kein Ding." Und hoffen, dass es irgendwie vorbeigeht.',
            consequence:
              'Leo zuckt die Schultern und wendet sich ab. Du bleibst allein mit deinem mulmigen Gefuehl. Es wird nicht weniger, wenn du so tust, als waere es nicht da.',
            empathyPoints: 0,
            insightPoints: 1,
            couragePoints: 0,
            nextSceneId: 'forest-s1-scene-2b',
          },
          {
            id: 'forest-s1-c1c',
            text: 'Ueberlegen, ob du am Tag des Referats einfach krank spielen koenntest.',
            consequence:
              'Der Gedanke bringt kurz Erleichterung - aber tief in dir weisst du: Das Referat verschwindet dadurch nicht. Es wird nur auf einen anderen Tag verschoben, und die Angst bleibt.',
            empathyPoints: 0,
            insightPoints: 2,
            couragePoints: 0,
            nextSceneId: 'forest-s1-scene-2b',
          },
        ],
      },
      {
        id: 'forest-s1-scene-2a',
        text: 'Du und Leo sitzt am Nachmittag zusammen. "Okay", sagt Leo, "ich hab einen Trick von meiner grossen Schwester. Man uebt erst vor dem Spiegel, dann vor einer Person, dann vor mehreren. Stufe fuer Stufe." Dein Magen grummelt immer noch, aber irgendwie klingt das machbar.',
        speaker: 'Leo',
        speakerEmoji: '\u{1F466}',
        choices: [
          {
            id: 'forest-s1-c2a1',
            text: 'Den Plan ausprobieren: Erst allein ueben, dann vor Leo, dann vielleicht vor deiner Familie.',
            consequence:
              'Die erste Runde allein fuehlt sich komisch an. Aber schon beim zweiten Mal merkst du: Du kennst deinen Text besser, als du dachtest. Vor Leo zu reden ist aufregend, aber er klatscht danach und gibt dir Tipps.',
            empathyPoints: 1,
            insightPoints: 2,
            couragePoints: 3,
            nextSceneId: 'forest-s1-scene-3',
          },
          {
            id: 'forest-s1-c2a2',
            text: 'Karteikarten schreiben und Stichpunkte vorbereiten, damit du einen "Sicherheitsanker" hast.',
            consequence:
              'Du schreibst die wichtigsten Punkte auf Karten. Allein das Aufschreiben hilft - dein Kopf wird klarer, das Thema vertrauter. Die Karten in der Hand zu halten gibt dir das Gefuehl: Ich bin vorbereitet.',
            empathyPoints: 0,
            insightPoints: 2,
            couragePoints: 2,
            nextSceneId: 'forest-s1-scene-3',
          },
        ],
      },
      {
        id: 'forest-s1-scene-2b',
        text: 'Die Tage vergehen, und du hast das Referat vor dir hergeschoben. Jetzt ist es Sonntagabend, morgen ist es soweit. Dein Herz rast, deine Haende sind feucht, und du hast das Gefuehl, kein einziges Wort mehr zu wissen. Timber, der Waldgeist, erscheint neben dir. "Ich kenne dieses Gefuehl", sagt er leise. "Es fuehlt sich an, als wuerde gleich etwas Schlimmes passieren. Aber lass mich dir eine Frage stellen: Was ist das Schlimmste, was wirklich passieren kann?"',
        speaker: 'Timber',
        speakerEmoji: '\u{1F333}',
        choices: [
          {
            id: 'forest-s1-c2b1',
            text: 'Nachdenken: "Naja... dass ich stecken bleibe oder rot werde. Aber davon geht die Welt nicht unter."',
            consequence:
              'Timber laechelt. "Genau. Dein Gehirn malt dir gerade das Worst-Case-Szenario aus. Aber die meisten Worst Cases passieren nie. Und selbst wenn du stockst - das ist menschlich. Jeder versteht das."',
            empathyPoints: 1,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: 'forest-s1-scene-3',
          },
          {
            id: 'forest-s1-c2b2',
            text: '"Dass alle mich auslachen und fuer immer komisch finden."',
            consequence:
              'Timber nickt sanft. "Das fuehlt sich echt so an, oder? Aber ueberleg mal: Erinnerst du dich an das letzte Referat von jemand anderem? Wahrscheinlich kaum. Die meisten Leute sind viel mehr mit sich selbst beschaeftigt, als du denkst."',
            empathyPoints: 1,
            insightPoints: 3,
            couragePoints: 1,
            nextSceneId: 'forest-s1-scene-3',
          },
        ],
      },
      {
        id: 'forest-s1-scene-3',
        text: 'Der Moment ist da. Du stehst vorne. 25 Augenpaare schauen dich an. Dein Mund ist trocken, deine Knie zittern leicht. Du holst tief Luft. Im Kopf hoerst du Timbers Stimme: "Mut ist nicht, keine Angst zu haben. Mut ist, trotz der Angst den ersten Satz zu sagen."',
        speaker: 'Erzaehler',
        speakerEmoji: '\u{1F33F}',
        choices: [
          {
            id: 'forest-s1-c3a',
            text: 'Tief durchatmen und einfach anfangen - auch wenn deine Stimme zittert.',
            consequence:
              'Dein erster Satz kommt raus - etwas leise, etwas wackelig. Aber er kommt raus. Und dann der zweite. Und ploetzlich merkst du: Du redest. Du machst es wirklich. Die Angst ist noch da, aber sie wird leiser.',
            empathyPoints: 0,
            insightPoints: 2,
            couragePoints: 4,
            nextSceneId: 'forest-s1-scene-4',
          },
          {
            id: 'forest-s1-c3b',
            text: 'Ehrlich sagen: "Sorry, ich bin mega aufgeregt" - und dann anfangen.',
            consequence:
              'Ein paar Mitschueler laecheln verstaendnisvoll. Jemand sagt leise: "Das kenn ich." Die Ehrlichkeit nimmt Druck raus. Du fuehlst dich weniger allein damit, und die ersten Worte kommen leichter.',
            empathyPoints: 2,
            insightPoints: 1,
            couragePoints: 3,
            nextSceneId: 'forest-s1-scene-4',
          },
          {
            id: 'forest-s1-c3c',
            text: 'Dich an deine Karteikarten klammern und ablesen, bis du dich sicherer fuehlst.',
            consequence:
              'Die Karten helfen dir, den Faden nicht zu verlieren. Nach ein paar Saetzen schaust du hoch - und merkst, dass die Klasse zuhort. Langsam wirst du freier und schaust oefter von den Karten auf.',
            empathyPoints: 0,
            insightPoints: 1,
            couragePoints: 2,
            nextSceneId: 'forest-s1-scene-4',
          },
        ],
      },
      {
        id: 'forest-s1-scene-4',
        text: 'Das Referat ist vorbei. Du gehst zurueck zu deinem Platz. Dein Herz schlaegt immer noch schnell, aber diesmal ist es ein anderes Gefuehl - fast wie nach einer Achterbahnfahrt. Du hast es gemacht. Es war nicht perfekt, aber du hast es durchgezogen. Faye, die neben dir sitzt, fluestert: "Das war richtig gut. Ich hab mich vor meinem naechsten Referat total gefuerchtet, aber irgendwie machst du mir gerade Mut."',
        speaker: 'Faye',
        speakerEmoji: '\u{1F9D2}',
        choices: [
          {
            id: 'forest-s1-c4a',
            text: '"Danke, Faye! Ehrlich gesagt war ich total nervoes. Aber es hat geholfen, sich vorzubereiten und einfach anzufangen."',
            consequence:
              'Faye laechelt. Du merkst: Deine Erfahrung kann anderen helfen. Und das naechste Referat wird ein kleines Stueckchen weniger beaengstigend sein - weil du jetzt weisst, dass du es schaffen kannst.',
            empathyPoints: 3,
            insightPoints: 2,
            couragePoints: 2,
            nextSceneId: null,
          },
          {
            id: 'forest-s1-c4b',
            text: '"Ich kann dir helfen zu ueben, wenn du willst. Zusammen ist es weniger gruselig."',
            consequence:
              'Fayes Augen leuchten auf. "Wirklich? Das waere mega!" Manchmal ist der groesste Mut nicht nur, die eigene Angst zu ueberwinden - sondern auch anderen zu helfen, ihre zu bewaeltigen.',
            empathyPoints: 4,
            insightPoints: 1,
            couragePoints: 2,
            nextSceneId: null,
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Scenario 2: "Der erste Tag"
  // Teaching: Neue Anfaenge sind beaengstigend UND aufregend zugleich.
  // Offenheit und kleine Schritte helfen.
  // ---------------------------------------------------------------------------
  {
    id: 'forest-scenario-2',
    islandId: 'forest' as IslandId,
    title: 'Der erste Tag',
    description:
      'Du bist neu an einer Schule. Alles ist fremd - die Gaenge, die Gesichter, die Regeln. Dein Bauch kribbelt vor Nervositaet. Wie findest du deinen Weg?',
    scenes: [
      {
        id: 'forest-s2-scene-1',
        text: 'Du stehst vor dem Schultor. Es ist riesig. Ueberall stroemen Schueler vorbei, die sich kennen, sich zurufen, zusammen lachen. Du kennst hier niemanden. Dein Rucksack fuehlt sich ploetzlich doppelt so schwer an. Im Bauch hast du dieses Flattern - wie hundert kleine Schmetterlinge, die gleichzeitig losfliegen.',
        speaker: 'Erzaehler',
        speakerEmoji: '\u{1F33F}',
        choices: [
          {
            id: 'forest-s2-c1a',
            text: 'Tief durchatmen und dich daran erinnern: Jeder hier hatte mal einen ersten Tag.',
            consequence:
              'Du holst Luft, spuerst den Boden unter deinen Fuessen. Stimmt - jeder einzelne Mensch hier hat irgendwann zum ersten Mal durch dieses Tor gehen muessen. Du bist nicht die einzige Person auf der Welt, die sich gerade so fuehlt.',
            empathyPoints: 1,
            insightPoints: 2,
            couragePoints: 2,
            nextSceneId: 'forest-s2-scene-2',
          },
          {
            id: 'forest-s2-c1b',
            text: 'Am liebsten wuerdest du umdrehen und nach Hause gehen.',
            consequence:
              'Der Impuls ist stark. Weglaufen wuerde sich jetzt gerade so gut anfuehlen. Aber du weisst auch: Morgen muesste man wieder hierher, und dann waere es noch schwerer. Manchmal ist der schwerste Schritt der erste.',
            empathyPoints: 0,
            insightPoints: 2,
            couragePoints: 1,
            nextSceneId: 'forest-s2-scene-2',
          },
          {
            id: 'forest-s2-c1c',
            text: 'Dir ein Mini-Ziel setzen: "Ich finde erstmal mein Klassenzimmer. Mehr muss ich jetzt noch nicht schaffen."',
            consequence:
              'Gute Idee! Statt an den ganzen grossen, beaengstigenden Tag zu denken, konzentrierst du dich auf einen einzigen kleinen Schritt. Das macht es handhabbar. Ein Fuss vor den anderen.',
            empathyPoints: 0,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: 'forest-s2-scene-2',
          },
        ],
      },
      {
        id: 'forest-s2-scene-2',
        text: 'Du findest dein Klassenzimmer. Die meisten Plaetze sind schon besetzt. Ueberall sitzen Grueppchen zusammen, die sich offensichtlich kennen. Ein Platz in der Mitte ist frei, und einer ganz hinten am Fenster. Die Lehrerin hat dich noch nicht bemerkt.',
        speaker: 'Erzaehler',
        speakerEmoji: '\u{1F33F}',
        choices: [
          {
            id: 'forest-s2-c2a',
            text: 'Den Platz in der Mitte nehmen - naeher an den anderen, auch wenn es sich unsicher anfuehlt.',
            consequence:
              'Du setzt dich hin. Dein Herz klopft. Das Maedchen neben dir schaut kurz rueber und laechelt. "Hi, bist du neu?" Es ist nur ein kleiner Moment, aber er macht einen Unterschied.',
            empathyPoints: 1,
            insightPoints: 1,
            couragePoints: 3,
            nextSceneId: 'forest-s2-scene-3',
          },
          {
            id: 'forest-s2-c2b',
            text: 'Den Platz hinten am Fenster - erstmal beobachten und die Lage checken.',
            consequence:
              'Von hier aus kannst du alles ueberblicken, ohne selbst im Mittelpunkt zu stehen. Das fuehlt sich sicherer an. Du beobachtest die Klasse und versuchst herauszufinden, wie die Dynamik hier so ist.',
            empathyPoints: 1,
            insightPoints: 2,
            couragePoints: 1,
            nextSceneId: 'forest-s2-scene-3',
          },
        ],
      },
      {
        id: 'forest-s2-scene-3',
        text: 'Die Lehrerin stellt dich kurz vor. "Wir haben jemand Neues in der Klasse!" Alle Augen sind auf dich gerichtet. Manche laecheln, manche schauen einfach nur. Ein Junge in der ersten Reihe ruft: "Wo kommst du denn her?" Die Lehrerin sagt: "Magst du kurz etwas ueber dich erzaehlen?"',
        speaker: 'Lehrerin',
        speakerEmoji: '\u{1F469}\u{200D}\u{1F3EB}',
        choices: [
          {
            id: 'forest-s2-c3a',
            text: 'Ein paar Saetze sagen: Name, woher du kommst, und ein Hobby erwaehnen.',
            consequence:
              'Du sagst deinen Namen und erwaehst, dass du gerne zeichnest. Sofort ruft jemand: "Ich auch! Zeigst du mir mal was?" Es ist erstaunlich, wie ein kleines Detail Bruecken bauen kann.',
            empathyPoints: 1,
            insightPoints: 1,
            couragePoints: 3,
            nextSceneId: 'forest-s2-scene-4',
          },
          {
            id: 'forest-s2-c3b',
            text: 'Nur kurz den Namen sagen und laecheln - mehr fuehlt sich gerade nicht machbar an.',
            consequence:
              'Und das ist voellig okay. Du musst nicht sofort dein ganzes Leben erzaehlen. Die Lehrerin nickt freundlich und macht weiter. Du hast dich gezeigt, so viel wie sich richtig anfuehlte. Das ist auch Mut.',
            empathyPoints: 0,
            insightPoints: 2,
            couragePoints: 2,
            nextSceneId: 'forest-s2-scene-4',
          },
        ],
      },
      {
        id: 'forest-s2-scene-4',
        text: 'Pause. Die Klasse stroemt raus. Du stehst mit deiner Brotdose da und weisst nicht wohin. Ein paar Meter weiter steht eine Gruppe und lacht ueber etwas auf einem Handy. An der Wand lehnt ein Maedchen allein und liest ein Buch. Timber fluestert dir zu: "Neue Situationen fuehlen sich oft bedrohlich an. Aber schau genauer hin - manchmal verstecken sich in der Unsicherheit auch Chancen."',
        speaker: 'Timber',
        speakerEmoji: '\u{1F333}',
        choices: [
          {
            id: 'forest-s2-c4a',
            text: 'Zu der lachenden Gruppe gehen und fragen, was so lustig ist.',
            consequence:
              'Es kostet Ueberwindung, aber du gehst hin. "Hey, was guckt ihr da?" Jemand zeigt dir ein lustiges Video. Du lachst mit. Es ist noch nicht Freundschaft - aber es ist ein Anfang. Und Anfaenge sind wertvoll.',
            empathyPoints: 1,
            insightPoints: 1,
            couragePoints: 3,
            nextSceneId: 'forest-s2-scene-5',
          },
          {
            id: 'forest-s2-c4b',
            text: 'Zu dem Maedchen mit dem Buch gehen und fragen, was sie liest.',
            consequence:
              'Sie schaut ueberrascht auf. "Oh! Das ist Percy Jackson. Kennst du das?" Egal ob ja oder nein - ihr habt ein Gespraech. Manchmal findet man die besten Verbindungen an den ruhigsten Orten.',
            empathyPoints: 2,
            insightPoints: 1,
            couragePoints: 2,
            nextSceneId: 'forest-s2-scene-5',
          },
          {
            id: 'forest-s2-c4c',
            text: 'Erstmal allein essen und die Pause zum Ankommen nutzen - morgen ist auch noch ein Tag.',
            consequence:
              'Du setzt dich auf eine Bank und isst in Ruhe. Du beobachtest den Schulhof, merkst dir Gesichter, bekommst ein Gefuehl fuer den Ort. Manchmal braucht man Zeit, bevor man bereit ist. Das ist kein Versagen - das ist Selbstfuersorge.',
            empathyPoints: 0,
            insightPoints: 3,
            couragePoints: 1,
            nextSceneId: 'forest-s2-scene-5',
          },
        ],
      },
      {
        id: 'forest-s2-scene-5',
        text: 'Der erste Tag ist vorbei. Du sitzt im Bus nach Hause. Es war anstrengend - emotional mehr als koerperlich. Aber du hast es geschafft. Du hast diesen Tag ueberlebt, der sich heute Morgen noch so riesig angefuehlt hat. Timber setzt sich neben dich. "Weisst du, was ich an neuen Anfaengen gelernt habe? Sie sind immer beides gleichzeitig: beaengstigend und aufregend. Das eine schliesst das andere nicht aus."',
        speaker: 'Timber',
        speakerEmoji: '\u{1F333}',
        choices: [
          {
            id: 'forest-s2-c5a',
            text: '"Stimmt. Es war schlimm UND es war okay. Beides gleichzeitig."',
            consequence:
              'Timber nickt. "Genau das. Und morgen wird es schon ein kleines bisschen vertrauter sein. Und uebermorgen noch ein Stueckchen mehr." Du lehnst dich zurueck und laechelst. Der erste Tag ist geschafft. Alles, was jetzt kommt, ist kein erster Tag mehr.',
            empathyPoints: 1,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: null,
          },
          {
            id: 'forest-s2-c5b',
            text: '"Ich bin stolz auf mich, auch wenn es sich nicht perfekt angefuehlt hat."',
            consequence:
              'Timbers Augen leuchten warm. "Stolz sein darf man nicht nur, wenn alles perfekt laeuft. Gerade wenn es schwer war und man es trotzdem gemacht hat - dann ist es am meisten verdient." Du laechelst. Morgen kommst du wieder.',
            empathyPoints: 0,
            insightPoints: 2,
            couragePoints: 3,
            nextSceneId: null,
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Scenario 3: "Gruppendruck"
  // Teaching: Echte Freunde respektieren deine Grenzen. Nein sagen ist Mut.
  // ---------------------------------------------------------------------------
  {
    id: 'forest-scenario-3',
    islandId: 'forest' as IslandId,
    title: 'Gruppendruck',
    description:
      'Deine Freundesgruppe will etwas tun, bei dem du ein schlechtes Gefuehl hast. Alle machen mit - nur du zoegest. Wie gehst du mit dem Druck um?',
    scenes: [
      {
        id: 'forest-s3-scene-1',
        text: 'Freitagnachmittag. Du haengst mit deiner Gruppe ab: Mika, Jordan und Sam. Ihr seid auf dem Spielplatz hinter der Schule. Mika grinst ploetzlich. "Ich hab eine Idee. Mein grosser Bruder hat erfahren, dass die Turnhalle hinten eine offene Tuer hat. Wir koennten uns reinschleichen und die Kletterwand benutzen - ohne Aufsicht. Das wird mega!"',
        speaker: 'Mika',
        speakerEmoji: '\u{1F9D1}',
        choices: [
          {
            id: 'forest-s3-c1a',
            text: 'Sofort sagen: "Ich weiss nicht... das ist verboten und ohne Sicherung echt gefaehrlich."',
            consequence:
              'Mika rollt mit den Augen. "Ach komm, stell dich nicht so an." Jordan und Sam schauen zwischen euch hin und her. Es ist unangenehm, aber du hast gesagt, was du denkst.',
            empathyPoints: 1,
            insightPoints: 2,
            couragePoints: 3,
            nextSceneId: 'forest-s3-scene-2',
          },
          {
            id: 'forest-s3-c1b',
            text: 'Erstmal abwarten und schauen, wie die anderen reagieren.',
            consequence:
              'Jordan sagt: "Klingt cool!" Sam nickt unsicher. Alle schauen dich an. Der Druck waechst. Manchmal macht Abwarten es schwieriger, weil dann die ganze Gruppe schon in Fahrt ist.',
            empathyPoints: 0,
            insightPoints: 1,
            couragePoints: 0,
            nextSceneId: 'forest-s3-scene-2',
          },
          {
            id: 'forest-s3-c1c',
            text: 'Dir wird mulmig, aber du sagst nichts, weil du nicht als Spielverderber gelten willst.',
            consequence:
              'Du nickst vage und gehst mit. In deinem Bauch rumort es. Du weisst, dass etwas nicht stimmt, aber die Angst, ausgeschlossen zu werden, ist gerade groesser als die Angst vor dem, was passieren koennte.',
            empathyPoints: 0,
            insightPoints: 2,
            couragePoints: 0,
            nextSceneId: 'forest-s3-scene-3',
          },
        ],
      },
      {
        id: 'forest-s3-scene-2',
        text: 'Mika schaut dich an. "Was denn? Wir machen doch nix Schlimmes. Es ist nur Klettern." Jordan fuegt hinzu: "Wenn du nicht mitkommst, bleibst du halt allein hier." Sam sagt nichts, schaut aber nervoes. Timber erscheint im Schatten einer Eiche und fluestert: "Hoer auf dein Bauchgefuehl. Echte Freunde drücken dich nicht in Situationen, die sich falsch anfuehlen."',
        speaker: 'Timber',
        speakerEmoji: '\u{1F333}',
        choices: [
          {
            id: 'forest-s3-c2a',
            text: '"Nein, ich mach da nicht mit. Ohne Aufsicht an der Kletterwand ist echt keine gute Idee. Wenn was passiert, hilft uns niemand."',
            consequence:
              'Deine Stimme ist fest, auch wenn dein Herz rast. Mika schnaubt. Aber Sam sagt leise: "Eigentlich... hat er/sie recht. Ich find das auch nicht so cool." Dein Mut gibt anderen die Erlaubnis, auch ehrlich zu sein.',
            empathyPoints: 2,
            insightPoints: 2,
            couragePoints: 4,
            nextSceneId: 'forest-s3-scene-4',
          },
          {
            id: 'forest-s3-c2b',
            text: 'Einen Kompromiss vorschlagen: "Klettern ist cool, aber lasst uns das am Wochenende in der Kletterhalle machen, wo es Sicherung gibt."',
            consequence:
              'Jordan ueberlegt. "Hm, das waere schon sicherer..." Sogar Mika sieht ein, dass das eigentlich smarter ist. Manchmal ist die mutigste Loesung die, die keiner erwartet hat.',
            empathyPoints: 2,
            insightPoints: 3,
            couragePoints: 3,
            nextSceneId: 'forest-s3-scene-4',
          },
          {
            id: 'forest-s3-c2c',
            text: 'Doch mitmachen, weil du nicht als Feigling dastehen willst.',
            consequence:
              'Du gehst mit, aber das ungute Gefuehl bleibt. In deinem Kopf fluestert eine Stimme: "Du wusstest, dass das keine gute Idee ist." Manchmal verwechseln wir Mut mit dem Nachgeben unter Druck. Aber das sind zwei sehr verschiedene Dinge.',
            empathyPoints: 0,
            insightPoints: 2,
            couragePoints: 0,
            nextSceneId: 'forest-s3-scene-3',
          },
        ],
      },
      {
        id: 'forest-s3-scene-3',
        text: 'Ihr seid in der Turnhalle. Es ist duester und still. Mika klettert los, ohne Matte, ohne Sicherung. Jordan folgt. Sam steht neben dir, blass. "Mir ist das eigentlich auch nicht geheuer", fluestert Sam. Ploetzlich rutscht Jordan ab und landet hart auf dem Boden. "Au! Mein Fuss!" Jordan verzieht das Gesicht vor Schmerz.',
        speaker: 'Erzaehler',
        speakerEmoji: '\u{1F33F}',
        choices: [
          {
            id: 'forest-s3-c3a',
            text: 'Sofort zu Jordan gehen und helfen. Dann Hilfe holen.',
            consequence:
              'Du rennst zu Jordan. Der Fuss sieht nicht gut aus. Sam ruft ueber das Handy einen Erwachsenen an. Als die Hilfe kommt, bist du froh, dass du das Richtige getan hast - auch wenn die ganze Situation haette vermieden werden koennen.',
            empathyPoints: 3,
            insightPoints: 2,
            couragePoints: 2,
            nextSceneId: 'forest-s3-scene-5',
          },
          {
            id: 'forest-s3-c3b',
            text: 'Zu Sam sagen: "Wir muessen das naechste Mal frueher sagen, wenn etwas falsch ist. Beide."',
            consequence:
              'Sam nickt. "Ja... ich hab mich nicht getraut." Ihr helft Jordan und holt einen Erwachsenen. Auf dem Rueckweg wisst ihr beide: Nein sagen ist keine Schwaeche. Es kann verhindern, dass Leute verletzt werden.',
            empathyPoints: 2,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: 'forest-s3-scene-5',
          },
        ],
      },
      {
        id: 'forest-s3-scene-4',
        text: 'Ihr habt die Turnhallen-Aktion abgeblasen. Stattdessen haengt ihr auf dem Spielplatz ab und Mika ist zuerst grummelig, aber dann erzaehlt Jordan einen Witz und alles ist wieder gut. Sam kommt zu dir und sagt leise: "Danke, dass du was gesagt hast. Ich wollte auch nicht, aber ich hab mich nicht getraut."',
        speaker: 'Sam',
        speakerEmoji: '\u{1F9D2}',
        choices: [
          {
            id: 'forest-s3-c4a',
            text: '"Nein zu sagen ist echt schwer. Aber wenn man ein schlechtes Gefuehl hat, ist es meistens richtig, darauf zu hoeren."',
            consequence:
              'Sam laechelt. "Ja, stimmt. Naechstes Mal sag ich auch was." Timber erscheint kurz und zwinkert dir zu. Du hast heute etwas Wichtiges gelernt: Nein sagen erfordert oft mehr Mut als Ja sagen.',
            empathyPoints: 2,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: 'forest-s3-scene-5',
          },
          {
            id: 'forest-s3-c4b',
            text: '"Kein Ding. Ich war auch nervoes. Aber lieber nervoes als verletzt."',
            consequence:
              'Sam nickt nachdenklich. Jordan kommt dazu: "Hey, die Kletterhallen-Idee war eigentlich echt gut. Samstag?" Manchmal loesen sich Konflikte von selbst, wenn man ruhig und ehrlich bleibt.',
            empathyPoints: 1,
            insightPoints: 2,
            couragePoints: 2,
            nextSceneId: 'forest-s3-scene-5',
          },
        ],
      },
      {
        id: 'forest-s3-scene-5',
        text: 'Spaeter am Abend denkst du ueber den Tag nach. Timber sitzt auf deiner Fensterbank. "Weisst du, was ich an dir bewundere?", sagt er. "Du hast heute erfahren, dass der groesste Druck manchmal nicht von aussen kommt, sondern von der Angst, nicht dazuzugehoeren. Und du hast trotzdem auf dich gehoert."',
        speaker: 'Timber',
        speakerEmoji: '\u{1F333}',
        choices: [
          {
            id: 'forest-s3-c5a',
            text: '"Es war echt schwer. Aber ich hab gemerkt: Echte Freunde halten es aus, wenn man Nein sagt."',
            consequence:
              'Timber nickt. "Genau. Freundschaft, die nur funktioniert, wenn du immer Ja sagst, ist keine echte Freundschaft. Du darfst Grenzen haben. Das macht dich nicht schwierig - das macht dich stark."',
            empathyPoints: 2,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: null,
          },
          {
            id: 'forest-s3-c5b',
            text: '"Ich glaube, Mut ist nicht nur gegen Monster kaempfen. Manchmal ist Mut, einfach Nein zu sagen."',
            consequence:
              'Timber laechelt. "Das ist eine der wichtigsten Lektionen im ganzen Wald. Die leisen Formen von Mut sind oft die kraeftigsten." Du schlaefst an diesem Abend mit einem guten Gefuehl ein.',
            empathyPoints: 1,
            insightPoints: 2,
            couragePoints: 3,
            nextSceneId: null,
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Scenario 4: "Allein zu Hause"
  // Teaching: Katastrophendenken vs. Realitaetscheck. Gedanken sind nicht
  // Tatsachen. Koerper-Signale verstehen und regulieren.
  // ---------------------------------------------------------------------------
  {
    id: 'forest-scenario-4',
    islandId: 'forest' as IslandId,
    title: 'Allein zu Hause',
    description:
      'Deine Eltern sind fuer den Abend weg. Es wird dunkel, und ploetzlich hoerst du Geraeusche. Dein Kopf beginnt, Geschichten zu spinnen. Was ist real - und was ist nur dein Kopfkino?',
    scenes: [
      {
        id: 'forest-s4-scene-1',
        text: 'Deine Eltern gehen aus. "Wir sind um elf zurueck. Handy ist an, Essen steht im Kuehlschrank, Nachbarin Frau Mueller weiss Bescheid." Du nickst lassig. Kein Problem, du bist ja kein kleines Kind mehr. Die Tuer faellt zu. Stille. ... Komisch, wie laut Stille sein kann.',
        speaker: 'Erzaehler',
        speakerEmoji: '\u{1F33F}',
        choices: [
          {
            id: 'forest-s4-c1a',
            text: 'Erstmal den Fernseher anmachen. Hintergrundgeraeusche helfen.',
            consequence:
              'Das Gemurmel des Fernsehers fuellt die Stille. Es fuehlt sich weniger einsam an. Du machst es dir auf dem Sofa gemuetlich. Eine gute Strategie - du hast dir selbst eine angenehmere Umgebung geschaffen.',
            empathyPoints: 0,
            insightPoints: 2,
            couragePoints: 1,
            nextSceneId: 'forest-s4-scene-2',
          },
          {
            id: 'forest-s4-c1b',
            text: 'Dein Abendprogramm planen: Essen machen, Film schauen, frueher Bett.',
            consequence:
              'Einen Plan zu haben hilft. Du weisst, was als Naechstes kommt, und das gibt Struktur. Du machst dir Nudeln und suchst einen Film raus. So weit, so gut.',
            empathyPoints: 0,
            insightPoints: 2,
            couragePoints: 1,
            nextSceneId: 'forest-s4-scene-2',
          },
          {
            id: 'forest-s4-c1c',
            text: 'Durch die Wohnung gehen und alle Tueren und Fenster kontrollieren.',
            consequence:
              'Alles ist zu und sicher. Das gibt dir ein gutes Gefuehl - fuer den Moment. Aber eine Stimme in deinem Kopf fluestert: "Und wenn du was uebersehen hast?" Kontrolle hilft kurz, aber manchmal fuettert sie auch die Angst.',
            empathyPoints: 0,
            insightPoints: 2,
            couragePoints: 1,
            nextSceneId: 'forest-s4-scene-2',
          },
        ],
      },
      {
        id: 'forest-s4-scene-2',
        text: 'Es ist 21 Uhr. Draussen ist es jetzt richtig dunkel. Du liegst auf dem Sofa und schaust deinen Film. Und dann - KNACK. Ein Geraeusch aus dem Flur. Dein Koerper reagiert sofort: Herz schneller, Atem flacher, Muskeln angespannt. Dein Gehirn faehrt hoch wie ein Alarmsystem.',
        speaker: 'Erzaehler',
        speakerEmoji: '\u{1F33F}',
        choices: [
          {
            id: 'forest-s4-c2a',
            text: 'Innehalten und ueberlegen: Was koennte dieses Geraeusch realistisch sein?',
            consequence:
              'Du denkst nach. Die Heizung, die klickt. Das Holz im alten Schrank, das arbeitet. Die Katze des Nachbarn auf dem Balkon. Es gibt so viele harmlose Erklaerungen fuer Geraeusche in der Nacht. Dein Kopf wollte sofort zum Schlimmsten springen - aber du hast ihn gebremst.',
            empathyPoints: 0,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: 'forest-s4-scene-3',
          },
          {
            id: 'forest-s4-c2b',
            text: 'Die Decke ueber den Kopf ziehen und so tun, als haettest du nichts gehoert.',
            consequence:
              'Unter der Decke ist es warm und sicher. Aber dein Kopf arbeitet auf Hochtouren. "Was, wenn es ein Einbrecher ist? Was, wenn jemand im Haus ist?" Die Gedanken drehen sich im Kreis und werden dabei immer wilder.',
            empathyPoints: 0,
            insightPoints: 1,
            couragePoints: 0,
            nextSceneId: 'forest-s4-scene-3',
          },
          {
            id: 'forest-s4-c2c',
            text: 'Sofort Eltern anrufen.',
            consequence:
              'Mama geht ran. "Alles gut, Schatz?" Ihre Stimme beruhigt dich kurz. "Das ist wahrscheinlich die Heizung, die macht das immer." Sie hat recht - aber du merkst: Du wirst dich nie ganz sicher fuehlen, wenn du jedes Mal anrufst. Es waere gut zu lernen, selbst mit den Geraueschen umzugehen.',
            empathyPoints: 0,
            insightPoints: 2,
            couragePoints: 1,
            nextSceneId: 'forest-s4-scene-3',
          },
        ],
      },
      {
        id: 'forest-s4-scene-3',
        text: 'Timber erscheint neben dir, sanft leuchtend im dunklen Zimmer. "Ich will dir etwas zeigen", sagt er. "Dein Gehirn hat gerade etwas gemacht, das heisst Katastrophendenken. Es nimmt ein kleines Geraeusch und baut daraus die gruseligste Geschichte, die es finden kann. Das ist nicht deine Schuld - dein Gehirn will dich beschuetzen. Aber manchmal uebertreibt es dabei ein bisschen."',
        speaker: 'Timber',
        speakerEmoji: '\u{1F333}',
        choices: [
          {
            id: 'forest-s4-c3a',
            text: '"Wie kann ich meinem Gehirn sagen, dass es uebertreibt?"',
            consequence:
              'Timber laechelt. "Gute Frage! Stell dir vor, dein Angst-Gedanke sitzt auf einem Zeugenstuhl vor Gericht. Frag ihn: Was sind die Beweise, dass etwas Gefaehrliches passiert? Und was sind die Beweise dagegen? Meistens gewinnt die Realitaet."',
            empathyPoints: 0,
            insightPoints: 4,
            couragePoints: 2,
            nextSceneId: 'forest-s4-scene-4',
          },
          {
            id: 'forest-s4-c3b',
            text: '"Also ist es normal, dass ich solche Grusel-Gedanken habe?"',
            consequence:
              'Timber nickt. "Total normal! Fast jeder Mensch hat manchmal solche Gedanken, besonders wenn es dunkel und still ist. Der Trick ist zu wissen: Ein Gedanke ist nur ein Gedanke. Er ist keine Tatsache. Du kannst ihn beobachten, wie eine Wolke, die vorbeizieht."',
            empathyPoints: 0,
            insightPoints: 4,
            couragePoints: 1,
            nextSceneId: 'forest-s4-scene-4',
          },
        ],
      },
      {
        id: 'forest-s4-scene-4',
        text: 'KLAPPER! Wieder ein Geraeusch - diesmal lauter, aus der Kueche. Dein Koerper springt wieder in Alarmbereitschaft. Aber diesmal bist du vorbereitet. Timber schaut dich an. "Jetzt kannst du es ausprobieren. Was sagt dein Angst-Gedanke? Und was sagt die Realitaet?"',
        speaker: 'Timber',
        speakerEmoji: '\u{1F333}',
        choices: [
          {
            id: 'forest-s4-c4a',
            text: 'Realitaetscheck: "Angst-Gedanke: Ein Einbrecher! Realitaet: Wahrscheinlich hat der Wind das Kuechenfenster bewegt. Alle Tueren sind zu."',
            consequence:
              'Du gehst zur Kueche. Das Fenster war auf Kipp, der Wind hat die Jalousie bewegt. Du schliesst das Fenster. Fertig. Kein Monster, kein Einbrecher. Dein Gehirn hat Alarm geschlagen - und du hast sachlich nachgeschaut, statt in Panik zu verfallen.',
            empathyPoints: 0,
            insightPoints: 3,
            couragePoints: 4,
            nextSceneId: 'forest-s4-scene-5',
          },
          {
            id: 'forest-s4-c4b',
            text: 'Erst dreimal tief durchatmen, dann mit dem Handy als Taschenlampe nachschauen.',
            consequence:
              'Einatmen... ausatmen... einatmen... ausatmen. Dein Herzschlag wird langsamer. Dann gehst du mit dem Handylicht zur Kueche. Es war die Jalousie. Du laechelst - es fuehlt sich gut an, die Angst ueberwunden zu haben, Schritt fuer Schritt.',
            empathyPoints: 0,
            insightPoints: 2,
            couragePoints: 4,
            nextSceneId: 'forest-s4-scene-5',
          },
          {
            id: 'forest-s4-c4c',
            text: 'Timber fragen, ob er mitkommt zum Nachschauen.',
            consequence:
              'Timber geht neben dir her. "Ich bin da", sagt er. "Aber du gehst voran. Es ist dein Mut." In der Kueche entdeckst du den Grund: das Fenster auf Kipp, die Jalousie im Wind. Du lachst erleichtert. Timber grinst: "Siehst du? Die Realitaet ist fast immer freundlicher als die Fantasie."',
            empathyPoints: 1,
            insightPoints: 2,
            couragePoints: 3,
            nextSceneId: 'forest-s4-scene-5',
          },
        ],
      },
      {
        id: 'forest-s4-scene-5',
        text: 'Um 23 Uhr hoerst du den Schluessel in der Tuer. Deine Eltern sind zurueck. "Na, alles gut?" Du nickst. Und diesmal ist es echt. Es war ein aufregender Abend - nicht wegen aeusserer Gefahr, sondern weil du etwas ueber dein eigenes Gehirn gelernt hast. Timber zwinkert dir zum Abschied zu.',
        speaker: 'Erzaehler',
        speakerEmoji: '\u{1F33F}',
        choices: [
          {
            id: 'forest-s4-c5a',
            text: '"Es gab komische Geraeusche, aber ich hab rausgefunden, was es war. Ich hab es allein geschafft."',
            consequence:
              'Deine Eltern laecheln stolz. Du hast heute Abend nicht nur Geraeusche gecheckt - du hast gelernt, wie dein Angst-System funktioniert. Und dass du die Faehigkeit hast, es zu regulieren. Das ist ein Werkzeug, das dir dein ganzes Leben lang helfen wird.',
            empathyPoints: 0,
            insightPoints: 3,
            couragePoints: 3,
            nextSceneId: null,
          },
          {
            id: 'forest-s4-c5b',
            text: '"Mein Gehirn wollte mich total verueckt machen, aber ich hab mich nicht verueckt machen lassen."',
            consequence:
              'Dein Papa lacht. "Das kenne ich! Mein Kopf macht das auch manchmal." Du merkst: Sogar Erwachsene kennen das Katastrophendenken. Du bist nicht schwach, weil du Angst hattest. Du bist stark, weil du einen Weg gefunden hast, damit umzugehen.',
            empathyPoints: 1,
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

export const forestWisdomCards: WisdomCard[] = [
  {
    id: 'forest-wisdom-1',
    islandId: 'forest' as IslandId,
    text: 'Mut bedeutet nicht, keine Angst zu haben \u2013 sondern trotz der Angst weiterzumachen.',
    category: 'courage',
    collected: false,
  },
  {
    id: 'forest-wisdom-2',
    islandId: 'forest' as IslandId,
    text: 'Dein Gehirn will dich beschuetzen. Manchmal uebertreibt es dabei ein bisschen. Das ist nicht deine Schuld.',
    category: 'insight',
    collected: false,
  },
  {
    id: 'forest-wisdom-3',
    islandId: 'forest' as IslandId,
    text: 'Ein Gedanke ist nur ein Gedanke \u2013 keine Tatsache. Du kannst ihn beobachten, ohne ihm zu glauben.',
    category: 'strategy',
    collected: false,
  },
  {
    id: 'forest-wisdom-4',
    islandId: 'forest' as IslandId,
    text: 'Angst fuehlt sich riesig an, wird aber kleiner, je oefter du ihr begegnest. Das nennt man Uebung.',
    category: 'insight',
    collected: false,
  },
  {
    id: 'forest-wisdom-5',
    islandId: 'forest' as IslandId,
    text: 'Nein zu sagen, wenn alle Ja sagen, ist eine der mutigsten Sachen, die es gibt.',
    category: 'courage',
    collected: false,
  },
  {
    id: 'forest-wisdom-6',
    islandId: 'forest' as IslandId,
    text: 'Dein Koerper sendet dir Signale: Herzklopfen, schwitzige Haende, Schmetterlinge im Bauch. Das sind keine Feinde \u2013 das sind Boten. Hoer ihnen zu.',
    category: 'emotion',
    collected: false,
  },
  {
    id: 'forest-wisdom-7',
    islandId: 'forest' as IslandId,
    text: 'Neue Anfaenge sind fast immer beaengstigend UND aufregend gleichzeitig. Beides darf sein.',
    category: 'emotion',
    collected: false,
  },
  {
    id: 'forest-wisdom-8',
    islandId: 'forest' as IslandId,
    text: 'Wenn dein Kopf Katastrophen-Geschichten erzaehlt, frag ihn: Welche Beweise hast du eigentlich dafuer?',
    category: 'strategy',
    collected: false,
  },
  {
    id: 'forest-wisdom-9',
    islandId: 'forest' as IslandId,
    text: 'Du musst nicht alles auf einmal schaffen. Ein kleiner Schritt zaehlt genauso.',
    category: 'strategy',
    collected: false,
  },
  {
    id: 'forest-wisdom-10',
    islandId: 'forest' as IslandId,
    text: 'Echte Freunde respektieren deine Grenzen. Wenn jemand dein Nein nicht akzeptiert, sagt das mehr ueber diese Person als ueber dich.',
    category: 'courage',
    collected: false,
  },
  {
    id: 'forest-wisdom-11',
    islandId: 'forest' as IslandId,
    text: 'Ueber deine Angst zu sprechen macht sie nicht groesser \u2013 sondern kleiner. Geteilte Angst ist halbe Angst.',
    category: 'emotion',
    collected: false,
  },
  {
    id: 'forest-wisdom-12',
    islandId: 'forest' as IslandId,
    text: 'Jeder mutige Mensch, den du bewunderst, hatte auch Angst. Der Unterschied ist nicht die Abwesenheit von Angst, sondern was man trotzdem tut.',
    category: 'insight',
    collected: false,
  },
];

// =============================================================================
// 3. ACTIVITIES
// =============================================================================

export const forestActivities: ForestActivity[] = [
  // ---------------------------------------------------------------------------
  // Activity 1: Angst-Landkarte (Assessment)
  // Based on exposure hierarchy / fear ladder concepts
  // ---------------------------------------------------------------------------
  {
    id: 'forest-activity-1',
    islandId: 'forest' as IslandId,
    type: 'assessment',
    title: 'Angst-Landkarte',
    description:
      'Erstelle eine Karte deiner Aengste. Welche sind gross, welche klein? Wenn du deine Aengste kennst und einordnest, verlieren sie ein Stueck ihrer Macht.',
    instructions: [
      'Nimm dir einen Moment Zeit und denke an Dinge, die dir Angst machen oder dich nervoes werden lassen. Das koennen grosse Sachen sein (wie ein Referat) oder kleine (wie eine Spinne im Bad).',
      'Schreibe jede Angst auf, die dir einfaellt. Es gibt keine falschen Antworten \u2013 alles, was dich beschaeftigt, zaehlt.',
      'Bewerte jede Angst auf einer Skala von 1 bis 10. 1 bedeutet: "Ein bisschen unangenehm, aber machbar." 10 bedeutet: "Das laehmt mich total."',
      'Sortiere deine Aengste: Welche sind im gruenen Bereich (1-3), welche im gelben (4-6), welche im roten (7-10)?',
      'Waehle eine Angst aus dem gruenen oder gelben Bereich. Ueberlege: Was waere ein erster kleiner Schritt, um dieser Angst zu begegnen? Schreib ihn auf.',
      'Denke daran: Du musst nicht alle Aengste auf einmal bewaeltigen. Es reicht, eine einzige zu kennen und einen einzigen kleinen Schritt zu planen. Das ist schon mutig.',
    ],
    completed: false,
  },

  // ---------------------------------------------------------------------------
  // Activity 2: Gedanken-Gericht (Reflection)
  // Based on CBT cognitive restructuring
  // ---------------------------------------------------------------------------
  {
    id: 'forest-activity-2',
    islandId: 'forest' as IslandId,
    type: 'reflection',
    title: 'Gedanken-Gericht',
    description:
      'Stelle deine Angst-Gedanken vor Gericht! Wie ein Detektiv untersuchst du: Stimmt das wirklich, was mein Kopf mir erzaehlt? Oder uebertreibt er?',
    instructions: [
      'Denke an eine Situation, die dir in letzter Zeit Angst gemacht hat. Schreib sie kurz auf.',
      'Was war der schlimmste Gedanke, den du in diesem Moment hattest? Zum Beispiel: "Alle werden mich auslachen" oder "Es wird etwas Schlimmes passieren." Schreib diesen Gedanken woertlich auf.',
      'Jetzt bist du Detektiv. Frage 1: Welche Beweise gibt es FUER diesen Gedanken? Was spricht dafuer, dass er stimmt?',
      'Frage 2: Welche Beweise gibt es GEGEN diesen Gedanken? Was spricht dafuer, dass er uebertrieben ist oder nicht stimmt?',
      'Frage 3: Was wuerdest du einem guten Freund sagen, der diesen Gedanken haette? Wuerdest du ihm zustimmen \u2013 oder wuerdest du ihn beruhigen?',
      'Schreibe einen neuen, faireren Gedanken auf. Nicht unrealistisch positiv ("Alles wird super!"), sondern realistisch hilfreich. Zum Beispiel: "Es ist moeglich, dass ich nervoes werde, aber ich habe mich vorbereitet und das ist schon viel wert."',
      'Lies deinen neuen Gedanken laut vor. Wie fuehlt er sich an im Vergleich zum alten?',
    ],
    completed: false,
  },

  // ---------------------------------------------------------------------------
  // Activity 3: Waldatmung (Breathing)
  // Box breathing with forest visualization
  // ---------------------------------------------------------------------------
  {
    id: 'forest-activity-3',
    islandId: 'forest' as IslandId,
    type: 'breathing',
    title: 'Waldatmung',
    description:
      'Eine besondere Atemuebung, bei der du dir vorstellst, in einem magischen Wald zu sein. Leuchtende Pflanzen pulsieren im Rhythmus deines Atems.',
    instructions: [
      'Finde eine bequeme Position. Sitzen oder liegen \u2013 beides ist gut. Schliesse die Augen, wenn du moechtest.',
      'Stell dir vor, du stehst in einem stillen, warmen Wald. Um dich herum wachsen Pflanzen, die sanft leuchten \u2013 wie kleine Laternen in der Natur.',
      'EINATMEN (4 Sekunden): Atme langsam durch die Nase ein und zaehle leise bis vier. Stell dir vor, wie die Pflanzen um dich herum heller leuchten, waehrend du einatmest.',
      'HALTEN (4 Sekunden): Halte die Luft sanft an und zaehle bis vier. Die Pflanzen leuchten in voller Helligkeit, alles ist ruhig und still.',
      'AUSATMEN (4 Sekunden): Atme langsam durch den Mund aus und zaehle bis vier. Die Pflanzen werden sanft dunkler, wie bei einem Sonnenuntergang.',
      'PAUSE (4 Sekunden): Warte vier Sekunden, bevor du wieder einatmest. Der Wald ist ganz still. Du bist sicher.',
      'Wiederhole diesen Zyklus mindestens vier Mal. Mit jedem Durchgang wirst du ruhiger. Der Wald atmet mit dir.',
      'Wenn du fertig bist, oeffne langsam die Augen. Spuere, wie sich dein Koerper jetzt anfuehlt im Vergleich zu vorher. Vielleicht ist die Anspannung etwas kleiner geworden.',
    ],
    completed: false,
  },
];

// =============================================================================
// 4. NPCs
// =============================================================================

export const forestNPCs: ForestNPC[] = [
  {
    id: 'forest-npc-timber',
    name: 'Timber',
    emoji: '\u{1F333}',
    description:
      'Ein uralter Waldgeist, der sanft zwischen den Baeumen leuchtet. Er spricht leise und bedacht, und seine Worte haben das Gewicht von Jahrhunderten.',
    backstory:
      'Timber ist der Hueter des Waldes, aber er traegt ein Geheimnis: Er fuerchtet seine eigene Dunkelheit. In stuermischen Naechten, wenn der Wind heult und die Schatten lang werden, spuert er einen Teil von sich, der genauso wild und unberechenbar ist wie der Sturm. Lange Zeit hat er versucht, diesen Teil zu verstecken \u2013 sich kleiner zu machen, leiser zu leuchten. Aber er hat gelernt, dass man nicht nur die hellen Seiten von sich akzeptieren kann. Die Dunkelheit gehoert dazu. Sie macht ihn nicht boese \u2013 sie macht ihn vollstaendig. Heute hilft Timber anderen, ihre eigenen Schatten zu verstehen, statt vor ihnen wegzulaufen. "Angst ist kein Zeichen von Schwaeche", sagt er oft. "Sie ist ein Zeichen dafuer, dass dir etwas wichtig ist."',
  },
  {
    id: 'forest-npc-faye',
    name: 'Faye',
    emoji: '\u{1F9D2}',
    description:
      'Ein ruhiges Maedchen mit grossen, aufmerksamen Augen. Sie beobachtet viel und sagt wenig \u2013 aber wenn sie spricht, ist es meistens etwas Kluges.',
    backstory:
      'Faye hat jede Menge Ideen im Kopf. Wirklich gute sogar. Aber jedes Mal, wenn sie im Unterricht den Mund aufmachen will, schnuert sich ihr Hals zu. Ihr Herz rast, ihre Haende werden feucht, und die Worte bleiben stecken. Sie hat Angst, etwas Falsches zu sagen. Angst, dass alle sie komisch finden. Angst, dass ihre Stimme zittert und alle es merken. Also schweigt sie. Und jedes Mal, wenn sie schweigt, wird die Angst ein kleines Stueckchen groesser. Aber Faye gibt nicht auf. Sie hat angefangen, ihre Gedanken erst aufzuschreiben, bevor sie sie laut sagt. Manchmal fluestert sie ihre Antworten einer Freundin zu, die sie dann fuer sie sagt. Und an manchen Tagen \u2013 den mutigen Tagen \u2013 hebt sie selbst die Hand. Ihre Stimme zittert dann meistens. Aber sie spricht. Und jedes Mal wird es ein winziges Stueckchen leichter.',
  },
];
