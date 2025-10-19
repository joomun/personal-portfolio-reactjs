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
      text: `Available commands:
whoami      - Learn about me
skills      - View my technical skills
projects    - Browse my projects
contact     - Get my contact info
clear       - Clear terminal
social      - Show social links`
    }),
    whoami: () => ({
      type: 'info',
      text: `Joomun Noorani Muddathir
Full Stack Developer & Cloud Engineer
Currently: Packaged App Development Associate`
    }),
    clear: () => ({ type: 'clear' }),
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
          <div className="main-terminal">
            <div className="terminal-header">
              <div className="terminal-buttons">
                <span className="terminal-button close"></span>
                <span className="terminal-button minimize"></span>
                <span className="terminal-button maximize"></span>
              </div>
              <div className="terminal-title">visitor@portfolio:~$</div>
            </div>
            
            <div className="terminal-body">
              {terminalHistory.map((entry, idx) => (
                <div key={idx} className={`terminal-line ${entry.type}`}>
                  {entry.text}
                </div>
              ))}
              <div className="terminal-prompt">
                <span className="prompt-text">visitor@portfolio:{currentPath}$</span>
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
