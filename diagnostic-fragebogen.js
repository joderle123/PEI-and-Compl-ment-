// ========================================
// DIAGNOSTIC SPÉCIALISÉ - FRAGEBOGEN
// Automatisierte Berichtsgenerierung
// ========================================

// State für Antworten
let fragebogenState = {};

// Antwort speichern
function setAntwort(kategorie, frage, wert, text) {
    if (!fragebogenState[kategorie]) {
        fragebogenState[kategorie] = {};
    }
    fragebogenState[kategorie][frage] = { wert: wert, text: text };
    localStorage.setItem('diagnostic-fragebogen-state', JSON.stringify(fragebogenState));
    updateFragebogenProgress();
}

// Multi-Antwort toggle
function toggleMultiAntwort(kategorie, frage, wert, text, checkbox) {
    if (!fragebogenState[kategorie]) {
        fragebogenState[kategorie] = {};
    }
    if (!fragebogenState[kategorie][frage]) {
        fragebogenState[kategorie][frage] = [];
    }

    const arr = fragebogenState[kategorie][frage];
    const existing = arr.findIndex(item => item.wert === wert);

    if (existing > -1) {
        arr.splice(existing, 1);
    } else {
        arr.push({ wert: wert, text: text });
    }

    localStorage.setItem('diagnostic-fragebogen-state', JSON.stringify(fragebogenState));
    updateFragebogenProgress();
}

// State laden
function loadFragebogenState() {
    const saved = localStorage.getItem('diagnostic-fragebogen-state');
    if (saved) {
        fragebogenState = JSON.parse(saved);
        restoreFragebogenUI();
    }
}

// UI wiederherstellen
function restoreFragebogenUI() {
    // Radio buttons
    document.querySelectorAll('input[type="radio"][data-kategorie]').forEach(radio => {
        const kat = radio.dataset.kategorie;
        const frage = radio.dataset.frage;
        if (fragebogenState[kat] && fragebogenState[kat][frage]) {
            if (fragebogenState[kat][frage].wert === radio.value) {
                radio.checked = true;
                radio.closest('label').classList.add('selected');
            }
        }
    });

    // Checkboxes
    document.querySelectorAll('input[type="checkbox"][data-kategorie]').forEach(cb => {
        const kat = cb.dataset.kategorie;
        const frage = cb.dataset.frage;
        if (fragebogenState[kat] && Array.isArray(fragebogenState[kat][frage])) {
            const found = fragebogenState[kat][frage].find(item => item.wert === cb.value);
            if (found) {
                cb.checked = true;
                cb.closest('label').classList.add('selected');
            }
        }
    });

    updateFragebogenProgress();
}

// Fortschritt aktualisieren
function updateFragebogenProgress() {
    let answered = 0;
    let total = 0;

    document.querySelectorAll('.frage-gruppe').forEach(gruppe => {
        total++;
        const kat = gruppe.dataset.kategorie;
        const frage = gruppe.dataset.frage;
        if (fragebogenState[kat] && fragebogenState[kat][frage]) {
            const val = fragebogenState[kat][frage];
            if (Array.isArray(val) ? val.length > 0 : val.wert) {
                answered++;
            }
        }
    });

    const percent = total > 0 ? Math.round((answered / total) * 100) : 0;
    const el = document.getElementById('fragebogen-fortschritt');
    if (el) {
        el.innerHTML = `<strong>${answered}/${total}</strong> Fragen beantwortet (${percent}%)`;
        el.style.background = percent === 100 ? '#d4edda' : '#fff3cd';
    }
}

// Radio-Auswahl Handler
function handleRadioSelect(radio) {
    const kat = radio.dataset.kategorie;
    const frage = radio.dataset.frage;
    const text = radio.dataset.text;

    // UI aktualisieren
    radio.closest('.frage-gruppe').querySelectorAll('label').forEach(l => l.classList.remove('selected'));
    radio.closest('label').classList.add('selected');

    setAntwort(kat, frage, radio.value, text);
}

// Checkbox-Auswahl Handler
function handleCheckboxSelect(cb) {
    const kat = cb.dataset.kategorie;
    const frage = cb.dataset.frage;
    const text = cb.dataset.text;

    cb.closest('label').classList.toggle('selected', cb.checked);
    toggleMultiAntwort(kat, frage, cb.value, text, cb);
}

// ========================================
// BERICHT GENERIEREN
// ========================================

function generateDiagnosticReport() {
    const stammdaten = typeof getStammdaten === 'function' ? getStammdaten() : {};
    const profil = typeof berechneEntwicklungsprofil === 'function' ? berechneEntwicklungsprofil() : {};

    const name = stammdaten.schueler_name || 'N.N.';
    const vorname = name.includes(',') ? name.split(',')[1].trim() : name.split(' ')[0];
    const heute = new Date().toLocaleDateString('de-DE');

    let html = `
<div class="diagnostic-report">
    <div style="text-align: center; border-bottom: 3px solid #1a1a2e; padding-bottom: 20px; margin-bottom: 25px;">
        <h1 style="color: #1a1a2e; margin: 0;">DIAGNOSTIC SPÉCIALISÉ</h1>
        <p style="color: #667eea; font-size: 1.1em; margin: 5px 0;">Bericht zur sozial-emotionalen Entwicklung</p>
        <p style="color: #666; font-size: 0.9em;">Centre de Diagnostic Spécialisé de l'Éducation</p>
    </div>

    <h2>1. Angaben zum Schüler</h2>
    <table class="info-table">
        <tr><td><strong>Name:</strong></td><td>${stammdaten.schueler_name || '-'}</td></tr>
        <tr><td><strong>Geburtsdatum:</strong></td><td>${stammdaten.geburtsdatum || '-'}</td></tr>
        <tr><td><strong>Matricule:</strong></td><td>${stammdaten.matricule || '-'}</td></tr>
        <tr><td><strong>Schule:</strong></td><td>${stammdaten.foerderort || '-'}</td></tr>
        <tr><td><strong>Klasse:</strong></td><td>${stammdaten.klasse || '-'}</td></tr>
        <tr><td><strong>Schuljahr:</strong></td><td>${stammdaten.schuljahr || '-'}</td></tr>
        <tr><td><strong>Untersuchungsdatum:</strong></td><td>${stammdaten.einschaetzungsdatum || '-'}</td></tr>
        <tr><td><strong>Untersucher/in:</strong></td><td>${stammdaten.einschaetzende || '-'}</td></tr>
    </table>
`;

    // 2. ANLASS
    html += `<h2>2. Anlass der Untersuchung</h2>`;
    const anlass = fragebogenState.anlass || {};
    if (anlass.grund) {
        html += `<p>${anlass.grund.text.replace(/{name}/g, vorname)}</p>`;
    }
    if (anlass.fragestellung && anlass.fragestellung.length > 0) {
        html += `<p><strong>Fragestellungen:</strong></p><ul>`;
        anlass.fragestellung.forEach(f => html += `<li>${f.text}</li>`);
        html += `</ul>`;
    }

    // 3. UNTERSUCHUNGSMETHODEN
    html += `
    <h2>3. Untersuchungsmethoden</h2>
    <ul>
        <li>Entwicklungstherapeutischer Lernziel-Diagnose-Bogen (ELDiB)</li>
        <li>Strukturierte Verhaltensbeobachtung</li>
        <li>Analyse schulischer Unterlagen</li>
        <li>Gespräche mit Lehrpersonen</li>
    </ul>
`;

    // 4. ERGEBNISSE
    html += `<h2>4. Ergebnisse der Untersuchung</h2>`;

    // VERHALTEN
    html += `<h3 style="color: #e74c3c; border-left: 4px solid #e74c3c; padding-left: 10px;">4.1 Verhalten</h3>`;
    const verhalten = fragebogenState.verhalten || {};
    let verhaltensText = [];

    if (profil.verhalten && profil.verhalten.hoechsteStufe) {
        verhaltensText.push(`Im Bereich Verhalten befindet sich ${vorname} auf der Entwicklungsstufe ${profil.verhalten.hoechsteStufe} des ELDiB.`);
    }

    Object.values(verhalten).forEach(v => {
        if (v && v.text) verhaltensText.push(v.text.replace(/{name}/g, vorname));
        if (Array.isArray(v)) v.forEach(item => {
            if (item.text) verhaltensText.push(item.text.replace(/{name}/g, vorname));
        });
    });

    if (verhaltensText.length > 0) {
        html += `<p>${verhaltensText.join(' ')}</p>`;
    } else {
        html += `<p><em>Keine Angaben</em></p>`;
    }

    // KOMMUNIKATION
    html += `<h3 style="color: #3498db; border-left: 4px solid #3498db; padding-left: 10px;">4.2 Kommunikation</h3>`;
    const kommunikation = fragebogenState.kommunikation || {};
    let kommText = [];

    if (profil.kommunikation && profil.kommunikation.hoechsteStufe) {
        kommText.push(`Im Bereich Kommunikation befindet sich ${vorname} auf der Entwicklungsstufe ${profil.kommunikation.hoechsteStufe} des ELDiB.`);
    }

    Object.values(kommunikation).forEach(v => {
        if (v && v.text) kommText.push(v.text.replace(/{name}/g, vorname));
        if (Array.isArray(v)) v.forEach(item => {
            if (item.text) kommText.push(item.text.replace(/{name}/g, vorname));
        });
    });

    if (kommText.length > 0) {
        html += `<p>${kommText.join(' ')}</p>`;
    } else {
        html += `<p><em>Keine Angaben</em></p>`;
    }

    // SOZIALISATION
    html += `<h3 style="color: #2ecc71; border-left: 4px solid #2ecc71; padding-left: 10px;">4.3 Sozialisation</h3>`;
    const sozialisation = fragebogenState.sozialisation || {};
    let sozText = [];

    if (profil.sozialisation && profil.sozialisation.hoechsteStufe) {
        sozText.push(`Im Bereich Sozialisation befindet sich ${vorname} auf der Entwicklungsstufe ${profil.sozialisation.hoechsteStufe} des ELDiB.`);
    }

    Object.values(sozialisation).forEach(v => {
        if (v && v.text) sozText.push(v.text.replace(/{name}/g, vorname));
        if (Array.isArray(v)) v.forEach(item => {
            if (item.text) sozText.push(item.text.replace(/{name}/g, vorname));
        });
    });

    if (sozText.length > 0) {
        html += `<p>${sozText.join(' ')}</p>`;
    } else {
        html += `<p><em>Keine Angaben</em></p>`;
    }

    // KOGNITION
    html += `<h3 style="color: #f39c12; border-left: 4px solid #f39c12; padding-left: 10px;">4.4 Kognition / Lern- und Arbeitsverhalten</h3>`;
    const kognition = fragebogenState.kognition || {};
    let kogText = [];

    if (profil.kognition && profil.kognition.hoechsteStufe) {
        kogText.push(`Im Bereich Kognition befindet sich ${vorname} auf der Entwicklungsstufe ${profil.kognition.hoechsteStufe} des ELDiB.`);
    }

    Object.values(kognition).forEach(v => {
        if (v && v.text) kogText.push(v.text.replace(/{name}/g, vorname));
        if (Array.isArray(v)) v.forEach(item => {
            if (item.text) kogText.push(item.text.replace(/{name}/g, vorname));
        });
    });

    if (kogText.length > 0) {
        html += `<p>${kogText.join(' ')}</p>`;
    } else {
        html += `<p><em>Keine Angaben</em></p>`;
    }

    // 5. RESSOURCEN
    html += `<h2>5. Ressourcen und Stärken</h2>`;
    const ressourcen = fragebogenState.ressourcen || {};
    let resText = [];

    Object.values(ressourcen).forEach(v => {
        if (v && v.text) resText.push(v.text.replace(/{name}/g, vorname));
        if (Array.isArray(v)) v.forEach(item => {
            if (item.text) resText.push(item.text.replace(/{name}/g, vorname));
        });
    });

    if (resText.length > 0) {
        html += `<p>${resText.join(' ')}</p>`;
    } else {
        html += `<p><em>Keine Angaben</em></p>`;
    }

    // 6. FÖRDERZIELE (aus ELDiB)
    html += `<h2>6. Förderziele</h2>`;
    let hatZiele = false;

    ['verhalten', 'kommunikation', 'sozialisation', 'kognition'].forEach(bereich => {
        if (profil[bereich] && profil[bereich].ziele && profil[bereich].ziele.length > 0) {
            hatZiele = true;
            const colors = { verhalten: '#e74c3c', kommunikation: '#3498db', sozialisation: '#2ecc71', kognition: '#f39c12' };
            html += `<p style="color: ${colors[bereich]}; font-weight: bold;">${bereich.charAt(0).toUpperCase() + bereich.slice(1)}:</p><ul>`;
            profil[bereich].ziele.forEach(z => {
                html += `<li>${z.code}: ${z.zieltext || z.description}</li>`;
            });
            html += `</ul>`;
        }
    });

    if (!hatZiele) {
        html += `<p><em>Keine Förderziele ausgewählt</em></p>`;
    }

    // 7. EMPFEHLUNGEN
    html += `<h2>7. Förderempfehlungen</h2>`;
    const empfehlungen = fragebogenState.empfehlungen || {};
    let empfText = [];

    Object.values(empfehlungen).forEach(v => {
        if (v && v.text) empfText.push(v.text.replace(/{name}/g, vorname));
        if (Array.isArray(v)) v.forEach(item => {
            if (item.text) empfText.push(item.text.replace(/{name}/g, vorname));
        });
    });

    if (empfText.length > 0) {
        html += `<p>${empfText.join(' ')}</p>`;
    } else {
        html += `<p><em>Keine Angaben</em></p>`;
    }

    // UNTERSCHRIFT
    html += `
    <div style="margin-top: 60px;">
        <p>Luxemburg, den ${heute}</p>
        <div style="margin-top: 50px; text-align: right;">
            <div style="border-top: 1px solid #333; width: 250px; display: inline-block; padding-top: 5px;">
                ${stammdaten.einschaetzende || 'Unterschrift'}
            </div>
        </div>
    </div>
</div>
`;

    return html;
}

// Vorschau anzeigen
function showDiagnosticPreview() {
    const html = generateDiagnosticReport();
    const preview = document.getElementById('bericht-vorschau');
    if (preview) {
        preview.innerHTML = html;
    }
}

// Word-Download
function downloadDiagnosticReport() {
    const stammdaten = typeof getStammdaten === 'function' ? getStammdaten() : {};
    const reportHTML = generateDiagnosticReport();

    const fullHTML = `<!DOCTYPE html>
<html><head><meta charset="UTF-8">
<title>Diagnostic Spécialisé - ${stammdaten.schueler_name || 'Bericht'}</title>
<style>
body { font-family: 'Times New Roman', serif; margin: 2cm; line-height: 1.8; font-size: 12pt; }
h1 { font-size: 18pt; color: #1a1a2e; }
h2 { font-size: 14pt; color: #1a1a2e; border-bottom: 2px solid #667eea; padding-bottom: 5px; margin-top: 20pt; }
h3 { font-size: 12pt; margin-top: 15pt; }
p { margin: 8pt 0; text-align: justify; }
ul { margin: 5pt 0 15pt 20pt; }
li { margin-bottom: 3pt; }
table.info-table { width: 100%; border-collapse: collapse; margin: 10pt 0; }
table.info-table td { padding: 5pt 10pt; border: 1px solid #ddd; }
table.info-table td:first-child { background: #f5f5f5; width: 180pt; }
</style></head><body>${reportHTML}</body></html>`;

    const blob = new Blob(['\ufeff', fullHTML], { type: 'application/msword' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `Diagnostic_${stammdaten.schueler_name || 'Bericht'}_${new Date().toISOString().split('T')[0]}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Initialisierung
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(loadFragebogenState, 200);
});
