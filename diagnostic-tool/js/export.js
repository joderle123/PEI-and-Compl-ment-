/**
 * Export-Modul
 * Erstellt PDF-Berichte aus den Testergebnissen
 */

/**
 * Exportiert die Ergebnisse als PDF
 */
async function exportToPDF() {
    const { jsPDF } = window.jspdf;

    // Prüfen ob Ergebnisse vorhanden sind
    const sdqResults = document.getElementById('sdq-results');
    const wiscResults = document.getElementById('wisc-results');
    const cbclResults = document.getElementById('cbcl-results');

    const hasSDQ = !sdqResults.classList.contains('hidden');
    const hasWISC = !wiscResults.classList.contains('hidden');
    const hasCBCL = !cbclResults.classList.contains('hidden');

    if (!hasSDQ && !hasWISC && !hasCBCL) {
        alert('Bitte werten Sie mindestens einen Test aus, bevor Sie einen PDF-Bericht erstellen.');
        return;
    }

    // PDF erstellen
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 15;
    let yPos = margin;

    // Farben definieren
    const colors = {
        primary: [37, 99, 235],
        success: [34, 197, 94],
        warning: [245, 158, 11],
        danger: [239, 68, 68],
        text: [30, 41, 59],
        textLight: [100, 116, 139]
    };

    // Header
    pdf.setFillColor(...colors.primary);
    pdf.rect(0, 0, pageWidth, 35, 'F');

    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Diagnostischer Bericht', margin, 18);

    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Interpretation von Testergebnissen für Jugendliche', margin, 27);

    // Datum
    const today = new Date().toLocaleDateString('de-DE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    pdf.setFontSize(10);
    pdf.text(`Erstellt am: ${today}`, pageWidth - margin - 50, 27);

    yPos = 45;

    // SDQ-Ergebnisse
    if (hasSDQ) {
        yPos = addSDQSection(pdf, yPos, margin, pageWidth, colors);
    }

    // WISC-Ergebnisse
    if (hasWISC) {
        // Neue Seite wenn nötig
        if (yPos > pageHeight - 80) {
            pdf.addPage();
            yPos = margin;
        }
        yPos = addWISCSection(pdf, yPos, margin, pageWidth, colors);
    }

    // CBCL-Ergebnisse
    if (hasCBCL) {
        // Neue Seite wenn nötig
        if (yPos > pageHeight - 80) {
            pdf.addPage();
            yPos = margin;
        }
        yPos = addCBCLSection(pdf, yPos, margin, pageWidth, colors);
    }

    // Footer auf jeder Seite
    const totalPages = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.setTextColor(...colors.textLight);
        pdf.text(
            'Hinweis: Dieses Tool dient als Unterstützung. Die endgültige Interpretation sollte durch qualifizierte Fachpersonen erfolgen.',
            margin,
            pageHeight - 10
        );
        pdf.text(`Seite ${i} von ${totalPages}`, pageWidth - margin - 20, pageHeight - 10);
    }

    // PDF speichern
    pdf.save(`Diagnostischer_Bericht_${today.replace(/\s/g, '_')}.pdf`);
}

/**
 * Fügt SDQ-Sektion zum PDF hinzu
 */
function addSDQSection(pdf, yPos, margin, pageWidth, colors) {
    const data = getSDQData();

    // Überschrift
    pdf.setFillColor(...colors.primary);
    pdf.setDrawColor(...colors.primary);
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.roundedRect(margin, yPos, pageWidth - 2 * margin, 10, 2, 2, 'F');
    pdf.text('SDQ - Strengths and Difficulties Questionnaire', margin + 5, yPos + 7);
    yPos += 15;

    // Beurteiler
    const respondentLabels = {
        parent: 'Elternbeurteilung',
        teacher: 'Lehrerbeurteilung',
        self: 'Selbstbeurteilung'
    };
    pdf.setTextColor(...colors.text);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Beurteiler: ${respondentLabels[data.respondent]}`, margin, yPos);
    yPos += 8;

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

    // Tabellen-Header
    pdf.setFillColor(240, 240, 240);
    pdf.rect(margin, yPos, pageWidth - 2 * margin, 8, 'F');
    pdf.setFont('helvetica', 'bold');
    pdf.text('Skala', margin + 3, yPos + 5);
    pdf.text('Wert', margin + 80, yPos + 5);
    pdf.text('Klassifikation', margin + 110, yPos + 5);
    yPos += 10;

    pdf.setFont('helvetica', 'normal');
    for (const [key, name] of Object.entries(scaleNames)) {
        const value = data.values[key];
        const classification = data.classifications[key];

        // Hintergrundfarbe basierend auf Klassifikation
        if (classification === 'clinical') {
            pdf.setFillColor(254, 242, 242);
        } else if (classification === 'borderline') {
            pdf.setFillColor(255, 251, 235);
        } else {
            pdf.setFillColor(255, 255, 255);
        }
        pdf.rect(margin, yPos - 4, pageWidth - 2 * margin, 7, 'F');

        pdf.setTextColor(...colors.text);
        pdf.text(name, margin + 3, yPos);
        pdf.text(`${value}/10`, margin + 80, yPos);

        // Klassifikation mit Farbe
        if (classification === 'clinical') {
            pdf.setTextColor(...colors.danger);
        } else if (classification === 'borderline') {
            pdf.setTextColor(...colors.warning);
        } else {
            pdf.setTextColor(...colors.success);
        }
        pdf.text(classLabels[classification], margin + 110, yPos);

        yPos += 7;
    }

    // Gesamtwert
    yPos += 3;
    pdf.setTextColor(...colors.text);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`Gesamtproblemwert: ${data.total}`, margin, yPos);
    pdf.setFont('helvetica', 'normal');

    const totalClass = data.classifications.total;
    if (totalClass === 'clinical') {
        pdf.setTextColor(...colors.danger);
    } else if (totalClass === 'borderline') {
        pdf.setTextColor(...colors.warning);
    } else {
        pdf.setTextColor(...colors.success);
    }
    pdf.text(` (${classLabels[totalClass]})`, margin + 50, yPos);

    return yPos + 15;
}

/**
 * Fügt WISC-Sektion zum PDF hinzu
 */
function addWISCSection(pdf, yPos, margin, pageWidth, colors) {
    const data = getWISCData();

    // Überschrift
    pdf.setFillColor(...colors.primary);
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.roundedRect(margin, yPos, pageWidth - 2 * margin, 10, 2, 2, 'F');
    pdf.text('WISC-V - Wechsler Intelligence Scale for Children', margin + 5, yPos + 7);
    yPos += 15;

    const indexNames = {
        vci: 'Sprachverständnis (VCI)',
        vsi: 'Visuell-räumlich (VSI)',
        fri: 'Fluides Schlussfolgern (FRI)',
        wmi: 'Arbeitsgedächtnis (WMI)',
        psi: 'Verarbeitungsgeschwindigkeit (PSI)',
        fsiq: 'Gesamt-IQ (FSIQ)'
    };

    const classLabels = {
        veryHigh: 'Weit überdurchschnittlich',
        high: 'Überdurchschnittlich',
        highAverage: 'Hoch durchschnittlich',
        average: 'Durchschnittlich',
        lowAverage: 'Niedrig durchschnittlich',
        borderline: 'Unterdurchschnittlich',
        veryLow: 'Weit unterdurchschnittlich'
    };

    // Tabellen-Header
    pdf.setTextColor(...colors.text);
    pdf.setFillColor(240, 240, 240);
    pdf.rect(margin, yPos, pageWidth - 2 * margin, 8, 'F');
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(10);
    pdf.text('Index', margin + 3, yPos + 5);
    pdf.text('Wert', margin + 70, yPos + 5);
    pdf.text('Perzentil', margin + 90, yPos + 5);
    pdf.text('Klassifikation', margin + 115, yPos + 5);
    yPos += 10;

    pdf.setFont('helvetica', 'normal');

    // Gesamt-IQ zuerst
    if (data.values.fsiq !== null) {
        const value = data.values.fsiq;
        const classification = data.classifications.fsiq;
        const percentile = calculatePercentile(value);

        pdf.setFillColor(239, 246, 255);
        pdf.rect(margin, yPos - 4, pageWidth - 2 * margin, 7, 'F');

        pdf.setTextColor(...colors.text);
        pdf.setFont('helvetica', 'bold');
        pdf.text(indexNames.fsiq, margin + 3, yPos);
        pdf.setFont('helvetica', 'normal');
        pdf.text(`${value}`, margin + 70, yPos);
        pdf.text(`${percentile}`, margin + 90, yPos);
        pdf.text(classLabels[classification], margin + 115, yPos);
        yPos += 8;
    }

    // Einzelne Indizes
    const indices = ['vci', 'vsi', 'fri', 'wmi', 'psi'];
    for (const key of indices) {
        if (data.values[key] === null) continue;

        const value = data.values[key];
        const classification = data.classifications[key];
        const percentile = calculatePercentile(value);

        pdf.setTextColor(...colors.text);
        pdf.text(indexNames[key], margin + 3, yPos);
        pdf.text(`${value}`, margin + 70, yPos);
        pdf.text(`${percentile}`, margin + 90, yPos);
        pdf.text(classLabels[classification], margin + 115, yPos);
        yPos += 7;
    }

    return yPos + 10;
}

/**
 * Fügt CBCL-Sektion zum PDF hinzu
 */
function addCBCLSection(pdf, yPos, margin, pageWidth, colors) {
    const data = getCBCLData();

    // Überschrift
    pdf.setFillColor(...colors.primary);
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.roundedRect(margin, yPos, pageWidth - 2 * margin, 10, 2, 2, 'F');
    pdf.text('CBCL - Child Behavior Checklist', margin + 5, yPos + 7);
    yPos += 15;

    const scaleNames = {
        anxious: 'Ängstlich/Depressiv',
        withdrawn: 'Rückzug/Depression',
        somatic: 'Körperliche Beschwerden',
        social: 'Soziale Probleme',
        thought: 'Schizoid/Zwanghaft',
        attention: 'Aufmerksamkeitsprobleme',
        rulebreak: 'Dissoziales Verhalten',
        aggressive: 'Aggressives Verhalten',
        internal: 'Internalisierende Störungen',
        external: 'Externalisierende Störungen',
        total: 'Gesamtwert'
    };

    const classLabels = {
        normal: 'Unauffällig',
        borderline: 'Grenzwertig',
        clinical: 'Klinisch auffällig'
    };

    // Übergeordnete Skalen
    const broadband = ['internal', 'external', 'total'];
    const hasBroadband = broadband.some(k => data.values[k] !== null);

    if (hasBroadband) {
        pdf.setTextColor(...colors.text);
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(11);
        pdf.text('Übergeordnete Skalen', margin, yPos);
        yPos += 6;

        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');

        for (const key of broadband) {
            if (data.values[key] === null) continue;

            const value = data.values[key];
            const classification = data.classifications[key];

            if (classification === 'clinical') {
                pdf.setFillColor(254, 242, 242);
            } else if (classification === 'borderline') {
                pdf.setFillColor(255, 251, 235);
            } else {
                pdf.setFillColor(240, 253, 244);
            }
            pdf.rect(margin, yPos - 4, pageWidth - 2 * margin, 7, 'F');

            pdf.setTextColor(...colors.text);
            pdf.text(scaleNames[key], margin + 3, yPos);
            pdf.text(`T=${value}`, margin + 70, yPos);

            if (classification === 'clinical') {
                pdf.setTextColor(...colors.danger);
            } else if (classification === 'borderline') {
                pdf.setTextColor(...colors.warning);
            } else {
                pdf.setTextColor(...colors.success);
            }
            pdf.text(classLabels[classification], margin + 100, yPos);

            yPos += 7;
        }
        yPos += 5;
    }

    // Syndromskalen
    const syndromes = ['anxious', 'withdrawn', 'somatic', 'social', 'thought', 'attention', 'rulebreak', 'aggressive'];
    const hasSyndromes = syndromes.some(k => data.values[k] !== null);

    if (hasSyndromes) {
        pdf.setTextColor(...colors.text);
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(11);
        pdf.text('Syndromskalen', margin, yPos);
        yPos += 6;

        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'normal');

        for (const key of syndromes) {
            if (data.values[key] === null) continue;

            const value = data.values[key];
            const classification = data.classifications[key];

            pdf.setTextColor(...colors.text);
            pdf.text(scaleNames[key], margin + 3, yPos);
            pdf.text(`T=${value}`, margin + 60, yPos);

            if (classification === 'clinical') {
                pdf.setTextColor(...colors.danger);
            } else if (classification === 'borderline') {
                pdf.setTextColor(...colors.warning);
            } else {
                pdf.setTextColor(...colors.success);
            }
            pdf.text(classLabels[classification], margin + 85, yPos);

            yPos += 6;
        }
    }

    return yPos + 10;
}

/**
 * Hilfsfunktion zur Perzentilberechnung (gleich wie in wisc.js)
 */
function calculatePercentile(value) {
    const z = (value - 100) / 15;
    const a1 = 0.254829592;
    const a2 = -0.284496736;
    const a3 = 1.421413741;
    const a4 = -1.453152027;
    const a5 = 1.061405429;
    const p = 0.3275911;

    const sign = z < 0 ? -1 : 1;
    const absZ = Math.abs(z);
    const t = 1.0 / (1.0 + p * absZ);
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-absZ * absZ / 2);

    const percentile = (0.5 * (1.0 + sign * y)) * 100;
    return Math.round(percentile);
}
