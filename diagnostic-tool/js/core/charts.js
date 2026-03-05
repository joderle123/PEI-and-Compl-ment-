/**
 * Charts Module - Diagramm-Erstellung mit Chart.js
 */

const ChartManager = {
    charts: {},
    colors: {
        normal: 'rgba(26, 127, 55, 0.7)',
        normalBorder: 'rgb(26, 127, 55)',
        borderline: 'rgba(154, 103, 0, 0.7)',
        borderlineBorder: 'rgb(154, 103, 0)',
        clinical: 'rgba(207, 34, 46, 0.7)',
        clinicalBorder: 'rgb(207, 34, 46)',
        primary: 'rgba(0, 51, 102, 0.7)',
        primaryBorder: 'rgb(0, 51, 102)',
        gray: 'rgba(140, 149, 159, 0.3)',
        grayBorder: 'rgb(140, 149, 159)'
    },

    /**
     * Erstellt oder aktualisiert ein Balkendiagramm
     */
    createBarChart(canvasId, labels, data, options = {}) {
        const ctx = document.getElementById(canvasId)?.getContext('2d');
        if (!ctx) {
            console.error(`Canvas ${canvasId} nicht gefunden`);
            return null;
        }

        // Vorheriges Chart zerstören
        if (this.charts[canvasId]) {
            this.charts[canvasId].destroy();
        }

        const defaultOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: !!options.title,
                    text: options.title || '',
                    font: {
                        size: 14,
                        weight: 600
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: options.beginAtZero !== false,
                    min: options.yMin,
                    max: options.yMax,
                    title: {
                        display: !!options.yLabel,
                        text: options.yLabel || ''
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    ticks: {
                        maxRotation: 45,
                        minRotation: 0
                    },
                    grid: {
                        display: false
                    }
                }
            }
        };

        this.charts[canvasId] = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: options.label || 'Wert',
                    data: data.values,
                    backgroundColor: data.colors || this.colors.primary,
                    borderColor: data.borderColors || this.colors.primaryBorder,
                    borderWidth: 2
                }]
            },
            options: { ...defaultOptions, ...options.chartOptions }
        });

        return this.charts[canvasId];
    },

    /**
     * Erstellt ein Profildiagramm mit Referenzlinien
     */
    createProfileChart(canvasId, labels, data, options = {}) {
        const ctx = document.getElementById(canvasId)?.getContext('2d');
        if (!ctx) return null;

        if (this.charts[canvasId]) {
            this.charts[canvasId].destroy();
        }

        const referenceLines = options.referenceLines || [];

        this.charts[canvasId] = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: options.label || 'Wert',
                    data: data.values,
                    backgroundColor: data.colors || this.colors.primary,
                    borderColor: data.borderColors || this.colors.primaryBorder,
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    annotation: referenceLines.length > 0 ? {
                        annotations: referenceLines.reduce((acc, line, i) => {
                            acc[`line${i}`] = {
                                type: 'line',
                                yMin: line.value,
                                yMax: line.value,
                                borderColor: line.color || 'rgba(0,0,0,0.3)',
                                borderWidth: 2,
                                borderDash: [5, 5]
                            };
                            return acc;
                        }, {})
                    } : undefined
                },
                scales: {
                    y: {
                        min: options.yMin || 0,
                        max: options.yMax || 100,
                        title: {
                            display: true,
                            text: options.yLabel || 'Wert'
                        }
                    },
                    x: {
                        ticks: {
                            maxRotation: 45,
                            minRotation: 0,
                            font: { size: 10 }
                        }
                    }
                }
            }
        });

        return this.charts[canvasId];
    },

    /**
     * Gibt Farben basierend auf Klassifikationen zurück
     */
    getClassificationColors(classifications) {
        return classifications.map(c => {
            if (c === 'clinical' || c === 'veryLow') return this.colors.clinical;
            if (c === 'borderline' || c === 'lowAverage') return this.colors.borderline;
            return this.colors.normal;
        });
    },

    getClassificationBorderColors(classifications) {
        return classifications.map(c => {
            if (c === 'clinical' || c === 'veryLow') return this.colors.clinicalBorder;
            if (c === 'borderline' || c === 'lowAverage') return this.colors.borderlineBorder;
            return this.colors.normalBorder;
        });
    },

    /**
     * Zerstört alle Charts
     */
    destroyAll() {
        Object.values(this.charts).forEach(chart => chart?.destroy());
        this.charts = {};
    },

    /**
     * Zerstört ein spezifisches Chart
     */
    destroy(canvasId) {
        if (this.charts[canvasId]) {
            this.charts[canvasId].destroy();
            delete this.charts[canvasId];
        }
    }
};

window.ChartManager = ChartManager;
