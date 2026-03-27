import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SearchByStatus = () => {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Search by status" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="approved">Approved</SelectItem>
        <SelectItem value="pending">Pending</SelectItem>
        <SelectItem value="rejected">Rejected</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SearchByStatus;
