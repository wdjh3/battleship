export { uiController };
import { gameBoardWidth, gameBoardHeight } from "../models/gameBoard.js";
import { gameStates } from "./gameController.js";

const messageElement = document.getElementById("message");
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
        updateMessage(`It's ${players[0].name}'s turn!`);
        shipSelectionElement.style.display = "none";
        break;
      case gameStates.PLAYER_2_TURN:
        updateMessage(`It's ${players[1].name}'s turn!`);
        break;
    }
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
    const coords = key.split(",").map((a) => Number(a));
    const index = coords[0] + 10 * coords[1];
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
