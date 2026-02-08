// @ts-nocheck
// =============================================================================
// Regenbogeninsel (Rainbow Island) – Vielfalt & Identität
// Inner Worlds – Social-Emotional Learning Game
//
// Insel 7 von 8 – KLIMAX-INSEL
// Alle Texte auf Deutsch, lebendig und auf Augenhöhe für 10–15-Jährige.
// Therapeutisch fundiert: Anti-Diskriminierung, Identitätsarbeit, Zivilcourage,
// Intersektionalität, kulturelle Kompetenz, Empowerment.
// Verweist auf alle vorherigen Inseln (Vulkan, Ozean, Wald, Berg, Garten, Nacht).
// =============================================================================

import type { Scenario, WisdomCard, Activity, IslandId } from '../../../types';

// -----------------------------------------------------------------------------
// Local Types
// -----------------------------------------------------------------------------

interface RainbowActivity extends Activity {
  instructions: string[];
}

interface NPC {
  id: string;
  name: string;
  emoji: string;
  description: string;
  backstory: string;
}

const ISLAND_ID = 'rainbow' as IslandId;

// =============================================================================
// NPCs
// =============================================================================

export const rainbowNPCs: NPC[] = [
  {
    id: 'sofia',
    name: 'Sofia',
    emoji: '🎸',
    description: 'Eine temperamentvolle portugiesische Musikerin, die Fado mit Rock mischt und kein Blatt vor den Mund nimmt',
    backstory: 'Sofia kam mit neun aus Lissabon nach Luxemburg. Ihre Mutter putzt Büros, ihr Vater arbeitet auf dem Bau – und Sofia hasst es, wenn Leute denken, das sei alles, was Portugiesen können. Sie spielt E-Gitarre wie eine Besessene, schreibt Songs auf Portugiesisch und Französisch gleichzeitig und hat einen Temperament-Radar, der Ungerechtigkeit auf hundert Meter Entfernung aufspürt. Auf der Vulkaninsel hätte sie vermutlich drei Ausbrüche pro Tag gehabt – mittlerweile hat sie gelernt, ihre Wut in Musik zu verwandeln statt in Explosionen. Aber wenn jemand ihre Freunde angreift, kennt sie kein Halten. Ihr Motto: «Saudade ist kein Heimweh. Saudade ist die Liebe zu allem, was du bist – egal wo du gerade stehst.»'
  },
  {
    id: 'amadou',
    name: 'Amadou',
    emoji: '🥁',
    description: 'Ein charismatischer Geschichtenerzähler und Trommler aus dem Senegal, der mit Rhythmus Brücken baut',
    backstory: 'Amadou ist vor drei Jahren mit seiner Familie aus Dakar nach Luxemburg gezogen. Sein Großvater war ein Griot – ein westafrikanischer Geschichtenerzähler und Hüter der Erinnerung. Amadou trägt dieses Erbe in sich: Er kann eine ganze Schulklasse zum Schweigen bringen, wenn er eine Geschichte erzählt, und zum Tanzen, wenn er trommelt. Aber er kennt auch die andere Seite: die Blicke im Supermarkt, die Frage «Ja, aber wo kommst du WIRKLICH her?», das Erstaunen, wenn er fließend Luxemburgisch spricht. Auf der Ozeaninsel hätte er viel über Verlust gelernt – den Verlust seiner Heimat, seiner Sprache im Alltag, seiner Selbstverständlichkeit. Aber Amadou hat eine Gabe: Er verwandelt Schmerz in Geschichten und Geschichten in Veränderung.'
  },
  {
    id: 'yuki',
    name: 'Yuki',
    emoji: '🎨',
    description: 'Eine scharfsinnige japanisch-luxemburgische Künstlerin, die mit leisen Worten und lauter Kunst die Welt seziert',
    backstory: 'Yukis Mutter ist Japanerin, ihr Vater Luxemburger. Sie ist in Luxemburg geboren, war aber jeden Sommer in Tokio. Das Ergebnis: Sie fühlt sich nirgends ganz zugehörig – zu europäisch für Japan, zu asiatisch für Luxemburg. Statt darüber zu verzweifeln, hat sie angefangen, Manga zu zeichnen, in denen Figuren zwischen Welten wandeln. Ihre Kunst ist leise, aber sie trifft wie ein Pfeil. Yuki spricht wenig, aber wenn sie spricht, hören alle hin, weil jedes Wort sitzt. Auf der Berginsel hätte sie ihren inneren Kritiker bekämpft – die Stimme, die sagt: «Du bist nicht genug von irgendwas.» Heute weiß sie: Sie ist nicht halb japanisch und halb luxemburgisch. Sie ist doppelt.'
  },
  {
    id: 'robin',
    name: 'Robin',
    emoji: '🌈',
    description: 'Ein furchtloser non-binärer Teenager mit scharfem Verstand und noch schärferem Humor',
    backstory: 'Robin ist in Esch-sur-Alzette aufgewachsen, hat eine belgische Mutter und einen deutschen Vater, und weigert sich konsequent, in irgendeine Schublade zu passen. Nicht die Geschlechter-Schublade, nicht die Nationalitäten-Schublade, nicht die «du musst Sport ODER Kunst mögen»-Schublade. Robin nutzt keine Pronomen oder alle – je nach Stimmung. Das verwirrt manche Leute, und Robin findet das okay, denn Verwirrung ist der erste Schritt zum Nachdenken. Auf der Waldinsel hätte Robin gelernt, die Angst vor Ablehnung zu überwinden; auf der Garteninsel, dass echte Freundschaft heißt, jemanden so zu akzeptieren, wie er*sie*they ist. Robin hat einen Humor, der so trocken ist, dass man erst drei Sekunden später merkt, dass es ein Witz war – und dann lacht man doppelt so laut.'
  }
];

// =============================================================================
// SCENARIOS
// =============================================================================

export const rainbowScenarios: Scenario[] = [
  // ---------------------------------------------------------------------------
  // Scenario 1 – Der stille Angriff
  // Mikroaggressionen und subtiler Rassismus. Schwieriger als offene
  // Beleidigung, weil man sich fragt: «War das jetzt wirklich so gemeint?»
  // Referenz: Vulkan (Wut kanalisieren), Wald (Mut aufbringen)
  // ---------------------------------------------------------------------------
  {
    id: 'rainbow-scenario-1',
    islandId: 'rainbow' as IslandId,
    title: 'Der stille Angriff',
    description: 'Nicht jede Diskriminierung ist laut. Manchmal versteckt sie sich hinter einem Lächeln, einem «Kompliment» oder einer «harmlosen» Frage. Amadou zeigt euch, warum diese leisen Angriffe am meisten wehtun.',
    scenes: [
      {
        id: 'r1-s1',
        text: 'Montagmorgen. Die Regenbogeninsel empfängt euch mit einem Himmel, der in allen Farben schimmert – als hätte jemand ein Prisma vor die Sonne gehalten. Amadou steht am Strand und trommelt leise vor sich hin. Als er euch sieht, hört er auf und lächelt – aber das Lächeln erreicht seine Augen nicht ganz. «Hey», sagt er. «Wisst ihr, was letzte Woche passiert ist? Frau Müller, unsere Geschichtslehrerin, hat zu mir gesagt: ‹Amadou, du sprichst ja überraschend gutes Deutsch!› Sie meinte es als Kompliment.» Er pausiert. «Ich lebe seit drei Jahren hier. Ich habe eine Eins in Deutsch. Warum ist es ÜBERRASCHEND?»',
        choices: [
          { text: '«Das war kein Kompliment. Das war die Annahme, dass du kein gutes Deutsch sprechen SOLLTEST. Das ist rassistisch – auch wenn sie es nicht so gemeint hat.»', nextSceneId: 'r1-s2', empathyPoints: 2, insightPoints: 3, couragePoints: 2 },
          { text: '«Vielleicht hat sie es wirklich nur nett gemeint? Manche Leute drücken sich einfach ungeschickt aus.»', nextSceneId: 'r1-s2', empathyPoints: 1, insightPoints: 1, couragePoints: 0 },
          { text: '«Wie hast du dich dabei gefühlt? Erzähl mal genau.»', nextSceneId: 'r1-s2', empathyPoints: 3, insightPoints: 2, couragePoints: 1 }
        ]
      },
      {
        id: 'r1-s2',
        text: 'Amadou nickt langsam. «Das Ding ist: Jede einzelne dieser Bemerkungen klingt harmlos. Aber wenn du JEDEN TAG so etwas hörst, summiert sich das. Letzte Woche hat jemand meine Haare angefasst – einfach so, ohne zu fragen. Im Bus hat eine Frau ihre Tasche fester gehalten, als ich mich neben sie gesetzt habe. Und im Sportverein sagt der Trainer immer: ‹Amadou, ihr Afrikaner seid ja natürliche Athleten!›» Er schaut aufs Meer. «Wisst ihr, auf der Vulkaninsel habe ich gelernt, meine Wut zu benennen. Aber hier? Hier weiß ich nicht mal, ob ich WÜTEND sein DARF. Weil alle sagen: ‹Ist doch nicht so schlimm. Nimm es nicht so ernst.›»',
        choices: [
          { text: '«Du darfst wütend sein. Punkt. Deine Gefühle brauchen keine Erlaubnis von anderen. Das hast du selbst auf der Vulkaninsel gelernt.»', nextSceneId: 'r1-s3', empathyPoints: 3, insightPoints: 2, couragePoints: 2 },
          { text: '«Das nennt man Mikroaggressionen. Jede für sich wirkt klein, aber zusammen sind sie wie tausend Papierschnitte. Und Papierschnitte tun höllisch weh.»', nextSceneId: 'r1-s3', empathyPoints: 2, insightPoints: 3, couragePoints: 1 },
          { text: '«Hm, ich glaube, manche Leute meinen es echt nicht böse. Vielleicht solltest du einfach nicht alles so ernst nehmen?»', nextSceneId: 'r1-s3', empathyPoints: 0, insightPoints: 0, couragePoints: 1 }
        ]
      },
      {
        id: 'r1-s3',
        text: 'Yuki kommt dazu. Sie hat alles gehört. «Ich kenne das», sagt sie leise. «Bei mir ist es: ‹Du siehst ja gar nicht japanisch aus!› Oder: ‹Sprich mal was auf Japanisch!› Als wäre ich eine Attraktion. Ein Zirkustier.» Sie zieht ihr Skizzenbuch heraus und zeigt eine Zeichnung: Eine Figur, die von allen Seiten mit kleinen Nadeln gestochen wird. Jede Nadel ist beschriftet – «Woher kommst du wirklich?», «Du bist aber anders als die anderen», «Für eine Asiatin bist du echt lustig». «So fühlt sich das an», sagt Yuki. «Tod durch tausend Nadelstiche. Und das Schlimmste? Die Leute, die die Nadeln halten, merken es nicht mal.»',
        choices: [
          { text: '«Dann müssen wir es ihnen zeigen. Yukis Zeichnung ist der perfekte Anfang. Lasst uns das sichtbar machen.»', nextSceneId: 'r1-s4', empathyPoints: 2, insightPoints: 2, couragePoints: 3 },
          { text: '«Danke, dass ihr das teilt. Ich hab so was auch schon erlebt, aber ich hab nie drüber geredet.»', nextSceneId: 'r1-s4', empathyPoints: 3, insightPoints: 1, couragePoints: 2 },
          { text: '«Aber nicht alle Leute, die solche Sachen sagen, sind rassistisch. Manche sind einfach unwissend. Ist da ein Unterschied?»', nextSceneId: 'r1-s4', empathyPoints: 1, insightPoints: 3, couragePoints: 0 }
        ]
      },
      {
        id: 'r1-s4',
        text: 'Robin taucht auf – wie immer mit einem Timing, das verdächtig nach Absicht aussieht. «Wir reden über Mikroaggressionen? Perfekt. Mein Lieblings-Hass-Thema.» Robin setzt sich hin. «Wisst ihr, was ICH ständig höre? ‹Bist du ein Junge oder ein Mädchen?› ‹Aber was BIST du dann?› ‹Das ist doch nur eine Phase.› » Robin grinst, aber es ist das Grinsen von jemandem, der gelernt hat, Humor als Schild zu benutzen. «Das Ding ist: Mikroaggressionen funktionieren, weil sie KLEIN genug sind, um abgestritten zu werden. ‹War doch nur ein Witz.› ‹Sei nicht so empfindlich.› Aber denkt mal an die Waldinsel – dort habt ihr gelernt, dass Angst sich aufbaut, wenn man sie ignoriert. Mit Diskriminierung ist es genauso.»',
        choices: [
          { text: '«Robin hat recht. Auf der Waldinsel haben wir gelernt, der Angst ins Gesicht zu schauen. Hier müssen wir der Ungerechtigkeit ins Gesicht schauen.»', nextSceneId: 'r1-s5', empathyPoints: 1, insightPoints: 3, couragePoints: 3 },
          { text: '«Wie antworten wir am besten, wenn jemand eine Mikroaggression macht? Was funktioniert bei euch?»', nextSceneId: 'r1-s5', empathyPoints: 2, insightPoints: 3, couragePoints: 1 },
          { text: '«Ich fühle mich gerade schlecht, weil ich wahrscheinlich auch schon mal so was gesagt habe, ohne es zu merken.»', nextSceneId: 'r1-s5', empathyPoints: 3, insightPoints: 2, couragePoints: 1 }
        ]
      },
      {
        id: 'r1-s5',
        text: 'Sofia kommt mit ihrer Gitarre angerannt. «Sorry, bin spät. Hatte Musik-AG.» Sie hört kurz zu und nickt heftig. «Okay, ich hab einen Vorschlag. Statt immer nur darüber zu reden, wie schlimm es ist – was, wenn wir eine STRATEGIE entwickeln? Auf der Nachtinsel habt ihr gelernt, dass Achtsamkeit hilft, Gedanken zu sortieren. Und auf der Berginsel, dass euer Wert nicht davon abhängt, was andere über euch sagen.» Sie greift einen Akkord. «Also: Was tun wir KONKRET, wenn jemand eine Mikroaggression macht?» Amadou: «Nachfragen. ‹Was genau meinst du damit?›» Yuki: «Ruhig erklären, warum es verletzend ist.» Robin: «Und wenn die Person nicht zuhört: Grenzen setzen und gehen.»',
        choices: [
          { text: '«Genau! Und wir üben das. Wie auf der Vulkaninsel: Erst den Dampf ablassen, dann klar kommunizieren. Lass uns Rollenspiele machen.»', nextSceneId: 'r1-s6', empathyPoints: 1, insightPoints: 3, couragePoints: 3 },
          { text: '«Ich finde Amadous Ansatz am besten. Nachfragen zwingt die andere Person, über ihre Worte nachzudenken. Das ist die stärkste Waffe.»', nextSceneId: 'r1-s6', empathyPoints: 2, insightPoints: 3, couragePoints: 1 },
          { text: '«Was, wenn es nicht um UNS geht? Was tun wir, wenn wir sehen, dass es JEMAND ANDEREM passiert? Wie werden wir gute Verbündete?»', nextSceneId: 'r1-s6', empathyPoints: 3, insightPoints: 2, couragePoints: 2 }
        ]
      },
      {
        id: 'r1-s6',
        text: 'Die Gruppe beschließt, ein «Mikroaggressions-Wörterbuch» zu erstellen: eine Liste von Sätzen, die harmlos klingen, aber wehtun – und daneben jeweils eine bessere Alternative. Sofia schreibt. Amadou diktiert. Yuki illustriert. Robin kommentiert trocken. Am Ende haben sie zwei volle Seiten. «Wisst ihr, was das Beste ist?», sagt Amadou. «Wir haben gerade bewiesen, dass Vielfalt funktioniert. Vier komplett verschiedene Perspektiven – und zusammen sehen wir mehr als alleine.» Er nimmt seine Trommel. «Auf der Regenbogeninsel geht es nicht darum, gleich zu sein. Es geht darum, die Unterschiede als das zu sehen, was sie sind: unsere verdammte Superkraft.» Er beginnt zu trommeln. Sofia greift zur Gitarre. Und irgendwie klingt es genau richtig.',
        choices: [
          { text: '«Lasst uns das Wörterbuch an die ganze Schule verteilen. Jeder sollte das lesen.»', nextSceneId: null, empathyPoints: 2, insightPoints: 2, couragePoints: 3 },
          { text: '«Ich will mich ab jetzt selbst beobachten. Vielleicht sage ich auch Sachen, die andere verletzen, ohne es zu wissen.»', nextSceneId: null, empathyPoints: 3, insightPoints: 3, couragePoints: 1 },
          { text: '«Danke, dass ihr so offen wart. Das hat mehr verändert als jeder Schulvortrag über Toleranz.»', nextSceneId: null, empathyPoints: 3, insightPoints: 2, couragePoints: 1 }
        ]
      }
    ],
    completed: false
  },

  // ---------------------------------------------------------------------------
  // Scenario 2 – Hashtag Hass
  // Cybermobbing, Hate Speech und Hass im Netz. Wie reagiert man, wenn
  // Online-Hass real wird?
  // Referenz: Nacht (digitale Balance, Bildschirmwelt), Vulkan (Wut)
  // ---------------------------------------------------------------------------
  {
    id: 'rainbow-scenario-2',
    islandId: 'rainbow' as IslandId,
    title: 'Hashtag Hass',
    description: 'Ein Hassposting gegen eure Schule geht viral. Plötzlich steht ihr mittendrin im Shitstorm – und müsst entscheiden, wie man gegen Online-Hass kämpft, ohne selbst zu hassen.',
    scenes: [
      {
        id: 'r2-s1',
        text: 'Es beginnt mit einem einzigen Post. Jemand hat ein Foto von eurer Schulklasse genommen – vom letzten Wandertag – und daraus ein Meme gemacht. Darüber steht: «Willkommen in Luxemburg, wo echte Luxemburger bald in der Minderheit sind. 😂» Das Bild zeigt deutlich Amadou, Sofia und Yuki. Es hat schon 400 Likes. Sofias Handy vibriert ununterbrochen. «Habt ihr das gesehen?», fragt sie mit bebender Stimme. «In den Kommentaren steht … es steht …» Sie bricht ab. Amadou nimmt ihr sanft das Handy aus der Hand und liest. Sein Gesicht wird steinern.',
        choices: [
          { text: '«Zeigt mir die Kommentare. Wir müssen wissen, womit wir es zu tun haben, bevor wir reagieren.»', nextSceneId: 'r2-s2', empathyPoints: 1, insightPoints: 3, couragePoints: 2 },
          { text: '«Erstmal: Alle Handys weg. Erinnert euch an die Nachtinsel – in solchen Momenten ist Abstand vom Bildschirm das Wichtigste.»', nextSceneId: 'r2-s2', empathyPoints: 2, insightPoints: 2, couragePoints: 1 },
          { text: '«Sofia, wie geht es dir? Das ist das Wichtigste gerade. Der Post kann warten, DU nicht.»', nextSceneId: 'r2-s2', empathyPoints: 3, insightPoints: 1, couragePoints: 1 }
        ]
      },
      {
        id: 'r2-s2',
        text: 'Die Kommentare sind übel. «Geht zurück, wo ihr herkommt.» «Luxemburg den Luxemburgern.» Und schlimmeres. Amadou scrollt mit unbewegtem Gesicht. Dann legt er das Handy hin. «Wisst ihr, was mich am meisten trifft?», sagt er leise. «Nicht die Hasskommentare. Die kommen von Fremden. Was mich trifft, sind die Likes. 400 Leute, die das gut finden. 400 Leute, die finden, dass ich nicht hierhin gehöre.» Robin starrt auf den Screen. «Und 87 Leute haben es geteilt. 87 Leute verbreiten Hass – an einem Dienstagnachmittag – weil sie sonst nichts Besseres zu tun haben.»',
        choices: [
          { text: '«Wir melden das sofort. Das ist Hate Speech und das ist in Luxemburg strafbar. Screenshots machen als Beweis.»', nextSceneId: 'r2-s3', empathyPoints: 1, insightPoints: 3, couragePoints: 3 },
          { text: '«Die 400 Likes sind laut. Aber in unserer Schule sind 600 Schüler. Die MEHRHEIT hat NICHT geliked. Hass ist laut, aber er ist nicht die Mehrheit.»', nextSceneId: 'r2-s3', empathyPoints: 2, insightPoints: 3, couragePoints: 1 },
          { text: '«Amadou, 400 anonyme Accounts definieren nicht, ob du hierhin gehörst. DU gehörst hierhin. Punkt.»', nextSceneId: 'r2-s3', empathyPoints: 3, insightPoints: 1, couragePoints: 2 }
        ]
      },
      {
        id: 'r2-s3',
        text: 'Robin hat eine Idee. «Okay, Leute. Erinnert euch an die Nachtinsel. Pixel hat uns gezeigt, dass das Internet ein Verstärker ist – es macht Lautes lauter und Leises leiser. Hass ist laut. Also müssen WIR lauter sein.» Robin tippt auf dem Handy. «Was, wenn wir einen Gegen-Hashtag starten? #MäiLëtzebuerg – Mein Luxemburg. Jeder postet, was Luxemburg für ihn bedeutet. Echte Gesichter, echte Geschichten.» Yuki hebt die Hand. «Aber … Gegenfeuer kann auch nach hinten losgehen. Was, wenn die Trolle unseren Hashtag kapern? Was, wenn es noch schlimmer wird?»',
        choices: [
          { text: '«Das Risiko besteht. Aber Schweigen ist schlimmer. Auf der Waldinsel haben wir gelernt: Mut heißt nicht, keine Angst zu haben – Mut heißt, trotz der Angst zu handeln.»', nextSceneId: 'r2-s4', empathyPoints: 1, insightPoints: 2, couragePoints: 3 },
          { text: '«Yukis Bedenken sind berechtigt. Lasst uns BEIDES machen: Den Post melden UND den Gegen-Hashtag starten. Aber mit einem Plan.»', nextSceneId: 'r2-s4', empathyPoints: 2, insightPoints: 3, couragePoints: 2 },
          { text: '«Vielleicht sollten wir zuerst mit Erwachsenen reden? Lehrern, Eltern? Das ist größer als wir.»', nextSceneId: 'r2-s4', empathyPoints: 2, insightPoints: 2, couragePoints: 1 }
        ]
      },
      {
        id: 'r2-s4',
        text: 'Der Gegen-Hashtag geht live. Sofia postet ein Video, in dem sie auf Portugiesisch und Luxemburgisch ein Lied singt, das sie selbst geschrieben hat. Amadou trommelt den Rhythmus dazu. In 24 Stunden hat es mehr Aufrufe als das Hass-Meme. Aber dann kommt der Rückschlag: Jemand findet heraus, wer das Original-Meme gepostet hat. Es war kein anonymer Internet-Troll. Es war Tim, ein Schüler aus der Parallelklasse. Tim, der immer nett war. Tim, mit dem Amadou mal Fußball gespielt hat.',
        choices: [
          { text: '«Das ändert alles. Und gleichzeitig nichts. Es ist immer noch Hate Speech. Aber jetzt können wir DIREKT mit ihm reden.»', nextSceneId: 'r2-s5', empathyPoints: 2, insightPoints: 3, couragePoints: 2 },
          { text: '«Tim an den Pranger zu stellen wäre genauso schlimm wie das, was er getan hat. Aber er muss die Konsequenzen spüren.»', nextSceneId: 'r2-s5', empathyPoints: 3, insightPoints: 2, couragePoints: 1 },
          { text: '«Auf dem Vulkan habe ich gelernt: Wut auf eine Person ist okay. Aber Rache macht alles schlimmer. Wir brauchen Gerechtigkeit, keine Vergeltung.»', nextSceneId: 'r2-s5', empathyPoints: 2, insightPoints: 2, couragePoints: 2 }
        ]
      },
      {
        id: 'r2-s5',
        text: 'Die Schule organisiert ein Treffen. Tim sitzt da, Arme verschränkt, Gesicht verschlossen. Er sagt wenig. Aber dann, nach einer Stunde, bricht es aus ihm heraus: «Mein Vater sagt jeden Abend, dass die Ausländer uns die Jobs wegnehmen. JEDEN Abend. Irgendwann … glaubt man es halt.» Stille. Amadou schaut Tim lange an. Dann sagt er: «Ich verstehe, dass dein Vater Angst hat. Angst um seinen Job, seine Zukunft. Auf der Ozeaninsel habe ich gelernt, dass hinter Wut oft Trauer steckt. Und hinter Hass oft Angst.» Tim schluckt. «Aber das ENTSCHULDIGT nicht, was du getan hast», fügt Robin hinzu. «Verstehen heißt nicht verzeihen. Noch nicht.»',
        choices: [
          { text: '«Robin hat recht. Verständnis ist der erste Schritt. Aber Tim muss zeigen, dass er es WIRKLICH bereut – durch Handlungen, nicht nur Worte.»', nextSceneId: 'r2-s6', empathyPoints: 2, insightPoints: 3, couragePoints: 2 },
          { text: '«Tim, du kannst den Post nicht ungeschehen machen. Aber du kannst entscheiden, was du AB JETZT tust. Wie auf der Berginsel: Dein Wert hängt nicht von den Meinungen deines Vaters ab.»', nextSceneId: 'r2-s6', empathyPoints: 3, insightPoints: 2, couragePoints: 2 },
          { text: '«Ich finde es mutig von Tim, das zuzugeben. Aber die Betroffenen – Amadou, Sofia, Yuki – entscheiden, ob und wann sie vergeben. Nicht wir.»', nextSceneId: 'r2-s6', empathyPoints: 3, insightPoints: 2, couragePoints: 1 }
        ]
      },
      {
        id: 'r2-s6',
        text: 'Wochen später. Tim hat den Post gelöscht und sich öffentlich entschuldigt. Er macht jetzt beim #MäiLëtzebuerg-Projekt mit – nicht weil er muss, sondern weil er will. Es ist unbequem für ihn, aber er bleibt. Amadou und er reden wieder miteinander – vorsichtig, aber ehrlich. «Ist alles gut zwischen euch?», fragt Sofia. Amadou überlegt. «Nein. Nicht alles ist gut. Aber es ist besser. Und ‹besser› ist ein Anfang.» Robin grinst. «Wisst ihr, was das Verrückteste ist? Der Hass-Post hat uns zusammengebracht. 1.200 Leute nutzen jetzt #MäiLëtzebuerg. Aus Hass wurde eine Bewegung. Das ist doch mal eine Plottwist.» Yuki lächelt. «Manchmal entsteht das schönste Licht aus der dunkelsten Nacht. Habt ihr auf der Nachtinsel nicht genau das gelernt?»',
        choices: [
          { text: '«Ja – und die wichtigste Lektion: Nicht wegschauen. Nicht schweigen. Hass stirbt im Licht.»', nextSceneId: null, empathyPoints: 2, insightPoints: 3, couragePoints: 3 },
          { text: '«Ich bin stolz auf uns alle. Auch auf Tim. Veränderung ist möglich – sogar bei Leuten, von denen man es nicht erwartet.»', nextSceneId: null, empathyPoints: 3, insightPoints: 2, couragePoints: 1 },
          { text: '«Das war erst der Anfang. Online-Hass wird nicht aufhören. Aber jetzt wissen wir, wie wir kämpfen.»', nextSceneId: null, empathyPoints: 1, insightPoints: 3, couragePoints: 3 }
        ]
      }
    ],
    completed: false
  },

  // ---------------------------------------------------------------------------
  // Scenario 3 – Zwischen allen Stühlen
  // Hybride Identität, kulturelle Zerrissenheit und die Frage:
  // Wer bin ich, wenn ich zu BEIDEN Seiten gehöre – und zu keiner ganz?
  // Referenz: Ozean (Verlust/Trauer), Berg (Selbstwert)
  // ---------------------------------------------------------------------------
  {
    id: 'rainbow-scenario-3',
    islandId: 'rainbow' as IslandId,
    title: 'Zwischen allen Stühlen',
    description: 'Yuki fühlt sich nirgends ganz zugehörig – zu japanisch für Luxemburg, zu luxemburgisch für Japan. Eine Reise durch die Frage: Muss man sich entscheiden, wer man ist?',
    scenes: [
      {
        id: 'r3-s1',
        text: 'Yuki sitzt allein auf einem Felsen am Rand der Regenbogeninsel. Vor ihr liegt ihr Skizzenbuch, aufgeschlagen auf einer Seite, die in der Mitte zerrissen ist. Links hat sie ein Manga-Mädchen in einem Kimono gezeichnet. Rechts dasselbe Mädchen in Jeans und Sneakers. In der Mitte: nichts. Nur der Riss. «Meine Oma in Tokio sagt, ich bin keine richtige Japanerin, weil ich kein perfektes Japanisch spreche», sagt Yuki, ohne aufzuschauen. «Und hier in Luxemburg fragen alle: ‹Wo kommst du WIRKLICH her?› Als wäre ‹Luxemburg› die falsche Antwort.»',
        choices: [
          { text: '«Du musst dich nicht zwischen zwei Hälften entscheiden. Du bist kein Kompromiss – du bist eine Kombination. Und Kombinationen sind immer interessanter als das Original.»', nextSceneId: 'r3-s2', empathyPoints: 2, insightPoints: 3, couragePoints: 1 },
          { text: '«Das klingt unglaublich einsam. Sich nirgends ganz zugehörig fühlen … Auf der Ozeaninsel haben wir gelernt, wie wichtig es ist, Verlust zu benennen. Vermisst du etwas?»', nextSceneId: 'r3-s2', empathyPoints: 3, insightPoints: 2, couragePoints: 1 },
          { text: '«Ich verstehe das nicht ganz, weil ich das nicht erlebe. Aber ich WILL es verstehen. Erklär mir mehr.»', nextSceneId: 'r3-s2', empathyPoints: 2, insightPoints: 1, couragePoints: 2 }
        ]
      },
      {
        id: 'r3-s2',
        text: 'Sofia setzt sich neben Yuki. «Ich kenne das Gefühl», sagt sie. «In Portugal sagen sie: ‹Du bist ja jetzt eine Luxemburgerin.› Und hier bin ich ‹die Portugiesin›. Es ist, als würdest du immer das Falsche sein – je nachdem, wo du stehst.» Sie holt ihr Handy raus und zeigt ein Foto: eine Straße in Lissabon, bunt gefliest, mit Wäsche, die zwischen den Häusern hängt. «Das ist die Straße, in der ich aufgewachsen bin. Manchmal habe ich so viel Saudade, dass es wehtut.» Yuki schaut das Foto lange an. «Und was machst du dann?» Sofia lächelt: «Ich spiele Fado. Und dann schreibe ich einen Rock-Song. Weil ich BEIDES bin.»',
        choices: [
          { text: '«Sofias Musik ist der beste Beweis: Wenn man zwei Kulturen hat, entsteht etwas Neues. Etwas, das niemand anders machen kann.»', nextSceneId: 'r3-s3', empathyPoints: 2, insightPoints: 3, couragePoints: 1 },
          { text: '«Saudade … Auf der Ozeaninsel haben wir gelernt, dass Sehnsucht und Liebe Geschwister sind. Dein Heimweh zeigt, wie viel dir beide Orte bedeuten.»', nextSceneId: 'r3-s3', empathyPoints: 3, insightPoints: 2, couragePoints: 0 },
          { text: '«Aber ehrlich – ist es nicht anstrengend, immer erklären zu müssen, wer man ist? Sollte man nicht einfach akzeptiert werden?»', nextSceneId: 'r3-s3', empathyPoints: 1, insightPoints: 2, couragePoints: 2 }
        ]
      },
      {
        id: 'r3-s3',
        text: 'Amadou lehnt sich gegen einen Baum. «Ich will euch was erzählen. In meiner Familie bin ich der ‹Europäer›. Mein Cousin in Dakar sagt: ‹Du hast vergessen, woher du kommst.› Weil ich nicht mehr so gut Wolof spreche. Weil ich Käsefondue mag. Weil mein bester Freund ein weißer Luxemburger ist.» Er schüttelt den Kopf. «Und gleichzeitig sagen Leute hier: ‹Amadou, erzähl uns von DEINER Kultur!› Als hätte ich nur EINE. Als wäre Luxemburg nicht auch meine Kultur.» Robin wirft ein: «Das ist der Punkt: Die Welt will, dass wir in eine Schublade passen. Aber wir sind keine Schubladen-Menschen. Wir sind … Kommodenmenschen. Mit vielen Schubladen.»',
        choices: [
          { text: '«Robin, das ist das beste Bild, das ich je gehört habe. Wir sind Kommoden. Mit manchen Schubladen, die wir öffnen, und manchen, die wir für uns behalten.»', nextSceneId: 'r3-s4', empathyPoints: 2, insightPoints: 3, couragePoints: 0 },
          { text: '«Amadou, dein Cousin hat genauso Unrecht wie die Leute hier. Niemand hat das Recht zu entscheiden, ob du ‹afrikanisch genug› oder ‹luxemburgisch genug› bist. Das entscheidest nur DU.»', nextSceneId: 'r3-s4', empathyPoints: 2, insightPoints: 2, couragePoints: 3 },
          { text: '«Kennt ihr den Begriff ‹Third Culture Kid›? Das sind Leute, die zwischen Kulturen aufwachsen und eine eigene, dritte Kultur entwickeln. Das seid ihr alle.»', nextSceneId: 'r3-s4', empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
        ]
      },
      {
        id: 'r3-s4',
        text: 'Yuki blättert in ihrem Skizzenbuch. Sie zeigt eine neue Zeichnung: Nicht mehr eine Figur, die in der Mitte zerrissen ist, sondern eine, die aus Puzzleteilen besteht – japanische, luxemburgische, und welche, die keinem Land gehören. «Ich hab nachgedacht», sagt sie. «Auf der Berginsel habe ich gelernt, dass mein Wert nicht von der Meinung anderer abhängt. Dass mein innerer Kritiker lügt.» Sie tippt auf die Zeichnung. «Mein innerer Kritiker sagt: Du bist nicht genug. Nicht japanisch genug. Nicht luxemburgisch genug. Aber was, wenn ‹genug› gar nicht die richtige Frage ist?»',
        choices: [
          { text: '«Die richtige Frage ist nicht ‹Bin ich genug?›, sondern ‹Bin ich ECHT?› Und ja, Yuki – du bist verdammt echt.»', nextSceneId: 'r3-s5', empathyPoints: 2, insightPoints: 3, couragePoints: 2 },
          { text: '«Dein Puzzle-Bild ist perfekt. Wir bestehen alle aus Teilen. Und die Teile müssen nicht zueinander passen – sie müssen nur zu UNS passen.»', nextSceneId: 'r3-s5', empathyPoints: 3, insightPoints: 2, couragePoints: 1 },
          { text: '«Ich finde, Luxemburg braucht Menschen wie euch. Genau WEIL ihr zwischen den Welten steht, seht ihr Dinge, die andere nicht sehen. Das ist ein Geschenk.»', nextSceneId: 'r3-s5', empathyPoints: 2, insightPoints: 2, couragePoints: 2 }
        ]
      },
      {
        id: 'r3-s5',
        text: 'Robin steht auf und stellt sich in die Mitte der Gruppe. «Okay, Moment. Ich will euch allen was sagen. Mir geht es GENAUSO. Nicht wegen Ländern oder Sprachen, aber wegen … allem anderen.» Robin breitet die Arme aus. «Die Welt sagt: Du bist entweder ein Junge oder ein Mädchen. Ich sage: Nein. Die Welt sagt: Du musst Sport ODER Kunst mögen. Ich sage: Warum nicht beides? Die Welt sagt: Entscheide dich. Und ich sage …» Robin grinst. «Nö.» Amadou lacht. «Das ist die ‹Robin-Antwort›. Auf alles.» «Genau», sagt Robin ernst. «Denn wisst ihr, was das Gegenteil von Vielfalt ist? Nicht Einheit. Sondern Enge. Und Enge erstickt.»',
        choices: [
          { text: '«Robins ‹Nö› ist die mutigste Antwort, die es gibt. Es braucht mehr Mut, NICHT in eine Schublade zu passen, als sich reinzuquetschen.»', nextSceneId: 'r3-s6', empathyPoints: 2, insightPoints: 2, couragePoints: 3 },
          { text: '«In der Garteninsel haben wir gelernt: Echte Beziehungen heißt, jemanden so zu akzeptieren, wie die Person IST. Nicht wie wir sie haben wollen.»', nextSceneId: 'r3-s6', empathyPoints: 3, insightPoints: 2, couragePoints: 1 },
          { text: '«Vielfalt ist nicht das Gegenteil von Einheit – Vielfalt IST Einheit. Verschiedene Farben, ein Regenbogen.»', nextSceneId: 'r3-s6', empathyPoints: 2, insightPoints: 3, couragePoints: 1 }
        ]
      },
      {
        id: 'r3-s6',
        text: 'Yuki nimmt die zerrissene Seite aus ihrem Skizzenbuch und klebt sie zusammen – aber nicht so, wie sie vorher war. Sie dreht die Hälften, verschiebt sie, sodass das Kimono-Mädchen und das Jeans-Mädchen übereinander liegen und etwas Neues bilden. Eine dritte Figur. Stärker als beide einzeln. «Das bin ich», sagt sie. Zum ersten Mal klingt ihre Stimme nicht unsicher, sondern stolz. Amadou beginnt zu trommeln. Sofia singt auf Portugiesisch. Robin summt mit. Und Yuki zeichnet – schnell und sicher, als hätte sie endlich gefunden, wonach sie gesucht hat. Der Regenbogen über der Insel leuchtet heller als je zuvor.',
        choices: [
          { text: '«Dieser Moment hier – vier komplett verschiedene Menschen, die zusammen etwas erschaffen, das keiner allein könnte. DAS ist Luxemburg.»', nextSceneId: null, empathyPoints: 2, insightPoints: 3, couragePoints: 2 },
          { text: '«Yuki, ich will ein Print von deiner neuen Zeichnung. Die sollte jeder sehen, der sich jemals ‹nicht genug› gefühlt hat.»', nextSceneId: null, empathyPoints: 3, insightPoints: 2, couragePoints: 1 },
          { text: '«Ich nehme mit: Ich muss nicht alles sein. Ich muss nur ICH sein. Und das reicht.»', nextSceneId: null, empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
        ]
      }
    ],
    completed: false
  },

  // ---------------------------------------------------------------------------
  // Scenario 4 – Die unsichtbare Mauer
  // Strukturelle Diskriminierung und Ausgrenzung. Was passiert, wenn das
  // System selbst unfair ist – nicht einzelne Personen?
  // Referenz: Wald (Angst vor dem Unbekannten), Garten (Beziehungen, Fairness)
  // ---------------------------------------------------------------------------
  {
    id: 'rainbow-scenario-4',
    islandId: 'rainbow' as IslandId,
    title: 'Die unsichtbare Mauer',
    description: 'Robin entdeckt, dass nicht alle die gleichen Chancen haben – nicht wegen böser Absicht, sondern weil das System selbst schief ist. Die härteste Lektion: Manchmal reicht Freundlichkeit nicht. Manchmal muss man das System ändern.',
    scenes: [
      {
        id: 'r4-s1',
        text: 'Die Schule organisiert einen Talentwettbewerb. Jeder kann mitmachen. Klingt fair, oder? Amadou will seine Djembe-Performance zeigen. Aber dann liest er die Regeln: «Alle Instrumente müssen auf der offiziellen Liste der Schule stehen. Bei Fragen wenden Sie sich an den Fachbereich Musik.» Djembe steht nicht auf der Liste. Klavier, Geige, Gitarre, Querflöte – ja. Djembe – nein. «Das ist doch …», Amadou sucht nach Worten. «Das ist doch nicht fair. Warum zählt MEIN Instrument nicht?»',
        choices: [
          { text: '«Weil die Liste von Leuten gemacht wurde, die nur eine bestimmte Art von Musik kennen. Das ist keine böse Absicht – aber es ist trotzdem Ausgrenzung.»', nextSceneId: 'r4-s2', empathyPoints: 1, insightPoints: 3, couragePoints: 2 },
          { text: '«Das ist unfair! Lass uns sofort zum Musiklehrer gehen und das ändern.»', nextSceneId: 'r4-s2', empathyPoints: 1, insightPoints: 1, couragePoints: 3 },
          { text: '«Amadou, wie fühlst du dich gerade? Wütend? Traurig? Frustriert?»', nextSceneId: 'r4-s2', empathyPoints: 3, insightPoints: 1, couragePoints: 1 }
        ]
      },
      {
        id: 'r4-s2',
        text: 'Robin schaut sich die Regeln genauer an. «Moment. Das ist nicht das einzige Problem.» Robin zeigt auf Punkt 7: «Präsentationen müssen auf Deutsch oder Französisch gehalten werden.» «Und wenn Sofia auf Portugiesisch singen will?» Sofia verschränkt die Arme. «Oder wenn Yuki ihren Manga auf Japanisch vorstellt?» Robin fährt fort: «Und Punkt 12: Die Jury besteht aus Fachlehrern der Schule. Keinem einzigen Schüler. Keinem einzigen Elternteil. Keine externe Person.» Robin sieht euch an. «Das System ist nicht ABSICHTLICH unfair. Aber es ist unfair, weil es nur eine bestimmte Art von Talent sieht. Und alles andere? Unsichtbar.»',
        choices: [
          { text: '«Das ist strukturelle Diskriminierung. Nicht weil jemand böse ist, sondern weil niemand darüber NACHGEDACHT hat, dass die Regeln nicht für alle funktionieren.»', nextSceneId: 'r4-s3', empathyPoints: 1, insightPoints: 3, couragePoints: 2 },
          { text: '«Wisst ihr, was mich an die Garteninsel erinnert? Dort haben wir gelernt, dass faire Beziehungen bedeuten, dass ALLE gehört werden. Nicht nur die Lauten.»', nextSceneId: 'r4-s3', empathyPoints: 2, insightPoints: 3, couragePoints: 1 },
          { text: '«Dann ändern wir die Regeln! Wer sagt, dass wir das einfach akzeptieren müssen?»', nextSceneId: 'r4-s3', empathyPoints: 0, insightPoints: 2, couragePoints: 3 }
        ]
      },
      {
        id: 'r4-s3',
        text: 'Die Gruppe beschließt, einen Vorschlag für neue, inklusivere Regeln zu schreiben. Aber es wird komplizierter als gedacht. Sofia will, dass ALLE Sprachen erlaubt sind. Amadou will, dass ALLE Instrumente erlaubt sind. Robin will, dass Schüler in der Jury sitzen. Yuki will, dass auch Kunst-Performances (Manga, Zeichnen live) als Talent zählen. «Und wer entscheidet jetzt?», fragt eine Stimme aus dem Hintergrund. Es ist Herr Weber, der Musiklehrer. Er hat zugehört. «Ihr habt gute Punkte. Aber lasst mich euch etwas fragen: Wenn alles erlaubt ist und es keine Regeln gibt – wie bewertet man dann fair?»',
        choices: [
          { text: '«Fair heißt nicht ‹gleich›. Es heißt, dass jeder die GLEICHE CHANCE bekommt, sein Talent zu zeigen – unabhängig davon, welches Talent es ist.»', nextSceneId: 'r4-s4', empathyPoints: 1, insightPoints: 3, couragePoints: 2 },
          { text: '«Gute Frage. Vielleicht brauchen wir verschiedene Kategorien? Damit Klavier und Djembe nicht gegeneinander antreten müssen.»', nextSceneId: 'r4-s4', empathyPoints: 2, insightPoints: 3, couragePoints: 0 },
          { text: '«Herr Weber, mit Respekt: Die bisherigen Regeln waren auch nicht fair. Sie waren nur vertrauter. Vertraut ist nicht dasselbe wie gerecht.»', nextSceneId: 'r4-s4', empathyPoints: 1, insightPoints: 2, couragePoints: 3 }
        ]
      },
      {
        id: 'r4-s4',
        text: 'Herr Weber ist überrascht – und beeindruckt. «Ihr habt recht», gibt er zu. «Ich habe die Regeln vor zehn Jahren geschrieben und nie hinterfragt. Die Welt hat sich verändert, aber die Regeln nicht.» Er denkt nach. «Okay, hier ist mein Vorschlag: IHR schreibt neue Regeln. Gemeinsam. Aber sie müssen für ALLE funktionieren – nicht nur für euch.» Yuki flüstert: «Wisst ihr, das ist wie auf der Berginsel. Dort ging es darum, den eigenen Wert zu erkennen. Hier geht es darum, den Wert ALLER anzuerkennen – auch derer, die anders sind als wir.»',
        choices: [
          { text: '«Challenge accepted. Wir schreiben Regeln, die so vielfältig sind wie diese Schule. Und wir fragen ALLE – nicht nur unsere Gruppe.»', nextSceneId: 'r4-s5', empathyPoints: 2, insightPoints: 2, couragePoints: 3 },
          { text: '«Ich finde es stark von Herrn Weber, dass er zugibt, dass die alten Regeln nicht perfekt waren. DAS ist auch eine Form von Mut.»', nextSceneId: 'r4-s5', empathyPoints: 3, insightPoints: 2, couragePoints: 1 },
          { text: '«Lasst uns eine Umfrage in der ganzen Schule machen. Jeder soll sagen, was ‹Talent› für ihn bedeutet. Dann bauen wir die Regeln darauf auf.»', nextSceneId: 'r4-s5', empathyPoints: 2, insightPoints: 3, couragePoints: 1 }
        ]
      },
      {
        id: 'r4-s5',
        text: 'Die Umfrage bringt erstaunliche Ergebnisse. Ein Mädchen im Rollstuhl schreibt: «Ich tanze. Im Sitzen. Aber das zählt nie als ‹echtes› Tanzen.» Ein Junge mit Stottern schreibt: «Ich kann Geschichten erzählen. Aber bei einem Vortrag hat man nur 5 Minuten. Ich brauche 8.» Ein Mädchen mit Hijab schreibt: «Letztes Jahr wurde mein Modeprojekt abgelehnt, weil es ‹nicht zum Thema Freiheit passt›. Als ob ein Kopftuch das Gegenteil von Freiheit wäre.» Robin liest die Antworten vor und die Gruppe wird still. «Seht ihr?», sagt Robin leise. «Es geht nicht nur um UNS. Es geht um ALLE, die vor unsichtbaren Mauern stehen.»',
        choices: [
          { text: '«Jede dieser Geschichten ist ein Beweis, dass ‹normal› keine echte Kategorie ist. Es gibt nur ‹sichtbar› und ‹unsichtbar›. Und wir machen das Unsichtbare sichtbar.»', nextSceneId: 'r4-s6', empathyPoints: 2, insightPoints: 3, couragePoints: 2 },
          { text: '«Ich fühle mich gerade demütig. Ich dachte, ich verstehe Diskriminierung. Aber es gibt so viele Formen, die ich nicht mal bemerkt habe.»', nextSceneId: 'r4-s6', empathyPoints: 3, insightPoints: 2, couragePoints: 1 },
          { text: '«Okay, neue Mission: Wir schreiben nicht nur Regeln für den Talentwettbewerb. Wir schreiben einen Leitfaden für die ganze Schule. Inklusion als Standard, nicht als Ausnahme.»', nextSceneId: 'r4-s6', empathyPoints: 1, insightPoints: 2, couragePoints: 3 }
        ]
      },
      {
        id: 'r4-s6',
        text: 'Der neue Talentwettbewerb wird legendär. Amadou spielt Djembe und die halbe Schule klatscht den Rhythmus mit. Sofia singt auf Portugiesisch und alle verstehen die Emotion, auch ohne die Worte zu kennen. Das Mädchen im Rollstuhl tanzt und bekommt Standing Ovations. Der Junge mit Stottern erzählt seine Geschichte in seinem Tempo – und niemand schaut auf die Uhr. Am Ende sagt Herr Weber ins Mikrofon: «Ich unterrichte seit zwanzig Jahren. Heute habe ich mehr über Talent gelernt als in all diesen Jahren zusammen.» Amadou trommelt leise. «Wisst ihr, was wir gerade getan haben?», sagt er. «Wir haben keine Mauer eingerissen. Wir haben eine Tür eingebaut. Und Türen sind für alle da.»',
        choices: [
          { text: '«Eine Tür einbauen statt eine Mauer einreißen – das nehme ich mit. Veränderung muss nicht zerstörerisch sein. Sie kann einladend sein.»', nextSceneId: null, empathyPoints: 2, insightPoints: 3, couragePoints: 2 },
          { text: '«Aber wir dürfen nicht aufhören. Es gibt noch so viele unsichtbare Mauern. In der Schule, in der Stadt, in unseren Köpfen.»', nextSceneId: null, empathyPoints: 1, insightPoints: 2, couragePoints: 3 },
          { text: '«Ich hab heute gelernt: Fairness heißt nicht, alle gleich zu behandeln. Es heißt, jedem das zu geben, was er braucht, um die gleichen Chancen zu haben.»', nextSceneId: null, empathyPoints: 2, insightPoints: 3, couragePoints: 1 }
        ]
      }
    ],
    completed: false
  },

  // ---------------------------------------------------------------------------
  // Scenario 5 – Wer spricht für wen?
  // Allyship, Stellvertretung und die Frage: Wann hilft man – und wann
  // übernimmt man? Wer hat das Recht, die Geschichte anderer zu erzählen?
  // Referenz: Garten (Beziehungen, Grenzen), Berg (eigene Stimme finden)
  // ---------------------------------------------------------------------------
  {
    id: 'rainbow-scenario-5',
    islandId: 'rainbow' as IslandId,
    title: 'Wer spricht für wen?',
    description: 'Ein gut gemeintes Schulprojekt geht schief – weil Leute ÜBER andere reden statt MIT ihnen. Die Gruppe lernt den Unterschied zwischen Helfen und Bestimmen.',
    scenes: [
      {
        id: 'r5-s1',
        text: 'Die Schülervertretung plant eine «Diversity Week». Gute Absicht. Aber dann sehen die Poster aus: Auf einem steht «Hilfe für unsere ausländischen Mitschüler» mit einem Foto von lächelnden Kindern aus der ganzen Welt. Sofia starrt das Poster an. «HILFE für unsere ausländischen Mitschüler?», wiederholt sie langsam. «Als wären wir Hilfsbedürftige? Als wären wir ein PROBLEM, das gelöst werden muss?» Amadou verschränkt die Arme. «Und wer hat das geplant? Lasst mich raten: Die Schülervertretung. In der kein einziges Kind mit Migrationshintergrund sitzt.»',
        choices: [
          { text: '«Die ABSICHT war gut. Aber die Umsetzung ist … problematisch. Gut gemeint ist das Gegenteil von gut gemacht.»', nextSceneId: 'r5-s2', empathyPoints: 2, insightPoints: 3, couragePoints: 1 },
          { text: '«Das ist respektlos. Über uns reden, ohne uns zu fragen? Das geht gar nicht.»', nextSceneId: 'r5-s2', empathyPoints: 1, insightPoints: 2, couragePoints: 3 },
          { text: '«Sofia, ich verstehe deine Wut. Gleichzeitig wollten die Schülervertreter vermutlich wirklich helfen. Wie gehen wir damit um?»', nextSceneId: 'r5-s2', empathyPoints: 3, insightPoints: 2, couragePoints: 1 }
        ]
      },
      {
        id: 'r5-s2',
        text: 'Die Gruppe geht zur Schülervertretung. Clara, die Vorsitzende, ist verwirrt. «Aber wir wollten doch was Gutes tun? Wir setzen uns für euch ein!» Robin hebt die Hand. «Clara, schnelle Frage: Hast du irgendjemanden von uns gefragt, ob wir diese Diversity Week wollen? Ob wir die Poster gut finden? Ob wir überhaupt als ‹ausländische Mitschüler› bezeichnet werden wollen?» Clara wird rot. «Nein, aber …» «Kein Aber», sagt Robin. «Es gibt einen Unterschied zwischen FÜR jemanden sprechen und MIT jemandem sprechen. Und ihr habt FÜR uns gesprochen. Ohne uns.»',
        choices: [
          { text: '«Robin hat recht, aber lasst uns nicht kämpferisch sein. Clara meinte es gut. Die Frage ist: Wie machen wir es jetzt ZUSAMMEN besser?»', nextSceneId: 'r5-s3', empathyPoints: 3, insightPoints: 2, couragePoints: 1 },
          { text: '«‹Nichts über uns ohne uns.› Das ist ein Grundsatz, den wir alle lernen müssen. Clara, ihr auch.»', nextSceneId: 'r5-s3', empathyPoints: 1, insightPoints: 3, couragePoints: 2 },
          { text: '«Ich finde, Clara verdient Anerkennung dafür, dass sie ÜBERHAUPT etwas tut. Aber jetzt muss sie den nächsten Schritt machen: zuhören.»', nextSceneId: 'r5-s3', empathyPoints: 2, insightPoints: 2, couragePoints: 1 }
        ]
      },
      {
        id: 'r5-s3',
        text: 'Clara schluckt ihren Stolz herunter. «Okay. Ihr habt recht. Was schlagt ihr vor?» Amadou übernimmt. «Erstens: WIR erzählen unsere Geschichten. Nicht ihr. Zweitens: Die Poster werden geändert. Keine ‹Hilfe für Ausländer›. Sondern: ‹Luxemburg ist bunt – lass uns reden.›» Sofia ergänzt: «Drittens: In der Diversity Week soll es nicht nur um UNSERE Vielfalt gehen. Vielfalt betrifft ALLE. Auch Clara, die sich als ‹normal-luxemburgisch› sieht. Denn was ist ‹normal›?»',
        choices: [
          { text: '«Sofias Punkt ist genial. ‹Normal› gibt es nicht. Jeder hat eine Geschichte, eine Identität, eine Vielfalt – auch die, die sich als ‹Mainstream› sehen.»', nextSceneId: 'r5-s4', empathyPoints: 2, insightPoints: 3, couragePoints: 1 },
          { text: '«Ich finde es mutig von Clara, zuzuhören statt sich zu verteidigen. Das ist echte Stärke – wie auf der Berginsel, wo wir gelernt haben, Kritik anzunehmen.»', nextSceneId: 'r5-s4', empathyPoints: 3, insightPoints: 2, couragePoints: 1 },
          { text: '«Lasst uns die Diversity Week ZUSAMMEN planen. Alle Stimmen am Tisch. Keine Stellvertreter, keine Lautsprecher für andere.»', nextSceneId: 'r5-s4', empathyPoints: 2, insightPoints: 2, couragePoints: 2 }
        ]
      },
      {
        id: 'r5-s4',
        text: 'Die neue Diversity Week wird ganz anders. Statt Vorträgen gibt es «Story Circles» – kleine Runden, in denen jeder seine Geschichte erzählt. Yuki moderiert eine Runde. Ein Junge – blond, luxemburgisch, so «normal» wie es nur geht – erzählt stockend, dass sein Vater alkoholabhängig ist und er sich nirgends zugehörig fühlt. Ein anderes Mädchen erzählt, dass sie wegen ihres Gewichts gemobbt wird. «Seht ihr?», flüstert Yuki. «Vielfalt ist nicht nur Herkunft und Hautfarbe. Vielfalt ist JEDE Geschichte, die nicht der ‹Norm› entspricht. Und wenn man genau hinschaut: Niemand entspricht der Norm.»',
        choices: [
          { text: '«Das ist die tiefste Erkenntnis der Regenbogeninsel: Es gibt keine Norm. Es gibt nur Menschen. Und jeder Mensch ist eine ganze Welt.»', nextSceneId: 'r5-s5', empathyPoints: 3, insightPoints: 3, couragePoints: 1 },
          { text: '«Jetzt verstehe ich, warum die Nachtinsel so wichtig war: Wenn man still wird und zuhört, hört man Geschichten, die sonst untergehen.»', nextSceneId: 'r5-s5', empathyPoints: 2, insightPoints: 3, couragePoints: 0 },
          { text: '«Der Junge, der über seinen Vater gesprochen hat – das hat mich umgehauen. Mut kommt in so vielen Formen.»', nextSceneId: 'r5-s5', empathyPoints: 3, insightPoints: 1, couragePoints: 2 }
        ]
      },
      {
        id: 'r5-s5',
        text: 'Am dritten Tag der Diversity Week passiert etwas Unerwartetes. Max, ein Schüler, der bisher immer «Ich bin doch nicht rassistisch» gesagt hat, meldet sich freiwillig für einen Story Circle. Er erzählt: «Ich habe immer gedacht, Vielfalt ist ein Thema für ‹die anderen›. Für Leute, die anders aussehen als ich. Aber diese Woche habe ich gelernt, dass ICH auch Teil davon bin. Dass MEINE Geschichte auch zählt. Und dass Zuhören manchmal wichtiger ist als Reden.» Sofia schaut Amadou an. Amadou lächelt. Es ist das erste echte Lächeln seit dem Poster-Vorfall.',
        choices: [
          { text: '«DAS ist der Durchbruch. Wenn Leute wie Max verstehen, dass Vielfalt ALLE betrifft, ändert sich alles.»', nextSceneId: 'r5-s6', empathyPoints: 2, insightPoints: 3, couragePoints: 1 },
          { text: '«Max hat gerade mehr Mut gezeigt als die meisten. Sich einzugestehen, dass man falsch lag, ist eine der schwersten Sachen überhaupt.»', nextSceneId: 'r5-s6', empathyPoints: 3, insightPoints: 2, couragePoints: 2 },
          { text: '«Ich hoffe, er meint es ernst. Worte sind ein Anfang. Aber Veränderung zeigt sich in Taten. Auf der Vulkaninsel haben wir gelernt: Vorsätze sind leicht. Durchhalten ist die Kunst.»', nextSceneId: 'r5-s6', empathyPoints: 1, insightPoints: 3, couragePoints: 2 }
        ]
      },
      {
        id: 'r5-s6',
        text: 'Die Diversity Week endet mit einem «Open Mic», bei dem jeder ans Mikrofon kann. Clara, die Schülervertreterin, tritt als Erste auf. «Am Montag habe ich einen Fehler gemacht», sagt sie. «Ich wollte helfen, aber ich habe FÜR andere gesprochen statt MIT ihnen. Das war falsch. Und es war mir peinlich. Aber Sofia, Amadou, Robin und Yuki haben mir etwas Wichtiges beigebracht …» Sie holt tief Luft. «Verbündete sind keine Lautsprecher. Verbündete sind Mikrofone – sie verstärken die Stimmen, die da sind. Sie erfinden keine neuen.» Tosender Applaus. Robin lehnt sich zu euch: «Wisst ihr, was? Ich glaube, Clara hat gerade mehr gelernt als wir alle in den letzten sechs Inseln zusammen.»',
        choices: [
          { text: '«Lautsprecher vs. Mikrofon – das vergesse ich nie. Die beste Definition von Allyship, die ich je gehört habe.»', nextSceneId: null, empathyPoints: 2, insightPoints: 3, couragePoints: 1 },
          { text: '«Der wahre Mut war nicht, die Diversity Week zu planen. Der wahre Mut war, zuzugeben, dass man es falsch gemacht hat – und es dann besser zu machen.»', nextSceneId: null, empathyPoints: 2, insightPoints: 2, couragePoints: 3 },
          { text: '«Ich nehme mit: Gute Absicht plus Zuhören plus Demut ergibt echte Veränderung. Eins davon allein reicht nicht.»', nextSceneId: null, empathyPoints: 3, insightPoints: 3, couragePoints: 1 }
        ]
      }
    ],
    completed: false
  },

  // ---------------------------------------------------------------------------
  // Scenario 6 – Der Regenbogen-Pakt
  // FINALE. Alle Lektionen von allen Inseln kommen zusammen. Die Gruppe
  // steht vor der größten Herausforderung: Einen dauerhaften Wandel
  // schaffen, der über sie selbst hinausgeht.
  // Referenz: ALLE Inseln
  // ---------------------------------------------------------------------------
  {
    id: 'rainbow-scenario-6',
    islandId: 'rainbow' as IslandId,
    title: 'Der Regenbogen-Pakt',
    description: 'Die letzte und größte Herausforderung der Regenbogeninsel: Einen Pakt schmieden, der bleibt. Nicht nur für euch – für alle, die nach euch kommen.',
    scenes: [
      {
        id: 'r6-s1',
        text: 'Der Himmel über der Regenbogeninsel verdunkelt sich. Nicht bedrohlich – eher wie in einer Kathedrale. Feierlich. Alle vier NPCs stehen zusammen: Sofia mit Gitarre, Amadou mit Trommel, Yuki mit Skizzenbuch, Robin mit diesem Grinsen. «Wisst ihr, was mir aufgefallen ist?», beginnt Robin. «Auf jeder Insel haben wir etwas gelernt. Vulkan: Wut verstehen. Ozean: Trauer aushalten. Wald: Angst überwinden. Berg: Selbstwert entdecken. Garten: Beziehungen pflegen. Nacht: Stille ertragen und digitale Balance finden.» Robin macht eine Pause. «Und hier, auf der Regenbogeninsel? Hier sollen wir alles ZUSAMMENBRINGEN. Weil Vielfalt nicht ein Thema neben anderen ist. Es IST alle anderen Themen.»',
        choices: [
          { text: '«Robin hat recht. Vielfalt ist der Rahmen, der alles andere verbindet. Ohne Vielfalt wäre jede andere Lektion nur halb so wichtig.»', nextSceneId: 'r6-s2', empathyPoints: 1, insightPoints: 3, couragePoints: 2 },
          { text: '«Und was machen wir jetzt? Was ist die LETZTE Lektion, bevor wir zur Heimatinsel weiterziehen?»', nextSceneId: 'r6-s2', empathyPoints: 1, insightPoints: 2, couragePoints: 2 },
          { text: '«Mich beeindruckt, wie weit wir alle gekommen sind. Am Anfang kannte ich euch kaum. Jetzt seid ihr … ja. Familie.»', nextSceneId: 'r6-s2', empathyPoints: 3, insightPoints: 1, couragePoints: 2 }
        ]
      },
      {
        id: 'r6-s2',
        text: 'Sofia greift einen Akkord. «Ich habe einen Vorschlag. Wir schreiben einen Pakt. Einen Regenbogen-Pakt. Nicht so ein kitschiges ‹Wir haben uns alle lieb›-Ding. Sondern echte Versprechen. Konkrete Sachen, die wir tun – und die nach uns weiterleben.» Amadou nickt. «Mein Großvater, der Griot, hat immer gesagt: ‹Die Worte, die du heute sprichst, werden morgen die Brücken sein, über die andere gehen.› Lasst uns Brücken-Worte sprechen.» Yuki öffnet eine leere Seite in ihrem Skizzenbuch. «Ich schreibe und zeichne. Was kommt rein?»',
        choices: [
          { text: '«Erstes Versprechen: Wir schauen nicht weg. Wenn jemand diskriminiert wird – egal ob Mikroaggression oder offener Hass – schreiten wir ein. Immer.»', nextSceneId: 'r6-s3', empathyPoints: 1, insightPoints: 2, couragePoints: 3 },
          { text: '«Erstes Versprechen: Wir hören zu, bevor wir urteilen. Auf der Ozeaninsel haben wir gelernt: Hinter jedem Verhalten steckt eine Geschichte.»', nextSceneId: 'r6-s3', empathyPoints: 3, insightPoints: 2, couragePoints: 1 },
          { text: '«Erstes Versprechen: Wir hinterfragen ‹normal›. Immer wenn jemand sagt ‹Das ist halt so›, fragen wir: Für wen?»', nextSceneId: 'r6-s3', empathyPoints: 1, insightPoints: 3, couragePoints: 2 }
        ]
      },
      {
        id: 'r6-s3',
        text: 'Die Versprechen füllen sich. Robin diktiert: «Wir definieren niemanden über eine einzige Eigenschaft. Amadou ist nicht ‹der Afrikaner›. Sofia ist nicht ‹die Portugiesin›. Ich bin nicht ‹das non-binäre Kind›. Wir sind MENSCHEN. Mit tausend Facetten.» Sofia ergänzt: «Wir feiern unsere Unterschiede, OHNE sie zu exotisieren. Interesse ja, Zoo-Mentalität nein.» Amadou nickt und fügt hinzu: «Wir akzeptieren, dass wir ALLE Fehler machen werden. Vorurteile sind menschlich. Aber wir verpflichten uns, sie zu erkennen und zu korrigieren.» Yuki zeichnet schnell. Um jeden Punkt herum malt sie eine andere Farbe des Regenbogens.',
        choices: [
          { text: '«Fügt hinzu: Wir erkennen an, dass Fairness nicht heißt, alle gleich zu behandeln – sondern jedem das zu geben, was er braucht. Equity statt Equality.»', nextSceneId: 'r6-s4', empathyPoints: 2, insightPoints: 3, couragePoints: 1 },
          { text: '«Fügt hinzu: Wir sprechen MIT Betroffenen, nicht ÜBER sie. Wir sind Mikrofone, keine Lautsprecher.»', nextSceneId: 'r6-s4', empathyPoints: 3, insightPoints: 2, couragePoints: 1 },
          { text: '«Fügt hinzu: Wir haben den Mut, unbequem zu sein. Wie auf der Waldinsel – wahre Stärke heißt, auch dann das Richtige zu tun, wenn es schwer ist.»', nextSceneId: 'r6-s4', empathyPoints: 1, insightPoints: 2, couragePoints: 3 }
        ]
      },
      {
        id: 'r6-s4',
        text: 'Der Pakt wächst. Yuki hat schon drei Seiten gefüllt. Plötzlich hält Amadou inne. «Moment. Ich hab was vergessen. Das Wichtigste.» Er sieht jeden einzeln an. «Wir vergessen nicht, dass Hass AUCH aus Schmerz entsteht. Tim hat aus Angst gehandelt. Max hat aus Unwissenheit gehandelt. Clara hat aus Naivität gehandelt. Niemand wird als Rassist geboren.» Er trommelt leise. «Auf der Vulkaninsel habe ich gelernt: Hinter Wut steckt immer etwas anderes. Auf der Ozeaninsel: Hinter Härte oft Trauer. Das heißt NICHT, dass wir Hass entschuldigen. Aber es heißt, dass wir den Menschen dahinter sehen.»',
        choices: [
          { text: '«Das ist die schwerste Lektion von allen. Den Hasser nicht hassen. Nicht für ihn, sondern für UNS – weil Hass uns genauso zerstört wie den anderen.»', nextSceneId: 'r6-s5', empathyPoints: 3, insightPoints: 3, couragePoints: 1 },
          { text: '«Einverstanden. Aber ich will auch einen Punkt hinzufügen: Verständnis hat Grenzen. Wir können Empathie zeigen, ohne uns selbst zu opfern. Grenzen setzen ist auch Liebe – wie auf der Garteninsel.»', nextSceneId: 'r6-s5', empathyPoints: 2, insightPoints: 3, couragePoints: 2 },
          { text: '«Amadou, du bist der weiseste Mensch, den ich kenne. Dein Großvater wäre stolz auf dich.»', nextSceneId: 'r6-s5', empathyPoints: 3, insightPoints: 1, couragePoints: 1 }
        ]
      },
      {
        id: 'r6-s5',
        text: 'Der Regenbogen-Pakt ist fertig. Sieben Versprechen, in sieben Farben. Yuki hat jedes einzelne illustriert. Robin liest sie vor, und mit jedem Versprechen wird der Regenbogen über der Insel heller. «Aber ein Pakt auf Papier ist nur Papier», sagt Sofia. «Was jetzt?» Robin grinst. «Jetzt kommt der schwere Teil: Ihn LEBEN. Jeden Tag. Auch wenn es unbequem ist. Auch wenn niemand zuschaut. Auch wenn wir müde sind und keine Lust haben, schon wieder jemanden zu korrigieren, der ‹Wo kommst du wirklich her?› fragt.» Amadou steht auf. «Dann leben wir ihn. Nicht perfekt. Aber ehrlich.»',
        choices: [
          { text: '«Nicht perfekt, aber ehrlich – das ist das beste Lebensmotto, das ich je gehört habe. Für den Pakt und für alles andere.»', nextSceneId: 'r6-s6', empathyPoints: 2, insightPoints: 3, couragePoints: 2 },
          { text: '«Ich verspreche etwas: Wenn ich einen von euch vergesse oder zurückfalle, sagt es mir. Echte Verbündete halten sich gegenseitig accountable.»', nextSceneId: 'r6-s6', empathyPoints: 2, insightPoints: 2, couragePoints: 3 },
          { text: '«Wir sind nicht perfekt. Aber wir sind zusammen. Und zusammen sind wir verdammt viel stärker als allein.»', nextSceneId: 'r6-s6', empathyPoints: 3, insightPoints: 2, couragePoints: 2 }
        ]
      },
      {
        id: 'r6-s6',
        text: 'Sofia greift in die Saiten. Nicht laut, nicht leise – genau richtig. Amadou fällt ein mit seiner Trommel. Es ist kein Lied, das man kennt, und trotzdem fühlt es sich vertraut an. Yuki zeichnet mit geschlossenen Augen – ihre Hand bewegt sich im Rhythmus. Robin steht da, die Arme ausgebreitet, und fängt das Licht des Regenbogens ein. Und du? Du stehst mittendrin. In diesem Moment verstehst du, warum diese Insel «Regenbogen» heißt. Nicht wegen der Farben am Himmel. Sondern weil ein Regenbogen nur dort entsteht, wo Licht und Regen aufeinandertreffen. Wo Schönes und Schwieriges sich verbinden. Wo Unterschiede nicht verschwinden – sondern leuchten. Die nächste Insel wartet. Die Heimatinsel. Aber hier, auf dem Regenbogen, habt ihr das Fundament gelegt, auf dem alles andere steht.',
        choices: [
          { text: '«Ich bin bereit für die Heimatinsel. Nicht obwohl es schwer wird – WEIL es schwer wird. Denn ich habe auf sieben Inseln gelernt, dass Wachstum unbequem ist.»', nextSceneId: null, empathyPoints: 2, insightPoints: 3, couragePoints: 3 },
          { text: '«Danke. Euch allen. Sofia, Amadou, Yuki, Robin – ihr habt mir gezeigt, dass Vielfalt kein Thema ist, das man ‹abhakt›. Es ist eine Haltung. Eine tägliche Entscheidung.»', nextSceneId: null, empathyPoints: 3, insightPoints: 3, couragePoints: 1 },
          { text: '«Der Regenbogen-Pakt geht mit mir. Nicht als Papier, sondern als Teil von mir. Und ich werde ihn weitergeben.»', nextSceneId: null, empathyPoints: 2, insightPoints: 2, couragePoints: 3 }
        ]
      }
    ],
    completed: false
  }
];

// =============================================================================
// WISDOM CARDS
// =============================================================================

export const rainbowWisdomCards: WisdomCard[] = [
  {
    id: 'rainbow-wisdom-1',
    islandId: 'rainbow' as IslandId,
    title: 'Mikroaggressionen sind real',
    content: 'Sätze wie «Du sprichst aber gut Deutsch!» oder «Wo kommst du WIRKLICH her?» klingen harmlos. Aber für Menschen, die sie JEDEN TAG hören, fühlen sie sich an wie tausend Papierschnitte. Das nächste Mal, wenn du so etwas sagen willst: Frag dich, ob du das auch zu jemandem sagen würdest, der «typisch luxemburgisch» aussieht.',
    category: 'awareness',
    collected: false
  },
  {
    id: 'rainbow-wisdom-2',
    islandId: 'rainbow' as IslandId,
    title: 'Schweigen ist eine Entscheidung',
    content: 'Wenn du siehst, dass jemand diskriminiert wird, und nichts sagst – dann hast du dich entschieden. Für die Seite der Diskriminierung. Klingt hart? Ist es auch. Aber die Wahrheit ist: Neutralität bei Ungerechtigkeit hilft immer dem Stärkeren. Dein Schweigen ist lauter, als du denkst.',
    category: 'courage',
    collected: false
  },
  {
    id: 'rainbow-wisdom-3',
    islandId: 'rainbow' as IslandId,
    title: 'Du bist kein Kompromiss',
    content: 'Wenn du zwischen Kulturen aufwächst, sagen manche: «Du bist halb dies, halb das.» Falsch. Du bist nicht zwei Hälften. Du bist eine ganze Person mit doppelter Perspektive. Das ist kein Defizit – das ist eine Superkraft, die Menschen mit nur einer Kultur nie haben werden.',
    category: 'identity',
    collected: false
  },
  {
    id: 'rainbow-wisdom-4',
    islandId: 'rainbow' as IslandId,
    title: 'Hass kommt aus Angst',
    content: 'Die meisten Menschen, die hassen, haben Angst. Angst vor dem Unbekannten, Angst um ihren Platz in der Welt, Angst, nicht zu genügen. Das ENTSCHULDIGT Hass nicht. Aber es ERKLÄRT ihn. Und wenn du die Angst hinter dem Hass siehst, kannst du anders reagieren – stärker, klüger, menschlicher.',
    category: 'empathy',
    collected: false
  },
  {
    id: 'rainbow-wisdom-5',
    islandId: 'rainbow' as IslandId,
    title: '«Normal» gibt es nicht',
    content: 'Wer entscheidet, was «normal» ist? Spoiler: Es ist immer die Mehrheit. Und die Mehrheit ist nicht automatisch richtig – sie ist nur lauter. Wenn dir jemand sagt, du bist «nicht normal», dann sag: «Danke. Weil ‹normal› ist nur ein anderes Wort für ‹langweilig›.»',
    category: 'insight',
    collected: false
  },
  {
    id: 'rainbow-wisdom-6',
    islandId: 'rainbow' as IslandId,
    title: 'Mikrofon statt Lautsprecher',
    content: 'Ein guter Verbündeter (Ally) spricht nicht FÜR andere, sondern VERSTÄRKT ihre Stimmen. Stell dir vor, du bist ein Mikrofon: Du machst die Stimme lauter, die schon da ist. Du erfindest keine neue. Der Unterschied? Ein Lautsprecher sagt: «ICH erzähle EURE Geschichte.» Ein Mikrofon sagt: «Erzähl. Ich sorge dafür, dass man dich hört.»',
    category: 'allyship',
    collected: false
  },
  {
    id: 'rainbow-wisdom-7',
    islandId: 'rainbow' as IslandId,
    title: 'Fairness heißt nicht Gleichheit',
    content: 'Stell dir drei Personen vor einem Zaun vor. Einer ist groß, einer mittel, einer klein. Gleichheit: Alle bekommen die gleiche Kiste zum Draufstehen. Fairness: Jeder bekommt so viele Kisten, wie er braucht, um über den Zaun zu schauen. Gerechtigkeit: Der Zaun wird abgebaut. An welcher Lösung arbeitest du?',
    category: 'justice',
    collected: false
  },
  {
    id: 'rainbow-wisdom-8',
    islandId: 'rainbow' as IslandId,
    title: 'Vorurteile sind menschlich',
    content: 'Du hast Vorurteile. Ja, du. Alle haben welche. Das Gehirn sortiert automatisch in Kategorien – das ist Biologie. Aber du bist MEHR als dein Gehirn. Du kannst Vorurteile bemerken, hinterfragen und korrigieren. Der erste Schritt? Zugeben, dass sie da sind. Der zweite? Ihnen nicht gehorchen.',
    category: 'self-awareness',
    collected: false
  },
  {
    id: 'rainbow-wisdom-9',
    islandId: 'rainbow' as IslandId,
    title: 'Intersektionalität zählt',
    content: 'Amadou ist schwarz UND männlich UND Immigrant. Sofia ist weiblich UND Arbeiterkind UND hat einen Akzent. Diskriminierung wirkt nicht nur in eine Richtung – sie kann sich überschneiden und verstärken. Wer das versteht, versteht, warum manche Menschen mehr Hürden haben als andere – nicht weil sie schwächer sind, sondern weil das System mehr Mauern für sie gebaut hat.',
    category: 'knowledge',
    collected: false
  },
  {
    id: 'rainbow-wisdom-10',
    islandId: 'rainbow' as IslandId,
    title: 'Kultur ist kein Kostüm',
    content: 'Es gibt einen Unterschied zwischen kulturellem Austausch und kultureller Aneignung. Austausch: Du lernst die Bedeutung hinter einer Tradition und respektierst sie. Aneignung: Du nimmst das Coole und ignorierst die Geschichte. Faustregel: Wenn die Menschen, denen die Kultur gehört, sich davon verletzt fühlen, hör auf.',
    category: 'respect',
    collected: false
  },
  {
    id: 'rainbow-wisdom-11',
    islandId: 'rainbow' as IslandId,
    title: 'Worte formen Welten',
    content: '«Ausländer», «Flüchtling», «Behinderte» – oder «Mitbürger», «Geflüchteter», «Mensch mit Behinderung». Gleiche Person, andere Worte, andere Welt. Sprache ist keine Nebensache. Sie bestimmt, wie wir denken, und wie wir denken, bestimmt, wie wir handeln. Wähle deine Worte wie deine Freunde: mit Sorgfalt.',
    category: 'language',
    collected: false
  },
  {
    id: 'rainbow-wisdom-12',
    islandId: 'rainbow' as IslandId,
    title: 'Online-Hass ist echter Hass',
    content: 'Ein Hasskommentar im Internet tut genauso weh wie einer auf dem Schulhof. Vielleicht sogar mehr, weil er BLEIBT – gespeichert, geteilt, für alle sichtbar. Und weil der Hasser sich hinter einem Bildschirm verstecken kann. Denk dran: Hinter jedem Profilbild sitzt ein echter Mensch. Behandle ihn auch so.',
    category: 'digital',
    collected: false
  },
  {
    id: 'rainbow-wisdom-13',
    islandId: 'rainbow' as IslandId,
    title: 'Veränderung ist unbequem',
    content: 'Rassismus zu bekämpfen ist nicht bequem. Es heißt, Freunde zu korrigieren, die einen Witz machen. Es heißt, sich unbeliebt zu machen. Es heißt, eigene Privilegien zu hinterfragen. Es heißt, Fehler zu machen und trotzdem weiterzumachen. Unbequem? Ja. Aber der einzige Weg? Auch ja.',
    category: 'courage',
    collected: false
  },
  {
    id: 'rainbow-wisdom-14',
    islandId: 'rainbow' as IslandId,
    title: 'Luxemburg = 170 Nationen, 1 Zuhause',
    content: 'In Luxemburg leben Menschen aus über 170 Nationen. Fast die Hälfte der Bevölkerung hat keinen luxemburgischen Pass. Das ist kein Problem – das ist ein Experiment. Ein Experiment, das zeigt: Wenn verschiedene Menschen zusammenleben, entsteht nicht Chaos, sondern Kultur. Nicht Schwäche, sondern Stärke. Nicht Lärm, sondern Musik.',
    category: 'luxembourg',
    collected: false
  },
  {
    id: 'rainbow-wisdom-15',
    islandId: 'rainbow' as IslandId,
    title: 'Kleine Taten, große Wirkung',
    content: 'Du musst nicht auf eine Demo gehen, um etwas zu verändern. Setz dich neben den Neuen in der Kantine. Lerne drei Wörter in der Sprache deines Nachbarn. Teile einen Gegen-Hashtag. Frag jemanden nach seiner Geschichte – und hör WIRKLICH zu. Revolution beginnt nicht auf Barrikaden. Sie beginnt in der Pause.',
    category: 'action',
    collected: false
  },
  {
    id: 'rainbow-wisdom-16',
    islandId: 'rainbow' as IslandId,
    title: 'Der Regenbogen braucht den Regen',
    content: 'Ein Regenbogen entsteht nur dort, wo Sonnenlicht auf Regentropfen trifft. Ohne Regen kein Regenbogen. Ohne Herausforderung kein Wachstum. Ohne Unterschiede keine Vielfalt. Ohne Konflikte kein echtes Verständnis. Die schwersten Gespräche sind oft die wichtigsten. Und das schönste Licht kommt nach dem Sturm.',
    category: 'wisdom',
    collected: false
  }
];

// =============================================================================
// ACTIVITIES
// =============================================================================

export const rainbowActivities: RainbowActivity[] = [
  {
    id: 'rainbow-activity-1',
    islandId: 'rainbow' as IslandId,
    title: 'Identitäts-Mosaik',
    description: 'Erstelle ein Mosaik aus allen Teilen deiner Identität – sichtbare und unsichtbare.',
    type: 'creative',
    completed: false,
    instructions: [
      'Nimm ein großes Blatt Papier und male einen Umriss von dir selbst (es muss nicht perfekt sein – Strichmännchen zählt!).',
      'Schreibe AUSSEN die Dinge, die andere an dir sehen: Aussehen, Sprache, Herkunft, Name.',
      'Schreibe INNEN die Dinge, die nur DU kennst: Träume, Ängste, Werte, Geheimnisse, Hoffnungen.',
      'Male jede «Eigenschaft» in einer anderen Farbe – wie ein Mosaik aus Puzzleteilen.',
      'Markiere: Welche Teile zeigst du gerne? Welche versteckst du? Warum?',
      'Tausche dein Mosaik mit einem Freund/einer Freundin. Was überrascht euch? Was habt ihr gemeinsam, obwohl ihr verschieden seid?',
      'Erkenntnis: Jeder Mensch ist ein Mosaik. Und Mosaike sind am schönsten, wenn viele verschiedene Steine zusammenkommen.'
    ]
  },
  {
    id: 'rainbow-activity-2',
    islandId: 'rainbow' as IslandId,
    title: 'Der Privilegien-Rucksack',
    description: 'Eine Reflexionsübung darüber, welche Vorteile du im Leben hast – und welche andere nicht haben.',
    type: 'reflection',
    completed: false,
    instructions: [
      'Stell dir vor, du trägst einen unsichtbaren Rucksack. Darin sind deine «Privilegien» – Dinge, die dir das Leben leichter machen, ohne dass du etwas dafür getan hast.',
      'Lies folgende Fragen und zähle, wie oft du «Ja» sagst: Kann ich ohne Angst vor Diskriminierung einkaufen gehen? Sehen die Lehrer*innen in der Schule so aus wie ich? Kann ich ohne Akzent Luxemburgisch sprechen? Muss ich mir nie Sorgen um Geld für Schulausflüge machen?',
      'Jedes «Ja» ist ein Gegenstand im Rucksack. Je voller dein Rucksack, desto leichter ist dein Weg – nicht weil du besser bist, sondern weil das System für dich gemacht wurde.',
      'Schreibe auf: Welche Privilegien hast du? Welche fehlen dir?',
      'Wichtig: Privilegien zu haben ist keine Schuld. Aber sie nicht zu SEHEN ist eine Entscheidung.',
      'Überlege: Wie kannst du deine Privilegien nutzen, um anderen den Weg zu erleichtern? Konkretes Beispiel aufschreiben und in der nächsten Woche umsetzen.'
    ]
  },
  {
    id: 'rainbow-activity-3',
    islandId: 'rainbow' as IslandId,
    title: 'Sprachbrücken bauen',
    description: 'Lerne 10 Wörter in einer Sprache, die du nicht sprichst – von jemandem, der sie als Muttersprache hat.',
    type: 'creative',
    completed: false,
    instructions: [
      'Finde in deiner Klasse oder Nachbarschaft jemanden, der eine Sprache spricht, die du nicht kennst.',
      'Bitte ihn/sie, dir 10 wichtige Wörter beizubringen: Hallo, Danke, Freund, Familie, Liebe, Mut, Hoffnung, Zuhause, Zusammen, Frieden.',
      'Schreibe jedes Wort auf eine Karteikarte – auf einer Seite das Wort in der neuen Sprache, auf der anderen die Übersetzung.',
      'Übe jeden Tag 5 Minuten. Frage nach der Bedeutung, der Geschichte hinter dem Wort, wie es sich anfühlt.',
      'Bringe deinem Sprachpartner im Gegenzug 10 Wörter in DEINER Sprache bei.',
      'Am Ende der Woche: Sagt euch gegenseitig einen ganzen Satz in der Sprache des anderen. Es wird holprig – und genau das macht es schön.',
      'Erkenntnis: Sprache lernen heißt nicht nur Vokabeln pauken. Es heißt, einen Menschen kennenzulernen.'
    ]
  },
  {
    id: 'rainbow-activity-4',
    islandId: 'rainbow' as IslandId,
    title: 'Der Anti-Vorurteils-Tagebuch',
    description: 'Eine Woche lang deine eigenen Vorurteile beobachten – ehrlich, mutig und ohne Selbstverurteilung.',
    type: 'journal',
    completed: false,
    instructions: [
      'Nimm ein kleines Notizbuch oder nutze dein Handy. Schreibe eine Woche lang JEDEN TAG auf, wenn du ein Vorurteil bei dir bemerkst.',
      'Beispiele: Du siehst jemanden auf der Straße und denkst automatisch etwas über die Person – wegen Kleidung, Hautfarbe, Gewicht, Akzent.',
      'Schreibe auf: Was war die Situation? Was habe ich gedacht? Woher kommt dieses Vorurteil (Eltern, Medien, Erfahrung)? Ist es wahr?',
      'Wichtig: Verurteile dich NICHT. Vorurteile sind normal. Sie zu bemerken ist der erste Schritt. Sie zu hinterfragen der zweite.',
      'Am Ende der Woche: Lies dein Tagebuch. Welche Vorurteile tauchen am häufigsten auf? Welche hast du bewusst korrigiert?',
      'Challenge: Suche aktiv das Gespräch mit einer Person, über die du ein Vorurteil hattest. Lerne sie kennen. Notiere, wie sich dein Bild verändert.'
    ]
  },
  {
    id: 'rainbow-activity-5',
    islandId: 'rainbow' as IslandId,
    title: 'Der Regenbogen-Pakt (für deine Klasse)',
    description: 'Schreibt gemeinsam einen echten Anti-Diskriminierungs-Pakt für eure Klasse oder Freundesgruppe.',
    type: 'reflection',
    completed: false,
    instructions: [
      'Versammelt euch im Kreis – mindestens 4 Leute, gerne mehr.',
      'Jeder erzählt: Wann habe ich mich schon mal ausgeschlossen gefühlt? Wann habe ich jemanden ausgeschlossen? (Ehrlichkeit zählt!)',
      'Sammelt gemeinsam: Welche Formen von Diskriminierung kennen wir? (Rassismus, Sexismus, Ableismus, Mobbing wegen Aussehen/Religion/Sexualität...)',
      'Schreibt zusammen 5-7 konkrete Versprechen auf. Nicht abstrakt («Wir sind gegen Rassismus»), sondern konkret («Wir sagen etwas, wenn jemand einen rassistischen Witz macht»).',
      'Jeder unterschreibt den Pakt. Hängt ihn an einen sichtbaren Ort.',
      'Vereinbart: Einmal im Monat checkt ihr ein – haben wir den Pakt gelebt? Was war schwer? Was können wir besser machen?',
      'Erkenntnis: Ein Pakt ist kein Poster. Er lebt nur, wenn ihr ihn lebt.'
    ]
  }
];

// =============================================================================
// ISLAND DATA
// =============================================================================

export const rainbowIslandData = {
  id: 'rainbow' as IslandId,
  name: 'Regenbogeninsel',
  emoji: '🌈',
  theme: 'Vielfalt & Identität',
  description: 'Die Klimax-Insel – hier kommen alle bisherigen Lektionen zusammen. Stell dich den schwierigsten Fragen über Identität, Diskriminierung und Zusammenhalt. Mit Sofia, Amadou, Yuki und Robin lernst du, was echte Vielfalt bedeutet: nicht nur tolerieren, sondern feiern. Nicht nur verstehen, sondern handeln.',
  colors: ['#FF6B6B', '#C44DFF', '#4DBBFF'],
  level: 4 as const,
  npcs: rainbowNPCs,
  scenarios: rainbowScenarios,
  activities: rainbowActivities,
  wisdomCards: rainbowWisdomCards,
  previousIslandLessons: {
    volcano: 'Wut verstehen und kanalisieren',
    ocean: 'Trauer und Verlust aushalten',
    forest: 'Angst überwinden und Mut finden',
    mountain: 'Selbstwert entdecken und schützen',
    garden: 'Beziehungen pflegen und Grenzen setzen',
    night: 'Achtsamkeit üben und digitale Balance finden'
  }
};
