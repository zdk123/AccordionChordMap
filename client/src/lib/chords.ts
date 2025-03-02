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
  notes: string[];  // Added to store all component notes
};

export const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export const CHORD_TYPES: ChordType[] = [
  { name: "maj", fullName: "Major", intervals: [0, 4, 7] },
  { name: "min", fullName: "Minor", intervals: [0, 3, 7] },
  { name: "7", fullName: "Dominant 7th", intervals: [0, 4, 7, 10] },
  { name: "maj7", fullName: "Major 7th", intervals: [0, 4, 7, 11] },
  { name: "min7", fullName: "Minor 7th", intervals: [0, 3, 7, 10] },
  { name: "dim", fullName: "Diminished", intervals: [0, 3, 6] },
  { name: "aug", fullName: "Augmented", intervals: [0, 4, 8] },
  { name: "dim7", fullName: "Diminished 7th", intervals: [0, 3, 6, 9] }
];

export const COLORS = [
  "#4A90E2", "#50C878", "#9B59B6", "#E74C3C",
  "#F39C12", "#1ABC9C", "#34495E", "#7F8C8D"
];

export function getChordNotes(root: string, chordType: ChordType): string[] {
  const rootIndex = NOTES.indexOf(root);
  return chordType.intervals.map(interval => 
    NOTES[(rootIndex + interval) % 12]
  );
}

// Stradella Bass System Layout Helper
function getStradellaBassLayout() {
  // In the Stradella system:
  // Counter-bass row: Fundamental notes
  // Bass row: The same notes as counter-bass but one octave higher
  // Chord rows: Arranged in thirds for major/minor chords

  const layout = {
    counterbass: Array.from({ length: 20 }, (_, i) => i),
    bass: Array.from({ length: 20 }, (_, i) => i),
    chord: Array.from({ length: 80 }, (_, i) => i) // 4 rows × 20 columns
  };

  return layout;
}

export function getButtonCombinations(root: string, chordType: ChordType): ButtonCombination[] {
  const rootIndex = NOTES.indexOf(root);
  const notes = getChordNotes(root, chordType);
  const layout = getStradellaBassLayout();

  // For demonstration, returning a basic combination
  // In a real implementation, this would map to actual Stradella bass button positions
  const combination: ButtonCombination = {
    counterbass: [rootIndex % 20],
    bass: [rootIndex % 20],
    chord: [
      rootIndex % 20,
      (rootIndex + 4) % 20,  // Major third
      (rootIndex + 7) % 20   // Perfect fifth
    ],
    color: COLORS[0],
    notes: notes
  };

  return [combination];
}