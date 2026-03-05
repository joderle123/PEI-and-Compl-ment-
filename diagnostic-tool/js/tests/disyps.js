/**
 * DISYPS-III - Diagnostik-System für psychische Störungen
 * Auswertungsmodul für ADHS und Störungen des Sozialverhaltens
 */

const DISYPS_NORMS = {
    // Stanine-Klassifikation
    stanine: {
        veryLow: { range: [1, 1], label: 'Weit unterdurchschnittlich', percentile: '< 4' },
        low: { range: [2, 3], label: 'Unterdurchschnittlich', percentile: '4-23' },
        average: { range: [4, 6], label: 'Durchschnittlich', percentile: '23-77' },
        high: { range: [7, 8], label: 'Überdurchschnittlich', percentile: '77-96' },
        veryHigh: { range: [9, 9], label: 'Weit überdurchschnittlich', percentile: '> 96' }
    },
    // Prozentrang-Klassifikation für klinische Auffälligkeit
    percentile: {
        normal: { range: [0, 84], label: 'Unauffällig' },
        borderline: { range: [85, 92], label: 'Grenzwertig' },
        clinical: { range: [93, 100], label: 'Klinisch auffällig' }
    }
};

const DISYPS_SCALES = {
    // ADHS-Skalen (FBB-ADHS / SBB-ADHS)
    adhs: {
        inattention: {
            name: 'Unaufmerksamkeit',
            dsm: 'ADHS-Unaufmerksamkeitstypus',
            description: 'Konzentrationsprobleme, Ablenkbarkeit, Vergesslichkeit',
            high: 'Deutliche Hinweise auf Aufmerksamkeitsprobleme im Sinne einer ADHS',
            recommendations: ['ADHS-spezifische Diagnostik', 'Neuropsychologische Testung', 'Verhaltensbeobachtung']
        },
        hyperactivity: {
            name: 'Überaktivität',
            dsm: 'ADHS-Hyperaktivitäts-Impulsivitätstypus',
            description: 'Motorische Unruhe, Zappeligkeit, übermäßiges Reden',
            high: 'Deutliche motorische Überaktivität',
            recommendations: ['Bewegungsangebote', 'Strukturierung', 'Ggf. medikamentöse Behandlung']
        },
        impulsivity: {
            name: 'Impulsivität',
            dsm: 'ADHS-Hyperaktivitäts-Impulsivitätstypus',
            description: 'Vorschnelles Handeln, Unterbrechen, mangelnde Selbstkontrolle',
            high: 'Deutliche impulsive Verhaltensweisen',
            recommendations: ['Impulskontrolltraining', 'Selbstinstruktionstraining']
        },
        adhsTotal: {
            name: 'ADHS-Gesamtwert',
            dsm: 'ADHS-Kombinierter Typus',
            description: 'Gesamtmaß der ADHS-Symptomatik',
            high: 'Klinisch bedeutsame ADHS-Symptomatik',
            recommendations: ['Multimodale ADHS-Therapie', 'Elterntraining', 'Schulische Unterstützung']
        }
    },

    // Störungen des Sozialverhaltens (FBB-SSV / SBB-SSV)
    ssv: {
        oppositional: {
            name: 'Oppositionelles Verhalten',
            dsm: 'Störung mit Oppositionellem Trotzverhalten (ODD)',
            description: 'Widerspruch, Wutausbrüche, Ärgern anderer',
            high: 'Deutliches oppositionell-trotziges Verhalten',
            recommendations: ['Elterntraining', 'Konsequenzmanagement', 'Beziehungsarbeit']
        },
        aggressive: {
            name: 'Aggressiv-dissoziales Verhalten',
            dsm: 'Störung des Sozialverhaltens (CD)',
            description: 'Aggression gegen Personen/Tiere, Zerstörung, Betrug, Regelverletzungen',
            high: 'Deutliche dissoziale Verhaltensweisen',
            recommendations: ['SSV-spezifische Intervention', 'Multisystemische Therapie', 'Jugendhilfemaßnahmen']
        },
        limitedProsocial: {
            name: 'Begrenzte prosoziale Emotionalität',
            dsm: 'SSV mit begrenzter prosozialer Emotionalität (CU-Traits)',
            description: 'Mangel an Reue, Gefühlskälte, geringe Empathie',
            high: 'Hinweise auf Callous-Unemotional Traits',
            recommendations: ['Spezialisierte Intervention', 'Empathieförderung', 'Psychiatrische Mitbehandlung']
        },
        ssvTotal: {
            name: 'SSV-Gesamtwert',
            dsm: 'Störung des Sozialverhaltens gesamt',
            description: 'Gesamtmaß der externalisierenden Verhaltensprobleme',
            high: 'Klinisch bedeutsame Störung des Sozialverhaltens',
            recommendations: ['Umfassende Intervention', 'Systemische Arbeit', 'Langfristige Begleitung']
        }
    },

    // Angststörungen (FBB-ANZ / SBB-ANZ)
    anxiety: {
        separation: {
            name: 'Trennungsangst',
            dsm: 'Störung mit Trennungsangst',
            description: 'Übermäßige Angst bei Trennung von Bezugspersonen',
            high: 'Klinisch relevante Trennungsängste',
            recommendations: ['Expositionstherapie', 'Elternberatung', 'Graduierte Annäherung']
        },
        generalized: {
            name: 'Generalisierte Angst',
            dsm: 'Generalisierte Angststörung',
            description: 'Übermäßige Sorgen, Anspannung, Unruhe',
            high: 'Hinweise auf generalisierte Ängste',
            recommendations: ['Kognitive Verhaltenstherapie', 'Entspannungsverfahren']
        },
        social: {
            name: 'Soziale Angst',
            dsm: 'Soziale Angststörung',
            description: 'Angst vor sozialen Situationen und Bewertung',
            high: 'Klinisch relevante soziale Ängste',
            recommendations: ['Soziales Kompetenztraining', 'Expositionsübungen']
        },
        specific: {
            name: 'Spezifische Phobien',
            dsm: 'Spezifische Phobie',
            description: 'Übermäßige Angst vor spezifischen Objekten/Situationen',
            high: 'Klinisch relevante spezifische Ängste',
            recommendations: ['Systematische Desensibilisierung', 'Konfrontation in vivo']
        }
    },

    // Depressive Störungen (FBB-DES / SBB-DES)
    depression: {
        depressedMood: {
            name: 'Depressive Verstimmung',
            dsm: 'Major Depression',
            description: 'Traurigkeit, Niedergeschlagenheit, Hoffnungslosigkeit',
            high: 'Deutliche depressive Symptomatik',
            recommendations: ['Kognitive Verhaltenstherapie', 'Aktivitätsaufbau', 'Ggf. Pharmakotherapie']
        },
        anhedonia: {
            name: 'Interessenverlust',
            dsm: 'Major Depression',
            description: 'Verlust von Freude und Interesse',
            high: 'Anhedonie als Kernsymptom',
            recommendations: ['Aktivitätsplanung', 'Verstärkeranalyse']
        }
    }
};

function classifyStanine(value) {
    for (const [key, data] of Object.entries(DISYPS_NORMS.stanine)) {
        if (value >= data.range[0] && value <= data.range[1]) {
            return { classification: key, label: data.label, percentile: data.percentile };
        }
    }
    return { classification: 'average', label: 'Durchschnittlich', percentile: '23-77' };
}

function classifyPercentile(value) {
    if (value <= 84) return { classification: 'normal', label: 'Unauffällig' };
    if (value <= 92) return { classification: 'borderline', label: 'Grenzwertig' };
    return { classification: 'clinical', label: 'Klinisch auffällig' };
}

function evaluateDISYPS(event) {
    if (event) event.preventDefault();

    const respondent = document.querySelector('input[name="disyps-respondent"]:checked')?.value || 'parent';
    const inputType = document.querySelector('input[name="disyps-input-type"]:checked')?.value || 'stanine';

    // Werte einlesen
    const values = {
        adhs: {
            inattention: parseFloat(document.getElementById('disyps-inattention').value) || null,
            hyperactivity: parseFloat(document.getElementById('disyps-hyperactivity').value) || null,
            impulsivity: parseFloat(document.getElementById('disyps-impulsivity').value) || null,
            adhsTotal: parseFloat(document.getElementById('disyps-adhs-total').value) || null
        },
        ssv: {
            oppositional: parseFloat(document.getElementById('disyps-oppositional').value) || null,
            aggressive: parseFloat(document.getElementById('disyps-aggressive').value) || null,
            limitedProsocial: parseFloat(document.getElementById('disyps-limited-prosocial').value) || null,
            ssvTotal: parseFloat(document.getElementById('disyps-ssv-total').value) || null
        }
    };

    // Validierung
    let hasData = false;
    const validateValue = (val) => {
        if (val === null) return true;
        hasData = true;
        if (inputType === 'stanine') {
            return val >= 1 && val <= 9;
        } else {
            return val >= 0 && val <= 100;
        }
    };

    for (const domain of Object.values(values)) {
        for (const val of Object.values(domain)) {
            if (!validateValue(val)) {
                const rangeText = inputType === 'stanine' ? '1-9' : '0-100';
                alert(`Bitte geben Sie gültige Werte ein (${rangeText}).`);
                return;
            }
        }
    }

    if (!hasData) {
        alert('Bitte geben Sie mindestens einen Wert ein.');
        return;
    }

    // Klassifikationen berechnen
    const classifications = {
        adhs: {},
        ssv: {}
    };

    const classifyFn = inputType === 'stanine' ? classifyStanine : classifyPercentile;

    Object.entries(values.adhs).forEach(([key, value]) => {
        if (value !== null) {
            classifications.adhs[key] = classifyFn(value);
        }
    });

    Object.entries(values.ssv).forEach(([key, value]) => {
        if (value !== null) {
            classifications.ssv[key] = classifyFn(value);
        }
    });

    // Charts erstellen
    createDISYPSChart(values, classifications, inputType);

    // Zusammenfassung und Interpretation
    createDISYPSSummary(values, classifications, respondent, inputType);
    createDISYPSInterpretation(values, classifications, inputType);

    // Ergebnisse anzeigen
    document.getElementById('disyps-results').style.display = 'block';
    document.getElementById('disyps-results').scrollIntoView({ behavior: 'smooth' });

    // Im Fall speichern
    if (CaseManager.currentCase) {
        CaseManager.saveTestResults('disyps', { values, classifications, respondent, inputType });
    }
}

function createDISYPSChart(values, classifications, inputType) {
    // ADHS-Chart
    const adhsScales = Object.entries(values.adhs).filter(([k, v]) => v !== null);
    if (adhsScales.length > 0) {
        const labels = adhsScales.map(([k]) => DISYPS_SCALES.adhs[k].name);
        const chartValues = adhsScales.map(([k, v]) => v);
        const classKeys = adhsScales.map(([k]) => {
            const c = classifications.adhs[k].classification;
            // Mapping für Farbgebung
            if (c === 'clinical' || c === 'veryHigh' || c === 'high') return 'clinical';
            if (c === 'borderline') return 'borderline';
            return 'normal';
        });

        ChartManager.createBarChart('disyps-adhs-chart', labels, {
            values: chartValues,
            colors: ChartManager.getClassificationColors(classKeys),
            borderColors: ChartManager.getClassificationBorderColors(classKeys)
        }, {
            title: 'DISYPS-III ADHS-Skalen',
            yMax: inputType === 'stanine' ? 9 : 100,
            yLabel: inputType === 'stanine' ? 'Stanine (1-9)' : 'Prozentrang'
        });
    }

    // SSV-Chart
    const ssvScales = Object.entries(values.ssv).filter(([k, v]) => v !== null);
    if (ssvScales.length > 0) {
        const labels = ssvScales.map(([k]) => DISYPS_SCALES.ssv[k].name);
        const chartValues = ssvScales.map(([k, v]) => v);
        const classKeys = ssvScales.map(([k]) => {
            const c = classifications.ssv[k].classification;
            if (c === 'clinical' || c === 'veryHigh' || c === 'high') return 'clinical';
            if (c === 'borderline') return 'borderline';
            return 'normal';
        });

        ChartManager.createBarChart('disyps-ssv-chart', labels, {
            values: chartValues,
            colors: ChartManager.getClassificationColors(classKeys),
            borderColors: ChartManager.getClassificationBorderColors(classKeys)
        }, {
            title: 'DISYPS-III SSV-Skalen',
            yMax: inputType === 'stanine' ? 9 : 100,
            yLabel: inputType === 'stanine' ? 'Stanine (1-9)' : 'Prozentrang'
        });
    }
}

function createDISYPSSummary(values, classifications, respondent, inputType) {
    const container = document.getElementById('disyps-summary');
    const respondentLabels = {
        parent: 'Fremdbeurteilungsbogen (FBB)',
        self: 'Selbstbeurteilungsbogen (SBB)'
    };

    let html = `
        <div class="summary-card">
            <div class="summary-label">Beurteiler</div>
            <div class="summary-value" style="font-size: 1rem;">${respondentLabels[respondent]}</div>
        </div>
    `;

    // ADHS-Gesamtwert
    if (values.adhs.adhsTotal !== null) {
        const adhsClass = classifications.adhs.adhsTotal;
        const colorClass = adhsClass.classification === 'clinical' || adhsClass.classification === 'veryHigh' || adhsClass.classification === 'high' ? 'clinical' :
                          adhsClass.classification === 'borderline' ? 'borderline' : 'normal';

        html += `
            <div class="summary-card ${colorClass}">
                <div class="summary-label">ADHS-Gesamtwert</div>
                <div class="summary-value">${values.adhs.adhsTotal}</div>
                <div class="summary-classification">${adhsClass.label}</div>
            </div>
        `;
    }

    // SSV-Gesamtwert
    if (values.ssv.ssvTotal !== null) {
        const ssvClass = classifications.ssv.ssvTotal;
        const colorClass = ssvClass.classification === 'clinical' || ssvClass.classification === 'veryHigh' || ssvClass.classification === 'high' ? 'clinical' :
                          ssvClass.classification === 'borderline' ? 'borderline' : 'normal';

        html += `
            <div class="summary-card ${colorClass}">
                <div class="summary-label">SSV-Gesamtwert</div>
                <div class="summary-value">${values.ssv.ssvTotal}</div>
                <div class="summary-classification">${ssvClass.label}</div>
            </div>
        `;
    }

    container.innerHTML = html;
}

function createDISYPSInterpretation(values, classifications, inputType) {
    const container = document.getElementById('disyps-interpretation');
    let html = '';
    const recommendations = new Set();

    // ADHS-Interpretation
    const hasADHSData = Object.values(values.adhs).some(v => v !== null);
    if (hasADHSData) {
        html += '<h4>ADHS-Diagnostik</h4>';

        Object.entries(values.adhs).forEach(([key, value]) => {
            if (value === null) return;

            const scaleInfo = DISYPS_SCALES.adhs[key];
            const classification = classifications.adhs[key];
            const isAbnormal = classification.classification === 'clinical' ||
                              classification.classification === 'veryHigh' ||
                              classification.classification === 'high' ||
                              classification.classification === 'borderline';

            const colorClass = classification.classification === 'clinical' || classification.classification === 'veryHigh' || classification.classification === 'high' ? 'clinical' :
                              classification.classification === 'borderline' ? 'borderline' : 'normal';

            html += `
                <div class="interpretation-item ${colorClass}">
                    <div class="scale-name">${scaleInfo.name}</div>
                    <div class="scale-value">${inputType === 'stanine' ? 'Stanine' : 'PR'} = ${value} | ${classification.label}</div>
                    <p>${scaleInfo.description}</p>
                    ${isAbnormal ? `<p class="interpretation-note">${scaleInfo.high}</p>` : ''}
                </div>
            `;

            if (isAbnormal && scaleInfo.recommendations) {
                scaleInfo.recommendations.forEach(r => recommendations.add(r));
            }
        });
    }

    // SSV-Interpretation
    const hasSSVData = Object.values(values.ssv).some(v => v !== null);
    if (hasSSVData) {
        html += '<h4 style="margin-top: 1.5rem;">SSV-Diagnostik</h4>';

        Object.entries(values.ssv).forEach(([key, value]) => {
            if (value === null) return;

            const scaleInfo = DISYPS_SCALES.ssv[key];
            const classification = classifications.ssv[key];
            const isAbnormal = classification.classification === 'clinical' ||
                              classification.classification === 'veryHigh' ||
                              classification.classification === 'high' ||
                              classification.classification === 'borderline';

            const colorClass = classification.classification === 'clinical' || classification.classification === 'veryHigh' || classification.classification === 'high' ? 'clinical' :
                              classification.classification === 'borderline' ? 'borderline' : 'normal';

            html += `
                <div class="interpretation-item ${colorClass}">
                    <div class="scale-name">${scaleInfo.name}</div>
                    <div class="scale-value">${inputType === 'stanine' ? 'Stanine' : 'PR'} = ${value} | ${classification.label}</div>
                    <p>${scaleInfo.description}</p>
                    ${isAbnormal ? `<p class="interpretation-note">${scaleInfo.high}</p>` : ''}
                </div>
            `;

            if (isAbnormal && scaleInfo.recommendations) {
                scaleInfo.recommendations.forEach(r => recommendations.add(r));
            }
        });
    }

    // Empfehlungen
    if (recommendations.size > 0) {
        html += '<div class="results-recommendations"><h4>Empfehlungen</h4><ul>';
        recommendations.forEach(r => html += `<li>${r}</li>`);
        html += '</ul></div>';
    }

    container.innerHTML = html;
}

function clearDISYPSForm() {
    document.getElementById('disyps-form').reset();
    document.getElementById('disyps-results').style.display = 'none';
    ChartManager.destroy('disyps-adhs-chart');
    ChartManager.destroy('disyps-ssv-chart');
}

function getDISYPSData() {
    const respondent = document.querySelector('input[name="disyps-respondent"]:checked')?.value || 'parent';
    const inputType = document.querySelector('input[name="disyps-input-type"]:checked')?.value || 'stanine';

    const values = {
        adhs: {
            inattention: parseFloat(document.getElementById('disyps-inattention').value) || null,
            hyperactivity: parseFloat(document.getElementById('disyps-hyperactivity').value) || null,
            impulsivity: parseFloat(document.getElementById('disyps-impulsivity').value) || null,
            adhsTotal: parseFloat(document.getElementById('disyps-adhs-total').value) || null
        },
        ssv: {
            oppositional: parseFloat(document.getElementById('disyps-oppositional').value) || null,
            aggressive: parseFloat(document.getElementById('disyps-aggressive').value) || null,
            limitedProsocial: parseFloat(document.getElementById('disyps-limited-prosocial').value) || null,
            ssvTotal: parseFloat(document.getElementById('disyps-ssv-total').value) || null
        }
    };

    const classifyFn = inputType === 'stanine' ? classifyStanine : classifyPercentile;

    const classifications = { adhs: {}, ssv: {} };
    Object.entries(values.adhs).forEach(([key, value]) => {
        if (value !== null) {
            classifications.adhs[key] = classifyFn(value);
        }
    });
    Object.entries(values.ssv).forEach(([key, value]) => {
        if (value !== null) {
            classifications.ssv[key] = classifyFn(value);
        }
    });

    return { values, classifications, respondent, inputType };
}

// Event Listener
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('disyps-form');
    if (form) {
        form.addEventListener('submit', evaluateDISYPS);
    }
});
