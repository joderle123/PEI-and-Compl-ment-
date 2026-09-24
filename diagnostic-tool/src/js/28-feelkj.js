/* =====================================================================
   FEEL-KJ – Fragebogen zur Erhebung der Emotionsregulation bei Kindern
   und Jugendlichen (Grob & Smolenski, 2. Auflage 2009, Huber)
   ---------------------------------------------------------------------
   Selbstbeurteilung, 10;0–19;11 Jahre, 90 Items (je 30 zu Angst, Trauer
   und Wut). 15 Strategieskalen: 7 adaptive, 5 maladaptive, 3 weitere
   (keiner Gruppe zugeordnet); Sekundärskalen Adaptive Strategien und
   Maladaptive Strategien (emotionsübergreifend und je Emotion).
   Eingabe: T-Werte (M 50, SD 10) und – falls vorhanden – Prozentränge
   aus dem Auswertungsbogen; T-Werte je Emotion optional. Das Tool
   rechnet keine Normwerte.
   Einstufung: T unter 40 unterdurchschnittlich, 40–60 durchschnittlich,
   über 60 überdurchschnittlich. Bewertung getrennt: adaptive Strategien
   niedrig = ungünstig, maladaptive Strategien hoch = ungünstig, weitere
   Strategien ohne Bewertung.
   Auch für die neu normierte Fassung FEEL-KJ-2 (Fassung wählen).
   ===================================================================== */
(function () {
  var L = KAT.L;
  /* Offizielle deutsche Skalennamen; FR/EN: keine offizielle Fassung → Übersetzung in Klammern */
  var SKALEN = [
    { id: 'ph', gruppe: 'adaptiv', de: 'Problemorientiertes Handeln', fr: 'action centrée sur le problème', en: 'problem-oriented action' },
    { id: 'ze', gruppe: 'adaptiv', de: 'Zerstreuung', fr: 'distraction', en: 'distraction' },
    { id: 'sa', gruppe: 'adaptiv', de: 'Stimmung anheben', fr: 'amélioration de l’humeur', en: 'mood improvement' },
    { id: 'ak', gruppe: 'adaptiv', de: 'Akzeptieren', fr: 'acceptation', en: 'acceptance' },
    { id: 've', gruppe: 'adaptiv', de: 'Vergessen', fr: 'oubli', en: 'forgetting' },
    { id: 'ub', gruppe: 'adaptiv', de: 'Umbewerten', fr: 'réévaluation', en: 'reappraisal' },
    { id: 'kp', gruppe: 'adaptiv', de: 'Kognitives Problemlösen', fr: 'résolution cognitive de problèmes', en: 'cognitive problem solving' },
    { id: 'au', gruppe: 'maladaptiv', de: 'Aufgeben', fr: 'abandon', en: 'giving up' },
    { id: 'av', gruppe: 'maladaptiv', de: 'Aggressives Verhalten', fr: 'comportement agressif', en: 'aggressive behaviour' },
    { id: 'rz', gruppe: 'maladaptiv', de: 'Rückzug', fr: 'retrait', en: 'withdrawal' },
    { id: 'sw', gruppe: 'maladaptiv', de: 'Selbstabwertung', fr: 'autodévalorisation', en: 'self-devaluation' },
    { id: 'ps', gruppe: 'maladaptiv', de: 'Perseveration', fr: 'rumination', en: 'perseveration' },
    { id: 'ad', gruppe: 'weitere', de: 'Ausdruck', fr: 'expression', en: 'expression' },
    { id: 'su', gruppe: 'weitere', de: 'Soziale Unterstützung', fr: 'soutien social', en: 'social support' },
    { id: 'ek', gruppe: 'weitere', de: 'Emotionskontrolle', fr: 'contrôle émotionnel', en: 'emotional control' }
  ];
  var SEKUNDAER = [
    { id: 'adapt', gruppe: 'adaptiv', sek: true, de: 'Adaptive Strategien', fr: 'stratégies adaptatives', en: 'adaptive strategies' },
    { id: 'maladapt', gruppe: 'maladaptiv', sek: true, de: 'Maladaptive Strategien', fr: 'stratégies maladaptatives', en: 'maladaptive strategies' }
  ];
  var ALLE = SEKUNDAER.concat(SKALEN);
  var GRUPPE = {
    adaptiv: { ui: 'Adaptive Strategien (niedriger Wert = ungünstig)' },
    maladaptiv: { ui: 'Maladaptive Strategien (hoher Wert = ungünstig)' },
    weitere: { ui: 'Weitere Strategien (keiner Gruppe zugeordnet)' }
  };
  var EMOTIONEN = [{ id: 'angst', name: L('Angst', 'peur', 'anxiety') }, { id: 'trauer', name: L('Trauer', 'tristesse', 'sadness') }, { id: 'wut', name: L('Wut', 'colère', 'anger') }];
  var FASSUNGEN = {
    '1': { kurz: 'FEEL-KJ', titel: 'Fragebogen zur Erhebung der Emotionsregulation bei Kindern und Jugendlichen', quelle: 'Grob & Smolenski, 2009', items: 90,
      aufl: L('2. Auflage', '2e édition', '2nd edition'),
      normen: L('die Normen des FEEL-KJ (2. Auflage, 2009)', 'les normes du FEEL-KJ (2e édition, 2009)', 'the FEEL-KJ norms (2nd edition, 2009)') },
    '2': { kurz: 'FEEL-KJ-2', titel: 'Fragebogen zur Erhebung der Emotionsregulation bei Kindern und Jugendlichen – 2', quelle: 'Hogrefe', items: null, aufl: null,
      normen: L('die Normen des FEEL-KJ-2', 'les normes du FEEL-KJ-2', 'the FEEL-KJ-2 norms') }
  };
  var UEBERSETZUNG = { fr: 'questionnaire d’évaluation de la régulation émotionnelle chez l’enfant et l’adolescent', en: 'Questionnaire on Emotion Regulation in Children and Adolescents' };
  var T_MIN = 20, T_MAX = 80;
  var ALTER_RE = /^\s*(\d{1,2})(?:\s*[-–]\s*(\d{1,2}))?\s*$/;

  /* T-Wert-Bänder (M 50, SD 10): unter 40 · 40–60 · über 60. Die Farbe des Chips folgt der
     Bewertung: adaptiv niedrig bzw. maladaptiv hoch = gelb (ungünstig), weitere Strategien neutral. */
  var N3 = [L('unterdurchschnittlich', 'inférieur à la moyenne', 'below average'), L('durchschnittlich', 'dans la moyenne', 'average'), L('überdurchschnittlich', 'supérieur à la moyenne', 'above average')];
  KAT.bandDefinieren('feelkj-adaptiv', { art: 'ressource',
    pruefen: 'FEEL-KJ: T-Wert-Bänder am Manual prüfen – hier unter 40 unterdurchschnittlich, 40–60 durchschnittlich, über 60 überdurchschnittlich (für adaptive, maladaptive und weitere Strategien gleich). Laut WSD-BW gilt bei maladaptiven Strategien ein T-Wert über 60 als dysfunktionale Verwendung.',
    stufen: [{ bis: 39, rang: 1, name: N3[0] }, { bis: 60, rang: 0, name: N3[1] }, { bis: Infinity, rang: 0, name: N3[2] }] });
  KAT.bandDefinieren('feelkj-maladaptiv', { art: 'problem',
    stufen: [{ bis: 39, rang: 0, name: N3[0] }, { bis: 60, rang: 0, name: N3[1] }, { bis: Infinity, rang: 1, name: N3[2] }] });
  KAT.bandDefinieren('feelkj-weitere', { art: 'neutral',
    stufen: [{ bis: 39, rang: -1, name: N3[0] }, { bis: 60, rang: 0, name: N3[1] }, { bis: Infinity, rang: 1, name: N3[2] }] });

  function fassung(d) { return FASSUNGEN[d && d.fassung] || FASSUNGEN['1']; }
  function skala(id) { return ALLE.filter(function (s) { return s.id === id; })[0] || null; }
  function bandId(s) { return 'feelkj-' + s.gruppe; }
  function zahl(v, min, max, ganz) {
    var n = B.num(v);
    if (n == null || n < min || n > max || (ganz && Math.round(n) !== n)) { return null; }
    return n;
  }
  function voll(v) { return v != null && String(v).trim() !== ''; }
  /* „Umbewerten“ · „Umbewerten (réévaluation)“ · „Umbewerten (reappraisal)“ */
  function uebersetzung(s, lang) { var tr = lang === 'de' ? '' : s[lang]; return tr && tr.toLowerCase() !== s.de.toLowerCase() ? tr : ''; }
  function name(s, lang) { var tr = uebersetzung(s, lang); return s.de + (tr ? ' (' + tr + ')' : ''); }
  /* „Umbewerten (T-Wert 35)“ · „Umbewerten (réévaluation ; note T 35)“ · „Umbewerten (reappraisal; T-score 35)“ */
  function nameWert(s, wert, lang, zusatz) {
    var teile = [uebersetzung(s, lang), TX.einheit('T', lang) + ' ' + wert, zusatz || ''].filter(Boolean);
    return s.de + ' (' + teile.join('; ') + ')';
  }
  /* Bewertung: 'unguenstig' | 'guenstig' | '' (weitere Strategien und Durchschnittsbereich ohne Bewertung) */
  function bewertung(s, b) {
    if (!b || b.index === 1 || s.gruppe === 'weitere') { return ''; }
    if (s.gruppe === 'adaptiv') { return b.index === 0 ? 'unguenstig' : 'guenstig'; }
    return b.index === 2 ? 'unguenstig' : 'guenstig';
  }
  var BEWERTUNG = { unguenstig: L('ungünstig', 'défavorable', 'unfavourable'), guenstig: L('günstig', 'favorable', 'favourable') };
  function einstufungText(b, bew, lang) { return b ? B.t(b.name, lang) + (bew ? ' (' + B.t(BEWERTUNG[bew], lang) + ')' : '') : '–'; }
  function neu() { return { datum: '', fassung: '1', normAlter: '', jeEmotion: false, w: { t: {}, pr: {}, angst: {}, trauer: {}, wut: {} } }; }
  function auswerten(d) {
    var w = d.w || {};
    function wert(spalte, id) { return zahl((w[spalte] || {})[id], T_MIN, T_MAX, true); }
    var zeilen = ALLE.map(function (s) {
      var t = wert('t', s.id), band = t == null ? null : KAT.einstufen(bandId(s), t), je = {};
      EMOTIONEN.forEach(function (em) {
        var v = d.jeEmotion ? wert(em.id, s.id) : null, b = v == null ? null : KAT.einstufen(bandId(s), v);
        je[em.id] = v == null ? null : { wert: v, band: b, bewertung: bewertung(s, b) };
      });
      return { id: s.id, s: s, wert: t, pr: zahl((w.pr || {})[s.id], 0, 100, false), band: band, bewertung: bewertung(s, band), je: je };
    });
    return { zeilen: zeilen, fassung: fassung(d) };
  }
  function zeile(ausw, id) { return ausw.zeilen.filter(function (z) { return z.id === id; })[0]; }
  function hatJe(z) { return EMOTIONEN.some(function (em) { return !!z.je[em.id]; }); }
  /* Chip in der Oberfläche: gleicher Text wie im Bericht, aber mit weichen Trennstellen,
     damit die Einstufungsspalte auch neben den drei Emotionsspalten Platz hat */
  var UI_NAMEN = ['unter\u00ADdurch\u00ADschnitt\u00ADlich', 'durch\u00ADschnitt\u00ADlich', 'über\u00ADdurch\u00ADschnitt\u00ADlich'];
  function uiEinstufung(s, n) {
    var e = KAT.einstufen(bandId(s), n);
    return e ? { rang: e.rang, art: e.art, klasse: e.klasse, index: e.index, name: { de: UI_NAMEN[e.index] } } : null;
  }
  function chip(pfad, n) {
    var m = /\.w\.t\.(\w+)$/.exec(pfad), s = m ? skala(m[1]) : null;
    return s ? uiEinstufung(s, n) : null;
  }

  /* ---------------- Formular ---------------- */
  function formular(d) {
    var h = E.karte('<h2>Durchführung</h2><div class="raster">' +
      E.feld('tests.feelkj.datum', 'Datum', { typ: 'date' }) +
      E.auswahl('tests.feelkj.fassung', 'Fassung', [['1', 'FEEL-KJ (2. Aufl. 2009)'], ['2', 'FEEL-KJ-2 (neu normiert)']], { hilfe: 'FEEL-KJ: Grob & Smolenski, Huber' }) +
      E.feld('tests.feelkj.normAlter', 'Altersgruppe der Normtabelle (optional)', { platzhalter: 'z. B. 12–13', hilfe: 'nur, falls das Manual nach Alter unterscheidet' }) + '</div>' +
      '<div style="margin-top:12px">' + E.haken('tests.feelkj.jeEmotion', 'T-Werte zusätzlich je Emotion eingeben (Angst, Trauer, Wut)', 'optional – erscheinen im Bericht als eigene Tabelle', true) + '</div>');
    var spalten = [{ id: 't', label: 'T-Wert', min: T_MIN, max: T_MAX, ganz: true }, { id: 'pr', label: 'PR', min: 0, max: 100, ganz: false, ohneChip: true }];
    if (d.jeEmotion) { EMOTIONEN.forEach(function (em) { spalten.push({ id: em.id, label: 'T ' + B.t(em.name, 'de'), min: T_MIN, max: T_MAX, ganz: true, ohneChip: true }); }); }
    var zeilen = [];
    ['adaptiv', 'maladaptiv', 'weitere'].forEach(function (g) {
      zeilen.push({ trenner: GRUPPE[g].ui });
      SKALEN.filter(function (s) { return s.gruppe === g; }).forEach(function (s) { zeilen.push({ id: s.id, name: s.de }); });
    });
    zeilen.push({ trenner: 'Sekundärskalen' });
    SEKUNDAER.forEach(function (s) { zeilen.push({ id: s.id, name: s.de, hinweis: s.gruppe === 'adaptiv' ? 'gesamt · niedrig = ungünstig' : 'gesamt · hoch = ungünstig' }); });
    h += E.karte('<h2>T-Werte</h2><p class="klein">T-Werte (Mittelwert 50, Standardabweichung 10) und – falls vorhanden – Prozentränge aus dem Auswertungsbogen übernehmen. T 40–60 = durchschnittlich. Bei adaptiven Strategien ist ein niedriger, bei maladaptiven Strategien ein hoher Wert ungünstig; die weiteren Strategien sind keiner der beiden Gruppen zugeordnet. Leere Felder erscheinen im Bericht nicht.</p>' +
      E.raster({ basis: 'tests.feelkj.w', kopfSkala: 'Skala', chipAmEnde: true, spalten: spalten, zeilen: zeilen,
        einstufen: function (zid, sid, n) { var s = skala(zid); return s && sid === 't' ? uiEinstufung(s, n) : null; } }));
    return h;
  }

  /* ---------------- Bericht ---------------- */
  function zweck(lang, f) {
    if (lang === 'fr') {
      return 'Le ' + f.kurz + ' (' + UEBERSETZUNG.fr + ') évalue, par autoquestionnaire, les stratégies que les enfants et adolescents de 10 à 19 ans utilisent face à la peur, à la tristesse et à la colère. ' +
        (f.items ? 'Les ' + f.items + ' items forment 15 échelles de stratégies : ' : 'Il comprend 15 échelles de stratégies : ') +
        'sept stratégies adaptatives (action centrée sur le problème, distraction, amélioration de l’humeur, acceptation, oubli, réévaluation et résolution cognitive de problèmes), cinq stratégies maladaptatives (abandon, comportement agressif, retrait, autodévalorisation et rumination) et trois autres stratégies qui ne relèvent d’aucun des deux groupes (expression, soutien social et contrôle émotionnel). ' +
        'Les stratégies adaptatives et maladaptatives sont regroupées en deux échelles secondaires (Adaptive Strategien et Maladaptive Strategien) ; ce classement repose sur le lien entre les stratégies et le bien-être. ' +
        'Les résultats sont exprimés en notes T (moyenne 50, écart type 10) ; les notes de 40 à 60 correspondent à la moyenne. Pour les stratégies adaptatives, des notes basses sont défavorables ; pour les stratégies maladaptatives, des notes élevées.';
    }
    if (lang === 'en') {
      return 'The ' + f.kurz + ' (' + UEBERSETZUNG.en + ') is a self-report questionnaire on the strategies that children and adolescents aged 10 to 19 use to deal with anxiety, sadness and anger. ' +
        (f.items ? 'Its ' + f.items + ' items form 15 strategy scales: ' : 'It comprises 15 strategy scales: ') +
        'seven adaptive strategies (problem-oriented action, distraction, mood improvement, acceptance, forgetting, reappraisal and cognitive problem solving), five maladaptive strategies (giving up, aggressive behaviour, withdrawal, self-devaluation and perseveration) and three other strategies that belong to neither group (expression, social support and emotional control). ' +
        'The adaptive and the maladaptive strategies are combined into two secondary scales (Adaptive Strategien and Maladaptive Strategien); this grouping is based on how the strategies relate to well-being. ' +
        'Results are T-scores (mean 50, standard deviation 10); scores from 40 to 60 are considered average. Low scores are unfavourable for adaptive strategies, high scores for maladaptive strategies.';
    }
    return 'Der ' + f.kurz + ' (' + f.titel + ') erfasst im Selbsturteil, welche Strategien Kinder und Jugendliche von 10 bis 19 Jahren im Umgang mit Angst, Trauer und Wut einsetzen. ' +
      (f.items ? 'Die ' + f.items + ' Items bilden 15 Strategieskalen: ' : 'Er umfasst 15 Strategieskalen: ') +
      'sieben adaptive Strategien (Problemorientiertes Handeln, Zerstreuung, Stimmung anheben, Akzeptieren, Vergessen, Umbewerten, Kognitives Problemlösen), fünf maladaptive Strategien (Aufgeben, Aggressives Verhalten, Rückzug, Selbstabwertung, Perseveration) und drei weitere Strategien, die keiner der beiden Gruppen zugeordnet sind (Ausdruck, Soziale Unterstützung, Emotionskontrolle). ' +
      'Die adaptiven und die maladaptiven Strategien werden zu den Sekundärskalen Adaptive Strategien und Maladaptive Strategien zusammengefasst; die Zuordnung beruht auf dem Zusammenhang der Strategien mit dem Wohlbefinden. ' +
      'Die Ergebnisse sind T-Werte (Mittelwert 50, Standardabweichung 10); Werte von 40 bis 60 gelten als durchschnittlich. Bei adaptiven Strategien sind niedrige Werte ungünstig, bei maladaptiven Strategien hohe Werte.';
  }
  function alterText(v, lang) {
    var m = ALTER_RE.exec(String(v || ''));
    if (!m) { return ''; }
    return (m[2] ? m[1] + '–' + m[2] : m[1]) + (lang === 'fr' ? ' ans' : (lang === 'en' ? ' years' : ' Jahre'));
  }
  function einleitung(lang, ctx, d, f) {
    var dat = d.datum ? B.datum(d.datum, lang) : '', al = alterText(d.normAlter, lang), s = [];
    if (lang === 'fr') {
      s.push('Le questionnaire a été rempli par ' + ctx.name + ' (autoévaluation)' + (dat ? ' le ' + dat : ''));
      s.push('Les notes T reposent sur ' + B.t(f.normen, lang) + (al ? ' ; groupe d’âge : ' + al : ''));
    } else if (lang === 'en') {
      s.push(ctx.name + ' completed the questionnaire (self-report)' + (dat ? ' on ' + dat : ''));
      s.push('The T-scores are based on ' + B.t(f.normen, lang) + (al ? '; age group: ' + al : ''));
    } else {
      s.push(ctx.name + ' hat den Fragebogen' + (dat ? ' am ' + dat : '') + ' selbst ausgefüllt');
      s.push('Grundlage der T-Werte sind ' + B.t(f.normen, lang) + (al ? '; Altersgruppe: ' + al : ''));
    }
    return s.map(function (x) { return TX.satz(x, lang); }).join(' ');
  }
  var HAEUFIG = { de: ['unterdurchschnittlich häufig', 'durchschnittlich häufig', 'überdurchschnittlich häufig'],
    fr: ['moins souvent que la moyenne', 'avec une fréquence moyenne', 'plus souvent que la moyenne'],
    en: ['less often than average', 'with average frequency', 'more often than average'] };
  /* Sekundärskalen: Häufigkeit, dann Bewertung – adaptive und maladaptive Strategien getrennt benannt */
  function sekundaerSaetze(lang, ctx, ausw) {
    var z = ['adapt', 'maladapt'].map(function (id) { return zeile(ausw, id); }).filter(function (x) { return x && x.band; });
    if (!z.length) { return ''; }
    var s = [], teile = z.map(function (x) {
      var ad = x.id === 'adapt', w = ' (' + TX.einheit('T', lang) + ' ' + x.wert + ')', hf = HAEUFIG[lang][x.band.index];
      if (lang === 'fr') { return 'les stratégies ' + (ad ? 'adaptatives ' : 'maladaptatives ') + hf + w; }
      if (lang === 'en') { return (ad ? 'adaptive' : 'maladaptive') + ' strategies ' + hf + w; }
      return (ad ? 'adaptive' : 'maladaptive') + ' Strategien insgesamt ' + hf + w;
    });
    s.push(lang === 'fr' ? 'Selon l’autoévaluation, ' + ctx.name + ' utilise dans l’ensemble ' + B.liste(teile, lang)
      : (lang === 'en' ? 'According to the self-report, overall ' + ctx.name + ' uses ' + B.liste(teile, lang)
        : 'Nach eigenen Angaben setzt ' + ctx.name + ' ' + B.liste(teile, lang) + ' ein'));
    function phrase(x) {
      var ad = x.id === 'adapt', selten = (ad && x.bewertung === 'unguenstig') || (!ad && x.bewertung === 'guenstig');
      if (lang === 'fr') { return 'le recours ' + (selten ? 'peu fréquent' : 'fréquent') + ' aux stratégies ' + (ad ? 'adaptatives' : 'maladaptatives'); }
      if (lang === 'en') { return 'the ' + (selten ? 'infrequent' : 'frequent') + ' use of ' + (ad ? 'adaptive' : 'maladaptive') + ' strategies'; }
      return 'der ' + (selten ? 'seltene' : 'häufige') + ' Einsatz ' + (ad ? 'adaptiver' : 'maladaptiver') + ' Strategien';
    }
    ['unguenstig', 'guenstig'].forEach(function (bew) {
      var l = z.filter(function (x) { return x.bewertung === bew; }), mehr = l.length > 1;
      if (!l.length) { return; }
      var ph = B.liste(l.map(phrase), lang), wort = B.t(BEWERTUNG[bew], lang);
      s.push(lang === 'fr' ? B.ersteGross(ph) + (mehr ? ' sont ' + wort + 's' : ' est ' + wort)
        : (lang === 'en' ? B.ersteGross(ph) + (mehr ? ' are ' : ' is ') + wort
          : B.ersteGross(wort) + (mehr ? ' sind ' : ' ist ') + ph));
    });
    return s.map(function (x) { return TX.satz(x, lang); }).join(' ');
  }
  /* Einzelne Strategien: ungünstige und günstige Abweichungen je Gruppe in eigenen Sätzen.
     Der erste Satz nennt die Normstichprobe, die folgenden sagen kürzer „als üblich“. */
  function gruppenSatz(lang, ctx, liste, adaptiv, seltener, bew, erster) {
    var n = liste.length, namen = B.liste(liste.map(function (z) { return nameWert(z.s, z.wert, lang); }), lang), wort = B.t(BEWERTUNG[bew], lang);
    if (lang === 'fr') {
      var obj = n === 1 ? 'à la stratégie ' + (adaptiv ? 'adaptative' : 'maladaptative') + ' suivante' : 'aux stratégies ' + (adaptiv ? 'adaptatives' : 'maladaptatives') + ' suivantes';
      return ctx.name + ' recourt ' + (seltener ? 'moins souvent' : 'plus souvent') + (erster ? ' que les jeunes de l’échantillon de référence ' : ' que la moyenne ') + obj + ', ce qui est ' + wort + ' : ' + namen;
    }
    if (lang === 'en') {
      return ctx.name + ' uses the following ' + (adaptiv ? 'adaptive' : 'maladaptive') + ' ' + (n === 1 ? 'strategy' : 'strategies') + ' ' + (seltener ? 'less often' : 'more often') + (erster ? ' than young people in the normative sample' : ' than average') + ', which is ' + wort + ': ' + namen;
    }
    var was = 'folgende ' + (adaptiv ? 'adaptive' : 'maladaptive') + ' ' + (n === 1 ? 'Strategie' : 'Strategien'), wie = seltener ? 'seltener' : 'häufiger';
    return erster ? ctx.name + ' nutzt ' + was + ' ' + wie + ' als Kinder und Jugendliche der Normstichprobe, was ' + wort + ' ist: ' + namen
      : B.ersteGross(was) + ' nutzt ' + ctx.name + ' ' + wie + ' als üblich, was ' + wort + ' ist: ' + namen;
  }
  function strategieSaetze(lang, ctx, ausw) {
    var str = ausw.zeilen.filter(function (z) { return !z.s.sek && z.band; });
    if (!str.length) { return ''; }
    function wahl(g, idx) { return str.filter(function (z) { return z.s.gruppe === g && z.band.index === idx; }); }
    var s = [];
    [[wahl('adaptiv', 0), true, true, 'unguenstig'], [wahl('maladaptiv', 2), false, false, 'unguenstig'],
      [wahl('adaptiv', 2), true, false, 'guenstig'], [wahl('maladaptiv', 0), false, true, 'guenstig']].forEach(function (g) {
      if (g[0].length) { s.push(gruppenSatz(lang, ctx, g[0], g[1], g[2], g[3], !s.length)); }
    });
    var wx = str.filter(function (z) { return z.s.gruppe === 'weitere' && z.band.index !== 1; });
    if (wx.length) {
      var namen = B.liste(wx.map(function (z) { return nameWert(z.s, z.wert, lang, B.t(z.band.name, lang)); }), lang), eins = wx.length === 1;
      s.push(lang === 'fr' ? 'Parmi les autres stratégies, ' + (eins ? 'la suivante se situe' : 'les suivantes se situent') + ' hors de la moyenne : ' + namen
        : (lang === 'en' ? 'Of the other strategies, the following ' + (eins ? 'falls' : 'fall') + ' outside the average range: ' + namen
          : 'Von den weiteren Strategien ' + (eins ? 'liegt' : 'liegen') + ' außerhalb des Durchschnittsbereichs: ' + namen));
    }
    var mitte = str.filter(function (z) { return z.band.index === 1; }), n = mitte.length, alle = n === str.length;
    if (n) {
      s.push(lang === 'fr' ? (alle ? (n === 1 ? 'La stratégie saisie se situe' : 'Toutes les stratégies saisies se situent') : (n === 1 ? 'La stratégie restante se situe' : 'Les stratégies restantes se situent')) + ' dans la moyenne (note T de 40 à 60)'
        : (lang === 'en' ? (alle ? (n === 1 ? 'The strategy entered is' : 'All strategies entered are') : (n === 1 ? 'The remaining strategy is' : 'The remaining strategies are')) + ' in the average range (T-score 40–60)'
          : (alle ? (n === 1 ? 'Die eingegebene Strategie liegt' : 'Alle eingegebenen Strategien liegen') : (n === 1 ? 'Die übrige Strategie liegt' : 'Die übrigen Strategien liegen')) + ' im Durchschnittsbereich (T-Wert 40–60)'));
    }
    return s.map(function (x) { return TX.satz(x, lang); }).join(' ');
  }
  function emotionSatz(lang, ausw) {
    var eintraege = [], anzahl = 0;
    EMOTIONEN.forEach(function (em) {
      ausw.zeilen.forEach(function (z) {
        var e = z.je[em.id];
        if (!e) { return; }
        anzahl++;
        if (e.band.index === 1) { return; }
        var zusatz = B.t(e.band.name, lang) + (e.bewertung ? ', ' + B.t(BEWERTUNG[e.bewertung], lang) : '');
        eintraege.push(B.t(em.name, lang) + ' – ' + nameWert(z.s, e.wert, lang, zusatz));
      });
    });
    if (!anzahl) { return ''; }
    if (!eintraege.length) {
      return TX.satz(lang === 'fr' ? 'Par émotion, toutes les valeurs saisies se situent dans la moyenne' : (lang === 'en' ? 'By emotion, all scores entered are in the average range' : 'Getrennt nach Emotionen liegen alle eingegebenen Werte im Durchschnittsbereich'), lang);
    }
    return TX.satz(lang === 'fr' ? 'Par émotion, les valeurs suivantes se situent hors de la moyenne : ' + eintraege.join('; ')
      : (lang === 'en' ? 'By emotion, the following scores fall outside the average range: ' + eintraege.join('; ')
        : 'Getrennt nach Emotionen liegen außerhalb des Durchschnittsbereichs: ' + eintraege.join('; ')), lang);
  }
  function bericht(lang, ctx, d, ausw) {
    var f = ausw.fassung, bl = [{ t: 'p', text: zweck(lang, f) }];
    var mit = ausw.zeilen.filter(function (z) { return z.wert != null || z.pr != null || hatJe(z); });
    if (!mit.length) { bl.push({ t: 'p', text: lang === 'fr' ? 'Aucun résultat n’a encore été saisi.' : (lang === 'en' ? 'No results have been entered yet.' : 'Es wurden noch keine Ergebnisse eingegeben.') }); return bl; }
    bl.push({ t: 'p', text: einleitung(lang, ctx, d, f) });
    var S = SPRACHE[lang].spalten, mitPr = ausw.zeilen.some(function (z) { return z.pr != null; });
    var tKopf = lang === 'fr' ? 'Note T' : (lang === 'en' ? 'T-score' : 'T-Wert');
    var kopfWerte = [tKopf].concat(mitPr ? [S.pr] : []).concat([S.einstufung]);
    function werte(z) { return [z.wert == null ? '–' : String(z.wert)].concat(mitPr ? [z.pr == null ? '–' : B.zahl(z.pr, lang)] : []).concat([einstufungText(z.band, z.bewertung, lang)]); }
    var anm = lang === 'fr' ? 'Notes T : moyenne 50, écart type 10 ; de 40 à 60 dans la moyenne. Pour les stratégies adaptatives, des notes basses sont défavorables ; pour les stratégies maladaptatives, des notes élevées ; les autres stratégies ne relèvent d’aucun des deux groupes.'
      : (lang === 'en' ? 'T-scores: mean 50, standard deviation 10; 40–60 average. Low scores are unfavourable for adaptive strategies, high scores for maladaptive strategies; the other strategies belong to neither group.'
        : 'T-Werte: Mittelwert 50, Standardabweichung 10; 40–60 durchschnittlich. Bei adaptiven Strategien sind niedrige Werte ungünstig, bei maladaptiven Strategien hohe Werte; die weiteren Strategien sind keiner der beiden Gruppen zugeordnet.');
    /* Je Gruppe eine Tabelle (Kopf = Gruppe), die Sekundärskala als Zeile „Gesamt“ am Ende */
    var gesamt = lang === 'fr' ? 'Total (échelle secondaire)' : (lang === 'en' ? 'Total (secondary scale)' : 'Gesamt (Sekundärskala)');
    var tabellen = [];
    ['adaptiv', 'maladaptiv', 'weitere'].forEach(function (g) {
      var zeilen = ausw.zeilen.filter(function (z) { return !z.s.sek && z.s.gruppe === g && (z.wert != null || z.pr != null); })
        .map(function (z) { return [name(z.s, lang)].concat(werte(z)); });
      var sz = ausw.zeilen.filter(function (z) { return z.s.sek && z.s.gruppe === g && (z.wert != null || z.pr != null); })[0];
      if (sz) { zeilen.push([gesamt].concat(werte(sz))); }
      if (!zeilen.length) { return; }
      var kopf = g === 'weitere' ? (lang === 'fr' ? 'Autres stratégies' : (lang === 'en' ? 'Other strategies' : 'Weitere Strategien')) : name(skala(g === 'adaptiv' ? 'adapt' : 'maladapt'), lang);
      tabellen.push({ t: 'tabelle', kopf: [kopf].concat(kopfWerte), zahlSpalten: mitPr ? [1, 2] : [1], zeilen: zeilen });
    });
    if (tabellen.length) { tabellen[tabellen.length - 1].anmerkung = anm; bl = bl.concat(tabellen); }
    var jeZ = ausw.zeilen.filter(hatJe);
    if (jeZ.length) {
      bl.push({ t: 'tabelle', kopf: [S.skala].concat(EMOTIONEN.map(function (em) { return B.ersteGross(B.t(em.name, lang)); })),
        zeilen: jeZ.map(function (z) {
          return [name(z.s, lang)].concat(EMOTIONEN.map(function (em) { var e = z.je[em.id]; return !e ? '–' : String(e.wert) + ' (' + einstufungText(e.band, e.bewertung, lang).replace(/ \((.+)\)$/, ', $1') + ')'; }));
        }),
        anmerkung: lang === 'fr' ? 'Notes T par émotion ; de 40 à 60 dans la moyenne.' : (lang === 'en' ? 'T-scores by emotion; 40–60 average.' : 'T-Werte je Emotion; 40–60 durchschnittlich.') });
    }
    var t = [sekundaerSaetze(lang, ctx, ausw), strategieSaetze(lang, ctx, ausw)].filter(Boolean);
    if (t.length) { bl.push({ t: 'p', text: t.join(' ') }); }
    var je = emotionSatz(lang, ausw);
    if (je) { bl.push({ t: 'p', text: je }); }
    return bl;
  }
  function verfahrenZeile(lang, d) {
    var f = fassung(d), dat = d.datum ? ', ' + B.datum(d.datum, lang) : '';
    var quelle = f.quelle + (f.aufl ? (lang === 'de' ? '; ' : ', ') + B.t(f.aufl, lang) : '');
    if (lang === 'fr') { return f.kurz + ' – ' + f.titel + ' (' + UEBERSETZUNG.fr + ' ; ' + quelle + ') : ' + infForm('selbst', lang) + dat; }
    if (lang === 'en') { return f.kurz + ' – ' + f.titel + ' (' + UEBERSETZUNG.en + '; ' + quelle + '): ' + infForm('selbst', lang) + dat; }
    return f.kurz + ' – ' + f.titel + ' (' + quelle + '): ' + infForm('selbst', lang) + dat;
  }
  function zusammenfassung(lang, ctx, d, ausw) {
    var mitBand = ausw.zeilen.filter(function (z) { return z.band; });
    if (!mitBand.length) { return ''; }
    var teile = [], sek = [];
    ['adapt', 'maladapt'].forEach(function (id) {
      var z = zeile(ausw, id);
      if (!z || !z.band) { return; }
      var ad = id === 'adapt', bn = B.t(z.band.name, lang);
      sek.push(lang === 'fr' ? 'score des stratégies ' + (ad ? 'adaptatives ' : 'maladaptatives ') + bn + ' (note T ' + z.wert + ')'
        : (lang === 'en' ? (ad ? 'adaptive' : 'maladaptive') + ' strategies overall ' + bn + ' (T-score ' + z.wert + ')'
          : (ad ? 'adaptive' : 'maladaptive') + ' Strategien insgesamt ' + bn + ' (T-Wert ' + z.wert + ')'));
    });
    if (sek.length) { teile.push(sek.join(', ')); }
    var ung = ausw.zeilen.filter(function (z) { return !z.s.sek && z.bewertung === 'unguenstig'; });
    if (ung.length) {
      var namen = B.liste(ung.map(function (z) { return nameWert(z.s, z.wert, lang); }), lang), eins = ung.length === 1, auch = teile.length > 0;
      teile.push(lang === 'fr' ? 'valeurs défavorables ' + (auch ? 'également ' : '') + (eins ? 'pour l’échelle ' : 'pour les échelles ') + namen
        : (lang === 'en' ? (auch ? 'also ' : '') + 'unfavourable scores on ' + (eins ? 'the scale ' : 'the scales ') + namen
          : (auch ? 'außerdem ' : '') + 'ungünstige Werte in ' + (eins ? 'der Skala ' : 'den Skalen ') + namen));
    }
    if (!teile.length) {
      var alleMitte = mitBand.every(function (z) { return z.band.index === 1; });
      teile.push(alleMitte ? (lang === 'fr' ? 'toutes les échelles saisies se situent dans la moyenne' : (lang === 'en' ? 'all scales entered are in the average range' : 'alle eingegebenen Skalen im Durchschnittsbereich'))
        : (lang === 'fr' ? 'aucune valeur défavorable' : (lang === 'en' ? 'no unfavourable scores' : 'keine ungünstigen Werte')));
    }
    return ausw.fassung.kurz + (lang === 'fr' ? ' : ' : ': ') + teile.join('; ') + '.';
  }
  /* DE: Dativ für „im Gespräch mit …“ (ohne Vornamen: „dem Kind“, „dem/der Jugendlichen“) */
  function mitWem(ctx, lang) {
    if (lang !== 'de' || ctx.vorname) { return ctx.name; }
    return ctx.name === SPRACHE.de.jugendAllg ? 'dem/der Jugendlichen' : 'dem Kind';
  }
  function hinweise(lang, ctx, d, ausw) {
    function ungG(g) { return ausw.zeilen.some(function (z) { return z.s.gruppe === g && (z.bewertung === 'unguenstig' || EMOTIONEN.some(function (em) { return z.je[em.id] && z.je[em.id].bewertung === 'unguenstig'; })); }); }
    var ad = ungG('adaptiv'), ma = ungG('maladaptiv');
    if (!ad && !ma) { return []; }
    var n = mitWem(ctx, lang);
    if (lang === 'fr') {
      var wasF = ad && ma ? 'recours peu fréquent aux stratégies adaptatives et recours fréquent aux stratégies maladaptatives' : (ad ? 'recours peu fréquent aux stratégies adaptatives' : 'recours fréquent aux stratégies maladaptatives');
      return ['Les indices d’une régulation émotionnelle défavorable au ' + ausw.fassung.kurz + ' (' + wasF + ') devraient être approfondis lors d’un entretien avec ' + n + ', à partir de situations concrètes de peur, de tristesse ou de colère ; ils peuvent fournir des pistes pour accompagner ' + n + ' dans la gestion des émotions difficiles.'];
    }
    if (lang === 'en') {
      var wasE = ad && ma ? 'infrequent use of adaptive and frequent use of maladaptive strategies' : (ad ? 'infrequent use of adaptive strategies' : 'frequent use of maladaptive strategies');
      return ['The indications of unfavourable emotion regulation on the ' + ausw.fassung.kurz + ' (' + wasE + ') should be explored further in an interview with ' + n + ', using concrete situations involving anxiety, sadness or anger; they may point to ways of supporting ' + n + ' in dealing with difficult feelings.'];
    }
    var was = ad && ma ? 'seltener Einsatz adaptiver und häufiger Einsatz maladaptiver Strategien' : (ad ? 'seltener Einsatz adaptiver Strategien' : 'häufiger Einsatz maladaptiver Strategien');
    return ['Die Hinweise auf eine ungünstige Emotionsregulation im ' + ausw.fassung.kurz + ' (' + was + ') sollten im Gespräch mit ' + n + ' anhand konkreter Situationen mit Angst, Trauer oder Wut vertieft werden; sie können Ansatzpunkte für die Unterstützung im Umgang mit belastenden Gefühlen geben.'];
  }
  function warnung(d, fall) {
    var a = B.alter(fall.kind.geburtsdatum, d.datum || fall.bericht.datumVon);
    if (a && (a.dezimal < 10 || a.dezimal >= 20)) { return 'Der FEEL-KJ ist für 10;0 bis 19;11 Jahre normiert – das Kind ist ' + B.alterText(a, 'de') + ' alt.'; }
    if (voll(d.normAlter) && !ALTER_RE.test(String(d.normAlter))) { return 'Altersgruppe der Normtabelle bitte als Zahl oder Spanne eingeben (z. B. 12–13) – so erscheint sie in allen Berichtssprachen richtig.'; }
    return '';
  }
  function fertig(d) { var a = auswerten(d); return zeile(a, 'adapt').wert != null && zeile(a, 'maladapt').wert != null; }
  /* Übernahme aus der früheren Version: T-Werte der 12 Strategien und der 2 Sekundärskalen
     (alte Feld-IDs feel-ph … feel-maladapt; „Problemlösendes Handeln“ = Problemorientiertes Handeln) */
  function ausAlt(alt) {
    var f = alt.fields || {}, d = neu(), hat = false;
    ALLE.forEach(function (s) { var v = f['feel-' + s.id]; if (voll(v)) { d.w.t[s.id] = String(v).trim(); hat = true; } });
    return hat ? d : null;
  }

  KAT.registrieren({
    id: 'feelkj', kurz: 'FEEL-KJ', kurzUi: 'FEEL-KJ',
    name: L('FEEL-KJ – Fragebogen zur Erhebung der Emotionsregulation bei Kindern und Jugendlichen', 'FEEL-KJ – Fragebogen zur Erhebung der Emotionsregulation bei Kindern und Jugendlichen (' + UEBERSETZUNG.fr + ')', 'FEEL-KJ – Fragebogen zur Erhebung der Emotionsregulation bei Kindern und Jugendlichen (' + UEBERSETZUNG.en + ')'),
    gruppe: 'emotion', alter: [10, 19], informantenText: 'Selbsturteil',
    hilfe: 'Selbstbeurteilung für 10- bis 19-Jährige. T-Werte (und falls vorhanden Prozentränge) aus dem Auswertungsbogen übernehmen – das Tool rechnet keine Normwerte. Bei adaptiven Strategien ist ein niedriger, bei maladaptiven Strategien ein hoher Wert ungünstig.',
    neu: neu, formular: formular, auswerten: auswerten, chip: chip, bericht: bericht, verfahrenZeile: verfahrenZeile,
    zusammenfassung: zusammenfassung, hinweise: hinweise, warnung: warnung, fertig: fertig, ausAlt: ausAlt,
    pruefen: ['Auflagenbezeichnung der 2. Auflage (Grob & Smolenski, 2009, Huber) am Manual bestätigen (z. B. „2., unveränderte“ oder „2., überarbeitete Auflage“).',
      'FEEL-KJ-2 (neu normierte Fassung, Hogrefe): Autorinnen/Autoren und Erscheinungsjahr für die Quellenangabe ergänzen; prüfen, ob Skalen, Itemzahl und Normgruppen (Altersgruppen?) der ersten Fassung entsprechen.',
      'Reihenfolge der Skalen auf dem Auswertungsbogen und genaue Bezeichnung der Sekundärskalen („Adaptive Strategien“, „Maladaptive Strategien“) bestätigen.',
      'Werte je Emotion: liefert das Manual T-Werte je Emotion für alle 15 Strategien oder nur für die Sekundärskalen?',
      'Laut TBS-TK-Rezension (2016) keine getrennten Normen nach Alter, Bildung und Geschlecht (Ausnahme: eine Strategieskala) – welche Skala, und muss dafür eine Normgruppe erfasst werden?',
      'Eingabebereich T 20–80 am Normtabellenbereich prüfen.',
      'FR/EN: keine offizielle französische Fassung bekannt; deutsche Skalennamen mit Übersetzung in Klammern. Für den FEEL-KJ-2 gibt es eine englische Fassung (Hogrefe, „Emotion Regulation Strategies Questionnaire“) – deren offizielle Skalennamen könnten die englischen Übersetzungen ersetzen.']
  });
})();
