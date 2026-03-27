"use client";

import { useTranslations } from "next-intl";
import { Label } from "@/components/ui/label";
import { COUNTRY_DIAL_CODES } from "@/lib/country-dial-codes";
import ComboBox from "../../../../components/ui/combo-box";
import { Input } from "../../../../components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../../../../components/ui/input-group";

type CustomInput2Props = {
  errorText?: string;
  label?: string;
  required?: boolean;
  placeholder: string;
  disabled?: boolean;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  type?: "text" | "email" | "phone";
  phoneCodeValue?: string;
  onPhoneCodeChange?: (value: string) => void;
};

const CustomInput2 = ({
  label,
  errorText,
  required,
  placeholder,
  disabled,
  inputProps,
  type = "text",
  phoneCodeValue = "+91",
  onPhoneCodeChange,
}: CustomInput2Props) => {
  const t = useTranslations("countries");

  const phoneCodeOptions = COUNTRY_DIAL_CODES.map((item) => {
    const localizedName = t(item.iso);
    const labelText = `${item.iso} (${item.dialCode})`;

    return {
      id: item.iso,
      value: item.dialCode,
      label: labelText,
      searchValue: `${item.iso} ${item.dialCode} ${localizedName}`,
    };
  });

  if (type === "phone") {
    return (
      <div className="flex-1">
        {label && (
          <Label className="font-semibold text-[#474777] text-[.875rem]">
            {label}
            {required && <span className="text-red-500"> *</span>}
          </Label>
        )}

        <InputGroup className="h-auto rounded-[.375rem] border-[#6254B4] bg-white px-4.75 py-1">
          <InputGroupAddon className="w-auto">
            <ComboBox
              disabled={disabled}
              onChange={(value) => onPhoneCodeChange?.(value)}
              options={phoneCodeOptions}
              placeholder="Select code"
              value={phoneCodeValue}
            />
          </InputGroupAddon>

          <InputGroupInput
            aria-invalid={!!errorText}
            className="ps-2.5! pe-0 font-medium text-[14px] placeholder:text-[#474777] placeholder:opacity-40"
            disabled={disabled}
            placeholder={placeholder}
            type="text"
            {...inputProps}
          />
        </InputGroup>

        {!!errorText && (
          <p className="mt-1 text-red-500 text-sm">* {errorText}</p>
        )}
      </div>
    );
  }

  return (
    <div>
      {label && (
        <Label className="mb-1 block font-medium text-[#474777] text-sm">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </Label>
      )}

      <Input
        aria-invalid={!!errorText}
        className="h-auto rounded-[.375rem] border-[#6254B4] bg-white px-5 py-3 font-medium text-[14px] shadow-none placeholder:text-[#474777] placeholder:opacity-40"
        disabled={disabled}
        placeholder={placeholder}
        type={type}
        {...inputProps}
      />

      {!!errorText && (
        <p className="mt-1 text-red-500 text-sm">* {errorText}</p>
      )}
    </div>
  );
};

export default CustomInput2;
