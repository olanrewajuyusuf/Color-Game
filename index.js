const colorBox = document.querySelector('[data-testid="colorBox"]');
const colorOptions = document.querySelector(".color-options");
const gameStatus = document.querySelector('[data-testid="gameStatus"]');
const scoreElement = document.querySelector('[data-testid="score"]');
const newGameButton = document.querySelector('[data-testid="newGameButton"]');

let score = 0;
let targetColor;

// Predefined set of colors
const colors = [
  "#FF5733",
  "#33FF57",
  "#3357FF",
  "#FF33A1",
  "#A133FF",
  "#33FFF5",
  "#FFC300",
  "#C70039",
  "#900C3F",
  "#581845",
  "#1A5276",
  "#1E8449",
];

// Function to generate a random color from the predefined set
function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

// Function to initialize the game
function initGame() {
  targetColor = getRandomColor();
  colorBox.style.backgroundColor = targetColor;

  // Clear previous options
  colorOptions.innerHTML = "";

  // Create color buttons
  const shuffledColors = [...colors]
    .sort(() => Math.random() - 0.5)
    .slice(0, 6);
  if (!shuffledColors.includes(targetColor)) {
    shuffledColors[Math.floor(Math.random() * 6)] = targetColor;
  }

  shuffledColors.forEach((color) => {
    const button = document.createElement("button");
    button.style.backgroundColor = color;
    button.setAttribute("data-testid", "colorOption");
    button.addEventListener("click", () => checkGuess(color));
    colorOptions.appendChild(button);
  });

  gameStatus.textContent = "";
}

// Function to check the player's guess
function checkGuess(selectedColor) {
  if (selectedColor === targetColor) {
    gameStatus.textContent = "Correct! 🎉";
    gameStatus.style.color = "green";
    score++;
    scoreElement.textContent = score;
    setTimeout(initGame, 1000); // Start a new round after 1 second
  } else {
    gameStatus.textContent = "Wrong! Try again. 😢";
    gameStatus.style.color = "red";
  }
}

// Event listener for the new game button
newGameButton.addEventListener("click", () => {
  score = 0;
  scoreElement.textContent = score;
  initGame();
});

// Initialize the game on page load
initGame();
