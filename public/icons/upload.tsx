import type { SVGProps } from "react";

const Upload = (props: SVGProps<SVGSVGElement>) => (
  <svg
    aria-labelledby="uploadIconTitle"
    fill="none"
    height={27}
    role="img"
    width={44}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title id="uploadIconTitle">Upload image</title>

    <path
      d="M34.38 26.057H24.94v-7.764h3.12c.79 0 1.258-.732.79-1.258L22.783 10.2c-.386-.439-1.187-.439-1.573 0l-6.069 6.835c-.467.526-.009 1.258.791 1.258h3.12v7.764H8.478C3.758 25.845 0 22.252 0 18.359c0-2.685 1.79-5.027 4.441-6.293a4.085 4.085 0 0 1-.368-1.705c0-2.744 2.724-4.96 6.095-4.96.729 0 1.43.102 2.086.3C14.205 2.333 18.413 0 23.304 0c6.329.007 11.544 3.951 12.137 8.978 4.864.68 8.559 4.347 8.559 8.496 0 4.434-4.244 8.276-9.62 8.583Z"
      fill="#6254B4"
      opacity={0.4}
    />
  </svg>
);

export default Upload;
