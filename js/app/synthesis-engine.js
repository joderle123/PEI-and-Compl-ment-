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

        // ELDiB-Analyse für tiefere Einsichten
        const eldibAnalyse = this.analyzeELDiB(data.eldib);

        return {
            name: stammdaten.name || 'Unbekannt',
            alter: stammdaten.alter,
            klasse: stammdaten.klasse,
            bezugspersonen: stammdaten.bezugspersonen || [],

            // Kernstärken aus Ressourcen-Screening + ELDiB
            staerken: this.extractStaerken(ressourcen, eldibAnalyse),

            // Hauptherausforderungen + ELDiB-Defizite
            herausforderungen: this.extractHerausforderungen(symptome, data.eldib, eldibAnalyse),

            // Kurzbeschreibung
            zusammenfassung: this.generateKurzprofil(data),

            // NEU: ELDiB-basierte Detailinformationen
            eldibProfil: eldibAnalyse ? {
                durchschnittsstufe: eldibAnalyse.durchschnitt,
                staerksterBereich: eldibAnalyse.staerksterBereich?.name,
                schwachsterBereich: eldibAnalyse.schwachsterBereich?.name,
                ressourcenAnzahl: eldibAnalyse.ressourcen?.length || 0,
                defiziteAnzahl: eldibAnalyse.defizite?.length || 0,
                inArbeitAnzahl: eldibAnalyse.inArbeit?.length || 0
            } : null
        };
    },

    extractStaerken(ressourcen, eldibAnalyse = null) {
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

        // NEU: ELDiB-basierte Ressourcen hinzufügen
        if (eldibAnalyse?.ressourcen) {
            // Gruppiere erreichte Items nach Bereich
            const bereicheReached = {};
            eldibAnalyse.ressourcen.forEach(r => {
                bereicheReached[r.bereich] = (bereicheReached[r.bereich] || 0) + 1;
            });

            // Wenn viele Items in einem Bereich erreicht -> Stärke
            if (bereicheReached.kommunikation >= 3) {
                staerken.push('Gute kommunikative Fähigkeiten (ELDiB)');
            }
            if (bereicheReached.sozialisation >= 3) {
                staerken.push('Soziale Grundkompetenzen vorhanden (ELDiB)');
            }
            if (bereicheReached.kognition >= 3) {
                staerken.push('Altersgemäße kognitive Entwicklung (ELDiB)');
            }
            if (bereicheReached.verhalten >= 3) {
                staerken.push('Verhaltensregulation entwickelt (ELDiB)');
            }

            // Spezifische hochwertige Ressourcen hervorheben
            const hervorragendeItems = ['V-21', 'V-26', 'K-16', 'K-21', 'SOZ-18', 'SOZ-37'];
            eldibAnalyse.ressourcen.forEach(r => {
                if (hervorragendeItems.includes(r.code)) {
                    staerken.push(`${r.bedeutung} (${r.code})`);
                }
            });
        }

        // Duplikate entfernen
        return [...new Set(staerken)];
    },

    extractHerausforderungen(symptome, eldib, eldibAnalyse = null) {
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

        // NEU: Spezifische Defizite aus ELDiB-Itemanalyse
        if (eldibAnalyse?.defizite?.length > 0) {
            // Klinisch relevante Defizite hervorheben
            const klinischRelevant = eldibAnalyse.klinischeMarker || [];
            const kritischeItems = klinischRelevant.filter(m => m.gewicht >= 2);

            kritischeItems.slice(0, 3).forEach(item => {
                herausforderungen.push(`${item.bedeutung} noch nicht entwickelt (${item.code})`);
            });
        }

        // Duplikate entfernen
        return [...new Set(herausforderungen)];
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
    // ELDiB-ANALYSE (Erweitert mit Item-Analyse)
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

        // NEU: Item-basierte Ressourcen und Defizite extrahieren
        const itemAnalysis = this.analyzeELDiBItems(eldib);

        return {
            bereiche,
            durchschnitt: Math.round(durchschnitt * 10) / 10,
            interpretation,
            ungleichmaessig,
            staerksterBereich: Object.values(bereiche).sort((a, b) => b.stufe - a.stufe)[0],
            schwachsterBereich: Object.values(bereiche).sort((a, b) => a.stufe - b.stufe)[0],
            // NEU: Item-basierte Analyse
            ressourcen: itemAnalysis.ressourcen,
            defizite: itemAnalysis.defizite,
            inArbeit: itemAnalysis.inArbeit,
            klinischeMarker: itemAnalysis.klinischeMarker
        };
    },

    /**
     * NEU: Analysiert einzelne ELDiB-Items und extrahiert Ressourcen/Defizite
     * Dies ist entscheidend für die Hypothesen-Stärkung
     */
    analyzeELDiBItems(eldib) {
        const ressourcen = [];
        const defizite = [];
        const inArbeit = [];
        const klinischeMarker = [];

        // Klinisch relevante Items mit Mapping zu Hypothesen
        const klinischeItems = {
            // ADHS-relevante Items
            'V-10': { bereich: 'adhs', bedeutung: 'Warten - Impulskontrolle', gewicht: 2 },
            'V-11': { bereich: 'adhs', bedeutung: 'Stillsitzen - motorische Kontrolle', gewicht: 2 },
            'V-15': { bereich: 'adhs', bedeutung: 'Aufgaben beenden - Durchhaltevermögen', gewicht: 1 },
            'KOG-2': { bereich: 'adhs', bedeutung: 'Aufmerksamkeit aufrechterhalten', gewicht: 2 },
            'KOG-24': { bereich: 'adhs', bedeutung: 'Wechselnde Anweisungen', gewicht: 1 },

            // Emotionsregulation / Depression / Angst
            'K-16': { bereich: 'emotionsregulation', bedeutung: 'Gefühle benennen', gewicht: 2 },
            'K-21': { bereich: 'emotionsregulation', bedeutung: 'Gefühle anderer erkennen', gewicht: 1 },
            'K-26': { bereich: 'emotionsregulation', bedeutung: 'Eigene Gefühle ausdrücken', gewicht: 2 },
            'V-14': { bereich: 'emotionsregulation', bedeutung: 'Lob/Erfolg akzeptieren', gewicht: 1 },

            // Soziale Schwierigkeiten / ASD
            'SOZ-15': { bereich: 'sozial', bedeutung: 'Sozialen Kontakt aufnehmen', gewicht: 2 },
            'SOZ-17': { bereich: 'sozial', bedeutung: 'Interaktives Spiel', gewicht: 2 },
            'SOZ-18': { bereich: 'sozial', bedeutung: 'Kooperation', gewicht: 1 },
            'K-14': { bereich: 'sozial', bedeutung: 'Austausch mit Gleichaltrigen', gewicht: 2 },
            'K-7': { bereich: 'sozial', bedeutung: 'Kommunikation mit Peers', gewicht: 1 },

            // Oppositionelles Verhalten
            'V-16': { bereich: 'odd', bedeutung: 'Erwartungen kennen', gewicht: 1 },
            'V-17': { bereich: 'odd', bedeutung: 'Regeln begründen können', gewicht: 1 },
            'V-18': { bereich: 'odd', bedeutung: 'Alternativen beschreiben', gewicht: 2 },
            'V-20': { bereich: 'odd', bedeutung: 'Sich zurückhalten bei anderen', gewicht: 1 },
            'V-21': { bereich: 'odd', bedeutung: 'Selbstkontrolle in Gruppe', gewicht: 2 },
            'V-26': { bereich: 'odd', bedeutung: 'Auf Provokation reagieren', gewicht: 2 },

            // Bindung
            'SOZ-12': { bereich: 'bindung', bedeutung: 'Kontakt zu Erwachsenen suchen', gewicht: 2 },
            'SOZ-1': { bereich: 'bindung', bedeutung: 'Gegenwart anderer wahrnehmen', gewicht: 1 },
            'SOZ-8': { bereich: 'bindung', bedeutung: 'Kommunikation mit Erwachsenen', gewicht: 1 },

            // Trauma
            'V-23': { bereich: 'trauma', bedeutung: 'Flexibilität bei Änderungen', gewicht: 2 },
            'V-24': { bereich: 'trauma', bedeutung: 'Neue Erfahrungen', gewicht: 1 },
            'K-23': { bereich: 'trauma', bedeutung: 'Kreativität - Gefühle kanalisieren', gewicht: 1 }
        };

        // Durch alle Bereiche iterieren
        const bereiche = ['verhalten', 'kommunikation', 'sozialisation', 'kognition'];

        bereiche.forEach(bereich => {
            const bereichData = eldib[bereich];
            if (!bereichData?.items) return;

            bereichData.items.forEach(item => {
                const itemCode = item.code;
                const status = item.status;
                const itemInfo = klinischeItems[itemCode];

                // Item kategorisieren
                if (status === 'erreicht') {
                    ressourcen.push({
                        code: itemCode,
                        keyword: item.keyword || this.getItemKeyword(itemCode),
                        bereich: bereich,
                        bedeutung: itemInfo?.bedeutung || item.keyword
                    });
                } else if (status === 'nicht_erreicht') {
                    defizite.push({
                        code: itemCode,
                        keyword: item.keyword || this.getItemKeyword(itemCode),
                        bereich: bereich,
                        bedeutung: itemInfo?.bedeutung || item.keyword
                    });

                    // Klinischen Marker hinzufügen wenn relevant
                    if (itemInfo) {
                        klinischeMarker.push({
                            code: itemCode,
                            hypothese: itemInfo.bereich,
                            bedeutung: itemInfo.bedeutung,
                            gewicht: itemInfo.gewicht,
                            typ: 'defizit'
                        });
                    }
                } else if (status === 'in_arbeit') {
                    inArbeit.push({
                        code: itemCode,
                        keyword: item.keyword || this.getItemKeyword(itemCode),
                        bereich: bereich,
                        bedeutung: itemInfo?.bedeutung || item.keyword
                    });
                }
            });
        });

        return { ressourcen, defizite, inArbeit, klinischeMarker };
    },

    /**
     * Holt das Keyword für ein Item aus ELDIB_DATA
     */
    getItemKeyword(code) {
        if (typeof ELDIB_DATA === 'undefined') return code;

        const bereichMap = {
            'V': 'verhalten',
            'K': 'kommunikation',
            'SOZ': 'sozialisation',
            'KOG': 'kognition'
        };

        const prefix = code.split('-')[0];
        const bereich = bereichMap[prefix];

        if (!bereich || !ELDIB_DATA[bereich]) return code;

        // Durch alle Stufen suchen
        for (const stufe of Object.values(ELDIB_DATA[bereich].stufen)) {
            const item = stufe.items?.find(i => i.code === code);
            if (item) return item.keyword;
        }

        return code;
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
    // HYPOTHESEN-GENERIERUNG (Erweitert mit ELDiB-Integration)
    // ============================================

    generateHypothesen(data) {
        const hypothesen = [];
        const screening = data.screening || {};
        const anamnese = data.anamnese || {};
        const eldib = data.eldib || {};

        // NEU: ELDiB-Analyse für klinische Marker
        const eldibAnalyse = this.analyzeELDiB(eldib);
        const klinischeMarker = eldibAnalyse?.klinischeMarker || [];

        // ADHS-Hypothese (mit ELDiB)
        const adhs = this.checkADHS(screening, anamnese, klinischeMarker);
        if (adhs.score > 0) hypothesen.push(adhs);

        // Angst-Hypothese (mit ELDiB)
        const angst = this.checkAngst(screening, anamnese, klinischeMarker);
        if (angst.score > 0) hypothesen.push(angst);

        // Depression-Hypothese (mit ELDiB)
        const depression = this.checkDepression(screening, anamnese, klinischeMarker);
        if (depression.score > 0) hypothesen.push(depression);

        // ODD-Hypothese (mit ELDiB)
        const odd = this.checkODD(screening, anamnese, klinischeMarker);
        if (odd.score > 0) hypothesen.push(odd);

        // Trauma-Hypothese (mit ELDiB)
        const trauma = this.checkTrauma(screening, anamnese, klinischeMarker);
        if (trauma.score > 0) hypothesen.push(trauma);

        // Autismus-Spektrum-Hypothese (mit ELDiB)
        const asd = this.checkASD(screening, anamnese, klinischeMarker);
        if (asd.score > 0) hypothesen.push(asd);

        // Bindungsproblematik (mit ELDiB)
        const bindung = this.checkBindung(screening, anamnese, klinischeMarker);
        if (bindung.score > 0) hypothesen.push(bindung);

        // NEU: Emotionsregulation-Hypothese (aus ELDiB)
        const emotionsreg = this.checkEmotionsregulation(screening, anamnese, klinischeMarker, eldib);
        if (emotionsreg.score > 0) hypothesen.push(emotionsreg);

        // Sortieren nach Konfidenz
        hypothesen.sort((a, b) => b.konfidenz - a.konfidenz);

        return hypothesen;
    },

    /**
     * NEU: Holt ELDiB-Evidenz für eine bestimmte Hypothese
     */
    getELDiBEvidenz(klinischeMarker, hypotheseId) {
        const relevant = klinischeMarker.filter(m => m.hypothese === hypotheseId);
        let score = 0;
        const evidenz = [];

        relevant.forEach(marker => {
            score += marker.gewicht;
            evidenz.push(`ELDiB ${marker.code}: ${marker.bedeutung} nicht erreicht`);
        });

        return { score, evidenz };
    },

    checkADHS(screening, anamnese, klinischeMarker = []) {
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

        // NEU: ELDiB-Integration für ADHS
        const eldibEvidenz = this.getELDiBEvidenz(klinischeMarker, 'adhs');
        if (eldibEvidenz.score > 0) {
            score += eldibEvidenz.score;
            evidenz.push(...eldibEvidenz.evidenz);
        }

        // Gegen-Evidenz
        const symptomBeginn = screening.aktuelleSymptome?.symptom_beginn;
        if (symptomBeginn === 'kuerzlich' || symptomBeginn === 'ereignis') {
            score -= 2;
            gegenEvidenz.push('Symptome erst kürzlich aufgetreten');
        }

        // Konfidenz berechnen (0-100%) - Angepasst für erweiterten maxScore
        const maxScore = 16; // Erhöht wegen ELDiB-Items
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

    checkAngst(screening, anamnese, klinischeMarker = []) {
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

        // NEU: ELDiB-relevante Evidenz (Emotionsregulation zeigt auch Angst-Indikatoren)
        const emotionEvidenz = this.getELDiBEvidenz(klinischeMarker, 'emotionsregulation');
        if (emotionEvidenz.score > 0) {
            score += Math.ceil(emotionEvidenz.score / 2); // Halbes Gewicht
            evidenz.push('ELDiB: Defizite bei Gefühlsverarbeitung');
        }

        // Konfidenz
        const maxScore = 10;
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

    checkDepression(screening, anamnese, klinischeMarker = []) {
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

        // NEU: ELDiB-Evidenz für Emotionsregulation
        const emotionEvidenz = this.getELDiBEvidenz(klinischeMarker, 'emotionsregulation');
        if (emotionEvidenz.score > 0) {
            score += Math.ceil(emotionEvidenz.score / 2);
            evidenz.push('ELDiB: Eingeschränkte emotionale Ausdrucksfähigkeit');
        }

        const maxScore = 14;
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

    checkODD(screening, anamnese, klinischeMarker = []) {
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

        // NEU: ELDiB-Integration für ODD
        const eldibEvidenz = this.getELDiBEvidenz(klinischeMarker, 'odd');
        if (eldibEvidenz.score > 0) {
            score += eldibEvidenz.score;
            evidenz.push(...eldibEvidenz.evidenz);
        }

        const maxScore = 12; // Erhöht wegen ELDiB-Items
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

    checkTrauma(screening, anamnese, klinischeMarker = []) {
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

        // NEU: ELDiB-Evidenz für Trauma
        const traumaEvidenz = this.getELDiBEvidenz(klinischeMarker, 'trauma');
        if (traumaEvidenz.score > 0) {
            score += traumaEvidenz.score;
            evidenz.push(...traumaEvidenz.evidenz);
        }

        const maxScore = 13;
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

    checkASD(screening, anamnese, klinischeMarker = []) {
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

        // NEU: ELDiB-Evidenz für soziale Schwierigkeiten
        const sozialEvidenz = this.getELDiBEvidenz(klinischeMarker, 'sozial');
        if (sozialEvidenz.score > 0) {
            score += sozialEvidenz.score;
            evidenz.push(...sozialEvidenz.evidenz);
        }

        // Gegen-Evidenz
        if (sozInteraktion.includes('will_aber_kann_nicht')) {
            gegenEvidenz.push('Soziales Interesse vorhanden (kann aber nicht)');
        }

        const maxScore = 13;
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

    checkBindung(screening, anamnese, klinischeMarker = []) {
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

        // NEU: ELDiB-Evidenz für Bindung
        const bindungEvidenz = this.getELDiBEvidenz(klinischeMarker, 'bindung');
        if (bindungEvidenz.score > 0) {
            score += bindungEvidenz.score;
            evidenz.push(...bindungEvidenz.evidenz);
        }

        const maxScore = 10;
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

    /**
     * NEU: Emotionsregulation-Check basierend auf ELDiB und Screening
     */
    checkEmotionsregulation(screening, anamnese, klinischeMarker = [], eldib = {}) {
        let score = 0;
        let evidenz = [];
        let gegenEvidenz = [];

        // ELDiB-basierte Evidenz (Hauptquelle)
        const emotionEvidenz = this.getELDiBEvidenz(klinischeMarker, 'emotionsregulation');
        if (emotionEvidenz.score > 0) {
            score += emotionEvidenz.score;
            evidenz.push(...emotionEvidenz.evidenz);
        }

        // V-Bereich Stufe als Indikator
        const vStufe = eldib?.verhalten?.stufe || 3;
        if (vStufe <= 2) {
            score += 2;
            evidenz.push(`ELDiB Verhalten auf Stufe ${vStufe} (entwicklungsverzögert)`);
        }

        // Screening-Daten ergänzen
        const emotionen = screening.emotionen || {};
        const wutausbrueche = emotionen.wutausbrueche || [];
        if (wutausbrueche.length >= 2) {
            score += 2;
            evidenz.push('Häufige Wutausbrüche/Stimmungsschwankungen');
        }

        // Ressourcen aus ELDiB als Gegen-Evidenz
        if (vStufe >= 4) {
            gegenEvidenz.push('ELDiB: Gute Verhaltensregulation (Stufe IV+)');
        }

        const maxScore = 10;
        const konfidenz = Math.min(100, Math.max(0, Math.round((score / maxScore) * 100)));

        return {
            id: 'emotionsregulation',
            name: 'Emotionsregulationsstörung',
            score,
            konfidenz,
            evidenz,
            gegenEvidenz,
            empfehlung: konfidenz >= 50 ? 'Emotionsregulationstraining, ggf. Therapie' : 'Co-Regulation und Modelllernen',
            dringlichkeit: konfidenz >= 70 ? 'dringend' : 'geplant'
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
            allgemein: [],
            ichZiele: [],
            explorationsFragen: []
        };

        const hypothesen = this.generateHypothesen(data);
        const eldib = data.eldib || {};
        const hauptproblem = data.screening?.aktuelleSymptome?.hauptproblem;

        // Situations-Rezepte aus ADVISORY_DATA integrieren
        if (typeof ADVISORY_DATA !== 'undefined') {
            // Mapping von Hypothesen/Problemen zu Advisory-Modulen
            const problematikMapping = {
                'verhalten_extern': ['oppositionell', 'aggression'],
                'verhalten_intern': ['rueckzug', 'emotionsregulation'],
                'aufmerksamkeit': ['aufmerksamkeit'],
                'sozial': ['sozial', 'rueckzug'],
                'odd': ['oppositionell'],
                'adhs': ['aufmerksamkeit'],
                'angst': ['rueckzug', 'emotionsregulation'],
                'depression': ['rueckzug', 'emotionsregulation'],
                'trauma': ['emotionsregulation', 'rueckzug']
            };

            // Sammle relevante Problematiken
            const relevanteProblematiken = new Set();

            // Aus Hauptproblem
            if (hauptproblem && problematikMapping[hauptproblem]) {
                problematikMapping[hauptproblem].forEach(p => relevanteProblematiken.add(p));
            }

            // Aus Hypothesen
            hypothesen.forEach(h => {
                if (h.konfidenz >= 40 && problematikMapping[h.id]) {
                    problematikMapping[h.id].forEach(p => relevanteProblematiken.add(p));
                }
            });

            // Hole Daten aus ADVISORY_DATA für jede relevante Problematik
            relevanteProblematiken.forEach(problematikId => {
                const problematik = ADVISORY_DATA.problematiken[problematikId];
                if (!problematik) return;

                // Explorationsfragen hinzufügen
                if (problematik.explorationsFragen) {
                    problematik.explorationsFragen.forEach(frage => {
                        interventionen.explorationsFragen.push({
                            frage: frage.frage,
                            hinweis: frage.hinweis,
                            kategorie: frage.kategorie,
                            quelle: problematik.name
                        });
                    });
                }

                // Entwicklungslogik als Situations-Rezepte
                if (problematik.entwicklungslogik) {
                    problematik.entwicklungslogik.forEach(logik => {
                        interventionen.situationen.push({
                            situation: logik.wenn,
                            tuDas: [logik.dann, logik.intervention],
                            vermeide: [],
                            quelle: problematik.name
                        });
                    });
                }

                // Allgemeine Interventionen
                if (problematik.interventionen?.allgemein) {
                    problematik.interventionen.allgemein.forEach(intervention => {
                        interventionen.allgemein.push({
                            kategorie: `${problematik.name}: ${intervention.name}`,
                            beschreibung: intervention.beschreibung,
                            massnahmen: intervention.massnahmen
                        });
                    });
                }

                // Ich-Ziele
                if (problematik.interventionen?.ichZiele) {
                    problematik.interventionen.ichZiele.forEach(ziel => {
                        if (!interventionen.ichZiele.includes(ziel)) {
                            interventionen.ichZiele.push(ziel);
                        }
                    });
                }
            });
        }

        // Fallback: Statische Situations-Rezepte basierend auf Hypothesen
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
                ],
                depression: [
                    {
                        situation: 'Kind ist antriebslos und beteiligt sich nicht',
                        tuDas: ['Kleine Schritte würdigen', 'Niedrige Erwartungen, hohe Wertschätzung', 'Interessen einbeziehen'],
                        vermeide: ['Auffordern "Reiß dich zusammen"', 'Vergleiche mit anderen', 'Überforderung']
                    }
                ],
                bindung: [
                    {
                        situation: 'Kind testet Grenzen exzessiv',
                        tuDas: ['Grenzen halten MIT Beziehung', 'Nicht persönlich nehmen', 'Immer wieder neu anfangen'],
                        vermeide: ['Aufgeben', 'Beziehungsabbruch androhen', 'Inkonsistenz']
                    }
                ]
            };

            if (situationenMap[hypothese.id]) {
                situationenMap[hypothese.id].forEach(sit => {
                    // Nur hinzufügen wenn nicht schon vorhanden
                    const exists = interventionen.situationen.some(s => s.situation === sit.situation);
                    if (!exists) {
                        interventionen.situationen.push(sit);
                    }
                });
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
        } else {
            interventionen.allgemein.push({
                kategorie: 'Verhaltensregulation (Stufe IV-V)',
                massnahmen: [
                    'Selbstverantwortung fördern',
                    'Reflexion anleiten',
                    'Peer-Unterstützung nutzen',
                    'Langfristige Ziele setzen'
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
