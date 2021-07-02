import * as React from "react";

function SvgMa(props: React.SVGProps<SVGSVGElement>) {
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
          d="M503.172 335.724H8.828A8.829 8.829 0 010 326.896V9.103A8.829 8.829 0 018.828.275h494.345a8.829 8.829 0 018.828 8.828v317.793a8.83 8.83 0 01-8.829 8.828z"
          fill="#FF4B55"
        />
        <path
          d="M297.951 189.961l67.433-49.478h-83.509L256 60.845l-25.875 79.638h-83.509l67.433 49.478-25.675 79.022 67.56-48.289.066.047.066-.047 67.56 48.289-25.675-79.022zm13.527-31.823l-19.273 14.141-4.595-14.141h23.868zm-76.694 25.139l8.169-25.14h26.094l8.169 25.14L256 198.845l-21.216-15.568zM256 117.983l7.31 22.5h-14.622l7.312-22.5zm-55.478 40.155h23.868l-4.595 14.141-19.273-14.141zm21.215 65.293l7.302-22.472 11.911 8.739-19.213 13.733zm61.225-22.472l7.302 22.472-19.212-13.732 11.91-8.74z"
          fill="#5A8250"
        />
      </g>
    </svg>
  );
}

export default SvgMa;
