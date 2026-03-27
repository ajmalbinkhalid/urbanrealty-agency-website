type Props = {
  onClick?: () => void;
};

const ProceedButton = ({ onClick }: Props) => (
  <button
    className="clamp-[py,6px,12.5px]  flex h-fit w-full justify-center gap-[10px] rounded-[6px] bg-linear-to-r from-[#006AFF] to-[#1311BF] px-[15px] text-white md:w-fit"
    onClick={onClick}
    type="button"
  >
    Proceed
  </button>
);

export default ProceedButton;
