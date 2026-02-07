// @ts-nocheck
// =============================================================================
// Inner Worlds - Garden Island ("Garten-Insel")
// Theme: Empathie & Soziale Kompetenzen (Empathy & Social Skills)
// All content in German, written for ages 10-15
// Therapeutically grounded: perspective-taking, active listening,
// assertive communication, boundary-setting
// =============================================================================

import type { Scenario, WisdomCard, Activity, IslandId } from '../../../types';

// -----------------------------------------------------------------------------
// Extended Activity type (adds instructions for guided activities)
// -----------------------------------------------------------------------------

interface GardenActivity extends Activity {
  instructions: string[];
}

// -----------------------------------------------------------------------------
// NPC type for island characters
// -----------------------------------------------------------------------------

interface GardenNPC {
  id: string;
  name: string;
  emoji: string;
  description: string;
  backstory: string;
}

// =============================================================================
// 1. SCENARIOS
// =============================================================================

export const gardenScenarios: Scenario[] = [
  // ---------------------------------------------------------------------------
  // Scenario 1: "Zwischen zwei Stuehlen"
  // Teaching: Wenn zwei Freunde streiten, musst du nicht Partei ergreifen.
  // Empathie fuer beide Seiten zeigen und ehrlich bleiben ist der mutigste Weg.
  // ---------------------------------------------------------------------------
  {
    id: 'garden-scenario-1',
    islandId: 'garden' as IslandId,
    title: 'Zwischen zwei Stuehlen',
    description:
      'Deine zwei besten Freunde Nora und Levin streiten sich heftig – und beide wollen, dass du auf ihrer Seite stehst. Was tust du, wenn du niemanden verletzen willst?',
    scenes: [
      {
        id: 'garden-s1-scene-1',
        text: 'Montagmorgen. Du kommst in die Schule und merkst sofort: Irgendetwas stimmt nicht. Nora steht bei ihrem Spind und schaut duester vor sich hin. Levin sitzt am anderen Ende des Flurs und tippt wuetend auf seinem Handy. Normalerweise stehen die drei von euch zusammen und quatschen – aber heute ist die Luft so dick, dass man sie fast schneiden koennte.',
        speaker: 'Erzaehler',
        speakerEmoji: '\u{1F33B}',
        choices: [
          {
            id: 'garden-s1-c1a',
            text: 'Zuerst zu Nora gehen und fragen, was los ist.',
            consequence:
              'Nora schaut dich an und sagt mit zittriger Stimme: "Levin hat am Wochenende mein Geheimnis in die Gruppenwhatsapp geschrieben. Vor allen! Ich rede nie wieder mit ihm." Du spuerst, wie verletzt sie ist.',
            empathyPoints: 2,
            insightPoints: 1,
            couragePoints: 1,
            nextSceneId: 'garden-s1-scene-2',
          },
          {
            id: 'garden-s1-c1b',
            text: 'Zuerst zu Levin gehen und fragen, was passiert ist.',
            consequence:
              'Levin verdreht die Augen. "Nora uebertreibt total. Ich hab nur einen Witz gemacht in der Gruppe und sie flippt aus. Sie redet nicht mehr mit mir und ich check nicht warum." Du merkst: Er versteht gar nicht, was er angerichtet hat.',
            empathyPoints: 2,
            insightPoints: 1,
            couragePoints: 1,
            nextSceneId: 'garden-s1-scene-2',
          },
          {
            id: 'garden-s1-c1c',
            text: 'Beide gleichzeitig ansprechen: "Hey, was ist hier los?"',
            consequence:
              'Nora und Levin fangen sofort an, gleichzeitig zu reden. "Er hat –!" "Sie uebertreibt –!" Es wird laut und chaotisch. Beide schauen dich an, als sollst du entscheiden, wer recht hat. Du steckst mittendrin.',
            empathyPoints: 1,
            insightPoints: 2,
            couragePoints: 1,
            nextSceneId: 'garden-s1-scene-2',
          },
        ],
      },
      {
        id: 'garden-s1-scene-2',
        text: 'In der grossen Pause kommt Nora zu dir. "Du stehst doch auf meiner Seite, oder? Levin war echt gemein. Ein echter Freund wuerde sich fuer mich entscheiden." Kaum ist sie weg, schreibt Levin dir eine Nachricht: "Bro, Nora spinnt doch. Du siehst das doch auch so, oder? Sag ihr mal, dass sie ueberreagiert." Beide wollen, dass du Partei ergreifst.',
        speaker: 'Erzaehler',
        speakerEmoji: '\u{1F33B}',
        choices: [
          {
            id: 'garden-s1-c2a',
            text: 'Ehrlich sein: "Ich mag euch beide und will mich nicht fuer eine Seite entscheiden."',
            consequence:
              'Nora sieht enttaeuscht aus. Levin schreibt: "Danke fuer nichts." Es tut weh, dass beide sauer auf dich sind. Aber Flora, die Gaertnerin, fluestert dir zu: "Ehrlichkeit fuehlt sich manchmal undankbar an – aber sie ist der einzige Boden, auf dem echte Freundschaft wachsen kann."',
            empathyPoints: 2,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: 'garden-s1-scene-3',
          },
          {
            id: 'garden-s1-c2b',
            text: 'Nora zustimmen, dass Levin falsch gehandelt hat.',
            consequence:
              'Nora nickt zufrieden. Aber dann erfaehrt Levin, dass du dich auf Noras Seite gestellt hast. Er schreibt dir: "Ich dachte, du waerst auch mein Freund." Du merkst: Partei ergreifen loest den Streit nicht – es verschiebt ihn nur.',
            empathyPoints: 1,
            insightPoints: 2,
            couragePoints: 0,
            nextSceneId: 'garden-s1-scene-3',
          },
          {
            id: 'garden-s1-c2c',
            text: 'Versuchen, beiden zu sagen, was sie hoeren wollen – Nora troesten und Levin recht geben.',
            consequence:
              'Das funktioniert fuer ungefaehr zwei Stunden. Dann vergleichen Nora und Levin deine Nachrichten und merken, dass du beiden verschiedene Dinge gesagt hast. Jetzt sind beide sauer – auf dich. Allen gefallen wollen klingt nett, endet aber oft im Chaos.',
            empathyPoints: 0,
            insightPoints: 2,
            couragePoints: 0,
            nextSceneId: 'garden-s1-scene-3',
          },
        ],
      },
      {
        id: 'garden-s1-scene-3',
        text: 'Flora, die Gaertnerin des Gartens, setzt sich neben dich auf die Bank. "Weisst du", sagt sie und betrachtet eine Pflanze, deren Blaetter in zwei Richtungen wachsen, "wenn zwei Menschen streiten, haben meistens beide ein Stueck Wahrheit. Nora ist verletzt, und das ist echt. Levin hat vielleicht nicht boes gemeint, was er getan hat – aber es hat trotzdem wehgetan. Beide Sachen koennen gleichzeitig stimmen."',
        speaker: 'Flora',
        speakerEmoji: '\u{1F469}\u{200D}\u{1F33E}',
        choices: [
          {
            id: 'garden-s1-c3a',
            text: '"Aber wie kann ich beiden helfen, ohne mich in der Mitte aufzureiben?"',
            consequence:
              'Flora laechelt. "Indem du kein Richter bist, sondern eine Bruecke. Du kannst beiden zuhoeren, ohne zu urteilen. Und vielleicht kannst du ihnen helfen, miteinander zu reden – statt uebereinander." Das klingt schwer, aber irgendwie richtig.',
            empathyPoints: 3,
            insightPoints: 2,
            couragePoints: 1,
            nextSceneId: 'garden-s1-scene-4',
          },
          {
            id: 'garden-s1-c3b',
            text: '"Ich fuehle mich schuldig, weil ich niemandem helfen kann."',
            consequence:
              'Flora legt sanft die Hand auf deine Schulter. "Du bist nicht dafuer verantwortlich, ihren Streit zu loesen. Das muessen sie selbst tun. Aber du kannst da sein – fuer beide – ohne dich zu zerreissen. Das ist keine Schwaeche. Das ist Weisheit."',
            empathyPoints: 2,
            insightPoints: 3,
            couragePoints: 1,
            nextSceneId: 'garden-s1-scene-4',
          },
        ],
      },
      {
        id: 'garden-s1-scene-4',
        text: 'Am naechsten Tag triffst du Nora und Levin getrennt. Du hast ueber Floras Worte nachgedacht. Vielleicht gibt es einen Weg, die beiden wieder ins Gespraech zu bringen – ohne dich als Richter in die Mitte zu stellen.',
        speaker: 'Erzaehler',
        speakerEmoji: '\u{1F33B}',
        choices: [
          {
            id: 'garden-s1-c4a',
            text: 'Beiden separat sagen: "Ich verstehe, wie du dich fuehlst. Aber ich glaube, ihr solltet miteinander reden, nicht ueber euch."',
            consequence:
              'Es dauert ein paar Tage, aber schliesslich reden Nora und Levin doch miteinander. Levin entschuldigt sich, Nora erklaert, warum es so wehgetan hat. Es ist nicht sofort alles gut – aber es ist ein Anfang. Und du hast gelernt: Man muss nicht waehlen, um ein guter Freund zu sein. Manchmal ist das Mutigste, ehrlich zu bleiben.',
            empathyPoints: 3,
            insightPoints: 2,
            couragePoints: 3,
            nextSceneId: null,
          },
          {
            id: 'garden-s1-c4b',
            text: 'Vorschlagen, dass ihr euch zu dritt trefft – an einem neutralen Ort, wo alle reden koennen.',
            consequence:
              'Ihr trefft euch nach der Schule im Park. Es ist am Anfang awkward. Aber weil du da bist, eskaliert es nicht. Nora sagt, wie sie sich gefuehlt hat. Levin sagt, dass es ihm leidtut. Langsam loest sich der Knoten. Flora hatte recht: Beziehungen sind wie Pflanzen – sie brauchen Pflege, Geduld und manchmal jemanden, der sie stuetzt.',
            empathyPoints: 4,
            insightPoints: 2,
            couragePoints: 2,
            nextSceneId: null,
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Scenario 2: "Wirklich zuhoeren"
  // Teaching: Aktives Zuhoeren bedeutet, praesent zu sein, nicht sofort Loesungen
  // zu liefern. Manchmal brauchen Menschen einfach jemanden, der da ist.
  // ---------------------------------------------------------------------------
  {
    id: 'garden-scenario-2',
    islandId: 'garden' as IslandId,
    title: 'Wirklich zuhoeren',
    description:
      'Deine Freundin Mara erzaehlt dir von einem Problem, das sie sehr belastet. Du merkst: Zuhoeren ist schwerer, als es klingt. Wie bist du wirklich fuer jemanden da?',
    scenes: [
      {
        id: 'garden-s2-scene-1',
        text: 'Mara und du sitzt auf eurer Lieblingsbank hinter der Sporthalle. Normalerweise lacht ihr hier zusammen und teilt Chips. Aber heute ist Mara still. Ihre Augen sind rot, als haette sie geweint. Schliesslich sagt sie leise: "Meine Eltern haben sich getrennt. Mein Papa zieht naechste Woche aus."',
        speaker: 'Mara',
        speakerEmoji: '\u{1F9D2}',
        choices: [
          {
            id: 'garden-s2-c1a',
            text: 'Erst mal nichts sagen. Einfach neben ihr sitzen und da sein.',
            consequence:
              'Du sagst nichts. Du sitzt einfach da. Nach einer Weile lehnt Mara sich an deine Schulter. "Danke, dass du einfach da bist", fluestert sie. Manchmal sind die kraftvollsten Worte gar keine Worte – sondern stille Naehe.',
            empathyPoints: 4,
            insightPoints: 2,
            couragePoints: 1,
            nextSceneId: 'garden-s2-scene-2',
          },
          {
            id: 'garden-s2-c1b',
            text: '"Oh nein, das tut mir so leid! Willst du darueber reden?"',
            consequence:
              'Mara nickt langsam. "Ich weiss nicht, wo ich anfangen soll." Du sagst: "Fang einfach irgendwo an. Ich hoere zu." Das Angebot, zuzuhoeren, ohne zu draengen, gibt Mara die Freiheit, so viel zu erzaehlen, wie sie moechte.',
            empathyPoints: 3,
            insightPoints: 2,
            couragePoints: 1,
            nextSceneId: 'garden-s2-scene-2',
          },
          {
            id: 'garden-s2-c1c',
            text: '"Das wird schon wieder! Vielleicht ist es ja gar nicht so schlimm?"',
            consequence:
              'Mara zuckt zusammen. "Es IST schlimm", sagt sie leise und wendet sich ab. Du merkst: Du wolltest helfen, aber Maras Gefuehle kleinzureden hat genau das Gegenteil bewirkt. Troesten ist gut gemeint – aber manchmal fuehlt es sich fuer den anderen an wie "Dein Schmerz zaehlt nicht."',
            empathyPoints: 0,
            insightPoints: 2,
            couragePoints: 0,
            nextSceneId: 'garden-s2-scene-2',
          },
        ],
      },
      {
        id: 'garden-s2-scene-2',
        text: 'Mara erzaehlt weiter. Wie sie ihre Eltern streiten gehoert hat. Wie ihr kleiner Bruder geweint hat. Wie alles sich anfuehlt, als wuerde der Boden unter ihren Fuessen verschwinden. In deinem Kopf tauchen sofort Ideen auf: "Vielleicht kommen sie wieder zusammen!" "Mein Cousin hat das auch erlebt, dem geht es gut!" Du willst helfen – aber wie?',
        speaker: 'Erzaehler',
        speakerEmoji: '\u{1F33B}',
        choices: [
          {
            id: 'garden-s2-c2a',
            text: 'Die Ratschlaege zurueckhalten und stattdessen fragen: "Wie fuehlt sich das gerade fuer dich an?"',
            consequence:
              'Mara ueberlegt. "Als haette jemand mein Zuhause in zwei Haelften gerissen." Indem du fragst, statt Loesungen zu geben, hilfst du Mara, ihre eigenen Gefuehle zu sortieren. Das ist echtes Zuhoeren – nicht nur warten, bis man selbst reden kann.',
            empathyPoints: 4,
            insightPoints: 2,
            couragePoints: 1,
            nextSceneId: 'garden-s2-scene-3',
          },
          {
            id: 'garden-s2-c2b',
            text: 'Von deinem Cousin erzaehlen, dessen Eltern sich auch getrennt haben, und wie es fuer ihn besser wurde.',
            consequence:
              'Mara hoert zu, aber du merkst, dass sie abschaltet. "Ja, vielleicht", sagt sie tonlos. Es war gut gemeint – aber gerade will Mara nicht hoeren, dass es anderen aehnlich geht. Sie will gehoert werden mit IHREM Schmerz. Flora fluestert: "Geschichten von anderen koennen spaeter helfen. Aber jetzt gerade braucht Mara jemanden, der nur IHR zuhoert."',
            empathyPoints: 1,
            insightPoints: 2,
            couragePoints: 0,
            nextSceneId: 'garden-s2-scene-3',
          },
          {
            id: 'garden-s2-c2c',
            text: 'Zusammenfassen, was du gehoert hast: "Also deine Eltern trennen sich, und du hast Angst, dass nichts mehr so ist wie vorher?"',
            consequence:
              'Mara sieht dich an und nickt heftig. "Ja! Genau das." Ihre Augen werden feucht, aber sie laechelt kurz. Du hast ihr gerade gezeigt, dass du wirklich zugehoert hast – nicht nur mit den Ohren, sondern mit dem Herzen. Das Zusammenfassen ist wie ein Spiegel: Es zeigt dem anderen, dass seine Worte angekommen sind.',
            empathyPoints: 4,
            insightPoints: 3,
            couragePoints: 1,
            nextSceneId: 'garden-s2-scene-3',
          },
        ],
      },
      {
        id: 'garden-s2-scene-3',
        text: 'Flora setzt sich zu euch. "Wisst ihr", sagt sie sanft, "in meinem Garten gibt es Pflanzen, die nur wachsen, wenn man ihnen Raum laesst. Nicht duengen, nicht schneiden – einfach nur Licht und Wasser. Bei Menschen ist das aehnlich. Manchmal braucht jemand keinen Rat und keine Loesung. Manchmal reicht es, zu sagen: Ich bin hier. Ich hoere dich. Deine Gefuehle sind okay."',
        speaker: 'Flora',
        speakerEmoji: '\u{1F469}\u{200D}\u{1F33E}',
        choices: [
          {
            id: 'garden-s2-c3a',
            text: 'Zu Mara sagen: "Ich kann das nicht fuer dich loesen. Aber ich bin hier, so lange du mich brauchst."',
            consequence:
              'Mara laechelt – das erste echte Laecheln an diesem Tag. "Das reicht mir gerade", sagt sie. Du merkst: Du musst kein Problem loesen, um ein guter Freund zu sein. Einfach da sein – aufrichtig und geduldig – ist manchmal das Groesste, was du jemandem geben kannst.',
            empathyPoints: 4,
            insightPoints: 2,
            couragePoints: 2,
            nextSceneId: 'garden-s2-scene-4',
          },
          {
            id: 'garden-s2-c3b',
            text: '"Mara, wenn du irgendwann reden willst – oder auch nicht reden willst – ich bin da. Immer."',
            consequence:
              'Mara drueckt deine Hand. "Danke. Ich glaub, ich brauch noch Zeit, um alles zu verarbeiten. Aber es hilft so sehr zu wissen, dass jemand zuhoert." Du hast ihr kein Versprechen gegeben, das du nicht halten kannst. Stattdessen hast du ihr etwas Ehrliches gegeben: Deine Anwesenheit.',
            empathyPoints: 3,
            insightPoints: 2,
            couragePoints: 2,
            nextSceneId: 'garden-s2-scene-4',
          },
        ],
      },
      {
        id: 'garden-s2-scene-4',
        text: 'Ein paar Wochen spaeter sitzt ihr wieder auf eurer Bank. Mara hat schwere Tage hinter sich, aber heute erzaehlt sie von ihrem neuen Zimmer bei ihrem Papa. Sie sagt: "Weisst du, was mir am meisten geholfen hat? Nicht die Tipps oder die Aufmunterungen. Sondern dass du einfach zugehoert hast. Ohne zu urteilen. Ohne es reparieren zu wollen. Das hat mir das Gefuehl gegeben, dass meine Gefuehle okay sind."',
        speaker: 'Mara',
        speakerEmoji: '\u{1F9D2}',
        choices: [
          {
            id: 'garden-s2-c4a',
            text: '"Ich hab dabei selbst etwas gelernt: Zuhoeren ist viel schwerer, als ich dachte. Aber auch viel wichtiger."',
            consequence:
              'Mara nickt. "Voll, oder? Die meisten Leute wollen sofort was sagen. Aber manchmal ist Stille das Lauteste, was man schenken kann." Flora winkt aus ihrem Garten. Eine neue Bluete hat sich geoeffnet – als haette sie auf diesen Moment gewartet.',
            empathyPoints: 3,
            insightPoints: 3,
            couragePoints: 1,
            nextSceneId: null,
          },
          {
            id: 'garden-s2-c4b',
            text: '"Ich bin einfach froh, dass es dir besser geht. Und dass du mir vertraut hast."',
            consequence:
              'Mara laechelt warm. "Du bist ein richtig guter Freund. Nicht weil du alles weisst, sondern weil du echt bist." Du merkst: Echte Naehe entsteht nicht durch perfekte Worte, sondern durch ehrliche Praesenz. Das ist das Geheimnis guter Beziehungen.',
            empathyPoints: 3,
            insightPoints: 2,
            couragePoints: 1,
            nextSceneId: null,
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Scenario 3: "Die Luege"
  // Teaching: Wenn ein Freund luegt, steckt oft Angst oder Scham dahinter.
  // Konfrontation mit Mitgefuehl ist besser als Vorwuerfe oder Schweigen.
  // ---------------------------------------------------------------------------
  {
    id: 'garden-scenario-3',
    islandId: 'garden' as IslandId,
    title: 'Die Luege',
    description:
      'Du merkst, dass dein Freund Tarik dich angelogen hat. Das tut weh und macht dich wuetend. Aber warum hat er gelogen – und wie gehst du damit um?',
    scenes: [
      {
        id: 'garden-s3-scene-1',
        text: 'Tarik hat letzte Woche gesagt, er kann nicht zu deiner Geburtstagsparty kommen, weil er mit seiner Familie verreist. Du warst enttaeuscht, aber hast es verstanden. Und dann: Am Samstag siehst du auf Instagram ein Foto von Tarik – bei einer anderen Party, hier in der Stadt. Er war gar nicht verreist. Er hat gelogen.',
        speaker: 'Erzaehler',
        speakerEmoji: '\u{1F33B}',
        choices: [
          {
            id: 'garden-s3-c1a',
            text: 'Sofort konfrontieren: Tarik eine Nachricht schicken mit dem Screenshot.',
            consequence:
              'Du schickst das Bild und schreibst: "Ach, Familienurlaub, ja?" Tarik liest die Nachricht und antwortet erst nach einer Stunde: "Kann ich erklaeren..." Du merkst, dass du zwar recht hast, aber die Art wie du es angesprochen hast, macht es Tarik schwer, ehrlich zu antworten.',
            empathyPoints: 0,
            insightPoints: 2,
            couragePoints: 2,
            nextSceneId: 'garden-s3-scene-2',
          },
          {
            id: 'garden-s3-c1b',
            text: 'Erstmal das Handy weglegen und ueberlegen, was du fuehlen tust und warum.',
            consequence:
              'Du sitzt auf deinem Bett und sortierst deine Gefuehle. Du bist verletzt. Nicht nur wegen der Party, sondern weil Tarik gelogen hat, statt ehrlich zu sein. Warum hat er nicht einfach die Wahrheit gesagt? Vielleicht steckt mehr dahinter, als du denkst.',
            empathyPoints: 2,
            insightPoints: 3,
            couragePoints: 1,
            nextSceneId: 'garden-s3-scene-2',
          },
          {
            id: 'garden-s3-c1c',
            text: 'So tun, als haettest du nichts gesehen, und abwarten.',
            consequence:
              'Du scrollst weiter und versuchst, es zu ignorieren. Aber das Gefuehl bleibt. Am naechsten Tag in der Schule laechelt Tarik dich an und du merkst: Es fuehlt sich falsch an, so zu tun, als waere nichts. Unausgesprochene Dinge haben die Eigenschaft, groesser zu werden.',
            empathyPoints: 0,
            insightPoints: 1,
            couragePoints: 0,
            nextSceneId: 'garden-s3-scene-2',
          },
        ],
      },
      {
        id: 'garden-s3-scene-2',
        text: 'Montagmorgen. Tarik kommt in die Schule und tut so, als waere alles normal. "Hey! Wie war deine Party? Sorry, dass ich nicht konnte – der Familienurlaub, du weisst ja." Er fuegt eine weitere Luege hinzu, ohne zu wissen, dass du die Wahrheit kennst.',
        speaker: 'Tarik',
        speakerEmoji: '\u{1F466}',
        choices: [
          {
            id: 'garden-s3-c2a',
            text: 'Ruhig sagen: "Tarik, ich hab das Foto gesehen. Ich weiss, dass du nicht verreist warst."',
            consequence:
              'Tariks Gesicht wird blass. Einen Moment lang sieht er aus, als wuerde er eine weitere Ausrede suchen. Dann sackt er zusammen. "Okay... das stimmt. Es tut mir leid." Deine ruhige Ehrlichkeit hat ihm den Raum gegeben, seine Mauer fallen zu lassen.',
            empathyPoints: 2,
            insightPoints: 2,
            couragePoints: 3,
            nextSceneId: 'garden-s3-scene-3',
          },
          {
            id: 'garden-s3-c2b',
            text: 'Sarkastisch reagieren: "Klar, der Urlaub sah auf Instagram mega aus."',
            consequence:
              'Tarik erstarrt. "Du hast das gesehen?" Er wird rot und defensiv. "Na und? Ich darf doch auf Partys gehen!" Sarkasmus kann sich gut anfuehlen, aber er baut Mauern statt Bruecken. Jetzt verteidigt Tarik sich, statt ehrlich zu sein.',
            empathyPoints: 0,
            insightPoints: 1,
            couragePoints: 1,
            nextSceneId: 'garden-s3-scene-3',
          },
          {
            id: 'garden-s3-c2c',
            text: 'Mit Ich-Botschaft anfangen: "Tarik, ich fuehle mich verletzt, weil ich glaube, dass du mich angelogen hast."',
            consequence:
              'Tarik schluckt. Die Ich-Botschaft trifft ihn, aber sie greift ihn nicht an. "Ich... ja, du hast recht", sagt er leise. "Ich hab gelogen und es tut mir echt leid." Weil du dein Gefuehl geteilt hast statt einen Vorwurf zu machen, konnte Tarik zuhoeren, statt sich zu verteidigen.',
            empathyPoints: 3,
            insightPoints: 3,
            couragePoints: 3,
            nextSceneId: 'garden-s3-scene-3',
          },
        ],
      },
      {
        id: 'garden-s3-scene-3',
        text: 'Tarik setzt sich auf die Treppe und erzaehlt die ganze Geschichte. "Die anderen haben mich zu der Party eingeladen und gesagt, deine Party waere langweilig. Ich wollte nicht, dass die mich uncool finden. Also hab ich dir was vorgelogen. Ich weiss, das war mies." Sein Blick ist auf den Boden gerichtet.',
        speaker: 'Tarik',
        speakerEmoji: '\u{1F466}',
        choices: [
          {
            id: 'garden-s3-c3a',
            text: '"Ich verstehe, dass das Druck war. Aber es haette weniger wehgetan, wenn du ehrlich gewesen waerst."',
            consequence:
              'Tarik nickt. "Ja, ich weiss. Ich hatte Angst, dass du sauer wirst, wenn ich sage, dass ich zur anderen Party will. Aber jetzt bist du sauer UND ich hab gelogen. Das war dumm von mir." Du merkst: Hinter vielen Luegen steckt Angst – Angst vor Ablehnung, Angst davor, jemanden zu enttaeuschen.',
            empathyPoints: 3,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: 'garden-s3-scene-4',
          },
          {
            id: 'garden-s3-c3b',
            text: '"Weisst du, was am meisten wehtut? Nicht die Party. Sondern dass du mir nicht vertraut hast, die Wahrheit zu sagen."',
            consequence:
              'Tarik schaut dich an. "Daran hab ich gar nicht gedacht", sagt er leise. "Ich war so damit beschaeftigt, es allen recht zu machen, dass ich dem Menschen, der mir am wichtigsten ist, wehgetan habe." Das war ein ehrlicher Moment. Flora wuerde sagen: Aus diesem Samen kann etwas Neues wachsen.',
            empathyPoints: 3,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: 'garden-s3-scene-4',
          },
        ],
      },
      {
        id: 'garden-s3-scene-4',
        text: 'Bluete, die schuechterne Blume, oeffnet sich neben euch. "Ich kenne das Gefuehl", sagt sie leise. "Manchmal luegt man, weil die Wahrheit sich noch gruseliger anfuehlt. Aber eine Luege ist wie Unkraut – sie waechst und waechst, wenn man sie nicht rauszieht." Tarik schaut dich an. "Koennen wir... nochmal von vorne anfangen? Ich verspreche, naechstes Mal ehrlich zu sein. Auch wenn es schwer ist."',
        speaker: 'Bluete',
        speakerEmoji: '\u{1F33A}',
        choices: [
          {
            id: 'garden-s3-c4a',
            text: '"Ja, wir koennen das. Aber Vertrauen muss wieder wachsen – und das braucht Zeit."',
            consequence:
              'Tarik nickt. "Das ist fair." Ihr gebt euch die Hand. Es ist kein perfektes Ende – das Vertrauen ist angeknackst. Aber ihr habt ehrlich miteinander geredet, und das ist der erste Schritt. Vergebung ist kein Lichtschalter, den man umlegt. Sie ist ein Weg, den man zusammen geht.',
            empathyPoints: 3,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: null,
          },
          {
            id: 'garden-s3-c4b',
            text: '"Ich brauche noch etwas Zeit. Aber ich bin froh, dass du ehrlich warst – jetzt, am Ende."',
            consequence:
              'Tarik versteht. "Nimm dir die Zeit, die du brauchst. Ich bin hier." Du gehst nach Hause und merkst: Es ist okay, nicht sofort verzeihen zu muessen. Sich Zeit zu nehmen ist kein Zeichen von Kaelte – es ist ein Zeichen, dass dir die Freundschaft wichtig genug ist, um ehrlich mit deinen Gefuehlen zu sein.',
            empathyPoints: 2,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: null,
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Scenario 4: "Grenzen setzen"
  // Teaching: Nein sagen ist ein Akt der Selbstfuersorge. Echte Freunde
  // respektieren deine Grenzen. Du darfst deine Beduerfnisse ernst nehmen.
  // ---------------------------------------------------------------------------
  {
    id: 'garden-scenario-4',
    islandId: 'garden' as IslandId,
    title: 'Grenzen setzen',
    description:
      'Dein Freund Jonas ueberschreitet immer wieder deine Grenzen – er nimmt deine Sachen ohne zu fragen, macht Witze, die zu weit gehen, und erwartet, dass du immer fuer ihn da bist. Du magst ihn – aber so geht es nicht weiter.',
    scenes: [
      {
        id: 'garden-s4-scene-1',
        text: 'Es faengt mit kleinen Dingen an. Jonas nimmt sich einfach dein Essen aus der Brotdose – ohne zu fragen. Er liest laut vor, was auf deinem Handy steht, obwohl du das nicht willst. Er macht Witze ueber dich vor anderen und sagt "War doch nur Spass!", wenn du es nicht lustig findest. Heute hat er dein Notizbuch genommen und darin gelesen – dein privates Notizbuch, in das du deine Gedanken schreibst.',
        speaker: 'Erzaehler',
        speakerEmoji: '\u{1F33B}',
        choices: [
          {
            id: 'garden-s4-c1a',
            text: '"Jonas, gib mir sofort mein Notizbuch zurueck. Das ist privat."',
            consequence:
              'Jonas lacht. "Chill mal, ist doch nur ein Heft." Aber du bleibst fest. "Nein, es ist MEIN Heft und ich will nicht, dass du es liest." Jonas gibt es zurueck und murmelt "Bist du empfindlich." Dein Herz klopft, aber du hast deine Grenze gesetzt. Und das war richtig.',
            empathyPoints: 1,
            insightPoints: 2,
            couragePoints: 3,
            nextSceneId: 'garden-s4-scene-2',
          },
          {
            id: 'garden-s4-c1b',
            text: 'Nichts sagen und hoffen, dass er es von selbst zuruecklegt.',
            consequence:
              'Jonas blaettert weiter und liest eine Seite laut vor. Ein paar Leute lachen. Dir wird heiss und kalt. Du reisst ihm das Heft aus der Hand, aber der Schaden ist da. Flora fluestert: "Grenzen, die man nicht ausspricht, koennen andere nicht sehen."',
            empathyPoints: 0,
            insightPoints: 2,
            couragePoints: 0,
            nextSceneId: 'garden-s4-scene-2',
          },
          {
            id: 'garden-s4-c1c',
            text: 'Wegschauen und so tun, als waere es dir egal.',
            consequence:
              'Du drehst dich weg und tust, als wuerdest du etwas in deiner Tasche suchen. Aber innerlich kocht es. Dieses Gefuehl – dass jemand deine Grenzen uebergeht und du nichts sagst – ist ein Zeichen, dass etwas nicht stimmt. Und es wird nicht besser, wenn du es ignorierst.',
            empathyPoints: 0,
            insightPoints: 1,
            couragePoints: 0,
            nextSceneId: 'garden-s4-scene-2',
          },
        ],
      },
      {
        id: 'garden-s4-scene-2',
        text: 'Am Nachmittag klingelt dein Handy. Jonas. "Hey, kannst du mir bei den Mathe-Hausaufgaben helfen? Bin gleich bei dir." Du hast heute schon geplant, fuer dich zu sein – einfach mal Ruhe. Aber Jonas fragt nicht, ob es dir passt. Er kuendigt sich einfach an.',
        speaker: 'Erzaehler',
        speakerEmoji: '\u{1F33B}',
        choices: [
          {
            id: 'garden-s4-c2a',
            text: '"Heute passt es mir nicht, Jonas. Ich brauche den Nachmittag fuer mich."',
            consequence:
              'Kurze Stille am Telefon. "Echt jetzt? Ich brauch aber Hilfe!" Du bleibst ruhig: "Ich kann dir morgen helfen. Aber heute brauche ich meinen Freiraum." Jonas grummelt, aber du legst auf und merkst: Es fuehlt sich gut an, dein eigenes Beduerfnis ernst zu nehmen.',
            empathyPoints: 1,
            insightPoints: 3,
            couragePoints: 3,
            nextSceneId: 'garden-s4-scene-3',
          },
          {
            id: 'garden-s4-c2b',
            text: '"Ja klar, komm vorbei..." – auch wenn du eigentlich nicht willst.',
            consequence:
              'Jonas kommt, macht es sich gemuetlich, und du hilfst ihm zwei Stunden lang bei Mathe. Danach bist du muede und genervt. Aber nicht auf Jonas – auf dich selbst. Weil du schon wieder Ja gesagt hast, obwohl dein Koerper Nein geschrien hat. Flora sagt: "Jedes Mal, wenn du Ja sagst und Nein meinst, pflanzt du einen Samen der Frustration."',
            empathyPoints: 0,
            insightPoints: 2,
            couragePoints: 0,
            nextSceneId: 'garden-s4-scene-3',
          },
        ],
      },
      {
        id: 'garden-s4-scene-3',
        text: 'Flora setzt sich neben dich in den Garten. "Ich sehe, dass du kaempfst", sagt sie sanft. "Du willst ein guter Freund sein. Aber weisst du was? Ein guter Freund zu sein heisst nicht, keine Grenzen zu haben. Im Gegenteil: Grenzen sind wie Zaeune im Garten – sie schuetzen die Pflanzen, die dir am wichtigsten sind. Ohne Zaun trampelt irgendwann jemand ueber dein Beet."',
        speaker: 'Flora',
        speakerEmoji: '\u{1F469}\u{200D}\u{1F33E}',
        choices: [
          {
            id: 'garden-s4-c3a',
            text: '"Aber was, wenn Jonas sauer wird und mich nicht mehr mag, wenn ich Nein sage?"',
            consequence:
              'Flora schaut dich warm an. "Wenn eine Freundschaft nur funktioniert, solange du immer Ja sagst – dann ist das keine Freundschaft, die dich naehrt. Echte Freunde halten dein Nein aus. Sie respektieren es sogar. Und wenn nicht – dann ist das eine wichtige Information."',
            empathyPoints: 2,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: 'garden-s4-scene-4',
          },
          {
            id: 'garden-s4-c3b',
            text: '"Ich merke immer erst hinterher, dass ich haette Nein sagen sollen. Im Moment selbst traue ich mich nicht."',
            consequence:
              'Flora nickt. "Das kennen viele Menschen. Der Trick ist: Uebe mit kleinen Neins. Sag Nein zu Dingen, die nicht so schwer wiegen. Und merk dir, wie es sich anfuehlt. Mit der Zeit wird es leichter, weil du erlebst, dass die Welt nicht untergeht, wenn du deine Grenzen setzt."',
            empathyPoints: 1,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: 'garden-s4-scene-4',
          },
        ],
      },
      {
        id: 'garden-s4-scene-4',
        text: 'Am naechsten Tag in der Schule nimmt Jonas wieder einfach deinen Stift vom Tisch. Normalerweise wuerdest du nichts sagen. Aber heute ist anders. Du hast nachgedacht. Du hast mit Flora gesprochen. Und du weisst jetzt: Deine Grenzen sind nicht egoistisch – sie sind notwendig.',
        speaker: 'Erzaehler',
        speakerEmoji: '\u{1F33B}',
        choices: [
          {
            id: 'garden-s4-c4a',
            text: '"Jonas, ich muss mit dir reden. Es gibt ein paar Dinge, die mich stoeren, und ich will ehrlich mit dir sein."',
            consequence:
              'Jonas schaut ueberrascht. Du erklaerst ruhig: Dass du es nicht magst, wenn er deine Sachen nimmt. Dass seine Witze manchmal wehtun. Dass du auch mal Nein sagen darfst. Jonas ist erst still, dann sagt er: "Ich wusste nicht, dass dich das so stresst. Sorry." Es ist ein Anfang. Vielleicht wird sich nicht alles sofort aendern – aber du hast gesprochen. Und das allein ist schon mutig.',
            empathyPoints: 2,
            insightPoints: 2,
            couragePoints: 4,
            nextSceneId: 'garden-s4-scene-5',
          },
          {
            id: 'garden-s4-c4b',
            text: 'Ruhig, aber bestimmt sagen: "Hey, frag bitte, bevor du meine Sachen nimmst."',
            consequence:
              'Jonas blinzelt. "Oh. Ja, klar, sorry." Er gibt den Stift zurueck. Es war nur ein kleiner Satz – aber er hat eine grosse Botschaft: Ich habe Grenzen, und ich erwarte, dass du sie respektierst. Bluete oeffnet ihre Blaetter neben dir und fluestert: "Der erste Zaun steht. Du bist auf dem richtigen Weg."',
            empathyPoints: 1,
            insightPoints: 2,
            couragePoints: 3,
            nextSceneId: 'garden-s4-scene-5',
          },
        ],
      },
      {
        id: 'garden-s4-scene-5',
        text: 'Ein paar Wochen spaeter hat sich etwas veraendert. Jonas fragt jetzt meistens, bevor er deine Sachen nimmt. Nicht immer – alte Gewohnheiten brauchen Zeit. Aber er versucht es. Und du hast gelernt, frueher Nein zu sagen, bevor sich die Frustration aufstaut. Eure Freundschaft ist nicht kaputt gegangen – sie ist ehrlicher geworden.',
        speaker: 'Erzaehler',
        speakerEmoji: '\u{1F33B}',
        choices: [
          {
            id: 'garden-s4-c5a',
            text: '"Nein sagen war das Schwierigste, was ich je gemacht habe. Aber auch das Wichtigste."',
            consequence:
              'Flora laechelt aus ihrem Garten. "Grenzen setzen ist wie Gaertnern: Du entscheidest, was in deinem Garten wachsen darf und was nicht. Das ist keine Gemeinheit – das ist Selbstfuersorge." Du weisst jetzt: Du darfst freundlich sein UND Grenzen haben. Beides schliesst sich nicht aus.',
            empathyPoints: 2,
            insightPoints: 3,
            couragePoints: 3,
            nextSceneId: null,
          },
          {
            id: 'garden-s4-c5b',
            text: '"Ich habe gemerkt: Meine Beduerfnisse sind genauso wichtig wie die von Jonas."',
            consequence:
              'Bluete nickt sanft. "Weisst du, ich war lange still, weil ich dachte, meine Beduerfnisse zaehlen weniger. Aber dann hab ich gelernt: Wenn ich nicht fuer mich selbst einstehe, wird es niemand tun. Und das heisst nicht, dass ich egoistisch bin – es heisst, dass ich mich ernst nehme." Genauso ist es. Deine Stimme zaehlt.',
            empathyPoints: 2,
            insightPoints: 3,
            couragePoints: 2,
            nextSceneId: null,
          },
        ],
      },
    ],
  },
];

// =============================================================================
// 2. WISDOM CARDS
// =============================================================================

export const gardenWisdomCards: WisdomCard[] = [
  {
    id: 'garden-wisdom-1',
    islandId: 'garden' as IslandId,
    text: 'Empathie heisst nicht, die Gefuehle anderer zu uebernehmen – sondern sie zu verstehen, ohne dich selbst dabei zu verlieren.',
    category: 'empathy',
    collected: false,
  },
  {
    id: 'garden-wisdom-2',
    islandId: 'garden' as IslandId,
    text: 'Zuhoeren ist mehr als Schweigen. Echtes Zuhoeren bedeutet: Ich bin ganz bei dir, mit meiner vollen Aufmerksamkeit.',
    category: 'empathy',
    collected: false,
  },
  {
    id: 'garden-wisdom-3',
    islandId: 'garden' as IslandId,
    text: 'Beziehungen sind wie Pflanzen – sie brauchen Pflege, Geduld und manchmal auch den Mut, Unkraut zu entfernen.',
    category: 'insight',
    collected: false,
  },
  {
    id: 'garden-wisdom-4',
    islandId: 'garden' as IslandId,
    text: 'Nein zu sagen ist kein Zeichen von Kaelte – es ist ein Zeichen, dass du dich selbst ernst nimmst.',
    category: 'courage',
    collected: false,
  },
  {
    id: 'garden-wisdom-5',
    islandId: 'garden' as IslandId,
    text: 'Wenn zwei Menschen streiten, haben meistens beide ein Stueck Wahrheit. Zuhoeren lohnt sich – auf beiden Seiten.',
    category: 'insight',
    collected: false,
  },
  {
    id: 'garden-wisdom-6',
    islandId: 'garden' as IslandId,
    text: 'Hinter einer Luege steckt oft Angst. Das macht sie nicht richtig – aber es hilft, sie zu verstehen.',
    category: 'empathy',
    collected: false,
  },
  {
    id: 'garden-wisdom-7',
    islandId: 'garden' as IslandId,
    text: 'Ich-Botschaften bauen Bruecken: "Ich fuehle mich verletzt, weil..." oeffnet Tueren, die "Du bist schuld!" zuschlaegt.',
    category: 'strategy',
    collected: false,
  },
  {
    id: 'garden-wisdom-8',
    islandId: 'garden' as IslandId,
    text: 'Vergebung ist kein Lichtschalter. Sie ist ein Weg, den man Schritt fuer Schritt geht – und manchmal braucht man dafuer Zeit.',
    category: 'insight',
    collected: false,
  },
  {
    id: 'garden-wisdom-9',
    islandId: 'garden' as IslandId,
    text: 'Grenzen sind wie Zaeune im Garten – sie zerstoeren nichts, sie schuetzen das, was dir wichtig ist.',
    category: 'courage',
    collected: false,
  },
  {
    id: 'garden-wisdom-10',
    islandId: 'garden' as IslandId,
    text: 'Du musst nicht jedes Problem loesen, um ein guter Freund zu sein. Manchmal reicht es, einfach da zu sein.',
    category: 'empathy',
    collected: false,
  },
  {
    id: 'garden-wisdom-11',
    islandId: 'garden' as IslandId,
    text: 'Echte Freundschaft haelt es aus, wenn du ehrlich bist – auch wenn Ehrlichkeit manchmal unbequem ist.',
    category: 'courage',
    collected: false,
  },
  {
    id: 'garden-wisdom-12',
    islandId: 'garden' as IslandId,
    text: 'Perspektivwechsel ist eine Superkraft: Wenn du versuchst, die Welt durch die Augen des anderen zu sehen, verstehst du auf einmal so viel mehr.',
    category: 'strategy',
    collected: false,
  },
];

// =============================================================================
// 3. ACTIVITIES
// =============================================================================

export const gardenActivities: GardenActivity[] = [
  // ---------------------------------------------------------------------------
  // Activity 1: Perspektiven-Prisma (Reflection)
  // Based on perspective-taking and cognitive empathy training
  // ---------------------------------------------------------------------------
  {
    id: 'garden-activity-1',
    islandId: 'garden' as IslandId,
    type: 'reflection',
    title: 'Perspektiven-Prisma',
    description:
      'Wie sieht die Welt durch die Augen eines anderen Menschen aus? In dieser Uebung lernst du, eine Situation aus verschiedenen Blickwinkeln zu betrachten – wie Licht, das durch ein Prisma faellt und viele Farben zeigt.',
    instructions: [
      'Denke an einen Streit oder ein Missverstaendnis, das du in letzter Zeit erlebt hast. Schreib kurz auf, was passiert ist – aus DEINER Sicht.',
      'Jetzt kommt der Perspektivwechsel: Stell dir vor, du waerst die andere Person. Was hat sie vielleicht gedacht? Was hat sie gefuehlt? Schreib die gleiche Situation nochmal auf – diesmal aus IHRER Sicht.',
      'Gibt es noch eine dritte Person, die dabei war? Oder einen unbeteiligten Beobachter? Schreib die Situation auch aus dieser dritten Perspektive auf.',
      'Vergleiche die drei Versionen. Was faellt dir auf? Wo sind die Unterschiede? Gibt es etwas, das du vorher nicht gesehen hast?',
      'Frage dich: Welche Gefuehle hatte die andere Person moeglicherweise, die ich nicht bemerkt habe? Was koennte sie dazu bewogen haben, so zu handeln?',
      'Schreib einen Satz auf, der mit "Ich verstehe jetzt, dass..." beginnt. Dieser Satz muss nicht heissen, dass du der anderen Person recht gibst – nur dass du ihre Seite besser siehst.',
      'Reflexion: Hat sich dein Gefuehl zu der Situation veraendert, nachdem du die anderen Perspektiven aufgeschrieben hast? Warum oder warum nicht?',
    ],
    completed: false,
  },

  // ---------------------------------------------------------------------------
  // Activity 2: Emotions-Detektor (Assessment)
  // Based on emotional literacy and social-emotional awareness
  // ---------------------------------------------------------------------------
  {
    id: 'garden-activity-2',
    islandId: 'garden' as IslandId,
    type: 'assessment',
    title: 'Emotions-Detektor',
    description:
      'Wie gut kannst du die Gefuehle anderer Menschen lesen? Der Emotions-Detektor hilft dir, deine Empathie-Faehigkeiten einzuschaetzen und zu trainieren.',
    instructions: [
      'Denke an fuenf verschiedene Menschen in deinem Leben: zum Beispiel beste Freundin, Elternteil, Klassenkamerad, Lehrkraft, Geschwister.',
      'Schreib fuer jede Person auf: Woran erkennst du, wenn diese Person gluecklich ist? Und woran, wenn sie traurig oder wuetend ist? Achte auf Koerpersprache, Stimme, Verhalten.',
      'Bewerte auf einer Skala von 1 bis 10: Wie gut kannst du die Gefuehle dieser Person normalerweise einschaetzen? (1 = Ich rate meistens, 10 = Ich merke es sofort)',
      'Gibt es Menschen, bei denen es dir schwerer faellt? Warum koennte das so sein? Manche Menschen zeigen ihre Gefuehle weniger – das macht es schwieriger, nicht dich schlechter.',
      'Denke an eine Situation, in der du die Gefuehle eines anderen Menschen FALSCH eingeschaetzt hast. Was ist passiert? Was hast du daraus gelernt?',
      'Uebung fuer die naechste Woche: Achte jeden Tag bewusst auf die Koerpersprache und die Stimmung einer Person in deinem Umfeld. Schreib abends kurz auf, was du beobachtet hast.',
      'Nach einer Woche: Schau dir deine Notizen an. Hat sich deine Wahrnehmung veraendert? Bemerkst du jetzt Dinge, die du vorher uebersehen hast?',
    ],
    completed: false,
  },

  // ---------------------------------------------------------------------------
  // Activity 3: Gespraechs-Simulator (Creative)
  // Based on active listening, I-messages, and assertive communication
  // ---------------------------------------------------------------------------
  {
    id: 'garden-activity-3',
    islandId: 'garden' as IslandId,
    type: 'creative',
    title: 'Gespraechs-Simulator',
    description:
      'In dieser kreativen Uebung erfindest du schwierige Gespraeche und uebst, wie du sie fuehren koenntest. Wie ein Flugsimulator – nur fuer Beziehungen!',
    instructions: [
      'Waehle eine dieser schwierigen Situationen (oder erfinde eine eigene): a) Ein Freund macht staendig Witze ueber dich, b) Du willst jemandem sagen, dass du verletzt bist, c) Zwei Freunde wollen, dass du Partei ergreifst.',
      'Schreib ein kurzes Gespraech auf (wie ein Drehbuch), in dem es SCHLECHT laeuft: Vorwuerfe, Geschrei, Missverstaendnisse. Was passiert, wenn man nicht auf den anderen eingeht?',
      'Jetzt schreib das GLEICHE Gespraech nochmal – aber diesmal mit den Garten-Werkzeugen: Ich-Botschaften ("Ich fuehle mich..., weil..."), aktives Zuhoeren (zusammenfassen, was der andere sagt), und Grenzen setzen ("Das ist fuer mich nicht okay").',
      'Vergleiche die beiden Versionen. Was ist anders? Wie fuehlt sich das Gespraech jeweils an – fuer BEIDE Personen?',
      'Bonus-Runde: Schreib den Dialog aus der Perspektive der ANDEREN Person. Wie fuehlt es sich an, wenn jemand dich mit Vorwuerfen konfrontiert? Und wie, wenn jemand mit Ich-Botschaften spricht?',
      'Wenn du magst, uebt das Gespraech mit einer Vertrauensperson oder lest es laut zusammen. Oft merkt man erst beim Sprechen, welche Worte wirklich helfen.',
      'Reflexion: Welche Formulierung hat sich fuer dich am natuerlichsten angefuehlt? Die kannst du dir fuer echte Situationen merken.',
    ],
    completed: false,
  },
];

// =============================================================================
// 4. NPCs
// =============================================================================

export const gardenNPCs: GardenNPC[] = [
  {
    id: 'garden-npc-flora',
    name: 'Flora',
    emoji: '\u{1F469}\u{200D}\u{1F33E}',
    description:
      'Die Gaertnerin des Beziehungsgartens. Flora hat warme Augen, erdige Haende und eine Stimme, die klingt wie Regen auf Blaettern. Sie spricht in Gartenmetaphern, weil sie glaubt, dass Beziehungen genau wie Pflanzen funktionieren.',
    backstory:
      'Flora hat selbst eine schwierige Vergangenheit mit Beziehungen. Als Jugendliche wollte sie es allen recht machen – sie sagte nie Nein, stellte ihre eigenen Beduerfnisse immer hinten an und verlor sich dabei fast selbst. Ihr Garten verdorrte, weil sie alle Energie an andere verschenkte, statt auch die eigenen Wurzeln zu giessen. Erst als sie lernte, dass Grenzen keine Mauern sind, sondern Zaeune, die das Wertvolle schuetzen, begann ihr Garten wieder zu bluehen. Heute hilft sie anderen zu verstehen, dass gesunde Beziehungen Pflege, Ehrlichkeit und gegenseitigen Respekt brauchen. Ihr Lieblingssatz: "Du kannst die schoensten Blumen pflanzen – aber wenn der Boden nicht stimmt, werden sie nicht wachsen. Und der Boden in Beziehungen heisst Vertrauen."',
  },
  {
    id: 'garden-npc-bluete',
    name: 'Bluete',
    emoji: '\u{1F33A}',
    description:
      'Eine schuechterne Blume, die erst lernt, sich zu oeffnen. Bluete spricht leise und zaghaft, aber ihre Worte tragen eine tiefe Wahrheit in sich. Sie beobachtet mehr, als sie sagt.',
    backstory:
      'Bluete war lange verschlossen – im wahrsten Sinne des Wortes. Sie hatte ihre Blaetter fest zusammengefaltet, weil sie Angst hatte, verletzt zu werden. Jedes Mal, wenn jemand zu nah kam, zog sie sich zusammen. "Wenn ich mich nicht oeffne, kann mich auch niemand verletzen", dachte sie. Aber sie merkte auch: Wenn sie sich nie oeffnet, kann sie auch keine Sonne spueren, keinen Regen trinken, keine Verbindung zu den anderen Pflanzen im Garten aufbauen. Langsam, Blatt fuer Blatt, lernt Bluete, sich zu zeigen – mit all ihren Farben, auch den zerbrechlichen. Sie hat gelernt, dass Verletzlichkeit keine Schwaeche ist, sondern der mutigste Weg zu echter Naehe. Ihr Lieblingssatz: "Sich zu oeffnen ist gruselig. Aber geschlossen bleiben ist einsam. Und Einsamkeit tut auf Dauer mehr weh als jede Enttaeuschung."',
  },
];
