// @ts-nocheck
// =============================================================================
// Nachtinsel (Night Island) – Achtsamkeit & Stressmanagement
// Inner Worlds – Social-Emotional Learning Game
//
// Alle Texte auf Deutsch, warmherzig und auf Augenhoehe fuer 10-15-Jaehrige.
// Therapeutisch fundiert: Stressbewältigung, Achtsamkeit, digitale Balance,
// Entspannungstechniken, Selbstfürsorge, Grounding.
//
// Hauptfigur: Yuki (14) – kaempft mit Gedankenkarussell, Schlafproblemen
// und uebermässiger Bildschirmzeit.
//
// Referenzen zu vorherigen Inseln:
//   - Vulkan (Wut/Anger management)
//   - Ozean (Trauer/Verlust)
//   - Wald (Angst/Mut)
//   - Berg (Selbstwert/Identitaet)
//   - Garten (Beziehungen/Kommunikation)
// =============================================================================

import type { Scenario, WisdomCard, Activity, IslandId } from '../../../types';

// -----------------------------------------------------------------------------
// Local Types
// -----------------------------------------------------------------------------

interface NightActivity extends Activity {
  instructions: string[];
}

// =============================================================================
// 1. NPCs (empty as specified)
// =============================================================================

export const nightNPCs: never[] = [];

// =============================================================================
// 2. SCENARIOS
// =============================================================================

export const nightScenarios: Scenario[] = [
  // ---------------------------------------------------------------------------
  // Scenario 1 – Das Rauschen der Gedanken
  // Thema: Was ist Stress, Gedankenkarussell, produktive vs. unproduktive Sorgen
  // Schwierigkeit: Einstieg
  // Key Learning: "Deine Gedanken sind wie Wolken am Himmel. Du bist nicht
  //               die Wolken – du bist der Himmel."
  // ---------------------------------------------------------------------------
  {
    id: 'night-scenario-1',
    islandId: 'night' as IslandId,
    title: 'Das Rauschen der Gedanken',
    description: 'Auf der Nachtinsel triffst du Yuki, die nicht schlafen kann, weil ihre Gedanken nicht aufhoeren zu rasen. Gemeinsam lernt ihr, was Stress wirklich ist – und dass Gedanken nicht die Wahrheit sind.',
    scenes: [
      {
        id: 'n1-s1',
        speaker: 'Erzaehler',
        speakerEmoji: '🌙',
        text: 'Die Nachtinsel empfaengt dich mit einem Himmel aus tiefem Dunkelblau, uebersaet mit Tausenden Sternen. Es ist still hier – so still, dass du deinen eigenen Herzschlag hoerst. In der Ferne schimmert ein See, und am Ufer sitzt ein Maedchen. Sie hat die Knie angezogen und starrt ins Wasser. Als du naeher kommst, hoerst du sie murmeln: "Was, wenn ich den Test verhaue... Was, wenn Lena mich nicht mehr mag... Was, wenn Mama wieder traurig ist..." Immer schneller, immer leiser.',
        choices: [
          {
            id: 'n1-s1-c1',
            text: 'Dich leise neben sie setzen und einfach da sein, ohne etwas zu sagen.',
            consequence: 'Manchmal ist die staerkste Geste einfach Anwesenheit. Yuki merkt, dass sie nicht allein ist.',
            nextSceneId: 'n1-s2',
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 1 }
          },
          {
            id: 'n1-s1-c2',
            text: '"Hey, alles okay? Du siehst aus, als wuerden deine Gedanken Achterbahn fahren."',
            consequence: 'Deine Beobachtung trifft genau ins Schwarze. Yuki schaut ueberrascht auf.',
            nextSceneId: 'n1-s2',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 1 }
          },
          {
            id: 'n1-s1-c3',
            text: 'Ihr sanft auf die Schulter tippen: "Darf ich mich setzen?"',
            consequence: 'Du fragst um Erlaubnis – das zeigt Respekt fuer ihren Raum.',
            nextSceneId: 'n1-s2',
            points: { empathyPoints: 2, insightPoints: 1, couragePoints: 2 }
          },
          {
            id: 'n1-s1-c4',
            text: '"Ach, stell dich nicht so an. Jeder hat mal Stress – einfach nicht drueber nachdenken!"',
            consequence: 'Yuki zieht sich zurueck. Ihre Sorgen werden nicht weniger – aber jetzt traut sie sich nicht mehr, darueber zu reden. Gefuehle kleinzureden macht sie nur groesser.',
            nextSceneId: 'n1-s2',
            isWrong: true,
            points: { empathyPoints: 0, insightPoints: 0, couragePoints: 0 }
          }
        ]
      },
      {
        id: 'n1-s2',
        speaker: 'Yuki',
        speakerEmoji: '🌌',
        text: 'Das Maedchen schaut dich an. Dunkle Augenringe, muede Augen, aber ein zaghaftes Laecheln. "Ich bin Yuki. Und ich... kann nicht schlafen. Schon seit Wochen nicht richtig." Sie zeigt auf das Wasser. Darin siehst du Bilder – wie einen Film: Klassenarbeiten, WhatsApp-Nachrichten, streitende Eltern, lachende Mitschueler ohne sie. "Mein Kopf macht das die ganze Nacht. Dieses... Rauschen. Wie ein Radio, das auf allen Sendern gleichzeitig laeuft. Und ich finde den Aus-Knopf nicht."',
        choices: [
          {
            id: 'n1-s2-c1',
            text: '"Das kenne ich. Dieses Gefuehl, wenn die Gedanken einfach nicht aufhoeren wollen."',
            consequence: 'Yuki entspannt sich sichtbar. Jemand versteht, was in ihrem Kopf los ist.',
            nextSceneId: 'n1-s3',
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 1 }
          },
          {
            id: 'n1-s2-c2',
            text: '"Weisst du, was mich interessiert: Sind das alles Dinge, die JETZT gerade passieren – oder Dinge, die passieren KOENNTEN?"',
            consequence: 'Eine kluge Frage. Yuki stutzt. Die meisten Bilder im Wasser zeigen Dinge, die noch gar nicht passiert sind.',
            nextSceneId: 'n1-s3',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'n1-s2-c3',
            text: '"Was waere, wenn du den Knopf nicht finden musst – sondern nur die Lautstaerke runterdrehen?"',
            consequence: 'Yuki blinzelt ueberrascht. Der Gedanke, dass sie die Gedanken nicht stoppen muss, ist neu fuer sie.',
            nextSceneId: 'n1-s3',
            points: { empathyPoints: 1, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'n1-s2-c4',
            text: '"Leg dich einfach hin und denk an was Schoenes. So schwer kann das doch nicht sein."',
            consequence: 'Yuki fuehlt sich missverstanden. Wenn es so einfach waere, haette sie es laengst gemacht. Solche Ratschlaege zeigen, dass man das Problem nicht ernst nimmt.',
            nextSceneId: 'n1-s3',
            isWrong: true,
            points: { empathyPoints: 0, insightPoints: 0, couragePoints: 0 }
          }
        ]
      },
      {
        id: 'n1-s3',
        speaker: 'Yuki',
        speakerEmoji: '🌌',
        text: 'Yuki schaut ins Wasser und zaehlt. "Drei von fuenf Bildern... sind Dinge, die noch gar nicht passiert sind." Sie sieht dich erstaunt an. "Mein Kopf macht sich Sorgen ueber Sachen, die vielleicht NIE passieren?" Du nickst. "Das nennt man Gedankenkarussell. Dein Gehirn versucht, dich zu beschuetzen – es ist wie ein Alarmsystem. Aber manchmal geht der Alarm los, obwohl kein Feuer da ist." Yuki fluestert: "Wie ein Rauchmelder, der beim Toasten angeht?" Du laechelst. "Genau so."',
        choices: [
          {
            id: 'n1-s3-c1',
            text: '"Stress ist eigentlich dein Koerper, der sagt: Achtung, hier stimmt was nicht. Aber er kann sich auch irren."',
            consequence: 'Yuki versteht zum ersten Mal, dass Stress eine koerperliche Reaktion ist – kein Beweis dafuer, dass alles schlimm ist.',
            nextSceneId: 'n1-s4',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'n1-s3-c2',
            text: '"Im Wald habe ich gelernt: Angst ist ein Signal, kein Urteil. Vielleicht gilt das auch fuer deine Sorgen."',
            consequence: 'Yuki denkt darueber nach. Der Vergleich hilft ihr, ihre Gedanken als Information zu sehen – nicht als Wahrheit.',
            nextSceneId: 'n1-s4',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 1 }
          },
          {
            id: 'n1-s3-c3',
            text: '"Wollen wir mal sortieren? Welche Sorgen kannst du wirklich beeinflussen – und welche nicht?"',
            consequence: 'Gemeinsam teilt ihr die Bilder im Wasser in zwei Gruppen. Die Sorgen, die Yuki beeinflussen kann, werden weniger bedrohlich.',
            nextSceneId: 'n1-s4',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'n1-s3-c4',
            text: '"Sorgen sind total ueberfluessig. Einfach ignorieren und ablenken, dann gehen die schon weg."',
            consequence: 'Yuki versucht, ihre Sorgen zu unterdruecken. Aber verdraengte Gedanken kommen immer staerker zurueck – wie ein Wasserball, den man unter Wasser drueckt.',
            nextSceneId: 'n1-s4',
            isWrong: true,
            points: { empathyPoints: 0, insightPoints: 0, couragePoints: 0 }
          }
        ]
      },
      {
        id: 'n1-s4',
        speaker: 'Erzaehler',
        speakerEmoji: '🌙',
        text: 'Yuki starrt auf die sortierten Bilder im Wasser. Zwei Stapel: "Kann ich aendern" und "Kann ich nicht aendern." Der zweite Stapel ist groesser. "Und was mache ich mit denen, die ich nicht aendern kann?" fragt sie leise. Du schaust zum Himmel. Die Sterne leuchten ruhig, unveraendert. "Sieh mal nach oben", sagst du. "Die Wolken ziehen ueber den Himmel. Manche sind dunkel, manche hell. Aber der Himmel dahinter – der bleibt immer gleich." Yuki schaut hoch. "Du meinst... ich bin der Himmel? Nicht die Wolken?"',
        choices: [
          {
            id: 'n1-s4-c1',
            text: '"Genau. Deine Gedanken sind wie Wolken. Sie kommen und gehen. Aber du bist der Himmel – weit und ruhig."',
            consequence: 'Yuki schliesst die Augen. Zum ersten Mal seit Wochen spuert sie etwas wie Ruhe. Nicht viel – aber genug.',
            nextSceneId: 'n1-s5',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'n1-s4-c2',
            text: '"Du musst die Wolken nicht wegschieben. Du kannst sie anschauen und sagen: Okay, ich sehe dich. Und dann laesst du sie weiterziehen."',
            consequence: 'Yuki probiert es. Sie benennt einen Gedanken: "Sorge ueber den Test." Und stellt sich vor, wie er als Wolke vorbeizieht.',
            nextSceneId: 'n1-s5',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'n1-s4-c3',
            text: '"Auf dem Berg habe ich gelernt: Ich bin nicht das, was andere ueber mich sagen. Und hier lernst du: Du bist nicht das, was dein Kopf dir erzaehlt."',
            consequence: 'Yuki nickt langsam. Die Verbindung zwischen Selbstwert und Gedankenfreiheit leuchtet ihr ein.',
            nextSceneId: 'n1-s5',
            points: { empathyPoints: 1, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'n1-s4-c4',
            text: '"Gedanken sind egal – einfach TikTok anmachen und ablenken, dann wird das schon."',
            consequence: 'Yuki greift zum Handy. Die Gedanken werden kurz leiser, aber die Bildschirmzeit macht die Schlafprobleme noch schlimmer. Ablenkung ist keine Loesung – sie ist Aufschub.',
            nextSceneId: 'n1-s5',
            isWrong: true,
            points: { empathyPoints: 0, insightPoints: 0, couragePoints: 0 }
          }
        ]
      },
      {
        id: 'n1-s5',
        speaker: 'Yuki',
        speakerEmoji: '🌌',
        text: 'Yuki atmet tief durch. Das Wasser im See wird ruhiger – die Bilder verschwimmen. "Es ist nicht weg", sagt sie leise. "Die Sorgen sind noch da. Aber sie sind... leiser." Sie schaut dich an, und zum ersten Mal ist da ein echtes Laecheln. "Dankeschoen. Ich dachte, mit mir stimmt was nicht, weil mein Kopf nicht aufhoert. Aber es ist einfach... mein Alarmsystem, das ueberreagiert?" Du nickst. "Und du kannst lernen, damit umzugehen. Nicht heute Nacht. Aber Schritt fuer Schritt." Yuki legt sich zurueck ins Gras und schaut zu den Sternen. "Ich bin der Himmel", fluestert sie. "Nicht die Wolken."',
        choices: [
          {
            id: 'n1-s5-c1',
            text: 'Dich neben sie legen und gemeinsam die Sterne betrachten. Manchmal braucht es nicht mehr.',
            consequence: 'In der Stille spuert ihr beide: Dieser Moment ist genug. Kein Gedanke noetig.',
            nextSceneId: null,
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 1 }
          },
          {
            id: 'n1-s5-c2',
            text: '"Morgen zeige ich dir etwas, das mir gegen das Gedankenrauschen hilft. Aber heute Nacht – einfach atmen."',
            consequence: 'Yuki schliesst die Augen. Zum ersten Mal seit Wochen schlaeft sie vor Mitternacht ein.',
            nextSceneId: null,
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 1 }
          },
          {
            id: 'n1-s5-c3',
            text: '"Du bist nicht kaputt, Yuki. Dein Gehirn arbeitet nur Ueberstunden. Wir bringen ihm bei, Feierabend zu machen."',
            consequence: 'Yuki lacht leise – das erste Mal seit langem. Es klingt wie Hoffnung.',
            nextSceneId: null,
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 1 }
          },
          {
            id: 'n1-s5-c4',
            text: '"Siehst du, war doch gar nicht so schlimm. Du hast einfach uebertrieben mit deinen Sorgen."',
            consequence: 'Yukis Laecheln verschwindet. Ihre Erleichterung wird von dem Gefuehl ueberdeckt, dass ihre Gefuehle unwichtig sind. Gefuehle herunterspielen ist das Gegenteil von Achtsamkeit.',
            nextSceneId: null,
            isWrong: true,
            points: { empathyPoints: 0, insightPoints: 0, couragePoints: 0 }
          }
        ]
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // Scenario 2 – Gefangen im Bildschirm
  // Thema: Digitale Balance, Dopamin-Schleifen, FOMO, Social-Media-Vergleich
  // Schwierigkeit: Mittel
  // Key Learning: "Dein Handy kann ein Werkzeug sein oder ein Gefaengnis.
  //               Du entscheidest."
  // ---------------------------------------------------------------------------
  {
    id: 'night-scenario-2',
    islandId: 'night' as IslandId,
    title: 'Gefangen im Bildschirm',
    description: 'Yuki verraet dir ihr Geheimnis: Sie verbringt jede Nacht Stunden auf Social Media – nicht weil es ihr Spass macht, sondern weil die Angst sonst zu laut wird.',
    scenes: [
      {
        id: 'n2-s1',
        speaker: 'Yuki',
        speakerEmoji: '🌌',
        text: 'Du triffst Yuki am naechsten Abend. Sie sieht noch mueder aus als gestern. "Ich muss dir was zeigen", sagt sie und haelt dir ihr Handy hin. Der Bildschirmzeit-Bericht leuchtet: 6 Stunden und 23 Minuten. An einem Schultag. "Ich weiss, das klingt viel", fluestert sie. "Aber wenn ich aufhoere zu scrollen, kommen die Gedanken zurueck. TikTok, Insta, YouTube – die machen den Laerm in meinem Kopf leiser." Sie schluckt. "Nur... morgens fuehle ich mich dann noch schlechter."',
        choices: [
          {
            id: 'n2-s1-c1',
            text: '"Danke, dass du mir das zeigst. Das braucht Mut. Darf ich fragen – wie fuehlst du dich WAEHREND du scrollst?"',
            consequence: 'Yuki denkt nach. "Am Anfang gut. Abgelenkt. Aber nach einer Stunde... leer. Und trotzdem hoere ich nicht auf."',
            nextSceneId: 'n2-s2',
            points: { empathyPoints: 3, insightPoints: 2, couragePoints: 0 }
          },
          {
            id: 'n2-s1-c2',
            text: '"6 Stunden – das sind 42 Stunden pro Woche. Fast ein ganzer Job. Hast du das mal so gesehen?"',
            consequence: 'Yuki wird blass. "So habe ich das noch nie gerechnet." Die Zahl haengt schwer in der Luft.',
            nextSceneId: 'n2-s2',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'n2-s1-c3',
            text: '"Du benutzt das Handy als Schmerzmittel. Nicht, weil du schwach bist – sondern weil du noch kein besseres gefunden hast."',
            consequence: 'Yuki starrt dich an. "Schmerzmittel... ja. Genau so fuehlt es sich an." Niemand hat es bisher so beschrieben.',
            nextSceneId: 'n2-s2',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 1 }
          },
          {
            id: 'n2-s1-c4',
            text: '"6 Stunden? Das ist doch normal heutzutage. Ich bin noch laenger am Handy – mach dir keinen Kopf!"',
            consequence: 'Yuki fuehlt sich kurz besser – aber das Problem bleibt. Nur weil etwas verbreitet ist, heisst es nicht, dass es gesund ist. Probleme zu normalisieren verhindert Veraenderung.',
            nextSceneId: 'n2-s2',
            isWrong: true,
            points: { empathyPoints: 0, insightPoints: 0, couragePoints: 0 }
          }
        ]
      },
      {
        id: 'n2-s2',
        speaker: 'Erzaehler',
        speakerEmoji: '🌙',
        text: 'Yuki oeffnet Instagram und zeigt dir ihren Feed. Perfekte Koerper, Urlaube, lachende Gruppen, Fitness-Transformationen. "Schau dir das an", sagt sie. "Alle sehen gluecklich aus. Nur ich sitze hier und kriege mein Leben nicht auf die Reihe." Du schaust genauer hin. Jedes Bild ist bearbeitet, jeder Moment inszeniert. "Yuki, weisst du, was ein Highlight-Reel ist?" Sie schuettelt den Kopf. "Das hier ist wie ein Filmtrailer – nur die besten Szenen. Du vergleichst ihren Trailer mit deinem ganzen Film, inklusive der langweiligen und traurigen Stellen."',
        choices: [
          {
            id: 'n2-s2-c1',
            text: '"Hinter jedem perfekten Bild steckt eine echte Person mit echten Problemen. Die zeigen sie nur nicht."',
            consequence: 'Yuki scrollt langsamer. Sie stellt sich vor, was hinter den Bildern steckt. Es veraendert alles.',
            nextSceneId: 'n2-s3',
            points: { empathyPoints: 2, insightPoints: 3, couragePoints: 0 }
          },
          {
            id: 'n2-s2-c2',
            text: '"Wie fuehlst du dich NACH 20 Minuten Instagram? Besser oder schlechter als vorher?"',
            consequence: 'Yuki ist ehrlich: "Schlechter. Fast immer." Die Erkenntnis trifft sie wie ein kalter Windstoss.',
            nextSceneId: 'n2-s3',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'n2-s2-c3',
            text: '"Auf dem Berg habe ich gelernt: Mein Wert haengt nicht von Vergleichen ab. Das gilt auch fuer Social Media."',
            consequence: 'Yuki erinnert sich an ihre eigene Unsicherheit. Vielleicht fuettert sie sie jeden Abend, ohne es zu merken.',
            nextSceneId: 'n2-s3',
            points: { empathyPoints: 1, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'n2-s2-c4',
            text: '"Die Leute auf Insta haben halt einfach ein besseres Leben. So ist das eben – manche haben mehr Glueck."',
            consequence: 'Yuki fuehlt sich noch kleiner. Der Vergleich mit inszenierten Bildern frisst ihr Selbstwertgefuehl auf. Soziale Medien zeigen nicht die Realitaet – nur die Fassade.',
            nextSceneId: 'n2-s3',
            isWrong: true,
            points: { empathyPoints: 0, insightPoints: 0, couragePoints: 0 }
          }
        ]
      },
      {
        id: 'n2-s3',
        speaker: 'Yuki',
        speakerEmoji: '🌌',
        text: '"Aber ich kann nicht einfach aufhoeren", sagt Yuki. "Wenn ich das Handy weglege, habe ich Angst, was zu verpassen. Was, wenn jemand was Wichtiges postet? Was, wenn in der Gruppe ueber mich geredet wird und ich es nicht mitkriege?" Du erkennst das Muster: FOMO – Fear Of Missing Out. Die Angst, aussen vor zu sein. "Yuki, was verpasst du JETZT, waehrend du auf den Bildschirm schaust?" Sie blickt auf – und sieht zum ersten Mal den unglaublichen Sternenhimmel ueber der Insel. Tausende Sterne, die sie in sechs Stunden Scrollen nie gesehen hat.',
        choices: [
          {
            id: 'n2-s3-c1',
            text: '"FOMO sagt dir: Du verpasst was. Aber in Wahrheit verpasst du dein echtes Leben, waehrend du das Leben anderer anschaust."',
            consequence: 'Yuki legt langsam das Handy ins Gras. Die Sterne spiegeln sich in ihren Augen. Schoener als jeder Feed.',
            nextSceneId: 'n2-s4',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'n2-s3-c2',
            text: '"Dein Handy ist programmiert, dich festzuhalten. Jeder Scroll gibt dir einen Mini-Kick – Dopamin. Wie ein Spielautomat."',
            consequence: 'Yuki versteht: Es ist nicht ihre Schuld, dass sie nicht aufhoeren kann. Die Apps sind dafuer GEBAUT.',
            nextSceneId: 'n2-s4',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'n2-s3-c3',
            text: '"Was waere, wenn die Leute in der Gruppe ueber dich reden – und du es NICHT liest? Wuerde sich morgen wirklich etwas aendern?"',
            consequence: 'Yuki denkt nach. "Wahrscheinlich nicht. Die meisten Chats vergesse ich sowieso am naechsten Tag." Die Erkenntnis ist befreiend.',
            nextSceneId: 'n2-s4',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 1 }
          },
          {
            id: 'n2-s3-c4',
            text: '"Du MUSST immer online sein, sonst verpasst du wirklich alles und deine Freunde vergessen dich!"',
            consequence: 'Yukis Angst wird groesser. Die FOMO-Spirale dreht sich schneller und sie greift panisch zum Handy zurueck. Angst zu schueren ist das Gegenteil von Hilfe.',
            nextSceneId: 'n2-s4',
            isWrong: true,
            points: { empathyPoints: 0, insightPoints: 0, couragePoints: 0 }
          }
        ]
      },
      {
        id: 'n2-s4',
        speaker: 'Erzaehler',
        speakerEmoji: '🌙',
        text: 'Yuki haelt ihr Handy in der Hand und schaut es an, als saehe sie es zum ersten Mal. "Es ist komisch", sagt sie. "Ich dachte, es hilft mir. Aber eigentlich macht es alles schlimmer. Die Vergleiche, das spaete Einschlafen, die mueden Augen." Sie dreht es um. "Aber ich kann es auch nicht einfach wegwerfen. Meine Freunde sind da. Meine Musik. Meine Hobbys." Du nickst. "Genau. Dein Handy ist ein Werkzeug. Wie ein Messer – du kannst damit Brot schneiden oder dich verletzen. Die Frage ist nicht OB du es benutzt, sondern WIE."',
        choices: [
          {
            id: 'n2-s4-c1',
            text: '"Drei einfache Regeln: Frag dich VOR dem Oeffnen WARUM. Setze einen Timer auf 20 Minuten. Und eine Stunde vor dem Schlafen: Handy weg."',
            consequence: 'Yuki schreibt die Regeln auf. Klein anfangen. Nicht alles auf einmal. Schritt fuer Schritt.',
            nextSceneId: 'n2-s5',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'n2-s4-c2',
            text: '"Entfolge jedem Account, nach dem du dich SCHLECHTER fuehlst. Dein Feed soll dich inspirieren, nicht runterziehen."',
            consequence: 'Yuki oeffnet ihre Abonnenten-Liste. Zum ersten Mal fragt sie sich: Tut mir das wirklich gut?',
            nextSceneId: 'n2-s5',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'n2-s4-c3',
            text: '"Du entscheidest, wie du dein Handy nutzt – nicht der Algorithmus. Das ist dein Recht."',
            consequence: 'Yukis Augen leuchten. Die Idee, die Kontrolle zurueckzunehmen, gibt ihr Kraft.',
            nextSceneId: 'n2-s5',
            points: { empathyPoints: 1, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'n2-s4-c4',
            text: '"Installier doch noch mehr Apps – es gibt bestimmt eine App, die dein Handyproblem loest!"',
            consequence: 'Noch mehr Bildschirmzeit als Loesung fuer zu viel Bildschirmzeit? Das ist wie Feuer mit Benzin loeschen. Die Loesung liegt nicht im Bildschirm, sondern ausserhalb davon.',
            nextSceneId: 'n2-s5',
            isWrong: true,
            points: { empathyPoints: 0, insightPoints: 0, couragePoints: 0 }
          }
        ]
      },
      {
        id: 'n2-s5',
        speaker: 'Yuki',
        speakerEmoji: '🌌',
        text: 'Yuki legt das Handy ins Gras neben sich. Bildschirm nach unten. Es ist eine kleine Geste, aber sie fuehlt sich riesig an. "Ich glaube, ich habe mein Handy benutzt, um vor mir selbst wegzulaufen", sagt sie leise. "Wie eine Betaeubung. Wenn ich scrolle, muss ich nicht fuehlen." Sie sieht dich an. "Auf der Vulkaninsel geht es um Wut, die man nicht ausdrueckt. Vielleicht ist das hier aehnlich – Gefuehle, vor denen ich weglaufe, statt sie zu fuehlen." Sie atmet tief durch. "Dein Handy kann ein Werkzeug sein oder ein Gefaengnis. Ich entscheide." Eine Sternschnuppe zieht ueber den Himmel.',
        choices: [
          {
            id: 'n2-s5-c1',
            text: '"Genau. Und du hast gerade den ersten Schritt gemacht – das Bewusstwerden. Das ist der schwerste."',
            consequence: 'Yuki laechelt. Zum ersten Mal seit Wochen hat sie das Handy nicht vermisst.',
            nextSceneId: null,
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 1 }
          },
          {
            id: 'n2-s5-c2',
            text: 'Gemeinsam die Sternschnuppe anschauen. "Das hier – genau DIESEN Moment – haettest du auf dem Handy verpasst."',
            consequence: 'Yuki nickt. Der Moment ist realer als jeder Post. Und er gehoert nur ihnen beiden.',
            nextSceneId: null,
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 1 }
          },
          {
            id: 'n2-s5-c3',
            text: '"Morgen zeige ich dir, wie du die Stille aushalten kannst – ohne Bildschirm und ohne Angst."',
            consequence: 'Yuki ist nervoes, aber auch neugierig. Zum ersten Mal freut sie sich auf morgen – und nicht auf den naechsten Feed.',
            nextSceneId: null,
            points: { empathyPoints: 1, insightPoints: 2, couragePoints: 2 }
          }
        ]
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // Scenario 3 – Die Kunst der Stille
  // Thema: Achtsamkeit, Body Scan, Grounding (5-4-3-2-1), Box Breathing,
  //         Progressive Muskelentspannung
  // Schwierigkeit: Mittel-Hoch
  // Key Learning: "Du kannst nicht kontrollieren, was passiert. Aber du kannst
  //               kontrollieren, wie du darauf reagierst."
  // ---------------------------------------------------------------------------
  {
    id: 'night-scenario-3',
    islandId: 'night' as IslandId,
    title: 'Die Kunst der Stille',
    description: 'Yuki lernt konkrete Werkzeuge kennen, um im Moment zu sein: Atemtechniken, Grounding und die Kraft der Achtsamkeit.',
    scenes: [
      {
        id: 'n3-s1',
        speaker: 'Yuki',
        speakerEmoji: '🌌',
        text: '"Ich habe gestern das Handy um 22 Uhr weggelegt", erzaehlt Yuki. "Und dann... Stille. Und sofort kamen die Gedanken zurueck. Lauter als vorher." Sie zittert leicht. "Ich habe mich hingesetzt und wollte die Wolken-Uebung machen, aber die Wolken wurden zu einem Sturm. Alles auf einmal: Schule, Freunde, Zukunft, ob ich gut genug bin..." Sie schaut dich hilfesuchend an. "Du hast gesagt, du zeigst mir was. Bitte. Ich brauche es."',
        choices: [
          {
            id: 'n3-s1-c1',
            text: '"Dass du es probiert hast, ist schon riesig. Der erste Schritt ist immer der schwerste. Und ich zeige dir jetzt etwas Konkretes."',
            consequence: 'Yuki atmet auf. Sie ist bereit zu lernen.',
            nextSceneId: 'n3-s2',
            points: { empathyPoints: 2, insightPoints: 1, couragePoints: 2 }
          },
          {
            id: 'n3-s1-c2',
            text: '"Im Wald habe ich gelernt: Wenn die Angst kommt, kaempfe nicht gegen sie. Komm zurueck in deinen Koerper. Genau das ueben wir jetzt."',
            consequence: 'Yuki nickt. Die Verbindung zum Koerper – das ist der Schluessel.',
            nextSceneId: 'n3-s2',
            points: { empathyPoints: 1, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'n3-s1-c3',
            text: '"Der Sturm im Kopf ist nicht dein Feind. Er zeigt dir, dass du etwas Wichtiges fuehlst. Wir lernen jetzt, durch den Sturm zu navigieren."',
            consequence: 'Yuki entspannt sich. Nicht GEGEN den Sturm – DURCH ihn hindurch.',
            nextSceneId: 'n3-s2',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'n3-s2',
        speaker: 'Erzaehler',
        speakerEmoji: '🌙',
        text: 'Du setzt dich Yuki gegenueber ins silberne Gras. "Erste Technik: 5-4-3-2-1 Grounding. Wenn dein Kopf in die Zukunft rast oder in der Vergangenheit feststeckt, holt dich diese Uebung zurueck ins Jetzt." Du fuehrst sie an: "Nenne mir 5 Dinge, die du SIEHST." Yuki schaut sich um. "Den See. Die Sterne. Das Gras. Meine Haende. Einen Schmetterling aus Licht." – "4 Dinge, die du HOERST." – "Wind. Wasser. Mein Atem. Grillenzirpen." – "3 Dinge, die du FUEHLST." – "Das Gras unter mir. Die kühle Luft. Mein Herzschlag." – "2 Dinge, die du RIECHST." – "Lavendel. Feuchte Erde." – "1 Ding, das du SCHMECKST." – "Minze... von dem Tee vorhin."',
        choices: [
          {
            id: 'n3-s2-c1',
            text: '"Und? Wo sind deine Gedanken jetzt?"',
            consequence: 'Yuki stutzt. "Sie sind... leiser. Ich war gerade komplett HIER. Nicht in der Zukunft, nicht in der Vergangenheit."',
            nextSceneId: 'n3-s3',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'n3-s2-c2',
            text: '"Das ist Grounding – du holst dich zurueck in deinen Koerper. Dein Koerper ist immer im Jetzt, auch wenn dein Kopf woanders ist."',
            consequence: 'Yuki legt die Hand auf ihren Bauch. "Stimmt. Mein Koerper war die ganze Zeit hier. Nur mein Kopf nicht."',
            nextSceneId: 'n3-s3',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'n3-s2-c3',
            text: '"Du kannst das ueberall machen – im Bus, vor einer Klassenarbeit, nachts im Bett. Ohne dass es jemand merkt."',
            consequence: 'Yuki laechelt. "Eine geheime Superkraft." Genau. Eine, die man nicht sehen kann – aber die alles veraendert.',
            nextSceneId: 'n3-s3',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'n3-s3',
        speaker: 'Erzaehler',
        speakerEmoji: '🌙',
        text: '"Zweite Technik: Box Breathing – Kastenatmung", sagst du. "Stell dir ein Quadrat vor. Jede Seite ist 4 Sekunden." Du machst es vor: "Einatmen – 1, 2, 3, 4." Die erste Seite des Quadrats leuchtet auf. "Halten – 1, 2, 3, 4." Die zweite Seite. "Ausatmen – 1, 2, 3, 4." Die dritte. "Halten – 1, 2, 3, 4." Das Quadrat schliesst sich. Yuki atmet mit. Einmal. Zweimal. Dreimal. Bei jedem Durchgang wird das leuchtende Quadrat groesser und ruhiger. Yuki wird ruhiger. Ihr Herzschlag verlangsamt sich.',
        choices: [
          {
            id: 'n3-s3-c1',
            text: '"Das funktioniert, weil langsames Ausatmen deinem Nervensystem sagt: Keine Gefahr. Du kannst dich entspannen."',
            consequence: 'Yuki versteht die Wissenschaft dahinter. Das macht die Technik noch wirkungsvoller fuer sie.',
            nextSceneId: 'n3-s4',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'n3-s3-c2',
            text: '"Soldaten, Astronauten und Sportler nutzen diese Technik. Sie ist einfach – aber unglaublich machtvoll."',
            consequence: 'Yukis Augen weiten sich. "Wenn Astronauten das benutzen, ist es nicht uncool, wenn ich es auch mache." Genau.',
            nextSceneId: 'n3-s4',
            points: { empathyPoints: 1, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'n3-s3-c3',
            text: '"Mach vier Runden, wenn es im Kopf laut wird. Mehr brauchst du nicht. Vier Kasten, vier Minuten, ein ruhigerer Kopf."',
            consequence: 'Yuki zaehlt mit. Nach vier Runden sagt sie: "Ich fuehle mich... klarer. Als haette jemand ein Fenster geoeffnet."',
            nextSceneId: 'n3-s4',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'n3-s4',
        speaker: 'Erzaehler',
        speakerEmoji: '🌙',
        text: '"Letzte Technik", sagst du. "Progressive Muskelentspannung. Klingt kompliziert, ist es aber nicht." Du zeigst es Yuki: "Balle die Faeuste, so fest du kannst. Halte 5 Sekunden. Und jetzt – loslassen." Yuki macht es. Ihre Haende entspannen sich und sie spuert den Unterschied. "Jetzt die Schultern. Hochziehen, anspannen, 5 Sekunden. Und... loslassen." Yuki laesst die Schultern fallen. "Oh", sagt sie ueberrascht. "Die waren die ganze Zeit angespannt. Ich habe es nicht mal gemerkt." Du laechelst. "Die meisten merken es nicht. Stress versteckt sich im Koerper."',
        choices: [
          {
            id: 'n3-s4-c1',
            text: '"Mach das abends im Bett: Fuesse, Beine, Bauch, Haende, Schultern, Gesicht. Koerperteil fuer Koerperteil entspannen."',
            consequence: 'Yuki geht die Koerperteile durch. Bei jedem faellt ein bisschen mehr Anspannung ab. Wie Schichten, die sich loesen.',
            nextSceneId: 'n3-s5',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'n3-s4-c2',
            text: '"Dein Koerper ist wie ein Seismograph – er spuert den Stress, bevor dein Kopf es merkt. Lerne, auf ihn zu hoeren."',
            consequence: 'Yuki schliesst die Augen und horcht in sich hinein. "Mein Kiefer ist auch angespannt." Sie loest ihn bewusst.',
            nextSceneId: 'n3-s5',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'n3-s4-c3',
            text: '"Wenn du das regelmaessig machst, lernt dein Koerper den Unterschied zwischen angespannt und entspannt. Und dann MERKST du es frueher."',
            consequence: 'Yuki versteht: Achtsamkeit ist kein einmaliges Ding. Es ist eine Uebung, die mit der Zeit staerker wird.',
            nextSceneId: 'n3-s5',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'n3-s5',
        speaker: 'Yuki',
        speakerEmoji: '🌌',
        text: 'Yuki liegt im Gras, die Arme ausgebreitet, die Augen geschlossen. "Also habe ich jetzt drei Werkzeuge", zaehlt sie auf. "5-4-3-2-1 Grounding, wenn ich in Panik gerate. Box Breathing, wenn mein Kopf nicht aufhoert. Und Muskelentspannung, wenn mein Koerper angespannt ist." Sie oeffnet die Augen. "Und das Wichtigste?" Du wartest. "Ich kann nicht kontrollieren, was passiert", sagt sie langsam. "Aber ich kann kontrollieren, wie ich darauf reagiere." Du nickst. Ueber euch fallt eine Sternschnuppe. "Das", sagst du, "ist Achtsamkeit."',
        choices: [
          {
            id: 'n3-s5-c1',
            text: '"Perfekt. Und vergiss nicht: Es geht nicht darum, perfekt zu sein. Es geht darum, es zu VERSUCHEN."',
            consequence: 'Yuki laechelt. Zum ersten Mal hat sie das Gefuehl, dem Gedankensturm nicht hilflos ausgeliefert zu sein.',
            nextSceneId: null,
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 1 }
          },
          {
            id: 'n3-s5-c2',
            text: '"Du hast heute mehr gelernt als in Wochen des Scrollens. Wie fuehlt sich das an?"',
            consequence: '"Echt", sagt Yuki. "Das fuehlt sich echt an." Und das ist der ganze Unterschied.',
            nextSceneId: null,
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'n3-s5-c3',
            text: '"Morgen kommt deine groesste Herausforderung. Aber du hast jetzt Werkzeuge. Du bist bereit."',
            consequence: 'Yuki atmet tief durch. Zum ersten Mal hat sie keine Angst vor morgen. Sie hat einen Plan.',
            nextSceneId: null,
            points: { empathyPoints: 1, insightPoints: 2, couragePoints: 2 }
          }
        ]
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // Scenario 4 – Sterne zaehlen
  // Thema: Stressmanagement-Plan, Selbstfuersorge, um Hilfe bitten, Balance
  // Schwierigkeit: Hoch (Integration aller bisherigen Lektionen)
  // Key Learning: "Fuer dich selbst zu sorgen ist nicht egoistisch –
  //               es ist notwendig."
  // ---------------------------------------------------------------------------
  {
    id: 'night-scenario-4',
    islandId: 'night' as IslandId,
    title: 'Sterne zaehlen',
    description: 'Pruefungswoche steht bevor. Yuki muss alles Gelernte zusammenbringen und ihren eigenen Stressmanagement-Plan erstellen. Und sie muss lernen, um Hilfe zu bitten.',
    scenes: [
      {
        id: 'n4-s1',
        speaker: 'Yuki',
        speakerEmoji: '🌌',
        text: 'Yuki kommt dir entgegen – und sie sieht aus wie ein Vulkan vor dem Ausbruch. "Pruefungswoche. Ab Montag. Mathe, Deutsch, Englisch, Bio. Vier Pruefungen in fuenf Tagen." Ihre Stimme wird hoeher. "Ich habe noch fast nichts gelernt, weil ich jede Nacht auf dem Handy war statt zu schlafen, und jetzt habe ich Panik, und wenn ich Panik habe, kann ich nicht lernen, und wenn ich nicht lerne, verhaue ich alles, und wenn ich alles verhaue..." Sie holt Luft. Das Gedankenkarussell laeuft auf Hochtouren.',
        choices: [
          {
            id: 'n4-s1-c1',
            text: '"Stopp. Atme. Was haben wir gelernt? Box Breathing. Jetzt. Vier Sekunden ein."',
            consequence: 'Yuki schliesst die Augen. Einatmen, halten, ausatmen, halten. Vier Kasten. Die Panik wird nicht weg, aber leiser.',
            nextSceneId: 'n4-s2',
            points: { empathyPoints: 1, insightPoints: 2, couragePoints: 2 }
          },
          {
            id: 'n4-s1-c2',
            text: '"Ich hoere dich. Das klingt ueberwaaeltigend. Darf ich dir helfen, das in kleinere Stuecke zu teilen?"',
            consequence: 'Yuki nickt. Jemand sieht sie, haelt sie nicht fuer uebertrieben und bietet echte Hilfe an.',
            nextSceneId: 'n4-s2',
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 1 }
          },
          {
            id: 'n4-s1-c3',
            text: '"Du hast gerade genau das gemacht, was dein Gehirn bei Stress tut: Alles auf einmal sehen statt eins nach dem anderen."',
            consequence: 'Yuki haelt inne. "Stimmt. Ich sehe den ganzen Berg, nicht die einzelnen Schritte." Genau. Und ein Berg wird Schritt fuer Schritt bestiegen.',
            nextSceneId: 'n4-s2',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'n4-s2',
        speaker: 'Erzaehler',
        speakerEmoji: '🌙',
        text: '"Okay", sagst du. "Wir bauen dir einen Stressmanagement-Plan. Nicht fuer immer – fuer diese Woche." Im Sand zeichnest du eine Tabelle. "Erstens: Was kannst du kontrollieren? Den Lernstoff aufteilen, Pausen einplanen, frueh schlafen gehen." Yuki ergaenzt: "Box Breathing vor jeder Pruefung. Handy ab 21 Uhr weg." Du nickst. "Zweitens: Was kannst du NICHT kontrollieren? Wie schwer die Pruefungen sind, ob andere besser sind, was passiert wenn." Yuki schaut auf die Liste. "Den zweiten Teil muss ich loslassen." "Genau. Wie eine Wolke."',
        choices: [
          {
            id: 'n4-s2-c1',
            text: '"Drittens: Was brauchst du zum Aufladen? Schlaf, Bewegung, etwas das dir Freude macht."',
            consequence: 'Yuki denkt nach. "Spazieren gehen. Musik hoeren. Mit meiner Katze kuscheln." Kein Bildschirm auf der Liste.',
            nextSceneId: 'n4-s3',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'n4-s2-c2',
            text: '"Und ganz wichtig: Pausen sind kein Luxus. Dein Gehirn braucht Erholung, um zu lernen. Pause machen IST lernen."',
            consequence: 'Yuki ist ueberrascht. "Ich dachte immer, Pausen sind Zeitverschwendung." Genau das Gegenteil.',
            nextSceneId: 'n4-s3',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'n4-s2-c3',
            text: '"Was waere die eine Sache, die du aendern koenntest und die den groessten Unterschied machen wuerde?"',
            consequence: 'Yuki denkt lange nach. "Schlafen. Wenn ich genug schlafe, kann ich besser denken, besser lernen, besser damit umgehen."',
            nextSceneId: 'n4-s3',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 1 }
          }
        ]
      },
      {
        id: 'n4-s3',
        speaker: 'Yuki',
        speakerEmoji: '🌌',
        text: 'Yuki starrt auf den Plan im Sand und wird ploetzlich still. "Da fehlt noch was", sagt sie leise. "Aber ich schaffe es nicht alleine." Du wartest. "Ich muesste... jemandem sagen, dass ich Hilfe brauche. Meiner Mutter. Oder meinem Lehrer. Aber..." Sie kaempft mit den Worten. "Ich will nicht, dass die denken, ich bin schwach. Oder dass ich einfach zu faul war zum Lernen." Traenen stehen in ihren Augen. "Auf dem Berg habe ich gelernt, dass mein Wert nicht von Noten abhaengt. Aber das FUEHLT sich trotzdem nicht so an."',
        choices: [
          {
            id: 'n4-s3-c1',
            text: '"Um Hilfe bitten ist nicht schwach – es ist mutig. Im Garten haben wir gelernt: Echte Staerke zeigt sich darin, dass man Hilfe annimmt."',
            consequence: 'Yuki wischt sich die Augen. "Im Garten... da ging es um Beziehungen. Und die brauche ich jetzt." Genau. Beziehungen sind kein Luxus.',
            nextSceneId: 'n4-s4',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 1 }
          },
          {
            id: 'n4-s3-c2',
            text: '"Stell dir vor, eine Freundin kommt zu dir und sagt, sie braucht Hilfe. Wuerdest du sie fuer schwach halten?"',
            consequence: '"Natuerlich nicht!" sagt Yuki sofort. Dann wird sie still. "Oh. Warum bin ich zu anderen netter als zu mir selbst?"',
            nextSceneId: 'n4-s4',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'n4-s3-c3',
            text: '"Dein Lehrer und deine Mutter wollen dir helfen. Aber sie koennen es nicht, wenn sie nicht wissen, wie es dir geht."',
            consequence: 'Yuki nickt. "Ich habe so lange so getan, als waere alles okay. Vielleicht ist es Zeit, ehrlich zu sein."',
            nextSceneId: 'n4-s4',
            points: { empathyPoints: 2, insightPoints: 1, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'n4-s4',
        speaker: 'Erzaehler',
        speakerEmoji: '🌙',
        text: 'Yuki nimmt einen tiefen Atemzug. "Okay. Ich mache es. Morgen rede ich mit meiner Mutter. Und am Montag frage ich den Lehrer, ob er mir noch was erklaeren kann." Sie schaut auf den Plan im Sand und ergaenzt eine letzte Zeile: "Fuer mich selbst sorgen." "Was bedeutet das fuer dich?" fragst du. Sie ueberlegt. "Genug schlafen. Nicht allein kaempfen. Pausen ernst nehmen. Mich nicht mit anderen vergleichen. Und..." Sie laechelt. "Abends Sterne zaehlen statt Likes."',
        choices: [
          {
            id: 'n4-s4-c1',
            text: '"Selbstfuersorge ist nicht egoistisch. Du kannst nur fuer andere da sein, wenn du zuerst fuer dich sorgst."',
            consequence: 'Yuki laesst den Satz wirken. "Wie in einem Flugzeug – erst die eigene Sauerstoffmaske, dann die der anderen."',
            nextSceneId: 'n4-s5',
            points: { empathyPoints: 1, insightPoints: 3, couragePoints: 1 }
          },
          {
            id: 'n4-s4-c2',
            text: '"Dein Plan ist nicht perfekt – und muss er auch nicht sein. Er ist ein Anfang. Und Anfaenge zaehlen."',
            consequence: 'Yuki atmet aus. Nicht perfekt. Aber echt. Und das ist genug.',
            nextSceneId: 'n4-s5',
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 1 }
          },
          {
            id: 'n4-s4-c3',
            text: '"Du hast in vier Naechten mehr ueber dich gelernt als in Monaten auf Social Media. DAS ist echtes Wachstum."',
            consequence: 'Yuki denkt zurueck an die erste Nacht, als sie nur Sorgen hatte. Jetzt hat sie Werkzeuge, einen Plan und den Mut, um Hilfe zu bitten.',
            nextSceneId: 'n4-s5',
            points: { empathyPoints: 1, insightPoints: 2, couragePoints: 2 }
          }
        ]
      },
      {
        id: 'n4-s5',
        speaker: 'Yuki',
        speakerEmoji: '🌌',
        text: 'Yuki lehnt sich zurueck und schaut in den Sternenhimmel. "Ich habe frueher Sterne gezaehlt, als ich klein war", erzaehlt sie leise. "Mein Vater hat immer gesagt: Wenn du nicht schlafen kannst, zaehle Sterne statt Schaefchen." Sie laechelt. "Irgendwann habe ich aufgehoert und angefangen, Likes zu zaehlen." Sie atmet tief durch. "Fuer dich selbst zu sorgen ist nicht egoistisch – es ist notwendig." Sie sagt es wie ein Versprechen. An sich selbst. Dann beginnt sie leise zu zaehlen: "Eins... zwei... drei..." Die Sterne ueber euch leuchten heller als jeder Bildschirm.',
        choices: [
          {
            id: 'n4-s5-c1',
            text: 'Mitzaehlen. "Vier... fuenf... sechs..." Die schoenste Einschlaf-App der Welt braucht kein WLAN.',
            consequence: 'Yukis Augen fallen zu. Sie schlaeft ein – friedlich, unter den Sternen, ohne Bildschirm. Zum ersten Mal seit Monaten.',
            nextSceneId: null,
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 1 }
          },
          {
            id: 'n4-s5-c2',
            text: '"Du bist nicht mehr das Maedchen, das vor dem Bildschirm weggelaufen ist. Du bist der Himmel, Yuki. Weit und ruhig und voller Sterne."',
            consequence: 'Yuki laechelt im Halbschlaf. Der Himmel. Nicht die Wolken. Sie hat es verstanden – nicht nur im Kopf, sondern im Herzen.',
            nextSceneId: null,
            points: { empathyPoints: 2, insightPoints: 2, couragePoints: 1 }
          },
          {
            id: 'n4-s5-c3',
            text: 'Leise deine Hand neben ihre legen. Nicht halten – nur da sein. Manchmal ist Naehe die beste Medizin.',
            consequence: 'Stille. Sterne. Atem. Alles, was zaehlt, ist dieser Moment. Und er ist genug.',
            nextSceneId: null,
            points: { empathyPoints: 3, insightPoints: 1, couragePoints: 1 }
          }
        ]
      }
    ]
  }
];

// =============================================================================
// 3. WISDOM CARDS
// =============================================================================

export const nightWisdomCards: WisdomCard[] = [
  {
    id: 'night-wisdom-1',
    islandId: 'night' as IslandId,
    text: 'Stress ist das Alarmsystem deines Koerpers. Er ist nicht dein Feind – er will dich schuetzen. Aber manchmal geht der Alarm los, obwohl keine echte Gefahr da ist. Wie ein Rauchmelder beim Toasten. Lerne den Unterschied: Ist das eine echte Bedrohung – oder nur mein Kopf, der ueberreagiert?',
    category: 'knowledge',
    collected: false
  },
  {
    id: 'night-wisdom-2',
    islandId: 'night' as IslandId,
    text: 'Deine Gedanken sind wie Wolken am Himmel. Manche sind hell, manche dunkel, manche riesig und bedrohlich. Aber ALLE ziehen vorbei. Du bist nicht die Wolken – du bist der Himmel. Weit, ruhig und immer da, egal welches Wetter gerade herrscht.',
    category: 'insight',
    collected: false
  },
  {
    id: 'night-wisdom-3',
    islandId: 'night' as IslandId,
    text: 'Dein Handy kann ein Werkzeug sein oder ein Gefaengnis. Du entscheidest. Frag dich vor jedem Oeffnen: WARUM greife ich gerade zum Handy? Aus Langeweile, Gewohnheit, Angst – oder mit einem echten Ziel? Diese eine Frage veraendert alles.',
    category: 'insight',
    collected: false
  },
  {
    id: 'night-wisdom-4',
    islandId: 'night' as IslandId,
    text: '5-4-3-2-1 Grounding: Nenne 5 Dinge, die du siehst. 4, die du hoerst. 3, die du fuehlst. 2, die du riechst. 1, das du schmeckst. Diese Technik holt dich in Sekunden aus dem Gedankenkarussell zurueck ins Hier und Jetzt. Ueberall einsetzbar, von niemandem bemerkt.',
    category: 'technique',
    collected: false
  },
  {
    id: 'night-wisdom-5',
    islandId: 'night' as IslandId,
    text: 'Box Breathing – Kastenatmung: 4 Sekunden einatmen, 4 Sekunden halten, 4 Sekunden ausatmen, 4 Sekunden halten. Vier Runden genuegen. Astronauten und Soldaten nutzen diese Technik, um unter Druck ruhig zu bleiben. Was fuer sie funktioniert, funktioniert auch fuer dich.',
    category: 'technique',
    collected: false
  },
  {
    id: 'night-wisdom-6',
    islandId: 'night' as IslandId,
    text: 'Du kannst nicht kontrollieren, was passiert. Aber du kannst kontrollieren, wie du darauf reagierst. Das ist keine Theorie – das ist eine Faehigkeit, die du ueben kannst. Jeden Tag ein bisschen mehr. Achtsamkeit ist kein Talent. Es ist Training.',
    category: 'insight',
    collected: false
  },
  {
    id: 'night-wisdom-7',
    islandId: 'night' as IslandId,
    text: 'Social Media zeigt dir Highlight-Reels – die besten Momente, sorgfaeltig ausgewaehlt und bearbeitet. Du vergleichst den Filmtrailer anderer mit deinem ganzen Film, inklusive der langweiligen Montage. Hinter jedem perfekten Bild steckt ein ganzes Leben mit normalen, schweren und einsamen Momenten.',
    category: 'knowledge',
    collected: false
  },
  {
    id: 'night-wisdom-8',
    islandId: 'night' as IslandId,
    text: 'Fuer dich selbst zu sorgen ist nicht egoistisch – es ist notwendig. Schlaf, Pausen, Bewegung, ehrliche Gespraeche: Das sind keine Extras fuer gute Tage. Das ist das Fundament, auf dem alles andere steht. Du kannst nur fuer andere da sein, wenn du zuerst fuer dich sorgst.',
    category: 'insight',
    collected: false
  }
];

// =============================================================================
// 4. ACTIVITIES
// =============================================================================

export const nightActivities: NightActivity[] = [
  {
    id: 'night-breathing',
    islandId: 'night' as IslandId,
    title: 'Box Breathing & Body Scan',
    description: 'Eine gefuehrte Atem- und Koerperuebung, die dein Nervensystem beruhigt und dich zurueck ins Hier und Jetzt bringt.',
    type: 'breathing',
    duration: 8,
    completed: false,
    instructions: [
      'Lege oder setze dich bequem hin. Schliesse die Augen.',
      'Beginne mit Box Breathing: Atme 4 Sekunden durch die Nase ein.',
      'Halte den Atem 4 Sekunden. Spuere die Stille.',
      'Atme 4 Sekunden langsam durch den Mund aus.',
      'Halte 4 Sekunden. Geniesse die Leere.',
      'Wiederhole 4 Runden. Stelle dir dabei ein leuchtendes Quadrat vor.',
      'Jetzt Body Scan: Fuehre deine Aufmerksamkeit langsam von den Zehen bis zum Kopf.',
      'Bei jeder Stelle: 3 Atemzuege spueren, dann loslassen. Wo ist Anspannung? Lass sie los.',
      'Zum Schluss: Spuere deinen ganzen Koerper. Du bist hier. Du bist sicher. Du bist genug.'
    ]
  },
  {
    id: 'night-journal',
    islandId: 'night' as IslandId,
    title: 'Stress-Trigger-Tagebuch',
    description: 'Schreibe auf, was dich stresst – und entdecke Muster, die dir helfen, besser damit umzugehen.',
    type: 'journal',
    duration: 10,
    completed: false,
    instructions: [
      'Nimm ein Notizbuch oder einen Zettel. Schreibe das Datum oben hin.',
      'Frage 1: Was hat mich heute gestresst? Schreibe alles auf, ungefiltert.',
      'Frage 2: Wo habe ich den Stress in meinem Koerper gespuert? (Bauch, Schultern, Kopf...)',
      'Frage 3: Was habe ich dann gemacht? (Handy, Essen, Rueckzug, Reden...)',
      'Frage 4: Hat das geholfen – ehrlich? Kurzfristig? Langfristig?',
      'Frage 5: Was koennte ich naechstes Mal stattdessen versuchen?',
      'Mache das eine Woche lang. Dann lies alles nochmal und suche nach Mustern.',
      'Bonus: Teile eine Erkenntnis mit jemandem, dem du vertraust.'
    ]
  },
  {
    id: 'night-reflection',
    islandId: 'night' as IslandId,
    title: 'Digitale Balance – 7-Tage-Challenge',
    description: 'Eine Woche lang bewusst mit deinem Handy umgehen. Nicht weniger nutzen – sondern ANDERS.',
    type: 'reflection',
    duration: 15,
    completed: false,
    instructions: [
      'Tag 1: Checke deine Bildschirmzeit. Schreibe die Zahl auf. Ohne Urteil – nur Beobachtung.',
      'Tag 2: Frag dich bei JEDEM Griff zum Handy: WARUM? Schreibe die haeufigsten Gruende auf.',
      'Tag 3: Entfolge 5 Accounts, nach denen du dich schlechter fuehlst. Folge 3, die dich inspirieren.',
      'Tag 4: Kein Handy in der ersten und letzten Stunde des Tages. Ersetze es durch etwas Schoenes.',
      'Tag 5: Sende einer Person eine echte Nachricht – nicht "lol" oder ein Emoji, sondern etwas Ehrliches.',
      'Tag 6: Eine Mahlzeit ohne Bildschirm. Schmecke wirklich, was du isst.',
      'Tag 7: Vergleiche deine Bildschirmzeit mit Tag 1. Schreibe auf: Was hat sich veraendert? Wie fuehle ich mich?',
      'Denk dran: Es geht nicht um Perfektion. Es geht darum, bewusst zu entscheiden statt automatisch zu reagieren.'
    ]
  },
  {
    id: 'night-creative',
    islandId: 'night' as IslandId,
    title: 'Dankbarkeits-Sternenhimmel',
    description: 'Male deinen eigenen Sternenhimmel – jeder Stern steht fuer etwas, wofuer du dankbar bist.',
    type: 'creative',
    duration: 15,
    completed: false,
    instructions: [
      'Nimm ein dunkles Blatt Papier (oder male ein Blatt dunkelblau an).',
      'Male 10 Sterne darauf – gross und klein, wie du moechtest.',
      'In jeden Stern schreibe etwas, wofuer du HEUTE dankbar bist. Auch kleine Dinge zaehlen.',
      'Beispiele: "Meine Katze hat geschnurrt." "Die Sonne hat geschienen." "Jemand hat mich angelaechelt."',
      'Wenn du einen Stern nicht fuellen kannst, lass ihn leer. Morgen faellt dir vielleicht etwas ein.',
      'Haenge den Sternenhimmel neben dein Bett. Schau ihn an, bevor du einschlaefst.',
      'Fuege jede Woche neue Sterne hinzu. Dein Himmel wird immer voller.',
      'Dankbarkeit ist wie ein Muskel: Je oefter du sie uebst, desto staerker wird sie. Und desto leichter wird es, das Gute zu sehen.'
    ]
  }
];
