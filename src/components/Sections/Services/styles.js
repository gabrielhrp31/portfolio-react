import styled from "styled-components";
import binary from "../../../assets/backgrounds/binary.jpg";
import {colorScheme} from "../../../styles/themes";

export const ParallaxWaves = styled.div`
  position: relative;
	background: ${colorScheme.gray};
  height: fit-content;
  overflow: visible;
  z-index: 100;
	padding: 20vw 50px 22vw 50px;

  > svg:first-child {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: unset !important;

    > *{
      fill: ${colorScheme.softGreen}!important;
    }
  }
	
	.services-wrapper{
		display: flex;
		justify-content: center;
		flex-flow: wrap;
		gap: 150px;
	}

  > svg:last-child {
    position: absolute;
    overflow: hidden;
    bottom: 0;
    left: 0;
    width: 100%;
    height: auto;

    > *{
      fill: ${colorScheme.gray}!important;
    }
  }
	
	::before{
		content: "";
		display: flex;
    position: absolute;	
		left: 0;
		top: 0;
		opacity: 0.25;
		
		width: 100%;
		height: 100%;

		
    background-image: url(${binary});
    background-attachment: fixed;
    background-position: center;
    background-size: cover;
	}
`