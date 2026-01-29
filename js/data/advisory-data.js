// Advisory Tool - Wissensbasis für pädagogische Beratung
// Basierend auf ELDiB und entwicklungspsychologischen Erkenntnissen

const ADVISORY_DATA = {

    // ============================================
    // PROBLEMATIKEN - Hauptkategorien
    // ============================================

    problematiken: {

        // -----------------------------------------
        // OPPOSITIONELLES VERHALTEN
        // -----------------------------------------
        oppositionell: {
            id: "oppositionell",
            name: "Oppositionelles Verhalten",
            kategorie: "externalisierend",
            icon: "🚫",
            beschreibung: "Das Kind widersetzt sich häufig Anweisungen, Regeln und Aufforderungen von Erwachsenen. Es argumentiert, verweigert oder tut das Gegenteil von dem, was verlangt wird.",

            beispiele: [
                "Verweigert Arbeitsaufträge",
                "Sagt 'Nein' auf Anweisungen",
                "Diskutiert über jede Regel",
                "Macht absichtlich das Gegenteil",
                "Beschuldigt andere für eigenes Fehlverhalten"
            ],

            explorationsFragen: [
                {
                    frage: "In welchen Situationen zeigt sich das oppositionelle Verhalten am stärksten?",
                    kategorie: "kontext",
                    hinweis: "Achten Sie auf Muster: Übergänge, bestimmte Fächer, Tageszeiten, nach Pausen..."
                },
                {
                    frage: "Gibt es Erwachsene oder Situationen, bei denen das Kind kooperiert?",
                    kategorie: "ressourcen",
                    hinweis: "Dies zeigt, dass das Kind grundsätzlich die Fähigkeit zur Kooperation hat."
                },
                {
                    frage: "Was passiert unmittelbar BEVOR das oppositionelle Verhalten auftritt?",
                    kategorie: "trigger",
                    hinweis: "Typische Trigger: Überforderung, Unterforderung, Kontrollverlust, Ungerechtigkeit"
                },
                {
                    frage: "Wie reagiert das Kind, wenn es doch kooperiert und dafür gelobt wird?",
                    kategorie: "verstärkung",
                    hinweis: "Manche Kinder zeigen paradoxe Reaktionen auf Lob (V-14)"
                },
                {
                    frage: "Kennt das Kind die Regeln und kann sie benennen?",
                    kategorie: "entwicklung",
                    hinweis: "Unterscheidung: Kennt nicht vs. Will nicht vs. Kann nicht"
                },
                {
                    frage: "Kann das Kind erklären, WARUM bestimmte Regeln existieren?",
                    kategorie: "entwicklung",
                    hinweis: "Verständnis für Begründungen ist entwicklungsbedingt (V-17)"
                },
                {
                    frage: "Zeigt das Kind das Verhalten auch gegenüber Gleichaltrigen oder nur bei Erwachsenen?",
                    kategorie: "differenzial",
                    hinweis: "Nur bei Erwachsenen → eher Autoritätskonflikt; auch bei Peers → soziale Entwicklung"
                },
                {
                    frage: "Gibt es belastende Faktoren im familiären Umfeld?",
                    kategorie: "kontext",
                    hinweis: "Scheidung, Krankheit, Geschwister, Umzug können Verhalten beeinflussen"
                }
            ],

            relevante_eldib_items: {
                basiskompetenzen: ["V-10", "V-11", "V-14"],
                kernkompetenzen: ["V-16", "V-17", "V-18", "V-20", "V-21"],
                fortgeschritten: ["V-25", "V-26", "V-27"],
                kommunikation: ["K-16", "K-17"],
                sozialisation: ["SOZ-14", "SOZ-15", "SOZ-23"]
            },

            entwicklungslogik: [
                {
                    wenn: "Kind kann nicht warten (V-10 nicht erreicht)",
                    dann: "Fokus auf Impulskontrolle und Warten üben",
                    intervention: "Visuelle Timer, klare Wartezeiten, sofortige Verstärkung bei kurzem Warten"
                },
                {
                    wenn: "Kind kennt Regeln nicht (V-16 nicht erreicht)",
                    dann: "Regeln explizit lehren, nicht voraussetzen",
                    intervention: "Regelplakate, tägliche Wiederholung, positive Formulierung"
                },
                {
                    wenn: "Kind kennt Regeln, aber nicht Begründungen (V-17 nicht erreicht)",
                    dann: "Verständnis für das WARUM aufbauen",
                    intervention: "Gemeinsam Regeln besprechen, Konsequenzen erklären, nicht moralisieren"
                },
                {
                    wenn: "Kind kann keine Alternativen benennen (V-18 nicht erreicht)",
                    dann: "Verhaltensalternativen explizit lehren",
                    intervention: "Sozialgeschichten, Rollenspiele, 'Was könntest du stattdessen tun?'"
                },
                {
                    wenn: "Kind kann Alternativen benennen, wendet sie aber nicht an (V-25 nicht erreicht)",
                    dann: "Transfer von Wissen zu Handlung unterstützen",
                    intervention: "In-Situation-Coaching, Erinnerungshilfen, sofortige Verstärkung"
                }
            ],

            interventionen: {
                allgemein: [
                    {
                        name: "Proaktive Strategien",
                        beschreibung: "Vorbeugend handeln statt nur reagieren",
                        massnahmen: [
                            "Klare, vorhersehbare Strukturen schaffen",
                            "Wahlmöglichkeiten anbieten (kontrollierte Autonomie)",
                            "Übergänge ankündigen und begleiten",
                            "Positive Beziehung aufbauen außerhalb von Konfliktsituationen"
                        ]
                    },
                    {
                        name: "Kommunikationsstrategien",
                        beschreibung: "Wie Anweisungen gegeben werden",
                        massnahmen: [
                            "Kurze, klare Anweisungen (max. 1-2 Schritte)",
                            "Positiv formulieren ('Geh bitte' statt 'Renn nicht')",
                            "Blickkontakt sicherstellen vor Anweisung",
                            "Zeit zum Verarbeiten geben (5-10 Sekunden warten)",
                            "Nicht diskutieren, Anweisung einmal wiederholen, dann Konsequenz"
                        ]
                    },
                    {
                        name: "Beziehungsaufbau",
                        beschreibung: "5:1 Regel - 5 positive Interaktionen für jede negative",
                        massnahmen: [
                            "Tägliche 2-Minuten-Einzelzeit (interessenbasiert)",
                            "Stärken des Kindes aktiv nutzen",
                            "Humor einsetzen (wenn angemessen)",
                            "Körpersprache: Auf Augenhöhe, offen"
                        ]
                    }
                ],

                ichZiele: [
                    "Ich warte bis der/die LehrerIn mich ruft. (V-10)",
                    "Ich sage, was unsere Klassenregeln sind. (V-16)",
                    "Ich sage, warum es diese Regeln gibt. (V-17)",
                    "Ich sage, wie ich mich anders verhalten könnte. (V-18)",
                    "Ich bleibe ruhig, auch wenn andere die Kontrolle verlieren. (V-20)"
                ]
            },

            warnzeichen: [
                "Verhalten eskaliert trotz konsequenter Intervention über 6+ Wochen",
                "Körperliche Aggression gegen Menschen oder Tiere",
                "Anhaltende Traurigkeit oder Rückzug zusätzlich zur Opposition",
                "Verhalten tritt in ALLEN Kontexten gleich stark auf",
                "Deutliche Beeinträchtigung der schulischen/sozialen Funktionsfähigkeit"
            ],

            differenzialUeberlegungen: [
                "ADHS: Impulsivität vs. gezielte Opposition - bei ADHS oft 'kann nicht' statt 'will nicht'",
                "Angststörung: Opposition als Vermeidungsstrategie bei Überforderung/Angst",
                "Sprachverständnis: Versteht das Kind die Anweisungen wirklich?",
                "Hochbegabung: Unterforderung kann zu oppositionellem Verhalten führen",
                "Trauma: Kontrollbedürfnis als Schutzstrategie"
            ]
        },

        // -----------------------------------------
        // AGGRESSION / WUTAUSBRÜCHE
        // -----------------------------------------
        aggression: {
            id: "aggression",
            name: "Aggression und Wutausbrüche",
            kategorie: "externalisierend",
            icon: "💥",
            beschreibung: "Das Kind zeigt körperliche oder verbale Aggression, hat intensive Wutausbrüche oder zerstört Gegenstände. Die Reaktionen erscheinen oft unverhältnismäßig zum Auslöser.",

            beispiele: [
                "Schlägt, tritt oder beißt andere Kinder/Erwachsene",
                "Wirft mit Gegenständen (Stühle, Stifte, etc.)",
                "Schreit, beschimpft andere",
                "Zerstört eigene oder fremde Sachen",
                "Verliert bei Kleinigkeiten die Kontrolle"
            ],

            explorationsFragen: [
                {
                    frage: "Wie kündigt sich ein Wutausbruch an? Gibt es Frühwarnzeichen?",
                    kategorie: "muster",
                    hinweis: "Körperliche Zeichen: Anspannung, Gesichtsröte, geballte Fäuste, Unruhe"
                },
                {
                    frage: "Was sind die häufigsten Auslöser?",
                    kategorie: "trigger",
                    hinweis: "Typisch: Frustration, Ungerechtigkeit, Überforderung, sensorische Überlastung"
                },
                {
                    frage: "Wie schnell beruhigt sich das Kind wieder?",
                    kategorie: "regulation",
                    hinweis: "Minuten vs. Stunden gibt Hinweise auf Regulationsfähigkeit"
                },
                {
                    frage: "Zeigt das Kind nach dem Ausbruch Reue oder Einsicht?",
                    kategorie: "entwicklung",
                    hinweis: "Wichtig für V-27 (Verantwortung) und Empathie-Entwicklung"
                },
                {
                    frage: "Richtet sich die Aggression gegen bestimmte Personen oder ist sie ungerichtet?",
                    kategorie: "muster",
                    hinweis: "Gerichtet = möglicherweise Beziehungsthema; ungerichtet = eher Regulation"
                },
                {
                    frage: "Wie wurde bisher auf die Aggression reagiert?",
                    kategorie: "intervention",
                    hinweis: "Verstärkungsmuster erkennen: Bekommt Kind durch Aggression, was es will?"
                },
                {
                    frage: "Gibt es Situationen, in denen das Kind seine Wut kontrolliert?",
                    kategorie: "ressourcen",
                    hinweis: "Zeigt Potenzial und gibt Hinweise auf hilfreiche Bedingungen"
                },
                {
                    frage: "Wie ist die Schlafsituation? Ernährung? Bewegung?",
                    kategorie: "grundbedürfnisse",
                    hinweis: "Müdigkeit, Hunger, Bewegungsmangel senken Frustrationstoleranz drastisch"
                }
            ],

            relevante_eldib_items: {
                basiskompetenzen: ["V-10", "V-11", "V-12", "V-14"],
                kernkompetenzen: ["V-18", "V-20", "V-21"],
                fortgeschritten: ["V-25", "V-26", "V-27", "V-28"],
                kommunikation: ["K-16", "K-19", "K-21", "K-26"],
                sozialisation: ["SOZ-17", "SOZ-18", "SOZ-34"]
            },

            entwicklungslogik: [
                {
                    wenn: "Kind kann Gefühle nicht benennen (K-16 nicht erreicht)",
                    dann: "Gefühlswortschatz aufbauen",
                    intervention: "Gefühlskarten, Gefühlsbarometer, regelmäßige Gefühlsrunden"
                },
                {
                    wenn: "Kind erkennt Frühwarnzeichen nicht",
                    dann: "Körperwahrnehmung schulen",
                    intervention: "Ampelsystem (Grün-Gelb-Rot), Körperlandkarte der Gefühle"
                },
                {
                    wenn: "Kind hat keine Strategien (V-18 nicht erreicht)",
                    dann: "Beruhigungsstrategien konkret lehren",
                    intervention: "Wut-Werkzeugkasten: Atmen, Zählen, Rückzugsort, Knautschball"
                },
                {
                    wenn: "Kind wendet Strategien nicht an (V-25 nicht erreicht)",
                    dann: "In-Situation-Coaching bei Frühwarnzeichen",
                    intervention: "Proaktiv eingreifen bei 'Gelb', nicht erst bei 'Rot'"
                },
                {
                    wenn: "Kind zeigt keine Reue (V-27 nicht erreicht)",
                    dann: "Perspektivübernahme fördern",
                    intervention: "Nachbesprechung: Wie hat sich X gefühlt? Was hätte geholfen?"
                }
            ],

            interventionen: {
                allgemein: [
                    {
                        name: "Prävention durch Struktur",
                        beschreibung: "Ausbrüche verhindern bevor sie entstehen",
                        massnahmen: [
                            "Trigger identifizieren und minimieren",
                            "Regelmäßige Bewegungspausen",
                            "Sensorische Pausen bei Überstimulation",
                            "Vorhersehbare Tagesstruktur"
                        ]
                    },
                    {
                        name: "Frühintervention",
                        beschreibung: "Bei ersten Anzeichen handeln",
                        massnahmen: [
                            "Ampelsystem einführen und täglich üben",
                            "Bei 'Gelb': Strategien anbieten, nicht ignorieren",
                            "Rückzugsort etablieren (kein Strafraum!)",
                            "Ablenkung/Aktivitätswechsel anbieten"
                        ]
                    },
                    {
                        name: "Während des Ausbruchs",
                        beschreibung: "Sicherheit gewährleisten, nicht eskalieren",
                        massnahmen: [
                            "Ruhe bewahren, langsam und leise sprechen",
                            "Andere Kinder in Sicherheit bringen",
                            "Nicht argumentieren oder moralisieren",
                            "Physische Präsenz, aber Raum lassen",
                            "Warten bis Kind reguliert ist, DANN besprechen"
                        ]
                    },
                    {
                        name: "Nach dem Ausbruch",
                        beschreibung: "Lernen ermöglichen",
                        massnahmen: [
                            "Zeit zum vollständigen Regulieren geben",
                            "Kurze, nicht beschämende Nachbesprechung",
                            "Wiedergutmachung ermöglichen",
                            "Positiven Neustart ermöglichen"
                        ]
                    }
                ],

                ichZiele: [
                    "Wenn ich wütend bin, sage ich 'Stopp' und atme durch. (V-18/K-16)",
                    "Ich sage, was mich stört, ohne jemanden zu verletzen. (K-16)",
                    "Ich gehe zum Ruhe-Platz, wenn ich merke, dass ich wütend werde. (V-25)",
                    "Ich bleibe ruhig, auch wenn mich jemand ärgert. (V-26)",
                    "Ich übernehme Verantwortung für mein Verhalten. (V-27)"
                ]
            },

            warnzeichen: [
                "Aggression ohne erkennbaren Auslöser",
                "Zunehmende Intensität/Häufigkeit trotz Intervention",
                "Gezielte, geplante Aggression (vs. impulsiv)",
                "Freude an Leid anderer (fehlende Empathie)",
                "Selbstverletzendes Verhalten",
                "Aggression gegen Tiere"
            ],

            differenzialUeberlegungen: [
                "ADHS: Impulsive Aggression ohne Vorplanung, schnelle Reue",
                "Autismus-Spektrum: Sensorische Überlastung, Veränderungen als Trigger",
                "Trauma: Hyperarousal, Fight-Response bei vermeintlicher Bedrohung",
                "Sprachstörung: Frustration durch Kommunikationsprobleme",
                "Depression: Gereiztheit kann maskierte Depression sein"
            ]
        },

        // -----------------------------------------
        // RÜCKZUG / VERMEIDUNG
        // -----------------------------------------
        rueckzug: {
            id: "rueckzug",
            name: "Rückzug und Vermeidung",
            kategorie: "internalisierend",
            icon: "🐚",
            beschreibung: "Das Kind zieht sich zurück, vermeidet soziale Situationen, spricht wenig oder gar nicht, wirkt in sich gekehrt oder ängstlich.",

            beispiele: [
                "Spricht nicht oder nur flüsternd",
                "Vermeidet Blickkontakt",
                "Spielt immer alleine",
                "Weigert sich, vor der Klasse zu sprechen",
                "Wirkt abwesend, 'in seiner eigenen Welt'",
                "Weint leise oder heimlich"
            ],

            explorationsFragen: [
                {
                    frage: "Ist das Verhalten situationsspezifisch oder generell?",
                    kategorie: "muster",
                    hinweis: "Nur in Schule = evtl. selektiver Mutismus; überall = evtl. soziale Angst"
                },
                {
                    frage: "Wie verhält sich das Kind zu Hause laut Eltern?",
                    kategorie: "kontext",
                    hinweis: "Großer Unterschied Schule/Zuhause ist diagnostisch relevant"
                },
                {
                    frage: "Gab es einen Auslöser oder war es schon immer so?",
                    kategorie: "anamnese",
                    hinweis: "Plötzlicher Beginn → traumatisches Ereignis möglich"
                },
                {
                    frage: "Zeigt das Kind nonverbal Interesse an anderen?",
                    kategorie: "entwicklung",
                    hinweis: "Beobachtet andere = Interesse vorhanden; ignoriert = evtl. andere Ursache"
                },
                {
                    frage: "Wie reagiert das Kind, wenn jemand Kontakt aufnimmt?",
                    kategorie: "sozial",
                    hinweis: "Erstarrt, flieht, oder nimmt vorsichtig an?"
                },
                {
                    frage: "Gibt es ein Kind oder einen Erwachsenen, zu dem Kontakt besteht?",
                    kategorie: "ressourcen",
                    hinweis: "Diese Beziehung als Brücke nutzen"
                },
                {
                    frage: "Wie ist die Stimmung des Kindes? Wirkt es traurig?",
                    kategorie: "affekt",
                    hinweis: "Rückzug + anhaltende Traurigkeit → depressive Symptome möglich"
                },
                {
                    frage: "Zeigt das Kind körperliche Symptome (Bauch-/Kopfschmerzen)?",
                    kategorie: "somatisch",
                    hinweis: "Körperliche Beschwerden oft Ausdruck von Angst bei Kindern"
                }
            ],

            relevante_eldib_items: {
                basiskompetenzen: ["SOZ-1", "SOZ-2", "SOZ-3", "SOZ-5", "SOZ-8"],
                kernkompetenzen: ["SOZ-10", "SOZ-11", "SOZ-12", "SOZ-15", "SOZ-17"],
                fortgeschritten: ["SOZ-25", "SOZ-26", "K-15", "K-17"],
                kommunikation: ["K-2", "K-6", "K-7", "K-12", "K-14"]
            },

            entwicklungslogik: [
                {
                    wenn: "Kind reagiert nicht auf Namensnennung (SOZ-3 nicht erreicht)",
                    dann: "Sehr basale Stufe, behutsam vorgehen",
                    intervention: "1:1-Zeit, keine Gruppenanforderungen, Sicherheit aufbauen"
                },
                {
                    wenn: "Kind spielt nur alleine (SOZ-10 erreicht, SOZ-17 nicht)",
                    dann: "Parallelspiel als Brücke nutzen",
                    intervention: "Erwachsener spielt parallel, dann mit einem Kind parallel"
                },
                {
                    wenn: "Kind spricht mit Erwachsenen, nicht mit Kindern (SOZ-8 ja, SOZ-11 nein)",
                    dann: "Peer-Kommunikation gezielt aufbauen",
                    intervention: "Strukturierte Partnerarbeit mit wohlwollendem Kind"
                },
                {
                    wenn: "Kind kann nicht über sich erzählen (K-15 nicht erreicht)",
                    dann: "Niedrigschwellige Ausdrucksmöglichkeiten anbieten",
                    intervention: "Zeichnen, Schreiben, Zeigen statt Erzählen"
                }
            ],

            interventionen: {
                allgemein: [
                    {
                        name: "Sicherheit aufbauen",
                        beschreibung: "Grundlage für jede Veränderung",
                        massnahmen: [
                            "Vorhersehbare Strukturen und Rituale",
                            "Feste Bezugsperson in der Schule",
                            "Rückzugsmöglichkeit ohne Stigma",
                            "Keine Überraschungen, alles ankündigen"
                        ]
                    },
                    {
                        name: "Druck reduzieren",
                        beschreibung: "Sprechen/Partizipieren nicht erzwingen",
                        massnahmen: [
                            "Alternative Beteiligungsformen (Zeigen, Nicken, Schreiben)",
                            "Nicht vor der Klasse aufrufen",
                            "Kleine Gruppen statt große",
                            "Erfolge feiern, auch kleine"
                        ]
                    },
                    {
                        name: "Brücken bauen",
                        beschreibung: "Schrittweise soziale Erfahrungen ermöglichen",
                        massnahmen: [
                            "Ein 'Buddy' - wohlwollendes, ruhiges Kind zuordnen",
                            "Partnerarbeit vor Gruppenarbeit",
                            "Gemeinsame Aktivitäten ohne Sprechzwang",
                            "Interessen des Kindes als Kontaktbrücke nutzen"
                        ]
                    },
                    {
                        name: "Stärken stärken",
                        beschreibung: "Selbstwert aufbauen",
                        massnahmen: [
                            "Aufgaben geben, die das Kind gut kann",
                            "Nonverbale Stärken sichtbar machen",
                            "Erfolgserlebnisse ermöglichen",
                            "Interessen einbeziehen"
                        ]
                    }
                ],

                ichZiele: [
                    "Ich schaue den/die LehrerIn an, wenn er/sie meinen Namen sagt. (SOZ-3)",
                    "Ich spiele neben anderen Kindern. (SOZ-10)",
                    "Ich zeige auf etwas, wenn ich etwas möchte. (SOZ-5)",
                    "Ich spreche mit dem/der LehrerIn, wenn ich etwas brauche. (SOZ-8)",
                    "Ich frage ein Kind, ob ich mitspielen kann. (SOZ-15)"
                ]
            },

            warnzeichen: [
                "Vollständiges Verstummen (selektiver Mutismus)",
                "Anhaltende Traurigkeit, Interessenverlust",
                "Selbstverletzendes Verhalten",
                "Suizidale Äußerungen (auch bei jungen Kindern ernst nehmen)",
                "Schulverweigerung",
                "Plötzliche Verhaltensänderung nach Ereignis"
            ],

            differenzialUeberlegungen: [
                "Selektiver Mutismus: Spricht in bestimmten Situationen nie, woanders normal",
                "Soziale Angststörung: Angst vor negativer Bewertung",
                "Depression: Rückzug + Traurigkeit + Interessenverlust",
                "Autismus-Spektrum: Eingeschränktes soziales Interesse, nicht primär Angst",
                "Traumafolgestörung: Rückzug als Schutzreaktion",
                "Schüchternheit: Temperamentsmerkmal, nicht pathologisch"
            ]
        },

        // -----------------------------------------
        // SOZIALE SCHWIERIGKEITEN
        // -----------------------------------------
        sozial: {
            id: "sozial",
            name: "Soziale Schwierigkeiten mit Gleichaltrigen",
            kategorie: "sozial",
            icon: "👥",
            beschreibung: "Das Kind hat Schwierigkeiten, Freundschaften zu schließen oder aufrechtzuerhalten, versteht soziale Signale nicht oder verhält sich in Gruppen unangemessen.",

            beispiele: [
                "Hat keine Freunde",
                "Wird von anderen ausgeschlossen",
                "Versteht Witze/Ironie nicht",
                "Unterbricht andere ständig",
                "Kann nicht teilen oder sich abwechseln",
                "Bestimmt immer, will immer gewinnen",
                "Versteht nicht, warum andere böse sind"
            ],

            explorationsFragen: [
                {
                    frage: "Möchte das Kind Freunde haben oder ist es zufrieden alleine?",
                    kategorie: "motivation",
                    hinweis: "Wichtige Unterscheidung: Will nicht vs. Kann nicht vs. Weiß nicht wie"
                },
                {
                    frage: "Wie nimmt das Kind Kontakt auf? Angemessen oder ungeschickt?",
                    kategorie: "fähigkeit",
                    hinweis: "Zu aufdringlich, zu zurückhaltend, oder unangemessen (z.B. schubsen)"
                },
                {
                    frage: "Versteht das Kind nonverbale Signale (Mimik, Gestik, Tonfall)?",
                    kategorie: "soziale_kognition",
                    hinweis: "Defizite hier können auf Autismus-Spektrum hinweisen"
                },
                {
                    frage: "Wie reagiert das Kind auf Ablehnung?",
                    kategorie: "regulation",
                    hinweis: "Gibt auf, wird aggressiv, oder versteht nicht warum?"
                },
                {
                    frage: "Kann das Kind die Perspektive anderer einnehmen?",
                    kategorie: "entwicklung",
                    hinweis: "Wichtig für K-21, SOZ-37 (Empathie)"
                },
                {
                    frage: "Gibt es spezielle Interessen, die das Kind isolieren?",
                    kategorie: "interessen",
                    hinweis: "Nischeninteressen können Kontakt erschweren, aber auch Brücke sein"
                },
                {
                    frage: "Wie verhält sich das Kind in strukturierten vs. freien Situationen?",
                    kategorie: "struktur",
                    hinweis: "Freispiel ist schwieriger als strukturierte Kooperation"
                }
            ],

            relevante_eldib_items: {
                basiskompetenzen: ["SOZ-10", "SOZ-11", "SOZ-12"],
                kernkompetenzen: ["SOZ-15", "SOZ-16", "SOZ-17", "SOZ-18", "SOZ-19"],
                fortgeschritten: ["SOZ-20", "SOZ-21", "SOZ-23", "SOZ-25", "SOZ-27"],
                kommunikation: ["K-7", "K-13", "K-14", "K-20", "K-21"],
                verhalten: ["V-19", "V-20", "V-21"]
            },

            entwicklungslogik: [
                {
                    wenn: "Kind spielt nur parallel (SOZ-10 ja, SOZ-17 nein)",
                    dann: "Interaktives Spiel schrittweise aufbauen",
                    intervention: "Spiele mit klaren Regeln und Rollen, Erwachsener moderiert"
                },
                {
                    wenn: "Kind kann nicht teilen (SOZ-16 nicht erreicht)",
                    dann: "Teilen explizit üben",
                    intervention: "Timer für Spielzeugwechsel, 'Du darfst es zurück haben'"
                },
                {
                    wenn: "Kind kann sich nicht abwechseln (SOZ-19 nicht erreicht)",
                    dann: "Turn-Taking strukturiert üben",
                    intervention: "Visuelle Marker wer dran ist, Spiele mit klarem Wechsel"
                },
                {
                    wenn: "Kind erkennt Gefühle anderer nicht (K-21 nicht erreicht)",
                    dann: "Emotionserkennung schulen",
                    intervention: "Gefühlskarten, Fotomaterial, 'Wie fühlt sich X wohl gerade?'"
                },
                {
                    wenn: "Kind akzeptiert Gruppenentscheidungen nicht (V-19/SOZ-23 nicht erreicht)",
                    dann: "Frustrationstoleranz bei Gruppenentscheidungen aufbauen",
                    intervention: "Vorwarnung, kleine Gruppen, manchmal gewinnt, manchmal verliert"
                }
            ],

            interventionen: {
                allgemein: [
                    {
                        name: "Soziale Kompetenzen explizit lehren",
                        beschreibung: "Nicht voraussetzen, dass Kind es 'einfach lernt'",
                        massnahmen: [
                            "Soziale Geschichten für typische Situationen",
                            "Rollenspiele zur Übung",
                            "Video-Modeling (positive Beispiele zeigen)",
                            "Explizite Regeln für soziale Situationen"
                        ]
                    },
                    {
                        name: "Strukturierte Peer-Erfahrungen",
                        beschreibung: "Erfolgreiche Interaktionen ermöglichen",
                        massnahmen: [
                            "Partnerarbeit mit wohlwollendem Kind",
                            "Kooperative Spiele statt kompetitive",
                            "Kleine Gruppen (2-3 Kinder)",
                            "Gemeinsame Aufgaben mit klaren Rollen"
                        ]
                    },
                    {
                        name: "Interessenbasierte Verbindungen",
                        beschreibung: "Über gemeinsame Interessen Brücken bauen",
                        massnahmen: [
                            "Kind mit ähnlichen Interessen identifizieren",
                            "AG oder Projekt zu Spezialinteresse",
                            "Expertise des Kindes einsetzen"
                        ]
                    },
                    {
                        name: "Coaching in Echtzeit",
                        beschreibung: "Unterstützung in sozialen Situationen",
                        massnahmen: [
                            "Soziale Situationen vorbesprechen",
                            "Diskrete Hinweise während Interaktion",
                            "Nachbesprechung: Was lief gut? Was anders?"
                        ]
                    }
                ],

                ichZiele: [
                    "Ich frage freundlich, ob ich mitspielen darf. (SOZ-15)",
                    "Ich teile Spielsachen mit anderen. (SOZ-16)",
                    "Ich wechsle mich mit anderen ab. (SOZ-19)",
                    "Ich sage, wie sich mein Mitschüler wohl fühlt. (K-21)",
                    "Ich akzeptiere, wenn die Gruppe etwas anderes will als ich. (SOZ-23)"
                ]
            },

            warnzeichen: [
                "Vollständige Isolation ohne Leidensdruck (kein Interesse an anderen)",
                "Anhaltende Ablehnung/Mobbing durch Peers",
                "Bizarre oder sehr ungewöhnliche Verhaltensweisen",
                "Fehlende Empathie auch bei offensichtlichem Leid anderer",
                "Aggressive Reaktionen auf soziale Ablehnung"
            ],

            differenzialUeberlegungen: [
                "Autismus-Spektrum: Qualitative Unterschiede in sozialer Interaktion",
                "ADHS: Impulsivität stört Interaktion, eigentlich sozial interessiert",
                "Soziale Angst: Will, traut sich aber nicht",
                "Sprachstörung: Kommunikationsbarriere",
                "Hochbegabung: 'Nicht auf einer Wellenlänge' mit Gleichaltrigen"
            ]
        },

        // -----------------------------------------
        // AUFMERKSAMKEIT / ARBEITSVERHALTEN
        // -----------------------------------------
        aufmerksamkeit: {
            id: "aufmerksamkeit",
            name: "Aufmerksamkeits- und Konzentrationsprobleme",
            kategorie: "arbeitsverhalten",
            icon: "🎯",
            beschreibung: "Das Kind hat Schwierigkeiten, bei der Sache zu bleiben, Aufgaben zu beenden, Anweisungen zu befolgen oder seinen Platz zu halten.",

            beispiele: [
                "Kann nicht stillsitzen",
                "Verlässt ständig den Platz",
                "Beendet Aufgaben nicht",
                "Lässt sich leicht ablenken",
                "Scheint nicht zuzuhören",
                "Vergisst Anweisungen sofort",
                "Beginnt Aufgaben, bevor Anweisung zu Ende ist"
            ],

            explorationsFragen: [
                {
                    frage: "Sind die Schwierigkeiten in allen Fächern/Situationen gleich?",
                    kategorie: "muster",
                    hinweis: "Bei Interesse kann Kind oft lange konzentriert sein → Motivationsaspekt"
                },
                {
                    frage: "Wie lange kann das Kind bei interessanten Aktivitäten fokussiert bleiben?",
                    kategorie: "fähigkeit",
                    hinweis: "Unterscheidung: Kann nicht vs. Will nicht bei uninteressanten Aufgaben"
                },
                {
                    frage: "Gibt es Unterschiede zwischen Vormittag und Nachmittag?",
                    kategorie: "biorhythmus",
                    hinweis: "Müdigkeit, Hunger, Medikamentenwirkung beachten"
                },
                {
                    frage: "Wie ist das Arbeitstempo - zu schnell oder zu langsam?",
                    kategorie: "stil",
                    hinweis: "Impulsiv-schnell vs. verträumt-langsam sind verschiedene Profile"
                },
                {
                    frage: "Kann das Kind mehrstufige Anweisungen befolgen?",
                    kategorie: "entwicklung",
                    hinweis: "Arbeitsgedächtnis-Kapazität prüfen"
                },
                {
                    frage: "Wie ist das Verhalten in Einzelsituation vs. Gruppe?",
                    kategorie: "kontext",
                    hinweis: "Besser in 1:1 → Ablenkbarkeit; gleich in 1:1 → basaleres Problem"
                },
                {
                    frage: "War das Kind schon immer so oder hat es sich verändert?",
                    kategorie: "anamnese",
                    hinweis: "Entwicklungsgeschichte, frühkindliche Entwicklung erfragen"
                }
            ],

            relevante_eldib_items: {
                basiskompetenzen: ["V-3", "V-5", "V-8"],
                kernkompetenzen: ["V-10", "V-11", "V-13", "V-15"],
                fortgeschritten: ["V-23", "V-24"],
                kognition: ["KOG-2", "KOG-4", "KOG-24", "KOG-30"]
            },

            entwicklungslogik: [
                {
                    wenn: "Kind kann nicht kurz aufmerksam sein (V-3/KOG-2 nicht erreicht)",
                    dann: "Sehr kurze Aufgabeneinheiten",
                    intervention: "30-Sekunden-Aufgaben, sofortige Verstärkung, langsam steigern"
                },
                {
                    wenn: "Kind kann nicht warten (V-10 nicht erreicht)",
                    dann: "Warten explizit üben",
                    intervention: "Timer, visuelle Countdown, Wartezeit sehr kurz beginnen"
                },
                {
                    wenn: "Kind kann nicht sitzen bleiben (V-11 nicht erreicht)",
                    dann: "Bewegungsbedürfnis berücksichtigen",
                    intervention: "Stehpult, Bewegungspausen, Zappel-Erlaubnis (Wackelkissen)"
                },
                {
                    wenn: "Kind beendet Aufgaben nicht (V-15 nicht erreicht)",
                    dann: "Aufgaben in kleine Portionen teilen",
                    intervention: "Checklisten, sichtbarer Fortschritt, Teilziele feiern"
                },
                {
                    wenn: "Kind folgt Routinen nicht (V-8 nicht erreicht)",
                    dann: "Routinen visualisieren und üben",
                    intervention: "Ablaufpläne mit Bildern, konsequente Wiederholung"
                }
            ],

            interventionen: {
                allgemein: [
                    {
                        name: "Umgebungsanpassungen",
                        beschreibung: "Ablenkungen minimieren",
                        massnahmen: [
                            "Sitzplatz vorne, weg von Fenster/Tür",
                            "Reizarme Arbeitsumgebung",
                            "Kopfhörer/Ohrenschützer bei Konzentration",
                            "Nur benötigtes Material auf dem Tisch"
                        ]
                    },
                    {
                        name: "Aufgabengestaltung",
                        beschreibung: "Aufgaben 'ADHS-gerecht' machen",
                        massnahmen: [
                            "Kurze, klare Anweisungen (eins nach dem anderen)",
                            "Aufgaben in kleine Schritte unterteilen",
                            "Checklisten zum Abhaken",
                            "Abwechslung einbauen",
                            "Interessante vor langweilige Aufgaben"
                        ]
                    },
                    {
                        name: "Bewegung integrieren",
                        beschreibung: "Bewegungsbedürfnis als Ressource nutzen",
                        massnahmen: [
                            "Regelmäßige Bewegungspausen",
                            "Bewegung in Aufgaben integrieren",
                            "Botengang-Aufgaben",
                            "Stehpult oder Wackelkissen erlauben"
                        ]
                    },
                    {
                        name: "Externe Strukturhilfen",
                        beschreibung: "Kompensation durch Hilfsmittel",
                        massnahmen: [
                            "Timer sichtbar machen",
                            "Visuelle Ablaufpläne",
                            "Erinnerungskarten auf dem Tisch",
                            "Farbcodierung für Aufgaben"
                        ]
                    }
                ],

                ichZiele: [
                    "Ich schaue die Lehrerin an, wenn sie etwas erklärt. (V-3)",
                    "Ich warte, bis ich an der Reihe bin. (V-10)",
                    "Ich bleibe auf meinem Platz sitzen. (V-11)",
                    "Ich beende meine Aufgabe, bevor ich etwas anderes mache. (V-15)",
                    "Ich lege mein Material bereit, wenn die Stunde beginnt. (V-8)"
                ]
            },

            warnzeichen: [
                "Deutliche Beeinträchtigung in mehreren Lebensbereichen",
                "Erheblicher Leidensdruck bei Kind oder Familie",
                "Leistungen deutlich unter dem Potenzial",
                "Sekundäre Probleme: Selbstwert, Angst, Opposition",
                "Unfallneigung durch Impulsivität"
            ],

            differenzialUeberlegungen: [
                "ADHS: Wenn Symptome in mehreren Kontexten, seit früher Kindheit",
                "Angst: Konzentrationsprobleme durch Sorgen/Grübeln",
                "Depression: Konzentrationsprobleme als Symptom",
                "Schlafstörungen: Müdigkeit beeinträchtigt Aufmerksamkeit",
                "Über-/Unterforderung: Nicht passendes Niveau",
                "Hörverarbeitung: Hört, versteht aber nicht richtig"
            ]
        },

        // -----------------------------------------
        // EMOTIONALE DYSREGULATION
        // -----------------------------------------
        emotionsregulation: {
            id: "emotionsregulation",
            name: "Emotionale Dysregulation",
            kategorie: "emotional",
            icon: "🎭",
            beschreibung: "Das Kind hat Schwierigkeiten, seine Emotionen zu regulieren. Reaktionen erscheinen unverhältnismäßig - sei es zu intensiv, zu lang anhaltend oder unerwartet.",

            beispiele: [
                "Weint bei Kleinigkeiten",
                "Extreme Reaktion auf Lob (kippt ins Negative)",
                "Kann Frust nicht aushalten",
                "Emotionale Stimmung wechselt plötzlich",
                "Kann sich nach Aufregung nicht beruhigen",
                "Starke Trennungsangst"
            ],

            explorationsFragen: [
                {
                    frage: "Welche Emotionen sind besonders schwer zu regulieren?",
                    kategorie: "muster",
                    hinweis: "Wut, Angst, Traurigkeit, Freude - alle können dysreguliert sein"
                },
                {
                    frage: "Gibt es erkennbare Auslöser für die starken Reaktionen?",
                    kategorie: "trigger",
                    hinweis: "Manchmal subtile Trigger: Ton, Blick, Erinnerung"
                },
                {
                    frage: "Wie lange dauert es, bis sich das Kind wieder reguliert hat?",
                    kategorie: "dauer",
                    hinweis: "Minuten vs. Stunden ist diagnostisch relevant"
                },
                {
                    frage: "Kann das Kind benennen, was es fühlt?",
                    kategorie: "entwicklung",
                    hinweis: "Gefühlswortschatz ist Voraussetzung für Regulation"
                },
                {
                    frage: "Was hilft dem Kind, sich zu beruhigen?",
                    kategorie: "ressourcen",
                    hinweis: "Bestehende Strategien identifizieren und ausbauen"
                },
                {
                    frage: "Reagiert das Kind auf positive Emotionen auch übermäßig?",
                    kategorie: "muster",
                    hinweis: "Übererregung bei Freude kann zu Kontrollverlust führen (V-14)"
                },
                {
                    frage: "Gab es belastende Ereignisse in der Lebensgeschichte?",
                    kategorie: "anamnese",
                    hinweis: "Trauma beeinflusst Emotionsregulation stark"
                }
            ],

            relevante_eldib_items: {
                basiskompetenzen: ["V-14", "K-4"],
                kernkompetenzen: ["V-18", "V-20", "V-21", "K-16", "K-19"],
                fortgeschritten: ["V-23", "V-25", "V-26", "K-23", "K-26"],
                sozialisation: ["SOZ-21", "K-21"]
            },

            entwicklungslogik: [
                {
                    wenn: "Kind kann Gefühle nicht benennen (K-16 nicht erreicht)",
                    dann: "Gefühlswortschatz aufbauen",
                    intervention: "Gefühlskarten, tägliche Gefühlsrunde, Gefühlsbarometer"
                },
                {
                    wenn: "Kind reagiert unangemessen auf Lob (V-14 nicht erreicht)",
                    dann: "Behutsam mit Lob umgehen",
                    intervention: "Sachliches Feedback statt emotionales Lob, leise loben, nicht öffentlich"
                },
                {
                    wenn: "Kind hat keine Strategien (V-18 nicht erreicht)",
                    dann: "Regulationsstrategien explizit lehren",
                    intervention: "Atemübungen, Körperbewegung, sensorische Strategien (Knautschball)"
                },
                {
                    wenn: "Kind kann Strategien nicht anwenden (V-25 nicht erreicht)",
                    dann: "In-Situation-Coaching",
                    intervention: "Frühzeitig eingreifen, Strategien verbal anleiten, mit dem Kind üben"
                },
                {
                    wenn: "Kind ist unflexibel bei Veränderungen (V-23 nicht erreicht)",
                    dann: "Flexibilität langsam aufbauen",
                    intervention: "Veränderungen ankündigen, schrittweise einführen, Bewältigung feiern"
                }
            ],

            interventionen: {
                allgemein: [
                    {
                        name: "Emotionswissen aufbauen",
                        beschreibung: "Benennen können ist der erste Schritt",
                        massnahmen: [
                            "Gefühlswortschatz aktiv erweitern",
                            "Körpersignale für Emotionen erkennen",
                            "Emotionen in Büchern/Filmen besprechen",
                            "Eigene Gefühle als Erwachsener modellieren"
                        ]
                    },
                    {
                        name: "Regulationsstrategien lehren",
                        beschreibung: "Werkzeugkasten für schwierige Momente",
                        massnahmen: [
                            "Atemübungen (4-7-8 Atmung)",
                            "Körperliche Strategien (Anspannen-Entspannen)",
                            "Sensorische Hilfen (Knautschball, Gewichtsdecke)",
                            "Kognitive Strategien (Gedankenstopp, Selbstinstruktion)"
                        ]
                    },
                    {
                        name: "Ko-Regulation anbieten",
                        beschreibung: "Erwachsener als externe Regulationshilfe",
                        massnahmen: [
                            "Ruhe bewahren und modellieren",
                            "Gefühle validieren ('Ich sehe, du bist frustriert')",
                            "Körperliche Nähe anbieten (wenn gewünscht)",
                            "Gemeinsam atmen, gemeinsam regulieren"
                        ]
                    },
                    {
                        name: "Präventiv handeln",
                        beschreibung: "Übererregung verhindern",
                        massnahmen: [
                            "Frühwarnzeichen erkennen und handeln",
                            "Regelmäßige Pausen einbauen",
                            "Übergänge begleiten",
                            "Überstimulation vermeiden"
                        ]
                    }
                ],

                ichZiele: [
                    "Ich sage, wie ich mich fühle. (K-16)",
                    "Ich nehme Lob an und bleibe ruhig. (V-14)",
                    "Wenn ich merke, dass ich wütend werde, atme ich dreimal tief durch. (V-18/V-25)",
                    "Ich bleibe ruhig, auch wenn sich der Plan ändert. (V-23)",
                    "Ich erkenne, wenn andere traurig oder wütend sind. (K-21)"
                ]
            },

            warnzeichen: [
                "Selbstverletzendes Verhalten zur Regulation",
                "Dissoziative Zustände (Kind 'schaltet ab')",
                "Flashback-ähnliche Reaktionen",
                "Anhaltende depressive oder ängstliche Verstimmung",
                "Emotionale Reaktionen ohne erkennbaren Auslöser",
                "Trauma-Hinweise"
            ],

            differenzialUeberlegungen: [
                "Trauma/PTBS: Dysregulation als Folge traumatischer Erfahrung",
                "ADHS: Emotionale Impulsivität als Begleitsymptom",
                "Autismus-Spektrum: Anderes Emotionserleben und -ausdruck",
                "Bindungsstörung: Frühe Bindungserfahrungen prägen Regulation",
                "Bipolare Störung (selten bei Kindern): Extreme Stimmungswechsel"
            ]
        }
    },

    // ============================================
    // ALLGEMEINE BERATUNGSPRINZIPIEN
    // ============================================

    beratungsprinzipien: {
        grundhaltung: [
            "Das Kind tut sein Bestes mit den Fähigkeiten, die es hat.",
            "Verhalten hat immer eine Funktion - verstehen vor bewerten.",
            "Entwicklung braucht Zeit, Geduld und wiederholte Erfahrungen.",
            "Beziehung ist das wichtigste Werkzeug.",
            "Kleine Schritte sind Schritte."
        ],

        vorgehensweise: [
            "Erst verstehen, dann handeln.",
            "Entwicklungsstand einschätzen - wo steht das Kind wirklich?",
            "Ressourcen und Stärken identifizieren und nutzen.",
            "Ein Ziel gleichzeitig - Überforderung vermeiden.",
            "Alle Beteiligten einbeziehen (Eltern, Team).",
            "Regelmäßig evaluieren und anpassen."
        ],

        kommunikation_mit_eltern: [
            "Sorgen der Eltern ernst nehmen.",
            "Nicht beschuldigen, sondern gemeinsam Lösungen suchen.",
            "Stärken des Kindes betonen.",
            "Konkrete, umsetzbare Empfehlungen geben.",
            "Regelmäßigen Austausch etablieren."
        ]
    }
};

// Hilfsfunktionen für die Verknüpfung mit ELDIB_DATA

/**
 * Findet alle relevanten ELDiB-Items für eine Problematik
 * @param {string} problematikId - ID der Problematik
 * @returns {Array} - Array mit Item-Objekten aus ELDIB_DATA
 */
function getRelevantEldibItems(problematikId) {
    const problematik = ADVISORY_DATA.problematiken[problematikId];
    if (!problematik) return [];

    const allCodes = [
        ...(problematik.relevante_eldib_items.basiskompetenzen || []),
        ...(problematik.relevante_eldib_items.kernkompetenzen || []),
        ...(problematik.relevante_eldib_items.fortgeschritten || []),
        ...(problematik.relevante_eldib_items.kommunikation || []),
        ...(problematik.relevante_eldib_items.sozialisation || []),
        ...(problematik.relevante_eldib_items.kognition || []),
        ...(problematik.relevante_eldib_items.verhalten || [])
    ];

    return allCodes.map(code => {
        const item = findItemByCode(code);
        if (item) {
            return {
                ...item,
                bereich: findBereichByCode(code)
            };
        }
        return null;
    }).filter(item => item !== null);
}

/**
 * Generiert Empfehlungen basierend auf ELDiB-Einschätzung
 * @param {string} problematikId - ID der Problematik
 * @param {Object} eldibStatus - Objekt mit Item-Codes und deren Status
 * @returns {Array} - Array mit passenden Empfehlungen
 */
function getRecommendations(problematikId, eldibStatus) {
    const problematik = ADVISORY_DATA.problematiken[problematikId];
    if (!problematik) return [];

    const empfehlungen = [];

    problematik.entwicklungslogik.forEach(logik => {
        // Hier könnte komplexere Logik implementiert werden
        empfehlungen.push({
            bedingung: logik.wenn,
            fokus: logik.dann,
            intervention: logik.intervention
        });
    });

    return empfehlungen;
}

// Export für Node.js (falls benötigt) oder globale Verfügbarkeit
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ADVISORY_DATA, getRelevantEldibItems, getRecommendations };
}
