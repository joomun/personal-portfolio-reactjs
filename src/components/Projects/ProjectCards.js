import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { CgWebsite } from "react-icons/cg";
import { BsGithub } from "react-icons/bs";

function ProjectCards(props) {
  // Check if the necessary props are missing, and display "Coming Soon"
  if (!props.imgPath && !props.title && !props.description) {
    return (
      <Card className="project-card-view">
        <Card.Body>
          <Card.Title style={{ textAlign: "center" }}>Coming Soon...</Card.Title>
          <Card.Text style={{ textAlign: "justify", color: "gray" }}>
            New projects are on the way! Stay tuned for exciting updates.
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }

  // Default rendering for available project details
  return (
    <Card className="project-card-view">
      <Card.Img variant="top" src={props.imgPath} alt="card-img" />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text style={{ textAlign: "justify" }}>
          {props.description}
        </Card.Text>
        <Button variant="primary" href={props.ghLink} target="_blank">
          <BsGithub /> &nbsp;
          {props.isBlog ? "Blog" : "GitHub"}
        </Button>
        {"\n"}
        {"\n"}

        {/* Render Demo button if demoLink is provided */}
        {!props.isBlog && props.demoLink && (
          <Button
            variant="primary"
            href={props.demoLink}
            target="_blank"
            style={{ marginLeft: "10px" }}
          >
            <CgWebsite /> &nbsp;
            {"Demo"}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default ProjectCards;
