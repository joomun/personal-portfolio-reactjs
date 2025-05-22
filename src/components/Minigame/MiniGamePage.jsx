import React from "react";
import MemoryGame from "../MemoryGame";
import Particle from "../Particle";
import { Container } from "react-bootstrap";

function MiniGamePage() {
  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100vw",
        background: "transparent",
        overflow: "hidden",
      }}
    >
      <Particle />
      <Container
        fluid
        className="project-section"
        style={{
          background: "transparent",
          position: "relative",
          zIndex: 2,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Container
          style={{
            width: "100%",
            maxWidth: "100vw",
            padding: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "1600px",
              margin: "0 auto",
              padding: "clamp(10px, 2vw, 40px)",
            }}
          >
            <MemoryGame />
          </div>
        </Container>
      </Container>
    </div>
  );
}

export default MiniGamePage;
