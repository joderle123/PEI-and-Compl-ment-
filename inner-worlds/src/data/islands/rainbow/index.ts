// @ts-nocheck
import type { Scenario, WisdomCard, Activity, IslandId } from '../../../types';

interface ExtendedActivity extends Activity {
  instructions: string[];
}

interface NPC {
  id: string;
  name: string;
  emoji: string;
  description: string;
  backstory: string;
}

const ISLAND_ID: IslandId = 'rainbow';

export const rainbowNPCs: NPC[] = [
  {
    id: 'sofia',
    name: 'Sofia',
    emoji: '🌻',
    description: 'Ein fröhliches portugiesisches Mädchen, das Fado-Musik liebt',
    backstory: 'Sofia kam vor drei Jahren mit ihrer Familie aus Portugal nach Luxemburg. Sie vermisst manchmal ihre Großeltern in Porto, aber sie liebt es, neue Freunde zu finden und beiden Kulturen zu teilen.'
  },
  {
    id: 'amadou',
    name: 'Amadou',
    emoji: '🥁',
    description: 'Ein talentierter Trommler aus Senegal mit ansteckender Energie',
    backstory: 'Amadou wohnt seit zwei Jahren in Luxemburg und bringt allen bei, wie man afrikanische Rhythmen spielt. Er träumt davon, eines Tages eine Band zu gründen, die Musik aus der ganzen Welt spielt.'
  },
  {
    id: 'lina',
    name: 'Lina',
    emoji: '📚',
    description: 'Ein wissbegieriges luxemburgisches Mädchen, das drei Sprachen spricht',
    backstory: 'Lina ist in Luxemburg-Stadt geboren und spricht Luxemburgisch, Deutsch und Französisch. Sie ist fasziniert von anderen Kulturen und sammelt Geschichten von Kindern aus aller Welt.'
  },
  {
    id: 'pierre',
    name: 'Pierre',
    emoji: '🎨',
    description: 'Ein kreativer französischer Künstler im Rollstuhl',
    backstory: 'Pierre zog aus Metz nach Luxemburg und malt wunderschöne Bilder. Seine Behinderung hält ihn nicht davon ab, seine Träume zu verfolgen. Er setzt sich für Barrierefreiheit ein und zeigt, dass Kunst keine Grenzen kennt.'
  },
  {
    id: 'yasmine',
    name: 'Yasmine',
    emoji: '🌙',
    description: 'Eine brillante Wissenschaftsfans mit Hijab und großen Träumen',
    backstory: 'Yasmine ist in Luxemburg geboren, ihre Familie kommt aus Marokko. Sie möchte Astrophysikerin werden und beweisen, dass man seinen Glauben leben und gleichzeitig die Sterne erforschen kann.'
  }
];

export const rainbowScenarios: Scenario[] = [
  {
    id: 'rainbow-scenario-1',
    title: 'Das Internationale Schulfest',
    description: 'Die Schule plant ein multikulturelles Fest. Wie können alle Kulturen fair repräsentiert werden?',
    islandId: ISLAND_ID,
    scenes: [
      {
        id: 'r1-s1',
        text: 'Die Direktorin verkündet das internationale Schulfest. Jede Klasse soll ihre kulturelle Vielfalt präsentieren. Sofia ist aufgeregt, aber auch nervös, weil sie nicht weiß, ob ihre portugiesische Kultur willkommen ist.',
        choices: [
          {
            id: 'r1-s1-c1',
            text: 'Sofia ermutigen, ihre Kultur stolz zu präsentieren',
            nextSceneId: 'r1-s2',
            points: 3
          },
          {
            id: 'r1-s1-c2',
            text: 'Vorschlagen, nur die "Hauptkulturen" zu zeigen',
            nextSceneId: 'r1-s2',
            points: 0
          },
          {
            id: 'r1-s1-c3',
            text: 'Abwarten und schauen, was andere machen',
            nextSceneId: 'r1-s2',
            points: 1
          }
        ]
      },
      {
        id: 'r1-s2',
        text: 'Amadou schlägt vor, eine gemeinsame Musik-Performance zu machen, bei der alle Kulturen zusammenkommen. Einige Schüler finden das kompliziert und wollen lieber getrennte Stände machen.',
        choices: [
          {
            id: 'r1-s2-c1',
            text: 'Amadous Idee unterstützen und gemeinsam planen',
            nextSceneId: 'r1-s3',
            points: 3
          },
          {
            id: 'r1-s2-c2',
            text: 'Für getrennte Stände stimmen, weil es einfacher ist',
            nextSceneId: 'r1-s3',
            points: 1
          },
          {
            id: 'r1-s2-c3',
            text: 'Einen Kompromiss vorschlagen: beides machen',
            nextSceneId: 'r1-s3',
            points: 2
          }
        ]
      },
      {
        id: 'r1-s3',
        text: 'Lina übersetzt für alle in drei Sprachen, damit jeder versteht. Pierre hat Schwierigkeiten, an einigen Planungstreffen teilzunehmen, weil das Klassenzimmer im zweiten Stock ohne Aufzug liegt.',
        choices: [
          {
            id: 'r1-s3-c1',
            text: 'Sofort vorschlagen, den Treffpunkt zu ändern',
            nextSceneId: 'r1-s4',
            points: 3
          },
          {
            id: 'r1-s3-c2',
            text: 'Pierre anbieten, ihm die Infos nachher zu erzählen',
            nextSceneId: 'r1-s4',
            points: 1
          },
          {
            id: 'r1-s3-c3',
            text: 'Nichts sagen, ist ja nicht dein Problem',
            nextSceneId: 'r1-s4',
            points: 0
          }
        ]
      },
      {
        id: 'r1-s4',
        text: 'Yasmine präsentiert ihre Idee für einen Wissenschaftsstand über Astronomie in verschiedenen Kulturen. Ein Mitschüler macht einen dummen Kommentar über ihr Kopftuch und ob sie "wirklich luxemburgisch" sei.',
        choices: [
          {
            id: 'r1-s4-c1',
            text: 'Yasmine verteidigen und erklären, dass Vielfalt uns stärker macht',
            nextSceneId: 'r1-s5',
            points: 3
          },
          {
            id: 'r1-s4-c2',
            text: 'Schweigen, um Konflikte zu vermeiden',
            nextSceneId: 'r1-s5',
            points: 0
          },
          {
            id: 'r1-s4-c3',
            text: 'Dem Mitschüler später unter vier Augen sagen, dass das nicht okay war',
            nextSceneId: 'r1-s5',
            points: 2
          }
        ]
      },
      {
        id: 'r1-s5',
        text: 'Am Tag des Festes gibt es einen Moment der Stille für alle Kulturen. Dann spielen Sofia, Amadou und andere zusammen Musik aus verschiedenen Ländern. Die Melodien verschmelzen zu etwas ganz Neuem und Schönem.',
        choices: [
          {
            id: 'r1-s5-c1',
            text: 'Mitjubeln und die Einheit feiern',
            nextSceneId: 'r1-s6',
            points: 3
          },
          {
            id: 'r1-s5-c2',
            text: 'Denken, dass es doch etwas chaotisch klingt',
            nextSceneId: 'r1-s6',
            points: 1
          },
          {
            id: 'r1-s5-c3',
            text: 'Ein Video machen und allen zeigen, wie toll es ist',
            nextSceneId: 'r1-s6',
            points: 2
          }
        ]
      },
      {
        id: 'r1-s6',
        text: 'Die Direktorin ist beeindruckt von der Zusammenarbeit. Sie beschließt, jeden Monat einen "Kulturtag" einzuführen. Alle haben gelernt, dass Luxemburg stark ist, weil es so viele verschiedene Menschen vereint.',
        choices: [
          {
            id: 'r1-s6-c1',
            text: 'Sich freiwillig melden, beim nächsten Kulturtag zu helfen',
            nextSceneId: null,
            points: 3
          },
          {
            id: 'r1-s6-c2',
            text: 'Froh sein, dass es vorbei ist',
            nextSceneId: null,
            points: 1
          },
          {
            id: 'r1-s6-c3',
            text: 'Eine Dankes-Karte für alle Helfer basteln',
            nextSceneId: null,
            points: 2
          }
        ]
      }
    ],
    completed: false
  },
  {
    id: 'rainbow-scenario-2',
    title: 'Cybermobbing erkennen',
    description: 'Jemand wird online gemobbt wegen ihrer Herkunft. Wie reagierst du?',
    islandId: ISLAND_ID,
    scenes: [
      {
        id: 'r2-s1',
        text: 'In der Klassenchat-Gruppe postet jemand ein gemeines Meme über Sofias Akzent. Einige lachen mit Emojis, andere schweigen. Sofia sieht es auf ihrem Handy und ihre Augen füllen sich mit Tränen.',
        choices: [
          {
            id: 'r2-s1-c1',
            text: 'Sofort im Chat sagen, dass das nicht okay ist',
            nextSceneId: 'r2-s2',
            points: 3
          },
          {
            id: 'r2-s1-c2',
            text: 'Sofia privat Unterstützung anbieten',
            nextSceneId: 'r2-s2',
            points: 2
          },
          {
            id: 'r2-s1-c3',
            text: 'Nichts tun, ist ja nur ein Witz',
            nextSceneId: 'r2-s2',
            points: 0
          }
        ]
      },
      {
        id: 'r2-s2',
        text: 'Die Situation eskaliert. Mehr Schüler machen mit und posten gemeine Kommentare über verschiedene Akzente und Herkünfte. Amadou wird auch zur Zielscheibe wegen seiner Hautfarbe.',
        choices: [
          {
            id: 'r2-s2-c1',
            text: 'Screenshots machen und einen Lehrer informieren',
            nextSceneId: 'r2-s3',
            points: 3
          },
          {
            id: 'r2-s2-c2',
            text: 'Versuchen, die Stimmung mit einem anderen Thema zu ändern',
            nextSceneId: 'r2-s3',
            points: 1
          },
          {
            id: 'r2-s2-c3',
            text: 'Die Chat-Gruppe verlassen ohne etwas zu sagen',
            nextSceneId: 'r2-s3',
            points: 1
          }
        ]
      },
      {
        id: 'r2-s3',
        text: 'Lina findet heraus, wer die Mobbing-Nachrichten gestartet hat: Max, ein Schüler, der selbst Probleme zu Hause hat. Sie überlegt, wie man beide Seiten verstehen kann, ohne das Mobbing zu entschuldigen.',
        choices: [
          {
            id: 'r2-s3-c1',
            text: 'Mit Max reden und verstehen, warum er so handelt',
            nextSceneId: 'r2-s4',
            points: 2
          },
          {
            id: 'r2-s3-c2',
            text: 'Max sofort der Schule melden',
            nextSceneId: 'r2-s4',
            points: 2
          },
          {
            id: 'r2-s3-c3',
            text: 'Beides: melden UND Gespräch suchen',
            nextSceneId: 'r2-s4',
            points: 3
          }
        ]
      },
      {
        id: 'r2-s4',
        text: 'Die Schule organisiert einen Workshop über Cybermobbing. Pierre teilt seine eigene Geschichte: Er wurde früher online gemobbt wegen seiner Behinderung. Seine Worte berühren viele Herzen.',
        choices: [
          {
            id: 'r2-s4-c1',
            text: 'Pierre danken und eigene Erfahrungen teilen',
            nextSceneId: 'r2-s5',
            points: 3
          },
          {
            id: 'r2-s4-c2',
            text: 'Aufmerksam zuhören aber nichts sagen',
            nextSceneId: 'r2-s5',
            points: 2
          },
          {
            id: 'r2-s4-c3',
            text: 'Am Handy spielen, ist ja nur ein Workshop',
            nextSceneId: 'r2-s5',
            points: 0
          }
        ]
      },
      {
        id: 'r2-s5',
        text: 'Max entschuldigt sich vor der ganzen Klasse bei Sofia und Amadou. Er erklärt, dass er selbst Angst hatte, nicht dazuzugehören, und andere angriff, um sich stark zu fühlen.',
        choices: [
          {
            id: 'r2-s5-c1',
            text: 'Max eine zweite Chance geben und ihm helfen, sich zu ändern',
            nextSceneId: 'r2-s6',
            points: 3
          },
          {
            id: 'r2-s5-c2',
            text: 'Akzeptieren, aber Abstand halten',
            nextSceneId: 'r2-s6',
            points: 2
          },
          {
            id: 'r2-s5-c3',
            text: 'Denken, dass Entschuldigungen nicht reichen',
            nextSceneId: 'r2-s6',
            points: 1
          }
        ]
      },
      {
        id: 'r2-s6',
        text: 'Die Klasse erstellt gemeinsam neue Chat-Regeln: Respekt, keine Beleidigungen, sofortiges Einschreiten bei Mobbing. Yasmine wird zur "Respekt-Botschafterin" gewählt und hilft bei Konflikten zu vermitteln.',
        choices: [
          {
            id: 'r2-s6-c1',
            text: 'Die Regeln unterschreiben und aktiv umsetzen',
            nextSceneId: null,
            points: 3
          },
          {
            id: 'r2-s6-c2',
            text: 'Unterschreiben aber nicht sicher sein, ob es hilft',
            nextSceneId: null,
            points: 2
          },
          {
            id: 'r2-s6-c3',
            text: 'Yasmine als Respekt-Botschafterin unterstützen',
            nextSceneId: null,
            points: 3
          }
        ]
      }
    ],
    completed: false
  },
  {
    id: 'rainbow-scenario-3',
    title: 'Zwischen zwei Welten',
    description: 'Sich zwischen verschiedenen kulturellen Identitäten zugehörig fühlen.',
    islandId: ISLAND_ID,
    scenes: [
      {
        id: 'r3-s1',
        text: 'Yasmine fühlt sich hin- und hergerissen. In der Schule wird sie als "die Marokkanerin" gesehen, aber in Marokko bei Verwandtenbesuchen gilt sie als "die Luxemburgerin". Sie fragt sich, wo sie wirklich hingehört.',
        choices: [
          {
            id: 'r3-s1-c1',
            text: 'Ihr sagen, dass sie beides sein kann und das eine Stärke ist',
            nextSceneId: 'r3-s2',
            points: 3
          },
          {
            id: 'r3-s1-c2',
            text: 'Vorschlagen, sich für eine Identität zu entscheiden',
            nextSceneId: 'r3-s2',
            points: 0
          },
          {
            id: 'r3-s1-c3',
            text: 'Eigene ähnliche Gefühle teilen',
            nextSceneId: 'r3-s2',
            points: 2
          }
        ]
      },
      {
        id: 'r3-s2',
        text: 'Sofia versteht Yasmines Gefühle. Sie erzählt, wie schwer es war, als ihre Oma aus Portugal sie bat, nur Portugiesisch zu sprechen, während in der Schule alle Deutsch oder Französisch reden. Sie fühlte sich wie zwei verschiedene Personen.',
        choices: [
          {
            id: 'r3-s2-c1',
            text: 'Einen "Multikulti-Club" vorschlagen für alle mit mehreren Identitäten',
            nextSceneId: 'r3-s3',
            points: 3
          },
          {
            id: 'r3-s2-c2',
            text: 'Sagen, dass es mit der Zeit leichter wird',
            nextSceneId: 'r3-s3',
            points: 1
          },
          {
            id: 'r3-s2-c3',
            text: 'Alle ermutigen, über ihre verschiedenen Identitäten zu sprechen',
            nextSceneId: 'r3-s3',
            points: 2
          }
        ]
      },
      {
        id: 'r3-s3',
        text: 'Der Multikulti-Club wird gegründet. Lina, die "nur" luxemburgisch ist, fragt sich, ob sie auch mitmachen darf. Sie fühlt sich manchmal ausgeschlossen von diesen Gesprächen über mehrere Kulturen.',
        choices: [
          {
            id: 'r3-s3-c1',
            text: 'Lina einladen und erklären, dass jeder willkommen ist',
            nextSceneId: 'r3-s4',
            points: 3
          },
          {
            id: 'r3-s3-c2',
            text: 'Sagen, der Club ist nur für "multikulturelle" Kinder',
            nextSceneId: 'r3-s4',
            points: 0
          },
          {
            id: 'r3-s3-c3',
            text: 'Lina fragen, ob sie sich ausgeschlossen fühlt',
            nextSceneId: 'r3-s4',
            points: 2
          }
        ]
      },
      {
        id: 'r3-s4',
        text: 'Amadou spricht über den Druck, immer "afrikanisch genug" sein zu müssen. Manche erwarten, dass er ständig über Afrika redet, aber er ist auch einfach ein Teenager, der Videospiele und Pizza mag.',
        choices: [
          {
            id: 'r3-s4-c1',
            text: 'Verstehen, dass niemand in eine Schublade passen muss',
            nextSceneId: 'r3-s5',
            points: 3
          },
          {
            id: 'r3-s4-c2',
            text: 'Denken, dass er stolzer auf seine Kultur sein sollte',
            nextSceneId: 'r3-s5',
            points: 0
          },
          {
            id: 'r3-s4-c3',
            text: 'Eigene Erfahrungen mit Erwartungen teilen',
            nextSceneId: 'r3-s5',
            points: 2
          }
        ]
      },
      {
        id: 'r3-s5',
        text: 'Pierre macht einen Kunstworkshop, wo jeder seine "Identitäts-Collage" erstellt. Jeder kombiniert Bilder, Worte und Symbole aus allen Teilen seiner Identität. Die Ergebnisse sind wunderschön und einzigartig.',
        choices: [
          {
            id: 'r3-s5-c1',
            text: 'Begeistert mitmachen und kreativ werden',
            nextSceneId: 'r3-s6',
            points: 3
          },
          {
            id: 'r3-s5-c2',
            text: 'Mitmachen aber unsicher, was man zeigen soll',
            nextSceneId: 'r3-s6',
            points: 2
          },
          {
            id: 'r3-s5-c3',
            text: 'Denken, dass das alles zu kompliziert ist',
            nextSceneId: 'r3-s6',
            points: 0
          }
        ]
      },
      {
        id: 'r3-s6',
        text: 'Die Gruppe erkennt: Identität ist wie ein Regenbogen – viele Farben, die zusammen etwas Schönes ergeben. In Luxemburg, wo so viele Kulturen zusammenleben, können alle ihre eigene einzigartige Mischung sein.',
        choices: [
          {
            id: 'r3-s6-c1',
            text: 'Diese Botschaft mit anderen teilen und verbreiten',
            nextSceneId: null,
            points: 3
          },
          {
            id: 'r3-s6-c2',
            text: 'Für sich selbst diese Erkenntnis bewahren',
            nextSceneId: null,
            points: 2
          },
          {
            id: 'r3-s6-c3',
            text: 'Ein "Regenbogen-Manifest" für die Schule schreiben',
            nextSceneId: null,
            points: 3
          }
        ]
      }
    ],
    completed: false
  },
  {
    id: 'rainbow-scenario-4',
    title: 'Barrieren überwinden',
    description: 'Pierre zeigt, wie Inklusion funktioniert und warum sie wichtig ist.',
    islandId: ISLAND_ID,
    scenes: [
      {
        id: 'r4-s1',
        text: 'Die Klasse plant einen Ausflug ins Museum. Pierre ist aufgeregt, aber dann stellt sich heraus, dass das Museum nicht vollständig barrierefrei ist. Die Lehrerin überlegt, ob Pierre vielleicht zu Hause bleiben sollte.',
        choices: [
          {
            id: 'r4-s1-c1',
            text: 'Vorschlagen, ein anderes barrierefreies Museum zu wählen',
            nextSceneId: 'r4-s2',
            points: 3
          },
          {
            id: 'r4-s1-c2',
            text: 'Fragen, wie man das Museum barrierefrei machen könnte',
            nextSceneId: 'r4-s2',
            points: 2
          },
          {
            id: 'r4-s1-c3',
            text: 'Denken, dass Pierre eben manchmal nicht überall mitkommen kann',
            nextSceneId: 'r4-s2',
            points: 0
          }
        ]
      },
      {
        id: 'r4-s2',
        text: 'Pierre spricht offen über seine Frustration. Er erklärt, dass nicht seine Behinderung ihn ausschließt, sondern die fehlende Barrierefreiheit. Die Klasse beginnt zu verstehen, dass Inklusion keine Gunst ist, sondern ein Recht.',
        choices: [
          {
            id: 'r4-s2-c1',
            text: 'Pierre zustimmen und aktiv nach Lösungen suchen',
            nextSceneId: 'r4-s3',
            points: 3
          },
          {
            id: 'r4-s2-c2',
            text: 'Zuhören aber nicht wissen, wie man helfen kann',
            nextSceneId: 'r4-s3',
            points: 1
          },
          {
            id: 'r4-s2-c3',
            text: 'Das Museum anrufen und nach Verbesserungen fragen',
            nextSceneId: 'r4-s3',
            points: 3
          }
        ]
      },
      {
        id: 'r4-s3',
        text: 'Yasmine hat eine Idee: Die Klasse könnte das Museum vorher besuchen und einen "Barrierefreiheits-Check" machen. Sie dokumentieren alle Hindernisse und präsentieren Lösungsvorschläge. Das Museum ist beeindruckt und lädt sie ein, zu helfen.',
        choices: [
          {
            id: 'r4-s3-c1',
            text: 'Begeistert beim Barrierefreiheits-Check mitmachen',
            nextSceneId: 'r4-s4',
            points: 3
          },
          {
            id: 'r4-s3-c2',
            text: 'Das ist viel Arbeit, lieber einfach ein anderes Museum wählen',
            nextSceneId: 'r4-s4',
            points: 1
          },
          {
            id: 'r4-s3-c3',
            text: 'Pierre fragen, was ihm am wichtigsten wäre',
            nextSceneId: 'r4-s4',
            points: 2
          }
        ]
      },
      {
        id: 'r4-s4',
        text: 'Beim Check entdeckt die Klasse viele unsichtbare Barrieren: zu kleine Schrift auf Schildern, fehlende akustische Signale, komplizierte Sprache. Sofia bemerkt, dass Barrierefreiheit auch Menschen mit anderen Herausforderungen hilft.',
        choices: [
          {
            id: 'r4-s4-c1',
            text: 'Einen umfassenden Bericht mit allen Barrieren erstellen',
            nextSceneId: 'r4-s5',
            points: 3
          },
          {
            id: 'r4-s4-c2',
            text: 'Nur die wichtigsten Probleme ansprechen',
            nextSceneId: 'r4-s5',
            points: 2
          },
          {
            id: 'r4-s4-c3',
            text: 'Überwältigt sein von den vielen Problemen',
            nextSceneId: 'r4-s5',
            points: 1
          }
        ]
      },
      {
        id: 'r4-s5',
        text: 'Das Museum setzt einige Vorschläge um: Rampen werden installiert, Texte werden vereinfacht, es gibt Audio-Guides. Bei der Eröffnung der barrierefreien Ausstellung hält Pierre eine bewegende Rede über Inklusion.',
        choices: [
          {
            id: 'r4-s5-c1',
            text: 'Stolz sein auf das Erreichte und weitermachen',
            nextSceneId: 'r4-s6',
            points: 3
          },
          {
            id: 'r4-s5-c2',
            text: 'Froh sein, dass Pierre jetzt mitkommen kann',
            nextSceneId: 'r4-s6',
            points: 2
          },
          {
            id: 'r4-s5-c3',
            text: 'In der Schule ein Barrierefreiheits-Team gründen',
            nextSceneId: 'r4-s6',
            points: 3
          }
        ]
      },
      {
        id: 'r4-s6',
        text: 'Die Schule wird inspiriert und startet ihr eigenes Barrierefreiheits-Projekt. Amadou, Lina und andere helfen dabei, die Schule inklusiver zu machen. Sie lernen: Wenn wir für eine Person Barrieren abbauen, helfen wir allen.',
        choices: [
          {
            id: 'r4-s6-c1',
            text: 'Aktiv am Schulprojekt teilnehmen',
            nextSceneId: null,
            points: 3
          },
          {
            id: 'r4-s6-c2',
            text: 'Unterstützen aber nicht aktiv mitarbeiten',
            nextSceneId: null,
            points: 2
          },
          {
            id: 'r4-s6-c3',
            text: 'Andere Schulen in Luxemburg kontaktieren und die Idee verbreiten',
            nextSceneId: null,
            points: 3
          }
        ]
      }
    ],
    completed: false
  },
  {
    id: 'rainbow-scenario-5',
    title: 'Neu in Luxemburg',
    description: 'Ein neuer Schüler aus Syrien braucht Hilfe, sich einzuleben.',
    islandId: ISLAND_ID,
    scenes: [
      {
        id: 'r5-s1',
        text: 'Tariq kommt neu aus Syrien in die Klasse. Er spricht kaum Deutsch oder Französisch und sitzt in der Pause alleine. Seine Augen sind traurig, und er scheint sich nach seiner alten Heimat zu sehnen.',
        choices: [
          {
            id: 'r5-s1-c1',
            text: 'Auf Tariq zugehen und versuchen, sich zu verständigen',
            nextSceneId: 'r5-s2',
            points: 3
          },
          {
            id: 'r5-s1-c2',
            text: 'Freundlich lächeln aber Abstand halten wegen der Sprachbarriere',
            nextSceneId: 'r5-s2',
            points: 1
          },
          {
            id: 'r5-s1-c3',
            text: 'Einen Übersetzungs-App nutzen, um zu kommunizieren',
            nextSceneId: 'r5-s2',
            points: 2
          }
        ]
      },
      {
        id: 'r5-s2',
        text: 'Yasmine spricht ein wenig Arabisch und hilft beim Übersetzen. Sie erfährt, dass Tariq seine Freunde und sein Zuhause vermisst. Er hat Angst, nie dazuzugehören und die Sprachen nie richtig zu lernen.',
        choices: [
          {
            id: 'r5-s2-c1',
            text: 'Tariq versichern, dass alle ihm helfen werden',
            nextSceneId: 'r5-s3',
            points: 3
          },
          {
            id: 'r5-s2-c2',
            text: 'Ehrlich sein, dass es Zeit braucht aber besser wird',
            nextSceneId: 'r5-s3',
            points: 2
          },
          {
            id: 'r5-s2-c3',
            text: 'Einen Sprach-Buddy-Plan organisieren',
            nextSceneId: 'r5-s3',
            points: 3
          }
        ]
      },
      {
        id: 'r5-s3',
        text: 'Sofia erinnert sich an ihre eigenen ersten Tage in Luxemburg. Sie lädt Tariq ein, in der Pause Fußball zu spielen – eine Sprache, die jeder versteht. Tariq lächelt zum ersten Mal und seine Fußballkünste beeindrucken alle.',
        choices: [
          {
            id: 'r5-s3-c1',
            text: 'Mitspielen und Tariq ins Team integrieren',
            nextSceneId: 'r5-s4',
            points: 3
          },
          {
            id: 'r5-s3-c2',
            text: 'Zuschauen und anfeuern',
            nextSceneId: 'r5-s4',
            points: 2
          },
          {
            id: 'r5-s3-c3',
            text: 'Andere gemeinsame Interessen mit Tariq suchen',
            nextSceneId: 'r5-s4',
            points: 2
          }
        ]
      },
      {
        id: 'r5-s4',
        text: 'Einige Wochen später gibt es einen Vorfall: Jemand beschuldigt Tariq, Sachen gestohlen zu haben, nur weil er neu ist. Die Anschuldigungen basieren auf Vorurteilen, nicht auf Beweisen. Tariq ist am Boden zerstört.',
        choices: [
          {
            id: 'r5-s4-c1',
            text: 'Tariq verteidigen und die Vorurteile ansprechen',
            nextSceneId: 'r5-s5',
            points: 3
          },
          {
            id: 'r5-s4-c2',
            text: 'Abwarten, bis die Wahrheit herauskommt',
            nextSceneId: 'r5-s5',
            points: 1
          },
          {
            id: 'r5-s4-c3',
            text: 'Helfen, die wahren Fakten herauszufinden',
            nextSceneId: 'r5-s5',
            points: 2
          }
        ]
      },
      {
        id: 'r5-s5',
        text: 'Lina findet die gestohlenen Sachen in einem anderen Schrank. Der Beschuldiger entschuldigt sich kleinlaut. Die Klasse hat eine wichtige Lektion gelernt: Vorurteile schaden echten Menschen und haben in ihrer Gemeinschaft keinen Platz.',
        choices: [
          {
            id: 'r5-s5-c1',
            text: 'Eine Klassendiskussion über Vorurteile vorschlagen',
            nextSceneId: 'r5-s6',
            points: 3
          },
          {
            id: 'r5-s5-c2',
            text: 'Tariq aufmuntern und zeigen, dass du zu ihm stehst',
            nextSceneId: 'r5-s6',
            points: 2
          },
          {
            id: 'r5-s5-c3',
            text: 'Froh sein, dass alles geklärt ist',
            nextSceneId: 'r5-s6',
            points: 1
          }
        ]
      },
      {
        id: 'r5-s6',
        text: 'Ein halbes Jahr später spricht Tariq schon viel besser Deutsch. Er erzählt der Klasse von Syrien, seiner Flucht und seinen Träumen. Amadou, Sofia und er gründen eine "Neuankömmlinge-Hilfsgruppe" für zukünftige neue Schüler.',
        choices: [
          {
            id: 'r5-s6-c1',
            text: 'Der Hilfsgruppe beitreten und aktiv mithelfen',
            nextSceneId: null,
            points: 3
          },
          {
            id: 'r5-s6-c2',
            text: 'Die Initiative unterstützen durch Spenden oder Hilfe',
            nextSceneId: null,
            points: 2
          },
          {
            id: 'r5-s6-c3',
            text: 'Stolz sein auf Tariqs Entwicklung',
            nextSceneId: null,
            points: 2
          }
        ]
      }
    ],
    completed: false
  },
  {
    id: 'rainbow-scenario-6',
    title: 'Zusammen sind wir stärker',
    description: 'Ein Projekt zeigt, wie Vielfalt zu Innovation und Stärke führt.',
    islandId: ISLAND_ID,
    scenes: [
      {
        id: 'r6-s1',
        text: 'Die Schule nimmt an einem nationalen Wettbewerb teil: "Luxemburgs Zukunft gestalten". Jede Schule soll ein Projekt einreichen, das zeigt, wie Luxemburg noch besser werden kann. Die Klasse muss entscheiden, woran sie arbeiten will.',
        choices: [
          {
            id: 'r6-s1-c1',
            text: 'Vorschlagen, die Vielfalt der Klasse als Stärke zu nutzen',
            nextSceneId: 'r6-s2',
            points: 3
          },
          {
            id: 'r6-s1-c2',
            text: 'Ein "sicheres" Thema wählen, das alle kennen',
            nextSceneId: 'r6-s2',
            points: 1
          },
          {
            id: 'r6-s1-c3',
            text: 'Alle Ideen sammeln und demokratisch abstimmen',
            nextSceneId: 'r6-s2',
            points: 2
          }
        ]
      },
      {
        id: 'r6-s2',
        text: 'Die Gruppe entscheidet sich für "Vielfalt als Motor für Innovation". Pierre entwirft Grafiken, Amadou komponiert Musik, Sofia schreibt in mehreren Sprachen, Yasmine bringt wissenschaftliche Fakten ein, und Lina koordiniert alles.',
        choices: [
          {
            id: 'r6-s2-c1',
            text: 'Begeistert eigene Stärken einbringen',
            nextSceneId: 'r6-s3',
            points: 3
          },
          {
            id: 'r6-s2-c2',
            text: 'Helfen, wo Hilfe gebraucht wird',
            nextSceneId: 'r6-s3',
            points: 2
          },
          {
            id: 'r6-s2-c3',
            text: 'Unsicher sein, was man selbst beitragen kann',
            nextSceneId: 'r6-s3',
            points: 1
          }
        ]
      },
      {
        id: 'r6-s3',
        text: 'Es gibt Spannungen: Verschiedene Ideen prallen aufeinander, Kommunikation ist manchmal schwierig, und Missverständnisse entstehen. Einige denken, dass eine homogenere Gruppe einfacher wäre. Andere sehen gerade darin die Chance.',
        choices: [
          {
            id: 'r6-s3-c1',
            text: 'Konflikte als Chance sehen und Kompromisse finden',
            nextSceneId: 'r6-s4',
            points: 3
          },
          {
            id: 'r6-s3-c2',
            text: 'Frustriert sein und überlegen aufzugeben',
            nextSceneId: 'r6-s4',
            points: 0
          },
          {
            id: 'r6-s3-c3',
            text: 'Eine Mediatorin holen, um zu helfen',
            nextSceneId: 'r6-s4',
            points: 2
          }
        ]
      },
      {
        id: 'r6-s4',
        text: 'Ein Durchbruch: Die verschiedenen Perspektiven führen zu kreativen Lösungen, an die niemand alleine gedacht hätte. Das Projekt wird zu einem Multimedia-Kunstwerk, das Luxemburgs Multikulturalität feiert und gleichzeitig Herausforderungen anspricht.',
        choices: [
          {
            id: 'r6-s4-c1',
            text: 'Mit voller Energie bis zur Perfektion arbeiten',
            nextSceneId: 'r6-s5',
            points: 3
          },
          {
            id: 'r6-s4-c2',
            text: 'Zufrieden sein mit dem guten Ergebnis',
            nextSceneId: 'r6-s5',
            points: 2
          },
          {
            id: 'r6-s4-c3',
            text: 'Dokumentieren, wie die Vielfalt zum Erfolg führte',
            nextSceneId: 'r6-s5',
            points: 3
          }
        ]
      },
      {
        id: 'r6-s5',
        text: 'Bei der Präsentation vor der Jury sind alle nervös. Aber als sie auf die Bühne gehen – Sofia, Amadou, Lina, Pierre, Yasmine und viele andere – repräsentieren sie perfekt, was Luxemburg ausmacht: Einheit in Vielfalt.',
        choices: [
          {
            id: 'r6-s5-c1',
            text: 'Die Präsentation mit Herz und Leidenschaft durchführen',
            nextSceneId: 'r6-s6',
            points: 3
          },
          {
            id: 'r6-s5-c2',
            text: 'Nervös sein aber sein Bestes geben',
            nextSceneId: 'r6-s6',
            points: 2
          },
          {
            id: 'r6-s5-c3',
            text: 'Die anderen anfeuern und unterstützen',
            nextSceneId: 'r6-s6',
            points: 2
          }
        ]
      },
      {
        id: 'r6-s6',
        text: 'Die Klasse gewinnt den ersten Preis! Aber wichtiger als der Sieg ist, was sie gelernt haben: Ihre Unterschiede sind keine Hindernisse, sondern ihre größte Stärke. In Luxemburg, wo so viele Kulturen zusammenkommen, liegt die Zukunft in der Einheit durch Vielfalt.',
        choices: [
          {
            id: 'r6-s6-c1',
            text: 'Gemeinsam feiern und die Freundschaft würdigen',
            nextSceneId: null,
            points: 3
          },
          {
            id: 'r6-s6-c2',
            text: 'Das Projekt in anderen Schulen präsentieren',
            nextSceneId: null,
            points: 3
          },
          {
            id: 'r6-s6-c3',
            text: 'Diese Erfahrung für immer im Herzen tragen',
            nextSceneId: null,
            points: 2
          }
        ]
      }
    ],
    completed: false
  }
];

export const rainbowActivities: ExtendedActivity[] = [
  {
    id: 'rainbow-activity-1',
    title: 'Kultureller Stammbaum',
    description: 'Erstelle deinen eigenen kulturellen Stammbaum mit allen Einflüssen in deinem Leben',
    islandId: ISLAND_ID,
    instructions: [
      'Zeichne einen großen Baum auf ein Papier',
      'In die Wurzeln schreibe die Herkunftsländer deiner Familie',
      'In den Stamm schreibe, wo du jetzt lebst',
      'In die Äste schreibe kulturelle Einflüsse: Sprachen, Traditionen, Essen, Musik',
      'Male Früchte daran: Das sind die Dinge, die du an deiner Vielfalt besonders magst',
      'Teile deinen Baum mit Freunden und vergleicht eure "Wälder"'
    ],
    completed: false
  },
  {
    id: 'rainbow-activity-2',
    title: 'Anti-Mobbing-Vertrag',
    description: 'Erstelle mit deinen Freunden einen Anti-Mobbing-Vertrag für eure Gruppe',
    islandId: ISLAND_ID,
    instructions: [
      'Versammle deine Freundesgruppe oder Klassenkameraden',
      'Diskutiert: Was ist Mobbing? Wie fühlt es sich an? Was sind die Folgen?',
      'Schreibt gemeinsam Regeln auf: z.B. "Wir greifen sofort ein, wenn jemand gemobbt wird"',
      'Alle unterschreiben den Vertrag',
      'Hängt ihn sichtbar auf oder macht ein Foto davon',
      'Haltet euch gegenseitig daran, diese Regeln zu befolgen'
    ],
    completed: false
  },
  {
    id: 'rainbow-activity-3',
    title: 'Sprachschatzkiste',
    description: 'Sammle Wörter in allen Sprachen, die du und deine Freunde sprechen',
    islandId: ISLAND_ID,
    instructions: [
      'Nimm eine Box oder ein großes Glas als "Schatzkiste"',
      'Schreibe auf kleine Zettel Wörter in verschiedenen Sprachen: z.B. "Freundschaft" auf Portugiesisch, Arabisch, Luxemburgisch usw.',
      'Sammle mindestens 20 verschiedene Wörter',
      'Füge hinzu, wie man sie ausspricht',
      'Ziehe jeden Tag ein Wort und lerne es',
      'Teile neue Wörter mit deinen Freunden und erweitere gemeinsam eure Schatzkiste'
    ],
    completed: false
  },
  {
    id: 'rainbow-activity-4',
    title: 'Barrierefreiheits-Detektiv',
    description: 'Untersuche deine Schule oder Nachbarschaft auf Barrierefreiheit',
    islandId: ISLAND_ID,
    instructions: [
      'Nimm eine Checkliste mit: Gibt es Rampen? Aufzüge? Lesbare Schilder? Breite Türen?',
      'Gehe mit offenen Augen durch deine Schule oder ein öffentliches Gebäude',
      'Notiere alle Barrieren, die du findest',
      'Überlege: Wer könnte Schwierigkeiten haben? (Rollstuhlfahrer, Blinde, Gehörlose, Ältere...)',
      'Erstelle einen Bericht mit Fotos und Verbesserungsvorschlägen',
      'Präsentiere deine Ergebnisse der Schulleitung oder einem Erwachsenen, der helfen kann'
    ],
    completed: false
  },
  {
    id: 'rainbow-activity-5',
    title: 'Regenbogen-Geschichten-Abend',
    description: 'Organisiere einen Abend, wo jeder eine Geschichte aus seiner Kultur teilt',
    islandId: ISLAND_ID,
    instructions: [
      'Lade Freunde aus verschiedenen Kulturen ein',
      'Jeder bereitet eine kurze Geschichte, ein Märchen oder eine Tradition aus seiner Kultur vor',
      'Bereitet auch kleine Snacks aus verschiedenen Ländern vor (mit Hilfe von Erwachsenen)',
      'Setzt euch in einem Kreis zusammen',
      'Jeder erzählt seine Geschichte – nutzt Bilder, Musik oder Gegenstände, um sie lebendig zu machen',
      'Sprecht darüber, was ihr gelernt habt und was euch verbindet'
    ],
    completed: false
  }
];

export const rainbowWisdomCards: WisdomCard[] = [
  {
    id: 'rainbow-wisdom-1',
    title: 'Vielfalt ist Stärke',
    content: 'Wenn Menschen mit unterschiedlichen Hintergründen zusammenarbeiten, entstehen die besten Ideen. In Luxemburg haben wir das Glück, viele Kulturen unter einem Dach zu vereinen.',
    islandId: ISLAND_ID,
    collected: false
  },
  {
    id: 'rainbow-wisdom-2',
    title: 'Schweigen ist Zustimmung',
    content: 'Wenn du bei Mobbing oder Diskriminierung schweigst, unterstützt du indirekt die Täter. Mut bedeutet, aufzustehen – auch wenn es unbequem ist.',
    islandId: ISLAND_ID,
    collected: false
  },
  {
    id: 'rainbow-wisdom-3',
    title: 'Mehrere Identitäten sind okay',
    content: 'Du musst dich nicht für eine Kultur entscheiden. Du kannst luxemburgisch UND portugiesisch sein, europäisch UND afrikanisch. Deine Vielfalt ist deine Superkraft.',
    islandId: ISLAND_ID,
    collected: false
  },
  {
    id: 'rainbow-wisdom-4',
    title: 'Barrierefreiheit hilft allen',
    content: 'Rampen helfen nicht nur Rollstuhlfahrern, sondern auch Eltern mit Kinderwagen. Einfache Sprache hilft nicht nur Lernschwachen, sondern macht Infos für alle zugänglicher. Inklusion bereichert die Gesellschaft.',
    islandId: ISLAND_ID,
    collected: false
  },
  {
    id: 'rainbow-wisdom-5',
    title: 'Neu sein ist mutig',
    content: 'In ein neues Land zu kommen, eine neue Sprache zu lernen und neu anzufangen erfordert enormen Mut. Zeige Respekt und Bewunderung für diese Leistung.',
    islandId: ISLAND_ID,
    collected: false
  },
  {
    id: 'rainbow-wisdom-6',
    title: 'Konflikte sind normal',
    content: 'Unterschiedliche Meinungen und Missverständnisse sind normal, wenn verschiedene Menschen zusammenkommen. Wichtig ist, respektvoll zu kommunizieren und Lösungen zu suchen.',
    islandId: ISLAND_ID,
    collected: false
  },
  {
    id: 'rainbow-wisdom-7',
    title: 'Sprache verbindet',
    content: 'In Luxemburg mehrere Sprachen zu sprechen ist normal und wertvoll. Jede Sprache öffnet Türen zu neuen Menschen und Perspektiven.',
    islandId: ISLAND_ID,
    collected: false
  },
  {
    id: 'rainbow-wisdom-8',
    title: 'Vorurteile hinterfragen',
    content: 'Jeder hat Vorurteile – das ist menschlich. Aber wir können lernen, sie zu erkennen und aktiv gegen sie anzugehen. Frage dich: Woher kommt dieses Urteil? Ist es fair?',
    islandId: ISLAND_ID,
    collected: false
  },
  {
    id: 'rainbow-wisdom-9',
    title: 'Empathie entwickeln',
    content: 'Versuche, die Welt durch die Augen anderer zu sehen. Wie fühlt es sich an, neu zu sein? Anders auszusehen? Eine Behinderung zu haben? Empathie ist der Schlüssel zu echtem Verständnis.',
    islandId: ISLAND_ID,
    collected: false
  },
  {
    id: 'rainbow-wisdom-10',
    title: 'Tradition und Moderne vereinen',
    content: 'Du kannst deine kulturellen Traditionen ehren und gleichzeitig modern und weltoffen sein. Das eine schließt das andere nicht aus.',
    islandId: ISLAND_ID,
    collected: false
  },
  {
    id: 'rainbow-wisdom-11',
    title: 'Aktiv werden',
    content: 'Toleranz reicht nicht – wir brauchen aktive Akzeptanz. Das bedeutet, proaktiv für Gerechtigkeit einzustehen und benachteiligte Gruppen zu unterstützen.',
    islandId: ISLAND_ID,
    collected: false
  },
  {
    id: 'rainbow-wisdom-12',
    title: 'Online und offline gelten dieselben Regeln',
    content: 'Was im Internet gemein ist, ist auch im echten Leben gemein. Cybermobbing ist nicht harmloser als "normales" Mobbing – manchmal ist es sogar schlimmer.',
    islandId: ISLAND_ID,
    collected: false
  },
  {
    id: 'rainbow-wisdom-13',
    title: 'Jeder hat eine Geschichte',
    content: 'Hinter jedem Menschen steckt eine einzigartige Geschichte mit Freuden, Kämpfen und Träumen. Nimm dir Zeit, diese Geschichten kennenzulernen.',
    islandId: ISLAND_ID,
    collected: false
  },
  {
    id: 'rainbow-wisdom-14',
    title: 'Du bist nicht allein',
    content: 'Egal, was du durchmachst – sei es Diskriminierung, Identitätskrisen oder das Gefühl, nicht dazuzugehören – es gibt andere, die Ähnliches erlebt haben. Suche Unterstützung und Gemeinschaft.',
    islandId: ISLAND_ID,
    collected: false
  },
  {
    id: 'rainbow-wisdom-15',
    title: 'Kleine Taten, große Wirkung',
    content: 'Du musst nicht die Welt retten. Ein freundliches Wort, jemanden in deine Gruppe einladen, bei Ungerechtigkeit aufstehen – diese kleinen Taten machen den Unterschied.',
    islandId: ISLAND_ID,
    collected: false
  },
  {
    id: 'rainbow-wisdom-16',
    title: 'Luxemburgs besondere Rolle',
    content: 'Luxemburg ist einzigartig: Ein kleines Land mit Menschen aus über 170 Nationen. Das ist eine Chance zu zeigen, dass Vielfalt funktioniert – wenn wir es richtig machen.',
    islandId: ISLAND_ID,
    collected: false
  }
];
