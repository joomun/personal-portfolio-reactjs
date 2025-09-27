import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
    <Card.Body>
      <blockquote className="blockquote mb-0">
        <p style={{ textAlign: "justify" }}>
          Hi Everyone, I am <span className="purple">Joomun Noor </span> 
          from <span className="purple">Mauritius.</span>
          <br />
          I hold a <span className="purple">BSc in Computer Science System Engineering with Honours</span>.
          <br />
          I am currently working as a <span className="purple">Packaged App Development Associate</span>, 
          where I specialize in Linux, Bash/Shell scripting, and innovative solutions.
          <br />
          <br />
          Outside of work, I have been actively involved in the tech community. 
          As a <span className="purple">Student Ambassador</span> for two years and an 
          <span className="purple">executive member of the IEEE MDX student branch</span>, 
          I’ve had the privilege of organizing and participating in impactful events, 
          fostering collaboration, and connecting with industry leaders.
          <br />
          <br />
          When I’m not working, you’ll often find me doing what I love most:
        </p>
        <ul>
          <li className="about-activity">
            <ImPointRight /> Gaming
          </li>
          <li className="about-activity">
            <ImPointRight /> Sleeping
          </li>
          <li className="about-activity">
            <ImPointRight /> Coding for fun
          </li>
        </ul>

        <p style={{ color: "rgb(155 126 172)" }}>
          "Embrace every challenge as an opportunity to learn, innovate, and make a difference—whether it's in code, community, or creativity."{" "}
        </p>
        <footer className="blockquote-footer">[Joomun Noor]</footer>
      </blockquote>
    </Card.Body>

    </Card>
  );
}

// Add fade-in animation
const style = document.createElement("style");
style.innerHTML = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px);}
  to { opacity: 1; transform: translateY(0);}
}
`;
document.head.appendChild(style);

export default AboutCard;
