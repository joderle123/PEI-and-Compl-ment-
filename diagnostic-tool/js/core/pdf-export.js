/**
 * PDF Export Module - Professionelle Berichterstellung
 */

const PDFExport = {
    colors: {
        primary: [0, 51, 102],      // #003366
        success: [26, 127, 55],     // #1a7f37
        warning: [154, 103, 0],     // #9a6700
        danger: [207, 34, 46],      // #cf222e
        text: [36, 41, 47],         // #24292f
        textLight: [87, 96, 106],   // #57606a
        gray: [208, 215, 222]       // #d0d7de
    },

    /**
     * Generiert einen vollständigen PDF-Bericht
     */
    async generateReport(options = {}) {
        const { jsPDF } = window.jspdf;

        if (!jsPDF) {
            alert('PDF-Bibliothek nicht geladen. Bitte laden Sie die Seite neu.');
            return;
        }

        const pdf = new jsPDF('p', 'mm', 'a4');
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const margin = 15;
        let yPos = margin;

        // Sammle verfügbare Testergebnisse
        const results = this.collectResults();

        if (Object.keys(results).length === 0) {
            alert('Keine Testergebnisse zum Exportieren vorhanden. Bitte werten Sie mindestens einen Test aus.');
            return;
        }

        // Titelseite
        yPos = this.addTitlePage(pdf, margin, pageWidth, pageHeight, results);

        // Inhaltsverzeichnis
        pdf.addPage();
        yPos = this.addTableOfContents(pdf, margin, pageWidth, results);

        // Einzelne Tests
        for (const [testKey, testData] of Object.entries(results)) {
            pdf.addPage();
            yPos = margin;

            switch (testKey) {
                case 'sdq':
                    yPos = this.addSDQSection(pdf, yPos, margin, pageWidth, testData);
                    break;
                case 'wisc':
                    yPos = this.addWISCSection(pdf, yPos, margin, pageWidth, testData);
                    break;
                case 'cbcl':
                    yPos = this.addCBCLSection(pdf, yPos, margin, pageWidth, testData);
                    break;
                case 'disyps':
                    yPos = this.addDISYPSSection(pdf, yPos, margin, pageWidth, testData);
                    break;
                case 'afs':
                    yPos = this.addAFSSection(pdf, yPos, margin, pageWidth, testData);
                    break;
                case 'd2r':
                    yPos = this.addD2RSection(pdf, yPos, margin, pageWidth, testData);
                    break;
            }
        }

        // Zusammenfassung
        if (options.includeRecommendations !== false) {
            pdf.addPage();
            this.addSummarySection(pdf, margin, pageWidth, results);
        }

        // Footer auf allen Seiten
        this.addFooters(pdf, margin, pageWidth, pageHeight);

        // Speichern
        const today = new Date().toISOString().split('T')[0];
        const caseName = CaseManager.currentCase
            ? `_${CaseManager.currentCase.lastname}_${CaseManager.currentCase.firstname}`
            : '';
        pdf.save(`Befundbericht${caseName}_${today}.pdf`);
    },

    /**
     * Sammelt alle verfügbaren Testergebnisse
     */
    collectResults() {
        const results = {};

        // SDQ
        const sdqResults = document.getElementById('sdq-results');
        if (sdqResults && sdqResults.style.display !== 'none') {
            results.sdq = typeof getSDQData === 'function' ? getSDQData() : null;
        }

        // WISC
        const wiscResults = document.getElementById('wisc-results');
        if (wiscResults && wiscResults.style.display !== 'none') {
            results.wisc = typeof getWISCData === 'function' ? getWISCData() : null;
        }

        // CBCL
        const cbclResults = document.getElementById('cbcl-results');
        if (cbclResults && cbclResults.style.display !== 'none') {
            results.cbcl = typeof getCBCLData === 'function' ? getCBCLData() : null;
        }

        // DISYPS
        const disypsResults = document.getElementById('disyps-results');
        if (disypsResults && disypsResults.style.display !== 'none') {
            results.disyps = typeof getDISYPSData === 'function' ? getDISYPSData() : null;
        }

        // AFS
        const afsResults = document.getElementById('afs-results');
        if (afsResults && afsResults.style.display !== 'none') {
            results.afs = typeof getAFSData === 'function' ? getAFSData() : null;
        }

        // d2-R
        const d2rResults = document.getElementById('d2r-results');
        if (d2rResults && d2rResults.style.display !== 'none') {
            results.d2r = typeof getD2RData === 'function' ? getD2RData() : null;
        }

        return results;
    },

    /**
     * Titelseite erstellen
     */
    addTitlePage(pdf, margin, pageWidth, pageHeight, results) {
        // Header-Balken
        pdf.setFillColor(...this.colors.primary);
        pdf.rect(0, 0, pageWidth, 60, 'F');

        // Logo/Titel
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(28);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Diagnostischer Befundbericht', pageWidth / 2, 30, { align: 'center' });

        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'normal');
        pdf.text('PsychoDiagnostik Pro', pageWidth / 2, 45, { align: 'center' });

        let yPos = 80;

        // Fallinformationen
        if (CaseManager.currentCase) {
            const c = CaseManager.currentCase;
            const age = CaseManager.calculateAge(c.dob);

            pdf.setTextColor(...this.colors.text);
            pdf.setFontSize(12);
            pdf.setFont('helvetica', 'bold');
            pdf.text('Klienteninformationen', margin, yPos);
            yPos += 10;

            pdf.setDrawColor(...this.colors.gray);
            pdf.line(margin, yPos, pageWidth - margin, yPos);
            yPos += 8;

            pdf.setFont('helvetica', 'normal');
            pdf.text(`Name: ${c.lastname}, ${c.firstname}`, margin, yPos);
            yPos += 7;
            pdf.text(`Geburtsdatum: ${new Date(c.dob).toLocaleDateString('de-DE')}`, margin, yPos);
            yPos += 7;
            pdf.text(`Alter: ${age.years} Jahre, ${age.months} Monate`, margin, yPos);
            yPos += 7;
            if (c.gender) {
                const genderText = { m: 'männlich', w: 'weiblich', d: 'divers' }[c.gender] || '';
                pdf.text(`Geschlecht: ${genderText}`, margin, yPos);
                yPos += 7;
            }
            pdf.text(`Fall-ID: ${c.id}`, margin, yPos);
            yPos += 15;
        }

        // Untersuchungsdatum
        pdf.setFont('helvetica', 'bold');
        pdf.text('Untersuchung', margin, yPos);
        yPos += 10;
        pdf.line(margin, yPos, pageWidth - margin, yPos);
        yPos += 8;

        pdf.setFont('helvetica', 'normal');
        pdf.text(`Datum: ${new Date().toLocaleDateString('de-DE')}`, margin, yPos);
        yPos += 7;
        pdf.text(`Durchgeführte Tests: ${Object.keys(results).length}`, margin, yPos);
        yPos += 15;

        // Testübersicht
        pdf.setFont('helvetica', 'bold');
        pdf.text('Durchgeführte Verfahren', margin, yPos);
        yPos += 10;
        pdf.line(margin, yPos, pageWidth - margin, yPos);
        yPos += 8;

        pdf.setFont('helvetica', 'normal');
        const testNames = {
            sdq: 'SDQ - Fragebogen zu Stärken und Schwächen',
            wisc: 'WISC-V - Wechsler Intelligenztest',
            cbcl: 'CBCL - Child Behavior Checklist',
            disyps: 'DISYPS-III - Diagnostik-System für psychische Störungen',
            afs: 'AFS - Angstfragebogen für Schüler',
            d2r: 'd2-R - Aufmerksamkeits- und Konzentrationstest'
        };

        Object.keys(results).forEach(key => {
            pdf.text(`• ${testNames[key] || key}`, margin + 5, yPos);
            yPos += 6;
        });

        // Disclaimer am unteren Rand
        pdf.setFontSize(9);
        pdf.setTextColor(...this.colors.textLight);
        pdf.text(
            'Dieser Bericht dient der fachlichen Dokumentation und ersetzt keine klinische Diagnose.',
            pageWidth / 2,
            pageHeight - 20,
            { align: 'center' }
        );

        return yPos;
    },

    /**
     * Inhaltsverzeichnis
     */
    addTableOfContents(pdf, margin, pageWidth, results) {
        let yPos = margin;

        pdf.setTextColor(...this.colors.primary);
        pdf.setFontSize(18);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Inhaltsverzeichnis', margin, yPos);
        yPos += 15;

        pdf.setDrawColor(...this.colors.primary);
        pdf.setLineWidth(0.5);
        pdf.line(margin, yPos, pageWidth - margin, yPos);
        yPos += 10;

        pdf.setTextColor(...this.colors.text);
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'normal');

        const testNames = {
            sdq: 'SDQ - Fragebogen zu Stärken und Schwächen',
            wisc: 'WISC-V - Intelligenzdiagnostik',
            cbcl: 'CBCL - Verhaltensdiagnostik',
            disyps: 'DISYPS-III - ADHS/SSV-Diagnostik',
            afs: 'AFS - Angstdiagnostik',
            d2r: 'd2-R - Aufmerksamkeitstest'
        };

        let pageNum = 3; // Titelseite + Inhaltsverzeichnis
        Object.keys(results).forEach(key => {
            pdf.text(`${testNames[key] || key}`, margin, yPos);
            pdf.text(`${pageNum}`, pageWidth - margin, yPos, { align: 'right' });
            yPos += 8;
            pageNum++;
        });

        yPos += 5;
        pdf.text('Zusammenfassung und Empfehlungen', margin, yPos);
        pdf.text(`${pageNum}`, pageWidth - margin, yPos, { align: 'right' });

        return yPos;
    },

    /**
     * SDQ-Sektion
     */
    addSDQSection(pdf, yPos, margin, pageWidth, data) {
        if (!data) return yPos;

        // Überschrift
        pdf.setFillColor(...this.colors.primary);
        pdf.rect(margin, yPos, pageWidth - 2 * margin, 10, 'F');
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.text('SDQ - Fragebogen zu Stärken und Schwächen', margin + 5, yPos + 7);
        yPos += 18;

        // Tabelle
        const scaleNames = {
            emotional: 'Emotionale Probleme',
            conduct: 'Verhaltensprobleme',
            hyperactivity: 'Hyperaktivität',
            peer: 'Probleme mit Gleichaltrigen',
            prosocial: 'Prosoziales Verhalten'
        };

        const classLabels = {
            normal: 'Unauffällig',
            borderline: 'Grenzwertig',
            clinical: 'Auffällig'
        };

        // Tabellenkopf
        pdf.setFillColor(240, 240, 240);
        pdf.rect(margin, yPos, pageWidth - 2 * margin, 8, 'F');
        pdf.setTextColor(...this.colors.text);
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Skala', margin + 3, yPos + 5.5);
        pdf.text('Wert', margin + 80, yPos + 5.5);
        pdf.text('Klassifikation', margin + 110, yPos + 5.5);
        yPos += 10;

        pdf.setFont('helvetica', 'normal');
        Object.entries(scaleNames).forEach(([key, name]) => {
            const value = data.values[key];
            const classification = data.classifications[key];

            pdf.setTextColor(...this.colors.text);
            pdf.text(name, margin + 3, yPos);
            pdf.text(`${value}/10`, margin + 80, yPos);

            // Klassifikation mit Farbe
            const color = classification === 'clinical' ? this.colors.danger :
                classification === 'borderline' ? this.colors.warning :
                    this.colors.success;
            pdf.setTextColor(...color);
            pdf.text(classLabels[classification], margin + 110, yPos);

            yPos += 7;
        });

        // Gesamtwert
        yPos += 5;
        pdf.setTextColor(...this.colors.text);
        pdf.setFont('helvetica', 'bold');
        pdf.text(`Gesamtproblemwert: ${data.total}`, margin, yPos);

        const totalClass = data.classifications.total;
        const totalColor = totalClass === 'clinical' ? this.colors.danger :
            totalClass === 'borderline' ? this.colors.warning :
                this.colors.success;
        pdf.setTextColor(...totalColor);
        pdf.text(` (${classLabels[totalClass]})`, margin + 50, yPos);

        return yPos + 15;
    },

    /**
     * WISC-Sektion
     */
    addWISCSection(pdf, yPos, margin, pageWidth, data) {
        if (!data) return yPos;

        // Überschrift
        pdf.setFillColor(...this.colors.primary);
        pdf.rect(margin, yPos, pageWidth - 2 * margin, 10, 'F');
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.text('WISC-V - Wechsler Intelligence Scale for Children', margin + 5, yPos + 7);
        yPos += 18;

        const indexNames = {
            fsiq: 'Gesamt-IQ (FSIQ)',
            vci: 'Sprachverständnis (SV)',
            vsi: 'Visuell-räumlich (VR)',
            fri: 'Fluides Schlussfolgern (FS)',
            wmi: 'Arbeitsgedächtnis (AG)',
            psi: 'Verarbeitungsgeschwindigkeit (VG)'
        };

        // Tabellenkopf
        pdf.setFillColor(240, 240, 240);
        pdf.rect(margin, yPos, pageWidth - 2 * margin, 8, 'F');
        pdf.setTextColor(...this.colors.text);
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Index', margin + 3, yPos + 5.5);
        pdf.text('Wert', margin + 75, yPos + 5.5);
        pdf.text('Perzentil', margin + 100, yPos + 5.5);
        pdf.text('Klassifikation', margin + 130, yPos + 5.5);
        yPos += 10;

        pdf.setFont('helvetica', 'normal');

        // Gesamt-IQ zuerst (hervorgehoben)
        if (data.values.fsiq) {
            pdf.setFillColor(230, 240, 250);
            pdf.rect(margin, yPos - 4, pageWidth - 2 * margin, 7, 'F');
            pdf.setFont('helvetica', 'bold');
            this.addWISCRow(pdf, margin, yPos, 'fsiq', data.values.fsiq, data.classifications.fsiq, indexNames);
            yPos += 8;
            pdf.setFont('helvetica', 'normal');
        }

        // Einzelne Indizes
        ['vci', 'vsi', 'fri', 'wmi', 'psi'].forEach(key => {
            if (data.values[key]) {
                this.addWISCRow(pdf, margin, yPos, key, data.values[key], data.classifications[key], indexNames);
                yPos += 7;
            }
        });

        return yPos + 10;
    },

    addWISCRow(pdf, margin, yPos, key, value, classification, indexNames) {
        const classLabels = {
            veryHigh: 'Weit überdurchschnittlich',
            high: 'Überdurchschnittlich',
            highAverage: 'Hoch durchschnittlich',
            average: 'Durchschnittlich',
            lowAverage: 'Niedrig durchschnittlich',
            borderline: 'Unterdurchschnittlich',
            veryLow: 'Weit unterdurchschnittlich'
        };

        const percentile = this.calculatePercentile(value);

        pdf.setTextColor(...this.colors.text);
        pdf.text(indexNames[key], margin + 3, yPos);
        pdf.text(`${value}`, margin + 75, yPos);
        pdf.text(`${percentile}`, margin + 100, yPos);
        pdf.text(classLabels[classification] || classification, margin + 130, yPos);
    },

    calculatePercentile(value) {
        const z = (value - 100) / 15;
        const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741, a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
        const sign = z < 0 ? -1 : 1;
        const absZ = Math.abs(z);
        const t = 1.0 / (1.0 + p * absZ);
        const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-absZ * absZ / 2);
        return Math.round((0.5 * (1.0 + sign * y)) * 100);
    },

    /**
     * CBCL-Sektion
     */
    addCBCLSection(pdf, yPos, margin, pageWidth, data) {
        if (!data) return yPos;

        pdf.setFillColor(...this.colors.primary);
        pdf.rect(margin, yPos, pageWidth - 2 * margin, 10, 'F');
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.text('CBCL - Child Behavior Checklist', margin + 5, yPos + 7);
        yPos += 18;

        pdf.setTextColor(...this.colors.text);
        pdf.setFontSize(10);
        pdf.text('T-Werte der Syndromskalen (M=50, SD=10)', margin, yPos);
        yPos += 10;

        // Hier würde die detaillierte CBCL-Tabelle folgen
        // Aus Platzgründen vereinfacht

        return yPos + 10;
    },

    /**
     * DISYPS-Sektion
     */
    addDISYPSSection(pdf, yPos, margin, pageWidth, data) {
        if (!data) return yPos;

        pdf.setFillColor(...this.colors.primary);
        pdf.rect(margin, yPos, pageWidth - 2 * margin, 10, 'F');
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.text('DISYPS-III - Diagnostik-System', margin + 5, yPos + 7);
        yPos += 18;

        return yPos + 10;
    },

    /**
     * AFS-Sektion
     */
    addAFSSection(pdf, yPos, margin, pageWidth, data) {
        if (!data) return yPos;

        pdf.setFillColor(...this.colors.primary);
        pdf.rect(margin, yPos, pageWidth - 2 * margin, 10, 'F');
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.text('AFS - Angstfragebogen für Schüler', margin + 5, yPos + 7);
        yPos += 18;

        return yPos + 10;
    },

    /**
     * d2-R-Sektion
     */
    addD2RSection(pdf, yPos, margin, pageWidth, data) {
        if (!data) return yPos;

        pdf.setFillColor(...this.colors.primary);
        pdf.rect(margin, yPos, pageWidth - 2 * margin, 10, 'F');
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.text('d2-R - Aufmerksamkeits- und Konzentrationstest', margin + 5, yPos + 7);
        yPos += 18;

        return yPos + 10;
    },

    /**
     * Zusammenfassungssektion
     */
    addSummarySection(pdf, margin, pageWidth, results) {
        let yPos = margin;

        pdf.setTextColor(...this.colors.primary);
        pdf.setFontSize(18);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Zusammenfassung und Empfehlungen', margin, yPos);
        yPos += 15;

        pdf.setDrawColor(...this.colors.primary);
        pdf.setLineWidth(0.5);
        pdf.line(margin, yPos, pageWidth - margin, yPos);
        yPos += 10;

        pdf.setTextColor(...this.colors.text);
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');

        pdf.text(
            'Die vorliegenden Testergebnisse sind als Screening-Ergebnisse zu verstehen und bedürfen',
            margin, yPos
        );
        yPos += 6;
        pdf.text(
            'einer klinischen Einordnung durch eine qualifizierte Fachperson.',
            margin, yPos
        );
        yPos += 15;

        pdf.setFont('helvetica', 'bold');
        pdf.text('Hinweis:', margin, yPos);
        yPos += 7;
        pdf.setFont('helvetica', 'normal');
        pdf.text(
            'Die automatisch generierten Interpretationen und Empfehlungen ersetzen keine',
            margin, yPos
        );
        yPos += 6;
        pdf.text(
            'klinische Diagnose oder Behandlungsempfehlung.',
            margin, yPos
        );

        return yPos;
    },

    /**
     * Footer auf allen Seiten
     */
    addFooters(pdf, margin, pageWidth, pageHeight) {
        const totalPages = pdf.internal.getNumberOfPages();

        for (let i = 1; i <= totalPages; i++) {
            pdf.setPage(i);
            pdf.setFontSize(8);
            pdf.setTextColor(...this.colors.textLight);

            // Fußzeile links
            pdf.text('PsychoDiagnostik Pro | Vertraulich', margin, pageHeight - 8);

            // Seitenzahl rechts
            pdf.text(`Seite ${i} von ${totalPages}`, pageWidth - margin, pageHeight - 8, { align: 'right' });
        }
    }
};

// Globale Funktion für den Export-Button
function generatePDFReport() {
    const includeCharts = document.getElementById('report-include-charts')?.checked ?? true;
    const includeRecommendations = document.getElementById('report-include-recommendations')?.checked ?? true;

    PDFExport.generateReport({
        includeCharts,
        includeRecommendations
    });
}

function previewReport() {
    // Öffnet eine Druckvorschau
    window.print();
}

window.PDFExport = PDFExport;
