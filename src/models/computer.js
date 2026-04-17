import { Player } from "./player.js";
export { Computer };

class Computer extends Player {
  constructor(name) {
    super(name);
    // this.placeShip = placeShipCallback;
    // this.confirmPlacement = confirmPlacementCallback;
    // this.sendAttack = receiveAttackCallback;
  }

  placeShips() {
    
  }

  makeMove(gameState) {}
}
