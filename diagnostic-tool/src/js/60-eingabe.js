/* =====================================================================
   Eingabe: Bausteine für Formulare, gebunden an den Fall (FALL)
   ---------------------------------------------------------------------
   Jedes Eingabefeld trägt data-pfad="tests.sdq.werte.eltern.em" o. ä.
   Beim Tippen wird der Wert in FALL geschrieben (als Text), gespeichert
   und Einstufung + Vorschau werden aktualisiert.
   ===================================================================== */
var E = (function () {
  function hol(obj, pfad) {
    return String(pfad).split('.').reduce(function (o, k) { return o == null ? undefined : o[k]; }, obj);
  }
  function setz(obj, pfad, wert) {
    var teile = String(pfad).split('.'), o = obj;
    for (var i = 0; i < teile.length - 1; i++) { if (o[teile[i]] == null || typeof o[teile[i]] !== 'object') { o[teile[i]] = {}; } o = o[teile[i]]; }
    o[teile[teile.length - 1]] = wert;
  }
  function wert(pfad) { var v = hol(FALL, pfad); return v == null ? '' : v; }
  function attr(o) { return Object.keys(o || {}).map(function (k) { return o[k] === true ? ' ' + k : (o[k] === false || o[k] == null ? '' : ' ' + k + '="' + B.esc(o[k]) + '"'); }).join(''); }

  function feld(pfad, label, opt) {
    opt = opt || {};
    var typ = opt.typ || 'text';
    var a = { 'data-pfad': pfad, type: typ, value: wert(pfad), placeholder: opt.platzhalter || '', autocomplete: 'off', inputmode: opt.inputmode, id: opt.id };
    if (opt.min != null) { a['data-min'] = opt.min; }
    if (opt.max != null) { a['data-max'] = opt.max; }
    if (opt.ganz) { a['data-ganz'] = '1'; }
    return '<label class="feld' + (opt.voll ? ' voll' : '') + '"><span>' + B.esc(label) + '</span><input' + attr(a) + '>' + (opt.hilfe ? '<small>' + opt.hilfe + '</small>' : '') + '</label>';
  }
  function textfeld(pfad, label, opt) {
    opt = opt || {};
    return '<label class="feld voll"><span>' + B.esc(label) + '</span><textarea data-pfad="' + B.esc(pfad) + '" rows="' + (opt.zeilen || 4) + '" placeholder="' + B.esc(opt.platzhalter || '') + '">' + B.esc(wert(pfad)) + '</textarea>' + (opt.hilfe ? '<small>' + opt.hilfe + '</small>' : '') + '</label>';
  }
  function auswahl(pfad, label, optionen, opt) {
    opt = opt || {};
    var w = String(wert(pfad));
    return '<label class="feld' + (opt.voll ? ' voll' : '') + '"><span>' + B.esc(label) + '</span><select data-pfad="' + B.esc(pfad) + '"' + (opt.neu ? ' data-neu="1"' : '') + '>' +
      (opt.leer != null ? '<option value="">' + B.esc(opt.leer) + '</option>' : '') +
      optionen.map(function (o) { return '<option value="' + B.esc(o[0]) + '"' + (String(o[0]) === w ? ' selected' : '') + '>' + B.esc(o[1]) + '</option>'; }).join('') +
      '</select>' + (opt.hilfe ? '<small>' + opt.hilfe + '</small>' : '') + '</label>';
  }
  function haken(pfad, label, klein, neu) {
    return '<label class="haken"><input type="checkbox" data-pfad="' + B.esc(pfad) + '"' + (neu ? ' data-neu="1"' : '') + (wert(pfad) === true ? ' checked' : '') + '><span>' + label + (klein ? '<small>' + klein + '</small>' : '') + '</span></label>';
  }
  /* Auswahlknöpfe (Chips); „an“ markiert die gewählten auch in Browsern ohne :has() */
  function wahlen(pfad, optionen, mehrfach, neu, kl) {
    var w = wert(pfad), liste = Array.isArray(w) ? w : (w ? [w] : []);
    return '<div class="wahlreihe' + (kl ? ' ' + kl : '') + '">' + optionen.map(function (o) {
      var an = liste.indexOf(o[0]) >= 0;
      return '<label class="wahl' + (an ? ' an' : '') + '"><input type="' + (mehrfach ? 'checkbox' : 'radio') + '" name="' + B.esc(pfad) + '" data-pfad="' + B.esc(pfad) + '" data-wert="' + B.esc(o[0]) + '"' + (mehrfach ? ' data-mehrfach="1"' : '') + (neu ? ' data-neu="1"' : '') + (an ? ' checked' : '') + '>' + B.esc(o[1]) + '</label>';
    }).join('') + '</div>';
  }
  /* Sprache wählen: gespeichert wird der Code (de, fr, lb …); ein früher frei
     eingegebener Text wird erkannt oder bleibt als eigene Option erhalten */
  function sprachAuswahl(pfad, label, opt) {
    opt = opt || {};
    var w = String(wert(pfad) || ''), codes = SPRACHEN_LISTE.map(function (x) { return x[0]; });
    var gewaehlt = codes.indexOf(w) >= 0 ? w : (spracheErkennen(w) || w);
    var optionen = SPRACHEN_LISTE.filter(function (x) { return !opt.nur || opt.nur.indexOf(x[0]) >= 0 || x[0] === gewaehlt; }).map(function (x) { return [x[0], x[1]]; });
    if (gewaehlt && codes.indexOf(gewaehlt) < 0) { optionen.push([gewaehlt, gewaehlt + ' (frei eingegeben)']); }
    return '<label class="feld' + (opt.voll ? ' voll' : '') + '"><span>' + B.esc(label) + '</span><select data-pfad="' + B.esc(pfad) + '"' + (opt.neu ? ' data-neu="1"' : '') + '>' +
      '<option value="">' + B.esc(opt.leer || '– bitte wählen –') + '</option>' +
      optionen.map(function (o) { return '<option value="' + B.esc(o[0]) + '"' + (o[0] === gewaehlt ? ' selected' : '') + '>' + B.esc(o[1]) + '</option>'; }).join('') +
      '</select>' + (opt.hilfe ? '<small>' + opt.hilfe + '</small>' : '') + '</label>';
  }
  /* Werte-Raster: Zeilen = Skalen, Spalten = Beurteiler (jede Spalte hat eigene Werte – nichts wird übertragen)
     spec: { basis: 'tests.sdq.werte', spalten:[{id,label}], zeilen:[{id,name,hinweis,min,max,ganz,trenner}], einstufen(zeileId, spaltenId, zahl) → Einstufung|null } */
  /* spec.chipAmEnde: Einstufung nicht neben dem Feld, sondern in einer eigenen letzten Spalte
     (für breite Raster mit mehreren Zahlenspalten, z. B. Indexwert · PR · KI) */
  function raster(spec) {
    var chipSpalte = spec.chipAmEnde ? spec.spalten.filter(function (s) { return !s.ohneChip; })[0] : null;
    var h = '<div class="tabelle-scroll"><table class="wraster"><thead><tr><th>' + B.esc(spec.kopfSkala || 'Skala') + '</th>' +
      spec.spalten.map(function (s) { return '<th>' + B.esc(s.label) + '</th>'; }).join('') + (chipSpalte ? '<th>Einstufung</th>' : '') + '</tr></thead><tbody>';
    function grenzen(s, z) { return { min: s.min != null ? s.min : z.min, max: s.max != null ? s.max : z.max, ganz: s.ganz != null ? s.ganz : z.ganz }; }
    function chipHtml(s, z, pfad) {
      var g = grenzen(s, z), v = wert(pfad), n = B.num(v);
      var e = (n != null && inBereich(n, g)) ? spec.einstufen(z.id, s.id, n) : null;
      return '<span class="chip ' + (e ? e.klasse : 'leer') + '" data-chip="' + B.esc(pfad) + '">' + (e ? B.esc(B.t(e.name, 'de')) : (v !== '' ? (n == null ? 'ungültig' : 'außerhalb ' + g.min + '–' + g.max) : '')) + '</span>';
    }
    spec.zeilen.forEach(function (z) {
      if (z.trenner) { h += '<tr class="trenner"><td colspan="' + (spec.spalten.length + 1 + (chipSpalte ? 1 : 0)) + '">' + B.esc(z.trenner) + '</td></tr>'; return; }
      h += '<tr><td class="skala"><b>' + B.esc(z.name) + '</b>' + (z.hinweis ? '<small>' + z.hinweis + '</small>' : '') + '</td>';
      spec.spalten.forEach(function (s) {
        if (z.nurSpalten && z.nurSpalten.indexOf(s.id) < 0) { h += '<td class="leise">–</td>'; return; }
        /* Wertebereich: Spalte (z. B. PR 0,1–99,9) vor Zeile (z. B. Indexwert 40–160) */
        var g = grenzen(s, z);
        var pfad = spec.basis + '.' + s.id + '.' + z.id, v = wert(pfad), n = B.num(v);
        h += '<td><div class="zelle"><input class="eingabe' + (z.breit ? ' breit' : '') + (v !== '' && (n == null || !inBereich(n, g)) ? ' fehler' : '') + '" data-pfad="' + B.esc(pfad) + '" value="' + B.esc(v) + '" inputmode="decimal" autocomplete="off" aria-label="' + B.esc(z.name + ' – ' + s.label) + '"' +
          (g.min != null ? ' data-min="' + g.min + '"' : '') + (g.max != null ? ' data-max="' + g.max + '"' : '') + (g.ganz ? ' data-ganz="1"' : '') + ' data-raster="1">' +
          (s.ohneChip || chipSpalte ? '' : chipHtml(s, z, pfad)) + '</div></td>';
      });
      if (chipSpalte) { h += (z.nurSpalten && z.nurSpalten.indexOf(chipSpalte.id) < 0) ? '<td></td>' : '<td class="einstufung">' + chipHtml(chipSpalte, z, spec.basis + '.' + chipSpalte.id + '.' + z.id) + '</td>'; }
      h += '</tr>';
    });
    return h + '</tbody></table></div>';
  }
  function inBereich(n, z) {
    if (z.min != null && n < z.min) { return false; }
    if (z.max != null && n > z.max) { return false; }
    if (z.ganz && Math.round(n) !== n) { return false; }
    return true;
  }
  /* Zahl aus dem Fall lesen, nur wenn gültig */
  function zahl(pfad, min, max, ganz) {
    var n = B.num(wert(pfad));
    if (n == null) { return null; }
    if (min != null && n < min) { return null; }
    if (max != null && n > max) { return null; }
    if (ganz && Math.round(n) !== n) { return null; }
    return n;
  }
  function karte(inhalt, kl) { return '<section class="karte' + (kl ? ' ' + kl : '') + '">' + inhalt + '</section>'; }
  function hinweis(text, art) { return '<div class="callout' + (art ? ' ' + art : '') + '"><svg class="ic"><use href="#i-' + (art === 'info' ? 'info' : 'warn') + '"/></svg><div>' + text + '</div></div>'; }
  return { hol: hol, setz: setz, wert: wert, feld: feld, textfeld: textfeld, auswahl: auswahl, haken: haken, wahlen: wahlen, sprachAuswahl: sprachAuswahl, raster: raster,
    inBereich: inBereich, zahl: zahl, karte: karte, hinweis: hinweis };
})();
