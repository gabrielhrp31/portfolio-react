import React, {useContext, useEffect, useState} from 'react';
import {NavbarWrapper, ThemeButton} from "./styles";
import {FaMoon, FaSun} from "react-icons/all";
import {CustomThemeContext} from "../../CustomThemeProvider";
import logoNavbar from "../../../assets/logos/Imagologo verde.png";

function Navbar(props) {
		const {currentTheme, setTheme} = useContext(CustomThemeContext);
		const [afterNavbar, setAfterNavbar] = useState(false);

		useEffect(() => {
				window.addEventListener('scroll', handleScroll);
				return () => {
						window.removeEventListener('scroll', handleScroll);
				};
		}, []);

		function handleScroll(event) {
				const winScroll =
						document.body.scrollTop || document.documentElement.scrollTop
				if (winScroll > (window.innerHeight )) {
						setAfterNavbar(true);
				} else {
						setAfterNavbar(false);
				}
		}


		return (
				<NavbarWrapper afterNavbar={afterNavbar}>
						<img src={logoNavbar} alt="Logo Gabriel Rodrigues" className="n-logo"/>
						<ThemeButton>
								{
										currentTheme === 'light' &&
										<FaMoon onClick={() => setTheme('dark')}/>
								}
								{
										currentTheme === 'dark' &&
										<FaSun onClick={() => setTheme('light')}/>
								}
						</ThemeButton>
				</NavbarWrapper>
		);
}

export default Navbar;
