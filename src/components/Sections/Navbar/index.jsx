"use client";

import React, { useContext, useEffect, useState } from "react";
import { NavbarWrapper, ThemeButton } from "./styles";
import { FaMoon, FaSun } from "react-icons/fa";
import { CustomThemeContext } from "@/components/CustomThemeProvider";

function Navbar() {
  const { currentTheme, toggleTheme } = useContext(CustomThemeContext);
  const [afterNavbar, setAfterNavbar] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function handleScroll() {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    if (winScroll > window.innerHeight) {
      setAfterNavbar(true);
    } else {
      setAfterNavbar(false);
    }
  }

  return (
    <NavbarWrapper $afterNavbar={afterNavbar}>
      <img
        src="/assets/logos/Imagologo%20verde.png"
        alt="Logo Gabriel Rodrigues"
        className="n-logo"
      />
      <ThemeButton
        type="button"
        onClick={toggleTheme}
        aria-label="Alternar tema claro/escuro"
      >
        {currentTheme === "light" ? <FaMoon /> : <FaSun />}
        <span>{currentTheme === "light" ? "Dark" : "Light"}</span>
      </ThemeButton>
    </NavbarWrapper>
  );
}

export default Navbar;
