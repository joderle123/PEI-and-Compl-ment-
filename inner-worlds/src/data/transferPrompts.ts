// @ts-nocheck
import type { TransferPrompt } from '../types';

// =============================================================================
// Real-World Transfer Prompts
// =============================================================================
//
// Nach jedem Szenario erscheint ein optionaler "Br\u00FCcken-Prompt",
// der das Erlebte mit der realen Welt des Spielers verbindet.
//
// KEIN Zwang - der Spieler kann jederzeit \u00FCberspringen.
// Wenn ausgef\u00FCllt: +20 Bonus-XP + Weisheitskarte "Br\u00FCckenbauer"
// Gespeichert im Tagebuch.
// =============================================================================

export const transferPrompts: TransferPrompt[] = [
  // VULKAN
  {
    scenarioId: 'volcano-scenario-1',
    prompt: 'Kai hat gelernt, die Zeichen seiner Wut fr\u00FCh zu erkennen: schnelles Herz, hei\u00DFe Wangen, geballte F\u00E4uste. Was passiert in DEINEM K\u00F6rper, wenn du w\u00FCtend wirst?',
    hint: 'Es kann alles sein: ein enges Gef\u00FChl in der Brust, ein Klo\u00DF im Hals, zitternde H\u00E4nde, hei\u00DFe Ohren...',
  },
  {
    scenarioId: 'volcano-scenario-2',
    prompt: 'Ash hat entdeckt, dass unter seiner Wut eigentlich Traurigkeit und Angst stecken. Gibt es eine Situation in deinem Leben, in der du w\u00FCtend warst, aber eigentlich ein anderes Gef\u00FChl dahintersteckte?',
    hint: 'Manchmal sind wir w\u00FCtend, weil wir uns hilflos, verletzt, entt\u00E4uscht oder einsam f\u00FChlen.',
  },
  {
    scenarioId: 'volcano-scenario-3',
    prompt: 'Du hast gelernt, Ich-Botschaften zu benutzen: "Ich f\u00FChle mich verletzt, wenn..." statt "Du bist so gemein!". Kannst du dir eine Situation vorstellen, in der du das ausprobieren k\u00F6nntest?',
    hint: 'Denk an einen Streit oder Konflikt, den du in letzter Zeit hattest. Wie h\u00E4ttest du ihn mit einer Ich-Botschaft anders l\u00F6sen k\u00F6nnen?',
  },
  {
    scenarioId: 'volcano-scenario-4',
    prompt: 'Milo hat gelernt, dass es okay ist, Hilfe zu holen. Gibt es in deinem Leben jemanden, dem du vertraust und dem du etwas Schwieriges erz\u00E4hlen k\u00F6nntest?',
    hint: 'Das kann ein Elternteil, ein Lehrer, ein Freund, eine Tante oder auch eine Beratungsstelle sein.',
  },

  // OZEAN
  {
    scenarioId: 'ocean-scenario-1',
    prompt: 'Marina hat gelernt, dass Trauer in Wellen kommt - manchmal unerwartet, manchmal \u00FCberw\u00E4ltigend. Hast du schon einmal einen Verlust erlebt? Wie hat er sich angef\u00FChlt?',
    hint: 'Verlust muss nicht Tod bedeuten. Es kann ein Umzug sein, das Ende einer Freundschaft, der Verlust eines Haustiers...',
  },
  {
    scenarioId: 'ocean-scenario-2',
    prompt: 'Jonas hat bereut, dass er seinem Freund nie gesagt hat, wie wichtig er ihm ist. Gibt es jemanden in deinem Leben, dem du etwas Nettes sagen m\u00F6chtest - aber es noch nicht getan hast?',
    hint: 'Manchmal reicht ein einfaches: "Hey, ich wollte dir sagen, dass du mir wichtig bist."',
  },
  {
    scenarioId: 'ocean-scenario-3',
    prompt: 'Nour hat gelernt, dass ihre Trauer um Balu genauso wichtig ist wie jede andere Trauer. Hat schon mal jemand deine Gef\u00FChle kleingeredet? Wie hat sich das angef\u00FChlt?',
    hint: 'Wenn jemand sagt "Ist doch nicht so schlimm" oder "Stell dich nicht so an" - das tut weh.',
  },
  {
    scenarioId: 'ocean-scenario-4',
    prompt: 'Theo hat gelernt, dass die Trennung seiner Eltern nicht seine Schuld ist. Gibt es etwas in deinem Leben, wof\u00FCr du dir die Schuld gibst, obwohl es nicht deine Schuld ist?',
    hint: 'Kinder geben sich oft die Schuld an Dingen, die Erwachsene verursacht haben. Das ist normal - aber es ist nicht wahr.',
  },

  // WALD
  {
    scenarioId: 'forest-scenario-1',
    prompt: 'Yuki hat gelernt, dass Angst ein Schutzmechanismus ist, kein Versagen. Wovor hast DU Angst? Und was sagt dir diese Angst eigentlich?',
    hint: 'Angst sagt dir: "Hier ist etwas, das dir wichtig ist." Wenn du keine Angst vor dem Referat h\u00E4ttest, w\u00E4re es dir auch nicht wichtig, es gut zu machen.',
  },
  {
    scenarioId: 'forest-scenario-2',
    prompt: 'Tim hat gelernt, dass ein kleiner Schritt reicht. Welchen kleinen, mutigen Schritt k\u00F6nntest du MORGEN machen?',
    hint: 'Es muss nichts Gro\u00DFes sein. Jemanden gr\u00FC\u00DFen. Eine Frage im Unterricht stellen. Nein sagen, wenn du Nein meinst.',
  },
  {
    scenarioId: 'forest-scenario-3',
    prompt: 'Elif hat gelernt, dass Fehler Lernchancen sind. Was war dein letzter Fehler - und was hast du daraus gelernt?',
    hint: 'Jeder Mensch macht Fehler. Die Frage ist nicht "Wie vermeide ich Fehler?", sondern "Was mache ich mit ihnen?"',
  },
  {
    scenarioId: 'forest-scenario-4',
    prompt: 'Luis hat gelernt, dass es Menschen gibt, die ihn akzeptieren, wie er ist. Wer in deinem Leben akzeptiert dich so, wie du bist - ohne Maske, ohne Rolle?',
    hint: 'Wenn dir niemand einf\u00E4llt: Das ist okay. Aber vielleicht gibt es jemanden, dem du dich \u00F6ffnen k\u00F6nntest.',
  },

  // BERG
  {
    scenarioId: 'mountain-scenario-1',
    prompt: 'Lena hat gelernt, dass Social Media ein verzerrtes Bild zeigt. Wie f\u00FChlst du dich, nachdem du 30 Minuten auf Instagram oder TikTok warst? Besser oder schlechter?',
    hint: 'Achte mal darauf. Wenn du dich danach schlechter f\u00FChlst, ist das ein Zeichen, dass du vielleicht weniger scrollen solltest.',
  },
  {
    scenarioId: 'mountain-scenario-2',
    prompt: 'David hat gelernt, dass Liebe nicht an Leistung gebunden sein sollte. F\u00FChlt sich die Liebe deiner Eltern manchmal so an, als m\u00FCsstest du sie verdienen?',
    hint: 'Das ist ein schwieriges Thema. Wenn du dar\u00FCber reden m\u00F6chtest, sprich mit jemandem, dem du vertraust.',
  },
  {
    scenarioId: 'mountain-scenario-3',
    prompt: 'Emma hat gelernt, dass Nein sagen keine Schw\u00E4che ist. Wann hast du das letzte Mal Ja gesagt, obwohl du Nein meintest?',
    hint: 'Nein sagen ist schwer. Aber jedes Ja, das du nicht meinst, ist ein Nein zu dir selbst.',
  },
  {
    scenarioId: 'mountain-scenario-4',
    prompt: 'Sam hat gelernt, dass Identit\u00E4t ein Prozess ist. Gibt es einen Teil von dir, den du versteckst, weil du Angst hast, was andere denken?',
    hint: 'Du musst es niemandem erz\u00E4hlen. Aber erlaube dir, es vor dir selbst zuzugeben.',
  },

  // GARTEN
  {
    scenarioId: 'garden-scenario-1',
    prompt: 'Liam hat gelernt, dass hinter Wut oft Schmerz steckt. Hat dich jemand in letzter Zeit verletzt - und du hast mit Wut reagiert statt zu sagen, was dich wirklich verletzt hat?',
    hint: 'Manchmal reicht es zu sagen: "Das hat mich verletzt." Statt "Du bist so gemein."',
  },
  {
    scenarioId: 'garden-scenario-2',
    prompt: 'Hanna hat gelernt, toxische Freundschaften zu erkennen. Gibt es eine Beziehung in deinem Leben, in der du dich klein f\u00FChlst?',
    hint: 'Freundschaft sollte sich gut anf\u00FChlen - nicht stressig, kontrollierend oder einseitig.',
  },
  {
    scenarioId: 'garden-scenario-3',
    prompt: 'Sophie hat gelernt, dass Empathie nicht bedeutet, den Schmerz anderer zu \u00FCbernehmen. Wie sch\u00FCtzt du dich, wenn du jemandem hilfst?',
    hint: 'Es ist okay zu sagen: "Ich h\u00F6re dir zu, aber ich kann das nicht alleine tragen."',
  },
  {
    scenarioId: 'garden-scenario-4',
    prompt: 'Tom hat gelernt, dass eine ehrliche Entschuldigung mehr ist als "Sorry". Was geh\u00F6rt f\u00FCr dich zu einer echten Entschuldigung?',
    hint: 'Eine echte Entschuldigung benennt, was man falsch gemacht hat, zeigt Verst\u00E4ndnis und fragt: Was kann ich besser machen?',
  },

  // NACHT
  {
    scenarioId: 'night-scenario-1',
    prompt: 'Yuki hat gelernt, dass Scrollen eine Flucht vor der Stille ist. Was passiert, wenn DU dein Handy f\u00FCr eine Stunde weglegest?',
    hint: 'Probier es aus. Nur eine Stunde. Und schreib auf, was du f\u00FChlst. Langeweile? Unruhe? Ruhe? Freiheit?',
  },
  {
    scenarioId: 'night-scenario-2',
    prompt: 'Ben hat gelernt, dass Gaming manchmal eine Flucht ist. Gibt es etwas in deinem Leben, dem du ausweichst? Was w\u00E4re, wenn du es direkt anschaust?',
    hint: 'Flucht ist menschlich. Aber irgendwann muss man zur\u00FCckkommen. Und dann ist das Problem noch da.',
  },
  {
    scenarioId: 'night-scenario-3',
    prompt: 'Jule hat gelernt, dass Kontrolle aus Angst entsteht. Gibt es etwas in deinem Leben, das du zu sehr kontrollieren willst?',
    hint: 'Kontrolle f\u00FChlt sich sicher an. Aber sie kann andere ersticken - und dich selbst auch.',
  },
  {
    scenarioId: 'night-scenario-4',
    prompt: 'Alina hat gelernt, achtsam mit ihren Gedanken umzugehen. Wenn dein Kopf nicht aufh\u00F6rt zu denken: Was hilft DIR, ruhiger zu werden?',
    hint: 'Es kann alles sein: Musik h\u00F6ren, rausgehen, zeichnen, atmen, mit jemandem reden, Sport machen...',
  },

  // REGENBOGEN
  {
    scenarioId: 'rainbow-scenario-1',
    prompt: 'Amir hat gelernt, dass er nicht w\u00E4hlen muss zwischen seinen Kulturen. Gibt es Teile von dir, die du versteckst, weil sie nicht "dazugeh\u00F6ren"?',
    hint: 'Identit\u00E4t ist kein Entweder-Oder. Du kannst alles gleichzeitig sein.',
  },
  {
    scenarioId: 'rainbow-scenario-2',
    prompt: 'Noah hat gelernt, dass Schweigen auch eine Entscheidung ist. Hast du schon mal geschwiegen, obwohl du h\u00E4ttest etwas sagen sollen?',
    hint: 'Es ist schwer, aufzustehen. Aber Schweigen hilft dem T\u00E4ter, nicht dem Opfer.',
  },
  {
    scenarioId: 'rainbow-scenario-3',
    prompt: 'Mia hat gelernt, dass Allyship manchmal unbequem ist. W\u00FCrdest du f\u00FCr jemanden einstehen, auch wenn es dich etwas kosten k\u00F6nnte?',
    hint: 'Allyship hei\u00DFt nicht, perfekt zu sein. Es hei\u00DFt, es zu versuchen.',
  },
  {
    scenarioId: 'rainbow-scenario-4',
    prompt: 'Leyla hat gelernt, dass Hilfe annehmen keine Schw\u00E4che ist. F\u00E4llt es dir schwer, um Hilfe zu bitten? Warum?',
    hint: 'Hilfe annehmen zeigt, dass du dir selbst genug vertraust, um verletzlich zu sein.',
  },

  // ZUHAUSE
  {
    scenarioId: 'home-scenario-1',
    prompt: 'Kai und Liam haben sich vers\u00F6hnt. Gibt es jemanden in deinem Leben, mit dem du gerne wieder reden w\u00FCrdest?',
    hint: 'Manchmal reicht eine Nachricht: "Hey, ich vermisse dich."',
  },
  {
    scenarioId: 'home-scenario-2',
    prompt: 'Luis und Tom haben gelernt, dass Vergebung m\u00F6glich ist. Gibt es jemanden, dem du vergeben m\u00F6chtest - oder dir selbst?',
    hint: 'Vergeben hei\u00DFt nicht vergessen. Es hei\u00DFt: Ich lasse die Last los.',
  },
  {
    scenarioId: 'home-scenario-3',
    prompt: 'Noah hat gelernt, aufzustehen. Was ist EINE Sache, die du ab morgen anders machen m\u00F6chtest?',
    hint: 'Es muss nicht die Welt ver\u00E4ndern. Ein kleiner Schritt reicht.',
  },
  {
    scenarioId: 'home-scenario-4',
    prompt: 'Du hast dein Schatten-Selbst umarmt. Was hast du auf dieser ganzen Reise \u00FCber DICH gelernt?',
    hint: 'Nimm dir Zeit. Diese Antwort geh\u00F6rt nur dir.',
  },
];

/** Gibt den Transfer-Prompt f\u00FCr ein bestimmtes Szenario zur\u00FCck */
export const getTransferPrompt = (scenarioId: string): TransferPrompt | undefined =>
  transferPrompts.find((p) => p.scenarioId === scenarioId);
