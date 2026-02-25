// @ts-nocheck
// =============================================================================
// Inner Worlds - Heimat-Insel (Home Island)
// Theme: Integration & Transfer -- Alles zusammenbringen
// All content in German, written for ages 10-15
// CDSE Luxembourg -- Therapeutic educational game for socio-emotional learning
// Final island: consolidates every skill from the seven previous islands
// =============================================================================

import type { Scenario, WisdomCard, Activity, IslandId } from '../../../types';

// =============================================================================
// 1. SCENARIOS
// =============================================================================

export const homeScenarios: Scenario[] = [
  // ---------------------------------------------------------------------------
  // Scenario 1: "Zurueck in der Realitaet"
  // Teaching: Im echten Leben kommen alle Gefuehle gleichzeitig.
  // Du hast jetzt die Werkzeuge, damit umzugehen.
  // ---------------------------------------------------------------------------
  {
    id: 'home-scenario-1',
    islandId: 'home' as IslandId,
    title: 'Zurueck in der Realitaet',
    description:
      'Ein normaler Schultag -- aber nichts daran ist einfach. Ein Freund ist wuetend, eine andere traurig, und mitten im Flur wartet eine Mutprobe. Alles gleichzeitig. Willkommen im echten Leben.',
    scenes: [
      // Scene 1 -- Ankunft: Die Stimmung im Klassenraum
      {
        id: 'home-s1-scene-1',
        text: 'Montagmorgen, kurz vor acht. Du betrittst den Klassenraum und merkst sofort: Die Luft ist anders heute. In der hinteren Ecke sitzt Malik mit verschraenkten Armen und einem Gesicht wie Gewitter -- er redet mit niemandem. Vorne am Fenster sitzt Lina, den Kopf auf die Arme gelegt, und ihre Schultern zucken leicht -- sie weint. Und mittendrin steht eine Gruppe um Jonas, der laut verkuendet: "Wer heute nicht beim Streich gegen Herrn Weber mitmacht, ist ein Feigling." Er schaut direkt zu dir. Drei Probleme. Ein Morgen. Und du mittendrin.',
        speaker: 'Erzaehler',
        speakerEmoji: '\u{1F3E0}',
        choices: [
          {
            id: 'home-s1-c1a',
            text: 'Erstmal tief durchatmen und die Situation beobachten, bevor du irgendetwas tust.',
            consequence:
              'Du bleibst kurz an der Tuer stehen und holst dreimal tief Luft. Dein Blick wandert von Malik zu Lina zu Jonas. Dein Kopf sortiert: Wut. Traurigkeit. Gruppendruck. Drei verschiedene Situationen, drei verschiedene Werkzeuge. Aber du musst nicht alles gleichzeitig loesen. Eins nach dem anderen.',
            empathyPoints: 1,
            insightPoints: 3,
            couragePoints: 1,
            nextSceneId: 'home-s1-scene-2',
          },
          {
            id: 'home-s1-c1b',
            text: 'Sofort zu Lina gehen -- sie sieht aus, als braeuchte sie gerade am dringendsten jemanden.',
            consequence:
              'Du gehst zu Lina und setzt dich leise neben sie. Du sagst nichts, du bist einfach da. Nach einer Minute hebt sie den Kopf und sieht dich mit rotgeweinten Augen an. "Mein Opa ist im Krankenhaus", fluestert sie. Manchmal ist das Wichtigste, dass jemand da ist -- nicht was man sagt, sondern dass man kommt.',
            empathyPoints: 3,
            insightPoints: 1,
            couragePoints: 1,
            nextSceneId: 'home-s1-scene-2',
          },
          {
            id: 'home-s1-c1c',
            text: 'Jonas direkt antworten: "Nein. Ich bin kein Feigling -- aber ich mache keinen Mist mit."',
            consequence:
              'Jonas starrt dich einen Moment an. Ein paar aus der Gruppe schauen ueberrascht. "Pff, wie du willst", sagt Jonas und wendet sich ab. Aber du siehst, wie zwei andere aus der Gruppe erleichtert aufatmen. Manchmal braucht es nur eine Person, die Nein sagt, damit andere sich auch trauen.',
            empathyPoints: 0,
            insightPoints: 2,
            couragePoints: 3,
            nextSceneId: 'home-s1-scene-2',
          },
          {
            id: 'home-s1-c1d',
            text: 'Kopfhoerer rein, ab an deinen Platz. Nicht dein Problem.',
            consequence:
              'Du gehst an allen vorbei, als waerst du unsichtbar. Malik bleibt allein mit seiner Wut, Lina weint weiter, und Jonas bekommt die Bestaetigung, dass keiner widerspricht. Du hast auf allen Inseln gelernt, hinzuschauen -- und in dem Moment, wo es zaehlt, schaust du weg. Die Werkzeuge nuetzen nichts, wenn man sie im Rucksack laesst.',
            nextSceneId: 'home-s1-scene-2',
            isWrong: true,
            points: { empathyPoints: 0, insightPoints: 0, couragePoints: 0 },
          },
        ],
      },
      // Scene 2 -- Maliks Wut
      {
        id: 'home-s1-scene-2',
        text: 'Die Stunde beginnt, aber du kannst dich kaum konzentrieren. Malik sitzt hinter dir und du hoerst, wie er seinen Stift so fest auf den Tisch drueckt, dass er fast bricht. In der Pause explodiert er: "Lass mich in Ruhe!", schreit er einen Mitschueler an, der nur gefragt hat, ob er einen Radiergummi leihen kann. Alle starren. Du kennst diesen Blick -- hinter der Wut steckt etwas anderes. Du erinnerst dich an die Vulkan-Insel: Wut ist oft nur die obere Schicht.',
        speaker: 'Erzaehler',
        speakerEmoji: '\u{1F3E0}',
        choices: [
          {
            id: 'home-s1-c2a',
            text: 'Warten, bis sich die Situation beruhigt, und dann leise zu Malik gehen: "Hey, alles okay bei dir?"',
            consequence:
              'Du wartest eine Minute, bis die anderen weitergegangen sind. Dann gehst du zu Malik. Er schaut dich an wie jemand, der sich auf einen Kampf vorbereitet -- aber du bleibst ruhig. "Was?", knurrt er. "Ich wollte nur schauen, wie es dir geht", sagst du. Sein Blick wird weicher. "Mein Vater und meine Mutter haben sich wieder gestritten. Richtig laut." Da ist sie -- die Traurigkeit unter der Wut.',
            empathyPoints: 3,
            insightPoints: 2,
            couragePoints: 1,
            nextSceneId: 'home-s1-scene-3',
          },
          {
            id: 'home-s1-c2b',
            text: 'Malik einen Zettel schreiben: "Wenn du reden willst, ich bin da. Kein Druck."',
            consequence:
              'Du schiebst den Zettel ueber den Tisch. Malik liest ihn, zerknuellt ihn -- und steckt ihn dann in die Hosentasche. In der naechsten Pause kommt er zu dir. "Okay", sagt er leise. "Aber sag es niemandem." Du nickst. Manchmal oeffnet sich eine Tuer nur, wenn man keinen Druck macht.',
            empathyPoints: 2,
            insightPoints: 3,
            couragePoints: 1,
            nextSceneId: 'home-s1-scene-3',
          },
          {
            id: 'home-s1-c2c',
            text: '"Malik soll sich mal zusammenreissen. Jeder hat Probleme."',
            consequence:
              'Du sagst es halblaut zu einem Mitschueler. Malik hoert es. Sein Blick wird kalt, und er dreht sich weg. Du hast gerade genau das getan, was auf der Vulkan-Insel als groesster Fehler galt: die Gefuehle eines anderen kleinreden. Wut zu sehen und zu sagen "Stell dich nicht so an" ist wie einen Vulkan zu ignorieren -- er bricht trotzdem aus.',
            nextSceneId: 'home-s1-scene-3',
            isWrong: true,
            points: { empathyPoints: 0, insightPoints: 0, couragePoints: 0 },
          },
        ],
      },
      // Scene 3 -- Der Streich und der Gruppendruck
      {
        id: 'home-s1-scene-3',
        text: 'In der grossen Pause kommt Jonas nochmal zu dir. Diesmal leiser, ohne die Gruppe. "Hey, komm schon. Es ist doch nur ein Spass. Wir verstecken nur seine Kreide. Nichts Schlimmes." Du merkst: Jonas ist nicht boese. Er will dazugehoeren und cool sein. Aber du weisst auch: Herr Weber hat es schon schwer genug, und solche Streiche machen das nicht besser. Und dann hoerst du Linas Stimme im Kopf: "Manchmal sieht man nicht, was bei anderen gerade los ist."',
        speaker: 'Jonas',
        speakerEmoji: '\u{1F466}',
        choices: [
          {
            id: 'home-s1-c3a',
            text: '"Jonas, ich mach nicht mit. Aber vielleicht gibt es was Cooleres, das wir zusammen machen koennen, ohne dass jemand drunter leidet."',
            consequence:
              'Jonas zieht die Brauen hoch. Damit hat er nicht gerechnet. "Wie... was meinst du?" Du schlugst vor, stattdessen ein lustiges Raetsel fuer die Klasse zu machen. Jonas ueberlegt -- und dann grinst er. "Okay, das koennte witzig sein." Du hast nicht nur Nein gesagt, sondern eine Alternative angeboten. Das ist eine der staerksten Formen von Mut.',
            empathyPoints: 2,
            insightPoints: 2,
            couragePoints: 3,
            nextSceneId: 'home-s1-scene-4',
          },
          {
            id: 'home-s1-c3b',
            text: '"Weisst du, vielleicht hat Herr Weber auch einen schlechten Tag. Wir wissen es nicht. Ich mach da nicht mit."',
            consequence:
              'Jonas wird kurz still. "Das ist mir egal", sagt er -- aber du siehst, wie er nachdenkt. Spaeter, als er an Herrn Webers Pult vorbeigeht, laesst er die Kreide liegen. Vielleicht hat dein Satz doch etwas ausgeloest. Empathie ist ansteckend -- auch wenn man es nicht sofort sieht.',
            empathyPoints: 3,
            insightPoints: 2,
            couragePoints: 2,
            nextSceneId: 'home-s1-scene-4',
          },
          {
            id: 'home-s1-c3c',
            text: '"Nein, und ich finde, du solltest es auch lassen. Aber das ist deine Entscheidung."',
            consequence:
              'Jonas zuckt die Schultern und geht. Vielleicht macht er den Streich, vielleicht nicht. Du hast deine Meinung gesagt, aber auch seine Freiheit respektiert. Du kannst nicht kontrollieren, was andere tun -- nur, was du tust. Und das hast du gut gemacht.',
            empathyPoints: 1,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: 'home-s1-scene-4',
          },
          {
            id: 'home-s1-c3d',
            text: '"Ach, warum nicht? Ist doch nur ein Spass. Machen wir alle mit."',
            consequence:
              'Du laesst dich mitziehen, obwohl du es besser weisst. Der Streich passiert, Herr Weber merkt es, und die Stimmung kippt. Du spuerst sofort: Das war falsch. Alles, was du auf den Inseln ueber Mut gelernt hast -- dass man Nein sagen darf, dass Gruppendruck keine Entschuldigung ist -- hast du in diesem Moment vergessen. Mitmachen, obwohl man weiss, dass es falsch ist, ist kein Spass. Es ist Feigheit.',
            nextSceneId: 'home-s1-scene-4',
            isWrong: true,
            points: { empathyPoints: 0, insightPoints: 0, couragePoints: 0 },
          },
        ],
      },
      // Scene 4 -- Lina helfen und zusammenfuehren
      {
        id: 'home-s1-scene-4',
        text: 'Der Tag geht weiter. In der letzten Stunde siehst du Lina allein auf dem Schulhof sitzen. Malik steht ein paar Meter weiter und schaut auf sein Handy, aber er wirkt ruhiger als heute Morgen. Und Jonas haengt mit seiner Gruppe ab, aber irgendwie stiller als sonst. Du realisierst: Alle drei kaempfen heute mit etwas. Und du stehst in der Mitte -- nicht als Held, sondern als jemand, der hinsieht.',
        speaker: 'Erzaehler',
        speakerEmoji: '\u{1F3E0}',
        choices: [
          {
            id: 'home-s1-c4a',
            text: 'Dich neben Lina setzen und Malik einladen, dazuzukommen: "Hey, lasst uns einfach zusammen sitzen. Keiner muss reden."',
            consequence:
              'Lina schaut ueberrascht, aber dankbar. Malik zoegert, dann kommt er. Ihr sitzt zu dritt da, und eine Weile sagt niemand etwas. Aber die Stille ist nicht unangenehm. Sie ist warm. Manchmal ist Gemeinschaft nicht reden -- sondern einfach zusammen da sein.',
            empathyPoints: 3,
            insightPoints: 2,
            couragePoints: 1,
            nextSceneId: 'home-s1-scene-5',
          },
          {
            id: 'home-s1-c4b',
            text: 'Zu Lina gehen und fragen: "Kann ich irgendetwas tun? Und sei es nur, neben dir zu sitzen."',
            consequence:
              'Lina nickt und du setzt dich hin. "Danke", sagt sie leise. "Es hilft, dass du gefragt hast. Die meisten tun so, als haetten sie nichts gesehen." Du merkst: Fragen ist manchmal wichtiger als Antworten. Und Hinsehen ist wichtiger als Wegschauen.',
            empathyPoints: 3,
            insightPoints: 2,
            couragePoints: 1,
            nextSceneId: 'home-s1-scene-5',
          },
          {
            id: 'home-s1-c4c',
            text: 'Einfach nach Hause gehen. Du bist nicht dafuer zustaendig, dich um alle zu kuemmern.',
            consequence:
              'Du drehst dich um und gehst. Lina bleibt allein. Malik steht allein. Jonas zieht sein Ding durch. Und du? Du sagst dir: "Ich brauche niemanden und niemand braucht mich." Aber tief in dir weisst du, dass das nicht stimmt. Auf der Garten-Insel hast du gelernt, dass Beziehungen Pflege brauchen. Sich fuer unabhaengig zu erklaeren ist manchmal nur ein anderes Wort fuer weglaufen.',
            nextSceneId: 'home-s1-scene-5',
            isWrong: true,
            points: { empathyPoints: 0, insightPoints: 0, couragePoints: 0 },
          },
        ],
      },
      // Scene 5 -- Reflexion auf dem Heimweg
      {
        id: 'home-s1-scene-5',
        text: 'Auf dem Heimweg denkst du nach. Was fuer ein Tag. Wut, Trauer, Gruppendruck -- alles gleichzeitig. Frueher haettest du dich vielleicht ueberfordert gefuehlt, haettest weggeschaut oder mitgemacht. Aber heute war es anders. Du hast hingeschaut. Du hast nachgedacht. Du hast gehandelt. Der Guide meldet sich in deinem Kopf: "Weisst du, was das zeigt? Dass du nicht nur einzelne Werkzeuge hast -- sondern weisst, wann du welches brauchst. Im echten Leben kommen alle Gefuehle gleichzeitig. Und du hast jetzt die Werkzeuge, damit umzugehen."',
        speaker: 'Guide',
        speakerEmoji: '\u{2728}',
        choices: [
          {
            id: 'home-s1-c5a',
            text: '"Es war anstrengend. Aber ich bin froh, dass ich nicht weggeschaut habe."',
            consequence:
              'Der Guide nickt. "Genau das ist der Unterschied. Du bist nicht perfekt durch den Tag gegangen -- niemand tut das. Aber du bist hingeschaut und hast das Richtige versucht. Und das, mein Freund, ist emotionale Intelligenz in Aktion." Du laechelst. Der Tag war schwer, aber er hat sich gelohnt.',
            empathyPoints: 2,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: null,
          },
          {
            id: 'home-s1-c5b',
            text: '"Ich haette gern mehr getan. Fuer Malik. Fuer Lina. Fuer alle."',
            consequence:
              'Der Guide laechelt sanft. "Dass du das fuehlst, zeigt, wie viel Empathie in dir steckt. Aber hoer mir zu: Du musst nicht alles reparieren. Du bist kein Superheld. Du bist ein Mensch, der hinsieht, zuhoert und sein Bestes gibt. Und das ist mehr als genug." Du atmest tief durch. Er hat recht. Es ist genug.',
            empathyPoints: 3,
            insightPoints: 2,
            couragePoints: 1,
            nextSceneId: null,
          },
          {
            id: 'home-s1-c5c',
            text: '"War okay, hat mich aber nicht wirklich beruehrt. Morgen ist eh alles vergessen."',
            consequence:
              'Du zuckst die Schultern und steckst die Kopfhoerer rein. Aber der Guide schuettelt den Kopf: "Du tust so, als waere der Tag egal gewesen. Aber ich habe gesehen, wie du hingeschaut hast. Emotionale Distanz schuetzt dich nicht -- sie isoliert dich. Auf der Ozean-Insel hast du gelernt, dass Gefuehle zuzulassen Staerke ist. Wegschieben ist das Gegenteil davon."',
            nextSceneId: null,
            isWrong: true,
            points: { empathyPoints: 0, insightPoints: 0, couragePoints: 0 },
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Scenario 2: "Der schwierige Tag"
  // Teaching: Schlechte Tage gehen vorbei. Was zaehlt, ist wie du mit ihnen
  // umgehst. Resilienz und Selbstfuersorge in Krisenzeiten.
  // ---------------------------------------------------------------------------
  {
    id: 'home-scenario-2',
    islandId: 'home' as IslandId,
    title: 'Der schwierige Tag',
    description:
      'Alles geht schief: eine schlechte Note, Streit zu Hause, ein Freund, der dich ignoriert, und eine gemeine Nachricht auf dem Handy. Wie ueberlebst du einen Tag, an dem alles zu viel wird?',
    scenes: [
      // Scene 1 -- Die schlechte Note
      {
        id: 'home-s2-scene-1',
        text: 'Es beginnt in der ersten Stunde. Herr Schmitt teilt die Mathearbeit aus. Du warst dir so sicher, dass es gut gelaufen ist -- du hast sogar geubt. Aber als du das Blatt umdrehst, steht da eine 5. Eine Fuenf. Dir wird heiss. Deine Augen brennen. Du hoerst, wie jemand neben dir sagt: "Ich hab eine 2! Und du?" Du legst das Blatt schnell mit der Rueckseite nach oben auf den Tisch.',
        speaker: 'Erzaehler',
        speakerEmoji: '\u{1F3E0}',
        choices: [
          {
            id: 'home-s2-c1a',
            text: 'Tief durchatmen. Die Note tut weh, aber sie definiert dich nicht.',
            consequence:
              'Du schliesst kurz die Augen und atmest langsam aus. Die Enttaeuschung ist da, und sie ist echt. Aber du erinnerst dich an etwas Wichtiges: Eine Note sagt nichts darueber aus, wer du bist. Sie sagt nur, wie ein Test an einem Tag gelaufen ist. Punkt.',
            empathyPoints: 0,
            insightPoints: 3,
            couragePoints: 1,
            nextSceneId: 'home-s2-scene-2',
          },
          {
            id: 'home-s2-c1b',
            text: 'Das Blatt zusammenknuellen und in die Tasche stopfen. Du willst es nicht sehen.',
            consequence:
              'Das Papier knistert in deiner Faust. Die Wut mischt sich mit Scham. Du willst gerade nicht darueber nachdenken. Und das ist okay -- manchmal muss man die Enttaeuschung erst sacken lassen, bevor man klar denken kann. Wichtig ist nur, dass du spaeter nochmal hinschaust.',
            empathyPoints: 0,
            insightPoints: 2,
            couragePoints: 1,
            nextSceneId: 'home-s2-scene-2',
          },
          {
            id: 'home-s2-c1c',
            text: 'Die Hand heben und Herrn Schmitt nach dem Unterricht um ein Gespraech bitten.',
            consequence:
              'Herr Schmitt nickt. "Klar, nach der Stunde." Du bist enttaeuscht, aber du reagierst aktiv. Nachfragen, verstehen wollen, statt sich zu verstecken -- das ist eine Staerke, die viele Erwachsene nicht haben. Spaeter zeigt dir Herr Schmitt, wo deine Fehler lagen. "Du warst nah dran", sagt er. "Beim naechsten Mal."',
            empathyPoints: 0,
            insightPoints: 2,
            couragePoints: 3,
            nextSceneId: 'home-s2-scene-2',
          },
          {
            id: 'home-s2-c1d',
            text: '"Ist doch egal. Noten sind sowieso sinnlos. Schule bringt eh nichts."',
            consequence:
              'Du schiebst das Blatt vom Tisch und starrst aus dem Fenster. Die Enttaeuschung verwandelt sich in Gleichgueltigkeit -- aber das ist eine Luege, die du dir selbst erzaehlst. Aufgeben, weil etwas wehgetan hat, ist keine Staerke. Auf der Berg-Insel hast du gelernt, dass du genug bist -- auch wenn eine Note etwas anderes zu sagen scheint. Aber diesen Satz hast du gerade vergessen.',
            nextSceneId: 'home-s2-scene-2',
            isWrong: true,
            points: { empathyPoints: 0, insightPoints: 0, couragePoints: 0 },
          },
        ],
      },
      // Scene 2 -- Streit zu Hause (Rueckblick am Morgen)
      {
        id: 'home-s2-scene-2',
        text: 'In der Pause sitzt du allein da und die Gedanken drehen sich. Nicht nur die Note. Heute Morgen gab es Streit mit deiner Mutter. "Du raeuumst nie dein Zimmer auf! Ich bin es leid, immer alles hinter dir herzumachen!" Du hast zurueckgeschrien: "Dann lass es halt!" Und die Tuer hinter dir zugeknallt. Jetzt, Stunden spaeter, fuehlt sich der Streit wie ein Stein auf deiner Brust an. Du weisst, dass du zu hart reagiert hast. Aber sie auch. Und jetzt ist da diese Mischung aus Schuld und Wut.',
        speaker: 'Erzaehler',
        speakerEmoji: '\u{1F3E0}',
        choices: [
          {
            id: 'home-s2-c2a',
            text: 'Dir vornehmen, spaeter mit deiner Mutter zu reden. Vielleicht eine kurze Nachricht schreiben: "Es tut mir leid wegen heute Morgen. Koennen wir reden?"',
            consequence:
              'Du tippst die Nachricht ins Handy. Dein Finger zoegert ueber dem Senden-Button. Dann drueckst du. Wenige Minuten spaeter kommt eine Antwort: "Mir auch. Heute Abend, okay? Hab dich lieb." Der Stein auf deiner Brust wird leichter. Es braucht Mut, den ersten Schritt zu machen -- besonders wenn man sich auch verletzt fuehlt.',
            empathyPoints: 2,
            insightPoints: 2,
            couragePoints: 3,
            nextSceneId: 'home-s2-scene-3',
          },
          {
            id: 'home-s2-c2b',
            text: 'Erstmal die Gefuehle sortieren. Was genau fuehle ich? Wut? Schuld? Traurigkeit? Wahrscheinlich alles gleichzeitig.',
            consequence:
              'Du nimmst deinen Stift und schreibst auf die Rueckseite eines Blattes: "Wut -- weil sie mich angeschrien hat. Schuld -- weil ich auch geschrien habe. Traurigkeit -- weil ich meine Mama nicht gern streite." Die Gefuehle aufzuschreiben macht sie kleiner. Nicht weg -- aber handhabbar. Das hast du auf der Vulkan-Insel gelernt: Gefuehle benennen ist der erste Schritt, sie zu verstehen.',
            empathyPoints: 1,
            insightPoints: 3,
            couragePoints: 1,
            nextSceneId: 'home-s2-scene-3',
          },
          {
            id: 'home-s2-c2c',
            text: '"Soll sie doch machen, was sie will. Ist mir egal. Gefuehle sind Zeitverschwendung."',
            consequence:
              'Du drueckst die Wut und die Schuld tief runter. Aber sie verschwinden nicht -- sie gaeren. Abends liegst du wach und der Streit spielt sich immer wieder ab. Auf der Vulkan-Insel hast du gelernt, dass verdraengte Gefuehle nicht verschwinden, sondern staerker werden. Zu sagen "Ist mir egal" ist oft nur ein Schutzschild -- und es schuetzt dich nicht, es isoliert dich.',
            nextSceneId: 'home-s2-scene-3',
            isWrong: true,
            points: { empathyPoints: 0, insightPoints: 0, couragePoints: 0 },
          },
        ],
      },
      // Scene 3 -- Der Freund, der dich ignoriert
      {
        id: 'home-s2-scene-3',
        text: 'Es wird noch schlimmer. In der Mittagspause siehst du deinen besten Freund Tim mit einer anderen Gruppe lachen. Du gehst zu ihm und sagst "Hey!" -- aber Tim schaut nur kurz, murmelt "Ja, hi" und dreht sich wieder um. Als waerst du Luft. Der Stich geht tief. Seit wann ist Tim so? Hast du etwas getan? Oder hat er einfach neue Freunde und du bist... ueberfluessig?',
        speaker: 'Erzaehler',
        speakerEmoji: '\u{1F3E0}',
        choices: [
          {
            id: 'home-s2-c3a',
            text: 'Spaeter, wenn Tim allein ist, direkt ansprechen: "Hey, ist irgendwas? Du wirkst irgendwie anders mir gegenueber."',
            consequence:
              'Du wartest den richtigen Moment ab. Als Tim am Spind steht, gehst du zu ihm. "Ist was los zwischen uns?" Tim sieht ueberrascht aus. "Nein... ich hatte nur viel um die Ohren. Sorry, ich war nicht absichtlich komisch." Manchmal ist die grosse Katastrophe in unserem Kopf in Wirklichkeit ein Missverstaendnis. Aber das erfaehrt man nur, wenn man fragt.',
            empathyPoints: 1,
            insightPoints: 2,
            couragePoints: 3,
            nextSceneId: 'home-s2-scene-4',
          },
          {
            id: 'home-s2-c3b',
            text: 'Erstmal Abstand nehmen. Du bist gerade sowieso emotional am Limit. Das Gespraech mit Tim kann warten.',
            consequence:
              'Du gehst in die Bibliothek und setzt dich in die ruhige Ecke. Dein Kopf braucht eine Pause. Und du weisst: Wenn du jetzt mit Tim redest, waehrend alles in dir brodelt, sagst du vielleicht Dinge, die du nicht meinst. Pause machen ist kein Weglaufen -- es ist klug.',
            empathyPoints: 0,
            insightPoints: 3,
            couragePoints: 1,
            nextSceneId: 'home-s2-scene-4',
          },
          {
            id: 'home-s2-c3c',
            text: '"Dann brauche ich ihn eben auch nicht. Ich brauche sowieso niemanden."',
            consequence:
              'Du drehst dich um und gehst allein in eine Ecke. Die Wut und die Verletzung verwandeln sich in kalte Distanz. Aber du merkst: Es fuehlt sich nicht stark an -- es fuehlt sich einsam an. Auf der Garten-Insel hast du gelernt, dass Beziehungen Arbeit brauchen. Sich zurueckzuziehen und zu sagen "Ich brauche niemanden" ist keine Unabhaengigkeit. Es ist Angst, nochmal verletzt zu werden.',
            nextSceneId: 'home-s2-scene-4',
            isWrong: true,
            points: { empathyPoints: 0, insightPoints: 0, couragePoints: 0 },
          },
        ],
      },
      // Scene 4 -- Die gemeine Nachricht (Cyberbullying)
      {
        id: 'home-s2-scene-4',
        text: 'Und dann, auf dem Heimweg, vibriert dein Handy. Eine Nachricht in der Klassengruppe. Jemand hat ein haessliches Meme ueber dich gepostet -- dein Gesicht, reinmontiert in ein peinliches Bild. Darunter Lachsmileys. Dein Herz rast. Deine Haende zittern. Du scrollst und siehst: Zehn Leute haben gelacht. Nur zwei haben nichts geschrieben. Keiner hat gesagt, dass das nicht okay ist. Die Traenen kommen jetzt echt.',
        speaker: 'Erzaehler',
        speakerEmoji: '\u{1F3E0}',
        choices: [
          {
            id: 'home-s2-c4a',
            text: 'Einen Screenshot machen und das Bild einer Vertrauensperson zeigen -- Mama, Papa, ein Lehrer, die Schulsozialarbeit.',
            consequence:
              'Du machst einen Screenshot. Dann schreibst du deiner Mutter: "Mama, jemand hat was Gemeines ueber mich gepostet. Kann ich dir das zeigen?" Innerhalb von Minuten ruft sie an. Ihre Stimme ist warm und fest: "Zeig es mir. Und dann klaeren wir das zusammen." Du bist nicht allein. Das war schon immer wahr -- aber jetzt fuehlt es sich auch so an. Screenshots sichern und Hilfe holen -- das ist der richtige Weg bei Cybermobbing.',
            empathyPoints: 1,
            insightPoints: 3,
            couragePoints: 3,
            nextSceneId: 'home-s2-scene-5',
          },
          {
            id: 'home-s2-c4b',
            text: 'Nicht antworten. Das Handy weglegen. Tief durchatmen und spaeter mit jemandem reden.',
            consequence:
              'Du legst das Handy mit dem Bildschirm nach unten auf den Tisch. Dein Atem geht schnell, aber du zwingst dich, langsam zu atmen. Ein, zwei, drei, vier. Aus, zwei, drei, vier. Die Traenen kommen trotzdem, aber das ist okay. Nicht antworten ist die staerkste Reaktion, die du geben kannst. Morgen redest du mit einem Erwachsenen darueber. Aber jetzt brauchst du erstmal dich selbst.',
            empathyPoints: 0,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: 'home-s2-scene-5',
          },
          {
            id: 'home-s2-c4c',
            text: 'In der Gruppe schreiben: "Das ist nicht witzig. Das ist Mobbing. Und es sagt mehr ueber euch aus als ueber mich."',
            consequence:
              'Du tippst den Satz mit zitternden Fingern. Dann drueckst du Senden. Stille. Dann loescht jemand den Post. Zwei Leute schreiben privat: "Sorry. Das war echt nicht okay." Dein Mut hat etwas veraendert. Aber: Egal was passiert waere -- du solltest trotzdem mit einer Vertrauensperson darueber reden. Cybermobbing allein zu tragen, ist zu viel.',
            empathyPoints: 1,
            insightPoints: 2,
            couragePoints: 3,
            nextSceneId: 'home-s2-scene-5',
          },
          {
            id: 'home-s2-c4d',
            text: 'Sofort zurueckschreiben und auch etwas Gemeines ueber den Absender posten. Auge um Auge.',
            consequence:
              'Du tippst wuetend eine Antwort und postest ein haessliches Bild zurueck. Fuer einen Moment fuehlt es sich gut an -- Rache. Aber dann eskaliert alles. Mehr Nachrichten, mehr Haeme, mehr Traenen. Du hast aus Cybermobbing einen Krieg gemacht, und jetzt steckst du noch tiefer drin. Auf der Vulkan-Insel hast du gelernt: Wut als Waffe einsetzen macht alles schlimmer. Rache ist kein Werkzeug -- sie ist eine Falle.',
            nextSceneId: 'home-s2-scene-5',
            isWrong: true,
            points: { empathyPoints: 0, insightPoints: 0, couragePoints: 0 },
          },
        ],
      },
      // Scene 5 -- Abend: Selbstfuersorge
      {
        id: 'home-s2-scene-5',
        text: 'Es ist Abend. Du liegst auf deinem Bett und starrst an die Decke. Was fuer ein Tag. Schlechte Note, Streit mit Mama, Tim, das Meme. Alles auf einmal. Dein Koerper fuehlt sich schwer an, als waerst du gelaufen, obwohl du nur gesessen hast. Der Guide meldet sich, leise und warm: "Hey. Das war ein harter Tag. Und du hast ihn ueberlebt. Das allein ist schon eine Leistung. Aber jetzt ist etwas Wichtiges dran: Wie sorgst du jetzt fuer dich selbst?"',
        speaker: 'Guide',
        speakerEmoji: '\u{2728}',
        choices: [
          {
            id: 'home-s2-c5a',
            text: '"Ich mache etwas, das mir guttut. Musik hoeren, warm duschen, mein Lieblingsessen. Kleine Dinge."',
            consequence:
              'Du setzt Kopfhoerer auf und laesst dein Lieblingslied laufen. Die Musik huellt dich ein wie eine warme Decke. Der Guide fluestert: "Genau so. Selbstfuersorge ist kein Luxus. Es ist eine Notwendigkeit. Besonders an Tagen wie diesen." Morgen wird anders. Und selbst wenn nicht -- du weisst jetzt, wie du durch schwere Tage kommst. Schlechte Tage gehen vorbei. Was zaehlt, ist wie du mit ihnen umgehst.',
            empathyPoints: 1,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: null,
          },
          {
            id: 'home-s2-c5b',
            text: '"Ich schreibe alles auf. In mein Tagebuch. Damit die Gedanken nicht mehr in meinem Kopf kreisen."',
            consequence:
              'Dein Stift kratzt ueber das Papier. Du schreibst alles -- die Fuenf, den Streit, Tim, das Meme, die Traenen. Und dann, ganz am Ende, schreibst du: "Aber ich habe den Tag ueberlebt. Und morgen ist ein neuer." Der Guide laechelt. "Aufschreiben befreit. Und dein Tagebuch urteilt nie." Du machst das Licht aus. Es war ein schlimmer Tag. Aber du bist staerker als er.',
            empathyPoints: 0,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: null,
          },
          {
            id: 'home-s2-c5c',
            text: '"Gar nichts. Einfach alles abschalten. Gefuehle sind nur Ballast, den ich nicht brauche."',
            consequence:
              'Du legst dich hin und versuchst, einfach nichts zu fuehlen. Aber die Gedanken drehen sich trotzdem. Der Guide sagt leise: "Gefuehle abschalten klingt nach Schutz, aber es ist das Gegenteil. Auf der Ozean-Insel hast du gelernt, dass Traurigkeit zulassen staerker ist als verdraengen. Und auf der Nacht-Insel, dass Achtsamkeit heisst: wahrnehmen, was da ist. Nicht wegschieben. Sich selbst zu betaeuben ist keine Selbstfuersorge -- es ist Selbstaufgabe."',
            nextSceneId: null,
            isWrong: true,
            points: { empathyPoints: 0, insightPoints: 0, couragePoints: 0 },
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Scenario 3: "Hilfe geben und nehmen"
  // Teaching: Hilfe zu suchen ist kein Zeichen von Schwaeche -- es ist ein
  // Zeichen von Staerke. Konkrete Werkzeuge: Vertrauenspersonen, professionelle
  // Hilfe, wie man jemanden in einer Krise unterstuetzt.
  // ---------------------------------------------------------------------------
  {
    id: 'home-scenario-3',
    islandId: 'home' as IslandId,
    title: 'Hilfe geben und nehmen',
    description:
      'Eine Freundin braucht dringend Hilfe -- aber du selbst auch. Wann hole ich mir Unterstuetzung? Wie rede ich mit Vertrauenspersonen? Und warum ist um Hilfe bitten das Mutigste, was man tun kann?',
    scenes: [
      // Scene 1 -- Sarahs Veraenderung
      {
        id: 'home-s3-scene-1',
        text: 'Seit ein paar Wochen ist Sarah anders. Frueher hat sie immer gelacht, Witze gemacht, war die Erste, die bei allem dabei war. Jetzt sitzt sie meistens allein, isst kaum noch in der Pause, und gestern hat sie gesagt: "Ist doch alles egal." Du hast ein mulmiges Gefuehl. Es ist nicht nur schlechte Laune -- irgendetwas stimmt wirklich nicht. Gleichzeitig merkst du, dass dich das belastet. Du liegst abends wach und machst dir Sorgen um Sarah. Dein eigener Schlaf leidet, deine Noten auch.',
        speaker: 'Erzaehler',
        speakerEmoji: '\u{1F3E0}',
        choices: [
          {
            id: 'home-s3-c1a',
            text: 'Zu Sarah gehen und direkt und ehrlich sagen: "Sarah, ich mache mir Sorgen um dich. Du bist anders in letzter Zeit."',
            consequence:
              'Sarah sieht dich einen langen Moment an. Dann sagt sie leise: "Es ist... kompliziert. Zu Hause laeuft alles schief. Meine Eltern..." Sie bricht ab. Du siehst, wie schwer es ihr faellt zu reden. Aber dass du gefragt hast -- direkt, ehrlich, ohne Umwege -- hat eine Tuer geoeffnet. Hinschauen ist der erste Schritt.',
            empathyPoints: 3,
            insightPoints: 1,
            couragePoints: 2,
            nextSceneId: 'home-s3-scene-2',
          },
          {
            id: 'home-s3-c1b',
            text: 'Erstmal beobachten und gleichzeitig ueberlegen, mit wem du ueber deine Sorgen reden koenntest.',
            consequence:
              'Du beobachtest Sarah eine Woche lang genauer. Sie isst weniger, redet weniger, laechelt fast nie. Und du merkst: Je mehr du dich sorgst, desto schlechter geht es dir selbst. Beobachten ist gut -- aber allein damit bleiben nicht. Du brauchst auch jemanden, mit dem du darueber reden kannst.',
            empathyPoints: 2,
            insightPoints: 3,
            couragePoints: 0,
            nextSceneId: 'home-s3-scene-2',
          },
          {
            id: 'home-s3-c1c',
            text: '"Jeder hat mal schlechte Laune. Sarah soll sich nicht so anstellen."',
            consequence:
              'Du sagst dir, dass Sarah einfach eine Phase hat, und kuemerst dich nicht weiter. Aber die Zeichen werden staerker -- und du ignorierst sie. Auf der Ozean-Insel hast du gelernt, dass Traurigkeit ernst genommen werden muss. Und auf der Regenbogen-Insel, dass jeder Mensch eine eigene Geschichte hat. Zu sagen "Stell dich nicht an" ist das Gegenteil von Empathie. Es ist Blindheit.',
            nextSceneId: 'home-s3-scene-2',
            isWrong: true,
            points: { empathyPoints: 0, insightPoints: 0, couragePoints: 0 },
          },
        ],
      },
      // Scene 2 -- Wie hilft man richtig?
      {
        id: 'home-s3-scene-2',
        text: 'Sarah hat angefangen zu reden. Stueckweise, vorsichtig. Ihre Eltern lassen sich scheiden. Ihr Bruder gibt ihr die Schuld. Sie fuehlt sich unsichtbar. Und dann sagt sie etwas, das dir den Atem nimmt: "Manchmal denke ich, es waere besser, wenn ich einfach nicht mehr da waere." Du erstarrst. Was sagt man darauf? Dein Herz haemmert. Du weisst: Das ist zu gross fuer dich allein.',
        speaker: 'Sarah',
        speakerEmoji: '\u{1F467}',
        choices: [
          {
            id: 'home-s3-c2a',
            text: '"Sarah, ich bin froh, dass du mir das gesagt hast. Aber ich glaube, wir muessen mit jemandem reden, der helfen kann. Zusammen."',
            consequence:
              'Sarah schaut erschrocken. "Nein! Sag niemandem was!" Du bleibst ruhig, obwohl du innerlich zitterst. "Ich verrate dich nicht. Aber das, was du gerade gesagt hast, ist etwas, wobei ein Erwachsener helfen muss. Nicht weil du schwach bist -- sondern weil du Hilfe verdienst." Sarah weint. Aber sie nickt. Das war einer der mutigsten Momente deines Lebens.',
            empathyPoints: 3,
            insightPoints: 2,
            couragePoints: 3,
            nextSceneId: 'home-s3-scene-3',
          },
          {
            id: 'home-s3-c2b',
            text: 'Ihr zuhoeren, bei ihr bleiben, und nach dem Gespraech sofort eine Vertrauensperson informieren.',
            consequence:
              'Du hoerst zu. Du haeltst ihre Hand. Du sagst: "Ich bin hier. Du bist nicht allein." Und dann, als Sarah nach Hause geht, gehst du zu Frau Klein, der Schulsozialarbeiterin. Du erzaehlst, was Sarah gesagt hat. Frau Klein wird ernst, aber auch warm. "Du hast genau das Richtige getan", sagt sie. "Sarah braucht professionelle Hilfe. Und du warst mutig genug, das zu erkennen."',
            empathyPoints: 2,
            insightPoints: 3,
            couragePoints: 3,
            nextSceneId: 'home-s3-scene-3',
          },
          {
            id: 'home-s3-c2c',
            text: '"Das geht mich nichts an. Ich bin nicht ihr Therapeut. Soll sie selber klarkommen."',
            consequence:
              'Du drehst dich um und gehst. Sarah bleibt allein -- mit Gedanken, die viel zu schwer sind fuer eine Person. Und du? Du redest dir ein, dass es dich nichts angeht. Aber auf jeder Insel hast du gelernt: Hinschauen, wenn jemand leidet, ist keine Pflicht -- es ist Menschlichkeit. Wegsehen, wenn jemand sagt "Ich will nicht mehr da sein", kann Folgen haben, die du nie wieder rueckgaengig machen kannst.',
            nextSceneId: 'home-s3-scene-3',
            isWrong: true,
            points: { empathyPoints: 0, insightPoints: 0, couragePoints: 0 },
          },
        ],
      },
      // Scene 3 -- Mit einer Vertrauensperson reden
      {
        id: 'home-s3-scene-3',
        text: 'Frau Klein, die Schulsozialarbeiterin, sitzt dir gegenueber. Sie hat ein ruhiges Buero mit einer Pflanze am Fenster und Postkarten an der Wand. "Erzaehl mir, was los ist", sagt sie. Du merkst, dass du nicht nur ueber Sarah reden willst -- sondern auch ueber dich. Ueber die schlaflosen Naechte. Ueber die Sorgen, die sich anfuehlen wie ein Rucksack voller Steine. "Du darfst auch ueber dich reden", sagt Frau Klein, als haette sie deine Gedanken gelesen. "Denn um fuer andere da zu sein, musst du auch fuer dich da sein."',
        speaker: 'Frau Klein',
        speakerEmoji: '\u{1F469}\u{200D}\u{1F3EB}',
        choices: [
          {
            id: 'home-s3-c3a',
            text: 'Ueber Sarah UND ueber dich reden. Ehrlich sagen, dass dich die Situation ueberfordert.',
            consequence:
              'Du holst tief Luft und sagst: "Ich mache mir grosse Sorgen um Sarah. Aber ich merke auch, dass es mich selbst runterzieht. Ich schlafe schlecht und kann mich nicht konzentrieren." Frau Klein nickt. "Das ist voellig normal. Du bist kein Therapeut -- du bist ein Freund. Und auch Freunde brauchen Unterstuetzung." Sie erklaert dir, dass es Stellen gibt, an die sich Jugendliche wenden koennen. Das Kinder- und Jugendtelefon: 116 111, kostenlos, anonym. "Auch fuer dich", sagt sie.',
            empathyPoints: 2,
            insightPoints: 3,
            couragePoints: 3,
            nextSceneId: 'home-s3-scene-4',
          },
          {
            id: 'home-s3-c3b',
            text: 'Nur ueber Sarah reden. Deine eigenen Probleme sind im Vergleich nicht so wichtig.',
            consequence:
              'Du erzaehlst alles ueber Sarah. Frau Klein hoert aufmerksam zu und verspricht, sich darum zu kuemmern. Aber dann sagt sie etwas Unerwartetes: "Und wie geht es dir damit?" Du zuckst die Schultern. "Mir geht es gut." Frau Klein laechelt sanft. "Ich glaube dir das nicht ganz. Weisst du, was ich oft sehe? Dass die Menschen, die am besten auf andere achten, am schlechtesten auf sich selbst achten. Auch du darfst Hilfe annehmen."',
            empathyPoints: 2,
            insightPoints: 3,
            couragePoints: 1,
            nextSceneId: 'home-s3-scene-4',
          },
          {
            id: 'home-s3-c3c',
            text: '"Mir geht es gut. Ich brauche keine Hilfe. Ich schaffe alles allein."',
            consequence:
              'Frau Klein schaut dich pruefend an. "Bist du sicher?" Du nickst, stehst auf und gehst. Aber auf dem Flur merkst du: Die Last ist immer noch da. Schwerer als vorher, weil du gerade eine Chance auf Entlastung abgelehnt hast. Auf der Berg-Insel hast du gelernt, dass du genug bist. Aber "genug" heisst nicht "allein". Hilfe anzunehmen ist keine Schwaeche -- sie abzulehnen aus Stolz schon.',
            nextSceneId: 'home-s3-scene-4',
            isWrong: true,
            points: { empathyPoints: 0, insightPoints: 0, couragePoints: 0 },
          },
        ],
      },
      // Scene 4 -- Wie man mit Vertrauenspersonen redet (konkrete Werkzeuge)
      {
        id: 'home-s3-scene-4',
        text: 'Frau Klein gibt dir konkrete Tipps fuer die Zukunft: "Wenn du mit einer Vertrauensperson reden moechtest, hilft es, vorher kurz zu ueberlegen: Was moechte ich sagen? Was brauche ich gerade? Und du darfst immer so anfangen: Ich brauche Hilfe mit etwas. Oder: Kann ich Ihnen etwas erzaehlen, das mich belastet?" Sie macht eine Pause. "Und wenn du nicht persoenlich reden kannst: Das Kinder- und Jugendtelefon 116 111 ist kostenlos und anonym. Dort hoert dir jemand zu -- ohne Bewertung." Du nimmst dir alles zu Herzen. Und dann fragt Frau Klein: "Wer sind deine Vertrauenspersonen?"',
        speaker: 'Frau Klein',
        speakerEmoji: '\u{1F469}\u{200D}\u{1F3EB}',
        choices: [
          {
            id: 'home-s3-c4a',
            text: '"Meine Mutter, meine Tante, und... Sie, Frau Klein."',
            consequence:
              'Frau Klein laechelt. "Ich fuehle mich geehrt. Und es ist gut, dass du mehrere Menschen hast. Wenn eine Person mal nicht erreichbar ist, gibt es eine andere. Das ist wie ein Sicherheitsnetz -- je mehr Faeden, desto stabiler." Du merkst: Ein Netzwerk aus Vertrauenspersonen aufzubauen ist kein Zeichen von Schwaeche, sondern von Klugheit.',
            empathyPoints: 2,
            insightPoints: 2,
            couragePoints: 2,
            nextSceneId: 'home-s3-scene-5',
          },
          {
            id: 'home-s3-c4b',
            text: '"Ich weiss nicht genau. Ich rede nicht so gern ueber meine Probleme."',
            consequence:
              'Frau Klein nickt verstaendnisvoll. "Das geht vielen so. Aber weisst du, was ich glaube? Dass du gerade, in diesem Moment, genau das tust -- ueber deine Probleme reden. Und es ist nicht so schlimm, wie du dachtest, oder?" Du denkst nach. Stimmt. Es fuehlt sich sogar ein bisschen leichter an. "Der erste Schritt ist immer der schwerste", sagt sie. "Und den hast du schon gemacht."',
            empathyPoints: 1,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: 'home-s3-scene-5',
          },
          {
            id: 'home-s3-c4c',
            text: '"Ich brauche keine Vertrauenspersonen. Andere Menschen enttaeuschen einen eh nur."',
            consequence:
              'Frau Klein wird still. Dann sagt sie: "Das klingt nach jemandem, der schon mal enttaeuscht wurde. Und das tut mir leid. Aber wenn du alle Menschen ausschliesst, schliesst du auch die aus, die dir helfen wollen." Du zuckst die Schultern, aber ihre Worte treffen einen Nerv. Auf der Garten-Insel hast du gelernt: Vertrauen ist ein Risiko -- aber ohne Vertrauen gibt es keine echte Verbindung. Zynismus schuetzt nicht. Er macht einsam.',
            nextSceneId: 'home-s3-scene-5',
            isWrong: true,
            points: { empathyPoints: 0, insightPoints: 0, couragePoints: 0 },
          },
        ],
      },
      // Scene 5 -- Fuer andere da sein UND fuer sich selbst
      {
        id: 'home-s3-scene-5',
        text: 'Auf dem Nachhauseweg fuehlt sich die Welt etwas leichter an. Nicht perfekt -- Sarah geht es immer noch schlecht, und deine Sorgen sind nicht verschwunden. Aber du weisst jetzt: Du musst das nicht allein tragen. Frau Klein kuemmert sich um Sarah. Und du hast gelernt, dass auch du Hilfe annehmen darfst. Der Guide meldet sich ein letztes Mal: "Weisst du, was ich heute an dir bewundert habe? Dass du den Mut hattest, Hilfe zu holen. Fuer Sarah UND fuer dich. Hilfe zu suchen ist kein Zeichen von Schwaeche -- es ist ein Zeichen von Staerke."',
        speaker: 'Guide',
        speakerEmoji: '\u{2728}',
        choices: [
          {
            id: 'home-s3-c5a',
            text: '"Ich bin froh, dass es Menschen wie Frau Klein gibt. Und dass ich jetzt weiss, wie ich um Hilfe bitten kann."',
            consequence:
              'Der Guide nickt. "Merk dir diese Werkzeuge: Vertrauenspersonen benennen. Das Kinder- und Jugendtelefon 116 111 kennen. Und wissen, dass der Satz Ich brauche Hilfe einer der staerksten Saetze ist, die es gibt." Du atmest tief ein. Heute hast du nicht nur Sarah geholfen -- du hast auch dir selbst geholfen. Und das ist die wichtigste Lektion dieses Tages.',
            empathyPoints: 2,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: null,
          },
          {
            id: 'home-s3-c5b',
            text: '"Es war schwer. Aber es fuehlt sich richtig an. Und ich werde jetzt besser auf mich aufpassen."',
            consequence:
              'Der Guide laechelt warm. "Das ist das Gleichgewicht, das man lernen muss: Fuer andere da sein, ohne sich selbst zu vergessen. Du kannst anderen nur helfen, wenn du selbst genug Kraft hast. Wie im Flugzeug: Erst die eigene Sauerstoffmaske, dann die der anderen." Du laechelst. Ab heute kuemerst du dich auch um dich. Weil du es wert bist.',
            empathyPoints: 1,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: null,
          },
          {
            id: 'home-s3-c5c',
            text: '"Das war alles nur ein Gespraech. Im echten Leben aendert sich dadurch sowieso nichts."',
            consequence:
              'Der Guide schuettelt traurig den Kopf. "Du hast gerade etwas Wichtiges getan -- du hast Hilfe geholt, du hast geredet, du hast zugehoert. Und jetzt sagst du, es bringt nichts? Das ist die Stimme der Resignation, nicht der Wahrheit. Auf jeder Insel hast du erlebt, dass kleine Schritte grosse Wirkung haben. Ein Gespraech kann ein Leben veraendern. Deins. Oder das von Sarah. Aber nur, wenn du daran glaubst."',
            nextSceneId: null,
            isWrong: true,
            points: { empathyPoints: 0, insightPoints: 0, couragePoints: 0 },
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Scenario 4: "Deine Superkraft"
  // Teaching: Integration aller Faehigkeiten. Persoenlicher Notfallkoffer.
  // "Du bist staerker, als du denkst. Du hast mehr Werkzeuge, als du weisst.
  // Und du bist nie allein."
  // ---------------------------------------------------------------------------
  {
    id: 'home-scenario-4',
    islandId: 'home' as IslandId,
    title: 'Deine Superkraft',
    description:
      'Die letzte Station deiner Reise. Du blickst zurueck auf alles, was du gelernt hast, und baust dir deinen persoenlichen Notfallkoffer. Denn du bist staerker, als du denkst.',
    scenes: [
      // Scene 1 -- Der Kreis der Inseln
      {
        id: 'home-s4-scene-1',
        text: 'Du stehst auf einem Huegel und schaust ueber das Meer. In der Ferne siehst du sie alle: die Vulkan-Insel, die Ozean-Insel, den Wald, den Berg, den Garten, die Nacht-Insel, die Regenbogen-Insel. Jede hat dich etwas anderes gelehrt. Jede hat einen Teil von dir veraendert. Der Guide steht neben dir. "Weisst du noch, wie du am Anfang warst?", fragt er. "Unsicher, vielleicht ueberfordert, vielleicht ein bisschen aengstlich. Und jetzt schau dich an."',
        speaker: 'Guide',
        speakerEmoji: '\u{2728}',
        choices: [
          {
            id: 'home-s4-c1a',
            text: '"Ich habe auf jeder Insel etwas gelernt. Auf dem Vulkan, mit Wut umzugehen. Im Ozean, Traurigkeit zuzulassen. Im Wald, trotz Angst mutig zu sein."',
            consequence:
              'Der Guide nickt bei jedem Satz. "Weiter." Du ueberlegst: "Auf dem Berg habe ich gelernt, dass ich genug bin. Im Garten, wie Beziehungen funktionieren. In der Nacht, achtsam zu sein. Und auf der Regenbogen-Insel, dass Verschiedenheit etwas Schoenes ist." Der Guide laechelt. "Und all das zusammen -- das ist deine Superkraft."',
            empathyPoints: 2,
            insightPoints: 3,
            couragePoints: 1,
            nextSceneId: 'home-s4-scene-2',
          },
          {
            id: 'home-s4-c1b',
            text: '"Ich bin immer noch nicht perfekt. Ich mache immer noch Fehler."',
            consequence:
              'Der Guide lacht leise. "Natuerlich! Perfekt sein ist nicht das Ziel. Das Ziel ist, bewusst zu handeln, statt nur zu reagieren. Fruether hast du vielleicht geschrien, wenn du wuetend warst. Jetzt atmest du erstmal durch. Frueher hast du vielleicht weggeschaut, wenn jemand Hilfe brauchte. Jetzt schaust du hin. Das sind keine kleinen Veraenderungen -- das sind riesige."',
            empathyPoints: 0,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: 'home-s4-scene-2',
          },
          {
            id: 'home-s4-c1c',
            text: '"Das war alles nur ein Spiel. Im echten Leben hilft das sowieso nicht."',
            consequence:
              'Der Guide wird still. Dann sagt er leise: "Wirklich? War es nur ein Spiel, als du jemandem zugehoert hast, der traurig war? War es nur ein Spiel, als du Nein gesagt hast, obwohl alle Ja gesagt haben? Jede Entscheidung, die du hier getroffen hast, war echt -- weil die Gefuehle dahinter echt waren. Zu sagen, dass nichts zaehlt, ist der einfachste Weg, alles, was du gelernt hast, wegzuwerfen. Und das waere schade."',
            nextSceneId: 'home-s4-scene-2',
            isWrong: true,
            points: { empathyPoints: 0, insightPoints: 0, couragePoints: 0 },
          },
        ],
      },
      // Scene 2 -- Der Notfallkoffer
      {
        id: 'home-s4-scene-2',
        text: 'Der Guide setzt sich ins Gras und sagt: "Jetzt kommt der wichtigste Teil. Du baust dir deinen persoenlichen Notfallkoffer. Nicht aus Holz und Naegeln -- sondern aus allem, was du gelernt hast. Fuer die Tage, die schwer werden. Fuer die Momente, in denen alles zu viel wird." Er legt einen unsichtbaren Koffer vor dich hin. "Was kommt rein?"',
        speaker: 'Guide',
        speakerEmoji: '\u{2728}',
        choices: [
          {
            id: 'home-s4-c2a',
            text: '"Erstens: Atmen. Wenn alles zu viel wird -- viermal einatmen, viermal ausatmen. Das bringt mich zurueck ins Hier und Jetzt."',
            consequence:
              'Der Guide nickt. "Gut. Das ist dein Grundwerkzeug. Es kostet nichts, du hast es immer dabei, und es funktioniert. Die Vulkan-Insel hat dir das beigebracht." Er tut so, als wuerde er etwas in den Koffer legen. "Was noch?"',
            empathyPoints: 0,
            insightPoints: 3,
            couragePoints: 1,
            nextSceneId: 'home-s4-scene-3',
          },
          {
            id: 'home-s4-c2b',
            text: '"Erstens: Meine Vertrauenspersonen. Die Namen und Nummern der Menschen, denen ich vertraue."',
            consequence:
              'Der Guide laechelt. "Das ist vielleicht das wichtigste Werkzeug von allen. Zu wissen, wer an deiner Seite steht. Mama, Papa, Tante, Lehrer, Frau Klein, das Kinder- und Jugendtelefon 116 111. Du bist nie allein -- und dieses Werkzeug erinnert dich daran." Er legt es symbolisch in den Koffer. "Was kommt als Naechstes?"',
            empathyPoints: 2,
            insightPoints: 2,
            couragePoints: 1,
            nextSceneId: 'home-s4-scene-3',
          },
          {
            id: 'home-s4-c2c',
            text: '"Erstens: Gefuehle benennen. Wenn ich weiss, was ich fuehle, kann ich besser damit umgehen."',
            consequence:
              'Der Guide nickt anerkennend. "Absolut. Benennen ist Baendigen, hat mal jemand Kluges gesagt. Wenn du sagst: Ich bin wuetend -- dann bist du nicht mehr nur die Wut. Du bist du, und du FUEHLST Wut. Das ist ein riesiger Unterschied." Er legt das Werkzeug in den Koffer. "Was noch?"',
            empathyPoints: 1,
            insightPoints: 3,
            couragePoints: 0,
            nextSceneId: 'home-s4-scene-3',
          },
        ],
      },
      // Scene 3 -- Den Koffer fuellen
      {
        id: 'home-s4-scene-3',
        text: 'Der Koffer fuellt sich. Atmen. Vertrauenspersonen. Gefuehle benennen. Aber es fehlt noch etwas. Der Guide fragt: "Was tust du, wenn du merkst, dass du fuer einen Freund nicht genug helfen kannst? Wenn etwas zu gross ist fuer dich allein?"',
        speaker: 'Guide',
        speakerEmoji: '\u{2728}',
        choices: [
          {
            id: 'home-s4-c3a',
            text: '"Ich hole einen Erwachsenen dazu. Nicht weil ich es nicht kann -- sondern weil manche Dinge professionelle Hilfe brauchen."',
            consequence:
              'Der Guide sagt: "Genau. Du bist ein Freund, kein Therapeut. Und das ist voellig in Ordnung. Wenn jemand sagt, er will nicht mehr leben, oder wenn jemand sich selbst verletzt, oder wenn du das Gefuehl hast, dass es wirklich ernst ist -- dann ist Hilfe holen das Richtigste, was du tun kannst. Auch wenn die Person sagt: Sag es niemandem. Denn Sicherheit geht vor Geheimnis."',
            empathyPoints: 1,
            insightPoints: 3,
            couragePoints: 3,
            nextSceneId: 'home-s4-scene-4',
          },
          {
            id: 'home-s4-c3b',
            text: '"Ich sage: Ich bin fuer dich da, aber ich kenne jemanden, der dir noch besser helfen kann. Lass uns zusammen hingehen."',
            consequence:
              'Der Guide strahlt. "Das ist perfekt. Du laesst die Person nicht allein, UND du holst professionelle Hilfe. Das zeigt: Du kuemmerst dich, du nimmst es ernst, und du kennst deine Grenzen. Dieses Werkzeug -- zu wissen, wann etwas groesser ist als du -- ist eines der reifsten, das es gibt."',
            empathyPoints: 3,
            insightPoints: 2,
            couragePoints: 2,
            nextSceneId: 'home-s4-scene-4',
          },
        ],
      },
      // Scene 4 -- Der Mut-Satz
      {
        id: 'home-s4-scene-4',
        text: 'Der Guide sagt: "Noch ein letztes Werkzeug. Das wichtigste vielleicht. Ein Satz, den du dir selbst sagst, wenn alles dunkel wirkt. Dein persoenlicher Mut-Satz. Etwas, das du wirklich glaubst und das dich daran erinnert, wer du bist." Er schaut dich an. "Was ist dein Satz?"',
        speaker: 'Guide',
        speakerEmoji: '\u{2728}',
        choices: [
          {
            id: 'home-s4-c4a',
            text: '"Ich bin staerker, als ich denke. Ich habe mehr Werkzeuge, als ich weiss. Und ich bin nie allein."',
            consequence:
              'Der Guide schliesst die Augen und laechelt. "Das ist dein Satz. Merk ihn dir. Schreib ihn auf. Kleb ihn an den Spiegel. Sag ihn dir, wenn du aufwachst und die Welt sich zu gross anfuehlt." Er legt den Satz in den Koffer. "Dein Notfallkoffer ist fertig. Er ist nicht schwer -- aber er ist maechtig."',
            empathyPoints: 1,
            insightPoints: 3,
            couragePoints: 3,
            nextSceneId: 'home-s4-scene-5',
          },
          {
            id: 'home-s4-c4b',
            text: '"Schlechte Tage gehen vorbei. Und ich habe schon schlimmere ueberstanden."',
            consequence:
              'Der Guide nickt. "Das ist ein Satz voller Wahrheit. Denn schau zurueck: Jeder schwierige Moment, jeder schmerzhafte Tag, den du hattest -- du bist noch hier. Du hast jeden einzelnen ueberlebt. Und das wirst du auch in Zukunft." Er legt den Satz vorsichtig in den Koffer. "Bereit fuer den letzten Schritt?"',
            empathyPoints: 0,
            insightPoints: 3,
            couragePoints: 3,
            nextSceneId: 'home-s4-scene-5',
          },
          {
            id: 'home-s4-c4c',
            text: '"Es ist okay, nicht okay zu sein. Aber ich bleibe nicht stehen -- ich hole mir Hilfe und gehe weiter."',
            consequence:
              'Der Guide sagt leise: "Das ist einer der klügsten Saetze, die ich je gehoert habe. Er verbindet Selbstakzeptanz mit Handlung. Du erkennst an, dass es schwer ist -- und trotzdem gehst du weiter. Nicht allein, sondern mit Hilfe." Er legt den Satz in den Koffer. "Dein Notfallkoffer ist komplett."',
            empathyPoints: 1,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: 'home-s4-scene-5',
          },
        ],
      },
      // Scene 5 -- Der Abschied und Aufbruch
      {
        id: 'home-s4-scene-5',
        text: 'Der Guide steht auf und schaut dich an. Um euch herum leuchtet die Heimat-Insel in warmen Farben. "Du hast die Reise geschafft", sagt er. "Acht Inseln. Dutzende Entscheidungen. Hunderte von Momenten, in denen du gewachsen bist. Und jetzt gehst du zurueck ins echte Leben -- mit einem vollen Werkzeugkoffer und dem Wissen, dass du nie allein bist." Er streckt dir die Hand hin. "Ich bin stolz auf dich. Und weisst du, wer noch stolz auf dich sein sollte?"',
        speaker: 'Guide',
        speakerEmoji: '\u{2728}',
        choices: [
          {
            id: 'home-s4-c5a',
            text: '"Ich selbst."',
            consequence:
              'Der Guide drueckt deine Hand und laechelt. "Genau. Du selbst. Du bist staerker, als du denkst. Du hast mehr Werkzeuge, als du weisst. Und du bist nie allein. Vergiss das nie." Das Licht der Inseln flackert ein letztes Mal auf, und du spuerst eine Waerme in deiner Brust, die bleibt. Die Reise endet hier -- aber alles, was du gelernt hast, traegst du fuer immer in dir. Und das naechste Abenteuer? Das ist dein Leben. Und du bist bereit.',
            empathyPoints: 2,
            insightPoints: 3,
            couragePoints: 3,
            nextSceneId: null,
          },
          {
            id: 'home-s4-c5b',
            text: '"Alle, die mich auf dem Weg begleitet haben. Und ich bin stolz auf sie."',
            consequence:
              'Der Guide bekommt feuchte Augen. "Das zeigt, wie viel Empathie in dir steckt. Du denkst an die anderen, selbst in diesem Moment. Aber vergiss nicht: Auch du verdienst Stolz. Auf jede mutige Entscheidung, jedes ehrliche Gespraech, jeden Moment, in dem du hingeschaut hast, statt wegzuschauen." Das Licht huellt euch beide ein. Die Reise ist vorbei -- aber was bleibt, ist alles, was du geworden bist. Du bist staerker, als du denkst. Du hast mehr Werkzeuge, als du weisst. Und du bist nie allein.',
            empathyPoints: 3,
            insightPoints: 2,
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
  // Card 1 -- From Volcano Island (Anger Management)
  {
    id: 'home-wisdom-1',
    islandId: 'home' as IslandId,
    text: 'Wut ist nicht dein Feind -- sie ist ein Signal. Lerne, sie zu hoeren, statt ihr zu gehorchen. Durchatmen, benennen, handeln.',
    category: 'emotion',
    collected: false,
  },
  // Card 2 -- From Ocean Island (Grief / Sadness)
  {
    id: 'home-wisdom-2',
    islandId: 'home' as IslandId,
    text: 'Traurigkeit zuzulassen ist staerker, als sie zu verdraengen. Traenen sind kein Zeichen von Schwaeche -- sie sind ein Zeichen, dass dir etwas wichtig ist.',
    category: 'emotion',
    collected: false,
  },
  // Card 3 -- From Forest Island (Fear / Courage)
  {
    id: 'home-wisdom-3',
    islandId: 'home' as IslandId,
    text: 'Mut bedeutet nicht, keine Angst zu haben. Mut bedeutet, Angst zu fuehlen und trotzdem das Richtige zu tun.',
    category: 'courage',
    collected: false,
  },
  // Card 4 -- From Mountain Island (Self-Worth)
  {
    id: 'home-wisdom-4',
    islandId: 'home' as IslandId,
    text: 'Du bist genug. Genau so, wie du bist. Nicht erst, wenn du perfekt bist -- sondern jetzt, mit all deinen Ecken und Kanten.',
    category: 'insight',
    collected: false,
  },
  // Card 5 -- From Garden Island (Relationships)
  {
    id: 'home-wisdom-5',
    islandId: 'home' as IslandId,
    text: 'Beziehungen sind wie Gaerten: Sie brauchen Pflege, Geduld und ehrliche Worte. Und manchmal muss man auch Unkraut jaeten -- also ansprechen, was nicht stimmt.',
    category: 'strategy',
    collected: false,
  },
  // Card 6 -- From Night Island (Mindfulness / Digital Balance)
  {
    id: 'home-wisdom-6',
    islandId: 'home' as IslandId,
    text: 'In der Stille findest du dich selbst. Schalte manchmal alles aus -- Handy, Geraeusche, Erwartungen. Was bleibt, bist du. Und du bist mehr als genug.',
    category: 'strategy',
    collected: false,
  },
  // Card 7 -- From Rainbow Island (Diversity / Identity)
  {
    id: 'home-wisdom-7',
    islandId: 'home' as IslandId,
    text: 'Jeder Mensch ist anders -- und genau das macht die Welt bunt. Verschieden sein ist kein Problem. Es ist eine Superkraft.',
    category: 'insight',
    collected: false,
  },
  // Card 8 -- From Home Island (Integration / Transfer)
  {
    id: 'home-wisdom-8',
    islandId: 'home' as IslandId,
    text: 'Du bist staerker, als du denkst. Du hast mehr Werkzeuge, als du weisst. Und du bist nie allein. Merk dir das -- fuer jeden Tag, der kommt.',
    category: 'courage',
    collected: false,
  },
];

// =============================================================================
// 3. ACTIVITIES
// =============================================================================

export const homeActivities: Activity[] = [
  // ---------------------------------------------------------------------------
  // Activity 1: Mein Notfallkoffer (Personal Emergency Kit)
  // ---------------------------------------------------------------------------
  {
    id: 'home-activity-1',
    islandId: 'home' as IslandId,
    type: 'creative',
    title: 'Mein persoenlicher Notfallkoffer',
    description:
      'Erstelle deinen persoenlichen Notfallkoffer -- eine Sammlung von Strategien, Kontakten und Dingen, die dir an schwierigen Tagen helfen. Schreibe alles auf eine Karte, die du immer bei dir tragen kannst. Der Koffer enthaelt: deine Vertrauenspersonen (mit Kontaktdaten), deine besten Strategien (Atmen, Tagebuch, Bewegung, Musik), deinen persoenlichen Mut-Satz, und die Nummer des Kinder- und Jugendtelefons: 116 111 (kostenlos, anonym). Gestalte die Karte so, dass sie dich an deine Staerke erinnert.',
    completed: false,
  },
  // ---------------------------------------------------------------------------
  // Activity 2: Meine Reise -- Tagebuchreflexion (Journal Reflection)
  // ---------------------------------------------------------------------------
  {
    id: 'home-activity-2',
    islandId: 'home' as IslandId,
    type: 'journal',
    title: 'Meine Reise -- Tagebuchreflexion',
    description:
      'Schreibe einen ausfuehrlichen Tagebucheintrag ueber deine gesamte Reise durch die Inneren Welten. Beantworte diese Fragen ehrlich: Was habe ich ueber mich selbst gelernt? Welche Insel hat mich am meisten beruehrt und warum? Was war der schwierigste Moment -- und wie bin ich damit umgegangen? Was hat sich in meinem Alltag veraendert, seit ich diese Reise begonnen habe? Welches Werkzeug benutze ich am haeufigsten? Worauf bin ich stolz? Und was moechte ich noch lernen?',
    completed: false,
  },
  // ---------------------------------------------------------------------------
  // Activity 3: Mein Ziele-Kompass (Future Goals Exercise)
  // ---------------------------------------------------------------------------
  {
    id: 'home-activity-3',
    islandId: 'home' as IslandId,
    type: 'assessment',
    title: 'Mein Ziele-Kompass',
    description:
      'Setze dir drei persoenliche Ziele fuer die naechsten Wochen: ein Ziel fuer den Umgang mit deinen Gefuehlen (z.B. "Ich moechte meine Wut oefter benennen, statt sie rauszulassen"), ein Ziel fuer Beziehungen (z.B. "Ich moechte einmal pro Woche jemandem sagen, was ich an ihm schaetze"), und ein Ziel fuer dich selbst (z.B. "Ich moechte mir jeden Tag fuenf Minuten Stille goennen"). Schreibe fuer jedes Ziel den ersten konkreten Schritt auf, den du morgen tun kannst. Und setze dir einen Termin in zwei Wochen, um zurueckzuschauen: Was hat funktioniert? Was nicht? Und was ist das naechste Ziel?',
    completed: false,
  },
  // ---------------------------------------------------------------------------
  // Activity 4: Dankbarkeitsbrief (Gratitude Letter)
  // ---------------------------------------------------------------------------
  {
    id: 'home-activity-4',
    islandId: 'home' as IslandId,
    type: 'reflection',
    title: 'Dankbarkeitsbrief',
    description:
      'Schreibe einen Brief an eine Person, die dir wichtig ist -- jemand, der dir geholfen hat, der an dich geglaubt hat, oder der einfach fuer dich da war. Du musst den Brief nicht abschicken (aber du kannst). Schreibe ehrlich, was diese Person fuer dich bedeutet. Was hat sie getan, das dir geholfen hat? Was wuerdest du ihr gerne sagen, was du vielleicht noch nie laut gesagt hast? Dieser Brief ist ein Werkzeug fuer dich: Dankbarkeit auszudruecken macht nicht nur den anderen gluecklich -- es staerkt auch dich selbst. Forschung zeigt, dass Dankbarkeit eines der staerksten Werkzeuge fuer emotionales Wohlbefinden ist.',
    completed: false,
  },
];

// =============================================================================
// 4. NPCs
// =============================================================================

export const homeNPCs: never[] = [];
