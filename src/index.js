import "./styles.css";
import { uiController } from "./controllers/uiController.js";
import { gameController } from "./controllers/gameController.js";

uiController.start();
gameController.init();

window.gameController = gameController; 
window.uiController = uiController; 

function testFunction() {
  gameController.placeShip(gameController.getShips()[0], [1,1]);
  gameController.placeShip(gameController.getShips()[1], [0,9], "horizontal");
  gameController.placeShip(gameController.getShips()[2], [6,7]);
  gameController.placeShip(gameController.getShips()[3], [9,3]);
  gameController.placeShip(gameController.getShips()[4], [5,4], "horizontal");
  gameController.confirmPlacement();
  gameController.placeShip(gameController.getShips()[0], [4,9], "horizontal");
  gameController.placeShip(gameController.getShips()[1], [1,7], "horizontal");
  gameController.placeShip(gameController.getShips()[2], [0,0]);
  gameController.placeShip(gameController.getShips()[3], [7,1], "horizontal");
  gameController.placeShip(gameController.getShips()[4], [8,6]);
}
testFunction();