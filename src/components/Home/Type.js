import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <div className="terminal-container">
      <div className="terminal-header">
        <div className="terminal-buttons">
          <span className="terminal-button close"></span>
          <span className="terminal-button minimize"></span>
          <span className="terminal-button maximize"></span>
        </div>
        <div className="terminal-title">visitor@portfolio:~$</div>
      </div>
      <div className="terminal-content">
        <span className="terminal-prompt">$ </span>
        <Typewriter
          options={{
            strings: [
              "whoami && echo 'Packaged App Development Associate'",
              "cat skills.txt && echo 'Tech Enthusiast'",
              "ls projects/* | grep 'Web Development'",
              "echo $STATUS && echo 'FREE - PERSON'",
            ],
            autoStart: true,
            loop: true,
            deleteSpeed: 30,
            delay: 80,
          }}
        />
      </div>
    </div>
  );
}

export default Type;
