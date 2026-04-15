import { GameBoard } from "./gameBoard.js";
export { Player };

class Player {
  constructor(name) {
    this.name = name;
    this.gameBoard = new GameBoard();
  }
}

class Computer extends Player {

}