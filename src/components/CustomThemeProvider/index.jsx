"use client";

import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import getTheme from "@/styles/themes";

export const CustomThemeContext = React.createContext({
  currentTheme: "dark",
  setTheme: null,
  toggleTheme: null,
});

const CustomThemeProvider = ({ children }) => {
  const [themeName, _setThemeName] = useState("dark");
  const theme = getTheme(themeName);

  useEffect(() => {
    const currentTheme = localStorage.getItem("appTheme") || "dark";
    setThemeName(currentTheme);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = themeName;
    document.documentElement.style.colorScheme = themeName;
  }, [themeName]);

  const setThemeName = (name) => {
    localStorage.setItem("appTheme", name);
    _setThemeName(name);
  };

  const toggleTheme = () => {
    setThemeName(themeName === "dark" ? "light" : "dark");
  };

  const contextValue = {
    currentTheme: themeName,
    setTheme: setThemeName,
    toggleTheme,
  };

  return (
    <CustomThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CustomThemeContext.Provider>
  );
};

export default CustomThemeProvider;
