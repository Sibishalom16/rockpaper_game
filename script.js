let playerScore = 0;
let computerScore = 0;
let round = 1;
const maxRounds = 5;

// ✅ Sound Effects
const clickSound = new Audio("./assets/mouse-click-405462.mp3");
const winSound   = new Audio("./assets/win-sound-effect-187097.mp3");
const loseSound  = new Audio("./assets/game-over-417465.mp3");
const tieSound   = new Audio("./assets/8-bit-video-game-fail-version-2-145478.mp3");

// Preload sounds
[clickSound, winSound, loseSound, tieSound].forEach(sound => {
  sound.load();
  sound.volume = 1;
  sound.muted = false;
});

// helper to avoid overlap
function playSound(sound) {
  sound.pause();
  sound.currentTime = 0;
  sound.play().catch(() => {});
}

// DOM elements
const buttons = document.querySelectorAll("#choices button");
const statusText = document.getElementById("status");
const playerScoreText = document.getElementById("playerScore");
const computerScoreText = document.getElementById("computerScore");
const roundText = document.getElementById("round");
const playerChoiceText = document.getElementById("playerChoice");
const computerChoiceText = document.getElementById("computerChoice");
const playAgainButton = document.getElementById("playAgain");

function getChoiceEmoji(choice) {
  if (choice === "rock") return "🪨 rock";
  if (choice === "paper") return "📄 paper";
  if (choice === "scissors") return "✂️ scissors";
}

function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  return choices[Math.floor(Math.random() * choices.length)];
}

function getWinner(player, computer) {
  if (player === computer) return "tie";
  if (
    (player === "rock" && computer === "scissors") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper")
  )
    return "player";
  return "computer";
}

// 🎮 Play Round
function playRound(playerChoice) {
  if (round > maxRounds) return;

  playSound(clickSound); // click sound first

  const computerChoice = getComputerChoice();
  const winner = getWinner(playerChoice, computerChoice);

  playerChoiceText.textContent = getChoiceEmoji(playerChoice);
  computerChoiceText.textContent = getChoiceEmoji(computerChoice);

  if (winner === "player") {
    playerScore++;
    statusText.textContent = `Round ${round}: You Win this round! ${getChoiceEmoji(playerChoice)} beats ${getChoiceEmoji(computerChoice)}.`;
    statusText.style.color = "lime";
  } else if (winner === "computer") {
    computerScore++;
    statusText.textContent = `Round ${round}: You Lose this round! ${getChoiceEmoji(computerChoice)} beats ${getChoiceEmoji(playerChoice)}.`;
    statusText.style.color = "tomato";
  } else {
    statusText.textContent = `Round ${round}: It's a Tie! You both chose ${getChoiceEmoji(playerChoice)}.`;
    statusText.style.color = "gray";
  }

  playerScoreText.textContent = playerScore;
  computerScoreText.textContent = computerScore;
  roundText.textContent = round;

  round++;
  if (round > maxRounds) endGame();
}

// 🏁 End Game (plays final result sound only once)
function endGame() {
  buttons.forEach(btn => btn.disabled = true);
  playAgainButton.style.display = "inline-block";

  setTimeout(() => {
    if (playerScore > computerScore) {
      statusText.textContent = "🎉 Congratulations! You Won The Game!";
      playSound(winSound);
    } else if (computerScore > playerScore) {
      statusText.textContent = "💻 Game Over! Computer Wins!";
      playSound(loseSound);
    } else {
      statusText.textContent = "😐 It's a Tie Game!";
      playSound(tieSound);
    }
  }, 500);
}

// 🔁 Reset Game
playAgainButton.addEventListener("click", () => {
  playerScore = 0;
  computerScore = 0;
  round = 1;

  playerScoreText.textContent = "0";
  computerScoreText.textContent = "0";
  roundText.textContent = "1";
  playerChoiceText.textContent = "?";
  computerChoiceText.textContent = "?";
  statusText.textContent = "Make your choice!";
  statusText.style.color = "#38bdf8";

  buttons.forEach(btn => btn.disabled = false);
  playAgainButton.style.display = "none";

  playSound(clickSound);
});

// Buttons
buttons.forEach(button => {
  button.addEventListener("click", () => {
    playRound(button.id);
  });
});
