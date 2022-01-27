import React, {useContext} from 'react';
import {NavbarWrapper, ThemeButton} from "./styles";
import {FaMoon, FaSun} from "react-icons/all";
import {CustomThemeContext} from "../CustomThemeProvider";
import logoNavbar from "../../assets/logos/Imagologo verde.png";

function Navbar(props) {
    const { currentTheme, setTheme } = useContext(CustomThemeContext);

    return (
        <NavbarWrapper>
            <img src={logoNavbar} alt="Logo Gabriel Rodrigues" className="n-logo"/>
            <ThemeButton>
                {
                    currentTheme==='light' &&
                    <FaMoon  onClick={()=>setTheme('dark')} />
                }
                {
                    currentTheme==='dark' &&
                    <FaSun  onClick={()=>setTheme('light')} />
                }
            </ThemeButton>
        </NavbarWrapper>
    );
}

export default Navbar;
