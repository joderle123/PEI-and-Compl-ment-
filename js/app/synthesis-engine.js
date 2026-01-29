/**
 * SYNTHESE-ENGINE
 *
 * Das klinische Gehirn der App:
 * - Verknüpft alle Eingaben (Anamnese, ELDiB, Screening, Verhaltensanalyse)
 * - Generiert Hypothesen mit Konfidenzwerten
 * - Erstellt die "Bedienungsanleitung" für das Kind
 *
 * Wissenschaftliche Grundlage:
 * - Bio-Psycho-Soziales Modell
 * - Differenzialdiagnostisches Denken
 * - Evidenzbasierte Interventionen
 */

const SynthesisEngine = {

    // ============================================
    // HAUPT-SYNTHESE-FUNKTION
    // ============================================

    /**
     * Führt alle Daten zusammen und generiert die Bedienungsanleitung
     * @param {Object} data - Alle gesammelten Daten
     * @returns {Object} - Vollständige Synthese inkl. Bedienungsanleitung
     */
    synthesize(data) {
        const result = {
            kind: this.createKindProfil(data),
            entwicklung: this.analyzeELDiB(data.eldib),
            hypothesen: this.generateHypothesen(data),
            beduerfnisse: this.identifyBeduerfnisse(data),
            interventionen: this.generateInterventionen(data),
            lernziele: this.generateLernziele(data),
            warnsignale: this.identifyWarnsignale(data),
            empfehlungen: this.generateEmpfehlungen(data),
            timestamp: new Date().toISOString()
        };

        return result;
    },

    // ============================================
    // KIND-PROFIL
    // ============================================

    createKindProfil(data) {
        const stammdaten = data.stammdaten || {};
        const ressourcen = data.screening?.ressourcen || {};
        const symptome = data.screening?.aktuelleSymptome || {};

        return {
            name: stammdaten.name || 'Unbekannt',
            alter: stammdaten.alter,
            klasse: stammdaten.klasse,
            bezugspersonen: stammdaten.bezugspersonen || [],

            // Kernstärken aus Ressourcen-Screening
            staerken: this.extractStaerken(ressourcen),

            // Hauptherausforderungen
            herausforderungen: this.extractHerausforderungen(symptome, data.eldib),

            // Kurzbeschreibung
            zusammenfassung: this.generateKurzprofil(data)
        };
    },

    extractStaerken(ressourcen) {
        const staerken = [];
        const kindRessourcen = ressourcen.kind_ressourcen || [];

        const staerkenMap = {
            'intelligent': 'Überdurchschnittliche Intelligenz',
            'sozial_kompetent': 'Sozial kompetent (wenn nicht unter Stress)',
            'humor': 'Guter Humor',
            'kreativ': 'Kreativität/künstlerische Begabung',
            'sportlich': 'Sportlich/motorisch stark',
            'hilfsbereit': 'Hilfsbereit und fürsorglich',
            'durchhaltevermoegen': 'Durchhaltevermögen bei Interessen',
            'problemloesen': 'Gute Problemlösefähigkeiten'
        };

        kindRessourcen.forEach(key => {
            if (staerkenMap[key]) {
                staerken.push(staerkenMap[key]);
            }
        });

        return staerken;
    },

    extractHerausforderungen(symptome, eldib) {
        const herausforderungen = [];

        // Aus Hauptproblem
        const hauptproblemMap = {
            'verhalten_extern': 'Externalisierendes Verhalten (Aggression, Wut, Verweigerung)',
            'verhalten_intern': 'Internalisierendes Verhalten (Rückzug, Ängste, Traurigkeit)',
            'aufmerksamkeit': 'Aufmerksamkeits- und Konzentrationsprobleme',
            'sozial': 'Schwierigkeiten in sozialen Beziehungen',
            'lernen': 'Schulische Lernprobleme',
            'entwicklung': 'Allgemeine Entwicklungsverzögerung'
        };

        if (symptome.hauptproblem && hauptproblemMap[symptome.hauptproblem]) {
            herausforderungen.push(hauptproblemMap[symptome.hauptproblem]);
        }

        // Aus ELDiB: Bereiche unter erwartetem Niveau
        if (eldib) {
            const bereiche = ['verhalten', 'kommunikation', 'sozialisation', 'kognition'];
            bereiche.forEach(bereich => {
                if (eldib[bereich]?.stufe < 3) {
                    const bereichNamen = {
                        verhalten: 'Verhaltensregulation',
                        kommunikation: 'Kommunikation',
                        sozialisation: 'Soziale Entwicklung',
                        kognition: 'Kognitive Entwicklung'
                    };
                    herausforderungen.push(`Entwicklungsbedarf im Bereich ${bereichNamen[bereich]}`);
                }
            });
        }

        return herausforderungen;
    },

    generateKurzprofil(data) {
        const name = data.stammdaten?.name || 'Das Kind';
        const alter = data.stammdaten?.alter;
        const hauptproblem = data.screening?.aktuelleSymptome?.hauptproblem;

        let text = `${name}`;
        if (alter) text += ` (${alter} Jahre)`;

        if (hauptproblem) {
            const problemTexte = {
                'verhalten_extern': 'zeigt herausforderndes Verhalten',
                'verhalten_intern': 'zeigt internalisierendes Verhalten',
                'aufmerksamkeit': 'hat Aufmerksamkeitsschwierigkeiten',
                'sozial': 'hat soziale Schwierigkeiten',
                'lernen': 'hat schulische Schwierigkeiten',
                'entwicklung': 'zeigt Entwicklungsverzögerungen'
            };
            text += ` ${problemTexte[hauptproblem] || ''}`;
        }

        return text;
    },

    // ============================================
    // ELDiB-ANALYSE
    // ============================================

    analyzeELDiB(eldib) {
        if (!eldib) return null;

        const bereiche = {
            V: { name: 'Verhalten', code: 'V', stufe: eldib.verhalten?.stufe || 0, items: eldib.verhalten?.items || [] },
            K: { name: 'Kommunikation', code: 'K', stufe: eldib.kommunikation?.stufe || 0, items: eldib.kommunikation?.items || [] },
            SOZ: { name: 'Sozialisation', code: 'SOZ', stufe: eldib.sozialisation?.stufe || 0, items: eldib.sozialisation?.items || [] },
            KOG: { name: 'Kognition', code: 'KOG', stufe: eldib.kognition?.stufe || 0, items: eldib.kognition?.items || [] }
        };

        // Durchschnittsstufe
        const stufen = Object.values(bereiche).map(b => b.stufe);
        const durchschnitt = stufen.reduce((a, b) => a + b, 0) / stufen.length;

        // Profil-Interpretation
        const interpretation = this.interpretELDiBProfile(bereiche);

        // Ungleichmäßigkeit (große Unterschiede zwischen Bereichen)
        const maxStufe = Math.max(...stufen);
        const minStufe = Math.min(...stufen);
        const ungleichmaessig = (maxStufe - minStufe) >= 2;

        return {
            bereiche,
            durchschnitt: Math.round(durchschnitt * 10) / 10,
            interpretation,
            ungleichmaessig,
            staerksterBereich: Object.values(bereiche).sort((a, b) => b.stufe - a.stufe)[0],
            schwachsterBereich: Object.values(bereiche).sort((a, b) => a.stufe - b.stufe)[0]
        };
    },

    interpretELDiBProfile(bereiche) {
        const texte = [];

        // Verhaltensbereich
        if (bereiche.V.stufe <= 2) {
            texte.push('Die Verhaltensregulation ist noch auf einem frühen Entwicklungsstand. Das Kind braucht externe Strukturierung und Co-Regulation.');
        } else if (bereiche.V.stufe >= 4) {
            texte.push('Das Kind kann sein Verhalten weitgehend selbst steuern.');
        }

        // Kommunikation
        if (bereiche.K.stufe <= 2) {
            texte.push('Die kommunikativen Fähigkeiten sind noch eingeschränkt. Nonverbale und einfache verbale Kommunikation nutzen.');
        }

        // Sozialisation
        if (bereiche.SOZ.stufe <= 2) {
            texte.push('Soziale Interaktionen sind noch auf dem Niveau von Parallelspiel. Strukturierte Peer-Kontakte mit Erwachsenenbegleitung.');
        }

        // Ungleichmäßiges Profil
        const stufen = Object.values(bereiche).map(b => b.stufe);
        if (Math.max(...stufen) - Math.min(...stufen) >= 2) {
            texte.push('Das Entwicklungsprofil ist ungleichmäßig. Dies kann auf spezifische Schwierigkeiten oder besondere Stärken hinweisen.');
        }

        return texte;
    },

    // ============================================
    // HYPOTHESEN-GENERIERUNG
    // ============================================

    generateHypothesen(data) {
        const hypothesen = [];
        const screening = data.screening || {};
        const anamnese = data.anamnese || {};
        const eldib = data.eldib || {};

        // ADHS-Hypothese
        const adhs = this.checkADHS(screening, anamnese);
        if (adhs.score > 0) hypothesen.push(adhs);

        // Angst-Hypothese
        const angst = this.checkAngst(screening, anamnese);
        if (angst.score > 0) hypothesen.push(angst);

        // Depression-Hypothese
        const depression = this.checkDepression(screening, anamnese);
        if (depression.score > 0) hypothesen.push(depression);

        // ODD-Hypothese (Oppositionelle Störung)
        const odd = this.checkODD(screening, anamnese);
        if (odd.score > 0) hypothesen.push(odd);

        // Trauma-Hypothese
        const trauma = this.checkTrauma(screening, anamnese);
        if (trauma.score > 0) hypothesen.push(trauma);

        // Autismus-Spektrum-Hypothese
        const asd = this.checkASD(screening, anamnese);
        if (asd.score > 0) hypothesen.push(asd);

        // Bindungsproblematik
        const bindung = this.checkBindung(screening, anamnese);
        if (bindung.score > 0) hypothesen.push(bindung);

        // Sortieren nach Konfidenz
        hypothesen.sort((a, b) => b.konfidenz - a.konfidenz);

        return hypothesen;
    },

    checkADHS(screening, anamnese) {
        let score = 0;
        let evidenz = [];
        let gegenEvidenz = [];

        const aufmerksamkeit = screening.aufmerksamkeit || {};

        // Unaufmerksamkeit
        const unaufmerksamCount = (aufmerksamkeit.unaufmerksam || []).length;
        if (unaufmerksamCount >= 6) {
            score += 3;
            evidenz.push(`${unaufmerksamCount}/8 Unaufmerksamkeits-Symptome`);
        } else if (unaufmerksamCount >= 4) {
            score += 2;
            evidenz.push(`${unaufmerksamCount}/8 Unaufmerksamkeits-Symptome (grenzwertig)`);
        }

        // Hyperaktivität
        const hyperaktivCount = (aufmerksamkeit.hyperaktiv || []).length;
        if (hyperaktivCount >= 4) {
            score += 2;
            evidenz.push(`${hyperaktivCount}/6 Hyperaktivitäts-Symptome`);
        }

        // Impulsivität
        const impulsivCount = (aufmerksamkeit.impulsiv || []).length;
        if (impulsivCount >= 3) {
            score += 2;
            evidenz.push(`${impulsivCount}/4 Impulsivitäts-Symptome`);
        }

        // Zusatzkriterien
        const zusatz = aufmerksamkeit.adhs_zusatz || [];
        if (zusatz.includes('vor_12')) {
            score += 1;
            evidenz.push('Symptome vor dem 12. Lebensjahr');
        }
        if (zusatz.includes('mehrere_settings')) {
            score += 1;
            evidenz.push('Symptome in mehreren Lebensbereichen');
        }
        if (zusatz.includes('familie_adhs')) {
            score += 1;
            evidenz.push('ADHS in der Familie bekannt');
        }

        // Gegen-Evidenz
        const symptomBeginn = screening.aktuelleSymptome?.symptom_beginn;
        if (symptomBeginn === 'kuerzlich' || symptomBeginn === 'ereignis') {
            score -= 2;
            gegenEvidenz.push('Symptome erst kürzlich aufgetreten');
        }

        // Konfidenz berechnen (0-100%)
        const maxScore = 12;
        const konfidenz = Math.min(100, Math.max(0, Math.round((score / maxScore) * 100)));

        return {
            id: 'adhs',
            name: 'ADHS (Aufmerksamkeitsdefizit-Hyperaktivitätsstörung)',
            score,
            konfidenz,
            evidenz,
            gegenEvidenz,
            empfehlung: konfidenz >= 50 ? 'Fachärztliche Abklärung empfohlen' : 'Weitere Beobachtung',
            dringlichkeit: konfidenz >= 70 ? 'bald' : 'geplant'
        };
    },

    checkAngst(screening, anamnese) {
        let score = 0;
        let evidenz = [];
        let gegenEvidenz = [];

        const emotionen = screening.emotionen || {};

        // Angstsymptome
        const angstSymptome = emotionen.angst_symptome || [];
        if (angstSymptome.length >= 2) {
            score += 3;
            evidenz.push(`${angstSymptome.length} Angstsymptome vorhanden`);
        }

        // Körperliche Symptome
        const koerperAngst = emotionen.koerper_angst || [];
        if (koerperAngst.length >= 3) {
            score += 2;
            evidenz.push('Körperliche Angstsymptome (somatisch)');
        }

        // Spezifische Angstformen
        const subtypen = [];
        if (angstSymptome.includes('trennungsangst')) {
            subtypen.push('Trennungsangst');
        }
        if (angstSymptome.includes('soziale_angst')) {
            subtypen.push('Soziale Angst');
        }
        if (angstSymptome.includes('schulverweigerung')) {
            score += 2;
            subtypen.push('Schulvermeidung');
        }

        // Familiäre Angst
        const famPsych = anamnese.familiaere_psychiatrie || [];
        if (famPsych.includes('fam_angst')) {
            score += 1;
            evidenz.push('Angststörung in der Familie');
        }

        // Konfidenz
        const maxScore = 8;
        const konfidenz = Math.min(100, Math.max(0, Math.round((score / maxScore) * 100)));

        return {
            id: 'angst',
            name: 'Angststörung',
            subtypen,
            score,
            konfidenz,
            evidenz,
            gegenEvidenz,
            empfehlung: konfidenz >= 50 ? 'Kinder- und Jugendlichenpsychotherapie empfohlen' : 'Pädagogische Unterstützung',
            dringlichkeit: angstSymptome.includes('schulverweigerung') ? 'dringend' : 'geplant'
        };
    },

    checkDepression(screening, anamnese) {
        let score = 0;
        let evidenz = [];
        let gegenEvidenz = [];
        let alert = false;

        const emotionen = screening.emotionen || {};
        const deprSymptome = emotionen.depression_symptome || [];

        // Kernsymptome
        if (deprSymptome.includes('traurig')) {
            score += 2;
            evidenz.push('Anhaltende Traurigkeit');
        }
        if (deprSymptome.includes('interessenverlust')) {
            score += 2;
            evidenz.push('Interessenverlust');
        }
        if (deprSymptome.includes('reizbar')) {
            score += 2;
            evidenz.push('Anhaltende Reizbarkeit');
        }

        // Weitere Symptome
        const weitereSymptome = deprSymptome.filter(s =>
            !['traurig', 'interessenverlust', 'reizbar', 'suizid'].includes(s)
        );
        score += Math.min(3, weitereSymptome.length);
        if (weitereSymptome.length > 0) {
            evidenz.push(`${weitereSymptome.length} weitere depressive Symptome`);
        }

        // ALERT: Suizidalität
        if (deprSymptome.includes('suizid')) {
            score += 5;
            alert = true;
            evidenz.push('⚠️ Gedanken an Tod/Suizid');
        }

        const maxScore = 12;
        const konfidenz = Math.min(100, Math.max(0, Math.round((score / maxScore) * 100)));

        return {
            id: 'depression',
            name: 'Depression',
            score,
            konfidenz,
            evidenz,
            gegenEvidenz,
            alert,
            empfehlung: alert ? '⚠️ SOFORTIGE fachärztliche/psychologische Vorstellung' :
                        konfidenz >= 50 ? 'Fachärztliche/psychotherapeutische Abklärung empfohlen' : 'Beobachtung',
            dringlichkeit: alert ? 'sofort' : (konfidenz >= 50 ? 'dringend' : 'geplant')
        };
    },

    checkODD(screening, anamnese) {
        let score = 0;
        let evidenz = [];
        let gegenEvidenz = [];

        const verhalten = screening.verhalten || {};

        // Oppositionelle Symptome
        const opposition = verhalten.opposition || [];
        if (opposition.length >= 4) {
            score += 3;
            evidenz.push(`${opposition.length}/8 oppositionelle Verhaltensweisen`);
        } else if (opposition.length >= 2) {
            score += 1;
            evidenz.push(`${opposition.length}/8 oppositionelle Verhaltensweisen (grenzwertig)`);
        }

        // Aggression
        const aggression = verhalten.aggression || [];
        if (aggression.length >= 2) {
            score += 2;
            evidenz.push('Aggressives Verhalten');
        }

        // Erziehungsstil als Faktor
        const erziehung = anamnese.erziehungsstil || [];
        if (erziehung.includes('inkonsequent')) {
            score += 1;
            evidenz.push('Inkonsistente Erziehung');
        }
        if (erziehung.includes('warmherzig') && erziehung.includes('konsequent')) {
            gegenEvidenz.push('Positive Erziehung vorhanden');
        }

        const maxScore = 7;
        const konfidenz = Math.min(100, Math.max(0, Math.round((score / maxScore) * 100)));

        return {
            id: 'odd',
            name: 'Oppositionelle Verhaltensstörung',
            score,
            konfidenz,
            evidenz,
            gegenEvidenz,
            empfehlung: konfidenz >= 50 ? 'Elterntraining (Triple P, THOP) empfohlen' : 'Pädagogische Strategien',
            dringlichkeit: 'geplant'
        };
    },

    checkTrauma(screening, anamnese) {
        let score = 0;
        let evidenz = [];
        let gegenEvidenz = [];
        let alert = false;

        const trauma = screening.trauma || {};

        // ACEs (Adverse Childhood Experiences)
        const aces = trauma.adverse_events || [];
        if (aces.length >= 3) {
            score += 3;
            evidenz.push(`${aces.length} belastende Lebensereignisse`);
        } else if (aces.length >= 1) {
            score += 1;
            evidenz.push(`${aces.length} belastendes Lebensereignis`);
        }

        // Schwere ACEs
        const schwereACEs = ['misshandlung', 'sexueller_missbrauch', 'vernachlaessigung'];
        const hatSchwereACEs = aces.filter(a => schwereACEs.includes(a));
        if (hatSchwereACEs.length > 0) {
            score += 3;
            alert = true;
            evidenz.push('⚠️ Schwere Belastungserfahrung');
        }

        // Trauma-Symptome
        const traumaSymptome = trauma.trauma_symptome || [];
        if (traumaSymptome.length >= 2) {
            score += 2;
            evidenz.push(`${traumaSymptome.length} Trauma-Symptome`);
        }

        // Desorganisierte Bindung
        if (trauma.bindung === 'desorganisiert') {
            score += 2;
            evidenz.push('Desorganisiertes Bindungsmuster');
        }

        const maxScore = 10;
        const konfidenz = Math.min(100, Math.max(0, Math.round((score / maxScore) * 100)));

        return {
            id: 'trauma',
            name: 'Trauma-/Belastungsstörung',
            score,
            konfidenz,
            evidenz,
            gegenEvidenz,
            alert,
            empfehlung: alert ? '⚠️ Traumatherapie und ggf. Jugendamt erforderlich' :
                        konfidenz >= 50 ? 'Traumasensible Pädagogik, ggf. Traumatherapie' : 'Stabilisierung',
            dringlichkeit: alert ? 'sofort' : (konfidenz >= 50 ? 'dringend' : 'geplant')
        };
    },

    checkASD(screening, anamnese) {
        let score = 0;
        let evidenz = [];
        let gegenEvidenz = [];

        const soziales = screening.soziales || {};

        // ASD-Marker
        const asdMarker = soziales.asd_marker || [];
        if (asdMarker.length >= 3) {
            score += 3;
            evidenz.push(`${asdMarker.length} Autismus-Spektrum-Marker`);
        } else if (asdMarker.length >= 1) {
            score += 1;
        }

        // Soziale Interaktion
        const sozInteraktion = soziales.soziale_interaktion || [];
        if (sozInteraktion.includes('kein_interesse')) {
            score += 2;
            evidenz.push('Wenig Interesse an anderen');
        }
        if (sozInteraktion.includes('kein_blickkontakt')) {
            score += 1;
            evidenz.push('Auffälliger Blickkontakt');
        }

        // Entwicklung
        const entwicklung = anamnese.meilensteine || [];
        if (entwicklung.includes('sprache_regression')) {
            score += 2;
            evidenz.push('Sprachentwicklungsregression');
        }

        // Familiäre Belastung
        const famPsych = anamnese.familiaere_psychiatrie || [];
        if (famPsych.includes('fam_autismus')) {
            score += 1;
            evidenz.push('Autismus in der Familie');
        }

        // Gegen-Evidenz
        if (sozInteraktion.includes('will_aber_kann_nicht')) {
            gegenEvidenz.push('Soziales Interesse vorhanden (kann aber nicht)');
        }

        const maxScore = 9;
        const konfidenz = Math.min(100, Math.max(0, Math.round((score / maxScore) * 100)));

        return {
            id: 'asd',
            name: 'Autismus-Spektrum-Störung',
            score,
            konfidenz,
            evidenz,
            gegenEvidenz,
            empfehlung: konfidenz >= 40 ? 'Autismus-Diagnostik in Spezialambulanz empfohlen' : 'Weitere Beobachtung',
            dringlichkeit: 'geplant'
        };
    },

    checkBindung(screening, anamnese) {
        let score = 0;
        let evidenz = [];
        let gegenEvidenz = [];

        const trauma = screening.trauma || {};
        const familie = screening.familie || {};

        // Bindungsmuster
        const bindung = trauma.bindung;
        if (bindung === 'desorganisiert') {
            score += 3;
            evidenz.push('Desorganisiertes Bindungsmuster');
        } else if (bindung === 'unterschiedslos') {
            score += 3;
            evidenz.push('Unterschiedsloses Bindungsverhalten');
        } else if (bindung === 'vermeidend' || bindung === 'ambivalent') {
            score += 1;
            evidenz.push(`Unsicher-${bindung}es Bindungsmuster`);
        } else if (bindung === 'sicher') {
            gegenEvidenz.push('Sichere Bindung vorhanden');
        }

        // Familienstruktur
        const famStruktur = familie.familienstruktur;
        if (['heim', 'wechselnd', 'pflegefamilie'].includes(famStruktur)) {
            score += 2;
            evidenz.push('Wechselnde/instabile Betreuungssituation');
        }

        // Frühe Trennungen
        const aces = trauma.adverse_events || [];
        if (aces.includes('trennung_ploetzlich')) {
            score += 1;
            evidenz.push('Frühe Trennungserfahrung');
        }

        const maxScore = 6;
        const konfidenz = Math.min(100, Math.max(0, Math.round((score / maxScore) * 100)));

        return {
            id: 'bindung',
            name: 'Bindungsproblematik',
            score,
            konfidenz,
            evidenz,
            gegenEvidenz,
            empfehlung: konfidenz >= 50 ? 'Bindungsbasierte Beratung/Therapie' : 'Beziehungsaufbau fokussieren',
            dringlichkeit: 'geplant'
        };
    },

    // ============================================
    // BEDÜRFNIS-ANALYSE
    // ============================================

    identifyBeduerfnisse(data) {
        const beduerfnisse = [];
        const hypothesen = this.generateHypothesen(data);
        const eldib = data.eldib || {};

        // Grundbedürfnis: Sichere Beziehung
        beduerfnisse.push({
            beduerfnis: 'Sichere Beziehung',
            icon: '🤝',
            wichtigkeit: 'kritisch',
            begruendung: 'Grundlage jeder pädagogischen Arbeit',
            umsetzung: [
                'Feste Bezugsperson in der Schule',
                'Tägliche positive 1:1-Zeit (2-5 Minuten)',
                'Beziehung vor Erziehung',
                'Konstanz und Verlässlichkeit'
            ]
        });

        // Struktur & Vorhersehbarkeit
        if (hypothesen.some(h => ['adhs', 'angst', 'trauma', 'bindung'].includes(h.id) && h.konfidenz > 30)) {
            beduerfnisse.push({
                beduerfnis: 'Struktur & Vorhersehbarkeit',
                icon: '📋',
                wichtigkeit: 'hoch',
                begruendung: 'Reduziert Unsicherheit und Überforderung',
                umsetzung: [
                    'Klare Tagesstruktur mit visualisiertem Ablauf',
                    'Übergänge ankündigen',
                    'Regeln klar und positiv formuliert',
                    'Keine Überraschungen, alles vorhersehbar'
                ]
            });
        }

        // Erfolgserleben
        beduerfnisse.push({
            beduerfnis: 'Erfolgserleben',
            icon: '🌟',
            wichtigkeit: 'hoch',
            begruendung: 'Stärkt Selbstwirksamkeit und Motivation',
            umsetzung: [
                'Aufgaben an Entwicklungsstand anpassen',
                'Kleine Schritte, häufiges Feedback',
                'Stärken nutzen und sichtbar machen',
                'Fehler als Lernchance rahmen'
            ]
        });

        // Bewegung (bei ADHS oder V-Bereich niedrig)
        if (hypothesen.some(h => h.id === 'adhs' && h.konfidenz > 30) ||
            (eldib.verhalten?.stufe && eldib.verhalten.stufe <= 2)) {
            beduerfnisse.push({
                beduerfnis: 'Bewegung & Sensorik',
                icon: '🏃',
                wichtigkeit: 'hoch',
                begruendung: 'Bewegungsbedürfnis ist physiologisch, nicht böser Wille',
                umsetzung: [
                    'Regelmäßige Bewegungspausen (alle 15-20 Min.)',
                    'Bewegung in Aufgaben integrieren',
                    'Wackelkissen/Stehpult erlauben',
                    'Botengang-Aufgaben'
                ]
            });
        }

        // Emotionale Unterstützung (bei internalisierenden Problemen)
        if (hypothesen.some(h => ['angst', 'depression', 'trauma'].includes(h.id) && h.konfidenz > 30)) {
            beduerfnisse.push({
                beduerfnis: 'Emotionale Unterstützung',
                icon: '💚',
                wichtigkeit: 'hoch',
                begruendung: 'Kind braucht Co-Regulation und Verständnis',
                umsetzung: [
                    'Gefühle validieren ("Ich sehe, dass du...")',
                    'Nicht bagatellisieren oder rationalisieren',
                    'Rückzugsmöglichkeit anbieten',
                    'Regulationsstrategien gemeinsam üben'
                ]
            });
        }

        return beduerfnisse;
    },

    // ============================================
    // INTERVENTIONEN
    // ============================================

    generateInterventionen(data) {
        const interventionen = {
            situationen: [],
            allgemein: []
        };

        const hypothesen = this.generateHypothesen(data);
        const eldib = data.eldib || {};

        // Situations-Rezepte basierend auf Hypothesen
        hypothesen.forEach(hypothese => {
            if (hypothese.konfidenz < 30) return;

            const situationenMap = {
                adhs: [
                    {
                        situation: 'Kind kann nicht stillsitzen',
                        tuDas: ['Bewegungspause anbieten', 'Wackelkissen erlauben', 'Steharbeitsplatz ermöglichen'],
                        vermeide: ['Ermahnen ohne Alternative', 'Stillsitzen erzwingen', 'Vor der Klasse bloßstellen']
                    },
                    {
                        situation: 'Kind beendet Aufgaben nicht',
                        tuDas: ['Aufgabe in kleine Schritte teilen', 'Timer nutzen', 'Teilziele feiern'],
                        vermeide: ['Lange Aufgaben ohne Struktur', 'Kritik ohne Hilfestellung', 'Vergleich mit anderen']
                    }
                ],
                angst: [
                    {
                        situation: 'Kind verweigert Aufgabe aus Angst',
                        tuDas: ['Angst validieren', 'Kleine erste Schritte anbieten', 'Erfolg vorhersehbar machen'],
                        vermeide: ['Angst bagatellisieren', 'Vermeidung unterstützen', 'Druck aufbauen']
                    },
                    {
                        situation: 'Kind klammert oder weint',
                        tuDas: ['Ruhig bleiben, Nähe anbieten', 'Validieren: "Das ist schwer"', 'Kleine Mutschritte loben'],
                        vermeide: ['Wegschieben', 'Ungeduldig werden', 'Vor anderen beschämen']
                    }
                ],
                odd: [
                    {
                        situation: 'Kind verweigert Anweisung',
                        tuDas: ['Wahlmöglichkeit geben', 'Ruhig und bestimmt bleiben', 'Positive Konsequenz bei Kooperation'],
                        vermeide: ['Machtkampf', 'Laut werden', 'Leere Drohungen']
                    },
                    {
                        situation: 'Kind wird wütend',
                        tuDas: ['Ruhe bewahren', 'Raum geben', 'Später besprechen (nicht im Affekt)'],
                        vermeide: ['Gegenaggression', 'Publikum', 'Sofortige Konsequenz erzwingen']
                    }
                ],
                trauma: [
                    {
                        situation: 'Kind wirkt "weggetreten" oder starr',
                        tuDas: ['Ruhig ansprechen', 'Orientierung geben ("Du bist hier, es ist sicher")', 'Nicht anfassen ohne Vorwarnung'],
                        vermeide: ['Erschrecken', 'Schnelle Bewegungen', 'Forderungen stellen']
                    },
                    {
                        situation: 'Kind reagiert übermäßig auf Trigger',
                        tuDas: ['Sicherheit vermitteln', 'Trigger wenn möglich vermeiden', 'Grounding-Techniken anbieten'],
                        vermeide: ['Trigger konfrontieren', 'Fragen "Warum reagierst du so?"', 'Vor anderen thematisieren']
                    }
                ]
            };

            if (situationenMap[hypothese.id]) {
                interventionen.situationen.push(...situationenMap[hypothese.id]);
            }
        });

        // Allgemeine Interventionen basierend auf ELDiB-Stufe
        const vStufe = eldib.verhalten?.stufe || 2;

        if (vStufe <= 2) {
            interventionen.allgemein.push({
                kategorie: 'Verhaltensregulation (Stufe I-II)',
                massnahmen: [
                    'Externe Strukturierung durch Erwachsenen',
                    'Klare, einfache Anweisungen (1 Schritt)',
                    'Sofortige positive Verstärkung',
                    'Visuelle Hilfen (Bilder, Symbole)',
                    'Co-Regulation bei Emotionen'
                ]
            });
        } else if (vStufe <= 3) {
            interventionen.allgemein.push({
                kategorie: 'Verhaltensregulation (Stufe III)',
                massnahmen: [
                    'Regeln erklären und begründen',
                    'Gruppenbasierte Verstärkung einführen',
                    'Selbstbeobachtung anbahnen',
                    'Wahlmöglichkeiten anbieten'
                ]
            });
        }

        return interventionen;
    },

    // ============================================
    // LERNZIELE
    // ============================================

    generateLernziele(data) {
        const lernziele = [];
        const eldib = data.eldib || {};
        const hypothesen = this.generateHypothesen(data);

        // ELDiB-basierte Lernziele
        const bereiche = ['verhalten', 'kommunikation', 'sozialisation', 'kognition'];

        bereiche.forEach(bereich => {
            const bereichData = eldib[bereich];
            if (!bereichData) return;

            const stufe = bereichData.stufe || 1;
            const items = bereichData.items || [];

            // Finde Items, die noch nicht erreicht sind
            const nichtErreichteItems = items.filter(item =>
                item.status === 'nicht_erreicht' || item.status === 'in_arbeit'
            );

            // Wähle 1-2 passende Lernziele pro Bereich
            nichtErreichteItems.slice(0, 2).forEach(item => {
                if (item.zielformulierungen && item.zielformulierungen.length > 0) {
                    lernziele.push({
                        code: item.code,
                        bereich: bereich,
                        stufe: stufe,
                        ziel: item.zielformulierungen[0],
                        massnahme: this.getMassnahmeForItem(item, hypothesen)
                    });
                }
            });
        });

        return lernziele.slice(0, 5); // Max 5 Lernziele
    },

    getMassnahmeForItem(item, hypothesen) {
        // Basis-Maßnahmen basierend auf Item-Typ
        const massnahmen = {
            'V-10': 'Timer nutzen, Wartezeit schrittweise steigern',
            'V-11': 'Bewegungspausen, Wackelkissen, kurze Sitzphasen',
            'V-14': 'Sachliches Feedback statt emotionales Lob',
            'V-18': 'Sozialgeschichten, Rollenspiele',
            'K-16': 'Gefühlskarten, tägliche Gefühlsrunde',
            'SOZ-15': 'Strukturierte Partnersituation mit wohlwollendem Kind'
        };

        return massnahmen[item.code] || 'Individuell anpassen';
    },

    // ============================================
    // WARNSIGNALE
    // ============================================

    identifyWarnsignale(data) {
        const hypothesen = this.generateHypothesen(data);
        const screening = data.screening || {};

        const warnsignale = {
            guterTag: [],
            vorsicht: [],
            eskalation: [],
            notfall: []
        };

        // Guter Tag (grün)
        warnsignale.guterTag = [
            'Kind ist ansprechbar und kooperativ',
            'Beteiligt sich an Aktivitäten',
            'Kann sich selbst regulieren',
            'Positive Interaktionen mit anderen'
        ];

        // Vorsicht (gelb) - basierend auf Hypothesen
        if (hypothesen.some(h => h.id === 'adhs')) {
            warnsignale.vorsicht.push('Erhöhte motorische Unruhe');
            warnsignale.vorsicht.push('Kürzere Konzentrationsphasen als üblich');
        }
        if (hypothesen.some(h => ['angst', 'depression'].includes(h.id))) {
            warnsignale.vorsicht.push('Rückzug, weniger Beteiligung');
            warnsignale.vorsicht.push('Körperliche Beschwerden (Bauch, Kopf)');
        }
        if (hypothesen.some(h => ['odd', 'aggression'].includes(h.id))) {
            warnsignale.vorsicht.push('Kürzere Zündschnur, leicht reizbar');
            warnsignale.vorsicht.push('Beginnt zu diskutieren/verweigern');
        }

        // Eskalation (rot)
        warnsignale.eskalation = [
            'Physische Anspannung (Fäuste, Körperhaltung)',
            'Verbale Aggression, Beschimpfungen',
            'Kontrollverlust, schreit, weint intensiv',
            'Ignoriert alle Ansprache'
        ];

        // Notfall-Handlungsplan
        warnsignale.notfallPlan = [
            'Ruhe bewahren, Stimme senken',
            'Andere Kinder in Sicherheit bringen',
            'Raum geben, nicht bedrängen',
            'Nicht argumentieren im Affekt',
            'Wenn nötig: Hilfe holen',
            'NACH Beruhigung: kurz besprechen, Neustart ermöglichen'
        ];

        return warnsignale;
    },

    // ============================================
    // EMPFEHLUNGEN
    // ============================================

    generateEmpfehlungen(data) {
        const empfehlungen = {
            sofort: [],
            mittelfristig: [],
            abklaerung: [],
            kooperation: []
        };

        const hypothesen = this.generateHypothesen(data);

        // Sofort-Empfehlungen (immer)
        empfehlungen.sofort = [
            'Positive Beziehung als Basis aufbauen',
            'Tagesstruktur visualisieren',
            'Kleine Erfolge ermöglichen und feiern'
        ];

        // Basierend auf Hypothesen
        hypothesen.forEach(h => {
            if (h.dringlichkeit === 'sofort') {
                empfehlungen.abklaerung.unshift({
                    text: h.empfehlung,
                    dringlichkeit: 'SOFORT',
                    grund: h.name
                });
            } else if (h.dringlichkeit === 'dringend') {
                empfehlungen.abklaerung.push({
                    text: h.empfehlung,
                    dringlichkeit: 'Innerhalb 2-4 Wochen',
                    grund: h.name
                });
            } else if (h.konfidenz >= 40) {
                empfehlungen.abklaerung.push({
                    text: h.empfehlung,
                    dringlichkeit: 'Bei Gelegenheit',
                    grund: h.name
                });
            }
        });

        // Kooperationspartner
        empfehlungen.kooperation = [
            { partner: 'Eltern', aufgabe: 'Regelmäßiger Austausch, gemeinsame Linie' },
            { partner: 'Schulleitung', aufgabe: 'Ressourcen, Nachteilsausgleich' }
        ];

        if (hypothesen.some(h => h.konfidenz >= 50 && ['adhs', 'asd', 'depression'].includes(h.id))) {
            empfehlungen.kooperation.push({ partner: 'Kinder- und Jugendpsychiater', aufgabe: 'Diagnostik, ggf. Medikation' });
        }
        if (hypothesen.some(h => h.konfidenz >= 50 && ['angst', 'depression', 'trauma'].includes(h.id))) {
            empfehlungen.kooperation.push({ partner: 'Kinder- und Jugendlichenpsychotherapeut', aufgabe: 'Therapie' });
        }

        return empfehlungen;
    }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SynthesisEngine };
}
window.SynthesisEngine = SynthesisEngine;
