/**
 * KLINISCHES ASSESSMENT - UI und Logik
 *
 * Dieses Modul steuert:
 * 1. Click-through Assessment Interface
 * 2. Pattern Recognition Engine
 * 3. Hypothesen-Generator
 * 4. Psychoedukation-Anzeige
 */

const ClinicalAssessment = {

    // Aktueller Zustand
    state: {
        currentModule: null,
        currentQuestionIndex: 0,
        responses: {},
        completedModules: [],
        hypotheses: [],
        alerts: []
    },

    // ============================================
    // ASSESSMENT UI RENDERING
    // ============================================

    /**
     * Rendert das Haupt-Assessment-Interface
     */
    renderAssessmentHome(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const modules = CLINICAL_BRAIN.assessmentModules;
        const completedCount = this.state.completedModules.length;
        const totalCount = Object.keys(modules).length;

        container.innerHTML = `
            <div style="max-width: 900px; margin: 0 auto;">
                <!-- Progress Header -->
                <div style="background: linear-gradient(135deg, var(--primary), var(--info)); padding: 30px; border-radius: var(--radius-lg); color: white; margin-bottom: 30px;">
                    <h2 style="margin: 0 0 10px 0; font-size: 1.8rem;">🧠 Klinische Einschätzung</h2>
                    <p style="margin: 0 0 20px 0; opacity: 0.9;">Klicken Sie sich durch die Module. Das System erkennt Muster und gibt Ihnen Hypothesen.</p>
                    <div style="display: flex; align-items: center; gap: 15px;">
                        <div style="flex: 1; background: rgba(255,255,255,0.2); height: 8px; border-radius: 4px; overflow: hidden;">
                            <div style="width: ${(completedCount/totalCount)*100}%; height: 100%; background: white; border-radius: 4px; transition: width 0.5s;"></div>
                        </div>
                        <span style="font-weight: 600;">${completedCount}/${totalCount}</span>
                    </div>
                </div>

                <!-- Alert Banner wenn nötig -->
                ${this.state.alerts.length > 0 ? `
                    <div style="background: #FFF5F5; border: 2px solid var(--danger); padding: 20px; border-radius: var(--radius); margin-bottom: 20px;">
                        <h4 style="color: var(--danger); margin: 0 0 10px 0;">⚠️ Wichtige Hinweise</h4>
                        <ul style="margin: 0; padding-left: 20px;">
                            ${this.state.alerts.map(a => `<li style="color: var(--danger-dark);">${a}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}

                <!-- Module Grid -->
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; margin-bottom: 30px;">
                    ${Object.entries(modules).map(([key, module]) => this.renderModuleCard(key, module)).join('')}
                </div>

                <!-- Hypothesen Button -->
                ${completedCount >= 3 ? `
                    <div style="text-align: center; margin-top: 30px;">
                        <button onclick="ClinicalAssessment.generateAndShowHypotheses()" class="btn btn-primary" style="padding: 15px 40px; font-size: 1.1rem;">
                            🔬 Hypothesen generieren
                        </button>
                    </div>
                ` : `
                    <div style="text-align: center; color: var(--gray-500); padding: 20px;">
                        Füllen Sie mindestens 3 Module aus, um Hypothesen zu erhalten.
                    </div>
                `}
            </div>
        `;
    },

    /**
     * Rendert eine Modul-Karte
     */
    renderModuleCard(key, module) {
        const isCompleted = this.state.completedModules.includes(key);
        const hasResponses = Object.keys(this.state.responses[key] || {}).length > 0;

        return `
            <div onclick="ClinicalAssessment.startModule('${key}')"
                 style="background: white; padding: 25px; border-radius: var(--radius); cursor: pointer;
                        border: 2px solid ${isCompleted ? 'var(--success)' : 'var(--gray-200)'};
                        transition: all 0.3s; position: relative;"
                 onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 10px 30px rgba(0,0,0,0.1)';"
                 onmouseout="this.style.transform='none'; this.style.boxShadow='none';">

                ${isCompleted ? `
                    <div style="position: absolute; top: 15px; right: 15px; background: var(--success); color: white;
                                width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center;
                                justify-content: center; font-size: 0.9rem;">✓</div>
                ` : ''}

                <div style="font-size: 2.5rem; margin-bottom: 15px;">${module.icon}</div>
                <h3 style="margin: 0 0 8px 0; color: var(--gray-800);">${module.title}</h3>
                <p style="margin: 0; color: var(--gray-500); font-size: 0.9rem;">${module.description}</p>

                ${hasResponses && !isCompleted ? `
                    <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid var(--gray-200);
                                font-size: 0.85rem; color: var(--warning-dark);">
                        ⏳ In Bearbeitung
                    </div>
                ` : ''}
            </div>
        `;
    },

    /**
     * Startet ein Assessment-Modul
     */
    startModule(moduleKey) {
        this.state.currentModule = moduleKey;
        this.state.currentQuestionIndex = 0;

        if (!this.state.responses[moduleKey]) {
            this.state.responses[moduleKey] = {};
        }

        this.renderQuestion();
    },

    /**
     * Rendert die aktuelle Frage
     */
    renderQuestion() {
        const container = document.getElementById('clinical-assessment-content');
        if (!container) return;

        const module = CLINICAL_BRAIN.assessmentModules[this.state.currentModule];
        const questions = module.questions;
        const currentQ = questions[this.state.currentQuestionIndex];
        const progress = ((this.state.currentQuestionIndex + 1) / questions.length) * 100;

        container.innerHTML = `
            <div style="max-width: 800px; margin: 0 auto;">
                <!-- Header -->
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <button onclick="ClinicalAssessment.exitModule()" class="btn btn-secondary" style="padding: 8px 16px;">
                        ← Zurück
                    </button>
                    <div style="text-align: center;">
                        <span style="font-size: 2rem;">${module.icon}</span>
                        <div style="color: var(--gray-500); font-size: 0.85rem;">${module.title}</div>
                    </div>
                    <div style="color: var(--gray-500);">
                        ${this.state.currentQuestionIndex + 1} / ${questions.length}
                    </div>
                </div>

                <!-- Progress Bar -->
                <div style="background: var(--gray-200); height: 6px; border-radius: 3px; margin-bottom: 30px; overflow: hidden;">
                    <div style="width: ${progress}%; height: 100%; background: linear-gradient(90deg, var(--primary), var(--info));
                                border-radius: 3px; transition: width 0.3s;"></div>
                </div>

                <!-- Question Card -->
                <div style="background: white; padding: 40px; border-radius: var(--radius-lg); box-shadow: var(--shadow-soft);">
                    <h3 style="margin: 0 0 30px 0; color: var(--gray-800); font-size: 1.3rem; line-height: 1.5;">
                        ${currentQ.question}
                    </h3>

                    ${currentQ.helpText ? `
                        <p style="color: var(--gray-500); margin-bottom: 25px; font-size: 0.9rem; font-style: italic;">
                            ℹ️ ${currentQ.helpText}
                        </p>
                    ` : ''}

                    <!-- Options -->
                    <div style="display: flex; flex-direction: column; gap: 12px;">
                        ${this.renderOptions(currentQ)}
                    </div>
                </div>

                <!-- Navigation -->
                <div style="display: flex; justify-content: space-between; margin-top: 30px;">
                    <button onclick="ClinicalAssessment.previousQuestion()"
                            class="btn btn-secondary" style="padding: 12px 24px;"
                            ${this.state.currentQuestionIndex === 0 ? 'disabled style="opacity:0.5;pointer-events:none;"' : ''}>
                        ← Zurück
                    </button>

                    ${this.state.currentQuestionIndex < questions.length - 1 ? `
                        <button onclick="ClinicalAssessment.nextQuestion()"
                                class="btn btn-primary" style="padding: 12px 30px;">
                            Weiter →
                        </button>
                    ` : `
                        <button onclick="ClinicalAssessment.finishModule()"
                                class="btn btn-primary" style="padding: 12px 30px; background: var(--success);">
                            ✓ Modul abschließen
                        </button>
                    `}
                </div>
            </div>
        `;
    },

    /**
     * Rendert die Antwortoptionen basierend auf Typ
     */
    renderOptions(question) {
        const savedResponse = this.state.responses[this.state.currentModule]?.[question.id];

        if (question.type === 'single') {
            return question.options.map(opt => `
                <label onclick="ClinicalAssessment.selectSingleOption('${question.id}', '${opt.value}')"
                       style="display: flex; align-items: center; padding: 16px 20px; background: ${savedResponse === opt.value ? 'linear-gradient(135deg, var(--primary-light), var(--info-light))' : 'var(--gray-50)'};
                              border: 2px solid ${savedResponse === opt.value ? 'var(--primary)' : 'var(--gray-200)'};
                              border-radius: var(--radius); cursor: pointer; transition: all 0.2s;"
                       onmouseover="if('${savedResponse}' !== '${opt.value}') this.style.borderColor='var(--primary-light)'"
                       onmouseout="if('${savedResponse}' !== '${opt.value}') this.style.borderColor='var(--gray-200)'">
                    <div style="width: 24px; height: 24px; border-radius: 50%; border: 2px solid ${savedResponse === opt.value ? 'var(--primary)' : 'var(--gray-400)'};
                                margin-right: 15px; display: flex; align-items: center; justify-content: center;
                                background: ${savedResponse === opt.value ? 'var(--primary)' : 'white'};">
                        ${savedResponse === opt.value ? '<span style="color:white;font-size:12px;">✓</span>' : ''}
                    </div>
                    <span style="flex: 1; color: ${savedResponse === opt.value ? 'var(--gray-900)' : 'var(--gray-700)'}; font-weight: ${savedResponse === opt.value ? '600' : '400'};">
                        ${opt.icon ? opt.icon + ' ' : ''}${opt.label}
                    </span>
                </label>
            `).join('');
        }

        if (question.type === 'multi') {
            const savedArray = savedResponse || [];
            return question.options.map(opt => `
                <label onclick="ClinicalAssessment.toggleMultiOption('${question.id}', '${opt.value}')"
                       style="display: flex; align-items: center; padding: 16px 20px;
                              background: ${savedArray.includes(opt.value) ? 'linear-gradient(135deg, rgba(74,144,164,0.1), rgba(66,153,225,0.1))' : 'var(--gray-50)'};
                              border: 2px solid ${savedArray.includes(opt.value) ? 'var(--primary)' : 'var(--gray-200)'};
                              border-radius: var(--radius); cursor: pointer; transition: all 0.2s;"
                       onmouseover="this.style.borderColor='var(--primary-light)'"
                       onmouseout="if(!${savedArray.includes(opt.value)}) this.style.borderColor='var(--gray-200)'">
                    <div style="width: 24px; height: 24px; border-radius: 6px; border: 2px solid ${savedArray.includes(opt.value) ? 'var(--primary)' : 'var(--gray-400)'};
                                margin-right: 15px; display: flex; align-items: center; justify-content: center;
                                background: ${savedArray.includes(opt.value) ? 'var(--primary)' : 'white'};">
                        ${savedArray.includes(opt.value) ? '<span style="color:white;font-size:14px;">✓</span>' : ''}
                    </div>
                    <span style="flex: 1; color: var(--gray-700);">
                        ${opt.label}
                    </span>
                    ${opt.alert ? '<span style="color: var(--danger); margin-left: 10px;">⚠️</span>' : ''}
                </label>
            `).join('');
        }

        return '';
    },

    /**
     * Single-Choice Auswahl
     */
    selectSingleOption(questionId, value) {
        this.state.responses[this.state.currentModule][questionId] = value;
        this.checkForAlerts(questionId, value);
        this.renderQuestion();
    },

    /**
     * Multi-Choice Toggle
     */
    toggleMultiOption(questionId, value) {
        if (!this.state.responses[this.state.currentModule][questionId]) {
            this.state.responses[this.state.currentModule][questionId] = [];
        }

        const arr = this.state.responses[this.state.currentModule][questionId];
        const idx = arr.indexOf(value);

        if (idx === -1) {
            arr.push(value);
            this.checkForAlerts(questionId, value);
        } else {
            arr.splice(idx, 1);
        }

        this.renderQuestion();
    },

    /**
     * Prüft auf Alert-Trigger
     */
    checkForAlerts(questionId, value) {
        // Finde die Frage und Option
        const module = CLINICAL_BRAIN.assessmentModules[this.state.currentModule];
        for (const q of module.questions) {
            if (q.id === questionId) {
                for (const opt of q.options) {
                    if (opt.value === value && opt.alert) {
                        const alertMsg = this.getAlertMessage(value);
                        if (!this.state.alerts.includes(alertMsg)) {
                            this.state.alerts.push(alertMsg);
                        }
                    }
                }
            }
        }
    },

    getAlertMessage(value) {
        const alertMessages = {
            'suizid': '⚠️ Suizidgedanken wurden angegeben - bitte zeitnah professionelle Hilfe suchen!',
            'selbstverletzung': '⚠️ Selbstverletzendes Verhalten - fachärztliche Abklärung empfohlen',
            'tier_quaelen': '⚠️ Tierquälerei ist ein ernstes Warnsignal - dringend fachärztliche Vorstellung',
            'misshandlung': '⚠️ Bei Verdacht auf Misshandlung: Kinderschutz-Meldung prüfen!',
            'sexueller_missbrauch': '⚠️ Bei sexuellem Missbrauch: Kinderschutz & spezialisierte Beratung',
            'haeusliche_gewalt': '⚠️ Häusliche Gewalt: Sicherheit des Kindes gewährleisten!'
        };
        return alertMessages[value] || `⚠️ Auffälligkeit bei: ${value}`;
    },

    previousQuestion() {
        if (this.state.currentQuestionIndex > 0) {
            this.state.currentQuestionIndex--;
            this.renderQuestion();
        }
    },

    nextQuestion() {
        const module = CLINICAL_BRAIN.assessmentModules[this.state.currentModule];
        if (this.state.currentQuestionIndex < module.questions.length - 1) {
            this.state.currentQuestionIndex++;
            this.renderQuestion();
        }
    },

    finishModule() {
        if (!this.state.completedModules.includes(this.state.currentModule)) {
            this.state.completedModules.push(this.state.currentModule);
        }
        this.state.currentModule = null;
        this.renderAssessmentHome('clinical-assessment-content');
        this.saveState();
    },

    exitModule() {
        this.state.currentModule = null;
        this.renderAssessmentHome('clinical-assessment-content');
    },

    // ============================================
    // PATTERN RECOGNITION ENGINE
    // ============================================

    /**
     * Analysiert alle Antworten und erkennt klinische Muster
     */
    analyzePatterns() {
        const patterns = CLINICAL_BRAIN.clinicalPatterns;
        const responses = this.flattenResponses();
        const hypotheses = [];

        // Für jedes klinische Muster prüfen
        for (const [patternKey, pattern] of Object.entries(patterns)) {
            const score = this.calculatePatternScore(patternKey, pattern, responses);

            if (score.total > 0) {
                hypotheses.push({
                    key: patternKey,
                    pattern: pattern,
                    score: score,
                    confidence: this.calculateConfidence(score)
                });
            }
        }

        // Nach Konfidenz sortieren
        hypotheses.sort((a, b) => b.confidence - a.confidence);

        return hypotheses;
    },

    /**
     * Flattened alle Antworten in ein einfaches Objekt
     */
    flattenResponses() {
        const flat = {};
        for (const [moduleKey, questions] of Object.entries(this.state.responses)) {
            for (const [qId, response] of Object.entries(questions)) {
                if (Array.isArray(response)) {
                    response.forEach(r => flat[r] = true);
                } else {
                    flat[response] = true;
                }
                flat[`${moduleKey}_${qId}`] = response;
            }
        }
        return flat;
    },

    /**
     * Berechnet Score für ein klinisches Muster
     */
    calculatePatternScore(patternKey, pattern, responses) {
        let score = { matches: 0, total: 0, riskFactors: 0, protectiveFactors: 0, details: [] };

        // Marker prüfen
        if (pattern.markers) {
            for (const marker of pattern.markers) {
                if (responses[marker]) {
                    score.matches++;
                    score.details.push({ type: 'marker', value: marker });
                }
            }
            score.total = pattern.markers.length;
        }

        // Risikofaktoren
        if (pattern.riskFactors) {
            for (const rf of pattern.riskFactors) {
                if (responses[rf]) {
                    score.riskFactors++;
                    score.details.push({ type: 'risk', value: rf });
                }
            }
        }

        // Schutzfaktoren
        if (pattern.protectiveFactors) {
            for (const pf of pattern.protectiveFactors) {
                if (responses[pf]) {
                    score.protectiveFactors++;
                    score.details.push({ type: 'protective', value: pf });
                }
            }
        }

        // Spezifische Symptom-Counts
        const modules = CLINICAL_BRAIN.assessmentModules;
        for (const [moduleKey, module] of Object.entries(modules)) {
            for (const q of module.questions) {
                if (q.threshold && this.state.responses[moduleKey]?.[q.id]) {
                    const resp = this.state.responses[moduleKey][q.id];
                    const count = Array.isArray(resp) ? resp.length : 1;

                    // Pattern-spezifische Fragen
                    if (q.id.includes('adhs') && patternKey === 'adhs') {
                        score.matches += count;
                    } else if (q.id.includes('angst') && patternKey === 'anxiety') {
                        score.matches += count;
                    } else if (q.id.includes('depression') && patternKey === 'depression') {
                        score.matches += count;
                    } else if (q.id.includes('opposition') && (patternKey === 'odd' || patternKey === 'conduct')) {
                        score.matches += count;
                    } else if (q.id.includes('asd') && patternKey === 'asd') {
                        score.matches += count;
                    } else if (q.id.includes('trauma') && patternKey === 'trauma') {
                        score.matches += count;
                    }
                }
            }
        }

        return score;
    },

    /**
     * Berechnet Konfidenz-Level
     */
    calculateConfidence(score) {
        let conf = 0;

        // Basis-Score aus Matches
        if (score.total > 0) {
            conf = (score.matches / Math.max(score.total, 1)) * 50;
        } else {
            conf = Math.min(score.matches * 10, 50);
        }

        // Risikofaktoren erhöhen Konfidenz
        conf += score.riskFactors * 8;

        // Schutzfaktoren reduzieren leicht
        conf -= score.protectiveFactors * 3;

        return Math.min(Math.max(conf, 0), 100);
    },

    // ============================================
    // HYPOTHESEN-GENERATOR & ANZEIGE
    // ============================================

    generateAndShowHypotheses() {
        this.state.hypotheses = this.analyzePatterns();
        this.renderHypotheses();
    },

    renderHypotheses() {
        const container = document.getElementById('clinical-assessment-content');
        if (!container) return;

        const hypotheses = this.state.hypotheses.filter(h => h.confidence > 15);

        container.innerHTML = `
            <div style="max-width: 900px; margin: 0 auto;">
                <!-- Header -->
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
                    <button onclick="ClinicalAssessment.renderAssessmentHome('clinical-assessment-content')" class="btn btn-secondary">
                        ← Zurück zur Übersicht
                    </button>
                    <h2 style="margin: 0;">🔬 Klinische Hypothesen</h2>
                    <div></div>
                </div>

                <!-- Alerts -->
                ${this.state.alerts.length > 0 ? `
                    <div style="background: linear-gradient(135deg, #FFF5F5, #FED7D7); border: 2px solid var(--danger);
                                padding: 25px; border-radius: var(--radius-lg); margin-bottom: 30px;">
                        <h3 style="color: var(--danger); margin: 0 0 15px 0;">⚠️ Wichtige Hinweise - Sofortige Beachtung!</h3>
                        <ul style="margin: 0; padding-left: 20px;">
                            ${this.state.alerts.map(a => `<li style="margin-bottom: 8px;">${a}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}

                <!-- Hypothesen -->
                ${hypotheses.length > 0 ? `
                    <div style="display: flex; flex-direction: column; gap: 20px;">
                        ${hypotheses.map((h, idx) => this.renderHypothesisCard(h, idx)).join('')}
                    </div>
                ` : `
                    <div style="text-align: center; padding: 60px; background: var(--gray-50); border-radius: var(--radius-lg);">
                        <div style="font-size: 4rem; margin-bottom: 20px;">🤔</div>
                        <h3 style="color: var(--gray-600);">Keine klaren Hypothesen</h3>
                        <p style="color: var(--gray-500);">Basierend auf den bisherigen Angaben lassen sich keine eindeutigen klinischen Muster erkennen.
                           Bitte füllen Sie weitere Module aus oder überprüfen Sie Ihre Angaben.</p>
                    </div>
                `}

                <!-- Disclaimer -->
                <div style="margin-top: 40px; padding: 20px; background: var(--gray-100); border-radius: var(--radius); text-align: center;">
                    <p style="margin: 0; color: var(--gray-600); font-size: 0.9rem;">
                        ⚕️ Diese Hypothesen ersetzen keine klinische Diagnostik. Sie dienen der Orientierung und sollten
                        durch fachärztliche/psychologische Untersuchung überprüft werden.
                    </p>
                </div>
            </div>
        `;
    },

    renderHypothesisCard(hypothesis, index) {
        const pattern = hypothesis.pattern;
        const confidence = hypothesis.confidence;

        const confidenceColor = confidence > 60 ? 'var(--danger)' :
                               confidence > 40 ? 'var(--warning)' :
                               'var(--info)';

        const confidenceLabel = confidence > 60 ? 'Hoch' :
                               confidence > 40 ? 'Mittel' :
                               'Niedrig';

        return `
            <div style="background: white; border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-soft);">
                <!-- Header -->
                <div style="background: linear-gradient(135deg, ${confidenceColor}22, ${confidenceColor}11);
                            padding: 25px; border-bottom: 1px solid var(--gray-200);">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                        <div>
                            <div style="font-size: 0.85rem; color: var(--gray-500); margin-bottom: 5px;">
                                Hypothese ${index + 1}
                            </div>
                            <h3 style="margin: 0; color: var(--gray-800); font-size: 1.4rem;">
                                ${pattern.name}
                            </h3>
                            ${pattern.icd11 ? `<div style="color: var(--gray-500); font-size: 0.85rem; margin-top: 5px;">ICD-11: ${pattern.icd11}</div>` : ''}
                        </div>
                        <div style="text-align: right;">
                            <div style="background: ${confidenceColor}; color: white; padding: 8px 16px;
                                        border-radius: var(--radius-full); font-weight: 600;">
                                ${Math.round(confidence)}% ${confidenceLabel}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Psychoedukation -->
                ${pattern.psychoeducation ? `
                    <div style="padding: 25px; border-bottom: 1px solid var(--gray-200);">
                        <h4 style="color: var(--primary); margin: 0 0 15px 0; display: flex; align-items: center; gap: 10px;">
                            <span style="font-size: 1.3rem;">📚</span> Was bedeutet das?
                        </h4>
                        <div style="display: grid; gap: 15px;">
                            <div style="background: var(--gray-50); padding: 15px; border-radius: var(--radius); border-left: 4px solid var(--info);">
                                <strong style="color: var(--info-dark);">Was ist das?</strong>
                                <p style="margin: 8px 0 0 0; color: var(--gray-600);">${pattern.psychoeducation.whatIsIt}</p>
                            </div>
                            <div style="background: var(--gray-50); padding: 15px; border-radius: var(--radius); border-left: 4px solid var(--warning);">
                                <strong style="color: var(--warning-dark);">Warum passiert das?</strong>
                                <p style="margin: 8px 0 0 0; color: var(--gray-600);">${pattern.psychoeducation.whyHappens}</p>
                            </div>
                            <div style="background: var(--gray-50); padding: 15px; border-radius: var(--radius); border-left: 4px solid var(--success);">
                                <strong style="color: var(--success-dark);">Was hilft?</strong>
                                <p style="margin: 8px 0 0 0; color: var(--gray-600);">${pattern.psychoeducation.whatHelps}</p>
                            </div>
                            <div style="background: var(--gray-50); padding: 15px; border-radius: var(--radius); border-left: 4px solid var(--primary);">
                                <strong style="color: var(--primary-dark);">Prognose</strong>
                                <p style="margin: 8px 0 0 0; color: var(--gray-600);">${pattern.psychoeducation.prognosis}</p>
                            </div>
                        </div>
                    </div>
                ` : ''}

                <!-- Interventionen -->
                ${pattern.interventions ? `
                    <div style="padding: 25px; border-bottom: 1px solid var(--gray-200);">
                        <h4 style="color: var(--primary); margin: 0 0 15px 0; display: flex; align-items: center; gap: 10px;">
                            <span style="font-size: 1.3rem;">🛠️</span> Empfohlene Interventionen
                        </h4>
                        <div style="display: grid; gap: 15px;">
                            ${pattern.interventions.immediate ? `
                                <div>
                                    <strong style="color: var(--danger);">🚨 Sofortmaßnahmen:</strong>
                                    <ul style="margin: 10px 0 0 0; padding-left: 20px; color: var(--gray-600);">
                                        ${pattern.interventions.immediate.map(i => `<li style="margin-bottom: 6px;">${i}</li>`).join('')}
                                    </ul>
                                </div>
                            ` : ''}
                            ${pattern.interventions.medium ? `
                                <div>
                                    <strong style="color: var(--warning-dark);">📅 Mittelfristig:</strong>
                                    <ul style="margin: 10px 0 0 0; padding-left: 20px; color: var(--gray-600);">
                                        ${pattern.interventions.medium.map(i => `<li style="margin-bottom: 6px;">${i}</li>`).join('')}
                                    </ul>
                                </div>
                            ` : ''}
                            ${pattern.interventions.school ? `
                                <div>
                                    <strong style="color: var(--info-dark);">🏫 Schule:</strong>
                                    <ul style="margin: 10px 0 0 0; padding-left: 20px; color: var(--gray-600);">
                                        ${pattern.interventions.school.map(i => `<li style="margin-bottom: 6px;">${i}</li>`).join('')}
                                    </ul>
                                </div>
                            ` : ''}
                            ${pattern.interventions.family ? `
                                <div>
                                    <strong style="color: var(--success-dark);">👨‍👩‍👧 Familie:</strong>
                                    <ul style="margin: 10px 0 0 0; padding-left: 20px; color: var(--gray-600);">
                                        ${pattern.interventions.family.map(i => `<li style="margin-bottom: 6px;">${i}</li>`).join('')}
                                    </ul>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                ` : ''}

                <!-- Differenzialdiagnosen -->
                ${pattern.differentialDiagnosis ? `
                    <div style="padding: 25px; background: var(--gray-50);">
                        <h4 style="color: var(--gray-600); margin: 0 0 10px 0; font-size: 0.9rem;">
                            🔄 Differenzialdiagnostisch zu bedenken:
                        </h4>
                        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                            ${pattern.differentialDiagnosis.map(dd => `
                                <span style="background: white; padding: 6px 12px; border-radius: var(--radius-full);
                                             font-size: 0.85rem; color: var(--gray-600); border: 1px solid var(--gray-300);">
                                    ${this.getDifferentialLabel(dd)}
                                </span>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
    },

    getDifferentialLabel(key) {
        const labels = {
            'anxiety': 'Angststörung',
            'adhs': 'ADHS',
            'trauma': 'Traumafolgestörung',
            'depression': 'Depression',
            'asd': 'Autismus-Spektrum',
            'sleep_disorder': 'Schlafstörung',
            'thyroid': 'Schilddrüse',
            'intellectual_disability': 'Intellektuelle Beeinträchtigung',
            'medical': 'Medizinische Ursache',
            'substance': 'Substanzeinfluss',
            'social_anxiety': 'Soziale Angst',
            'language_disorder': 'Sprachstörung',
            'ocd': 'Zwangsstörung',
            'ptsd': 'PTBS'
        };
        return labels[key] || key;
    },

    // ============================================
    // PERSISTENZ
    // ============================================

    saveState() {
        const saveData = {
            responses: this.state.responses,
            completedModules: this.state.completedModules,
            alerts: this.state.alerts
        };
        localStorage.setItem('clinical_assessment_state', JSON.stringify(saveData));
    },

    loadState() {
        const saved = localStorage.getItem('clinical_assessment_state');
        if (saved) {
            const data = JSON.parse(saved);
            this.state.responses = data.responses || {};
            this.state.completedModules = data.completedModules || [];
            this.state.alerts = data.alerts || [];
        }
    },

    resetState() {
        this.state = {
            currentModule: null,
            currentQuestionIndex: 0,
            responses: {},
            completedModules: [],
            hypotheses: [],
            alerts: []
        };
        localStorage.removeItem('clinical_assessment_state');
    },

    // ============================================
    // INITIALISIERUNG
    // ============================================

    init(containerId) {
        this.loadState();
        this.renderAssessmentHome(containerId);
    }
};

// Global verfügbar machen
window.ClinicalAssessment = ClinicalAssessment;
