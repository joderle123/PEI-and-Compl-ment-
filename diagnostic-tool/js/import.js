/**
 * Import-Modul
 * CSV/Excel-Import und Dateiverarbeitung
 * Erweitert für alle Tests: SDQ, WISC, CBCL, DISYPS, AFS, d2-R
 */

const DataImport = {
    supportedFormats: ['.csv', '.xlsx', '.xls', '.json'],
    pendingImport: null,

    /**
     * Initialisiert den Drag & Drop Bereich
     */
    init() {
        const dropZone = document.getElementById('import-drop-zone');
        const fileInput = document.getElementById('import-file-input');

        if (!dropZone || !fileInput) return;

        // Drag & Drop Events
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('drag-over');
        });

        dropZone.addEventListener('dragleave', (e) => {
            e.preventDefault();
            dropZone.classList.remove('drag-over');
        });

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('drag-over');
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                this.handleFile(files[0]);
            }
        });

        // Click to upload
        dropZone.addEventListener('click', () => {
            fileInput.click();
        });

        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                this.handleFile(e.target.files[0]);
            }
        });
    },

    /**
     * Verarbeitet eine hochgeladene Datei
     */
    async handleFile(file) {
        const extension = '.' + file.name.split('.').pop().toLowerCase();

        if (!this.supportedFormats.includes(extension)) {
            showNotification(`Nicht unterstütztes Format. Erlaubt: ${this.supportedFormats.join(', ')}`, 'error');
            return;
        }

        try {
            let data;
            if (extension === '.json') {
                data = await this.readJSON(file);
            } else if (extension === '.csv') {
                data = await this.readCSV(file);
            } else {
                showNotification('Excel-Import: Bitte nutzen Sie das CSV-Format.', 'warning');
                return;
            }

            if (data) {
                this.displayImportPreview(data, file.name);
            }
        } catch (error) {
            console.error('Import-Fehler:', error);
            showNotification('Fehler beim Lesen der Datei: ' + error.message, 'error');
        }
    },

    /**
     * Liest eine JSON-Datei
     */
    async readJSON(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    resolve(this.normalizeData(data, 'json'));
                } catch (error) {
                    reject(new Error('Ungültiges JSON-Format'));
                }
            };
            reader.onerror = () => reject(new Error('Fehler beim Lesen der Datei'));
            reader.readAsText(file);
        });
    },

    /**
     * Liest eine CSV-Datei
     */
    async readCSV(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const csv = e.target.result;
                    const data = this.parseCSV(csv);
                    resolve(this.normalizeData(data, 'csv'));
                } catch (error) {
                    reject(new Error('Fehler beim Parsen der CSV-Datei'));
                }
            };
            reader.onerror = () => reject(new Error('Fehler beim Lesen der Datei'));
            reader.readAsText(file, 'UTF-8');
        });
    },

    /**
     * Parst CSV-Text
     */
    parseCSV(text) {
        const lines = text.split(/\r?\n/).filter(line => line.trim() && !line.trim().startsWith('#'));
        if (lines.length < 2) {
            throw new Error('CSV muss mindestens Header und eine Datenzeile enthalten');
        }

        const delimiter = text.includes(';') ? ';' : ',';
        const headers = lines[0].split(delimiter).map(h => h.trim().replace(/^["']|["']$/g, ''));
        const rows = [];

        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(delimiter).map(v => v.trim().replace(/^["']|["']$/g, ''));
            if (values.length === headers.length) {
                const row = {};
                headers.forEach((header, index) => {
                    row[header] = values[index];
                });
                rows.push(row);
            }
        }

        return { headers, rows };
    },

    /**
     * Normalisiert importierte Daten
     */
    normalizeData(rawData, format) {
        const detectedTests = this.detectTestType(rawData);
        return {
            format,
            raw: rawData,
            detectedTests,
            normalized: this.mapToTestFormat(rawData, detectedTests)
        };
    },

    /**
     * Erkennt den Testtyp anhand der Spaltenüberschriften
     */
    detectTestType(data) {
        const headers = data.headers || Object.keys(data.rows?.[0] || data);
        const headerStr = headers.join(' ').toLowerCase();
        const detected = [];

        // SDQ-Erkennung
        if (headerStr.includes('emotional') || headerStr.includes('conduct') ||
            headerStr.includes('hyperactivity') || headerStr.includes('prosocial') ||
            headerStr.includes('sdq')) {
            detected.push('sdq');
        }

        // WISC-Erkennung
        if (headerStr.includes('vci') || headerStr.includes('vsi') || headerStr.includes('fri') ||
            headerStr.includes('wmi') || headerStr.includes('psi') || headerStr.includes('fsiq') ||
            headerStr.includes('wisc') || headerStr.includes('sprachverständnis')) {
            detected.push('wisc');
        }

        // CBCL-Erkennung
        if (headerStr.includes('anxious') || headerStr.includes('withdrawn') ||
            headerStr.includes('internalizing') || headerStr.includes('externalizing') ||
            headerStr.includes('cbcl') || headerStr.includes('ängstlich')) {
            detected.push('cbcl');
        }

        // DISYPS-Erkennung
        if (headerStr.includes('unaufmerksamkeit') || headerStr.includes('inattention') ||
            headerStr.includes('disyps') || headerStr.includes('adhs') ||
            headerStr.includes('ssv') || headerStr.includes('oppositionell')) {
            detected.push('disyps');
        }

        // AFS-Erkennung
        if (headerStr.includes('prüfungsangst') || headerStr.includes('schulunlust') ||
            headerStr.includes('manifeste') || headerStr.includes('afs') ||
            (headerStr.includes('pa') && headerStr.includes('ma') && headerStr.includes('su'))) {
            detected.push('afs');
        }

        // d2-R-Erkennung
        if (headerStr.includes('konzentrationsleistung') || headerStr.includes('d2') ||
            headerStr.includes('schwankungsbreite') ||
            (headerStr.includes('bz') && headerStr.includes('kl'))) {
            detected.push('d2r');
        }

        return detected;
    },

    /**
     * Mapped importierte Daten auf das interne Testformat
     */
    mapToTestFormat(data, tests) {
        const mapped = {};

        // Für JSON-Export aus dieser App
        if (data.sdq || data.wisc || data.cbcl || data.disyps || data.afs || data.d2r) {
            return data;
        }

        const rows = data.rows || [data];
        const row = rows[0];
        if (!row) return mapped;

        // SDQ-Mapping
        if (tests.includes('sdq')) {
            mapped.sdq = {
                emotional: this.findValue(row, ['emotional', 'emotionale_probleme', 'sdq_emotional']),
                conduct: this.findValue(row, ['conduct', 'verhaltensprobleme', 'sdq_conduct']),
                hyperactivity: this.findValue(row, ['hyperactivity', 'hyperaktivität', 'sdq_hyperactivity']),
                peer: this.findValue(row, ['peer', 'probleme_gleichaltrige', 'sdq_peer']),
                prosocial: this.findValue(row, ['prosocial', 'prosozial', 'sdq_prosocial']),
                respondent: this.findValue(row, ['respondent', 'beurteiler'], 'parent')
            };
        }

        // WISC-Mapping
        if (tests.includes('wisc')) {
            mapped.wisc = {
                vci: this.findValue(row, ['vci', 'sprachverständnis', 'verbal']),
                vsi: this.findValue(row, ['vsi', 'visuell_räumlich', 'visual']),
                fri: this.findValue(row, ['fri', 'fluides_schlussfolgern', 'fluid']),
                wmi: this.findValue(row, ['wmi', 'arbeitsgedächtnis', 'working_memory']),
                psi: this.findValue(row, ['psi', 'verarbeitungsgeschwindigkeit', 'processing_speed']),
                fsiq: this.findValue(row, ['fsiq', 'gesamt_iq', 'iq', 'total_iq'])
            };
        }

        // CBCL-Mapping
        if (tests.includes('cbcl')) {
            mapped.cbcl = {
                anxiousDepressed: this.findValue(row, ['anxious_depressed', 'ängstlich_depressiv', 'anxious']),
                withdrawnDepressed: this.findValue(row, ['withdrawn_depressed', 'rückzüglich', 'withdrawn']),
                somaticComplaints: this.findValue(row, ['somatic_complaints', 'körperliche_beschwerden', 'somatic']),
                socialProblems: this.findValue(row, ['social_problems', 'soziale_probleme', 'social']),
                thoughtProblems: this.findValue(row, ['thought_problems', 'denkprobleme', 'thought']),
                attentionProblems: this.findValue(row, ['attention_problems', 'aufmerksamkeit', 'attention']),
                ruleBreakingBehavior: this.findValue(row, ['rule_breaking', 'dissozial', 'rulebreak']),
                aggressiveBehavior: this.findValue(row, ['aggressive', 'aggressiv']),
                internalizing: this.findValue(row, ['internalizing', 'internalisierend', 'internal']),
                externalizing: this.findValue(row, ['externalizing', 'externalisierend', 'external']),
                totalProblems: this.findValue(row, ['total_problems', 'gesamt', 'total'])
            };
        }

        // DISYPS-Mapping
        if (tests.includes('disyps')) {
            mapped.disyps = {
                adhs: {
                    inattention: this.findValue(row, ['inattention', 'unaufmerksamkeit']),
                    hyperactivity: this.findValue(row, ['hyperactivity', 'überaktivität', 'adhs_hyperaktivität']),
                    impulsivity: this.findValue(row, ['impulsivity', 'impulsivität']),
                    adhsTotal: this.findValue(row, ['adhs_total', 'adhs_gesamt'])
                },
                ssv: {
                    oppositional: this.findValue(row, ['oppositional', 'oppositionell']),
                    aggressive: this.findValue(row, ['aggressive_dissocial', 'aggressiv_dissozial']),
                    limitedProsocial: this.findValue(row, ['limited_prosocial', 'begrenzte_prosoziale']),
                    ssvTotal: this.findValue(row, ['ssv_total', 'ssv_gesamt'])
                },
                respondent: this.findValue(row, ['respondent', 'beurteiler'], 'parent'),
                inputType: this.findValue(row, ['input_type', 'werttyp'], 'stanine')
            };
        }

        // AFS-Mapping
        if (tests.includes('afs')) {
            mapped.afs = {
                pa: this.findValue(row, ['pa', 'prüfungsangst']),
                ma: this.findValue(row, ['ma', 'manifeste_angst']),
                su: this.findValue(row, ['su', 'schulunlust']),
                se: this.findValue(row, ['se', 'soziale_erwünschtheit']),
                inputType: this.findValue(row, ['input_type', 'werttyp'], 'stanine')
            };
        }

        // d2-R-Mapping
        if (tests.includes('d2r')) {
            mapped.d2r = {
                bz: this.findValue(row, ['bz', 'bearbeitete_zielzeichen']),
                kl: this.findValue(row, ['kl', 'konzentrationsleistung']),
                f: this.findValue(row, ['f', 'fehler']),
                fp: this.findValue(row, ['fp', 'fehlerprozent']),
                sb: this.findValue(row, ['sb', 'schwankungsbreite']),
                inputType: this.findValue(row, ['input_type', 'werttyp'], 'percentile')
            };
        }

        return mapped;
    },

    /**
     * Sucht einen Wert in einem Objekt anhand verschiedener Schlüsselnamen
     */
    findValue(obj, keys, defaultValue = null) {
        for (const key of keys) {
            if (obj[key] !== undefined && obj[key] !== '') {
                const val = parseFloat(obj[key]);
                return isNaN(val) ? obj[key] : val;
            }
            const lowerKey = key.toLowerCase();
            for (const objKey of Object.keys(obj)) {
                if (objKey.toLowerCase() === lowerKey || objKey.toLowerCase().includes(lowerKey)) {
                    const val = parseFloat(obj[objKey]);
                    if (obj[objKey] !== '' && obj[objKey] !== undefined) {
                        return isNaN(val) ? obj[objKey] : val;
                    }
                }
            }
        }
        return defaultValue;
    },

    /**
     * Zeigt Vorschau der importierten Daten
     */
    displayImportPreview(data, filename) {
        const previewContainer = document.getElementById('import-preview');
        if (!previewContainer) return;

        const testNames = {
            sdq: 'SDQ', wisc: 'WISC-V', cbcl: 'CBCL',
            disyps: 'DISYPS-III', afs: 'AFS', d2r: 'd2-R'
        };

        let html = `
            <div class="import-preview-header">
                <h4>Import-Vorschau: ${filename}</h4>
                <p><strong>Erkannte Tests:</strong> ${data.detectedTests.length > 0 ?
                    data.detectedTests.map(t => testNames[t] || t.toUpperCase()).join(', ') :
                    'Keine automatische Erkennung'}</p>
            </div>
        `;

        // Zeige erkannte Daten
        if (data.normalized && Object.keys(data.normalized).length > 0) {
            html += '<div class="import-preview-data">';
            for (const [testType, testData] of Object.entries(data.normalized)) {
                if (!testData) continue;
                html += `
                    <div class="import-preview-test">
                        <h5>${testNames[testType] || testType.toUpperCase()}</h5>
                        <table class="import-preview-table">
                            <tbody>
                `;
                const flatData = this.flattenObject(testData);
                for (const [key, value] of Object.entries(flatData)) {
                    if (value !== null && value !== undefined) {
                        html += `<tr><td>${key}</td><td>${value}</td></tr>`;
                    }
                }
                html += '</tbody></table></div>';
            }
            html += '</div>';
        }

        // Rohdaten-Tabelle
        if (data.raw.rows && data.raw.headers) {
            html += `
                <div class="import-preview-raw">
                    <h5>Rohdaten (erste 5 Zeilen)</h5>
                    <div class="table-container">
                        <table class="import-raw-table">
                            <thead>
                                <tr>${data.raw.headers.map(h => `<th>${h}</th>`).join('')}</tr>
                            </thead>
                            <tbody>
                                ${data.raw.rows.slice(0, 5).map(row =>
                                    `<tr>${data.raw.headers.map(h => `<td>${row[h] || ''}</td>`).join('')}</tr>`
                                ).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
        }

        html += `
            <div class="import-actions" style="margin-top: 1rem; display: flex; gap: 1rem;">
                <button type="button" class="btn btn-primary" onclick="DataImport.applyImport()">
                    Daten übernehmen
                </button>
                <button type="button" class="btn btn-secondary" onclick="DataImport.clearPreview()">
                    Abbrechen
                </button>
            </div>
        `;

        previewContainer.innerHTML = html;
        previewContainer.style.display = 'block';
        this.pendingImport = data;
    },

    /**
     * Flacht verschachtelte Objekte ab
     */
    flattenObject(obj, prefix = '') {
        const result = {};
        for (const [key, value] of Object.entries(obj)) {
            const newKey = prefix ? `${prefix}.${key}` : key;
            if (value && typeof value === 'object' && !Array.isArray(value)) {
                Object.assign(result, this.flattenObject(value, newKey));
            } else {
                result[newKey] = value;
            }
        }
        return result;
    },

    /**
     * Wendet die importierten Daten an
     */
    applyImport() {
        if (!this.pendingImport || !this.pendingImport.normalized) {
            showNotification('Keine Daten zum Importieren', 'error');
            return;
        }

        const normalized = this.pendingImport.normalized;
        let appliedCount = 0;
        let firstTest = null;

        // SDQ-Daten anwenden
        if (normalized.sdq && typeof setSDQValues === 'function') {
            setSDQValues(normalized.sdq);
            appliedCount++;
            if (!firstTest) firstTest = 'sdq';
        }

        // WISC-Daten anwenden
        if (normalized.wisc && typeof setWISCValues === 'function') {
            setWISCValues(normalized.wisc);
            appliedCount++;
            if (!firstTest) firstTest = 'wisc';
        }

        // CBCL-Daten anwenden
        if (normalized.cbcl && typeof setCBCLValues === 'function') {
            setCBCLValues(normalized.cbcl);
            appliedCount++;
            if (!firstTest) firstTest = 'cbcl';
        }

        // AFS-Daten anwenden
        if (normalized.afs && typeof setAFSValues === 'function') {
            setAFSValues(normalized.afs);
            appliedCount++;
            if (!firstTest) firstTest = 'afs';
        }

        // d2-R-Daten anwenden
        if (normalized.d2r && typeof setD2RValues === 'function') {
            setD2RValues(normalized.d2r);
            appliedCount++;
            if (!firstTest) firstTest = 'd2r';
        }

        if (appliedCount > 0) {
            showNotification(`${appliedCount} Test(s) erfolgreich importiert`, 'success');
            this.clearPreview();

            if (firstTest && typeof switchToTest === 'function') {
                switchToTest(firstTest);
            }
        } else {
            showNotification('Keine Daten konnten zugeordnet werden', 'warning');
        }
    },

    /**
     * Löscht die Import-Vorschau
     */
    clearPreview() {
        const previewContainer = document.getElementById('import-preview');
        if (previewContainer) {
            previewContainer.innerHTML = '';
            previewContainer.style.display = 'none';
        }
        this.pendingImport = null;
        const fileInput = document.getElementById('import-file-input');
        if (fileInput) fileInput.value = '';
    },

    /**
     * Exportiert eine Vorlage-Datei
     */
    exportTemplate(testType) {
        const templates = {
            sdq: {
                content: 'Emotional;Conduct;Hyperactivity;Peer;Prosocial;Respondent\n5;3;4;2;7;parent',
                filename: 'sdq_vorlage.csv'
            },
            wisc: {
                content: 'VCI;VSI;FRI;WMI;PSI;FSIQ\n105;98;102;95;100;100',
                filename: 'wisc_vorlage.csv'
            },
            cbcl: {
                content: 'Anxious;Withdrawn;Somatic;Social;Thought;Attention;Rulebreak;Aggressive;Internal;External;Total\n55;52;48;50;45;58;50;52;53;51;52',
                filename: 'cbcl_vorlage.csv'
            },
            disyps: {
                content: 'Inattention;Hyperactivity;Impulsivity;ADHS_Total;Oppositional;Aggressive_Dissocial;Limited_Prosocial;SSV_Total;Respondent;Input_Type\n6;5;5;6;4;3;3;4;parent;stanine',
                filename: 'disyps_vorlage.csv'
            },
            afs: {
                content: 'PA;MA;SU;SE;Input_Type\n5;4;5;6;stanine',
                filename: 'afs_vorlage.csv'
            },
            d2r: {
                content: 'BZ;KL;F;FP;SB;Input_Type\n65;70;75;80;50;percentile',
                filename: 'd2r_vorlage.csv'
            }
        };

        const template = templates[testType];
        if (!template) {
            showNotification('Unbekannter Testtyp', 'error');
            return;
        }

        const blob = new Blob([template.content], { type: 'text/csv;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = template.filename;
        link.click();
        URL.revokeObjectURL(url);

        showNotification('Vorlage heruntergeladen', 'success');
    }
};

// Legacy-Funktionen für Abwärtskompatibilität
function initImport() { DataImport.init(); }
function handleFile(file) { DataImport.handleFile(file); }
function processImport() { DataImport.applyImport(); }
function downloadTemplate(testType) { DataImport.exportTemplate(testType); }

// Initialisierung
document.addEventListener('DOMContentLoaded', () => {
    DataImport.init();
});

// Global verfügbar machen
window.DataImport = DataImport;
