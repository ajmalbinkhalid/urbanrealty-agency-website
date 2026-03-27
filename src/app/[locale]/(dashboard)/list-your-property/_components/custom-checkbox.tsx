"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import { frontendApi } from "@/api/frontend-api";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

export type CheckboxOption = {
  id: string | number;
  name: string;
  icon?: React.ReactNode;
};

type CustomCheckboxProps = {
  selectedValues: (string | number)[];
  onValueChange: (values: (string | number)[]) => void;
  error?: string;
  disabled?: boolean;
};

const CustomCheckbox = ({
  selectedValues,
  onValueChange,
  error,
  disabled = false,
}: CustomCheckboxProps) => {
  const { data: displayOptions, isLoading } = useQuery({
    queryKey: ["amenities"],
    queryFn: frontendApi.getAmenities,
    staleTime: 5 * 60 * 1000, // 5 minutes
    select: (data) =>
      data.data.amenities.map((amenity) => ({
        id: amenity._id,
        name: amenity.name,
        icon: amenity.icon,
      })),
  });

  const handleChange = React.useCallback(
    (id: string | number, checked: boolean) => {
      if (checked) {
        onValueChange([...selectedValues, id]);
      } else {
        onValueChange(
          selectedValues.filter((v) => v !== id && String(v) !== String(id))
        );
      }
    },
    [selectedValues, onValueChange]
  );

  return (
    <div className="w-full space-y-2">
      {isLoading && (
        <div className="py-6 text-center text-gray-500 text-sm">
          Loading amenities...
        </div>
      )}

      {!isLoading && displayOptions?.length === 0 && (
        <div className="py-6 text-center text-gray-500 text-sm">
          No amenities available
        </div>
      )}

      {!isLoading && (displayOptions?.length ?? 0) > 0 && (
        <div
          className={cn(
            "flex flex-wrap gap-3 sm:grid-cols-2 md:grid md:grid-cols-3 lg:grid-cols-4"
          )}
        >
          {displayOptions?.map((option) => {
            const isChecked = selectedValues.some(
              (v) => v === option.id || String(v) === String(option.id)
            );

            return (
              <label
              className={cn(
                  "clamp-[p,1rem,1.5625rem] relative flex cursor-pointer items-center justify-center rounded-[.375rem] border transition-all",
                  isChecked
                    ? "border-[#6254B4] bg-[#6254B4]/9"
                    : "border-[#6254B4] bg-[#F9F9FF] hover:border-gray-400"
                )}
                htmlFor={`checkbox-${option.id}`}
                key={option.id}
              >
                <div className="absolute top-2.5 left-2.5 max-md:hidden">
                  <Checkbox
                    checked={isChecked}
                    className={cn("border-[#1800AD] bg-white", {
                      "data-[state=checked]:border-[#FF6B35] data-[state=checked]:bg-[#6254B4]":
                        isChecked,
                    })}
                    disabled={disabled}
                    id={`checkbox-${option.id}`}
                    onCheckedChange={(checked) =>
                      handleChange(option.id, checked as boolean)
                    }
                  />
                </div>
                <div className="clamp-[gap,10px,12px] flex items-center text-center md:flex-col">
                  {option.icon && (
                    <Image
                      alt={option.name}
                      className="clamp-[size,1.25rem,2.5rem]"
                      height={25}
                      src={option.icon}
                      width={25}
                    />
                  )}
                  <span
                    className={cn(
                      "cursor-pointer font-medium text-[#81818B] text-[.875rem]",
                      {
                        "font-semibold text-[#6254B4]": isChecked,
                      }
                    )}
                  >
                    {option.name}
                  </span>
                </div>
              </label>
            );
          })}
        </div>
      )}

      {error && <p className="mt-1 text-[.75rem] text-red-500">{error}</p>}
    </div>
  );
};

CustomCheckbox.displayName = "CustomCheckbox3";

export default CustomCheckbox;
