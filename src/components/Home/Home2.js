import React, { useState, useEffect } from "react";
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
  
  // Add initial welcome message
  useEffect(() => {
    setTerminalHistory([
      { 
        type: 'response', 
        text: `Welcome to my interactive portfolio terminal!
Type 'help' to see available commands.
Try these examples:
• whoami - Learn about me
• skills - See my technical skills
• contact - Get my contact info
• clear - Clear the terminal`
      }
    ]);
  }, []);

  const handleCommand = (command) => {
    const responses = {
      'help': `Available commands:
• whoami - Learn about me
• skills - List my technical skills
• experience - Show my work experience
• projects - View my notable projects
• contact - Get my contact information
• social - Show social media links
• clear - Clear terminal
• try <command> - Try a basic terminal command (ls, pwd, cd, echo)
• help - Show this help message`,
      'whoami': `Hi! I'm Joomun Noorani Muddathir
A passionate Full Stack Developer with interests in IoT and Cloud Computing.
Currently working as a Packaged App Development Associate.`,
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
      'social': 'Opening social links section...',
      'clear': 'CLEAR',
      'github': 'Redirecting to GitHub...'
    };

    const simulateCommand = (cmd) => {
      switch(cmd) {
        case 'ls':
          return 'about.md  skills.txt  projects/  contact.json';
        case 'pwd':
          return '/home/visitor/portfolio';
        case 'cd':
          return 'Changed directory to /home/visitor/portfolio';
        case 'echo':
          return 'Hello from the terminal!';
        default:
          return `Command not found: ${cmd}`;
      }
    };

    const newHistory = [...terminalHistory];
    newHistory.push({ type: 'command', text: command });
    
    if (command === 'clear') {
      setTerminalHistory([]);
    } else if (command.startsWith('try ')) {
      const cmd = command.split(' ')[1];
      newHistory.push({ type: 'response', text: simulateCommand(cmd) });
    } else if (responses[command]) {
      newHistory.push({ type: 'response', text: responses[command] });
      if (command === 'github') {
        window.open('https://github.com/joomun', '_blank');
      } else if (command === 'social') {
        document.querySelector('.home-about-social').scrollIntoView({ 
          behavior: 'smooth' 
        });
      }
    } else {
      newHistory.push({ 
        type: 'error', 
        text: `Command not found: ${command}. Type 'help' for available commands.` 
      });
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
