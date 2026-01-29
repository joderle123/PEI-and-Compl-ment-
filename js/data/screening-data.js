// Screening-Instrumente und Fragebögen für pädagogische Diagnostik
// Basierend auf entwicklungspsychologischen Erkenntnissen

const SCREENING_DATA = {

    // ============================================
    // 1. VERHALTENS-SCREENING (SDQ-ähnlich)
    // ============================================
    verhaltensScreening: {
        id: "verhaltens-screening",
        name: "Verhaltens-Screening für Kinder und Jugendliche",
        beschreibung: "Erfasst Stärken und Schwierigkeiten in verschiedenen Bereichen des Verhaltens und der emotionalen Entwicklung.",
        dauer: "5-10 Minuten",
        altersbereich: "4-17 Jahre",
        ausfueller: ["Lehrkraft", "Eltern", "Erzieher"],

        instruktion: "Bitte kreuzen Sie für jede Aussage an, inwieweit diese auf das Kind zutrifft. Beziehen Sie sich dabei auf das Verhalten in den letzten 6 Monaten.",

        skalen: {
            emotional: {
                name: "Emotionale Probleme",
                items: [
                    { nr: 1, text: "Klagt häufig über Kopfschmerzen, Bauchschmerzen oder Übelkeit", polung: "positiv" },
                    { nr: 2, text: "Hat viele Sorgen, erscheint oft besorgt", polung: "positiv" },
                    { nr: 3, text: "Ist oft unglücklich oder niedergeschlagen; weint häufig", polung: "positiv" },
                    { nr: 4, text: "Ist nervös oder anhänglich in neuen Situationen; verliert leicht das Selbstvertrauen", polung: "positiv" },
                    { nr: 5, text: "Hat viele Ängste; fürchtet sich leicht", polung: "positiv" }
                ],
                maxScore: 10,
                cutoffs: { normal: [0, 3], grenzwertig: [4, 5], auffaellig: [6, 10] }
            },
            verhalten: {
                name: "Verhaltensprobleme",
                items: [
                    { nr: 6, text: "Hat oft Wutausbrüche; ist aufbrausend", polung: "positiv" },
                    { nr: 7, text: "Ist im Allgemeinen gehorsam; macht meist, was Erwachsene verlangen", polung: "negativ" },
                    { nr: 8, text: "Streitet sich oft mit anderen Kindern oder schikaniert sie", polung: "positiv" },
                    { nr: 9, text: "Lügt oder schummelt häufig", polung: "positiv" },
                    { nr: 10, text: "Stiehlt zu Hause, in der Schule oder anderswo", polung: "positiv" }
                ],
                maxScore: 10,
                cutoffs: { normal: [0, 2], grenzwertig: [3, 3], auffaellig: [4, 10] }
            },
            hyperaktivitaet: {
                name: "Hyperaktivität/Aufmerksamkeitsprobleme",
                items: [
                    { nr: 11, text: "Ist unruhig, überaktiv, kann nicht lange stillsitzen", polung: "positiv" },
                    { nr: 12, text: "Ist ständig zappelig", polung: "positiv" },
                    { nr: 13, text: "Ist leicht ablenkbar, unkonzentriert", polung: "positiv" },
                    { nr: 14, text: "Denkt nach, bevor er/sie handelt", polung: "negativ" },
                    { nr: 15, text: "Führt Aufgaben zu Ende; gute Konzentrationsspanne", polung: "negativ" }
                ],
                maxScore: 10,
                cutoffs: { normal: [0, 5], grenzwertig: [6, 6], auffaellig: [7, 10] }
            },
            peerProbleme: {
                name: "Probleme mit Gleichaltrigen",
                items: [
                    { nr: 16, text: "Ist eher ein Einzelgänger; spielt meist alleine", polung: "positiv" },
                    { nr: 17, text: "Hat wenigstens einen guten Freund oder eine gute Freundin", polung: "negativ" },
                    { nr: 18, text: "Ist im Allgemeinen bei anderen Kindern beliebt", polung: "negativ" },
                    { nr: 19, text: "Wird von anderen gehänselt oder schikaniert", polung: "positiv" },
                    { nr: 20, text: "Kommt besser mit Erwachsenen aus als mit anderen Kindern", polung: "positiv" }
                ],
                maxScore: 10,
                cutoffs: { normal: [0, 2], grenzwertig: [3, 3], auffaellig: [4, 10] }
            },
            prosozial: {
                name: "Prosoziales Verhalten (Stärken)",
                items: [
                    { nr: 21, text: "Ist rücksichtsvoll und achtet auf die Gefühle anderer", polung: "positiv" },
                    { nr: 22, text: "Teilt gerne mit anderen Kindern (Süßigkeiten, Spielzeug, Stifte usw.)", polung: "positiv" },
                    { nr: 23, text: "Ist hilfsbereit, wenn andere verletzt, krank oder betrübt sind", polung: "positiv" },
                    { nr: 24, text: "Ist nett zu jüngeren Kindern", polung: "positiv" },
                    { nr: 25, text: "Hilft anderen oft freiwillig (Eltern, Lehrern, anderen Kindern)", polung: "positiv" }
                ],
                maxScore: 10,
                cutoffs: { normal: [6, 10], grenzwertig: [5, 5], auffaellig: [0, 4] }
            }
        },

        antwortOptionen: [
            { wert: 0, label: "Nicht zutreffend" },
            { wert: 1, label: "Teilweise zutreffend" },
            { wert: 2, label: "Eindeutig zutreffend" }
        ],

        auswertung: {
            gesamtproblemwert: {
                berechnung: "emotional + verhalten + hyperaktivitaet + peerProbleme",
                maxScore: 40,
                cutoffs: { normal: [0, 13], grenzwertig: [14, 16], auffaellig: [17, 40] }
            }
        },

        interpretation: {
            normal: "Die Werte liegen im Normalbereich. Das Kind zeigt keine auffälligen Schwierigkeiten in diesem Bereich.",
            grenzwertig: "Die Werte liegen im Grenzbereich. Eine genauere Beobachtung und ggf. gezielte Unterstützung wird empfohlen.",
            auffaellig: "Die Werte sind erhöht. Eine weitere diagnostische Abklärung und gezielte Intervention wird empfohlen."
        }
    },

    // ============================================
    // 2. FUNKTIONALE VERHALTENSANALYSE (ABC)
    // ============================================
    verhaltensanalyse: {
        id: "abc-analyse",
        name: "Funktionale Verhaltensanalyse (ABC-Bogen)",
        beschreibung: "Strukturierte Erfassung von Verhalten im Kontext: Auslöser - Verhalten - Konsequenz. Hilft, die Funktion eines Verhaltens zu verstehen.",
        dauer: "Pro Situation 2-3 Minuten",

        instruktion: "Beschreiben Sie eine konkrete Situation, in der das problematische Verhalten aufgetreten ist. Füllen Sie alle Felder so genau wie möglich aus.",

        felder: {
            datum: { label: "Datum und Uhrzeit", typ: "datetime", pflicht: true },
            ort: { label: "Ort/Situation", typ: "text", pflicht: true, beispiel: "Klassenzimmer, Pause, Sportunterricht..." },
            anwesende: { label: "Anwesende Personen", typ: "text", pflicht: false },

            vorgeschichte: {
                label: "A - Antecedent (Was geschah VORHER?)",
                typ: "textarea",
                pflicht: true,
                hinweis: "Was passierte unmittelbar bevor das Verhalten auftrat? Wer sagte/tat was?",
                leitfragen: [
                    "Welche Aktivität fand gerade statt?",
                    "Gab es eine Veränderung (Übergang, neue Aufgabe)?",
                    "War das Kind müde, hungrig, überstimuliert?",
                    "Gab es eine Aufforderung/Anweisung?",
                    "Interagierte das Kind mit jemandem?"
                ]
            },

            verhalten: {
                label: "B - Behavior (Was war das VERHALTEN?)",
                typ: "textarea",
                pflicht: true,
                hinweis: "Beschreiben Sie das Verhalten objektiv und beobachtbar - was genau hat das Kind getan?",
                leitfragen: [
                    "Was hat das Kind genau gesagt/getan?",
                    "Wie lange dauerte das Verhalten?",
                    "Wie intensiv war es (Skala 1-10)?",
                    "War es gerichtet gegen Personen/Gegenstände?"
                ]
            },

            konsequenz: {
                label: "C - Consequence (Was geschah DANACH?)",
                typ: "textarea",
                pflicht: true,
                hinweis: "Wie haben Sie und andere reagiert? Was war das unmittelbare Ergebnis für das Kind?",
                leitfragen: [
                    "Wie haben Sie reagiert?",
                    "Wie haben andere Kinder reagiert?",
                    "Hat das Kind bekommen, was es wollte?",
                    "Konnte das Kind etwas vermeiden?",
                    "Hat das Kind Aufmerksamkeit erhalten?"
                ]
            },

            vermutete_funktion: {
                label: "Vermutete Funktion des Verhaltens",
                typ: "select",
                optionen: [
                    { wert: "aufmerksamkeit", label: "Aufmerksamkeit erlangen" },
                    { wert: "vermeidung", label: "Vermeidung/Flucht von Aufgaben oder Situationen" },
                    { wert: "gegenstand", label: "Zugang zu Gegenstand oder Aktivität" },
                    { wert: "sensorisch", label: "Sensorische Stimulation" },
                    { wert: "kontrolle", label: "Kontrolle/Macht" },
                    { wert: "unklar", label: "Noch unklar" }
                ]
            },

            alternative: {
                label: "Welches alternative Verhalten könnte dieselbe Funktion erfüllen?",
                typ: "textarea",
                pflicht: false,
                hinweis: "Was könnte das Kind stattdessen tun, um dasselbe Bedürfnis zu befriedigen?"
            }
        },

        funktionen_erklaerung: {
            aufmerksamkeit: {
                beschreibung: "Das Kind zeigt das Verhalten, um Aufmerksamkeit von Erwachsenen oder Gleichaltrigen zu bekommen.",
                anzeichen: [
                    "Verhalten tritt auf, wenn Erwachsener beschäftigt ist",
                    "Kind schaut, ob jemand zusieht",
                    "Verhalten stoppt, wenn Aufmerksamkeit gegeben wird"
                ],
                intervention: "Geplante Aufmerksamkeit geben, Verhalten ignorieren (wenn sicher), alternatives Aufmerksamkeit-Holen lehren"
            },
            vermeidung: {
                beschreibung: "Das Kind zeigt das Verhalten, um einer Aufgabe, Situation oder Person zu entkommen.",
                anzeichen: [
                    "Verhalten tritt bei bestimmten Aufgaben auf",
                    "Verhalten führt dazu, dass Anforderung entfällt",
                    "Kind wirkt erleichtert, wenn es wegdarf"
                ],
                intervention: "Aufgaben anpassen, Pausen strukturiert anbieten, Hilfe-Suchen lehren"
            },
            gegenstand: {
                beschreibung: "Das Kind zeigt das Verhalten, um Zugang zu etwas Erwünschtem zu bekommen.",
                anzeichen: [
                    "Verhalten tritt auf, wenn etwas verweigert wird",
                    "Kind erhält durch Verhalten den gewünschten Gegenstand/Aktivität"
                ],
                intervention: "Angemessenes Bitten lehren, Token-System, Warten üben"
            },
            sensorisch: {
                beschreibung: "Das Verhalten selbst fühlt sich gut an oder reguliert das Erregungsniveau.",
                anzeichen: [
                    "Verhalten tritt auch auf, wenn das Kind alleine ist",
                    "Kein klarer externer Auslöser",
                    "Kind scheint dabei entspannt oder fokussiert"
                ],
                intervention: "Alternative sensorische Aktivitäten anbieten, Bewegungspausen"
            },
            kontrolle: {
                beschreibung: "Das Kind zeigt das Verhalten, um Kontrolle über die Situation zu haben.",
                anzeichen: [
                    "Verhalten tritt bei Übergängen oder Veränderungen auf",
                    "Kind will bestimmen, was passiert",
                    "Widerstand gegen Anweisungen"
                ],
                intervention: "Wahlmöglichkeiten anbieten, Vorhersehbarkeit erhöhen, Kontrolle in akzeptablen Bereichen ermöglichen"
            }
        }
    },

    // ============================================
    // 3. UNTERRICHTSBEOBACHTUNG
    // ============================================
    unterrichtsbeobachtung: {
        id: "unterrichtsbeobachtung",
        name: "Strukturierter Beobachtungsbogen für den Unterricht",
        beschreibung: "Systematische Erfassung des Verhaltens während einer Unterrichtsstunde oder -einheit.",
        dauer: "15-45 Minuten Beobachtung",

        kopfdaten: {
            schueler: { label: "Name des Schülers", typ: "text" },
            datum: { label: "Datum", typ: "date" },
            uhrzeit: { label: "Uhrzeit (von-bis)", typ: "text" },
            fach: { label: "Fach/Aktivität", typ: "text" },
            lehrkraft: { label: "Lehrkraft", typ: "text" },
            beobachter: { label: "Beobachter", typ: "text" },
            klassensituation: { label: "Unterrichtsform", typ: "select", optionen: ["Frontalunterricht", "Einzelarbeit", "Partnerarbeit", "Gruppenarbeit", "Freies Arbeiten", "Kreisgespräch"] }
        },

        intervallBeobachtung: {
            instruktion: "Beobachten Sie das Kind alle 2 Minuten für 10 Sekunden und notieren Sie das vorherrschende Verhalten.",
            kategorien: [
                { code: "A", label: "Aufgabenbezogen", beschreibung: "Arbeitet an der Aufgabe, hört zu, beteiligt sich" },
                { code: "W", label: "Warten", beschreibung: "Wartet angemessen (z.B. auf Hilfe)" },
                { code: "M", label: "Motorische Unruhe", beschreibung: "Zappelt, steht auf, bewegt sich ohne Zweck" },
                { code: "AB", label: "Ablenkung", beschreibung: "Beschäftigt sich mit anderem (nicht störend)" },
                { code: "ST", label: "Störung", beschreibung: "Stört andere, ruft rein, macht Geräusche" },
                { code: "AG", label: "Aggression", beschreibung: "Verbale oder physische Aggression" },
                { code: "RZ", label: "Rückzug", beschreibung: "Reagiert nicht, wirkt abwesend, verweigert" },
                { code: "SO", label: "Sozial positiv", beschreibung: "Angemessene Interaktion mit anderen" }
            ],
            anzahlIntervalle: 15 // 30 Minuten bei 2-Min-Intervallen
        },

        ereignisRegistrierung: {
            instruktion: "Notieren Sie jedes Auftreten der folgenden Verhaltensweisen:",
            verhaltensweisen: [
                { id: "aufstehen", label: "Steht vom Platz auf (ohne Erlaubnis)" },
                { id: "reinrufen", label: "Ruft rein / spricht ohne sich zu melden" },
                { id: "anweisung_ignorieren", label: "Ignoriert Anweisung der Lehrkraft" },
                { id: "aggression_verbal", label: "Beschimpft / beleidigt andere" },
                { id: "aggression_physisch", label: "Schlägt / schubst / wirft" },
                { id: "material_zerstoeren", label: "Zerstört Material" },
                { id: "weinen", label: "Weint / ist sichtbar traurig" },
                { id: "verweigerung", label: "Verweigert Aufgabe komplett" }
            ]
        },

        zusatzbeobachtungen: {
            sitzplatz: { label: "Wo sitzt das Kind?", typ: "text" },
            nachbarn: { label: "Wer sitzt neben dem Kind?", typ: "text" },
            lehrerinteraktion: {
                label: "Interaktion mit Lehrkraft",
                typ: "checkboxes",
                optionen: [
                    "Wird oft ermahnt",
                    "Erhält Lob",
                    "Wird individuell angesprochen",
                    "Wird kaum beachtet",
                    "Bekommt extra Unterstützung"
                ]
            },
            peerinteraktion: {
                label: "Interaktion mit Mitschülern",
                typ: "checkboxes",
                optionen: [
                    "Wird von anderen angesprochen",
                    "Spricht andere an",
                    "Wird ausgegrenzt",
                    "Hat feste Spielpartner",
                    "Konflikte mit bestimmten Kindern"
                ]
            },
            besonderheiten: { label: "Besondere Beobachtungen / Auffälligkeiten", typ: "textarea" }
        },

        auswertung: {
            prozentRechnung: "Anzahl aufgabenbezogener Intervalle / Gesamtintervalle × 100 = On-Task-Rate",
            vergleichswert: "Typische On-Task-Rate in Grundschulen: 70-85%",
            interpretation: {
                hoch: { bereich: [80, 100], text: "Gutes Arbeitsverhalten" },
                mittel: { bereich: [60, 79], text: "Arbeitsverhalten mit Verbesserungspotenzial" },
                niedrig: { bereich: [0, 59], text: "Deutlich eingeschränktes Arbeitsverhalten - Unterstützung empfohlen" }
            }
        }
    },

    // ============================================
    // 4. SOZIALE KOMPETENZ-EINSCHÄTZUNG
    // ============================================
    sozialeKompetenz: {
        id: "soziale-kompetenz",
        name: "Einschätzung sozialer Kompetenzen",
        beschreibung: "Erfasst verschiedene Aspekte sozialer Fähigkeiten im Schulkontext.",
        dauer: "5-10 Minuten",

        bereiche: {
            kooperation: {
                name: "Kooperation",
                items: [
                    { nr: 1, text: "Befolgt Anweisungen der Lehrkraft" },
                    { nr: 2, text: "Hält sich an Klassenregeln" },
                    { nr: 3, text: "Arbeitet gut mit anderen zusammen" },
                    { nr: 4, text: "Teilt Materialien mit anderen" },
                    { nr: 5, text: "Akzeptiert Kritik angemessen" }
                ]
            },
            selbstbehauptung: {
                name: "Selbstbehauptung",
                items: [
                    { nr: 6, text: "Bittet um Hilfe, wenn nötig" },
                    { nr: 7, text: "Vertritt eigene Meinung angemessen" },
                    { nr: 8, text: "Nimmt Kontakt zu anderen auf" },
                    { nr: 9, text: "Wehrt sich angemessen gegen Ungerechtigkeiten" },
                    { nr: 10, text: "Sagt 'Nein', wenn etwas nicht in Ordnung ist" }
                ]
            },
            selbstkontrolle: {
                name: "Selbstkontrolle",
                items: [
                    { nr: 11, text: "Kann warten, bis er/sie an der Reihe ist" },
                    { nr: 12, text: "Bleibt ruhig bei Konflikten" },
                    { nr: 13, text: "Kann mit Frustration umgehen" },
                    { nr: 14, text: "Reagiert angemessen auf Kritik" },
                    { nr: 15, text: "Kontrolliert Emotionen in schwierigen Situationen" }
                ]
            },
            empathie: {
                name: "Empathie/Perspektivübernahme",
                items: [
                    { nr: 16, text: "Erkennt Gefühle anderer" },
                    { nr: 17, text: "Zeigt Mitgefühl" },
                    { nr: 18, text: "Hilft anderen, die Probleme haben" },
                    { nr: 19, text: "Berücksichtigt Sichtweise anderer" },
                    { nr: 20, text: "Tröstet andere, die traurig sind" }
                ]
            },
            verantwortung: {
                name: "Verantwortung",
                items: [
                    { nr: 21, text: "Gibt Fehler zu" },
                    { nr: 22, text: "Übernimmt Verantwortung für eigenes Handeln" },
                    { nr: 23, text: "Erledigt übertragene Aufgaben zuverlässig" },
                    { nr: 24, text: "Geht sorgsam mit Eigentum anderer um" },
                    { nr: 25, text: "Entschuldigt sich nach Fehlverhalten" }
                ]
            }
        },

        antwortOptionen: [
            { wert: 0, label: "Nie/Selten" },
            { wert: 1, label: "Manchmal" },
            { wert: 2, label: "Oft" },
            { wert: 3, label: "Fast immer" }
        ]
    },

    // ============================================
    // 5. SELBSTEINSCHÄTZUNG FÜR SCHÜLER
    // ============================================
    selbsteinschaetzung: {
        id: "selbsteinschaetzung",
        name: "Wie geht es mir? (Selbsteinschätzung für Schüler)",
        beschreibung: "Altersgerechte Selbsteinschätzung für Kinder ab ca. 8 Jahren",
        dauer: "5-10 Minuten",
        hinweis: "Kann vorgelesen werden. Bei jüngeren Kindern ggf. mit Smileys arbeiten.",

        bereiche: {
            schule: {
                name: "In der Schule",
                items: [
                    { nr: 1, text: "Ich gehe gerne in die Schule" },
                    { nr: 2, text: "Ich verstehe, was ich lernen soll" },
                    { nr: 3, text: "Ich kann mich gut konzentrieren" },
                    { nr: 4, text: "Ich mache meine Aufgaben fertig" },
                    { nr: 5, text: "Ich traue mich, im Unterricht etwas zu sagen" }
                ]
            },
            freunde: {
                name: "Mit anderen Kindern",
                items: [
                    { nr: 6, text: "Ich habe Freunde in der Klasse" },
                    { nr: 7, text: "Andere Kinder spielen gerne mit mir" },
                    { nr: 8, text: "Ich kann gut mit anderen zusammenarbeiten" },
                    { nr: 9, text: "Ich werde manchmal geärgert" },
                    { nr: 10, text: "Ich streite oft mit anderen" }
                ]
            },
            gefuehle: {
                name: "Meine Gefühle",
                items: [
                    { nr: 11, text: "Ich bin meistens gut gelaunt" },
                    { nr: 12, text: "Ich mache mir oft Sorgen" },
                    { nr: 13, text: "Ich bin oft traurig" },
                    { nr: 14, text: "Ich werde schnell wütend" },
                    { nr: 15, text: "Ich kann mich beruhigen, wenn ich aufgeregt bin" }
                ]
            },
            staerken: {
                name: "Was ich gut kann",
                items: [
                    { nr: 16, text: "Ich kann anderen gut helfen" },
                    { nr: 17, text: "Ich bin gut in manchen Fächern" },
                    { nr: 18, text: "Ich kann gut zuhören" },
                    { nr: 19, text: "Ich halte mich an Regeln" },
                    { nr: 20, text: "Ich kann Probleme lösen" }
                ]
            }
        },

        antwortOptionen: [
            { wert: 0, label: "Stimmt nicht", emoji: "😞" },
            { wert: 1, label: "Stimmt ein bisschen", emoji: "😐" },
            { wert: 2, label: "Stimmt ziemlich", emoji: "🙂" },
            { wert: 3, label: "Stimmt genau", emoji: "😊" }
        ],

        offeneFragen: [
            { frage: "Was macht dir in der Schule am meisten Spaß?", typ: "textarea" },
            { frage: "Was fällt dir in der Schule schwer?", typ: "textarea" },
            { frage: "Was würdest du gerne besser können?", typ: "textarea" },
            { frage: "Wer kann dir helfen, wenn du ein Problem hast?", typ: "textarea" }
        ]
    },

    // ============================================
    // 6. ELTERNFRAGEBOGEN
    // ============================================
    elternfragebogen: {
        id: "eltern-fragebogen",
        name: "Fragebogen für Eltern/Erziehungsberechtigte",
        beschreibung: "Erfasst die Perspektive der Eltern auf das Verhalten und die Entwicklung des Kindes.",
        dauer: "10-15 Minuten",

        abschnitte: {
            entwicklung: {
                name: "Entwicklungsgeschichte",
                fragen: [
                    { id: "schwangerschaft", text: "Gab es Besonderheiten während der Schwangerschaft oder Geburt?", typ: "textarea" },
                    { id: "meilensteine", text: "Wann hat Ihr Kind die ersten Schritte gemacht? Die ersten Worte gesprochen?", typ: "textarea" },
                    { id: "kindergarten", text: "Wie war die Zeit im Kindergarten?", typ: "textarea" },
                    { id: "besonderheiten", text: "Gab es früher oder gibt es aktuell besondere Belastungen in der Familie?", typ: "textarea" }
                ]
            },
            verhaltenZuhause: {
                name: "Verhalten zu Hause",
                items: [
                    { nr: 1, text: "Hält sich an Regeln zu Hause" },
                    { nr: 2, text: "Kann sich alleine beschäftigen" },
                    { nr: 3, text: "Schläft gut durch" },
                    { nr: 4, text: "Isst ausgewogen" },
                    { nr: 5, text: "Erledigt Aufgaben selbstständig (Anziehen, Aufräumen)" },
                    { nr: 6, text: "Hat Wutausbrüche" },
                    { nr: 7, text: "Ist ängstlich oder besorgt" },
                    { nr: 8, text: "Zieht sich zurück" },
                    { nr: 9, text: "Kommt mit Geschwistern aus" },
                    { nr: 10, text: "Hat Freunde außerhalb der Schule" }
                ]
            },
            staerken: {
                name: "Stärken und Interessen",
                fragen: [
                    { id: "staerken", text: "Was kann Ihr Kind besonders gut?", typ: "textarea" },
                    { id: "interessen", text: "Wofür interessiert sich Ihr Kind?", typ: "textarea" },
                    { id: "aktivitaeten", text: "Welche Freizeitaktivitäten macht Ihr Kind?", typ: "textarea" }
                ]
            },
            sorgen: {
                name: "Ihre Sorgen und Wünsche",
                fragen: [
                    { id: "hauptsorge", text: "Was macht Ihnen aktuell die größten Sorgen bezüglich Ihres Kindes?", typ: "textarea" },
                    { id: "wunsch", text: "Was wünschen Sie sich für Ihr Kind?", typ: "textarea" },
                    { id: "unterstuetzung", text: "Welche Unterstützung wäre für Sie hilfreich?", typ: "textarea" }
                ]
            }
        },

        antwortOptionen: [
            { wert: 0, label: "Stimmt nicht" },
            { wert: 1, label: "Stimmt teilweise" },
            { wert: 2, label: "Stimmt überwiegend" },
            { wert: 3, label: "Stimmt genau" }
        ]
    }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SCREENING_DATA };
}
