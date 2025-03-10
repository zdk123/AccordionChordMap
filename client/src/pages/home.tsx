import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChordSelector } from "@/components/ChordSelector";
import { AccordionLayout } from "@/components/AccordionLayout";
import { ChordNotes } from "@/components/ChordNotes";
import { getButtonCombinations, CHORD_TYPES } from "@/lib/chords";

export default function Home() {
  const [root, setRoot] = useState("C");
  const [chordType, setChordType] = useState(CHORD_TYPES[0].name);
  const [activeCombo, setActiveCombo] = useState(0);

  const chordTypeObj = CHORD_TYPES.find((t) => t.name === chordType);
  const combinations = chordTypeObj
    ? getButtonCombinations(root, chordTypeObj)
    : [];
  // don't display more than 4 options
  const displayedCombinations = combinations.slice(0, 4);
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Alternative Chords for Stradella Bass Accordion
        </h1>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <ChordSelector
              selectedRoot={root}
              selectedType={chordType}
              onRootChange={setRoot}
              onTypeChange={setChordType}
            />

            <AccordionLayout combinations={displayedCombinations} />
            {/* combinations[activeCombo] &&  */}
            {(
              <ChordNotes
                root={root}
                type={chordType}
                combination={displayedCombinations}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
