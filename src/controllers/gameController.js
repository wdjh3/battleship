import { gameBoardWidth } from "../models/gameBoard.js";
import { Player } from "../models/player.js";
import { Ship } from "../models/ship.js";
import { uiController } from "./uiController.js";
export { gameStates, gameController };

const gameStates = Object.freeze({
  PLAYER_1_PLACING: "PLAYER_1_PLACING",
  PLAYER_2_PLACING: "PLAYER_2_PLACING",
  PLAYER_1_TURN: "PLAYER_1_TURN",
  PLAYER_2_TURN: "PLAYER_2_TURN",
  GAME_OVER: "GAME_OVER",
});

const gameController = (() => {
  let winner;
  const shipLengths = [5, 4, 3, 3, 2];
  const player1Ships = [];
  const player2Ships = [];
  for (const shipLength of shipLengths) {
    player1Ships.push(new Ship(shipLength));
    player2Ships.push(new Ship(shipLength));
  }

  let gameState = gameStates.PLAYER_1_PLACING;
  const player1 = new Player("Player 1");
  const player2 = new Player("Player 2");

  function getGameState() {
    return gameState;
  }

  function getPlayers() {
    return JSON.parse(JSON.stringify([player1, player2]));
  }

  function getShips() {
    if (gameState === gameStates.PLAYER_1_PLACING) {
      return player1Ships;
    } else if (gameState === gameStates.PLAYER_2_PLACING) {
      return player2Ships;
    }
  }

  function placeShip(shipObject, [x, y], rotation = "vertical") {
    // TODO: Fix actually returning success state
    switch (gameState) {
      case "PLAYER_1_PLACING":
        player1.gameBoard.placeShip(shipObject, [x, y], rotation);
        uiController.render(gameState, this.getPlayers());
        return true;
        break;
      case "PLAYER_2_PLACING":
        player2.gameBoard.placeShip(shipObject, [x, y], rotation);
        uiController.render(gameState, this.getPlayers());
        return true;
        break;
    }
  }

  function receiveAttack(index) {
    const coords = [index % gameBoardWidth, Math.floor(index / gameBoardWidth)];
    switch (gameState) {
      case gameStates.PLAYER_1_TURN:
        if (player2.gameBoard.receiveAttack(coords)) {
          if (player2.gameBoard.areAllShipsSunk()) {
            winner = player1;
            gameState = gameStates.GAME_OVER;
            uiController.render(gameState, getPlayers());
            uiController.updateWinnerMessage(winner);
            return;
          }
          gameState = gameStates.PLAYER_2_TURN;
          uiController.render(gameState, getPlayers());
          return true;
        }
        return false;
        break;
      case gameStates.PLAYER_2_TURN:
        if (player1.gameBoard.receiveAttack(coords)) {
          if (player1.gameBoard.areAllShipsSunk()) {
            winner = player2;
            gameState = gameStates.GAME_OVER;
            uiController.render(gameState, getPlayers());
            uiController.updateWinnerMessage(winner);
            return;
          }
          gameState = gameStates.PLAYER_1_TURN;
          uiController.render(gameState, getPlayers());
          return true;
        }
        return false;
        break;
    }
  }

  function init() {
    uiController.bindConfirmPlacementBtn(confirmPlacement);
    uiController.bindGameBoardListener((e) => {
      if (e.target.classList.contains("grid-cell")) {
        if (
          (gameState === gameStates.PLAYER_1_TURN &&
            e.target.closest(".gameboard").id === "player1-gameboard") ||
          (gameState === gameStates.PLAYER_2_TURN &&
            e.target.closest(".gameboard").id === "player2-gameboard")
        ) {
          return;
        }
        receiveAttack(Number(e.target.dataset.index));
      }
    });
  }

  function confirmPlacement() {
    switch (gameState) {
      case gameStates.PLAYER_1_PLACING:
        if (player1.gameBoard.areAllShipsPlaced(player1Ships)) {
          gameState = gameStates.PLAYER_2_PLACING;
          uiController.render(gameState, getPlayers());
          uiController.updateErrorMessage("");
        } else {
          uiController.updateErrorMessage("ALL SHIPS MUST SAIL!");
        }
        break;
      case gameStates.PLAYER_2_PLACING:
        if (player2.gameBoard.areAllShipsPlaced(player2Ships)) {
          gameState = gameStates.PLAYER_1_TURN;
          uiController.render(gameState, getPlayers());
          uiController.updateErrorMessage("");
        } else {
          uiController.updateErrorMessage("ALL SHIPS MUST SAIL!");
        }
        break;
    }
  }

  return {
    getGameState,
    getPlayers,
    getShips,
    placeShip,
    init,
    receiveAttack, // TODO: Delete after testing
    confirmPlacement,
  };
})();
