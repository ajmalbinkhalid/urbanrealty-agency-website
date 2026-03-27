"use client";

import { Search } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { cn } from "@/lib/utils";

const SearchByName = ({
  value,
  onChange,
  className
}: {
  value: string;
  onChange: (v: string) => void;className?:string
}) => (
  <div className={cn("",className)}>
    <InputGroup className="h-[46px] rounded-[6px] border border-[#6254B4] bg-white">
      <InputGroupAddon align="inline-start" />
      <Search className="h-4 w-4 text-[#6254B4]" />
      <InputGroupInput
        className="font-jost text-[#2C3A61] text-[14px] placeholder:text-[#6254B4]"
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by name"
        value={value}
      />
    </InputGroup>
  </div>
);

export default SearchByName;
