import * as React from "react";

function SvgLc(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 512 336"
      {...props}
    >
      <path
        d="M503.172 335.724H8.828A8.829 8.829 0 010 326.896V9.103A8.829 8.829 0 018.828.275h494.345a8.829 8.829 0 018.828 8.828v317.793a8.83 8.83 0 01-8.829 8.828z"
        fill="#6Cf"
      />
      <path fill="#FFF" d="M156 274l100-14 100 14L256 27z" />
      <path d="M169.5 274l86.5-14 86.5 14L256 60z" />
      <path fill="#FCD116" d="M156 274h200L256 150z" />
    </svg>
  );
}

export default SvgLc;
