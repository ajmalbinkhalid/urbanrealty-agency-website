import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PropertyCategoryEnum } from "@/utils/enum";

type Props = {
  setCategory: (filter: string) => void;
  category: string;
};

const SearchByType = ({ category, setCategory }: Props) => {
  return (
    <Select onValueChange={setCategory} value={category}>
      <SelectTrigger className="max-md:w-full">
        <SelectValue placeholder="Search by type" />
      </SelectTrigger>

      <SelectContent className="z-[200]" position="popper">
        <SelectItem value={String(PropertyCategoryEnum.Commercial)}>
          Commercial
        </SelectItem>
        <SelectItem value={String(PropertyCategoryEnum.Land)}>Land</SelectItem>
        <SelectItem value={String(PropertyCategoryEnum.Residential)}>
          Residential
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SearchByType;
