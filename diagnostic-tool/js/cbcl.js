/**
 * CBCL - Child Behavior Checklist
 * Auswertungs- und Interpretationsmodul
 *
 * T-Werte: M=50, SD=10
 * Normbereich: T < 65 (Syndromskalen) / T < 60 (übergeordnete Skalen)
 */

// Klassifikationsgrenzen für T-Werte
const CBCL_CLASSIFICATION = {
    syndromes: {
        // Für Syndromskalen
        normal: { max: 64, label: 'Unauffällig' },
        borderline: { min: 65, max: 69, label: 'Grenzwertig' },
        clinical: { min: 70, label: 'Klinisch auffällig' }
    },
    broadband: {
        // Für übergeordnete Skalen (Internalisierend, Externalisierend, Gesamt)
        normal: { max: 59, label: 'Unauffällig' },
        borderline: { min: 60, max: 63, label: 'Grenzwertig' },
        clinical: { min: 64, label: 'Klinisch auffällig' }
    }
};

// Skalenbeschreibungen
const CBCL_SCALE_DESCRIPTIONS = {
    anxious: {
        name: 'Ängstlich/Depressiv',
        category: 'syndrome',
        description: 'Erfasst internalisierendes Problemverhalten wie Ängstlichkeit, Traurigkeit, Sorgen und somatische Beschwerden.',
        dsmRelation: 'Korreliert mit Angst- und affektiven Störungen',
        interventions: [
            'Angstdiagnostik vertiefen',
            'Depressionsscreening durchführen',
            'Kognitive Verhaltenstherapie erwägen'
        ]
    },
    withdrawn: {
        name: 'Rückzug/Depression',
        category: 'syndrome',
        description: 'Misst sozialen Rückzug, Antriebslosigkeit und depressive Symptome.',
        dsmRelation: 'Korreliert mit Depression und Dysthymie',
        interventions: [
            'Differenzialdiagnostik Depression',
            'Aktivitätsaufbau empfohlen',
            'Soziale Integration fördern'
        ]
    },
    somatic: {
        name: 'Körperliche Beschwerden',
        category: 'syndrome',
        description: 'Erfasst somatische Beschwerden ohne medizinische Ursache.',
        dsmRelation: 'Kann auf somatoforme Störungen hinweisen',
        interventions: [
            'Medizinische Abklärung sicherstellen',
            'Psychosomatische Zusammenhänge explorieren',
            'Stressmanagement vermitteln'
        ]
    },
    social: {
        name: 'Soziale Probleme',
        category: 'syndrome',
        description: 'Erfasst Schwierigkeiten in sozialen Beziehungen und unreifes Verhalten.',
        dsmRelation: 'Kann mit ADHS oder Autismus-Spektrum-Störungen assoziiert sein',
        interventions: [
            'Soziale Kompetenz fördern',
            'Mobbing-Screening',
            'Gruppentraining sozialer Fertigkeiten'
        ]
    },
    thought: {
        name: 'Schizoid/Zwanghaft',
        category: 'syndrome',
        description: 'Erfasst ungewöhnliche Gedanken, Zwänge und bizarre Verhaltensweisen.',
        dsmRelation: 'Kann auf Zwangsstörung oder Frühwarnzeichen psychotischer Störungen hinweisen',
        interventions: [
            'Differenzialdiagnostik Zwangsstörung',
            'Bei Bedarf psychiatrische Abklärung',
            'Verhaltensbeobachtung intensivieren'
        ]
    },
    attention: {
        name: 'Aufmerksamkeitsprobleme',
        category: 'syndrome',
        description: 'Erfasst Konzentrationsschwierigkeiten, motorische Unruhe und Impulsivität.',
        dsmRelation: 'Stark korreliert mit ADHS',
        interventions: [
            'ADHS-spezifische Diagnostik',
            'Neuropsychologische Testung erwägen',
            'Strukturierungsmaßnahmen implementieren'
        ]
    },
    rulebreak: {
        name: 'Dissoziales Verhalten',
        category: 'syndrome',
        description: 'Erfasst regelverletzendes Verhalten, Lügen und Stehlen.',
        dsmRelation: 'Korreliert mit Störung des Sozialverhaltens',
        interventions: [
            'Differenzialdiagnostik SSV',
            'Elterntraining empfohlen',
            'Grenzen und Konsequenzen etablieren'
        ]
    },
    aggressive: {
        name: 'Aggressives Verhalten',
        category: 'syndrome',
        description: 'Erfasst körperliche und verbale Aggression, Wutausbrüche.',
        dsmRelation: 'Kann mit SSV oder intermittierender explosiver Störung assoziiert sein',
        interventions: [
            'Aggressionsdiagnostik',
            'Anti-Aggressionstraining',
            'Impulskontrollstrategien vermitteln'
        ]
    },
    internal: {
        name: 'Internalisierende Störungen',
        category: 'broadband',
        description: 'Zusammenfassung der nach innen gerichteten Problemverhaltensweisen (Ängstlich/Depressiv, Rückzug, Körperliche Beschwerden).',
        dsmRelation: 'Korrespondiert mit Angststörungen und Depression',
        interventions: [
            'Fokus auf emotionale Regulation',
            'Psychotherapeutische Behandlung erwägen',
            'Ressourcenaktivierung'
        ]
    },
    external: {
        name: 'Externalisierende Störungen',
        category: 'broadband',
        description: 'Zusammenfassung der nach außen gerichteten Problemverhaltensweisen (Dissoziales Verhalten, Aggressives Verhalten).',
        dsmRelation: 'Korrespondiert mit ADHS und Störung des Sozialverhaltens',
        interventions: [
            'Verhaltensmodifikation',
            'Eltern-Kind-Interaktionstherapie',
            'Multimodale Behandlung bei ADHS'
        ]
    },
    total: {
        name: 'Gesamtwert',
        category: 'broadband',
        description: 'Globaler Indikator der Gesamtbelastung durch Verhaltens- und emotionale Probleme.',
        dsmRelation: 'Allgemeiner Indikator für psychische Belastung',
        interventions: [
            'Umfassende diagnostische Abklärung',
            'Interdisziplinäre Fallkonferenz erwägen',
            'Behandlungspriorisierung festlegen'
        ]
    }
};

let cbclChart = null;

/**
 * Klassifiziert einen T-Wert
 */
function classifyCBCLScore(scale, value) {
    const desc = CBCL_SCALE_DESCRIPTIONS[scale];
    const norms = desc.category === 'syndrome' ? CBCL_CLASSIFICATION.syndromes : CBCL_CLASSIFICATION.broadband;

    if (value < norms.borderline.min) return 'normal';
    if (value < norms.clinical.min) return 'borderline';
    return 'clinical';
}

/**
 * Berechnet Perzentil aus T-Wert
 */
function tValueToPercentile(tValue) {
    const z = (tValue - 50) / 10;
    const percentile = (1 + erf(z / Math.sqrt(2))) / 2 * 100;
    return Math.round(percentile);
}

// Hilfsfunktion: Error function approximation
function erf(x) {
    const a1 = 0.254829592;
    const a2 = -0.284496736;
    const a3 = 1.421413741;
    const a4 = -1.453152027;
    const a5 = 1.061405429;
    const p = 0.3275911;

    const sign = x < 0 ? -1 : 1;
    const absX = Math.abs(x);
    const t = 1.0 / (1.0 + p * absX);
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-absX * absX);

    return sign * y;
}

/**
 * Hauptfunktion zur CBCL-Auswertung
 */
function evaluateCBCL() {
    // Werte auslesen
    const syndromeScales = {
        anxious: parseInt(document.getElementById('cbcl-anxious').value) || null,
        withdrawn: parseInt(document.getElementById('cbcl-withdrawn').value) || null,
        somatic: parseInt(document.getElementById('cbcl-somatic').value) || null,
        social: parseInt(document.getElementById('cbcl-social').value) || null,
        thought: parseInt(document.getElementById('cbcl-thought').value) || null,
        attention: parseInt(document.getElementById('cbcl-attention').value) || null,
        rulebreak: parseInt(document.getElementById('cbcl-rulebreak').value) || null,
        aggressive: parseInt(document.getElementById('cbcl-aggressive').value) || null
    };

    const broadbandScales = {
        internal: parseInt(document.getElementById('cbcl-internal').value) || null,
        external: parseInt(document.getElementById('cbcl-external').value) || null,
        total: parseInt(document.getElementById('cbcl-total').value) || null
    };

    const values = { ...syndromeScales, ...broadbandScales };

    // Mindestens ein Wert erforderlich
    const hasValues = Object.values(values).some(v => v !== null);
    if (!hasValues) {
        alert('Bitte geben Sie mindestens einen T-Wert ein.');
        return;
    }

    // Validierung (30-100)
    for (const [key, value] of Object.entries(values)) {
        if (value !== null && (value < 30 || value > 100)) {
            alert(`Bitte geben Sie für "${CBCL_SCALE_DESCRIPTIONS[key].name}" einen T-Wert zwischen 30 und 100 ein.`);
            return;
        }
    }

    // Klassifikationen erstellen
    const classifications = {};
    for (const [key, value] of Object.entries(values)) {
        if (value !== null) {
            classifications[key] = classifyCBCLScore(key, value);
        }
    }

    // Chart erstellen/aktualisieren
    createCBCLChart(syndromeScales, broadbandScales, classifications);

    // Interpretation generieren
    generateCBCLInterpretation(values, classifications);

    // Ergebnisse anzeigen
    document.getElementById('cbcl-results').classList.remove('hidden');

    // Scrollen zu Ergebnissen
    document.getElementById('cbcl-results').scrollIntoView({ behavior: 'smooth' });
}

/**
 * Erstellt das CBCL-Profil-Diagramm
 */
function createCBCLChart(syndromeScales, broadbandScales, classifications) {
    const ctx = document.getElementById('cbcl-chart').getContext('2d');

    if (cbclChart) {
        cbclChart.destroy();
    }

    // Syndromskalen
    const syndromeKeys = ['anxious', 'withdrawn', 'somatic', 'social', 'thought', 'attention', 'rulebreak', 'aggressive'];
    const syndromeLabels = syndromeKeys.map(k => CBCL_SCALE_DESCRIPTIONS[k].name);
    const syndromeData = syndromeKeys.map(k => syndromeScales[k]);

    const colors = {
        normal: 'rgba(34, 197, 94, 0.7)',
        borderline: 'rgba(245, 158, 11, 0.7)',
        clinical: 'rgba(239, 68, 68, 0.7)'
    };

    const syndromeColors = syndromeKeys.map(k => {
        if (syndromeScales[k] === null) return 'rgba(200, 200, 200, 0.3)';
        return colors[classifications[k]];
    });

    cbclChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: syndromeLabels,
            datasets: [{
                label: 'T-Wert',
                data: syndromeData,
                backgroundColor: syndromeColors,
                borderColor: syndromeColors.map(c => c.replace('0.7', '1').replace('0.3', '0.5')),
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    min: 30,
                    max: 100,
                    title: {
                        display: true,
                        text: 'T-Wert (M=50, SD=10)'
                    }
                },
                x: {
                    ticks: {
                        maxRotation: 45,
                        minRotation: 45,
                        font: {
                            size: 10
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'CBCL Syndrom-Profil'
                },
                annotation: {
                    annotations: {
                        clinicalLine: {
                            type: 'line',
                            yMin: 70,
                            yMax: 70,
                            borderColor: 'rgba(239, 68, 68, 0.5)',
                            borderWidth: 2,
                            borderDash: [5, 5],
                            label: {
                                content: 'Klinisch (T=70)',
                                enabled: true,
                                position: 'end'
                            }
                        },
                        borderlineLine: {
                            type: 'line',
                            yMin: 65,
                            yMax: 65,
                            borderColor: 'rgba(245, 158, 11, 0.5)',
                            borderWidth: 2,
                            borderDash: [5, 5],
                            label: {
                                content: 'Grenzwertig (T=65)',
                                enabled: true,
                                position: 'end'
                            }
                        }
                    }
                }
            }
        }
    });
}

/**
 * Generiert die textliche Interpretation
 */
function generateCBCLInterpretation(values, classifications) {
    const container = document.getElementById('cbcl-interpretation');
    let html = '';

    // Übergeordnete Skalen zuerst
    const broadbandKeys = ['internal', 'external', 'total'];
    const clinicalBroadband = broadbandKeys.filter(k => values[k] !== null && classifications[k] === 'clinical');
    const borderlineBroadband = broadbandKeys.filter(k => values[k] !== null && classifications[k] === 'borderline');

    if (broadbandKeys.some(k => values[k] !== null)) {
        html += '<h4>Übergeordnete Skalen</h4>';

        for (const key of broadbandKeys) {
            if (values[key] === null) continue;

            const desc = CBCL_SCALE_DESCRIPTIONS[key];
            const classification = classifications[key];
            const percentile = tValueToPercentile(values[key]);

            html += `
                <div class="interpretation-item ${classification}">
                    <div class="scale-name">${desc.name}</div>
                    <div class="scale-value">T-Wert: ${values[key]} | Perzentil: ${percentile}</div>
                    <div class="scale-classification">${getCBCLClassificationLabel(classification)}</div>
                    ${classification !== 'normal' ? `<p class="mt-1">${desc.description}</p>` : ''}
                </div>
            `;
        }
    }

    // Syndromskalen
    const syndromeKeys = ['anxious', 'withdrawn', 'somatic', 'social', 'thought', 'attention', 'rulebreak', 'aggressive'];
    const clinicalSyndromes = syndromeKeys.filter(k => values[k] !== null && classifications[k] === 'clinical');
    const borderlineSyndromes = syndromeKeys.filter(k => values[k] !== null && classifications[k] === 'borderline');

    if (syndromeKeys.some(k => values[k] !== null)) {
        html += '<h4 class="mt-3">Syndromskalen</h4>';

        for (const key of syndromeKeys) {
            if (values[key] === null) continue;

            const desc = CBCL_SCALE_DESCRIPTIONS[key];
            const classification = classifications[key];
            const percentile = tValueToPercentile(values[key]);

            html += `
                <div class="interpretation-item ${classification}">
                    <div class="scale-name">${desc.name}</div>
                    <div class="scale-value">T-Wert: ${values[key]} | Perzentil: ${percentile}</div>
                    <div class="scale-classification">${getCBCLClassificationLabel(classification)}</div>
                    ${classification !== 'normal' ? `
                        <p class="mt-1">${desc.description}</p>
                        <p><em>DSM-Bezug: ${desc.dsmRelation}</em></p>
                    ` : ''}
                </div>
            `;
        }
    }

    // Zusammenfassung und Empfehlungen
    const allClinical = [...clinicalBroadband, ...clinicalSyndromes];
    const allBorderline = [...borderlineBroadband, ...borderlineSyndromes];

    if (allClinical.length > 0 || allBorderline.length > 0) {
        html += '<div class="mt-3"><h4>Empfehlungen</h4><ul>';

        const seenRecommendations = new Set();

        for (const key of allClinical) {
            for (const rec of CBCL_SCALE_DESCRIPTIONS[key].interventions) {
                if (!seenRecommendations.has(rec)) {
                    html += `<li><strong>${rec}</strong></li>`;
                    seenRecommendations.add(rec);
                }
            }
        }

        for (const key of allBorderline) {
            for (const rec of CBCL_SCALE_DESCRIPTIONS[key].interventions) {
                if (!seenRecommendations.has(rec)) {
                    html += `<li>${rec}</li>`;
                    seenRecommendations.add(rec);
                }
            }
        }

        html += '</ul></div>';
    }

    // Komorbidität-Hinweis
    if (clinicalSyndromes.length >= 2) {
        html += `
            <div class="mt-3" style="padding: 1rem; background: #fef3c7; border-radius: 8px;">
                <strong>⚠️ Hinweis auf mögliche Komorbidität:</strong>
                <p>Es zeigen sich Auffälligkeiten in ${clinicalSyndromes.length} Syndromskalen.
                Eine differenzierte Abklärung möglicher Komorbiditäten wird empfohlen.</p>
            </div>
        `;
    }

    container.innerHTML = html;
}

/**
 * Hilfsfunktion für Klassifikationslabels
 */
function getCBCLClassificationLabel(classification) {
    const labels = {
        normal: '✓ Unauffällig',
        borderline: '⚠ Grenzwertig',
        clinical: '⚠ Klinisch auffällig'
    };
    return labels[classification];
}

/**
 * Exportiert CBCL-Daten für andere Module
 */
function getCBCLData() {
    const values = {
        anxious: parseInt(document.getElementById('cbcl-anxious').value) || null,
        withdrawn: parseInt(document.getElementById('cbcl-withdrawn').value) || null,
        somatic: parseInt(document.getElementById('cbcl-somatic').value) || null,
        social: parseInt(document.getElementById('cbcl-social').value) || null,
        thought: parseInt(document.getElementById('cbcl-thought').value) || null,
        attention: parseInt(document.getElementById('cbcl-attention').value) || null,
        rulebreak: parseInt(document.getElementById('cbcl-rulebreak').value) || null,
        aggressive: parseInt(document.getElementById('cbcl-aggressive').value) || null,
        internal: parseInt(document.getElementById('cbcl-internal').value) || null,
        external: parseInt(document.getElementById('cbcl-external').value) || null,
        total: parseInt(document.getElementById('cbcl-total').value) || null
    };

    const classifications = {};
    for (const [key, value] of Object.entries(values)) {
        if (value !== null) {
            classifications[key] = classifyCBCLScore(key, value);
        }
    }

    return { values, classifications };
}

/**
 * Setzt CBCL-Werte (z.B. bei Import)
 */
function setCBCLValues(data) {
    const fields = ['anxious', 'withdrawn', 'somatic', 'social', 'thought', 'attention', 'rulebreak', 'aggressive', 'internal', 'external', 'total'];

    for (const field of fields) {
        if (data[field] !== undefined) {
            document.getElementById(`cbcl-${field}`).value = data[field];
        }
    }
}
