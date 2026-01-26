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

export default AnimationsPage;