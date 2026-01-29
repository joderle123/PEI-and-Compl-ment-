// Advisory Tool - Application Logic
/**
 * @fileoverview Advisory Tool für pädagogische Fallberatung
 * @description Ermöglicht die systematische Exploration von Verhaltensauffälligkeiten
 *              und bietet Interventionsempfehlungen basierend auf ELDiB.
 * @version 1.0.0
 */

/**
 * Zeigt dem Benutzer eine Fehlermeldung an
 * @param {string} message - Die anzuzeigende Nachricht
 * @param {string} [type='error'] - Typ: 'error', 'warning', 'info'
 */
function showUserMessage(message, type = 'error') {
    // Prüfe ob ein Toast-Container existiert, sonst verwende alert
    const toastContainer = document.getElementById('toast-container');
    if (toastContainer) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-live', 'polite');
        toast.textContent = message;
        toastContainer.appendChild(toast);
        setTimeout(() => toast.remove(), 5000);
    } else {
        // Fallback auf console und ggf. visuelle Anzeige
        console.error(`[${type.toUpperCase()}] ${message}`);
        if (type === 'error') {
            const errorDiv = document.createElement('div');
            errorDiv.style.cssText = 'position:fixed;top:20px;right:20px;background:#ef4444;color:white;padding:15px 20px;border-radius:8px;z-index:10000;max-width:400px;box-shadow:0 4px 12px rgba(0,0,0,0.15);';
            errorDiv.setAttribute('role', 'alert');
            errorDiv.textContent = message;
            document.body.appendChild(errorDiv);
            setTimeout(() => errorDiv.remove(), 5000);
        }
    }
}

/**
 * Globaler Anwendungszustand
 * @type {Object}
 * @property {string|null} selectedProblem - ID der ausgewählten Problematik
 * @property {Object} explorationNotes - Notizen aus der Exploration (Index -> Text)
 * @property {Object} eldibAssessment - ELDiB-Einschätzungen (Code -> Status)
 * @property {string} caseNotes - Allgemeine Fallnotizen
 */
const advisoryState = {
    selectedProblem: null,
    explorationNotes: {},
    eldibAssessment: {},
    caseNotes: ''
};

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Advisory App initializing...');

    // Check if ADVISORY_DATA is loaded
    if (typeof ADVISORY_DATA === 'undefined') {
        console.error('ADVISORY_DATA not loaded!');
        document.getElementById('problemGrid').innerHTML =
            '<p style="color: red; padding: 20px;">Fehler: Daten konnten nicht geladen werden. Bitte Seite neu laden.</p>';
        return;
    }

    console.log('ADVISORY_DATA loaded:', Object.keys(ADVISORY_DATA.problematiken));
    initializeProblemGrid();
    loadFromLocalStorage();
});

// ============================================
// SECTION 1: Problem Selection
// ============================================

function initializeProblemGrid() {
    const grid = document.getElementById('problemGrid');
    grid.innerHTML = '';

    for (const [id, problem] of Object.entries(ADVISORY_DATA.problematiken)) {
        const card = document.createElement('div');
        card.className = 'problem-card';
        card.dataset.id = id;
        card.onclick = () => selectProblem(id);

        card.innerHTML = `
            <div class="icon">${problem.icon}</div>
            <h3>${problem.name}</h3>
            <p>${truncateText(problem.beschreibung, 100)}</p>
            <span class="category-badge category-${problem.kategorie}">${getCategoryLabel(problem.kategorie)}</span>
        `;

        grid.appendChild(card);
    }
}

function selectProblem(problemId) {
    // Update state
    advisoryState.selectedProblem = problemId;

    // Update UI - remove selected from all cards
    document.querySelectorAll('.problem-card').forEach(card => {
        card.classList.remove('selected');
    });

    // Add selected to clicked card
    document.querySelector(`.problem-card[data-id="${problemId}"]`).classList.add('selected');

    // Show problem info
    const problem = ADVISORY_DATA.problematiken[problemId];
    const infoCard = document.getElementById('selectedProblemInfo');
    infoCard.style.display = 'block';

    document.getElementById('selectedProblemTitle').innerHTML = `
        <span class="icon">${problem.icon}</span>
        ${problem.name}
    `;
    document.getElementById('selectedProblemDesc').textContent = problem.beschreibung;

    const examplesList = document.getElementById('selectedProblemExamples');
    examplesList.innerHTML = problem.beispiele.map(ex => `<li>${ex}</li>`).join('');

    // Enable next button
    document.getElementById('nextBtn1').disabled = false;

    // Initialize exploration questions
    initializeExplorationQuestions(problemId);

    // Initialize ELDiB items
    initializeEldibItems(problemId);

    // Initialize recommendations
    initializeRecommendations(problemId);

    // Save to localStorage
    saveToLocalStorage();
}

// ============================================
// SECTION 2: Exploration Questions
// ============================================

function initializeExplorationQuestions(problemId) {
    const problem = ADVISORY_DATA.problematiken[problemId];
    const container = document.getElementById('explorationQuestions');
    container.innerHTML = '';

    problem.explorationsFragen.forEach((frage, index) => {
        const section = document.createElement('div');
        section.className = 'question-section';

        section.innerHTML = `
            <div class="question-category">${getCategoryLabel(frage.kategorie)}</div>
            <div class="question-text">${frage.frage}</div>
            <div class="question-hint">
                <strong>Hinweis:</strong> ${frage.hinweis}
            </div>
            <textarea
                class="answer-textarea"
                id="exploration-${index}"
                placeholder="Ihre Beobachtungen und Notizen..."
                onchange="saveExplorationNote(${index}, this.value)"
            >${advisoryState.explorationNotes[index] || ''}</textarea>
        `;

        container.appendChild(section);
    });
}

function saveExplorationNote(index, value) {
    advisoryState.explorationNotes[index] = value;
    saveToLocalStorage();
}

// ============================================
// SECTION 3: ELDiB Analysis
// ============================================

function initializeEldibItems(problemId) {
    const problem = ADVISORY_DATA.problematiken[problemId];
    const container = document.getElementById('eldibItemsContainer');
    container.innerHTML = '';

    // Create tabs content
    const categories = [
        { id: 'basis', name: 'Basiskompetenzen', items: problem.relevante_eldib_items.basiskompetenzen || [] },
        { id: 'kern', name: 'Kernkompetenzen', items: problem.relevante_eldib_items.kernkompetenzen || [] },
        { id: 'fortgeschritten', name: 'Fortgeschritten', items: [
            ...(problem.relevante_eldib_items.fortgeschritten || []),
            ...(problem.relevante_eldib_items.kommunikation || []),
            ...(problem.relevante_eldib_items.sozialisation || []),
            ...(problem.relevante_eldib_items.verhalten || []),
            ...(problem.relevante_eldib_items.kognition || [])
        ]}
    ];

    categories.forEach(cat => {
        const section = document.createElement('div');
        section.className = `tab-content eldib-tab ${cat.id === 'basis' ? 'active' : ''}`;
        section.id = `eldib-${cat.id}`;

        if (cat.items.length === 0) {
            section.innerHTML = '<p style="color: var(--text-light);">Keine spezifischen Items in dieser Kategorie für diese Problematik.</p>';
        } else {
            cat.items.forEach(code => {
                const item = findItemByCode(code);
                if (item) {
                    const itemDiv = document.createElement('div');
                    itemDiv.className = 'eldib-item';
                    itemDiv.innerHTML = `
                        <span class="code">${code}</span>
                        <div class="content">
                            <span class="keyword">${item.keyword}:</span>
                            <div class="description">${item.description}</div>
                        </div>
                        <div class="status-btns">
                            <button class="status-btn erreicht ${advisoryState.eldibAssessment[code] === 'erreicht' ? 'selected' : ''}"
                                onclick="setEldibStatus('${code}', 'erreicht', this)">Erreicht</button>
                            <button class="status-btn nicht ${advisoryState.eldibAssessment[code] === 'nicht' ? 'selected' : ''}"
                                onclick="setEldibStatus('${code}', 'nicht', this)">Nicht</button>
                            <button class="status-btn unklar ${advisoryState.eldibAssessment[code] === 'unklar' ? 'selected' : ''}"
                                onclick="setEldibStatus('${code}', 'unklar', this)">?</button>
                        </div>
                    `;
                    section.appendChild(itemDiv);
                }
            });
        }

        container.appendChild(section);
    });

    // Development Logic
    const logicContainer = document.getElementById('developmentLogic');
    logicContainer.innerHTML = '';

    problem.entwicklungslogik.forEach(logic => {
        const card = document.createElement('div');
        card.className = 'logic-card';
        card.innerHTML = `
            <div class="wenn"><strong>Wenn:</strong> ${logic.wenn}</div>
            <div class="dann">${logic.dann}</div>
            <div class="intervention"><strong>Intervention:</strong> ${logic.intervention}</div>
        `;
        logicContainer.appendChild(card);
    });
}

function showEldibTab(tabId) {
    // Update tab buttons
    document.querySelectorAll('#section3 .tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');

    // Update tab content
    document.querySelectorAll('.eldib-tab').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`eldib-${tabId}`).classList.add('active');
}

function setEldibStatus(code, status, button) {
    // Update state
    advisoryState.eldibAssessment[code] = status;

    // Update UI
    const parent = button.parentElement;
    parent.querySelectorAll('.status-btn').forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');

    saveToLocalStorage();
}

// ============================================
// SECTION 4: Recommendations
// ============================================

function initializeRecommendations(problemId) {
    const problem = ADVISORY_DATA.problematiken[problemId];
    const container = document.getElementById('recommendationsContainer');
    container.innerHTML = '';

    // Create tab contents
    // 1. Interventions Tab
    const interventionsDiv = document.createElement('div');
    interventionsDiv.className = 'tab-content rec-tab active';
    interventionsDiv.id = 'rec-interventionen';

    problem.interventionen.allgemein.forEach(intervention => {
        const card = document.createElement('div');
        card.className = 'intervention-card';
        card.innerHTML = `
            <h4>${intervention.name}</h4>
            <p style="margin-bottom: 10px; color: var(--text-light);">${intervention.beschreibung}</p>
            <ul>
                ${intervention.massnahmen.map(m => `<li>${m}</li>`).join('')}
            </ul>
        `;
        interventionsDiv.appendChild(card);
    });

    // 2. Ich-Ziele Tab
    const zieleDiv = document.createElement('div');
    zieleDiv.className = 'tab-content rec-tab';
    zieleDiv.id = 'rec-ichziele';

    const zieleIntro = document.createElement('p');
    zieleIntro.style.marginBottom = '20px';
    zieleIntro.style.color = 'var(--text-light)';
    zieleIntro.textContent = 'Diese Ich-Ziele können als Förderziele im PEI verwendet werden:';
    zieleDiv.appendChild(zieleIntro);

    problem.interventionen.ichZiele.forEach(ziel => {
        const zielDiv = document.createElement('div');
        zielDiv.className = 'ich-ziel';
        zielDiv.textContent = ziel;
        zieleDiv.appendChild(zielDiv);
    });

    // 3. Warning Signs Tab
    const warnDiv = document.createElement('div');
    warnDiv.className = 'tab-content rec-tab';
    warnDiv.id = 'rec-warnzeichen';

    const warnBox = document.createElement('div');
    warnBox.className = 'warning-box';
    warnBox.innerHTML = `
        <h4>Wann weitere Abklärung empfohlen ist</h4>
        <ul>
            ${problem.warnzeichen.map(w => `<li>${w}</li>`).join('')}
        </ul>
    `;
    warnDiv.appendChild(warnBox);

    // 4. Differential Considerations Tab
    const diffDiv = document.createElement('div');
    diffDiv.className = 'tab-content rec-tab';
    diffDiv.id = 'rec-differenzial';

    const diffBox = document.createElement('div');
    diffBox.className = 'info-box';
    diffBox.innerHTML = `
        <h4>Differenzialdiagnostische Überlegungen</h4>
        <p style="margin-bottom: 15px; color: var(--text-light);">
            Diese Hinweise können helfen, die Symptomatik besser einzuordnen:
        </p>
        <ul style="margin-left: 20px;">
            ${problem.differenzialUeberlegungen.map(d => `<li style="margin-bottom: 10px;">${d}</li>`).join('')}
        </ul>
    `;
    diffDiv.appendChild(diffBox);

    container.appendChild(interventionsDiv);
    container.appendChild(zieleDiv);
    container.appendChild(warnDiv);
    container.appendChild(diffDiv);
}

function showRecTab(tabId) {
    // Update tab buttons
    document.querySelectorAll('#section4 .tab-container .tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');

    // Update tab content
    document.querySelectorAll('.rec-tab').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`rec-${tabId}`).classList.add('active');
}

// ============================================
// NAVIGATION
// ============================================

function goToSection(sectionNum) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));

    // Show target section
    document.getElementById(`section${sectionNum}`).classList.add('active');

    // Update progress bar
    document.querySelectorAll('.step').forEach((step, index) => {
        step.classList.remove('active', 'completed');
        if (index + 1 < sectionNum) {
            step.classList.add('completed');
        } else if (index + 1 === sectionNum) {
            step.classList.add('active');
        }
    });

    // Scroll to top
    window.scrollTo(0, 0);
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

function getCategoryLabel(category) {
    const labels = {
        'externalisierend': 'Externalisierend',
        'internalisierend': 'Internalisierend',
        'sozial': 'Sozial',
        'arbeitsverhalten': 'Arbeitsverhalten',
        'emotional': 'Emotional',
        'kontext': 'Kontext',
        'ressourcen': 'Ressourcen',
        'trigger': 'Trigger',
        'verstärkung': 'Verstärkung',
        'entwicklung': 'Entwicklung',
        'differenzial': 'Differenzial',
        'muster': 'Muster',
        'regulation': 'Regulation',
        'intervention': 'Intervention',
        'grundbedürfnisse': 'Grundbedürfnisse',
        'anamnese': 'Anamnese',
        'affekt': 'Affekt',
        'somatisch': 'Somatisch',
        'motivation': 'Motivation',
        'fähigkeit': 'Fähigkeit',
        'soziale_kognition': 'Soziale Kognition',
        'interessen': 'Interessen',
        'struktur': 'Struktur',
        'biorhythmus': 'Biorhythmus',
        'stil': 'Stil',
        'dauer': 'Dauer'
    };
    return labels[category] || category;
}

// Find item in ELDIB_DATA
function findItemByCode(code) {
    if (typeof ELDIB_DATA === 'undefined') return null;

    for (const bereich of Object.values(ELDIB_DATA)) {
        for (const stufe of Object.values(bereich.stufen)) {
            const item = stufe.items.find(i => i.code === code);
            if (item) return item;
        }
    }
    return null;
}

// ============================================
// LOCAL STORAGE
// ============================================

/**
 * Speichert den aktuellen Zustand in localStorage
 * @returns {boolean} true bei Erfolg, false bei Fehler
 */
function saveToLocalStorage() {
    try {
        // Prüfe ob localStorage verfügbar ist
        if (typeof localStorage === 'undefined') {
            console.warn('localStorage nicht verfügbar');
            return false;
        }

        const data = {
            selectedProblem: advisoryState.selectedProblem,
            explorationNotes: advisoryState.explorationNotes,
            eldibAssessment: advisoryState.eldibAssessment,
            caseNotes: document.getElementById('caseNotes')?.value || '',
            savedAt: new Date().toISOString()
        };

        localStorage.setItem('advisory-data', JSON.stringify(data));
        return true;
    } catch (error) {
        if (error.name === 'QuotaExceededError') {
            console.error('localStorage-Speicher voll');
            showUserMessage('Speicher voll. Bitte exportieren Sie Ihre Daten.', 'warning');
        } else {
            console.error('Fehler beim Speichern:', error.message);
        }
        return false;
    }
}

/**
 * Lädt gespeicherte Daten aus localStorage
 * @returns {boolean} true bei erfolgreichem Laden, false bei Fehler
 */
function loadFromLocalStorage() {
    try {
        // Prüfe ob localStorage verfügbar ist
        if (typeof localStorage === 'undefined') {
            console.warn('localStorage nicht verfügbar (Private Mode?)');
            return false;
        }

        const saved = localStorage.getItem('advisory-data');
        if (!saved) {
            return false;
        }

        const data = JSON.parse(saved);

        // Validiere die geladenen Daten
        if (typeof data !== 'object' || data === null) {
            console.warn('Ungültige Datenstruktur in localStorage');
            return false;
        }

        // Sichere Zuweisung mit Fallbacks
        advisoryState.selectedProblem = data.selectedProblem || null;
        advisoryState.explorationNotes = (typeof data.explorationNotes === 'object' && data.explorationNotes !== null)
            ? data.explorationNotes
            : {};
        advisoryState.eldibAssessment = (typeof data.eldibAssessment === 'object' && data.eldibAssessment !== null)
            ? data.eldibAssessment
            : {};

        // Restore UI
        if (advisoryState.selectedProblem) {
            // Prüfe ob die Problematik noch existiert
            if (typeof ADVISORY_DATA !== 'undefined' &&
                ADVISORY_DATA.problematiken &&
                ADVISORY_DATA.problematiken[advisoryState.selectedProblem]) {
                selectProblem(advisoryState.selectedProblem);
            } else {
                console.warn(`Problematik "${advisoryState.selectedProblem}" nicht mehr vorhanden`);
                advisoryState.selectedProblem = null;
            }
        }

        if (data.caseNotes && typeof data.caseNotes === 'string') {
            const notesEl = document.getElementById('caseNotes');
            if (notesEl) notesEl.value = data.caseNotes;
        }

        return true;
    } catch (error) {
        console.error('Fehler beim Laden der Advisory-Daten:', error.message);
        showUserMessage('Gespeicherte Daten konnten nicht geladen werden.', 'warning');
        return false;
    }
}

// ============================================
// EXPORT
// ============================================

function exportConsultation() {
    const problem = ADVISORY_DATA.problematiken[advisoryState.selectedProblem];
    if (!problem) {
        alert('Bitte wählen Sie zuerst eine Problematik aus.');
        return;
    }

    // Build HTML for export
    let html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Beratungsprotokoll - ${problem.name}</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; }
        h1 { color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 10px; }
        h2 { color: #333; margin-top: 30px; }
        h3 { color: #667eea; }
        .section { margin: 20px 0; padding: 15px; background: #f8f9fa; border-radius: 8px; }
        .question { margin-bottom: 20px; }
        .question-text { font-weight: bold; margin-bottom: 5px; }
        .answer { padding: 10px; background: white; border-left: 3px solid #667eea; }
        .intervention { background: #e8f5e9; padding: 15px; margin: 10px 0; border-radius: 5px; }
        .ich-ziel { background: #e3f2fd; padding: 10px; margin: 5px 0; border-radius: 5px; font-style: italic; }
        .warning { background: #ffebee; padding: 15px; border-radius: 5px; }
        .eldib-item { display: flex; margin: 5px 0; padding: 8px; background: white; border-radius: 5px; }
        .eldib-code { background: #667eea; color: white; padding: 2px 8px; border-radius: 3px; margin-right: 10px; }
        .status-erreicht { color: green; }
        .status-nicht { color: orange; }
        .notes { white-space: pre-wrap; padding: 15px; background: #fff9c4; border-radius: 5px; }
        @media print { body { margin: 20px; } }
    </style>
</head>
<body>
    <h1>Beratungsprotokoll</h1>
    <p><strong>Datum:</strong> ${new Date().toLocaleDateString('de-DE')}</p>
    <p><strong>Problematik:</strong> ${problem.name}</p>

    <h2>1. Problembeschreibung</h2>
    <div class="section">
        <p>${problem.beschreibung}</p>
        <h4>Typische Beispiele:</h4>
        <ul>
            ${problem.beispiele.map(b => `<li>${b}</li>`).join('')}
        </ul>
    </div>

    <h2>2. Exploration</h2>
    <div class="section">
`;

    problem.explorationsFragen.forEach((frage, index) => {
        const answer = advisoryState.explorationNotes[index] || '<em>Keine Notizen</em>';
        html += `
        <div class="question">
            <div class="question-text">${frage.frage}</div>
            <div class="answer">${answer}</div>
        </div>
`;
    });

    html += `
    </div>

    <h2>3. ELDiB-Einschätzung</h2>
    <div class="section">
`;

    const allCodes = [
        ...(problem.relevante_eldib_items.basiskompetenzen || []),
        ...(problem.relevante_eldib_items.kernkompetenzen || []),
        ...(problem.relevante_eldib_items.fortgeschritten || []),
        ...(problem.relevante_eldib_items.kommunikation || []),
        ...(problem.relevante_eldib_items.sozialisation || []),
        ...(problem.relevante_eldib_items.verhalten || []),
        ...(problem.relevante_eldib_items.kognition || [])
    ];

    allCodes.forEach(code => {
        const item = findItemByCode(code);
        const status = advisoryState.eldibAssessment[code] || 'nicht eingeschätzt';
        if (item) {
            html += `
        <div class="eldib-item">
            <span class="eldib-code">${code}</span>
            <span>${item.keyword}</span>
            <span style="margin-left: auto;" class="status-${status}">${status}</span>
        </div>
`;
        }
    });

    html += `
    </div>

    <h2>4. Entwicklungslogik</h2>
    <div class="section">
`;

    problem.entwicklungslogik.forEach(logic => {
        html += `
        <div style="margin-bottom: 15px; padding: 10px; background: white; border-radius: 5px;">
            <p><strong>Wenn:</strong> ${logic.wenn}</p>
            <p><strong>Dann:</strong> ${logic.dann}</p>
            <p style="background: #e8f5e9; padding: 8px; border-radius: 3px;"><strong>Intervention:</strong> ${logic.intervention}</p>
        </div>
`;
    });

    html += `
    </div>

    <h2>5. Empfohlene Interventionen</h2>
    <div class="section">
`;

    problem.interventionen.allgemein.forEach(intervention => {
        html += `
        <div class="intervention">
            <h4>${intervention.name}</h4>
            <p>${intervention.beschreibung}</p>
            <ul>
                ${intervention.massnahmen.map(m => `<li>${m}</li>`).join('')}
            </ul>
        </div>
`;
    });

    html += `
    </div>

    <h2>6. Ich-Ziele für das PEI</h2>
    <div class="section">
`;

    problem.interventionen.ichZiele.forEach(ziel => {
        html += `<div class="ich-ziel">"${ziel}"</div>`;
    });

    html += `
    </div>

    <h2>7. Warnzeichen</h2>
    <div class="section warning">
        <p><strong>Wann weitere fachliche Abklärung empfohlen wird:</strong></p>
        <ul>
            ${problem.warnzeichen.map(w => `<li>${w}</li>`).join('')}
        </ul>
    </div>

    <h2>8. Notizen</h2>
    <div class="section">
        <div class="notes">${document.getElementById('caseNotes')?.value || 'Keine Notizen'}</div>
    </div>

</body>
</html>
`;

    // Create and download
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Beratung_${problem.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.html`;
    a.click();
    URL.revokeObjectURL(url);

    alert('Die Beratungsdokumentation wurde heruntergeladen. Sie können sie in Ihrem Browser öffnen und als PDF drucken.');
}

// Clear session
function clearSession() {
    if (confirm('Möchten Sie wirklich alle Daten dieser Beratungssitzung löschen?')) {
        localStorage.removeItem('advisory-data');
        location.reload();
    }
}
