import type { SVGProps } from "react";

const Search = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height={25}
    width={25}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M10.5.25c5.66 0 10.25 4.59 10.25 10.25 0 2.422-.843 4.646-2.248 6.4l5.446 5.447a1.133 1.133 0 0 1-1.601 1.601L16.9 18.502a10.204 10.204 0 0 1-6.4 2.248C4.84 20.75.25 16.161.25 10.5.25 4.84 4.84.25 10.5.25Zm0 2.265a7.985 7.985 0 1 0 0 15.97 7.985 7.985 0 0 0 0-15.97Z"
      fill="#fff"
      stroke="#fff"
      strokeWidth={0.5}
    />
  </svg>
);
export default Search;
