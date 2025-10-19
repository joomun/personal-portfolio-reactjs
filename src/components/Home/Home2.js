import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  AiFillGithub,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

function Home2() {
  const [terminalHistory, setTerminalHistory] = useState([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [currentPath, setCurrentPath] = useState('~');
  
  useEffect(() => {
    setTerminalHistory([
      { 
        type: 'system', 
        text: 'Welcome to JoomunOS 1.0.0 LTS (GNU/Linux 5.15.0-1019-aws x86_64)'
      },
      { 
        type: 'system', 
        text: 'Type "help" for available commands'
      }
    ]);
  }, []);

  const commands = {
    help: () => ({
      type: 'success',
      text: `Available commands:
about       - Learn about me
skills      - View my technical skills
projects    - Browse my projects
contact     - Get my contact info
clear       - Clear terminal
social      - Show social links`
    }),
    about: () => ({
      type: 'info',
      text: `> Joomun Noorani Muddathir
> Full Stack Developer | Cloud & IoT Enthusiast
> Currently: Packaged App Development Associate`
    }),
    skills: () => ({
      type: 'info',
      text: `Languages: TypeScript, Python, Bash/Shell
Platforms: AWS, Azure, Raspberry Pi
Domains  : Web Dev, IoT, Cloud Computing`
    }),
    clear: () => ({ type: 'clear' }),
    social: () => {
      document.querySelector('.home-about-social').scrollIntoView({ behavior: 'smooth' });
      return { type: 'success', text: 'Opening social links...' };
    }
  };

  const handleCommand = (input) => {
    const cmd = input.toLowerCase().trim();
    
    const newHistory = [...terminalHistory, { type: 'command', text: `visitor@portfolio:${currentPath}$ ${input}` }];
    
    if (cmd === 'clear') {
      setTerminalHistory([]);
      return;
    }

    if (commands[cmd]) {
      const result = commands[cmd]();
      if (result.type !== 'clear') {
        newHistory.push(result);
      }
    } else {
      newHistory.push({
        type: 'error',
        text: `command not found: ${cmd}`
      });
    }
    
    setTerminalHistory(newHistory);
    setCurrentCommand('');
  };

  return (
    <Container fluid className="terminal-section">
      <Container>
        <Row>
          <Col md={12} className="terminal-wrapper">
            <div className="terminal" style={{
              maxWidth: "100%",
              width: "420px",
              margin: "0 auto",
              borderRadius: "8px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
              background: "var(--terminal-bg, #282a36)",
              border: "1px solid #44475a",
              overflow: "hidden"
            }}>
              <div className="terminal-header" style={{
                display: "flex",
                alignItems: "center",
                padding: "0.7rem 1rem",
                background: "var(--terminal-header, #21222c)",
                borderBottom: "1px solid #44475a"
              }}>
                <div className="terminal-buttons">
                  <span className="terminal-button red"></span>
                  <span className="terminal-button yellow"></span>
                  <span className="terminal-button green"></span>
                </div>
                <div className="terminal-title" style={{
                  color: "#f8f8f2",
                  fontSize: "13px",
                  marginLeft: "10px",
                  opacity: 0.7
                }}>visitor@portfolio</div>
              </div>
              
              <div className="terminal-body" style={{
                padding: "1.2rem 0.7rem 1rem 0.7rem",
                color: "#f8f8f2",
                fontSize: "15px",
                minHeight: "120px",
                wordBreak: "break-word"
              }}>
                {terminalHistory.map((entry, idx) => (
                  <div key={idx} className={`terminal-line ${entry.type}`} style={{
                    whiteSpace: 'pre-wrap',
                    fontFamily: 'monospace',
                    fontSize: "1em"
                  }}>
                    {entry.text}
                  </div>
                ))}
                <div className="terminal-prompt" style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "8px"
                }}>
                  <span className="prompt-text" style={{
                    fontFamily: "monospace",
                    fontWeight: "bold",
                    marginRight: "6px"
                  }}>visitor@portfolio:{currentPath}$</span>
                  <input
                    type="text"
                    value={currentCommand}
                    onChange={(e) => setCurrentCommand(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleCommand(currentCommand);
                      }
                    }}
                    autoFocus
                    spellCheck="false"
                    autoComplete="off"
                    className="terminal-input"
                    style={{
                      flex: 1,
                      minWidth: 0,
                      background: "transparent",
                      color: "#f8f8f2",
                      border: "none",
                      outline: "none",
                      fontFamily: "monospace",
                      fontSize: "1em",
                      padding: "2px 4px"
                    }}
                  />
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col md={12} className="home-about-social">
            <ul className="terminal-social-links">
              <li><a href="https://github.com/joomun" target="_blank" rel="noreferrer"><AiFillGithub /></a></li>
              <li><a href="https://www.linkedin.com/in/joomun-noorani-muddathir-846636228/" target="_blank" rel="noreferrer"><FaLinkedinIn /></a></li>
              <li><a href="https://www.instagram.com/muddathir_joomun/" target="_blank" rel="noreferrer"><AiFillInstagram /></a></li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Home2;
