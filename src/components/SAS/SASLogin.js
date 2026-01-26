import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { motion } from "framer-motion";
import "./SAS.css";

function SASLogin({ onLogin }) {
  const [formData, setFormData] = useState({
    duckdnsDomain: "noorpersonalspace",
    port: "5000",
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const sasUrl = `http://${formData.duckdnsDomain}.duckdns.org:${formData.port}`;
      
      // Test connection to SAS backend
      const response = await fetch(`${sasUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Login failed. Check your credentials and connection.");
      }

      const data = await response.json();
      
      if (data.token) {
        setSuccess("Connected successfully!");
        setTimeout(() => {
          onLogin(data.token, sasUrl);
        }, 1500);
      } else {
        throw new Error("No token received from server");
      }
    } catch (err) {
      setError(err.message || "Connection failed. Make sure your backend is running.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="sas-login-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="sas-card">
        <h2 className="sas-card-title">Login to SAS Backend</h2>
        
        {error && (
          <Alert variant="danger" className="sas-alert">
            {error}
          </Alert>
        )}
        
        {success && (
          <Alert variant="success" className="sas-alert">
            {success}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="sas-form-group">
            <Form.Label>DuckDNS Domain</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g., noorpersonalspace"
              name="duckdnsDomain"
              value={formData.duckdnsDomain}
              onChange={handleChange}
              required
              className="sas-input"
            />
            <Form.Text className="sas-form-text">
              Enter your DuckDNS subdomain (without .duckdns.org)
            </Form.Text>
          </Form.Group>

          <Form.Group className="sas-form-group">
            <Form.Label>Port</Form.Label>
            <Form.Control
              type="number"
              placeholder="5000"
              name="port"
              value={formData.port}
              onChange={handleChange}
              className="sas-input"
            />
          </Form.Group>

          <Form.Group className="sas-form-group">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="sas-input"
            />
          </Form.Group>

          <Form.Group className="sas-form-group">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="sas-input"
            />
          </Form.Group>

          <Button
            type="submit"
            disabled={loading}
            className="sas-btn-primary"
          >
            {loading ? "Connecting..." : "Connect to SAS"}
          </Button>
        </Form>

        <div className="sas-info-box">
          <h5>How to setup:</h5>
          <ol>
            <li>Install DuckDNS and get your subdomain</li>
            <li>Run the SAS startup script on your backend machine</li>
            <li>Enter your DuckDNS domain above</li>
            <li>Enter your credentials to connect</li>
          </ol>
        </div>
      </div>
    </motion.div>
  );
}

export default SASLogin;
