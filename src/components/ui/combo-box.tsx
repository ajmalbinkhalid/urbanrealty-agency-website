"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { forwardRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type ComboBoxOption = {
  id?: string;
  value: string;
  label: string;
  searchValue?: string;
};

type ComboBoxProps = {
  options: ComboBoxOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  disabled?: boolean;
};

const ComboBox = forwardRef<HTMLButtonElement, ComboBoxProps>(
  (
    {
      options,
      value,
      onChange,
      placeholder = "Select an option...",
      searchPlaceholder = "Search...",
      disabled = false,
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);
    const selectedOption = options.find((option) => option.value === value);

    const handleSelect = (selectedValue: string) => {
      onChange(selectedValue);
      setOpen(false);
    };

    return (
      <Popover onOpenChange={setOpen} open={open}>
        <PopoverTrigger asChild>
          <Button
            aria-expanded={open}
            className="h-auto cursor-pointer justify-between p-0!"
            disabled={disabled}
            ref={ref}
            role="combobox"
            variant="link"
          >
            <span className="truncate font-medium text-sm">
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-full p-0">
          <Command>
            <CommandInput placeholder={searchPlaceholder} />
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandList>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.id ?? option.value}
                    onSelect={() => handleSelect(option.value)}
                    value={option.searchValue ?? option.value}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === option.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);
ComboBox.displayName = "ComboBox";

export default ComboBox;
