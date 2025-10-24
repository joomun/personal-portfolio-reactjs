import React, { useState, useEffect, useRef } from "react";
import { Container } from "react-bootstrap";
import Particle from "../Particle";
import Type from "./Type";

function Home() {
  const [terminalHistory, setTerminalHistory] = useState([]);
  const [currentCommand, setCurrentCommand] = useState("");
  const [currentPath, setCurrentPath] = useState("~");
  const [theme, setTheme] = useState("dark"); // light/dark theme
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);

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
      },
      {
        type: 'motd',
        text: '✨ MOTD: Stay curious, keep coding, and have fun! ✨'
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

  const quotes = [
    "Code is like humor. When you have to explain it, it’s bad. – Cory House",
    "First, solve the problem. Then, write the code. – John Johnson",
    "Experience is the name everyone gives to their mistakes. – Oscar Wilde",
    "In order to be irreplaceable, one must always be different. – Coco Chanel",
    "Java is to JavaScript what car is to Carpet. – Chris Heilmann",
    "Knowledge is power. – Francis Bacon"
  ];

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
    motd: () => ({
      type: 'motd',
      text: '✨ Message of the Day: You are doing awesome! 🚀'
    }),
    quote: () => ({
      type: 'info',
      text: quotes[Math.floor(Math.random() * quotes.length)]
    }),
    theme: () => {
      setTheme(prev => prev === "dark" ? "light" : "dark");
      return {
        type: 'success',
        text: `Theme switched to ${theme === "dark" ? "light" : "dark"} mode.`
      };
    },
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
      setCommandHistory([...commandHistory, input]);
      setHistoryIndex(-1);
      return;
    }

    if (commands[cmd]) {
      const result = commands[cmd]();
      if
                >
                  {renderTextWithLinks(entry.text)}
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
