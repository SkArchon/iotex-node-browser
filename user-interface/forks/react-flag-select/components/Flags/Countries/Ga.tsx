import * as React from "react";

function SvgGa(props: React.SVGProps<SVGSVGElement>) {
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
          d="M0 223.908h512v102.988a8.829 8.829 0 01-8.828 8.828H8.828A8.829 8.829 0 010 326.896V223.908z"
          fill="#4173CD"
        />
        <path
          d="M8.828.276h494.345a8.829 8.829 0 018.828 8.828v102.988H0V9.103A8.828 8.828 0 018.828.276z"
          fill="#73AF00"
        />
        <path fill="#FFE15A" d="M0 112.088h512V223.9H0z" />
      </g>
    </svg>
  );
}

export default SvgGa;
