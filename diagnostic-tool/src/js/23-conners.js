/* =====================================================================
   Conners 3 – Conners Skalen zu Aufmerksamkeit und Verhalten – 3
   Deutsche Fassung: Lidzba, Christiansen & Drechsler (2013), Hogrefe;
   Original: Conners 3rd Edition (C. K. Conners, 2008).
   ---------------------------------------------------------------------
   - Eine Spalte je Bogen: Eltern, Lehrkraft (6–18 J.), Selbstbeurteilung
     (8–18 J.). Werte werden nie zwischen Beurteilern übertragen.
   - Form je Beurteiler: Langversion, Kurzversion, ADHS-Index,
     Global-Index (nur Eltern/Lehrkraft). Welche Teile eine Form hat,
     folgt dem Aufbau der Originalausgabe (siehe pruefen).
   - Eingegeben werden T-Werte (optional PR) vom Auswertebogen; das Tool
     rechnet keine Normwerte und keinen PR aus der Normalverteilung.
   - Symptomskalen: Auswertung nach DSM-IV-TR (Erstausgabe) oder DSM-5
     (DSM-5-Update-Heft). Die ICD-10-Symptomskalen der deutschen Fassung
     werden bewusst nicht erfasst – der Bericht enthält keine ICD-Bezüge.
   - Validitätsskalen: Rohwerte + Bewertung laut Manual durch die
     Fachperson (keine Grenzwerte im Tool).
   - Screener-Items (Angst, Depression) und kritische Items einzeln mit
     Itemnummer und Antwort – für JEDEN Beurteiler, auch im Selbstbericht.
     Kritische Items (und als sicherheitsrelevant markierte Screener-Items)
     erscheinen im Hinweis zur Sicherheit.
   Belegt (Hogrefe/Testzentrale, Stand 09/2026): Titel, Formen Lang-/Kurz-
   version, ADHS-Index (Eltern, Lehrer, Selbst), Global-Index (Eltern,
   Lehrer), Alter 6–18 bzw. Selbstbeurteilung 8–18, alters- und geschlechts-
   spezifische Normen (Eltern N = 919, Lehrer N = 730, Selbst N = 770),
   Symptomskalen DSM-IV-TR/ICD-10 bzw. DSM-5/ICD-10 (Update-Heft),
   Validitätsskalen Positiver Eindruck, Negativer Eindruck, Inkonsistenz-Index.
   Alles Weitere steht unter pruefen.
   ===================================================================== */
(function () {
  var L = KAT.L;
  var INF = ['eltern', 'lehrer', 'selbst'];
  var INF_UI = { eltern: 'Eltern', lehrer: 'Lehrkraft', selbst: 'Selbst' };
  var INF_WAHL = { eltern: 'Eltern (6–18 J.)', lehrer: 'Lehrkraft (6–18 J.)', selbst: 'Selbstbeurteilung (8–18 J.)' };
  var T_MIN = 20, T_MAX = 100;

  /* Formen und ihre Teile (Aufbau wie in der Originalausgabe – pruefen) */
  var FORMEN = {
    lang: { ui: 'Langversion', name: L('Langversion', 'version longue', 'long version') },
    kurz: { ui: 'Kurzversion', name: L('Kurzversion', 'version courte', 'short version') },
    ai: { ui: 'ADHS-Index (Indexbogen)', name: L('ADHS-Index', 'indice TDAH', 'ADHD Index') },
    gi: { ui: 'Global-Index (Indexbogen)', name: L('Global-Index', 'indice global', 'Global Index') }
  };
  var TEILE = { inhalt: ['lang', 'kurz'], val: ['lang', 'kurz'], ii: ['lang'], dsm: ['lang'], items: ['lang'], beein: ['lang'] };
  function hat(form, teil) { return (TEILE[teil] || []).indexOf(form) >= 0; }

  /* Inhaltsskalen: Reihenfolge wie auf dem Profilbogen */
  var ALLE = ['eltern', 'lehrer', 'selbst'], PL = ['eltern', 'lehrer'];
  var INHALT = [
    { id: 'ua', kurz: 'UA', inf: ALLE, formen: ['lang', 'kurz'], name: L('Unaufmerksamkeit', 'Inattention', 'Inattention') },
    { id: 'hi', kurz: 'HI', inf: ALLE, formen: ['lang', 'kurz'], name: L('Hyperaktivität/Impulsivität', 'Hyperactivité/impulsivité', 'Hyperactivity/Impulsivity') },
    { id: 'lpef', kurz: 'LP/EF', inf: ['lehrer'], formen: ['lang'], name: L('Lernprobleme/Exekutive Funktionen', 'Problèmes d’apprentissage/fonctions exécutives', 'Learning Problems/Executive Functioning'), hinweis: 'nur Lehrerfragebogen, Langversion' },
    { id: 'lp', kurz: 'LP', inf: ALLE, formen: ['lang', 'kurz'], name: L('Lernprobleme', 'Problèmes d’apprentissage', 'Learning Problems'), hinweis: 'Lehrkraft (Langversion): Unterskala von LP/EF' },
    { id: 'ef', kurz: 'EF', inf: PL, formen: ['lang', 'kurz'], name: L('Exekutive Funktionen', 'Fonctions exécutives', 'Executive Functioning'), hinweis: 'Eltern, Lehrkraft (Langversion: Unterskala von LP/EF)' },
    { id: 'at', kurz: 'AT', inf: PL, formen: ['lang', 'kurz'], name: L('Aggressivität/Trotz', 'Agressivité/opposition', 'Defiance/Aggression'), hinweis: 'Eltern, Lehrkraft' },
    { id: 'ag', kurz: 'AG', inf: ['selbst'], formen: ['lang', 'kurz'], name: L('Aggression', 'Agressivité', 'Aggression'), hinweis: 'nur Selbstbeurteilung' },
    { id: 'bg', kurz: 'BG', inf: PL, formen: ['lang', 'kurz'], name: L('Beziehungen zu Gleichaltrigen', 'Relations avec les pairs', 'Peer Relations'), hinweis: 'Eltern, Lehrkraft' },
    { id: 'fb', kurz: 'FB', inf: ['selbst'], formen: ['lang', 'kurz'], name: L('Familiäre Beziehungen', 'Relations familiales', 'Family Relations'), hinweis: 'nur Selbstbeurteilung' }
  ];
  /* Symptomskalen (nur Langversion); max = Zahl der Symptome im DSM */
  var DSM = [
    { id: 'dua', kurz: 'DSM-UA', inf: ALLE, formen: ['lang'], max: 9, name: L('ADHS – Unaufmerksamkeit', 'TDAH – inattention', 'ADHD Inattentive') },
    { id: 'dhi', kurz: 'DSM-HI', inf: ALLE, formen: ['lang'], max: 9, name: L('ADHS – Hyperaktivität/Impulsivität', 'TDAH – hyperactivité/impulsivité', 'ADHD Hyperactive-Impulsive') },
    { id: 'dsv', kurz: 'DSM-SV', inf: ALLE, formen: ['lang'], max: 15, name: L('Störung des Sozialverhaltens', 'Trouble des conduites', 'Conduct Disorder') },
    { id: 'dot', kurz: 'DSM-OT', inf: ALLE, formen: ['lang'], max: 8, name: L('Störung mit oppositionellem Trotzverhalten', 'Trouble oppositionnel avec provocation', 'Oppositional Defiant Disorder') }
  ];
  /* Indizes */
  var IDX = [
    { id: 'ai', kurz: 'C3-AI', inf: ALLE, formen: ['lang', 'ai'], name: L('ADHS-Index', 'Indice TDAH', 'ADHD Index') },
    { id: 'gi', kurz: 'C3-GI', inf: PL, formen: ['lang', 'gi'], name: L('Global-Index – Gesamtwert', 'Indice global – score total', 'Global Index – Total'), hinweis: 'nur Eltern, Lehrkraft' },
    { id: 'gira', kurz: '', inf: PL, formen: ['lang', 'gi'], name: L('Global-Index – Rastlos-Impulsiv', 'Indice global – agitation-impulsivité', 'Global Index – Restless-Impulsive'), hinweis: 'Unterskala des Global-Index' },
    { id: 'giel', kurz: '', inf: PL, formen: ['lang', 'gi'], name: L('Global-Index – Emotional-Labil', 'Indice global – labilité émotionnelle', 'Global Index – Emotional Lability'), hinweis: 'Unterskala des Global-Index' }
  ];
  var SKALEN = INHALT.concat(DSM, IDX);
  function skala(id) { return SKALEN.filter(function (s) { return s.id === id; })[0] || null; }
  function erlaubt(s, inf, form) { return s.inf.indexOf(inf) >= 0 && s.formen.indexOf(form) >= 0; }

  var VAL = {
    pe: { name: L('Positiver Eindruck', 'Impression positive', 'Positive Impression'), subj: L('die Skala Positiver Eindruck', 'l’échelle Impression positive', 'the Positive Impression scale'),
      was: L('ein möglicherweise übermäßig positives Antwortverhalten', 'un style de réponse possiblement trop positif', 'a possibly overly positive response style') },
    ne: { name: L('Negativer Eindruck', 'Impression négative', 'Negative Impression'), subj: L('die Skala Negativer Eindruck', 'l’échelle Impression négative', 'the Negative Impression scale'),
      was: L('ein möglicherweise übermäßig negatives Antwortverhalten', 'un style de réponse possiblement trop négatif', 'a possibly overly negative response style') },
    ii: { name: L('Inkonsistenz-Index', 'Indice d’incohérence', 'Inconsistency Index'), subj: L('der Inkonsistenz-Index', 'l’indice d’incohérence', 'the Inconsistency Index'),
      was: L('möglicherweise inkonsistentes Antworten', 'des réponses possiblement incohérentes', 'possibly inconsistent responding') }
  };
  var ITEM_ART = [['angst', 'Screener Angst'], ['depression', 'Screener Depression'], ['kritisch', 'Kritisches Item']];
  var SCREENER = { angst: L('Angst', 'anxiété', 'Anxiety'), depression: L('Depression', 'dépression', 'Depression') };
  var BEEIN = [
    { id: 'schule', inf: ALLE, name: L('Schule/Lernen', 'travail scolaire/résultats', 'Schoolwork/Grades') },
    { id: 'freunde', inf: ALLE, name: L('Freundschaften/Beziehungen', 'amitiés/relations', 'Friendships/Relationships') },
    { id: 'familie', inf: ['eltern', 'selbst'], name: L('Familie', 'vie familiale', 'Home Life') }
  ];

  /* T-Wert-Bereiche: Grenzen der Originalausgabe; deutsche Namen am Manual prüfen */
  KAT.bandDefinieren('conners-t', { art: 'problem',
    pruefen: 'Conners 3: Grenzen wie in der Originalausgabe (≥ 70 Very Elevated, 65–69 Elevated, 60–64 High Average, 40–59 Average, < 40 Low). Deutsche Bezeichnungen hier übersetzt (sehr erhöht, erhöht, leicht erhöht, durchschnittlich, niedrig; frühere Version: „stark erhöht“ für ≥ 70) – am deutschen Manual bestätigen; FR übersetzt (keine französische Fassung belegt).',
    stufen: [
      { bis: 39, rang: 0, name: L('niedrig', 'bas', 'low') },
      { bis: 59, rang: 0, name: L('durchschnittlich', 'dans la moyenne', 'average') },
      { bis: 64, rang: 1, name: L('leicht erhöht', 'légèrement élevé', 'high average') },
      { bis: 69, rang: 2, name: L('erhöht', 'élevé', 'elevated') },
      { bis: Infinity, rang: 3, name: L('sehr erhöht', 'très élevé', 'very elevated') }] });
  /* Bereiche im Fließtext (FR: „zone“ ist weiblich, deshalb eigene Wendungen) */
  var BEREICH_TEXT = {
    4: { de: 'im Bereich „sehr erhöht“ (T\u00A0≥\u00A070)', fr: 'dans la zone très élevée (T\u00A0≥\u00A070)', en: 'in the very elevated range (T\u00A0≥\u00A070)' },
    3: { de: 'im Bereich „erhöht“ (T\u00A065–69)', fr: 'dans la zone élevée (T\u00A0de 65 à 69)', en: 'in the elevated range (T\u00A065–69)' },
    2: { de: 'im Bereich „leicht erhöht“ (T\u00A060–64)', fr: 'dans la zone légèrement élevée (T\u00A0de 60 à 64)', en: 'in the high average range (T\u00A060–64)' }
  };

  /* ---------------- Daten ---------------- */
  function leer3() { return { eltern: {}, lehrer: {}, selbst: {} }; }
  function neu() {
    var werte = {};
    INF.forEach(function (i) { werte[i] = { t: {}, pr: {}, sz: {}, w: {} }; });
    return { informanten: ['eltern'], form: { eltern: 'lang', lehrer: 'lang', selbst: 'lang' }, datum: '', dsm: '', mitPr: false,
      werte: werte, val: leer3(), items: leer3(), beein: leer3(), altHinweis: '', altGeprueft: false };
  }
  function aktive(d) { var l = d.informanten || []; return INF.filter(function (i) { return l.indexOf(i) >= 0; }); }
  function formVon(d, inf) {
    var f = (d.form || {})[inf];
    if (!FORMEN[f] || (f === 'gi' && inf === 'selbst')) { return 'lang'; }
    return f;
  }
  function werteVon(d, inf) {
    var w = (d.werte || {})[inf] || {};
    return { t: w.t || {}, pr: w.pr || {}, sz: w.sz || {}, w: w.w || {} };
  }
  function zahl(v, min, max, ganz) {
    var n = B.num(v);
    return n != null && E.inBereich(n, { min: min, max: max, ganz: ganz }) ? n : null;
  }
  function belegt(v) { return v != null && String(v).trim() !== ''; }
  /* Items eines Beurteilers in Eingabereihenfolge; ohne gültige Nummer nur, wenn Antwort oder Stichwort da ist (nr = null) */
  function itemsAus(d, inf) {
    var roh = (d.items || {})[inf] || {};
    return Object.keys(roh).map(Number).filter(function (k) { return !isNaN(k); }).sort(function (a, b) { return a - b; }).map(function (k) { return roh[k]; })
      .filter(function (it) { return it && it.art && (zahl(it.nr, 1, 120, true) != null || zahl(it.wert, 0, 3, true) != null || String(it.text || '').trim()); })
      .map(function (it) { return { art: it.art, nr: zahl(it.nr, 1, 120, true), wert: zahl(it.wert, 0, 3, true), text: String(it.text || '').trim(), sich: it.sich === true }; });
  }
  /* als angegeben gilt ein Item mit Antwort 1–3 oder ohne eingetragene Antwort („markiert“) */
  function gemeldet(it) { return it.wert == null || it.wert >= 1; }

  function auswerten(d) {
    var je = {};
    INF.forEach(function (inf) {
      var form = formVon(d, inf), w = werteVon(d, inf);
      function zeile(s) {
        var t = zahl(w.t[s.id], T_MIN, T_MAX, true);
        var z = { id: s.id, name: s.name, kurz: s.kurz, wert: t, pr: d.mitPr ? zahl(w.pr[s.id], 0.1, 99.9, false) : null, metrik: 'T',
          band: t == null ? null : KAT.einstufen('conners-t', t) };
        if (s.max) { z.sz = zahl(w.sz[s.id], 0, s.max, true); z.szMax = s.max; }
        if (s.id === 'ai') { z.prob = zahl(w.w.ai, 0, 100, false); }
        return z;
      }
      function mitWert(z) { return z.wert != null || z.sz != null || z.prob != null; }
      function liste(def) { return def.filter(function (s) { return erlaubt(s, inf, form); }).map(zeile).filter(mitWert); }
      var v = (d.val || {})[inf] || {}, val = null;
      if (hat(form, 'val')) {
        val = { pe: zahl(v.pe, 0, 18, true), ne: zahl(v.ne, 0, 18, true), peU: v.peU || '', neU: v.neU || '' };
        if (hat(form, 'ii')) { val.ii = zahl(v.ii, 0, 30, true); val.iid = zahl(v.iid, 0, 10, true); val.iiU = v.iiU || ''; }
      }
      var be = (d.beein || {})[inf] || {};
      je[inf] = { form: form, inhalt: liste(INHALT), dsm: liste(DSM), idx: liste(IDX), val: val,
        items: hat(form, 'items') ? itemsAus(d, inf) : [],
        beein: hat(form, 'beein') ? BEEIN.filter(function (b) { return b.inf.indexOf(inf) >= 0 && zahl(be[b.id], 0, 3, true) != null; }).map(function (b) { return { id: b.id, name: b.name, wert: zahl(be[b.id], 0, 3, true) }; }) : [] };
    });
    return { je: je };
  }
  function valBelegt(v) {
    if (!v) { return false; }
    return ['pe', 'ne', 'ii', 'iid'].some(function (k) { return v[k] != null; }) || ['peU', 'neU', 'iiU'].some(function (k) { return !!v[k]; });
  }
  function hatDaten(j) {
    return !!j && !!(j.inhalt.length || j.dsm.length || j.idx.length || valBelegt(j.val) || j.items.some(gemeldet) || j.beein.length);
  }
  function chip(pfad, n) { return /\.werte\.\w+\.t\.\w+$/.test(pfad) ? KAT.einstufen('conners-t', n) : null; }

  /* ---------------- Formular ---------------- */
  function formOptionen(inf) {
    return ['lang', 'kurz', 'ai', 'gi'].filter(function (f) { return !(f === 'gi' && inf === 'selbst'); }).map(function (f) { return [f, FORMEN[f].ui]; });
  }
  function zeilenFuer(d, def, infs, spaltenKey, filter) {
    return def.filter(function (s) { return (!filter || filter(s)) && infs.some(function (inf) { return erlaubt(s, inf, formVon(d, inf)); }); }).map(function (s) {
      return { id: s.id, name: B.t(s.name, 'de') + (s.kurz ? ' (' + s.kurz + ')' : ''), hinweis: s.hinweis || '',
        nurSpalten: infs.filter(function (inf) { return erlaubt(s, inf, formVon(d, inf)); }).map(function (inf) { return inf + '.' + spaltenKey; }) };
    });
  }
  /* T-Werte: eine Spalte je Beurteiler, Einstufung sofort als Chip */
  function tRaster(d, def, infs) {
    return E.raster({ basis: 'tests.conners.werte', kopfSkala: 'Skala', gestapelt: infs.length > 1,
      spalten: infs.map(function (inf) { return { id: inf + '.t', label: INF_UI[inf] + ' · T', min: T_MIN, max: T_MAX, ganz: true }; }),
      zeilen: zeilenFuer(d, def, infs, 't'),
      einstufen: function (zid, sid, n) { return KAT.einstufen('conners-t', n); } });
  }
  /* Zusatzwerte ohne Einstufung (PR, Symptomzählung, Wahrscheinlichkeitswert) – Grenzen je Zeile */
  function zusatzRaster(d, def, infs, key, kopf, grenzen, filter) {
    var zeilen = zeilenFuer(d, def, infs, key, filter).map(function (z) { var g = grenzen(skala(z.id)); z.min = g[0]; z.max = g[1]; z.ganz = g[2]; z.hinweis = ''; return z; });
    return E.raster({ basis: 'tests.conners.werte', kopfSkala: kopf,
      spalten: infs.map(function (inf) { return { id: inf + '.' + key, label: INF_UI[inf], ohneChip: true }; }),
      zeilen: zeilen, einstufen: function () { return null; } });
  }
  function prRaster(d, def, infs) {
    return d.mitPr ? '<h3 style="margin-top:16px">Prozentränge (laut Manual)</h3>' + zusatzRaster(d, def, infs, 'pr', 'Skala', function () { return [0.1, 99.9, false]; }) : '';
  }
  function auswahlRoh(p, optionen, wert, leer, neu) {
    var w = wert == null ? '' : String(wert);
    return '<select class="eingabe" style="width:auto;text-align:left" data-pfad="' + B.esc(p) + '"' + (neu ? ' data-neu="1"' : '') + '>' +
      (leer != null ? '<option value="">' + B.esc(leer) + '</option>' : '') +
      optionen.map(function (o) { return '<option value="' + B.esc(o[0]) + '"' + (String(o[0]) === w ? ' selected' : '') + '>' + B.esc(o[1]) + '</option>'; }).join('') + '</select>';
  }
  function zahlRoh(p, wert, min, max, label) {
    var v = wert == null ? '' : String(wert), ok = v === '' || zahl(v, min, max, true) != null;
    return '<input class="eingabe' + (ok ? '' : ' fehler') + '" data-pfad="' + B.esc(p) + '" value="' + B.esc(v) + '" inputmode="numeric" autocomplete="off" data-min="' + min + '" data-max="' + max + '" data-ganz="1" aria-label="' + B.esc(label) + '">';
  }
  var BEW = {
    pe: [['ok', 'unauffällig'], ['hinweis', 'auffällig (zu positiv?)']],
    ne: [['ok', 'unauffällig'], ['hinweis', 'auffällig (zu negativ?)']],
    ii: [['ok', 'unauffällig'], ['hinweis', 'auffällig (inkonsistent?)']]
  };
  var ANTWORT_0_3 = [['0', '0'], ['1', '1'], ['2', '2'], ['3', '3']];
  /* Antwortstil eines Bogens: Rohwert (+ Differenzen beim Inkonsistenz-Index) und Bewertung laut Manual */
  function valTabelle(d, inf) {
    var v = (d.val || {})[inf] || {}, p = 'tests.conners.val.' + inf + '.', lang = hat(formVon(d, inf), 'ii');
    function zeile(k, name, max) {
      return '<tr><td class="skala"><b>' + B.esc(name) + '</b></td><td>' + zahlRoh(p + k, v[k], 0, max, name + ' – Rohwert') + '</td>' +
        (lang ? '<td>' + (k === 'ii' ? zahlRoh(p + 'iid', v.iid, 0, 10, 'Inkonsistenz-Index – Differenzen ≥ 2') : '<span class="leise">–</span>') + '</td>' : '') +
        '<td>' + auswahlRoh(p + k + 'U', BEW[k], v[k + 'U'], '– nicht bewertet –') + '</td></tr>';
    }
    return '<div class="tabelle-scroll"><table class="wraster"><thead><tr><th>Validitätsskala</th><th>Rohwert</th>' + (lang ? '<th>Differenzen ≥ 2</th>' : '') + '<th>Bewertung laut Manual</th></tr></thead><tbody>' +
      zeile('pe', 'Positiver Eindruck', 18) + zeile('ne', 'Negativer Eindruck', 18) + (lang ? zeile('ii', 'Inkonsistenz-Index', 30) : '') + '</tbody></table></div>';
  }
  function itemTabelle(d, inf) {
    var roh = (d.items || {})[inf] || {};
    var benutzt = Object.keys(roh).map(Number).filter(function (k) { return !isNaN(k) && roh[k] && roh[k].art; });
    var n = Math.min(30, benutzt.length ? Math.max.apply(null, benutzt) + 2 : 1);
    var h = '<div class="tabelle-scroll"><table class="wraster"><thead><tr><th>Art</th><th>Item-Nr.</th><th>Antwort</th><th>Stichwort (optional)</th><th title="Selbstverletzung oder Suizidgedanken – erscheint im Hinweis zur Sicherheit">Suizid/Selbst&shy;verletzung</th></tr></thead><tbody>';
    for (var i = 0; i < n; i++) {
      var it = roh[i] || {}, p = 'tests.conners.items.' + inf + '.' + i + '.';
      h += '<tr><td>' + auswahlRoh(p + 'art', ITEM_ART, it.art, '– Art wählen –', true) + '</td>';
      if (!it.art) { h += '<td colspan="4" class="leise">' + (i === 0 ? 'Art wählen, um ein markiertes Item einzutragen.' : 'weiteres Item') + '</td></tr>'; continue; }
      h += '<td>' + zahlRoh(p + 'nr', it.nr, 1, 120, 'Itemnummer') + '</td>' +
        '<td>' + auswahlRoh(p + 'wert', ANTWORT_0_3, it.wert, '–') + '</td>' +
        '<td><input class="eingabe" style="width:100%;min-width:150px;text-align:left" data-pfad="' + B.esc(p + 'text') + '" value="' + B.esc(it.text || '') + '" autocomplete="off" aria-label="Stichwort oder Wortlaut"></td>' +
        '<td>' + (it.art === 'kritisch' ? '<small class="leise">immer gemeldet</small>'
          : '<label class="haken"><input type="checkbox" data-pfad="' + B.esc(p + 'sich') + '"' + (it.sich === true ? ' checked' : '') + ' aria-label="betrifft Selbstverletzung oder Suizidgedanken"><span>ja</span></label>') + '</td></tr>';
    }
    return h + '</tbody></table></div>';
  }

  function formular(d) {
    var infs = aktive(d);
    var mitLang = infs.filter(function (i) { return formVon(d, i) === 'lang'; });
    var h = '';
    if (d.altHinweis) {
      h += E.karte('<h2>Übernahme aus der früheren Version</h2><p class="klein">' + B.esc(d.altHinweis) + '</p>' +
        E.haken('tests.conners.altGeprueft', 'Werte und Items mit den Auswertebögen abgeglichen', 'Danach verschwindet der Hinweis oben auf dieser Seite.', true));
    }
    h += E.karte('<h2>Durchführung</h2><div class="raster">' + E.feld('tests.conners.datum', 'Datum', { typ: 'date' }) + '</div>' +
      '<div style="margin-top:12px"><span class="feld"><span>Wer hat einen Bogen ausgefüllt?</span></span>' + E.wahlen('tests.conners.informanten', INF.map(function (i) { return [i, INF_WAHL[i]]; }), true, true) + '</div>' +
      (infs.length ? '<div class="raster" style="margin-top:12px">' + infs.map(function (inf) {
        return E.auswahl('tests.conners.form.' + inf, 'Form – ' + INF_UI[inf], formOptionen(inf), { neu: true });
      }).join('') + '</div>' : '') +
      (mitLang.length ? '<div class="raster" style="margin-top:12px">' + E.auswahl('tests.conners.dsm', 'Symptomskalen ausgewertet nach', [['dsm5', 'DSM-5 (Update-Heft)'], ['dsm4', 'DSM-IV-TR (Erstausgabe 2013)']], { leer: '– bitte wählen –', neu: true, hilfe: 'Steht auf dem Auswertebogen („nach DSM-5/ICD-10“) bzw. im DSM-5-Update-Heft.' }) + '</div>' : '') +
      '<div style="margin-top:12px">' + E.haken('tests.conners.mitPr', 'Prozentränge (PR) aus dem Manual zusätzlich eingeben', 'Nur wenn der Auswertebogen sie ausweist – das Tool berechnet keine PR.', true) + '</div>');
    if (!infs.length) { return h + E.hinweis('Bitte mindestens einen Bogen (Beurteiler) wählen.', 'info'); }

    /* Antwortstil */
    var mitVal = infs.filter(function (i) { return hat(formVon(d, i), 'val'); });
    if (mitVal.length) {
      h += E.karte('<h2>Antwortstil (Validitätsskalen)</h2><p class="klein">Rohwerte und die Bewertung <b>laut Manual/Auswertebogen</b> eintragen: „auffällig“ = Hinweis auf ein übermäßig positives bzw. negatives oder auf inkonsistentes Antworten. Das Tool wendet selbst keine Grenzwerte an; im Bericht erscheint die gewählte Bewertung. Der Inkonsistenz-Index gehört nur zu den Langversionen.</p>' +
        mitVal.map(function (inf) { return '<h3 style="margin-top:14px">' + B.esc(INF_UI[inf] + ' – ' + FORMEN[formVon(d, inf)].ui) + '</h3>' + valTabelle(d, inf); }).join(''));
    }
    /* Inhaltsskalen */
    var mitInhalt = infs.filter(function (i) { return hat(formVon(d, i), 'inhalt'); });
    if (mitInhalt.length) {
      h += E.karte('<h2>Inhaltsskalen (T-Werte)</h2><p class="klein">T-Werte vom Profil-/Auswertebogen (' + T_MIN + '–' + T_MAX + '). „–“ = Skala gehört nicht zu dieser Form. Einstufung: &lt; 40 niedrig · 40–59 durchschnittlich · 60–64 leicht erhöht · 65–69 erhöht · ≥ 70 sehr erhöht.</p>' +
        tRaster(d, INHALT, mitInhalt) + prRaster(d, INHALT, mitInhalt));
    }
    /* Symptomskalen */
    if (mitLang.length) {
      var dsmName = d.dsm === 'dsm5' ? ' nach DSM-5' : (d.dsm === 'dsm4' ? ' nach DSM-IV-TR' : '');
      h += E.karte('<h2>Symptomskalen' + dsmName + ' (Langversion)</h2><p class="klein">T-Werte und – falls auf dem Bogen ausgezählt – die Zahl der als zutreffend gewerteten Symptome (Symptomzählung). Die ICD-10-Symptomskalen werden nicht erfasst (der Bericht enthält keine ICD-Bezüge).</p>' +
        tRaster(d, DSM, mitLang) + prRaster(d, DSM, mitLang) +
        '<h3 style="margin-top:16px">Symptomzählung (optional)</h3>' + zusatzRaster(d, DSM, mitLang, 'sz', 'Skala', function (s) { return [0, s.max, true]; }));
    }
    /* Indizes */
    var mitIdx = infs.filter(function (i) { return IDX.some(function (s) { return erlaubt(s, i, formVon(d, i)); }); });
    if (mitIdx.length) {
      h += E.karte('<h2>Indizes (T-Werte)</h2><p class="klein">ADHS-Index (alle Bögen) und Global-Index mit seinen Unterskalen (nur Eltern und Lehrkraft).</p>' +
        tRaster(d, IDX, mitIdx) + prRaster(d, IDX, mitIdx) +
        '<h3 style="margin-top:16px">ADHS-Index: Wahrscheinlichkeitswert in % (optional)</h3><p class="klein">Nur eintragen, wenn der Auswertebogen bzw. das Manual ihn ausweist – das Tool berechnet ihn nicht.</p>' +
        zusatzRaster(d, IDX, mitIdx, 'w', 'Index', function () { return [0, 100, false]; }, function (s) { return s.id === 'ai'; }));
    }
    /* Screener-Items und kritische Items */
    if (mitLang.length) {
      h += E.karte('<h2>Screener-Items und kritische Items (Langversion)</h2><p class="klein">Für jeden Bogen einzeln – auch für die Selbstbeurteilung. Eintragen, was auf dem Auswertebogen markiert ist: Screener-Items Angst bzw. Depression und kritische Items (schwere Störung des Sozialverhaltens) mit Itemnummer, Antwort (0–3, wie angekreuzt) und bei Bedarf einem Stichwort (erscheint so im Bericht). Antwort 0 erscheint nicht im Bericht. Kritische Items stehen immer im Hinweis zur Sicherheit, Screener-Items nur mit Haken in der Spalte „Suizid/Selbstverletzung“ (wenn das Item Selbstverletzung oder Suizidgedanken betrifft).</p>' +
        mitLang.map(function (inf) { return '<h3 style="margin-top:14px">' + B.esc(INF_UI[inf]) + '</h3>' + itemTabelle(d, inf); }).join(''));
      h += E.karte('<h2>Beeinträchtigung (optional)</h2><p class="klein">Antworten auf die Fragen zur Beeinträchtigung (0–3, wie angekreuzt). Der Lehrerfragebogen fragt nicht nach der Familie.</p>' +
        mitLang.map(function (inf) {
          return '<h3 style="margin-top:14px">' + B.esc(INF_UI[inf]) + '</h3><div class="raster">' + BEEIN.filter(function (b) { return b.inf.indexOf(inf) >= 0; }).map(function (b) {
            return E.auswahl('tests.conners.beein.' + inf + '.' + b.id, B.t(b.name, 'de'), ANTWORT_0_3, { leer: '–' });
          }).join('') + '</div>';
        }).join(''));
    }
    return h;
  }

  /* ---------------- Bericht: Bausteine ---------------- */
  var ZWECK = {
    de: 'Die Conners 3 (Conners Skalen zu Aufmerksamkeit und Verhalten – 3) sind ein Fragebogenverfahren zu Aufmerksamkeit, Hyperaktivität/Impulsivität und damit häufig verbundenen Schwierigkeiten bei Kindern und Jugendlichen von 6 bis 18 Jahren. Es gibt Fragebögen für Eltern und Lehrkräfte sowie ab 8 Jahren einen Selbstbeurteilungsbogen, jeweils als Lang- oder Kurzversion, dazu kurze Indexbögen (ADHS-Index, Global-Index). Die Inhaltsskalen beschreiben Unaufmerksamkeit, Hyperaktivität/Impulsivität, Lernprobleme, exekutive Funktionen, aggressives und oppositionelles Verhalten sowie Beziehungen zu Gleichaltrigen bzw. in der Familie. Die Ergebnisse sind T-Werte (Mittelwert 50, Standardabweichung 10); höhere Werte bedeuten, dass mehr Schwierigkeiten angegeben wurden als in der Normstichprobe üblich.',
    fr: 'Le Conners 3 (Conners 3rd Edition) est un ensemble de questionnaires portant sur l’attention, l’hyperactivité/impulsivité et les difficultés qui y sont fréquemment associées chez les enfants et adolescents de 6 à 18 ans. Il comprend des questionnaires pour les parents et les enseignant·e·s ainsi qu’un autoquestionnaire à partir de 8 ans, chacun en version longue ou courte, et de brefs questionnaires d’indice (indice TDAH, indice global). Les échelles de contenu décrivent l’inattention, l’hyperactivité/impulsivité, les problèmes d’apprentissage, les fonctions exécutives, les comportements agressifs et d’opposition ainsi que les relations avec les pairs ou au sein de la famille. Les résultats sont exprimés en notes T (moyenne 50, écart type 10) ; une note plus élevée signifie que davantage de difficultés ont été rapportées que dans l’échantillon de référence.',
    en: 'The Conners 3 (Conners 3rd Edition) is a set of rating scales covering attention, hyperactivity/impulsivity and frequently associated difficulties in children and adolescents aged 6 to 18. There are forms for parents and teachers and, from age 8, a self-report form, each available as a long or short version, as well as brief index forms (ADHD Index, Global Index). The content scales describe inattention, hyperactivity/impulsivity, learning problems, executive functioning, aggressive and oppositional behaviour, and peer or family relations. Results are T-scores (mean 50, standard deviation 10); higher scores mean that more difficulties were reported than is typical in the normative sample.'
  };
  var BOGEN = {
    de: { eltern: 'Elternfragebogen', lehrer: 'Lehrerfragebogen', selbst: 'Selbstbeurteilungsbogen' },
    fr: { eltern: 'questionnaire parents', lehrer: 'questionnaire enseignant·e', selbst: 'autoquestionnaire' },
    en: { eltern: 'parent form', lehrer: 'teacher form', selbst: 'self-report form' }
  };
  function bogen(lang, inf, form, artikel) {
    var s = BOGEN[lang][inf] + ' (' + B.t(FORMEN[form].name, lang) + ')';
    if (!artikel) { return s; }
    if (lang === 'fr') { return (inf === 'selbst' ? 'l’' : 'le ') + s; }
    return (lang === 'en' ? 'the ' : 'der ') + s;
  }
  function prText(lang) { return lang === 'fr' ? 'rang centile' : 'PR'; }
  function symText(lang, n, max) { return lang === 'fr' ? 'décompte des symptômes ' + n + ' sur ' + max : (lang === 'en' ? 'symptom count ' + n + ' of ' + max : 'Symptomzählung ' + n + ' von ' + max); }
  function probText(lang) { return lang === 'fr' ? 'valeur de probabilité selon le manuel' : (lang === 'en' ? 'probability score according to the manual' : 'Wahrscheinlichkeitswert laut Manual'); }
  /* „Symptomskalen (DSM-5)“ · „Échelles de symptômes (DSM-5)“ · „DSM-5 symptom scales“ – einzahl für den Tabellenkopf */
  function dsmTitel(lang, dsm, einzahl) {
    var v = dsm === 'dsm5' ? 'DSM-5' : (dsm === 'dsm4' ? 'DSM-IV-TR' : 'DSM');
    if (lang === 'fr') { return (einzahl ? 'Échelle' : 'Échelles') + ' de symptômes (' + v + ')'; }
    if (lang === 'en') { return v + (einzahl ? ' symptom scale' : ' symptom scales'); }
    return (einzahl ? 'Symptomskala' : 'Symptomskalen') + ' (' + v + ')';
  }
  /* „Unaufmerksamkeit (T-Wert 72; PR 99)“ */
  function nameWert(lang, z) { return B.t(z.name, lang) + TX.wertKlammer(z, lang, false); }
  /* „ADHS-Index (T-Wert 71; sehr erhöht; …)“ – für Symptomskalen und Indizes */
  function nameVoll(lang, z) {
    var k = [];
    if (z.wert != null) { k.push(TX.einheit('T', lang) + ' ' + z.wert); }
    if (z.pr != null) { k.push(prText(lang) + ' ' + B.zahl(z.pr, lang)); }
    if (z.band) { k.push(B.t(z.band.name, lang)); }
    if (z.sz != null) { k.push(symText(lang, z.sz, z.szMax)); }
    if (z.prob != null) { k.push(probText(lang) + ' ' + B.prozent(z.prob, lang)); }
    return B.t(z.name, lang) + (k.length ? ' (' + k.join('; ') + ')' : '');
  }

  /* Inhaltsskalen eines Beurteilers nach T-Wert-Bereich.
     bei = „Im Elternurteil“ …; beiGenannt: der Beurteiler steht schon im Satz davor (Antwortstil) */
  function inhaltSaetze(lang, bei, zeilen, beiGenannt) {
    var z = zeilen.filter(function (x) { return x.band; });
    if (!z.length) { return ''; }
    var s = [], erster = true;
    [4, 3, 2].forEach(function (i) {
      var g = z.filter(function (x) { return x.band.index === i; });
      if (!g.length) { return; }
      var n = g.length, namen = B.liste(g.map(function (x) { return nameWert(lang, x); }), lang), ber = BEREICH_TEXT[i][lang];
      var mitBei = erster && !beiGenannt;
      if (lang === 'fr') {
        s.push((mitBei ? bei + ', ' : '') + (n === 1 ? 'l’échelle ' : 'les échelles ') + namen + (n === 1 ? ' se situe ' : ' se situent ') + ber);
      } else if (lang === 'en') {
        s.push((mitBei ? bei + ', ' : '') + (n === 1 ? 'the scale ' : 'the scales ') + namen + (n === 1 ? ' falls ' : ' fall ') + ber);
      } else if (mitBei) {
        s.push(bei + (n === 1 ? ' liegt die Skala ' : ' liegen die Skalen ') + namen + ' ' + ber);
      } else if (erster) {
        s.push((n === 1 ? 'Die Skala ' : 'Die Skalen ') + namen + (n === 1 ? ' liegt ' : ' liegen ') + ber);
      } else {
        s.push(B.ersteGross(ber) + (n === 1 ? ' liegt die Skala ' : ' liegen die Skalen ') + namen);
      }
      erster = false;
    });
    var rest = z.filter(function (x) { return x.band.index <= 1; });
    var tief = rest.some(function (x) { return x.band.index === 0; });
    function eine(x, mitBei) {
      var niedrig = x.band.index === 0;
      if (lang === 'fr') { return (mitBei ? bei + ', l’échelle ' : 'L’échelle ') + nameWert(lang, x) + ' se situe ' + (niedrig ? 'en dessous de la moyenne (T\u00A0<\u00A040)' : 'dans la moyenne'); }
      if (lang === 'en') { return (mitBei ? bei + ', the scale ' : 'The scale ') + nameWert(lang, x) + ' is ' + (niedrig ? 'in the low range (T\u00A0<\u00A040)' : 'in the average range'); }
      return (mitBei ? bei + ' liegt die Skala ' + nameWert(lang, x) + ' ' : 'Die Skala ' + nameWert(lang, x) + ' liegt ') + (niedrig ? 'im niedrigen Bereich (T\u00A0<\u00A040)' : 'im durchschnittlichen Bereich');
    }
    if (erster) {
      if (z.length === 1) { s.push(eine(z[0], !beiGenannt)); }
      else if (beiGenannt) {
        s.push(lang === 'fr' ? 'Toutes les échelles de contenu se situent dans la moyenne' + (tief ? ' ou en dessous' : '') + ' (T\u00A0<\u00A060)'
          : (lang === 'en' ? 'All content scales are in the average' + (tief ? ' or low' : '') + ' range (T\u00A0<\u00A060)'
            : 'Alle Inhaltsskalen liegen im durchschnittlichen' + (tief ? ' oder niedrigen' : '') + ' Bereich (T\u00A0<\u00A060)'));
      } else {
        s.push(lang === 'fr' ? bei + ', toutes les échelles de contenu se situent dans la moyenne' + (tief ? ' ou en dessous' : '') + ' (T\u00A0<\u00A060)'
          : (lang === 'en' ? bei + ', all content scales are in the average' + (tief ? ' or low' : '') + ' range (T\u00A0<\u00A060)'
            : bei + ' liegen alle Inhaltsskalen im durchschnittlichen' + (tief ? ' oder niedrigen' : '') + ' Bereich (T\u00A0<\u00A060)'));
      }
    } else if (rest.length === 1) { s.push(eine(rest[0], false)); }
    else if (rest.length > 1) {
      s.push(lang === 'fr' ? 'Les autres échelles de contenu se situent dans la moyenne' + (tief ? ' ou en dessous' : '')
        : (lang === 'en' ? 'The other content scales are in the average' + (tief ? ' or low' : '') + ' range'
          : 'Die übrigen Inhaltsskalen liegen im durchschnittlichen' + (tief ? ' oder niedrigen' : '') + ' Bereich'));
    }
    return s.map(function (x) { return TX.satz(x, lang); }).join(' ');
  }
  /* Antwortstil eines Beurteilers */
  function rohKlammer(lang, v, k) {
    var r = lang === 'fr' ? 'score brut ' : (lang === 'en' ? 'raw score ' : 'Rohwert ');
    var teile = [];
    if (v[k] != null) { teile.push(r + v[k]); }
    if (k === 'ii' && v.iid != null) {
      teile.push(v.iid + (lang === 'fr' ? (v.iid <= 1 ? ' écart\u00A0≥\u00A02' : ' écarts\u00A0≥\u00A02') : (lang === 'en' ? (v.iid === 1 ? ' difference\u00A0≥\u00A02' : ' differences\u00A0≥\u00A02') : (v.iid === 1 ? ' Differenz\u00A0≥\u00A02' : ' Differenzen\u00A0≥\u00A02'))));
    }
    return teile.length ? ' (' + teile.join('; ') + ')' : '';
  }
  function validitaetSaetze(lang, inf, v) {
    if (!valBelegt(v)) { return ''; }
    var bei = B.ersteGross(infBei(inf, lang));
    var keys = ['pe', 'ne', 'ii'].filter(function (k) { return k !== 'ii' || v.iiU != null || v.ii != null; });
    var ok = keys.filter(function (k) { return v[k + 'U'] === 'ok'; });
    var hin = keys.filter(function (k) { return v[k + 'U'] === 'hinweis'; });
    var roh = keys.filter(function (k) { return !v[k + 'U'] && (v[k] != null || (k === 'ii' && v.iid != null)); });
    var s = [], beiBenutzt = false;
    if (ok.length) {
      var namen = B.liste(ok.map(function (k) { return B.t(VAL[k].name, lang) + rohKlammer(lang, v, k); }), lang), n = ok.length;
      s.push(lang === 'fr' ? bei + ', ' + (n === 1 ? 'l’échelle de validité ' : 'les échelles de validité ') + namen + (n === 1 ? ' se situe' : ' se situent') + ' dans les limites attendues (critères du manuel)'
        : (lang === 'en' ? bei + ', ' + (n === 1 ? 'the validity scale ' : 'the validity scales ') + namen + (n === 1 ? ' is' : ' are') + ' within the expected range (manual criteria)'
          : bei + (n === 1 ? ' liegt die Validitätsskala ' : ' liegen die Validitätsskalen ') + namen + ' laut Manual im unauffälligen Bereich'));
      beiBenutzt = true;
    }
    hin.forEach(function (k) {
      var subj = B.t(VAL[k].subj, lang) + rohKlammer(lang, v, k), was = B.t(VAL[k].was, lang);
      if (lang === 'fr') { s.push((beiBenutzt ? '' : bei + ', ') + subj + ' indique ' + was + ' (critères du manuel)'); }
      else if (lang === 'en') { s.push((beiBenutzt ? '' : bei + ', ') + subj + ' indicates ' + was + ' (manual criteria)'); }
      else { s.push(beiBenutzt ? B.ersteGross(subj) + ' weist laut Manual auf ' + was + ' hin' : bei + ' weist ' + subj + ' laut Manual auf ' + was + ' hin'); }
      beiBenutzt = true;
    });
    if (hin.length) {
      s.push(lang === 'fr' ? 'Les résultats de cette évaluation sont donc à interpréter avec prudence'
        : (lang === 'en' ? 'The results of this rating should therefore be interpreted with caution' : 'Die Ergebnisse dieses Urteils sind daher mit Vorsicht zu interpretieren'));
    }
    if (roh.length) {
      var werte = roh.map(function (k) { return B.t(VAL[k].name, lang) + (v[k] != null ? ' ' + v[k] : '') + (k === 'ii' && v.iid != null ? rohKlammer(lang, { iid: v.iid }, 'ii') : ''); });
      s.push(lang === 'fr' ? 'Scores bruts des échelles de validité ' + infBei(inf, lang) + ' : ' + B.liste(werte, lang)
        : (lang === 'en' ? 'Raw scores of the validity scales ' + infBei(inf, lang) + ': ' + B.liste(werte, lang)
          : 'Rohwerte der Validitätsskalen ' + infBei(inf, lang) + ': ' + B.liste(werte, lang)));
    }
    return s.map(function (x) { return TX.satz(x, lang); }).join(' ');
  }
  function dsmSatz(lang, d, inf, zeilen) {
    if (!zeilen.length) { return ''; }
    return TX.satz(dsmTitel(lang, d.dsm) + ' ' + infBei(inf, lang) + (lang === 'fr' ? ' : ' : ': ') + B.liste(zeilen.map(function (z) { return nameVoll(lang, z); }), lang), lang);
  }
  function indexSatz(lang, inf, zeilen) {
    if (!zeilen.length) { return ''; }
    return TX.satz((lang === 'fr' ? 'Indices ' : (lang === 'en' ? 'Indices ' : 'Indizes ')) + infBei(inf, lang) + (lang === 'fr' ? ' : ' : ': ') + B.liste(zeilen.map(function (z) { return nameVoll(lang, z); }), lang), lang);
  }
  function itemText(lang, it) {
    var k = [];
    k.push(it.wert != null ? (lang === 'fr' ? 'réponse ' : (lang === 'en' ? 'rating ' : 'Antwort ')) + it.wert : (lang === 'fr' ? 'signalé' : (lang === 'en' ? 'marked' : 'markiert')));
    if (it.text) { k.push(TX.q(it.text, lang)); }
    var nr = it.nr != null ? ' ' + it.nr : (lang === 'fr' ? ' sans numéro' : (lang === 'en' ? ' without number' : ' ohne Nummer'));
    return (lang === 'de' ? 'Item' : 'item') + nr + ' (' + k.join('; ') + ')';
  }
  function itemSaetze(lang, inf, items) {
    var s = [], bei = infBei(inf, lang);
    var scr = ['angst', 'depression'].map(function (art) {
      var l = items.filter(function (it) { return it.art === art && gemeldet(it); });
      return l.length ? B.t(SCREENER[art], lang) + ' – ' + B.liste(l.map(function (it) { return itemText(lang, it); }), lang) : '';
    }).filter(Boolean);
    if (scr.length) {
      s.push(lang === 'fr' ? 'Items de dépistage ' + bei + ' : ' + scr.join(' ; ')
        : (lang === 'en' ? 'Screener items ' + bei + ': ' + scr.join('; ') : 'Screener-Items ' + bei + ': ' + scr.join('; ')));
    }
    var krit = items.filter(function (it) { return it.art === 'kritisch' && gemeldet(it); });
    if (krit.length) {
      var l = B.liste(krit.map(function (it) { return itemText(lang, it); }), lang), sh = TX.q(SPRACHE[lang].h.sicherheit, lang);
      s.push(lang === 'fr' ? 'Items critiques (troubles graves des conduites) ' + bei + ' : ' + l + ' – voir ' + sh
        : (lang === 'en' ? 'Severe Conduct Critical Items ' + bei + ': ' + l + ' – see ' + sh : 'Kritische Items (schwere Störung des Sozialverhaltens) ' + bei + ': ' + l + ' – siehe ' + sh));
    }
    return s.map(function (x) { return TX.satz(x, lang); }).join(' ');
  }
  function beeinSatz(lang, inf, liste) {
    if (!liste.length) { return ''; }
    var w = B.liste(liste.map(function (b) { return B.t(b.name, lang) + ' ' + b.wert; }), lang), bei = infBei(inf, lang);
    return TX.satz(lang === 'fr' ? 'Retentissement ' + bei + ' (réponses de 0 à 3) : ' + w
      : (lang === 'en' ? 'Impairment ' + bei + ' (ratings 0–3): ' + w : 'Beeinträchtigung ' + bei + ' (Antworten 0–3): ' + w), lang);
  }

  /* ---------------- Bericht ---------------- */
  function verfahrenZeile(lang, d) {
    var infs = aktive(d);
    var formen = B.liste(infs.map(function (i) { return bogen(lang, i, formVon(d, i), false); }), lang);
    var titel = lang === 'fr' ? 'Conners 3rd Edition (Conners 3), version allemande (Lidzba, Christiansen & Drechsler, 2013)'
      : (lang === 'en' ? 'Conners 3rd Edition (Conners 3), German edition (Lidzba, Christiansen & Drechsler, 2013)'
        : 'Conners Skalen zu Aufmerksamkeit und Verhalten – 3 (Conners 3; Lidzba, Christiansen & Drechsler, 2013)');
    return titel + (infs.length ? (lang === 'fr' ? ' : ' : ': ') + formen : '') + (d.datum ? ', ' + B.datum(d.datum, lang) : '');
  }
  function zeilenAus(j) { return j.inhalt.concat(j.dsm, j.idx); }
  function tabelle(lang, infs, ausw, teil, def, kopf1, anm) {
    var mit = infs.filter(function (i) { return ausw.je[i][teil].length; });
    if (!mit.length) { return null; }
    function finde(i, id) { return ausw.je[i][teil].filter(function (z) { return z.id === id; })[0]; }
    var zeilen = [];
    def.forEach(function (s) {
      if (mit.some(function (i) { var z = finde(i, s.id); return z && (z.wert != null || z.sz != null); })) {
        zeilen.push([B.t(s.name, lang)].concat(mit.map(function (i) {
          var z = finde(i, s.id); if (!z || (z.wert == null && z.sz == null)) { return '–'; }
          var k = [];
          if (z.pr != null) { k.push(prText(lang) + ' ' + B.zahl(z.pr, lang)); }
          if (z.band) { k.push(B.t(z.band.name, lang)); }
          if (z.sz != null) { k.push(z.sz + '/' + z.szMax + (lang === 'fr' ? ' symptômes' : (lang === 'en' ? ' symptoms' : ' Symptome'))); }
          return (z.wert != null ? String(z.wert) : '–') + (k.length ? ' (' + k.join('; ') + ')' : '');
        })));
      }
      /* Wahrscheinlichkeitswert des ADHS-Index als eigene Zeile */
      if (s.id === 'ai' && mit.some(function (i) { var z = finde(i, 'ai'); return z && z.prob != null; })) {
        zeilen.push([lang === 'fr' ? 'Indice TDAH – valeur de probabilité (selon le manuel)' : (lang === 'en' ? 'ADHD Index – probability score (manual)' : 'ADHS-Index – Wahrscheinlichkeitswert (laut Manual)')].concat(mit.map(function (i) {
          var z = finde(i, 'ai'); return z && z.prob != null ? B.prozent(z.prob, lang) : '–';
        })));
      }
    });
    if (!zeilen.length) { return null; }
    return { t: 'tabelle', kopf: [kopf1].concat(mit.map(function (i) { return B.ersteGross(infName(i, lang)); })), zeilen: zeilen, anmerkung: anm };
  }
  function anmerkungT(lang, d, extra) {
    var a = lang === 'fr' ? 'Notes T (moyenne 50, écart type 10) ; entre parenthèses la classification : bas (<\u00A040), dans la moyenne (40–59), légèrement élevé (60–64), élevé (65–69), très élevé (≥\u00A070). – = non évalué ou absent de cette version.'
      : (lang === 'en' ? 'T-scores (mean 50, standard deviation 10); classification in brackets: low (<\u00A040), average (40–59), high average (60–64), elevated (65–69), very elevated (≥\u00A070). – = not assessed or not part of this form.'
        : 'T-Werte (Mittelwert 50, Standardabweichung 10); in Klammern die Einstufung: niedrig (<\u00A040), durchschnittlich (40–59), leicht erhöht (60–64), erhöht (65–69), sehr erhöht (≥\u00A070). – = nicht erhoben oder in dieser Form nicht enthalten.');
    if (d.mitPr) { a += lang === 'fr' ? ' Rang centile selon le manuel.' : (lang === 'en' ? ' PR = percentile rank from the manual.' : ' PR = Prozentrang laut Manual.'); }
    return a + (extra ? ' ' + extra : '');
  }
  function bericht(lang, ctx, d, ausw) {
    var bl = [{ t: 'p', text: ZWECK[lang] }];
    var infs = aktive(d).filter(function (i) { return hatDaten(ausw.je[i]); });
    if (!infs.length) { bl.push({ t: 'p', text: lang === 'fr' ? 'Aucun résultat n’a encore été saisi.' : (lang === 'en' ? 'No results have been entered yet.' : 'Es wurden noch keine Ergebnisse eingegeben.') }); return bl; }
    /* Wer, Normen, Symptomskalen */
    var boegen = infs.map(function (i) { return bogen(lang, i, formVon(d, i), true); }), n = boegen.length, liste = B.liste(boegen, lang);
    var s = [];
    s.push(lang === 'fr' ? B.ersteGross(liste) + (n > 1 ? ' ont été remplis' : ' a été rempli')
      : (lang === 'en' ? B.ersteGross(liste) + (n > 1 ? ' were completed' : ' was completed') : 'Ausgefüllt wurde' + (n > 1 ? 'n ' : ' ') + liste));
    s.push(lang === 'fr' ? 'Les notes T se réfèrent aux normes de la version allemande, établies selon l’âge et le sexe ; les noms des échelles et des catégories sont traduits de cette version'
      : (lang === 'en' ? 'T-scores are based on the age- and gender-specific norms of the German edition' : 'Die T-Werte beruhen auf den alters- und geschlechtsspezifischen Normen der deutschen Fassung'));
    if (infs.some(function (i) { return ausw.je[i].dsm.length; })) {
      var dsmT = {
        dsm5: L('Die Symptomskalen wurden nach DSM-5 ausgewertet (DSM-5-Update-Heft der deutschen Fassung); sie orientieren sich an den dort beschriebenen Symptomen und ersetzen keine klinische Diagnose',
          'Les échelles de symptômes ont été cotées selon le DSM-5 (cahier de mise à jour DSM-5 de la version allemande) ; elles s’appuient sur les symptômes qui y sont décrits et ne remplacent pas un diagnostic clinique',
          'The symptom scales were scored according to DSM-5 (DSM-5 update booklet of the German edition); they are based on the symptoms described there and do not replace a clinical diagnosis'),
        dsm4: L('Die Symptomskalen wurden nach DSM-IV-TR ausgewertet (Auswertebogen der deutschen Erstausgabe); sie orientieren sich an den dort beschriebenen Symptomen und ersetzen keine klinische Diagnose',
          'Les échelles de symptômes ont été cotées selon le DSM-IV-TR (feuilles de cotation de la première édition allemande) ; elles s’appuient sur les symptômes qui y sont décrits et ne remplacent pas un diagnostic clinique',
          'The symptom scales were scored according to DSM-IV-TR (scoring sheets of the first German edition); they are based on the symptoms described there and do not replace a clinical diagnosis'),
        '': L('Die Symptomskalen orientieren sich an den Symptombeschreibungen des DSM und ersetzen keine klinische Diagnose',
          'Les échelles de symptômes s’appuient sur les symptômes décrits dans le DSM et ne remplacent pas un diagnostic clinique',
          'The symptom scales are based on the symptoms described in the DSM and do not replace a clinical diagnosis')
      }[d.dsm === 'dsm5' || d.dsm === 'dsm4' ? d.dsm : ''];
      s.push(B.t(dsmT, lang));
    }
    bl.push({ t: 'p', text: s.map(function (x) { return TX.satz(x, lang); }).join(' ') });
    /* Tabellen */
    var lehrerLang = infs.indexOf('lehrer') >= 0 && formVon(d, 'lehrer') === 'lang' && ausw.je.lehrer.inhalt.some(function (z) { return z.id === 'lp' || z.id === 'ef'; });
    var unter = lehrerLang ? (lang === 'fr' ? 'Dans le questionnaire enseignant·e (version longue), Problèmes d’apprentissage et Fonctions exécutives sont des sous-échelles de l’échelle Problèmes d’apprentissage/fonctions exécutives.'
      : (lang === 'en' ? 'On the teacher form (long version), Learning Problems and Executive Functioning are subscales of Learning Problems/Executive Functioning.'
        : 'Im Lehrerfragebogen (Langversion) sind Lernprobleme und Exekutive Funktionen Unterskalen der Skala Lernprobleme/Exekutive Funktionen.')) : '';
    var t1 = tabelle(lang, infs, ausw, 'inhalt', INHALT, lang === 'fr' ? 'Échelle de contenu' : (lang === 'en' ? 'Content scale' : 'Inhaltsskala'), anmerkungT(lang, d, unter));
    if (t1) { bl.push(t1); }
    var mitSz = infs.some(function (i) { return ausw.je[i].dsm.some(function (z) { return z.sz != null; }); });
    var t2 = tabelle(lang, infs, ausw, 'dsm', DSM, dsmTitel(lang, d.dsm, true),
      anmerkungT(lang, d, !mitSz ? '' : (lang === 'fr' ? 'Symptômes : nombre de symptômes cotés comme présents selon le manuel / nombre de symptômes de l’échelle.'
        : (lang === 'en' ? 'Symptoms: number of symptoms counted as present according to the manual / number of symptoms on the scale.'
          : 'Symptome: Zahl der laut Manual als zutreffend gewerteten Symptome / Zahl der Symptome der Skala.'))));
    if (t2) { bl.push(t2); }
    var t3 = tabelle(lang, infs, ausw, 'idx', IDX, SPRACHE[lang].spalten.index, anmerkungT(lang, d, ''));
    if (t3) { bl.push(t3); }
    /* Text je Beurteiler: 1) Antwortstil und Inhaltsskalen, 2) Symptomskalen, Indizes, Items, Beeinträchtigung */
    infs.forEach(function (i) {
      var j = ausw.je[i], bei = B.ersteGross(infBei(i, lang));
      var val = validitaetSaetze(lang, i, j.val);
      var a1 = [val, inhaltSaetze(lang, bei, j.inhalt, !!val)].filter(Boolean);
      var a2 = [dsmSatz(lang, d, i, j.dsm), indexSatz(lang, i, j.idx), itemSaetze(lang, i, j.items), beeinSatz(lang, i, j.beein)].filter(Boolean);
      if (a1.length) { bl.push({ t: 'p', text: a1.join(' ') }); }
      if (a2.length) { bl.push({ t: 'p', text: a2.join(' ') }); }
    });
    if (infs.some(function (i) { return ausw.je[i].items.some(function (it) { return it.art !== 'kritisch' && gemeldet(it); }); })) {
      bl.push({ t: 'p', text: lang === 'fr' ? 'Les items de dépistage de l’anxiété et de la dépression ne donnent pas lieu à des notes T ; les items signalés indiquent des domaines à explorer plus en détail lors d’un entretien.'
        : (lang === 'en' ? 'The anxiety and depression screener items are not converted into T-scores; endorsed items point to areas that should be explored further in an interview.'
          : 'Die Screener-Items zu Angst und Depression werden nicht als T-Werte ausgewertet; angegebene Items zeigen Bereiche an, die im Gespräch genauer erfragt werden sollten.') });
    }
    /* Vergleich: nur Skalen, die in mindestens zwei Urteilen eingestuft sind */
    var mitBand = infs.filter(function (i) { return zeilenAus(ausw.je[i]).some(function (z) { return z.band; }); });
    var gemeinsam = SKALEN.some(function (sk) { return mitBand.filter(function (i) { return zeilenAus(ausw.je[i]).some(function (z) { return z.id === sk.id && z.band; }); }).length >= 2; });
    if (mitBand.length >= 2 && gemeinsam) {
      var je = {}; mitBand.forEach(function (i) { je[i] = zeilenAus(ausw.je[i]); });
      var vgl = TX.vergleichAbsatz(lang, je, mitBand, SKALEN);
      if (vgl) { bl.push({ t: 'p', text: vgl }); }
    }
    return bl;
  }
  function zusammenfassung(lang, ctx, d, ausw) {
    /* nur Bögen mit eingestuften T-Werten (Inhaltsskalen, Indizes) */
    var infs = aktive(d).filter(function (i) { return ausw.je[i] && ausw.je[i].inhalt.concat(ausw.je[i].idx).some(function (z) { return z.band; }); });
    var krit = aktive(d).filter(function (i) { return ausw.je[i] && ausw.je[i].items.some(function (it) { return it.art === 'kritisch' && gemeldet(it); }); });
    if (!infs.length && !krit.length) { return ''; }
    var teile = [];
    INHALT.concat(IDX.filter(function (s) { return s.id === 'ai' || s.id === 'gi'; })).forEach(function (s) {
      var bei = infs.filter(function (i) { return ausw.je[i].inhalt.concat(ausw.je[i].idx).some(function (z) { return z.id === s.id && z.band && z.band.rang >= 2; }); });
      if (bei.length) { teile.push(B.t(s.name, lang) + ' (' + B.liste(bei.map(function (i) { return infName(i, lang); }), lang) + ')'); }
    });
    var kr = krit.length ? B.liste(krit.map(function (i) { return infName(i, lang); }), lang) : '';
    var sep = lang === 'fr' ? ' ; ' : '; ';
    var kopf = lang === 'fr' ? 'Conners 3 : ' : 'Conners 3: ';
    var haupt = infs.length ? (teile.length ? (lang === 'fr' ? 'scores élevés (T\u00A0≥\u00A065) – ' : (lang === 'en' ? 'raised scores (T\u00A0≥\u00A065) – ' : 'erhöhte Werte (T\u00A0≥\u00A065) – ')) + teile.join(sep)
      : (lang === 'fr' ? 'aucune échelle dans la zone élevée (T\u00A0≥\u00A065)' : (lang === 'en' ? 'no scale in the elevated range (T\u00A0≥\u00A065)' : 'keine Skala im erhöhten Bereich (T\u00A0≥\u00A065)'))) : '';
    var kt = kr ? (lang === 'fr' ? 'items critiques signalés (' + kr + ')' : (lang === 'en' ? 'critical items endorsed (' + kr + ')' : 'kritische Items angegeben (' + kr + ')')) : '';
    return kopf + [haupt, kt].filter(Boolean).join(sep) + '.';
  }
  function hinweise(lang, ctx, d, ausw) {
    var infs = aktive(d).filter(function (i) { return ausw.je[i]; });
    function erhoeht(ids) { return infs.some(function (i) { return zeilenAus(ausw.je[i]).some(function (z) { return ids.indexOf(z.id) >= 0 && z.band && z.band.rang >= 2; }); }); }
    var h = [];
    if (erhoeht(['ua', 'hi', 'dua', 'dhi', 'ai'])) {
      h.push(lang === 'fr' ? 'Les scores élevés du Conners 3 en matière d’attention ou d’hyperactivité/impulsivité devraient être approfondis à l’aide de l’anamnèse développementale, d’observations dans plusieurs contextes (famille, école) et de l’avis d’autres personnes de référence.'
        : (lang === 'en' ? 'The raised Conners 3 scores for attention or hyperactivity/impulsivity should be explored further through the developmental history, observation in several settings (home, school) and the views of other informants.'
          : 'Die erhöhten Werte des Conners 3 zu Aufmerksamkeit bzw. Hyperaktivität/Impulsivität sollten über die Entwicklungsgeschichte, Beobachtungen in mehreren Lebensbereichen (Familie, Schule) und die Einschätzung weiterer Bezugspersonen vertieft werden.'));
    }
    if (erhoeht(['at', 'ag', 'dot', 'dsv'])) {
      h.push(lang === 'fr' ? 'Les éléments relatifs aux comportements d’opposition ou d’agressivité (Conners 3) mériteraient d’être précisés lors d’entretiens avec la famille et l’école (situations, déclencheurs, fréquence).'
        : (lang === 'en' ? 'The reports of oppositional or aggressive behaviour (Conners 3) should be described in more detail in discussions with the family and the school (situations, triggers, frequency).'
          : 'Die Angaben zu oppositionellem bzw. aggressivem Verhalten (Conners 3) sollten im Gespräch mit Familie und Schule genauer beschrieben werden (Situationen, Auslöser, Häufigkeit).'));
    }
    if (erhoeht(['lp', 'ef', 'lpef'])) {
      h.push(lang === 'fr' ? 'Les difficultés d’apprentissage ou des fonctions exécutives rapportées (Conners 3) peuvent être précisées par une évaluation cognitive et des apprentissages scolaires.'
        : (lang === 'en' ? 'The learning or executive functioning difficulties reported (Conners 3) can be clarified further with cognitive and academic assessment.'
          : 'Die berichteten Lernprobleme bzw. Schwierigkeiten der exekutiven Funktionen (Conners 3) lassen sich mit einer Leistungs- und Lernstandsdiagnostik genauer einordnen.'));
    }
    if (erhoeht(['bg', 'fb'])) {
      h.push(lang === 'fr' ? 'Les difficultés relationnelles rapportées (pairs ou famille, Conners 3) devraient être abordées lors d’un entretien.'
        : (lang === 'en' ? 'The reported relationship difficulties (peers or family, Conners 3) should be explored in an interview.'
          : 'Die berichteten Schwierigkeiten in den Beziehungen (Gleichaltrige bzw. Familie, Conners 3) sollten im Gespräch vertieft werden.'));
    }
    if (infs.some(function (i) { return ausw.je[i].items.some(function (it) { return it.art !== 'kritisch' && gemeldet(it); }); })) {
      h.push(lang === 'fr' ? 'Les items de dépistage de l’anxiété ou de la dépression signalés (Conners 3) devraient être approfondis lors d’un entretien et, si nécessaire, à l’aide d’un questionnaire spécifique (anxiété, humeur).'
        : (lang === 'en' ? 'The endorsed anxiety or depression screener items (Conners 3) should be explored in an interview and, if needed, with a specific questionnaire (anxiety, mood).'
          : 'Die angegebenen Screener-Items zu Angst bzw. Depression (Conners 3) sollten im Gespräch und bei Bedarf mit einem spezifischen Fragebogen (Angst, Stimmung) vertieft werden.'));
    }
    var verz = infs.filter(function (i) { var v = ausw.je[i].val; return v && ['peU', 'neU', 'iiU'].some(function (k) { return v[k] === 'hinweis'; }); });
    if (verz.length) {
      var wer = B.liste(verz.map(function (i) { return infName(i, lang); }), lang);
      h.push(lang === 'fr' ? 'Les échelles de validité signalant un style de réponse possiblement biaisé ou incohérent (' + wer + '), les résultats concernés devraient être confirmés par d’autres sources d’information.'
        : (lang === 'en' ? 'As the validity scales point to a possibly biased or inconsistent response style (' + wer + '), the results concerned should be confirmed with other sources of information.'
          : 'Da die Validitätsskalen auf einen möglicherweise verzerrten oder inkonsistenten Antwortstil hinweisen (' + wer + '), sollten die betreffenden Ergebnisse durch weitere Informationsquellen abgesichert werden.'));
    }
    return h;
  }
  /* Sicherheit: kritische Items aller Langversionen (auch Selbstbericht) und als sicherheitsrelevant markierte Screener-Items */
  function sicherheit(lang, d) {
    var out = [];
    aktive(d).forEach(function (inf) {
      if (formVon(d, inf) !== 'lang') { return; }
      itemsAus(d, inf).forEach(function (it) {
        if (!gemeldet(it) || (it.art !== 'kritisch' && !it.sich)) { return; }
        var wer = infName(inf, lang), text = it.text ? (lang === 'fr' ? ' : ' : ': ') + TX.q(it.text, lang) : '';
        var antwort = it.wert != null ? (lang === 'fr' ? 'a été coté ' + it.wert : (lang === 'en' ? 'was rated ' + it.wert : 'wurde mit ' + it.wert + ' beantwortet'))
          : (lang === 'fr' ? 'a été signalé comme présent' : (lang === 'en' ? 'was marked as endorsed' : 'wurde als zutreffend markiert'));
        var was;
        var mitNr = it.nr != null;
        if (it.art === 'kritisch') {
          was = lang === 'fr' ? (mitNr ? 'l’item critique ' + it.nr + ' (troubles graves des conduites) ' : 'un item critique (troubles graves des conduites ; numéro non indiqué) ')
            : (lang === 'en' ? (mitNr ? 'critical item ' + it.nr + ' (severe conduct) ' : 'a critical item (severe conduct; number not given) ')
              : (mitNr ? 'Das kritische Item ' + it.nr + ' (schwere Störung des Sozialverhaltens) ' : 'Ein kritisches Item (schwere Störung des Sozialverhaltens; ohne Itemnummer) '));
        } else {
          var sc = { fr: it.art === 'angst' ? 'du dépistage de l’anxiété ' : 'du dépistage de la dépression ', en: 'of the ' + B.t(SCREENER[it.art], 'en') + ' screener ', de: 'des Screeners ' + B.t(SCREENER[it.art], 'de') + ' ' }[lang];
          was = lang === 'fr' ? (mitNr ? 'l’item ' + it.nr + ' ' + sc : 'un item ' + sc + '(numéro non indiqué) ')
            : (lang === 'en' ? (mitNr ? 'item ' + it.nr + ' ' + sc : 'an item ' + sc + '(number not given) ')
              : (mitNr ? 'Das Item ' + it.nr + ' ' + sc : 'Ein Item ' + sc + '(ohne Itemnummer) '));
        }
        out.push(TX.satz('Conners 3, ' + wer + (lang === 'fr' ? ' : ' : ': ') + was + antwort + text, lang));
      });
    });
    return out;
  }

  /* ---------------- Hinweise im Formular ---------------- */
  function warnung(d, fall) {
    var w = [], infs = aktive(d);
    var a = B.alter(((fall || {}).kind || {}).geburtsdatum, d.datum || ((fall || {}).bericht || {}).datumVon);
    if (a && (a.dezimal < 6 || a.dezimal >= 19)) { w.push('Die Conners 3 sind für 6 bis 18 Jahre normiert – das Kind ist ' + B.alterText(a, 'de') + ' alt.'); }
    else if (a && infs.indexOf('selbst') >= 0 && a.dezimal < 8) { w.push('Der Selbstbeurteilungsbogen ist ab 8 Jahren vorgesehen – das Kind ist ' + B.alterText(a, 'de') + ' alt.'); }
    var ausw = auswerten(d);
    if (!d.dsm && infs.some(function (i) { return ausw.je[i].dsm.length; })) { w.push('Bitte unter „Durchführung“ angeben, nach welcher DSM-Fassung die Symptomskalen ausgewertet wurden.'); }
    infs.forEach(function (inf) {
      var form = formVon(d, inf), wv = werteVon(d, inf), fremd = [];
      ['t', 'pr', 'sz', 'w'].forEach(function (k) {
        Object.keys(wv[k]).forEach(function (id) {
          var s = skala(id);
          var nm = s ? (s.kurz || B.t(s.name, 'de')) : id;
          if (belegt(wv[k][id]) && (!s || !erlaubt(s, inf, form)) && fremd.indexOf(nm) < 0) { fremd.push(nm); }
        });
      });
      var roh = (d.items || {})[inf] || {};
      var itemsDa = Object.keys(roh).some(function (k) { return roh[k] && roh[k].art; });
      if (itemsDa && !hat(form, 'items')) { fremd.push('Screener-/kritische Items'); }
      if (fremd.length) { w.push(INF_UI[inf] + ' (' + FORMEN[form].ui + '): Eingetragene Werte für ' + fremd.join(', ') + ' gehören nicht zu dieser Form und erscheinen nicht im Bericht.'); }
      if (hat(form, 'items')) {
        var its = itemsAus(d, inf);
        var ohneNr = its.filter(function (it) { return it.nr == null; }).length;
        if (ohneNr) { w.push(INF_UI[inf] + ': Bei ' + (ohneNr === 1 ? 'einem eingetragenen Item' : ohneNr + ' eingetragenen Items') + ' fehlt eine gültige Itemnummer (1–120) – im Bericht steht dann „ohne Nummer“.'); }
        var ohneAntwort = its.filter(function (it) { return it.wert == null && it.nr != null; }).map(function (it) { return it.nr; });
        if (ohneAntwort.length) { w.push(INF_UI[inf] + ': Bei Item ' + ohneAntwort.join(', ') + ' ist keine Antwort eingetragen – im Bericht steht dann „markiert“.'); }
      }
    });
    if (d.altHinweis && !d.altGeprueft) { w.push('Aus der früheren Version übernommen – bitte mit den Auswertebögen abgleichen (Einzelheiten unten).'); }
    return w.map(B.esc).join('<br>');
  }
  function fertig(d) {
    var infs = aktive(d); if (!infs.length) { return false; }
    if (d.altHinweis && !d.altGeprueft) { return false; }
    var a = auswerten(d);
    if (!d.dsm && infs.some(function (i) { return a.je[i].dsm.length; })) { return false; }
    return infs.every(function (i) { return zeilenAus(a.je[i]).some(function (z) { return z.wert != null || z.prob != null; }); });
  }

  /* ---------------- Übernahme aus der früheren Version (v1) ----------------
     Dort gab es EIN Feldset für alle Beurteiler (con-…); ausgewertete
     Beurteiler lagen zusätzlich in raters.conners.{parent|teacher|self}.values.
     Übernommen werden nur echte T-Werte (ganzzahlig 20–100) für Skalen, die
     es für den jeweiligen Bogen gibt. ICD-Skalen, „DSM-K“ und die nur als
     Anzahl gespeicherten Screener-/kritischen Items werden nicht übernommen,
     sondern im Hinweis genannt. */
  function ausAlt(alt) {
    var f = alt.fields || {}, radios = alt.radios || {}, raters = (alt.raters || {}).conners || {};
    var RK = { parent: 'eltern', teacher: 'lehrer', self: 'selbst' };
    var FELDER = { 'con-in': 'in', 'con-hi': 'hi', 'con-lp': 'lp', 'con-lpef': 'lpef', 'con-ef': 'ef', 'con-ag': 'ag', 'con-pr': 'pr', 'con-fb': 'fb',
      'con-dsm-in': 'dsm_in', 'con-dsm-hi': 'dsm_hi', 'con-dsm-cd': 'dsm_cd', 'con-dsm-odd': 'dsm_odd', 'con-adhd': 'adhd', 'con-gi': 'gi',
      'con-dsm-k': 'dsm_k', 'con-icd-as': 'icd_as', 'con-icd-sv': 'icd_sv', 'con-icd-hksv': 'icd_hksv' };
    function neueId(k, inf) {
      return ({ 'in': 'ua', hi: 'hi', lp: 'lp', lpef: 'lpef', ef: 'ef', ag: inf === 'selbst' ? 'ag' : 'at', pr: 'bg', fb: 'fb',
        dsm_in: 'dua', dsm_hi: 'dhi', dsm_cd: 'dsv', dsm_odd: 'dot', adhd: 'ai', gi: 'gi' })[k] || null;
    }
    var d = neu(), notiz = [], ohne = {}, anzahl = [];
    d.informanten = [];
    function uebernehmen(inf, werte) {
      var n = 0;
      Object.keys(werte).forEach(function (k) {
        if (/^icd_|^dsm_k$/.test(k)) { if (belegt(werte[k])) { ohne[k] = true; } return; }
        var id = neueId(k, inf), s = id ? skala(id) : null;
        var v = zahl(werte[k], T_MIN, T_MAX, true);
        if (!s || s.inf.indexOf(inf) < 0 || v == null) { return; }
        d.werte[inf].t[id] = String(v); n++;
      });
      if (n && d.informanten.indexOf(inf) < 0) { d.informanten.push(inf); }
      return n;
    }
    Object.keys(RK).forEach(function (rk) {
      var r = raters[rk]; if (!r || !r.values) { return; }
      var werte = {};
      Object.keys(r.values).forEach(function (k) { var x = r.values[k]; if (x && x.v != null) { werte[k] = x.v; } });
      uebernehmen(RK[rk], werte);
      [['si_anx_items', 'Angst-Screener'], ['si_dep_items', 'Depressions-Screener']].forEach(function (p) {
        var v = r.values[p[0]] ? B.num(r.values[p[0]].v) : null;
        if (v) { anzahl.push(INF_UI[RK[rk]] + ': ' + p[1] + ' ' + v + ' Item(s) ≥ 1'); }
      });
    });
    /* aktuelles Feldset → der zuletzt gewählte Beurteiler (nur wenn für ihn nichts gespeichert war) */
    var akt = RK[radios['conners-resp']] || 'eltern';
    var aktRk = Object.keys(RK).filter(function (k) { return RK[k] === akt; })[0];
    var feldWerte = {};
    Object.keys(FELDER).forEach(function (fid) { if (belegt(f[fid])) { feldWerte[FELDER[fid]] = f[fid]; } });
    if (!raters[aktRk]) { uebernehmen(akt, feldWerte); }
    else { Object.keys(feldWerte).forEach(function (k) { if (/^icd_|^dsm_k$/.test(k)) { ohne[k] = true; } }); }
    var pe = zahl(f['con-pe'], 0, 18, true), ne = zahl(f['con-ne'], 0, 18, true);
    if (pe != null) { d.val[akt].pe = String(pe); }
    if (ne != null) { d.val[akt].ne = String(ne); }
    if ((pe != null || ne != null) && d.informanten.indexOf(akt) < 0) { d.informanten.push(akt); }
    [['con-anx-items', 'Angst-Screener'], ['con-dep-items', 'Depressions-Screener'], ['con-ki', 'kritische Items']].forEach(function (p) {
      var v = B.num(f[p[0]]);
      if (v) { anzahl.push(INF_UI[akt] + ' (zuletzt bearbeiteter Bogen): ' + p[1] + ' ' + v + ' Item(s) ≥ 1'); }
    });
    if (!d.informanten.length && !anzahl.length) { return null; }
    if (!d.informanten.length) { d.informanten = [akt]; }
    d.informanten = INF.filter(function (i) { return d.informanten.indexOf(i) >= 0; });
    /* gleiche Werte bei mehreren Beurteilern: in der früheren Version möglicherweise übertragen */
    var doppelt = [];
    SKALEN.forEach(function (s) {
      var werte = d.informanten.map(function (i) { return d.werte[i].t[s.id]; }).filter(belegt);
      if (werte.length >= 2 && werte.some(function (x, k) { return werte.indexOf(x) !== k; })) { doppelt.push(s.kurz || B.t(s.name, 'de')); }
    });
    notiz.push('Die frühere Version hatte nur ein Feldset für alle Beurteiler und konnte Werte beim Wechsel des Beurteilers stehen lassen. Bitte jede Spalte mit dem jeweiligen Auswertebogen abgleichen.');
    if (doppelt.length) { notiz.push('Gleiche Werte bei mehreren Beurteilern (möglicherweise übertragen): ' + doppelt.join(', ') + '.'); }
    if (Object.keys(ohne).length) { notiz.push('Nicht übernommen: ' + Object.keys(ohne).map(function (k) { return ({ dsm_k: 'DSM-K', icd_as: 'ICD-AS', icd_sv: 'ICD-SV', icd_hksv: 'ICD-HKSV' })[k]; }).join(', ') + ' (werden hier nicht erfasst).'); }
    if (anzahl.length) { notiz.push('In der früheren Version nur als Anzahl gespeichert – bitte die einzelnen Items (Itemnummer, Antwort) vom Auswertebogen nachtragen: ' + anzahl.join('; ') + '.'); }
    notiz.push('Die Form (Lang-/Kurzversion) und die DSM-Fassung der Symptomskalen bitte ebenfalls prüfen.');
    d.altHinweis = notiz.join(' ');
    return d;
  }

  KAT.registrieren({
    id: 'conners', kurz: 'Conners 3', kurzUi: 'Conners 3',
    name: L('Conners 3 – Conners Skalen zu Aufmerksamkeit und Verhalten – 3', 'Conners 3 – Conners 3rd Edition (version allemande)', 'Conners 3 – Conners 3rd Edition (German edition)'),
    gruppe: 'verhalten', alter: [6, 18], informantenText: 'Eltern, Lehrkraft, Selbst (ab 8)',
    hilfe: 'Eine Spalte je Bogen – Eltern, Lehrkraft und Selbstbeurteilung werden getrennt eingegeben. T-Werte (bei Bedarf PR) vom Auswertebogen übernehmen; das Tool rechnet keine Normwerte. Markierte Screener- und kritische Items bitte für jeden Bogen einzeln eintragen – auch für die Selbstbeurteilung.',
    neu: neu, formular: formular, auswerten: auswerten, chip: chip, bericht: bericht, verfahrenZeile: verfahrenZeile,
    zusammenfassung: zusammenfassung, hinweise: hinweise, sicherheit: sicherheit, warnung: warnung, fertig: fertig, ausAlt: ausAlt,
    pruefen: [
      'Deutsche Namen der Inhaltsskalen am Auswertebogen bestätigen: „Aggressivität/Trotz“ (Eltern/Lehrkraft; so bei HTS/PsyCalc – in der Erstausgabe 2013 evtl. „Aggression“), Selbstbeurteilung „Aggression“ und „Familiäre Beziehungen“ (frühere Version: „Familienbeziehungen“).',
      'Kürzel im Formular (UA, HI, LP, EF, LP/EF, AT, AG, BG, FB; DSM-UA, DSM-HI, DSM-SV, DSM-OT; C3-AI, C3-GI) stammen aus der früheren Version – am Auswertebogen bestätigen. Im Bericht stehen keine Kürzel.',
      'Aufbau je Form nach der Originalausgabe angenommen: Kurzversionen ohne Symptomskalen, Indizes, Screener-, kritische und Beeinträchtigungsitems und ohne Inkonsistenz-Index; Lehrer-Langversion mit LP/EF und den Unterskalen LP und EF; ADHS-Index und Global-Index in den Langversionen enthalten.',
      'Symptomskalen: deutsche Skalennamen; gibt es eine eigene Skala „ADHS kombiniert“ (frühere Version: DSM-K)? Symptomzahlen hier 9/9/15/8.',
      'Die ICD-10-Symptomskalen der deutschen Fassung werden nicht erfasst (Grundsatz: keine ICD-Bezüge im Bericht). Soll das so bleiben?',
      'Validitätsskalen: Rohwertbereich und Entscheidungsregeln (PE, NE, Inkonsistenz-Index) je Form am Manual – das Tool übernimmt nur die Bewertung der Fachperson.',
      'Screener-Items (Angst, Depression) und kritische Items: Itemnummern je Form und ab welcher Antwort ein Item als angegeben gilt (hier: Antwort 1–3; Originalausgabe: kritische Items bei jeder Antwort > 0). Deutsche Bezeichnung „Angst“ (frühere Version: „Ängstlichkeit“).',
      'ADHS-Index: Weist die deutsche Fassung T-Werte und/oder einen Wahrscheinlichkeitswert aus? Global-Index-Unterskalen „Rastlos-Impulsiv“ und „Emotional-Labil“ (Namen aus der deutschen Global-Index-Studie, Diagnostica 2019) am Manual bestätigen.',
      'Beeinträchtigungsitems: deutsche Bezeichnungen (hier Schule/Lernen, Freundschaften/Beziehungen, Familie) und Antwortskala.',
      'Französisch: keine französische Fassung belegt – Skalennamen übersetzt. Englisch: Namen der Originalausgabe (MHS).'
    ]
  });
})();
