import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { NOTES, CHORD_TYPES } from "@/lib/chords";

interface ChordSelectorProps {
  selectedRoot: string;
  selectedType: string;
  onRootChange: (value: string) => void;
  onTypeChange: (value: string) => void;
}

export function ChordSelector({
  selectedRoot,
  selectedType,
  onRootChange,
  onTypeChange
}: ChordSelectorProps) {
  return (
    <div className="flex gap-4 items-center justify-center mb-8">
      <Select value={selectedRoot} onValueChange={onRootChange}>
        <SelectTrigger className="w-[100px]">
          <SelectValue placeholder="Root" />
        </SelectTrigger>
        <SelectContent>
          {NOTES.map(note => (
            <SelectItem key={note} value={note}>
              {note}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedType} onValueChange={onTypeChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Chord Type" />
        </SelectTrigger>
        <SelectContent>
          {CHORD_TYPES.map(type => (
            <SelectItem key={type.name} value={type.name}>
              {type.fullName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
