/* ============================================
   BauMeister - Main Game Logic
   State management, UI control, game flow
   CDSE Luxembourg
   ============================================ */

(function () {
    'use strict';

    // ---- Game State ----
    const state = {
        playerName: '',
        currentScreen: 'start',
        introStep: 0,
        // Progress: { gefuehl: 0, freundschaft: 0, staerke: 0, worte: 0, ruhe: 0 }
        // Each goes from 0 (not started) to 3 (completed)
        progress: {},
        currentBuilding: null,
        currentLevel: null,
        activityState: {},
        totalCompleted: 0,
    };

    const buildingIds = ['gefuehl', 'freundschaft', 'staerke', 'worte', 'ruhe'];

    // ---- Initialize ----
    function initState() {
        buildingIds.forEach((id) => { state.progress[id] = 0; });
        state.totalCompleted = 0;

        // Try to load saved progress
        try {
            const saved = localStorage.getItem('baumeister_save');
            if (saved) {
                const data = JSON.parse(saved);
                if (data.progress) {
                    Object.assign(state.progress, data.progress);
                    state.playerName = data.playerName || '';
                    state.totalCompleted = Object.values(state.progress).reduce((a, b) => a + b, 0);
                }
            }
        } catch (e) { /* ignore */ }
    }

    function saveState() {
        try {
            localStorage.setItem('baumeister_save', JSON.stringify({
                playerName: state.playerName,
                progress: state.progress,
            }));
        } catch (e) { /* ignore */ }
    }

    // ---- Screen Management ----
    function showScreen(screenId) {
        document.querySelectorAll('.screen').forEach((s) => s.classList.remove('active'));
        const screen = document.getElementById(screenId);
        if (screen) screen.classList.add('active');
        state.currentScreen = screenId;

        if (screenId === 'game-screen') {
            if (GameEngine.isReady()) {
                GameEngine.resume();
                // Trigger resize to ensure canvas is properly sized
                window.dispatchEvent(new Event('resize'));
            }
        } else {
            GameEngine.pause();
        }
    }

    // ---- Toast Notifications ----
    function showToast(text, icon) {
        const toast = document.getElementById('toast');
        document.getElementById('toast-text').textContent = text;
        document.getElementById('toast-icon').textContent = icon || '\u2139';
        toast.classList.remove('hidden');
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.classList.add('hidden'), 400);
        }, 3000);
    }

    // ---- HUD Update ----
    function updateHUD() {
        document.getElementById('hud-name').textContent = state.playerName;
        const total = state.totalCompleted;
        const fill = document.getElementById('hud-progress-fill');
        const text = document.getElementById('hud-progress-text');
        fill.style.width = ((total / 15) * 100) + '%';
        text.textContent = total + ' / 15';
    }

    // ---- Start Screen ----
    function setupStartScreen() {
        const input = document.getElementById('player-name');
        const btn = document.getElementById('btn-start');

        if (state.playerName) {
            input.value = state.playerName;
            btn.disabled = false;
        }

        input.addEventListener('input', () => {
            const val = input.value.trim();
            btn.disabled = val.length < 1;
            state.playerName = val;
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !btn.disabled) {
                btn.click();
            }
        });

        btn.addEventListener('click', () => {
            state.playerName = input.value.trim();
            if (state.playerName.length < 1) return;

            // Check if we have saved progress
            if (state.totalCompleted > 0) {
                initGameWorld();
                showScreen('game-screen');
                showToast('Willkommen zurück, ' + state.playerName + '!', '\u{1F44B}');
            } else {
                showIntro();
            }
        });
    }

    // ---- Intro ----
    function showIntro() {
        state.introStep = 0;
        showScreen('intro-screen');
        renderIntroStep();
    }

    function renderIntroStep() {
        const content = document.getElementById('intro-content');
        const btn = document.getElementById('btn-intro-next');

        const steps = [
            {
                html: `
                    <h2>Hallo ${state.playerName}! \u{1F44B}</h2>
                    <p>Willkommen auf <strong>deiner ganz pers\u00F6nlichen Baustelle</strong>!</p>
                    <p>Hier bist du der <strong>BauMeister</strong> \u2013 und du baust an etwas ganz Besonderem: <em>an dir selbst</em>.</p>
                    <p>Jeder Mensch hat Bereiche, an denen er arbeiten kann \u2013 genau wie bei einem Bauwerk. Und genau das machen wir hier zusammen!</p>
                `,
            },
            {
                html: `
                    <h2>Deine 5 Baustellen</h2>
                    <p>Auf deiner Baustelle gibt es <strong>5 Geb\u00E4ude</strong>, die darauf warten, von dir gebaut zu werden:</p>
                    <div class="intro-buildings-preview">
                        <div class="intro-building-card">
                            <div class="intro-building-dot" style="background:#f59e0b"></div>
                            <span>Gef\u00FChls-Werkstatt</span>
                        </div>
                        <div class="intro-building-card">
                            <div class="intro-building-dot" style="background:#3b82f6"></div>
                            <span>Br\u00FCcke der Freundschaft</span>
                        </div>
                        <div class="intro-building-card">
                            <div class="intro-building-dot" style="background:#10b981"></div>
                            <span>Turm der St\u00E4rke</span>
                        </div>
                        <div class="intro-building-card">
                            <div class="intro-building-dot" style="background:#8b5cf6"></div>
                            <span>Haus der Worte</span>
                        </div>
                        <div class="intro-building-card">
                            <div class="intro-building-dot" style="background:#06b6d4"></div>
                            <span>Garten der Ruhe</span>
                        </div>
                    </div>
                `,
            },
            {
                html: `
                    <h2>So funktioniert's</h2>
                    <p>Bewege dich mit <strong>W/A/S/D</strong> oder den <strong>Pfeiltasten</strong> durch die Baustelle.</p>
                    <p>Drehe die Kamera mit der <strong>Maus</strong> (klicken + ziehen).</p>
                    <p>Gehe zu einem Geb\u00E4ude und dr\u00FCcke <strong>E</strong>, um es zu betreten.</p>
                    <p>Jedes Geb\u00E4ude hat <strong>3 Aufgaben</strong>. Mit jeder Aufgabe w\u00E4chst dein Geb\u00E4ude!</p>
                    <p style="margin-top:16px;color:var(--color-primary);font-weight:700;">Bereit? Dann lass uns bauen! \u{1F3D7}</p>
                `,
            },
        ];

        if (state.introStep < steps.length) {
            content.innerHTML = steps[state.introStep].html;
            btn.textContent = state.introStep < steps.length - 1 ? 'Weiter \u2192' : 'Los geht\'s! \u{1F680}';
        }

        btn.onclick = () => {
            state.introStep++;
            if (state.introStep >= steps.length) {
                initGameWorld();
                showScreen('game-screen');
                showToast('Viel Spa\u00DF auf deiner Baustelle!', '\u{1F3D7}');
            } else {
                renderIntroStep();
            }
        };
    }

    // ---- Game World Initialization ----
    function initGameWorld() {
        const canvas = document.getElementById('game-canvas');
        if (!canvas._initialized) {
            GameEngine.init(canvas, onBuildingInteract);
            canvas._initialized = true;
        }

        // Apply saved progress to buildings
        buildingIds.forEach((id, i) => {
            GameEngine.updateBuildingProgress(i, state.progress[id]);
        });

        updateHUD();
        saveState();
    }

    // ---- Building Interaction ----
    function onBuildingInteract(buildingIndex) {
        state.currentBuilding = buildingIndex;
        const def = GameEngine.getBuildingDefs()[buildingIndex];
        const buildingId = def.id;
        const progress = state.progress[buildingId];

        // Show building info panel
        const panel = document.getElementById('building-info');
        panel.classList.remove('hidden');

        document.getElementById('building-info-icon').textContent = def.icon;
        document.getElementById('building-info-title').textContent = def.name;
        document.getElementById('building-info-desc').textContent = def.description;

        const levelsContainer = document.getElementById('building-levels');
        levelsContainer.innerHTML = '';

        const activityData = ActivitiesData[buildingId];
        if (!activityData) return;

        activityData.levels.forEach((level, i) => {
            const levelNum = i + 1;
            const isCompleted = progress >= levelNum;
            const isCurrent = progress === i;
            const isLocked = progress < i;

            const item = document.createElement('div');
            item.className = 'level-item';
            if (isCompleted) item.className += ' level-completed';
            else if (isCurrent) item.className += ' level-current';
            else if (isLocked) item.className += ' level-locked';

            item.innerHTML = `
                <div class="level-number">${isCompleted ? '\u2713' : levelNum}</div>
                <div class="level-info">
                    <div class="level-title">${level.title}</div>
                    <div class="level-subtitle">${level.subtitle}</div>
                </div>
                <div class="level-status">${isCompleted ? '\u2705' : isCurrent ? '\u{1F449}' : '\u{1F512}'}</div>
            `;

            if (!isLocked) {
                item.addEventListener('click', () => {
                    closeBuildingInfo();
                    startActivity(buildingId, i);
                });
            }

            levelsContainer.appendChild(item);
        });

        GameEngine.pause();
    }

    function closeBuildingInfo() {
        document.getElementById('building-info').classList.add('hidden');
    }

    // ---- Activity System ----
    function startActivity(buildingId, levelIndex) {
        state.currentBuilding = buildingIds.indexOf(buildingId);
        state.currentLevel = levelIndex;
        state.activityState = {};

        const def = GameEngine.getBuildingDefs()[state.currentBuilding];
        const activityData = ActivitiesData[buildingId].levels[levelIndex];

        // Setup header
        const badge = document.getElementById('activity-badge');
        badge.textContent = def.icon + ' ' + def.name;
        badge.style.background = def.cssColor + '22';
        badge.style.color = def.cssColor;
        badge.style.border = '1px solid ' + def.cssColor;

        document.getElementById('activity-title').textContent = activityData.title;
        document.getElementById('activity-level-badge').textContent = 'Level ' + (levelIndex + 1) + ' / 3';

        // Render activity body
        const body = document.getElementById('activity-body');
        body.innerHTML = '';

        // Setup buttons
        const submitBtn = document.getElementById('btn-activity-submit');
        const nextBtn = document.getElementById('btn-activity-next');
        submitBtn.classList.add('hidden');
        nextBtn.classList.add('hidden');

        // Render based on type
        switch (activityData.type) {
            case 'matching':
                renderMatchingActivity(body, activityData, submitBtn);
                break;
            case 'thermometer':
                renderThermometerActivity(body, activityData, nextBtn);
                break;
            case 'choice_scenarios':
                renderChoiceScenarios(body, activityData, nextBtn);
                break;
            case 'sorting':
                renderSortingActivity(body, activityData, submitBtn);
                break;
            case 'strengths':
                renderStrengthsActivity(body, activityData, submitBtn);
                break;
            case 'transform':
                renderTransformActivity(body, activityData, submitBtn);
                break;
            case 'goals':
                renderGoalsActivity(body, activityData, submitBtn);
                break;
            case 'transform_messages':
                renderTransformMessagesActivity(body, activityData, submitBtn);
                break;
            case 'breathing':
                renderBreathingActivity(body, activityData, nextBtn);
                break;
            case 'safe_place':
                renderSafePlaceActivity(body, activityData, submitBtn);
                break;
            case 'emergency_kit':
                renderEmergencyKitActivity(body, activityData, submitBtn);
                break;
        }

        showScreen('activity-screen');
    }

    // ---- Activity: Matching (Emotions) ----
    function renderMatchingActivity(container, data, submitBtn) {
        // Intro
        const intro = document.createElement('p');
        intro.className = 'reflection-prompt';
        intro.textContent = data.intro;
        container.appendChild(intro);

        const matchDiv = document.createElement('div');
        matchDiv.className = 'match-container';

        state.activityState.answers = {};

        data.items.forEach((item, i) => {
            const row = document.createElement('div');
            row.className = 'match-row';

            const left = document.createElement('div');
            left.className = 'match-left';
            left.textContent = item.situation;

            const arrow = document.createElement('span');
            arrow.className = 'match-arrow';
            arrow.textContent = '\u2192';

            const select = document.createElement('select');
            select.className = 'match-select';
            select.dataset.index = i;

            const defaultOpt = document.createElement('option');
            defaultOpt.value = '';
            defaultOpt.textContent = 'W\u00E4hle...';
            select.appendChild(defaultOpt);

            // Shuffle options
            const opts = [...item.options].sort(() => Math.random() - 0.5);
            opts.forEach((opt) => {
                const o = document.createElement('option');
                o.value = opt;
                o.textContent = opt;
                select.appendChild(o);
            });

            select.addEventListener('change', () => {
                state.activityState.answers[i] = select.value;
                checkAllAnswered();
            });

            row.appendChild(left);
            row.appendChild(arrow);
            row.appendChild(select);
            matchDiv.appendChild(row);
        });

        container.appendChild(matchDiv);

        function checkAllAnswered() {
            const allAnswered = data.items.every((_, i) => state.activityState.answers[i]);
            submitBtn.classList.toggle('hidden', !allAnswered);
        }

        submitBtn.onclick = () => {
            let correct = 0;
            data.items.forEach((item, i) => {
                if (state.activityState.answers[i] === item.correctEmotion) correct++;
            });

            // Show results on selects
            matchDiv.querySelectorAll('select').forEach((sel) => {
                const idx = parseInt(sel.dataset.index);
                const isCorrect = state.activityState.answers[idx] === data.items[idx].correctEmotion;
                sel.style.borderColor = isCorrect ? 'var(--color-success)' : 'var(--color-error)';
                sel.style.background = isCorrect ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)';
            });

            const ratio = correct / data.items.length;
            if (ratio >= 0.7) {
                setTimeout(() => showActivityFeedback(true, data.successMessage), 500);
            } else {
                setTimeout(() => showActivityFeedback(false, data.failMessage || 'Versuch es nochmal! Du schaffst das!'), 500);
            }
        };
    }

    // ---- Activity: Thermometer ----
    function renderThermometerActivity(container, data, nextBtn) {
        const intro = document.createElement('p');
        intro.className = 'reflection-prompt';
        intro.textContent = data.intro;
        container.appendChild(intro);

        state.activityState.currentScenario = 0;
        state.activityState.completed = 0;

        function renderScenario(index) {
            container.innerHTML = '';
            const scenario = data.scenarios[index];

            const thermoDiv = document.createElement('div');
            thermoDiv.className = 'thermometer-container';

            const scText = document.createElement('div');
            scText.className = 'scenario-card';
            scText.innerHTML = `
                <p class="scenario-text">"${scenario.text}"</p>
                <p style="font-weight:600;color:var(--color-primary);">Gef\u00FChl: ${scenario.emotion}</p>
            `;
            thermoDiv.appendChild(scText);

            const question = document.createElement('p');
            question.className = 'scenario-question';
            question.textContent = 'Wie stark ist dieses Gef\u00FChl? (1 = kaum sp\u00FCrbar, 10 = \u00FCberw\u00E4ltigend)';
            thermoDiv.appendChild(question);

            const value = document.createElement('div');
            value.className = 'thermometer-value';
            value.textContent = '5';
            thermoDiv.appendChild(value);

            const slider = document.createElement('input');
            slider.type = 'range';
            slider.min = '1';
            slider.max = '10';
            slider.value = '5';
            slider.className = 'thermometer-slider';
            slider.addEventListener('input', () => {
                value.textContent = slider.value;
            });
            thermoDiv.appendChild(slider);

            const labels = document.createElement('div');
            labels.className = 'thermometer-labels';
            labels.innerHTML = '<span>Kaum sp\u00FCrbar</span><span>Mittel</span><span>\u00DCberw\u00E4ltigend</span>';
            thermoDiv.appendChild(labels);

            // Body hints
            const hintsTitle = document.createElement('p');
            hintsTitle.style.cssText = 'margin-top:20px;font-weight:600;';
            hintsTitle.textContent = 'Wo sp\u00FCrst du das im K\u00F6rper?';
            thermoDiv.appendChild(hintsTitle);

            const hintsGrid = document.createElement('div');
            hintsGrid.className = 'choices-grid';
            scenario.bodyHints.forEach((hint) => {
                const btn = document.createElement('button');
                btn.className = 'choice-btn';
                btn.textContent = hint;
                btn.addEventListener('click', () => btn.classList.toggle('selected'));
                hintsGrid.appendChild(btn);
            });
            thermoDiv.appendChild(hintsGrid);

            container.appendChild(thermoDiv);

            // Progress indicator
            const prog = document.createElement('div');
            prog.className = 'breathing-progress';
            prog.style.justifyContent = 'center';
            prog.style.marginTop = '16px';
            for (let i = 0; i < data.scenarios.length; i++) {
                const dot = document.createElement('div');
                dot.className = 'breathing-dot' + (i < index ? ' done' : '');
                prog.appendChild(dot);
            }
            container.appendChild(prog);

            nextBtn.classList.remove('hidden');
            nextBtn.textContent = index < data.scenarios.length - 1 ? 'N\u00E4chstes Szenario \u2192' : 'Abschlie\u00DFen \u2713';
            nextBtn.onclick = () => {
                if (index < data.scenarios.length - 1) {
                    renderScenario(index + 1);
                } else {
                    showActivityFeedback(true, data.successMessage);
                }
            };
        }

        renderScenario(0);
    }

    // ---- Activity: Choice Scenarios ----
    function renderChoiceScenarios(container, data, nextBtn) {
        const intro = document.createElement('p');
        intro.className = 'reflection-prompt';
        intro.textContent = data.intro;
        container.appendChild(intro);

        state.activityState.currentScenario = 0;
        state.activityState.score = 0;

        function renderScenario(index) {
            container.innerHTML = '';
            const scenario = data.scenarios[index];

            const card = document.createElement('div');
            card.className = 'scenario-card';
            card.innerHTML = `
                <p class="scenario-text">"${scenario.situation}"</p>
                <p class="scenario-question">${scenario.question}</p>
            `;
            container.appendChild(card);

            const grid = document.createElement('div');
            grid.className = 'choices-grid';

            let answered = false;

            scenario.options.forEach((opt) => {
                const btn = document.createElement('button');
                btn.className = 'choice-btn';
                btn.textContent = opt.text;

                btn.addEventListener('click', () => {
                    if (answered) return;
                    answered = true;

                    // Show all results
                    grid.querySelectorAll('.choice-btn').forEach((b, idx) => {
                        const isCorrect = scenario.options[idx].correct;
                        b.classList.add(isCorrect ? 'correct' : 'incorrect');
                    });

                    btn.classList.remove('incorrect');
                    btn.classList.add(opt.correct ? 'correct' : 'incorrect');
                    if (opt.correct) state.activityState.score++;

                    // Show explanation
                    const expl = document.createElement('div');
                    expl.className = 'scenario-card';
                    expl.style.marginTop = '16px';
                    expl.style.borderLeft = '4px solid var(--color-primary)';
                    expl.innerHTML = `<p style="color:var(--color-text-muted);line-height:1.6;">\u{1F4A1} <strong>Erklärung:</strong> ${scenario.explanation}</p>`;
                    container.appendChild(expl);

                    nextBtn.classList.remove('hidden');
                    nextBtn.textContent = index < data.scenarios.length - 1 ? 'N\u00E4chstes Szenario \u2192' : 'Abschlie\u00DFen \u2713';
                });

                grid.appendChild(btn);
            });

            container.appendChild(grid);

            // Progress dots
            const prog = document.createElement('div');
            prog.className = 'breathing-progress';
            prog.style.cssText = 'justify-content:center;margin-top:16px;';
            for (let i = 0; i < data.scenarios.length; i++) {
                const dot = document.createElement('div');
                dot.className = 'breathing-dot' + (i < index ? ' done' : '');
                prog.appendChild(dot);
            }
            container.appendChild(prog);

            nextBtn.classList.add('hidden');
            nextBtn.onclick = () => {
                if (index < data.scenarios.length - 1) {
                    renderScenario(index + 1);
                } else {
                    showActivityFeedback(true, data.successMessage);
                }
            };
        }

        renderScenario(0);
    }

    // ---- Activity: Sorting ----
    function renderSortingActivity(container, data, submitBtn) {
        const intro = document.createElement('p');
        intro.className = 'reflection-prompt';
        intro.textContent = data.intro;
        container.appendChild(intro);

        state.activityState.placements = {};

        // Categories
        const catDiv = document.createElement('div');
        catDiv.className = 'sort-categories';

        const categoryDropZones = {};

        data.categories.forEach((cat) => {
            const zone = document.createElement('div');
            zone.className = 'sort-category';
            zone.dataset.categoryId = cat.id;

            const title = document.createElement('div');
            title.className = 'sort-category-title';
            title.style.color = cat.color;
            title.textContent = cat.title;
            zone.appendChild(title);

            const itemsArea = document.createElement('div');
            itemsArea.style.cssText = 'display:flex;flex-wrap:wrap;gap:6px;min-height:40px;';
            itemsArea.dataset.categoryId = cat.id;
            zone.appendChild(itemsArea);

            // Drop handling via click (simpler than drag-and-drop for all devices)
            zone.addEventListener('click', () => {
                const selected = container.querySelector('.sort-item.selected-for-move');
                if (selected) {
                    const itemIdx = selected.dataset.index;
                    state.activityState.placements[itemIdx] = cat.id;

                    // Move visually
                    selected.classList.remove('selected-for-move');
                    selected.classList.add('placed');
                    selected.style.borderColor = cat.color;
                    itemsArea.appendChild(selected);

                    checkAllPlaced();
                }
            });

            catDiv.appendChild(zone);
            categoryDropZones[cat.id] = zone;
        });

        container.appendChild(catDiv);

        // Items to sort
        const itemsDiv = document.createElement('div');
        itemsDiv.className = 'sort-items';
        itemsDiv.id = 'sort-items-pool';

        const shuffled = data.items.map((item, i) => ({ ...item, origIndex: i }))
            .sort(() => Math.random() - 0.5);

        shuffled.forEach((item) => {
            const el = document.createElement('div');
            el.className = 'sort-item';
            el.textContent = item.text;
            el.dataset.index = item.origIndex;

            el.addEventListener('click', (e) => {
                e.stopPropagation();
                // If placed, bring back
                if (el.classList.contains('placed')) {
                    el.classList.remove('placed');
                    el.style.borderColor = '';
                    delete state.activityState.placements[item.origIndex];
                    itemsDiv.appendChild(el);
                    checkAllPlaced();
                    return;
                }
                // Toggle selection
                container.querySelectorAll('.sort-item.selected-for-move').forEach((s) => s.classList.remove('selected-for-move'));
                el.classList.add('selected-for-move');
            });

            itemsDiv.appendChild(el);
        });

        container.appendChild(itemsDiv);

        // Instructions
        const hint = document.createElement('p');
        hint.style.cssText = 'font-size:0.85rem;color:var(--color-text-muted);margin-top:12px;text-align:center;';
        hint.textContent = 'Klicke auf ein Element, dann klicke auf die passende Kategorie.';
        container.appendChild(hint);

        function checkAllPlaced() {
            const allPlaced = Object.keys(state.activityState.placements).length === data.items.length;
            submitBtn.classList.toggle('hidden', !allPlaced);
        }

        submitBtn.onclick = () => {
            let correct = 0;
            data.items.forEach((item, i) => {
                const placed = state.activityState.placements[i];
                if (placed === item.correct) correct++;
            });

            // Visual feedback
            container.querySelectorAll('.sort-item').forEach((el) => {
                const idx = parseInt(el.dataset.index);
                const isCorrect = state.activityState.placements[idx] === data.items[idx].correct;
                el.style.background = isCorrect ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)';
                el.style.borderColor = isCorrect ? 'var(--color-success)' : 'var(--color-error)';
            });

            const ratio = correct / data.items.length;
            if (ratio >= 0.7) {
                setTimeout(() => showActivityFeedback(true, data.successMessage), 600);
            } else {
                setTimeout(() => showActivityFeedback(false, data.failMessage || 'Versuch es nochmal!'), 600);
            }
        };
    }

    // ---- Activity: Strengths ----
    function renderStrengthsActivity(container, data, submitBtn) {
        const intro = document.createElement('p');
        intro.className = 'reflection-prompt';
        intro.textContent = data.intro;
        container.appendChild(intro);

        state.activityState.selected = new Set();

        const grid = document.createElement('div');
        grid.className = 'strength-grid';

        data.strengths.forEach((str, i) => {
            const item = document.createElement('div');
            item.className = 'strength-item';
            item.innerHTML = `<div class="strength-check"></div><span>${str}</span>`;

            item.addEventListener('click', () => {
                if (state.activityState.selected.has(i)) {
                    state.activityState.selected.delete(i);
                    item.classList.remove('selected');
                } else {
                    state.activityState.selected.add(i);
                    item.classList.add('selected');
                }
                submitBtn.classList.toggle('hidden', state.activityState.selected.size < data.minRequired);
            });

            grid.appendChild(item);
        });

        container.appendChild(grid);

        const counter = document.createElement('p');
        counter.style.cssText = 'text-align:center;margin-top:12px;font-size:0.9rem;color:var(--color-text-muted);';
        counter.textContent = `W\u00E4hle mindestens ${data.minRequired} St\u00E4rken aus, die zu dir passen.`;
        container.appendChild(counter);

        submitBtn.onclick = () => {
            if (state.activityState.selected.size >= data.minRequired) {
                showActivityFeedback(true, data.successMessage);
            }
        };
    }

    // ---- Activity: Transform (Negative → Positive Thoughts) ----
    function renderTransformActivity(container, data, submitBtn) {
        const intro = document.createElement('p');
        intro.className = 'reflection-prompt';
        intro.textContent = data.intro;
        container.appendChild(intro);

        state.activityState.inputs = {};

        data.transforms.forEach((t, i) => {
            const card = document.createElement('div');
            card.className = 'transform-card';

            card.innerHTML = `
                <div class="transform-original">
                    <span style="font-size:1.3rem;">\u{1F6AB}</span>
                    <span>${t.negative}</span>
                </div>
                <div class="transform-arrow">\u2B07 Wandle um in \u2B07</div>
            `;

            const input = document.createElement('textarea');
            input.className = 'reflection-area';
            input.style.minHeight = '60px';
            input.placeholder = 'Schreibe hier einen positiven Gedanken...';
            input.addEventListener('input', () => {
                state.activityState.inputs[i] = input.value;
                checkAllFilled();
            });
            card.appendChild(input);

            const hint = document.createElement('p');
            hint.className = 'transform-hint';
            hint.textContent = '\u{1F4A1} ' + t.hint;
            card.appendChild(hint);

            // Show examples collapsed
            const exBtn = document.createElement('button');
            exBtn.className = 'btn btn-secondary';
            exBtn.style.cssText = 'margin-top:8px;padding:6px 12px;font-size:0.8rem;';
            exBtn.textContent = 'Beispiele anzeigen';
            exBtn.addEventListener('click', () => {
                const exDiv = card.querySelector('.examples');
                if (exDiv) {
                    exDiv.remove();
                    exBtn.textContent = 'Beispiele anzeigen';
                } else {
                    const div = document.createElement('div');
                    div.className = 'examples';
                    div.style.cssText = 'margin-top:8px;padding:10px;background:rgba(16,185,129,0.1);border-radius:8px;';
                    t.examples.forEach((ex) => {
                        const p = document.createElement('p');
                        p.style.cssText = 'font-size:0.9rem;color:var(--color-success);margin:4px 0;';
                        p.textContent = '\u2713 ' + ex;
                        div.appendChild(p);
                    });
                    card.appendChild(div);
                    exBtn.textContent = 'Beispiele ausblenden';
                }
            });
            card.appendChild(exBtn);

            container.appendChild(card);
        });

        function checkAllFilled() {
            const allFilled = data.transforms.every((_, i) =>
                state.activityState.inputs[i] && state.activityState.inputs[i].trim().length > 5
            );
            submitBtn.classList.toggle('hidden', !allFilled);
        }

        submitBtn.onclick = () => {
            showActivityFeedback(true, data.successMessage);
        };
    }

    // ---- Activity: Goals ----
    function renderGoalsActivity(container, data, submitBtn) {
        const intro = document.createElement('p');
        intro.className = 'reflection-prompt';
        intro.textContent = data.intro;
        container.appendChild(intro);

        state.activityState.goals = {};

        const pyramid = document.createElement('div');
        pyramid.className = 'pyramid-container';

        data.goalLevels.forEach((level, i) => {
            const levelDiv = document.createElement('div');
            levelDiv.className = 'pyramid-level';

            const label = document.createElement('div');
            label.className = 'pyramid-label';
            label.textContent = level.label;
            levelDiv.appendChild(label);

            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'pyramid-input';
            input.placeholder = level.placeholder;
            input.style.width = (300 - i * 40) + 'px';
            input.addEventListener('input', () => {
                state.activityState.goals[i] = input.value;
                checkAllFilled();
            });
            levelDiv.appendChild(input);

            const hint = document.createElement('p');
            hint.style.cssText = 'font-size:0.8rem;color:var(--color-text-muted);margin-top:4px;';
            hint.textContent = level.hint;
            levelDiv.appendChild(hint);

            pyramid.appendChild(levelDiv);
        });

        container.appendChild(pyramid);

        function checkAllFilled() {
            const allFilled = data.goalLevels.every((_, i) =>
                state.activityState.goals[i] && state.activityState.goals[i].trim().length > 3
            );
            submitBtn.classList.toggle('hidden', !allFilled);
        }

        submitBtn.onclick = () => {
            showActivityFeedback(true, data.successMessage);
        };
    }

    // ---- Activity: Transform Messages (Ich-Botschaften) ----
    function renderTransformMessagesActivity(container, data, submitBtn) {
        const intro = document.createElement('p');
        intro.className = 'reflection-prompt';
        intro.textContent = data.intro;
        container.appendChild(intro);

        // Show formula
        const formula = document.createElement('div');
        formula.className = 'scenario-card';
        formula.style.borderLeft = '4px solid var(--color-worte, #8b5cf6)';
        formula.innerHTML = `<p style="font-weight:700;color:var(--color-primary);">\u{1F4DD} Formel f\u00FCr Ich-Botschaften:</p><p style="font-size:1.05rem;margin-top:8px;">"${data.formula}"</p>`;
        container.appendChild(formula);

        state.activityState.inputs = {};

        data.transforms.forEach((t, i) => {
            const card = document.createElement('div');
            card.className = 'transform-card';

            card.innerHTML = `
                <div class="transform-original">
                    <span style="font-size:1.2rem;">\u274C</span>
                    <span><strong>Du-Botschaft:</strong> "${t.duMessage}"</span>
                </div>
                <p style="font-size:0.9rem;color:var(--color-text-muted);margin:8px 0;">\u{1F4CD} Situation: ${t.situation}</p>
                <div class="transform-arrow">\u2B07 Mache eine Ich-Botschaft daraus \u2B07</div>
            `;

            const fields = ['gefuehl', 'situation', 'grund', 'wunsch'];
            const labels = {
                gefuehl: 'Ich f\u00FChle mich...',
                situation: 'wenn...',
                grund: 'weil...',
                wunsch: 'Ich w\u00FCnsche mir...',
            };

            if (!state.activityState.inputs[i]) state.activityState.inputs[i] = {};

            fields.forEach((field) => {
                const row = document.createElement('div');
                row.style.cssText = 'margin-bottom:8px;';

                const lbl = document.createElement('label');
                lbl.style.cssText = 'font-size:0.85rem;font-weight:600;color:var(--color-text-muted);display:block;margin-bottom:4px;';
                lbl.textContent = labels[field];
                row.appendChild(lbl);

                const input = document.createElement('input');
                input.type = 'text';
                input.className = 'transform-input';
                input.placeholder = t.correctParts[field];
                input.style.fontSize = '0.9rem';
                input.addEventListener('input', () => {
                    state.activityState.inputs[i][field] = input.value;
                    checkAllFilled();
                });
                row.appendChild(input);

                card.appendChild(row);
            });

            container.appendChild(card);
        });

        function checkAllFilled() {
            const allFilled = data.transforms.every((_, i) => {
                const inp = state.activityState.inputs[i];
                return inp && inp.gefuehl && inp.gefuehl.trim().length > 1;
            });
            submitBtn.classList.toggle('hidden', !allFilled);
        }

        submitBtn.onclick = () => {
            showActivityFeedback(true, data.successMessage);
        };
    }

    // ---- Activity: Breathing ----
    function renderBreathingActivity(container, data, nextBtn) {
        const intro = document.createElement('p');
        intro.className = 'reflection-prompt';
        intro.textContent = data.intro;
        container.appendChild(intro);

        const breathDiv = document.createElement('div');
        breathDiv.className = 'breathing-container';

        const circle = document.createElement('div');
        circle.className = 'breathing-circle';
        circle.textContent = 'Bereit?';
        breathDiv.appendChild(circle);

        const instruction = document.createElement('div');
        instruction.className = 'breathing-instruction';
        instruction.textContent = data.exercise.description;
        breathDiv.appendChild(instruction);

        const counter = document.createElement('div');
        counter.className = 'breathing-counter';
        counter.textContent = '';
        breathDiv.appendChild(counter);

        // Progress dots
        const progress = document.createElement('div');
        progress.className = 'breathing-progress';
        for (let i = 0; i < data.exercise.cycles; i++) {
            const dot = document.createElement('div');
            dot.className = 'breathing-dot';
            progress.appendChild(dot);
        }
        breathDiv.appendChild(progress);

        const startBtn = document.createElement('button');
        startBtn.className = 'btn btn-primary';
        startBtn.textContent = '\u{1F32C} \u00DCbung starten';
        breathDiv.appendChild(startBtn);

        container.appendChild(breathDiv);

        startBtn.addEventListener('click', () => {
            startBtn.classList.add('hidden');
            runBreathingExercise(
                circle, instruction, counter, progress,
                data.exercise, data, nextBtn
            );
        });
    }

    function runBreathingExercise(circle, instruction, counter, progressDiv, exercise, data, nextBtn) {
        let cycle = 0;
        const dots = progressDiv.querySelectorAll('.breathing-dot');

        function runCycle() {
            if (cycle >= exercise.cycles) {
                circle.className = 'breathing-circle';
                circle.textContent = '\u2713';
                instruction.textContent = 'Fertig! Wie f\u00FChlst du dich jetzt?';
                counter.textContent = '';
                showActivityFeedback(true, data.successMessage);
                return;
            }

            // Inhale
            circle.className = 'breathing-circle inhale';
            circle.textContent = 'Einatmen';
            instruction.textContent = 'Atme langsam durch die Nase ein...';
            countDown(exercise.inhaleTime, counter, () => {
                // Hold
                circle.className = 'breathing-circle';
                circle.textContent = 'Halten';
                circle.style.transform = 'scale(1.4)';
                instruction.textContent = 'Halte den Atem...';
                countDown(exercise.holdTime, counter, () => {
                    // Exhale
                    circle.className = 'breathing-circle exhale';
                    circle.textContent = 'Ausatmen';
                    instruction.textContent = 'Atme langsam durch den Mund aus...';
                    countDown(exercise.exhaleTime, counter, () => {
                        dots[cycle].classList.add('done');
                        cycle++;
                        circle.style.transform = '';
                        setTimeout(runCycle, 500);
                    });
                });
            });
        }

        runCycle();
    }

    function countDown(seconds, el, callback) {
        let remaining = seconds;
        el.textContent = remaining;
        const interval = setInterval(() => {
            remaining--;
            el.textContent = remaining > 0 ? remaining : '';
            if (remaining <= 0) {
                clearInterval(interval);
                callback();
            }
        }, 1000);
    }

    // ---- Activity: Safe Place ----
    function renderSafePlaceActivity(container, data, submitBtn) {
        const intro = document.createElement('p');
        intro.className = 'reflection-prompt';
        intro.textContent = data.intro;
        container.appendChild(intro);

        state.activityState.answers = {};

        data.prompts.forEach((prompt, i) => {
            const div = document.createElement('div');
            div.style.marginBottom = '20px';

            const q = document.createElement('p');
            q.className = 'scenario-question';
            q.textContent = prompt.question;
            div.appendChild(q);

            const input = document.createElement('textarea');
            input.className = 'reflection-area';
            input.style.minHeight = '60px';
            input.placeholder = prompt.placeholder;
            input.addEventListener('input', () => {
                state.activityState.answers[i] = input.value;
                checkAllFilled();
            });
            div.appendChild(input);

            container.appendChild(div);
        });

        function checkAllFilled() {
            const allFilled = data.prompts.every((_, i) =>
                state.activityState.answers[i] && state.activityState.answers[i].trim().length > 3
            );
            submitBtn.classList.toggle('hidden', !allFilled);
        }

        submitBtn.onclick = () => {
            showActivityFeedback(true, data.successMessage);
        };
    }

    // ---- Activity: Emergency Kit ----
    function renderEmergencyKitActivity(container, data, submitBtn) {
        const intro = document.createElement('p');
        intro.className = 'reflection-prompt';
        intro.textContent = data.intro;
        container.appendChild(intro);

        state.activityState.selected = {};

        data.categories.forEach((cat, catIdx) => {
            const section = document.createElement('div');
            section.style.marginBottom = '24px';

            const title = document.createElement('h3');
            title.style.cssText = 'font-size:1.1rem;margin-bottom:12px;';
            title.textContent = cat.icon + ' ' + cat.name;
            section.appendChild(title);

            const subtitle = document.createElement('p');
            subtitle.style.cssText = 'font-size:0.85rem;color:var(--color-text-muted);margin-bottom:10px;';
            subtitle.textContent = `W\u00E4hle mindestens ${data.minPerCategory} Strategien:`;
            section.appendChild(subtitle);

            state.activityState.selected[catIdx] = new Set();

            const grid = document.createElement('div');
            grid.className = 'strength-grid';

            cat.strategies.forEach((str, strIdx) => {
                const item = document.createElement('div');
                item.className = 'strength-item';
                item.innerHTML = `<div class="strength-check"></div><span>${str}</span>`;

                item.addEventListener('click', () => {
                    const sel = state.activityState.selected[catIdx];
                    const key = strIdx;
                    if (sel.has(key)) {
                        sel.delete(key);
                        item.classList.remove('selected');
                    } else {
                        sel.add(key);
                        item.classList.add('selected');
                    }
                    checkMinSelected();
                });

                grid.appendChild(item);
            });

            section.appendChild(grid);
            container.appendChild(section);
        });

        function checkMinSelected() {
            const allMet = data.categories.every((_, i) =>
                state.activityState.selected[i].size >= data.minPerCategory
            );
            submitBtn.classList.toggle('hidden', !allMet);
        }

        submitBtn.onclick = () => {
            showActivityFeedback(true, data.successMessage);
        };
    }

    // ---- Activity Feedback & Completion ----
    function showActivityFeedback(success, message) {
        const overlay = document.getElementById('feedback-overlay');
        const content = document.getElementById('feedback-content');

        if (success) {
            content.innerHTML = `
                <div class="feedback-icon">\u{1F3C6}</div>
                <div class="feedback-title" style="color:var(--color-success);">Geschafft!</div>
                <div class="feedback-text">${message}</div>
                <button class="feedback-btn feedback-btn-success" id="feedback-continue">Weiter</button>
            `;
        } else {
            content.innerHTML = `
                <div class="feedback-icon">\u{1F4AA}</div>
                <div class="feedback-title" style="color:var(--color-warning);">Fast!</div>
                <div class="feedback-text">${message}</div>
                <button class="feedback-btn feedback-btn-retry" id="feedback-retry">Nochmal versuchen</button>
            `;
        }

        overlay.classList.remove('hidden');

        if (success) {
            document.getElementById('feedback-continue').addEventListener('click', () => {
                overlay.classList.add('hidden');
                completeCurrentLevel();
            });
        } else {
            document.getElementById('feedback-retry').addEventListener('click', () => {
                overlay.classList.add('hidden');
                // Restart activity
                const buildingId = buildingIds[state.currentBuilding];
                startActivity(buildingId, state.currentLevel);
            });
        }
    }

    function completeCurrentLevel() {
        const buildingId = buildingIds[state.currentBuilding];
        const newProgress = state.currentLevel + 1;

        // Only update if progressing forward
        if (newProgress > state.progress[buildingId]) {
            state.progress[buildingId] = newProgress;
            state.totalCompleted = Object.values(state.progress).reduce((a, b) => a + b, 0);

            // Update 3D building
            GameEngine.updateBuildingProgress(state.currentBuilding, newProgress);
            GameEngine.spawnCelebrationParticles(state.currentBuilding);
        }

        saveState();

        // Check if all buildings complete
        const allComplete = buildingIds.every((id) => state.progress[id] >= 3);

        if (allComplete) {
            setTimeout(() => showCompletionScreen(), 500);
        } else {
            showScreen('game-screen');
            updateHUD();

            const def = GameEngine.getBuildingDefs()[state.currentBuilding];
            if (newProgress >= 3) {
                showToast(def.name + ' ist fertig! \u{1F3C6}', '\u{1F389}');
            } else {
                showToast('Level abgeschlossen! ' + def.name + ' w\u00E4chst!', '\u{1F9F1}');
            }
        }
    }

    // ---- Completion Screen ----
    function showCompletionScreen() {
        showScreen('completion-screen');

        document.getElementById('completion-name').textContent = state.playerName;

        const summary = document.getElementById('completion-summary');
        summary.innerHTML = '';

        GameEngine.getBuildingDefs().forEach((def) => {
            const div = document.createElement('div');
            div.className = 'completion-building';
            div.innerHTML = `
                <div class="completion-building-dot" style="background:${def.cssColor}"></div>
                <span class="completion-building-name">${def.name}</span>
                <span class="completion-building-check">\u2705</span>
            `;
            summary.appendChild(div);
        });

        // Simple confetti effect
        createConfetti();
    }

    function createConfetti() {
        const container = document.getElementById('completion-fireworks');
        container.innerHTML = '';
        container.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:1;overflow:hidden;';

        const colors = ['#f59e0b', '#3b82f6', '#10b981', '#8b5cf6', '#06b6d4', '#ef4444', '#fbbf24', '#f472b6'];

        for (let i = 0; i < 60; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position:absolute;
                width:${6 + Math.random() * 8}px;
                height:${6 + Math.random() * 8}px;
                background:${colors[Math.floor(Math.random() * colors.length)]};
                border-radius:${Math.random() > 0.5 ? '50%' : '2px'};
                left:${Math.random() * 100}%;
                top:${-10 - Math.random() * 20}%;
                animation: confettiFall ${2 + Math.random() * 3}s linear ${Math.random() * 2}s infinite;
            `;
            container.appendChild(particle);
        }

        // Add confetti animation
        if (!document.getElementById('confetti-style')) {
            const style = document.createElement('style');
            style.id = 'confetti-style';
            style.textContent = `
                @keyframes confettiFall {
                    0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(110vh) rotate(${360 + Math.random() * 360}deg); opacity: 0.5; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // ---- Event Listeners ----
    function setupEventListeners() {
        // Building info close
        document.getElementById('btn-close-info').addEventListener('click', () => {
            closeBuildingInfo();
            GameEngine.resume();
        });

        document.getElementById('btn-back-to-world').addEventListener('click', () => {
            closeBuildingInfo();
            showScreen('game-screen');
        });

        // Help panel
        document.getElementById('btn-help').addEventListener('click', () => {
            document.getElementById('help-panel').classList.remove('hidden');
        });

        document.getElementById('btn-close-help').addEventListener('click', () => {
            document.getElementById('help-panel').classList.add('hidden');
        });

        // Activity back
        document.getElementById('btn-activity-back').addEventListener('click', () => {
            showScreen('game-screen');
        });

        // Restart
        document.getElementById('btn-restart').addEventListener('click', () => {
            localStorage.removeItem('baumeister_save');
            buildingIds.forEach((id) => { state.progress[id] = 0; });
            state.totalCompleted = 0;
            buildingIds.forEach((_, i) => GameEngine.updateBuildingProgress(i, 0));
            showScreen('game-screen');
            updateHUD();
            showToast('Neue Runde! Viel Spa\u00DF!', '\u{1F680}');
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (state.currentScreen === 'activity-screen') {
                    showScreen('game-screen');
                } else {
                    const info = document.getElementById('building-info');
                    if (!info.classList.contains('hidden')) {
                        closeBuildingInfo();
                        GameEngine.resume();
                    }
                    const help = document.getElementById('help-panel');
                    if (!help.classList.contains('hidden')) {
                        help.classList.add('hidden');
                    }
                    const feedback = document.getElementById('feedback-overlay');
                    if (!feedback.classList.contains('hidden')) {
                        feedback.classList.add('hidden');
                    }
                }
            }
        });
    }

    // ---- Boot ----
    function boot() {
        initState();
        setupStartScreen();
        setupEventListeners();
    }

    // Start when DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();
