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
  "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4",
  "#FFEEAD", "#D4A5A5", "#9B59B6", "#3498DB"
];

export function getChordNotes(root: string, chordType: ChordType): string[] {
  const rootIndex = NOTES.indexOf(root);
  return chordType.intervals.map(interval => 
    NOTES[(rootIndex + interval) % 12]
  );
}

export function getButtonCombinations(root: string, chordType: ChordType): ButtonCombination[] {
  // This is a simplified version - in a real app we would have more combinations
  const rootIndex = NOTES.indexOf(root);
  const combinations: ButtonCombination[] = [];
  
  // Basic combination
  combinations.push({
    bass: [rootIndex],
    counterbass: [],
    chord: [rootIndex],
    color: COLORS[0]
  });

  return combinations;
}
