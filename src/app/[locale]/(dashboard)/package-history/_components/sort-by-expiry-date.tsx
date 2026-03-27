import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SortByExpiryDate = () => {
 return (
  <Select>
    <SelectTrigger>
      <SelectValue placeholder="Sort by expiry date" />
    </SelectTrigger>

    <SelectContent>
      <SelectItem value="approved">1</SelectItem>
      <SelectItem value="pending">2</SelectItem>
      <SelectItem value="rejected">3</SelectItem>
    </SelectContent>
  </Select>
);

}
export default SortByExpiryDate;
