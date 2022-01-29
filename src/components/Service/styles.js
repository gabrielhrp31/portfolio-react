import styled from "styled-components";
import {colorScheme} from "../../styles/themes";

export const ServiceWrapper = styled.div`
  position: relative;
  display: flex;
	flex-direction: column;
	width: min(200px, 80%);
	
	.icon-wrapper{
		background: ${colorScheme.offWhite};
		
		border-radius: 12px;
		
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		
		height: 149px;
		
		svg{
			fill: ${colorScheme.green};
			
      width: unset;
			height: 60px!important;

      margin-bottom: 10px;
		}
		
		span{
      color: ${colorScheme.gray};
			font-size: 22px;
			font-weight: bold;
		}
	}
	
	.description{
		margin-top: 15px;
    font-size: 18px;
    font-weight: 500;
		text-align: center;
    color: ${colorScheme.offWhite};
	}
`