import { Ship } from "./ship.js";
export { gameBoardWidth, gameBoardHeight, GameBoard };

const gameBoardWidth = 10;
const gameBoardHeight = 10;

class GameBoard {
  constructor() {
    this.board = {};
    this.attacks = {};
  }

  placeShip(shipObject, [x, y], rotation = "horizontal") {
    if (!this.validateCoordinates([x, y])) {
      return false;
    }
    const coords = [];
    const prevCoords = this.findShip(shipObject);

    if (rotation === "horizontal") {
      if (!this.validateCoordinates([x + shipObject.length - 1, y])) {
        return false;
      }
      for (let i = 0; i < shipObject.length; i++) {
        coords.push(`${x + i},${y}`);
      }
    } else if (rotation === "vertical") {
      if (!this.validateCoordinates([x, y + shipObject.length - 1])) {
        return false;
      }
      for (let i = 0; i < shipObject.length; i++) {
        coords.push(`${x},${y + i}`);
      }
    }

    if (prevCoords.length !== 0) {
      // Ship has been placed
      this.removeShip(shipObject);
    }

    // Check if space if occupied by another ship
    for (const coord of coords) {
      if (this.board[coord]) {
        for (const prevCoord of prevCoords) {
          this.board[prevCoord] = shipObject;
        }
        return false;
      }
    }

    for (const coord of coords) {
      this.board[coord] = shipObject;
    }
  }

  findShip(shipObject) {
    const coords = [];
    for (const key in this.board) {
      if (this.board[key] === shipObject) {
        coords.push(key);
      }
    }
    return coords;
  }

  removeShip(shipObject) {
    for (const key in this.board) {
      if (this.board[key] === shipObject) {
        delete this.board[key];
      }
    }
  }

  receiveAttack([x, y]) {
    if (!this.validateCoordinates([x, y]) || this.attacks[`${x},${y}`]) {
      return false;
    }

    const attackedCoords = this.board[`${x},${y}`];
    if (attackedCoords) {
      // Assumption: if it exists, it's a ship
      attackedCoords.hit();
      this.attacks[`${x},${y}`] = new Attack(true);
      return true;
    }
    this.attacks[`${x},${y}`] = new Attack(false);
    return true;
  }

  areAllShipsSunk() {
    for (const key in this.board) {
      if (this.board[key]?.hasSunk === false) {
        return false;
      }
    }
    return true;
  }

  areAllShipsPlaced(ships) {
    for (const ship of ships) {
      if (!this.hasShip(ship)) {
        return false;
      }
    }
    return true;
  }

  hasShip(shipObject) {
    for (const key in this.board) {
      if (this.board[key] === shipObject) {
        return true;
      }
    }
    return false;
  }

  validateCoordinates([x, y]) {
    return (
      x >= 0 && x <= gameBoardWidth - 1 && y >= 0 && y <= gameBoardHeight - 1
    );
  }

  clearBoard() {
    this.board = {};
    this.attacks = {};
  }
}

class Attack {
  constructor(isAHit) {
    this.isAHit = isAHit;
  }
}
