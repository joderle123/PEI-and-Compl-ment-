/* =====================================================================
   CFT 20-R – Grundintelligenztest Skala 2 – Revision (Weiß, 2006;
   2. Auflage 2019) mit Wortschatztest und Zahlenfolgentest – Revision
   (WS/ZF-R), Hogrefe
   ---------------------------------------------------------------------
   Eingabe wie auf dem Auswertungsbogen: richtige Lösungen je Untertest
   (Teil 1: 15/15/15/11 Aufgaben, Teil 2: 12/12/12/9). Sicher berechnet
   werden nur die Rohwertsummen (Teil 1, Teil 2, Gesamt).
   Normwerte (IQ, T-Wert, PR) gibt es laut Manual nur für Teil 1 und den
   Gesamttest – NICHT für einzelne Untertests – getrennt nach Auflage,
   Durchführungsart (Kurzform = Teil 1, Langform = Teil 1 und 2),
   Testzeit (regulär/verlängert) und Normart (Alters-/Klassennormen).
   WS/ZF-R: eigene Normen (Normtabellen in T-Werten).
   Kein Gesamt-IQ aus Untertests, keine „IQ-Äquivalente“.
   ===================================================================== */
(function () {
  var L = KAT.L;
  /* Untertests in der Reihenfolge des Testhefts; max = Aufgaben in Teil 1 / Teil 2 */
  var UT = [
    { id: 'rf', name: 'Reihenfortsetzen', max: [15, 12] },
    { id: 'kl', name: 'Klassifikationen', max: [15, 12] },
    { id: 'ma', name: 'Matrizen', max: [15, 12] },
    { id: 'to', name: 'Topologien', hinweis: 'topologisches Schlussfolgern', max: [11, 9] }
  ];
  var MAX = { t1: 56, t2: 45, ges: 101 };
  /* Normierte Kennwerte: Teil 1 und Gesamttest */
  var TEILE = [
    { id: 't1', name: L('Teil 1', 'Partie 1', 'Part 1'), bei: L('In Teil 1', 'À la partie 1', 'On Part 1') },
    { id: 'ges', name: L('Gesamttest (Teil 1 und 2)', 'Test complet (parties 1 et 2)', 'Full test (Parts 1 and 2)'), bei: L('Im Gesamttest', 'Au test complet', 'On the full test') }
  ];
  /* Ergänzungstests WS/ZF-R – deutsche Namen, in FR/EN mit Übersetzung */
  var ERG = [
    { id: 'ws', name: L('Wortschatztest (WS)', 'Wortschatztest (WS, vocabulaire)', 'Wortschatztest (WS, vocabulary)'),
      bei: L('Im Wortschatztest (WS)', 'Au Wortschatztest (WS, vocabulaire)', 'On the Wortschatztest (WS, vocabulary)') },
    { id: 'zf', name: L('Zahlenfolgentest (ZF)', 'Zahlenfolgentest (ZF, suites numériques)', 'Zahlenfolgentest (ZF, number series)'),
      bei: L('Im Zahlenfolgentest (ZF)', 'Au Zahlenfolgentest (ZF, suites numériques)', 'On the Zahlenfolgentest (ZF, number series)') }
  ];
  var AUFLAGEN = {
    '2006': { ui: '1. Auflage (Weiß, 2006)', quelle: 'Weiß, 2006', bis: 60,
      bezug: L('der 1. Auflage (Weiß, 2006)', 'de la 1re édition (Weiß, 2006)', 'of the first edition (Weiß, 2006)') },
    '2019': { ui: '2. Auflage (Weiß, 2019)', quelle: 'Weiß, 2019', bis: 64,
      bezug: L('der 2. Auflage (Weiß, 2019)', 'de la 2e édition (Weiß, 2019)', 'of the second edition (Weiß, 2019)') }
  };
  /* Einstufung der IQ-Werte: statistisch nach Standardabweichungen (wie 'iq-5'); Bezeichnungen des Manuals noch zu prüfen */
  KAT.bandDefinieren('cft-iq', { art: 'leistung', stufen: KAT.band('iq-5').stufen,
    pruefen: 'CFT 20-R: Einstufung der IQ-Werte (hier statistisch: 85–115 durchschnittlich, 70–84 bzw. 116–130 unter- bzw. überdurchschnittlich) und ihre Bezeichnungen am Manual prüfen.' });

  function neu() {
    return { datum: '', auflage: '', form: 'lang', testzeit: 'regulaer', normart: 'alter', normgruppe: '', klassenstufe: '', instruktion: '', deutschNichtErst: false,
      roh: { w: {} }, norm: { iq: {}, t: {}, pr: {} }, erg: { t: {}, pr: {} } };
  }
  /* Durchführungsart: Kurzform (Teil 1) oder Langform (Teil 1 und 2) */
  function form(d) { return d.form === 'kurz' ? 'kurz' : 'lang'; }
  /* Rohwertsummen – nur wenn alle vier Untertests eines Teils eingetragen sind */
  function roh(d) {
    function teil(t, i) {
      var w = UT.map(function (u) { return E.zahl('tests.cft.roh.w.' + t + u.id, 0, u.max[i], true); });
      var n = w.filter(function (x) { return x != null; }).length;
      return { summe: n === UT.length ? w.reduce(function (a, b) { return a + b; }, 0) : null, n: n };
    }
    var t1 = teil('t1', 0), t2 = form(d) === 'kurz' ? { summe: null, n: 0 } : teil('t2', 1);
    return { t1: t1.summe, t2: t2.summe, ges: t1.summe != null && t2.summe != null ? t1.summe + t2.summe : null, n1: t1.n, n2: t2.n };
  }
  function einstufung(iq, t, pr) {
    if (iq != null) { return KAT.einstufen('cft-iq', iq); }
    if (t != null) { return KAT.einstufen('t-leistung', t); }
    if (pr != null) { return KAT.einstufen('pr-leistung', pr); }
    return null;
  }
  function teileFuer(d) { return TEILE.filter(function (x) { return x.id !== 'ges' || form(d) === 'lang'; }); }
  function auswerten(d) {
    var r = roh(d);
    var zeilen = teileFuer(d).map(function (x) {
      var iq = E.zahl('tests.cft.norm.iq.' + x.id, 40, 160, true), t = E.zahl('tests.cft.norm.t.' + x.id, 20, 80, true), pr = E.zahl('tests.cft.norm.pr.' + x.id, 0.1, 99.9);
      return { id: x.id, name: x.name, bei: x.bei, roh: r[x.id], iq: iq, t: t, pr: pr, band: einstufung(iq, t, pr) };
    });
    var erg = ERG.map(function (x) {
      var t = E.zahl('tests.cft.erg.t.' + x.id, 20, 80, true), pr = E.zahl('tests.cft.erg.pr.' + x.id, 0.1, 99.9);
      return { id: x.id, name: x.name, bei: x.bei, t: t, pr: pr, band: einstufung(null, t, pr) };
    });
    return { roh: r, zeilen: zeilen, erg: erg };
  }
  function chip(pfad, n) {
    if (/\.norm\.iq\./.test(pfad)) { return KAT.einstufen('cft-iq', n); }
    if (/\.erg\.t\./.test(pfad)) { return KAT.einstufen('t-leistung', n); }
    return null;
  }

  /* ---------------- Formular ---------------- */
  function rohUi(d) {
    var r = roh(d);
    function z(label, v, max) { return '<span><b>' + label + ':</b> ' + (v == null ? '–' : v + ' von ' + max) + '</span>'; }
    var h = z('Summe Teil 1', r.t1, MAX.t1);
    if (form(d) === 'lang') { h += z('Summe Teil 2', r.t2, MAX.t2) + z('Gesamtrohwert', r.ges, MAX.ges); }
    return '<p class="klein" style="display:flex;gap:18px;flex-wrap:wrap;margin-top:10px">' + h + '</p>';
  }
  /* Wortschatztest = deutscher Wortschatz: Hinweis, wenn Deutsch keine Familiensprache ist */
  function wsHinweis(d, fall) {
    var k = (fall && fall.kind) || {};
    var fam = (k.familiensprachen || []).concat(sprachenZerlegen(k.familiensprachenAndere).codes);
    if (d.deutschNichtErst || !fam.length || fam.indexOf('de') >= 0) { return ''; }
    if (E.zahl('tests.cft.erg.t.ws', 20, 80, true) == null && E.zahl('tests.cft.erg.pr.ws', 0.1, 99.9) == null) { return ''; }
    return E.hinweis('Der Wortschatztest erfasst den deutschen Wortschatz. Deutsch ist keine der angegebenen Familiensprachen (' + B.esc(sprachenText(k.familiensprachen, k.familiensprachenAndere, 'de')) + '). Wenn Deutsch nicht die Erstsprache ist, bitte den Haken setzen.', 'info');
  }
  function formular(d, fall) {
    var f = fall || FALL;
    var h = E.karte('<h2>Durchführung</h2><div class="raster">' + E.feld('tests.cft.datum', 'Datum', { typ: 'date' }) +
      E.auswahl('tests.cft.auflage', 'Auflage (Normen)', [['2006', AUFLAGEN['2006'].ui], ['2019', AUFLAGEN['2019'].ui]], { leer: '– bitte wählen –', neu: true }) +
      E.auswahl('tests.cft.form', 'Durchführungsart', [['kurz', 'Kurzform (Teil 1)'], ['lang', 'Langform (Teil 1 und 2)']], { neu: true }) +
      E.auswahl('tests.cft.testzeit', 'Testzeit in Teil 1', [['regulaer', 'regulär'], ['verlaengert', 'verlängert (+1 Min. je Untertest)']]) +
      E.auswahl('tests.cft.normart', 'Normen', [['alter', 'Altersnormen'], ['klasse', 'Klassennormen']], { neu: true }) +
      (d.normart === 'klasse'
        ? E.feld('tests.cft.klassenstufe', 'Klassenstufe der Normtabelle', { min: 3, max: 13, ganz: true, inputmode: 'numeric', hilfe: 'Klassenstufen der deutschen Normstichprobe (3 bis 10 bzw. 13)' })
        : E.feld('tests.cft.normgruppe', 'Altersgruppe der Normtabelle', { platzhalter: 'z. B. 10;0–10;5', hilfe: 'Jahre;Monate von–bis, wie in der Normtabelle' })) +
      E.sprachAuswahl('tests.cft.instruktion', 'Anweisungen gegeben auf', {}) + '</div>');
    var zeilen = [{ trenner: 'Teil 1' }].concat(UT.map(function (u) { return { id: 't1' + u.id, name: u.name, hinweis: (u.hinweis ? u.hinweis + ' · ' : '') + u.max[0] + ' Aufgaben', min: 0, max: u.max[0], ganz: true }; }));
    if (form(d) === 'lang') {
      zeilen = zeilen.concat([{ trenner: 'Teil 2' }]).concat(UT.map(function (u) { return { id: 't2' + u.id, name: u.name, hinweis: (u.hinweis ? u.hinweis + ' · ' : '') + u.max[1] + ' Aufgaben', min: 0, max: u.max[1], ganz: true }; }));
    }
    h += E.karte('<h2>Rohwerte</h2><p class="klein">Richtige Lösungen je Untertest, wie auf dem Auswertungsbogen. Das Tool bildet daraus die Rohwertsummen. Für einzelne Untertests gibt es keine Normwerte.</p>' +
      E.raster({ basis: 'tests.cft.roh', kopfSkala: 'Untertest', spalten: [{ id: 'w', label: 'Rohwert', ohneChip: true }], zeilen: zeilen, einstufen: function () { return null; } }) +
      '<div id="cft-roh">' + rohUi(d) + '</div>');
    h += E.karte('<h2>Normwerte</h2><p class="klein">IQ (Mittelwert 100, Standardabweichung 15), T-Wert (Mittelwert 50, Standardabweichung 10) und Prozentrang aus der Normtabelle – passend zu Auflage, Durchführungsart, Testzeit und Normgruppe. Normwerte gibt es nur für Teil 1 und den Gesamttest. Leere Felder erscheinen im Bericht nicht.</p>' +
      E.raster({ basis: 'tests.cft.norm', kopfSkala: 'Testteil', chipAmEnde: true, spalten: [
        { id: 'iq', label: 'IQ', min: 40, max: 160, ganz: true },
        { id: 't', label: 'T-Wert', min: 20, max: 80, ganz: true, ohneChip: true },
        { id: 'pr', label: 'PR', min: 0.1, max: 99.9, ganz: false, ohneChip: true }],
        zeilen: teileFuer(d).map(function (x) { return { id: x.id, name: B.t(x.name, 'de'), hinweis: x.id === 'ges' ? 'Hauptergebnis der Langform' : (form(d) === 'kurz' ? 'Ergebnis der Kurzform' : 'optional') }; }),
        einstufen: function (z, s, n) { return s === 'iq' ? KAT.einstufen('cft-iq', n) : null; } }));
    h += E.karte('<h2>Ergänzungstests WS/ZF-R (optional)</h2><p class="klein">Wortschatztest (WS) und Zahlenfolgentest (ZF) haben eigene Normen (T-Werte, Mittelwert 50, Standardabweichung 10). Leere Felder erscheinen im Bericht nicht.</p>' +
      E.raster({ basis: 'tests.cft.erg', kopfSkala: 'Ergänzungstest', chipAmEnde: true, spalten: [
        { id: 't', label: 'T-Wert', min: 20, max: 80, ganz: true },
        { id: 'pr', label: 'PR', min: 0.1, max: 99.9, ganz: false, ohneChip: true }],
        zeilen: ERG.map(function (x) { return { id: x.id, name: B.t(x.name, 'de'), hinweis: x.id === 'ws' ? 'Wortschatz der deutschen Sprache' : 'Regeln in Zahlenfolgen erkennen' }; }),
        einstufen: function (z, s, n) { return s === 't' ? KAT.einstufen('t-leistung', n) : null; } }) +
      '<div style="margin-top:12px">' + E.haken('tests.cft.deutschNichtErst', 'Deutsch ist nicht die Erstsprache des Kindes', 'Betrifft den Wortschatztest: Der Bericht weist dann darauf hin, dass dieses Ergebnis vorsichtig zu deuten ist.', true) + '</div>' +
      '<div id="cft-ws-hinweis">' + wsHinweis(d, f) + '</div>');
    return h;
  }
  function teilUpdate(d, fall) { return { 'cft-roh': rohUi(d), 'cft-ws-hinweis': wsHinweis(d, fall || FALL) }; }

  /* ---------------- Bericht ---------------- */
  var ZWECK = {
    de: 'Der CFT 20-R (Grundintelligenztest Skala 2 – Revision) erfasst die allgemeine intellektuelle Leistungsfähigkeit im Sinne der fluiden Intelligenz: die Fähigkeit, figurale Beziehungen und formallogische Denkprobleme zu erkennen und zu verarbeiten. Die Aufgaben sind sprachfrei; die Anweisungen werden mündlich gegeben. Der Test besteht aus zwei Teilen mit je vier Untertests (Reihenfortsetzen, Klassifikationen, Matrizen und Topologien). Normwerte gibt es für Teil 1 und für den Gesamttest, nicht für einzelne Untertests. IQ-Werte haben einen Mittelwert von 100 (Standardabweichung 15), T-Werte einen Mittelwert von 50 (Standardabweichung 10).',
    fr: 'Le CFT 20-R (Grundintelligenztest Skala 2 – Revision, test d’intelligence non verbal allemand) évalue les capacités intellectuelles générales au sens de l’intelligence fluide : la capacité à reconnaître et à traiter des relations entre figures et des problèmes de raisonnement logique. Les tâches sont non verbales ; les consignes sont données oralement. Le test comprend deux parties de quatre subtests chacune (continuer des séries, classifications, matrices et topologies). Des normes existent pour la partie 1 et pour le test complet, mais pas pour les subtests pris isolément. Les QI ont une moyenne de 100 (écart type 15), les notes T une moyenne de 50 (écart type 10).',
    en: 'The CFT 20-R (Grundintelligenztest Skala 2 – Revision, a German non-verbal intelligence test) assesses general intellectual ability in the sense of fluid intelligence: the ability to recognise and process relationships between figures and formal-logical reasoning problems. The tasks are non-verbal; instructions are given orally. The test consists of two parts with four subtests each (series continuation, classifications, matrices and topologies). Norms are available for Part 1 and for the full test, but not for individual subtests. IQ scores have a mean of 100 (standard deviation 15); T-scores have a mean of 50 (standard deviation 10).'
  };
  /* Absatz zu den Ergänzungstests (nur die tatsächlich eingetragenen) */
  function ergZweck(lang, ws, zf) {
    if (ws && zf) {
      return { de: 'Ergänzend wurden der Wortschatztest (WS) und der Zahlenfolgentest (ZF) aus dem WS/ZF-R durchgeführt; beide haben eigene Normen (T-Werte). Der Wortschatztest erfasst den Wortschatz der deutschen Sprache über den Grundwortschatz hinaus, der Zahlenfolgentest das Erkennen von Regeln und Gesetzmäßigkeiten in Zahlenfolgen.',
        fr: 'Le Wortschatztest (WS, vocabulaire) et le Zahlenfolgentest (ZF, suites numériques) du WS/ZF-R ont également été administrés ; ils disposent de leurs propres normes (notes T). Le premier évalue le vocabulaire allemand au-delà du vocabulaire de base, le second la reconnaissance de règles dans des suites de nombres.',
        en: 'The Wortschatztest (WS, vocabulary) and the Zahlenfolgentest (ZF, number series) from the WS/ZF-R were also administered; both have their own norms (T-scores). The former assesses German vocabulary beyond basic vocabulary, the latter the recognition of rules in number series.' }[lang];
    }
    if (ws) {
      return { de: 'Ergänzend wurde der Wortschatztest (WS) aus dem WS/ZF-R durchgeführt (eigene Normen in T-Werten). Er erfasst den Wortschatz der deutschen Sprache über den Grundwortschatz hinaus.',
        fr: 'Le Wortschatztest (WS, vocabulaire) du WS/ZF-R a également été administré (normes propres en notes T) ; il évalue le vocabulaire allemand au-delà du vocabulaire de base.',
        en: 'The Wortschatztest (WS, vocabulary) from the WS/ZF-R was also administered (with its own T-score norms); it assesses German vocabulary beyond basic vocabulary.' }[lang];
    }
    if (zf) {
      return { de: 'Ergänzend wurde der Zahlenfolgentest (ZF) aus dem WS/ZF-R durchgeführt (eigene Normen in T-Werten). Er erfasst das Erkennen von Regeln und Gesetzmäßigkeiten in Zahlenfolgen.',
        fr: 'Le Zahlenfolgentest (ZF, suites numériques) du WS/ZF-R a également été administré (normes propres en notes T) ; il évalue la reconnaissance de règles dans des suites de nombres.',
        en: 'The Zahlenfolgentest (ZF, number series) from the WS/ZF-R was also administered (with its own T-score norms); it assesses the recognition of rules in number series.' }[lang];
    }
    return '';
  }
  /* Altersgruppe „10;0–10;5“ → je Sprache */
  function normgruppeText(d, lang) {
    if (d.normart === 'klasse') {
      var k = E.zahl('tests.cft.klassenstufe', 3, 13, true);
      if (k == null) { return ''; }
      return lang === 'fr' ? 'niveau de classe ' + k + ' (système scolaire allemand)' : (lang === 'en' ? 'grade ' + k + ' (German school system)' : 'Klassenstufe ' + k);
    }
    var s = String(d.normgruppe || '').trim(), m = /^(\d{1,2});(\d{1,2})\s*[-–]\s*(\d{1,2});(\d{1,2})$/.exec(s);
    if (!s) { return ''; }
    if (!m) { return lang === 'de' ? 'Altersgruppe ' + s : ''; }
    var von = { j: +m[1], m: +m[2] }, bis = { j: +m[3], m: +m[4] };
    if (lang === 'fr') { return 'tranche d’âge de ' + B.alterText(von, 'fr') + ' à ' + B.alterText(bis, 'fr'); }
    if (lang === 'en') { return 'age band ' + B.alterText(von, 'en') + ' to ' + B.alterText(bis, 'en'); }
    return 'Altersgruppe ' + m[1] + ';' + m[2] + '–' + m[3] + ';' + m[4] + ' Jahre';
  }
  function durchfuehrungSatz(lang, d) {
    var kurz = form(d) === 'kurz', verl = d.testzeit === 'verlaengert';
    var s;
    if (lang === 'fr') {
      s = (kurz ? 'La forme courte (partie 1)' : 'La forme longue (parties 1 et 2)') + ' a été administrée ' + (verl ? (kurz ? 'avec un temps de passation prolongé' : 'avec un temps de passation prolongé pour la partie 1') : 'avec le temps de passation standard');
    } else if (lang === 'en') {
      s = 'The ' + (kurz ? 'short form (Part 1)' : 'long form (Parts 1 and 2)') + ' was administered ' + (verl ? (kurz ? 'with extended time limits' : 'with extended time limits for Part 1') : 'with the standard time limits');
    } else {
      s = 'Durchgeführt wurde die ' + (kurz ? 'Kurzform (Teil 1)' : 'Langform (Teil 1 und Teil 2)') + ' mit ' + (verl ? (kurz ? 'verlängerter Testzeit' : 'verlängerter Testzeit in Teil 1') : 'regulärer Testzeit');
    }
    var a = AUFLAGEN[d.auflage], ng = normgruppeText(d, lang), klasse = d.normart === 'klasse';
    var n;
    if (lang === 'fr') { n = 'Les résultats se réfèrent aux ' + (klasse ? 'normes par classe' : 'normes par âge') + (a ? ' ' + B.t(a.bezug, lang) : '') + (ng ? ', ' + ng : ''); }
    else if (lang === 'en') { n = 'The results are based on the ' + (klasse ? 'grade norms' : 'age norms') + (a ? ' ' + B.t(a.bezug, lang) : '') + (ng ? ', ' + ng : ''); }
    else { n = 'Die Ergebnisse beziehen sich auf die ' + (klasse ? 'Klassennormen' : 'Altersnormen') + (a ? ' ' + B.t(a.bezug, lang) : '') + (ng ? ', ' + ng : ''); }
    var teile = [s, n];
    if (d.instruktion) {
      var sp = spracheText(d.instruktion, lang);
      teile.push(lang === 'fr' ? 'Les consignes ont été données en ' + sp : (lang === 'en' ? 'Instructions were given in ' + sp : 'Die Anweisungen wurden auf ' + sp + ' gegeben'));
    }
    return teile.map(function (x) { return TX.satz(x, lang); }).join(' ');
  }
  /* „im durchschnittlichen Bereich“ · „se situe dans la moyenne“ / „est inférieur à la moyenne“ · „in the average range“ */
  function imBereich(band, lang) {
    var bn = B.t(band.name, lang);
    if (lang === 'fr') { return /^dans /.test(bn) ? 'se situe ' + bn : 'est ' + bn; }
    if (lang === 'en') { return 'in the ' + bn + ' range'; }
    return 'im ' + bn + 'en Bereich';
  }
  /* Zahlenspalten, die in keiner Zeile einen Wert haben, weglassen (z. B. Rohwert, wenn keine Rohwerte eingetragen sind) */
  function ohneLeereSpalten(tab, spalten) {
    var weg = spalten.filter(function (i) { return tab.zeilen.every(function (z) { return z[i] === '–'; }); });
    function filt(arr) { return arr.filter(function (x, i) { return weg.indexOf(i) < 0; }); }
    var zahl = [];
    (tab.zahlSpalten || []).forEach(function (i) { if (weg.indexOf(i) < 0) { zahl.push(i - weg.filter(function (w) { return w < i; }).length); } });
    return Object.assign({}, tab, { kopf: filt(tab.kopf), zeilen: tab.zeilen.map(filt), zahlSpalten: zahl });
  }
  /* Durchschnittsbereich eines Bands als „85–115“ (für die Anmerkung, immer passend zu den Grenzen) */
  function mitte(id) {
    var st = KAT.band(id).stufen;
    for (var i = 1; i < st.length; i++) { if (st[i].rang === 0) { return (st[i - 1].bis + 1) + '–' + st[i].bis; } }
    return '';
  }
  /* „einen IQ von 96 (T-Wert 47; PR 40)“ */
  function werteText(lang, z) {
    var haupt, rest = [];
    if (z.iq != null) { haupt = { de: 'einen IQ von ', fr: 'un QI de ', en: 'an IQ of ' }[lang] + z.iq; if (z.t != null) { rest.push(TX.einheit('T', lang) + ' ' + z.t); } }
    else if (z.t != null) { haupt = { de: 'einen T-Wert von ', fr: 'une note T de ', en: 'a T-score of ' }[lang] + z.t; }
    else { haupt = { de: 'einen Prozentrang von ', fr: 'un rang centile de ', en: 'a percentile rank of ' }[lang] + B.zahl(z.pr, lang); }
    if (z.pr != null && (z.iq != null || z.t != null)) { rest.push((lang === 'fr' ? 'rang centile ' : (lang === 'en' ? 'percentile rank ' : 'PR ')) + B.zahl(z.pr, lang)); }
    return haupt + (rest.length ? ' (' + rest.join('; ') + ')' : '');
  }
  function ergebnisSatz(lang, ctx, z) {
    var bei = B.t(z.bei, lang), w = werteText(lang, z);
    if (lang === 'fr') { return TX.satz(bei + ', ' + ctx.name + ' obtient ' + w + ' ; ce résultat ' + imBereich(z.band, lang), lang); }
    if (lang === 'en') { return TX.satz(bei + ', ' + ctx.name + ' obtains ' + w + ', which is ' + imBereich(z.band, lang), lang); }
    return TX.satz(bei + ' erreicht ' + ctx.name + ' ' + w + '; das Ergebnis liegt ' + imBereich(z.band, lang), lang);
  }
  function titel(lang) {
    return 'CFT 20-R – Grundintelligenztest Skala 2 – Revision' + (lang === 'fr' ? ' (test d’intelligence non verbal' : (lang === 'en' ? ' (non-verbal intelligence test' : ''));
  }
  function verfahrenZeile(lang, d) {
    var a = AUFLAGEN[d.auflage], ausw = auswerten(d);
    var t = titel(lang);
    if (lang === 'de') { t += a ? ' (' + a.quelle + ')' : ''; } else { t += (a ? '; ' + a.quelle : '') + ')'; }
    var teile = [form(d) === 'kurz' ? { de: 'Kurzform', fr: 'forme courte', en: 'short form' }[lang] : { de: 'Langform', fr: 'forme longue', en: 'long form' }[lang],
      d.normart === 'klasse' ? { de: 'Klassennormen', fr: 'normes par classe', en: 'grade norms' }[lang] : { de: 'Altersnormen', fr: 'normes par âge', en: 'age norms' }[lang]];
    var ws = ausw.erg[0].band, zf = ausw.erg[1].band;
    if (ws || zf) {
      var n = ws && zf ? { de: 'Wortschatztest (WS) und Zahlenfolgentest (ZF)', fr: 'le Wortschatztest (WS) et le Zahlenfolgentest (ZF)', en: 'the Wortschatztest (WS) and Zahlenfolgentest (ZF)' }[lang]
        : (ws ? { de: 'Wortschatztest (WS)', fr: 'le Wortschatztest (WS)', en: 'the Wortschatztest (WS)' }[lang] : { de: 'Zahlenfolgentest (ZF)', fr: 'le Zahlenfolgentest (ZF)', en: 'the Zahlenfolgentest (ZF)' }[lang]);
      teile.push({ de: 'mit ', fr: 'avec ', en: 'with ' }[lang] + n + { de: ' des WS/ZF-R', fr: ' du WS/ZF-R', en: ' of the WS/ZF-R' }[lang]);
    }
    if (d.datum) { teile.push(B.datum(d.datum, lang)); }
    return t + ': ' + teile.join(', ');
  }
  function bericht(lang, ctx, d, ausw) {
    var z = ausw.zeilen.filter(function (x) { return x.band; }), erg = ausw.erg.filter(function (x) { return x.band; });
    var bl = [{ t: 'p', text: ZWECK[lang] + (erg.length ? ' ' + ergZweck(lang, ausw.erg[0].band, ausw.erg[1].band) : '') }];
    bl.push({ t: 'p', text: durchfuehrungSatz(lang, d) });
    if (!z.length && !erg.length) { bl.push({ t: 'p', text: lang === 'fr' ? 'Aucune note normée n’a encore été saisie.' : (lang === 'en' ? 'No normed scores have been entered yet.' : 'Es wurden noch keine Normwerte eingegeben.') }); return bl; }
    var S = SPRACHE[lang].spalten;
    var kopf = [lang === 'fr' ? 'Épreuve' : (lang === 'en' ? 'Measure' : 'Kennwert'), lang === 'fr' ? 'Score brut' : (lang === 'en' ? 'Raw score' : 'Rohwert'), lang === 'fr' ? 'QI' : 'IQ', B.ersteGross(TX.einheit('T', lang)), S.pr, S.einstufung];
    var zeilen = z.map(function (x) { return [B.t(x.name, lang), x.roh == null ? '–' : String(x.roh), x.iq == null ? '–' : String(x.iq), x.t == null ? '–' : String(x.t), x.pr == null ? '–' : B.zahl(x.pr, lang), B.t(x.band.name, lang)]; })
      .concat(erg.map(function (x) { return [B.t(x.name, lang), '–', '–', x.t == null ? '–' : String(x.t), x.pr == null ? '–' : B.zahl(x.pr, lang), B.t(x.band.name, lang)]; }));
    var tab = ohneLeereSpalten({ t: 'tabelle', kopf: kopf, zahlSpalten: [1, 2, 3, 4], zeilen: zeilen }, [1, 2, 3, 4]);
    var mitRoh = tab.kopf.indexOf(kopf[1]) >= 0, kurz = form(d) === 'kurz';
    var anm = [];
    if (mitRoh) { anm.push(lang === 'fr' ? 'Score brut : nombre de réponses correctes (' + (kurz ? 'max. 56' : 'partie 1 : max. 56 ; test complet : max. 101') + ')' : (lang === 'en' ? 'Raw score: number of correct answers (' + (kurz ? 'max. 56' : 'Part 1: max. 56; full test: max. 101') + ')' : 'Rohwert: Anzahl richtiger Lösungen (' + (kurz ? 'max. 56' : 'Teil 1: max. 56; Gesamttest: max. 101') + ')')); }
    anm.push(lang === 'fr' ? 'QI : moyenne 100, écart type 15 ; notes T : moyenne 50, écart type 10' : (lang === 'en' ? 'IQ: mean 100, standard deviation 15; T-scores: mean 50, standard deviation 10' : 'IQ: Mittelwert 100, Standardabweichung 15; T-Werte: Mittelwert 50, Standardabweichung 10'));
    anm.push(lang === 'fr' ? 'Classification selon les écarts types : dans la moyenne = QI ' + mitte('cft-iq') + ', note T ' + mitte('t-leistung') + ' ou rang centile ' + mitte('pr-leistung')
      : (lang === 'en' ? 'Classification by standard deviations: average = IQ ' + mitte('cft-iq') + ', T-score ' + mitte('t-leistung') + ' or percentile rank ' + mitte('pr-leistung')
        : 'Einstufung nach Standardabweichungen: durchschnittlich = IQ ' + mitte('cft-iq') + ', T-Wert ' + mitte('t-leistung') + ' bzw. PR ' + mitte('pr-leistung')));
    tab.anmerkung = anm.join('. ') + '.';
    bl.push(tab);
    /* Hauptergebnis zuerst: Gesamttest (Langform), sonst Teil 1 */
    var t = [];
    var ges = z.filter(function (x) { return x.id === 'ges'; })[0], t1 = z.filter(function (x) { return x.id === 't1'; })[0];
    if (ges) { t.push(ergebnisSatz(lang, ctx, ges)); }
    if (t1) { t.push(ergebnisSatz(lang, ctx, t1)); }
    if (t.length) { bl.push({ t: 'p', text: t.join(' ') }); }
    if (erg.length) {
      var e = erg.map(function (x) { return ergebnisSatz(lang, ctx, x); });
      var ws = erg.filter(function (x) { return x.id === 'ws'; })[0];
      if (ws && d.deutschNichtErst) {
        var poss = ctx.g === 'w' ? 'her' : (ctx.g === 'm' ? 'his' : ctx.name + '’s');
        e.push(lang === 'fr' ? 'L’allemand n’étant pas la première langue de ' + ctx.name + ', le résultat au Wortschatztest est à interpréter avec prudence ; il peut sous-estimer ses compétences langagières.'
          : (lang === 'en' ? 'As German is not ' + ctx.name + '’s first language, the Wortschatztest result should be interpreted with caution; it may underestimate ' + poss + ' language skills.'
            : 'Da Deutsch nicht die Erstsprache von ' + ctx.name + ' ist, ist das Ergebnis im Wortschatztest vorsichtig zu deuten; es kann die sprachlichen Fähigkeiten unterschätzen.'));
      }
      bl.push({ t: 'p', text: e.join(' ') });
    }
    return bl;
  }
  function hauptzeile(ausw) {
    var z = ausw.zeilen.filter(function (x) { return x.band; });
    return z.filter(function (x) { return x.id === 'ges'; })[0] || z.filter(function (x) { return x.id === 't1'; })[0] || null;
  }
  function zusammenfassung(lang, ctx, d, ausw) {
    var h = hauptzeile(ausw), erg = ausw.erg.filter(function (x) { return x.band; });
    if (!h && !erg.length) { return ''; }
    var teile = [];
    function kurzWert(x) { return x.iq != null ? (lang === 'fr' ? 'QI de ' : 'IQ ') + x.iq : (x.t != null ? TX.einheit('T', lang) + ' ' + x.t : (lang === 'fr' ? 'rang centile ' : (lang === 'en' ? 'percentile rank ' : 'PR ')) + B.zahl(x.pr, lang)); }
    if (h) {
      var wo = h.id === 'ges' ? { de: 'im Gesamttest', fr: 'au test complet', en: 'on the full test' }[lang] : { de: 'in Teil 1', fr: 'à la partie 1', en: 'on Part 1' }[lang];
      teile.push(kurzWert(h) + ' ' + wo + ' (' + B.t(h.band.name, lang) + ')');
    }
    erg.forEach(function (x) { teile.push(B.t(x.name, lang) + (lang === 'fr' ? ' : ' : ': ') + kurzWert(x) + ' (' + B.t(x.band.name, lang) + ')'); });
    return (lang === 'fr' ? 'CFT 20-R : ' : 'CFT 20-R: ') + teile.join('; ') + '.';
  }
  /* Ist im Fall noch ein weiteres Intelligenzverfahren gewählt? */
  function andererIntelligenztest(ctx) {
    var fall = ctx && ctx.fall;
    if (!fall || !fall.tests) { return false; }
    return KAT.alle().some(function (t) { return t.id !== 'cft' && t.gruppe === 'intelligenz' && fall.tests[t.id] && fall.tests[t.id].aktiv; });
  }
  function hinweise(lang, ctx, d, ausw) {
    var h = hauptzeile(ausw), out = [];
    if (!h) { return out; }
    if (h.band.rang <= -2) {
      out.push(lang === 'fr' ? 'Un résultat très inférieur à la moyenne au CFT 20-R ne peut être interprété qu’en lien avec une évaluation intellectuelle plus complète, une évaluation du comportement adaptatif (p. ex. Vineland-3) et l’anamnèse développementale.'
        : (lang === 'en' ? 'A well below average CFT 20-R result can only be interpreted together with a more comprehensive intellectual assessment, an assessment of adaptive behaviour (e.g. Vineland-3) and the developmental history.'
          : 'Ein weit unterdurchschnittliches Ergebnis im CFT 20-R ist erst zusammen mit einer umfassenderen Intelligenzdiagnostik, einer Einschätzung der Alltagsfertigkeiten (z. B. Vineland-3) und der Entwicklungsgeschichte fachlich einzuordnen.'));
    } else if (h.band.rang === -1 && !andererIntelligenztest(ctx)) {
      out.push(lang === 'fr' ? 'Le CFT 20-R évalue surtout le raisonnement sur du matériel figuratif ; un résultat inférieur à la moyenne devrait être approfondi à l’aide d’un test d’intelligence individuel plus complet (p. ex. WISC-V ou KABC-II).'
        : (lang === 'en' ? 'The CFT 20-R mainly assesses reasoning with figural material; a below average result should be followed up with a more comprehensive individual intelligence test (e.g. WISC-V or KABC-II).'
          : 'Der CFT 20-R erfasst vor allem das schlussfolgernde Denken mit figuralem Material; ein unterdurchschnittliches Ergebnis sollte mit einem umfassenderen Einzeltest (z. B. WISC-V oder KABC-II) vertieft werden.'));
    }
    return out;
  }
  function warnung(d, fall) {
    /* alle zutreffenden Hinweise zusammen anzeigen */
    var w = [], a = B.alter(fall.kind.geburtsdatum, d.datum || fall.bericht.datumVon), auf = AUFLAGEN[d.auflage];
    var bis = auf ? auf.bis : 64;
    if (a && a.dezimal < 8 + 5 / 12) { w.push('Der CFT 20-R ist ab 8;5 Jahren normiert – das Kind ist ' + B.alterText(a, 'de') + ' alt.'); }
    if (a && a.j > bis) { w.push('Die Normen ' + (auf ? 'der ' + auf.ui.replace(/ \(.*$/, '') : 'des CFT 20-R') + ' reichen bis zum Alter von ' + bis + ' Jahren – die Person ist ' + B.alterText(a, 'de') + ' alt.'); }
    var ausw = auswerten(d);
    var hatNorm = ausw.zeilen.some(function (x) { return x.band; }) || ausw.erg.some(function (x) { return x.band; });
    if (hatNorm && !auf) { w.push('Bitte die Auflage wählen – die Normen der 1. und 2. Auflage unterscheiden sich, der Bericht nennt die Quelle.'); }
    /* IQ und T-Wert beschreiben dieselbe Position (T = 50 + (IQ − 100) × 10/15) – grobe Abweichung = Tippfehler? */
    var falsch = ausw.zeilen.filter(function (x) { return x.iq != null && x.t != null && Math.abs(50 + (x.iq - 100) * 10 / 15 - x.t) > 2; });
    if (falsch.length) { w.push('Bei ' + falsch.map(function (x) { return B.t(x.name, 'de'); }).join(', ') + ' passen IQ und T-Wert nicht zusammen (IQ 100 entspricht T 50, IQ 115 entspricht T 60) – bitte prüfen.'); }
    if (d.normart !== 'klasse' && String(d.normgruppe || '').trim() && !/^(\d{1,2});(\d{1,2})\s*[-–]\s*(\d{1,2});(\d{1,2})$/.test(String(d.normgruppe).trim())) { w.push('Altersgruppe bitte als Jahre;Monate von–bis eingeben, z. B. 10;0–10;5 (sonst erscheint sie nur im deutschen Bericht).'); }
    if (a && a.j >= 20 && ausw.erg.some(function (x) { return x.band; })) { w.push('Die Normen des WS/ZF-R wurden an Schülerinnen und Schülern von 8;5 bis 19 Jahren erhoben – bitte die Normgrundlage prüfen.'); }
    return w.join(' ');
  }
  function fertig(d) { var h = hauptzeile(auswerten(d)); return !!(h && AUFLAGEN[d.auflage]); }
  /* Übernahme aus v1: nur der Gesamt-IQ (Teil 1+2) und sein PR sind echte Normwerte.
     Die „IQ-Äquivalente“ der Untertests (es gibt keine Untertestnormen) und WS/ZF
     (Feld „IQ“, Normtabellen des WS/ZF-R sind T-Werte) werden nicht übernommen. */
  function ausAlt(alt) {
    var f = alt.fields || {}, d = neu(), hat = false;
    if (f['cft-iq'] != null && f['cft-iq'] !== '') { d.norm.iq.ges = String(f['cft-iq']); hat = true; }
    if (hat && f['cft-pr'] != null && f['cft-pr'] !== '') { d.norm.pr.ges = String(f['cft-pr']); }
    if (!hat) { return null; }
    d.form = 'lang';
    return d;
  }
  KAT.registrieren({
    id: 'cft', kurz: 'CFT 20-R', name: L('CFT 20-R – Grundintelligenztest Skala 2 – Revision', 'CFT 20-R – Grundintelligenztest Skala 2 – Revision (test d’intelligence non verbal)', 'CFT 20-R – Grundintelligenztest Skala 2 – Revision (non-verbal intelligence test)'),
    gruppe: 'intelligenz', alter: [8, 64], informantenText: 'Einzel- oder Gruppentest',
    hilfe: 'Rohwerte der Untertests eintragen – die Summen rechnet das Tool. IQ, T-Wert und Prozentrang aus der Normtabelle (nur Teil 1 und Gesamttest).',
    neu: neu, formular: formular, auswerten: auswerten, chip: chip, teilUpdate: teilUpdate, bericht: bericht, verfahrenZeile: verfahrenZeile,
    zusammenfassung: zusammenfassung, hinweise: hinweise, warnung: warnung, fertig: fertig, ausAlt: ausAlt,
    pruefen: ['Bezeichnungen der Durchführungsarten und Testzeiten laut Manual (hier: Kurzform = Teil 1, Langform = Teil 1 und 2; reguläre bzw. verlängerte Testzeit in Teil 1) sowie der Untertestname „Topologien“ (auch „topologisches Schlussfolgern“).',
      'Altersbereich je Auflage: 8;5–19;11 Jahre sowie Erwachsene 20–60 (1. Auflage) bzw. 20–64 Jahre (2. Auflage).',
      'Ob der Auswertungsbogen neben IQ, T-Wert und PR auch Standardwerte (SW) ausweist, die in den Bericht sollen.',
      'WS/ZF-R: Normmetrik (hier T-Wert und PR), Altersbereich der Normen (8;5–19 Jahre) und die getrennten Normen des Zahlenfolgentests je Testzeit.',
      'Französische und englische Umschreibungen (keine französische/englische Fassung): „test d’intelligence non verbal“, „non-verbal intelligence test“, „Wortschatztest (WS, vocabulaire)“ usw.',
      'Übernahme aus der alten Version: nur Gesamt-IQ und PR (Teil 1+2); „IQ-Äquivalente“ der Untertests und WS/ZF (Metrik unklar) werden nicht übernommen.']
  });
})();
