import React, {useContext} from 'react';
import {NavbarWrapper, ThemeButton} from "./styles";
import {FaMoon, FaSun} from "react-icons/all";
import {CustomThemeContext} from "../CustomThemeProvider";

function Navbar(props) {
    const { currentTheme, setTheme } = useContext(CustomThemeContext);

    return (
        <NavbarWrapper>
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