import React from "react";
import { Container } from "react-bootstrap";
import Particle from "../Particle";
import Type from "./Type";

function Home() {
  return (
    <section className="terminal-theme">
      <Container fluid className="home-section" id="home">
        <Particle />
        <Container className="home-content">
          <div className="main-terminal">
            <div className="terminal-header">
              <div className="terminal-buttons">
                <span className="terminal-button close"></span>
                <span className="terminal-button minimize"></span>
                <span className="terminal-button maximize"></span>
              </div>
              <div className="terminal-title">visitor@portfolio:~$</div>
            </div>
            
            <div className="terminal-body">
              <div className="terminal-welcome">
                <span className="terminal-line system">
                  Welcome to JoomunOS 1.0.0 LTS (GNU/Linux 5.15.0-1019-aws x86_64)
                </span>
                <span className="terminal-line system">
                  Last login: {new Date().toLocaleString()}
                </span>
              </div>

              <div className="terminal-main">
                <span className="terminal-prompt">visitor@portfolio:~$ </span>
                <Type />
              </div>

              <div className="terminal-help">
                <span className="terminal-line info">
                  Type 'help' to see available commands
                </span>
              </div>
            </div>
          </div>
        </Container>
      </Container>
    </section>
  );
}

export default Home;
