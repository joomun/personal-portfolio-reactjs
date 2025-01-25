import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import ProjectCards from "./ProjectCards";
import axios from "axios";
import DefaultProjectImage from "../../Assets/Default-Project Image.jpeg";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // List of highlighted repositories
  const highlights = ["2d_platform_game-Website", "e-commerce_website", "Multipet-Feeder","vui-Campus-Assistant","GoGreen-24hr-Hackathon"];

  useEffect(() => {
    const username = "joomun"; // Replace with your GitHub username
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/users/${username}/repos`
        );

        // Enhance the project data with image URLs (assuming a convention of "preview.png" in each repo)
        const enhancedProjects = await Promise.all(
          response.data.map(async (repo) => {
            const imageUrl = await fetchRepoImage(username, repo.name);
            return { ...repo, imgPath: imageUrl || DefaultProjectImage };
          })
        );

        // Sort projects: highlights first, then others
        const sortedProjects = enhancedProjects.sort((a, b) => {
          const aHighlight = highlights.includes(a.name);
          const bHighlight = highlights.includes(b.name);
          if (aHighlight && !bHighlight) return -1;
          if (!aHighlight && bHighlight) return 1;
          return 0;
        });

        setProjects(sortedProjects);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching projects from GitHub:", error);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const fetchRepoImage = async (username, repoName) => {
    try {
      const imageUrl = `https://raw.githubusercontent.com/${username}/${repoName}/main/preview.png`;
      const response = await axios.get(imageUrl, { validateStatus: false }); // Allows status check
      return response.status === 200 ? imageUrl : null;
    } catch {
      return null; // Return null if the image is not found
    }
  };

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
                  imgPath={project.imgPath} // Dynamically fetched image
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
