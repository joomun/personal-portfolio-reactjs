import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./ReactionGame.css";
import SoundManager from "./Minigame/sounds";
import { 
  THEMES, 
  GAME_MODES, 
  calculateScore, 
  saveProgress,
  ANIMATIONS 
} from "./Minigame/gameConfig";

export default function ReactionGame() {
  const [cards, setCards] = useState([]);
  const [activeCard, setActiveCard] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [theme, setTheme] = useState("retro");
  const [difficulty, setDifficulty] = useState(0); // 0: easy, 1: medium, 2: hard
  const [showSettings, setShowSettings] = useState(true);
  
  const startGame = useCallback(() => {
    const themeConfig = THEMES[theme];
    const modeConfig = GAME_MODES.reaction;
    
    // Initialize cards with all theme symbols
    setCards(themeConfig.symbols.map((symbol, index) => ({ 
      id: index, 
      symbol, 
      glowing: false 
    })));
    
    setTimeLeft(modeConfig.time[difficulty]);
    setRound(0);
    setScore(0);
    setGameStarted(true);
    setGameCompleted(false);
    setShowSettings(false);
    
    // Start first round
    setTimeout(() => {
      const randomCard = Math.floor(Math.random() * themeConfig.symbols.length);
      setActiveCard(randomCard);
      SoundManager.playSound("glow");
    }, 1000);
  }, [theme, difficulty]);

  useEffect(() => {
    if (gameStarted && timeLeft > 0 && !gameCompleted) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setGameCompleted(true);
            const finalScore = calculateScore("reaction", difficulty, round, timeLeft);
            setScore(finalScore);
            saveProgress({ mode: "reaction", difficulty, score: finalScore, time: timeLeft, moves: round });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameStarted, timeLeft, gameCompleted, difficulty, round]);

  const handleCardClick = (card) => {
    if (card.id === activeCard) {
      SoundManager.playSound("match");
      setRound(prev => prev + 1);
      setActiveCard(null);
      setTimeLeft(prev => prev + 1); // Add time bonus for successful click
      
      // Start next round
      setTimeout(() => {
        const randomCard = Math.floor(Math.random() * cards.length);
        setActiveCard(randomCard);
        SoundManager.playSound("glow");
      }, 500);
    } else {
      SoundManager.playSound("wrong");
      setGameCompleted(true);
      const finalScore = calculateScore("reaction", difficulty, round, timeLeft);
      setScore(finalScore);
      saveProgress({ mode: "reaction", difficulty, score: finalScore, time: timeLeft, moves: round });
    }
  };

  if (showSettings) {
    return (
      <div className="reaction-game-container">
        <h1 className="reaction-game-heading">Reaction Rush</h1>
        <div className="settings-panel">
          <div className="setting-group">
            <h3>Select Theme</h3>
            <div className="theme-buttons">
              {Object.entries(THEMES).map(([key, value]) => (
                <button
                  key={key}
                  className={`theme-button ${theme === key ? 'selected' : ''}`}
                  onClick={() => setTheme(key)}
                >
                  {value.name} {value.symbols[0]}
                </button>
              ))}
            </div>
          </div>
          <div className="setting-group">
            <h3>Select Difficulty</h3>
            <div className="difficulty-buttons">
              {Object.keys(GAME_MODES.reaction.rounds).map((level, index) => (
                <button
                  key={index}
                  className={`difficulty-button ${difficulty === index ? 'selected' : ''}`}
                  onClick={() => setDifficulty(index)}
                >
                  {["Easy", "Medium", "Hard"][index]}
                </button>
              ))}
            </div>
          </div>
          <button className="start-button" onClick={startGame}>
            Start Reaction Game
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="reaction-game-container"
      style={{ 
        background: THEMES[theme].background,
        transition: "background 0.5s ease"
      }}
    >
      <div className="game-header">
        <h1 className="reaction-game-heading">Reaction Rush</h1>
        <div className="game-stats">
          <p>Round: {round}</p>
          <p>Time: {timeLeft}s</p>
          <p>Score: {score}</p>
        </div>
      </div>

      <motion.div 
        className="reaction-grid"
        style={{ 
          gridTemplateColumns: `repeat(${Math.ceil(Math.sqrt(cards.length))}, 1fr)`
        }}
      >
        <AnimatePresence>
          {cards.map((card) => (
            <motion.div
              key={card.id}
              onClick={() => handleCardClick(card)}
              className={`reaction-card ${activeCard === card.id ? "glowing" : ""}`}
              animate={activeCard === card.id ? "active" : "inactive"}
              variants={ANIMATIONS.glow}
            >
              <div className="card-content">
                {card.symbol}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {gameCompleted && (
        <motion.div 
          className="modal"
          initial="initial"
          animate="animate"
          variants={ANIMATIONS.celebration.text}
        >
          <h2 className="modal-heading">Game Over!</h2>
          <div className="modal-content">
            <p>Final Score: {score} points</p>
            <p>Rounds Completed: {round}</p>
            <p>Time Left: {timeLeft}s</p>
          </div>
          <div className="modal-buttons">
            <button className="restart-button" onClick={() => setShowSettings(true)}>
              New Game
            </button>
            <button className="retry-button" onClick={startGame}>
              Try Again
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
