import React, { useState, useEffect, useCallback } from "react";
import { Button, Badge, Alert } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaCheck, FaTimes, FaClock } from "react-icons/fa";
import "./SAS.css";

function SASStatus({ sasToken, sasUrl, onLogout }) {
  const [status, setStatus] = useState("checking");
  const [statusInfo, setStatusInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastChecked, setLastChecked] = useState(new Date());

  const checkConnection = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${sasUrl}/api/health`, {
        headers: {
          Authorization: `Bearer ${sasToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStatus("connected");
        setStatusInfo(data);
      } else {
        setStatus("error");
        setStatusInfo({ error: "Server returned status " + response.status });
      }
    } catch (err) {
      setStatus("disconnected");
      setStatusInfo({ error: err.message });
    } finally {
      setLoading(false);
      setLastChecked(new Date());
    }
  }, [sasToken, sasUrl]);

  useEffect(() => {
    checkConnection();
    // Auto-check every 30 seconds
    const interval = setInterval(checkConnection, 30000);
    return () => clearInterval(interval);
  }, [checkConnection]);

  const getStatusBadge = () => {
    switch (status) {
      case "connected":
        return (
          <Badge bg="success" className="sas-status-badge">
            <FaCheck /> Connected
          </Badge>
        );
      case "disconnected":
        return (
          <Badge bg="danger" className="sas-status-badge">
            <FaTimes /> Disconnected
          </Badge>
        );
      case "checking":
        return (
          <Badge bg="warning" className="sas-status-badge">
            <FaClock /> Checking...
          </Badge>
        );
      default:
        return (
          <Badge bg="danger" className="sas-status-badge">
            <FaTimes /> Error
          </Badge>
        );
    }
  };

  return (
    <motion.div
      className="sas-status-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="sas-card">
        <div className="sas-status-header">
          <h2 className="sas-card-title">SAS Backend Status</h2>
          {getStatusBadge()}
        </div>

        <div className="sas-info-display">
          <div className="info-item">
            <span className="info-label">Backend URL:</span>
            <span className="info-value">{sasUrl}</span>
          </div>

          <div className="info-item">
            <span className="info-label">Last Checked:</span>
            <span className="info-value">
              {lastChecked.toLocaleTimeString()}
            </span>
          </div>

          {statusInfo && (
            <>
              {statusInfo.uptime && (
                <div className="info-item">
                  <span className="info-label">Uptime:</span>
                  <span className="info-value">{statusInfo.uptime}</span>
                </div>
              )}

              {statusInfo.version && (
                <div className="info-item">
                  <span className="info-label">Version:</span>
                  <span className="info-value">{statusInfo.version}</span>
                </div>
              )}

              {statusInfo.error && (
                <Alert variant="warning" className="sas-alert">
                  {statusInfo.error}
                </Alert>
              )}
            </>
          )}
        </div>

        <div className="sas-actions">
          <Button
            onClick={checkConnection}
            disabled={loading}
            className="sas-btn-secondary"
          >
            {loading ? "Checking..." : "Refresh Status"}
          </Button>
          <Button
            onClick={onLogout}
            variant="outline-danger"
            className="sas-btn-disconnect"
          >
            Disconnect
          </Button>
        </div>

        <div className="sas-info-box">
          <h5>Connection Details:</h5>
          <ul>
            <li>Status: {status}</li>
            <li>Auto-refresh: Every 30 seconds</li>
            <li>Token: {sasToken ? "Stored securely" : "None"}</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

export default SASStatus;
