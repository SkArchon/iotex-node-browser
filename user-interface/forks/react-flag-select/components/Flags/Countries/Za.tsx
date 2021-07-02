import * as React from "react";

function SvgZa(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 512 336"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g fill="none">
        <path fill="#464655" d="M0 62.069v211.862L141.241 168z" />
        <path
          d="M70.621.275l158.897 123.587H512V9.103a8.829 8.829 0 00-8.828-8.828H70.621z"
          fill="#FF4B55"
        />
        <path
          d="M70.621 335.725l158.897-123.587H512v114.759a8.829 8.829 0 01-8.828 8.828H70.621z"
          fill="#41479B"
        />
        <path
          d="M56.889.276H8.828A8.828 8.828 0 000 9.103v36.21L154.974 168 0 290.69v36.206a8.829 8.829 0 008.828 8.828h48.056L224.147 203.31H512v-70.62H224.148L56.889.276z"
          fill="#73AF00"
        />
        <path
          fill="#F5F5F5"
          d="M85.333.276H56.889L224.148 132.69H512v-17.656H230.291z"
        />
        <path
          fill="#FFE15A"
          d="M0 45.313v22.518L126.53 168 0 268.173v22.517L154.974 168z"
        />
        <path
          fill="#F5F5F5"
          d="M224.147 203.31L56.884 335.724h28.445l144.96-114.758H512V203.31z"
        />
      </g>
    </svg>
  );
}

export default SvgZa;
