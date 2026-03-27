import editIcon from "@public/icons/edit-vector.svg";
import logout from "@public/icons/logout.svg";
import Image from "next/image";

type Props = {
  isProfileOpen: boolean;
};

const LogoutModal = ({ isProfileOpen }: Props) => (
  <div>
    {isProfileOpen ? (
      <div className="absolute top-full left-[50%] w-full -translate-x-1/2 overflow-hidden rounded-b-md bg-[#F9F9F9]">
        <div className="relative py-2">
          <div className="absolute top-[-6px] left-[50%] size-[11.8px] -translate-x-1/2 rotate-45 bg-white" />

          <div className="flex items-center gap-[8px] px-5 py-3 transition-colors">
            <Image alt="" src={editIcon} />
            <span className="font-jost font-normal text-[#1800AD] text-[15px] leading-[100%]">
              Edit profile
            </span>
          </div>

          <button
            className="flex items-center gap-[8px] px-5 py-3 transition-colors"
            type="button"
          >
            <Image alt="" src={logout} />
            <p className="font-jost font-normal text-[#1800AD] text-[15px] leading-[100%]">
              Logout
            </p>
          </button>
        </div>
      </div>
    ) : null}
  </div>
);

export default LogoutModal;
