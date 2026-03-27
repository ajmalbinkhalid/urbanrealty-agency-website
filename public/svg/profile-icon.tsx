import type { SVGProps } from "react";

const ProfileIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    // width={26}
    // height={26}
    viewBox="0 0 26 26"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M.75 21.75a6 6 0 0 1 6-6h12a6 6 0 0 1 6 6 3 3 0 0 1-3 3h-18a3 3 0 0 1-3-3Z"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="M12.75 9.75a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z"
      stroke="currentColor"
      strokeWidth={1.5}
    />
  </svg>
);
export default ProfileIcon;
