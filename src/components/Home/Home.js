import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Particle from "../Particle";
import Type from "./Type";
import "./Home.css"; // Create this new CSS file
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";

function Home() {
  const [terminalHistory, setTerminalHistory] = useState([]);
  const [currentCommand, setCurrentCommand] = useState("");
  const [currentPath, setCurrentPath] = useState("~");
  const [showParticles, setShowParticles] = useState(true);

  useEffect(() => {
    setTerminalHistory([
      { 
        type: 'system', 
        text: 'Welcome to JoomunOS 1.0.0 LTS (GNU/JoomunOS 5.15.0-1019-aws x86_64)'
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

  const renderTextWithLinks = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    
    return parts.map((part, i) => {
      if (part.match(urlRegex)) {
        return (
          <a 
            key={i}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#50fa7b', textDecoration: 'underline' }}
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

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
        '+-----------------------------------------------------+'
      ].join('\n')
    }),
    whoami: () => ({
      type: 'info',
      text: [
        '+---------------- About Me ------------------+',
        '|                                          |',
        '|  Name: Joomun Noorani Muddathir         |',
        '|  Role: Simply Me                         |',
        '|                                          |',
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
        '+---------------- Contact Me -------------------+',
        '|                                               |',
        '|  Email:   joomunmuddathir@gmail.com           |',
        '|  Phone:   57568744                            |',
        '|  Website: https://joomunnoorfolio.vercel.app/ |                 |',
        '|                                               |',
        '|  Type \'social\' for social media links       |',
        '+-----------------------------------------------+'
      ].join('\n')
    }),
    social: () => ({
      type: 'info',
      text: [
        '+------------------------------ Social Links --------------------------------+',
        '|                                                                            |',
        '|  LinkedIn: https://www.linkedin.com/in/joomun-noorani-muddathir-846636228/ |',
        '|  GitHub:   https://github.com/joomun/                                      |',
        '|  Instagram:  https://www.instagram.com/muddathir_joomun/                   |',
        '|                                                                            |',
        '+----------------------------------------------------------------------------+'
      ].join('\n')
    }),
    "projects list": () => ({
      type: 'success',
      text: [
        '+----------- Portfolio Projects -----------+',
        '|                                         |',
        '|  1. Portfolio Website                   |',
        '|  2. Weather App                         |',
        '|  3. Chat Application                    |',
        '|  4. E-commerce Platform                 |',
        '|                                         |',
        '|  Type "projects info" for details.      |',
        '+-----------------------------------------+'
      ].join('\n')
    }),
    "projects info": () => ({
      type: 'info',
      text: [
        '+----------- Project Details --------------+',
        '| Portfolio Website:                       |',
        '|   React-based personal portfolio.        |',
        '| Weather App:                             |',
        '|   Real-time weather using OpenWeatherMap.|',
        '| Chat Application:                        |',
        '|   Realtime chat with Socket.io.          |',
        '| E-commerce Platform:                     |',
        '|   Full-stack MERN e-commerce demo.       |',
        '+------------------------------------------+'
      ].join('\n')
    }),
    experience: () => ({
      type: 'info',
      text: [
        '+---------------- Experience ----------------+',
        '|                                            |',
        '|  Packaged App Development Associate        |',
        '|  Linux & Bash Scripting Specialist         |',
        '|  Full Stack Development                    |',
        '|  Cloud Computing Enthusiast                |',
        '|                                            |',
        '+--------------------------------------------+'
      ].join('\n')
    }),
    education: () => ({
      type: 'info',
      text: [
        '+---------------- Education -----------------+',
        '|                                            |',
        '|  BSc Computer Science System Engineering  |',
        '|  University of Mauritius                   |',
        '|  With Honours                              |',
        '|                                            |',
        '+--------------------------------------------+'
      ].join('\n')
    })
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
        text: `command not found: ${cmd}\nFor project info, type: /project`
      });
    }
    
    setTerminalHistory(newHistory);
    setCurrentCommand("");
  };

  return (
    <section className="home-section enhanced-home">
      <Container fluid className="home-section" id="home">
        <Particle />
        
        {/* Modern Two-Column Hero Section */}
        <div className="hero-container">
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="hero-grid">
              {/* Left: Terminal Interface */}
              <div className="hero-left">
                <motion.div 
                  className="terminal-output-hero"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  {/* Terminal Header */}
                  <div className="terminal-header-modern">
                    <span className="terminal-title-modern">joomun@portfolio</span>
                    <div className="terminal-buttons-modern">
                      <div className="terminal-button-modern red"></div>
                      <div className="terminal-button-modern yellow"></div>
                      <div className="terminal-button-modern green"></div>
                    </div>
                  </div>
                  
                  {/* Terminal Content */}
                  <div className="terminal-body-modern">
                    {terminalHistory.map((entry, idx) => (
                      <div 
                        key={idx} 
                        className={`terminal-line-modern ${entry.type}`}
                        style={{ whiteSpace: 'pre-wrap' }}
                      >
                        {renderTextWithLinks(entry.text)}
                      </div>
                    ))}
                    
                    {/* Command Input */}
                    <div className="terminal-prompt-modern">
                      <span className="prompt-text-modern">visitor@portfolio:~$ </span>
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
                        className="command-input-modern"
                        placeholder="type 'help' for available commands"
                      />
                      <span className="terminal-cursor-modern">█</span>
                    </div>
                  </div>
                </motion.div>

                {/* Quick Stats */}
                <motion.div 
                  className="quick-stats"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  <div className="stat-card">
                    <div className="stat-number">25+</div>
                    <div className="stat-label">Projects</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-number">3+</div>
                    <div className="stat-label">Years Exp</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-number">50+</div>
                    <div className="stat-label">Technologies</div>
                  </div>
                </motion.div>
              </div>

              {/* Right: Hero Content */}
              <motion.div 
                className="hero-right"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <div className="hero-text-section">
                  <h1 className="hero-title">
                    <span className="gradient-text">Joomun Noor</span>
                  </h1>
                  
                  <motion.div 
                    className="hero-subtitle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <Type />
                  </motion.div>
                  
                  <motion.p 
                    className="hero-description"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    Computer Science graduate from Mauritius with a passion for Linux, Bash scripting, 
                    and innovative solutions. Currently crafting digital experiences as a Packaged App Development Associate.
                  </motion.p>
                  
                  <motion.div 
                    className="hero-cta"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.6 }}
                  >
                    <a href="/projects" className="btn btn-primary">
                      Explore Projects →
                    </a>
                    <a href="/about" className="btn btn-secondary">
                      Learn More
                    </a>
                  </motion.div>

                  {/* Social Links */}
                  <motion.div 
                    className="social-links-hero"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                  >
                    <a href="https://github.com/joomun" target="_blank" rel="noreferrer" className="social-icon-hero">
                      <FaGithub />
                    </a>
                    <a href="https://www.linkedin.com/in/joomun-noorani-muddathir-846636228/" target="_blank" rel="noreferrer" className="social-icon-hero">
                      <FaLinkedin />
                    </a>
                    <a href="https://www.instagram.com/muddathir_joomun/" target="_blank" rel="noreferrer" className="social-icon-hero">
                      <AiFillInstagram />
                    </a>
                    <a href="mailto:joomunmuddathir@gmail.com" className="social-icon-hero">
                      <FaEnvelope />
                    </a>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

      </Container>
    </section>
  );
}

export default Home;
