// Game themes with different emoji sets
export const THEMES = {
  food: {
    name: "Food",
    symbols: ["🍎", "🍌", "🍇", "🍓", "🍉", "🍒", "🥭", "🍍", "🍊", "🥝", "🍐", "🥥"],
    background: "linear-gradient(45deg, #ff6b6b, #ffd93d)"
  },
  animals: {
    name: "Animals",
    symbols: ["🐶", "🐱", "🐼", "🦊", "🦁", "🐯", "🐮", "🐷", "🐸", "🦄", "🐰", "🐨"],
    background: "linear-gradient(45deg, #4facfe, #00f2fe)"
  },
  faces: {
    name: "Faces",
    symbols: ["😀", "😎", "🤓", "😍", "🤩", "😜", "😇", "🥳", "😺", "🤠", "👻", "🤖"],
    background: "linear-gradient(45deg, #fa709a, #fee140)"
  },
  space: {
    name: "Space",
    symbols: ["🌟", "🌙", "☀️", "⭐", "🌎", "🚀", "👨‍🚀", "🛸", "☄️", "🌌", "🪐", "🌍"],
    background: "linear-gradient(45deg, #30cfd0, #330867)"
  }
};

// Difficulty settings
export const DIFFICULTIES = {
  easy: {
    name: "Easy",
    pairs: 6,
    time: 120, // seconds
    bonus: 1
  },
  medium: {
    name: "Medium",
    pairs: 8,
    time: 180,
    bonus: 1.5
  },
  hard: {
    name: "Hard",
    pairs: 12,
    time: 240,
    bonus: 2
  }
};

// Scoring system
export const SCORING = {
  basePoints: 100,
  timeBonus: 10, // points per second remaining
  movesPenalty: 5, // points deducted per move
  perfectMatch: 50 // bonus points for matching on first try
};

export function calculateScore(moves, timeRemaining, difficulty) {
  const baseScore = SCORING.basePoints;
  const timeBonus = timeRemaining * SCORING.timeBonus;
  const movePenalty = moves * SCORING.movesPenalty;
  const difficultyMultiplier = DIFFICULTIES[difficulty].bonus;

  return Math.max(0, Math.floor((baseScore + timeBonus - movePenalty) * difficultyMultiplier));
}

// High scores management
export function saveHighScore(score, difficulty, theme, moves, time) {
  const highScores = getHighScores();
  const newScore = {
    score,
    difficulty,
    theme,
    moves,
    time: Math.floor(time),
    date: new Date().toISOString()
  };

  highScores.push(newScore);
  highScores.sort((a, b) => b.score - a.score);
  
  // Keep only top 10 scores
  const topScores = highScores.slice(0, 10);
  localStorage.setItem('memoryGameHighScores', JSON.stringify(topScores));
  
  return topScores;
}

export function getHighScores() {
  const scores = localStorage.getItem('memoryGameHighScores');
  return scores ? JSON.parse(scores) : [];
}

// Animation configurations
export const ANIMATIONS = {
  cardFlip: {
    initial: { rotateY: 0 },
    flipped: { rotateY: 180 },
    transition: { duration: 0.6, ease: "easeOut" }
  },
  cardMatch: {
    scale: [1, 1.2, 1],
    rotate: [0, 360, 0],
    transition: { duration: 0.8 }
  },
  celebration: {
    opacity: [0, 1],
    scale: [0, 1.2, 1],
    transition: { duration: 1.5, ease: "easeOut" }
  }
};
