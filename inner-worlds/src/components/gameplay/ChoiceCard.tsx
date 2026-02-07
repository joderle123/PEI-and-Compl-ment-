import { motion } from 'framer-motion';
import type { Choice } from '../../types';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface ChoiceCardProps {
  /** The choice data to render */
  choice: Choice;
  /** Called when the player selects this choice */
  onSelect: (choice: Choice) => void;
  /** When true the card is greyed out and non-interactive */
  disabled: boolean;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Determine the dominant point type and return a corresponding border color */
const getDominantColor = (choice: Choice): string => {
  const { empathyPoints, insightPoints, couragePoints } = choice;
  const max = Math.max(empathyPoints, insightPoints, couragePoints);

  if (max === 0) return 'border-primary/40';
  if (max === empathyPoints) return 'border-pink-400';
  if (max === insightPoints) return 'border-purple-400';
  return 'border-orange-400';
};

/** Map dominant point type to a subtle background glow */
const getDominantGlow = (choice: Choice): string => {
  const { empathyPoints, insightPoints, couragePoints } = choice;
  const max = Math.max(empathyPoints, insightPoints, couragePoints);

  if (max === 0) return 'hover:shadow-primary/20';
  if (max === empathyPoints) return 'hover:shadow-pink-400/30';
  if (max === insightPoints) return 'hover:shadow-purple-400/30';
  return 'hover:shadow-orange-400/30';
};

/** Small icon to hint at the point type */
const getPointIcons = (choice: Choice): string[] => {
  const icons: string[] = [];
  if (choice.empathyPoints > 0) icons.push('\u2764\uFE0F');
  if (choice.insightPoints > 0) icons.push('\uD83D\uDCA1');
  if (choice.couragePoints > 0) icons.push('\uD83D\uDD25');
  return icons;
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const ChoiceCard: React.FC<ChoiceCardProps> = ({ choice, onSelect, disabled }) => {
  const borderColor = getDominantColor(choice);
  const glowColor = getDominantGlow(choice);
  const icons = getPointIcons(choice);

  return (
    <motion.button
      className={`
        relative w-full text-left px-5 py-4 rounded-2xl border-2 backdrop-blur-sm
        transition-colors duration-200 focus:outline-none focus-visible:ring-2
        focus-visible:ring-primary/50 focus-visible:ring-offset-2
        ${
          disabled
            ? 'opacity-40 cursor-not-allowed bg-gray-100/50 border-gray-300/40'
            : `bg-white/70 cursor-pointer shadow-md hover:shadow-lg ${borderColor} ${glowColor}`
        }
      `}
      disabled={disabled}
      onClick={() => !disabled && onSelect(choice)}
      initial={{ opacity: 0, y: 16, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={disabled ? {} : { scale: 1.03, y: -2 }}
      whileTap={disabled ? {} : { scale: 0.97 }}
      transition={{ type: 'spring', damping: 18, stiffness: 300 }}
    >
      {/* Choice text */}
      <span className="block text-base font-semibold leading-snug text-text">
        {choice.text}
      </span>

      {/* Point type indicators */}
      {icons.length > 0 && (
        <span className="mt-2 flex items-center gap-1">
          {icons.map((icon, i) => (
            <span key={i} className="text-sm" role="img" aria-hidden="true">
              {icon}
            </span>
          ))}
        </span>
      )}

      {/* Decorative shimmer on hover (non-disabled) */}
      {!disabled && (
        <motion.span
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background:
              'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.4) 50%, transparent 60%)',
            backgroundSize: '200% 100%',
          }}
          animate={{ backgroundPosition: ['200% center', '-200% center'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
      )}
    </motion.button>
  );
};

export default ChoiceCard;
