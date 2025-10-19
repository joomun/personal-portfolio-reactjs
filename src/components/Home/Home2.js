import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import Typewriter from "typewriter-effect";

function Home2() {
  const [terminalHistory, setTerminalHistory] = useState([]);
  const [currentCommand, setCurrentCommand] = useState('');

  const handleCommand = (command) => {
    const responses = {
      'help': `Available commands:
        • skills - List my technical skills
        • experience - Show my work experience
        • projects - View my notable projects
        • contact - Get my contact information
        • clear - Clear terminal
        • help - Show this help message`,
      'skills': `Technical Skills:
        • Languages: TypeScript, Python, Bash/Shell
        • Cloud: Azure, AWS (Lambda, S3)
        • IoT: Raspberry Pi, Hardware Projects
        • Web: React, Node.js, Full Stack Development`,
      'experience': `Professional Experience:
        • Packaged App Development Associate
        • Student Ambassador (2 years)
        • IEEE MDX Student Branch Executive Member`,
      'projects': `Notable Projects:
        • Open Source Contributions
        • IoT Hardware Projects
        • Web Development Solutions
        Type 'github' to visit my repository`,
      'contact': `Contact Information:
        • GitHub: github.com/joomun
        • LinkedIn: linkedin.com/in/joomun-noorani-muddathir
        • Instagram: @muddathir_joomun`,
      'clear': 'CLEAR',
      'github': 'Redirecting to GitHub...'
    };

    const newHistory = [...terminalHistory];
    newHistory.push({ type: 'command', text: command });
    
    if (command === 'clear') {
      setTerminalHistory([]);
    } else if (responses[command]) {
      newHistory.push({ type: 'response', text: responses[command] });
      if (command === 'github') {
        window.open('https://github.com/joomun', '_blank');
      }
    } else {
      newHistory.push({ type: 'error', text: `Command not found: ${command}. Type 'help' for available commands.` });
    }
    
    setTerminalHistory(newHistory);
    setCurrentCommand('');
  };

  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={12} className="terminal-container">
            <div className="terminal-header">
              <div className="terminal-buttons">
                <span className="terminal-button close"></span>
                <span className="terminal-button minimize"></span>
                <span className="terminal-button maximize"></span>
              </div>
              <div className="terminal-title">visitor@portfolio:~/about$</div>
            </div>
            <div className="terminal-content">
              <div className="terminal-output">
                {terminalHistory.map((entry, index) => (
                  <div key={index} className={`terminal-line ${entry.type}`}>
                    {entry.type === 'command' ? '$ ' + entry.text : entry.text}
                  </div>
                ))}
                <div className="terminal-input">
                  $ <input
                    type="text"
                    value={currentCommand}
                    onChange={(e) => setCurrentCommand(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleCommand(currentCommand.toLowerCase());
                      }
                    }}
                    autoFocus
                  />
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col md={12} className="home-about-social">
            <h1>FIND ME ON</h1>
            <p>
              Feel free to <span className="purple">connect </span>with me
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/joomun"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/joomun-noorani-muddathir-846636228/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.instagram.com/muddathir_joomun/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiFillInstagram />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Home2;

/* Terminal Styles */
.terminal-container {
  background-color: var(--terminal-bg);
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  margin: 20px 0;
  overflow: hidden;
  font-family: var(--terminal-font);
}

.terminal-header {
  background-color: var(--terminal-header);
  padding: 10px;
  display: flex;
  align-items: center;
}

.terminal-content {
  padding: 20px;
  min-height: 400px;
  max-height: 600px;
  overflow-y: auto;
}

.terminal-line {
  margin: 8px 0;
  white-space: pre-wrap;
  font-size: 14px;
  line-height: 1.5;
}

.terminal-line.command {
  color: var(--terminal-prompt);
}

.terminal-line.response {
  color: var(--terminal-text);
}

.terminal-line.error {
  color: var(--terminal-red);
}

.terminal-input {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.terminal-input input {
  background: transparent;
  border: none;
  color: var(--terminal-text);
  font-family: var(--terminal-font);
  font-size: 14px;
  margin-left: 8px;
  width: 100%;
  outline: none;
}

.terminal-input::before {
  content: "$";
  color: var(--terminal-prompt);
  margin-right: 8px;
}
