import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { VerificationStatusEnum } from "@/utils/enum";

type Props = {
  setStatus: (filter: string) => void;
  status: string;
};

const SearchByStatus = ({ status, setStatus }: Props) => {
  return (
    <Select onValueChange={setStatus} value={status}>
      <SelectTrigger className="max-md:w-full">
        <SelectValue placeholder="Search by status" />
      </SelectTrigger>

      <SelectContent className="z-[200]" position="popper">
        <SelectItem value={String(VerificationStatusEnum.Published)}>
          Published
        </SelectItem>
        <SelectItem value={String(VerificationStatusEnum.Verification_Pending)}>
          Verification Pending
        </SelectItem>
        <SelectItem value={String(VerificationStatusEnum.Rejected)}>
          Rejected
        </SelectItem>
        <SelectItem value={String(VerificationStatusEnum.Draft)}>
          Draft
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SearchByStatus;
