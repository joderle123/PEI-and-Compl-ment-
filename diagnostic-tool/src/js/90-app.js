/* =====================================================================
   App: Schritte, Seiten, Eingabe, Vorschau, Export
   ===================================================================== */
var APP = (function () {
  var aktSchritt = 'fall', vorschauTimer = null;

  function lang() { return (FALL.bericht && FALL.bericht.sprache) || 'de'; }
  function schritte() {
    var l = [{ id: 'fall', name: 'Kind und Bericht', icon: 'fall', gruppe: 'Fall' }, { id: 'verfahren', name: 'Verfahren wählen', icon: 'liste' }];
    R.aktiveTests(FALL).forEach(function (t) { l.push({ id: 'test:' + t.id, name: t.kurzUi || t.kurz, icon: 'test', gruppe: l.length === 2 ? 'Ergebnisse eingeben' : null, test: t }); });
    l.push({ id: 'einordnung', name: 'Beobachtung und Einordnung', icon: 'stift', gruppe: 'Abschluss' });
    l.push({ id: 'bericht', name: 'Bericht', icon: 'bericht' });
    l.push({ id: 'ueber', name: 'Über das Tool', icon: 'info', gruppe: ' ' });
    return l;
  }
  function testFertig(t) {
    var d = FALL.tests[t.id];
    return t.fertig ? t.fertig(d) : false;
  }
  function navZeichnen() {
    var l = schritte(), h = '', nr = 0;
    l.forEach(function (s) {
      if (s.gruppe) { h += '<div class="gruppe">' + B.esc(s.gruppe) + '</div>'; }
      if (s.id !== 'ueber') { nr++; }
      var fertig = s.test ? testFertig(s.test) : (s.id === 'fall' ? !!(FALL.kind.vorname && FALL.kind.geburtsdatum) : (s.id === 'verfahren' ? R.aktiveTests(FALL).length > 0 : false));
      var warn = s.test && s.test.warnung ? s.test.warnung(FALL.tests[s.test.id], FALL) : (s.id === 'einordnung' && sicherheitsAngaben().length ? 'Sicherheit' : '');
      h += '<button type="button" class="schritt' + (s.id === aktSchritt ? ' an' : '') + (fertig ? ' fertig' : '') + '" data-schritt="' + B.esc(s.id) + '"' + (s.id === aktSchritt ? ' aria-current="step"' : '') + '>' +
        '<span class="nr">' + (s.id === 'ueber' ? '?' : (fertig ? '✓' : nr)) + '</span><span class="txt">' + B.esc(s.name) + '</span>' + (warn ? '<svg class="ic warn" aria-label="Hinweis"><use href="#i-warn"/></svg>' : '') + '</button>';
    });
    B.$('schritte').innerHTML = h;
  }
  function kopfZeichnen() {
    var k = FALL.kind || {}, a = B.alter(k.geburtsdatum, FALL.bericht.datumVon);
    var name = (String(k.vorname || '') + ' ' + String(k.nachname || '')).trim();
    B.$('kopf-fall').innerHTML = name ? '<b>' + B.esc(name) + '</b>' + (a ? '<span class="chip">' + B.esc(B.alterText(a, 'de')) + '</span>' : '') : '<span class="leise">Neuer Fall</span>';
    Array.prototype.forEach.call(document.querySelectorAll('#sprache-wahl button'), function (b) { b.classList.toggle('an', b.getAttribute('data-sprache') === lang()); b.setAttribute('aria-pressed', String(b.getAttribute('data-sprache') === lang())); });
  }
  /* markierte kritische Items aller Verfahren (Oberflächensprache) */
  function sicherheitsAngaben() {
    var sich = [];
    R.aktiveTests(FALL).forEach(function (t) { if (t.sicherheit) { try { sich = sich.concat(t.sicherheit('de', FALL.tests[t.id], R.kontext(FALL, 'de')) || []); } catch (e) { console.error(e); } } });
    return sich;
  }
  function seitenkopf(ov, titel, text) { return '<header class="seitenkopf"><p class="overline">' + B.esc(ov) + '</p><h1>' + B.esc(titel) + '</h1>' + (text ? '<p>' + text + '</p>' : '') + '</header>'; }
  function weiterKnoepfe() {
    var l = schritte().filter(function (s) { return s.id !== 'ueber'; }), i = l.map(function (s) { return s.id; }).indexOf(aktSchritt);
    var zur = i > 0 ? l[i - 1] : null, vor = i >= 0 && i < l.length - 1 ? l[i + 1] : null;
    return '<div class="knopfreihe nicht-drucken">' + (zur ? '<button class="btn" type="button" data-schritt="' + B.esc(zur.id) + '"><svg class="ic"><use href="#i-links"/></svg>' + B.esc(zur.name) + '</button>' : '') +
      (vor ? '<button class="btn primary rechts" type="button" data-schritt="' + B.esc(vor.id) + '">Weiter: ' + B.esc(vor.name) + '<svg class="ic"><use href="#i-rechts"/></svg></button>' : '') + '</div>';
  }

  /* ---------------- Seiten ---------------- */
  function seiteFall() {
    var h = seitenkopf('Schritt 1', 'Kind und Bericht', 'Angaben für den Kopf des Berichts. Der Vorname wird im Text verwendet; das Alter berechnet das Tool aus Geburtsdatum und Untersuchungsdatum.');
    h += E.karte('<h2>Kind</h2><div class="raster">' + E.feld('kind.vorname', 'Vorname') + E.feld('kind.nachname', 'Nachname') + E.feld('kind.geburtsdatum', 'Geburtsdatum', { typ: 'date' }) +
      E.auswahl('kind.geschlecht', 'Geschlecht', [['m', 'männlich'], ['w', 'weiblich'], ['d', 'divers']], { leer: '– keine Angabe –' }) +
      E.feld('kind.klasse', 'Klasse / Cycle') + E.feld('kind.schule', 'Schule') + '</div>' +
      '<div class="sprachwahl"><h3>Familiensprache(n)</h3>' + E.wahlen('kind.familiensprachen', SPRACHEN_LISTE.map(function (x) { return [x[0], x[1]]; }), true, false, 'klein') +
      E.feld('kind.familiensprachenAndere', 'Weitere Familiensprache(n)', { platzhalter: 'z. B. Wolof, Lingala' }) + '</div>' +
      '<div class="sprachwahl"><h3>Unterrichtssprache(n)</h3>' + E.wahlen('kind.schulsprachen', SPRACHEN_LISTE.filter(function (x) { return ['lb', 'de', 'fr', 'en', 'pt'].indexOf(x[0]) >= 0; }).map(function (x) { return [x[0], x[1]]; }), true, false, 'klein') +
      E.feld('kind.schulsprachenAndere', 'Weitere Unterrichtssprache(n)', { platzhalter: 'falls andere' }) + '</div>' +
      '<p class="klein leise" style="margin:10px 0 0">Im Bericht stehen die Sprachen in der Berichtssprache – z. B. „Portugiesisch“, „portugais“, „Portuguese“.</p>');
    h += E.karte('<h2>Bericht</h2><div class="raster">' + E.feld('bericht.datumVon', 'Untersuchung ab', { typ: 'date' }) + E.feld('bericht.datumBis', 'Untersuchung bis (optional)', { typ: 'date' }) + E.feld('bericht.datum', 'Datum des Berichts', { typ: 'date' }) +
      E.feld('bericht.verfasser', 'Verfasser/in') + E.feld('bericht.funktion', 'Funktion', { platzhalter: 'z. B. Psychologin, Diagnostique' }) + '</div>' +
      '<div style="margin-top:12px">' + E.textfeld('bericht.anlass', 'Anlass und Fragestellung', { zeilen: 5, platzhalter: 'Wer hat die Untersuchung angefragt, warum, und welche Fragen soll sie beantworten?' }) + '</div>');
    return h + weiterKnoepfe();
  }
  function seiteVerfahren() {
    var a = B.alter(FALL.kind.geburtsdatum, FALL.bericht.datumVon);
    var h = seitenkopf('Schritt 2', 'Verfahren wählen', 'Welche Tests und Fragebögen wurden durchgeführt? Für jedes gewählte Verfahren entsteht ein eigener Eingabeschritt.');
    KAT.GRUPPEN.forEach(function (g) {
      var tests = KAT.alle().filter(function (t) { return t.gruppe === g.id; });
      if (!tests.length) { return; }
      h += '<div class="verfahren-gruppe"><h3>' + B.esc(g.name) + '</h3><div class="verfahren-liste">' + tests.map(function (t) {
        var warn = a && t.alter && (a.dezimal < t.alter[0] || a.dezimal >= t.alter[1] + 1) ? '<span class="alter-warn">Nicht für ' + a.j + ' Jahre normiert (' + t.alter[0] + '–' + t.alter[1] + ' J.)</span>' : '';
        return '<label class="verfahren"><input type="checkbox" data-pfad="tests.' + t.id + '.aktiv" data-neu="1"' + (FALL.tests[t.id].aktiv ? ' checked' : '') + '><span><b>' + B.esc(t.kurzUi || t.kurz) + '</b><small>' + B.esc(B.t(t.name, 'de')) + '</small>' +
          (t.alter ? '<small>' + t.alter[0] + '–' + t.alter[1] + ' Jahre' + (t.informantenText ? ' · ' + B.esc(t.informantenText) : '') + '</small>' : '') + (warn ? '<small>' + warn + '</small>' : '') + '</span></label>';
      }).join('') + '</div></div>';
    });
    return h + weiterKnoepfe();
  }
  function seiteTest(t) {
    var d = FALL.tests[t.id];
    var h = seitenkopf('Ergebnisse eingeben', B.t(t.name, 'de'), t.hilfe ? t.hilfe : '');
    var w = t.warnung ? t.warnung(d, FALL) : '';
    if (w) { h += E.hinweis(w); }
    h += t.formular(d, FALL);
    h += E.karte('<h2>Beobachtungen während der Durchführung</h2>' + E.textfeld('tests.' + t.id + '.beobachtung', 'Nur was tatsächlich beobachtet wurde (erscheint im Bericht unter diesem Verfahren)', { zeilen: 4, platzhalter: 'z. B. Arbeitshaltung, Anstrengungsbereitschaft, Sprachverständnis, Besonderheiten der Durchführung' }));
    return h + weiterKnoepfe();
  }
  function seiteEinordnung() {
    var h = seitenkopf('Abschluss', 'Beobachtung und Einordnung', 'Freie Texte der Fachperson. Das Tool schreibt die Ergebnisse der Verfahren; die Einordnung im Zusammenhang bleibt Ihre fachliche Aufgabe.');
    h += E.karte('<h2>Verhaltensbeobachtung</h2>' + E.textfeld('bericht.beobachtung', 'Allgemeine Beobachtung während der Untersuchung', { zeilen: 6, platzhalter: 'Kontaktaufnahme, Motivation, Konzentration, Sprache, Arbeitstempo, Besonderheiten …' }));
    h += E.karte('<h2>Zusammenfassung</h2><p class="klein">Das Tool setzt die wichtigsten Ergebnisse als Liste an den Anfang der Zusammenfassung. Hier ergänzen Sie die Einordnung.</p>' + E.textfeld('bericht.zusammenfassung', 'Einordnung und Zusammenhang', { zeilen: 7 }));
    h += E.karte('<h2>Empfehlungen und weiteres Vorgehen</h2>' + E.textfeld('bericht.empfehlungen', 'Empfehlungen', { zeilen: 6, platzhalter: 'z. B. Fördermaßnahmen, Gespräche, weitere Abklärungen, aménagements raisonnables …' }));
    var sich = sicherheitsAngaben();
    if (sich.length) {
      h += E.karte('<h2>Hinweis zur Sicherheit</h2>' + E.hinweis('In den eingegebenen Fragebögen sind Antworten markiert, die auf Selbstgefährdung hindeuten können. Bitte zeitnah mit dem Kind und – wenn möglich – mit den Eltern besprechen und das Vorgehen nach dem internen Ablauf des CDSE festhalten.' +
        '<br><small>Im Notfall: <b>112</b>. Anonyme Hilfe für Kinder und Jugendliche: <b>Kanner-Jugendtelefon 116 111</b>. Telefonische Hilfe in Krisen: <b>SOS Détresse 45 45 45</b>.</small>', 'gefahr') +
        '<ul>' + sich.map(function (s) { return '<li>' + B.esc(s) + '</li>'; }).join('') + '</ul>' +
        E.textfeld('bericht.sicherheitVorgehen', 'Was wurde getan bzw. vereinbart? (erscheint im Bericht)', { zeilen: 3 }), 'sicherheit-karte');
    }
    return h + weiterKnoepfe();
  }
  function seiteBericht() {
    var bl = R.bloecke(FALL, lang());
    var h = seitenkopf('Fertig', 'Bericht', 'So sieht der Bericht aus. Word-Datei herunterladen, dort bei Bedarf überarbeiten und unterschreiben.');
    h += '<div class="knopfreihe nicht-drucken" style="margin:0 0 16px"><button class="btn primary" type="button" data-aktion="word"><svg class="ic"><use href="#i-word"/></svg>Word-Datei herunterladen</button>' +
      '<button class="btn" type="button" data-aktion="drucken"><svg class="ic"><use href="#i-druck"/></svg>Drucken / PDF</button>' +
      '<span class="rechts leise">Sprache des Berichts oben rechts: DE · FR · EN</span></div>';
    h += '<article class="bericht-blatt"><div class="bericht">' + R.html(bl) + '</div></article>';
    return h;
  }
  function seiteUeber() {
    var h = seitenkopf('Hilfe', 'Über das Tool', 'Was das Tool rechnet, was nicht, und welche Angaben noch am Manual zu prüfen sind.');
    h += E.karte('<h2>Grundsätze</h2><ul class="klein"><li>Normwerte (T-Werte, Prozentränge, Konfidenzintervalle, Indexwerte) kommen aus dem Manual bzw. der Auswertungssoftware und werden eingegeben. Das Tool erfindet keine Werte.</li>' +
      '<li>Das Tool rechnet nur, was ohne Normtabelle sicher ist: Summen und Umpolungen (SDQ), abgeleitete Rohwerte (d2-R: KL, F%), Differenzen.</li>' +
      '<li>Fragebogenwerte sind keine Diagnosen. Der Bericht enthält keine ICD-/CIM-Codes; Hinweise für die weitere Abklärung sind vorsichtig formuliert.</li>' +
      '<li>Jede Beurteilerin und jeder Beurteiler hat eine eigene Spalte – Werte werden nie übertragen.</li></ul>');
    var liste = [];
    KAT.alle().forEach(function (t) { (t.pruefen || []).forEach(function (p) { liste.push('<li><b>' + B.esc(t.kurz) + ':</b> ' + B.esc(p) + '</li>'); }); });
    KAT.bandIds().forEach(function (id) { var b = KAT.band(id); if (b && b.pruefen) { liste.push('<li><b>Einstufung ' + B.esc(id) + ':</b> ' + B.esc(b.pruefen) + '</li>'); } });
    h += E.karte('<h2>Noch am Manual zu prüfen</h2><p class="klein">Diese Bezeichnungen und Grenzen stammen aus der Fachliteratur, sind aber noch nicht am Protokollbogen des CDSE bestätigt.</p><ul class="klein">' + liste.join('') + '</ul>');
    h += E.karte('<h2>Fall sichern oder laden</h2><p class="klein">Der Fall wird automatisch in diesem Browser gespeichert (im CDSE Hub verschlüsselt in Ihrem Tresor). Zum Mitnehmen auf einen anderen PC können Sie ihn als Datei sichern.</p>' +
      '<div class="knopfreihe"><button class="btn" type="button" data-aktion="fall-datei">Fall als Datei sichern</button><label class="btn">Fall aus Datei laden<input type="file" accept=".json,application/json" data-aktion="fall-laden" hidden></label></div>');
    return h;
  }

  function zeigen(id, ohneScroll) {
    aktSchritt = id; FALL.ui.schritt = id;
    var inhalt = B.$('inhalt'), rahmen = document.querySelector('.rahmen');
    var html;
    if (id === 'fall') { html = seiteFall(); }
    else if (id === 'verfahren') { html = seiteVerfahren(); }
    else if (id === 'einordnung') { html = seiteEinordnung(); }
    else if (id === 'bericht') { html = seiteBericht(); }
    else if (id === 'ueber') { html = seiteUeber(); }
    else if (/^test:/.test(id) && KAT.test(id.slice(5)) && FALL.tests[id.slice(5)].aktiv) { html = seiteTest(KAT.test(id.slice(5))); }
    else { return zeigen('verfahren'); }
    inhalt.innerHTML = html;
    rahmen.classList.toggle('ohne-vorschau', id === 'bericht' || id === 'ueber');
    navZeichnen(); kopfZeichnen(); vorschauZeichnen();
    if (!ohneScroll) { window.scrollTo(0, 0); }
    fallSpeichern();
  }
  function vorschauZeichnen() {
    var el = B.$('vorschau-inhalt'); if (!el) { return; }
    var bl;
    if (/^test:/.test(aktSchritt)) { var t = KAT.test(aktSchritt.slice(5)); bl = t ? R.testBloecke(t, FALL, lang()) : []; }
    else if (aktSchritt === 'einordnung') { bl = R.bloecke(FALL, lang()).filter(function (b, i, a) { var start = a.map(function (x) { return x.text; }).indexOf(SPRACHE[lang()].h.zusammenfassung); return start >= 0 && i >= start; }); }
    else { bl = R.bloecke(FALL, lang()).slice(0, 6); }
    el.innerHTML = '<div class="bericht">' + (bl.length ? R.html(bl) : '<p class="leer-hinweis">Noch nichts eingegeben.</p>') + '</div>';
  }
  function vorschauBald() { clearTimeout(vorschauTimer); vorschauTimer = setTimeout(function () { vorschauZeichnen(); navZeichnen(); kopfZeichnen(); }, 250); }

  /* ---------------- Eingaben ---------------- */
  function eingabe(ev) {
    var el = ev.target; if (!el || !el.getAttribute) { return; }
    var pfad = el.getAttribute('data-pfad'); if (!pfad) { return; }
    if (el.type === 'checkbox' && el.getAttribute('data-mehrfach')) {
      var liste = E.hol(FALL, pfad); liste = Array.isArray(liste) ? liste.slice() : [];
      var w = el.getAttribute('data-wert'), i = liste.indexOf(w);
      if (el.checked && i < 0) { liste.push(w); } else if (!el.checked && i >= 0) { liste.splice(i, 1); }
      E.setz(FALL, pfad, liste);
    } else if (el.type === 'checkbox') { E.setz(FALL, pfad, el.checked); }
    else if (el.type === 'radio') { if (el.checked) { E.setz(FALL, pfad, el.getAttribute('data-wert') || el.value); } }
    else { E.setz(FALL, pfad, el.value); }
    /* Chips (Auswahlknöpfe): Markierung auch ohne CSS :has() */
    var reihe = (el.type === 'checkbox' || el.type === 'radio') && el.closest ? el.closest('.wahlreihe') : null;
    if (reihe) { Array.prototype.forEach.call(reihe.querySelectorAll('.wahl'), function (lb) { var i = lb.querySelector('input'); lb.classList.toggle('an', !!(i && i.checked)); }); }
    /* Bereichsprüfung und Einstufung im Raster */
    if (el.hasAttribute('data-min') || el.hasAttribute('data-max') || el.hasAttribute('data-raster')) { pruefeFeld(el); }
    /* berechnete Teile der Seite (z. B. Gesamtwert, Impact) sofort aktualisieren */
    if (/^test:/.test(aktSchritt)) {
      var tt = KAT.test(aktSchritt.slice(5));
      if (tt && tt.teilUpdate) {
        var tu = tt.teilUpdate(FALL.tests[tt.id], FALL) || {};
        Object.keys(tu).forEach(function (id) { var ziel = B.$(id); if (ziel) { ziel.innerHTML = tu[id]; } });
      }
    }
    fallSpeichern();
    if (el.getAttribute('data-neu') && (ev.type === 'change' || el.type === 'checkbox' || el.type === 'radio')) { zeigen(aktSchritt, true); return; }
    vorschauBald();
  }
  function pruefeFeld(el) {
    var v = el.value, n = B.num(v);
    var z = { min: el.hasAttribute('data-min') ? +el.getAttribute('data-min') : null, max: el.hasAttribute('data-max') ? +el.getAttribute('data-max') : null, ganz: el.getAttribute('data-ganz') === '1' };
    var ok = v === '' || (n != null && E.inBereich(n, z));
    el.classList.toggle('fehler', !ok);
    var chip = document.querySelector('[data-chip="' + (window.CSS && CSS.escape ? CSS.escape(el.getAttribute('data-pfad')) : el.getAttribute('data-pfad')) + '"]');
    if (chip) {
      var e = null;
      if (ok && n != null && /^test:/.test(aktSchritt)) { var t = KAT.test(aktSchritt.slice(5)); if (t && t.chip) { e = t.chip(el.getAttribute('data-pfad'), n, FALL.tests[t.id]); } }
      chip.className = 'chip ' + (e ? e.klasse : 'leer');
      chip.textContent = e ? B.t(e.name, 'de') : (v === '' ? '' : (n == null ? 'ungültig' : 'außerhalb ' + (z.min != null ? z.min : '') + '–' + (z.max != null ? z.max : '')));
    }
  }
  function klick(ev) {
    var s = ev.target.closest('[data-schritt]');
    if (s) { zeigen(s.getAttribute('data-schritt')); return; }
    var sp = ev.target.closest('[data-sprache]');
    if (sp) { FALL.bericht.sprache = sp.getAttribute('data-sprache'); fallSpeichern(); kopfZeichnen(); if (aktSchritt === 'bericht') { zeigen('bericht', true); } else { vorschauZeichnen(); } return; }
    var a = ev.target.closest('[data-aktion]');
    if (a) {
      var ak = a.getAttribute('data-aktion');
      if (ak === 'word') { wordHerunterladen(a); }
      else if (ak === 'drucken') { window.print(); }
      else if (ak === 'fall-datei') { fallAlsDatei(); }
      return;
    }
    if (ev.target.closest('#knopf-neu')) {
      if (window.confirm('Einen neuen Fall beginnen? Der aktuelle Fall wird aus diesem Browser entfernt. (Tipp: vorher unter „Über das Tool“ als Datei sichern.)')) {
        FALL = neuerFall(); fallSpeichern(true); zeigen('fall');
      }
    }
  }
  function wordHerunterladen(knopf) {
    var bl = R.bloecke(FALL, lang());
    knopf.disabled = true;
    R.docxBlob(bl, lang(), FALL).then(function (blob) { saveAs(blob, R.dateiname(FALL, lang())); toast('Word-Datei erstellt'); })
      .catch(function (e) { console.error(e); toast('Word-Datei ließ sich nicht erstellen: ' + e.message); })
      .then(function () { knopf.disabled = false; });
  }
  var toastTimer = null;
  function toast(t) { var el = B.$('toast'); el.textContent = t; el.hidden = false; clearTimeout(toastTimer); toastTimer = setTimeout(function () { el.hidden = true; }, 3200); }

  function start() {
    var zustand = fallLaden();
    document.addEventListener('input', eingabe);
    document.addEventListener('change', function (ev) {
      if (ev.target && ev.target.getAttribute && ev.target.getAttribute('data-aktion') === 'fall-laden') {
        var dat = ev.target.files && ev.target.files[0]; if (!dat) { return; }
        fallAusDatei(dat, function (e) { if (e) { toast(e.message); } else { toast('Fall geladen'); zeigen('fall'); } });
        return;
      }
      eingabe(ev);
    });
    document.addEventListener('click', klick);
    zeigen(FALL.ui.schritt || 'fall');
    if (zustand === 'uebernommen') { toast('Die Eingaben aus der früheren Version wurden übernommen.'); }
  }
  return { start: start, zeigen: zeigen, toast: toast, lang: lang };
})();
document.addEventListener('DOMContentLoaded', APP.start);
