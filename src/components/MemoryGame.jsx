import React, { useState, useEffect } from "react";

const symbols = ["🍎", "🍌", "🍇", "🍓", "🍉", "🍒", "🥭", "🍍"];

export default function MemoryGame() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    const shuffledCards = shuffle([...symbols, ...symbols]);
    setCards(shuffledCards.map((symbol, index) => ({ id: index, symbol, flipped: false })));
  }, []);

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
  };

  const resetGame = () => {
    const shuffledCards = shuffle([...symbols, ...symbols]);
    setCards(shuffledCards.map((symbol, index) => ({ id: index, symbol, flipped: false })));
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Memory Card Game</h1>
      <p className="mb-4">Moves: {moves}</p>
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card)}
            className={`cursor-pointer p-4 border rounded-lg text-center text-3xl ${
              card.flipped || matchedCards.includes(card.id)
                ? "bg-white"
                : "bg-gray-300"
            }`}
          >
            {card.flipped || matchedCards.includes(card.id) ? card.symbol : "?"}
          </div>
        ))}
      </div>
      <button
        onClick={resetGame}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Restart Game
      </button>
    </div>
  );
}
