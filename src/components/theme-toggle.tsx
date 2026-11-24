"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-color-scheme: dark)");
    const syncTheme = () => {
      const saved = document.documentElement.dataset.theme;
      setDark(saved ? saved === "dark" : preference.matches);
    };
    const syncStorage = (event: StorageEvent) => {
      if (event.key !== "lokalbord-theme" && event.key !== null) return;
      try {
        const saved = localStorage.getItem("lokalbord-theme");
        if (saved === "light" || saved === "dark") {
          document.documentElement.dataset.theme = saved;
        } else {
          delete document.documentElement.dataset.theme;
        }
      } catch {
        // Keep the current theme if storage is unavailable.
      }
      syncTheme();
    };
    syncTheme();
    preference.addEventListener("change", syncTheme);
    window.addEventListener("storage", syncStorage);
    return () => {
      preference.removeEventListener("change", syncTheme);
      window.removeEventListener("storage", syncStorage);
    };
  }, []);

  function toggleTheme() {
    const next = dark ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    setDark(next === "dark");
    try {
      localStorage.setItem("lokalbord-theme", next);
    } catch {
      // The switch still works for this visit when storage is unavailable.
    }
  }

  return (
    <button className="theme-toggle" type="button" onClick={toggleTheme}
      aria-label={dark ? "Uključi svijetli način" : "Uključi tamni način"}>
      {dark ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
    </button>
  );
}
