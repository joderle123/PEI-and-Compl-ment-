/* ============================================
   BauMeister - Educational Activities
   All 5 Baustellen x 3 Levels = 15 Activities
   CDSE Luxembourg
   ============================================ */

window.ActivitiesData = {

    // ====================================================
    // BAUSTELLE 1: GEFÜHLS-WERKSTATT (Emotions Workshop)
    // ====================================================
    gefuehl: {
        levels: [
            // ---- Level 1: Gefühle erkennen ----
            {
                title: 'Gefühle erkennen',
                subtitle: 'Welches Gefühl passt zur Situation?',
                type: 'matching',
                intro: 'Jeder Mensch hat Gefühle – und das ist gut so! Aber manchmal ist es gar nicht so einfach zu erkennen, was man gerade fühlt. In dieser Übung lernst du, Gefühle in verschiedenen Situationen zu erkennen.',
                items: [
                    {
                        situation: 'Du bekommst ein Geschenk, das du dir schon lange gewünscht hast.',
                        correctEmotion: 'Freude',
                        options: ['Freude', 'Traurigkeit', 'Wut', 'Angst'],
                    },
                    {
                        situation: 'Dein bester Freund sagt, er will nicht mehr mit dir spielen.',
                        correctEmotion: 'Traurigkeit',
                        options: ['Freude', 'Traurigkeit', 'Langeweile', 'Überraschung'],
                    },
                    {
                        situation: 'Jemand nimmt dir ohne zu fragen dein Pausenbrot weg.',
                        correctEmotion: 'Wut',
                        options: ['Angst', 'Freude', 'Wut', 'Scham'],
                    },
                    {
                        situation: 'Morgen schreibst du eine schwierige Klassenarbeit.',
                        correctEmotion: 'Angst/Nervosität',
                        options: ['Langeweile', 'Angst/Nervosität', 'Freude', 'Wut'],
                    },
                    {
                        situation: 'Du hast versehentlich die Vase deiner Mutter kaputtgemacht.',
                        correctEmotion: 'Schuld/Scham',
                        options: ['Freude', 'Eifersucht', 'Schuld/Scham', 'Langeweile'],
                    },
                    {
                        situation: 'Deine Klasse macht einen überraschenden Ausflug zum Schwimmbad!',
                        correctEmotion: 'Überraschung/Freude',
                        options: ['Wut', 'Traurigkeit', 'Überraschung/Freude', 'Angst'],
                    },
                ],
                successMessage: 'Super gemacht! Du kannst Gefühle gut erkennen. Das ist der erste Schritt, um gut mit ihnen umzugehen.',
                failMessage: 'Das war nicht ganz richtig, aber das ist okay! Gefühle zu erkennen braucht Übung. Versuch es nochmal!',
            },

            // ---- Level 2: Gefühle im Körper spüren ----
            {
                title: 'Gefühle im Körper',
                subtitle: 'Wie stark fühlst du das?',
                type: 'thermometer',
                intro: 'Gefühle zeigen sich nicht nur in unseren Gedanken, sondern auch in unserem Körper. Ein Kribbeln im Bauch, ein Kloß im Hals, warme Wangen... Wo spürst du deine Gefühle?',
                scenarios: [
                    {
                        text: 'Du stehst vor der ganzen Klasse und sollst ein Gedicht vortragen. Deine Hände sind feucht und dein Herz klopft schnell.',
                        emotion: 'Aufregung/Lampenfieber',
                        bodyHints: ['Herzklopfen', 'feuchte Hände', 'Schmetterlinge im Bauch', 'trockener Mund'],
                    },
                    {
                        text: 'Du hast gerade erfahren, dass dein Haustier beim Tierarzt ist. Du weißt nicht, ob es ihm gut geht.',
                        emotion: 'Sorge',
                        bodyHints: ['Enge in der Brust', 'Kloß im Hals', 'Unruhe', 'Bauchschmerzen'],
                    },
                    {
                        text: 'Dein Team hat gerade das Fußballturnier gewonnen! Alle jubeln und umarmen sich.',
                        emotion: 'Begeisterung',
                        bodyHints: ['Kribbeln', 'Energie', 'Lächeln', 'warmes Gefühl'],
                    },
                    {
                        text: 'Dein Bruder hat dein Lieblingsbuch kaputt gemacht und tut so, als wäre nichts passiert.',
                        emotion: 'Wut/Frustration',
                        bodyHints: ['Hitze', 'geballte Fäuste', 'Anspannung', 'schnelles Atmen'],
                    },
                ],
                successMessage: 'Toll! Du lernst, auf deinen Körper zu hören. Das hilft dir, Gefühle früh zu bemerken und besser damit umzugehen.',
            },

            // ---- Level 3: Gefühle regulieren ----
            {
                title: 'Gefühle regulieren',
                subtitle: 'Was kannst du tun, wenn Gefühle zu stark werden?',
                type: 'choice_scenarios',
                intro: 'Manchmal werden Gefühle so stark, dass sie uns überrollen. Das ist normal! Aber es gibt gute Strategien, die dir helfen können, wieder ruhiger zu werden.',
                scenarios: [
                    {
                        situation: 'Du bist richtig wütend, weil dein Mitschüler dich vor allen geärgert hat. Am liebsten würdest du zurückschlagen.',
                        question: 'Was wäre die beste Strategie?',
                        options: [
                            { text: 'Tief durchatmen und bis 10 zählen, bevor du reagierst.', correct: true },
                            { text: 'Sofort zurückschreien.', correct: false },
                            { text: 'So tun, als würde es dich nicht stören (alles runterschlucken).', correct: false },
                            { text: 'Einem Erwachsenen erzählen, wie du dich fühlst.', correct: true },
                        ],
                        explanation: 'Tief durchatmen gibt dir Zeit, bevor du handelst. Und es ist mutig und klug, einem Erwachsenen zu sagen, wie du dich fühlst. Gefühle runterschlucken hilft meistens nicht.',
                    },
                    {
                        situation: 'Du liegst abends im Bett und kannst nicht schlafen, weil du dir Sorgen um den nächsten Schultag machst.',
                        question: 'Was könnte dir helfen?',
                        options: [
                            { text: 'Stundenlang auf dein Handy schauen, um dich abzulenken.', correct: false },
                            { text: 'Eine ruhige Atemübung machen und an einen schönen Ort denken.', correct: true },
                            { text: 'Deine Sorgen aufschreiben oder jemandem davon erzählen.', correct: true },
                            { text: 'Dir sagen: "Du darfst keine Angst haben!"', correct: false },
                        ],
                        explanation: 'Atemübungen beruhigen deinen Körper. Sorgen aufschreiben hilft, sie loszulassen. Es ist okay, Angst zu haben – aber du kannst lernen, besser damit umzugehen.',
                    },
                    {
                        situation: 'Dein bester Freund hat dich bei einer Verabredung vergessen. Du bist traurig und enttäuscht.',
                        question: 'Wie kannst du gut mit diesem Gefühl umgehen?',
                        options: [
                            { text: 'Ihm eine böse Nachricht schreiben und die Freundschaft beenden.', correct: false },
                            { text: 'Ihm ruhig sagen: "Ich bin traurig, dass du mich vergessen hast."', correct: true },
                            { text: 'Etwas tun, das dir gut tut (Musik hören, malen, spazieren gehen).', correct: true },
                            { text: 'Es in dich reinfressen und so tun, als wäre alles okay.', correct: false },
                        ],
                        explanation: 'Es ist wichtig, über deine Gefühle zu sprechen – ruhig und ehrlich. Und sich selbst etwas Gutes zu tun, wenn man traurig ist, ist kein Zeichen von Schwäche, sondern von Stärke.',
                    },
                ],
                successMessage: 'Fantastisch! Du hast tolle Strategien gelernt, um mit starken Gefühlen umzugehen. Je öfter du sie übst, desto leichter wird es!',
            },
        ],
    },

    // ====================================================
    // BAUSTELLE 2: BRÜCKE DER FREUNDSCHAFT
    // ====================================================
    freundschaft: {
        levels: [
            // ---- Level 1: Empathie ----
            {
                title: 'In den Schuhen des anderen',
                subtitle: 'Wie fühlt sich der andere?',
                type: 'choice_scenarios',
                intro: 'Empathie bedeutet, sich in andere Menschen hineinzuversetzen. Wenn du verstehst, was andere fühlen, kannst du bessere Freundschaften aufbauen.',
                scenarios: [
                    {
                        situation: 'Lisa ist neu in der Klasse. In der Pause steht sie allein am Rand des Schulhofs und schaut den anderen beim Spielen zu.',
                        question: 'Wie fühlt sich Lisa wahrscheinlich?',
                        options: [
                            { text: 'Einsam und unsicher – sie kennt noch niemanden.', correct: true },
                            { text: 'Gelangweilt – sie hat keine Lust auf die anderen.', correct: false },
                            { text: 'Arrogant – sie denkt, sie ist besser als die anderen.', correct: false },
                            { text: 'Entspannt – sie genießt die Ruhe.', correct: false },
                        ],
                        explanation: 'Neue Situationen machen oft unsicher. Wenn jemand allein steht, ist ein freundliches "Möchtest du mitspielen?" oft genau das, was er oder sie braucht.',
                    },
                    {
                        situation: 'Tom hat sein Mittagessen vergessen. Er sitzt in der Kantine und schaut auf den Tisch, während alle anderen essen.',
                        question: 'Was wäre empathisch?',
                        options: [
                            { text: 'Nichts sagen – ist ja sein Problem.', correct: false },
                            { text: 'Ihm etwas von deinem Essen anbieten.', correct: true },
                            { text: 'Laut sagen: "Haha, du hast dein Essen vergessen!"', correct: false },
                            { text: 'Ihn fragen, ob du ihm helfen kannst.', correct: true },
                        ],
                        explanation: 'Empathie bedeutet, den anderen zu sehen und zu handeln. Manchmal reicht es schon, zu fragen: "Kann ich dir helfen?"',
                    },
                    {
                        situation: 'Marie hat beim Sportfest den letzten Platz gemacht. Sie versucht zu lächeln, aber ihre Augen sind feucht.',
                        question: 'Was wäre eine gute Reaktion?',
                        options: [
                            { text: '"Macht nichts, beim nächsten Mal wird es besser!" – und ihr die Hand geben.', correct: true },
                            { text: '"War ja klar, du bist halt nicht sportlich."', correct: false },
                            { text: 'So tun, als hättest du es nicht bemerkt.', correct: false },
                            { text: '"Hey, du hast dein Bestes gegeben – das zählt!"', correct: true },
                        ],
                        explanation: 'Jeder hat mal einen schlechten Tag. Ein aufmunterndes Wort kann einen riesigen Unterschied machen. Anerkennung für die Mühe ist wichtiger als das Ergebnis.',
                    },
                ],
                successMessage: 'Klasse! Du hast ein gutes Gespür für die Gefühle anderer. Das ist die Grundlage für echte Freundschaft!',
            },

            // ---- Level 2: Gute Freundschaft ----
            {
                title: 'Was macht Freundschaft aus?',
                subtitle: 'Sortiere: Was gehört zu guter Freundschaft?',
                type: 'sorting',
                intro: 'Echte Freundschaft ist wie ein Bauwerk – sie braucht ein gutes Fundament. Aber was gehört dazu und was nicht?',
                categories: [
                    { id: 'good', title: 'Gute Freundschaft', color: '#10b981' },
                    { id: 'bad', title: 'Keine gute Freundschaft', color: '#ef4444' },
                ],
                items: [
                    { text: 'Einander zuhören', correct: 'good' },
                    { text: 'Geheimnisse weitererzählen', correct: 'bad' },
                    { text: 'Ehrlich sein, auch wenn es schwierig ist', correct: 'good' },
                    { text: 'Jemanden ausgrenzen, um dazuzugehören', correct: 'bad' },
                    { text: 'Sich entschuldigen, wenn man Fehler macht', correct: 'good' },
                    { text: 'Dem anderen immer recht geben', correct: 'bad' },
                    { text: 'Den anderen so akzeptieren, wie er ist', correct: 'good' },
                    { text: 'Helfen, wenn der andere Hilfe braucht', correct: 'good' },
                    { text: 'Immer bestimmen wollen', correct: 'bad' },
                    { text: 'Kompromisse finden', correct: 'good' },
                    { text: 'Den anderen unter Druck setzen', correct: 'bad' },
                    { text: 'Sich gegenseitig Mut machen', correct: 'good' },
                ],
                successMessage: 'Super! Du weißt genau, was echte Freundschaft ausmacht. Eine Brücke der Freundschaft baut man gemeinsam!',
                failMessage: 'Schau nochmal genau hin – manche Dinge scheinen freundschaftlich, sind es aber nicht. Versuch es nochmal!',
            },

            // ---- Level 3: Konflikte lösen ----
            {
                title: 'Konflikte fair lösen',
                subtitle: 'Finde die beste Lösung!',
                type: 'choice_scenarios',
                intro: 'Streit gehört dazu – auch unter Freunden. Wichtig ist nicht, OB man streitet, sondern WIE man Konflikte löst. Hier lernst du faire Strategien.',
                scenarios: [
                    {
                        situation: 'Du und dein Freund wollt am Computer spielen, aber ihr könnt euch nicht einigen, welches Spiel.',
                        question: 'Was wäre die fairste Lösung?',
                        options: [
                            { text: 'Erst sein Spiel, dann deins – abwechseln.', correct: true },
                            { text: 'Lauter werden, bis er nachgibt.', correct: false },
                            { text: 'Beleidigt weggehen und gar nicht mehr spielen.', correct: false },
                            { text: 'Zusammen ein Spiel aussuchen, das beiden gefällt.', correct: true },
                        ],
                        explanation: 'Kompromisse und Abwechseln sind faire Lösungen. Manchmal findet man sogar etwas Neues, das beiden gefällt!',
                    },
                    {
                        situation: 'Deine Freundin hat über dich gelästert. Du bist verletzt und wütend.',
                        question: 'Wie gehst du am besten damit um?',
                        options: [
                            { text: 'Auch über sie lästern – Auge um Auge.', correct: false },
                            { text: 'Ihr unter vier Augen sagen, dass dich das verletzt hat.', correct: true },
                            { text: 'Sie komplett ignorieren und nie wieder mit ihr reden.', correct: false },
                            { text: 'Fragen, warum sie das gesagt hat – vielleicht gibt es ein Missverständnis.', correct: true },
                        ],
                        explanation: 'Ein offenes Gespräch unter vier Augen ist der mutigste und beste Weg. Oft stecken Missverständnisse hinter Konflikten.',
                    },
                    {
                        situation: 'In deiner Gruppe will niemand mit Mehmet arbeiten, nur weil er anders ist. Du findest das unfair.',
                        question: 'Was kannst du tun?',
                        options: [
                            { text: 'Dich freiwillig mit Mehmet zusammentun.', correct: true },
                            { text: 'Nichts sagen – du willst nicht auffallen.', correct: false },
                            { text: 'Der Gruppe sagen, dass Ausgrenzen nicht okay ist.', correct: true },
                            { text: 'Die Lehrerin informieren, wenn es nicht aufhört.', correct: true },
                        ],
                        explanation: 'Für andere einzustehen braucht Mut – aber genau das macht dich zu einem wahren Freund. Ausgrenzen ist nie okay, egal aus welchem Grund.',
                    },
                ],
                successMessage: 'Stark! Du weißt, wie man Konflikte fair löst. Das macht dich zu einem wertvollen Freund und Mitschüler!',
            },
        ],
    },

    // ====================================================
    // BAUSTELLE 3: TURM DER STÄRKE
    // ====================================================
    staerke: {
        levels: [
            // ---- Level 1: Stärken entdecken ----
            {
                title: 'Meine Stärken',
                subtitle: 'Was macht dich besonders?',
                type: 'strengths',
                intro: 'Jeder Mensch hat Stärken – auch du! Manchmal sehen wir sie nur nicht, weil wir zu sehr auf das schauen, was wir NICHT können. Wähle mindestens 5 Stärken aus, die zu dir passen.',
                strengths: [
                    'Ich bin hilfsbereit',
                    'Ich bin kreativ',
                    'Ich kann gut zuhören',
                    'Ich bin mutig',
                    'Ich bin lustig',
                    'Ich bin ehrlich',
                    'Ich bin geduldig',
                    'Ich kann gut zeichnen/malen',
                    'Ich bin sportlich',
                    'Ich bin neugierig',
                    'Ich bin ein guter Freund / eine gute Freundin',
                    'Ich bin gut in Mathe/Lesen/Schreiben',
                    'Ich kann gut mit Tieren umgehen',
                    'Ich bin freundlich',
                    'Ich kann gut Probleme lösen',
                    'Ich bin fair',
                    'Ich bin musikalisch',
                    'Ich lasse mich nicht so leicht aufgeben',
                    'Ich kann gut kochen/backen',
                    'Ich bin technisch begabt',
                ],
                minRequired: 5,
                successMessage: 'Siehst du, wie viele Stärken du hast? Jede davon ist wie ein Baustein für deinen Turm der Stärke! Und es gibt bestimmt noch mehr, die du entdecken wirst.',
            },

            // ---- Level 2: Negative Gedanken umwandeln ----
            {
                title: 'Gedanken-Umwandler',
                subtitle: 'Verwandle negative Gedanken in positive!',
                type: 'transform',
                intro: 'Manchmal haben wir negative Gedanken über uns selbst. Diese Gedanken sind oft nicht wahr! Hier lernst du, negative Gedanken in hilfreiche umzuwandeln.',
                transforms: [
                    {
                        negative: 'Ich bin dumm – ich kann das nicht.',
                        hint: 'Denke daran: Nicht können heißt nicht dumm sein. Es heißt: noch lernen.',
                        examples: ['Ich kann das NOCH nicht, aber ich kann es lernen.', 'Ich brauche vielleicht mehr Übung, und das ist okay.'],
                    },
                    {
                        negative: 'Niemand mag mich.',
                        hint: 'Stimmt das wirklich? Denke an Menschen, die dir wichtig sind.',
                        examples: ['Es gibt Menschen, die mich mögen – ich denke an ...', 'Nicht jeder muss mich mögen, aber ich bin liebenswert.'],
                    },
                    {
                        negative: 'Ich mache immer alles falsch.',
                        hint: 'Immer? Wirklich? Denk an Dinge, die du gut gemacht hast.',
                        examples: ['Manchmal mache ich Fehler, und daraus lerne ich.', 'Ich habe auch vieles richtig gemacht, zum Beispiel ...'],
                    },
                    {
                        negative: 'Die anderen sind alle besser als ich.',
                        hint: 'Jeder hat andere Stärken. Vergleichen hilft selten.',
                        examples: ['Jeder hat seine eigenen Stärken.', 'Ich bin auf meinem eigenen Weg und mache Fortschritte.'],
                    },
                ],
                successMessage: 'Großartig! Du bist ein echter Gedanken-Umwandler! Wenn dir das nächste Mal ein negativer Gedanke kommt, weißt du, wie du ihn verändern kannst.',
            },

            // ---- Level 3: Ziele setzen ----
            {
                title: 'Mein Ziele-Bauplan',
                subtitle: 'Setze dir Ziele – Schritt für Schritt!',
                type: 'goals',
                intro: 'Jedes große Bauwerk fängt mit einem Plan an. Genauso ist es mit deinen Zielen. Hier erstellst du deinen persönlichen Bauplan für die Zukunft.',
                goalLevels: [
                    {
                        label: 'Mein großer Traum',
                        placeholder: 'Was möchtest du eines Tages erreichen?',
                        hint: 'Denke groß! Z.B.: "Ich möchte Tierärztin werden" oder "Ich möchte ein Buch schreiben"',
                    },
                    {
                        label: 'Mein Ziel für dieses Jahr',
                        placeholder: 'Was möchtest du in den nächsten Monaten schaffen?',
                        hint: 'Z.B.: "Bessere Noten in Mathe" oder "Einen neuen Freund finden"',
                    },
                    {
                        label: 'Mein Ziel für diese Woche',
                        placeholder: 'Was kannst du JETZT tun?',
                        hint: 'Z.B.: "Jeden Tag 10 Minuten lesen" oder "Jemandem ein Kompliment machen"',
                    },
                ],
                successMessage: 'Super Bauplan! Du hast dein großes Ziel in kleine, machbare Schritte aufgeteilt. Denk daran: Jede Reise beginnt mit dem ersten Schritt!',
            },
        ],
    },

    // ====================================================
    // BAUSTELLE 4: HAUS DER WORTE
    // ====================================================
    worte: {
        levels: [
            // ---- Level 1: Ich-Botschaften ----
            {
                title: 'Ich-Botschaften',
                subtitle: 'Vom "Du bist..." zum "Ich fühle..."',
                type: 'transform_messages',
                intro: 'Wenn wir sagen "Du bist blöd!" oder "Du machst immer alles kaputt!", fühlt sich der andere angegriffen. Mit Ich-Botschaften kannst du sagen, was du fühlst, ohne den anderen zu verletzen.',
                formula: 'Ich fühle mich [Gefühl], wenn [Situation], weil [Grund]. Ich wünsche mir [Wunsch].',
                transforms: [
                    {
                        duMessage: 'Du nervst! Lass mich in Ruhe!',
                        situation: 'Dein Bruder stört dich beim Lernen',
                        correctParts: {
                            gefuehl: 'genervt',
                            situation: 'du mich beim Lernen störst',
                            grund: 'ich mich konzentrieren muss',
                            wunsch: 'dass du leiser bist, bis ich fertig bin',
                        },
                    },
                    {
                        duMessage: 'Du bist ein Lügner! Du hältst nie dein Versprechen!',
                        situation: 'Dein Freund hat versprochen zu helfen, ist aber nicht gekommen',
                        correctParts: {
                            gefuehl: 'enttäuscht',
                            situation: 'du nicht gekommen bist, obwohl du es versprochen hast',
                            grund: 'ich auf dich gezählt habe',
                            wunsch: 'dass du mir Bescheid sagst, wenn du nicht kannst',
                        },
                    },
                    {
                        duMessage: 'Du bist so gemein! Du lässt mich nie mitspielen!',
                        situation: 'Du wurdest beim Mannschaftswählen als Letztes gewählt',
                        correctParts: {
                            gefuehl: 'traurig und ausgegrenzt',
                            situation: 'ich als Letztes gewählt werde',
                            grund: 'ich auch gerne mitspielen möchte',
                            wunsch: 'dass ihr mich auch mal früher wählt',
                        },
                    },
                ],
                successMessage: 'Sehr gut! Mit Ich-Botschaften sagst du, was du fühlst, ohne den anderen anzugreifen. Das öffnet Türen statt sie zuzuschlagen!',
            },

            // ---- Level 2: Aktives Zuhören ----
            {
                title: 'Aktives Zuhören',
                subtitle: 'Was macht einen guten Zuhörer aus?',
                type: 'sorting',
                intro: 'Zuhören ist mehr als nur schweigen! Aktives Zuhören bedeutet, dem anderen zu zeigen, dass du wirklich verstehst, was er sagt und fühlt.',
                categories: [
                    { id: 'good', title: 'Gutes Zuhören', color: '#10b981' },
                    { id: 'bad', title: 'Schlechtes Zuhören', color: '#ef4444' },
                ],
                items: [
                    { text: 'Den anderen ausreden lassen', correct: 'good' },
                    { text: 'Auf das Handy schauen, während jemand spricht', correct: 'bad' },
                    { text: 'Nachfragen: "Wie meinst du das?"', correct: 'good' },
                    { text: 'Mit den Augen rollen', correct: 'bad' },
                    { text: 'Nicken und Blickkontakt halten', correct: 'good' },
                    { text: 'Sofort von eigenen Problemen erzählen', correct: 'bad' },
                    { text: 'In eigenen Worten wiederholen, was der andere gesagt hat', correct: 'good' },
                    { text: '"Das ist doch nicht schlimm" sagen', correct: 'bad' },
                    { text: 'Unterbrechen und eigene Meinung sagen', correct: 'bad' },
                    { text: 'Sagen: "Ich verstehe, dass dich das beschäftigt"', correct: 'good' },
                    { text: 'Ratschläge geben, ohne gefragt zu werden', correct: 'bad' },
                    { text: 'Offene Fragen stellen', correct: 'good' },
                ],
                successMessage: 'Prima! Echtes Zuhören ist ein Geschenk an den anderen. Es zeigt: "Du bist mir wichtig, und was du sagst, zählt."',
                failMessage: 'Manche Punkte sind tricky! Denk daran: Gutes Zuhören bedeutet, den anderen zu verstehen – nicht sofort zu reagieren.',
            },

            // ---- Level 3: Hilfe holen ----
            {
                title: 'Hilfe holen ist stark!',
                subtitle: 'Wann und bei wem kann ich Hilfe suchen?',
                type: 'choice_scenarios',
                intro: 'Hilfe zu holen ist kein Zeichen von Schwäche – es ist ein Zeichen von Stärke und Klugheit! Aber manchmal wissen wir nicht, wann und bei wem wir Hilfe suchen sollen.',
                scenarios: [
                    {
                        situation: 'Du wirst seit Wochen von Mitschülern gemobbt. Sie nehmen dir Sachen weg und beleidigen dich. Du hast Angst, in die Schule zu gehen.',
                        question: 'Bei wem solltest du Hilfe holen?',
                        options: [
                            { text: 'Bei einer Vertrauensperson (Eltern, Lehrer, Schulsozialarbeiter)', correct: true },
                            { text: 'Bei niemandem – das muss ich alleine durchstehen.', correct: false },
                            { text: 'Beim Kinder- und Jugendtelefon (116 111)', correct: true },
                            { text: 'Nur bei Freunden – Erwachsene verstehen das nicht.', correct: false },
                        ],
                        explanation: 'Mobbing ist NIEMALS deine Schuld! Du hast das Recht auf Hilfe. Erwachsene können Dinge verändern, die du alleine nicht ändern kannst.',
                    },
                    {
                        situation: 'Du verstehst den Unterrichtsstoff in Mathe überhaupt nicht mehr und traust dich nicht, zu fragen.',
                        question: 'Was wäre klug?',
                        options: [
                            { text: 'Den Lehrer nach dem Unterricht fragen – die meisten helfen gerne.', correct: true },
                            { text: 'Nichts sagen – ich will nicht dumm aussehen.', correct: false },
                            { text: 'Einen Mitschüler um Erklärung bitten.', correct: true },
                            { text: 'Nachhilfe oder zusätzliche Hilfe anfragen.', correct: true },
                        ],
                        explanation: 'Fragen ist klug, nicht dumm! Jeder hat mal etwas nicht verstanden. Lehrer und Mitschüler helfen meistens gerne.',
                    },
                    {
                        situation: 'Ein Freund erzählt dir, dass er sich selbst verletzt. Er bittet dich, es niemandem zu sagen.',
                        question: 'Was solltest du tun?',
                        options: [
                            { text: 'Das Versprechen halten und es für dich behalten.', correct: false },
                            { text: 'Einem Erwachsenen erzählen, dem du vertraust – auch wenn dein Freund das nicht will.', correct: true },
                            { text: 'Deinem Freund sagen, dass du dir Sorgen machst und ihm helfen willst.', correct: true },
                            { text: 'So tun, als hättest du es nicht gehört.', correct: false },
                        ],
                        explanation: 'Wenn jemand in Gefahr ist, ist Hilfe holen wichtiger als ein Versprechen. Das ist echte Freundschaft – auch wenn es sich schwer anfühlt.',
                    },
                ],
                successMessage: 'Toll! Du weißt, wann und wo du Hilfe holen kannst. Das ist eine der wichtigsten Stärken, die du haben kannst!',
            },
        ],
    },

    // ====================================================
    // BAUSTELLE 5: GARTEN DER RUHE
    // ====================================================
    ruhe: {
        levels: [
            // ---- Level 1: Atemübungen ----
            {
                title: 'Atempause',
                subtitle: 'Dein Körper kann dir helfen, ruhig zu werden',
                type: 'breathing',
                intro: 'Dein Atem ist ein mächtiges Werkzeug! Wenn du aufgeregt, wütend oder ängstlich bist, kann eine bewusste Atemübung dich schnell beruhigen. Probiere es aus!',
                exercise: {
                    name: '4-4-4 Atmung',
                    description: 'Atme 4 Sekunden ein, halte 4 Sekunden, atme 4 Sekunden aus.',
                    inhaleTime: 4,
                    holdTime: 4,
                    exhaleTime: 4,
                    cycles: 4,
                },
                successMessage: 'Wunderbar! Hast du gemerkt, wie sich dein Körper beruhigt hat? Diese Übung kannst du überall machen – in der Schule, zu Hause, oder bevor du einschläfst.',
            },

            // ---- Level 2: Mein sicherer Ort ----
            {
                title: 'Mein sicherer Ort',
                subtitle: 'Erschaffe deinen inneren Ruheplatz',
                type: 'safe_place',
                intro: 'Jeder Mensch braucht einen Ort, an dem er sich sicher fühlt. Dieser Ort kann auch in deiner Vorstellung existieren! Beschreibe deinen sicheren Ort.',
                prompts: [
                    {
                        question: 'Wo ist dein sicherer Ort? (z.B. am Strand, im Wald, in deinem Zimmer, auf einer Wolke...)',
                        placeholder: 'Mein sicherer Ort ist...',
                    },
                    {
                        question: 'Was siehst du dort?',
                        placeholder: 'Ich sehe...',
                    },
                    {
                        question: 'Was hörst du dort?',
                        placeholder: 'Ich höre...',
                    },
                    {
                        question: 'Wie fühlt es sich an?',
                        placeholder: 'Es fühlt sich an wie...',
                    },
                    {
                        question: 'Wer darf an deinen sicheren Ort kommen?',
                        placeholder: 'An meinem sicheren Ort sind...',
                    },
                ],
                successMessage: 'Dein sicherer Ort ist jetzt in deiner Vorstellung! Immer wenn du dich überfordert oder unsicher fühlst, kannst du die Augen schließen und dorthin reisen.',
            },

            // ---- Level 3: Notfallkoffer ----
            {
                title: 'Mein Notfallkoffer',
                subtitle: 'Dein persönliches Beruhigungs-Kit',
                type: 'emergency_kit',
                intro: 'Stell dir vor, du hast einen unsichtbaren Koffer voller Strategien, die dir helfen, wenn die Gefühle zu groß werden. Wähle die Strategien aus, die dir am besten helfen könnten!',
                categories: [
                    {
                        name: 'Für den Körper',
                        icon: '\u{1F3C3}',
                        strategies: [
                            'Tief durchatmen (4-4-4)',
                            'Spazieren gehen',
                            'Sport machen / dich bewegen',
                            'Kaltes Wasser über die Hände laufen lassen',
                            'Etwas Weiches anfassen (Kuscheltier, Kissen)',
                            'Dich strecken und dehnen',
                        ],
                    },
                    {
                        name: 'Für den Kopf',
                        icon: '\u{1F9E0}',
                        strategies: [
                            'Bis 10 zählen, bevor du reagierst',
                            'An deinen sicheren Ort denken',
                            'Negative Gedanken umwandeln',
                            '5 Dinge aufzählen, die du siehst (Grounding)',
                            'Dir sagen: "Das geht vorbei"',
                            'Aufschreiben, was dich beschäftigt',
                        ],
                    },
                    {
                        name: 'Für die Seele',
                        icon: '\u2764',
                        strategies: [
                            'Mit jemandem reden, dem du vertraust',
                            'Musik hören, die dir gut tut',
                            'Malen, zeichnen oder basteln',
                            'In der Natur sein',
                            'Etwas Lustiges anschauen',
                            'Ein Tagebuch schreiben',
                        ],
                    },
                ],
                minPerCategory: 2,
                successMessage: 'Dein Notfallkoffer ist gepackt! Denk daran: Du hast diese Strategien immer dabei. Wenn es dir schlecht geht, öffne deinen Koffer und probiere eine aus!',
            },
        ],
    },
};
