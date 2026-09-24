/* =====================================================================
   Vineland-3 – Vineland Adaptive Behavior Scales, Third Edition
   (Sparrow, Cicchetti & Saulnier, 2016)
   ---------------------------------------------------------------------
   Je Beurteiler (Eltern/Bezugsperson, Mutter, Vater, Lehrkraft) eine
   eigene Form und eigene Werte – nichts wird übertragen.
   · Skalen und Gesamtwert: Standardwert (M 100, SD 15; 20–140), PR und KI
     aus dem Manual bzw. der Auswertungssoftware. Der Gesamtwert (GAV, US:
     ABC) wird NUR eingegeben; er umfasst Kommunikation, Alltagsfertigkeiten
     und Soziale Fertigkeiten. Die Motorik (bis 9;11 J.) geht nicht ein.
   · Subskalen: v-Werte (M 15, SD 3; 1–24), nur Langform bzw. umfassende
     Form; Eltern- und Lehrerform unterscheiden sich bei den
     Alltagsfertigkeiten (Hausarbeit/Leben in der Gemeinschaft bzw.
     Zahlenverständnis/Schulgemeinschaft).
   · Problemverhalten (optional): Internalisierung, Externalisierung,
     Index (v-Werte, hoch = ungünstig), kritische Items als Freitext.
   Fassungen: deutsche Fassung (von Gontard, Wagner, Hussong & Mattheus,
   2021: Eltern-/Lehrerfragebogen, Lang-/Kurzform, 3;0–21;11) oder
   Originalfassung mit US-Normen (Interview, Eltern-/Betreuungspersonen-
   und Lehrerfragebogen, je umfassend oder Domänenebene).
   Keine Diagnosen, keine Codes, keine Schweregrade aus dem Gesamtwert.
   ===================================================================== */
(function () {
  var L = KAT.L, P = 'tests.vineland.';

  /* ---------------- Beurteiler ---------------- */
  var INF = ['eltern', 'mutter', 'vater', 'lehrer'];
  var INF_UI = { eltern: 'Eltern/Bezugsperson', mutter: 'Mutter', vater: 'Vater', lehrer: 'Lehrkraft/Erzieher·in' };
  var GRUPPE = { eltern: 'eltern', mutter: 'eltern', vater: 'eltern', lehrer: 'lehrer' };
  var DE_VON = { eltern: 'von den Eltern', mutter: 'von der Mutter', vater: 'vom Vater', lehrer: 'von der Lehrkraft' };
  var DE_MIT = { eltern: 'mit den Eltern', mutter: 'mit der Mutter', vater: 'mit dem Vater', lehrer: 'mit der Lehrkraft' };
  var DE_GEN = { eltern: 'der Eltern', mutter: 'der Mutter', vater: 'des Vaters', lehrer: 'der Lehrkraft' };
  var FR_PAR = { eltern: 'les parents', mutter: 'la mère', vater: 'le père', lehrer: 'l’enseignant·e' };
  var FR_DE = { eltern: 'des parents', mutter: 'de la mère', vater: 'du père', lehrer: 'de l’enseignant·e' };
  var EN_BY = { eltern: 'the parents', mutter: 'the mother', vater: 'the father', lehrer: 'the teacher' };

  /* ---------------- Skalen (Domänen), Subskalen, Problemverhalten ----------------
     DE: Namen der deutschen Fassung · EN: US-Manual · FR: nach der französischen
     Vineland-II bzw. übersetzt (siehe pruefen) */
  var SKALEN = [
    { id: 'kom', name: L('Kommunikation', 'Communication', 'Communication') },
    { id: 'all', name: L('Alltagsfertigkeiten', 'Vie quotidienne', 'Daily Living Skills') },
    { id: 'soz', name: L('Soziale Fertigkeiten', 'Socialisation', 'Socialization') },
    { id: 'gav', name: L('Gesamtwert Adaptives Verhalten', 'Note composite de comportement adaptatif', 'Adaptive Behavior Composite'), kurz: L('GAV', 'ABC', 'ABC'), gesamt: true },
    { id: 'mot', name: L('Motorik', 'Motricité', 'Motor Skills'), optional: true }
  ];
  var SUBSKALEN = [
    { id: 'zuh', skala: 'kom', name: L('Zuhören und Verstehen', 'Réceptive', 'Receptive') },
    { id: 'spr', skala: 'kom', name: L('Sprechen', 'Expressive', 'Expressive') },
    { id: 'les', skala: 'kom', name: L('Lesen und Schreiben', 'Écrite', 'Written') },
    { id: 'sel', skala: 'all', name: L('Für sich selbst sorgen', 'Personnelle', 'Personal') },
    { id: 'hau', skala: 'all', nur: 'eltern', name: L('Hausarbeit', 'Domestique', 'Domestic') },
    { id: 'gem', skala: 'all', nur: 'eltern', name: L('Leben in der Gemeinschaft', 'Communautaire', 'Community') },
    { id: 'zah', skala: 'all', nur: 'lehrer', name: L('Zahlenverständnis', 'Numératie', 'Numeric') },
    { id: 'sch', skala: 'all', nur: 'lehrer', name: L('Schulgemeinschaft', 'Communauté scolaire', 'School Community') },
    { id: 'umg', skala: 'soz', name: L('Umgang mit Anderen', 'Relations interpersonnelles', 'Interpersonal Relationships') },
    { id: 'spi', skala: 'soz', name: L('Spielen und Freizeit', 'Jeu et temps libre', 'Play and Leisure') },
    { id: 'anp', skala: 'soz', name: L('Anpassung', 'Stratégies d’adaptation', 'Coping Skills') },
    { id: 'gro', skala: 'mot', name: L('Grobmotorik', 'Motricité globale', 'Gross Motor') },
    { id: 'fei', skala: 'mot', name: L('Feinmotorik', 'Motricité fine', 'Fine Motor') }
  ];
  /* fuer: „der Wert für …“ · „le score … / celui …“ · Subjekt im Satz */
  var PROBLEM = [
    { id: 'int', name: L('Internalisierung', 'Intériorisation', 'Internalizing'), fuer: L('Internalisierung', 'd’Intériorisation', 'the Internalizing score') },
    { id: 'ext', name: L('Externalisierung', 'Extériorisation', 'Externalizing'), fuer: L('Externalisierung', 'd’Extériorisation', 'the Externalizing score') },
    { id: 'idx', name: L('Index Problemverhalten', 'Indice de comportements problématiques', 'Maladaptive Behavior Index'), kurz: L('', '', 'MBI'),
      fuer: L('den Index Problemverhalten', 'de l’indice de comportements problématiques', 'the Maladaptive Behavior Index (MBI)') }
  ];
  function skala(id) { return SKALEN.filter(function (s) { return s.id === id; })[0]; }

  /* ---------------- Einstufungen (US-Manual; DE/FR-Bezeichnungen siehe pruefen) ---------------- */
  KAT.bandDefinieren('vineland-sw', { art: 'leistung', pruefen: 'Vineland-3, Standardwerte (Skalen, Gesamtwert): adaptives Niveau laut US-Manual Low 20–70 · Moderately Low 71–85 · Adequate 86–114 · Moderately High 115–129 · High 130–140. Deutsche Bezeichnungen (niedrig, mäßig niedrig, angemessen, mäßig hoch, hoch) sind übersetzt; FR (faible, assez faible, adapté, assez élevé, élevé) nach Sekundärquellen zur französischen Vineland-II – am jeweiligen Manual bestätigen.', stufen: [
    { bis: 70, rang: -2, name: L('niedrig', 'faible', 'Low') },
    { bis: 85, rang: -1, name: L('mäßig niedrig', 'assez faible', 'Moderately Low') },
    { bis: 114, rang: 0, name: L('angemessen', 'adapté', 'Adequate') },
    { bis: 129, rang: 1, name: L('mäßig hoch', 'assez élevé', 'Moderately High') },
    { bis: Infinity, rang: 2, name: L('hoch', 'élevé', 'High') }] });
  KAT.bandDefinieren('vineland-v', { art: 'leistung', pruefen: 'Vineland-3, v-Werte der Subskalen: 1–9 niedrig · 10–12 mäßig niedrig · 13–17 angemessen · 18–20 mäßig hoch · 21–24 hoch (US-Manual); Bezeichnungen wie bei den Standardwerten prüfen.', stufen: [
    { bis: 9, rang: -2, name: L('niedrig', 'faible', 'Low') },
    { bis: 12, rang: -1, name: L('mäßig niedrig', 'assez faible', 'Moderately Low') },
    { bis: 17, rang: 0, name: L('angemessen', 'adapté', 'Adequate') },
    { bis: 20, rang: 1, name: L('mäßig hoch', 'assez élevé', 'Moderately High') },
    { bis: Infinity, rang: 2, name: L('hoch', 'élevé', 'High') }] });
  KAT.bandDefinieren('vineland-mal', { art: 'problem', pruefen: 'Vineland-3, Problemverhalten (v-Werte, hoch = ungünstig): bis 17 durchschnittlich · 18–20 erhöht · 21–24 klinisch bedeutsam (US: Average, Elevated, Clinically Significant). DE/FR-Bezeichnungen und die Grenzen der deutschen Normen prüfen.', stufen: [
    { bis: 17, rang: 0, name: L('durchschnittlich', 'dans la moyenne', 'Average') },
    { bis: 20, rang: 1, name: L('erhöht', 'élevé', 'Elevated') },
    { bis: Infinity, rang: 2, name: L('klinisch bedeutsam', 'cliniquement significatif', 'Clinically Significant') }] });

  /* ---------------- Fassungen und Formen ---------------- */
  var AUTOREN = 'Sparrow, Cicchetti & Saulnier, 2016';
  var DE_BEARB = 'von Gontard, Wagner, Hussong & Mattheus, 2021';
  var FASSUNGEN = {
    'de-2021': { fam: 'de', ui: 'Deutsche Fassung (von Gontard et al., 2021)',
      zeile: L('deutsche Fassung: ' + DE_BEARB, 'version allemande : ' + DE_BEARB, 'German edition: ' + DE_BEARB),
      bezug: L('die deutschen Normen (' + DE_BEARB + ')', 'aux normes allemandes (' + DE_BEARB + ')', 'the German norms (' + DE_BEARB + ')') },
    'us-2016': { fam: 'us', ui: 'Originalfassung, US-Normen (Sparrow et al., 2016)',
      zeile: L('US-Normen', 'normes américaines', 'US norms'),
      bezug: L('die US-amerikanischen Normen (' + AUTOREN + ')', 'aux normes américaines (' + AUTOREN + ')', 'the US norms (' + AUTOREN + ')') },
    'andere': { fam: 'us', ui: 'Andere Fassung oder Normen (bitte angeben)' }
  };
  /* fam: de/us · gruppe: eltern/lehrer · typ: fb = Fragebogen, int = Interview · lang: mit Subskalen */
  var FORMEN = {
    'de-el-lang': { fam: 'de', gruppe: 'eltern', typ: 'fb', lang: true, alter: [3, 21], name: L('Elternfragebogen (Langform)', 'questionnaire parents (forme longue)', 'parent questionnaire (long form)') },
    'de-el-kurz': { fam: 'de', gruppe: 'eltern', typ: 'fb', lang: false, alter: [3, 21], name: L('Elternfragebogen (Kurzform)', 'questionnaire parents (forme courte)', 'parent questionnaire (short form)') },
    'de-le-lang': { fam: 'de', gruppe: 'lehrer', typ: 'fb', lang: true, alter: [3, 21], name: L('Lehrerfragebogen (Langform)', 'questionnaire enseignant·e (forme longue)', 'teacher questionnaire (long form)') },
    'de-le-kurz': { fam: 'de', gruppe: 'lehrer', typ: 'fb', lang: false, alter: [3, 21], name: L('Lehrerfragebogen (Kurzform)', 'questionnaire enseignant·e (forme courte)', 'teacher questionnaire (short form)') },
    'us-int-umf': { fam: 'us', gruppe: 'eltern', typ: 'int', lang: true, alter: [0, 90], name: L('Interview (umfassende Form)', 'entretien (version complète)', 'Comprehensive Interview Form') },
    'us-int-dom': { fam: 'us', gruppe: 'eltern', typ: 'int', lang: false, alter: [3, 90], name: L('Interview (Domänenebene)', 'entretien (version par domaines)', 'Domain-Level Interview Form') },
    'us-el-umf': { fam: 'us', gruppe: 'eltern', typ: 'fb', lang: true, alter: [0, 90], name: L('Eltern-/Betreuungspersonen-Fragebogen (umfassende Form)', 'questionnaire parents/aidants (version complète)', 'Comprehensive Parent/Caregiver Form') },
    'us-el-dom': { fam: 'us', gruppe: 'eltern', typ: 'fb', lang: false, alter: [3, 90], name: L('Eltern-/Betreuungspersonen-Fragebogen (Domänenebene)', 'questionnaire parents/aidants (version par domaines)', 'Domain-Level Parent/Caregiver Form') },
    'us-le-umf': { fam: 'us', gruppe: 'lehrer', typ: 'fb', lang: true, alter: [3, 21], name: L('Lehrerfragebogen (umfassende Form)', 'questionnaire enseignant·e (version complète)', 'Comprehensive Teacher Form') },
    'us-le-dom': { fam: 'us', gruppe: 'lehrer', typ: 'fb', lang: false, alter: [3, 21], name: L('Lehrerfragebogen (Domänenebene)', 'questionnaire enseignant·e (version par domaines)', 'Domain-Level Teacher Form') }
  };
  function fassungId(d) { return FASSUNGEN[d.fassung] ? d.fassung : 'de-2021'; }
  function formenFuer(fassung, r) {
    var fam = (FASSUNGEN[fassung] || FASSUNGEN['de-2021']).fam;
    return Object.keys(FORMEN).filter(function (k) { return FORMEN[k].fam === fam && FORMEN[k].gruppe === GRUPPE[r]; });
  }
  /* gewählte Form – nur, wenn sie zur Fassung und zum Beurteiler passt */
  function formVon(d, r) { var k = (d.form || {})[r]; return formenFuer(fassungId(d), r).indexOf(k) >= 0 ? FORMEN[k] : null; }
  function aktiveInf(d) { var l = d.informanten || []; return INF.filter(function (i) { return l.indexOf(i) >= 0; }); }

  /* ---------------- Daten ---------------- */
  function neu() {
    var o = { datum: '', fassung: 'de-2021', normenText: '', ki: '95', informanten: ['eltern'], form: {}, sw: {}, pr: {}, kiVon: {}, kiBis: {}, v: {}, mal: {}, kritisch: {}, selbstgef: {}, profil: '', altHinweis: '', altGelesen: false };
    INF.forEach(function (i) { o.form[i] = ''; o.sw[i] = {}; o.pr[i] = {}; o.kiVon[i] = {}; o.kiBis[i] = {}; o.v[i] = {}; o.mal[i] = {}; o.kritisch[i] = ''; o.selbstgef[i] = false; });
    return o;
  }
  /* Zahl aus den Testdaten (Pfad relativ zu d), nur wenn gültig */
  function zahl(d, pfad, min, max, ganz) {
    var n = B.num(E.hol(d, pfad));
    if (n == null || (min != null && n < min) || (max != null && n > max) || (ganz && Math.round(n) !== n)) { return null; }
    return n;
  }
  function auswerten(d) {
    var infs = aktiveInf(d), je = {};
    infs.forEach(function (r) {
      var f = formVon(d, r), mitSub = !f || f.lang;
      var dom = SKALEN.map(function (s) {
        var w = zahl(d, 'sw.' + r + '.' + s.id, 20, 140, true), von = zahl(d, 'kiVon.' + r + '.' + s.id, 20, 140, true), bis = zahl(d, 'kiBis.' + r + '.' + s.id, 20, 140, true);
        return { id: s.id, name: s.name, kurz: s.kurz, wert: w, pr: zahl(d, 'pr.' + r + '.' + s.id, 0.1, 99.9),
          ki: von != null && bis != null && von <= bis ? { von: von, bis: bis, niveau: d.ki || '95' } : null,
          band: w == null ? null : KAT.einstufen('vineland-sw', w) };
      });
      var sub = SUBSKALEN.filter(function (s) { return !s.nur || s.nur === GRUPPE[r]; }).map(function (s) {
        var w = mitSub ? zahl(d, 'v.' + r + '.' + s.id, 1, 24, true) : null;
        return { id: s.id, skala: s.skala, name: s.name, wert: w, band: w == null ? null : KAT.einstufen('vineland-v', w) };
      });
      var mal = PROBLEM.map(function (p) {
        var w = zahl(d, 'mal.' + r + '.' + p.id, 1, 24, true);
        return { id: p.id, name: p.name, kurz: p.kurz, fuer: p.fuer, wert: w, band: w == null ? null : KAT.einstufen('vineland-mal', w) };
      });
      var kritisch = String((d.kritisch || {})[r] || '').trim();
      je[r] = { form: f, dom: dom, sub: sub, mal: mal, kritisch: kritisch,
        hat: dom.concat(sub, mal).some(function (z) { return z.wert != null; }) || dom.some(function (z) { return z.pr != null; }) || !!kritisch };
    });
    return { infs: infs, je: je };
  }
  function domVon(a, id) { return a.dom.filter(function (z) { return z.id === id; })[0]; }
  function malVon(a, id) { return a.mal.filter(function (z) { return z.id === id; })[0]; }
  function chip(pfad, n) {
    if (/\.sw\./.test(pfad)) { return KAT.einstufen('vineland-sw', n); }
    if (/\.v\./.test(pfad)) { return KAT.einstufen('vineland-v', n); }
    if (/\.mal\./.test(pfad)) { return KAT.einstufen('vineland-mal', n); }
    return null;
  }

  /* ---------------- Formular ---------------- */
  function formular(d, fall) {
    var infs = aktiveInf(d), fs = fassungId(d), us = FASSUNGEN[fs].fam === 'us', h = '';
    if (d.altHinweis && !d.altGelesen) {
      h += E.hinweis(d.altHinweis + '<div style="margin-top:8px">' + E.haken(P + 'altGelesen', 'Gelesen – Hinweis ausblenden', '', true) + '</div>', 'info');
    }
    h += E.karte('<h2>Durchführung</h2><div class="raster">' +
      E.feld(P + 'datum', 'Datum', { typ: 'date' }) +
      E.auswahl(P + 'ki', 'Konfidenzintervall', [['95', '95 %'], ['90', '90 %'], ['85', '85 %']]) +
      E.auswahl(P + 'fassung', 'Fassung und Normen', Object.keys(FASSUNGEN).map(function (k) { return [k, FASSUNGEN[k].ui]; }), { neu: true, voll: true,
        hilfe: 'Deutsche Fassung (' + DE_BEARB + '): Eltern- und Lehrerfragebogen, je Lang- oder Kurzform, 3;0–21;11 Jahre. Originalfassung (' + AUTOREN + '): Interview sowie Eltern-/Betreuungspersonen- und Lehrerfragebogen, je umfassend oder auf Domänenebene. „Andere“: z. B. eine französische Fassung – die Formen entsprechen dann der Originalfassung.' }) +
      (fs === 'andere' ? E.feld(P + 'normenText', 'Fassung und Normen, wie im Bericht zu nennen', { voll: true, platzhalter: 'z. B. Name der Fassung, Verlag, Jahr der Normen' }) : '') + '</div>' +
      '<div style="margin-top:12px"><span class="feld"><span>Wer hat geantwortet? Je Beurteiler eine eigene Form und eigene Werte.</span></span>' +
      E.wahlen(P + 'informanten', INF.map(function (i) { return [i, INF_UI[i]]; }), true, true) + '</div>' +
      (infs.length ? '<div class="raster" style="margin-top:12px">' + infs.map(function (r) {
        return E.auswahl(P + 'form.' + r, 'Form – ' + INF_UI[r], formenFuer(fs, r).map(function (k) { return [k, FORMEN[k].name.de]; }), { leer: '– Form wählen –', neu: true, voll: true });
      }).join('') + '</div>' : ''));
    if (!infs.length) { return h + E.hinweis('Bitte mindestens einen Beurteiler wählen.', 'info'); }

    /* Skalen und Gesamtwert: je Beurteiler eine Tabelle (Standardwert · PR · KI, Einstufung am Ende) */
    infs.forEach(function (r, i) {
      var f = formVon(d, r);
      var zeilen = SKALEN.filter(function (s) { return !s.optional; }).map(function (s) {
        return { id: s.id, name: B.t(s.name, 'de') + (s.kurz ? ' (' + s.kurz.de + ')' : ''),
          hinweis: s.gesamt ? 'aus dem Manual übernehmen, nicht selbst mitteln' + (us ? ' · US: ABC' : '') : (us ? 'US: ' + s.name.en : '') };
      }).concat([{ trenner: 'Optional' }, { id: 'mot', name: 'Motorik', hinweis: 'nur bis 9;11 Jahre · geht nicht in den GAV ein' + (us ? ' · US: Motor Skills' : '') }]);
      h += E.karte('<h2>Skalen und Gesamtwert – ' + B.esc(INF_UI[r]) + '</h2><p class="klein">' + (f ? B.esc(f.name.de) : 'Form noch nicht gewählt.') +
        (i === 0 ? ' · Standardwerte (Mittelwert 100, Standardabweichung 15; 20–140), Prozentrang und Konfidenzintervall aus dem Auswertungsbogen bzw. der Auswertungssoftware. Das Tool rechnet keine Normwerte und bildet keinen Gesamtwert.' : '') + '</p>' +
        E.raster({ basis: 'tests.vineland', kopfSkala: 'Skala', chipAmEnde: true, spalten: [
          { id: 'sw.' + r, label: 'Standardwert', min: 20, max: 140, ganz: true },
          { id: 'pr.' + r, label: 'PR', min: 0.1, max: 99.9, ganz: false, ohneChip: true },
          { id: 'kiVon.' + r, label: 'KI von', min: 20, max: 140, ganz: true, ohneChip: true },
          { id: 'kiBis.' + r, label: 'KI bis', min: 20, max: 140, ganz: true, ohneChip: true }],
          zeilen: zeilen, einstufen: function (z, s, n) { return /^sw\./.test(s) ? KAT.einstufen('vineland-sw', n) : null; } }));
    });

    /* Subskalen: Spalten = Beurteiler mit Langform/umfassender Form (oder noch ohne Form) */
    var mitLang = infs.filter(function (r) { var f = formVon(d, r); return !f || f.lang; });
    var kurz = infs.filter(function (r) { return mitLang.indexOf(r) < 0; });
    var sh = '<h2>Subskalen (v-Werte)</h2><p class="klein">v-Werte (Mittelwert 15, Standardabweichung 3; 1–24). Nur bei der Langform (deutsche Fassung) bzw. der umfassenden Form (Originalfassung). Eltern- und Lehrerform unterscheiden sich bei den Alltagsfertigkeiten.</p>';
    if (kurz.length) { sh += E.hinweis('Keine Subskalenwerte bei ' + B.esc(kurz.map(function (r) { return INF_UI[r] + ' (' + formVon(d, r).name.de + ')'; }).join(', ')) + '.', 'info'); }
    if (mitLang.length) {
      var zeilen = [], letzte = '';
      SUBSKALEN.forEach(function (s) {
        var spalten = s.nur ? mitLang.filter(function (r) { return GRUPPE[r] === s.nur; }) : mitLang;
        if (!spalten.length) { return; }
        if (s.skala !== letzte) { zeilen.push({ trenner: s.skala === 'mot' ? 'Motorik (optional, bis 9;11 Jahre)' : B.t(skala(s.skala).name, 'de') }); letzte = s.skala; }
        var hin = [s.nur === 'eltern' ? 'nur Eltern/Bezugsperson' : (s.nur === 'lehrer' ? 'nur Lehrerform' : ''), us ? 'US: ' + s.name.en : ''].filter(Boolean).join(' · ');
        zeilen.push({ id: s.id, name: B.t(s.name, 'de'), hinweis: hin, min: 1, max: 24, ganz: true, nurSpalten: s.nur ? spalten : null });
      });
      sh += E.raster({ basis: 'tests.vineland.v', kopfSkala: 'Subskala', gestapelt: mitLang.length > 1, spalten: mitLang.map(function (r) { return { id: r, label: INF_UI[r] }; }), zeilen: zeilen,
        einstufen: function (z, s, n) { return KAT.einstufen('vineland-v', n); } });
    }
    h += E.karte(sh);

    /* Problemverhalten (optional) */
    h += E.karte('<h2>Problemverhalten (optional)</h2><p class="klein">v-Werte (Mittelwert 15, Standardabweichung 3; 1–24), hohe Werte = mehr Problemverhalten: bis 17 durchschnittlich, 18–20 erhöht, 21–24 klinisch bedeutsam. Geht nicht in den Gesamtwert ein.' + (us ? ' US: Maladaptive Behavior (Internalizing, Externalizing, Maladaptive Behavior Index).' : '') + '</p>' +
      E.raster({ basis: 'tests.vineland.mal', kopfSkala: 'Skala', gestapelt: infs.length > 1, spalten: infs.map(function (r) { return { id: r, label: INF_UI[r] }; }),
        zeilen: PROBLEM.map(function (p) { return { id: p.id, name: B.t(p.name, 'de'), hinweis: p.id === 'idx' ? 'falls im Manual ausgewiesen (US: Maladaptive Behavior Index)' : '', min: 1, max: 24, ganz: true }; }),
        einstufen: function (z, s, n) { return KAT.einstufen('vineland-mal', n); } }) +
      '<h3 style="margin-top:14px">Kritische Items</h3><p class="klein">Für die kritischen Items gibt es keine Normwerte. Angaben so eintragen, wie sie auf dem Protokollbogen stehen (z. B. Nummer und Antwort); sie erscheinen im Bericht beim jeweiligen Beurteiler.</p>' +
      infs.map(function (r) {
        return '<div style="margin-top:10px">' + E.feld(P + 'kritisch.' + r, 'Kritische Items – ' + INF_UI[r], { voll: true, platzhalter: 'leer lassen, wenn nichts markiert ist' }) +
          '<div style="margin-top:6px">' + E.haken(P + 'selbstgef.' + r, 'Darunter Angaben zu Selbstverletzung oder Selbstgefährdung', 'erscheint zusätzlich im Abschnitt „Hinweis zur Sicherheit“', true) + '</div></div>';
      }).join(''));
    h += E.karte('<h2>Stärken und Schwächen (optional)</h2>' + E.textfeld(P + 'profil', 'Ergebnis von Stärken-/Schwächen-Analyse bzw. Paarvergleichen laut Manual oder Auswertungssoftware', { zeilen: 3, platzhalter: 'z. B. Die Skala Kommunikation ist signifikant niedriger als die Skala Alltagsfertigkeiten (kritische Differenz laut Manual).' }));
    return h;
  }

  /* ---------------- Bericht: Hilfen ---------------- */
  var T = {
    keine: L('Es wurden noch keine Ergebnisse eingegeben.', 'Aucun résultat n’a encore été saisi.', 'No results have been entered yet.'),
    skala: L('Skala', 'Domaine', 'Domain'), sub: L('Subskala', 'Sous-domaine', 'Subdomain'), mal: L('Problemverhalten', 'Comportements problématiques', 'Maladaptive Behavior'),
    sw: L('Standardwert', 'Note standard', 'Standard score'), niveau: L('Adaptives Niveau', 'Niveau adaptatif', 'Adaptive level')
  };
  function kiKopf(lang, niveau) { niveau = niveau || '95'; return lang === 'en' ? niveau + '% CI' : (lang === 'fr' ? 'IC ' : 'KI ') + B.prozent(niveau, lang); }
  function kiText(lang, ki) { return kiKopf(lang, ki.niveau) + ' ' + ki.von + '–' + ki.bis; }
  function prText(lang, pr) { return (lang === 'fr' ? 'rang centile ' : (lang === 'en' ? 'percentile rank ' : 'PR ')) + B.zahl(pr, lang); }
  function vText(lang, w) { return TX.einheit('v', lang) + ' ' + w; }
  function name(z, lang) { var k = z.kurz ? B.t(z.kurz, lang) : ''; return B.t(z.name, lang) + (k ? ' (' + k + ')' : ''); }
  /* Legende aus der Banddefinition: „niedrig (20–70), mäßig niedrig (71–85) …“ */
  function legende(bandId, min, max, lang) {
    var st = KAT.band(bandId).stufen, unten = min;
    return st.map(function (s) { var oben = s.bis === Infinity ? max : s.bis, t = B.t(s.name, lang) + ' (' + unten + '–' + oben + ')'; unten = oben + 1; return t; }).join(', ');
  }
  /* „A, ausgefüllt von X, und B“: Komma nach dem Einschub auch vor „und“ */
  function listeMitEinschub(teile, lang) {
    var und = lang === 'fr' ? 'et' : (lang === 'en' ? 'and' : 'und'), s = teile[0] ? teile[0].text : '';
    for (var i = 1; i < teile.length; i++) { s += (i === teile.length - 1 ? (teile[i - 1].einschub ? ', ' : ' ') + und + ' ' : ', ') + teile[i].text; }
    return s;
  }
  /* Quelle je Beurteiler: Form + wer */
  function quelle(lang, r, f) {
    if (lang === 'fr') {
      if (!f) { return { text: 'l’évaluation ' + FR_DE[r], einschub: false }; }
      return f.typ === 'int' ? { text: 'l’' + f.name.fr + ', mené avec ' + FR_PAR[r], einschub: true } : { text: 'le ' + f.name.fr + ', rempli par ' + FR_PAR[r], einschub: true };
    }
    if (lang === 'en') {
      if (!f) { return { text: 'the rating by ' + EN_BY[r], einschub: false }; }
      return { text: 'the ' + f.name.en + (f.typ === 'int' ? ', conducted with ' : ', completed by ') + EN_BY[r], einschub: true };
    }
    if (!f) { return { text: 'die Einschätzung ' + DE_GEN[r], einschub: false }; }
    return f.typ === 'int' ? { text: 'das ' + f.name.de + ' ' + DE_MIT[r], einschub: false } : { text: 'der ' + f.name.de + ', ausgefüllt ' + DE_VON[r], einschub: true };
  }
  function bezugText(lang, d) {
    var fs = fassungId(d);
    if (fs !== 'andere') { return B.t(FASSUNGEN[fs].bezug, lang); }
    var t = String(d.normenText || '').trim();
    if (!t) { return ''; }
    return lang === 'fr' ? 'aux normes suivantes : ' + t : (lang === 'en' ? 'the following norms: ' + t : 'folgende Normen: ' + t);
  }
  var TITEL = L('Vineland-3 – Vineland Adaptive Behavior Scales, Third Edition', 'Vineland-3 – Échelles de comportement adaptatif de Vineland, 3e édition', 'Vineland-3 – Vineland Adaptive Behavior Scales, Third Edition');

  function zweck(lang, mitSub, mitMal) {
    if (lang === 'fr') {
      return 'La Vineland-3 (Vineland Adaptive Behavior Scales, Third Edition) évalue le comportement adaptatif, c’est-à-dire les habiletés effectivement mises en œuvre au quotidien, à partir des informations fournies par les parents ou d’autres personnes de référence et par les enseignant·e·s. Les domaines Communication, Vie quotidienne et Socialisation forment ensemble la note composite de comportement adaptatif (ABC) ; le domaine Motricité peut être évalué en complément jusqu’à 9 ans et 11 mois et n’entre pas dans la note composite. Les domaines et la note composite sont exprimés en notes standard (moyenne 100, écart type 15)' +
        (mitSub ? ', les sous-domaines en notes v (moyenne 15, écart type 3)' : '') + '.' + (mitMal ? ' Pour la partie facultative Comportements problématiques (notes v), une note élevée indique davantage de difficultés de comportement.' : '');
    }
    if (lang === 'en') {
      return 'The Vineland-3 (Vineland Adaptive Behavior Scales, Third Edition) assesses adaptive behaviour, i.e. the skills a person actually uses in everyday life, based on information from parents or other caregivers and from teachers. The Communication, Daily Living Skills and Socialization domains together form the Adaptive Behavior Composite (ABC); the Motor Skills domain can additionally be assessed up to 9 years 11 months and does not contribute to the composite. Domain scores and the composite are standard scores (mean 100, standard deviation 15)' +
        (mitSub ? '; subdomain scores are v-scale scores (mean 15, standard deviation 3)' : '') + '.' + (mitMal ? ' In the optional Maladaptive Behavior section (v-scale scores), higher scores indicate more problem behaviour.' : '');
    }
    return 'Die Vineland-3 (Vineland Adaptive Behavior Scales, Third Edition) erfassen das adaptive Verhalten, d. h. die im Alltag tatsächlich gezeigten Fertigkeiten, anhand der Angaben von Eltern bzw. Bezugspersonen und Lehrkräften. Die Skalen Kommunikation, Alltagsfertigkeiten und Soziale Fertigkeiten bilden zusammen den Gesamtwert Adaptives Verhalten (GAV); die Skala Motorik kann bis 9;11 Jahre zusätzlich erfasst werden und geht nicht in den Gesamtwert ein. Skalen und Gesamtwert werden als Standardwerte angegeben (Mittelwert 100, Standardabweichung 15)' +
      (mitSub ? ', die Subskalen als v-Werte (Mittelwert 15, Standardabweichung 3)' : '') + '.' + (mitMal ? ' Beim optionalen Teil Problemverhalten (v-Werte) bedeuten hohe Werte mehr Verhaltensprobleme.' : '');
  }
  function durchfuehrung(lang, d, infs, ausw) {
    var q = infs.map(function (r) { return quelle(lang, r, ausw.je[r].form); }), liste = listeMitEinschub(q, lang), bz = bezugText(lang, d), s = [];
    if (lang === 'fr') { s.push('Les résultats reposent sur ' + liste); if (bz) { s.push('Les scores se réfèrent ' + bz); } }
    else if (lang === 'en') { s.push('The results are based on ' + liste); if (bz) { s.push('Scores refer to ' + bz); } }
    else { s.push((q.length === 1 ? 'Grundlage ist ' : 'Grundlage sind ') + liste); if (bz) { s.push('Die Werte beziehen sich auf ' + bz); } }
    return s.map(function (x) { return TX.satz(x, lang); }).join(' ');
  }
  /* Tabelle der Skalen für EINEN Beurteiler */
  function domTabelle(lang, d, r, a, mitLegende) {
    var S = SPRACHE[lang].spalten;
    var z = a.dom.filter(function (x) { return x.wert != null || x.pr != null || x.ki; });
    var mitPr = z.some(function (x) { return x.pr != null; }), mitKi = z.some(function (x) { return x.ki; });
    var kopf = [B.t(T.skala, lang) + ' (' + infName(r, lang) + ')', B.t(T.sw, lang)].concat(mitPr ? [S.pr] : [], mitKi ? [kiKopf(lang, d.ki)] : [], [B.t(T.niveau, lang)]);
    var zahlSpalten = [1].concat(mitPr ? [2] : [], mitKi ? [mitPr ? 3 : 2] : []);
    var zeilen = z.map(function (x) {
      return [name(x, lang), x.wert == null ? '–' : String(x.wert)].concat(mitPr ? [x.pr == null ? '–' : B.zahl(x.pr, lang)] : [], mitKi ? [x.ki ? x.ki.von + '–' + x.ki.bis : '–'] : [], [x.band ? B.t(x.band.name, lang) : '–']);
    });
    var mot = z.some(function (x) { return x.id === 'mot'; });
    var anm = { de: 'Standardwerte: Mittelwert 100, Standardabweichung 15.', fr: 'Notes standard : moyenne 100, écart type 15.', en: 'Standard scores: mean 100, standard deviation 15.' }[lang];
    if (mitLegende) { anm += ' ' + { de: 'Adaptives Niveau: ', fr: 'Niveau adaptatif : ', en: 'Adaptive level: ' }[lang] + legende('vineland-sw', 20, 140, lang) + '.'; }
    if (mot) { anm += ' ' + { de: 'Die Motorik geht nicht in den Gesamtwert ein.', fr: 'La Motricité n’entre pas dans la note composite.', en: 'Motor Skills do not contribute to the composite.' }[lang]; }
    return { t: 'tabelle', kopf: kopf, zeilen: zeilen, zahlSpalten: zahlSpalten, anmerkung: anm };
  }
  /* Subskalen bzw. Problemverhalten: Spalten = Beurteiler, Zelle „12 (mäßig niedrig)“ */
  function spaltenTabelle(lang, infs, ausw, feld, liste, kopf0, anm) {
    var cols = infs.filter(function (r) { return ausw.je[r][feld].some(function (z) { return z.wert != null; }); });
    var zeilen = [], fehlt = false;
    liste.forEach(function (s) {
      var zellen = cols.map(function (r) { return ausw.je[r][feld].filter(function (z) { return z.id === s.id; })[0]; });
      if (!zellen.some(function (z) { return z && z.wert != null; })) { return; }
      if (zellen.some(function (z) { return !z; })) { fehlt = true; }
      zeilen.push([s.skala ? B.t(s.name, lang) + ' (' + B.t(skala(s.skala).name, lang) + ')' : name(s, lang)].concat(zellen.map(function (z) { return z && z.wert != null ? z.wert + ' (' + B.t(z.band.name, lang) + ')' : '–'; })));
    });
    return { t: 'tabelle', kopf: [kopf0].concat(cols.map(function (r) { return B.ersteGross(infName(r, lang)); })), zeilen: zeilen, anmerkung: anm(fehlt) };
  }
  function subTabelle(lang, infs, ausw) {
    return spaltenTabelle(lang, infs, ausw, 'sub', SUBSKALEN, B.t(T.sub, lang), function (fehlt) {
      var s = { de: 'v-Werte: Mittelwert 15, Standardabweichung 3. Adaptives Niveau: ', fr: 'Notes v : moyenne 15, écart type 3. Niveau adaptatif : ', en: 'v-scale scores: mean 15, standard deviation 3. Adaptive level: ' }[lang] + legende('vineland-v', 1, 24, lang) + '.';
      if (fehlt) {
        var n = function (id) { return B.t(SUBSKALEN.filter(function (x) { return x.id === id; })[0].name, lang); };
        s += ' ' + (lang === 'fr' ? 'Les sous-domaines ' + n('hau') + ' et ' + n('gem') + ' ne sont évalués qu’auprès des parents ou personnes de référence, ' + n('zah') + ' et ' + n('sch') + ' uniquement dans la version enseignant·e.'
          : (lang === 'en' ? n('hau') + ' and ' + n('gem') + ' are only rated by parents or caregivers, ' + n('zah') + ' and ' + n('sch') + ' only on the teacher form.'
            : n('hau') + ' und ' + n('gem') + ' werden nur bei Eltern bzw. Bezugspersonen erfasst, ' + n('zah') + ' und ' + n('sch') + ' nur in der Lehrerform.'));
      }
      return s;
    });
  }
  function malTabelle(lang, infs, ausw) {
    return spaltenTabelle(lang, infs, ausw, 'mal', PROBLEM, B.t(T.mal, lang), function () {
      return { de: 'v-Werte: Mittelwert 15, Standardabweichung 3; hohe Werte bedeuten mehr Problemverhalten. Einstufung: ', fr: 'Notes v : moyenne 15, écart type 3 ; une note élevée indique davantage de comportements problématiques. Classification : ', en: 'v-scale scores: mean 15, standard deviation 3; higher scores indicate more problem behaviour. Classification: ' }[lang] + legende('vineland-mal', 1, 24, lang) + '.';
    });
  }
  /* Niveau im Satz: „im Bereich „x““ · « au niveau « x » » · „in the X range“ */
  function imBereich(lang, bn) { return lang === 'fr' ? 'au niveau ' + TX.q(bn, lang) : (lang === 'en' ? 'in the ' + bn + ' range' : 'im Bereich ' + TX.q(bn, lang)); }
  /* Gruppen nach Einstufung (hoch → niedrig) */
  function nachBand(zeilen) {
    var g = {}, reihe = [];
    zeilen.forEach(function (z) { var k = z.band.rang; if (!g[k]) { g[k] = { band: z.band, liste: [] }; reihe.push(k); } g[k].liste.push(z); });
    return reihe.sort(function (a, b) { return b - a; }).map(function (k) { return g[k]; });
  }
  /* Satz für eine Gruppe von Skalen/Subskalen; bei = Einleitung („Im Elternurteil“), nur im ersten Satz des Absatzes */
  function gruppenSatz(lang, art, gr, bei, klammer) {
    var n = gr.liste.length, bn = B.t(gr.band.name, lang);
    var teile = gr.liste.map(function (z) { return { nm: B.t(z.name, lang), kl: klammer(z) }; });
    var subj;
    if (lang === 'fr') {
      var wortF = art === 'sub' ? ['le sous-domaine ', 'les sous-domaines '] : ['le domaine ', 'les domaines '];
      subj = n === 1 ? wortF[0] + teile[0].nm + teile[0].kl : wortF[1] + B.liste(teile.map(function (t) { return t.nm + t.kl; }), lang);
      var vF = (n === 1 ? ' se situe ' : ' se situent ') + imBereich(lang, bn);
      return bei ? bei + ', ' + subj + vF : B.ersteGross(subj) + vF;
    }
    if (lang === 'en') {
      var wortE = art === 'sub' ? ' subdomain' : ' domain';
      subj = n === 1 ? 'the ' + teile[0].nm + wortE + teile[0].kl : 'the ' + wortE.trim() + 's ' + B.liste(teile.map(function (t) { return t.nm + t.kl; }), lang);
      var vE = (n === 1 ? ' is ' : ' are ') + imBereich(lang, bn);
      return bei ? bei + ', ' + subj + vE : B.ersteGross(subj) + vE;
    }
    var wortD = art === 'sub' ? ['die Subskala ', 'die Subskalen '] : ['die Skala ', 'die Skalen '];
    subj = n === 1 ? wortD[0] + teile[0].nm + teile[0].kl : wortD[1] + B.liste(teile.map(function (t) { return t.nm + t.kl; }), lang);
    var verb = n === 1 ? 'liegt' : 'liegen';
    return bei ? bei + ' ' + verb + ' ' + subj + ' ' + imBereich(lang, bn) : B.ersteGross(subj) + ' ' + verb + ' ' + imBereich(lang, bn);
  }
  function gavSatz(lang, bei, z) {
    var teile = [];
    if (z.pr != null) { teile.push(prText(lang, z.pr)); }
    if (z.ki) { teile.push(kiText(lang, z.ki)); }
    var kl = teile.length ? ' (' + teile.join('; ') + ')' : '', bn = B.t(z.band.name, lang);
    if (lang === 'fr') { return bei + ', la note composite de comportement adaptatif (ABC) est de ' + z.wert + kl + ', ce qui correspond au niveau adaptatif ' + TX.q(bn, lang); }
    if (lang === 'en') { return bei + ', the Adaptive Behavior Composite (ABC) is ' + z.wert + kl + ', which corresponds to an adaptive level of ' + bn; }
    return bei + ' liegt der Gesamtwert Adaptives Verhalten (GAV) bei ' + z.wert + kl + ' und damit im Bereich ' + TX.q(bn, lang);
  }
  function domKlammer(lang) {
    return function (z) {
      var t = [(lang === 'fr' ? 'note standard ' : (lang === 'en' ? 'standard score ' : 'Standardwert ')) + z.wert];
      if (z.pr != null) { t.push(prText(lang, z.pr)); }
      return ' (' + t.join('; ') + ')';
    };
  }
  function vKlammer(lang) { return function (z) { return ' (' + vText(lang, z.wert) + ')'; }; }
  /* Subskalen: auffällige (nicht „angemessen“) einzeln nach Niveau; die angemessenen bis zu zwei mit Wert, sonst zusammengefasst */
  function subSaetze(lang, subs, bei) {
    var auff = subs.filter(function (z) { return z.band.rang !== 0; }), ok = subs.filter(function (z) { return z.band.rang === 0; }), s = [];
    nachBand(auff).forEach(function (g, i) { s.push(gruppenSatz(lang, 'sub', g, i === 0 ? bei : '', vKlammer(lang))); });
    if (!ok.length) { return s; }
    var einl = auff.length ? '' : bei;
    if (ok.length <= 2) { s.push(gruppenSatz(lang, 'sub', { band: ok[0].band, liste: ok }, einl, vKlammer(lang))); return s; }
    var bn = B.t(ok[0].band.name, lang);
    if (auff.length) {
      s.push(lang === 'fr' ? 'Les autres sous-domaines se situent ' + imBereich(lang, bn) : (lang === 'en' ? 'The other subdomains are ' + imBereich(lang, bn) : 'Die übrigen Subskalen liegen ' + imBereich(lang, bn)));
    } else {
      s.push(lang === 'fr' ? (einl ? einl + ', tous' : 'Tous') + ' les sous-domaines se situent ' + imBereich(lang, bn)
        : (lang === 'en' ? (einl ? einl + ', all' : 'All') + ' subdomains are ' + imBereich(lang, bn)
          : (einl ? einl + ' liegen alle Subskalen ' : 'Alle Subskalen liegen ') + imBereich(lang, bn)));
    }
    return s;
  }
  function malSatz(lang, mal, bei) {
    if (lang === 'fr') {
      var tF = mal.map(function (z, i) { var bn = B.t(z.band.name, lang); return (i === 0 ? 'le score ' : 'celui ') + z.fuer.fr + ' (' + vText(lang, z.wert) + ') ' + (/^dans /.test(bn) ? 'se situe ' + bn : 'est ' + bn); });
      return (bei ? bei + ', pour' : 'Pour') + ' les comportements problématiques, ' + B.liste(tF, lang);
    }
    if (lang === 'en') {
      var tE = mal.map(function (z) { return z.fuer.en + ' (' + vText(lang, z.wert) + ') is ' + imBereich(lang, B.t(z.band.name, lang)); });
      return (bei ? bei + ', for' : 'For') + ' maladaptive behaviour, ' + B.liste(tE, lang);
    }
    var tD = mal.map(function (z) { return 'der Wert für ' + z.fuer.de + ' ' + imBereich(lang, B.t(z.band.name, lang)) + ' (' + vText(lang, z.wert) + ')'; });
    return (bei ? bei + ' liegt beim Problemverhalten ' : 'Beim Problemverhalten liegt ') + B.liste(tD, lang);
  }
  /* Freitext der Fachperson in Klammern (ohne Schlusspunkt), damit kein zweiter Doppelpunkt entsteht */
  function kritischSatz(lang, text, bei) {
    var kl = ' (' + String(text).replace(/[.\s]+$/, '') + ')';
    if (lang === 'fr') { return (bei ? bei + ', des réponses ont été relevées pour les items critiques' : 'Des réponses ont été relevées pour les items critiques') + kl; }
    if (lang === 'en') { return (bei ? bei + ', responses were marked on the critical items' : 'Responses were marked on the critical items') + kl; }
    return (bei ? bei + ' wurden bei den kritischen Items Angaben gemacht' : 'Bei den kritischen Items wurden Angaben gemacht') + kl;
  }
  /* Absatz für EINEN Beurteiler; der Beurteiler wird im ersten Satz genannt */
  function raterText(lang, r, a) {
    var bei = B.ersteGross(infBei(r, lang)), s = [];
    function einleitung() { return s.length ? '' : bei; }
    var gav = domVon(a, 'gav');
    if (gav.band) { s.push(gavSatz(lang, bei, gav)); }
    var doms = a.dom.filter(function (z) { return z.id !== 'gav' && z.band; });
    nachBand(doms).forEach(function (g) { s.push(gruppenSatz(lang, 'dom', g, einleitung(), domKlammer(lang))); });
    var subs = a.sub.filter(function (z) { return z.band; });
    if (subs.length) { s = s.concat(subSaetze(lang, subs, einleitung())); }
    var mal = a.mal.filter(function (z) { return z.band; });
    if (mal.length) { s.push(malSatz(lang, mal, einleitung())); }
    if (a.kritisch) { s.push(kritischSatz(lang, a.kritisch, einleitung())); }
    return s.map(function (x) { return TX.satz(x, lang); }).join(' ');
  }
  /* Vergleich der Beurteiler (ab zwei): Gesamtwerte nebeneinander, niedrige Skalen, erhöhtes Problemverhalten */
  function vergleich(lang, infs, ausw) {
    var s = [], einzelnGesamt = false;
    var mitGav = infs.filter(function (r) { return domVon(ausw.je[r], 'gav').wert != null; });
    if (mitGav.length >= 2) {
      var werte = B.liste(mitGav.map(function (r, i) { return (lang === 'fr' && i > 0 ? 'de ' : '') + domVon(ausw.je[r], 'gav').wert + ' (' + infName(r, lang) + ')'; }), lang);
      s.push(lang === 'fr' ? 'D’une évaluation à l’autre, la note composite de comportement adaptatif est de ' + werte
        : (lang === 'en' ? 'Across the ratings, the Adaptive Behavior Composite is ' + werte : 'Im Vergleich der Urteile liegt der Gesamtwert Adaptives Verhalten bei ' + werte));
    }
    function teil(ids, liste, test, titelGem, titelEin) {
      var gem = [], ein = [];
      liste.filter(function (x) { return ids.indexOf(x.id) >= 0; }).forEach(function (x) {
        var bewertet = infs.filter(function (r) { var z = ausw.je[r][x.feld || 'dom'].filter(function (y) { return y.id === x.id; })[0]; return z && z.band; });
        var treffer = bewertet.filter(function (r) { var z = ausw.je[r][x.feld || 'dom'].filter(function (y) { return y.id === x.id; })[0]; return test(z.band); });
        if (treffer.length >= 2) { gem.push(B.t(x.name, lang) + ' (' + B.liste(treffer.map(function (r) { return infName(r, lang); }), lang) + ')'); }
        else if (treffer.length === 1 && bewertet.length >= 2) { ein.push(B.t(x.name, lang) + ' (' + infBei(treffer[0], lang) + ')'); }
      });
      if (gem.length) { s.push(titelGem + gem.join('; ')); }
      if (ein.length) { s.push(titelEin + ein.join('; ')); einzelnGesamt = true; }
      return gem.length + ein.length;
    }
    var nq = lang === 'fr' ? TX.q('faible', lang) + ' ou ' + TX.q('assez faible', lang) : (lang === 'en' ? 'Low or Moderately Low' : TX.q('niedrig', lang) + ' oder ' + TX.q('mäßig niedrig', lang));
    var nd = teil(['kom', 'all', 'soz', 'mot'], SKALEN, function (b) { return b.rang <= -1; },
      lang === 'fr' ? 'Niveau ' + nq + ' dans plusieurs évaluations : ' : (lang === 'en' ? nq + ' in more than one rating: ' : 'Übereinstimmend im Bereich ' + nq + ': '),
      lang === 'fr' ? 'Niveau ' + nq + ' dans une seule évaluation : ' : (lang === 'en' ? nq + ' in only one rating: ' : 'Nur in einem Urteil im Bereich ' + nq + ': '));
    var mitDom = infs.filter(function (r) { return ausw.je[r].dom.some(function (z) { return z.id !== 'gav' && z.band; }); });
    if (!nd && mitDom.length >= 2) {
      s.push(lang === 'fr' ? 'Aucune des évaluations ne situe un domaine au niveau ' + nq : (lang === 'en' ? 'None of the ratings places a domain in the ' + nq + ' range' : 'In keinem der Urteile liegt eine Skala im Bereich ' + nq));
    }
    teil(['int', 'ext', 'idx'], PROBLEM.map(function (p) { return { id: p.id, name: p.name, feld: 'mal' }; }), function (b) { return b.rang >= 1; },
      lang === 'fr' ? 'Comportements problématiques élevés ou cliniquement significatifs dans plusieurs évaluations : ' : (lang === 'en' ? 'Maladaptive behaviour Elevated or Clinically Significant in more than one rating: ' : 'Problemverhalten übereinstimmend erhöht oder klinisch bedeutsam: '),
      lang === 'fr' ? 'Comportements problématiques élevés ou cliniquement significatifs dans une seule évaluation : ' : (lang === 'en' ? 'Maladaptive behaviour Elevated or Clinically Significant in only one rating: ' : 'Problemverhalten nur in einem Urteil erhöht oder klinisch bedeutsam: '));
    if (einzelnGesamt) {
      s.push(lang === 'fr' ? 'Des différences entre évaluateur·rice·s sont fréquentes ; elles peuvent refléter des exigences différentes selon le contexte (famille, école)'
        : (lang === 'en' ? 'Differences between raters are common and may reflect different demands at home and at school'
          : 'Unterschiede zwischen Beurteilern sind häufig; sie können auf unterschiedliche Anforderungen in Familie und Schule hinweisen'));
    }
    var gruppen = infs.map(function (r) { return GRUPPE[r]; });
    if (einzelnGesamt && gruppen.indexOf('eltern') >= 0 && gruppen.indexOf('lehrer') >= 0) {
      s.push(lang === 'fr' ? 'Par ailleurs, les versions parents et enseignant·e ne couvrent pas tout à fait les mêmes contenus dans le domaine Vie quotidienne'
        : (lang === 'en' ? 'In addition, the parent and teacher forms partly cover different content in the Daily Living Skills domain'
          : 'Zudem erfassen Eltern- und Lehrerform bei den Alltagsfertigkeiten zum Teil unterschiedliche Inhalte'));
    }
    return s.map(function (x) { return TX.satz(x, lang); }).join(' ');
  }

  /* ---------------- Bericht ---------------- */
  function bericht(lang, ctx, d, ausw) {
    var infs = ausw.infs.filter(function (r) { return ausw.je[r].hat; });
    var mitSub = infs.some(function (r) { return ausw.je[r].sub.some(function (z) { return z.wert != null; }); });
    var mitMal = infs.some(function (r) { return ausw.je[r].mal.some(function (z) { return z.wert != null; }); });
    var bl = [{ t: 'p', text: zweck(lang, mitSub, mitMal) }];
    if (!infs.length) { bl.push({ t: 'p', text: B.t(T.keine, lang) }); return bl; }
    bl.push({ t: 'p', text: durchfuehrung(lang, d, infs, ausw) });
    var mitDom = infs.filter(function (r) { return ausw.je[r].dom.some(function (z) { return z.wert != null || z.pr != null || z.ki; }); });
    mitDom.forEach(function (r, i) { bl.push(domTabelle(lang, d, r, ausw.je[r], i === mitDom.length - 1)); });
    if (mitSub) { bl.push(subTabelle(lang, infs, ausw)); }
    if (mitMal) { bl.push(malTabelle(lang, infs, ausw)); }
    infs.forEach(function (r) { var t = raterText(lang, r, ausw.je[r]); if (t) { bl.push({ t: 'p', text: t }); } });
    if (infs.length >= 2) { var v = vergleich(lang, infs, ausw); if (v) { bl.push({ t: 'p', text: v }); } }
    if (String(d.profil || '').trim()) { bl.push({ t: 'p', text: String(d.profil).trim(), frei: true }); }
    return bl;
  }
  /* „Vineland-3 – … (Sparrow, Cicchetti & Saulnier, 2016; deutsche Fassung: …, 2021): Elternfragebogen (Langform) und …, 20.09.2026“ */
  function verfahrenZeile(lang, d) {
    var fs = fassungId(d), zusatz = fs === 'andere' ? String(d.normenText || '').trim() : B.t(FASSUNGEN[fs].zeile, lang);
    var formen = [];
    aktiveInf(d).forEach(function (r) { var f = formVon(d, r); if (f && formen.indexOf(B.t(f.name, lang)) < 0) { formen.push(B.t(f.name, lang)); } });
    return B.t(TITEL, lang) + ' (' + AUTOREN + (zusatz ? '; ' + zusatz : '') + ')' + (formen.length ? ': ' + B.liste(formen, lang) : '') + (d.datum ? ', ' + B.datum(d.datum, lang) : '');
  }
  function zusammenfassung(lang, ctx, d, ausw) {
    var infs = ausw.infs.filter(function (r) { return ausw.je[r].hat; });
    if (!infs.length) { return ''; }
    var teile = [];
    var mitGav = infs.filter(function (r) { return domVon(ausw.je[r], 'gav').band; });
    if (mitGav.length) {
      var g = mitGav.map(function (r) { var z = domVon(ausw.je[r], 'gav'); return (lang === 'fr' ? 'de ' : '') + z.wert + ' (' + B.t(z.band.name, lang) + ') ' + infBei(r, lang); });
      teile.push((lang === 'de' ? 'GAV ' : 'ABC ') + B.liste(g, lang));
    }
    var tief = [];
    function wer(liste) { return ' (' + B.liste(liste.map(function (r) { return infName(r, lang); }), lang) + ')'; }
    SKALEN.filter(function (s) { return !s.gesamt; }).forEach(function (s) {
      var bei = infs.filter(function (r) { var z = domVon(ausw.je[r], s.id); return z.band && z.band.rang <= -1; });
      if (bei.length) { tief.push(B.t(s.name, lang) + wer(bei)); }
    });
    var nq = lang === 'fr' ? 'niveau ' + TX.q('faible', lang) + ' ou ' + TX.q('assez faible', lang) : (lang === 'en' ? 'Low or Moderately Low' : 'im Bereich ' + TX.q('niedrig', lang) + ' oder ' + TX.q('mäßig niedrig', lang));
    var domBewertet = infs.some(function (r) { return ausw.je[r].dom.some(function (z) { return z.id !== 'gav' && z.band; }); });
    if (tief.length) { teile.push(nq + ': ' + B.liste(tief, lang)); }
    else if (domBewertet) { teile.push(lang === 'fr' ? 'aucun domaine au ' + nq : (lang === 'en' ? 'no domain in the ' + nq + ' range' : 'keine Skala ' + nq)); }
    var mal = [];
    PROBLEM.forEach(function (p) {
      var bei = infs.filter(function (r) { var z = malVon(ausw.je[r], p.id); return z.band && z.band.rang >= 1; });
      if (bei.length) { mal.push(B.t(p.name, lang) + wer(bei)); }
    });
    if (mal.length) {
      teile.push((lang === 'fr' ? 'comportements problématiques élevés ou cliniquement significatifs : ' : (lang === 'en' ? 'maladaptive behaviour Elevated or Clinically Significant: ' : 'Problemverhalten erhöht oder klinisch bedeutsam: ')) + B.liste(mal, lang));
    }
    if (!teile.length) { return ''; }
    return (lang === 'fr' ? 'Vineland-3 : ' : 'Vineland-3: ') + teile.join('; ') + '.';
  }
  function hinweise(lang, ctx, d, ausw) {
    var infs = ausw.infs.filter(function (r) { return ausw.je[r].hat; }), h = [];
    var gavTief = infs.filter(function (r) { var z = domVon(ausw.je[r], 'gav'); return z.band && z.band.rang <= -2; });
    if (gavTief.length) {
      var wer = B.liste(gavTief.map(function (r) { return infName(r, lang); }), lang);
      h.push(lang === 'fr' ? 'Une note composite de comportement adaptatif au niveau ' + TX.q('faible', lang) + ' (Vineland-3, ' + wer + ') ne peut être interprétée qu’en lien avec une évaluation cognitive, l’anamnèse développementale et des observations dans plusieurs contextes de vie.'
        : (lang === 'en' ? 'An Adaptive Behavior Composite in the Low range (Vineland-3, ' + wer + ') can only be interpreted together with a cognitive assessment, the developmental history and observations in several settings.'
          : 'Ein Gesamtwert Adaptives Verhalten im Bereich „niedrig“ (Vineland-3, ' + wer + ') ist nur in der Zusammenschau mit einer kognitiven Testung, der Entwicklungsgeschichte und Beobachtungen in mehreren Lebensbereichen fachlich einzuordnen.'));
    }
    var domTief = SKALEN.filter(function (s) { return ['kom', 'all', 'soz'].indexOf(s.id) >= 0 && infs.some(function (r) { var z = domVon(ausw.je[r], s.id); return z.band && z.band.rang <= -1; }); });
    if (domTief.length) {
      var namen = B.liste(domTief.map(function (s) { return B.t(s.name, lang); }), lang);
      h.push(lang === 'fr' ? 'Les résultats de niveau ' + TX.q('faible', lang) + ' ou ' + TX.q('assez faible', lang) + ' (Vineland-3 : ' + namen + ') gagneraient à être précisés lors d’entretiens avec la famille et l’école (dans quelles situations du quotidien et avec quel degré de soutien), afin d’en dégager des objectifs de soutien.'
        : (lang === 'en' ? 'The Low or Moderately Low results (Vineland-3: ' + namen + ') should be explored in more detail with the family and the school (in which everyday situations and with how much support), so that support goals can be derived.'
          : 'Die Ergebnisse im Bereich „niedrig“ oder „mäßig niedrig“ (Vineland-3: ' + namen + ') sollten im Gespräch mit Familie und Schule konkretisiert werden (in welchen Alltagssituationen und mit wie viel Unterstützung), damit sich daraus Förderziele ableiten lassen.'));
    }
    if (infs.some(function (r) { var z = domVon(ausw.je[r], 'mot'); return z.band && z.band.rang <= -1; })) {
      h.push(lang === 'fr' ? 'Les résultats de niveau ' + TX.q('faible', lang) + ' ou ' + TX.q('assez faible', lang) + ' dans le domaine Motricité (Vineland-3) pourraient, si nécessaire, être approfondis par un bilan psychomoteur ou ergothérapeutique.'
        : (lang === 'en' ? 'The Low or Moderately Low Motor Skills results (Vineland-3) could, if needed, be explored further through a motor or occupational therapy assessment.'
          : 'Die Werte im Bereich „niedrig“ oder „mäßig niedrig“ in der Skala Motorik (Vineland-3) könnten bei Bedarf durch eine motorische bzw. ergotherapeutische Abklärung vertieft werden.'));
    }
    /* „Externalisierung im Urteil der Lehrkraft“ – ohne Klammern in der Klammer */
    var klin = [];
    PROBLEM.forEach(function (p) {
      var bei = infs.filter(function (r) { var z = malVon(ausw.je[r], p.id); return z.band && z.band.rang >= 2; });
      if (bei.length) { klin.push(B.t(p.name, lang) + ' ' + B.liste(bei.map(function (r) { return infBei(r, lang); }), lang)); }
    });
    if (klin.length) {
      var kl = B.liste(klin, lang);
      h.push(lang === 'fr' ? 'Les réponses cliniquement significatives concernant les comportements problématiques (Vineland-3 : ' + kl + ') devraient être approfondies à l’aide d’un questionnaire plus détaillé sur le comportement et les émotions (p. ex. CBCL/6-18R ou SDQ) et lors d’un entretien.'
        : (lang === 'en' ? 'The clinically significant maladaptive behaviour ratings (Vineland-3: ' + kl + ') should be explored further with a more detailed questionnaire on behaviour and emotions (e.g. CBCL/6-18R or SDQ) and in an interview.'
          : 'Die als klinisch bedeutsam eingestuften Angaben zum Problemverhalten (Vineland-3: ' + kl + ') sollten mit einem ausführlicheren Fragebogen zu Verhalten und Emotionen (z. B. CBCL/6-18R oder SDQ) und im Gespräch vertieft werden.'));
    }
    return h;
  }
  /* markierte kritische Items zu Selbstverletzung/Selbstgefährdung → zentraler Sicherheitsbaustein */
  function sicherheit(lang, d) {
    return aktiveInf(d).filter(function (r) { return (d.selbstgef || {})[r] === true; }).map(function (r) {
      var t = String((d.kritisch || {})[r] || '').trim(), kl = t ? ' (' + t + ')' : '';
      return lang === 'fr' ? 'Vineland-3, ' + infName(r, lang) + ' : parmi les items critiques relatifs aux comportements problématiques, des réponses concernant l’automutilation ou la mise en danger de soi ont été signalées' + kl + '.'
        : (lang === 'en' ? 'Vineland-3, ' + infName(r, lang) + ': among the critical items on maladaptive behaviour, responses concerning self-injury or self-endangerment were marked' + kl + '.'
          : 'Vineland-3, ' + infName(r, lang) + ': Bei den kritischen Items zum Problemverhalten wurden Angaben zu Selbstverletzung oder Selbstgefährdung markiert' + kl + '.');
    });
  }
  /* Hinweise im Formular (deutsch) */
  function warnung(d, fall) {
    var a = B.alter((fall.kind || {}).geburtsdatum, d.datum || (fall.bericht || {}).datumVon), infs = aktiveInf(d), w = [];
    var ohne = infs.filter(function (r) { return !formVon(d, r); });
    if (ohne.length) { w.push('Bitte die Form wählen: ' + ohne.map(function (r) { return INF_UI[r]; }).join(', ') + '.'); }
    infs.forEach(function (r) {
      var f = formVon(d, r);
      if (a && f && (a.dezimal < f.alter[0] || a.dezimal >= f.alter[1] + 1)) { w.push(f.name.de + ' ist für ' + f.alter[0] + ';0–' + f.alter[1] + ';11 Jahre normiert – das Kind ist ' + B.alterText(a, 'de') + ' alt.'); }
    });
    var hatMot = infs.some(function (r) { return zahl(d, 'sw.' + r + '.mot', 20, 140, true) != null || zahl(d, 'v.' + r + '.gro', 1, 24, true) != null || zahl(d, 'v.' + r + '.fei', 1, 24, true) != null; });
    if (a && hatMot && a.dezimal >= 10) { w.push('Die Motorik ist nur bis 9;11 Jahre normiert – das Kind ist ' + B.alterText(a, 'de') + ' alt. Bitte die Werte zur Motorik prüfen.'); }
    var hatMal = infs.some(function (r) { return PROBLEM.some(function (p) { return zahl(d, 'mal.' + r + '.' + p.id, 1, 24, true) != null; }); });
    if (a && hatMal && a.dezimal < 3) { w.push('Das Problemverhalten ist erst ab 3 Jahren normiert.'); }
    infs.forEach(function (r) {
      var f = formVon(d, r);
      if (f && !f.lang && SUBSKALEN.some(function (s) { return zahl(d, 'v.' + r + '.' + s.id, 1, 24, true) != null; })) {
        w.push('Für ' + INF_UI[r] + ' sind Subskalenwerte gespeichert, die bei der ' + f.name.de + ' nicht vorgesehen sind – sie erscheinen nicht im Bericht.');
      }
      var ki = auswerten(d).je[r].dom.filter(function (z) { return z.ki && z.wert != null && (z.wert < z.ki.von || z.wert > z.ki.bis); });
      if (ki.length) { w.push('Bei ' + INF_UI[r] + ' liegt der Standardwert außerhalb des eingegebenen Konfidenzintervalls (' + ki.map(function (z) { return B.t(z.name, 'de'); }).join(', ') + ') – bitte prüfen.'); }
    });
    return w.join(' ');
  }
  function fertig(d) {
    var infs = aktiveInf(d);
    return infs.length > 0 && infs.every(function (r) { return formVon(d, r) && zahl(d, 'sw.' + r + '.gav', 20, 140, true) != null; });
  }

  /* ---------------- Übernahme aus der früheren Version (v1) ----------------
     Felder vin-… gehören zum zuletzt gewählten Beurteiler (Radio vineland-resp);
     raters.vineland.{parent,teacher} enthält nur Standardwerte der Skalen und den
     „ABC“ – der war dort ohne Eingabe der Mittelwert der Skalen (inkl. Motorik)
     und wird dann NICHT übernommen. Die Form wurde früher nicht erfasst. */
  function ausAlt(alt) {
    var f = alt.fields || {}, ra = (alt.raters || {}).vineland || {};
    var DOM = { com: 'kom', dls: 'all', soc: 'soz', mot: 'mot' };
    var SUB = { rec: 'zuh', exp: 'spr', wri: 'les', per: 'sel', dom: 'hau', cmm: 'gem', int: 'umg', play: 'spi', cop: 'anp' };
    var RATER = { parent: 'eltern', teacher: 'lehrer' };
    var d = neu(), notiz = [], neueInf = [];
    function hat(k) { return f[k] != null && String(f[k]).trim() !== ''; }
    function txt(k) { return String(f[k]).trim(); }
    var aktuell = RATER[(alt.radios || {})['vineland-resp']] || 'eltern', ausFeldern = false;
    Object.keys(DOM).forEach(function (k) { if (hat('vin-' + k)) { d.sw[aktuell][DOM[k]] = txt('vin-' + k); ausFeldern = true; } });
    if (hat('vin-abc')) { d.sw[aktuell].gav = txt('vin-abc'); ausFeldern = true; }
    if (hat('vin-abc-pr')) { d.pr[aktuell].gav = txt('vin-abc-pr'); ausFeldern = true; }
    Object.keys(SUB).forEach(function (k) {
      if (!hat('vin-' + k)) { return; }
      if (aktuell === 'lehrer' && (k === 'dom' || k === 'cmm')) { notiz.push('„Haushalt“ und „Gemeinschaft“ beim Lehrerurteil wurden nicht übernommen – die Lehrerform hat stattdessen Zahlenverständnis und Schulgemeinschaft.'); return; }
      d.v[aktuell][SUB[k]] = txt('vin-' + k); ausFeldern = true;
    });
    if (hat('vin-mal')) { d.mal[aktuell].idx = txt('vin-mal'); ausFeldern = true; }
    if (ausFeldern) { neueInf.push(aktuell); }
    Object.keys(RATER).forEach(function (k) {
      var r = RATER[k], werte = ra[k] && ra[k].values;
      if (!werte || (r === aktuell && ausFeldern)) { return; }
      var doms = Object.keys(DOM).filter(function (x) { return werte[x] && B.num(werte[x].v) != null; }), n = 0;
      doms.forEach(function (x) { d.sw[r][DOM[x]] = String(werte[x].v); n++; });
      if (werte.abc && B.num(werte.abc.v) != null) {
        var mittel = doms.length >= 3 ? Math.round(doms.reduce(function (s, x) { return s + B.num(werte[x].v); }, 0) / doms.length) : null;
        if (mittel != null && B.num(werte.abc.v) === mittel) { notiz.push('Der Gesamtwert (' + INF_UI[r] + ') wurde nicht übernommen: Er entspricht dem Mittelwert der Skalen, den die frühere Version ohne Eingabe selbst gebildet hat. Bitte den GAV aus dem Manual eintragen.'); }
        else { d.sw[r].gav = String(werte.abc.v); n++; }
      }
      if (n && neueInf.indexOf(r) < 0) { neueInf.push(r); }
    });
    if (!neueInf.length) { return null; }
    d.informanten = INF.filter(function (i) { return neueInf.indexOf(i) >= 0; });
    d.altHinweis = '<b>Aus der früheren Version übernommen.</b> Bitte prüfen: Die Form (Interview oder Fragebogen, Lang- oder Kurzform) wurde früher nicht erfasst – bitte je Beurteiler wählen. ' +
      'In der früheren Version konnten Werte beim Wechsel des Beurteilers stehen bleiben – bitte kontrollieren, ob die Werte zum richtigen Beurteiler gehören. Standardwerte über 140 gibt es bei der Vineland-3 nicht.' +
      (notiz.length ? ' ' + notiz.filter(function (x, i, a) { return a.indexOf(x) === i; }).join(' ') : '');
    return d;
  }

  KAT.registrieren({
    id: 'vineland', kurz: 'Vineland-3', kurzUi: 'Vineland-3', name: TITEL, gruppe: 'adaptiv', alter: [3, 21], informantenText: 'Eltern/Bezugsperson, Lehrkraft',
    hilfe: 'Je Beurteiler eigene Form und eigene Werte – Eltern und Lehrkraft werden getrennt eingegeben und im Bericht verglichen. Alle Normwerte (Standardwerte, PR, KI, v-Werte, Gesamtwert) aus dem Auswertungsbogen bzw. der Auswertungssoftware übernehmen; das Tool rechnet keine Normwerte und bildet keinen Gesamtwert.',
    neu: neu, formular: formular, auswerten: auswerten, chip: chip, bericht: bericht, verfahrenZeile: verfahrenZeile,
    zusammenfassung: zusammenfassung, hinweise: hinweise, sicherheit: sicherheit, warnung: warnung, fertig: fertig, ausAlt: ausAlt,
    pruefen: [
      'Deutsche Fassung: Bearbeitung von Gontard, Wagner, Hussong & Mattheus (2021; erschienen bei Pearson, Frankfurt a. M., heute über Hogrefe/Testzentrale) – Zitierweise am Manual bestätigen.',
      'Deutsche Namen der Skalen und Subskalen nach der Verlagsbeschreibung: Kommunikation (Zuhören und Verstehen, Sprechen, Lesen und Schreiben), Alltagsfertigkeiten (Für sich selbst sorgen, Hausarbeit, Leben in der Gemeinschaft; Lehrerform: Zahlenverständnis, Schulgemeinschaft), Soziale Fertigkeiten (Umgang mit Anderen, Spielen und Freizeit, Anpassung), Motorik (Grobmotorik, Feinmotorik) – Schreibweise und Reihenfolge am Protokollbogen bestätigen.',
      'Kürzel „GAV“ (Gesamtwert Adaptives Verhalten) laut Dia-Inform-Verfahrensinformation; ob das Manual weitere Kürzel für die Skalen nutzt, prüfen.',
      'Problemverhalten der deutschen Fassung: Normmetrik von Internalisierung/Externalisierung (hier v-Werte wie US), Einstufungsgrenzen, und ob ein Gesamtindex ausgewiesen wird (hier „Index Problemverhalten“, US: Maladaptive Behavior Index).',
      'Deutsche Fassung: Enthalten die Kurzformen die Motorik und das Problemverhalten? Welche Konfidenzniveaus (hier 85/90/95 %) und wie werden Prozentränge unter 1 bzw. über 99 angegeben?',
      'Französisch: In Frankreich ist die Vineland-II (ECPA, 2015) erhältlich; die französische Vineland-3 war 2024/2025 in Normierung, in Kanada gibt es die Vineland-3 CDN-F (2022). Die FR-Bezeichnungen im Bericht (Vie quotidienne, sous-domaines, « note composite de comportement adaptatif », Numératie, Communauté scolaire, comportements problématiques) folgen der Vineland-II bzw. sind übersetzt.',
      'US-Originalfassung: Ob Maladaptive Behavior auch in der Lehrerform und auf Domänenebene erhoben wird, am Manual prüfen (hier optional für alle Formen eingebbar).',
      'Übernahme aus der früheren Version: Die Form wurde nicht erfasst; ein „ABC“, der dem Mittelwert der Skalen entspricht, wird nicht übernommen (die frühere Version bildete ihn selbst, inklusive Motorik).'
    ]
  });
})();
