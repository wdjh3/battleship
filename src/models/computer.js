import { GameBoard, gameBoardHeight, gameBoardWidth } from "./gameBoard.js";
export { Computer };

class Computer {
  constructor(name) {
    this.name = name;
    this.shots = new Set();
    this.gameBoard = new GameBoard();
  }

  placeShips(shipObjects) {
    for (const ship of shipObjects) {
      while (!this.gameBoard.hasShip(ship)) {
        const coords = this.#randomCoords();
        const rotation = this.#randomRotation();
        console.log("trying to position ship with length " + ship.length + " at " + coords + " rotated " + rotation); 
        if (this.gameBoard.placeShip(ship, coords, rotation)) {
          console.log("successful");
        };
      }
    }
  }

  sendAttackTarget() {
    return this.#randomCoords();
  }

  receiveAttackStatus(attack) {
    this.shots.add(attack);
  }

  #randomCoords() {
    return [
      Math.floor(Math.random() * gameBoardWidth),
      Math.floor(Math.random() * gameBoardHeight),
    ];
  }

  #randomRotation() {
    return Math.random() > 0.5 ? "horizontal" : "vertical";
  }

  makeMove(gameState) {}
}
