/* =====================================================================
   Textbausteine für die Ergebnisse – DE / FR / EN
   ---------------------------------------------------------------------
   Gemeinsame Sätze für Fragebögen (Skalen × Beurteiler) und
   Leistungstests (Indizes), damit alle Verfahren gleich sauber
   formuliert sind. Keine Diagnosen, keine ICD-Codes.
   ===================================================================== */
var TX = (function () {
  var EINHEIT = {
    roh: { de: 'Rohwert', fr: 'score brut', en: 'raw score' },
    T: { de: 'T-Wert', fr: 'note T', en: 'T-score' },
    stanine: { de: 'Stanine', fr: 'stanine', en: 'stanine' },
    wp: { de: 'Wertpunkte', fr: 'note standard', en: 'scaled score' },
    index: { de: 'Indexwert', fr: 'note composite', en: 'index score' },
    iq: { de: 'IQ', fr: 'QI', en: 'IQ' },
    sw: { de: 'Standardwert', fr: 'note standard', en: 'standard score' },
    pr: { de: 'PR', fr: 'rang centile', en: 'percentile rank' },
    v: { de: 'v-Wert', fr: 'note v', en: 'v-scale score' }
  };
  function einheit(m, lang) { return B.t(EINHEIT[m] || { de: m }, lang); }
  function q(s, lang) { return lang === 'fr' ? '«' + B.NBSP + s + B.NBSP + '»' : (lang === 'en' ? '“' + s + '”' : '„' + s + '“'); }
  function satz(s, lang) {
    s = String(s || '').trim(); if (!s) { return ''; }
    s = B.ersteGross(s);
    if (!/[.!?:]$/.test(s)) { s += '.'; }
    return lang === 'fr' ? B.frTypo(s) : s;
  }
  /* „A (Rohwert 8; hoch)“ */
  function wertKlammer(z, lang, mitBand) {
    var teile = [];
    if (z.wert != null) { teile.push(einheit(z.metrik, lang) + ' ' + B.zahl(z.wert, lang)); }
    if (z.pr != null) { teile.push((lang === 'en' ? 'PR' : einheit('pr', lang)) + ' ' + B.zahl(z.pr, lang)); }
    if (mitBand !== false && z.band) { teile.push(B.t(z.band.name, lang)); }
    return teile.length ? ' (' + teile.join('; ') + ')' : '';
  }
  var BEREICH = {
    auff: { de: 'im auffälligen Bereich', fr: 'dans la zone clinique', en: 'in the clinical range' },
    grenz: { de: 'im Grenzbereich', fr: 'dans la zone limite', en: 'in the borderline range' },
    ok: { de: 'im unauffälligen Bereich', fr: 'dans la zone normale', en: 'within the normal range' }
  };
  /* Skalen eines Beurteilers nach Bereich gruppieren */
  function gruppieren(zeilen) {
    var g = { auff: [], grenz: [], ok: [] };
    zeilen.forEach(function (z) {
      if (!z.band) { return; }
      var r = z.band.rang;
      if (r >= 2) { g.auff.push(z); } else if (r === 1) { g.grenz.push(z); } else { g.ok.push(z); }
    });
    return g;
  }
  /* Satz: „Im Elternurteil liegen die Skalen A (…) und B (…) im auffälligen Bereich.“ */
  function bereichSatz(lang, beiWem, liste, bereich) {
    var n = liste.length;
    var namen = liste.map(function (z) { return B.t(z.name, lang) + wertKlammer(z, lang); });
    if (lang === 'fr') {
      return n === 1 ? beiWem + ', l’échelle ' + namen[0] + ' se situe ' + B.t(BEREICH[bereich], lang)
        : beiWem + ', les échelles ' + B.liste(namen, lang) + ' se situent ' + B.t(BEREICH[bereich], lang);
    }
    if (lang === 'en') {
      return n === 1 ? beiWem + ', the scale ' + namen[0] + ' is ' + B.t(BEREICH[bereich], lang)
        : beiWem + ', the scales ' + B.liste(namen, lang) + ' are ' + B.t(BEREICH[bereich], lang);
    }
    return n === 1 ? beiWem + ' liegt die Skala ' + namen[0] + ' ' + B.t(BEREICH[bereich], lang)
      : beiWem + ' liegen die Skalen ' + B.liste(namen, lang) + ' ' + B.t(BEREICH[bereich], lang);
  }
  /* Absatz für EINEN Beurteiler eines Fragebogens */
  function fragebogenAbsatz(lang, beiWem, zeilen) {
    var g = gruppieren(zeilen), s = [];
    if (!g.auff.length && !g.grenz.length) {
      if (!g.ok.length) { return ''; }
      s.push(lang === 'fr' ? beiWem + ', toutes les échelles se situent dans la zone normale'
        : (lang === 'en' ? beiWem + ', all scales are within the normal range' : beiWem + ' liegen alle Skalen im unauffälligen Bereich'));
      return s.map(function (x) { return satz(x, lang); }).join(' ');
    }
    if (g.auff.length) { s.push(bereichSatz(lang, beiWem, g.auff, 'auff')); }
    if (g.grenz.length) {
      var bw = g.auff.length ? (lang === 'fr' ? 'En outre' : (lang === 'en' ? 'In addition' : 'Außerdem')) : beiWem;
      s.push(bereichSatz(lang, bw, g.grenz, 'grenz'));
    }
    if (g.ok.length) {
      s.push(lang === 'fr' ? 'Les autres échelles se situent dans la zone normale'
        : (lang === 'en' ? 'The other scales are within the normal range' : 'Die übrigen Skalen liegen im unauffälligen Bereich'));
    }
    return s.map(function (x) { return satz(x, lang); }).join(' ');
  }
  /* Vergleich mehrerer Beurteiler: übereinstimmend / nur bei einem.
     Namen stehen als Liste nach dem Doppelpunkt – so passt der Satz für
     Skalen wie für Gesamtwerte. */
  function vergleichAbsatz(lang, zeilenJeInf, infIds, skalen) {
    if (infIds.length < 2) { return ''; }
    var gemeinsam = [], einzeln = [];
    function zeile(i, id) { return (zeilenJeInf[i] || []).filter(function (x) { return x.id === id; })[0]; }
    skalen.forEach(function (sk) {
      var hoch = infIds.filter(function (i) { var z = zeile(i, sk.id); return z && z.band && z.band.rang >= 2; });
      var bewertet = infIds.filter(function (i) { var z = zeile(i, sk.id); return z && z.band; });
      if (hoch.length >= 2) { gemeinsam.push(B.t(sk.name, lang) + ' (' + B.liste(hoch.map(function (i) { return infName(i, lang); }), lang) + ')'); }
      else if (hoch.length === 1 && bewertet.length >= 2) { einzeln.push({ name: B.t(sk.name, lang), inf: hoch[0] }); }
    });
    var s = [];
    var wer = B.liste(infIds.map(function (i) { return infName(i, lang); }), lang);
    if (gemeinsam.length) {
      s.push(lang === 'fr' ? 'Zone clinique dans plusieurs évaluations : ' + gemeinsam.join('; ')
        : (lang === 'en' ? 'Clinical range in more than one rating: ' + gemeinsam.join('; ')
          : 'Übereinstimmend im auffälligen Bereich: ' + gemeinsam.join('; ')));
    }
    if (einzeln.length) {
      var teile = einzeln.map(function (e) { return e.name + ' (' + infBei(e.inf, lang) + ')'; });
      s.push(lang === 'fr' ? 'Zone clinique dans une seule évaluation : ' + teile.join('; ')
        : (lang === 'en' ? 'Clinical range in only one rating: ' + teile.join('; ')
          : 'Nur in einem Urteil auffällig: ' + teile.join('; ')));
    }
    if (!gemeinsam.length && !einzeln.length) {
      s.push(lang === 'fr' ? 'Les évaluations (' + wer + ') ne font pas apparaître de divergence importante'
        : (lang === 'en' ? 'The ratings (' + wer + ') show no marked differences'
          : 'Die Urteile (' + wer + ') weichen nicht wesentlich voneinander ab'));
    }
    if (einzeln.length) {
      s.push(lang === 'fr' ? 'Des différences entre les évaluateur·rice·s sont fréquentes ; elles peuvent refléter des exigences différentes selon le contexte (famille, école)'
        : (lang === 'en' ? 'Differences between raters are common and may reflect different demands in different settings (home, school)'
          : 'Unterschiede zwischen Beurteilern sind häufig; sie können auf unterschiedliche Anforderungen in den Lebensbereichen (Familie, Schule) hinweisen'));
    }
    return s.map(function (x) { return satz(x, lang); }).join(' ');
  }
  /* Leistungstest: Gesamtwert-Satz */
  function gesamtSatz(lang, z, kurzName) {
    var teile = [];
    if (z.pr != null) { teile.push((lang === 'en' ? 'percentile rank ' : (lang === 'fr' ? 'rang centile ' : 'PR ')) + B.zahl(z.pr, lang)); }
    if (z.ki) { teile.push((lang === 'en' ? z.ki.niveau + '% CI ' : (lang === 'fr' ? 'IC ' + z.ki.niveau + ' % ' : 'KI ' + z.ki.niveau + ' % ')) + B.zahl(z.ki.von, lang) + '–' + B.zahl(z.ki.bis, lang)); }
    var klammer = teile.length ? ' (' + teile.join('; ') + ')' : '';
    var bn = z.band ? B.t(z.band.name, lang) : '';
    if (lang === 'fr') { return satz('Le ' + kurzName + ' se situe à ' + B.zahl(z.wert, lang) + klammer + (bn ? ', soit dans la zone ' + q(bn, lang) : ''), lang); }
    if (lang === 'en') { return satz('The ' + kurzName + ' is ' + B.zahl(z.wert, lang) + klammer + (bn ? ', which falls in the ' + bn + ' range' : ''), lang); }
    return satz('Der ' + kurzName + ' liegt bei ' + B.zahl(z.wert, lang) + klammer + (bn ? ' und damit im Bereich ' + q(bn, lang) : ''), lang);
  }
  /* Leistungstest: Indizes nach Band gruppiert */
  function indexSaetze(lang, zeilen) {
    var gruppen = [], nachBand = {};
    zeilen.forEach(function (z) {
      if (!z.band) { return; }
      var k = z.band.rang;
      if (!nachBand[k]) { nachBand[k] = { band: z.band, liste: [] }; gruppen.push(k); }
      nachBand[k].liste.push(z);
    });
    gruppen.sort(function (a, b) { return b - a; });
    return gruppen.map(function (k) {
      var g = nachBand[k], n = g.liste.length, bn = B.t(g.band.name, lang);
      var namen = g.liste.map(function (z) { return B.t(z.name, lang) + ' (' + (z.kurz ? B.t(z.kurz, lang) + ' ' : '') + B.zahl(z.wert, lang) + (z.pr != null ? '; ' + (lang === 'en' ? 'PR' : (lang === 'fr' ? 'rang centile' : 'PR')) + ' ' + B.zahl(z.pr, lang) : '') + ')'; });
      if (lang === 'fr') { return satz((n === 1 ? 'L’indice suivant se situe' : 'Les indices suivants se situent') + ' dans la zone ' + q(bn, lang) + ' : ' + B.liste(namen, lang), lang); }
      if (lang === 'en') { return satz((n === 1 ? 'The following index falls' : 'The following indices fall') + ' in the ' + bn + ' range: ' + B.liste(namen, lang), lang); }
      return satz((n === 1 ? 'Im Bereich ' + q(bn, lang) + ' liegt der Index ' : 'Im Bereich ' + q(bn, lang) + ' liegen die Indizes ') + B.liste(namen, lang), lang);
    }).join(' ');
  }
  /* Streuung der Indexwerte (nur beschreibend) */
  function streuungSatz(lang, zeilen, grenze) {
    var z = zeilen.filter(function (x) { return x.wert != null; });
    if (z.length < 3) { return ''; }
    var max = z.reduce(function (a, b) { return b.wert > a.wert ? b : a; }), min = z.reduce(function (a, b) { return b.wert < a.wert ? b : a; });
    var d = max.wert - min.wert;
    if (d < (grenze || 15)) { return ''; }
    var s = lang === 'fr'
      ? 'L’écart entre l’indice le plus élevé (' + B.t(max.name, lang) + ', ' + max.wert + ') et le plus bas (' + B.t(min.name, lang) + ', ' + min.wert + ') est de ' + d + ' points'
      : (lang === 'en' ? 'There is a difference of ' + d + ' points between the highest index (' + B.t(max.name, lang) + ', ' + max.wert + ') and the lowest (' + B.t(min.name, lang) + ', ' + min.wert + ')'
        : 'Zwischen dem höchsten (' + B.t(max.name, lang) + ', ' + max.wert + ') und dem niedrigsten Indexwert (' + B.t(min.name, lang) + ', ' + min.wert + ') liegen ' + d + ' Punkte');
    var zusatz = '';
    if (d >= 23) {
      zusatz = ' ' + satz(lang === 'fr' ? 'Avec une dispersion aussi importante, le score global réunit des performances très hétérogènes ; le profil des indices est plus informatif'
        : (lang === 'en' ? 'With such a wide spread, the overall score combines very uneven abilities; the index profile is more informative'
          : 'Bei einer so großen Streuung fasst der Gesamtwert sehr unterschiedliche Leistungen zusammen; das Profil der Indexwerte ist aussagekräftiger'), lang);
    }
    return satz(s, lang) + zusatz;
  }
  return { einheit: einheit, q: q, satz: satz, wertKlammer: wertKlammer, gruppieren: gruppieren, fragebogenAbsatz: fragebogenAbsatz,
    vergleichAbsatz: vergleichAbsatz, gesamtSatz: gesamtSatz, indexSaetze: indexSaetze, streuungSatz: streuungSatz, BEREICH: BEREICH };
})();
