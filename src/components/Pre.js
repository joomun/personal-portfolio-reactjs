import React, { useEffect, useState } from "react";
import "./Animations/Animations.css";

const sshSteps = [
  "user@local:~$ ssh noor@portfolio",
  "Connecting to portfolio.joomun.com...",
  "Authenticating...",
  "Authentication successful.",
  "Establishing secure connection...",
  "Welcome to Noor's Portfolio Terminal!",
  "Tip: Light terminals attract more bugs 🐞",
];

function Pre(props) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (props.load) {
      setStep(0);
      const interval = setInterval(() => {
        setStep((prev) => (prev < sshSteps.length - 1 ? prev + 1 : prev));
      }, 350);
      return () => clearInterval(interval);
    }
  }, [props.load]);

  return (
    <div id={props.load ? "preloader" : "preloader-none"}>
      {props.load && (
        <div className="terminal-loader">
          <div className="terminal-header">
            <span className="terminal-dot red"></span>
            <span className="terminal-dot yellow"></span>
            <span className="terminal-dot green"></span>
            <span className="terminal-title">noor@portfolio:~$</span>
          </div>
          <div className="terminal-body">
            {sshSteps.slice(0, step + 1).map((line, idx) => (
              <div
                key={idx}
                className={`terminal-line${idx === sshSteps.length - 1 ? " terminal-joke" : ""}`}
                style={{
                  color:
                    idx === 0
                      ? "#50fa7b"
                      : idx === sshSteps.length - 1
                      ? "#ffb86c"
                      : "#f8f8f2",
                  fontFamily: "'Fira Code', monospace",
                  marginBottom: "6px",
                  fontSize: "1.1em",
                }}
              >
                {line}
                {idx === step && step < sshSteps.length - 1 && (
                  <span className="terminal-cursor">█</span>
                )}
              </div>
            ))}
            <div className="terminal-loading-bar">
              <span className="loading-bar"></span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Pre;
