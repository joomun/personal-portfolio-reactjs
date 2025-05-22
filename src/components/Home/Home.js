import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import homeLogo from "../../Assets/home-main.svg";
import Particle from "../Particle";
import Home2 from "./Home2";
import "./Home.css";
import Type from "./Type";
import { motion } from "framer-motion";

function Home() {
  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Particle />
        <Container className="home-content">
          <Row className="align-items-center">
            <Col md={7} className="home-header">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="heading minimal-heading">
                  Hello
                  <motion.span
                    className="wave"
                    role="img"
                    aria-labelledby="wave"
                    animate={{
                      rotate: [0, 14, -8, 14, 0],
                      transition: {
                        duration: 2.5,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut",
                      },
                    }}
                    style={{ display: "inline-block", marginLeft: "10px" }}
                  >
                    👋🏻
                  </motion.span>
                </h1>

                <div className="name-container">
                  <motion.h1
                    className="heading-name"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    I'm{" "}
                    <strong className="main-name">Joomun Noor</strong>
                  </motion.h1>
                </div>

                <motion.div
                  className="type-container"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <Type />
                </motion.div>
              </motion.div>
            </Col>

            <Col md={5} className="home-img-container">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <img
                  src={homeLogo}
                  alt="home pic"
                  className="home-img"
                />
              </motion.div>
            </Col>
          </Row>
        </Container>
      </Container>
      <Home2 />
    </section>
  );
}

export default Home;
