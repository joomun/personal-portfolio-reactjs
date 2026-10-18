import React, { useEffect, useState } from 'react';
import { Alert, Button, Card, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { FaNetworkWired, FaWifi, FaGlobeAmericas } from 'react-icons/fa';

const API_BASE = process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000';

function NetworkMonitor() {
  const [publicIp, setPublicIp] = useState('');
  const [target, setTarget] = useState('');
  const [loadingIp, setLoadingIp] = useState(true);
  const [isPinging, setIsPinging] = useState(false);
  const [pingResult, setPingResult] = useState(null);
  const [error, setError] = useState('');

  const fetchPublicIp = async () => {
    try {
      setLoadingIp(true);
      const response = await fetch(`${API_BASE}/api/public-ip`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Unable to fetch public IP.');
      }

      setPublicIp(data.ip || 'Unknown');
      setTarget(data.ip || '');
    } catch (err) {
      setError(err.message || 'Unable to fetch public IP.');
    } finally {
      setLoadingIp(false);
    }
  };

  const handlePing = async (event) => {
    event.preventDefault();
    setIsPinging(true);
    setError('');
    setPingResult(null);

    const ipToPing = target || publicIp;

    try {
      const response = await fetch(`${API_BASE}/api/ping?target=${encodeURIComponent(ipToPing)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Ping request failed.');
      }

      setPingResult(data);
    } catch (err) {
      setError(err.message || 'Ping failed.');
    } finally {
      setIsPinging(false);
    }
  };

  useEffect(() => {
    fetchPublicIp();
    const timer = setInterval(fetchPublicIp, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Container className="network-monitor-page py-5">
      <Row className="justify-content-center">
        <Col lg={8}>
          <div className="text-center mb-4">
            <span className="section-eyebrow">~/ network monitor</span>
            <h1 className="section-title">
              Public IP <strong className="purple">Checker</strong>
            </h1>
          </div>

          <Card className="mb-4 border-0 shadow-sm network-card">
            <Card.Body>
              <Row className="align-items-center g-3">
                <Col md={4} className="text-center text-md-start">
                  <div className="network-panel-icon">
                    <FaGlobeAmericas />
                  </div>
                </Col>
                <Col md={8}>
                  <div className="network-label">Current public IP</div>
                  <div className="network-ip-value">
                    {loadingIp ? <Spinner size="sm" animation="border" /> : publicIp || 'Not available'}
                  </div>
                  <div className="network-status">
                    <FaWifi /> {publicIp ? 'Live tracking active' : 'Waiting for backend connection'}
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <Card className="network-card">
            <Card.Body>
              <Form onSubmit={handlePing}>
                <Form.Group className="mb-3">
                  <Form.Label className="network-label">Target IP or hostname</Form.Label>
                  <Form.Control
                    type="text"
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                    placeholder="8.8.8.8 or your public IP"
                    className="network-input"
                  />
                </Form.Group>

                <div className="d-flex justify-content-center">
                  <Button type="submit" variant="primary" disabled={isPinging || loadingIp} className="network-button">
                    {isPinging ? <><Spinner size="sm" animation="border" className="me-2" /> Ping in progress...</> : <><FaNetworkWired className="me-2" /> Test Ping</>}
                  </Button>
                </div>
              </Form>

              {error && (
                <Alert variant="danger" className="mt-4 mb-0">
                  {error}
                </Alert>
              )}

              {pingResult && (
                <Alert variant={pingResult.ok ? 'success' : 'warning'} className="mt-4 mb-0">
                  <div><strong>Target:</strong> {pingResult.target}</div>
                  <div><strong>Status:</strong> {pingResult.message}</div>
                  <div><strong>Exit code:</strong> {pingResult.exitCode}</div>
                  <pre className="mb-0 mt-2 network-output">{pingResult.output || 'No output returned.'}</pre>
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default NetworkMonitor;
