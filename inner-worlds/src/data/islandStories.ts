// @ts-nocheck
import type { IslandStory } from '../types';

// =============================================================================
// Island Story Narratives
// Mystery-driven narrative arcs for all 8 islands.
// All content in German, age-appropriate for 10-15 year olds (CDSE Luxembourg).
// =============================================================================

const islandStories: Record<string, IslandStory> = {
  // ---------------------------------------------------------------------------
  // 1. VOLCANO - Anger Management (Character: Ash)
  // ---------------------------------------------------------------------------
  volcano: {
    islandId: 'volcano',
    mysteryTitle: 'Das Raetsel des ruhelosen Vulkans',
    hook:
      'Der Vulkan bebt staerker als je zuvor, und gluehende Risse breiten sich ueber die ganze Insel aus. ' +
      'Ash, der Rauchgeist, fleht um Hilfe -- doch er scheint selbst Teil des Problems zu sein. ' +
      'Warum wird der Vulkan immer wuetender, obwohl niemand ihn provoziert?',
    chapterIntros: [
      // Chapter 1
      'Als du die Vulkaninsel betrittst, spuerst du sofort die Hitze unter deinen Fuessen. ' +
      'Ueberall zischen kleine Dampffontaenen aus dem Boden, und die Luft flimmert. ' +
      'Ash wartet am Kraterrand und wirkt nervoes -- seine Rauchschleier zittern. ' +
      'Er erzaehlt dir, dass der Vulkan frueher ruhig war, doch seit einiger Zeit brodelt er unkontrolliert. ' +
      'Irgendetwas stimmt hier nicht, und du sollst herausfinden, was.',

      // Chapter 2
      'Die Erschuetterungen werden heftiger, und du entdeckst seltsame Muster in der Lava. ' +
      'Sie formen Bilder -- wuetende Gesichter, geballte Faeuste, zerbrochene Gegenstaende. ' +
      'Ash wird immer unruhiger und gibt zu, dass er manchmal Dinge in sich hineinfrisst, statt darueber zu reden. ' +
      'Koennten seine unterdrueckten Gefuehle etwas mit dem Vulkan zu tun haben? ' +
      'Du beschliesst, tiefer in die Hoehlen unter dem Krater vorzudringen.',

      // Chapter 3
      'Tief im Inneren des Vulkans findest du eine verborgene Kammer, die Herzkammer. ' +
      'Hier pulsiert ein gluehender Kristall im Takt eines Herzschlags -- Ashs Herzschlag. ' +
      'Der Kristall ist von dunklen Rissen durchzogen, und mit jeder unterdrueckten Emotion wird ein neuer Riss sichtbar. ' +
      'Ash versteht jetzt: Der Vulkan ist ein Spiegel seiner inneren Welt. ' +
      'Aber wie kann er lernen, seine Wut herauszulassen, ohne alles zu zerstoeren?',

      // Chapter 4
      'Ash hat begonnen, ueber seine Gefuehle zu sprechen, und die Risse im Kristall heilen langsam. ' +
      'Doch ein letzter, tiefer Riss bleibt -- er stammt von einem alten Schmerz, den Ash nie jemandem erzaehlt hat. ' +
      'Der Vulkan sammelt seine ganze Kraft fuer einen letzten gewaltigen Ausbruch. ' +
      'Jetzt liegt es an dir und Ash: Koennt ihr den Vulkan beruhigen, bevor es zu spaet ist? ' +
      'Die Loesung liegt nicht darin, die Wut zu unterdruecken, sondern sie zu verstehen.',
    ],
    clues: [
      {
        id: 'volcano-clue-1',
        text: 'Die Lava formt Bilder von Situationen, in denen Ash wuetend war, es aber nie gezeigt hat. Je laenger er schweigt, desto heisser wird die Lava.',
        chapter: 1,
      },
      {
        id: 'volcano-clue-2',
        text: 'In einer Hoehle findest du Ashs geheimes Tagebuch. Darin steht: "Ich darf nicht wuetend sein. Wut ist schlecht." Aber stimmt das wirklich?',
        chapter: 2,
      },
      {
        id: 'volcano-clue-3',
        text: 'Der gluehende Kristall reagiert auf Worte. Wenn Ash ehrlich sagt, was ihn wuetend macht, leuchtet der Kristall ruhig und warm. Wenn er luegt oder schweigt, bebt die Erde.',
        chapter: 3,
      },
      {
        id: 'volcano-clue-4',
        text: 'Eine alte Inschrift an der Kraterwand lautet: "Feuer zerstoert nur, wenn es eingesperrt wird. Lass es frei, und es waermt die Welt." Die Wut ist nicht der Feind -- das Schweigen ist es.',
        chapter: 4,
      },
    ],
    revelation:
      'Der Vulkan war nie das Problem -- er war Ashs Hilferuf. Jedes Mal, wenn Ash seine Wut verschluckt hat, ' +
      'hat der Vulkan sie fuer ihn herausgeschrien. Jetzt, wo Ash gelernt hat, seine Gefuehle auszusprechen -- ' +
      'ruhig, ehrlich und ohne Angst -- fliesst die Lava sanft und waermt die Insel, statt sie zu zerstoeren. ' +
      'Wut ist keine Schwaeche. Sie ist ein Signal, dass etwas Wichtiges passiert. ' +
      'Und wer lernt, auf dieses Signal zu hoeren, kann seine innere Kraft fuer Gutes nutzen.',
  },

  // ---------------------------------------------------------------------------
  // 2. OCEAN - Grief / Loss
  // ---------------------------------------------------------------------------
  ocean: {
    islandId: 'ocean',
    mysteryTitle: 'Die versunkenen Lichter',
    hook:
      'Unter der Meeresoberflaeche leuchten seltsame Lichter, die langsam verblassen. ' +
      'Die Bewohner der Ozeaninsel fluestern von verlorenen Erinnerungen, die im Wasser gefangen sind. ' +
      'Warum weint das Meer, und wem gehoeren diese Lichter?',
    chapterIntros: [
      // Chapter 1
      'Die Ozeaninsel empfaengt dich mit sanften Wellen und salziger Luft. ' +
      'Doch etwas ist anders -- das Wasser schimmert in traurigen Blautoenen, und Coral, die Muschelsammlerin, ' +
      'zeigt dir eine Muschel, die leise weint. Sie erzaehlt, dass die Lichter unter Wasser frueher hell strahlten, ' +
      'doch seit kurzem erlischen sie eines nach dem anderen. ' +
      'Jedes Licht, so sagt man, ist eine Erinnerung an jemanden oder etwas, das verloren gegangen ist.',

      // Chapter 2
      'Du tauchst zum ersten Mal unter die Oberflaeche und entdeckst eine versunkene Stadt aus Korallen. ' +
      'In jeder Koralle steckt ein kleines Licht -- eine Erinnerung. Manche leuchten hell, andere flackern schwach. ' +
      'Tide, der Wellenreiter, erklaert: "Die Lichter erloeschen, weil die Leute ihre Trauer verdraengen. ' +
      'Erinnerungen brauchen Aufmerksamkeit, sonst verschwinden sie." ' +
      'Du findest ein Licht, das gerade zu erloeschen droht, und versuchst, es zu retten.',

      // Chapter 3
      'In der Tiefe des Ozeans entdeckst du die Traenenkammer -- einen Ort, an dem alle unterdrueckten ' +
      'Traenen des Meeres zusammenfliessen. Pearl, die Tiefseelotsin, wartet dort auf dich. ' +
      'Sie erklaert, dass Trauer nicht verschwindet, nur weil man sie ignoriert -- sie sinkt tiefer und tiefer. ' +
      'Die Traenenkammer droht ueberzulaufen und die ganze Insel zu ueberfluten. ' +
      'Doch du lernst: Wer trauern darf, dessen Traenen verwandeln sich in Perlen der Erinnerung.',

      // Chapter 4
      'Die Flut steigt, und das Meer tobt. Drift, der Meeressaenger, stimmt ein Lied an -- ' +
      'ein Lied des Abschieds und der Dankbarkeit zugleich. ' +
      'Du verstehst: Es geht nicht darum, den Schmerz loszuwerden, sondern ihn anzunehmen. ' +
      'Gemeinsam mit allen Bewohnern der Insel singst du fuer die verlorenen Lichter. ' +
      'Eines nach dem anderen beginnen sie wieder zu leuchten -- heller als je zuvor.',
    ],
    clues: [
      {
        id: 'ocean-clue-1',
        text: 'Die weinende Muschel gehoert einem Kind, das seinen besten Freund verloren hat. Sie hoert erst auf zu weinen, wenn jemand ihre Geschichte anhoert.',
        chapter: 1,
      },
      {
        id: 'ocean-clue-2',
        text: 'In der versunkenen Korallenstadt findest du eine Botschaft: "Vergessen schuetzt nicht vor Schmerz -- es macht ihn nur einsam." Die Lichter brauchen Zuwendung, nicht Stille.',
        chapter: 2,
      },
      {
        id: 'ocean-clue-3',
        text: 'Die Traenenkammer hat einen Abfluss, der verschlossen ist. Er oeffnet sich nur, wenn jemand ehrlich sagt: "Ich bin traurig, und das ist in Ordnung."',
        chapter: 3,
      },
      {
        id: 'ocean-clue-4',
        text: 'Drifts Lied enthaelt den Schluessel: "Was wir verlieren, tragen wir im Herzen weiter. Wer sich erinnert, laesst das Licht nie ganz erloeschen."',
        chapter: 4,
      },
    ],
    revelation:
      'Die versunkenen Lichter waren nie wirklich verloren -- sie warteten darauf, dass jemand sich an sie erinnert. ' +
      'Trauer ist wie das Meer: Sie kommt in Wellen, mal stark, mal sanft. Und das ist voellig in Ordnung. ' +
      'Wer seine Trauer zulaesst, statt sie zu verdraengen, verwandelt Schmerz in kostbare Erinnerungen. ' +
      'Die Lichter unter dem Meer leuchten jetzt staerker denn je -- denn jemand hat ihnen zugehoert.',
  },

  // ---------------------------------------------------------------------------
  // 3. FOREST - Fear / Courage
  // ---------------------------------------------------------------------------
  forest: {
    islandId: 'forest',
    mysteryTitle: 'Die wachsende Dunkelheit',
    hook:
      'Der Wald wird von Tag zu Tag dunkler, obwohl die Sonne scheint. ' +
      'Schatten bewegen sich zwischen den Baeumen, und die Tiere verstecken sich. ' +
      'Was naehrt diese Dunkelheit -- und warum hat sie ausgerechnet jetzt begonnen?',
    chapterIntros: [
      // Chapter 1
      'Beim Betreten des Waldes faellt dir sofort auf, wie still es ist. ' +
      'Kein Vogelgesang, kein Rascheln -- nur eine drueckende Stille. ' +
      'Moss, der Waldhueter, erklaert dir, dass der Wald frueher vor Leben sprühte. ' +
      'Doch dann kamen die Schatten, und mit ihnen die Angst. ' +
      'Die Baeume selbst scheinen zu zittern, als wuerden sie etwas fuerchten.',

      // Chapter 2
      'Du wagst dich tiefer in den Wald und entdeckst, dass die Schatten nicht zufaellig sind. ' +
      'Sie nehmen Formen an -- Monster, die wie uebergrosse Versionen alltaeglicher Aengste aussehen: ' +
      'eine riesige Spinne aus "Angst vor Ablehnung", ein dunkler Riese aus "Angst zu versagen". ' +
      'Fern, die Kletterranke, verraet dir ein Geheimnis: "Die Schatten werden groesser, je mehr du vor ihnen weglaeuft. ' +
      'Aber wenn du sie direkt anschaust, schrumpfen sie."',

      // Chapter 3
      'Im Herzen des Waldes findest du den Angstbaum -- einen uralten Baum, dessen Wurzeln ' +
      'sich von den Aengsten aller Waldbewohner ernaehren. Je mehr Angst sie haben, desto staerker waechst er, ' +
      'und desto dunkler wird der Wald. Owl, die Nachteule, erklaert: ' +
      '"Angst ist nicht dein Feind. Sie will dich beschuetzen. Aber wenn du ihr zu viel Macht gibst, ' +
      'uebernimmt sie die Kontrolle." Du musst lernen, zwischen echter Gefahr und falscher Angst zu unterscheiden.',

      // Chapter 4
      'Der Angstbaum hat fast das gesamte Licht verschluckt, und der Wald steht kurz davor, ' +
      'fuer immer in Dunkelheit zu versinken. Fox, der schlaue Fuchs, hat einen Plan: ' +
      '"Mut bedeutet nicht, keine Angst zu haben. Es bedeutet, trotz der Angst einen Schritt nach vorne zu machen." ' +
      'Gemeinsam mit allen Waldbewohnern stellst du dich den Schatten -- nicht um sie zu bekaempfen, ' +
      'sondern um sie zu verstehen und ihnen ihre Macht zu nehmen.',
    ],
    clues: [
      {
        id: 'forest-clue-1',
        text: 'Die Stille im Wald ist nicht natuerlich -- sie entsteht, weil alle zu viel Angst haben, um einen Laut von sich zu geben. Doch das Schweigen macht alles nur schlimmer.',
        chapter: 1,
      },
      {
        id: 'forest-clue-2',
        text: 'Ein Schattenmonster loest sich auf, als du es beim Namen nennst. "Angst vor dem Auslachen" wird zu einem kleinen, harmlosen Wesen, sobald du sagst: "Ich kenne dich."',
        chapter: 2,
      },
      {
        id: 'forest-clue-3',
        text: 'Der Angstbaum hat eine Schwachstelle: An seinem Stamm waechst ein kleiner Leuchtpilz. Er ernaehrt sich von Mut und waechst jedes Mal, wenn jemand etwas Mutiges tut.',
        chapter: 3,
      },
      {
        id: 'forest-clue-4',
        text: 'Fox hat auf einem Stein eine Botschaft hinterlassen: "Jeder mutige Schritt beginnt mit zitternden Knien. Das Zittern beweist, dass du lebst -- und dass dir etwas wichtig ist."',
        chapter: 4,
      },
    ],
    revelation:
      'Die Dunkelheit im Wald war ein Spiegel der Angst seiner Bewohner. Je mehr sie sich versteckten, ' +
      'desto staerker wurden die Schatten. Doch Mut hat den Wald gerettet -- nicht der Mut eines Helden ohne Furcht, ' +
      'sondern der Mut ganz normaler Wesen, die trotz ihrer Angst einen Schritt nach vorne gemacht haben. ' +
      'Der Angstbaum ist nicht verschwunden, aber er ist jetzt klein und harmlos. ' +
      'Und ueberall im Wald leuchten die Mutpilze -- als Erinnerung daran, dass Licht staerker ist als jede Dunkelheit.',
  },

  // ---------------------------------------------------------------------------
  // 4. MOUNTAIN - Self-worth / Identity
  // ---------------------------------------------------------------------------
  mountain: {
    islandId: 'mountain',
    mysteryTitle: 'Die Echos der falschen Stimmen',
    hook:
      'Auf dem Berg hoerst du Echos, die Dinge wiederholen, die niemand gesagt hat -- ' +
      'gemeine Worte ueber dich selbst, die sich anfuehlen wie die Wahrheit. ' +
      'Woher kommen diese Stimmen, und warum werden sie immer lauter?',
    chapterIntros: [
      // Chapter 1
      'Der Aufstieg auf die Berginsel beginnt mit einem schmalen Pfad, der sich nach oben windet. ' +
      'Schon nach wenigen Schritten hoerst du es: ein Echo, das fluesternd sagt "Du schaffst das nie." ' +
      'Flint, der Steinmetz, erklaert dir, dass die Echos frueher ermutigende Worte wiederholten. ' +
      'Doch irgendetwas hat sie verdreht, und jetzt wiederholen sie nur noch negative Gedanken. ' +
      'Je hoeher du steigst, desto lauter werden die Stimmen.',

      // Chapter 2
      'Du erreichst die Echokammer -- eine natuerliche Hoehle, in der jeder Gedanke tausendfach widerhallt. ' +
      'Summit, die Gipfelstreberin, zeigt dir etwas Erschreckendes: An den Waenden sind Saetze eingeritzt, ' +
      'die Bewohner des Berges ueber sich selbst gesagt haben. "Ich bin nicht gut genug." "Alle sind besser als ich." ' +
      'Diese Saetze haben sich so tief eingegraben, dass der Berg sie staendig wiederholt. ' +
      'Du fragst dich: Was, wenn die Echos nicht die Wahrheit sagen?',

      // Chapter 3
      'Echo, das Bergecho selbst, fuehrt dich zum Spiegel des Gipfels -- einer glatten Felswand, ' +
      'die nicht dein Spiegelbild zeigt, sondern deine innere Stimme sichtbar macht. ' +
      'Die meisten sehen dort eine verzerrte, haessliche Version von sich selbst -- nicht die Realitaet, ' +
      'sondern das Bild, das ihre negativen Gedanken gemalt haben. ' +
      'Echo sagt: "Der Spiegel zeigt nur, was du glaubst. Aendere deine Worte, und er aendert sein Bild."',

      // Chapter 4
      'Die Echos haben ihren Hoehepunkt erreicht und bruellen von allen Bergwaenden. ' +
      'Crystal, der Kristallsucher, hat eine Entdeckung gemacht: Tief im Berg gibt es einen Resonanzkristall, ' +
      'der jede Stimme verstaerkt. Bisher hat er nur die negativen Stimmen verstaerkt, weil niemand ' +
      'laut genug Gutes ueber sich gesagt hat. Jetzt musst du deine wahre Stimme finden -- ' +
      'nicht arrogant, aber ehrlich und freundlich zu dir selbst.',
    ],
    clues: [
      {
        id: 'mountain-clue-1',
        text: 'Die Echos werden leiser, wenn du ihnen widersprichst. Ein einfaches "Das stimmt nicht" reicht schon, um sie fuer einen Moment zum Schweigen zu bringen.',
        chapter: 1,
      },
      {
        id: 'mountain-clue-2',
        text: 'Die eingeritzten Saetze in der Echokammer lassen sich ueberschreiben -- aber nur mit Saetzen, die ehrlich und freundlich sind. Luegen funktionieren nicht; der Berg erkennt sie sofort.',
        chapter: 2,
      },
      {
        id: 'mountain-clue-3',
        text: 'Der Spiegel des Gipfels veraendert sich, wenn du sagst, was du an dir magst. Nicht perfekt sein muessen, sondern das sehen, was wirklich da ist -- das ist der Schluessel.',
        chapter: 3,
      },
      {
        id: 'mountain-clue-4',
        text: 'Der Resonanzkristall vibriert am staerksten bei der Wahrheit. Sage: "Ich bin nicht perfekt, und das ist okay. Ich bin wertvoll, so wie ich bin." Der ganze Berg erbebt -- diesmal vor Freude.',
        chapter: 4,
      },
    ],
    revelation:
      'Die Echos auf dem Berg waren nie die Stimmen anderer -- es waren deine eigenen negativen Gedanken, ' +
      'die sich so oft wiederholt haben, dass sie sich wie die Wahrheit anfuehlten. ' +
      'Doch jetzt klingt der Berg anders. Der Resonanzkristall verstaerkt freundliche, ehrliche Worte, ' +
      'und die Echokammer hallt wider von Saetzen wie "Ich bin genug" und "Mein Wert haengt nicht von meinen Noten ab." ' +
      'Du hast gelernt: Die wichtigste Stimme in deinem Leben ist deine eigene. Achte darauf, dass sie freundlich zu dir ist.',
  },

  // ---------------------------------------------------------------------------
  // 5. GARDEN - Relationships / Empathy
  // ---------------------------------------------------------------------------
  garden: {
    islandId: 'garden',
    mysteryTitle: 'Der Garten der welkenden Blumen',
    hook:
      'Im Garten welken die Blumen, obwohl es genug Regen und Sonne gibt. ' +
      'Die Farben verschwinden, und die Bienen finden keinen Nektar mehr. ' +
      'Was fehlt den Blumen -- und warum koennen die Gaertner es nicht sehen?',
    chapterIntros: [
      // Chapter 1
      'Der Garten war einmal der schoenste Ort der ganzen Inselwelt -- voller leuchtender Farben ' +
      'und suessem Duft. Doch als du ankommst, sind die Blaetter grau und die Blueten geschlossen. ' +
      'Bloom, die Gaertnerin, ist verzweifelt. Sie hat alles versucht: mehr Wasser, mehr Duenger, mehr Licht. ' +
      'Aber nichts hilft. "Es ist, als haetten die Blumen aufgehoert, leben zu wollen", sagt sie leise. ' +
      'Vielleicht liegt das Problem nicht bei den Blumen, sondern bei den Beziehungen zwischen ihnen.',

      // Chapter 2
      'Du entdeckst, dass jede Blume im Garten fuer eine Beziehung steht -- Freundschaft, Familie, Klassenkameraden. ' +
      'Die welkenden Blumen gehoeren zu Beziehungen, in denen etwas schiefgelaufen ist: ' +
      'ein unausgesprochener Streit, ein gebrochenes Versprechen, ein Missverstaendnis. ' +
      'Thorn, der Dornenritter, zeigt dir seine Dornen und sagt: ' +
      '"Manchmal verletzen wir andere, ohne es zu wollen. Und manchmal schuetzen wir uns so sehr, ' +
      'dass niemand mehr an uns herankommt."',

      // Chapter 3
      'Honey, die fleissige Biene, fuehrt dich zum Herzstück des Gartens: dem Empathie-Brunnen. ' +
      'Sein Wasser ist fast versiegt. "Empathie ist wie Wasser fuer Beziehungen", erklaert Honey. ' +
      '"Ohne sie trocknet alles aus." Der Brunnen fuellt sich nur, wenn jemand ' +
      'wirklich versucht, die Welt durch die Augen eines anderen zu sehen. ' +
      'Du lernst zuhoeren -- nicht um zu antworten, sondern um zu verstehen.',

      // Chapter 4
      'Root, der Wurzelweise, zeigt dir, dass unter der Erde alle Blumen miteinander verbunden sind. ' +
      'Ihre Wurzeln bilden ein riesiges Netzwerk. Wenn eine Blume leidet, spueren es alle. ' +
      'Aber auch umgekehrt: Wenn du eine einzige Beziehung heilst, staerkst du den ganzen Garten. ' +
      'Es ist Zeit, den Mut zu finden, "Es tut mir leid" zu sagen, Missverstaendnisse aufzuklaeren ' +
      'und echtes Interesse am anderen zu zeigen.',
    ],
    clues: [
      {
        id: 'garden-clue-1',
        text: 'Eine verwelkte Rose erblueht wieder, als zwei Gaertner miteinander reden, die sich vorher ignoriert haben. Das Geheimnis ist nicht Sonnenschein -- es ist Verbindung.',
        chapter: 1,
      },
      {
        id: 'garden-clue-2',
        text: 'Thorns Dornen werden weicher, wenn er jemandem vertraut. Er gibt dir einen Dorn und sagt: "Haerte schuetzt, aber sie macht auch einsam. Manchmal muss man seine Mauern senken."',
        chapter: 2,
      },
      {
        id: 'garden-clue-3',
        text: 'Der Empathie-Brunnen reagiert auf echte Gefuehle. Gespielte Freundlichkeit funktioniert nicht. Erst wenn du wirklich fuehlst, was der andere fuehlt, steigt das Wasser.',
        chapter: 3,
      },
      {
        id: 'garden-clue-4',
        text: 'Roots Wurzelnetzwerk zeigt: Keine Blume kann allein ueberleben. Die staerksten Pflanzen sind die, die andere stuetzen und sich stuetzen lassen.',
        chapter: 4,
      },
    ],
    revelation:
      'Die Blumen welkten nicht wegen fehlender Naehrstoffe -- ihnen fehlte Empathie. ' +
      'Jede Blume brauchte jemanden, der wirklich zuhoert, der versteht, und der ehrlich ist. ' +
      'Jetzt, wo die Gaertner gelernt haben, einander zuzuhoeren und fuereinander da zu sein, ' +
      'blueht der Garten in Farben, die es vorher nicht gab. ' +
      'Beziehungen sind wie Gaerten: Sie brauchen Pflege, Geduld und vor allem -- das ehrliche Bemuehen, ' +
      'die Welt durch die Augen des anderen zu sehen.',
  },

  // ---------------------------------------------------------------------------
  // 6. NIGHT - Mindfulness / Digital Balance
  // ---------------------------------------------------------------------------
  night: {
    islandId: 'night',
    mysteryTitle: 'Die erlöschenden Sterne',
    hook:
      'Am Nachthimmel gehen die Sterne aus -- einer nach dem anderen, wie Kerzen im Wind. ' +
      'Eine seltsame blaue Strahlung vom Boden scheint sie zu ueberstrahlen. ' +
      'Was stiehlt den Sternen ihr Licht, und warum merkt es fast niemand?',
    chapterIntros: [
      // Chapter 1
      'Die Nachtinsel war einmal berühmt fuer ihren atemberaubenden Sternenhimmel. ' +
      'Doch als du ankommst, siehst du nur noch ein paar schwache Lichtpunkte. ' +
      'Luna, die Mondwaechtering, zeigt dir den Grund: Ueberall auf der Insel leuchten helle Bildschirme. ' +
      'Die Bewohner starren auf ihre Geraete und bemerken nicht, wie dunkel der Himmel geworden ist. ' +
      '"Sie haben verlernt, nach oben zu schauen", seufzt Luna.',

      // Chapter 2
      'Pixel, der Bildschirmgeist, gesteht dir sein Geheimnis: Er wurde erschaffen, um die Bewohner ' +
      'zu unterhalten, aber seine Unterhaltung macht suechtig. "Jeder Klick, jedes Like, ' +
      'jede Benachrichtigung -- sie geben ein kurzes Gluecksgefuehl, aber danach fuehlt man sich leerer als vorher." ' +
      'Du entdeckst, dass die blaue Strahlung der Bildschirme tatsaechlich das Sternenlicht absorbiert. ' +
      'Je mehr die Bewohner scrollen, desto dunkler wird der Himmel.',

      // Chapter 3
      'Star, der Sternendeuter, fuehrt dich zum Ruheplateau -- dem einzigen Ort auf der Insel, ' +
      'an dem keine Bildschirme funktionieren. Hier kannst du die letzten Sterne noch sehen. ' +
      'Star lehrt dich Achtsamkeit: den Moment wahrnehmen, Atem spueren, den Wind hoeren. ' +
      '"Im echten Leben passieren die wichtigsten Dinge", sagt er. ' +
      '"Aber du merkst sie nur, wenn du wirklich da bist -- mit deinem ganzen Bewusstsein."',

      // Chapter 4
      'Dream, die Traumweberin, hat eine Vision: Wenn genug Bewohner gleichzeitig ihre Bildschirme ' +
      'ausschalten und zum Himmel schauen, werden die Sterne zurueckkehren. ' +
      'Doch das ist schwerer als gedacht -- die Angst, etwas zu verpassen, haelt viele gefangen. ' +
      'Du organisierst die "Stunde der Stille": Eine Stunde ohne Bildschirme, nur mit echten Menschen, ' +
      'echten Gespraechen und dem echten Nachthimmel. Was dann passiert, ist magisch.',
    ],
    clues: [
      {
        id: 'night-clue-1',
        text: 'Ein Sternbild, das die Form eines Herzens hat, leuchtet wieder auf, als ein Bewohner sein Handy weglegt und seiner Freundin in die Augen schaut. Echte Verbindung bringt Licht zurueck.',
        chapter: 1,
      },
      {
        id: 'night-clue-2',
        text: 'Pixels Bildschirmstrahlung wird schwaercher, wenn jemand bewusst entscheidet, wann und wie lange er online ist. Es geht nicht darum, nie ein Handy zu benutzen -- sondern darum, der Chef zu sein, nicht der Sklave.',
        chapter: 2,
      },
      {
        id: 'night-clue-3',
        text: 'Auf dem Ruheplateau findest du eine Sonnenuhr mit der Inschrift: "Die beste Zeit ist jetzt. Nicht der letzte Post, nicht die naechste Nachricht -- dieser Moment, genau hier."',
        chapter: 3,
      },
      {
        id: 'night-clue-4',
        text: 'Waehrend der Stunde der Stille entdeckst du: Die Sterne waren nie wirklich weg. Sie wurden nur ueberstrahlt. So wie deine innere Ruhe nie verschwindet -- sie wird nur manchmal uebertoent.',
        chapter: 4,
      },
    ],
    revelation:
      'Die Sterne erloschen nicht, weil sie schwaecher wurden -- sie wurden von der ewigen blauen Strahlung ' +
      'der Bildschirme ueberstrahlt. Die Bewohner der Nachtinsel haben gelernt: Technologie ist nicht boese, ' +
      'aber wenn sie dein ganzes Leben fuellt, bleibt kein Platz fuer Stille, echte Begegnungen und Achtsamkeit. ' +
      'Jetzt leuchtet der Sternenhimmel wieder, und die Bewohner geniessen beides: ' +
      'die digitale Welt in gesunden Dosen und die Magie des echten Moments.',
  },

  // ---------------------------------------------------------------------------
  // 7. RAINBOW - Diversity / Identity
  // ---------------------------------------------------------------------------
  rainbow: {
    islandId: 'rainbow',
    mysteryTitle: 'Die verblassenden Farben',
    hook:
      'Der Regenbogen ueber der Insel verliert seine Farben -- erst das Violett, dann das Blau. ' +
      'Alles wird grau und eintoenig. ' +
      'Warum verschwinden die Farben, und was passiert, wenn der Regenbogen ganz erlischt?',
    chapterIntros: [
      // Chapter 1
      'Die Regenbogeninsel war einmal der bunteste Ort der Welt -- jede Strasse, jedes Haus, ' +
      'jeder Bewohner trug eine eigene Farbe. Doch als du ankommst, ist vieles bereits grau. ' +
      'Prism, der Farbenwandler, erklaert besorgt: "Irgendjemand hat angefangen zu sagen, ' +
      'dass es nur eine richtige Farbe gibt. Und seitdem verblassen alle anderen." ' +
      'Du merkst schnell: Die Farben stehen fuer die Unterschiede zwischen Menschen.',

      // Chapter 2
      'Mosaic, die Mosaik-Kuenstlerin, fuehrt dich zu ihrem Atelier, wo frueher wunderschoene Bilder ' +
      'aus tausend verschiedenen Steinen entstanden. Jetzt liegen die Steine unsortiert am Boden -- ' +
      'jemand hat versucht, alle gleich anzumalen. "Ein Mosaik aus gleichen Steinen ist kein Mosaik", ' +
      'sagt Mosaic traurig. "Es ist nur eine graue Wand." ' +
      'Du beginnst zu verstehen: Vielfalt ist keine Schwaeche, sondern die groesste Staerke.',

      // Chapter 3
      'Voice, der Geschichtenerzaehler, bringt dich zum Marktplatz der Stimmen. ' +
      'Frueher erzaehlte hier jeder seine eigene Geschichte. Doch die leiseren Stimmen wurden uebertönt, ' +
      'und einige haben ganz aufgehoert zu sprechen. Voice sagt: "Jede Geschichte ist wichtig. ' +
      'Nicht nur die lauten, nicht nur die, die der Mehrheit gefallen." ' +
      'Du lernst zuzuhoeren -- besonders denen, die selten gehoert werden.',

      // Chapter 4
      'Bridge, die Brueckenbauerin, hat einen Plan, um den Regenbogen zu retten. ' +
      'Jede Farbe kehrt zurueck, wenn ein Bewohner seine Einzigartigkeit zeigt und die Einzigartigkeit ' +
      'der anderen feiert. Keine Farbe ist wichtiger als die andere -- aber jede fehlt, wenn sie verschwindet. ' +
      'Gemeinsam baut ihr Bruecken zwischen denen, die sich fremd geworden sind. ' +
      'Und Stueck fuer Stueck leuchtet der Regenbogen wieder auf.',
    ],
    clues: [
      {
        id: 'rainbow-clue-1',
        text: 'Eine graue Blume bekommt ihre Farbe zurueck, als ein Bewohner sagt: "Ich bin anders, und das ist schoen." Farbe braucht Mut zur Einzigartigkeit.',
        chapter: 1,
      },
      {
        id: 'rainbow-clue-2',
        text: 'Mosaics kaputtes Bild wird erst wieder schoen, als die Steine in ihrer eigenen Farbe bleiben duerfen. Gleichmacherei zerstoert Schoenheit -- Vielfalt erschafft sie.',
        chapter: 2,
      },
      {
        id: 'rainbow-clue-3',
        text: 'Auf dem Marktplatz der Stimmen haengt ein Schild: "Zuhoeren ist die erste Bruecke. Verstehen die zweite. Respekt die dritte." Wer alle drei baut, ueberwindet jede Kluft.',
        chapter: 3,
      },
      {
        id: 'rainbow-clue-4',
        text: 'Der Regenbogen besteht aus sieben Farben, nicht aus einer. Nimm eine weg, und er ist unvollstaendig. So ist es auch mit unserer Gesellschaft: Jeder Mensch ist eine Farbe, die fehlt, wenn sie verschwindet.',
        chapter: 4,
      },
    ],
    revelation:
      'Die Farben verschwanden, weil die Bewohner vergessen hatten, dass Unterschiede keine Bedrohung sind, ' +
      'sondern ein Geschenk. Der Regenbogen leuchtet nur, wenn alle Farben da sein duerfen -- ' +
      'laut und leise, gross und klein, alt und neu. ' +
      'Jetzt ist die Insel bunter als je zuvor, weil jeder Bewohner stolz seine eigene Farbe traegt ' +
      'und gleichzeitig die Farben der anderen bewundert. ' +
      'Vielfalt ist nicht etwas, das wir aushalten muessen -- es ist das, was die Welt schoen macht.',
  },

  // ---------------------------------------------------------------------------
  // 8. HOME - Integration / Transfer
  // ---------------------------------------------------------------------------
  home: {
    islandId: 'home',
    mysteryTitle: 'Die verschlossene Tuer',
    hook:
      'Im Zentrum der Heimatinsel steht eine grosse, verschlossene Tuer mit acht Schloessern. ' +
      'Niemand weiss, was dahinter liegt, aber alle spueren: Es ist etwas Wichtiges. ' +
      'Hast du auf deiner Reise genug gelernt, um sie zu oeffnen?',
    chapterIntros: [
      // Chapter 1
      'Die Heimatinsel fuehlt sich vertraut an, und doch ist etwas anders. ' +
      'Keeper, der Heimathueter, empfaengt dich mit einem warmen Laecheln und zeigt dir die Tuer. ' +
      'Sie ist uralt, aus acht verschiedenen Materialien gefertigt: Vulkanstein, Meeresmuschel, ' +
      'Waldholz, Bergkristall, Gartenranke, Nachtstern, Regenbogenglas und etwas Unbekanntes. ' +
      '"Jedes Schloss oeffnet sich mit einer Lektion, die du auf deiner Reise gelernt hast", erklaert Keeper. ' +
      '"Aber nicht mit Worten allein -- du musst zeigen, dass du es wirklich verstanden hast."',

      // Chapter 2
      'Mirror, der Spiegel der Wahrheit, laesst dich in dich selbst blicken. ' +
      'Er zeigt dir, wer du warst, als du diese Reise begonnen hast, und wer du jetzt bist. ' +
      'Die Veraenderung ist nicht immer sichtbar, aber sie ist da: in der Art, wie du denkst, ' +
      'fuehlst und mit anderen umgehst. Vier der acht Schloesser springen auf, ' +
      'als du die Lektionen von Vulkan, Ozean, Wald und Berg in die Tat umsetzt.',

      // Chapter 3
      'Compass, der Wegweiser, stellt dir eine schwierige Frage: ' +
      '"Was nuetzt alles Wissen, wenn du es nur hier auf den Inseln anwendest?" ' +
      'Die restlichen Schloesser oeffnen sich nicht durch Erinnerung, sondern durch Vorsaetze: ' +
      'Wie willst du das Gelernte in deinem echten Alltag nutzen? ' +
      'Du denkst an deine Schule, deine Familie, deine Freunde -- und findest konkrete Antworten.',

      // Chapter 4
      'Spark, der Funke der Hoffnung, steht mit dir vor der Tuer. Sieben Schloesser sind offen. ' +
      'Das achte -- aus dem unbekannten Material -- ist das schwerste. ' +
      'Es oeffnet sich nicht mit einer Lektion von einer Insel, sondern mit etwas, ' +
      'das du selbst hinzufuegst: deinem persoenlichen Versprechen an dich selbst. ' +
      'Was nimmst du aus dieser Reise mit? Was willst du in der Welt veraendern? ' +
      'Mit deiner Antwort springt das letzte Schloss auf.',
    ],
    clues: [
      {
        id: 'home-clue-1',
        text: 'Jedes Schloss traegt eine Gravur: Vulkan zeigt eine Flamme (Wut verstehen), Ozean eine Traene (Trauer zulassen), Wald ein Licht (Mut finden), Berg ein Echo (Selbstwert staerken).',
        chapter: 1,
      },
      {
        id: 'home-clue-2',
        text: 'Mirror zeigt dir: Du bist nicht perfekt, und das war nie das Ziel. Das Ziel war, dich besser zu verstehen -- und mit diesem Verstehen freundlicher zu dir und anderen zu sein.',
        chapter: 2,
      },
      {
        id: 'home-clue-3',
        text: 'Compass hat eine Karte, die ueber die Inseln hinausreicht -- in deine echte Welt. Jede Lektion hat dort einen Platz: zu Hause, in der Schule, unter Freunden.',
        chapter: 3,
      },
      {
        id: 'home-clue-4',
        text: 'Das achte Schloss hat kein Material, weil es aus dir selbst besteht. Dein Versprechen, das Gelernte zu leben -- das ist der letzte Schluessel.',
        chapter: 4,
      },
    ],
    revelation:
      'Hinter der Tuer liegt kein Schatz, kein Geheimnis, kein magischer Gegenstand. ' +
      'Hinter der Tuer liegt ein Spiegel -- aber diesmal zeigt er nicht die Vergangenheit, ' +
      'sondern die Zukunft. Deine Zukunft. Mit allem, was du gelernt hast: ' +
      'Wut verstehen, Trauer zulassen, Angst ueberwinden, deinen Wert erkennen, ' +
      'Empathie zeigen, achtsam sein und Vielfalt feiern. ' +
      'Das achte Schloss war das Versprechen, dieses Wissen nicht auf den Inseln zu lassen, ' +
      'sondern in dein echtes Leben mitzunehmen. ' +
      'Die Reise durch die Inneren Welten endet hier -- aber deine eigene Reise faengt gerade erst an.',
  },
};

export default islandStories;
