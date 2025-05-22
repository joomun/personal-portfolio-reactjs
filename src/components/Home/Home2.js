import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.svg";
import { motion } from "framer-motion";
import {
  AiFillGithub,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

function Home2() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
  };

  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row className="align-items-center">
          <Col md={7} className="home-about-description">
            <motion.div {...fadeIn}>
              <h1 className="minimal-heading">
                About <span className="purple">Me</span>
              </h1>
              <p className="home-about-body">
                I am a passionate <span className="purple">Packaged App Development Associate</span> with expertise in{" "}
                <span className="purple">Linux</span>, <span className="purple">TypeScript</span>, and{" "}
                <span className="purple">Cloud Services</span>.
                <br /><br />
                My focus areas include:
                <br />
                <motion.ul 
                  className="skill-list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <li><span className="purple">▹</span> Web Development</li>
                  <li><span className="purple">▹</span> Azure & AWS Cloud Services</li>
                  <li><span className="purple">▹</span> IoT & Raspberry Pi Projects</li>
                  <li><span className="purple">▹</span> Open Source Contributions</li>
                </motion.ul>
                <br />
                I'm proud to be part of the <span className="purple">IEEE Middlesex University Student Branch</span>, 
                where I collaborate with fellow tech enthusiasts.
              </p>
            </motion.div>
          </Col>
          
          <Col md={5} className="myAvtar">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="avatar-container"
            >
              <img src={myImg} className="about-img" alt="avatar" />
            </motion.div>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <motion.div 
              className="home-about-social"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className="connect-heading">Let's Connect</h2>
              <div className="social-icons-container">
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href="https://github.com/joomun"
                  target="_blank"
                  rel="noreferrer"
                  className="social-icon"
                >
                  <AiFillGithub />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href="https://www.linkedin.com/in/joomun-noorani-muddathir-846636228/"
                  target="_blank"
                  rel="noreferrer"
                  className="social-icon"
                >
                  <FaLinkedinIn />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href="https://www.instagram.com/muddathir_joomun/"
                  target="_blank"
                  rel="noreferrer"
                  className="social-icon"
                >
                  <AiFillInstagram />
                </motion.a>
              </div>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Home2;
