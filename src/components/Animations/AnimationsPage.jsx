import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Particle from "../Particle";
import "./Animations.css";
import Typewriter from "typewriter-effect";

function AnimationsPage() {
  const animations = [
    {
      type: "video",
      title: "3D Animation Demo",
      src: "/animations/demo.mp4",
      description: "A showcase of fluid 3D animations"
    },
    {
      type: "image",
      title: "3D Model Render",
      src: "/animations/render.png",
      description: "Static 3D model visualization"
    }
    // Add more animations here
  ];

  return (
    <Container fluid className="animations-section">
      <Particle />
      <Container>
        <h1 className="animations-heading">
          3D <span className="purple">Animations</span> Showcase
        </h1>
        <Row style={{ justifyContent: "center", padding: "10px" }}>
          {animations.map((anim, index) => (
            <Col md={6} className="animation-card" key={index}>
              <Card className="animation-card-view">
                <Card.Title>{anim.title}</Card.Title>
                {anim.type === "video" ? (
                  <video 
                    className="animation-media"
                    controls
                    loop
                    muted
                  >
                    <source src={anim.src} type="video/mp4" />
                    Your browser does not support video playback.
                  </video>
                ) : (
                  <Card.Img
                    src={anim.src}
                    alt={anim.title}
                    className="animation-media"
                  />
                )}
                <Card.Body>
                  <Card.Text>{anim.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
}

function AnimationsPage() {
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
        <Typewriter
          options={{
            strings: [
              `#!/bin/bash\n$ Loading personality.sh...\n[=====>] 100%\n$ cat /etc/profile\n"Just another dev diving into the dark terminal abyss"`,
              
              `$ sudo apt-get update brain\n[====>] 100%\n$ apt list --installed\nTypeScript 5.0.1\nPython 3.11.0\nCoffee 2.cups daily`,
              
              `$ whoami\nPackaged App Development Associate\n$ echo $MOOD\n"Always coding, occasionally sleeping"`,
              
              `$ git status\nOn branch master\nYour life is up to date\nNothing to stress about, working tree clean`,
              
              `$ curl http://brain/thoughts\n{"status": "200 OK",\n "current_task": "Making the web better, one div at a time"}`
            ],
            autoStart: true,
            loop: true,
            deleteSpeed: 20,
            delay: 60,
          }}
        />
      </div>
    </div>
  );
}

export default AnimationsPage;