/**
 * Legal Module - Rechtliche Inhalte und Modals
 */

const LegalContent = {
    impressum: {
        title: 'Impressum',
        content: `
            <h3>Angaben gemäß § 5 TMG</h3>
            <p>
                <strong>PsychoDiagnostik Pro</strong><br>
                Open-Source Projekt<br>
                Diagnostisches Assessment-Tool
            </p>

            <h3>Kontakt</h3>
            <p>
                E-Mail: kontakt@psychodiagnostik-pro.de<br>
                GitHub: github.com/psychodiagnostik-pro
            </p>

            <h3>Verantwortlich für den Inhalt</h3>
            <p>
                Die Inhalte dieser Anwendung wurden mit größter Sorgfalt erstellt.
                Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte
                können wir jedoch keine Gewähr übernehmen.
            </p>

            <h3>Haftung für Inhalte</h3>
            <p>
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte
                auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
                Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
                verpflichtet, übermittelte oder gespeicherte fremde Informationen
                zu überwachen.
            </p>
        `
    },

    privacy: {
        title: 'Datenschutzerklärung',
        content: `
            <h3>1. Datenschutz auf einen Blick</h3>

            <h4>Allgemeine Hinweise</h4>
            <p>
                Diese Anwendung arbeitet vollständig <strong>offline und lokal</strong>.
                Alle eingegebenen Daten werden ausschließlich in Ihrem Browser
                (LocalStorage) gespeichert und verlassen niemals Ihr Gerät.
            </p>

            <h4>Datenerfassung in dieser Anwendung</h4>
            <p>
                <strong>Welche Daten werden erfasst?</strong><br>
                - Patientenstammdaten (Name, Geburtsdatum) - nur wenn Sie diese eingeben<br>
                - Testergebnisse der psychologischen Verfahren<br>
                - Falldokumentation und Notizen
            </p>

            <p>
                <strong>Wo werden die Daten gespeichert?</strong><br>
                Alle Daten werden ausschließlich lokal in Ihrem Browser gespeichert
                (LocalStorage). Es erfolgt <strong>keine Übertragung</strong> an externe Server.
            </p>

            <h3>2. Hosting und externe Bibliotheken</h3>
            <p>
                Diese Anwendung lädt folgende externe Ressourcen:
            </p>
            <ul>
                <li>Google Fonts (Schriftarten)</li>
                <li>Chart.js (Diagramme)</li>
                <li>jsPDF (PDF-Erstellung)</li>
            </ul>
            <p>
                Beim Laden dieser Ressourcen kann Ihre IP-Adresse an die jeweiligen
                Anbieter übermittelt werden. Für den Offline-Betrieb können diese
                Bibliotheken auch lokal eingebunden werden.
            </p>

            <h3>3. Ihre Rechte</h3>
            <p>
                Da alle Daten lokal gespeichert werden, haben Sie jederzeit volle
                Kontrolle über Ihre Daten. Sie können:
            </p>
            <ul>
                <li>Alle Daten über die Fallverwaltung einsehen</li>
                <li>Einzelne Fälle oder alle Daten löschen</li>
                <li>Daten exportieren (JSON/PDF)</li>
                <li>Den Browser-Speicher jederzeit leeren</li>
            </ul>

            <h3>4. Datensicherheit</h3>
            <p>
                <strong>Wichtiger Hinweis:</strong> LocalStorage bietet keinen
                besonderen Schutz vor unbefugtem Zugriff auf dem lokalen Gerät.
                Stellen Sie sicher, dass nur autorisierte Personen Zugang zu
                dem verwendeten Computer haben.
            </p>
            <p>
                Für den Einsatz mit realen Patientendaten empfehlen wir:
            </p>
            <ul>
                <li>Verwendung auf geschützten, passwortgesicherten Geräten</li>
                <li>Regelmäßige Datensicherung (Export)</li>
                <li>Löschen der Daten nach Abschluss der Diagnostik</li>
            </ul>
        `
    },

    disclaimer: {
        title: 'Haftungsausschluss',
        content: `
            <h3>Wichtiger Hinweis zur Verwendung</h3>

            <div style="background: #fff3cd; border: 1px solid #ffc107; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem;">
                <strong>⚠ Dieses Tool ersetzt keine professionelle klinische Diagnostik!</strong>
            </div>

            <h4>Bestimmungsgemäße Verwendung</h4>
            <p>
                PsychoDiagnostik Pro ist ein <strong>Hilfswerkzeug</strong> zur Auswertung
                und Visualisierung psychologischer Testergebnisse. Es ist ausschließlich
                für die Verwendung durch qualifizierte Fachpersonen vorgesehen:
            </p>
            <ul>
                <li>Klinische Psycholog:innen</li>
                <li>Schulpsycholog:innen</li>
                <li>Kinder- und Jugendlichenpsychotherapeut:innen</li>
                <li>Ärzt:innen mit entsprechender Qualifikation</li>
            </ul>

            <h4>Keine diagnostische Entscheidung durch das Tool</h4>
            <p>
                Die von diesem Tool generierten Interpretationen und Empfehlungen
                dienen ausschließlich als <strong>Orientierungshilfe</strong>.
                Diagnostische Entscheidungen müssen immer:
            </p>
            <ul>
                <li>Auf Basis einer umfassenden klinischen Beurteilung erfolgen</li>
                <li>Den individuellen Kontext des Patienten berücksichtigen</li>
                <li>Durch qualifizierte Fachpersonen getroffen werden</li>
                <li>Weitere diagnostische Informationen einbeziehen</li>
            </ul>

            <h4>Haftungsausschluss</h4>
            <p>
                Die Entwickler und Betreiber von PsychoDiagnostik Pro übernehmen
                <strong>keine Haftung</strong> für:
            </p>
            <ul>
                <li>Fehlerhafte diagnostische Entscheidungen</li>
                <li>Falsche Interpretation der Ergebnisse</li>
                <li>Schäden, die aus der Verwendung des Tools entstehen</li>
                <li>Die Korrektheit der implementierten Normen und Algorithmen</li>
            </ul>

            <h4>Normwerte und Algorithmen</h4>
            <p>
                Die in diesem Tool verwendeten Normwerte und Auswertungsalgorithmen
                basieren auf den veröffentlichten Testmanualen. Dennoch können
                Fehler nicht ausgeschlossen werden. Überprüfen Sie wichtige
                Ergebnisse immer anhand der Originalmanualen.
            </p>

            <h4>Urheberrechte der Testverfahren</h4>
            <p>
                Die Rechte an den genannten Testverfahren (SDQ, WISC-V, CBCL,
                DISYPS-III, AFS, d2-R) liegen bei den jeweiligen Autoren und
                Verlagen. Dieses Tool stellt lediglich eine Auswertungshilfe
                dar und ersetzt nicht den Erwerb der lizenzierten Testmaterialien.
            </p>
        `
    },

    license: {
        title: 'Lizenz (MIT)',
        content: `
            <h3>MIT License</h3>

            <p>Copyright (c) 2024 PsychoDiagnostik Pro</p>

            <p>
                Permission is hereby granted, free of charge, to any person obtaining a copy
                of this software and associated documentation files (the "Software"), to deal
                in the Software without restriction, including without limitation the rights
                to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                copies of the Software, and to permit persons to whom the Software is
                furnished to do so, subject to the following conditions:
            </p>

            <p>
                The above copyright notice and this permission notice shall be included in all
                copies or substantial portions of the Software.
            </p>

            <p>
                <strong>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
                SOFTWARE.</strong>
            </p>

            <h3>Open-Source Projekt</h3>
            <p>
                PsychoDiagnostik Pro ist ein Open-Source Projekt. Sie dürfen die Software
                frei verwenden, modifizieren und weitergeben, solange Sie die obige
                Lizenzbedingung einhalten.
            </p>

            <h4>Verwendete Bibliotheken</h4>
            <table style="width: 100%; border-collapse: collapse; margin-top: 1rem;">
                <tr style="background: #f5f5f5;">
                    <th style="padding: 0.5rem; text-align: left; border: 1px solid #ddd;">Bibliothek</th>
                    <th style="padding: 0.5rem; text-align: left; border: 1px solid #ddd;">Lizenz</th>
                </tr>
                <tr>
                    <td style="padding: 0.5rem; border: 1px solid #ddd;">Chart.js</td>
                    <td style="padding: 0.5rem; border: 1px solid #ddd;">MIT</td>
                </tr>
                <tr>
                    <td style="padding: 0.5rem; border: 1px solid #ddd;">jsPDF</td>
                    <td style="padding: 0.5rem; border: 1px solid #ddd;">MIT</td>
                </tr>
                <tr>
                    <td style="padding: 0.5rem; border: 1px solid #ddd;">html2canvas</td>
                    <td style="padding: 0.5rem; border: 1px solid #ddd;">MIT</td>
                </tr>
                <tr>
                    <td style="padding: 0.5rem; border: 1px solid #ddd;">Source Sans 3 Font</td>
                    <td style="padding: 0.5rem; border: 1px solid #ddd;">OFL</td>
                </tr>
            </table>
        `
    },

    references: {
        title: 'Literaturverweise',
        content: `
            <h3>Verwendete Testverfahren und Referenzen</h3>

            <h4>SDQ - Strengths and Difficulties Questionnaire</h4>
            <p>
                Goodman, R. (1997). The Strengths and Difficulties Questionnaire:
                A Research Note. <em>Journal of Child Psychology and Psychiatry, 38</em>, 581-586.
            </p>
            <p>
                Deutsche Version: Klasen, H., Woerner, W., Rothenberger, A. & Goodman, R. (2003).
                Die deutsche Fassung des Strengths and Difficulties Questionnaire (SDQ-Deu).
                <em>Zeitschrift für Kinder- und Jugendpsychiatrie und Psychotherapie, 31</em>, 271-280.
            </p>

            <h4>WISC-V - Wechsler Intelligence Scale for Children</h4>
            <p>
                Petermann, F. & Petermann, U. (Hrsg.) (2017). <em>WISC-V. Wechsler Intelligence
                Scale for Children - Fifth Edition. Deutschsprachige Adaptation</em>.
                Frankfurt: Pearson Assessment.
            </p>

            <h4>CBCL/6-18R - Child Behavior Checklist</h4>
            <p>
                Achenbach, T. M. & Rescorla, L. A. (2001). <em>Manual for the ASEBA School-Age
                Forms & Profiles</em>. Burlington, VT: University of Vermont.
            </p>
            <p>
                Deutsche Fassung: Döpfner, M., Plück, J. & Kinnen, C. (2014). <em>CBCL/6-18R,
                TRF/6-18R, YSR/11-18R. Deutsche Schulalter-Formen der Child Behavior Checklist</em>.
                Göttingen: Hogrefe.
            </p>

            <h4>DISYPS-III - Diagnostik-System für psychische Störungen</h4>
            <p>
                Döpfner, M. & Görtz-Dorten, A. (2017). <em>DISYPS-III. Diagnostik-System für
                psychische Störungen nach ICD-10 und DSM-5 für Kinder und Jugendliche - III</em>.
                Bern: Hogrefe.
            </p>

            <h4>AFS - Angstfragebogen für Schüler</h4>
            <p>
                Wieczerkowski, W., Nickel, H., Janowski, A., Fittkau, B. & Rauer, W. (1981).
                <em>Angstfragebogen für Schüler (AFS)</em>. Göttingen: Hogrefe.
            </p>

            <h4>d2-R - Aufmerksamkeits- und Konzentrationstest</h4>
            <p>
                Brickenkamp, R., Schmidt-Atzert, L. & Liepmann, D. (2010).
                <em>d2-R. Aufmerksamkeits- und Konzentrationstest - Revision</em>.
                Göttingen: Hogrefe.
            </p>

            <hr style="margin: 2rem 0;">

            <h3>Hinweis</h3>
            <p>
                Für die Durchführung und Interpretation der genannten Testverfahren
                sind die jeweiligen Testmanualen verbindlich. Dieses Tool dient
                lediglich als Auswertungshilfe und ersetzt nicht die fachliche
                Qualifikation und das Studium der Originalliteratur.
            </p>
        `
    }
};

/**
 * Zeigt das Legal-Modal mit dem entsprechenden Inhalt
 */
function showLegalModal(type) {
    const content = LegalContent[type];
    if (!content) return;

    const modal = document.getElementById('legal-modal');
    const titleEl = document.getElementById('legal-modal-title');
    const contentEl = document.getElementById('legal-modal-content');

    if (!modal || !titleEl || !contentEl) return;

    titleEl.textContent = content.title;
    contentEl.innerHTML = content.content;
    modal.style.display = 'flex';

    // ESC-Taste zum Schließen
    document.addEventListener('keydown', handleLegalModalEsc);
}

/**
 * Schließt das Legal-Modal
 */
function closeLegalModal() {
    const modal = document.getElementById('legal-modal');
    if (modal) {
        modal.style.display = 'none';
    }
    document.removeEventListener('keydown', handleLegalModalEsc);
}

/**
 * Handler für ESC-Taste
 */
function handleLegalModalEsc(e) {
    if (e.key === 'Escape') {
        closeLegalModal();
    }
}

/**
 * Zeigt das Hilfe-Modal
 */
function showHelpModal() {
    const helpContent = `
        <h3>Schnellstart</h3>
        <ol>
            <li><strong>Fall anlegen:</strong> Klicken Sie auf "Neuer Fall" um Patientendaten zu erfassen</li>
            <li><strong>Test auswählen:</strong> Wählen Sie den gewünschten Test in der Navigation</li>
            <li><strong>Werte eingeben:</strong> Tragen Sie die ermittelten Testwerte ein</li>
            <li><strong>Auswerten:</strong> Klicken Sie auf "Auswerten" für die Interpretation</li>
            <li><strong>Bericht erstellen:</strong> Generieren Sie einen PDF-Bericht unter "Bericht"</li>
        </ol>

        <h3>Tastenkürzel</h3>
        <table style="width: 100%; border-collapse: collapse; margin: 1rem 0;">
            <tr><td style="padding: 0.5rem; border: 1px solid #ddd;"><kbd>Strg</kbd> + <kbd>P</kbd></td>
                <td style="padding: 0.5rem; border: 1px solid #ddd;">PDF-Export</td></tr>
            <tr><td style="padding: 0.5rem; border: 1px solid #ddd;"><kbd>Strg</kbd> + <kbd>1-6</kbd></td>
                <td style="padding: 0.5rem; border: 1px solid #ddd;">Zwischen Tests wechseln</td></tr>
        </table>

        <h3>Unterstützte Tests</h3>
        <ul>
            <li><strong>SDQ</strong> - Strengths and Difficulties Questionnaire (Screening)</li>
            <li><strong>WISC-V</strong> - Wechsler Intelligence Scale for Children (Intelligenz)</li>
            <li><strong>CBCL</strong> - Child Behavior Checklist (Verhalten)</li>
            <li><strong>DISYPS-III</strong> - ADHS und SSV Diagnostik</li>
            <li><strong>AFS</strong> - Angstfragebogen für Schüler</li>
            <li><strong>d2-R</strong> - Aufmerksamkeits- und Konzentrationstest</li>
        </ul>

        <h3>Datenimport</h3>
        <p>
            Sie können Testergebnisse aus CSV-Dateien importieren. Laden Sie sich eine
            Vorlage herunter, um das richtige Format zu sehen. Der Import erkennt
            automatisch den Testtyp anhand der Spaltenüberschriften.
        </p>

        <h3>Support</h3>
        <p>
            Bei Fragen oder Problemen besuchen Sie unser GitHub Repository oder
            kontaktieren Sie uns per E-Mail.
        </p>
    `;

    const modal = document.getElementById('legal-modal');
    const titleEl = document.getElementById('legal-modal-title');
    const contentEl = document.getElementById('legal-modal-content');

    if (modal && titleEl && contentEl) {
        titleEl.textContent = 'Benutzerhandbuch';
        contentEl.innerHTML = helpContent;
        modal.style.display = 'flex';
        document.addEventListener('keydown', handleLegalModalEsc);
    }
}

// Event Listener für Modal-Backdrop
document.addEventListener('DOMContentLoaded', () => {
    const legalModal = document.getElementById('legal-modal');
    if (legalModal) {
        const backdrop = legalModal.querySelector('.modal-backdrop');
        if (backdrop) {
            backdrop.addEventListener('click', closeLegalModal);
        }
    }
});

// Globale Funktionen exportieren
window.showLegalModal = showLegalModal;
window.closeLegalModal = closeLegalModal;
window.showHelpModal = showHelpModal;
