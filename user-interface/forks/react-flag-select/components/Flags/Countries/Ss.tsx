import * as React from "react";

function SvgSs(props: React.SVGProps<SVGSVGElement>) {
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
          d="M512.001 112.093H0V9.104A8.829 8.829 0 018.828.276h494.345a8.829 8.829 0 018.828 8.828v102.989z"
          fill="#464655"
        />
        <path
          d="M503.172 335.724H8.828A8.829 8.829 0 010 326.896V223.908h512v102.988a8.828 8.828 0 01-8.828 8.828z"
          fill="#73AF00"
        />
        <path fill="#FF4B55" d="M0 112.088h511.999V223.9H0z" />
        <path
          d="M95.398 145.164l5.247 11.381 12.169-2.994a.917.917 0 011.038 1.302l-5.626 11.198 9.928 7.648a.916.916 0 01-.371 1.623l-12.263 2.583.211 12.531a.917.917 0 01-1.5.723l-9.665-7.977-9.665 7.977a.917.917 0 01-1.5-.723l.211-12.531-12.263-2.583a.917.917 0 01-.371-1.623l9.928-7.648-5.626-11.198a.917.917 0 011.038-1.302l12.169 2.994 5.247-11.381c.327-.71 1.338-.71 1.664 0zM0 106.207h511.999v15.007H0zm0 108.579h511.999v15.007H0z"
          fill="#F5F5F5"
        />
        <path
          d="M2.877 333.335L233.2 171.613c2.504-1.758 2.504-5.466 0-7.224L2.877 2.666C1.131 4.28 0 6.539 0 9.104v317.792c0 2.565 1.131 4.826 2.877 6.439z"
          fill="#41479B"
        />
        <path
          d="M73.561 126.847l19.831 20.297 25.624-12.192c3.317-1.579 6.735 1.974 5.03 5.228l-13.175 25.132 19.513 20.602c2.527 2.667.204 7.016-3.418 6.399l-27.973-4.765-13.564 24.925c-1.756 3.227-6.61 2.361-7.142-1.273l-4.114-28.077-27.896-5.197c-3.612-.673-4.288-5.556-.995-7.186l25.432-12.588-3.678-28.138c-.477-3.643 3.957-5.794 6.525-3.167z"
          fill="#FFE15A"
        />
      </g>
    </svg>
  );
}

export default SvgSs;