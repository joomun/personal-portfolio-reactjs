import React from "react";
import GitHubCalendar from "react-github-calendar";
import { Row } from "react-bootstrap";
import { useTheme } from "../../context/ThemeContext";

const calendarTheme = {
  light: ["#e6edf5", "#9be3cf", "#5fd3b2", "#2bb894", "#0d9488"],
  dark: ["#182131", "#26463f", "#2f7d6b", "#43b898", "#5eead4"],
};

function Github() {
  const { theme } = useTheme();

  return (
    <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
      <h1 className="project-heading" style={{ paddingBottom: "20px" }}>
        Days I <strong className="purple">Code</strong>
      </h1>
      <GitHubCalendar
        username="joomun"
        blockSize={14}
        blockMargin={5}
        fontSize={15}
        theme={calendarTheme}
        colorScheme={theme}
      />
    </Row>
  );
}

export default Github;
