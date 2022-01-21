// styles/globalStyles.js
import { createGlobalStyle } from 'styled-components'
import {fontFaces} from "./fonts";
import animations from "./animations";

export default  createGlobalStyle`
		${fontFaces}
		${animations}
	
    * {
				box-sizing: border-box;
				margin: 0;
				outline: 0;
				transition: 0.1s;
				font-family: "Outfit", Arial;
    }
    
    body {
        background: ${(props) => props.theme.background};
        color: ${props => props.theme.text};
        transition:  background-color 0.5s ease;
    }
    
    h1 {
        color: ${props => props.theme.titles};        
    }
`
