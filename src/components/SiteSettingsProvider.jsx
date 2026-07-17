"use client";

import React, { createContext, useContext, useMemo } from "react";
import { buildSettingsMap } from "@/lib/settings";

const SiteSettingsContext = createContext(buildSettingsMap([]));

export function useSiteSettings() {
  return useContext(SiteSettingsContext);
}

export default function SiteSettingsProvider({
  initialSettings = null,
  children,
}) {
  const value = useMemo(() => {
    if (initialSettings && typeof initialSettings === "object") {
      if (Array.isArray(initialSettings)) {
        return buildSettingsMap(initialSettings);
      }
      return initialSettings;
    }
    return buildSettingsMap([]);
  }, [initialSettings]);

  return (
    <SiteSettingsContext.Provider value={value}>
      {children}
    </SiteSettingsContext.Provider>
  );
}
