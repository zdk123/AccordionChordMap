import { useMemo } from 'react';
import { type ButtonCombination, STRADELLA_NOTES } from '@/lib/chords';

interface AccordionLayoutProps {
  combinations: ButtonCombination[];
  activeCombo: number;
}

const ROW_LABELS = [
  "Counter-bass (Major Third)",
  "Root",
  "Major",
  "Minor",
  "Dominant 7th",
  "Diminished 7th"
];

export function AccordionLayout({ combinations, activeCombo }: AccordionLayoutProps) {
  const activeButtons = useMemo(() => {
    if (!combinations[activeCombo]) return { bass: [], counterbass: [], chord: [] };
    return combinations[activeCombo];
  }, [combinations, activeCombo]);

  const getButtonColor = (row: number, col: number) => {
    if (row === 0 && activeButtons.counterbass.includes(col)) {
      return activeButtons.color;
    }
    if (row === 1 && activeButtons.bass.includes(col)) {
      return activeButtons.color;
    }
    if (row >= 2) {
      const buttonIndex = col + (row - 2) * 20; // Calculate button index based on row
      if (activeButtons.chord.includes(buttonIndex)) {
        return activeButtons.color;
      }
    }
    return '#E5E7EB';
  };

  // Constants for layout
  const COLS = 20;
  const buttonRadius = 15;
  const spacing = 35;
  const startX = 80; // Increased to accommodate row labels
  const startY = 50;

  return (
    <svg 
      viewBox={`0 0 ${startX * 2 + COLS * spacing} ${startY * 2 + 6 * spacing}`} 
      className="w-full max-w-4xl mx-auto"
    >
      {/* Row labels */}
      {ROW_LABELS.map((label, row) => (
        <text
          key={`label-${row}`}
          x={10}
          y={startY + row * spacing + 5}
          className="text-xs font-medium"
          textAnchor="start"
        >
          {label}
        </text>
      ))}

      {/* Column labels (notes) */}
      {STRADELLA_NOTES.map((note, col) => (
        <text
          key={`note-${col}`}
          x={startX + col * spacing}
          y={20}
          textAnchor="middle"
          className="text-xs font-medium"
        >
          {note}
        </text>
      ))}

      {/* All 6 rows of buttons */}
      {Array.from({ length: 6 }).map((_, row) => (
        Array.from({ length: COLS }).map((_, col) => (
          <g key={`button-${row}-${col}`}>
            <circle
              cx={startX + col * spacing}
              cy={startY + row * spacing}
              r={buttonRadius}
              fill={getButtonColor(row, col)}
              stroke="#374151"
              strokeWidth="2"
            />
          </g>
        ))
      ))}
    </svg>
  );
}