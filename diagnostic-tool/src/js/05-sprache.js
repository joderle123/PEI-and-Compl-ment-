/* =====================================================================
   Berichtssprache: feste Bausteine des Berichts auf DE / FR / EN
   (Die Oberfläche ist deutsch; der Bericht kann in jeder der drei
   Sprachen erstellt werden.)
   ===================================================================== */
var SPRACHE = {
  de: {
    titel: 'Befundbericht', untertitel: 'Ergebnisse der psychologischen und pädagogischen Testdiagnostik',
    kind: 'Name', geb: 'Geburtsdatum', alterBei: 'Alter bei der Untersuchung', klasse: 'Klasse', schule: 'Schule',
    zeitraum: 'Untersuchung', verfasser: 'Verfasser/in', funktion: 'Funktion', erstellt: 'Bericht erstellt am',
    sprachen: 'Sprachen', familiensprache: 'Familiensprache(n)', schulsprache: 'Unterrichtssprache(n)',
    h: { anlass: 'Anlass und Fragestellung', verfahren: 'Eingesetzte Verfahren', beobachtung: 'Verhaltensbeobachtung',
      ergebnisse: 'Ergebnisse', zusammenfassung: 'Zusammenfassung', empfehlungen: 'Empfehlungen und weiteres Vorgehen',
      abklaerung: 'Hinweise für die weitere Abklärung', sicherheit: 'Hinweis zur Sicherheit' },
    spalten: { skala: 'Skala', wert: 'Wert', pr: 'PR', ki: 'KI', einstufung: 'Einstufung', index: 'Index', untertest: 'Untertest' },
    geschlecht: { m: 'männlich', w: 'weiblich', d: 'divers' },
    kindAllg: 'das Kind', jugendAllg: 'der/die Jugendliche',
    nichtErhoben: 'nicht erhoben', keineAngabe: 'keine Angabe',
    schlusshinweis: 'Die Ergebnisse von Fragebögen und Tests beruhen auf den Normen der jeweiligen Manuale. Sie beschreiben Auffälligkeiten und Stärken im Vergleich zur Normstichprobe und stellen für sich allein keine Diagnose dar. Sie sind im Zusammenhang mit Vorgeschichte, Beobachtung und Gesprächen zu bewerten.',
    vertraulich: 'Vertraulich – nur für die am Fall beteiligten Fachpersonen.',
    unterschrift: 'Unterschrift',
    ort: 'Ort, Datum'
  },
  fr: {
    titel: 'Rapport d’évaluation', untertitel: 'Résultats de l’évaluation psychologique et pédagogique',
    kind: 'Nom', geb: 'Date de naissance', alterBei: 'Âge lors de l’évaluation', klasse: 'Classe', schule: 'École',
    zeitraum: 'Évaluation', verfasser: 'Auteur·e', funktion: 'Fonction', erstellt: 'Rapport établi le',
    sprachen: 'Langues', familiensprache: 'Langue(s) familiale(s)', schulsprache: 'Langue(s) d’enseignement',
    h: { anlass: 'Motif et question posée', verfahren: 'Outils utilisés', beobachtung: 'Observation du comportement',
      ergebnisse: 'Résultats', zusammenfassung: 'Synthèse', empfehlungen: 'Recommandations et suite de la prise en charge',
      abklaerung: 'Pistes pour la suite de l’évaluation', sicherheit: 'Remarque concernant la sécurité' },
    spalten: { skala: 'Échelle', wert: 'Score', pr: 'Rang centile', ki: 'IC', einstufung: 'Classification', index: 'Indice', untertest: 'Subtest' },
    geschlecht: { m: 'masculin', w: 'féminin', d: 'divers' },
    kindAllg: 'l’enfant', jugendAllg: 'le/la jeune',
    nichtErhoben: 'non évalué', keineAngabe: 'non renseigné',
    schlusshinweis: 'Les résultats des questionnaires et des tests reposent sur les normes des manuels respectifs. Ils décrivent des difficultés et des ressources par rapport à l’échantillon de référence et ne constituent pas, à eux seuls, un diagnostic. Ils doivent être interprétés en lien avec l’anamnèse, l’observation et les entretiens.',
    vertraulich: 'Confidentiel – réservé aux professionnel·le·s impliqué·e·s dans la situation.',
    unterschrift: 'Signature',
    ort: 'Lieu, date'
  },
  en: {
    titel: 'Assessment Report', untertitel: 'Results of the psychological and educational assessment',
    kind: 'Name', geb: 'Date of birth', alterBei: 'Age at assessment', klasse: 'Class', schule: 'School',
    zeitraum: 'Assessment', verfasser: 'Author', funktion: 'Role', erstellt: 'Report date',
    sprachen: 'Languages', familiensprache: 'Home language(s)', schulsprache: 'Language(s) of instruction',
    h: { anlass: 'Reason for referral and questions', verfahren: 'Assessment tools', beobachtung: 'Behavioural observation',
      ergebnisse: 'Results', zusammenfassung: 'Summary', empfehlungen: 'Recommendations and next steps',
      abklaerung: 'Points for further assessment', sicherheit: 'Safety note' },
    spalten: { skala: 'Scale', wert: 'Score', pr: 'PR', ki: 'CI', einstufung: 'Classification', index: 'Index', untertest: 'Subtest' },
    geschlecht: { m: 'male', w: 'female', d: 'diverse' },
    kindAllg: 'the child', jugendAllg: 'the young person',
    nichtErhoben: 'not assessed', keineAngabe: 'not stated',
    schlusshinweis: 'Questionnaire and test results are based on the norms of the respective manuals. They describe difficulties and strengths compared with the normative sample and do not in themselves constitute a diagnosis. They need to be interpreted together with the history, observation and interviews.',
    vertraulich: 'Confidential – for the professionals involved in the case only.',
    unterschrift: 'Signature',
    ort: 'Place, date'
  }
};
/* Wer hat geantwortet? (Beurteiler) – Nominativ und „im …urteil“ */
var INFORMANTEN = {
  eltern: { de: 'Eltern', deUrteil: 'Elternurteil', deIm: 'im Elternurteil', fr: 'parents', frPar: 'selon les parents', frForme: 'version parents', en: 'parents', enBy: 'according to the parents', enForm: 'parent form' },
  mutter: { de: 'Mutter', deUrteil: 'Urteil der Mutter', deIm: 'im Urteil der Mutter', fr: 'mère', frPar: 'selon la mère', frForme: 'version parents (mère)', en: 'mother', enBy: 'according to the mother', enForm: 'parent form (mother)' },
  vater: { de: 'Vater', deUrteil: 'Urteil des Vaters', deIm: 'im Urteil des Vaters', fr: 'père', frPar: 'selon le père', frForme: 'version parents (père)', en: 'father', enBy: 'according to the father', enForm: 'parent form (father)' },
  lehrer: { de: 'Lehrkraft', deUrteil: 'Lehrerurteil', deIm: 'im Lehrerurteil', fr: 'enseignant·e', frPar: 'selon l’enseignant·e', frForme: 'version enseignant·e', en: 'teacher', enBy: 'according to the teacher', enForm: 'teacher form' },
  selbst: { de: 'Selbsturteil', deUrteil: 'Selbsturteil', deIm: 'im Selbsturteil', fr: 'autoévaluation', frPar: 'dans l’autoévaluation', frForme: 'autoquestionnaire', en: 'self-report', enBy: 'in the self-report', enForm: 'self-report form' },
  fachperson: { de: 'Fachperson', deUrteil: 'Urteil der Fachperson', deIm: 'im Urteil der Fachperson', fr: 'professionnel·le', frPar: 'selon le/la professionnel·le', frForme: 'évaluation clinique', en: 'clinician', enBy: 'according to the clinician', enForm: 'clinician rating' }
};
function infName(id, lang) { var i = INFORMANTEN[id] || {}; return lang === 'fr' ? i.fr : (lang === 'en' ? i.en : i.deUrteil); }
function infBei(id, lang) { var i = INFORMANTEN[id] || {}; return lang === 'fr' ? i.frPar : (lang === 'en' ? i.enBy : i.deIm); }
function infForm(id, lang) { var i = INFORMANTEN[id] || {}; return lang === 'fr' ? i.frForme : (lang === 'en' ? i.enForm : i.deUrteil); }

/* Sprachen (Familien-, Unterrichts- und Testsprache): gespeichert wird der Code,
   im Bericht steht der Name in der Berichtssprache – „auf Deutsch“, „en allemand“, „in German“. */
var SPRACHEN_LISTE = [
  ['lb', 'Luxemburgisch', 'luxembourgeois', 'Luxembourgish', ['luxemburgish', 'luxembourgish', 'lëtzebuergesch', 'letzebuergesch', 'luxemburgisch', 'lux']],
  ['de', 'Deutsch', 'allemand', 'German', ['deutsch', 'german', 'allemand']],
  ['fr', 'Französisch', 'français', 'French', ['franzoesisch']],
  ['en', 'Englisch', 'anglais', 'English', []],
  ['pt', 'Portugiesisch', 'portugais', 'Portuguese', ['portugues', 'português']],
  ['it', 'Italienisch', 'italien', 'Italian', ['italiano']],
  ['es', 'Spanisch', 'espagnol', 'Spanish', ['español', 'espanol']],
  ['nl', 'Niederländisch', 'néerlandais', 'Dutch', ['niederlaendisch', 'holländisch', 'hollaendisch', 'flämisch', 'flamand']],
  ['sq', 'Albanisch', 'albanais', 'Albanian', ['shqip']],
  ['bks', 'Bosnisch/Kroatisch/Serbisch', 'bosnien/croate/serbe', 'Bosnian/Croatian/Serbian', ['bosnisch', 'kroatisch', 'serbisch', 'serbokroatisch', 'bosnien', 'croate', 'serbe', 'bosnian', 'croatian', 'serbian', 'bks', 'bcs']],
  ['ar', 'Arabisch', 'arabe', 'Arabic', []],
  ['tr', 'Türkisch', 'turc', 'Turkish', ['tuerkisch', 'turque']],
  ['ru', 'Russisch', 'russe', 'Russian', []],
  ['uk', 'Ukrainisch', 'ukrainien', 'Ukrainian', []],
  ['pl', 'Polnisch', 'polonais', 'Polish', []],
  ['ro', 'Rumänisch', 'roumain', 'Romanian', ['rumaenisch']],
  ['kea', 'Kapverdisch (Kriolu)', 'créole cap-verdien (kriolu)', 'Cape Verdean Creole (Kriolu)', ['kapverdisch', 'kriolu', 'crioulo', 'cap-verdien', 'capverdien', 'cape verdean']],
  ['fa', 'Persisch (Farsi/Dari)', 'persan (farsi/dari)', 'Persian (Farsi/Dari)', ['persisch', 'farsi', 'dari', 'persan', 'persian']],
  ['ku', 'Kurdisch', 'kurde', 'Kurdish', []],
  ['ti', 'Tigrinya', 'tigrigna', 'Tigrinya', ['tigrinisch']],
  ['so', 'Somali', 'somali', 'Somali', []],
  ['zh', 'Chinesisch', 'chinois', 'Chinese', ['mandarin']]
];
function spracheName(code, lang) {
  var s = SPRACHEN_LISTE.filter(function (x) { return x[0] === code; })[0];
  if (!s) { return String(code || ''); }
  return lang === 'fr' ? s[2] : (lang === 'en' ? s[3] : s[1]);
}
/* Freitext („Portugiesisch“, „portugais“, „pt“) → Code, sonst null */
function spracheErkennen(text) {
  var t = String(text || '').trim().toLowerCase();
  if (!t) { return null; }
  var s = SPRACHEN_LISTE.filter(function (x) {
    return x[0] === t || x[1].toLowerCase() === t || x[2].toLowerCase() === t || x[3].toLowerCase() === t || x[4].indexOf(t) >= 0;
  })[0];
  return s ? s[0] : null;
}
/* Freitext in einzelne Sprachen zerlegen: bekannte → Code, unbekannte bleiben Text */
function sprachenZerlegen(text) {
  var codes = [], rest = [];
  String(text || '').split(/\s*(?:,|;|\+|\/|&|\bund\b|\bet\b|\band\b)\s*/i).forEach(function (teil) {
    teil = teil.trim(); if (!teil) { return; }
    var c = spracheErkennen(teil);
    if (c) { if (codes.indexOf(c) < 0) { codes.push(c); } } else if (rest.indexOf(teil) < 0) { rest.push(teil); }
  });
  return { codes: codes, rest: rest };
}
/* „Portugiesisch und Luxemburgisch“ – Codes + frei eingegebene weitere Sprachen */
function sprachenText(codes, andere, lang) {
  var namen = (Array.isArray(codes) ? codes : (codes ? [codes] : [])).map(function (c) { return spracheName(c, lang); });
  var z = sprachenZerlegen(andere);
  z.codes.forEach(function (c) { var n = spracheName(c, lang); if (namen.indexOf(n) < 0) { namen.push(n); } });
  z.rest.forEach(function (r) { if (namen.indexOf(r) < 0) { namen.push(r); } });
  return B.liste(namen, lang);
}
/* Eine Sprache (Code oder alter Freitext) für den Fließtext */
function spracheText(wert, lang) {
  if (!wert) { return ''; }
  var c = SPRACHEN_LISTE.some(function (x) { return x[0] === wert; }) ? wert : spracheErkennen(wert);
  return c ? spracheName(c, lang) : String(wert);
}
