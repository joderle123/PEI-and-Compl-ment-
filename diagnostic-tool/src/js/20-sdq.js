/* =====================================================================
   SDQ – Strengths and Difficulties Questionnaire (Goodman)
   ---------------------------------------------------------------------
   Eingabe je Beurteiler (Eltern P4-17, Lehrkraft T4-17, Selbst S11-17):
   entweder die 25 Itemantworten (0/1/2; das Tool rechnet Umpolung und
   Skalen) oder direkt die 5 Skalenrohwerte. Impact-Supplement nach
   Goodman (0/0/1/2; Lehrerversion 3 Bereiche). Grenzwerte: vierstufige
   Einteilung (aktuelle Empfehlung) oder dreistufige Originalgrenzen.
   ===================================================================== */
(function () {
  var L = KAT.L;
  var SKALEN = [
    { id: 'em', name: L('Emotionale Probleme', 'Symptômes émotionnels', 'Emotional symptoms'), items: [3, 8, 13, 16, 24] },
    { id: 'co', name: L('Verhaltensprobleme', 'Problèmes de conduite', 'Conduct problems'), items: [5, 7, 12, 18, 22] },
    { id: 'hy', name: L('Hyperaktivität', 'Hyperactivité/inattention', 'Hyperactivity/inattention'), items: [2, 10, 15, 21, 25] },
    { id: 'pe', name: L('Verhaltensprobleme mit Gleichaltrigen', 'Problèmes relationnels avec les pairs', 'Peer relationship problems'), items: [6, 11, 14, 19, 23] },
    { id: 'pr', name: L('Prosoziales Verhalten', 'Comportement prosocial', 'Prosocial behaviour'), items: [1, 4, 9, 17, 20], ressource: true }
  ];
  var GESAMT = { id: 'tot', name: L('Gesamtproblemwert', 'Score total des difficultés', 'Total difficulties score') };
  var IMPACT = { id: 'imp', name: L('Impact (Beeinträchtigung)', 'Score d’impact', 'Impact score') };
  var UMGEPOLT = [7, 11, 14, 21, 25];
  var INF = ['eltern', 'lehrer', 'selbst'];
  var FORM = { eltern: 'P4-17', lehrer: 'T4-17', selbst: 'S11-17' };

  /* Grenzen je Beurteiler: Obergrenzen der Stufen (Problemskalen) bzw. Untergrenzen (Prosozial) */
  var VIER = {
    eltern: { tot: [13, 16, 19], em: [3, 4, 6], co: [2, 3, 5], hy: [5, 7, 8], pe: [2, 3, 4], pr: [8, 7, 6], imp: [0, 1, 2] },
    lehrer: { tot: [11, 15, 18], em: [3, 4, 5], co: [2, 3, 4], hy: [5, 7, 8], pe: [2, 4, 5], pr: [6, 5, 4], imp: [0, 1, 2] },
    selbst: { tot: [14, 17, 19], em: [4, 5, 6], co: [2, 3, 4], hy: [5, 6, 7], pe: [2, 3, 4], pr: [7, 6, 5], imp: [0, 1, 2] }
  };
  var DREI = {
    eltern: { tot: [13, 16], em: [3, 4], co: [2, 3], hy: [5, 6], pe: [2, 3], pr: [6, 5], imp: [0, 1] },
    lehrer: { tot: [11, 15], em: [4, 5], co: [2, 3], hy: [5, 6], pe: [3, 4], pr: [6, 5], imp: [0, 1] },
    selbst: { tot: [15, 19], em: [5, 6], co: [3, 4], hy: [5, 6], pe: [3, 5], pr: [6, 5], imp: [0, 1] }
  };
  var NAMEN4 = [L('nahe am Durchschnitt', 'proche de la moyenne', 'close to average'), L('leicht erhöht', 'légèrement élevé', 'slightly raised'), L('hoch', 'élevé', 'high'), L('sehr hoch', 'très élevé', 'very high')];
  var NAMEN4P = [L('nahe am Durchschnitt', 'proche de la moyenne', 'close to average'), L('leicht erniedrigt', 'légèrement bas', 'slightly lowered'), L('niedrig', 'bas', 'low'), L('sehr niedrig', 'très bas', 'very low')];
  var NAMEN3 = [L('unauffällig', 'normal', 'normal'), L('grenzwertig', 'limite', 'borderline'), L('auffällig', 'anormal', 'abnormal')];

  function bandFuer(schema, inf, skala) {
    var g = (schema === '3' ? DREI : VIER)[inf]; if (!g || !g[skala]) { return null; }
    var namen = schema === '3' ? NAMEN3 : (skala === 'pr' ? NAMEN4P : NAMEN4);
    if (skala === 'pr') {
      /* Prosozial: niedrig = ungünstig; Grenzen sind Untergrenzen der besseren Stufen */
      return KAT.ressourceBand(g.pr, namen);
    }
    var b = KAT.problemBand(g[skala], namen);
    if (schema === '3') { b.stufen[2].rang = 2; }
    return b;
  }
  function neu() {
    var werte = {}, items = {}, impact = {};
    INF.forEach(function (i) { werte[i] = {}; items[i] = {}; impact[i] = {}; });
    return { informanten: ['eltern'], schema: '4', eingabe: 'skalen', datum: '', werte: werte, items: items, impact: impact };
  }
  /* Skalenwerte eines Beurteilers: aus Items (mit Umpolung, Hochrechnung ab 3 von 5) oder direkt */
  function skalenwerte(d, inf) {
    var out = {}, hoch = {};
    SKALEN.forEach(function (s) {
      if (d.eingabe === 'items') {
        var sum = 0, n = 0;
        s.items.forEach(function (nr) {
          var v = B.num((d.items[inf] || {})[nr]);
          if (v == null || v < 0 || v > 2) { return; }
          sum += UMGEPOLT.indexOf(nr) >= 0 ? 2 - v : v; n++;
        });
        if (n === 5) { out[s.id] = sum; }
        else if (n >= 3) { out[s.id] = Math.round(sum * 5 / n); hoch[s.id] = n; }
        else { out[s.id] = null; }
      } else {
        out[s.id] = E.zahl('tests.sdq.werte.' + inf + '.' + s.id, 0, 10, true);
      }
    });
    var probleme = ['em', 'co', 'hy', 'pe'];
    out.tot = probleme.every(function (k) { return out[k] != null; }) ? probleme.reduce(function (a, k) { return a + out[k]; }, 0) : null;
    out.int = out.em != null && out.pe != null ? out.em + out.pe : null;
    out.ext = out.co != null && out.hy != null ? out.co + out.hy : null;
    return { werte: out, hochgerechnet: hoch };
  }
  /* Impact nach Goodman: Belastung + Bereiche, je 0/0/1/2; bei „keine Schwierigkeiten“ = 0 */
  var BEREICHE_IMPACT = {
    eltern: ['zuhause', 'freunde', 'lernen', 'freizeit'], selbst: ['zuhause', 'freunde', 'lernen', 'freizeit'], lehrer: ['freunde', 'lernen']
  };
  function impactWert(d, inf) {
    var im = (d.impact || {})[inf] || {};
    var s = B.num(im.schwierig);
    if (s == null) { return null; }
    if (s === 0) { return 0; }
    var felder = ['belastung'].concat(BEREICHE_IMPACT[inf]);
    var fehlt = felder.some(function (k) { return B.num(im[k]) == null; });
    if (fehlt) { return null; }
    return felder.reduce(function (a, k) { var v = B.num(im[k]); return a + (v >= 2 ? v - 1 : 0); }, 0);
  }
  function auswerten(d) {
    var je = {};
    (d.informanten || []).forEach(function (inf) {
      var sw = skalenwerte(d, inf), zeilen = [];
      SKALEN.concat([GESAMT]).forEach(function (s) {
        var w = sw.werte[s.id];
        zeilen.push({ id: s.id, name: s.name, wert: w, metrik: 'roh', band: w == null ? null : KAT.einstufen(bandFuer(d.schema, inf, s.id), w), hoch: sw.hochgerechnet[s.id] });
      });
      var iw = impactWert(d, inf);
      je[inf] = { zeilen: zeilen, werte: sw.werte, impact: iw, impactBand: iw == null ? null : KAT.einstufen(bandFuer(d.schema, inf, 'imp'), iw), hochgerechnet: sw.hochgerechnet };
    });
    return { je: je };
  }
  function chip(pfad, n, d) {
    var m = /werte\.(\w+)\.(\w+)$/.exec(pfad); if (!m) { return null; }
    return KAT.einstufen(bandFuer(d.schema, m[1], m[2]), n);
  }

  /* ---------------- Formular ---------------- */
  var INF_UI = { eltern: 'Eltern (P4-17)', lehrer: 'Lehrkraft (T4-17)', selbst: 'Selbst (S11-17)' };
  var ANTWORT_IMPACT = [['0', 'gar nicht'], ['1', 'kaum'], ['2', 'deutlich'], ['3', 'schwer']];
  function formular(d) {
    var infs = d.informanten || [];
    var h = E.karte('<h2>Durchführung</h2><div class="raster">' +
      E.feld('tests.sdq.datum', 'Datum', { typ: 'date' }) +
      E.auswahl('tests.sdq.schema', 'Grenzwerte', [['4', 'vierstufig (aktuelle Empfehlung)'], ['3', 'dreistufig (Originalgrenzen)']], { neu: true, hilfe: 'Beide Einteilungen nach Goodman (sdqinfo.org), getrennt für Eltern, Lehrkraft und Selbst.' }) +
      E.auswahl('tests.sdq.eingabe', 'Eingabe', [['skalen', 'Skalenwerte (Summe je 5 Items)'], ['items', 'Einzelne Itemantworten 0/1/2']], { neu: true }) + '</div>' +
      '<div style="margin-top:12px"><span class="feld"><span>Wer hat den Fragebogen ausgefüllt?</span></span>' + E.wahlen('tests.sdq.informanten', INF.map(function (i) { return [i, INF_UI[i]]; }), true, true) + '</div>');
    if (!infs.length) { return h + E.hinweis('Bitte mindestens einen Fragebogen (Beurteiler) wählen.', 'info'); }
    if (d.eingabe === 'items') {
      var zeilen = [];
      SKALEN.forEach(function (s) {
        zeilen.push({ trenner: B.t(s.name, 'de') });
        s.items.forEach(function (nr) { zeilen.push({ id: String(nr), name: 'Item ' + nr + (UMGEPOLT.indexOf(nr) >= 0 ? ' (wird umgepolt)' : ''), min: 0, max: 2, ganz: true }); });
      });
      h += E.karte('<h2>Itemantworten</h2><p class="klein">0 = nicht zutreffend · 1 = teilweise zutreffend · 2 = eindeutig zutreffend – so, wie angekreuzt. Die Umpolung der Items 7, 11, 14, 21 und 25 macht das Tool. Fehlen bei einer Skala höchstens zwei Antworten, wird hochgerechnet (Regel nach Goodman).</p>' +
        E.raster({ basis: 'tests.sdq.items', kopfSkala: 'Item', spalten: infs.map(function (i) { return { id: i, label: INF_UI[i] }; }), zeilen: zeilen, einstufen: function () { return null; } }));
      h += E.karte('<h2>Berechnete Skalenwerte</h2><div id="sdq-berechnet">' + ergebnisTabelleUi(d, auswerten(d)) + '</div>');
    } else {
      h += E.karte('<h2>Skalenwerte</h2><p class="klein">Rohwert je Skala (0–10) aus dem Auswertungsbogen. Der Gesamtproblemwert wird aus den vier Problemskalen berechnet.</p>' +
        E.raster({ basis: 'tests.sdq.werte', spalten: infs.map(function (i) { return { id: i, label: INF_UI[i] }; }),
          zeilen: SKALEN.map(function (s) { return { id: s.id, name: B.t(s.name, 'de'), min: 0, max: 10, ganz: true, hinweis: s.ressource ? 'hoher Wert = günstig' : '' }; }),
          einstufen: function (sk, inf, n) { return KAT.einstufen(bandFuer(d.schema, inf, sk), n); } }) +
        '<div id="sdq-gesamt">' + gesamtUi(d) + '</div>');
    }
    h += E.karte('<h2>Auswirkungen (Impact-Supplement)</h2><p class="klein">Rückseite des Fragebogens. Gewertet nach Goodman: „gar nicht“ und „kaum“ = 0, „deutlich“ = 1, „schwer“ = 2. Bei „Nein“ (keine Schwierigkeiten) ist der Impact-Wert 0. Die Lehrerversion fragt nur nach Gleichaltrigen und Lernen.</p>' +
      infs.map(function (inf) {
        var p = 'tests.sdq.impact.' + inf + '.';
        var bereiche = inf === 'lehrer' ? [['freunde', 'Beziehungen zu Gleichaltrigen'], ['lernen', 'Lernen im Unterricht']] : [['zuhause', 'Zuhause'], ['freunde', 'Freundschaften'], ['lernen', 'Lernen im Unterricht'], ['freizeit', 'Freizeit']];
        return '<h3 style="margin-top:14px">' + B.esc(INF_UI[inf]) + ' <span id="sdq-imp-' + inf + '">' + impactChip(d, inf) + '</span></h3><div class="raster">' +
          E.auswahl(p + 'schwierig', 'Schwierigkeiten insgesamt', [['0', 'Nein'], ['1', 'Ja, leichte'], ['2', 'Ja, deutliche'], ['3', 'Ja, massive']], { leer: '– nicht beantwortet –' }) +
          E.auswahl(p + 'dauer', 'Seit wann?', [['lt1', 'weniger als 1 Monat'], ['1-5', '1–5 Monate'], ['6-12', '6–12 Monate'], ['gt12', 'über 1 Jahr']], { leer: '–' }) +
          E.auswahl(p + 'belastung', 'Belastung des Kindes', ANTWORT_IMPACT, { leer: '–' }) +
          bereiche.map(function (b) { return E.auswahl(p + b[0], 'Beeinträchtigung: ' + b[1], ANTWORT_IMPACT, { leer: '–' }); }).join('') +
          E.auswahl(p + 'andere', inf === 'lehrer' ? 'Belastung für Lehrkraft/Klasse (nicht gewertet)' : 'Belastung für andere (nicht gewertet)', ANTWORT_IMPACT, { leer: '–' }) + '</div>';
      }).join(''));
    return h;
  }
  function impactChip(d, inf) {
    var iw = impactWert(d, inf); if (iw == null) { return ''; }
    var e = KAT.einstufen(bandFuer(d.schema, inf, 'imp'), iw);
    return '<span class="chip ' + e.klasse + '">Impact ' + iw + ' · ' + B.esc(B.t(e.name, 'de')) + '</span>';
  }
  function teilUpdate(d) {
    var o = { 'sdq-gesamt': gesamtUi(d) };
    if (d.eingabe === 'items') { o['sdq-berechnet'] = ergebnisTabelleUi(d, auswerten(d)); }
    (d.informanten || []).forEach(function (inf) { o['sdq-imp-' + inf] = impactChip(d, inf); });
    return o;
  }
  function gesamtUi(d) {
    var ausw = auswerten(d), infs = d.informanten || [];
    var zeilen = infs.map(function (inf) { var z = ausw.je[inf].zeilen.filter(function (x) { return x.id === 'tot'; })[0]; return '<span><b>' + B.esc(INF_UI[inf]) + ':</b> ' + (z.wert == null ? '–' : z.wert + ' <span class="chip ' + z.band.klasse + '">' + B.esc(B.t(z.band.name, 'de')) + '</span>') + '</span>'; });
    return '<p class="klein" style="margin-top:10px;display:flex;gap:18px;flex-wrap:wrap"><b>Gesamtproblemwert</b> ' + zeilen.join('') + '</p>';
  }
  function ergebnisTabelleUi(d, ausw) {
    var infs = d.informanten || [];
    return '<div class="tabelle-scroll"><table class="wraster"><thead><tr><th>Skala</th>' + infs.map(function (i) { return '<th>' + B.esc(INF_UI[i]) + '</th>'; }).join('') + '</tr></thead><tbody>' +
      SKALEN.concat([GESAMT]).map(function (s) {
        return '<tr><td class="skala"><b>' + B.esc(B.t(s.name, 'de')) + '</b></td>' + infs.map(function (i) {
          var z = ausw.je[i].zeilen.filter(function (x) { return x.id === s.id; })[0];
          return '<td>' + (z.wert == null ? '<span class="leise">–</span>' : z.wert + (z.hoch ? ' <small class="leise">(hochgerechnet)</small>' : '') + ' <span class="chip ' + z.band.klasse + '">' + B.esc(B.t(z.band.name, 'de')) + '</span>') + '</td>';
        }).join('') + '</tr>';
      }).join('') + '</tbody></table></div>';
  }

  /* ---------------- Bericht ---------------- */
  var TITEL = L('Fragebogen zu Stärken und Schwächen (SDQ-Deu)', 'Questionnaire Points forts – Points faibles (SDQ-Fra)', 'Strengths and Difficulties Questionnaire (SDQ)');
  function formenText(infs, lang) {
    var t = { eltern: L('Elternfragebogen', 'questionnaire parents', 'parent form'), lehrer: L('Lehrerfragebogen', 'questionnaire enseignant·e', 'teacher form'), selbst: L('Selbstbericht', 'autoquestionnaire', 'self-report') };
    return B.liste(infs.map(function (i) { return B.t(t[i], lang) + ' (' + FORM[i] + ')'; }), lang);
  }
  var TITEL_OHNE = L('Fragebogen zu Stärken und Schwächen', 'Questionnaire Points forts – Points faibles', 'Strengths and Difficulties Questionnaire');
  var KUERZEL = L('SDQ-Deu', 'SDQ-Fra', 'SDQ');
  /* „Fragebogen zu Stärken und Schwächen (SDQ-Deu; Goodman, 1997): Elternfragebogen (P4-17) und …, 20.09.2026“ */
  function verfahrenZeile(lang, d) {
    var infs = d.informanten || [];
    return B.t(TITEL_OHNE, lang) + ' (' + B.t(KUERZEL, lang) + '; Goodman, 1997)' + (infs.length ? ': ' + formenText(infs, lang) : '') + (d.datum ? ', ' + B.datum(d.datum, lang) : '');
  }
  function bericht(lang, ctx, d, ausw) {
    var infs = (d.informanten || []).filter(function (i) { return ausw.je[i] && ausw.je[i].zeilen.some(function (z) { return z.wert != null; }); });
    var bl = [];
    var zweck = {
      de: 'Der SDQ ist ein kurzer Screening-Fragebogen zu Stärken und Schwierigkeiten im Verhalten und Erleben. Er umfasst die Skalen Emotionale Probleme, Verhaltensprobleme, Hyperaktivität, Verhaltensprobleme mit Gleichaltrigen und Prosoziales Verhalten; die vier Problemskalen ergeben zusammen den Gesamtproblemwert.',
      fr: 'Le SDQ est un bref questionnaire de dépistage des points forts et des difficultés sur le plan du comportement et du vécu émotionnel. Il comprend les échelles Symptômes émotionnels, Problèmes de conduite, Hyperactivité/inattention, Problèmes relationnels avec les pairs et Comportement prosocial ; les quatre échelles de difficultés forment le score total des difficultés.',
      en: 'The SDQ is a brief screening questionnaire covering strengths and difficulties in behaviour and emotional well-being. It comprises the scales Emotional symptoms, Conduct problems, Hyperactivity/inattention, Peer relationship problems and Prosocial behaviour; the four difficulty scales add up to the total difficulties score.'
    };
    bl.push({ t: 'p', text: zweck[lang] });
    if (!infs.length) { bl.push({ t: 'p', text: lang === 'fr' ? 'Aucun résultat n’a encore été saisi.' : (lang === 'en' ? 'No results have been entered yet.' : 'Es wurden noch keine Ergebnisse eingegeben.') }); return bl; }
    var schemaText = d.schema === '3'
      ? L('Die Einstufung folgt den dreistufigen Originalgrenzen (unauffällig, grenzwertig, auffällig) für die jeweilige Version.', 'La classification suit les seuils d’origine en trois catégories (normal, limite, anormal) propres à chaque version.', 'Classification follows the original three-band cut-offs (normal, borderline, abnormal) for each version.')
      : L('Die Einstufung folgt der vierstufigen Einteilung nach Goodman (nahe am Durchschnitt, leicht erhöht, hoch, sehr hoch) für die jeweilige Version.', 'La classification suit la répartition en quatre catégories de Goodman (proche de la moyenne, légèrement élevé, élevé, très élevé) propre à chaque version.', 'Classification follows Goodman’s four-band categorisation (close to average, slightly raised, high, very high) for each version.');
    var selbstDe = ctx.vorname ? ctx.vorname + ' selbst' : (ctx.alter && ctx.alter.j >= 12 ? 'der/dem Jugendlichen selbst' : 'dem Kind selbst');
    var wer = { de: 'Ausgefüllt wurde der Fragebogen von ' + B.liste(infs.map(function (i) { return { eltern: 'den Eltern', lehrer: 'der Lehrkraft', selbst: selbstDe + ' (Selbstbericht)' }[i]; }), 'de') + '.',
      fr: 'Le questionnaire a été rempli par ' + B.liste(infs.map(function (i) { return { eltern: 'les parents', lehrer: 'l’enseignant·e', selbst: (ctx.vorname || 'l’enfant') + ' (autoquestionnaire)' }[i]; }), 'fr') + '.',
      en: 'The questionnaire was completed by ' + B.liste(infs.map(function (i) { return { eltern: 'the parents', lehrer: 'the teacher', selbst: (ctx.vorname || 'the child') + ' (self-report)' }[i]; }), 'en') + '.' };
    bl.push({ t: 'p', text: TX.satz(wer[lang], lang) + ' ' + B.t(schemaText, lang) });
    /* Tabelle */
    var kopf = [SPRACHE[lang].spalten.skala].concat(infs.map(function (i) { return B.ersteGross(infName(i, lang)); }));
    var zeilen = SKALEN.concat([GESAMT]).map(function (s) {
      return [B.t(s.name, lang)].concat(infs.map(function (i) {
        var z = ausw.je[i].zeilen.filter(function (x) { return x.id === s.id; })[0];
        return z.wert == null ? '–' : z.wert + ' (' + B.t(z.band.name, lang) + ')';
      }));
    });
    var impZeile = [B.t(IMPACT.name, lang)].concat(infs.map(function (i) { var a = ausw.je[i]; return a.impact == null ? '–' : a.impact + ' (' + B.t(a.impactBand.name, lang) + ')'; }));
    if (impZeile.slice(1).some(function (x) { return x !== '–'; })) { zeilen.push(impZeile); }
    var hoch = infs.some(function (i) { return Object.keys(ausw.je[i].hochgerechnet).length; });
    bl.push({ t: 'tabelle', kopf: kopf, zeilen: zeilen, anmerkung: (lang === 'fr' ? 'Scores bruts ; entre parenthèses la classification.' : (lang === 'en' ? 'Raw scores; classification in brackets.' : 'Rohwerte; in Klammern die Einstufung.')) +
      (hoch ? (lang === 'fr' ? ' Certaines échelles ont été extrapolées (au moins 3 réponses sur 5).' : (lang === 'en' ? ' Some scale scores were prorated (at least 3 of 5 items answered).' : ' Einzelne Skalen wurden hochgerechnet (mindestens 3 von 5 Antworten).')) : '') });
    /* Text je Beurteiler: zuerst die fünf Skalen, dann der Gesamtproblemwert in einem eigenen Satz */
    infs.forEach(function (i) {
      var z = ausw.je[i].zeilen.filter(function (x) { return x.wert != null && x.id !== 'tot'; });
      var abs = TX.fragebogenAbsatz(lang, B.ersteGross(infBei(i, lang)), z);
      var ges = gesamtSatz(lang, ausw.je[i].zeilen.filter(function (x) { return x.id === 'tot'; })[0]);
      var imp = impactSatz(lang, ctx, d, i, ausw.je[i]);
      if (abs || ges || imp) { bl.push({ t: 'p', text: [abs, ges, imp].filter(Boolean).join(' ') }); }
    });
    var vgl = TX.vergleichAbsatz(lang, zeilenJe(ausw, infs), infs, SKALEN.concat([GESAMT]));
    if (vgl) { bl.push({ t: 'p', text: vgl }); }
    return bl;
  }
  function zeilenJe(ausw, infs) { var o = {}; infs.forEach(function (i) { o[i] = ausw.je[i].zeilen; }); return o; }
  function gesamtSatz(lang, z) {
    if (!z || z.wert == null || !z.band) { return ''; }
    var bn = B.t(z.band.name, lang);
    return TX.satz(lang === 'fr' ? 'Le score total des difficultés est de ' + z.wert + ' (' + bn + ')'
      : (lang === 'en' ? 'The total difficulties score is ' + z.wert + ' (' + bn + ')' : 'Der Gesamtproblemwert beträgt ' + z.wert + ' (' + bn + ')'), lang);
  }
  function impactSatz(lang, ctx, d, inf, a) {
    var im = (d.impact || {})[inf] || {};
    var s = B.num(im.schwierig);
    if (s == null) { return ''; }
    var bei = infBei(inf, lang);
    if (s === 0) {
      return TX.satz(lang === 'fr' ? B.ersteGross(bei) + ', ' + ctx.name + ' ne présente pas de difficultés dans l’ensemble' : (lang === 'en' ? B.ersteGross(bei) + ', ' + ctx.name + ' has no difficulties overall' : B.ersteGross(bei) + ' bestehen insgesamt keine Schwierigkeiten'), lang);
    }
    var grad = { 1: L('leichte', 'légères', 'minor'), 2: L('deutliche', 'nettes', 'definite'), 3: L('massive', 'importantes', 'severe') }[s];
    var dauer = { lt1: L('seit weniger als einem Monat', 'depuis moins d’un mois', 'for less than a month'), '1-5': L('seit ein bis fünf Monaten', 'depuis un à cinq mois', 'for one to five months'), '6-12': L('seit sechs bis zwölf Monaten', 'depuis six à douze mois', 'for six to twelve months'), gt12: L('seit mehr als einem Jahr', 'depuis plus d’un an', 'for more than a year') }[im.dauer];
    var BER = { zuhause: L('zu Hause', 'à la maison', 'at home'), freunde: inf === 'lehrer' ? L('in den Beziehungen zu Gleichaltrigen', 'dans les relations avec les pairs', 'in peer relationships') : L('bei Freundschaften', 'dans les amitiés', 'in friendships'), lernen: L('beim Lernen im Unterricht', 'dans les apprentissages en classe', 'in classroom learning'), freizeit: L('in der Freizeit', 'dans les loisirs', 'in leisure activities') };
    var betroffen = BEREICHE_IMPACT[inf].filter(function (k) { return B.num(im[k]) >= 2; }).map(function (k) { return B.t(BER[k], lang); });
    var t1 = lang === 'fr' ? B.ersteGross(bei) + ', ' + ctx.name + ' présente des difficultés ' + B.t(grad, lang) + (dauer ? ' ' + B.t(dauer, lang) : '')
      : (lang === 'en' ? B.ersteGross(bei) + ', ' + ctx.name + ' has ' + B.t(grad, lang) + ' difficulties' + (dauer ? ', present ' + B.t(dauer, lang) : '')
        : B.ersteGross(bei) + ' bestehen ' + B.t(grad, lang) + ' Schwierigkeiten' + (dauer ? ' ' + B.t(dauer, lang) : ''));
    var t2 = '', bel = B.num(im.belastung);
    if (bel >= 2) {
      var stark = bel === 3;
      t2 = lang === 'fr' ? 'Ces difficultés pèsent ' + (stark ? 'fortement' : 'nettement') + ' sur ' + ctx.name
        : (lang === 'en' ? 'They cause ' + ctx.name + ' ' + (stark ? 'great' : 'considerable') + ' distress' : 'Sie belasten ' + ctx.name + ' ' + (stark ? 'schwer' : 'deutlich'));
    }
    if (betroffen.length) {
      var t2b = lang === 'fr' ? 'Un retentissement marqué est rapporté ' + B.liste(betroffen, lang) : (lang === 'en' ? 'A marked impact is reported ' + B.liste(betroffen, lang) : 'Deutliche oder schwere Beeinträchtigungen bestehen ' + B.liste(betroffen, lang));
      t2 = t2 ? t2 + (lang === 'de' ? '. ' : '. ') + t2b : t2b;
    }
    var t3 = a.impact != null ? (lang === 'fr' ? 'Score d’impact : ' + a.impact + ' (' + B.t(a.impactBand.name, lang) + ')' : (lang === 'en' ? 'Impact score: ' + a.impact + ' (' + B.t(a.impactBand.name, lang) + ')' : 'Impact-Wert: ' + a.impact + ' (' + B.t(a.impactBand.name, lang) + ')')) : '';
    return [t1, t2, t3].filter(Boolean).map(function (x) { return TX.satz(x, lang); }).join(' ');
  }
  function zusammenfassung(lang, ctx, d, ausw) {
    var infs = (d.informanten || []).filter(function (i) { return ausw.je[i] && ausw.je[i].werte.tot != null; });
    if (!infs.length) { return ''; }
    function wer(id) {
      var bei = infs.filter(function (i) { var z = ausw.je[i].zeilen.filter(function (x) { return x.id === id; })[0]; return z.band && z.band.rang >= 2; });
      return bei.length ? B.liste(bei.map(function (i) { return infName(i, lang); }), lang) : '';
    }
    var skalen = [];
    SKALEN.forEach(function (s) { var w = wer(s.id); if (w) { skalen.push(B.t(s.name, lang) + ' (' + w + ')'); } });
    var tot = wer('tot');
    if (!skalen.length && !tot) {
      return lang === 'fr' ? 'SDQ : aucune échelle dans la zone clinique.' : (lang === 'en' ? 'SDQ: no scale in the clinical range.' : 'SDQ: keine Skala im auffälligen Bereich.');
    }
    if (lang === 'fr') {
      return 'SDQ : zone clinique pour ' + [skalen.length ? (skalen.length === 1 ? 'l’échelle ' : 'les échelles ') + B.liste(skalen, lang) : '', tot ? 'le score total des difficultés (' + tot + ')' : ''].filter(Boolean).join(', ainsi que pour ') + '.';
    }
    if (lang === 'en') {
      return 'SDQ: clinical range for ' + [skalen.length ? B.liste(skalen, lang) : '', tot ? 'the total difficulties score (' + tot + ')' : ''].filter(Boolean).join(', as well as for ') + '.';
    }
    return 'SDQ: auffällige Werte für ' + [skalen.length ? B.liste(skalen, lang) : '', tot ? 'den Gesamtproblemwert (' + tot + ')' : ''].filter(Boolean).join(' sowie für ') + '.';
  }
  function hinweise(lang, ctx, d, ausw) {
    var infs = (d.informanten || []).filter(function (i) { return ausw.je[i]; });
    function mehrfach(id) { return infs.filter(function (i) { var z = ausw.je[i].zeilen.filter(function (x) { return x.id === id; })[0]; return z && z.band && z.band.rang >= 2; }).length; }
    var h = [];
    if (mehrfach('hy') >= 1) { h.push(lang === 'fr' ? 'Les scores élevés à l’échelle Hyperactivité/inattention (SDQ) justifient un approfondissement à l’aide d’un instrument plus détaillé (p. ex. Conners 3 ou DISYPS-III), complété par l’anamnèse et l’observation dans plusieurs contextes.'
      : (lang === 'en' ? 'The raised Hyperactivity/inattention scores (SDQ) should be explored further with a more detailed instrument (e.g. Conners 3 or DISYPS-III), together with the developmental history and observation in several settings.'
        : 'Die erhöhten Werte für Hyperaktivität (SDQ) sollten mit einem ausführlicheren Verfahren (z. B. Conners 3 oder DISYPS-III) sowie über Entwicklungsgeschichte und Beobachtung in mehreren Lebensbereichen vertieft werden.')); }
    if (mehrfach('em') >= 1) { h.push(lang === 'fr' ? 'Les symptômes émotionnels relevés (SDQ) méritent d’être approfondis lors d’un entretien et, si nécessaire, à l’aide d’un questionnaire spécifique (p. ex. anxiété, humeur).'
      : (lang === 'en' ? 'The emotional symptoms reported (SDQ) should be explored in an interview and, if needed, with a specific questionnaire (e.g. anxiety, mood).'
        : 'Die berichteten emotionalen Probleme (SDQ) sollten im Gespräch und bei Bedarf mit einem spezifischen Fragebogen (z. B. zu Angst oder Stimmung) vertieft werden.')); }
    return h;
  }
  function warnung(d, fall) {
    var a = B.alter(fall.kind.geburtsdatum, d.datum || fall.bericht.datumVon);
    if (a && (d.informanten || []).indexOf('selbst') >= 0 && a.j < 11) { return 'Der Selbstbericht (S11-17) ist für 11- bis 17-Jährige vorgesehen – das Kind ist ' + B.alterText(a, 'de') + ' alt.'; }
    if (a && (a.j < 4 || a.j > 17)) { return 'Die Versionen P4-17/T4-17 sind für 4- bis 17-Jährige normiert.'; }
    return '';
  }
  function fertig(d) {
    var ausw = auswerten(d);
    return (d.informanten || []).length > 0 && (d.informanten || []).every(function (i) { return ausw.je[i] && ausw.je[i].werte.tot != null && ausw.je[i].werte.pr != null; });
  }
  /* Übernahme aus der früheren Version */
  function ausAlt(alt) {
    var f = alt.fields || {}, r = (alt.radios || {})['sdq-resp'] || 'parent';
    var inf = { parent: 'eltern', teacher: 'lehrer', self: 'selbst' }[r] || 'eltern';
    var hat = ['em', 'co', 'hy', 'pe', 'pr'].some(function (k) { return f['sdq-' + k] != null && f['sdq-' + k] !== ''; });
    if (!hat) { return null; }
    var d = neu(); d.informanten = [inf];
    ['em', 'co', 'hy', 'pe', 'pr'].forEach(function (k) { if (f['sdq-' + k] != null) { d.werte[inf][k] = String(f['sdq-' + k]); } });
    var im = d.impact[inf];
    if (f['sdq-impact-any'] != null) { im.schwierig = String(f['sdq-impact-any']); }
    if (f['sdq-impact-dur']) { im.dauer = ({ lt1: 'lt1', '1-5': '1-5', '6-12': '6-12', gt12: 'gt12', 'gt1y': 'gt12' })[f['sdq-impact-dur']] || ''; }
    [['distress', 'belastung'], ['home', 'zuhause'], ['friends', 'freunde'], ['class', 'lernen'], ['leisure', 'freizeit'], ['burden', 'andere']].forEach(function (p) {
      if (f['sdq-impact-' + p[0]] != null && f['sdq-impact-' + p[0]] !== '') { im[p[1]] = String(f['sdq-impact-' + p[0]]); }
    });
    return d;
  }

  KAT.registrieren({
    id: 'sdq', kurz: 'SDQ', kurzUi: 'SDQ', name: TITEL, gruppe: 'verhalten', alter: [4, 17], informantenText: 'Eltern, Lehrkraft, Selbst (ab 11)',
    hilfe: 'Eine Spalte je Fragebogen – Eltern, Lehrkraft und Selbstbericht werden getrennt eingegeben und im Bericht verglichen.',
    neu: neu, formular: formular, auswerten: auswerten, chip: chip, teilUpdate: teilUpdate, bericht: bericht, verfahrenZeile: verfahrenZeile,
    zusammenfassung: zusammenfassung, hinweise: hinweise, warnung: warnung, fertig: fertig, ausAlt: ausAlt,
    pruefen: ['Deutsche Skalennamen „Hyperaktivität“ und „Verhaltensprobleme mit Gleichaltrigen“ am deutschen Auswertungsbogen bestätigen.',
      'Französischer Titel „Questionnaire Points forts – Points faibles“ und die FR-Skalennamen an der französischen Fassung bestätigen.',
      'Deutscher Wortlaut der Impact-Antworten („gar nicht / kaum / deutlich / schwer“).',
      'Soll zusätzlich die deutsche Normierung (Woerner et al.) als Grenzwert-Option angeboten werden?']
  });
})();
