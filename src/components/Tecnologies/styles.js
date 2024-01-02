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
			
      min-width: ${({size})=>size}px;
      width: ${({size})=>size}px;
      height: ${({size})=>size}px;
			
			border-radius: 8px;
			
      background-color: ${({theme, bgColor}) => bgColor?theme[bgColor]:theme.background};
      color: ${({theme}) => theme.softAccent};
			
			i{
				margin: auto;
        font-size: ${({size, padding})=>(size-padding)}px;
			}
		}
`