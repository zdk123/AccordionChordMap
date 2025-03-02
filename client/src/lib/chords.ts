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

// Stradella bass system starts at Bbb (B double flat) and follows circle of fifths
export const STRADELLA_NOTES = ['Bbb', 'F', 'C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'G#', 'D#', 'A#', 'E#', 'B#', 'F##', 'C##', 'G##', 'D##', 'A##'];

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
      // Dominant 7th - uses root and dominant seventh button (Row 4)
      combination = {
        counterbass: [],
        bass: [rootIndex],
        chord: [rootIndex + 80], // Dominant seventh button row
        color: COLORS[2],
        notes: [root, `${STRADELLA_NOTES[(rootIndex + 4) % 20]}`, `${STRADELLA_NOTES[(rootIndex + 10) % 20]}`]
      };
      break;

    case "dim7":
      // Diminished 7th - uses root and diminished seventh button (Row 5)
      combination = {
        counterbass: [],
        bass: [rootIndex],
        chord: [rootIndex + 100], // Diminished seventh button row
        color: COLORS[3],
        notes: [root, `${STRADELLA_NOTES[(rootIndex + 3) % 20]}`, `${STRADELLA_NOTES[(rootIndex + 9) % 20]}`]
      };
      break;

    case "maj7":
      // Major 7th - compound chord using major (Row 2) + minor third above (Row 3)
      combination = {
        counterbass: [],
        bass: [rootIndex],
        chord: [
          rootIndex + 40,  // Major chord button
          ((rootIndex + 4) % 20) + 60  // Minor chord button for the third above
        ],
        color: COLORS[0],
        notes: [root, `${STRADELLA_NOTES[(rootIndex + 4) % 20]}`, `${STRADELLA_NOTES[(rootIndex + 7) % 20]}`, `${STRADELLA_NOTES[(rootIndex + 11) % 20]}`]
      };
      break;

    case "min":
      // Minor triad (Row 3)
      combination = {
        counterbass: [],
        bass: [rootIndex],
        chord: [rootIndex + 60], // Minor button row
        color: COLORS[0],
        notes: [
          root,
          `${STRADELLA_NOTES[(rootIndex + 3) % 20]}`,
          `${STRADELLA_NOTES[(rootIndex + 7) % 20]}`
        ]
      };
      break;

    default:
      // Major triad (Row 2)
      combination = {
        counterbass: [],
        bass: [rootIndex],
        chord: [rootIndex + 40], // Major button row
        color: COLORS[0],
        notes: [
          root,
          `${STRADELLA_NOTES[(rootIndex + 4) % 20]}`,
          `${STRADELLA_NOTES[(rootIndex + 7) % 20]}`
        ]
      };
  }

  return [combination];
}