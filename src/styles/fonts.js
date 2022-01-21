import Outfit from '../assets/fonts/Outfit-VariableFont_wght.ttf'
import {css} from "styled-components";

export const fontFaces = css`
  @font-face {
    font-family: 'Outfit';
    src: url(${Outfit}) format('ttf');
    font-style: normal;
  }
`;
