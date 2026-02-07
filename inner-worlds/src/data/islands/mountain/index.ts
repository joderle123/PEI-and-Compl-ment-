// @ts-nocheck
// =============================================================================
// Berginsel (Mountain Island) – Selbstwert & Identität
// Inner Worlds – Social-Emotional Learning Game
//
// Alle Texte auf Deutsch, warmherzig und auf Augenhöhe für 10–15-Jährige.
// Therapeutisch fundiert: Selbstmitgefühl, kognitive Umstrukturierung,
// Stärkenorientierung, Umgang mit Vergleichen und innerem Kritiker.
// =============================================================================

import type { Scenario, WisdomCard, Activity, IslandId } from '../../../types';

// -----------------------------------------------------------------------------
// Local Types (extensions not yet in the shared type file)
// -----------------------------------------------------------------------------

/** Activity with step-by-step instructions */
interface MountainActivity extends Activity {
  instructions: string[];
}

/** Non-player character living on the island */
interface NPC {
  id: string;
  name: string;
  emoji: string;
  description: string;
  backstory: string;
}

// =============================================================================
// 1. SCENARIOS
// =============================================================================

export const mountainScenarios: Scenario[] = [
  // ---------------------------------------------------------------------------
  // Scenario 1 – Der Vergleichsgipfel
  // Teaching: Sich vergleichen ist natürlich, aber unfair – jeder besteigt
  // einen anderen Berg. Social-Media-Druck, Neid und der eigene Weg.
  // ---------------------------------------------------------------------------
  {
    id: 'mountain-scenario-1',
    islandId: 'mountain' as IslandId,
    title: 'Der Vergleichsgipfel',
    description:
      'Echo, der junge Steinbock, vergleicht sich ständig mit den anderen – wer schneller klettert, wer höher springt. Und dann ist da noch das Handy, auf dem alle ein perfektes Leben zu führen scheinen. Aber stimmt das wirklich?',
    scenes: [
      {
        id: 'm1-s1',
        text: 'Früher Morgen auf der Berginsel. Die Sonne taucht die Gipfel in goldenes Licht. Echo, der junge Steinbock, steht am Fuß einer steilen Felswand und schaut nach oben. Dort klettern andere Steinböcke – mühelos, elegant, schnell. Einer nach dem anderen erreicht den Gipfel.',
        speaker: 'Erzähler',
        speakerEmoji: '🏔️',
        choices: [],
      },
      {
        id: 'm1-s2',
        text: 'Echo setzt seinen Huf auf den ersten Felsen und rutscht sofort ab. «Schon wieder», murmelt er. Er versucht es noch einmal – und rutscht wieder ab. Über ihm springt Fina, die jüngste in der Herde, mühelos über drei Felsen gleichzeitig. «Hey Echo, kommst du?», ruft sie fröhlich. Sie meint es nicht böse. Aber in Echos Ohren klingt es wie: Du bist zu langsam.',
        speaker: 'Echo',
        speakerEmoji: '🪨',
        choices: [],
      },
      {
        id: 'm1-s3',
        text: 'Echo zieht sich zurück und setzt sich auf einen flachen Stein. Er zückt sein Handy – ja, auf der Berginsel gibt es Empfang. Auf TikTok sieht er einen Steinbock aus den Alpen, der über Schluchten springt. 2,3 Millionen Aufrufe. Auf Instagram postet eine Steinbockgruppe Fotos von Gipfeln, die sie «ganz easy» erklommen haben. Perfekte Posen, perfektes Licht, perfekte Leben.',
        speaker: 'Erzähler',
        speakerEmoji: '📱',
        choices: [],
      },
      {
        id: 'm1-s4',
        text: '«Alle sind besser als ich. Alle klettern höher, springen weiter, sehen cooler aus. Und die online erst – die leben in einer komplett anderen Welt. Warum bin ich so … mittelmäßig? Warum kann ich nicht einfach so sein wie die anderen?»',
        speaker: 'Echo',
        speakerEmoji: '🪨',
        choices: [],
      },
      {
        id: 'm1-s5',
        text: 'Du setzt dich neben Echo. Er schaut dich mit großen, traurigen Augen an. «Kennst du das auch?», fragt er leise. «Dieses Gefühl, dass alle anderen irgendwie weiter sind als du? Dass du immer hinterherläufst?» In seinen Worten liegt eine Verletzlichkeit, die zeigt: Er redet nicht nur über Klettern.',
        speaker: 'Echo',
        speakerEmoji: '🪨',
        choices: [
          {
            id: 'm1-s5-c1',
            text: '«Ja, das kenne ich. Manchmal fühle ich mich auch so, als wäre ich die einzige Person, die nicht mitkommt.»',
            consequence:
              'Echo schaut dich überrascht an. «Wirklich? Du auch?» Sein Blick wird weicher. Allein zu wissen, dass jemand anderes dasselbe fühlt, nimmt einen Teil des Gewichts. Sich verletzlich zu zeigen öffnet Türen – zu anderen Menschen, aber auch zu dir selbst. Dieses Gefühl ist menschlich. Nicht ein Zeichen, dass etwas mit dir nicht stimmt.',
            empathyPoints: 3,
            insightPoints: 2,
            couragePoints: 2,
            nextSceneId: 'm1-s6',
          },
          {
            id: 'm1-s5-c2',
            text: '«Aber Echo, du vergleichst deine schwächste Seite mit der stärksten Seite der anderen. Das ist unfair – dir selbst gegenüber.»',
            consequence:
              'Echo blinzelt. «Wie meinst du das?» Du erklärst: «Du siehst, wie Fina klettert – aber du siehst nicht, dass sie Angst vor Wasser hat. Du siehst den TikTok-Steinbock springen – aber nicht die hundert Versuche, die er vorher gebraucht hat.» Echo schweigt lange. Dann sagt er leise: «Du meinst, ich vergleiche meinen Entwurf mit ihrem fertigen Bild?» Genau das. Vergleichen ist wie ein Zerrspiegel – er zeigt immer ein verzerrtes Bild.',
            empathyPoints: 1,
            insightPoints: 4,
            couragePoints: 1,
            nextSceneId: 'm1-s6',
          },
          {
            id: 'm1-s5-c3',
            text: '«Zeig mal dein Handy. Lass uns gemeinsam schauen, was du dir da eigentlich die ganze Zeit anschaust.»',
            consequence:
              'Echo gibt dir zögernd sein Handy. Ihr scrollt zusammen. «Schau mal», sagst du, «dieses Foto hat Filter drauf. Und dieses Video – wer weiß, wie oft der das geübt hat, bis es so perfekt aussah?» Echo runzelt die Stirn. «Stimmt … Das ist ja gar nicht echt. Das ist eine Show.» Social Media zeigt Highlight-Reels, keine echten Leben. Wenn du dein normales Kapitel 3 mit dem inszenierten Kapitel 20 von jemand anderem vergleichst, kannst du nur verlieren.',
            empathyPoints: 1,
            insightPoints: 4,
            couragePoints: 1,
            nextSceneId: 'm1-s6',
          },
        ],
      },
      {
        id: 'm1-s6',
        text: 'Von hoch oben gleitet Summit, die alte Adlerin, herab und landet neben euch. «Ich habe zugehört», sagt sie mit ihrer ruhigen, tiefen Stimme. «Echo, darf ich dir etwas zeigen?» Sie breitet ihre Flügel aus. «Siehst du diesen Knick in meiner linken Schwinge? Ein Sturm hat sie verletzt, als ich jung war. Ich fliege seitdem anders als andere Adler – langsamer, tiefer. Jahrelang habe ich mich dafür geschämt. Bis ich merkte: Mein Flugstil zeigt mir Dinge am Boden, die andere Adler nie sehen.»',
        speaker: 'Summit',
        speakerEmoji: '🦅',
        choices: [
          {
            id: 'm1-s6-c1',
            text: '«Das heißt, deine Schwäche hat sich in eine besondere Stärke verwandelt?»',
            consequence:
              'Summit nickt. «Nicht jede Schwäche wird eine Stärke. Aber jede Schwäche ist ein Teil deiner Geschichte – und deine Geschichte macht dich einzigartig. Echo, du kletterst langsamer, ja. Aber ich habe von oben gesehen, wie du einem jüngeren Steinbock geholfen hast, der Angst vor dem Abhang hatte. Fina ist an ihm vorbeigerannt. Du bist geblieben.» Echo schaut überrascht auf. Das hatte er selbst gar nicht bemerkt. Manchmal sehen andere unsere Stärken deutlicher als wir selbst.',
            empathyPoints: 3,
            insightPoints: 3,
            couragePoints: 1,
            nextSceneId: 'm1-s7',
          },
          {
            id: 'm1-s6-c2',
            text: '«Aber wie hört man auf, sich zu vergleichen? Es passiert doch automatisch.»',
            consequence:
              'Summit lacht leise. «Vergleichen ist menschlich – und tierisch. Das hört nie ganz auf. Aber du kannst lernen, den Vergleich zu bemerken und dann eine Frage zu stellen: Hilft mir dieser Vergleich, besser zu werden? Oder zieht er mich nur runter? Wenn er dich nur runterzieht, dann ist er kein Lehrer – er ist ein Dieb. Er stiehlt dir die Freude an deinem eigenen Weg.» Echo nickt langsam. Vergleiche sind wie Werkzeuge: Sie können bauen oder zerstören. Du entscheidest, wie du sie benutzt.',
            empathyPoints: 1,
            insightPoints: 4,
            couragePoints: 1,
            nextSceneId: 'm1-s7',
          },
          {
            id: 'm1-s6-c3',
            text: '«Echo, vielleicht ist es Zeit, das Handy mal einen Tag wegzulegen und zu schauen, wie sich das anfühlt.»',
            consequence:
              'Echo zögert. «Einen ganzen Tag?» Dann atmet er tief durch. «Okay … Ich versuch es.» Summit nickt anerkennend. «Es geht nicht darum, Social Media für immer aufzugeben. Aber zu merken, wie es dich beeinflusst – das ist der erste Schritt. Manche Vergleiche wählen wir selbst, indem wir scrollen. Und manchmal ist die mutigste Entscheidung, den Bildschirm auszuschalten und ins echte Leben zu schauen.» Echo legt das Handy beiseite. Die Stille fühlt sich erst ungewohnt an – dann seltsam befreiend.',
            empathyPoints: 1,
            insightPoints: 3,
            couragePoints: 3,
            nextSceneId: 'm1-s7',
          },
        ],
      },
      {
        id: 'm1-s7',
        text: 'Echo steht auf, schüttelt sein Fell und schaut die Felswand noch einmal an. «Ich werde es nochmal versuchen», sagt er leise. «Nicht um so schnell zu sein wie Fina. Sondern um zu sehen, wie weit ICH heute komme.» Er setzt den Huf auf den Fels – und diesmal hält er. Ein kleiner Schritt. Aber seiner.',
        speaker: 'Erzähler',
        speakerEmoji: '🏔️',
        choices: [
          {
            id: 'm1-s7-c1',
            text: '«Das ist es, Echo! Nicht der höchste Gipfel zählt – sondern dass du DEINEN Berg besteigst.»',
            consequence:
              'Echo klettert. Langsam, vorsichtig, auf seine Art. Er erreicht nicht den Gipfel – aber er kommt höher als gestern. Und als er sich umdreht, sieht er den Ausblick mit eigenen Augen: Die Berginsel, die Wolken, die Welt unter ihm. Es ist schön. Nicht weil er der Erste oben ist, sondern weil er es auf seine Weise geschafft hat. Dein Weg ist dein Weg. Er muss nicht aussehen wie der von jemand anderem, um wertvoll zu sein.',
            empathyPoints: 2,
            insightPoints: 3,
            couragePoints: 3,
            nextSceneId: null,
          },
          {
            id: 'm1-s7-c2',
            text: '«Und wenn du fällst, stehe ich unten und fange dich auf. Das ist, was Freunde tun.»',
            consequence:
              'Echo lächelt – zum ersten Mal an diesem Tag. «Danke», sagt er. Und dieses Danke wiegt mehr als jeder Gipfel. Er klettert, er rutscht einmal ab, fängt sich, klettert weiter. Du stehst unten und feuerst ihn an. Summit kreist oben und ruft ermutigende Worte herunter. Und in diesem Moment versteht ihr alle etwas: Der Berg ist nicht der Gegner. Der wahre Gegner war der Gedanke, nicht gut genug zu sein. Und den habt ihr heute gemeinsam besiegt.',
            empathyPoints: 4,
            insightPoints: 2,
            couragePoints: 2,
            nextSceneId: null,
          },
          {
            id: 'm1-s7-c3',
            text: '«Warte, ich klettere mit dir. Zusammen ist der Berg weniger steil.»',
            consequence:
              'Ihr klettert nebeneinander. Echo zeigt dir die besten Tritte, du hältst ihn fest, wenn er wackelt. Fina schaut von oben zu und ruft: «Hey, wartet auf mich! Zusammen klettern sieht viel lustiger aus!» Und plötzlich ist es kein Wettbewerb mehr – es ist ein gemeinsames Abenteuer. Die schönsten Gipfel erreicht man nicht allein. Und der Weg dorthin ist mindestens genauso wichtig wie das Ankommen.',
            empathyPoints: 3,
            insightPoints: 2,
            couragePoints: 3,
            nextSceneId: null,
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Scenario 2 – Spiegels Wahrheit
  // Teaching: Identität ist vielschichtig. Wert hängt nicht von Aussehen,
  // Leistung oder Beliebtheit ab. Selbstakzeptanz und Selbstmitgefühl.
  // ---------------------------------------------------------------------------
  {
    id: 'mountain-scenario-2',
    islandId: 'mountain' as IslandId,
    title: 'Spiegels Wahrheit',
    description:
      'Tief in einem Bergsee lebt Spiegel, ein magischer Spiegelgeist. Er zeigt Menschen nicht, wie sie sind – sondern wie sie sein könnten. Bist du bereit, hineinzuschauen?',
    scenes: [
      {
        id: 'm2-s1',
        text: 'Ein schmaler Pfad führt dich tief in eine Bergschlucht. Dort, umgeben von moosbedeckten Felsen, liegt ein stiller See. Das Wasser ist so klar, dass du jeden Stein auf dem Grund sehen kannst. Aber die Oberfläche schimmert silbern, als hätte jemand Mondlicht hineingemischt.',
        speaker: 'Erzähler',
        speakerEmoji: '🏔️',
        choices: [],
      },
      {
        id: 'm2-s2',
        text: 'Eine sanfte Stimme kommt aus dem Wasser. «Willkommen, Wanderer. Ich bin Spiegel. Ich lebe in diesem See, seit die Berge jung waren. Menschen kommen zu mir, um sich selbst zu sehen. Aber ich zeige nicht nur, was ist – ich zeige, was möglich ist. Bist du mutig genug, hineinzuschauen?»',
        speaker: 'Spiegel',
        speakerEmoji: '🪞',
        choices: [],
      },
      {
        id: 'm2-s3',
        text: 'Du beugst dich über das Wasser. Zuerst siehst du dein normales Spiegelbild. Aber dann beginnt es sich zu verändern. Die Oberfläche kräuselt sich, und statt deinem Gesicht siehst du … dich. Aber anders. Älter. Jünger. Lachend. Weinend. In verschiedenen Kleidungen, mit verschiedenen Frisuren. Hundert Versionen von dir, eine nach der anderen.',
        speaker: 'Erzähler',
        speakerEmoji: '🪞',
        choices: [
          {
            id: 'm2-s3-c1',
            text: '«Welche Version bin ich wirklich? Welche ist die echte?»',
            consequence:
              'Spiegel lacht leise. «Alle. Und keine. Du bist nicht eine feste Version, die für immer gleich bleibt. Du bist ein Mensch, der sich verändert, wächst, neue Seiten an sich entdeckt. Die Frage ist nicht, welche Version die echte ist – sondern welche Versionen du kennenlernen möchtest.» Diese Antwort ist verwirrend und tröstend zugleich. Du bist kein fertiges Bild – du bist ein Werk in Arbeit. Und das ist das Schönste daran.',
            empathyPoints: 1,
            insightPoints: 4,
            couragePoints: 1,
            nextSceneId: 'm2-s4',
          },
          {
            id: 'm2-s3-c2',
            text: '«Manche dieser Versionen gefallen mir nicht. Kann ich die loswerden?»',
            consequence:
              'Spiegel wird still. Dann sagt er sanft: «Die Versionen, die dir nicht gefallen – die traurige, die wütende, die unsichere – sie sind ein Teil von dir. Wenn du versuchst, sie wegzustoßen, werden sie lauter. Aber wenn du sie anschaust und sagst: Ich sehe dich, du gehörst auch dazu – dann werden sie leiser.» Du schaust auf die traurige Version im Wasser. Zum ersten Mal nicht mit Ablehnung, sondern mit etwas, das sich anfühlt wie … Mitgefühl.',
            empathyPoints: 3,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: 'm2-s4',
          },
          {
            id: 'm2-s3-c3',
            text: '«Zeig mir die Version, die andere Menschen von mir sehen.»',
            consequence:
              'Das Wasser verändert sich. Du siehst dich durch die Augen deiner besten Freundin: warmherzig, lustig, jemand, der zuhört. Durch die Augen deines Lehrers: fleißig, kreativ, manchmal unterschätzt. Durch die Augen deiner kleinen Schwester: der tollste Mensch der Welt. Tränen steigen dir in die Augen. «Siehst du?», flüstert Spiegel. «Andere sehen so viel Gutes in dir, das du selbst übersiehst. Du bist dein härtester Kritiker – aber du bist auch der Einzige, der alles zusammen sehen kann.»',
            empathyPoints: 2,
            insightPoints: 4,
            couragePoints: 1,
            nextSceneId: 'm2-s4',
          },
        ],
      },
      {
        id: 'm2-s4',
        text: 'Das Wasser beruhigt sich und zeigt nun einen bestimmten Aspekt: dein Aussehen. Du siehst dein Gesicht, deinen Körper, deine Haare – alles, was du morgens im Badezimmerspiegel siehst. Aber hier, im magischen See, scheint alles klarer, ehrlicher. Spiegel fragt: «Was siehst du, wenn du dein Äußeres betrachtest? Was denkst du darüber?»',
        speaker: 'Spiegel',
        speakerEmoji: '🪞',
        choices: [
          {
            id: 'm2-s4-c1',
            text: '«Ich sehe Dinge, die mir nicht gefallen. Meine Nase, meine Haare, mein Körper … Es gibt so viel, das ich ändern würde.»',
            consequence:
              'Spiegel antwortet leise: «Die meisten Menschen fühlen so. Du bist damit nicht allein. Aber lass mich dir etwas zeigen.» Die Oberfläche verändert sich – du siehst Bilder von Schönheitsidealen aus verschiedenen Jahrhunderten. Mal sind runde Körper schön, mal dünne. Mal helle Haut, mal dunkle. «Schönheitsideale ändern sich alle paar Jahre», sagt Spiegel. «Aber du bist nicht für ein Jahrzehnt gemacht – du bist für ein ganzes Leben gemacht. Dein Körper ist nicht dein Feind. Er ist dein Zuhause.»',
            empathyPoints: 2,
            insightPoints: 4,
            couragePoints: 1,
            nextSceneId: 'm2-s5',
          },
          {
            id: 'm2-s4-c2',
            text: '«Ich versuche, nicht zu viel an mein Aussehen zu denken. Aber manchmal fällt es mir schwer.»',
            consequence:
              'Spiegel nickt im Wasser. «Das ist ehrlich. Und es ist normal. Wir leben in einer Welt, die uns ständig sagt, wie wir aussehen sollen. Jedes Plakat, jedes Video, jeder Filter flüstert: Du könntest besser aussehen. Aber hier ist eine Wahrheit, die kein Filter dir zeigen kann: Dein Wert als Mensch hat nichts mit deinem Aussehen zu tun. Gar nichts. Du bist nicht schön, OBWOHL du so aussiehst, wie du aussiehst – sondern weil du du bist.»',
            empathyPoints: 2,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: 'm2-s5',
          },
          {
            id: 'm2-s4-c3',
            text: '«Warum ist es mir überhaupt so wichtig, wie ich aussehe? Eigentlich sollte es egal sein.»',
            consequence:
              'Spiegel schimmert nachdenklich. «Es IST dir wichtig, und das ist okay. Dein Aussehen gehört zu dir, wie deine Stimme oder dein Gang. Aber es definiert dich nicht. Stell dir vor, du wärst ein Buch. Dein Aussehen ist das Cover – es ist das Erste, was Menschen sehen. Aber die Geschichte im Inneren, die Kapitel, die Wendungen – das bist DU. Und die meisten Menschen, die dich wirklich kennen, lieben dich für die Geschichte, nicht für das Cover.»',
            empathyPoints: 1,
            insightPoints: 4,
            couragePoints: 1,
            nextSceneId: 'm2-s5',
          },
        ],
      },
      {
        id: 'm2-s5',
        text: 'Der See zeigt nun einen neuen Aspekt: deine Fähigkeiten. Du siehst Szenen aus deinem Leben – Momente, in denen du etwas gut gemacht hast, und Momente, in denen du gescheitert bist. Spiegel fragt: «Bist du nur so viel wert wie deine Leistungen? Oder ist da mehr?»',
        speaker: 'Spiegel',
        speakerEmoji: '🪞',
        choices: [
          {
            id: 'm2-s5-c1',
            text: '«Manchmal fühlt es sich so an. Wenn ich gute Noten habe, fühle ich mich wertvoll. Wenn nicht, fühle ich mich wertlos.»',
            consequence:
              'Spiegel lässt das Wasser eine Waage zeigen. Auf der einen Seite liegen Noten, Pokale, Likes. Auf der anderen Seite: ein Lächeln, eine Umarmung, ein tröstendes Wort. «Wenn dein Wert von Leistung abhängt», sagt Spiegel, «dann bist du wie ein Aktienkurs – mal oben, mal unten. Aber du bist kein Aktienkurs. Du bist ein Mensch. Und dein Wert steht nicht zur Debatte – er ist einfach da. An guten Tagen und an schlechten.»',
            empathyPoints: 2,
            insightPoints: 4,
            couragePoints: 1,
            nextSceneId: 'm2-s6',
          },
          {
            id: 'm2-s5-c2',
            text: '«Ich weiß, dass ich mehr bin als meine Noten. Aber die Welt behandelt mich oft, als wäre ich nur das.»',
            consequence:
              'Spiegel wird ernst. «Du hast recht. Die Welt misst gern. Noten, Ranglisten, Zahlen. Aber die wichtigsten Dinge im Leben lassen sich nicht messen: Wie es sich anfühlt, wenn jemand dir vertraut. Die Art, wie du deine Katze streichelst. Der Moment, in dem du einen Freund zum Lachen bringst. Diese Dinge stehen in keinem Zeugnis – und sie sind unbezahlbar.» Du schaust ins Wasser und siehst dich lachen. Und dieses Bild ist mehr wert als jede Eins.',
            empathyPoints: 2,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: 'm2-s6',
          },
          {
            id: 'm2-s5-c3',
            text: '«Ich habe Angst, dass ich nichts Besonderes kann. Dass ich in nichts richtig gut bin.»',
            consequence:
              'Spiegel leuchtet warm. «Lass mich dir etwas zeigen.» Im Wasser erscheinen kleine Szenen: Du hörst einer Freundin zu, die weint. Du hilfst deiner Oma mit dem Einkauf. Du tröstest deinen kleinen Bruder nach einem Alptraum. «Siehst du?», sagt Spiegel. «Du denkst, du kannst nichts Besonderes. Aber du kannst etwas, das viele Menschen verlernt haben: Da sein. Zuhören. Sich kümmern. Das ist keine kleine Sache. Das ist eine Superkraft.»',
            empathyPoints: 3,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: 'm2-s6',
          },
        ],
      },
      {
        id: 'm2-s6',
        text: 'Das Wasser wird ganz still. Dein Spiegelbild schaut dich an – klar, ruhig, ohne Filter. Spiegel fragt seine letzte Frage: «Wenn du dich selbst mit den Augen eines Menschen betrachten könntest, der dich bedingungslos liebt – was würdest du sehen?»',
        speaker: 'Spiegel',
        speakerEmoji: '🪞',
        choices: [
          {
            id: 'm2-s6-c1',
            text: '«Jemanden, der es verdient hat, gemocht zu werden. Auch mit all seinen Fehlern.»',
            consequence:
              'Das Wasser leuchtet golden. Spiegel lächelt. «Genau das. Nicht perfekt. Nicht fehlerlos. Aber liebenswert – so, wie du bist. Nicht so, wie du glaubst, sein zu müssen.» Du stehst auf und spürst etwas Neues in deiner Brust. Kein lautes Gefühl – eher wie ein leises Summen. Selbstakzeptanz. Nicht «Ich bin perfekt», sondern «Ich bin genug». Und das ist der mächtigste Satz, den ein Mensch zu sich selbst sagen kann.',
            empathyPoints: 2,
            insightPoints: 4,
            couragePoints: 3,
            nextSceneId: null,
          },
          {
            id: 'm2-s6-c2',
            text: '«Ich weiß es nicht. Ich bin es nicht gewohnt, freundlich über mich selbst zu denken.»',
            consequence:
              'Spiegel wird ganz sanft. «Dann ist heute ein guter Tag, um damit anzufangen. Du musst nicht sofort alles an dir lieben. Fang mit einer Sache an. Nur eine einzige, die du an dir in Ordnung findest.» Du überlegst. Dann sagst du leise: «Ich finde es gut, dass ich hierher gekommen bin. Dass ich mich getraut habe, in den Spiegel zu schauen.» Spiegel leuchtet warm. «Siehst du? Das ist Mut. Und das ist ein guter Anfang.» Selbstmitgefühl ist keine Reise mit einem Ziel – es ist ein Weg, den du jeden Tag ein Stückchen weitergehst.',
            empathyPoints: 2,
            insightPoints: 3,
            couragePoints: 4,
            nextSceneId: null,
          },
          {
            id: 'm2-s6-c3',
            text: '«Jemanden, der noch wächst. Der noch nicht fertig ist. Und das ist okay.»',
            consequence:
              'Das Wasser zeigt dir ein letztes Bild: einen kleinen Setzling, der aus einem Felsspalt wächst. Klein, aber lebendig. Spiegel sagt: «Du bist wie dieser Setzling. Du brauchst weder den größten Stamm noch die meisten Blätter, um wertvoll zu sein. Du wächst. In deinem Tempo. Auf deine Art. Und eines Tages wirst du zurückschauen und staunen, wie weit du gekommen bist.» Du lächelst das Wasser an. Und dein Spiegelbild lächelt zurück – diesmal ohne dass du wegschauen musst.',
            empathyPoints: 2,
            insightPoints: 4,
            couragePoints: 2,
            nextSceneId: null,
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Scenario 3 – Der innere Kritiker
  // Teaching: CBT-basiertes Thought Challenging. Negative Selbstgespräche
  // erkennen, hinterfragen und umformulieren. Der Kritiker als verängstigtes
  // Kind verstehen lernen.
  // ---------------------------------------------------------------------------
  {
    id: 'mountain-scenario-3',
    islandId: 'mountain' as IslandId,
    title: 'Der innere Kritiker',
    description:
      'Tief in den Berghöhlen hallt eine Stimme wider – gemein, laut und überzeugend. Sie sagt dir, dass du nichts kannst und alles falsch machst. Aber wer spricht da eigentlich? Und warum?',
    scenes: [
      {
        id: 'm3-s1',
        text: 'Du betrittst eine Höhle am Fuß des Berges. Es ist kühl und still. Deine Schritte hallen von den Wänden wider. Plötzlich hörst du eine Stimme – leise zuerst, dann lauter. Sie kommt von überall und nirgends gleichzeitig.',
        speaker: 'Erzähler',
        speakerEmoji: '🏔️',
        choices: [],
      },
      {
        id: 'm3-s2',
        text: '«Du schaffst das sowieso nicht. Warum versuchst du es überhaupt? Alle anderen sind besser. Du bist peinlich. Du bist nicht genug. Du wirst es nie sein.» Die Stimme ist kalt, hart und erschreckend überzeugend. Sie klingt, als würde sie die reine Wahrheit sprechen.',
        speaker: 'Innerer Kritiker',
        speakerEmoji: '👤',
        choices: [],
      },
      {
        id: 'm3-s3',
        text: 'Dein Magen zieht sich zusammen. Die Worte treffen wie Steinschlag. Das Schlimmste daran: Die Stimme klingt vertraut. Denn sie klingt wie … du. Es ist dein innerer Kritiker. Jeder Mensch hat einen. Aber bei manchen ist er so laut geworden, dass er die einzige Stimme ist, die sie noch hören.',
        speaker: 'Erzähler',
        speakerEmoji: '🏔️',
        choices: [
          {
            id: 'm3-s3-c1',
            text: 'Der Stimme glauben und am liebsten sofort umkehren.',
            consequence:
              'Du drehst dich um. Aber die Stimme kommt mit. Natürlich – sie lebt ja nicht in der Höhle, sie lebt in deinem Kopf. Weglaufen hilft nicht, denn du nimmst sie überallhin mit. Aber das ist nicht hoffnungslos – es bedeutet nur, dass die Lösung nicht im Weglaufen liegt, sondern im Hinschauen. Die Stimme wird leiser, wenn du sie verstehst, nicht wenn du vor ihr fliehst.',
            empathyPoints: 1,
            insightPoints: 2,
            couragePoints: 0,
            nextSceneId: 'm3-s4',
          },
          {
            id: 'm3-s3-c2',
            text: '«Moment mal. Wer bist du eigentlich? Und warum sollte ich dir glauben?»',
            consequence:
              'Die Stimme stockt kurz. Sie ist es nicht gewohnt, dass jemand sie hinterfragt. «Ich bin die Wahrheit», sagt sie, aber sie klingt schon weniger sicher. Du merkst: Allein die Frage zu stellen verändert etwas. Ein Gedanke ist keine Tatsache. Nur weil dein Kopf etwas sagt, heißt das nicht, dass es stimmt. Das ist der erste Schritt: den Kritiker nicht als Wahrheit akzeptieren, sondern als Stimme – eine von vielen.',
            empathyPoints: 0,
            insightPoints: 4,
            couragePoints: 3,
            nextSceneId: 'm3-s4',
          },
          {
            id: 'm3-s3-c3',
            text: 'Die Augen schließen und auf deinen Atem konzentrieren, statt auf die Stimme.',
            consequence:
              'Du schließt die Augen und spürst deinen Atem. Ein … aus. Ein … aus. Die Stimme redet weiter, aber mit jedem Atemzug wird sie ein kleines Stückchen leiser, wie ein Radio, das man langsam runterdreht. Du lernst etwas Wichtiges: Du bist nicht deine Gedanken. Du bist die Person, die ihnen zuhört. Und du kannst entscheiden, wie viel Raum du ihnen gibst.',
            empathyPoints: 1,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: 'm3-s4',
          },
        ],
      },
      {
        id: 'm3-s4',
        text: 'Echo, der Steinbock, taucht neben dir auf. Er kennt diese Höhle gut. «Ich höre die Stimme auch», sagt er leise. «Jeden Tag. Sie sagt mir, ich bin zu klein, zu langsam, zu wenig. Aber weißt du, was ich gelernt habe? Man kann den Kritiker nicht zum Schweigen bringen. Aber man kann lernen, seine Worte zu überprüfen – wie ein Detektiv.»',
        speaker: 'Echo',
        speakerEmoji: '🪨',
        choices: [
          {
            id: 'm3-s4-c1',
            text: '«Wie meinst du das – überprüfen?»',
            consequence:
              'Echo erklärt: «Der Kritiker sagt: Du schaffst das nie. Dann frage ich: Stimmt das wirklich? Was sind die Beweise dafür? Und was sind die Beweise dagegen? Meistens gibt es viel mehr Gegenbeweise.» Du probierst es aus. Der Kritiker sagt: «Du bist nicht gut genug.» Beweise dafür? Hm. Du hast letzte Woche eine schlechte Note bekommen. Beweise dagegen? Du hast einem Freund bei einer schweren Aufgabe geholfen. Du hast ein tolles Bild gemalt. Deine Oma sagt, du bist das Beste, was ihr passiert ist. Der Kritiker übertreibt – und ein Detektiv sieht das.',
            empathyPoints: 1,
            insightPoints: 4,
            couragePoints: 2,
            nextSceneId: 'm3-s5',
          },
          {
            id: 'm3-s4-c2',
            text: '«Ich versuche, dem Kritiker einen Namen zu geben. Dann fühlt er sich weniger wie ich und mehr wie ein … Besucher.»',
            consequence:
              'Echo lacht. «Das mache ich auch! Ich nenne meinen Kritiker Herrn Felssturz. Wenn er anfängt zu reden, sage ich: Ah, Herr Felssturz, da sind Sie ja wieder. Danke für Ihre Meinung, aber ich höre heute auf eine andere Stimme.» Es klingt fast lustig – und genau das ist der Punkt. Wenn du dem Kritiker einen absurden Namen gibst, nimmt er sich selbst nicht mehr so ernst. Er wird vom Richter zum Zuschauer. Und Zuschauer haben kein Urteilsrecht.',
            empathyPoints: 2,
            insightPoints: 3,
            couragePoints: 3,
            nextSceneId: 'm3-s5',
          },
          {
            id: 'm3-s4-c3',
            text: '«Was würdest du sagen, wenn der Kritiker so mit deinem besten Freund reden würde?»',
            consequence:
              'Echo hält inne. «Wenn jemand so mit meinem besten Freund reden würde, würde ich sagen: Hey, das stimmt nicht! Hör auf damit!» Dann versteht er. «Oh. Du meinst … ich sollte mich selbst auch so verteidigen?» Genau. Selbstmitgefühl bedeutet, dir die gleiche Freundlichkeit zu geben, die du anderen gibst. Wenn du deinem Freund sagen würdest: «Du bist wertvoll», dann darfst du es dir auch selbst sagen. Du verdienst es genauso.',
            empathyPoints: 3,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: 'm3-s5',
          },
        ],
      },
      {
        id: 'm3-s5',
        text: 'Ihr geht tiefer in die Höhle. Die Stimme des Kritikers wird lauter, aber sie verändert sich auch. Je näher ihr kommt, desto weniger klingt sie hart und kalt – und desto mehr klingt sie … ängstlich. Verzerrt. Wie jemand, der schreit, weil er Angst hat. Am Ende eines schmalen Gangs findet ihr die Quelle der Stimme.',
        speaker: 'Erzähler',
        speakerEmoji: '🏔️',
        choices: [],
      },
      {
        id: 'm3-s6',
        text: 'Dort, zusammengekauert in einer Ecke, sitzt ein kleines Kind. Es hat verweinte Augen und zittert. Es IST der innere Kritiker. Aber jetzt, wo du es siehst, erkennst du: Es ist kein Tyrann. Es ist ein kleiner, verängstigter Teil von dir, der versucht, dich zu beschützen – auf die einzige Art, die er kennt. Indem er dich kleinmacht, bevor es jemand anderes tut.',
        speaker: 'Erzähler',
        speakerEmoji: '🏔️',
        choices: [
          {
            id: 'm3-s6-c1',
            text: 'Dich neben das Kind setzen und leise sagen: «Hey. Ich sehe dich. Du musst keine Angst mehr haben.»',
            consequence:
              'Du setzt dich hin. Das Kind schaut dich mit großen Augen an. «Du … du bist nicht böse auf mich?», fragt es. «Ich wollte dich nur beschützen. Ich wollte nicht, dass du verletzt wirst.» Und plötzlich verstehst du alles. Der Kritiker ist nicht dein Feind. Er ist ein Schutzmechanismus, der außer Kontrolle geraten ist. Er meint es nicht böse – er hat nur Angst. Und was Angst braucht, ist nicht Kampf, sondern Mitgefühl. Du legst dem Kind eine Hand auf die Schulter. Die Stimme in der Höhle wird leiser. Nicht still – aber sanfter.',
            empathyPoints: 4,
            insightPoints: 4,
            couragePoints: 3,
            nextSceneId: null,
          },
          {
            id: 'm3-s6-c2',
            text: '«Ich verstehe jetzt, warum du so laut warst. Aber ich brauche eine andere Art von Schutz.»',
            consequence:
              'Das Kind schluchzt. «Aber wenn ich aufhöre, dich zu warnen … was passiert dann? Was, wenn du verletzt wirst?» Du antwortest: «Vielleicht werde ich manchmal verletzt. Das gehört zum Leben. Aber dein Schreien verletzt mich auch – von innen. Ich möchte, dass du bleibst. Aber ich möchte, dass du leiser sprichst. Nicht als Kritiker, sondern als … vorsichtiger Freund.» Das Kind nickt langsam. Ein innerer Kritiker verschwindet nicht. Aber er kann sich verwandeln – vom Richter zum Berater, vom Ankläger zum Beschützer, der endlich gelernt hat, sanft zu sein.',
            empathyPoints: 3,
            insightPoints: 4,
            couragePoints: 3,
            nextSceneId: null,
          },
          {
            id: 'm3-s6-c3',
            text: '«Echo, lass uns dem Kind einen neuen Namen geben. Nicht Kritiker, sondern … Wächter.»',
            consequence:
              'Echo lächelt. «Wächter. Das gefällt mir.» Das Kind schaut auf. «Wächter?», fragt es. «Ja», sagst du. «Weil du auf mich aufpassen willst. Aber ein guter Wächter beschützt, ohne zu verletzen. Du darfst mich warnen – aber bitte nicht mehr anschreien.» Das Kind nickt und wischt sich die Tränen ab. Die Höhle wird heller, als hätte jemand eine Kerze angezündet. Der innere Kritiker ist nicht verschwunden – aber er hat einen neuen Namen und einen neuen Auftrag. Und das verändert alles.',
            empathyPoints: 3,
            insightPoints: 3,
            couragePoints: 4,
            nextSceneId: null,
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Scenario 4 – Kristalls Geheimnis
  // Teaching: Schwierige Erfahrungen formen uns, aber zerstören uns nicht.
  // Resilienz und die Schönheit im Gebrochenen.
  // ---------------------------------------------------------------------------
  {
    id: 'mountain-scenario-4',
    islandId: 'mountain' as IslandId,
    title: 'Kristalls Geheimnis',
    description:
      'Tief im Inneren des Berges liegt eine geheimnisvolle Kristallhöhle. Auf dem Weg dorthin durchquerst du Schichten von Gestein – jede erzählt eine Geschichte. Manche sind dunkel, manche funkeln. Aber alle gehören zum Berg.',
    scenes: [
      {
        id: 'm4-s1',
        text: 'Ein schmaler Eingang führt ins Innere des Berges. Echo hat dir den Weg gezeigt und gesagt: «Ganz unten, wo es am dunkelsten ist, lebt Kristall. Sie ist uralt und wunderschön – aber der Weg zu ihr ist nicht leicht. Du musst durch Schichten von Gestein, die der Berg in Millionen von Jahren gesammelt hat.»',
        speaker: 'Echo',
        speakerEmoji: '🪨',
        choices: [],
      },
      {
        id: 'm4-s2',
        text: 'Du steigst hinab. Die erste Gesteinsschicht ist hell und warm – Sandstein, weich und golden. Echo erklärt: «Das ist die Schicht der Kindheit. Die Zeit, in der alles einfach war. Sorglose Tage, Spielen im Garten, der Geruch von Omas Kuchen.» Du berührst den Stein und spürst eine leise Wärme.',
        speaker: 'Echo',
        speakerEmoji: '🪨',
        choices: [
          {
            id: 'm4-s2-c1',
            text: 'Einen Moment innehalten und dich an eine schöne Kindheitserinnerung erinnern.',
            consequence:
              'Ein Bild taucht auf: Du als kleines Kind, lachend, tanzend im Regen. Oder auf den Schultern deines Vaters. Oder eingeschlafen in einer Decke mit deinem Lieblingskuscheltier. Es tut gut, sich zu erinnern. Diese Schicht ist ein Teil von dir – hell und warm, auch wenn das Leben seitdem komplizierter geworden ist.',
            empathyPoints: 2,
            insightPoints: 2,
            couragePoints: 0,
            nextSceneId: 'm4-s3',
          },
          {
            id: 'm4-s2-c2',
            text: '«Nicht alle Kindheiten sind sorglos. Manche Schichten sind von Anfang an dunkel.»',
            consequence:
              'Echo nickt ernst. «Du hast recht. Nicht jeder hat eine goldene Kindheitsschicht. Manche sind von Anfang an rissig oder dünn. Aber weißt du was? Der Berg steht trotzdem. Auch dünne Schichten tragen etwas. Und manchmal sind es gerade die Menschen mit den schwierigsten Anfängen, die die stärksten Berge bauen.» Deine Geschichte muss nicht perfekt beginnen, um schön zu werden.',
            empathyPoints: 3,
            insightPoints: 3,
            couragePoints: 1,
            nextSceneId: 'm4-s3',
          },
          {
            id: 'm4-s2-c3',
            text: 'Weitergehen. Du willst wissen, was als Nächstes kommt.',
            consequence:
              'Du steigst tiefer. Jede Schicht erzählt weiter. Es gibt die Schicht der ersten Freundschaft – bunt und lebendig. Die Schicht des ersten Umzugs – grau und unsicher. Der Berg ist nicht nur aus einem Stoff gemacht. Er ist ein Mosaik aus allem, was du erlebt hast. Und jede Schicht, auch die unbequeme, hat dich hierhergebracht.',
            empathyPoints: 0,
            insightPoints: 3,
            couragePoints: 1,
            nextSceneId: 'm4-s3',
          },
        ],
      },
      {
        id: 'm4-s3',
        text: 'Tiefer unten wird das Gestein dunkler. Du berührst eine Schicht, die fast schwarz ist – rau, kalt und brüchig. Echo wird leise. «Das sind die schweren Zeiten», flüstert er. «Verlust. Enttäuschung. Momente, in denen die Welt sich angefühlt hat, als würde sie einstürzen. Diese Schichten tun weh, wenn man sie berührt.»',
        speaker: 'Echo',
        speakerEmoji: '🪨',
        choices: [
          {
            id: 'm4-s3-c1',
            text: 'Die dunkle Schicht berühren, auch wenn es wehtut.',
            consequence:
              'Du legst die Hand auf den kalten Stein. Erinnerungen steigen auf – vielleicht ein Streit, ein Abschied, ein Moment der Einsamkeit. Es ist unangenehm. Aber du merkst auch: Du bist immer noch hier. Du hast diese Schicht überlebt. Sie ist ein Teil deines Berges, ja – aber sie ist nicht das Ganze. Und die Tatsache, dass du sie berühren kannst, ohne zu zerbrechen, zeigt eine Stärke, die du vielleicht noch gar nicht kennst.',
            empathyPoints: 2,
            insightPoints: 3,
            couragePoints: 3,
            nextSceneId: 'm4-s4',
          },
          {
            id: 'm4-s3-c2',
            text: '«Warum muss es dunkle Schichten geben? Könnte der Berg nicht ohne sie existieren?»',
            consequence:
              'Echo schüttelt den Kopf. «Ohne Druck gibt es keinen Diamanten. Ohne Dunkelheit gibt es kein Licht. Die dunklen Schichten machen den Berg nicht schwächer – sie machen ihn dichter, fester, tiefer. Das bedeutet nicht, dass Schmerz gut ist. Aber es bedeutet, dass Schmerz nicht sinnlos ist. Er hat dich verändert – und manche dieser Veränderungen haben dich stärker gemacht, als du denkst.»',
            empathyPoints: 1,
            insightPoints: 4,
            couragePoints: 1,
            nextSceneId: 'm4-s4',
          },
          {
            id: 'm4-s3-c3',
            text: '«Manche Schichten möchte ich am liebsten herausreißen. Vergessen, dass sie existieren.»',
            consequence:
              'Echo antwortet sanft: «Das verstehe ich. Aber wenn du eine Schicht herausreißt, wird der Berg instabil. Die dunklen Schichten sind nicht dort, um dich zu quälen – sie sind dort, weil sie passiert sind. Du musst sie nicht mögen. Du musst sie nicht feiern. Aber du kannst sie anerkennen und sagen: Das ist passiert. Und ich bin trotzdem weitergegangen.» Akzeptanz ist nicht dasselbe wie Gutheißen. Es ist die Entscheidung, aufzuhören, gegen die eigene Geschichte zu kämpfen.',
            empathyPoints: 2,
            insightPoints: 4,
            couragePoints: 2,
            nextSceneId: 'm4-s4',
          },
        ],
      },
      {
        id: 'm4-s4',
        text: 'Noch tiefer. Plötzlich beginnt das Gestein zu funkeln. Kleine Kristalle blitzen in der Dunkelheit wie Sterne. Und dann öffnet sich die Höhle – und dort, in der Mitte, steht Kristall. Eine riesige Formation aus purem Diamantgestein, gewachsen über Jahrtausende. Sie leuchtet von innen, in Farben, die du noch nie gesehen hast.',
        speaker: 'Erzähler',
        speakerEmoji: '💎',
        choices: [],
      },
      {
        id: 'm4-s5',
        text: '«Willkommen», sagt Kristall. Ihre Stimme ist tief und warm wie die Erde selbst. «Ich weiß, der Weg hierher war nicht leicht. Er soll es auch nicht sein. Denn nur wer durch die Schichten geht – die hellen und die dunklen – findet mich. Weißt du, wie ich entstanden bin?»',
        speaker: 'Kristall',
        speakerEmoji: '💎',
        choices: [
          {
            id: 'm4-s5-c1',
            text: '«Durch Druck. Enormen Druck über eine sehr lange Zeit.»',
            consequence:
              'Kristall nickt. «Genau. Ich war einmal nichts als Kohlenstoff – grau, unscheinbar, gewöhnlich. Aber Milliarden Jahre lang hat der Berg auf mich gedrückt. Hitze, Druck, Dunkelheit. Und langsam, ganz langsam, hat dieser Druck mich verwandelt. Nicht zerbrochen – verwandelt. Du bist wie ich, weißt du das? Dein Druck sieht anders aus – Schule, Erwartungen, Selbstzweifel. Aber er formt dich. Und was dabei entsteht, ist schöner, als du denkst.»',
            empathyPoints: 1,
            insightPoints: 4,
            couragePoints: 2,
            nextSceneId: 'm4-s6',
          },
          {
            id: 'm4-s5-c2',
            text: '«Aber was, wenn der Druck zu viel wird? Was, wenn er mich zerbricht statt formt?»',
            consequence:
              'Kristall wird leise. «Das ist eine wichtige Frage. Nicht jeder Druck formt – mancher zerstört. Der Unterschied ist: Bist du allein damit, oder hast du Unterstützung? Ein Kristall, der zu schnell unter zu viel Druck gerät, zersplittert. Aber ein Kristall, der langsam wächst, im richtigen Tempo, mit dem richtigen Halt – der wird unzerstörbar.» Ihre Worte sind klar: Hilfe annehmen ist kein Zeichen von Schwäche. Es ist der Unterschied zwischen Zerbrechen und Wachsen.',
            empathyPoints: 2,
            insightPoints: 4,
            couragePoints: 2,
            nextSceneId: 'm4-s6',
          },
          {
            id: 'm4-s5-c3',
            text: '«Du bist wunderschön. Ich wünschte, ich könnte so klar und stark sein wie du.»',
            consequence:
              'Kristall lacht – ein warmes, tiefes Lachen. «Du siehst mein Funkeln und denkst: Wie perfekt. Aber komm näher.» Du trittst heran und siehst: Im Inneren des Kristalls gibt es Risse. Einschlüsse. Trübe Stellen. «Siehst du?», sagt Kristall. «Ich bin nicht perfekt. Kein Kristall ist das. Aber diese Unvollkommenheiten – sie brechen das Licht auf eine Art, die ein perfekter Stein niemals könnte. Deine Risse sind nicht deine Schwäche. Sie sind der Grund, warum du auf eine besondere Weise leuchtest.»',
            empathyPoints: 2,
            insightPoints: 4,
            couragePoints: 2,
            nextSceneId: 'm4-s6',
          },
        ],
      },
      {
        id: 'm4-s6',
        text: 'Kristall löst einen kleinen Splitter von sich selbst und reicht ihn dir. Er liegt in deiner Hand und leuchtet sanft. «Nimm ihn mit», sagt sie. «Er soll dich daran erinnern: Du bist nicht fertig. Du wirst es nie sein. Und das ist das Schönste an dir – du wächst noch.» Echo stupst dich an. «Komm, lass uns zurückgehen. Aber diesmal durch die hellen Schichten.»',
        speaker: 'Kristall',
        speakerEmoji: '💎',
        choices: [
          {
            id: 'm4-s6-c1',
            text: 'Den Kristall an dein Herz drücken und Kristall danken.',
            consequence:
              'Der kleine Kristall ist warm in deiner Hand. Du sagst: «Danke, Kristall. Ich werde mich erinnern: Druck formt, aber er zerstört nicht. Und meine Geschichte – alle Schichten – macht mich zu dem, der ich bin.» Auf dem Rückweg durch die Höhle berührst du jede Schicht, die du passierst. Die hellen und die dunklen. Und zum ersten Mal fühlen sie sich alle an wie … deine.',
            empathyPoints: 2,
            insightPoints: 3,
            couragePoints: 3,
            nextSceneId: null,
          },
          {
            id: 'm4-s6-c2',
            text: '«Ich habe Angst vor den dunklen Schichten, die noch kommen werden.»',
            consequence:
              'Kristall antwortet sanft: «Es werden dunkle Schichten kommen. Das ist sicher. Aber du hast etwas, das ich nicht hatte: Du bist nicht allein. Du hast Echo, Summit, Spiegel. Du hast Menschen, die dich lieben. Und du hast etwas in dir – nenn es Mut, nenn es Durchhaltevermögen, nenn es Hoffnung – das dich durch jede Schicht tragen wird.» Du nimmst den Kristall und gehst. Die Dunkelheit um dich herum fühlt sich weniger bedrohlich an als vorher. Weil du weißt: Auf der anderen Seite wartet immer Licht.',
            empathyPoints: 2,
            insightPoints: 3,
            couragePoints: 3,
            nextSceneId: null,
          },
          {
            id: 'm4-s6-c3',
            text: '«Echo, dein Berg hat auch dunkle Schichten, oder? Erzähl mir von einer.»',
            consequence:
              'Echo schluckt. Dann erzählt er: «Mein Vater hat die Herde verlassen, als ich klein war. Das ist meine dunkelste Schicht. Lange dachte ich, es war meine Schuld – weil ich zu klein war, zu schwach. Aber Kristall hat mir gezeigt: Es war nicht meine Schuld. Es war seine Entscheidung. Und meine dunkle Schicht hat mich zu jemandem gemacht, der andere nie allein lässt.» Ihr schweigt zusammen. Manchmal ist geteilte Dunkelheit der Beginn von Licht.',
            empathyPoints: 4,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: null,
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Scenario 5 – Der Gipfelsturm
  // Teaching: Perfektionismus als Falle erkennen. Der Weg zählt, nicht nur
  // das Ziel. Umkehren ist kein Scheitern.
  // ---------------------------------------------------------------------------
  {
    id: 'mountain-scenario-5',
    islandId: 'mountain' as IslandId,
    title: 'Der Gipfelsturm',
    description:
      'Du willst den höchsten Gipfel der Berginsel erreichen – bei perfektem Wetter, in perfekter Zeit. Aber ein Sturm zieht auf, und plötzlich musst du eine Entscheidung treffen: Weitergehen oder umkehren?',
    scenes: [
      {
        id: 'm5-s1',
        text: 'Seit Wochen planst du die Besteigung des höchsten Gipfels der Berginsel – den Sternenhorngipfel. Du hast alles vorbereitet: die perfekte Route, die perfekte Ausrüstung, den perfekten Tag. Heute morgen schien die Sonne, der Himmel war blau. «Perfekt», hast du gesagt. «Heute wird alles genau so, wie ich es geplant habe.»',
        speaker: 'Erzähler',
        speakerEmoji: '🏔️',
        choices: [],
      },
      {
        id: 'm5-s2',
        text: 'Du bist schon weit gekommen. Über die Hälfte des Weges. Deine Beine brennen, aber du bist stolz. Dann schaust du nach oben – und dein Magen sackt ab. Am Horizont türmen sich dunkle Wolken auf, schneller als du gedacht hast. Wind kommt auf. Die ersten Regentropfen fallen. Das war nicht Teil des Plans.',
        speaker: 'Erzähler',
        speakerEmoji: '🏔️',
        choices: [],
      },
      {
        id: 'm5-s3',
        text: '«Nein! Nicht heute! Ich habe alles perfekt geplant. Der Wetterbericht hat Sonne gesagt! Das kann nicht sein. Ich bin so weit gekommen – ich kann jetzt nicht aufhören. Wenn ich umkehre, war alles umsonst. Ich MUSS den Gipfel erreichen.»',
        speaker: 'Spieler',
        speakerEmoji: '💭',
        choices: [
          {
            id: 'm5-s3-c1',
            text: 'Weitergehen, trotz des Sturms. Du hast es dir vorgenommen, und du ziehst es durch.',
            consequence:
              'Du stapfst weiter, den Kopf gesenkt gegen den Regen. Der Wind wird stärker, der Pfad rutschig. Du bist durchnässt und frierst. Nach zwanzig Minuten kannst du kaum noch sehen, wo du hintrittst. Der Sturm hat gewonnen – nicht weil du schwach bist, sondern weil er stärker ist. Manchmal verwechseln wir Sturheit mit Stärke. Aber es braucht mehr Stärke, die eigenen Grenzen zu erkennen, als blind weiterzumachen.',
            empathyPoints: 0,
            insightPoints: 2,
            couragePoints: 1,
            nextSceneId: 'm5-s4',
          },
          {
            id: 'm5-s3-c2',
            text: 'Kurz innehalten und nachdenken, bevor du entscheidest.',
            consequence:
              'Du bleibst stehen und atmest durch. Der Regen prasselt auf deine Jacke. Du überlegst: Was ist mir wichtiger – der Gipfel heute, oder sicher zurückzukommen und es ein anderes Mal zu versuchen? Der Berg ist morgen noch da. Und übermorgen. Und nächste Woche. Innehalten, wenn alles in dir «Weiter!» schreit, ist eine der schwersten und klügsten Entscheidungen, die du treffen kannst.',
            empathyPoints: 1,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: 'm5-s4',
          },
          {
            id: 'm5-s3-c3',
            text: 'Sofort umkehren. Das Risiko ist zu groß.',
            consequence:
              'Du drehst dich um und gehst zurück. Jeder Schritt bergab fühlt sich an wie eine Niederlage. «Versager», flüstert eine Stimme in deinem Kopf. Aber eine andere, leisere Stimme sagt: «Nein. Das war klug.» Und diese Stimme hat recht. Umkehren ist kein Scheitern. Es ist die Entscheidung, dein Wohlbefinden über deinen Ehrgeiz zu stellen. Und das erfordert mehr Mut, als du denkst.',
            empathyPoints: 0,
            insightPoints: 3,
            couragePoints: 3,
            nextSceneId: 'm5-s4',
          },
        ],
      },
      {
        id: 'm5-s4',
        text: 'Summit taucht aus den Wolken auf, ihr Gefieder nass vom Regen, aber ihre Augen ruhig. «Ich habe dich beobachtet», sagt sie. «Weißt du, wie oft ich den Gipfel verfehlt habe? Hunderte Male. Der Wind war zu stark, die Wolken zu dicht, meine Flügel zu müde. Aber jedes Mal, wenn ich umgekehrt bin, habe ich etwas gesehen, das ich vom Gipfel nie gesehen hätte.»',
        speaker: 'Summit',
        speakerEmoji: '🦅',
        choices: [
          {
            id: 'm5-s4-c1',
            text: '«Was hast du gesehen?»',
            consequence:
              'Summit lächelt. «Den kleinen Wasserfall auf halber Höhe. Die Bergblumen, die nur im Regen aufgehen. Einen Fuchs, der sein Junges tragen lehrte. Die schönsten Dinge passieren auf dem Weg, nicht am Ziel. Wenn du nur auf den Gipfel starrst, verpasst du alles dazwischen.» Du schaust dich um und siehst: Trotz des Regens ist die Welt hier oben wunderschön. Moos leuchtet grün, Tropfen glitzern wie Diamanten auf den Felsen. Das ist auch wertvoll. Auch ohne Gipfel.',
            empathyPoints: 2,
            insightPoints: 4,
            couragePoints: 1,
            nextSceneId: 'm5-s5',
          },
          {
            id: 'm5-s4-c2',
            text: '«Aber ich hatte alles perfekt geplant. Warum hat es trotzdem nicht geklappt?»',
            consequence:
              'Summit schüttelt sanft den Kopf. «Weil Perfektion eine Illusion ist. Du kannst alles richtig machen – und trotzdem kommt ein Sturm. Das Leben lässt sich nicht perfekt planen. Und weißt du was? Das ist nicht das Problem. Das Problem ist, wenn wir glauben, es MÜSSTE perfekt laufen, damit es zählt. Ein unperfekter Tag auf dem Berg ist immer noch ein Tag auf dem Berg. Und das ist mehr, als die meisten Menschen je versuchen.»',
            empathyPoints: 1,
            insightPoints: 4,
            couragePoints: 2,
            nextSceneId: 'm5-s5',
          },
          {
            id: 'm5-s4-c3',
            text: '«Ich habe das Gefühl, dass ich immer alles perfekt machen muss. Sonst zählt es nicht.»',
            consequence:
              'Summit setzt sich neben dich in den Regen. «Ich kenne das Gefühl. Perfektionismus fühlt sich an wie ein hoher Standard – aber in Wahrheit ist er eine Falle. Er sagt dir: Nur 100% zählt. Alles darunter ist Versagen. Aber das stimmt nicht. 70% von etwas Echtem sind mehr wert als 100% von etwas, das nie passiert, weil die Angst vor dem Scheitern dich lähmt. Trau dich, unperfekt zu sein. Darin liegt die wahre Freiheit.»',
            empathyPoints: 2,
            insightPoints: 4,
            couragePoints: 2,
            nextSceneId: 'm5-s5',
          },
        ],
      },
      {
        id: 'm5-s5',
        text: 'Der Regen lässt langsam nach. Die Wolken reißen auf und ein einzelner Sonnenstrahl bricht durch – genau auf die Stelle, wo du stehst. Du bist nicht auf dem Gipfel. Du stehst irgendwo auf halber Höhe, durchnässt, müde und weit von deinem Plan entfernt. Aber der Sonnenstrahl ist warm auf deinem Gesicht.',
        speaker: 'Erzähler',
        speakerEmoji: '🏔️',
        choices: [],
      },
      {
        id: 'm5-s6',
        text: 'Summit breitet ihre Flügel aus. «Was nimmst du heute mit nach Hause?», fragt sie.',
        speaker: 'Summit',
        speakerEmoji: '🦅',
        choices: [
          {
            id: 'm5-s6-c1',
            text: '«Dass der Weg das Abenteuer ist – nicht nur der Gipfel.»',
            consequence:
              'Summit nickt zufrieden. «Genau. Der Gipfel ist ein Punkt auf der Landkarte. Aber der Weg dorthin – die Anstrengung, der Regen, das Innehalten, die Entscheidung – das ist die Geschichte. Und Geschichten sind es, die uns ausmachen, nicht Gipfel.» Du gehst bergab, und obwohl du den höchsten Punkt nicht erreicht hast, fühlst du dich leichter als je zuvor. Vielleicht weil du heute etwas viel Schwereres geschafft hast: Du hast gelernt, gut genug zu sein, ohne perfekt zu sein.',
            empathyPoints: 2,
            insightPoints: 4,
            couragePoints: 2,
            nextSceneId: null,
          },
          {
            id: 'm5-s6-c2',
            text: '«Dass Umkehren kein Versagen ist. Es ist eine Form von Selbstfürsorge.»',
            consequence:
              'Summit strahlt. «Das ist eine Lektion, die manche Menschen ihr ganzes Leben nicht lernen. Sie rennen immer weiter – zum nächsten Ziel, zur nächsten Leistung – und merken nicht, dass sie auf dem Weg sich selbst verlieren. Du hast heute auf dich gehört. Dein Körper, dein Instinkt, deine innere Stimme – die leise, freundliche, nicht der Kritiker – hat gesagt: Es ist genug. Und du hast zugehört.» Du lächelst. Morgen ist der Berg noch da. Und du auch.',
            empathyPoints: 2,
            insightPoints: 3,
            couragePoints: 4,
            nextSceneId: null,
          },
          {
            id: 'm5-s6-c3',
            text: '«Dass ich beim nächsten Mal flexibler sein will. Weniger Plan, mehr Abenteuer.»',
            consequence:
              'Summit lacht und breitet die Flügel aus. «Jetzt klingst du wie ein Adler! Wir planen nie. Wir schauen, wo der Wind uns hinträgt – und finden unterwegs die besten Aufwinde.» Du nimmst dir vor: Nächstes Mal weniger Druck, weniger Perfektionsanspruch. Mehr Offenheit für das, was kommt. Denn die besten Geschichten schreibt das Leben meistens dann, wenn der Plan schiefgeht.',
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
  // Scenario 6 – Das Lied des Berges
  // Teaching: Identität, Werte, Einzigartigkeit. Was macht DICH aus?
  // Alle NPCs kommen zusammen. Krönender Abschluss der Berginsel.
  // ---------------------------------------------------------------------------
  {
    id: 'mountain-scenario-6',
    islandId: 'mountain' as IslandId,
    title: 'Das Lied des Berges',
    description:
      'Summit verrät ein uraltes Geheimnis: Der Berg summt für jedes Geschöpf ein einzigartiges Lied. Es besteht aus deinen Werten, deinen Stärken, deinen Eigenheiten. Dein Lied zu finden ist das größte Abenteuer auf der Berginsel.',
    scenes: [
      {
        id: 'm6-s1',
        text: 'Es ist Abend auf der Berginsel. Die Sonne taucht alles in warmes Orange. Summit hat alle eingeladen – Echo, Spiegel, Kristall und dich – zu einem besonderen Ort: dem Klangfelsen, einem uralten Steinkreis auf einem Plateau, von dem man die ganze Insel überblicken kann.',
        speaker: 'Erzähler',
        speakerEmoji: '🏔️',
        choices: [],
      },
      {
        id: 'm6-s2',
        text: '«Ich habe euch hergebeten, weil es Zeit ist, ein Geheimnis zu teilen», sagt Summit. «Der Berg singt. Nicht laut, nicht mit Worten – aber er summt. Für jedes Geschöpf, das auf ihm lebt, summt er ein eigenes Lied. Dieses Lied ist deine Identität – wer du bist, wenn niemand zuschaut. Was du liebst, was du fürchtest, was dir wichtig ist. Kein Lied gleicht einem anderen. Und es gibt kein falsches Lied.»',
        speaker: 'Summit',
        speakerEmoji: '🦅',
        choices: [],
      },
      {
        id: 'm6-s3',
        text: 'Summit schließt die Augen und beginnt zu erzählen. «Mein Lied klingt wie Wind über hohen Gipfeln. Es singt von Freiheit und Weitsicht – aber auch von der Einsamkeit, die kommt, wenn man über den Wolken lebt. Mein Lied sagt: Ich bin stark, aber ich brauche andere. Ich sehe weit, aber ich übersehe manchmal, was direkt vor mir liegt. Das ist mein Lied. Unvollkommen. Ehrlich. Meins.»',
        speaker: 'Summit',
        speakerEmoji: '🦅',
        choices: [
          {
            id: 'm6-s3-c1',
            text: '«Das ist mutig, Summit. Dein Lied hat auch traurige Töne, und du versteckst sie nicht.»',
            consequence:
              'Summit nickt. «Ein Lied nur aus fröhlichen Tönen wäre langweilig. Die traurigen Töne geben ihm Tiefe. Sie sagen: Ich habe gelebt, ich habe gefühlt, ich bin echt. Wenn du dein Lied findest, wirst du merken: Die Teile, die du am liebsten verstecken würdest, sind oft die schönsten Noten.» Diese Worte bleiben in der Luft hängen wie Musik. Authentizität bedeutet, alle Töne zuzulassen – auch die unbequemen.',
            empathyPoints: 3,
            insightPoints: 3,
            couragePoints: 1,
            nextSceneId: 'm6-s4',
          },
          {
            id: 'm6-s3-c2',
            text: '«Was, wenn ich mein Lied nicht finde? Was, wenn ich nicht weiß, wer ich bin?»',
            consequence:
              'Summit öffnet die Augen und schaut dich warm an. «Dann bist du auf dem besten Weg. Dein Lied zu suchen IST ein Teil deines Liedes. Du bist in einem Alter, in dem sich alles verändert – dein Körper, deine Gedanken, deine Gefühle. Natürlich kennst du dein Lied noch nicht ganz. Aber du hörst schon erste Töne. Und mit der Zeit werden es mehr.» Dich nicht zu kennen ist keine Schwäche – es ist der Anfang der wichtigsten Reise deines Lebens.',
            empathyPoints: 1,
            insightPoints: 4,
            couragePoints: 2,
            nextSceneId: 'm6-s4',
          },
          {
            id: 'm6-s3-c3',
            text: '«Ich möchte die Lieder der anderen hören. Vielleicht hilft mir das, meins zu finden.»',
            consequence:
              'Summit lächelt. «Das ist klug. Manchmal erkennen wir uns selbst in den Geschichten anderer. Nicht weil wir gleich sind – sondern weil ihre Ehrlichkeit uns den Mut gibt, auch ehrlich zu sein.» Sich in anderen wiederfinden, ohne sich mit ihnen zu vergleichen – das ist der Unterschied zwischen Inspiration und Neid. Und heute Abend geht es um Inspiration.',
            empathyPoints: 2,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: 'm6-s4',
          },
        ],
      },
      {
        id: 'm6-s4',
        text: 'Echo tritt vor. Er zittert ein wenig, aber seine Stimme ist fest. «Mein Lied klingt wie Steinschlag und Stille. Es singt davon, immer wieder zu fallen und immer wieder aufzustehen. Es hat viele holprige Stellen, viele Pausen, viele Momente, in denen es fast aufhört. Aber es hört nie ganz auf. Mein Lied sagt: Ich bin nicht der Schnellste und nicht der Stärkste. Aber ich bin derjenige, der nicht aufgibt.»',
        speaker: 'Echo',
        speakerEmoji: '🪨',
        choices: [
          {
            id: 'm6-s4-c1',
            text: '«Echo, dein Lied ist das mutigste von allen. Weil es ehrlich ist.»',
            consequence:
              'Echos Augen werden feucht. «Danke», flüstert er. «Lange dachte ich, mein Lied sei peinlich. Zu langsam, zu holprig. Aber jetzt denke ich: Es ist echt. Und echt ist mehr wert als perfekt.» Die anderen nicken. In diesem Moment versteht ihr alle: Verletzlichkeit ist keine Schwäche. Sie ist der Schlüssel zu echten Verbindungen.',
            empathyPoints: 4,
            insightPoints: 2,
            couragePoints: 2,
            nextSceneId: 'm6-s5',
          },
          {
            id: 'm6-s4-c2',
            text: '«Was mich an deinem Lied beeindruckt: Es hat die Pausen nicht herausgeschnitten.»',
            consequence:
              'Echo lächelt unsicher. «Die Pausen waren die Momente, in denen ich am Boden lag und nicht wusste, ob ich aufstehen kann. Ich habe überlegt, sie wegzulassen. Aber dann wäre das Aufstehen nicht so beeindruckend, oder?» Genau. Es sind die Pausen, die den Wiedereinstieg bedeutsam machen. Ohne Dunkelheit kein Sonnenaufgang. Ohne Fallen kein Aufstehen.',
            empathyPoints: 2,
            insightPoints: 4,
            couragePoints: 1,
            nextSceneId: 'm6-s5',
          },
          {
            id: 'm6-s4-c3',
            text: '«Dein Lied erinnert mich an mein eigenes. Auch ich habe Pausen, in denen ich fast aufhöre.»',
            consequence:
              'Echo schaut dich an, und in seinem Blick liegt Verständnis. «Dann sind wir beide Lieder, die weiterspielen. Auch wenn es manchmal wehtut.» In diesem Moment spürt ihr eine Verbindung, die stärker ist als Worte. Sich in jemandem wiederzufinden – zu wissen, dass man nicht der einzige Mensch ist, der kämpft – das ist eines der heilsamsten Gefühle, die es gibt.',
            empathyPoints: 3,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: 'm6-s5',
          },
        ],
      },
      {
        id: 'm6-s5',
        text: 'Spiegel leuchtet silbern auf der Wasseroberfläche eines kleinen Tümpels im Steinkreis. «Mein Lied», sagt er, «klingt wie hundert Stimmen gleichzeitig. Weil ich die Spiegelungen aller trage, die zu mir kommen. Mein Lied sagt: Ich bin vieles gleichzeitig. Und das ist keine Verwirrung – das ist Reichtum.» Kristall leuchtet tief aus dem Boden herauf. «Mein Lied ist langsam und tief. Es hat Jahrtausende gedauert, bis es fertig war. Und es ist immer noch nicht fertig. Mein Lied sagt: Schönheit braucht Zeit. Geduld ist meine stärkste Note.»',
        speaker: 'Erzähler',
        speakerEmoji: '🏔️',
        choices: [],
      },
      {
        id: 'm6-s6',
        text: 'Alle schauen dich an. Summit sagt sanft: «Und du? Was singt dein Berg für dich? Du musst kein fertiges Lied haben. Vielleicht kennst du nur einen Ton, eine Note, einen Anfang. Das ist mehr als genug.»',
        speaker: 'Summit',
        speakerEmoji: '🦅',
        choices: [
          {
            id: 'm6-s6-c1',
            text: '«Mein Lied ist noch leise. Aber ich glaube, es singt von Suchen und Finden. Von Neugier und dem Mut, Fragen zu stellen.»',
            consequence:
              'Summit breitet die Flügel aus, und der Wind trägt deine Worte über die ganze Berginsel. «Neugier», wiederholt sie. «Eine der mächtigsten Noten, die es gibt. Wer fragt, der wächst. Wer sucht, der findet – nicht immer das, was er erwartet, aber immer etwas Wertvolles.» Du spürst es jetzt: Dein Lied ist nicht laut und nicht fertig. Aber es ist deins. Und das ist genug. Das ist mehr als genug.',
            empathyPoints: 2,
            insightPoints: 4,
            couragePoints: 3,
            nextSceneId: null,
          },
          {
            id: 'm6-s6-c2',
            text: '«Mein Lied singt davon, dass ich für andere da sein will. Dass Mitgefühl meine stärkste Seite ist.»',
            consequence:
              'Echo stupst dich sanft an. «Das ist das schönste Lied, das ich je gehört habe», sagt er. Kristall leuchtet warm. Spiegel zeigt dir dein Spiegelbild – und es lächelt. Summit sagt: «Mitgefühl ist die Melodie, die andere Menschen zum Leuchten bringt. Und Menschen, die andere zum Leuchten bringen, leuchten selbst am hellsten.» In diesem Moment, im goldenen Abendlicht, zwischen Freunden auf einem Berg, fühlst du etwas, das du lange nicht gefühlt hast: Du bist genau richtig, so wie du bist.',
            empathyPoints: 4,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: null,
          },
          {
            id: 'm6-s6-c3',
            text: '«Ich kenne mein Lied noch nicht ganz. Aber ich möchte es weiter suchen. Und ich möchte es nicht allein tun.»',
            consequence:
              'Summit legt einen Flügel um deine Schulter. Echo lehnt sich an dich. Kristall leuchtet sanft, Spiegel reflektiert das warme Abendlicht. «Du bist nicht allein», sagt Summit. «Du warst es nie. Und weißt du was? Das Lied zu suchen IST das Lied. Es klingt nach Aufbruch und Ankommen, nach Zweifeln und Vertrauen, nach Fallen und Aufstehen. Es klingt nach … dir.» Der Berg summt. Leise, warm, einzigartig. Und zum ersten Mal hörst du es ganz deutlich: Dein Lied. Es ist noch nicht fertig. Aber es ist wunderschön.',
            empathyPoints: 3,
            insightPoints: 4,
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
// =============================================================================

export const mountainWisdomCards: WisdomCard[] = [
  {
    id: 'mountain-wisdom-1',
    islandId: 'mountain' as IslandId,
    text: 'Du bist mehr als deine Noten, dein Aussehen oder deine Likes. Dein Wert als Mensch steht nicht zur Debatte – er ist einfach da, an guten Tagen und an schlechten.',
    category: 'insight',
    collected: false,
  },
  {
    id: 'mountain-wisdom-2',
    islandId: 'mountain' as IslandId,
    text: 'Sich mit anderen zu vergleichen ist, als würdest du einen Fisch danach bewerten, ob er klettern kann. Jeder hat seinen eigenen Berg – und seinen eigenen Weg nach oben.',
    category: 'insight',
    collected: false,
  },
  {
    id: 'mountain-wisdom-3',
    islandId: 'mountain' as IslandId,
    text: 'Selbstmitgefühl bedeutet, dir selbst ein guter Freund zu sein – besonders dann, wenn du einen Fehler machst oder dich nicht gut genug fühlst.',
    category: 'strategy',
    collected: false,
  },
  {
    id: 'mountain-wisdom-4',
    islandId: 'mountain' as IslandId,
    text: 'Dein innerer Kritiker ist laut, aber er ist kein Experte. Er verwechselt Angst mit Wahrheit. Du darfst ihn hinterfragen.',
    category: 'insight',
    collected: false,
  },
  {
    id: 'mountain-wisdom-5',
    islandId: 'mountain' as IslandId,
    text: 'Ein Kompliment annehmen ist kein Zeichen von Arroganz – es ist ein Zeichen von Selbstachtung. Du darfst hören, dass du gut bist.',
    category: 'courage',
    collected: false,
  },
  {
    id: 'mountain-wisdom-6',
    islandId: 'mountain' as IslandId,
    text: 'Social Media zeigt Highlight-Reels, keine echten Leben. Vergleiche dein Kapitel 1 nicht mit dem inszenierten Kapitel 20 von jemand anderem.',
    category: 'insight',
    collected: false,
  },
  {
    id: 'mountain-wisdom-7',
    islandId: 'mountain' as IslandId,
    text: 'Fehler machen dich nicht kaputt – sie machen dich menschlich. Und menschlich sein ist keine Schwäche, sondern die ehrlichste Stärke.',
    category: 'emotion',
    collected: false,
  },
  {
    id: 'mountain-wisdom-8',
    islandId: 'mountain' as IslandId,
    text: 'Frag dich: «Würde ich das zu meiner besten Freundin sagen?» Wenn nicht, dann sag es auch nicht zu dir selbst. Du verdienst dieselbe Freundlichkeit.',
    category: 'strategy',
    collected: false,
  },
  {
    id: 'mountain-wisdom-9',
    islandId: 'mountain' as IslandId,
    text: 'Du musst nicht perfekt sein, um wertvoll zu sein. Perfektion ist eine Illusion – du bist echt, und das ist mehr wert als jeder Filter.',
    category: 'emotion',
    collected: false,
  },
  {
    id: 'mountain-wisdom-10',
    islandId: 'mountain' as IslandId,
    text: 'Deine Einzigartigkeit ist keine Schwäche, die du verstecken musst – sie ist der Grund, warum du auf eine besondere Weise leuchtest.',
    category: 'courage',
    collected: false,
  },
  {
    id: 'mountain-wisdom-11',
    islandId: 'mountain' as IslandId,
    text: 'Dankbarkeit ist wie eine Brille: Sie verändert nicht, was da ist – aber sie zeigt dir, was du vorher übersehen hast. Und meistens ist es mehr, als du denkst.',
    category: 'strategy',
    collected: false,
  },
  {
    id: 'mountain-wisdom-12',
    islandId: 'mountain' as IslandId,
    text: 'Sich verletzlich zu zeigen ist einer der mutigsten Schritte, die es gibt. Es bedeutet: Ich bin nicht perfekt, und das ist okay.',
    category: 'courage',
    collected: false,
  },
  {
    id: 'mountain-wisdom-13',
    islandId: 'mountain' as IslandId,
    text: 'Ohne Druck entsteht kein Diamant. Deine schwierigen Zeiten zerstören dich nicht – sie formen etwas in dir, das stärker ist, als du glaubst.',
    category: 'insight',
    collected: false,
  },
  {
    id: 'mountain-wisdom-14',
    islandId: 'mountain' as IslandId,
    text: 'Umkehren ist kein Versagen. Manchmal ist der mutigste Schritt der, bei dem du auf dich selbst hörst und sagst: Es ist genug für heute.',
    category: 'courage',
    collected: false,
  },
  {
    id: 'mountain-wisdom-15',
    islandId: 'mountain' as IslandId,
    text: 'Du bist nicht deine Gedanken. Du bist die Person, die ihnen zuhört – und die entscheiden kann, welchen sie Glauben schenkt und welchen nicht.',
    category: 'strategy',
    collected: false,
  },
  {
    id: 'mountain-wisdom-16',
    islandId: 'mountain' as IslandId,
    text: 'Dein Lied muss nicht fertig sein, um schön zu sein. Es klingt nach Suchen und Finden, nach Zweifeln und Vertrauen – und genau so soll es klingen.',
    category: 'emotion',
    collected: false,
  },
];

// =============================================================================
// 3. ACTIVITIES
// =============================================================================

export const mountainActivities: MountainActivity[] = [
  // ---------------------------------------------------------------------------
  // Activity 1: Brief an mich selbst (Journal)
  // Based on self-compassion writing exercises (Kristin Neff)
  // ---------------------------------------------------------------------------
  {
    id: 'mountain-activity-1',
    islandId: 'mountain' as IslandId,
    type: 'journal',
    title: 'Brief an mich selbst',
    description:
      'Schreibe einen freundlichen Brief an dich selbst – so, wie du ihn an deine beste Freundin oder deinen besten Freund schreiben würdest. Eine Übung in Selbstmitgefühl und Wertschätzung.',
    instructions: [
      'Nimm dir ein Blatt Papier oder öffne dein Journal. Schaff dir einen ruhigen Moment – vielleicht mit Musik, die du magst.',
      'Stell dir vor, du schreibst einer Person, die du sehr gern hast und die gerade einen schwierigen Tag hat. Diese Person bist du selbst.',
      'Beginne den Brief mit «Liebe/r [dein Name],» und schreibe dann mindestens drei Dinge auf, die du an dir magst oder die dich besonders machen. Das können Eigenschaften sein, Talente, oder Dinge, die du für andere tust.',
      'Schreibe einen Absatz darüber, was du in letzter Zeit geschafft hast – auch kleine Dinge zählen. Bist du morgens aufgestanden, obwohl du müde warst? Hast du jemandem geholfen? Hast du etwas Neues ausprobiert?',
      'Beende den Brief mit einem ermutigenden Satz, den du gerade brauchst. Zum Beispiel: «Du bist genug, genau so wie du bist.» oder «Ich bin stolz auf dich, auch wenn heute kein perfekter Tag war.»',
      'Falte den Brief zusammen und leg ihn an einen Ort, wo du ihn wiederfindest. Lies ihn, wenn du einen schlechten Tag hast – du wirst staunen, wie gut es tut, freundliche Worte von dir selbst zu lesen.',
    ],
    completed: false,
  },

  // ---------------------------------------------------------------------------
  // Activity 2: Stärken-Spiegel (Reflection)
  // Based on VIA character strengths approach
  // ---------------------------------------------------------------------------
  {
    id: 'mountain-activity-2',
    islandId: 'mountain' as IslandId,
    type: 'reflection',
    title: 'Stärken-Spiegel',
    description:
      'Entdecke deine persönlichen Stärken – nicht die, die andere von dir erwarten, sondern die, die wirklich zu dir gehören. Manchmal sehen wir unsere eigenen Stärken am schlechtesten.',
    instructions: [
      'Schreibe drei Stärken auf, die du an dir kennst. Das können Dinge sein wie: Humor, Kreativität, Zuhören-Können, Ehrlichkeit, Geduld, Tierliebe – alles zählt.',
      'Frage jetzt zwei Menschen, denen du vertraust (Eltern, Freunde, Geschwister): «Was findest du gut an mir? Was kann ich deiner Meinung nach besonders gut?» Schreibe ihre Antworten auf – wörtlich, ohne sie abzuschwächen.',
      'Vergleiche die beiden Listen. Gibt es Überschneidungen? Gibt es Stärken, die andere an dir sehen, von denen du gar nichts wusstest? Das sind oft die spannendsten Entdeckungen.',
      'Wähle eine Stärke aus, die dich überrascht hat. Schreibe auf, wann du diese Stärke zuletzt eingesetzt hast – vielleicht sogar ohne es zu merken.',
      'Erstelle deine persönliche «Stärken-Karte»: Schreibe deine fünf wichtigsten Stärken auf eine Karte oder zeichne sie als Symbole. Häng sie dort auf, wo du sie jeden Tag siehst.',
      'Erinnere dich: Stärken sind nicht nur Schulnoten und sportliche Leistungen. Freundlich sein, gut zuhören, kreativ denken, mutig Nein sagen – das alles sind echte Superkräfte, die die Welt braucht.',
    ],
    completed: false,
  },

  // ---------------------------------------------------------------------------
  // Activity 3: Kritiker & Coach Dialog (Creative)
  // Based on CBT thought challenging and compassionate mind training
  // ---------------------------------------------------------------------------
  {
    id: 'mountain-activity-3',
    islandId: 'mountain' as IslandId,
    type: 'creative',
    title: 'Kritiker & Coach Dialog',
    description:
      'Lerne, deinen inneren Kritiker zu erkennen – und ihm eine freundlichere Stimme gegenüberzustellen. In dieser kreativen Übung verwandelst du gemeine Selbstgespräche in ermutigende.',
    instructions: [
      'Nimm ein Blatt Papier und teile es in der Mitte in zwei Spalten. Schreibe links «Der Kritiker» und rechts «Der Coach».',
      'Denke an eine Situation, in der du dich schlecht gefühlt hast oder einen Fehler gemacht hast. Schreibe in die linke Spalte, was dein innerer Kritiker gesagt hat – zum Beispiel: «Du bist so peinlich» oder «Das schaffst du nie.»',
      'Jetzt kommt der Coach: Schreibe in die rechte Spalte eine freundlichere, ehrlichere Version desselben Gedankens. Zum Beispiel: «Das war unangenehm, aber es passiert jedem mal» oder «Das war schwierig, aber du kannst daraus lernen.»',
      'Mach das für mindestens drei Kritiker-Sätze. Du wirst merken: Der Coach ist genauso ehrlich wie der Kritiker – aber er hilft dir, statt dich runterzuziehen.',
      'Gib deinem Kritiker einen lustigen Namen (zum Beispiel «Herr Felssturz», «Drama-Diva» oder «Der Nörgelstein»). Das nimmt ihm die Macht. Wenn er sich das nächste Mal meldet, kannst du innerlich sagen: «Ach, du schon wieder!»',
      'Übe in den nächsten Tagen, den Kritiker zu bemerken, wenn er auftaucht. Du musst ihn nicht zum Schweigen bringen – es reicht, ihn zu erkennen und dann bewusst den Coach einzuschalten. Mit der Zeit wird die Coach-Stimme lauter und der Kritiker leiser.',
    ],
    completed: false,
  },

  // ---------------------------------------------------------------------------
  // Activity 4: Diamant-Meditation (Meditation)
  // Guided visualization for self-worth and inner strength
  // ---------------------------------------------------------------------------
  {
    id: 'mountain-activity-4',
    islandId: 'mountain' as IslandId,
    type: 'meditation',
    title: 'Diamant-Meditation',
    description:
      'Eine geführte Meditation, in der du eine Reise ins Innere eines Berges machst und dort deinen inneren Diamanten findest – ein Bild für deinen unveränderlichen Wert, der immer da ist.',
    instructions: [
      'Finde eine bequeme Position, sitzend oder liegend. Schließe die Augen, wenn du möchtest. Atme dreimal tief ein und aus, um anzukommen.',
      'Stell dir vor, du stehst am Eingang einer Höhle. Die Luft ist kühl, aber nicht kalt. Von drinnen kommt ein sanftes Leuchten. Du gehst hinein.',
      'Mit jedem Schritt tiefer in den Berg spürst du, wie der Lärm der Außenwelt leiser wird. Die Stimmen, die dir sagen, was du sein sollst, die Erwartungen, die Vergleiche – alles wird stiller, je tiefer du gehst.',
      'Am Ende des Gangs findest du eine kleine Kammer. In der Mitte liegt ein Diamant, der von innen leuchtet. Er ist nicht perfekt – er hat Einschlüsse, kleine Trübungen, Risse. Aber gerade deshalb bricht er das Licht auf eine einzigartige, wunderschöne Weise.',
      'Dieser Diamant bist du. Dein innerer Kern, dein Wert, der nicht von außen zerstört werden kann. Nicht von schlechten Noten, nicht von Kritik, nicht von Vergleichen. Er ist einfach da. Halte ihn in deinen Händen und spüre seine Wärme.',
      'Sage leise zu dir selbst: «Ich bin genug. Nicht weil ich perfekt bin, sondern weil ich ich bin.» Wenn das sich komisch anfühlt, ist das normal. Sag es trotzdem. Manche Wahrheiten müssen geübt werden, bevor sie sich wahr anfühlen.',
      'Wenn du bereit bist, geh langsam den Weg zurück, aus der Höhle heraus, ins Licht. Der Diamant bleibt in dir – er war immer dort. Du hast ihn nur wiedergefunden. Öffne langsam die Augen.',
    ],
    completed: false,
  },

  // ---------------------------------------------------------------------------
  // Activity 5: Ich-bin Atemübung (Breathing)
  // Affirmation-based breathing for identity and grounding
  // ---------------------------------------------------------------------------
  {
    id: 'mountain-activity-5',
    islandId: 'mountain' as IslandId,
    type: 'breathing',
    title: 'Ich-bin Atemübung',
    description:
      'Eine Atemübung, die dir hilft, dich in dir selbst zu verankern. Mit jedem Atemzug sagst du dir leise, wer du bist – nicht was du leistest, sondern wer du im Kern bist.',
    instructions: [
      'Setz dich bequem hin, die Füße auf dem Boden, die Hände auf den Knien. Schließe die Augen oder schaue auf einen ruhigen Punkt vor dir.',
      'Atme langsam durch die Nase ein (4 Sekunden). Beim Einatmen denke: «Ich bin …» – und wähle ein Wort, das sich richtig anfühlt. Zum Beispiel: mutig, kreativ, freundlich, genug.',
      'Halte den Atem sanft an (2 Sekunden). Spüre das Wort in dir, als würde es in deiner Brust leuchten wie ein kleiner Stern.',
      'Atme langsam durch den Mund aus (6 Sekunden). Beim Ausatmen lass alles los, was nicht zu diesem Wort gehört: Zweifel, Kritik, Vergleiche. Sie fließen mit dem Atem hinaus.',
      'Wiederhole den Zyklus mindestens fünf Mal. Du kannst bei jedem Atemzug dasselbe Wort verwenden oder ein neues wählen. Manche Beispiele: «Ich bin stark.» «Ich bin liebenswert.» «Ich bin auf meinem Weg.» «Ich bin mehr als genug.»',
      'Wenn der innere Kritiker sich meldet und sagt «Das stimmt doch gar nicht», atme ihn sanft aus. Er darf da sein, aber er hat heute nicht das letzte Wort. Du übst eine neue Sprache: die Sprache der Selbstfreundlichkeit. Und wie jede Sprache wird sie mit der Zeit vertrauter.',
    ],
    completed: false,
  },
];

// =============================================================================
// 4. NPCs
// =============================================================================

export const mountainNPCs: NPC[] = [
  {
    id: 'mountain-npc-summit',
    name: 'Summit',
    emoji: '🦅',
    description:
      'Eine majestätische Adlerin, die hoch über den Gipfeln lebt und von dort oben alles aus einer anderen Perspektive sieht. Sie lehrt Weitsicht und erinnert dich daran, dass Probleme von oben betrachtet kleiner aussehen. Aber sie kennt auch die Einsamkeit der Höhe.',
    backstory:
      'Summit war nicht immer so gelassen. Als junger Adler hatte sie Angst vor der Höhe – ausgerechnet sie, geboren auf dem höchsten Gipfel der Berginsel. Die anderen Adler flogen mühelos, während sie am Felsrand saß und sich fragte, was mit ihr nicht stimmte. «Ein Adler, der nicht fliegen will – wie peinlich», dachte sie. Doch eine alte Bergschildkröte sagte ihr eines Tages: «Du vergleichst dein Inneres mit dem Äußeren der anderen. Du siehst ihre Flügel, aber nicht ihre Zweifel.» Dieser Satz veränderte alles. Summit begann, Schritt für Schritt zu fliegen – nicht weil sie keine Angst mehr hatte, sondern weil sie lernte, sich trotz der Angst zu trauen. Heute sitzt sie auf dem Gipfel und kennt die Einsamkeit dort oben: Wer alles überblickt, wird manchmal von niemandem gesehen. Deshalb kommt sie immer wieder herunter – um andere daran zu erinnern: «Du musst nicht der höchste Berg sein, um einen guten Ausblick zu haben. Manchmal reicht ein Hügel – solange du stehst.»',
  },
  {
    id: 'mountain-npc-echo',
    name: 'Echo',
    emoji: '🪨',
    description:
      'Ein junger Steinbock, der in den Höhlen und an den Felswänden der Berginsel lebt. Er fällt ständig beim Klettern, steht aber jedes Mal wieder auf. Er wiederholt nicht nur Geräusche – er wiederholt auch die Gedanken, die du über dich selbst denkst. Und er hilft dir zu erkennen, welche wahr sind und welche nur Echos alter Verletzungen.',
    backstory:
      'Echo wuchs in einer Herde auf, in der alle Steinböcke danach beurteilt wurden, wie hoch sie springen konnten. Und Echo? Er war der Kleinste. Egal wie sehr er sich anstrengte, die anderen sprangen immer höher. «Klein-Echo», nannten sie ihn, manchmal nett gemeint, manchmal nicht. Irgendwann begann er, es selbst zu glauben: «Ich bin zu klein. Ich bin nicht genug.» Dieser Satz wurde sein ständiger Begleiter – ein Echo in seinem Kopf, das nie aufhörte. Erst als er tief in die Berghöhlen ging und dort sein eigenes Echo hörte – laut, klar und stark – verstand er etwas Wichtiges: Die Stimme in seinem Kopf war nicht die Wahrheit. Sie war nur ein Echo von Dingen, die andere gesagt hatten. Und er konnte entscheiden, welche Worte er in Zukunft wiederholen wollte. Jeder Sturz lehrte ihn etwas Neues – nicht nur über das Klettern, sondern über sich selbst. Seitdem hilft Echo anderen, ihre inneren Echos zu erkennen und neue, freundlichere Worte zu finden, die es wert sind, wiederholt zu werden. Sein Lieblingssatz: «Was du dir immer wieder sagst, wird irgendwann zu dem, was du glaubst. Also wähle deine Worte gut.»',
  },
  {
    id: 'mountain-npc-spiegel',
    name: 'Spiegel',
    emoji: '🪞',
    description:
      'Ein magischer Spiegelgeist, der in einem stillen Bergsee lebt. Er zeigt Menschen nicht so, wie sie sind, sondern so, wie sie sein könnten – und manchmal so, wie andere sie sehen. Er lehrt Selbstmitgefühl und die Kunst, sich selbst mit freundlicheren Augen zu betrachten.',
    backstory:
      'Spiegel entstand vor langer Zeit, als der erste Mondstrahl die Oberfläche des Bergsees berührte. Seitdem reflektiert er nicht nur Licht, sondern auch die tiefsten Wahrheiten über die Menschen, die zu ihm kommen. Aber Spiegel trägt eine Bürde: Er sieht in jedem die Schönheit, die sie selbst nicht sehen – und es bricht ihm das Herz, wenn sie wegschauen. «Warum», fragt er sich seit Jahrhunderten, «sind Menschen so viel strenger zu sich selbst als zu anderen? Warum sehen sie die Risse, aber nie das Mosaik?» Spiegel hat gelernt, geduldig zu sein. Er drängt niemanden, hineinzuschauen. Er wartet, bis sie bereit sind. Und wenn sie dann endlich schauen – nicht mit den Augen des Kritikers, sondern mit den Augen des Mitgefühls – dann leuchtet der See in Farben, die nur sie sehen können. Spiegels größte Weisheit: «Du musst dich nicht lieben, um dich freundlich zu behandeln. Fang mit Freundlichkeit an – die Liebe kommt manchmal hinterher.»',
  },
  {
    id: 'mountain-npc-kristall',
    name: 'Kristall',
    emoji: '💎',
    description:
      'Eine uralte Kristallformation tief im Inneren des Berges. Entstanden über Jahrtausende unter enormem Druck. Sie leuchtet von innen und lehrt, dass Druck Schönheit erschaffen kann – und dass der innere Diamant jedes Menschen Zeit braucht, um zu wachsen.',
    backstory:
      'Kristall erinnert sich an alles. An die Millionen Jahre der Dunkelheit, in denen nichts passierte als Druck, Hitze und Warten. Andere Steine um sie herum zerbrachen unter dem Gewicht. Kristall nicht – aber nicht weil sie härter war, sondern weil sie lernte, den Druck nicht als Feind zu sehen, sondern als Former. «Er hat mich nicht zerbrochen», sagt sie. «Er hat mich verwandelt. Aus grauem Kohlenstoff wurde etwas, das Licht bricht.» Kristall weiß, dass nicht jeder Druck gut ist. Manche Lasten sind zu schwer, um sie allein zu tragen. Deshalb erzählt sie auch von den Steinen, die zerbrachen – nicht als Warnung, sondern als Erinnerung, dass Hilfe annehmen kein Zeichen von Schwäche ist. Ihre Oberfläche ist nicht glatt – sie hat Einschlüsse, Trübungen, Risse, die das Licht auf einzigartige Weise brechen. «Meine Unvollkommenheiten sind der Grund, warum ich so leuchte, wie ich leuchte», sagt sie. «Ein perfekter Kristall wäre langweilig. Glaub mir – ich hatte Jahrtausende, um darüber nachzudenken.» Ihre größte Lektion: «Du bist noch nicht fertig. Und das ist keine Schwäche – das ist ein Versprechen.»',
  },
];
