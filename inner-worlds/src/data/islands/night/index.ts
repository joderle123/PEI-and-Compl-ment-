// @ts-nocheck
import type { Scenario, WisdomCard, Activity, IslandId } from '../../../types';

// Local interfaces
interface NightActivity extends Activity {
  instructions: string[];
}

interface NightNPC {
  id: string;
  name: string;
  emoji: string;
  description: string;
  backstory: string;
}

// NPCs
export const nightNPCs: NightNPC[] = [
  {
    id: 'luna',
    name: 'Luna',
    emoji: '🌙',
    description: 'Die sanfte Mondhüterin, die über die nächtlichen Gedanken wacht.',
    backstory: 'Luna hat schon tausende Nächte erlebt und kennt alle Sorgen, die Menschen wach halten. Sie lehrt, wie man innere Ruhe findet.'
  },
  {
    id: 'pixel',
    name: 'Pixel',
    emoji: '📱',
    description: 'Ein quirliger Smartphone-Geist, der gelernt hat, auch mal abzuschalten.',
    backstory: 'Pixel war früher immer aktiv und leuchtend, bis er merkte, wie wichtig Pausen sind. Jetzt hilft er anderen beim digitalen Gleichgewicht.'
  },
  {
    id: 'sternenstaub',
    name: 'Sternenstaub',
    emoji: '✨',
    description: 'Eine schimmernde Sternenstaub-Entität, die Klarheit in Gedankenchaos bringt.',
    backstory: 'Sternenstaub entsteht aus den ruhigsten Momenten der Nacht und hilft dabei, Gedankenspiralen zu durchbrechen.'
  },
  {
    id: 'mitternacht',
    name: 'Mitternacht',
    emoji: '🦉',
    description: 'Eine weise Eule, die die Balance zwischen Aktivität und Ruhe lehrt.',
    backstory: 'Mitternacht beobachtet die Welt aus der Stille heraus und versteht, wann es Zeit ist zu handeln und wann Zeit ist zu ruhen.'
  }
];

// Scenarios
export const nightScenarios: Scenario[] = [
  // Scenario 1: Prüfungsstress
  {
    id: 'night-scenario-1',
    islandId: 'night' as IslandId,
    title: 'Die große Mathearbeit',
    description: 'Morgen ist die wichtige Mathearbeit und die Gedanken kreisen.',
    npcId: 'luna',
    completed: false,
    scenes: [
      {
        id: 'n1-s1',
        text: 'Es ist 22 Uhr und du liegst im Bett. Morgen schreibst du die wichtigste Mathearbeit des Jahres. Dein Herz klopft schnell und tausend Gedanken wirbeln durch deinen Kopf.',
        choices: [
          { id: 'n1-s1-c1', text: 'Aufstehen und nochmal alles wiederholen', nextSceneId: 'n1-s2', points: 0 },
          { id: 'n1-s1-c2', text: 'Tief durchatmen und die Augen schließen', nextSceneId: 'n1-s2', points: 3 },
          { id: 'n1-s1-c3', text: 'Auf dem Handy nach Tipps suchen', nextSceneId: 'n1-s2', points: 1 }
        ]
      },
      {
        id: 'n1-s2',
        text: 'Luna schwebt sanft durch dein Fenster herein. "Dein Körper braucht jetzt Ruhe, nicht mehr Informationen", flüstert sie. "Was hast du schon alles getan, um dich vorzubereiten?"',
        choices: [
          { id: 'n1-s2-c1', text: 'Erzählen, wie viel du gelernt hast', nextSceneId: 'n1-s3', points: 2 },
          { id: 'n1-s2-c2', text: 'Zugeben, dass du Angst hast zu versagen', nextSceneId: 'n1-s3', points: 3 },
          { id: 'n1-s2-c3', text: 'Sagen, dass du mehr hättest lernen sollen', nextSceneId: 'n1-s3', points: 1 }
        ]
      },
      {
        id: 'n1-s3',
        text: 'Luna lächelt sanft. "Dein Gehirn verarbeitet im Schlaf, was du gelernt hast. Jede Minute Schlaf macht dich morgen klarer und konzentrierter."',
        choices: [
          { id: 'n1-s3-c1', text: 'Eine Entspannungsübung mit Luna machen', nextSceneId: 'n1-s4', points: 3 },
          { id: 'n1-s3-c2', text: 'Noch 10 Minuten Vokabeln lernen', nextSceneId: 'n1-s4', points: 1 },
          { id: 'n1-s3-c3', text: 'Fragen, was wenn ich es nicht schaffe', nextSceneId: 'n1-s4', points: 2 }
        ]
      },
      {
        id: 'n1-s4',
        text: 'Luna zeigt dir die 4-7-8 Atemtechnik. "Atme 4 Sekunden ein, halte 7 Sekunden, atme 8 Sekunden aus. Das beruhigt dein Nervensystem sofort."',
        choices: [
          { id: 'n1-s4-c1', text: 'Die Übung dreimal wiederholen', nextSceneId: 'n1-s5', points: 3 },
          { id: 'n1-s4-c2', text: 'Nur einmal probieren', nextSceneId: 'n1-s5', points: 2 },
          { id: 'n1-s4-c3', text: 'Skeptisch sein, ob das hilft', nextSceneId: 'n1-s5', points: 1 }
        ]
      },
      {
        id: 'n1-s5',
        text: 'Dein Herzschlag wird ruhiger. Luna erklärt: "Prüfungsangst ist normal, aber sie darf dich nicht kontrollieren. Du hast gelernt und gibst morgen dein Bestes."',
        choices: [
          { id: 'n1-s5-c1', text: 'Dankbar nicken und weitermachen', nextSceneId: 'n1-s6', points: 3 },
          { id: 'n1-s5-c2', text: 'Fragen nach mehr Beruhigungstipps', nextSceneId: 'n1-s6', points: 2 },
          { id: 'n1-s5-c3', text: 'Weiter an die Prüfung denken', nextSceneId: 'n1-s6', points: 0 }
        ]
      },
      {
        id: 'n1-s6',
        text: 'Luna legt eine sanfte Mondlicht-Decke über dich. "Schlaf jetzt. Morgen wirst du ruhig, konzentriert und bereit sein. Vertraue dir selbst."',
        choices: [
          { id: 'n1-s6-c1', text: 'Entspannt einschlafen', nextSceneId: null, points: 3 },
          { id: 'n1-s6-c2', text: 'Noch kurz durchatmen', nextSceneId: null, points: 2 },
          { id: 'n1-s6-c3', text: 'Versuchen nicht mehr zu denken', nextSceneId: null, points: 1 }
        ]
      }
    ]
  },

  // Scenario 2: Digital Detox
  {
    id: 'night-scenario-2',
    islandId: 'night' as IslandId,
    title: 'Pixels Nachtruhe',
    description: 'Das Handy vibriert ständig - kann man es einfach mal weglegen?',
    npcId: 'pixel',
    completed: false,
    scenes: [
      {
        id: 'n2-s1',
        text: 'Schon wieder ein Ping! Dein Handy leuchtet zum zehnten Mal in dieser Stunde. Es ist 23 Uhr und eigentlich wolltest du längst schlafen.',
        choices: [
          { id: 'n2-s1-c1', text: 'Schnell die Nachricht checken', nextSceneId: 'n2-s2', points: 0 },
          { id: 'n2-s1-c2', text: 'Das Handy auf Flugmodus stellen', nextSceneId: 'n2-s2', points: 3 },
          { id: 'n2-s1-c3', text: 'Nur kurz Instagram öffnen', nextSceneId: 'n2-s2', points: 1 }
        ]
      },
      {
        id: 'n2-s2',
        text: 'Pixel materialisiert sich aus deinem Bildschirm. "Hey! Ich weiß, wie schwer es ist, mich wegzulegen. Aber weißt du, was blaues Licht mit deinem Schlaf macht?"',
        choices: [
          { id: 'n2-s2-c1', text: 'Neugierig zuhören', nextSceneId: 'n2-s3', points: 3 },
          { id: 'n2-s2-c2', text: 'Noch schnell auf die Nachricht antworten', nextSceneId: 'n2-s3', points: 1 },
          { id: 'n2-s2-c3', text: 'Sagen, dass man nicht süchtig ist', nextSceneId: 'n2-s3', points: 0 }
        ]
      },
      {
        id: 'n2-s3',
        text: 'Pixel erklärt: "Blaues Licht hemmt Melatonin, dein Schlafhormon. Dein Gehirn denkt, es ist Tag! Kein Wunder, dass du nicht müde wirst."',
        choices: [
          { id: 'n2-s3-c1', text: 'Das Handy aus dem Zimmer legen', nextSceneId: 'n2-s4', points: 3 },
          { id: 'n2-s3-c2', text: 'Nachtmodus einschalten', nextSceneId: 'n2-s4', points: 2 },
          { id: 'n2-s3-c3', text: 'Versprechen, bald aufzuhören', nextSceneId: 'n2-s4', points: 1 }
        ]
      },
      {
        id: 'n2-s4',
        text: 'Pixel zeigt dir seine "Offline-Zeit". "Ich habe gelernt: Von 21 bis 7 Uhr bin ich stumm. Das war am Anfang hart, aber jetzt fühle ich mich viel besser!"',
        choices: [
          { id: 'n2-s4-c1', text: 'Eine ähnliche Routine planen', nextSceneId: 'n2-s5', points: 3 },
          { id: 'n2-s4-c2', text: 'Fragen, ob man Ausnahmen machen darf', nextSceneId: 'n2-s5', points: 2 },
          { id: 'n2-s4-c3', text: 'Denken, das ist zu extrem', nextSceneId: 'n2-s5', points: 0 }
        ]
      },
      {
        id: 'n2-s5',
        text: 'Pixel grinst: "FOMO ist real - Fear Of Missing Out. Aber weißt du was? Du verpasst echte Erholung, wenn du ständig online bist!"',
        choices: [
          { id: 'n2-s5-c1', text: 'Freunden von der neuen Regel erzählen', nextSceneId: 'n2-s6', points: 3 },
          { id: 'n2-s5-c2', text: 'Es eine Woche testen', nextSceneId: 'n2-s6', points: 2 },
          { id: 'n2-s5-c3', text: 'Nur am Wochenende machen', nextSceneId: 'n2-s6', points: 1 }
        ]
      },
      {
        id: 'n2-s6',
        text: 'Pixel verwandelt sich in einen sanften Nachtmodus. "Versuch\'s mal. Morgen früh wirst du ausgeruhter sein. Deine echten Freunde warten bis morgen!"',
        choices: [
          { id: 'n2-s6-c1', text: 'Handy weglegen und schlafen', nextSceneId: null, points: 3 },
          { id: 'n2-s6-c2', text: 'Einen Wecker stellen (nicht am Handy)', nextSceneId: null, points: 2 },
          { id: 'n2-s6-c3', text: 'Morgen damit anfangen', nextSceneId: null, points: 1 }
        ]
      }
    ]
  },

  // Scenario 3: Gedankenspiralen
  {
    id: 'night-scenario-3',
    islandId: 'night' as IslandId,
    title: 'Der Gedankensturm',
    description: 'Wenn die Gedanken sich im Kreis drehen und nicht aufhören wollen.',
    npcId: 'sternenstaub',
    completed: false,
    scenes: [
      {
        id: 'n3-s1',
        text: 'Deine Gedanken rasen. "Was, wenn... Was, wenn... Was, wenn..." Immer wieder dieselben Sorgen. Du drehst dich zum hundertsten Mal im Bett um.',
        choices: [
          { id: 'n3-s1-c1', text: 'Versuchen, an etwas anderes zu denken', nextSceneId: 'n3-s2', points: 1 },
          { id: 'n3-s1-c2', text: 'Die Gedanken beobachten ohne zu urteilen', nextSceneId: 'n3-s2', points: 3 },
          { id: 'n3-s1-c3', text: 'Aufstehen und herumlaufen', nextSceneId: 'n3-s2', points: 2 }
        ]
      },
      {
        id: 'n3-s2',
        text: 'Sternenstaub rieselt durch die Luft und formt leuchtende Muster. "Ich sehe deine Gedankenspirale. Je mehr du gegen sie ankämpfst, desto stärker wird sie."',
        choices: [
          { id: 'n3-s2-c1', text: 'Fragen, wie man sie stoppen kann', nextSceneId: 'n3-s3', points: 3 },
          { id: 'n3-s2-c2', text: 'Sagen, dass es unmöglich ist', nextSceneId: 'n3-s3', points: 1 },
          { id: 'n3-s2-c3', text: 'Beschreiben, was dich beschäftigt', nextSceneId: 'n3-s3', points: 2 }
        ]
      },
      {
        id: 'n3-s3',
        text: 'Sternenstaub wirbelt sanft: "Gedanken sind wie Wolken - sie kommen und gehen. Du musst sie nicht festhalten oder wegschieben. Lass sie einfach vorbeiziehen."',
        choices: [
          { id: 'n3-s3-c1', text: 'Eine Achtsamkeitsübung probieren', nextSceneId: 'n3-s4', points: 3 },
          { id: 'n3-s3-c2', text: 'Skeptisch bleiben', nextSceneId: 'n3-s4', points: 1 },
          { id: 'n3-s3-c3', text: 'Fragen, wie das genau geht', nextSceneId: 'n3-s4', points: 2 }
        ]
      },
      {
        id: 'n3-s4',
        text: 'Sternenstaub lehrt dich: "Zähle deine Atemzüge. Bei jedem Gedanken sagst du innerlich: \'Danke für den Besuch\' und kehrst zum Atem zurück. Keine Bewertung, kein Kampf."',
        choices: [
          { id: 'n3-s4-c1', text: 'Es 5 Minuten lang üben', nextSceneId: 'n3-s5', points: 3 },
          { id: 'n3-s4-c2', text: 'Ein paar Atemzüge probieren', nextSceneId: 'n3-s5', points: 2 },
          { id: 'n3-s4-c3', text: 'Denken, das klappt nicht', nextSceneId: 'n3-s5', points: 0 }
        ]
      },
      {
        id: 'n3-s5',
        text: 'Die Gedanken werden leiser. Sternenstaub erklärt: "Wenn ein Gedanke besonders hartnäckig ist, schreib ihn auf. Dann weiß dein Gehirn: \'Okay, ist gespeichert, kann loslassen.\'"',
        choices: [
          { id: 'n3-s5-c1', text: 'Ein Notizbuch neben das Bett legen', nextSceneId: 'n3-s6', points: 3 },
          { id: 'n3-s5-c2', text: 'Mental notieren für morgen', nextSceneId: 'n3-s6', points: 2 },
          { id: 'n3-s5-c3', text: 'Ins Handy tippen', nextSceneId: 'n3-s6', points: 1 }
        ]
      },
      {
        id: 'n3-s6',
        text: 'Sternenstaub formt einen sanften Sternenregen. "Du bist nicht deine Gedanken. Du bist der Himmel, durch den sie ziehen. Ruhig, weit und frei."',
        choices: [
          { id: 'n3-s6-c1', text: 'Diesem Bild nachspüren und entspannen', nextSceneId: null, points: 3 },
          { id: 'n3-s6-c2', text: 'Weiter die Atemübung machen', nextSceneId: null, points: 2 },
          { id: 'n3-s6-c3', text: 'Hoffen, dass es morgen besser ist', nextSceneId: null, points: 1 }
        ]
      }
    ]
  },

  // Scenario 4: Achtsamkeit im Alltag
  {
    id: 'night-scenario-4',
    islandId: 'night' as IslandId,
    title: 'Mitternachts Lektion',
    description: 'Die Eule lehrt, wie man auch im Alltag achtsam bleibt.',
    npcId: 'mitternacht',
    completed: false,
    scenes: [
      {
        id: 'n4-s1',
        text: 'Mitternacht sitzt auf deinem Fenstersims. "Du rennst den ganzen Tag von einer Sache zur nächsten. Wann bist du eigentlich mal wirklich präsent?"',
        choices: [
          { id: 'n4-s1-c1', text: 'Zugeben, dass man oft abgelenkt ist', nextSceneId: 'n4-s2', points: 3 },
          { id: 'n4-s1-c2', text: 'Verteidigen, dass man viel zu tun hat', nextSceneId: 'n4-s2', points: 1 },
          { id: 'n4-s1-c3', text: 'Fragen, was Präsenz bedeutet', nextSceneId: 'n4-s2', points: 2 }
        ]
      },
      {
        id: 'n4-s2',
        text: 'Die Eule blinzelt weise. "Präsenz heißt: Mit all deinen Sinnen im Hier und Jetzt sein. Nicht mit dem Kopf in der Vergangenheit oder Zukunft."',
        choices: [
          { id: 'n4-s2-c1', text: 'Ein Beispiel aus dem Alltag nennen', nextSceneId: 'n4-s3', points: 2 },
          { id: 'n4-s2-c2', text: 'Fragen, wie man das übt', nextSceneId: 'n4-s3', points: 3 },
          { id: 'n4-s2-c3', text: 'Denken, das klingt kompliziert', nextSceneId: 'n4-s3', points: 1 }
        ]
      },
      {
        id: 'n4-s3',
        text: 'Mitternacht zeigt dir: "Beim Zähneputzen: Spürst du die Borsten? Beim Essen: Schmeckst du wirklich? Beim Gehen: Fühlst du deine Füße auf dem Boden?"',
        choices: [
          { id: 'n4-s3-c1', text: 'Sich vornehmen, das morgen zu probieren', nextSceneId: 'n4-s4', points: 3 },
          { id: 'n4-s3-c2', text: 'Jetzt gleich die Füße spüren', nextSceneId: 'n4-s4', points: 3 },
          { id: 'n4-s3-c3', text: 'Nicken, aber zweifeln', nextSceneId: 'n4-s4', points: 1 }
        ]
      },
      {
        id: 'n4-s4',
        text: 'Die Eule erklärt weiter: "Multitasking ist ein Mythos. Dein Gehirn springt nur schnell hin und her - und wird dabei erschöpft. Eine Sache nach der anderen!"',
        choices: [
          { id: 'n4-s4-c1', text: 'An eigenes Multitasking denken', nextSceneId: 'n4-s5', points: 2 },
          { id: 'n4-s4-c2', text: 'Fragen nach konkreten Tipps', nextSceneId: 'n4-s5', points: 3 },
          { id: 'n4-s4-c3', text: 'Meinen, man braucht Multitasking', nextSceneId: 'n4-s5', points: 0 }
        ]
      },
      {
        id: 'n4-s5',
        text: 'Mitternacht nickt: "Probier die 5-4-3-2-1 Methode, wenn du gestresst bist: 5 Dinge sehen, 4 hören, 3 fühlen, 2 riechen, 1 schmecken. Das holt dich sofort ins Jetzt!"',
        choices: [
          { id: 'n4-s5-c1', text: 'Jetzt gleich ausprobieren', nextSceneId: 'n4-s6', points: 3 },
          { id: 'n4-s5-c2', text: 'Sich merken für morgen', nextSceneId: 'n4-s6', points: 2 },
          { id: 'n4-s5-c3', text: 'Denken, das ist zu aufwendig', nextSceneId: 'n4-s6', points: 0 }
        ]
      },
      {
        id: 'n4-s6',
        text: 'Die Eule breitet ihre Flügel aus. "Achtsamkeit ist kein Extra-To-Do. Es ist eine Art zu leben. Jeden kleinen Moment wirklich zu erleben - das ist wahres Leben!"',
        choices: [
          { id: 'n4-s6-c1', text: 'Dankbar diese Weisheit annehmen', nextSceneId: null, points: 3 },
          { id: 'n4-s6-c2', text: 'Einen achtsamen Atemzug nehmen', nextSceneId: null, points: 3 },
          { id: 'n4-s6-c3', text: 'Darüber nachdenken', nextSceneId: null, points: 2 }
        ]
      }
    ]
  },

  // Scenario 5: Burnout-Prävention
  {
    id: 'night-scenario-5',
    islandId: 'night' as IslandId,
    title: 'Wenn alles zu viel wird',
    description: 'Rechtzeitig erkennen, wann es Zeit ist, einen Gang zurückzuschalten.',
    npcId: 'mitternacht',
    completed: false,
    scenes: [
      {
        id: 'n5-s1',
        text: 'Du fühlst dich komplett ausgelaugt. Schule, Sport, Freunde, Familie - alles will etwas von dir. Mitternacht bemerkt deine Erschöpfung.',
        choices: [
          { id: 'n5-s1-c1', text: 'Sagen: "Ich muss einfach durchhalten"', nextSceneId: 'n5-s2', points: 0 },
          { id: 'n5-s1-c2', text: 'Zugeben, dass du überfordert bist', nextSceneId: 'n5-s2', points: 3 },
          { id: 'n5-s1-c3', text: 'Alles aufzählen, was zu tun ist', nextSceneId: 'n5-s2', points: 2 }
        ]
      },
      {
        id: 'n5-s2',
        text: 'Mitternacht sagt ernst: "Dein Körper sendet Warnsignale. Ständige Müdigkeit, Konzentrationsprobleme, Gereiztheit - das sind keine Schwächen, sondern rote Flaggen!"',
        choices: [
          { id: 'n5-s2-c1', text: 'Überlegen, welche Signale du hast', nextSceneId: 'n5-s3', points: 3 },
          { id: 'n5-s2-c2', text: 'Abwinken: "Alle sind gestresst"', nextSceneId: 'n5-s3', points: 0 },
          { id: 'n5-s2-c3', text: 'Fragen, was man tun kann', nextSceneId: 'n5-s3', points: 2 }
        ]
      },
      {
        id: 'n5-s3',
        text: 'Die Eule erklärt: "Du bist kein Roboter. Du brauchst regelmäßige Pausen, nicht nur wenn du zusammenbrichst. Prävention, nicht Reparatur!"',
        choices: [
          { id: 'n5-s3-c1', text: 'Deinen Kalender auf Pausen prüfen', nextSceneId: 'n5-s4', points: 3 },
          { id: 'n5-s3-c2', text: 'Sagen, keine Zeit für Pausen', nextSceneId: 'n5-s4', points: 0 },
          { id: 'n5-s3-c3', text: 'Fragen nach Ideen für Pausen', nextSceneId: 'n5-s4', points: 2 }
        ]
      },
      {
        id: 'n5-s4',
        text: 'Mitternacht zeigt dir drei Säulen: "Schlaf, Bewegung, soziale Verbindungen. Wenn du an einer sparst, leiden alle drei. Wo vernachlässigst du dich?"',
        choices: [
          { id: 'n5-s4-c1', text: 'Ehrlich reflektieren', nextSceneId: 'n5-s5', points: 3 },
          { id: 'n5-s4-c2', text: 'Ausreden finden', nextSceneId: 'n5-s5', points: 0 },
          { id: 'n5-s4-c3', text: 'Eine Säule priorisieren', nextSceneId: 'n5-s5', points: 2 }
        ]
      },
      {
        id: 'n5-s5',
        text: '"Nein-Sagen ist eine Superkraft", sagt Mitternacht. "Nicht zu allem Ja sagen zu können, bedeutet Ja zu dir selbst zu sagen. Was könntest du loslassen?"',
        choices: [
          { id: 'n5-s5-c1', text: 'Eine konkrete Aktivität überlegen', nextSceneId: 'n5-s6', points: 3 },
          { id: 'n5-s5-c2', text: '"Kann ich nicht" sagen', nextSceneId: 'n5-s6', points: 0 },
          { id: 'n5-s5-c3', text: 'Fragen, wie man Nein sagt', nextSceneId: 'n5-s6', points: 2 }
        ]
      },
      {
        id: 'n5-s6',
        text: 'Die Eule sagt sanft: "Du bist wertvoll, nicht wegen dem, was du leistest, sondern einfach weil du du bist. Dein Wert steht fest, auch wenn du mal Nein sagst."',
        choices: [
          { id: 'n5-s6-c1', text: 'Diesen Gedanken tief einatmen', nextSceneId: null, points: 3 },
          { id: 'n5-s6-c2', text: 'Mit jemandem darüber sprechen wollen', nextSceneId: null, points: 2 },
          { id: 'n5-s6-c3', text: 'Zweifelnd, aber hoffnungsvoll nicken', nextSceneId: null, points: 2 }
        ]
      }
    ]
  },

  // Scenario 6: Ruhe-Werkzeugkasten
  {
    id: 'night-scenario-6',
    islandId: 'night' as IslandId,
    title: 'Dein persönlicher Ruhe-Werkzeugkasten',
    description: 'Luna hilft dir, deine eigenen Anti-Stress-Tools zusammenzustellen.',
    npcId: 'luna',
    completed: false,
    scenes: [
      {
        id: 'n6-s1',
        text: 'Luna öffnet eine leuchtende Truhe. "Jeder Mensch ist anders. Was den einen beruhigt, stresst den anderen. Lass uns DEINE persönlichen Ruhe-Tools finden!"',
        choices: [
          { id: 'n6-s1-c1', text: 'Begeistert zustimmen', nextSceneId: 'n6-s2', points: 3 },
          { id: 'n6-s1-c2', text: 'Fragen, was das bedeutet', nextSceneId: 'n6-s2', points: 2 },
          { id: 'n6-s1-c3', text: 'Zweifeln, ob das was bringt', nextSceneId: 'n6-s2', points: 1 }
        ]
      },
      {
        id: 'n6-s2',
        text: '"Denk an einen Moment, wo du dich richtig ruhig gefühlt hast", sagt Luna. "Was hast du da gemacht? Wo warst du? Was hast du wahrgenommen?"',
        choices: [
          { id: 'n6-s2-c1', text: 'Einen konkreten Moment erinnern', nextSceneId: 'n6-s3', points: 3 },
          { id: 'n6-s2-c2', text: 'Sagen: "Weiß nicht"', nextSceneId: 'n6-s3', points: 1 },
          { id: 'n6-s2-c3', text: 'Mehrere Momente überlegen', nextSceneId: 'n6-s3', points: 2 }
        ]
      },
      {
        id: 'n6-s3',
        text: 'Luna nickt: "Manche lieben Musik, andere Stille. Manche brauchen Bewegung, andere absolute Ruhe. Hier sind Kategorien: Körperlich, Kreativ, Sozial, In der Natur, Allein-Zeit."',
        choices: [
          { id: 'n6-s3-c1', text: 'Zu jeder Kategorie etwas überlegen', nextSceneId: 'n6-s4', points: 3 },
          { id: 'n6-s3-c2', text: 'Eine Lieblingskategorie wählen', nextSceneId: 'n6-s4', points: 2 },
          { id: 'n6-s3-c3', text: 'Überfordert fühlen', nextSceneId: 'n6-s4', points: 1 }
        ]
      },
      {
        id: 'n6-s4',
        text: '"Jetzt das Wichtigste", sagt Luna. "Deine Tools müssen schnell verfügbar sein! Was kannst du in 5 Minuten machen, wenn es akut stressig wird?"',
        choices: [
          { id: 'n6-s4-c1', text: '3-5 schnelle Tools notieren', nextSceneId: 'n6-s5', points: 3 },
          { id: 'n6-s4-c2', text: 'Eins oder zwei überlegen', nextSceneId: 'n6-s5', points: 2 },
          { id: 'n6-s4-c3', text: '"5 Minuten hab ich nie"', nextSceneId: 'n6-s5', points: 0 }
        ]
      },
      {
        id: 'n6-s5',
        text: 'Luna zeigt dir eine Liste: Atemübung, Lieblingsmusik, kurzer Spaziergang, mit Haustier kuscheln, Tagebuch schreiben, Dehnen, Mandalas malen. "Was spricht dich an?"',
        choices: [
          { id: 'n6-s5-c1', text: 'Drei Favoriten auswählen', nextSceneId: 'n6-s6', points: 3 },
          { id: 'n6-s5-c2', text: 'Eigene Ideen hinzufügen', nextSceneId: 'n6-s6', points: 3 },
          { id: 'n6-s5-c3', text: 'Skeptisch durchlesen', nextSceneId: 'n6-s6', points: 1 }
        ]
      },
      {
        id: 'n6-s6',
        text: 'Luna lächelt warm. "Dein Werkzeugkasten ist einzigartig wie du. Probier verschiedene Tools aus, manche funktionieren heute, andere morgen. Du hast jetzt Wahlmöglichkeiten!"',
        choices: [
          { id: 'n6-s6-c1', text: 'Den Kasten mental packen', nextSceneId: null, points: 3 },
          { id: 'n6-s6-c2', text: 'Aufschreiben für später', nextSceneId: null, points: 3 },
          { id: 'n6-s6-c3', text: 'Dankbar und motiviert fühlen', nextSceneId: null, points: 3 }
        ]
      }
    ]
  }
];

// Wisdom Cards
export const nightWisdomCards: WisdomCard[] = [
  {
    id: 'night-wisdom-1',
    islandId: 'night' as IslandId,
    title: 'Die 4-7-8 Atmung',
    content: 'Atme 4 Sekunden ein, halte 7 Sekunden, atme 8 Sekunden aus. Diese Technik aktiviert deinen Entspannungs-Nerv und beruhigt dich innerhalb von Minuten.',
    category: 'technique',
    collected: false
  },
  {
    id: 'night-wisdom-2',
    islandId: 'night' as IslandId,
    title: 'Gedanken sind keine Fakten',
    content: 'Nur weil du etwas denkst, ist es nicht automatisch wahr. Gedanken sind wie Wolken am Himmel - sie kommen und gehen. Du kannst sie beobachten, ohne ihnen zu glauben.',
    category: 'insight',
    collected: false
  },
  {
    id: 'night-wisdom-3',
    islandId: 'night' as IslandId,
    title: 'Blaues Licht und Schlaf',
    content: 'Bildschirme strahlen blaues Licht aus, das dein Gehirn denken lässt, es sei Tag. Mindestens eine Stunde vor dem Schlafen solltest du Bildschirme meiden oder Blaulichtfilter nutzen.',
    category: 'knowledge',
    collected: false
  },
  {
    id: 'night-wisdom-4',
    islandId: 'night' as IslandId,
    title: 'Die 5-4-3-2-1 Methode',
    content: 'Bei Stress oder Panik: Nenne 5 Dinge, die du siehst, 4 die du hörst, 3 die du fühlst, 2 die du riechst, 1 das du schmeckst. Das holt dich sofort ins Hier und Jetzt.',
    category: 'technique',
    collected: false
  },
  {
    id: 'night-wisdom-5',
    islandId: 'night' as IslandId,
    title: 'Schlaf ist Lernen',
    content: 'Im Schlaf verarbeitet dein Gehirn alles, was du gelernt hast. Eine Nacht guter Schlaf vor einer Prüfung ist wertvoller als stundenlange Paukerei!',
    category: 'knowledge',
    collected: false
  },
  {
    id: 'night-wisdom-6',
    islandId: 'night' as IslandId,
    title: 'Nein-Sagen ist Selbstfürsorge',
    content: 'Jedes Ja zu etwas ist ein Nein zu etwas anderem. Wenn du zu allem Ja sagst, sagst du Nein zu dir selbst. Grenzen setzen ist keine Schwäche, sondern Stärke.',
    category: 'insight',
    collected: false
  },
  {
    id: 'night-wisdom-7',
    islandId: 'night' as IslandId,
    title: 'Progressive Muskelentspannung',
    content: 'Spanne nacheinander verschiedene Muskelgruppen für 5 Sekunden an, dann entspanne sie bewusst. Von den Zehen bis zum Kopf. Dein Körper lernt wieder, was Entspannung ist.',
    category: 'technique',
    collected: false
  },
  {
    id: 'night-wisdom-8',
    islandId: 'night' as IslandId,
    title: 'Gedanken aufschreiben',
    content: 'Wenn Gedanken dich nachts wach halten, schreib sie auf. Dein Gehirn muss sie dann nicht mehr festhalten und kann loslassen. Ein Notizbuch neben dem Bett ist Gold wert!',
    category: 'technique',
    collected: false
  },
  {
    id: 'night-wisdom-9',
    islandId: 'night' as IslandId,
    title: 'Multitasking ist ein Mythos',
    content: 'Dein Gehirn kann nicht wirklich mehrere Dinge gleichzeitig tun. Es springt nur schnell hin und her - und wird dabei erschöpft. Eine Sache nach der anderen macht dich effizienter!',
    category: 'knowledge',
    collected: false
  },
  {
    id: 'night-wisdom-10',
    islandId: 'night' as IslandId,
    title: 'Präsenz über Perfektion',
    content: 'Wirklich bei einer Sache zu sein ist wertvoller als zehn Dinge gleichzeitig halb zu machen. Qualität kommt von Aufmerksamkeit, nicht von Geschwindigkeit.',
    category: 'insight',
    collected: false
  },
  {
    id: 'night-wisdom-11',
    islandId: 'night' as IslandId,
    title: 'FOMO ist normal',
    content: 'Fear Of Missing Out (FOMO) kennt jeder. Aber weißt du was? Während du Angst hast, etwas zu verpassen, verpasst du den Moment, in dem du gerade bist. Das echte Leben ist hier, jetzt.',
    category: 'insight',
    collected: false
  },
  {
    id: 'night-wisdom-12',
    islandId: 'night' as IslandId,
    title: 'Burnout-Warnsignale',
    content: 'Ständige Erschöpfung, Gereiztheit, Konzentrationsprobleme, körperliche Beschwerden ohne Ursache - das sind Warnsignale. Früh erkennen ist der Schlüssel zur Prävention!',
    category: 'knowledge',
    collected: false
  },
  {
    id: 'night-wisdom-13',
    islandId: 'night' as IslandId,
    title: 'Dein Wert ist nicht deine Leistung',
    content: 'Du bist wertvoll, nicht wegen dem, was du tust oder leistest, sondern einfach weil du existierst. Dein Wert ist unveränderlich - auch an schlechten Tagen.',
    category: 'insight',
    collected: false
  },
  {
    id: 'night-wisdom-14',
    islandId: 'night' as IslandId,
    title: 'Body Scan Meditation',
    content: 'Führe deine Aufmerksamkeit langsam durch deinen Körper, von den Füßen bis zum Kopf. Beobachte ohne zu urteilen. Das entspannt und lehrt dich, deinen Körper zu verstehen.',
    category: 'technique',
    collected: false
  },
  {
    id: 'night-wisdom-15',
    islandId: 'night' as IslandId,
    title: 'Routine schafft Ruhe',
    content: 'Eine Abendroutine signalisiert deinem Körper: "Jetzt kommt Schlaf". Das kann sein: Lesen, Tee trinken, Dimmen der Lichter. Dein Gehirn liebt vorhersehbare Rituale!',
    category: 'knowledge',
    collected: false
  },
  {
    id: 'night-wisdom-16',
    islandId: 'night' as IslandId,
    title: 'Die drei Säulen der Balance',
    content: 'Schlaf, Bewegung, soziale Verbindungen - diese drei halten dich im Gleichgewicht. Vernachlässigst du eine Säule, wackelt das ganze System. Pflege alle drei!',
    category: 'insight',
    collected: false
  }
];

// Activities
export const nightActivities: NightActivity[] = [
  {
    id: 'night-activity-1',
    islandId: 'night' as IslandId,
    title: 'Atem-Anker Übung',
    description: 'Eine 5-minütige Atemmeditation, die dich sofort beruhigt.',
    duration: 5,
    difficulty: 'easy',
    completed: false,
    instructions: [
      'Setze oder lege dich bequem hin.',
      'Schließe die Augen oder richte den Blick sanft nach unten.',
      'Atme normal und beobachte deinen Atem, ohne ihn zu verändern.',
      'Zähle beim Ausatmen: 1... beim nächsten Ausatmen: 2... bis 10.',
      'Wenn Gedanken kommen, sage innerlich "Danke" und kehre zum Zählen zurück.',
      'Nach 10 beginnst du wieder bei 1. Mache das 5 Minuten lang.',
      'Öffne langsam die Augen und spüre, wie du dich jetzt fühlst.'
    ]
  },
  {
    id: 'night-activity-2',
    islandId: 'night' as IslandId,
    title: 'Digital Sunset Challenge',
    description: 'Eine Woche lang: Kein Bildschirm eine Stunde vor dem Schlafen.',
    duration: 60,
    difficulty: 'medium',
    completed: false,
    instructions: [
      'Wähle deine "Bildschirm-Aus-Zeit" (z.B. 21 Uhr).',
      'Stelle einen Wecker 15 Minuten vorher als Erinnerung.',
      'Schalte alle Geräte in den Flugmodus oder leg sie weg.',
      'Bereite alternative Aktivitäten vor: Buch, Musik, Malen, Tagebuch.',
      'Wenn es schwer fällt: Atme tief durch und erinnere dich an dein "Warum".',
      'Führe ein kurzes "Bildschirm-Tagebuch": Wie fühlst du dich ohne?',
      'Nach einer Woche: Reflektiere, was sich verändert hat.'
    ]
  },
  {
    id: 'night-activity-3',
    islandId: 'night' as IslandId,
    title: 'Gedanken-Wolken-Meditation',
    description: 'Lerne, Gedanken ziehen zu lassen wie Wolken am Himmel.',
    duration: 10,
    difficulty: 'medium',
    completed: false,
    instructions: [
      'Setz dich bequem hin und schließe die Augen.',
      'Stell dir einen weiten, blauen Himmel vor - das bist du.',
      'Beobachte, wie Gedanken wie Wolken auftauchen.',
      'Benenne jeden Gedanken kurz: "Sorge", "Erinnerung", "Planung".',
      'Lass die Gedanken-Wolke weiterziehen, ohne sie festzuhalten.',
      'Kehre immer wieder zu deinem Atem zurück - deinem ruhigen Himmel.',
      'Nach 10 Minuten: Öffne die Augen und sei stolz auf deine Übung.'
    ]
  },
  {
    id: 'night-activity-4',
    islandId: 'night' as IslandId,
    title: 'Mein Ruhe-Werkzeugkasten',
    description: 'Erstelle deine persönliche Sammlung von Anti-Stress-Tools.',
    duration: 20,
    difficulty: 'easy',
    completed: false,
    instructions: [
      'Nimm ein Blatt Papier und teile es in 5 Bereiche: Körperlich, Kreativ, Sozial, Natur, Allein-Zeit.',
      'Überlege zu jedem Bereich: Was beruhigt MICH? (z.B. Tanzen, Malen, mit Oma telefonieren, Spaziergang, Lesen)',
      'Markiere 3-5 Tools, die schnell verfügbar sind (unter 5 Minuten).',
      'Schreibe deine Top 3 auf eine Karte und häng sie sichtbar auf.',
      'Teste diese Woche jeden Tag ein anderes Tool.',
      'Notiere, wie du dich danach fühlst (1-10 Skala).',
      'Passe deinen Werkzeugkasten an - er darf sich entwickeln!'
    ]
  },
  {
    id: 'night-activity-5',
    islandId: 'night' as IslandId,
    title: 'Body Scan für besseren Schlaf',
    description: 'Eine Körperreise, die dich tief entspannt und aufs Schlafen vorbereitet.',
    duration: 15,
    difficulty: 'easy',
    completed: false,
    instructions: [
      'Lege dich ins Bett, Arme neben dem Körper, Beine locker.',
      'Atme dreimal tief ein und aus - lass mit jedem Ausatmen los.',
      'Richte deine Aufmerksamkeit auf deine Füße. Entspanne sie bewusst.',
      'Wandere langsam nach oben: Unterschenkel, Oberschenkel, Becken, Bauch.',
      'Weiter zu Brust, Schultern, Armen, Händen, Nacken, Gesicht.',
      'Bei jedem Bereich: 3-5 Atemzüge lang Aufmerksamkeit schenken, dann loslassen.',
      'Wenn du oben angekommen bist, spüre deinen ganzen entspannten Körper und gleite in den Schlaf.'
    ]
  }
];
