import * as React from "react";

function SvgPw(props: React.SVGProps<SVGSVGElement>) {
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
          fill="#3CC8FF"
        />
        <circle fill="#FFE15A" cx={255.999} cy={168} r={105.931} />
      </g>
    </svg>
  );
}

export default SvgPw;
