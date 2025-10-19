import React from "react";
import "./Animations/Animations.css";

function Pre(props) {
  return (
    <div id={props.load ? "preloader" : "preloader-none"}>
      <div className="terminal-loader">
        <div className="terminal-header">
          <span className="terminal-dot red"></span>
          <span className="terminal-dot yellow"></span>
          <span className="terminal-dot green"></span>
          <span className="terminal-title">visitor@portfolio:~$</span>
        </div>
        <div className="terminal-body">
          <span className="terminal-prompt">$</span> 
          <span className="terminal-joke">join in my daily black terminal...</span>
          <div className="terminal-loading-bar">
            <span className="loading-bar"></span>
          </div>
          <div className="terminal-joke-message">
            Why do programmers prefer dark mode?<br />
            <span className="terminal-punchline">Because light attracts bugs! 🐞</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pre;
