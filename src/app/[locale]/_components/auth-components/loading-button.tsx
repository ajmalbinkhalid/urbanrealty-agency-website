import { RotateCw } from "lucide-react";

type props = {
  handleLoading?: () => void;
};

const LoadingButton = ({ handleLoading }: props) => (
  <button
    aria-label="Refresh"
    className="flex h-[44px] md:w-[44px] text-white max-md:px-[12px] gap-2 items-center justify-center rounded-[6px] bg-[#6254B4] transition-colors hover:bg-[#524498] focus:outline-none focus:ring-2 focus:ring-[#6254B4]/50"
    onClick={handleLoading}
    type="button"
  >
    <RotateCw className="h-5 w-5 text-white"  /><span className="md:hidden">Reset</span>
  </button>
);

export default LoadingButton;
