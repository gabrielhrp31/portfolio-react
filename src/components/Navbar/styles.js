import styled from "styled-components";

export const NavbarWrapper =  styled.div`
	width: 100%;
	max-width: 100%;
	height: 64px;
    
	display: flex;
	align-items: center;
	
	background-color: ${({theme})=>theme.background};
	color: ${({theme})=>theme.softAccent};
	
	.n-logo{
		height: 75%;
		margin-left: auto;
	}
`

export const ThemeButton =  styled.button`
  margin-left: auto;
  margin-right: 20px;
  padding: 0;
    
  background-color: unset;
  color: ${({theme})=>theme.softAccent};
  
  font-size: 24px;
  	
  border:none;
  cursor: pointer;
`
