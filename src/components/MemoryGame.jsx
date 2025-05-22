import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./MemoryGame.css";
import SoundManager from "./Minigame/sounds";
import { 
  THEMES, 
  DIFFICULTIES, 
  calculateScore, 
  saveHighScore, 
  getHighScores,
  ANIMATIONS 
} from "./Minigame/gameConfig";

export default function MemoryGame() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState('medium');
  const [theme, setTheme] = useState('food');
  const [showSettings, setShowSettings] = useState(true);
  const [showHighScores, setShowHighScores] = useState(false);
  const [highScores, setHighScores] = useState([]);
  const [perfectMatches, setPerfectMatches] = useState(0);

  const startGame = useCallback(() => {
    const difficultyConfig = DIFFICULTIES[difficulty];
    const themeConfig = THEMES[theme];
    const symbolsToUse = themeConfig.symbols.slice(0, difficultyConfig.pairs);
    const shuffledCards = shuffle([...symbolsToUse, ...symbolsToUse]);
    
    setCards(shuffledCards.map((symbol, index) => ({ 
      id: index, 
      symbol, 
      flipped: false 
    })));
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setScore(0);
    setPerfectMatches(0);
    setTimeLeft(difficultyConfig.time);
    setGameCompleted(false);
    setGameStarted(true);
    setShowSettings(false);
  }, [difficulty, theme]);

  useEffect(() => {
    setHighScores(getHighScores());
  }, []);

  useEffect(() => {
    let timer;
    if (gameStarted && timeLeft > 0 && !gameCompleted) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameCompleted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameStarted, timeLeft, gameCompleted]);

  const shuffle = (array) => array.sort(() => Math.random() - 0.5);

  const handleCardClick = (card) => {
    if (flippedCards.length === 2 || matchedCards.includes(card.id) || card.flipped) return;

    SoundManager.playSound('flip');

    const updatedCards = cards.map((c) =>
      c.id === card.id ? { ...c, flipped: true } : c
    );
    setCards(updatedCards);
    setFlippedCards([...flippedCards, card]);

    if (flippedCards.length === 1) {
      setMoves(moves + 1);
      const [firstCard] = flippedCards;

      if (firstCard.symbol === card.symbol) {
        SoundManager.playSound('match');
        if (moves === 0) setPerfectMatches(prev => prev + 1);
        setMatchedCards([...matchedCards, firstCard.id, card.id]);
        setFlippedCards([]);

        // Check for game completion
        if (matchedCards.length + 2 === cards.length) {
          const finalScore = calculateScore(moves, timeLeft, difficulty);
          setScore(finalScore);
          saveHighScore(finalScore, difficulty, theme, moves, timeLeft);
          setHighScores(getHighScores());
          SoundManager.playSound('complete');
          setGameCompleted(true);
        }
      } else {
        SoundManager.playSound('wrong');
        setTimeout(() => {
          setCards(prevCards =>
            prevCards.map(c =>
              c.id === firstCard.id || c.id === card.id
                ? { ...c, flipped: false }
                : c
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  if (showSettings) {
    return (
      <div className="memory-game-container">
        <h1 className="memory-game-heading">Memory Card Game</h1>
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
              {Object.entries(DIFFICULTIES).map(([key, value]) => (
                <button
                  key={key}
                  className={`difficulty-button ${difficulty === key ? 'selected' : ''}`}
                  onClick={() => setDifficulty(key)}
                >
                  {value.name}
                </button>
              ))}
            </div>
          </div>
          <button className="start-button" onClick={startGame}>
            Start Game
          </button>
          <button 
            className="high-scores-button"
            onClick={() => setShowHighScores(true)}
          >
            View High Scores
          </button>
        </div>
      </div>
    );
  }

  if (showHighScores) {
    return (
      <div className="memory-game-container">
        <h1 className="memory-game-heading">High Scores</h1>
        <div className="high-scores-panel">
          {highScores.map((score, index) => (
            <div key={index} className="high-score-item">
              <span className="rank">#{index + 1}</span>
              <span className="score">{score.score} pts</span>
              <span className="details">
                {DIFFICULTIES[score.difficulty].name} - {THEMES[score.theme].name}
              </span>
              <span className="stats">
                {score.moves} moves | {score.time}s left
              </span>
            </div>
          ))}
          <button 
            className="back-button"
            onClick={() => setShowHighScores(false)}
          >
            Back to Settings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="memory-game-container"
      style={{ 
        background: THEMES[theme].background,
        transition: "background 0.5s ease"
      }}
    >
      <div className="game-header">
        <h1 className="memory-game-heading">Memory Card Game</h1>
        <div className="game-stats">
          <p>Time: {timeLeft}s</p>
          <p>Moves: {moves}</p>
          <p>Score: {score}</p>
        </div>
      </div>

      <motion.div 
        className="memory-grid"
        style={{ 
          gridTemplateColumns: `repeat(${Math.ceil(Math.sqrt(cards.length))}, 1fr)`
        }}
      >
        <AnimatePresence>
          {cards.map((card) => (
            <motion.div
              key={card.id}
              onClick={() => handleCardClick(card)}
              className={`memory-card ${card.flipped || matchedCards.includes(card.id) ? "flipped" : ""}`}
              animate={matchedCards.includes(card.id) ? ANIMATIONS.cardMatch : {}}
              whileHover={{ scale: 1.05 }}
              layout
            >
              <motion.div 
                className="card-inner"
                animate={card.flipped || matchedCards.includes(card.id) ? ANIMATIONS.cardFlip.flipped : ANIMATIONS.cardFlip.initial}
                transition={ANIMATIONS.cardFlip.transition}
              >
                <div className="card-front">?</div>
                <div className="card-back">{card.symbol}</div>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {gameCompleted && (
        <motion.div 
          className="modal"
          variants={ANIMATIONS.celebration}
          initial="initial"
          animate="animate"
        >
          <h2 className="modal-heading">
            {timeLeft > 0 ? "Congratulations! 🎉" : "Time's Up! ⏰"}
          </h2>
          <div className="modal-content">
            <p>Final Score: {score} points</p>
            <p>Moves: {moves}</p>
            <p>Perfect Matches: {perfectMatches}</p>
            <p>Time Remaining: {timeLeft}s</p>
          </div>
          <div className="modal-buttons">
            <button className="restart-button" onClick={() => setShowSettings(true)}>
              New Game
            </button>
            <button 
              className="retry-button" 
              onClick={() => startGame()}
            >
              Try Again
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
