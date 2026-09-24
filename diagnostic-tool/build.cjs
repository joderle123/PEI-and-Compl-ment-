#!/usr/bin/env node
// Baut das Befund-Tool (Screening) als EINE HTML-Datei: diagnostic-tool/index.html
// Warum eine Datei: Die App liegt auf O:\ und läuft im CDSE Hub oder per Doppelklick –
// ohne Webserver und ohne Internet. Deshalb steckt alles in der Datei:
// Stile, Schriften, Bibliotheken (docx für Word) und Programmcode.
//
// Aufruf:  node diagnostic-tool/build.cjs            baut die Datei
//          node diagnostic-tool/build.cjs --pruefen  baut und prüft zusätzlich die Syntax
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const SRC = path.join(__dirname, 'src');
const ZIEL = path.join(__dirname, 'index.html');
const lies = p => fs.readFileSync(path.join(SRC, p), 'utf8');

// Reihenfolge ist wichtig: die App ist ein einziges klassisches Skript.
const STILE = fs.readdirSync(path.join(SRC, 'styles')).filter(f => f.endsWith('.css')).sort();
const BIBLIOTHEKEN = ['lib/docx.umd.js', 'lib/FileSaver.min.js'];
const PROGRAMM = fs.readdirSync(path.join(SRC, 'js')).filter(f => f.endsWith('.js')).sort();

// "</script" darf in eingebettetem Code nicht vorkommen
const sicher = js => js.replace(/<\/script/gi, '<\\/script');

let html = lies('shell.html');
const css = STILE.map(f => '/* ---- ' + f + ' ---- */\n' + lies('styles/' + f)).join('\n');
const programm = PROGRAMM.map(f => '// ==== ' + f + ' ====\n' + lies('js/' + f)).join('\n');
const skripte =
  BIBLIOTHEKEN.map(f => '<script>/* ' + f + ' */\n' + sicher(lies(f)) + '\n</script>').join('\n') + '\n' +
  '<script>\n' + sicher(programm) + '\n</script>\n';

if (html.indexOf('/*@@CSS@@*/') < 0 || html.indexOf('<!--@@SKRIPTE@@-->') < 0) { throw new Error('Platzhalter in shell.html fehlen'); }
html = html.replace('/*@@CSS@@*/', () => css).replace('<!--@@SKRIPTE@@-->', () => skripte);
fs.writeFileSync(ZIEL, html);
console.log('✓ ' + path.relative(process.cwd(), ZIEL) + ' (' + Math.round(html.length / 1024) + ' KB, ' + PROGRAMM.length + ' Programmteile)');

if (process.argv.includes('--pruefen')) {
  new vm.Script(programm, { filename: 'programm.js' });
  console.log('✓ Syntax des Programms in Ordnung');
}
