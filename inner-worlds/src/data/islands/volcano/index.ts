// @ts-nocheck
import type { Scenario, WisdomCard, Activity, IslandId } from '../../../types';

// =============================================================================
// Vulkaninsel - Wut & Emotionsregulation (Anger Management)
// Therapeutisches Lernspiel für Jugendliche 10-15, CDSE Luxemburg
// =============================================================================
//
// THERAPEUTISCHER HINTERGRUND:
// Die Vulkaninsel behandelt eines der häufigsten Themen bei Jugendlichen
// mit sozio-emotionalen Schwierigkeiten: den Umgang mit Wut.
//
// Die vier Kapitel bauen progressiv aufeinander auf:
//   Kapitel 1 - ERKENNEN: Körperliche Warnzeichen der Wut identifizieren
//   Kapitel 2 - VERSTEHEN: Wut als Sekundäremotion (Eisberg-Modell)
//   Kapitel 3 - HANDELN: Konkrete Werkzeuge (Atmen, Ich-Botschaften)
//   Kapitel 4 - ANWENDEN: Wut konstruktiv einsetzen (Selbstbehauptung)
//
// Alle Inhalte sind in altersgerechtem Deutsch verfasst und folgen
// evidenzbasierten Ansätzen der kognitiven Verhaltenstherapie (KVT),
// der Gewaltfreien Kommunikation (GFK) nach Rosenberg und der
// Emotionsfokussierten Therapie (EFT).
// =============================================================================

// -----------------------------------------------------------------------------
// NPCs - Nicht-Spieler-Charaktere
// Auf dieser Insel werden NPCs über die Szenarien direkt eingeführt.
// Die Hauptfigur Ash (14 Jahre) dient als Spiegel für die Spieler.
// -----------------------------------------------------------------------------
export const volcanoNPCs: any[] = [];

// =============================================================================
// SZENARIEN
// 4 Kapitel mit progressivem Aufbau:
//   1. Wut erkennen (körperliche Zeichen, Kampf-oder-Flucht)
//   2. Wut als Sekundäremotion (der Eisberg unter der Oberfläche)
//   3. Gesunde Wut-Ausdrucksformen (Ich-Botschaften, Atmen, Abstand)
//   4. Wut konstruktiv nutzen (Selbstbehauptung, gegen Mobbing einstehen)
// =============================================================================

export const volcanoScenarios: Scenario[] = [
  // =========================================================================
  // KAPITEL 1: Wenn der Vulkan brodelt
  // Kernthema: Wut erkennen - körperliche Warnsignale verstehen
  // Lernziel: Spieler lernen die Kampf-oder-Flucht-Reaktion kennen und
  //           verstehen, warum der Körper bei Wut so reagiert.
  // Psychologische Basis: Amygdala-Aktivierung, Stressreaktion,
  //                       emotionale Validierung
  // =========================================================================
  {
    id: 'volcano-scenario-1',
    islandId: 'volcano' as IslandId,
    title: 'Wenn der Vulkan brodelt',
    description: 'Du kommst auf der Vulkaninsel an und triffst Ash, der gerade die Kontrolle verliert. Lerne, die Zeichen der Wut zu erkennen.',
    scenes: [
      {
        id: 'v1-s1',
        speaker: 'Erzähler',
        speakerEmoji: '🌋',
        text: 'Die Vulkaninsel empfängt dich mit heißer Luft und dem Geruch von Schwefel. Der Boden unter deinen Füßen vibriert leicht - als hätte die Insel selbst einen Herzschlag. In der Ferne siehst du den Krater rauchen. Der Himmel leuchtet in Orange- und Rottönen. Als du einen schmalen Pfad zwischen schwarzen Felsen entlang gehst, hörst du plötzlich lautes Schreien. Zwischen den Felsen steht ein Junge - vielleicht 14 Jahre alt, mit dunklen Haaren und einem zerrissenen T-Shirt. Er heißt Ash. Seine Fäuste sind geballt, sein Gesicht ist rot angelaufen, und er tritt mit voller Wucht gegen einen Stein. "DAS IST SO UNFAIR!", brüllt er so laut, dass seine Stimme von den Felswänden widerhallt. "ICH HABE NICHTS GEMACHT UND TROTZDEM WERDE ICH BESTRAFT!" Er hat dich noch nicht bemerkt. Der Vulkan hinter ihm stößt eine dunkle Rauchwolke aus, als würde er auf Ashs Emotionen reagieren.',
        choices: [
          {
            id: 'v1-s1-c1',
            text: 'Sofort zu ihm gehen: "Hey, was ist los?"',
            consequence: 'Dein Mut zeigt sich in deiner direkten Reaktion. Manchmal braucht es jemanden, der den ersten Schritt macht - jemanden, der nicht wegschaut, wenn ein anderer Mensch leidet. Aber Vorsicht: Wenn jemand gerade sehr wütend ist, kann plötzliches Ansprechen die Situation auch verschärfen. Die Psychologie lehrt uns: Der Timing ist wichtig. Im besten Fall gibst du dem anderen einen Moment, bevor du eingreifst.',
            nextSceneId: 'v1-s2',
            points: { empathyPoints: 1, insightPoints: 1, couragePoints: 3 }
          },
          {
            id: 'v1-s1-c2',
            text: 'Erst mal aus der Ferne beobachten und die Situation einschätzen',
            consequence: 'Kluge Entscheidung. Wenn jemand gerade mitten in einem Wutausbruch steckt, ist es oft besser, erst zu beobachten. In der Psychologie nennt man das "emotionale Sicherheit" - du schützt dich selbst und gibst dem anderen Raum, bevor du eingreifst.',
            nextSceneId: 'v1-s2',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'v1-s1-c3',
            text: 'Innerlich mitfühlen - du kennst das Gefühl, wenn etwas unfair ist',
            consequence: 'Du spürst sofort Mitgefühl. Das ist eine wichtige Fähigkeit: Empathie bedeutet, die Gefühle anderer nachzuempfinden, ohne sie selbst zu übernehmen. Du erkennst Ashs Schmerz, weil du ähnliche Situationen kennst.',
            nextSceneId: 'v1-s2',
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'v1-s2',
        speaker: 'Ash',
        speakerEmoji: '😡',
        text: 'Ash bemerkt dich und dreht sich ruckartig um. Sein Gesicht ist knallrot, seine Hände zittern, und du kannst sehen, wie sein Brustkorb sich schnell hebt und senkt. "Was glotzt du so?!", faucht er. "Der Lehrer hat mir verboten, am Vulkanfest teilzunehmen! Dabei war ICH es gar nicht, der den Feuerzauber ruiniert hat! Das war Leon! Aber niemand glaubt mir!" Er atmet schwer. Du bemerkst, wie sein ganzer Körper angespannt ist - die Schultern hochgezogen, der Kiefer zusammengepresst.',
        choices: [
          {
            id: 'v1-s2-c1',
            text: '"Das klingt wirklich unfair. Ich würde auch wütend sein."',
            consequence: 'Du bestätigst sein Gefühl, ohne die Situation zu bewerten. In der Psychologie heißt das "Validierung". Wenn jemand merkt, dass sein Gefühl akzeptiert wird, beruhigt sich das Nervensystem oft ganz von selbst. Du sagst nicht "beruhig dich" - du sagst "ich verstehe dich".',
            nextSceneId: 'v1-s3',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 0 }
          },
          {
            id: 'v1-s2-c2',
            text: '"Wow, du bist gerade richtig aufgebracht. Hast du mal geschaut, wie dein Körper sich anfühlt?"',
            consequence: 'Eine sehr kluge Frage! Wenn wir wütend werden, schaltet unser Gehirn in den Kampf-oder-Flucht-Modus. Das bedeutet: Dein Herz schlägt schneller, deine Muskeln spannen sich an, dein Gesicht wird heiß, und deine Fäuste ballen sich automatisch. Diese körperlichen Zeichen zu erkennen ist der erste Schritt, um Wut zu kontrollieren.',
            nextSceneId: 'v1-s3',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'v1-s2-c3',
            text: '"HEY! Schrei mich nicht an! Ich hab dir nichts getan!"',
            consequence: 'Deine Reaktion ist völlig verständlich - niemand wird gerne angeschrien. Aber hier passiert etwas Interessantes: Ashs Wut hat DEINE Wut ausgelöst. Das nennt man "emotionale Ansteckung". Wut kann wie ein Funke von einer Person zur nächsten springen. Genau deshalb ist es so wichtig zu lernen, diesen Funken zu erkennen, bevor er zum Feuer wird.',
            nextSceneId: 'v1-s3',
            points: { empathyPoints: 0, insightPoints: 2, couragePoints: 3 }
          }
        ]
      },
      {
        id: 'v1-s3',
        speaker: 'Erzähler',
        speakerEmoji: '🌋',
        text: 'Ash hält kurz inne. Sein Atem geht immer noch schnell, aber er schaut dich jetzt richtig an. "Sorry", murmelt er leise. "Ich wollte dich nicht anschreien." Er setzt sich auf einen Felsen und vergräbt das Gesicht in den Händen. "Ich weiß nicht, was mit mir los ist. Immer wenn so was passiert, werde ich so... so..." Er ballt die Fäuste und öffnet sie wieder. "Es fühlt sich an, als würde in meinem Bauch ein Vulkan ausbrechen. Alles wird heiß und laut und ich kann nicht mehr denken."',
        choices: [
          {
            id: 'v1-s3-c1',
            text: '"Was du beschreibst, hat einen Namen. Das ist die Kampf-oder-Flucht-Reaktion."',
            consequence: 'Genau richtig! Was Ash beschreibt, ist die natürliche Stressreaktion des Körpers, die schon seit Jahrtausenden in uns steckt. Dein Gehirn - genauer gesagt die Amygdala, das "Alarmsystem" im Inneren deines Kopfes - erkennt eine Bedrohung und bereitet deinen Körper darauf vor, zu kämpfen oder zu fliehen. Deshalb wird alles heiß, das Herz rast, die Muskeln spannen sich an, und klares Denken wird schwierig, weil das Blut aus dem Denkhirn (dem präfrontalen Kortex) in die Muskeln geleitet wird. Das ist nicht Ashs Schuld - es ist Biologie! Und das Beste: Man kann lernen, diesen Mechanismus zu beeinflussen.',
            nextSceneId: 'v1-s4',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'v1-s3-c2',
            text: 'Neben ihn setzen und schweigen - manchmal braucht man einfach jemanden, der da ist',
            consequence: 'Manchmal sind Worte nicht nötig - und können sogar stören. Deine bloße Anwesenheit sagt Ash: "Du bist nicht allein. Du musst nichts erklären. Ich bin einfach hier." In der Psychologie nennt man das "Co-Regulation": Die ruhige Präsenz einer anderen Person kann das aufgewühlte Nervensystem beruhigen. Dein ruhiger Atem, deine entspannte Haltung und dein Schweigen wirken wie ein Anker in einem Sturm aus Emotionen.',
            nextSceneId: 'v1-s4',
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 1 }
          },
          {
            id: 'v1-s3-c3',
            text: '"Ich kenne das. Bei mir fühlt sich Wut an wie ein Gewitter im Kopf."',
            consequence: 'Indem du deine eigene Erfahrung teilst, schaffst du eine Verbindung. Ash merkt: Er ist nicht der Einzige, dem das passiert. Wut ist ein universelles Gefühl - jeder Mensch kennt es. Es in Bilder zu fassen wie "Vulkan" oder "Gewitter" hilft, das Gefühl besser zu verstehen und darüber zu sprechen.',
            nextSceneId: 'v1-s4',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'v1-s4',
        speaker: 'Ash',
        speakerEmoji: '😤',
        text: 'Ash schaut dich überrascht an. "Du... du denkst nicht, dass ich verrückt bin?" Er reibt sich den Nacken. "Alle sagen immer nur: Ash, beruhig dich! Ash, reiß dich zusammen! Als ob ich einen Schalter hätte, den ich einfach umlegen kann." Er steht auf und geht ein paar Schritte. "Weißt du, was das Schlimmste ist? Wenn die Wut dann weg ist, schäme ich mich total. Dann denke ich: Warum konnte ich mich nicht kontrollieren? Was stimmt nicht mit mir?"',
        choices: [
          {
            id: 'v1-s4-c1',
            text: '"Mit dir stimmt alles. Wut ist ein normales Gefühl. Es kommt darauf an, was du DAMIT machst."',
            consequence: 'Das ist eine der wichtigsten Lektionen über Wut: Das Gefühl selbst ist NIEMALS das Problem. Wut ist genauso normal wie Freude oder Traurigkeit. Sie hat sogar einen wichtigen Zweck - sie zeigt uns, wenn eine Grenze überschritten wurde. Das Problem entsteht erst, wenn wir auf ungesunde Weise damit umgehen. Ash ist nicht kaputt - er braucht nur bessere Werkzeuge.',
            nextSceneId: 'v1-s5',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'v1-s4-c2',
            text: '"Sich schämen macht es nur schlimmer, oder? Wie ein Teufelskreis."',
            consequence: 'Du hast einen wichtigen Mechanismus erkannt: Der Scham-Wut-Kreislauf. Man wird wütend, reagiert impulsiv, schämt sich danach, fühlt sich schlecht, und beim nächsten Mal ist die Wut noch größer, weil die Scham dazukommt. Diesen Kreislauf zu durchbrechen ist möglich - und es beginnt damit, sich selbst nicht zu verurteilen.',
            nextSceneId: 'v1-s5',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'v1-s4-c3',
            text: '"Hey, du hast dich gerade bei mir entschuldigt. Das zeigt, dass du mehr Kontrolle hast, als du denkst."',
            consequence: 'Brilliant beobachtet! Ash hat sich entschuldigt - das bedeutet, er KANN reflektieren und Verantwortung übernehmen, selbst nachdem er die Kontrolle verloren hat. Das ist eine enorme Stärke, die er bisher komplett übersehen hat. In der Psychologie nennt man das "selektive Aufmerksamkeit auf das Negative": Wir konzentrieren uns so sehr auf unsere Ausrutscher und Fehler, dass wir unsere Fortschritte nicht sehen. Ash hat bereits mehr Emotionsregulation, als er sich selbst zutraut. Er braucht jemanden, der ihm das zeigt.',
            nextSceneId: 'v1-s5',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'v1-s5',
        speaker: 'Ash',
        speakerEmoji: '🙂',
        text: 'Ash ist still. Dann sagt er leise: "Weißt du was? Noch nie hat jemand so mit mir geredet. Alle sagen mir immer, was ich NICHT machen soll. Aber niemand hat mir je erklärt, WARUM mein Körper das macht." Er schaut zum Vulkan hinauf. Der Rauch ist ruhiger geworden. "Der Vulkan da oben... der ist wie ich, oder? Er brodelt und brodelt, und dann bricht er aus. Aber vielleicht kann man lernen, den Druck vorher abzulassen?" Er sieht dich fragend an. "Bleibst du noch ein bisschen? Ich glaube, ich muss noch ein paar Sachen verstehen."',
        choices: [
          {
            id: 'v1-s5-c1',
            text: '"Klar bleibe ich. Und ja - genau das ist der Schlüssel: den Druck vorher erkennen."',
            consequence: 'Du hast den Kern der Wut-Prävention erfasst. Die körperlichen Warnzeichen - schnelles Herz, heiße Wangen, angespannte Muskeln, geballte Fäuste - sind wie ein Frühwarnsystem. Wer diese Zeichen bei sich selbst erkennt, kann handeln, BEVOR die Wut übernimmt. Das ist keine Schwäche - das ist emotionale Intelligenz.',
            nextSceneId: null,
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'v1-s5-c2',
            text: '"Ich bleibe. Und weißt du was? Ich lerne hier genauso viel wie du."',
            consequence: 'Was für eine ehrliche und verbindende Antwort. Du zeigst Ash, dass Lernen keine Einbahnstraße ist. Indem du zugibst, dass auch du etwas lernst, nimmst du ihm das Gefühl, ein "Problemfall" zu sein. Ihr seid zwei Menschen, die gemeinsam wachsen. Das ist die stärkste Form der Unterstützung.',
            nextSceneId: null,
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 2 }
          },
          {
            id: 'v1-s5-c3',
            text: '"Natürlich. Und der erste Schritt: Lass uns mal aufschreiben, was dein Körper macht, wenn die Wut kommt."',
            consequence: 'Hervorragend! Du schlägst eine konkrete Übung vor. Ein "Körper-Scan" bei Wut ist ein bewährtes Werkzeug in der Therapie: Wo spürst du die Wut zuerst? Im Bauch? In den Fäusten? Im Kiefer? Wer seinen eigenen Körper kennt, kann die Wut frühzeitig erkennen - und dann bewusst entscheiden, wie er reagiert, statt automatisch zu explodieren.',
            nextSceneId: null,
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 2 }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // KAPITEL 2: Das Geheimnis unter der Lava
  // Kernthema: Wut als Sekundäremotion - der Eisberg unter der Oberfläche
  // Lernziel: Spieler verstehen, dass Wut oft Traurigkeit, Angst oder
  //           Hilflosigkeit überdeckt. Ash öffnet sich über die Trennung
  //           seiner Eltern.
  // Psychologische Basis: Sekundäremotionen, Schutzmechanismen,
  //                       Selbstmitgefühl, Eisberg-Modell
  // =========================================================================
  {
    id: 'volcano-scenario-2',
    islandId: 'volcano' as IslandId,
    title: 'Das Geheimnis unter der Lava',
    description: 'Ash öffnet sich und zeigt dir, was sich wirklich unter seiner Wut verbirgt. Lerne, dass Wut oft nur die Oberfläche ist.',
    scenes: [
      {
        id: 'v2-s1',
        speaker: 'Erzähler',
        speakerEmoji: '🌋',
        text: 'Ein paar Tage später triffst du Ash wieder. Er sitzt am Rand eines erkalteten Lavastroms und wirft kleine Steine in die erkaltete schwarze Masse. Heute ist er ruhiger, aber irgendetwas stimmt nicht. Seine Augen sind gerötet, als hätte er nicht geschlafen - oder geweint. Dunkle Ringe liegen unter seinen Augen. "Hey", sagt er, ohne dich anzuschauen. Seine Stimme klingt dünn, fast zerbrechlich. "Ich muss dir was erzählen. Aber... ich hab noch nie jemandem davon erzählt." Er schluckt schwer und dreht einen Stein in den Händen. "Meine Eltern... die trennen sich gerade. Mein Vater ist vor zwei Wochen ausgezogen. Einfach... weg."',
        choices: [
          {
            id: 'v2-s1-c1',
            text: 'Nichts sagen, aber dich neben ihn setzen - zeigen, dass du zuhörst',
            consequence: 'Manchmal ist Schweigen die beste Antwort. Wenn jemand etwas so Schweres teilt, braucht er keinen Ratschlag - er braucht einen sicheren Raum. Indem du einfach da bist, sagst du: "Du kannst reden, wenn du bereit bist. Ich gehe nirgendwohin." Das nennt man aktives Zuhören.',
            nextSceneId: 'v2-s2',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 0 }
          },
          {
            id: 'v2-s1-c2',
            text: '"Das tut mir leid, Ash. Das muss richtig hart für dich sein."',
            consequence: 'Mit diesen Worten zeigst du echtes Mitgefühl. Du versuchst nicht, es "besser zu machen" oder zu sagen "Wird schon wieder". Du anerkennst seinen Schmerz. Das ist wichtig, weil viele Erwachsene oft versuchen, den Schmerz von Jugendlichen kleinzureden: "Das verstehst du noch nicht" oder "Es ist ja nicht so schlimm." Doch - es IST schlimm, und das anzuerkennen hilft.',
            nextSceneId: 'v2-s2',
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 1 }
          },
          {
            id: 'v2-s1-c3',
            text: '"Danke, dass du mir das erzählst. Das braucht Mut."',
            consequence: 'Du erkennst an, wie schwer es für Ash ist, sich zu öffnen. Über schmerzhafte Dinge zu sprechen - besonders als Jugendlicher - erfordert enormen Mut. Indem du das aussprichst, stärkst du Ash. Du zeigst ihm, dass Verletzlichkeit keine Schwäche ist, sondern eine besondere Form von Stärke.',
            nextSceneId: 'v2-s2',
            points: { empathyPoints: 2, insightPoints: 1, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'v2-s2',
        speaker: 'Ash',
        speakerEmoji: '😢',
        text: 'Ash starrt auf den Boden. "Weißt du, warum ich immer so wütend bin?" Seine Stimme ist kaum ein Flüstern. "Weil... weil Wut sich BESSER anfühlt als das andere." Er wischt sich über die Augen. "Wenn ich wütend bin, fühle ich mich stark. Wenn ich traurig bin, fühle ich mich hilflos. Und Hilflosigkeit ist das Schlimmste, was es gibt." Er dreht einen Stein in seinen Händen. "Zu Hause konnte ich nichts tun. Meine Eltern haben gestritten, und ich stand dazwischen und konnte NICHTS machen. Also wurde ich wütend. Weil Wut sich weniger schrecklich anfühlt als... als das."',
        choices: [
          {
            id: 'v2-s2-c1',
            text: '"Wut ist oft nur die Spitze des Eisbergs. Darunter verstecken sich andere Gefühle."',
            consequence: 'Du hast einen der wichtigsten Grundsätze der Emotionspsychologie ausgesprochen. Psychologen nennen Wut häufig eine "Sekundäremotion" - ein Gefühl, das ÜBER einem anderen, verwundbareren Gefühl liegt. Stell dir einen Eisberg vor: Die Spitze, die aus dem Wasser ragt, ist die Wut - sichtbar, laut, kraftvoll. Aber der riesige Teil unter der Oberfläche besteht aus Traurigkeit, Angst, Hilflosigkeit, Scham oder Einsamkeit. Die Wut schützt uns davor, diese schmerzhafteren Gefühle spüren zu müssen. Sie gibt uns eine Illusion von Stärke. Aber nur wenn wir den Mut haben, unter die Oberfläche zu tauchen, können wir wirklich heilen.',
            nextSceneId: 'v2-s3',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 0 }
          },
          {
            id: 'v2-s2-c2',
            text: '"Es ist nicht deine Schuld, Ash. Die Trennung deiner Eltern ist NICHT deine Schuld."',
            consequence: 'Diese Worte sind unglaublich wichtig. Viele Kinder und Jugendliche glauben im Geheimen, dass die Trennung ihrer Eltern irgendwie ihre Schuld ist. Diese falsche Überzeugung kann zu enormer Wut führen - Wut auf sich selbst, die sich dann nach außen richtet. Ash muss hören, und zwar so oft wie nötig: Er ist nicht verantwortlich für die Entscheidungen seiner Eltern.',
            nextSceneId: 'v2-s3',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 1 }
          },
          {
            id: 'v2-s2-c3',
            text: '"Das ergibt total Sinn. Wut gibt dir das Gefühl, dass du etwas tun kannst."',
            consequence: 'Du triffst den Kern. Wut gibt ein Gefühl von Kontrolle und Macht in Situationen, wo man sich eigentlich machtlos fühlt. Das ist ein psychologischer Schutzmechanismus. Er ist nicht "falsch" - er hat Ash sogar geholfen, eine sehr schmerzhafte Zeit zu überstehen. Aber jetzt ist es Zeit, auch die Gefühle darunter anzuschauen.',
            nextSceneId: 'v2-s3',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'v2-s3',
        speaker: 'Ash',
        speakerEmoji: '😢',
        text: 'Ash zittert leicht. "Ich vermisse meinen Vater so sehr", flüstert er. Eine Träne läuft über seine Wange, und diesmal wischt er sie nicht weg. "Aber jedes Mal, wenn ich das fühle, wird es sofort zu Wut. Gegen ihn, weil er gegangen ist. Gegen meine Mutter, weil sie ihn nicht aufgehalten hat. Gegen mich, weil ich nichts tun konnte." Er sieht dich an, und in seinen Augen liegt keine Wut mehr - nur Traurigkeit und Angst. "Was mache ich jetzt mit alldem?"',
        choices: [
          {
            id: 'v2-s3-c1',
            text: '"Du lässt es raus. Nicht als Wut, sondern als das, was es wirklich ist. Und ich bin hier."',
            consequence: 'Du gibst Ash die Erlaubnis, traurig zu sein - und das ist ein unglaublich wertvolles Geschenk. In unserer Gesellschaft lernen besonders Jungen oft: "Wein nicht. Sei stark. Männer zeigen keine Schwäche." Aber diese Botschaften sind falsch und schädlich. Tränen sind kein Zeichen von Schwäche - sie sind die natürliche Art des Körpers, emotionalen Schmerz zu verarbeiten. Wissenschaftliche Studien zeigen, dass Weinen tatsächlich Stresshormone wie Cortisol abbaut und heilend wirkt. Wer nicht weinen darf, muss seine Trauer woanders hinschicken - oft in die Wut.',
            nextSceneId: 'v2-s4',
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 2 }
          },
          {
            id: 'v2-s3-c2',
            text: '"Fühlen. Einfach fühlen. Du musst es nicht lösen. Du musst es nur fühlen dürfen."',
            consequence: 'Das ist eine tiefgreifende Erkenntnis. Wir denken oft, wir müssen unsere Gefühle "lösen" wie ein Matheproblem. Aber Gefühle wollen nicht gelöst werden - sie wollen gefühlt werden. Wenn wir Traurigkeit zulassen, statt sie in Wut umzuwandeln, kann sie durch uns hindurchfließen und mit der Zeit leichter werden. Unterdrückte Gefühle bleiben, gefühlte Gefühle gehen.',
            nextSceneId: 'v2-s4',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 0 }
          },
          {
            id: 'v2-s3-c3',
            text: '"Ash, du bist gerade unglaublich mutig. Die meisten Erwachsenen schaffen nicht, was du gerade tust."',
            consequence: 'Indem du Ashs Verletzlichkeit als Mut anerkennst, drehst du sein Weltbild um. Er dachte, Stärke bedeutet, keine Gefühle zu zeigen. Aber echte Stärke zeigt sich darin, ehrlich zu seinen Gefühlen zu stehen. Ash öffnet sich gerade mehr, als er es je getan hat - und das verdient Respekt.',
            nextSceneId: 'v2-s4',
            points: { empathyPoints: 2, insightPoints: 1, couragePoints: 3 }
          }
        ]
      },
      {
        id: 'v2-s4',
        speaker: 'Erzähler',
        speakerEmoji: '🌋',
        text: 'Ash weint. Richtig weint. Zum ersten Mal seit Monaten. Und etwas Erstaunliches passiert: Der Vulkan, der die ganze Zeit geraucht und gegrollt hat, wird ruhiger. Der Rauch wird dünner, das Beben legt sich. Als ob der Vulkan auf Ashs inneren Zustand reagiert. Nach einer Weile wischt Ash sich die Augen und atmet tief durch. "Das ist komisch", sagt er. "Ich fühle mich leichter. Nicht gut, aber... leichter." Er schaut zum Vulkan. "Der hat auch aufgehört zu grummeln."',
        choices: [
          {
            id: 'v2-s4-c1',
            text: '"Siehst du? Wenn du die Traurigkeit rauslässt, muss die Wut nicht mehr so laut sein."',
            consequence: 'Du hilfst Ash, den Zusammenhang zu verstehen. Wenn die eigentlichen Gefühle - Trauer, Angst, Hilflosigkeit - ausgedrückt werden dürfen, braucht der Körper die Wut nicht mehr als Schutzschild. Das bedeutet nicht, dass Ash nie wieder wütend sein wird. Aber seine Wut wird nicht mehr das einzige Werkzeug sein, das er hat.',
            nextSceneId: 'v2-s5',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 0 }
          },
          {
            id: 'v2-s4-c2',
            text: '"Leichter ist ein guter Anfang. Du musst nicht sofort glücklich sein."',
            consequence: 'Wichtige Worte! Heilung ist kein Lichtschalter. Es gibt keinen magischen Moment, in dem plötzlich alles gut ist. "Leichter" ist ein riesiger Fortschritt. In der Therapie spricht man von kleinen Schritten. Ash muss nicht morgen alles gelöst haben. Er muss nur heute ein bisschen ehrlicher mit sich selbst sein als gestern.',
            nextSceneId: 'v2-s5',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 0 }
          },
          {
            id: 'v2-s4-c3',
            text: '"Der Vulkan reagiert auf dich. Vielleicht zeigt er dir, dass du auf dem richtigen Weg bist."',
            consequence: 'Eine schöne Beobachtung. Der Vulkan als Metapher für Ashs innere Welt: Wenn der innere Druck nachlässt, beruhigt sich auch das Äußere. Im echten Leben funktioniert das ähnlich: Wenn Menschen lernen, ihre wahren Gefühle auszudrücken, verschwinden oft auch körperliche Symptome wie Kopfschmerzen, Bauchschmerzen oder Schlafprobleme.',
            nextSceneId: 'v2-s5',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'v2-s5',
        speaker: 'Ash',
        speakerEmoji: '🙂',
        text: 'Ash steht auf und streckt sich. Er sieht immer noch traurig aus, aber anders als vorher - weniger verkrampft, weniger angespannt. "Ich glaube, ich verstehe jetzt was", sagt er langsam. "Die ganze Zeit war ich wütend auf alle - auf meine Eltern, auf die Lehrer, auf die ganze Welt. Aber eigentlich war ich traurig und hatte Angst. Und weil sich Wut stärker anfühlt als Angst..." Er unterbricht sich und grinst schief. "Mann, ich hätte mir echt eine Menge Stress ersparen können, wenn das mal jemand erklärt hätte."',
        choices: [
          {
            id: 'v2-s5-c1',
            text: '"Das nächste Mal, wenn die Wut kommt, frag dich: Was versteckt sich darunter?"',
            consequence: 'Du gibst Ash ein konkretes Werkzeug mit auf den Weg. Die "Was-steckt-darunter-Frage" ist eine der wirkungsvollsten Techniken in der Emotionsregulation. Wenn die Wut aufsteigt: Stopp. Frage dich - bin ich wirklich wütend? Oder bin ich eigentlich traurig, verletzt, enttäuscht, verängstigt? Allein diese Frage kann den Automatismus der Wut unterbrechen.',
            nextSceneId: null,
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'v2-s5-c2',
            text: '"Sei nicht so streng mit dir. Du hast überlebt, so gut du konntest."',
            consequence: 'Selbstmitgefühl ist eine der wichtigsten Fähigkeiten, die Ash lernen kann. Er hat die Wut nicht "gewählt" - sein Gehirn hat automatisch den Schutzschild hochgefahren, um ihn vor dem Schmerz zu schützen. Das war keine Schwäche, sondern Überlebensstrategie. Jetzt, wo er sicherer ist, kann er lernen, neue Wege zu gehen.',
            nextSceneId: null,
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 0 }
          },
          {
            id: 'v2-s5-c3',
            text: '"Du hast es jetzt verstanden. Und das ist der erste Schritt. Der Rest kommt mit der Zeit."',
            consequence: 'Du normalisierst den Prozess. Selbsterkenntnis ist erst der Anfang - aber ein unglaublich wichtiger. Ash weiß jetzt, dass seine Wut eine Botschaft hat. Er muss nicht alles sofort verändern. Wissen allein verändert schon etwas: Ab jetzt wird er in Momenten der Wut einen leisen Gedanken hören, der fragt: "Ist es wirklich Wut - oder steckt da mehr dahinter?"',
            nextSceneId: null,
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 1 }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // KAPITEL 3: Der Ausbruch
  // Kernthema: Gesunder vs. ungesunder Umgang mit Wut - konkrete Werkzeuge
  // Lernziel: Spieler lernen Ich-Botschaften, Atemtechniken und den
  //           Unterschied zwischen zerstörerischer und schützender Wut.
  // Psychologische Basis: Gewaltfreie Kommunikation (Rosenberg),
  //                       Parasympathikus-Aktivierung, Situationsveränderung,
  //                       Bystander-Effekt
  // =========================================================================
  {
    id: 'volcano-scenario-3',
    islandId: 'volcano' as IslandId,
    title: 'Der Ausbruch',
    description: 'Ein Konflikt eskaliert und du musst entscheiden, wie du mit aufsteigender Wut umgehst. Lerne konkrete Werkzeuge für den Ernstfall.',
    scenes: [
      {
        id: 'v3-s1',
        speaker: 'Erzähler',
        speakerEmoji: '🌋',
        text: 'In der Schule auf der Vulkaninsel gibt es Aufregung. Jemand hat ein hässliches Gerücht über Maya, eine Freundin von Ash, verbreitet: Sie würde heimlich andere Schüler bestehlen. Das stimmt nicht - aber alle reden schon darüber. Maya sitzt allein in einer Ecke und kämpft mit den Tränen. Ash steht vor Leon, dem Gerüchte-Verbreiter, und seine Fäuste ballen sich. "NIMM DAS ZURÜCK!", brüllt Ash. Leon grinst nur: "Warum? Ist doch die Wahrheit." Du spürst, wie auch in DIR die Wut aufsteigt. Das ist so ungerecht!',
        choices: [
          {
            id: 'v3-s1-c1',
            text: 'Tief durchatmen: 4 Sekunden ein, 4 halten, 6 aus. Erst denken, dann handeln.',
            consequence: 'Die 4-4-6-Atemtechnik ist ein echtes Erste-Hilfe-Werkzeug bei Wut - und es ist wissenschaftlich bewiesen, dass sie funktioniert. Durch das langsame Ausatmen (das Ausatmen ist LÄNGER als das Einatmen - das ist der Trick!) aktivierst du den Parasympathikus - den Teil deines Nervensystems, der für Beruhigung zuständig ist. In nur 30 Sekunden senkt sich dein Puls, deine Muskeln entspannen sich, und dein Denkhirn - der präfrontale Kortex - schaltet sich wieder ein. Jetzt kannst du bewusst entscheiden, statt impulsiv zu reagieren. Merke dir: 4 ein, 4 halten, 6 aus.',
            nextSceneId: 'v3-s2',
            points: { empathyPoints: 0, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'v3-s1-c2',
            text: 'Erst zu Maya gehen und fragen, ob es ihr gut geht',
            consequence: 'Du priorisierst die Person, die gerade am meisten leidet. Während Ash und Leon streiten, sitzt Maya allein mit ihrem Schmerz. Dein Mitgefühl sagt dir: Manchmal ist es wichtiger, sich um das Opfer zu kümmern als den Täter zu konfrontieren. Maya braucht gerade jemanden, der an ihrer Seite steht.',
            nextSceneId: 'v3-s2',
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 1 }
          },
          {
            id: 'v3-s1-c3',
            text: 'Ash am Arm festhalten: "Ash, stopp. So löst du das nicht."',
            consequence: 'Du greifst mutig ein, bevor die Situation eskaliert. Das erfordert Mut, weil Ash gerade voller Wut ist und du riskierst, dass er sich auch gegen dich wendet. Aber manchmal muss ein Freund die Bremse sein. Du erinnerst Ash an das, was er gelernt hat - auch wenn er es in diesem Moment vergessen hat.',
            nextSceneId: 'v3-s2',
            points: { empathyPoints: 1, insightPoints: 1, couragePoints: 3 }
          }
        ]
      },
      {
        id: 'v3-s2',
        speaker: 'Ash',
        speakerEmoji: '😡',
        text: 'Ash atmet schwer, aber er hält sich zurück. "Okay, okay", presst er hervor. "Ich... ich weiß, ich soll nicht explodieren. Aber WAS soll ich denn machen?! Leon LÜGT über Maya und alle glauben ihm! Das ist so UNGERECHT!" Seine Augen füllen sich mit Tränen der Frustration. "Wenn ich nichts mache, denken alle, das Gerücht stimmt. Und wenn ich Leon schlage, kriege ICH Ärger. Was auch immer ich mache, ich verliere!" Leon steht immer noch grinsend da.',
        choices: [
          {
            id: 'v3-s2-c1',
            text: '"Es gibt einen Weg zwischen Nichtstun und Zuschlagen: Ich-Botschaften. Sag Leon, wie du dich fühlst."',
            consequence: 'Ich-Botschaften sind eines der mächtigsten Kommunikationswerkzeuge, das die Psychologie kennt - entwickelt vom Psychologen Thomas Gordon und weiterentwickelt durch Marshall Rosenbergs "Gewaltfreie Kommunikation". Statt "DU bist ein Lügner!" (was den anderen sofort in die Defensive treibt und den Konflikt verschärft) sagst du: "ICH fühle mich wütend, WEIL etwas Unwahres über meine Freundin gesagt wird, und ICH WÜNSCHE MIR, dass du damit aufhörst." Der Unterschied ist gewaltig: Du greifst nicht an, du drückst dein Gefühl aus. Du machst dich nicht klein, du machst dich klar. Das ist keine Schwäche - das ist kontrollierte, zielsichere Stärke.',
            nextSceneId: 'v3-s3',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'v3-s2-c2',
            text: '"Wut ist wie Feuer - sie kann zerstören, aber auch schützen. Nutze sie, um für Maya einzustehen, nicht um Leon zu verletzen."',
            consequence: 'Das ist der Kern gesunder Wut-Nutzung. Wut ist Energie - und Energie hat keine Richtung, bis DU ihr eine gibst. Zerstörerische Wut richtet sich auf Vergeltung: "Ich will, dass du leidest!" Schützende Wut richtet sich auf Gerechtigkeit: "Ich will, dass die Wahrheit ans Licht kommt." Gleiche Energie, komplett anderes Ergebnis.',
            nextSceneId: 'v3-s3',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'v3-s2-c3',
            text: '"Komm, wir gehen erst mal weg. Manchmal ist Abstand die klügste Waffe."',
            consequence: 'Sich zu entfernen ist kein Weglaufen - es ist eine der effektivsten Techniken der Emotionsregulation! In der Psychologie nennt man das "Situationsveränderung". Wenn du in einer aufgeheizten Situation bist, kann allein der Ortswechsel deinem Gehirn helfen, vom Kampf-Modus zurück in den Denk-Modus zu schalten. Danach kannst du mit klarem Kopf entscheiden, was du tust.',
            nextSceneId: 'v3-s3',
            points: { empathyPoints: 1, insightPoints: 2, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'v3-s3',
        speaker: 'Erzähler',
        speakerEmoji: '🌋',
        text: 'Ash schließt kurz die Augen. Du siehst, wie er innerlich bis zehn zählt. Dann geht er auf Leon zu - nicht aggressiv, sondern bestimmt. "Leon", sagt er mit fester Stimme. "Was du über Maya sagst, ist gelogen. ICH fühle mich wütend, weil sie meine Freundin ist und du ihr schadest. ICH möchte, dass du aufhörst." Leon ist überrascht - er hatte eine Prügelei erwartet, keine ruhigen Worte. "Und wenn nicht?", fragt Leon unsicher. Ash antwortet: "Dann gehe ich zum Lehrer. Nicht weil ich petze, sondern weil Lügen Konsequenzen haben sollten."',
        choices: [
          {
            id: 'v3-s3-c1',
            text: 'Neben Ash stellen und ihn unterstützen: "Er hat Recht. Und wir sind nicht die Einzigen, die das wissen."',
            consequence: 'Du zeigst Solidarität. Wenn jemand mutig für die Wahrheit einsteht, ist es wichtig, nicht allein zu stehen. Deine Unterstützung verstärkt Ashs Botschaft und zeigt Leon, dass Lügen nicht unbemerkt bleiben. In der Sozialpsychologie nennt man das den "Bystander-Effekt umkehren": Statt zuzuschauen, greifst du ein.',
            nextSceneId: 'v3-s4',
            points: { empathyPoints: 1, insightPoints: 1, couragePoints: 3 }
          },
          {
            id: 'v3-s3-c2',
            text: 'Zu Maya gehen und sie dazuholen: "Maya, du hast das Recht, für dich selbst zu sprechen."',
            consequence: 'Statt FÜR Maya zu sprechen, gibst du IHR die Stimme zurück. Das ist echtes Empowerment. Maya ist die Person, die am meisten betroffen ist, und sie verdient es, Teil der Lösung zu sein. Du behandelst sie nicht als hilfloses Opfer, sondern als jemanden mit eigener Stärke.',
            nextSceneId: 'v3-s4',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 1 }
          },
          {
            id: 'v3-s3-c3',
            text: 'Leon in die Augen schauen: "Warum machst du das eigentlich, Leon? Was hast du davon?"',
            consequence: 'Eine mutige und gleichzeitig einfühlsame Frage. Menschen, die andere verletzen, haben oft selbst einen Grund dafür - Unsicherheit, Eifersucht, eigener Schmerz. Das rechtfertigt nichts, aber es zu verstehen kann helfen, den Kreislauf zu durchbrechen. Wer fragt "Warum?", statt nur "Hör auf!", öffnet eine Tür, die Aggression allein nie öffnen würde.',
            nextSceneId: 'v3-s4',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'v3-s4',
        speaker: 'Leon',
        speakerEmoji: '😟',
        text: 'Leons Grinsen verschwindet. Er schaut zu Boden. "Ich... ich weiß nicht", murmelt er. "Maya hat letzte Woche im Unterricht eine bessere Note bekommen als ich, und meine Mutter hat gesagt... ach, vergiss es." Er sieht plötzlich kleiner aus. Ash starrt ihn an und du siehst, wie etwas in seinem Gesicht sich verändert: Die Wut weicht dem Verständnis. "Du warst eifersüchtig", sagt Ash leise. "Und statt das zuzugeben, hast du Maya schlecht gemacht." Leon nickt kaum merklich.',
        choices: [
          {
            id: 'v3-s4-c1',
            text: '"Leon, das mit der Note und deiner Mutter klingt nach viel Druck. Aber Maya zu verletzen löst das nicht."',
            consequence: 'Du zeigst Verständnis für Leons Situation, ohne sein Verhalten zu entschuldigen. Das ist die reife Art, mit Konflikten umzugehen: Man kann das Verhalten ablehnen und trotzdem den Menschen dahinter sehen. Leon handelte aus eigenem Schmerz heraus - das macht es nicht richtig, aber es macht es verständlich.',
            nextSceneId: 'v3-s5',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 1 }
          },
          {
            id: 'v3-s4-c2',
            text: '"Das war mutig von dir, das zuzugeben. Aber Maya verdient eine Entschuldigung."',
            consequence: 'Du anerkennst Leons Ehrlichkeit UND forderst Verantwortung ein. Das ist ein wichtiges Gleichgewicht: Verständnis zeigen heißt nicht, Konsequenzen aufzuheben. Leon muss verstehen, dass seine Gefühle verständlich sind, aber seine Handlungen trotzdem Schaden angerichtet haben. Eine echte Entschuldigung ist der nächste Schritt.',
            nextSceneId: 'v3-s5',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'v3-s4-c3',
            text: 'Ash ansehen und leise sagen: "Siehst du? Unter seiner Gemeinheit steckte auch was anderes."',
            consequence: 'Du verbindest die Lektion aus Kapitel 2 mit der jetzigen Situation. Nicht nur Ashs Wut hatte einen tieferen Grund - auch Leons Verhalten. Eifersucht, Leistungsdruck, Angst vor Enttäuschung - das sind die wahren Ursachen. Ash erkennt das Muster und versteht zum ersten Mal: Wut als Schutzschild ist nicht sein alleiniges Problem. Es ist menschlich.',
            nextSceneId: 'v3-s5',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'v3-s5',
        speaker: 'Ash',
        speakerEmoji: '🙂',
        text: 'Leon geht zu Maya und entschuldigt sich - leise und unbeholfen, aber ehrlich. Maya nickt, noch sichtlich verletzt, aber sie nimmt die Entschuldigung an. Ash kommt zu dir. "Weißt du, was krass ist?", sagt er. "Vor einer Woche hätte ich Leon die Nase gebrochen. Und dann hätte ICH den Ärger bekommen, Leon wäre das Opfer gewesen, und Maya hätte immer noch gelitten." Er schüttelt den Kopf. "Atmen, Ich-Botschaften, verstehen wollen statt zuschlagen... das klingt so einfach, wenn man es sagt. Aber es hat funktioniert." Er grinst. "Wut ist wie Feuer - sie kann zerstören, aber auch wärmen und schützen. Stimmt\'s?"',
        choices: [
          {
            id: 'v3-s5-c1',
            text: '"Genau. Und du hast heute dein Feuer genutzt, um Maya zu schützen. DAS ist Stärke."',
            consequence: 'Du hilfst Ash, sein neues Bild von Stärke zu festigen. Wahre Stärke ist nicht die Faust, die zuschlägt. Wahre Stärke ist die Faust, die sich öffnet und stattdessen ein Gespräch beginnt. Ash hat heute bewiesen, dass man wütend sein UND respektvoll handeln kann. Das ist eine Fähigkeit, die viele Erwachsene nie lernen.',
            nextSceneId: null,
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'v3-s5-c2',
            text: '"Und das Beste: Du hast nicht nur Maya geholfen, sondern auch Leon. Er hat kapiert, was er falsch gemacht hat."',
            consequence: 'Eine wichtige Perspektive. Gewaltfreie Konfliktlösung hat oft mehr als ein Opfer "gerettet". Leon hätte ohne dieses Gespräch vielleicht weitergemacht und immer mehr Leute verletzt. Durch Ashs ruhige Konfrontation konnte Leon erkennen, was wirklich hinter seinem Verhalten steckte. Gesunde Wut kann heilen - nicht nur den Wütenden, sondern alle Beteiligten.',
            nextSceneId: null,
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 0 }
          },
          {
            id: 'v3-s5-c3',
            text: '"Merk dir die Werkzeuge: Atmen. Ich-Botschaften. Verstehen wollen. Die funktionieren immer."',
            consequence: 'Du fasst die konkreten Werkzeuge zusammen, die Ash (und du!) heute gelernt habt. Erstens: Atmen (4-4-6), um das Denkhirn einzuschalten. Zweitens: Ich-Botschaften statt Du-Vorwürfe. Drittens: Fragen "Was steckt dahinter?" statt sofort zu urteilen. Diese drei Werkzeuge sind wie ein Feuerlöscher, den du immer dabei haben kannst.',
            nextSceneId: null,
            points: { empathyPoints: 0, insightPoints: 3, couragePoints: 2 }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // KAPITEL 4: Die Kraft des Vulkans
  // Kernthema: Wut konstruktiv kanalisieren - Selbstbehauptung lernen
  // Lernziel: Spieler setzen alles Gelernte ein, um gegen Mobbing
  //           einzustehen. Ash zeigt seine Transformation. Wut wird
  //           als Motor für positive Veränderung erfahren.
  // Psychologische Basis: Assertivität (vs. Aggression), Empowerment,
  //                       Perspektivwechsel, Resilienzforschung
  // =========================================================================
  {
    id: 'volcano-scenario-4',
    islandId: 'volcano' as IslandId,
    title: 'Die Kraft des Vulkans',
    description: 'Die letzte Herausforderung: Setze alles ein, was du gelernt hast, um gegen Mobbing einzustehen - mit Stärke und Respekt.',
    scenes: [
      {
        id: 'v4-s1',
        speaker: 'Erzähler',
        speakerEmoji: '🌋',
        text: 'Eine Gruppe älterer Schüler hat begonnen, ein jüngeres Kind namens Lina systematisch auszuschließen. Es hat mit kleinen Sticheleien angefangen, aber inzwischen ist es schlimmer geworden: Sie lachen sie aus, wenn sie im Unterricht spricht, verstecken ihre Sachen, und flüstern laut genug, dass Lina es hören kann: "Die ist so seltsam. Niemand will mit der befreundet sein. Guck dir mal an, was die anhat." Lina hat aufgehört zu reden. Sie sitzt jeden Tag allein am Rand des Pausenhofs, den Blick gesenkt, die Schultern eingezogen, als würde sie versuchen, unsichtbar zu werden. Ash kommt zu dir, und du siehst: Er kocht vor Wut. Seine Fäuste sind geballt, sein Kiefer angespannt. Aber dann tut er etwas, das er vor ein paar Wochen nicht getan hätte - er atmet. "Ich halt das nicht mehr aus", sagt er mit kontrollierter Stimme. "Aber ich weiß: Einfach hinrennen und schreien bringt nichts. Was MACHEN wir?"',
        choices: [
          {
            id: 'v4-s1-c1',
            text: '"Erst zu Lina. Sie muss wissen, dass sie nicht allein ist."',
            consequence: 'Bevor man ein Problem löst, kümmert man sich um den Menschen, der leidet. Lina braucht gerade keine Helden, die in ihrem Namen kämpfen - sie braucht jemanden, der sie sieht und ihr zeigt: "Du bist nicht unsichtbar." In der Mobbingforschung weiß man: Das Schlimmste am Mobbing ist nicht die Tat selbst, sondern das Gefühl, dass niemand hilft.',
            nextSceneId: 'v4-s2',
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 1 }
          },
          {
            id: 'v4-s1-c2',
            text: '"Wir brauchen einen Plan. Wer kann helfen? Wir sammeln Verbündete."',
            consequence: 'Strategisches Denken unter emotionalem Druck - das zeigt echte Reife. Gegen eine Gruppe allein anzutreten ist mutig, aber oft nicht effektiv. Wenn du andere einbeziehst - Freunde, andere Schüler, Vertrauenspersonen - wird aus einem einsamen Protest eine Gemeinschaft, die sagt: "Das akzeptieren wir nicht." Das hat viel mehr Kraft als ein einzelner Wutausbruch.',
            nextSceneId: 'v4-s2',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'v4-s1-c3',
            text: '"Ash, deine Wut ist jetzt RICHTIG. Nutze sie. Aber nutze sie klug."',
            consequence: 'Du erkennst etwas Entscheidendes: Nicht jede Wut muss beruhigt werden. Manche Wut ist BERECHTIGT. Wut über Ungerechtigkeit, über Mobbing, über Ausgrenzung - diese Wut ist ein moralischer Kompass. Sie sagt dir: "Hier stimmt etwas nicht, und du musst handeln." Der Schlüssel ist nicht, die Wut abzuschalten, sondern sie in konstruktives Handeln umzuwandeln.',
            nextSceneId: 'v4-s2',
            points: { empathyPoints: 1, insightPoints: 2, couragePoints: 3 }
          }
        ]
      },
      {
        id: 'v4-s2',
        speaker: 'Ash',
        speakerEmoji: '😤',
        text: 'Ihr geht zusammen zu Lina. Sie schaut euch misstrauisch an. "Was wollt ihr?", fragt sie leise. "Seid ihr auch hier, um euch lustig zu machen?" Ash kniet sich neben sie hin. "Nein", sagt er. "Wir sind hier, weil das, was die anderen machen, nicht okay ist. Und weil ich weiß, wie sich das anfühlt." Lina schaut ihn überrascht an. "Du?" Ash nickt. "Ich war auch mal der, den alle gemieden haben. Und ich war so wütend, dass ich alles nur schlimmer gemacht habe." Er sieht zu dir. "Aber dann hat mir jemand gezeigt, dass es einen anderen Weg gibt."',
        choices: [
          {
            id: 'v4-s2-c1',
            text: '"Lina, du bist nicht das Problem. Die, die dich ausschließen, sind das Problem."',
            consequence: 'Mobbingopfer glauben oft, dass etwas mit IHNEN nicht stimmt: "Ich bin zu seltsam, zu leise, zu anders." Diese Überzeugung einzureißen ist der wichtigste erste Schritt. Mobbing sagt NICHTS über das Opfer aus - es sagt alles über die Täter. Lina muss hören und verstehen: Sie ist nicht kaputt. Die Situation ist kaputt.',
            nextSceneId: 'v4-s3',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 1 }
          },
          {
            id: 'v4-s2-c2',
            text: '"Wir haben einen Plan. Aber zuerst: Was wünschst DU dir, Lina?"',
            consequence: 'Du gibst Lina ihre Stimme zurück. Statt über ihren Kopf hinweg zu entscheiden, fragst du sie, was SIE will. Das ist der Unterschied zwischen "retten" und "unterstützen". Retten nimmt jemandem die Kontrolle. Unterstützen gibt Kontrolle zurück. Lina soll Teil der Lösung sein, nicht nur das Problem, das gelöst wird.',
            nextSceneId: 'v4-s3',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'v4-s2-c3',
            text: '"Ash hat recht. Wir stehen auf deiner Seite. Ab heute bist du nicht mehr allein."',
            consequence: 'Worte wie diese können ein Leben verändern. Studien zur Resilienz zeigen: Ein einziger Mensch, der an dich glaubt und zu dir steht, kann den Unterschied machen zwischen "das überstehe ich" und "ich gehe daran kaputt". Für Lina ist dieses Versprechen nicht nur nett - es könnte der Wendepunkt sein.',
            nextSceneId: 'v4-s3',
            points: { empathyPoints: 2, insightPoints: 0, couragePoints: 3 }
          }
        ]
      },
      {
        id: 'v4-s3',
        speaker: 'Erzähler',
        speakerEmoji: '🌋',
        text: 'Ihr habt einen Plan. Zusammen mit ein paar anderen Schülern, die auch genug hatten, geht ihr auf die Gruppe zu. Ash spricht als Erster, und seine Stimme ist fest, nicht laut. "Was ihr mit Lina macht, ist Mobbing. Und wir akzeptieren das nicht mehr." Die Anführerin der Gruppe, Tara, verschränkt die Arme: "Und was willst du machen? Uns verpetzen?" Die Luft knistert vor Spannung. Du spürst die Wut in deinem Bauch. Gleichzeitig weißt du: Wie du JETZT reagierst, entscheidet alles.',
        choices: [
          {
            id: 'v4-s3-c1',
            text: '"Wir wollen euch nicht verpetzen. Wir wollen, dass ihr versteht, was ihr anrichtet."',
            consequence: 'Du wählst den Weg der Aufklärung statt der Drohung. Indem du die Täter nicht als "böse" behandelst, sondern als Menschen, die die Auswirkungen ihres Handelns nicht sehen, gibst du ihnen die Chance, sich zu ändern. Das ist unglaublich schwer, wenn man wütend ist. Aber es ist auch unglaublich wirkungsvoll. Drohungen erzeugen Trotz. Verständnis erzeugt Nachdenken.',
            nextSceneId: 'v4-s4',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'v4-s3-c2',
            text: '"Tara, stell dir vor, DICH würde jemand jeden Tag so behandeln. Wie würdest du dich fühlen?"',
            consequence: 'Du nutzt die mächtigste Waffe gegen Mobbing: Perspektivwechsel. Mobber sehen ihre Opfer oft nicht als echte Menschen mit echten Gefühlen. Wenn du Tara zwingst, sich in Linas Position zu versetzen, bricht diese Mauer. Das ist nicht Manipulation - das ist Empathie erzeugen. Und Empathie ist der natürliche Feind von Mobbing.',
            nextSceneId: 'v4-s4',
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 2 }
          },
          {
            id: 'v4-s3-c3',
            text: '"Wir holen uns Hilfe von Erwachsenen, wenn nötig. Nicht um zu petzen, sondern weil alle das Recht auf Sicherheit haben."',
            consequence: 'Sich Hilfe von Erwachsenen zu holen ist KEINE Schwäche und kein Petzen. Es ist ein kluger, mutiger Schritt. Du kannst wütend sein UND dir Hilfe holen. Du kannst für jemanden einstehen UND wissen, dass manche Situationen zu groß für dich allein sind. Das ist reife Selbstbehauptung: Du handelst, wo du kannst, und holst Verstärkung, wo du musst.',
            nextSceneId: 'v4-s4',
            points: { empathyPoints: 1, insightPoints: 2, couragePoints: 3 }
          }
        ]
      },
      {
        id: 'v4-s4',
        speaker: 'Tara',
        speakerEmoji: '😶',
        text: 'Tara schweigt. Zum ersten Mal sieht sie unsicher aus. Einer aus ihrer Gruppe, Kai, tritt einen Schritt zurück und murmelt: "Ich wollte eigentlich nie... ich hab nur mitgemacht, weil..." Er verstummt. Die Dynamik hat sich verändert. Ash sagt ruhig: "Ihr müsst jetzt nicht antworten. Aber denkt drüber nach." Er dreht sich zu Lina um, die zum ersten Mal seit Wochen den Kopf hebt. Leise sagt Ash zu dir: "Ich bin so wütend. Aber ich bin auch... stolz? Kann man beides gleichzeitig sein?"',
        choices: [
          {
            id: 'v4-s4-c1',
            text: '"Ja! Du kannst wütend sein UND respektvoll handeln. Das ist wahre Stärke."',
            consequence: 'Das ist die zentrale Botschaft der gesamten Vulkaninsel. Wut und Respekt schließen sich nicht aus - sie können sogar zusammenarbeiten. Man kann empört sein über Ungerechtigkeit und trotzdem würdevoll handeln. Man kann innerlich kochen und trotzdem kluge Worte wählen. Man kann das Feuer in sich spüren und es trotzdem kontrolliert einsetzen. DAS ist die wahre Kraft des Vulkans: Nicht die blinde, zerstörerische Explosion, sondern die fokussierte, kontrollierte Energie, die Berge versetzen und die Welt verändern kann.',
            nextSceneId: 'v4-s5',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'v4-s4-c2',
            text: '"Du hast heute bewiesen, dass Wut eine Superkraft sein kann, wenn du sie richtig einsetzt."',
            consequence: 'Ash hat seine Wut kanalisiert: nicht in eine Faust, sondern in klare Worte und mutiges Handeln. Die gleiche Energie, die früher Dinge zerstört hat, hat heute eine Gemeinschaft in Bewegung gesetzt. In der Geschichte der Menschheit haben alle großen Veränderungen mit gesunder, kanalisierter Wut begonnen - Wut über Ungerechtigkeit, die zu konstruktivem Handeln führte.',
            nextSceneId: 'v4-s5',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'v4-s4-c3',
            text: '"Sieh dir Lina an. Sie lächelt. DAS hast du bewirkt."',
            consequence: 'Manchmal ist die beste Belohnung nicht der Sieg über den Gegner, sondern das Lächeln desjenigen, für den man eingestanden ist. Ash sieht die direkte Auswirkung seines Handelns: Ein Mensch, der sich wieder gesehen und geschützt fühlt. Das ist stärker als jede Revanche. Deine Wut kann Licht in die Dunkelheit bringen, wenn du sie weise einsetzt.',
            nextSceneId: 'v4-s5',
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'v4-s5',
        speaker: 'Ash',
        speakerEmoji: '😊',
        text: 'Ash steht auf einem Felsvorsprung und schaut über die Vulkaninsel. Die Sonne geht unter und taucht alles in warmes Orange und Gold. Lina steht neben ihm - zum ersten Mal seit Langem nicht allein. Sogar ein kleines Lächeln huscht über ihr Gesicht. Der Vulkan hinter euch glüht sanft im Abendlicht - nicht bedrohlich, nicht explosiv, sondern warm und beständig. Wie ein Lagerfeuer, das Wärme gibt, ohne zu verbrennen. "Weißt du, was ich gelernt habe?", sagt Ash zu dir. Seine Stimme ist ruhig, aber voller Überzeugung. "Wut ist nicht mein Feind. Sie war nie mein Feind. Sie war die ganze Zeit eine Botschaft: Etwas stimmt nicht, und du musst etwas tun." Er dreht sich zu dir und zum ersten Mal sieht er nicht wütend, nicht traurig, sondern... friedlich aus. "Danke. Nicht für die Antworten - sondern dafür, dass du mir die richtigen Fragen gestellt hast. Und dafür, dass du geblieben bist."',
        choices: [
          {
            id: 'v4-s5-c1',
            text: '"Du hattest die Antworten die ganze Zeit in dir. Du brauchtest nur jemanden, der zuhört."',
            consequence: 'Die tiefste Wahrheit dieser gesamten Reise: Ash war nie kaputt. Er brauchte keine Reparatur - er brauchte Verständnis, Werkzeuge und einen sicheren Raum, um zu wachsen. Kein Mensch ist "sein Problem". Jeder Mensch hat die Fähigkeit, mit seinen Emotionen klug umzugehen - manchmal braucht es nur jemanden, der an uns glaubt, der uns die richtigen Fragen stellt statt Antworten aufzuzwingen, und der uns zeigt, dass ein anderer Weg möglich ist. DU warst dieser Mensch für Ash. Und vielleicht ist jemand da draußen, der DICH gerade braucht.',
            nextSceneId: null,
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 1 }
          },
          {
            id: 'v4-s5-c2',
            text: '"Vergiss nicht, was du hier gelernt hast: Atmen. Fühlen. Verstehen. Handeln. In dieser Reihenfolge."',
            consequence: 'Du fasst die vier Schritte der gesunden Wut-Verarbeitung zusammen: Erstens ATMEN - den Körper beruhigen. Zweitens FÜHLEN - die Wut wahrnehmen, ohne sie zu unterdrücken. Drittens VERSTEHEN - was steckt dahinter? Was ist die Botschaft? Viertens HANDELN - bewusst und respektvoll. Diese vier Schritte funktionieren in jeder Situation, in jedem Alter, in jedem Konflikt.',
            nextSceneId: null,
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'v4-s5-c3',
            text: '"Die nächste Insel wartet. Aber den Vulkan in dir nimmst du mit - und er wird dir helfen."',
            consequence: 'Der innere Vulkan verschwindet nicht - und das soll er auch gar nicht. Wut bleibt ein Teil von dir, aber ab jetzt ist sie ein Werkzeug, kein Fluch. Du nimmst von dieser Insel mit: Erstens, die Fähigkeit, deine Körpersignale zu lesen und die Wut frühzeitig zu erkennen. Zweitens, das Wissen, dass unter der Wut oft tiefere Gefühle wie Traurigkeit, Angst oder Hilflosigkeit liegen. Drittens, konkrete Techniken - Atmen, Ich-Botschaften, die Stopp-Frage "Was steckt darunter?" Und viertens, den Mut, für dich selbst und für andere einzustehen - mit Stärke UND Respekt. Das ist die wahre, unzerstörbare Kraft des Vulkans.',
            nextSceneId: null,
            points: { empathyPoints: 1, insightPoints: 2, couragePoints: 3 }
          }
        ]
      }
    ]
  }
];

// =============================================================================
// AKTIVITÄTEN
// 4 praktische Übungen für den Alltag:
//   1. Vulkan-Atmung (breathing) - Atemtechnik gegen akute Wut
//   2. Wut-Detektiv (journal) - Auslöser erkennen und Muster finden
//   3. Ich-Botschaften (reflection) - Kommunikation ohne Vorwürfe
//   4. Wut-Profil (assessment) - Selbsteinschätzung und Fortschrittsmessung
// =============================================================================

export const volcanoActivities: Activity[] = [
  {
    id: 'volcano-activity-breathing',
    islandId: 'volcano' as IslandId,
    type: 'breathing',
    title: 'Vulkan-Atmung: Dein Feuerlöscher',
    description: 'Eine Atemübung speziell für Momente, in denen die Wut aufsteigt. Lerne, deinen inneren Vulkan zu beruhigen, bevor er ausbricht. Setze dich bequem hin und folge diesen Schritten: 1) Schließe die Augen. Stelle dir vor, in deinem Bauch glüht heiße Lava - das ist deine Wut. 2) Atme langsam durch die Nase ein und zähle dabei bis 4. Spüre, wie die Lava ansteigt. 3) Halte den Atem an und zähle bis 4. Die Lava wartet am Kraterrand. 4) Atme ganz langsam durch den Mund aus und zähle bis 6. Stelle dir vor, wie kühler Rauch entweicht. 5) Spüre, wie die Lava mit jedem Ausatmen ein bisschen kühler wird. 6) Wiederhole das 5-8 Mal. 7) Zum Abschluss: Lege eine Hand auf deinen Bauch und eine auf dein Herz. Dein Vulkan ist ruhig. Deine Wut ist noch da, aber sie kontrolliert dich nicht mehr - DU kontrollierst sie.',
    completed: false
  },
  {
    id: 'volcano-activity-journal',
    islandId: 'volcano' as IslandId,
    type: 'journal',
    title: 'Wut-Detektiv: Meine Auslöser kennen',
    description: 'Ein Tagebuch-Impuls, der dir hilft, deine persönlichen Wut-Auslöser zu erkennen und Muster zu entdecken. Beantworte diese Fragen ehrlich: 1) Beschreibe die letzte Situation, in der du richtig wütend warst. Was ist genau passiert? 2) Wo in deinem Körper hast du die Wut gespürt? (Bauch, Fäuste, Kiefer, Brust?) 3) Auf einer Skala von 1-10: Wie stark war die Wut? 4) Jetzt die Eisberg-Frage: Was hat sich UNTER der Wut versteckt? Warst du vielleicht auch traurig, verletzt, enttäuscht, verängstigt oder beschämt? 5) Was hast du getan? Bist du stolz auf deine Reaktion? 6) Wenn du eine Zeitmaschine hättest: Was würdest du beim nächsten Mal anders machen? 7) Gibt es ein Muster? Werde ich immer in ähnlichen Situationen wütend? Tipp: Mache diese Übung regelmäßig. Je besser du deine Auslöser kennst, desto besser kannst du dich vorbereiten.',
    completed: false
  },
  {
    id: 'volcano-activity-ich-botschaften',
    islandId: 'volcano' as IslandId,
    type: 'reflection',
    title: 'Ich-Botschaften statt Du-Vorwürfe',
    description: 'Lerne, deine Wut auszudrücken, ohne andere anzugreifen. Ich-Botschaften sind wie ein Schlüssel: Sie öffnen Türen, die Du-Vorwürfe verschließen. So funktioniert die Formel: Statt "DU bist so gemein!" sagst du: "ICH fühle mich verletzt, WEIL du über mich gelacht hast, und ICH WÜNSCHE MIR, dass du damit aufhörst." Übe jetzt mit diesen Situationen: Situation 1 - Dein Bruder nimmt ohne zu fragen deine Sachen. Du-Vorwurf: "Du klaust immer meine Sachen!" Wandle es um in eine Ich-Botschaft. Situation 2 - Ein Freund erzählt dein Geheimnis weiter. Du-Vorwurf: "Du bist der schlechteste Freund überhaupt!" Wandle es um. Situation 3 - Dein Lehrer gibt dir eine unfaire Note. Du-Vorwurf: "Sie sind ungerecht!" Wandle es um. Merke dir die drei Teile: ICH FÜHLE... (Gefühl benennen), WEIL... (Situation beschreiben), und ICH WÜNSCHE MIR... (konkreten Wunsch äußern). Probiere es diese Woche in einer echten Situation aus!',
    completed: false
  },
  {
    id: 'volcano-activity-assessment',
    islandId: 'volcano' as IslandId,
    type: 'assessment',
    title: 'Mein Wut-Profil: Wo stehe ich?',
    description: 'Ein Selbsttest, um herauszufinden, wie du aktuell mit Wut umgehst und wo du dich verbessern kannst. Bewerte dich ehrlich auf einer Skala von 1 (trifft gar nicht zu) bis 5 (trifft voll zu): 1) Ich merke rechtzeitig, wenn ich wütend werde (Körperzeichen). 2) Ich kann benennen, welches Gefühl sich unter meiner Wut versteckt. 3) Ich kann atmen und nachdenken, bevor ich reagiere. 4) Ich benutze Ich-Botschaften statt Vorwürfe. 5) Ich kann wütend sein, ohne andere zu verletzen. 6) Ich weiß, was meine typischen Auslöser sind. 7) Ich kann mich entschuldigen, wenn ich im Zorn jemanden verletzt habe. 8) Ich kann meine Wut nutzen, um für mich oder andere einzustehen. Auswertung: 8-16 Punkte: Du bist am Anfang deiner Reise. Das ist völlig okay! Jeder fängt irgendwo an. 17-28 Punkte: Du bist auf einem guten Weg. Es gibt Bereiche, in denen du schon stark bist, und andere, an denen du arbeiten kannst. 29-40 Punkte: Du gehst sehr reflektiert mit Wut um. Teile dein Wissen mit anderen! Wiederhole diesen Test nach ein paar Wochen und vergleiche deine Ergebnisse.',
    completed: false
  }
];

// =============================================================================
// WEISHEITSKARTEN
// 8 Karten, die zentrale Erkenntnisse der Vulkaninsel zusammenfassen.
// Jede Karte steht für einen Aspekt der Wut-Kompetenz:
//   1. Emotionswissen - Wut als Alarmsignal
//   2. Selbsterkenntnis - Der Eisberg unter der Wut
//   3. Selbstregulation - Der Raum zwischen Reiz und Reaktion
//   4. Emotionsregulation - Feuer kontrollieren, nicht löschen
//   5. Selbstbehauptung - Wut und Respekt vereinen
//   6. Körperbewusstsein - Frühwarnsystem des Körpers
//   7. Kommunikation - Ich-Botschaften als Schlüssel
//   8. Resilienz - Nach dem Ausbruch weitermachen
// =============================================================================

export const volcanoWisdomCards: WisdomCard[] = [
  {
    id: 'volcano-wisdom-1',
    islandId: 'volcano' as IslandId,
    text: 'Wut ist nicht dein Feind. Sie ist ein Alarmsignal deines Körpers, das dir sagt: Eine Grenze wurde überschritten, etwas Wichtiges ist in Gefahr, oder eine Ungerechtigkeit muss angesprochen werden. Höre auf die Botschaft, nicht nur auf den Lärm.',
    category: 'Emotionswissen',
    collected: false
  },
  {
    id: 'volcano-wisdom-2',
    islandId: 'volcano' as IslandId,
    text: 'Wut ist oft nur die Spitze des Eisbergs. Darunter verstecken sich andere Gefühle: Traurigkeit, Angst, Scham, Hilflosigkeit oder Enttäuschung. Wer den Mut hat, unter die Oberfläche zu schauen, findet die wahre Ursache - und den wahren Weg zur Heilung.',
    category: 'Selbsterkenntnis',
    collected: false
  },
  {
    id: 'volcano-wisdom-3',
    islandId: 'volcano' as IslandId,
    text: 'Zwischen dem Moment, in dem die Wut aufsteigt, und deiner Reaktion liegt ein kleiner Raum. In diesem Raum hast du die Macht zu wählen. Atme. Zähle. Geh einen Schritt zurück. Dieser Raum ist deine Freiheit.',
    category: 'Selbstregulation',
    collected: false
  },
  {
    id: 'volcano-wisdom-4',
    islandId: 'volcano' as IslandId,
    text: 'Wut ist wie Feuer: Sie kann ein ganzes Haus niederbrennen oder eine ganze Familie wärmen. Der Unterschied liegt nicht im Feuer selbst, sondern darin, wie du es nutzt. Lerne, dein Feuer zu kontrollieren, statt es zu löschen.',
    category: 'Emotionsregulation',
    collected: false
  },
  {
    id: 'volcano-wisdom-5',
    islandId: 'volcano' as IslandId,
    text: 'Du kannst wütend sein UND respektvoll handeln. Du kannst empört sein UND kluge Worte wählen. Du kannst innerlich kochen UND trotzdem die richtige Entscheidung treffen. Das ist keine Widerspruch - das ist wahre Stärke.',
    category: 'Selbstbehauptung',
    collected: false
  },
  {
    id: 'volcano-wisdom-6',
    islandId: 'volcano' as IslandId,
    text: 'Dein Körper warnt dich, bevor die Wut explodiert: Das Herz rast, die Fäuste ballen sich, das Gesicht wird heiß, der Kiefer presst sich zusammen. Diese Zeichen sind dein Frühwarnsystem. Wer sie erkennt, kann handeln, BEVOR es zu spät ist.',
    category: 'Körperbewusstsein',
    collected: false
  },
  {
    id: 'volcano-wisdom-7',
    islandId: 'volcano' as IslandId,
    text: 'Sage nicht "DU machst mich wütend!" Sage stattdessen: "ICH fühle mich wütend, weil..." Der Unterschied ist riesig. Ich-Botschaften öffnen Türen, Du-Vorwürfe schließen sie. Wer seine Gefühle ausdrückt statt anzugreifen, wird gehört.',
    category: 'Kommunikation',
    collected: false
  },
  {
    id: 'volcano-wisdom-8',
    islandId: 'volcano' as IslandId,
    text: 'Wenn du explodiert bist: Entschuldige dich, lerne daraus, und mach weiter. Ein Ausbruch definiert dich nicht. Deine nächste Entscheidung tut es. Selbst der mächtigste Vulkan hat Ruhephasen - und nach der Lava wächst der fruchtbarste Boden.',
    category: 'Resilienz',
    collected: false
  }
];
