/**
 * WISC-V - Wechsler Intelligence Scale for Children V
 * Auswertungsmodul für Intelligenzdiagnostik
 */

const WISC_NORMS = {
    // Wertpunkte zu IQ-Klassifikation
    iq: {
        veryHigh: { range: [130, 160], label: 'Weit überdurchschnittlich' },
        high: { range: [120, 129], label: 'Überdurchschnittlich' },
        highAverage: { range: [110, 119], label: 'Hoch durchschnittlich' },
        average: { range: [90, 109], label: 'Durchschnittlich' },
        lowAverage: { range: [80, 89], label: 'Niedrig durchschnittlich' },
        borderline: { range: [70, 79], label: 'Unterdurchschnittlich' },
        veryLow: { range: [40, 69], label: 'Weit unterdurchschnittlich' }
    },
    // Wertpunkte-Klassifikation (1-19)
    scaledScore: {
        veryHigh: { range: [16, 19], label: 'Weit überdurchschnittlich' },
        high: { range: [14, 15], label: 'Überdurchschnittlich' },
        highAverage: { range: [12, 13], label: 'Hoch durchschnittlich' },
        average: { range: [8, 11], label: 'Durchschnittlich' },
        lowAverage: { range: [6, 7], label: 'Niedrig durchschnittlich' },
        borderline: { range: [4, 5], label: 'Unterdurchschnittlich' },
        veryLow: { range: [1, 3], label: 'Weit unterdurchschnittlich' }
    }
};

const WISC_INDICES = {
    vci: {
        name: 'Sprachverständnis (SV)',
        fullName: 'Sprachverständnisindex',
        subtests: ['similarities', 'vocabulary', 'information', 'comprehension'],
        description: 'Verbale Begriffsbildung, Wortschatz und sprachliches Schlussfolgern',
        lowInterpretation: 'Mögliche Schwierigkeiten in der sprachlichen Entwicklung, Wortfindung oder verbaler Konzeptbildung',
        recommendations: ['Sprachförderung', 'Logopädische Abklärung', 'Wortschatzerweiterung']
    },
    vsi: {
        name: 'Visuell-räumlich (VR)',
        fullName: 'Visuell-räumlicher Index',
        subtests: ['blockDesign', 'visualPuzzles'],
        description: 'Visuelle Wahrnehmung, räumliches Denken und Konstruktionsfähigkeit',
        lowInterpretation: 'Mögliche Schwierigkeiten bei räumlichen Aufgaben, visueller Organisation oder Konstruktion',
        recommendations: ['Räumliches Training', 'Visuelle Wahrnehmungsförderung']
    },
    fri: {
        name: 'Fluides Schlussfolgern (FS)',
        fullName: 'Index Fluides Schlussfolgern',
        subtests: ['matrixReasoning', 'figureWeights', 'picturesConcepts', 'arithmetic'],
        description: 'Logisches Denken, induktives und deduktives Schlussfolgern',
        lowInterpretation: 'Mögliche Schwierigkeiten beim logischen Denken oder Problemlösen',
        recommendations: ['Förderung logischen Denkens', 'Problemlösestrategien']
    },
    wmi: {
        name: 'Arbeitsgedächtnis (AG)',
        fullName: 'Arbeitsgedächtnisindex',
        subtests: ['digitSpan', 'pictureSpan', 'letterNumberSequencing'],
        description: 'Kapazität des Arbeitsgedächtnisses und mentale Manipulation',
        lowInterpretation: 'Eingeschränkte Arbeitsgedächtniskapazität kann schulisches Lernen beeinträchtigen',
        recommendations: ['Arbeitsgedächtnistraining', 'Merkstrategien', 'Strukturierungshilfen']
    },
    psi: {
        name: 'Verarbeitungsgeschwindigkeit (VG)',
        fullName: 'Verarbeitungsgeschwindigkeitsindex',
        subtests: ['coding', 'symbolSearch', 'cancellation'],
        description: 'Geschwindigkeit und Genauigkeit bei einfachen visuellen Aufgaben',
        lowInterpretation: 'Verlangsamte Verarbeitung kann zu Zeitdruck und erhöhtem Aufwand führen',
        recommendations: ['Zeitzugaben bei Prüfungen', 'Automatisierungstraining', 'Keine Zeitdrucksituationen']
    },
    fsiq: {
        name: 'Gesamt-IQ',
        fullName: 'Gesamt-Intelligenzquotient',
        description: 'Allgemeine kognitive Leistungsfähigkeit',
        lowInterpretation: 'Hinweis auf generelle kognitive Einschränkungen',
        recommendations: ['Umfassende Förderplanung', 'Anpassung schulischer Anforderungen']
    }
};

const WISC_SUBTESTS = {
    // Sprachverständnis
    similarities: { name: 'Gemeinsamkeiten finden', index: 'vci', core: true },
    vocabulary: { name: 'Wortschatz-Test', index: 'vci', core: true },
    information: { name: 'Allgemeines Wissen', index: 'vci', core: false },
    comprehension: { name: 'Allgemeines Verständnis', index: 'vci', core: false },

    // Visuell-räumlich
    blockDesign: { name: 'Mosaik-Test', index: 'vsi', core: true },
    visualPuzzles: { name: 'Visuelle Puzzles', index: 'vsi', core: true },

    // Fluides Schlussfolgern
    matrixReasoning: { name: 'Matrizen-Test', index: 'fri', core: true },
    figureWeights: { name: 'Formenwaage', index: 'fri', core: true },
    picturesConcepts: { name: 'Bilderkonzepte', index: 'fri', core: false },
    arithmetic: { name: 'Rechnerisches Denken', index: 'fri', core: false },

    // Arbeitsgedächtnis
    digitSpan: { name: 'Zahlen nachsprechen', index: 'wmi', core: true },
    pictureSpan: { name: 'Bilder merken', index: 'wmi', core: true },
    letterNumberSequencing: { name: 'Buchstaben-Zahlen-Folgen', index: 'wmi', core: false },

    // Verarbeitungsgeschwindigkeit
    coding: { name: 'Zahlen-Symbol-Test', index: 'psi', core: true },
    symbolSearch: { name: 'Symbol-Suche', index: 'psi', core: true },
    cancellation: { name: 'Durchstreich-Test', index: 'psi', core: false }
};

function classifyIQScore(value) {
    for (const [key, data] of Object.entries(WISC_NORMS.iq)) {
        if (value >= data.range[0] && value <= data.range[1]) {
            return { classification: key, label: data.label };
        }
    }
    return { classification: 'average', label: 'Durchschnittlich' };
}

function classifyScaledScore(value) {
    for (const [key, data] of Object.entries(WISC_NORMS.scaledScore)) {
        if (value >= data.range[0] && value <= data.range[1]) {
            return { classification: key, label: data.label };
        }
    }
    return { classification: 'average', label: 'Durchschnittlich' };
}

function evaluateWISC(event) {
    if (event) event.preventDefault();

    // Index-Werte einlesen
    const indices = {
        vci: parseInt(document.getElementById('wisc-vci').value) || null,
        vsi: parseInt(document.getElementById('wisc-vsi').value) || null,
        fri: parseInt(document.getElementById('wisc-fri').value) || null,
        wmi: parseInt(document.getElementById('wisc-wmi').value) || null,
        psi: parseInt(document.getElementById('wisc-psi').value) || null,
        fsiq: parseInt(document.getElementById('wisc-fsiq').value) || null
    };

    // Untertests einlesen
    const subtests = {};
    Object.keys(WISC_SUBTESTS).forEach(key => {
        const el = document.getElementById(`wisc-${key}`);
        if (el && el.value) {
            subtests[key] = parseInt(el.value);
        }
    });

    // Validierung
    let hasData = false;
    for (const val of Object.values(indices)) {
        if (val !== null) {
            if (val < 40 || val > 160) {
                alert('IQ-Werte müssen zwischen 40 und 160 liegen.');
                return;
            }
            hasData = true;
        }
    }
    for (const val of Object.values(subtests)) {
        if (val !== undefined) {
            if (val < 1 || val > 19) {
                alert('Wertpunkte müssen zwischen 1 und 19 liegen.');
                return;
            }
            hasData = true;
        }
    }

    if (!hasData) {
        alert('Bitte geben Sie mindestens einen Index-Wert oder Untertest-Wert ein.');
        return;
    }

    // Klassifikationen berechnen
    const indexClassifications = {};
    Object.keys(indices).forEach(key => {
        if (indices[key] !== null) {
            indexClassifications[key] = classifyIQScore(indices[key]);
        }
    });

    const subtestClassifications = {};
    Object.keys(subtests).forEach(key => {
        if (subtests[key] !== undefined) {
            subtestClassifications[key] = classifyScaledScore(subtests[key]);
        }
    });

    // Charts erstellen
    createWISCIndexChart(indices, indexClassifications);
    if (Object.keys(subtests).length > 0) {
        createWISCSubtestChart(subtests, subtestClassifications);
    }

    // Zusammenfassung und Interpretation
    createWISCSummary(indices, indexClassifications);
    createWISCInterpretation(indices, indexClassifications, subtests, subtestClassifications);

    // Ergebnisse anzeigen
    document.getElementById('wisc-results').style.display = 'block';
    document.getElementById('wisc-results').scrollIntoView({ behavior: 'smooth' });

    // Im Fall speichern
    if (CaseManager.currentCase) {
        CaseManager.saveTestResults('wisc', { indices, subtests, indexClassifications, subtestClassifications });
    }
}

function createWISCIndexChart(indices, classifications) {
    const validIndices = Object.entries(indices).filter(([k, v]) => v !== null);
    if (validIndices.length === 0) return;

    const labels = validIndices.map(([k]) => WISC_INDICES[k].name);
    const values = validIndices.map(([k, v]) => v);
    const classificationKeys = validIndices.map(([k]) => classifications[k].classification);

    ChartManager.createProfileChart('wisc-index-chart', labels, {
        values: values,
        colors: ChartManager.getClassificationColors(classificationKeys),
        borderColors: ChartManager.getClassificationBorderColors(classificationKeys)
    }, {
        title: 'WISC-V Indexprofil',
        yMin: 40,
        yMax: 160,
        yLabel: 'IQ-Werte',
        referenceLines: [
            { value: 100, color: 'rgba(0, 0, 0, 0.3)', label: 'Mittelwert' },
            { value: 85, color: 'rgba(154, 103, 0, 0.5)', label: '-1 SD' },
            { value: 115, color: 'rgba(154, 103, 0, 0.5)', label: '+1 SD' },
            { value: 70, color: 'rgba(207, 34, 46, 0.5)', label: '-2 SD' },
            { value: 130, color: 'rgba(207, 34, 46, 0.5)', label: '+2 SD' }
        ]
    });
}

function createWISCSubtestChart(subtests, classifications) {
    const labels = Object.keys(subtests).map(k => WISC_SUBTESTS[k].name);
    const values = Object.values(subtests);
    const classificationKeys = Object.keys(subtests).map(k => classifications[k].classification);

    ChartManager.createProfileChart('wisc-subtest-chart', labels, {
        values: values,
        colors: ChartManager.getClassificationColors(classificationKeys),
        borderColors: ChartManager.getClassificationBorderColors(classificationKeys)
    }, {
        title: 'WISC-V Untertestprofil',
        yMin: 1,
        yMax: 19,
        yLabel: 'Wertpunkte',
        referenceLines: [
            { value: 10, color: 'rgba(0, 0, 0, 0.3)', label: 'Mittelwert' },
            { value: 7, color: 'rgba(154, 103, 0, 0.5)', label: '-1 SD' },
            { value: 13, color: 'rgba(154, 103, 0, 0.5)', label: '+1 SD' }
        ]
    });
}

function createWISCSummary(indices, classifications) {
    const container = document.getElementById('wisc-summary');
    let html = '';

    if (indices.fsiq !== null) {
        const fsiqClass = classifications.fsiq.classification;
        const colorClass = fsiqClass === 'veryLow' || fsiqClass === 'borderline' ? 'clinical' :
                          fsiqClass === 'lowAverage' ? 'borderline' : 'normal';

        html += `
            <div class="summary-card ${colorClass}">
                <div class="summary-label">Gesamt-IQ</div>
                <div class="summary-value">${indices.fsiq}</div>
                <div class="summary-classification">${classifications.fsiq.label}</div>
            </div>
        `;
    }

    // Stärken und Schwächen identifizieren
    const validIndices = Object.entries(indices).filter(([k, v]) => v !== null && k !== 'fsiq');
    if (validIndices.length >= 2) {
        const sorted = validIndices.sort((a, b) => b[1] - a[1]);
        const highest = sorted[0];
        const lowest = sorted[sorted.length - 1];
        const range = highest[1] - lowest[1];

        if (range >= 15) {
            html += `
                <div class="summary-card">
                    <div class="summary-label">Stärke</div>
                    <div class="summary-value" style="font-size: 1rem;">${WISC_INDICES[highest[0]].name}</div>
                    <div class="summary-classification">${highest[1]} (${classifications[highest[0]].label})</div>
                </div>
                <div class="summary-card">
                    <div class="summary-label">Schwäche</div>
                    <div class="summary-value" style="font-size: 1rem;">${WISC_INDICES[lowest[0]].name}</div>
                    <div class="summary-classification">${lowest[1]} (${classifications[lowest[0]].label})</div>
                </div>
                <div class="summary-card">
                    <div class="summary-label">Streubreite</div>
                    <div class="summary-value">${range}</div>
                    <div class="summary-classification">${range >= 23 ? 'Sehr heterogen' : 'Heterogen'}</div>
                </div>
            `;
        }
    }

    container.innerHTML = html;
}

function createWISCInterpretation(indices, indexClassifications, subtests, subtestClassifications) {
    const container = document.getElementById('wisc-interpretation');
    let html = '';

    // Index-Interpretationen
    Object.entries(indices).forEach(([key, value]) => {
        if (value === null) return;

        const indexInfo = WISC_INDICES[key];
        const classification = indexClassifications[key];
        const isLow = classification.classification === 'veryLow' ||
                      classification.classification === 'borderline' ||
                      classification.classification === 'lowAverage';

        const colorClass = classification.classification === 'veryLow' || classification.classification === 'borderline' ? 'clinical' :
                          classification.classification === 'lowAverage' ? 'borderline' : 'normal';

        html += `
            <div class="interpretation-item ${colorClass}">
                <div class="scale-name">${indexInfo.fullName}</div>
                <div class="scale-value">IQ ${value} | ${classification.label}</div>
                <p>${indexInfo.description}</p>
                ${isLow ? `<p class="interpretation-note">${indexInfo.lowInterpretation}</p>` : ''}
            </div>
        `;
    });

    // Empfehlungen bei niedrigen Werten
    const lowIndices = Object.entries(indexClassifications)
        .filter(([k, v]) => v.classification === 'veryLow' || v.classification === 'borderline' || v.classification === 'lowAverage');

    if (lowIndices.length > 0) {
        html += '<div class="results-recommendations"><h4>Empfehlungen</h4><ul>';
        const recommendations = new Set();
        lowIndices.forEach(([key]) => {
            if (WISC_INDICES[key].recommendations) {
                WISC_INDICES[key].recommendations.forEach(r => recommendations.add(r));
            }
        });
        recommendations.forEach(r => html += `<li>${r}</li>`);
        html += '</ul></div>';
    }

    // Profilinterpretation
    const validIndices = Object.entries(indices).filter(([k, v]) => v !== null && k !== 'fsiq');
    if (validIndices.length >= 4) {
        const values = validIndices.map(([k, v]) => v);
        const mean = values.reduce((a, b) => a + b, 0) / values.length;
        const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
        const sd = Math.sqrt(variance);

        html += `
            <div class="interpretation-item">
                <div class="scale-name">Profilanalyse</div>
                <p>Mittlerer Index: ${mean.toFixed(1)} | Streuung: ${sd.toFixed(1)}</p>
                <p>${sd > 12 ? 'Das Profil zeigt eine <strong>heterogene Leistungsstruktur</strong>. Die Interpretation des Gesamt-IQ sollte mit Vorsicht erfolgen.' :
                    'Das Profil zeigt eine <strong>relativ homogene Leistungsstruktur</strong>. Der Gesamt-IQ bildet die allgemeine Leistungsfähigkeit gut ab.'}</p>
            </div>
        `;
    }

    container.innerHTML = html;
}

function clearWISCForm() {
    document.getElementById('wisc-form').reset();
    document.getElementById('wisc-results').style.display = 'none';
    ChartManager.destroy('wisc-index-chart');
    ChartManager.destroy('wisc-subtest-chart');
}

function getWISCData() {
    const indices = {
        vci: parseInt(document.getElementById('wisc-vci').value) || null,
        vsi: parseInt(document.getElementById('wisc-vsi').value) || null,
        fri: parseInt(document.getElementById('wisc-fri').value) || null,
        wmi: parseInt(document.getElementById('wisc-wmi').value) || null,
        psi: parseInt(document.getElementById('wisc-psi').value) || null,
        fsiq: parseInt(document.getElementById('wisc-fsiq').value) || null
    };

    const subtests = {};
    Object.keys(WISC_SUBTESTS).forEach(key => {
        const el = document.getElementById(`wisc-${key}`);
        if (el && el.value) {
            subtests[key] = parseInt(el.value);
        }
    });

    const indexClassifications = {};
    Object.keys(indices).forEach(key => {
        if (indices[key] !== null) {
            indexClassifications[key] = classifyIQScore(indices[key]);
        }
    });

    const subtestClassifications = {};
    Object.keys(subtests).forEach(key => {
        if (subtests[key] !== undefined) {
            subtestClassifications[key] = classifyScaledScore(subtests[key]);
        }
    });

    return { indices, subtests, indexClassifications, subtestClassifications };
}

function setWISCValues(data) {
    if (data.vci !== undefined) document.getElementById('wisc-vci').value = data.vci;
    if (data.vsi !== undefined) document.getElementById('wisc-vsi').value = data.vsi;
    if (data.fri !== undefined) document.getElementById('wisc-fri').value = data.fri;
    if (data.wmi !== undefined) document.getElementById('wisc-wmi').value = data.wmi;
    if (data.psi !== undefined) document.getElementById('wisc-psi').value = data.psi;
    if (data.fsiq !== undefined) document.getElementById('wisc-fsiq').value = data.fsiq;

    // Untertests
    Object.keys(WISC_SUBTESTS).forEach(key => {
        if (data[key] !== undefined) {
            const el = document.getElementById(`wisc-${key}`);
            if (el) el.value = data[key];
        }
    });
}

// Event Listener
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('wisc-form');
    if (form) {
        form.addEventListener('submit', evaluateWISC);
    }
});
