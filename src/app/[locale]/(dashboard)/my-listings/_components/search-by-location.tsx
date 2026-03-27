import { useQuery } from "@tanstack/react-query";
import { frontendApi } from "@/api/frontend-api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";

type Props = {
  setLocation: (filter: string) => void;
  location: string;
};

const SearchByLocation = ({ location, setLocation }: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: ["locations"],
    queryFn: () => frontendApi.getLocations(),
  });

  if (isLoading) {
    <Spinner />;
  }

  return (
    <Select onValueChange={setLocation} value={location}>
      <SelectTrigger className="max-md:w-full">
        <SelectValue placeholder="Search by location" />
      </SelectTrigger>

      <SelectContent className="z-[200]" position="popper">
        {data?.data.locations.map((item) => (
          <SelectItem key={item._id} value={item._id}>
            {item.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SearchByLocation;
