import { CHORD_TYPES, getChordNotes, type ButtonCombination } from '@/lib/chords';

interface ChordNotesProps {
  root: string;
  type: string;
  combination: ButtonCombination;
}

export function ChordNotes({ root, type, combination }: ChordNotesProps) {
  const chordType = CHORD_TYPES.find(t => t.name === type);
  if (!chordType) return null;

  return (
    <div className="mt-6 text-center">
      <h3 className="text-xl font-semibold mb-4">Notes in this combination:</h3>
      <div className="flex gap-4 justify-center items-center">
        {combination.notes.map((note, i) => (
          <div
            key={i}
            className="px-4 py-2 rounded-lg text-white font-medium text-lg"
            style={{ backgroundColor: combination.color }}
          >
            {note}
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-gray-600">
        {chordType.fullName} chord
      </p>
    </div>
  );
}