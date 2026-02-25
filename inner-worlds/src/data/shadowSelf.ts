// @ts-nocheck
import type { ShadowEncounter } from '../types';

// =============================================================================
// SCHATTEN-SELBST – Übergreifender Story-Arc
// =============================================================================
//
// Das Schatten-Selbst ist KEIN Bösewicht. Es ist der verdrängte, unterdrückte,
// missverstandene Teil des Spielers. Auf jeder Insel erscheint es in einer
// anderen Form und stellt eine unbequeme Wahrheit dar.
//
// Therapeutische Grundlage:
// - C.G. Jungs Schattenkonzept: Integration statt Unterdrückung
// - IFS (Internal Family Systems): Alle Teile haben eine Schutzfunktion
// - Selbstakzeptanz nach Kristin Neff: Umarmen, nicht bekämpfen
//
// Visueller Fortschritt (humanization: 0 → 1):
// Insel 1: Bedrohliche Silhouette, starker Glitch-Effekt, weiße Augen
// Insel 2: Silhouette weint, weniger Glitch, schwache Gesichtszüge
// Insel 3: Flüstert aus den Schatten, Form wird klarer
// Insel 4: Steht aufrecht, verzerrtes Spiegelbild, erste Farben
// Insel 5: Einsam, gebrochene Brücken, halb-transparent
// Insel 6: Scrollt durchs Handy, leere Augen, blaues Glühen
// Insel 7: Viele überlagerte Gesichter, Masken, prismatisch
// Insel 8: Vollständig menschlich, identisch mit dem Spieler-Avatar
// =============================================================================

export const shadowEncounters: ShadowEncounter[] = [
  // ---------------------------------------------------------------------------
  // VULKAN – Erste Begegnung: Das verdrängte Feuer
  // ---------------------------------------------------------------------------
  {
    islandId: 'volcano',
    triggerChapter: 2,
    humanization: 0.1,
    appearance:
      'Eine pechschwarze Silhouette steht am Kraterrand. Sie hat die exakte Form deines Avatars, ' +
      'aber ohne Farbe, ohne Gesicht – nur zwei leuchtend weiße Augen, die dich durchbohren. ' +
      'Alle paar Sekunden zuckt die Gestalt, als würde sie glitchen – kurze Teleportationen, ' +
      'Bildrauschen, wie ein kaputtes Signal. Dunkle Partikel schweben um sie herum wie Asche.',
    monologue:
      'Die Silhouette spricht, aber der Mund bewegt sich nicht. Die Worte erscheinen direkt in deinem Kopf:\n\n' +
      '"Du versuchst, mich zu löschen. Aber ich bin dein Feuer."\n\n' +
      'Eine Pause. Der Vulkan bebt.\n\n' +
      '"Jedes Mal, wenn du deine Wut heruntergeschluckt hast, bin ich gewachsen. ' +
      'Jedes Mal, wenn du \'Alles gut\' gesagt hast, obwohl nichts gut war, hast du mich gefüttert. ' +
      'Ich bin nicht hier, um dich zu zerstören. Ich bin hier, weil DU mich erschaffen hast."\n\n' +
      'Die Silhouette streckt eine Hand aus – sie brennt, aber sie verbrennt nicht.\n\n' +
      '"Wut ist nicht dein Feind. Ich bin nicht dein Feind. Ich bin das Feuer, das du brauchst, ' +
      'um für dich selbst einzustehen. Hör auf, mich zu bekämpfen."',
    lesson:
      'Wut ist nicht der Feind. Unkontrollierte Wut schon. Aber verdrängte Wut ist genauso gefährlich – ' +
      'sie wächst im Dunkeln und explodiert, wenn man es am wenigsten erwartet. ' +
      'Das Schatten-Selbst zeigt: Unsere \'negativen" Emotionen gehören zu uns. ' +
      'Sie zu akzeptieren ist der erste Schritt, sie zu verstehen.',
    responses: [
      {
        text: '"Du machst mir Angst. Aber... ich höre dir zu."',
        reaction:
          'Die Silhouette nickt langsam. Für einen Moment flackert ein warmes Orange durch das Schwarz – ' +
          'wie Glut unter Asche. "Das ist mehr, als die meisten tun. Die meisten rennen." ' +
          'Dann löst sie sich in dunkle Partikel auf und verschwindet. Aber du spürst: Das war nicht das letzte Mal.',
        isAccepting: true,
      },
      {
        text: '"Geh weg! Ich brauche dich nicht!"',
        reaction:
          'Die Silhouette lacht leise – es klingt nicht böse, sondern traurig. ' +
          '"Das sagen sie alle. Und dann wundern sie sich, warum der Vulkan immer lauter wird." ' +
          'Sie verschwindet, aber der Boden bebt stärker als zuvor. Du hast sie nicht besiegt. Du hast sie nur vertrieben – vorerst.',
        isAccepting: false,
      },
      {
        text: '"Wer bist du?"',
        reaction:
          'Die Silhouette legt den Kopf schief. "Ich bin du. Der Teil, den du versteckst. ' +
          'Der Teil, der schreit, wenn du schweigst. Der Teil, der brennt, wenn du erstarrst." ' +
          'Sie verblasst langsam. "Wir sehen uns wieder. Auf jeder Insel. Bis du bereit bist, mich anzusehen."',
        isAccepting: true,
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // OZEAN – Das verdrängte Weinen
  // ---------------------------------------------------------------------------
  {
    islandId: 'ocean',
    triggerChapter: 2,
    humanization: 0.2,
    appearance:
      'Am Ufer, wo die Wellen brechen, sitzt eine dunkle Gestalt. Diesmal ist sie nicht stehend und bedrohlich – ' +
      'sie sitzt zusammengekauert, die Knie an die Brust gezogen. Der Glitch-Effekt ist schwächer, ' +
      'und zum ersten Mal erkennst du so etwas wie ein Gesicht – verschwommen, wie unter Wasser. ' +
      'Die Gestalt weint. Ihre Tränen sind schwarz und tropfen ins Meer, wo sie zu kleinen Lichtpunkten werden.',
    monologue:
      '"Du hast aufgehört zu weinen, um stark zu sein. Aber wer weint für dich?"\n\n' +
      'Die Stimme ist leiser als auf dem Vulkan. Gebrochener.\n\n' +
      '"Erinnerst du dich an das letzte Mal, als du wirklich geweint hast? Nicht kurz die Augen feucht, ' +
      'sondern richtig? Mit Schluchzen und Rotz und diesem Gefühl, als würde alles rausfließen? ' +
      'Wahrscheinlich nicht. Weil du dir irgendwann gesagt hast: Weinen ist schwach. Weinen nervt andere. ' +
      'Weinen bringt nichts."\n\n' +
      'Die Gestalt schaut aufs Meer.\n\n' +
      '"Aber schau dir das Meer an. Es besteht aus Tränen, die jemand geweint hat. ' +
      'Und es ist das Schönste und Mächtigste, was es gibt. ' +
      'Trauer zuzulassen ist keine Schwäche. Es ist die mutigste Form der Stärke."',
    lesson:
      'Trauer zu verdrängen macht nicht stark – es macht einsam. Das Schatten-Selbst weint die Tränen, ' +
      'die der Spieler sich selbst nicht erlaubt. Therapeutisch: Verdrängte Trauer wird zu Depression, ' +
      'zu Leere, zu Taubheit. Zugelassene Trauer verwandelt sich – in Erinnerung, in Dankbarkeit, in Verbindung.',
    responses: [
      {
        text: '"Ich setze mich zu dir. Wir müssen nicht reden."',
        reaction:
          'Du setzt dich neben die Gestalt. Eine Weile sitzt ihr schweigend da und schaut aufs Meer. ' +
          'Dann, ganz leise: "Danke. Das hat lange niemand mehr gemacht – einfach da sein." ' +
          'Zum ersten Mal siehst du etwas wie ein schwaches Lächeln in dem verschwommenen Gesicht. ' +
          'Die Gestalt löst sich auf, aber die schwarzen Tränen im Sand verwandeln sich in kleine Perlen.',
        isAccepting: true,
      },
      {
        text: '"Hör auf zu weinen. Das bringt doch nichts."',
        reaction:
          '"Genau das sagst du dir selbst auch, oder?" Die Gestalt schaut dich an, und in ihren Augen ' +
          'siehst du kurz dein eigenes Gesicht. "Und dann wunderst du dich, warum sich alles so leer anfühlt." ' +
          'Sie verschwindet, und das Meer wird unruhiger. Die unterdrückten Tränen steigen als Wellen.',
        isAccepting: false,
      },
      {
        text: '"Ich... ich glaube, ich habe auch Tränen, die raus müssen."',
        reaction:
          'Die Gestalt nickt. "Ich weiß. Ich spüre sie. Sie drücken von innen gegen deine Brust, ' +
          'aber du lässt sie nicht raus." Eine Pause. "Du musst nicht jetzt weinen. ' +
          'Aber erlaube dir, dass es okay wäre. Das reicht für heute." ' +
          'Die Gestalt wird transparent und verschmilzt mit dem Meer.',
        isAccepting: true,
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // WALD – Die flüsternde Angst
  // ---------------------------------------------------------------------------
  {
    islandId: 'forest',
    triggerChapter: 2,
    humanization: 0.35,
    appearance:
      'Zwischen den Bäumen huschst du eine Bewegung. Die dunkle Gestalt versteckt sich – ' +
      'hinter Stämmen, in Schatten, immer am Rand deines Blickfelds. Diesmal ist sie kleiner, ' +
      'zusammengekauert. Der Glitch-Effekt ist fast weg, aber die Gestalt zittert sichtbar. ' +
      'Sie hat Angst. Ihr Gesicht wird klarer – es sieht jünger aus, verletzlicher.',
    monologue:
      'Die Stimme kommt von überall – aus den Blättern, aus dem Wind, aus deinem eigenen Kopf:\n\n' +
      '"Ich bin die Stimme, die sagt: Du schaffst das nicht. Aber hör genau hin – ich habe Angst."\n\n' +
      'Die Gestalt tritt halb hinter einem Baum hervor.\n\n' +
      '"Ich bin nicht gemein. Ich bin nicht dein Feind. Ich bin der Teil von dir, der dich beschützen will. ' +
      'Wenn ich sage \'Du schaffst das nicht\', meine ich eigentlich: \'Bitte tu dir nicht weh.\' ' +
      'Wenn ich sage \'Alle werden lachen\', meine ich: \'Ich habe Angst, dass du verletzt wirst.\'"\n\n' +
      'Sie zittert.\n\n' +
      '"Ich bin dein Schutzinstinkt. Ich war mal nützlich – als es wirklich gefährlich war. ' +
      'Aber jetzt schütze ich dich vor Dingen, die nicht gefährlich sind. ' +
      'Vor Referaten. Vor neuen Leuten. Vor dem Leben selbst. ' +
      'Und das tut mir leid. Ich weiß nicht, wie ich aufhören soll."',
    lesson:
      'Angst ist ein Schutzmechanismus, kein Versagen. Das Schatten-Selbst zeigt: Die innere Stimme des Zweifels ' +
      'will nicht zerstören – sie will beschützen. Aber sie ist überprotektiv geworden. ' +
      'Statt sie zum Schweigen zu bringen, muss man ihr zuhören und dann sagen: ' +
      '"Danke für die Warnung. Aber ich gehe trotzdem."',
    responses: [
      {
        text: '"Ich verstehe. Du wolltest mich beschützen. Aber ich bin stärker, als du denkst."',
        reaction:
          'Die Gestalt tritt ganz hinter dem Baum hervor. Zum ersten Mal siehst du sie vollständig – ' +
          'sie ist kleiner als du. Viel kleiner. "Ich weiß", flüstert sie. "Ich weiß, dass du stark bist. ' +
          'Ich habe nur vergessen, wie man loslässt." ' +
          'Sie wird kleiner und durchsichtiger, bis sie in einem sanften Leuchten verschwindet. ' +
          'Der Wald wird ein kleines bisschen heller.',
        isAccepting: true,
      },
      {
        text: '"Sei still! Wegen dir traue ich mich nie was!"',
        reaction:
          '"Siehst du?" Die Gestalt kauert sich noch mehr zusammen. "Genau so redest du mit dir selbst. ' +
          'Mit Wut und Verachtung. Und dann wunderst du dich, warum die Angst nicht weniger wird." ' +
          'Sie verschwindet, aber die Schatten im Wald werden tiefer. ' +
          'Angst wird nicht kleiner, wenn man sie anschreit.',
        isAccepting: false,
      },
      {
        text: '"Komm raus. Du musst dich nicht verstecken. Nicht vor mir."',
        reaction:
          'Langsam, zögernd, tritt die Gestalt ins Licht. Sie sieht aus wie eine jüngere Version von dir – ' +
          'vielleicht 7 oder 8 Jahre alt. "Du bist der Erste, der mich nicht verjagt", sagt sie leise. ' +
          '"Die meisten versuchen mich zu ignorieren oder mich zu überschreien." ' +
          'Sie nimmt deine Hand. Ihre Finger sind kalt, aber der Griff ist fest. Dann löst sie sich auf.',
        isAccepting: true,
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // BERG – Das verzerrte Spiegelbild
  // ---------------------------------------------------------------------------
  {
    islandId: 'mountain',
    triggerChapter: 2,
    humanization: 0.5,
    appearance:
      'Am Gipfel steht die Gestalt vor dem Spiegel des Berges. Diesmal ist sie aufrecht, ' +
      'fast stolz – aber das Spiegelbild ist verzerrt. Zu groß, zu klein, zu hässlich, zu schwach. ' +
      'Das Gesicht der Gestalt ist jetzt klar zu erkennen: Es ist deins. Aber mit dunklen Ringen ' +
      'unter den Augen und einem Ausdruck, der sagt: Nicht gut genug. Erste Farben schimmern ' +
      'durch das Schwarz – dumpfes Blau, müdes Grau.',
    monologue:
      'Die Gestalt starrt in den Spiegel und spricht, ohne dich anzusehen:\n\n' +
      '"Du siehst dich, wie andere dich sehen. Wann hast du zuletzt hingeschaut – wirklich?"\n\n' +
      'Sie fährt mit der Hand über den Spiegel, und das Bild verzerrt sich noch mehr.\n\n' +
      '"Ich sammle alles, was du über dich glaubst. Jede Kritik, jeder Vergleich, jedes \'Die anderen sind besser.\' ' +
      'Ich trage die Last deiner Selbstzweifel. Und weißt du was? Sie wiegt Tonnen."\n\n' +
      'Sie dreht sich zu dir um.\n\n' +
      '"Du denkst, ich bin dein innerer Kritiker. Aber ich bin eigentlich dein inneres Kind, das verzweifelt ' +
      'versucht, Liebe zu verdienen. Ich sage dir \'Du bist nicht gut genug\', weil ich glaube: ' +
      'Wenn du perfekt wirst, werden sie dich endlich mögen. Aber das funktioniert nicht. ' +
      'Perfekt gibt es nicht. Und Liebe muss man nicht verdienen."',
    lesson:
      'Selbstwert kommt von innen, nicht von Bestätigung. Der innere Kritiker ist kein Sadist – ' +
      'er ist ein verzweifeltes Kind, das Zugehörigkeit sucht. Therapeutisch: Selbstmitgefühl statt Selbstkritik. ' +
      'Nicht \'Ich muss besser werden", sondern \'Ich bin okay, so wie ich bin – und ich darf wachsen."',
    responses: [
      {
        text: '"Der Spiegel lügt. Und du auch, wenn du sagst, ich bin nicht genug."',
        reaction:
          'Die Gestalt sieht überrascht aus – und dann lächelt sie. Zum ersten Mal ein echtes Lächeln. ' +
          '"Das wollte ich hören." Der Spiegel bekommt Risse, und durch die Risse scheint warmes Licht. ' +
          '"Ich bin nicht dein Feind. Ich bin der Teil, der glaubt, dass Liebe verdient werden muss. ' +
          'Zeig mir, dass das nicht stimmt." Die Gestalt berührt den Spiegel – und er zerbricht. ' +
          'Dahinter ist nur Licht.',
        isAccepting: true,
      },
      {
        text: '"Du hast recht. Ich bin nicht gut genug."',
        reaction:
          'Die Gestalt schüttelt traurig den Kopf. "Nein. Nein, nein, nein. ' +
          'Ich wollte nicht, dass du mir GLAUBST. Ich wollte, dass du mir WIDERSPRICHST." ' +
          'Der Spiegel wird dunkler. "Solange du mir zustimmst, bleibe ich stark. ' +
          'Widersprich mir. Bitte." Sie verschwindet, aber der Spiegel bleibt – verzerrt wie zuvor.',
        isAccepting: false,
      },
      {
        text: '"Du trägst das seit Jahren allein. Lass mich dir helfen, es abzulegen."',
        reaction:
          'Die Gestalt starrt dich an. Ihre Augen werden feucht – zum ersten Mal sehen die weißen Augen ' +
          'menschlich aus. "Niemand... niemand hat das je so gesagt." ' +
          'Sie legt die Hand auf den Spiegel, und das verzerrte Bild wird langsam klarer. ' +
          'Nicht perfekt, aber real. "Danke", flüstert sie. Und verschwindet.',
        isAccepting: true,
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // GARTEN – Die eingemauerte Einsamkeit
  // ---------------------------------------------------------------------------
  {
    islandId: 'garden',
    triggerChapter: 2,
    humanization: 0.65,
    appearance:
      'Im Zentrum des Gartens steht eine hohe Mauer aus schwarzem Stein. Dahinter sitzt die Gestalt – ' +
      'du kannst sie durch Risse in der Mauer sehen. Sie ist jetzt fast vollständig menschlich: ' +
      'dein Gesicht, deine Kleidung, aber alles in gedämpften, traurigen Farben. ' +
      'Um sie herum sind die Überreste von Brücken – alle gebrochen. ' +
      'Sie hat Blumen in der Hand, aber sie verwelken bei ihrer Berührung.',
    monologue:
      '"Ich habe Mauern gebaut, um mich zu schützen. Aber jetzt bin ich eingesperrt."\n\n' +
      'Die Gestalt drückt eine verwelkte Blume an ihre Brust.\n\n' +
      '"Jedes Mal, wenn jemand dich verletzt hat, habe ich einen Stein auf die Mauer gelegt. ' +
      'Der Freund, der dein Geheimnis weitererzählt hat – ein Stein. ' +
      'Der Mensch, der sich über dich lustig gemacht hat – ein Stein. ' +
      'Die Person, die versprochen hat zu bleiben und dann gegangen ist – ein ganzer Turm."\n\n' +
      'Sie schaut zu dir hoch, durch einen Riss in der Mauer.\n\n' +
      '"Die Mauer hält den Schmerz draußen. Aber sie hält auch die Liebe draußen. ' +
      'Und jetzt sitze ich hier – sicher, aber allein. Geschützt, aber erstarrt. ' +
      'Ich wollte, dass du nie wieder verletzt wirst. Stattdessen habe ich dafür gesorgt, ' +
      'dass du nie wieder richtig fühlst."',
    lesson:
      'Verletzlichkeit ist die Grundlage von Verbindung. Mauern schützen, aber sie isolieren auch. ' +
      'Das Schatten-Selbst zeigt: Der Schutz vor Schmerz hat einen Preis – die Unfähigkeit, Nähe zuzulassen. ' +
      'Therapeutisch: Verletzlichkeit ist keine Schwäche, sondern der mutigste Akt, den ein Mensch zeigen kann.',
    responses: [
      {
        text: '"Lass mich dir helfen, ein Loch in die Mauer zu machen. Nicht alles einreißen – nur eine Tür."',
        reaction:
          'Die Gestalt zögert lange. Dann, ganz langsam, nimmt sie einen Stein aus der Mauer. ' +
          '"Eine Tür", wiederholt sie leise. "Nicht alles einreißen. Nur eine Tür." ' +
          'Durch die Lücke fällt Licht, und die verwelkte Blume in ihrer Hand bekommt einen Hauch von Farbe. ' +
          '"Eine Tür reicht", sagt sie. "Für den Anfang."',
        isAccepting: true,
      },
      {
        text: '"Mauern sind manchmal nötig. Du musst dich nicht für sie schämen."',
        reaction:
          'Die Gestalt sieht dich überrascht an. "Du... verurteilst mich nicht?" ' +
          '"Nein", sagst du. "Jede Mauer hatte einen Grund." ' +
          'Die Gestalt nickt, und eine einzelne Träne rollt über ihre Wange. Sie ist warm und golden. ' +
          '"Vielleicht... brauche ich nicht alle Steine. Aber ein paar darf ich behalten, oder?" ' +
          'Die Mauer wird nicht eingerissen, aber ein kleines Fenster erscheint.',
        isAccepting: true,
      },
      {
        text: '"Du bist selbst schuld. Wenn du netter wärst, hättest du Freunde."',
        reaction:
          'Die Gestalt erstarrt. Dann legt sie langsam den nächsten Stein auf die Mauer. ' +
          '"Genau das... genau das sagen die Stimmen in meinem Kopf auch." ' +
          'Die Mauer wird höher. Dicker. Der Riss schließt sich. ' +
          '"Siehst du? So entstehen Mauern. Nicht durch Feinde, sondern durch Worte wie deine."',
        isAccepting: false,
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // NACHT – Die leere Ablenkung
  // ---------------------------------------------------------------------------
  {
    islandId: 'night',
    triggerChapter: 2,
    humanization: 0.8,
    appearance:
      'Unter einem erloschenen Sternenhimmel sitzt die Gestalt. Sie sieht jetzt fast völlig menschlich aus – ' +
      'dein Gesicht, deine Kleidung, sogar deine Haltung. Aber ihre Augen sind leer. ' +
      'Sie scrollt durch ein unsichtbares Handy, das blaues Licht auf ihr Gesicht wirft. ' +
      'Um sie herum liegen zerbrochene Sterne wie Glasscherben auf dem Boden.',
    monologue:
      '"Je lauter die Welt wird, desto weniger höre ich mich selbst."\n\n' +
      'Die Gestalt scrollt weiter. Ihr Daumen bewegt sich mechanisch.\n\n' +
      '"Weißt du, warum ich scrolle? Nicht weil es mich interessiert. ' +
      'Sondern weil die Stille mich erschreckt. In der Stille kommen die Gedanken. ' +
      'Und manche Gedanken... will ich nicht denken."\n\n' +
      'Sie legt das unsichtbare Handy weg. Ihre Hände zittern.\n\n' +
      '"Jedes Like ist wie ein kleiner Tropfen Wasser in der Wüste. ' +
      'Es löscht den Durst für eine Sekunde. Und dann brauchst du mehr. Und mehr. Und mehr. ' +
      'Und irgendwann merkst du: Du bist immer noch durstig. ' +
      'Weil das, was du wirklich brauchst, kein Like ist. ' +
      'Es ist jemand, der dich ansieht – nicht deinen Feed. Dich."',
    lesson:
      'Stille ist kein Feind. Langeweile ist kein Problem. Das Schatten-Selbst zeigt die Leere hinter ' +
      'der digitalen Ablenkung. Therapeutisch: Ständige Stimulation verhindert Selbstreflexion. ' +
      'Wer nie still ist, kann seine eigene innere Stimme nicht hören.',
    responses: [
      {
        text: '"Leg das Handy weg. Ich schaue dich an. Nicht deinen Feed – dich."',
        reaction:
          'Die Gestalt hält inne. Schaut hoch. Zum ersten Mal sieht sie dich wirklich an – ' +
          'Auge in Auge, ohne Bildschirm dazwischen. "Das ist...", beginnt sie. ' +
          '"Unangenehm?" fragst du. "Nein", sagt sie leise. "Echt." ' +
          'Das blaue Licht erlischt. Die zerbrochenen Sterne am Boden beginnen schwach zu glühen. ' +
          'Einer von ihnen steigt auf und nimmt seinen Platz am Himmel ein.',
        isAccepting: true,
      },
      {
        text: '"Ich kenne das. Manchmal scrolle ich auch, um nicht denken zu müssen."',
        reaction:
          'Die Gestalt lacht leise – nicht zynisch, sondern erleichtert. ' +
          '"Endlich jemand, der ehrlich ist." Sie legt das Handy weg. ' +
          '"Es ist nicht das Handy, das das Problem ist. Es ist das, wovor wir fliehen. ' +
          'Aber wenn zwei Menschen zusammen still sein können... dann ist die Stille weniger beängstigend." ' +
          'Zusammen sitzt ihr da. Ohne Bildschirm. Ohne Worte. Und es ist okay.',
        isAccepting: true,
      },
      {
        text: '"Handys sind halt normal. Da kann man nichts machen."',
        reaction:
          '"Normal?" Die Gestalt lacht bitter. "Weißt du, was auch \'normal\' ist? ' +
          'Dass Jugendliche 7 Stunden am Tag auf Bildschirme starren und sich dann wundern, ' +
          'warum sie sich leer fühlen. \'Normal\' ist nicht dasselbe wie \'gesund\'." ' +
          'Sie scrollt weiter. Die Sterne am Boden werden noch dunkler. ' +
          'Du hast eine Chance verpasst, etwas zu hinterfragen.',
        isAccepting: false,
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // REGENBOGEN – Die vielen Masken
  // ---------------------------------------------------------------------------
  {
    islandId: 'rainbow',
    triggerChapter: 2,
    humanization: 0.9,
    appearance:
      'Die Gestalt steht vor dir, aber sie flimmert – wie ein Prisma, das tausend Bilder gleichzeitig zeigt. ' +
      'Mal jemand Cooles mit Lederjacke. Mal ein braves Kind mit Schuluniform. ' +
      'Mal ein Clown, der lacht. Mal jemand, der weint. Die Gesichter wechseln alle paar Sekunden. ' +
      'Überall um sie herum liegen Masken auf dem Boden – hunderte, alle verschieden, ' +
      'alle mit einem anderen Gesichtsausdruck.',
    monologue:
      '"Ich habe so viele Masken getragen, dass ich vergessen habe, wie mein Gesicht aussieht."\n\n' +
      'Die Gestalt greift nach einer Maske, hält sie vor ihr Gesicht, legt sie weg, nimmt die nächste.\n\n' +
      '"Diese hier für die Schule – der gute Schüler. Diese für zuhause – das brave Kind. ' +
      'Diese für die Freunde – der Lustige. Diese für Instagram – der Perfekte. ' +
      'Diese für die Erwachsenen – der Verständige."\n\n' +
      'Sie lässt alle Masken fallen.\n\n' +
      '"Und darunter? Darunter ist jemand, den ich nicht kenne. ' +
      'Weil ich nie die Zeit hatte, ihn kennenzulernen. ' +
      'Ich war zu beschäftigt damit, zu sein, was andere wollen. ' +
      'Manche sagen, Identität ist etwas, das man findet. Aber vielleicht ist es etwas, das man baut. ' +
      'Stück für Stück. Echt für Echt. Ohne Maske."',
    lesson:
      'Identität ist vielfältig, und das ist okay. Das Schatten-Selbst zeigt die Angst, ' +
      'ohne Maske nicht genug zu sein. Therapeutisch: Authentizität erfordert Mut. ' +
      'Jugendliche experimentieren mit Rollen – und das ist gesund. ' +
      'Aber wenn ALLE Rollen Masken sind, bleibt kein Raum für das echte Ich.',
    responses: [
      {
        text: '"Du musst nicht alles auf einmal sein. Zeig mir eine Sache, die echt ist."',
        reaction:
          'Die Gestalt hört auf zu flimmern. Für einen Moment – nur einen – ist sie still. ' +
          'Ein einzelnes Gesicht. Dein Gesicht. Ungeschminkt, unbearbeitet, mit allen Macken. ' +
          '"Das hier", flüstert sie. "Das ist echt. Es ist nicht perfekt. Aber es ist meins." ' +
          'Die Masken am Boden beginnen sich aufzulösen, und wo sie lagen, wachsen bunte Blumen – ' +
          'jede anders, keine perfekt, alle schön.',
        isAccepting: true,
      },
      {
        text: '"Masken sind nicht immer schlecht. Manchmal braucht man Schutz."',
        reaction:
          '"Stimmt", sagt die Gestalt nachdenklich. "Nicht jede Maske ist eine Lüge. ' +
          'Manchmal ist sie ein Schutzschild. Das Problem ist nicht die Maske – ' +
          'das Problem ist, wenn du vergisst, sie abzunehmen." ' +
          'Sie nimmt eine einzige Maske vom Boden auf – eine transparente. "Diese behalte ich vielleicht. ' +
          'Eine, durch die man mich sehen kann." Sie lächelt. Echt.',
        isAccepting: true,
      },
      {
        text: '"Jeder spielt Rollen. Das ist halt das Leben."',
        reaction:
          '"Ja", sagt die Gestalt. "Aber es gibt einen Unterschied zwischen \'eine Rolle spielen\' und ' +
          '\'vergessen, wer man ohne die Rolle ist\'. Und ich?" ' +
          'Sie schaut auf die hundert Masken am Boden. ' +
          '"Ich habe vergessen." Sie setzt eine neue Maske auf – die des Gleichgültigen. ' +
          'Und du spürst: Diese Antwort war auch eine Maske.',
        isAccepting: false,
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // ZUHAUSE – Die Integration: Umarmung statt Kampf
  // ---------------------------------------------------------------------------
  {
    islandId: 'home',
    triggerChapter: 4,
    humanization: 1.0,
    appearance:
      'Im Zentrum der Heimatinsel, vor der großen Tür mit den acht Schlössern, steht die Gestalt. ' +
      'Aber sie ist keine Gestalt mehr. Sie ist DU. Vollständig, in Farbe, mit deinem Gesicht, ' +
      'deiner Kleidung, deinem Companion an ihrer Seite. Der einzige Unterschied: ' +
      'Ihre Augen sind traurig. Nicht wütend, nicht bedrohlich – einfach nur traurig. ' +
      'Keine Glitch-Effekte mehr. Keine dunklen Partikel. Nur ein Mensch, der darauf wartet, ' +
      'angesehen zu werden.',
    monologue:
      'Die Gestalt spricht mit deiner Stimme. Zum ersten Mal ohne Verzerrung, ohne Echo:\n\n' +
      '"Sieben Inseln. Sieben Begegnungen. Und jedes Mal habe ich gehofft, ' +
      'dass du mich erkennst. Dass du verstehst, wer ich bin."\n\n' +
      'Sie breitet die Arme aus – nicht bedrohlich, sondern einladend.\n\n' +
      '"Ich bin deine Wut, die gehört werden will. ' +
      'Ich bin deine Trauer, die geweint werden will. ' +
      'Ich bin deine Angst, die verstanden werden will. ' +
      'Ich bin dein Zweifel, der geliebt werden will. ' +
      'Ich bin deine Einsamkeit, die verbunden werden will. ' +
      'Ich bin deine Erschöpfung, die Ruhe braucht. ' +
      'Ich bin alle Teile von dir, die du weggesperrt hast."\n\n' +
      'Eine Pause. Ihre Augen glänzen.\n\n' +
      '"Du musst mich nicht besiegen. Du musst mich nicht heilen. Du musst mich nicht verändern. ' +
      'Du musst mich nur sehen. Und sagen: Du gehörst zu mir."',
    lesson:
      'Das Finale ist keine Kampf-Mechanik, sondern ein Dialog der Selbstakzeptanz. ' +
      'Alle \'negativen" Emotionen und Anteile sind nicht der Feind – sie sind Teile des Selbst, ' +
      'die Integration brauchen, nicht Vernichtung. Therapeutisch: C.G. Jungs Schattenintegration. ' +
      'IFS: Alle Teile willkommen heißen. Selbstakzeptanz als Grundlage für Heilung.',
    responses: [
      {
        text: '"Ich sehe dich. Du gehörst zu mir."',
        reaction:
          'Du sagst die Worte, und etwas passiert. Die Gestalt – dein Schatten-Selbst – lächelt. ' +
          'Nicht traurig, nicht bitter, nicht resigniert. Wirklich. ' +
          'Sie geht auf dich zu, und du gehst auf sie zu. ' +
          'Und als ihr euch berührt, verschmilzt sie mit dir.\n\n' +
          'Es gibt kein Blitzlicht, keine Explosion, keinen dramatischen Effekt. ' +
          'Nur ein warmes Gefühl, das sich von der Brust in den ganzen Körper ausbreitet. ' +
          'Dein Avatar verändert sich: Ein goldener Schimmer umgibt dich, sanft und beständig. ' +
          'Du fühlst dich... vollständig. Nicht perfekt. Aber ganz.\n\n' +
          'Das achte Schloss an der Tür springt auf.',
        isAccepting: true,
      },
      {
        text: '"Ich habe Angst vor dir. Aber ich will es versuchen."',
        reaction:
          'Die Gestalt nickt verständnisvoll. "Angst ist okay. Du musst nicht sofort umarmen. ' +
          'Ein kleiner Schritt reicht." Du streckst die Hand aus. Die Gestalt nimmt sie. ' +
          'Der Kontakt fühlt sich warm an – nicht heiß wie auf dem Vulkan, nicht kalt wie im Wald. ' +
          'Genau richtig. Langsam, vorsichtig verschmelzt sie mit dir. ' +
          'Der goldene Schimmer ist schwächer, aber er ist da. Und er wird stärker werden.',
        isAccepting: true,
      },
      {
        text: '"Ich bin noch nicht bereit."',
        reaction:
          'Die Gestalt lächelt traurig, aber verständnisvoll. "Ich weiß. Und das ist okay. ' +
          'Ich warte. Ich bin geduldig. Ich warte seit Jahren – ein paar Tage mehr machen nichts." ' +
          'Sie setzt sich vor die Tür und wartet. Das achte Schloss bleibt verschlossen – ' +
          'aber es glüht warm. Ein Versprechen, dass die Tür sich öffnen wird. Wenn du bereit bist.',
        isAccepting: false,
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Hilfsfunktionen
// ---------------------------------------------------------------------------

/** Gibt die Shadow-Begegnung für eine bestimmte Insel zurück */
export const getShadowEncounter = (islandId: string): ShadowEncounter | undefined =>
  shadowEncounters.find((e) => e.islandId === islandId);

/** Gibt den Fortschritt der Schatten-Integration zurück (0-8, basierend auf abgeschlossenen Begegnungen) */
export const getShadowProgress = (completedIslands: string[]): number =>
  shadowEncounters.filter((e) => completedIslands.includes(e.islandId)).length;

/** Gibt die aktuelle Humanisierungsstufe basierend auf bisherigen Begegnungen zurück */
export const getCurrentHumanization = (completedIslands: string[]): number => {
  const completed = shadowEncounters
    .filter((e) => completedIslands.includes(e.islandId))
    .sort((a, b) => b.humanization - a.humanization);
  return completed.length > 0 ? completed[0].humanization : 0;
};
