/**
 * Case Management Module - Fallverwaltung
 */

const CaseManager = {
    currentCase: null,

    /**
     * Generiert eine eindeutige Fall-ID
     */
    generateId() {
        const date = new Date();
        const year = date.getFullYear().toString().slice(-2);
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const random = Math.random().toString(36).substring(2, 6).toUpperCase();
        return `F${year}${month}-${random}`;
    },

    /**
     * Berechnet das Alter aus dem Geburtsdatum
     */
    calculateAge(dob) {
        const birthDate = new Date(dob);
        const today = new Date();
        let years = today.getFullYear() - birthDate.getFullYear();
        let months = today.getMonth() - birthDate.getMonth();

        if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate())) {
            years--;
            months += 12;
        }

        if (today.getDate() < birthDate.getDate()) {
            months--;
        }

        return { years, months };
    },

    /**
     * Erstellt einen neuen Fall
     */
    create(data) {
        const caseData = {
            id: data.id || this.generateId(),
            firstname: data.firstname,
            lastname: data.lastname,
            dob: data.dob,
            gender: data.gender || '',
            notes: data.notes || '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            tests: {}
        };

        // In Storage speichern
        const cases = Storage.get('cases', []);
        cases.push(caseData);
        Storage.set('cases', cases);

        return caseData;
    },

    /**
     * Lädt einen Fall
     */
    load(caseId) {
        const cases = Storage.get('cases', []);
        const caseData = cases.find(c => c.id === caseId);

        if (caseData) {
            this.currentCase = caseData;
            this.updateCaseInfoBar();
            return caseData;
        }

        return null;
    },

    /**
     * Speichert Änderungen am aktuellen Fall
     */
    save() {
        if (!this.currentCase) return false;

        this.currentCase.updatedAt = new Date().toISOString();

        const cases = Storage.get('cases', []);
        const index = cases.findIndex(c => c.id === this.currentCase.id);

        if (index !== -1) {
            cases[index] = this.currentCase;
            Storage.set('cases', cases);
            return true;
        }

        return false;
    },

    /**
     * Speichert Testergebnisse für den aktuellen Fall
     */
    saveTestResults(testType, results) {
        if (!this.currentCase) return false;

        this.currentCase.tests[testType] = {
            ...results,
            timestamp: new Date().toISOString()
        };

        return this.save();
    },

    /**
     * Lädt Testergebnisse für einen bestimmten Test
     */
    getTestResults(testType) {
        if (!this.currentCase) return null;
        return this.currentCase.tests[testType] || null;
    },

    /**
     * Schließt den aktuellen Fall
     */
    close() {
        this.currentCase = null;
        this.hideCaseInfoBar();
    },

    /**
     * Löscht einen Fall
     */
    delete(caseId) {
        const cases = Storage.get('cases', []);
        const filtered = cases.filter(c => c.id !== caseId);
        Storage.set('cases', filtered);

        if (this.currentCase && this.currentCase.id === caseId) {
            this.close();
        }
    },

    /**
     * Gibt alle Fälle zurück
     */
    getAll() {
        return Storage.get('cases', []);
    },

    /**
     * Sucht Fälle
     */
    search(query) {
        const cases = this.getAll();
        const q = query.toLowerCase();

        return cases.filter(c =>
            c.firstname.toLowerCase().includes(q) ||
            c.lastname.toLowerCase().includes(q) ||
            c.id.toLowerCase().includes(q)
        );
    },

    /**
     * Aktualisiert die Fall-Info-Leiste
     */
    updateCaseInfoBar() {
        if (!this.currentCase) return;

        const bar = document.getElementById('case-info-bar');
        const idEl = document.getElementById('active-case-id');
        const nameEl = document.getElementById('active-case-name');
        const dobEl = document.getElementById('active-case-dob');

        if (bar && idEl && nameEl && dobEl) {
            idEl.textContent = this.currentCase.id;
            nameEl.textContent = `${this.currentCase.lastname}, ${this.currentCase.firstname}`;

            const age = this.calculateAge(this.currentCase.dob);
            dobEl.textContent = `${age.years} Jahre, ${age.months} Monate`;

            bar.style.display = 'block';
        }
    },

    /**
     * Versteckt die Fall-Info-Leiste
     */
    hideCaseInfoBar() {
        const bar = document.getElementById('case-info-bar');
        if (bar) {
            bar.style.display = 'none';
        }
    }
};

// Modal-Funktionen
function openCaseModal() {
    document.getElementById('case-modal').style.display = 'flex';
    document.getElementById('case-form').reset();
    document.getElementById('case-modal-title').textContent = 'Neuen Fall anlegen';
}

function closeCaseModal() {
    document.getElementById('case-modal').style.display = 'none';
}

function saveCase() {
    const form = document.getElementById('case-form');
    const lastname = document.getElementById('case-lastname').value.trim();
    const firstname = document.getElementById('case-firstname').value.trim();
    const dob = document.getElementById('case-dob').value;
    const gender = document.getElementById('case-gender').value;
    const customId = document.getElementById('case-id').value.trim();
    const notes = document.getElementById('case-notes').value.trim();

    if (!lastname || !firstname || !dob) {
        alert('Bitte füllen Sie alle Pflichtfelder aus.');
        return;
    }

    const caseData = CaseManager.create({
        id: customId || undefined,
        firstname,
        lastname,
        dob,
        gender,
        notes
    });

    CaseManager.load(caseData.id);
    closeCaseModal();

    showNotification(`Fall ${caseData.id} wurde angelegt.`, 'success');
}

function openCaseListModal() {
    document.getElementById('case-list-modal').style.display = 'flex';
    renderCaseList();
}

function closeCaseListModal() {
    document.getElementById('case-list-modal').style.display = 'none';
}

function renderCaseList(query = '') {
    const container = document.getElementById('case-list');
    const cases = query ? CaseManager.search(query) : CaseManager.getAll();

    if (cases.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--color-text-muted);">Keine Fälle gefunden.</p>';
        return;
    }

    // Nach Datum sortieren (neueste zuerst)
    cases.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

    container.innerHTML = cases.map(c => {
        const age = CaseManager.calculateAge(c.dob);
        const testCount = Object.keys(c.tests).length;
        const lastUpdate = new Date(c.updatedAt).toLocaleDateString('de-DE');

        return `
            <div class="case-list-item" onclick="loadCaseFromList('${c.id}')">
                <div>
                    <strong>${c.lastname}, ${c.firstname}</strong>
                    <br>
                    <small>${c.id} | ${age.years} Jahre | ${testCount} Tests</small>
                </div>
                <div>
                    <small>Aktualisiert: ${lastUpdate}</small>
                </div>
            </div>
        `;
    }).join('');
}

function loadCaseFromList(caseId) {
    CaseManager.load(caseId);
    closeCaseListModal();
    showNotification(`Fall ${caseId} geladen.`, 'info');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    const btnNewCase = document.getElementById('btn-new-case');
    const btnCaseList = document.getElementById('btn-case-list');
    const btnSaveCase = document.getElementById('btn-save-case');
    const btnCloseCase = document.getElementById('btn-close-case');
    const searchInput = document.getElementById('case-search-input');

    if (btnNewCase) btnNewCase.addEventListener('click', openCaseModal);
    if (btnCaseList) btnCaseList.addEventListener('click', openCaseListModal);
    if (btnSaveCase) btnSaveCase.addEventListener('click', () => CaseManager.save());
    if (btnCloseCase) btnCloseCase.addEventListener('click', () => CaseManager.close());

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            renderCaseList(e.target.value);
        });
    }

    // Modal-Backdrops schließen bei Klick
    document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
        backdrop.addEventListener('click', () => {
            backdrop.closest('.modal').style.display = 'none';
        });
    });
});

window.CaseManager = CaseManager;
