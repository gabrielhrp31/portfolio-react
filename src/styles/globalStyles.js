// styles/globalStyles.js
import {createGlobalStyle} from 'styled-components'
import {fontFaces} from "./fonts";
import animations from "./animations";

export default createGlobalStyle`
  ${fontFaces}
  ${animations}
  * {
    box-sizing: border-box;
    margin: 0;
    outline: 0;
    transition: 0.1s;
    font-family: "Outfit", Arial;
  }

  button {
    border: none;
    outline: none;
  }

  body {
    position: relative;
    background: ${(props) => props.theme.background};
    color: ${props => props.theme.text};
    transition: background-color 0.5s ease;

		.global-wrapper{
			padding-bottom: 50px;
		}
  }

  h1 {
    color: ${props => props.theme.titles};
  }

  .text-green {
    color: ${({theme}) => theme.softAccent};
  }
  
  .title-green {
    width: 100%;
    font-size: 36px;
    margin-bottom: 0;
    font-weight: 600;
    color: ${({theme}) => theme.softAccent};
  }

  .text-bg-reverse {
    width: 100%;
    font-size: 16px;
    color: ${({theme}) => theme.titles};
    text-align: justify;
  }

  .text-bg-reverse-60{
    font-size: 16px;
    color: ${({theme}) => theme.titles};
    opacity: 0.6;
    text-align: justify;
  }
`
