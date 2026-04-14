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
    const coords = [];
    const newShip = new Ship(length);

    if (rotation === "horizontal") {
      if (!this.validateCoordinates([x + length - 1, y])) {
        return false;
      }
      for (let i = 0; i < length; i++) {
        coords.push(`${x + i},${y}`);
      }
    } else if (rotation === "vertical") {
      if (!this.validateCoordinates([x, y + length - 1])) {
        return false;
      }
      for (let i = 0; i < length; i++) {
        coords.push(`${x},${y + i}`);
      }
    }

    console.log(coords);

    // Check if space if occupied by another ship
    for (const coord of coords) {
      if (this.board[coord]) {
        return false;
      };
    }

    for (const coord of coords) {
      this.board[coord] = newShip;
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
