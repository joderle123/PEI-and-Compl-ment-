// ========================================
// DIAGNOSTIC SPÉCIALISÉ - FRAGEBOGEN
// Automatisierte Berichtsgenerierung durch strukturierte Fragen
// ========================================

// Fragebogen-Antworten State
let fragebogenAntworten = {
    anlass: {},
    verhalten: {},
    kommunikation: {},
    sozialisation: {},
    kognition: {},
    ressourcen: {},
    umfeld: {},
    empfehlungen: {}
};

// ========================================
// FRAGEBOGEN STRUKTUR
// ========================================

const DIAGNOSTIC_FRAGEBOGEN = {

    // ========================================
    // ABSCHNITT 1: ANLASS DER DIAGNOSTIK
    // ========================================
    anlass: {
        titel: "Anlass der Diagnostik",
        untertitel: "Warum wird diese Einschätzung durchgeführt?",
        fragen: [
            {
                id: "anlass_grund",
                frage: "Was ist der Hauptanlass dieser diagnostischen Einschätzung?",
                typ: "single",
                optionen: [
                    { value: "erstdiagnostik", label: "Erstdiagnostik / Ersteinschätzung", text: "Im Rahmen einer Erstdiagnostik wurde eine umfassende Einschätzung der sozial-emotionalen Entwicklung durchgeführt." },
                    { value: "verlauf", label: "Verlaufsdiagnostik / Förderplanfortschreibung", text: "Im Rahmen der Verlaufsdiagnostik wurde der aktuelle Entwicklungsstand erneut erfasst, um die Förderplanung anzupassen." },
                    { value: "schulwechsel", label: "Schulwechsel / Transition", text: "Anlässlich eines bevorstehenden Schulwechsels wurde eine diagnostische Einschätzung zur Unterstützung der Transition durchgeführt." },
                    { value: "krise", label: "Aktuelle Krise / Verhaltensauffälligkeiten", text: "Aufgrund aktueller Verhaltensauffälligkeiten wurde eine diagnostische Einschätzung zur Klärung des Förderbedarfs durchgeführt." },
                    { value: "elternwunsch", label: "Wunsch der Erziehungsberechtigten", text: "Auf Wunsch der Erziehungsberechtigten wurde eine diagnostische Einschätzung durchgeführt." }
                ]
            },
            {
                id: "anlass_fragestellung",
                frage: "Welche konkrete Fragestellung soll beantwortet werden?",
                typ: "multi",
                optionen: [
                    { value: "foerderbedarf", label: "Ermittlung des sonderpädagogischen Förderbedarfs", text: "Ermittlung des sonderpädagogischen Förderbedarfs im Bereich der sozial-emotionalen Entwicklung" },
                    { value: "foerderplanung", label: "Grundlage für die Förderplanung", text: "Erstellung einer fundierten Grundlage für die individuelle Förderplanung" },
                    { value: "ressourcen", label: "Identifikation von Ressourcen und Stärken", text: "Identifikation von Ressourcen und Stärken als Ansatzpunkte für die Förderung" },
                    { value: "massnahmen", label: "Empfehlung geeigneter Fördermaßnahmen", text: "Ableitung geeigneter Fördermaßnahmen und Unterstützungsangebote" },
                    { value: "schulform", label: "Empfehlung zur Beschulung", text: "Empfehlung zur geeigneten schulischen Förderung und Beschulungsform" }
                ]
            },
            {
                id: "vorgeschichte",
                frage: "Gibt es relevante Vorgeschichte?",
                typ: "multi",
                optionen: [
                    { value: "keine", label: "Keine bekannte Vorgeschichte", text: "" },
                    { value: "fruehfoerderung", label: "Frühförderung erhalten", text: "Das Kind erhielt bereits Frühförderung." },
                    { value: "therapie", label: "Therapeutische Maßnahmen", text: "Es wurden/werden therapeutische Maßnahmen durchgeführt." },
                    { value: "diagnose", label: "Bestehende Diagnosen", text: "Es liegen bereits diagnostische Befunde vor." },
                    { value: "wiederholung", label: "Klassenwiederholung", text: "Das Kind hat bereits eine Klasse wiederholt." },
                    { value: "schulwechsel_hist", label: "Schulwechsel in der Vergangenheit", text: "Es fanden bereits Schulwechsel statt." }
                ]
            }
        ]
    },

    // ========================================
    // ABSCHNITT 2: VERHALTEN
    // ========================================
    verhalten: {
        titel: "Bereich Verhalten",
        untertitel: "Selbstregulation, Impulskontrolle, Emotionsregulation",
        fragen: [
            {
                id: "v_selbstregulation",
                frage: "Wie ist die Fähigkeit zur Selbstregulation ausgeprägt?",
                typ: "skala",
                skala: ["stark beeinträchtigt", "beeinträchtigt", "teilweise entwickelt", "altersgemäß", "besondere Stärke"],
                texte: {
                    0: "Die Selbstregulation ist stark beeinträchtigt. {name} zeigt erhebliche Schwierigkeiten, das eigene Verhalten und die eigenen Emotionen zu kontrollieren.",
                    1: "Die Selbstregulationsfähigkeit ist beeinträchtigt. {name} benötigt häufig externe Unterstützung zur Verhaltens- und Emotionsregulation.",
                    2: "Die Selbstregulation ist teilweise entwickelt. {name} kann sich in strukturierten Situationen regulieren, zeigt aber in unstrukturierten oder belastenden Situationen Schwierigkeiten.",
                    3: "{name} verfügt über eine altersgemäß entwickelte Selbstregulationsfähigkeit.",
                    4: "{name} zeigt eine besonders gut entwickelte Selbstregulationsfähigkeit und kann auch in herausfordernden Situationen angemessen reagieren."
                }
            },
            {
                id: "v_impulskontrolle",
                frage: "Wie ist die Impulskontrolle?",
                typ: "skala",
                skala: ["stark beeinträchtigt", "beeinträchtigt", "teilweise entwickelt", "altersgemäß", "besondere Stärke"],
                texte: {
                    0: "Die Impulskontrolle ist stark beeinträchtigt. {name} handelt überwiegend impulsiv und ohne Reflexion der Konsequenzen.",
                    1: "Die Impulskontrolle ist beeinträchtigt. {name} zeigt häufig impulsive Reaktionen und hat Schwierigkeiten, Handlungsimpulse zu hemmen.",
                    2: "{name} kann Impulse teilweise kontrollieren, zeigt aber in emotional aufgeladenen Situationen noch impulsive Reaktionen.",
                    3: "{name} verfügt über eine altersgemäß entwickelte Impulskontrolle.",
                    4: "{name} zeigt eine ausgezeichnete Impulskontrolle und kann auch bei starken Emotionen besonnen reagieren."
                }
            },
            {
                id: "v_frustration",
                frage: "Wie geht das Kind mit Frustration und Misserfolg um?",
                typ: "skala",
                skala: ["sehr geringe Toleranz", "geringe Toleranz", "schwankend", "angemessen", "hohe Toleranz"],
                texte: {
                    0: "Die Frustrationstoleranz ist sehr gering. {name} reagiert auf kleinste Frustrationen mit starken emotionalen Ausbrüchen oder Rückzug.",
                    1: "{name} zeigt eine geringe Frustrationstoleranz und hat Schwierigkeiten, mit Misserfolgen und Enttäuschungen umzugehen.",
                    2: "Die Frustrationstoleranz ist schwankend. {name} kann je nach Situation und Tagesform unterschiedlich mit Frustration umgehen.",
                    3: "{name} verfügt über eine angemessene Frustrationstoleranz und kann Misserfolge in der Regel akzeptieren.",
                    4: "{name} zeigt eine hohe Frustrationstoleranz und kann auch mit wiederholten Misserfolgen konstruktiv umgehen."
                }
            },
            {
                id: "v_regeln",
                frage: "Wie verhält sich das Kind gegenüber Regeln und Grenzen?",
                typ: "single",
                optionen: [
                    { value: "opposition", label: "Häufige Opposition und Verweigerung", text: "{name} zeigt häufig oppositionelles Verhalten und verweigert die Einhaltung von Regeln und Grenzen." },
                    { value: "schwierig", label: "Akzeptiert Regeln nur schwer", text: "{name} akzeptiert Regeln und Grenzen nur schwer und benötigt häufige Erinnerungen und Unterstützung." },
                    { value: "situativ", label: "Situationsabhängig", text: "{name} akzeptiert Regeln situationsabhängig. Bei bekannten Regeln und positiver Beziehung zur Bezugsperson gelingt die Einhaltung besser." },
                    { value: "meistens", label: "Hält Regeln meistens ein", text: "{name} hält Regeln und Grenzen in der Regel ein und kann deren Sinn nachvollziehen." },
                    { value: "zuverlaessig", label: "Hält Regeln zuverlässig ein", text: "{name} hält Regeln zuverlässig ein und zeigt ein gutes Verständnis für deren Notwendigkeit." }
                ]
            },
            {
                id: "v_uebergaenge",
                frage: "Wie bewältigt das Kind Übergänge und Veränderungen?",
                typ: "single",
                optionen: [
                    { value: "sehr_schwer", label: "Sehr große Schwierigkeiten", text: "{name} zeigt sehr große Schwierigkeiten bei Übergängen und Veränderungen. Diese führen regelmäßig zu Krisen oder Verhaltensauffälligkeiten." },
                    { value: "schwer", label: "Deutliche Schwierigkeiten", text: "{name} hat deutliche Schwierigkeiten bei Übergängen und benötigt intensive Vorbereitung und Begleitung." },
                    { value: "unterstuetzung", label: "Benötigt Unterstützung", text: "{name} bewältigt Übergänge mit angemessener Vorbereitung und Unterstützung." },
                    { value: "meist_gut", label: "Meist problemlos", text: "{name} bewältigt Übergänge und Veränderungen meist problemlos." },
                    { value: "flexibel", label: "Sehr flexibel", text: "{name} zeigt sich flexibel und anpassungsfähig bei Übergängen und Veränderungen." }
                ]
            },
            {
                id: "v_ausdauer",
                frage: "Wie ist die Ausdauer und Konzentration bei Aufgaben?",
                typ: "skala",
                skala: ["stark beeinträchtigt", "beeinträchtigt", "schwankend", "altersgemäß", "besondere Stärke"],
                texte: {
                    0: "Ausdauer und Konzentration sind stark beeinträchtigt. {name} kann Aufgaben kaum über wenige Minuten hinaus bearbeiten.",
                    1: "Ausdauer und Konzentration sind beeinträchtigt. {name} ist leicht ablenkbar und bricht Aufgaben häufig vorzeitig ab.",
                    2: "Ausdauer und Konzentration sind schwankend. Bei hohem Interesse kann {name} sich gut konzentrieren, bei geringerem Interesse zeigen sich Schwierigkeiten.",
                    3: "{name} verfügt über eine altersgemäße Ausdauer und Konzentrationsfähigkeit.",
                    4: "{name} zeigt eine besonders gute Ausdauer und kann sich auch über längere Zeiträume konzentriert mit Aufgaben beschäftigen."
                }
            },
            {
                id: "v_lob",
                frage: "Wie reagiert das Kind auf Lob und positive Rückmeldung?",
                typ: "single",
                optionen: [
                    { value: "ablehnung", label: "Lehnt Lob ab oder reagiert negativ", text: "{name} reagiert auf Lob häufig ablehnend oder zeigt paradoxe Reaktionen wie verstärktes Fehlverhalten." },
                    { value: "unsicher", label: "Reagiert unsicher", text: "{name} reagiert unsicher auf Lob und scheint positive Rückmeldungen nicht einordnen zu können." },
                    { value: "neutral", label: "Zeigt wenig Reaktion", text: "{name} zeigt auf Lob wenig sichtbare Reaktion, was auf ein geringes Selbstwertgefühl hindeuten könnte." },
                    { value: "freut", label: "Freut sich angemessen", text: "{name} freut sich über Lob und positive Rückmeldungen und zeigt angemessene Reaktionen." },
                    { value: "motiviert", label: "Wird durch Lob motiviert", text: "{name} wird durch Lob sichtbar motiviert und gestärkt." }
                ]
            },
            {
                id: "v_kritik",
                frage: "Wie reagiert das Kind auf Kritik oder Korrekturen?",
                typ: "single",
                optionen: [
                    { value: "eskalation", label: "Führt oft zu Eskalation", text: "Kritik und Korrekturen führen bei {name} häufig zu emotionalen Eskalationen oder starkem Rückzug." },
                    { value: "empfindlich", label: "Sehr empfindlich", text: "{name} reagiert sehr empfindlich auf Kritik und benötigt besonders einfühlsame Rückmeldungen." },
                    { value: "schwierig", label: "Fällt schwer, kann es aber annehmen", text: "Es fällt {name} schwer, Kritik anzunehmen, mit entsprechender Unterstützung gelingt dies jedoch." },
                    { value: "angemessen", label: "Nimmt Kritik angemessen an", text: "{name} kann konstruktive Kritik in der Regel angemessen annehmen." },
                    { value: "konstruktiv", label: "Nutzt Kritik konstruktiv", text: "{name} kann Kritik konstruktiv aufnehmen und zur Verbesserung nutzen." }
                ]
            }
        ]
    },

    // ========================================
    // ABSCHNITT 3: KOMMUNIKATION
    // ========================================
    kommunikation: {
        titel: "Bereich Kommunikation",
        untertitel: "Sprachverständnis, Ausdrucksfähigkeit, Gesprächsverhalten",
        fragen: [
            {
                id: "k_sprachverstaendnis",
                frage: "Wie ist das Sprachverständnis entwickelt?",
                typ: "skala",
                skala: ["stark beeinträchtigt", "beeinträchtigt", "leicht verzögert", "altersgemäß", "überdurchschnittlich"],
                texte: {
                    0: "Das Sprachverständnis ist stark beeinträchtigt. {name} versteht nur einfache, direkte Anweisungen und benötigt zusätzliche visuelle oder gestische Unterstützung.",
                    1: "Das Sprachverständnis ist beeinträchtigt. {name} hat Schwierigkeiten mit komplexeren Anweisungen und abstrakten sprachlichen Inhalten.",
                    2: "Das Sprachverständnis ist leicht verzögert. {name} versteht alltägliche Kommunikation gut, zeigt aber bei komplexeren sprachlichen Anforderungen Unsicherheiten.",
                    3: "{name} verfügt über ein altersgemäß entwickeltes Sprachverständnis.",
                    4: "{name} zeigt ein überdurchschnittlich gutes Sprachverständnis und erfasst auch komplexe sprachliche Zusammenhänge."
                }
            },
            {
                id: "k_wortschatz",
                frage: "Wie ist der aktive Wortschatz?",
                typ: "skala",
                skala: ["stark eingeschränkt", "eingeschränkt", "leicht eingeschränkt", "altersgemäß", "überdurchschnittlich"],
                texte: {
                    0: "Der aktive Wortschatz ist stark eingeschränkt. {name} kann sich nur mit wenigen Wörtern ausdrücken.",
                    1: "Der aktive Wortschatz ist eingeschränkt. {name} hat Schwierigkeiten, Gedanken und Bedürfnisse differenziert auszudrücken.",
                    2: "Der aktive Wortschatz ist leicht eingeschränkt. {name} kann sich im Alltag verständigen, zeigt aber bei spezifischen Themen Wortfindungsschwierigkeiten.",
                    3: "{name} verfügt über einen altersgemäß entwickelten Wortschatz.",
                    4: "{name} verfügt über einen überdurchschnittlich differenzierten Wortschatz."
                }
            },
            {
                id: "k_ausdruck",
                frage: "Wie gut kann das Kind sich verbal ausdrücken?",
                typ: "single",
                optionen: [
                    { value: "kaum", label: "Kann sich kaum verbal ausdrücken", text: "{name} kann sich kaum verbal ausdrücken und nutzt überwiegend nonverbale Kommunikation oder zeigt Verhaltensweisen statt zu sprechen." },
                    { value: "eingeschraenkt", label: "Stark eingeschränkt", text: "Die verbale Ausdrucksfähigkeit ist stark eingeschränkt. {name} spricht in kurzen Sätzen oder Einwortsätzen." },
                    { value: "einfach", label: "Einfache Sätze", text: "{name} kann sich in einfachen Sätzen ausdrücken, zeigt aber Schwierigkeiten bei komplexeren Äußerungen." },
                    { value: "angemessen", label: "Altersgemäß", text: "{name} kann sich altersgemäß verbal ausdrücken." },
                    { value: "differenziert", label: "Sehr differenziert", text: "{name} drückt sich sehr differenziert und gewandt aus." }
                ]
            },
            {
                id: "k_gespraech",
                frage: "Wie ist das Gesprächsverhalten?",
                typ: "multi",
                optionen: [
                    { value: "blickkontakt", label: "Vermeidet Blickkontakt", text: "{name} vermeidet häufig den Blickkontakt im Gespräch." },
                    { value: "unterbricht", label: "Unterbricht häufig", text: "{name} unterbricht Gesprächspartner häufig und hat Schwierigkeiten abzuwarten." },
                    { value: "thema_wechsel", label: "Wechselt abrupt das Thema", text: "{name} wechselt im Gespräch häufig abrupt das Thema." },
                    { value: "zuhoeren", label: "Hört nicht bis zum Ende zu", text: "{name} hat Schwierigkeiten, Gesprächspartnern bis zum Ende zuzuhören." },
                    { value: "monolog", label: "Führt Monologe", text: "{name} neigt zu monologischem Sprechen ohne auf den Gesprächspartner einzugehen." },
                    { value: "angemessen", label: "Führt angemessene Gespräche", text: "{name} kann altersgemäße Gespräche führen und beachtet Gesprächsregeln." },
                    { value: "zurueckhaltend", label: "Sehr zurückhaltend", text: "{name} ist im Gespräch sehr zurückhaltend und spricht wenig von sich aus." }
                ]
            },
            {
                id: "k_beduerfnisse",
                frage: "Kann das Kind Bedürfnisse und Gefühle verbal äußern?",
                typ: "single",
                optionen: [
                    { value: "nicht", label: "Kann Bedürfnisse nicht verbal äußern", text: "{name} kann Bedürfnisse und Gefühle nicht verbal äußern und zeigt diese stattdessen durch Verhalten." },
                    { value: "selten", label: "Nur selten und mit Unterstützung", text: "{name} kann Bedürfnisse und Gefühle nur selten und mit Unterstützung verbal äußern." },
                    { value: "basale", label: "Nur basale Bedürfnisse", text: "{name} kann basale Bedürfnisse (Hunger, Durst, Toilette) äußern, hat aber Schwierigkeiten mit komplexeren Gefühlen." },
                    { value: "meistens", label: "Meistens möglich", text: "{name} kann Bedürfnisse und Gefühle meistens angemessen verbal äußern." },
                    { value: "differenziert", label: "Differenziert möglich", text: "{name} kann Bedürfnisse und Gefühle differenziert und angemessen verbal ausdrücken." }
                ]
            },
            {
                id: "k_nonverbal",
                frage: "Wie ist das Verständnis nonverbaler Kommunikation?",
                typ: "single",
                optionen: [
                    { value: "nicht", label: "Erkennt nonverbale Signale nicht", text: "{name} hat erhebliche Schwierigkeiten, nonverbale Kommunikationssignale wie Mimik und Gestik zu erkennen und zu interpretieren." },
                    { value: "teilweise", label: "Erkennt nur offensichtliche Signale", text: "{name} erkennt nur sehr offensichtliche nonverbale Signale und übersieht subtilere Hinweise." },
                    { value: "meistens", label: "Erkennt die meisten Signale", text: "{name} erkennt die meisten nonverbalen Signale, zeigt aber gelegentlich Fehlinterpretationen." },
                    { value: "gut", label: "Gutes Verständnis", text: "{name} verfügt über ein gutes Verständnis nonverbaler Kommunikation." },
                    { value: "sehr_gut", label: "Sehr gutes Verständnis", text: "{name} zeigt ein sehr gutes Verständnis für nonverbale Kommunikation und reagiert feinfühlig darauf." }
                ]
            }
        ]
    },

    // ========================================
    // ABSCHNITT 4: SOZIALISATION
    // ========================================
    sozialisation: {
        titel: "Bereich Sozialisation",
        untertitel: "Kontaktverhalten, Kooperation, soziale Beziehungen",
        fragen: [
            {
                id: "s_kontakt_peers",
                frage: "Wie gestaltet sich der Kontakt zu Gleichaltrigen?",
                typ: "single",
                optionen: [
                    { value: "meidet", label: "Meidet Kontakt zu Peers", text: "{name} meidet den Kontakt zu Gleichaltrigen und zieht sich zurück." },
                    { value: "schwierig", label: "Kontaktaufnahme fällt sehr schwer", text: "{name} zeigt erhebliche Schwierigkeiten bei der Kontaktaufnahme zu Gleichaltrigen." },
                    { value: "passiv", label: "Nimmt Kontakt nur passiv auf", text: "{name} nimmt Kontakt zu Gleichaltrigen nur passiv auf und ergreift selten selbst die Initiative." },
                    { value: "wechselnd", label: "Wechselhaft", text: "{name} zeigt wechselhaftes Kontaktverhalten zu Gleichaltrigen." },
                    { value: "aktiv", label: "Sucht aktiv Kontakt", text: "{name} sucht aktiv den Kontakt zu Gleichaltrigen." },
                    { value: "unangemessen", label: "Kontaktaufnahme unangemessen", text: "{name} sucht Kontakt zu Gleichaltrigen, die Art der Kontaktaufnahme ist jedoch häufig unangemessen." }
                ]
            },
            {
                id: "s_kontakt_erwachsene",
                frage: "Wie gestaltet sich der Kontakt zu Erwachsenen/Bezugspersonen?",
                typ: "single",
                optionen: [
                    { value: "misstrauisch", label: "Misstrauisch, ablehnend", text: "{name} zeigt sich gegenüber Erwachsenen misstrauisch und ablehnend." },
                    { value: "distanzlos", label: "Distanzlos", text: "{name} zeigt distanzloses Verhalten gegenüber Erwachsenen und unterscheidet nicht zwischen bekannten und fremden Personen." },
                    { value: "abhaengig", label: "Stark abhängig", text: "{name} zeigt eine starke Abhängigkeit von Bezugspersonen und benötigt ständige Nähe und Rückversicherung." },
                    { value: "selektiv", label: "Nur zu ausgewählten Personen", text: "{name} baut nur zu ausgewählten Bezugspersonen eine Beziehung auf." },
                    { value: "angemessen", label: "Angemessener Kontakt", text: "{name} gestaltet den Kontakt zu Erwachsenen altersgemäß und angemessen." },
                    { value: "vertrauensvoll", label: "Vertrauensvolle Beziehungen", text: "{name} baut vertrauensvolle Beziehungen zu Bezugspersonen auf und kann sich auf diese einlassen." }
                ]
            },
            {
                id: "s_kooperation",
                frage: "Wie ist die Kooperationsfähigkeit?",
                typ: "skala",
                skala: ["stark beeinträchtigt", "beeinträchtigt", "eingeschränkt", "altersgemäß", "besondere Stärke"],
                texte: {
                    0: "Die Kooperationsfähigkeit ist stark beeinträchtigt. {name} kann sich kaum auf gemeinsame Aktivitäten oder Partnerarbeit einlassen.",
                    1: "Die Kooperationsfähigkeit ist beeinträchtigt. {name} zeigt Schwierigkeiten beim Teilen, Abwarten und Berücksichtigen anderer.",
                    2: "Die Kooperationsfähigkeit ist eingeschränkt. {name} kann mit intensiver Anleitung kooperieren, zeigt aber noch Entwicklungsbedarf.",
                    3: "{name} verfügt über eine altersgemäß entwickelte Kooperationsfähigkeit.",
                    4: "{name} zeigt ausgeprägte kooperative Fähigkeiten und arbeitet gerne mit anderen zusammen."
                }
            },
            {
                id: "s_empathie",
                frage: "Wie ist die Empathiefähigkeit entwickelt?",
                typ: "skala",
                skala: ["kaum vorhanden", "gering", "in Ansätzen", "altersgemäß", "besondere Stärke"],
                texte: {
                    0: "Empathiefähigkeit ist kaum erkennbar. {name} zeigt wenig Bewusstsein für die Gefühle und Bedürfnisse anderer.",
                    1: "Die Empathiefähigkeit ist gering ausgeprägt. {name} hat Schwierigkeiten, sich in andere hineinzuversetzen.",
                    2: "Empathie ist in Ansätzen erkennbar. {name} zeigt in manchen Situationen Mitgefühl, kann dies aber nicht konsistent zeigen.",
                    3: "{name} zeigt eine altersgemäß entwickelte Empathiefähigkeit.",
                    4: "{name} zeigt eine besonders ausgeprägte Empathiefähigkeit und reagiert sensibel auf die Gefühle anderer."
                }
            },
            {
                id: "s_konflikte",
                frage: "Wie geht das Kind mit Konflikten um?",
                typ: "single",
                optionen: [
                    { value: "aggressiv", label: "Reagiert aggressiv", text: "{name} reagiert auf Konflikte häufig mit verbaler oder körperlicher Aggression." },
                    { value: "rueckzug", label: "Zieht sich zurück", text: "{name} zieht sich bei Konflikten zurück und vermeidet die Auseinandersetzung." },
                    { value: "hilfe", label: "Benötigt immer Hilfe", text: "{name} kann Konflikte nicht selbstständig lösen und benötigt immer Unterstützung durch Erwachsene." },
                    { value: "verbal_lernt", label: "Lernt verbale Strategien", text: "{name} lernt zunehmend, Konflikte verbal zu lösen, benötigt aber noch Unterstützung." },
                    { value: "meistens_verbal", label: "Löst Konflikte meist verbal", text: "{name} kann Konflikte in der Regel verbal und konstruktiv lösen." },
                    { value: "konstruktiv", label: "Löst Konflikte konstruktiv", text: "{name} löst Konflikte selbstständig und konstruktiv und kann dabei auch vermitteln." }
                ]
            },
            {
                id: "s_gruppe",
                frage: "Wie verhält sich das Kind in Gruppensituationen?",
                typ: "multi",
                optionen: [
                    { value: "randposition", label: "Nimmt Randposition ein", text: "{name} nimmt in Gruppensituationen häufig eine Randposition ein." },
                    { value: "dominiert", label: "Versucht zu dominieren", text: "{name} versucht in Gruppen zu dominieren und seine Interessen durchzusetzen." },
                    { value: "stoert", label: "Stört häufig", text: "{name} stört Gruppenaktivitäten häufig durch unangemessenes Verhalten." },
                    { value: "passiv", label: "Verhält sich passiv", text: "{name} verhält sich in Gruppen passiv und beteiligt sich wenig." },
                    { value: "integriert", label: "Gut integriert", text: "{name} ist in der Gruppe gut integriert." },
                    { value: "beliebt", label: "Beliebt bei Peers", text: "{name} ist bei Gleichaltrigen beliebt und gefragt." },
                    { value: "anpassung", label: "Passt sich gut an", text: "{name} kann sich gut an Gruppenregeln und -dynamiken anpassen." }
                ]
            },
            {
                id: "s_freundschaften",
                frage: "Bestehen Freundschaften?",
                typ: "single",
                optionen: [
                    { value: "keine", label: "Keine Freundschaften", text: "{name} hat keine Freundschaften zu Gleichaltrigen." },
                    { value: "oberflaechlich", label: "Nur oberflächliche Kontakte", text: "{name} hat nur oberflächliche Kontakte, aber keine tieferen Freundschaften." },
                    { value: "instabil", label: "Instabile Freundschaften", text: "{name} hat Freundschaften, diese sind jedoch instabil und von häufigen Konflikten geprägt." },
                    { value: "einzelne", label: "Einzelne Freundschaften", text: "{name} hat einzelne Freundschaften, die gepflegt werden." },
                    { value: "stabil", label: "Stabile Freundschaften", text: "{name} hat stabile Freundschaften und pflegt diese aktiv." }
                ]
            }
        ]
    },

    // ========================================
    // ABSCHNITT 5: KOGNITION
    // ========================================
    kognition: {
        titel: "Bereich Kognition",
        untertitel: "Aufmerksamkeit, Lernen, kognitive Fähigkeiten",
        fragen: [
            {
                id: "c_aufmerksamkeit",
                frage: "Wie ist die Aufmerksamkeitsfähigkeit?",
                typ: "skala",
                skala: ["stark beeinträchtigt", "beeinträchtigt", "eingeschränkt", "altersgemäß", "besondere Stärke"],
                texte: {
                    0: "Die Aufmerksamkeit ist stark beeinträchtigt. {name} kann sich nur für sehr kurze Zeit auf eine Sache konzentrieren.",
                    1: "Die Aufmerksamkeitsfähigkeit ist beeinträchtigt. {name} ist leicht ablenkbar und hat Schwierigkeiten, bei einer Aufgabe zu bleiben.",
                    2: "Die Aufmerksamkeit ist eingeschränkt. {name} kann sich bei hohem Interesse konzentrieren, zeigt aber bei geringerer Motivation Aufmerksamkeitsprobleme.",
                    3: "{name} verfügt über eine altersgemäß entwickelte Aufmerksamkeitsfähigkeit.",
                    4: "{name} kann sich sehr gut und ausdauernd konzentrieren."
                }
            },
            {
                id: "c_arbeitstempo",
                frage: "Wie ist das Arbeitstempo?",
                typ: "single",
                optionen: [
                    { value: "sehr_langsam", label: "Sehr langsam", text: "{name} arbeitet sehr langsam und benötigt deutlich mehr Zeit als Gleichaltrige." },
                    { value: "langsam", label: "Langsam", text: "{name} arbeitet in einem langsamen Tempo." },
                    { value: "durchschnitt", label: "Durchschnittlich", text: "{name} arbeitet in einem altersgemäßen Tempo." },
                    { value: "schnell", label: "Schnell", text: "{name} arbeitet in einem zügigen Tempo." },
                    { value: "flüchtig", label: "Schnell aber flüchtig", text: "{name} arbeitet schnell, aber häufig flüchtig und macht dabei Fehler." }
                ]
            },
            {
                id: "c_anweisungen",
                frage: "Wie werden Anweisungen und Arbeitsaufträge umgesetzt?",
                typ: "single",
                optionen: [
                    { value: "nicht", label: "Setzt Anweisungen nicht um", text: "{name} setzt Anweisungen und Arbeitsaufträge nicht oder kaum um." },
                    { value: "einzeln", label: "Nur Einzelanweisungen", text: "{name} kann nur einzelne, direkte Anweisungen umsetzen und benötigt Schritt-für-Schritt-Anleitungen." },
                    { value: "erinnerung", label: "Mit häufiger Erinnerung", text: "{name} setzt Anweisungen mit häufiger Erinnerung und Unterstützung um." },
                    { value: "meistens", label: "Meistens selbstständig", text: "{name} setzt Anweisungen meistens selbstständig um." },
                    { value: "zuverlaessig", label: "Zuverlässig und selbstständig", text: "{name} setzt Anweisungen zuverlässig und selbstständig um." }
                ]
            },
            {
                id: "c_problemloesen",
                frage: "Wie ist die Problemlösefähigkeit?",
                typ: "single",
                optionen: [
                    { value: "keine", label: "Findet keine Lösungsstrategien", text: "{name} findet bei Problemen keine eigenen Lösungsstrategien und gibt schnell auf." },
                    { value: "hilfe", label: "Nur mit viel Hilfe", text: "{name} kann Probleme nur mit intensiver Unterstützung lösen." },
                    { value: "trial", label: "Durch Versuch und Irrtum", text: "{name} löst Probleme überwiegend durch Versuch und Irrtum, weniger durch systematisches Vorgehen." },
                    { value: "angeleitet", label: "Mit Anleitung systematisch", text: "{name} kann mit Anleitung systematisch an Probleme herangehen." },
                    { value: "selbststaendig", label: "Findet selbstständig Lösungen", text: "{name} findet selbstständig Lösungsstrategien und kann diese anwenden." }
                ]
            },
            {
                id: "c_transfer",
                frage: "Kann Gelerntes auf neue Situationen übertragen werden?",
                typ: "single",
                optionen: [
                    { value: "nicht", label: "Kein Transfer möglich", text: "{name} kann Gelerntes nicht auf neue Situationen übertragen." },
                    { value: "schwer", label: "Sehr schwer", text: "{name} zeigt erhebliche Schwierigkeiten beim Transfer von Gelerntem auf neue Situationen." },
                    { value: "aehnlich", label: "Nur bei sehr ähnlichen Situationen", text: "{name} kann Gelerntes nur bei sehr ähnlichen Situationen übertragen." },
                    { value: "meistens", label: "Gelingt meistens", text: "{name} kann Gelerntes meistens auf neue Situationen übertragen." },
                    { value: "gut", label: "Guter Transfer", text: "{name} zeigt gute Transferleistungen und kann Gelerntes flexibel anwenden." }
                ]
            },
            {
                id: "c_schulleistung",
                frage: "Wie sind die schulischen Leistungen insgesamt?",
                typ: "single",
                optionen: [
                    { value: "weit_unter", label: "Weit unter Klassenniveau", text: "Die schulischen Leistungen liegen weit unter dem Klassenniveau." },
                    { value: "unter", label: "Unter Klassenniveau", text: "Die schulischen Leistungen liegen unter dem Klassenniveau." },
                    { value: "heterogen", label: "Heterogen/Ungleichmäßig", text: "Die schulischen Leistungen sind heterogen - in manchen Bereichen besser als in anderen." },
                    { value: "entspricht", label: "Entspricht dem Klassenniveau", text: "Die schulischen Leistungen entsprechen dem Klassenniveau." },
                    { value: "ueber", label: "Über Klassenniveau", text: "Die schulischen Leistungen liegen über dem Klassenniveau." }
                ]
            },
            {
                id: "c_lernbereitschaft",
                frage: "Wie ist die Lernbereitschaft und Motivation?",
                typ: "skala",
                skala: ["stark beeinträchtigt", "beeinträchtigt", "schwankend", "altersgemäß", "besondere Stärke"],
                texte: {
                    0: "Die Lernbereitschaft ist stark beeinträchtigt. {name} zeigt kaum Interesse am Lernen und verweigert häufig die Mitarbeit.",
                    1: "Die Lernbereitschaft ist beeinträchtigt. {name} zeigt wenig intrinsische Motivation und benötigt viel externe Anreize.",
                    2: "Die Lernbereitschaft ist schwankend. {name} zeigt je nach Thema und Tagesform unterschiedliche Motivation.",
                    3: "{name} zeigt eine altersgemäße Lernbereitschaft und Motivation.",
                    4: "{name} zeigt eine hohe Lernbereitschaft und Wissbegier."
                }
            }
        ]
    },

    // ========================================
    // ABSCHNITT 6: RESSOURCEN
    // ========================================
    ressourcen: {
        titel: "Ressourcen und Stärken",
        untertitel: "Was kann das Kind besonders gut?",
        fragen: [
            {
                id: "r_interessen",
                frage: "Welche besonderen Interessen zeigt das Kind?",
                typ: "multi",
                optionen: [
                    { value: "sport", label: "Sport und Bewegung", text: "{name} zeigt besonderes Interesse an Sport und Bewegung." },
                    { value: "musik", label: "Musik", text: "{name} zeigt besonderes Interesse an Musik." },
                    { value: "kunst", label: "Kunst und Kreatives", text: "{name} zeigt besonderes Interesse an künstlerischen und kreativen Tätigkeiten." },
                    { value: "natur", label: "Natur und Tiere", text: "{name} zeigt besonderes Interesse an Natur und Tieren." },
                    { value: "technik", label: "Technik und Computer", text: "{name} zeigt besonderes Interesse an Technik und digitalen Medien." },
                    { value: "lesen", label: "Lesen und Geschichten", text: "{name} zeigt besonderes Interesse am Lesen und an Geschichten." },
                    { value: "bauen", label: "Bauen und Konstruieren", text: "{name} zeigt besonderes Interesse am Bauen und Konstruieren." },
                    { value: "sozial", label: "Helfen und für andere sorgen", text: "{name} zeigt besonderes Interesse daran, anderen zu helfen." }
                ]
            },
            {
                id: "r_staerken",
                frage: "Welche besonderen Stärken zeigt das Kind?",
                typ: "multi",
                optionen: [
                    { value: "hilfsbereit", label: "Hilfsbereitschaft", text: "Hilfsbereitschaft" },
                    { value: "kreativ", label: "Kreativität", text: "Kreativität" },
                    { value: "humor", label: "Humor", text: "Sinn für Humor" },
                    { value: "neugier", label: "Neugierde", text: "Neugierde und Wissbegier" },
                    { value: "ausdauer_pos", label: "Ausdauer bei Interessensgebieten", text: "Ausdauer bei interessanten Themen" },
                    { value: "ehrlich", label: "Ehrlichkeit", text: "Ehrlichkeit" },
                    { value: "sensibel", label: "Sensibilität", text: "Sensibilität" },
                    { value: "motorik", label: "Motorische Geschicklichkeit", text: "Motorische Geschicklichkeit" },
                    { value: "gedaechtnis", label: "Gutes Gedächtnis", text: "Gutes Gedächtnis" },
                    { value: "logik", label: "Logisches Denken", text: "Logisches Denken" }
                ]
            },
            {
                id: "r_beziehung",
                frage: "Worauf spricht das Kind besonders positiv an?",
                typ: "multi",
                optionen: [
                    { value: "lob", label: "Lob und Anerkennung", text: "Lob und Anerkennung" },
                    { value: "einzeln", label: "Einzelzuwendung", text: "Individuelle Zuwendung und Aufmerksamkeit" },
                    { value: "struktur", label: "Klare Strukturen", text: "Klare Strukturen und Routinen" },
                    { value: "bewegung", label: "Bewegungspausen", text: "Bewegungspausen und körperliche Aktivität" },
                    { value: "auswahl", label: "Wahlmöglichkeiten", text: "Wahlmöglichkeiten und Mitbestimmung" },
                    { value: "belohnung", label: "Konkrete Belohnungen", text: "Konkrete Belohnungssysteme" },
                    { value: "ruhe", label: "Ruhige Umgebung", text: "Ruhige, reizarme Umgebung" },
                    { value: "vorwarnung", label: "Vorankündigungen", text: "Vorankündigungen bei Veränderungen" }
                ]
            }
        ]
    },

    // ========================================
    // ABSCHNITT 7: EMPFEHLUNGEN
    // ========================================
    empfehlungen: {
        titel: "Förderempfehlungen",
        untertitel: "Welche Unterstützung ist sinnvoll?",
        fragen: [
            {
                id: "e_setting",
                frage: "Welches schulische Setting wird empfohlen?",
                typ: "single",
                optionen: [
                    { value: "regelschule", label: "Regelschule ohne besondere Maßnahmen", text: "Eine Beschulung in der Regelschule ohne besondere Maßnahmen erscheint möglich." },
                    { value: "regelschule_plus", label: "Regelschule mit Unterstützung", text: "Eine Beschulung in der Regelschule mit zusätzlicher Unterstützung wird empfohlen." },
                    { value: "kooperation", label: "Kooperative Beschulung", text: "Eine kooperative Beschulung mit Unterstützung durch spezialisierte Fachkräfte wird empfohlen." },
                    { value: "foerderschule", label: "Spezialisierte Förderung", text: "Eine Beschulung mit spezialisierter Förderung im Bereich der sozial-emotionalen Entwicklung wird empfohlen." }
                ]
            },
            {
                id: "e_massnahmen",
                frage: "Welche Fördermaßnahmen werden empfohlen?",
                typ: "multi",
                optionen: [
                    { value: "einzelfoerderung", label: "Einzelförderung", text: "Regelmäßige Einzelförderung zur individuellen Unterstützung" },
                    { value: "kleingruppe", label: "Kleingruppenförderung", text: "Förderung in der Kleingruppe zum Training sozialer Kompetenzen" },
                    { value: "nachteilsausgleich", label: "Nachteilsausgleich", text: "Nachteilsausgleich bei Leistungserhebungen" },
                    { value: "strukturhilfen", label: "Strukturhilfen", text: "Strukturhilfen wie Tagespläne, Timer, visuelle Unterstützung" },
                    { value: "rueckzug", label: "Rückzugsmöglichkeiten", text: "Rückzugsmöglichkeiten bei Überforderung" },
                    { value: "bewegung", label: "Bewegungsangebote", text: "Regelmäßige Bewegungsangebote und -pausen" },
                    { value: "sozialtraining", label: "Soziales Kompetenztraining", text: "Teilnahme an sozialem Kompetenztraining" },
                    { value: "therapie", label: "Therapeutische Begleitung", text: "Therapeutische Begleitung (Psychotherapie, Ergotherapie, Logopädie)" }
                ]
            },
            {
                id: "e_elternarbeit",
                frage: "Welche Empfehlungen gibt es für die Elternarbeit?",
                typ: "multi",
                optionen: [
                    { value: "regelmaessig", label: "Regelmäßiger Austausch", text: "Regelmäßiger Austausch zwischen Schule und Elternhaus" },
                    { value: "erziehungsberatung", label: "Erziehungsberatung", text: "Inanspruchnahme von Erziehungsberatung" },
                    { value: "elterntraining", label: "Elterntraining", text: "Teilnahme an einem Elterntraining" },
                    { value: "strukturen", label: "Strukturen zu Hause", text: "Etablierung klarer Strukturen und Routinen im häuslichen Umfeld" },
                    { value: "konsequenz", label: "Einheitliche Konsequenz", text: "Abstimmung einheitlicher Regeln und Konsequenzen zwischen Schule und Elternhaus" }
                ]
            }
        ]
    }
};

// ========================================
// FRAGEBOGEN RENDERING
// ========================================

function renderFragebogenAbschnitt(abschnittKey) {
    const abschnitt = DIAGNOSTIC_FRAGEBOGEN[abschnittKey];
    if (!abschnitt) return '';

    let html = `
        <div class="fragebogen-abschnitt" data-abschnitt="${abschnittKey}">
            <div class="abschnitt-header" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 20px; border-radius: 10px 10px 0 0;">
                <h3 style="margin: 0;">${abschnitt.titel}</h3>
                <p style="margin: 5px 0 0 0; opacity: 0.9; font-size: 0.9em;">${abschnitt.untertitel}</p>
            </div>
            <div class="abschnitt-content" style="background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px; border: 1px solid #ddd;">
    `;

    for (const frage of abschnitt.fragen) {
        html += renderFrage(abschnittKey, frage);
    }

    html += `
            </div>
        </div>
    `;

    return html;
}

function renderFrage(abschnittKey, frage) {
    const gespeicherteAntwort = fragebogenAntworten[abschnittKey]?.[frage.id];

    let html = `
        <div class="frage-container" style="margin-bottom: 25px; padding-bottom: 20px; border-bottom: 1px solid #e0e0e0;">
            <label class="frage-label" style="display: block; font-weight: 600; margin-bottom: 12px; color: #333; font-size: 1em;">
                ${frage.frage}
            </label>
    `;

    if (frage.typ === 'single') {
        html += `<div class="optionen-single" style="display: flex; flex-direction: column; gap: 8px;">`;
        for (const opt of frage.optionen) {
            const isSelected = gespeicherteAntwort === opt.value;
            html += `
                <label class="option-radio ${isSelected ? 'selected' : ''}" style="display: flex; align-items: flex-start; padding: 12px 15px; background: ${isSelected ? '#e8f4fd' : 'white'}; border: 2px solid ${isSelected ? '#667eea' : '#ddd'}; border-radius: 8px; cursor: pointer; transition: all 0.2s;">
                    <input type="radio" name="${abschnittKey}_${frage.id}" value="${opt.value}" ${isSelected ? 'checked' : ''}
                           onchange="handleFrageAntwort('${abschnittKey}', '${frage.id}', this.value, 'single')"
                           style="margin-right: 12px; margin-top: 2px;">
                    <span style="color: #333;">${opt.label}</span>
                </label>
            `;
        }
        html += `</div>`;
    }
    else if (frage.typ === 'multi') {
        html += `<div class="optionen-multi" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 8px;">`;
        for (const opt of frage.optionen) {
            const isSelected = Array.isArray(gespeicherteAntwort) && gespeicherteAntwort.includes(opt.value);
            html += `
                <label class="option-checkbox ${isSelected ? 'selected' : ''}" style="display: flex; align-items: flex-start; padding: 10px 12px; background: ${isSelected ? '#e8f4fd' : 'white'}; border: 2px solid ${isSelected ? '#667eea' : '#ddd'}; border-radius: 8px; cursor: pointer; transition: all 0.2s;">
                    <input type="checkbox" name="${abschnittKey}_${frage.id}" value="${opt.value}" ${isSelected ? 'checked' : ''}
                           onchange="handleFrageAntwort('${abschnittKey}', '${frage.id}', this.value, 'multi')"
                           style="margin-right: 10px; margin-top: 2px;">
                    <span style="color: #333; font-size: 0.95em;">${opt.label}</span>
                </label>
            `;
        }
        html += `</div>`;
    }
    else if (frage.typ === 'skala') {
        html += `<div class="optionen-skala" style="display: flex; flex-wrap: wrap; gap: 8px; justify-content: space-between;">`;
        for (let i = 0; i < frage.skala.length; i++) {
            const isSelected = gespeicherteAntwort === i.toString();
            html += `
                <label class="option-skala ${isSelected ? 'selected' : ''}" style="flex: 1; min-width: 120px; text-align: center; padding: 12px 8px; background: ${isSelected ? '#667eea' : 'white'}; color: ${isSelected ? 'white' : '#333'}; border: 2px solid ${isSelected ? '#667eea' : '#ddd'}; border-radius: 8px; cursor: pointer; transition: all 0.2s; font-size: 0.85em;">
                    <input type="radio" name="${abschnittKey}_${frage.id}" value="${i}" ${isSelected ? 'checked' : ''}
                           onchange="handleFrageAntwort('${abschnittKey}', '${frage.id}', this.value, 'skala')"
                           style="display: none;">
                    ${frage.skala[i]}
                </label>
            `;
        }
        html += `</div>`;
    }

    html += `</div>`;
    return html;
}

// ========================================
// EVENT HANDLER
// ========================================

function handleFrageAntwort(abschnitt, frageId, value, typ) {
    if (!fragebogenAntworten[abschnitt]) {
        fragebogenAntworten[abschnitt] = {};
    }

    if (typ === 'multi') {
        if (!Array.isArray(fragebogenAntworten[abschnitt][frageId])) {
            fragebogenAntworten[abschnitt][frageId] = [];
        }
        const arr = fragebogenAntworten[abschnitt][frageId];
        const idx = arr.indexOf(value);
        if (idx > -1) {
            arr.splice(idx, 1);
        } else {
            arr.push(value);
        }
    } else {
        fragebogenAntworten[abschnitt][frageId] = value;
    }

    // UI aktualisieren
    updateFrageUI(abschnitt, frageId);

    // Speichern
    saveFragebogenAntworten();

    // Fortschritt aktualisieren
    updateFragebogenFortschritt();
}

function updateFrageUI(abschnitt, frageId) {
    const container = document.querySelector(`[name="${abschnitt}_${frageId}"]`)?.closest('.frage-container');
    if (!container) return;

    // Alle Optionen zurücksetzen
    container.querySelectorAll('label.option-radio, label.option-checkbox, label.option-skala').forEach(label => {
        const input = label.querySelector('input');
        if (input.type === 'radio' || input.type === 'checkbox') {
            if (input.checked) {
                label.classList.add('selected');
                label.style.background = input.type === 'radio' && label.classList.contains('option-skala') ? '#667eea' : '#e8f4fd';
                label.style.borderColor = '#667eea';
                if (label.classList.contains('option-skala')) {
                    label.style.color = 'white';
                }
            } else {
                label.classList.remove('selected');
                label.style.background = 'white';
                label.style.borderColor = '#ddd';
                label.style.color = '#333';
            }
        }
    });
}

function saveFragebogenAntworten() {
    localStorage.setItem('eldib-fragebogen', JSON.stringify(fragebogenAntworten));
}

function loadFragebogenAntworten() {
    const saved = localStorage.getItem('eldib-fragebogen');
    if (saved) {
        fragebogenAntworten = JSON.parse(saved);
    }
}

function updateFragebogenFortschritt() {
    let beantwortet = 0;
    let gesamt = 0;

    for (const [abschnittKey, abschnitt] of Object.entries(DIAGNOSTIC_FRAGEBOGEN)) {
        for (const frage of abschnitt.fragen) {
            gesamt++;
            const antwort = fragebogenAntworten[abschnittKey]?.[frage.id];
            if (antwort !== undefined && antwort !== null &&
                (typeof antwort !== 'object' || (Array.isArray(antwort) && antwort.length > 0))) {
                beantwortet++;
            }
        }
    }

    const prozent = gesamt > 0 ? Math.round((beantwortet / gesamt) * 100) : 0;
    const fortschrittEl = document.getElementById('fragebogen-fortschritt');
    if (fortschrittEl) {
        fortschrittEl.innerHTML = `<strong>${beantwortet}/${gesamt}</strong> Fragen beantwortet (${prozent}%)`;
        fortschrittEl.style.background = prozent === 100 ? '#d4edda' : '#fff3cd';
        fortschrittEl.style.borderColor = prozent === 100 ? '#28a745' : '#ffc107';
    }
}

// ========================================
// BERICHT AUS FRAGEBOGEN GENERIEREN
// ========================================

function generateBerichtFromFragebogen() {
    const stammdaten = typeof getStammdaten === 'function' ? getStammdaten() : {};
    const profil = typeof berechneEntwicklungsprofil === 'function' ? berechneEntwicklungsprofil() : {};

    const name = stammdaten.schueler_name || 'Der/Die Schüler/in';
    const vorname = name.split(',')[1]?.trim() || name.split(' ')[0] || 'Das Kind';
    const heute = new Date().toLocaleDateString('de-DE');

    let html = `
        <div style="font-family: 'Times New Roman', serif; line-height: 1.8;">
            <!-- HEADER -->
            <div style="text-align: center; margin-bottom: 30px; border-bottom: 3px solid #1a1a2e; padding-bottom: 20px;">
                <h1 style="color: #1a1a2e; font-size: 1.6em; margin-bottom: 5px;">DIAGNOSTIC SPÉCIALISÉ</h1>
                <h2 style="color: #667eea; font-size: 1.2em; margin-bottom: 10px;">Bericht zur sozial-emotionalen Entwicklung</h2>
                <p style="color: #666; font-style: italic;">Centre de Diagnostic Spécialisé de l'Éducation (CDSE)</p>
            </div>

            <!-- 1. ANGABEN ZUM SCHÜLER -->
            <h2 style="color: #1a1a2e; border-bottom: 2px solid #667eea; padding-bottom: 5px; margin-top: 25px;">1. Angaben zum Schüler</h2>
            <table style="width: 100%; margin: 15px 0; border-collapse: collapse;">
                <tr><td style="padding: 8px; width: 180px; background: #f5f5f5; border: 1px solid #ddd;"><strong>Name:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${stammdaten.schueler_name || '-'}</td></tr>
                <tr><td style="padding: 8px; background: #f5f5f5; border: 1px solid #ddd;"><strong>Geburtsdatum:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${stammdaten.geburtsdatum || '-'}</td></tr>
                <tr><td style="padding: 8px; background: #f5f5f5; border: 1px solid #ddd;"><strong>Matricule:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${stammdaten.matricule || '-'}</td></tr>
                <tr><td style="padding: 8px; background: #f5f5f5; border: 1px solid #ddd;"><strong>Schule:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${stammdaten.foerderort || '-'}</td></tr>
                <tr><td style="padding: 8px; background: #f5f5f5; border: 1px solid #ddd;"><strong>Klasse:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${stammdaten.klasse || '-'}</td></tr>
                <tr><td style="padding: 8px; background: #f5f5f5; border: 1px solid #ddd;"><strong>Schuljahr:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${stammdaten.schuljahr || '-'}</td></tr>
                <tr><td style="padding: 8px; background: #f5f5f5; border: 1px solid #ddd;"><strong>Untersuchungsdatum:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${stammdaten.einschaetzungsdatum || '-'}</td></tr>
                <tr><td style="padding: 8px; background: #f5f5f5; border: 1px solid #ddd;"><strong>Untersucher/in:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${stammdaten.einschaetzende || '-'}</td></tr>
            </table>
    `;

    // 2. ANLASS UND FRAGESTELLUNG
    html += `<h2 style="color: #1a1a2e; border-bottom: 2px solid #667eea; padding-bottom: 5px; margin-top: 25px;">2. Anlass und Fragestellung</h2>`;

    const anlassAntworten = fragebogenAntworten.anlass || {};
    if (anlassAntworten.anlass_grund) {
        const anlassFrage = DIAGNOSTIC_FRAGEBOGEN.anlass.fragen.find(f => f.id === 'anlass_grund');
        const anlassOpt = anlassFrage?.optionen.find(o => o.value === anlassAntworten.anlass_grund);
        if (anlassOpt) {
            html += `<p style="margin: 10px 0;">${anlassOpt.text}</p>`;
        }
    }

    if (Array.isArray(anlassAntworten.anlass_fragestellung) && anlassAntworten.anlass_fragestellung.length > 0) {
        html += `<p style="margin: 10px 0;"><strong>Fragestellungen:</strong></p><ul style="margin: 5px 0 15px 20px;">`;
        const fragestellungFrage = DIAGNOSTIC_FRAGEBOGEN.anlass.fragen.find(f => f.id === 'anlass_fragestellung');
        for (const val of anlassAntworten.anlass_fragestellung) {
            const opt = fragestellungFrage?.optionen.find(o => o.value === val);
            if (opt) html += `<li>${opt.text}</li>`;
        }
        html += `</ul>`;
    }

    // 3. UNTERSUCHUNGSMETHODEN
    html += `
        <h2 style="color: #1a1a2e; border-bottom: 2px solid #667eea; padding-bottom: 5px; margin-top: 25px;">3. Untersuchungsmethoden</h2>
        <ul style="margin: 10px 0 15px 20px;">
            <li>Entwicklungstherapeutischer Lernziel-Diagnose-Bogen (ELDiB)</li>
            <li>Strukturierte Verhaltensbeobachtung im schulischen Kontext</li>
            <li>Gespräche mit Lehrpersonen und pädagogischem Personal</li>
            <li>Analyse schulischer Unterlagen</li>
        </ul>
    `;

    // 4. ERGEBNISSE
    html += `<h2 style="color: #1a1a2e; border-bottom: 2px solid #667eea; padding-bottom: 5px; margin-top: 25px;">4. Ergebnisse der Einschätzung</h2>`;

    // Bereiche durchgehen
    const bereichConfig = [
        { key: 'verhalten', titel: 'Verhalten', farbe: '#e74c3c' },
        { key: 'kommunikation', titel: 'Kommunikation', farbe: '#3498db' },
        { key: 'sozialisation', titel: 'Sozialisation', farbe: '#2ecc71' },
        { key: 'kognition', titel: 'Kognition', farbe: '#f39c12' }
    ];

    for (const bereich of bereichConfig) {
        const antworten = fragebogenAntworten[bereich.key] || {};
        const abschnitt = DIAGNOSTIC_FRAGEBOGEN[bereich.key];
        const profilData = profil[bereich.key] || {};

        html += `
            <div style="margin: 20px 0; padding: 15px 20px; border-left: 5px solid ${bereich.farbe}; background: linear-gradient(to right, #f9f9f9, white);">
                <h3 style="color: ${bereich.farbe}; margin: 0 0 15px 0;">4.${bereichConfig.indexOf(bereich) + 1} ${bereich.titel}</h3>
        `;

        // ELDiB-Stufe
        if (profilData.hoechsteStufe) {
            html += `<p style="margin: 0 0 10px 0;"><strong>Entwicklungsstufe (ELDiB):</strong> Stufe ${profilData.hoechsteStufe}</p>`;
        }

        // Alle beantworteten Fragen dieses Bereichs
        for (const frage of abschnitt.fragen) {
            const antwort = antworten[frage.id];
            if (antwort === undefined || antwort === null) continue;
            if (Array.isArray(antwort) && antwort.length === 0) continue;

            let text = '';

            if (frage.typ === 'skala') {
                const idx = parseInt(antwort);
                text = frage.texte[idx]?.replace('{name}', vorname) || '';
            }
            else if (frage.typ === 'single') {
                const opt = frage.optionen.find(o => o.value === antwort);
                text = opt?.text?.replace('{name}', vorname) || '';
            }
            else if (frage.typ === 'multi' && Array.isArray(antwort)) {
                const texte = antwort.map(val => {
                    const opt = frage.optionen.find(o => o.value === val);
                    return opt?.text?.replace('{name}', vorname) || '';
                }).filter(t => t);
                if (texte.length > 0) {
                    text = texte.join(' ');
                }
            }

            if (text) {
                html += `<p style="margin: 8px 0;">${text}</p>`;
            }
        }

        // ELDiB-Ziele
        if (profilData.ziele && profilData.ziele.length > 0) {
            html += `<p style="margin: 15px 0 5px 0;"><strong>Entwicklungsziele (ELDiB):</strong></p><ul style="margin: 5px 0 10px 20px;">`;
            for (const ziel of profilData.ziele) {
                html += `<li>${ziel.code} (${ziel.keyword}): "${ziel.zieltext || ziel.description}"</li>`;
            }
            html += `</ul>`;
        }

        html += `</div>`;
    }

    // 5. RESSOURCEN
    const ressourcenAntworten = fragebogenAntworten.ressourcen || {};
    if (Object.keys(ressourcenAntworten).length > 0) {
        html += `<h2 style="color: #1a1a2e; border-bottom: 2px solid #667eea; padding-bottom: 5px; margin-top: 25px;">5. Ressourcen und Stärken</h2>`;

        if (Array.isArray(ressourcenAntworten.r_interessen) && ressourcenAntworten.r_interessen.length > 0) {
            const interessenFrage = DIAGNOSTIC_FRAGEBOGEN.ressourcen.fragen.find(f => f.id === 'r_interessen');
            const interessenTexte = ressourcenAntworten.r_interessen.map(val => {
                const opt = interessenFrage?.optionen.find(o => o.value === val);
                return opt?.text?.replace('{name}', vorname) || '';
            }).filter(t => t);
            html += `<p style="margin: 10px 0;"><strong>Interessen:</strong> ${interessenTexte.join(' ')}</p>`;
        }

        if (Array.isArray(ressourcenAntworten.r_staerken) && ressourcenAntworten.r_staerken.length > 0) {
            const staerkenFrage = DIAGNOSTIC_FRAGEBOGEN.ressourcen.fragen.find(f => f.id === 'r_staerken');
            const staerkenTexte = ressourcenAntworten.r_staerken.map(val => {
                const opt = staerkenFrage?.optionen.find(o => o.value === val);
                return opt?.text || '';
            }).filter(t => t);
            html += `<p style="margin: 10px 0;"><strong>Stärken:</strong> ${vorname} zeigt folgende Stärken: ${staerkenTexte.join(', ')}.</p>`;
        }

        if (Array.isArray(ressourcenAntworten.r_beziehung) && ressourcenAntworten.r_beziehung.length > 0) {
            const beziehungFrage = DIAGNOSTIC_FRAGEBOGEN.ressourcen.fragen.find(f => f.id === 'r_beziehung');
            const beziehungTexte = ressourcenAntworten.r_beziehung.map(val => {
                const opt = beziehungFrage?.optionen.find(o => o.value === val);
                return opt?.text || '';
            }).filter(t => t);
            html += `<p style="margin: 10px 0;"><strong>Positive Ansatzpunkte:</strong> ${vorname} spricht besonders positiv an auf: ${beziehungTexte.join(', ')}.</p>`;
        }
    }

    // 6. EMPFEHLUNGEN
    const empfehlungenAntworten = fragebogenAntworten.empfehlungen || {};
    html += `<h2 style="color: #1a1a2e; border-bottom: 2px solid #667eea; padding-bottom: 5px; margin-top: 25px;">6. Förderempfehlungen</h2>`;

    if (empfehlungenAntworten.e_setting) {
        const settingFrage = DIAGNOSTIC_FRAGEBOGEN.empfehlungen.fragen.find(f => f.id === 'e_setting');
        const settingOpt = settingFrage?.optionen.find(o => o.value === empfehlungenAntworten.e_setting);
        if (settingOpt) {
            html += `<p style="margin: 10px 0;"><strong>Schulisches Setting:</strong> ${settingOpt.text}</p>`;
        }
    }

    if (Array.isArray(empfehlungenAntworten.e_massnahmen) && empfehlungenAntworten.e_massnahmen.length > 0) {
        html += `<p style="margin: 15px 0 5px 0;"><strong>Empfohlene Fördermaßnahmen:</strong></p><ul style="margin: 5px 0 15px 20px;">`;
        const massnahmenFrage = DIAGNOSTIC_FRAGEBOGEN.empfehlungen.fragen.find(f => f.id === 'e_massnahmen');
        for (const val of empfehlungenAntworten.e_massnahmen) {
            const opt = massnahmenFrage?.optionen.find(o => o.value === val);
            if (opt) html += `<li>${opt.text}</li>`;
        }
        html += `</ul>`;
    }

    if (Array.isArray(empfehlungenAntworten.e_elternarbeit) && empfehlungenAntworten.e_elternarbeit.length > 0) {
        html += `<p style="margin: 15px 0 5px 0;"><strong>Empfehlungen für die Elternarbeit:</strong></p><ul style="margin: 5px 0 15px 20px;">`;
        const elternFrage = DIAGNOSTIC_FRAGEBOGEN.empfehlungen.fragen.find(f => f.id === 'e_elternarbeit');
        for (const val of empfehlungenAntworten.e_elternarbeit) {
            const opt = elternFrage?.optionen.find(o => o.value === val);
            if (opt) html += `<li>${opt.text}</li>`;
        }
        html += `</ul>`;
    }

    // UNTERSCHRIFT
    html += `
        <div style="margin-top: 60px; page-break-inside: avoid;">
            <p>Luxemburg, den ${heute}</p>
            <div style="margin-top: 50px; display: flex; justify-content: flex-end;">
                <div style="text-align: center;">
                    <div style="border-top: 1px solid #333; width: 250px; padding-top: 5px;">
                        ${stammdaten.einschaetzende || 'Unterschrift'}
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;

    return html;
}

// ========================================
// EXPORT FUNKTIONEN
// ========================================

function showFragebogenVorschau() {
    const html = generateBerichtFromFragebogen();
    const vorschauEl = document.getElementById('bericht-vorschau');
    if (vorschauEl) {
        vorschauEl.innerHTML = html;
    }
}

function downloadFragebogenBericht() {
    const stammdaten = typeof getStammdaten === 'function' ? getStammdaten() : {};
    const reportHTML = generateBerichtFromFragebogen();

    const fullHTML = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Diagnostic Spécialisé - ${stammdaten.schueler_name || 'Bericht'}</title>
    <style>
        body { font-family: 'Times New Roman', serif; margin: 2cm; line-height: 1.8; font-size: 12pt; }
        h1 { font-size: 18pt; }
        h2 { font-size: 14pt; margin-top: 20pt; page-break-after: avoid; }
        h3 { font-size: 12pt; }
        p { margin: 8pt 0; text-align: justify; }
        ul { margin: 5pt 0 15pt 20pt; }
        li { margin-bottom: 3pt; }
        table { border-collapse: collapse; width: 100%; }
        td { padding: 6pt 10pt; }
        @page { margin: 2cm; }
    </style>
</head>
<body>
    ${reportHTML}
</body>
</html>
    `;

    const filename = `Diagnostic_Specialise_${stammdaten.schueler_name || 'Bericht'}_${new Date().toISOString().split('T')[0]}.doc`;

    if (typeof downloadAsWord === 'function') {
        downloadAsWord(fullHTML, filename);
    } else {
        const blob = new Blob(['\ufeff', fullHTML], { type: 'application/msword' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
}

// ========================================
// INITIALISIERUNG
// ========================================

function initFragebogen() {
    loadFragebogenAntworten();

    // Fragebogen-Tabs rendern
    const abschnitte = ['anlass', 'verhalten', 'kommunikation', 'sozialisation', 'kognition', 'ressourcen', 'empfehlungen'];

    for (const key of abschnitte) {
        const container = document.getElementById(`fragebogen-${key}`);
        if (container) {
            container.innerHTML = renderFragebogenAbschnitt(key);
        }
    }

    updateFragebogenFortschritt();
}

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initFragebogen, 300);
});
