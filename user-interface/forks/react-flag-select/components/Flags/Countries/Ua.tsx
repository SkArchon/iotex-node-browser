import * as React from "react";

function SvgUa(props: React.SVGProps<SVGSVGElement>) {
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
          d="M0 168h512v158.897a8.829 8.829 0 01-8.828 8.828H8.828A8.829 8.829 0 010 326.897V168z"
          fill="#FFE15A"
        />
        <path
          d="M512.001 168H0V9.103A8.829 8.829 0 018.828.275h494.345a8.829 8.829 0 018.828 8.828V168z"
          fill="#4173CD"
        />
      </g>
    </svg>
  );
}

export default SvgUa;
