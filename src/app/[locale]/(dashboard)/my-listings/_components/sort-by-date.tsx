import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  setSort: (sort: string) => void;
  sort: string;
};

const SortByDate = ({ sort, setSort }: Props) => {
  return (
    <Select  onValueChange={setSort} value={sort}>
      <SelectTrigger className="min-w-[90px]">
        <SelectValue
          placeholder={
            <>
              <span className="hidden 2xl:inline">Sort by date posted</span>
              <span className="2xl:hidden">Sort</span>
            </>
          }
        />{" "}
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="asc">Asc</SelectItem>
        <SelectItem value="desc">Desc</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SortByDate;
