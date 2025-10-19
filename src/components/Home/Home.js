import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Particle from "../Particle";
import Type from "./Type";

function Home() {
  const [terminalHistory, setTerminalHistory] = useState([]);
  const [currentCommand, setCurrentCommand] = useState("");
  const [currentPath, setCurrentPath] = useState("~");

  useEffect(() => {
    setTerminalHistory([
      { 
        type: 'system', 
        text: 'Welcome to JoomunOS 1.0.0 LTS (GNU/Linux 5.15.0-1019-aws x86_64)'
      },
      { 
        type: 'system', 
        text: `Last login: ${new Date().toLocaleString()}`
      },
      {
        type: 'info',
        text: 'Type "help" for available commands'
      }
    ]);
  }, []);

  const commands = {
    help: () => ({
      type: 'success',
      text: [
        '+----------------- Available Commands ------------------+',
        '|                                                     |',
        '|  whoami     - Learn about me and my background      |',
        '|  skills     - View my technical expertise           |',
        '|  projects   - Browse my portfolio projects          |',
        '|  contact    - Get my contact information            |',
        '|  social     - View my social media profiles         |',
        '|  resume     - Download my latest resume             |',
        '|  experience - View my work experience               |',
        '|  education  - View my educational background        |',
        '|  clear      - Clear the terminal screen             |',
        '|                                                     |',
        '|  Type any command to learn more!                    |',
        '+-----------------------------------------------------+'
      ].join('\n')
    }),
    whoami: () => ({
      type: 'info',
      text: [
        '+---------------- About Me ------------------+',
        '|                                          |',
        '|  Name: Joomun Noorani Muddathir         |',
        '|  Role: Full Stack Developer              |',
        '|        Cloud Engineer                    |',
        '|                                          |',
        '|  Currently:                              |',
        '|  Packaged App Development Associate      |',
        '|                                          |',
        '+------------------------------------------+'
      ].join('\n')
    }),
    clear: () => ({ type: 'clear' }),
    skills: () => ({
      type: 'success',
      text: [
        '+--------------- Technical Skills ---------------+',
        '|                                              |',
        '|  Languages:                                  |',
        '|    • JavaScript/TypeScript                   |',
        '|    • Python                                  |',
        '|    • Java                                    |',
        '|                                              |',
        '|  Web Technologies:                           |',
        '|    • React.js                                |',
        '|    • Node.js                                 |',
        '|    • HTML5/CSS3                              |',
        '|                                              |',
        '|  Cloud & DevOps:                             |',
        '|    • AWS                                     |',
        '|    • Docker                                  |',
        '|    • CI/CD                                   |',
        '|                                              |',
        '+----------------------------------------------+'
      ].join('\n')
    }),
    projects: () => ({
      type: 'success',
      text: [
        '+---------------- My Projects -----------------+',
        '|                                            |',
        '|  Available Commands:                       |',
        '|    projects list  - View portfolio projects|',
        '|    projects info  - Get project details    |',
        '|                                            |',
        '+--------------------------------------------+'
      ].join('\n')
    }),
    contact: () => ({
      type: 'info',
      text: [
        '+---------------- Contact Me -----------------+',
        '|                                           |',
        '|  Email:   [Your Email]                    |',
        '|  Phone:   [Your Phone]                    |',
        '|  Website: [Your Website]                  |',
        '|                                           |',
        '|  Type \'social\' for social media links     |',
        '+-------------------------------------------+'
      ].join('\n')
    }),
    social: () => ({
      type: 'info',
      text: [
        '+---------------- Social Links ----------------+',
        '|                                           |',
        '|  LinkedIn: [Your LinkedIn]                |',
        '|  GitHub:   [Your GitHub]                  |',
        '|  Twitter:  [Your Twitter]                 |',
        '|                                           |',
        '+-------------------------------------------+'
      ].join('\n')
    }),
    // Add more commands as needed
  };

  const handleCommand = (input) => {
    const cmd = input.toLowerCase().trim();
    
    const newHistory = [...terminalHistory, { 
      type: 'command', 
      text: `visitor@portfolio:${currentPath}$ ${input}` 
    }];
    
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
    setCurrentCommand("");
  };

  return (
    <section className="terminal-theme">
      <Container fluid className="home-section" id="home">
        <Particle />
        <Container className="home-content">
          <div className="main-terminal" style={{
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
                <span className="terminal-button close"></span>
                <span className="terminal-button minimize"></span>
                <span className="terminal-button maximize"></span>
              </div>
              <div className="terminal-title" style={{
                color: "#f8f8f2",
                fontSize: "13px",
                marginLeft: "10px",
                opacity: 0.7
              }}>visitor@portfolio:~$</div>
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
        </Container>
      </Container>
    </section>
  );
}

export default Home;
