import { useMemo } from "react";
import { type ButtonCombination, STRADELLA_NOTES } from "@/lib/chords";

interface AccordionLayoutProps {
  combinations: ButtonCombination[];
  activeCombo: number;
}

const ROW_LABELS = ["Counter", "Root", "Major", "Minor", "Dom 7th", "Dim 7th"];

export function AccordionLayout({
  combinations,
}: {
  combinations: ButtonCombination[];
}) {
  const getButtonColor = (row: number, col: number) => {
    for (const combo of combinations) {
      if (row >= 2) {
        const buttonIndex = col + (row - 2) * 20; // Calculate button index based on row
        if (combo.chord.includes(buttonIndex)) {
          return combo.color;
        }
      }
    }
    return "#E5E7EB";
  };

  const getButtonStrokeWidth = (row: number, col: number) => {
    for (const combo of combinations) {
      if (
        row === 1 &&
        // Only have a thick border where roots button==alternatives
        combo.rootIndex.join(" ") === combo.bass.join(" ") &&
        combo.bass.includes(col)
      ) {
        return "4";
      }
    }
    return "2";
  };

  const getButtonStroke = (row: number, col: number) => {
    for (const combo of combinations) {
      // bass row - create stroke for missing notes but don't overwrite root stroke
      if (
        row == 1 &&
        !combo.rootIndex.includes(col) &&
        combo.missingNotes.includes(col)
      ) {
        return combo.color;
      }
      // adjust to counterbass position
      const missingNotesCounter = combo.missingNotes.map(
        (note) => (((note - 4) % 12) + 12) % 12,
      );
      if (row == 0 && missingNotesCounter.includes(col)) {
        return combo.color;
      }
    }
    return "#374151";
  };

  // Constants for layout
  const COLS = 20;
  const buttonRadius = 15;
  const spacing = 35;
  const startX = 80; // Increased to accommodate row labels
  const startY = 50;

  return (
    <svg
      viewBox={`0 0 ${startX * 1.5 + COLS * spacing} ${startY * 2 + 4.5 * spacing}`}
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
      {Array.from({ length: 6 }).map((_, row) =>
        Array.from({ length: COLS }).map((_, col) => (
          <g key={`button-${row}-${col}`}>
            <circle
              cx={startX + col * spacing}
              cy={startY + row * spacing}
              r={buttonRadius}
              fill={getButtonColor(row, col)}
              stroke={getButtonStroke(row, col)}
              strokeWidth={getButtonStrokeWidth(row, col)}
            />
          </g>
        )),
      )}
    </svg>
  );
}
