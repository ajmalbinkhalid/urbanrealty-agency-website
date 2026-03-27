import AddIcon from "@public/icons/add-icon.svg";
import CommonButton from "../../_components/custom-components/common-button";
import MyListingsCard from "./_components/my-listings-card";

const page = () => (
  <div>
    <div className="clamp-[mb,1.5rem,1.625rem] flex items-center justify-between">
      <h1 className="clamp-[text,1rem,1.5rem] font-jost font-medium text-[#1800AD]">
        My Listings
      </h1>

      <CommonButton image={AddIcon} title="List your property" />
    </div>
    <div className="">
      <MyListingsCard />
    </div>
  </div>
);

export default page;

