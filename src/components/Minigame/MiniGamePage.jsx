import React from "react";
import MemoryGame from "../components/MemoryGame"; // Adjust path if needed

const MiniGamePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Mini-Game</h1>
      <MemoryGame />
    </div>
  );
};

export default MiniGamePage;
