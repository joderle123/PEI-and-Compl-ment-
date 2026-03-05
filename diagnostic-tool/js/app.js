/**
 * Haupt-App-Modul
 * Initialisierung und Navigation
 */

/**
 * Initialisiert die Anwendung
 */
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initTooltips();
    console.log('Diagnostisches Assessment-Tool initialisiert');
});

/**
 * Initialisiert die Navigation
 */
function initNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.test-section');

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const testType = btn.dataset.test;

            // Aktiven Button aktualisieren
            navButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Aktive Sektion aktualisieren
            sections.forEach(section => {
                section.classList.remove('active');
            });

            const targetSection = document.getElementById(`${testType}-section`);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });
}

/**
 * Initialisiert Tooltips für Info-Icons
 */
function initTooltips() {
    const infoIcons = document.querySelectorAll('.info-icon');

    infoIcons.forEach(icon => {
        const tooltip = icon.getAttribute('title');
        if (tooltip) {
            // Custom Tooltip erstellen
            const tooltipEl = document.createElement('div');
            tooltipEl.className = 'custom-tooltip';
            tooltipEl.textContent = tooltip;
            tooltipEl.style.cssText = `
                position: absolute;
                background: #1e293b;
                color: white;
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 12px;
                max-width: 250px;
                z-index: 1000;
                display: none;
                box-shadow: 0 4px 6px rgba(0,0,0,0.2);
            `;

            document.body.appendChild(tooltipEl);

            icon.addEventListener('mouseenter', (e) => {
                const rect = icon.getBoundingClientRect();
                tooltipEl.style.left = `${rect.left + window.scrollX - 100}px`;
                tooltipEl.style.top = `${rect.bottom + window.scrollY + 5}px`;
                tooltipEl.style.display = 'block';
            });

            icon.addEventListener('mouseleave', () => {
                tooltipEl.style.display = 'none';
            });

            // Original title entfernen um doppelte Tooltips zu vermeiden
            icon.removeAttribute('title');
        }
    });
}

/**
 * Hilfsfunktion zum Wechseln der Test-Sektion (von anderen Modulen verwendet)
 */
function switchToTest(testType) {
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.test-section');

    navButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.test === testType) {
            btn.classList.add('active');
        }
    });

    sections.forEach(section => {
        section.classList.remove('active');
    });

    const targetSection = document.getElementById(`${testType}-section`);
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

/**
 * Validiert numerische Eingaben
 */
function validateNumericInput(input, min, max) {
    let value = parseInt(input.value);

    if (isNaN(value)) {
        input.value = '';
        return null;
    }

    if (value < min) {
        value = min;
        input.value = min;
    }

    if (value > max) {
        value = max;
        input.value = max;
    }

    return value;
}

/**
 * Zeigt eine Benachrichtigung an
 */
function showNotification(message, type = 'info') {
    // Existierende Benachrichtigungen entfernen
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;

    const colors = {
        info: '#2563eb',
        success: '#22c55e',
        warning: '#f59e0b',
        error: '#ef4444'
    };

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        background: ${colors[type]};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 9999;
        animation: slideIn 0.3s ease-out;
    `;

    notification.textContent = message;
    document.body.appendChild(notification);

    // Animation hinzufügen
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // Automatisch ausblenden
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/**
 * Formatiert einen Wert mit Einheit
 */
function formatValue(value, unit = '') {
    if (value === null || value === undefined) {
        return '-';
    }
    return `${value}${unit}`;
}

/**
 * Sammelt alle Testdaten für den Export
 */
function getAllTestData() {
    const data = {
        timestamp: new Date().toISOString(),
        sdq: null,
        wisc: null,
        cbcl: null
    };

    // SDQ-Daten
    const sdqResults = document.getElementById('sdq-results');
    if (!sdqResults.classList.contains('hidden')) {
        data.sdq = getSDQData();
    }

    // WISC-Daten
    const wiscResults = document.getElementById('wisc-results');
    if (!wiscResults.classList.contains('hidden')) {
        data.wisc = getWISCData();
    }

    // CBCL-Daten
    const cbclResults = document.getElementById('cbcl-results');
    if (!cbclResults.classList.contains('hidden')) {
        data.cbcl = getCBCLData();
    }

    return data;
}

/**
 * Exportiert alle Daten als JSON
 */
function exportAsJSON() {
    const data = getAllTestData();
    const json = JSON.stringify(data, null, 2);

    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `assessment_daten_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
}

/**
 * Keyboard Shortcuts
 */
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + P = PDF Export
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        exportToPDF();
    }

    // Ctrl/Cmd + 1-4 = Navigation
    if ((e.ctrlKey || e.metaKey) && ['1', '2', '3', '4'].includes(e.key)) {
        e.preventDefault();
        const tests = ['sdq', 'wisc', 'cbcl', 'import'];
        const index = parseInt(e.key) - 1;
        if (tests[index]) {
            switchToTest(tests[index]);
        }
    }
});

/**
 * Service Worker für Offline-Unterstützung (falls benötigt)
 */
if ('serviceWorker' in navigator) {
    // Service Worker könnte hier registriert werden für PWA-Funktionalität
    // navigator.serviceWorker.register('/sw.js');
}

// Globale Funktionen exportieren
window.switchToTest = switchToTest;
window.showNotification = showNotification;
window.exportAsJSON = exportAsJSON;
