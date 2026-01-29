// ELDiB Daten - Alle Items mit Zielformulierungen

const ELDIB_DATA = {
    verhalten: {
        name: "Verhalten",
        code: "V",
        color: "#e74c3c",
        stufen: {
            1: {
                name: "Stufe I: Mit Freude auf die Umwelt reagieren",
                ziel: "Den eigenen körperlichen Fähigkeiten vertrauen",
                items: [
                    {
                        nr: 1,
                        code: "V-1",
                        keyword: "Wahrnehmung",
                        description: "Lässt Wahrnehmung eines sensorischen Reizes erkennen durch beliebige Bewegungsreaktionen von der Reizquelle weg oder zu ihr hin.",
                        zielformulierungen: [
                            "Ich schaue den/die LehrerIn an, wenn sie/er mich berührt."
                        ]
                    },
                    {
                        nr: 2,
                        code: "V-2",
                        keyword: "Orientierung",
                        description: "Reagiert auf sensorischen Reiz mit Zuwendung zur Reizquelle, entweder durch körperliche Reaktion oder durch Hinsehen.",
                        zielformulierungen: [
                            "Ich schaue mir Bilder an, die die Lehrerin/der Lehrer mir zeigt."
                        ]
                    },
                    {
                        nr: 3,
                        code: "V-3",
                        keyword: "Aufmerksamkeit",
                        description: "Reagiert auf einen Reiz mit kurzzeitig anhaltender Aufmerksamkeit.",
                        zielformulierungen: [
                            "Ich schaue auf das, was mir vorgezeigt wird.",
                            "Ich höre zu, wenn die Lehrerin/der Lehrer etwas sagt, ohne dabei etwas anderes zu tun."
                        ]
                    },
                    {
                        nr: 4,
                        code: "V-4",
                        keyword: "motorische Reaktion",
                        description: "Reagiert von sich aus auf einfache Umgebungsreize mit einer motorischen Handlung.",
                        zielformulierungen: [
                            "Wenn der/die LehrerIn mir die Hand reicht, nehme ich sie."
                        ]
                    },
                    {
                        nr: 5,
                        code: "V-5",
                        keyword: "komplexe Reaktion",
                        description: "Reagiert auf komplexe Umgebungsreize und verbale Impulse mit motorischer Handlung.",
                        zielformulierungen: [
                            "Ich baue einen Turm, wenn ich Bauklötze angeboten bekomme.",
                            "Ich werfe den Ball zurück, wenn die Lehrerin/der Lehrer ihn mir zuwirft.",
                            "Ich koche eine Suppe in der Spielküche, wenn die LehrerIn sagt 'Wir kochen eine Suppe'."
                        ]
                    },
                    {
                        nr: 6,
                        code: "V-6",
                        keyword: "Selbsthilfe",
                        description: "Beteiligt sich aktiv am Erlernen von Selbsthilfe-Fähigkeiten (Hände waschen, essen, Toilette benutzen, anziehen).",
                        zielformulierungen: [
                            "Morgens hänge ich meine Jacke an den Haken.",
                            "Wenn es klingelt um nach Hause zu gehen, ziehe ich meine Jacke an."
                        ]
                    },
                    {
                        nr: 7,
                        code: "V-7",
                        keyword: "Spielmaterial",
                        description: "Reagiert eigenständig auf verschiedene Spielmaterialien.",
                        zielformulierungen: [
                            "Ich räume die Bücher in das Regal in der Bücherecke wenn die/der LehrerIn das sagt.",
                            "Die Puppen räume ich ins Puppenhaus wenn die/der LehrerIn das sagt.",
                            "Ich lege das Schulmaterial auf den richtigen Platz wenn die/der LehrerIn das sagt."
                        ]
                    },
                    {
                        nr: 8,
                        code: "V-8",
                        keyword: "Routineabläufe",
                        description: "Zeigt Wiedererkennen von Routineabläufen durch eigenständigen Wechsel von einem Aktivitätsbereich zum nächsten.",
                        zielformulierungen: [
                            "Wenn der Lehrer/die Lehrerin sagt, dass wir in die Pause gehen, räume ich mein Pult.",
                            "Wenn der Lehrer/die Lehrerin sagt, dass wir eine Geschichte vorgelesen bekommen, gehe ich zum Erzählteppich."
                        ]
                    }
                ]
            },
            2: {
                name: "Stufe II: Erfolgreich auf die Umwelt reagieren",
                ziel: "Erfolgreich an Routineabläufen und Aktivitäten teilnehmen",
                items: [
                    {
                        nr: 9,
                        code: "V-9",
                        keyword: "Spielerfahrung",
                        description: "Geht mit Spielmaterialien sachgerecht um (Bewusstheit der Funktion im realen Leben).",
                        zielformulierungen: [
                            "In der Pause benutze ich den Fußball auf dem Fußballfeld.",
                            "Ich benutze in der Spielküche die Pfanne oder den Kochtopf zum Kochen.",
                            "Nach der Spielzeit räume ich mein Spiel wieder ins Regal.",
                            "Ich würfele auf dem Tisch."
                        ]
                    },
                    {
                        nr: 10,
                        code: "V-10",
                        keyword: "warten",
                        description: "Wartet ohne körperliche Steuerungshilfe durch den Erwachsenen.",
                        zielformulierungen: [
                            "Ich warte bis der/die LehrerIn mich mit meinem Namen ruft.",
                            "Ich warte auf das Zeichen des/der Lehrers/In um aufzustehen.",
                            "Ich warte bis zwei Kinder vor mir aufgerufen wurden.",
                            "Ich spreche im Morgenkreis wenn ich den Sprechball habe.",
                            "Ich melde mich und warte, bis ich drankomme."
                        ]
                    },
                    {
                        nr: 11,
                        code: "V-11",
                        keyword: "sitzen",
                        description: "Beteiligt sich verbal und physisch an Aktivitäten im Sitzen ohne körperliche Steuerungshilfe.",
                        zielformulierungen: [
                            "Ich bleibe während der Matheaufgabe sitzen.",
                            "Ich bleibe im Morgenkreis sitzen.",
                            "In Arbeitsphasen bleibe ich auf meinem Platz sitzen.",
                            "Wenn ich etwas erzählen möchte, bleibe ich sitzen und melde mich.",
                            "Beim Frühstück und in den Arbeitsphasen bleibe ich sitzen."
                        ]
                    },
                    {
                        nr: 12,
                        code: "V-12",
                        keyword: "Bewegung",
                        description: "Beteiligt sich verbal und physisch an Bewegungsaktivitäten ohne körperliche Steuerungshilfe.",
                        zielformulierungen: [
                            "Ich beteilige mich während des Sportunterrichts.",
                            "Ich mache bei der Bewegungspause mit.",
                            "Im Musikunterricht beteilige ich mich an Spielen im Kreis.",
                            "An Spielen im Kreis nehme ich teil."
                        ]
                    },
                    {
                        nr: 13,
                        code: "V-13",
                        keyword: "Aktivitäten",
                        description: "Nimmt von sich aus verbal und physisch an Aktivitäten teil.",
                        zielformulierungen: [
                            "Ich setze mich in den Morgenkreis, wenn der Tag beginnt.",
                            "Beim Arbeiten und Spielen mache ich mit.",
                            "Ich melde mich im Unterricht und beteilige mich an Unterrichtsgesprächen.",
                            "Ich beteilige mich an Unterrichtsgesprächen."
                        ]
                    },
                    {
                        nr: 14,
                        code: "V-14",
                        keyword: "Lob/Erfolg",
                        description: "Akzeptiert Lob oder Erfolg ohne unangemessenes Verhalten oder Kontrollverlust.",
                        zielformulierungen: [
                            "Ich nehme Lob von anderen an und behalte die Kontrolle.",
                            "Ich bedanke mich beim/bei der LehrerIn, wenn ich gelobt worden bin.",
                            "Wenn ich gelobt werde, freue ich mich und verhalte ich mich vernünftig.",
                            "Ich freue mich über Lob von der Lehrerin/dem Lehrer oder von MitschülerInnen und bleibe ruhig."
                        ]
                    }
                ]
            },
            3: {
                name: "Stufe III: Erwerben von Fähigkeiten zur erfolgreichen Teilnahme in Gruppen",
                ziel: "Erworbene Fähigkeiten anwenden, um innerhalb einer Gruppe das eigene Verhalten erfolgreich zu steuern",
                items: [
                    {
                        nr: 15,
                        code: "V-15",
                        keyword: "beenden",
                        description: "Beendet kurze, individuelle Aufgaben mit vertrautem Material selbstständig.",
                        zielformulierungen: [
                            "Wenn ich eine Aufgabe verstanden habe, löse ich sie alleine.",
                            "Ich beende kurze Aufgaben die ich schon kenne, alleine, in der vorgegebenen Zeit.",
                            "Eine angefangene Aufgabe bearbeite ich zu Ende. Erst dann beginne ich mit einer neuen Aufgabe."
                        ]
                    },
                    {
                        nr: 16,
                        code: "V-16",
                        keyword: "Erwartungen",
                        description: "Lässt Bewusstsein für Verhaltensweisen erkennen, die zu Hause, in der Schule und in der Öffentlichkeit erwartet werden.",
                        zielformulierungen: [
                            "Wenn mich jemand fragt, sage ich, was unsere Ziele in der Klasse sind.",
                            "Ich sage, was unsere Klassenregeln und Ziele sind.",
                            "Ich kenne die Regeln, die dafür sorgen, dass alle sich in der Klasse wohl fühlen."
                        ]
                    },
                    {
                        nr: 17,
                        code: "V-17",
                        keyword: "Begründungen",
                        description: "Nennt Gründe für Verhaltenserwartungen, die zu Hause, in der Schule und in der Öffentlichkeit bedeutsam sind.",
                        zielformulierungen: [
                            "Wenn ich gefragt werde kann ich sagen warum ein bestimmtes Verhalten von mir erwartet wird.",
                            "Ich sage, warum ich mich freundlich und friedlich verhalten soll.",
                            "Ich erkläre, warum es unsere Klassenziele gibt."
                        ]
                    },
                    {
                        nr: 18,
                        code: "V-18",
                        keyword: "Alternativen",
                        description: "Beschreibt alternative, angemessenere Verhaltensmöglichkeiten für eine gegebene Situation.",
                        zielformulierungen: [
                            "Ich sage wie ich mich anders und angemessen verhalten könnte.",
                            "Wenn ich Streit habe, bleibe ich ruhig und bespreche mit meinen LehrerInnen, wie ich den Streit klären könnte.",
                            "Ich überlege und sage, wie ich mich in schwierigen Situationen friedlicher verhalten kann."
                        ]
                    },
                    {
                        nr: 19,
                        code: "V-19",
                        keyword: "Gruppenwahl",
                        description: "Reagiert angemessen auf Gruppenwahl als Anführer bzw. Teilnehmer.",
                        zielformulierungen: [
                            "Ich akzeptiere die Entscheidung der Gruppe, auch wenn ich anderer Meinung war.",
                            "Wenn ich zum Anführer gewählt werde, übernehme ich die Verantwortung."
                        ]
                    },
                    {
                        nr: 20,
                        code: "V-20",
                        keyword: "zurückhalten",
                        description: "Hält sich von inakzeptablem Verhalten zurück, wenn andere in der Gruppe die Selbstkontrolle verlieren.",
                        zielformulierungen: [
                            "Wenn andere Kinder sich streiten, bleibe ich ruhig.",
                            "Ich halte mich zurück, wenn andere die Kontrolle verlieren.",
                            "Auch wenn andere sich falsch verhalten, bleibe ich bei meinem guten Verhalten."
                        ]
                    },
                    {
                        nr: 21,
                        code: "V-21",
                        keyword: "Kontrolle",
                        description: "Behält während der Gruppenaktivitäten akzeptable physische und verbale Selbstkontrolle.",
                        zielformulierungen: [
                            "Ich behalte die Kontrolle über mein Verhalten während Gruppenaktivitäten.",
                            "Bei Übergängen zwischen Aktivitäten bleibe ich ruhig.",
                            "Ich kontrolliere mein Verhalten auch beim Spielen."
                        ]
                    }
                ]
            },
            4: {
                name: "Stufe IV: Sich einbringen in Gruppenprozesse",
                ziel: "Persönliche Fähigkeiten einsetzen, um zum Gruppenerfolg beizutragen",
                items: [
                    {
                        nr: 22,
                        code: "V-22",
                        keyword: "Fortschritt",
                        description: "Zeigt beginnendes Bewusstsein für eigenen Verhaltensfortschritt.",
                        zielformulierungen: [
                            "Ich erkenne, wenn ich mich verbessert habe.",
                            "Ich kann beschreiben, was ich früher noch nicht konnte und jetzt kann."
                        ]
                    },
                    {
                        nr: 23,
                        code: "V-23",
                        keyword: "Flexibilität",
                        description: "Lässt Flexibilität erkennen, wenn Abläufe aufgrund sich ändernder Anforderungen umgestaltet werden müssen.",
                        zielformulierungen: [
                            "Ich bleibe ruhig, wenn sich der Plan ändert.",
                            "Ich passe mich an, wenn etwas anders läuft als geplant."
                        ]
                    },
                    {
                        nr: 24,
                        code: "V-24",
                        keyword: "neue Erfahrungen",
                        description: "Beteiligt sich verbal und physisch kontrolliert an neuen Erfahrungen bzw. Aktivitäten.",
                        zielformulierungen: [
                            "Ich probiere neue Aktivitäten aus und bleibe dabei ruhig.",
                            "Bei neuen Erfahrungen verhalte ich mich kontrolliert."
                        ]
                    },
                    {
                        nr: 25,
                        code: "V-25",
                        keyword: "anwenden",
                        description: "Wendet alternative, sozial akzeptable Verhaltensweisen an.",
                        zielformulierungen: [
                            "Ich wende die besprochenen alternativen Verhaltensweisen an.",
                            "In schwierigen Situationen nutze ich die gelernten Strategien."
                        ]
                    },
                    {
                        nr: 26,
                        code: "V-26",
                        keyword: "Provokation",
                        description: "Reagiert von sich aus auf Provokationen mit verbal und physisch kontrolliertem Verhalten.",
                        zielformulierungen: [
                            "Wenn mich jemand provoziert, bleibe ich ruhig.",
                            "Ich lasse mich nicht provozieren und behalte die Kontrolle."
                        ]
                    },
                    {
                        nr: 27,
                        code: "V-27",
                        keyword: "Verantwortung",
                        description: "Akzeptiert Verantwortung für die Folgen des eigenen Verhaltens und eigener Einstellungen.",
                        zielformulierungen: [
                            "Ich übernehme Verantwortung für mein Verhalten.",
                            "Ich akzeptiere die Konsequenzen meines Verhaltens."
                        ]
                    },
                    {
                        nr: 28,
                        code: "V-28",
                        keyword: "Lösungsvorschlag",
                        description: "Reagiert in kritischen Situationen auf Probleme mit konstruktiven Lösungsvorschlägen.",
                        zielformulierungen: [
                            "Bei Problemen mache ich konstruktive Vorschläge.",
                            "Ich helfe mit, Konflikte zu lösen, indem ich Ideen einbringe."
                        ]
                    }
                ]
            },
            5: {
                name: "Stufe V: Anwenden von individuellen und gruppenbezogenen Fähigkeiten in neuen Situationen",
                ziel: "Realen Lebenserfahrungen mit konstruktivem Verhalten begegnen",
                items: [
                    {
                        nr: 29,
                        code: "V-29",
                        keyword: "Gewohnheiten",
                        description: "Entwickelt neue persönliche Gewohnheiten oder Fähigkeiten mit Bezug zur Arbeitswelt.",
                        zielformulierungen: [
                            "Ich entwickle Gewohnheiten, die mir im Berufsleben helfen werden.",
                            "Ich übe Fähigkeiten, die für die Arbeitswelt wichtig sind."
                        ]
                    },
                    {
                        nr: 30,
                        code: "V-30",
                        keyword: "positive Rolle",
                        description: "Sucht und entwickelt eine begehrte positive Rolle innerhalb einer Gruppe.",
                        zielformulierungen: [
                            "Ich suche mir eine positive Rolle in der Gruppe.",
                            "Ich trage positiv zur Gruppe bei."
                        ]
                    },
                    {
                        nr: 31,
                        code: "V-31",
                        keyword: "Recht/Ordnung",
                        description: "Zeigt Verständnis und Akzeptanz von Rechts- und Ordnungsprinzipien in Schule und Öffentlichkeit.",
                        zielformulierungen: [
                            "Ich verstehe und akzeptiere Regeln und Gesetze.",
                            "Ich halte mich an Regeln in der Schule und in der Öffentlichkeit."
                        ]
                    },
                    {
                        nr: 32,
                        code: "V-32",
                        keyword: "Selbstverantwortung",
                        description: "Befürwortet Verfahren zur Selbstverantwortung und Regelung des Gruppenlebens.",
                        zielformulierungen: [
                            "Ich unterstütze Regeln, die das Zusammenleben in der Gruppe verbessern.",
                            "Ich übernehme Selbstverantwortung für mein Handeln in der Gruppe."
                        ]
                    },
                    {
                        nr: 33,
                        code: "V-33",
                        keyword: "Einsicht",
                        description: "Löst persönliche Probleme anhand von Einsicht, Analyse und Generalisierung.",
                        zielformulierungen: [
                            "Ich löse meine Probleme, indem ich über sie nachdenke.",
                            "Ich analysiere Situationen und finde eigene Lösungen."
                        ]
                    }
                ]
            }
        }
    },

    kommunikation: {
        name: "Kommunikation",
        code: "K",
        color: "#3498db",
        stufen: {
            1: {
                name: "Stufe I: Mit Freude auf die Umwelt reagieren",
                ziel: "Gebraucht Wörter, um Bedürfnisse zu befriedigen",
                items: [
                    {
                        nr: 1,
                        code: "K-1",
                        keyword: "Laute",
                        description: "Produziert Laute (Das Kind wiederholt eigene Lautmuster, um sich sozial oder imitierend zu äußern).",
                        zielformulierungen: [
                            "Ich produziere verschiedene Laute, um mich mitzuteilen."
                        ]
                    },
                    {
                        nr: 2,
                        code: "K-2",
                        keyword: "Sprecher",
                        description: "Richtet die Aufmerksamkeit auf eine sprechende Person.",
                        zielformulierungen: [
                            "Ich schaue die Person an, die spricht."
                        ]
                    },
                    {
                        nr: 3,
                        code: "K-3",
                        keyword: "verbaler Impuls",
                        description: "Reagiert auf einen verbalen Impuls mit einer Bewegung oder Handlung.",
                        zielformulierungen: [
                            "Wenn jemand etwas sagt, reagiere ich darauf."
                        ]
                    },
                    {
                        nr: 4,
                        code: "K-4",
                        keyword: "Wort-Annäherung",
                        description: "Reagiert verbal auf Fragen oder Aufforderungen mit erkennbaren Wort-Annäherungen.",
                        zielformulierungen: [
                            "Wenn ich etwas gefragt werde, antworte ich."
                        ]
                    },
                    {
                        nr: 5,
                        code: "K-5",
                        keyword: "Wörter spontan",
                        description: "Verwendet von sich aus erkennbare, relevante Wort-Annäherungen bei verschiedenen Aktivitäten.",
                        zielformulierungen: [
                            "Wenn der/die LehrerIn mir etwas zeigt und fragt was es ist, antworte ich.",
                            "Wenn der/die Lehrerin mir etwas vormacht, sage ich was sie tut."
                        ]
                    },
                    {
                        nr: 6,
                        code: "K-6",
                        keyword: "Wörter Erwachsener",
                        description: "Produziert einzelne erkennbare Wörter, um eine gewünschte Reaktion des Erwachsenen zu erhalten.",
                        zielformulierungen: [
                            "Ich spreche mit dem/der LehrerIn, wenn ich etwas möchte."
                        ]
                    },
                    {
                        nr: 7,
                        code: "K-7",
                        keyword: "Wörter Peer",
                        description: "Produziert einzelne erkennbare Wörter, um eine erwünschte Reaktion von einem gleichaltrigen Kind zu erhalten.",
                        zielformulierungen: [
                            "Ich spreche mit dem anderen Kind, wenn ich etwas möchte."
                        ]
                    },
                    {
                        nr: 8,
                        code: "K-8",
                        keyword: "Wortreihung",
                        description: "Produziert eine sinnvolle Wortsequenz ohne Vorbild durch Erwachsene.",
                        zielformulierungen: [
                            "Wenn ich etwas sagen will, mache ich einen ganzen Satz."
                        ]
                    }
                ]
            },
            2: {
                name: "Stufe II: Erfolgreich auf die Umwelt reagieren",
                ziel: "Gebraucht Wörter, um andere in konstruktiver Weise zu beeinflussen",
                items: [
                    {
                        nr: 9,
                        code: "K-9",
                        keyword: "beantworten",
                        description: "Beantwortet Fragen, Bitten oder Aufforderungen mit erkennbaren, sinnvollen Wörtern.",
                        zielformulierungen: [
                            "Ich antworte auf die Frage, die mir gestellt wird, so dass jeder meine Antwort verstehen kann.",
                            "Wenn ich etwas gefragt werde, gebe ich eine verständliche Antwort, die auch wirklich zum Thema gehört."
                        ]
                    },
                    {
                        nr: 10,
                        code: "K-10",
                        keyword: "Vokabular",
                        description: "Zeigt ein rezeptives Vokabular, das nicht mehr als zwei Jahre hinter normalen Erwartungen zurückliegt.",
                        zielformulierungen: [
                            "Wenn eine Geschichte erzählt wird, höre ich zu, damit ich neue Wörter lerne."
                        ]
                    },
                    {
                        nr: 11,
                        code: "K-11",
                        keyword: "Wortsequenzen",
                        description: "Verwendet von sich aus einfache, der Aktivität angemessene Wortsequenzen.",
                        zielformulierungen: [
                            "Ich spreche freundlich, wenn ich etwas haben möchte.",
                            "Ich bitte freundlich um etwas.",
                            "Ich spreche freundlich mit anderen.",
                            "Wenn ich etwas fragen möchte, frage ich ruhig."
                        ]
                    },
                    {
                        nr: 12,
                        code: "K-12",
                        keyword: "Austausch - Erwachsene",
                        description: "Verwendet von sich aus Wörter, um mit einem Erwachsenen minimale Informationen auszutauschen.",
                        zielformulierungen: [
                            "Wenn ich ein Problem oder eine Frage habe und Hilfe benötige, spreche ich den/die LehrerIn von mir aus an.",
                            "Ich erzähle meinem/r LehrerIn etwas, was ich spannend finde."
                        ]
                    },
                    {
                        nr: 13,
                        code: "K-13",
                        keyword: "Merkmale",
                        description: "Beschreibt einfache, konkrete Merkmale sowohl von sich als auch von anderen.",
                        zielformulierungen: [
                            "Ich beschreibe andere Kinder.",
                            "Ich sage was ich gut kann und was ein anderes Kind gut kann.",
                            "Ich sage was ich gerne mag oder was ein anderes Kind gerne mag."
                        ]
                    },
                    {
                        nr: 14,
                        code: "K-14",
                        keyword: "Austausch - Kind",
                        description: "Verwendet von sich aus Wörter, um mit einem anderen Kind minimale Informationen auszutauschen.",
                        zielformulierungen: [
                            "Ich traue mich einem anderen Kind etwas zu erzählen oder es zu fragen.",
                            "Ich erzähle den Kindern aus meiner Klasse etwas von mir aus.",
                            "In den Spielstunden und den Pausen spreche ich mit den Kindern aus meiner Klasse."
                        ]
                    }
                ]
            },
            3: {
                name: "Stufe III: Erwerben von Fähigkeiten zur erfolgreichen Teilnahme in Gruppen",
                ziel: "Gebraucht Wörter, um sich auf konstruktive Weise innerhalb einer Gruppe zu äußern",
                items: [
                    {
                        nr: 15,
                        code: "K-15",
                        keyword: "Persönliches",
                        description: "Verwendet von sich aus Wörter, um eigene Erfahrungen, Vorstellungen oder Arbeit zu beschreiben.",
                        zielformulierungen: [
                            "Ich erzähle von Dingen, die ich erlebt habe.",
                            "Ich erzähle etwas von mir.",
                            "Ich erzähle etwas von mir im Morgenkreis.",
                            "Ich spreche so laut, dass die anderen mich verstehen."
                        ]
                    },
                    {
                        nr: 16,
                        code: "K-16",
                        keyword: "Gefühlsreaktionen",
                        description: "Verwendet Wörter oder Gesten, um angemessene Gefühlsreaktionen zu zeigen.",
                        zielformulierungen: [
                            "Wenn ich wütend bin, sage ich, was mich stört, ohne jemanden dabei zu verletzen.",
                            "Wenn ich wütend bin, bleibe ich ruhig und sage, was mich stört.",
                            "Ich beschreibe angenehme und unangenehme Gefühle mit vernünftigen Worten.",
                            "Wenn mir etwas nicht passt, sage ich das vernünftig."
                        ]
                    },
                    {
                        nr: 17,
                        code: "K-17",
                        keyword: "Gespräche",
                        description: "Beteiligt sich an Gruppengesprächen in einer Weise, die sich nicht störend auf die Gruppe auswirkt.",
                        zielformulierungen: [
                            "Bei Besprechungen in der Gruppe sage ich ruhig und freundlich meine Meinung.",
                            "Ich beteilige mich vernünftig an Klassengesprächen.",
                            "Ich melde mich nur, wenn ich ernsthaft etwas sagen möchte.",
                            "Bei Gesprächen in der Klasse höre ich den anderen zu."
                        ]
                    },
                    {
                        nr: 18,
                        code: "K-18",
                        keyword: "Stolz - ich",
                        description: "Verwendet von sich aus Wörter oder Gesten, um Stolz auf eigene Arbeit zu zeigen.",
                        zielformulierungen: [
                            "Ich bin stolz auf die Arbeit, die ich geleistet habe, und sage es auch.",
                            "Wenn ich etwas gut gemacht habe oder etwas gut kann, dann sage ich es.",
                            "Ich zeige Freude, wenn ich mit meiner Arbeit zufrieden bin."
                        ]
                    },
                    {
                        nr: 19,
                        code: "K-19",
                        keyword: "Eigenschaften - ich",
                        description: "Beschreibt charakteristische Eigenschaften, Stärken und Schwächen bei sich selbst.",
                        zielformulierungen: [
                            "Ich beschreibe mich. Ich erzähle, was ich mag und was ich gut kann.",
                            "Ich sage, was ich heute gern oder nicht so gern getan habe.",
                            "Wenn ich gefragt werde, sage ich, was ich gut kann oder was schwer für mich ist.",
                            "Ich beschreibe meine Stärken und meine Schwächen."
                        ]
                    },
                    {
                        nr: 20,
                        code: "K-20",
                        keyword: "Eigenschaften - du",
                        description: "Beschreibt charakteristische Eigenschaften bei anderen.",
                        zielformulierungen: [
                            "Ich beschreibe das Aussehen und Verhalten anderer, ohne sie dabei zu verletzen.",
                            "Ich sage, was andere gut können, ohne sie zu verletzen.",
                            "Ich beschreibe, was andere gut können und auch das, was sie noch nicht so gut können."
                        ]
                    },
                    {
                        nr: 21,
                        code: "K-21",
                        keyword: "Gefühle - du",
                        description: "Erkennt Gefühle anderer.",
                        zielformulierungen: [
                            "Ich sage, warum meine MitschülerInnen sich freuen, sich ärgern oder warum sie traurig sind.",
                            "Ich beschreibe, was ein anderer Mensch fühlt.",
                            "Ich erkenne und beschreibe die Gefühle anderer."
                        ]
                    },
                    {
                        nr: 22,
                        code: "K-22",
                        keyword: "Stolz - wir",
                        description: "Verwendet von sich aus Wörter, um Stolz auf Gruppenleistungen auszudrücken.",
                        zielformulierungen: [
                            "Ich zeige Stolz auf unsere Gruppenleistung.",
                            "Ich sage 'wir' und 'unser', wenn ich über Gruppenerfolge spreche."
                        ]
                    }
                ]
            },
            4: {
                name: "Stufe IV: Sich einbringen in Gruppenprozesse",
                ziel: "Verwendet Wörter, um Verständnis von Gefühlen und Verhaltensweisen zu zeigen",
                items: [
                    {
                        nr: 23,
                        code: "K-23",
                        keyword: "Kreativität",
                        description: "Kanalisiert Gefühle oder Erfahrungen durch kreative Ausdrucksmittel wie Kunst, Musik, Tanz.",
                        zielformulierungen: [
                            "Ich drücke meine Gefühle durch Kunst, Musik oder Tanz aus.",
                            "Ich nutze kreative Mittel, um meine Erfahrungen zu verarbeiten."
                        ]
                    },
                    {
                        nr: 24,
                        code: "K-24",
                        keyword: "Fortschritt",
                        description: "Zeigt beginnendes Bewusstsein für eigenen Verhaltensfortschritt.",
                        zielformulierungen: [
                            "Ich erkenne meinen eigenen Fortschritt.",
                            "Ich kann beschreiben, was ich verbessert habe."
                        ]
                    },
                    {
                        nr: 25,
                        code: "K-25",
                        keyword: "Beeinflussung",
                        description: "Erklärt, wie eigenes Verhalten das Verhalten anderer beeinflusst.",
                        zielformulierungen: [
                            "Ich erkläre, wie mein Verhalten andere beeinflusst.",
                            "Ich verstehe den Zusammenhang zwischen meinem Handeln und der Reaktion anderer."
                        ]
                    },
                    {
                        nr: 26,
                        code: "K-26",
                        keyword: "Gefühle - ich",
                        description: "Verwendet Wörter, um in der Gruppe eigene Gefühle auf angemessene Weise auszudrücken.",
                        zielformulierungen: [
                            "Ich drücke meine Gefühle mit passenden Worten aus.",
                            "Ich teile der Gruppe mit, wie ich mich fühle."
                        ]
                    },
                    {
                        nr: 27,
                        code: "K-27",
                        keyword: "Beziehung",
                        description: "Verwendet Wörter, um positive Beziehungen mit Gleichaltrigen und Erwachsenen anzuknüpfen.",
                        zielformulierungen: [
                            "Ich spreche freundlich, um positive Beziehungen aufzubauen.",
                            "Ich nutze Worte, um neue Freundschaften zu knüpfen."
                        ]
                    },
                    {
                        nr: 28,
                        code: "K-28",
                        keyword: "unterstützen",
                        description: "Verwendet von sich aus Wörter, um eine andere Person zu loben oder persönlich zu unterstützen.",
                        zielformulierungen: [
                            "Ich lobe andere, wenn sie etwas gut gemacht haben.",
                            "Ich unterstütze andere mit aufmunternden Worten."
                        ]
                    },
                    {
                        nr: 29,
                        code: "K-29",
                        keyword: "Relationen",
                        description: "Beschreibt von sich aus den Ursache-Wirkungs-Zusammenhang von Gefühlen und Verhalten.",
                        zielformulierungen: [
                            "Ich erkläre, warum jemand so fühlt wie er fühlt.",
                            "Ich beschreibe den Zusammenhang zwischen Gefühlen und Verhalten."
                        ]
                    }
                ]
            },
            5: {
                name: "Stufe V: Anwenden von Fähigkeiten in neuen Situationen",
                ziel: "Verwendet Wörter, um Beziehungen auszubauen und zu pflegen",
                items: [
                    {
                        nr: 30,
                        code: "K-30",
                        keyword: "komplexe Aussagen",
                        description: "Formuliert Aussagen, die weitgehend komplex strukturiert sind.",
                        zielformulierungen: [
                            "Ich drücke mich in komplexen Sätzen aus.",
                            "Ich verwende bildhafte oder abstrakte Sprache."
                        ]
                    },
                    {
                        nr: 31,
                        code: "K-31",
                        keyword: "Ausgleich",
                        description: "Wählt bei Provokationen einen Sprachgebrauch, der auf versöhnliche Absichten hindeutet.",
                        zielformulierungen: [
                            "Bei Provokationen versuche ich, zu schlichten.",
                            "Ich wähle versöhnliche Worte, wenn es Streit gibt."
                        ]
                    },
                    {
                        nr: 32,
                        code: "K-32",
                        keyword: "Anerkennung",
                        description: "Unterstützt andere durch Anerkennung ihrer Beiträge.",
                        zielformulierungen: [
                            "Ich anerkenne die Beiträge anderer.",
                            "Ich beziehe die Ideen anderer in meine Äußerungen ein."
                        ]
                    },
                    {
                        nr: 33,
                        code: "K-33",
                        keyword: "Motive",
                        description: "Beschreibt verschiedene Motive und Wertvorstellungen in sozialen Situationen.",
                        zielformulierungen: [
                            "Ich beschreibe verschiedene Sichtweisen auf eine Situation.",
                            "Ich verstehe, dass Menschen unterschiedliche Motive haben können."
                        ]
                    },
                    {
                        nr: 34,
                        code: "K-34",
                        keyword: "Ideale",
                        description: "Beschreibt von sich aus eigene Wertvorstellungen, Ideale und Überzeugungen.",
                        zielformulierungen: [
                            "Ich erzähle von meinen Werten und Überzeugungen.",
                            "Ich beschreibe, was mir wichtig ist im Leben."
                        ]
                    },
                    {
                        nr: 35,
                        code: "K-35",
                        keyword: "Erhalt/Pflege",
                        description: "Verwendet kommunikative Fähigkeiten, um positive Beziehungen zu erhalten.",
                        zielformulierungen: [
                            "Ich pflege meine Beziehungen durch gute Kommunikation.",
                            "Ich nutze meine Sprachfähigkeiten, um Freundschaften zu erhalten."
                        ]
                    }
                ]
            }
        }
    },

    sozialisation: {
        name: "Sozialisation",
        code: "SOZ",
        color: "#2ecc71",
        stufen: {
            1: {
                name: "Stufe I: Mit Freude auf die Umwelt reagieren",
                ziel: "Einem Erwachsenen genügend vertrauen, um auf ihn zu reagieren",
                items: [
                    {
                        nr: 1,
                        code: "SOZ-1",
                        keyword: "Gegenwart",
                        description: "Ist sich der Gegenwart anderer bewusst.",
                        zielformulierungen: [
                            "Wenn der/die LehrerIn mich an der Schulter berührt, drehe ich mich um und schaue ihn/sie an."
                        ]
                    },
                    {
                        nr: 2,
                        code: "SOZ-2",
                        keyword: "Gerichtetheit",
                        description: "Richtet Aufmerksamkeit auf Handlungen anderer.",
                        zielformulierungen: [
                            "Wenn der/die LehrerIn mir sagt, dass ich zuschauen soll, tue ich das."
                        ]
                    },
                    {
                        nr: 3,
                        code: "SOZ-3",
                        keyword: "Eigenname",
                        description: "Reagiert, wenn ein Erwachsener den Namen des Kindes nennt.",
                        zielformulierungen: [
                            "Wenn der/die LehrerIn mich mit meinem Namen ruft, schaue ich hin."
                        ]
                    },
                    {
                        nr: 4,
                        code: "SOZ-4",
                        keyword: "Spiel - allein",
                        description: "Beschäftigt sich mit organisiertem Spiel und spielt dabei für sich allein.",
                        zielformulierungen: [
                            "Wenn der/die LehrerIn mir das Piktogramm zeigt, spiele ich alleine."
                        ]
                    },
                    {
                        nr: 5,
                        code: "SOZ-5",
                        keyword: "nonverbale Interaktion",
                        description: "Interagiert nonverbal mit Erwachsenen, um Bedürfnisse auszudrücken.",
                        zielformulierungen: [
                            "Wenn ich etwas möchte, zeige ich auf den Gegenstand.",
                            "Wenn ich vom/von der LehrerIn etwas möchte, nehme ich sie bei der Hand und zeige es."
                        ]
                    },
                    {
                        nr: 6,
                        code: "SOZ-6",
                        keyword: "kommen",
                        description: "Reagiert auf die Aufforderung des Erwachsenen, zu ihm zu kommen.",
                        zielformulierungen: [
                            "Wenn der/die LehrerIn mich ruft, gehe ich zu ihm/ihr.",
                            "Im Sportunterricht komme ich in den Kreis, wenn der/die LehrerIn mich darum bittet."
                        ]
                    },
                    {
                        nr: 7,
                        code: "SOZ-7",
                        keyword: "Aufforderungen",
                        description: "Zeigt, dass es einzelne verbale Aufforderungen des Erwachsenen versteht.",
                        zielformulierungen: [
                            "Wenn der/die LehrerIn mich um etwas bittet, erledige ich es.",
                            "Wenn meine LehrerInnen mich bitten, etwas zu tun, erledige ich es sofort."
                        ]
                    },
                    {
                        nr: 8,
                        code: "SOZ-8",
                        keyword: "Wörter - Erwachsener",
                        description: "Produziert einzelne erkennbare Wörter, um eine Reaktion des Erwachsenen zu erhalten.",
                        zielformulierungen: [
                            "Ich spreche mit dem/der LehrerIn, wenn ich etwas möchte."
                        ]
                    },
                    {
                        nr: 9,
                        code: "SOZ-9",
                        keyword: "Selbst-Bewusstheit",
                        description: "Zeigt deutliche Anzeichen für eine beginnende Herausbildung des Selbst.",
                        zielformulierungen: [
                            "Ich erzähle von mir und gebrauche folgende Wörter: ich, mein, mir."
                        ]
                    },
                    {
                        nr: 10,
                        code: "SOZ-10",
                        keyword: "Spiel - parallel",
                        description: "Nimmt von sich aus an parallelem Spiel teil.",
                        zielformulierungen: [
                            "Ich spiele alleine neben anderen."
                        ]
                    },
                    {
                        nr: 11,
                        code: "SOZ-11",
                        keyword: "Wörter - Peer",
                        description: "Produziert einzelne erkennbare Wörter, um eine Reaktion von einem gleichaltrigen Kind zu erhalten.",
                        zielformulierungen: [
                            "Ich spreche mit dem anderen Kind, wenn ich etwas möchte."
                        ]
                    },
                    {
                        nr: 12,
                        code: "SOZ-12",
                        keyword: "Kontaktsuche",
                        description: "Sucht in unterschiedlichen Situationen Kontakt mit einem vertrauten Erwachsenen.",
                        zielformulierungen: [
                            "Wenn der Unterricht beginnt, gehe ich zum/r LehrerIn und begrüße sie.",
                            "Wenn ich etwas vorgelesen haben möchte, nehme ich ein Buch und gehe damit zum/r LehrerIn."
                        ]
                    }
                ]
            },
            2: {
                name: "Stufe II: Erfolgreich auf die Umwelt reagieren",
                ziel: "Sich erfolgreich an Aktivitäten beteiligen",
                items: [
                    {
                        nr: 13,
                        code: "SOZ-13",
                        keyword: "Fantasie",
                        description: "Beschäftigt sich von sich aus mit Fantasie- und So-tun-als-ob-Spielen.",
                        zielformulierungen: [
                            "Ich denke mir selber etwas zum Spielen aus.",
                            "In der Freiarbeit suche ich mir eine friedliche Beschäftigung.",
                            "Ich denke mir selbst schöne Spiele aus, ohne dass mir jemand dabei helfen muss."
                        ]
                    },
                    {
                        nr: 14,
                        code: "SOZ-14",
                        keyword: "warten",
                        description: "Wartet ohne körperliche Steuerungshilfe durch den Erwachsenen.",
                        zielformulierungen: [
                            "Ich warte bis der/die LehrerIn mich mit meinem Namen ruft.",
                            "Ich warte auf das Zeichen des/der Lehrers/In um aufzustehen."
                        ]
                    },
                    {
                        nr: 15,
                        code: "SOZ-15",
                        keyword: "Kontakt",
                        description: "Zeigt Ansätze, einen angemessenen sozialen Kontakt zu einem anderen Kind aufzunehmen.",
                        zielformulierungen: [
                            "Ich gehe freundlich auf meine MitschülerInnen zu.",
                            "Wenn ich von anderen Kindern etwas möchte, frage ich freundlich.",
                            "Ich spreche andere Kinder freundlich an."
                        ]
                    },
                    {
                        nr: 16,
                        code: "SOZ-16",
                        keyword: "teilen",
                        description: "Beteiligt sich an einer verbal gesteuerten Aktivität, die Teilen erfordert.",
                        zielformulierungen: [
                            "Ich teile mit anderen Kindern, wenn ich das soll.",
                            "Ich teile Arbeitsmaterial, Spielzeug oder Essen mit anderen Kindern."
                        ]
                    },
                    {
                        nr: 17,
                        code: "SOZ-17",
                        keyword: "Spiel interaktiv",
                        description: "Beteiligt sich erfolgreich an interaktivem Spiel mit einem anderen Kind.",
                        zielformulierungen: [
                            "Ich spiele mit anderen Kindern.",
                            "Ich beteilige mich an Spielen in der Klasse.",
                            "Ich spiele friedlich mit anderen Kindern zusammen."
                        ]
                    },
                    {
                        nr: 18,
                        code: "SOZ-18",
                        keyword: "Kooperation",
                        description: "Kooperiert selbstständig mit einem anderen Kind in strukturierten Aktivitäten.",
                        zielformulierungen: [
                            "Bei Partnerarbeiten arbeite ich mit einem anderen Kind zusammen.",
                            "Wenn ich mit einem anderen Kind arbeite oder spiele, sorge ich für eine friedliche Zusammenarbeit.",
                            "Ich arbeite mit jedem Partner zusammen und leiste meinen eigenen Beitrag."
                        ]
                    }
                ]
            },
            3: {
                name: "Stufe III: Erwerben von Fähigkeiten zur erfolgreichen Teilnahme in Gruppen",
                ziel: "Gruppenaktivitäten als befriedigend erleben",
                items: [
                    {
                        nr: 19,
                        code: "SOZ-19",
                        keyword: "abwechseln",
                        description: "Teilt von sich aus Materialien und wechselt sich mit anderen ab.",
                        zielformulierungen: [
                            "Ich teile und wechsele mich mit anderen Kindern ab.",
                            "Am PC wechsele ich mich ab.",
                            "Wenn ich mit anderen spiele und arbeite, teile ich und wechsele mich ab."
                        ]
                    },
                    {
                        nr: 20,
                        code: "SOZ-20",
                        keyword: "nachahmen",
                        description: "Ahmt von sich aus angemessenes Verhalten eines anderen Kindes nach.",
                        zielformulierungen: [
                            "Wenn ein anderer etwas gut macht, mache ich es genau so.",
                            "Wenn andere Kinder sich gut verhalten, beobachte ich sie und mache ihr Verhalten nach.",
                            "Wenn andere sich an die Regeln halten, mache ich das auch."
                        ]
                    },
                    {
                        nr: 21,
                        code: "SOZ-21",
                        keyword: "werten",
                        description: "Bezeichnet einfache soziale Situationen mit wertenden Aussagen.",
                        zielformulierungen: [
                            "Wenn ich gefragt werde, sage ich, ob ich etwas richtig oder falsch, gut oder schlecht finde.",
                            "Ich sage, wann Erwachsene oder Kinder fair waren."
                        ]
                    },
                    {
                        nr: 22,
                        code: "SOZ-22",
                        keyword: "leiten",
                        description: "Leitet eine Gruppenaktivität oder demonstriert eine Aktivität für die Gruppe.",
                        zielformulierungen: [
                            "Ich zeige oder erkläre anderen, wie etwas gemacht wird.",
                            "Bei Partner- oder Gruppenarbeit übernehme ich Aufgaben und zeige anderen, wie es geht.",
                            "In einer Gruppe leite ich die Arbeit oder zeige anderen, wie etwas geht."
                        ]
                    },
                    {
                        nr: 23,
                        code: "SOZ-23",
                        keyword: "Vorschlag - andere",
                        description: "Nimmt an einer Aktivität teil, die ein gleichaltriges Kind vorgeschlagen hat.",
                        zielformulierungen: [
                            "Ich mache mit, wenn andere etwas vorschlagen und die Gruppe sich darauf einigt.",
                            "Wenn die Klasse etwas beschließt, mache ich vernünftig mit.",
                            "Ich akzeptiere Vorschläge meiner MitschülerInnen."
                        ]
                    },
                    {
                        nr: 24,
                        code: "SOZ-24",
                        keyword: "Erfahrungen",
                        description: "Beschreibt eigene Erfahrungen in der Reihenfolge, in der sie sich ereignet haben.",
                        zielformulierungen: [
                            "Ich beschreibe in der richtigen Reihenfolge wie etwas abgelaufen ist.",
                            "Ich erzähle von Dingen, die ich erlebe, und achte dabei auf die richtige Reihenfolge."
                        ]
                    },
                    {
                        nr: 25,
                        code: "SOZ-25",
                        keyword: "Vorliebe",
                        description: "Lässt beginnende Freundschaft erkennen durch Vorliebe für ein bestimmtes Kind.",
                        zielformulierungen: [
                            "Ich nehme Kontakt zu einem anderen Kind auf, das ich besonders mag.",
                            "Ich suche mir ein Kind für die Gruppen- oder Partnerarbeit aus."
                        ]
                    },
                    {
                        nr: 26,
                        code: "SOZ-26",
                        keyword: "Unterstützung",
                        description: "Sucht von sich aus Hilfe oder Lob durch ein anderes Kind.",
                        zielformulierungen: [
                            "Ich frage andere Kinder um Hilfe.",
                            "Ich zeige anderen Kindern meine Arbeit und freue mich über ihr Lob."
                        ]
                    },
                    {
                        nr: 27,
                        code: "SOZ-27",
                        keyword: "Gruppenregeln",
                        description: "Hilft anderen von sich aus bei der Einhaltung von Gruppenregeln.",
                        zielformulierungen: [
                            "Ich erinnere andere freundlich an die Gruppenregeln.",
                            "Ich helfe dabei, dass alle sich an die Regeln halten."
                        ]
                    }
                ]
            },
            4: {
                name: "Stufe IV: Sich einbringen in Gruppenprozesse",
                ziel: "Nimmt von sich aus und erfolgreich als Gruppenmitglied an Aktivitäten teil",
                items: [
                    {
                        nr: 28,
                        code: "SOZ-28",
                        keyword: "identifizieren",
                        description: "Identifiziert sich mit erwachsenen Führungspersonen oder Vorbildern.",
                        zielformulierungen: [
                            "Ich orientiere mich an positiven Vorbildern.",
                            "Ich übernehme gute Eigenschaften von Menschen, die ich bewundere."
                        ]
                    },
                    {
                        nr: 29,
                        code: "SOZ-29",
                        keyword: "Gruppenerfahrung",
                        description: "Beschreibt soziale Gruppenerfahrungen in der Reihenfolge, in der sie sich ereignet haben.",
                        zielformulierungen: [
                            "Ich erzähle von Gruppenerlebnissen in der richtigen Reihenfolge.",
                            "Ich beschreibe, was wir als Gruppe erlebt haben."
                        ]
                    },
                    {
                        nr: 30,
                        code: "SOZ-30",
                        keyword: "Gruppenaktivität",
                        description: "Schlägt von sich aus eine geeignete Gruppenaktivität vor.",
                        zielformulierungen: [
                            "Ich schlage der Gruppe Aktivitäten vor.",
                            "Ich bringe eigene Ideen für Gruppenaktivitäten ein."
                        ]
                    },
                    {
                        nr: 31,
                        code: "SOZ-31",
                        keyword: "Verschiedenheit",
                        description: "Lässt erkennen, dass es sich bewusst ist, wie sich die eigenen sozialen Handlungen von denen anderer unterscheiden.",
                        zielformulierungen: [
                            "Ich erkenne Unterschiede zwischen meinem Verhalten und dem anderer.",
                            "Ich verstehe, dass jeder anders handelt."
                        ]
                    },
                    {
                        nr: 32,
                        code: "SOZ-32",
                        keyword: "Respekt",
                        description: "Hört und respektiert die Vorstellungen, Gedanken und Meinungen anderer.",
                        zielformulierungen: [
                            "Ich höre anderen zu und respektiere ihre Meinung.",
                            "Ich akzeptiere, dass andere anders denken als ich."
                        ]
                    },
                    {
                        nr: 33,
                        code: "SOZ-33",
                        keyword: "Interesse",
                        description: "Bekundet offen sein Interesse an der Meinung Gleichaltriger über die eigene Person.",
                        zielformulierungen: [
                            "Ich frage andere, was sie von mir denken.",
                            "Mich interessiert die Meinung anderer über mich."
                        ]
                    },
                    {
                        nr: 34,
                        code: "SOZ-34",
                        keyword: "Lösungsvorschlag",
                        description: "Reagiert in kritischen Situationen mit konstruktiven Lösungsvorschlägen.",
                        zielformulierungen: [
                            "Bei Problemen mache ich konstruktive Vorschläge.",
                            "Ich helfe, Konflikte zu lösen."
                        ]
                    },
                    {
                        nr: 35,
                        code: "SOZ-35",
                        keyword: "Wertvorstellung",
                        description: "Erkennt und unterscheidet gegensätzliche Werte in sozialen Situationen.",
                        zielformulierungen: [
                            "Ich unterscheide zwischen richtig und falsch, fair und unfair.",
                            "Ich erkenne verschiedene Wertvorstellungen."
                        ]
                    },
                    {
                        nr: 36,
                        code: "SOZ-36",
                        keyword: "Schlussfolgerungen",
                        description: "Zieht Schlussfolgerungen aus sozialen Situationen.",
                        zielformulierungen: [
                            "Ich lerne aus sozialen Situationen.",
                            "Ich ziehe Schlüsse aus dem, was passiert ist."
                        ]
                    }
                ]
            },
            5: {
                name: "Stufe V: Anwenden von Fähigkeiten in neuen Situationen",
                ziel: "Beginnt und pflegt selbständig dauerhafte Beziehungen",
                items: [
                    {
                        nr: 37,
                        code: "SOZ-37",
                        keyword: "Empathie",
                        description: "Lässt erkennen, dass er persönliche Situationen und Gefühle anderer versteht.",
                        zielformulierungen: [
                            "Ich verstehe, wie sich andere fühlen.",
                            "Ich zeige Mitgefühl für andere."
                        ]
                    },
                    {
                        nr: 38,
                        code: "SOZ-38",
                        keyword: "verschiedene Rollen",
                        description: "Interagiert erfolgreich mit anderen in unterschiedlichen sozialen Rollen.",
                        zielformulierungen: [
                            "Ich kann verschiedene Rollen in einer Gruppe übernehmen.",
                            "Ich passe mein Verhalten der jeweiligen Situation an."
                        ]
                    },
                    {
                        nr: 39,
                        code: "SOZ-39",
                        keyword: "Prinzipien",
                        description: "Trifft in sozialen Situationen Entscheidungen aufgrund eigener Wertvorstellungen.",
                        zielformulierungen: [
                            "Ich entscheide nach meinen eigenen Werten.",
                            "Ich bleibe meinen Prinzipien treu."
                        ]
                    },
                    {
                        nr: 40,
                        code: "SOZ-40",
                        keyword: "Selbstverständnis",
                        description: "Lässt realistisches Verständnis und Einschätzung des eigenen Selbst erkennen.",
                        zielformulierungen: [
                            "Ich kenne meine Stärken und Schwächen realistisch.",
                            "Ich beschreibe, wer ich bin und wer ich sein möchte."
                        ]
                    },
                    {
                        nr: 41,
                        code: "SOZ-41",
                        keyword: "Interpersonalität",
                        description: "Zeigt die Fähigkeit, dauerhafte und tragfähige Beziehungen aufzubauen.",
                        zielformulierungen: [
                            "Ich baue langfristige Freundschaften auf.",
                            "Ich pflege meine Beziehungen zu anderen."
                        ]
                    }
                ]
            }
        }
    },

    kognition: {
        name: "Kognition",
        code: "KOG",
        color: "#f39c12",
        stufen: {
            1: {
                name: "Stufe I: Mit Freude auf die Umwelt reagieren",
                ziel: "Auf die Umgebung reagieren mit gezielten Körperbewegungen und elementaren mentalen Prozessen",
                items: [
                    { nr: 1, code: "KOG-1", keyword: "Orientierung", description: "Reagiert auf sensorischen Reiz mit Zuwendung zur Reizquelle.", zielformulierungen: ["Ich wende mich Reizen zu, die mich interessieren."] },
                    { nr: 2, code: "KOG-2", keyword: "Aufmerksamkeit", description: "Reagiert auf einen Reiz mit kurzzeitig anhaltender Aufmerksamkeit.", zielformulierungen: ["Ich bleibe kurz aufmerksam bei einer Sache."] },
                    { nr: 3, code: "KOG-3", keyword: "Kurzzeitgedächtnis", description: "Zeigt Kurzzeitgedächtnis durch Wiedererkennen von Personen oder Objekten.", zielformulierungen: ["Ich erkenne bekannte Personen und Dinge wieder."] },
                    { nr: 4, code: "KOG-4", keyword: "komplexe Reaktionen", description: "Reagiert auf komplexe Umgebungsreize mit motorischer Handlung.", zielformulierungen: ["Ich reagiere auf Anweisungen mit Handlungen."] },
                    { nr: 5, code: "KOG-5", keyword: "einfache Imitation", description: "Imitiert von sich aus einfache, vertraute Handlungen.", zielformulierungen: ["Ich mache einfache Handlungen nach."] },
                    { nr: 6, code: "KOG-6", keyword: "Motorik 18 Monate", description: "Zeigt rudimentäre fein- und grobmotorische Fähigkeiten.", zielformulierungen: ["Ich zeige grundlegende motorische Fähigkeiten."] },
                    { nr: 7, code: "KOG-7", keyword: "Bezeichnung", description: "Lässt Verständnis von Bezeichnungen für vertraute Objekte erkennen.", zielformulierungen: ["Ich verstehe die Namen von bekannten Dingen."] },
                    { nr: 8, code: "KOG-8", keyword: "Wort-Annäherung", description: "Reagiert verbal auf Fragen mit erkennbaren Wort-Annäherungen.", zielformulierungen: ["Ich antworte auf Fragen mit Worten."] },
                    { nr: 9, code: "KOG-9", keyword: "Wörter spontan", description: "Verwendet von sich aus erkennbare Wort-Annäherungen.", zielformulierungen: ["Ich benutze Wörter von mir aus."] },
                    { nr: 10, code: "KOG-10", keyword: "Form", description: "Passt ein Objekt in eine dafür passende Lücke ein.", zielformulierungen: ["Ich erkenne Formen und ordne sie zu."] },
                    { nr: 11, code: "KOG-11", keyword: "Körperteile", description: "Identifiziert eigene Körperteile.", zielformulierungen: ["Ich zeige und benenne meine Körperteile."] },
                    { nr: 12, code: "KOG-12", keyword: "Details", description: "Erkennt einfache Details in Bildern.", zielformulierungen: ["Ich erkenne Details in Bildern."] },
                    { nr: 13, code: "KOG-13", keyword: "sortieren", description: "Ordnet zwei Sorten von Objekten einander zu.", zielformulierungen: ["Ich sortiere Dinge nach Merkmalen."] },
                    { nr: 14, code: "KOG-14", keyword: "Bilder benennen", description: "Äußert Wörter, um auf Abbildungen vertraute Dinge zu bezeichnen.", zielformulierungen: ["Ich benenne Bilder mit den richtigen Wörtern."] }
                ]
            },
            2: {
                name: "Stufe II: Erfolgreich auf die Umwelt reagieren",
                ziel: "Beteiligung an Aktivitäten mit Selbsthilfe, Koordination, Sprache und mentalen Prozessen",
                items: [
                    { nr: 15, code: "KOG-15", keyword: "Gebrauchswert", description: "Erkennt Gebrauchswert vertrauter Gegenstände.", zielformulierungen: ["Ich weiß, wofür man bestimmte Dinge benutzt."] },
                    { nr: 16, code: "KOG-16", keyword: "Körper - 3", description: "Führt motorische Aktivitäten auf dem Niveau eines dreijährigen Kindes aus.", zielformulierungen: ["Ich bewege mich wie ein Dreijähriger."] },
                    { nr: 17, code: "KOG-17", keyword: "Serie - identisch", description: "Ordnet zwei identische Bilder einander zu.", zielformulierungen: ["Ich finde gleiche Bilder."] },
                    { nr: 18, code: "KOG-18", keyword: "Feinmotorik - 3", description: "Führt feinmotorische Aktivitäten auf Niveau eines dreijährigen Kindes aus.", zielformulierungen: ["Ich kann mit meinen Händen feine Bewegungen machen."] },
                    { nr: 19, code: "KOG-19", keyword: "Serie - anders", description: "Erkennt das Objekt, das sich von den anderen unterscheidet.", zielformulierungen: ["Ich finde das, was anders ist."] },
                    { nr: 20, code: "KOG-20", keyword: "Gegenteile", description: "Versteht mindestens drei einfache Gegenteile.", zielformulierungen: ["Ich kenne Gegenteile wie groß/klein."] },
                    { nr: 21, code: "KOG-21", keyword: "kategorisieren", description: "Gebraucht Kategorien beim Zuordnen einfacher Bilder.", zielformulierungen: ["Ich ordne Dinge in Gruppen."] },
                    { nr: 22, code: "KOG-22", keyword: "zählen - 4", description: "Zählt bis 4 mit 1-zu-1 Zuordnung.", zielformulierungen: ["Ich zähle bis 4."] },
                    { nr: 23, code: "KOG-23", keyword: "Farben", description: "Identifiziert vier Farben und drei Formen.", zielformulierungen: ["Ich kenne Farben und Formen."] },
                    { nr: 24, code: "KOG-24", keyword: "Alternation", description: "Gibt korrekte Antworten bei alternierenden Anweisungen.", zielformulierungen: ["Ich kann zwischen verschiedenen Aufgaben wechseln."] },
                    { nr: 25, code: "KOG-25", keyword: "zählen - 10", description: "Zählt mit 1-zu-1 Zuordnung bis 10.", zielformulierungen: ["Ich zähle bis 10."] },
                    { nr: 26, code: "KOG-26", keyword: "Auge-Hand-5", description: "Führt Aktivitäten mit Auge-Hand-Koordination auf Niveau eines Fünfjährigen aus.", zielformulierungen: ["Meine Augen und Hände arbeiten gut zusammen."] },
                    { nr: 27, code: "KOG-27", keyword: "unterscheiden", description: "Unterscheidet zwischen Ziffern, Zeichen und Großbuchstaben.", zielformulierungen: ["Ich unterscheide Zahlen von Buchstaben."] },
                    { nr: 28, code: "KOG-28", keyword: "Körper - 5", description: "Führt motorische Aktivitäten auf Niveau eines fünfjährigen Kindes aus.", zielformulierungen: ["Ich bewege mich wie ein Fünfjähriger."] },
                    { nr: 29, code: "KOG-29", keyword: "Objekte - 5", description: "Erkennt die Anzahl von Objekten bis 5 ohne zu zählen.", zielformulierungen: ["Ich erkenne kleine Mengen auf einen Blick."] },
                    { nr: 30, code: "KOG-30", keyword: "Gedächtnis", description: "Gibt Auswendiggelerntes auf dem Niveau eines fünfjährigen Kindes wieder.", zielformulierungen: ["Ich kann Lieder und Reime auswendig."] },
                    { nr: 31, code: "KOG-31", keyword: "Bilderserie", description: "Ordnet drei einfache Bilder in richtiger Reihenfolge an.", zielformulierungen: ["Ich bringe Bilder in die richtige Reihenfolge."] }
                ]
            },
            3: {
                name: "Stufe III: Erwerben von Fähigkeiten zur erfolgreichen Teilnahme in Gruppen",
                ziel: "Erfolgreiche Beteiligung in einer Lerngruppe mit grundlegenden Lernkompetenzen",
                items: [
                    { nr: 32, code: "KOG-32", keyword: "Auge-Hand-6", description: "Führt Aktivitäten mit Auge-Hand-Koordination auf Niveau eines Sechsjährigen aus.", zielformulierungen: ["Ich kann präzise mit meinen Händen arbeiten."] },
                    { nr: 33, code: "KOG-33", keyword: "Körper - 6", description: "Führt motorische Aktivitäten auf Niveau eines sechsjährigen Kindes aus.", zielformulierungen: ["Ich kann mich gut bewegen."] },
                    { nr: 34, code: "KOG-34", keyword: "lesen - 50", description: "Liest 50 Wörter des Grundwortschatzes.", zielformulierungen: ["Ich lese einfache Wörter."] },
                    { nr: 35, code: "KOG-35", keyword: "Zahlen - 10", description: "Erkennt und schreibt Zahlen bis 10.", zielformulierungen: ["Ich schreibe die Zahlen von 1 bis 10."] },
                    { nr: 36, code: "KOG-36", keyword: "schreiben - 50", description: "Schreibt 50 Wörter des Grundwortschatzes.", zielformulierungen: ["Ich schreibe einfache Wörter."] },
                    { nr: 37, code: "KOG-37", keyword: "Verständnis", description: "Hört einer Geschichte zu und lässt Verständnis erkennen.", zielformulierungen: ["Ich verstehe Geschichten, die ich höre."] },
                    { nr: 38, code: "KOG-38", keyword: "erklären", description: "Erklärt das Verhalten anderer.", zielformulierungen: ["Ich erkläre, warum jemand etwas tut."] },
                    { nr: 39, code: "KOG-39", keyword: "Sinnentnahme", description: "Liest einfache Sätze und lässt Verständnis des Inhalts erkennen.", zielformulierungen: ["Ich verstehe, was ich lese."] },
                    { nr: 40, code: "KOG-40", keyword: "Plus/Minus - 9", description: "Beherrscht Addition und Subtraktion im Zahlenraum bis 9.", zielformulierungen: ["Ich rechne Plus und Minus bis 9."] },
                    { nr: 41, code: "KOG-41", keyword: "Unlogik", description: "Erkennt Unstimmigkeiten in einfachen Situationen.", zielformulierungen: ["Ich erkenne, wenn etwas nicht stimmt."] },
                    { nr: 42, code: "KOG-42", keyword: "Antwortsätze", description: "Schreibt einfache Sätze als Antworten auf Fragen.", zielformulierungen: ["Ich schreibe Antworten in ganzen Sätzen."] },
                    { nr: 43, code: "KOG-43", keyword: "Sport - Spiele", description: "Zeigt motorische Kompetenzen für Spiele im Grundschulalter.", zielformulierungen: ["Ich kann Sport- und Bewegungsspiele mitmachen."] },
                    { nr: 44, code: "KOG-44", keyword: "Sätze frei", description: "Formuliert und schreibt einfache Sätze.", zielformulierungen: ["Ich schreibe eigene Sätze."] },
                    { nr: 45, code: "KOG-45", keyword: "numerische Konzepte", description: "Wendet Konzepte mit Addition, Subtraktion, Zeit und Geld an.", zielformulierungen: ["Ich rechne mit Zeit und Geld."] },
                    { nr: 46, code: "KOG-46", keyword: "Quantitativa", description: "Liest und erklärt Maßeinheiten von Zeit, Länge und Volumen.", zielformulierungen: ["Ich verstehe Maßeinheiten."] },
                    { nr: 47, code: "KOG-47", keyword: "Sachverhalte", description: "Liest kurze Geschichten und erzählt davon.", zielformulierungen: ["Ich lese Geschichten und erzähle sie nach."] },
                    { nr: 48, code: "KOG-48", keyword: "Operationen", description: "Führt Rechenoperationen mit Stellenwert, Übertrag und Multiplikation durch.", zielformulierungen: ["Ich rechne mit größeren Zahlen."] }
                ]
            },
            4: {
                name: "Stufe IV: Sich einbringen in Gruppenprozesse",
                ziel: "Gebraucht kognitive und schulische Fähigkeiten für soziale Gruppenerfahrungen",
                items: [
                    { nr: 49, code: "KOG-49", keyword: "Kommunikation", description: "Schreibt, um Informationen, Ereignisse oder Gefühle mitzuteilen.", zielformulierungen: ["Ich schreibe, um mich mitzuteilen."] },
                    { nr: 50, code: "KOG-50", keyword: "Mult./Divis. 100", description: "Rechnet Multiplikation und Division bis 100.", zielformulierungen: ["Ich rechne Mal und Geteilt bis 100."] },
                    { nr: 51, code: "KOG-51", keyword: "Informationsgewinn", description: "Liest aus Freude und zum Informationsgewinn.", zielformulierungen: ["Ich lese gerne, um Neues zu lernen."] },
                    { nr: 52, code: "KOG-52", keyword: "Geldmenge - 10€", description: "Berechnet Wert für Geldmengen bis 10 Euro.", zielformulierungen: ["Ich rechne mit Geld bis 10 Euro."] },
                    { nr: 53, code: "KOG-53", keyword: "Fiktion", description: "Beschreibt fiktive Charaktere und erklärt deren Motive.", zielformulierungen: ["Ich verstehe Figuren aus Geschichten und Filmen."] },
                    { nr: 54, code: "KOG-54", keyword: "Grammatik", description: "Verwendet grammatische Regeln beim Schreiben.", zielformulierungen: ["Ich schreibe grammatisch richtig."] },
                    { nr: 55, code: "KOG-55", keyword: "Wertvorstellungen", description: "Erkennt und unterscheidet gegensätzliche Werte.", zielformulierungen: ["Ich erkenne verschiedene Werte."] },
                    { nr: 56, code: "KOG-56", keyword: "Konzepte", description: "Gebraucht Maßeinheiten, um logische Probleme zu lösen.", zielformulierungen: ["Ich löse Probleme mit Maßeinheiten."] }
                ]
            },
            5: {
                name: "Stufe V: Anwenden von Fähigkeiten in neuen Situationen",
                ziel: "Setzt kognitive Fähigkeiten zur Bereicherung persönlicher Erfahrungen ein",
                items: [
                    { nr: 57, code: "KOG-57", keyword: "Zeitgeschichte", description: "Sucht die Meinung anderer zu aktuellen Problemen.", zielformulierungen: ["Ich interessiere mich für aktuelle Themen."] },
                    { nr: 58, code: "KOG-58", keyword: "Meinungen", description: "Unterscheidet in Texten zwischen Fakten und Meinungen.", zielformulierungen: ["Ich unterscheide Fakten von Meinungen."] },
                    { nr: 59, code: "KOG-59", keyword: "Inkonsistenz", description: "Erkennt unlogisches Verhalten bei anderen.", zielformulierungen: ["Ich erkenne widersprüchliches Verhalten."] },
                    { nr: 60, code: "KOG-60", keyword: "Textaufgaben", description: "Löst Textaufgaben mit Bruch-, Dezimal- und negativen Zahlen.", zielformulierungen: ["Ich löse schwierige Textaufgaben."] },
                    { nr: 61, code: "KOG-61", keyword: "Einsicht", description: "Löst persönliche Probleme anhand von Einsicht und Analyse.", zielformulierungen: ["Ich löse Probleme durch Nachdenken."] },
                    { nr: 62, code: "KOG-62", keyword: "Bürger/in", description: "Gebraucht selbständig kognitive Verfahren als Bürger/in.", zielformulierungen: ["Ich nutze mein Wissen im Alltag."] }
                ]
            }
        }
    }
};

// Anzahl der Items pro Bereich
const ITEM_COUNTS = {
    verhalten: 33,
    kommunikation: 35,
    sozialisation: 41,
    kognition: 62
};
