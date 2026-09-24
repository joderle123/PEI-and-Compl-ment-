/* =====================================================================
   Befundbericht – Basis: kleine Helfer für Text, Datum, Alter, Zahlen
   Die App ist ein einziges klassisches Skript (siehe build.cjs).
   ===================================================================== */
'use strict';

var B = (function () {
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function $(id) { return document.getElementById(id); }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function heute() { var d = new Date(); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function isoOk(iso) { return /^\d{4}-\d{2}-\d{2}$/.test(iso || '') && !isNaN(new Date(iso + 'T12:00:00')); }

  var MONATE = {
    de: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
    fr: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  };
  /* Datum im Bericht: 24.09.2026 · 24/09/2026 · 24 September 2026 */
  function datum(iso, lang) {
    if (!isoOk(iso)) { return ''; }
    var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
    if (lang === 'fr') { return m[3] + '/' + m[2] + '/' + m[1]; }
    if (lang === 'en') { return (+m[3]) + ' ' + MONATE.en[+m[2] - 1] + ' ' + m[1]; }
    return m[3] + '.' + m[2] + '.' + m[1];
  }
  /* Alter in Jahren und Monaten an einem Stichtag */
  function alter(geb, stichtag) {
    if (!isoOk(geb)) { return null; }
    var g = new Date(geb + 'T12:00:00'), h = isoOk(stichtag) ? new Date(stichtag + 'T12:00:00') : new Date();
    var mon = (h.getFullYear() - g.getFullYear()) * 12 + (h.getMonth() - g.getMonth()) - (h.getDate() < g.getDate() ? 1 : 0);
    if (mon < 0) { return null; }
    return { j: Math.floor(mon / 12), m: mon % 12, dezimal: mon / 12 };
  }
  function alterText(a, lang) {
    if (!a) { return ''; }
    var j = a.j, m = a.m;
    if (lang === 'fr') { return j + (j === 1 ? ' an' : ' ans') + (m ? ' et ' + m + ' mois' : ''); }
    if (lang === 'en') { return j + (j === 1 ? ' year' : ' years') + (m ? ' ' + m + (m === 1 ? ' month' : ' months') : ''); }
    return j + (j === 1 ? ' Jahr' : ' Jahre') + (m ? ', ' + m + (m === 1 ? ' Monat' : ' Monate') : '');
  }
  /* Zahl im Bericht: Dezimalkomma in DE/FR */
  function zahl(x, lang, stellen) {
    if (x == null || x === '' || isNaN(x)) { return ''; }
    var s = (stellen == null ? String(+x) : (+x).toFixed(stellen));
    return lang === 'en' ? s : s.replace('.', ',');
  }
  /* „A, B und C“ */
  function liste(arr, lang) {
    arr = (arr || []).filter(function (x) { return x != null && String(x) !== ''; });
    if (arr.length < 2) { return arr.join(''); }
    var und = lang === 'fr' ? ' et ' : (lang === 'en' ? ' and ' : ' und ');
    return arr.slice(0, -1).join(', ') + und + arr[arr.length - 1];
  }
  /* Eingabe → Zahl (Komma oder Punkt), leer/ungültig → null */
  function num(v) {
    if (v == null) { return null; }
    var s = String(v).trim().replace(',', '.');
    if (s === '' || !/^-?\d+(\.\d+)?$/.test(s)) { return null; }
    return +s;
  }
  function ersteGross(s) { s = String(s || ''); return s.charAt(0).toUpperCase() + s.slice(1); }
  function kopie(o) { return JSON.parse(JSON.stringify(o)); }
  function t(obj, lang) { if (obj == null) { return ''; } if (typeof obj === 'string') { return obj; } return obj[lang] != null ? obj[lang] : (obj.de != null ? obj.de : ''); }
  /* Französische Typografie (Imprimerie nationale): geschütztes Leerzeichen
     vor dem Doppelpunkt und in « », schmales geschütztes vor ; ! ? */
  function frTypo(s) {
    return String(s)
      .replace(/[ \u00A0\u202F]?:(?=\s|$)/g, '\u00A0:')
      .replace(/[ \u00A0\u202F]?([;!?])(?=\s|$)/g, '\u202F$1')
      .replace(/\u00AB[ \u00A0\u202F]?/g, '\u00AB\u00A0')
      .replace(/[ \u00A0\u202F]?\u00BB/g, '\u00A0\u00BB');
  }
  /* Prozentangabe: 9,5 % (DE/FR, geschütztes Leerzeichen) · 9.5% (EN) */
  function prozent(x, lang, stellen) {
    var z = zahl(x, lang, stellen);
    return z === '' ? '' : z + (lang === 'en' ? '%' : '\u00A0%');
  }
  /* Geschützte Leerzeichen für Texte (unsichtbar – daher als Konstanten) */
  var NBSP = '\u00A0', NNBSP = '\u202F';
  return { esc: esc, $: $, pad: pad, heute: heute, isoOk: isoOk, datum: datum, alter: alter, alterText: alterText, zahl: zahl, prozent: prozent,
    liste: liste, num: num, ersteGross: ersteGross, kopie: kopie, t: t, frTypo: frTypo, MONATE: MONATE, NBSP: NBSP, NNBSP: NNBSP };
})();
