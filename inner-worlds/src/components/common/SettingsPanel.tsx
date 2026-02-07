import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useGameStore } from '../../stores/gameStore';
import type { Language } from '../../types';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

// ---------------------------------------------------------------------------
// Toggle sub-component
// ---------------------------------------------------------------------------

interface ToggleProps {
  label: string;
  enabled: boolean;
  onChange: (value: boolean) => void;
}

const Toggle: React.FC<ToggleProps> = ({ label, enabled, onChange }) => (
  <div className="flex items-center justify-between py-3">
    <span className="text-sm font-semibold text-text">{label}</span>
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors cursor-pointer ${
        enabled ? 'bg-primary' : 'bg-gray-300'
      }`}
    >
      <span
        className={`inline-block h-5 w-5 rounded-full bg-white shadow-md transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  </div>
);

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const SettingsPanel: React.FC<SettingsPanelProps> = ({ isOpen, onClose }) => {
  const settings = useGameStore((state) => state.settings);
  const updateSettings = useGameStore((state) => state.updateSettings);
  const resetGame = useGameStore((state) => state.resetGame);

  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // -------------------------------------------------------------------------
  // Apply body classes for accessibility toggles
  // -------------------------------------------------------------------------

  useEffect(() => {
    if (settings.dyslexiaFont) {
      document.body.classList.add('dyslexia-font');
    } else {
      document.body.classList.remove('dyslexia-font');
    }
  }, [settings.dyslexiaFont]);

  useEffect(() => {
    if (settings.highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [settings.highContrast]);

  // -------------------------------------------------------------------------
  // Handlers
  // -------------------------------------------------------------------------

  const handleLanguageChange = useCallback(
    (lang: Language) => {
      updateSettings({ language: lang });
    },
    [updateSettings],
  );

  const handleResetGame = useCallback(() => {
    resetGame();
    setShowResetConfirm(false);
    onClose();
  }, [resetGame, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[80] bg-black/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.aside
            className="fixed top-0 right-0 bottom-0 z-[90] w-full max-w-sm bg-bg shadow-2xl flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 240 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-primary-light/20">
              <h2 className="text-xl font-bold text-text flex items-center gap-2">
                <span role="img" aria-hidden="true">
                  &#x2699;&#xFE0F;
                </span>
                Einstellungen
              </h2>
              <button
                onClick={onClose}
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-primary-light/20 transition-colors cursor-pointer text-text-light text-lg"
                aria-label="Schlie\u00DFen"
              >
                &#x2715;
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
              {/* Language */}
              <section>
                <h3 className="text-xs font-bold uppercase tracking-wider text-text-light mb-2">
                  Sprache
                </h3>
                <div className="flex gap-2">
                  {(['de', 'fr'] as Language[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => handleLanguageChange(lang)}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-colors cursor-pointer ${
                        settings.language === lang
                          ? 'bg-primary text-white shadow-md'
                          : 'bg-primary-light/15 text-text hover:bg-primary-light/30'
                      }`}
                    >
                      {lang === 'de' ? 'Deutsch' : 'Fran\u00E7ais'}
                    </button>
                  ))}
                </div>
              </section>

              {/* Accessibility */}
              <section>
                <h3 className="text-xs font-bold uppercase tracking-wider text-text-light mb-1">
                  Barrierefreiheit
                </h3>

                <Toggle
                  label="Legasthenie-Schrift"
                  enabled={settings.dyslexiaFont}
                  onChange={(val) => updateSettings({ dyslexiaFont: val })}
                />

                <Toggle
                  label="Hoher Kontrast"
                  enabled={settings.highContrast}
                  onChange={(val) => updateSettings({ highContrast: val })}
                />
              </section>

              {/* Sound */}
              <section>
                <h3 className="text-xs font-bold uppercase tracking-wider text-text-light mb-1">
                  Audio
                </h3>

                <Toggle
                  label="Soundeffekte"
                  enabled={settings.soundEnabled}
                  onChange={(val) => updateSettings({ soundEnabled: val })}
                />

                <Toggle
                  label="Musik"
                  enabled={settings.musicEnabled}
                  onChange={(val) => updateSettings({ musicEnabled: val })}
                />

                {/* Volume slider */}
                <div className="py-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-text">
                      Lautst&auml;rke
                    </span>
                    <span className="text-xs font-bold text-primary">
                      {settings.volume}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    step={1}
                    value={settings.volume}
                    onChange={(e) =>
                      updateSettings({ volume: Number(e.target.value) })
                    }
                    className="w-full h-2 rounded-full appearance-none cursor-pointer accent-primary bg-primary-light/20"
                    aria-label="Lautst\u00E4rke"
                  />
                  <div className="flex justify-between text-[10px] text-text-light mt-1">
                    <span>&#x1F507;</span>
                    <span>&#x1F50A;</span>
                  </div>
                </div>
              </section>

              {/* Danger zone */}
              <section>
                <h3 className="text-xs font-bold uppercase tracking-wider text-danger mb-2">
                  Gefahrenzone
                </h3>

                {!showResetConfirm ? (
                  <button
                    onClick={() => setShowResetConfirm(true)}
                    className="w-full py-3 rounded-xl border-2 border-danger/30 text-danger font-bold text-sm hover:bg-danger/10 transition-colors cursor-pointer"
                  >
                    Spiel zur&uuml;cksetzen
                  </button>
                ) : (
                  <motion.div
                    className="bg-danger/10 rounded-2xl p-4 space-y-3"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <p className="text-sm font-semibold text-danger text-center">
                      Bist du sicher? Dein gesamter Fortschritt wird
                      gel&ouml;scht.
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setShowResetConfirm(false)}
                        className="flex-1 py-2.5 rounded-xl bg-white text-text font-bold text-sm hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        Abbrechen
                      </button>
                      <button
                        onClick={handleResetGame}
                        className="flex-1 py-2.5 rounded-xl bg-danger text-white font-bold text-sm hover:bg-danger/80 transition-colors cursor-pointer"
                      >
                        Ja, zur&uuml;cksetzen
                      </button>
                    </div>
                  </motion.div>
                )}
              </section>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-primary-light/20 text-center">
              <p className="text-[10px] text-text-light">
                Inner Worlds &mdash; Sozial-emotionales Lernen
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default SettingsPanel;
