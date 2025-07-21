let playerScore = 0;
let computerScore = 0;
let round = 1;
const maxRounds = 5;

// DOM Elements
const buttons = document.querySelectorAll("#choices button");
const statusText = document.getElementById("status");
const playerScoreText = document.getElementById("playerScore");
const computerScoreText = document.getElementById("computerScore");
const roundText = document.getElementById("round");
const playerChoiceText = document.getElementById("playerChoice");
const computerChoiceText = document.getElementById("computerChoice");
const playAgainButton = document.getElementById("playAgain");

// ✅ Sound Effects
const clickSound = new Audio("assets/Sounds/click.mp3");
const winSound = new Audio("assets/Sounds/win.mp3");
const loseSound = new Audio("assets/Sounds/lose.mp3");
const tieSound = new Audio("assets/Sounds/tie.mp3");

// Preload and unmute
[clickSound, winSound, loseSound, tieSound].forEach(sound => {
  sound.load();
  sound.volume = 1;
  sound.muted = false;
});

// Get emoji+label
function getChoiceEmoji(choice) {
  if (choice === 'rock') return '🪨 rock';
  if (choice === 'paper') return '📄 paper';
  if (choice === 'scissors') return '✂️ scissors';
}

// Computer move
function getComputerChoice() {
  const choices = ['rock', 'paper', 'scissors'];
  return choices[Math.floor(Math.random() * choices.length)];
}

// Winner logic
function getWinner(player, computer) {
  if (player === computer) return 'tie';
  if (
    (player === 'rock' && computer === 'scissors') ||
    (player === 'paper' && computer === 'rock') ||
    (player === 'scissors' && computer === 'paper')
  ) return 'player';
  return 'computer';
}

// Round logic
function playRound(playerChoice) {
  if (round > maxRounds) return;

  const computerChoice = getComputerChoice();
  const winner = getWinner(playerChoice, computerChoice);

  playerChoiceText.textContent = getChoiceEmoji(playerChoice);
  computerChoiceText.textContent = getChoiceEmoji(computerChoice);

  if (winner === 'player') {
    playerScore++;
    winSound.play();
    statusText.textContent = `You Win! ${getChoiceEmoji(playerChoice)} beats ${getChoiceEmoji(computerChoice)}.`;
    statusText.style.color = "lime";
  } else if (winner === 'computer') {
    computerScore++;
    loseSound.play();
    statusText.textContent = `You Lose! ${getChoiceEmoji(computerChoice)} beats ${getChoiceEmoji(playerChoice)}.`;
    statusText.style.color = "tomato";
  } else {
    tieSound.play();
    statusText.textContent = `It's a Tie! You both chose ${getChoiceEmoji(playerChoice)}.`;
    statusText.style.color = "gray";
  }

  playerScoreText.textContent = playerScore;
  computerScoreText.textContent = computerScore;
  roundText.textContent = round;

  round++;
  if (round > maxRounds) endGame();
}

// Button events
buttons.forEach(button => {
  button.addEventListener("click", () => {
    clickSound.play();
    playRound(button.id);
  });
});

// End Game
function endGame() {
  buttons.forEach(btn => btn.disabled = true);
  playAgainButton.style.display = "inline-block";

  if (playerScore > computerScore) {
    statusText.textContent = "🎉 Congratulations! You Won The Game!";
  } else if (computerScore > playerScore) {
    statusText.textContent = "💻 Game Over! Computer Wins!";
  } else {
    statusText.textContent = "😐 It's a Tie Game!";
  }
}

// Reset
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
});
