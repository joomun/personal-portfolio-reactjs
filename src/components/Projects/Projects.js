import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Particle from "../Particle";
import "./Projects.css";
import ProjectCards from "./ProjectCards";
import axios from "axios";
import DefaultProjectImage from "../../Assets/Default-Project Image.jpeg";
import { motion, AnimatePresence } from "framer-motion";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Project categories
  const categories = ["all", "web", "mobile", "ai", "other"];

  useEffect(() => {
    const username = "joomun";
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/users/${username}/repos`
        );

        // List of highlighted repositories
        const highlights = ["2d_platform_game-Website", "e-commerce_website", "Multipet-Feeder", "vui-Campus-Assistant", "GoGreen-24hr-Hackathon"];

        const enhancedProjects = await Promise.all(
          response.data.map(async (repo) => {
            const imageUrl = await fetchRepoImage(username, repo.name);
            // Determine category based on repo topics or name
            let category = "other";
            if (repo.topics?.includes("web") || repo.name.toLowerCase().includes("web")) {
              category = "web";
            } else if (repo.topics?.includes("mobile") || repo.name.toLowerCase().includes("mobile")) {
              category = "mobile";
            } else if (repo.topics?.includes("ai") || repo.name.toLowerCase().includes("ai")) {
              category = "ai";
            }
            
            return { 
              ...repo, 
              imgPath: imageUrl || DefaultProjectImage, 
              highlighted: highlights.includes(repo.name),
              category
            };
          })
        );

        const sortedProjects = enhancedProjects.sort((a, b) => {
          if (a.highlighted && !b.highlighted) return -1;
          if (!a.highlighted && b.highlighted) return 1;
          return new Date(b.created_at) - new Date(a.created_at);
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
      const response = await axios.get(imageUrl, { validateStatus: false });
      return response.status === 200 ? imageUrl : null;
    } catch {
      return null;
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesFilter = filter === "all" || project.category === filter;
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (project.description && project.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="project-heading">
            My Recent <strong className="purple">Works </strong>
          </h1>
          <p style={{ color: "white" }}>
            Here are a few projects I've worked on recently.
          </p>

          <div className="project-filters mb-4">
            <div className="d-flex justify-content-center mb-3">
              <input
                type="text"
                placeholder="Search projects..."
                className="form-control w-50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ 
                  background: "rgba(255, 255, 255, 0.1)", 
                  color: "white",
                  border: "1px solid rgba(255, 255, 255, 0.2)"
                }}
              />
            </div>
            <div className="d-flex justify-content-center gap-2">
              {categories.map(cat => (
                <Button
                  key={cat}
                  variant={filter === cat ? "primary" : "outline-primary"}
                  onClick={() => setFilter(cat)}
                  className="text-capitalize"
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="loading-container text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2 text-light loading-text">Fetching projects...</p>
            </div>
          ) : (
            <Row>
              <AnimatePresence>
                {filteredProjects.length > 0 ? (
                  filteredProjects.map((project, index) => (
                    <Col md={4} className="project-card mb-4" key={project.id}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <ProjectCards
                          title={project.name}
                          description={project.description || "No description available"}
                          ghLink={project.html_url}
                          demoLink={project.homepage || null}
                          imgPath={project.imgPath}
                          highlighted={project.highlighted}
                          category={project.category}
                        />
                      </motion.div>
                    </Col>
                  ))
                ) : (
                  <Col>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center text-light mt-4"
                    >
                      <h3>Oops! User did not start to do this development xD</h3>
                      <p>Have some patience 😊</p>
                    </motion.div>
                  </Col>
                )}
              </AnimatePresence>
            </Row>
          )}
        </motion.div>
      </Container>
    </Container>
  );
}

export default Projects;
