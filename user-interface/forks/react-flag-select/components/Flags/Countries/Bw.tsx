import * as React from "react";

function SvgBw(props: React.SVGProps<SVGSVGElement>) {
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
          d="M503.172 335.724H8.828A8.829 8.829 0 010 326.896V9.104A8.829 8.829 0 018.828.276h494.345a8.829 8.829 0 018.828 8.828v317.792a8.83 8.83 0 01-8.829 8.828z"
          fill="#82AFFF"
        />
        <path fill="#464655" d="M0 141.517h511.999v52.965H0z" />
        <path
          d="M0 123.862h511.999v17.655H0zm0 70.621h511.999v17.655H0z"
          fill="#F5F5F5"
        />
      </g>
    </svg>
  );
}

export default SvgBw;
