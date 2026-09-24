/* =====================================================================
   KABC-II – Kaufman Assessment Battery for Children – II
   (Kaufman & Kaufman, 2004; deutsche Fassung: Melchers & Melchers, 2015,
   Pearson; französische Fassung: ECPA, 2008)
   ---------------------------------------------------------------------
   Auswertungsmodell wie im Manual: CHC → Fluid-Kristallin-Index (FKI),
   Luria → Mentaler Verarbeitungsindex (MVI, ohne Wissen/Gc),
   nonverbal → Nonverbaler Index (NVI). Kürzel je Berichtssprache:
   DE FKI/MVI/NVI · FR IFC/IPM/INV · EN FCI/MPI/NVI.
   Skalen: Sequenzielles Denken/Gsm, Simultanes Denken/Gv,
   Lernfähigkeit/Glr, Planungsfähigkeit/Gf (ab 7 Jahren), Wissen/Gc
   (nur CHC). Indexwerte, PR und KI werden eingegeben – das Tool rechnet
   keine Normwerte. Keine Deutung „FKI vs. NVI = verbal vs. nonverbal“.
   Persönliche Stärken/Schwächen nur, wenn die kritischen Werte aus dem
   Manual eingetragen sind (Vergleich mit dem Mittelwert der
   Skalenindizes des gewählten Modells – eine sichere Rechnung).
   ===================================================================== */
(function () {
  var L = KAT.L;
  var GLOBAL = {
    fki: { id: 'fki', name: L('Fluid-Kristallin-Index', 'Indice fluide-cristallisé', 'Fluid-Crystallized Index'), mit: L('der Fluid-Kristallin-Index', 'l’indice fluide-cristallisé', 'the Fluid-Crystallized Index'), kurz: L('FKI', 'IFC', 'FCI') },
    mvi: { id: 'mvi', name: L('Mentaler Verarbeitungsindex', 'Indice de processus mentaux', 'Mental Processing Index'), mit: L('der Mentale Verarbeitungsindex', 'l’indice de processus mentaux', 'the Mental Processing Index'), kurz: L('MVI', 'IPM', 'MPI') },
    nvi: { id: 'nvi', name: L('Nonverbaler Index', 'Indice non verbal', 'Nonverbal Index'), mit: L('der Nonverbale Index', 'l’indice non verbal', 'the Nonverbal Index'), kurz: L('NVI', 'INV', 'NVI') }
  };
  /* Skalen in der Reihenfolge des Manuals */
  var SKALEN = [
    { id: 'gsm', name: L('Sequenzielles Denken/Gsm', 'Séquentiel/Gsm', 'Sequential/Gsm') },
    { id: 'gv', name: L('Simultanes Denken/Gv', 'Simultané/Gv', 'Simultaneous/Gv') },
    { id: 'glr', name: L('Lernfähigkeit/Glr', 'Apprentissage/Glr', 'Learning/Glr') },
    { id: 'gf', name: L('Planungsfähigkeit/Gf', 'Planification/Gf', 'Planning/Gf') },
    { id: 'gc', name: L('Wissen/Gc', 'Connaissances/Gc', 'Knowledge/Gc') }
  ];
  var MODELLE = {
    chc: { haupt: 'fki', weitere: ['mvi', 'nvi'], skalen: ['gsm', 'gv', 'glr', 'gf', 'gc'], ui: 'Cattell-Horn-Carroll (CHC) → FKI', kurzUi: 'CHC-Modell' },
    luria: { haupt: 'mvi', weitere: ['nvi'], skalen: ['gsm', 'gv', 'glr', 'gf'], ui: 'Luria → MVI', kurzUi: 'Luria-Modell' },
    nv: { haupt: 'nvi', weitere: [], skalen: [], ui: 'nonverbal → NVI', kurzUi: 'nonverbal' }
  };
  var NORMEN = {
    'de-2015': { ui: 'Deutsche Fassung (2015)', fassung: L('deutsche Fassung: Melchers & Melchers, 2015', 'version allemande : Melchers & Melchers, 2015', 'German edition: Melchers & Melchers, 2015'),
      bezug: L('die deutschen Normen (Melchers & Melchers, 2015)', 'aux normes allemandes (Melchers & Melchers, 2015)', 'the German norms (Melchers & Melchers, 2015)') },
    'fr-2008': { ui: 'Version française (ECPA, 2008)', fassung: L('französische Fassung: ECPA, 2008', 'version française : ECPA, 2008', 'French edition: ECPA, 2008'),
      bezug: L('die französischen Normen (ECPA, 2008)', 'aux normes françaises (ECPA, 2008)', 'the French norms (ECPA, 2008)') }
  };
  /* Kategorien des US-Manuals: ≤ 69 Lower Extreme · 70–84 Below Average · 85–115 Average · 116–130 Above Average · ≥ 131 Upper Extreme */
  KAT.bandDefinieren('kabc-5', { art: 'leistung', pruefen: 'KABC-II: Grenzen wie im US-Manual (≤ 69 · 70–84 · 85–115 · 116–130 · ≥ 131); die deutschen und französischen Bezeichnungen am jeweiligen Manual prüfen.', stufen: [
    { bis: 69, rang: -2, name: L('weit unterdurchschnittlich', 'très inférieur à la moyenne', 'lower extreme') },
    { bis: 84, rang: -1, name: L('unterdurchschnittlich', 'inférieur à la moyenne', 'below average') },
    { bis: 115, rang: 0, name: L('durchschnittlich', 'dans la moyenne', 'average') },
    { bis: 130, rang: 1, name: L('überdurchschnittlich', 'supérieur à la moyenne', 'above average') },
    { bis: Infinity, rang: 2, name: L('weit überdurchschnittlich', 'très supérieur à la moyenne', 'upper extreme') }] });

  var P = 'tests.kabc.idx.';
  function neu() { return { datum: '', normen: 'de-2015', modell: 'chc', ki: '95', testsprache: '', instruktion: '', nichtErstsprache: false, idx: { wert: {}, pr: {}, kiVon: {}, kiBis: {}, krit: {} }, profil: '' }; }
  function normen(d) { return NORMEN[d.normen] || NORMEN['de-2015']; }
  function modell(d) { return MODELLE[d.modell] ? d.modell : 'chc'; }
  function zeile(def, art, d) {
    var w = E.zahl(P + 'wert.' + def.id, 40, 160, true), von = E.zahl(P + 'kiVon.' + def.id, 40, 160, true), bis = E.zahl(P + 'kiBis.' + def.id, 40, 160, true);
    return { id: def.id, def: def, name: def.name, kurz: def.kurz, art: art, wert: w, pr: E.zahl(P + 'pr.' + def.id, 0.1, 99.9),
      ki: von != null && bis != null && von <= bis ? { von: von, bis: bis, niveau: d.ki || '95' } : null,
      krit: art === 'skala' ? E.zahl(P + 'krit.' + def.id, 1, 40, true) : null, band: w == null ? null : KAT.einstufen('kabc-5', w) };
  }
  function auswerten(d, fall) {
    fall = fall || FALL;
    var m = modell(d), M = MODELLE[m];
    var globale = [M.haupt].concat(M.weitere).map(function (id, i) { var z = zeile(GLOBAL[id], 'global', d); z.haupt = i === 0; return z; });
    var skalen = SKALEN.filter(function (s) { return M.skalen.indexOf(s.id) >= 0; }).map(function (s) { return zeile(s, 'skala', d); });
    var a = B.alter((fall.kind || {}).geburtsdatum, d.datum || (fall.bericht || {}).datumVon);
    /* Skalen, die in den Mittelwert gehören: alle des Modells; Planungsfähigkeit/Gf erst ab 7 Jahren; mit 3 Jahren keine Skalen */
    var erwartet = a && a.j < 4 ? [] : skalen.filter(function (s) { return s.id !== 'gf' || (a ? a.j >= 7 : s.wert != null); });
    var mittel = erwartet.length >= 2 && erwartet.every(function (s) { return s.wert != null; }) ? erwartet.reduce(function (x, s) { return x + s.wert; }, 0) / erwartet.length : null;
    skalen.forEach(function (s) {
      s.diff = mittel != null && s.wert != null && erwartet.indexOf(s) >= 0 ? s.wert - mittel : null;
      s.ps = s.diff != null && s.krit != null ? (s.diff >= s.krit ? 'staerke' : (s.diff <= -s.krit ? 'schwaeche' : 'keine')) : null;
    });
    return { modell: m, globale: globale, skalen: skalen, mittel: mittel, anzahl: erwartet.length, alter: a };
  }
  function chip(pfad, n) { return /\.idx\.wert\./.test(pfad) ? KAT.einstufen('kabc-5', n) : null; }
  function r1(x) { return Math.round(x * 10) / 10; }
  function vorzeichen(x, lang) { var r = r1(x); return (r > 0 ? '+' : (r < 0 ? '−' : '±')) + B.zahl(Math.abs(r), lang); }

  /* ---------------- Formular ---------------- */
  function spracheHinweis(d, fall) {
    var ts = d.testsprache ? (spracheErkennen(d.testsprache) || d.testsprache) : '';
    var k = (fall && fall.kind) || {};
    var fam = (k.familiensprachen || []).concat(sprachenZerlegen(k.familiensprachenAndere).codes);
    if (!ts || !fam.length || d.nichtErstsprache || fam.indexOf(ts) >= 0) { return ''; }
    return E.hinweis('Die Testsprache (' + B.esc(spracheName(ts, 'de')) + ') ist keine der angegebenen Familiensprachen (' + B.esc(sprachenText(k.familiensprachen, k.familiensprachenAndere, 'de')) + '). Wenn sie nicht die Erstsprache ist, bitte den Haken setzen.', 'info');
  }
  function modellHinweis(d) {
    var t = 'Modellwahl laut Manual: Standard ist das CHC-Modell (FKI). Das Luria-Modell (MVI, ohne Wissen/Gc) ist vorgesehen, wenn erworbenes Wissen und Sprache das Ergebnis verzerren würden – etwa bei zwei- oder mehrsprachigem Hintergrund, bei einem kulturellen Hintergrund, der den Erwerb von Wissen und Sprache beeinflusst haben kann, oder bei (vermuteter) Sprachstörung. Der NVI ist für Kinder gedacht, die die Testsprache kaum beherrschen oder eine Hör-, Sprach- oder Sprechbeeinträchtigung haben.';
    if (d.nichtErstsprache && modell(d) === 'chc') { t = '<b>Die Testsprache ist nicht die Erstsprache – laut Manual ist dann in der Regel das Luria-Modell (MVI) angezeigt.</b> ' + t; }
    return E.hinweis(t, 'info');
  }
  function profilUi(d, fall) {
    var a = auswerten(d, fall);
    if (!a.skalen.length) { return ''; }
    if (a.alter && a.alter.j < 4) { return '<p class="klein leise" style="margin-top:10px">Mit 3 Jahren gibt es keinen Vergleich der Skalen mit ihrem Mittelwert.</p>'; }
    if (a.mittel == null) { return '<p class="klein leise" style="margin-top:10px">Mittelwert der Skalenindizes: erscheint, sobald alle Skalen des Modells eingetragen sind' + (a.alter ? '' : ' (ohne Geburtsdatum zählt Planungsfähigkeit/Gf nur mit, wenn eingetragen)') + '.</p>'; }
    var teile = a.skalen.filter(function (s) { return s.diff != null; }).map(function (s) {
      return '<span>' + B.esc(B.t(s.name, 'de')) + ' ' + vorzeichen(s.diff, 'de') + (s.ps === 'staerke' ? ' <span class="chip hoch">persönliche Stärke</span>' : (s.ps === 'schwaeche' ? ' <span class="chip niedrig">persönliche Schwäche</span>' : (s.ps === 'keine' ? ' <span class="chip ok">nicht bedeutsam</span>' : ''))) + '</span>';
    });
    return '<p class="klein" style="display:flex;gap:14px;flex-wrap:wrap;margin-top:10px"><span><b>Mittelwert der ' + a.anzahl + ' Skalenindizes:</b> ' + B.zahl(r1(a.mittel), 'de') + '</span>' + teile.join('') + '</p>';
  }
  function formular(d, fall) {
    var f = fall || FALL, m = modell(d), M = MODELLE[m];
    var h = E.karte('<h2>Durchführung</h2><div class="raster">' + E.feld('tests.kabc.datum', 'Datum', { typ: 'date' }) +
      E.auswahl('tests.kabc.normen', 'Normen', Object.keys(NORMEN).map(function (k) { return [k, NORMEN[k].ui]; })) +
      E.auswahl('tests.kabc.modell', 'Auswertungsmodell', Object.keys(MODELLE).map(function (k) { return [k, MODELLE[k].ui]; }), { neu: true }) +
      E.auswahl('tests.kabc.ki', 'Konfidenzintervall', [['95', '95 %'], ['90', '90 %']]) +
      E.sprachAuswahl('tests.kabc.testsprache', 'Testsprache', { neu: true }) +
      E.sprachAuswahl('tests.kabc.instruktion', 'Erklärungen zusätzlich auf (optional)', { leer: '– keine –' }) + '</div>' +
      '<div style="margin-top:12px">' + E.haken('tests.kabc.nichtErstsprache', 'Die Testsprache ist nicht die Erstsprache des Kindes', 'Dann weist der Bericht darauf hin, dass sprachgebundene Ergebnisse vorsichtig zu deuten sind.', true) + '</div>' +
      spracheHinweis(d, f) + modellHinweis(d));
    function globalZeile(id) { return { id: id, name: B.t(GLOBAL[id].name, 'de') + ' (' + B.t(GLOBAL[id].kurz, 'de') + ')', nurSpalten: ['wert', 'pr', 'kiVon', 'kiBis'] }; }
    var zeilen = [{ trenner: 'Globalindex (' + M.kurzUi + ')' }, globalZeile(M.haupt)];
    if (M.weitere.length) { zeilen.push({ trenner: 'Weitere Globalindizes (optional)' }); M.weitere.forEach(function (id) { zeilen.push(globalZeile(id)); }); }
    if (M.skalen.length) {
      zeilen.push({ trenner: 'Skalenindizes' });
      SKALEN.filter(function (s) { return M.skalen.indexOf(s.id) >= 0; }).forEach(function (s) { zeilen.push({ id: s.id, name: B.t(s.name, 'de'), hinweis: s.id === 'gf' ? 'ab 7 Jahren' : (s.id === 'gc' ? 'nur im CHC-Modell (FKI)' : '') }); });
    }
    h += E.karte('<h2>Indexwerte</h2><p class="klein">Aus dem Protokollbogen bzw. dem Auswertungsprogramm: Indexwert (Mittelwert 100, Standardabweichung 15), Prozentrang und Konfidenzintervall. Leere Felder erscheinen im Bericht nicht.' +
      (M.skalen.length ? '' : ' Beim nonverbalen Modell werden keine Skalenindizes gebildet.') + '</p>' +
      E.raster({ basis: 'tests.kabc.idx', kopfSkala: 'Index', chipAmEnde: true, spalten: [
        { id: 'wert', label: 'Indexwert', min: 40, max: 160, ganz: true },
        { id: 'pr', label: 'PR', min: 0.1, max: 99.9, ganz: false, ohneChip: true },
        { id: 'kiVon', label: 'KI von', min: 40, max: 160, ganz: true, ohneChip: true },
        { id: 'kiBis', label: 'KI bis', min: 40, max: 160, ganz: true, ohneChip: true }], zeilen: zeilen,
        einstufen: function (z, s, n) { return s === 'wert' ? KAT.einstufen('kabc-5', n) : null; } }));
    if (M.skalen.length) {
      h += E.karte('<h2>Persönliche Stärken und Schwächen (optional)</h2><p class="klein">Vergleich jeder Skala mit dem Mittelwert der Skalenindizes des gewählten Modells. Den <b>kritischen Wert</b> (Differenz, ab der eine Abweichung bedeutsam ist) aus dem Manual eintragen – nur Skalen mit kritischem Wert werden im Bericht bewertet. Den Mittelwert und die Abweichungen rechnet das Tool.</p>' +
        E.raster({ basis: 'tests.kabc.idx', kopfSkala: 'Skala', spalten: [{ id: 'krit', label: 'Kritischer Wert', min: 1, max: 40, ganz: true, ohneChip: true }],
          zeilen: SKALEN.filter(function (s) { return M.skalen.indexOf(s.id) >= 0; }).map(function (s) { return { id: s.id, name: B.t(s.name, 'de') }; }),
          einstufen: function () { return null; } }) +
        '<div id="kabc-profil">' + profilUi(d, f) + '</div>');
    }
    h += E.karte('<h2>Weitere Ergebnisse (optional)</h2>' + E.textfeld('tests.kabc.profil', 'Weitere Ergebnisse laut Protokollbogen (erscheinen als eigener Absatz im Bericht)', { zeilen: 3, platzhalter: 'z. B. geplante Vergleiche mit kritischen Werten und Basisraten aus dem Manual.' }));
    return h;
  }
  function teilUpdate(d, fall) { return { 'kabc-profil': profilUi(d, fall || FALL) }; }

  /* ---------------- Bericht ---------------- */
  var ZWECK = {
    de: 'Die KABC-II (Kaufman Assessment Battery for Children – II) ist ein Einzeltest zur Erfassung kognitiver Fähigkeiten von Kindern und Jugendlichen von 3;0 bis 18;11 Jahren. Sie beruht auf zwei theoretischen Modellen: Nach dem Cattell-Horn-Carroll-Modell (CHC) wird der Fluid-Kristallin-Index (FKI) gebildet, der auch erworbenes Wissen einschließt, nach dem Luria-Modell der Mentale Verarbeitungsindex (MVI), der Wissen ausklammert. Der Nonverbale Index (NVI) beruht auf Untertests, die mit Gesten instruiert und ohne sprachliche Antworten bearbeitet werden können. Es gibt fünf Skalen: Sequenzielles Denken/Gsm, Simultanes Denken/Gv, Lernfähigkeit/Glr, Planungsfähigkeit/Gf (ab 7 Jahren) und Wissen/Gc (nur im CHC-Modell). Indexwerte haben einen Mittelwert von 100 (Standardabweichung 15).',
    fr: 'Le KABC-II (Batterie pour l’examen psychologique de l’enfant, 2e édition) est un test individuel qui évalue les capacités cognitives des enfants et adolescents de 3 ans à 18 ans et 11 mois. Il repose sur deux modèles théoriques : le modèle de Cattell-Horn-Carroll (CHC) donne l’indice fluide-cristallisé (IFC), qui inclut les connaissances acquises, et le modèle de Luria donne l’indice de processus mentaux (IPM), qui les exclut. L’indice non verbal (INV) repose sur des subtests qui peuvent être présentés par gestes et ne demandent pas de réponse verbale. Le test comprend cinq échelles : Séquentiel/Gsm, Simultané/Gv, Apprentissage/Glr, Planification/Gf (à partir de 7 ans) et Connaissances/Gc (modèle CHC uniquement). Les indices ont une moyenne de 100 (écart type 15).',
    en: 'The KABC-II (Kaufman Assessment Battery for Children, Second Edition) is an individually administered test of cognitive abilities for children and adolescents aged 3;0 to 18;11. It is based on two theoretical models: the Cattell-Horn-Carroll (CHC) model yields the Fluid-Crystallized Index (FCI), which includes acquired knowledge, and the Luria model yields the Mental Processing Index (MPI), which excludes it. The Nonverbal Index (NVI) is based on subtests that can be presented with gestures and answered without speaking. There are five scales: Sequential/Gsm, Simultaneous/Gv, Learning/Glr, Planning/Gf (from age 7) and Knowledge/Gc (CHC model only). Index scores have a mean of 100 (standard deviation 15).'
  };
  function titel(lang) { return lang === 'fr' ? 'KABC-II – Batterie pour l’examen psychologique de l’enfant, 2e édition' : (lang === 'en' ? 'KABC-II – Kaufman Assessment Battery for Children, Second Edition' : 'KABC-II – Kaufman Assessment Battery for Children – II'); }
  function modellText(lang, m) {
    if (m === 'luria') { return lang === 'fr' ? 'modèle de Luria' : (lang === 'en' ? 'Luria model' : 'Luria-Modell'); }
    if (m === 'nv') { return lang === 'fr' ? 'indice non verbal' : (lang === 'en' ? 'Nonverbal Index' : 'Nonverbaler Index'); }
    return lang === 'fr' ? 'modèle CHC' : (lang === 'en' ? 'CHC model' : 'CHC-Modell');
  }
  function verfahrenZeile(lang, d) {
    return titel(lang) + ' (' + B.t(normen(d).fassung, lang) + '): ' + modellText(lang, modell(d)) + (d.datum ? ', ' + B.datum(d.datum, lang) : '');
  }
  function kiKopf(lang, niveau) { niveau = niveau || '95'; return lang === 'en' ? niveau + '% CI' : (lang === 'fr' ? 'IC ' : 'KI ') + B.prozent(niveau, lang); }
  function spracheSatz(lang, d) {
    if (!d.testsprache) { return ''; }
    var ts = spracheText(d.testsprache, lang);
    var ik = d.instruktion ? (spracheErkennen(d.instruktion) || SPRACHEN_LISTE.some(function (x) { return x[0] === d.instruktion; }) ? spracheText(d.instruktion, lang) : null) : '';
    var s = lang === 'fr' ? 'Le test a été administré en ' + ts : (lang === 'en' ? 'The test was administered in ' + ts : 'Durchgeführt wurde der Test auf ' + ts);
    if (ik) { s += lang === 'fr' ? ' ; des explications ont en outre été données en ' + ik : (lang === 'en' ? '; additional explanations were given in ' + ik : '; Erklärungen wurden zusätzlich auf ' + ik + ' gegeben'); }
    else if (ik === null) { s += ' (' + (lang === 'fr' ? 'consignes : ' : (lang === 'en' ? 'instructions: ' : 'Instruktion: ')) + d.instruktion + ')'; }
    return s;
  }
  function modellSatz(lang, m) {
    if (m === 'luria') { return lang === 'fr' ? 'L’interprétation suit le modèle de Luria ; l’indice global est l’indice de processus mentaux (IPM), qui n’inclut pas l’échelle Connaissances/Gc' : (lang === 'en' ? 'Scoring followed the Luria model; the global score is the Mental Processing Index (MPI), which does not include the Knowledge/Gc scale' : 'Ausgewertet wurde nach dem Luria-Modell; Globalindex ist der Mentale Verarbeitungsindex (MVI), der die Skala Wissen/Gc nicht enthält'); }
    if (m === 'nv') { return lang === 'fr' ? 'L’indice non verbal (INV) a été retenu comme indice global' : (lang === 'en' ? 'The Nonverbal Index (NVI) was used as the global score' : 'Als Globalindex wurde der Nonverbale Index (NVI) ausgewertet'); }
    return lang === 'fr' ? 'L’interprétation suit le modèle CHC ; l’indice global est l’indice fluide-cristallisé (IFC)' : (lang === 'en' ? 'Scoring followed the CHC model; the global score is the Fluid-Crystallized Index (FCI)' : 'Ausgewertet wurde nach dem CHC-Modell; Globalindex ist der Fluid-Kristallin-Index (FKI)');
  }
  function imBereich(band, lang) {
    var bn = B.t(band.name, lang);
    if (lang === 'fr') { return /^dans /.test(bn) ? 'se situe ' + bn : 'est ' + bn; }
    if (lang === 'en') { return 'in the ' + bn + ' range'; }
    return 'im ' + bn + 'en Bereich';
  }
  function prText(lang, pr) { return (lang === 'fr' ? 'rang centile ' : 'PR ') + B.zahl(pr, lang); }
  function globalSatz(lang, z) {
    var k = [];
    if (z.pr != null) { k.push((lang === 'en' ? 'percentile rank ' : (lang === 'fr' ? 'rang centile ' : 'PR ')) + B.zahl(z.pr, lang)); }
    if (z.ki) { k.push(kiKopf(lang, z.ki.niveau) + ' ' + z.ki.von + '–' + z.ki.bis); }
    var kl = k.length ? ' (' + k.join('; ') + ')' : '';
    var n = B.ersteGross(B.t(z.def.mit, lang)) + ' (' + B.t(z.kurz, lang) + ')';
    if (lang === 'fr') { return TX.satz(n + ' est de ' + z.wert + kl + ' ; ce résultat ' + imBereich(z.band, lang), lang); }
    if (lang === 'en') { return TX.satz(n + ' is ' + z.wert + kl + ', which is ' + imBereich(z.band, lang), lang); }
    return TX.satz(n + ' beträgt ' + z.wert + kl + ' und liegt damit ' + imBereich(z.band, lang), lang);
  }
  function eintrag(lang, z, mitBand) {
    var t = [String(z.wert)];
    if (z.pr != null) { t.push(prText(lang, z.pr)); }
    if (mitBand) { t.push(B.t(z.band.name, lang)); }
    return t;
  }
  function weitereSatz(lang, liste) {
    var teile = liste.map(function (z) {
      var e = eintrag(lang, z, true), n = B.t(z.name, lang);
      /* FR: nach dem Doppelpunkt klein („indice non verbal“) */
      return (lang === 'fr' ? n.charAt(0).toLowerCase() + n.slice(1) : n) + ' (' + B.t(z.kurz, lang) + ') ' + e[0] + ' (' + e.slice(1).join('; ') + ')';
    });
    var kopf = liste.length === 1 ? { de: 'Weiterer Globalindex: ', fr: 'Autre indice global : ', en: 'Other global index: ' } : { de: 'Weitere Globalindizes: ', fr: 'Autres indices globaux : ', en: 'Other global indexes: ' };
    return TX.satz(kopf[lang] + B.liste(teile, lang), lang);
  }
  function skalenSaetze(lang, sk) {
    var gruppen = [], nach = {};
    sk.forEach(function (z) { var r = z.band.rang; if (!nach[r]) { nach[r] = []; gruppen.push(r); } nach[r].push(z); });
    gruppen.sort(function (a, b) { return b - a; });
    return gruppen.map(function (r) {
      var g = nach[r], n = g.length;
      var namen = B.liste(g.map(function (z) { return B.t(z.name, lang) + ' (' + eintrag(lang, z, false).join('; ') + ')'; }), lang);
      if (lang === 'fr') { return TX.satz('Le résultat ' + imBereich(g[0].band, lang) + (n === 1 ? ' pour l’échelle ' : ' pour les échelles ') + namen, lang); }
      if (lang === 'en') { return TX.satz((n === 1 ? 'The following scale is ' : 'The following scales are ') + imBereich(g[0].band, lang) + ': ' + namen, lang); }
      return TX.satz(B.ersteGross(imBereich(g[0].band, lang)) + (n === 1 ? ' liegt die Skala ' : ' liegen die Skalen ') + namen, lang);
    }).join(' ');
  }
  function psSatz(lang, ausw) {
    var geprueft = ausw.skalen.filter(function (s) { return s.ps; });
    if (!geprueft.length || ausw.mittel == null) { return ''; }
    var m = B.zahl(r1(ausw.mittel), lang);
    function liste(arr) { return B.liste(arr.map(function (s) { return B.t(s.name, lang) + ' (' + vorzeichen(s.diff, lang) + '; ' + { de: 'kritischer Wert ', fr: 'valeur critique ', en: 'critical value ' }[lang] + s.krit + ')'; }), lang); }
    var st = geprueft.filter(function (s) { return s.ps === 'staerke'; }), sw = geprueft.filter(function (s) { return s.ps === 'schwaeche'; });
    if (!st.length && !sw.length) {
      return TX.satz(lang === 'fr' ? 'Par rapport à la moyenne des indices d’échelle (' + m + '), aucun des écarts examinés n’atteint la valeur critique indiquée dans le manuel'
        : (lang === 'en' ? 'Compared with the mean of the scale indexes (' + m + '), none of the differences examined reaches the critical value given in the manual'
          : 'Im Vergleich zum Mittelwert der Skalenindizes (' + m + ') erreicht keine der geprüften Abweichungen den kritischen Wert laut Manual'), lang);
    }
    var ref = { de: ' im Vergleich zum Mittelwert der Skalenindizes (' + m + '; kritische Werte laut Manual): ', fr: ' par rapport à la moyenne des indices d’échelle (' + m + ' ; valeurs critiques selon le manuel) : ', en: ' relative to the mean of the scale indexes (' + m + '; critical values from the manual): ' }[lang];
    var out = [];
    if (st.length) {
      out.push(TX.satz((st.length === 1 ? { de: 'Persönliche Stärke', fr: 'Point fort personnel', en: 'Personal strength' } : { de: 'Persönliche Stärken', fr: 'Points forts personnels', en: 'Personal strengths' })[lang] + ref + liste(st), lang));
    }
    if (sw.length) {
      out.push(TX.satz((sw.length === 1 ? { de: 'Persönliche Schwäche', fr: 'Point faible personnel', en: 'Personal weakness' } : { de: 'Persönliche Schwächen', fr: 'Points faibles personnels', en: 'Personal weaknesses' })[lang] + (st.length ? (lang === 'fr' ? ' : ' : ': ') : ref) + liste(sw), lang));
    }
    return out.join(' ');
  }
  function bericht(lang, ctx, d, ausw) {
    var bl = [{ t: 'p', text: ZWECK[lang] }];
    var s = [lang === 'fr' ? 'Les résultats se réfèrent ' + B.t(normen(d).bezug, lang) : (lang === 'en' ? 'The results are based on ' + B.t(normen(d).bezug, lang) : 'Die Ergebnisse beziehen sich auf ' + B.t(normen(d).bezug, lang)), modellSatz(lang, ausw.modell)];
    var ss = spracheSatz(lang, d);
    if (ss) { s.push(ss); }
    bl.push({ t: 'p', text: s.map(function (x) { return TX.satz(x, lang); }).join(' ') });
    var gl = ausw.globale.filter(function (x) { return x.band; }), sk = ausw.skalen.filter(function (x) { return x.band; });
    if (!gl.length && !sk.length) { bl.push({ t: 'p', text: lang === 'fr' ? 'Aucun indice n’a encore été saisi.' : (lang === 'en' ? 'No index scores have been entered yet.' : 'Es wurden noch keine Indexwerte eingegeben.') }); return bl; }
    var S = SPRACHE[lang].spalten;
    bl.push(ohneLeereSpalten({ t: 'tabelle', kopf: [S.index, S.wert, S.pr, kiKopf(lang, d.ki), S.einstufung], zahlSpalten: [1, 2, 3],
      zeilen: gl.concat(sk).map(function (x) { return [B.t(x.name, lang) + (x.art === 'global' ? ' (' + B.t(x.kurz, lang) + ')' : ''), String(x.wert), x.pr != null ? B.zahl(x.pr, lang) : '–', x.ki ? x.ki.von + '–' + x.ki.bis : '–', B.t(x.band.name, lang)]; }),
      anmerkung: (lang === 'fr' ? 'Indices : moyenne 100, écart type 15. Classification selon le manuel : ' : (lang === 'en' ? 'Index scores: mean 100, standard deviation 15. Classification according to the manual: ' : 'Indexwerte: Mittelwert 100, Standardabweichung 15. Einstufung nach Manual: ')) + bandText('kabc-5', lang) + '.' }, [2, 3]));
    var t = [];
    var haupt = gl.filter(function (x) { return x.haupt; })[0], weitere = gl.filter(function (x) { return !x.haupt; });
    if (haupt) { t.push(globalSatz(lang, haupt)); }
    if (weitere.length) { t.push(weitereSatz(lang, weitere)); }
    if (t.length) { bl.push({ t: 'p', text: t.join(' ') }); }
    var t2 = [];
    if (sk.length) { t2.push(skalenSaetze(lang, sk)); }
    var ps = psSatz(lang, ausw);
    if (ps) { t2.push(ps); }
    if (t2.length) { bl.push({ t: 'p', text: t2.join(' ') }); }
    if (d.nichtErstsprache) {
      var gc = sk.some(function (x) { return x.id === 'gc'; });
      bl.push({ t: 'p', text: lang === 'fr' ? 'La langue du test n’étant pas la première langue de ' + ctx.name + ', les résultats qui dépendent fortement de la langue' + (gc ? ' (en particulier l’échelle Connaissances/Gc)' : '') + ' sont à interpréter avec prudence ; ils peuvent sous-estimer ses capacités.'
        : (lang === 'en' ? 'As the test language is not ' + ctx.name + '’s first language, results that depend heavily on language' + (gc ? ' (especially the Knowledge/Gc scale)' : '') + ' should be interpreted with caution; they may underestimate ' + (ctx.g === 'w' ? 'her' : (ctx.g === 'm' ? 'his' : ctx.name + '’s')) + ' abilities.'
          : 'Da die Testsprache nicht die Erstsprache von ' + ctx.name + ' ist, sind stark sprachgebundene Ergebnisse' + (gc ? ' (insbesondere die Skala Wissen/Gc)' : '') + ' vorsichtig zu deuten; sie können die Fähigkeiten unterschätzen.') });
    }
    if (String(d.profil || '').trim()) { bl.push({ t: 'p', text: d.profil, frei: true }); }
    return bl;
  }
  /* Zahlenspalten ohne jeden Wert weglassen (z. B. KI, wenn nirgends eingetragen) */
  function ohneLeereSpalten(tab, spalten) {
    var weg = spalten.filter(function (i) { return tab.zeilen.every(function (z) { return z[i] === '–'; }); });
    function filt(arr) { return arr.filter(function (x, i) { return weg.indexOf(i) < 0; }); }
    var zahl = [];
    (tab.zahlSpalten || []).forEach(function (i) { if (weg.indexOf(i) < 0) { zahl.push(i - weg.filter(function (w) { return w < i; }).length); } });
    return Object.assign({}, tab, { kopf: filt(tab.kopf), zeilen: tab.zeilen.map(filt), zahlSpalten: zahl });
  }
  function bandText(id, lang) {
    var st = KAT.band(id).stufen;
    return st.map(function (s, i) {
      var von = i === 0 ? null : st[i - 1].bis + 1;
      return (von == null ? '≤' + B.NBSP + s.bis : (s.bis === Infinity ? '≥' + B.NBSP + von : von + '–' + s.bis)) + ' ' + B.t(s.name, lang);
    }).join(' · ');
  }
  function zusammenfassung(lang, ctx, d, ausw) {
    var h = ausw.globale.filter(function (x) { return x.haupt && x.band; })[0];
    if (!h) { return ''; }
    var teile = [B.t(h.kurz, lang) + (lang === 'fr' ? ' de ' : ' ') + h.wert + ' (' + B.t(h.band.name, lang) + ')'];
    var st = ausw.skalen.filter(function (s) { return s.ps === 'staerke'; }), sw = ausw.skalen.filter(function (s) { return s.ps === 'schwaeche'; });
    function namen(arr) { return B.liste(arr.map(function (s) { return B.t(s.name, lang); }), lang); }
    if (st.length) { teile.push((st.length === 1 ? { de: 'persönliche Stärke', fr: 'point fort personnel', en: 'personal strength' } : { de: 'persönliche Stärken', fr: 'points forts personnels', en: 'personal strengths' })[lang] + (lang === 'fr' ? ' : ' : ': ') + namen(st)); }
    if (sw.length) { teile.push((sw.length === 1 ? { de: 'persönliche Schwäche', fr: 'point faible personnel', en: 'personal weakness' } : { de: 'persönliche Schwächen', fr: 'points faibles personnels', en: 'personal weaknesses' })[lang] + (lang === 'fr' ? ' : ' : ': ') + namen(sw)); }
    return (lang === 'fr' ? 'KABC-II : ' : 'KABC-II: ') + teile.join('; ') + '.';
  }
  function hinweise(lang, ctx, d, ausw) {
    var h = ausw.globale.filter(function (x) { return x.haupt && x.band; })[0];
    if (h && h.band.rang <= -2) {
      var n = B.t(h.kurz, lang);
      return [lang === 'fr' ? 'Un ' + n + ' très inférieur à la moyenne ne peut être interprété qu’en lien avec une évaluation du comportement adaptatif (p. ex. Vineland-3) et l’anamnèse développementale.'
        : (lang === 'en' ? 'An ' + n + ' in the lower extreme range can only be interpreted together with an assessment of adaptive behaviour (e.g. Vineland-3) and the developmental history.'
          : 'Ein weit unterdurchschnittlicher ' + n + ' ist erst zusammen mit einer Einschätzung der Alltagsfertigkeiten (z. B. Vineland-3) und der Entwicklungsgeschichte fachlich einzuordnen.')];
    }
    return [];
  }
  function warnung(d, fall) {
    /* alle zutreffenden Hinweise zusammen anzeigen */
    var w = [], a = B.alter(fall.kind.geburtsdatum, d.datum || fall.bericht.datumVon), ausw = auswerten(d, fall);
    if (a && (a.dezimal < 3 || a.dezimal >= 19)) { w.push('Die KABC-II ist für 3;0 bis 18;11 Jahre normiert – das Kind ist ' + B.alterText(a, 'de') + ' alt.'); }
    var gf = ausw.skalen.filter(function (s) { return s.id === 'gf' && s.wert != null; })[0];
    if (a && a.j < 4 && ausw.skalen.some(function (s) { return s.wert != null; })) { w.push('Mit 3 Jahren weist die KABC-II nur Globalindizes aus – bitte die eingetragenen Skalenwerte prüfen.'); }
    else if (a && gf && a.j < 7) { w.push('Planungsfähigkeit/Gf wird erst ab 7 Jahren erhoben – das Kind ist ' + B.alterText(a, 'de') + ' alt.'); }
    var z = ausw.globale.concat(ausw.skalen).filter(function (x) { return x.ki && x.wert != null && (x.wert < x.ki.von || x.wert > x.ki.bis); });
    if (z.length) { w.push('Bei ' + z.map(function (x) { return x.art === 'global' ? B.t(x.kurz, 'de') : B.t(x.name, 'de'); }).join(', ') + ' liegt der Indexwert außerhalb des eingegebenen Konfidenzintervalls – bitte prüfen.'); }
    return w.join(' ');
  }
  function fertig(d) { return !!auswerten(d).globale[0].band; }
  /* Übernahme aus v1: FKI, NVI und die fünf Skalen (Indexwerte 40–160), Test- und Instruktionssprache.
     Das Modell ergibt sich aus den Werten (FKI oder Wissen/Gc → CHC, nur NVI → nonverbal). */
  function ausAlt(alt) {
    var f = alt.fields || {}, d = neu(), hat = false;
    [['fki', 'fki'], ['nvi', 'nvi'], ['seq', 'gsm'], ['sim', 'gv'], ['lrn', 'glr'], ['pln', 'gf'], ['wis', 'gc']].forEach(function (p) {
      var v = f['kabc-' + p[0]]; if (v != null && v !== '') { d.idx.wert[p[1]] = String(v); hat = true; }
    });
    if (!hat) { return null; }
    var w = d.idx.wert, skalen = ['gsm', 'gv', 'glr', 'gf'].some(function (k) { return w[k] != null; });
    d.modell = w.fki != null || w.gc != null ? 'chc' : (w.nvi != null && !skalen ? 'nv' : 'chc');
    if (f['kabc-testlang']) { d.testsprache = spracheErkennen(f['kabc-testlang']) || f['kabc-testlang']; }
    if (f['kabc-instlang']) { d.instruktion = spracheErkennen(f['kabc-instlang']) || f['kabc-instlang']; }
    return d;
  }
  KAT.registrieren({
    id: 'kabc', kurz: 'KABC-II', name: L('KABC-II – Kaufman Assessment Battery for Children – II', 'KABC-II – Batterie pour l’examen psychologique de l’enfant, 2e édition', 'KABC-II – Kaufman Assessment Battery for Children, Second Edition'),
    gruppe: 'intelligenz', alter: [3, 18], informantenText: 'Einzeltest',
    hilfe: 'Zuerst das Auswertungsmodell wählen. Indexwerte, Prozentränge und Konfidenzintervalle aus dem Protokollbogen bzw. dem Auswertungsprogramm übernehmen – das Tool rechnet keine Normwerte.',
    neu: neu, formular: formular, auswerten: auswerten, chip: chip, teilUpdate: teilUpdate, bericht: bericht, verfahrenZeile: verfahrenZeile,
    zusammenfassung: zusammenfassung, hinweise: hinweise, warnung: warnung, fertig: fertig, ausAlt: ausAlt,
    pruefen: ['Deutsche Namen und Kürzel der Globalindizes (Fluid-Kristallin-Index FKI, Mentaler Verarbeitungsindex MVI, Nonverbaler Index NVI – oder „Sprachfreier Index“?) am deutschen Protokollbogen bestätigen.',
      'Deutsche Skalennamen (Sequenzielles Denken/Gsm, Simultanes Denken/Gv, Lernfähigkeit/Glr, Planungsfähigkeit/Gf, Wissen/Gc) und ihre Reihenfolge auf dem Protokollbogen.',
      'Französische Fassung (ECPA, 2008): Titel, Kürzel IFC/IPM/INV, Skalennamen (Séquentiel/Gsm …) und Klassifikationsbegriffe.',
      'Empfehlung zur Modellwahl (Luria-Modell bei Mehrsprachigkeit, NVI bei geringen Kenntnissen der Testsprache oder Hör-/Sprachbeeinträchtigung) im deutschen Manual.',
      'Bezeichnung „persönliche Stärke/Schwäche“ und Vorgehen (Vergleich mit dem Mittelwert der Skalenindizes des Modells, Differenz hier ungerundet) im deutschen Manual.',
      'Mit 3 Jahren nur Globalindizes, Planungsfähigkeit/Gf ab 7 Jahren; beim nonverbalen Modell keine Skalenindizes.',
      'Untertest-Wertpunkte sind nicht als eigene Felder angelegt (deutsche Untertestnamen noch nicht bestätigt); bei Bedarf im Feld „Weitere Ergebnisse“ eintragen.']
  });
})();
