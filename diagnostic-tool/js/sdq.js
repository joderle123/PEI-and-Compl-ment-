/**
 * SDQ - Strengths and Difficulties Questionnaire
 * Auswertungs- und Interpretationsmodul
 *
 * Normwerte basierend auf deutschen Normierungsstudien
 * Quellen: Goodman, R. (1997); Woerner et al. (2004)
 */

// Normwerte für verschiedene Beurteiler
const SDQ_NORMS = {
    parent: {
        // Elternbeurteilung (4-17 Jahre)
        emotional: { normal: [0, 3], borderline: [4, 4], clinical: [5, 10] },
        conduct: { normal: [0, 2], borderline: [3, 3], clinical: [4, 10] },
        hyperactivity: { normal: [0, 5], borderline: [6, 6], clinical: [7, 10] },
        peer: { normal: [0, 2], borderline: [3, 3], clinical: [4, 10] },
        prosocial: { normal: [6, 10], borderline: [5, 5], clinical: [0, 4] },
        total: { normal: [0, 13], borderline: [14, 16], clinical: [17, 40] }
    },
    teacher: {
        // Lehrerbeurteilung
        emotional: { normal: [0, 4], borderline: [5, 5], clinical: [6, 10] },
        conduct: { normal: [0, 2], borderline: [3, 3], clinical: [4, 10] },
        hyperactivity: { normal: [0, 5], borderline: [6, 6], clinical: [7, 10] },
        peer: { normal: [0, 3], borderline: [4, 4], clinical: [5, 10] },
        prosocial: { normal: [6, 10], borderline: [5, 5], clinical: [0, 4] },
        total: { normal: [0, 11], borderline: [12, 15], clinical: [16, 40] }
    },
    self: {
        // Selbstbeurteilung (11-17 Jahre)
        emotional: { normal: [0, 5], borderline: [6, 6], clinical: [7, 10] },
        conduct: { normal: [0, 3], borderline: [4, 4], clinical: [5, 10] },
        hyperactivity: { normal: [0, 5], borderline: [6, 6], clinical: [7, 10] },
        peer: { normal: [0, 3], borderline: [4, 5], clinical: [6, 10] },
        prosocial: { normal: [6, 10], borderline: [5, 5], clinical: [0, 4] },
        total: { normal: [0, 15], borderline: [16, 19], clinical: [20, 40] }
    }
};

// Skalenbeschreibungen für die Interpretation
const SDQ_SCALE_DESCRIPTIONS = {
    emotional: {
        name: "Emotionale Probleme",
        highDescription: "Deutliche Hinweise auf emotionale Belastungen wie Ängstlichkeit, Sorgen, häufiges Unglücklichsein oder körperliche Beschwerden ohne medizinische Ursache.",
        recommendations: [
            "Exploration möglicher Angststörungen oder depressiver Symptomatik",
            "Beobachtung von psychosomatischen Beschwerden",
            "Prüfung von Ressourcen und Bewältigungsstrategien"
        ]
    },
    conduct: {
        name: "Verhaltensprobleme",
        highDescription: "Auffälligkeiten im Bereich regelwidriges oder oppositionelles Verhalten, Wutausbrüche, Lügen oder aggressive Tendenzen.",
        recommendations: [
            "Differenzialdiagnostik: SSV vs. Anpassungsstörung",
            "Analyse von Auslösern und Kontextfaktoren",
            "Überprüfung familiärer Erziehungsstile"
        ]
    },
    hyperactivity: {
        name: "Hyperaktivität/Aufmerksamkeitsprobleme",
        highDescription: "Hinweise auf Unruhe, Ablenkbarkeit, mangelnde Ausdauer oder impulsives Verhalten.",
        recommendations: [
            "ADHS-Screening mit spezifischen Instrumenten",
            "Verhaltensbeobachtung in verschiedenen Kontexten",
            "Prüfung von Komorbiditäten (z.B. Lernstörungen)"
        ]
    },
    peer: {
        name: "Probleme mit Gleichaltrigen",
        highDescription: "Schwierigkeiten in der Interaktion mit Peers, sozialer Rückzug, Bevorzugung von Erwachsenen oder Mobbingerfahrungen.",
        recommendations: [
            "Exploration sozialer Kompetenzdefizite",
            "Prüfung auf Ausgrenzung oder Mobbing",
            "Screening für Autismus-Spektrum-Störungen bei Bedarf"
        ]
    },
    prosocial: {
        name: "Prosoziales Verhalten",
        highDescription: "Niedrige Werte deuten auf mangelnde Hilfsbereitschaft, Empathie oder Rücksichtnahme hin.",
        recommendations: [
            "Förderung sozialer Kompetenzen",
            "Training von Perspektivübernahme und Empathie",
            "Gruppenbasierte Interventionen"
        ]
    }
};

let sdqChart = null;

/**
 * Klassifiziert einen Skalenwert
 */
function classifySDQScore(scale, value, respondent) {
    const norms = SDQ_NORMS[respondent][scale];

    if (scale === 'prosocial') {
        // Bei Prosozial ist niedriger Wert problematisch
        if (value >= norms.normal[0]) return 'normal';
        if (value === norms.borderline[0]) return 'borderline';
        return 'clinical';
    }

    if (value <= norms.normal[1]) return 'normal';
    if (value <= norms.borderline[1]) return 'borderline';
    return 'clinical';
}

/**
 * Berechnet den Gesamtproblemwert
 */
function calculateSDQTotal(values) {
    return values.emotional + values.conduct + values.hyperactivity + values.peer;
}

/**
 * Hauptfunktion zur SDQ-Auswertung
 */
function evaluateSDQ() {
    // Werte auslesen
    const values = {
        emotional: parseInt(document.getElementById('sdq-emotional').value) || 0,
        conduct: parseInt(document.getElementById('sdq-conduct').value) || 0,
        hyperactivity: parseInt(document.getElementById('sdq-hyperactivity').value) || 0,
        peer: parseInt(document.getElementById('sdq-peer').value) || 0,
        prosocial: parseInt(document.getElementById('sdq-prosocial').value) || 0
    };

    const respondent = document.getElementById('sdq-respondent').value;

    // Validierung
    for (const [key, value] of Object.entries(values)) {
        if (value < 0 || value > 10) {
            alert(`Bitte geben Sie für "${SDQ_SCALE_DESCRIPTIONS[key].name}" einen Wert zwischen 0 und 10 ein.`);
            return;
        }
    }

    // Gesamtwert berechnen
    const total = calculateSDQTotal(values);

    // Klassifikationen erstellen
    const classifications = {};
    for (const scale of Object.keys(values)) {
        classifications[scale] = classifySDQScore(scale, values[scale], respondent);
    }
    classifications.total = classifySDQScore('total', total, respondent);

    // Chart erstellen/aktualisieren
    createSDQChart(values, classifications);

    // Interpretation generieren
    generateSDQInterpretation(values, classifications, respondent);

    // Gesamtwert anzeigen
    document.getElementById('sdq-total').textContent = total;
    document.getElementById('sdq-total-classification').innerHTML =
        `<span class="classification-${classifications.total}">${getClassificationLabel(classifications.total)}</span>`;

    // Ergebnisse anzeigen
    document.getElementById('sdq-results').classList.remove('hidden');

    // Scrollen zu Ergebnissen
    document.getElementById('sdq-results').scrollIntoView({ behavior: 'smooth' });
}

/**
 * Erstellt das SDQ-Balkendiagramm
 */
function createSDQChart(values, classifications) {
    const ctx = document.getElementById('sdq-chart').getContext('2d');

    if (sdqChart) {
        sdqChart.destroy();
    }

    const colors = {
        normal: 'rgba(34, 197, 94, 0.7)',
        borderline: 'rgba(245, 158, 11, 0.7)',
        clinical: 'rgba(239, 68, 68, 0.7)'
    };

    const borderColors = {
        normal: 'rgb(34, 197, 94)',
        borderline: 'rgb(245, 158, 11)',
        clinical: 'rgb(239, 68, 68)'
    };

    const labels = [
        'Emotionale Probleme',
        'Verhaltensprobleme',
        'Hyperaktivität',
        'Probleme Gleichaltrige',
        'Prosoziales Verhalten'
    ];

    const scaleKeys = ['emotional', 'conduct', 'hyperactivity', 'peer', 'prosocial'];
    const data = scaleKeys.map(key => values[key]);
    const bgColors = scaleKeys.map(key => colors[classifications[key]]);
    const brdColors = scaleKeys.map(key => borderColors[classifications[key]]);

    sdqChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Skalenwert',
                data: data,
                backgroundColor: bgColors,
                borderColor: brdColors,
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 10,
                    title: {
                        display: true,
                        text: 'Skalenwert'
                    }
                },
                x: {
                    ticks: {
                        maxRotation: 45,
                        minRotation: 45
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'SDQ Skalenprofil'
                }
            }
        }
    });
}

/**
 * Generiert die textliche Interpretation
 */
function generateSDQInterpretation(values, classifications, respondent) {
    const container = document.getElementById('sdq-interpretation');
    let html = '';

    const respondentLabel = {
        parent: 'Elternbeurteilung',
        teacher: 'Lehrerbeurteilung',
        self: 'Selbstbeurteilung'
    }[respondent];

    html += `<p class="mb-2"><strong>Beurteiler:</strong> ${respondentLabel}</p>`;

    // Problemskalen
    const problemScales = ['emotional', 'conduct', 'hyperactivity', 'peer'];
    const clinicalScales = problemScales.filter(s => classifications[s] === 'clinical');
    const borderlineScales = problemScales.filter(s => classifications[s] === 'borderline');

    for (const scale of problemScales) {
        const desc = SDQ_SCALE_DESCRIPTIONS[scale];
        const value = values[scale];
        const classification = classifications[scale];

        html += `
            <div class="interpretation-item ${classification}">
                <div class="scale-name">${desc.name}</div>
                <div class="scale-value">Wert: ${value}/10</div>
                <div class="scale-classification">${getClassificationLabel(classification)}</div>
                ${classification !== 'normal' ? `<p class="mt-1">${desc.highDescription}</p>` : ''}
            </div>
        `;
    }

    // Prosoziales Verhalten
    const prosocialClass = classifications.prosocial;
    const prosocialDesc = SDQ_SCALE_DESCRIPTIONS.prosocial;
    html += `
        <div class="interpretation-item ${prosocialClass}">
            <div class="scale-name">${prosocialDesc.name}</div>
            <div class="scale-value">Wert: ${values.prosocial}/10</div>
            <div class="scale-classification">${getClassificationLabelProsocial(prosocialClass)}</div>
            ${prosocialClass !== 'normal' ? `<p class="mt-1">${prosocialDesc.highDescription}</p>` : ''}
        </div>
    `;

    // Zusammenfassung und Empfehlungen
    if (clinicalScales.length > 0 || borderlineScales.length > 0) {
        html += '<div class="mt-3"><h4>Empfehlungen zur weiteren Diagnostik</h4><ul>';

        const allAbnormalScales = [...clinicalScales, ...borderlineScales];
        const seenRecommendations = new Set();

        for (const scale of allAbnormalScales) {
            for (const rec of SDQ_SCALE_DESCRIPTIONS[scale].recommendations) {
                if (!seenRecommendations.has(rec)) {
                    html += `<li>${rec}</li>`;
                    seenRecommendations.add(rec);
                }
            }
        }

        html += '</ul></div>';
    }

    container.innerHTML = html;
}

/**
 * Hilfsfunktion für Klassifikationslabels
 */
function getClassificationLabel(classification) {
    const labels = {
        normal: '✓ Unauffällig',
        borderline: '⚠ Grenzwertig',
        clinical: '⚠ Auffällig'
    };
    return labels[classification];
}

function getClassificationLabelProsocial(classification) {
    const labels = {
        normal: '✓ Altersgemäß',
        borderline: '⚠ Leicht reduziert',
        clinical: '⚠ Deutlich reduziert'
    };
    return labels[classification];
}

/**
 * Exportiert SDQ-Daten für andere Module
 */
function getSDQData() {
    const values = {
        emotional: parseInt(document.getElementById('sdq-emotional').value) || 0,
        conduct: parseInt(document.getElementById('sdq-conduct').value) || 0,
        hyperactivity: parseInt(document.getElementById('sdq-hyperactivity').value) || 0,
        peer: parseInt(document.getElementById('sdq-peer').value) || 0,
        prosocial: parseInt(document.getElementById('sdq-prosocial').value) || 0
    };
    const respondent = document.getElementById('sdq-respondent').value;
    const total = calculateSDQTotal(values);

    const classifications = {};
    for (const scale of Object.keys(values)) {
        classifications[scale] = classifySDQScore(scale, values[scale], respondent);
    }
    classifications.total = classifySDQScore('total', total, respondent);

    return { values, respondent, total, classifications };
}

/**
 * Setzt SDQ-Werte (z.B. bei Import)
 */
function setSDQValues(data) {
    if (data.emotional !== undefined) document.getElementById('sdq-emotional').value = data.emotional;
    if (data.conduct !== undefined) document.getElementById('sdq-conduct').value = data.conduct;
    if (data.hyperactivity !== undefined) document.getElementById('sdq-hyperactivity').value = data.hyperactivity;
    if (data.peer !== undefined) document.getElementById('sdq-peer').value = data.peer;
    if (data.prosocial !== undefined) document.getElementById('sdq-prosocial').value = data.prosocial;
    if (data.respondent) document.getElementById('sdq-respondent').value = data.respondent;
}
