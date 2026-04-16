import "./styles.css";
import { uiController } from "./controllers/uiController.js";
import { gameController } from "./controllers/gameController.js";

uiController.start();

window.gameController = gameController; 
window.uiController = uiController; 