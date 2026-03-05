/**
 * WISC-V - Wechsler Intelligence Scale for Children
 * Auswertungs- und Interpretationsmodul
 *
 * Standardwerte: M=100, SD=15
 * Wertpunkte Untertests: M=10, SD=3
 */

// Klassifikationsgrenzen für IQ-Werte
const WISC_CLASSIFICATION = {
    veryHigh: { min: 130, label: 'Weit überdurchschnittlich', percentile: '>98' },
    high: { min: 120, max: 129, label: 'Überdurchschnittlich', percentile: '91-98' },
    highAverage: { min: 110, max: 119, label: 'Hoch durchschnittlich', percentile: '75-90' },
    average: { min: 90, max: 109, label: 'Durchschnittlich', percentile: '25-74' },
    lowAverage: { min: 80, max: 89, label: 'Niedrig durchschnittlich', percentile: '9-24' },
    borderline: { min: 70, max: 79, label: 'Unterdurchschnittlich', percentile: '2-8' },
    veryLow: { max: 69, label: 'Weit unterdurchschnittlich', percentile: '<2' }
};

// Index-Beschreibungen
const WISC_INDEX_DESCRIPTIONS = {
    vci: {
        name: 'Sprachverständnis-Index (VCI)',
        fullName: 'Verbal Comprehension Index',
        description: 'Misst sprachliche Konzeptbildung, verbales Schlussfolgern und kristalline Intelligenz.',
        abilities: ['Wortschatz und sprachlicher Ausdruck', 'Allgemeinwissen', 'Abstraktes verbales Denken'],
        lowImplications: [
            'Mögliche Sprachentwicklungsstörung prüfen',
            'Bildungsbenachteiligung oder DaZ-Hintergrund beachten',
            'Förderung sprachlicher Kompetenzen empfohlen'
        ],
        highImplications: [
            'Ausgeprägte verbale Begabung',
            'Potenzial für sprachbasierte Lernformen',
            'Gute Voraussetzungen für akademisches Lernen'
        ]
    },
    vsi: {
        name: 'Visuell-räumlicher Index (VSI)',
        fullName: 'Visual Spatial Index',
        description: 'Erfasst die Fähigkeit zur Analyse und Synthese visuell-räumlicher Informationen.',
        abilities: ['Räumliche Vorstellung', 'Visuelle Analyse und Synthese', 'Teil-Ganzes-Beziehungen'],
        lowImplications: [
            'Mögliche visuell-räumliche Wahrnehmungsstörung',
            'Schwierigkeiten in Geometrie und technischem Zeichnen möglich',
            'Visuelle Lernstrategien ggf. weniger effektiv'
        ],
        highImplications: [
            'Stärke im visuell-räumlichen Bereich',
            'Potenzial für technische/naturwissenschaftliche Bereiche',
            'Visuelle Lernmaterialien bevorzugen'
        ]
    },
    fri: {
        name: 'Fluides Schlussfolgern (FRI)',
        fullName: 'Fluid Reasoning Index',
        description: 'Misst logisches Denken und die Fähigkeit, neue Probleme zu lösen.',
        abilities: ['Induktives Denken', 'Quantitatives Schlussfolgern', 'Mustererkennung'],
        lowImplications: [
            'Mögliche Einschränkungen im abstrakten Denken',
            'Komplexe Problemlöseaufgaben können schwerfallen',
            'Strukturierte Lernumgebung empfohlen'
        ],
        highImplications: [
            'Ausgeprägte logisch-analytische Fähigkeiten',
            'Gute Problemlösekompetenz',
            'Potenzial für Mathematik und Naturwissenschaften'
        ]
    },
    wmi: {
        name: 'Arbeitsgedächtnis-Index (WMI)',
        fullName: 'Working Memory Index',
        description: 'Erfasst die Kapazität zur Aufnahme, Speicherung und Verarbeitung von Informationen.',
        abilities: ['Auditive Merkspanne', 'Mentale Manipulation', 'Konzentration'],
        lowImplications: [
            'Arbeitsgedächtnisdefizite als möglicher Kernaspekt von ADHS',
            'Schwierigkeiten bei komplexen Anweisungen',
            'Externe Gedächtnisstützen empfohlen',
            'Informationen in kleinere Einheiten aufteilen'
        ],
        highImplications: [
            'Gute Kapazität für mentale Verarbeitung',
            'Kann komplexe Anweisungen gut verarbeiten',
            'Stärke im Umgang mit Mehrfachanforderungen'
        ]
    },
    psi: {
        name: 'Verarbeitungsgeschwindigkeit (PSI)',
        fullName: 'Processing Speed Index',
        description: 'Misst die Geschwindigkeit der mentalen und motorischen Informationsverarbeitung.',
        abilities: ['Visuelle Abtastgeschwindigkeit', 'Graphomotorische Geschwindigkeit', 'Kognitive Flexibilität'],
        lowImplications: [
            'Langsames Arbeitstempo bei zeitgebundenen Aufgaben',
            'Möglicher Zusammenhang mit Aufmerksamkeitsproblemen',
            'Nachteilsausgleich (Zeitzugabe) prüfen',
            'Mögliche feinmotorische Schwierigkeiten abklären'
        ],
        highImplications: [
            'Schnelle Informationsverarbeitung',
            'Effiziente Bearbeitung von Routineaufgaben',
            'Vorteil bei zeitgebundenen Aufgaben'
        ]
    },
    fsiq: {
        name: 'Gesamt-IQ (FSIQ)',
        fullName: 'Full Scale Intelligence Quotient',
        description: 'Globaler Indikator der allgemeinen kognitiven Leistungsfähigkeit.',
        abilities: ['Allgemeine intellektuelle Fähigkeit', 'Kognitive Gesamtkapazität'],
        lowImplications: [
            'Bei FSIQ < 70: Hinweis auf mögliche Intelligenzminderung',
            'Förderbedarf im Bereich Lernen prüfen',
            'Adaptive Fähigkeiten zusätzlich erheben'
        ],
        highImplications: [
            'Überdurchschnittliche kognitive Begabung',
            'Bei FSIQ ≥ 130: Hochbegabung',
            'Potenzialentfaltung und angemessene Förderung wichtig'
        ]
    }
};

let wiscChart = null;

/**
 * Klassifiziert einen Index-Wert
 */
function classifyWISCScore(value) {
    if (value >= 130) return 'veryHigh';
    if (value >= 120) return 'high';
    if (value >= 110) return 'highAverage';
    if (value >= 90) return 'average';
    if (value >= 80) return 'lowAverage';
    if (value >= 70) return 'borderline';
    return 'veryLow';
}

/**
 * Berechnet das Perzentil aus einem Standardwert
 */
function calculatePercentile(value) {
    // Approximation über z-Wert
    const z = (value - 100) / 15;

    // Näherungsformel für kumulative Normalverteilung
    const a1 = 0.254829592;
    const a2 = -0.284496736;
    const a3 = 1.421413741;
    const a4 = -1.453152027;
    const a5 = 1.061405429;
    const p = 0.3275911;

    const sign = z < 0 ? -1 : 1;
    const absZ = Math.abs(z);
    const t = 1.0 / (1.0 + p * absZ);
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-absZ * absZ / 2);

    const percentile = (0.5 * (1.0 + sign * y)) * 100;
    return Math.round(percentile);
}

/**
 * Berechnet Konfidenzintervall (95%)
 */
function calculateConfidenceInterval(value, sem = 3) {
    // SEM für WISC-V Indizes liegt typischerweise bei 3-5 Punkten
    const lower = Math.round(value - (1.96 * sem));
    const upper = Math.round(value + (1.96 * sem));
    return { lower, upper };
}

/**
 * Hauptfunktion zur WISC-V Auswertung
 */
function evaluateWISC() {
    // Werte auslesen
    const values = {
        vci: parseInt(document.getElementById('wisc-vci').value) || null,
        vsi: parseInt(document.getElementById('wisc-vsi').value) || null,
        fri: parseInt(document.getElementById('wisc-fri').value) || null,
        wmi: parseInt(document.getElementById('wisc-wmi').value) || null,
        psi: parseInt(document.getElementById('wisc-psi').value) || null,
        fsiq: parseInt(document.getElementById('wisc-fsiq').value) || null
    };

    // Mindestens ein Wert erforderlich
    const hasValues = Object.values(values).some(v => v !== null);
    if (!hasValues) {
        alert('Bitte geben Sie mindestens einen Index-Wert ein.');
        return;
    }

    // Validierung (40-160)
    for (const [key, value] of Object.entries(values)) {
        if (value !== null && (value < 40 || value > 160)) {
            alert(`Bitte geben Sie für "${WISC_INDEX_DESCRIPTIONS[key].name}" einen Wert zwischen 40 und 160 ein.`);
            return;
        }
    }

    // Klassifikationen erstellen
    const classifications = {};
    for (const [key, value] of Object.entries(values)) {
        if (value !== null) {
            classifications[key] = classifyWISCScore(value);
        }
    }

    // Chart erstellen/aktualisieren
    createWISCChart(values);

    // Interpretation generieren
    generateWISCInterpretation(values, classifications);

    // Profilanalyse
    generateWISCProfileAnalysis(values);

    // Ergebnisse anzeigen
    document.getElementById('wisc-results').classList.remove('hidden');

    // Scrollen zu Ergebnissen
    document.getElementById('wisc-results').scrollIntoView({ behavior: 'smooth' });
}

/**
 * Erstellt das WISC-V Profil-Diagramm
 */
function createWISCChart(values) {
    const ctx = document.getElementById('wisc-chart').getContext('2d');

    if (wiscChart) {
        wiscChart.destroy();
    }

    const indices = ['vci', 'vsi', 'fri', 'wmi', 'psi'];
    const labels = indices.map(i => WISC_INDEX_DESCRIPTIONS[i].name.split('(')[0].trim());
    const data = indices.map(i => values[i]);

    // Hintergrundfarben basierend auf Bereichen
    const backgroundColors = data.map(v => {
        if (v === null) return 'rgba(200, 200, 200, 0.3)';
        if (v >= 110) return 'rgba(34, 197, 94, 0.6)';
        if (v >= 90) return 'rgba(59, 130, 246, 0.6)';
        if (v >= 80) return 'rgba(245, 158, 11, 0.6)';
        return 'rgba(239, 68, 68, 0.6)';
    });

    wiscChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Index-Wert',
                data: data,
                backgroundColor: backgroundColors,
                borderColor: backgroundColors.map(c => c.replace('0.6', '1')),
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    min: 40,
                    max: 160,
                    title: {
                        display: true,
                        text: 'Index-Wert (M=100, SD=15)'
                    },
                    ticks: {
                        callback: function (value) {
                            return value;
                        }
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
                    text: 'WISC-V Index-Profil'
                },
                annotation: {
                    annotations: {
                        averageLine: {
                            type: 'line',
                            yMin: 100,
                            yMax: 100,
                            borderColor: 'rgba(0, 0, 0, 0.3)',
                            borderWidth: 2,
                            borderDash: [5, 5],
                            label: {
                                content: 'M=100',
                                enabled: true
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
function generateWISCInterpretation(values, classifications) {
    const container = document.getElementById('wisc-interpretation');
    let html = '';

    // Gesamt-IQ zuerst
    if (values.fsiq !== null) {
        const fsiqClass = classifications.fsiq;
        const fsiqInfo = WISC_CLASSIFICATION[fsiqClass];
        const percentile = calculatePercentile(values.fsiq);
        const ci = calculateConfidenceInterval(values.fsiq);

        html += `
            <div class="interpretation-item ${fsiqClass === 'average' ? 'normal' : (fsiqClass === 'borderline' || fsiqClass === 'veryLow' ? 'clinical' : 'borderline')}">
                <div class="scale-name">Gesamt-IQ (FSIQ)</div>
                <div class="scale-value">
                    Wert: ${values.fsiq} | Perzentil: ${percentile} | 95%-KI: ${ci.lower}-${ci.upper}
                </div>
                <div class="scale-classification">${fsiqInfo.label}</div>
                <p class="mt-1">${WISC_INDEX_DESCRIPTIONS.fsiq.description}</p>
            </div>
        `;
    }

    // Einzelne Indizes
    const indices = ['vci', 'vsi', 'fri', 'wmi', 'psi'];
    for (const index of indices) {
        if (values[index] === null) continue;

        const classification = classifications[index];
        const classInfo = WISC_CLASSIFICATION[classification];
        const indexInfo = WISC_INDEX_DESCRIPTIONS[index];
        const percentile = calculatePercentile(values[index]);
        const ci = calculateConfidenceInterval(values[index]);

        const cssClass = classification === 'average' || classification === 'highAverage' || classification === 'high' || classification === 'veryHigh'
            ? 'normal'
            : (classification === 'borderline' || classification === 'veryLow' ? 'clinical' : 'borderline');

        html += `
            <div class="interpretation-item ${cssClass}">
                <div class="scale-name">${indexInfo.name}</div>
                <div class="scale-value">
                    Wert: ${values[index]} | Perzentil: ${percentile} | 95%-KI: ${ci.lower}-${ci.upper}
                </div>
                <div class="scale-classification">${classInfo.label}</div>
                <p class="mt-1">${indexInfo.description}</p>
            </div>
        `;
    }

    container.innerHTML = html;
}

/**
 * Führt Profilanalyse durch
 */
function generateWISCProfileAnalysis(values) {
    const container = document.getElementById('wisc-profile');
    let html = '';

    const indices = ['vci', 'vsi', 'fri', 'wmi', 'psi'];
    const availableValues = indices.filter(i => values[i] !== null);

    if (availableValues.length < 2) {
        html = '<p>Für eine Profilanalyse werden mindestens zwei Index-Werte benötigt.</p>';
        container.innerHTML = html;
        return;
    }

    // Stärken und Schwächen identifizieren
    const mean = availableValues.reduce((sum, i) => sum + values[i], 0) / availableValues.length;

    const strengths = [];
    const weaknesses = [];
    const significantDiscrepancies = [];

    for (const index of availableValues) {
        const diff = values[index] - mean;
        const indexName = WISC_INDEX_DESCRIPTIONS[index].name.split('(')[0].trim();

        if (diff >= 10) {
            strengths.push({
                index: index,
                name: indexName,
                value: values[index],
                diff: Math.round(diff)
            });
        } else if (diff <= -10) {
            weaknesses.push({
                index: index,
                name: indexName,
                value: values[index],
                diff: Math.round(diff)
            });
        }
    }

    // Diskrepanzen zwischen Indizes
    for (let i = 0; i < availableValues.length; i++) {
        for (let j = i + 1; j < availableValues.length; j++) {
            const diff = Math.abs(values[availableValues[i]] - values[availableValues[j]]);
            if (diff >= 15) {
                significantDiscrepancies.push({
                    index1: availableValues[i],
                    index2: availableValues[j],
                    diff: diff
                });
            }
        }
    }

    // HTML generieren
    html += `<p><strong>Mittlerer Index-Wert:</strong> ${Math.round(mean)}</p>`;

    if (strengths.length > 0) {
        html += '<h5>Relative Stärken</h5>';
        for (const s of strengths) {
            html += `<div class="strength-item">
                ✓ ${s.name}: ${s.value} (+${s.diff} über Mittel)
                <br><small>${WISC_INDEX_DESCRIPTIONS[s.index].highImplications[0]}</small>
            </div>`;
        }
    }

    if (weaknesses.length > 0) {
        html += '<h5>Relative Schwächen</h5>';
        for (const w of weaknesses) {
            html += `<div class="weakness-item">
                ↓ ${w.name}: ${w.value} (${w.diff} unter Mittel)
                <br><small>${WISC_INDEX_DESCRIPTIONS[w.index].lowImplications[0]}</small>
            </div>`;
        }
    }

    if (significantDiscrepancies.length > 0) {
        html += '<h5>Signifikante Diskrepanzen (≥15 Punkte)</h5>';
        for (const d of significantDiscrepancies) {
            const name1 = WISC_INDEX_DESCRIPTIONS[d.index1].name.split('(')[0].trim();
            const name2 = WISC_INDEX_DESCRIPTIONS[d.index2].name.split('(')[0].trim();
            html += `<div class="discrepancy-item">
                ⚡ ${name1} vs. ${name2}: ${d.diff} Punkte Differenz
            </div>`;
        }
        html += '<p class="mt-2"><em>Signifikante Diskrepanzen deuten auf ein uneinheitliches kognitives Profil hin. Die Interpretation des Gesamt-IQ sollte entsprechend vorsichtig erfolgen.</em></p>';
    }

    if (strengths.length === 0 && weaknesses.length === 0 && significantDiscrepancies.length === 0) {
        html += '<p class="mt-2">Das Profil zeigt eine relativ gleichmäßige Verteilung der kognitiven Fähigkeiten ohne ausgeprägte Stärken oder Schwächen.</p>';
    }

    container.innerHTML = html;
}

/**
 * Exportiert WISC-Daten für andere Module
 */
function getWISCData() {
    const values = {
        vci: parseInt(document.getElementById('wisc-vci').value) || null,
        vsi: parseInt(document.getElementById('wisc-vsi').value) || null,
        fri: parseInt(document.getElementById('wisc-fri').value) || null,
        wmi: parseInt(document.getElementById('wisc-wmi').value) || null,
        psi: parseInt(document.getElementById('wisc-psi').value) || null,
        fsiq: parseInt(document.getElementById('wisc-fsiq').value) || null
    };

    const classifications = {};
    for (const [key, value] of Object.entries(values)) {
        if (value !== null) {
            classifications[key] = classifyWISCScore(value);
        }
    }

    return { values, classifications };
}

/**
 * Setzt WISC-Werte (z.B. bei Import)
 */
function setWISCValues(data) {
    if (data.vci !== undefined) document.getElementById('wisc-vci').value = data.vci;
    if (data.vsi !== undefined) document.getElementById('wisc-vsi').value = data.vsi;
    if (data.fri !== undefined) document.getElementById('wisc-fri').value = data.fri;
    if (data.wmi !== undefined) document.getElementById('wisc-wmi').value = data.wmi;
    if (data.psi !== undefined) document.getElementById('wisc-psi').value = data.psi;
    if (data.fsiq !== undefined) document.getElementById('wisc-fsiq').value = data.fsiq;
}
