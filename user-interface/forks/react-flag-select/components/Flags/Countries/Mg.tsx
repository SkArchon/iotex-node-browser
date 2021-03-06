import * as React from "react";

function SvgMg(props: React.SVGProps<SVGSVGElement>) {
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
          d="M512 168H167.724V.276h335.448A8.829 8.829 0 01512 9.104V168z"
          fill="#FF4B55"
        />
        <path
          d="M167.724 168H512v158.897a8.829 8.829 0 01-8.828 8.828H167.724V168z"
          fill="#73AF00"
        />
        <path
          d="M167.724.275v335.449H8.828A8.829 8.829 0 010 326.896V9.103A8.829 8.829 0 018.828.275h158.896z"
          fill="#F5F5F5"
        />
      </g>
    </svg>
  );
}

export default SvgMg;
