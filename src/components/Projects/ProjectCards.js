import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { CgWebsite } from "react-icons/cg";
import { BsGithub } from "react-icons/bs";
import { FaStar, FaCode } from "react-icons/fa";
import { motion } from "framer-motion";

function ProjectCards(props) {
  if (!props.imgPath && !props.title && !props.description) {
    return (
      <Card className="project-card-view h-100">
        <Card.Body className="d-flex flex-column justify-content-center align-items-center">
          <Card.Title className="text-center mb-4">Coming Soon...</Card.Title>
          <FaCode className="mb-3" style={{ fontSize: "2rem", opacity: 0.6 }} />
          <Card.Text className="text-center text-muted">
            New projects are on the way! Stay tuned for exciting updates.
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }

  const getCategoryColor = (category) => {
    const colors = {
      web: "#61dafb",
      mobile: "#87cf3e",
      ai: "#ff6b6b",
      other: "#845ef7"
    };
    return colors[category] || colors.other;
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="h-100"
    >
      <Card className="project-card-view h-100">
        {props.highlighted && (
          <div className="highlight-badge">
            <FaStar style={{ color: "gold", fontSize: "1.2rem" }} />
          </div>
        )}
        <div className="card-img-wrapper">
          <Card.Img
            variant="top"
            src={props.imgPath}
            alt="card-img"
            className="project-card-image"
          />
          <div className="card-img-overlay">
            <div className="overlay-content">
              <Button variant="light" href={props.ghLink} target="_blank" className="me-2">
                <BsGithub /> View Code
              </Button>
              {props.demoLink && (
                <Button variant="primary" href={props.demoLink} target="_blank">
                  <CgWebsite /> Live Demo
                </Button>
              )}
            </div>
          </div>
        </div>
        <Card.Body className="d-flex flex-column">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <Card.Title className="mb-0">{props.title}</Card.Title>
            {props.category && (
              <span 
                className="category-badge"
                style={{ 
                  backgroundColor: getCategoryColor(props.category),
                  color: "white",
                  padding: "2px 8px",
                  borderRadius: "12px",
                  fontSize: "0.8rem"
                }}
              >
                {props.category}
              </span>
            )}
          </div>
          <Card.Text className="text-muted flex-grow-1">
            {props.description}
          </Card.Text>
          <div className="d-flex mt-3 card-buttons">
            <Button 
              variant="outline-primary" 
              href={props.ghLink} 
              target="_blank"
              className="w-100 me-2"
            >
              <BsGithub /> &nbsp; Code
            </Button>
            {props.demoLink && (
              <Button
                variant="primary"
                href={props.demoLink}
                target="_blank"
                className="w-100 ms-2"
              >
                <CgWebsite /> &nbsp; Demo
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  );
}

export default ProjectCards;
