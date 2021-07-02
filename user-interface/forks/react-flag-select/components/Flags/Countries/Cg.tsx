import * as React from "react";

function SvgCg(props: React.SVGProps<SVGSVGElement>) {
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
          d="M503.172.276H361.931L2.703 333.218c1.589 1.539 3.737 2.506 6.124 2.506h141.241L509.297 2.782c-1.589-1.54-3.738-2.506-6.125-2.506z"
          fill="#FFE15A"
        />
        <path
          d="M361.931.276H8.828A8.828 8.828 0 000 9.103v317.793c0 2.488 1.047 4.717 2.703 6.322L361.931.276z"
          fill="#73AF00"
        />
        <path
          d="M509.297 2.782L150.069 335.724h353.103a8.829 8.829 0 008.828-8.828V9.103c0-2.489-1.047-4.717-2.703-6.321z"
          fill="#FF4B55"
        />
      </g>
    </svg>
  );
}

export default SvgCg;
