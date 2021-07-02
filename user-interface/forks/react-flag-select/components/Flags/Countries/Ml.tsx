import * as React from "react";

function SvgMl(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 512 336"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g fill="none">
        <path
          d="M341.333.276h161.839A8.829 8.829 0 01512 9.104v317.793a8.829 8.829 0 01-8.828 8.828H341.333V.276z"
          fill="#FF4B55"
        />
        <path fill="#FFE15A" d="M170.67.276h170.67v335.448H170.67z" />
        <path
          d="M8.828.276h161.839v335.448H8.828A8.829 8.829 0 010 326.896V9.103A8.828 8.828 0 018.828.276z"
          fill="#73AF00"
        />
      </g>
    </svg>
  );
}

export default SvgMl;
