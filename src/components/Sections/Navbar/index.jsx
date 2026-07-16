"use client";

import React, { useContext, useEffect, useState } from "react";
import { NavbarWrapper, ThemeButton } from "./styles";
import { FaMoon, FaSun } from "react-icons/fa";
import { CustomThemeContext } from "@/components/CustomThemeProvider";

function Navbar() {
  const { currentTheme, setTheme } = useContext(CustomThemeContext);
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
      <ThemeButton>
        {currentTheme === "light" && (
          <FaMoon onClick={() => setTheme("dark")} />
        )}
        {currentTheme === "dark" && (
          <FaSun onClick={() => setTheme("light")} />
        )}
      </ThemeButton>
    </NavbarWrapper>
  );
}

export default Navbar;
