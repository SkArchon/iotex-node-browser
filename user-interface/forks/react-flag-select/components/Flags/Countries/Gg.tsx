import * as React from "react";

function SvgGg(props: React.SVGProps<SVGSVGElement>) {
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
          fill="#F5F5F5"
        />
        <path
          fill="#FF4B55"
          d="M512 132.69H291.31V.276h-70.621V132.69H0v70.62h220.689v132.414h70.621V203.31H512z"
        />
        <g fill="#FFE15A">
          <path d="M361.93 194.483v-52.966l-13.241 13.242H163.31l-13.241-13.242v52.966l13.241-13.242h185.379z" />
          <path d="M229.517 273.931h52.965l-13.241-13.242V75.311l13.241-13.242h-52.965l13.241 13.242v185.378z" />
        </g>
      </g>
    </svg>
  );
}

export default SvgGg;
