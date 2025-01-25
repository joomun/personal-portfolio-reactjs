import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import ProjectCards from "./ProjectCards";
import axios from "axios";
import DefaultProjectImage from "../../Assets/Default-Project Image.jpeg";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace 'your-github-username' with your actual GitHub username
    const username = "joomun";
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/users/${username}/repos`
        );
        setProjects(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching projects from GitHub:", error);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {loading ? (
            <h3 style={{ color: "gray", marginTop: "20px" }}>Loading...</h3>
          ) : projects.length > 0 ? (
            projects.map((project) => (
              <Col md={4} className="project-card" key={project.id}>
                <ProjectCards
                  title={project.name}
                  description={project.description || "No description available"}
                  ghLink={project.html_url}
                  demoLink={project.homepage || null}
                  imgPath={DefaultProjectImage}
                />
              </Col>
            ))
          ) : (
            <h3 style={{ color: "gray", marginTop: "20px" }}>
              No projects available to display.
            </h3>
          )}
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
