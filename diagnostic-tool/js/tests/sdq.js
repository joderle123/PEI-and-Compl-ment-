/**
 * SDQ - Strengths and Difficulties Questionnaire
 * Auswertungsmodul
 */

const SDQ_NORMS = {
    parent: {
        emotional: { normal: [0, 3], borderline: [4, 4], clinical: [5, 10] },
        conduct: { normal: [0, 2], borderline: [3, 3], clinical: [4, 10] },
        hyperactivity: { normal: [0, 5], borderline: [6, 6], clinical: [7, 10] },
        peer: { normal: [0, 2], borderline: [3, 3], clinical: [4, 10] },
        prosocial: { normal: [6, 10], borderline: [5, 5], clinical: [0, 4] },
        total: { normal: [0, 13], borderline: [14, 16], clinical: [17, 40] }
    },
    teacher: {
        emotional: { normal: [0, 4], borderline: [5, 5], clinical: [6, 10] },
        conduct: { normal: [0, 2], borderline: [3, 3], clinical: [4, 10] },
        hyperactivity: { normal: [0, 5], borderline: [6, 6], clinical: [7, 10] },
        peer: { normal: [0, 3], borderline: [4, 4], clinical: [5, 10] },
        prosocial: { normal: [6, 10], borderline: [5, 5], clinical: [0, 4] },
        total: { normal: [0, 11], borderline: [12, 15], clinical: [16, 40] }
    },
    self: {
        emotional: { normal: [0, 5], borderline: [6, 6], clinical: [7, 10] },
        conduct: { normal: [0, 3], borderline: [4, 4], clinical: [5, 10] },
        hyperactivity: { normal: [0, 5], borderline: [6, 6], clinical: [7, 10] },
        peer: { normal: [0, 3], borderline: [4, 5], clinical: [6, 10] },
        prosocial: { normal: [6, 10], borderline: [5, 5], clinical: [0, 4] },
        total: { normal: [0, 15], borderline: [16, 19], clinical: [20, 40] }
    }
};

const SDQ_DESCRIPTIONS = {
    emotional: {
        name: 'Emotionale Probleme',
        high: 'Hinweise auf emotionale Belastungen (Ängstlichkeit, Sorgen, Traurigkeit)',
        recommendations: ['Angstdiagnostik vertiefen', 'Depressionsscreening', 'Ressourcenaktivierung']
    },
    conduct: {
        name: 'Verhaltensprobleme',
        high: 'Auffälligkeiten im Bereich regelwidriges oder oppositionelles Verhalten',
        recommendations: ['Differenzialdiagnostik SSV', 'Elternberatung', 'Konsequenzmanagement']
    },
    hyperactivity: {
        name: 'Hyperaktivität/Aufmerksamkeit',
        high: 'Hinweise auf Unruhe, Ablenkbarkeit oder Impulsivität',
        recommendations: ['ADHS-spezifische Diagnostik', 'Neuropsychologische Testung', 'Strukturierungsmaßnahmen']
    },
    peer: {
        name: 'Probleme mit Gleichaltrigen',
        high: 'Schwierigkeiten in sozialen Beziehungen oder sozialer Rückzug',
        recommendations: ['Soziale Kompetenz fördern', 'Mobbing-Screening', 'Gruppentraining']
    },
    prosocial: {
        name: 'Prosoziales Verhalten',
        low: 'Reduzierte Hilfsbereitschaft, Empathie oder Rücksichtnahme',
        recommendations: ['Empathieförderung', 'Perspektivübernahme trainieren']
    }
};

function classifySDQScore(scale, value, respondent) {
    const norms = SDQ_NORMS[respondent][scale];
    if (scale === 'prosocial') {
        if (value >= norms.normal[0]) return 'normal';
        if (value === norms.borderline[0]) return 'borderline';
        return 'clinical';
    }
    if (value <= norms.normal[1]) return 'normal';
    if (value <= norms.borderline[1]) return 'borderline';
    return 'clinical';
}

function evaluateSDQ(event) {
    if (event) event.preventDefault();

    const respondent = document.querySelector('input[name="sdq-respondent"]:checked')?.value || 'parent';
    const values = {
        emotional: parseInt(document.getElementById('sdq-emotional').value) || 0,
        conduct: parseInt(document.getElementById('sdq-conduct').value) || 0,
        hyperactivity: parseInt(document.getElementById('sdq-hyperactivity').value) || 0,
        peer: parseInt(document.getElementById('sdq-peer').value) || 0,
        prosocial: parseInt(document.getElementById('sdq-prosocial').value) || 0
    };

    // Validierung
    for (const [key, value] of Object.entries(values)) {
        if (value < 0 || value > 10) {
            alert(`Bitte geben Sie für "${SDQ_DESCRIPTIONS[key].name}" einen Wert zwischen 0 und 10 ein.`);
            return;
        }
    }

    const total = values.emotional + values.conduct + values.hyperactivity + values.peer;

    const classifications = {};
    Object.keys(values).forEach(key => {
        classifications[key] = classifySDQScore(key, values[key], respondent);
    });
    classifications.total = classifySDQScore('total', total, respondent);

    // Chart erstellen
    createSDQChart(values, classifications);

    // Zusammenfassung
    createSDQSummary(values, classifications, total, respondent);

    // Interpretation
    createSDQInterpretation(values, classifications, respondent);

    // Ergebnisse anzeigen
    document.getElementById('sdq-results').style.display = 'block';
    document.getElementById('sdq-results').scrollIntoView({ behavior: 'smooth' });

    // Im Fall speichern
    if (CaseManager.currentCase) {
        CaseManager.saveTestResults('sdq', { values, classifications, total, respondent });
    }
}

function createSDQChart(values, classifications) {
    const labels = ['Emotional', 'Verhalten', 'Hyperaktivität', 'Gleichaltrige', 'Prosozial'];
    const scaleKeys = ['emotional', 'conduct', 'hyperactivity', 'peer', 'prosocial'];

    ChartManager.createBarChart('sdq-chart', labels, {
        values: scaleKeys.map(k => values[k]),
        colors: ChartManager.getClassificationColors(scaleKeys.map(k => classifications[k])),
        borderColors: ChartManager.getClassificationBorderColors(scaleKeys.map(k => classifications[k]))
    }, {
        title: 'SDQ Skalenprofil',
        yMax: 10,
        yLabel: 'Skalenwert (0-10)'
    });
}

function createSDQSummary(values, classifications, total, respondent) {
    const container = document.getElementById('sdq-summary');
    const respondentLabels = { parent: 'Elternbeurteilung', teacher: 'Lehrerbeurteilung', self: 'Selbstbeurteilung' };
    const classLabels = { normal: 'Unauffällig', borderline: 'Grenzwertig', clinical: 'Auffällig' };

    container.innerHTML = `
        <div class="summary-card">
            <div class="summary-label">Beurteiler</div>
            <div class="summary-value" style="font-size: 1rem;">${respondentLabels[respondent]}</div>
        </div>
        <div class="summary-card ${classifications.total}">
            <div class="summary-label">Gesamtproblemwert</div>
            <div class="summary-value">${total}</div>
            <div class="summary-classification ${classifications.total}">${classLabels[classifications.total]}</div>
        </div>
    `;
}

function createSDQInterpretation(values, classifications, respondent) {
    const container = document.getElementById('sdq-interpretation');
    const classLabels = { normal: '✓ Unauffällig', borderline: '⚠ Grenzwertig', clinical: '⚠ Auffällig' };
    const classLabelsProsocial = { normal: '✓ Altersgemäß', borderline: '⚠ Leicht reduziert', clinical: '⚠ Deutlich reduziert' };

    let html = '';
    const problemScales = ['emotional', 'conduct', 'hyperactivity', 'peer'];

    problemScales.forEach(scale => {
        const desc = SDQ_DESCRIPTIONS[scale];
        const classification = classifications[scale];
        html += `
            <div class="interpretation-item ${classification}">
                <div class="scale-name">${desc.name}</div>
                <div class="scale-value">Wert: ${values[scale]}/10</div>
                <div class="scale-classification">${classLabels[classification]}</div>
                ${classification !== 'normal' ? `<p>${desc.high}</p>` : ''}
            </div>
        `;
    });

    // Prosozial
    const prosocialClass = classifications.prosocial;
    html += `
        <div class="interpretation-item ${prosocialClass}">
            <div class="scale-name">${SDQ_DESCRIPTIONS.prosocial.name}</div>
            <div class="scale-value">Wert: ${values.prosocial}/10</div>
            <div class="scale-classification">${classLabelsProsocial[prosocialClass]}</div>
        </div>
    `;

    // Empfehlungen
    const abnormalScales = problemScales.filter(s => classifications[s] !== 'normal');
    if (abnormalScales.length > 0) {
        html += '<div class="results-recommendations"><h4>Empfehlungen zur weiteren Diagnostik</h4><ul>';
        const recommendations = new Set();
        abnormalScales.forEach(scale => {
            SDQ_DESCRIPTIONS[scale].recommendations.forEach(r => recommendations.add(r));
        });
        recommendations.forEach(r => html += `<li>${r}</li>`);
        html += '</ul></div>';
    }

    container.innerHTML = html;
}

function clearSDQForm() {
    document.getElementById('sdq-form').reset();
    document.getElementById('sdq-results').style.display = 'none';
    ChartManager.destroy('sdq-chart');
}

function getSDQData() {
    const respondent = document.querySelector('input[name="sdq-respondent"]:checked')?.value || 'parent';
    const values = {
        emotional: parseInt(document.getElementById('sdq-emotional').value) || 0,
        conduct: parseInt(document.getElementById('sdq-conduct').value) || 0,
        hyperactivity: parseInt(document.getElementById('sdq-hyperactivity').value) || 0,
        peer: parseInt(document.getElementById('sdq-peer').value) || 0,
        prosocial: parseInt(document.getElementById('sdq-prosocial').value) || 0
    };
    const total = values.emotional + values.conduct + values.hyperactivity + values.peer;
    const classifications = {};
    Object.keys(values).forEach(key => {
        classifications[key] = classifySDQScore(key, values[key], respondent);
    });
    classifications.total = classifySDQScore('total', total, respondent);
    return { values, classifications, total, respondent };
}

function setSDQValues(data) {
    if (data.emotional !== undefined) document.getElementById('sdq-emotional').value = data.emotional;
    if (data.conduct !== undefined) document.getElementById('sdq-conduct').value = data.conduct;
    if (data.hyperactivity !== undefined) document.getElementById('sdq-hyperactivity').value = data.hyperactivity;
    if (data.peer !== undefined) document.getElementById('sdq-peer').value = data.peer;
    if (data.prosocial !== undefined) document.getElementById('sdq-prosocial').value = data.prosocial;
    if (data.respondent) {
        const radio = document.querySelector(`input[name="sdq-respondent"][value="${data.respondent}"]`);
        if (radio) radio.checked = true;
    }
}

// Event Listener
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('sdq-form');
    if (form) {
        form.addEventListener('submit', evaluateSDQ);
    }
});
