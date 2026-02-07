import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// ---------------------------------------------------------------------------
// Breathing phase configuration
// ---------------------------------------------------------------------------

type BreathPhase = 'inhale' | 'hold' | 'exhale';

interface PhaseConfig {
  label: string;
  duration: number; // seconds
  scale: number;
}

const PHASE_CONFIG: Record<BreathPhase, PhaseConfig> = {
  inhale: { label: 'Einatmen', duration: 4, scale: 1.5 },
  hold: { label: 'Halten', duration: 7, scale: 1.5 },
  exhale: { label: 'Ausatmen', duration: 8, scale: 1.0 },
};

const PHASE_ORDER: BreathPhase[] = ['inhale', 'hold', 'exhale'];

// ---------------------------------------------------------------------------
// BreathingExercise sub-component
// ---------------------------------------------------------------------------

const BreathingExercise: React.FC = () => {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [countdown, setCountdown] = useState(PHASE_CONFIG[PHASE_ORDER[0]].duration);

  const currentPhase = PHASE_ORDER[phaseIndex];
  const config = PHASE_CONFIG[currentPhase];

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          // Advance to next phase (loop)
          setPhaseIndex((pi) => {
            const next = (pi + 1) % PHASE_ORDER.length;
            return next;
          });
          const nextPhase = PHASE_ORDER[(phaseIndex + 1) % PHASE_ORDER.length];
          return PHASE_CONFIG[nextPhase].duration;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [phaseIndex]);

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-lg font-semibold text-primary-dark">
        Atem&uuml;bung &ndash; 4-7-8
      </p>

      {/* Animated breathing circle */}
      <div className="relative flex items-center justify-center w-40 h-40">
        <motion.div
          className="absolute rounded-full bg-primary-light/40"
          animate={{ scale: config.scale }}
          transition={{ duration: config.duration, ease: 'easeInOut' }}
          style={{ width: 100, height: 100 }}
        />
        <motion.div
          className="absolute rounded-full bg-primary/50"
          animate={{ scale: config.scale }}
          transition={{
            duration: config.duration,
            ease: 'easeInOut',
            delay: 0.15,
          }}
          style={{ width: 70, height: 70 }}
        />
        <span className="relative z-10 text-2xl font-bold text-white">
          {countdown}
        </span>
      </div>

      <p className="text-base font-medium text-text">
        {config.label}&hellip;
      </p>

      <div className="flex gap-2 mt-1">
        {PHASE_ORDER.map((p, i) => (
          <span
            key={p}
            className={`text-xs px-2 py-0.5 rounded-full ${
              i === phaseIndex
                ? 'bg-primary text-white'
                : 'bg-primary-light/30 text-text-light'
            }`}
          >
            {PHASE_CONFIG[p].label} ({PHASE_CONFIG[p].duration}s)
          </span>
        ))}
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// SOSButton (Kraft-Tankstelle)
// ---------------------------------------------------------------------------

const SOSButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = useCallback(() => setIsOpen(true), []);
  const handleClose = useCallback(() => setIsOpen(false), []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={handleOpen}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 text-white rounded-full bg-primary shadow-lg cursor-pointer select-none"
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        aria-label="Kraft-Tankstelle"
        title="Kraft-Tankstelle"
      >
        <span className="text-xl leading-none" role="img" aria-hidden="true">
          &#x2764;&#xFE0F;&#x200D;&#x1FA79;
        </span>
        <span className="text-sm font-semibold hidden sm:inline">
          Kraft-Tankstelle
        </span>
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
            />

            {/* Modal content */}
            <motion.div
              className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none"
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 30 }}
              transition={{ type: 'spring', damping: 22, stiffness: 260 }}
            >
              <div className="pointer-events-auto w-full max-w-md bg-bg rounded-3xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-primary to-primary-light p-6 text-center">
                  <span
                    className="text-4xl block mb-2"
                    role="img"
                    aria-hidden="true"
                  >
                    &#x2764;&#xFE0F;&#x200D;&#x1FA79;
                  </span>
                  <h2 className="text-2xl font-bold text-white">
                    Kraft-Tankstelle
                  </h2>
                  <p className="text-white/80 text-sm mt-1">
                    Hier kannst du auftanken und durchatmen.
                  </p>
                </div>

                <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
                  {/* Breathing exercise */}
                  <BreathingExercise />

                  {/* Divider */}
                  <hr className="border-primary-light/30" />

                  {/* Contact info */}
                  <div className="space-y-3">
                    <h3 className="text-base font-bold text-text">
                      Jemanden erreichen
                    </h3>

                    <div className="flex items-start gap-3 bg-primary-light/10 rounded-2xl p-4">
                      <span className="text-2xl" role="img" aria-hidden="true">
                        &#x1F4DE;
                      </span>
                      <div>
                        <p className="font-semibold text-text">
                          Kanner-Jugendtelefon Luxembourg
                        </p>
                        <a
                          href="tel:116111"
                          className="text-primary font-bold text-lg hover:underline"
                        >
                          116 111
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-secondary/10 rounded-2xl p-4">
                      <span className="text-2xl" role="img" aria-hidden="true">
                        &#x1F6E1;&#xFE0F;
                      </span>
                      <div>
                        <p className="font-semibold text-text">
                          BEE SECURE Helpline
                        </p>
                        <a
                          href="tel:80021234"
                          className="text-primary font-bold text-lg hover:underline"
                        >
                          8002 1234
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Encouraging message */}
                  <div className="bg-gold/20 rounded-2xl p-4 text-center">
                    <p className="text-base font-semibold text-text leading-relaxed">
                      Es ist okay, Hilfe zu holen.
                      <br />
                      <span className="text-primary">Das ist mutig.</span>
                    </p>
                  </div>
                </div>

                {/* Close button */}
                <div className="p-4 pt-0">
                  <button
                    onClick={handleClose}
                    className="w-full py-3 rounded-2xl bg-primary text-white font-bold text-base hover:bg-primary-dark transition-colors cursor-pointer"
                  >
                    Schlie&szlig;en
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default SOSButton;
