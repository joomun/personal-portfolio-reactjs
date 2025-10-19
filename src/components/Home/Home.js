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
      text: `
╭───────────────── AVAILABLE COMMANDS ─────────────────╮
│                                                      │
│  about    - Display my professional summary          │
│  skills   - List my technical skills                 │
│  projects - View my portfolio projects               │
│  contact  - Show contact information                 │
│  social   - Display social media links               │
│  github   - Open my GitHub profile                   │
│  clear    - Clear terminal screen                    │
│  banner   - Show welcome message                     │
│                                                      │
│  TIP: Use arrow keys to navigate command history     │
╰──────────────────────────────────────────────────────╯`
    }),
    about: () => ({
      type: 'info',
      text: `Full Stack Developer & Cloud Engineer
─────────────────────────────
• Currently: Packaged App Development Associate
• Focus: Web Development, IoT, Cloud Computing
• Location: Mauritius`
    }),
    skills: () => ({
      type: 'info',
      text: `Technical Stack
──────────────
Frontend    : React, TypeScript, HTML5/CSS3
Backend     : Node.js, Python, Shell Scripting
Cloud       : AWS, Azure
IoT         : Raspberry Pi, Arduino
Tools       : Git, Docker, VS Code`
    }),
    contact: () => ({
      type: 'success',
      text: `Contact Information
──────────────────
Email     : your.email@domain.com
LinkedIn  : linkedin.com/in/joomun-noorani-muddathir
Location  : Mauritius`
    }),
    github: () => {
      window.open('https://github.com/joomun', '_blank');
      return {
        type: 'system',
        text: 'Opening GitHub profile...'
      };
    },
    banner: () => ({
      type: 'system',
      text: `Welcome to JoomunOS 1.0.0 LTS
Type 'help' to see available commands`
    }),
    clear: () => ({ type: 'clear' }),
  };

  // Add command history navigation
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        setHistoryIndex(historyIndex + 1);
        setCurrentCommand(commandHistory[historyIndex + 1]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        setHistoryIndex(historyIndex - 1);
        setCurrentCommand(commandHistory[historyIndex - 1]);
      } else {
        setHistoryIndex(-1);
        setCurrentCommand('');
      }
    }
  };

  const handleCommand = (input) => {
    const cmd = input.toLowerCase().trim();
    
    // Add command to history
    if (cmd) {
      setCommandHistory([cmd, ...commandHistory]);
      setHistoryIndex(-1);
    }
    
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
      if
