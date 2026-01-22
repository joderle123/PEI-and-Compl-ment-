/**
 * d2-R - Aufmerksamkeits- und Konzentrationstest (Revision)
 * Auswertungsmodul für Konzentrationsleistung
 */

const D2R_NORMS = {
    // Prozentrang-Klassifikation
    percentile: {
        veryLow: { range: [0, 2], label: 'Weit unterdurchschnittlich' },
        low: { range: [3, 15], label: 'Unterdurchschnittlich' },
        lowAverage: { range: [16, 24], label: 'Niedrig durchschnittlich' },
        average: { range: [25, 75], label: 'Durchschnittlich' },
        highAverage: { range: [76, 84], label: 'Hoch durchschnittlich' },
        high: { range: [85, 97], label: 'Überdurchschnittlich' },
        veryHigh: { range: [98, 100], label: 'Weit überdurchschnittlich' }
    },
    // Standardwert-Klassifikation (M=100, SD=10)
    standardScore: {
        veryLow: { range: [0, 69], label: 'Weit unterdurchschnittlich' },
        low: { range: [70, 84], label: 'Unterdurchschnittlich' },
        lowAverage: { range: [85, 89], label: 'Niedrig durchschnittlich' },
        average: { range: [90, 109], label: 'Durchschnittlich' },
        highAverage: { range: [110, 114], label: 'Hoch durchschnittlich' },
        high: { range: [115, 129], label: 'Überdurchschnittlich' },
        veryHigh: { range: [130, 160], label: 'Weit überdurchschnittlich' }
    }
};

const D2R_SCALES = {
    bz: {
        name: 'Bearbeitete Zielzeichen (BZ)',
        fullName: 'Bearbeitete Zielzeichen',
        description: 'Anzahl der korrekt bearbeiteten Zielreize (d mit 2 Strichen)',
        interpretation: 'Maß für die Konzentriertheit und Bearbeitungsgeschwindigkeit bei relevanten Reizen',
        low: 'Verlangsamte Bearbeitung relevanter Reize, möglicherweise erhöhte Sorgfalt oder Unsicherheit',
        high: 'Schnelle und akkurate Bearbeitung der Zielreize',
        recommendations: ['Tempotraining', 'Aufmerksamkeitsübungen', 'Arbeitstempo steigern']
    },
    kl: {
        name: 'Konzentrationsleistung (KL)',
        fullName: 'Konzentrationsleistung',
        description: 'BZ minus Verwechslungsfehler - Hauptkennwert der Konzentrationsfähigkeit',
        interpretation: 'Zentraler Indikator für die Konzentrationsleistung unter Berücksichtigung der Fehler',
        low: 'Eingeschränkte Konzentrationsleistung, mögliche Aufmerksamkeitsstörung',
        high: 'Sehr gute Konzentrationsleistung',
        recommendations: ['ADHS-Diagnostik erwägen', 'Konzentrationstraining', 'Arbeitsplatzgestaltung']
    },
    f: {
        name: 'Fehler gesamt (F)',
        fullName: 'Gesamtfehlerzahl',
        description: 'Summe aus Auslassungsfehlern (F1) und Verwechslungsfehlern (F2)',
        interpretation: 'Indikator für die Sorgfalt und Genauigkeit bei der Bearbeitung',
        low: 'Sehr sorgfältige Arbeitsweise',
        high: 'Erhöhte Fehlerrate, möglicherweise Impulsivität oder Unaufmerksamkeit',
        recommendations: ['Genauigkeitstraining', 'Selbstkontrollstrategien', 'Impulskontrolle']
    },
    f1: {
        name: 'Auslassungsfehler (F1)',
        fullName: 'Auslassungsfehler',
        description: 'Nicht bearbeitete Zielreize (übersehene d mit 2 Strichen)',
        interpretation: 'Hinweis auf Unaufmerksamkeit oder flüchtige Bearbeitung',
        low: 'Kaum Zielreize übersehen',
        high: 'Viele Zielreize übersehen, mögliche Unaufmerksamkeit',
        recommendations: ['Aufmerksamkeitstraining', 'Selbstinstruktion']
    },
    f2: {
        name: 'Verwechslungsfehler (F2)',
        fullName: 'Verwechslungsfehler',
        description: 'Fälschlich bearbeitete Distraktoren (p oder d mit anderem Strichbild)',
        interpretation: 'Hinweis auf Impulsivität oder mangelnde Diskrimination',
        low: 'Gute Unterscheidung zwischen Ziel- und Distraktorreizen',
        high: 'Häufige Verwechslungen, mögliche Impulsivität',
        recommendations: ['Impulskontrolltraining', 'Unterscheidungsübungen']
    },
    fp: {
        name: 'Fehlerprozent (F%)',
        fullName: 'Fehlerprozent',
        description: 'Prozentualer Anteil der Fehler an der Gesamtbearbeitung',
        interpretation: 'Relativer Fehlerindex unabhängig vom Arbeitstempo',
        low: 'Sehr geringe Fehlerquote',
        high: 'Erhöhte Fehlerquote relativ zur Bearbeitungsmenge',
        recommendations: ['Genauigkeit vor Geschwindigkeit', 'Selbstkontrolle üben']
    },
    sb: {
        name: 'Schwankungsbreite (SB)',
        fullName: 'Schwankungsbreite',
        description: 'Variabilität der Leistung über die Testzeit (Differenz Max-Min pro Zeile)',
        interpretation: 'Indikator für die Konstanz der Aufmerksamkeit',
        low: 'Sehr gleichmäßige Leistung',
        high: 'Starke Leistungsschwankungen, inkonstante Aufmerksamkeit',
        recommendations: ['Aufmerksamkeitsspanne trainieren', 'Pausen einplanen']
    }
};

function classifyD2RPercentile(value) {
    for (const [key, data] of Object.entries(D2R_NORMS.percentile)) {
        if (value >= data.range[0] && value <= data.range[1]) {
            return { classification: key, label: data.label };
        }
    }
    return { classification: 'average', label: 'Durchschnittlich' };
}

function classifyD2RStandardScore(value) {
    for (const [key, data] of Object.entries(D2R_NORMS.standardScore)) {
        if (value >= data.range[0] && value <= data.range[1]) {
            return { classification: key, label: data.label };
        }
    }
    return { classification: 'average', label: 'Durchschnittlich' };
}

function evaluateD2R(event) {
    if (event) event.preventDefault();

    const inputType = document.querySelector('input[name="d2r-input-type"]:checked')?.value || 'percentile';

    // Hauptkennwerte einlesen
    const values = {
        bz: parseFloat(document.getElementById('d2r-bz').value) || null,
        kl: parseFloat(document.getElementById('d2r-kl').value) || null,
        f: parseFloat(document.getElementById('d2r-f').value) || null,
        fp: parseFloat(document.getElementById('d2r-fp').value) || null,
        sb: parseFloat(document.getElementById('d2r-sb').value) || null
    };

    // Zusätzliche Fehleraufschlüsselung (optional)
    const additionalValues = {
        f1: parseFloat(document.getElementById('d2r-f1')?.value) || null,
        f2: parseFloat(document.getElementById('d2r-f2')?.value) || null
    };

    // Rohwerte (optional, für Dokumentation)
    const rawValues = {
        bz: parseInt(document.getElementById('d2r-bz-raw')?.value) || null,
        kl: parseInt(document.getElementById('d2r-kl-raw')?.value) || null,
        f: parseInt(document.getElementById('d2r-f-raw')?.value) || null
    };

    // Validierung
    let hasData = false;
    const allValues = { ...values, ...additionalValues };
    for (const val of Object.values(allValues)) {
        if (val !== null) {
            hasData = true;
            if (inputType === 'percentile' && (val < 0 || val > 100)) {
                alert('Prozentränge müssen zwischen 0 und 100 liegen.');
                return;
            }
            if (inputType === 'standard' && (val < 40 || val > 160)) {
                alert('Standardwerte müssen zwischen 40 und 160 liegen.');
                return;
            }
        }
    }

    if (!hasData) {
        alert('Bitte geben Sie mindestens einen Kennwert ein.');
        return;
    }

    // Klassifikationen berechnen
    const classifyFn = inputType === 'percentile' ? classifyD2RPercentile : classifyD2RStandardScore;
    const classifications = {};

    Object.entries(allValues).forEach(([key, value]) => {
        if (value !== null) {
            classifications[key] = classifyFn(value);
        }
    });

    // Charts erstellen
    createD2RChart(values, classifications, inputType);

    // Zusammenfassung und Interpretation
    createD2RSummary(values, classifications, inputType);
    createD2RInterpretation(values, additionalValues, classifications, inputType, rawValues);

    // Ergebnisse anzeigen
    document.getElementById('d2r-results').style.display = 'block';
    document.getElementById('d2r-results').scrollIntoView({ behavior: 'smooth' });

    // Im Fall speichern
    if (CaseManager.currentCase) {
        CaseManager.saveTestResults('d2r', { values, additionalValues, rawValues, classifications, inputType });
    }
}

function createD2RChart(values, classifications, inputType) {
    const validScales = Object.entries(values).filter(([k, v]) => v !== null);
    if (validScales.length === 0) return;

    const labels = validScales.map(([k]) => D2R_SCALES[k].name);
    const chartValues = validScales.map(([k, v]) => v);

    // Farbzuweisung: Bei BZ und KL ist niedrig = problematisch, bei F, F%, SB ist hoch = problematisch
    const classKeys = validScales.map(([k]) => {
        const c = classifications[k].classification;
        const isQuantityScale = ['bz', 'kl'].includes(k);
        const isErrorScale = ['f', 'fp', 'sb', 'f1', 'f2'].includes(k);

        if (isQuantityScale) {
            // Für Leistungsskalen: niedrig = schlecht
            if (c === 'veryLow' || c === 'low') return 'clinical';
            if (c === 'lowAverage') return 'borderline';
            return 'normal';
        } else if (isErrorScale) {
            // Für Fehlerskalen: hoch = schlecht (aber Prozentränge sind invertiert im d2-R)
            // Bei hohem PR für Fehler = wenig Fehler = gut
            if (c === 'veryLow' || c === 'low') return 'clinical';
            if (c === 'lowAverage') return 'borderline';
            return 'normal';
        }
        return 'normal';
    });

    ChartManager.createProfileChart('d2r-chart', labels, {
        values: chartValues,
        colors: ChartManager.getClassificationColors(classKeys),
        borderColors: ChartManager.getClassificationBorderColors(classKeys)
    }, {
        title: 'd2-R Aufmerksamkeitsprofil',
        yMin: inputType === 'percentile' ? 0 : 40,
        yMax: inputType === 'percentile' ? 100 : 160,
        yLabel: inputType === 'percentile' ? 'Prozentrang' : 'Standardwert',
        referenceLines: inputType === 'percentile' ? [
            { value: 50, color: 'rgba(0, 0, 0, 0.3)', label: 'Mittelwert' },
            { value: 16, color: 'rgba(207, 34, 46, 0.3)', label: 'Auffällig' }
        ] : [
            { value: 100, color: 'rgba(0, 0, 0, 0.3)', label: 'Mittelwert' },
            { value: 85, color: 'rgba(207, 34, 46, 0.3)', label: '-1 SD' }
        ]
    });
}

function createD2RSummary(values, classifications, inputType) {
    const container = document.getElementById('d2r-summary');
    let html = '';

    // Konzentrationsleistung als Hauptkennwert
    if (values.kl !== null) {
        const klClass = classifications.kl;
        const isLow = klClass.classification === 'veryLow' || klClass.classification === 'low' || klClass.classification === 'lowAverage';
        const colorClass = klClass.classification === 'veryLow' || klClass.classification === 'low' ? 'clinical' :
                          klClass.classification === 'lowAverage' ? 'borderline' : 'normal';

        html += `
            <div class="summary-card ${colorClass}">
                <div class="summary-label">Konzentrationsleistung</div>
                <div class="summary-value">${values.kl}</div>
                <div class="summary-classification">${klClass.label}</div>
            </div>
        `;
    }

    // Bearbeitete Zielzeichen
    if (values.bz !== null) {
        const bzClass = classifications.bz;
        const colorClass = bzClass.classification === 'veryLow' || bzClass.classification === 'low' ? 'clinical' :
                          bzClass.classification === 'lowAverage' ? 'borderline' : 'normal';

        html += `
            <div class="summary-card ${colorClass}">
                <div class="summary-label">Bearbeitete Zielzeichen</div>
                <div class="summary-value">${values.bz}</div>
                <div class="summary-classification">${bzClass.label}</div>
            </div>
        `;
    }

    // Fehler
    if (values.f !== null) {
        const fClass = classifications.f;
        // Bei d2-R: hoher PR bei F = wenig Fehler = gut
        const colorClass = fClass.classification === 'veryLow' || fClass.classification === 'low' ? 'clinical' :
                          fClass.classification === 'lowAverage' ? 'borderline' : 'normal';

        html += `
            <div class="summary-card ${colorClass}">
                <div class="summary-label">Fehler</div>
                <div class="summary-value">${values.f}</div>
                <div class="summary-classification">${fClass.label}</div>
            </div>
        `;
    }

    // Schwankungsbreite
    if (values.sb !== null) {
        const sbClass = classifications.sb;
        const colorClass = sbClass.classification === 'veryLow' || sbClass.classification === 'low' ? 'clinical' :
                          sbClass.classification === 'lowAverage' ? 'borderline' : 'normal';

        html += `
            <div class="summary-card ${colorClass}">
                <div class="summary-label">Schwankungsbreite</div>
                <div class="summary-value">${values.sb}</div>
                <div class="summary-classification">${sbClass.label}</div>
            </div>
        `;
    }

    container.innerHTML = html;
}

function createD2RInterpretation(values, additionalValues, classifications, inputType, rawValues) {
    const container = document.getElementById('d2r-interpretation');
    let html = '';
    const recommendations = new Set();

    const valueLabel = inputType === 'percentile' ? 'PR' : 'SW';

    // Detaillierte Interpretation der Kennwerte
    const allValues = { ...values, ...additionalValues };

    Object.entries(allValues).forEach(([key, value]) => {
        if (value === null || !D2R_SCALES[key]) return;

        const scaleInfo = D2R_SCALES[key];
        const classification = classifications[key];

        const isQuantityScale = ['bz', 'kl'].includes(key);
        const isLow = classification.classification === 'veryLow' || classification.classification === 'low' || classification.classification === 'lowAverage';
        const isHigh = classification.classification === 'veryHigh' || classification.classification === 'high' || classification.classification === 'highAverage';

        let colorClass = 'normal';
        let interpretationNote = '';

        if (isQuantityScale) {
            // Leistungskennwerte: niedrig = problematisch
            if (classification.classification === 'veryLow' || classification.classification === 'low') {
                colorClass = 'clinical';
                interpretationNote = scaleInfo.low;
                scaleInfo.recommendations?.forEach(r => recommendations.add(r));
            } else if (classification.classification === 'lowAverage') {
                colorClass = 'borderline';
                interpretationNote = scaleInfo.low;
            } else if (isHigh) {
                interpretationNote = scaleInfo.high;
            }
        } else {
            // Fehler/Variabilität: Bei d2-R-Normen bedeutet niedriger PR = viele Fehler = schlecht
            if (isLow) {
                colorClass = 'clinical';
                interpretationNote = scaleInfo.high; // Bei Fehlern ist "hoch" die Beschreibung für viele Fehler
                scaleInfo.recommendations?.forEach(r => recommendations.add(r));
            }
        }

        html += `
            <div class="interpretation-item ${colorClass}">
                <div class="scale-name">${scaleInfo.fullName}</div>
                <div class="scale-value">${valueLabel} = ${value} | ${classification.label}</div>
                <p>${scaleInfo.interpretation}</p>
                ${interpretationNote ? `<p class="interpretation-note">${interpretationNote}</p>` : ''}
            </div>
        `;
    });

    // Profilanalyse
    if (values.kl !== null && values.f !== null) {
        const klClass = classifications.kl;
        const fClass = classifications.f;

        const klLow = klClass.classification === 'veryLow' || klClass.classification === 'low' || klClass.classification === 'lowAverage';
        const fLow = fClass.classification === 'veryLow' || fClass.classification === 'low' || fClass.classification === 'lowAverage';

        html += '<div class="interpretation-item"><div class="scale-name">Profilanalyse</div>';

        if (klLow && fLow) {
            html += '<p><strong>Tempo-Genauigkeits-Profil:</strong> Sowohl die Konzentrationsleistung als auch die Fehlerquote zeigen Auffälligkeiten. Dies deutet auf generelle Aufmerksamkeitsprobleme hin.</p>';
        } else if (klLow && !fLow) {
            html += '<p><strong>Tempo-Genauigkeits-Profil:</strong> Die Konzentrationsleistung ist reduziert bei akzeptabler Fehlerquote. Dies spricht für ein verlangsamtes, aber sorgfältiges Arbeitstempo.</p>';
        } else if (!klLow && fLow) {
            html += '<p><strong>Tempo-Genauigkeits-Profil:</strong> Gute Konzentrationsleistung, aber erhöhte Fehlerquote. Dies deutet auf ein schnelles, aber ungenaues Arbeiten (möglicherweise impulsiv) hin.</p>';
        } else {
            html += '<p><strong>Tempo-Genauigkeits-Profil:</strong> Sowohl die Konzentrationsleistung als auch die Genauigkeit liegen im Normbereich. Die Aufmerksamkeitsleistung ist unauffällig.</p>';
        }

        html += '</div>';
    }

    // Schwankungsbreite interpretieren
    if (values.sb !== null) {
        const sbLow = classifications.sb.classification === 'veryLow' || classifications.sb.classification === 'low' || classifications.sb.classification === 'lowAverage';

        if (sbLow) {
            html += `
                <div class="interpretation-item borderline">
                    <div class="scale-name">Aufmerksamkeitskonstanz</div>
                    <p>Die erhöhte Schwankungsbreite weist auf eine inkonstante Aufmerksamkeitsleistung hin.
                    Die Leistung variiert über die Testzeit hinweg deutlich. Dies kann auf Ermüdung,
                    motivationale Faktoren oder Aufmerksamkeitsschwankungen hindeuten.</p>
                </div>
            `;
        }
    }

    // Empfehlungen
    if (recommendations.size > 0) {
        html += '<div class="results-recommendations"><h4>Empfehlungen</h4><ul>';
        recommendations.forEach(r => html += `<li>${r}</li>`);
        html += '</ul></div>';
    }

    container.innerHTML = html;
}

function clearD2RForm() {
    document.getElementById('d2r-form').reset();
    document.getElementById('d2r-results').style.display = 'none';
    ChartManager.destroy('d2r-chart');
}

function getD2RData() {
    const inputType = document.querySelector('input[name="d2r-input-type"]:checked')?.value || 'percentile';

    const values = {
        bz: parseFloat(document.getElementById('d2r-bz').value) || null,
        kl: parseFloat(document.getElementById('d2r-kl').value) || null,
        f: parseFloat(document.getElementById('d2r-f').value) || null,
        fp: parseFloat(document.getElementById('d2r-fp').value) || null,
        sb: parseFloat(document.getElementById('d2r-sb').value) || null
    };

    const classifyFn = inputType === 'percentile' ? classifyD2RPercentile : classifyD2RStandardScore;
    const classifications = {};

    Object.entries(values).forEach(([key, value]) => {
        if (value !== null) {
            classifications[key] = classifyFn(value);
        }
    });

    return { values, classifications, inputType };
}

function setD2RValues(data) {
    if (data.bz !== undefined) document.getElementById('d2r-bz').value = data.bz;
    if (data.kl !== undefined) document.getElementById('d2r-kl').value = data.kl;
    if (data.f !== undefined) document.getElementById('d2r-f').value = data.f;
    if (data.fp !== undefined) document.getElementById('d2r-fp').value = data.fp;
    if (data.sb !== undefined) document.getElementById('d2r-sb').value = data.sb;
    if (data.inputType) {
        const radio = document.querySelector(`input[name="d2r-input-type"][value="${data.inputType}"]`);
        if (radio) radio.checked = true;
    }
}

// Event Listener
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('d2r-form');
    if (form) {
        form.addEventListener('submit', evaluateD2R);
    }
});
