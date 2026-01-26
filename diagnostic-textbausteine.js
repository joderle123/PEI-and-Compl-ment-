// ========================================
// DIAGNOSTIC SPÉCIALISÉ - TEXTBAUSTEINE
// Automatisierte Berichtsgenerierung für CDSE
// ========================================

// Textbausteine für automatische Berichtsgenerierung
const DIAGNOSTIC_TEXTBAUSTEINE = {

    // ========================================
    // STUFEN-BESCHREIBUNGEN (automatisch aus ELDiB)
    // ========================================
    stufenBeschreibungen: {
        verhalten: {
            0: "Im Bereich Verhalten konnten noch keine Kompetenzen systematisch erfasst werden.",
            1: "befindet sich im Bereich Verhalten auf der Entwicklungsstufe I (Mit Freude auf die Umwelt reagieren). Er/Sie beginnt, den eigenen körperlichen Fähigkeiten zu vertrauen und reagiert auf sensorische Reize aus der Umgebung.",
            2: "befindet sich im Bereich Verhalten auf der Entwicklungsstufe II (Erfolgreich auf die Umwelt reagieren). Er/Sie kann erfolgreich an Routineabläufen und Aktivitäten teilnehmen.",
            3: "befindet sich im Bereich Verhalten auf der Entwicklungsstufe III (Erwerben von Fähigkeiten zur erfolgreichen Teilnahme in Gruppen). Er/Sie wendet erworbene Fähigkeiten an, um innerhalb einer Gruppe das eigene Verhalten erfolgreich zu steuern.",
            4: "befindet sich im Bereich Verhalten auf der Entwicklungsstufe IV (Sich einbringen in Gruppenprozesse). Er/Sie setzt persönliche Fähigkeiten ein, um zum Gruppenerfolg beizutragen.",
            5: "befindet sich im Bereich Verhalten auf der Entwicklungsstufe V (Anwenden von individuellen und gruppenbezogenen Fähigkeiten in neuen Situationen). Er/Sie begegnet realen Lebenserfahrungen mit konstruktivem Verhalten."
        },
        kommunikation: {
            0: "Im Bereich Kommunikation konnten noch keine Kompetenzen systematisch erfasst werden.",
            1: "befindet sich im Bereich Kommunikation auf der Entwicklungsstufe I. Er/Sie gebraucht Wörter, um Bedürfnisse zu befriedigen.",
            2: "befindet sich im Bereich Kommunikation auf der Entwicklungsstufe II. Er/Sie gebraucht Wörter, um andere in konstruktiver Weise zu beeinflussen.",
            3: "befindet sich im Bereich Kommunikation auf der Entwicklungsstufe III. Er/Sie gebraucht Wörter, um sich auf konstruktive Weise innerhalb einer Gruppe zu äußern.",
            4: "befindet sich im Bereich Kommunikation auf der Entwicklungsstufe IV. Er/Sie verwendet Wörter, um Verständnis von Gefühlen und Verhaltensweisen von sich und anderen zu zeigen.",
            5: "befindet sich im Bereich Kommunikation auf der Entwicklungsstufe V. Er/Sie verwendet Wörter, um Beziehungen auszubauen und zu pflegen."
        },
        sozialisation: {
            0: "Im Bereich Sozialisation konnten noch keine Kompetenzen systematisch erfasst werden.",
            1: "befindet sich im Bereich Sozialisation auf der Entwicklungsstufe I. Er/Sie vertraut einem Erwachsenen genügend, um auf ihn zu reagieren.",
            2: "befindet sich im Bereich Sozialisation auf der Entwicklungsstufe II. Er/Sie beteiligt sich erfolgreich an Aktivitäten.",
            3: "befindet sich im Bereich Sozialisation auf der Entwicklungsstufe III. Er/Sie erlebt Gruppenaktivitäten als befriedigend.",
            4: "befindet sich im Bereich Sozialisation auf der Entwicklungsstufe IV. Er/Sie nimmt von sich aus und erfolgreich als Gruppenmitglied an Aktivitäten teil.",
            5: "befindet sich im Bereich Sozialisation auf der Entwicklungsstufe V. Er/Sie beginnt und pflegt selbstständig dauerhafte und tragfähige Beziehungen mit anderen."
        },
        kognition: {
            0: "Im Bereich Kognition konnten noch keine Kompetenzen systematisch erfasst werden.",
            1: "befindet sich im Bereich Kognition auf der Entwicklungsstufe I. Er/Sie reagiert auf die Umgebung mit gezielten Körperbewegungen und elementaren mentalen Verarbeitungsprozessen.",
            2: "befindet sich im Bereich Kognition auf der Entwicklungsstufe II. Er/Sie beteiligt sich an Aktivitäten, die Fähigkeiten der Selbsthilfe, motorischen Koordination, Sprache sowie mentale Prozesse erfordern.",
            3: "befindet sich im Bereich Kognition auf der Entwicklungsstufe III. Er/Sie beteiligt sich erfolgreich in einer Lerngruppe und setzt dabei grundlegende Lernkompetenzen ein.",
            4: "befindet sich im Bereich Kognition auf der Entwicklungsstufe IV. Er/Sie gebraucht kognitive und schulische Fähigkeiten, um sich erfolgreich an sozialen Gruppenerfahrungen zu beteiligen.",
            5: "befindet sich im Bereich Kognition auf der Entwicklungsstufe V. Er/Sie setzt erfolgreich kognitive Fähigkeiten zur Bereicherung persönlicher Erfahrungen ein."
        }
    },

    // ========================================
    // KLICKBARE BEOBACHTUNGSOPTIONEN
    // ========================================
    beobachtungsOptionen: {
        verhalten: {
            staerken: [
                { id: "v_s1", text: "zeigt eine gute Selbstregulation", detail: "kann eigene Emotionen und Impulse angemessen kontrollieren" },
                { id: "v_s2", text: "hält sich an Regeln und Absprachen", detail: "akzeptiert Grenzen und befolgt Anweisungen" },
                { id: "v_s3", text: "zeigt angemessene Frustrationstoleranz", detail: "kann mit Enttäuschungen und Misserfolgen umgehen" },
                { id: "v_s4", text: "ist motiviert und engagiert", detail: "zeigt Interesse an Aktivitäten und beteiligt sich aktiv" },
                { id: "v_s5", text: "kann Übergänge gut bewältigen", detail: "wechselt ohne größere Schwierigkeiten zwischen Aktivitäten" },
                { id: "v_s6", text: "zeigt Ausdauer bei Aufgaben", detail: "arbeitet konzentriert und bringt Aufgaben zu Ende" },
                { id: "v_s7", text: "reagiert angemessen auf Lob und Kritik", detail: "nimmt Feedback konstruktiv auf" },
                { id: "v_s8", text: "zeigt Verantwortungsbewusstsein", detail: "übernimmt Verantwortung für eigenes Handeln" }
            ],
            schwierigkeiten: [
                { id: "v_d1", text: "zeigt Schwierigkeiten bei der Impulskontrolle", detail: "reagiert impulsiv, handelt ohne nachzudenken" },
                { id: "v_d2", text: "hat Probleme mit der Emotionsregulation", detail: "Gefühlsausbrüche, schnelle Stimmungswechsel" },
                { id: "v_d3", text: "zeigt oppositionelles Verhalten", detail: "verweigert Anweisungen, widersetzt sich Regeln" },
                { id: "v_d4", text: "hat Schwierigkeiten beim Warten", detail: "kann nicht abwarten, unterbricht andere" },
                { id: "v_d5", text: "zeigt geringe Frustrationstoleranz", detail: "gibt schnell auf, reagiert stark auf Misserfolge" },
                { id: "v_d6", text: "hat Probleme bei Übergängen", detail: "Schwierigkeiten beim Wechsel zwischen Aktivitäten" },
                { id: "v_d7", text: "zeigt Aufmerksamkeitsprobleme", detail: "ist leicht ablenkbar, kann sich nicht konzentrieren" },
                { id: "v_d8", text: "zeigt unangemessenes Verhalten in der Gruppe", detail: "stört andere, hält sich nicht an Gruppenregeln" }
            ]
        },
        kommunikation: {
            staerken: [
                { id: "k_s1", text: "verfügt über einen altersangemessenen Wortschatz", detail: "drückt sich differenziert aus" },
                { id: "k_s2", text: "kann sich verständlich ausdrücken", detail: "formuliert klar und zusammenhängend" },
                { id: "k_s3", text: "hört aktiv zu", detail: "zeigt Interesse an Gesprächen, wartet ab" },
                { id: "k_s4", text: "kann Gespräche führen", detail: "wechselt zwischen Sprechen und Zuhören" },
                { id: "k_s5", text: "versteht Anweisungen gut", detail: "setzt verbale Aufforderungen um" },
                { id: "k_s6", text: "kann Bedürfnisse verbal äußern", detail: "teilt Wünsche und Gefühle mit" },
                { id: "k_s7", text: "verwendet angemessene Höflichkeitsformen", detail: "sagt bitte, danke, grüßt" },
                { id: "k_s8", text: "kann von Erlebnissen berichten", detail: "erzählt zusammenhängend" }
            ],
            schwierigkeiten: [
                { id: "k_d1", text: "zeigt einen eingeschränkten Wortschatz", detail: "begrenzte Ausdrucksmöglichkeiten" },
                { id: "k_d2", text: "hat Schwierigkeiten beim Sprachverständnis", detail: "versteht komplexe Anweisungen nicht" },
                { id: "k_d3", text: "zeigt Artikulationsprobleme", detail: "undeutliche Aussprache" },
                { id: "k_d4", text: "spricht wenig oder gar nicht", detail: "selektiver Mutismus, Sprechhemmung" },
                { id: "k_d5", text: "hat Probleme beim Zuhören", detail: "unterbricht, hört nicht bis zum Ende" },
                { id: "k_d6", text: "kann Bedürfnisse nicht verbal äußern", detail: "zeigt stattdessen Verhaltensauffälligkeiten" },
                { id: "k_d7", text: "zeigt Schwierigkeiten im Gesprächsverhalten", detail: "kein Blickkontakt, unangemessene Distanz" },
                { id: "k_d8", text: "versteht nonverbale Kommunikation nicht", detail: "erkennt Mimik und Gestik nicht" }
            ]
        },
        sozialisation: {
            staerken: [
                { id: "s_s1", text: "nimmt gut Kontakt zu Peers auf", detail: "geht offen auf andere zu" },
                { id: "s_s2", text: "kann kooperativ spielen und arbeiten", detail: "teilt, wartet ab, arbeitet zusammen" },
                { id: "s_s3", text: "zeigt empathisches Verhalten", detail: "erkennt Gefühle anderer, zeigt Mitgefühl" },
                { id: "s_s4", text: "hat stabile Freundschaften", detail: "pflegt dauerhafte Beziehungen" },
                { id: "s_s5", text: "kann Konflikte angemessen lösen", detail: "sucht verbale Lösungen" },
                { id: "s_s6", text: "ist in der Gruppe integriert", detail: "wird von anderen akzeptiert" },
                { id: "s_s7", text: "zeigt Hilfsbereitschaft", detail: "unterstützt andere Kinder" },
                { id: "s_s8", text: "kann sich in Gruppen einordnen", detail: "akzeptiert Gruppenentscheidungen" }
            ],
            schwierigkeiten: [
                { id: "s_d1", text: "zeigt Schwierigkeiten bei der Kontaktaufnahme", detail: "ist zurückgezogen, schüchtern" },
                { id: "s_d2", text: "hat Probleme mit kooperativem Verhalten", detail: "kann nicht teilen, will bestimmen" },
                { id: "s_d3", text: "zeigt wenig Empathie", detail: "erkennt Gefühle anderer nicht" },
                { id: "s_d4", text: "hat keine stabilen Freundschaften", detail: "häufige Konflikte, Isolation" },
                { id: "s_d5", text: "löst Konflikte unangemessen", detail: "aggressive Reaktionen, Rückzug" },
                { id: "s_d6", text: "ist in der Gruppe isoliert", detail: "wird ausgegrenzt oder grenzt sich ab" },
                { id: "s_d7", text: "zeigt Dominanzverhalten", detail: "will immer bestimmen, akzeptiert keine anderen Meinungen" },
                { id: "s_d8", text: "hat Schwierigkeiten mit Erwachsenen", detail: "Misstrauen, Distanzlosigkeit" }
            ]
        },
        kognition: {
            staerken: [
                { id: "c_s1", text: "zeigt gute Konzentrationsfähigkeit", detail: "kann sich längere Zeit auf Aufgaben fokussieren" },
                { id: "c_s2", text: "verfügt über ein gutes Arbeitsgedächtnis", detail: "behält Informationen und Anweisungen" },
                { id: "c_s3", text: "kann Probleme selbstständig lösen", detail: "findet eigene Lösungswege" },
                { id: "c_s4", text: "zeigt Lernbereitschaft", detail: "ist neugierig, stellt Fragen" },
                { id: "c_s5", text: "kann Gelerntes übertragen", detail: "wendet Wissen in neuen Situationen an" },
                { id: "c_s6", text: "arbeitet selbstständig", detail: "braucht wenig Anleitung" },
                { id: "c_s7", text: "zeigt gutes logisches Denken", detail: "erkennt Zusammenhänge" },
                { id: "c_s8", text: "verfügt über gute schulische Vorläuferfertigkeiten", detail: "Zahlenverständnis, phonologische Bewusstheit" }
            ],
            schwierigkeiten: [
                { id: "c_d1", text: "zeigt Konzentrationsschwierigkeiten", detail: "ist leicht ablenkbar, unaufmerksam" },
                { id: "c_d2", text: "hat Probleme mit dem Arbeitsgedächtnis", detail: "vergisst schnell, kann nicht mehrere Informationen behalten" },
                { id: "c_d3", text: "zeigt Schwierigkeiten beim Problemlösen", detail: "findet keine Lösungsstrategien" },
                { id: "c_d4", text: "hat ein langsames Arbeitstempo", detail: "braucht viel Zeit für Aufgaben" },
                { id: "c_d5", text: "zeigt Schwierigkeiten beim Transfer", detail: "kann Gelerntes nicht anwenden" },
                { id: "c_d6", text: "braucht viel Unterstützung", detail: "arbeitet nicht selbstständig" },
                { id: "c_d7", text: "zeigt Lernrückstände", detail: "Entwicklungsverzögerung im kognitiven Bereich" },
                { id: "c_d8", text: "hat Schwierigkeiten mit schulischen Anforderungen", detail: "Lesen, Schreiben, Rechnen" }
            ]
        }
    },

    // ========================================
    // FÖRDEREMPFEHLUNGEN (automatisch generiert)
    // ========================================
    foerderempfehlungen: {
        verhalten: {
            allgemein: [
                "Strukturierung des Alltags durch klare Regeln und Routinen",
                "Positive Verstärkung erwünschten Verhaltens",
                "Konsequente, aber wohlwollende Grenzsetzung",
                "Unterstützung bei der Emotionsregulation"
            ],
            spezifisch: {
                impulskontrolle: [
                    "Einüben von Stopp-Strategien (z.B. Ampel-Methode)",
                    "Kurze, überschaubare Aufgaben",
                    "Bewegungspausen einplanen",
                    "Token-System für Selbstkontrolle"
                ],
                frustration: [
                    "Erfolge ermöglichen durch angepasste Anforderungen",
                    "Strategien zur Frustrationsbewältigung einüben",
                    "Gefühle benennen und validieren",
                    "Alternativhandlungen anbieten"
                ],
                aufmerksamkeit: [
                    "Reizarme Arbeitsumgebung schaffen",
                    "Aufgaben in kleine Schritte unterteilen",
                    "Visuelle Unterstützung (Piktogramme, Timer)",
                    "Häufige kurze Pausen"
                ]
            }
        },
        kommunikation: {
            allgemein: [
                "Sprachförderung im Alltag integrieren",
                "Vorbild sein durch klare, einfache Sprache",
                "Aktives Zuhören modellieren",
                "Kommunikationsanlässe schaffen"
            ],
            spezifisch: {
                wortschatz: [
                    "Wortschatzerweiterung durch Bilderbücher und Spiele",
                    "Neue Wörter in bedeutsamen Kontexten einführen",
                    "Kategorisierungsübungen",
                    "Wiederholung und Festigung"
                ],
                ausdruck: [
                    "Erzählanlässe schaffen",
                    "Satzstarter anbieten",
                    "Dialogisches Lesen",
                    "Rollenspiele zur Kommunikationsförderung"
                ],
                verstehen: [
                    "Kurze, klare Anweisungen",
                    "Visuelle Unterstützung",
                    "Verständnis überprüfen",
                    "Zeit zum Verarbeiten geben"
                ]
            }
        },
        sozialisation: {
            allgemein: [
                "Soziale Situationen begleiten und moderieren",
                "Positive Peer-Kontakte fördern",
                "Soziale Kompetenzen gezielt trainieren",
                "Kooperative Spielformen anbieten"
            ],
            spezifisch: {
                kontakt: [
                    "Kontaktaufnahme einüben",
                    "Kleingruppenaktivitäten",
                    "Partnerarbeit mit wechselnden Partnern",
                    "Soziale Skripte bereitstellen"
                ],
                konflikte: [
                    "Konfliktlösungsstrategien einüben",
                    "Ich-Botschaften trainieren",
                    "Perspektivenübernahme fördern",
                    "Mediation bei Konflikten"
                ],
                empathie: [
                    "Gefühle bei sich und anderen benennen",
                    "Bilderbücher zu sozialen Themen",
                    "Gefühlsbarometer nutzen",
                    "Empathie-Training"
                ]
            }
        },
        kognition: {
            allgemein: [
                "Lernumgebung strukturieren",
                "Differenzierte Aufgabenstellungen",
                "Lernstrategien vermitteln",
                "Motivation durch Erfolgserlebnisse"
            ],
            spezifisch: {
                konzentration: [
                    "Konzentrationsübungen",
                    "Aufmerksamkeitstraining",
                    "Ablenkungen minimieren",
                    "Selbstinstruktion einüben"
                ],
                gedaechtnis: [
                    "Merkhilfen und Eselsbrücken",
                    "Wiederholung in verschiedenen Modalitäten",
                    "Strukturierung von Informationen",
                    "Visualisierungstechniken"
                ],
                lernen: [
                    "Handlungsorientiertes Lernen",
                    "Multisensorisches Lernen",
                    "Kleinschrittiges Vorgehen",
                    "Anschauungsmaterial verwenden"
                ]
            }
        }
    },

    // ========================================
    // SATZBAUSTEINE FÜR FLIESSTEXT
    // ========================================
    satzbausteine: {
        einleitung: [
            "Die vorliegende Einschätzung basiert auf Beobachtungen im schulischen Kontext sowie auf der systematischen Erfassung mittels des Entwicklungstherapeutischen Lernziel-Diagnose-Bogens (ELDiB).",
            "Im Rahmen der sonderpädagogischen Diagnostik wurde eine Einschätzung der sozial-emotionalen Entwicklung durchgeführt.",
            "Die Einschätzung erfolgte auf Grundlage von Verhaltensbeobachtungen im Unterricht und strukturierten Erhebungsinstrumenten."
        ],
        zusammenfassung: {
            positiv: "Zusammenfassend zeigt {name} deutliche Stärken in den Bereichen {bereiche}. Die Förderung sollte diese Ressourcen nutzen und weiter ausbauen.",
            gemischt: "Die Einschätzung zeigt ein heterogenes Entwicklungsprofil. Während {name} in {staerken_bereiche} gute Kompetenzen zeigt, bestehen in {schwaechen_bereiche} noch Förderbedarfe.",
            foerderbedarf: "Die Ergebnisse weisen auf einen erhöhten Förderbedarf hin, insbesondere in den Bereichen {bereiche}. Eine gezielte, individuelle Förderung wird empfohlen."
        },
        uebergaenge: [
            "Im Bereich",
            "Hinsichtlich",
            "Bezüglich",
            "Was betrifft",
            "In Bezug auf"
        ]
    }
};

// ========================================
// STATE FÜR AUSGEWÄHLTE BEOBACHTUNGEN
// ========================================
let selectedObservations = {
    verhalten: { staerken: [], schwierigkeiten: [] },
    kommunikation: { staerken: [], schwierigkeiten: [] },
    sozialisation: { staerken: [], schwierigkeiten: [] },
    kognition: { staerken: [], schwierigkeiten: [] }
};

// ========================================
// UI FUNKTIONEN
// ========================================

// Klickbare Optionen für einen Bereich rendern
function renderBeobachtungsOptionen(bereich, container) {
    const optionen = DIAGNOSTIC_TEXTBAUSTEINE.beobachtungsOptionen[bereich];
    if (!optionen || !container) return;

    let html = `
        <div class="beob-optionen-section">
            <h4 style="color: #2ecc71; margin-bottom: 10px;">Stärken</h4>
            <div class="beob-optionen-grid">
    `;

    for (const opt of optionen.staerken) {
        const isSelected = selectedObservations[bereich].staerken.includes(opt.id);
        html += `
            <div class="beob-option ${isSelected ? 'selected' : ''}"
                 data-id="${opt.id}"
                 data-bereich="${bereich}"
                 data-type="staerken"
                 onclick="toggleObservation('${bereich}', 'staerken', '${opt.id}')"
                 title="${opt.detail}">
                <span class="beob-checkbox">${isSelected ? '✓' : ''}</span>
                <span class="beob-text">${opt.text}</span>
            </div>
        `;
    }

    html += `
            </div>
            <h4 style="color: #e74c3c; margin: 20px 0 10px 0;">Schwierigkeiten / Förderbedarfe</h4>
            <div class="beob-optionen-grid">
    `;

    for (const opt of optionen.schwierigkeiten) {
        const isSelected = selectedObservations[bereich].schwierigkeiten.includes(opt.id);
        html += `
            <div class="beob-option ${isSelected ? 'selected' : ''}"
                 data-id="${opt.id}"
                 data-bereich="${bereich}"
                 data-type="schwierigkeiten"
                 onclick="toggleObservation('${bereich}', 'schwierigkeiten', '${opt.id}')"
                 title="${opt.detail}">
                <span class="beob-checkbox">${isSelected ? '✓' : ''}</span>
                <span class="beob-text">${opt.text}</span>
            </div>
        `;
    }

    html += `
            </div>
        </div>
    `;

    container.innerHTML = html;
}

// Observation toggle
function toggleObservation(bereich, type, id) {
    const arr = selectedObservations[bereich][type];
    const idx = arr.indexOf(id);

    if (idx > -1) {
        arr.splice(idx, 1);
    } else {
        arr.push(id);
    }

    // UI aktualisieren
    const element = document.querySelector(`[data-id="${id}"]`);
    if (element) {
        element.classList.toggle('selected');
        const checkbox = element.querySelector('.beob-checkbox');
        checkbox.textContent = arr.includes(id) ? '✓' : '';
    }

    // Speichern
    saveSelectedObservations();

    // Zähler aktualisieren
    if (typeof updateSelectionCounts === 'function') {
        updateSelectionCounts();
    }
}

// Speichern
function saveSelectedObservations() {
    localStorage.setItem('eldib-selected-observations', JSON.stringify(selectedObservations));
}

// Laden
function loadSelectedObservations() {
    const saved = localStorage.getItem('eldib-selected-observations');
    if (saved) {
        selectedObservations = JSON.parse(saved);
    }
}

// ========================================
// AUTOMATISCHE BERICHTSGENERIERUNG
// ========================================

function generateAutomaticReport() {
    const stammdaten = getStammdaten();
    const profil = berechneEntwicklungsprofil();
    const beobachtungen = getBeobachtungen();
    const sprache = document.getElementById('bericht_sprache')?.value || 'de';

    // Name extrahieren
    const name = stammdaten.schueler_name || 'Der/Die Schüler/in';
    const vorname = name.split(',')[1]?.trim() || name.split(' ')[0] || 'Das Kind';

    let reportText = '';

    // HEADER
    reportText += `<div style="text-align: center; margin-bottom: 30px; border-bottom: 3px solid #1a1a2e; padding-bottom: 20px;">
        <h1 style="color: #1a1a2e; font-size: 1.8em; margin-bottom: 5px;">DIAGNOSTIC SPÉCIALISÉ</h1>
        <h2 style="color: #667eea; font-size: 1.3em; margin-bottom: 10px;">Bericht zur sozial-emotionalen Entwicklung</h2>
        <p style="color: #666;">Centre de Diagnostic Spécialisé de l'Éducation (CDSE)</p>
    </div>`;

    // ANGABEN ZUM SCHÜLER
    reportText += `
        <h2 style="color: #1a1a2e; border-bottom: 2px solid #667eea; padding-bottom: 5px;">1. Angaben zum Schüler / Informations sur l'élève</h2>
        <table style="width: 100%; margin-bottom: 20px; border-collapse: collapse;">
            <tr><td style="padding: 8px; width: 200px; background: #f5f5f5;"><strong>Name / Nom:</strong></td><td style="padding: 8px;">${stammdaten.schueler_name || '-'}</td></tr>
            <tr><td style="padding: 8px; background: #f5f5f5;"><strong>Geburtsdatum / Date de naissance:</strong></td><td style="padding: 8px;">${stammdaten.geburtsdatum || '-'}</td></tr>
            <tr><td style="padding: 8px; background: #f5f5f5;"><strong>Matricule:</strong></td><td style="padding: 8px;">${stammdaten.matricule || '-'}</td></tr>
            <tr><td style="padding: 8px; background: #f5f5f5;"><strong>Schule / École:</strong></td><td style="padding: 8px;">${stammdaten.foerderort || '-'}</td></tr>
            <tr><td style="padding: 8px; background: #f5f5f5;"><strong>Klasse / Classe:</strong></td><td style="padding: 8px;">${stammdaten.klasse || '-'}</td></tr>
            <tr><td style="padding: 8px; background: #f5f5f5;"><strong>Schuljahr / Année scolaire:</strong></td><td style="padding: 8px;">${stammdaten.schuljahr || '-'}</td></tr>
            <tr><td style="padding: 8px; background: #f5f5f5;"><strong>Datum der Untersuchung:</strong></td><td style="padding: 8px;">${stammdaten.einschaetzungsdatum || '-'}</td></tr>
            <tr><td style="padding: 8px; background: #f5f5f5;"><strong>Untersucher/in:</strong></td><td style="padding: 8px;">${stammdaten.einschaetzende || '-'}</td></tr>
        </table>
    `;

    // FRAGESTELLUNG
    if (beobachtungen.fragestellung) {
        reportText += `
            <h2 style="color: #1a1a2e; border-bottom: 2px solid #667eea; padding-bottom: 5px;">2. Fragestellung / Question</h2>
            <p style="margin-bottom: 20px;">${beobachtungen.fragestellung.replace(/\n/g, '<br>')}</p>
        `;
    }

    // METHODIK
    reportText += `
        <h2 style="color: #1a1a2e; border-bottom: 2px solid #667eea; padding-bottom: 5px;">3. Untersuchungsmethoden / Méthodes d'évaluation</h2>
        <ul style="margin-bottom: 20px;">
            <li>Entwicklungstherapeutischer Lernziel-Diagnose-Bogen (ELDiB)</li>
            <li>Strukturierte Verhaltensbeobachtung im schulischen Kontext</li>
            <li>Gespräche mit Lehrpersonen und pädagogischem Personal</li>
        </ul>
    `;

    // ENTWICKLUNGSPROFIL
    reportText += `
        <h2 style="color: #1a1a2e; border-bottom: 2px solid #667eea; padding-bottom: 5px;">4. Ergebnisse / Résultats</h2>
        <p style="margin-bottom: 15px;">${DIAGNOSTIC_TEXTBAUSTEINE.satzbausteine.einleitung[0]}</p>
    `;

    // Für jeden Bereich
    const bereiche = ['verhalten', 'kommunikation', 'sozialisation', 'kognition'];
    const bereichNamen = {
        verhalten: { de: 'Verhalten', fr: 'Comportement', color: '#e74c3c' },
        kommunikation: { de: 'Kommunikation', fr: 'Communication', color: '#3498db' },
        sozialisation: { de: 'Sozialisation', fr: 'Socialisation', color: '#2ecc71' },
        kognition: { de: 'Kognition', fr: 'Cognition', color: '#f39c12' }
    };

    for (const bereich of bereiche) {
        const data = profil[bereich];
        const stufe = data.hoechsteStufe || 0;
        const info = bereichNamen[bereich];

        reportText += `
            <div style="margin: 25px 0; padding: 20px; border-left: 5px solid ${info.color}; background: linear-gradient(to right, #f9f9f9, white);">
                <h3 style="color: ${info.color}; margin-top: 0;">${info.de} / ${info.fr}</h3>
                <p><strong>Entwicklungsstufe:</strong> ${stufe > 0 ? `Stufe ${stufe}` : 'Nicht erfasst'}</p>
                <p>${vorname} ${DIAGNOSTIC_TEXTBAUSTEINE.stufenBeschreibungen[bereich][stufe]}</p>
        `;

        // Ausgewählte Stärken
        const staerken = selectedObservations[bereich].staerken;
        if (staerken.length > 0) {
            const staerkenTexte = staerken.map(id => {
                const opt = DIAGNOSTIC_TEXTBAUSTEINE.beobachtungsOptionen[bereich].staerken.find(o => o.id === id);
                return opt ? opt.text : '';
            }).filter(t => t);

            reportText += `<p><strong>Stärken:</strong> ${vorname} ${staerkenTexte.join(', ')}.</p>`;
        }

        // Ausgewählte Schwierigkeiten
        const schwierigkeiten = selectedObservations[bereich].schwierigkeiten;
        if (schwierigkeiten.length > 0) {
            const schwierigkeitenTexte = schwierigkeiten.map(id => {
                const opt = DIAGNOSTIC_TEXTBAUSTEINE.beobachtungsOptionen[bereich].schwierigkeiten.find(o => o.id === id);
                return opt ? opt.text : '';
            }).filter(t => t);

            reportText += `<p><strong>Förderbedarfe:</strong> ${vorname} ${schwierigkeitenTexte.join(', ')}.</p>`;
        }

        // Erreichte Items
        if (data.erreicht.length > 0) {
            const letzteErreichte = data.erreicht.slice(-4);
            reportText += `<p><strong>Zuletzt erreichte Kompetenzen (ELDiB):</strong> ${letzteErreichte.map(i => `${i.code} (${i.keyword})`).join(', ')}</p>`;
        }

        // Ziele
        if (data.ziele.length > 0) {
            reportText += `<p><strong>Entwicklungsziele:</strong></p><ul>`;
            for (const ziel of data.ziele) {
                reportText += `<li>${ziel.code}: "${ziel.zieltext || ziel.description}"</li>`;
            }
            reportText += `</ul>`;
        }

        // Freie Beobachtungen
        const beobKey = `beob_${bereich === 'kognition' ? 'kognition' : bereich}`;
        const freitext = document.getElementById(beobKey)?.value;
        if (freitext) {
            reportText += `<p><strong>Weitere Beobachtungen:</strong> ${freitext.replace(/\n/g, '<br>')}</p>`;
        }

        reportText += `</div>`;
    }

    // FÖRDEREMPFEHLUNGEN
    reportText += `
        <h2 style="color: #1a1a2e; border-bottom: 2px solid #667eea; padding-bottom: 5px;">5. Förderempfehlungen / Recommandations</h2>
    `;

    // Automatische Empfehlungen basierend auf ausgewählten Schwierigkeiten
    for (const bereich of bereiche) {
        const schwierigkeiten = selectedObservations[bereich].schwierigkeiten;
        if (schwierigkeiten.length > 0) {
            const info = bereichNamen[bereich];
            reportText += `<h4 style="color: ${info.color};">${info.de}</h4><ul>`;

            // Allgemeine Empfehlungen
            const allgEmpf = DIAGNOSTIC_TEXTBAUSTEINE.foerderempfehlungen[bereich].allgemein;
            for (const empf of allgEmpf.slice(0, 2)) {
                reportText += `<li>${empf}</li>`;
            }

            reportText += `</ul>`;
        }
    }

    // Zusätzliche Empfehlungen aus Freitext
    if (beobachtungen.empfehlungen) {
        reportText += `<p><strong>Weitere Empfehlungen:</strong><br>${beobachtungen.empfehlungen.replace(/\n/g, '<br>')}</p>`;
    }

    // FAZIT
    reportText += `
        <h2 style="color: #1a1a2e; border-bottom: 2px solid #667eea; padding-bottom: 5px;">6. Zusammenfassung / Conclusion</h2>
    `;

    if (beobachtungen.fazit) {
        reportText += `<p>${beobachtungen.fazit.replace(/\n/g, '<br>')}</p>`;
    } else {
        // Automatisches Fazit
        const alleStaerken = bereiche.filter(b => selectedObservations[b].staerken.length > 0);
        const alleSchwierigkeiten = bereiche.filter(b => selectedObservations[b].schwierigkeiten.length > 0);

        if (alleSchwierigkeiten.length > 0) {
            reportText += `<p>${DIAGNOSTIC_TEXTBAUSTEINE.satzbausteine.zusammenfassung.foerderbedarf
                .replace('{bereiche}', alleSchwierigkeiten.map(b => bereichNamen[b].de).join(', '))}</p>`;
        } else if (alleStaerken.length > 0) {
            reportText += `<p>${DIAGNOSTIC_TEXTBAUSTEINE.satzbausteine.zusammenfassung.positiv
                .replace('{name}', vorname)
                .replace('{bereiche}', alleStaerken.map(b => bereichNamen[b].de).join(', '))}</p>`;
        }
    }

    // UNTERSCHRIFT
    const heute = new Date().toLocaleDateString('de-DE');
    reportText += `
        <div style="margin-top: 60px; display: flex; justify-content: space-between;">
            <div>
                <p>Luxemburg, den ${heute}</p>
            </div>
            <div style="text-align: center;">
                <p style="margin-bottom: 50px;">____________________________</p>
                <p>${stammdaten.einschaetzende || ''}</p>
            </div>
        </div>
    `;

    return reportText;
}

// Bericht Vorschau anzeigen
function generateBerichtVorschau() {
    const reportHTML = generateAutomaticReport();
    document.getElementById('bericht-vorschau').innerHTML = reportHTML;
}

// Bericht als Word herunterladen
function generateDiagnostischerBericht() {
    const stammdaten = getStammdaten();
    const reportHTML = generateAutomaticReport();

    const fullHTML = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Diagnostic Spécialisé - ${stammdaten.schueler_name}</title>
    <style>
        body { font-family: 'Times New Roman', serif; margin: 2cm; line-height: 1.6; font-size: 12pt; }
        h1 { color: #1a1a2e; font-size: 18pt; }
        h2 { color: #1a1a2e; font-size: 14pt; border-bottom: 2px solid #667eea; padding-bottom: 5px; margin-top: 25px; }
        h3 { color: #333; font-size: 12pt; }
        h4 { font-size: 11pt; margin: 10px 0 5px 0; }
        table { width: 100%; border-collapse: collapse; }
        td { padding: 5px 10px; vertical-align: top; }
        ul { margin: 5px 0 10px 20px; }
        li { margin-bottom: 3px; }
        @page { margin: 2cm; }
    </style>
</head>
<body>
    ${reportHTML}
</body>
</html>
    `;

    const filename = `Diagnostic_Specialise_${stammdaten.schueler_name || 'export'}_${new Date().toISOString().split('T')[0]}.doc`;
    downloadAsWord(fullHTML, filename);
}

// Initialisierung
document.addEventListener('DOMContentLoaded', function() {
    loadSelectedObservations();
});
