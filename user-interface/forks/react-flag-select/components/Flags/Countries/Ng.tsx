import * as React from "react";

function SvgNg(props: React.SVGProps<SVGSVGElement>) {
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
          d="M170.667 335.724H8.828A8.829 8.829 0 010 326.896V9.103A8.829 8.829 0 018.828.275h161.839v335.449z"
          fill="#73AF00"
        />
        <path fill="#F5F5F5" d="M170.67.276h170.67v335.448H170.67z" />
        <path
          d="M503.172 335.724H341.333V.276h161.839A8.829 8.829 0 01512 9.104v317.793a8.828 8.828 0 01-8.828 8.827z"
          fill="#73AF00"
        />
      </g>
    </svg>
  );
}

export default SvgNg;
