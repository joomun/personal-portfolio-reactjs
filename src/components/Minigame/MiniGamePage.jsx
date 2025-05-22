import React from "react";
import MemoryGame from "../MemoryGame";
import Particle from "../Particle";
import { Container } from "react-bootstrap";

function MiniGamePage() {
  return (
    <Container
      fluid
      className="project-section"
      style={{
        position: "relative",
        minHeight: "calc(100vh - 80px)", // Account for navbar
        background: "transparent",
        padding: 0,
        overflow: "hidden",
      }}
    >
      <Particle />
      <Container
        style={{
          position: "relative",
          zIndex: 2,
          padding: 0,
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MemoryGame />
      </Container>
    </Container>
  );
}

export default MiniGamePage;
