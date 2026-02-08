// @ts-nocheck
// =============================================================================
// Garteninsel (Garden Island) – Beziehungen, Grenzen & Kommunikation
// Inner Worlds – Social-Emotional Learning Game
//
// Alle Texte auf Deutsch, warmherzig und auf Augenhoehe fuer 10-15-Jaehrige.
// Therapeutisch fundiert: Beziehungsgestaltung, Grenzen setzen,
// aktives Zuhoeren, Perspektivuebernahme, Konfliktloesung, Vertrauen.
//
// Referenzen zu vorherigen Inseln:
//   - Vulkan (Wut/Anger management)
//   - Ozean (Trauer/Verlust)
//   - Wald (Angst/Mut)
//   - Berg (Selbstwert/Identitaet)
// =============================================================================

import type { Scenario, WisdomCard, Activity, IslandId } from '../../../types';

// -----------------------------------------------------------------------------
// Local Types
// -----------------------------------------------------------------------------

interface GardenActivity extends Activity {
  instructions: string[];
}

interface GardenNPC {
  id: string;
  name: string;
  emoji: string;
  description: string;
  backstory: string;
}

// =============================================================================
// 1. NPCs
// =============================================================================

export const gardenNPCs: GardenNPC[] = [
  {
    id: 'flora',
    name: 'Flora',
    emoji: '🌿',
    description: 'Die weise Gaertnerin, die mehr sieht als sie zugibt',
    backstory: 'Flora lebt seit so langer Zeit im Garten, dass niemand sich erinnert, wann sie angekommen ist. Sie spricht mit jeder Pflanze, kennt jede Wurzel und jeden Dorn. Aber Flora war nicht immer so gelassen. Als Teenager hat sie selbst Freundschaften zerstoert, weil sie nicht wusste, wie man ehrlich kommuniziert, ohne zu verletzen. Heute sagt sie: "Beziehungen sind wie Pflanzen - du kannst sie nicht zum Wachsen zwingen, aber du kannst ihnen die richtigen Bedingungen geben." Sie hat einen trockenen Humor, der manchmal wehtut - aber immer mit Absicht.'
  },
  {
    id: 'bluete',
    name: 'Bluete',
    emoji: '🌻',
    description: 'Die Sonnenblume, die allen gefallen will - bis sie dabei fast eingeht',
    backstory: 'Bluete ist die freundlichste Pflanze im ganzen Garten. Sie dreht sich immer zur Sonne, egal wo die steht - und genauso dreht sie sich immer zu dem Menschen, der gerade etwas von ihr braucht. Das Problem? Sie hat noch nie in ihrem Leben Nein gesagt. Nicht als die Rosen ihr Wasser klauten. Nicht als die Kletterpflanzen sie als Stuetze benutzten. Nicht als sie vor Erschoepfung fast verdorrte. Auf der Berginsel haette Summit ihr gesagt: Du bist genug, auch ohne dich aufzuopfern. Bluete muss das noch lernen.'
  },
  {
    id: 'dorni',
    name: 'Dorni',
    emoji: '🌵',
    description: 'Der Kaktus mit den scharfen Stacheln und dem weichen Kern',
    backstory: 'Dorni ist laut, stachelig und hat fuer alles einen sarkastischen Kommentar. Klingt bekannt? Auf der Vulkaninsel haette Ash ihn sofort als Seelenverwandten erkannt. Dornis Stacheln sind sein Schutzschild - er wurde zu oft verletzt und hat beschlossen, dass Naehe ueberbewertet ist. Was er nicht zugeben wuerde: Nachts, wenn der Garten still ist, wuenscht er sich nichts sehnlicher als jemanden, der trotz der Stacheln bleibt. Unter der ganzen Abwehr steckt ein Herz, das vor Einsamkeit fast platzt.'
  },
  {
    id: 'wurzel',
    name: 'Wurzel',
    emoji: '🌱',
    description: 'Der neue Setzling, der noch nicht weiss, wohin er gehoert',
    backstory: 'Wurzel ist erst vor kurzem im Garten angekommen - umgetopft aus einem anderen Garten, wo es nicht gut lief. Die anderen Pflanzen dort haben ihn ausgelacht, weil er anders wuchs als sie. Seitdem traut er niemandem mehr so richtig. Er steht am Rand, beobachtet alles und fragt sich, ob er jemals dazugehoeren wird. Wurzel kennt die Angst aus dem Wald nur zu gut - aber seine Angst hat einen Namen: Ablehnung. Was er noch nicht weiss: Manchmal muss man Wurzeln schlagen, um zu wachsen. Und dafuer braucht man den Mut, sich einzulassen.'
  }
];

// =============================================================================
// 2. SCENARIOS
// =============================================================================

export const gardenScenarios: Scenario[] = [
  // ---------------------------------------------------------------------------
  // Scenario 1 – Der Streit im Gewaechshaus
  // Thema: Konflikte loesen, aktives Zuhoeren, Kompromisse finden
  // Schwierigkeit: Einstieg
  // ---------------------------------------------------------------------------
  {
    id: 'garden-scenario-1',
    islandId: 'garden' as IslandId,
    title: 'Der Streit im Gewaechshaus',
    description: 'Bluete und Dorni streiten sich um den besten Platz im Gewaechshaus. Beide haben gute Gruende - aber keiner hoert dem anderen zu. Klingt nach einem normalen Dienstag.',
    scenes: [
      {
        id: 'g1-s1',
        text: 'Du betrittst den Garten und hoerst sofort Geschrei. Na gut, so laut Pflanzen eben schreien koennen. Bluete und Dorni stehen sich gegenueber, und zwischen ihnen liegt der sonnigste Platz im ganzen Gewaechshaus. "ICH war zuerst hier!", ruft Bluete, was ungewoehnlich ist - normalerweise wuerde sie einfach nachgeben. "Und ICH brauche die Sonne mehr!", kontert Dorni mit ausgefahrenen Stacheln. Flora steht daneben, die Arme verschraenkt, und schaut dich an. "Ah, Verstaerkung. Gut. Die beiden hoeren mir naemlich nicht zu."',
        choices: [
          { text: 'Zwischen die beiden treten und ruhig sagen: "Hey, Pause. Ich moechte verstehen, worum es wirklich geht."', nextSceneId: 'g1-s2', empathyPoints: 3, insightPoints: 1, couragePoints: 2 },
          { text: 'Erstmal beide beobachten und versuchen herauszufinden, was hinter dem Streit steckt.', nextSceneId: 'g1-s2', empathyPoints: 1, insightPoints: 3, couragePoints: 0 },
          { text: 'Dorni sagen, er soll seine Stacheln einfahren - so kann man doch nicht diskutieren.', nextSceneId: 'g1-s2', empathyPoints: 0, insightPoints: 1, couragePoints: 3 }
        ]
      },
      {
        id: 'g1-s2',
        text: 'Flora nickt dir zu. "Guter Anfang." Sie dreht sich zu Bluete und Dorni. "Regel Nummer eins im Garten: Jeder darf ausreden. Ohne Unterbrechung. Ohne Augenrollen." Dorni schnaubt. "Seit wann haben Pflanzen Augen zum Rollen?" Flora ignoriert das. "Bluete, du zuerst." Bluete schluckt nervoes. "Ich... ich brauche die Sonne, weil ich ohne sie nicht bluehen kann. Und wenn ich nicht bluehe, fuehle ich mich..." Sie stockt. "...wertlos." Das Wort haengt in der Luft. Auf der Berginsel haette Echo verstanden, was sie meint.',
        choices: [
          { text: '"Bluete, danke dass du das sagst. Das braucht Mut. Dorni, kannst du in eigenen Worten wiederholen, was Bluete gesagt hat?"', nextSceneId: 'g1-s3', empathyPoints: 3, insightPoints: 2, couragePoints: 1 },
          { text: '"Wertlos? Das kenne ich. Auf der Berginsel habe ich gelernt, dass unser Wert nicht davon abhaengt, wie wir nach aussen wirken."', nextSceneId: 'g1-s3', empathyPoints: 2, insightPoints: 3, couragePoints: 0 },
          { text: '"Okay Bluete, verstanden. Dorni, jetzt du - was ist dein Grund?"', nextSceneId: 'g1-s3', empathyPoints: 1, insightPoints: 1, couragePoints: 2 }
        ]
      },
      {
        id: 'g1-s3',
        text: 'Dorni ist ueberraschend still. Dann, leise: "Ich brauche die Sonne, weil... weil meine Stacheln ohne Waerme bruechig werden. Und ohne meine Stacheln bin ich..." Er bricht ab. Schutzlos. Das wollte er sagen. Flora legt sanft eine Hand auf seinen Stamm. "Siehst du, Bluete? Dorni hat auch Angst. Andere Angst als du - aber genauso echt." Bluete schaut Dorni an, als saehe sie ihn zum ersten Mal. "Ich wusste nicht, dass deine Stacheln... Ich dachte, die sind nur da, um andere fernzuhalten."',
        choices: [
          { text: '"Manchmal schuetzen wir uns auf eine Art, die andere nicht verstehen. Im Wald habe ich gelernt: Hinter Abwehr steckt oft Angst."', nextSceneId: 'g1-s4', empathyPoints: 2, insightPoints: 3, couragePoints: 1 },
          { text: 'Dorni direkt fragen: "Stimmt das? Benutzt du deine Stacheln manchmal auch, um Leute auf Abstand zu halten?"', nextSceneId: 'g1-s4', empathyPoints: 1, insightPoints: 2, couragePoints: 3 },
          { text: 'Beiden sagen: "Ihr habt gerade etwas Wichtiges geteilt. Merkt ihr, dass ihr euch aehnlicher seid, als ihr dachtet?"', nextSceneId: 'g1-s4', empathyPoints: 3, insightPoints: 2, couragePoints: 0 }
        ]
      },
      {
        id: 'g1-s4',
        text: 'Stille. Die unbequeme, ehrliche Art von Stille. Dann sagt Dorni: "Ja. Okay. Vielleicht nutze ich meine Stacheln manchmal als... Mauer. Wie Ash auf der Vulkaninsel seine Wut benutzt hat." Flora laechelt. "Und jetzt die eigentliche Frage: Was machen wir mit dem Sonnplatz? Denn das Problem ist ja immer noch da." Sie schaut dich an. "Hast du eine Idee, wie beide bekommen koennten, was sie brauchen?"',
        choices: [
          { text: '"Wie waere es mit einem Zeitplan? Morgens Bluete, nachmittags Dorni - und in der Mitte koenntet ihr die Zeit zusammen verbringen."', nextSceneId: 'g1-s5', empathyPoints: 2, insightPoints: 3, couragePoints: 1 },
          { text: '"Vielleicht koennten wir den Platz so umgestalten, dass beide gleichzeitig genug Sonne bekommen?"', nextSceneId: 'g1-s5', empathyPoints: 1, insightPoints: 3, couragePoints: 2 },
          { text: '"Die beste Loesung ist eine, die ihr zusammen findet. Was schlagt IHR vor?"', nextSceneId: 'g1-s5', empathyPoints: 3, insightPoints: 1, couragePoints: 2 }
        ]
      },
      {
        id: 'g1-s5',
        text: 'Bluete und Dorni schauen sich an. Zum ersten Mal ohne Vorwuerfe. "Ich... koennte morgens kommen", sagt Bluete vorsichtig. "Und ich nachmittags", ergaenzt Dorni. Dann, noch leiser: "Und vielleicht... koenntest du mir zeigen, wie man blueht? Also, bildlich gesprochen. Wie man... offener wird?" Bluete strahlt. Woertlich - ihre Bluetenblaetter leuchten golden. "Und du koenntest mir zeigen, wie man sich schuetzt, ohne dabei gemein zu sein." Flora wischt sich ueber die Augen. "Ich schwitze nicht, ich bin geruehrt."',
        choices: [
          { text: '"Das ist grossartig. Ihr habt gerade aus einem Streit eine Freundschaft gemacht. Das braucht echten Mut."', nextSceneId: 'g1-s6', empathyPoints: 3, insightPoints: 1, couragePoints: 1 },
          { text: '"Seht ihr? Wenn man wirklich zuhoert, findet man heraus, dass hinter jedem Konflikt ein Beduerfnis steckt."', nextSceneId: 'g1-s6', empathyPoints: 1, insightPoints: 3, couragePoints: 1 },
          { text: '"Ich finde es stark, dass ihr beide verletzlich wart. Das ist schwerer als streiten."', nextSceneId: 'g1-s6', empathyPoints: 2, insightPoints: 1, couragePoints: 3 }
        ]
      },
      {
        id: 'g1-s6',
        text: 'Flora klopft dir auf die Schulter. "Weisst du, was du gerade gemacht hast? Du hast nicht den Streit geloest. Du hast zwei Pflanzen geholfen, sich gegenseitig zu SEHEN. Das ist der Unterschied zwischen einem Kompromiss und einer echten Loesung." Sie zeigt auf den Sonnplatz, wo Bluete und Dorni jetzt nebeneinander stehen - nicht perfekt, aber naeher als je zuvor. "Im Garten der Beziehungen geht es nie um den Sonnplatz. Es geht immer um das, was darunter liegt." Dornis Stacheln sind ein kleines bisschen weicher geworden. Nur ein kleines bisschen. Aber es ist ein Anfang.',
        choices: [
          { text: '"Flora hat recht. Konflikte sind nie nur das, was man an der Oberflaeche sieht. Ich nehme mir vor, oefter nachzufragen, was wirklich los ist."', nextSceneId: null, empathyPoints: 2, insightPoints: 3, couragePoints: 1 },
          { text: '"Ich habe heute gelernt, dass Zuhoeren manchmal wichtiger ist als Loesungen anbieten."', nextSceneId: null, empathyPoints: 3, insightPoints: 2, couragePoints: 0 },
          { text: '"Der schwierigste Teil war, ruhig zu bleiben, als beide wuetend waren. Aber es hat sich gelohnt."', nextSceneId: null, empathyPoints: 1, insightPoints: 1, couragePoints: 3 }
        ]
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // Scenario 2 – Nein ist ein ganzer Satz
  // Thema: Grenzen setzen, Selbstfuersorge, People-Pleasing
  // Schwierigkeit: Mittel
  // ---------------------------------------------------------------------------
  {
    id: 'garden-scenario-2',
    islandId: 'garden' as IslandId,
    title: 'Nein ist ein ganzer Satz',
    description: 'Bluete hilft allen, bis sie selbst fast verdorrt. Kennst du jemanden, der immer Ja sagt und dabei vergisst, auf sich selbst zu achten? Vielleicht kennst du diese Person sogar aus dem Spiegel.',
    scenes: [
      {
        id: 'g2-s1',
        text: 'Du findest Bluete am fruehen Morgen - und sie sieht furchtbar aus. Ihre Blaetter haengen schlaff, ihre Farbe ist blass, und sie zittert leicht. "Alles gut!", sagt sie mit einem gezwungenen Laecheln, das so ueberzeugend ist wie ein Regenschirm aus Papier. Flora steht mit verschraenkten Armen daneben. "Erzaehl mal. Was hast du gestern alles gemacht?" Bluete zaehlt auf: den Rosen beim Umtopfen geholfen, Wurzels Beet gejaetet, Dornis Stacheln poliert, die Hecke frisiert... "Und wann hast du zuletzt getrunken?", fragt Flora. Stille. "...Vorgestern?"',
        choices: [
          { text: '"Bluete, du siehst aus wie ich nach drei Klausuren am selben Tag. Das ist nicht okay. Wann hast du zuletzt etwas fuer DICH getan?"', nextSceneId: 'g2-s2', empathyPoints: 3, insightPoints: 1, couragePoints: 1 },
          { text: '"Moment - du hast allen geholfen, aber vergessen, dich selbst zu giessen? Warum?"', nextSceneId: 'g2-s2', empathyPoints: 1, insightPoints: 3, couragePoints: 1 },
          { text: 'Ihr sofort Wasser bringen und sagen: "Erstmal trinken, dann reden wir."', nextSceneId: 'g2-s2', empathyPoints: 2, insightPoints: 0, couragePoints: 2 }
        ]
      },
      {
        id: 'g2-s2',
        text: 'Bluete nippt am Wasser und seufzt. "Ich konnte nicht Nein sagen. Die Rosen sahen so hilflos aus. Und Wurzel ist neu, der braucht mich. Und Dorni..." Sie stockt. "Wenn ich nicht helfe, was bin ich dann noch?" Flora setzt sich neben sie. "Bluete, hoer mal zu. Auf der Berginsel gibt es jemanden namens Echo, der sich staendig mit anderen vergleicht. Und weisst du, was er gelernt hat? Dass dein Wert nicht davon abhaengt, was du fuer andere tust." Bluetes Augen werden feucht. "Aber wenn ich Nein sage... werden sie mich dann noch moegen?"',
        choices: [
          { text: '"Das ist die Angst, die da spricht. Ich kenne das - diese Stimme, die sagt: Du bist nur liebenswert, wenn du etwas leistest. Aber das stimmt nicht."', nextSceneId: 'g2-s3', empathyPoints: 3, insightPoints: 2, couragePoints: 1 },
          { text: '"Lass mich ehrlich sein: Wenn jemand dich nur mag, weil du immer Ja sagst, dann mag er nicht DICH - sondern deinen Service."', nextSceneId: 'g2-s3', empathyPoints: 1, insightPoints: 3, couragePoints: 2 },
          { text: '"Bluete, echte Freunde respektieren dein Nein. Und wenn nicht, dann sind es keine echten Freunde."', nextSceneId: 'g2-s3', empathyPoints: 2, insightPoints: 2, couragePoints: 2 }
        ]
      },
      {
        id: 'g2-s3',
        text: 'Flora klatscht in die Haende. "Theorie reicht nicht. Wir ueben das jetzt." Sie dreht sich zu dir. "Stell Bluete eine Bitte. Irgendetwas Harmloses. Und Bluete - du sagst Nein. Einfach Nein. Ohne Erklaerung, ohne Entschuldigung." Bluete wird blass. Blasser als sie eh schon ist. "Einfach... Nein?" Flora grinst. "Nein ist ein ganzer Satz, Schaetzchen. Er braucht kein Aber, kein Tut-mir-leid und keinen dreiseitigen Aufsatz als Begruendung."',
        choices: [
          { text: '"Bluete, koenntest du mir helfen, mein Beet umzugraben?" (Sie soll Nein sagen.)', nextSceneId: 'g2-s4', empathyPoints: 2, insightPoints: 2, couragePoints: 2 },
          { text: '"Bluete, haettest du Lust, morgen beim Fruehstueck zu helfen?" (Eine leichtere Bitte, um den Einstieg sanft zu machen.)', nextSceneId: 'g2-s4', empathyPoints: 3, insightPoints: 1, couragePoints: 0 },
          { text: '"Vielleicht sollten wir erstmal darueber reden, warum Nein sagen so schwer ist, bevor wir ueben."', nextSceneId: 'g2-s4', empathyPoints: 1, insightPoints: 3, couragePoints: 0 }
        ]
      },
      {
        id: 'g2-s4',
        text: 'Bluete oeffnet den Mund. Schliesst ihn wieder. Oeffnet ihn. "N... Ne... Ich-" Sie schluckt. Dann, ganz leise, fast fluesternd: "Nein." Stille. Die Welt geht nicht unter. Niemand schreit. Niemand laeuft weg. "Nein", wiederholt Bluete, diesmal etwas lauter. Und dann, zum dritten Mal, mit einem kleinen Laecheln: "Nein." Flora applaudiert uebertrieben. "Da ist es! Ein Nein! Frisch aus der Fabrik! Und schau - alle sind noch da. Keiner hasst dich. Die Erde dreht sich weiter."',
        choices: [
          { text: '"Bluete, das war mutig! Weisst du, auf der Vulkaninsel habe ich gelernt, dass Gefuehle rauslassen wichtig ist. Dein Nein ist auch ein Gefuehl - es sagt: Ich bin mir selbst wichtig."', nextSceneId: 'g2-s5', empathyPoints: 2, insightPoints: 3, couragePoints: 1 },
          { text: '"Wie fuehlt es sich an? Ernst gemeint - beschreib das Gefuehl."', nextSceneId: 'g2-s5', empathyPoints: 3, insightPoints: 2, couragePoints: 0 },
          { text: '"Siehst du? Ich bin nicht boese. Dein Nein hat unsere Beziehung nicht kaputt gemacht - es hat sie ehrlicher gemacht."', nextSceneId: 'g2-s5', empathyPoints: 2, insightPoints: 2, couragePoints: 2 }
        ]
      },
      {
        id: 'g2-s5',
        text: 'Dorni kommt vorbeigeschlendert. "Hey Bluete, kannst du mir bei-" Er stoppt, als er ihren Zustand sieht. "Wow, du siehst aus wie nach einer Woche ohne Regen." Flora hebt eine Augenbraue. "Perfektes Timing, Dorni. Bluete uebt gerade, Grenzen zu setzen. Willst du ihr dabei helfen?" Dorni schaut verwirrt. "Grenzen? Pfff, kein Problem. Ich setze die ganze Zeit Grenzen. Deshalb hat ja keiner-" Er bricht ab. "...keiner kommt an mich ran", beendet er leise. Flora laechelt wissend. "Siehst du? Bluete hat keine Grenzen, du hast zu viele. Ihr koenntet voneinander lernen."',
        choices: [
          { text: '"Das stimmt! Bluete, du koenntest von Dornis Stacheln lernen - nicht alle, aber ein paar. Und Dorni, du koenntest von Bluetes Offenheit lernen."', nextSceneId: 'g2-s6', empathyPoints: 3, insightPoints: 2, couragePoints: 1 },
          { text: '"Gesunde Grenzen liegen irgendwo zwischen Bluetes Null und Dornis Mauer. Es geht um Balance."', nextSceneId: 'g2-s6', empathyPoints: 1, insightPoints: 3, couragePoints: 1 },
          { text: '"Dorni, vielleicht ist das hier eine Chance fuer euch beide. Traust du dich, einen Stachel einzufahren, waehrend Bluete einen aufstellt?"', nextSceneId: 'g2-s6', empathyPoints: 2, insightPoints: 1, couragePoints: 3 }
        ]
      },
      {
        id: 'g2-s6',
        text: 'Spaeter am Abend sitzt Bluete allein am Teich. Aber diesmal nicht, weil sie erschoepft ist - sondern weil sie es GEWAEHLT hat. "Ich habe heute dreimal Nein gesagt", erzaehlt sie dir mit leuchtenden Augen. "Und weisst du was? Beim dritten Mal hat es sich nicht mal mehr komisch angefuehlt." Flora, die hinter einem Busch gelauscht hat (sie behauptet, sie hat gegossen), tritt hervor. "Selbstfuersorge ist nicht egoistisch, Bluete. Du kannst keinen Garten giessen, wenn deine eigene Giesskanne leer ist." Dorni ruft aus der Ferne: "Und manchmal muss man Stacheln haben, um die Giesskanne zu verteidigen!" Alle lachen. Sogar Dorni.',
        choices: [
          { text: '"Bluete, du hast heute etwas Riesiges gelernt: Nein zu sagen ist Selbstliebe in Aktion. Und das veraendert alle deine Beziehungen zum Besseren."', nextSceneId: null, empathyPoints: 2, insightPoints: 3, couragePoints: 1 },
          { text: '"Ich nehme mir das auch zu Herzen. Wie oft sage ich selbst Ja, obwohl ich Nein meine? Ab heute uebe ich mit."', nextSceneId: null, empathyPoints: 3, insightPoints: 1, couragePoints: 2 },
          { text: '"Der mutigste Moment heute war dein erstes Nein. Dieser Moment hat alles veraendert."', nextSceneId: null, empathyPoints: 1, insightPoints: 2, couragePoints: 3 }
        ]
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // Scenario 3 – Wurzeln schlagen
  // Thema: Vertrauen aufbauen, Zugehoerigkeit, Neuanfaenge
  // Schwierigkeit: Mittel
  // ---------------------------------------------------------------------------
  {
    id: 'garden-scenario-3',
    islandId: 'garden' as IslandId,
    title: 'Wurzeln schlagen',
    description: 'Wurzel ist neu im Garten und vertraut niemandem. Nicht weil er gemein ist, sondern weil er zu oft verletzt wurde. Wie baut man Vertrauen auf, wenn man gelernt hat, dass Vertrauen wehtut?',
    scenes: [
      {
        id: 'g3-s1',
        text: 'Am Rand des Gartens steht ein kleiner Setzling. Allein. Nicht weil er keinen Platz hat, sondern weil er sich nicht traut, Wurzeln zu schlagen. "Das ist Wurzel", fluestert Flora dir zu. "Seit zwei Wochen hier. Hat mit niemandem gesprochen. Nicht einmal mit mir." Du schaust genauer hin: Seine kleinen Blaetter zittern leicht. Nicht vom Wind. "Im alten Garten haben sie ihn ausgelacht", erklaert Flora. "Gesagt, er waechst falsch. Zu krumm, zu klein, zu anders." Aus dem Wald kennst du dieses Gefuehl - Angst, die sich als Stille verkleidet.',
        choices: [
          { text: 'Langsam zu Wurzel gehen, dich auf seine Hoehe setzen und einfach da sein. Nichts sagen, nur dasitzen.', nextSceneId: 'g3-s2', empathyPoints: 3, insightPoints: 2, couragePoints: 1 },
          { text: '"Hey, ich bin auch relativ neu hier. Darf ich mich zu dir setzen?"', nextSceneId: 'g3-s2', empathyPoints: 2, insightPoints: 1, couragePoints: 3 },
          { text: 'Flora fragen: "Was braucht er? Wie kann ich helfen, ohne ihn zu bedraengen?"', nextSceneId: 'g3-s2', empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
        ]
      },
      {
        id: 'g3-s2',
        text: 'Wurzel schaut dich misstrauisch an. "Was willst du?" Kein Hallo, kein Laecheln. Nur Misstrauen. Aber er ist nicht weggelaufen - das ist schon etwas. "Alle kommen her und sagen: Sei doch nicht so schuechtern! Oder: Du musst dich oeffnen! Als waere das so einfach wie einen Wasserhahn aufdrehen." Er zupft nervoes an einem Blatt. "In meinem alten Garten hat ein grosser Baum gesagt, ich kann sein Freund sein. Und dann hat er mich benutzt, um seine Wurzeln zu stuetzen. Als ich gebrochen bin, hat er gelacht."',
        choices: [
          { text: '"Das ist wirklich mies. Kein Wunder, dass du vorsichtig bist. Das ist nicht Schwaeche - das ist Selbstschutz."', nextSceneId: 'g3-s3', empathyPoints: 3, insightPoints: 2, couragePoints: 0 },
          { text: '"Du hast also gelernt, dass Vertrauen wehtut. Aber du hast nicht gelernt, dass es auch anders sein kann. Noch nicht."', nextSceneId: 'g3-s3', empathyPoints: 1, insightPoints: 3, couragePoints: 2 },
          { text: '"Ich werde dir nichts versprechen, was ich nicht halten kann. Aber ich sitze jetzt hier. Und morgen sitze ich wieder hier, wenn du willst."', nextSceneId: 'g3-s3', empathyPoints: 2, insightPoints: 1, couragePoints: 3 }
        ]
      },
      {
        id: 'g3-s3',
        text: 'Die naechsten Tage sitzt du bei Wurzel. Manchmal redet ihr. Manchmal nicht. An Tag drei erzaehlt er, dass er gerne Muster in die Erde zeichnet. An Tag fuenf zeigt er sie dir. An Tag sieben lacht er zum ersten Mal - als du versehentlich in eine Pfuetze trittst. Dann passiert es: Bluete kommt vorbei und laedt Wurzel ein, neben ihr im Hauptbeet zu wachsen. "Da ist Platz und Sonne und nette Gesellschaft!" Wurzels Laecheln verschwindet sofort. Er schaut dich an, panisch. "Sie meint es gut", fluestert er. "Aber... das hat der Baum auch gesagt."',
        choices: [
          { text: '"Du musst nicht sofort entscheiden. Und du musst auch nicht Ja sagen. Hoer auf dein Gefuehl - was sagt es dir?"', nextSceneId: 'g3-s4', empathyPoints: 2, insightPoints: 3, couragePoints: 1 },
          { text: '"Ich kenne Bluete. Sie ist echt. Aber ich verstehe, dass du das nicht einfach glauben kannst. Vertrauen muss man verdienen."', nextSceneId: 'g3-s4', empathyPoints: 3, insightPoints: 1, couragePoints: 1 },
          { text: '"Wie waere es, wenn du erstmal nur einen Tag neben ihr probierst? Kleine Schritte, kein Sprung ins kalte Wasser."', nextSceneId: 'g3-s4', empathyPoints: 1, insightPoints: 2, couragePoints: 3 }
        ]
      },
      {
        id: 'g3-s4',
        text: 'Wurzel wagt es - einen Tag im Hauptbeet. Es laeuft gut. Bluete gibt ihm Platz, fragt nicht zu viel, laesst ihn sein. Aber am naechsten Tag sieht Wurzel, wie Bluete mit den Rosen lacht. Und ploetzlich ist das alte Gefuehl wieder da. "Sie mag die anderen mehr als mich", sagt er zu dir, und seine Stimme klingt wie ein zerbrochener Ast. "Ich wusste es. Ich bin nur Ersatz, bis jemand Besseres kommt." Du erkennst das Muster: Auf dem Ozean hast du gelernt, dass Trauer uns alte Wunden zeigt. Wurzels Angst vor Ablehnung ist so eine alte Wunde.',
        choices: [
          { text: '"Wurzel, das was du gerade fuehlst, ist alt. Das ist nicht Bluete - das ist der Baum aus deinem alten Garten. Kannst du den Unterschied sehen?"', nextSceneId: 'g3-s5', empathyPoints: 2, insightPoints: 3, couragePoints: 1 },
          { text: '"Dass Bluete auch mit anderen lacht, heisst nicht, dass sie dich weniger mag. Freundschaft ist kein Kuchen, der weniger wird, wenn man teilt."', nextSceneId: 'g3-s5', empathyPoints: 3, insightPoints: 2, couragePoints: 0 },
          { text: '"Anstatt zu raten, was Bluete denkt - warum fragst du sie nicht direkt? Das braucht Mut, aber es ist besser als Kopfkino."', nextSceneId: 'g3-s5', empathyPoints: 1, insightPoints: 2, couragePoints: 3 }
        ]
      },
      {
        id: 'g3-s5',
        text: 'Wurzel fasst Mut und spricht mit Bluete. "Magst du mich wirklich? Oder bist du nur nett, weil du zu allen nett bist?" Bluete antwortet nicht sofort. Sie denkt nach. Dann sagt sie: "Weisst du, Wurzel, ich BIN zu allen nett - das stimmt. Aber bei dir ist es anders. Du bist der Einzige, dem ich meine Muster in der Erde gezeigt habe. Weil du mich nicht beurteilst." Sie schaut ihn an. "Ich muss dir aber auch was gestehen: Ich habe Angst, dass ICH dir nicht genug bin. Dass ich langweilig bin ohne meine Hilfsbereitschaft." Zwei Pflanzen, zwei Ängste, eine ehrliche Verbindung.',
        choices: [
          { text: '"Das ist unglaublich mutig von euch beiden. Ihr habt gerade etwas getan, was die meisten Erwachsenen nicht schaffen: ehrlich ueber eure Aengste reden."', nextSceneId: 'g3-s6', empathyPoints: 2, insightPoints: 1, couragePoints: 3 },
          { text: '"Seht ihr? Ihr hattet beide die gleiche Angst - nicht gut genug zu sein. Und genau diese Ehrlichkeit macht eure Freundschaft echt."', nextSceneId: 'g3-s6', empathyPoints: 1, insightPoints: 3, couragePoints: 2 },
          { text: '"Bluete, auf der Berginsel gibt es jemanden, der das versteht. Und Wurzel - im Wald hab ich gelernt, dass der mutigste Schritt der erste ist."', nextSceneId: 'g3-s6', empathyPoints: 3, insightPoints: 2, couragePoints: 1 }
        ]
      },
      {
        id: 'g3-s6',
        text: 'Wochen spaeter hat Wurzel echte Wurzeln geschlagen. Nicht ueberall - nur dort, wo er sich sicher fuehlt. Neben Bluete, in der Naehe von dir, und seit kurzem auch ein kleines Stueck Richtung Dorni (der das natuerlich nie zugeben wuerde). Flora findet dich am Gartentor. "Weisst du, was das Besondere an Wurzel ist? Er hat nicht gelernt, jedem zu vertrauen. Er hat gelernt, den RICHTIGEN zu vertrauen. Und zu erkennen, wann Vertrauen gerechtfertigt ist." Sie zeigt auf den Garten. "Vertrauen ist wie Wasser. Zu wenig, und du verdorrst. Zu viel, und du ertrinkst. Die Kunst ist das richtige Mass."',
        choices: [
          { text: '"Ich lerne auch noch. Aber heute habe ich verstanden: Vertrauen bedeutet nicht, keine Angst zu haben. Es bedeutet, es trotz der Angst zu versuchen."', nextSceneId: null, empathyPoints: 2, insightPoints: 3, couragePoints: 2 },
          { text: '"Das Schoenste war, wie Bluete und Wurzel sich gegenseitig geholfen haben, mutiger zu werden. Beziehungen sollten so sein."', nextSceneId: null, empathyPoints: 3, insightPoints: 2, couragePoints: 1 },
          { text: '"Manchmal reicht es, einfach da zu sein. Keine grossen Reden, keine Ratschlaege - nur Praesenz. Das habe ich hier gelernt."', nextSceneId: null, empathyPoints: 3, insightPoints: 1, couragePoints: 1 }
        ]
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // Scenario 4 – Dornen und Ehrlichkeit
  // Thema: Ehrliche Kommunikation, konstruktives Feedback, Verletzlichkeit
  // Schwierigkeit: Mittel-Hoch
  // ---------------------------------------------------------------------------
  {
    id: 'garden-scenario-4',
    islandId: 'garden' as IslandId,
    title: 'Dornen und Ehrlichkeit',
    description: 'Dorni hat etwas geschaffen, auf das er stolz ist - und will ehrliches Feedback. Klingt einfach? Probier mal, jemandem die Wahrheit zu sagen, ohne ihn zu verletzen. Und ohne zu luegen.',
    scenes: [
      {
        id: 'g4-s1',
        text: 'Dorni hat einen Song geschrieben. Einen echten Song. Mit Text und Melodie und... nun ja. Er hat sich Muehe gegeben, das hoert man. Leider hoert man auch, dass er nicht singen kann. Ueberhaupt nicht. Er traegt den Song im Garten vor und schaut danach in die Runde. Bluete laechelt angestrengt. Die Rosen gucken sich an. Sogar die Steine wirken leicht unwohl. "Und?", fragt Dorni. In seiner Stimme liegt etwas, das man selten bei ihm hoert: Hoffnung. Ehrliche, verletzliche Hoffnung. "Seid ehrlich."',
        choices: [
          { text: '"Dorni, ich sehe, wie viel das dir bedeutet. Der Text ist wirklich stark - deine Worte treffen. Bei der Melodie koennten wir zusammen noch daran arbeiten."', nextSceneId: 'g4-s2', empathyPoints: 3, insightPoints: 2, couragePoints: 2 },
          { text: '"Ehrlich? Die Lyrics zeigen echte Gefuehle. Das Singen braucht noch Uebung. Aber das kann man lernen."', nextSceneId: 'g4-s2', empathyPoints: 1, insightPoints: 2, couragePoints: 3 },
          { text: '"Ich finde es mutig, dass du dich getraut hast. Das ist schon mal mehr als die meisten schaffen."', nextSceneId: 'g4-s2', empathyPoints: 2, insightPoints: 1, couragePoints: 2 }
        ]
      },
      {
        id: 'g4-s2',
        text: 'Dorni mustert dich. "Du drehst dich um den heissen Brei." Dann schaut er Bluete an. "Und DU luegst mich gerade an. Ich sehe das an deinem Laecheln. Es ist dein Ich-will-niemanden-verletzen-Laecheln." Bluete wird rot. "Ich..." Dorni verschraenkt die Arme. "Ich habe um Ehrlichkeit gebeten. Nicht um Mitleid." Flora tritt vor. "Dorni hat recht. Aber Dorni - du musst auch aushalten, dass Ehrlichkeit manchmal unbequem ist. Fuer BEIDE Seiten." Die Spannung ist greifbar. Du spuerst: Hier geht es um mehr als einen Song.',
        choices: [
          { text: '"Dorni, ich bin ehrlich: Dein Song ist nicht perfekt. Aber die Tatsache, dass du ihn vorgesungen hast - mit all deinen Stacheln und deiner Angst - DAS ist perfekt."', nextSceneId: 'g4-s3', empathyPoints: 2, insightPoints: 2, couragePoints: 3 },
          { text: '"Okay, Klartext: Der Text ist gut, die Melodie nicht. Aber weisst du was schlimmer waere? Wenn wir luegen und du nie die Chance hast, besser zu werden."', nextSceneId: 'g4-s3', empathyPoints: 1, insightPoints: 3, couragePoints: 2 },
          { text: '"Bluete, es ist okay, ehrlich zu sein. Und Dorni, es ist okay, wenn die Wahrheit kurz wehtut. Dafuer ist sie echt."', nextSceneId: 'g4-s3', empathyPoints: 3, insightPoints: 2, couragePoints: 1 }
        ]
      },
      {
        id: 'g4-s3',
        text: 'Dorni ist still. Lange. Dann: "Auf der Vulkaninsel... da war meine Wut wie Lava. Alles oder nichts. Flamara hat mir gezeigt, dass man Wut auch leise spueren kann." Er schaut auf seine Stacheln. "Und jetzt merke ich: Verletzlichkeit ist wie Lava ohne Panzer. Es brennt." Bluete rueckt naeher. "Dorni... darf ich dir was sagen? Wirklich ehrlich?" Er nickt. "Der Song hat mich beruehrt. Nicht weil er perfekt war, sondern weil ich zum ersten Mal gehoert habe, wie du WIRKLICH fuehlst. Ohne Sarkasmus, ohne Stacheln." Dornis Augen werden glasig. Er blinzelt es weg.',
        choices: [
          { text: '"Seht ihr was passiert? Bluete sagt die Wahrheit mit Empathie. Dorni nimmt sie an mit Mut. DAS ist ehrliche Kommunikation."', nextSceneId: 'g4-s4', empathyPoints: 1, insightPoints: 3, couragePoints: 2 },
          { text: '"Dorni, du hast gerade etwas Unglaubliches gemacht: Du hast deine Stacheln abgelegt und warst verwundbar. Das braucht mehr Mut als jeder Song."', nextSceneId: 'g4-s4', empathyPoints: 3, insightPoints: 1, couragePoints: 2 },
          { text: '"Und Bluete - DAS war echte Ehrlichkeit. Kein Luegen, kein Verletzen. Sondern sehen, was wirklich da ist."', nextSceneId: 'g4-s4', empathyPoints: 2, insightPoints: 2, couragePoints: 1 }
        ]
      },
      {
        id: 'g4-s4',
        text: 'Flora nutzt den Moment. "Okay, Uebungszeit. Jeder sagt jetzt jemandem etwas Ehrliches - aber mit Respekt. Kein Angriff, keine Luege. Einfach die Wahrheit, verpackt in Freundlichkeit." Wurzel, der bisher still zugehoert hat, meldet sich ueberraschend: "Kann ich anfangen?" Alle schauen ihn an. "Dorni... ich fand dich am Anfang richtig unheimlich. Deine Stacheln haben mir Angst gemacht." Stille. Dorni schluckt. Wurzel faehrt fort: "Aber heute habe ich verstanden, dass die Stacheln dein Schutzschild sind. Genau wie mein Schweigen meins war."',
        choices: [
          { text: '"Wurzel, das war unglaublich mutig. Du hast Dorni gerade etwas Wichtiges gesagt UND gezeigt, dass du ihn verstehst."', nextSceneId: 'g4-s5', empathyPoints: 2, insightPoints: 2, couragePoints: 3 },
          { text: '"Merkt ihr, was gerade passiert? Ehrlichkeit oeffnet Tueren. Wurzel hat sich getraut, und jetzt versteht Dorni, wie er auf andere wirkt."', nextSceneId: 'g4-s5', empathyPoints: 1, insightPoints: 3, couragePoints: 1 },
          { text: 'Dornis Reaktion abwarten. Manchmal ist der wichtigste Beitrag, Raum zu lassen.', nextSceneId: 'g4-s5', empathyPoints: 3, insightPoints: 2, couragePoints: 0 }
        ]
      },
      {
        id: 'g4-s5',
        text: 'Dorni starrt Wurzel an. Dann, nach einer Ewigkeit: "Danke. Das... das hat noch nie jemand so gesagt. Normalerweise sagen sie einfach: Du bist eklig, mit deinen Stacheln." Er schaut in die Runde. "Okay, meine Runde. Bluete - du nervst mich manchmal." Bluete zuckt zusammen. "ABER", faehrt Dorni fort, "du nervst mich, weil du dich aufopferst. Und mir macht das Angst. Weil ich sehe, wie du kleiner wirst. Und ich will nicht, dass du... verschwindest." Bluete weint. Aber diesmal sind es keine traurigen Traenen. Es sind die Traenen von jemandem, der sich endlich gesehen fuehlt.',
        choices: [
          { text: '"Dorni hat gerade etwas gesagt, das vielen schwerfaellt: Ich mache mir Sorgen um dich. Hinter Kritik kann Fuersorge stecken."', nextSceneId: 'g4-s6', empathyPoints: 2, insightPoints: 3, couragePoints: 1 },
          { text: '"Bluete, hoerst du was Dorni wirklich sagt? Er nervt sich, WEIL er sich um dich sorgt. Das ist Liebe in Dorni-Sprache."', nextSceneId: 'g4-s6', empathyPoints: 3, insightPoints: 2, couragePoints: 0 },
          { text: '"Ist euch aufgefallen, dass hier gerade niemand verletzt wurde, obwohl alle die Wahrheit gesagt haben? So geht ehrliche Kommunikation."', nextSceneId: 'g4-s6', empathyPoints: 1, insightPoints: 3, couragePoints: 2 }
        ]
      },
      {
        id: 'g4-s6',
        text: 'Spaeter sitzt die Gruppe zusammen. Dorni uebt seinen Song - mit Bluetes Hilfe an der Melodie und Wurzels Rhythmus. Er klingt immer noch nicht wie ein Popstar. Aber er klingt wie Dorni, und das ist besser. Flora lehnt am Zaun und spricht mit dir. "Weisst du, was das Geheimnis ist? Ehrlichkeit ohne Empathie ist Grausamkeit. Empathie ohne Ehrlichkeit ist Manipulation. Beides zusammen? Das ist Liebe." Sie zwinkert. "Und ja, ich meine Liebe im weitesten Sinne. Freundschaft, Familie, Gemeinschaft. Ueberall da, wo Menschen fuereinander einstehen."',
        choices: [
          { text: '"Ich lerne: Die Wahrheit muss nicht verletzen, wenn man sie mit Herz ausspricht. Und sie muss nicht fehlen, nur weil man nett sein will."', nextSceneId: null, empathyPoints: 2, insightPoints: 3, couragePoints: 1 },
          { text: '"Am meisten hat mich Wurzel beeindruckt. Der Stillste im Raum hat den mutigsten Satz gesagt."', nextSceneId: null, empathyPoints: 3, insightPoints: 1, couragePoints: 2 },
          { text: '"Ich wuensche mir mehr solche Gespraeche - in der Schule, zu Hause, ueberall. Ehrlich UND freundlich. Gleichzeitig."', nextSceneId: null, empathyPoints: 2, insightPoints: 2, couragePoints: 2 }
        ]
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // Scenario 5 – Unsichtbare Mauern
  // Thema: Ausgrenzung, Inklusion, Perspektivuebernahme
  // Schwierigkeit: Hoch
  // ---------------------------------------------------------------------------
  {
    id: 'garden-scenario-5',
    islandId: 'garden' as IslandId,
    title: 'Unsichtbare Mauern',
    description: 'Im Garten gibt es Gruppen, die sich fuer besser halten. Wurzel wird nicht eingeladen. Dorni tut so, als waere es ihm egal. Aber Ausgrenzung trifft alle - auch die, die ausgrenzen.',
    scenes: [
      {
        id: 'g5-s1',
        text: 'Im Garten hat sich etwas veraendert. Die Rosen stehen zusammen, die Tulpen stehen zusammen, die Graeser stehen zusammen. Und dazwischen: unsichtbare Mauern. Niemand hat sie gebaut, aber alle spueren sie. Wurzel steht wieder am Rand und schaut zu, wie die Rosen ein Spiel spielen. "Kann ich mitspielen?", fragt er leise. Eine Rose schaut ihn an. "Aeh... das Spiel ist eigentlich nur fuer Rosen. Tut mir leid." Das "Tut mir leid" klingt nicht sorry. Es klingt wie eine Tuer, die zugeht.',
        choices: [
          { text: 'Zu den Rosen gehen: "Hey, seit wann hat ein Spiel eine Zugangsvoraussetzung? Ich will auch mitspielen - und Wurzel kommt mit."', nextSceneId: 'g5-s2', empathyPoints: 1, insightPoints: 1, couragePoints: 3 },
          { text: 'Erstmal zu Wurzel gehen und fragen, wie es ihm geht. Er sieht verletzt aus.', nextSceneId: 'g5-s2', empathyPoints: 3, insightPoints: 1, couragePoints: 1 },
          { text: 'Flora holen - die muss das sehen und eingreifen.', nextSceneId: 'g5-s2', empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
        ]
      },
      {
        id: 'g5-s2',
        text: 'Dorni schlendert vorbei und hat alles gehoert. Er reagiert auf seine Art: "Rosen-Only? Ernsthaft? Was kommt als naechstes, ein VIP-Bereich mit Stacheldraht?" Er lacht, aber sein Lachen ist schaerfer als seine Stacheln. Die Rosen schauen irritiert. "Es ist halt unser Spiel. Wir haben es erfunden." Dorni dreht sich zu dir: "Komm, Wurzel, die sind es nicht wert." Aber du merkst: Weggehen loest das Problem nicht. Und auch Dornis Sarkasmus nicht. Er versteckt seinen Schmerz hinter Humor - ein Muster, das du von der Vulkaninsel kennst.',
        choices: [
          { text: '"Warte, Dorni. Weglaufen aendert nichts. Rosen, koenntet ihr mir erklaeren, warum das Spiel nur fuer Rosen ist? Ich will das wirklich verstehen."', nextSceneId: 'g5-s3', empathyPoints: 2, insightPoints: 3, couragePoints: 2 },
          { text: '"Dorni, ich verstehe deinen Frust. Aber Wut bringt uns hier nicht weiter. Im Vulkan hast du gelernt, dass Wut ein Signal ist, kein Werkzeug."', nextSceneId: 'g5-s3', empathyPoints: 3, insightPoints: 2, couragePoints: 1 },
          { text: '"Wurzel, wie geht es dir gerade? Du musst nicht so tun, als waere es dir egal."', nextSceneId: 'g5-s3', empathyPoints: 3, insightPoints: 1, couragePoints: 1 }
        ]
      },
      {
        id: 'g5-s3',
        text: 'Flora taucht auf. Natuerlich. Sie hat ein Talent fuer dramatische Auftritte. "Interessant", sagt sie und schaut sich die Gruppen an. "Ich sehe Rosen hier, Tulpen dort, Graeser drueben. Wisst ihr, was ich NICHT sehe? Einen Garten." Die Rosen schauen betreten. Flora faehrt fort: "Ein Garten ist nicht eine Sammlung von Einzelgruppen. Ein Garten lebt von Vielfalt. Die Bienen bestauben euch ALLE. Das Wasser naehrt euch ALLE. Aber ihr tut so, als waeret ihr verschiedene Arten." Sie zeigt auf Wurzel. "Er ist anders als ihr. UND? Ich bin auch anders als ihr. Trotzdem stehe ich hier."',
        choices: [
          { text: '"Flora hat recht. Ich kenne das aus der Schule - Gruppen, die andere ausschliessen. Es fuehlt sich vielleicht gut an, dazuzugehoeren. Aber es fuehlt sich schrecklich an, draussen zu stehen."', nextSceneId: 'g5-s4', empathyPoints: 3, insightPoints: 2, couragePoints: 1 },
          { text: '"Rosen, stellt euch vor, IHR waert die Neuen. Wie wuerdet ihr euch fuehlen, wenn man euch ausschliesst?"', nextSceneId: 'g5-s4', empathyPoints: 2, insightPoints: 3, couragePoints: 1 },
          { text: '"Ich schlage vor: Wir spielen zusammen. ALLE. Und zwar ein Spiel, das niemand kennt. Dann sind wir alle gleich neu."', nextSceneId: 'g5-s4', empathyPoints: 1, insightPoints: 2, couragePoints: 3 }
        ]
      },
      {
        id: 'g5-s4',
        text: 'Eine der Rosen, Rosalie, senkt den Blick. "Es... es ist nicht so, dass wir Wurzel nicht moegen. Ich kenne ihn nur nicht und... ich habe Angst, dass es komisch wird." ANGST. Da ist es wieder. Wie im Wald - Angst verkleidet sich als Ablehnung. Dorni schnaubt: "Angst? Du grenzt jemanden aus wegen ANGST?" Aber du siehst: Rosalie ist ehrlich. Sie hat nicht bewusst ausgegrenzt. Sie hat einfach das getan, was sich sicher anfuehlte - bei den bleiben, die sie kennt.',
        choices: [
          { text: '"Rosalie, danke fuer deine Ehrlichkeit. Das Komische ist: Wurzel hat auch Angst. Ihr habt beide Angst voreinander - und keiner traut sich den ersten Schritt."', nextSceneId: 'g5-s5', empathyPoints: 3, insightPoints: 2, couragePoints: 1 },
          { text: '"Dorni, sei nicht so hart. Rosalie ist ehrlich - das sollten wir respektieren. Angst ist kein Verbrechen. Aber auf Angst zu hoeren, wenn sie andere verletzt, ist eine Entscheidung."', nextSceneId: 'g5-s5', empathyPoints: 2, insightPoints: 3, couragePoints: 1 },
          { text: '"Okay, Rosalie. Ich stelle euch einander vor. Wurzel, Rosalie. Rosalie, Wurzel. Sagt euch eine Sache, die der andere nicht ueber euch weiss."', nextSceneId: 'g5-s5', empathyPoints: 1, insightPoints: 2, couragePoints: 3 }
        ]
      },
      {
        id: 'g5-s5',
        text: 'Wurzel und Rosalie reden. Zuerst steif. Dann weniger steif. Dann lacht Rosalie, weil Wurzel einen Witz ueber seine eigene Groesse macht. "Du bist witzig!", sagt sie ueberrascht. "Und du bist netter, als ich dachte", sagt Wurzel. "Ich dachte, Rosen sind hochnaesig." "Und ich dachte, Setzlinge sind langweilig." Beide lachen. Flora dreht sich zu Dorni, der mit verschraenkten Armen zuschaut. "Und du? Willst du auch mitmachen? Oder bleibst du lieber der einsame Kaktus, der ueber alle spottet?" Dorni oeffnet den Mund. Schliesst ihn. "...Vielleicht."',
        choices: [
          { text: '"Dorni, dein Vielleicht ist mehr wert als das Ja von vielen. Ich weiss, dass Naehe fuer dich schwer ist. Aber du hast gerade eine Tuer geoeffnet."', nextSceneId: 'g5-s6', empathyPoints: 3, insightPoints: 2, couragePoints: 1 },
          { text: '"Schaut mal, was gerade passiert ist: Wurzel und Rosalie brauchten zwei Minuten Gespraech, um ihre Vorurteile zu ueberwinden. Zwei Minuten!"', nextSceneId: 'g5-s6', empathyPoints: 1, insightPoints: 3, couragePoints: 1 },
          { text: '"Wer hat Lust, das Spiel nochmal neu zu starten? Diesmal ALLE zusammen. Neue Regeln, neues Spiel, neue Chance."', nextSceneId: 'g5-s6', empathyPoints: 2, insightPoints: 1, couragePoints: 3 }
        ]
      },
      {
        id: 'g5-s6',
        text: 'Am Ende des Tages sieht der Garten anders aus. Nicht perfekt. Die unsichtbaren Mauern sind nicht komplett verschwunden. Aber sie haben Risse. Wurzel spielt mit den Rosen. Dorni sitzt am Rand, aber naeher als sonst. Rosalie hat ihre Gruppe verlassen, um neben Bluete zu sitzen. Flora findet dich am Gartentor. "Ausgrenzung passiert selten boesartig. Meistens passiert sie aus Bequemlichkeit. Wir bleiben bei dem, was wir kennen, und merken nicht, wen wir dabei ausschliessen." Sie schaut in den Garten. "Die Frage ist nie: Sind WIR die Guten oder die Boesen? Die Frage ist: Was tue ICH gerade, um den Garten fuer alle einladend zu machen?"',
        choices: [
          { text: '"Ich nehme mit: Ausgrenzung beginnt nicht mit Hass. Sie beginnt damit, dass man aufhoert hinzuschauen, wer am Rand steht."', nextSceneId: null, empathyPoints: 2, insightPoints: 3, couragePoints: 1 },
          { text: '"Ich will in meinem Leben oefter der Mensch sein, der sagt: Hey, komm dazu. Weil ich weiss, wie es sich anfuehlt, draussen zu stehen."', nextSceneId: null, empathyPoints: 3, insightPoints: 1, couragePoints: 2 },
          { text: '"Am meisten hat mich beeindruckt, wie schnell Vorurteile fallen, wenn man miteinander statt uebereinander redet."', nextSceneId: null, empathyPoints: 1, insightPoints: 3, couragePoints: 2 }
        ]
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // Scenario 6 – Das Unwetter
  // Thema: Beziehungen reparieren, Vergebung, Zusammenhalt
  // Schwierigkeit: Hoch (Abschluss-Szenario)
  // ---------------------------------------------------------------------------
  {
    id: 'garden-scenario-6',
    islandId: 'garden' as IslandId,
    title: 'Das Unwetter',
    description: 'Ein Sturm verwuestet den Garten. Aber der echte Schaden wurde schon vorher angerichtet - durch Worte, die nicht haetten fallen duerfen. Kann man reparieren, was zerbrochen ist?',
    scenes: [
      {
        id: 'g6-s1',
        text: 'Es beginnt mit einem Streit. Einem richtigen. Dorni sagt zu Bluete: "Du bist nicht stark, Bluete. Du bist schwach. Du versteckst deine Schwaeche hinter Laecheln, genau wie ich meine hinter Stacheln. Der Unterschied? Ich gebe es wenigstens zu." Die Worte treffen wie Steine. Bluete erstarrt. Dann, zum ersten Mal, schreit sie zurueck: "Wenigstens VERSUCHE ich, nett zu sein! Du willst einfach nur alle auf Abstand halten, weil du zu feige bist fuer echte Naehe!" Stille. Beide schnappen nach Luft. Und dann zieht ein Unwetter auf.',
        choices: [
          { text: '"Stop. Ihr meint das beide nicht so. Ihr seid verletzt und reagiert aus der Verletzung heraus. Auf der Vulkaninsel habe ich gelernt: Worte in der Wut sind keine Wahrheit."', nextSceneId: 'g6-s2', empathyPoints: 2, insightPoints: 3, couragePoints: 2 },
          { text: 'Nichts sagen. Beide brauchen gerade Raum, um zu atmen. Nicht jeder Streit muss sofort geschlichtet werden.', nextSceneId: 'g6-s2', empathyPoints: 3, insightPoints: 2, couragePoints: 0 },
          { text: '"Ihr habt BEIDE die Wahrheit gesagt - aber auf die grausamste moegliche Art. Ehrlichkeit ohne Mitgefuehl ist kein Geschenk, es ist eine Waffe."', nextSceneId: 'g6-s2', empathyPoints: 1, insightPoints: 3, couragePoints: 3 }
        ]
      },
      {
        id: 'g6-s2',
        text: 'Das Unwetter bricht los. Wind reisst an den Pflanzen. Regen prasselt. Und zwischen den Donnerschlaegen: Stille zwischen Dorni und Bluete. Sie stehen an verschiedenen Enden des Gartens. Dazwischen: ein umgesteurzter Baum, der das Bewasserungssystem blockiert. Flora ruft durch den Sturm: "Der Graben! Wenn der blockiert bleibt, ertrinken die Wurzeln der Jungpflanzen!" Sie schaut dich an. "Wir brauchen ALLE - auch die zwei, die sich gerade nicht ausstehen koennen."',
        choices: [
          { text: 'Zu Bluete gehen: "Bluete, Wurzel und die Kleinen brauchen Hilfe. Ich weiss, du bist verletzt. Aber deine Staerke wird gerade gebraucht."', nextSceneId: 'g6-s3', empathyPoints: 3, insightPoints: 1, couragePoints: 2 },
          { text: 'Zu Dorni gehen: "Dorni, du bist der Staerkste hier. Ohne dich schaffen wir das nicht. Bitte."', nextSceneId: 'g6-s3', empathyPoints: 2, insightPoints: 1, couragePoints: 3 },
          { text: 'Beide gleichzeitig rufen: "Die Jungpflanzen sind in Gefahr! Euer Streit kann warten - das hier nicht!"', nextSceneId: 'g6-s3', empathyPoints: 1, insightPoints: 3, couragePoints: 2 }
        ]
      },
      {
        id: 'g6-s3',
        text: 'Sie kommen. Beide. Nicht weil der Streit vergessen ist, sondern weil es etwas Groesseres gibt. Dorni stemmt sich gegen den umgesteurzten Stamm. Bluete grabt einen Umweg fuer das Wasser. Wurzel - der kleine, schuechterne Wurzel - haelt die Jungpflanzen mit seinen eigenen Wurzeln fest, damit der Sturm sie nicht mitreisst. Du arbeitest mit allen zusammen, durchnaesst, erschoepft, aber mit einem Gefuehl von... Zusammengehoerigeit. Dorni und Bluete arbeiten nebeneinander. Schweigend. Aber sie arbeiten ZUSAMMEN.',
        choices: [
          { text: 'Neben beiden arbeiten und einfach da sein. Manche Dinge heilen nicht durch Worte, sondern durch gemeinsames Handeln.', nextSceneId: 'g6-s4', empathyPoints: 3, insightPoints: 2, couragePoints: 1 },
          { text: '"Seht ihr? DAFUER brauchen wir einander. Nicht fuer schoenes Wetter. Sondern fuer den Sturm."', nextSceneId: 'g6-s4', empathyPoints: 1, insightPoints: 3, couragePoints: 2 },
          { text: 'Wurzel loben: "Wurzel, du bist unglaublich! Die Jungpflanzen halten nur wegen DIR!"', nextSceneId: 'g6-s4', empathyPoints: 3, insightPoints: 1, couragePoints: 1 }
        ]
      },
      {
        id: 'g6-s4',
        text: 'Der Sturm laesst nach. Der Garten ist verwuestet, aber alle leben. Wurzel, der vorher am Rand stand, ist jetzt mittendrin - voellig erschoepft, aber mit einem Laecheln, das sagt: Ich gehoere dazu. Dann die schwierige Stunde. Dorni und Bluete stehen sich gegenueber. Die Worte von vorher haengen noch in der Luft. Dorni rauespert sich. "Ich..." Abbruch. Neuer Versuch. "Was ich gesagt habe, war..." Wieder Abbruch. Du merkst: Dorni hat nie gelernt, sich zu entschuldigen.',
        choices: [
          { text: '"Dorni, du musst nicht die perfekten Worte finden. Manchmal reicht es zu sagen: Es tut mir leid. Ich wollte verletzen, und das war falsch."', nextSceneId: 'g6-s5', empathyPoints: 2, insightPoints: 3, couragePoints: 1 },
          { text: 'Dorni Zeit geben. Nicht draengen. Manche brauchen laenger, um die richtigen Worte zu finden.', nextSceneId: 'g6-s5', empathyPoints: 3, insightPoints: 1, couragePoints: 0 },
          { text: '"Auf der Berginsel habe ich gelernt: Fehler zu machen macht dich nicht wertlos. Aber die Verantwortung dafuer zu uebernehmen macht dich stark."', nextSceneId: 'g6-s5', empathyPoints: 1, insightPoints: 3, couragePoints: 2 }
        ]
      },
      {
        id: 'g6-s5',
        text: 'Dorni atmet tief ein. "Bluete, es tut mir leid. Nicht das hoefliche Tut-mir-leid. Ich meine es wirklich. Ich wusste, wo ich dich treffen kann, und ich habe es trotzdem gesagt. Das war nicht ehrlich. Das war grausam." Bluete schweigt. Dann: "Ich muss dir auch etwas sagen. Was ich ueber deine Feigheit gesagt habe - das war nicht fair. Du bist nicht feige. Du bist einer der mutigsten Pflanzen, die ich kenne. Weil du hier stehst und dich entschuldigst." Dornis Stacheln zittern. Das war keine leichte Stille, aber eine heilende.',
        choices: [
          { text: '"Vergebung bedeutet nicht, dass es okay war. Es bedeutet, dass ihr eure Beziehung fuer wichtiger haltet als euren Stolz."', nextSceneId: 'g6-s6', empathyPoints: 1, insightPoints: 3, couragePoints: 2 },
          { text: '"Ihr habt gerade bewiesen, dass Beziehungen Sturmschaden ueberleben koennen. Und manchmal werden sie danach sogar staerker."', nextSceneId: 'g6-s6', empathyPoints: 3, insightPoints: 2, couragePoints: 1 },
          { text: '"Das braucht mehr Mut als gegen den Sturm zu kaempfen. Sich zu entschuldigen und zu vergeben - das ist die haerteste Arbeit im Garten."', nextSceneId: 'g6-s6', empathyPoints: 2, insightPoints: 1, couragePoints: 3 }
        ]
      },
      {
        id: 'g6-s6',
        text: 'Die naechsten Tage baut der Garten sich wieder auf. Aber er sieht anders aus als vorher. Nicht perfekter - ehrlicher. Dornis Stacheln stehen immer noch, aber zwischen ihnen wachsen jetzt kleine Blumen. Bluete steht aufrechter, staerker - und sie hat gelernt, Nein zu sagen, ohne dabei ihr Herz zu verlieren. Wurzel hat tiefe Wurzeln geschlagen, genau an dem Platz, an dem er die Jungpflanzen gehalten hat. Flora steht neben dir. "Jede Beziehung wird getestet", sagt sie leise. "Durch Streit, durch Stuerme, durch Worte, die wehtun. Die Frage ist nie, ob es Schaden gibt. Die Frage ist: Seid ihr bereit, ihn gemeinsam zu reparieren?" Sie laechelt. "Du hast dem Garten etwas Unbezahlbares gebracht: die Erinnerung, dass Zusammenhalt keine Selbstverstaendlichkeit ist - sondern eine taegliche Entscheidung."',
        choices: [
          { text: '"Vom Vulkan bis zum Garten - jede Insel hat mir etwas ueber Beziehungen beigebracht. Wut, Trauer, Angst, Selbstwert... alles verbunden. Alles wichtig."', nextSceneId: null, empathyPoints: 2, insightPoints: 3, couragePoints: 2 },
          { text: '"Was ich aus diesem Garten mitnehme: Beziehungen sind nicht perfekt. Sie sind chaotisch, schwierig und wunderschoen. Und es lohnt sich, fuer sie zu kaempfen."', nextSceneId: null, empathyPoints: 3, insightPoints: 2, couragePoints: 2 },
          { text: '"Ich habe gelernt, dass Reparieren manchmal wichtiger ist als Vermeiden. Und dass die tiefsten Verbindungen durch Ehrlichkeit entstehen, nicht durch Harmonie."', nextSceneId: null, empathyPoints: 1, insightPoints: 3, couragePoints: 3 }
        ]
      }
    ]
  }
];

// =============================================================================
// 3. WISDOM CARDS
// =============================================================================

export const gardenWisdomCards: WisdomCard[] = [
  {
    id: 'garden-wisdom-1',
    islandId: 'garden' as IslandId,
    title: 'Zuhoeren ist eine Superkraft',
    text: 'Wirklich zuhoeren bedeutet: nicht schon an deine Antwort denken, waehrend der andere noch redet. Sondern mit voller Aufmerksamkeit da sein. Das klingt leicht. Es ist das Schwerste ueberhaupt.',
    category: 'Kommunikation',
    collected: false
  },
  {
    id: 'garden-wisdom-2',
    islandId: 'garden' as IslandId,
    title: 'Nein ist ein ganzer Satz',
    text: 'Du musst dein Nein nicht erklaeren, rechtfertigen oder entschuldigen. Nein ist keine Beleidigung. Es ist ein Zeichen von Selbstachtung. Und jeder, der dein Nein nicht akzeptiert, zeigt dir damit, wer er ist.',
    category: 'Grenzen',
    collected: false
  },
  {
    id: 'garden-wisdom-3',
    islandId: 'garden' as IslandId,
    title: 'Vertrauen ist wie ein Setzling',
    text: 'Man kann Vertrauen nicht beschleunigen, so wie man einen Setzling nicht schneller wachsen lassen kann, indem man an ihm zieht. Es braucht Zeit, Geduld und die richtigen Bedingungen. Und manchmal muss man es ein zweites Mal pflanzen.',
    category: 'Vertrauen',
    collected: false
  },
  {
    id: 'garden-wisdom-4',
    islandId: 'garden' as IslandId,
    title: 'Ehrlichkeit + Empathie = Liebe',
    text: 'Ehrlichkeit ohne Mitgefuehl ist Grausamkeit. Mitgefuehl ohne Ehrlichkeit ist Manipulation. Aber beides zusammen? Das ist die Grundlage jeder echten Beziehung.',
    category: 'Ehrlichkeit',
    collected: false
  },
  {
    id: 'garden-wisdom-5',
    islandId: 'garden' as IslandId,
    title: 'Hinter Stacheln steckt ein Herz',
    text: 'Wenn jemand abweisend ist, frag dich: Wovor schuetzt er sich? Hinter Sarkasmus steckt oft Angst. Hinter Wut steckt oft Trauer. Hinter Stacheln steckt immer ein weiches Herz.',
    category: 'Perspektive',
    collected: false
  },
  {
    id: 'garden-wisdom-6',
    islandId: 'garden' as IslandId,
    title: 'Konflikte sind keine Katastrophen',
    text: 'Streit bedeutet nicht, dass die Beziehung kaputt ist. Es bedeutet, dass etwas Wichtiges noch nicht ausgesprochen wurde. Der Streit selbst ist nicht das Problem - es kommt darauf an, was ihr DARAUS macht.',
    category: 'Konfliktloesung',
    collected: false
  },
  {
    id: 'garden-wisdom-7',
    islandId: 'garden' as IslandId,
    title: 'Ausgrenzung beginnt leise',
    text: 'Niemand sagt: Heute schliesse ich jemanden aus. Es passiert durch Bequemlichkeit, durch Nicht-Hinschauen, durch Wir-bleiben-unter-uns. Die Frage ist nicht, ob du jemals ausgrenzt. Die Frage ist, ob du es bemerkst.',
    category: 'Inklusion',
    collected: false
  },
  {
    id: 'garden-wisdom-8',
    islandId: 'garden' as IslandId,
    title: 'Dein Wert ist nicht dein Nutzen',
    text: 'Du bist nicht liebenswert, WEIL du hilfst. Du bist liebenswert, WEIL du du bist. Wenn du aufhoerst, dich nuetzlich zu machen, und die Leute bleiben trotzdem - das sind die Echten.',
    category: 'Selbstwert',
    collected: false
  },
  {
    id: 'garden-wisdom-9',
    islandId: 'garden' as IslandId,
    title: 'Kompromisse sind keine Niederlagen',
    text: 'Wenn du dich in der Mitte triffst, hast du nicht verloren. Du hast gezeigt, dass dir die Beziehung wichtiger ist als Rechthaben. Und das ist eigentlich ein Gewinn.',
    category: 'Kompromiss',
    collected: false
  },
  {
    id: 'garden-wisdom-10',
    islandId: 'garden' as IslandId,
    title: 'Entschuldigungen brauchen Mut',
    text: '"Es tut mir leid" sind vier Worte, die haerter sind als jedes Level in jedem Spiel, das du je gespielt hast. Aber sie haben die Kraft, Risse zu kitten, die sonst zu Abgruenden werden.',
    category: 'Verantwortung',
    collected: false
  },
  {
    id: 'garden-wisdom-11',
    islandId: 'garden' as IslandId,
    title: 'Vergebung ist fuer dich',
    text: 'Vergeben heisst nicht, dass es okay war. Es heisst, dass du aufhoerst, das Gift der Wut in dir zu tragen. Vergebung ist kein Geschenk an den anderen. Es ist ein Geschenk an dich selbst.',
    category: 'Vergebung',
    collected: false
  },
  {
    id: 'garden-wisdom-12',
    islandId: 'garden' as IslandId,
    title: 'Verschiedenheit ist Staerke',
    text: 'Ein Garten voller gleicher Blumen ist langweilig. Erst die Mischung aus Rosen, Kakteen, Sonnenblumen und Setzlingen macht ihn lebendig. In Gruppen ist es genauso: Verschiedenheit ist keine Stoerung, sondern die groesste Staerke.',
    category: 'Vielfalt',
    collected: false
  },
  {
    id: 'garden-wisdom-13',
    islandId: 'garden' as IslandId,
    title: 'Selbstfuersorge ist nicht egoistisch',
    text: 'Du kannst niemanden giessen, wenn deine eigene Kanne leer ist. Auf dich achten ist die Voraussetzung dafuer, fuer andere da sein zu koennen. Wer sich selbst vernachlaessigt, hat bald nichts mehr zu geben.',
    category: 'Selbstfuersorge',
    collected: false
  },
  {
    id: 'garden-wisdom-14',
    islandId: 'garden' as IslandId,
    title: 'Kleine Gesten, grosse Wirkung',
    text: 'Du musst nicht die Welt retten. Manchmal reicht es, den Namen von jemandem zu wissen. Jemandem zuzulaecheln, der allein steht. Zu fragen: Wie geht es dir? Und die Antwort abzuwarten.',
    category: 'Freundlichkeit',
    collected: false
  },
  {
    id: 'garden-wisdom-15',
    islandId: 'garden' as IslandId,
    title: 'Beziehungen brauchen Arbeit',
    text: 'Gute Beziehungen passieren nicht einfach so. Sie sind wie ein Garten: Man muss giessen, jaeten, pflegen - jeden Tag ein bisschen. Und manchmal muss man Unkraut entfernen, auch wenn es wehtut.',
    category: 'Beziehungspflege',
    collected: false
  },
  {
    id: 'garden-wisdom-16',
    islandId: 'garden' as IslandId,
    title: 'Der Garten in dir',
    text: 'Jede Beziehung, die du lebst, lehrt dich etwas ueber dich selbst. Wut zeigt dir, was dir wichtig ist. Trauer zeigt dir, was du liebst. Angst zeigt dir, wohin du wachsen willst. Und der Mut, all das zu fuehlen, macht deinen inneren Garten reich.',
    category: 'Integration',
    collected: false
  }
];

// =============================================================================
// 4. ACTIVITIES
// =============================================================================

export const gardenActivities: GardenActivity[] = [
  {
    id: 'garden-activity-1',
    islandId: 'garden' as IslandId,
    title: 'Beziehungs-Landkarte',
    description: 'Zeichne eine Karte deiner wichtigsten Beziehungen und reflektiere, was sie besonders macht.',
    type: 'reflection',
    instructions: [
      'Nimm ein grosses Blatt Papier und zeichne dich in die Mitte.',
      'Zeichne die Menschen, die dir wichtig sind, um dich herum. Je naeher sie dir stehen, desto naeher an der Mitte.',
      'Verbinde dich mit jeder Person durch eine Linie. Schreibe auf die Linie, was diese Beziehung besonders macht.',
      'Frage dich bei jeder Verbindung: Was gebe ich? Was bekomme ich? Ist es ausgewogen?',
      'Gibt es jemanden, der fehlt? Jemanden, den du gerne naeher an der Mitte haettest? Was waere ein erster Schritt?',
      'Bonus: Zeige deine Karte jemandem, dem du vertraust, und erzaehle davon.'
    ],
    points: 15,
    completed: false
  },
  {
    id: 'garden-activity-2',
    islandId: 'garden' as IslandId,
    title: 'Die Nein-Challenge',
    description: 'Uebe eine Woche lang, bewusst Grenzen zu setzen - freundlich, aber klar.',
    type: 'journal',
    instructions: [
      'Schreibe drei Saetze auf, mit denen du freundlich Nein sagen kannst. Zum Beispiel: "Ich kann gerade nicht, aber danke fuers Fragen."',
      'Uebe diese Saetze laut - vor dem Spiegel oder mit jemandem, dem du vertraust.',
      'Achte diese Woche auf Momente, in denen du Ja sagen willst, aber eigentlich Nein meinst.',
      'Versuche mindestens dreimal, ehrlich Nein zu sagen. Schreibe danach auf, wie es sich angefuehlt hat.',
      'Am Ende der Woche: Was hat sich veraendert? Haben die Menschen anders reagiert, als du befuerchtet hast?',
      'Wichtig: Nein sagen heisst nicht, gemein zu sein. Es heisst, ehrlich zu sein.'
    ],
    points: 20,
    completed: false
  },
  {
    id: 'garden-activity-3',
    islandId: 'garden' as IslandId,
    title: 'Perspektiven-Tagebuch',
    description: 'Trainiere deine Faehigkeit, Situationen mit den Augen anderer zu sehen.',
    type: 'journal',
    instructions: [
      'Waehle eine Situation aus deinem Tag, in der du anderer Meinung warst als jemand.',
      'Schreibe auf: Was habe ICH gedacht und gefuehlt?',
      'Jetzt der schwierige Teil: Schreibe auf, was die ANDERE Person gedacht und gefuehlt haben koennte. Sei ehrlich und grosszuegig.',
      'Gibt es eine dritte Perspektive? Wie haette ein Unbeteiligter die Situation gesehen?',
      'Frage dich: Hat sich meine Meinung veraendert? Was habe ich ueber mich selbst gelernt?',
      'Fortgeschritten: Sprich mit der Person und frage, wie SIE die Situation gesehen hat. Vergleiche mit deiner Vermutung.'
    ],
    points: 15,
    completed: false
  },
  {
    id: 'garden-activity-4',
    islandId: 'garden' as IslandId,
    title: 'Freundlichkeits-Experiment',
    description: 'Starte eine Kettenreaktion der Freundlichkeit und beobachte, was passiert.',
    type: 'creative',
    instructions: [
      'Tue heute fuenf kleine, freundliche Dinge fuer fuenf verschiedene Menschen. Ideen: ein ehrliches Kompliment, jemandem die Tuer aufhalten, fragen "Wie geht es dir wirklich?"',
      'Mindestens eine Geste sollte fuer jemanden sein, den du nicht gut kennst oder der oft uebersehen wird.',
      'Beobachte die Reaktionen. Was passiert in den Gesichtern der Menschen?',
      'Schreibe abends auf: Wie hat es sich angefuehlt? Was hat dich ueberrascht?',
      'Challenge: Erklaere einer Person das Konzept und bitte sie, die Freundlichkeit weiterzugeben.',
      'Nach einer Woche: Wie hat das Experiment deinen Blick auf deine Mitmenschen veraendert?'
    ],
    points: 20,
    completed: false
  },
  {
    id: 'garden-activity-5',
    islandId: 'garden' as IslandId,
    title: 'Aktives Zuhoeren - Level Up',
    description: 'Werde zum besten Zuhoerer in deinem Leben. Kein Witz - das veraendert alles.',
    type: 'reflection',
    instructions: [
      'Bitte jemanden (Freund, Elternteil, Geschwister), dir fuenf Minuten lang etwas zu erzaehlen. Egal was.',
      'Deine Regeln: Nicht unterbrechen. Kein Handy. Kein "Bei mir war das auch so". Nur zuhoeren.',
      'Zeige mit Koerpersprache, dass du zuhoerst: Augenkontakt, Nicken, offene Haltung.',
      'Stelle danach EINE Frage, die zeigt, dass du wirklich zugehoert hast. Nicht "Und dann?" sondern "Wie hast du dich dabei gefuehlt?"',
      'Fasse zusammen, was du gehoert hast: "Du meinst also, dass..." Die andere Person soll korrigieren duerfen.',
      'Frage am Ende: "Hast du dich gehoert gefuehlt?" Die Antwort wird dich ueberraschen.'
    ],
    points: 15,
    completed: false
  }
];

// =============================================================================
// 5. ISLAND DATA (combined export)
// =============================================================================

export const gardenIslandData = {
  id: 'garden' as IslandId,
  name: 'Garteninsel',
  subtitle: 'Beziehungen, Grenzen & Kommunikation',
  description: 'Der Garten ist der Ort, an dem du lernst, wie Beziehungen funktionieren. Nicht die perfekten aus Filmen, sondern die echten - mit Streit, Versoehnungen, Grenzen und Ehrlichkeit. Hier triffst du Pflanzen, die genauso kaempfen wie du: mit der Angst, nicht genug zu sein, mit dem Wunsch, dazuzugehoeren, und mit der Frage, wie man ehrlich sein kann, ohne zu verletzen.',
  emoji: '🌿',
  theme: 'Beziehungen',
  color: '#4CAF50',
  npcs: gardenNPCs,
  scenarios: gardenScenarios,
  wisdomCards: gardenWisdomCards,
  activities: gardenActivities,
  previousIslands: ['volcano', 'ocean', 'forest', 'mountain'],
  keyLessons: [
    'Konflikte loesen durch aktives Zuhoeren',
    'Grenzen setzen ohne schlechtes Gewissen',
    'Vertrauen aufbauen nach Verletzungen',
    'Ehrlich kommunizieren mit Empathie',
    'Ausgrenzung erkennen und ueberwinden',
    'Beziehungen reparieren nach Streit'
  ]
};
