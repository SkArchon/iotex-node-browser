import * as React from "react";

function SvgIs(props: React.SVGProps<SVGSVGElement>) {
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
          fill="#41479B"
        />
        <path
          fill="#F5F5F5"
          d="M512 123.862H229.517V.276h-88.276v123.586H0v88.276h141.241v123.586h88.276V212.138H512z"
        />
        <path
          fill="#FF4B55"
          d="M512 141.517H211.862V.276h-52.965v141.241H0v52.966h158.897v141.241h52.965V194.483H512z"
        />
      </g>
    </svg>
  );
}

export default SvgIs;
