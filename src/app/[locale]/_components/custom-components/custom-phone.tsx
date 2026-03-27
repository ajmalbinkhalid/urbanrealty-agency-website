"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { COUNTRY_DIAL_CODES } from "@/lib/country-dial-codes";
import { cn } from "@/lib/utils";

type FormPhoneProps = {
  readonly?: boolean;
  label?: string;
  error?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  defaultValue?: string;
  isRTL?: boolean;
  value?: { phoneCode: string; phoneNumber: string };
  onChange?: (val: { phoneCode: string; phoneNumber: string }) => void;
};

export function FormPhone({
  label,
  error,
  disabled,
  readonly,
  required,
  placeholder,
  isRTL,
  defaultValue,
  value,
  onChange,
}: FormPhoneProps) {
  const safeValue = {
    phoneCode: value?.phoneCode ?? "",
    phoneNumber: value?.phoneNumber ?? "",
  };

  const t = useTranslations("countries");
  const [selectedIso, setSelectedIso] = React.useState<string | null>(null);
  const selectedOption = React.useMemo(() => {
    if (selectedIso) {
      return COUNTRY_DIAL_CODES.find((item) => item.iso === selectedIso);
    }

    return COUNTRY_DIAL_CODES.find(
      (item) => item.dialCode === safeValue.phoneCode
    );
  }, [selectedIso, safeValue.phoneCode]);

  React.useEffect(() => {
    if (!safeValue.phoneCode) {
      setSelectedIso(null);
      return;
    }

    const selectedEntry = selectedIso
      ? COUNTRY_DIAL_CODES.find((item) => item.iso === selectedIso)
      : undefined;

    if (selectedEntry?.dialCode === safeValue.phoneCode) {
      return;
    }

    const fallback = COUNTRY_DIAL_CODES.find(
      (item) => item.dialCode === safeValue.phoneCode
    );
    setSelectedIso(fallback?.iso ?? null);
  }, [safeValue.phoneCode, selectedIso]);

  const [open, setOpen] = React.useState(false);

  return (
    <div className="w-full">
      {/* Label */}
      {label && (
        <Label className="font-semibold text-[#474777] text-[.875rem]">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </Label>
      )}

      {/* Input Wrapper */}
      <div
        className={cn(
          "mt-2.5 flex w-full overflow-hidden rounded-[.375rem] border border-[#6254B4] bg-white",
          error && "border-red-500"
        )}
        dir={isRTL ? "rtl" : "ltr"}
      >
        {/* Code Selector */}
        <Popover
          onOpenChange={(v) => !disabled && setOpen(v)}
          open={disabled ? false : open}
        >
          {" "}
          <PopoverTrigger asChild>
            <button
              className={cn(
                "flex min-w-[80px] items-center justify-between gap-1 border-[#6254B4]/40 border-r px-3 py-2.5 font-medium text-[#6254B4] text-[.875rem]",
                disabled && "cursor-not-allowed opacity-50"
              )}
              disabled={disabled}
              type="button"
            >
              {selectedOption
                ? `${selectedOption.iso} (${selectedOption.dialCode})`
                : "+ Code"}
              <ChevronsUpDown className="h-3.5 w-3.5 opacity-50" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="z-[300] w-40 p-0">
            <Command>
              <CommandInput
                className="h-8 text-sm"
                placeholder="Search code..."
              />
              <CommandEmpty className="p-2 text-xs">
                No code found.
              </CommandEmpty>

              <CommandGroup>
                <CommandList>
                  {COUNTRY_DIAL_CODES.map((item) => {
                    const localizedName = t(item.iso);
                    const optionLabel = `${item.iso} (${item.dialCode})`;
                    const searchValue = `${item.iso} ${item.dialCode} ${localizedName}`;
                    const isSelected = selectedIso
                      ? selectedIso === item.iso
                      : safeValue.phoneCode === item.dialCode;

                    return (
                      <CommandItem
                        className="h-8 cursor-pointer text-sm"
                        key={item.iso}
                        onSelect={() => {
                          onChange?.({
                            ...safeValue,
                            phoneCode: item.dialCode,
                          });
                          setSelectedIso(item.iso);
                          setOpen(false);
                        }}
                        value={searchValue}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            isSelected ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {optionLabel}
                      </CommandItem>
                    );
                  })}
                </CommandList>
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>

        {/* Phone Number Input */}
        <input
          className="flex-1 px-3 py-2.5 font-medium text-[#6254B4] text-[.875rem] outline-none placeholder:text-gray-400"
          defaultValue={defaultValue}
          disabled={disabled}
          onChange={(e) =>
            onChange?.({
              ...safeValue,
              phoneNumber: e.target.value,
            })
          }
          placeholder={placeholder ?? "Phone number"}
          readOnly={readonly}
          type="text"
          value={safeValue.phoneNumber}
        />
      </div>

      {/* Error */}
      {error && <p className="mt-1 text-[.75rem] text-red-500">* {error}</p>}
    </div>
  );
}
