/* =====================================================================
   AFS – Angstfragebogen für Schüler (Wieczerkowski, Nickel, Janowski,
   Fittkau, Rauer & Petermann; 7., überarbeitete und neu normierte
   Auflage 2016, Hogrefe)
   ---------------------------------------------------------------------
   Selbstbeurteilung, 50 Aussagen („stimmt“ / „stimmt nicht“), 9–18 Jahre
   bzw. Klassen 4–12. Skalen: Prüfungsangst (PA, 15 Items), Manifeste
   Angst (MA, 15), Schulunlust (SU, 10) und die Kontrollskala Soziale
   Erwünschtheit (SE, 10) – SE ist kein Befund, sondern ein Hinweis zur
   Gültigkeit der Antworten.
   Rohwerte werden mit der Schablone ausgezählt und eingegeben; T-Werte
   (M 50, SD 10) und Prozentränge kommen aus der Normtabelle (Klassenstufe,
   Geschlecht). Für Werte aus der alten App gibt es die Option „Stanine“.
   Einordnung statistisch (kein Manual-Grenzwert bekannt): T 41–59
   durchschnittlich, 60–69 überdurchschnittlich, ab 70 weit über-
   durchschnittlich. Deutsche Kürzel PA/MA/SU/SE in allen Sprachen.
   ===================================================================== */
(function () {
  var L = KAT.L;
  var SKALEN = [
    { id: 'pa', kurz: 'PA', de: 'Prüfungsangst', fr: 'anxiété face aux examens', en: 'test anxiety', items: 15 },
    { id: 'ma', kurz: 'MA', de: 'Manifeste Angst', fr: 'anxiété manifeste', en: 'manifest anxiety', items: 15 },
    { id: 'su', kurz: 'SU', de: 'Schulunlust', fr: 'aversion scolaire', en: 'school aversion', items: 10 },
    { id: 'se', kurz: 'SE', de: 'Soziale Erwünschtheit', fr: 'désirabilité sociale', en: 'social desirability', items: 10, kontrolle: true }
  ];
  var PROBLEM = SKALEN.filter(function (s) { return !s.kontrolle; }), SE = SKALEN[3];
  function skalaVon(id) { return SKALEN.filter(function (s) { return s.id === id; })[0]; }
  function sep(lang) { return lang === 'fr' ? ' ; ' : '; '; }
  /* „Prüfungsangst (PA)“ · „Prüfungsangst (PA ; anxiété face aux examens)“ */
  function skName(sk, lang) { return sk.de + ' (' + [sk.kurz].concat(lang === 'de' ? [] : [sk[lang]]).join(sep(lang)) + ')'; }
  /* eine Klammer mit Kürzel, Übersetzung und Werten */
  function skMit(sk, lang, extra) { return sk.de + ' (' + [sk.kurz].concat(lang === 'de' ? [] : [sk[lang]]).concat(extra || []).filter(Boolean).join(sep(lang)) + ')'; }

  /* ---------------- Einordnung (statistisch) ---------------- */
  var NAMEN = [L('unterdurchschnittlich', 'inférieur à la moyenne', 'below average'), L('durchschnittlich', 'dans la moyenne', 'average'),
    L('überdurchschnittlich', 'supérieur à la moyenne', 'above average'), L('weit überdurchschnittlich', 'très supérieur à la moyenne', 'well above average')];
  var NAMEN_SE = [L('niedrig', 'bas', 'low'), L('durchschnittlich', 'dans la moyenne', 'average'), L('erhöht', 'élevé', 'raised'), L('deutlich erhöht', 'nettement élevé', 'markedly raised')];
  /* Obergrenzen: T ≤ 40 | 41–59 | 60–69 | ≥ 70 · PR ≤ 16 | 17–83 | 84–97 | ≥ 98 · Stanine 1–3 | 4–6 | 7–8 | 9 */
  var GRENZEN = { t: [40, 59, 69, Infinity], pr: [16, 83, 97, Infinity], st: [3, 6, 8, Infinity] };
  Object.keys(GRENZEN).forEach(function (m) {
    KAT.bandDefinieren('afs-' + m, { art: 'problem', stufen: GRENZEN[m].map(function (g, i) { return { bis: g, rang: [0, 0, 1, 2][i], name: NAMEN[i] }; }),
      pruefen: m === 't' ? 'AFS: Einordnung statistisch (T 41–59 durchschnittlich, 60–69 überdurchschnittlich, ab 70 weit überdurchschnittlich; PR 17–83 / 84–97 / ab 98; Stanine 4–6 / 7–8 / 9) – Interpretationshinweise und ggf. kritische Werte am Manual (7. Auflage) prüfen.' : undefined });
    /* Kontrollskala SE: neutral gefärbt (kein Befund) */
    KAT.bandDefinieren('afs-se-' + m, { art: 'leistung', stufen: GRENZEN[m].map(function (g, i) { return { bis: g, rang: i - 1, name: NAMEN_SE[i] }; }) });
  });
  function bandId(sk, metrik) { return (sk.kontrolle ? 'afs-se-' : 'afs-') + metrik; }
  /* Satzteile je Stufe (Index 0–3) */
  var LAGE = [L('unter dem Durchschnitt', 'en dessous de la moyenne', 'below average'), L('im Durchschnittsbereich', 'dans la moyenne', 'within the average range'),
    L('über dem Durchschnitt', 'au-dessus de la moyenne', 'above average'), L('weit über dem Durchschnitt', 'nettement au-dessus de la moyenne', 'well above average')];

  /* ---------------- Daten ---------------- */
  function neu() { return { datum: '', normen: 'tpr', klasse: '', geschlecht: '', roh: {}, t: {}, pr: {}, sn: {} }; }
  function zahlAus(v, min, max, ganz) {
    var n = B.num(v);
    if (n == null || n < min || n > max || (ganz && Math.round(n) !== n)) { return null; }
    return n;
  }
  function auswerten(d) {
    var st = d.normen === 'stanine';
    return { zeilen: SKALEN.map(function (sk) {
      var roh = zahlAus((d.roh || {})[sk.id], 0, sk.items, true);
      var t = st ? null : zahlAus((d.t || {})[sk.id], 10, 90, true), pr = st ? null : zahlAus((d.pr || {})[sk.id], 0, 100, false);
      var sn = st ? zahlAus((d.sn || {})[sk.id], 1, 9, true) : null;
      var band = t != null ? KAT.einstufen(bandId(sk, 't'), t) : (pr != null ? KAT.einstufen(bandId(sk, 'pr'), pr) : (sn != null ? KAT.einstufen(bandId(sk, 'st'), sn) : null));
      return { id: sk.id, sk: sk, roh: roh, t: t, pr: pr, sn: sn, band: band };
    }) };
  }
  function zeileVon(ausw, id) { return ausw.zeilen.filter(function (z) { return z.id === id; })[0]; }
  function chip(pfad, n) {
    var m = /\.(t|pr|sn)\.(\w+)$/.exec(pfad), sk = m && skalaVon(m[2]); if (!sk) { return null; }
    return KAT.einstufen(bandId(sk, m[1] === 'sn' ? 'st' : m[1]), n);
  }

  /* ---------------- Formular ---------------- */
  /* Klassenstufe = Schuljahr ab Cycle 2.1 (luxemburgische Entsprechung als Hilfe) */
  var KLASSEN = [['3', '3 (Cycle 3.1)'], ['4', '4 (Cycle 3.2)'], ['5', '5 (Cycle 4.1)'], ['6', '6 (Cycle 4.2)'], ['7', '7 (7e)'], ['8', '8 (6e)'], ['9', '9 (5e)'],
    ['10', '10 (4e)'], ['11', '11 (3e)'], ['12', '12 (2e)'], ['13', '13 (1re)']];
  function formular(d) {
    var st = d.normen === 'stanine';
    var h = E.karte('<h2>Durchführung</h2><div class="raster">' + E.feld('tests.afs.datum', 'Datum', { typ: 'date' }) +
      E.auswahl('tests.afs.normen', 'Normwerte', [['tpr', 'T-Wert und PR (7. Aufl. 2016)'], ['stanine', 'Stanine (ältere Auswertung)']], { neu: true }) +
      E.auswahl('tests.afs.klasse', 'Normgruppe: Klassenstufe', KLASSEN, { leer: '– bitte wählen –', hilfe: 'Schuljahr, gezählt ab Cycle 2.1 (= 1)' }) +
      E.auswahl('tests.afs.geschlecht', 'Normgruppe: Geschlecht', [['w', 'Mädchen'], ['m', 'Jungen']], { leer: '– keine Angabe –' }) + '</div>');
    if (d.uebernommen && !d.uebernahmeGeprueft) {
      h += E.hinweis('Werte aus der früheren Version übernommen (dort als Stanine erfasst). Die 7. Auflage (2016) gibt T-Werte und Prozentränge an – bitte nach Möglichkeit mit den Werten aus der Normtabelle ersetzen.' +
        '<div style="margin-top:6px">' + E.haken('tests.afs.uebernahmeGeprueft', 'Geprüft – Hinweis ausblenden', '', true) + '</div>', 'info');
    }
    var spalten = st ? [{ id: 'roh', label: 'Rohwert', ohneChip: true }, { id: 'sn', label: 'Stanine', min: 1, max: 9, ganz: true }]
      : [{ id: 'roh', label: 'Rohwert', ohneChip: true }, { id: 't', label: 'T-Wert', min: 10, max: 90, ganz: true }, { id: 'pr', label: 'Prozentrang', min: 0, max: 100, ganz: false, ohneChip: true }];
    h += E.karte('<h2>Ergebnisse</h2><p class="klein">Rohwerte mit der Schablone auszählen (PA und MA 0–15, SU und SE 0–10). ' +
      (st ? 'Stanine 1–9 (Mittelwert 5); Einordnung statistisch: 4–6 durchschnittlich, 7–8 überdurchschnittlich, 9 weit überdurchschnittlich.'
        : 'T-Werte (Mittelwert 50, Standardabweichung 10) und Prozentränge aus der Normtabelle der Klassenstufe. Einordnung statistisch nach dem T-Wert (ohne T-Wert nach dem Prozentrang): 41–59 durchschnittlich, 60–69 überdurchschnittlich, ab 70 weit überdurchschnittlich.') + '</p>' +
      E.raster({ basis: 'tests.afs', kopfSkala: 'Skala', chipAmEnde: true, spalten: spalten,
        zeilen: SKALEN.map(function (sk) { return { id: sk.id, name: sk.de + ' (' + sk.kurz + ')', hinweis: sk.items + ' Items' + (sk.kontrolle ? ' · Kontrollskala' : ''), min: 0, max: sk.items, ganz: true }; }),
        einstufen: function (z, s, n) { var sk = skalaVon(z); return sk ? KAT.einstufen(bandId(sk, s === 'sn' ? 'st' : s), n) : null; } }));
    return h;
  }

  /* ---------------- Bericht ---------------- */
  var ZWECK = {
    de: 'Der AFS (Angstfragebogen für Schüler) ist ein Selbstbeurteilungsfragebogen zu Angst und Unlust im Zusammenhang mit der Schule. Er umfasst die Skalen Prüfungsangst (PA, 15 Items), Manifeste Angst (MA, 15 Items) und Schulunlust (SU, 10 Items) sowie die Kontrollskala Soziale Erwünschtheit (SE, 10 Items), die die Neigung erfasst, sich angepasst und sozial erwünscht darzustellen. Die 50 Aussagen werden mit „stimmt“ oder „stimmt nicht“ beantwortet; die Rohwerte werden mit der Auswertungsschablone ausgezählt.',
    fr: 'L’AFS (Angstfragebogen für Schüler – questionnaire d’anxiété pour élèves) est un autoquestionnaire germanophone portant sur l’anxiété et le manque d’envie en lien avec l’école ; comme il n’en existe pas de version française, les noms et abréviations des échelles sont indiqués en allemand, suivis de leur traduction. Il comprend les échelles Prüfungsangst (PA ; anxiété face aux examens, 15 items), Manifeste Angst (MA ; anxiété manifeste, 15 items) et Schulunlust (SU ; aversion scolaire, 10 items), ainsi que l’échelle de contrôle Soziale Erwünschtheit (SE ; désirabilité sociale, 10 items), qui mesure la tendance à se présenter de manière adaptée et socialement souhaitable. Les 50 affirmations sont cotées « stimmt » (vrai) ou « stimmt nicht » (faux) ; les scores bruts sont obtenus à l’aide de la grille de correction.',
    en: 'The AFS (Angstfragebogen für Schüler – anxiety questionnaire for school students) is a German-language self-report questionnaire on anxiety and reluctance related to school; as there is no English version, scale names and abbreviations are given in German, followed by a translation. It comprises the scales Prüfungsangst (PA; test anxiety, 15 items), Manifeste Angst (MA; manifest anxiety, 15 items) and Schulunlust (SU; school aversion, 10 items), as well as the control scale Soziale Erwünschtheit (SE; social desirability, 10 items), which captures the tendency to present oneself as well adjusted and socially desirable. The 50 statements are answered “stimmt” (true) or “stimmt nicht” (not true); raw scores are counted with the scoring template.'
  };
  var GESCHL = { w: L('Mädchen', 'filles', 'girls'), m: L('Jungen', 'garçons', 'boys') };
  function normgruppe(d, lang) {
    var k = /^\d{1,2}$/.test(String(d.klasse || '')) ? String(d.klasse) : '', g = GESCHL[d.geschlecht];
    var teile = [k ? (lang === 'fr' ? 'niveau scolaire ' + k + ' (Klassenstufe ' + k + ')' : (lang === 'en' ? 'school year ' + k + ' (Klassenstufe ' + k + ')' : 'Klassenstufe ' + k)) : '', g ? B.t(g, lang) : ''].filter(Boolean);
    return teile.join(', ');
  }
  function normenSatz(lang, ctx, d) {
    var s = [], ng = normgruppe(d, lang);
    s.push(lang === 'fr' ? 'Le questionnaire a été rempli par ' + (ctx.vorname || (ctx.alter && ctx.alter.j >= 12 ? 'le/la jeune' : 'l’enfant'))
      : (lang === 'en' ? 'The questionnaire was completed by ' + (ctx.vorname || (ctx.alter && ctx.alter.j >= 12 ? 'the young person' : 'the child')) : 'Den Fragebogen hat ' + ctx.name + ' selbst ausgefüllt'));
    if (d.normen === 'stanine') {
      s.push(lang === 'fr' ? 'Les notes normées sont des stanines (de 1 à 9, moyenne 5, écart type 2)' + (ng ? ' ; groupe normatif : ' + ng : '')
        : (lang === 'en' ? 'The normed scores are stanines (1 to 9, mean 5, standard deviation 2)' + (ng ? '; norm group: ' + ng : '')
          : 'Die Normwerte liegen als Stanine vor (1 bis 9, Mittelwert 5, Standardabweichung 2)' + (ng ? '; Normgruppe: ' + ng : '')));
      s.push(lang === 'fr' ? 'Classification statistique : stanines 4 à 6 dans la moyenne, 7 et 8 supérieurs à la moyenne, 9 très supérieur à la moyenne'
        : (lang === 'en' ? 'Statistical classification: stanines 4 to 6 average, 7 and 8 above average, 9 well above average'
          : 'Eingeordnet wird statistisch: Stanine 4 bis 6 gelten als durchschnittlich, 7 und 8 als überdurchschnittlich, 9 als weit überdurchschnittlich'));
    } else {
      s.push(lang === 'fr' ? 'Les scores bruts ont été convertis en notes T (moyenne 50, écart type 10) et en rangs centiles selon les normes de la 7e édition (2016)' + (ng ? ' ; groupe normatif : ' + ng : '')
        : (lang === 'en' ? 'Raw scores were converted into T-scores (mean 50, standard deviation 10) and percentile ranks using the norms of the 7th edition (2016)' + (ng ? '; norm group: ' + ng : '')
          : 'Die Rohwerte wurden nach den Normen der 7. Auflage (2016) in T-Werte (Mittelwert 50, Standardabweichung 10) und Prozentränge umgewandelt' + (ng ? '; Normgruppe: ' + ng : '')));
      s.push(lang === 'fr' ? 'Classification statistique : notes T de 41 à 59 dans la moyenne, de 60 à 69 supérieures à la moyenne, à partir de 70 très supérieures à la moyenne'
        : (lang === 'en' ? 'Statistical classification: T-scores of 41 to 59 average, 60 to 69 above average, 70 and above well above average'
          : 'Eingeordnet wird statistisch: T-Werte von 41 bis 59 gelten als durchschnittlich, 60 bis 69 als überdurchschnittlich und ab 70 als weit überdurchschnittlich'));
    }
    return s.map(function (x) { return TX.satz(x, lang); }).join(' ');
  }
  /* Werte für Klammern: „T-Wert 68; PR 96“ · „Stanine 7“ */
  function werte(z, lang) {
    var t = [];
    if (z.t != null) { t.push(TX.einheit('T', lang) + ' ' + z.t); }
    if (z.pr != null) { t.push(TX.einheit('pr', lang) + ' ' + B.zahl(z.pr, lang)); }
    if (z.sn != null) { t.push(TX.einheit('stanine', lang) + ' ' + z.sn); }
    return t;
  }
  function hauptwert(z, lang) { var w = werte(z, lang); return w.length ? [w[0]] : []; }
  function tabelle(lang, d, ausw) {
    var z = ausw.zeilen.filter(function (x) { return x.roh != null || x.band; });
    var st = d.normen === 'stanine', S = SPRACHE[lang].spalten;
    var mitT = z.some(function (x) { return x.t != null; }), mitPr = z.some(function (x) { return x.pr != null; });
    var kopf = [S.skala, lang === 'fr' ? 'Score brut' : (lang === 'en' ? 'Raw score' : 'Rohwert')];
    if (st) { kopf.push('Stanine'); }
    if (mitT) { kopf.push(lang === 'fr' ? 'Note T' : (lang === 'en' ? 'T-score' : 'T-Wert')); }
    if (mitPr) { kopf.push(lang === 'fr' ? 'Rang centile' : 'PR'); }
    kopf.push(lang === 'de' ? 'Einordnung' : S.einstufung);
    var zahlSpalten = kopf.map(function (k, i) { return i; }).slice(1, kopf.length - 1);
    return { t: 'tabelle', kopf: kopf, zahlSpalten: zahlSpalten,
      zeilen: z.map(function (x) {
        var r = [skName(x.sk, lang) + (x.sk.kontrolle ? (lang === 'fr' ? ' – échelle de contrôle' : (lang === 'en' ? ' – control scale' : ' – Kontrollskala')) : ''), x.roh == null ? '–' : String(x.roh)];
        if (st) { r.push(x.sn == null ? '–' : String(x.sn)); }
        if (mitT) { r.push(x.t == null ? '–' : String(x.t)); }
        if (mitPr) { r.push(x.pr == null ? '–' : B.zahl(x.pr, lang)); }
        r.push(x.band ? B.t(x.band.name, lang) : '–');
        return r;
      }),
      anmerkung: lang === 'fr' ? 'Scores bruts : PA et MA de 0 à 15, SU et SE de 0 à 10. Classification statistique par rapport au groupe normatif ; pour l’échelle de contrôle SE, voir le texte.'
        : (lang === 'en' ? 'Raw scores: PA and MA 0 to 15, SU and SE 0 to 10. Statistical classification relative to the norm group; for the control scale SE, see the text.'
          : 'Rohwerte: PA und MA 0 bis 15, SU und SE 0 bis 10. Einordnung statistisch im Vergleich zur Normgruppe; zur Kontrollskala SE siehe Text.') };
  }
  /* Sätze zu PA, MA, SU: nach Stufe gruppiert, höchste zuerst – jede Aussage nennt ihre Skalen */
  function ergebnisSaetze(lang, ausw) {
    var s = [];
    [3, 2, 1, 0].forEach(function (idx) {
      var g = PROBLEM.map(function (sk) { return zeileVon(ausw, sk.id); }).filter(function (z) { return z.band && z.band.index === idx; });
      if (!g.length) { return; }
      var namen = B.liste(g.map(function (z) { return skMit(z.sk, lang, werte(z, lang)); }), lang), n = g.length, lage = B.t(LAGE[idx], lang);
      s.push(lang === 'fr' ? (n === 1 ? 'L’échelle ' + namen + ' se situe ' : 'Les échelles ' + namen + ' se situent ') + lage
        : (lang === 'en' ? (n === 1 ? 'The scale ' + namen + ' is ' : 'The scales ' + namen + ' are ') + lage
          : (n === 1 ? 'Die Skala ' + namen + ' liegt ' : 'Die Skalen ' + namen + ' liegen ') + lage));
    });
    var nurRoh = PROBLEM.map(function (sk) { return zeileVon(ausw, sk.id); }).filter(function (z) { return !z.band && z.roh != null; });
    if (nurRoh.length) {
      var l = B.liste(nurRoh.map(function (z) { return skName(z.sk, lang) + ' ' + z.roh; }), lang);
      s.push(lang === 'fr' ? 'Sans note normée (score brut uniquement) : ' + l : (lang === 'en' ? 'Without a normed score (raw score only): ' + l : 'Ohne Normwert (nur Rohwert): ' + l));
    }
    return s.map(function (x) { return TX.satz(x, lang); }).join(' ');
  }
  /* Kontrollskala: Hinweis zur Gültigkeit, kein Befund */
  function seSatz(lang, ausw) {
    var z = zeileVon(ausw, 'se'); if (!z || !z.band) { return ''; }
    var n = skMit(SE, lang, werte(z, lang)), i = z.band.index;
    if (i >= 2) {
      return TX.satz(lang === 'fr' ? 'L’échelle de contrôle ' + n + ' est élevée. Cela peut indiquer une tendance à se présenter de manière particulièrement adaptée ; les autres échelles pourraient alors être sous-estimées et sont à interpréter avec prudence'
        : (lang === 'en' ? 'The control scale ' + n + ' is raised. This may indicate a tendency to present oneself as particularly well adjusted; the other scales may therefore be underestimated and should be interpreted with caution'
          : 'Die Kontrollskala ' + n + ' ist erhöht. Das kann auf eine Neigung hinweisen, sich besonders angepasst darzustellen; die übrigen Skalen könnten dadurch zu niedrig ausfallen und sind vorsichtig zu deuten'), lang);
    }
    if (i === 1) {
      return TX.satz(lang === 'fr' ? 'L’échelle de contrôle ' + n + ' se situe dans la moyenne ; elle ne met pas en évidence de tendance marquée à donner des réponses socialement souhaitables'
        : (lang === 'en' ? 'The control scale ' + n + ' is within the average range and shows no marked tendency towards socially desirable answers'
          : 'Die Kontrollskala ' + n + ' liegt im Durchschnittsbereich; sie zeigt keine ausgeprägte Neigung zu sozial erwünschten Antworten'), lang);
    }
    return TX.satz(lang === 'fr' ? 'L’échelle de contrôle ' + n + ' se situe en dessous de la moyenne' : (lang === 'en' ? 'The control scale ' + n + ' is below average' : 'Die Kontrollskala ' + n + ' liegt unter dem Durchschnitt'), lang);
  }
  function bericht(lang, ctx, d, ausw) {
    var bl = [{ t: 'p', text: ZWECK[lang] }];
    if (!ausw.zeilen.some(function (z) { return z.roh != null || z.band; })) {
      bl.push({ t: 'p', text: lang === 'fr' ? 'Aucun résultat n’a encore été saisi.' : (lang === 'en' ? 'No results have been entered yet.' : 'Es wurden noch keine Ergebnisse eingegeben.') });
      return bl;
    }
    bl.push({ t: 'p', text: normenSatz(lang, ctx, d) });
    bl.push(tabelle(lang, d, ausw));
    var t = [ergebnisSaetze(lang, ausw), seSatz(lang, ausw)].filter(Boolean).join(' ');
    if (t) { bl.push({ t: 'p', text: t }); }
    return bl;
  }
  var TITEL = 'AFS – Angstfragebogen für Schüler';
  function verfahrenZeile(lang, d) {
    var quelle = d.normen === 'stanine' ? 'Wieczerkowski, Nickel, Janowski, Fittkau & Rauer; ' + (lang === 'fr' ? 'édition antérieure' : (lang === 'en' ? 'earlier edition' : 'ältere Auflage'))
      : 'Wieczerkowski, Nickel, Janowski, Fittkau, Rauer & Petermann, 2016; ' + (lang === 'fr' ? '7e édition' : (lang === 'en' ? '7th edition' : '7. Auflage'));
    var uebers = lang === 'fr' ? 'questionnaire d’anxiété pour élèves ; ' : (lang === 'en' ? 'anxiety questionnaire for school students; ' : '');
    return TITEL + ' (' + uebers + quelle + ')' + (lang === 'fr' ? ' : autoquestionnaire' : (lang === 'en' ? ': self-report' : ': Selbstbeurteilung')) + (d.datum ? ', ' + B.datum(d.datum, lang) : '');
  }
  function zusammenfassung(lang, ctx, d, ausw) {
    var teile = [];
    [3, 2, 1, 0].forEach(function (idx) {
      var g = PROBLEM.map(function (sk) { return zeileVon(ausw, sk.id); }).filter(function (z) { return z.band && z.band.index === idx; });
      if (!g.length) { return; }
      teile.push(B.liste(g.map(function (z) { return idx >= 2 ? skMit(z.sk, lang, hauptwert(z, lang)) : skName(z.sk, lang); }), lang) + ' ' + B.t(LAGE[idx], lang));
    });
    if (!teile.length) { return ''; }
    var se = zeileVon(ausw, 'se');
    if (se && se.band && se.band.index >= 2) { teile.push(lang === 'fr' ? 'échelle de contrôle SE élevée' : (lang === 'en' ? 'control scale SE raised' : 'Kontrollskala SE erhöht')); }
    return 'AFS' + (lang === 'fr' ? ' : ' : ': ') + teile.join(sep(lang)) + '.';
  }
  function hinweise(lang, ctx, d, ausw) {
    function hoch(id) { var z = zeileVon(ausw, id); return z && z.band && z.band.index >= 2; }
    var h = [];
    if (hoch('pa')) {
      h.push(lang === 'fr' ? 'Les valeurs élevées à l’échelle Prüfungsangst (PA ; anxiété face aux examens) de l’AFS méritent d’être explorées lors d’un entretien : situations concernées, évitement éventuel et comparaison des performances en évaluation et en classe.'
        : (lang === 'en' ? 'The raised score on the AFS scale Prüfungsangst (PA; test anxiety) should be explored in an interview: the situations involved, any avoidance, and how performance in tests compares with classwork.'
          : 'Die erhöhten Werte der Skala Prüfungsangst (PA) im AFS sollten im Gespräch genauer betrachtet werden: betroffene Situationen, mögliche Vermeidung und der Vergleich der Leistungen in Prüfungen und im Unterricht.'));
    }
    if (hoch('ma')) {
      h.push(lang === 'fr' ? 'Les valeurs élevées à l’échelle Manifeste Angst (MA ; anxiété manifeste) de l’AFS méritent d’être approfondies lors d’un entretien et, si nécessaire, à l’aide d’un instrument spécifique de l’anxiété.'
        : (lang === 'en' ? 'The raised score on the AFS scale Manifeste Angst (MA; manifest anxiety) should be explored further in an interview and, if needed, with a specific anxiety measure.'
          : 'Die erhöhten Werte der Skala Manifeste Angst (MA) im AFS sollten im Gespräch und bei Bedarf mit einem spezifischen Angstverfahren vertieft werden.'));
    }
    if (hoch('su')) {
      h.push(lang === 'fr' ? 'Les valeurs élevées à l’échelle Schulunlust (SU ; aversion scolaire) de l’AFS justifient de rechercher les causes possibles lors d’entretiens avec l’élève, les parents et l’école (p. ex. exigences trop élevées ou trop faibles, relations dans la classe).'
        : (lang === 'en' ? 'The raised score on the AFS scale Schulunlust (SU; school aversion) should prompt a search for possible reasons in conversations with the pupil, the parents and the school (e.g. demands that are too high or too low, relationships in class).'
          : 'Die erhöhten Werte der Skala Schulunlust (SU) im AFS sollten im Gespräch mit Kind, Eltern und Schule nach möglichen Gründen vertieft werden (z. B. Über- oder Unterforderung, Beziehungen in der Klasse).'));
    }
    return h;
  }
  function warnung(d, fall) {
    var a = B.alter(fall.kind.geburtsdatum, d.datum || fall.bericht.datumVon);
    if (a && (a.dezimal < 9 || a.dezimal >= 19)) { return 'Der AFS (7. Auflage) ist für 9 bis 18 Jahre normiert – das Kind ist ' + B.alterText(a, 'de') + ' alt.'; }
    if (d.normen !== 'stanine' && /^\d+$/.test(String(d.klasse || '')) && (+d.klasse < 4 || +d.klasse > 12)) { return 'Die Normen der 7. Auflage gelten für die Klassenstufen 4 bis 12.'; }
    var ausw = auswerten(d), widerspruch = ausw.zeilen.filter(function (z) {
      if (z.t == null || z.pr == null) { return false; }
      var a1 = KAT.einstufen(bandId(z.sk, 't'), z.t), a2 = KAT.einstufen(bandId(z.sk, 'pr'), z.pr);
      return Math.abs(a1.index - a2.index) >= 2;
    });
    if (widerspruch.length) { return 'T-Wert und Prozentrang passen bei ' + widerspruch.map(function (z) { return z.sk.kurz; }).join(', ') + ' nicht zusammen – bitte prüfen.'; }
    return '';
  }
  function fertig(d) { var a = auswerten(d); return PROBLEM.every(function (sk) { return !!zeileVon(a, sk.id).band; }); }
  /* Übernahme aus der früheren Version: dort Stanine 1–9 für PA, MA, SU, SE */
  function ausAlt(alt) {
    var f = (alt || {}).fields || {}, d = neu(), hat = false;
    SKALEN.forEach(function (sk) {
      var n = B.num(f['afs-' + sk.id]);
      if (n != null && n >= 1 && n <= 9 && Math.round(n) === n) { d.sn[sk.id] = String(n); hat = true; }
    });
    if (!hat) { return null; }
    d.normen = 'stanine'; d.uebernommen = true;
    return d;
  }

  KAT.registrieren({
    id: 'afs', kurz: 'AFS', kurzUi: 'AFS', gruppe: 'emotion', alter: [9, 18], informantenText: 'Selbstbeurteilung, Klassen 4–12',
    name: L(TITEL, TITEL + ' (questionnaire d’anxiété pour élèves)', TITEL + ' (anxiety questionnaire for school students)'),
    hilfe: 'Rohwerte mit der Schablone auszählen, T-Werte und Prozentränge aus der Normtabelle der Klassenstufe. Soziale Erwünschtheit (SE) ist eine Kontrollskala und wird als Hinweis zur Gültigkeit berichtet.',
    neu: neu, formular: formular, auswerten: auswerten, chip: chip, bericht: bericht, verfahrenZeile: verfahrenZeile,
    zusammenfassung: zusammenfassung, hinweise: hinweise, warnung: warnung, fertig: fertig, ausAlt: ausAlt,
    pruefen: ['Auflage und Jahr: 7., überarbeitete und neu normierte Auflage 2016 (Wieczerkowski, Nickel, Janowski, Fittkau, Rauer & Petermann; Normierung N ≈ 2 300, Klassen 4–12, 9–18 Jahre) laut Verlagsangaben – Zitierweise und Jahr am Manual bestätigen.',
      'Normtabellen: T-Werte und Prozentränge laut Verlag; Gliederung nach Klassenstufe und Geschlecht (ggf. Schulform) am Manual prüfen.',
      'Interpretationsbereiche: keine Manual-Grenzwerte bekannt – hier statistisch (T 60–69 überdurchschnittlich, ab 70 weit überdurchschnittlich).',
      'Kontrollskala SE: ab wann laut Manual ein Hinweis auf sozial erwünschtes Antworten besteht (hier statistisch ab T 60 bzw. Stanine 7).',
      'Stanine-Option nur für Werte der alten App bzw. älterer Auflagen – Normmetrik der älteren Auflagen ist nicht belegt.',
      'FR/EN: Übersetzungen der Skalennamen (anxiété face aux examens / test anxiety, anxiété manifeste / manifest anxiety, aversion scolaire / school aversion, désirabilité sociale / social desirability) sind eigene Übersetzungen – kein offizielles FR/EN-AFS.']
  });
})();
