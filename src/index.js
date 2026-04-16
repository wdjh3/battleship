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
}
testFunction();