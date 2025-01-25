import React from "react";
import MemoryGame from "../../components/MemoryGame"; // Adjust path if needed
import Particle from "../Particle"; // Assuming Particle is a component for background animation
import { Container, Row } from "react-bootstrap"; // Assuming you're using react-bootstrap

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <div style={{ marginTop: "40px", textAlign: "center" }}>
          {/* MiniGame Section */}
          <h2 className="text-3xl text-white">Mini-Game</h2>
          <MemoryGame />
        </div>
      </Container>
    </Container>
  );
}

export default Projects;
