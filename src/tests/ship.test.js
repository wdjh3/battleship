import { Ship } from "../models/ship.js";

const testShip = new Ship(4);

test("reports isSunk() correctly", () => {
  expect(testShip.isSunk()).toBe(false);
  for (let i = 0; i < 4; i++) {
    testShip.hit();
  }
  expect(testShip.isSunk()).toBe(true);
});
