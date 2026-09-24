/* =====================================================================
   Bericht: aus dem Fall wird eine Liste von Blöcken – daraus entstehen
   die Vorschau (HTML), die Word-Datei (docx) und der Ausdruck.
   Blöcke: titel, kopfdaten, h2, h3, p, liste, tabelle, anmerkung,
           sicherheit, unterschrift
   ===================================================================== */
var R = (function () {
  /* Kontext für Texte: Name, Geschlecht, Alter … */
  function kontext(fall, lang) {
    var k = fall.kind || {}, vn = String(k.vorname || '').trim();
    var alter = B.alter(k.geburtsdatum, (fall.bericht || {}).datumBis || (fall.bericht || {}).datumVon || B.heute());
    var allg = alter && alter.j >= 12 ? SPRACHE[lang].jugendAllg : SPRACHE[lang].kindAllg;
    return { lang: lang, name: vn || allg, vorname: vn, vollname: (vn + ' ' + String(k.nachname || '').trim()).trim(), g: k.geschlecht || '', alter: alter, fall: fall };
  }
  function aktiveTests(fall) {
    return KAT.alle().filter(function (t) { return fall.tests && fall.tests[t.id] && fall.tests[t.id].aktiv; });
  }
  /* Teil des Berichts für EIN Verfahren (auch für die Live-Vorschau) */
  function testBloecke(t, fall, lang) {
    var daten = fall.tests[t.id], ctx = kontext(fall, lang);
    var ausw = t.auswerten ? t.auswerten(daten, fall) : null;
    var bl = [{ t: 'h3', text: B.t(t.name, lang) }];
    try { bl = bl.concat(t.bericht(lang, ctx, daten, ausw) || []); }
    catch (e) { console.error(e); bl.push({ t: 'anmerkung', text: 'Fehler bei der Auswertung: ' + e.message }); }
    var beob = String((daten && daten.beobachtung) || '').trim();
    if (beob) { bl.push({ t: 'p', text: beob, frei: true }); }
    return lang === 'fr' ? franzoesisch(bl) : bl;
  }
  /* Französische Typografie für alle festen Texte (Freitexte der Fachperson bleiben, wie sie sind) */
  function franzoesisch(bl) {
    return bl.map(function (b) {
      if (b.frei || b.fr) { return b; }
      var n = Object.assign({}, b, { fr: true });
      if (n.text != null && n.t !== 'titel') { n.text = B.frTypo(n.text); }
      if (n.punkte) { n.punkte = n.punkte.map(B.frTypo); }
      if (n.anmerkung) { n.anmerkung = B.frTypo(n.anmerkung); }
      if (n.zeilen && n.t === 'tabelle') { n.zeilen = n.zeilen.map(function (z) { return z.map(function (c) { return B.frTypo(c); }); }); }
      if (n.kopf) { n.kopf = n.kopf.map(B.frTypo); }
      return n;
    });
  }
  function bloecke(fall, lang) {
    var S = SPRACHE[lang], ctx = kontext(fall, lang), k = fall.kind || {}, br = fall.bericht || {};
    var bl = [{ t: 'titel', text: S.titel, unter: S.untertitel }];
    var zeitraum = br.datumVon ? B.datum(br.datumVon, lang) + (br.datumBis && br.datumBis !== br.datumVon ? ' – ' + B.datum(br.datumBis, lang) : '') : '';
    bl.push({ t: 'kopfdaten', zeilen: [
      [S.kind, ctx.vollname || S.keineAngabe],
      [S.geb, B.datum(k.geburtsdatum, lang) || S.keineAngabe],
      [S.alterBei, ctx.alter ? B.alterText(ctx.alter, lang) : ''],
      [S.klasse + ' / ' + S.schule, [k.klasse, k.schule].filter(Boolean).join(', ')],
      [S.familiensprache, sprachenText(k.familiensprachen, k.familiensprachenAndere, lang)],
      [S.schulsprache, sprachenText(k.schulsprachen, k.schulsprachenAndere, lang)],
      [S.zeitraum, zeitraum],
      [S.verfasser, [br.verfasser, br.funktion].filter(Boolean).join(', ')]
    ].filter(function (z) { return z[1]; }) });
    if (String(br.anlass || '').trim()) { bl.push({ t: 'h2', text: S.h.anlass }, { t: 'p', text: br.anlass, frei: true }); }
    var tests = aktiveTests(fall);
    if (tests.length) {
      bl.push({ t: 'h2', text: S.h.verfahren });
      bl.push({ t: 'liste', punkte: tests.map(function (t) { return t.verfahrenZeile ? t.verfahrenZeile(lang, fall.tests[t.id], ctx) : B.t(t.name, lang); }) });
    }
    if (String(br.beobachtung || '').trim()) { bl.push({ t: 'h2', text: S.h.beobachtung }, { t: 'p', text: br.beobachtung, frei: true }); }
    if (tests.length) {
      bl.push({ t: 'h2', text: S.h.ergebnisse });
      tests.forEach(function (t) { bl = bl.concat(testBloecke(t, fall, lang)); });
    }
    /* Sicherheit: markierte Items aller Verfahren */
    var sich = [];
    tests.forEach(function (t) { if (t.sicherheit) { sich = sich.concat(t.sicherheit(lang, fall.tests[t.id], ctx) || []); } });
    if (sich.length) {
      bl.push({ t: 'h2', text: S.h.sicherheit });
      sich.forEach(function (s) { bl.push({ t: 'sicherheit', text: s }); });
      var sv = String(br.sicherheitVorgehen || '').trim();
      bl.push({ t: 'p', text: sv || (lang === 'fr' ? 'Ces réponses ont été abordées avec l’enfant et, le cas échéant, avec les parents ; les démarches convenues sont documentées dans le dossier.'
        : (lang === 'en' ? 'These answers were followed up with the child and, where appropriate, with the parents; the agreed steps are documented in the file.'
          : 'Diese Angaben wurden mit dem Kind und gegebenenfalls mit den Eltern besprochen; das vereinbarte Vorgehen ist im Dossier festgehalten.')), frei: !!sv });
    }
    /* Zusammenfassung */
    var punkte = [];
    tests.forEach(function (t) { if (t.zusammenfassung) { var s = t.zusammenfassung(lang, ctx, fall.tests[t.id], t.auswerten ? t.auswerten(fall.tests[t.id], fall) : null); if (s) { punkte.push(s); } } });
    if (punkte.length || String(br.zusammenfassung || '').trim()) {
      bl.push({ t: 'h2', text: S.h.zusammenfassung });
      if (punkte.length) { bl.push({ t: 'liste', punkte: punkte }); }
      if (String(br.zusammenfassung || '').trim()) { bl.push({ t: 'p', text: br.zusammenfassung, frei: true }); }
    }
    var hinw = [];
    tests.forEach(function (t) { if (t.hinweise) { hinw = hinw.concat(t.hinweise(lang, ctx, fall.tests[t.id], t.auswerten ? t.auswerten(fall.tests[t.id], fall) : null) || []); } });
    if (hinw.length) { bl.push({ t: 'h2', text: S.h.abklaerung }, { t: 'liste', punkte: hinw }); }
    if (String(br.empfehlungen || '').trim()) { bl.push({ t: 'h2', text: S.h.empfehlungen }, { t: 'p', text: br.empfehlungen, frei: true }); }
    bl.push({ t: 'anmerkung', text: S.schlusshinweis });
    bl.push({ t: 'unterschrift', ort: S.ort, datum: B.datum(br.datum || B.heute(), lang), name: br.verfasser || '', funktion: br.funktion || '', label: S.unterschrift, dp: lang === 'fr' ? B.NBSP + ':' : ':' });
    return lang === 'fr' ? franzoesisch(bl) : bl;
  }

  /* ---------------- HTML ---------------- */
  function absaetze(text) {
    return String(text).split(/\n{2,}/).map(function (a) { return '<p>' + B.esc(a).replace(/\n/g, '<br>') + '</p>'; }).join('');
  }
  function html(bl) {
    return bl.map(function (b) {
      switch (b.t) {
        case 'titel': return '<h1>' + B.esc(b.text) + '</h1>' + (b.unter ? '<p class="anmerkung">' + B.esc(b.unter) + '</p>' : '');
        case 'kopfdaten': return '<table class="kopfdaten">' + b.zeilen.map(function (z) { return '<tr><td>' + B.esc(z[0]) + '</td><td>' + B.esc(z[1]) + '</td></tr>'; }).join('') + '</table>';
        case 'h2': return '<h2>' + B.esc(b.text) + '</h2>';
        case 'h3': return '<h3>' + B.esc(b.text) + '</h3>';
        case 'p': return b.frei ? absaetze(b.text) : '<p>' + B.esc(b.text) + '</p>';
        case 'liste': return '<ul>' + b.punkte.map(function (p) { return '<li>' + B.esc(p) + '</li>'; }).join('') + '</ul>';
        case 'tabelle': return '<table><thead><tr>' + b.kopf.map(function (k) { return '<th>' + B.esc(k) + '</th>'; }).join('') + '</tr></thead><tbody>' +
          b.zeilen.map(function (z) { return '<tr>' + z.map(function (c, i) { return '<td' + ((b.zahlSpalten || []).indexOf(i) >= 0 ? ' class="zahl"' : '') + '>' + B.esc(c) + '</td>'; }).join('') + '</tr>'; }).join('') +
          '</tbody></table>' + (b.anmerkung ? '<p class="anmerkung">' + B.esc(b.anmerkung) + '</p>' : '');
        case 'anmerkung': return '<p class="anmerkung">' + B.esc(b.text) + '</p>';
        case 'sicherheit': return '<div class="sicherheit">' + B.esc(b.text) + '</div>';
        case 'unterschrift': return '<div class="unterschrift"><p>' + B.esc(b.ort) + B.esc(b.dp || ':') + ' ………………………, ' + B.esc(b.datum) + '</p><p>' + B.esc(b.label) + B.esc(b.dp || ':') + ' ……………………………………</p>' + (b.name ? '<p>' + B.esc(b.name) + (b.funktion ? ', ' + B.esc(b.funktion) : '') + '</p>' : '') + '</div>';
      }
      return '';
    }).join('');
  }

  /* ---------------- Word (docx) ---------------- */
  function docxBlob(bl, lang, fall) {
    var d = window.docx;
    var FONT = 'Calibri', GR = 21; /* 10,5 pt */
    function run(text, o) { o = o || {}; return new d.TextRun({ text: String(text), bold: o.bold, italics: o.italics, size: o.size || GR, color: o.color, font: FONT }); }
    function para(text, o) {
      o = o || {};
      return new d.Paragraph({ children: [run(text, o)], spacing: { after: o.after != null ? o.after : 120, before: o.before || 0 }, alignment: o.align || d.AlignmentType.JUSTIFIED, keepNext: o.keepNext });
    }
    var rand = { style: d.BorderStyle.SINGLE, size: 4, color: 'C9CED8' };
    var raender = { top: rand, bottom: rand, left: rand, right: rand };
    var kinder = [];
    bl.forEach(function (b) {
      switch (b.t) {
        case 'titel':
          kinder.push(new d.Paragraph({ children: [run(b.text, { bold: true, size: 34, color: '1F2A6B' })], spacing: { after: 60 } }));
          if (b.unter) { kinder.push(para(b.unter, { size: 19, color: '555555', after: 200, align: d.AlignmentType.LEFT })); }
          break;
        case 'kopfdaten':
          kinder.push(new d.Table({ width: { size: 100, type: d.WidthType.PERCENTAGE },
            borders: { top: { style: d.BorderStyle.NONE }, bottom: { style: d.BorderStyle.NONE }, left: { style: d.BorderStyle.NONE }, right: { style: d.BorderStyle.NONE }, insideHorizontal: { style: d.BorderStyle.NONE }, insideVertical: { style: d.BorderStyle.NONE } },
            rows: b.zeilen.map(function (z) {
              return new d.TableRow({ children: [
                new d.TableCell({ width: { size: 30, type: d.WidthType.PERCENTAGE }, children: [para(z[0], { color: '555555', after: 20, align: d.AlignmentType.LEFT })] }),
                new d.TableCell({ width: { size: 70, type: d.WidthType.PERCENTAGE }, children: [para(z[1], { after: 20, align: d.AlignmentType.LEFT })] })] });
            }) }));
          kinder.push(para('', { after: 120 }));
          break;
        case 'h2': kinder.push(new d.Paragraph({ children: [run(b.text, { bold: true, size: 26, color: '1F2A6B' })], spacing: { before: 280, after: 100 }, keepNext: true })); break;
        case 'h3': kinder.push(new d.Paragraph({ children: [run(b.text, { bold: true, size: 23 })], spacing: { before: 200, after: 80 }, keepNext: true })); break;
        case 'p':
          String(b.text).split(/\n{2,}/).forEach(function (a) {
            var zeilen = a.split('\n'), runs = [];
            zeilen.forEach(function (z, i) { runs.push(new d.TextRun({ text: z, size: GR, font: FONT, break: i > 0 ? 1 : 0 })); });
            kinder.push(new d.Paragraph({ children: runs, spacing: { after: 120 }, alignment: d.AlignmentType.JUSTIFIED }));
          });
          break;
        case 'liste':
          b.punkte.forEach(function (p) { kinder.push(new d.Paragraph({ children: [run(p)], bullet: { level: 0 }, spacing: { after: 60 } })); });
          kinder.push(para('', { after: 60 }));
          break;
        case 'tabelle':
          /* Breiten nach Inhalt: lange Namen/Einstufungen bekommen mehr Platz, Zahlenspalten weniger.
             Satzspiegel A4: 11906 − 1247 − 1134 = 9525 Twips; feste Breiten, damit Word und LibreOffice gleich aussehen */
          var laengen = b.kopf.map(function (k, i) {
            var m = String(k).length * 0.9;
            b.zeilen.forEach(function (z) { m = Math.max(m, String(z[i] == null ? '' : z[i]).length); });
            return Math.pow(Math.min(Math.max(m, 5), 42), 0.85);
          });
          var summe = laengen.reduce(function (x, y) { return x + y; }, 0);
          var twips = laengen.map(function (l) { return Math.floor(9525 * l / summe); });
          var breite = function (i) { return { size: twips[i], type: d.WidthType.DXA }; };
          var ausrichtung = function (i) { return (b.zahlSpalten || []).indexOf(i) >= 0 ? d.AlignmentType.RIGHT : d.AlignmentType.LEFT; };
          kinder.push(new d.Table({ width: { size: 9525, type: d.WidthType.DXA }, columnWidths: twips, layout: d.TableLayoutType.FIXED,
            rows: [new d.TableRow({ tableHeader: true, children: b.kopf.map(function (k, i) {
              return new d.TableCell({ width: breite(i), borders: raender, shading: { type: d.ShadingType.CLEAR, color: 'auto', fill: 'EEF0F6' }, children: [para(k, { bold: true, size: 19, after: 0, align: ausrichtung(i) })] });
            }) })].concat(b.zeilen.map(function (z) {
              return new d.TableRow({ cantSplit: true, children: z.map(function (c, i) {
                return new d.TableCell({ width: breite(i), borders: raender, children: [para(c, { size: 19, after: 0, align: ausrichtung(i) })] });
              }) });
            })) }));
          if (b.anmerkung) { kinder.push(para(b.anmerkung, { size: 17, color: '555555', before: 60 })); }
          kinder.push(para('', { after: 80 }));
          break;
        case 'anmerkung': kinder.push(para(b.text, { size: 17, color: '555555', before: 160 })); break;
        case 'sicherheit':
          kinder.push(new d.Paragraph({ children: [run(b.text)], spacing: { after: 120 }, shading: { type: d.ShadingType.CLEAR, color: 'auto', fill: 'FDF3F0' },
            border: { top: { style: d.BorderStyle.SINGLE, size: 6, color: 'E3B3A8' }, bottom: { style: d.BorderStyle.SINGLE, size: 6, color: 'E3B3A8' }, left: { style: d.BorderStyle.SINGLE, size: 6, color: 'E3B3A8' }, right: { style: d.BorderStyle.SINGLE, size: 6, color: 'E3B3A8' } } }));
          break;
        case 'unterschrift':
          kinder.push(para('', { after: 360 }));
          kinder.push(para(b.ort + (b.dp || ':') + ' ………………………, ' + b.datum, { align: d.AlignmentType.LEFT }));
          kinder.push(para(b.label + (b.dp || ':') + ' ……………………………………', { align: d.AlignmentType.LEFT, before: 240 }));
          if (b.name) { kinder.push(para(b.name + (b.funktion ? ', ' + b.funktion : ''), { align: d.AlignmentType.LEFT })); }
          break;
      }
    });
    var S = SPRACHE[lang], ctx = kontext(fall, lang);
    var doc = new d.Document({
      creator: 'CDSE', title: S.titel + (ctx.vollname ? ' – ' + ctx.vollname : ''),
      styles: { default: { document: { run: { font: FONT, size: GR }, paragraph: { spacing: { line: 264 } } } } },
      numbering: undefined,
      sections: [{
        properties: { page: { margin: { top: 1134, bottom: 1134, left: 1247, right: 1134 } } },
        headers: { default: new d.Header({ children: [new d.Paragraph({ alignment: d.AlignmentType.RIGHT, children: [new d.TextRun({ text: S.titel + (ctx.vollname ? ' · ' + ctx.vollname : ''), size: 16, color: '777777', font: FONT })] })] }) },
        footers: { default: new d.Footer({ children: [new d.Paragraph({ alignment: d.AlignmentType.CENTER, children: [
          new d.TextRun({ text: S.vertraulich + '   ', size: 16, color: '777777', font: FONT }),
          new d.TextRun({ children: [d.PageNumber.CURRENT, ' / ', d.PageNumber.TOTAL_PAGES], size: 16, color: '777777', font: FONT })] })] }) },
        children: kinder
      }]
    });
    return d.Packer.toBlob(doc);
  }
  function dateiname(fall, lang) {
    var k = fall.kind || {}, heute = B.heute().replace(/-/g, '');
    var nach = String(k.nachname || 'Bericht').toUpperCase().replace(/[^A-ZÄÖÜ0-9-]+/g, '-'), vor = String(k.vorname || '').replace(/[^A-Za-zÄÖÜäöüßéèàçëïîôâû0-9-]+/g, '-');
    return heute + '_' + nach + (vor ? '_' + vor : '') + '_CDSE_' + ({ de: 'Befundbericht', fr: 'Rapport_evaluation', en: 'Assessment_report' }[lang] || 'Befundbericht') + '.docx';
  }
  return { kontext: kontext, aktiveTests: aktiveTests, testBloecke: testBloecke, bloecke: bloecke, html: html, docxBlob: docxBlob, dateiname: dateiname };
})();
