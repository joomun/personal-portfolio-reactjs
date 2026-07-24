import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import Particle from "../Particle";
import Github from "./Github";
import Techstack from "./Techstack";
import Aboutcard from "./AboutCard";
import laptopImg from "../../Assets/about.png";
import Toolstack from "./Toolstack";
import Tilt from "react-parallax-tilt";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

function About() {
  return (
    <Container fluid className="about-section">
      <Particle />
      <Container>
        <Row className="about-top-row">
          <Col md={7} className="about-intro-col">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.6 }}
            >
              <span className="section-eyebrow">~/ about</span>
              <h1 className="section-title">
                Know Who <strong className="purple">I'm</strong>
              </h1>
              <Aboutcard />
            </motion.div>
          </Col>
          <Col md={5} className="about-image-col">
            <motion.div
              className="about-img"
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <Tilt
                glareEnable={true}
                glareMaxOpacity={0.12}
                scale={1.03}
                tiltMaxAngleX={8}
                tiltMaxAngleY={8}
              >
                <img src={laptopImg} alt="about" className="img-fluid" />
              </Tilt>
            </motion.div>
          </Col>
        </Row>

        <h1 className="project-heading">
          Professional <strong className="purple">Skillset</strong>
        </h1>
        <Tilt glareEnable={true} glareMaxOpacity={0.15} scale={1.02}>
          <Techstack />
        </Tilt>

        <h1 className="project-heading">
          <strong className="purple">Tools</strong> I Use
        </h1>
        <Tilt glareEnable={true} glareMaxOpacity={0.15} scale={1.02}>
          <Toolstack />
        </Tilt>

        <Github />
      </Container>
    </Container>
  );
}

export default About;
