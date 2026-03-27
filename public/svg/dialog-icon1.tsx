import type { SVGProps } from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height={27}
    width={44}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title>Mastercard logo</title> {/* Descriptive alternative text */}
    <path d="M27.748 2.89H15.941v21.215h11.807V2.89Z" fill="#FF5F00" />
    <path
      d="M16.69 13.497c0-4.123 1.912-8.059 5.135-10.608C15.978-1.72 7.47-.709 2.86 5.176-1.714 11.023-.7 19.494 5.183 24.104a13.458 13.458 0 0 0 16.68 0 13.5 13.5 0 0 1-5.173-10.607Z"
      fill="#EB001B"
    />
    <path
      d="M43.678 13.497c0 7.459-6.035 13.494-13.494 13.494-3.036 0-5.96-1.012-8.321-2.887 5.847-4.61 6.86-13.081 2.249-18.966-.675-.824-1.425-1.612-2.25-2.249C27.71-1.72 36.22-.709 40.793 5.176a13.355 13.355 0 0 1 2.886 8.32Z"
      fill="#F79E1B"
    />
  </svg>
);

export default SvgComponent;
