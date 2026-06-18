"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme-preference");
    if (savedTheme) {
      const isLight = savedTheme === "light";
      setIsDarkMode(!isLight);
      updateTheme(!isLight);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(prefersDark);
      updateTheme(prefersDark);
    }
    setIsMounted(true);
  }, []);

  const updateTheme = (dark: boolean) => {
    const htmlElement = document.documentElement;
    if (dark) {
      htmlElement.classList.remove("light-mode");
    } else {
      htmlElement.classList.add("light-mode");
    }
    localStorage.setItem("theme-preference", dark ? "dark" : "light");
  };

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newDarkMode = !prev;
      updateTheme(newDarkMode);
      return newDarkMode;
    });
  };

  if (!isMounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    return { isDarkMode: true, toggleTheme: () => {} };
  }
  return context;
};