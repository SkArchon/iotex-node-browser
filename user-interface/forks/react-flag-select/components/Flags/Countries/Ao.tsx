import * as React from "react";

function SvgAo(props: React.SVGProps<SVGSVGElement>) {
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
          d="M512.001 168H0V9.104A8.829 8.829 0 018.828.276h494.345a8.829 8.829 0 018.828 8.828V168z"
          fill="#FF4B55"
        />
        <path
          d="M0 168h512v158.896a8.829 8.829 0 01-8.828 8.828H8.828A8.829 8.829 0 010 326.896V168z"
          fill="#464655"
        />
        <g fill="#FFE15A">
          <path d="M235.903 94.293l6.036 18.096 19.076.148c1.478.011 2.091 1.898.902 2.775l-15.346 11.332 5.754 18.188c.446 1.409-1.159 2.574-2.361 1.716l-15.52-11.093-15.52 11.093c-1.203.86-2.807-.307-2.361-1.716l5.754-18.188-15.346-11.332c-1.188-.878-.576-2.764.902-2.775l19.076-.148 6.036-18.096c.468-1.401 2.451-1.401 2.918 0zm81.584 153.651s-109.206-82.384-112.43-85.092c-4.983-4.185-8.828-11.586-9.012-20.598 0 0-11.777 12.064-9.471 24.552 2.667 14.436 10.943 19.586 21.61 26.574 7.496 4.911 67.087 42.495 101.875 64.419l7.428-9.855zm32.674 24.147c-1.423-1.016-12.861-9.47-28.73-21.227l-5.759 10.472a129919.21 129919.21 0 0019.409 12.227s1.103 14.345 12.69 11.954c4.176-.862 7.539-9.747 2.39-13.426zm-94.298-38.038c-8.256 2.905-17.097 4.567-26.346 4.567-23.442 0-44.445-10.212-58.987-26.36l-12.928 11.635c4.333 4.812 8.96 9.347 14.175 13.217l-2.574 4.459 19.112 11.034 2.53-4.383a96.412 96.412 0 0027.638 7.383v5.084h22.069v-5.084a96.412 96.412 0 0027.638-7.383l2.53 4.383 7.595-4.385c-7.417-4.677-15.015-9.47-22.452-14.167z" />
          <path d="M325.95 148.138a96.397 96.397 0 00-7.383-27.637l4.383-2.53-11.034-19.113-4.459 2.574a97.507 97.507 0 00-20.201-20.2l2.574-4.459-19.112-11.034-2.53 4.383c-7.162-3.115-14.788-5.327-22.723-6.639l-2.9 17.404c37.656 6.237 66.4 38.862 66.4 78.286 0 21.228-8.377 40.464-21.942 54.717l13.953 10.535c2.23-2.442 4.504-4.847 6.482-7.511l4.459 2.574 11.034-19.112-4.383-2.53a96.414 96.414 0 007.383-27.637h5.082V148.14h-5.084v-.002h.001z" />
        </g>
      </g>
    </svg>
  );
}

export default SvgAo;
