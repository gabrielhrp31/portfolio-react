import styled from 'styled-components';

export const PortfolioItemWrapper = styled.div`
  width: min(430px, 100%);
  height: 430px;
  max-height: 430px;

  border: 2px solid ${({theme}) => theme.softAccent};
  border-radius: 20px;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-flow: wrap;
	
  .portfolio__item__title {
		display: block;
	  width: 100%;

    color: ${({theme}) => theme.titles};
	  font-size: 32px;
	  text-transform: capitalize;
    text-align: center;
    font-weight: 500;
  }

  .portfolio__item__description {
		display: block;
	  width: 95%;
	  
	  margin-left:auto ;
	  margin-right: auto;
    text-align: center;

    color: ${({theme}) => theme.titles};
	  font-size: 16px;
	  font-weight: 300;
	  text-align: center;
  }

  .portfolio__item__links {
	  	display: flex;
	  	justify-content: end;
	  	flex-flow: wrap;
	  	gap:30px;
	  
	  	width: 100%;
	  	margin-right: 30px;
	  
	  	a{
			  text-decoration: none;
			 	font-size: 18px; 
			  text-transform: uppercase;
			  
			  &:hover{
          color: ${({theme}) => theme.titles};
        }
		  }
  }
	
  .portfolio__item__img-wrapper {
    width: 100%;
    height: 210px;
    overflow: hidden;
    position: relative;

    display: flex;
	  flex-flow: wrap;

    .portfolio__item__techs-wrapper{
	    position: absolute;
	    bottom: 10px;
	    right: 10px;
    }

    img {
      width: 100%;
      height: fit-content;
    }
  }
`