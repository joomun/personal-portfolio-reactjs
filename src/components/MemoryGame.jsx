import React, { useState, useEffect } from "react";
import "./MemoryGame.css";

const symbols = ["🍎", "🍌", "🍇", "🍓", "🍉", "🍒", "🥭", "🍍"];

export default function MemoryGame() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);

  useEffect(() => {
    startGame();
  }, []);

  const startGame = () => {
    const shuffledCards = shuffle([...symbols, ...symbols]);
    setCards(shuffledCards.map((symbol, index) => ({ id: index, symbol, flipped: false })));
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setGameCompleted(false);
  };

  const shuffle = (array) => array.sort(() => Math.random() - 0.5);

  const handleCardClick = (card) => {
    if (flippedCards.length === 2 || matchedCards.includes(card.id) || card.flipped) return;

    const updatedCards = cards.map((c) =>
      c.id === card.id ? { ...c, flipped: true } : c
    );
    setCards(updatedCards);
    setFlippedCards([...flippedCards, card]);

    if (flippedCards.length === 1) {
      setMoves(moves + 1);
      const [firstCard] = flippedCards;

      if (firstCard.symbol === card.symbol) {
        setMatchedCards([...matchedCards, firstCard.id, card.id]);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((c) =>
              c.id === firstCard.id || c.id === card.id
                ? { ...c, flipped: false }
                : c
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }

    if (matchedCards.length + 2 === cards.length) {
      setTimeout(() => {
        setGameCompleted(true);
      }, 500);
    }
  };

  return (
    <div className="memory-game-container">
      <h1 className="memory-game-heading">Memory Card Game</h1>
      <p className="moves-text">Moves: {moves}</p>

      <div className="memory-grid">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card)}
            className={`memory-card ${card.flipped || matchedCards.includes(card.id) ? "flipped" : ""}`}
          >
            {card.flipped || matchedCards.includes(card.id) ? card.symbol : "?"}
          </div>
        ))}
      </div>

      {gameCompleted && (
        <>
          <div className="swirl-fire"></div>
          <div className="modal">
            <h2 className="modal-heading">Congratulations! 🎉</h2>
            <p className="modal-text">You completed the game in {moves} moves.</p>
            <button className="restart-button" onClick={startGame}>Restart</button>
          </div>
        </>
      )}
    </div>
  );
}
