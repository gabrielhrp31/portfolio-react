import {css} from "styled-components";

export default css`
	
  @keyframes pulse {
    0% {
      transform: scale(0.75);
    }

    70% {
      transform: scale(1);
    }

    100% {
      transform: scale(0.75);
    }
  }

  @keyframes blink {
    0% {opacity: 1;}
    40% {opacity: 1;}
    60% {opacity: 0;}
    100% {opacity: 0;}
  }
`
