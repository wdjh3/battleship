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
  const shipLengths = [5, 4, 3, 3, 2];
  const ships = [];
  for (const shipLength of shipLengths) {
    ships.push(new Ship(shipLength));
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
    return ships;
  }

  function placeShip(shipObject, [x, y], rotation = "vertical") {
    switch (gameState) {
      case "PLAYER_1_PLACING":
        player1.gameBoard.placeShip(shipObject, [x, y], rotation);
        uiController.render(gameState, this.getPlayers());
        return true;
      case "PLAYER_2_PLACING":
        player2.gameBoard.placeShip(shipObject, [x, y], rotation);
        uiController.render(gameState, this.getPlayers());
        return true;
    }
  }

  function init() {
    uiController.bindConfirmPlacementBtn(confirmPlacement);
  }

  function confirmPlacement() {
    debugger;
    switch (gameState) {
      case gameStates.PLAYER_1_PLACING:
        if (player1.gameBoard.areAllShipsPlaced(ships)) {
          gameState = gameStates.PLAYER_2_PLACING;
          console.log(gameState);
          uiController.render(gameState, getPlayers());
        } else {
          // Error message saying that all ships must set sail!
        }
        break;
      case gameStates.PLAYER_2_PLACING:
        if (player2.gameBoard.areAllShipsPlaced(ships)) {
          gameState = gameStates.PLAYER_1_TURN;
        } else {
          // Error message saying that all ships must set sail!
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
    confirmPlacement,
  };
})();
