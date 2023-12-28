import  styled from 'styled-components';

export const PortfolioWrapper = styled.div`
  	width: 80vw;
		margin-top:50px;
		margin-left:auto;
		margin-right:auto;
		display: flex;
		justify-content: space-around;
		flex-direction: row;
		flex-flow: wrap;
  	gap: 20px;
	
		.portfolio__items{
      display: flex;
			justify-content: ${({itemsQty}) => itemsQty>=3 ? 'center':'flex-start'};
      flex-direction: row;
      flex-flow: wrap;
			gap: 50px;
		}
`