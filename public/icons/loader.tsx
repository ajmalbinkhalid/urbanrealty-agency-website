import type { SVGProps } from "react";

const Loader = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height={25}
    width={24}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M3.568.25a1.09 1.09 0 0 1 1.093 1.088l.005 2.45A11.455 11.455 0 1 1 .25 12.823a1.09 1.09 0 1 1 2.18 0 9.275 9.275 0 0 0 13.646 8.18A9.276 9.276 0 1 0 6.302 5.285l2.32-.005a1.09 1.09 0 0 1 .004 2.18l-5.041.013a1.09 1.09 0 0 1-1.093-1.088L2.48 1.343A1.09 1.09 0 0 1 3.568.25Z"
      fill="#fff"
      stroke="#fff"
      strokeWidth={0.5}
    />
  </svg>
);
export default Loader;
