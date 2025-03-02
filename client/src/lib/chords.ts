export type ChordType = {
  name: string;
  fullName: string;
  intervals: number[];
};

export type ButtonCombination = {
  bass: number[];
  counterbass: number[];
  chord: number[];
  color: string;
  notes: string[];
};

// Stradella bass system starts at Bb (B double flat) and follows circle of fifths
export const STRADELLA_NOTES = ['Bb', 'F', 'C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'G#', 'D#', 'A#', 'E#', 'B#', 'F##', 'C##', 'G##', 'D##', 'A##'];

export const CHORD_TYPES: ChordType[] = [
  { name: "maj", fullName: "Major", intervals: [0, 4, 7] },
  { name: "min", fullName: "Minor", intervals: [0, 3, 7] },
  { name: "7", fullName: "Dominant 7th", intervals: [0, 4, 10] }, // No fifth
  { name: "dim7", fullName: "Diminished 7th", intervals: [0, 3, 6, 9] },
  { name: "maj7", fullName: "Major 7th", intervals: [0, 4, 7, 11] }, // Compound chord
  { name: "min7", fullName: "Minor 7th", intervals: [0, 3, 7, 10] }  // Compound chord
];

export const COLORS = [
  "#4A90E2", "#50C878", "#9B59B6", "#E74C3C",
  "#F39C12", "#1ABC9C", "#34495E", "#7F8C8D"
];

// Helper function to find index in Stradella layout
function findStradellaIndex(note: string): number {
  return STRADELLA_NOTES.findIndex(n => n === note);
}

export function getButtonCombinations(root: string, chordType: ChordType): ButtonCombination[] {
  const rootIndex = findStradellaIndex(root);
  if (rootIndex === -1) return [];

  let combination: ButtonCombination;

  switch(chordType.name) {
    case "7":
      // Dominant 7th - uses root, third, and seventh (no fifth)
      combination = {
        counterbass: [rootIndex],
        bass: [rootIndex],
        chord: [
          rootIndex, // root
          rootIndex, // major third button
          rootIndex  // seventh button
        ],
        color: COLORS[2],
        notes: [root, `${STRADELLA_NOTES[(rootIndex + 4) % 20]}`, `${STRADELLA_NOTES[(rootIndex + 10) % 20]}`]
      };
      break;

    case "dim7":
      // Diminished 7th - uses root, minor third, and diminished seventh (no fifth)
      combination = {
        counterbass: [rootIndex],
        bass: [rootIndex],
        chord: [
          rootIndex, // root
          rootIndex, // minor third button
          rootIndex  // diminished seventh button
        ],
        color: COLORS[3],
        notes: [root, `${STRADELLA_NOTES[(rootIndex + 3) % 20]}`, `${STRADELLA_NOTES[(rootIndex + 9) % 20]}`]
      };
      break;

    case "maj7":
      // Major 7th - compound chord using major + minor third above
      combination = {
        counterbass: [rootIndex],
        bass: [rootIndex],
        chord: [
          rootIndex,  // Major chord button
          (rootIndex + 4) % 20  // Minor chord button for the third above
        ],
        color: COLORS[0],
        notes: [root, `${STRADELLA_NOTES[(rootIndex + 4) % 20]}`, `${STRADELLA_NOTES[(rootIndex + 7) % 20]}`, `${STRADELLA_NOTES[(rootIndex + 11) % 20]}`]
      };
      break;

    default:
      // Major/Minor triads
      combination = {
        counterbass: [rootIndex],
        bass: [rootIndex],
        chord: [rootIndex],
        color: COLORS[0],
        notes: [
          root,
          `${STRADELLA_NOTES[(rootIndex + (chordType.name === "min" ? 3 : 4)) % 20]}`,
          `${STRADELLA_NOTES[(rootIndex + 7) % 20]}`
        ]
      };
  }

  return [combination];
}