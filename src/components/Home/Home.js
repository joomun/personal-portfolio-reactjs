import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import homeLogo from "../../Assets/home-main.svg";
import Particle from "../Particle";
import Home2 from "./Home2";
import Type from "./Type";

function Home() {
  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Particle />
        <Container className="home-content">
          <Row>
            <Col md={7} className="home-header terminal-style">
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
                  <div className="terminal-welcome">
                    <span className="terminal-prompt">$ echo "Welcome!"</span>
                    <h1 className="terminal-output">
                      Hi There!{" "}
                      <span className="wave" role="img" aria-labelledby="wave">
                        👋🏻
                      </span>
                    </h1>
                  </div>
                  
                  <div className="terminal-user">
                    <span className="terminal-prompt">$ whoami</span>
                    <h1 className="terminal-output heading-name">
                      <strong className="main-name">root@joomun-noor</strong>
                    </h1>
                  </div>

                  <div className="terminal-info">
                    <Type />
                  </div>
                </div>
              </div>
            </Col>

            <Col md={5} style={{ paddingBottom: 20 }}>
              <img
                src={homeLogo}
                alt="home pic"
                className="img-fluid"
                style={{ maxHeight: "450px" }}
              />
            </Col>
          </Row>
        </Container>
      </Container>
      <Home2 />
    </section>
  );
}

export default Home;
