export { GameBoard };

const gameBoardWidth = 10;
const gameBoardHeight = 10;

class GameBoard {
  constructor() {
    this.board = [];
  }

  receiveAttack([x, y]) {
    if (!this.validateCoordinates([x, y])) {
      console.log("Invalid Coordinates: Out of bounds")
      return false;
    }
  }

  validateCoordinates([x, y]) {
    return (
      x >= 0 && x <= gameBoardWidth - 1 && y >= 0 && y <= gameBoardHeight - 1
    );
  }
}
