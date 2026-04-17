import { gameBoardWidth } from "../models/gameBoard.js";
import { Player } from "../models/player.js";
import { Computer } from "../models/computer.js";
import { Ship } from "../models/ship.js";
import { uiController } from "./uiController.js";
export { gameStates, gameController };

const gameStates = Object.freeze({
  PLAYER_1_PLACING: "PLAYER_1_PLACING",
  PLAYER_2_PLACING: "PLAYER_2_PLACING",
  AI_PLACING: "AI_PLACING",
  PLAYER_1_TURN: "PLAYER_1_TURN",
  PLAYER_2_TURN: "PLAYER_2_TURN",
  AI_TURN: "AI_TURN",
  GAME_OVER: "GAME_OVER",
});

const gameModes = Object.freeze({
  PvP: "PvP",
  PvAI: "PvAI",
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

  let gameMode = gameModes.PvP;
  let gameState = gameStates.PLAYER_1_PLACING;
  const player1 = new Player("Player 1");
  const humanPlayer2 = new Player("Player 2");
  const aiPlayer = new Computer("AI");
  let player2 = humanPlayer2;

  function getGameMode() {
    return gameMode;
  }

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
          if ((gameMode === gameModes.PvP)) {
            gameState = gameStates.PLAYER_2_TURN;
          } else if ((gameMode === gameModes.PvAI)) {
            aiTurn();
          }
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

  function aiTurn() {
    gameState = gameStates.AI_TURN;
    uiController.render(gameState, getPlayers());
    let target = player2.sendAttackTarget();
    while(!player1.gameBoard.receiveAttack(target)){
      target = player2.sendAttackTarget();
    };
    if (player1.gameBoard.areAllShipsSunk()) {
      winner = player2;
      gameState = gameStates.GAME_OVER;
      uiController.render(gameState, getPlayers());
      uiController.updateWinnerMessage(winner);
      return;
    }
    gameState = gameStates.PLAYER_1_TURN;
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
    uiController.bindNewGameBtn(newGame);
    uiController.bindVsAiBtn(vsAiMode);
    uiController.addShipsToMenu(shipLengths);
  }

  function confirmPlacement() {
    switch (gameState) {
      case gameStates.PLAYER_1_PLACING:
        if (player1.gameBoard.areAllShipsPlaced(player1Ships)) {
          gameMode = gameModes.PvP;
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

  function vsAiMode() {
    if (player1.gameBoard.areAllShipsPlaced(player1Ships)) {
      startAiGame();
    } else {
      uiController.updateErrorMessage("ALL SHIPS MUST SAIL!");
    }
  }

  function startAiGame() {
    uiController.updateErrorMessage("");
    gameMode = gameModes.PvAI;
    gameState = gameStates.AI_PLACING;
    player2 = aiPlayer;
    uiController.render(gameState, getPlayers());
    player2.placeShips(player2Ships);
    gameState = gameStates.PLAYER_1_TURN;
    uiController.render(gameState, getPlayers());
  }

  function newGame() {
    uiController.reset();
    player1.gameBoard.clearBoard();
    player2.gameBoard.clearBoard();
    resetShips();
    gameState = gameStates.PLAYER_1_PLACING;
    uiController.render(gameState, getPlayers());
  }

  function resetShips() {
    const playersShips = [player1Ships, player2Ships];
    for (const ships of playersShips) {
      for (const ship of ships) {
        ship.reset();
      }
    }
  }

  return {
    getGameMode,
    getGameState,
    getPlayers,
    getShips,
    placeShip,
    init,
    receiveAttack, // TODO: Delete after testing
    confirmPlacement,
    newGame,
  };
})();
