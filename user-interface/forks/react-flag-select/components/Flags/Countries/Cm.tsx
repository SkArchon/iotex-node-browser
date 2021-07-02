import * as React from "react";

function SvgCm(props: React.SVGProps<SVGSVGElement>) {
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
          d="M170.667 335.724H8.828A8.829 8.829 0 010 326.896V9.104A8.829 8.829 0 018.828.276h161.839v335.448z"
          fill="#73AF00"
        />
        <path fill="#FF4B55" d="M170.67.276h170.67v335.448H170.67z" />
        <path
          d="M503.172 335.724H341.333V.276h161.839A8.829 8.829 0 01512 9.104v317.792a8.828 8.828 0 01-8.828 8.828zm-245.339-200.08l7.584 22.741 23.971.185c1.857.014 2.627 2.385 1.133 3.488l-19.284 14.24 7.231 22.856c.561 1.771-1.455 3.235-2.967 2.155l-19.502-13.939-19.502 13.94c-1.511 1.08-3.527-.385-2.967-2.155l7.231-22.856-19.284-14.24c-1.494-1.103-.724-3.474 1.133-3.488l23.971-.185 7.584-22.741c.589-1.762 3.08-1.762 3.668-.001z"
          fill="#FFE15A"
        />
      </g>
    </svg>
  );
}

export default SvgCm;