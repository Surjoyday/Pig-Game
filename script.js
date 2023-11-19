"use strict";

/* INDIVIDUAL PLAYERS CLASS */
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");

/*  INDIVIDUAL BUTTONS CLASS */
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

/*  CURRENT SCORES ID */

const totalScorePlayer0 = document.getElementById("score--0");
const totalScorePlayer1 = document.getElementById("score--1");

/* TOTAL SCORES ID */

const currentScorePlayer0 = document.getElementById("current--0");
const currentScorePlayer1 = document.getElementById("current--1");

/*  DICE IMAGE CLASS */
const diceImage = document.querySelector(".dice");

/* INITIAL STATE  */

let gameIsRunning, totalScores, currentScore, activePlayer;

const init = function () {
  totalScores = [0, 0];

  gameIsRunning = true;

  currentScore = 0;

  activePlayer = 0;

  currentScorePlayer0.textContent = 0;
  currentScorePlayer1.textContent = 0;
  totalScorePlayer0.textContent = 0;
  totalScorePlayer1.textContent = 0;

  diceImage.classList.add("hidden");

  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");

  player0.classList.add("player--active");
  player1.classList.remove("player--active");
};

init();

/* SWITCH PLAYER FUNCTION */

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0; //reseting the present active player current score to 0
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  // Display the blur background on the active player
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
};

/* WHEN USER ROLLS THE DICE  */

btnRoll.addEventListener("click", function () {
  if (gameIsRunning) {
    // 1. Generate random numbers
    const randomDiceRoll = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceImage.classList.remove("hidden");

    diceImage.src = `./icons/dice-${randomDiceRoll}.png`;
    diceImage.alt = `dice-${randomDiceRoll}-image`;

    // 3. Check if dice roll is 1
    if (randomDiceRoll !== 1) {
      currentScore += randomDiceRoll; // Add dice rolled score to current score

      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

/* WHEN USER HOLDS THE SCORE  */

btnHold.addEventListener("click", function () {
  if (gameIsRunning) {
    // 1. Add current score to the active player total score

    totalScores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScores[activePlayer];

    // 2. Check if total score >= 100
    if (totalScores[activePlayer] >= 100) {
      // GAME ENDS !!!!!

      gameIsRunning = false;

      diceImage.classList.add("hidden");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      // 3. Switch to the next player
      switchPlayer();
    }
  }
});

/* WHEN USER RESET THE SCORE  */
btnNew.addEventListener("click", init);
