/**
 * KLINISCHES GEHIRN - Pedopsychiatrisches Entscheidungsunterstützungssystem
 *
 * Dieses Modul enthält:
 * 1. Klinische Muster (wie ein Pedopsychiater denkt)
 * 2. Risikofaktoren und deren Gewichtung
 * 3. Differenzialdiagnostische Regeln
 * 4. Psychoedukative Erklärungen
 * 5. Evidenzbasierte Interventionen
 *
 * Wissenschaftliche Grundlagen:
 * - ICD-11 / DSM-5 Kriterien
 * - Entwicklungspsychopathologie (Cicchetti, Sroufe)
 * - Bindungstheorie (Bowlby, Ainsworth)
 * - ETEP/ELDiB Entwicklungsstufen
 */

const CLINICAL_BRAIN = {

    // ============================================
    // ASSESSMENT-FRAGEN (Nur Klick, kein Freitext)
    // ============================================

    assessmentModules: {

        // MODUL 1: Aktuelle Symptomatik
        aktuelleSymptome: {
            title: "Aktuelle Symptomatik",
            description: "Was fällt aktuell am meisten auf?",
            icon: "🔍",
            questions: [
                {
                    id: "hauptproblem",
                    question: "Was ist der Hauptgrund der Vorstellung?",
                    type: "single",
                    options: [
                        { value: "verhalten_extern", label: "Störendes Verhalten (Aggression, Wutanfälle, Verweigerung)", icon: "💥" },
                        { value: "verhalten_intern", label: "Rückzug, Ängste, Traurigkeit", icon: "😢" },
                        { value: "aufmerksamkeit", label: "Konzentration, Unruhe, Impulsivität", icon: "🎯" },
                        { value: "sozial", label: "Schwierigkeiten mit anderen Kindern", icon: "👥" },
                        { value: "lernen", label: "Schulische Probleme, Lernrückstände", icon: "📚" },
                        { value: "entwicklung", label: "Entwicklungsverzögerung allgemein", icon: "📈" }
                    ]
                },
                {
                    id: "symptom_beginn",
                    question: "Seit wann bestehen die Schwierigkeiten?",
                    type: "single",
                    options: [
                        { value: "immer", label: "Schon immer / von Anfang an", weight: { trait: 1.5, state: 0.5 } },
                        { value: "frueh", label: "Seit früher Kindheit (vor 6 Jahren)", weight: { trait: 1.3, state: 0.7 } },
                        { value: "schulstart", label: "Seit Schulbeginn", weight: { trait: 1.0, state: 1.0 } },
                        { value: "kuerzlich", label: "Seit kurzem (< 6 Monate)", weight: { trait: 0.5, state: 1.5 } },
                        { value: "ereignis", label: "Nach einem bestimmten Ereignis", weight: { trait: 0.3, state: 1.8, trauma: 1.5 } }
                    ]
                },
                {
                    id: "symptom_kontext",
                    question: "Wo zeigt sich das Verhalten?",
                    type: "single",
                    options: [
                        { value: "ueberall", label: "Überall (Schule, Zuhause, Freizeit)", weight: { pervasive: 2.0 } },
                        { value: "schule", label: "Hauptsächlich in der Schule", weight: { school_specific: 1.5 } },
                        { value: "zuhause", label: "Hauptsächlich Zuhause", weight: { home_specific: 1.5 } },
                        { value: "peers", label: "Nur mit anderen Kindern", weight: { social_specific: 1.5 } },
                        { value: "neue_situationen", label: "Vor allem in neuen Situationen", weight: { anxiety: 1.5 } }
                    ]
                }
            ]
        },

        // MODUL 2: Aufmerksamkeit & Aktivität
        aufmerksamkeit: {
            title: "Aufmerksamkeit & Aktivität",
            description: "Konzentration, Aktivitätsniveau, Impulskontrolle",
            icon: "🎯",
            relevantFor: ["aufmerksamkeit", "verhalten_extern"],
            questions: [
                {
                    id: "unaufmerksam",
                    question: "Aufmerksamkeitsprobleme",
                    type: "multi",
                    options: [
                        { value: "leicht_abgelenkt", label: "Leicht ablenkbar", score: 1 },
                        { value: "details_fehler", label: "Flüchtigkeitsfehler, übersieht Details", score: 1 },
                        { value: "nicht_zuhoeren", label: "Scheint nicht zuzuhören", score: 1 },
                        { value: "aufgaben_nicht_beenden", label: "Beendet Aufgaben nicht", score: 1 },
                        { value: "organisation", label: "Schwierigkeiten bei Organisation", score: 1 },
                        { value: "vermeidet_anstrengung", label: "Vermeidet anstrengende Aufgaben", score: 1 },
                        { value: "verliert_dinge", label: "Verliert häufig Dinge", score: 1 },
                        { value: "vergesslich", label: "Vergesslich im Alltag", score: 1 }
                    ],
                    threshold: { green: 2, yellow: 4, red: 6 }
                },
                {
                    id: "hyperaktiv",
                    question: "Hyperaktivität",
                    type: "multi",
                    options: [
                        { value: "zappelig", label: "Zappelt, kann nicht stillsitzen", score: 1 },
                        { value: "steht_auf", label: "Steht auf, wenn Sitzenbleiben erwartet", score: 1 },
                        { value: "rennt_klettert", label: "Rennt, klettert übermäßig", score: 1 },
                        { value: "laut", label: "Kann nicht leise spielen", score: 1 },
                        { value: "motor_laeuft", label: "Immer auf dem Sprung, 'wie aufgezogen'", score: 1 },
                        { value: "redet_viel", label: "Redet übermäßig viel", score: 1 }
                    ],
                    threshold: { green: 1, yellow: 3, red: 5 }
                },
                {
                    id: "impulsiv",
                    question: "Impulsivität",
                    type: "multi",
                    options: [
                        { value: "platzt_heraus", label: "Platzt mit Antworten heraus", score: 1 },
                        { value: "nicht_warten", label: "Kann nicht warten", score: 1 },
                        { value: "unterbricht", label: "Unterbricht, drängt sich auf", score: 1 },
                        { value: "handelt_ohne_denken", label: "Handelt ohne nachzudenken", score: 1 }
                    ],
                    threshold: { green: 1, yellow: 2, red: 3 }
                },
                {
                    id: "adhs_zusatz",
                    question: "Zusatzkriterien",
                    type: "multi",
                    options: [
                        { value: "vor_12", label: "Symptome vor dem 12. Lebensjahr", required_for: "adhs" },
                        { value: "mehrere_settings", label: "In mehreren Lebensbereichen", required_for: "adhs" },
                        { value: "beeintraechtigung", label: "Deutliche Beeinträchtigung", required_for: "adhs" },
                        { value: "familie_adhs", label: "ADHS in der Familie bekannt", weight: { adhs: 1.5 } }
                    ]
                }
            ]
        },

        // MODUL 3: Emotionen & Ängste
        emotionen: {
            title: "Emotionen & Ängste",
            description: "Stimmung, Ängste, emotionale Regulation",
            icon: "😢",
            relevantFor: ["verhalten_intern", "verhalten_extern"],
            questions: [
                {
                    id: "angst_symptome",
                    question: "Angstsymptome",
                    type: "multi",
                    options: [
                        { value: "trennungsangst", label: "Angst bei Trennung von Bezugspersonen", pattern: "separation_anxiety" },
                        { value: "soziale_angst", label: "Angst vor sozialen Situationen/Bewertung", pattern: "social_anxiety" },
                        { value: "spezifische_angst", label: "Starke Angst vor bestimmten Dingen/Situationen", pattern: "specific_phobia" },
                        { value: "generalisiert", label: "Ständige Sorgen über viele Dinge", pattern: "gad" },
                        { value: "panik", label: "Plötzliche Angstanfälle", pattern: "panic" },
                        { value: "schulverweigerung", label: "Vermeidet Schule aus Angst", pattern: "school_refusal" }
                    ]
                },
                {
                    id: "koerper_angst",
                    question: "Körperliche Angstsymptome",
                    type: "multi",
                    options: [
                        { value: "bauchschmerzen", label: "Häufige Bauchschmerzen (ohne med. Ursache)", score: 1 },
                        { value: "kopfschmerzen", label: "Häufige Kopfschmerzen", score: 1 },
                        { value: "uebelkeit", label: "Übelkeit in bestimmten Situationen", score: 1 },
                        { value: "schlafprobleme", label: "Einschlafprobleme, Alpträume", score: 1 },
                        { value: "herzrasen", label: "Herzrasen, Schwitzen", score: 1 }
                    ]
                },
                {
                    id: "depression_symptome",
                    question: "Depressive Symptome",
                    type: "multi",
                    options: [
                        { value: "traurig", label: "Anhaltende Traurigkeit", score: 2, core: true },
                        { value: "interessenverlust", label: "Kein Interesse mehr an früher geliebten Aktivitäten", score: 2, core: true },
                        { value: "reizbar", label: "Anhaltende Reizbarkeit (bei Kindern!)", score: 2, core: true },
                        { value: "antriebslos", label: "Antriebslosigkeit, Erschöpfung", score: 1 },
                        { value: "wertlos", label: "Gefühl von Wertlosigkeit", score: 1 },
                        { value: "konzentration", label: "Konzentrationsprobleme", score: 1 },
                        { value: "schlaf", label: "Schlafveränderung (mehr/weniger)", score: 1 },
                        { value: "appetit", label: "Appetitveränderung", score: 1 },
                        { value: "suizid", label: "Gedanken an Tod/Suizid", score: 3, alert: true }
                    ],
                    threshold: { green: 2, yellow: 5, red: 8 }
                },
                {
                    id: "dysregulation",
                    question: "Emotionale Dysregulation",
                    type: "multi",
                    options: [
                        { value: "wutanfaelle", label: "Heftige Wutanfälle", score: 1 },
                        { value: "schnell_weinen", label: "Weint sehr schnell", score: 1 },
                        { value: "stimmungswechsel", label: "Schnelle Stimmungswechsel", score: 1 },
                        { value: "schwer_beruhigen", label: "Schwer zu beruhigen", score: 1 },
                        { value: "ueberreaktion", label: "Reagiert übermäßig stark", score: 1 }
                    ],
                    threshold: { green: 1, yellow: 3, red: 4 }
                }
            ]
        },

        // MODUL 4: Soziales & Beziehungen
        soziales: {
            title: "Soziales & Beziehungen",
            description: "Soziale Interaktion, Beziehungen, Empathie",
            icon: "👥",
            relevantFor: ["sozial", "verhalten_extern"],
            questions: [
                {
                    id: "soziale_interaktion",
                    question: "Soziale Interaktion",
                    type: "multi",
                    options: [
                        { value: "kein_interesse", label: "Wenig Interesse an anderen Kindern", pattern: "asd", score: 2 },
                        { value: "will_aber_kann_nicht", label: "Möchte Kontakt, weiß aber nicht wie", pattern: "social_skill_deficit" },
                        { value: "abgelehnt", label: "Wird von anderen abgelehnt", pattern: "peer_rejection" },
                        { value: "einzelgaenger", label: "Spielt lieber allein (zufrieden)", pattern: "introverted" },
                        { value: "dominant", label: "Will immer bestimmen", pattern: "conduct" },
                        { value: "kein_blickkontakt", label: "Auffälliger Blickkontakt", pattern: "asd", score: 2 }
                    ]
                },
                {
                    id: "empathie",
                    question: "Empathie & Perspektivübernahme",
                    type: "multi",
                    options: [
                        { value: "versteht_gefuehle_nicht", label: "Versteht Gefühle anderer schwer", score: 1 },
                        { value: "kein_troesten", label: "Tröstet andere nicht", score: 1 },
                        { value: "kein_schuldgefuehl", label: "Zeigt wenig Reue/Schuldgefühl", pattern: "callous", score: 2 },
                        { value: "nutzt_andere", label: "Nutzt andere für eigene Zwecke", pattern: "callous", score: 2 },
                        { value: "egozentrisch", label: "Altersuntypisch egozentrisch", score: 1 }
                    ]
                },
                {
                    id: "freundschaften",
                    question: "Freundschaften",
                    type: "single",
                    options: [
                        { value: "stabil", label: "Hat stabile Freundschaften", protective: true },
                        { value: "wenige", label: "Hat wenige, aber gute Freunde", neutral: true },
                        { value: "wechselnd", label: "Freundschaften wechseln häufig", risk: 1 },
                        { value: "keine", label: "Hat keine Freunde", risk: 2 },
                        { value: "aeltere_juengere", label: "Nur mit deutlich älteren/jüngeren", risk: 1 }
                    ]
                },
                {
                    id: "asd_marker",
                    question: "Besonderheiten (Autismus-Spektrum Marker)",
                    type: "multi",
                    options: [
                        { value: "routinen", label: "Besteht auf bestimmten Routinen/Ritualen", pattern: "asd", score: 1 },
                        { value: "spezialinteressen", label: "Intensive, eingeengte Interessen", pattern: "asd", score: 1 },
                        { value: "sensorisch", label: "Über-/Unterempfindlich auf Sinnesreize", pattern: "asd", score: 1 },
                        { value: "echolalie", label: "Wiederholt Wörter/Sätze (Echolalie)", pattern: "asd", score: 2 },
                        { value: "koerpersprache", label: "Ungewöhnliche Körpersprache/Gestik", pattern: "asd", score: 1 },
                        { value: "woertlich", label: "Versteht Sprache sehr wörtlich", pattern: "asd", score: 1 }
                    ]
                }
            ]
        },

        // MODUL 5: Verhalten & Regeln
        verhalten: {
            title: "Verhalten & Regeln",
            description: "Regelverhalten, Aggression, oppositionelles Verhalten",
            icon: "⚡",
            relevantFor: ["verhalten_extern"],
            questions: [
                {
                    id: "opposition",
                    question: "Oppositionelles Verhalten",
                    type: "multi",
                    options: [
                        { value: "wutanfaelle", label: "Häufige Wutanfälle", score: 1 },
                        { value: "streitet", label: "Streitet oft mit Erwachsenen", score: 1 },
                        { value: "verweigert", label: "Verweigert aktiv Regeln/Anweisungen", score: 1 },
                        { value: "absichtlich_aergern", label: "Ärgert andere absichtlich", score: 1 },
                        { value: "beschuldigt_andere", label: "Gibt anderen die Schuld", score: 1 },
                        { value: "empfindlich", label: "Leicht verärgert/empfindlich", score: 1 },
                        { value: "wuetend", label: "Oft wütend/grollend", score: 1 },
                        { value: "gehaessig", label: "Gehässig/nachtragend", score: 1 }
                    ],
                    threshold: { green: 2, yellow: 4, red: 6 },
                    duration_required: "6_months"
                },
                {
                    id: "aggression",
                    question: "Aggression",
                    type: "multi",
                    options: [
                        { value: "verbal", label: "Beschimpft, beleidigt", score: 1 },
                        { value: "koerperlich_kinder", label: "Schlägt, tritt andere Kinder", score: 2 },
                        { value: "koerperlich_erwachsene", label: "Körperlich aggressiv gegen Erwachsene", score: 3 },
                        { value: "sachen", label: "Zerstört Sachen", score: 1 },
                        { value: "selbstverletzung", label: "Verletzt sich selbst", score: 2, alert: true },
                        { value: "waffen", label: "Benutzt Gegenstände als Waffen", score: 3 }
                    ],
                    threshold: { green: 1, yellow: 3, red: 5 }
                },
                {
                    id: "dissozial",
                    question: "Dissoziale Verhaltensweisen",
                    type: "multi",
                    options: [
                        { value: "luegen", label: "Lügt häufig", score: 1 },
                        { value: "stehlen", label: "Hat gestohlen", score: 2 },
                        { value: "schule_schwaenzen", label: "Schwänzt die Schule", score: 1 },
                        { value: "weglaufen", label: "Läuft von Zuhause weg", score: 2 },
                        { value: "tier_quaelen", label: "Quält Tiere", score: 3, alert: true },
                        { value: "feuer", label: "Zündelt", score: 2 },
                        { value: "einbruch", label: "Einbruch/Vandalismus", score: 3 }
                    ],
                    threshold: { green: 1, yellow: 2, red: 4 }
                },
                {
                    id: "aggression_typ",
                    question: "Art der Aggression",
                    type: "single",
                    options: [
                        { value: "reaktiv", label: "Reaktiv (auf Frustration/Bedrohung)", pattern: "reactive_aggression" },
                        { value: "proaktiv", label: "Proaktiv (geplant, zielgerichtet)", pattern: "proactive_aggression", risk: 2 },
                        { value: "gemischt", label: "Beides kommt vor", pattern: "mixed_aggression" }
                    ]
                }
            ]
        },

        // MODUL 6: Entwicklungsgeschichte
        entwicklung: {
            title: "Entwicklungsgeschichte",
            description: "Frühe Entwicklung, Meilensteine",
            icon: "📈",
            questions: [
                {
                    id: "schwangerschaft",
                    question: "Schwangerschaft & Geburt",
                    type: "multi",
                    options: [
                        { value: "komplikationen", label: "Schwangerschaftskomplikationen", risk: 1 },
                        { value: "fruehgeburt", label: "Frühgeburt (<37 Wochen)", risk: 1.5 },
                        { value: "geburtskomplikationen", label: "Geburtskomplikationen", risk: 1 },
                        { value: "sauerstoffmangel", label: "Sauerstoffmangel bei Geburt", risk: 2 },
                        { value: "nicu", label: "Neugeborenen-Intensivstation", risk: 1 },
                        { value: "substanzen", label: "Substanzexposition in Schwangerschaft", risk: 2 }
                    ]
                },
                {
                    id: "meilensteine",
                    question: "Entwicklungsmeilensteine",
                    type: "multi",
                    options: [
                        { value: "motorik_verzoegert", label: "Motorische Entwicklung verzögert", risk: 1, pattern: "developmental_delay" },
                        { value: "sprache_spaet", label: "Späte Sprachentwicklung", risk: 1, pattern: "language_delay" },
                        { value: "sprache_regression", label: "Sprachverlust/Regression", risk: 2, pattern: "asd" },
                        { value: "sauberkeit_spaet", label: "Späte Sauberkeitsentwicklung", risk: 0.5 },
                        { value: "allgemein_verzoegert", label: "Allgemein verzögerte Entwicklung", risk: 1.5, pattern: "intellectual_disability" }
                    ]
                },
                {
                    id: "fruehe_regulation",
                    question: "Frühe Regulationsfähigkeit",
                    type: "multi",
                    options: [
                        { value: "schreibaby", label: "War ein 'Schreibaby'", risk: 1, pattern: "regulation" },
                        { value: "schlafprobleme_baby", label: "Starke Schlafprobleme als Baby", risk: 1, pattern: "regulation" },
                        { value: "fuetterprobleme", label: "Schwierigkeiten beim Füttern", risk: 1, pattern: "regulation" },
                        { value: "schwer_beruhigen_baby", label: "Schwer zu beruhigen als Baby", risk: 1, pattern: "regulation" }
                    ]
                },
                {
                    id: "medizinisch",
                    question: "Medizinische Vorgeschichte",
                    type: "multi",
                    options: [
                        { value: "epilepsie", label: "Epilepsie/Krampfanfälle", medical: true },
                        { value: "hoerprobleme", label: "Hörprobleme", medical: true, rule_out: ["language_delay"] },
                        { value: "sehprobleme", label: "Sehprobleme", medical: true },
                        { value: "chronisch_krank", label: "Chronische Erkrankung", medical: true },
                        { value: "kopfverletzung", label: "Kopfverletzung/Gehirnerschütterung", medical: true, risk: 1 },
                        { value: "medikamente", label: "Dauermedikation", medical: true }
                    ]
                }
            ]
        },

        // MODUL 7: Familie & Umfeld
        familie: {
            title: "Familie & Umfeld",
            description: "Familiäre Situation, Belastungen, Ressourcen",
            icon: "👨‍👩‍👧‍👦",
            questions: [
                {
                    id: "familienstruktur",
                    question: "Familiensituation",
                    type: "single",
                    options: [
                        { value: "beide_eltern", label: "Lebt bei beiden leiblichen Eltern", stable: true },
                        { value: "alleinerziehend", label: "Alleinerziehend", stress: 1 },
                        { value: "patchwork", label: "Patchwork-Familie", transition: true },
                        { value: "pflegefamilie", label: "Pflegefamilie", pattern: "attachment_risk" },
                        { value: "heim", label: "Heim/Wohngruppe", pattern: "attachment_risk", risk: 1 },
                        { value: "wechselnd", label: "Wechselnde Bezugspersonen", pattern: "attachment_risk", risk: 2 }
                    ]
                },
                {
                    id: "familienaere_belastungen",
                    question: "Familiäre Belastungen",
                    type: "multi",
                    options: [
                        { value: "eltern_psychisch", label: "Psychische Erkrankung bei Eltern", risk: 1.5, genetic: true },
                        { value: "eltern_sucht", label: "Suchtproblematik", risk: 2, pattern: "adverse_childhood" },
                        { value: "haeusliche_gewalt", label: "Häusliche Gewalt", risk: 2, pattern: "trauma", alert: true },
                        { value: "trennung_konflikt", label: "Hochkonflikthafte Trennung", risk: 1, stress: true },
                        { value: "armut", label: "Finanzielle Belastung/Armut", risk: 0.5, stress: true },
                        { value: "eltern_ueberlastet", label: "Eltern deutlich überlastet", risk: 1, stress: true },
                        { value: "geschwister_probleme", label: "Problematische Geschwisterbeziehung", risk: 0.5 }
                    ]
                },
                {
                    id: "familiaere_psychiatrie",
                    question: "Psychische Erkrankungen in der Familie",
                    type: "multi",
                    helpText: "Genetische Risikofaktoren erhöhen die Wahrscheinlichkeit",
                    options: [
                        { value: "fam_adhs", label: "ADHS", genetic_risk: "adhs", multiplier: 1.5 },
                        { value: "fam_depression", label: "Depression", genetic_risk: "depression", multiplier: 1.3 },
                        { value: "fam_angst", label: "Angststörung", genetic_risk: "anxiety", multiplier: 1.3 },
                        { value: "fam_bipolar", label: "Bipolare Störung", genetic_risk: "mood", multiplier: 1.5 },
                        { value: "fam_autismus", label: "Autismus-Spektrum", genetic_risk: "asd", multiplier: 2.0 },
                        { value: "fam_schizophrenie", label: "Schizophrenie", genetic_risk: "psychosis", multiplier: 1.5 },
                        { value: "fam_sucht", label: "Suchterkrankung", genetic_risk: "addiction", multiplier: 1.3 },
                        { value: "fam_suizid", label: "Suizid in der Familie", genetic_risk: "mood", risk: 2, alert: true }
                    ]
                },
                {
                    id: "erziehungsstil",
                    question: "Erziehungsstil",
                    type: "multi",
                    options: [
                        { value: "warmherzig", label: "Warmherzig und zugewandt", protective: 2 },
                        { value: "konsequent", label: "Konsequent und strukturiert", protective: 1.5 },
                        { value: "inkonsequent", label: "Inkonsequent (Regeln gelten nicht immer)", risk: 1 },
                        { value: "ueberforderung", label: "Überforderung der Eltern", risk: 1 },
                        { value: "streng_strafe", label: "Sehr streng/körperliche Bestrafung", risk: 1.5, pattern: "harsh_parenting" },
                        { value: "nachgiebig", label: "Sehr nachgiebig/permissiv", risk: 1 },
                        { value: "kontrollierend", label: "Übermäßig kontrollierend", risk: 1, pattern: "anxiety_modeling" },
                        { value: "uneinig", label: "Eltern uneinig in Erziehung", risk: 1 }
                    ]
                }
            ]
        },

        // MODUL 8: Trauma & Belastung
        trauma: {
            title: "Trauma & Belastung",
            description: "Belastende Erfahrungen, Traumata",
            icon: "⚠️",
            sensitive: true,
            questions: [
                {
                    id: "adverse_events",
                    question: "Belastende Lebensereignisse (ACEs)",
                    type: "multi",
                    helpText: "Adverse Childhood Experiences - bekannte Risikofaktoren",
                    options: [
                        { value: "misshandlung", label: "Körperliche Misshandlung", ace: true, risk: 2, alert: true },
                        { value: "vernachlaessigung", label: "Vernachlässigung", ace: true, risk: 2, pattern: "attachment" },
                        { value: "sexueller_missbrauch", label: "Sexueller Missbrauch", ace: true, risk: 3, alert: true },
                        { value: "emotionaler_missbrauch", label: "Emotionaler Missbrauch", ace: true, risk: 1.5 },
                        { value: "zeuge_gewalt", label: "Zeuge häuslicher Gewalt", ace: true, risk: 1.5 },
                        { value: "verlust_bezugsperson", label: "Tod einer wichtigen Bezugsperson", risk: 1.5, pattern: "grief" },
                        { value: "trennung_ploetzlich", label: "Plötzliche Trennung von Bezugsperson", risk: 1, pattern: "attachment" },
                        { value: "unfall_krankheit", label: "Schwerer Unfall/lebensbedrohliche Krankheit", risk: 1, pattern: "medical_trauma" },
                        { value: "mobbing", label: "Mobbing/Bullying", risk: 1, pattern: "peer_trauma" },
                        { value: "flucht", label: "Flucht/Migration unter belastenden Umständen", risk: 1.5, pattern: "displacement" }
                    ]
                },
                {
                    id: "trauma_symptome",
                    question: "Trauma-Symptome (falls belastendes Ereignis bekannt)",
                    type: "multi",
                    conditional: "adverse_events",
                    options: [
                        { value: "wiedererleben", label: "Alpträume, Flashbacks, wiederkehrende Bilder", pattern: "ptsd", score: 2 },
                        { value: "vermeidung", label: "Vermeidet Erinnerungen/Orte/Personen", pattern: "ptsd", score: 1 },
                        { value: "uebererregung", label: "Schreckhaft, überwachsam", pattern: "ptsd", score: 1 },
                        { value: "abflachung", label: "Emotionale Taubheit/Abflachung", pattern: "ptsd", score: 1 },
                        { value: "regression", label: "Rückfall in frühere Entwicklungsstufe", pattern: "trauma", score: 1 },
                        { value: "dissoziation", label: "Dissoziative Zustände ('weggetreten')", pattern: "dissociation", score: 2 }
                    ]
                },
                {
                    id: "bindung",
                    question: "Bindungsverhalten",
                    type: "single",
                    options: [
                        { value: "sicher", label: "Sucht Nähe und Trost bei Bezugsperson, lässt sich beruhigen", pattern: "secure_attachment", protective: 2 },
                        { value: "vermeidend", label: "Zeigt wenig Bindungsverhalten, 'zu selbstständig'", pattern: "avoidant_attachment", risk: 1 },
                        { value: "ambivalent", label: "Klammert, schwer zu beruhigen, wütend und anklammernd zugleich", pattern: "ambivalent_attachment", risk: 1 },
                        { value: "desorganisiert", label: "Widersprüchlich, erstarrt, bizarr, ängstlich gegenüber Bezugsperson", pattern: "disorganized_attachment", risk: 2 },
                        { value: "unterschiedslos", label: "Geht zu jedem, keine Fremdeln", pattern: "reactive_attachment", risk: 2 }
                    ]
                }
            ]
        },

        // MODUL 9: Ressourcen & Schutzfaktoren
        ressourcen: {
            title: "Ressourcen & Schutzfaktoren",
            description: "Stärken, die Resilienz fördern",
            icon: "💪",
            questions: [
                {
                    id: "kind_ressourcen",
                    question: "Stärken des Kindes",
                    type: "multi",
                    options: [
                        { value: "intelligent", label: "Überdurchschnittlich intelligent", protective: 1.5 },
                        { value: "sozial_kompetent", label: "Sozial kompetent (wenn nicht unter Stress)", protective: 1.5 },
                        { value: "humor", label: "Hat Humor", protective: 1 },
                        { value: "kreativ", label: "Kreativ/künstlerisch begabt", protective: 1 },
                        { value: "sportlich", label: "Sportlich/motorisch stark", protective: 1 },
                        { value: "hilfsbereit", label: "Hilfsbereit und fürsorglich", protective: 1 },
                        { value: "durchhaltevermoegen", label: "Durchhaltevermögen bei Interessen", protective: 1 },
                        { value: "problemloesen", label: "Kann Probleme lösen", protective: 1.5 }
                    ]
                },
                {
                    id: "umfeld_ressourcen",
                    question: "Ressourcen im Umfeld",
                    type: "multi",
                    options: [
                        { value: "stabile_bezugsperson", label: "Mind. eine stabile Bezugsperson", protective: 2, critical: true },
                        { value: "gute_freunde", label: "Hat gute Freunde", protective: 1.5 },
                        { value: "positive_schule", label: "Positive Schulerfahrung/gute Lehrer", protective: 1 },
                        { value: "verein_hobby", label: "Regelmäßiges Hobby/Verein", protective: 1 },
                        { value: "therapeut", label: "Hat bereits Therapeut/Unterstützung", protective: 1 },
                        { value: "familie_unterstuetzt", label: "Familie sucht aktiv Hilfe", protective: 1.5, engagement: true }
                    ]
                }
            ]
        }
    },

    // ============================================
    // KLINISCHE MUSTER (Pattern Recognition)
    // ============================================

    clinicalPatterns: {

        // ADHS
        adhs: {
            name: "ADHS (Aufmerksamkeitsdefizit-Hyperaktivitätsstörung)",
            icd11: "6A05",
            category: "Neurodevelopmental",
            criteria: {
                required: ["vor_12", "mehrere_settings", "beeintraechtigung"],
                unaufmerksam: { min: 6 },
                hyperaktiv_impulsiv: { min: 6 },
                either_or: true // Entweder unaufmerksam ODER hyperaktiv/impulsiv >= 6
            },
            riskFactors: ["familie_adhs", "fruehgeburt", "substanzen", "schwer_beruhigen_baby"],
            protectiveFactors: ["intelligent", "positive_schule", "stabile_bezugsperson"],
            differentialDiagnosis: ["anxiety", "trauma", "sleep_disorder", "thyroid", "intellectual_disability"],
            psychoeducation: {
                whatIsIt: "ADHS ist eine neurobiologische Entwicklungsstörung, bei der das Gehirn Schwierigkeiten hat, Aufmerksamkeit zu steuern und Impulse zu kontrollieren. Es ist KEINE Frage der Erziehung oder des Willens.",
                whyHappens: "Bei ADHS arbeiten bestimmte Botenstoffe im Gehirn (v.a. Dopamin) anders. Das frontale Gehirn, das für Planung und Impulskontrolle zuständig ist, entwickelt sich langsamer.",
                whatHelps: "Struktur, klare Regeln, viel Bewegung, kurze Arbeitseinheiten, positive Verstärkung. Bei starker Ausprägung kann Medikation sehr hilfreich sein.",
                prognosis: "Mit der richtigen Unterstützung können Kinder mit ADHS sehr erfolgreich sein. Die Symptome verändern sich oft im Jugendalter."
            },
            interventions: {
                immediate: [
                    "Reizarmer Sitzplatz vorne in der Klasse",
                    "Eine Anweisung zur Zeit, kurz und klar",
                    "Bewegungspausen alle 15-20 Minuten",
                    "Timer und visuelle Hilfsmittel nutzen"
                ],
                medium: [
                    "Elterntraining (z.B. Triple P, THOP)",
                    "Verhaltenstherapie für das Kind",
                    "Fachärztliche Abklärung bzgl. Medikation"
                ],
                school: [
                    "Nachteilsausgleich beantragen",
                    "Schulbegleitung bei Bedarf",
                    "Enge Kooperation Eltern-Schule"
                ]
            }
        },

        // Angststörungen
        anxiety: {
            name: "Angststörung",
            icd11: "6B00-6B0Z",
            category: "Anxiety",
            subtypes: {
                separation: { markers: ["trennungsangst"], name: "Trennungsangst" },
                social: { markers: ["soziale_angst"], name: "Soziale Angststörung" },
                specific: { markers: ["spezifische_angst"], name: "Spezifische Phobie" },
                generalized: { markers: ["generalisiert"], name: "Generalisierte Angststörung" }
            },
            riskFactors: ["fam_angst", "kontrollierend", "schreibaby", "trennungsangst"],
            protectiveFactors: ["sicher", "warmherzig", "stabile_bezugsperson"],
            differentialDiagnosis: ["adhs", "asd", "trauma", "depression", "medical"],
            psychoeducation: {
                whatIsIt: "Angst ist ein normales Gefühl, das uns vor Gefahr schützt. Bei einer Angststörung ist diese 'Alarmanlage' überempfindlich - sie geht auch an, wenn keine echte Gefahr besteht.",
                whyHappens: "Manche Kinder sind von Natur aus ängstlicher (Temperament). Dazu kommen oft Lernerfahrungen: Wenn Angst durch Vermeidung 'belohnt' wird, verstärkt sie sich.",
                whatHelps: "Das Wichtigste: Vermeidung NICHT unterstützen! Schrittweise an angstauslösende Situationen heranführen (Exposition). Das Gehirn lernt: 'Es passiert ja gar nichts Schlimmes!'",
                prognosis: "Angststörungen lassen sich sehr gut behandeln. Je früher, desto besser. Ohne Behandlung können sie chronisch werden."
            },
            interventions: {
                immediate: [
                    "Angst validieren, aber Vermeidung NICHT unterstützen",
                    "Kleine mutige Schritte loben",
                    "Entspannungstechniken üben (Atmung)"
                ],
                medium: [
                    "Kognitive Verhaltenstherapie (goldener Standard)",
                    "Graduelle Exposition",
                    "Elternanleitung: Wie reagiere ich auf Angst?"
                ],
                school: [
                    "Bei Schulangst: Gestufter Wiedereinstieg planen",
                    "Rückzugsmöglichkeit schaffen (aber zeitlich begrenzt)",
                    "Erfolge schaffen"
                ]
            }
        },

        // Depression
        depression: {
            name: "Depression",
            icd11: "6A70-6A7Z",
            category: "Mood",
            criteria: {
                core: ["traurig", "interessenverlust", "reizbar"], // mind. 1 Kernsymptom
                duration: "2_weeks"
            },
            riskFactors: ["fam_depression", "verlust_bezugsperson", "mobbing", "vernachlaessigung"],
            protectiveFactors: ["stabile_bezugsperson", "gute_freunde", "verein_hobby"],
            warningSignsAlert: ["suizid"],
            differentialDiagnosis: ["anxiety", "adhs", "trauma", "medical", "substance"],
            psychoeducation: {
                whatIsIt: "Depression bei Kindern zeigt sich oft anders als bei Erwachsenen: Häufig als Reizbarkeit statt Traurigkeit. Das Kind kann oft selbst nicht sagen, was los ist.",
                whyHappens: "Depression entsteht aus einem Zusammenspiel von Veranlagung (Gene), Stress und gelernter Hilflosigkeit. Das Gehirn steckt in einem Modus fest, in dem alles negativ erscheint.",
                whatHelps: "Aktivierung (trotz Lustlosigkeit Dinge tun), positive Erlebnisse, Unterstützung der Bezugspersonen. Bei starker Depression: Psychotherapie, manchmal Medikation.",
                prognosis: "Depression ist gut behandelbar! Wichtig ist, früh zu handeln. Unbehandelt besteht Rückfallrisiko."
            },
            interventions: {
                immediate: [
                    "Suizidalität IMMER ansprechen und erfragen!",
                    "Aktivierung: Struktur und angenehme Aktivitäten",
                    "Entlastung von Druck, aber Tagesstruktur halten"
                ],
                medium: [
                    "Kognitive Verhaltenstherapie",
                    "Interpersonelle Therapie",
                    "Bei schwerer Depression: Facharzt (Medikation)"
                ],
                family: [
                    "Eltern aufklären: Keine Vorwürfe!",
                    "Unterstützende, geduldige Haltung",
                    "Eigene Belastung der Eltern beachten"
                ]
            }
        },

        // Oppositionelle Störung
        odd: {
            name: "Störung des Sozialverhaltens mit oppositionellem Verhalten",
            icd11: "6C90",
            category: "Disruptive",
            criteria: {
                opposition: { min: 4 },
                duration: "6_months"
            },
            riskFactors: ["inkonsequent", "streng_strafe", "haeusliche_gewalt", "eltern_ueberlastet"],
            protectiveFactors: ["warmherzig", "konsequent", "stabile_bezugsperson", "positive_schule"],
            comorbidity: ["adhs", "anxiety", "depression"],
            differentialDiagnosis: ["adhs", "trauma", "depression", "asd"],
            psychoeducation: {
                whatIsIt: "Kinder mit ODD haben ein Muster von trotzigem, feindseligem Verhalten gegenüber Autoritätspersonen. Das geht über normales Trotzen deutlich hinaus.",
                whyHappens: "Oft eine Mischung aus: Temperament (leicht reizbar), negativen Eltern-Kind-Interaktionen und fehlenden Fähigkeiten zur Emotionsregulation. Das Kind erlebt die Welt als unfair und reagiert mit Widerstand.",
                whatHelps: "Konsequente, warmherzige Erziehung. Positive Beziehungszeit. Klare, durchsetzbare Regeln. Das Kind braucht Erfolgserlebnisse und das Gefühl, auch Einfluss zu haben.",
                prognosis: "Mit guter Intervention oft deutliche Verbesserung. Ohne Behandlung Risiko für Verschlechterung (Störung des Sozialverhaltens)."
            },
            interventions: {
                immediate: [
                    "Positive Beziehungszeit jeden Tag (10-15 Min)",
                    "Klare, wenige Regeln konsequent durchsetzen",
                    "Wahlmöglichkeiten anbieten (Autonomie!)",
                    "Eskalationen vermeiden, Machtkämpfe umgehen"
                ],
                medium: [
                    "Elterntraining (Triple P, Incredible Years, THOP)",
                    "Problemlösetraining für das Kind",
                    "Emotionsregulation üben"
                ],
                school: [
                    "Enge Kooperation mit Eltern",
                    "Positive Verstärkung vor Strafe",
                    "Erfolgserlebnisse schaffen"
                ]
            }
        },

        // Störung des Sozialverhaltens
        conduct: {
            name: "Störung des Sozialverhaltens",
            icd11: "6C91",
            category: "Disruptive",
            criteria: {
                dissozial: { min: 3 },
                aggression: { min: 1, severe: true },
                duration: "12_months"
            },
            riskFactors: ["haeusliche_gewalt", "vernachlaessigung", "streng_strafe", "eltern_sucht", "fam_sucht"],
            alertMarkers: ["kein_schuldgefuehl", "nutzt_andere", "proaktiv", "tier_quaelen"],
            protectiveFactors: ["stabile_bezugsperson", "warmherzig"],
            psychoeducation: {
                whatIsIt: "Bei der Störung des Sozialverhaltens werden grundlegende Rechte anderer verletzt und wichtige gesellschaftliche Normen gebrochen. Dies geht weit über 'schwieriges Verhalten' hinaus.",
                whyHappens: "Meist ein Zusammenwirken von: genetischer Vulnerabilität, ungünstigen Erziehungserfahrungen (Härte, Inkonsistenz, Vernachlässigung), Modelllernen und peer-Einflüssen.",
                whatHelps: "Intensive, frühe Intervention. Multisystemische Therapie. Positives Erziehungsverhalten stärken. Prosoziale Peer-Kontakte fördern.",
                prognosis: "Je früher Beginn und je mehr 'callous-unemotional' Merkmale, desto ernster. Frühintervention kann Verlauf deutlich verbessern."
            },
            interventions: {
                immediate: [
                    "Sicherheit aller Beteiligten gewährleisten",
                    "Klare Grenzen, konsequente (aber nicht harte) Konsequenzen",
                    "KEINE körperliche Bestrafung!"
                ],
                medium: [
                    "Multisystemische Therapie (MST)",
                    "Funktionale Familientherapie (FFT)",
                    "Intensives Elterntraining"
                ],
                long_term: [
                    "Prosoziale Peer-Gruppe fördern",
                    "Schulische/berufliche Integration",
                    "Engmaschige Begleitung"
                ]
            }
        },

        // Autismus-Spektrum
        asd: {
            name: "Autismus-Spektrum-Störung",
            icd11: "6A02",
            category: "Neurodevelopmental",
            criteria: {
                social_communication: { min: 3 }, // Defizite in sozialer Kommunikation
                restricted_repetitive: { min: 2 } // Eingeschränkte, repetitive Verhaltensweisen
            },
            markers: ["kein_interesse", "kein_blickkontakt", "routinen", "spezialinteressen", "sensorisch", "echolalie", "koerpersprache", "woertlich"],
            riskFactors: ["fam_autismus", "sprache_regression", "motorik_verzoegert"],
            protectiveFactors: ["intelligent", "stabile_bezugsperson", "familie_unterstuetzt"],
            differentialDiagnosis: ["social_anxiety", "intellectual_disability", "language_disorder", "adhs"],
            psychoeducation: {
                whatIsIt: "Autismus ist eine neurologische Besonderheit, bei der das Gehirn Informationen anders verarbeitet. Es ist ein Spektrum - von leicht bis schwer, mit sehr unterschiedlichen Stärken und Schwächen.",
                whyHappens: "Autismus ist stark genetisch bedingt. Das Gehirn ist anders 'verdrahtet' - oft mit sehr guter Detailwahrnehmung, aber Schwierigkeiten beim Verstehen des 'großen Ganzen' sozialer Situationen.",
                whatHelps: "Akzeptanz der Andersartigkeit. Klare, vorhersehbare Strukturen. Soziale Fähigkeiten können trainiert werden. Sensorische Bedürfnisse beachten.",
                prognosis: "Autismus ist keine Krankheit, die 'geheilt' wird. Mit der richtigen Unterstützung können autistische Menschen sehr erfüllte Leben führen. Frühförderung ist wichtig."
            },
            interventions: {
                immediate: [
                    "Klare, vorhersehbare Strukturen schaffen",
                    "Visuelle Hilfen nutzen (Bilder, Pläne)",
                    "Sensorische Bedürfnisse beachten (Rückzugsraum)",
                    "Direkte, wörtliche Kommunikation"
                ],
                medium: [
                    "Fachärztliche Diagnostik (Autismus-Ambulanz)",
                    "Frühförderung/Autismus-Therapie",
                    "Soziales Kompetenztraining in Gruppe"
                ],
                school: [
                    "Nachteilsausgleich",
                    "Evtl. Schulbegleitung",
                    "Enge Zusammenarbeit mit Autismus-Therapeuten"
                ]
            }
        },

        // Trauma/Belastungsstörung
        trauma: {
            name: "Trauma- und belastungsbezogene Störung",
            icd11: "6B40-6B4Z",
            category: "Trauma",
            criteria: {
                event: true, // Belastendes Ereignis
                symptoms: { min: 2 } // Trauma-Symptome
            },
            riskFactors: ["misshandlung", "vernachlaessigung", "sexueller_missbrauch", "haeusliche_gewalt", "desorganisiert"],
            protectiveFactors: ["sicher", "stabile_bezugsperson", "familie_unterstuetzt"],
            presentations: {
                ptsd: ["wiedererleben", "vermeidung", "uebererregung"],
                complex: ["dysregulation", "dissoziation", "abflachung"],
                developmental: ["desorganisiert", "unterschiedslos"]
            },
            psychoeducation: {
                whatIsIt: "Nach sehr belastenden Erlebnissen kann das Gehirn 'steckenbleiben' im Alarmmodus. Das Kind reagiert dann, als wäre die Gefahr noch da - auch wenn sie längst vorbei ist.",
                whyHappens: "Das Gehirn speichert traumatische Erlebnisse anders als normale Erinnerungen - nicht als 'vergangen', sondern als 'jetzt'. Bestimmte Auslöser (Trigger) aktivieren diese Erinnerung und die alten Gefühle.",
                whatHelps: "Sicherheit und Stabilisierung zuerst! Das Kind braucht vorhersehbare, sichere Beziehungen. Spezielle Traumatherapie (EMDR, TF-KVT) kann sehr wirksam sein.",
                prognosis: "Trauma ist behandelbar! Mit der richtigen Therapie können Kinder lernen, das Erlebte zu verarbeiten und wieder ein normales Leben zu führen."
            },
            interventions: {
                immediate: [
                    "SICHERHEIT ist oberste Priorität",
                    "Vorhersehbare Routine, Stabilität",
                    "Trigger identifizieren und möglichst vermeiden",
                    "Keine Konfrontation erzwingen!"
                ],
                medium: [
                    "Traumafokussierte Kognitive Verhaltenstherapie (TF-KVT)",
                    "EMDR",
                    "Stabilisierungsarbeit"
                ],
                family: [
                    "Eltern über Trauma aufklären",
                    "Sekundäre Traumatisierung der Bezugspersonen beachten",
                    "Familientherapie wenn angemessen"
                ]
            }
        },

        // Bindungsstörung
        attachment: {
            name: "Bindungsstörung",
            icd11: "6B44-6B45",
            category: "Trauma",
            criteria: {
                history: ["pflegefamilie", "heim", "wechselnd", "vernachlaessigung"],
                attachment_pattern: ["desorganisiert", "unterschiedslos"]
            },
            riskFactors: ["wechselnd", "vernachlaessigung", "pflegefamilie", "heim"],
            psychoeducation: {
                whatIsIt: "Kinder, die in den ersten Lebensjahren keine verlässliche Bezugsperson hatten, können Schwierigkeiten entwickeln, sichere Beziehungen aufzubauen.",
                whyHappens: "Das Gehirn 'lernt' in den ersten Jahren, ob die Welt sicher ist und ob man Menschen vertrauen kann. Wurde dieses Vertrauen nicht aufgebaut, bleibt ein Grundmisstrauen.",
                whatHelps: "Langfristige, verlässliche Beziehung zu einer Bezugsperson. Geduld - Vertrauen aufzubauen dauert lange. Therapeutische Unterstützung.",
                prognosis: "Bindung kann auch später noch aufgebaut werden, braucht aber Zeit und Konstanz. Je früher die Intervention, desto besser."
            },
            interventions: {
                immediate: [
                    "Stabile Bezugsperson gewährleisten",
                    "Vorhersehbarkeit und Routine",
                    "KEINE Zurückweisung als Strafe!"
                ],
                medium: [
                    "Bindungsbasierte Therapie",
                    "Pflege-/Adoptivelternberatung",
                    "Traumatherapie wenn nötig"
                ],
                long_term: [
                    "Langfristige therapeutische Begleitung",
                    "Konstanz der Betreuungspersonen"
                ]
            }
        }
    },

    // ============================================
    // DIFFERENZIALDIAGNOSTISCHE REGELN
    // ============================================

    differentialRules: [
        {
            if: ["unaufmerksam", "hyperaktiv"],
            and_not: ["trauma_symptome", "angst_symptome"],
            and: ["vor_12", "ueberall"],
            then: "adhs",
            confidence: "high"
        },
        {
            if: ["unaufmerksam"],
            and: ["angst_symptome"],
            and_not: ["hyperaktiv", "impulsiv"],
            then: "anxiety",
            note: "Konzentrationsprobleme können sekundär zu Angst sein",
            confidence: "medium"
        },
        {
            if: ["hyperaktiv", "impulsiv", "dysregulation"],
            and: ["adverse_events"],
            then: ["adhs", "trauma"],
            note: "ADHS und Trauma können komorbid sein oder verwechselt werden",
            requires_further: "trauma_assessment"
        },
        {
            if: ["opposition", "aggression"],
            and: ["warmherzig", "konsequent"],
            and_not: ["inkonsequent", "streng_strafe"],
            then: ["adhs", "odd"],
            note: "Bei guter Erziehung eher neurobiologische Ursache"
        },
        {
            if: ["soziale_interaktion"],
            and: ["asd_marker"],
            and: ["immer"],
            then: "asd",
            confidence: "medium_high"
        },
        {
            if: ["soziale_angst", "will_aber_kann_nicht"],
            and_not: ["asd_marker"],
            then: "anxiety",
            subtype: "social"
        }
    ],

    // ============================================
    // PSYCHOEDUKATION ALLGEMEIN
    // ============================================

    generalPsychoeducation: {
        developmentalStages: {
            title: "Entwicklungsstufen und Verhalten",
            content: "Jedes Alter hat seine typischen Herausforderungen. Was bei einem 3-Jährigen normal ist (Trotzphase), wäre bei einem 10-Jährigen auffällig. Das ELDiB hilft, den Entwicklungsstand einzuschätzen."
        },
        brainDevelopment: {
            title: "Gehirnentwicklung",
            content: "Das Gehirn entwickelt sich bis etwa 25 Jahre. Das 'Steuerungszentrum' (präfrontaler Kortex) reift als letztes. Deshalb haben Kinder noch Schwierigkeiten mit Impulskontrolle und Vorausplanung - das ist normal!"
        },
        naturNurture: {
            title: "Anlage und Umwelt",
            content: "Verhalten entsteht immer aus dem Zusammenspiel von Veranlagung (Gene, Temperament) und Umwelt (Erziehung, Erfahrungen). Keines allein bestimmt das Ergebnis. Gute Umwelt kann genetische Risiken abpuffern."
        },
        attachment: {
            title: "Die Bedeutung sicherer Bindung",
            content: "Eine sichere Bindung zu mindestens einer Bezugsperson ist DER wichtigste Schutzfaktor für die psychische Entwicklung. Sie gibt dem Kind eine 'sichere Basis', von der aus es die Welt erkunden kann."
        }
    },

    // ============================================
    // EMPFEHLUNGEN NACH DRINGLICHKEIT
    // ============================================

    urgencyLevels: {
        immediate: {
            triggers: ["suizid", "selbstverletzung", "misshandlung", "sexueller_missbrauch"],
            action: "Sofortige Krisenintervention erforderlich. Sicherheit gewährleisten. Fachärztliche/psychologische Notaufnahme.",
            color: "red"
        },
        urgent: {
            triggers: ["tier_quaelen", "waffen", "fam_suizid", "desorganisiert"],
            action: "Dringende fachärztliche Vorstellung empfohlen (innerhalb 1-2 Wochen).",
            color: "orange"
        },
        soon: {
            triggers: ["red_screening"],
            action: "Fachärztliche/psychologische Abklärung empfohlen (innerhalb 4-6 Wochen).",
            color: "yellow"
        },
        planned: {
            triggers: ["yellow_screening"],
            action: "Beratung/Diagnostik sinnvoll. Termin in nächsten 2-3 Monaten.",
            color: "blue"
        }
    }
};

// Export für globale Nutzung
window.CLINICAL_BRAIN = CLINICAL_BRAIN;
