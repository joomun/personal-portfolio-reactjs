import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <div className="typewriter-container">
      <Typewriter
        options={{
          strings: [
            "Linux Enthusiast", 
            "Bash Scripting ",
            "Problem Solver",
            "Innovation Seeker",
            "Package App Development Analyst"
          ],
          autoStart: true,
          loop: true,
          deleteSpeed: 30,
          delay: 80,
          cursor: "█",
        }}
      />
    </div>
  );
}

export default Type;
