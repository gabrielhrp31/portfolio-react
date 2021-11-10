import styled from "styled-components";

export const NavbarWrapper =  styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    background-color: ${({theme})=>theme.accent};
    color: ${({theme})=>theme.accentText};
    height: 64px;
`
export const ThemeButton =  styled.button`
    margin-left: auto;
    margin-right: 20px;
    padding: 0;
    background-color: unset;
    color: ${({theme})=>theme.accentText};
    border:none;
    font-size: 24px;
    cursor: pointer;
`