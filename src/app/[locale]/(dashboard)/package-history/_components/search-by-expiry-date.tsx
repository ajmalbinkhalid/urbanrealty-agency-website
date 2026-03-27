"use client";

import { Calendar} from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

const SearchById = () => (
  <div className="min-w-[200px] max-w-[240px] flex-1">
    <InputGroup className="h-[46px] rounded-[6px] border border-[#6254B4] bg-white">
      <InputGroupAddon align="inline-start">
        <Calendar className="h-5 w-5 text-[#6254B4]" />
      </InputGroupAddon>

      <InputGroupInput
        className="font-jost text-[#2C3A61] text-[14px] placeholder:text-[#6254B4]"
        placeholder="Search by expiry date"
      />
    </InputGroup>
  </div>
);

export default SearchById;
