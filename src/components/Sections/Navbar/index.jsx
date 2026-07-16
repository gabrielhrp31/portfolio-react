"use client";

import React, { useContext, useEffect, useState } from "react";
import { NavbarWrapper, ThemeButton } from "./styles";
import { FaMoon, FaSun } from "react-icons/fa";
import { CustomThemeContext } from "@/components/CustomThemeProvider";
import OptimizedImage from "@/components/OptimizedImage";
import { mediaAlt, mediaUrl } from "@/lib/media";

function Navbar({ media = null }) {
  const { currentTheme, toggleTheme } = useContext(CustomThemeContext);
  const [afterNavbar, setAfterNavbar] = useState(false);
  const logoSrc = mediaUrl(media, "logo_navbar");
  const logoAlt = mediaAlt(media, "logo_navbar", "Logo Gabriel Rodrigues");

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
      <OptimizedImage
        src={logoSrc}
        alt={logoAlt}
        width={180}
        height={48}
        className="n-logo"
        sizes="180px"
        quality={90}
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
