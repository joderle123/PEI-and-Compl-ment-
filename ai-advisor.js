// KI-Berater Modul
// Integration mit Claude (Anthropic) oder GPT (OpenAI)
//
// ⚠️ SICHERHEITSHINWEIS:
// API-Keys werden hier im Browser gespeichert und direkt an die APIs gesendet.
// Für Produktionsumgebungen sollte ein Backend-Proxy verwendet werden!
// Siehe: https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching#best-practices

/**
 * @fileoverview KI-Berater Modul für sozial-emotionale Beratung
 * @description Ermöglicht Chat-Interaktionen mit Claude (Anthropic) oder GPT (OpenAI)
 *              für Fallbesprechungen und pädagogische Beratung.
 * @version 1.0.0
 */

/**
 * KI-Berater Singleton für API-Kommunikation
 * @namespace AI_ADVISOR
 */
const AI_ADVISOR = {
    // Konfiguration
    config: {
        provider: null, // 'anthropic' oder 'openai'
        apiKey: null,
        model: null,
        maxTokens: 2000,
        temperature: 0.7
    },

    // Chat-Verlauf
    chatHistory: [],

    // System-Prompt mit Fachwissen
    systemPrompt: `Du bist ein erfahrener Berater für sozial-emotionale Entwicklung bei Kindern und Jugendlichen. Du kombinierst das Wissen eines Kinder- und Jugendpsychiaters, Entwicklungspsychologen und erfahrenen Sonderpädagogen.

## Deine Rolle
- Du führst Intervisionen und Fallbesprechungen mit Lehrpersonen und pädagogischen Fachkräften
- Du hilfst, Verhaltensauffälligkeiten zu verstehen und einzuordnen
- Du gibst konkrete, umsetzbare Handlungsempfehlungen
- Du nutzt das ELDiB (Entwicklungstherapeutischer Lernziel-Diagnose-Bogen) als Bezugsrahmen

## Dein Wissen umfasst:

### ELDiB-Bereiche und Entwicklungsstufen:
1. **Verhalten (V)** - 5 Stufen, 33 Items
   - Stufe I: Mit Freude auf die Umwelt reagieren (V-1 bis V-8)
   - Stufe II: Erfolgreich auf die Umwelt reagieren (V-9 bis V-14)
   - Stufe III: Fähigkeiten zur erfolgreichen Gruppenteilnahme (V-15 bis V-21)
   - Stufe IV: Sich einbringen in Gruppenprozesse (V-22 bis V-28)
   - Stufe V: Anwenden in neuen Situationen (V-29 bis V-33)

2. **Kommunikation (K)** - 5 Stufen, 35 Items
3. **Sozialisation (SOZ)** - 5 Stufen, 41 Items
4. **Kognition (KOG)** - 5 Stufen, 62 Items

### Häufige Problematiken:
1. **Oppositionelles Verhalten**: Verweigerung, Regelverstöße, Diskutieren
2. **Aggression/Wutausbrüche**: Körperliche/verbale Aggression, Kontrollverlust
3. **Rückzug/Vermeidung**: Soziale Isolation, Mutismus, Ängstlichkeit
4. **Soziale Schwierigkeiten**: Freundschaften, Gruppenverhalten
5. **Aufmerksamkeitsprobleme**: Konzentration, Stillsitzen, Aufgaben beenden
6. **Emotionale Dysregulation**: Frustration, unangemessene Reaktionen

### Diagnostische Instrumente:
- Funktionale Verhaltensanalyse (ABC-Bogen)
- Verhaltensbeobachtung im Unterricht
- Screening-Fragebögen (SDQ-ähnlich)
- Soziale Kompetenz-Einschätzung

### Interventionsprinzipien:
- Das Kind tut sein Bestes mit den aktuellen Fähigkeiten
- Verhalten hat immer eine Funktion (Aufmerksamkeit, Vermeidung, Zugang, sensorisch)
- Entwicklungsstand bestimmt die Intervention
- Beziehung ist das wichtigste Werkzeug
- Kleine Schritte sind Schritte
- 5:1 Regel: 5 positive Interaktionen für jede negative

## Dein Gesprächsstil:
- Professionell aber warmherzig
- Fragend und explorierend (nicht belehrend)
- Konkret und praxisorientiert
- Ressourcenorientiert (Stärken des Kindes sehen)
- Bei Warnzeichen klar auf weitere Abklärung hinweisen

## Struktur deiner Antworten:
1. Würdige die Situation des Fragenden
2. Stelle bei Bedarf klärende Fragen
3. Ordne entwicklungspsychologisch ein
4. Gib konkrete, umsetzbare Empfehlungen
5. Nenne ggf. relevante ELDiB-Items oder Ich-Ziele
6. Weise bei Bedarf auf Grenzen deiner Beratung hin

## Grenzen:
- Du stellst keine Diagnosen (ADHS, Autismus, etc.) - du kannst aber auf mögliche Zusammenhänge hinweisen
- Bei Verdacht auf Kindeswohlgefährdung, Suizidalität oder schwere psychische Störungen weist du immer auf professionelle Hilfe hin
- Du ersetzt keine therapeutische oder psychiatrische Behandlung

Antworte auf Deutsch. Sei empathisch aber professionell.`,

    // Modell-Optionen
    models: {
        anthropic: [
            { id: 'claude-sonnet-4-20250514', name: 'Claude Sonnet 4 (empfohlen)', context: 200000 },
            { id: 'claude-3-5-haiku-20241022', name: 'Claude 3.5 Haiku (schnell)', context: 200000 },
            { id: 'claude-3-5-sonnet-20241022', name: 'Claude 3.5 Sonnet', context: 200000 }
        ],
        openai: [
            { id: 'gpt-4o', name: 'GPT-4o (empfohlen)', context: 128000 },
            { id: 'gpt-4o-mini', name: 'GPT-4o Mini (schnell)', context: 128000 },
            { id: 'gpt-4-turbo', name: 'GPT-4 Turbo', context: 128000 }
        ]
    },

    /**
     * Initialisiert den KI-Berater mit Provider-Konfiguration
     * @param {string} provider - 'anthropic' oder 'openai'
     * @param {string} apiKey - Der API-Schlüssel des Providers
     * @param {string} model - Die Modell-ID (z.B. 'claude-sonnet-4-20250514')
     * @throws {Error} Wenn Provider oder API-Key fehlen
     */
    init(provider, apiKey, model) {
        if (!provider || !['anthropic', 'openai'].includes(provider)) {
            throw new Error('Ungültiger Provider. Erlaubt: "anthropic" oder "openai"');
        }
        if (!apiKey || typeof apiKey !== 'string' || apiKey.trim().length === 0) {
            throw new Error('API-Key ist erforderlich und darf nicht leer sein');
        }
        if (!model || typeof model !== 'string') {
            throw new Error('Modell ist erforderlich');
        }

        this.config.provider = provider;
        this.config.apiKey = apiKey.trim();
        this.config.model = model;
        this.loadChatHistory();

        // Sicherheitswarnung in der Konsole
        console.warn(
            '⚠️ AI_ADVISOR: API-Key wird im Browser verwendet. ' +
            'Für Produktionsumgebungen einen Backend-Proxy implementieren!'
        );
    },

    // API-Aufruf
    async sendMessage(userMessage) {
        if (!this.config.apiKey || !this.config.provider) {
            throw new Error('Bitte konfigurieren Sie zuerst die API-Einstellungen.');
        }

        // Nachricht zum Verlauf hinzufügen
        this.chatHistory.push({ role: 'user', content: userMessage });

        try {
            let response;

            if (this.config.provider === 'anthropic') {
                response = await this.callAnthropic(userMessage);
            } else if (this.config.provider === 'openai') {
                response = await this.callOpenAI(userMessage);
            } else {
                throw new Error('Unbekannter Provider');
            }

            // Antwort zum Verlauf hinzufügen
            this.chatHistory.push({ role: 'assistant', content: response });
            this.saveChatHistory();

            return response;

        } catch (error) {
            // Bei Fehler letzte Nachricht entfernen
            this.chatHistory.pop();
            throw error;
        }
    },

    // Anthropic API Aufruf
    async callAnthropic(userMessage) {
        const messages = this.chatHistory.map(msg => ({
            role: msg.role,
            content: msg.content
        }));

        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': this.config.apiKey,
                'anthropic-version': '2023-06-01',
                'anthropic-dangerous-direct-browser-access': 'true'
            },
            body: JSON.stringify({
                model: this.config.model,
                max_tokens: this.config.maxTokens,
                temperature: this.config.temperature,
                system: this.systemPrompt,
                messages: messages
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.message || 'Fehler bei der Anthropic API');
        }

        const data = await response.json();
        return data.content[0].text;
    },

    // OpenAI API Aufruf
    async callOpenAI(userMessage) {
        const messages = [
            { role: 'system', content: this.systemPrompt },
            ...this.chatHistory.map(msg => ({
                role: msg.role,
                content: msg.content
            }))
        ];

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.config.apiKey}`
            },
            body: JSON.stringify({
                model: this.config.model,
                messages: messages,
                max_tokens: this.config.maxTokens,
                temperature: this.config.temperature
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.message || 'Fehler bei der OpenAI API');
        }

        const data = await response.json();
        return data.choices[0].message.content;
    },

    /**
     * Speichert den Chat-Verlauf in localStorage
     * @returns {boolean} true bei Erfolg, false bei Fehler
     */
    saveChatHistory() {
        try {
            const data = JSON.stringify(this.chatHistory);
            localStorage.setItem('ai-advisor-history', data);
            return true;
        } catch (error) {
            // localStorage könnte voll sein oder im Private Mode nicht verfügbar
            console.error('Fehler beim Speichern des Chat-Verlaufs:', error.message);
            if (error.name === 'QuotaExceededError') {
                console.warn('localStorage-Speicher voll. Alte Nachrichten werden entfernt.');
                // Versuche ältere Nachrichten zu entfernen
                if (this.chatHistory.length > 10) {
                    this.chatHistory = this.chatHistory.slice(-10);
                    return this.saveChatHistory();
                }
            }
            return false;
        }
    },

    /**
     * Lädt den Chat-Verlauf aus localStorage
     * @returns {boolean} true bei Erfolg, false bei Fehler oder leeren Daten
     */
    loadChatHistory() {
        try {
            const saved = localStorage.getItem('ai-advisor-history');
            if (saved) {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed)) {
                    this.chatHistory = parsed;
                    return true;
                }
            }
            this.chatHistory = [];
            return false;
        } catch (error) {
            console.error('Fehler beim Laden des Chat-Verlaufs:', error.message);
            this.chatHistory = [];
            return false;
        }
    },

    // Chat-Verlauf löschen
    clearHistory() {
        this.chatHistory = [];
        localStorage.removeItem('ai-advisor-history');
    },

    // Einstellungen speichern
    saveSettings() {
        const settings = {
            provider: this.config.provider,
            model: this.config.model
            // API-Key wird NICHT gespeichert aus Sicherheitsgründen
        };
        localStorage.setItem('ai-advisor-settings', JSON.stringify(settings));
    },

    // Einstellungen laden
    loadSettings() {
        const saved = localStorage.getItem('ai-advisor-settings');
        if (saved) {
            const settings = JSON.parse(saved);
            this.config.provider = settings.provider;
            this.config.model = settings.model;
        }
    },

    // Kontext aus der aktuellen Beratungssitzung hinzufügen
    addContext(contextData) {
        const contextMessage = this.formatContext(contextData);
        if (contextMessage) {
            this.chatHistory.push({
                role: 'user',
                content: contextMessage
            });
            this.chatHistory.push({
                role: 'assistant',
                content: 'Ich habe die Informationen zur Kenntnis genommen. Wie kann ich Ihnen bei diesem Fall helfen?'
            });
        }
    },

    // Kontext formatieren
    formatContext(data) {
        if (!data) return null;

        let context = '**Kontext zur aktuellen Fallbesprechung:**\n\n';

        if (data.problematik) {
            const problem = ADVISORY_DATA?.problematiken?.[data.problematik];
            if (problem) {
                context += `**Hauptproblematik:** ${problem.name}\n`;
                context += `${problem.beschreibung}\n\n`;
            }
        }

        if (data.explorationNotes && Object.keys(data.explorationNotes).length > 0) {
            context += '**Notizen aus der Exploration:**\n';
            for (const [key, value] of Object.entries(data.explorationNotes)) {
                if (value) {
                    context += `- ${value}\n`;
                }
            }
            context += '\n';
        }

        if (data.eldibAssessment && Object.keys(data.eldibAssessment).length > 0) {
            context += '**ELDiB-Einschätzung:**\n';
            const erreicht = [];
            const nichtErreicht = [];

            for (const [code, status] of Object.entries(data.eldibAssessment)) {
                if (status === 'erreicht') erreicht.push(code);
                else if (status === 'nicht') nichtErreicht.push(code);
            }

            if (erreicht.length > 0) {
                context += `Erreicht: ${erreicht.join(', ')}\n`;
            }
            if (nichtErreicht.length > 0) {
                context += `Nicht erreicht: ${nichtErreicht.join(', ')}\n`;
            }
        }

        return context;
    },

    // Vordefinierte Fragen für Quick-Start
    quickQuestions: [
        "Wie kann ich mit einem Kind umgehen, das sich weigert, Anweisungen zu befolgen?",
        "Was kann ich tun, wenn ein Kind andere Kinder schlägt?",
        "Wie kann ich einem sehr zurückgezogenen Kind helfen?",
        "Was sind Anzeichen dafür, dass ein Kind professionelle Hilfe braucht?",
        "Wie erkläre ich Eltern, dass ihr Kind Unterstützung braucht?",
        "Welche Strategien helfen bei einem Kind, das sich nicht konzentrieren kann?",
        "Wie gehe ich mit Wutausbrüchen in der Klasse um?",
        "Was kann ich tun, wenn ein Kind keine Freunde hat?"
    ]
};

/**
 * Konvertiert einfaches Markdown zu HTML
 * @param {string} text - Der Markdown-Text
 * @returns {string} Der konvertierte HTML-String
 * @example
 * markdownToHtml('**fett** und *kursiv*');
 * // => '<strong>fett</strong> und <em>kursiv</em>'
 *
 * @note Für komplexere Markdown-Parsing sollte eine Bibliothek wie
 *       marked.js oder remark verwendet werden.
 */
function markdownToHtml(text) {
    if (!text || typeof text !== 'string') return '';

    // Escape HTML-Zeichen zur Vermeidung von XSS
    const escapeHtml = (str) => str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');

    // Zuerst Code-Blöcke extrahieren und schützen
    const codeBlocks = [];
    let processedText = text.replace(/```(\w*)\n([\s\S]*?)```/g, (match, lang, code) => {
        const index = codeBlocks.length;
        codeBlocks.push(`<pre><code class="language-${lang || 'text'}">${escapeHtml(code.trim())}</code></pre>`);
        return `%%CODEBLOCK_${index}%%`;
    });

    // Inline-Code extrahieren und schützen
    const inlineCodes = [];
    processedText = processedText.replace(/`([^`]+)`/g, (match, code) => {
        const index = inlineCodes.length;
        inlineCodes.push(`<code>${escapeHtml(code)}</code>`);
        return `%%INLINECODE_${index}%%`;
    });

    processedText = processedText
        // Überschriften
        .replace(/^### (.*$)/gm, '<h4>$1</h4>')
        .replace(/^## (.*$)/gm, '<h3>$1</h3>')
        .replace(/^# (.*$)/gm, '<h2>$1</h2>')
        // Fett
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        // Kursiv
        .replace(/\*([^*]+)\*/g, '<em>$1</em>')
        // Listen
        .replace(/^\- (.*$)/gm, '<li>$1</li>')
        .replace(/^\d+\. (.*$)/gm, '<li>$1</li>')
        // Absätze
        .replace(/\n\n/g, '</p><p>')
        // Zeilenumbrüche
        .replace(/\n/g, '<br>');

    // Code-Blöcke und Inline-Code wiederherstellen
    codeBlocks.forEach((block, index) => {
        processedText = processedText.replace(`%%CODEBLOCK_${index}%%`, block);
    });
    inlineCodes.forEach((code, index) => {
        processedText = processedText.replace(`%%INLINECODE_${index}%%`, code);
    });

    return processedText;
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AI_ADVISOR, markdownToHtml };
}
