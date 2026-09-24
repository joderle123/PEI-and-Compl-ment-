/* =====================================================================
   Katalog: alle Verfahren und ihre Einstufungen (Bänder)
   ---------------------------------------------------------------------
   Jedes Verfahren meldet sich mit KAT.registrieren({...}) an (Dateien
   20-… bis 39-…). Namen, Kürzel und Grenzwerte stehen NUR dort bzw. hier –
   Eingabe, Tabellen und Berichtstext lesen aus derselben Quelle.
   Angaben, die noch am Manual/Protokollbogen zu prüfen sind, tragen
   pruefen: '…' und erscheinen in der App unter „Über das Tool“.
   ===================================================================== */
var KAT = (function () {
  var tests = {}, reihenfolge = [];
  var GRUPPEN = [
    { id: 'verhalten', name: 'Verhalten und Emotionen (Fragebögen)' },
    { id: 'intelligenz', name: 'Intelligenz und kognitive Fähigkeiten' },
    { id: 'aufmerksamkeit', name: 'Aufmerksamkeit und Konzentration' },
    { id: 'emotion', name: 'Emotionen, Angst und Stimmung' },
    { id: 'adaptiv', name: 'Alltagsfertigkeiten (adaptives Verhalten)' }
  ];
  function registrieren(def) {
    if (!def || !def.id) { throw new Error('Verfahren ohne id'); }
    tests[def.id] = def;
    if (reihenfolge.indexOf(def.id) < 0) { reihenfolge.push(def.id); }
  }
  function test(id) { return tests[id] || null; }
  function alle() { return reihenfolge.map(function (id) { return tests[id]; }); }

  /* ---------------- Bänder ----------------
     art: 'problem'   hoher Wert = ungünstig (rang 0 unauffällig … 3 sehr hoch)
          'ressource' hoher Wert = günstig   (rang 0 unauffällig … 3 sehr niedrig)
          'leistung'  Mitte = Durchschnitt   (rang -3 … +3)
     stufen: aufsteigend nach Wert; bis = Obergrenze (einschließlich) */
  var L = function (de, fr, en) { return { de: de, fr: fr, en: en }; };
  var BAENDER = {
    /* Wechsler-Indizes (WISC-V, M 100, SD 15) – 7 Stufen wie im Manual */
    'wechsler-7': { art: 'leistung', pruefen: 'Deutsche Bezeichnungen der 7 Stufen am WISC-V-Manual (Petermann 2017) prüfen; FR laut ECPA, EN laut Pearson.', stufen: [
      { bis: 69, rang: -3, name: L('sehr niedrig', 'très faible', 'extremely low') },
      { bis: 79, rang: -2, name: L('niedrig', 'faible', 'very low') },
      { bis: 89, rang: -1, name: L('unterer Durchschnitt', 'moyen faible', 'low average') },
      { bis: 109, rang: 0, name: L('Durchschnitt', 'moyen', 'average') },
      { bis: 119, rang: 1, name: L('oberer Durchschnitt', 'moyen fort', 'high average') },
      { bis: 129, rang: 2, name: L('hoch', 'élevé', 'very high') },
      { bis: Infinity, rang: 3, name: L('sehr hoch', 'très élevé', 'extremely high') }] },
    /* Allgemeine IQ-/Indexwerte (M 100, SD 15) – 5 Stufen */
    'iq-5': { art: 'leistung', stufen: [
      { bis: 69, rang: -2, name: L('weit unterdurchschnittlich', 'très inférieur à la moyenne', 'well below average') },
      { bis: 84, rang: -1, name: L('unterdurchschnittlich', 'inférieur à la moyenne', 'below average') },
      { bis: 115, rang: 0, name: L('durchschnittlich', 'dans la moyenne', 'average') },
      { bis: 130, rang: 1, name: L('überdurchschnittlich', 'supérieur à la moyenne', 'above average') },
      { bis: Infinity, rang: 2, name: L('weit überdurchschnittlich', 'très supérieur à la moyenne', 'well above average') }] },
    /* Wertpunkte (M 10, SD 3) */
    'wp': { art: 'leistung', stufen: [
      { bis: 4, rang: -2, name: L('deutlich unter dem Durchschnitt', 'nettement inférieur à la moyenne', 'well below average') },
      { bis: 7, rang: -1, name: L('unter dem Durchschnitt', 'inférieur à la moyenne', 'below average') },
      { bis: 12, rang: 0, name: L('Durchschnitt', 'dans la moyenne', 'average') },
      { bis: 15, rang: 1, name: L('über dem Durchschnitt', 'supérieur à la moyenne', 'above average') },
      { bis: Infinity, rang: 2, name: L('deutlich über dem Durchschnitt', 'nettement supérieur à la moyenne', 'well above average') }] },
    /* Standardwerte (M 100, SD 10), z. B. d2-R */
    'sw-10': { art: 'leistung', pruefen: 'Interpretationsbänder für d2-R-Standardwerte am Manual prüfen (hier: statistisch nach Standardabweichung).', stufen: [
      { bis: 79, rang: -2, name: L('weit unterdurchschnittlich', 'très inférieur à la moyenne', 'well below average') },
      { bis: 89, rang: -1, name: L('unterdurchschnittlich', 'inférieur à la moyenne', 'below average') },
      { bis: 110, rang: 0, name: L('durchschnittlich', 'dans la moyenne', 'average') },
      { bis: 120, rang: 1, name: L('überdurchschnittlich', 'supérieur à la moyenne', 'above average') },
      { bis: Infinity, rang: 2, name: L('weit überdurchschnittlich', 'très supérieur à la moyenne', 'well above average') }] },
    /* Prozentränge bei Leistungstests */
    'pr-leistung': { art: 'leistung', stufen: [
      { bis: 2, rang: -2, name: L('weit unterdurchschnittlich', 'très inférieur à la moyenne', 'well below average') },
      { bis: 15, rang: -1, name: L('unterdurchschnittlich', 'inférieur à la moyenne', 'below average') },
      { bis: 84, rang: 0, name: L('durchschnittlich', 'dans la moyenne', 'average') },
      { bis: 97, rang: 1, name: L('überdurchschnittlich', 'supérieur à la moyenne', 'above average') },
      { bis: Infinity, rang: 2, name: L('weit überdurchschnittlich', 'très supérieur à la moyenne', 'well above average') }] },
    /* T-Werte bei Leistung/Ressourcen (M 50, SD 10) */
    't-leistung': { art: 'leistung', stufen: [
      { bis: 29, rang: -2, name: L('weit unterdurchschnittlich', 'très inférieur à la moyenne', 'well below average') },
      { bis: 39, rang: -1, name: L('unterdurchschnittlich', 'inférieur à la moyenne', 'below average') },
      { bis: 60, rang: 0, name: L('durchschnittlich', 'dans la moyenne', 'average') },
      { bis: 70, rang: 1, name: L('überdurchschnittlich', 'supérieur à la moyenne', 'above average') },
      { bis: Infinity, rang: 2, name: L('weit überdurchschnittlich', 'très supérieur à la moyenne', 'well above average') }] },
    /* T-Werte bei Problemskalen allgemein (M 50, SD 10): statistische Einordnung */
    't-problem': { art: 'problem', stufen: [
      { bis: 59, rang: 0, name: L('unauffällig', 'dans la norme', 'within normal limits') },
      { bis: 69, rang: 1, name: L('erhöht', 'élevé', 'elevated') },
      { bis: Infinity, rang: 2, name: L('deutlich erhöht', 'nettement élevé', 'markedly elevated') }] },
    /* Stanine bei Problemskalen (DISYPS-III, AFS): statistische Einordnung, Grenze laut Manual prüfen */
    'stanine-problem': { art: 'problem', pruefen: 'Auffälligkeitsgrenze der Stanine-Werte am Manual prüfen (hier statistisch: 7 = oberes Viertel, 8–9 = obere 11 %).', stufen: [
      { bis: 6, rang: 0, name: L('im Durchschnittsbereich oder darunter', 'dans la moyenne ou en dessous', 'average or below') },
      { bis: 7, rang: 1, name: L('leicht erhöht', 'légèrement élevé', 'slightly elevated') },
      { bis: 8, rang: 2, name: L('erhöht', 'élevé', 'elevated') },
      { bis: Infinity, rang: 3, name: L('stark erhöht', 'très élevé', 'very elevated') }] },
    /* Stanine allgemein (für Kompetenz/Leistung) */
    'stanine': { art: 'leistung', stufen: [
      { bis: 1, rang: -2, name: L('weit unterdurchschnittlich', 'très inférieur à la moyenne', 'well below average') },
      { bis: 3, rang: -1, name: L('unterdurchschnittlich', 'inférieur à la moyenne', 'below average') },
      { bis: 6, rang: 0, name: L('durchschnittlich', 'dans la moyenne', 'average') },
      { bis: 8, rang: 1, name: L('überdurchschnittlich', 'supérieur à la moyenne', 'above average') },
      { bis: Infinity, rang: 2, name: L('weit überdurchschnittlich', 'très supérieur à la moyenne', 'well above average') }] }
  };
  function band(id) { return BAENDER[id] || null; }
  function bandDefinieren(id, def) { BAENDER[id] = def; }
  /* Einstufung eines Werts: {rang, name, klasse} oder null */
  function einstufen(bandId, wert) {
    var b = typeof bandId === 'string' ? BAENDER[bandId] : bandId;
    if (!b || wert == null || isNaN(wert)) { return null; }
    for (var i = 0; i < b.stufen.length; i++) {
      var s = b.stufen[i];
      if (wert <= s.bis) { return { rang: s.rang, name: s.name, art: b.art, klasse: klasse(b.art, s.rang), index: i }; }
    }
    return null;
  }
  /* Farbe des Chips */
  function klasse(art, rang) {
    if (art === 'problem' || art === 'ressource') { return rang >= 3 ? 'stark' : (rang === 2 ? 'auff' : (rang === 1 ? 'grenz' : 'ok')); }
    if (rang <= -2) { return 'auff'; }
    if (rang === -1) { return 'niedrig'; }
    if (rang === 0) { return 'ok'; }
    return 'hoch';
  }
  /* Bänder aus Grenzwerten bauen (für Tests mit eigenen Grenzen je Skala, z. B. SDQ) */
  function problemBand(grenzen, namen) {
    /* grenzen: Obergrenzen der Stufen 0..n-2 (die letzte ist offen) */
    return { art: 'problem', stufen: grenzen.map(function (g, i) { return { bis: g, rang: i, name: namen[i] }; })
      .concat([{ bis: Infinity, rang: grenzen.length, name: namen[grenzen.length] }]) };
  }
  function ressourceBand(grenzenAbsteigend, namen) {
    /* Für Skalen, bei denen NIEDRIG ungünstig ist: grenzen = Untergrenzen (absteigend) der Stufen 0..n-2 */
    var n = grenzenAbsteigend.length, st = [];
    /* aufsteigend aufbauen: niedrigster Bereich = höchster Rang */
    for (var r = n; r >= 1; r--) { st.push({ bis: grenzenAbsteigend[r - 1] - 1, rang: r, name: namen[r] }); }
    st.push({ bis: Infinity, rang: 0, name: namen[0] });
    return { art: 'ressource', stufen: st };
  }
  return { registrieren: registrieren, test: test, alle: alle, GRUPPEN: GRUPPEN, band: band, bandDefinieren: bandDefinieren,
    einstufen: einstufen, klasse: klasse, problemBand: problemBand, ressourceBand: ressourceBand, L: L };
})();
