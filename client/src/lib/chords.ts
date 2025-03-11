export type ChordType = {
  name: string;
  altName: string;
  fullName: string;
  intervals: number[];
  description: string;
};

export type ButtonCombination = {
  bass: number[];
  bassNote: string[];
  // counterbass: number; //don't need this?
  chord: number[];
  root: string[];
  rootIndex: number[];
  chordType: string;
  color: string;
  notes: string[];
  missingNotesBass: number[];
  missingNotesCounterbass: number[];
  missingNotesStr: string[];
  missingCount: number;
};

export type Match = {
  buttonName: string;
  buttonNotes: Set<number>;
  missingNotes: Set<number>;
  missingCount: number;
};

// Stradella bass system starts at Bbb and follows circle of fifths
export const STRADELLA_NOTES = [
  "Bbb",
  "Fb",
  "Cb",
  "Gb",
  "Db",
  "Ab",
  "Eb",
  "Bb",
  "F",
  "C",
  "G",
  "D",
  "A",
  "E",
  "B",
  "F#",
  "C#",
  "G#",
  "D#",
  "A#",
];

export const COUNTERBASS_STRADELLA_NOTES = [
  "Db",
  "Ab",
  "Eb",
  "Bb",
  "F",
  "C",
  "G",
  "D",
  "A",
  "E",
  "B",
  "F#",
  "C#",
  "G#",
  "D#",
  "A#",
  "E#",
  "B#",
  "Fx",
  "Cx",
];

const NOTES: { [key: number]: string } = {
  0: "C",
  1: "Db",
  2: "D",
  3: "Eb",
  4: "E",
  5: "F",
  6: "Gb",
  7: "G",
  8: "Ab",
  9: "A",
  10: "Bb",
  11: "B",
};

// Create buttons dictionary
const BUTTONS: { [key: string]: Set<number> } = {};
for (let n = 0; n < 12; n++) {
  BUTTONS[`${NOTES[n]},M`] = normalize([n, n + 4, n + 7]);
  BUTTONS[`${NOTES[n]},m`] = normalize([n, n + 3, n + 7]);
  BUTTONS[`${NOTES[n]},7`] = normalize([n, n + 4, n + 10]);
  BUTTONS[`${NOTES[n]},d`] = normalize([n, n + 3, n + 9]);
}

const KEYS: { [key: string]: number } = {
  "B#": 0,
  C: 0,
  "C#": 1,
  Db: 1,
  D: 2,
  Cx: 2,
  "D#": 3,
  Eb: 3,
  E: 4,
  Fb: 4,
  "E#": 5,
  F: 5,
  "F#": 6,
  Gb: 6,
  G: 7,
  Fx: 7,
  "G#": 8,
  Ab: 8,
  A: 9,
  Bbb: 9,
  "A#": 10,
  Bb: 10,
  B: 11,
  Cb: 11,
};

// Transpose the Note -> index map for Keys
const KEYS_T = Object.entries(KEYS).reduce<{ [key: number]: string[] }>(
  (acc, [key, value]) => {
    if (!acc[value]) {
      acc[value] = [];
    }
    acc[value].push(key);
    return acc;
  },
  {},
);

// Given a pitch, but equivilent representation of that pitch
export function findEquivNotes(pitch: string): string[] {
  const i = KEYS[pitch];
  // make sure the input pitch is first
  return [pitch, ...KEYS_T[i].filter(note => note !== pitch)]
}

export const CHORD_TYPES: ChordType[] = [
  {
    name: "maj",
    altName: "M",
    fullName: "Major",
    intervals: [0, 4, 7],
    description: "Major triad",
  },
  {
    name: "min",
    altName: "m",
    fullName: "Minor",
    intervals: [0, 3, 7],
    description: "Minor triad",
  },
  {
    name: "7",
    altName: "dom7",
    fullName: "Dominant 7th",
    intervals: [0, 4, 7, 10],
    description: "Dominant seventh chord",
  },
  {
    name: "dim",
    altName: "dim7",
    fullName: "Diminished 7th",
    intervals: [0, 3, 6, 9],
    description: "Diminished seventh.",
  },
  {
    name: "7#5b9",
    altName: "7#5b9",
    fullName: "7#5b9",
    intervals: [0, 4, 8, 10, 13],
    description:
      "An augmented chord [raised 5th) with a dominant 7th and flat 9th.",
  },
  {
    name: "m(sus9)",
    altName: "m(sus9)",
    fullName: "m(sus9)",
    intervals: [0, 3, 7, 14],
    description: "Minor triad plus 9th [no 7th).",
  },
  {
    name: "7sus",
    altName: "7sus",
    fullName: "7th suspended 4th",
    intervals: [0, 5, 7, 10],
    description:
      "7th with suspended 4th, dominant 7th with 3rd raised half tone.",
  },
  {
    name: "7omit3",
    altName: "7omit3",
    fullName: "7omit3",
    intervals: [0, 0, 7, 10],
    description: "7th with unvoiced 3rd.",
  },
  {
    name: "7b13",
    altName: "7b13",
    fullName: "7b13",
    intervals: [0, 4, 7, 10, 20],
    description:
      "7th [including 5th) plus flat 13th [the 9th and 11th are not voiced).",
  },
  {
    name: "aug",
    altName: "aug",
    fullName: "Augmented",
    intervals: [0, 4, 8],
    description: "Augmented triad.",
  },
  {
    name: "13sus4",
    altName: "13sus4",
    fullName: "13sus4",
    intervals: [0, 5, 7, 10, 14, 21],
    description: "7sus, plus 9th and 13th",
  },
  {
    name: "m9b5",
    altName: "m9b5",
    fullName: "m9b5",
    intervals: [0, 3, 6, 10, 14],
    description: "Minor triad, flat 5, plus 7th and 9th.",
  },
  {
    name: "+7b9",
    altName: "+7b9",
    fullName: "+7b9",
    intervals: [0, 4, 8, 10, 13],
    description:
      "An augmented chord [raised 5th) with a dominant 7th and flat 9th.",
  },
  {
    name: "aug7b9",
    altName: "aug7b9",
    fullName: "aug7b9",
    intervals: [0, 4, 8, 10, 13],
    description:
      "An augmented chord [raised 5th) with a dominant 7th and flat 9th.",
  },
  {
    name: "m(b5)",
    altName: "m(b5)",
    fullName: "m(b5)",
    intervals: [0, 3, 6],
    description: "Minor triad with flat 5th [aka dim).",
  },
  {
    name: "7b9sus",
    altName: "7b9sus",
    fullName: "7b9sus",
    intervals: [0, 5, 7, 10, 13],
    description: "7th with suspended 4th and flat 9th.",
  },
  {
    name: "m7-5",
    altName: "m7-5",
    fullName: "Minor7th Flat 5",
    intervals: [0, 3, 6, 10],
    description: "Minor 7th, flat 5 [aka 1/2 diminished).",
  },
  {
    name: "m7b9#11",
    altName: "m7b9#11",
    fullName: "m7b9#11",
    intervals: [0, 3, 7, 10, 13, 18],
    description: "Minor 7th plus flat 9th and sharp 11th.",
  },
  {
    name: "7-9",
    altName: "7-9",
    fullName: "7th flat 9th",
    intervals: [0, 4, 7, 10, 13],
    description: "7th with flat 9th.",
  },
  {
    name: "M7(add13)",
    altName: "M7(add13)",
    fullName: "M7(add13)",
    intervals: [0, 4, 7, 10, 13, 21],
    description:
      "7th [including 5th) plus 13th and flat 9th [11th not voiced).",
  },
  {
    name: "m#7",
    altName: "m#7",
    fullName: "m#7",
    intervals: [0, 3, 7, 11],
    description: "Minor Triad plus Major 7th.",
  },
  {
    name: "m#5",
    altName: "m#5",
    fullName: "m#5",
    intervals: [0, 3, 8],
    description: "Minor triad with augmented 5th.",
  },
  {
    name: "7b5",
    altName: "7b5",
    fullName: "7b5",
    intervals: [0, 4, 6, 10],
    description: "7th, flat 5.",
  },
  {
    name: "m7b5",
    altName: "m7b5",
    fullName: "m7b5",
    intervals: [0, 3, 6, 10],
    description: "Minor 7th, flat 5 [aka 1/2 diminished).",
  },
  {
    name: "mM7",
    altName: "mM7",
    fullName: "mM7",
    intervals: [0, 3, 7, 11],
    description: "Minor Triad plus Major 7th.",
  },
  {
    name: "m7b9",
    altName: "m7b9",
    fullName: "m7b9",
    intervals: [0, 3, 7, 10, 13],
    description: "Minor 7th with added flat 9th.",
  },
  {
    name: "13sus",
    altName: "13sus",
    fullName: "13sus",
    intervals: [0, 5, 7, 10, 14, 21],
    description: "7sus, plus 9th and 13th",
  },
  {
    name: "7b9",
    altName: "7b9",
    fullName: "7b9",
    intervals: [0, 4, 7, 10, 13],
    description: "7th with flat 9th.",
  },
  {
    name: "7(omit3)",
    altName: "7(omit3)",
    fullName: "7(omit3)",
    intervals: [0, 0, 7, 10],
    description: "7th with unvoiced 3rd.",
  },
  {
    name: "dim(b13)",
    altName: "dim(b13)",
    fullName: "dim(b13)",
    intervals: [0, 3, 6, 9, 8],
    description: "Diminished seventh, added flat 13th.",
  },
  {
    name: "7b5b9",
    altName: "7b5b9",
    fullName: "7b5b9",
    intervals: [0, 4, 6, 10, 13],
    description: "7th with flat 5th and flat 9th.",
  },
  {
    name: "omit3(add9)",
    altName: "omit3(add9)",
    fullName: "omit3(add9)",
    intervals: [0, 0, 7, 14],
    description: "Triad: root, 5th and 9th.",
  },
  {
    name: "(add#9)",
    altName: "(add#9)",
    fullName: "(add#9)",
    intervals: [0, 4, 7, 15],
    description: "Major chord plus sharp 9th [no 7th.)",
  },
  {
    name: "9sus",
    altName: "9sus",
    fullName: "9sus",
    intervals: [0, 5, 7, 10, 14],
    description: "7sus plus 9th.",
  },
  {
    name: "(#5)",
    altName: "(#5)",
    fullName: "(#5)",
    intervals: [0, 4, 8],
    description: "Augmented triad.",
  },
  {
    name: "7b5(add13)",
    altName: "7b5(add13)",
    fullName: "7b5(add13)",
    intervals: [0, 4, 6, 10, 21],
    description: "7th with flat 5 and 13th.",
  },
  {
    name: "11+",
    altName: "11+",
    fullName: "11+",
    intervals: [0, 0, 8, 10, 14, 17],
    description: "Augmented 11th [sharp 5).",
  },
  {
    name: "+M7",
    altName: "+M7",
    fullName: "+M7",
    intervals: [0, 4, 8, 11],
    description: "Major 7th with sharp 5th.",
  },
  {
    name: "M7",
    altName: "M7",
    fullName: "M7",
    intervals: [0, 4, 7, 11],
    description: "Major 7th.",
  },
  {
    name: "M6",
    altName: "M6",
    fullName: "M6",
    intervals: [0, 4, 7, 9],
    description: "Major tiad with added 6th.",
  },
  {
    name: "M13#11",
    altName: "M13#11",
    fullName: "M13#11",
    intervals: [0, 4, 7, 11, 18, 21],
    description: "Major 7th plus sharp 11th and 13th [9th not voiced).",
  },
  {
    name: "7-5",
    altName: "7-5",
    fullName: "7-5",
    intervals: [0, 4, 6, 10],
    description: "7th, flat 5.",
  },
  {
    name: "addb9",
    altName: "addb9",
    fullName: "addb9",
    intervals: [0, 4, 7, 13],
    description: "Major chord plus flat 9th [no 7th.)",
  },
  {
    name: "M9",
    altName: "M9",
    fullName: "M9",
    intervals: [0, 4, 7, 11, 14],
    description: "Major 7th plus 9th.",
  },
  {
    name: "sus(add9)",
    altName: "sus(add9)",
    fullName: "sus(add9)",
    intervals: [0, 5, 7, 14],
    description:
      "Suspended 4th, major triad with the 3rd raised half tone plus 9th.",
  },
  {
    name: "M9#11",
    altName: "M9#11",
    fullName: "M9#11",
    intervals: [0, 4, 7, 11, 14, 18],
    description: "Major 9th plus sharp 11th.",
  },
  {
    name: "+",
    altName: "+",
    fullName: "+",
    intervals: [0, 4, 8],
    description: "Augmented triad.",
  },
  {
    name: "msus",
    altName: "msus",
    fullName: "msus",
    intervals: [0, 3, 5, 7],
    description: "Minor suspended 4th, minor triad plus 4th.",
  },
  {
    name: "m+7",
    altName: "m+7",
    fullName: "m+7",
    intervals: [0, 3, 7, 11],
    description: "Minor Triad plus Major 7th.",
  },
  {
    name: "m+5",
    altName: "m+5",
    fullName: "m+5",
    intervals: [0, 3, 8],
    description: "Minor triad with augmented 5th.",
  },
  {
    name: "sus",
    altName: "sus",
    fullName: "Suspended 4th",
    intervals: [0, 5, 7],
    description: "Suspended 4th, major triad with the 3rd raised half tone.",
  },
  {
    name: "9sus4",
    altName: "9sus4",
    fullName: "9sus4",
    intervals: [0, 5, 7, 10, 14],
    description: "7sus plus 9th.",
  },
  {
    name: "7#5#9",
    altName: "7#5#9",
    fullName: "7#5#9",
    intervals: [0, 4, 8, 10, 15],
    description: "7th with sharp 5th and sharp 9th.",
  },
  {
    name: "7+",
    altName: "7+",
    fullName: "7+",
    intervals: [0, 4, 8, 10],
    description: "An augmented chord [raised 5th) with a dominant 7th.",
  },
  {
    name: "13susb9",
    altName: "13susb9",
    fullName: "13susb9",
    intervals: [0, 5, 7, 10, 13, 21],
    description: "7sus, plus flat 9th and 13th",
  },
  {
    name: "m+7b9",
    altName: "m+7b9",
    fullName: "m+7b9",
    intervals: [0, 3, 8, 10, 13],
    description: "Augmented minor 7 plus flat 9th.",
  },
  {
    name: "7+9",
    altName: "7+9",
    fullName: "7+9",
    intervals: [0, 4, 7, 10, 15],
    description: "7th with sharp 9th.",
  },
  {
    name: "min(maj7)",
    altName: "min(maj7)",
    fullName: "min(maj7)",
    intervals: [0, 3, 7, 11],
    description: "Minor Triad plus Major 7th.",
  },
  {
    name: "m7(b9)",
    altName: "m7(b9)",
    fullName: "m7(b9)",
    intervals: [0, 3, 7, 10, 13],
    description: "Minor 7th with added flat 9th.",
  },
  {
    name: "13#11",
    altName: "13#11",
    fullName: "13#11",
    intervals: [0, 4, 7, 10, 18, 21],
    description: "7th plus sharp 11th and 13th [9th not voiced).",
  },
  {
    name: "sus(add#9)",
    altName: "sus(add#9)",
    fullName: "sus(add#9)",
    intervals: [0, 5, 7, 15],
    description:
      "Suspended 4th, major triad with the 3rd raised half tone plus sharp 9th.",
  },
  {
    name: "7susb9",
    altName: "7susb9",
    fullName: "7susb9",
    intervals: [0, 5, 7, 10, 13],
    description: "7th with suspended 4th and flat 9th.",
  },
  {
    name: "13b9",
    altName: "13b9",
    fullName: "13b9",
    intervals: [0, 4, 7, 10, 13, 21],
    description:
      "7th [including 5th) plus 13th and flat 9th [11th not voiced).",
  },
  {
    name: "7#5",
    altName: "7#5",
    fullName: "7#5",
    intervals: [0, 4, 8, 10],
    description: "An augmented chord [raised 5th) with a dominant 7th.",
  },
  {
    name: "M7-5",
    altName: "M7-5",
    fullName: "M7-5",
    intervals: [0, 4, 6, 11],
    description: "Major 7th with a flat 5th.",
  },
  {
    name: "7#9",
    altName: "7#9",
    fullName: "7#9",
    intervals: [0, 4, 7, 10, 15],
    description: "7th with sharp 9th.",
  },
  {
    name: "(add9)",
    altName: "(add9)",
    fullName: "(add9)",
    intervals: [0, 4, 7, 14],
    description: "Major chord plus 9th [no 7th.)",
  },
  {
    name: "mM7(add9)",
    altName: "mM7(add9)",
    fullName: "mM7(add9)",
    intervals: [0, 3, 7, 11, 14],
    description: "Minor Triad plus Major 7th and 9th.",
  },
  {
    name: "add#9",
    altName: "add#9",
    fullName: "add#9",
    intervals: [0, 4, 7, 15],
    description: "Major chord plus sharp 9th [no 7th.)",
  },
  {
    name: "add9",
    altName: "add9",
    fullName: "add9",
    intervals: [0, 4, 7, 14],
    description: "Major chord plus 9th [no 7th.)",
  },
  {
    name: "m6(add9)",
    altName: "m6(add9)",
    fullName: "m6(add9)",
    intervals: [0, 3, 7, 14, 21],
    description: "Minor 6th with added 9th.",
  },
  {
    name: "13#9",
    altName: "13#9",
    fullName: "13#9",
    intervals: [0, 4, 7, 10, 15, 21],
    description:
      "7th [including 5th) plus 13th and sharp 9th [11th not voiced).",
  },
  {
    name: "m7(add13)",
    altName: "m7(add13)",
    fullName: "m7(add13)",
    intervals: [0, 3, 7, 10, 21],
    description: "Minor 7th  plus 13th.",
  },
  {
    name: "+9",
    altName: "+9",
    fullName: "+9",
    intervals: [0, 4, 8, 10, 14],
    description: "7th plus 9th with sharp 5th [same as aug9).",
  },
  {
    name: "11#5",
    altName: "11#5",
    fullName: "11#5",
    intervals: [0, 0, 8, 10, 14, 17],
    description: "Augmented 11th [sharp 5).",
  },
  {
    name: "m7sus4",
    altName: "m7sus4",
    fullName: "m7sus4",
    intervals: [0, 3, 5, 7, 10],
    description: "Minor suspended 4th, minor triad plus 4th and dominant 7th.",
  },
  {
    name: "m11",
    altName: "m11",
    fullName: "m11",
    intervals: [0, 3, 7, 10, 14, 17],
    description: "9th with minor 3rd,  plus 11th.",
  },
  {
    name: "m13",
    altName: "m13",
    fullName: "m13",
    intervals: [0, 3, 7, 10, 21],
    description:
      "Minor 7th [including 5th) plus 13th [9th and 11th not voiced).",
  },
  {
    name: "69",
    altName: "69",
    fullName: "69",
    intervals: [0, 4, 7, 14, 21],
    description:
      "6th with added 9th. This is sometimes notated as a slash chord in the form ``6/9''.",
  },
  {
    name: "+9M7",
    altName: "+9M7",
    fullName: "+9M7",
    intervals: [0, 4, 8, 11, 14],
    description: "An augmented chord [raised 5th) with a major 7th and 9th.",
  },
  {
    name: "min#7",
    altName: "min#7",
    fullName: "min#7",
    intervals: [0, 3, 7, 11],
    description: "Minor Triad plus Major 7th.",
  },
  {
    name: "m7sus",
    altName: "m7sus",
    fullName: "m7sus",
    intervals: [0, 3, 5, 7, 10],
    description: "Minor suspended 4th, minor triad plus 4th and dominant 7th.",
  },
  {
    name: "7+5",
    altName: "7+5",
    fullName: "7+5",
    intervals: [0, 4, 8, 10],
    description: "An augmented chord [raised 5th) with a dominant 7th.",
  },
  {
    name: "dim7(addM7)",
    altName: "dim7(addM7)",
    fullName: "dim7(addM7)",
    intervals: [0, 3, 6, 9, 11],
    description: "Diminished tirad with added Major 7th.",
  },
  {
    name: "m+",
    altName: "m+",
    fullName: "m+",
    intervals: [0, 3, 8],
    description: "Minor triad with augmented 5th.",
  },
  {
    name: "m7",
    altName: "m7",
    fullName: "m7",
    intervals: [0, 3, 7, 10],
    description: "Minor 7th [flat 3rd plus dominant 7th).",
  },
  {
    name: "m6",
    altName: "m6",
    fullName: "m6",
    intervals: [0, 3, 7, 9],
    description: "Minor 6th [flat 3rd plus a 6th).",
  },
  {
    name: "6",
    altName: "6",
    fullName: "6",
    intervals: [0, 4, 7, 9],
    description: "Major tiad with added 6th.",
  },
  {
    name: "(addb9)",
    altName: "(addb9)",
    fullName: "(addb9)",
    intervals: [0, 4, 7, 13],
    description: "Major chord plus flat 9th [no 7th.)",
  },
  {
    name: "m9",
    altName: "m9",
    fullName: "m9",
    intervals: [0, 3, 7, 10, 14],
    description: "Minor triad plus 7th and 9th.",
  },
  {
    name: "7#9b13",
    altName: "7#9b13",
    fullName: "7#9b13",
    intervals: [0, 4, 7, 10, 15, 20],
    description: "7th with sharp 9th and flat 13th.",
  },
  {
    name: "+7#9",
    altName: "+7#9",
    fullName: "+7#9",
    intervals: [0, 4, 8, 10, 15],
    description:
      "An augmented chord [raised 5th) with a dominant 7th and sharp 9th.",
  },
  {
    name: "M#11",
    altName: "M#11",
    fullName: "M#11",
    intervals: [0, 4, 7, 11, 18],
    description: "Major triad plus sharp 11th.",
  },
  {
    name: "M7#5",
    altName: "M7#5",
    fullName: "M7#5",
    intervals: [0, 4, 8, 11],
    description: "Major 7th with sharp 5th.",
  },
  {
    name: "+7b9#11",
    altName: "+7b9#11",
    fullName: "+7b9#11",
    intervals: [0, 4, 8, 10, 13, 18],
    description: "Augmented 7th with flat 9th and sharp 11th.",
  },
  {
    name: "m7(omit5)",
    altName: "m7(omit5)",
    fullName: "m7(omit5)",
    intervals: [0, 3, 10],
    description: "Minor 7th with unvoiced 5th.",
  },
  {
    name: "m+7#9",
    altName: "m+7#9",
    fullName: "m+7#9",
    intervals: [0, 3, 8, 10, 15],
    description: "Augmented minor 7 plus sharp 9th.",
  },
  {
    name: "mb9",
    altName: "mb9",
    fullName: "mb9",
    intervals: [0, 3, 7, 13],
    description: "Minor chord plus flat 9th [no 7th.)",
  },
  {
    name: "m+7b9#11",
    altName: "m+7b9#11",
    fullName: "m+7b9#11",
    intervals: [0, 3, 8, 10, 13, 18],
    description: "Augmented minor 7th with flat 9th and sharp 11th.",
  },
  {
    name: "mb5",
    altName: "mb5",
    fullName: "mb5",
    intervals: [0, 3, 6],
    description: "Minor triad with flat 5th [aka dim).",
  },
  {
    name: "7#11",
    altName: "7#11",
    fullName: "7#11",
    intervals: [0, 4, 7, 10, 18],
    description: "7th plus sharp 11th [9th omitted).",
  },
  {
    name: "maj13",
    altName: "maj13",
    fullName: "maj13",
    intervals: [0, 4, 7, 11, 21],
    description:
      "Major 7th [including 5th) plus 13th [9th and  11th not voiced).",
  },
  {
    name: "m7b5b9",
    altName: "m7b5b9",
    fullName: "m7b5b9",
    intervals: [0, 3, 6, 10, 13],
    description: "Minor 7th with flat 5th and flat 9th.",
  },
  {
    name: "11",
    altName: "11",
    fullName: "11",
    intervals: [0, 0, 7, 10, 14, 17],
    description: "9th chord plus 11th [3rd not voiced).",
  },
  {
    name: "13",
    altName: "13",
    fullName: "13",
    intervals: [0, 4, 7, 10, 21],
    description:
      "7th [including 5th) plus 13th [the 9th and 11th are not voiced).",
  },
  {
    name: "9-5",
    altName: "9-5",
    fullName: "9-5",
    intervals: [0, 4, 6, 10, 14],
    description: "7th plus 9th with flat 5th.",
  },
  {
    name: "msus4",
    altName: "msus4",
    fullName: "msus4",
    intervals: [0, 3, 5, 7],
    description: "Minor suspended 4th, minor triad plus 4th.",
  },
  {
    name: "9b5",
    altName: "9b5",
    fullName: "9b5",
    intervals: [0, 4, 6, 10, 14],
    description: "7th plus 9th with flat 5th.",
  },
  {
    name: "9b6",
    altName: "9b6",
    fullName: "9b6",
    intervals: [0, 4, 8, 14],
    description: "9th with flat 6 [no 5th or 7th).",
  },
  {
    name: "M11",
    altName: "M11",
    fullName: "M11",
    intervals: [0, 4, 7, 11, 14, 17],
    description: "Major 9th plus 11th.",
  },
  {
    name: "11b9",
    altName: "11b9",
    fullName: "11b9",
    intervals: [0, 4, 7, 10, 13, 17],
    description: "7th chord plus flat 9th and 11th.",
  },
  {
    name: "M13",
    altName: "M13",
    fullName: "M13",
    intervals: [0, 4, 7, 11, 21],
    description:
      "Major 7th [including 5th) plus 13th [9th and  11th not voiced).",
  },
  {
    name: "13b5",
    altName: "13b5",
    fullName: "13b5",
    intervals: [0, 4, 6, 10, 20],
    description:
      "7th with flat 5th,  plus 13th [the 9th and 11th are not voiced).",
  },
  {
    name: "7b9#11",
    altName: "7b9#11",
    fullName: "7b9#11",
    intervals: [0, 4, 7, 10, 13, 18],
    description: "7th plus flat 9th and sharp 11th.",
  },
  {
    name: "m7(add11)",
    altName: "m7(add11)",
    fullName: "m7(add11)",
    intervals: [0, 3, 7, 10, 17],
    description: "Minor 7th  plus 11th.",
  },
  {
    name: "M7#11",
    altName: "M7#11",
    fullName: "M7#11",
    intervals: [0, 4, 7, 11, 18],
    description: "Major 7th plus sharp 11th [9th omitted).",
  },
  {
    name: "m(maj7)",
    altName: "m(maj7)",
    fullName: "m(maj7)",
    intervals: [0, 3, 7, 11],
    description: "Minor Triad plus Major 7th.",
  },
  {
    name: "9+",
    altName: "9+",
    fullName: "9+",
    intervals: [0, 4, 8, 10, 14],
    description: "7th plus 9th with sharp 5th [same as aug9).",
  },
  {
    name: "m7omit5",
    altName: "m7omit5",
    fullName: "m7omit5",
    intervals: [0, 3, 10],
    description: "Minor 7th with unvoiced 5th.",
  },
  {
    name: "dim3",
    altName: "dim3",
    fullName: "dim3",
    intervals: [0, 3, 6],
    description: "Diminished triad [non-standard notation).",
  },
  {
    name: "aug9",
    altName: "aug9",
    fullName: "aug9",
    intervals: [0, 4, 8, 10, 14],
    description: "7th plus 9th with sharp 5th [same as aug9).",
  },
  {
    name: "dim7",
    altName: "dim7",
    fullName: "dim7",
    intervals: [0, 3, 6, 9],
    description: "Diminished seventh.",
  },
  {
    name: "sus(addb9)",
    altName: "sus(addb9)",
    fullName: "sus(addb9)",
    intervals: [0, 5, 7, 13],
    description:
      "Suspended 4th, major triad with the 3rd raised half tone plus flat 9th.",
  },
  {
    name: "m9#11",
    altName: "m9#11",
    fullName: "m9#11",
    intervals: [0, 3, 7, 10, 14, 18],
    description: "Minor 7th plus 9th and sharp 11th.",
  },
  {
    name: "aug7",
    altName: "aug7",
    fullName: "aug7",
    intervals: [0, 4, 8, 10],
    description: "An augmented chord [raised 5th) with a dominant 7th.",
  },
  {
    name: "M7+5",
    altName: "M7+5",
    fullName: "M7+5",
    intervals: [0, 4, 8, 11],
    description: "Major 7th with sharp 5th.",
  },
  {
    name: "m11b5",
    altName: "m11b5",
    fullName: "m11b5",
    intervals: [0, 3, 6, 10, 14, 17],
    description: "Minor 7th with flat 5th plus 11th.",
  },
  {
    name: "m7(#9)",
    altName: "m7(#9)",
    fullName: "m7(#9)",
    intervals: [0, 3, 7, 10, 15],
    description: "Minor 7th with added sharp 9th.",
  },
  {
    name: "(b5)",
    altName: "(b5)",
    fullName: "(b5)",
    intervals: [0, 4, 6],
    description: "Major triad with flat 5th.",
  },
  {
    name: "7#9#11",
    altName: "7#9#11",
    fullName: "7#9#11",
    intervals: [0, 4, 7, 10, 15, 18],
    description: "7th plus sharp 9th and sharp 11th.",
  },
  {
    name: "7(add13)",
    altName: "7(add13)",
    fullName: "7(add13)",
    intervals: [0, 4, 7, 10, 21],
    description: "7th with added 13th.",
  },
  {
    name: "m(add9)",
    altName: "m(add9)",
    fullName: "m(add9)",
    intervals: [0, 3, 7, 14],
    description: "Minor triad plus 9th [no 7th).",
  },
  {
    name: "5",
    altName: "5",
    fullName: "5",
    intervals: [0, 0, 7, 7],
    description: "Altered Fifth or Power Chord; root and 5th only.",
  },
  {
    name: "maj9",
    altName: "maj9",
    fullName: "maj9",
    intervals: [0, 4, 7, 11, 14],
    description: "Major 7th plus 9th.",
  },
  {
    name: "9",
    altName: "9",
    fullName: "9",
    intervals: [0, 4, 7, 10, 14],
    description: "7th plus 9th.",
  },
  {
    name: "+7",
    altName: "+7",
    fullName: "+7",
    intervals: [0, 4, 8, 10],
    description: "An augmented chord [raised 5th) with a dominant 7th.",
  },
  {
    name: "maj7",
    altName: "maj7",
    fullName: "maj7",
    intervals: [0, 4, 7, 11],
    description: "Major 7th.",
  },
  {
    name: "aug7#9",
    altName: "aug7#9",
    fullName: "aug7#9",
    intervals: [0, 4, 8, 10, 15],
    description:
      "An augmented chord [raised 5th) with a dominant 7th and sharp 9th.",
  },
  {
    name: "7b5#9",
    altName: "7b5#9",
    fullName: "7b5#9",
    intervals: [0, 4, 6, 10, 15],
    description: "7th with flat 5th and sharp 9th.",
  },
  {
    name: "omit3add9",
    altName: "omit3add9",
    fullName: "omit3add9",
    intervals: [0, 0, 7, 14],
    description: "Triad: root, 5th and 9th.",
  },
  {
    name: "M7b5",
    altName: "M7b5",
    fullName: "M7b5",
    intervals: [0, 4, 6, 11],
    description: "Major 7th with a flat 5th.",
  },
  {
    name: "9#11",
    altName: "9#11",
    fullName: "9#11",
    intervals: [0, 4, 7, 10, 14, 18],
    description: "7th plus 9th and sharp 11th.",
  },
  {
    name: "7alt",
    altName: "7alt",
    fullName: "7alt",
    intervals: [0, 4, 6, 10, 13],
    description:
      "Uses a 7th flat 5, flat 9. Probably not correct, but works [mostly).",
  },
  {
    name: "sus2",
    altName: "sus2",
    fullName: "sus2",
    intervals: [0, 2, 7],
    description:
      "Suspended 2nd, major triad with the major 2nd above the root substituted for 3rd.",
  },
  {
    name: "sus4",
    altName: "sus4",
    fullName: "sus4",
    intervals: [0, 5, 7],
    description: "Suspended 4th, major triad with the 3rd raised half tone.",
  },
  {
    name: "sus9",
    altName: "sus9",
    fullName: "sus9",
    intervals: [0, 5, 7, 10, 14],
    description: "7sus plus 9th.",
  },
  {
    name: "aug9M7",
    altName: "aug9M7",
    fullName: "aug9M7",
    intervals: [0, 4, 8, 11, 14],
    description: "An augmented chord [raised 5th) with a major 7th and 9th.",
  },
  {
    name: "7(6)",
    altName: "7(6)",
    fullName: "7(6)",
    intervals: [0, 4, 7, 9, 10],
    description: "7th with added 6th.",
  },
  {
    name: "m7#9",
    altName: "m7#9",
    fullName: "m7#9",
    intervals: [0, 3, 7, 10, 15],
    description: "Minor 7th with added sharp 9th.",
  },
  {
    name: "m7#5",
    altName: "m7#5",
    fullName: "m7#5",
    intervals: [0, 4, 8, 10],
    description: "Minor 7th with sharp 5th.",
  },
  {
    name: "m69",
    altName: "m69",
    fullName: "m69",
    intervals: [0, 3, 7, 14, 21],
    description: "Minor 6th with added 9th.",
  },
  {
    name: "9#5",
    altName: "9#5",
    fullName: "9#5",
    intervals: [0, 4, 8, 10, 14],
    description: "7th plus 9th with sharp 5th [same as aug9).",
  },
  {
    name: "6(add9)",
    altName: "6(add9)",
    fullName: "6(add9)",
    intervals: [0, 4, 7, 14, 21],
    description: "6th with added 9th.",
  },
  {
    name: "7sus4",
    altName: "7sus4",
    fullName: "7sus4",
    intervals: [0, 5, 7, 10],
    description:
      "7th with suspended 4th, dominant 7th with 3rd raised half tone.",
  },
  {
    name: "7sus2",
    altName: "7sus2",
    fullName: "7sus2",
    intervals: [0, 2, 7, 10],
    description: "A sus2 with dominant 7th added.",
  },
  {
    name: "9+5",
    altName: "9+5",
    fullName: "9+5",
    intervals: [0, 4, 8, 10, 14],
    description: "7th plus 9th with sharp 5th [same as aug9).",
  },
];

// Convert a list of note values to a Set with range 0..11
export function normalize(chord: number[]) {
  return new Set(chord.map((a) => ((a % 12) + 12) % 12));
}

// Convert a list of note values (array or Set) to a string
function nl2s(s: number[] | Set<number>) {
  const noteArray = Array.from(s);
  return noteArray.map((x) => NOTES[x]);
}

export const COLORS = [
  "#4A90E2",
  "#50C878",
  "#9B59B6",
  "#E74C3C",
  "#F39C12",
  "#1ABC9C",
  "#34495E",
  "#7F8C8D",
];

// Helper function to find index in Stradella layout
export function findStradellaIndex(note: string): number {
  return STRADELLA_NOTES.findIndex((n) => n === note);
}

export function findCounterStradellaIndex(note: string): number {
  return COUNTERBASS_STRADELLA_NOTES.findIndex((n) => n === note);
}

export function getButtonCombinations(
  root: string,
  chordType: ChordType,
): ButtonCombination[] {
  const rootIndex = findStradellaIndex(root);
  if (rootIndex === -1) return [];

  let chordNotes = CHORD_TYPES.find(
    (chord) => chord.name === chordType.name,
  )?.intervals;

  if (!chordNotes) {
    chordNotes = CHORD_TYPES[0].intervals;
  }
  const searchNotes = chordNotes.map((x) => x + KEYS[root]);
  const normalizedNotes = normalize(searchNotes);
  const normalizedNotesStr = nl2s(normalizedNotes);

  let combinations = [];
  // First pass: collect all matching patterns
  for (const [buttonName, buttonNotes] of Object.entries(BUTTONS)) {
    // Check if all button notes are in the search notes
    const isSubset = Array.from(buttonNotes).every((note) =>
      normalizedNotes.has(note),
    );
    if (isSubset) {
      const missingNotes = Array.from(normalizedNotes).filter(
        (x) => !buttonNotes.has(x),
      );

      let [rootButton, chordTypeButton] = buttonName.split(",");
      let offset: number;
      let chordTypeString: string;
      switch (chordTypeButton) {
        // button offset for getting the correct row for the chord button //
        case "m":
          offset = 20;
          chordTypeString = "Minor";
          break;
        case "7":
          offset = 40;
          chordTypeString = "Dominant 7";
          break;
        case "d":
          offset = 60;
          chordTypeString = "Diminished 7";
          break;
        default: // Major
          offset = 0;
          chordTypeString = "Major";
      }
      // const currentIndex = findStradellaIndex(rootButton);
      const roots = findEquivNotes(root).sort((a, b) => a.length - b.length);
      const rootsIndex = roots.map((n) => findStradellaIndex(n)).filter((i) => i>=0);
      const baseNotes = findEquivNotes(rootButton).sort(
        (a, b) => a === root ? -1 : b === root ? 1 : a.length - b.length,
      );
      const missingNotesStr = nl2s(missingNotes);
      const baseNotesIndex = baseNotes
        .map((n) => findEquivNotes(n))
        .flat()
        .map((n) => findStradellaIndex(n))
        .filter((i) => i >= 0);
      const missingNotesIndex = missingNotesStr.map((n) => findEquivNotes(n)).flat()
      let combination: ButtonCombination = {
        bass: Array.from(new Set(baseNotesIndex)),
        bassNote: baseNotes,
        chord: baseNotesIndex.map((i) => i + offset),
        root: roots,
        rootIndex: Array.from(new Set(rootsIndex)),
        chordType: chordTypeString,
        notes: nl2s(buttonNotes),
        missingNotesBass: missingNotesIndex.map((n) => findStradellaIndex(n)),
        missingNotesCounterbass: missingNotesIndex.map((n) => findCounterStradellaIndex(n)),
        missingNotesStr: missingNotesStr,
        missingCount: missingNotes.length,
        color: "" // should be replaced
      };
      console.log(
        `Button ${rootButton}${chordTypeButton}, index ${rootIndex} has: ${combination.notes.join(" ")}; missing: ${combination.missingNotesStr.join(" ") || "None"}`,
      );

      combinations.push(combination);
    }
  }

  // Sort the display order
  combinations = combinations.sort((a, b) => {
    if (
      a.rootIndex.join(" ") === a.bass.join(" ") &&
      b.rootIndex.join(" ") !== b.bass.join(" ")
    ) {
      return -1;
    } else if (
      a.rootIndex.join(" ") !== a.bass.join(" ") &&
      b.rootIndex.join(" ") === b.bass.join(" ")
    ) {
      return 1;
    } else {
      return a.missingCount - b.missingCount;
    }
  });
  combinations.forEach((combination, index) => {
    combination.color = COLORS[index % COLORS.length];
  });

  if (combinations.length === 0) {
    const searchNotes = chordType.intervals.map((x) => x + KEYS[root] + 1);
    const missingNotes = Array.from(normalize(searchNotes));
    const normalizedNotesStr = nl2s(normalizedNotes);
  
    // const intervals = normalize(chordType.intervals.map(x => x + KEYS[root]));
    const missingNotesAll = searchNotes.map((i) => findEquivNotes(STRADELLA_NOTES[i])).flat();
    const missingNotesIndex = missingNotesAll.map((n) => findStradellaIndex(n))
    const missingNotesCounter = missingNotesAll.map((n) => findCounterStradellaIndex(n));
    const baseNotes = findEquivNotes(root);
    const baseNotesIndex = baseNotes.map((n) => findStradellaIndex(n));
    
    combinations.push({
      bass: baseNotesIndex,
      bassNote: baseNotes,
      chord: baseNotesIndex,
      root: [root],
      rootIndex: baseNotesIndex,
      chordType: "",
      notes: [],
      missingNotesBass: missingNotesIndex,
      missingNotesCounterbass: missingNotesCounter,
      missingNotesStr: normalizedNotesStr,
      missingCount: missingNotes.length,
      color: COLORS[0]
    });
  }

  return combinations;
}
