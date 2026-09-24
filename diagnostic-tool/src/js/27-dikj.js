/* =====================================================================
   DIKJ – Depressionsinventar für Kinder und Jugendliche
   (Stiensmeier-Pelster, Braune-Krickau, Schürmann & Duda, 2014)
   ---------------------------------------------------------------------
   Selbstbeurteilung für 8- bis 16-Jährige.
   3. Auflage (2014): 29 Items – die 26 Items der 2. Auflage, ergänzt um
   je ein Item zu Anhedonie, sozialem Rückzug und somatischen
   Beschwerden –, je 0–2 Punkte → Gesamtrohwert 0–58.
   2. Auflage (2000, Stiensmeier-Pelster, Schürmann & Duda): 26 Items, 0–52.
   Sicher gerechnet wird nur die Summe der Itemantworten, und nur, wenn
   alle Items eingetragen sind. T-Wert (M 50, SD 10) und Prozentrang
   kommen aus der Normtabelle der Vergleichsgruppe und werden
   eingegeben. Ohne T-Wert: nur Rohwert, keine Einstufung.
   Kritisches Item (Gedanken an Suizid bzw. Selbstverletzung):
   Antwort 0/1/2 → markierte Angabe über sicherheit(), ohne Ableitung
   einer „akuten Gefährdung“ und ohne Handlungsanweisung.
   ===================================================================== */
(function () {
  var L = KAT.L;
  var AUFLAGEN = {
    '3': { id: '3', items: 29, max: 58, jahr: '2014', autoren: 'Stiensmeier-Pelster, Braune-Krickau, Schürmann & Duda',
      titel: 'Depressionsinventar für Kinder und Jugendliche',
      aufl: L('3., überarbeitete und neu normierte Auflage', '3e édition révisée et réétalonnée', '3rd revised and re-standardised edition'),
      kurz: L('3. Auflage', '3e édition', '3rd edition') },
    '2': { id: '2', items: 26, max: 52, jahr: '2000', autoren: 'Stiensmeier-Pelster, Schürmann & Duda',
      titel: 'Depressions-Inventar für Kinder und Jugendliche',
      aufl: L('2., überarbeitete und neunormierte Auflage', '2e édition révisée et réétalonnée', '2nd revised and re-standardised edition'),
      kurz: L('2. Auflage', '2e édition', '2nd edition') }
  };
  /* keine offizielle französische/englische Fassung bekannt: Übersetzung in Klammern */
  var UEBERSETZUNG = { fr: 'inventaire de dépression pour enfants et adolescents', en: 'Depression Inventory for Children and Adolescents' };
  var T_MIN = 20, T_MAX = 100;
  function auflage(d) { return AUFLAGEN[d && d.auflage] || AUFLAGEN['3']; }
  function zahl(v, min, max, ganz) {
    var n = B.num(v);
    if (n == null || n < min || n > max || (ganz && Math.round(n) !== n)) { return null; }
    return n;
  }
  function voll(v) { return v != null && String(v).trim() !== ''; }

  /* Einstufung nach T-Wert: statistisch (1 bzw. 2 Standardabweichungen über dem Mittelwert) */
  KAT.bandDefinieren('dikj-t', { art: 'problem',
    pruefen: 'DIKJ: Grenzen der Einstufung am Manual der 3. Auflage prüfen – hier statistisch: T bis 59 unauffällig, 60–69 erhöht, ab 70 deutlich erhöht. Für die 2. Auflage wird in der Literatur ein Rohwert ab 18 (PR 85,3) als auffällig genannt.',
    stufen: [
      { bis: 59, rang: 0, name: L('unauffällig', 'dans la norme', 'within normal limits') },
      { bis: 69, rang: 1, name: L('erhöht', 'élevé', 'elevated') },
      { bis: Infinity, rang: 2, name: L('deutlich erhöht', 'nettement élevé', 'markedly elevated') }] });

  function neu() {
    return { datum: '', auflage: '3', eingabe: 'summe', normGeschlecht: '', normAlter: '', normWeitere: '',
      w: { roh: {}, t: {}, pr: {} }, items: {}, kritisch: '', kritischNr: '' };
  }
  /* Itemantworten zählen; die Summe gibt es nur, wenn alle Items gültig eingetragen sind */
  function itemsZaehlen(d) {
    var a = auflage(d), n = 0, summe = 0, ungueltig = 0;
    for (var i = 1; i <= a.items; i++) {
      var roh = (d.items || {})[i];
      if (!voll(roh)) { continue; }
      var v = zahl(roh, 0, 2, true);
      if (v == null) { ungueltig++; continue; }
      n++; summe += v;
    }
    return { beantwortet: n, ungueltig: ungueltig, von: a.items, summe: n === a.items ? summe : null };
  }
  function auswerten(d) {
    var a = auflage(d), w = d.w || {}, it = null, roh;
    if (d.eingabe === 'items') { it = itemsZaehlen(d); roh = it.summe; }
    else { roh = zahl((w.roh || {}).gesamt, 0, a.max, true); }
    var t = zahl((w.t || {}).gesamt, T_MIN, T_MAX, true);
    var pr = zahl((w.pr || {}).gesamt, 0, 100, false);
    var nr = zahl(d.kritischNr, 1, a.items, true);
    var k = zahl(d.kritisch, 0, 2, true), kItem = null;
    /* Sind die Items einzeln eingegeben und ist die Itemnummer bekannt, zählt auch die Antwort dort */
    if (d.eingabe === 'items' && nr != null) { kItem = zahl((d.items || {})[nr], 0, 2, true); }
    return { auflage: a, roh: roh, items: it, t: t, pr: pr, band: t == null ? null : KAT.einstufen('dikj-t', t),
      kritisch: k != null ? k : kItem, kritischNr: nr, kritischItem: kItem, kritischEingabe: k };
  }
  function chip(pfad, n) { return /\.w\.t\.gesamt$/.test(pfad) ? KAT.einstufen('dikj-t', n) : null; }

  /* ---------------- Formular ---------------- */
  var ALTER_RE = /^\s*(\d{1,2})(?:\s*[-–]\s*(\d{1,2}))?\s*$/;
  function itemsUi(d) {
    var a = auflage(d), h = '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(62px,1fr));gap:8px 10px;margin-bottom:6px">';
    for (var i = 1; i <= a.items; i++) {
      var p = 'tests.dikj.items.' + i, v = String(E.wert(p)), ok = v === '' || zahl(v, 0, 2, true) != null;
      h += '<label class="feld"><span>' + i + '</span><input class="eingabe' + (ok ? '' : ' fehler') + '" data-pfad="' + p + '" value="' + B.esc(v) + '" inputmode="numeric" autocomplete="off" data-min="0" data-max="2" data-ganz="1" aria-label="Item ' + i + '"></label>';
    }
    return h + '</div>';
  }
  function summeUi(d) {
    var it = itemsZaehlen(d);
    if (it.summe != null) { return '<p class="klein" style="margin:8px 0 12px"><b>Gesamtrohwert: ' + it.summe + '</b> <span class="leise">(alle ' + it.von + ' Items eingetragen)</span></p>'; }
    return '<p class="klein" style="margin:8px 0 12px"><b>Gesamtrohwert: –</b> <span class="leise">(' + it.beantwortet + ' von ' + it.von + ' Items eingetragen' + (it.ungueltig ? ', ' + it.ungueltig + ' ungültig' : '') + ' – die Summe wird berechnet, sobald alle Items eingetragen sind)</span></p>';
  }
  function sicherheitUi(d) {
    var a = auswerten(d), h = '';
    if (a.kritischEingabe != null && a.kritischItem != null && a.kritischEingabe !== a.kritischItem) {
      h += E.hinweis('Die Auswahl (' + a.kritischEingabe + ') weicht von Item ' + a.kritischNr + ' in den Itemantworten (' + a.kritischItem + ') ab – bitte prüfen. Für den Bericht zählt die Auswahl.');
    }
    if (a.kritisch != null && a.kritisch >= 1) {
      h += E.hinweis('Antwort ' + a.kritisch + (a.kritischNr ? ' bei Item ' + a.kritischNr : '') + ' – erscheint im Bericht unter „Hinweis zur Sicherheit“. Bitte zeitnah mit dem Kind besprechen und unter „Beobachtung und Einordnung“ festhalten, was getan bzw. vereinbart wurde.', 'gefahr');
    }
    return h;
  }
  function formular(d) {
    var a = auflage(d);
    var h = E.karte('<h2>Durchführung</h2><div class="raster">' +
      E.feld('tests.dikj.datum', 'Datum', { typ: 'date' }) +
      E.auswahl('tests.dikj.auflage', 'Auflage', [['3', '3. Aufl. 2014 (29 Items)'], ['2', '2. Aufl. 2000 (26 Items)']], { neu: true, hilfe: 'Fragebogen und Normen derselben Auflage' }) +
      E.auswahl('tests.dikj.eingabe', 'Eingabe', [['summe', 'Gesamtrohwert (Summe)'], ['items', 'Einzelne Itemantworten 0/1/2']], { neu: true }) + '</div>' +
      '<h3 style="margin:16px 0 8px">Vergleichsgruppe der Normtabelle</h3><div class="raster">' +
      E.auswahl('tests.dikj.normGeschlecht', 'Geschlecht', [['w', 'Mädchen'], ['m', 'Jungen'], ['alle', 'Mädchen und Jungen gemeinsam']], { leer: '– nicht angegeben –' }) +
      E.feld('tests.dikj.normAlter', 'Alter bzw. Altersgruppe (Jahre)', { platzhalter: 'z. B. 12 oder 11–12' }) +
      E.feld('tests.dikj.normWeitere', 'Weitere Angabe (optional)', { platzhalter: 'z. B. Schulform laut Normtabelle', hilfe: 'erscheint unverändert im Bericht' }) + '</div>');
    var spalten = [{ id: 't', label: 'T-Wert', min: T_MIN, max: T_MAX, ganz: true }, { id: 'pr', label: 'Prozentrang', min: 0, max: 100, ganz: false, ohneChip: true }];
    if (d.eingabe !== 'items') { spalten.unshift({ id: 'roh', label: 'Rohwert', min: 0, max: a.max, ganz: true, ohneChip: true }); }
    var k = '<h2>Gesamtwert</h2><p class="klein">' + (d.eingabe === 'items'
      ? 'Itemantworten so übertragen, wie angekreuzt (0, 1 oder 2). Die Summe rechnet das Tool, sobald alle ' + a.items + ' Items eingetragen sind.'
      : 'Gesamtrohwert (Summe der ' + a.items + ' Items, 0–' + a.max + ') aus dem Auswertungsbogen.') +
      ' T-Wert (Mittelwert 50, Standardabweichung 10) und Prozentrang aus der Normtabelle der Vergleichsgruppe. Ohne T-Wert gibt es keine Einstufung.</p>';
    if (d.eingabe === 'items') { k += itemsUi(d) + '<div id="dikj-summe">' + summeUi(d) + '</div>'; }
    k += E.raster({ basis: 'tests.dikj.w', kopfSkala: 'Kennwert', chipAmEnde: true, spalten: spalten,
      zeilen: [{ id: 'gesamt', name: 'Gesamtwert', hinweis: d.eingabe === 'items' ? 'Rohwert: Summe oben' : 'Rohwert 0–' + a.max }],
      einstufen: function (z, s, n) { return s === 't' ? KAT.einstufen('dikj-t', n) : null; } });
    h += E.karte(k);
    h += E.karte('<h2>Kritisches Item: Gedanken an Suizid bzw. Selbstverletzung</h2><p class="klein">Antwort so übertragen, wie angekreuzt. Eine Antwort 1 oder 2 erscheint im Bericht als markierte Angabe unter „Hinweis zur Sicherheit“. Die Itemnummer ist optional – bitte am Fragebogen ablesen (die frühere Version nahm ohne Beleg Item 9 an).' +
      (d.eingabe === 'items' ? ' Mit Itemnummer wird die Antwort aus den Itemantworten oben übernommen.' : '') + '</p><div class="raster">' +
      E.auswahl('tests.dikj.kritisch', 'Antwort (0, 1 oder 2)', [['0', '0'], ['1', '1'], ['2', '2']], { leer: '– nicht übertragen –' }) +
      E.feld('tests.dikj.kritischNr', 'Itemnummer auf dem Fragebogen (optional)', { min: 1, max: a.items, ganz: true, inputmode: 'numeric', platzhalter: '1–' + a.items }) + '</div>' +
      '<div id="dikj-sicherheit">' + sicherheitUi(d) + '</div>');
    return h;
  }
  function teilUpdate(d) { return { 'dikj-summe': summeUi(d), 'dikj-sicherheit': sicherheitUi(d) }; }

  /* ---------------- Bericht ---------------- */
  function zweck(lang, a) {
    if (lang === 'fr') {
      return 'Le DIKJ est un autoquestionnaire qui évalue la sévérité des symptômes dépressifs chez les enfants et adolescents de 8 à 16 ans. Chacun des ' + a.items + ' items propose trois réponses (0 à 2 points) ; leur somme donne le score brut total (0 à ' + a.max + '). Les normes fournissent une note T (moyenne 50, écart type 10) et un rang centile ; des scores plus élevés indiquent des symptômes dépressifs plus marqués.';
    }
    if (lang === 'en') {
      return 'The DIKJ is a self-report questionnaire that assesses the severity of depressive symptoms in children and adolescents aged 8 to 16. Each of the ' + a.items + ' items has three response options (0 to 2 points); their sum gives the total raw score (0 to ' + a.max + '). The norm tables provide a T-score (mean 50, standard deviation 10) and a percentile rank; higher scores indicate more pronounced depressive symptoms.';
    }
    return 'Das DIKJ ist ein Fragebogen zur Selbstbeurteilung, mit dem die Schwere depressiver Symptome bei Kindern und Jugendlichen von 8 bis 16 Jahren erfasst wird. Die ' + a.items + ' Items haben je drei Antwortmöglichkeiten (0 bis 2 Punkte); ihre Summe ergibt den Gesamtrohwert (0 bis ' + a.max + '). Aus der Normtabelle ergeben sich ein T-Wert (Mittelwert 50, Standardabweichung 10) und ein Prozentrang; höhere Werte bedeuten stärker ausgeprägte depressive Symptome.';
  }
  /* „13 Jahre“ · „13 ans“ · „aged 13“ (auch Spannen: „11–12 Jahre“) */
  function alterText(v, lang) {
    var m = ALTER_RE.exec(String(v || ''));
    if (!m) { return ''; }
    var z = m[2] ? m[1] + '–' + m[2] : m[1];
    return lang === 'en' ? 'aged ' + z : z + (lang === 'fr' ? ' ans' : ' Jahre');
  }
  function vergleichsgruppe(d, lang) {
    var g = { w: L('Mädchen', 'filles', 'girls'), m: L('Jungen', 'garçons', 'boys'), alle: L('Mädchen und Jungen', 'filles et garçons', 'girls and boys') }[d.normGeschlecht];
    return [g ? B.t(g, lang) : '', alterText(d.normAlter, lang), String(d.normWeitere || '').trim()].filter(Boolean).join(', ');
  }
  function normSatz(lang, d, a) {
    var vg = vergleichsgruppe(d, lang), ed = B.t(a.kurz, lang) + ' (' + a.jahr + ')';
    if (lang === 'fr') { return 'Les notes normées reposent sur les normes de la ' + ed + (vg ? ' ; groupe de référence : ' + vg : ''); }
    if (lang === 'en') { return 'The norm-referenced scores are based on the norms of the ' + ed + (vg ? '; comparison group: ' + vg : ''); }
    return 'Grundlage der Normwerte sind die Normen der ' + ed + (vg ? '; Vergleichsgruppe: ' + vg : '');
  }
  function werSatz(lang, ctx, d) {
    var dat = d.datum ? B.datum(d.datum, lang) : '';
    if (lang === 'fr') { return 'Le questionnaire a été rempli par ' + ctx.name + ' (autoévaluation)' + (dat ? ' le ' + dat : ''); }
    if (lang === 'en') { return ctx.name + ' completed the questionnaire (self-report)' + (dat ? ' on ' + dat : ''); }
    return ctx.name + ' hat den Fragebogen' + (dat ? ' am ' + dat : '') + ' selbst ausgefüllt';
  }
  function prText(pr, lang) { return (lang === 'fr' ? 'rang centile ' : (lang === 'en' ? 'percentile rank ' : 'PR ')) + B.zahl(pr, lang); }
  /* FR: „se situe dans la norme“ · „est élevé“ (Stufen sind Beschreibungen, keine Namen) */
  function frBand(bn) { return /^dans /.test(bn) ? 'se situe ' + bn : 'est ' + bn; }
  function ergebnisSaetze(lang, ctx, ausw) {
    var a = ausw.auflage, s = [], it = ausw.items;
    if (it && it.summe == null && it.beantwortet > 0) {
      s.push(lang === 'fr' ? (it.beantwortet === 1 ? 'Seul 1 item sur ' + it.von + ' a été saisi' : it.beantwortet + ' items sur ' + it.von + ' ont été saisis') + ' ; le score brut total n’a donc pas été calculé'
        : (lang === 'en' ? 'Only ' + it.beantwortet + ' of the ' + it.von + ' items ' + (it.beantwortet === 1 ? 'was' : 'were') + ' entered, so the total raw score was not calculated'
          : 'Es wurden ' + it.beantwortet + ' von ' + it.von + ' Items eingetragen; der Gesamtrohwert wurde daher nicht berechnet'));
    }
    if (ausw.roh != null) {
      s.push(lang === 'fr' ? 'Le score brut total est de ' + ausw.roh + ' sur ' + a.max + ' points possibles'
        : (lang === 'en' ? 'The total raw score is ' + ausw.roh + ' out of a possible ' + a.max : 'Der Gesamtrohwert beträgt ' + ausw.roh + ' von ' + a.max + ' möglichen Punkten'));
    }
    if (ausw.t != null) {
      var bn = B.t(ausw.band.name, lang), werte = [TX.einheit('T', lang) + ' ' + ausw.t];
      if (ausw.pr != null) { werte.push(prText(ausw.pr, lang)); }
      var kl = ' (' + werte.join('; ') + ')';
      s.push(lang === 'fr' ? 'Le score total ' + frBand(bn) + kl : (lang === 'en' ? 'The total score is ' + bn + kl : 'Der Gesamtwert ist ' + bn + kl));
      var r = ausw.band.rang;
      if (r === 0) {
        s.push(lang === 'fr' ? 'L’intensité des symptômes dépressifs rapportés se situe dans la fourchette habituelle du groupe de référence'
          : (lang === 'en' ? 'The level of depressive symptoms reported is within the usual range of the comparison group'
            : 'Das Ausmaß der angegebenen depressiven Symptome liegt im üblichen Bereich der Vergleichsgruppe'));
      } else {
        var stark = r >= 2;
        s.push(lang === 'fr' ? ctx.name + ' rapporte ' + (stark ? 'nettement plus' : 'davantage') + ' de symptômes dépressifs que la plupart des enfants et adolescents du groupe de référence'
          : (lang === 'en' ? ctx.name + ' reports ' + (stark ? 'considerably more' : 'more') + ' depressive symptoms than most children and adolescents in the comparison group'
            : ctx.name + ' gibt ' + (stark ? 'deutlich mehr' : 'mehr') + ' depressive Symptome an als die meisten Kinder und Jugendlichen der Vergleichsgruppe'));
      }
    } else if (ausw.roh != null || ausw.pr != null) {
      s.push(lang === 'fr' ? 'Aucune note T issue des normes n’a été saisie ; une classification n’est donc pas possible'
        : (lang === 'en' ? 'No T-score from the norm tables was entered, so no classification is possible'
          : 'Es wurde kein T-Wert aus der Normtabelle eingegeben; eine Einstufung ist daher nicht möglich'));
      if (ausw.pr != null) {
        s.push(ausw.roh != null
          ? (lang === 'fr' ? 'Selon les normes, ce score correspond à un rang centile de ' + B.zahl(ausw.pr, lang) : (lang === 'en' ? 'According to the norm tables, this corresponds to a percentile rank of ' + B.zahl(ausw.pr, lang) : 'Laut Normtabelle entspricht das einem Prozentrang von ' + B.zahl(ausw.pr, lang)))
          : (lang === 'fr' ? 'Selon les normes, le rang centile est de ' + B.zahl(ausw.pr, lang) : (lang === 'en' ? 'According to the norm tables, the percentile rank is ' + B.zahl(ausw.pr, lang) : 'Laut Normtabelle beträgt der Prozentrang ' + B.zahl(ausw.pr, lang))));
      } else {
        s.push(lang === 'fr' ? 'Le score brut seul ne permet pas de comparaison avec l’échantillon de référence'
          : (lang === 'en' ? 'The raw score alone does not allow a comparison with the normative sample' : 'Der Rohwert allein erlaubt keinen Vergleich mit der Normstichprobe'));
      }
    }
    return s.map(function (x) { return TX.satz(x, lang); }).join(' ');
  }
  function bericht(lang, ctx, d, ausw) {
    var a = ausw.auflage, bl = [{ t: 'p', text: zweck(lang, a) }];
    var hat = ausw.roh != null || ausw.t != null || ausw.pr != null || (ausw.items && ausw.items.beantwortet > 0);
    if (!hat) { bl.push({ t: 'p', text: lang === 'fr' ? 'Aucun résultat n’a encore été saisi.' : (lang === 'en' ? 'No results have been entered yet.' : 'Es wurden noch keine Ergebnisse eingegeben.') }); return bl; }
    var s = [werSatz(lang, ctx, d)];
    if (ausw.t != null || ausw.pr != null) { s.push(normSatz(lang, d, a)); }
    bl.push({ t: 'p', text: s.map(function (x) { return TX.satz(x, lang); }).join(' ') });
    var S = SPRACHE[lang].spalten;
    var anm = lang === 'fr' ? 'Score brut : somme des ' + a.items + ' items (0 à 2 points chacun, total possible 0 à ' + a.max + '). Notes T : moyenne 50, écart type 10 ; des notes plus élevées indiquent davantage de symptômes dépressifs.'
      : (lang === 'en' ? 'Raw score: sum of the ' + a.items + ' items (0–2 points each, possible range 0–' + a.max + '). T-scores: mean 50, standard deviation 10; higher scores indicate more depressive symptoms.'
        : 'Rohwert: Summe der ' + a.items + ' Items (je 0–2 Punkte, möglich 0–' + a.max + '). T-Werte: Mittelwert 50, Standardabweichung 10; höhere Werte bedeuten mehr depressive Symptome.');
    if (ausw.t != null) {
      anm += lang === 'fr' ? ' Classification selon la note T : jusqu’à 59 dans la norme, de 60 à 69 élevé, à partir de 70 nettement élevé.'
        : (lang === 'en' ? ' Classification by T-score: up to 59 within normal limits, 60–69 elevated, 70 and above markedly elevated.'
          : ' Einstufung nach T-Wert: bis 59 unauffällig, 60–69 erhöht, ab 70 deutlich erhöht.');
    }
    bl.push({ t: 'tabelle', kopf: [lang === 'fr' ? 'Indicateur' : (lang === 'en' ? 'Score' : 'Kennwert'), lang === 'fr' ? 'Score brut' : (lang === 'en' ? 'Raw score' : 'Rohwert'), lang === 'fr' ? 'Note T' : (lang === 'en' ? 'T-score' : 'T-Wert'), S.pr, S.einstufung], zahlSpalten: [1, 2, 3],
      zeilen: [[lang === 'fr' ? 'Score total' : (lang === 'en' ? 'Total score' : 'Gesamtwert'), ausw.roh == null ? '–' : String(ausw.roh), ausw.t == null ? '–' : String(ausw.t), ausw.pr == null ? '–' : B.zahl(ausw.pr, lang), ausw.band ? B.t(ausw.band.name, lang) : '–']],
      anmerkung: anm });
    var e = ergebnisSaetze(lang, ctx, ausw);
    if (e) { bl.push({ t: 'p', text: e }); }
    return bl;
  }
  function verfahrenZeile(lang, d) {
    var a = auflage(d), quelle = a.autoren + ', ' + a.jahr, dat = d.datum ? ', ' + B.datum(d.datum, lang) : '';
    if (lang === 'fr') { return 'DIKJ – ' + a.titel + ' (' + UEBERSETZUNG.fr + ' ; ' + quelle + ', ' + B.t(a.aufl, lang) + ') : ' + infForm('selbst', lang) + dat; }
    if (lang === 'en') { return 'DIKJ – ' + a.titel + ' (' + UEBERSETZUNG.en + '; ' + quelle + ', ' + B.t(a.aufl, lang) + '): ' + infForm('selbst', lang) + dat; }
    return 'DIKJ – ' + a.titel + ' (' + quelle + '; ' + B.t(a.aufl, lang) + '): ' + infForm('selbst', lang) + dat;
  }
  function kritischTeil(lang, k, nr, kurz) {
    var item = nr ? ' (' + (lang === 'de' ? 'Item ' : 'item ') + nr + ')' : '';
    if (lang === 'fr') { return (kurz ? 'item critique' : 'l’item') + ' portant sur des idées de suicide ou d’automutilation' + item; }
    if (lang === 'en') { return (kurz ? 'critical item' : 'the item') + ' on thoughts of suicide or self-harm' + item; }
    return (kurz ? 'kritisches Item' : 'das Item') + ' zu Gedanken an Suizid bzw. Selbstverletzung' + item;
  }
  function zusammenfassung(lang, ctx, d, ausw) {
    var teile = [];
    if (ausw.t != null) {
      var bn = B.t(ausw.band.name, lang);
      teile.push(lang === 'fr' ? 'score total ' + bn + ' (note T ' + ausw.t + ')' : (lang === 'en' ? 'total score ' + bn + ' (T-score ' + ausw.t + ')' : 'Gesamtwert ' + bn + ' (T-Wert ' + ausw.t + ')'));
    } else if (ausw.roh != null) {
      teile.push(lang === 'fr' ? 'score brut ' + ausw.roh + ' (sans note T, pas de classification)' : (lang === 'en' ? 'raw score ' + ausw.roh + ' (not classified without a T-score)' : 'Rohwert ' + ausw.roh + ' (ohne T-Wert keine Einstufung)'));
    }
    if (ausw.kritisch != null && ausw.kritisch >= 1) {
      var sh = TX.q(SPRACHE[lang].h.sicherheit, lang);
      teile.push(lang === 'fr' ? kritischTeil(lang, ausw.kritisch, ausw.kritischNr, true) + ' coté ' + ausw.kritisch + ' (voir ' + sh + ')'
        : (lang === 'en' ? kritischTeil(lang, ausw.kritisch, ausw.kritischNr, true) + ' answered with ' + ausw.kritisch + ' (see ' + sh + ')'
          : kritischTeil(lang, ausw.kritisch, ausw.kritischNr, true) + ' mit ' + ausw.kritisch + ' beantwortet (siehe ' + sh + ')'));
    }
    if (!teile.length) { return ''; }
    return 'DIKJ' + (lang === 'fr' ? ' : ' : ': ') + teile.join('; ') + '.';
  }
  /* DE: Dativ für „im Gespräch mit …“ (ohne Vornamen: „dem Kind“, „dem/der Jugendlichen“) */
  function mitWem(ctx, lang) {
    if (lang !== 'de' || ctx.vorname) { return ctx.name; }
    return ctx.name === SPRACHE.de.jugendAllg ? 'dem/der Jugendlichen' : 'dem Kind';
  }
  function hinweise(lang, ctx, d, ausw) {
    if (!ausw.band || ausw.band.rang < 1) { return []; }
    var n = mitWem(ctx, lang);
    return [lang === 'fr' ? 'Les scores élevés au DIKJ devraient être approfondis lors d’un entretien avec ' + n + ' et, si possible, avec les parents, ainsi qu’à l’aide de l’anamnèse et du suivi de l’évolution ; cela inclut la question d’éventuelles pensées de mort ou idées suicidaires.'
      : (lang === 'en' ? 'The elevated DIKJ scores should be explored further in an interview with ' + n + ' and, where possible, the parents, as well as through the history and follow-up over time; this includes asking about thoughts of death or suicide.'
        : 'Die erhöhten Werte im DIKJ sollten im Gespräch mit ' + n + ' und – wenn möglich – den Eltern sowie über Anamnese und Verlauf vertieft werden; dazu gehört auch die Frage nach Gedanken an Tod oder Suizid.')];
  }
  /* Markierte Angabe für den zentralen Sicherheitsbaustein – sachlich, ohne Bewertung */
  function sicherheit(lang, d) {
    var ausw = auswerten(d), k = ausw.kritisch;
    if (k == null || k < 1) { return []; }
    var stufe = k === 2 ? L('höchste Antwortstufe', 'niveau de réponse le plus élevé', 'highest response level') : L('mittlere Antwortstufe', 'niveau de réponse intermédiaire', 'middle response level');
    if (lang === 'fr') { return ['DIKJ (autoévaluation) : ' + kritischTeil(lang, k, ausw.kritischNr) + ' a été coté ' + k + ' (' + B.t(stufe, lang) + ').']; }
    if (lang === 'en') { return ['DIKJ (self-report): ' + kritischTeil(lang, k, ausw.kritischNr) + ' was answered with ' + k + ' (' + B.t(stufe, lang) + ').']; }
    return ['DIKJ (Selbsturteil): ' + B.ersteGross(kritischTeil(lang, k, ausw.kritischNr)) + ' wurde mit ' + k + ' beantwortet (' + B.t(stufe, lang) + ').'];
  }
  function warnung(d, fall) {
    var a = B.alter(fall.kind.geburtsdatum, d.datum || fall.bericht.datumVon);
    if (a && (a.dezimal < 8 || a.dezimal >= 17)) { return 'Das DIKJ ist für 8 bis 16 Jahre normiert – das Kind ist ' + B.alterText(a, 'de') + ' alt.'; }
    var ausw = auswerten(d);
    if (ausw.kritischEingabe != null && ausw.kritischItem != null && ausw.kritischEingabe !== ausw.kritischItem) {
      return 'Beim kritischen Item steht die Antwort ' + ausw.kritischEingabe + ', bei Item ' + ausw.kritischNr + ' in den Itemantworten aber ' + ausw.kritischItem + ' – bitte prüfen.';
    }
    if (voll(d.normAlter) && !ALTER_RE.test(String(d.normAlter))) { return 'Alter der Vergleichsgruppe bitte als Zahl oder Spanne eingeben (z. B. 12 oder 11–12) – so erscheint es in allen Berichtssprachen richtig.'; }
    if (ausw.t == null && (ausw.roh != null || ausw.pr != null)) { return 'Ohne T-Wert aus der Normtabelle berichtet das Tool nur den Rohwert – ohne Einstufung.'; }
    return '';
  }
  function fertig(d) { return auswerten(d).t != null; }
  /* Übernahme aus der früheren Version: nur echte Eingaben. Nicht übernommen werden die
     geschätzten T-Werte (wurden nie gespeichert), die Altersgruppen 8–13/14–17 (keine
     Normgruppen des Manuals) und die Voreinstellung „Kombiniert“ beim Geschlecht. */
  function ausAlt(alt) {
    var f = alt.fields || {}, d = neu(), hat = false;
    if (voll(f['dikj-raw'])) { d.w.roh.gesamt = String(f['dikj-raw']).trim(); hat = true; }
    if (voll(f['dikj-t'])) { d.w.t.gesamt = String(f['dikj-t']).trim(); hat = true; }
    if (voll(f['dikj-pr'])) { d.w.pr.gesamt = String(f['dikj-pr']).trim(); hat = true; }
    if (['0', '1', '2'].indexOf(String(f['dikj-item9'])) >= 0) { d.kritisch = String(f['dikj-item9']); hat = true; }
    var ex = { keine: 'Keine Hinweise auf Suizidalität im Gespräch', passiv: 'Passive Todeswünsche / Lebensüberdruss', aktiv: 'Aktive Suizidgedanken ohne Plan', konkret: 'Konkrete Absicht / Plan / Vorbereitung' }[f['dikj-suizid-expl']];
    if (ex) { d.beobachtung = 'Exploration zur Suizidalität (aus der früheren Version übernommen): ' + ex + '.'; hat = true; }
    if (!hat) { return null; }
    if (f['dikj-sex'] === 'm' || f['dikj-sex'] === 'w') { d.normGeschlecht = f['dikj-sex']; }
    return d;
  }

  KAT.registrieren({
    id: 'dikj', kurz: 'DIKJ', kurzUi: 'DIKJ',
    name: L('DIKJ – Depressionsinventar für Kinder und Jugendliche', 'DIKJ – Depressionsinventar für Kinder und Jugendliche (' + UEBERSETZUNG.fr + ')', 'DIKJ – Depressionsinventar für Kinder und Jugendliche (' + UEBERSETZUNG.en + ')'),
    gruppe: 'emotion', alter: [8, 16], informantenText: 'Selbsturteil',
    hilfe: 'Selbstbeurteilung für 8- bis 16-Jährige. Gesamtrohwert oder Itemantworten eintragen; T-Wert und Prozentrang aus der Normtabelle der passenden Vergleichsgruppe. Ohne T-Wert berichtet das Tool nur den Rohwert – ohne Einstufung.',
    neu: neu, formular: formular, auswerten: auswerten, chip: chip, teilUpdate: teilUpdate, bericht: bericht, verfahrenZeile: verfahrenZeile,
    zusammenfassung: zusammenfassung, hinweise: hinweise, sicherheit: sicherheit, warnung: warnung, fertig: fertig, ausAlt: ausAlt,
    pruefen: ['Itemzahl: Laut Verlag umfasst die 3. Auflage 29 Items (die 26 Items der 2. Auflage plus je ein Item zu Anhedonie, sozialem Rückzug und somatischen Beschwerden) – Rohwert hier 0–58. Bestätigen, dass der normierte Gesamtwert alle 29 Items umfasst (die frühere Version ging von 26 Items, 0–52 aus).',
      'Nummer und Wortlaut des Items zu Gedanken an Suizid bzw. Selbstverletzung am Fragebogen (3. und 2. Auflage) bestätigen. Die frühere Version nahm Item 9 an (wie beim CDI) – das ist nicht belegt; deshalb ist die Itemnummer hier ein optionales Feld.',
      'Vergleichsgruppen der Normtabellen: laut Verlag Normen nach Alter, Geschlecht und Schulform (N = 3.395, 8–16 Jahre). Genaue Aufteilung prüfen (Altersgruppen? gemeinsame Norm für Mädchen und Jungen?). Die Altersgruppen der alten App (8–13/14–17) wurden nicht übernommen.',
      'Umgang mit fehlenden Itemantworten laut Manual (das Tool bildet die Summe nur, wenn alle Items eingetragen sind).',
      'Eingabebereiche T 20–100 und PR 0–100 am Normtabellenbereich prüfen.',
      'Französische/englische Bezeichnung: keine offizielle Fassung bekannt – deutscher Titel mit Übersetzung in Klammern.',
      'Titel und Autorinnen/Autoren der 2. Auflage (2000: „Depressions-Inventar für Kinder und Jugendliche“, Stiensmeier-Pelster, Schürmann & Duda) am Manual bestätigen, falls diese Auflage im CDSE noch verwendet wird.']
  });
})();
