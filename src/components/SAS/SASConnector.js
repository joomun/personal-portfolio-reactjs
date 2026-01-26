import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import Particle from "../Particle";
import SASLogin from "./SASLogin";
import SASStatus from "./SASStatus";
import "./SAS.css";

function SASConnector() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sasToken, setSasToken] = useState(null);
  const [sasUrl, setSasUrl] = useState(null);

  useEffect(() => {
    // Check if user has existing session
    const storedToken = localStorage.getItem("sasToken");
    const storedUrl = localStorage.getItem("sasUrl");
    
    if (storedToken && storedUrl) {
      setIsAuthenticated(true);
      setSasToken(storedToken);
      setSasUrl(storedUrl);
    }
  }, []);

  const handleLogin = (token, url) => {
    setIsAuthenticated(true);
    setSasToken(token);
    setSasUrl(url);
    localStorage.setItem("sasToken", token);
    localStorage.setItem("sasUrl", url);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setSasToken(null);
    setSasUrl(null);
    localStorage.removeItem("sasToken");
    localStorage.removeItem("sasUrl");
  };

  return (
    <Container fluid className="sas-section">
      <Particle />
      <Container>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="sas-heading">
            <span className="purple">SAS</span> Connector
          </h1>
          <p className="sas-subtitle">
            Connect to your Storage Access Service backend via DuckDNS
          </p>
        </motion.div>

        <Row style={{ justifyContent: "center", padding: "20px" }}>
          <Col lg={8}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {!isAuthenticated ? (
                <SASLogin onLogin={handleLogin} />
              ) : (
                <SASStatus
                  sasToken={sasToken}
                  sasUrl={sasUrl}
                  onLogout={handleLogout}
                />
              )}
            </motion.div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default SASConnector;
