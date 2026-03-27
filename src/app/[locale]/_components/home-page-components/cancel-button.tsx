

type Props = {
  onClick?: () => void;
};
const CancelButton = ({onClick}:Props) => (
  <button
      onClick={onClick}
    
    className="clamp-[py,6px,12.5px]  flex h-fit w-full justify-center gap-[10px] hover:bg-gray-100 rounded-[6px] border border-[#1800AD] px-[15px] text-[#1800AD] md:w-fit"
    type="button"
  >
    Cancel
  </button>
);

export default CancelButton;
