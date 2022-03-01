import styled from "styled-components";

export const TecnologiesWrapper = styled.div`
		display: flex;
		justify-content: center;
		align-items: center;
  	flex-flow: wrap;
  	gap: 20px;
	
		.icon-wrapper{
			display: flex;
			
      min-width: 80px;
      width: 80px;
      height: 80px;
			
			border-radius: 8px;
			
      background-color: ${({theme}) => theme.background};
      color: ${({theme}) => theme.softAccent};
			
			i{
				margin: auto;
        font-size: 55px;
			}
		}
`