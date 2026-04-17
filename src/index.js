import "./styles.css";
import { uiController } from "./controllers/uiController.js";
import { gameController } from "./controllers/gameController.js";

uiController.start();
gameController.init();

window.gameController = gameController;
window.uiController = uiController;

function testFunction() {
  // gameController.placeShip(gameController.getShips()[0], [1, 1]);
  // gameController.placeShip(gameController.getShips()[1], [0, 9], "horizontal");
  // gameController.placeShip(gameController.getShips()[2], [6, 7]);
  // gameController.placeShip(gameController.getShips()[3], [9, 3]);
  // gameController.placeShip(gameController.getShips()[4], [5, 4], "horizontal");
  // gameController.confirmPlacement();
  // gameController.placeShip(gameController.getShips()[0], [4, 9], "horizontal");
  // gameController.placeShip(gameController.getShips()[1], [1, 7], "horizontal");
  // gameController.placeShip(gameController.getShips()[2], [0, 0]);
  // gameController.placeShip(gameController.getShips()[3], [7, 1], "horizontal");
  // gameController.placeShip(gameController.getShips()[4], [8, 6]);
  // gameController.confirmPlacement();
  // const player2ships = [
  //   0, 
  //   10, 20, 71, 72, 73, 74, 94, 95, 96, 97, 98, 
  //   78, 68, 17, 18, 19,
  // ];
  // for (let i = 0; i < player2ships.length; i++) {
  //   gameController.receiveAttack(player2ships[i]);
  //   gameController.receiveAttack(i);
  // }
  // gameController.newGame();


  // gameController.placeShip(gameController.getShips()[0], [1, 1]);
  // gameController.placeShip(gameController.getShips()[1], [0, 9], "horizontal");
  // gameController.placeShip(gameController.getShips()[2], [6, 7]);
  // gameController.placeShip(gameController.getShips()[3], [9, 3]);
  // gameController.placeShip(gameController.getShips()[4], [5, 4], "horizontal");
  // gameController.confirmPlacement();
  // gameController.placeShip(gameController.getShips()[0], [4, 9], "horizontal");
  // gameController.placeShip(gameController.getShips()[1], [1, 7], "horizontal");
  // gameController.placeShip(gameController.getShips()[2], [0, 0]);
  // gameController.placeShip(gameController.getShips()[3], [7, 1], "horizontal");
  // gameController.placeShip(gameController.getShips()[4], [8, 6]);
  // gameController.confirmPlacement();
  // const player2ships = [
  //   0, 
  //   10, 20, 71, 72, 73, 74, 94, 95, 96, 97, 98, 
  //   78, 68, 17, 18, 19,
  // ];
  // for (let i = 0; i < player2ships.length; i++) {
  //   gameController.receiveAttack(player2ships[i]);
  //   gameController.receiveAttack(i);
  // }
}
testFunction();
