import { CHORD_TYPES, type ButtonCombination } from '@/lib/chords';

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
        {chordType.intervals.map((interval, i) => (
          <div
            key={interval}
            className="px-4 py-2 rounded-lg text-white font-medium text-lg"
            style={{ backgroundColor: combination.color }}
          >
            {root}
          </div>
        ))}
      </div>
    </div>
  );
}
