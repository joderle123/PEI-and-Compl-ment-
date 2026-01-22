/**
 * CBCL - Child Behavior Checklist
 * Auswertungsmodul für Verhaltensauffälligkeiten
 */

const CBCL_NORMS = {
    // T-Werte Klassifikation
    syndromeScales: {
        normal: { range: [0, 64], label: 'Unauffällig' },
        borderline: { range: [65, 69], label: 'Grenzwertig' },
        clinical: { range: [70, 100], label: 'Klinisch auffällig' }
    },
    broadbandScales: {
        normal: { range: [0, 59], label: 'Unauffällig' },
        borderline: { range: [60, 63], label: 'Grenzwertig' },
        clinical: { range: [64, 100], label: 'Klinisch auffällig' }
    }
};

const CBCL_SCALES = {
    // Syndromskalen
    anxiousDepressed: {
        name: 'Ängstlich/Depressiv',
        type: 'syndrome',
        broadband: 'internalizing',
        description: 'Ängstlichkeit, Nervosität, Traurigkeit, Rückzug',
        high: 'Hinweise auf emotionale Probleme wie Ängste oder depressive Symptome',
        recommendations: ['Emotionsregulationstraining', 'Angstdiagnostik vertiefen', 'Ggf. Psychotherapie']
    },
    withdrawnDepressed: {
        name: 'Rückzüglich/Depressiv',
        type: 'syndrome',
        broadband: 'internalizing',
        description: 'Sozialer Rückzug, Antriebslosigkeit, Interessenverlust',
        high: 'Hinweise auf Rückzugstendenzen und depressive Symptomatik',
        recommendations: ['Aktivitätsaufbau', 'Soziale Integration fördern', 'Depressionsscreening']
    },
    somaticComplaints: {
        name: 'Körperliche Beschwerden',
        type: 'syndrome',
        broadband: 'internalizing',
        description: 'Körperliche Symptome ohne medizinische Ursache',
        high: 'Erhöhte körperliche Beschwerden, mögliche somatoforme Komponente',
        recommendations: ['Medizinische Abklärung', 'Psychosomatik beachten', 'Stressreduktion']
    },
    socialProblems: {
        name: 'Soziale Probleme',
        type: 'syndrome',
        broadband: null,
        description: 'Schwierigkeiten im Umgang mit Gleichaltrigen',
        high: 'Probleme in sozialen Beziehungen oder beim Anschluss finden',
        recommendations: ['Soziales Kompetenztraining', 'Peer-Beziehungen fördern', 'Mobbing ausschließen']
    },
    thoughtProblems: {
        name: 'Schizoid/Zwanghaft',
        type: 'syndrome',
        broadband: null,
        description: 'Ungewöhnliche Gedanken, zwanghafte Verhaltensweisen',
        high: 'Hinweise auf ungewöhnliche Denkmuster oder Zwangsphänomene',
        recommendations: ['Differenzialdiagnostik', 'Ggf. psychiatrische Abklärung']
    },
    attentionProblems: {
        name: 'Aufmerksamkeitsprobleme',
        type: 'syndrome',
        broadband: null,
        description: 'Konzentrationsschwierigkeiten, Unaufmerksamkeit',
        high: 'Hinweise auf Aufmerksamkeitsstörung, ADHS abklären',
        recommendations: ['ADHS-Diagnostik', 'Neuropsychologische Testung', 'Strukturierungshilfen']
    },
    ruleBreakingBehavior: {
        name: 'Dissoziales Verhalten',
        type: 'syndrome',
        broadband: 'externalizing',
        description: 'Regelverletzendes Verhalten, Lügen, Stehlen',
        high: 'Hinweise auf dissoziale Verhaltensweisen',
        recommendations: ['SSV-Diagnostik', 'Konsequenzmanagement', 'Elterntraining']
    },
    aggressiveBehavior: {
        name: 'Aggressives Verhalten',
        type: 'syndrome',
        broadband: 'externalizing',
        description: 'Aggressivität, Wutausbrüche, Streiten',
        high: 'Erhöhte Aggressivität und oppositionelles Verhalten',
        recommendations: ['Aggressionsbewältigung', 'Impulskontrolltraining', 'Elternberatung']
    },

    // Breitbandskalen
    internalizing: {
        name: 'Internalisierende Probleme',
        type: 'broadband',
        description: 'Zusammenfassung nach innen gerichteter Probleme',
        high: 'Deutliche internalisierende Symptomatik',
        recommendations: ['Emotionsfokussierte Interventionen', 'Angst-/Depressionsspezifische Diagnostik']
    },
    externalizing: {
        name: 'Externalisierende Probleme',
        type: 'broadband',
        description: 'Zusammenfassung nach außen gerichteter Probleme',
        high: 'Deutliche externalisierende Verhaltensauffälligkeiten',
        recommendations: ['Verhaltenstherapeutische Interventionen', 'Elterntraining', 'Schulische Unterstützung']
    },
    totalProblems: {
        name: 'Gesamtauffälligkeit',
        type: 'broadband',
        description: 'Gesamtmaß der psychischen Belastung',
        high: 'Hohe psychische Gesamtbelastung',
        recommendations: ['Umfassende psychologische/psychiatrische Diagnostik', 'Multimodale Intervention']
    }
};

const CBCL_DSM_SCALES = {
    affective: { name: 'Affektive Probleme', description: 'DSM-orientiert: Depression' },
    anxiety: { name: 'Angstprobleme', description: 'DSM-orientiert: Angststörungen' },
    somatic: { name: 'Somatische Probleme', description: 'DSM-orientiert: Somatoforme Störungen' },
    adhd: { name: 'ADHS-Probleme', description: 'DSM-orientiert: ADHS' },
    odd: { name: 'Oppositionelle Probleme', description: 'DSM-orientiert: ODD' },
    conduct: { name: 'Störung des Sozialverhaltens', description: 'DSM-orientiert: Conduct Disorder' }
};

function classifyCBCLScore(value, scaleType) {
    const norms = scaleType === 'broadband' ? CBCL_NORMS.broadbandScales : CBCL_NORMS.syndromeScales;

    if (value <= norms.normal.range[1]) return { classification: 'normal', label: norms.normal.label };
    if (value <= norms.borderline.range[1]) return { classification: 'borderline', label: norms.borderline.label };
    return { classification: 'clinical', label: norms.clinical.label };
}

function evaluateCBCL(event) {
    if (event) event.preventDefault();

    const respondent = document.querySelector('input[name="cbcl-respondent"]:checked')?.value || 'parent';

    // Syndromskalen einlesen
    const syndromeScales = {
        anxiousDepressed: parseInt(document.getElementById('cbcl-anxious-depressed').value) || null,
        withdrawnDepressed: parseInt(document.getElementById('cbcl-withdrawn-depressed').value) || null,
        somaticComplaints: parseInt(document.getElementById('cbcl-somatic-complaints').value) || null,
        socialProblems: parseInt(document.getElementById('cbcl-social-problems').value) || null,
        thoughtProblems: parseInt(document.getElementById('cbcl-thought-problems').value) || null,
        attentionProblems: parseInt(document.getElementById('cbcl-attention-problems').value) || null,
        ruleBreakingBehavior: parseInt(document.getElementById('cbcl-rule-breaking').value) || null,
        aggressiveBehavior: parseInt(document.getElementById('cbcl-aggressive').value) || null
    };

    // Breitbandskalen einlesen
    const broadbandScales = {
        internalizing: parseInt(document.getElementById('cbcl-internalizing').value) || null,
        externalizing: parseInt(document.getElementById('cbcl-externalizing').value) || null,
        totalProblems: parseInt(document.getElementById('cbcl-total').value) || null
    };

    // DSM-Skalen einlesen (optional)
    const dsmScales = {
        affective: parseInt(document.getElementById('cbcl-dsm-affective')?.value) || null,
        anxiety: parseInt(document.getElementById('cbcl-dsm-anxiety')?.value) || null,
        somatic: parseInt(document.getElementById('cbcl-dsm-somatic')?.value) || null,
        adhd: parseInt(document.getElementById('cbcl-dsm-adhd')?.value) || null,
        odd: parseInt(document.getElementById('cbcl-dsm-odd')?.value) || null,
        conduct: parseInt(document.getElementById('cbcl-dsm-conduct')?.value) || null
    };

    // Validierung
    let hasData = false;
    const allScales = { ...syndromeScales, ...broadbandScales, ...dsmScales };
    for (const val of Object.values(allScales)) {
        if (val !== null) {
            if (val < 30 || val > 100) {
                alert('T-Werte müssen zwischen 30 und 100 liegen.');
                return;
            }
            hasData = true;
        }
    }

    if (!hasData) {
        alert('Bitte geben Sie mindestens einen Skalenwert ein.');
        return;
    }

    // Klassifikationen berechnen
    const classifications = {
        syndrome: {},
        broadband: {},
        dsm: {}
    };

    Object.entries(syndromeScales).forEach(([key, value]) => {
        if (value !== null) {
            classifications.syndrome[key] = classifyCBCLScore(value, 'syndrome');
        }
    });

    Object.entries(broadbandScales).forEach(([key, value]) => {
        if (value !== null) {
            classifications.broadband[key] = classifyCBCLScore(value, 'broadband');
        }
    });

    Object.entries(dsmScales).forEach(([key, value]) => {
        if (value !== null) {
            classifications.dsm[key] = classifyCBCLScore(value, 'syndrome');
        }
    });

    // Charts erstellen
    createCBCLSyndromeChart(syndromeScales, classifications.syndrome);
    createCBCLBroadbandChart(broadbandScales, classifications.broadband);

    // Zusammenfassung und Interpretation
    createCBCLSummary(syndromeScales, broadbandScales, classifications, respondent);
    createCBCLInterpretation(syndromeScales, broadbandScales, dsmScales, classifications);

    // Ergebnisse anzeigen
    document.getElementById('cbcl-results').style.display = 'block';
    document.getElementById('cbcl-results').scrollIntoView({ behavior: 'smooth' });

    // Im Fall speichern
    if (CaseManager.currentCase) {
        CaseManager.saveTestResults('cbcl', { syndromeScales, broadbandScales, dsmScales, classifications, respondent });
    }
}

function createCBCLSyndromeChart(scales, classifications) {
    const validScales = Object.entries(scales).filter(([k, v]) => v !== null);
    if (validScales.length === 0) return;

    const labels = validScales.map(([k]) => CBCL_SCALES[k].name);
    const values = validScales.map(([k, v]) => v);
    const classificationKeys = validScales.map(([k]) => classifications[k].classification);

    ChartManager.createProfileChart('cbcl-syndrome-chart', labels, {
        values: values,
        colors: ChartManager.getClassificationColors(classificationKeys),
        borderColors: ChartManager.getClassificationBorderColors(classificationKeys)
    }, {
        title: 'CBCL Syndromskalen',
        yMin: 30,
        yMax: 90,
        yLabel: 'T-Werte',
        referenceLines: [
            { value: 50, color: 'rgba(0, 0, 0, 0.3)', label: 'Mittelwert' },
            { value: 65, color: 'rgba(154, 103, 0, 0.5)', label: 'Grenzbereich' },
            { value: 70, color: 'rgba(207, 34, 46, 0.5)', label: 'Klinisch' }
        ]
    });
}

function createCBCLBroadbandChart(scales, classifications) {
    const validScales = Object.entries(scales).filter(([k, v]) => v !== null);
    if (validScales.length === 0) return;

    const labels = validScales.map(([k]) => CBCL_SCALES[k].name);
    const values = validScales.map(([k, v]) => v);
    const classificationKeys = validScales.map(([k]) => classifications[k].classification);

    ChartManager.createProfileChart('cbcl-broadband-chart', labels, {
        values: values,
        colors: ChartManager.getClassificationColors(classificationKeys),
        borderColors: ChartManager.getClassificationBorderColors(classificationKeys)
    }, {
        title: 'CBCL Breitbandskalen',
        yMin: 30,
        yMax: 90,
        yLabel: 'T-Werte',
        referenceLines: [
            { value: 50, color: 'rgba(0, 0, 0, 0.3)', label: 'Mittelwert' },
            { value: 60, color: 'rgba(154, 103, 0, 0.5)', label: 'Grenzbereich' },
            { value: 64, color: 'rgba(207, 34, 46, 0.5)', label: 'Klinisch' }
        ]
    });
}

function createCBCLSummary(syndromeScales, broadbandScales, classifications, respondent) {
    const container = document.getElementById('cbcl-summary');
    const respondentLabels = {
        parent: 'Elternbeurteilung (CBCL)',
        teacher: 'Lehrerbeurteilung (TRF)',
        self: 'Selbstbeurteilung (YSR)'
    };

    let html = `
        <div class="summary-card">
            <div class="summary-label">Beurteiler</div>
            <div class="summary-value" style="font-size: 1rem;">${respondentLabels[respondent]}</div>
        </div>
    `;

    // Gesamtauffälligkeit
    if (broadbandScales.totalProblems !== null) {
        const totalClass = classifications.broadband.totalProblems.classification;
        html += `
            <div class="summary-card ${totalClass}">
                <div class="summary-label">Gesamtauffälligkeit</div>
                <div class="summary-value">${broadbandScales.totalProblems}</div>
                <div class="summary-classification ${totalClass}">${classifications.broadband.totalProblems.label}</div>
            </div>
        `;
    }

    // Internalisierend
    if (broadbandScales.internalizing !== null) {
        const intClass = classifications.broadband.internalizing.classification;
        html += `
            <div class="summary-card ${intClass}">
                <div class="summary-label">Internalisierend</div>
                <div class="summary-value">${broadbandScales.internalizing}</div>
                <div class="summary-classification ${intClass}">${classifications.broadband.internalizing.label}</div>
            </div>
        `;
    }

    // Externalisierend
    if (broadbandScales.externalizing !== null) {
        const extClass = classifications.broadband.externalizing.classification;
        html += `
            <div class="summary-card ${extClass}">
                <div class="summary-label">Externalisierend</div>
                <div class="summary-value">${broadbandScales.externalizing}</div>
                <div class="summary-classification ${extClass}">${classifications.broadband.externalizing.label}</div>
            </div>
        `;
    }

    container.innerHTML = html;
}

function createCBCLInterpretation(syndromeScales, broadbandScales, dsmScales, classifications) {
    const container = document.getElementById('cbcl-interpretation');
    let html = '';

    // Syndromskalen Interpretation
    const clinicalSyndromes = [];
    const borderlineSyndromes = [];

    Object.entries(syndromeScales).forEach(([key, value]) => {
        if (value === null) return;

        const scaleInfo = CBCL_SCALES[key];
        const classification = classifications.syndrome[key];

        if (classification.classification === 'clinical') {
            clinicalSyndromes.push({ key, value, info: scaleInfo });
        } else if (classification.classification === 'borderline') {
            borderlineSyndromes.push({ key, value, info: scaleInfo });
        }

        html += `
            <div class="interpretation-item ${classification.classification}">
                <div class="scale-name">${scaleInfo.name}</div>
                <div class="scale-value">T = ${value} | ${classification.label}</div>
                <p>${scaleInfo.description}</p>
                ${classification.classification !== 'normal' ? `<p class="interpretation-note">${scaleInfo.high}</p>` : ''}
            </div>
        `;
    });

    // Breitbandskalen
    Object.entries(broadbandScales).forEach(([key, value]) => {
        if (value === null) return;

        const scaleInfo = CBCL_SCALES[key];
        const classification = classifications.broadband[key];

        html += `
            <div class="interpretation-item ${classification.classification}">
                <div class="scale-name">${scaleInfo.name}</div>
                <div class="scale-value">T = ${value} | ${classification.label}</div>
                ${classification.classification !== 'normal' ? `<p class="interpretation-note">${scaleInfo.high}</p>` : ''}
            </div>
        `;
    });

    // DSM-Skalen (wenn vorhanden)
    const validDSM = Object.entries(dsmScales).filter(([k, v]) => v !== null);
    if (validDSM.length > 0) {
        html += '<h4 style="margin-top: 1.5rem;">DSM-orientierte Skalen</h4>';
        validDSM.forEach(([key, value]) => {
            const scaleInfo = CBCL_DSM_SCALES[key];
            const classification = classifications.dsm[key];
            html += `
                <div class="interpretation-item ${classification.classification}">
                    <div class="scale-name">${scaleInfo.name}</div>
                    <div class="scale-value">T = ${value} | ${classification.label}</div>
                </div>
            `;
        });
    }

    // Empfehlungen
    const allClinical = [...clinicalSyndromes, ...borderlineSyndromes];
    if (allClinical.length > 0) {
        html += '<div class="results-recommendations"><h4>Empfehlungen zur weiteren Diagnostik und Intervention</h4><ul>';
        const recommendations = new Set();
        allClinical.forEach(({ info }) => {
            if (info.recommendations) {
                info.recommendations.forEach(r => recommendations.add(r));
            }
        });
        recommendations.forEach(r => html += `<li>${r}</li>`);
        html += '</ul></div>';
    }

    container.innerHTML = html;
}

function clearCBCLForm() {
    document.getElementById('cbcl-form').reset();
    document.getElementById('cbcl-results').style.display = 'none';
    ChartManager.destroy('cbcl-syndrome-chart');
    ChartManager.destroy('cbcl-broadband-chart');
}

function getCBCLData() {
    const respondent = document.querySelector('input[name="cbcl-respondent"]:checked')?.value || 'parent';

    const syndromeScales = {
        anxiousDepressed: parseInt(document.getElementById('cbcl-anxious-depressed').value) || null,
        withdrawnDepressed: parseInt(document.getElementById('cbcl-withdrawn-depressed').value) || null,
        somaticComplaints: parseInt(document.getElementById('cbcl-somatic-complaints').value) || null,
        socialProblems: parseInt(document.getElementById('cbcl-social-problems').value) || null,
        thoughtProblems: parseInt(document.getElementById('cbcl-thought-problems').value) || null,
        attentionProblems: parseInt(document.getElementById('cbcl-attention-problems').value) || null,
        ruleBreakingBehavior: parseInt(document.getElementById('cbcl-rule-breaking').value) || null,
        aggressiveBehavior: parseInt(document.getElementById('cbcl-aggressive').value) || null
    };

    const broadbandScales = {
        internalizing: parseInt(document.getElementById('cbcl-internalizing').value) || null,
        externalizing: parseInt(document.getElementById('cbcl-externalizing').value) || null,
        totalProblems: parseInt(document.getElementById('cbcl-total').value) || null
    };

    const classifications = { syndrome: {}, broadband: {} };

    Object.entries(syndromeScales).forEach(([key, value]) => {
        if (value !== null) {
            classifications.syndrome[key] = classifyCBCLScore(value, 'syndrome');
        }
    });

    Object.entries(broadbandScales).forEach(([key, value]) => {
        if (value !== null) {
            classifications.broadband[key] = classifyCBCLScore(value, 'broadband');
        }
    });

    return { syndromeScales, broadbandScales, classifications, respondent };
}

function setCBCLValues(data) {
    if (data.anxiousDepressed !== undefined) document.getElementById('cbcl-anxious-depressed').value = data.anxiousDepressed;
    if (data.withdrawnDepressed !== undefined) document.getElementById('cbcl-withdrawn-depressed').value = data.withdrawnDepressed;
    if (data.somaticComplaints !== undefined) document.getElementById('cbcl-somatic-complaints').value = data.somaticComplaints;
    if (data.socialProblems !== undefined) document.getElementById('cbcl-social-problems').value = data.socialProblems;
    if (data.thoughtProblems !== undefined) document.getElementById('cbcl-thought-problems').value = data.thoughtProblems;
    if (data.attentionProblems !== undefined) document.getElementById('cbcl-attention-problems').value = data.attentionProblems;
    if (data.ruleBreakingBehavior !== undefined) document.getElementById('cbcl-rule-breaking').value = data.ruleBreakingBehavior;
    if (data.aggressiveBehavior !== undefined) document.getElementById('cbcl-aggressive').value = data.aggressiveBehavior;
    if (data.internalizing !== undefined) document.getElementById('cbcl-internalizing').value = data.internalizing;
    if (data.externalizing !== undefined) document.getElementById('cbcl-externalizing').value = data.externalizing;
    if (data.totalProblems !== undefined) document.getElementById('cbcl-total').value = data.totalProblems;
    if (data.respondent) {
        const radio = document.querySelector(`input[name="cbcl-respondent"][value="${data.respondent}"]`);
        if (radio) radio.checked = true;
    }
}

// Event Listener
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cbcl-form');
    if (form) {
        form.addEventListener('submit', evaluateCBCL);
    }
});
