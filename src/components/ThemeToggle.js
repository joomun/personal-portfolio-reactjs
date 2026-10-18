import React, { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";

const resolveBackendUrl = () => {
  const envUrl = process.env.REACT_APP_BACKEND_URL;

  if (envUrl) {
    return envUrl.replace(/\/$/, "");
  }

  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;

    if (hostname.includes("noorpersonalspace.africa")) {
      return "https://api.noorpersonalspace.africa";
    }

    if (hostname === "localhost" || hostname === "127.0.0.1") {
      return "http://localhost:4000";
    }
  }

  return "http://localhost:4000";
};

const DEFAULT_BACKEND_URL = resolveBackendUrl();

function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const [backendAvailable, setBackendAvailable] = useState(false);
  const [checkingBackend, setCheckingBackend] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const checkBackendStatus = async () => {
      const backendUrl = DEFAULT_BACKEND_URL.replace(/\/$/, "");

      try {
        const response = await fetch(`${backendUrl}/api/health`, {
          method: "GET",
          cache: "no-store",
        });

        if (!cancelled) {
          setBackendAvailable(response.ok);
          setCheckingBackend(false);
        }
      } catch (error) {
        if (!cancelled) {
          setBackendAvailable(false);
          setCheckingBackend(false);
        }
      }
    };

    checkBackendStatus();
    const intervalId = window.setInterval(checkBackendStatus, 30000);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="theme-control">
      <span
        className={`backend-status ${backendAvailable ? "online" : "offline"} ${checkingBackend ? "checking" : ""}`.trim()}
        title={backendAvailable ? "Backend connected" : "Backend unavailable"}
        aria-live="polite"
      >
        <span className="backend-status-dot" />
        <span className="backend-status-label">
          {checkingBackend ? "Checking..." : backendAvailable ? "Live" : "Offline"}
        </span>
      </span>

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
    </div>
  );
}

export default ThemeToggle;
