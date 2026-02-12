import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../stores/gameStore';
import type { GameScreen } from '../../types';

// ---------------------------------------------------------------------------
// Helper – seeded random for deterministic layouts across renders
// ---------------------------------------------------------------------------

const seededRandom = (seed: number): number => {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
};

// ---------------------------------------------------------------------------
// Rune glyphs used as decorative background symbols
// ---------------------------------------------------------------------------

const RUNE_GLYPHS = [
  '\u16A0', '\u16A2', '\u16A6', '\u16B1', '\u16B7', '\u16BA',
  '\u16BE', '\u16C1', '\u16C7', '\u16C9', '\u16CB', '\u16CF',
  '\u16D2', '\u16D6', '\u16DA', '\u16DC', '\u16DE',
];

// ---------------------------------------------------------------------------
// Prologue pages – the story of the Seelentaucher
// ---------------------------------------------------------------------------

interface ProloguePage {
  emoji: string;
  title: string;
  paragraphs: string[];
  hint?: string;
  bgAccent: string;
}

const PROLOGUE_PAGES: ProloguePage[] = [
  {
    emoji: '\u{2728}',
    title: 'Es begann mit einem Traum...',
    paragraphs: [
      'Letzte Nacht hattest du einen seltsamen Traum. Du standest am Rand eines endlosen Ozeans, und vor dir tauchten acht leuchtende Inseln aus dem Nebel auf \u2013 jede in einer anderen Farbe, jede mit einem eigenen Herzschlag.',
      'Eine Stimme fl\u00FCsterte: "Du bist ausgew\u00E4hlt worden. Nicht wegen deiner St\u00E4rke oder deines Wissens \u2013 sondern weil du f\u00FChlen kannst, was andere f\u00FChlen."',
      'Als du aufgewacht bist, war da ein goldener Kompass in deiner Hand. Er war warm, und seine Nadel zeigte nicht nach Norden \u2013 sie zeigte nach innen.',
    ],
    bgAccent: 'rgba(108,92,231,0.15)',
  },
  {
    emoji: '\u{1F30A}',
    title: 'Die Inneren Welten',
    paragraphs: [
      'Die Inneren Welten sind ein verborgener Archipel \u2013 acht magische Inseln, die in einer Dimension jenseits unserer existieren. Jede Insel verk\u00F6rpert ein m\u00E4chtiges Gef\u00FChl, das jeder Mensch kennt: Wut, Trauer, Angst, Selbstzweifel, aber auch Liebe, Stille, Vielfalt und Heimat.',
      'Fr\u00FCher lebten die Inseln in Harmonie. Doch ein dunkler Nebel \u2013 der "Schatten der Stille" \u2013 hat sich \u00FCber den Archipel gelegt. Die Bewohner der Inseln haben vergessen, wie man mit seinen Gef\u00FChlen umgeht. Sie sind einsam, verwirrt und stecken in Konflikten fest.',
      'Nur ein Seelentaucher kann den Nebel l\u00FCften.',
    ],
    bgAccent: 'rgba(74,144,217,0.12)',
  },
  {
    emoji: '\u{1F9ED}',
    title: 'Deine Mission als Seelentaucher',
    paragraphs: [
      'Ein Seelentaucher ist jemand mit einer seltenen Gabe: Du kannst in die Gef\u00FChlswelt anderer eintauchen, ihre Perspektive verstehen und ihnen helfen, sich selbst besser kennenzulernen.',
      'Auf jeder Insel wirst du Bewohner treffen, die mit einem bestimmten Gef\u00FChl k\u00E4mpfen. Deine Aufgabe ist es nicht, ihre Probleme zu l\u00F6sen \u2013 sondern ihnen zuzuh\u00F6ren, die richtigen Fragen zu stellen und gemeinsam R\u00E4tsel zu entschl\u00FCsseln, die unter der Oberfl\u00E4che verborgen liegen.',
      'Jede Entscheidung, die du triffst, ver\u00E4ndert die Geschichte. Es gibt kein "richtig" oder "falsch" \u2013 nur tieferes Verstehen.',
    ],
    bgAccent: 'rgba(201,168,76,0.1)',
  },
  {
    emoji: '\u{1F3DD}\u{FE0F}',
    title: 'Die acht Inseln',
    paragraphs: [
      '\u{1F30B} Die Vulkaninsel brodelt vor unterdr\u00FCckter Wut. Ash, ein Junge der st\u00E4ndig explodiert, braucht deine Hilfe, den Vulkan in sich zu verstehen.',
      '\u{1F30A} Die Ozeaninsel birgt tiefe Trauer. Unter den Wellen verbergen sich Erinnerungen, die losgelassen werden wollen.',
      '\u{1F332} Die Waldinsel ist in Dunkelheit geh\u00FCllt. Hier lauert die Angst \u2013 aber auch der Mut, ihr ins Auge zu blicken.',
      '\u26F0\uFE0F Auf der Berginsel lernst du, dich selbst zu sch\u00E4tzen \u2013 auch wenn die Stimmen in deinem Kopf etwas anderes sagen.',
      '\u{1F338} \u{1F319} \u{1F308} \u{1F3E0} Und vier weitere Inseln warten darauf, von dir entdeckt zu werden...',
    ],
    bgAccent: 'rgba(255,107,53,0.08)',
  },
  {
    emoji: '\u{1F31F}',
    title: 'Wie deine Reise funktioniert',
    paragraphs: [
      'Jede Insel hat ein Geheimnis \u2013 ein R\u00E4tsel, das du Schritt f\u00FCr Schritt l\u00F6st. Am Anfang siehst du nur den Eingang. Erst wenn du das erste Kapitel meisterst, \u00F6ffnen sich neue Wege, neue Orte und neue Begegnungen.',
      'Du sammelst Weisheitskarten, die wichtige Erkenntnisse \u00FCber Gef\u00FChle und den Umgang miteinander festhalten. Dein Begleiter \u2013 ein magisches Tier, das du gleich w\u00E4hlen wirst \u2013 steht dir mit Rat und Trost zur Seite.',
      'Zwischen den Abenteuern f\u00FChrst du ein Tagebuch, machst Atem\u00FCbungen und spielst Mini-Spiele, die dein Wissen vertiefen. All das passiert in deinem eigenen Tempo.',
    ],
    bgAccent: 'rgba(108,92,231,0.1)',
  },
  {
    emoji: '\u{1F4AB}',
    title: 'Drei Superkr\u00E4fte',
    paragraphs: [
      'Als Seelentaucher entwickelst du drei besondere F\u00E4higkeiten:',
      '\u{2764}\u{FE0F} Empathie \u2013 die Kraft, Gef\u00FChle anderer nachzuempfinden, ohne dich darin zu verlieren. Je besser du zuh\u00F6rst, desto st\u00E4rker wird sie.',
      '\u{1F4A1} Einsicht \u2013 die F\u00E4higkeit, unter die Oberfl\u00E4che zu schauen und zu verstehen, warum Menschen so handeln, wie sie handeln.',
      '\u{1F525} Mut \u2013 die St\u00E4rke, schwierige Gespr\u00E4che zu f\u00FChren, f\u00FCr andere einzustehen und dich deinen eigenen \u00C4ngsten zu stellen.',
      'Diese drei Kr\u00E4fte wachsen mit jeder Entscheidung, die du triffst. Am Ende deiner Reise wirst du nicht nur den Bewohnern der Inseln geholfen haben \u2013 du wirst auch dich selbst besser kennen.',
    ],
    bgAccent: 'rgba(244,143,177,0.1)',
  },
];

// ---------------------------------------------------------------------------
// Background – shared across all pages
// ---------------------------------------------------------------------------

function PrologueBackground({
  stars,
  embers,
  runes,
  accentColor,
}: {
  stars: { id: number; top: string; left: string; size: number; duration: number; delay: number }[];
  embers: { id: number; left: string; bottom: string; size: number; duration: number; delay: number }[];
  runes: { id: number; glyph: string; top: string; left: string; size: number; opacity: number; duration: number; delay: number; rotation: number }[];
  accentColor: string;
}) {
  return (
    <>
      {stars.map((s) => (
        <div
          key={`star-${s.id}`}
          className="star"
          style={{
            top: s.top,
            left: s.left,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
      {embers.map((e) => (
        <div
          key={`ember-${e.id}`}
          className="ember"
          style={{
            left: e.left,
            bottom: e.bottom,
            width: `${e.size}px`,
            height: `${e.size}px`,
            animationDuration: `${e.duration}s`,
            animationDelay: `${e.delay}s`,
          }}
        />
      ))}
      {runes.map((r) => (
        <motion.span
          key={`rune-${r.id}`}
          className="absolute select-none pointer-events-none"
          style={{
            top: r.top,
            left: r.left,
            fontSize: `${r.size}px`,
            color: `rgba(201,168,76,${r.opacity})`,
            transform: `rotate(${r.rotation}deg)`,
            fontFamily: 'serif',
          }}
          animate={{ opacity: [r.opacity * 0.5, r.opacity, r.opacity * 0.5] }}
          transition={{
            duration: r.duration,
            delay: r.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {r.glyph}
        </motion.span>
      ))}
      <div className="fog-layer" style={{ opacity: 0.6 }} />
      <div className="fog-layer" style={{ animationDelay: '-8s', animationDuration: '28s', opacity: 0.4 }} />
      <div className="fog-layer" style={{ animationDelay: '-15s', animationDuration: '35s', opacity: 0.3 }} />
      <div className="vignette absolute inset-0 z-10" />
      <div
        className="absolute pointer-events-none"
        style={{
          width: '600px',
          height: '600px',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -55%)',
          background: `radial-gradient(circle, ${accentColor} 0%, rgba(108,92,231,0.04) 40%, transparent 70%)`,
          filter: 'blur(40px)',
        }}
      />
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: '500px',
          height: '500px',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -55%)',
          background: `conic-gradient(
            from 0deg,
            transparent 0deg,
            rgba(201,168,76,0.03) 15deg,
            transparent 30deg,
            transparent 90deg,
            rgba(201,168,76,0.03) 105deg,
            transparent 120deg,
            transparent 180deg,
            rgba(201,168,76,0.03) 195deg,
            transparent 210deg,
            transparent 270deg,
            rgba(201,168,76,0.03) 285deg,
            transparent 300deg,
            transparent 360deg
          )`,
          filter: 'blur(20px)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      />
    </>
  );
}

// ---------------------------------------------------------------------------
// Title screen (page 0 before prologue)
// ---------------------------------------------------------------------------

function TitleScreen({ onStart }: { onStart: () => void }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.18, delayChildren: 0.6 },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: 'easeOut' as const } },
  };

  return (
    <motion.div
      className="relative z-20 flex flex-col items-center text-center px-6 max-w-lg"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        variants={itemVariants}
        className="mb-4 select-none pointer-events-none"
        style={{ color: 'rgba(201,168,76,0.5)', fontSize: '14px', letterSpacing: '0.6em' }}
      >
        &#9670;&ensp;&#9671;&ensp;&#9670;&ensp;&#9671;&ensp;&#9670;
      </motion.div>

      <motion.h1
        variants={itemVariants}
        className="font-title text-golden animate-golden-glow"
        style={{
          fontSize: 'clamp(2.8rem, 8vw, 4.5rem)',
          fontWeight: 700,
          letterSpacing: '0.14em',
          lineHeight: 1.1,
          filter: 'drop-shadow(0 0 30px rgba(201,168,76,0.3))',
        }}
      >
        INNER WORLDS
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className="font-title"
        style={{
          marginTop: '0.75rem',
          fontSize: 'clamp(1rem, 3vw, 1.35rem)',
          color: '#e8d5a3',
          letterSpacing: '0.18em',
          textShadow: '0 0 20px rgba(232,168,56,0.35), 0 0 40px rgba(232,168,56,0.12)',
        }}
      >
        Die Reise des Seelentauchers
      </motion.p>

      <motion.div
        variants={itemVariants}
        className="flex items-center gap-3 mt-6"
        style={{ width: '100%', maxWidth: '320px' }}
      >
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.6), rgba(201,168,76,0.3))' }} />
        <span style={{ color: 'rgba(201,168,76,0.7)', fontSize: '6px' }}>&#9670;</span>
        <span style={{ color: 'rgba(201,168,76,0.9)', fontSize: '10px' }}>&#9670;</span>
        <span style={{ color: 'rgba(201,168,76,0.7)', fontSize: '6px' }}>&#9670;</span>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(270deg, transparent, rgba(201,168,76,0.6), rgba(201,168,76,0.3))' }} />
      </motion.div>

      <motion.p
        variants={itemVariants}
        style={{
          marginTop: '1.5rem',
          fontSize: 'clamp(0.9rem, 2.5vw, 1.05rem)',
          color: '#e8e0d0',
          lineHeight: 1.75,
          maxWidth: '420px',
          textShadow: '0 1px 4px rgba(0,0,0,0.5)',
        }}
      >
        Tief in dir schlummert eine besondere Kraft. Eine Kraft, die es dir erlaubt,
        die Gef{'\u00FC'}hle anderer zu sp{'\u00FC'}ren, verborgene Geschichten zu entdecken
        und R{'\u00E4'}tsel zu l{'\u00F6'}sen, die nur mit dem Herzen gel{'\u00F6'}st werden k{'\u00F6'}nnen.
        <br /><br />
        <strong style={{ color: '#f0c674' }}>Acht magische Inseln</strong> warten auf dich.
        Jede hat ein Geheimnis. Jede braucht einen Helden.
      </motion.p>

      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-4 w-full mt-10"
        style={{ maxWidth: '340px' }}
      >
        <motion.button
          onClick={onStart}
          className="glass-panel ornate-border cursor-pointer"
          style={{
            width: '100%',
            padding: '1rem 2rem',
            borderRadius: '12px',
            borderColor: 'rgba(201,168,76,0.5)',
            color: '#f0c674',
            fontFamily: 'var(--font-title)',
            fontSize: '1.05rem',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textShadow: '0 0 12px rgba(232,168,56,0.3)',
            transition: 'all 0.3s ease',
          }}
          whileHover={{
            scale: 1.03,
            boxShadow: '0 0 20px rgba(201,168,76,0.25), 0 0 40px rgba(201,168,76,0.1), inset 0 0 20px rgba(201,168,76,0.05)',
            borderColor: 'rgba(201,168,76,0.8)',
          }}
          whileTap={{ scale: 0.97 }}
        >
          Geschichte erfahren
        </motion.button>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="mt-8 select-none pointer-events-none"
        style={{ color: 'rgba(201,168,76,0.3)', fontSize: '10px', letterSpacing: '0.5em' }}
      >
        &#9671;&ensp;&#9670;&ensp;&#9671;
      </motion.div>

      <motion.p
        variants={itemVariants}
        className="font-title"
        style={{
          marginTop: '0.5rem',
          fontSize: '0.65rem',
          color: 'rgba(201,168,76,0.25)',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
        }}
      >
        Social-Emotional Learning
      </motion.p>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Prologue page component
// ---------------------------------------------------------------------------

function ProloguePageView({
  page,
  pageIndex,
  totalPages,
  onNext,
  onSkip,
}: {
  page: ProloguePage;
  pageIndex: number;
  totalPages: number;
  onNext: () => void;
  onSkip: () => void;
}) {
  return (
    <motion.div
      key={`page-${pageIndex}`}
      className="relative z-20 flex flex-col items-center text-center px-6 max-w-xl w-full"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Progress dots */}
      <div className="flex gap-2 mb-8">
        {Array.from({ length: totalPages }, (_, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-500"
            style={{
              width: i === pageIndex ? '24px' : '8px',
              height: '8px',
              background: i === pageIndex
                ? 'linear-gradient(90deg, #ffd700, #ffa500)'
                : i < pageIndex
                  ? 'rgba(201,168,76,0.5)'
                  : 'rgba(201,168,76,0.15)',
              boxShadow: i === pageIndex ? '0 0 10px rgba(255,215,0,0.4)' : 'none',
            }}
          />
        ))}
      </div>

      {/* Emoji */}
      <motion.div
        className="text-6xl mb-4 select-none"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, type: 'spring', bounce: 0.3 }}
        style={{ filter: 'drop-shadow(0 0 20px rgba(201,168,76,0.3))' }}
      >
        {page.emoji}
      </motion.div>

      {/* Title */}
      <motion.h2
        className="font-title"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        style={{
          fontSize: 'clamp(1.4rem, 5vw, 2rem)',
          fontWeight: 700,
          color: '#ffd700',
          letterSpacing: '0.08em',
          textShadow: '0 0 20px rgba(255,215,0,0.3), 0 0 40px rgba(255,215,0,0.1)',
          marginBottom: '1.2rem',
        }}
      >
        {page.title}
      </motion.h2>

      {/* Golden divider */}
      <motion.div
        className="flex items-center gap-3 mb-6"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        style={{ width: '200px' }}
      >
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.5))' }} />
        <span style={{ color: 'rgba(201,168,76,0.7)', fontSize: '6px' }}>&#9670;</span>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(270deg, transparent, rgba(201,168,76,0.5))' }} />
      </motion.div>

      {/* Text content – scrollable if needed */}
      <div
        className="overflow-y-auto max-h-[45vh] pr-2"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(201,168,76,0.3) transparent',
        }}
      >
        {page.paragraphs.map((p, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 + i * 0.15 }}
            style={{
              fontSize: 'clamp(0.88rem, 2.3vw, 1rem)',
              color: '#e8e0d0',
              lineHeight: 1.8,
              marginBottom: '0.9rem',
              textShadow: '0 1px 4px rgba(0,0,0,0.5)',
              textAlign: 'left',
            }}
          >
            {p}
          </motion.p>
        ))}
      </div>

      {/* Navigation buttons */}
      <motion.div
        className="flex gap-4 mt-8 w-full justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <motion.button
          onClick={onSkip}
          className="glass-panel cursor-pointer"
          style={{
            padding: '0.7rem 1.4rem',
            borderRadius: '10px',
            borderColor: 'rgba(201,168,76,0.15)',
            color: 'rgba(232,213,163,0.5)',
            fontFamily: 'var(--font-title)',
            fontSize: '0.85rem',
            fontWeight: 500,
            letterSpacing: '0.08em',
            transition: 'all 0.3s ease',
          }}
          whileHover={{
            scale: 1.03,
            borderColor: 'rgba(201,168,76,0.4)',
            color: 'rgba(232,213,163,0.8)',
          }}
          whileTap={{ scale: 0.97 }}
        >
          {'\u00DC'}berspringen
        </motion.button>

        <motion.button
          onClick={onNext}
          className="glass-panel ornate-border cursor-pointer"
          style={{
            padding: '0.7rem 2rem',
            borderRadius: '10px',
            borderColor: 'rgba(201,168,76,0.5)',
            color: '#f0c674',
            fontFamily: 'var(--font-title)',
            fontSize: '0.95rem',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textShadow: '0 0 12px rgba(232,168,56,0.3)',
            transition: 'all 0.3s ease',
          }}
          whileHover={{
            scale: 1.03,
            boxShadow: '0 0 20px rgba(201,168,76,0.25), 0 0 40px rgba(201,168,76,0.1)',
            borderColor: 'rgba(201,168,76,0.8)',
          }}
          whileTap={{ scale: 0.97 }}
        >
          {pageIndex < totalPages - 1 ? 'Weiter' : 'Bereit? Los geht\u2019s!'}
        </motion.button>
      </motion.div>

      {/* Page counter */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1 }}
        className="mt-4 font-title"
        style={{ fontSize: '0.7rem', color: 'rgba(201,168,76,0.4)', letterSpacing: '0.15em' }}
      >
        {pageIndex + 1} / {totalPages}
      </motion.p>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// WelcomeScreen – main export
// ---------------------------------------------------------------------------

const WelcomeScreen = () => {
  const { onboardingComplete, setScreen } = useGameStore();
  // -1 = title screen, 0..N = prologue pages
  const [currentPage, setCurrentPage] = useState(-1);

  const handleNewJourney = useCallback(() => {
    setCurrentPage(0);
  }, []);

  const handleContinue = useCallback(() => {
    setScreen('mood-checkin' as GameScreen);
  }, [setScreen]);

  const handleNextPage = useCallback(() => {
    if (currentPage < PROLOGUE_PAGES.length - 1) {
      setCurrentPage((p) => p + 1);
    } else {
      setScreen('onboarding-avatar' as GameScreen);
    }
  }, [currentPage, setScreen]);

  const handleSkipPrologue = useCallback(() => {
    setScreen('onboarding-avatar' as GameScreen);
  }, [setScreen]);

  // -------------------------------------------------------------------------
  // Memoised procedural elements
  // -------------------------------------------------------------------------

  const stars = useMemo(
    () =>
      Array.from({ length: 35 }, (_, i) => ({
        id: i,
        top: `${seededRandom(i * 3 + 1) * 92 + 2}%`,
        left: `${seededRandom(i * 3 + 2) * 96 + 2}%`,
        size: seededRandom(i * 3 + 3) * 2 + 1,
        duration: seededRandom(i * 7 + 5) * 3 + 2,
        delay: seededRandom(i * 7 + 9) * 5,
      })),
    [],
  );

  const embers = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: `${seededRandom(i * 5 + 100) * 90 + 5}%`,
        bottom: `${seededRandom(i * 5 + 101) * -10}%`,
        size: seededRandom(i * 5 + 102) * 3 + 2,
        duration: seededRandom(i * 5 + 103) * 6 + 6,
        delay: seededRandom(i * 5 + 104) * 8,
      })),
    [],
  );

  const runes = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        glyph: RUNE_GLYPHS[i % RUNE_GLYPHS.length],
        top: `${seededRandom(i * 11 + 200) * 85 + 5}%`,
        left: `${seededRandom(i * 11 + 201) * 90 + 5}%`,
        size: seededRandom(i * 11 + 202) * 16 + 12,
        opacity: seededRandom(i * 11 + 203) * 0.12 + 0.04,
        duration: seededRandom(i * 11 + 204) * 5 + 4,
        delay: seededRandom(i * 11 + 205) * 6,
        rotation: seededRandom(i * 11 + 206) * 40 - 20,
      })),
    [],
  );

  const accentColor = currentPage >= 0
    ? PROLOGUE_PAGES[currentPage].bgAccent
    : 'rgba(201,168,76,0.08)';

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------

  return (
    <div
      className="relative h-full w-full overflow-hidden flex flex-col items-center justify-center"
      style={{
        background: `
          radial-gradient(ellipse 80% 60% at 50% 40%, rgba(45,27,78,0.7) 0%, transparent 70%),
          radial-gradient(ellipse 60% 50% at 30% 70%, rgba(108,92,231,0.15) 0%, transparent 60%),
          radial-gradient(ellipse 50% 40% at 75% 20%, rgba(201,168,76,0.06) 0%, transparent 50%),
          linear-gradient(180deg, #0d0d1a 0%, #1a0a2e 40%, #0d0d1a 100%)
        `,
      }}
    >
      <PrologueBackground
        stars={stars}
        embers={embers}
        runes={runes}
        accentColor={accentColor}
      />

      <AnimatePresence mode="wait">
        {currentPage === -1 ? (
          <motion.div
            key="title"
            className="flex flex-col items-center justify-center w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <TitleScreen onStart={onboardingComplete ? handleContinue : handleNewJourney} />
            {onboardingComplete && (
              <motion.button
                onClick={handleContinue}
                className="glass-panel cursor-pointer relative z-20 mt-4"
                style={{
                  padding: '0.9rem 2rem',
                  borderRadius: '12px',
                  borderColor: 'rgba(201,168,76,0.2)',
                  color: 'rgba(232,213,163,0.85)',
                  fontFamily: 'var(--font-title)',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textShadow: '0 0 8px rgba(232,168,56,0.15)',
                  transition: 'all 0.3s ease',
                }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{
                  scale: 1.03,
                  boxShadow: '0 0 15px rgba(201,168,76,0.15), 0 0 30px rgba(201,168,76,0.06)',
                  borderColor: 'rgba(201,168,76,0.5)',
                }}
                whileTap={{ scale: 0.97 }}
              >
                Reise fortsetzen
              </motion.button>
            )}
          </motion.div>
        ) : (
          <ProloguePageView
            key={`prologue-${currentPage}`}
            page={PROLOGUE_PAGES[currentPage]}
            pageIndex={currentPage}
            totalPages={PROLOGUE_PAGES.length}
            onNext={handleNextPage}
            onSkip={handleSkipPrologue}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default WelcomeScreen;
