/* =====================================================================
   DISYPS-III – Diagnostik-System für psychische Störungen nach ICD-10
   und DSM-5 für Kinder und Jugendliche – III (Döpfner & Görtz-Dorten, 2017)
   ---------------------------------------------------------------------
   Störungsspezifische Fragebögen ADHS und SSV. Jeder Beurteiler hat eine
   eigene Spalte: Fremdbeurteilung (FBB) durch Eltern und Lehrkraft bzw.
   Erzieher/in, Selbstbeurteilung (SBB, 11–18 Jahre).
   Sicher berechnet wird nur der Kennwert einer Skala:
     Kennwert = Summe der Itemwerte / Anzahl der beantworteten Items (0–3).
   Normwerte kommen aus dem Manual und werden eingegeben – je Beurteiler
   repräsentative Normen (Stanine oder Prozentrang; laut Verlag für Eltern-
   und Selbsturteil) oder klinische Normen (Prozentrang; auch Lehrer-/
   Erzieherurteil). Einstufung der repräsentativen Normwerte:
   Stanine 1–6 unauffällig, 7 grenzwertig, 8 auffällig, 9 sehr auffällig
   (PR 1–77 / 78–89 / 90–96 / 97–100). Klinische Prozentränge werden nicht
   eingestuft. Kein „Präsentationstyp“, keine Diagnose-Codes.
   Es gibt kein offizielles FR/EN-DISYPS: deutsche Skalennamen, im FR/EN-
   Bericht mit Übersetzung in Klammern.
   ===================================================================== */
(function () {
  var L = KAT.L;
  var TITEL = 'DISYPS-III – Diagnostik-System für psychische Störungen nach ICD-10 und DSM-5 für Kinder und Jugendliche – III';
  var ZITAT = 'Döpfner & Görtz-Dorten, 2017';

  /* Störungsbereiche (je ein FBB und ein SBB) */
  var MODULE = [
    { id: 'adhs', kurz: 'ADHS', ui: 'ADHS (FBB-ADHS / SBB-ADHS)', trenner: 'ADHS – FBB-ADHS / SBB-ADHS',
      erkl: L('ADHS (Aufmerksamkeitsdefizit-/Hyperaktivitätsstörungen)', 'ADHS (TDAH)', 'ADHS (ADHD)'),
      kopf: L('ADHS – Skala', 'ADHS (TDAH) – échelle', 'ADHS (ADHD) – scale') },
    { id: 'ssv', kurz: 'SSV', ui: 'SSV – Störungen des Sozialverhaltens (FBB-SSV / SBB-SSV)', trenner: 'SSV – FBB-SSV / SBB-SSV',
      erkl: L('SSV (Störungen des Sozialverhaltens)', 'SSV (troubles du comportement social)', 'SSV (conduct problems)'),
      kopf: L('SSV – Skala', 'SSV (troubles du comportement social) – échelle', 'SSV (conduct problems) – scale') }
  ];
  /* Skalen: deutscher Name (auch im FR/EN-Bericht) + Übersetzung für die Klammer */
  var SKALEN = [
    { id: 'adhs_ua', modul: 'adhs', de: 'Unaufmerksamkeit', fr: 'inattention', en: 'inattention' },
    { id: 'adhs_hy', modul: 'adhs', de: 'Hyperaktivität', fr: 'hyperactivité', en: 'hyperactivity' },
    { id: 'adhs_im', modul: 'adhs', de: 'Impulsivität', fr: 'impulsivité', en: 'impulsivity' },
    { id: 'adhs_hi', modul: 'adhs', de: 'Hyperaktivität-Impulsivität', fr: 'hyperactivité-impulsivité', en: 'hyperactivity-impulsivity', ui: 'falls ausgewertet' },
    { id: 'adhs_ges', modul: 'adhs', de: 'ADHS-Gesamt', fr: 'total TDAH', en: 'ADHD total', gesamt: true },
    { id: 'adhs_fb', modul: 'adhs', de: 'Funktionsbeeinträchtigung', fr: 'retentissement fonctionnel', en: 'functional impairment', ui: 'falls ausgewertet' },
    { id: 'adhs_ko', modul: 'adhs', de: 'Kompetenzen', fr: 'compétences', en: 'competencies', ui: 'falls ausgewertet · hoher Wert = günstig', ressource: true },
    { id: 'ssv_opp', modul: 'ssv', de: 'Oppositionell-aggressives Verhalten', fr: 'comportement oppositionnel-agressif', en: 'oppositional-aggressive behaviour' },
    { id: 'ssv_dis', modul: 'ssv', de: 'Dissozial-aggressives Verhalten', fr: 'comportement dissocial-agressif', en: 'dissocial-aggressive behaviour' },
    { id: 'ssv_ges', modul: 'ssv', de: 'SSV-Gesamt', fr: 'total des troubles du comportement social', en: 'conduct problems total', gesamt: true },
    { id: 'ssv_fb', modul: 'ssv', de: 'Funktionsbeeinträchtigung', fr: 'retentissement fonctionnel', en: 'functional impairment', ui: 'falls ausgewertet' },
    { id: 'ssv_ko', modul: 'ssv', de: 'Kompetenzen', fr: 'compétences', en: 'competencies', ui: 'falls ausgewertet · hoher Wert = günstig', ressource: true }
  ];
  function skalaVon(id) { return SKALEN.filter(function (s) { return s.id === id; })[0]; }
  /* „Unaufmerksamkeit“ · „Unaufmerksamkeit (inattention)“ */
  function skName(sk, lang) { return lang === 'de' ? sk.de : sk.de + ' (' + sk[lang] + ')'; }
  /* „Unaufmerksamkeit (Stanine 8; auffällig)“ · „Unaufmerksamkeit (inattention ; stanine 8 ; élevé)“ – eine Klammer */
  function skMit(sk, lang, extra) {
    var teile = (lang === 'de' ? [] : [sk[lang]]).concat(extra || []).filter(Boolean);
    return sk.de + (teile.length ? ' (' + teile.join(lang === 'fr' ? ' ; ' : '; ') + ')' : '');
  }

  /* ---------------- Beurteiler ---------------- */
  var INF = ['eltern', 'lehrer', 'selbst'];
  var INF_UI = { eltern: 'Eltern (FBB)', lehrer: 'Lehrkraft / Erzieher·in (FBB)', selbst: 'Selbst (SBB, 11–18 J.)' };
  var ART_UI = { eltern: [['eltern', 'Eltern'], ['mutter', 'Mutter'], ['vater', 'Vater']], lehrer: [['lehrer', 'Lehrkraft'], ['erzieherin', 'Erzieherin'], ['erzieher', 'Erzieher']] };
  /* Erzieher/in gibt es in INFORMANTEN (05-sprache.js) nicht – hier ergänzt */
  var ERZ = {
    erzieherin: { de: 'Urteil der Erzieherin', deIm: 'im Urteil der Erzieherin', fr: 'éducatrice', frPar: 'selon l’éducatrice', en: 'educator', enBy: 'according to the educator' },
    erzieher: { de: 'Urteil des Erziehers', deIm: 'im Urteil des Erziehers', fr: 'éducateur', frPar: 'selon l’éducateur', en: 'educator', enBy: 'according to the educator' }
  };
  /* „von den Eltern“ · „par les parents“ · „by the parents“ */
  var VON = {
    eltern: L('den Eltern', 'les parents', 'the parents'), mutter: L('der Mutter', 'la mère', 'the mother'), vater: L('dem Vater', 'le père', 'the father'),
    lehrer: L('der Lehrkraft', 'l’enseignant·e', 'the teacher'), erzieherin: L('der Erzieherin', 'l’éducatrice', 'the educator'), erzieher: L('dem Erzieher', 'l’éducateur', 'the educator')
  };
  var KURZ = {
    eltern: L('Eltern', 'parents', 'parents'), mutter: L('Mutter', 'mère', 'mother'), vater: L('Vater', 'père', 'father'),
    lehrer: L('Lehrkraft', 'enseignant·e', 'teacher'), erzieherin: L('Erzieherin', 'éducatrice', 'educator'), erzieher: L('Erzieher', 'éducateur', 'educator'), selbst: L('Selbst', 'autoévaluation', 'self-report')
  };
  function infKey(d, inf) {
    var a = (d.art || {})[inf];
    if (inf === 'eltern') { return a === 'mutter' || a === 'vater' ? a : 'eltern'; }
    if (inf === 'lehrer') { return a === 'erzieherin' || a === 'erzieher' ? a : 'lehrer'; }
    return inf;
  }
  /* „Elternurteil“ · „parents“ · „parents“ (wie infName) */
  function nameUrteil(d, inf, lang) {
    var k = infKey(d, inf);
    if (ERZ[k]) { return lang === 'fr' ? ERZ[k].fr : (lang === 'en' ? ERZ[k].en : ERZ[k].de); }
    return infName(k, lang);
  }
  /* „im Elternurteil“ · „selon les parents“ · „according to the parents“ (wie infBei) */
  function beiUrteil(d, inf, lang) {
    var k = infKey(d, inf);
    if (ERZ[k]) { return lang === 'fr' ? ERZ[k].frPar : (lang === 'en' ? ERZ[k].enBy : ERZ[k].deIm); }
    return infBei(k, lang);
  }
  function kurzUi(d, inf) { return B.t(KURZ[infKey(d, inf)], 'de'); }
  function aktiveInf(d) { var l = d.informanten || []; return INF.filter(function (i) { return l.indexOf(i) >= 0; }); }
  function aktiveMod(d) { var l = d.module || []; return MODULE.map(function (m) { return m.id; }).filter(function (m) { return l.indexOf(m) >= 0; }); }
  function modulVon(id) { return MODULE.filter(function (m) { return m.id === id; })[0]; }

  /* ---------------- Normen und Einstufung ---------------- */
  var NORMTYP = {
    'rep-st': { ui: 'repräsentativ – Stanine', spalte: 'Stanine', metrik: 'stanine', rep: true,
      text: L('repräsentative Normen (Stanine)', 'normes représentatives (stanines)', 'representative norms (stanines)') },
    'rep-pr': { ui: 'repräsentativ – Prozentrang', spalte: 'PR', metrik: 'pr', rep: true,
      text: L('repräsentative Normen (Prozentränge)', 'normes représentatives (rangs centiles)', 'representative norms (percentile ranks)') },
    'klin-pr': { ui: 'klinisch – Prozentrang', spalte: 'PR klin.', metrik: 'pr', rep: false,
      text: L('klinische Normen (Prozentränge)', 'normes cliniques (rangs centiles)', 'clinical norms (percentile ranks)') }
  };
  function normTyp(d, inf) { var n = (d.norm || {})[inf]; return NORMTYP[n] ? n : (inf === 'lehrer' ? 'klin-pr' : 'rep-st'); }
  function nwGrenzen(nt) { return nt === 'rep-st' ? { min: 1, max: 9, ganz: true } : { min: 0, max: 100, ganz: false }; }

  var NAMEN = [L('unauffällig', 'dans la norme', 'within normal limits'), L('grenzwertig', 'limite', 'borderline'), L('auffällig', 'élevé', 'elevated'), L('sehr auffällig', 'très élevé', 'very elevated')];
  var NAMEN_K = [L('unauffällig', 'dans la norme', 'within normal limits'), L('grenzwertig niedrig', 'limite basse', 'borderline low'), L('auffällig niedrig', 'bas', 'low'), L('sehr niedrig', 'très bas', 'very low')];
  function stufen(grenzen, namen) { return grenzen.map(function (g, i) { return { bis: g, rang: i, name: namen[i] }; }); }
  /* Problemskalen: hoher Wert = ungünstig */
  KAT.bandDefinieren('disyps-st', { art: 'problem', stufen: stufen([6, 7, 8, Infinity], NAMEN),
    pruefen: 'DISYPS-III: Einstufung Stanine 1–6 unauffällig, 7 grenzwertig, 8 auffällig, 9 sehr auffällig (PR 1–77 / 78–89 / 90–96 / 97–100) nach Sekundärquellen (Praxis-Erläuterungen, Förderdiagnostik Sachsen: „Stanine 8–9 bzw. 1–2 bei negativer Polung klinisch auffällig“) – Wortlaut der Stufen am Manual bestätigen.' });
  KAT.bandDefinieren('disyps-pr', { art: 'problem', stufen: stufen([77, 89, 96, Infinity], NAMEN) });
  /* Kompetenzen: niedriger Wert = ungünstig (Stanine 1–2 auffällig, 3 grenzwertig; PR nach Stanine-Grenzen 4 / 11 / 23) */
  KAT.bandDefinieren('disyps-st-komp', { art: 'ressource', stufen: [{ bis: 1, rang: 3, name: NAMEN_K[3] }, { bis: 2, rang: 2, name: NAMEN_K[2] }, { bis: 3, rang: 1, name: NAMEN_K[1] }, { bis: Infinity, rang: 0, name: NAMEN_K[0] }] });
  KAT.bandDefinieren('disyps-pr-komp', { art: 'ressource', stufen: [{ bis: 4, rang: 3, name: NAMEN_K[3] }, { bis: 11, rang: 2, name: NAMEN_K[2] }, { bis: 23, rang: 1, name: NAMEN_K[1] }, { bis: Infinity, rang: 0, name: NAMEN_K[0] }] });
  function bandId(d, inf, skId) {
    var nt = normTyp(d, inf); if (!NORMTYP[nt].rep) { return null; }
    var komp = !!(skalaVon(skId) || {}).ressource;
    return nt === 'rep-st' ? (komp ? 'disyps-st-komp' : 'disyps-st') : (komp ? 'disyps-pr-komp' : 'disyps-pr');
  }

  /* ---------------- Daten ---------------- */
  function leer() { return { eltern: {}, lehrer: {}, selbst: {} }; }
  function neu() {
    return { datum: '', module: ['adhs'], informanten: ['eltern'], eingabe: 'kennwert',
      art: { eltern: 'eltern', lehrer: 'lehrer' }, norm: { eltern: 'rep-st', lehrer: 'klin-pr', selbst: 'rep-st' },
      ngGeschl: { eltern: '', lehrer: '', selbst: '' }, ngAlter: { eltern: '', lehrer: '', selbst: '' },
      kw: leer(), summe: leer(), anzahl: leer(), nw: leer() };
  }
  function roh(obj, inf, sk) { return ((obj || {})[inf] || {})[sk]; }
  function zahlAus(v, min, max, ganz) {
    var n = B.num(v);
    if (n == null || n < min || n > max || (ganz && Math.round(n) !== n)) { return null; }
    return n;
  }
  /* Kennwert: direkt (0–3) oder Summe / Anzahl beantworteter Items */
  function kennwert(d, inf, sk) {
    if (d.eingabe === 'roh') {
      var s = zahlAus(roh(d.summe, inf, sk), 0, 120, true), n = zahlAus(roh(d.anzahl, inf, sk), 1, 40, true);
      if (s == null || n == null || s > 3 * n) { return null; }
      return Math.round(s / n * 100) / 100;
    }
    return zahlAus(roh(d.kw, inf, sk), 0, 3, false);
  }
  function normwert(d, inf, sk) { var g = nwGrenzen(normTyp(d, inf)); return zahlAus(roh(d.nw, inf, sk), g.min, g.max, g.ganz); }
  function auswerten(d) {
    var infs = aktiveInf(d), mods = aktiveMod(d), je = {};
    infs.forEach(function (inf) {
      var nt = normTyp(d, inf), zeilen = [];
      SKALEN.forEach(function (sk) {
        if (mods.indexOf(sk.modul) < 0) { return; }
        var nw = normwert(d, inf, sk.id), bid = bandId(d, inf, sk.id);
        zeilen.push({ id: sk.id, sk: sk, modul: sk.modul, kw: kennwert(d, inf, sk.id), nw: nw, metrik: NORMTYP[nt].metrik,
          band: nw != null && bid ? KAT.einstufen(bid, nw) : null });
      });
      je[inf] = { normTyp: nt, zeilen: zeilen };
    });
    return { infs: infs, module: mods, je: je };
  }
  function zeileVon(ausw, inf, id) { return ((ausw.je[inf] || {}).zeilen || []).filter(function (z) { return z.id === id; })[0]; }
  function chip(pfad, n, d) {
    var m = /\.nw\.(\w+)\.(\w+)$/.exec(pfad); if (!m) { return null; }
    var b = bandId(d, m[1], m[2]); return b ? KAT.einstufen(b, n) : null;
  }

  /* ---------------- Formular ---------------- */
  function zeilenUi(mods) {
    var z = [];
    MODULE.forEach(function (m) {
      if (mods.indexOf(m.id) < 0) { return; }
      z.push({ trenner: m.trenner });
      SKALEN.filter(function (sk) { return sk.modul === m.id; }).forEach(function (sk) { z.push({ id: sk.id, name: sk.de, hinweis: sk.ui || '' }); });
    });
    return z;
  }
  var NORM_OPT = Object.keys(NORMTYP).map(function (k) { return [k, NORMTYP[k].ui]; });
  function formular(d) {
    var infs = aktiveInf(d), mods = aktiveMod(d);
    var h = E.karte('<h2>Durchführung</h2><div class="raster">' + E.feld('tests.disyps.datum', 'Datum', { typ: 'date' }) +
      E.auswahl('tests.disyps.eingabe', 'Kennwerte', [['kennwert', 'direkt (Mittelwert 0–3)'], ['roh', 'aus Rohsumme und Itemzahl']], { neu: true, hilfe: 'Kennwert = Summe der Itemwerte / Anzahl beantworteter Items' }) + '</div>' +
      '<div style="margin-top:12px"><span class="feld"><span>Störungsbereiche (Bögen)</span></span>' + E.wahlen('tests.disyps.module', MODULE.map(function (m) { return [m.id, m.ui]; }), true, true) + '</div>' +
      '<div style="margin-top:12px"><span class="feld"><span>Wer hat einen Bogen ausgefüllt?</span></span>' + E.wahlen('tests.disyps.informanten', INF.map(function (i) { return [i, INF_UI[i]]; }), true, true) + '</div>');
    if (!mods.length || !infs.length) { return h + E.hinweis('Bitte mindestens einen Störungsbereich und einen Beurteiler wählen.', 'info'); }
    if (d.uebernommen && !d.uebernahmeGeprueft) {
      h += E.hinweis('Werte aus der früheren Version übernommen – dort als Stanine erfasst, ohne Angabe der Normstichprobe. Bitte Normen und Normgruppe je Beurteiler prüfen.' +
        '<div style="margin-top:6px">' + E.haken('tests.disyps.uebernahmeGeprueft', 'Geprüft – Hinweis ausblenden', '', true) + '</div>', 'info');
    }
    h += E.karte('<h2>Beurteiler und Normen</h2><p class="klein">Laut Verlag gibt es repräsentative Normen (Stanine) für das Eltern- und das Selbsturteil und klinische Normen (Prozentränge) für Eltern-, Lehrer- und Erzieherurteil sowie Selbsturteil. Klinische Prozentränge vergleichen mit Kindern und Jugendlichen einer klinischen Stichprobe und werden nicht als auffällig/unauffällig eingestuft.</p>' +
      infs.map(function (inf) {
        return '<h3 style="margin-top:14px">' + B.esc(INF_UI[inf]) + '</h3><div class="raster">' +
          (ART_UI[inf] ? E.auswahl('tests.disyps.art.' + inf, 'Wer genau?', ART_UI[inf], { neu: true }) : '') +
          E.auswahl('tests.disyps.norm.' + inf, 'Normen', NORM_OPT, { neu: true }) +
          E.auswahl('tests.disyps.ngGeschl.' + inf, 'Normgruppe: Geschlecht', [['m', 'Jungen'], ['w', 'Mädchen'], ['g', 'Jungen und Mädchen']], { leer: '– keine Angabe –' }) +
          E.feld('tests.disyps.ngAlter.' + inf, 'Normgruppe: Alter (Jahre)', { platzhalter: 'z. B. 7–10', hilfe: 'nur Zahlen, z. B. 11–13' }) + '</div>' +
          '<div id="disyps-ng-' + inf + '">' + ngHinweis(d, inf) + '</div>' +
          (inf === 'lehrer' && NORMTYP[normTyp(d, 'lehrer')].rep ? E.hinweis('Für das Lehrer- und Erzieherurteil nennt der Verlag nur klinische Normen. Bitte prüfen, aus welcher Normtabelle die Werte stammen.', 'info') : '');
      }).join(''));
    var spaltenKw = infs.map(function (i) { return { id: i, label: kurzUi(d, i) + (i === 'selbst' ? ' (SBB)' : ' (FBB)'), ohneChip: true }; });
    if (d.eingabe === 'roh') {
      h += E.karte('<h2>Kennwerte aus Rohwerten</h2><p class="klein">Je Skala die Summe der Itemwerte (0–3 je Item) und die Anzahl der beantworteten Items, wie auf dem Auswertungsbogen. Das Tool rechnet Kennwert = Summe / Anzahl.</p>' +
        '<h3>Rohsumme (Summe der Itemwerte)</h3>' +
        E.raster({ basis: 'tests.disyps.summe', spalten: spaltenKw.map(function (s) { return Object.assign({}, s, { min: 0, max: 120, ganz: true }); }), zeilen: zeilenUi(mods), einstufen: function () { return null; } }) +
        '<h3 style="margin-top:14px">Anzahl beantworteter Items</h3>' +
        E.raster({ basis: 'tests.disyps.anzahl', spalten: spaltenKw.map(function (s) { return Object.assign({}, s, { min: 1, max: 40, ganz: true }); }), zeilen: zeilenUi(mods), einstufen: function () { return null; } }) +
        '<h3 style="margin-top:14px">Berechnete Kennwerte</h3><div id="disyps-berechnet">' + berechnetUi(d) + '</div>');
    } else {
      h += E.karte('<h2>Kennwerte (optional)</h2><p class="klein">Kennwert = Mittelwert der beantworteten Items (0–3), z. B. 1,78. Erscheint im Bericht in der Tabelle.</p>' +
        E.raster({ basis: 'tests.disyps.kw', spalten: spaltenKw.map(function (s) { return Object.assign({}, s, { min: 0, max: 3, ganz: false }); }), zeilen: zeilenUi(mods), einstufen: function () { return null; } }));
    }
    h += E.karte('<h2>Normwerte</h2><p class="klein">Aus der Normtabelle des Manuals. Einstufung repräsentativer Normwerte: Stanine 1–6 unauffällig, 7 grenzwertig, 8 auffällig, 9 sehr auffällig (Prozentrang 1–77 / 78–89 / 90–96 / 97–100); bei Kompetenzen umgekehrt. Stanine 5 ist der Mittelwert. Klinische Prozentränge ohne Einstufung.</p>' +
      E.raster({ basis: 'tests.disyps.nw', gestapelt: infs.length > 1, spalten: infs.map(function (inf) {
        var nt = normTyp(d, inf), g = nwGrenzen(nt);
        return { id: inf, label: kurzUi(d, inf) + ' · ' + NORMTYP[nt].spalte, min: g.min, max: g.max, ganz: g.ganz, ohneChip: !NORMTYP[nt].rep };
      }), zeilen: zeilenUi(mods), einstufen: function (sk, inf, n) { var b = bandId(d, inf, sk); return b ? KAT.einstufen(b, n) : null; } }));
    return h;
  }
  function berechnetUi(d) {
    var infs = aktiveInf(d), mods = aktiveMod(d);
    return '<div class="tabelle-scroll"><table class="wraster"><thead><tr><th>Skala</th>' + infs.map(function (i) { return '<th>' + B.esc(kurzUi(d, i)) + '</th>'; }).join('') + '</tr></thead><tbody>' +
      SKALEN.filter(function (sk) { return mods.indexOf(sk.modul) >= 0; }).map(function (sk, n, alle) {
        var trenner = n === 0 || alle[n - 1].modul !== sk.modul ? '<tr class="trenner"><td colspan="' + (infs.length + 1) + '">' + B.esc(modulVon(sk.modul).trenner) + '</td></tr>' : '';
        return trenner + '<tr><td class="skala"><b>' + B.esc(sk.de) + '</b></td>' + infs.map(function (i) {
          var s = zahlAus(roh(d.summe, i, sk.id), 0, 120, true), n = zahlAus(roh(d.anzahl, i, sk.id), 1, 40, true), kw = kennwert(d, i, sk.id);
          if (kw != null) { return '<td>' + B.zahl(kw, 'de', 2) + '</td>'; }
          return '<td>' + (s != null && n != null ? '<span class="chip auff">Summe &gt; 3 × Anzahl</span>' : '<span class="leise">–</span>') + '</td>';
        }).join('') + '</tr>';
      }).join('') + '</tbody></table></div>';
  }
  /* Alter der Normgruppe, das nicht als Zahl/Spanne lesbar ist, erscheint nicht im Bericht – sofort sagen */
  function ngHinweis(d, inf) {
    var v = String((d.ngAlter || {})[inf] || '').trim();
    return v && !ngAlter(v) ? E.hinweis('„' + B.esc(v) + '“ ist keine Altersangabe in Jahren (z. B. 11–13) und erscheint so nicht im Bericht.', 'info') : '';
  }
  function teilUpdate(d) {
    var o = {};
    if (d.eingabe === 'roh') { o['disyps-berechnet'] = berechnetUi(d); }
    aktiveInf(d).forEach(function (inf) { o['disyps-ng-' + inf] = ngHinweis(d, inf); });
    return o;
  }

  /* ---------------- Bericht ---------------- */
  var GESCHL = { m: L('Jungen', 'garçons', 'boys'), w: L('Mädchen', 'filles', 'girls'), g: L('Jungen und Mädchen', 'filles et garçons', 'boys and girls') };
  /* Alter der Normgruppe nur als Zahl oder Spanne (sprachneutral): „7–10“ */
  function ngAlter(v) {
    var s = String(v || '').trim(), m = /^(\d{1,2})\s*(?:-|–|bis|à|to)\s*(\d{1,2})$/i.exec(s);
    if (m) { return m[1] + '–' + m[2]; }
    return /^\d{1,2}$/.test(s) ? s : '';
  }
  function normgruppe(d, inf, lang) {
    var g = GESCHL[(d.ngGeschl || {})[inf]], a = ngAlter((d.ngAlter || {})[inf]);
    var teile = [g ? B.t(g, lang) : '', a ? a + (lang === 'fr' ? ' ans' : (lang === 'en' ? ' years' : ' Jahre')) : ''].filter(Boolean);
    return teile.join(', ');
  }
  var ZWECK = {
    de: 'Das DISYPS-III ist ein Diagnostik-System für psychische Störungen im Kindes- und Jugendalter. Für jeden Störungsbereich gibt es Fremdbeurteilungsbögen (FBB) für Eltern, Lehrkräfte oder Erzieherinnen und Erzieher sowie Selbstbeurteilungsbögen (SBB) für Jugendliche ab 11 Jahren. Jedes Item wird von 0 (gar nicht) bis 3 (besonders) eingeschätzt; der Kennwert einer Skala ist der Mittelwert der beantworteten Items (0 bis 3).',
    fr: 'Le DISYPS-III (système diagnostique des troubles psychiques de l’enfant et de l’adolescent) est un instrument germanophone ; comme il n’en existe pas de version française, les noms des échelles sont indiqués en allemand, suivis de leur traduction. Pour chaque domaine, il comprend des questionnaires d’hétéro-évaluation (FBB, Fremdbeurteilungsbogen) destinés aux parents, aux enseignant·e·s ou aux éducateur·rice·s et des questionnaires d’auto-évaluation (SBB, Selbstbeurteilungsbogen) pour les jeunes à partir de 11 ans. Chaque item est coté de 0 (pas du tout) à 3 (particulièrement) ; le score moyen (Kennwert) d’une échelle correspond à la moyenne des items renseignés (de 0 à 3).',
    en: 'The DISYPS-III (diagnostic system for mental disorders in children and adolescents) is a German-language instrument; as there is no English version, scale names are given in German, followed by a translation. For each disorder area it includes rating forms for parents, teachers or educators (FBB, Fremdbeurteilungsbogen) and self-rating forms for young people aged 11 and over (SBB, Selbstbeurteilungsbogen). Each item is rated from 0 (not at all) to 3 (particularly); the scale score (Kennwert) is the mean of the answered items (0 to 3).'
  };
  function hatWerte(ausw, inf, modul) { return ((ausw.je[inf] || {}).zeilen || []).some(function (z) { return (!modul || z.modul === modul) && (z.nw != null || z.kw != null); }); }
  /* „Ausgefüllt wurden die Fremdbeurteilungsbögen (FBB) von den Eltern und der Lehrkraft sowie der Selbstbeurteilungsbogen (SBB) von Tom selbst.“
     Plural, wenn mehrere Beurteiler oder mehrere Störungsbereiche (je ein Bogen) */
  function werSatz(lang, ctx, d, infs, ausw, mods) {
    var fbb = infs.filter(function (i) { return i !== 'selbst'; }), sbb = infs.indexOf('selbst') >= 0;
    var fbbPl = fbb.length > 1 || mods.filter(function (m) { return fbb.some(function (i) { return hatWerte(ausw, i, m); }); }).length > 1;
    var sbbPl = mods.filter(function (m) { return hatWerte(ausw, 'selbst', m); }).length > 1;
    var von = B.liste(fbb.map(function (i) { return B.t(VON[infKey(d, i)], lang); }), lang);
    if (lang === 'fr') {
      var selbstFr = ctx.vorname || (ctx.alter && ctx.alter.j >= 12 ? 'le/la jeune' : 'l’enfant');
      var fbbFr = fbbPl ? 'Les questionnaires d’hétéro-évaluation (FBB) ont été remplis par ' : 'Le questionnaire d’hétéro-évaluation (FBB) a été rempli par ';
      if (fbb.length && sbb) { return fbbFr + von + ', ' + (sbbPl ? 'les questionnaires' : 'le questionnaire') + ' d’auto-évaluation (SBB) par ' + selbstFr + '.'; }
      return fbb.length ? fbbFr + von + '.' : (sbbPl ? 'Les questionnaires d’auto-évaluation (SBB) ont été remplis par ' : 'Le questionnaire d’auto-évaluation (SBB) a été rempli par ') + selbstFr + '.';
    }
    if (lang === 'en') {
      var selbstEn = ctx.vorname || (ctx.alter && ctx.alter.j >= 12 ? 'the young person' : 'the child');
      var fbbEn = fbbPl ? 'The rating forms (FBB) were completed by ' : 'The rating form (FBB) was completed by ';
      if (fbb.length && sbb) { return fbbEn + von + ', and the self-rating ' + (sbbPl ? 'forms' : 'form') + ' (SBB) by ' + selbstEn + '.'; }
      return fbb.length ? fbbEn + von + '.' : (sbbPl ? 'The self-rating forms (SBB) were completed by ' : 'The self-rating form (SBB) was completed by ') + selbstEn + '.';
    }
    var selbstDe = ctx.vorname ? ctx.vorname + ' selbst' : (ctx.alter && ctx.alter.j >= 12 ? 'der/dem Jugendlichen selbst' : 'dem Kind selbst');
    var teile = [];
    if (fbb.length) { teile.push((fbbPl ? 'die Fremdbeurteilungsbögen (FBB) von ' : 'der Fremdbeurteilungsbogen (FBB) von ') + von); }
    if (sbb) { teile.push((sbbPl ? 'die Selbstbeurteilungsbögen (SBB) von ' : 'der Selbstbeurteilungsbogen (SBB) von ') + selbstDe); }
    return 'Ausgefüllt ' + ((fbb.length && fbbPl) || (sbb && sbbPl) || teile.length > 1 ? 'wurden ' : 'wurde ') + teile.join(' sowie ') + '.';
  }
  /* Normen nur für Beurteiler, für die Normwerte eingegeben sind */
  function normenSaetze(lang, d, alleInfs, ausw) {
    var infs = alleInfs.filter(function (i) { return ausw.je[i].zeilen.some(function (z) { return z.nw != null; }); });
    if (!infs.length) { return ''; }
    var s = [], typen = infs.map(function (i) { return normTyp(d, i); });
    var liste = infs.map(function (i) {
      var ng = normgruppe(d, i, lang), nt = NORMTYP[normTyp(d, i)], t = B.t(nt.text, lang);
      if (ng) { t = t.replace(/\)$/, (lang === 'fr' ? ' ; groupe normatif ' : (lang === 'en' ? '; norm group ' : '; Normgruppe ')) + ng + ')'); }
      return nameUrteil(d, i, lang) + ' – ' + t;
    });
    s.push((lang === 'fr' ? 'Normes : ' : (lang === 'en' ? 'Norms: ' : 'Normen: ')) + liste.join(lang === 'fr' ? ' ; ' : '; '));
    if (typen.indexOf('rep-st') >= 0) {
      s.push(lang === 'fr' ? 'Les stanines vont de 1 à 9 (moyenne 5, écart type 2) ; les valeurs 1 à 6 sont dans la norme, la valeur 7 correspond à la zone limite, 8 à un score élevé et 9 à un score très élevé'
        : (lang === 'en' ? 'Stanines range from 1 to 9 (mean 5, standard deviation 2); stanines 1 to 6 are regarded as within normal limits, 7 as borderline, 8 as elevated and 9 as very elevated'
          : 'Stanine reichen von 1 bis 9 (Mittelwert 5, Standardabweichung 2); Stanine 1 bis 6 gelten als unauffällig, 7 als grenzwertig, 8 als auffällig und 9 als sehr auffällig'));
    }
    if (typen.indexOf('rep-pr') >= 0) {
      s.push(lang === 'fr' ? 'Pour les rangs centiles selon les normes représentatives, les zones correspondantes sont 1 à 77 (dans la norme), 78 à 89 (limite), 90 à 96 (élevé) et 97 à 100 (très élevé)'
        : (lang === 'en' ? 'For percentile ranks based on representative norms, the corresponding bands are 1 to 77 (within normal limits), 78 to 89 (borderline), 90 to 96 (elevated) and 97 to 100 (very elevated)'
          : 'Bei Prozenträngen nach repräsentativen Normen entspricht das den Bereichen 1 bis 77 (unauffällig), 78 bis 89 (grenzwertig), 90 bis 96 (auffällig) und 97 bis 100 (sehr auffällig)'));
    }
    var komp = infs.some(function (i) { return ausw.je[i].zeilen.some(function (z) { return z.sk.ressource && z.band; }); });
    if (komp) {
      s.push(lang === 'fr' ? 'Pour l’échelle Kompetenzen (compétences), le sens est inversé : des valeurs basses indiquent moins de ressources'
        : (lang === 'en' ? 'For the Kompetenzen (competencies) scale the direction is reversed: low scores indicate fewer strengths'
          : 'Bei der Skala Kompetenzen ist die Richtung umgekehrt: Niedrige Werte weisen auf geringere Stärken hin'));
    }
    if (typen.indexOf('klin-pr') >= 0) {
      s.push(lang === 'fr' ? 'Les rangs centiles selon les normes cliniques indiquent le pourcentage d’un groupe de référence clinique dont le score moyen est inférieur ou égal ; un rang centile de 50 correspond à l’intensité moyenne dans ce groupe. Ces valeurs ne sont pas classées comme normales ou élevées'
        : (lang === 'en' ? 'Percentile ranks based on clinical norms indicate the percentage of a clinical reference group with an equal or lower scale score; a percentile rank of 50 corresponds to the average severity in that group. These values are not classified as within or outside normal limits'
          : 'Prozentränge nach klinischen Normen geben an, wie viel Prozent einer klinischen Vergleichsgruppe einen niedrigeren oder gleich hohen Kennwert haben; ein Prozentrang von 50 entspricht der mittleren Ausprägung in dieser Gruppe. Diese Werte werden nicht als unauffällig oder auffällig eingestuft'));
      if (typen.some(function (t) { return NORMTYP[t].rep; })) {
        s.push(lang === 'fr' ? 'Les valeurs issues des normes cliniques et des normes représentatives ne sont pas directement comparables'
          : (lang === 'en' ? 'Scores based on clinical norms and on representative norms are not directly comparable'
            : 'Werte nach klinischen und nach repräsentativen Normen sind nicht direkt miteinander vergleichbar'));
      }
    }
    return s.map(function (x) { return TX.satz(x, lang); }).join(' ');
  }
  /* Tabellenzelle: „1,78 · Stanine 8 (auffällig)“ · „2,11 · PR 71“ */
  function einheitKurz(metrik, lang) { return metrik === 'stanine' ? (lang === 'de' ? 'Stanine' : 'stanine') : (lang === 'fr' ? 'rang centile' : 'PR'); }
  function zelle(z, lang) {
    if (!z) { return '–'; }
    var t = [];
    if (z.kw != null) { t.push(B.zahl(z.kw, lang, 2)); }
    if (z.nw != null) { t.push(einheitKurz(z.metrik, lang) + ' ' + B.zahl(z.nw, lang) + (z.band ? ' (' + B.t(z.band.name, lang) + ')' : '')); }
    return t.length ? t.join(' · ') : '–';
  }
  function spaltenKopf(d, inf, lang) { return B.ersteGross(nameUrteil(d, inf, lang)) + (inf === 'selbst' ? ' (SBB)' : ' (FBB)'); }
  /* Werte in der Satz-Klammer: „Stanine 8; auffällig“ */
  function werteKlammer(z, lang) {
    var t = [];
    if (z.nw != null) { t.push(TX.einheit(z.metrik === 'stanine' ? 'stanine' : 'pr', lang) + ' ' + B.zahl(z.nw, lang)); }
    if (z.band) { t.push(B.t(z.band.name, lang)); }
    return t;
  }
  function gruppenSatz(lang, beiWem, liste, bereich) {
    /* im unauffälligen Bereich nur der Wert – „(Stanine 4; unauffällig) im unauffälligen Bereich“ wäre doppelt */
    var namen = liste.map(function (z) { return skMit(z.sk, lang, werteKlammer(bereich === 'ok' ? { nw: z.nw, metrik: z.metrik } : z, lang)); }), n = namen.length, ber = B.t(TX.BEREICH[bereich], lang);
    if (lang === 'fr') { return n === 1 ? beiWem + ', l’échelle ' + namen[0] + ' se situe ' + ber : beiWem + ', les échelles ' + B.liste(namen, lang) + ' se situent ' + ber; }
    if (lang === 'en') { return n === 1 ? beiWem + ', the scale ' + namen[0] + ' is ' + ber : beiWem + ', the scales ' + B.liste(namen, lang) + ' are ' + ber; }
    return n === 1 ? beiWem + ' liegt die Skala ' + namen[0] + ' ' + ber : beiWem + ' liegen die Skalen ' + B.liste(namen, lang) + ' ' + ber;
  }
  /* Absatz für einen Beurteiler mit eingestuften (repräsentativen) Normwerten */
  function absatzEingestuft(lang, beiWem, zeilen) {
    var g = { auff: [], grenz: [], ok: [] }, s = [];
    zeilen.forEach(function (z) { if (!z.band) { return; } var r = z.band.rang; (r >= 2 ? g.auff : (r === 1 ? g.grenz : g.ok)).push(z); });
    if (!g.auff.length && !g.grenz.length) {
      if (!g.ok.length) { return ''; }
      s.push(g.ok.length === 1 ? gruppenSatz(lang, beiWem, g.ok, 'ok')
        : (lang === 'fr' ? beiWem + ', toutes les échelles se situent dans la zone normale' : (lang === 'en' ? beiWem + ', all scales are within the normal range' : beiWem + ' liegen alle Skalen im unauffälligen Bereich')));
    } else {
      if (g.auff.length) { s.push(gruppenSatz(lang, beiWem, g.auff, 'auff')); }
      if (g.grenz.length) { s.push(gruppenSatz(lang, g.auff.length ? (lang === 'fr' ? 'En outre' : (lang === 'en' ? 'In addition' : 'Außerdem')) : beiWem, g.grenz, 'grenz')); }
      if (g.ok.length === 1) {
        var n1 = skMit(g.ok[0].sk, lang, werteKlammer({ nw: g.ok[0].nw, metrik: g.ok[0].metrik }, lang));
        s.push(lang === 'fr' ? 'L’échelle ' + n1 + ' se situe dans la zone normale' : (lang === 'en' ? 'The scale ' + n1 + ' is within the normal range' : 'Die Skala ' + n1 + ' liegt im unauffälligen Bereich'));
      } else if (g.ok.length) {
        s.push(lang === 'fr' ? 'Les autres échelles se situent dans la zone normale' : (lang === 'en' ? 'The other scales are within the normal range' : 'Die übrigen Skalen liegen im unauffälligen Bereich'));
      }
    }
    return s.map(function (x) { return TX.satz(x, lang); }).join(' ');
  }
  /* Absatz für einen Beurteiler mit klinischen Prozenträngen (ohne Einstufung) */
  function absatzKlinisch(lang, beiWem, zeilen) {
    var z = zeilen.filter(function (x) { return x.nw != null; }); if (!z.length) { return ''; }
    var teile = z.map(function (x) { return skName(x.sk, lang) + ' ' + B.zahl(x.nw, lang); });
    return TX.satz(lang === 'fr' ? beiWem + ', la comparaison avec l’échantillon clinique donne les rangs centiles suivants : ' + B.liste(teile, lang)
      : (lang === 'en' ? beiWem + ', comparison with the clinical sample gives the following percentile ranks: ' + B.liste(teile, lang)
        : beiWem + ' ergeben sich im Vergleich mit der klinischen Stichprobe folgende Prozentränge: ' + B.liste(teile, lang)), lang);
  }
  /* Skalen, für die nur ein Kennwert vorliegt */
  function absatzNurKennwert(lang, beiWem, zeilen, allein) {
    var z = zeilen.filter(function (x) { return x.nw == null && x.kw != null; }); if (!z.length) { return ''; }
    var teile = z.map(function (x) { return skName(x.sk, lang) + ' ' + B.zahl(x.kw, lang, 2); });
    if (allein) {
      return TX.satz(lang === 'fr' ? beiWem + ', seuls les scores moyens (0 à 3) sont disponibles, sans comparaison normative : ' + B.liste(teile, lang)
        : (lang === 'en' ? beiWem + ', only mean item scores (0 to 3) are available, without comparison with norms: ' + B.liste(teile, lang)
          : beiWem + ' liegen nur Kennwerte (0 bis 3) ohne Normvergleich vor: ' + B.liste(teile, lang)), lang);
    }
    return TX.satz(lang === 'fr' ? 'Sans note normée (score moyen uniquement) : ' + B.liste(teile, lang)
      : (lang === 'en' ? 'Without a normed score (mean item score only): ' + B.liste(teile, lang) : 'Ohne Normwert (nur Kennwert): ' + B.liste(teile, lang)), lang);
  }
  /* Vergleich der Beurteiler mit eingestuften Werten (wie TX.vergleichAbsatz, mit Erzieher/in) */
  function vergleich(lang, d, ausw, modul) {
    var infs = ausw.infs.filter(function (i) { return ausw.je[i].zeilen.some(function (z) { return z.modul === modul && z.band; }); });
    if (infs.length < 2) { return ''; }
    var gemeinsam = [], einzeln = [];
    SKALEN.filter(function (sk) { return sk.modul === modul; }).forEach(function (sk) {
      var mit = infs.filter(function (i) { var z = zeileVon(ausw, i, sk.id); return z && z.band; });
      var hoch = mit.filter(function (i) { return zeileVon(ausw, i, sk.id).band.rang >= 2; });
      if (hoch.length >= 2) { gemeinsam.push(skMit(sk, lang, [B.liste(hoch.map(function (i) { return nameUrteil(d, i, lang); }), lang)])); }
      else if (hoch.length === 1 && mit.length >= 2) { einzeln.push(skMit(sk, lang, [beiUrteil(d, hoch[0], lang)])); }
    });
    var s = [], sep = lang === 'fr' ? ' ; ' : '; ';
    if (gemeinsam.length) { s.push((lang === 'fr' ? 'Zone clinique dans plusieurs évaluations : ' : (lang === 'en' ? 'Clinical range in more than one rating: ' : 'Übereinstimmend im auffälligen Bereich: ')) + gemeinsam.join(sep)); }
    if (einzeln.length) { s.push((lang === 'fr' ? 'Zone clinique dans une seule évaluation : ' : (lang === 'en' ? 'Clinical range in only one rating: ' : 'Nur in einem Urteil auffällig: ')) + einzeln.join(sep)); }
    if (!gemeinsam.length && !einzeln.length) {
      var wer = B.liste(infs.map(function (i) { return nameUrteil(d, i, lang); }), lang);
      s.push(lang === 'fr' ? 'Les évaluations (' + wer + ') ne font pas apparaître de divergence importante' : (lang === 'en' ? 'The ratings (' + wer + ') show no marked differences' : 'Die Urteile (' + wer + ') weichen nicht wesentlich voneinander ab'));
    }
    if (einzeln.length) {
      s.push(lang === 'fr' ? 'Des différences entre les évaluateur·rice·s sont fréquentes ; elles peuvent refléter des exigences différentes selon le contexte (famille, école)'
        : (lang === 'en' ? 'Differences between raters are common and may reflect different demands in different settings (home, school)'
          : 'Unterschiede zwischen Beurteilern sind häufig; sie können auf unterschiedliche Anforderungen in den Lebensbereichen (Familie, Schule) hinweisen'));
    }
    return s.map(function (x) { return TX.satz(x, lang); }).join(' ');
  }
  function bericht(lang, ctx, d, ausw) {
    var bl = [{ t: 'p', text: ZWECK[lang] }];
    var infs = ausw.infs.filter(function (i) { return hatWerte(ausw, i); });
    var mods = ausw.module.filter(function (m) { return infs.some(function (i) { return hatWerte(ausw, i, m); }); });
    if (!infs.length || !mods.length) { bl.push({ t: 'p', text: lang === 'fr' ? 'Aucun résultat n’a encore été saisi.' : (lang === 'en' ? 'No results have been entered yet.' : 'Es wurden noch keine Ergebnisse eingegeben.') }); return bl; }
    var eingesetzt = B.liste(mods.map(function (m) { return B.t(modulVon(m).erkl, lang); }), lang);
    bl.push({ t: 'p', text: TX.satz(lang === 'fr' ? 'Ont été utilisés les questionnaires ' + eingesetzt : (lang === 'en' ? 'The forms used were ' + eingesetzt : 'Eingesetzt wurden die Bögen zu ' + eingesetzt), lang) + ' ' +
      TX.satz(werSatz(lang, ctx, d, infs, ausw, mods), lang) });
    var normenText = normenSaetze(lang, d, infs, ausw);
    if (normenText) { bl.push({ t: 'p', text: normenText }); }
    mods.forEach(function (m) {
      var mi = infs.filter(function (i) { return hatWerte(ausw, i, m); });
      var skalen = SKALEN.filter(function (sk) { return sk.modul === m && mi.some(function (i) { var z = zeileVon(ausw, i, sk.id); return z && (z.nw != null || z.kw != null); }); });
      var mitKw = mi.some(function (i) { return ausw.je[i].zeilen.some(function (z) { return z.modul === m && z.kw != null; }); });
      var mitNw = mi.some(function (i) { return ausw.je[i].zeilen.some(function (z) { return z.modul === m && z.nw != null; }); });
      var anm = mitKw && mitNw ? L('Angegeben sind der Kennwert (Mittelwert der beantworteten Items, 0 bis 3) und der Normwert; in Klammern die Einstufung.', 'Sont indiqués le score moyen (Kennwert, moyenne des items renseignés, de 0 à 3) et la note normée ; entre parenthèses, la classification.', 'Shown are the mean item score (Kennwert, mean of the answered items, 0 to 3) and the normed score; classification in brackets.')
        : (mitNw ? L('Angegeben ist der Normwert; in Klammern die Einstufung.', 'Est indiquée la note normée ; entre parenthèses, la classification.', 'Shown is the normed score; classification in brackets.')
          : L('Angegeben ist der Kennwert (Mittelwert der beantworteten Items, 0 bis 3), ohne Normvergleich.', 'Est indiqué le score moyen (Kennwert, moyenne des items renseignés, de 0 à 3), sans comparaison normative.', 'Shown is the mean item score (Kennwert, mean of the answered items, 0 to 3), without comparison with norms.'));
      bl.push({ t: 'tabelle', kopf: [B.t(modulVon(m).kopf, lang)].concat(mi.map(function (i) { return spaltenKopf(d, i, lang); })),
        zeilen: skalen.map(function (sk) { return [skName(sk, lang)].concat(mi.map(function (i) { return zelle(zeileVon(ausw, i, sk.id), lang); })); }),
        anmerkung: B.t(anm, lang) });
      mi.forEach(function (i) {
        var zeilen = ausw.je[i].zeilen.filter(function (z) { return z.modul === m; }), beiWem = B.ersteGross(beiUrteil(d, i, lang)), t;
        var mitNorm = zeilen.some(function (z) { return z.nw != null; });
        if (!mitNorm) { t = absatzNurKennwert(lang, beiWem, zeilen, true); }
        else {
          t = ausw.je[i].normTyp === 'klin-pr' ? absatzKlinisch(lang, beiWem, zeilen) : absatzEingestuft(lang, beiWem, zeilen);
          var rest = absatzNurKennwert(lang, beiWem, zeilen, false);
          if (rest) { t += ' ' + rest; }
        }
        if (t) { bl.push({ t: 'p', text: t }); }
      });
      var vgl = vergleich(lang, d, ausw, m);
      if (vgl) { bl.push({ t: 'p', text: vgl }); }
    });
    return bl;
  }
  /* „DISYPS-III – … – III (Döpfner & Görtz-Dorten, 2017): FBB-ADHS (Eltern und Lehrkraft); SBB-ADHS, 20.09.2026“ */
  function verfahrenZeile(lang, d) {
    var infs = aktiveInf(d), mods = aktiveMod(d), teile = [];
    var fbb = infs.filter(function (i) { return i !== 'selbst'; });
    if (mods.length && fbb.length) { teile.push(B.liste(mods.map(function (m) { return 'FBB-' + modulVon(m).kurz; }), lang) + ' (' + B.liste(fbb.map(function (i) { return B.t(KURZ[infKey(d, i)], lang); }), lang) + ')'); }
    if (mods.length && infs.indexOf('selbst') >= 0) { teile.push(B.liste(mods.map(function (m) { return 'SBB-' + modulVon(m).kurz; }), lang)); }
    return TITEL + ' (' + ZITAT + ')' + (teile.length ? (lang === 'fr' ? ' : ' : ': ') + teile.join(lang === 'fr' ? ' ; ' : '; ') : '') + (d.datum ? ', ' + B.datum(d.datum, lang) : '');
  }
  function zusammenfassung(lang, ctx, d, ausw) {
    var infs = ausw.infs.filter(function (i) { return hatWerte(ausw, i); });
    var eingestuft = infs.filter(function (i) { return ausw.je[i].zeilen.some(function (z) { return z.band; }); });
    var klinisch = infs.filter(function (i) { return ausw.je[i].normTyp === 'klin-pr' && ausw.je[i].zeilen.some(function (z) { return z.nw != null; }); });
    if (!eingestuft.length && !klinisch.length) { return ''; }
    var teile = [];
    if (eingestuft.length) {
      var auff = [], niedrig = [];
      SKALEN.forEach(function (sk) {
        var bei = eingestuft.filter(function (i) { var z = zeileVon(ausw, i, sk.id); return z && z.band && z.band.rang >= 2; });
        if (bei.length) { (sk.ressource ? niedrig : auff).push(skMit(sk, lang, [B.liste(bei.map(function (i) { return nameUrteil(d, i, lang); }), lang)])); }
      });
      teile.push(auff.length ? (lang === 'fr' ? 'zone clinique pour ' : (lang === 'en' ? 'clinical range for ' : 'auffällige Werte für ')) + B.liste(auff, lang)
        : (lang === 'fr' ? 'aucune échelle de difficultés dans la zone clinique' : (lang === 'en' ? 'no problem scale in the clinical range' : 'keine Problemskala im auffälligen Bereich')));
      if (niedrig.length) { teile.push((lang === 'fr' ? 'valeurs basses pour ' : (lang === 'en' ? 'low scores for ' : 'niedrige Werte für ')) + B.liste(niedrig, lang)); }
    }
    klinisch.forEach(function (i) {
      var mitWert = ausw.je[i].zeilen.filter(function (z) { return z.nw != null; }), ges = mitWert.filter(function (z) { return z.sk.gesamt; });
      var werte = B.liste((ges.length ? ges : mitWert).map(function (z) { return skMit(z.sk, lang, [TX.einheit('pr', lang) + ' ' + B.zahl(z.nw, lang)]); }), lang);
      teile.push(lang === 'fr' ? beiUrteil(d, i, lang) + ' (normes cliniques), ' + werte : (lang === 'en' ? beiUrteil(d, i, lang) + ' (clinical norms), ' + werte : beiUrteil(d, i, lang) + ' (klinische Normen) ' + werte));
    });
    return 'DISYPS-III' + (lang === 'fr' ? ' : ' : ': ') + teile.join(lang === 'fr' ? ' ; ' : '; ') + '.';
  }
  function hinweise(lang, ctx, d, ausw) {
    function auffaellig(modul) {
      return ausw.infs.some(function (i) { return ausw.je[i].zeilen.some(function (z) { return z.modul === modul && !z.sk.ressource && z.band && z.band.rang >= 2; }); });
    }
    var h = [];
    if (auffaellig('adhs')) {
      h.push(lang === 'fr' ? 'Les scores élevés aux échelles ADHS (TDAH) du DISYPS-III justifient un approfondissement à l’aide de l’anamnèse développementale, d’observations dans plusieurs contextes de vie et de la liste de contrôle diagnostique (DCL-ADHS).'
        : (lang === 'en' ? 'The raised scores on the DISYPS-III ADHS (ADHD) scales should be explored further through the developmental history, observation in several settings and the diagnostic checklist (DCL-ADHS).'
          : 'Die erhöhten Werte in den ADHS-Skalen des DISYPS-III sollten über Entwicklungsgeschichte, Beobachtung in mehreren Lebensbereichen und die Diagnose-Checkliste (DCL-ADHS) vertieft werden.'));
    }
    if (auffaellig('ssv')) {
      h.push(lang === 'fr' ? 'Les scores élevés aux échelles SSV (comportement social) du DISYPS-III méritent d’être approfondis lors d’entretiens avec les parents et l’école, par l’observation dans plusieurs situations et à l’aide de la liste de contrôle diagnostique (DCL-SSV).'
        : (lang === 'en' ? 'The raised scores on the DISYPS-III SSV (conduct) scales should be explored further in conversations with the parents and the school, through observation in several situations and with the diagnostic checklist (DCL-SSV).'
          : 'Die erhöhten Werte in den SSV-Skalen (Sozialverhalten) des DISYPS-III sollten im Gespräch mit Eltern und Schule, über Beobachtung in mehreren Situationen und mit der Diagnose-Checkliste (DCL-SSV) vertieft werden.'));
    }
    return h;
  }
  function warnung(d, fall) {
    var a = B.alter(fall.kind.geburtsdatum, d.datum || fall.bericht.datumVon), infs = aktiveInf(d), mods = aktiveMod(d);
    if (a && infs.indexOf('selbst') >= 0 && a.dezimal < 11) { return 'Der Selbstbeurteilungsbogen (SBB) ist für 11- bis 18-Jährige vorgesehen – das Kind ist ' + B.alterText(a, 'de') + ' alt.'; }
    if (a && a.dezimal >= 19) { return 'Das DISYPS-III ist für Kinder und Jugendliche bis 18 Jahre vorgesehen – die Person ist ' + B.alterText(a, 'de') + ' alt.'; }
    if (a && (a.dezimal < 3 || (a.dezimal < 4 && mods.indexOf('ssv') >= 0))) { return 'Die Fremdbeurteilungsbögen sind ab 4 Jahren vorgesehen (FBB-ADHS ab 3 Jahren) – das Kind ist ' + B.alterText(a, 'de') + ' alt.'; }
    if (d.eingabe === 'roh') {
      var falsch = [];
      infs.forEach(function (i) {
        SKALEN.forEach(function (sk) {
          if (mods.indexOf(sk.modul) < 0) { return; }
          var s = zahlAus(roh(d.summe, i, sk.id), 0, 120, true), n = zahlAus(roh(d.anzahl, i, sk.id), 1, 40, true);
          if (s != null && n != null && s > 3 * n) { falsch.push(sk.de + ' (' + kurzUi(d, i) + ')'); }
        });
      });
      if (falsch.length) { return 'Die Rohsumme ist größer als 3 × Anzahl der Items bei ' + falsch.join(', ') + ' – bitte prüfen.'; }
    }
    return '';
  }
  function fertig(d) {
    var a = auswerten(d);
    return a.infs.length > 0 && a.module.length > 0 && a.infs.every(function (i) { return a.module.every(function (m) { return a.je[i].zeilen.some(function (z) { return z.modul === m && z.nw != null; }); }); });
  }
  /* Übernahme aus der früheren Version: Stanine je Beurteiler aus dem Beurteiler-Speicher,
     sonst die Formularfelder des zuletzt gewählten Beurteilers (nie beides – die alte App
     übertrug Werte beim Beurteilerwechsel) */
  function ausAlt(alt) {
    var MAP = { ina: 'adhs_ua', hyp: 'adhs_hy', imp: 'adhs_im', adhs: 'adhs_ges', opp: 'ssv_opp', agg: 'ssv_dis', ssv: 'ssv_ges' };
    var RK = { parent: 'eltern', teacher: 'lehrer', self: 'selbst' };
    var d = neu(), gefunden = {};
    function nimm(inf, key, v) {
      var n = B.num(v);
      if (n == null || n < 1 || n > 9 || Math.round(n) !== n) { return; }
      d.nw[inf][MAP[key]] = String(n); gefunden[inf] = true;
    }
    var speicher = ((alt || {}).raters || {}).disyps || {};
    Object.keys(RK).forEach(function (rk) {
      var e = speicher[rk]; if (!e || !e.values) { return; }
      Object.keys(MAP).forEach(function (k) { var x = e.values[k]; if (x && x.v != null) { nimm(RK[rk], k, x.v); } });
    });
    if (!Object.keys(gefunden).length) {
      var f = (alt || {}).fields || {}, r = ((alt || {}).radios || {})['dis-resp'] || 'fbb-parent';
      var inf = { 'fbb-parent': 'eltern', 'fbb-teacher': 'lehrer', sbb: 'selbst' }[r] || 'eltern';
      Object.keys(MAP).forEach(function (k) { var v = f['dis-' + k]; if (v != null && v !== '') { nimm(inf, k, v); } });
    }
    var infs = INF.filter(function (i) { return gefunden[i]; });
    if (!infs.length) { return null; }
    d.informanten = infs;
    d.module = MODULE.map(function (m) { return m.id; }).filter(function (m) { return infs.some(function (i) { return Object.keys(d.nw[i]).some(function (k) { return k.indexOf(m + '_') === 0; }); }); });
    infs.forEach(function (i) { d.norm[i] = 'rep-st'; });
    d.uebernommen = true;
    return d;
  }

  KAT.registrieren({
    id: 'disyps', kurz: 'DISYPS-III', kurzUi: 'DISYPS-III', name: L(TITEL, TITEL, TITEL), gruppe: 'verhalten', alter: [4, 18],
    informantenText: 'Eltern, Lehrkraft/Erzieher·in (FBB), Selbst ab 11 (SBB)',
    hilfe: 'Eine Spalte je Beurteiler (Eltern und Lehrkraft/Erzieher·in: FBB, Selbst: SBB). Kennwerte (Mittelwert 0–3) direkt oder aus Rohsumme und Itemzahl; Normwerte (Stanine bzw. Prozentrang) aus dem Manual.',
    neu: neu, formular: formular, auswerten: auswerten, chip: chip, teilUpdate: teilUpdate, bericht: bericht, verfahrenZeile: verfahrenZeile,
    zusammenfassung: zusammenfassung, hinweise: hinweise, warnung: warnung, fertig: fertig, ausAlt: ausAlt,
    pruefen: ['Skalennamen FBB/SBB-ADHS: Unaufmerksamkeit, Hyperaktivität, Impulsivität, Hyperaktivität-Impulsivität, ADHS-Gesamt (Verlag: 20 Items zu 18 Symptomkriterien; Verteilung 9/7/4 aus DISYPS-II-Quellen) – am Auswertungsbogen bestätigen.',
      'Skalennamen FBB/SBB-SSV: „Oppositionell-aggressives Verhalten“ und „Dissozial-aggressives Verhalten“ sind die DISYPS-II-Namen (OPP 9, DISS 16 Items); DISYPS-III-Studien sprechen von OPP und CD – am Manual bestätigen.',
      'Funktionsbeeinträchtigung und Kompetenzen: laut Verlag erfassen alle Bögen Funktionsbeeinträchtigung/Belastung, einzelne zusätzlich Kompetenzen – welche Bögen welche Skalen haben und ob es dafür Normen gibt, am Manual prüfen.',
      'Einstufung der Kompetenzen gespiegelt (Stanine 1 sehr niedrig, 2 auffällig niedrig, 3 grenzwertig; PR ≤ 4 / ≤ 11 / ≤ 23) – am Manual bestätigen.',
      'Normen: laut Verlag repräsentative Normen nur für Eltern- und Selbsturteil (Stanine empfohlen), klinische Normen (Prozentrang) für Eltern-, Lehrer-, Erzieherurteil und Selbsturteil; Normtabellen nach Geschlecht und Altersgruppen (Sekundärquelle: 4–6, 7–10, 11–13, 14–17 J.) – bestätigen.',
      'Altersbereiche: FBB 4–18 Jahre (ADHS ab 3), SBB 11–18 Jahre (Verlagsangabe).',
      'Antwortstufen 0 „gar nicht“ bis 3 „besonders“ (Verlag); Zwischenstufen „ein wenig“/„weitgehend“ am Bogen bestätigen.',
      'FR/EN: Übersetzungen der Skalennamen in Klammern sind eigene Übersetzungen (kein offizielles FR/EN-DISYPS).',
      'Übernahme aus der alten Version: dort nur Stanine ohne Normstichprobe – auch für das Lehrerurteil übernommen und im Formular zur Prüfung markiert.']
  });
})();
