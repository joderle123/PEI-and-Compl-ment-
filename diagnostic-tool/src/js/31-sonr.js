/* =====================================================================
   SON-R – Snijders-Oomen Non-verbaler Intelligenztest (Hogrefe)
   ---------------------------------------------------------------------
   Drei Versionen mit eigenem Untertestsatz:
   · SON-R 2½-7 (Tellegen, Laros & Petermann, 2007), 2;6–7;11 Jahre:
     Mosaike, Kategorien, Puzzles, Analogien, Situationen, Zeichenmuster;
     SON-IQ, Handlungsskala (Mosaike, Puzzles, Zeichenmuster) und
     Denkskala (Kategorien, Analogien, Situationen)
   · SON-R 2-8 (deutsche Ausgabe 2018 – am Manual prüfen), gleiche sechs
     Untertests und Skalen
   · SON-R 6-40 (Tellegen, Laros & Petermann, 2012), 6;0–40;11 Jahre:
     Kategorien, Mosaike, Analogien, Zeichenmuster; SON-IQ
   Eingabe: Wertpunkte (1–19, M 10, SD 3), IQ-Werte (M 100, SD 15) und
   Prozentränge aus dem Protokollbogen; optional Referenzalter und die
   kritische Differenz Handlungs-/Denkskala aus dem Manual. Das Tool
   rechnet keine Normwerte. Bänder für IQ und Wertpunkte sind aufeinander
   abgestimmt (±1 SD: IQ 85–115 ↔ Wertpunkte 7–13); Hinweistexte werden
   aus denselben Grenzen erzeugt.
   ===================================================================== */
(function () {
  var L = KAT.L;
  var UNTERTESTS = {
    mos: { name: L('Mosaike', 'Mosaïques', 'Mosaics'), skala: 'hs' },
    kat: { name: L('Kategorien', 'Catégories', 'Categories'), skala: 'ds' },
    puz: { name: L('Puzzles', 'Puzzles', 'Puzzles'), skala: 'hs' },
    ana: { name: L('Analogien', 'Analogies', 'Analogies'), skala: 'ds' },
    sit: { name: L('Situationen', 'Situations', 'Situations'), skala: 'ds' },
    zei: { name: L('Zeichenmuster', 'Motifs', 'Patterns'), skala: 'hs' }
  };
  var KENNWERTE = {
    gesamt: { name: L('SON-IQ', 'SON-IQ', 'SON-IQ') },
    hs: { name: L('Handlungsskala', 'Échelle de performance', 'Performance Scale') },
    ds: { name: L('Denkskala', 'Échelle de raisonnement', 'Reasoning Scale') }
  };
  var VERSIONEN = {
    '2.5-7': { kurz: 'SON-R 2½-7', ui: 'SON-R 2½-7 (2;6–7;11)', quelle: 'Tellegen, Laros & Petermann, 2007', von: 2.5, bis: 8,
      alter: L('2;6 bis 7;11 Jahren', '2 ans et 6 mois à 7 ans et 11 mois', '2;6 to 7;11'), wer: L('Kinder', 'les enfants', 'children'),
      ut: ['mos', 'kat', 'puz', 'ana', 'sit', 'zei'], skalen: true },
    '2-8': { kurz: 'SON-R 2-8', ui: 'SON-R 2-8 (2;0–8;11)', quelle: 'Tellegen, Laros & Petermann, 2018', von: 2, bis: 9,
      alter: L('2;0 bis 8;11 Jahren', '2 ans à 8 ans et 11 mois', '2;0 to 8;11'), wer: L('Kinder', 'les enfants', 'children'),
      ut: ['mos', 'kat', 'puz', 'ana', 'sit', 'zei'], skalen: true },
    '6-40': { kurz: 'SON-R 6-40', ui: 'SON-R 6-40 (6;0–40;11)', quelle: 'Tellegen, Laros & Petermann, 2012', von: 6, bis: 41,
      alter: L('6;0 bis 40;11 Jahren', '6 ans à 40 ans et 11 mois', '6;0 to 40;11'), wer: L('Kinder, Jugendliche und Erwachsene', 'les enfants, les adolescents et les adultes', 'children, adolescents and adults'),
      ut: ['kat', 'mos', 'ana', 'zei'], skalen: false }
  };
  var SKALA_UI = { hs: 'Handlungsskala', ds: 'Denkskala' };
  /* IQ-Werte: statistisch nach Standardabweichungen (Grenzen wie 'iq-5') */
  KAT.bandDefinieren('sonr-iq', { art: 'leistung', stufen: KAT.band('iq-5').stufen,
    pruefen: 'SON-R: Einstufung der IQ-Werte (hier statistisch: 85–115 durchschnittlich) und ihre Bezeichnungen am Manual prüfen.' });
  /* Wertpunkte (M 10, SD 3): dieselben Standardabweichungs-Grenzen wie beim IQ → 7–13 durchschnittlich */
  KAT.bandDefinieren('sonr-wp', { art: 'leistung', pruefen: 'SON-R: Einstufung der Wertpunkte (hier statistisch: 7–13 durchschnittlich, passend zu IQ 85–115) und ihre Bezeichnungen am Manual prüfen.', stufen: [
    { bis: 3, rang: -2, name: L('weit unterdurchschnittlich', 'très inférieur à la moyenne', 'well below average') },
    { bis: 6, rang: -1, name: L('unterdurchschnittlich', 'inférieur à la moyenne', 'below average') },
    { bis: 13, rang: 0, name: L('durchschnittlich', 'dans la moyenne', 'average') },
    { bis: 16, rang: 1, name: L('überdurchschnittlich', 'supérieur à la moyenne', 'above average') },
    { bis: Infinity, rang: 2, name: L('weit überdurchschnittlich', 'très supérieur à la moyenne', 'well above average') }] });

  function neu() { return { version: '', datum: '', instruktion: '', sprache: '', iq: { wert: {}, pr: {} }, wp: { wp: {} }, referenzalter: '', kritDiff: '' }; }
  function version(d) { return VERSIONEN[d.version] || null; }
  var RA = /^\s*(\d{1,2})\s*;\s*(\d{1,2})\s*$/;
  function referenzalter(d) {
    var m = RA.exec(String(d.referenzalter || ''));
    if (!m || +m[2] > 11) { return null; }
    return { j: +m[1], m: +m[2] };
  }
  function auswerten(d) {
    var v = version(d);
    var kw = ['gesamt'].concat(v && v.skalen ? ['hs', 'ds'] : []).map(function (id) {
      var w = E.zahl('tests.sonr.iq.wert.' + id, 40, 160, true);
      return { id: id, name: KENNWERTE[id].name, wert: w, pr: E.zahl('tests.sonr.iq.pr.' + id, 0.1, 99.9), band: w == null ? null : KAT.einstufen('sonr-iq', w) };
    });
    var ut = (v ? v.ut : []).map(function (id) {
      var w = E.zahl('tests.sonr.wp.wp.' + id, 1, 19, true);
      return { id: id, name: UNTERTESTS[id].name, skala: UNTERTESTS[id].skala, wert: w, band: w == null ? null : KAT.einstufen('sonr-wp', w) };
    });
    var hs = kw[1], ds = kw[2];
    var vergleich = hs && ds && hs.wert != null && ds.wert != null ? { diff: hs.wert - ds.wert, krit: E.zahl('tests.sonr.kritDiff', 1, 60, true) } : null;
    return { version: v, kennwerte: kw, ut: ut, referenzalter: referenzalter(d), vergleich: vergleich };
  }
  function chip(pfad, n) {
    if (/\.iq\.wert\./.test(pfad)) { return KAT.einstufen('sonr-iq', n); }
    if (/\.wp\.wp\./.test(pfad)) { return KAT.einstufen('sonr-wp', n); }
    return null;
  }
  /* „≤ 3 weit unterdurchschnittlich · 4–6 … · ≥ 17 …“ – aus den Grenzen des Bands, damit Hinweis und Einstufung nie auseinanderlaufen */
  function bandText(id, lang) {
    var st = KAT.band(id).stufen;
    return st.map(function (s, i) {
      var von = i === 0 ? null : st[i - 1].bis + 1;
      return (von == null ? '≤' + B.NBSP + s.bis : (s.bis === Infinity ? '≥' + B.NBSP + von : von + '–' + s.bis)) + ' ' + B.t(s.name, lang || 'de');
    }).join(' · ');
  }
  /* Zahlenspalten ohne jeden Wert weglassen (z. B. PR, wenn nirgends eingetragen) */
  function ohneLeereSpalten(tab, spalten) {
    var weg = spalten.filter(function (i) { return tab.zeilen.every(function (z) { return z[i] === '–'; }); });
    function filt(arr) { return arr.filter(function (x, i) { return weg.indexOf(i) < 0; }); }
    var zahl = [];
    (tab.zahlSpalten || []).forEach(function (i) { if (weg.indexOf(i) < 0) { zahl.push(i - weg.filter(function (w) { return w < i; }).length); } });
    return Object.assign({}, tab, { kopf: filt(tab.kopf), zeilen: tab.zeilen.map(filt), zahlSpalten: zahl });
  }
  function mitte(id) {
    var st = KAT.band(id).stufen;
    for (var i = 1; i < st.length; i++) { if (st[i].rang === 0) { return (st[i - 1].bis + 1) + '–' + st[i].bis; } }
    return '';
  }

  /* ---------------- Formular ---------------- */
  function formular(d) {
    var v = version(d);
    var h = E.karte('<h2>Durchführung</h2><div class="raster">' + E.feld('tests.sonr.datum', 'Datum', { typ: 'date' }) +
      E.auswahl('tests.sonr.version', 'Version', Object.keys(VERSIONEN).map(function (k) { return [k, VERSIONEN[k].ui]; }), { leer: '– bitte wählen –', neu: true }) +
      E.auswahl('tests.sonr.instruktion', 'Instruktion', [['nonverbal', 'nonverbal (Gesten und Vormachen)'], ['verbal', 'mündlich'], ['beides', 'mündlich und nonverbal']], { leer: '– bitte wählen –', neu: true }) +
      (d.instruktion === 'verbal' || d.instruktion === 'beides' ? E.sprachAuswahl('tests.sonr.sprache', 'Sprache der mündlichen Instruktion', {}) : '') + '</div>');
    if (!v) {
      var da = Object.keys(UNTERTESTS).filter(function (id) { return E.zahl('tests.sonr.wp.wp.' + id, 1, 19, true) != null; });
      return h + E.hinweis('Bitte zuerst die Version wählen – Untertests und Kennwerte unterscheiden sich je Version.' +
        (da.length ? ' Bereits eingetragen (z. B. aus der früheren Version übernommen): ' + B.esc(da.map(function (id) { return B.t(UNTERTESTS[id].name, 'de'); }).join(', ')) + '.' : ''), 'info');
    }
    var kz = ['gesamt'].concat(v.skalen ? ['hs', 'ds'] : []);
    h += E.karte('<h2>Kennwerte</h2><p class="klein">IQ-Werte (Mittelwert 100, Standardabweichung 15) und Prozentränge aus dem Protokollbogen bzw. dem Auswertungsprogramm. Einstufung: ' + bandText('sonr-iq') + '.</p>' +
      E.raster({ basis: 'tests.sonr.iq', kopfSkala: 'Kennwert', spalten: [{ id: 'wert', label: 'IQ-Wert', min: 40, max: 160, ganz: true }, { id: 'pr', label: 'PR', min: 0.1, max: 99.9, ganz: false, ohneChip: true }],
        zeilen: kz.map(function (id) { return { id: id, name: B.t(KENNWERTE[id].name, 'de'), hinweis: id === 'hs' ? 'Mosaike, Puzzles, Zeichenmuster' : (id === 'ds' ? 'Kategorien, Analogien, Situationen' : 'Gesamtwert') }; }),
        einstufen: function (z, s, n) { return s === 'wert' ? KAT.einstufen('sonr-iq', n) : null; } }));
    h += E.karte('<h2>Untertests (Wertpunkte)</h2><p class="klein">Wertpunkte 1–19 (Mittelwert 10, Standardabweichung 3) in der Reihenfolge des Protokollbogens. Einstufung: ' + bandText('sonr-wp') + '.</p>' +
      E.raster({ basis: 'tests.sonr.wp', kopfSkala: 'Untertest', spalten: [{ id: 'wp', label: 'Wertpunkte' }],
        zeilen: v.ut.map(function (id) { return { id: id, name: B.t(UNTERTESTS[id].name, 'de'), hinweis: v.skalen ? SKALA_UI[UNTERTESTS[id].skala] : '', min: 1, max: 19, ganz: true }; }),
        einstufen: function (z, s, n) { return KAT.einstufen('sonr-wp', n); } }));
    h += E.karte('<h2>Weitere Angaben (optional)</h2><div class="raster">' +
      E.feld('tests.sonr.referenzalter', 'Referenzalter (Jahre;Monate)', { platzhalter: 'z. B. 5;3', hilfe: 'Alter, in dem die erreichte Gesamtleistung dem mittleren Ergebnis der Normstichprobe entspricht' }) +
      (v.skalen ? E.feld('tests.sonr.kritDiff', 'Kritische Differenz Handlungs-/Denkskala', { min: 1, max: 60, ganz: true, inputmode: 'numeric', hilfe: 'Aus dem Manual. Nur wenn eingetragen, bewertet der Bericht den Unterschied zwischen den Skalen.' }) : '') + '</div>');
    return h;
  }

  /* ---------------- Bericht ---------------- */
  function zweck(lang, v) {
    var ohne = { de: 'bei dem weder die Aufgaben noch die Antworten Sprache erfordern; die Instruktion kann nonverbal (durch Gesten und Vormachen) oder mündlich gegeben werden',
      fr: 'dans lequel ni les tâches ni les réponses ne nécessitent de langage ; les consignes peuvent être données de manière non verbale (gestes et démonstration) ou oralement',
      en: 'in which neither the tasks nor the answers require language; instructions can be given non-verbally (gestures and demonstration) or orally' }[lang];
    var metrik = { de: 'IQ-Werte haben einen Mittelwert von 100 (Standardabweichung 15), die Wertpunkte der Untertests einen Mittelwert von 10 (Standardabweichung 3).',
      fr: 'Les QI ont une moyenne de 100 (écart type 15), les notes standard des subtests une moyenne de 10 (écart type 3).',
      en: 'IQ scores have a mean of 100 (standard deviation 15); subtest scaled scores have a mean of 10 (standard deviation 3).' }[lang];
    if (!v) {
      return lang === 'fr' ? 'Le SON-R (test d’intelligence non verbal de Snijders-Oomen) est un test d’intelligence ' + ohne + '. ' + metrik
        : (lang === 'en' ? 'The SON-R (Snijders-Oomen Nonverbal Intelligence Test) is an intelligence test ' + ohne + '. ' + metrik
          : 'Der SON-R (Snijders-Oomen Non-verbaler Intelligenztest) ist ein Intelligenztest, ' + ohne + '. ' + metrik);
    }
    var namen = B.liste(v.ut.map(function (id) { return B.t(UNTERTESTS[id].name, lang); }), lang);
    var aufbau;
    if (v.skalen) {
      aufbau = lang === 'fr' ? 'Les six subtests (' + namen + ') forment une échelle de performance (Mosaïques, Puzzles, Motifs) et une échelle de raisonnement (Catégories, Analogies, Situations) ; ensemble, ils donnent le SON-IQ.'
        : (lang === 'en' ? 'The six subtests (' + namen + ') form a Performance Scale (Mosaics, Puzzles, Patterns) and a Reasoning Scale (Categories, Analogies, Situations); together they yield the SON-IQ.'
          : 'Die sechs Untertests (' + namen + ') bilden eine Handlungsskala (Mosaike, Puzzles, Zeichenmuster) und eine Denkskala (Kategorien, Analogien, Situationen); zusammen ergeben sie den SON-IQ.');
    } else {
      aufbau = lang === 'fr' ? 'Les quatre subtests (' + namen + ') donnent ensemble le SON-IQ.'
        : (lang === 'en' ? 'The four subtests (' + namen + ') together yield the SON-IQ.' : 'Die vier Untertests (' + namen + ') ergeben zusammen den SON-IQ.');
    }
    if (lang === 'fr') { return 'Le ' + v.kurz + ' (test d’intelligence non verbal de Snijders-Oomen) est un test d’intelligence pour ' + B.t(v.wer, lang) + ' de ' + B.t(v.alter, lang) + ', ' + ohne + '. ' + aufbau + ' ' + metrik; }
    if (lang === 'en') { return 'The ' + v.kurz + ' (Snijders-Oomen Nonverbal Intelligence Test) is an intelligence test for ' + B.t(v.wer, lang) + ' aged ' + B.t(v.alter, lang) + ' ' + ohne + '. ' + aufbau + ' ' + metrik; }
    return 'Der ' + v.kurz + ' (Snijders-Oomen Non-verbaler Intelligenztest) ist ein Intelligenztest für ' + B.t(v.wer, lang) + ' von ' + B.t(v.alter, lang) + ', ' + ohne + '. ' + aufbau + ' ' + metrik;
  }
  function instruktionSatz(lang, d) {
    var art = d.instruktion; if (!art) { return ''; }
    var sp = (art === 'verbal' || art === 'beides') && d.sprache ? spracheText(d.sprache, lang) : '';
    if (art === 'nonverbal') {
      return lang === 'fr' ? 'Les consignes ont été données de manière non verbale (gestes et démonstration)' : (lang === 'en' ? 'Instructions were given non-verbally (gestures and demonstration)' : 'Die Instruktion erfolgte nonverbal (durch Gesten und Vormachen)');
    }
    var s = lang === 'fr' ? 'Les consignes ont été données oralement' + (sp ? ' en ' + sp : '') : (lang === 'en' ? 'Instructions were given orally' + (sp ? ' in ' + sp : '') : 'Die Instruktion erfolgte mündlich' + (sp ? ' auf ' + sp : ''));
    if (art === 'beides') { s += lang === 'fr' ? ', complétées par des gestes et des démonstrations' : (lang === 'en' ? ', supplemented by gestures and demonstration' : ' und zusätzlich durch Gesten und Vormachen'); }
    return s;
  }
  function imBereich(band, lang) {
    var bn = B.t(band.name, lang);
    if (lang === 'fr') { return /^dans /.test(bn) ? 'se situe ' + bn : 'est ' + bn; }
    if (lang === 'en') { return 'in the ' + bn + ' range'; }
    return 'im ' + bn + 'en Bereich';
  }
  function klammer(lang, z, mitBand) {
    var t = [];
    if (z.pr != null) { t.push((lang === 'fr' ? 'rang centile ' : 'PR ') + B.zahl(z.pr, lang)); }
    if (mitBand) { t.push(B.t(z.band.name, lang)); }
    return t.length ? ' (' + t.join('; ') + ')' : '';
  }
  function gesamtSatz(lang, g) {
    var pr = g.pr != null ? ' (' + (lang === 'fr' ? 'rang centile ' : (lang === 'en' ? 'percentile rank ' : 'PR ')) + B.zahl(g.pr, lang) + ')' : '';
    if (lang === 'fr') { return TX.satz('Le SON-IQ est de ' + g.wert + pr + ' ; ce résultat ' + imBereich(g.band, lang), lang); }
    if (lang === 'en') { return TX.satz('The SON-IQ is ' + g.wert + pr + ', which is ' + imBereich(g.band, lang), lang); }
    return TX.satz('Der SON-IQ beträgt ' + g.wert + pr + ' und liegt damit ' + imBereich(g.band, lang), lang);
  }
  function skalenSatz(lang, sk) {
    var teile = sk.map(function (x) { var n = B.t(x.name, lang); return (lang === 'fr' ? n.charAt(0).toLowerCase() + n.slice(1) : n) + ' ' + x.wert + klammer(lang, x, true); });
    return TX.satz((lang === 'fr' ? 'Échelles : ' : (lang === 'en' ? 'Scales: ' : 'Skalenwerte: ')) + B.liste(teile, lang), lang);
  }
  function punkte(n, lang) { return n + (lang === 'de' ? (n === 1 ? ' Punkt' : ' Punkte') : (n === 1 ? ' point' : ' points')); }
  function vergleichSatz(lang, v) {
    if (v.krit == null) { return ''; }
    var abs = Math.abs(v.diff);
    if (abs >= v.krit) {
      var fuer = v.diff > 0;
      if (lang === 'fr') { return TX.satz('L’écart entre l’échelle de performance et l’échelle de raisonnement est de ' + punkte(abs, lang) + ' en faveur de l’' + (fuer ? 'échelle de performance' : 'échelle de raisonnement') + ' ; il atteint la différence critique indiquée dans le manuel (' + v.krit + ') et est donc statistiquement significatif', lang); }
      if (lang === 'en') { return TX.satz('The difference between the Performance Scale and the Reasoning Scale is ' + punkte(abs, lang) + ' in favour of the ' + (fuer ? 'Performance Scale' : 'Reasoning Scale') + '; it reaches the critical difference given in the manual (' + v.krit + ') and is therefore statistically significant', lang); }
      return TX.satz('Der Unterschied zwischen Handlungs- und Denkskala beträgt ' + punkte(abs, lang) + ' zugunsten der ' + (fuer ? 'Handlungsskala' : 'Denkskala') + '; er erreicht die kritische Differenz laut Manual (' + v.krit + ') und ist damit statistisch bedeutsam', lang);
    }
    if (lang === 'fr') { return TX.satz('L’écart entre l’échelle de performance et l’échelle de raisonnement (' + punkte(abs, lang) + ') n’atteint pas la différence critique indiquée dans le manuel (' + v.krit + ')', lang); }
    if (lang === 'en') { return TX.satz('The difference between the Performance Scale and the Reasoning Scale (' + punkte(abs, lang) + ') does not reach the critical difference given in the manual (' + v.krit + ')', lang); }
    return TX.satz('Der Unterschied zwischen Handlungs- und Denkskala (' + punkte(abs, lang) + ') erreicht die kritische Differenz laut Manual (' + v.krit + ') nicht', lang);
  }
  function untertestSatz(lang, ausw) {
    var ut = ausw.ut.filter(function (x) { return x.band; });
    if (!ut.length) { return ''; }
    var aussen = ut.filter(function (x) { return x.band.rang !== 0; });
    var wp = { de: 'Wertpunkte ', fr: 'note standard ', en: 'scaled score ' }[lang];
    if (aussen.length) {
      var liste = B.liste(aussen.map(function (x) { return B.t(x.name, lang) + ' (' + wp + x.wert + '; ' + B.t(x.band.name, lang) + ')'; }), lang);
      return TX.satz((lang === 'fr' ? 'Subtests en dehors de la moyenne : ' : (lang === 'en' ? 'Subtests outside the average range: ' : 'Untertests außerhalb des Durchschnittsbereichs: ')) + liste, lang);
    }
    if (ut.length === ausw.ut.length) {
      return TX.satz(lang === 'fr' ? 'Tous les subtests se situent dans la moyenne' : (lang === 'en' ? 'All subtest scores are in the average range' : 'Alle Untertests liegen im durchschnittlichen Bereich'), lang);
    }
    return '';
  }
  function referenzSatz(lang, ra) {
    if (lang === 'fr') { return TX.satz('Âge de référence (âge auquel la performance globale obtenue correspond au résultat moyen de l’échantillon normatif) : ' + B.alterText(ra, lang), lang); }
    if (lang === 'en') { return TX.satz('Reference age (the age at which the overall performance achieved corresponds to the average result of the normative sample): ' + B.alterText(ra, lang), lang); }
    return TX.satz('Referenzalter (Alter, in dem die erreichte Gesamtleistung dem mittleren Ergebnis der Normstichprobe entspricht): ' + B.alterText(ra, lang), lang);
  }
  function titel(lang, v) {
    var k = v ? v.kurz : 'SON-R';
    return k + (lang === 'fr' ? ' – Test d’intelligence non verbal de Snijders-Oomen' : (lang === 'en' ? ' – Snijders-Oomen Nonverbal Intelligence Test' : ' – Snijders-Oomen Non-verbaler Intelligenztest'));
  }
  function verfahrenZeile(lang, d) {
    var v = version(d);
    var q = v ? (lang === 'fr' ? ' (version allemande : ' + v.quelle + ')' : (lang === 'en' ? ' (German edition: ' + v.quelle + ')' : ' (deutsche Ausgabe: ' + v.quelle + ')')) : '';
    return titel(lang, v) + q + (d.datum ? ', ' + B.datum(d.datum, lang) : '');
  }
  function bericht(lang, ctx, d, ausw) {
    var v = ausw.version;
    var bl = [{ t: 'p', text: zweck(lang, v) }];
    var s = [];
    if (v) { s.push(lang === 'fr' ? 'Les résultats se réfèrent aux normes de l’édition allemande (' + v.quelle + ')' : (lang === 'en' ? 'The results are based on the norms of the German edition (' + v.quelle + ')' : 'Die Ergebnisse beziehen sich auf die Normen der deutschen Ausgabe (' + v.quelle + ')')); }
    var is = instruktionSatz(lang, d);
    if (is) { s.push(is); }
    if (s.length) { bl.push({ t: 'p', text: s.map(function (x) { return TX.satz(x, lang); }).join(' ') }); }
    var kw = ausw.kennwerte.filter(function (x) { return x.band; }), ut = ausw.ut.filter(function (x) { return x.band; });
    if (!kw.length && !ut.length) { bl.push({ t: 'p', text: lang === 'fr' ? 'Aucun résultat n’a encore été saisi.' : (lang === 'en' ? 'No results have been entered yet.' : 'Es wurden noch keine Ergebnisse eingegeben.') }); return bl; }
    var S = SPRACHE[lang].spalten;
    if (kw.length) {
      bl.push(ohneLeereSpalten({ t: 'tabelle', kopf: [lang === 'fr' ? 'Indicateur' : (lang === 'en' ? 'Score' : 'Kennwert'), lang === 'fr' ? 'QI' : 'IQ', S.pr, S.einstufung], zahlSpalten: [1, 2],
        zeilen: kw.map(function (x) { return [B.t(x.name, lang), String(x.wert), x.pr != null ? B.zahl(x.pr, lang) : '–', B.t(x.band.name, lang)]; }),
        anmerkung: lang === 'fr' ? 'QI : moyenne 100, écart type 15. Classification selon les écarts types : dans la moyenne = ' + mitte('sonr-iq') + '.'
          : (lang === 'en' ? 'IQ scores: mean 100, standard deviation 15. Classification by standard deviations: average = ' + mitte('sonr-iq') + '.'
            : 'IQ-Werte: Mittelwert 100, Standardabweichung 15. Einstufung nach Standardabweichungen: durchschnittlich = ' + mitte('sonr-iq') + '.') }, [2]));
    }
    if (ut.length) {
      var mitSkala = v && v.skalen;
      bl.push({ t: 'tabelle', kopf: [S.untertest].concat(mitSkala ? [lang === 'fr' ? 'Échelle' : (lang === 'en' ? 'Scale' : 'Skala')] : []).concat([lang === 'fr' ? 'Note standard' : (lang === 'en' ? 'Scaled score' : 'Wertpunkte'), S.einstufung]),
        zahlSpalten: [mitSkala ? 2 : 1],
        zeilen: ut.map(function (x) { return [B.t(x.name, lang)].concat(mitSkala ? [B.t(KENNWERTE[x.skala].name, lang)] : []).concat([String(x.wert), B.t(x.band.name, lang)]); }),
        anmerkung: lang === 'fr' ? 'Notes standard : moyenne 10, écart type 3 ; dans la moyenne = ' + mitte('sonr-wp') + ' (même critère que pour les QI).'
          : (lang === 'en' ? 'Scaled scores: mean 10, standard deviation 3; average = ' + mitte('sonr-wp') + ' (same criterion as for the IQ scores).'
            : 'Wertpunkte: Mittelwert 10, Standardabweichung 3; durchschnittlich = ' + mitte('sonr-wp') + ' (gleiches Kriterium wie bei den IQ-Werten).') });
    }
    var t = [];
    var g = kw.filter(function (x) { return x.id === 'gesamt'; })[0], sk = kw.filter(function (x) { return x.id !== 'gesamt'; });
    if (g) { t.push(gesamtSatz(lang, g)); }
    if (sk.length) { t.push(skalenSatz(lang, sk)); }
    if (ausw.vergleich) { var vs = vergleichSatz(lang, ausw.vergleich); if (vs) { t.push(vs); } }
    var us = untertestSatz(lang, ausw);
    if (us) { t.push(us); }
    if (ausw.referenzalter) { t.push(referenzSatz(lang, ausw.referenzalter)); }
    if (t.length) { bl.push({ t: 'p', text: t.join(' ') }); }
    return bl;
  }
  function zusammenfassung(lang, ctx, d, ausw) {
    var g = ausw.kennwerte.filter(function (x) { return x.id === 'gesamt' && x.band; })[0];
    if (!g) { return ''; }
    var k = ausw.version ? ausw.version.kurz : 'SON-R';
    var sk = ausw.kennwerte.filter(function (x) { return x.id !== 'gesamt' && x.band; }).map(function (x) { var n = B.t(x.name, lang); return (lang === 'fr' ? n.charAt(0).toLowerCase() + n.slice(1) : n) + ' ' + x.wert; });
    return k + (lang === 'fr' ? ' : SON-IQ de ' : ': SON-IQ ') + g.wert + ' (' + B.t(g.band.name, lang) + ')' + (sk.length ? '; ' + sk.join(', ') : '') + '.';
  }
  function hinweise(lang, ctx, d, ausw) {
    var g = ausw.kennwerte.filter(function (x) { return x.id === 'gesamt' && x.band; })[0];
    if (g && g.band.rang <= -2) {
      return [lang === 'fr' ? 'Un SON-IQ très inférieur à la moyenne ne peut être interprété qu’en lien avec une évaluation du comportement adaptatif (p. ex. Vineland-3) et l’anamnèse développementale.'
        : (lang === 'en' ? 'A well below average SON-IQ can only be interpreted together with an assessment of adaptive behaviour (e.g. Vineland-3) and the developmental history.'
          : 'Ein weit unterdurchschnittlicher SON-IQ ist erst zusammen mit einer Einschätzung der Alltagsfertigkeiten (z. B. Vineland-3) und der Entwicklungsgeschichte fachlich einzuordnen.')];
    }
    return [];
  }
  function warnung(d, fall) {
    var v = version(d);
    if (!v) { return 'Bitte die Version des SON-R wählen (2½-7, 2-8 oder 6-40) – Untertests, Kennwerte und Normen unterscheiden sich.'; }
    /* alle zutreffenden Hinweise zusammen anzeigen */
    var w = [], a = B.alter(fall.kind.geburtsdatum, d.datum || fall.bericht.datumVon);
    if (a && (a.dezimal < v.von || a.dezimal >= v.bis)) { w.push('Der ' + v.kurz + ' ist für ' + B.t(v.alter, 'de') + ' normiert – das Kind ist ' + B.alterText(a, 'de') + ' alt.'); }
    var fremd = Object.keys(UNTERTESTS).filter(function (id) { return v.ut.indexOf(id) < 0 && String(((d.wp || {}).wp || {})[id] || '').trim() !== ''; });
    if (fremd.length) { w.push(B.liste(fremd.map(function (id) { return B.t(UNTERTESTS[id].name, 'de'); }), 'de') + (fremd.length === 1 ? ' gehört' : ' gehören') + ' nicht zum ' + v.kurz + ' – ' + (fremd.length === 1 ? 'dieser Wert erscheint' : 'diese Werte erscheinen') + ' nicht im Bericht.'); }
    if (String(d.referenzalter || '').trim() && !referenzalter(d)) { w.push('Referenzalter bitte als Jahre;Monate eingeben (z. B. 5;3, Monate 0–11).'); }
    if (!v.skalen && String(d.kritDiff || '').trim()) { w.push('Der ' + v.kurz + ' hat hier keine Handlungs- und Denkskala – die kritische Differenz wird nicht verwendet.'); }
    return w.join(' ');
  }
  function fertig(d) { var a = auswerten(d); return !!(a.version && a.kennwerte[0].band); }
  /* Übernahme aus v1: SON-IQ, PR und die sechs Wertpunkte. Die Version war dort nicht erfasst → muss gewählt werden.
     Die Auswahl „Testsprache“ stand immer auf „Nonverbal“ (Voreinstellung) – übernommen wird nur eine aktiv gewählte Sprache. */
  function ausAlt(alt) {
    var f = alt.fields || {}, d = neu(), hat = false;
    function nimm(alt_, ziel, feld) { var v = f[alt_]; if (v != null && v !== '') { ziel[feld] = String(v); hat = true; } }
    nimm('sonr-iq', d.iq.wert, 'gesamt');
    [['mos', 'mos'], ['kat', 'kat'], ['puz', 'puz'], ['ana', 'ana'], ['sit', 'sit'], ['zei', 'zei']].forEach(function (p) { nimm('sonr-' + p[0], d.wp.wp, p[1]); });
    if (!hat) { return null; }
    if (d.iq.wert.gesamt != null && f['sonr-pr'] != null && f['sonr-pr'] !== '') { d.iq.pr.gesamt = String(f['sonr-pr']); }
    var ts = spracheErkennen(f['sonr-testlang']);
    if (ts) { d.instruktion = 'verbal'; d.sprache = ts; }
    else if (f['sonr-instlang']) { d.sprache = spracheErkennen(f['sonr-instlang']) || String(f['sonr-instlang']); }
    return d;
  }
  KAT.registrieren({
    id: 'sonr', kurz: 'SON-R', name: L('SON-R – Snijders-Oomen Non-verbaler Intelligenztest', 'SON-R – Test d’intelligence non verbal de Snijders-Oomen', 'SON-R – Snijders-Oomen Nonverbal Intelligence Test'),
    gruppe: 'intelligenz', alter: [2, 40], informantenText: 'Einzeltest, Version 2½-7, 2-8 oder 6-40',
    hilfe: 'Zuerst die Version wählen. Wertpunkte, IQ-Werte und Prozentränge aus dem Protokollbogen bzw. dem Auswertungsprogramm übernehmen – das Tool rechnet keine Normwerte.',
    neu: neu, formular: formular, auswerten: auswerten, chip: chip, bericht: bericht, verfahrenZeile: verfahrenZeile,
    zusammenfassung: zusammenfassung, hinweise: hinweise, warnung: warnung, fertig: fertig, ausAlt: ausAlt,
    pruefen: ['SON-R 2-8: Jahr und Autoren der deutschen Ausgabe (hier Tellegen, Laros & Petermann, 2018), Altersbereich 2;0–8;11, Untertests und Skalen (hier wie SON-R 2½-7) am Manual bestätigen.',
      'SON-R 6-40: Reihenfolge der vier Untertests auf dem Protokollbogen (hier Kategorien, Mosaike, Analogien, Zeichenmuster) und ob neben dem SON-IQ weitere Skalenwerte ausgewiesen werden.',
      'Englische Untertestnamen laut englischsprachigem Manual (hier Mosaics, Categories, Puzzles, Analogies, Situations, Patterns; Performance Scale, Reasoning Scale).',
      'Französische Namen (keine französische Fassung bekannt): Mosaïques, Catégories, Puzzles, Analogies, Situations, Motifs; échelle de performance, échelle de raisonnement.',
      'Definition und Schreibweise des Referenzalters laut Manual.',
      'Übernahme aus der alten Version: dort war keine Version erfasst – sie muss gewählt werden; die Testsprache „Nonverbal“ war voreingestellt und wird nicht übernommen.']
  });
})();
