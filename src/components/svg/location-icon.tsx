import * as React from "react"
import { SVGProps } from "react"
const LocationIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={21}
    height={25}
    viewBox="0 0 21 25"
    fill="none"
    {...props}
  >
    <path
      fill="#6254B4"
      d="m10.125 24.444-7.16-7.16a10.125 10.125 0 1 1 14.32 0l-7.16 7.16Zm5.569-8.75a7.875 7.875 0 1 0-11.138 0l5.569 5.568 5.569-5.568Zm-5.569-3.32a2.25 2.25 0 1 1 0-4.499 2.25 2.25 0 0 1 0 4.5Z"
    />
  </svg>
)
export default LocationIcon
