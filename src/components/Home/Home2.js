import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.svg";
import Tilt from "react-parallax-tilt";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
      <Row>
        <Col md={8} className="home-about-description">
          <h1 style={{ fontSize: "2.6em" }}>
            LET ME <span className="purple"> INTRODUCE </span> MYSELF
          </h1>
          <p className="home-about-body">
            I am a passionate <b className="purple">Packaged App Development Associate</b>, with a strong foundation in{" "}
            <i>
              <b className="purple">Linux</b>, <b className="purple">Bash/Shell scripting</b>, and 
              <b className="purple"> innovative solutions.</b>
            </i>
            <br />
            <br />While my professional career focuses on packaged app development, I also enjoy exploring{" "}
            <i>
              <b className="purple">web development</b>, <b className="purple">IoT</b>, and emerging technologies.
            </i>
            <br />
            <br />
            I have expertise in technologies like{" "}
            <i>
              <b className="purple">TypeScript</b>, <b className="purple">Azure services</b>, <b className="purple">AWS (Lambda, S3)</b>, and{" "}
              <b className="purple">Python development</b>.
            </i>
            <br />
            <br />
            Additionally, I love experimenting with hardware projects using{" "}
            <i>
              <b className="purple">Raspberry Pi</b>.
            </i>
            <br />
            <br />
            Whenever possible, I contribute to{" "}
            <b className="purple">open-source projects</b> and collaborate with other tech enthusiasts to create amazing solutions! Great example is my role in 
            <b className="purple"> IEEE Middlesex Univeristy Student Branch</b>
          </p>
        </Col>
        <Col md={4} className="myAvtar">
          <Tilt>
            <img src={myImg} className="img-fluid" alt="avatar" />
          </Tilt>
        </Col>
      </Row>

        <Row>
          <Col md={12} className="home-about-social">
            <h1>FIND ME ON</h1>
            <p>
              Feel free to <span className="purple">connect </span>with me
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/joomun"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/joomun-noorani-muddathir-846636228/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.instagram.com/muddathir_joomun/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiFillInstagram />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;
