import { motion } from 'framer-motion';
import { Mood } from '../../types';

// ---------------------------------------------------------------------------
// Emotion metadata
// ---------------------------------------------------------------------------

interface EmotionMeta {
  mood: Mood;
  label: string;
  emoji: string;
}

const EMOTIONS: EmotionMeta[] = [
  { mood: Mood.Happy, label: 'Gl\u00FCcklich', emoji: '\uD83D\uDE0A' },
  { mood: Mood.Sad, label: 'Traurig', emoji: '\uD83D\uDE22' },
  { mood: Mood.Angry, label: 'W\u00FCtend', emoji: '\uD83D\uDE20' },
  { mood: Mood.Anxious, label: '\u00C4ngstlich', emoji: '\uD83D\uDE30' },
  { mood: Mood.Calm, label: 'Ruhig', emoji: '\uD83D\uDE0C' },
  { mood: Mood.Confused, label: 'Verwirrt', emoji: '\uD83E\uDD14' },
  { mood: Mood.Excited, label: 'Aufgeregt', emoji: '\uD83E\uDD29' },
  { mood: Mood.Tired, label: 'M\u00FCde', emoji: '\uD83D\uDE34' },
  { mood: Mood.Lonely, label: 'Einsam', emoji: '\uD83E\uDD7A' },
  { mood: Mood.Proud, label: 'Stolz', emoji: '\uD83E\uDD73' },
  { mood: Mood.Frustrated, label: 'Frustriert', emoji: '\uD83D\uDE24' },
  { mood: Mood.Hopeful, label: 'Hoffnungsvoll', emoji: '\uD83C\uDF1F' },
];

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface EmotionWheelProps {
  onSelect: (mood: Mood) => void;
  selectedMood?: Mood;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const EmotionWheel: React.FC<EmotionWheelProps> = ({
  onSelect,
  selectedMood,
}) => {
  const totalSegments = EMOTIONS.length;
  const angleStep = 360 / totalSegments;

  // Radius of the circle (distance from center to each emotion item)
  const radius = 140; // px

  return (
    <div className="flex flex-col items-center gap-6">
      <h2 className="text-xl font-bold text-text">
        Wie f&uuml;hlst du dich gerade?
      </h2>

      {/* Wheel container */}
      <div
        className="relative"
        style={{ width: radius * 2 + 80, height: radius * 2 + 80 }}
      >
        {/* Center label */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
            {selectedMood ? (
              <span className="text-3xl">
                {EMOTIONS.find((e) => e.mood === selectedMood)?.emoji}
              </span>
            ) : (
              <span className="text-sm font-semibold text-text-light text-center leading-tight px-2">
                W&auml;hle ein Gef&uuml;hl
              </span>
            )}
          </div>
        </div>

        {/* Emotion segments arranged in a circle */}
        {EMOTIONS.map((emotion, index) => {
          const angle = angleStep * index - 90; // start from top
          const radian = (angle * Math.PI) / 180;
          const x = Math.cos(radian) * radius;
          const y = Math.sin(radian) * radius;
          const isSelected = selectedMood === emotion.mood;

          return (
            <motion.button
              key={emotion.mood}
              className={`absolute flex flex-col items-center justify-center cursor-pointer select-none rounded-2xl p-1.5 transition-colors ${
                isSelected
                  ? 'bg-primary/20 shadow-lg shadow-primary/30'
                  : 'bg-white/60 hover:bg-primary-light/20'
              }`}
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                width: 72,
                height: 72,
              }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              animate={
                isSelected
                  ? {
                      scale: 1.2,
                      boxShadow: '0 0 20px rgba(108, 92, 231, 0.4)',
                    }
                  : { scale: 1, boxShadow: '0 0 0px rgba(108, 92, 231, 0)' }
              }
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              onClick={() => onSelect(emotion.mood)}
              aria-label={emotion.label}
              title={emotion.label}
            >
              <span className="text-2xl leading-none" role="img" aria-hidden="true">
                {emotion.emoji}
              </span>
              <span
                className={`text-[10px] mt-0.5 font-semibold leading-tight text-center ${
                  isSelected ? 'text-primary-dark' : 'text-text-light'
                }`}
              >
                {emotion.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Selected mood label */}
      {selectedMood && (
        <motion.p
          className="text-lg font-bold text-primary"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          key={selectedMood}
        >
          {EMOTIONS.find((e) => e.mood === selectedMood)?.label}
        </motion.p>
      )}
    </div>
  );
};

export default EmotionWheel;
