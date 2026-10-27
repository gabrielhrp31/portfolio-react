import { css } from "styled-components";

export const fontFaces = css`
  @font-face {
    font-family: "Outfit";
    src: url("/assets/fonts/Outfit-VariableFont_wght.woff2") format("woff2"),
      url("/assets/fonts/Outfit-VariableFont_wght.ttf") format("truetype");
    font-style: normal;
    font-weight: 100 900;
    font-display: swap;
  }
`;
