// ELDiB App - Main Application Logic

// State Management
const state = {
    selections: {},  // Format: { "V-1": { status: "erreicht"|"nicht-erreicht"|"ziel", zieltext: "..." } }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeItems();
    loadFromLocalStorage();
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

// Initialize all items from ELDIB_DATA
function initializeItems() {
    for (const [bereichKey, bereich] of Object.entries(ELDIB_DATA)) {
        for (const [stufeNr, stufe] of Object.entries(bereich.stufen)) {
            const containerId = `${bereichKey}-stufe${stufeNr}-items`;
            const container = document.getElementById(containerId);

            if (container) {
                stufe.items.forEach(item => {
                    container.appendChild(createItemElement(item, bereichKey));
                });
            }
        }
    }
}

// Create a single item element
function createItemElement(item, bereichKey) {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'item';
    itemDiv.id = `item-${item.code}`;

    // Create ziel options HTML
    const zielOptions = item.zielformulierungen.map((z, i) =>
        `<option value="${i}">${z}</option>`
    ).join('');

    itemDiv.innerHTML = `
        <div class="item-code">${item.code}</div>
        <div class="item-description">
            <span class="item-keyword">${item.keyword}:</span> ${item.description}
        </div>
        <div class="item-options">
            <button class="option-btn erreicht" onclick="selectOption('${item.code}', 'erreicht', this)">Erreicht</button>
            <button class="option-btn nicht-erreicht" onclick="selectOption('${item.code}', 'nicht-erreicht', this)">Nicht erreicht</button>
            <button class="option-btn ziel" onclick="selectOption('${item.code}', 'ziel', this)">Ziel</button>
        </div>
        <div class="ziel-box" id="ziel-box-${item.code}">
            <h4>Zielformulierung auswählen:</h4>
            <select class="ziel-select" id="ziel-select-${item.code}" onchange="updateZieltext('${item.code}')">
                ${zielOptions}
            </select>
            <textarea class="ziel-custom" id="ziel-custom-${item.code}" placeholder="Oder eigene Formulierung eingeben..." onchange="updateCustomZiel('${item.code}')"></textarea>
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

// Update zieltext from dropdown
function updateZieltext(code) {
    const select = document.getElementById(`ziel-select-${code}`);
    const customTextarea = document.getElementById(`ziel-custom-${code}`);

    if (select && state.selections[code]) {
        const selectedIndex = select.value;
        const item = findItemByCode(code);
        if (item && item.zielformulierungen[selectedIndex]) {
            state.selections[code].zieltext = item.zielformulierungen[selectedIndex];
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

// Update statistics
function updateStats() {
    const stats = {
        verhalten: { erreicht: 0, ziele: 0, total: ITEM_COUNTS.verhalten },
        kommunikation: { erreicht: 0, ziele: 0, total: ITEM_COUNTS.kommunikation },
        sozialisation: { erreicht: 0, ziele: 0, total: ITEM_COUNTS.sozialisation },
        kognition: { erreicht: 0, ziele: 0, total: ITEM_COUNTS.kognition }
    };

    // Count selections
    for (const [code, selection] of Object.entries(state.selections)) {
        const bereich = findBereichByCode(code);
        if (bereich && stats[bereich]) {
            if (selection.status === 'erreicht') {
                stats[bereich].erreicht++;
            } else if (selection.status === 'ziel') {
                stats[bereich].ziele++;
            }
        }
    }

    // Update display
    for (const [bereich, data] of Object.entries(stats)) {
        document.getElementById(`stats-${bereich}-ziele`).textContent = data.ziele;
        document.getElementById(`stats-${bereich}-erreicht`).textContent = `${data.erreicht}/${data.total} erreicht`;

        const progress = (data.erreicht / data.total) * 100;
        document.getElementById(`progress-${bereich}`).style.width = `${progress}%`;
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

// Save data to localStorage
function saveToLocalStorage() {
    const data = {
        selections: state.selections,
        stammdaten: {
            schueler_name: document.getElementById('schueler_name')?.value,
            geburtsdatum: document.getElementById('geburtsdatum')?.value,
            matricule: document.getElementById('matricule')?.value,
            foerderort: document.getElementById('foerderort')?.value,
            klasse: document.getElementById('klasse')?.value,
            schuljahr: document.getElementById('schuljahr')?.value,
            trimester: document.getElementById('trimester')?.value,
            einschaetzungsdatum: document.getElementById('einschaetzungsdatum')?.value,
            einschaetzende: document.getElementById('einschaetzende')?.value,
            eltern1_name: document.getElementById('eltern1_name')?.value,
            eltern1_tel: document.getElementById('eltern1_tel')?.value,
            eltern1_email: document.getElementById('eltern1_email')?.value
        }
    };
    localStorage.setItem('eldib-data', JSON.stringify(data));
}

// Load data from localStorage
function loadFromLocalStorage() {
    const saved = localStorage.getItem('eldib-data');
    if (saved) {
        const data = JSON.parse(saved);

        // Restore selections
        state.selections = data.selections || {};

        // Restore UI state
        for (const [code, selection] of Object.entries(state.selections)) {
            const itemDiv = document.getElementById(`item-${code}`);
            if (itemDiv) {
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
        }

        // Restore stammdaten
        if (data.stammdaten) {
            for (const [key, value] of Object.entries(data.stammdaten)) {
                const element = document.getElementById(key);
                if (element && value) {
                    element.value = value;
                }
            }
        }
    }
}

// Save data to file
function saveData() {
    const data = {
        selections: state.selections,
        stammdaten: getStammdaten(),
        beobachtungen: getBeobachtungen(),
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

            // Restore beobachtungen
            if (data.beobachtungen) {
                localStorage.setItem('eldib-beobachtungen', JSON.stringify(data.beobachtungen));
            }

            // Save to localStorage and reload
            saveToLocalStorage();
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

// ========================================
// BEOBACHTUNGEN UND DIAGNOSTISCHER BERICHT
// ========================================

// Beobachtungen speichern
function saveBeobachtungen() {
    const beobachtungen = {
        allgemein: document.getElementById('beob_allgemein')?.value || '',
        staerken: document.getElementById('beob_staerken')?.value || '',
        verhalten: document.getElementById('beob_verhalten')?.value || '',
        verhalten_beispiele: document.getElementById('beob_verhalten_beispiele')?.value || '',
        kommunikation: document.getElementById('beob_kommunikation')?.value || '',
        kommunikation_beispiele: document.getElementById('beob_kommunikation_beispiele')?.value || '',
        sozialisation: document.getElementById('beob_sozialisation')?.value || '',
        sozialisation_beispiele: document.getElementById('beob_sozialisation_beispiele')?.value || '',
        kognition: document.getElementById('beob_kognition')?.value || '',
        kognition_beispiele: document.getElementById('beob_kognition_beispiele')?.value || '',
        motorik: document.getElementById('beob_motorik')?.value || '',
        selbststaendigkeit: document.getElementById('beob_selbststaendigkeit')?.value || '',
        sonstiges: document.getElementById('beob_sonstiges')?.value || '',
        fragestellung: document.getElementById('bericht_fragestellung')?.value || '',
        empfehlungen: document.getElementById('bericht_empfehlungen')?.value || '',
        fazit: document.getElementById('bericht_fazit')?.value || ''
    };

    localStorage.setItem('eldib-beobachtungen', JSON.stringify(beobachtungen));
    saveToLocalStorage();
}

// Beobachtungen laden
function loadBeobachtungen() {
    const saved = localStorage.getItem('eldib-beobachtungen');
    if (saved) {
        const beobachtungen = JSON.parse(saved);
        const fields = [
            'beob_allgemein', 'beob_staerken', 'beob_verhalten', 'beob_verhalten_beispiele',
            'beob_kommunikation', 'beob_kommunikation_beispiele', 'beob_sozialisation',
            'beob_sozialisation_beispiele', 'beob_kognition', 'beob_kognition_beispiele',
            'beob_motorik', 'beob_selbststaendigkeit', 'beob_sonstiges',
            'bericht_fragestellung', 'bericht_empfehlungen', 'bericht_fazit'
        ];

        const mapping = {
            'beob_allgemein': 'allgemein',
            'beob_staerken': 'staerken',
            'beob_verhalten': 'verhalten',
            'beob_verhalten_beispiele': 'verhalten_beispiele',
            'beob_kommunikation': 'kommunikation',
            'beob_kommunikation_beispiele': 'kommunikation_beispiele',
            'beob_sozialisation': 'sozialisation',
            'beob_sozialisation_beispiele': 'sozialisation_beispiele',
            'beob_kognition': 'kognition',
            'beob_kognition_beispiele': 'kognition_beispiele',
            'beob_motorik': 'motorik',
            'beob_selbststaendigkeit': 'selbststaendigkeit',
            'beob_sonstiges': 'sonstiges',
            'bericht_fragestellung': 'fragestellung',
            'bericht_empfehlungen': 'empfehlungen',
            'bericht_fazit': 'fazit'
        };

        for (const fieldId of fields) {
            const element = document.getElementById(fieldId);
            const key = mapping[fieldId];
            if (element && beobachtungen[key]) {
                element.value = beobachtungen[key];
            }
        }
    }
}

// Entwicklungsprofil berechnen
function berechneEntwicklungsprofil() {
    const profil = {
        verhalten: { erreicht: [], ziele: [], nichtErreicht: [], hoechsteStufe: 0 },
        kommunikation: { erreicht: [], ziele: [], nichtErreicht: [], hoechsteStufe: 0 },
        sozialisation: { erreicht: [], ziele: [], nichtErreicht: [], hoechsteStufe: 0 },
        kognition: { erreicht: [], ziele: [], nichtErreicht: [], hoechsteStufe: 0 }
    };

    for (const [code, selection] of Object.entries(state.selections)) {
        const bereich = findBereichByCode(code);
        const item = findItemByCode(code);

        if (bereich && item && profil[bereich]) {
            const itemData = {
                code: code,
                keyword: item.keyword,
                description: item.description,
                stufe: getStufeByCode(code),
                zieltext: selection.zieltext
            };

            if (selection.status === 'erreicht') {
                profil[bereich].erreicht.push(itemData);
                if (itemData.stufe > profil[bereich].hoechsteStufe) {
                    profil[bereich].hoechsteStufe = itemData.stufe;
                }
            } else if (selection.status === 'ziel') {
                profil[bereich].ziele.push(itemData);
            } else if (selection.status === 'nicht-erreicht') {
                profil[bereich].nichtErreicht.push(itemData);
            }
        }
    }

    return profil;
}

// Stufe aus Code ermitteln
function getStufeByCode(code) {
    const prefix = code.split('-')[0];
    const nr = parseInt(code.split('-')[1]);

    // Stufen-Grenzen für jeden Bereich
    const stufenGrenzen = {
        'V': [[1,8], [9,14], [15,21], [22,28], [29,33]],
        'K': [[1,8], [9,16], [17,24], [25,30], [31,35]],
        'SOZ': [[1,7], [8,16], [17,27], [28,36], [37,41]],
        'KOG': [[1,12], [13,26], [27,44], [45,56], [57,62]]
    };

    const grenzen = stufenGrenzen[prefix];
    if (grenzen) {
        for (let i = 0; i < grenzen.length; i++) {
            if (nr >= grenzen[i][0] && nr <= grenzen[i][1]) {
                return i + 1;
            }
        }
    }
    return 1;
}

// Beobachtungen abrufen
function getBeobachtungen() {
    return {
        allgemein: document.getElementById('beob_allgemein')?.value || '',
        staerken: document.getElementById('beob_staerken')?.value || '',
        verhalten: document.getElementById('beob_verhalten')?.value || '',
        verhalten_beispiele: document.getElementById('beob_verhalten_beispiele')?.value || '',
        kommunikation: document.getElementById('beob_kommunikation')?.value || '',
        kommunikation_beispiele: document.getElementById('beob_kommunikation_beispiele')?.value || '',
        sozialisation: document.getElementById('beob_sozialisation')?.value || '',
        sozialisation_beispiele: document.getElementById('beob_sozialisation_beispiele')?.value || '',
        kognition: document.getElementById('beob_kognition')?.value || '',
        kognition_beispiele: document.getElementById('beob_kognition_beispiele')?.value || '',
        motorik: document.getElementById('beob_motorik')?.value || '',
        selbststaendigkeit: document.getElementById('beob_selbststaendigkeit')?.value || '',
        sonstiges: document.getElementById('beob_sonstiges')?.value || '',
        fragestellung: document.getElementById('bericht_fragestellung')?.value || '',
        empfehlungen: document.getElementById('bericht_empfehlungen')?.value || '',
        fazit: document.getElementById('bericht_fazit')?.value || ''
    };
}

// Bericht Vorschau generieren
function generateBerichtVorschau() {
    const stammdaten = getStammdaten();
    const beobachtungen = getBeobachtungen();
    const profil = berechneEntwicklungsprofil();
    const sprache = document.getElementById('bericht_sprache')?.value || 'de';
    const format = document.getElementById('bericht_format')?.value || 'standard';
    const includeZiele = document.getElementById('bericht_include_ziele')?.checked ?? true;
    const includeEmpfehlungen = document.getElementById('bericht_include_empfehlungen')?.checked ?? true;

    const html = generateBerichtHTML(stammdaten, beobachtungen, profil, sprache, format, includeZiele, includeEmpfehlungen, true);

    document.getElementById('bericht-vorschau').innerHTML = html;
}

// Bericht HTML generieren
function generateBerichtHTML(stammdaten, beobachtungen, profil, sprache, format, includeZiele, includeEmpfehlungen, isPreview) {
    const heute = new Date().toLocaleDateString('de-DE');

    // Texte je nach Sprache
    const texte = sprache === 'fr' ? {
        titel: 'Rapport Diagnostique',
        untertitel: 'Diagnostic spécialisé - Centre de Diagnostic Spécialisé de l\'Éducation',
        infoEleve: 'Informations sur l\'élève',
        nom: 'Nom',
        dateNaissance: 'Date de naissance',
        matricule: 'Matricule',
        ecole: 'École/Lycée',
        classe: 'Classe',
        anneeScolaire: 'Année scolaire',
        dateEvaluation: 'Date d\'évaluation',
        evaluateur: 'Évaluateur(s)',
        fragestellung: 'Question / Motif de l\'évaluation',
        allgBeobachtungen: 'Observations générales',
        staerken: 'Points forts et ressources',
        profilDev: 'Profil de développement',
        bereichVerhalten: 'Comportement',
        bereichKomm: 'Communication',
        bereichSoz: 'Socialisation',
        bereichKog: 'Cognition',
        niveauAtteint: 'Niveau atteint',
        stufe: 'Stade',
        compAtteintes: 'Compétences atteintes',
        objectifs: 'Objectifs de développement',
        observations: 'Observations',
        exemples: 'Exemples concrets',
        autresObs: 'Autres observations',
        motricite: 'Motricité',
        autonomie: 'Autonomie',
        divers: 'Divers',
        recommandations: 'Recommandations',
        conclusion: 'Conclusion',
        signature: 'Signature',
        date: 'Date'
    } : {
        titel: 'Diagnostischer Bericht',
        untertitel: 'Diagnostic spécialisé - Centre de Diagnostic Spécialisé de l\'Éducation',
        infoEleve: 'Angaben zum Schüler',
        nom: 'Name',
        dateNaissance: 'Geburtsdatum',
        matricule: 'Matricule',
        ecole: 'Schule/Lycée',
        classe: 'Klasse',
        anneeScolaire: 'Schuljahr',
        dateEvaluation: 'Untersuchungsdatum',
        evaluateur: 'Untersucher/in',
        fragestellung: 'Fragestellung / Anlass der Diagnostik',
        allgBeobachtungen: 'Allgemeine Beobachtungen',
        staerken: 'Stärken und Ressourcen',
        profilDev: 'Entwicklungsprofil',
        bereichVerhalten: 'Verhalten',
        bereichKomm: 'Kommunikation',
        bereichSoz: 'Sozialisation',
        bereichKog: 'Kognition',
        niveauAtteint: 'Erreichtes Niveau',
        stufe: 'Stufe',
        compAtteintes: 'Erreichte Kompetenzen',
        objectifs: 'Entwicklungsziele',
        observations: 'Beobachtungen',
        exemples: 'Konkrete Beispiele',
        autresObs: 'Weitere Beobachtungen',
        motricite: 'Motorik',
        autonomie: 'Selbstständigkeit',
        divers: 'Sonstiges',
        recommandations: 'Förderempfehlungen',
        conclusion: 'Zusammenfassung und Fazit',
        signature: 'Unterschrift',
        date: 'Datum'
    };

    let html = `
        <div style="font-family: 'Times New Roman', serif; line-height: 1.6; ${isPreview ? '' : 'margin: 40px;'}">
            <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #1a1a2e; padding-bottom: 20px;">
                <h1 style="color: #1a1a2e; font-size: 1.8em; margin-bottom: 5px;">${texte.titel}</h1>
                <p style="color: #666; font-style: italic;">${texte.untertitel}</p>
            </div>

            <h2 style="color: #1a1a2e; border-bottom: 1px solid #ddd; padding-bottom: 5px;">${texte.infoEleve}</h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <tr><td style="padding: 5px 10px; width: 200px;"><strong>${texte.nom}:</strong></td><td style="padding: 5px 10px;">${stammdaten.schueler_name || '-'}</td></tr>
                <tr><td style="padding: 5px 10px;"><strong>${texte.dateNaissance}:</strong></td><td style="padding: 5px 10px;">${stammdaten.geburtsdatum || '-'}</td></tr>
                <tr><td style="padding: 5px 10px;"><strong>${texte.matricule}:</strong></td><td style="padding: 5px 10px;">${stammdaten.matricule || '-'}</td></tr>
                <tr><td style="padding: 5px 10px;"><strong>${texte.ecole}:</strong></td><td style="padding: 5px 10px;">${stammdaten.foerderort || '-'}</td></tr>
                <tr><td style="padding: 5px 10px;"><strong>${texte.classe}:</strong></td><td style="padding: 5px 10px;">${stammdaten.klasse || '-'}</td></tr>
                <tr><td style="padding: 5px 10px;"><strong>${texte.anneeScolaire}:</strong></td><td style="padding: 5px 10px;">${stammdaten.schuljahr || '-'}</td></tr>
                <tr><td style="padding: 5px 10px;"><strong>${texte.dateEvaluation}:</strong></td><td style="padding: 5px 10px;">${stammdaten.einschaetzungsdatum || '-'}</td></tr>
                <tr><td style="padding: 5px 10px;"><strong>${texte.evaluateur}:</strong></td><td style="padding: 5px 10px;">${stammdaten.einschaetzende || '-'}</td></tr>
            </table>
    `;

    // Fragestellung
    if (beobachtungen.fragestellung) {
        html += `
            <h2 style="color: #1a1a2e; border-bottom: 1px solid #ddd; padding-bottom: 5px;">${texte.fragestellung}</h2>
            <p style="margin-bottom: 20px;">${beobachtungen.fragestellung.replace(/\n/g, '<br>')}</p>
        `;
    }

    // Allgemeine Beobachtungen
    if (beobachtungen.allgemein || beobachtungen.staerken) {
        html += `<h2 style="color: #1a1a2e; border-bottom: 1px solid #ddd; padding-bottom: 5px;">${texte.allgBeobachtungen}</h2>`;

        if (beobachtungen.allgemein) {
            html += `<p style="margin-bottom: 15px;">${beobachtungen.allgemein.replace(/\n/g, '<br>')}</p>`;
        }

        if (beobachtungen.staerken) {
            html += `
                <h3 style="color: #2ecc71; font-size: 1.1em;">${texte.staerken}</h3>
                <p style="margin-bottom: 20px;">${beobachtungen.staerken.replace(/\n/g, '<br>')}</p>
            `;
        }
    }

    // Entwicklungsprofil
    html += `<h2 style="color: #1a1a2e; border-bottom: 1px solid #ddd; padding-bottom: 5px;">${texte.profilDev} (ELDiB)</h2>`;

    const bereiche = [
        { key: 'verhalten', name: texte.bereichVerhalten, color: '#e74c3c', beob: beobachtungen.verhalten, beispiele: beobachtungen.verhalten_beispiele },
        { key: 'kommunikation', name: texte.bereichKomm, color: '#3498db', beob: beobachtungen.kommunikation, beispiele: beobachtungen.kommunikation_beispiele },
        { key: 'sozialisation', name: texte.bereichSoz, color: '#2ecc71', beob: beobachtungen.sozialisation, beispiele: beobachtungen.sozialisation_beispiele },
        { key: 'kognition', name: texte.bereichKog, color: '#f39c12', beob: beobachtungen.kognition, beispiele: beobachtungen.kognition_beispiele }
    ];

    for (const bereich of bereiche) {
        const data = profil[bereich.key];

        html += `
            <div style="margin-bottom: 25px; padding: 15px; border-left: 4px solid ${bereich.color}; background: #f9f9f9;">
                <h3 style="color: ${bereich.color}; margin-top: 0;">${bereich.name}</h3>
                <p><strong>${texte.niveauAtteint}:</strong> ${texte.stufe} ${data.hoechsteStufe || '-'}</p>
        `;

        if (format !== 'kurz' && data.erreicht.length > 0) {
            const letzteErreichte = data.erreicht.slice(-4);
            html += `<p><strong>${texte.compAtteintes}:</strong> ${letzteErreichte.map(i => `${i.code} (${i.keyword})`).join(', ')}</p>`;
        }

        if (includeZiele && data.ziele.length > 0) {
            html += `<p><strong>${texte.objectifs}:</strong></p><ul style="margin: 5px 0 10px 20px;">`;
            for (const ziel of data.ziele) {
                html += `<li>${ziel.code} (${ziel.keyword}): "${ziel.zieltext || ziel.description}"</li>`;
            }
            html += `</ul>`;
        }

        if (bereich.beob) {
            html += `<p><strong>${texte.observations}:</strong><br>${bereich.beob.replace(/\n/g, '<br>')}</p>`;
        }

        if (format === 'detailliert' && bereich.beispiele) {
            html += `<p><strong>${texte.exemples}:</strong><br><em>${bereich.beispiele.replace(/\n/g, '<br>')}</em></p>`;
        }

        html += `</div>`;
    }

    // Weitere Beobachtungen
    if (beobachtungen.motorik || beobachtungen.selbststaendigkeit || beobachtungen.sonstiges) {
        html += `<h2 style="color: #1a1a2e; border-bottom: 1px solid #ddd; padding-bottom: 5px;">${texte.autresObs}</h2>`;

        if (beobachtungen.motorik) {
            html += `<p><strong>${texte.motricite}:</strong><br>${beobachtungen.motorik.replace(/\n/g, '<br>')}</p>`;
        }
        if (beobachtungen.selbststaendigkeit) {
            html += `<p><strong>${texte.autonomie}:</strong><br>${beobachtungen.selbststaendigkeit.replace(/\n/g, '<br>')}</p>`;
        }
        if (beobachtungen.sonstiges) {
            html += `<p><strong>${texte.divers}:</strong><br>${beobachtungen.sonstiges.replace(/\n/g, '<br>')}</p>`;
        }
    }

    // Förderempfehlungen
    if (includeEmpfehlungen && beobachtungen.empfehlungen) {
        html += `
            <h2 style="color: #1a1a2e; border-bottom: 1px solid #ddd; padding-bottom: 5px;">${texte.recommandations}</h2>
            <p>${beobachtungen.empfehlungen.replace(/\n/g, '<br>')}</p>
        `;
    }

    // Fazit
    if (beobachtungen.fazit) {
        html += `
            <h2 style="color: #1a1a2e; border-bottom: 1px solid #ddd; padding-bottom: 5px;">${texte.conclusion}</h2>
            <p>${beobachtungen.fazit.replace(/\n/g, '<br>')}</p>
        `;
    }

    // Unterschrift
    html += `
        <div style="margin-top: 50px; display: flex; justify-content: space-between;">
            <div>
                <p>${texte.date}: ${heute}</p>
            </div>
            <div style="text-align: center;">
                <p style="margin-bottom: 40px;">${texte.signature}:</p>
                <p style="border-top: 1px solid #333; padding-top: 5px; width: 250px;">${stammdaten.einschaetzende || ''}</p>
            </div>
        </div>
    </div>
    `;

    return html;
}

// Diagnostischen Bericht als Word herunterladen
function generateDiagnostischerBericht() {
    const stammdaten = getStammdaten();
    const beobachtungen = getBeobachtungen();
    const profil = berechneEntwicklungsprofil();
    const sprache = document.getElementById('bericht_sprache')?.value || 'de';
    const format = document.getElementById('bericht_format')?.value || 'standard';
    const includeZiele = document.getElementById('bericht_include_ziele')?.checked ?? true;
    const includeEmpfehlungen = document.getElementById('bericht_include_empfehlungen')?.checked ?? true;

    const berichtHTML = generateBerichtHTML(stammdaten, beobachtungen, profil, sprache, format, includeZiele, includeEmpfehlungen, false);

    const fullHTML = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Diagnostischer Bericht - ${stammdaten.schueler_name}</title>
    <style>
        body { font-family: 'Times New Roman', serif; margin: 40px; line-height: 1.6; }
        h1 { color: #1a1a2e; }
        h2 { color: #1a1a2e; border-bottom: 1px solid #ddd; padding-bottom: 5px; margin-top: 25px; }
        h3 { color: #333; }
        table { width: 100%; border-collapse: collapse; }
        td { padding: 5px 10px; vertical-align: top; }
        ul { margin: 5px 0 10px 20px; }
        @page { margin: 2cm; }
    </style>
</head>
<body>
    ${berichtHTML}
</body>
</html>
    `;

    const filename = `Diagnostischer_Bericht_${stammdaten.schueler_name || 'export'}_${new Date().toISOString().split('T')[0]}.doc`;
    downloadAsWord(fullHTML, filename);
}

// Load Beobachtungen beim Start
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(loadBeobachtungen, 100);
});
