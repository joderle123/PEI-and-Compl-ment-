// @ts-nocheck
import type { Scenario, WisdomCard, Activity, IslandId } from '../../../types';

// NPCs - empty array as specified
export const oceanNPCs: any[] = [];

// =============================================================================
// Ocean Island: Traurigkeit & Verlust (Grief & Loss)
// 4 progressive scenarios teaching kids about sadness, grief, and loss
// =============================================================================

export const oceanScenarios: Scenario[] = [
  // =========================================================================
  // Kapitel 1: Tiefe Wasser (Deep Waters)
  // Teaches: Recognizing sadness in others
  // =========================================================================
  {
    id: 'ocean-scenario-1',
    islandId: 'ocean' as IslandId,
    title: 'Tiefe Wasser',
    description: 'Am Strand triffst du Marina, die seit Wochen still und zurückgezogen ist. Lerne, Traurigkeit bei anderen zu erkennen.',
    scenes: [
      {
        id: 'o1-s1',
        speaker: 'Erzähler',
        speakerEmoji: '🌊',
        text: 'Du erreichst die Ozeaninsel. Der Strand ist weit und ruhig, die Wellen rollen sanft ans Ufer. Weiter unten am Wasser sitzt ein Mädchen allein im Sand. Sie ist vielleicht 13, hat dunkle Haare und hält etwas Kleines in den Händen. Du bemerkst, dass sie sich nicht bewegt, nicht aufschaut, nicht reagiert. Sie sitzt einfach da, als wäre die Welt um sie herum verschwunden. Ein paar andere Jugendliche spielen weiter hinten Volleyball, aber sie schauen nicht zu dem Mädchen hinüber. Es ist, als wäre sie unsichtbar.',
        choices: [
          {
            id: 'o1-s1-c1',
            text: 'Gehe langsam und vorsichtig zu ihr und setze dich in einiger Entfernung hin',
            consequence: 'Du gibst Marina Raum und zeigst gleichzeitig, dass du sie siehst. In der Psychologie nennt man das "stille Präsenz" - manchmal ist das Wichtigste, was wir für traurige Menschen tun können, einfach da zu sein, ohne etwas zu fordern.',
            nextSceneId: 'o1-s2',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 1 }
          },
          {
            id: 'o1-s1-c2',
            text: 'Versuche, sie aufzumuntern: "Hey! Willst du nicht mitspielen? Das Wetter ist super!"',
            consequence: 'Dein Wunsch, sie aufzuheitern, kommt aus einem guten Herzen. Aber manchmal kann zu schnelles Aufmuntern das Gegenteil bewirken. Traurige Menschen fühlen sich dann oft missverstanden, weil ihr Schmerz nicht ernst genommen wird. Psychologen nennen das "toxische Positivität".',
            nextSceneId: 'o1-s2',
            points: { empathyPoints: 1, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'o1-s1-c3',
            text: 'Beobachte sie erstmal aus der Ferne und achte auf Anzeichen, wie es ihr geht',
            consequence: 'Du nimmst dir Zeit, die Situation zu verstehen, bevor du handelst. Du bemerkst: Sie hält eine Muschelkette fest umklammert, ihre Schultern sind nach vorne gebeugt, und ab und zu wischt sie sich über die Augen. Das sind typische Zeichen von Traurigkeit: Rückzug, gekrümmte Körperhaltung und wiederholte kleine Gesten an einem Erinnerungsstück.',
            nextSceneId: 'o1-s2',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'o1-s2',
        speaker: 'Marina',
        speakerEmoji: '🐚',
        text: 'Als du näherkommst, schaut das Mädchen kurz auf. Ihre Augen sind gerötet. "Oh... hallo", sagt sie leise und dreht die Muschelkette in ihren Händen. "Ich bin Marina." Sie schaut wieder aufs Meer. "Tut mir leid, ich bin gerade keine gute Gesellschaft." Dann schweigt sie. Du bemerkst, dass ihre Kleidung ein bisschen zerknittert ist, als hätte sie sich heute Morgen nicht viel Mühe gegeben. Unter ihren Augen sind dunkle Schatten.',
        choices: [
          {
            id: 'o1-s2-c1',
            text: '"Das ist okay. Du musst keine gute Gesellschaft sein. Ich sitze einfach hier."',
            consequence: 'Du nimmst den Druck von Marina, "funktionieren" zu müssen. Viele traurige Menschen fühlen sich schuldig, weil sie keine gute Laune haben. Indem du sagst, dass sie nichts leisten muss, gibst du ihr Erlaubnis, einfach zu fühlen, was sie fühlt. Das ist ein wichtiger erster Schritt.',
            nextSceneId: 'o1-s3',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'o1-s2-c2',
            text: '"Die Kette ist schön. Bedeutet sie dir etwas Besonderes?"',
            consequence: 'Du zeigst ehrliches Interesse an dem, was Marina wichtig ist. Fragen über bedeutsame Gegenstände können trauernden Menschen helfen, über ihre Gefühle zu sprechen, ohne direkt nach dem Schmerz gefragt zu werden. Es ist ein sanfter Einstieg.',
            nextSceneId: 'o1-s3',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'o1-s2-c3',
            text: '"Ich heiße übrigens... Ist alles okay bei dir? Du siehst traurig aus."',
            consequence: 'Du sprichst direkt an, was du siehst. Das kann mutig sein, aber manche Menschen fühlen sich überrumpelt, wenn ihre Traurigkeit so direkt benannt wird. Es ist gut, aufmerksam zu sein, aber manchmal braucht Vertrauen etwas Zeit, bevor man über tiefe Gefühle reden kann.',
            nextSceneId: 'o1-s3',
            points: { empathyPoints: 2, insightPoints: 1, couragePoints: 3 }
          }
        ]
      },
      {
        id: 'o1-s3',
        speaker: 'Marina',
        speakerEmoji: '🐚',
        text: 'Marina dreht die Muschelkette zwischen ihren Fingern. "Meine Freundin Lara hat mich letzte Woche gefragt, ob ich ins Kino will. Ich habe nein gesagt. Und die Woche davor auch. Und davor." Sie zuckt die Schultern. "Ich habe keine Lust mehr auf... irgendetwas. Fußball war früher mein Lieblingssport. Jetzt schaue ich nicht mal mehr die Ergebnisse nach." Sie schaut dich an. "Findest du das komisch?"',
        choices: [
          {
            id: 'o1-s3-c1',
            text: '"Nein, das ist nicht komisch. Manchmal verliert man die Freude an Dingen, wenn man traurig ist."',
            consequence: 'Genau richtig. Was Marina beschreibt, nennen Psychologen "Anhedonie" - den Verlust von Freude an Dingen, die man sonst gerne macht. Das ist eines der häufigsten Zeichen von tiefer Traurigkeit. Es bedeutet nicht, dass man diese Dinge nie wieder mögen wird. Es bedeutet, dass die Trauer gerade so viel Platz einnimmt, dass für andere Gefühle wenig Raum bleibt.',
            nextSceneId: 'o1-s4',
            points: { empathyPoints: 3, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'o1-s3-c2',
            text: '"Seit wann fühlst du dich so? Ist etwas passiert?"',
            consequence: 'Du fragst vorsichtig nach der Ursache. Das ist wichtig, denn Traurigkeit hat oft einen Auslöser, auch wenn er nicht immer sofort sichtbar ist. Manchmal dauert es Wochen oder Monate, bis die Trauer richtig spürbar wird. Psychologen nennen das "verzögerte Trauerreaktion".',
            nextSceneId: 'o1-s4',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'o1-s3-c3',
            text: '"Ich kenne das Gefühl. Als wäre man unter Wasser und alles ist gedämpft."',
            consequence: 'Du teilst dein eigenes Verständnis, ohne Marinas Erfahrung kleinzumachen. Das Bild von "unter Wasser sein" ist sehr treffend - Traurigkeit kann sich anfühlen, als wäre alles gedämpft, verlangsamt und weit weg. Wenn wir jemandem zeigen, dass wir ähnliches kennen, fühlt sich die Person weniger allein.',
            nextSceneId: 'o1-s4',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'o1-s4',
        speaker: 'Erzähler',
        speakerEmoji: '🌊',
        text: 'Marina schweigt eine Weile. Dann sagt sie: "Lara hat aufgehört, mich zu fragen. Ich glaube, sie denkt, ich mag sie nicht mehr. Aber das stimmt nicht. Ich... ich kann gerade einfach nicht." Eine Welle spült über ihre Füße, und sie zieht sie nicht zurück. "Mein Bruder sagt, ich soll mich zusammenreißen. Meine Mutter macht sich Sorgen. Und ich sitze hier und weiß nicht mal, warum ich so... leer bin."',
        choices: [
          {
            id: 'o1-s4-c1',
            text: '"Leer sein ist auch ein Gefühl. Du musst dich nicht zusammenreißen."',
            consequence: 'Das ist eine wichtige Erkenntnis. Traurigkeit zeigt sich nicht nur als Weinen - manchmal ist sie eine Leere, eine Taubheit, ein Gefühl von "nichts". Das nennt man "emotionale Taubheit". Sie ist ein Schutzmechanismus: Wenn der Schmerz zu groß wird, schaltet unser Gehirn die Gefühle herunter, um uns zu schützen.',
            nextSceneId: 'o1-s5',
            points: { empathyPoints: 3, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'o1-s4-c2',
            text: '"Vielleicht könntest du Lara sagen, dass du sie noch magst, aber gerade eine schwere Zeit hast?"',
            consequence: 'Ein praktischer und kluger Vorschlag. Wenn wir traurig sind, ziehen wir uns oft zurück - und die Menschen um uns herum verstehen nicht warum. Einfache Worte wie "Ich mag dich noch, aber mir geht es gerade nicht gut" können Freundschaften retten und gleichzeitig ehrlich sein.',
            nextSceneId: 'o1-s5',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'o1-s4-c3',
            text: '"Dein Bruder meint es wahrscheinlich gut, aber Zusammenreißen funktioniert bei Traurigkeit nicht."',
            consequence: 'Du sprichst eine wichtige Wahrheit aus. "Reiß dich zusammen" ist einer der häufigsten und schädlichsten Sätze, die traurige Menschen hören. Traurigkeit ist kein Schalter, den man umlegen kann. Sie braucht Zeit, Verständnis und Geduld - von anderen und von sich selbst.',
            nextSceneId: 'o1-s5',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'o1-s5',
        speaker: 'Marina',
        speakerEmoji: '🐚',
        text: 'Marina schaut dich zum ersten Mal richtig an. Ihre Augen sind feucht, aber da ist auch etwas anderes - eine winzige Erleichterung. "Danke", sagt sie leise. "Das hat mir noch niemand so gesagt." Sie hält die Muschelkette hoch. "Die hat mir meine Oma geschenkt. Sie..." Marina schluckt. "Sie ist vor zwei Monaten gestorben." Eine Träne fällt in den Sand. "Ich glaube, deshalb bin ich so. Ich vermisse sie so sehr, dass ich vergessen habe, wie sich alles andere anfühlt."',
        choices: [
          {
            id: 'o1-s5-c1',
            text: 'Schweige einen Moment und lass die Worte wirken, bevor du antwortest',
            consequence: 'Manchmal ist Stille das Beste, was wir anbieten können. Du gibst Marina Raum für ihre Tränen, ohne sie zu unterbrechen. Traurigkeit zeigt sich auf viele verschiedene Weisen. Manche Menschen weinen, andere ziehen sich zurück. Marina hat beides getan - und jetzt, wo sie es aussprechen kann, ist der erste Schritt getan.',
            nextSceneId: null,
            points: { empathyPoints: 3, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'o1-s5-c2',
            text: '"Deine Oma klingt wie ein besonderer Mensch. Willst du mir von ihr erzählen?"',
            consequence: 'Du lenkst den Blick von der Trauer auf die Erinnerung. Über verstorbene geliebte Menschen zu reden, ist ein wichtiger Teil des Trauerprozesses. Viele Menschen haben Angst, den Trauernden damit "trauriger zu machen" - aber in Wirklichkeit hilft es, über die Person zu sprechen, die man vermisst. Die Erinnerung hält die Verbindung lebendig.',
            nextSceneId: null,
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'o1-s5-c3',
            text: '"Es tut mir sehr leid. Du trägst das schon zwei Monate mit dir. Das ist eine schwere Last."',
            consequence: 'Du erkennst an, wie lange Marina schon leidet. Traurigkeit zeigt sich auf viele verschiedene Weisen - und Marinas Rückzug, ihr Interessenverlust und ihre Erschöpfung sind alles normale Reaktionen auf einen großen Verlust. Indem du ihre Last anerkennst, zeigst du ihr, dass sie nicht übertreibt und dass ihre Gefühle berechtigt sind.',
            nextSceneId: null,
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 3 }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // Kapitel 2: Der Sturm (The Storm)
  // Teaches: Stages of grief, that grief isn't linear, guilt is common
  // =========================================================================
  {
    id: 'ocean-scenario-2',
    islandId: 'ocean' as IslandId,
    title: 'Der Sturm',
    description: 'Marina erzählt von ihrer Großmutter und den Schuldgefühlen, die sie plagen. Lerne, warum Trauer keine gerade Linie ist.',
    scenes: [
      {
        id: 'o2-s1',
        speaker: 'Marina',
        speakerEmoji: '🐚',
        text: 'Du triffst Marina am nächsten Tag am selben Platz. Aber heute ist etwas anders - der Himmel ist grau, und das Meer ist unruhig. "Ich habe letzte Nacht schlecht geschlafen", sagt Marina. Sie dreht die Muschelkette nervös zwischen den Fingern. "Ich hatte einen Traum von meiner Oma. Wir waren in ihrer Küche, sie hat Kuchen gebacken, und alles war normal. Und dann bin ich aufgewacht und... es hat mich getroffen wie eine Welle. Sie ist weg. Wirklich weg." Ihre Stimme wird härter. "Und weißt du, was mich am meisten wütend macht?"',
        choices: [
          {
            id: 'o2-s1-c1',
            text: '"Was macht dich wütend?" - Lass sie erzählen',
            consequence: 'Du gibst Marina den Raum, ihre Wut auszusprechen. Viele Menschen sind überrascht, dass Wut ein normaler Teil der Trauer ist. Die Psychologin Elisabeth Kübler-Ross hat beschrieben, dass Trauer verschiedene Phasen haben kann: Verleugnung, Wut, Verhandeln, Depression und Akzeptanz. Diese Phasen kommen nicht immer in der gleichen Reihenfolge und können sich wiederholen.',
            nextSceneId: 'o2-s2',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 1 }
          },
          {
            id: 'o2-s1-c2',
            text: '"Wütend? Ich dachte, du bist traurig?"',
            consequence: 'Eine verständliche Reaktion. Die meisten Menschen denken, dass Trauer nur aus Traurigkeit besteht. Aber in Wirklichkeit ist Trauer ein Mischmasch aus vielen Gefühlen: Traurigkeit, Wut, Angst, Schuld, Erleichterung und sogar manchmal kurze Momente von Freude. All diese Gefühle sind normal und erlaubt.',
            nextSceneId: 'o2-s2',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'o2-s1-c3',
            text: '"Träume von Menschen, die wir vermissen, können sehr schmerzhaft sein."',
            consequence: 'Du zeigst Verständnis für die besondere Härte solcher Träume. Im Traum ist alles noch real, und das Aufwachen bringt den Verlust noch einmal frisch zurück. Forscher haben herausgefunden, dass solche Träume häufig sind und sogar Teil des Trauerprozesses sein können - das Gehirn verarbeitet den Verlust.',
            nextSceneId: 'o2-s2',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'o2-s2',
        speaker: 'Marina',
        speakerEmoji: '🐚',
        text: '"Ich bin wütend auf mich selbst!" Marinas Stimme bricht. "Oma hat in den letzten Monaten immer angerufen und gefragt, ob ich sie besuchen komme. Und ich... ich hatte immer etwas Besseres zu tun. Fußball. Freunde. Handy." Sie ballt die Fäuste. "Letzten Sonntag sollte ich kommen. Ich habe abgesagt, weil Lara Geburtstag hatte. Am Montag war Oma im Krankenhaus. Am Mittwoch..." Sie kann nicht weitersprechen.',
        choices: [
          {
            id: 'o2-s2-c1',
            text: '"Marina, das ist nicht deine Schuld. Du konntest das nicht wissen."',
            consequence: 'Schuldgefühle sind einer der schmerzhaftesten Teile der Trauer. Fast jeder, der einen geliebten Menschen verliert, denkt: "Hätte ich doch..." oder "Warum habe ich nicht...". Diese Gedanken sind normal, aber sie stimmen meistens nicht. Du konntest die Zukunft nicht vorhersehen. Schuld in der Trauer nennt man "Survivor\'s Guilt" - und sie braucht besondere Aufmerksamkeit.',
            nextSceneId: 'o2-s3',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'o2-s2-c2',
            text: '"Deine Oma wusste, dass du sie liebst. Daran ändert ein verpasster Besuch nichts."',
            consequence: 'Ein wichtiger Gedanke. Liebe misst sich nicht an einem einzelnen Tag. Deine Oma kannte Marina ihr ganzes Leben lang und wusste ganz sicher, wie sehr Marina sie liebte. Trauernde Menschen neigen dazu, sich auf das zu konzentrieren, was sie NICHT getan haben, und vergessen dabei alles, was sie getan haben.',
            nextSceneId: 'o2-s3',
            points: { empathyPoints: 3, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'o2-s2-c3',
            text: 'Sage nichts, aber rücke näher zu ihr und zeige, dass du zuhörst',
            consequence: 'Manchmal gibt es nichts, was man sagen kann, und das ist okay. Deine Nähe und dein Zuhören sagen mehr als Worte. In der Trauerbegleitung nennt man das "Holding Space" - einen sicheren Raum halten, in dem jemand fühlen darf, was er fühlt, ohne dass man es reparieren muss.',
            nextSceneId: 'o2-s3',
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 3 }
          }
        ]
      },
      {
        id: 'o2-s3',
        speaker: 'Marina',
        speakerEmoji: '🐚',
        text: '"Gestern war ein guter Tag", sagt Marina nach einer Weile. "Ich habe sogar gelacht, als mein kleiner Bruder etwas Lustiges gemacht hat. Und dann..." Sie schüttelt den Kopf. "Dann habe ich mich sofort schrecklich gefühlt. Wie kann ich lachen, wenn Oma gerade erst gestorben ist? Ist das nicht respektlos?" Das Meer wird unruhiger. Die Wellen schlagen jetzt höher. Als ob Marinas Gefühle sich im Wasser spiegeln.',
        choices: [
          {
            id: 'o2-s3-c1',
            text: '"Lachen heißt nicht, dass du nicht trauerst. Beides kann gleichzeitig existieren."',
            consequence: 'Das ist eine der wichtigsten Lektionen über Trauer: Sie ist nicht linear. Man kann morgens weinen und mittags lachen, und beides ist echt. Psychologen sprechen vom "Dualen Prozessmodell der Trauer" - wir pendeln zwischen Trauern und dem normalen Leben hin und her. Das ist gesund und notwendig. Deine Oma hätte gewollt, dass du auch wieder lachst.',
            nextSceneId: 'o2-s4',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'o2-s3-c2',
            text: '"Deine Oma hätte bestimmt gewollt, dass du lachst. Das ist kein Verrat."',
            consequence: 'Eine tröstliche Wahrheit. Trauernde haben oft Angst, dass Glücklichsein bedeutet, den Verstorbenen zu vergessen. Aber das Gegenteil ist wahr: Weiterleben und Freude empfinden ist kein Verrat an der Liebe. Es ist ein Zeichen dafür, dass die Liebe stark genug ist, um auch neben der Trauer Platz zu haben.',
            nextSceneId: 'o2-s4',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'o2-s3-c3',
            text: '"Trauer funktioniert nicht wie ein Lichtschalter - an oder aus. Sie kommt in Wellen."',
            consequence: 'Ein perfektes Bild, besonders hier am Meer. Trauer kommt und geht wie Wellen. Manche Tage sind ruhig, manche sind stürmisch. Trauer hat kein Zeitlimit. Es ist okay, traurig zu sein, so lange du es brauchst. Und es ist genauso okay, zwischendurch zu lachen, zu spielen und das Leben zu genießen.',
            nextSceneId: 'o2-s4',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'o2-s4',
        speaker: 'Erzähler',
        speakerEmoji: '🌊',
        text: 'Plötzlich bricht ein richtiger Sturm los. Der Wind heult, die Wellen werden riesig. Marina klammert sich an ihre Muschelkette. "Wie soll ich das aushalten?" ruft sie über den Wind. "Einen Tag bin ich wütend, dann traurig, dann fühle ich gar nichts, dann schuldig, dann vermisse ich sie so sehr, dass es wehtut, und dann bin ich wieder wütend! Es hört nicht auf!" Tränen mischen sich mit dem Regen auf ihrem Gesicht.',
        choices: [
          {
            id: 'o2-s4-c1',
            text: '"All diese Gefühle gehören zur Trauer. Es gibt keinen falschen Weg zu trauern."',
            consequence: 'Genau. Was Marina beschreibt, sind verschiedene Teile des Trauerprozesses: Wut, Traurigkeit, Taubheit, Schuld, Sehnsucht. Sie kommen nicht in einer ordentlichen Reihenfolge. Manchmal erlebst du alle an einem einzigen Tag. Das ist chaotisch und anstrengend, aber es ist der Weg, wie unser Herz heilt. Trauer ist keine Krankheit, die man heilt - sie ist ein Prozess, den man durchlebt.',
            nextSceneId: 'o2-s5',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'o2-s4-c2',
            text: 'Greife ihre Hand und halte sie fest. "Du musst das nicht allein aushalten."',
            consequence: 'Körperlicher Kontakt und die Gewissheit, nicht allein zu sein, sind in stürmischen Momenten besonders wichtig. Studien zeigen, dass Berührung tatsächlich Stresshormone senken kann. Und das Wichtigste: Niemand sollte allein trauern müssen. Trauer wird leichter, wenn wir sie teilen - nicht weil der Schmerz weniger wird, sondern weil wir ihn gemeinsam tragen.',
            nextSceneId: 'o2-s5',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 3 }
          },
          {
            id: 'o2-s4-c3',
            text: '"Der Sturm wird vorbeigehen, Marina. Stürme gehen immer vorbei."',
            consequence: 'Ein Versprechen, das stimmt. Kein Sturm dauert ewig - weder draußen noch in uns. Die intensivsten Wellen der Trauer werden mit der Zeit weniger häufig und weniger überwältigend. Das bedeutet nicht, dass die Trauer verschwindet, aber sie verändert sich. Sie wird tragbarer. Wie ein schwerer Rucksack, an den sich dein Rücken langsam gewöhnt.',
            nextSceneId: 'o2-s5',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'o2-s5',
        speaker: 'Marina',
        speakerEmoji: '🐚',
        text: 'Der Sturm legt sich langsam. Die Wolken reißen auf, und ein einzelner Sonnenstrahl fällt aufs Wasser. Marina atmet tief. "Weißt du, was Oma immer gesagt hat? \'Nach jedem Sturm kommt ein Regenbogen. Man muss nur lange genug hinschauen.\'" Sie lächelt zum ersten Mal - ein kleines, zartes Lächeln. "Ich glaube nicht, dass der Schmerz bald aufhört. Aber... vielleicht muss ich aufhören, gegen ihn zu kämpfen." Sie hält die Muschelkette ans Herz. "Trauer hat kein Zeitlimit, oder?"',
        choices: [
          {
            id: 'o2-s5-c1',
            text: '"Nein. Und es ist okay, traurig zu sein, so lange du es brauchst."',
            consequence: 'Trauer hat kein Zeitlimit. Es ist okay, traurig zu sein, so lange du es brauchst. Manche Menschen brauchen Wochen, manche Monate, manche Jahre. Es gibt keine richtige oder falsche Geschwindigkeit. Was zählt, ist, dass du dir erlaubst zu fühlen und dass du Menschen um dich hast, die das verstehen. Marina hat heute einen wichtigen Schritt gemacht: Sie hat ihre Trauer geteilt.',
            nextSceneId: null,
            points: { empathyPoints: 3, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'o2-s5-c2',
            text: '"Deine Oma klingt wie eine weise Frau. Sie lebt in dir weiter."',
            consequence: 'Die Menschen, die wir lieben, hinterlassen Spuren in uns - in unseren Gewohnheiten, unseren Werten, sogar in unseren Lieblingssprüchen. Marinas Oma lebt weiter in der Art, wie Marina die Muschelkette hält, in ihren Erinnerungen und in der Weisheit, die sie weitergegeben hat. Das ist die tiefste Wahrheit über Verlust: Liebe endet nicht mit dem Tod.',
            nextSceneId: null,
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'o2-s5-c3',
            text: '"Und wenn der nächste Sturm kommt, bin ich hier. Du musst ihn nicht allein durchstehen."',
            consequence: 'Das ist vielleicht das Wichtigste, was du sagen kannst. Trauer ist leichter, wenn jemand da ist. Nicht jemand, der alles löst oder die Trauer wegnimmt - sondern jemand, der bleibt, auch wenn es stürmisch wird. Marina hat heute gelernt, dass ihre Trauer sie nicht allein machen muss. Und du hast gelernt, dass man kein Experte sein muss, um zu helfen. Man muss einfach da sein.',
            nextSceneId: null,
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 3 }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // Kapitel 3: Unter der Oberfläche (Beneath the Surface)
  // Teaches: Different types of loss, healthy coping strategies, concrete tools
  // =========================================================================
  {
    id: 'ocean-scenario-3',
    islandId: 'ocean' as IslandId,
    title: 'Unter der Oberfläche',
    description: 'Dein bester Freund zieht in ein anderes Land. Du erlebst selbst, was Verlust bedeutet - und lernst Werkzeuge, die helfen.',
    scenes: [
      {
        id: 'o3-s1',
        speaker: 'Erzähler',
        speakerEmoji: '🌊',
        text: 'Heute triffst du Marina nicht am Strand, denn du hast selbst schwere Nachrichten bekommen. Dein bester Freund Noah hat dir gestern erzählt, dass seine Familie nach Portugal zieht. In drei Wochen. Du sitzt jetzt an dem Platz, an dem sonst Marina sitzt, und starrst aufs Meer. Es fühlt sich an, als hätte jemand dir den Boden unter den Füßen weggezogen. Noah und du - ihr kennt euch seit der Grundschule. Fünf Jahre. Alles zusammen gemacht. Und jetzt?',
        choices: [
          {
            id: 'o3-s1-c1',
            text: 'Sitze still da und versuche, deine Gefühle einzuordnen',
            consequence: 'Du versuchst, zu verstehen, was du fühlst. Das ist schwerer, als es klingt. Verlust kommt nicht nur durch Tod - der Wegzug eines besten Freundes, das Ende einer Freundschaft, ein Schulwechsel oder sogar der Verlust eines Haustiers können echte Trauer auslösen. Dein Schmerz ist genauso gültig wie Marinas, auch wenn er anders aussieht.',
            nextSceneId: 'o3-s2',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'o3-s1-c2',
            text: 'Lass die Wut raus: "Das ist so unfair!"',
            consequence: 'Ja, es ist unfair. Und es ist absolut okay, wütend zu sein. Wut ist oft die erste Reaktion auf Verlust, besonders wenn wir nichts daran ändern können. Es ist wichtig zu wissen: Verschiedene Arten von Verlust lösen verschiedene Gefühle aus. Bei Noahs Wegzug ist Wut besonders verständlich, weil es sich wie eine Entscheidung anfühlt, die jemand anderes über dein Leben getroffen hat.',
            nextSceneId: 'o3-s2',
            points: { empathyPoints: 1, insightPoints: 2, couragePoints: 3 }
          },
          {
            id: 'o3-s1-c3',
            text: 'Versuche, dir einzureden, dass es nicht so schlimm ist - andere haben es schlimmer',
            consequence: 'Stopp. Deine Gefühle mit denen anderer zu vergleichen, hilft nicht. Das nennt man "Gefühls-Vergleich" und es führt nur dazu, dass du dich schlecht fühlst, WEIL du dich schlecht fühlst. Verlust ist Verlust. Ob jemand stirbt, wegzieht oder eine Freundschaft endet - der Schmerz ist real. Du darfst traurig sein, ohne dich dafür rechtfertigen zu müssen.',
            nextSceneId: 'o3-s2',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'o3-s2',
        speaker: 'Marina',
        speakerEmoji: '🐚',
        text: 'Marina kommt den Strand entlang und setzt sich zu dir. Sie sagt nichts, wartet einfach. Als du ihr von Noah erzählst, nickt sie. "Ich kenne das Gefühl. Nicht genau dasselbe, aber... das Gefühl, dass jemand Wichtiges weggeht." Sie denkt nach. "Weißt du, meine Therapeutin hat mir etwas Hilfreiches erklärt. Sie hat gesagt, es gibt viele Arten von Verlust. Tod ist eine. Aber Umzug, Scheidung der Eltern, das Ende einer Freundschaft, sogar eine große Veränderung wie eine neue Schule - das alles ist Verlust. Und jeder Verlust verdient Trauer."',
        choices: [
          {
            id: 'o3-s2-c1',
            text: '"Aber Noah stirbt ja nicht. Darf ich trotzdem SO traurig sein?"',
            consequence: 'Ja, du darfst. Dein Gehirn unterscheidet nicht zwischen "schlimmem" und "weniger schlimmem" Verlust. Verlust ist Verlust. Was sich ändert, ist die Art der Trauer. Bei einem Umzug trauerst du um die Nähe, die täglichen Momente, die spontanen Treffen. Diese Alltagsmomente sind es, die eine Freundschaft ausmachen - und genau sie gehen verloren. Das ist ein echter, tiefer Schmerz.',
            nextSceneId: 'o3-s3',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'o3-s2-c2',
            text: '"Du gehst zu einer Therapeutin? Hilft das?"',
            consequence: 'Marina nickt. Mit einem Therapeuten oder einer Therapeutin zu reden ist eines der besten Dinge, die man bei Trauer tun kann. Es ist kein Zeichen von Schwäche - es ist ein Zeichen von Stärke. Ein Therapeut ist wie ein Trainer für deine Gefühle: Er hilft dir, zu verstehen, was passiert, und gibt dir Werkzeuge an die Hand. Verlust ist ein Teil des Lebens. Es zeigt, wie viel dir jemand bedeutet hat.',
            nextSceneId: 'o3-s3',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'o3-s2-c3',
            text: '"Was hat dir am meisten geholfen, als es am schlimmsten war?"',
            consequence: 'Eine kluge Frage. Von Menschen zu lernen, die Ähnliches erlebt haben, ist wertvoll. Jeder findet seinen eigenen Weg durch die Trauer, aber es gibt bewährte Strategien, die vielen Menschen helfen. Marina wird dir gleich einige davon zeigen.',
            nextSceneId: 'o3-s3',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'o3-s3',
        speaker: 'Marina',
        speakerEmoji: '🐚',
        text: 'Marina holt eine kleine Box aus ihrem Rucksack. "Das ist meine Erinnerungsbox", sagt sie. "Meine Therapeutin hat mir den Tipp gegeben. Da drin sind Fotos von meiner Oma, ein Rezept für ihren Kuchen, eine getrocknete Blume aus ihrem Garten und ein Brief, den ich ihr geschrieben habe - auch wenn sie ihn nie lesen wird." Sie hält die Box vorsichtig. "An schlechten Tagen öffne ich sie und erinnere mich. An guten Tagen auch. Es hilft."',
        choices: [
          {
            id: 'o3-s3-c1',
            text: '"Eine Erinnerungsbox! Das könnte ich für Noah und mich auch machen."',
            consequence: 'Ja! Eine Erinnerungsbox (oder "Memory Box") ist ein wunderbares Werkzeug. Du kannst Fotos, kleine Gegenstände, Zettel mit Insiderwitzen, Kinokarten oder alles sammeln, was dich an die Person erinnert. Es gibt dir etwas Greifbares, wenn die Erinnerungen sich zu flüchtig anfühlen. Und das Beste: Du kannst sie mit Noah zusammen füllen, bevor er geht!',
            nextSceneId: 'o3-s4',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'o3-s3-c2',
            text: '"Du hast ihr einen Brief geschrieben? Wie war das?"',
            consequence: 'Marina lächelt. "Schwer. Und gut." Briefe schreiben an Menschen, die wir vermissen, ist eine kraftvolle Technik. Man kann Dinge sagen, die man nie gesagt hat. Man kann sich entschuldigen, danken oder einfach erzählen, was gerade passiert. Der Brief muss nie abgeschickt werden - der Akt des Schreibens selbst ist heilend. Psychologen nennen das "expressives Schreiben".',
            nextSceneId: 'o3-s4',
            points: { empathyPoints: 3, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'o3-s3-c3',
            text: '"Gibt es noch andere Sachen, die dir geholfen haben?"',
            consequence: 'Marina zählt auf: "Mit meiner Mutter reden, auch wenn es weh tut. In mein Tagebuch schreiben. Spazieren gehen, wenn die Gefühle zu groß werden. Und manchmal einfach weinen, ohne es zu unterdrücken." Es gibt viele gesunde Wege, mit Verlust umzugehen: Bewegung, kreatives Ausleben, mit vertrauenswürdigen Erwachsenen reden, Rituale schaffen. Wichtig ist: Verdrängen hilft nicht. Fühlen hilft.',
            nextSceneId: 'o3-s4',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'o3-s4',
        speaker: 'Erzähler',
        speakerEmoji: '🌊',
        text: 'Das Meer wird ruhiger. Du denkst an Noah. An die tausend Nachmittage, die ihr zusammen verbracht habt. An die Insiderwitze, die sonst niemand versteht. An sein Lachen. Und dann merkst du: Die Trauer zeigt dir, wie viel er dir bedeutet. "Weißt du was?", sagst du zu Marina. "Ich glaube, ich werde Noah einen Brief schreiben. Nicht auf Papier. Sondern richtig. Einen Brief, den ich ihm gebe, bevor er geht. Damit er weiß, was unsere Freundschaft für mich bedeutet."',
        choices: [
          {
            id: 'o3-s4-c1',
            text: '"Und ich werde ihn bitten, mir auch einen zu schreiben."',
            consequence: 'Gegenseitiges Briefeschreiben ist eine wunderschöne Art, eine Freundschaft zu würdigen. Ihr könnt die Briefe öffnen, wenn ihr euch vermisst. Es gibt euch beiden etwas Festes, an dem ihr euch festhalten könnt. Verlust ist ein Teil des Lebens. Es zeigt, wie viel dir jemand bedeutet hat. Und das Schöne ist: Noahs Wegzug muss nicht das Ende eurer Freundschaft sein - nur eine Veränderung.',
            nextSceneId: 'o3-s5',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'o3-s4-c2',
            text: '"Und wir planen regelmäßige Videocalls. Jeden Sonntag."',
            consequence: 'Konkrete Pläne für die Zukunft sind unglaublich hilfreich bei Trennungstrauer. Wenn du weißt, WANN du die Person wiedersehen oder -hören wirst, fühlt sich der Abschied weniger endgültig an. Regelmäßige Videocalls, gemeinsame Online-Spiele oder gleichzeitig denselben Film schauen - Kreativität kann Distanz überbrücken.',
            nextSceneId: 'o3-s5',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'o3-s4-c3',
            text: '"Und ich erzähle meiner Mutter, wie ich mich fühle. Sie weiß es wahrscheinlich noch nicht."',
            consequence: 'Das ist mutig und weise. Vertrauenswürdige Erwachsene - Eltern, Lehrer, Schulberater oder andere Bezugspersonen - können wichtige Stützen sein. Sie können nicht den Schmerz wegnehmen, aber sie können zuhören, verstehen und manchmal auch praktisch helfen. Viele Jugendliche denken, sie müssten allein zurechtkommen. Aber Hilfe annehmen ist Stärke, keine Schwäche.',
            nextSceneId: 'o3-s5',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 3 }
          }
        ]
      },
      {
        id: 'o3-s5',
        speaker: 'Marina',
        speakerEmoji: '🐚',
        text: 'Marina lächelt dich an - ein echtes, warmes Lächeln. "Weißt du, was lustig ist? Vor ein paar Tagen warst du es, der mir geholfen hat. Und heute helfe ich dir." Sie schaut aufs Meer. "Meine Oma hat immer gesagt: Geteiltes Leid ist halbes Leid. Ich fand den Spruch immer doof. Aber... er stimmt." Sie steht auf und reicht dir die Hand. "Komm. Lass uns zusammen eine Erinnerungsbox bauen. Für Noah. Für meine Oma. Für alle, die wir vermissen. Denn Erinnern ist kein Festhalten - es ist Weitertragen."',
        choices: [
          {
            id: 'o3-s5-c1',
            text: 'Nimm ihre Hand und steh auf. "Zusammen ist besser als allein."',
            consequence: 'Verlust ist ein Teil des Lebens. Es zeigt, wie viel dir jemand bedeutet hat. Heute hast du gelernt, dass es viele Arten von Verlust gibt und dass jeder Verlust echte Trauer verdient. Du hast konkrete Werkzeuge kennengelernt: Erinnerungsboxen, Briefe schreiben, mit Vertrauenspersonen reden, regelmäßigen Kontakt planen. Das Wichtigste aber: Du bist nicht allein mit deinem Schmerz.',
            nextSceneId: null,
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'o3-s5-c2',
            text: '"Danke, Marina. Für alles. Ich bin froh, dass wir uns gefunden haben."',
            consequence: 'Manchmal bringt Verlust auch Neues hervor. Du hast Noah (noch) nicht verloren - aber du hast Marina gefunden. Verlust und Gewinn sind manchmal enger verbunden, als wir denken. Das bedeutet nicht, dass der Verlust weniger wehtut. Es bedeutet, dass das Leben selbst in traurigen Zeiten weitergeht und neue Verbindungen schafft. Trauer und Hoffnung können nebeneinander existieren.',
            nextSceneId: null,
            points: { empathyPoints: 3, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'o3-s5-c3',
            text: '"Ich nehme die Muschelkette als Symbol mit. Für alles, was wir am Meer gelernt haben."',
            consequence: 'Symbole und Rituale sind mächtige Werkzeuge in der Trauer. Ein Gegenstand, der dich an einen Menschen oder einen wichtigen Moment erinnert, kann wie ein Anker wirken, wenn die Gefühle dich überwältigen. Du trägst jetzt nicht nur die Kette, sondern auch die Erkenntnis: Verlust macht dich nicht schwächer. Er zeigt dir, wie tief du lieben kannst.',
            nextSceneId: null,
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 3 }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // Kapitel 4: Neue Horizonte (New Horizons)
  // Teaches: Finding meaning after loss, helping others grieve, new connections
  // =========================================================================
  {
    id: 'ocean-scenario-4',
    islandId: 'ocean' as IslandId,
    title: 'Neue Horizonte',
    description: 'Der geliebte Strandkiosk schließt für immer. Marina und du organisieren zusammen eine Abschiedsfeier und lernen, dass Trauer und Freude nebeneinander existieren können.',
    scenes: [
      {
        id: 'o4-s1',
        speaker: 'Erzähler',
        speakerEmoji: '🌊',
        text: 'Ein Schild am alten Strandkiosk bringt die Nachricht: "Liebe Gäste, nach 30 Jahren schließt unser Kiosk am Ende des Monats. Danke für alles. - Familie Berger." Du und Marina steht davor. Dieser Kiosk ist mehr als ein Laden - hier habt ihr euer erstes Eis zusammen gegessen, hier haben Generationen von Kindern ihren Sommer verbracht, und Herr Berger kannte jeden beim Namen. Um euch herum sind andere Jugendliche und Kinder, die das Schild lesen. Manche sind wütend, manche traurig, manche tun so, als wäre es ihnen egal.',
        choices: [
          {
            id: 'o4-s1-c1',
            text: 'Schaue dir die Reaktionen der anderen genau an - jeder reagiert anders',
            consequence: 'Du bemerkst, wie unterschiedlich Menschen auf denselben Verlust reagieren. Tom tritt wütend gegen einen Mülleimer. Lisa weint. Jan zuckt die Schultern und sagt "ist doch nur ein Kiosk", obwohl du siehst, dass seine Unterlippe zittert. Leyla umarmt ihre Freundin. Jeder Mensch trauert auf seine eigene Art, und keine Art ist besser oder schlechter als die andere.',
            nextSceneId: 'o4-s2',
            points: { empathyPoints: 3, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'o4-s1-c2',
            text: '"Marina, wir müssen etwas tun. Wir können ihn nicht einfach so gehen lassen."',
            consequence: 'Dein Impuls, aktiv zu werden, ist wertvoll. Wenn wir etwas verlieren, fühlen wir uns oft hilflos. Handeln - auch wenn es den Verlust nicht rückgängig macht - kann uns ein Stück Kontrolle zurückgeben. Es geht nicht darum, den Kiosk zu retten. Es geht darum, den Abschied bewusst zu gestalten statt ihn einfach passieren zu lassen.',
            nextSceneId: 'o4-s2',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 3 }
          },
          {
            id: 'o4-s1-c3',
            text: '"Es ist komisch - es ist nur ein Kiosk, aber es fühlt sich wie mehr an."',
            consequence: 'Genau. Wir trauern nicht nur um den Ort, sondern um das, wofür er steht: Sommer, Kindheit, Unbeschwertheit, Zugehörigkeit. Oft ist der Verlust eines Ortes oder einer Gewohnheit ein Symbol für einen größeren Wandel. Erwachsenwerden bedeutet auch, Dinge loszulassen. Das macht es nicht weniger schmerzhaft, aber es hilft zu verstehen, WARUM es so wehtut.',
            nextSceneId: 'o4-s2',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'o4-s2',
        speaker: 'Marina',
        speakerEmoji: '🐚',
        text: 'Marina hat eine Idee. "Weißt du, was meine Therapeutin über Rituale gesagt hat? Dass Abschiede leichter werden, wenn man ihnen eine Form gibt." Sie wird aufgeregt. "Was, wenn wir eine Abschiedsfeier organisieren? Nicht traurig und düster - sondern eine echte Feier! Mit Erinnerungen, Fotos, Musik. Jeder kann seine Lieblingserinnerung an den Kiosk mitbringen." Dann wird sie ernster. "Aber manche Leute werden traurig sein. Und manche werden wütend sein. Wie gehen wir damit um?"',
        choices: [
          {
            id: 'o4-s2-c1',
            text: '"Wir sagen allen, dass jedes Gefühl willkommen ist. Weinen, Lachen, Wut - alles darf sein."',
            consequence: 'Genau richtig. Ein heilsames Abschiedsritual gibt Raum für ALLE Gefühle. Wenn wir Menschen sagen "hier darfst du fühlen, was du fühlst", schaffen wir einen sicheren Raum. In der Trauerpsychologie nennt man das einen "Container" - einen geschützten Ort, in dem Gefühle sein dürfen, ohne bewertet zu werden.',
            nextSceneId: 'o4-s3',
            points: { empathyPoints: 3, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'o4-s2-c2',
            text: '"Wir bereiten auch eine Ecke vor, wo Leute hingehen können, wenn es ihnen zu viel wird."',
            consequence: 'Sehr einfühlsam. Eine "Ruhezone" bei emotionalen Anlässen zeigt, dass ihr versteht: Nicht jeder kann ständig unter Menschen sein, wenn er trauert. Manche brauchen Rückzugsräume. Diese Art von Voraussicht nennt man "emotionale Achtsamkeit" - du denkst an die Bedürfnisse anderer, bevor sie selbst danach fragen müssen.',
            nextSceneId: 'o4-s3',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'o4-s2-c3',
            text: '"Und wir fragen Herrn Berger, ob er auch eine Geschichte erzählen möchte."',
            consequence: 'Herrn Berger einzubeziehen ist wichtig. Vergiss nicht: Er verliert nicht nur seinen Kiosk - er verliert sein Lebenswerk. Wenn wir von Gemeinschaftsverlust reden, vergessen wir oft, dass manche Menschen stärker betroffen sind als andere. Ihm eine Stimme zu geben zeigt Respekt und Empathie auf einer tiefen Ebene.',
            nextSceneId: 'o4-s3',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'o4-s3',
        speaker: 'Erzähler',
        speakerEmoji: '🌊',
        text: 'Am Tag der Feier ist der Strand voll. Mehr Menschen als erwartet sind gekommen. Überall hängen Fotos und Zeichnungen. Jemand hat eine Pinnwand aufgestellt mit der Überschrift: "Meine Lieblingserinnerung an den Strandkiosk." Die Pinnwand ist schon halb voll. Herr Berger steht mittendrin, die Augen feucht, und liest die Zettel. Marina hält eine kurze Rede. "Wir sind heute hier, weil wir etwas verlieren, das uns wichtig ist", sagt sie mit fester Stimme. "Aber wir sind auch hier, weil das, was wir hier erlebt haben, nicht verschwindet, nur weil der Kiosk schließt." Dann passiert etwas Unerwartetes: Ein kleines Mädchen, vielleicht sechs Jahre alt, fängt an zu weinen.',
        choices: [
          {
            id: 'o4-s3-c1',
            text: 'Gehe zu dem Mädchen, knie dich hin und frage sanft, was los ist',
            consequence: 'Das Mädchen heißt Mia. "Mein Opa hat mir hier immer Eis gekauft", schluchzt sie. "Und jetzt ist er im Himmel und der Kiosk geht auch weg." Du verstehst: Für Mia ist der Kiosk mit ihrem Opa verbunden. Sein Schließen bringt die Trauer um ihren Opa zurück. Das nennt man einen "Trauer-Trigger" - ein Ereignis, das alten Schmerz wieder weckt. Du bleibst bei ihr und hörst zu.',
            nextSceneId: 'o4-s4',
            points: { empathyPoints: 3, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'o4-s3-c2',
            text: 'Schau, ob jemand aus ihrer Familie in der Nähe ist, und bringe sie zusammen',
            consequence: 'Du erkennst, dass das Mädchen gerade jemand Vertrautes braucht - jemanden, der sie kennt und halten kann. Du findest ihre große Schwester und bringst die beiden zusammen. Manchmal ist die beste Hilfe nicht, selbst zu helfen, sondern die richtige Person zu finden. Das zeigt echte emotionale Intelligenz: zu wissen, wann man selbst helfen kann und wann jemand anderes besser geeignet ist.',
            nextSceneId: 'o4-s4',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'o4-s3-c3',
            text: 'Frage Marina, ob sie mit dem Mädchen sprechen möchte - sie kennt sich mit Trauer aus',
            consequence: 'Marina geht sofort zu dem Mädchen. "Hey", sagt sie sanft. "Ich bin Marina. Ich vermisse auch jemanden. Willst du mir von deinem Opa erzählen?" Das Mädchen nickt. Siehst du, was hier passiert? Marina hat durch ihre eigene Trauer gelernt, anderen zu helfen. Das nennt man "posttraumatisches Wachstum" - die Fähigkeit, aus schmerzhaften Erfahrungen Stärke zu ziehen, die man für andere einsetzen kann.',
            nextSceneId: 'o4-s4',
            points: { empathyPoints: 3, insightPoints: 3, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'o4-s4',
        speaker: 'Marina',
        speakerEmoji: '🐚',
        text: 'Später am Abend, als die Sonne untergeht und die meisten Gäste gegangen sind, sitzt ihr zusammen am Strand - du, Marina, Herr Berger und ein paar andere. Herr Berger erzählt: "Als meine Frau vor zehn Jahren gestorben ist, habe ich gedacht, ich mache den Kiosk zu. Wozu noch? Aber dann kamen die Kinder. Jeden Tag. Mit ihren Münzen und ihren großen Augen. Und ich habe verstanden: Weitermachen ist kein Verrat. Es ist ein Geschenk." Marina drückt deine Hand. "Verstehst du?", flüstert sie. "Man kann jemanden vermissen UND neue schöne Erinnerungen machen."',
        choices: [
          {
            id: 'o4-s4-c1',
            text: '"Trauer und Freude können nebeneinander existieren. Das habe ich hier gelernt."',
            consequence: 'Das ist die vielleicht wichtigste Lektion über Verlust: Trauer und Freude schließen sich nicht aus. Du kannst deinen Opa vermissen und dich über einen Sonnenuntergang freuen. Du kannst traurig über Noahs Wegzug sein und dich auf neue Freundschaften freuen. Das Herz ist groß genug für beides. Psychologen nennen das "Koexistenz der Gefühle" - und es ist ein Zeichen von emotionaler Reife.',
            nextSceneId: 'o4-s5',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'o4-s4-c2',
            text: '"Herr Berger, Sie haben aus Ihrem Schmerz etwas Schönes gemacht."',
            consequence: 'Herr Berger lächelt. "Nicht sofort. Es hat Jahre gedauert. Und manchmal tut es immer noch weh." Das ist ehrlich und wichtig: Bedeutung zu finden nach einem Verlust ist kein schneller Prozess. Es braucht Zeit, Geduld und die Bereitschaft, weiterzugehen, auch wenn es wehtut. Aber wenn wir es schaffen, können wir anderen den Weg zeigen.',
            nextSceneId: 'o4-s5',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'o4-s4-c3',
            text: 'Schaue auf das Meer und denke an alle, die du vermisst - und an alle, die noch da sind',
            consequence: 'In diesem Moment hältst du beides in dir: die Trauer um das, was geht, und die Dankbarkeit für das, was bleibt. Das ist kein Widerspruch - das ist Leben. Du kannst jemanden vermissen UND neue schöne Erinnerungen machen. Trauer und Freude können nebeneinander existieren. Das Meer weiß das: Es hat Stürme und Sonnentage, tiefe Gräben und leuchtende Korallenriffe.',
            nextSceneId: 'o4-s5',
            points: { empathyPoints: 3, insightPoints: 3, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'o4-s5',
        speaker: 'Erzähler',
        speakerEmoji: '🌊',
        text: 'Die Feier ist vorbei. Der Strand ist leer bis auf ein paar Laternen, die noch leuchten. Marina und du steht am Wasser. "Weißt du", sagt Marina, "als du mich zum ersten Mal hier gefunden hast, dachte ich, ich wäre für immer in der Traurigkeit gefangen. Und jetzt..." Sie hebt die Muschelkette. "Ich vermisse meine Oma jeden Tag. Aber ich lebe auch jeden Tag. Und das ist kein Verrat - das ist das Geschenk, das sie mir hinterlassen hat." Sie dreht sich zu dir. "Was nimmst du mit von der Ozeaninsel? Was hast du gelernt?"',
        choices: [
          {
            id: 'o4-s5-c1',
            text: '"Dass Trauer zeigt, wie tief ich lieben kann. Und dass ich nicht allein sein muss damit."',
            consequence: 'Du trägst jetzt eine tiefe Weisheit in dir. Die Ozeaninsel hat dir gezeigt: Traurigkeit erkennen, Trauer verstehen, Verlust durchleben und Hoffnung finden. Du weißt jetzt, dass Trauer kein Feind ist, sondern ein Beweis für Liebe. Du weißt, dass es Werkzeuge gibt - Erinnerungsboxen, Briefe, Gespräche, Rituale. Und du weißt das Wichtigste: Du kannst jemanden vermissen UND neue schöne Erinnerungen machen.',
            nextSceneId: null,
            points: { empathyPoints: 3, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'o4-s5-c2',
            text: '"Dass Abschiede leichter werden, wenn man sie zusammen erlebt. Und dass Erinnern heilt."',
            consequence: 'Die Kraft der Gemeinschaft beim Trauern kann nicht unterschätzt werden. Heute habt ihr zusammen gefeiert, geweint und erinnert. Ihr habt einem kleinen Mädchen geholfen und einem alten Mann Danke gesagt. Verlust bringt Menschen zusammen, wenn man es zulässt. Und Erinnern ist kein Festhalten an der Vergangenheit - es ist eine Brücke, die das Gestern mit dem Morgen verbindet.',
            nextSceneId: null,
            points: { empathyPoints: 3, insightPoints: 3, couragePoints: 2 }
          },
          {
            id: 'o4-s5-c3',
            text: '"Dass die Wellen kommen und gehen - aber der Ozean bleibt. Und ich auch."',
            consequence: 'Ein wunderschönes Bild für alles, was du gelernt hast. Die Wellen sind die Gefühle - sie kommen, sie gehen, manchmal sanft, manchmal stürmisch. Aber der Ozean - das bist du. Tief, weit und in der Lage, alles zu halten. Du gehst von dieser Insel als jemand, der keine Angst mehr vor Trauer hat. Nicht weil es nicht mehr wehtut, sondern weil du weißt: Nach jedem Sturm kommt Ruhe. Und nach jedem Abschied gibt es neue Horizonte.',
            nextSceneId: null,
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 3 }
          }
        ]
      }
    ]
  }
];

// =============================================================================
// Activities
// =============================================================================

export const oceanActivities: Activity[] = [
  {
    id: 'ocean-activity-1',
    islandId: 'ocean' as IslandId,
    type: 'meditation',
    title: 'Meditation: Loslassen mit dem Meer',
    description: 'Eine geführte Meditation, bei der du lernst, schwere Gefühle wie Wellen kommen und gehen zu lassen. Setze dich bequem hin, schließe die Augen und stelle dir vor, du sitzt am Strand. Atme ein, wenn eine Welle kommt (4 Sekunden). Halte den Atem, wenn die Welle ihren höchsten Punkt erreicht (4 Sekunden). Atme aus, wenn die Welle sich zurückzieht (6 Sekunden). Mit jeder Welle, die geht, gibst du ein kleines Stück Schwere ab. Du musst nichts festhalten. Die Welle nimmt es mit. Wiederhole dies zehn Mal. Öffne dann die Augen und spüre, wie du dich leichter fühlst - nicht weil die Trauer weg ist, sondern weil du ihr Raum gegeben hast.',
    completed: false
  },
  {
    id: 'ocean-activity-2',
    islandId: 'ocean' as IslandId,
    type: 'journal',
    title: 'Tagebuch: Brief an jemanden, den ich vermisse',
    description: 'Schreibe einen Brief an eine Person, die du vermisst - ob sie weggezogen, nicht mehr in deinem Leben oder verstorben ist. Beginne mit "Liebe/Lieber...". Erzähle ihr, was sich verändert hat, seitdem sie nicht mehr da ist. Sage ihr, was du dir wünschst, dass sie wüsste. Teile eine Erinnerung, die dich zum Lächeln bringt. Sage ihr, wie du dich fühlst. Beende den Brief mit dem, was du ihr am liebsten noch sagen würdest. Der Brief muss nie abgeschickt werden. Das Schreiben selbst ist die Heilung.',
    completed: false
  },
  {
    id: 'ocean-activity-3',
    islandId: 'ocean' as IslandId,
    type: 'reflection',
    title: 'Reflexion: Mein Werkzeugkasten gegen Traurigkeit',
    description: 'Erstelle deinen persönlichen Werkzeugkasten für traurige Tage. Schreibe auf: (1) Drei Menschen, denen ich vertraue und die ich anrufen kann. (2) Zwei Orte, an denen ich mich sicher fühle. (3) Drei Aktivitäten, die mir guttun, wenn ich traurig bin (z.B. Musik hören, spazieren gehen, malen). (4) Ein Satz, der mir Kraft gibt. (5) Eine Erinnerung, die mich zum Lächeln bringt. Bewahre diese Liste an einem Ort auf, den du leicht findest. An Tagen, an denen die Traurigkeit groß ist, schaue auf deine Liste - sie erinnert dich daran, dass du nicht hilflos bist.',
    completed: false
  },
  {
    id: 'ocean-activity-4',
    islandId: 'ocean' as IslandId,
    type: 'creative',
    title: 'Kreativ: Meine Erinnerungsbox',
    description: 'Baue eine Erinnerungsbox für jemanden oder etwas, das du vermisst. Nimm eine Schachtel, einen Karton oder eine Dose. Dekoriere sie außen so, wie du möchtest. Sammle dann Dinge, die dich an die Person oder die Zeit erinnern: Fotos, Zettel mit Erinnerungen, kleine Gegenstände, gemalte Bilder, aufgeschriebene Gespräche oder Insiderwitze. Du kannst auch Dinge hinzufügen, die du der Person gerne gegeben hättest. Öffne die Box, wenn du dich erinnern möchtest - an traurigen und an guten Tagen. Erinnern ist kein Festhalten. Es ist Weitertragen.',
    completed: false
  }
];

// =============================================================================
// Wisdom Cards
// =============================================================================

export const oceanWisdomCards: WisdomCard[] = [
  {
    id: 'ocean-wisdom-1',
    islandId: 'ocean' as IslandId,
    text: 'Traurigkeit zeigt sich auf viele verschiedene Weisen. Manche Menschen weinen, andere ziehen sich zurück, wieder andere werden wütend oder still. Alle Arten zu trauern sind richtig.',
    category: 'Erkenntnis',
    collected: false
  },
  {
    id: 'ocean-wisdom-2',
    islandId: 'ocean' as IslandId,
    text: 'Trauer hat kein Zeitlimit. Es ist okay, traurig zu sein, so lange du es brauchst. Niemand hat das Recht, dir zu sagen, wann du "darüber hinweg" sein solltest.',
    category: 'Trost',
    collected: false
  },
  {
    id: 'ocean-wisdom-3',
    islandId: 'ocean' as IslandId,
    text: 'Verlust ist ein Teil des Lebens. Es zeigt, wie viel dir jemand bedeutet hat. Der Schmerz ist der Preis der Liebe - und Liebe ist immer den Preis wert.',
    category: 'Weisheit',
    collected: false
  },
  {
    id: 'ocean-wisdom-4',
    islandId: 'ocean' as IslandId,
    text: 'Du kannst jemanden vermissen UND neue schöne Erinnerungen machen. Trauer und Freude können nebeneinander existieren. Das eine macht das andere nicht weniger echt.',
    category: 'Hoffnung',
    collected: false
  },
  {
    id: 'ocean-wisdom-5',
    islandId: 'ocean' as IslandId,
    text: 'Gefühle sind wie Wellen: Du kannst sie nicht aufhalten, aber du kannst lernen, auf ihnen zu reiten. Keine Welle dauert ewig - auch nicht die größte.',
    category: 'Strategie',
    collected: false
  },
  {
    id: 'ocean-wisdom-6',
    islandId: 'ocean' as IslandId,
    text: 'Sich Hilfe zu holen ist kein Zeichen von Schwäche. Es ist eines der mutigsten Dinge, die du tun kannst. Niemand muss allein durch einen Sturm.',
    category: 'Mut',
    collected: false
  },
  {
    id: 'ocean-wisdom-7',
    islandId: 'ocean' as IslandId,
    text: 'Erinnern ist kein Festhalten an der Vergangenheit. Es ist eine Brücke zwischen dem, was war, und dem, was bleibt. Die Menschen, die wir lieben, leben in unseren Erinnerungen weiter.',
    category: 'Trost',
    collected: false
  },
  {
    id: 'ocean-wisdom-8',
    islandId: 'ocean' as IslandId,
    text: 'Nach jedem Sturm kommt Ruhe. Und nach jedem Abschied gibt es neue Horizonte. Du bist stärker, als du denkst - nicht obwohl du traurig warst, sondern weil du es durchlebt hast.',
    category: 'Resilienz',
    collected: false
  }
];
