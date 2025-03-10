import { CHORD_TYPES, type ButtonCombination } from "@/lib/chords";
import { prettifyAccidentals } from "./AccordionLayout";

interface ChordNotesProps {
  root: string;
  type: string;
  combination: ButtonCombination[];
}

export function ChordNotes({ root, type, combination }: ChordNotesProps) {
  const chordType = CHORD_TYPES.find((t) => t.name === type);
  if (!chordType) return null;

  if (combination.length === 0) return (
    <div className="mt-6">
      <div className="text-center mb-1 p-1 bg-gray-50 rounded-lg">
        <h3 className="text-xl font-semibold mb-1">
        {prettifyAccidentals(root)} {chordType.fullName}
        </h3>
        <p className="text-gray-600">{chordType.description}</p>
        <p className="text-gray-600">No valid chords found</p>
      </div>
    </div>
    );

  return (
    <div className="mt-6">
      <div className="text-center mb-1 p-1 bg-gray-50 rounded-lg">
        <h3 className="text-xl font-semibold mb-1">
        {prettifyAccidentals(root)} {chordType.fullName}
        </h3>
        <p className="text-gray-600">{chordType.description}</p>
      </div>

      {combination.some(combo => combo.chordType !== "") && (
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Chord Name</th>
              <th className="px-4 py-2">Notes in Chord</th>
              <th className="px-4 py-2">Missing Notes</th>
            </tr>
          </thead>
        </table>
      )}
      <table className="min-w-full">
        <tbody>
          {combination.map((combo, index) => (
            combo.chordType === "" ? (
              <tr key={index}>
                <td className="px-4 py-2" colSpan={3}>
                  <div className="flex flex-wrap justify-center items-center">
                    {combo.missingNotesStr.length === 0 ? (
                      <div
                        className="px-2 py-1 rounded-md text-white font-small text-md"
                        style={{ backgroundColor: "lightgray" }}
                      >
                        None
                      </div>
                    ) : (
                      combo.missingNotesStr.map((note, i) => (
                        <div
                          key={i}
                          className="px-2 py-1 rounded-md text-white font-small text-md"
                          style={{
                            borderColor: combo.color,
                            borderWidth: 3,
                            backgroundColor: "lightgray",
                          }}
                        >
                          {prettifyAccidentals(note)}
                        </div>
                      ))
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              <tr key={index}>
                <td className="px-4 py-2">
                  <div
                    className="px-4 py-2 rounded-md text-white font-small text-md"
                    style={{ backgroundColor: combo.color }}
                  >
                    {prettifyAccidentals(combo.bassNote[0])} {combo.chordType}
                  </div>
                </td>
                <td className="px-4 py-2">
                  <div className="flex flex-wrap justify-center items-center">
                    {combo.notes.map((note, i) => (
                      <div
                        key={i}
                        className="px-4 py-2 rounded-md text-white font-small text-md"
                        style={{ backgroundColor: combo.color }}
                      >
                        {prettifyAccidentals(note)}
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-2">
                  <div className="flex flex-wrap justify-center items-center">
                    {combo.missingNotesStr.length === 0 ? (
                      <div
                        className="px-2 py-1 rounded-md text-white font-small text-md"
                        style={{ backgroundColor: "lightgray" }}
                      >
                        None
                      </div>
                    ) : (
                      combo.missingNotesStr.map((note, i) => (
                        <div
                          key={i}
                          className="px-2 py-1 rounded-md text-white font-small text-md"
                          style={{
                            borderColor: combo.color,
                            borderWidth: 3,
                            backgroundColor: "lightgray",
                          }}
                        >
                          {prettifyAccidentals(note)}
                        </div>
                      ))
                    )}
                  </div>
                </td>
              </tr>
            )
          ))}
        </tbody>
      </table>
    </div>
  );
}