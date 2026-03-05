/**
 * AFS - Angstfragebogen für Schüler
 * Auswertungsmodul für schulbezogene Ängste
 */

const AFS_NORMS = {
    // Stanine-Klassifikation
    stanine: {
        veryLow: { range: [1, 1], label: 'Sehr niedrig', percentile: '< 4' },
        low: { range: [2, 3], label: 'Unterdurchschnittlich', percentile: '4-23' },
        average: { range: [4, 6], label: 'Durchschnittlich', percentile: '23-77' },
        high: { range: [7, 8], label: 'Überdurchschnittlich', percentile: '77-96' },
        veryHigh: { range: [9, 9], label: 'Sehr hoch', percentile: '> 96' }
    },
    // Prozentrang-basierte Klassifikation
    percentile: {
        veryLow: { range: [0, 3], label: 'Sehr niedrig' },
        low: { range: [4, 23], label: 'Unterdurchschnittlich' },
        average: { range: [24, 76], label: 'Durchschnittlich' },
        high: { range: [77, 96], label: 'Überdurchschnittlich' },
        veryHigh: { range: [97, 100], label: 'Sehr hoch' }
    }
};

const AFS_SCALES = {
    pa: {
        name: 'Prüfungsangst (PA)',
        fullName: 'Prüfungsangst',
        description: 'Angst vor Leistungssituationen, Klassenarbeiten und Prüfungen',
        items: 15,
        high: 'Deutlich erhöhte Prüfungsangst mit möglicher Leistungsbeeinträchtigung',
        low: 'Geringe Prüfungsangst, eventuell zu wenig Aktivierung',
        recommendations: [
            'Prüfungsangsttraining',
            'Lernstrategien verbessern',
            'Entspannungsverfahren',
            'Kognitive Umstrukturierung'
        ]
    },
    ma: {
        name: 'Manifeste Angst (MA)',
        fullName: 'Manifeste Angst',
        description: 'Allgemeine Ängstlichkeit mit körperlichen und psychischen Symptomen',
        items: 15,
        high: 'Erhöhte allgemeine Ängstlichkeit, mögliche Angststörung',
        low: 'Geringe manifeste Angst',
        recommendations: [
            'Angstdiagnostik vertiefen',
            'Entspannungstechniken',
            'Ggf. Psychotherapie',
            'Psychoedukation'
        ]
    },
    su: {
        name: 'Schulunlust (SU)',
        fullName: 'Schulunlust',
        description: 'Negative Einstellung zur Schule, Motivationsprobleme',
        items: 10,
        high: 'Deutliche Schulunlust, Motivationsprobleme, Schulvermeidung möglich',
        low: 'Hohe Schulzufriedenheit und Motivation',
        recommendations: [
            'Ursachenanalyse',
            'Motivationsförderung',
            'Schulische Unterstützung',
            'Soziale Integration prüfen'
        ]
    },
    se: {
        name: 'Soziale Erwünschtheit (SE)',
        fullName: 'Soziale Erwünschtheit',
        description: 'Tendenz, sich positiv darzustellen (Validitätsskala)',
        items: 10,
        high: 'Erhöhte soziale Erwünschtheit - Ergebnisse kritisch interpretieren',
        low: 'Geringe soziale Erwünschtheit - authentische Antworten',
        recommendations: [
            'Ergebnisse mit Vorsicht interpretieren',
            'Fremdbeurteilung heranziehen',
            'Verhaltensbeobachtung'
        ]
    }
};

function classifyAFSStanine(value) {
    for (const [key, data] of Object.entries(AFS_NORMS.stanine)) {
        if (value >= data.range[0] && value <= data.range[1]) {
            return { classification: key, label: data.label, percentile: data.percentile };
        }
    }
    return { classification: 'average', label: 'Durchschnittlich', percentile: '23-77' };
}

function classifyAFSPercentile(value) {
    for (const [key, data] of Object.entries(AFS_NORMS.percentile)) {
        if (value >= data.range[0] && value <= data.range[1]) {
            return { classification: key, label: data.label };
        }
    }
    return { classification: 'average', label: 'Durchschnittlich' };
}

function evaluateAFS(event) {
    if (event) event.preventDefault();

    const inputType = document.querySelector('input[name="afs-input-type"]:checked')?.value || 'stanine';

    // Werte einlesen
    const values = {
        pa: parseFloat(document.getElementById('afs-pa').value) || null,
        ma: parseFloat(document.getElementById('afs-ma').value) || null,
        su: parseFloat(document.getElementById('afs-su').value) || null,
        se: parseFloat(document.getElementById('afs-se').value) || null
    };

    // Rohwerte einlesen (falls vorhanden)
    const rawValues = {
        pa: parseInt(document.getElementById('afs-pa-raw')?.value) || null,
        ma: parseInt(document.getElementById('afs-ma-raw')?.value) || null,
        su: parseInt(document.getElementById('afs-su-raw')?.value) || null,
        se: parseInt(document.getElementById('afs-se-raw')?.value) || null
    };

    // Validierung
    let hasData = false;
    for (const val of Object.values(values)) {
        if (val !== null) {
            hasData = true;
            if (inputType === 'stanine' && (val < 1 || val > 9)) {
                alert('Stanine-Werte müssen zwischen 1 und 9 liegen.');
                return;
            }
            if (inputType === 'percentile' && (val < 0 || val > 100)) {
                alert('Prozentränge müssen zwischen 0 und 100 liegen.');
                return;
            }
        }
    }

    if (!hasData) {
        alert('Bitte geben Sie mindestens einen Skalenwert ein.');
        return;
    }

    // Klassifikationen berechnen
    const classifyFn = inputType === 'stanine' ? classifyAFSStanine : classifyAFSPercentile;
    const classifications = {};

    Object.entries(values).forEach(([key, value]) => {
        if (value !== null) {
            classifications[key] = classifyFn(value);
        }
    });

    // Charts erstellen
    createAFSChart(values, classifications, inputType);

    // Zusammenfassung und Interpretation
    createAFSSummary(values, classifications, inputType);
    createAFSInterpretation(values, classifications, inputType, rawValues);

    // Ergebnisse anzeigen
    document.getElementById('afs-results').style.display = 'block';
    document.getElementById('afs-results').scrollIntoView({ behavior: 'smooth' });

    // Im Fall speichern
    if (CaseManager.currentCase) {
        CaseManager.saveTestResults('afs', { values, rawValues, classifications, inputType });
    }
}

function createAFSChart(values, classifications, inputType) {
    const validScales = Object.entries(values).filter(([k, v]) => v !== null);
    if (validScales.length === 0) return;

    const labels = validScales.map(([k]) => AFS_SCALES[k].name);
    const chartValues = validScales.map(([k, v]) => v);
    const classKeys = validScales.map(([k]) => {
        const c = classifications[k].classification;
        // Für PA, MA, SU: hoch = problematisch
        if (k !== 'se') {
            if (c === 'veryHigh' || c === 'high') return 'clinical';
            if (c === 'veryLow' || c === 'low') return 'normal';
        } else {
            // Für SE: hoch = Validitätsproblem
            if (c === 'veryHigh' || c === 'high') return 'borderline';
        }
        return 'normal';
    });

    ChartManager.createProfileChart('afs-chart', labels, {
        values: chartValues,
        colors: ChartManager.getClassificationColors(classKeys),
        borderColors: ChartManager.getClassificationBorderColors(classKeys)
    }, {
        title: 'AFS Angstprofil',
        yMin: inputType === 'stanine' ? 1 : 0,
        yMax: inputType === 'stanine' ? 9 : 100,
        yLabel: inputType === 'stanine' ? 'Stanine (1-9)' : 'Prozentrang',
        referenceLines: inputType === 'stanine' ? [
            { value: 5, color: 'rgba(0, 0, 0, 0.3)', label: 'Mittelwert' },
            { value: 7, color: 'rgba(207, 34, 46, 0.3)', label: 'Erhöht' }
        ] : [
            { value: 50, color: 'rgba(0, 0, 0, 0.3)', label: 'Mittelwert' },
            { value: 84, color: 'rgba(207, 34, 46, 0.3)', label: 'Erhöht' }
        ]
    });
}

function createAFSSummary(values, classifications, inputType) {
    const container = document.getElementById('afs-summary');
    let html = '';

    // Hauptskalen anzeigen
    const mainScales = ['pa', 'ma', 'su'];

    mainScales.forEach(key => {
        if (values[key] === null) return;

        const scaleInfo = AFS_SCALES[key];
        const classification = classifications[key];
        const isHigh = classification.classification === 'veryHigh' || classification.classification === 'high';

        const colorClass = isHigh ? 'clinical' : 'normal';

        html += `
            <div class="summary-card ${colorClass}">
                <div class="summary-label">${scaleInfo.name}</div>
                <div class="summary-value">${values[key]}</div>
                <div class="summary-classification">${classification.label}</div>
            </div>
        `;
    });

    // SE separat (Validitätsskala)
    if (values.se !== null) {
        const seClass = classifications.se;
        const isHigh = seClass.classification === 'veryHigh' || seClass.classification === 'high';

        html += `
            <div class="summary-card ${isHigh ? 'borderline' : ''}">
                <div class="summary-label">Soziale Erwünschtheit</div>
                <div class="summary-value">${values.se}</div>
                <div class="summary-classification">${seClass.label}</div>
                ${isHigh ? '<small style="color: var(--color-warning);">⚠ Validität prüfen</small>' : ''}
            </div>
        `;
    }

    container.innerHTML = html;
}

function createAFSInterpretation(values, classifications, inputType, rawValues) {
    const container = document.getElementById('afs-interpretation');
    let html = '';
    const recommendations = new Set();

    // Validitätsprüfung zuerst
    if (values.se !== null) {
        const seClass = classifications.se;
        const seHigh = seClass.classification === 'veryHigh' || seClass.classification === 'high';

        if (seHigh) {
            html += `
                <div class="interpretation-item borderline">
                    <div class="scale-name">⚠ Hinweis zur Validität</div>
                    <p>Die Skala "Soziale Erwünschtheit" zeigt einen erhöhten Wert (${inputType === 'stanine' ? 'Stanine' : 'PR'} = ${values.se}).
                    Dies deutet auf eine Tendenz hin, sich positiv darzustellen.
                    Die anderen Skalenwerte sollten unter diesem Vorbehalt interpretiert werden.</p>
                </div>
            `;
            AFS_SCALES.se.recommendations.forEach(r => recommendations.add(r));
        }
    }

    // Hauptskalen interpretieren
    ['pa', 'ma', 'su'].forEach(key => {
        if (values[key] === null) return;

        const scaleInfo = AFS_SCALES[key];
        const classification = classifications[key];
        const isHigh = classification.classification === 'veryHigh' || classification.classification === 'high';
        const isLow = classification.classification === 'veryLow' || classification.classification === 'low';

        const colorClass = isHigh ? 'clinical' : 'normal';

        html += `
            <div class="interpretation-item ${colorClass}">
                <div class="scale-name">${scaleInfo.fullName}</div>
                <div class="scale-value">${inputType === 'stanine' ? 'Stanine' : 'PR'} = ${values[key]} | ${classification.label}</div>
                <p>${scaleInfo.description}</p>
                ${isHigh ? `<p class="interpretation-note">${scaleInfo.high}</p>` : ''}
                ${isLow && scaleInfo.low ? `<p class="interpretation-note">${scaleInfo.low}</p>` : ''}
            </div>
        `;

        if (isHigh) {
            scaleInfo.recommendations.forEach(r => recommendations.add(r));
        }
    });

    // Gesamtinterpretation
    const highScales = ['pa', 'ma', 'su'].filter(k =>
        values[k] !== null &&
        (classifications[k].classification === 'veryHigh' || classifications[k].classification === 'high')
    );

    if (highScales.length > 0) {
        html += `
            <div class="interpretation-item">
                <div class="scale-name">Zusammenfassende Einschätzung</div>
                <p><strong>${highScales.length === 1 ? 'Eine Skala zeigt' : `${highScales.length} Skalen zeigen`} erhöhte Werte:</strong></p>
                <ul>
                    ${highScales.map(k => `<li>${AFS_SCALES[k].fullName}</li>`).join('')}
                </ul>
                <p>Es wird empfohlen, die Befunde im Kontext weiterer diagnostischer Informationen zu bewerten
                und entsprechende Förder- oder Interventionsmaßnahmen zu prüfen.</p>
            </div>
        `;
    } else if (Object.values(values).some(v => v !== null)) {
        html += `
            <div class="interpretation-item normal">
                <div class="scale-name">Zusammenfassende Einschätzung</div>
                <p>Die Ergebnisse zeigen keine auffällig erhöhten Werte in den schulbezogenen Angstskalen.
                Das Angsterleben des Schülers/der Schülerin liegt im durchschnittlichen Bereich.</p>
            </div>
        `;
    }

    // Empfehlungen
    if (recommendations.size > 0) {
        html += '<div class="results-recommendations"><h4>Empfehlungen</h4><ul>';
        recommendations.forEach(r => html += `<li>${r}</li>`);
        html += '</ul></div>';
    }

    container.innerHTML = html;
}

function clearAFSForm() {
    document.getElementById('afs-form').reset();
    document.getElementById('afs-results').style.display = 'none';
    ChartManager.destroy('afs-chart');
}

function getAFSData() {
    const inputType = document.querySelector('input[name="afs-input-type"]:checked')?.value || 'stanine';

    const values = {
        pa: parseFloat(document.getElementById('afs-pa').value) || null,
        ma: parseFloat(document.getElementById('afs-ma').value) || null,
        su: parseFloat(document.getElementById('afs-su').value) || null,
        se: parseFloat(document.getElementById('afs-se').value) || null
    };

    const classifyFn = inputType === 'stanine' ? classifyAFSStanine : classifyAFSPercentile;
    const classifications = {};

    Object.entries(values).forEach(([key, value]) => {
        if (value !== null) {
            classifications[key] = classifyFn(value);
        }
    });

    return { values, classifications, inputType };
}

function setAFSValues(data) {
    if (data.pa !== undefined) document.getElementById('afs-pa').value = data.pa;
    if (data.ma !== undefined) document.getElementById('afs-ma').value = data.ma;
    if (data.su !== undefined) document.getElementById('afs-su').value = data.su;
    if (data.se !== undefined) document.getElementById('afs-se').value = data.se;
    if (data.inputType) {
        const radio = document.querySelector(`input[name="afs-input-type"][value="${data.inputType}"]`);
        if (radio) radio.checked = true;
    }
}

// Event Listener
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('afs-form');
    if (form) {
        form.addEventListener('submit', evaluateAFS);
    }
});
