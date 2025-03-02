import { useMemo } from 'react';
import { type ButtonCombination } from '@/lib/chords';

interface AccordionLayoutProps {
  combinations: ButtonCombination[];
  activeCombo: number;
}

export function AccordionLayout({ combinations, activeCombo }: AccordionLayoutProps) {
  const activeButtons = useMemo(() => {
    if (!combinations[activeCombo]) return { bass: [], counterbass: [], chord: [] };
    return combinations[activeCombo];
  }, [combinations, activeCombo]);

  const getButtonColor = (section: 'bass' | 'counterbass' | 'chord', index: number) => {
    if (activeButtons[section].includes(index)) {
      return activeButtons.color;
    }
    return '#E5E7EB';
  };

  // Constants for layout
  const COLS = 20;
  const buttonRadius = 15;
  const spacing = 35;
  const startX = 50;
  const startY = 50;

  return (
    <svg viewBox={`0 0 ${startX * 2 + COLS * spacing} ${startY * 2 + 6 * spacing}`} className="w-full max-w-4xl mx-auto">
      {/* Counter-bass buttons (first row) */}
      {Array.from({ length: COLS }).map((_, i) => (
        <g key={`counterbass-${i}`}>
          <circle
            cx={startX + i * spacing}
            cy={startY}
            r={buttonRadius}
            fill={getButtonColor('counterbass', i)}
            stroke="#374151"
            strokeWidth="2"
          />
          <text 
            x={startX + i * spacing} 
            y={startY + buttonRadius * 2.5}
            textAnchor="middle" 
            className="text-xs"
          >
            {i + 1}
          </text>
        </g>
      ))}

      {/* Bass buttons (second row) */}
      {Array.from({ length: COLS }).map((_, i) => (
        <g key={`bass-${i}`}>
          <circle
            cx={startX + i * spacing}
            cy={startY + spacing}
            r={buttonRadius}
            fill={getButtonColor('bass', i)}
            stroke="#374151"
            strokeWidth="2"
          />
          <text 
            x={startX + i * spacing} 
            y={startY + spacing + buttonRadius * 2.5}
            textAnchor="middle" 
            className="text-xs"
          >
            {i + 1}
          </text>
        </g>
      ))}

      {/* Chord buttons (4 rows) */}
      {Array.from({ length: 4 }).map((_, row) => (
        Array.from({ length: COLS }).map((_, col) => (
          <g key={`chord-${row}-${col}`}>
            <circle
              cx={startX + col * spacing}
              cy={startY + (row + 2) * spacing}
              r={buttonRadius}
              fill={getButtonColor('chord', row * COLS + col)}
              stroke="#374151"
              strokeWidth="2"
            />
            <text 
              x={startX + col * spacing} 
              y={startY + (row + 2) * spacing + buttonRadius * 2.5}
              textAnchor="middle" 
              className="text-xs"
            >
              {row * COLS + col + 1}
            </text>
          </g>
        ))
      ))}
    </svg>
  );
}