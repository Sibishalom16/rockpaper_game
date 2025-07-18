// Prompt: Set initial variables and elements
let playerScore = 0;
let computerScore = 0;
let round = 1;
const maxRounds = 5;

const buttons = document.querySelectorAll("#choices button");
const statusText = document.getElementById("status");
const playerScoreText = document.getElementById("playerScore");
const computerScoreText = document.getElementById("computerScore");
const roundText = document.getElementById("round");
const playerChoiceText = document.getElementById("playerChoice");
const computerChoiceText = document.getElementById("computerChoice");
const playAgainButton = document.getElementById("playAgain");

// Prompt: Generate random choice for computer
function getComputerChoice() {
  const choices = ['rock', 'paper', 'scissors'];
  return choices[Math.floor(Math.random() * choices.length)];
}

// Prompt: Compare player vs computer choice
function getWinner(player, computer) {
  if (player === computer) return 'tie';
  if (
    (player === 'rock' && computer === 'scissors') ||
    (player === 'paper' && computer === 'rock') ||
    (player === 'scissors' && computer === 'paper')
  ) return 'player';
  return 'computer';
}

// Prompt: Play one round
function playRound(playerChoice) {
  if (round > maxRounds) return;

  const computerChoice = getComputerChoice();
  const winner = getWinner(playerChoice, computerChoice);

  playerChoiceText.textContent = playerChoice;
  computerChoiceText.textContent = computerChoice;

  if (winner === 'player') {
    playerScore++;
    statusText.textContent = `You Win! ${playerChoice} beats ${computerChoice}`;
    statusText.style.color = "lime";
  } else if (winner === 'computer') {
    computerScore++;
    statusText.textContent = `You Lose! ${computerChoice} beats ${playerChoice}`;
    statusText.style.color = "tomato";
  } else {
    statusText.textContent = `It's a Tie! You both chose ${playerChoice}`;
    statusText.style.color = "gray";
  }

  playerScoreText.textContent = playerScore;
  computerScoreText.textContent = computerScore;
  roundText.textContent = round;

  round++;
  if (round > maxRounds) endGame();
}

// Prompt: Add event listeners to buttons
buttons.forEach(button => {
  button.addEventListener("click", () => {
    playRound(button.id);
  });
});

// Prompt: Show final result and disable buttons
function endGame() {
  buttons.forEach(btn => btn.disabled = true);
  playAgainButton.style.display = "inline-block";

  if (playerScore > computerScore) {
    statusText.textContent = "🎉 Congratulations! You Won The Game!";
  } else if (computerScore > playerScore) {
    statusText.textContent = "💻 Game Over! Computer Wins The Game!";
  } else {
    statusText.textContent = "😐 It's a Tie Game! Try Again!";
  }
}

// Prompt: Reset the game to start again
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
  statusText.style.color = "white";

  buttons.forEach(btn => btn.disabled = false);
  playAgainButton.style.display = "none";
});
