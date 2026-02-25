// @ts-nocheck
// =============================================================================
// Regenbogeninsel (Rainbow Island) – Vielfalt & Zusammenleben
// Inner Worlds – Social-Emotional Learning Game
//
// Insel 7 von 8
// Alle Texte auf Deutsch, lebendig und auf Augenhöhe für 10–15-Jährige.
// Therapeutisch fundiert: Anti-Diskriminierung, Vorurteile, Zivilcourage,
// Inklusion, kulturelle Kompetenz, Zusammenleben in Vielfalt.
// =============================================================================

import type { Scenario, WisdomCard, Activity, IslandId } from '../../../types';

// -----------------------------------------------------------------------------
// Local Types
// -----------------------------------------------------------------------------

interface RainbowActivity extends Activity {
  instructions: string[];
}

const ISLAND_ID = 'rainbow' as IslandId;

// -----------------------------------------------------------------------------
// Thematic Constants
// -----------------------------------------------------------------------------

const CHAPTER_COLORS = {
  chapter1: 'Orange – die Farbe der Neugierde',
  chapter2: 'Gelb – die Farbe der Aufmerksamkeit',
  chapter3: 'Grün – die Farbe des Mutes',
  chapter4: 'Alle Farben – der vollständige Regenbogen',
} as const;

const CORE_THEMES = {
  prejudice: 'Vorurteile erkennen und hinterfragen',
  microaggressions: 'Unsichtbare Ausgrenzung sichtbar machen',
  allyship: 'Den Mut haben, einzugreifen und Verbündete zu sein',
  unity: 'Unterschiede als Stärke feiern und inklusive Räume schaffen',
} as const;

// =============================================================================
// NPCs
// =============================================================================

export const rainbowNPCs: never[] = [];

// =============================================================================
// SCENARIOS
// 4 Kapitel mit progressivem Aufbau:
//   1. Verschiedene Farben – Vorurteile erkennen
//   2. Unsichtbare Mauern – Ausgrenzung sichtbar machen
//   3. Gemeinsam stark – Zivilcourage und Verbündete
//   4. Der Regenbogen entsteht – Einheit in Vielfalt feiern
// =============================================================================

export const rainbowScenarios: Scenario[] = [
  // ---------------------------------------------------------------------------
  // Kapitel 1 – Verschiedene Farben
  // Ein neuer Schüler, Amir, kommt aus Syrien. Die Klasse reagiert
  // unterschiedlich: manche offen, manche misstrauisch. Vorurteile erkennen,
  // erste Eindrücke hinterfragen, kulturelle Sensibilität aufbauen.
  // ---------------------------------------------------------------------------
  {
    id: 'rainbow-scenario-1',
    islandId: ISLAND_ID,
    title: 'Verschiedene Farben',
    description: 'Ein neuer Schüler kommt in die Klasse – und bringt eine ganze Welt mit. Doch nicht alle sind bereit, ihre Tür zu öffnen. Vorurteile sind wie unsichtbare Mauern im Kopf. Könnt ihr sie einreißen?',
    scenes: [
      {
        id: 'r1-s1',
        speaker: 'Erzähler',
        speakerEmoji: '📖',
        text: 'Montag, 8:15 Uhr. Die Regenbogeninsel empfängt euch in einem Klassenzimmer, das aussieht wie ein ganz normaler Schulraum – nur dass die Wände in allen Farben des Regenbogens schimmern. Die Klasse wartet auf den Unterricht. Da geht die Tür auf. Frau Wagner, die Klassenlehrerin, tritt ein – und neben ihr steht ein Junge mit dunklen Haaren und einem etwas unsicheren Lächeln. «Das ist Amir», sagt Frau Wagner. «Er ist 13 und kommt aus Syrien. Er wird ab heute in unserer Klasse sein.» Stille. Dann beginnt das Flüstern. Du hörst jemanden hinter dir murmeln: «Schon wieder einer...»',
        choices: [
          {
            id: 'r1-s1-c1',
            text: 'Aufstehen und Amir begrüßen: «Hey, willkommen! Setz dich neben mich, der Platz ist frei.»',
            consequence: 'Du bist der erste Mensch, der Amir ein Lächeln schenkt. Das braucht Mut – denn alle schauen dich an. Aber manchmal reicht eine einzige freundliche Geste, um die Atmosphäre im ganzen Raum zu verändern. Psychologen nennen das den «Eisbrecher-Effekt»: Wenn eine Person den Anfang macht, trauen sich andere auch. Amir setzt sich neben dich und flüstert: «Danke.» Dieses eine Wort wiegt schwerer als tausend Reden über Willkommenskultur.',
            nextSceneId: 'r1-s2',
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 3 }
          },
          {
            id: 'r1-s1-c2',
            text: 'Abwarten und beobachten, wie die anderen reagieren.',
            consequence: 'Du wartest ab. Das ist menschlich – wir orientieren uns oft an der Gruppe, bevor wir handeln. Das nennt man «soziale Orientierung». Aber Vorsicht: Wenn alle warten, passiert manchmal gar nichts. Und der neue Schüler steht allein vorne.',
            nextSceneId: 'r1-s2',
            points: { empathyPoints: 1, insightPoints: 2, couragePoints: 0 }
          },
          {
            id: 'r1-s1-c3',
            text: 'Leise zur Nachbarin sagen: «Was glaubst du, wo er wirklich herkommt?»',
            consequence: 'Frau Wagner hat gerade gesagt, woher Amir kommt. Trotzdem fragst du nach – als ob die Antwort nicht reichen würde. Das passiert oft unbewusst: Wir suchen nach «mehr Information», weil wir jemanden in eine Schublade sortieren wollen. Das ist kein böser Wille, aber es ist der Anfang von Vorurteilen.',
            nextSceneId: 'r1-s2',
            points: { empathyPoints: 0, insightPoints: 1, couragePoints: 0 }
          },
          {
            id: 'r1-s1-c4',
            text: 'Die Augen verdrehen und murmeln: «Toll, schon wieder einer, der kein Deutsch kann. Die sollen erstmal die Sprache lernen, bevor sie in unsere Klasse kommen.»',
            consequence: 'Du hast gerade über einen Menschen geurteilt, den du noch kein einziges Mal hast sprechen hören. Woher weißt du, ob Amir Deutsch kann oder nicht? Du hast sein Gesicht gesehen und sofort eine Schublade aufgemacht. Das ist ein Vorurteil in Reinform: ein Urteil VOR dem Kennenlernen. Und dein Kommentar sendet eine Botschaft an alle um dich herum: «Dieser Mensch gehört nicht hierher.» Solche Sätze sind wie Gift – sie vergiften die Atmosphäre, noch bevor Amir eine Chance hatte, sich vorzustellen. Menschen, die so empfangen werden, ziehen sich zurück, werden still, fühlen sich wertlos. Nicht weil sie es sind – sondern weil andere es ihnen einreden.',
            nextSceneId: 'r1-s2',
            points: { empathyPoints: 0, insightPoints: 0, couragePoints: 0 },
            isWrong: true
          }
        ]
      },
      {
        id: 'r1-s2',
        speaker: 'Amir',
        speakerEmoji: '🌍',
        text: 'Die Pause beginnt. Amir sitzt allein auf einer Bank im Schulhof und isst sein Brot. Du siehst, wie ein paar Jungs – Max, Leon und Tim – auf ihn zugehen. Max fragt laut: «Hey, Amir! Stimmt es, dass in Syrien überall Krieg ist? Hast du schon mal eine Bombe gesehen?» Amir wird blass. Er öffnet den Mund, aber kein Wort kommt heraus. Leon lacht: «Chill, wir fragen ja nur!» Tim steht daneben und sagt nichts.',
        choices: [
          {
            id: 'r1-s2-c1',
            text: 'Zu den Jungs gehen: «Hey, das ist keine coole Frage. Stellt euch mal vor, jemand würde euch am ersten Tag so was fragen.»',
            consequence: 'Du sprichst es an – direkt, aber ohne Aggression. Das ist Zivilcourage in ihrer reinsten Form. Du stellst keine Regel auf, sondern bittest die anderen, die Perspektive zu wechseln. In der Sozialpsychologie nennt man das «kognitive Empathie-Intervention»: Wenn Menschen sich in jemand anderen hineinversetzen, verändern sich ihre Reaktionen messbar. Max wird kurz rot und murmelt: «Hab ja nur gefragt...» Aber Leon schaut betroffen. Manchmal braucht es nur eine Person, die sagt: «Stopp.»',
            nextSceneId: 'r1-s3',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 3 }
          },
          {
            id: 'r1-s2-c2',
            text: 'Neben Amir setzen und leise fragen: «Alles okay? Die meinen das nicht böse, sie wissen es nur nicht besser.»',
            consequence: 'Du wendest dich an Amir – nicht an die Jungs. Das ist auch wertvoll: Du zeigst ihm, dass er nicht allein ist. Amir atmet durch und sagt: «Danke. Es hilft, wenn jemand einfach da ist.» Aber die Jungs merken nicht, dass ihr Verhalten verletzend war. Manchmal braucht Mitgefühl zwei Richtungen: Trost für den Betroffenen UND eine klare Botschaft an die anderen. Nur eine Seite zu bedienen reicht nicht immer.',
            nextSceneId: 'r1-s3',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 1 }
          },
          {
            id: 'r1-s2-c3',
            text: 'Nichts sagen und weitergehen. Du willst keinen Ärger.',
            consequence: 'Du gehst weiter. Das Gefühl im Bauch sagt dir, dass etwas falsch war – aber der Kopf sagt: «Ist nicht mein Problem.» Psychologen nennen das den «Bystander-Effekt»: Je mehr Leute zuschauen, desto weniger fühlt sich jemand verantwortlich. Der Effekt wurde 1968 erforscht und erklärt, warum in großen Gruppen oft niemand hilft – jeder denkt, der andere wird schon eingreifen. Aber die Wahrheit ist: Schweigen ist keine neutrale Handlung. Wer zuschaut und nichts tut, sendet eine Botschaft – auch an Amir. Und Amir versteht die Botschaft: «Du bist nicht wichtig genug, dass sich jemand einmischt.»',
            nextSceneId: 'r1-s3',
            points: { empathyPoints: 0, insightPoints: 1, couragePoints: 0 }
          },
          {
            id: 'r1-s2-c4',
            text: 'Mitlachen und dazusetzen: «Ja, erzähl mal! Hast du auch ein Kamel gehabt? Und habt ihr in Zelten geschlafen?»',
            consequence: 'Du machst mit – und machst es schlimmer. Deine Fragen reduzieren ein ganzes Land, eine ganze Kultur auf Klischees aus Filmen und Schlagzeilen. Syrien ist eines der ältesten Kulturländer der Welt – mit Universitäten, Städten und Geschichten, die tausende Jahre alt sind. Aber du siehst nur das Bild, das dir Vorurteile liefern. Für Amir ist das nicht lustig. Es ist demütigend. Er wird auf Stereotype reduziert, die nichts mit seinem Leben zu tun haben. Und das Lachen der Gruppe macht es noch schlimmer – denn es zeigt ihm: Hier bin ich nicht Amir. Hier bin ich nur «der Flüchtling aus dem Fernsehen». Stereotypen sind Gefängnisse: Sie sperren Menschen in Bilder ein, die andere für sie gemalt haben.',
            nextSceneId: 'r1-s3',
            points: { empathyPoints: 0, insightPoints: 0, couragePoints: 0 },
            isWrong: true
          }
        ]
      },
      {
        id: 'r1-s3',
        speaker: 'Erzähler',
        speakerEmoji: '📖',
        text: 'Nachmittag. Im Kunstunterricht sollen alle ein Bild malen zum Thema «Mein Zuhause». Amir malt ein Haus mit einem Jasminbusch, einem blauen Himmel und einer großen Familie um einen Tisch. Lisa schaut von ihrem Platz rüber und sagt: «Ich dachte, in Syrien gibt es nur kaputte Häuser.» Amir legt den Pinsel hin. Sein Blick ist nicht wütend – er ist müde. Als hätte er diesen Satz schon hundert Mal gehört. Dann sagt er leise: «Mein Zuhause war schön. Es gibt nicht nur Krieg dort. Es gibt auch Liebe, Musik, gutes Essen und Geschichten.» Die Klasse ist still.',
        choices: [
          {
            id: 'r1-s3-c1',
            text: '«Amir, erzähl uns mehr! Wie sieht dein Viertel aus? Was ist dein Lieblingsessen?»',
            consequence: 'Du zeigst echtes Interesse – nicht aus Mitleid, sondern aus Neugier. Das ist ein riesiger Unterschied. Neugier sagt: «Ich sehe dich als Person, nicht als Opfer.» Amir lächelt zum ersten Mal richtig und erzählt von Falafel, von den Märkten in Damaskus und von seinem Großvater, der Geschichten erzählt hat. Plötzlich ist er nicht mehr «der Neue aus dem Kriegsland» – er ist Amir.',
            nextSceneId: 'r1-s4',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'r1-s3-c2',
            text: 'Zu Lisa sagen: «Das war ziemlich daneben. Du weißt doch gar nichts über Syrien.»',
            consequence: 'Du sagst Lisa direkt, dass ihre Aussage falsch war. Das ist mutig. Aber Vorsicht: Der Ton macht die Musik. Wenn Lisa sich angegriffen fühlt, macht sie vielleicht zu statt auf. Besser wäre: «Lisa, stell dir vor, jemand würde sagen, in Luxemburg gibt es nur Banken und Regen.» Humor und Perspektivwechsel wirken oft stärker als Vorwürfe.',
            nextSceneId: 'r1-s4',
            points: { empathyPoints: 1, insightPoints: 2, couragePoints: 3 }
          },
          {
            id: 'r1-s3-c3',
            text: 'Lisa zustimmen: «Stimmt, im Fernsehen sieht man ja immer nur Ruinen. Amir kann froh sein, dass er jetzt hier ist und nicht mehr dort.»',
            consequence: 'Du wiederholst Lisas Vorurteil und packst noch eines drauf: «Er kann froh sein, dass er hier ist.» Das klingt vielleicht nett – aber es ist herablassend. Du reduzierst Amir auf ein Opfer, das «gerettet» wurde, und sein Herkunftsland auf ein Trümmerfeld. Syrien hat wunderschöne Städte, eine reiche Kultur, Musik, Kunst und Millionen von Menschen, die ihr Land lieben. Niemand verlässt seine Heimat freiwillig – und niemand möchte dafür «dankbar» sein müssen, dass er jetzt anderswo leben darf. Dieser Satz nimmt Amir seine Würde: Er wird vom Menschen zum Bittsteller. Das nennt man «wohlwollende Diskriminierung» – Vorurteile, die sich als Freundlichkeit verkleiden, aber genauso verletzen.',
            nextSceneId: 'r1-s4',
            points: { empathyPoints: 0, insightPoints: 0, couragePoints: 0 },
            isWrong: true
          }
        ]
      },
      {
        id: 'r1-s4',
        speaker: 'Amir',
        speakerEmoji: '🌍',
        text: 'Nach der Schule. Amir steht am Schultor und wartet. Du siehst ihn allein. Er schaut auf sein Handy – vielleicht schreibt er jemandem in seiner alten Heimat. Als er dich bemerkt, steckt er das Handy weg. «Weißt du», sagt er leise, «das Schwierigste am Neuankommen ist nicht die Sprache. Es ist das Gefühl, dass die Leute dich schon beurteilt haben, bevor du den Mund aufmachst. Sie sehen meine Haut, hören meinen Akzent und denken, sie wissen schon alles über mich.» Er schaut dich an. «Aber sie kennen mich gar nicht.»',
        choices: [
          {
            id: 'r1-s4-c1',
            text: '«Du hast recht. Das ist unfair. Und ich will dich kennenlernen – den echten Amir. Was machst du gern?»',
            consequence: 'Du reagierst auf seine Verletzlichkeit mit Offenheit. Das ist genau das, was Vorurteile überwindet: echte Begegnung. Vorurteile – wörtlich «Vor-Urteile» – bedeuten, dass wir urteilen, BEVOR wir jemanden kennen. Der Gegenmittel ist einfach: erst kennenlernen, dann urteilen. Amir erzählt, dass er gern Fußball spielt und Comics zeichnet. Plötzlich habt ihr eine Menge gemeinsam.',
            nextSceneId: 'r1-s5',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'r1-s4-c2',
            text: '«Ich verstehe das Gefühl. Einmal war ich der Neue im Sportverein und wurde wochenlang ignoriert.»',
            consequence: 'Du teilst eine eigene Erfahrung. Das ist wichtig – es zeigt Amir, dass er nicht allein ist. ABER: Pass auf, dass du seine Erfahrung nicht gleichsetzt mit deiner. Neu im Sportverein zu sein ist anders als als Geflüchteter in ein neues Land zu kommen. Empathie heißt nicht «ich weiß genau, wie du dich fühlst», sondern «ich versuche, es zu verstehen». Amir nickt trotzdem. Geteilter Schmerz verbindet – auch wenn er unterschiedlich ist.',
            nextSceneId: 'r1-s5',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'r1-s4-c3',
            text: '«Gib den Leuten Zeit. Am Anfang ist alles komisch, aber das wird schon.»',
            consequence: 'Du meinst es nett – aber dieser Satz legt die ganze Verantwortung auf Amirs Schultern. «Gib ihnen Zeit» heißt übersetzt: «Halt es aus, bis die anderen sich an dich gewöhnt haben.» Aber warum sollte ER sich gedulden, wenn ANDERE das Problem haben? Manchmal sind gut gemeinte Sätze nicht gut genug. Empathie bedeutet auch, ehrlich zu sein statt zu trösten.',
            nextSceneId: 'r1-s5',
            points: { empathyPoints: 1, insightPoints: 1, couragePoints: 0 }
          },
          {
            id: 'r1-s4-c4',
            text: '«Naja, das ist halt so. Die Leute urteilen nach dem Äußeren – das ist normal. Du musst dich einfach besser anpassen, dann hört das auf.»',
            consequence: 'Du sagst Amir, dass ER sich ändern muss – nicht die anderen. Das nennt man «Assimilationsdruck»: Die Erwartung, dass Menschen, die anders aussehen oder klingen, sich der Mehrheit anpassen sollen, damit die Mehrheit sich wohl fühlt. Aber warum sollte Amir seinen Akzent, seine Kultur, sein Aussehen ändern? Das Problem sind nicht seine Unterschiede – das Problem sind die Vorurteile der anderen. Wenn du sagst «pass dich an», sagst du eigentlich: «Versteck, wer du bist, damit wir uns nicht anstrengen müssen.» Das ist nicht Hilfe – das ist Unterdrückung mit einem Lächeln. Amir schaut weg. Dein Satz hat ihm gerade bestätigt, was er befürchtet hat: Hier darf er nur sein, wenn er so tut, als wäre er jemand anderes.',
            nextSceneId: 'r1-s5',
            points: { empathyPoints: 0, insightPoints: 0, couragePoints: 0 },
            isWrong: true
          }
        ]
      },
      {
        id: 'r1-s5',
        speaker: 'Erzähler',
        speakerEmoji: '📖',
        text: 'Der erste Tag ist vorbei. Amir geht nach Hause. Du denkst über den Tag nach. Heute hast du etwas Wichtiges gelernt: Vorurteile sind keine Entscheidung – sie passieren automatisch, weil unser Gehirn in Kategorien denkt. Aber was wir MIT diesen Vorurteilen TUN, ist eine Entscheidung. Wir können sie füttern oder hinterfragen. Wir können Mauern bauen oder Türen öffnen.\n\n🌈 Schlüsselerkenntnis: «Vorurteile sind wie Mauern im Kopf. Sie halten uns davon ab, wunderbare Menschen kennenzulernen.»\n\nDie Regenbogeninsel leuchtet ein bisschen heller. Die erste Farbe – Orange, die Farbe der Neugierde – erscheint am Himmel.',
        choices: [
          {
            id: 'r1-s5-c1',
            text: 'Weiter zum nächsten Kapitel',
            consequence: 'Du nimmst die Erkenntnis mit: Jeder Mensch ist mehr als der erste Eindruck. Und jeder hat es verdient, als Individuum gesehen zu werden – nicht als Vertreter einer Gruppe.',
            nextSceneId: null,
            points: { empathyPoints: 1, insightPoints: 1, couragePoints: 1 }
          }
        ]
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // Kapitel 2 – Unsichtbare Mauern
  // Verschiedene Formen von Ausgrenzung: Behinderung, Stille, Armut.
  // Mikroaggressionen erkennen, Privilegien-Bewusstsein entwickeln.
  // ---------------------------------------------------------------------------
  {
    id: 'rainbow-scenario-2',
    islandId: ISLAND_ID,
    title: 'Unsichtbare Mauern',
    description: 'Ausgrenzung hat viele Gesichter – und nicht alle sind leicht zu erkennen. Manchmal versteckt sie sich hinter Mitleid, Schweigen oder einem «lustigen» Kommentar. Drei Geschichten, eine Wahrheit: Manchmal verletzen wir andere, ohne es zu merken.',
    scenes: [
      {
        id: 'r2-s1',
        speaker: 'Erzähler',
        speakerEmoji: '📖',
        text: 'Die Regenbogeninsel hat sich verändert. Heute siehst du drei Wege, die von einem Platz in der Mitte abgehen. Über jedem Weg steht ein Wort: «Mitleid», «Stille», «Spott». Eine Stimme erklärt: «Ausgrenzung ist nicht nur, wenn jemand ‹Geh weg!› sagt. Manchmal ist Ausgrenzung leise. Manchmal meint sie es sogar gut. Folge den Wegen und finde die unsichtbaren Mauern.»\n\nDer erste Weg führt dich in eine Sporthalle. Dort sitzt Lena, 14 Jahre alt, im Rollstuhl. Die Klasse spielt Volleyball. Der Sportlehrer sagt: «Lena, du kannst zuschauen und die Punkte zählen, okay?» Er lächelt dabei freundlich.',
        choices: [
          {
            id: 'r2-s1-c1',
            text: '«Herr Fischer, kann Lena nicht mitspielen? Vielleicht können wir die Regeln anpassen?»',
            consequence: 'Du fragst nicht aus Mitleid, sondern aus Überzeugung: Lena hat das RECHT mitzumachen, nicht die GNADE. Es gibt Sitzvolleyball, bei dem alle am Boden spielen. Es gibt Rollen im Team, die nicht Springen erfordern. Inklusion heißt nicht «du darfst dabei sein», sondern «wir machen es so, dass ALLE mitmachen können». Das ist ein großer Unterschied.',
            nextSceneId: 'r2-s2',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 3 }
          },
          {
            id: 'r2-s1-c2',
            text: 'Zu Lena gehen und fragen: «Ist das okay für dich? Oder willst du lieber mitspielen?»',
            consequence: 'Du fragst Lena selbst – das ist wichtig! Viele Menschen sprechen ÜBER Menschen mit Behinderung, statt MIT ihnen. Lena sagt leise: «Ich würde gern mitspielen. Aber niemand fragt mich.» Genau das ist die unsichtbare Mauer: Alle nehmen an, sie KANN nicht – also FRAGT niemand, ob sie WILL.',
            nextSceneId: 'r2-s2',
            points: { empathyPoints: 3, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'r2-s1-c3',
            text: 'Denken: «Der Lehrer weiß schon, was er tut. Lena kann halt nicht Volleyball spielen.»',
            consequence: 'Halt – woher weißt du, was Lena kann und was nicht? Hast du sie gefragt? Oder hast du den Rollstuhl gesehen und automatisch gedacht: «geht nicht»? Genau DAS ist eine unsichtbare Mauer. Wir sehen die Behinderung und vergessen den Menschen dahinter. Lena hat eine Meinung, einen Willen und Fähigkeiten. Aber wenn alle für sie entscheiden, wird sie unsichtbar.',
            nextSceneId: 'r2-s2',
            points: { empathyPoints: 0, insightPoints: 1, couragePoints: 0 }
          },
          {
            id: 'r2-s1-c4',
            text: '«Lena sollte froh sein, dass sie überhaupt dabei sein darf. Im Rollstuhl kann man halt nicht alles machen – das muss man akzeptieren.»',
            consequence: 'Dieser Satz ist Ableismus pur – Diskriminierung von Menschen mit Behinderung. Du entscheidest für Lena, was sie kann und was nicht. Du sagst ihr, sie soll «dankbar» sein, als wäre ihre Anwesenheit ein Geschenk und kein Recht. Jeder Mensch hat das Recht auf Teilhabe – das steht in der UN-Behindertenrechtskonvention, die auch Luxemburg unterschrieben hat. «Du kannst halt nicht alles machen» ist der Satz, mit dem Menschen mit Behinderung ihr ganzes Leben lang kleingehalten werden. Aber die Wahrheit ist: Die Barriere ist nicht Lenas Rollstuhl – die Barriere ist eine Gesellschaft, die alles nur für Menschen ohne Behinderung baut. Lena hört deinen Satz und sagt nichts. Aber in ihren Augen siehst du etwas erlöschen. Du hast gerade ihre Würde mit Füßen getreten – und es nicht einmal gemerkt.',
            nextSceneId: 'r2-s2',
            points: { empathyPoints: 0, insightPoints: 0, couragePoints: 0 },
            isWrong: true
          }
        ]
      },
      {
        id: 'r2-s2',
        speaker: 'Erzähler',
        speakerEmoji: '📖',
        text: 'Der zweite Weg. Klassenzimmer, Gruppenarbeit. Vier Schüler sollen zusammen ein Plakat gestalten. Drei von ihnen – Marie, Jonas und Fynn – reden durcheinander. Der vierte, Elif, sitzt still daneben. Sie ist ruhig, spricht leise und braucht einen Moment, bevor sie etwas sagt. Jedes Mal, wenn sie den Mund aufmacht, fängt schon jemand anderes an zu reden. Nach zehn Minuten hat Elif kein einziges Wort zum Plakat beigetragen. Nicht weil sie nichts zu sagen hat. Sondern weil niemand ihr den Raum gibt.',
        choices: [
          {
            id: 'r2-s2-c1',
            text: '«Hey, Elif hatte gerade eine Idee. Können wir sie mal ausreden lassen?»',
            consequence: 'Du gibst Elif den Raum, den die anderen ihr nicht lassen. Das klingt einfach, aber es erfordert Aufmerksamkeit und Mut. In jeder Gruppe gibt es laute und leise Stimmen. Die lauten sind nicht automatisch besser – sie sind nur lauter. Studien zeigen: Die besten Ideen kommen oft von den ruhigsten Menschen. Aber nur, wenn jemand ihnen zuhört.',
            nextSceneId: 'r2-s3',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'r2-s2-c2',
            text: 'Elif einen Zettel schreiben: «Hey, schreib deine Ideen auf und gib sie mir. Ich lese sie vor.»',
            consequence: 'Kreative Lösung! Du findest einen Weg, der zu Elifs Art passt. Nicht jeder muss laut sein, um gehört zu werden. Elif schreibt drei brillante Ideen auf den Zettel. Als du sie vorliest, sind die anderen überrascht. Marie sagt: «Wow, warum hast du nichts gesagt?» Und Elif antwortet leise: «Habe ich versucht. Dreimal.» Das zeigt: Ausgrenzung passiert nicht immer absichtlich. Manchmal vergessen wir einfach, dass andere Menschen anders kommunizieren als wir. In der Kommunikationsforschung gibt es den Begriff «Sprechprivileg» – manche Menschen bekommen automatisch mehr Raum als andere.',
            nextSceneId: 'r2-s3',
            points: { empathyPoints: 3, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'r2-s2-c3',
            text: 'Denken: «Elif ist halt schüchtern. Wenn sie was sagen will, muss sie sich halt durchsetzen.»',
            consequence: '«Sie muss sich halt durchsetzen» – dieser Satz klingt logisch, ist aber unfair. Er sagt: Das Problem liegt bei Elif, nicht bei der Gruppe. Aber warum sollte ELIF sich ändern? Warum ändert die Gruppe nicht ihr Verhalten und lässt ALLE zu Wort kommen? Wenn eine Tür zu eng ist, bauen wir die Tür um – wir sagen nicht dem Rollstuhlfahrer, er soll dünner werden.',
            nextSceneId: 'r2-s3',
            points: { empathyPoints: 0, insightPoints: 1, couragePoints: 0 }
          },
          {
            id: 'r2-s2-c4',
            text: '«Wenn Elif nichts sagt, hat sie wohl einfach keine guten Ideen. In einer Gruppe setzen sich halt die besten Ideen durch – so ist das.»',
            consequence: 'Du verwechselst «laut» mit «gut». Das ist ein gefährlicher Denkfehler. In Gruppen setzen sich nicht die besten Ideen durch, sondern die lautesten. Das nennt man den «Lautstärke-Bias»: Wer am meisten redet, wird für kompetenter gehalten – auch wenn das Gesagte mittelmäßig ist. Elif hat möglicherweise die brillanteste Idee im Raum – aber du wirst es nie erfahren, weil du glaubst, Schweigen bedeutet Leere. Damit sprichst du stillen, introvertierten und zurückhaltenden Menschen das Recht ab, wertvolle Beiträge zu leisten. Du baust eine Welt, in der nur die Lauten zählen – und das schließt Millionen von Menschen aus. Die Geschichte zeigt: Viele der größten Denker waren still. Einstein, Rosa Parks, Malala – sie alle haben die Welt verändert, nicht durch Lautstärke, sondern durch Tiefe.',
            nextSceneId: 'r2-s3',
            points: { empathyPoints: 0, insightPoints: 0, couragePoints: 0 },
            isWrong: true
          }
        ]
      },
      {
        id: 'r2-s3',
        speaker: 'Erzähler',
        speakerEmoji: '📖',
        text: 'Der dritte Weg. Schulausflug ins Museum. Alle sollen 15 Euro Eintritt mitbringen. Paul, 13, hat das Geld nicht. Seine Mutter arbeitet zwei Jobs und es reicht trotzdem kaum. Paul hat Frau Wagner heimlich eine Nachricht geschrieben, dass er nicht mitkommen kann. Aber irgendjemand hat es mitbekommen. In der Pause hörst du, wie Lukas sagt: «Paul kann sich den Ausflug nicht leisten? Mein Vater würde sagen, seine Familie soll halt mehr arbeiten.» Ein paar lachen. Paul steht drei Meter weiter und tut so, als hätte er nichts gehört. Aber du siehst, wie seine Hände zittern.',
        choices: [
          {
            id: 'r2-s3-c1',
            text: 'Zu Lukas gehen: «Das ist nicht lustig. Du weißt nichts über Pauls Familie. Und Armut ist kein Witz.»',
            consequence: 'Du nennst es beim Namen. Das ist wichtig, denn Armut ist eines der letzten Tabus – darüber lacht man, darüber redet man nicht, dafür schämt man sich. Aber Armut ist keine Schwäche und kein Versagen. Millionen von Menschen arbeiten hart und haben trotzdem nicht genug. Das liegt nicht an ihnen – es liegt am System. Lukas wird rot. Vielleicht denkt er das nächste Mal nach, bevor er lacht.',
            nextSceneId: 'r2-s4',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 3 }
          },
          {
            id: 'r2-s3-c2',
            text: 'Leise zu Paul gehen: «Hey, ich hab eine Idee. Was wenn wir in der Klasse sammeln? Dann kann jeder so viel geben wie er will – anonym.»',
            consequence: 'Du findest eine Lösung, die Paul nicht bloßstellt. Anonym sammeln heißt: Niemand weiß, wer wie viel gibt oder wer es braucht. Das schützt Pauls Würde. Denn das Schlimmste an Armut ist nicht das fehlende Geld – es ist die Scham. Und Scham entsteht, wenn andere einen dafür verurteilen, wofür man nichts kann. In Luxemburg gibt es viele Familien, die trotz harter Arbeit kaum über die Runden kommen – man nennt das «Working Poor». Darüber zu reden ist wichtig, darüber zu lachen niemals.',
            nextSceneId: 'r2-s4',
            points: { empathyPoints: 3, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'r2-s3-c3',
            text: 'Nichts sagen. Du willst dich nicht einmischen.',
            consequence: 'Wieder Schweigen. Wieder der Bystander-Effekt. Paul geht nach Hause und fühlt sich allein. Nicht weil Lukas gelacht hat – das hat er erwartet. Sondern weil alle anderen es gehört haben und NIEMAND etwas gesagt hat. Forschung zeigt: Der Schmerz des Ignoriert-Werdens aktiviert dieselben Hirnregionen wie körperlicher Schmerz. Das ist die Botschaft, die Paul mitnimmt: «Keiner steht für mich ein.» Schweigen ist eine Wahl – und sie hat Konsequenzen, die tiefer gehen, als wir denken.',
            nextSceneId: 'r2-s4',
            points: { empathyPoints: 0, insightPoints: 0, couragePoints: 0 }
          },
          {
            id: 'r2-s3-c4',
            text: 'Mitlachen und denken: «Wer kein Geld hat, soll halt nicht mitkommen. Wieso sollen wir uns für andere Leute verantwortlich fühlen?»',
            consequence: 'Du lachst mit – und machst aus Armut einen Witz. Das nennt man Klassismus: Diskriminierung aufgrund von Geld oder sozialer Herkunft. «Wer kein Geld hat, ist selbst schuld» ist einer der grausamsten Sätze unserer Gesellschaft, denn er ignoriert die Realität. Pauls Mutter arbeitet zwei Jobs. Sie tut alles, was sie kann. Trotzdem reicht es nicht – weil Mieten steigen, weil Essen teurer wird, weil das System nicht für alle gleich funktioniert. Dein Lachen sagt Paul: «Du bist weniger wert, weil deine Familie weniger Geld hat.» Und das trifft ins Mark. Armut ist kein Charakterfehler – sie ist ein gesellschaftliches Problem. Wer darüber lacht, hat nicht verstanden, wie die Welt funktioniert. Und Paul? Paul wird sich dieses Lachen merken. Für immer.',
            nextSceneId: 'r2-s4',
            points: { empathyPoints: 0, insightPoints: 0, couragePoints: 0 },
            isWrong: true
          }
        ]
      },
      {
        id: 'r2-s4',
        speaker: 'Erzähler',
        speakerEmoji: '📖',
        text: 'Du stehst wieder auf dem Platz in der Mitte. Die drei Wege haben dir drei Geschichten gezeigt – drei verschiedene Formen von Ausgrenzung:\n\n1. MITLEID statt Inklusion – Lena wird «geschont», aber nicht einbezogen.\n2. STILLE statt Raum – Elif wird nicht gehört, weil niemand zuhört.\n3. SPOTT statt Mitgefühl – Paul wird für etwas ausgelacht, wofür er nichts kann.\n\nAllen drei ist etwas gemeinsam: Die Menschen, die ausgrenzen, denken meistens nicht, dass sie etwas Schlimmes tun. Der Sportlehrer «schützt» Lena. Die Gruppe «merkt es nicht». Lukas «macht nur einen Witz». Aber die Wirkung ist die gleiche: Jemand fühlt sich unsichtbar.',
        choices: [
          {
            id: 'r2-s4-c1',
            text: '«Es geht also nicht nur um Rassismus. Ausgrenzung kann jeden treffen.»',
            consequence: 'Genau. Diskriminierung hat viele Formen: Rassismus, Ableismus (Diskriminierung von Menschen mit Behinderung), Klassismus (Diskriminierung aufgrund von Geld/sozialer Schicht), und viele mehr. Manche Menschen erleben sogar MEHRERE Formen gleichzeitig – zum Beispiel eine Person mit Behinderung, die auch arm ist. Das nennt man Intersektionalität: Die Überschneidung verschiedener Benachteiligungen.',
            nextSceneId: 'r2-s5',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'r2-s4-c2',
            text: '«Ich frage mich jetzt, ob ich auch schon mal jemanden so ausgegrenzt habe, ohne es zu merken.»',
            consequence: 'DAS ist die mutigste Frage von allen. Sich selbst zu hinterfragen ist unbequem, aber unglaublich wichtig. Wahrscheinlich hat jeder von uns schon einmal jemanden unbewusst ausgegrenzt – durch einen Witz, durch Ignorieren, durch Mitleid statt Respekt. Das macht dich nicht zu einem schlechten Menschen. Es macht dich zu einem AUFMERKSAMEN Menschen, der dazulernt.',
            nextSceneId: 'r2-s5',
            points: { empathyPoints: 3, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'r2-s4-c3',
            text: '«Naja, die Welt ist halt nicht fair. Manche haben Pech, da kann man nichts machen. So war das schon immer.»',
            consequence: 'Mit diesem Satz gibst du auf, bevor du es überhaupt versucht hast. «So war das schon immer» ist der Lieblingssatz von Menschen, die nichts ändern wollen. Aber die Welt hat sich schon tausend Mal verändert – weil Menschen gesagt haben: «So soll es NICHT bleiben.» Frauen durften früher nicht wählen – bis jemand sagte: «Das ist falsch.» Sklaverei galt als «normal» – bis Menschen dagegen aufstanden. Apartheid, Rassentrennung, Diskriminierung – alles wurde als «so ist die Welt halt» verteidigt. Und jedes Mal haben mutige Menschen bewiesen: Nein, die Welt kann anders sein. Wenn du sagst «da kann man nichts machen», sagst du eigentlich: «Ich will nichts machen.» Und das ist eine Entscheidung – die falsche.',
            nextSceneId: 'r2-s5',
            points: { empathyPoints: 0, insightPoints: 0, couragePoints: 0 },
            isWrong: true
          }
        ]
      },
      {
        id: 'r2-s5',
        speaker: 'Erzähler',
        speakerEmoji: '📖',
        text: 'Die unsichtbaren Mauern werden sichtbar – und das ist der erste Schritt, sie einzureißen. Heute hast du gelernt, dass Ausgrenzung nicht immer laut und offensichtlich ist. Manchmal ist sie freundlich, manchmal ist sie still, manchmal ist sie «lustig». Aber sie tut immer weh.\n\n🌈 Schlüsselerkenntnis: «Manchmal verletzen wir andere, ohne es zu merken. Aufmerksam sein ist der erste Schritt.»\n\nDie zweite Farbe – Gelb, die Farbe der Aufmerksamkeit – erscheint am Himmel der Regenbogeninsel.',
        choices: [
          {
            id: 'r2-s5-c1',
            text: 'Weiter zum nächsten Kapitel',
            consequence: 'Du nimmst das Werkzeug der Aufmerksamkeit mit. Ab jetzt schaust du genauer hin – nicht um andere zu verurteilen, sondern um besser zu verstehen.',
            nextSceneId: null,
            points: { empathyPoints: 1, insightPoints: 1, couragePoints: 1 }
          }
        ]
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // Kapitel 3 – Gemeinsam stark
  // Schulprojekt erfordert Zusammenarbeit über Grenzen hinweg.
  // Zivilcourage, aktive Verbündete, der Bystander-Effekt.
  // Konkrete Werkzeuge: «Was kann ICH tun?»-Checkliste.
  // ---------------------------------------------------------------------------
  {
    id: 'rainbow-scenario-3',
    islandId: ISLAND_ID,
    title: 'Gemeinsam stark',
    description: 'Ein großes Schulprojekt steht an – und die Klasse muss über alle Unterschiede hinweg zusammenarbeiten. Leichter gesagt als getan. Konflikte, Missverständnisse und die große Frage: Wer hat den Mut, den ersten Schritt zu machen?',
    scenes: [
      {
        id: 'r3-s1',
        speaker: 'Erzähler',
        speakerEmoji: '📖',
        text: 'Großes Schulprojekt: Die Klasse soll eine Ausstellung über «Zusammenleben» gestalten – für den Tag der offenen Tür. Jede Gruppe bekommt ein Thema. Aber Frau Wagner hat die Gruppen bewusst gemischt: Schüler, die sich normalerweise nicht aussuchen würden, müssen zusammenarbeiten.\n\nDeine Gruppe: Du, Amir, Lena (Rollstuhl), Max (der am ersten Tag die dumme Frage gestellt hat) und Sarah, die sehr gläubig ist und ein Kopftuch trägt. Max murmelt: «Na super. Die bunte Truppe.» Es klingt nicht begeistert.',
        choices: [
          {
            id: 'r3-s1-c1',
            text: '«Hey, bunte Truppe klingt doch gut! Wir haben mehr Perspektiven als die anderen Gruppen. Das ist ein Vorteil.»',
            consequence: 'Du rahmst die Situation positiv – das nennt man «Reframing». Statt die Unterschiede als Problem zu sehen, machst du sie zur Stärke. Und du hast recht: Forschung an Universitäten weltweit zeigt, dass diverse Teams BESSERE Ergebnisse liefern als homogene – weil sie mehr Blickwinkel einbringen und blinde Flecken gegenseitig ausgleichen. Max zieht eine Augenbraue hoch, aber Amir grinst: «Stimmt, ich kann euch die syrische Perspektive auf Zusammenleben erklären. Wir haben da 3000 Jahre Erfahrung.» Die Gruppe lacht – und das Eis ist gebrochen.',
            nextSceneId: 'r3-s2',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'r3-s1-c2',
            text: 'Max direkt fragen: «Was genau stört dich denn? Hast du ein Problem mit jemandem hier?»',
            consequence: 'Du konfrontierst Max direkt, aber sachlich. Das ist fair – du gibst ihm die Chance, sich zu erklären, statt ihn sofort zu verurteilen. Max druckst herum: «Ist halt... ich kenne die nicht. Ich weiß nicht, worüber ich mit denen reden soll.» Und da ist es: Die Angst vor dem Unbekannten. Psychologen nennen das «Xenophobie light» – keine Feindseligkeit, aber Unbehagen gegenüber dem Fremden. Max ist nicht böse – er ist unsicher. Und Unsicherheit versteckt sich oft hinter coolen Sprüchen und Abwehr.',
            nextSceneId: 'r3-s2',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 3 }
          },
          {
            id: 'r3-s1-c3',
            text: 'Nichts sagen und hoffen, dass es sich von allein regelt.',
            consequence: 'Spoiler: Es regelt sich nicht von allein. Konflikte, die ignoriert werden, verschwinden nicht – sie wachsen. In der Psychologie gibt es den Begriff «Konfliktvermeidung»: Man hofft, das Problem verschwindet, aber in Wahrheit wird es nur schlimmer. Jemand muss den Anfang machen.',
            nextSceneId: 'r3-s2',
            points: { empathyPoints: 0, insightPoints: 1, couragePoints: 0 }
          },
          {
            id: 'r3-s1-c4',
            text: '«Kann ich nicht die Gruppe wechseln? Ich will mit meinen Freunden arbeiten, nicht mit Leuten, die ich nicht kenne und die eh ganz anders sind.»',
            consequence: 'Du wählst die Komfortzone – und schließt damit alle aus, die nicht in deine gewohnte Welt passen. «Die sind eh ganz anders» – woher weißt du das? Du hast noch kein einziges Wort mit ihnen gewechselt. Was du gerade tust, nennt man «In-Group-Bias»: die Bevorzugung der eigenen Gruppe und die Ablehnung aller, die nicht dazugehören. Das ist einer der ältesten Mechanismen des menschlichen Gehirns – und einer der gefährlichsten. Denn er führt zu Grüppchenbildung, Ausgrenzung und am Ende zu einer Gesellschaft, in der jeder nur noch mit Seinesgleichen redet. Amir, Lena und Sarah hören deinen Satz. Für sie heißt er: «Du bist nicht gut genug für meine Welt.» Das tut weh – und es zerstört jede Chance auf echte Begegnung, bevor sie überhaupt beginnen konnte.',
            nextSceneId: 'r3-s2',
            points: { empathyPoints: 0, insightPoints: 0, couragePoints: 0 },
            isWrong: true
          }
        ]
      },
      {
        id: 'r3-s2',
        speaker: 'Erzähler',
        speakerEmoji: '📖',
        text: 'Die Gruppe sitzt zusammen. Das Thema: «Was bedeutet Gerechtigkeit?» Sofort gibt es Streit. Max sagt: «Gerechtigkeit heißt, dass alle gleich behandelt werden.» Sarah schüttelt den Kopf: «Gleich behandeln reicht nicht. Manche brauchen mehr Unterstützung als andere, weil sie es schwerer haben.» Lena nickt: «Genau. Wenn alle dieselbe Treppe benutzen müssen, bin ich draußen. Gerechtigkeit heißt, dass es auch eine Rampe gibt.» Max verschränkt die Arme: «Also bekommen manche Leute eine Sonderbehandlung? Wie ist das fair?»',
        choices: [
          {
            id: 'r3-s2-c1',
            text: '«Max, stell dir vor, drei Leute wollen über einen Zaun schauen. Der eine ist groß, der zweite mittel, der dritte klein. Gleichheit heißt: Jeder bekommt eine gleich große Kiste. Gerechtigkeit heißt: Jeder bekommt die Kiste, die er braucht.»',
            consequence: 'Perfektes Beispiel! Du erklärst den Unterschied zwischen Gleichheit (equality) und Gerechtigkeit (equity) so, dass es sofort einleuchtet. Max denkt nach. «Also... wie eine Brille? Nicht jeder braucht eine, aber wer eine braucht, bekommt sie, damit alle gleich gut sehen können?» Genau! Max hat es sofort verstanden. Gerechtigkeit heißt nicht, dass alle dasselbe bekommen – sondern dass alle dasselbe ERREICHEN können. Lena nickt und fügt hinzu: «Und die dritte Stufe ist Inklusion: Den Zaun ganz abbauen, damit alle sehen können, ohne Kisten zu brauchen.» Die ganze Gruppe ist beeindruckt.',
            nextSceneId: 'r3-s3',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'r3-s2-c2',
            text: '«Ich glaube, ihr habt beide recht. Gleich behandeln IST wichtig – aber manchmal brauchen manche Menschen etwas mehr, damit es wirklich gleich ist. Können wir beides in unser Plakat aufnehmen?»',
            consequence: 'Du findest den Mittelweg – du erkennst beide Standpunkte an und suchst nach Verbindung statt Trennung. Das ist eine Schlüsselkompetenz: In Konflikten nicht «Wer hat recht?» fragen, sondern «Was können wir voneinander lernen?» Die Gruppe merkt: Es geht nicht ums Gewinnen, sondern ums Verstehen.',
            nextSceneId: 'r3-s3',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'r3-s2-c3',
            text: '«Sonderbehandlung ist unfair. Jeder ist seines Glückes Schmied – wer es nicht schafft, ist selbst schuld. So einfach ist das.»',
            consequence: 'Dieser Satz klingt «fair» – ist aber das Gegenteil. «Jeder ist seines Glückes Schmied» funktioniert nur, wenn alle mit dem gleichen Werkzeug starten. Aber das tun sie nicht. Lena startet mit Treppen, die sie nicht hochkommt. Amir startet mit einer Sprache, die nicht seine ist. Paul startet mit einem leeren Geldbeutel. Wenn du sagst «selbst schuld», ignorierst du alle Hindernisse, die diese Menschen nicht selbst gewählt haben. Das nennt man den «Meritokratie-Mythos»: der Glaube, dass Erfolg nur von Leistung abhängt. Aber Forschung zeigt klar: Wo du geboren wirst, wie viel Geld deine Eltern haben, welche Hautfarbe du hast – all das beeinflusst deine Chancen massiv. Lena schaut dich an und sagt leise: «Ich hab mir meinen Rollstuhl nicht ausgesucht. Trotzdem soll ich selbst schuld sein, wenn die Welt nicht für mich gebaut ist?» Darauf hast du keine Antwort – weil es keine gibt.',
            nextSceneId: 'r3-s3',
            points: { empathyPoints: 0, insightPoints: 0, couragePoints: 0 },
            isWrong: true
          }
        ]
      },
      {
        id: 'r3-s3',
        speaker: 'Sarah',
        speakerEmoji: '🧕',
        text: 'Mittagspause. Du gehst zur Kantine und siehst eine Szene: Ein älterer Schüler steht vor Sarah und sagt grinsend: «Hey, ist dir nicht heiß unter dem Ding?» Er zeigt auf ihr Kopftuch. Seine Freunde lachen. Sarah sagt ruhig: «Nein, mir geht es gut, danke.» Aber du siehst, wie sie sich kleiner macht. Amir, der am Nebentisch sitzt, ballt die Fäuste. Lena schaut hilfesuchend zu dir. Max steht drei Meter weiter und tut so, als hätte er nichts gesehen.',
        choices: [
          {
            id: 'r3-s3-c1',
            text: 'Zu dem älteren Schüler gehen: «Hey, lass sie in Ruhe. Das ist respektlos.»',
            consequence: 'Du stellst dich hin. Das ist Zivilcourage – und es ist nicht leicht, weil der Typ älter ist. Aber es gibt Regeln für sicheres Eingreifen:\n\n1. Bleib ruhig (keine Eskalation)\n2. Sprich das Verhalten an, nicht die Person («Das ist respektlos» statt «Du bist ein Idiot»)\n3. Hol dir Unterstützung, wenn nötig\n4. Frag danach das Opfer, ob es okay ist\n\nDer ältere Schüler rollt die Augen und geht. Manchmal reicht es, wenn EINE Person den Mund aufmacht.',
            nextSceneId: 'r3-s4',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 3 }
          },
          {
            id: 'r3-s3-c2',
            text: 'Zu Sarah setzen und laut sagen: «Sarah, erzähl mir nochmal von deinem Ausstellungs-Idee. Die war echt gut!»',
            consequence: 'Du lenkst die Situation um – statt den Angreifer zu konfrontieren, gibst du Sarah Sichtbarkeit und Würde. Du zeigst dem älteren Schüler: Sarah hat Freunde, sie ist nicht allein. Diese Methode nennt man «aktive Ablenkung» (englisch: «distraction» – eine der 5D-Strategien der Zivilcourage). Sie funktioniert besonders gut, wenn du dich nicht sicher fühlst, den Angreifer direkt anzusprechen. Die anderen 5D-Strategien sind: Direct (direkt ansprechen), Delegate (Hilfe holen), Document (dokumentieren) und Delay (danach Unterstützung anbieten). Nicht jeder muss ein Held sein. Manchmal ist es heldenhafter, einfach DA zu sein.',
            nextSceneId: 'r3-s4',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'r3-s3-c3',
            text: 'Zu Max gehen und sagen: «Hast du das gesehen? Wir müssen was tun.»',
            consequence: 'Du suchst dir einen Verbündeten – das ist schlau und mutig zugleich. Gemeinsam fühlt man sich sicherer. Max zögert, aber dann nickt er. Ihr geht zusammen zu Sarah. Allein wärt ihr vielleicht unsicher gewesen, aber zusammen seid ihr stärker. Das ist die Kraft von Verbündeten: Man muss nicht alles allein machen.',
            nextSceneId: 'r3-s4',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'r3-s3-c4',
            text: 'Denken: «Naja, wer ein Kopftuch trägt, muss halt mit solchen Kommentaren rechnen. Das ist doch klar – wer auffällt, wird angesprochen.»',
            consequence: 'Du gibst Sarah die Schuld dafür, dass sie belästigt wird. Das nennt man «Victim Blaming» – Täter-Opfer-Umkehr. Du sagst: «Du bist selbst schuld, weil du anders aussiehst.» Aber Moment: Niemand hat das Recht, andere Menschen wegen ihres Aussehens, ihrer Kleidung oder ihres Glaubens zu belästigen. Sarah trägt ihr Kopftuch aus Überzeugung. Es ist Teil ihrer Identität – genauso wie dein Lieblings-Hoodie Teil deiner ist. Würdest du akzeptieren, wenn jemand dich wegen deiner Kleidung verspottet und dann sagt: «Tja, selbst schuld, zieh dich halt anders an»? Victim Blaming ist einer der giftigsten Mechanismen der Diskriminierung: Er schützt den Täter und bestraft das Opfer. Und er sorgt dafür, dass Betroffene schweigen – weil sie glauben, sie hätten es verdient. Sarah hat NICHTS verdient außer Respekt.',
            nextSceneId: 'r3-s4',
            points: { empathyPoints: 0, insightPoints: 0, couragePoints: 0 },
            isWrong: true
          }
        ]
      },
      {
        id: 'r3-s4',
        speaker: 'Erzähler',
        speakerEmoji: '📖',
        text: 'Nach dem Vorfall in der Kantine sitzt die Gruppe zusammen. Die Stimmung ist anders – ernster, aber auch enger. Max räuspert sich: «Sorry, dass ich vorhin nichts gesagt habe. Ich wusste nicht, was ich tun soll.» Sarah nickt: «Das geht vielen so. Aber jetzt wisst ihr es.» Amir ergänzt: «Auf der Vulkaninsel habe ich gelernt, dass Wut eine Botschaft ist. Meine Wut hat mir gerade gesagt: Das ist nicht okay. Aber Wut allein reicht nicht – man braucht auch einen Plan.»\n\nLena schlägt vor: «Lasst uns eine ‹Was kann ICH tun?›-Checkliste für unser Plakat machen!» Die Gruppe beginnt zu brainstormen:',
        choices: [
          {
            id: 'r3-s4-c1',
            text: '«Punkt 1: HINSEHEN statt wegsehen. Punkt 2: NACHFRAGEN, ob die Person Hilfe will. Punkt 3: VERBÜNDETE suchen. Punkt 4: ERWACHSENE einbeziehen, wenn es gefährlich wird.»',
            consequence: 'Genau richtig! Deine Checkliste deckt alle vier Stufen von Zivilcourage ab:\n\n1. HINSEHEN – Situation wahrnehmen\n2. NACHFRAGEN – Betroffene ernst nehmen\n3. VERBÜNDETE SUCHEN – Du musst nicht allein handeln\n4. HILFE HOLEN – bei Gefahr sofort Erwachsene einschalten\n\nDas ist kein Heldentum. Das sind konkrete, machbare Schritte, die JEDER umsetzen kann.',
            nextSceneId: 'r3-s5',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 3 }
          },
          {
            id: 'r3-s4-c2',
            text: '«Punkt 1: Eigene Vorurteile checken. Punkt 2: Zuhören, bevor man urteilt. Punkt 3: Die Perspektive wechseln. Punkt 4: Sich entschuldigen, wenn man Mist gebaut hat.»',
            consequence: 'Deine Liste geht tiefer – sie fängt bei DIR SELBST an. Das ist die härteste, aber wichtigste Arbeit: Nicht nur andere verändern wollen, sondern auch sich selbst hinterfragen. Punkt 4 ist besonders mutig: Sich entschuldigen zu können ist kein Zeichen von Schwäche – es ist ein Zeichen von Stärke. Max sagt leise: «Nummer 4... die brauche ich, glaub ich.»',
            nextSceneId: 'r3-s5',
            points: { empathyPoints: 3, insightPoints: 3, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'r3-s5',
        speaker: 'Erzähler',
        speakerEmoji: '📖',
        text: 'Die Gruppe arbeitet jetzt richtig zusammen. Nicht weil alle gleich sind – sondern gerade WEIL sie verschieden sind. Amir bringt seine Erfahrung als Neuankömmling ein. Lena zeigt, was Inklusion bedeutet. Sarah erklärt, wie es sich anfühlt, wegen des Äußeren beurteilt zu werden. Und Max? Max hat heute mehr gelernt als in einem ganzen Schuljahr.\n\n🌈 Schlüsselerkenntnis: «Gerechtigkeit passiert nicht von allein. Jemand muss den ersten Schritt machen.»\n\nDie dritte Farbe – Grün, die Farbe des Mutes – erscheint am Himmel. Der Regenbogen wächst.',
        choices: [
          {
            id: 'r3-s5-c1',
            text: 'Weiter zum nächsten Kapitel',
            consequence: 'Du hast gelernt: Verbündet sein heißt nicht, perfekt zu sein. Es heißt, hinzuschauen, zuzuhören und zu handeln – auch wenn es unbequem ist.',
            nextSceneId: null,
            points: { empathyPoints: 1, insightPoints: 1, couragePoints: 1 }
          }
        ]
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // Kapitel 4 – Der Regenbogen entsteht
  // Die Klasse plant ein inklusives Schulfest. Die Spieler navigieren
  // verschiedene Bedürfnisse und finden Einheit in der Vielfalt.
  // Intersektionalität (einfach), inklusive Räume schaffen,
  // Unterschiede feiern.
  // ---------------------------------------------------------------------------
  {
    id: 'rainbow-scenario-4',
    islandId: ISLAND_ID,
    title: 'Der Regenbogen entsteht',
    description: 'Die Ausstellung steht vor der Tür – aber es gibt noch ein letztes Hindernis: Kann die Klasse ein Fest organisieren, bei dem sich WIRKLICH alle willkommen fühlen? Verschiedene Bedürfnisse, verschiedene Wünsche, ein Ziel: Einheit in Vielfalt.',
    scenes: [
      {
        id: 'r4-s1',
        speaker: 'Erzähler',
        speakerEmoji: '📖',
        text: 'Der Tag der offenen Tür rückt näher. Die Klasse plant nicht nur die Ausstellung, sondern auch ein großes Fest, um den Tag abzuschließen. Frau Wagner fragt: «Wie soll das Fest aussehen?» Sofort gibt es Vorschläge:\n\n- Jonas: «Pizza und Cola! Einfach, lecker, fertig.»\n- Sarah: «Ich kann kein Schweinefleisch essen. Und es gibt Schüler, die kein Fleisch essen.»\n- Lena: «Die Bühne muss barrierefrei sein, wenn ich mit meiner Band spielen soll.»\n- Amir: «Meine Mutter würde gern ihr berühmtes Baklava mitbringen – wenn das okay ist.»\n- Elif: «Bitte nicht zu viele laute Aktivitäten auf einmal. Das ist für manche überfordernd.»\n\nMax seufzt: «Können wir nicht einfach ein normales Fest machen?»',
        choices: [
          {
            id: 'r4-s1-c1',
            text: '«Was ist denn ‹normal›? Normal ist, wenn ALLE mitmachen können. Also nehmen wir alle Ideen und bauen daraus was Größeres.»',
            consequence: 'Du hinterfragst das Wort «normal» – und das ist wichtig. «Normal» bedeutet meistens: «So wie ICH es kenne.» Aber wessen «normal» zählt? Wenn «normal» dazu führt, dass manche ausgeschlossen werden, ist es nicht normal – es ist gedankenlos. Du schlägst vor, alle Bedürfnisse als Teil des Ganzen zu sehen, nicht als Sonderfall. DAS ist Inklusion. Sarah lächelt und sagt: «Normal ist, wenn sich niemand unnormal fühlen muss.» Besser hätte man es nicht sagen können.',
            nextSceneId: 'r4-s2',
            points: { empathyPoints: 3, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'r4-s1-c2',
            text: '«Max, lass uns alle Ideen sammeln und schauen, wo sie zusammenpassen. Wir müssen nicht alles haben – aber wir müssen an alle DENKEN.»',
            consequence: 'Du bist diplomatisch und lösungsorientiert. Du sagst nicht «Max hat unrecht», sondern «Lass uns gemeinsam schauen». Das nimmt den Druck raus und öffnet Raum für Kreativität. Gute Inklusion heißt nicht, ALLES für ALLE zu haben – es heißt, dass sich niemand VERGESSEN fühlt.',
            nextSceneId: 'r4-s2',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'r4-s1-c3',
            text: '«Max hat recht, wir machen es uns zu kompliziert. Ein Fest ist ein Fest.»',
            consequence: 'Es klingt einfach – aber «ein Fest ist ein Fest» stimmt nur, wenn du das Fest aus deiner eigenen Perspektive siehst. Für Sarah ist ein Fest, bei dem es nur Schweinefleisch gibt, kein Fest. Für Lena ist eine Bühne mit Stufen kein Zugang. Für Elif ist ein lautes Chaos kein Spaß. Einfachheit darf nicht auf Kosten anderer gehen. Nachdenken kostet nichts – Ausgrenzung kostet viel.',
            nextSceneId: 'r4-s2',
            points: { empathyPoints: 0, insightPoints: 1, couragePoints: 0 }
          }
        ]
      },
      {
        id: 'r4-s2',
        speaker: 'Erzähler',
        speakerEmoji: '📖',
        text: 'Die Planung läuft. Die Klasse teilt sich in Teams auf:\n\n- Team Essen: Jeder bringt etwas aus seiner Kultur mit. Es gibt Labels für Allergien, vegetarisch, halal.\n- Team Bühne: Die Bühne wird barrierefrei gebaut. Lenas Band spielt neben Amirs Oud-Musik.\n- Team Dekoration: Flaggen und Symbole aus allen Herkunftsländern der Klasse.\n- Team Ruhezone: Ein Raum mit gedämpftem Licht für alle, die eine Pause brauchen.\n\nAber dann gibt es ein Problem. Ein Elternteil ruft bei der Schule an und beschwert sich: «Warum hängen da ausländische Flaggen? Das ist eine luxemburgische Schule!» Die Nachricht verbreitet sich in der Klasse. Amir sagt leise: «Vielleicht sollten wir die Flaggen doch weglassen...»',
        choices: [
          {
            id: 'r4-s2-c1',
            text: '«Nein, die Flaggen bleiben. ALLE Flaggen. Auch die luxemburgische. Das ist ja genau der Punkt: Wir sind alle hier, wir sind alle Teil dieser Schule.»',
            consequence: 'Du lässt dich nicht einschüchtern. Inklusion heißt nicht, sich zurückzuziehen, wenn es Widerstand gibt – sondern erst recht zusammenzuhalten. Die luxemburgische Flagge hängt natürlich auch – und genau daneben alle anderen. Das ist kein Entweder-Oder. Ein Regenbogen besteht aus ALLEN Farben. Nimm eine weg, und er ist kein Regenbogen mehr.',
            nextSceneId: 'r4-s3',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 3 }
          },
          {
            id: 'r4-s2-c2',
            text: '«Lass uns das anders lösen: Statt Flaggen machen wir ein Wandbild, auf dem jeder sein Zuhause malt – egal ob das Luxemburg, Syrien oder ein Gefühl ist.»',
            consequence: 'Kreative Lösung! Du findest einen Weg, der niemanden ausschließt und trotzdem alle sichtbar macht. Ein Wandbild ist persönlicher als eine Flagge – es erzählt Geschichten statt Nationalitäten. Amir malt seinen Jasminbusch, Lena ihre Lieblingsstraße, Max sein Fußballfeld, Sarah eine Moschee und einen Sonnenuntergang. Elif zeichnet leise, aber intensiv: eine Bibliothek voller Bücher. «Mein Zuhause ist da, wo die Geschichten sind», sagt sie. Plötzlich geht es nicht um Länder, sondern um Menschen – und das ist viel mächtiger.',
            nextSceneId: 'r4-s3',
            points: { empathyPoints: 3, insightPoints: 3, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'r4-s3',
        speaker: 'Erzähler',
        speakerEmoji: '📖',
        text: 'Der Tag der offenen Tür ist da. Die Ausstellung sieht fantastisch aus. Jede Gruppe hat ihren Teil beigetragen. Eure Ecke – «Gemeinsam stark» – zeigt die «Was kann ICH tun?»-Checkliste, die Geschichten von Lena, Elif und Paul (anonymisiert und mit deren Erlaubnis), und ein großes Wandbild.\n\nEltern, Schüler und Lehrer kommen vorbei. Viele bleiben stehen und lesen. Eine Mutter sagt: «Das hätte ich gern in meiner Schulzeit gehabt.» Ein Vater – es ist Lukas\' Vater, der sich beschwert hatte – steht lange vor dem Wandbild. Dann sagt er leise zu seinem Sohn: «Das ist... das ist eigentlich ganz schön.»',
        choices: [
          {
            id: 'r4-s3-c1',
            text: 'Zu Amir gehen: «Hey, deine Mutter hat das beste Baklava der Welt gemacht. Alle lieben es!»',
            consequence: 'Das Baklava ist der Renner des Festes – und Amirs Mutter strahlt. Sie spricht gebrochenes Deutsch, aber jeder versteht ihr Lächeln. Das ist die Kraft von Kultur: Sie verbindet durch Sinne – Geschmack, Musik, Farben. Amirs Mutter wird von drei Eltern nach dem Rezept gefragt. Plötzlich ist sie nicht «die Geflüchtete» – sie ist die Frau, die das beste Baklava macht.',
            nextSceneId: 'r4-s4',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 1 }
          },
          {
            id: 'r4-s3-c2',
            text: 'Zu Max gehen: «Du hast dich echt verändert seit dem ersten Tag. Danke, dass du offen warst.»',
            consequence: 'Du erkennst Max\' Entwicklung an – und das ist wichtig. Veränderung braucht Anerkennung, nicht nur Kritik. Max war am Anfang verschlossen und vorurteilsbehaftet. Jetzt steht er neben Amir und erklärt Besuchern die Ausstellung. Er sagt: «Wir haben gelernt, dass Gerechtigkeit kein Kuchen ist – wenn jemand ein Stück bekommt, heißt das nicht, dass für mich weniger übrig bleibt.» Menschen verändern sich nicht durch Vorwürfe, sondern durch Erfahrungen. Max hat durch echte Begegnungen gelernt – und das ist mehr wert als hundert Vorträge über Toleranz.',
            nextSceneId: 'r4-s4',
            points: { empathyPoints: 3, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'r4-s3-c3',
            text: 'Auf die Bühne gehen und eine kurze Rede halten: «Dieses Fest ist der Beweis, dass Verschiedenheit kein Problem ist – sondern eine Superkraft.»',
            consequence: 'Du stehst vor allen und sprichst aus, was die Gruppe gelernt hat. Das erfordert Mut. Aber die Reaktion gibt dir recht: Applaus, Nicken, sogar ein paar feuchte Augen. Die Botschaft ist klar: Vielfalt ist anstrengend, ja. Sie erfordert Nachdenken, Kompromisse, Geduld. Aber das Ergebnis – DIESES Fest, DIESE Ausstellung, DIESE Klasse – wäre ohne Vielfalt nie möglich gewesen.',
            nextSceneId: 'r4-s4',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 3 }
          }
        ]
      },
      {
        id: 'r4-s4',
        speaker: 'Erzähler',
        speakerEmoji: '📖',
        text: 'Das Fest neigt sich dem Ende zu. Lenas Band spielt den letzten Song. Amir tanzt mit Max – beide nicht besonders gut, aber mit vollem Einsatz. Sarah und Elif unterhalten sich leise in der Ruhezone. Auf dem Wandbild haben inzwischen auch Besucher etwas hinzugefügt: Herzen, Sterne, kleine Botschaften.\n\nDu stehst da und schaust dir das alles an. Vor ein paar Tagen war diese Klasse eine Ansammlung von Individuen mit Vorurteilen, Ängsten und Mauern. Jetzt ist sie immer noch eine Ansammlung von Individuen – aber die Mauern haben Fenster bekommen. Und manche sogar Türen.',
        choices: [
          {
            id: 'r4-s4-c1',
            text: '«Wir haben es nicht perfekt gemacht. Aber wir haben es ZUSAMMEN gemacht. Und das zählt.»',
            consequence: 'Genau. Inklusion ist kein Zustand – es ist ein Prozess. Es gibt keinen Punkt, an dem man sagt: «So, jetzt sind wir fertig mit Vielfalt.» Es geht immer weiter. Aber jeder Schritt zählt. Jedes Gespräch, jede Frage, jede ausgestreckte Hand macht die Welt ein Stückchen weiter.',
            nextSceneId: 'r4-s5',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'r4-s4-c2',
            text: '«Ich glaube, die wichtigste Lektion war: Ich muss nicht alles verstehen, um es zu respektieren.»',
            consequence: 'DAS ist eine tiefe Erkenntnis. Du musst Sarahs Glauben nicht teilen, um ihr Kopftuch zu respektieren. Du musst Lenas Behinderung nicht «verstehen», um sie als gleichwertig zu behandeln. Du musst Amirs Geschichte nicht kennen, um ihn als Menschen zu sehen. Respekt braucht kein Verständnis – er braucht nur die Bereitschaft, den anderen als gleichwertig anzuerkennen. Der französische Philosoph Voltaire hat sinngemäß gesagt: «Ich bin nicht deiner Meinung, aber ich würde dafür kämpfen, dass du sie sagen darfst.» Das ist die Essenz von Zusammenleben in Vielfalt.',
            nextSceneId: 'r4-s5',
            points: { empathyPoints: 3, insightPoints: 3, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'r4-s5',
        speaker: 'Erzähler',
        speakerEmoji: '📖',
        text: 'Der Himmel über der Regenbogeninsel explodiert in Farben. Der Regenbogen ist vollständig: Orange für Neugier, Gelb für Aufmerksamkeit, Grün für Mut, und jetzt alle anderen Farben – Rot für Leidenschaft, Blau für Mitgefühl, Violett für Weisheit.\n\nJede Farbe steht für eine Lektion:\n- Vorurteile erkennen und hinterfragen\n- Unsichtbare Ausgrenzung sichtbar machen\n- Den Mut haben, einzugreifen\n- Unterschiede als Stärke feiern\n\n🌈 Schlüsselerkenntnis: «Unsere Unterschiede machen uns nicht schwächer – sie machen die Gruppe stärker.»\n\nDie Regenbogeninsel erstrahlt in vollem Licht. Du hast gelernt, dass Vielfalt kein Problem ist, das gelöst werden muss – sondern ein Geschenk, das entdeckt werden will.',
        choices: [
          {
            id: 'r4-s5-c1',
            text: 'Die Regenbogeninsel abschließen',
            consequence: 'Du verlässt die Regenbogeninsel mit vier Werkzeugen im Gepäck: Neugier statt Vorurteile, Aufmerksamkeit statt Gleichgültigkeit, Mut statt Schweigen, und die Überzeugung, dass Vielfalt die Welt reicher macht. Der Regenbogen leuchtet – nicht weil alle Farben gleich sind, sondern weil jede Farbe einzigartig ist. Nimm diese Werkzeuge mit in deinen Alltag. Jedes Gespräch, jede ausgestreckte Hand, jeder Moment des Zuhörens macht die Welt ein Stückchen bunter. Und vergiss nicht: Du musst nicht perfekt sein. Du musst nur bereit sein, dazuzulernen.',
            nextSceneId: null,
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 2 }
          }
        ]
      }
    ]
  }
];

// =============================================================================
// ACTIVITIES
// =============================================================================

export const rainbowActivities: RainbowActivity[] = [
  // ---------------------------------------------------------------------------
  // Aktivität 1 – Perspektivwechsel-Übung
  // Ziel: Empathie stärken durch imaginative Perspektivübernahme.
  // Basiert auf: Rollentheorie (George Herbert Mead),
  //              Empathie-Training (Batson, 1991)
  // Dauer: ca. 20-30 Minuten
  // ---------------------------------------------------------------------------
  {
    id: 'rainbow-activity-1',
    islandId: ISLAND_ID,
    type: 'reflection',
    title: 'Die Welt durch andere Augen',
    description: 'Eine Übung, bei der du lernst, dich in Menschen hineinzuversetzen, die ganz anders leben als du. Perspektivwechsel ist der Schlüssel zu Empathie – und Empathie ist der Schlüssel zu einer besseren Welt.',
    completed: false,
    instructions: [
      'Schritt 1: Wähle eine Person aus der Geschichte, die NICHT wie du ist (z.B. Amir, Lena, Sarah, Elif oder Paul).',
      'Schritt 2: Schließe die Augen und stell dir vor, du wärst diese Person. Wie wachst du morgens auf? Was siehst du im Spiegel? Was denkst du auf dem Schulweg?',
      'Schritt 3: Stell dir drei Situationen vor: Mittagessen in der Kantine, Gruppenarbeit im Unterricht, Pause im Schulhof. Wie erlebst du diese Situationen als diese Person?',
      'Schritt 4: Was ist ANDERS als bei dir? Was ist GLEICH? Schreib drei Unterschiede und drei Gemeinsamkeiten auf.',
      'Schritt 5: Frag dich ehrlich: Habe ich jemals jemanden so behandelt, wie die Personen in den Geschichten behandelt wurden? Was könnte ich beim nächsten Mal anders machen?',
      'Schritt 6: Schreib einen kurzen Brief an die Person, die du dir vorgestellt hast. Was möchtest du ihr sagen? (Du musst den Brief nicht abschicken – er ist für dich.)',
      'Tipp: Perspektivwechsel heißt nicht, dass du genau weißt, wie jemand sich fühlt. Es heißt, dass du es VERSUCHST. Und das Versuchen allein macht schon einen Unterschied.',
      'Bonus: Wenn du magst, tausche deinen Brief mit jemandem aus der Klasse (freiwillig!). Sprecht darüber, was euch überrascht hat. Oft merkt man: Andere haben ähnliche Gefühle – auch wenn ihr Leben ganz anders aussieht.'
    ]
  },

  // ---------------------------------------------------------------------------
  // Aktivität 2 – Identitäts-Tagebuch
  // Ziel: Selbstreflexion und Identitätsbewusstsein fördern.
  // Basiert auf: Identitätstheorie (Erik Erikson),
  //              narrative Identität (Dan McAdams)
  // Dauer: ca. 30-45 Minuten (oder über mehrere Tage verteilt)
  // ---------------------------------------------------------------------------
  {
    id: 'rainbow-activity-2',
    islandId: ISLAND_ID,
    type: 'journal',
    title: 'Wer bin ICH? – Mein Identitäts-Tagebuch',
    description: 'Deine Identität ist wie ein Regenbogen: Sie besteht aus vielen Farben. In diesem Tagebuch erforschst du, was dich ausmacht – und warum jede Farbe wichtig ist.',
    completed: false,
    instructions: [
      'Seite 1 – Meine Farben: Male einen Regenbogen und schreibe neben jede Farbe einen Teil deiner Identität. Beispiele: Familie, Sprache(n), Hobbys, Herkunft, Glaube oder Nicht-Glaube, Stärken, Träume.',
      'Seite 2 – Sichtbar und unsichtbar: Manche Teile deiner Identität kann man sehen (Hautfarbe, Kleidung, Körper), andere nicht (Gefühle, Überzeugungen, Erfahrungen). Zeichne zwei Spalten und sortiere deine Identitätsteile.',
      'Seite 3 – Schubladen: In welche Schubladen stecken andere dich? Stimmen diese Schubladen? Was sehen sie NICHT?',
      'Seite 4 – Mein Lieblings-Ich: Welcher Teil deiner Identität macht dich am stolzesten? Warum? Schreib mindestens fünf Sätze darüber.',
      'Seite 5 – Was ich gelernt habe: Gab es in den letzten Wochen einen Moment, in dem du etwas Neues über dich selbst entdeckt hast? Beschreibe ihn.',
      'Seite 6 – Brief an mein zukünftiges Ich: Schreib dir selbst einen Brief, den du in einem Jahr lesen wirst. Was möchtest du dir über Vielfalt und Identität sagen?',
      'Denk daran: Deine Identität ist nicht festgeschrieben. Du veränderst dich, und das ist gut so. Der Regenbogen ist nie zweimal genau gleich – und du auch nicht.',
      'Extra-Aufgabe: Frag ein Familienmitglied nach seiner oder ihrer Identität. Was war anders, als sie in deinem Alter waren? Was hat sich verändert? Identität ist eine Reise, kein Ziel.'
    ]
  },

  // ---------------------------------------------------------------------------
  // Aktivität 3 – Privilegien-Reflexion
  // Ziel: Bewusstsein für systemische Vorteile und Benachteiligungen.
  // Basiert auf: Peggy McIntosh «Invisible Knapsack» (1989),
  //              angepasst für Jugendliche 10-15 Jahre.
  // Dauer: ca. 20 Minuten
  // Wichtig: Keine Schuldgefühle erzeugen – Bewusstsein fördern.
  // ---------------------------------------------------------------------------
  {
    id: 'rainbow-activity-3',
    islandId: ISLAND_ID,
    type: 'reflection',
    title: 'Der unsichtbare Rucksack',
    description: 'Jeder von uns trägt einen unsichtbaren Rucksack – gefüllt mit Vorteilen und Nachteilen, die wir nicht selbst gewählt haben. Diese Übung hilft dir, deinen eigenen Rucksack zu erkunden, ohne Schuldgefühle, aber mit Bewusstsein.',
    completed: false,
    instructions: [
      'Stell dir vor, du trägst einen Rucksack. In diesem Rucksack sind Dinge, die dir das Leben leichter oder schwerer machen – aber die du dir NICHT ausgesucht hast.',
      'Frage 1: Spreche ich die Sprache, die in meiner Schule gesprochen wird, als Muttersprache? (Wenn ja: Das ist ein Vorteil, den nicht alle haben.)',
      'Frage 2: Kann ich mich in der Schule frei bewegen, ohne auf Treppen, enge Türen oder fehlende Aufzüge achten zu müssen? (Wenn ja: Auch das ist ein Vorteil.)',
      'Frage 3: Können meine Eltern mir Schulmaterial, Ausflüge und Hobbys bezahlen? (Wenn ja: Das ist keine Selbstverständlichkeit.)',
      'Frage 4: Werde ich wegen meines Aussehens, meines Namens oder meiner Herkunft anders behandelt? (Wenn nein: Das ist ein Privileg.)',
      'Frage 5: Fühle ich mich in der Schule sicher – körperlich und emotional? (Wenn ja: Nicht alle können das sagen.)',
      'WICHTIG: Privilegien zu haben macht dich nicht zu einem schlechten Menschen. Es bedeutet nur, dass du bestimmte Hindernisse nicht hast, die andere haben. Und wenn du das weißt, kannst du etwas tun: Du kannst deine Stimme nutzen, um für die einzustehen, die es schwerer haben.',
      'Aufgabe: Schreib drei konkrete Dinge auf, die du diese Woche tun kannst, um jemand anderem den Weg ein bisschen leichter zu machen. Es müssen keine großen Gesten sein – manchmal reicht ein freundliches Wort.',
      'Reflexion: Schreib auf, wie sich diese Übung angefühlt hat. War es unangenehm? Gut. Das bedeutet, du denkst nach. Und Nachdenken ist der erste Schritt zur Veränderung. Niemand erwartet, dass du die Welt rettest – aber du kannst anfangen, sie aufmerksamer zu sehen.'
    ]
  },

  // ---------------------------------------------------------------------------
  // Aktivität 4 – Kulturelle Schatzsuche
  // Ziel: Interkulturelle Neugier und Wertschätzung aufbauen.
  // Basiert auf: Kontakthypothese (Gordon Allport, 1954),
  //              kulturelles Lernen durch direkte Begegnung.
  // Dauer: ca. 1-2 Wochen (als fortlaufendes Projekt)
  // Besonders geeignet für: Luxemburgs multikulturelle Schulklassen
  // ---------------------------------------------------------------------------
  {
    id: 'rainbow-activity-4',
    islandId: ISLAND_ID,
    type: 'creative',
    title: 'Kulturelle Schatzsuche',
    description: 'In deiner Umgebung gibt es mehr Vielfalt, als du denkst! Diese Aktivität lädt dich ein, die kulturellen Schätze in deinem Alltag zu entdecken und zu feiern.',
    completed: false,
    instructions: [
      'Mission 1 – Sprachen-Sammler: Finde heraus, wie viele verschiedene Sprachen in deiner Klasse oder Schule gesprochen werden. Lerne in drei dieser Sprachen «Danke» zu sagen. Schreib sie auf.',
      'Mission 2 – Geschmacks-Entdecker: Frag drei Mitschüler, was ihr Lieblingsessen von zu Hause ist. Lass dir das Rezept geben (oder beschreiben) und zeichne das Gericht.',
      'Mission 3 – Geschichten-Finder: Bitte jemanden, dir eine Geschichte oder ein Sprichwort aus seiner Kultur zu erzählen. Schreib es auf und erkläre, was es für dich bedeutet.',
      'Mission 4 – Musik-Forscher: Tausche mit jemandem einen Lieblingssong aus – aus eurer jeweiligen Kultur oder Sprache. Hör den Song an und schreib drei Dinge auf, die dir daran gefallen.',
      'Mission 5 – Fest-Planer: Erfinde ein kleines Fest für deine Klasse, bei dem jeder etwas aus seiner Kultur beiträgt (ein Lied, ein Gericht, eine Geschichte, ein Spiel). Mach einen Plan: Wer bringt was mit?',
      'Abschluss: Mach ein «Vielfalt-Plakat» mit allem, was du gesammelt hast. Zeig es in der Klasse und erzähle, was du gelernt hast.',
      'Denk daran: Kultur ist nicht nur Herkunft. Kultur ist auch, wie du aufwächst, was du isst, welche Musik du hörst, welche Geschichten du kennst. Jeder hat Kultur – und jede Kultur ist wertvoll.',
      'In Luxemburg leben Menschen aus über 170 Nationen. Das macht unser Land zu einem der vielfältigsten der Welt. Diese Vielfalt ist kein Zufall – sie ist ein Schatz. Und Schätze muss man pflegen, teilen und feiern.'
    ]
  }
];

// =============================================================================
// WISDOM CARDS
// 8 Weisheitskarten zu den Kernthemen der Regenbogeninsel.
// Jede Karte fasst eine Lektion in einem einzigen Satz zusammen.
// =============================================================================

export const rainbowWisdomCards: WisdomCard[] = [
  // -------------------------------------------------------------------------
  // Karte 1 – Kapitel 1: Vorurteile
  // -------------------------------------------------------------------------
  {
    id: 'rainbow-wisdom-1',
    islandId: ISLAND_ID,
    text: 'Vorurteile sind wie Mauern im Kopf. Sie halten uns davon ab, wunderbare Menschen kennenzulernen. Reiß sie ein – mit Neugier.',
    category: 'Vielfalt',
    collected: false
  },
  // -------------------------------------------------------------------------
  // Karte 2 – Kapitel 2: Aufmerksamkeit
  // -------------------------------------------------------------------------
  {
    id: 'rainbow-wisdom-2',
    islandId: ISLAND_ID,
    text: 'Manchmal verletzen wir andere, ohne es zu merken. Aufmerksam sein ist der erste Schritt zur Veränderung.',
    category: 'Achtsamkeit',
    collected: false
  },
  // -------------------------------------------------------------------------
  // Karte 3 – Kapitel 3: Zivilcourage
  // -------------------------------------------------------------------------
  {
    id: 'rainbow-wisdom-3',
    islandId: ISLAND_ID,
    text: 'Gerechtigkeit passiert nicht von allein. Jemand muss den ersten Schritt machen. Warum nicht du?',
    category: 'Zivilcourage',
    collected: false
  },
  // -------------------------------------------------------------------------
  // Karte 4 – Kapitel 4: Einheit in Vielfalt
  // -------------------------------------------------------------------------
  {
    id: 'rainbow-wisdom-4',
    islandId: ISLAND_ID,
    text: 'Unsere Unterschiede machen uns nicht schwächer – sie machen die Gruppe stärker. Ein Regenbogen braucht ALLE Farben.',
    category: 'Zusammenhalt',
    collected: false
  },
  // -------------------------------------------------------------------------
  // Karte 5 – Empathie und Zuhören
  // -------------------------------------------------------------------------
  {
    id: 'rainbow-wisdom-5',
    islandId: ISLAND_ID,
    text: 'Zuhören ist mutiger als reden. Wer wirklich zuhört, versteht nicht nur Worte – sondern Menschen.',
    category: 'Empathie',
    collected: false
  },
  // -------------------------------------------------------------------------
  // Karte 6 – Respekt ohne Verstehen
  // -------------------------------------------------------------------------
  {
    id: 'rainbow-wisdom-6',
    islandId: ISLAND_ID,
    text: 'Du musst nicht alles verstehen, um es zu respektieren. Respekt beginnt mit der Bereitschaft, den anderen als gleichwertig zu sehen.',
    category: 'Respekt',
    collected: false
  },
  // -------------------------------------------------------------------------
  // Karte 7 – Identität als Regenbogen
  // -------------------------------------------------------------------------
  {
    id: 'rainbow-wisdom-7',
    islandId: ISLAND_ID,
    text: 'Deine Identität ist wie ein Regenbogen: viele Farben, ein Bild. Keine Farbe ist unwichtig – und keine muss sich verstecken.',
    category: 'Identität',
    collected: false
  },
  // -------------------------------------------------------------------------
  // Karte 8 – Gegen das Schweigen
  // -------------------------------------------------------------------------
  {
    id: 'rainbow-wisdom-8',
    islandId: ISLAND_ID,
    text: 'Schweigen ist nicht neutral. Wer Unrecht sieht und nichts tut, hat eine Seite gewählt – die falsche.',
    category: 'Zivilcourage',
    collected: false
  }
];
