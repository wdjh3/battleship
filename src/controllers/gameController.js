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
      case "PLAYER_2_PLACING":
        player2.gameBoard.placeShip(shipObject, [x, y], rotation);
        uiController.render(gameState, this.getPlayers());
    }
  }

  return { getGameState, getPlayers, getShips, placeShip };
})();
