/* =====================================================================
   WISC-V – Wechsler Intelligence Scale for Children – Fifth Edition
   ---------------------------------------------------------------------
   Eingabe wie auf dem Protokollbogen: Wertpunkte der Untertests,
   Indexwerte mit Prozentrang und Konfidenzintervall aus der Normtabelle
   bzw. dem Auswertungsprogramm. Das Tool rechnet keine Normwerte.
   Normen: deutsche Fassung (Petermann, 2017) oder französische Fassung
   (ECPA, 2016). Namen und Kürzel richten sich nach der Berichtssprache.
   ===================================================================== */
(function () {
  var L = KAT.L;
  /* Indizes: Name und Kürzel je Sprache. DE-Kürzel am Protokollbogen prüfen. */
  var INDIZES = [
    { id: 'sv', name: L('Sprachverständnis', 'Compréhension verbale', 'Verbal Comprehension'), kurz: L('SVI', 'ICV', 'VCI'), primaer: true },
    { id: 'vr', name: L('Visuell-räumliche Verarbeitung', 'Visuospatial', 'Visual Spatial'), kurz: L('VRI', 'IVS', 'VSI'), primaer: true },
    { id: 'fs', name: L('Fluides Schlussfolgern', 'Raisonnement fluide', 'Fluid Reasoning'), kurz: L('FSI', 'IRF', 'FRI'), primaer: true },
    { id: 'ag', name: L('Arbeitsgedächtnis', 'Mémoire de travail', 'Working Memory'), kurz: L('AGI', 'IMT', 'WMI'), primaer: true },
    { id: 'vg', name: L('Verarbeitungsgeschwindigkeit', 'Vitesse de traitement', 'Processing Speed'), kurz: L('VGI', 'IVT', 'PSI'), primaer: true },
    { id: 'giq', name: L('Gesamt-IQ', 'QI total', 'Full Scale IQ'), kurz: L('GIQ', 'QIT', 'FSIQ'), gesamt: true },
    { id: 'nvi', name: L('Nonverbaler Index', 'Indice non verbal', 'Nonverbal Index'), kurz: L('NVI', 'INV', 'NVI'), sekundaer: true },
    { id: 'afi', name: L('Allgemeiner Fähigkeitsindex', 'Indice d’aptitude générale', 'General Ability Index'), kurz: L('AFI', 'IAG', 'GAI'), sekundaer: true },
    { id: 'kli', name: L('Kognitiver Leistungsindex', 'Indice de compétence cognitive', 'Cognitive Proficiency Index'), kurz: L('KLI', 'ICC', 'CPI'), sekundaer: true },
    { id: 'qs', name: L('Quantitatives Schlussfolgern', 'Raisonnement quantitatif', 'Quantitative Reasoning'), kurz: L('QSI', 'IRQ', 'QRI'), sekundaer: true },
    { id: 'aag', name: L('Auditives Arbeitsgedächtnis', 'Mémoire de travail auditive', 'Auditory Working Memory'), kurz: L('AAI', 'IMTA', 'AWMI'), sekundaer: true }
  ];
  /* Untertests (15) mit Zuordnung zum Primärindex; ergänzende Untertests markiert */
  var UNTERTESTS = [
    { id: 'gf', index: 'sv', name: L('Gemeinsamkeiten finden', 'Similitudes', 'Similarities'), kurz: L('GF', 'SIM', 'SI') },
    { id: 'wt', index: 'sv', name: L('Wortschatz-Test', 'Vocabulaire', 'Vocabulary'), kurz: L('WT', 'VOC', 'VC') },
    { id: 'aw', index: 'sv', name: L('Allgemeines Wissen', 'Information', 'Information'), kurz: L('AW', 'INF', 'IN'), ergaenzend: true },
    { id: 'av', index: 'sv', name: L('Allgemeines Verständnis', 'Compréhension', 'Comprehension'), kurz: L('AV', 'COM', 'CO'), ergaenzend: true },
    { id: 'mt', index: 'vr', name: L('Mosaik-Test', 'Cubes', 'Block Design'), kurz: L('MT', 'CUB', 'BD') },
    { id: 'vp', index: 'vr', name: L('Visuelle Puzzles', 'Puzzles visuels', 'Visual Puzzles'), kurz: L('VP', 'PUZ', 'VP') },
    { id: 'mz', index: 'fs', name: L('Matrizen-Test', 'Matrices', 'Matrix Reasoning'), kurz: L('MZ', 'MAT', 'MR') },
    { id: 'fw', index: 'fs', name: L('Formenwaage', 'Balances', 'Figure Weights'), kurz: L('FW', 'BAL', 'FW') },
    { id: 'rd', index: 'fs', name: L('Rechnerisches Denken', 'Arithmétique', 'Arithmetic'), kurz: L('RD', 'ARI', 'AR'), ergaenzend: true },
    { id: 'zn', index: 'ag', name: L('Zahlen nachsprechen', 'Mémoire des chiffres', 'Digit Span'), kurz: L('ZN', 'MCH', 'DS') },
    { id: 'bs', index: 'ag', name: L('Bilder-Spanne', 'Mémoire des images', 'Picture Span'), kurz: L('BS', 'MIM', 'PS') },
    { id: 'bzf', index: 'ag', name: L('Buchstaben-Zahlen-Folgen', 'Séquence lettres-chiffres', 'Letter-Number Sequencing'), kurz: L('BZF', 'SLC', 'LN'), ergaenzend: true },
    { id: 'zst', index: 'vg', name: L('Zahlen-Symbol-Test', 'Code', 'Coding'), kurz: L('ZST', 'COD', 'CD') },
    { id: 'sys', index: 'vg', name: L('Symbol-Suche', 'Symboles', 'Symbol Search'), kurz: L('SYS', 'SYM', 'SS') },
    { id: 'dt', index: 'vg', name: L('Durchstreich-Test', 'Barrage', 'Cancellation'), kurz: L('DT', 'BAR', 'CA'), ergaenzend: true }
  ];
  /* Normen: „fassung“ für die Liste der Verfahren, „bezug“ für den Satz im Ergebnisteil */
  var NORMEN = {
    'de-2017': { fassung: L('deutsche Fassung: Petermann, 2017', 'version allemande : Petermann, 2017', 'German edition: Petermann, 2017'),
      bezug: L('die deutschen Normen (Petermann, 2017)', 'aux normes allemandes (Petermann, 2017)', 'the German norms (Petermann, 2017)') },
    'fr-2016': { fassung: L('französische Fassung: ECPA, 2016', 'version française : ECPA, 2016', 'French edition: ECPA, 2016'),
      bezug: L('die französischen Normen (ECPA, 2016)', 'aux normes françaises (ECPA, 2016)', 'the French norms (ECPA, 2016)') }
  };
  function normen(d) { return NORMEN[d.normen] || NORMEN['de-2017']; }
  function neu() { return { datum: '', normen: 'de-2017', ki: '95', testsprache: '', instruktion: '', nichtErstsprache: false, idx: { wert: {}, pr: {}, kiVon: {}, kiBis: {} }, wp: { wp: {} }, profil: '' }; }
  function iwert(d, id, feld) {
    var grenzen = { wert: [40, 160], pr: [0.1, 99.9], kiVon: [40, 160], kiBis: [40, 160] }[feld];
    return E.zahl('tests.wisc.idx.' + feld + '.' + id, grenzen[0], grenzen[1], feld !== 'pr');
  }
  function auswerten(d) {
    var zeilen = INDIZES.map(function (x) {
      var w = iwert(d, x.id, 'wert'), von = iwert(d, x.id, 'kiVon'), bis = iwert(d, x.id, 'kiBis');
      return { id: x.id, name: x.name, kurz: x.kurz, wert: w, pr: iwert(d, x.id, 'pr'), ki: (von != null && bis != null && von <= bis) ? { von: von, bis: bis, niveau: d.ki || '95' } : null,
        metrik: 'index', band: w == null ? null : KAT.einstufen('wechsler-7', w), primaer: x.primaer, gesamt: x.gesamt, sekundaer: x.sekundaer };
    });
    var ut = UNTERTESTS.map(function (u) {
      var w = E.zahl('tests.wisc.wp.wp.' + u.id, 1, 19, true);
      return { id: u.id, name: u.name, kurz: u.kurz, index: u.index, wert: w, band: w == null ? null : KAT.einstufen('wp', w), ergaenzend: u.ergaenzend };
    });
    return { zeilen: zeilen, untertests: ut };
  }
  function chip(pfad, n) {
    if (/\.idx\.wert\./.test(pfad)) { return KAT.einstufen('wechsler-7', n); }
    if (/\.wp\.wp\./.test(pfad)) { return KAT.einstufen('wp', n); }
    return null;
  }
  /* Ist die Testsprache eine der Familiensprachen? (nur als Hinweis im Formular) */
  function spracheHinweis(d, fall) {
    var ts = d.testsprache ? (spracheErkennen(d.testsprache) || d.testsprache) : '';
    var fam = ((fall.kind || {}).familiensprachen || []).concat(sprachenZerlegen((fall.kind || {}).familiensprachenAndere).codes);
    if (!ts || !fam.length || d.nichtErstsprache || fam.indexOf(ts) >= 0) { return ''; }
    return E.hinweis('Die Testsprache (' + B.esc(spracheName(ts, 'de')) + ') ist keine der angegebenen Familiensprachen (' + B.esc(sprachenText((fall.kind || {}).familiensprachen, (fall.kind || {}).familiensprachenAndere, 'de')) + '). Wenn sie nicht die Erstsprache ist, bitte den Haken setzen.', 'info');
  }
  function formular(d, fall) {
    var h = E.karte('<h2>Durchführung</h2><div class="raster">' + E.feld('tests.wisc.datum', 'Datum', { typ: 'date' }) +
      E.auswahl('tests.wisc.normen', 'Normen', [['de-2017', 'Deutsche Fassung (Petermann, 2017)'], ['fr-2016', 'Version française (ECPA, 2016)']]) +
      E.auswahl('tests.wisc.ki', 'Konfidenzintervall', [['95', '95 %'], ['90', '90 %']]) +
      E.sprachAuswahl('tests.wisc.testsprache', 'Testsprache', { neu: true }) +
      E.sprachAuswahl('tests.wisc.instruktion', 'Erklärungen zusätzlich auf (optional)', { leer: '– keine –' }) + '</div>' +
      '<div style="margin-top:12px">' + E.haken('tests.wisc.nichtErstsprache', 'Die Testsprache ist nicht die Erstsprache des Kindes', 'Dann weist der Bericht darauf hin, dass sprachgebundene Ergebnisse vorsichtig zu deuten sind.', true) + '</div>' +
      spracheHinweis(d, fall || FALL));
    h += E.karte('<h2>Indexwerte</h2><p class="klein">Aus dem Protokollbogen bzw. dem Auswertungsprogramm übernehmen: Indexwert, Prozentrang und Konfidenzintervall. Leere Felder erscheinen im Bericht nicht.</p>' +
      E.raster({ basis: 'tests.wisc.idx', kopfSkala: 'Index', chipAmEnde: true, spalten: [
        { id: 'wert', label: 'Indexwert', min: 40, max: 160, ganz: true },
        { id: 'pr', label: 'PR', min: 0.1, max: 99.9, ganz: false, ohneChip: true },
        { id: 'kiVon', label: 'KI von', min: 40, max: 160, ganz: true, ohneChip: true },
        { id: 'kiBis', label: 'KI bis', min: 40, max: 160, ganz: true, ohneChip: true }],
        zeilen: [{ trenner: 'Primärindizes und Gesamt-IQ' }].concat(INDIZES.filter(function (x) { return !x.sekundaer; }).map(function (x) { return { id: x.id, name: B.t(x.name, 'de') + ' (' + B.t(x.kurz, 'de') + ')' }; }))
          .concat([{ trenner: 'Sekundäre Indizes (optional)' }]).concat(INDIZES.filter(function (x) { return x.sekundaer; }).map(function (x) { return { id: x.id, name: B.t(x.name, 'de') + ' (' + B.t(x.kurz, 'de') + ')' }; })),
        einstufen: function (z, s, n) { return s === 'wert' ? KAT.einstufen('wechsler-7', n) : null; } }));
    var zeilen = [];
    ['sv', 'vr', 'fs', 'ag', 'vg'].forEach(function (ix) {
      zeilen.push({ trenner: B.t(INDIZES.filter(function (x) { return x.id === ix; })[0].name, 'de') });
      UNTERTESTS.filter(function (u) { return u.index === ix; }).forEach(function (u) { zeilen.push({ id: u.id, name: B.t(u.name, 'de') + ' (' + B.t(u.kurz, 'de') + ')', hinweis: u.ergaenzend ? 'ergänzender Untertest' : '', min: 1, max: 19, ganz: true }); });
    });
    h += E.karte('<h2>Untertests (Wertpunkte)</h2><p class="klein">Wertpunkte 1–19 (Mittelwert 10). Optional – erscheinen im Bericht als eigene Tabelle.</p>' +
      E.raster({ basis: 'tests.wisc.wp', kopfSkala: 'Untertest', spalten: [{ id: 'wp', label: 'Wertpunkte' }], zeilen: zeilen, einstufen: function (z, s, n) { return KAT.einstufen('wp', n); } }));
    h += E.karte('<h2>Stärken und Schwächen (optional)</h2>' + E.textfeld('tests.wisc.profil', 'Ergebnis der Profilanalyse laut Auswertungsprogramm (kritische Differenzen, Basisraten)', { zeilen: 3, platzhalter: 'z. B. Der Index Arbeitsgedächtnis ist signifikant niedriger als der Mittelwert der Primärindizes (kritische Differenz laut Manual).' }));
    return h;
  }
  var ZWECK = {
    de: 'Die WISC-V (Wechsler Intelligence Scale for Children – Fifth Edition) ist ein Intelligenztest für Kinder und Jugendliche von 6;0 bis 16;11 Jahren. Neben dem Gesamt-IQ erfasst sie fünf Bereiche: Sprachverständnis, visuell-räumliche Verarbeitung, fluides Schlussfolgern, Arbeitsgedächtnis und Verarbeitungsgeschwindigkeit. Index- und IQ-Werte haben einen Mittelwert von 100 (Standardabweichung 15), die Wertpunkte der Untertests einen Mittelwert von 10 (Standardabweichung 3).',
    fr: 'Le WISC-V (Échelle d’intelligence de Wechsler pour enfants – 5e édition) est un test d’intelligence pour les enfants et adolescents de 6 ans à 16 ans et 11 mois. Outre le QI total, il évalue cinq domaines : compréhension verbale, traitement visuospatial, raisonnement fluide, mémoire de travail et vitesse de traitement. Les indices et le QI ont une moyenne de 100 (écart type 15), les notes standard des subtests une moyenne de 10 (écart type 3).',
    en: 'The WISC-V (Wechsler Intelligence Scale for Children – Fifth Edition) is an intelligence test for children and adolescents aged 6;0 to 16;11. Besides the Full Scale IQ, it assesses five areas: verbal comprehension, visual spatial processing, fluid reasoning, working memory and processing speed. Index scores and the IQ have a mean of 100 (standard deviation 15); subtest scaled scores have a mean of 10 (standard deviation 3).'
  };
  function titel(lang) { return lang === 'fr' ? 'WISC-V – Échelle d’intelligence de Wechsler pour enfants, 5e édition' : (lang === 'en' ? 'WISC-V – Wechsler Intelligence Scale for Children, Fifth Edition' : 'WISC-V – Wechsler Intelligence Scale for Children – Fifth Edition'); }
  function verfahrenZeile(lang, d) {
    return titel(lang) + ' (' + B.t(normen(d).fassung, lang) + ')' + (d.datum ? ', ' + B.datum(d.datum, lang) : '');
  }
  /* Kopf der KI-Spalte: KI 95 % · IC 95 % · 95% CI */
  function kiKopf(lang, niveau) {
    niveau = niveau || '95';
    return lang === 'en' ? niveau + '% CI' : (lang === 'fr' ? 'IC ' : 'KI ') + B.prozent(niveau, lang);
  }
  /* Testsprache und Erklärungen: „auf Deutsch“ · „en allemand“ · „in German“ */
  function spracheSatz(lang, d) {
    if (!d.testsprache) { return ''; }
    var ts = spracheText(d.testsprache, lang);
    var ik = d.instruktion ? (spracheErkennen(d.instruktion) || SPRACHEN_LISTE.some(function (x) { return x[0] === d.instruktion; }) ? spracheText(d.instruktion, lang) : null) : '';
    var s;
    if (lang === 'fr') { s = 'Le test a été administré en ' + ts; }
    else if (lang === 'en') { s = 'The test was administered in ' + ts; }
    else { s = 'Durchgeführt wurde der Test auf ' + ts; }
    if (ik) {
      s += lang === 'fr' ? ' ; des explications ont en outre été données en ' + ik : (lang === 'en' ? '; additional explanations were given in ' + ik : '; Erklärungen wurden zusätzlich auf ' + ik + ' gegeben');
    } else if (ik === null) {
      /* früher frei eingegeben (z. B. „teilweise Luxemburgisch“) – unverändert übernehmen */
      s += ' (' + (lang === 'fr' ? 'consignes : ' : (lang === 'en' ? 'instructions: ' : 'Instruktion: ')) + d.instruktion + ')';
    }
    return s;
  }
  function bericht(lang, ctx, d, ausw) {
    var bl = [{ t: 'p', text: ZWECK[lang] }];
    var sp = [];
    sp.push(lang === 'fr' ? 'Les résultats se réfèrent ' + B.t(normen(d).bezug, lang) : (lang === 'en' ? 'The results are based on ' + B.t(normen(d).bezug, lang) : 'Die Ergebnisse beziehen sich auf ' + B.t(normen(d).bezug, lang)));
    var ss = spracheSatz(lang, d);
    if (ss) { sp.push(ss); }
    bl.push({ t: 'p', text: sp.map(function (x) { return TX.satz(x, lang); }).join(' ') });
    var z = ausw.zeilen.filter(function (x) { return x.wert != null; });
    if (!z.length) { bl.push({ t: 'p', text: lang === 'fr' ? 'Aucun indice n’a encore été saisi.' : (lang === 'en' ? 'No index scores have been entered yet.' : 'Es wurden noch keine Indexwerte eingegeben.') }); return bl; }
    var S = SPRACHE[lang].spalten;
    bl.push({ t: 'tabelle', kopf: [S.index, S.wert, S.pr, kiKopf(lang, d.ki), S.einstufung], zahlSpalten: [1, 2, 3],
      zeilen: z.map(function (x) { return [B.t(x.name, lang) + ' (' + B.t(x.kurz, lang) + ')', String(x.wert), x.pr != null ? B.zahl(x.pr, lang) : '–', x.ki ? x.ki.von + '–' + x.ki.bis : '–', B.t(x.band.name, lang)]; }),
      anmerkung: lang === 'fr' ? 'Indices et QI : moyenne 100, écart type 15. Classification selon le manuel.' : (lang === 'en' ? 'Index scores and IQ: mean 100, standard deviation 15. Classification according to the manual.' : 'Index- und IQ-Werte: Mittelwert 100, Standardabweichung 15. Einstufung nach Manual.') });
    var giq = z.filter(function (x) { return x.gesamt; })[0];
    var prim = z.filter(function (x) { return x.primaer; });
    var t = [];
    if (giq) { t.push(TX.gesamtSatz(lang, giq, lang === 'de' ? 'Gesamt-IQ (' + B.t(giq.kurz, lang) + ')' : (lang === 'fr' ? 'QI total (' + B.t(giq.kurz, lang) + ')' : 'Full Scale IQ (' + B.t(giq.kurz, lang) + ')'))); }
    if (prim.length) { t.push(TX.indexSaetze(lang, prim)); }
    var st = TX.streuungSatz(lang, prim, 15);
    if (st) { t.push(st); }
    bl.push({ t: 'p', text: t.join(' ') });
    var sek = z.filter(function (x) { return x.sekundaer; });
    if (sek.length) { bl.push({ t: 'p', text: (lang === 'fr' ? 'Indices complémentaires : ' : (lang === 'en' ? 'Secondary indices: ' : 'Sekundäre Indizes: ')) + TX.indexSaetze(lang, sek) }); }
    if (d.nichtErstsprache) {
      bl.push({ t: 'p', text: lang === 'fr' ? 'La langue du test n’étant pas la première langue de ' + ctx.name + ', les résultats qui dépendent fortement de la langue (en particulier la compréhension verbale) sont à interpréter avec prudence ; ils peuvent sous-estimer ses capacités.'
        : (lang === 'en' ? 'As the test language is not ' + ctx.name + '’s first language, results that depend heavily on language (especially verbal comprehension) should be interpreted with caution; they may underestimate ' + (ctx.g === 'w' ? 'her' : (ctx.g === 'm' ? 'his' : 'the child’s')) + ' abilities.'
          : 'Da die Testsprache nicht die Erstsprache von ' + ctx.name + ' ist, sind stark sprachgebundene Ergebnisse (insbesondere das Sprachverständnis) vorsichtig zu deuten; sie können die Fähigkeiten unterschätzen.') });
    }
    var ut = ausw.untertests.filter(function (u) { return u.wert != null; });
    if (ut.length) {
      bl.push({ t: 'tabelle', kopf: [S.untertest, lang === 'fr' ? 'Note standard' : (lang === 'en' ? 'Scaled score' : 'Wertpunkte'), S.einstufung], zahlSpalten: [1],
        zeilen: ut.map(function (u) { return [B.t(u.name, lang) + ' (' + B.t(u.kurz, lang) + ')' + (u.ergaenzend ? (lang === 'fr' ? ' – complémentaire' : (lang === 'en' ? ' – secondary' : ' – ergänzend')) : ''), String(u.wert), B.t(u.band.name, lang)]; }),
        anmerkung: lang === 'fr' ? 'Notes standard : moyenne 10, écart type 3.' : (lang === 'en' ? 'Scaled scores: mean 10, standard deviation 3.' : 'Wertpunkte: Mittelwert 10, Standardabweichung 3.') });
    }
    if (String(d.profil || '').trim()) { bl.push({ t: 'p', text: d.profil, frei: true }); }
    return bl;
  }
  function zusammenfassung(lang, ctx, d, ausw) {
    var giq = ausw.zeilen.filter(function (x) { return x.gesamt && x.wert != null; })[0];
    var prim = ausw.zeilen.filter(function (x) { return x.primaer && x.wert != null; });
    if (!giq && !prim.length) { return ''; }
    var teile = [];
    if (giq) { teile.push((lang === 'fr' ? 'QI total ' : (lang === 'en' ? 'Full Scale IQ ' : 'Gesamt-IQ ')) + giq.wert + ' (' + B.t(giq.band.name, lang) + ')'); }
    if (prim.length >= 2) {
      var max = prim.reduce(function (a, b) { return b.wert > a.wert ? b : a; }), min = prim.reduce(function (a, b) { return b.wert < a.wert ? b : a; });
      if (max.wert - min.wert >= 10) {
        teile.push(lang === 'fr' ? 'point fort relatif : ' + B.t(max.name, lang) + ' (' + max.wert + '), point faible relatif : ' + B.t(min.name, lang) + ' (' + min.wert + ')'
          : (lang === 'en' ? 'relative strength: ' + B.t(max.name, lang) + ' (' + max.wert + '), relative weakness: ' + B.t(min.name, lang) + ' (' + min.wert + ')'
            : 'relative Stärke: ' + B.t(max.name, lang) + ' (' + max.wert + '), relative Schwäche: ' + B.t(min.name, lang) + ' (' + min.wert + ')'));
      }
    }
    return (lang === 'fr' ? 'WISC-V : ' : 'WISC-V: ') + teile.join('; ') + '.';
  }
  function hinweise(lang, ctx, d, ausw) {
    var giq = ausw.zeilen.filter(function (x) { return x.gesamt && x.wert != null; })[0];
    if (giq && giq.wert <= 69) {
      return [lang === 'fr' ? 'Un QI total dans la zone ' + TX.q('très faible', 'fr') + ' ne peut être interprété qu’en lien avec une évaluation du comportement adaptatif (p. ex. Vineland-3) et de l’anamnèse développementale.'
        : (lang === 'en' ? 'A Full Scale IQ in the extremely low range can only be interpreted together with an assessment of adaptive behaviour (e.g. Vineland-3) and the developmental history.'
          : 'Ein Gesamt-IQ im Bereich „sehr niedrig“ ist erst zusammen mit einer Einschätzung der Alltagsfertigkeiten (z. B. Vineland-3) und der Entwicklungsgeschichte fachlich einzuordnen.')];
    }
    return [];
  }
  function warnung(d, fall) {
    var a = B.alter(fall.kind.geburtsdatum, d.datum || fall.bericht.datumVon);
    if (a && (a.dezimal < 6 || a.dezimal >= 17)) { return 'Die WISC-V ist für 6;0 bis 16;11 Jahre normiert – das Kind ist ' + B.alterText(a, 'de') + ' alt.'; }
    var z = auswerten(d).zeilen.filter(function (x) { return x.ki && x.wert != null && (x.wert < x.ki.von || x.wert > x.ki.bis); });
    if (z.length) { return 'Bei ' + z.map(function (x) { return B.t(x.kurz, 'de'); }).join(', ') + ' liegt der Indexwert außerhalb des eingegebenen Konfidenzintervalls – bitte prüfen.'; }
    return '';
  }
  function fertig(d) { var a = auswerten(d); return a.zeilen.some(function (x) { return x.gesamt && x.wert != null; }); }
  function ausAlt(alt) {
    var f = alt.fields || {}, m = { vci: 'sv', vsi: 'vr', fri: 'fs', wmi: 'ag', psi: 'vg', fsiq: 'giq', nvi: 'nvi', gai: 'afi', kli: 'kli' };
    var d = neu(), hat = false;
    Object.keys(m).forEach(function (k) { var v = f['wisc-' + k]; if (v != null && v !== '') { d.idx.wert[m[k]] = String(v); hat = true; } });
    if (!hat) { return null; }
    if (f['wisc-testlang']) { d.testsprache = spracheErkennen(f['wisc-testlang']) || f['wisc-testlang']; }
    if (f['wisc-instlang']) { d.instruktion = spracheErkennen(f['wisc-instlang']) || f['wisc-instlang']; }
    return d;
  }
  KAT.registrieren({
    id: 'wisc', kurz: 'WISC-V', name: L('WISC-V – Wechsler Intelligence Scale for Children – Fifth Edition', 'WISC-V – Échelle d’intelligence de Wechsler pour enfants, 5e édition', 'WISC-V – Wechsler Intelligence Scale for Children, Fifth Edition'),
    gruppe: 'intelligenz', alter: [6, 16], informantenText: 'Einzeltest',
    hilfe: 'Werte aus dem Protokollbogen oder dem Auswertungsprogramm übernehmen. Das Tool berechnet keine Normwerte.',
    neu: neu, formular: formular, auswerten: auswerten, chip: chip, bericht: bericht, verfahrenZeile: verfahrenZeile, zusammenfassung: zusammenfassung,
    hinweise: hinweise, warnung: warnung, fertig: fertig, ausAlt: ausAlt,
    pruefen: ['Deutsche Kürzel der Indizes (SVI, VRI, FSI, AGI, VGI, GIQ, NVI, AFI, KLI, QSI, AAI) am deutschen Protokollbogen bestätigen.',
      'Deutsche Namen/Kürzel der Untertests, v. a. „Formenwaage“ (FW) und „Bilder-Spanne“ (BS).',
      'Deutsche Bezeichnungen der 7 Klassifikationsstufen (hier: sehr niedrig … sehr hoch).']
  });
})();
