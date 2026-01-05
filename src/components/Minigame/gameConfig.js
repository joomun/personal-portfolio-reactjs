// Enhanced Memory & Reaction mini-game configuration
export const THEMES = {
  retro: {
    name: "Retro",
    symbols: ["👾", "🕹️", "🎮", "🖥️", "💾", "📼", "📺", "🎵", "🎰", "🧩", "🎯", "🎪"],
    background: "linear-gradient(135deg, #ff00ff, #00ffff)",
    sound: "retro"
  },
  cyber: {
    name: "Cyber",
    symbols: ["🤖", "🧠", "💡", "⚡", "🔌", "🖲️", "📡", "🔐", "🛰️", "🌐", "💻", "🕶️"],
    background: "linear-gradient(135deg, #00ff88, #00aaff)",
    sound: "cyber"
  },
  nature: {
    name: "Nature",
    symbols: ["🌲", "🌸", "🍄", "🦋", "🐝", "🌺", "🌿", "🍃", "🌞", "🌈", "🦔", "🐢"],
    background: "linear-gradient(135deg, #4ade80, #22c55e)",
    sound: "nature"
  },
  cosmic: {
    name: "Cosmic",
    symbols: ["🌌", "🪐", "⭐", "🌙", "☄️", "🛸", "👽", "🌠", "🔭", "🚀", "🌎", "🌑"],
    background: "linear-gradient(135deg, #8b5cf6, #3b82f6)",
    sound: "cosmic"
  }
};

export const GAME_MODES = {
  memory: {
    name: "Memory Match",
    description: "Classic card-matching with a twist",
    pairs: [6, 8, 12],
    time: [120, 180, 240],
    bonus: [1, 1.5, 2],
    mechanics: ["flip", "shuffle", "freeze"]
  },
  reaction: {
    name: "Reaction Rush",
    description: "Hit the glowing card before it fades",
    rounds: [10, 15, 20],
    time: [60, 90, 120],
    bonus: [1.2, 1.8, 2.5],
    mechanics: ["glow", "fade", "multi"]
  },
  sequence: {
    name: "Sequence Master",
    description: "Memorize and repeat the pattern",
    levels: [5, 7, 10],
    time: [90, 120, 150],
    bonus: [1.5, 2, 3],
    mechanics: ["pattern", "speed", "reverse"]
  }
};

export const POWER_UPS = {
  freeze: { name: "Freeze Time", duration: 3000, icon: "❄️" },
  reveal: { name: "Reveal All", duration: 2000, icon: "👁️" },
  shuffle: { name: "Shuffle Board", duration: 0, icon: "🔄" },
  double: { name: "Double Points", duration: 5000, icon: "✨" }
};

export const ACHIEVEMENTS = [
  { id: "first_win", name: "First Victory", desc: "Win your first game", icon: "🏆" },
  { id: "speed_demon", name: "Speed Demon", desc: "Complete in under 30s", icon: "⚡" },
  { id: "perfect", name: "Perfect Match", desc: "No mistakes on hard mode", icon: "💯" },
  { id: "streak", name: "Winning Streak", desc: "5 wins in a row", icon: "🔥" },
  { id: "collector", name: "Theme Collector", desc: "Play all themes", icon: "🎨" }
];

export const SCORING = {
  basePoints: 100,
  timeBonus: 15,
  movesPenalty: 3,
  streakBonus: 50,
  perfectBonus: 200,
  powerUpBonus: 75
};

export function calculateScore(gameMode, difficulty, moves, time, streak = 0) {
  const mode = GAME_MODES[gameMode];
  const diffMultiplier = mode.bonus[difficulty];
  const timeBonus = Math.max(0, (mode.time[difficulty] - time) * SCORING.timeBonus);
  const movePenalty = moves * SCORING.movesPenalty;
  const streakBonus = streak * SCORING.streakBonus;
  
  return Math.max(0, Math.floor(
    (SCORING.basePoints + timeBonus - movePenalty + streakBonus) * diffMultiplier
  ));
}

export function saveProgress(gameData) {
  const progress = getProgress();
  progress.gamesPlayed += 1;
  progress.totalScore += gameData.score;
  progress.bestScores[gameData.mode] = Math.max(
    progress.bestScores[gameData.mode] || 0,
    gameData.score
  );
  
  // Unlock achievements
  const newAchievements = checkAchievements(gameData, progress);
  progress.achievements = [...new Set([...progress.achievements, ...newAchievements])];
  
  localStorage.setItem('miniGameProgress', JSON.stringify(progress));
  return progress;
}

export function getProgress() {
  const defaultProgress = {
    gamesPlayed: 0,
    totalScore: 0,
    bestScores: {},
    achievements: [],
    unlockedThemes: ["retro"]
  };
  const saved = localStorage.getItem('miniGameProgress');
  return saved ? { ...defaultProgress, ...JSON.parse(saved) } : defaultProgress;
}

export function checkAchievements(gameData, progress) {
  const newAchievements = [];
  
  if (progress.gamesPlayed === 1) newAchievements.push("first_win");
  if (gameData.time < 30) newAchievements.push("speed_demon");
  if (gameData.moves === gameData.pairs && gameData.difficulty === 2) newAchievements.push("perfect");
  if (progress.gamesPlayed >= 5 && progress.gamesPlayed % 5 === 0) newAchievements.push("streak");
  
  return newAchievements;
}

export const ANIMATIONS = {
  cardFlip: {
    initial: { rotateY: 0, scale: 1 },
    flipped: { rotateY: 180, scale: 1.05 },
    matched: { scale: [1.05, 1.2, 0], rotate: [0, 360] },
    transition: { duration: 0.6, ease: "easeOut" }
  },
  glow: {
    initial: { boxShadow: "0 0 0 rgba(212, 165, 116, 0)" },
    active: { boxShadow: "0 0 20px rgba(212, 165, 116, 0.8)" },
    transition: { duration: 0.3, yoyo: Infinity }
  },
  celebration: {
    particles: {
      count: 30,
      colors: ["#d4a574", "#8b9a8b", "#f8f6f0"],
      duration: 2000
    },
    text: {
      scale: [0, 1.5, 1],
      rotate: [-180, 0],
      transition: { duration: 1, ease: "backOut" }
    }
  }
};

// -- Compatibility exports required by existing MemoryGame.jsx --
// Difficulty settings (backwards-compatible shape)
export const DIFFICULTIES = {
  easy: { name: "Easy", pairs: 6, time: 120, bonus: 1 },
  medium: { name: "Medium", pairs: 8, time: 180, bonus: 1.5 },
  hard: { name: "Hard", pairs: 12, time: 240, bonus: 2 }
};

// High scores management (backwards-compatible)
export function getHighScores() {
  const scores = localStorage.getItem('memoryGameHighScores');
  return scores ? JSON.parse(scores) : [];
}

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

  const topScores = highScores.slice(0, 10);
  localStorage.setItem('memoryGameHighScores', JSON.stringify(topScores));
  return topScores;
}
