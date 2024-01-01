import styled from "styled-components";

export const TecnologiesWrapper = styled.div`
		display: flex;
		align-items: center;
  	flex-flow: wrap;
  	gap: ${({padding})=>padding}px;
	
		.icon-wrapper{
			display: flex;
      align-items: center;
      justify-content: center;
			
      min-width: 30px;
      width: 30px;
      height: 30px;

			@media (min-width: 1025px) {
				width: ${({size})=>size}px;
      	height: ${({size})=>size}px;
			}

			
			border-radius: 8px;
			
      background-color: ${({theme, bgColor}) => bgColor?theme[bgColor]:theme.background};
      color: ${({theme}) => theme.softAccent};
			
			i{
				margin: auto;
        font-size: 16px;
				
				@media (min-width: 1025px) {
					width: ${({size})=>size}px;
					height: ${({size})=>size}px;
				}
			}
		}
`