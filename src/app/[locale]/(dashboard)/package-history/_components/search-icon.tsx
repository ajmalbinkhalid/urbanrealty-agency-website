import { Search } from "lucide-react";

const SearchIcon = () => (
  <button
    aria-label="Search"
    className="flex h-[44px] w-[44px] items-center justify-center rounded-[6px] bg-[#2600D9] transition-colors hover:bg-[#1f00b3] focus:outline-none focus:ring-2 focus:ring-[#2600D9]/50"
    type="button"
  >
    <Search className="h-5 w-5 text-white" />
  </button>
);

export default SearchIcon;
