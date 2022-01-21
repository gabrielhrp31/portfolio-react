import styled from "styled-components";
import binary from "../../assets/backgrounds/binary.jpg";

export const Parallax = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

  background-image: url(${binary});
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  min-height: 100vh;
	
	.p-content{
		display: flex;
		flex-flow:column;	
		justify-content: space-evenly;
		align-items: center;
		
		max-width:80vw;
		height: 80vh;
		
    z-index: 1;
		
		@media (min-width: 769px) {
    	max-width:50vw;
  	}
		
    @media (min-width: 1920px) {
      max-width:30vw;
    }
  }

  .p-content__logo{

    margin-left: auto;
    margin-right: auto;
    width: min(175px, 80%);

    @media (min-width: 1920px) {
      width: min(230px, 80%);
    }
  }
	
  .p-content__logo-hover-show{
		opacity: 0;
  }

  .p-content__text{
		text-align: center;
		font-weight: 200;
    font-size: 40px;
    color: white;

    @media (min-width: 1025px) {
      font-size: 48px;
    }
		
    @media (min-width: 1920px) {
      font-size: 64px;
    }
  }

  .p-content__text__name{
    color: ${({theme})=>theme.softAccent};
  }

  .p-content__socials{
		display: flex;
		gap: 20px;

  }

  .p-content__socials__icon{
		height: 40px;
		width: unset;
		
    border-radius: 100%;
    overflow: hidden;
		
		cursor: pointer;
		
		fill: white;
		
    @media (min-width: 1920px) {
      height: 51px;
    }
  }

  .p-content__arrow{
		position: absolute;
		width: 45px;
		height: unset;
		
		bottom: 10px;

    cursor: pointer;

    transform: scale(1);
    animation: pulse 2s infinite;
  }
	
	::before{
		content: "";
		display: flex;
		
    position: absolute;
		left: 0;
		top: 0;

    min-height: 100vh;
		width: 100%;

    background-color: rgb(0,0,0);
		
		opacity: 0.8;
		z-index: 0;
	}
`
