import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import Particle from "../Particle";
import "./Animations.css";

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
        <div className="text-center">
          <span className="section-eyebrow">~/ motion</span>
          <h1 className="animations-heading">
            3D <span className="purple">Animation</span> Showcase
          </h1>
          <p className="section-subtitle">
            Experiments in motion, rendering and real-time graphics.
          </p>
        </div>
        <Row className="animations-grid-row">
          {animations.map((anim, index) => (
            <Col md={6} className="animation-card" key={index}>
              <motion.div
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
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
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
}

export default AnimationsPage;