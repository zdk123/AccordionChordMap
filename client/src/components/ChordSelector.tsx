import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { STRADELLA_NOTES, CHORD_TYPES } from "@/lib/chords";

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
  onTypeChange,
}: ChordSelectorProps) {
  const [openRoot, setOpenRoot] = React.useState(false);
  const [openType, setOpenType] = React.useState(false);

  return (
    <div className="flex gap-4 items-center justify-center mb-8">
      <Popover open={openRoot} onOpenChange={setOpenRoot}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={openRoot}
            className="w-[100px] justify-between"
          >
            {selectedRoot}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[100px] p-0">
          <Command>
            <CommandInput placeholder="Search root..." />
            <CommandEmpty>No root found.</CommandEmpty>
            <ScrollArea className="h-[200px]">
              <CommandGroup>
                {STRADELLA_NOTES.map((note) => (
                  <CommandItem
                    key={note}
                    value={note}
                    onSelect={(currentValue) => {
                      onRootChange(currentValue);
                      setOpenRoot(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedRoot === note ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {note}
                  </CommandItem>
                ))}
              </CommandGroup>
            </ScrollArea>
          </Command>
        </PopoverContent>
      </Popover>

      <Popover open={openType} onOpenChange={setOpenType}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={openType}
            className="w-[180px] justify-between"
          >
            {selectedType}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[180px] p-0">
          <Command>
            <CommandInput placeholder="Search chord type..." />
            <CommandEmpty>No chord type found.</CommandEmpty>
            <ScrollArea className="h-[300px]">
              <CommandGroup>
                {CHORD_TYPES.map((type) => (
                  <CommandItem
                    key={type.name}
                    value={type.name}
                    onSelect={(currentValue) => {
                      onTypeChange(currentValue);
                      setOpenType(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedType === type.name ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {type.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </ScrollArea>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}