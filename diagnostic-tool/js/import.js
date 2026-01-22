/**
 * Import-Modul
 * Verarbeitet CSV-Dateien mit Testergebnissen
 */

let importedData = null;
let detectedTestType = null;

/**
 * Initialisiert die Import-Funktionalität
 */
function initImport() {
    const dropzone = document.getElementById('dropzone');
    const fileInput = document.getElementById('file-input');

    // Click-Event
    dropzone.addEventListener('click', () => fileInput.click());

    // Drag & Drop Events
    dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
    });

    dropzone.addEventListener('dragleave', () => {
        dropzone.classList.remove('dragover');
    });

    dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFile(files[0]);
        }
    });

    // File Input Change
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFile(e.target.files[0]);
        }
    });
}

/**
 * Verarbeitet die hochgeladene Datei
 */
function handleFile(file) {
    const validTypes = ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    const extension = file.name.split('.').pop().toLowerCase();

    if (!validTypes.includes(file.type) && !['csv', 'xlsx'].includes(extension)) {
        alert('Bitte laden Sie eine CSV- oder Excel-Datei hoch.');
        return;
    }

    if (extension === 'csv' || file.type === 'text/csv') {
        parseCSV(file);
    } else {
        alert('Excel-Import wird in einer zukünftigen Version unterstützt. Bitte verwenden Sie vorerst CSV-Dateien.');
    }
}

/**
 * Parst eine CSV-Datei
 */
function parseCSV(file) {
    const reader = new FileReader();

    reader.onload = (e) => {
        const content = e.target.result;
        const lines = content.split(/\r?\n/).filter(line => line.trim());

        if (lines.length < 2) {
            alert('Die Datei enthält keine gültigen Daten.');
            return;
        }

        // Header analysieren
        const header = lines[0].split(/[,;]/).map(h => h.trim().toLowerCase());

        // Test-Typ erkennen
        detectedTestType = detectTestType(header);

        if (!detectedTestType) {
            alert('Der Test-Typ konnte nicht erkannt werden. Bitte prüfen Sie das Dateiformat.');
            return;
        }

        // Daten parsen
        const data = [];
        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(/[,;]/).map(v => v.trim());
            if (values.length === header.length) {
                const row = {};
                header.forEach((h, idx) => {
                    row[h] = values[idx];
                });
                data.push(row);
            }
        }

        if (data.length === 0) {
            alert('Keine gültigen Datensätze gefunden.');
            return;
        }

        importedData = data;
        showImportPreview(header, data, detectedTestType);
    };

    reader.onerror = () => {
        alert('Fehler beim Lesen der Datei.');
    };

    reader.readAsText(file);
}

/**
 * Erkennt den Test-Typ anhand der Header
 */
function detectTestType(header) {
    const headerStr = header.join(' ').toLowerCase();

    // SDQ-Erkennung
    if (headerStr.includes('emotional') && headerStr.includes('conduct') ||
        headerStr.includes('hyperactivity') && headerStr.includes('peer') ||
        headerStr.includes('prosocial')) {
        return 'sdq';
    }

    // WISC-Erkennung
    if (headerStr.includes('vci') || headerStr.includes('vsi') ||
        headerStr.includes('fri') || headerStr.includes('wmi') ||
        headerStr.includes('psi') || headerStr.includes('fsiq') ||
        headerStr.includes('sprachverständnis') || headerStr.includes('arbeitsgedächtnis')) {
        return 'wisc';
    }

    // CBCL-Erkennung
    if (headerStr.includes('anxious') || headerStr.includes('ängstlich') ||
        headerStr.includes('withdrawn') || headerStr.includes('rückzug') ||
        headerStr.includes('internal') || headerStr.includes('external') ||
        headerStr.includes('aggressive')) {
        return 'cbcl';
    }

    return null;
}

/**
 * Zeigt die Import-Vorschau
 */
function showImportPreview(header, data, testType) {
    const previewContainer = document.getElementById('import-preview');
    const previewContent = document.getElementById('preview-content');

    const testNames = {
        sdq: 'SDQ',
        wisc: 'WISC-V',
        cbcl: 'CBCL'
    };

    let html = `<p><strong>Erkannter Test:</strong> ${testNames[testType]}</p>`;
    html += `<p><strong>Datensätze:</strong> ${data.length}</p>`;
    html += '<table style="width: 100%; border-collapse: collapse; margin-top: 1rem;">';

    // Header
    html += '<tr>';
    for (const h of header) {
        html += `<th style="border: 1px solid #ddd; padding: 8px; background: #f0f0f0;">${h}</th>`;
    }
    html += '</tr>';

    // Daten (erste 5 Zeilen)
    const displayData = data.slice(0, 5);
    for (const row of displayData) {
        html += '<tr>';
        for (const h of header) {
            html += `<td style="border: 1px solid #ddd; padding: 8px;">${row[h] || '-'}</td>`;
        }
        html += '</tr>';
    }

    if (data.length > 5) {
        html += `<tr><td colspan="${header.length}" style="text-align: center; padding: 8px; color: #666;">... und ${data.length - 5} weitere Datensätze</td></tr>`;
    }

    html += '</table>';

    if (data.length > 1) {
        html += '<p class="mt-2" style="color: #666;"><em>Hinweis: Bei mehreren Datensätzen wird der erste Eintrag importiert.</em></p>';
    }

    previewContent.innerHTML = html;
    previewContainer.classList.remove('hidden');
}

/**
 * Verarbeitet den Import und überträgt Daten
 */
function processImport() {
    if (!importedData || importedData.length === 0 || !detectedTestType) {
        alert('Keine Daten zum Importieren vorhanden.');
        return;
    }

    const data = importedData[0]; // Ersten Datensatz verwenden

    switch (detectedTestType) {
        case 'sdq':
            importSDQData(data);
            break;
        case 'wisc':
            importWISCData(data);
            break;
        case 'cbcl':
            importCBCLData(data);
            break;
    }

    // Zur entsprechenden Sektion wechseln
    switchToTest(detectedTestType);

    // Import-Vorschau ausblenden
    document.getElementById('import-preview').classList.add('hidden');

    alert(`Daten erfolgreich in ${detectedTestType.toUpperCase()} importiert! Bitte prüfen Sie die Werte und klicken Sie auf "Auswerten".`);
}

/**
 * Importiert SDQ-Daten
 */
function importSDQData(data) {
    const mapping = {
        'emotional': 'emotional',
        'emotionale probleme': 'emotional',
        'emotional problems': 'emotional',
        'conduct': 'conduct',
        'verhaltensprobleme': 'conduct',
        'conduct problems': 'conduct',
        'hyperactivity': 'hyperactivity',
        'hyperaktivität': 'hyperactivity',
        'hyperactivity/inattention': 'hyperactivity',
        'peer': 'peer',
        'peer problems': 'peer',
        'probleme mit gleichaltrigen': 'peer',
        'prosocial': 'prosocial',
        'prosoziales verhalten': 'prosocial',
        'prosocial behavior': 'prosocial',
        'respondent': 'respondent',
        'beurteiler': 'respondent'
    };

    const values = {};
    for (const [key, value] of Object.entries(data)) {
        const normalizedKey = key.toLowerCase().trim();
        const mappedKey = mapping[normalizedKey];
        if (mappedKey) {
            if (mappedKey === 'respondent') {
                const respValue = value.toLowerCase();
                if (respValue.includes('eltern') || respValue.includes('parent')) {
                    values.respondent = 'parent';
                } else if (respValue.includes('lehrer') || respValue.includes('teacher')) {
                    values.respondent = 'teacher';
                } else if (respValue.includes('selbst') || respValue.includes('self')) {
                    values.respondent = 'self';
                }
            } else {
                values[mappedKey] = parseInt(value) || 0;
            }
        }
    }

    setSDQValues(values);
}

/**
 * Importiert WISC-Daten
 */
function importWISCData(data) {
    const mapping = {
        'vci': 'vci',
        'sprachverständnis': 'vci',
        'verbal comprehension': 'vci',
        'vsi': 'vsi',
        'visuell-räumlich': 'vsi',
        'visual spatial': 'vsi',
        'fri': 'fri',
        'fluides schlussfolgern': 'fri',
        'fluid reasoning': 'fri',
        'wmi': 'wmi',
        'arbeitsgedächtnis': 'wmi',
        'working memory': 'wmi',
        'psi': 'psi',
        'verarbeitungsgeschwindigkeit': 'psi',
        'processing speed': 'psi',
        'fsiq': 'fsiq',
        'gesamt-iq': 'fsiq',
        'full scale iq': 'fsiq',
        'iq': 'fsiq'
    };

    const values = {};
    for (const [key, value] of Object.entries(data)) {
        const normalizedKey = key.toLowerCase().trim();
        const mappedKey = mapping[normalizedKey];
        if (mappedKey && value) {
            values[mappedKey] = parseInt(value);
        }
    }

    setWISCValues(values);
}

/**
 * Importiert CBCL-Daten
 */
function importCBCLData(data) {
    const mapping = {
        'anxious': 'anxious',
        'ängstlich/depressiv': 'anxious',
        'anxious/depressed': 'anxious',
        'withdrawn': 'withdrawn',
        'rückzug': 'withdrawn',
        'rückzug/depression': 'withdrawn',
        'withdrawn/depressed': 'withdrawn',
        'somatic': 'somatic',
        'körperliche beschwerden': 'somatic',
        'somatic complaints': 'somatic',
        'social': 'social',
        'soziale probleme': 'social',
        'social problems': 'social',
        'thought': 'thought',
        'schizoid/zwanghaft': 'thought',
        'thought problems': 'thought',
        'attention': 'attention',
        'aufmerksamkeitsprobleme': 'attention',
        'attention problems': 'attention',
        'rulebreak': 'rulebreak',
        'dissoziales verhalten': 'rulebreak',
        'rule-breaking': 'rulebreak',
        'aggressive': 'aggressive',
        'aggressives verhalten': 'aggressive',
        'aggressive behavior': 'aggressive',
        'internal': 'internal',
        'internalisierende störungen': 'internal',
        'internalizing': 'internal',
        'external': 'external',
        'externalisierende störungen': 'external',
        'externalizing': 'external',
        'total': 'total',
        'gesamtwert': 'total',
        'total problems': 'total'
    };

    const values = {};
    for (const [key, value] of Object.entries(data)) {
        const normalizedKey = key.toLowerCase().trim();
        const mappedKey = mapping[normalizedKey];
        if (mappedKey && value) {
            values[mappedKey] = parseInt(value);
        }
    }

    setCBCLValues(values);
}

/**
 * Wechselt zur Test-Sektion
 */
function switchToTest(testType) {
    // Navigation aktualisieren
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.test === testType) {
            btn.classList.add('active');
        }
    });

    // Sektionen aktualisieren
    document.querySelectorAll('.test-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(`${testType}-section`).classList.add('active');
}

/**
 * Lädt eine Vorlage herunter
 */
function downloadTemplate(testType) {
    let content = '';
    let filename = '';

    switch (testType) {
        case 'sdq':
            content = 'Emotional;Conduct;Hyperactivity;Peer;Prosocial;Respondent\n' +
                '0;0;0;0;10;parent\n' +
                '# Hinweis: Werte von 0-10, Respondent: parent/teacher/self';
            filename = 'sdq_vorlage.csv';
            break;
        case 'wisc':
            content = 'VCI;VSI;FRI;WMI;PSI;FSIQ\n' +
                '100;100;100;100;100;100\n' +
                '# Hinweis: Standardwerte M=100, SD=15, Bereich 40-160';
            filename = 'wisc_vorlage.csv';
            break;
        case 'cbcl':
            content = 'Anxious;Withdrawn;Somatic;Social;Thought;Attention;Rulebreak;Aggressive;Internal;External;Total\n' +
                '50;50;50;50;50;50;50;50;50;50;50\n' +
                '# Hinweis: T-Werte M=50, SD=10, Bereich 30-100';
            filename = 'cbcl_vorlage.csv';
            break;
    }

    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
}

// Initialisierung beim Laden der Seite
document.addEventListener('DOMContentLoaded', initImport);
