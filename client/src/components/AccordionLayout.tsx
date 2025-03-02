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

  return (
    <svg viewBox="0 0 800 400" className="w-full max-w-3xl mx-auto">
      {/* Bass buttons - 2 rows of 12 */}
      {Array.from({ length: 24 }).map((_, i) => (
        <circle
          key={`bass-${i}`}
          cx={100 + (i % 12) * 50}
          cy={100 + Math.floor(i / 12) * 50}
          r="20"
          fill={getButtonColor('bass', i)}
          stroke="#374151"
          strokeWidth="2"
        />
      ))}

      {/* Counterbass buttons - 2 rows of 12 */}
      {Array.from({ length: 24 }).map((_, i) => (
        <circle
          key={`counterbass-${i}`}
          cx={100 + (i % 12) * 50}
          cy={200 + Math.floor(i / 12) * 50}
          r="20"
          fill={getButtonColor('counterbass', i)}
          stroke="#374151"
          strokeWidth="2"
        />
      ))}

      {/* Chord buttons - 6 rows of 12 */}
      {Array.from({ length: 72 }).map((_, i) => (
        <circle
          key={`chord-${i}`}
          cx={100 + (i % 12) * 50}
          cy={300 + Math.floor(i / 12) * 50}
          r="20"
          fill={getButtonColor('chord', i)}
          stroke="#374151"
          strokeWidth="2"
        />
      ))}
    </svg>
  );
}
