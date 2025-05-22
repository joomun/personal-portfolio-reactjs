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
        background: "transparent",
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
        }}
      >
        <Container style={{ maxWidth: "1600px" }}>
          <div
            style={{
              marginTop: "40px",
              textAlign: "center",
              position: "relative",
              zIndex: 2,
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
