// ELDiB App - Main Application Logic
/**
 * @fileoverview ELDiB-Anwendung zur Erfassung von Entwicklungszielen
 * @description Ermöglicht die systematische Einschätzung von Entwicklungsständen
 *              nach dem ELDiB-System und die Generierung von PEI-Dokumenten.
 * @version 1.0.0
 */

/**
 * Validiert einen ELDiB-Item-Code
 * @param {string} code - Der zu validierende Code (z.B. "V-1", "K-10")
 * @returns {boolean} true wenn gültig
 */
function isValidItemCode(code) {
    if (!code || typeof code !== 'string') return false;
    // Format: V-1, K-10, SOZ-5, KOG-15
    return /^(V|K|SOZ|KOG)-\d+$/.test(code);
}

/**
 * Zeigt eine Benutzernachricht an
 * @param {string} message - Die Nachricht
 * @param {string} [type='info'] - 'error', 'warning', 'info', 'success'
 */
function showNotification(message, type = 'info') {
    const colors = {
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6',
        success: '#10b981'
    };

    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed; top: 20px; right: 20px;
        background: ${colors[type] || colors.info}; color: white;
        padding: 12px 20px; border-radius: 8px; z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        animation: slideIn 0.3s ease-out;
    `;
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'polite');
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

/**
 * Globaler Anwendungszustand
 * @type {Object}
 * @property {Object} selections - Einschätzungen pro Item-Code
 */
const state = {
    selections: {}  // Format: { "V-1": { status: "erreicht"|"nicht-erreicht"|"ziel", zieltext: "..." } }
};

// Debounce-Timer für localStorage-Speicherung
let saveDebounceTimer = null;

/**
 * Initialisiert die Anwendung nach DOM-Ladung
 */
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Prüfe ob ELDIB_DATA vorhanden ist
        if (typeof ELDIB_DATA === 'undefined') {
            throw new Error('ELDIB_DATA nicht geladen');
        }
        initializeItems();
        loadFromLocalStorage();
    } catch (error) {
        console.error('Initialisierungsfehler:', error.message);
        showNotification('Fehler beim Laden der Anwendung. Bitte Seite neu laden.', 'error');
    }
});

// Tab Navigation
function showTab(tabId) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });

    // Show selected tab content
    document.getElementById(tabId).classList.add('active');

    // Find and activate the correct tab button
    document.querySelectorAll('.tab').forEach(tab => {
        const onclickAttr = tab.getAttribute('onclick');
        if (onclickAttr && onclickAttr.includes("'" + tabId + "'")) {
            tab.classList.add('active');
        }
    });

    // Update stats if showing overview
    if (tabId === 'uebersicht') {
        updateStats();
    }
}

// Toggle Bereich collapse
function toggleBereich(contentId) {
    const content = document.getElementById(contentId);
    content.classList.toggle('hidden');
}

/**
 * Initialisiert alle Items aus ELDIB_DATA
 * Verwendet DocumentFragment für optimierte DOM-Performance
 */
function initializeItems() {
    for (const [bereichKey, bereich] of Object.entries(ELDIB_DATA)) {
        if (!bereich || !bereich.stufen) {
            console.warn(`Ungültige Bereichsdaten für "${bereichKey}"`);
            continue;
        }

        for (const [stufeNr, stufe] of Object.entries(bereich.stufen)) {
            const containerId = `${bereichKey}-stufe${stufeNr}-items`;
            const container = document.getElementById(containerId);

            if (!container) {
                console.warn(`Container nicht gefunden: ${containerId}`);
                continue;
            }

            if (!stufe.items || !Array.isArray(stufe.items)) {
                console.warn(`Keine Items für ${containerId}`);
                continue;
            }

            // DocumentFragment für bessere Performance (weniger Reflows)
            const fragment = document.createDocumentFragment();

            stufe.items.forEach(item => {
                if (item && item.code) {
                    fragment.appendChild(createItemElement(item, bereichKey));
                }
            });

            // Einmaliges DOM-Update statt vieler einzelner
            container.appendChild(fragment);
        }
    }
}

/**
 * Erstellt ein einzelnes ELDiB-Item-Element mit Accessibility-Features
 * @param {Object} item - Das Item-Objekt aus ELDIB_DATA
 * @param {string} item.code - Der Item-Code (z.B. "V-1")
 * @param {string} item.keyword - Das Schlüsselwort
 * @param {string} item.description - Die Beschreibung
 * @param {string[]} item.zielformulierungen - Array der Zielformulierungen
 * @param {string} bereichKey - Der Bereichsschlüssel
 * @returns {HTMLElement} Das erstellte DOM-Element
 */
function createItemElement(item, bereichKey) {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'item';
    itemDiv.id = `item-${item.code}`;
    itemDiv.setAttribute('role', 'group');
    itemDiv.setAttribute('aria-labelledby', `item-label-${item.code}`);

    // Escape HTML-Zeichen zur Vermeidung von XSS
    const escapeHtml = (str) => {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    };

    // Create ziel options HTML mit Escape
    const zielOptions = (item.zielformulierungen || []).map((z, i) =>
        `<option value="${i}">${escapeHtml(z)}</option>`
    ).join('');

    const escapedCode = escapeHtml(item.code);
    const escapedKeyword = escapeHtml(item.keyword);
    const escapedDescription = escapeHtml(item.description);

    itemDiv.innerHTML = `
        <div class="item-code" id="item-label-${escapedCode}">${escapedCode}</div>
        <div class="item-description">
            <span class="item-keyword">${escapedKeyword}:</span> ${escapedDescription}
        </div>
        <div class="item-options" role="group" aria-label="Bewertungsoptionen für ${escapedCode}">
            <button class="option-btn erreicht"
                    onclick="selectOption('${escapedCode}', 'erreicht', this)"
                    aria-label="${escapedCode} als erreicht markieren"
                    aria-pressed="false">
                Erreicht
            </button>
            <button class="option-btn nicht-erreicht"
                    onclick="selectOption('${escapedCode}', 'nicht-erreicht', this)"
                    aria-label="${escapedCode} als nicht erreicht markieren"
                    aria-pressed="false">
                Nicht erreicht
            </button>
            <button class="option-btn ziel"
                    onclick="selectOption('${escapedCode}', 'ziel', this)"
                    aria-label="${escapedCode} als Ziel setzen"
                    aria-pressed="false">
                Ziel
            </button>
        </div>
        <div class="ziel-box" id="ziel-box-${escapedCode}" aria-hidden="true">
            <h4>Zielformulierung auswählen:</h4>
            <select class="ziel-select"
                    id="ziel-select-${escapedCode}"
                    onchange="updateZieltext('${escapedCode}')"
                    aria-label="Vordefinierte Zielformulierung für ${escapedCode}">
                ${zielOptions}
            </select>
            <textarea class="ziel-custom"
                      id="ziel-custom-${escapedCode}"
                      placeholder="Oder eigene Formulierung eingeben..."
                      onchange="updateCustomZiel('${escapedCode}')"
                      aria-label="Eigene Zielformulierung für ${escapedCode}"></textarea>
        </div>
    `;

    return itemDiv;
}

// Handle option selection
function selectOption(code, status, button) {
    // Remove selected class from siblings
    const parent = button.parentElement;
    parent.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('selected');
    });

    // Add selected class to clicked button
    button.classList.add('selected');

    // Update state
    if (!state.selections[code]) {
        state.selections[code] = {};
    }
    state.selections[code].status = status;

    // Show/hide ziel box
    const zielBox = document.getElementById(`ziel-box-${code}`);
    if (status === 'ziel') {
        zielBox.classList.add('visible');
        // Set default zieltext
        updateZieltext(code);
    } else {
        zielBox.classList.remove('visible');
    }

    // Save to localStorage
    saveToLocalStorage();
}

/**
 * Aktualisiert den Zieltext aus dem Dropdown
 * @param {string} code - Der ELDiB-Item-Code
 */
function updateZieltext(code) {
    // Validiere Code
    if (!isValidItemCode(code)) {
        console.warn('Ungültiger Item-Code:', code);
        return;
    }

    const select = document.getElementById(`ziel-select-${code}`);
    const customTextarea = document.getElementById(`ziel-custom-${code}`);

    if (!select || !state.selections[code]) {
        return;
    }

    // Konvertiere zu Zahl für Array-Zugriff
    const selectedIndex = parseInt(select.value, 10);

    // Validiere Index
    if (isNaN(selectedIndex) || selectedIndex < 0) {
        console.warn('Ungültiger Auswahlindex:', select.value);
        return;
    }

    const item = findItemByCode(code);
    if (item && Array.isArray(item.zielformulierungen) && item.zielformulierungen[selectedIndex]) {
        state.selections[code].zieltext = item.zielformulierungen[selectedIndex];
        if (customTextarea) {
            customTextarea.value = item.zielformulierungen[selectedIndex];
        }
    }

    saveToLocalStorage();
}

// Update custom ziel text
function updateCustomZiel(code) {
    const customTextarea = document.getElementById(`ziel-custom-${code}`);
    if (customTextarea && state.selections[code]) {
        state.selections[code].zieltext = customTextarea.value;
    }
    saveToLocalStorage();
}

// Find item by code
function findItemByCode(code) {
    for (const bereich of Object.values(ELDIB_DATA)) {
        for (const stufe of Object.values(bereich.stufen)) {
            const item = stufe.items.find(i => i.code === code);
            if (item) return item;
        }
    }
    return null;
}

// Find bereich by item code
function findBereichByCode(code) {
    const prefix = code.split('-')[0];
    const mapping = {
        'V': 'verhalten',
        'K': 'kommunikation',
        'SOZ': 'sozialisation',
        'KOG': 'kognition'
    };
    return mapping[prefix];
}

/**
 * Aktualisiert die Statistik-Anzeige
 * Berechnet erreichte Items und Ziele pro Bereich
 */
function updateStats() {
    // Prüfe ob ITEM_COUNTS definiert ist
    if (typeof ITEM_COUNTS === 'undefined') {
        console.warn('ITEM_COUNTS nicht definiert');
        return;
    }

    const stats = {
        verhalten: { erreicht: 0, ziele: 0, total: ITEM_COUNTS.verhalten || 0 },
        kommunikation: { erreicht: 0, ziele: 0, total: ITEM_COUNTS.kommunikation || 0 },
        sozialisation: { erreicht: 0, ziele: 0, total: ITEM_COUNTS.sozialisation || 0 },
        kognition: { erreicht: 0, ziele: 0, total: ITEM_COUNTS.kognition || 0 }
    };

    // Count selections
    for (const [code, selection] of Object.entries(state.selections)) {
        if (!selection || !selection.status) continue;

        const bereich = findBereichByCode(code);
        if (bereich && stats[bereich]) {
            if (selection.status === 'erreicht') {
                stats[bereich].erreicht++;
            } else if (selection.status === 'ziel') {
                stats[bereich].ziele++;
            }
        }
    }

    // Update display mit Null-Checks
    for (const [bereich, data] of Object.entries(stats)) {
        const zieleEl = document.getElementById(`stats-${bereich}-ziele`);
        const erreichtEl = document.getElementById(`stats-${bereich}-erreicht`);
        const progressEl = document.getElementById(`progress-${bereich}`);

        if (zieleEl) {
            zieleEl.textContent = data.ziele;
        }
        if (erreichtEl) {
            erreichtEl.textContent = `${data.erreicht}/${data.total} erreicht`;
        }
        if (progressEl) {
            const progress = data.total > 0 ? (data.erreicht / data.total) * 100 : 0;
            progressEl.style.width = `${Math.min(100, progress)}%`;
        }
    }

    // Update Ziele Liste
    updateZieleListe();
    updateErreichteListe();
}

// Update selected goals list
function updateZieleListe() {
    const container = document.getElementById('ziele-liste');
    container.innerHTML = '';

    const ziele = Object.entries(state.selections)
        .filter(([code, sel]) => sel.status === 'ziel')
        .sort((a, b) => a[0].localeCompare(b[0]));

    if (ziele.length === 0) {
        container.innerHTML = '<p style="color: #888;">Noch keine Ziele ausgewählt.</p>';
        return;
    }

    const grouped = {};
    ziele.forEach(([code, sel]) => {
        const bereich = findBereichByCode(code);
        if (!grouped[bereich]) grouped[bereich] = [];
        const item = findItemByCode(code);
        grouped[bereich].push({ code, keyword: item?.keyword, zieltext: sel.zieltext });
    });

    for (const [bereich, items] of Object.entries(grouped)) {
        const bereichDiv = document.createElement('div');
        bereichDiv.style.marginBottom = '20px';
        bereichDiv.innerHTML = `<h4 style="color: ${ELDIB_DATA[bereich].color}; margin-bottom: 10px;">${ELDIB_DATA[bereich].name}</h4>`;

        items.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.style.padding = '10px';
            itemDiv.style.background = '#f9f9f9';
            itemDiv.style.borderRadius = '5px';
            itemDiv.style.marginBottom = '5px';
            itemDiv.innerHTML = `<strong>${item.code}</strong> (${item.keyword}): ${item.zieltext || 'Keine Formulierung'}`;
            bereichDiv.appendChild(itemDiv);
        });

        container.appendChild(bereichDiv);
    }
}

// Update last 4 achieved items per area (for Complement)
function updateErreichteListe() {
    const container = document.getElementById('erreichte-liste');
    container.innerHTML = '';

    const bereiche = ['verhalten', 'kommunikation', 'sozialisation', 'kognition'];

    bereiche.forEach(bereich => {
        const erreichte = Object.entries(state.selections)
            .filter(([code, sel]) => sel.status === 'erreicht' && findBereichByCode(code) === bereich)
            .map(([code]) => {
                const item = findItemByCode(code);
                return { code, keyword: item?.keyword, nr: parseInt(code.split('-')[1]) };
            })
            .sort((a, b) => b.nr - a.nr)  // Sort descending to get last 4
            .slice(0, 4);

        const bereichDiv = document.createElement('div');
        bereichDiv.style.marginBottom = '15px';
        bereichDiv.innerHTML = `<h4 style="color: ${ELDIB_DATA[bereich].color}; margin-bottom: 10px;">${ELDIB_DATA[bereich].name}</h4>`;

        if (erreichte.length === 0) {
            bereichDiv.innerHTML += '<p style="color: #888; font-size: 0.9em;">Keine erreichten Items</p>';
        } else {
            erreichte.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.style.padding = '5px 10px';
                itemDiv.style.background = '#e8f5e9';
                itemDiv.style.borderRadius = '3px';
                itemDiv.style.marginBottom = '3px';
                itemDiv.style.fontSize = '0.9em';
                itemDiv.textContent = `${item.code}: ${item.keyword}`;
                bereichDiv.appendChild(itemDiv);
            });
        }

        container.appendChild(bereichDiv);
    });
}

/**
 * Speichert Daten in localStorage mit Debouncing
 * Verhindert zu häufige Speichervorgänge bei schnellen Änderungen
 * @param {boolean} [immediate=false] - Sofort speichern ohne Debounce
 * @returns {void}
 */
function saveToLocalStorage(immediate = false) {
    const doSave = () => {
        try {
            if (typeof localStorage === 'undefined') {
                console.warn('localStorage nicht verfügbar');
                return;
            }

            const data = {
                selections: state.selections,
                stammdaten: {
                    schueler_name: document.getElementById('schueler_name')?.value || '',
                    geburtsdatum: document.getElementById('geburtsdatum')?.value || '',
                    matricule: document.getElementById('matricule')?.value || '',
                    foerderort: document.getElementById('foerderort')?.value || '',
                    klasse: document.getElementById('klasse')?.value || '',
                    schuljahr: document.getElementById('schuljahr')?.value || '',
                    trimester: document.getElementById('trimester')?.value || '',
                    einschaetzungsdatum: document.getElementById('einschaetzungsdatum')?.value || '',
                    einschaetzende: document.getElementById('einschaetzende')?.value || '',
                    eltern1_name: document.getElementById('eltern1_name')?.value || '',
                    eltern1_tel: document.getElementById('eltern1_tel')?.value || '',
                    eltern1_email: document.getElementById('eltern1_email')?.value || ''
                },
                version: '1.0',
                savedAt: new Date().toISOString()
            };

            localStorage.setItem('eldib-data', JSON.stringify(data));
        } catch (error) {
            if (error.name === 'QuotaExceededError') {
                showNotification('Speicher voll. Bitte exportieren Sie Ihre Daten.', 'warning');
            } else {
                console.error('Speicherfehler:', error.message);
            }
        }
    };

    if (immediate) {
        doSave();
    } else {
        // Debounce: Warte 500ms nach letzter Änderung
        clearTimeout(saveDebounceTimer);
        saveDebounceTimer = setTimeout(doSave, 500);
    }
}

/**
 * Lädt Daten aus localStorage und stellt den UI-Zustand wieder her
 * @returns {boolean} true bei Erfolg, false bei Fehler
 */
function loadFromLocalStorage() {
    try {
        if (typeof localStorage === 'undefined') {
            console.warn('localStorage nicht verfügbar');
            return false;
        }

        const saved = localStorage.getItem('eldib-data');
        if (!saved) {
            return false;
        }

        const data = JSON.parse(saved);

        // Validiere Datenstruktur
        if (typeof data !== 'object' || data === null) {
            console.warn('Ungültige Datenstruktur in localStorage');
            return false;
        }

        // Restore selections mit Validierung
        state.selections = {};
        if (data.selections && typeof data.selections === 'object') {
            for (const [code, selection] of Object.entries(data.selections)) {
                // Validiere Item-Code
                if (!isValidItemCode(code)) {
                    console.warn(`Ungültiger Item-Code übersprungen: ${code}`);
                    continue;
                }

                // Validiere Selection-Objekt
                if (selection && typeof selection === 'object' && selection.status) {
                    state.selections[code] = {
                        status: selection.status,
                        zieltext: selection.zieltext || ''
                    };
                }
            }
        }

        // Restore UI state
        for (const [code, selection] of Object.entries(state.selections)) {
            const itemDiv = document.getElementById(`item-${code}`);
            if (!itemDiv) continue;

            const button = itemDiv.querySelector(`.option-btn.${selection.status}`);
            if (button) {
                button.classList.add('selected');
            }

            if (selection.status === 'ziel') {
                const zielBox = document.getElementById(`ziel-box-${code}`);
                if (zielBox) zielBox.classList.add('visible');

                const customTextarea = document.getElementById(`ziel-custom-${code}`);
                if (customTextarea && selection.zieltext) {
                    customTextarea.value = selection.zieltext;
                }
            }
        }

        // Restore stammdaten mit Validierung
        if (data.stammdaten && typeof data.stammdaten === 'object') {
            for (const [key, value] of Object.entries(data.stammdaten)) {
                // Nur alphanumerische Keys erlauben (Schutz vor Injection)
                if (!/^[a-z0-9_]+$/.test(key)) continue;

                const element = document.getElementById(key);
                if (element && value && typeof value === 'string') {
                    element.value = value;
                }
            }
        }

        console.log(`Daten geladen (${Object.keys(state.selections).length} Items)`);
        return true;
    } catch (error) {
        console.error('Fehler beim Laden der ELDiB-Daten:', error.message);
        showNotification('Gespeicherte Daten konnten nicht geladen werden.', 'warning');
        return false;
    }
}

// Save data to file
function saveData() {
    const data = {
        selections: state.selections,
        stammdaten: getStammdaten(),
        savedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `eldib_${data.stammdaten.schueler_name || 'export'}_${new Date().toISOString().split('T')[0]}.json`;
    a.click();

    URL.revokeObjectURL(url);
}

// Load data from file
function loadData(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);

            // Clear current state
            state.selections = data.selections || {};

            // Restore stammdaten
            if (data.stammdaten) {
                for (const [key, value] of Object.entries(data.stammdaten)) {
                    const element = document.getElementById(key);
                    if (element && value) {
                        element.value = value;
                    }
                }
            }

            // Reload UI
            location.reload();
        } catch (err) {
            alert('Fehler beim Laden der Datei: ' + err.message);
        }
    };
    reader.readAsText(file);
}

// Get stammdaten
function getStammdaten() {
    return {
        schueler_name: document.getElementById('schueler_name')?.value || '',
        geburtsdatum: document.getElementById('geburtsdatum')?.value || '',
        matricule: document.getElementById('matricule')?.value || '',
        foerderort: document.getElementById('foerderort')?.value || '',
        klasse: document.getElementById('klasse')?.value || '',
        schuljahr: document.getElementById('schuljahr')?.value || '',
        trimester: document.getElementById('trimester')?.value || '',
        einschaetzungsdatum: document.getElementById('einschaetzungsdatum')?.value || '',
        einschaetzende: document.getElementById('einschaetzende')?.value || '',
        eltern1_name: document.getElementById('eltern1_name')?.value || '',
        eltern1_tel: document.getElementById('eltern1_tel')?.value || '',
        eltern1_email: document.getElementById('eltern1_email')?.value || ''
    };
}

// Generate PEI Document
function generatePEI() {
    const stammdaten = getStammdaten();

    // Collect goals by area
    const ziele = {
        verhalten: [],
        kommunikation: [],
        sozialisation: [],
        kognition: []
    };

    for (const [code, selection] of Object.entries(state.selections)) {
        if (selection.status === 'ziel') {
            const bereich = findBereichByCode(code);
            const item = findItemByCode(code);
            if (bereich && item) {
                ziele[bereich].push({
                    code,
                    keyword: item.keyword,
                    description: item.description,
                    zieltext: selection.zieltext || item.zielformulierungen[0]
                });
            }
        }
    }

    // Generate HTML for Word export
    let html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>PEI Annexe - ${stammdaten.schueler_name}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        h1 { color: #1a1a2e; border-bottom: 2px solid #667eea; padding-bottom: 10px; }
        h2 { color: #333; margin-top: 30px; }
        h3 { color: #667eea; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
        th { background: #f5f5f5; }
        .info-table td { border: none; padding: 5px 10px; }
        .bereich { margin: 30px 0; page-break-inside: avoid; }
        .bereich-title { background: #667eea; color: white; padding: 10px 15px; border-radius: 5px; }
        .bereich-verhalten .bereich-title { background: #e74c3c; }
        .bereich-kommunikation .bereich-title { background: #3498db; }
        .bereich-sozialisation .bereich-title { background: #2ecc71; }
        .bereich-kognition .bereich-title { background: #f39c12; }
        .ziel-item { background: #f9f9f9; padding: 15px; margin: 10px 0; border-left: 4px solid #667eea; }
        .ziel-code { font-weight: bold; color: #667eea; }
        .ziel-text { font-style: italic; color: #333; margin-top: 5px; }
    </style>
</head>
<body>
    <h1>Plan éducatif individualisé (PEI) - Annexe</h1>

    <h2>Informations générales sur l'élève</h2>
    <table class="info-table">
        <tr><td><strong>Nom:</strong></td><td>${stammdaten.schueler_name}</td></tr>
        <tr><td><strong>Date de naissance:</strong></td><td>${stammdaten.geburtsdatum}</td></tr>
        <tr><td><strong>Matricule:</strong></td><td>${stammdaten.matricule}</td></tr>
        <tr><td><strong>École/Lycée:</strong></td><td>${stammdaten.foerderort}</td></tr>
        <tr><td><strong>Classe:</strong></td><td>${stammdaten.klasse}</td></tr>
        <tr><td><strong>Année scolaire:</strong></td><td>${stammdaten.schuljahr}</td></tr>
        <tr><td><strong>Trimestre:</strong></td><td>${stammdaten.trimester}</td></tr>
        <tr><td><strong>Date d'évaluation:</strong></td><td>${stammdaten.einschaetzungsdatum}</td></tr>
    </table>

    <h2>Compétences transversales - Objectifs (selon ELDiB)</h2>
`;

    // Add goals for each area
    const bereichNames = {
        verhalten: 'Comportement (Verhalten)',
        kommunikation: 'Communication (Kommunikation)',
        sozialisation: 'Socialisation (Sozialisation)',
        kognition: 'Cognition (Kognition)'
    };

    for (const [bereich, items] of Object.entries(ziele)) {
        if (items.length > 0) {
            html += `
    <div class="bereich bereich-${bereich}">
        <h3 class="bereich-title">${bereichNames[bereich]}</h3>
        <table>
            <thead>
                <tr>
                    <th style="width: 80px;">Code</th>
                    <th style="width: 150px;">Domaine</th>
                    <th>Objectif (Ich-Ziel)</th>
                </tr>
            </thead>
            <tbody>
`;
            items.forEach(item => {
                html += `
                <tr>
                    <td><strong>${item.code}</strong></td>
                    <td>${item.keyword}</td>
                    <td>"${item.zieltext}"</td>
                </tr>
`;
            });

            html += `
            </tbody>
        </table>
    </div>
`;
        }
    }

    html += `
    <h2>Signatures</h2>
    <table>
        <tr>
            <td style="width: 50%; padding: 30px;">
                <p>Date: _________________</p>
                <p>Signature: _________________</p>
            </td>
            <td style="width: 50%; padding: 30px;">
                <p>Date: _________________</p>
                <p>Signature (Parents): _________________</p>
            </td>
        </tr>
    </table>
</body>
</html>
`;

    downloadAsWord(html, `PEI_Annexe_${stammdaten.schueler_name || 'export'}.doc`);
}

// Generate Complement Document
function generateComplement() {
    const stammdaten = getStammdaten();

    // Get last 4 achieved items per area
    const erreichte = {
        verhalten: [],
        kommunikation: [],
        sozialisation: [],
        kognition: []
    };

    for (const [code, selection] of Object.entries(state.selections)) {
        if (selection.status === 'erreicht') {
            const bereich = findBereichByCode(code);
            const item = findItemByCode(code);
            if (bereich && item) {
                erreichte[bereich].push({
                    code,
                    keyword: item.keyword,
                    description: item.description,
                    nr: parseInt(code.split('-').pop())
                });
            }
        }
    }

    // Sort and get last 4 for each area
    for (const bereich of Object.keys(erreichte)) {
        erreichte[bereich] = erreichte[bereich]
            .sort((a, b) => b.nr - a.nr)
            .slice(0, 4);
    }

    // Generate HTML
    let html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Complément - ${stammdaten.schueler_name}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        h1 { color: #1a1a2e; border-bottom: 2px solid #667eea; padding-bottom: 10px; }
        h2 { color: #333; margin-top: 30px; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
        th { background: #f5f5f5; }
        .info-row { display: flex; gap: 20px; margin-bottom: 10px; }
        .info-item { flex: 1; }
        .section { margin: 30px 0; }
        .section-title { font-weight: bold; margin-bottom: 10px; }
        .checkbox { display: inline-block; width: 15px; height: 15px; border: 1px solid #333; margin-right: 10px; }
        .checked { background: #333; }
    </style>
</head>
<body>
    <h1>Complément au bulletin ${stammdaten.schuljahr} - Trimestre ${stammdaten.trimester}</h1>

    <div class="info-row">
        <div class="info-item"><strong>Nom Prénom:</strong> ${stammdaten.schueler_name}</div>
        <div class="info-item"><strong>Matricule:</strong> ${stammdaten.matricule}</div>
    </div>
    <div class="info-row">
        <div class="info-item"><strong>Lycée / Classe:</strong> ${stammdaten.foerderort} / ${stammdaten.klasse}</div>
    </div>

    <h2>☑ Compétences transversales</h2>
    <p><em>Evaluation commentée des performances et des progrès</em></p>

    <table>
        <thead>
            <tr>
                <th>Domaine (selon ELDiB)</th>
                <th>Derniers items atteints</th>
            </tr>
        </thead>
        <tbody>
`;

    const bereichNames = {
        verhalten: 'Comportement (Verhalten)',
        kommunikation: 'Communication (Kommunikation)',
        sozialisation: 'Socialisation (Sozialisation)',
        kognition: 'Cognition (Kognition)'
    };

    for (const [bereich, items] of Object.entries(erreichte)) {
        const itemsText = items.length > 0
            ? items.map(i => `${i.code}: ${i.keyword}`).join('<br>')
            : '<em>Aucun item atteint</em>';

        html += `
            <tr>
                <td><strong>${bereichNames[bereich]}</strong></td>
                <td>${itemsText}</td>
            </tr>
`;
    }

    html += `
        </tbody>
    </table>

    <h2>Autres domaines de compétences</h2>
    <table>
        <tr>
            <td><span class="checkbox"></span> Démarches mentales</td>
            <td></td>
        </tr>
        <tr>
            <td><span class="checkbox"></span> Manières d'apprendre</td>
            <td></td>
        </tr>
        <tr>
            <td><span class="checkbox"></span> Attitudes relationnelles</td>
            <td></td>
        </tr>
        <tr>
            <td><span class="checkbox"></span> Attitudes affectives</td>
            <td></td>
        </tr>
    </table>

    <h2>☐ Compétences essentielles à la vie autonome</h2>
    <table>
        <tr>
            <td><span class="checkbox"></span> Culture et loisirs</td>
            <td></td>
        </tr>
    </table>

    <div style="margin-top: 50px;">
        <p><strong>Date:</strong> _________________</p>
        <p><strong>Signature:</strong> _________________</p>
    </div>
</body>
</html>
`;

    downloadAsWord(html, `Complement_${stammdaten.schueler_name || 'export'}_Trim${stammdaten.trimester}.doc`);
}

// Download HTML as Word document
function downloadAsWord(html, filename) {
    const blob = new Blob(['\ufeff', html], {
        type: 'application/msword'
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
