/**
 * MODULE-RENDERER
 *
 * Rendert die Inhalte der Modale dynamisch basierend auf den Datendefinitionen:
 * - Anamnese-Module aus clinical-brain.js
 * - Screening-Module aus clinical-brain.js
 * - ELDiB-Items aus eldib-data.js
 * - Situations-Rezepte aus advisory-data.js
 */

const ModuleRenderer = {

    // ============================================
    // ANAMNESE MODULE
    // ============================================

    renderAnamneseModule(moduleId) {
        const modules = {
            entwicklung: {
                title: 'Entwicklungsgeschichte',
                icon: '👶',
                sections: [
                    {
                        title: 'Schwangerschaft & Geburt',
                        items: [
                            { id: 'komplikationen', label: 'Schwangerschaftskomplikationen' },
                            { id: 'fruehgeburt', label: 'Frühgeburt (<37 Wochen)' },
                            { id: 'geburtskomplikationen', label: 'Geburtskomplikationen' },
                            { id: 'sauerstoffmangel', label: 'Sauerstoffmangel bei Geburt' },
                            { id: 'nicu', label: 'Neugeborenen-Intensivstation' },
                            { id: 'substanzen', label: 'Substanzexposition in Schwangerschaft' }
                        ]
                    },
                    {
                        title: 'Entwicklungsmeilensteine',
                        items: [
                            { id: 'motorik_verzoegert', label: 'Motorische Entwicklung verzögert' },
                            { id: 'sprache_spaet', label: 'Späte Sprachentwicklung' },
                            { id: 'sprache_regression', label: 'Sprachverlust/Regression', alert: true },
                            { id: 'sauberkeit_spaet', label: 'Späte Sauberkeitsentwicklung' },
                            { id: 'allgemein_verzoegert', label: 'Allgemein verzögerte Entwicklung' }
                        ]
                    },
                    {
                        title: 'Frühe Regulation (0-3 Jahre)',
                        items: [
                            { id: 'schreibaby', label: 'War ein "Schreibaby"' },
                            { id: 'schlafprobleme_baby', label: 'Starke Schlafprobleme als Baby' },
                            { id: 'fuetterprobleme', label: 'Schwierigkeiten beim Füttern' },
                            { id: 'schwer_beruhigen_baby', label: 'Schwer zu beruhigen als Baby' }
                        ]
                    },
                    {
                        title: 'Medizinische Vorgeschichte',
                        items: [
                            { id: 'epilepsie', label: 'Epilepsie/Krampfanfälle' },
                            { id: 'hoerprobleme', label: 'Hörprobleme' },
                            { id: 'sehprobleme', label: 'Sehprobleme' },
                            { id: 'chronisch_krank', label: 'Chronische Erkrankung' },
                            { id: 'kopfverletzung', label: 'Kopfverletzung/Gehirnerschütterung' },
                            { id: 'medikamente', label: 'Dauermedikation' }
                        ]
                    }
                ]
            },
            familie: {
                title: 'Familie & Umfeld',
                icon: '👨‍👩‍👧‍👦',
                sections: [
                    {
                        title: 'Familiensituation',
                        type: 'single',
                        items: [
                            { id: 'beide_eltern', label: 'Lebt bei beiden leiblichen Eltern' },
                            { id: 'alleinerziehend', label: 'Alleinerziehend' },
                            { id: 'patchwork', label: 'Patchwork-Familie' },
                            { id: 'pflegefamilie', label: 'Pflegefamilie' },
                            { id: 'heim', label: 'Heim/Wohngruppe' },
                            { id: 'wechselnd', label: 'Wechselnde Bezugspersonen' }
                        ]
                    },
                    {
                        title: 'Familiäre Belastungen',
                        items: [
                            { id: 'trennung', label: 'Trennung/Scheidung der Eltern' },
                            { id: 'konflikt', label: 'Häufiger Streit zwischen Eltern' },
                            { id: 'finanziell', label: 'Finanzielle Probleme' },
                            { id: 'eltern_krank', label: 'Elternteil chronisch krank' },
                            { id: 'eltern_psychisch', label: 'Psychische Erkrankung eines Elternteils' },
                            { id: 'todesfall', label: 'Todesfall in der Familie' },
                            { id: 'gewalt', label: 'Häusliche Gewalt', alert: true },
                            { id: 'sucht', label: 'Suchtproblematik in der Familie' }
                        ]
                    },
                    {
                        title: 'Psychiatrische Familiengeschichte',
                        hint: 'Gibt es in der Familie bekannte Diagnosen?',
                        items: [
                            { id: 'fam_adhs', label: 'ADHS' },
                            { id: 'fam_depression', label: 'Depression' },
                            { id: 'fam_angst', label: 'Angststörung' },
                            { id: 'fam_bipolar', label: 'Bipolare Störung' },
                            { id: 'fam_psychose', label: 'Psychose/Schizophrenie' },
                            { id: 'fam_autismus', label: 'Autismus-Spektrum' },
                            { id: 'fam_sucht', label: 'Suchterkrankung' }
                        ]
                    },
                    {
                        title: 'Erziehungsstil',
                        items: [
                            { id: 'warmherzig', label: 'Warmherzig und unterstützend', positive: true },
                            { id: 'konsequent', label: 'Konsequent mit klaren Regeln', positive: true },
                            { id: 'inkonsequent', label: 'Inkonsistent (wechselnde Regeln)' },
                            { id: 'ueberfuersorglich', label: 'Überfürsorglich' },
                            { id: 'autoritaer', label: 'Sehr streng/autoritär' },
                            { id: 'vernachlaessigend', label: 'Wenig Aufsicht/Vernachlässigung', alert: true },
                            { id: 'gewaltsam', label: 'Körperliche Strafen', alert: true }
                        ]
                    }
                ]
            },
            belastungen: {
                title: 'Belastungen & Trauma',
                icon: '⚠️',
                alert_text: 'Diese Informationen sind vertraulich. Bei Verdacht auf akute Gefährdung Kinderschutzmaßnahmen einleiten.',
                sections: [
                    {
                        title: 'Belastende Lebensereignisse (ACEs)',
                        hint: 'Hat das Kind folgendes erlebt?',
                        items: [
                            { id: 'vernachlaessigung', label: 'Vernachlässigung (emotional oder körperlich)', alert: true },
                            { id: 'misshandlung', label: 'Körperliche Misshandlung', alert: true },
                            { id: 'sexueller_missbrauch', label: 'Sexueller Missbrauch', alert: true },
                            { id: 'haeusl_gewalt', label: 'Zeuge häuslicher Gewalt', alert: true },
                            { id: 'sucht_haushalt', label: 'Sucht im Haushalt' },
                            { id: 'psychisch_haushalt', label: 'Psychische Erkrankung im Haushalt' },
                            { id: 'trennung_ploetzlich', label: 'Plötzliche Trennung von Bezugsperson' },
                            { id: 'inhaftierung', label: 'Inhaftierung eines Elternteils' },
                            { id: 'unfall_krankheit', label: 'Schwerer Unfall oder Krankheit des Kindes' },
                            { id: 'mobbing', label: 'Mobbing' }
                        ]
                    },
                    {
                        title: 'Trauma-Symptome',
                        hint: 'Zeigt das Kind folgende Symptome?',
                        items: [
                            { id: 'flashbacks', label: 'Wiedererleben (Flashbacks, Alpträume)' },
                            { id: 'vermeidung', label: 'Vermeidung (will nicht darüber reden, meidet Orte)' },
                            { id: 'uebererregung', label: 'Übererregung (Schreckhaft, Schlafprobleme)' },
                            { id: 'dissoziation', label: 'Dissoziative Symptome (abwesend, "weg")' },
                            { id: 'regression', label: 'Entwicklungsrückschritte' },
                            { id: 'vertrauensverlust', label: 'Grundlegendes Misstrauen' }
                        ]
                    },
                    {
                        title: 'Bindungsmuster (Einschätzung)',
                        type: 'single',
                        hint: 'Wie verhält sich das Kind in Beziehungen zu Erwachsenen?',
                        items: [
                            { id: 'sicher', label: 'Sicher: Sucht Nähe, kann sich lösen, zeigt Vertrauen' },
                            { id: 'vermeidend', label: 'Unsicher-vermeidend: Meidet Nähe, wirkt unabhängig' },
                            { id: 'ambivalent', label: 'Unsicher-ambivalent: Klammert, schwer zu trösten' },
                            { id: 'desorganisiert', label: 'Desorganisiert: Widersprüchliches Verhalten, erstarrt', alert: true },
                            { id: 'unterschiedslos', label: 'Unterschiedslos: Geht zu jedem Erwachsenen', alert: true }
                        ]
                    }
                ]
            },
            ressourcen: {
                title: 'Ressourcen & Stärken',
                icon: '💪',
                sections: [
                    {
                        title: 'Stärken des Kindes',
                        items: [
                            { id: 'intelligent', label: 'Gute kognitive Fähigkeiten' },
                            { id: 'sozial_kompetent', label: 'Sozial kompetent (in bestimmten Situationen)' },
                            { id: 'humor', label: 'Guter Humor' },
                            { id: 'kreativ', label: 'Kreativ/künstlerisch begabt' },
                            { id: 'sportlich', label: 'Sportlich/motorisch stark' },
                            { id: 'hilfsbereit', label: 'Hilfsbereit und fürsorglich' },
                            { id: 'durchhaltevermoegen', label: 'Durchhaltevermögen bei Interessen' },
                            { id: 'problemloesen', label: 'Gute Problemlösefähigkeiten' },
                            { id: 'musikalisch', label: 'Musikalisch' },
                            { id: 'empathisch', label: 'Empathisch und sensibel' }
                        ]
                    },
                    {
                        title: 'Schutzfaktoren im Umfeld',
                        items: [
                            { id: 'stabile_bezugsperson', label: 'Mindestens eine stabile Bezugsperson' },
                            { id: 'gute_freunde', label: 'Hat gute Freunde' },
                            { id: 'unterstuetzende_schule', label: 'Unterstützende Schule/Lehrkraft' },
                            { id: 'verein_hobby', label: 'Regelmäßiges Hobby/Vereinsaktivität' },
                            { id: 'familie_zusammenhalt', label: 'Familiärer Zusammenhalt' },
                            { id: 'professionelle_hilfe', label: 'Bereits professionelle Hilfe (Therapie etc.)' }
                        ]
                    },
                    {
                        title: 'Interessen des Kindes',
                        type: 'text',
                        placeholder: 'Was macht das Kind gerne? Was interessiert es?'
                    }
                ]
            }
        };

        const module = modules[moduleId];
        if (!module) return '<p>Modul nicht gefunden.</p>';

        let html = '';

        if (module.alert_text) {
            html += `<div class="alert alert-warning" style="margin-bottom: 20px;">
                <div class="alert-icon">⚠️</div>
                <div class="alert-content">${module.alert_text}</div>
            </div>`;
        }

        module.sections.forEach(section => {
            html += `<div class="form-group" style="margin-bottom: 24px;">
                <label class="form-label" style="font-size: 1rem; font-weight: 600;">${section.title}</label>`;

            if (section.hint) {
                html += `<p style="color: var(--gray-500); font-size: 0.85rem; margin-bottom: 12px;">${section.hint}</p>`;
            }

            if (section.type === 'text') {
                html += `<textarea class="form-input" rows="3" placeholder="${section.placeholder || ''}"
                    data-module="${moduleId}" data-field="${section.title.toLowerCase().replace(/\s/g, '_')}"></textarea>`;
            } else if (section.type === 'single') {
                html += `<div class="options-grid" data-module="${moduleId}" data-field="${section.title.toLowerCase().replace(/\s/g, '_')}" data-type="single">`;
                section.items.forEach(item => {
                    html += `<div class="option-card ${item.alert ? 'alert-item' : ''}" data-value="${item.id}" onclick="ModuleRenderer.selectOption(this, true)">
                        <div class="option-content">
                            <div class="option-title">${item.label}</div>
                        </div>
                        <div class="option-checkbox">✓</div>
                    </div>`;
                });
                html += '</div>';
            } else {
                html += `<div class="checklist" data-module="${moduleId}" data-field="${section.title.toLowerCase().replace(/\s/g, '_')}">`;
                section.items.forEach(item => {
                    html += `<div class="checklist-item ${item.alert ? 'alert-item' : ''} ${item.positive ? 'positive-item' : ''}"
                        data-value="${item.id}" onclick="ModuleRenderer.toggleChecklist(this)">
                        <div class="checklist-checkbox">✓</div>
                        <div class="checklist-label">${item.label}</div>
                    </div>`;
                });
                html += '</div>';
            }

            html += '</div>';
        });

        return html;
    },

    // ============================================
    // SCREENING MODULE
    // ============================================

    renderScreeningModule(moduleId) {
        if (typeof CLINICAL_BRAIN === 'undefined') {
            return '<p>Clinical Brain nicht geladen.</p>';
        }

        const module = CLINICAL_BRAIN.assessmentModules[moduleId];
        if (!module) return '<p>Modul nicht gefunden.</p>';

        let html = `<p style="color: var(--gray-600); margin-bottom: 20px;">${module.description}</p>`;

        module.questions.forEach(question => {
            html += `<div class="form-group" style="margin-bottom: 24px;">
                <label class="form-label" style="font-size: 1rem; font-weight: 600;">${question.question}</label>`;

            if (question.type === 'single') {
                html += `<div class="options-grid" data-module="${moduleId}" data-question="${question.id}" data-type="single">`;
                question.options.forEach(opt => {
                    html += `<div class="option-card" data-value="${opt.value}" onclick="ModuleRenderer.selectOption(this, true)">
                        ${opt.icon ? `<div class="option-icon">${opt.icon}</div>` : ''}
                        <div class="option-content">
                            <div class="option-title">${opt.label}</div>
                        </div>
                        <div class="option-checkbox">✓</div>
                    </div>`;
                });
                html += '</div>';
            } else {
                // Multi-select checklist
                html += `<div class="checklist" data-module="${moduleId}" data-question="${question.id}">`;
                question.options.forEach(opt => {
                    const isAlert = opt.alert;
                    html += `<div class="checklist-item ${isAlert ? 'alert-item' : ''}" data-value="${opt.value}"
                        data-score="${opt.score || 1}" onclick="ModuleRenderer.toggleChecklist(this)">
                        <div class="checklist-checkbox">✓</div>
                        <div class="checklist-label">${opt.label}</div>
                    </div>`;
                });
                html += '</div>';

                // Show threshold indicator if defined
                if (question.threshold) {
                    html += `<div class="threshold-indicator" style="margin-top: 12px; display: flex; gap: 8px; font-size: 0.8rem;">
                        <span class="status-badge status-green">0-${question.threshold.green} Normal</span>
                        <span class="status-badge status-yellow">${question.threshold.green + 1}-${question.threshold.yellow} Grenzwertig</span>
                        <span class="status-badge status-red">${question.threshold.red}+ Auffällig</span>
                    </div>`;
                }
            }

            html += '</div>';
        });

        return html;
    },

    // ============================================
    // ELDIB BEREICH
    // ============================================

    renderELDiBBereich(bereich) {
        if (typeof ELDIB_DATA === 'undefined') {
            return '<p>ELDiB Daten nicht geladen.</p>';
        }

        const bereichData = ELDIB_DATA[bereich];
        if (!bereichData) return '<p>Bereich nicht gefunden.</p>';

        let html = `
            <div class="eldib-header" style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
                <div style="width: 48px; height: 48px; background: ${bereichData.color}; border-radius: 8px;
                    display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 1.2rem;">
                    ${bereichData.code}
                </div>
                <div>
                    <div style="font-weight: 600; font-size: 1.1rem;">${bereichData.name}</div>
                    <div style="color: var(--gray-500); font-size: 0.85rem;">${Object.keys(bereichData.stufen).length} Stufen</div>
                </div>
            </div>
        `;

        // Stufen-Selector
        html += `<div class="form-group" style="margin-bottom: 24px;">
            <label class="form-label">Aktuelle Entwicklungsstufe</label>
            <div class="options-grid" data-bereich="${bereich}" id="stufen-selector-${bereich}">`;

        Object.entries(bereichData.stufen).forEach(([stufeNr, stufeData]) => {
            const romanNum = ['I', 'II', 'III', 'IV', 'V'][parseInt(stufeNr) - 1];
            html += `<div class="option-card" data-value="${stufeNr}" onclick="ModuleRenderer.selectStufe('${bereich}', ${stufeNr}, this)">
                <div class="option-content">
                    <div class="option-title">Stufe ${romanNum}</div>
                    <div class="option-desc" style="font-size: 0.75rem;">${stufeData.name.replace(/Stufe [IVX]+: /, '')}</div>
                </div>
                <div class="option-checkbox">✓</div>
            </div>`;
        });

        html += '</div></div>';

        // Items-Container (wird dynamisch gefüllt)
        html += `<div id="eldib-items-${bereich}"></div>`;

        return html;
    },

    renderELDiBItems(bereich, stufe) {
        const bereichData = ELDIB_DATA[bereich];
        if (!bereichData || !bereichData.stufen[stufe]) return '';

        const stufeData = bereichData.stufen[stufe];
        const romanNum = ['I', 'II', 'III', 'IV', 'V'][parseInt(stufe) - 1];

        let html = `
            <div style="background: var(--gray-50); padding: 16px; border-radius: var(--radius-lg); margin-bottom: 16px;">
                <div style="font-weight: 600; margin-bottom: 4px;">Stufe ${romanNum}: ${stufeData.name.replace(/Stufe [IVX]+: /, '')}</div>
                <div style="color: var(--gray-600); font-size: 0.9rem;">Ziel: ${stufeData.ziel}</div>
            </div>
            <div style="font-weight: 500; margin-bottom: 12px;">${stufeData.items.length} Items in dieser Stufe:</div>
            <div class="eldib-items-list">
        `;

        stufeData.items.forEach(item => {
            html += `<div class="eldib-item" data-code="${item.code}" style="
                border: 1px solid var(--gray-200);
                border-radius: var(--radius);
                padding: 16px;
                margin-bottom: 12px;
                transition: all 0.2s ease;
            ">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span style="background: ${bereichData.color}; color: white; padding: 4px 10px; border-radius: 4px; font-weight: 600; font-size: 0.85rem;">
                            ${item.code}
                        </span>
                        <span style="font-weight: 500;">${item.keyword}</span>
                    </div>
                    <div class="item-status-selector" style="display: flex; gap: 6px;">
                        <button class="status-btn" data-status="nicht_erreicht" onclick="ModuleRenderer.setItemStatus('${item.code}', 'nicht_erreicht', this)"
                            style="padding: 4px 10px; border: 1px solid var(--gray-300); border-radius: 4px; background: white; cursor: pointer; font-size: 0.8rem;">
                            ⬜ Nein
                        </button>
                        <button class="status-btn" data-status="in_arbeit" onclick="ModuleRenderer.setItemStatus('${item.code}', 'in_arbeit', this)"
                            style="padding: 4px 10px; border: 1px solid var(--gray-300); border-radius: 4px; background: white; cursor: pointer; font-size: 0.8rem;">
                            🟡 In Arbeit
                        </button>
                        <button class="status-btn" data-status="erreicht" onclick="ModuleRenderer.setItemStatus('${item.code}', 'erreicht', this)"
                            style="padding: 4px 10px; border: 1px solid var(--gray-300); border-radius: 4px; background: white; cursor: pointer; font-size: 0.8rem;">
                            ✅ Ja
                        </button>
                    </div>
                </div>
                <div style="color: var(--gray-600); font-size: 0.9rem; margin-bottom: 12px;">${item.description}</div>
                <div style="background: var(--primary-subtle); padding: 12px; border-radius: var(--radius); font-size: 0.85rem;">
                    <div style="font-weight: 500; margin-bottom: 6px; color: var(--primary);">Ich-Ziele:</div>
                    <ul style="margin: 0; padding-left: 20px; color: var(--gray-700);">
                        ${item.zielformulierungen.map(z => `<li style="margin-bottom: 4px;">${z}</li>`).join('')}
                    </ul>
                </div>
            </div>`;
        });

        html += '</div>';
        return html;
    },

    // ============================================
    // SITUATIONS-REZEPTE
    // ============================================

    renderSituationsRezepte(problematikId) {
        if (typeof ADVISORY_DATA === 'undefined') {
            return '<p>Advisory Daten nicht geladen.</p>';
        }

        const problematik = ADVISORY_DATA.problematiken[problematikId];
        if (!problematik) return '<p>Problematik nicht gefunden.</p>';

        let html = `
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
                <span style="font-size: 2rem;">${problematik.icon}</span>
                <div>
                    <div style="font-weight: 600; font-size: 1.1rem;">${problematik.name}</div>
                    <div style="color: var(--gray-500); font-size: 0.9rem;">${problematik.beschreibung}</div>
                </div>
            </div>
        `;

        // Explorationsfragen
        if (problematik.explorationsFragen && problematik.explorationsFragen.length > 0) {
            html += `<div class="card" style="margin-bottom: 20px;">
                <div style="font-weight: 600; margin-bottom: 12px;">Explorationsfragen</div>
                <div class="checklist">`;

            problematik.explorationsFragen.forEach((frage, idx) => {
                html += `<div class="exploration-item" style="padding: 14px; background: var(--gray-50); border-radius: var(--radius); margin-bottom: 10px;">
                    <div style="font-weight: 500; margin-bottom: 6px;">${idx + 1}. ${frage.frage}</div>
                    <div style="color: var(--gray-500); font-size: 0.85rem;">💡 ${frage.hinweis}</div>
                </div>`;
            });

            html += '</div></div>';
        }

        // Interventionen
        if (problematik.interventionen && problematik.interventionen.allgemein) {
            html += `<div class="card" style="margin-bottom: 20px;">
                <div style="font-weight: 600; margin-bottom: 12px;">Interventionen</div>`;

            problematik.interventionen.allgemein.forEach(intervention => {
                html += `<div style="margin-bottom: 16px; padding: 16px; border: 1px solid var(--gray-200); border-radius: var(--radius-lg);">
                    <div style="font-weight: 600; margin-bottom: 4px;">${intervention.name}</div>
                    <div style="color: var(--gray-600); font-size: 0.9rem; margin-bottom: 12px;">${intervention.beschreibung}</div>
                    <ul style="margin: 0; padding-left: 20px;">
                        ${intervention.massnahmen.map(m => `<li style="margin-bottom: 6px;">${m}</li>`).join('')}
                    </ul>
                </div>`;
            });

            html += '</div>';
        }

        // Entwicklungslogik
        if (problematik.entwicklungslogik && problematik.entwicklungslogik.length > 0) {
            html += `<div class="card" style="margin-bottom: 20px;">
                <div style="font-weight: 600; margin-bottom: 12px;">Entwicklungsbasierte Empfehlungen</div>
                <table class="situations-table" style="width: 100%;">
                    <thead>
                        <tr>
                            <th style="width: 35%;">Wenn...</th>
                            <th style="width: 30%;">Dann...</th>
                            <th style="width: 35%;">Intervention</th>
                        </tr>
                    </thead>
                    <tbody>`;

            problematik.entwicklungslogik.forEach(logik => {
                html += `<tr>
                    <td style="color: var(--gray-700);">${logik.wenn}</td>
                    <td style="color: var(--primary); font-weight: 500;">${logik.dann}</td>
                    <td style="color: var(--success);">${logik.intervention}</td>
                </tr>`;
            });

            html += '</tbody></table></div>';
        }

        // Ich-Ziele
        if (problematik.interventionen && problematik.interventionen.ichZiele) {
            html += `<div class="card" style="margin-bottom: 20px;">
                <div style="font-weight: 600; margin-bottom: 12px;">Ich-Ziele (zur Auswahl)</div>
                <div class="checklist">`;

            problematik.interventionen.ichZiele.forEach(ziel => {
                html += `<div class="checklist-item" data-value="${ziel}" onclick="ModuleRenderer.toggleChecklist(this)">
                    <div class="checklist-checkbox">✓</div>
                    <div class="checklist-label">${ziel}</div>
                </div>`;
            });

            html += '</div></div>';
        }

        // Warnzeichen
        if (problematik.warnzeichen && problematik.warnzeichen.length > 0) {
            html += `<div class="alert alert-danger" style="margin-bottom: 20px;">
                <div class="alert-icon">⚠️</div>
                <div class="alert-content">
                    <div class="alert-title">Warnzeichen - weitere Abklärung empfohlen wenn:</div>
                    <ul style="margin: 8px 0 0 0; padding-left: 20px;">
                        ${problematik.warnzeichen.map(w => `<li>${w}</li>`).join('')}
                    </ul>
                </div>
            </div>`;
        }

        // Differenzialüberlegungen
        if (problematik.differenzialUeberlegungen && problematik.differenzialUeberlegungen.length > 0) {
            html += `<div class="card">
                <div style="font-weight: 600; margin-bottom: 12px;">Differenzialüberlegungen</div>
                <ul style="margin: 0; padding-left: 20px;">
                    ${problematik.differenzialUeberlegungen.map(d => `<li style="margin-bottom: 8px;">${d}</li>`).join('')}
                </ul>
            </div>`;
        }

        return html;
    },

    // ============================================
    // HELPER FUNCTIONS
    // ============================================

    selectOption(element, isSingle) {
        const container = element.parentElement;

        if (isSingle || container.dataset.type === 'single') {
            container.querySelectorAll('.option-card').forEach(card => {
                card.classList.remove('selected');
            });
        }

        element.classList.toggle('selected');
        this.saveModuleData(container);
    },

    toggleChecklist(element) {
        element.classList.toggle('checked');
        this.saveModuleData(element.parentElement);
    },

    selectStufe(bereich, stufe, element) {
        // Update selection
        const container = element.parentElement;
        container.querySelectorAll('.option-card').forEach(card => {
            card.classList.remove('selected');
        });
        element.classList.add('selected');

        // Update ELDiB bar in main view
        const barId = `eldib-bar-${bereich === 'verhalten' ? 'v' : bereich === 'kommunikation' ? 'k' : bereich === 'sozialisation' ? 'soz' : 'kog'}`;
        const stufeId = `eldib-stufe-${bereich === 'verhalten' ? 'v' : bereich === 'kommunikation' ? 'k' : bereich === 'sozialisation' ? 'soz' : 'kog'}`;

        const bar = document.getElementById(barId);
        const stufeLabel = document.getElementById(stufeId);

        if (bar) bar.style.height = `${stufe * 20}%`;
        if (stufeLabel) stufeLabel.textContent = `Stufe ${['I', 'II', 'III', 'IV', 'V'][stufe - 1]}`;

        // Render items for this Stufe
        const itemsContainer = document.getElementById(`eldib-items-${bereich}`);
        if (itemsContainer) {
            itemsContainer.innerHTML = this.renderELDiBItems(bereich, stufe);
        }

        // Save to appData
        if (typeof appData !== 'undefined') {
            appData.eldib[bereich] = appData.eldib[bereich] || {};
            appData.eldib[bereich].stufe = parseInt(stufe);
        }
    },

    setItemStatus(code, status, element) {
        // Update button styling
        const container = element.parentElement;
        container.querySelectorAll('.status-btn').forEach(btn => {
            btn.style.background = 'white';
            btn.style.borderColor = 'var(--gray-300)';
            btn.style.fontWeight = 'normal';
        });

        const colors = {
            'nicht_erreicht': { bg: 'var(--gray-100)', border: 'var(--gray-400)' },
            'in_arbeit': { bg: 'var(--warning-subtle)', border: 'var(--warning)' },
            'erreicht': { bg: 'var(--success-subtle)', border: 'var(--success)' }
        };

        element.style.background = colors[status].bg;
        element.style.borderColor = colors[status].border;
        element.style.fontWeight = '600';

        // Save to appData
        if (typeof appData !== 'undefined') {
            // Find bereich from code
            const bereich = code.startsWith('V-') ? 'verhalten' :
                           code.startsWith('K-') ? 'kommunikation' :
                           code.startsWith('SOZ-') ? 'sozialisation' : 'kognition';

            appData.eldib[bereich] = appData.eldib[bereich] || { items: [] };

            const existingItem = appData.eldib[bereich].items.find(i => i.code === code);
            if (existingItem) {
                existingItem.status = status;
            } else {
                appData.eldib[bereich].items.push({ code, status });
            }
        }
    },

    saveModuleData(container) {
        // This would save to appData based on container's data attributes
        // Implementation depends on specific module structure
    }
};

// Make globally available
window.ModuleRenderer = ModuleRenderer;
