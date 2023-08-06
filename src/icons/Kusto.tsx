import { FC } from "react";
import { IconProps } from "./props";

export const KustoIcon: FC<IconProps> = ({ id, height, width }) => {
  return (
    <svg
      id={id}
      xmlns="http://www.w3.org/2000/svg"
      width={width || 42}
      height={height || 42}
      viewBox="0 0 17.031404 17.006302"
      version="1.1"
    >
      <defs id="defs11530">
        <linearGradient
          id="ea6f59fb-306a-4655-8ef5-c9678451765c"
          x1="1.3"
          y1="8.6000004"
          x2="17.5"
          y2="8.6000004"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(0.4992139,0.49920995)"
        >
          <stop offset="0.1" stop-color="#54aef0" id="stop11510" />
          <stop offset="1" stop-color="#1988d9" id="stop11512" />
        </linearGradient>
        <linearGradient
          id="a331b263-1cab-4091-811f-6e285c35c115"
          x1="0.5"
          y1="13.7"
          x2="8.1099997"
          y2="13.7"
          gradientTransform="rotate(45,3.4518997,14.055819)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stop-color="#b3b2b3" id="stop11515" />
          <stop offset="1" stop-color="#979797" id="stop11517" />
        </linearGradient>
        <linearGradient
          id="ef7d2642-0773-456f-ac58-3a1abd750919"
          x1="0.5"
          y1="10.08"
          x2="5.7199998"
          y2="10.08"
          gradientTransform="rotate(45,2.2624632,10.433139)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stop-color="#b3b2b3" id="stop11520" />
          <stop offset="1" stop-color="#979797" id="stop11522" />
        </linearGradient>
        <linearGradient
          id="a156353f-4d63-4962-9d1c-839eceb7590b"
          x1="5.2800002"
          y1="14.89"
          x2="10.49"
          y2="14.89"
          gradientTransform="rotate(45,7.0283925,15.247251)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stop-color="#b3b2b3" id="stop11525" />
          <stop offset="1" stop-color="#979797" id="stop11527" />
        </linearGradient>
      </defs>
      <title id="title11532">Icon-analytics-145</title>
      <g id="g11544" transform="translate(-0.4992139,-0.49920995)">
        <path
          d="m 1.47,1.47 15.06,15.06 a 0.57,0.57 0 0 0 1,-0.4 V 1.07 A 0.57,0.57 0 0 0 16.93,0.5 H 1.87 a 0.57,0.57 0 0 0 -0.4,0.97 z"
          id="path11534"
          fill="url(#ea6f59fb-306a-4655-8ef5-c9678451765c)"
        />
        <path
          id="f582129e-1fd7-440c-a5c4-799b0a032e7c"
          d="m 5.53,5.53 6.94,6.94 5,-5 V 1.07 A 0.57,0.57 0 0 0 16.93,0.5 h -6.37 z"
          fill="#50e6ff"
        />
        <rect
          id="b55df55b-2ac6-4f92-ba84-9d8becd854da"
          x="-0.38"
          y="12.85"
          width="9.3699999"
          height="1.7"
          rx="0.27000001"
          transform="rotate(-45,4.3071739,13.70591)"
          fill="url(#a331b263-1cab-4091-811f-6e285c35c115)"
        />
        <rect
          id="a1d88672-156d-4d85-8ddb-d3d546338b0e"
          x="0.12"
          y="9.2299995"
          width="5.9899998"
          height="1.7"
          rx="0.27000001"
          transform="rotate(-45,3.1065999,10.083204)"
          fill="url(#ef7d2642-0773-456f-ac58-3a1abd750919)"
        />
        <rect
          id="a50d2abb-ca8f-44bb-a92d-5a79f17e98d0"
          x="4.8899999"
          y="14.04"
          width="5.9899998"
          height="1.7"
          rx="0.27000001"
          transform="rotate(-45,7.8765703,14.887418)"
          fill="url(#a156353f-4d63-4962-9d1c-839eceb7590b)"
        />
        <rect
          id="abef2dbd-e94f-4bb4-9503-d2b3cf2041a9"
          x="9.1899996"
          y="4.75"
          width="1.7"
          height="1.7"
          rx="0.38"
          transform="rotate(-45,10.040113,5.6012489)"
          fill="#ffffff"
        />
        <rect
          id="a157044f-57ca-43a1-b77d-760bafa34854"
          x="11.59"
          y="2.3499999"
          width="1.7"
          height="1.7"
          rx="0.38"
          transform="rotate(-45,12.435149,3.1991926)"
          fill="#ffffff"
        />
        <rect
          id="b637d7ff-a1d5-4533-b34f-12a87620ff68"
          x="11.59"
          y="7.1500001"
          width="1.7"
          height="1.7"
          rx="0.38"
          transform="rotate(-45,12.44217,7.9962846)"
          fill="#ffffff"
        />
        <path
          id="f613147f-9647-4c5d-a52a-663abb19234f"
          d="m 13.91,5.33 0.66,-0.66 a 0.38,0.38 0 0 1 0.54,0 l 0.66,0.66 a 0.38,0.38 0 0 1 0,0.54 l -0.66,0.66 a 0.38,0.38 0 0 1 -0.54,0 L 13.91,5.87 a 0.38,0.38 0 0 1 0,-0.54"
          fill="#ffffff"
        />
      </g>
    </svg>
  );
};
