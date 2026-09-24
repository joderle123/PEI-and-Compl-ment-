/* =====================================================================
   Speichern: der aktuelle Fall liegt in diesem Browser (localStorage,
   Schlüssel 'cdse-autosave-v2'). Im CDSE Hub wird dieser Speicher mit
   dem verschlüsselten Tresor der angemeldeten Person gesichert und beim
   Abmelden vom PC entfernt.
   Die frühere Version speicherte unter 'cdse-autosave-v1' – beim ersten
   Start wird daraus ein Fall übernommen; der alte Stand bleibt erhalten.
   ===================================================================== */
var SPEICHER_SCHLUESSEL = 'cdse-autosave-v2', ALT_SCHLUESSEL = 'cdse-autosave-v1';
var FALL = null;

function neuerFall() {
  var tests = {};
  KAT.alle().forEach(function (t) { tests[t.id] = Object.assign({ aktiv: false, beobachtung: '' }, t.neu ? t.neu() : {}); });
  return { v: 2, id: 'fall-' + Date.now().toString(36), erstellt: new Date().toISOString(), geaendert: '',
    kind: { nachname: '', vorname: '', geburtsdatum: '', geschlecht: '', klasse: '', schule: '', familiensprachen: [], familiensprachenAndere: '', schulsprachen: [], schulsprachenAndere: '' },
    bericht: { datumVon: B.heute(), datumBis: '', datum: B.heute(), verfasser: '', funktion: '', anlass: '', beobachtung: '', zusammenfassung: '', empfehlungen: '', sicherheitVorgehen: '', sprache: 'de' },
    tests: tests, ui: { schritt: 'fall' } };
}
/* Fehlende Teile ergänzen (neue Verfahren, neue Felder) – nichts löschen */
function fallErgaenzen(f) {
  var leer = neuerFall();
  f.kind = Object.assign({}, leer.kind, f.kind || {});
  /* frühere Freitext-Felder „familiensprache“/„schulsprache“ → Auswahl + weitere */
  [['familiensprache', 'familiensprachen', 'familiensprachenAndere'], ['schulsprache', 'schulsprachen', 'schulsprachenAndere']].forEach(function (p) {
    var alt = String(f.kind[p[0]] || '').trim();
    if (!alt) { delete f.kind[p[0]]; return; }
    var z = sprachenZerlegen(alt);
    f.kind[p[1]] = (Array.isArray(f.kind[p[1]]) ? f.kind[p[1]] : []).concat(z.codes.filter(function (c) { return (f.kind[p[1]] || []).indexOf(c) < 0; }));
    f.kind[p[2]] = [f.kind[p[2]]].concat(z.rest).filter(Boolean).join(', ');
    delete f.kind[p[0]];
  });
  f.bericht = Object.assign({}, leer.bericht, f.bericht || {});
  f.tests = f.tests || {};
  Object.keys(leer.tests).forEach(function (id) {
    if (!f.tests[id]) { f.tests[id] = leer.tests[id]; return; }
    Object.keys(leer.tests[id]).forEach(function (k) { if (f.tests[id][k] === undefined) { f.tests[id][k] = leer.tests[id][k]; } });
  });
  f.ui = Object.assign({ schritt: 'fall' }, f.ui || {});
  return f;
}
function fallLaden() {
  var roh = null;
  try { roh = JSON.parse(localStorage.getItem(SPEICHER_SCHLUESSEL) || 'null'); } catch (e) { roh = null; }
  if (roh && roh.v === 2) { FALL = fallErgaenzen(roh); return 'geladen'; }
  var alt = null;
  try { alt = JSON.parse(localStorage.getItem(ALT_SCHLUESSEL) || 'null'); } catch (e) { alt = null; }
  if (alt && alt.v === 1) {
    FALL = ausAlterVersion(alt);
    fallSpeichern(true);
    return 'uebernommen';
  }
  FALL = neuerFall();
  return 'neu';
}
/* Übernahme der früheren Eingaben (Version 1): Patientendaten und Testwerte */
function ausAlterVersion(alt) {
  var f = neuerFall(), fe = alt.fields || {};
  var name = String(fe['pat-name'] || '').trim();
  if (name) { f.kind.vorname = name; }
  if (fe['pat-dob']) { f.kind.geburtsdatum = fe['pat-dob']; }
  if (fe['pat-sex']) { f.kind.geschlecht = ({ m: 'm', w: 'w', f: 'w', d: 'd', male: 'm', female: 'w', diverse: 'd' })[String(fe['pat-sex']).toLowerCase()] || ''; }
  if (fe['pat-date']) { f.bericht.datumVon = fe['pat-date']; }
  if (fe['pat-examiner']) { f.bericht.verfasser = fe['pat-examiner']; }
  /* Muttersprache stand früher bei einzelnen Tests – als Familiensprache übernehmen */
  var mutter = ['wisc-motherlang', 'sonr-motherlang', 'kabc-motherlang'].map(function (k) { return String(fe[k] || '').trim(); }).filter(Boolean).join(', ');
  if (mutter && !f.kind.familiensprachen.length) { var zm = sprachenZerlegen(mutter); f.kind.familiensprachen = zm.codes; f.kind.familiensprachenAndere = zm.rest.join(', '); }
  var lang = null; try { lang = localStorage.getItem('cdse-report-lang'); } catch (e) { lang = null; }
  if (lang === 'fr' || lang === 'en' || lang === 'de') { f.bericht.sprache = lang; }
  KAT.alle().forEach(function (t) {
    if (!t.ausAlt) { return; }
    try {
      var d = t.ausAlt(alt, f.tests[t.id]);
      if (d) { f.tests[t.id] = Object.assign(f.tests[t.id], d); f.tests[t.id].aktiv = true; }
    } catch (e) { console.warn('Übernahme ' + t.id, e); }
  });
  f.uebernommen = new Date().toISOString();
  return f;
}
var speicherTimer = null, speicherOffen = false;
function fallSpeichern(sofort) {
  clearTimeout(speicherTimer);
  speicherOffen = !sofort;
  function tun() {
    speicherOffen = false;
    try {
      FALL.geaendert = new Date().toISOString();
      localStorage.setItem(SPEICHER_SCHLUESSEL, JSON.stringify(FALL));
      var d = new Date();
      statusSetzen('Gespeichert ' + B.pad(d.getHours()) + ':' + B.pad(d.getMinutes()));
    } catch (e) { statusSetzen('Nicht gespeichert – Speicher voll oder blockiert'); }
  }
  if (sofort) { tun(); } else { speicherTimer = setTimeout(tun, 400); }
}
/* Wird die Seite geschlossen oder neu geladen, bevor die verzögerte Speicherung lief: sofort speichern.
   Aber nur, wenn der Fall noch im Speicher steht – hat der Hub beim Abmelden den Speicher geleert,
   darf das Tool die Daten NICHT wieder auf den PC schreiben. */
window.addEventListener('pagehide', function () {
  var noch = false;
  try { noch = localStorage.getItem(SPEICHER_SCHLUESSEL) !== null; } catch (e) { noch = false; }
  if (speicherOffen && FALL && noch) { fallSpeichern(true); }
});
function statusSetzen(t) { var el = B.$('kopf-status'); if (el) { el.textContent = t; } }
/* Fall als Datei sichern / aus Datei laden (z. B. für einen anderen PC) */
function fallAlsDatei() {
  var k = FALL.kind || {};
  var blob = new Blob([JSON.stringify(FALL, null, 1)], { type: 'application/json' });
  saveAs(blob, B.heute().replace(/-/g, '') + '_' + String(k.nachname || 'Fall').replace(/[^A-Za-z0-9ÄÖÜäöüß-]+/g, '-') + (k.vorname ? '_' + String(k.vorname).replace(/[^A-Za-z0-9ÄÖÜäöüß-]+/g, '-') : '') + '_Befund.json');
}
function fallAusDatei(datei, fertig) {
  var r = new FileReader();
  r.onload = function () {
    try {
      var f = JSON.parse(r.result);
      if (!f || f.v !== 2 || !f.tests) { throw new Error('Das ist keine Fall-Datei dieses Tools.'); }
      FALL = fallErgaenzen(f); fallSpeichern(true); fertig(null);
    } catch (e) { fertig(e); }
  };
  r.readAsText(datei);
}
