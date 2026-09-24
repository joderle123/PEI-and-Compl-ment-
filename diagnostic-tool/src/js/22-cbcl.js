/* =====================================================================
   CBCL/6-18R, TRF/6-18R, YSR/11-18R – Deutsche Schulalter-Formen der
   Child Behavior Checklist von Thomas M. Achenbach (Döpfner, Plück &
   Kinnen für die Arbeitsgruppe Deutsche Child Behavior Checklist, 2014)
   ---------------------------------------------------------------------
   Eine Spalte je Fragebogen: Eltern (CBCL/6-18R), Lehrkraft (TRF/6-18R),
   Selbst (YSR/11-18R). Eingegeben werden T-Werte (optional Prozentränge)
   aus dem Auswertungsbogen bzw. dem Testauswerteprogramm – das Tool
   rechnet keine Normwerte. Keine Stanine: die Normen der Ausgabe sind
   T-Werte (Stanine gibt es nur im Vergleich mit klinischen Stichproben,
   siehe pruefen).
   Einstufung (ASEBA, in der deutschen Ausgabe übernommen – s. pruefen):
   Syndrom- und DSM-orientierte Skalen Grenzbereich T 65–69, auffällig ab
   T 70; übergeordnete Skalen Grenzbereich T 60–63, auffällig ab T 64;
   Kompetenzskalen umgekehrt (niedrige Werte ungünstig).
   Skalennamen: DE laut Verlagsbeschreibung (Hogrefe), EN laut US-Manual
   (Achenbach & Rescorla, 2001), FR laut ASEBA-Übersetzung (zu prüfen).
   Kritische Items 18 und 91 je Fragebogen → sicherheit().
   ===================================================================== */
(function () {
  var L = KAT.L;
  var INF = ['eltern', 'lehrer', 'selbst'];
  var FORM = { eltern: 'CBCL/6-18R', lehrer: 'TRF/6-18R', selbst: 'YSR/11-18R' };
  var INF_UI = { eltern: 'Eltern (CBCL/6-18R)', lehrer: 'Lehrkraft (TRF/6-18R)', selbst: 'Selbst (YSR/11-18R)' };
  var INF_KURZ = { eltern: 'Eltern', lehrer: 'Lehrkraft', selbst: 'Selbst' };

  /* ---------------- Skalen ----------------
     art bestimmt Eingabebereich und Einstufung; formen = nur in diesen Fragebögen */
  var SYNDROME = [
    { id: 'aen', name: L('Ängstlich/depressiv', 'Anxiété/Dépression', 'Anxious/Depressed') },
    { id: 'rue', name: L('Rückzüglich/depressiv', 'Retrait/Dépression', 'Withdrawn/Depressed') },
    { id: 'koe', name: L('Körperliche Beschwerden', 'Plaintes somatiques', 'Somatic Complaints') },
    { id: 'soz', name: L('Soziale Probleme', 'Problèmes sociaux', 'Social Problems') },
    { id: 'den', name: L('Denk-, (Schlaf-) und repetitive Probleme', 'Problèmes de la pensée', 'Thought Problems') },
    { id: 'auf', name: L('Aufmerksamkeitsprobleme', 'Problèmes d’attention', 'Attention Problems') },
    { id: 'reg', name: L('Regelverletzendes Verhalten', 'Comportement de transgression des règles', 'Rule-Breaking Behavior') },
    { id: 'agg', name: L('Aggressives Verhalten', 'Comportement agressif', 'Aggressive Behavior') }
  ];
  var UEBERGEORDNET = [
    { id: 'int', name: L('Internale Probleme', 'Problèmes intériorisés', 'Internalizing Problems') },
    { id: 'ext', name: L('Externale Probleme', 'Problèmes extériorisés', 'Externalizing Problems') },
    { id: 'ges', name: L('Gesamtauffälligkeit', 'Total des problèmes', 'Total Problems') }
  ];
  var DSM = [
    { id: 'daff', name: L('Affektive Symptome', 'Problèmes affectifs', 'Affective Problems') },
    { id: 'dang', name: L('Angstsymptome', 'Problèmes anxieux', 'Anxiety Problems') },
    { id: 'dkoe', name: L('Körperliche Symptome', 'Problèmes somatiques', 'Somatic Problems') },
    { id: 'dadh', name: L('Unaufmerksamkeits-Hyperaktivitätssymptome', 'Problèmes de déficit de l’attention/hyperactivité', 'Attention Deficit/Hyperactivity Problems') },
    { id: 'dopp', name: L('Oppositionelle Verhaltenssymptome', 'Problèmes d’opposition', 'Oppositional Defiant Problems') },
    { id: 'ddis', name: L('Dissoziale Symptome', 'Problèmes de conduite', 'Conduct Problems') }
  ];
  /* Kompetenzskalen (CBCL, YSR) und adaptive Funktionen (TRF): niedrig = ungünstig */
  var KOMPETENZ = [
    { id: 'kakt', name: L('Aktivitäten', 'Activités', 'Activities'), formen: ['eltern', 'selbst'], band: 'cbcl-kompetenz' },
    { id: 'ksoz', name: L('Soziale Kompetenz', 'Compétences sociales', 'Social'), formen: ['eltern', 'selbst'], band: 'cbcl-kompetenz' },
    { id: 'ksch', name: L('Schule', 'École', 'School'), formen: ['eltern'], band: 'cbcl-kompetenz' },
    { id: 'kges', name: L('Gesamtkompetenz', 'Compétence totale', 'Total Competence'), formen: ['eltern', 'selbst'], band: 'cbcl-gesamtkompetenz' },
    { id: 'alei', name: L('Schulische Leistung', 'Rendement scolaire', 'Academic Performance'), formen: ['lehrer'], band: 'cbcl-gesamtkompetenz' },
    { id: 'ages', name: L('Adaptive Funktionen gesamt', 'Fonctionnement adaptatif total', 'Total Adaptive'), formen: ['lehrer'], band: 'cbcl-gesamtkompetenz' }
  ];
  SYNDROME.forEach(function (s) { s.art = 'syndrom'; s.band = 'cbcl-syndrom'; });
  UEBERGEORDNET.forEach(function (s) { s.art = 'uebergeordnet'; s.band = 'cbcl-uebergeordnet'; });
  DSM.forEach(function (s) { s.art = 'dsm'; s.band = 'cbcl-syndrom'; });
  KOMPETENZ.forEach(function (s) { s.art = 'kompetenz'; });
  var ALLE = SYNDROME.concat(UEBERGEORDNET, DSM, KOMPETENZ);
  var NACH_ID = {};
  ALLE.forEach(function (s) { NACH_ID[s.id] = s; });
  /* Plausible T-Bereiche (ASEBA: Syndrom- und DSM-Skalen beginnen bei T 50) */
  var BEREICH_T = { syndrom: [50, 100], dsm: [50, 100], uebergeordnet: [20, 100], kompetenz: [10, 80] };
  function gilt(s, inf) { return !s.formen || s.formen.indexOf(inf) >= 0; }

  /* Kritische Items (Antwort 0/1/2 je Fragebogen) – Wortlaut je Form */
  var ITEMS = [
    { id: 'i18', nr: 18, text: {
      eltern: L('verletzt sich absichtlich selbst oder versucht Suizid', 'se fait délibérément du mal ou fait une tentative de suicide', 'Deliberately harms self or attempts suicide'),
      lehrer: L('verletzt sich absichtlich selbst oder versucht Suizid', 'se fait délibérément du mal ou fait une tentative de suicide', 'Deliberately harms self or attempts suicide'),
      selbst: L('verletzt sich absichtlich selbst oder versucht Suizid', 'se fait délibérément du mal ou fait une tentative de suicide', 'I deliberately try to hurt or kill myself') } },
    { id: 'i91', nr: 91, text: {
      eltern: L('spricht davon, sich umzubringen', 'parle de se suicider', 'Talks about killing self'),
      lehrer: L('spricht davon, sich umzubringen', 'parle de se suicider', 'Talks about killing self'),
      selbst: L('denkt daran, sich umzubringen', 'pense à se suicider', 'I think about killing myself') } }
  ];

  /* ---------------- Einstufung ---------------- */
  var STUFEN = [L('unauffällig', 'zone normale', 'normal range'), L('Grenzbereich', 'zone limite', 'borderline range'), L('auffällig', 'zone clinique', 'clinical range')];
  KAT.bandDefinieren('cbcl-syndrom', KAT.problemBand([64, 69], STUFEN));          /* ≤ 64 · 65–69 · ≥ 70 */
  KAT.bandDefinieren('cbcl-uebergeordnet', KAT.problemBand([59, 63], STUFEN));    /* ≤ 59 · 60–63 · ≥ 64 */
  KAT.bandDefinieren('cbcl-kompetenz', KAT.ressourceBand([36, 31], STUFEN));      /* ≥ 36 · 31–35 · ≤ 30 */
  KAT.bandDefinieren('cbcl-gesamtkompetenz', KAT.ressourceBand([41, 37], STUFEN)); /* ≥ 41 · 37–40 · ≤ 36 */

  /* ---------------- Daten ---------------- */
  var ALTERSGRUPPEN = { eltern: ['6-11', '12-18'], lehrer: ['6-11', '12-18'], selbst: ['11-18'] };
  var ALTER = { '6-11': [6, 11], '12-18': [12, 18], '11-18': [11, 18] };
  function neu() {
    var w = {}, norm = {}, items = {};
    INF.forEach(function (i) { w[i] = { t: {}, pr: {} }; norm[i] = { geschlecht: '', alter: '' }; items[i] = {}; });
    return { informanten: ['eltern'], datum: '', mitPR: false, norm: norm, w: w, items: items };
  }
  /* gewählte Fragebögen, immer in der Reihenfolge Eltern · Lehrkraft · Selbst */
  function aktive(d) { var l = (d && d.informanten) || []; return INF.filter(function (i) { return l.indexOf(i) >= 0; }); }
  function feld(d, inf, art) { var w = ((d && d.w) || {})[inf] || {}; return w[art] || {}; }
  function tWert(v, s) { var g = BEREICH_T[s.art], n = B.num(v); return n != null && E.inBereich(n, { min: g[0], max: g[1], ganz: true }) ? n : null; }
  function prWert(v) { var n = B.num(v); return n != null && E.inBereich(n, { min: 0.1, max: 99.9 }) ? n : null; }
  function itemWert(v) { var n = B.num(v); return n != null && E.inBereich(n, { min: 0, max: 2, ganz: true }) ? n : null; }

  function auswerten(d) {
    var je = {};
    INF.forEach(function (inf) {
      var t = feld(d, inf, 't'), pr = feld(d, inf, 'pr');
      var zeilen = ALLE.filter(function (s) { return gilt(s, inf); }).map(function (s) {
        var w = tWert(t[s.id], s);
        return { id: s.id, name: s.name, art: s.art, metrik: 'T', wert: w, pr: w != null && d.mitPR ? prWert(pr[s.id]) : null,
          band: w == null ? null : KAT.einstufen(s.band, w) };
      });
      var roh = ((d && d.items) || {})[inf] || {}, items = {};
      ITEMS.forEach(function (it) { items[it.id] = itemWert(roh[it.id]); });
      je[inf] = { zeilen: zeilen, items: items, hatWerte: zeilen.some(function (z) { return z.wert != null; }) };
    });
    return { je: je, infs: aktive(d) };
  }
  function zeileVon(ausw, inf, id) { return ((ausw.je[inf] || {}).zeilen || []).filter(function (z) { return z.id === id; })[0] || null; }
  function hatItems(ausw, inf) { return ITEMS.some(function (it) { return ausw.je[inf].items[it.id] != null; }); }
  function itemChip(n) {
    return n >= 1 ? { rang: 2, klasse: 'auff', name: L('markiert (' + n + ')', 'marqué (' + n + ')', 'flagged (' + n + ')') }
      : { rang: 0, klasse: 'ok', name: L('nicht markiert', 'non marqué', 'not flagged') };
  }
  function chip(pfad, n) {
    var m = /\.w\.(eltern|lehrer|selbst)\.t\.(\w+)$/.exec(pfad);
    if (m && NACH_ID[m[2]]) { return KAT.einstufen(NACH_ID[m[2]].band, n); }
    if (/\.items\.(eltern|lehrer|selbst)\.i(18|91)$/.test(pfad)) { return itemChip(n); }
    return null;
  }

  /* ---------------- Formular ---------------- */
  /* kurze Spaltenköpfe (die Köpfe brechen nicht um und bestimmen sonst die Breite des Rasters) */
  var INF_SPALTE = { eltern: 'Eltern (CBCL)', lehrer: 'Lehrkraft (TRF)', selbst: 'Selbst (YSR)' };
  /* art 't': T-Werte mit Einstufung · art 'pr': Prozentränge (eigenes Raster, ohne Einstufung) */
  function spaltenUi(infs, art) {
    return infs.map(function (inf) {
      return art === 'pr' ? { id: inf + '.pr', label: INF_SPALTE[inf], min: 0.1, max: 99.9, ganz: false, ohneChip: true } : { id: inf + '.t', label: INF_SPALTE[inf] };
    });
  }
  function zeileUi(s, infs, art, hinweis) {
    var z = { id: s.id, name: B.t(s.name, 'de'), min: BEREICH_T[s.art][0], max: BEREICH_T[s.art][1], ganz: true, hinweis: hinweis || '' };
    if (s.formen) { z.nurSpalten = infs.filter(function (inf) { return gilt(s, inf); }).map(function (inf) { return inf + '.' + art; }); }
    return z;
  }
  /* mehrere Beurteiler: Einstufung unter dem Feld (gestapelt), damit das Raster nicht waagrecht scrollt */
  function rasterUi(zeilen, infs, art) {
    return E.raster({ basis: 'tests.cbcl.w', kopfSkala: 'Skala', gestapelt: art !== 'pr' && infs.length > 1, spalten: spaltenUi(infs, art), zeilen: zeilen,
      einstufen: function (zeile, spalte, n) { return /\.t$/.test(spalte) && NACH_ID[zeile] ? KAT.einstufen(NACH_ID[zeile].band, n) : null; } });
  }
  /* T-Raster und – wenn gewählt – darunter das Raster der Prozentränge mit denselben Zeilen */
  function rasterPaar(bau, infs, mitPR) {
    return rasterUi(bau('t'), infs, 't') + (mitPR ? '<h3 style="margin-top:16px">Prozentränge</h3>' + rasterUi(bau('pr'), infs, 'pr') : '');
  }
  function formular(d, fall) {
    var infs = aktive(d), mitPR = !!d.mitPR;
    var k = (fall && fall.kind) || {}, alter = B.alter(k.geburtsdatum, d.datum || ((fall && fall.bericht) || {}).datumVon);
    var h = E.karte('<h2>Durchführung</h2><div class="raster">' + E.feld('tests.cbcl.datum', 'Datum', { typ: 'date' }) + '</div>' +
      '<div style="margin-top:12px"><span class="feld"><span>Welche Fragebögen wurden ausgefüllt?</span></span>' +
      E.wahlen('tests.cbcl.informanten', INF.map(function (i) { return [i, INF_UI[i]]; }), true, true) + '</div>' +
      '<div style="margin-top:12px">' + E.haken('tests.cbcl.mitPR', 'Prozentränge zusätzlich eingeben', 'Nur wenn der Auswertungsbogen bzw. das Testauswerteprogramm Prozentränge ausweist. Eingabe jeweils unter den T-Werten; der Bericht nennt sie neben dem T-Wert.', true) + '</div>');
    if (!infs.length) { return h + E.hinweis('Bitte mindestens einen Fragebogen (Beurteiler) wählen.', 'info'); }

    h += E.karte('<h2>Normgruppe</h2><p class="klein">Die Normen sind geschlechts- und altersspezifisch. Angeben, welche Normgruppe der Auswertungsbogen bzw. das Testauswerteprogramm verwendet hat – der Bericht nennt sie.' +
      (infs.indexOf('lehrer') >= 0 ? ' Für die TRF/6-18R nennt der Verlag deutsche Vergleichswerte nur für Grundschulkinder (6–11 Jahre).' : '') + '</p>' +
      (infs.indexOf('lehrer') >= 0 && alter && alter.j >= 12 ? E.hinweis('Das Kind ist ' + B.esc(B.alterText(alter, 'de')) + ' alt: Für die TRF/6-18R bitte prüfen, welche Normen der Auswertung zugrunde liegen.', 'info') : '') +
      infs.map(function (inf) {
        var p = 'tests.cbcl.norm.' + inf + '.';
        return '<h3 style="margin-top:12px">' + B.esc(INF_UI[inf]) + '</h3><div class="raster">' +
          E.auswahl(p + 'geschlecht', 'Geschlecht', [['m', 'Jungen'], ['w', 'Mädchen']], { leer: '– bitte wählen –', neu: true }) +
          E.auswahl(p + 'alter', 'Altersgruppe', ALTERSGRUPPEN[inf].map(function (a) { return [a, ALTER[a][0] + '–' + ALTER[a][1] + ' Jahre']; }), { leer: '– bitte wählen –', neu: true }) + '</div>';
      }).join(''));

    h += E.karte('<h2>Problemskalen (T-Werte)</h2><p class="klein">Aus dem Auswertungsbogen „Kompetenz- und Problemskalen“ (TRF: „Adaptive Funktionen und Problemskalen“) bzw. aus dem Testauswerteprogramm. ' +
      'Syndromskalen beginnen bei T 50. Grenzbereich: Syndromskalen T 65–69, übergeordnete Skalen T 60–63; auffällig ab T 70 bzw. T 64. Stanine aus dem Vergleich mit klinischen Stichproben hier nicht eintragen. Leere Felder erscheinen im Bericht nicht.</p>' +
      rasterPaar(function (art) {
        return [{ trenner: 'Syndromskalen' }].concat(SYNDROME.map(function (s) { return zeileUi(s, infs, art); }))
          .concat([{ trenner: 'Übergeordnete Skalen' }]).concat(UEBERGEORDNET.map(function (s) { return zeileUi(s, infs, art); }));
      }, infs, mitPR) + '<div id="cbcl-uebersicht">' + uebersichtUi(d) + '</div>');

    h += E.karte('<h2>Kritische Einzelitems</h2><p class="klein">Antwort je Fragebogen so, wie angekreuzt (0, 1 oder 2). Jede Markierung mit 1 oder 2 erscheint im Bericht unter „Hinweis zur Sicherheit“ und auf der Seite „Beobachtung und Einordnung“ – bitte zeitnah besprechen.</p>' +
      E.raster({ basis: 'tests.cbcl.items', kopfSkala: 'Item', gestapelt: infs.length > 1, spalten: infs.map(function (i) { return { id: i, label: INF_SPALTE[i] }; }),
        zeilen: [
          { id: 'i18', name: 'Item 18', hinweis: 'verletzt sich absichtlich selbst oder versucht Suizid (YSR: Ich-Form)', min: 0, max: 2, ganz: true },
          { id: 'i91', name: 'Item 91', hinweis: 'CBCL/TRF: spricht davon, sich umzubringen · YSR: denkt daran, sich umzubringen', min: 0, max: 2, ganz: true }],
        einstufen: function (z, s, n) { return itemChip(n); } }));

    h += E.karte('<h2>DSM-orientierte Skalen (optional)</h2><p class="klein">Eigener Auswertungsbogen „DSM-orientierte Skalen“. Einstufung wie bei den Syndromskalen (Grenzbereich T 65–69, auffällig ab T 70).</p>' +
      rasterPaar(function (art) { return DSM.map(function (s) { return zeileUi(s, infs, art); }); }, infs, mitPR));

    var komp = KOMPETENZ.filter(function (s) { return infs.some(function (inf) { return gilt(s, inf); }); });
    var mitKomp = komp.filter(function (s) { return s.id.charAt(0) === 'k'; }), mitAdapt = komp.filter(function (s) { return s.id.charAt(0) === 'a'; });
    h += E.karte('<h2>Kompetenzskalen und adaptive Funktionen (optional)</h2><p class="klein">Niedrige Werte sind ungünstig. Einstufung nach dem US-Manual (am deutschen Manual zu prüfen): einzelne Kompetenzskalen Grenzbereich T 31–35, auffällig bis T 30; Gesamtkompetenz und adaptive Funktionen Grenzbereich T 37–40, auffällig bis T 36. Die Zuverlässigkeit der Kompetenzskalen gilt als eingeschränkt – vorsichtig deuten.</p>' +
      rasterPaar(function (art) {
        var kz = [];
        if (mitKomp.length) { kz.push({ trenner: 'Kompetenzskalen (CBCL/6-18R, YSR/11-18R)' }); mitKomp.forEach(function (s) { kz.push(zeileUi(s, infs, art, s.id === 'ksch' ? 'nur CBCL/6-18R' : '')); }); }
        if (mitAdapt.length) { kz.push({ trenner: 'Adaptive Funktionen (TRF/6-18R)' }); mitAdapt.forEach(function (s) { kz.push(zeileUi(s, infs, art)); }); }
        return kz;
      }, infs, mitPR));
    return h;
  }
  function uebersichtUi(d) {
    var a = auswerten(d), infs = aktive(d);
    if (!infs.length) { return ''; }
    return '<p class="klein" style="display:flex;gap:10px 18px;flex-wrap:wrap;margin:12px 0 0"><b>Übersicht</b>' + infs.map(function (inf) {
      var z = a.je[inf].zeilen.filter(function (x) { return x.band && x.art !== 'kompetenz'; });
      var au = z.filter(function (x) { return x.band.rang >= 2; }).length, gr = z.filter(function (x) { return x.band.rang === 1; }).length;
      var mark = ITEMS.filter(function (it) { return a.je[inf].items[it.id] >= 1; }).map(function (it) { return it.nr; });
      var teile = [];
      if (!z.length) { teile.push('<span class="leise">noch keine Werte</span>'); }
      if (au) { teile.push('<span class="chip auff">' + au + ' × auffällig</span>'); }
      if (gr) { teile.push('<span class="chip grenz">' + gr + ' × Grenzbereich</span>'); }
      if (z.length && !au && !gr) { teile.push('<span class="chip ok">alle unauffällig</span>'); }
      if (mark.length) { teile.push('<span class="chip stark">Item ' + mark.join(' und ') + ' markiert</span>'); }
      return '<span><b>' + B.esc(INF_UI[inf]) + ':</b> ' + teile.join(' ') + '</span>';
    }).join('') + '</p>';
  }
  function teilUpdate(d) { return { 'cbcl-uebersicht': uebersichtUi(d) }; }

  /* ---------------- Bericht ---------------- */
  var TITEL = L('CBCL/6-18R, TRF/6-18R, YSR/11-18R – Deutsche Schulalter-Formen der Child Behavior Checklist',
    'CBCL/6-18R, TRF/6-18R, YSR/11-18R – Child Behavior Checklist, formes pour l’âge scolaire (version allemande)',
    'CBCL/6-18R, TRF/6-18R, YSR/11-18R – Child Behavior Checklist, German school-age forms');
  var FORMNAME = { eltern: L('Elternfragebogen', 'questionnaire parents', 'parent form'), lehrer: L('Lehrerfragebogen', 'questionnaire enseignant·e', 'teacher form'),
    selbst: L('Fragebogen für Jugendliche', 'questionnaire pour les jeunes', 'youth self-report') };
  var ZWECK = {
    de: 'Die deutschen Schulalter-Formen der Child Behavior Checklist erfassen Verhaltensauffälligkeiten, emotionale Auffälligkeiten und körperliche Beschwerden sowie Kompetenzen von Kindern und Jugendlichen aus der Sicht der Eltern (CBCL/6-18R), der Lehrkräfte (TRF/6-18R) und der Jugendlichen selbst (YSR/11-18R, ab 11 Jahren). ' +
      'Ausgewertet werden acht Syndromskalen: Ängstlich/depressiv; Rückzüglich/depressiv; Körperliche Beschwerden; Soziale Probleme; Denk-, (Schlaf-) und repetitive Probleme; Aufmerksamkeitsprobleme; Regelverletzendes Verhalten; Aggressives Verhalten. ' +
      'Zusätzlich werden die übergeordneten Skalen Internale Probleme und Externale Probleme sowie die Gesamtauffälligkeit berechnet. Die Ergebnisse werden als T-Werte angegeben (Mittelwert 50, Standardabweichung 10); hohe Werte bedeuten mehr Auffälligkeiten.',
    fr: 'Les formes pour l’âge scolaire de la Child Behavior Checklist (version allemande) évaluent les difficultés comportementales et émotionnelles, les plaintes somatiques ainsi que les compétences des enfants et des adolescents, selon le point de vue des parents (CBCL/6-18R), des enseignant·e·s (TRF/6-18R) et des jeunes eux-mêmes (YSR/11-18R, à partir de 11 ans). ' +
      'Elles comprennent huit échelles syndromiques (Anxiété/Dépression, Retrait/Dépression, Plaintes somatiques, Problèmes sociaux, Problèmes de la pensée, Problèmes d’attention, Comportement de transgression des règles et Comportement agressif) ; s’y ajoutent les échelles globales Problèmes intériorisés et Problèmes extériorisés ainsi que le Total des problèmes. ' +
      'Les résultats sont exprimés en notes T (moyenne 50, écart type 10) ; des notes élevées indiquent davantage de difficultés.',
    en: 'The German school-age forms of the Child Behavior Checklist assess behavioural and emotional problems, somatic complaints and competencies of children and adolescents from the perspective of parents (CBCL/6-18R), teachers (TRF/6-18R) and young people themselves (YSR/11-18R, from age 11). ' +
      'They comprise eight syndrome scales (Anxious/Depressed, Withdrawn/Depressed, Somatic Complaints, Social Problems, Thought Problems, Attention Problems, Rule-Breaking Behavior and Aggressive Behavior) as well as the broadband scales Internalizing Problems and Externalizing Problems and the Total Problems score. ' +
      'Results are reported as T-scores (mean 50, standard deviation 10); higher scores indicate more problems.'
  };
  var ZWECK_DSM = L('Außerdem wurden DSM-orientierte Skalen ausgewertet; sie bündeln Items, die inhaltlich Kriterien des DSM entsprechen, und ersetzen keine Diagnose.',
    'Des échelles orientées DSM ont également été calculées ; elles regroupent des items proches des critères du DSM et ne remplacent pas un diagnostic.',
    'DSM-oriented scales were also scored; they group items that correspond to DSM criteria and do not replace a diagnosis.');
  var ZWECK_KOMP = L('Bei den Kompetenzskalen (TRF: adaptive Funktionen) bedeuten niedrige Werte ein ungünstigeres Ergebnis.',
    'Pour les échelles de compétences (TRF : fonctionnement adaptatif), des notes basses indiquent un résultat moins favorable.',
    'For the competence scales (TRF: adaptive functioning), lower scores indicate a less favourable result.');

  /* „Jungen, 6–11 Jahre“ · „garçons de 6 à 11 ans“ · „boys aged 6–11“ */
  function normText(n, lang) {
    var g = { m: L('Jungen', 'garçons', 'boys'), w: L('Mädchen', 'filles', 'girls') }[(n || {}).geschlecht];
    var a = ALTER[(n || {}).alter];
    var gt = g ? B.t(g, lang) : '';
    if (!a) { return gt; }
    if (lang === 'fr') { return gt ? gt + ' de ' + a[0] + ' à ' + a[1] + ' ans' : 'tranche d’âge de ' + a[0] + ' à ' + a[1] + ' ans'; }
    if (lang === 'en') { return gt ? gt + ' aged ' + a[0] + '–' + a[1] : 'age group ' + a[0] + '–' + a[1]; }
    return gt ? gt + ', ' + a[0] + '–' + a[1] + ' Jahre' : 'Altersgruppe ' + a[0] + '–' + a[1] + ' Jahre';
  }
  function werSatz(lang, ctx, infs) {
    var mehr = infs.length > 1;
    var teile = infs.map(function (i) {
      if (lang === 'fr') { return { eltern: 'les parents', lehrer: 'l’enseignant·e', selbst: ctx.vorname || 'le/la jeune' }[i] + ' (' + FORM[i] + (i === 'selbst' ? ', autoévaluation' : '') + ')'; }
      if (lang === 'en') { return { eltern: 'the parents', lehrer: 'the teacher', selbst: ctx.vorname || 'the young person' }[i] + ' (' + FORM[i] + (i === 'selbst' ? ', self-report' : '') + ')'; }
      return { eltern: 'den Eltern', lehrer: 'der Lehrkraft', selbst: (ctx.vorname || 'der/dem Jugendlichen') + ' selbst' }[i] + ' (' + FORM[i] + ')';
    });
    if (lang === 'fr') { return (mehr ? 'Les questionnaires ont été remplis par ' : 'Le questionnaire a été rempli par ') + B.liste(teile, lang); }
    if (lang === 'en') { return (mehr ? 'The questionnaires were completed by ' : 'The questionnaire was completed by ') + B.liste(teile, lang); }
    return (mehr ? 'Ausgefüllt wurden die Fragebögen von ' : 'Ausgefüllt wurde der Fragebogen von ') + B.liste(teile, lang);
  }
  function normSatz(lang, d, infs) {
    var mit = infs.filter(function (i) { return normText(((d.norm || {})[i]), lang); });
    var texte = mit.map(function (i) { return normText(d.norm[i], lang); });
    var gleich = mit.length === infs.length && texte.every(function (t) { return t === texte[0]; });
    var teil = '';
    if (mit.length && gleich) {
      teil = (lang === 'fr' ? ' ; groupe normatif : ' : (lang === 'en' ? '; norm group: ' : '; Normgruppe: ')) + texte[0];
    } else if (mit.length) {
      /* gleiche Normgruppen zusammenfassen: „Jungen, 12–18 Jahre (Elternurteil und Lehrerurteil)“ */
      var gruppen = [];
      mit.forEach(function (i, k) {
        var g = gruppen.filter(function (x) { return x.text === texte[k]; })[0];
        if (g) { g.wer.push(i); } else { gruppen.push({ text: texte[k], wer: [i] }); }
      });
      var mehrere = gruppen.length > 1;
      teil = (lang === 'fr' ? ' ; ' + (mehrere ? 'groupes normatifs : ' : 'groupe normatif : ') : (lang === 'en' ? '; ' + (mehrere ? 'norm groups: ' : 'norm group: ') : '; ' + (mehrere ? 'Normgruppen: ' : 'Normgruppe: '))) +
        B.liste(gruppen.map(function (g) { return g.text + ' (' + B.liste(g.wer.map(function (i) { return infName(i, lang); }), lang) + ')'; }), lang);
    }
    var s = (lang === 'fr' ? 'Les notes T se réfèrent aux normes de la version allemande (Döpfner, Plück & Kinnen, 2014)'
      : (lang === 'en' ? 'The T-scores are based on the norms of the German edition (Döpfner, Plück & Kinnen, 2014)'
        : 'Die T-Werte beziehen sich auf die Normen der deutschen Ausgabe (Döpfner, Plück & Kinnen, 2014)')) + teil;
    var t = [TX.satz(s, lang)];
    if (infs.indexOf('lehrer') >= 0) {
      t.push(TX.satz(lang === 'fr' ? 'Pour le questionnaire enseignant·e (TRF/6-18R), les valeurs de référence allemandes proviennent d’un échantillon d’élèves de l’école primaire (6 à 11 ans)'
        : (lang === 'en' ? 'For the teacher form (TRF/6-18R), the German reference values come from a community sample of primary school children (aged 6–11)'
          : 'Für den Lehrerfragebogen (TRF/6-18R) stammen die deutschen Vergleichswerte aus einer Feldstichprobe von Grundschulkindern (6–11 Jahre)'), lang));
    }
    return t.join(' ');
  }
  /* Tabellenzelle: „72 (auffällig)“ · „72 (PR 98; auffällig)“ */
  function zelle(z, lang) {
    if (!z) { return '–'; }
    if (z.wert == null) { return '–'; }
    var teile = [];
    if (z.pr != null) { teile.push((lang === 'fr' ? 'rang centile ' : 'PR ') + B.zahl(z.pr, lang)); }
    if (z.band) { teile.push(B.t(z.band.name, lang)); }
    return String(z.wert) + (teile.length ? ' (' + teile.join('; ') + ')' : '');
  }
  function tabelleBlock(lang, ausw, infs, skalen, kopf, anmerkung) {
    var zeilen = skalen.filter(function (s) { return infs.some(function (i) { var z = zeileVon(ausw, i, s.id); return z && z.wert != null; }); })
      .map(function (s) { return [B.t(s.name, lang)].concat(infs.map(function (i) { return gilt(s, i) ? zelle(zeileVon(ausw, i, s.id), lang) : '–'; })); });
    if (!zeilen.length) { return null; }
    return { t: 'tabelle', kopf: [kopf].concat(infs.map(function (i) { return B.ersteGross(infName(i, lang)) + ' (' + FORM[i] + ')'; })), zeilen: zeilen, anmerkung: anmerkung };
  }
  var BER = TX.BEREICH;
  function bereichVon(z) { return z.band.rang >= 2 ? 'auff' : (z.band.rang === 1 ? 'grenz' : 'ok'); }
  /* Gesamtauffälligkeit und übergeordnete Skalen – eigene Sätze, getrennt von den Syndromskalen:
     „Im Elternurteil (CBCL/6-18R) liegt die Gesamtauffälligkeit (T-Wert 68) im auffälligen Bereich.
      Übergeordnete Skalen: Externale Probleme (T-Wert 70) im auffälligen Bereich und Internale Probleme (T-Wert 61) im Grenzbereich.“ */
  function uebergeordnetSaetze(lang, inf, zeilen) {
    var s = [], lead = B.ersteGross(infBei(inf, lang)) + ' (' + FORM[inf] + ')';
    var ges = zeilen.filter(function (z) { return z.id === 'ges'; })[0];
    var ie = zeilen.filter(function (z) { return z.id === 'int' || z.id === 'ext'; });
    if (ges) {
      var kg = TX.wertKlammer(ges, lang, false), bg = B.t(BER[bereichVon(ges)], lang);
      s.push(lang === 'fr' ? lead + ', le score Total des problèmes' + kg + ' se situe ' + bg
        : (lang === 'en' ? lead + ', the Total Problems score' + kg + ' is ' + bg : lead + ' liegt die Gesamtauffälligkeit' + kg + ' ' + bg));
    }
    if (ie.length) {
      var teile = ['auff', 'grenz', 'ok'].map(function (b) {
        var l = ie.filter(function (z) { return bereichVon(z) === b; });
        return l.length ? B.liste(l.map(function (z) { return B.t(z.name, lang) + TX.wertKlammer(z, lang, false); }), lang) + ' ' + B.t(BER[b], lang) : '';
      }).filter(Boolean);
      /* ohne Gesamtauffälligkeit steht der Beurteiler im Kopf der Liste */
      var kopf = { de: 'Übergeordnete Skalen', fr: 'Échelles globales', en: 'Broadband scales' }[lang] + (ges ? '' : ' ' + infBei(inf, lang) + ' (' + FORM[inf] + ')');
      s.push(kopf + ': ' + B.liste(teile, lang));
    }
    return s;
  }
  /* Sätze für eine Gruppe echter Skalen (Syndrom-, DSM-orientierte, Kompetenzskalen) eines Beurteilers –
     Aufbau wie TX.fragebogenAbsatz, aber ohne Einstufung in der Klammer (der Bereich steht im Satz);
     abschnitt = true: anfang ist „Bei den Syndromskalen“ o. ä., sonst der Beurteiler */
  function gruppenSaetze(lang, anfang, zeilen, art, abschnitt) {
    var g = TX.gruppieren(zeilen), s = [];
    function nm(z) { return B.t(z.name, lang) + TX.wertKlammer(z, lang, false); }
    function satzFuer(lead, liste, bereich) {
      var n = liste.length, namen = liste.map(nm), ber = B.t(BER[bereich], lang);
      if (lang === 'fr') { return n === 1 ? lead + ', l’échelle ' + namen[0] + ' se situe ' + ber : lead + ', les échelles ' + B.liste(namen, lang) + ' se situent ' + ber; }
      if (lang === 'en') { return n === 1 ? lead + ', the scale ' + namen[0] + ' is ' + ber : lead + ', the scales ' + B.liste(namen, lang) + ' are ' + ber; }
      return n === 1 ? lead + ' liegt die Skala ' + namen[0] + ' ' + ber : lead + ' liegen die Skalen ' + B.liste(namen, lang) + ' ' + ber;
    }
    var ALLE_OK = {
      syndrom: abschnitt ? { de: 'Die Syndromskalen liegen alle im unauffälligen Bereich', fr: 'Les échelles syndromiques se situent toutes dans la zone normale', en: 'All syndrome scales are within the normal range' }
        : { de: anfang + ' liegen alle Syndromskalen im unauffälligen Bereich', fr: anfang + ', toutes les échelles syndromiques se situent dans la zone normale', en: anfang + ', all syndrome scales are within the normal range' },
      dsm: { de: 'Die DSM-orientierten Skalen liegen alle im unauffälligen Bereich', fr: 'Les échelles orientées DSM se situent toutes dans la zone normale', en: 'All DSM-oriented scales are within the normal range' },
      kompetenz: { de: 'Die Kompetenzskalen liegen alle im unauffälligen Bereich', fr: 'Les échelles de compétences se situent toutes dans la zone normale', en: 'All competence scales are within the normal range' },
      adaptiv: { de: 'Die Werte der adaptiven Funktionen liegen alle im unauffälligen Bereich', fr: 'Les valeurs du fonctionnement adaptatif se situent toutes dans la zone normale', en: 'All adaptive functioning scores are within the normal range' }
    };
    var REST = {
      syndrom: { de: 'Die übrigen Syndromskalen liegen im unauffälligen Bereich', fr: 'Les autres échelles syndromiques se situent dans la zone normale', en: 'The other syndrome scales are within the normal range' },
      dsm: { de: 'Die übrigen DSM-orientierten Skalen liegen im unauffälligen Bereich', fr: 'Les autres échelles orientées DSM se situent dans la zone normale', en: 'The other DSM-oriented scales are within the normal range' },
      kompetenz: { de: 'Die übrigen Kompetenzskalen liegen im unauffälligen Bereich', fr: 'Les autres échelles de compétences se situent dans la zone normale', en: 'The other competence scales are within the normal range' },
      adaptiv: { de: 'Die übrigen Werte der adaptiven Funktionen liegen im unauffälligen Bereich', fr: 'Les autres valeurs du fonctionnement adaptatif se situent dans la zone normale', en: 'The other adaptive functioning scores are within the normal range' }
    };
    if (!g.auff.length && !g.grenz.length) {
      if (!g.ok.length) { return []; }
      return [g.ok.length === 1 ? satzFuer(anfang, g.ok, 'ok') : ALLE_OK[art][lang]];
    }
    if (g.auff.length) { s.push(satzFuer(anfang, g.auff, 'auff')); }
    if (g.grenz.length) { s.push(satzFuer(g.auff.length ? { de: 'Außerdem', fr: 'En outre', en: 'In addition' }[lang] : anfang, g.grenz, 'grenz')); }
    if (g.ok.length === 1) {
      var z1 = nm(g.ok[0]);
      s.push(lang === 'fr' ? 'L’échelle ' + z1 + ' se situe dans la zone normale' : (lang === 'en' ? 'The scale ' + z1 + ' is within the normal range' : 'Die Skala ' + z1 + ' liegt im unauffälligen Bereich'));
    } else if (g.ok.length > 1) { s.push(REST[art][lang]); }
    return s;
  }
  var ABSCHNITT = {
    syndrom: L('Bei den Syndromskalen', 'Pour les échelles syndromiques', 'For the syndrome scales'),
    dsm: L('Bei den DSM-orientierten Skalen', 'Pour les échelles orientées DSM', 'For the DSM-oriented scales'),
    kompetenz: L('Bei den Kompetenzskalen', 'Pour les échelles de compétences', 'For the competence scales'),
    adaptiv: L('Bei den adaptiven Funktionen', 'Pour le fonctionnement adaptatif', 'For adaptive functioning')
  };
  /* Absatz je Beurteiler: 1) Gesamtauffälligkeit und übergeordnete Skalen, 2) Syndromskalen,
     3) DSM-orientierte Skalen, 4) Kompetenzskalen bzw. adaptive Funktionen – jeweils eigene Sätze */
  function beurteilerAbsatz(lang, inf, a) {
    var z = a.zeilen.filter(function (x) { return x.wert != null; });
    var ueb = ['ges', 'int', 'ext'].map(function (id) { return z.filter(function (x) { return x.id === id; })[0]; }).filter(Boolean);
    var syn = z.filter(function (x) { return x.art === 'syndrom'; });
    var dsm = z.filter(function (x) { return x.art === 'dsm'; }), komp = z.filter(function (x) { return x.art === 'kompetenz'; });
    var s = uebergeordnetSaetze(lang, inf, ueb);
    if (syn.length) {
      s = s.concat(ueb.length ? gruppenSaetze(lang, B.t(ABSCHNITT.syndrom, lang), syn, 'syndrom', true)
        : gruppenSaetze(lang, B.ersteGross(infBei(inf, lang)) + ' (' + FORM[inf] + ')', syn, 'syndrom', false));
    }
    if (dsm.length) { s = s.concat(gruppenSaetze(lang, B.t(ABSCHNITT.dsm, lang), dsm, 'dsm', true)); }
    var ka = inf === 'lehrer' ? 'adaptiv' : 'kompetenz';
    if (komp.length) { s = s.concat(gruppenSaetze(lang, B.t(ABSCHNITT[ka], lang), komp, ka, true)); }
    var text = s.map(function (x) { return TX.satz(x, lang); }).join(' ');
    /* nur DSM- oder Kompetenzwerte: Beurteiler vorn nennen */
    if (text && !ueb.length && !syn.length) { text = B.ersteGross(infName(inf, lang)) + ' (' + FORM[inf] + '): ' + text; }
    return text;
  }
  /* Kategorien für Vergleich, Zusammenfassung und Hinweise – übergeordnete Skalen und Syndromskalen getrennt */
  var KATEGORIEN = [
    { id: 'ges', ids: ['ges'] },
    { id: 'ueb', ids: ['int', 'ext'], name: { de: ['übergeordnete Skala', 'übergeordnete Skalen'], fr: ['échelle globale', 'échelles globales'], en: ['broadband scale', 'broadband scales'] } },
    { id: 'syn', ids: SYNDROME.map(function (s) { return s.id; }), name: { de: ['Syndromskala', 'Syndromskalen'], fr: ['échelle syndromique', 'échelles syndromiques'], en: ['syndrome scale', 'syndrome scales'] } },
    { id: 'dsm', ids: DSM.map(function (s) { return s.id; }), name: { de: ['DSM-orientierte Skala', 'DSM-orientierte Skalen'], fr: ['échelle orientée DSM', 'échelles orientées DSM'], en: ['DSM-oriented scale', 'DSM-oriented scales'] } }
  ];
  /* Vergleich der Beurteiler (Aufbau und Sätze wie TX.vergleichAbsatz, aber nach Kategorien getrennt):
     „Nur in einem Urteil auffällig: Gesamtauffälligkeit (im Elternurteil); Syndromskalen A (im …) und B (im …).“ */
  function vergleichAbsatz(lang, ausw, infs) {
    if (infs.length < 2) { return ''; }
    var gemeinsam = [], einzeln = [];
    KATEGORIEN.forEach(function (k) {
      var g = [], e = [];
      k.ids.forEach(function (id) {
        var hoch = beurteilerMit(ausw, infs, [id], function (r) { return r >= 2; });
        var bewertet = infs.filter(function (i) { var z = zeileVon(ausw, i, id); return z && z.band; });
        var nm = B.t(NACH_ID[id].name, lang);
        if (hoch.length >= 2) { g.push(nm + ' (' + B.liste(hoch.map(function (i) { return infName(i, lang); }), lang) + ')'); }
        else if (hoch.length === 1 && bewertet.length >= 2) { e.push(nm + ' (' + infBei(hoch[0], lang) + ')'); }
      });
      function text(liste) { return k.name ? k.name[lang][liste.length > 1 ? 1 : 0] + ' ' + B.liste(liste, lang) : B.liste(liste, lang); }
      if (g.length) { gemeinsam.push(text(g)); }
      if (e.length) { einzeln.push(text(e)); }
    });
    var s = [], wer = B.liste(infs.map(function (i) { return infName(i, lang); }), lang);
    if (gemeinsam.length) { s.push({ de: 'Übereinstimmend im auffälligen Bereich: ', fr: 'Zone clinique dans plusieurs évaluations : ', en: 'Clinical range in more than one rating: ' }[lang] + gemeinsam.join('; ')); }
    if (einzeln.length) { s.push({ de: 'Nur in einem Urteil auffällig: ', fr: 'Zone clinique dans une seule évaluation : ', en: 'Clinical range in only one rating: ' }[lang] + einzeln.join('; ')); }
    if (!gemeinsam.length && !einzeln.length) {
      s.push({ de: 'Die Urteile (' + wer + ') weichen nicht wesentlich voneinander ab', fr: 'Les évaluations (' + wer + ') ne font pas apparaître de divergence importante', en: 'The ratings (' + wer + ') show no marked differences' }[lang]);
    }
    if (einzeln.length) {
      s.push({ de: 'Unterschiede zwischen Beurteilern sind häufig; sie können auf unterschiedliche Anforderungen in den Lebensbereichen (Familie, Schule) hinweisen',
        fr: 'Des différences entre les évaluateur·rice·s sont fréquentes ; elles peuvent refléter des exigences différentes selon le contexte (famille, école)',
        en: 'Differences between raters are common and may reflect different demands in different settings (home, school)' }[lang]);
    }
    return s.map(function (x) { return TX.satz(x, lang); }).join(' ');
  }
  function verfahrenZeile(lang, d) {
    var ausw = auswerten(d), mitDaten = ausw.infs.filter(function (i) { return ausw.je[i].hatWerte || hatItems(ausw, i); });
    var infs = mitDaten.length ? mitDaten : ausw.infs;
    var titel = { de: 'Deutsche Schulalter-Formen der Child Behavior Checklist von Thomas M. Achenbach (Döpfner, Plück & Kinnen, 2014)',
      fr: 'Child Behavior Checklist de Thomas M. Achenbach, formes pour l’âge scolaire – version allemande (Döpfner, Plück & Kinnen, 2014)',
      en: 'Child Behavior Checklist by Thomas M. Achenbach, German school-age forms (Döpfner, Plück & Kinnen, 2014)' }[lang];
    return titel + (infs.length ? ': ' + B.liste(infs.map(function (i) { return B.t(FORMNAME[i], lang) + ' (' + FORM[i] + ')'; }), lang) : '') + (d.datum ? ', ' + B.datum(d.datum, lang) : '');
  }
  function bericht(lang, ctx, d, ausw) {
    var infsDaten = ausw.infs.filter(function (i) { return ausw.je[i].hatWerte || hatItems(ausw, i); });
    var infs = ausw.infs.filter(function (i) { return ausw.je[i].hatWerte; });
    var hatDsm = infs.some(function (i) { return ausw.je[i].zeilen.some(function (z) { return z.art === 'dsm' && z.wert != null; }); });
    var hatKomp = infs.some(function (i) { return ausw.je[i].zeilen.some(function (z) { return z.art === 'kompetenz' && z.wert != null; }); });
    var bl = [{ t: 'p', text: ZWECK[lang] + (hatDsm ? ' ' + B.t(ZWECK_DSM, lang) : '') + (hatKomp ? ' ' + B.t(ZWECK_KOMP, lang) : '') }];
    if (!infsDaten.length) { bl.push({ t: 'p', text: lang === 'fr' ? 'Aucun résultat n’a encore été saisi.' : (lang === 'en' ? 'No results have been entered yet.' : 'Es wurden noch keine Ergebnisse eingegeben.') }); return bl; }
    bl.push({ t: 'p', text: TX.satz(werSatz(lang, ctx, infsDaten), lang) + (infs.length ? ' ' + normSatz(lang, d, infs) : '') });
    if (!infs.length) { return bl; }
    var mitPR = infs.some(function (i) { return ausw.je[i].zeilen.some(function (z) { return z.pr != null; }); });
    var anmProb = {
      de: 'T-Werte (Mittelwert 50, Standardabweichung 10); in Klammern ' + (mitPR ? 'Prozentrang (PR) und Einstufung' : 'die Einstufung') + '. Syndromskalen: Grenzbereich T 65–69, auffällig ab T 70; übergeordnete Skalen: Grenzbereich T 60–63, auffällig ab T 64.',
      fr: 'Notes T (moyenne 50, écart type 10) ; entre parenthèses ' + (mitPR ? 'le rang centile et la classification' : 'la classification') + '. Échelles syndromiques : zone limite T 65–69, zone clinique à partir de T 70 ; échelles globales : zone limite T 60–63, zone clinique à partir de T 64.',
      en: 'T-scores (mean 50, standard deviation 10); ' + (mitPR ? 'percentile rank (PR) and classification' : 'classification') + ' in brackets. Syndrome scales: borderline range T 65–69, clinical range from T 70; broadband scales: borderline range T 60–63, clinical range from T 64.'
    }[lang];
    var t1 = tabelleBlock(lang, ausw, infs, SYNDROME.concat(UEBERGEORDNET), { de: 'Problemskalen', fr: 'Échelles de problèmes', en: 'Problem scales' }[lang], anmProb);
    if (t1) { bl.push(t1); }
    var t2 = tabelleBlock(lang, ausw, infs, DSM, { de: 'DSM-orientierte Skalen', fr: 'Échelles orientées DSM', en: 'DSM-oriented scales' }[lang],
      { de: 'T-Werte; Grenzbereich T 65–69, auffällig ab T 70.', fr: 'Notes T ; zone limite T 65–69, zone clinique à partir de T 70.', en: 'T-scores; borderline range T 65–69, clinical range from T 70.' }[lang]);
    if (t2) { bl.push(t2); }
    var einzel = B.liste(KOMPETENZ.filter(function (s) { return s.band === 'cbcl-kompetenz'; }).map(function (s) { return B.t(s.name, lang); }), lang);
    var t3 = tabelleBlock(lang, ausw, infs, KOMPETENZ, { de: 'Kompetenzen und adaptive Funktionen', fr: 'Compétences et fonctionnement adaptatif', en: 'Competence and adaptive functioning' }[lang],
      { de: 'T-Werte; niedrige Werte sind ungünstig. ' + einzel + ': Grenzbereich T 31–35, auffällig bis T 30; Gesamtkompetenz und adaptive Funktionen: Grenzbereich T 37–40, auffällig bis T 36.',
        fr: 'Notes T ; des notes basses sont défavorables. ' + einzel + ' : zone limite T 31–35, zone clinique jusqu’à T 30 ; compétence totale et fonctionnement adaptatif : zone limite T 37–40, zone clinique jusqu’à T 36.',
        en: 'T-scores; low scores are unfavourable. ' + einzel + ': borderline range T 31–35, clinical range T 30 and below; Total Competence and adaptive functioning: borderline range T 37–40, clinical range T 36 and below.' }[lang]);
    if (t3) { bl.push(t3); }
    infs.forEach(function (i) {
      var abs = beurteilerAbsatz(lang, i, ausw.je[i]);
      if (abs) { bl.push({ t: 'p', text: abs }); }
    });
    var vgl = vergleichAbsatz(lang, ausw, infs);
    if (vgl) { bl.push({ t: 'p', text: vgl }); }
    return bl;
  }
  /* Beurteiler, bei denen eine der Skalen die Bedingung erfüllt */
  function beurteilerMit(ausw, infs, ids, pruef) {
    return infs.filter(function (i) { return ids.some(function (id) { var z = zeileVon(ausw, i, id); return z && z.band && pruef(z.band.rang); }); });
  }
  /* Eine Zeile, nach Kategorien getrennt:
     „CBCL/6-18R und TRF/6-18R: Gesamtauffälligkeit im auffälligen Bereich (Elternurteil) bzw. im Grenzbereich (Lehrerurteil);
      übergeordnete Skalen im auffälligen Bereich: …; Syndromskalen im auffälligen Bereich: …, im Grenzbereich: …; …“ */
  function zusammenfassung(lang, ctx, d, ausw) {
    var infs = ausw.infs.filter(function (i) { return ausw.je[i].hatWerte; });
    if (!infs.length) { return ''; }
    function wer(liste) { return B.liste(liste.map(function (i) { return infName(i, lang); }), lang); }
    function mit(id, b) { return beurteilerMit(ausw, infs, [id], function (r) { return b === 'auff' ? r >= 2 : (b === 'grenz' ? r === 1 : r === 0); }); }
    var T = {
      de: { ges: 'Gesamtauffälligkeit', auff: 'im auffälligen Bereich', grenz: 'im Grenzbereich', ok: 'im unauffälligen Bereich', oder: ' bzw. ',
        kat: { ueb: 'übergeordnete Skalen', syn: 'Syndromskalen', dsm: 'DSM-orientierte Skalen' }, komp: 'auffällig niedrige Kompetenzwerte',
        keine: 'keine Problemskala im auffälligen Bereich', keineSonst: 'keine Skala im auffälligen Bereich', keineWeitere: 'keine weitere Skala im auffälligen Bereich' },
      fr: { ges: 'Total des problèmes', auff: 'dans la zone clinique', grenz: 'dans la zone limite', ok: 'dans la zone normale', oder: ', ',
        kat: { ueb: 'échelles globales', syn: 'échelles syndromiques', dsm: 'échelles orientées DSM' }, komp: 'compétences dans la zone clinique',
        keine: 'aucune échelle de problèmes dans la zone clinique', keineSonst: 'aucune échelle dans la zone clinique', keineWeitere: 'aucune autre échelle dans la zone clinique' },
      en: { ges: 'Total Problems', auff: 'in the clinical range', grenz: 'in the borderline range', ok: 'within the normal range', oder: ', ',
        kat: { ueb: 'broadband scales', syn: 'syndrome scales', dsm: 'DSM-oriented scales' }, komp: 'competence scores in the clinical range',
        keine: 'no problem scale in the clinical range', keineSonst: 'no scale in the clinical range', keineWeitere: 'no other scale in the clinical range' }
    }[lang];
    var teile = [];
    var ges = ['auff', 'grenz', 'ok'].map(function (b) { var l = mit('ges', b); return l.length ? T[b] + ' (' + wer(l) + ')' : ''; }).filter(Boolean);
    if (ges.length) { teile.push(T.ges + ' ' + ges.join(T.oder)); }
    var kat = 0;
    KATEGORIEN.filter(function (k) { return k.id !== 'ges'; }).forEach(function (k) {
      var auff = [], grenz = [];
      k.ids.forEach(function (id) {
        var a = mit(id, 'auff'), g = mit(id, 'grenz'), nm = B.t(NACH_ID[id].name, lang);
        if (a.length) { auff.push(nm + ' (' + wer(a) + ')'); } else if (g.length) { grenz.push(nm + ' (' + wer(g) + ')'); }
      });
      if (!auff.length && !grenz.length) { return; }
      kat++;
      teile.push(T.kat[k.id] + ' ' + (auff.length ? T.auff + ': ' + B.liste(auff, lang) + (grenz.length ? ', ' + T.grenz + ': ' + B.liste(grenz, lang) : '') : T.grenz + ': ' + B.liste(grenz, lang)));
    });
    if (!kat) { teile.push(!ges.length ? T.keine : (mit('ges', 'auff').length ? T.keineWeitere : T.keineSonst)); }
    var komp = [];
    KOMPETENZ.forEach(function (s) { var a = beurteilerMit(ausw, infs, [s.id], function (r) { return r >= 2; }); if (a.length) { komp.push(B.t(s.name, lang) + ' (' + wer(a) + ')'); } });
    if (komp.length) { teile.push(T.komp + ': ' + B.liste(komp, lang)); }
    return B.liste(infs.map(function (i) { return FORM[i]; }), lang) + ': ' + teile.join('; ') + '.';
  }
  /* „Der auffällige Wert der Skala X“ · „Die auffälligen Werte der Skalen X und Y sowie der übergeordneten Skala Z“
     (Plural, sobald mehrere Werte; Skalenart je Kategorie genannt) */
  function subjekt(lang, ausw, infs, ids) {
    var gruppen = { syn: [], dsm: [], ueb: [] }, paare = 0;
    ids.forEach(function (id) {
      var n = beurteilerMit(ausw, infs, [id], function (r) { return r >= 2; }).length;
      if (!n) { return; }
      paare += n;
      var art = NACH_ID[id].art;
      gruppen[art === 'syndrom' ? 'syn' : (art === 'dsm' ? 'dsm' : 'ueb')].push(B.t(NACH_ID[id].name, lang));
    });
    var W = {
      de: { syn: ['der Skala ', 'der Skalen '], dsm: ['der DSM-orientierten Skala ', 'der DSM-orientierten Skalen '], ueb: ['der übergeordneten Skala ', 'der übergeordneten Skalen '] },
      fr: { syn: ['à l’échelle ', 'aux échelles '], dsm: ['à l’échelle orientée DSM ', 'aux échelles orientées DSM '], ueb: ['à l’échelle globale ', 'aux échelles globales '] },
      en: { syn: ['on the scale ', 'on the scales '], dsm: ['on the DSM-oriented scale ', 'on the DSM-oriented scales '], ueb: ['on the broadband scale ', 'on the broadband scales '] }
    }[lang];
    var teile = ['syn', 'dsm', 'ueb'].filter(function (k) { return gruppen[k].length; }).map(function (k) { return W[k][gruppen[k].length > 1 ? 1 : 0] + B.liste(gruppen[k], lang); });
    var und = lang === 'fr' ? ' ainsi qu’' : (lang === 'en' ? ' as well as ' : ' sowie ');
    var liste = teile.length < 2 ? teile.join('') : teile.slice(0, -1).join(', ') + und + teile[teile.length - 1];
    var pl = paare > 1;
    return { s: (lang === 'fr' ? (pl ? 'Les scores élevés ' : 'Le score élevé ') : (lang === 'en' ? (pl ? 'The raised scores ' : 'The raised score ') : (pl ? 'Die auffälligen Werte ' : 'Der auffällige Wert '))) + liste, pl: pl };
  }
  function hinweise(lang, ctx, d, ausw) {
    var infs = ausw.infs.filter(function (i) { return ausw.je[i].hatWerte; });
    var h = [];
    function wer(ids) { return beurteilerMit(ausw, infs, ids, function (r) { return r >= 2; }); }
    function klammer(liste) { return ' (CBCL/TRF/YSR' + (lang === 'fr' ? ' ; ' : '; ') + B.liste(liste.map(function (i) { return infName(i, lang); }), lang) + ')'; }
    var ids = ['auf', 'dadh'], w = wer(ids), sj;
    if (w.length) {
      sj = subjekt(lang, ausw, infs, ids);
      h.push(lang === 'fr' ? sj.s + klammer(w) + (sj.pl ? ' justifient' : ' justifie') + ' un approfondissement à l’aide d’un instrument plus détaillé (p. ex. Conners 3 ou DISYPS-III), complété par l’anamnèse et l’observation dans plusieurs contextes.'
        : (lang === 'en' ? sj.s + klammer(w) + ' should be explored further with a more detailed instrument (e.g. Conners 3 or DISYPS-III), together with the developmental history and observation in several settings.'
          : sj.s + klammer(w) + (sj.pl ? ' sollten' : ' sollte') + ' mit einem ausführlicheren Verfahren (z. B. Conners 3 oder DISYPS-III) sowie über Entwicklungsgeschichte und Beobachtung in mehreren Lebensbereichen vertieft werden.'));
    }
    ids = ['aen', 'rue', 'int', 'daff', 'dang']; w = wer(ids);
    if (w.length) {
      sj = subjekt(lang, ausw, infs, ids);
      h.push(lang === 'fr' ? sj.s + klammer(w) + (sj.pl ? ' méritent d’être approfondis' : ' mérite d’être approfondi') + ' lors d’un entretien et, si nécessaire, à l’aide d’un questionnaire spécifique (p. ex. anxiété, humeur).'
        : (lang === 'en' ? sj.s + klammer(w) + ' should be explored in an interview and, if needed, with a specific questionnaire (e.g. anxiety, mood).'
          : sj.s + klammer(w) + (sj.pl ? ' sollten' : ' sollte') + ' im Gespräch und bei Bedarf mit einem spezifischen Fragebogen (z. B. zu Angst oder Stimmung) vertieft werden.'));
    }
    ids = ['reg', 'agg', 'ext', 'dopp', 'ddis']; w = wer(ids);
    if (w.length) {
      sj = subjekt(lang, ausw, infs, ids);
      h.push(lang === 'fr' ? sj.s + klammer(w) + (sj.pl ? ' méritent d’être précisés' : ' mérite d’être précisé') + ' par une description détaillée des situations dans lesquelles le comportement apparaît et par des entretiens avec les parents et l’enseignant·e.'
        : (lang === 'en' ? sj.s + klammer(w) + ' should be explored further through a detailed description of the situations in which the behaviour occurs and through discussions with the parents and the teacher.'
          : sj.s + klammer(w) + (sj.pl ? ' sollten' : ' sollte') + ' über eine genaue Beschreibung der Situationen, in denen das Verhalten auftritt, und im Gespräch mit Eltern und Lehrkraft vertieft werden.'));
    }
    w = wer(['den']);
    if (w.length) {
      var pl = w.length > 1;
      h.push(lang === 'fr' ? 'L’échelle Problèmes de la pensée regroupe des contenus variés (p. ex. sommeil, actes répétitifs, pensées ou perceptions inhabituelles). ' + (pl ? 'En cas de scores élevés' : 'En cas de score élevé') + klammer(w) + ', les réponses aux items concernés devraient être clarifiées lors d’un entretien.'
        : (lang === 'en' ? 'The Thought Problems scale covers varied content (e.g. sleep, repetitive acts, unusual thoughts or perceptions). Where it is raised' + klammer(w) + ', the underlying item responses should be clarified in an interview.'
          : 'Die Skala Denk-, (Schlaf-) und repetitive Probleme fasst unterschiedliche Inhalte zusammen (z. B. Schlaf, wiederholte Handlungen, ungewöhnliche Gedanken oder Wahrnehmungen). ' + (pl ? 'Bei auffälligen Werten' : 'Bei einem auffälligen Wert') + klammer(w) + ' sollten die zugrunde liegenden Einzelantworten im Gespräch geklärt werden.'));
    }
    w = wer(['koe', 'dkoe']);
    if (w.length) {
      h.push(lang === 'fr' ? 'En cas de scores élevés concernant les plaintes somatiques' + klammer(w) + ', un bilan pédiatrique est indiqué s’il n’a pas encore été réalisé.'
        : (lang === 'en' ? 'Where scores for somatic complaints are raised' + klammer(w) + ', a paediatric check-up is advisable if this has not yet taken place.'
          : 'Bei auffälligen Werten zu körperlichen Beschwerden' + klammer(w) + ' ist – falls noch nicht erfolgt – eine kinderärztliche Abklärung sinnvoll.'));
    }
    ids = ['soz']; w = wer(ids);
    if (w.length) {
      sj = subjekt(lang, ausw, infs, ids);
      h.push(lang === 'fr' ? sj.s + klammer(w) + (sj.pl ? ' méritent d’être approfondis' : ' mérite d’être approfondi') + ' par l’observation en groupe et par des entretiens (également avec l’enseignant·e) sur les relations avec les pairs.'
        : (lang === 'en' ? sj.s + klammer(w) + ' should be explored further through observation in a group setting and discussions (including with the teacher) about peer relationships.'
          : sj.s + klammer(w) + (sj.pl ? ' sollten' : ' sollte') + ' über Beobachtung in der Gruppe und Gespräche (auch mit der Lehrkraft) zu den Beziehungen mit Gleichaltrigen vertieft werden.'));
    }
    return h;
  }
  /* Kritische Items: sachlich, je Fragebogen, ohne Ableitung einer Gefährdung */
  function sicherheit(lang, d) {
    var ausw = auswerten(d), out = [];
    ausw.infs.forEach(function (inf) {
      ITEMS.forEach(function (it) {
        var v = ausw.je[inf].items[it.id];
        if (v == null || v < 1) { return; }
        var txt = B.t(it.text[inf], lang), bei = B.ersteGross(infBei(inf, lang)) + ' (' + FORM[inf] + ')';
        out.push(TX.satz(lang === 'fr' ? bei + ', l’item ' + it.nr + ' (' + txt + ') a été coté ' + v + ' (échelle de réponse de 0 à 2)'
          : (lang === 'en' ? bei + ', item ' + it.nr + ' (' + TX.q(txt, lang) + ') was rated ' + v + ' (response scale 0–2)'
            : bei + ' wurde Item ' + it.nr + ' (' + TX.q(txt, lang) + ') mit ' + v + ' beantwortet (Antwortskala 0–2)'), lang));
      });
    });
    return out;
  }
  function warnung(d, fall) {
    var k = (fall && fall.kind) || {}, a = B.alter(k.geburtsdatum, d.datum || ((fall && fall.bericht) || {}).datumVon), infs = aktive(d), w = [];
    if (a && infs.indexOf('selbst') >= 0 && (a.j < 11 || a.j > 18)) { w.push('Der YSR/11-18R ist für 11- bis 18-Jährige vorgesehen – das Kind ist ' + B.alterText(a, 'de') + ' alt.'); }
    if (a && (a.j < 6 || a.j > 18) && (infs.indexOf('eltern') >= 0 || infs.indexOf('lehrer') >= 0)) { w.push('CBCL/6-18R und TRF/6-18R sind für 6- bis 18-Jährige vorgesehen – das Kind ist ' + B.alterText(a, 'de') + ' alt.'); }
    infs.forEach(function (inf) {
      var n = (d.norm || {})[inf] || {}, gr = ALTER[n.alter];
      if (a && gr && (a.j < gr[0] || a.j > gr[1])) { w.push('Normgruppe ' + INF_KURZ[inf] + ': ' + gr[0] + '–' + gr[1] + ' Jahre passt nicht zum Alter (' + B.alterText(a, 'de') + ').'); }
      if ((n.geschlecht === 'm' || n.geschlecht === 'w') && (k.geschlecht === 'm' || k.geschlecht === 'w') && n.geschlecht !== k.geschlecht) {
        w.push('Normgruppe ' + INF_KURZ[inf] + ': ' + (n.geschlecht === 'm' ? 'Jungen' : 'Mädchen') + ' passt nicht zum angegebenen Geschlecht (' + (k.geschlecht === 'm' ? 'männlich' : 'weiblich') + ').');
      }
    });
    return w.join(' ');
  }
  function fertig(d) {
    var infs = aktive(d);
    if (!infs.length) { return false; }
    var a = auswerten(d);
    return infs.every(function (i) {
      var z = a.je[i].zeilen, ges = z.filter(function (x) { return x.id === 'ges'; })[0];
      return (ges && ges.wert != null) || z.filter(function (x) { return x.art === 'syndrom' && x.wert != null; }).length === SYNDROME.length;
    });
  }
  /* Übernahme aus der früheren Version: nur echte T-Werte (bei „Stanine“ keine Skalenwerte), dazu Items 18/91 */
  function ausAlt(alt) {
    var f = (alt && alt.fields) || {}, stanine = ((alt && alt.radios) || {})['cbcl-scale'] === 'stanine';
    var RATER = { parent: 'eltern', teacher: 'lehrer', self: 'selbst' };
    var SK = { anx: 'aen', wit: 'rue', som: 'koe', soc: 'soz', tho: 'den', att: 'auf', rul: 'reg', agg: 'agg', int: 'int', ext: 'ext', tot: 'ges' };
    var d = neu(), mit = [];
    Object.keys(RATER).forEach(function (r) {
      var inf = RATER[r], da = false;
      if (!stanine) {
        Object.keys(SK).forEach(function (k) {
          var v = f['cbcl-' + r + '-' + k], s = NACH_ID[SK[k]];
          if (v == null || v === '' || tWert(v, s) == null) { return; }
          d.w[inf].t[s.id] = String(B.num(v)); da = true;
        });
      }
      ['i18', 'i91'].forEach(function (k) {
        var v = f['cbcl-' + r + '-' + k];
        if (v != null && itemWert(v) != null) { d.items[inf][k] = String(B.num(v)); da = true; }
      });
      if (da) { mit.push(inf); }
    });
    if (!mit.length) { return null; }
    d.informanten = mit;
    return d;
  }

  KAT.registrieren({
    id: 'cbcl', kurz: 'CBCL/TRF/YSR', kurzUi: 'CBCL/TRF/YSR', name: TITEL, gruppe: 'verhalten', alter: [6, 18], informantenText: 'Eltern, Lehrkraft, Selbst (ab 11)',
    hilfe: 'Eine Spalte je Fragebogen (Eltern, Lehrkraft, Selbst). T-Werte – bei Bedarf auch Prozentränge – aus dem Auswertungsbogen bzw. dem Testauswerteprogramm übernehmen; das Tool rechnet keine Normwerte.',
    neu: neu, formular: formular, auswerten: auswerten, chip: chip, teilUpdate: teilUpdate, bericht: bericht, verfahrenZeile: verfahrenZeile,
    zusammenfassung: zusammenfassung, hinweise: hinweise, sicherheit: sicherheit, warnung: warnung, fertig: fertig, ausAlt: ausAlt,
    pruefen: [
      'Skalennamen nach der Verlagsbeschreibung (Hogrefe/Testzentrale): „Ängstlich/depressiv“, „Rückzüglich/depressiv“, „Körperliche Beschwerden“, „Soziale Probleme“, „Denk-, (Schlaf-) und repetitive Probleme“, „Aufmerksamkeitsprobleme“, „Regelverletzendes Verhalten“, „Aggressives Verhalten“; übergeordnet „Internale Probleme“, „Externale Probleme“, „Gesamtauffälligkeit“. Schreibweise und die Form von „Denk-, (Schlaf-) und repetitive Probleme“ je Fragebogen am Auswertungsbogen bestätigen (die TRF enthält vermutlich keine Schlaf-Items).',
      'Grenzwerte: Syndrom- und DSM-orientierte Skalen Grenzbereich T 65–69, auffällig ab T 70; übergeordnete Skalen Grenzbereich T 60–63, auffällig ab T 64 (ASEBA; für die Gesamtauffälligkeit in Studien mit der deutschen Ausgabe so verwendet). Laut Verlag wurden „für einige Skalen die Cut-off-Werte angepasst“ – welche?',
      'Kompetenzskalen: deutsche Namen („Aktivitäten“, „Soziale Kompetenz“, „Schule“, „Gesamtkompetenz“) und Grenzen (hier nach US-Manual: einzelne Skalen Grenzbereich T 31–35, auffällig bis T 30; Gesamtkompetenz T 37–40 bzw. bis T 36). YSR: gibt es eine Skala „Schule“? (US-YSR: nein, die Schulleistung geht in die Gesamtkompetenz ein.)',
      'TRF „Adaptive Funktionen“: Namen („Schulische Leistung“, „Adaptive Funktionen gesamt“), Grenzen (hier wie Gesamtkompetenz) und ob die vier Einzelmerkmale (Anstrengung, angemessenes Verhalten, Lernen, Zufriedenheit) eigene T-Werte haben.',
      'DSM-orientierte Skalen: Namen laut Verlagsbeschreibung („Affektive Symptome“, „Angstsymptome“, „Körperliche Symptome“, „Unaufmerksamkeits-Hyperaktivitätssymptome“, „Oppositionelle Verhaltenssymptome“, „Dissoziale Symptome“) am Auswertungsbogen bestätigen.',
      'Normgruppen: CBCL laut Verlag Jungen/Mädchen, 6–11 und 12–18 Jahre; YSR Jungen/Mädchen (hier eine Altersgruppe 11–18 Jahre – prüfen); TRF: deutsche Vergleichswerte nur für Grundschulkinder 6–11 Jahre (Großstadtstichprobe, N = 397) – welche Normen gelten für 12- bis 18-Jährige?',
      'Eingabebereiche: Syndrom- und DSM-orientierte Skalen T 50–100 (ASEBA: niedrigere T-Werte werden auf 50 gesetzt), übergeordnete Skalen T 20–100, Kompetenzskalen T 10–80 – an den Normtabellen der deutschen Ausgabe bestätigen.',
      'Wortlaut der Items 18 und 91 je Fragebogen (CBCL/TRF: „verletzt sich absichtlich selbst oder versucht Suizid“, „spricht davon, sich umzubringen“; YSR in der Ich-Form, Item 91 „denkt daran, sich umzubringen“) am deutschen Fragebogen bestätigen; FR-Umschreibung der Items prüfen.',
      'Französische Skalennamen (ASEBA-Übersetzung, z. B. „Comportement de transgression des règles“, „Total des problèmes“, DSM-orientierte Skalen) an der französischen Fassung bestätigen.',
      'Die deutsche Ausgabe bietet zusätzlich einen Vergleich mit klinischen Stichproben (Stanine und Prozentränge, eigener Auswertungsbogen). Das sind keine Bevölkerungsnormen; sie werden hier bewusst nicht erfasst. Bei Bedarf als eigenen, klar getrennten Teil ergänzen.',
      'TRF: Unterskalen der Aufmerksamkeitsprobleme (US: Inattention, Hyperactivity-Impulsivity) – in der deutschen Ausgabe vorhanden und gewünscht?',
      'Falls im CDSE auch andere Normen genutzt werden (z. B. ASEBA-Software mit multikulturellen Normen bei französischen Fragebögen): Auswahl „Normen“ ergänzen – der Bericht nennt derzeit die Normen der deutschen Ausgabe.'
    ]
  });
})();
