import * as React from "react";
import { SVGProps } from "react";
const ArrowLeft = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={12}
    fill="none"
    {...props}
  >
    <path
      fill="#1800AD"
      d="M11.995 5.93H1.617l4.447 4.446-.56.636L0 5.506 5.506 0l.559.635-4.447 4.447h10.377v.847Z"
    />
  </svg>
);
export default ArrowLeft;
