import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Packaged App Developement Associate",
          "Tech Enthusiast",
          "Like Web Development for FUN", 
          "FREE - PERSON",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;
