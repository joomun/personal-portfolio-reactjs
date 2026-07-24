import React from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";

function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className={`theme-toggle ${className}`.trim()}
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {/* key forces the pop-in animation each time the theme changes */}
      <span className="tt-icon" key={theme}>
        {isDark ? <FiSun /> : <FiMoon />}
      </span>
    </button>
  );
}

export default ThemeToggle;
