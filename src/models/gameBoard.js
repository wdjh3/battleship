import { Ship } from "./ship.js";
export { GameBoard };

const gameBoardWidth = 10;
const gameBoardHeight = 10;

class GameBoard {
  constructor() {
    this.board = {};
  }

  placeShip([x, y], length, rotation = "horizontal") {
    if (!this.validateCoordinates([x, y])) {
      // console.log("Invalid Coordinates: Out of bounds");
      return false;
    }
    const newShip = new Ship(length);
    if (rotation === "horizontal") {
      if (!this.validateCoordinates([x + length - 1, y])) {
        return false;
      }
      for (let i = 0; i < length; i++) {
        this.board[`${x + i},${y}`] = newShip;
      }
    } else if (rotation === "vertical") {
      if (!this.validateCoordinates([x, y + length - 1])) {
        return false;
      }
      for (let i = 0; i < length; i++) {
        this.board[`${x},${y + i}`] = newShip;
      }
    }
  }

  receiveAttack([x, y]) {
    if (!this.validateCoordinates([x, y])) {
      // console.log("Invalid Coordinates: Out of bounds");
      return false;
    }
  }

  validateCoordinates([x, y]) {
    return (
      x >= 0 && x <= gameBoardWidth - 1 && y >= 0 && y <= gameBoardHeight - 1
    );
  }
}
