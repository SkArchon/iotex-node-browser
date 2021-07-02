import * as React from "react";

function SvgDj(props: React.SVGProps<SVGSVGElement>) {
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
          d="M3.256 333.59L256 168 3.256 2.41C1.311 4.029 0 6.375 0 9.103v317.793c0 2.729 1.311 5.075 3.256 6.694z"
          fill="#F5F5F5"
        />
        <path
          d="M3.256 333.59c1.53 1.274 3.425 2.134 5.571 2.134h494.345a8.829 8.829 0 008.828-8.828V168H256L3.256 333.59z"
          fill="#73AF00"
        />
        <path
          d="M3.256 2.41C4.786 1.136 6.681.276 8.827.276h494.345A8.829 8.829 0 01512 9.104V168H256L3.256 2.41z"
          fill="#82AFFF"
        />
        <path
          d="M91.766 128.135l-8.94 26.806-28.257.22c-1.549.012-2.191 1.99-.946 2.91l22.732 16.787-8.523 26.942c-.467 1.478 1.215 2.699 2.475 1.798l22.989-16.431 22.989 16.431c1.26.9 2.942-.321 2.475-1.798l-8.523-26.942 22.729-16.788c1.246-.92.604-2.898-.946-2.91l-28.257-.22-8.94-26.806c-.488-1.469-2.567-1.469-3.057.001z"
          fill="#FF4B55"
        />
      </g>
    </svg>
  );
}

export default SvgDj;