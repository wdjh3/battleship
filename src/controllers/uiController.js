export { uiController };
import { gameBoardWidth, gameBoardHeight } from "../models/gameBoard.js";
import { gameStates } from "./gameController.js";

const messageElement = document.getElementById("message");
const winnerMessageElement = document.getElementById("winner-message");
const errorMessageElement = document.getElementById("error-message");
const gameBoardNodeList = document.querySelectorAll(".gameboard");
const player1GameBoard = document.getElementById("player1-gameboard");
const player2GameBoard = document.getElementById("player2-gameboard");
const confirmPlacementBtn = document.getElementById("confirm-placement-btn");
const shipSelectionElement = document.getElementById("ship-selection");

const uiController = (() => {
  function start() {
    addCellsToGrid();
  }

  function render(gameState, players) {
    switch (gameState) {
      case gameStates.PLAYER_1_PLACING:
        shipSelectionElement.style.display = "flex";
        updateMessage(`It's ${players[0].name}'s turn to place ships!`);
        renderShips(player1GameBoard, players[0].gameBoard.board);
        break;
      case gameStates.PLAYER_2_PLACING:
        hideShips(player1GameBoard);
        updateMessage(`It's ${players[1].name}'s turn to place ships!`);
        renderShips(player2GameBoard, players[1].gameBoard.board);
        break;
      case gameStates.PLAYER_1_TURN:
        hideShips(player2GameBoard);
        renderAttacks(players);
        updateMessage(`It's ${players[0].name}'s turn!`);
        shipSelectionElement.style.display = "none";
        break;
      case gameStates.PLAYER_2_TURN:
        renderAttacks(players);
        updateMessage(`It's ${players[1].name}'s turn!`);
        break;
      case gameStates.GAME_OVER:
        renderAttacks(players);
        updateMessage("Game Over!");
        break;
    }
  }

  function updateWinnerMessage(player) {
    winnerMessageElement.textContent = `${player.name} wins!`;
  }

  function updateErrorMessage(error) {
    errorMessageElement.textContent = error;
  }

  function bindConfirmPlacementBtn(callback) {
    confirmPlacementBtn.addEventListener("click", callback);
  }

  // Maybe switch to Pub/Sub?
  function bindGameBoardListener(callback) {
    for (const gameBoardNode of gameBoardNodeList) {
      gameBoardNode.addEventListener("click", (e) => {
        callback(e);
      });
    }
  }

  return {
    start,
    render,
    updateErrorMessage,
    updateWinnerMessage,
    bindConfirmPlacementBtn,
    bindGameBoardListener,
  };
})();

function addCellsToGrid() {
  for (const gameBoardNode of gameBoardNodeList) {
    for (let i = 0; i < gameBoardWidth * gameBoardHeight; i++) {
      const square = document.createElement("div");
      square.classList.add("grid-cell");
      square.dataset.index = i;

      gameBoardNode.appendChild(square);
    }
  }
}

function updateMessage(message) {
  messageElement.textContent = message;
}

function renderShips(gameBoardElement, board) {
  for (const square of gameBoardElement.querySelectorAll(".grid-cell")) {
    square.classList.remove("ship");
  }
  for (const key in board) {
    const index = keyToIndex(key);
    gameBoardElement
      .querySelector(`.grid-cell[data-index="${index}"]`)
      .classList.add("ship");
  }
}

function hideShips(gameBoardElement) {
  for (const square of gameBoardElement.querySelectorAll(".grid-cell")) {
    square.classList.remove("ship");
  }
}

function renderAttacks(players) {
  for (let i = 0; i < 2; i++) {
    const player = players[i];
    const attacks = player.gameBoard.attacks;
    const gameboard = document.getElementById(`player${i + 1}-gameboard`);
    for (const key in attacks) {
      const index = keyToIndex(key);
      const square = gameboard.querySelector(
        `.grid-cell[data-index="${index}"]`,
      );
      if (attacks[key].isAHit) {
        square.classList.add("hit");
        square.innerHTML = `<svg viewBox="-45 -15 280 280"><path fill="#ff4500" d="M187.899 164.809c-2.096 50.059-43.325 90.003-93.899 90.003-51.915 0-94-43.5-94-94 0-6.75-.121-20.24 10-43 6.057-13.621 9.856-22.178 12-30 1.178-4.299 3.469-11.129 10 0 3.851 6.562 4 16 4 16s14.328-10.995 24-32c14.179-30.793 2.866-49.2-1-62-1.338-4.428-2.178-12.386 7-9 9.352 3.451 34.076 20.758 47 39 18.445 26.035 25 51 25 51s5.906-7.33 8-15c2.365-8.661 2.4-17.239 9.999-7.999 7.227 8.787 17.96 25.3 24.001 40.999 10.969 28.509 7.899 55.997 7.899 55.997" class="cls-3" fill-rule="evenodd"/><path fill="orange" d="M94 254.812c-35.899 0-65-29.101-65-65 0-21.661 8.729-34.812 26.896-52.646 11.632-11.419 22.519-25.444 27.146-34.994.911-1.88 2.984-11.677 10.977-.206 4.193 6.016 10.766 16.715 14.981 25.846 7.266 15.743 9 31 9 31s7.121-4.196 12-15c1.573-3.482 4.753-16.664 13.643-3.484C150.166 150 159.127 167.39 159 189.812c0 35.899-29.102 65-65 65" class="cls-4" fill-rule="evenodd"/><path fill="#ff0" d="M95 183.812c9.25 0 9.25 17.129 21 40 7.824 15.229-3.879 31-21 31s-26-13.879-26-31c0-17.12 16.75-40 26-40" class="cls-5" fill-rule="evenodd"/></svg>`;
      } else {
        square.classList.add("miss");
        square.innerHTML =
          "<span class='material-symbols-outlined'> close </span>";
      }
    }
  }
}

function keyToIndex(key) {
  const coords = key.split(",").map((a) => Number(a));
  return coords[0] + gameBoardWidth * coords[1];
}
