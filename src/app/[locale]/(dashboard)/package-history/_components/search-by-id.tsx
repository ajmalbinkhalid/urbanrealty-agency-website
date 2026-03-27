"use client";

import { Search } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

const SearchById = () => (
  <div className="min-w-[200px] max-w-[240px] flex-1 md:min-w-[100px]">
    <InputGroup className="h-[46px] rounded-[6px] border border-[#6254B4] bg-white">
      <InputGroupAddon align="inline-start">
        <Search className="h-5 w-5 text-[#6254B4]" />
      </InputGroupAddon>

      <InputGroupInput
        className="font-jost text-[#2C3A61] text-[14px] placeholder:text-[#6254B4]"
        placeholder="Search by transaction ID"
      />
    </InputGroup>
  </div>
);

export default SearchById;
