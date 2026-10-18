import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Button, Card, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { FaNetworkWired, FaWifi, FaGlobeAmericas } from 'react-icons/fa';

const API_BASE = process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000';
const NETWORK_ENABLED = (process.env.REACT_APP_NETWORK_ENABLED || 'false').toLowerCase() === 'true';

function NetworkMonitor() {
  const [publicIp, setPublicIp] = useState('');
  const [target, setTarget] = useState('');
  const [loadingIp, setLoadingIp] = useState(true);
  const [isPinging, setIsPinging] = useState(false);
  const [pingResult, setPingResult] = useState(null);
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);

  const token = typeof window !== 'undefined' ? localStorage.getItem('network-token') : '';
  const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
  const isLocalHost = hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('192.168.') || hostname.startsWith('10.') || hostname.startsWith('172.');

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
    }
  }, [token]);

  const fetchPublicIp = useCallback(async () => {
    try {
      setLoadingIp(true);
      const response = await fetch(`${API_BASE}/api/public-ip`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
  }, [token]);

  const handlePing = async (event) => {
    event.preventDefault();
    setIsPinging(true);
    setError('');
    setPingResult(null);

    const ipToPing = target || publicIp;

    try {
      const response = await fetch(`${API_BASE}/api/ping?target=${encodeURIComponent(ipToPing)}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
    if (!NETWORK_ENABLED || !isAuthenticated || !isLocalHost) return;

    fetchPublicIp();
    const timer = setInterval(fetchPublicIp, 60000);
    return () => clearInterval(timer);
  }, [fetchPublicIp, isAuthenticated, isLocalHost]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoadingAuth(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed.');
      }

      localStorage.setItem('network-token', data.token);
      setIsAuthenticated(true);
      setError('');
    } catch (err) {
      setError(err.message || 'Login failed.');
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('network-token');
    setIsAuthenticated(false);
    setPublicIp('');
    setPingResult(null);
    setTarget('');
    setError('');
  };

  if (!NETWORK_ENABLED) {
    return (
      <Container className="network-monitor-page py-5">
        <Row className="justify-content-center">
          <Col lg={8}>
            <Alert variant="warning" className="network-lock-box">
              <h4 className="mb-2">Network page is locked</h4>
              <p className="mb-0">This page is disabled until the site owner enables it in the environment settings.</p>
            </Alert>
          </Col>
        </Row>
      </Container>
    );
  }

  if (!isLocalHost) {
    return (
      <Container className="network-monitor-page py-5">
        <Row className="justify-content-center">
          <Col lg={8}>
            <Alert variant="danger" className="network-lock-box">
              <h4 className="mb-2">Access restricted</h4>
              <p className="mb-0">This page is only available on localhost or private network addresses to keep your public IP private.</p>
            </Alert>
          </Col>
        </Row>
      </Container>
    );
  }

  if (!isAuthenticated) {
    return (
      <Container className="network-monitor-page py-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <Card className="network-card">
              <Card.Body>
                <h3 className="mb-3 text-center">Network access login</h3>
                <Form onSubmit={handleLogin}>
                  <Form.Group className="mb-3">
                    <Form.Label className="network-label">Username</Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="network-input"
                      placeholder="Enter username"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="network-label">Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="network-input"
                      placeholder="Enter password"
                    />
                  </Form.Group>
                  <div className="d-flex justify-content-center">
                    <Button type="submit" variant="primary" className="network-button" disabled={isLoadingAuth}>
                      {isLoadingAuth ? <><Spinner size="sm" animation="border" className="me-2" /> Logging in...</> : 'Login'}
                    </Button>
                  </div>
                </Form>
                {error && <Alert variant="danger" className="mt-3 mb-0">{error}</Alert>}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

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

          <div className="d-flex justify-content-end mb-3">
            <Button variant="outline-primary" onClick={handleLogout}>Logout</Button>
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
