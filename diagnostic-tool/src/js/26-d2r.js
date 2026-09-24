/* =====================================================================
   d2-R – Test d2 – Revision (Brickenkamp, Schmidt-Atzert & Liepmann, 2010)
   ---------------------------------------------------------------------
   Sicher berechnet werden nur die Rohwerte: Fehler = Auslassungs- +
   Verwechslungsfehler, KL = BZO − Fehler, F% = Fehler / BZO × 100.
   Standardwerte (SW, M 100, SD 10) und Prozentränge kommen aus der
   Normtabelle und werden eingegeben.
   Kürzel je Berichtssprache wie in der jeweiligen Fassung:
   DE BZO / KL / F% · FR CCT / CC / E% · EN PT / CP / E%.
   ===================================================================== */
(function () {
  var L = KAT.L;
  var KENNWERTE = [
    { id: 'bzo', name: L('Bearbeitete Zielobjekte', 'Caractères cibles traités', 'Processed targets'), kurz: L('BZO', 'CCT', 'PT'), was: L('Arbeitstempo', 'vitesse de traitement', 'processing speed'),
      anfang: L('Beim Arbeitstempo (BZO)', 'Pour la vitesse de traitement (CCT)', 'For processing speed (PT)') },
    { id: 'kl', name: L('Konzentrationsleistung', 'Capacité de concentration', 'Concentration performance'), kurz: L('KL', 'CC', 'CP'), was: L('Konzentrationsleistung (Tempo und Genauigkeit)', 'capacité de concentration (vitesse et exactitude)', 'concentration performance (speed and accuracy)'),
      anfang: L('Bei der Konzentrationsleistung (KL), die Tempo und Genauigkeit verbindet,', 'Pour la capacité de concentration (CC), qui combine vitesse et exactitude,', 'For concentration performance (CP), which combines speed and accuracy,') },
    { id: 'fp', name: L('Fehlerprozent', 'Exactitude', 'Error percentage'), kurz: L('F%', 'E%', 'E%'), was: L('Sorgfalt', 'exactitude', 'accuracy'),
      anfang: L('Bei der Sorgfalt (F%)', 'Pour l’exactitude (E%)', 'For accuracy (E%)') }
  ];
  function neu() { return { datum: '', normgruppe: '', roh: {}, sw: {}, pr: {} }; }
  function roh(d) {
    var bzo = E.zahl('tests.d2r.roh.bzo', 0, 1000, true), af = E.zahl('tests.d2r.roh.af', 0, 1000, true), vf = E.zahl('tests.d2r.roh.vf', 0, 1000, true);
    var f = af != null && vf != null ? af + vf : null;
    return { bzo: bzo, af: af, vf: vf, f: f, kl: bzo != null && f != null ? bzo - f : null, fp: bzo && f != null ? Math.round(f / bzo * 1000) / 10 : null };
  }
  function auswerten(d) {
    var r = roh(d);
    return { roh: r, zeilen: KENNWERTE.map(function (k) {
      var sw = E.zahl('tests.d2r.sw.' + k.id, 50, 150, true), pr = E.zahl('tests.d2r.pr.' + k.id, 0.1, 99.9);
      return { id: k.id, name: k.name, kurz: k.kurz, was: k.was, anfang: k.anfang, roh: r[k.id], wert: sw, pr: pr, metrik: 'sw', band: sw != null ? KAT.einstufen('sw-10', sw) : (pr != null ? KAT.einstufen('pr-leistung', pr) : null) };
    }) };
  }
  function chip(pfad, n) { if (/\.sw\./.test(pfad)) { return KAT.einstufen('sw-10', n); } if (/\.pr\./.test(pfad)) { return KAT.einstufen('pr-leistung', n); } return null; }
  function rohUi(d) {
    var r = roh(d);
    function z(label, v, pz) { return '<span><b>' + label + ':</b> ' + (v == null ? '–' : (pz ? B.prozent(v, 'de') : B.zahl(v, 'de'))) + '</span>'; }
    return '<p class="klein" style="display:flex;gap:18px;flex-wrap:wrap;margin-top:10px">' + z('Fehler gesamt', r.f) + z('KL', r.kl) + z('F%', r.fp, true) + '</p>';
  }
  function formular(d) {
    var h = E.karte('<h2>Durchführung</h2><div class="raster">' + E.feld('tests.d2r.datum', 'Datum', { typ: 'date' }) +
      E.feld('tests.d2r.normgruppe', 'Normgruppe (Alter)', { platzhalter: 'z. B. 11;0–12;11 Jahre' }) + '</div>');
    h += E.karte('<h2>Rohwerte</h2><p class="klein">Aus dem Auswertungsbogen. Das Tool berechnet daraus Fehler gesamt, KL und F%.</p><div class="raster">' +
      E.feld('tests.d2r.roh.bzo', 'Bearbeitete Zielobjekte (BZO)', { min: 0, max: 1000, ganz: true, inputmode: 'numeric' }) +
      E.feld('tests.d2r.roh.af', 'Auslassungsfehler (AF)', { min: 0, max: 1000, ganz: true, inputmode: 'numeric' }) +
      E.feld('tests.d2r.roh.vf', 'Verwechslungsfehler (VF)', { min: 0, max: 1000, ganz: true, inputmode: 'numeric' }) + '</div><div id="d2r-roh">' + rohUi(d) + '</div>');
    h += E.karte('<h2>Normwerte</h2><p class="klein">Standardwert (Mittelwert 100, Standardabweichung 10) und Prozentrang aus der Normtabelle der passenden Altersgruppe. Im französischen Bericht heißen die Kennwerte CCT, CC und E%, im englischen PT, CP und E%.</p>' +
      E.raster({ basis: 'tests.d2r', kopfSkala: 'Kennwert', spalten: [{ id: 'sw', label: 'Standardwert', min: 50, max: 150, ganz: true }, { id: 'pr', label: 'Prozentrang', min: 0.1, max: 99.9, ganz: false }],
        zeilen: KENNWERTE.map(function (k) { return { id: k.id, name: B.t(k.name, 'de') + ' (' + B.t(k.kurz, 'de') + ')', hinweis: B.t(k.was, 'de') }; }),
        einstufen: function (z, s, n) { return s === 'sw' ? KAT.einstufen('sw-10', n) : KAT.einstufen('pr-leistung', n); } }));
    return h;
  }
  function teilUpdate(d) { return { 'd2r-roh': rohUi(d) }; }
  var ZWECK = {
    de: 'Der d2-R (Test d2 – Revision) ist ein Aufmerksamkeits- und Konzentrationstest. In 14 Zeilen mit je 20 Sekunden Bearbeitungszeit sind bestimmte Zeichen („d“ mit zwei Strichen) unter ähnlichen Zeichen durchzustreichen. Ausgewertet werden das Arbeitstempo (bearbeitete Zielobjekte, BZO), die Konzentrationsleistung (KL) und die Sorgfalt (Fehlerprozent, F%).',
    fr: 'Le d2-R (test d’attention concentrée révisé) évalue l’attention et la concentration. Sur 14 lignes de 20 secondes chacune, il s’agit de barrer des signes cibles (un « d » avec deux traits) parmi des signes semblables. Sont évalués la vitesse de traitement (caractères cibles traités, CCT), la capacité de concentration (CC) et l’exactitude (pourcentage d’erreurs, E%).',
    en: 'The d2-R (d2 Test of Attention – Revised) is a test of attention and concentration. Across 14 lines of 20 seconds each, target symbols (a “d” with two marks) have to be crossed out among similar symbols. Scores cover processing speed (processed targets, PT), concentration performance (CP) and accuracy (error percentage, E%).'
  };
  function verfahrenZeile(lang, d) {
    return (lang === 'fr' ? 'd2-R – Test d’attention concentrée révisé (Brickenkamp, Schmidt-Atzert & Liepmann, 2010)' : (lang === 'en' ? 'd2-R – d2 Test of Attention – Revised (Brickenkamp, Schmidt-Atzert & Liepmann, 2010)' : 'd2-R – Test d2 – Revision, Aufmerksamkeits- und Konzentrationstest (Brickenkamp, Schmidt-Atzert & Liepmann, 2010)')) + (d.datum ? ', ' + B.datum(d.datum, lang) : '');
  }
  function bericht(lang, ctx, d, ausw) {
    var bl = [{ t: 'p', text: ZWECK[lang] }];
    var z = ausw.zeilen.filter(function (x) { return x.band || x.roh != null; });
    if (!z.length) { bl.push({ t: 'p', text: lang === 'fr' ? 'Aucun résultat n’a encore été saisi.' : (lang === 'en' ? 'No results have been entered yet.' : 'Es wurden noch keine Ergebnisse eingegeben.') }); return bl; }
    var S = SPRACHE[lang].spalten;
    bl.push({ t: 'tabelle', kopf: [lang === 'fr' ? 'Indicateur' : (lang === 'en' ? 'Score' : 'Kennwert'), lang === 'fr' ? 'Score brut' : (lang === 'en' ? 'Raw score' : 'Rohwert'), lang === 'fr' ? 'Note standard' : (lang === 'en' ? 'Standard score' : 'Standardwert'), S.pr, S.einstufung], zahlSpalten: [1, 2, 3],
      zeilen: ausw.zeilen.map(function (x) { return [B.t(x.name, lang) + ' (' + B.t(x.kurz, lang) + ')', x.roh == null ? '–' : (x.id === 'fp' ? B.prozent(x.roh, lang) : B.zahl(x.roh, lang)), x.wert == null ? '–' : String(x.wert), x.pr == null ? '–' : B.zahl(x.pr, lang), x.band ? B.t(x.band.name, lang) : '–']; }),
      anmerkung: (lang === 'fr' ? 'Notes standard : moyenne 100, écart type 10.' : (lang === 'en' ? 'Standard scores: mean 100, standard deviation 10.' : 'Standardwerte: Mittelwert 100, Standardabweichung 10.')) + (d.normgruppe ? ' ' + (lang === 'fr' ? 'Groupe normatif : ' : (lang === 'en' ? 'Norm group: ' : 'Normgruppe: ')) + d.normgruppe + '.' : '') });
    var t = [];
    ausw.zeilen.forEach(function (x) {
      if (!x.band) { return; }
      var werte = [x.wert != null ? (lang === 'fr' ? 'note standard ' : (lang === 'en' ? 'standard score ' : 'Standardwert ')) + x.wert : '', x.pr != null ? (lang === 'fr' ? 'rang centile ' : (lang === 'en' ? 'percentile rank ' : 'PR ')) + B.zahl(x.pr, lang) : ''].filter(Boolean).join('; ');
      var bn = B.t(x.band.name, lang), anf = B.t(x.anfang, lang), komma = /,$/.test(anf) ? '' : ',';
      t.push(TX.satz(lang === 'fr' ? anf + komma + ' le résultat ' + frBand(bn) + ' (' + werte + ')'
        : (lang === 'en' ? anf + komma + ' the result is in the ' + bn + ' range (' + werte + ')'
          : anf + ' liegt das Ergebnis im Bereich ' + TX.q(bn, lang) + ' (' + werte + ')'), lang));
    });
    /* Arbeitsstil: Tempo gegen Sorgfalt (nur wenn beide eingestuft sind) */
    var tempo = ausw.zeilen[0].band, sorgfalt = ausw.zeilen[2].band;
    if (tempo && sorgfalt) {
      if (tempo.rang >= 0 && sorgfalt.rang <= -1) { t.push(TX.satz(lang === 'fr' ? ctx.name + ' a travaillé à un rythme soutenu, mais avec relativement beaucoup d’erreurs' : (lang === 'en' ? ctx.name + ' worked quickly but made relatively many errors' : ctx.name + ' arbeitete zügig, aber mit vergleichsweise vielen Fehlern'), lang)); }
      else if (tempo.rang <= -1 && sorgfalt.rang >= 0) { t.push(TX.satz(lang === 'fr' ? ctx.name + ' a travaillé lentement, mais avec soin' : (lang === 'en' ? ctx.name + ' worked slowly but carefully' : ctx.name + ' arbeitete langsam, aber sorgfältig'), lang)); }
    }
    if (t.length) { bl.push({ t: 'p', text: t.join(' ') }); }
    return bl;
  }
  /* FR: „se situe dans la moyenne“ · „est inférieur à la moyenne“ (die Stufen sind hier Beschreibungen, keine Namen) */
  function frBand(bn) { return /^dans /.test(bn) ? 'se situe ' + bn : 'est ' + bn; }
  function zusammenfassung(lang, ctx, d, ausw) {
    var kl = ausw.zeilen[1];
    if (!kl.band) { return ''; }
    var bn = B.t(kl.band.name, lang);
    return lang === 'fr' ? 'd2-R : le résultat en capacité de concentration ' + frBand(bn) + (kl.wert != null ? ' (note standard ' + kl.wert + ')' : '') + '.'
      : (lang === 'en' ? 'd2-R: concentration performance in the ' + bn + ' range' + (kl.wert != null ? ' (standard score ' + kl.wert + ')' : '') + '.'
        : 'd2-R: Konzentrationsleistung im Bereich ' + TX.q(bn, lang) + (kl.wert != null ? ' (Standardwert ' + kl.wert + ')' : '') + '.');
  }
  function warnung(d, fall) {
    var a = B.alter(fall.kind.geburtsdatum, d.datum || fall.bericht.datumVon);
    if (a && a.j < 9) { return 'Der d2-R ist ab 9 Jahren normiert – das Kind ist ' + B.alterText(a, 'de') + ' alt.'; }
    var r = roh(d);
    if (r.kl != null && r.kl < 0) { return 'Die Fehler sind größer als die bearbeiteten Zielobjekte – bitte die Rohwerte prüfen.'; }
    return '';
  }
  function fertig(d) { var a = auswerten(d); return !!a.zeilen[1].band; }
  function ausAlt(alt) {
    var f = alt.fields || {}, d = neu(), hat = false;
    [['kl', 'kl'], ['bz', 'bzo'], ['fp', 'fp']].forEach(function (p) { var v = f['d2r-' + p[0]]; if (v != null && v !== '') { d.pr[p[1]] = String(v); hat = true; } });
    return hat ? d : null;
  }
  KAT.registrieren({
    id: 'd2r', kurz: 'd2-R', name: L('d2-R – Test d2 – Revision', 'd2-R – Test d’attention concentrée révisé', 'd2-R – d2 Test of Attention – Revised'), gruppe: 'aufmerksamkeit', alter: [9, 60], informantenText: 'Einzel- oder Gruppentest',
    hilfe: 'Rohwerte eintragen – Fehler, KL und F% rechnet das Tool. Standardwerte und Prozentränge aus der Normtabelle.',
    neu: neu, formular: formular, auswerten: auswerten, chip: chip, teilUpdate: teilUpdate, bericht: bericht, verfahrenZeile: verfahrenZeile,
    zusammenfassung: zusammenfassung, warnung: warnung, fertig: fertig, ausAlt: ausAlt,
    pruefen: ['Polung der F%-Normwerte: hier gilt „hoher Standardwert = hohe Sorgfalt“ – am Manual bestätigen.',
      'Interpretationsbänder der Standardwerte (hier statistisch: 90–110 durchschnittlich).',
      'Französische Bezeichnungen (CCT, CC, E%) und englische (PT, CP, E%) laut Hogrefe France bzw. Hogrefe US – am jeweiligen Manual bestätigen.',
      'Übernahme aus der alten Version: dort wurden nur Prozentränge erfasst (auch für F und SB); übernommen werden KL, BZO und F%.']
  });
})();
