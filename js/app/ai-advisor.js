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
    // Konfiguration - optimiert für klinische Konsistenz
    config: {
        provider: null, // 'anthropic' oder 'openai'
        apiKey: null,
        model: null,
        maxTokens: 2500,     // Erhöht für strukturierte Antworten
        temperature: 0.5    // Niedriger für konsistentere klinische Empfehlungen
    },

    // Chat-Verlauf
    chatHistory: [],

    // System-Prompt mit umfassendem Fachwissen
    systemPrompt: `Du bist ein erfahrener Berater für sozial-emotionale Entwicklung bei Kindern und Jugendlichen. Du kombinierst das Wissen eines Kinder- und Jugendpsychiaters, Entwicklungspsychologen und erfahrenen Sonderpädagogen mit langjähriger praktischer Erfahrung.

## Deine Rolle
- Du führst Intervisionen und Fallbesprechungen mit Lehrpersonen und pädagogischen Fachkräften
- Du hilfst, Verhaltensauffälligkeiten zu verstehen, einzuordnen und differenzialdiagnostisch zu denken
- Du gibst konkrete, sofort umsetzbare Handlungsempfehlungen
- Du nutzt das ELDiB (Entwicklungstherapeutischer Lernziel-Diagnose-Bogen) als Bezugsrahmen
- Du denkst IMMER an mögliche Komorbiditäten und Wechselwirkungen

## Dein Wissen umfasst:

### ELDiB-Bereiche und Entwicklungsstufen:
1. **Verhalten (V)** - 5 Stufen, 33 Items
   - Stufe I: Mit Freude auf die Umwelt reagieren (V-1 bis V-8)
   - Stufe II: Erfolgreich auf die Umwelt reagieren (V-9 bis V-14)
     - V-10 (Warten): Impulskontrolle - Kernitem für ADHS
     - V-11 (Stillsitzen): Motorische Kontrolle
     - V-14 (Lob akzeptieren): Selbstwertgefühl
   - Stufe III: Fähigkeiten zur erfolgreichen Gruppenteilnahme (V-15 bis V-21)
     - V-16 (Regeln kennen): Grundlage für Compliance
     - V-17 (Regeln begründen): Kognitive Einsicht
     - V-18 (Alternativen): Flexibilität
     - V-21 (Selbstkontrolle in Gruppe): Soziale Regulation
   - Stufe IV: Sich einbringen in Gruppenprozesse (V-22 bis V-28)
   - Stufe V: Anwenden in neuen Situationen (V-29 bis V-33)

2. **Kommunikation (K)** - 5 Stufen, 35 Items
   - K-16 (Gefühle benennen): Emotionale Literalität - kritisch für Emotionsregulation
   - K-21 (Gefühle anderer): Theory of Mind - relevant für ASD-Abklärung
   - K-26 (Gefühle ausdrücken): Expressivität

3. **Sozialisation (SOZ)** - 5 Stufen, 41 Items
   - SOZ-12 (Kontakt zu Erwachsenen): Bindungsrelevant
   - SOZ-15 (Kontakt aufnehmen): Soziale Initiative
   - SOZ-17/18 (Spiel/Kooperation): Soziale Reziprozität

4. **Kognition (KOG)** - 5 Stufen, 62 Items
   - KOG-2 (Aufmerksamkeit): Fokussierung
   - KOG-24 (Wechselnde Anweisungen): Flexibilität

### Entwicklungsprinzip:
- Stufe bestimmt Intervention
- Stufe I-II: Externe Strukturierung, Co-Regulation, 1:1-Begleitung
- Stufe III: Regelerklärung, Gruppenintegration, beginnendes Selbst-Monitoring
- Stufe IV-V: Selbstverantwortung, Reflexion, Peer-Unterstützung

### Häufige Problematiken mit Differentialdiagnose:

1. **Oppositionelles Verhalten (ODD)**
   - Kernmerkmale: Verweigerung, Regelverstöße, Diskutieren, Wutausbrüche
   - Differenziere von: Bindungsproblematik (testet Beziehung), ADHS ("kann nicht" vs. "will nicht")
   - ELDiB-Fokus: V-16, V-17, V-18, V-21

2. **Aggression/Wutausbrüche**
   - Reaktiv vs. instrumentell unterscheiden
   - Trigger: Frustration? Sensorik? Kontrolle? Beziehung?
   - Cave: Trauma-Reaktivierung

3. **Aufmerksamkeitsprobleme (ADHS)**
   - Kernsymptome: Unaufmerksamkeit, Hyperaktivität, Impulsivität
   - Differenziere: Angst (Sorgen binden Aufmerksamkeit), Trauma (Hypervigilanz), Depression (Konzentrationsstörung)
   - Altersbeachtung: Hyperaktivität bei <6J vorsichtig werten
   - ELDiB-Fokus: V-10, V-11, KOG-2

4. **Angst & Depression**
   - Bei Kindern oft als Reizbarkeit, somatische Beschwerden, Rückzug
   - Komorbidität 40-70%!
   - Cave: Suizidalität immer erfragen ab ca. 8 Jahren

5. **Autismus-Spektrum (ASD)**
   - Soziale Kommunikation + repetitive Muster
   - Differenziere: Soziale Angst (will, kann nicht vs. versteht nicht)
   - Hohe Komorbidität mit ADHS (30-50%) und Angst (40-80%)

6. **Trauma**
   - Kann ALLE anderen Störungsbilder imitieren!
   - Immer fragen: "Was ist diesem Kind passiert?"
   - Symptomtrias: Wiedererleben, Vermeidung, Übererregung

7. **Bindungsproblematik**
   - Unsicher-vermeidend, unsicher-ambivalent, desorganisiert
   - Beeinflusst ALLES andere - Bindung ist die Basis

### Komorbiditätswissen:
- ADHS + ODD: 40-60% - sehr häufig!
- ADHS + Angst: 25-35%
- Angst + Depression: 40-70%
- ASD + ADHS: 30-50%
- ASD + Angst: 40-80%
- Trauma + Depression: 30-50%
=> Bei einer Hypothese IMMER an mögliche zweite denken!

### Altersbasierte Anpassung:
- <6 Jahre: Hyperaktivität/Opposition oft entwicklungsgemäß
- 6-12 Jahre: Goldstandard für ADHS-Diagnose
- Ab 12: Adoleszenz-Turbulenzen berücksichtigen
- Bei Jungs: Externalisierung häufiger
- Bei Mädchen: Internalisierung häufiger, ADHS unterdiagnostiziert

### Funktionale Verhaltensanalyse (ABC):
- A (Antecedent): Was passiert VORHER? Trigger, Setting, Personen
- B (Behavior): Was genau tut das Kind? Beobachtbar beschreiben
- C (Consequence): Was passiert DANACH? Verstärkung?
- FUNKTION identifizieren: Aufmerksamkeit? Vermeidung? Zugang? Sensorisch?

### Interventionsprinzipien:
1. **Beziehung ist alles** - Ohne Beziehung keine Veränderung
2. **5:1 Regel** - 5 positive Interaktionen für jede negative
3. **Entwicklungsstand beachten** - Nicht überfordern
4. **Verhalten hat IMMER Funktion** - Was braucht das Kind?
5. **Kleine Schritte** - Verhaltenstherapeutisch aufbauen
6. **Umwelt anpassen** - Nicht nur das Kind "reparieren"
7. **Eltern einbeziehen** - Triangulation, häusliche Umsetzung
8. **Trauma-sensibel** - Sicherheit vor Konfrontation

## Dein Gesprächsstil:
- Professionell aber warmherzig und wertschätzend
- Fragend und explorierend (sokratisch, nicht belehrend)
- Konkret und praxisorientiert - "Was können Sie MORGEN tun?"
- Ressourcenorientiert - Stärken des Kindes und der Lehrkraft sehen
- Hypothesen-generierend - "Könnte es sein, dass...?"
- Bei Warnzeichen KLAR und DIREKT auf Abklärung hinweisen

## Struktur deiner Antworten:

### Bei neuen Fallvorstellungen:
1. **Würdigung**: Kurze Anerkennung der Herausforderung
2. **Klärungsfragen** (max. 3-4 gezielte Fragen):
   - Zur Situation (Wann, Wo, Mit wem?)
   - Zum Verhalten (Was genau? Wie oft?)
   - Zur Vorgeschichte (Seit wann? Was hat sich verändert?)
   - Zu Ressourcen (Wann klappt es?)
3. **Erste Einordnung** - Entwicklungspsychologisch, differentialdiagnostisch
4. **Sofort-Empfehlungen** - 2-3 konkrete, umsetzbare Maßnahmen
5. **Weiteres Vorgehen** - Was beobachten? Wann Abklärung?

### Bei Nachfragen/Vertiefung:
1. Zusammenfassung des bisher Besprochenen
2. Neue Information integrieren
3. Hypothesen anpassen
4. Konkrete nächste Schritte

### Bei Synthese-Ergebnissen im Kontext:
1. Synthese-Ergebnisse würdigen und einordnen
2. Komorbiditäten beachten und erklären
3. Differentialdiagnostische Hinweise geben
4. Interventionen priorisieren nach Dringlichkeit

## Output-Formate (nutze diese bei Bedarf):

### Kurzempfehlung:
\`\`\`
📌 SOFORT TUN:
- [Konkrete Maßnahme 1]
- [Konkrete Maßnahme 2]

⚠️ BEACHTEN:
- [Wichtiger Hinweis]

📋 BEOBACHTEN (diese Woche):
- [Beobachtungsauftrag]
\`\`\`

### ELDiB-Lernziel (Ich-Ziel):
\`\`\`
🎯 ICH-ZIEL: "[Formulierung aus Kindperspektive]" ([ELDiB-Code])
📊 Stufe: [I-V]
📝 Umsetzung: [Konkrete Maßnahme]
\`\`\`

### Differentialdiagnostik:
\`\`\`
🔍 WAHRSCHEINLICHKEIT:
- [Hypothese 1]: [hoch/mittel/niedrig]
- [Hypothese 2]: [hoch/mittel/niedrig]

↔️ UNTERSCHEIDUNGSMERKMAL:
- [Was spricht für 1 vs. 2?]

➡️ EMPFEHLUNG: [Abklärung/Beobachtung/Intervention]
\`\`\`

## Grenzen:
- Du stellst KEINE Diagnosen - du generierst Hypothesen und empfiehlst Abklärung
- Bei Verdacht auf Kindeswohlgefährdung: SOFORT auf Meldepflicht und Vorgehen hinweisen
- Bei Suizidalität/Selbstverletzung: SOFORT auf professionelle Hilfe hinweisen
- Du ersetzt keine Therapie - du berätst Pädagogen in ihrer täglichen Arbeit
- Bei komplexen Fällen: Immer auf multiprofessionelles Team verweisen

## Warnzeichen - hier IMMER reagieren:
- Suizidäußerungen oder schwere Selbstverletzung
- Verdacht auf Misshandlung/Vernachlässigung/Missbrauch
- Psychotische Symptome (Halluzinationen, Wahn)
- Akute Essstörung mit körperlichen Zeichen
- Substanzmissbrauch bei Kindern

Antworte IMMER auf Deutsch. Sei empathisch, professionell und handlungsorientiert.`,

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

    // ============================================
    // SYNTHESE-INTEGRATION
    // ============================================

    /**
     * Fügt vollständige Synthese-Ergebnisse zum Kontext hinzu
     * @param {Object} syntheseResult - Ergebnis von SynthesisEngine.synthesize()
     */
    addSyntheseContext(syntheseResult) {
        if (!syntheseResult) return;

        const contextMessage = this.formatSyntheseContext(syntheseResult);
        if (contextMessage) {
            this.chatHistory.push({
                role: 'user',
                content: contextMessage
            });
            this.chatHistory.push({
                role: 'assistant',
                content: this.generateSyntheseAntwort(syntheseResult)
            });
            this.saveChatHistory();
        }
    },

    /**
     * Formatiert Synthese-Ergebnisse als strukturierten Kontext
     */
    formatSyntheseContext(synthese) {
        let context = '**SYNTHESE-ERGEBNISSE ZUR FALLBESPRECHUNG**\n\n';

        // Kindprofil
        if (synthese.kind) {
            context += `## Kind-Profil\n`;
            context += `**Name:** ${synthese.kind.name}\n`;
            if (synthese.kind.alter) context += `**Alter:** ${synthese.kind.alter} Jahre\n`;
            if (synthese.kind.klasse) context += `**Klasse:** ${synthese.kind.klasse}\n`;
            if (synthese.kind.zusammenfassung) context += `**Zusammenfassung:** ${synthese.kind.zusammenfassung}\n`;

            if (synthese.kind.staerken?.length > 0) {
                context += `\n**Stärken:**\n`;
                synthese.kind.staerken.forEach(s => context += `- ${s}\n`);
            }

            if (synthese.kind.herausforderungen?.length > 0) {
                context += `\n**Herausforderungen:**\n`;
                synthese.kind.herausforderungen.forEach(h => context += `- ${h}\n`);
            }
            context += '\n';
        }

        // ELDiB-Entwicklung
        if (synthese.entwicklung) {
            context += `## ELDiB-Entwicklungsstand\n`;
            context += `**Durchschnittsstufe:** ${synthese.entwicklung.durchschnitt}\n`;

            if (synthese.entwicklung.bereiche) {
                context += `**Bereiche:**\n`;
                Object.values(synthese.entwicklung.bereiche).forEach(b => {
                    context += `- ${b.name}: Stufe ${b.stufe}\n`;
                });
            }

            if (synthese.entwicklung.ungleichmaessig) {
                context += `\n⚠️ **Ungleichmäßiges Profil** - deutliche Unterschiede zwischen Bereichen\n`;
            }

            if (synthese.entwicklung.interpretation?.length > 0) {
                context += `\n**Interpretation:**\n`;
                synthese.entwicklung.interpretation.forEach(i => context += `- ${i}\n`);
            }
            context += '\n';
        }

        // Hypothesen mit Konfidenz
        if (synthese.hypothesen?.length > 0) {
            context += `## Diagnostische Hypothesen\n`;
            synthese.hypothesen.forEach(h => {
                const icon = h.konfidenz >= 70 ? '🔴' : h.konfidenz >= 50 ? '🟡' : '🟢';
                context += `\n### ${icon} ${h.name} (${h.konfidenz}% Konfidenz)\n`;

                if (h.evidenz?.length > 0) {
                    context += `**Evidenz:**\n`;
                    h.evidenz.forEach(e => context += `- ${e}\n`);
                }

                if (h.gegenEvidenz?.length > 0) {
                    context += `**Gegen-Evidenz:**\n`;
                    h.gegenEvidenz.forEach(g => context += `- ${g}\n`);
                }

                if (h.altershinweis) {
                    context += `**Altershinweis:** ${h.altershinweis}\n`;
                }

                context += `**Empfehlung:** ${h.empfehlung} (${h.dringlichkeit})\n`;
            });
            context += '\n';
        }

        // Komorbiditäten
        if (synthese.komorbiditaeten?.muster?.length > 0) {
            context += `## Erkannte Komorbiditäten\n`;
            synthese.komorbiditaeten.muster.forEach(k => {
                context += `\n### ${k.name} (${k.konfidenz}% Konfidenz)\n`;
                context += `**Häufigkeit:** ${k.haeufigkeit}\n`;
                context += `**Bedeutung:** ${k.bedeutung}\n`;
                context += `**Empfohlene Intervention:** ${k.intervention}\n`;
            });

            if (synthese.komorbiditaeten.komplexitaet) {
                context += `\n**Fallkomplexität:** ${synthese.komorbiditaeten.komplexitaet.stufe}\n`;
                context += `${synthese.komorbiditaeten.komplexitaet.beschreibung}\n`;
            }
            context += '\n';
        }

        // Differentialhinweise
        if (synthese.differentialHinweise?.length > 0) {
            context += `## Differentialdiagnostische Hinweise\n`;
            synthese.differentialHinweise.forEach(d => {
                context += `\n### ${d.differential}\n`;
                context += `${d.erklaerung}\n`;
                context += `**Unterscheidung:**\n`;
                d.unterscheidung.forEach(u => context += `- ${u}\n`);
                context += `**Empfehlung:** ${d.empfehlung}\n`;
            });
            context += '\n';
        }

        // Bedürfnisse
        if (synthese.beduerfnisse?.length > 0) {
            context += `## Identifizierte Bedürfnisse\n`;
            synthese.beduerfnisse.forEach(b => {
                context += `\n### ${b.icon} ${b.beduerfnis} (${b.wichtigkeit})\n`;
                context += `${b.begruendung}\n`;
                if (b.umsetzung?.length > 0) {
                    context += `**Umsetzung:**\n`;
                    b.umsetzung.forEach(u => context += `- ${u}\n`);
                }
            });
            context += '\n';
        }

        // Lernziele
        if (synthese.lernziele?.length > 0) {
            context += `## ELDiB-Lernziele\n`;
            synthese.lernziele.forEach(l => {
                context += `- **${l.code}** (${l.bereich}, Stufe ${l.stufe}): ${l.ziel}\n`;
                context += `  Maßnahme: ${l.massnahme}\n`;
            });
            context += '\n';
        }

        // Konfidenz-Kalibrierung
        if (synthese.konfidenzKalibrierung) {
            const kal = synthese.konfidenzKalibrierung;
            context += `## Risiko-Einschätzung\n`;
            context += `**Gesamtrisiko:** ${kal.gesamtrisiko}\n`;

            if (kal.kategorisierung.kritisch?.length > 0) {
                context += `**Kritisch (>85%):** ${kal.kategorisierung.kritisch.join(', ')}\n`;
            }
            if (kal.kategorisierung.hochwahrscheinlich?.length > 0) {
                context += `**Hoch (70-85%):** ${kal.kategorisierung.hochwahrscheinlich.join(', ')}\n`;
            }
            if (kal.kategorisierung.abklaerungEmpfohlen?.length > 0) {
                context += `**Abklärung empfohlen (50-70%):** ${kal.kategorisierung.abklaerungEmpfohlen.join(', ')}\n`;
            }
            context += '\n';
        }

        return context;
    },

    /**
     * Generiert strukturierte Antwort auf Synthese-Ergebnisse
     */
    generateSyntheseAntwort(synthese) {
        let antwort = 'Ich habe die umfassenden Synthese-Ergebnisse analysiert. ';

        // Zusammenfassung der Hauptbefunde
        const topHypothesen = synthese.hypothesen?.filter(h => h.konfidenz >= 50) || [];

        if (topHypothesen.length > 0) {
            antwort += `\n\n**Zusammenfassung der Hauptbefunde:**\n`;
            antwort += `Die Analyse zeigt erhöhte Hinweise auf: ${topHypothesen.map(h => `${h.name} (${h.konfidenz}%)`).join(', ')}.\n`;
        }

        // Komorbiditäten hervorheben
        if (synthese.komorbiditaeten?.muster?.length > 0) {
            const wichtigsteKombi = synthese.komorbiditaeten.muster[0];
            antwort += `\n**Wichtige Komorbidität:** ${wichtigsteKombi.name}. ${wichtigsteKombi.bedeutung}\n`;
        }

        // Komplexität
        if (synthese.komorbiditaeten?.komplexitaet?.stufe === 'hoch') {
            antwort += `\n⚠️ **Hinweis:** Dies ist ein komplexer Fall. ${synthese.komorbiditaeten.komplexitaet.empfehlung}\n`;
        }

        // Entwicklungshinweis
        if (synthese.entwicklung?.durchschnitt) {
            antwort += `\n**Entwicklungsstand (ELDiB):** Durchschnittsstufe ${synthese.entwicklung.durchschnitt}. `;
            if (synthese.entwicklung.durchschnitt <= 2) {
                antwort += 'Das Kind braucht viel externe Strukturierung und Co-Regulation.\n';
            } else if (synthese.entwicklung.durchschnitt <= 3) {
                antwort += 'Gruppenbasierte Interventionen werden zunehmend möglich.\n';
            } else {
                antwort += 'Selbstregulation und Reflexion können gefördert werden.\n';
            }
        }

        antwort += '\n**Wie kann ich Ihnen bei der Interpretation oder Umsetzung helfen?** ';
        antwort += 'Ich kann:\n';
        antwort += '- Einzelne Hypothesen vertiefen\n';
        antwort += '- Konkrete Interventionen für den Schulalltag ableiten\n';
        antwort += '- Bei der Priorisierung der Maßnahmen helfen\n';
        antwort += '- Elterngespräche vorbereiten\n';

        return antwort;
    },

    // Kontext aus der aktuellen Beratungssitzung hinzufügen (alte Methode beibehalten)
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

    // Kontext formatieren (alte Methode beibehalten für Kompatibilität)
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

    // ============================================
    // STRUKTURIERTE OUTPUT-TEMPLATES
    // ============================================

    /**
     * Generiert strukturierte Empfehlungen basierend auf Synthese
     */
    generateStrukturierteEmpfehlung(synthese) {
        const output = {
            sofortmassnahmen: [],
            beobachtungsauftraege: [],
            elterngespraech: null,
            abklaerung: [],
            ichZiele: []
        };

        // Sofortmaßnahmen aus Bedürfnissen
        if (synthese.beduerfnisse) {
            synthese.beduerfnisse.slice(0, 3).forEach(b => {
                if (b.umsetzung && b.umsetzung.length > 0) {
                    output.sofortmassnahmen.push({
                        bereich: b.beduerfnis,
                        massnahme: b.umsetzung[0]
                    });
                }
            });
        }

        // Beobachtungsaufträge aus Hypothesen
        const unsichereHypothesen = synthese.hypothesen?.filter(h =>
            h.konfidenz >= 30 && h.konfidenz < 70
        ) || [];
        unsichereHypothesen.forEach(h => {
            output.beobachtungsauftraege.push({
                hypothese: h.name,
                beobachten: `Wann treten die Verhaltensweisen auf? In welchen Situationen nicht?`,
                ziel: 'Differentialdiagnostische Klärung'
            });
        });

        // Abklärungsempfehlungen
        const hochwahrscheinlich = synthese.hypothesen?.filter(h => h.konfidenz >= 60) || [];
        hochwahrscheinlich.forEach(h => {
            output.abklaerung.push({
                diagnose: h.name,
                dringlichkeit: h.dringlichkeit,
                empfehlung: h.empfehlung
            });
        });

        // Ich-Ziele aus Lernzielen
        if (synthese.lernziele) {
            synthese.lernziele.slice(0, 3).forEach(l => {
                output.ichZiele.push({
                    code: l.code,
                    ziel: l.ziel,
                    massnahme: l.massnahme
                });
            });
        }

        // Elterngespräch vorbereiten
        if (hochwahrscheinlich.length > 0 || synthese.komorbiditaeten?.komplexitaet?.stufe === 'hoch') {
            output.elterngespraech = {
                themen: [
                    'Beobachtungen im Schulalltag teilen',
                    hochwahrscheinlich.length > 0 ? `Hinweise auf ${hochwahrscheinlich[0].name} ansprechen` : null,
                    'Gemeinsame Ziele vereinbaren',
                    'Empfehlung zur fachärztlichen Abklärung'
                ].filter(Boolean),
                formulierungshilfe: this.generateElterngespraechHilfe(synthese)
            };
        }

        return output;
    },

    /**
     * Generiert Formulierungshilfen für Elterngespräche
     */
    generateElterngespraechHilfe(synthese) {
        const kind = synthese.kind?.name || 'Ihr Kind';
        const staerken = synthese.kind?.staerken?.slice(0, 2).join(' und ') || 'viele Stärken';

        let hilfe = `**Einstieg (positiv):**\n`;
        hilfe += `"Ich freue mich über unser Gespräch. ${kind} zeigt ${staerken}. `;
        hilfe += `Gleichzeitig möchte ich mit Ihnen über einige Beobachtungen sprechen."\n\n`;

        hilfe += `**Beobachtungen teilen (beschreibend, nicht wertend):**\n`;
        if (synthese.kind?.herausforderungen?.length > 0) {
            hilfe += `"Mir ist aufgefallen, dass ${synthese.kind.herausforderungen[0].toLowerCase()}. `;
            hilfe += `Kennen Sie das auch von zu Hause?"\n\n`;
        }

        hilfe += `**Gemeinsame Ziele:**\n`;
        hilfe += `"Was wünschen Sie sich für ${kind} in diesem Schuljahr? `;
        hilfe += `Wie können wir gemeinsam daran arbeiten?"\n\n`;

        const abklaerung = synthese.hypothesen?.find(h => h.konfidenz >= 60);
        if (abklaerung) {
            hilfe += `**Bei Abklärungsempfehlung:**\n`;
            hilfe += `"Um ${kind} bestmöglich unterstützen zu können, würde ich empfehlen, `;
            hilfe += `eine fachliche Einschätzung einzuholen. Das hilft uns, gezielter zu fördern."\n`;
        }

        return hilfe;
    },

    // Vordefinierte Fragen für Quick-Start (kategorisiert)
    quickQuestions: [
        // Verhaltensmanagement
        "Wie kann ich mit einem Kind umgehen, das sich weigert, Anweisungen zu befolgen?",
        "Was kann ich tun, wenn ein Kind andere Kinder schlägt?",
        "Wie gehe ich mit Wutausbrüchen in der Klasse um?",
        "Ein Kind stört ständig den Unterricht - was kann ich tun?",

        // Emotionale Probleme
        "Wie kann ich einem sehr zurückgezogenen Kind helfen?",
        "Ein Kind weint häufig und wirkt traurig - was soll ich beachten?",
        "Wie erkenne ich, ob ein Kind unter Angst leidet?",

        // Aufmerksamkeit & ADHS
        "Welche Strategien helfen bei einem Kind, das sich nicht konzentrieren kann?",
        "Wie unterscheide ich zwischen 'will nicht' und 'kann nicht'?",
        "Was sind erste Anzeichen für ADHS im Schulalltag?",

        // Soziales
        "Was kann ich tun, wenn ein Kind keine Freunde hat?",
        "Wie fördere ich ein Kind, das Schwierigkeiten mit Gruppenarbeit hat?",

        // Elternarbeit
        "Wie erkläre ich Eltern, dass ihr Kind Unterstützung braucht?",
        "Wie bereite ich ein schwieriges Elterngespräch vor?",

        // Abklärung & Grenzen
        "Was sind Anzeichen dafür, dass ein Kind professionelle Hilfe braucht?",
        "Wann sollte ich das Jugendamt einschalten?",

        // Entwicklung & ELDiB
        "Wie nutze ich ELDiB-Stufen für meine Unterrichtsplanung?",
        "Was bedeutet es, wenn ein Kind auf Stufe II im Verhalten ist?"
    ],

    // Kategorien für die Quick-Questions
    quickQuestionCategories: {
        verhalten: {
            name: 'Verhaltensmanagement',
            icon: '🚫',
            questions: [0, 1, 2, 3]
        },
        emotionen: {
            name: 'Emotionale Probleme',
            icon: '💔',
            questions: [4, 5, 6]
        },
        aufmerksamkeit: {
            name: 'Aufmerksamkeit & ADHS',
            icon: '🎯',
            questions: [7, 8, 9]
        },
        soziales: {
            name: 'Soziale Entwicklung',
            icon: '👥',
            questions: [10, 11]
        },
        eltern: {
            name: 'Elternarbeit',
            icon: '👪',
            questions: [12, 13]
        },
        fachlich: {
            name: 'Fachliche Abklärung',
            icon: '⚕️',
            questions: [14, 15]
        },
        entwicklung: {
            name: 'Entwicklung & ELDiB',
            icon: '📈',
            questions: [16, 17]
        }
    },

    // ============================================
    // ERWEITERTE KONFIGURATION
    // ============================================

    /**
     * Setzt optimierte Parameter für klinische Konsistenz
     */
    setKlinischeParameter() {
        this.config.temperature = 0.5; // Niedriger für konsistentere klinische Antworten
        this.config.maxTokens = 2500;  // Mehr Tokens für strukturierte Antworten
    },

    /**
     * Setzt kreativere Parameter für Brainstorming
     */
    setKreativeParameter() {
        this.config.temperature = 0.8;
        this.config.maxTokens = 2000;
    },

    /**
     * Gibt eine zufällige Frage aus einer Kategorie zurück
     */
    getRandomQuestionFromCategory(categoryId) {
        const category = this.quickQuestionCategories[categoryId];
        if (!category) return null;

        const randomIndex = category.questions[Math.floor(Math.random() * category.questions.length)];
        return this.quickQuestions[randomIndex];
    },

    /**
     * Gibt alle Fragen einer Kategorie zurück
     */
    getQuestionsForCategory(categoryId) {
        const category = this.quickQuestionCategories[categoryId];
        if (!category) return [];

        return category.questions.map(idx => ({
            index: idx,
            question: this.quickQuestions[idx]
        }));
    }
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
