// @ts-nocheck
// =============================================================================
// Berginsel (Mountain Island) – Selbstwert & Identität
// Inner Worlds – Social-Emotional Learning Game
// CDSE Luxembourg – Sozial-emotionales Lernen für 10–15-Jährige
//
// Alle Texte auf Deutsch, warmherzig und auf Augenhöhe.
// Therapeutisch fundiert: Selbstmitgefühl (Kristin Neff), kognitive
// Umstrukturierung (CBT), Stärkenorientierung (VIA), Growth Mindset
// (Carol Dweck), Umgang mit Vergleichen und innerem Kritiker.
//
// Hauptfigur: Lena (13), ein Mädchen, das sich ständig mit anderen
// vergleicht, von Mobbing betroffen ist und lernt, ihren eigenen Wert
// zu erkennen – unabhängig von Aussehen, Likes oder den Meinungen
// anderer.
//
// Progression:
//   Kapitel 1 – Der Spiegel am Berg: Negativer Selbstdialog, Vergleichsfalle
//   Kapitel 2 – Steinschlag der Worte: Mobbing, externe Kritik wird intern
//   Kapitel 3 – Klettern lernen: Growth Mindset, Stärken, Selbstmitgefühl
//   Kapitel 4 – Der Gipfel: Anderen helfen, authentische Identität, Werte
// =============================================================================

import type { Scenario, WisdomCard, Activity, IslandId } from '../../../types';

// =============================================================================
// 1. SCENARIOS
// =============================================================================

export const mountainScenarios: Scenario[] = [
  // ---------------------------------------------------------------------------
  // Scenario 1 – Der Spiegel am Berg
  // Teaching: Negativer Selbstdialog, Vergleichsfalle, Unterschied zwischen
  // Selbstbild und Realität. Gedanken sind keine Fakten.
  // ---------------------------------------------------------------------------
  {
    id: 'mountain-scenario-1',
    islandId: 'mountain' as IslandId,
    title: 'Der Spiegel am Berg',
    description:
      'Du triffst Lena (13), die sich ständig mit anderen vergleicht und schlecht über sich selbst redet. Auf Social Media scheinen alle ein perfektes Leben zu führen – nur sie nicht. Aber stimmt das wirklich? Gemeinsam entdeckt ihr den Unterschied zwischen dem, was man denkt, und dem, was wahr ist.',
    scenes: [
      {
        id: 'm1-s1',
        text: 'Der Bergpfad windet sich zwischen hohen Felsen hindurch. Die Luft ist klar und kühl. Auf einem Stein am Wegrand sitzt ein Mädchen – vielleicht 13 Jahre alt. Sie hat die Knie angezogen und starrt auf ihr Handy, den Daumen immer weiter nach unten wischend. Mit jedem Scroll wird ihr Gesicht ein bisschen trauriger, ein bisschen verschlossener. Als sie dich bemerkt, zuckt sie zusammen und steckt das Handy hastig in die Jackentasche, als hätte man sie bei etwas Verbotenem erwischt.',
        speaker: 'Erzähler',
        speakerEmoji: '🏔️',
        choices: [],
      },
      {
        id: 'm1-s2',
        text: '«Oh, hi. Sorry, ich hab dich nicht gesehen. Ich bin Lena. Ich bin … naja, niemand Besonderes.» Sie zuckt die Schultern und schaut auf ihre Schuhe. «Ich bin hier, weil alle sagen, der Berg hilft einem, sich besser zu fühlen. Aber ehrlich gesagt fühle ich mich gerade genauso mies wie vorher.»',
        speaker: 'Lena',
        speakerEmoji: '👧',
        choices: [
          {
            id: 'm1-s2-c1',
            text: '«Hey, ich bin sicher, du bist besonderer als du denkst. Warum sagst du das über dich?»',
            consequence:
              'Lena schaut dich überrascht an. «Das sagen Leute immer. Aber wenn du mich kennen würdest, würdest du das nicht sagen.» Sie zögert. «Ich bin nicht hübsch genug, nicht schlau genug, nicht lustig genug. Einfach … nicht genug.» In Lenas Worten steckt etwas, das viele kennen: Der innere Kritiker, der uns einredet, wir müssten mehr sein, als wir sind. Aber dieser Kritiker verwechselt Gefühle mit Fakten.',
            empathyPoints: 3,
            insightPoints: 2,
            couragePoints: 1,
            nextSceneId: 'm1-s3',
          },
          {
            id: 'm1-s2-c2',
            text: '«Was hast du dir gerade auf dem Handy angeschaut? Du sahst ziemlich traurig aus dabei.»',
            consequence:
              'Lena wird rot. «Nur … Instagram. Und TikTok. Alle aus meiner Klasse posten Bilder – perfekte Outfits, perfekte Partys, perfekte Leben. Und ich sitze hier in meinem alten Pulli und fühle mich wie … die einzige, die nicht dazugehört.» Das ist die Vergleichsfalle: Wir vergleichen unser normales Leben mit den besten, bearbeiteten Momenten anderer. Kein Wunder, dass wir dabei verlieren – das Spiel ist von Anfang an unfair.',
            empathyPoints: 2,
            insightPoints: 3,
            couragePoints: 1,
            nextSceneId: 'm1-s3',
          },
          {
            id: 'm1-s2-c3',
            text: '«Naja, du hast schon recht – es gibt halt Leute, die besonderer sind als andere. So ist das Leben.»',
            isWrong: true,
            consequence:
              'Lenas Gesicht fällt zusammen. «Siehst du? Sogar du denkst das.» Sie zieht sich noch weiter in sich zurück. Das war genau das Falsche: Lenas negative Überzeugung zu bestätigen, hat ihr Selbstbild weiter beschädigt. Jeder Mensch hat einen einzigartigen Wert – und niemand ist «besonderer» als ein anderer. Wenn jemand sich wertlos fühlt, braucht er keine Bestätigung dieser Lüge, sondern jemanden, der ihm hilft, die Wahrheit zu sehen.',
            points: { empathyPoints: 0, insightPoints: 0, couragePoints: 0 },
            nextSceneId: 'm1-s3',
          },
        ],
      },
      {
        id: 'm1-s3',
        text: 'Lena zieht ihr Handy wieder hervor und zeigt dir das Profil eines Mädchens aus ihrer Klasse. Perfekte Fotos, 800 Follower, Kommentare wie «OMG du bist so hübsch!!». «Siehst du?», sagt Lena leise. «So sieht jemand aus, der es geschafft hat. Und dann bin da ich.» Sie zeigt auf sich selbst, als wäre sie ein Beweisstück in einem Prozess gegen sich selbst.',
        speaker: 'Lena',
        speakerEmoji: '👧',
        choices: [
          {
            id: 'm1-s3-c1',
            text: '«Lena, glaubst du wirklich, dass diese Fotos die Wahrheit zeigen? Weißt du, wie viele Filter und Versuche das waren?»',
            consequence:
              'Lena runzelt die Stirn. «Meinst du?» Du erklärst: «Für ein einziges perfektes Foto machen manche Leute 50 Versuche, benutzen drei Filter und bearbeiten es danach nochmal. Was du siehst, ist nicht die Person – es ist eine Inszenierung.» Lena schweigt eine Weile. «Also … vergleiche ich mich mit etwas, das gar nicht echt ist?» Genau. Es ist, als würdest du einen Apfel mit einem gemalten Apfel vergleichen. Der gemalte sieht vielleicht perfekter aus – aber er ist nicht real.',
            empathyPoints: 1,
            insightPoints: 4,
            couragePoints: 1,
            nextSceneId: 'm1-s4',
          },
          {
            id: 'm1-s3-c2',
            text: '«Weißt du was? Dieses Mädchen vergleicht sich wahrscheinlich auch mit jemand anderem und fühlt sich genauso.»',
            consequence:
              'Lena blinzelt. «Wirklich? Aber sie sieht so … zufrieden aus.» Du sagst: «Auf den Fotos, ja. Aber Zufriedenheit kann man nicht posten. Das sieht man nicht in einem Bild.» Lena denkt darüber nach. «Meine Cousine postet auch immer fröhliche Fotos, aber letztens hat sie bei mir geweint, weil sie sich einsam fühlt.» Genau das ist der Punkt: Social Media zeigt uns die Maske, nicht das Gesicht dahinter. Jeder kämpft mit etwas – auch die, die es nicht zeigen.',
            empathyPoints: 3,
            insightPoints: 3,
            couragePoints: 0,
            nextSceneId: 'm1-s4',
          },
          {
            id: 'm1-s3-c3',
            text: '«Lass uns mal ein Experiment machen: Leg das Handy für fünf Minuten weg und schau stattdessen auf die Berge.»',
            consequence:
              'Lena zögert, aber dann legt sie das Handy auf den Felsen. Ihr schaut zusammen auf die Berge – die Gipfel im Sonnenlicht, die Wolken, die langsam vorbeiziehen. «Komisch», sagt Lena nach einer Weile. «Ohne das Handy fühle ich mich irgendwie … ruhiger. Nicht so gehetzt.» Manchmal merken wir erst, wie schwer etwas auf uns lastet, wenn wir es kurz ablegen. Vergleichen auf Social Media ist wie ein schwerer Rucksack, den man so lange trägt, dass man sein Gewicht vergisst.',
            empathyPoints: 1,
            insightPoints: 2,
            couragePoints: 3,
            nextSceneId: 'm1-s4',
          },
          {
            id: 'm1-s3-c4',
            text: '«Ja, sie sieht echt perfekt aus. Vielleicht musst du einfach mehr an dir arbeiten, dann siehst du auch so aus.»',
            isWrong: true,
            consequence:
              'Lena nickt traurig. «Du hast recht. Ich bin einfach nicht gut genug.» Ihre Schultern sacken noch tiefer. Das war ein schwerer Fehler: Statt Lena zu helfen, die Vergleichsfalle zu erkennen, hast du sie tiefer hineingestoßen. Du hast bestätigt, dass ihr Wert von ihrem Aussehen abhängt – und dass sie «nicht genug» ist. Niemand muss wie jemand anderes aussehen, um wertvoll zu sein. Vergleiche mit bearbeiteten Fotos sind unfair und zerstörerisch.',
            points: { empathyPoints: 0, insightPoints: 0, couragePoints: 0 },
            nextSceneId: 'm1-s4',
          },
        ],
      },
      {
        id: 'm1-s4',
        text: 'Am Wegrand steht ein großer, glatter Felsbrocken. Als Lena näher tritt, sieht sie ihr Spiegelbild darin – verzerrt, gedehnt, fremd. «Siehst du?», sagt sie. «So fühle ich mich. Als wäre ich nicht richtig. Als wäre irgendwas an mir … falsch.» Dann dreht sie sich zu dir. «Denkst du auch so über dich manchmal?»',
        speaker: 'Lena',
        speakerEmoji: '👧',
        choices: [
          {
            id: 'm1-s4-c1',
            text: '«Ja, manchmal schon. Aber ich habe gelernt: Was ich über mich denke, ist nicht immer die Wahrheit. Gedanken sind keine Fakten.»',
            consequence:
              'Lena schaut dich an, als hättest du etwas Wichtiges gesagt. «Gedanken sind keine Fakten», wiederholt sie langsam. «Das heißt … nur weil ich DENKE, ich bin nicht gut genug, ist das nicht automatisch wahr?» Genau. Unser Gehirn produziert Gedanken wie eine Maschine – manche sind hilfreich, manche nicht. Der Trick ist, zu lernen, welche Gedanken man ernst nehmen sollte und welche nur alter Lärm sind. Dieser verzerrrte Spiegel ist wie dein innerer Kritiker: Er zeigt ein Bild von dir, das nicht der Wirklichkeit entspricht.',
            empathyPoints: 2,
            insightPoints: 4,
            couragePoints: 2,
            nextSceneId: 'm1-s5',
          },
          {
            id: 'm1-s4-c2',
            text: '«Lena, der Spiegel ist verzerrt – nicht du. Schau mal in eine ruhige Wasseroberfläche, dann siehst du dich, wie du wirklich bist.»',
            consequence:
              'Ihr geht zu einem kleinen Bergsee in der Nähe. Lena beugt sich vor und sieht ihr echtes Spiegelbild – ruhig, klar, unverzerrrt. «Oh», sagt sie leise. «Das bin ja … ich. Einfach ich.» Du nickst. «Und weißt du was? Das reicht. Dein innerer Kritiker ist wie dieser schiefe Fels – er zeigt dir ein verzerrtes Bild. Aber das bedeutet nicht, dass DU verzerrt bist.» Lena lächelt zum ersten Mal. Ein ganz kleines Lächeln, aber es ist echt.',
            empathyPoints: 3,
            insightPoints: 3,
            couragePoints: 1,
            nextSceneId: 'm1-s5',
          },
          {
            id: 'm1-s4-c3',
            text: '«Naja, Spiegel lügen nicht. Vielleicht solltest du einfach akzeptieren, was du siehst, und das Beste draus machen.»',
            isWrong: true,
            consequence:
              'Lena erstarrt. «Also … siehst du es auch?» Ihr Blick wird leer. Statt ihr zu helfen, den verzerrten Spiegel als das zu erkennen, was er ist – eine Verzerrung – hast du ihr gesagt, sie solle das falsche Bild als Realität akzeptieren. Das ist, als würdest du jemandem mit einer kaputten Brille sagen: «Akzeptiere, dass die Welt verschwommen ist.» Der Spiegel war verzerrt, nicht Lena. Und Gedanken, die uns verletzen, verdienen es, hinterfragt zu werden – nicht akzeptiert.',
            points: { empathyPoints: 0, insightPoints: 0, couragePoints: 0 },
            nextSceneId: 'm1-s5',
          },
        ],
      },
      {
        id: 'm1-s5',
        text: 'Lena setzt sich wieder auf den Felsen, aber diesmal sitzt sie aufrechter. «Okay», sagt sie. «Vielleicht … vielleicht bin ich nicht so schlimm, wie ich immer denke. Aber es ist echt schwer, das zu glauben, wenn die Stimme in meinem Kopf so laut ist.» Sie schaut dich an. «Wie kann ich diese Stimme leiser machen?»',
        speaker: 'Lena',
        speakerEmoji: '👧',
        choices: [
          {
            id: 'm1-s5-c1',
            text: '«Frag dich: Würdest du das zu deiner besten Freundin sagen? Wenn nicht, sag es auch nicht zu dir selbst.»',
            consequence:
              'Lenas Augen werden groß. «Ich würde NIEMALS zu meiner besten Freundin sagen, dass sie hässlich oder wertlos ist. Das wäre ja mega gemein.» Du nickst. «Und trotzdem sagst du es jeden Tag zu dir selbst.» Stille. «Oh», flüstert Lena. «Ich bin gemein … zu mir selbst.» Das ist der erste Schritt: Erkennen, dass wir uns oft viel schlechter behandeln als andere. Selbstmitgefühl bedeutet, dir selbst die gleiche Freundlichkeit zu schenken, die du anderen gibst. Was du über dich selbst denkst, ist nicht immer die Wahrheit. Gedanken sind keine Fakten.',
            empathyPoints: 3,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: null,
          },
          {
            id: 'm1-s5-c2',
            text: '«Du kannst die Stimme nicht abschalten. Aber du kannst lernen, sie als das zu erkennen, was sie ist: nur ein Gedanke, nicht die Wahrheit.»',
            consequence:
              'Lena denkt darüber nach. «Also … der Gedanke ‹ich bin nicht gut genug› ist einfach nur ein Gedanke? Nicht die Realität?» Du nickst. «Stell dir vor, der Gedanke ist eine Wolke am Himmel. Du siehst ihn, du bemerkst ihn – aber du bist nicht die Wolke. Du bist der Himmel. Wolken kommen und gehen.» Lena schaut nach oben, wo tatsächlich Wolken vorbeiziehen. «Ich bin der Himmel», wiederholt sie leise. Und in diesem Moment wirkt sie ein kleines bisschen leichter. Was du über dich selbst denkst, ist nicht immer die Wahrheit. Gedanken sind keine Fakten.',
            empathyPoints: 2,
            insightPoints: 4,
            couragePoints: 2,
            nextSceneId: null,
          },
          {
            id: 'm1-s5-c3',
            text: '«Gib der fiesen Stimme einen Namen. Dann kannst du sagen: ‹Ach, du schon wieder!› und sie ernst nehmen wird schwieriger.»',
            consequence:
              'Lena lacht überrascht. «Einen Namen?» Sie überlegt. «Okay … ich nenne sie ‹die Nörgeltante›.» Ihr lacht beide. «Und wenn die Nörgeltante das nächste Mal sagt ‹du bist peinlich›, dann kann ich sagen: ‹Danke für deine Meinung, Nörgeltante, aber ich hör heute nicht auf dich.›» Genau! Indem wir dem inneren Kritiker einen lustigen Namen geben, nehmen wir ihm die Macht. Wir trennen uns von dem Gedanken und erkennen: Diese Stimme ist nicht ICH – sie ist nur ein alter Mechanismus, der nicht mehr hilfreich ist. Was du über dich selbst denkst, ist nicht immer die Wahrheit. Gedanken sind keine Fakten.',
            empathyPoints: 2,
            insightPoints: 3,
            couragePoints: 3,
            nextSceneId: null,
          },
          {
            id: 'm1-s5-c4',
            text: '«Vielleicht hat die Stimme recht und du solltest einfach härter an dir arbeiten, bis du gut genug bist.»',
            isWrong: true,
            consequence:
              'Lena sackt zusammen. «Ja … vielleicht muss ich einfach besser werden. In allem.» Du hast ihr gerade gesagt, dass sie sich ihren Selbstwert erst verdienen muss – durch Leistung, durch Perfektion, durch «genug» Arbeit. Aber das ist eine Lüge: Niemand muss sich seinen Wert verdienen. Perfektionismus ist kein Heilmittel gegen geringen Selbstwert – er ist Gift. Er sagt: «Du bist nur etwas wert, wenn du fehlerfrei bist.» Und weil niemand fehlerfrei ist, verliert man immer.',
            points: { empathyPoints: 0, insightPoints: 0, couragePoints: 0 },
            nextSceneId: null,
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Scenario 2 – Steinschlag der Worte
  // Teaching: Wie externe Kritik zu inneren Überzeugungen wird. Die Macht der
  // Worte. Kognitive Verzerrungen erkennen. Negativitätsbias verstehen.
  // Key concept: Beleidigungen sagen mehr über den Sender als den Empfänger.
  // ---------------------------------------------------------------------------
  {
    id: 'mountain-scenario-2',
    islandId: 'mountain' as IslandId,
    title: 'Steinschlag der Worte',
    description:
      'Lena wurde wegen ihres Aussehens gemobbt. Jemand hat sie vor der ganzen Klasse hässlich genannt – und alle haben gelacht. Jetzt glaubt sie es selbst. Wie werden die Worte anderer zu unseren eigenen Überzeugungen? Und wie kann man diesen schmerzhaften Kreislauf durchbrechen?',
    scenes: [
      {
        id: 'm2-s1',
        text: 'Du triffst Lena wieder, weiter oben am Berg. Aber etwas hat sich verändert. Sie trägt eine große Kapuze, die ihr halbes Gesicht verdeckt. Ihre Schultern sind nach vorne gezogen, als wolle sie sich so klein wie möglich machen. Ihre Augen sind gerötet, als hätte sie geweint. Als sie dich sieht, versucht sie zu lächeln, aber es gelingt nicht. Irgendetwas ist passiert.',
        speaker: 'Erzähler',
        speakerEmoji: '🏔️',
        choices: [],
      },
      {
        id: 'm2-s2',
        text: '«Hey», sagt Lena leise. Ihre Stimme klingt brüchig. «Etwas ist passiert. In der Schule. Jemand hat … jemand hat vor allen gesagt, ich sei hässlich. Und alle haben gelacht. Alle.» Sie schluckt. «Und das Schlimmste ist: Ich glaube, er hat recht.»',
        speaker: 'Lena',
        speakerEmoji: '👧',
        choices: [
          {
            id: 'm2-s2-c1',
            text: '«Lena, das tut mir wirklich leid. Das war gemein und unfair. Niemand verdient es, so behandelt zu werden.»',
            consequence:
              'Lenas Augen füllen sich mit Tränen. «Danke», flüstert sie. «Irgendwie … irgendwie hat das noch nie jemand so klar gesagt. Alle sagen nur ‹Ignorier es einfach›. Aber wie soll ich etwas ignorieren, das so wehtut?» Du hast recht: Gefühle zu ignorieren funktioniert nicht. Sie müssen erst gehört und ernst genommen werden, bevor sie heilen können. Lenas Schmerz ist real – und ihn anzuerkennen ist der erste Schritt.',
            empathyPoints: 4,
            insightPoints: 2,
            couragePoints: 1,
            nextSceneId: 'm2-s3',
          },
          {
            id: 'm2-s2-c2',
            text: '«Halt mal – warum glaubst du jemandem, der gemein zu dir ist, mehr als den Menschen, die dich mögen?»',
            consequence:
              'Lena stutzt. «Ich … weiß nicht. Es fühlt sich einfach wahrer an? Wenn jemand etwas Nettes sagt, denke ich ‹die meinen das nicht so›. Aber wenn jemand was Fieses sagt, denke ich sofort ‹das stimmt›.» Das ist eine kognitive Verzerrung, die Psychologen den «Negativitätsbias» nennen: Unser Gehirn nimmt negative Informationen viel stärker auf als positive. Es ist wie ein Klettverschluss für Kritik und Teflon für Komplimente. Aber diesen Mechanismus zu erkennen ist schon der halbe Weg.',
            empathyPoints: 2,
            insightPoints: 4,
            couragePoints: 1,
            nextSceneId: 'm2-s3',
          },
          {
            id: 'm2-s2-c3',
            text: '«Naja, vielleicht hat er das gesagt, weil du dich nicht genug Mühe gibst mit deinem Aussehen. Hast du mal was anderes probiert?»',
            isWrong: true,
            consequence:
              'Lena wird blass. «Also … es ist meine Schuld?» Ihre Stimme bricht. Du hast gerade dem Opfer die Schuld gegeben. Statt Lena zu unterstützen, hast du bestätigt, dass Mobbing verdient sein kann – wenn man nur «besser» aussehen würde. Das ist grundfalsch: Niemand verdient es, beleidigt zu werden, egal wie er aussieht. Und Aussehen bestimmt nicht den Wert eines Menschen. Diese Antwort hat Lenas Schmerz verdoppelt und ihr gezeigt, dass selbst du auf der Seite des Mobbers stehst.',
            points: { empathyPoints: 0, insightPoints: 0, couragePoints: 0 },
            nextSceneId: 'm2-s3',
          },
        ],
      },
      {
        id: 'm2-s3',
        text: '«Weißt du, was das Verrückte ist?», sagt Lena. «Bevor er das gesagt hat, fand ich mich okay. Nicht super hübsch, aber … okay. Und jetzt, nach EINEM Satz von EINER Person, schaue ich in den Spiegel und sehe nur noch das, was er gesagt hat. Ein einziger Satz hat alles verändert.» Sie ballt die Fäuste. «Wie kann ein einziges Wort so viel Macht haben?»',
        speaker: 'Lena',
        speakerEmoji: '👧',
        choices: [
          {
            id: 'm2-s3-c1',
            text: '«Worte sind wie Steine. Wenn jemand dir einen Stein an den Kopf wirft, tut es weh – aber es sagt nichts über DICH aus. Es sagt etwas über den, der wirft.»',
            consequence:
              'Lena hebt einen kleinen Stein auf und betrachtet ihn. «Also … der Junge hat mir einen Stein an den Kopf geworfen. Und ich habe den Stein aufgehoben und trage ihn seitdem mit mir rum?» Ja! Genau so funktioniert es. Wenn jemand dich beleidigt, sagt das mehr über die Person aus als über dich. Vielleicht war er selbst unsicher. Vielleicht wollte er vor anderen cool wirken. Vielleicht hat ihn jemand genauso behandelt. Sein Wort war SEIN Stein – du musst ihn nicht behalten.',
            empathyPoints: 2,
            insightPoints: 4,
            couragePoints: 1,
            nextSceneId: 'm2-s4',
          },
          {
            id: 'm2-s3-c2',
            text: '«Worte haben nur so viel Macht, wie wir ihnen geben. Er hat etwas gesagt – aber DU entscheidest, ob du es glaubst.»',
            consequence:
              'Lena denkt darüber nach. «Aber wie soll ich es NICHT glauben? Es fühlt sich an wie die Wahrheit.» Du erklärst: «Unser Gehirn macht etwas Gemeines: Wenn jemand etwas Verletzendes sagt und andere lachen, speichert es das als ‹wahr› ab. Aber nur weil es weh tut, heißt das nicht, dass es stimmt. Zahnschmerzen tun auch weh – aber sie bedeuten nicht, dass du ein schlechter Mensch bist.» Lena lächelt ganz kurz. Gefühle und Wahrheit sind nicht dasselbe. Etwas kann sich wahr anfühlen und trotzdem falsch sein.',
            empathyPoints: 1,
            insightPoints: 4,
            couragePoints: 2,
            nextSceneId: 'm2-s4',
          },
          {
            id: 'm2-s3-c3',
            text: '«Stell dir vor, zehn Leute sagen dir, du bist toll, und eine Person sagt, du bist hässlich. An welche Person denkst du am meisten? Und ist das fair?»',
            consequence:
              'Lena antwortet sofort: «An die eine Person, die was Fieses gesagt hat. Natürlich.» Dann hält sie inne. «Oh. Das ist … total unfair, oder? Ich streiche zehn nette Stimmen durch wegen einer einzigen fiesen.» Genau. Das nennt man «Übergeneralisierung»: Wir nehmen ein einzelnes negatives Ereignis und machen daraus eine allgemeine Wahrheit. Ein Mensch sagt etwas Gemeines und plötzlich denken wir: «Alle finden mich hässlich.» Aber das stimmt nicht. Die Wahrheit liegt in der Mehrheit der Stimmen – nicht in der lautesten.',
            empathyPoints: 2,
            insightPoints: 4,
            couragePoints: 1,
            nextSceneId: 'm2-s4',
          },
          {
            id: 'm2-s3-c4',
            text: '«Ein Wort hat so viel Macht, weil es die Wahrheit trifft. Wenn es nicht stimmen würde, würde es nicht so wehtun.»',
            isWrong: true,
            consequence:
              'Lena erstarrt. «Also … es stimmt? Es stimmt wirklich?» Ihre Augen füllen sich mit Tränen. Du hast gerade eine furchtbare Logik bestätigt: dass Schmerz ein Beweis für Wahrheit ist. Aber das stimmt nicht. Worte verletzen, weil wir Menschen soziale Wesen sind – nicht weil die Worte wahr sind. Ein Tritt gegen das Schienbein tut auch weh, ohne dass der Tritt «recht hat». Lenas Schmerz ist real, aber der Inhalt der Beleidigung ist es nicht. Diese Antwort hat den Stein tiefer in ihr Herz gedrückt.',
            points: { empathyPoints: 0, insightPoints: 0, couragePoints: 0 },
            nextSceneId: 'm2-s4',
          },
        ],
      },
      {
        id: 'm2-s4',
        text: 'Lena schaut auf den Stein in ihrer Hand. «Also … wenn ich den Stein jetzt hier lasse, heißt das, ich lasse seine Worte los?» Sie hält den Stein über den Abgrund des Bergpfads. Ihre Hand zittert. «Aber was, wenn er recht hat? Was, wenn ich wirklich …» Sie kann den Satz nicht beenden.',
        speaker: 'Lena',
        speakerEmoji: '👧',
        choices: [
          {
            id: 'm2-s4-c1',
            text: '«Lena, hör auf MICH: Du bist nicht hässlich. Und selbst wenn du mir das jetzt nicht glaubst – ich sage es dir trotzdem. Immer wieder, bis du es hörst.»',
            consequence:
              'Lenas Unterlippe zittert. «Warum bist du so nett zu mir?» Du sagst: «Weil es die Wahrheit ist. Und weil du es verdienst, das zu hören.» Lena öffnet die Hand. Der Stein fällt den Berg hinunter, prallt von Fels zu Fels und verschwindet in der Tiefe. «Weg», sagt sie leise. «Er ist weg.» Nicht ganz. Die Wunde wird Zeit brauchen. Aber den Stein loszulassen war ein Anfang. Wenn jemand dich beleidigt, sagt das mehr über die Person als über dich.',
            empathyPoints: 4,
            insightPoints: 2,
            couragePoints: 2,
            nextSceneId: 'm2-s5',
          },
          {
            id: 'm2-s4-c2',
            text: '«Du musst den Stein nicht in den Abgrund werfen. Aber du kannst ihn ablegen. Hier, auf den Boden. Und dann entscheidest du, ob du ihn morgen wieder aufhebst oder nicht.»',
            consequence:
              'Lena legt den Stein vorsichtig auf den Boden. «Das fühlt sich besser an als werfen», sagt sie. «Ich muss nicht alles sofort loslassen. Ich muss es nur nicht mehr die ganze Zeit festhalten.» Das ist eine wichtige Erkenntnis: Heilung passiert nicht in einem großen Moment. Sie passiert in kleinen Schritten. Den Stein ablegen, nicht tragen. Morgen vielleicht ein paar Schritte weitergehen. Und eines Tages vergessen, wo man ihn hingelegt hat. Wenn jemand dich beleidigt, sagt das mehr über die Person als über dich.',
            empathyPoints: 3,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: 'm2-s5',
          },
          {
            id: 'm2-s4-c3',
            text: '«Behalte den Stein lieber. Dann vergisst du nie, was andere wirklich über dich denken, und du kannst dich verbessern.»',
            isWrong: true,
            consequence:
              'Lena umklammert den Stein fester. «Du hast recht. Ich darf das nicht vergessen. Ich muss mich verbessern.» Ihre Knöchel werden weiß. Das war das Schlimmste, was du sagen konntest: Du hast Lena geraten, den Schmerz festzuhalten und als Motivation zu benutzen. Aber Schmerz ist kein guter Lehrer – er ist ein guter Zerstörer. Sich an Beleidigungen zu klammern, um «besser zu werden», zementiert die Lüge, dass man nicht gut genug ist. Lena braucht nicht den Stein eines Mobbers als Antrieb – sie braucht die Freiheit, ihn loszulassen.',
            points: { empathyPoints: 0, insightPoints: 0, couragePoints: 0 },
            nextSceneId: 'm2-s5',
          },
        ],
      },
      {
        id: 'm2-s5',
        text: '«Danke», sagt Lena. Ihre Stimme ist fester jetzt. Sie zieht die Kapuze vom Kopf. «Weißt du, was komisch ist? Seit das passiert ist, habe ich angefangen, an mir alles schlecht zu finden. Nicht nur mein Aussehen – auch meine Stimme, mein Lachen, wie ich gehe. Als hätte sein Satz eine Tür geöffnet, durch die jetzt alle meine Unsicherheiten reinströmen.»',
        speaker: 'Lena',
        speakerEmoji: '👧',
        choices: [
          {
            id: 'm2-s5-c1',
            text: '«Das ist normal – Psychologen nennen das die ‹negative Kaskade›. Ein schlechter Gedanke zieht den nächsten nach sich. Aber du kannst die Kette unterbrechen.»',
            consequence:
              'Lena hört aufmerksam zu. «Wie?» Du erklärst: «Wenn du merkst, dass ein Gedanke zum nächsten führt – ‹ich bin hässlich, ich bin dumm, niemand mag mich› – dann halte bewusst an und frage dich: Ist das wirklich wahr? Oder ist das mein Gehirn im Negativmodus? Meistens ist es der Negativmodus. Und den kann man stoppen, indem man einen freundlichen Gedanken dazwischenschiebt. Zum Beispiel: ‹Stopp. Das ist nicht fair mir gegenüber.›» Lena nickt langsam. «Stopp. Das ist nicht fair.» Sie übt den Satz. Wenn jemand dich beleidigt, sagt das mehr über die Person als über dich.',
            empathyPoints: 2,
            insightPoints: 4,
            couragePoints: 2,
            nextSceneId: null,
          },
          {
            id: 'm2-s5-c2',
            text: '«Lena, du hast gerade etwas Unglaubliches gemacht: Du hast darüber geredet. Das braucht mehr Mut als du denkst.»',
            consequence:
              'Lena hält inne. «Wirklich? Ich hatte das Gefühl, ich bin schwach, weil mich das so fertigmacht.» Du schüttelst den Kopf. «Nein. Schwach wäre, alles runterzuschlucken und so zu tun, als wäre nichts passiert. Du hast mir vertraut und es ausgesprochen. Das ist mutig.» Lena steht ein bisschen aufrechter. «Ich bin mutig?» Ja. Über Schmerz zu reden ist eine der mutigsten Sachen, die es gibt. Und jedes Mal, wenn Lena darüber spricht, verliert der Satz des Jungen ein kleines Stück seiner Macht über sie. Wenn jemand dich beleidigt, sagt das mehr über die Person als über dich.',
            empathyPoints: 3,
            insightPoints: 2,
            couragePoints: 4,
            nextSceneId: null,
          },
          {
            id: 'm2-s5-c3',
            text: '«Hör auf zu jammern – andere haben echte Probleme. Sei froh, dass du nicht schlimmer dran bist.»',
            isWrong: true,
            consequence:
              'Lena verstummt. Ihre Augen werden glasig, aber sie schluckt die Tränen herunter. «Du hast recht. Ich bin undankbar. Andere haben es schlimmer.» Sie zieht die Kapuze wieder über den Kopf und verschließt sich komplett. Das war toxische Relativierung: Lenas Schmerz ist real, auch wenn andere Menschen andere Probleme haben. Jemandem zu sagen «andere haben es schlimmer» hilft nicht – es sagt nur: «Deine Gefühle sind nicht wichtig genug.» Jeder Schmerz verdient es, gehört zu werden, egal wie groß oder klein er im Vergleich erscheint.',
            points: { empathyPoints: 0, insightPoints: 0, couragePoints: 0 },
            nextSceneId: null,
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Scenario 3 – Klettern lernen
  // Teaching: Growth Mindset, Stärken erkennen, Selbstmitgefühl statt
  // Selbstkritik. Konkrete Tools: Positive Affirmationen, Stärkentagebuch,
  // "Was würdest du deinem besten Freund sagen?"
  // Core insight: Du bist genug – genau so, wie du bist.
  // ---------------------------------------------------------------------------
  {
    id: 'mountain-scenario-3',
    islandId: 'mountain' as IslandId,
    title: 'Klettern lernen',
    description:
      'Lena und du stehen vor einer schwierigen Kletterpassage. Am Anfang glaubt Lena, sie sei zu schwach und zu unsicher. Doch Schritt für Schritt entdeckt sie, dass sie mutiger und fähiger ist, als sie je gedacht hat. Gemeinsam lernt ihr: Stärken findet man nicht im Spiegel – sondern in dem, was man tut, wenn es schwierig wird. Und Fehler sind keine Niederlagen, sondern Beweise dafür, dass man es versucht.',
    scenes: [
      {
        id: 'm3-s1',
        text: 'Lena wartet auf dich an einer steilen Felswand. Neben ihr steht ein verwittertes Holzschild: «Kletterpfad der Stärken – Nur für Mutige.» Jemand hat mit Filzstift darunter geschrieben: «Und mutig ist jeder, der es versucht.» Lena sieht nervös aus – sie kaut auf ihrer Unterlippe und ihre Hände zittern leicht. Aber in ihren Augen ist auch ein Funke, der vorher nicht da war. Etwas wie Neugier. Oder vielleicht der leise Wunsch, sich selbst zu überraschen. «Ich wollte diesen Pfad schon immer ausprobieren», sagt sie. «Aber alleine hätte ich mich nie getraut. Kommst du mit?»',
        speaker: 'Lena',
        speakerEmoji: '👧',
        choices: [
          {
            id: 'm3-s1-c1',
            text: '«Klar komme ich mit! Und weißt du was – ich glaube, du bist mutiger als du denkst.»',
            consequence:
              'Lena lacht nervös. «Mutig? Ich? Ich bin die Person, die sich nicht mal traut, im Unterricht den Finger zu heben.» Du lächelst. «Mut heißt nicht, keine Angst zu haben. Mut heißt, Angst zu haben und es trotzdem zu versuchen. Und du stehst hier, oder?» Lena schaut die Felswand hoch. «Stimmt. Ich stehe hier.» Das ist der erste Schritt zum Growth Mindset: Erkennen, dass der Versuch bereits eine Leistung ist – nicht nur das Ergebnis.',
            empathyPoints: 2,
            insightPoints: 3,
            couragePoints: 3,
            nextSceneId: 'm3-s2',
          },
          {
            id: 'm3-s1-c2',
            text: '«Natürlich. Und wenn eine von uns fällt, fängt die andere sie auf. So funktioniert das.»',
            consequence:
              'Lena lächelt. «Versprochen?» Du nickst. «Versprochen.» Es ist erstaunlich, wie viel leichter sich Dinge anfühlen, wenn man weiß, dass jemand da ist. Nicht um es FÜR dich zu machen – sondern um da zu sein, falls du fällst. Das ist der Unterschied zwischen Abhängigkeit und Unterstützung: Du kletterst selbst, aber du bist nicht allein.',
            empathyPoints: 3,
            insightPoints: 2,
            couragePoints: 3,
            nextSceneId: 'm3-s2',
          },
          {
            id: 'm3-s1-c3',
            text: '«Ich weiß nicht – das Schild sagt ‹nur für Mutige›. Bist du sicher, dass du das schaffst? Ist das nicht ein bisschen zu viel für dich?»',
            isWrong: true,
            consequence:
              'Lena tritt einen Schritt zurück. «Du hast recht. Was habe ich mir dabei gedacht? Ich schaffe so etwas doch nie.» Der Funke in ihren Augen erlischt. Du hast gerade Lenas zaghaften Mut im Keim erstickt. Statt sie zu ermutigen, hast du ihre Zweifel bestätigt und ihr gesagt, dass sie nicht fähig genug ist. Mut wächst, wenn jemand an uns glaubt – und stirbt, wenn jemand unsere Ängste bestätigt. Lena brauchte jemanden, der sagt «Du kannst das», nicht jemanden, der sagt «Bist du sicher?».',
            points: { empathyPoints: 0, insightPoints: 0, couragePoints: 0 },
            nextSceneId: 'm3-s2',
          },
        ],
      },
      {
        id: 'm3-s2',
        text: 'Ihr beginnt zu klettern. Lena ist langsam, vorsichtig – und viel besser als sie denkt. Nach der ersten schwierigen Stelle hält sie inne und schaut nach unten. «Wow. Ich bin schon so weit oben!» Dann rutscht sie ab. Nicht weit, aber genug, um zu erschrecken. «Ich WUSSTE es», sagt sie sofort. «Ich kann das nicht. Ich bin einfach zu … zu …»',
        speaker: 'Lena',
        speakerEmoji: '👧',
        choices: [
          {
            id: 'm3-s2-c1',
            text: '«Stopp, Lena. Du bist gerade abgerutscht – nicht gescheitert. Was würdest du deiner besten Freundin sagen, wenn ihr das passiert wäre?»',
            consequence:
              'Lena blinzelt. «Meiner besten Freundin? Ich würde sagen … ‹Hey, das passiert jedem! Komm, versuch es nochmal, du schaffst das!›» Du nickst. «Und was hast du gerade zu DIR gesagt?» Stille. «Dass ich es nicht kann. Dass ich zu schlecht bin.» Genau. Das ist der Unterschied: Zu anderen sind wir ermutigend und verständnisvoll. Zu uns selbst sind wir brutal. Selbstmitgefühl bedeutet, dir selbst der Freund zu sein, den du für andere bist. Lena atmet tief durch, schaut die Wand an und sagt: «Okay. Ich versuche es nochmal. Weil meine beste Freundin mir das raten würde.»',
            empathyPoints: 3,
            insightPoints: 4,
            couragePoints: 2,
            nextSceneId: 'm3-s3',
          },
          {
            id: 'm3-s2-c2',
            text: '«Einmal abrutschen heißt nicht, dass du nicht klettern kannst. Es heißt nur, dass du noch lernst. Und Lernen bedeutet Fehler machen.»',
            consequence:
              'Lena schaut dich zweifelnd an. «Aber andere rutschen nicht ab.» Du lachst. «Doch. Jeder rutscht ab. Der Unterschied ist: Manche stehen wieder auf und manche bleiben sitzen. Du hast die Wahl.» Das ist der Kern des Growth Mindsets: Fehler sind nicht das Gegenteil von Erfolg – sie sind ein Teil davon. Jeder Ausrutscher zeigt dir, wo der Halt besser sein muss. Lena greift wieder in den Fels. Ihre Hände zittern, aber sie klettert.',
            empathyPoints: 1,
            insightPoints: 3,
            couragePoints: 4,
            nextSceneId: 'm3-s3',
          },
          {
            id: 'm3-s2-c3',
            text: '«Siehst du? Ich hab mir schon gedacht, dass das passiert. Manche Leute sind halt nicht fürs Klettern gemacht.»',
            isWrong: true,
            consequence:
              'Lena lässt den Fels los und setzt sich auf den Boden. «Stimmt. Ich bin halt nicht fürs Klettern gemacht. Ich bin für gar nichts gemacht.» Die Energie, die sie gerade noch hatte, ist verschwunden. Das war ein klassisches Fixed Mindset – die Überzeugung, dass Fähigkeiten angeboren und unveränderlich sind. Statt Lena zu zeigen, dass Fehler zum Lernen gehören, hast du bestätigt, dass ihr Abrutschen ein Beweis für ihre Unfähigkeit ist. Aber kein Mensch wird als Kletterer geboren. Man wird es durch Übung, Geduld und den Mut, es nochmal zu versuchen.',
            points: { empathyPoints: 0, insightPoints: 0, couragePoints: 0 },
            nextSceneId: 'm3-s3',
          },
        ],
      },
      {
        id: 'm3-s3',
        text: 'Lena klettert weiter. Und weiter. An einer besonders kniffligen Stelle bleibt sie stehen und denkt nach. Dann findet sie einen Griff, den du nicht gesehen hättest. «Hier lang!», ruft sie dir zu. «Ich habe einen Weg gefunden!» In ihren Augen ist ein Funkeln, das vorher nicht da war.',
        speaker: 'Erzähler',
        speakerEmoji: '🏔️',
        choices: [
          {
            id: 'm3-s3-c1',
            text: '«Lena, hast du gemerkt, was du gerade gemacht hast? Du hast ein Problem gelöst, an dem ICH gescheitert wäre!»',
            consequence:
              'Lena wird rot. «Ach, das war doch nichts …» Du unterbrichst: «Nein. Hör auf, deine Stärken kleinzureden. Das war kreativ, das war klug, und das war DEINE Idee.» Lena schweigt kurz. Dann sagt sie leise: «Okay. Das war … das war gut von mir.» Ein Kompliment anzunehmen statt abzuwehren – das ist eine der schwierigsten Übungen für Menschen mit geringem Selbstwert. Aber jedes angenommene Kompliment ist ein kleiner Baustein für ein freundlicheres Selbstbild.',
            empathyPoints: 2,
            insightPoints: 4,
            couragePoints: 2,
            nextSceneId: 'm3-s4',
          },
          {
            id: 'm3-s3-c2',
            text: '«Siehst du? DAS ist eine deiner Stärken: Du siehst Wege, die andere übersehen. Das ist eine Superkraft!»',
            consequence:
              'Lena grinst. «Eine Superkraft?» Du nickst. «Ernsthaft. Die meisten Leute schauen nach oben und sehen nur Hindernisse. Du schaust genau hin und findest Lösungen. Das nennt man Problemlösefähigkeit – und die ist Gold wert.» Lena wiederholt das Wort leise: «Problemlösefähigkeit.» Dann sagt sie: «Das hat mir noch nie jemand gesagt.» Vielleicht weil niemand hingeschaut hat. Stärken sind oft unsichtbar für den, der sie hat – wie ein Fisch, der nicht weiß, dass er schwimmen kann, weil er es schon immer getan hat.',
            empathyPoints: 2,
            insightPoints: 3,
            couragePoints: 3,
            nextSceneId: 'm3-s4',
          },
          {
            id: 'm3-s3-c3',
            text: '«Ich glaube, du solltest ein Stärkentagebuch anfangen. Jeden Abend drei Dinge aufschreiben, die du gut gemacht hast.»',
            consequence:
              'Lena schaut skeptisch. «Drei Dinge? Ich finde nicht mal eins.» Du lächelst. «Du hast dich heute auf den Kletterpfad getraut. Das ist eins. Du hast einen neuen Weg gefunden. Das sind zwei. Und du hast nicht aufgegeben, als du abgerutscht bist. Das sind drei.» Lena zählt mit und ihre Augen werden größer. «Oh. Das stimmt ja alles.» Ein Stärkentagebuch trainiert das Gehirn, auf das Positive zu achten statt nur das Negative zu sehen. Am Anfang fühlt es sich künstlich an – aber nach zwei Wochen verändert sich, wie man über sich selbst denkt.',
            empathyPoints: 1,
            insightPoints: 4,
            couragePoints: 2,
            nextSceneId: 'm3-s4',
          },
          {
            id: 'm3-s3-c4',
            text: '«Das war einfach nur Glück. Beim nächsten Mal schaffst du das wahrscheinlich nicht nochmal.»',
            isWrong: true,
            consequence:
              'Das Funkeln in Lenas Augen verschwindet sofort. «Ja … wahrscheinlich war es nur Zufall.» Sie macht sich wieder klein. Du hast gerade Lenas Erfolg entwertet, indem du ihn auf Glück reduziert hast. Das ist eine zerstörerische Botschaft: Wenn Erfolge «nur Glück» sind, aber Misserfolge «Beweis für Unfähigkeit», dann kann man nur verlieren. Lenas Leistung war echt – sie hat kreativ gedacht und eine Lösung gefunden. Das hat nichts mit Glück zu tun. Stärken kleinzureden ist genauso schädlich wie Schwächen zu übertreiben.',
            points: { empathyPoints: 0, insightPoints: 0, couragePoints: 0 },
            nextSceneId: 'm3-s4',
          },
        ],
      },
      {
        id: 'm3-s4',
        text: 'Ihr erreicht einen breiten Felsvorsprung mit einem atemberaubenden Ausblick. Lena steht am Rand und atmet tief durch. Die Welt unter euch sieht ruhig und weit aus. «Ich hätte nie gedacht, dass ich das schaffe», sagt sie. Dann dreht sie sich zu dir. «Ich möchte mir etwas vornehmen. Etwas, das ich mir jeden Morgen sage. Etwas Positives über mich. Hilfst du mir?»',
        speaker: 'Lena',
        speakerEmoji: '👧',
        choices: [
          {
            id: 'm3-s4-c1',
            text: '«Wie wäre es mit: ‹Ich bin genug – genau so, wie ich bin. Meine Fehler machen mich nicht weniger wertvoll.›?»',
            consequence:
              'Lena sagt den Satz laut in die Bergwelt hinein: «ICH BIN GENUG – GENAU SO, WIE ICH BIN!» Ihre Stimme hallt von den Felswänden wider. «Hey, der Berg sagt es zurück!», lacht sie. «Der Berg findet auch, dass ich genug bin!» Ihr lacht beide. Positive Affirmationen fühlen sich am Anfang merkwürdig an. Aber sie sind wie Samen: Du pflanzt sie, gießt sie jeden Tag ein bisschen, und irgendwann wachsen sie zu Überzeugungen. Du bist genug – genau so, wie du bist. Deine Fehler machen dich nicht weniger wertvoll.',
            empathyPoints: 3,
            insightPoints: 3,
            couragePoints: 3,
            nextSceneId: null,
          },
          {
            id: 'm3-s4-c2',
            text: '«Überleg mal, was du heute gelernt hast – und mach daraus DEINEN Satz. Einen, der sich für dich richtig anfühlt.»',
            consequence:
              'Lena denkt nach. Lange. Dann sagt sie: «Ich bin mutig, auch wenn meine Hände zittern. Ich bin klug, auch wenn ich nicht alles weiß. Und ich bin wertvoll, auch an Tagen, an denen ich mich nicht so fühle.» Stille. Du hast Gänsehaut. «Das ist perfekt, Lena.» Sie lächelt – und es ist kein unsicheres Lächeln mehr. Es ist echt. Wenn Menschen ihre eigene Affirmation finden – mit ihren eigenen Worten – wirkt sie tiefer als jede, die jemand anders ihnen gibt. Du bist genug – genau so, wie du bist. Deine Fehler machen dich nicht weniger wertvoll.',
            empathyPoints: 2,
            insightPoints: 4,
            couragePoints: 3,
            nextSceneId: null,
          },
          {
            id: 'm3-s4-c3',
            text: '«Wie wäre es mit: ‹Ich muss perfekt sein, damit mich die Leute mögen›? Das motiviert dich bestimmt!»',
            isWrong: true,
            consequence:
              'Lena wiederholt den Satz leise: «Ich muss perfekt sein, damit mich die Leute mögen.» Dann sackt sie in sich zusammen. «Aber … ich bin nicht perfekt. Heißt das, mich mag niemand?» Das war keine Affirmation – das war ein Fluch. Du hast Lenas Wert an Perfektion geknüpft und damit an eine Bedingung, die kein Mensch jemals erfüllen kann. Echte Affirmationen sind bedingungslos: «Ich bin genug, so wie ich bin.» Nicht: «Ich bin genug, WENN ich perfekt bin.» Perfektionismus ist der Feind des Selbstwerts, nicht sein Freund.',
            points: { empathyPoints: 0, insightPoints: 0, couragePoints: 0 },
            nextSceneId: null,
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Scenario 4 – Der Gipfel
  // Teaching: Selbstwert befähigt, anderen zu helfen. Authentische Identität.
  // Wertegeleitetes Handeln trotz sozialem Druck. Integration aller
  // bisherigen Learnings. Lena gibt weiter, was sie gelernt hat.
  // ---------------------------------------------------------------------------
  {
    id: 'mountain-scenario-4',
    islandId: 'mountain' as IslandId,
    title: 'Der Gipfel',
    description:
      'Der Gipfel ist in Sicht. Aber auf dem Weg dorthin trefft ihr Milo, einen neuen Jungen, der von einer Gruppe ausgeschlossen wird. Lena kennt dieses Gefühl nur zu gut. Jetzt steht sie vor der Entscheidung: Hinschauen oder wegschauen? Sich einsetzen oder schweigen? Die Antwort liegt in allem, was ihr gemeinsam auf dem Berg gelernt habt – und in der Frage, wer Lena wirklich sein will.',
    scenes: [
      {
        id: 'm4-s1',
        text: 'Der Gipfel ist nah. Ihr könnt ihn sehen – die letzten Felsen, der Himmel darüber, das Versprechen eines Ausblicks, der alles wert ist. Lena geht neben dir, aufrechter als je zuvor. Aber auf dem Weg dorthin hört ihr Stimmen. Eine Gruppe von vier Jugendlichen steht im Kreis. In der Mitte, etwas abseits, steht ein Junge allein. Er ist neu – das sieht man sofort: unsicherer Blick, Hände in den Hosentaschen, Rucksack noch geschultert, als wüsste er nicht, ob er bleiben darf oder gehen soll. Er versucht, dazuzugehören, aber die Gruppe hat eine unsichtbare Mauer um sich gebaut.',
        speaker: 'Erzähler',
        speakerEmoji: '🏔️',
        choices: [],
      },
      {
        id: 'm4-s2',
        text: '«Wer bist denn du?», fragt einer aus der Gruppe, ohne hinzuschauen. «Wir haben keinen Platz mehr. Geh woanders hin.» Die anderen lachen. Der Junge – er heißt Milo – senkt den Kopf und tritt einen Schritt zurück. Lena bleibt stehen. Du siehst, wie sich etwas in ihrem Gesicht verändert. Sie kennt dieses Gefühl. Sie weiß, wie Milo sich gerade fühlt.',
        speaker: 'Erzähler',
        speakerEmoji: '🏔️',
        choices: [
          {
            id: 'm4-s2-c1',
            text: '«Lena, ich glaube, Milo braucht gerade jemanden. Du weißt, wie sich das anfühlt.»',
            consequence:
              'Lena nickt langsam. «Ja. Ich weiß genau, wie sich das anfühlt. Unsichtbar. Unerwünscht. Als wärst du ein Problem, nur weil du da bist.» Sie ballt die Fäuste. «Aber … was, wenn die Gruppe mich dann auch ausschließt? Was, wenn sie über mich lachen?» Das ist die große Frage: Ist man bereit, etwas Richtiges zu tun, auch wenn es einen etwas kostet? Selbstwert bedeutet nicht nur, sich selbst zu mögen – es bedeutet auch, nach seinen Werten zu handeln, selbst wenn es unbequem wird.',
            empathyPoints: 3,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: 'm4-s3',
          },
          {
            id: 'm4-s2-c2',
            text: '«Was denkst du, Lena? Was willst du tun?»',
            consequence:
              'Lena schaut zu Milo, dann zu der Gruppe, dann zu dir. «Ich … ich weiß, was das RICHTIGE wäre. Aber ich habe Angst. Wenn ich mich für ihn einsetze, machen die sich vielleicht auch über mich lustig.» Sie atmet tief durch. «Aber … weißt du was? Vor ein paar Tagen hätte mir jemand wie Milo gutgetan. Jemand, der einfach sagt: Hey, du gehörst dazu.» Man sieht, wie sie sich entscheidet. Nicht weil es einfach ist – sondern weil sie weiß, was richtig ist.',
            empathyPoints: 2,
            insightPoints: 3,
            couragePoints: 3,
            nextSceneId: 'm4-s3',
          },
        ],
      },
      {
        id: 'm4-s3',
        text: 'Lena geht auf Milo zu. Ihre Hände zittern ein bisschen, aber ihre Stimme ist fest. «Hey. Ich bin Lena. Willst du mit uns zum Gipfel gehen?» Milo schaut auf. In seinen Augen ist Überraschung – und Erleichterung. «Wirklich?», fragt er leise. Die Gruppe beobachtet. Einer von ihnen schnaubt: «Sammelt ihr jetzt Außenseiter ein?»',
        speaker: 'Erzähler',
        speakerEmoji: '🏔️',
        choices: [
          {
            id: 'm4-s3-c1',
            text: '«Wir sammeln keine Außenseiter. Wir behandeln Menschen mit Respekt. Das ist ein Unterschied.»',
            consequence:
              'Stille. Einer aus der Gruppe schaut verlegen weg. Ein anderer murmelt: «War ja nur ein Witz.» Aber es war kein Witz – und alle wissen es. Manchmal reicht ein einziger Satz, um eine Dynamik zu verändern. Nicht indem man andere beschämt, sondern indem man klar sagt, wofür man steht. Lena steht neben dir, aufrecht und ruhig. Sie hat sich verändert – nicht weil sie keine Angst mehr hat, sondern weil sie gelernt hat, dass ihre Werte wichtiger sind als ihre Angst.',
            empathyPoints: 2,
            insightPoints: 3,
            couragePoints: 4,
            nextSceneId: 'm4-s4',
          },
          {
            id: 'm4-s3-c2',
            text: '«Jeder hier war mal neu. Jeder kennt das Gefühl, nicht dazuzugehören. Oder habt ihr das vergessen?»',
            consequence:
              'Die Worte treffen. Man sieht es an den Gesichtern der Gruppe – da ist Erkennung, vielleicht sogar Scham. Einer von ihnen sagt leise: «Stimmt eigentlich. Als ich angefangen hab, wollte auch keiner mit mir reden.» Ein anderer nickt. Manchmal brauchen Menschen keinen Vortrag über Moral – sie brauchen eine Erinnerung an ihr eigenes Gefühl. Empathie zu wecken ist wirksamer als zu beschämen. Milo schaut dankbar zu Lena und dir.',
            empathyPoints: 4,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: 'm4-s4',
          },
          {
            id: 'm4-s3-c3',
            text: 'Nichts sagen, sondern einfach Milo einladen, mitzukommen. Manchmal sind Taten lauter als Worte.',
            consequence:
              'Du nickst Milo zu. Lena hakt sich bei ihm unter. Und ihr geht weiter – an der Gruppe vorbei, den Gipfel hinauf. Kein Drama, kein Streit. Nur eine stille Botschaft: Wir schließen niemanden aus. Die Gruppe schaut euch nach. Nach einer Weile sagt einer: «Wartet … können wir mitkommen?» Manchmal ist das stärkste Statement kein Wort, sondern eine Handlung. Inklusion muss nicht laut sein – sie muss nur echt sein.',
            empathyPoints: 3,
            insightPoints: 2,
            couragePoints: 4,
            nextSceneId: 'm4-s4',
          },
        ],
      },
      {
        id: 'm4-s4',
        text: 'Ihr geht zu dritt weiter – Lena, Milo und du. Der Pfad wird schmaler, aber das macht nichts, denn ihr geht zusammen. Milo ist erst still, dann beginnt er zu erzählen. Er ist vor drei Wochen umgezogen. Neue Stadt, neue Schule, kein einziger Freund. «Es ist, als wäre ich unsichtbar», sagt er leise. «Als wäre ich Luft. Als wäre ich gar nicht da. In der Pause stehe ich allein, und niemand schaut mich an. Nicht mal die Lehrer merken, dass ich neu bin.» Lena hört zu. Wirklich zu. Sie unterbricht nicht, sie relativiert nicht, sie sagt nicht «das wird schon». Sie hört einfach zu. Und dann sagt sie etwas, das dich überrascht.',
        speaker: 'Erzähler',
        speakerEmoji: '🏔️',
        choices: [],
      },
      {
        id: 'm4-s5',
        text: '«Milo, ich kenne das Gefühl», sagt Lena. «Ich wurde gemobbt. Jemand hat mich hässlich genannt und ich habe es geglaubt. Aber weißt du, was ich gelernt habe? Was andere über dich sagen, ist ihr Stein – nicht deiner. Du musst ihn nicht tragen.» Milo schaut sie an. «Wirklich? Du wurdest auch …?» Lena nickt. «Ja. Und es hat wehgetan. Aber es hat mich nicht definiert. Und dich wird das hier auch nicht definieren.»',
        speaker: 'Lena',
        speakerEmoji: '👧',
        choices: [
          {
            id: 'm4-s5-c1',
            text: '«Lena, ich bin so stolz auf dich. Du gibst gerade genau das weiter, was du selbst gebraucht hast.»',
            consequence:
              'Lena wird rot, aber diesmal vor Freude. «Weißt du, was komisch ist? Indem ich Milo helfe, fühle ich mich selbst besser. Als würde das, was ich gelernt habe, erst richtig echt, wenn ich es weitergebe.» Das ist eine tiefe Wahrheit: Wenn wir anderen helfen, helfen wir auch uns selbst. Nicht weil wir es berechnen, sondern weil Mitgefühl eine Brücke ist – und Brücken gehen in beide Richtungen. Milo lächelt. Lena lächelt. Und ihr geht dem Gipfel entgegen.',
            empathyPoints: 4,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: 'm4-s6',
          },
          {
            id: 'm4-s5-c2',
            text: '«Milo, du bist nicht allein. Und Lena hat recht – du bist mehr als das, was eine Gruppe über dich denkt.»',
            consequence:
              'Milo schluckt. «Danke. Beide. Ich hatte … ich hatte seit dem Umzug mit niemandem richtig geredet.» In diesem Moment passiert etwas Magisches: Drei Menschen, die sich unsicher und allein gefühlt haben, finden einander. Nicht weil sie perfekt sind – sondern gerade weil sie es nicht sind. Verletzlichkeit verbindet. Und wer den Mut hat, seine Geschichte zu teilen, gibt anderen die Erlaubnis, dasselbe zu tun.',
            empathyPoints: 4,
            insightPoints: 2,
            couragePoints: 3,
            nextSceneId: 'm4-s6',
          },
        ],
      },
      {
        id: 'm4-s6',
        text: 'Ihr erreicht den Gipfel. Endlich. Die Sonne steht tief und taucht alles in goldenes Licht. Die Welt unter euch erstreckt sich in alle Richtungen – Täler, Flüsse, Wälder, andere Berge in der Ferne. Von hier oben sieht alles weit und offen und voller Möglichkeiten aus. Lena steht am Rand, die Arme ausgebreitet, den Wind im Gesicht. Sie sieht aus wie ein vollkommen anderer Mensch als das Mädchen, das vor ein paar Tagen mit gesenktem Kopf auf einem Felsen saß und traurig auf sein Handy starrte. Sie dreht sich zu dir und ihre Augen leuchten. «Weißt du, was ich jetzt weiß?», sagt sie.',
        speaker: 'Lena',
        speakerEmoji: '👧',
        choices: [
          {
            id: 'm4-s6-c1',
            text: '«Sag es mir.»',
            consequence:
              'Lena dreht sich zu dir. «Ich weiß jetzt, wer ich bin. Nicht perfekt. Nicht immer mutig. Nicht immer stark. Aber echt. Und wenn ich weiß, wer ich bin, können andere mich nicht so leicht erschüttern. Der Junge, der mich hässlich genannt hat – das war sein Stein, nicht meine Wahrheit. Und die Likes auf Instagram? Das ist ein Spiel, das ich nicht mitspielen muss.» Sie lächelt. «Ich bin Lena. Ich bin genug. Und ich bin jemand, der nicht wegschaut, wenn andere Hilfe brauchen.» Wenn du weißt, wer du bist, können andere dich nicht so leicht erschüttern.',
            empathyPoints: 3,
            insightPoints: 4,
            couragePoints: 3,
            nextSceneId: null,
          },
          {
            id: 'm4-s6-c2',
            text: '«Du hast den Berg bestiegen, Lena. Nicht nur diesen hier – auch den in dir drinnen.»',
            consequence:
              'Lena lacht. «Der Berg in mir war ehrlich gesagt schwieriger als der hier draußen.» Milo nickt. «Für mich auch.» Ihr steht zu dritt auf dem Gipfel, und für einen Moment ist alles still. Kein Handy, kein Social Media, keine Vergleiche. Nur drei Menschen, die gelernt haben: Dein Wert hängt nicht davon ab, was andere denken. Er hängt davon ab, ob du nach deinen Werten lebst. Lena hat das getan. Sie hat hingeschaut, als andere weggeschaut haben. Sie hat geredet, als andere geschwiegen haben. Und sie hat die Hand ausgestreckt, als andere sie zurückgezogen haben. Wenn du weißt, wer du bist, können andere dich nicht so leicht erschüttern.',
            empathyPoints: 3,
            insightPoints: 3,
            couragePoints: 4,
            nextSceneId: null,
          },
        ],
      },
    ],
  },
];

// =============================================================================
// 2. WISDOM CARDS
// Each card captures a core learning from the mountain island's journey.
// Categories: insight (Erkenntnis), courage (Mut), emotion (Gefühl),
// strategy (Strategie/Werkzeug)
// =============================================================================

export const mountainWisdomCards: WisdomCard[] = [
  // Card 1 – From Scenario 1: Gedanken sind keine Fakten
  {
    id: 'mountain-wisdom-1',
    islandId: 'mountain' as IslandId,
    text: 'Was du über dich selbst denkst, ist nicht immer die Wahrheit. Gedanken sind keine Fakten – du darfst sie hinterfragen, besonders die gemeinen. Nur weil dein Kopf etwas sagt, muss es nicht stimmen.',
    category: 'insight',
    collected: false,
  },

  // Card 2 – From Scenario 2: Beleidigungen sagen mehr über den Sender
  {
    id: 'mountain-wisdom-2',
    islandId: 'mountain' as IslandId,
    text: 'Wenn jemand dich beleidigt, sagt das mehr über die Person als über dich. Du musst ihre Steine nicht einsammeln und mit dir herumtragen. Lass den Stein dort, wo er hingehört – bei dem, der ihn geworfen hat.',
    category: 'courage',
    collected: false,
  },

  // Card 3 – From Scenario 1: Social Media Vergleichsfalle
  {
    id: 'mountain-wisdom-3',
    islandId: 'mountain' as IslandId,
    text: 'Social Media zeigt Highlight-Reels, keine echten Leben. Vergleiche dein normales Kapitel 3 nicht mit dem inszenierten Kapitel 20 von jemand anderem. Hinter jedem perfekten Foto stecken 50 Versuche und drei Filter.',
    category: 'insight',
    collected: false,
  },

  // Card 4 – From Scenario 3: Du bist genug
  {
    id: 'mountain-wisdom-4',
    islandId: 'mountain' as IslandId,
    text: 'Du bist genug – genau so, wie du bist. Deine Fehler machen dich nicht weniger wertvoll. Sie machen dich menschlich, und das ist deine größte Stärke. Nicht perfekt zu sein ist keine Schwäche – es ist ehrlich.',
    category: 'emotion',
    collected: false,
  },

  // Card 5 – From Scenario 3: Selbstmitgefühl-Test
  {
    id: 'mountain-wisdom-5',
    islandId: 'mountain' as IslandId,
    text: 'Frag dich: «Würde ich das zu meiner besten Freundin sagen?» Wenn nicht, dann sag es auch nicht zu dir selbst. Du verdienst dieselbe Freundlichkeit, die du anderen gibst.',
    category: 'strategy',
    collected: false,
  },

  // Card 6 – From Scenario 3 & 4: Mut und Angst
  {
    id: 'mountain-wisdom-6',
    islandId: 'mountain' as IslandId,
    text: 'Mut bedeutet nicht, keine Angst zu haben. Mut bedeutet, Angst zu haben und es trotzdem zu versuchen. Und du bist mutiger, als du denkst – denn du bist hier, und du versuchst es.',
    category: 'courage',
    collected: false,
  },

  // Card 7 – From Scenario 4: Wer du bist
  {
    id: 'mountain-wisdom-7',
    islandId: 'mountain' as IslandId,
    text: 'Wenn du weißt, wer du bist, können andere dich nicht so leicht erschüttern. Dein Wert hängt nicht von Likes, Noten oder dem ab, was andere über dich sagen. Er kommt von innen – von deinen Werten und deinen Taten.',
    category: 'insight',
    collected: false,
  },

  // Card 8 – From Scenario 4: Anderen helfen stärkt dich selbst
  {
    id: 'mountain-wisdom-8',
    islandId: 'mountain' as IslandId,
    text: 'Anderen zu helfen, wenn sie ausgeschlossen werden, ist nicht nur nett – es ist mutig. Und es erinnert dich daran, dass du jemand bist, der nach seinen Werten handelt. Mitgefühl ist eine Brücke, die in beide Richtungen geht.',
    category: 'courage',
    collected: false,
  },
];

// =============================================================================
// 3. ACTIVITIES
// =============================================================================

export const mountainActivities: Activity[] = [
  // ---------------------------------------------------------------------------
  // Activity 1: Positive Affirmationen – Sätze der Stärke
  // Based on positive psychology and self-affirmation theory (Steele, 1988)
  // ---------------------------------------------------------------------------
  {
    id: 'mountain-activity-1',
    islandId: 'mountain' as IslandId,
    type: 'reflection',
    title: 'Sätze der Stärke – Positive Affirmationen',
    description:
      'Finde deine eigenen ermutigenden Sätze und übe, sie dir jeden Tag zu sagen. Am Anfang fühlt es sich vielleicht komisch an – aber wie beim Klettern wird es mit der Zeit leichter und natürlicher.',
    instructions: [
      'Nimm dir einen ruhigen Moment. Setz dich bequem hin, atme dreimal tief durch und komm bei dir an.',
      'Denke an eine Sache, die du an dir magst – eine Eigenschaft, ein Talent, etwas, das du für andere tust. Auch kleine Dinge zählen: «Ich bin ein guter Zuhörer.» «Ich bin kreativ.» «Ich gebe nicht so leicht auf.»',
      'Formuliere daraus einen kurzen, positiven Satz in der Ich-Form. Zum Beispiel: «Ich bin genug, genau so wie ich bin.» Oder: «Ich bin mutig, auch wenn meine Hände zittern.» Oder: «Meine Fehler machen mich nicht weniger wertvoll.»',
      'Sage den Satz laut vor dich hin. Ja, laut! Das fühlt sich am Anfang komisch an – aber es macht einen Unterschied, ob du etwas nur denkst oder ob du es aussprichst. Deine eigene Stimme ist mächtiger, als du denkst.',
      'Schreibe den Satz auf einen Zettel und klebe ihn an deinen Spiegel, in dein Federmäppchen oder als Hintergrundbild auf dein Handy. Jeden Morgen liest du ihn einmal – wie eine kleine Erinnerung an dich selbst.',
      'Wenn der innere Kritiker sagt «Das stimmt doch gar nicht», antworte ihm: «Ich übe gerade, freundlicher zu mir zu sein. Und das ist okay.» Positive Affirmationen sind wie Muskeltraining: Am Anfang ist es anstrengend, aber mit der Zeit wird es selbstverständlich.',
    ],
    completed: false,
  },

  // ---------------------------------------------------------------------------
  // Activity 2: Stärkentagebuch
  // Based on VIA character strengths and positive journaling
  // ---------------------------------------------------------------------------
  {
    id: 'mountain-activity-2',
    islandId: 'mountain' as IslandId,
    type: 'journal',
    title: 'Mein Stärkentagebuch',
    description:
      'Schreibe jeden Abend drei Dinge auf, die du heute gut gemacht hast oder die dir an dir aufgefallen sind. Auch kleine Sachen zählen: jemandem zugehört, etwas Neues probiert, freundlich gewesen. Nach zwei Wochen wirst du staunen, wie viele Stärken du hast, die du vorher nicht gesehen hast.',
    instructions: [
      'Besorge dir ein kleines Notizbuch oder öffne eine Notiz-App auf deinem Handy. Das wird dein Stärkentagebuch. Schreibe auf die erste Seite: «Meine Stärken – Dinge, die ich gut mache.»',
      'Jeden Abend, bevor du schlafen gehst, schreibe drei Dinge auf, die du heute gut gemacht hast. Das können große Sachen sein (eine Prüfung bestanden) oder ganz kleine (jemandem die Tür aufgehalten, trotz Müdigkeit aufgestanden, etwas Neues probiert).',
      'Wenn dir nichts einfällt, frage dich: Habe ich heute jemandem zugehört? Habe ich etwas versucht, auch wenn ich unsicher war? War ich freundlich – zu anderen oder zu mir selbst? Habe ich nicht aufgegeben, obwohl etwas schwierig war?',
      'Schreibe auch auf, was andere Positives über dich gesagt haben. Wenn jemand sagt «Du bist echt lustig» oder «Danke, dass du mir geholfen hast», dann ist das eine Stärke. Schreibe es wörtlich auf – ohne es kleinzureden.',
      'Nach zwei Wochen lies alle Einträge nochmal durch. Du wirst staunen, wie viele Stärken sich angesammelt haben. Unser Gehirn neigt dazu, das Negative zu speichern und das Positive zu vergessen. Das Stärkentagebuch dreht diesen Mechanismus um.',
      'Bonus: Frage zwei Menschen, denen du vertraust, was sie an dir besonders finden. Schreibe ihre Antworten in dein Tagebuch. Oft sehen andere Stärken an uns, die wir selbst übersehen – wie ein Fisch, der nicht weiß, dass er schwimmen kann.',
    ],
    completed: false,
  },

  // ---------------------------------------------------------------------------
  // Activity 3: Selbstgespräch-Check – Was sage ich mir?
  // Based on CBT (cognitive behavioral therapy) thought monitoring
  // ---------------------------------------------------------------------------
  {
    id: 'mountain-activity-3',
    islandId: 'mountain' as IslandId,
    type: 'reflection',
    title: 'Selbstgespräch-Check – Was sage ich mir?',
    description:
      'Achte einen Tag lang bewusst darauf, was du innerlich zu dir selbst sagst. Schreibe die fiesen Sätze auf und verwandle sie in freundlichere Versionen. Das ist kognitive Umstrukturierung – und es funktioniert wirklich.',
    instructions: [
      'Nimm ein Blatt Papier und teile es in zwei Spalten. Links schreibst du «Der Kritiker» und rechts «Der Freund».',
      'Achte einen ganzen Tag lang darauf, was deine innere Stimme zu dir sagt. Besonders in schwierigen Momenten – wenn du einen Fehler machst, wenn jemand dich kritisiert, wenn du dich mit anderen vergleichst. Schreibe die negativen Sätze in die linke Spalte. Zum Beispiel: «Ich bin so dumm», «Das schaffe ich nie», «Alle anderen sind besser als ich.»',
      'Am Abend nimmst du dir die Liste vor. Für jeden Kritiker-Satz überlegst du: Was würde ich meiner besten Freundin sagen, wenn sie das über sich denkt? Schreibe diese freundlichere Version in die rechte Spalte. Zum Beispiel: «Das war schwierig, aber du lernst noch» statt «Ich bin so dumm.»',
      'Lies beide Spalten laut vor. Merkst du den Unterschied? Der Kritiker ist brutal und unfair. Der Freund ist ehrlich, aber mitfühlend. Beide beschreiben die gleiche Situation – aber der Freund hilft dir, weiterzumachen.',
      'Gib deinem inneren Kritiker einen lustigen Namen – zum Beispiel «Herr Nörgelstein» oder «die Drama-Diva». Das nimmt ihm die Macht. Wenn er sich das nächste Mal meldet, kannst du sagen: «Ach, du schon wieder, Nörgelstein. Danke, aber ich höre heute auf den Freund.»',
      'Wiederhole diese Übung eine Woche lang. Du wirst merken: Mit der Zeit erkennst du den Kritiker schneller und kannst ihn leiser stellen. Du lernst eine neue Art, mit dir selbst zu sprechen – und das verändert, wie du dich fühlst.',
    ],
    completed: false,
  },

  // ---------------------------------------------------------------------------
  // Activity 4: Selbstmitgefühl-Meditation – Der innere sichere Ort
  // Based on compassion-focused therapy (Paul Gilbert) and guided imagery
  // ---------------------------------------------------------------------------
  {
    id: 'mountain-activity-4',
    islandId: 'mountain' as IslandId,
    type: 'meditation',
    title: 'Selbstmitgefühl-Meditation – Der innere sichere Ort',
    description:
      'Eine geführte Meditation, die dir hilft, einen sicheren Ort in dir zu finden – einen Ort, an dem du genug bist, genau so wie du bist. Kein Druck, keine Vergleiche, nur du.',
    instructions: [
      'Finde eine bequeme Position, sitzend oder liegend. Schließe die Augen, wenn du möchtest. Atme dreimal tief ein und aus – langsam, ruhig, ohne Eile.',
      'Stell dir einen Ort vor, an dem du dich vollkommen sicher und geborgen fühlst. Das kann ein echter Ort sein – dein Zimmer, das Haus deiner Großeltern, ein Platz in der Natur. Oder ein Ort, den du dir ausdenkst: eine warme Höhle im Berg, eine Lichtung im Wald, eine Wolke am Himmel. Egal welcher Ort – er gehört nur dir.',
      'Schau dich an deinem sicheren Ort um. Was siehst du? Was hörst du? Was riechst du? Mach den Ort so lebendig wie möglich. Vielleicht scheint warmes Licht. Vielleicht hörst du leise Musik oder Vogelgezwitscher. Vielleicht riecht es nach frisch gebackenem Brot oder nach Wald nach dem Regen.',
      'Stell dir jetzt vor, dass eine freundliche Stimme zu dir spricht – leise, warm, ohne Erwartungen. Sie sagt: «Du bist in Ordnung, genau so wie du bist. Du musst gerade nichts leisten, nichts beweisen, niemandem gefallen. Du darfst einfach sein.»',
      'Wenn der innere Kritiker sich meldet – und er wird sich melden – dann stell dir vor, dass du ihm höflich die Tür zeigst. «Danke für deinen Besuch, aber das ist mein sicherer Ort. Hier bist du heute nicht eingeladen.» Du musst nicht mit ihm kämpfen. Du kannst ihn einfach gehen lassen.',
      'Bleib so lange an deinem sicheren Ort, wie es sich gut anfühlt. Vielleicht eine Minute, vielleicht fünf, vielleicht zehn. Sage dir leise: «Ich bin genug. Nicht weil ich perfekt bin, sondern weil ich ich bin.» Wenn du bereit bist, öffne langsam die Augen und komm zurück. Dein sicherer Ort bleibt in dir – du kannst jederzeit dorthin zurückkehren.',
    ],
    completed: false,
  },
];

// =============================================================================
// 4. NPCs
// =============================================================================

export const mountainNPCs: never[] = [];
