import { Ship } from "../models/ship.js";
import { GameBoard } from "../models/gameBoard.js";

const testShip1 = new Ship(4);
const testShip2 = new Ship(3);
const gameBoard = new GameBoard();

function resetGameBoard() {
  gameBoard.board = {};
  gameBoard.attacks = {};
}

afterEach(() => {
  console.log(JSON.stringify(gameBoard));
  resetGameBoard();
})

test("gameBoard to NOT place Ship out of bounds", () => {
  const testCases = [
    [3, 11],
    [4, -2],
    [15, 4],
    [-3, 6],
  ];

  for (const testCase of testCases) {
    expect(gameBoard.placeShip(testShip1, testCase, "horizontal")).toBe(false);
  }
});

test("gameBoard to NOT place Ship length out of bounds", () => {
  const testCases = [
    {
      ship: testShip1,
      coords: [7, 3],
      rotation: "horizontal",
    },
    {
      ship: testShip1,
      coords: [7, 9],
      rotation: "vertical",
    },
  ];

  for (const testCase of testCases) {
    expect(
      gameBoard.placeShip(
        testCase["ship"],
        testCase["coords"],
        testCase["rotation"],
      ),
    ).toBe(false);
  }
});

test("gameBoard to place Ship at expected coordinate", () => {
  gameBoard.placeShip(testShip1, [3, 3]);
  expect(gameBoard.board["3,3"]).toEqual(new Ship(4));
});

test("gameBoard to place Ship at expected coordinates and length", () => {
  gameBoard.placeShip(testShip1, [3, 3]);
  expect(gameBoard.board["3,3"]).toEqual(new Ship(4));
  expect(gameBoard.board["4,3"]).toEqual(new Ship(4));
  expect(gameBoard.board["5,3"]).toEqual(new Ship(4));
  expect(gameBoard.board["6,3"]).toEqual(new Ship(4));
  // Not overextend
  expect(gameBoard.board["7,3"]).toBeUndefined();
  // Tests if they're to the same reference
  expect(gameBoard.board["3,3"] === gameBoard.board["4,3"]).toBe(true);
});

test("gameBoard to place Ship vertically at expected coordinates and length", () => {
  gameBoard.placeShip(testShip1, [3, 4], "vertical");
  expect(gameBoard.board["3,4"]).toEqual(new Ship(4));
  expect(gameBoard.board["3,5"]).toEqual(new Ship(4));
  expect(gameBoard.board["3,6"]).toEqual(new Ship(4));
  expect(gameBoard.board["3,7"]).toEqual(new Ship(4));
  // Not overextend
  expect(gameBoard.board["3,8"]).toBeUndefined();
  // Tests if they're to the same reference
  expect(gameBoard.board["3,4"] === gameBoard.board["3,5"]).toBe(true);
})

test("NOT place ship if collides with another ship", () => {
  // [4/5/6/7/8, 5]
  gameBoard.placeShip(testShip1, [4, 5]);
  // [6, 4/5/6], collision on [6, 5]
  expect(gameBoard.placeShip(testShip1, [6, 4], "vertical")).toBe(false);
})

test("removeShip to remove Ship", () => {
  gameBoard.placeShip(testShip1, [3, 4], "vertical");
  gameBoard.removeShip([3, 4]);
  expect(gameBoard.board).toEqual({});
})

test("removeShip to remove Ship", () => {
  gameBoard.placeShip(testShip1, [3, 4], "vertical");
  gameBoard.removeShip(testShip1);
  expect(gameBoard.board).toEqual({});
})

test("gameBoard's receiveAttack() to not accept invalid coordinates", () => {
  const testCases = [
    [3, 11],
    [4, -2],
    [15, 4],
    [-3, 6],
  ];

  for (const testCase of testCases) {
    expect(gameBoard.receiveAttack(testCase)).toBe(false);
  }
});

test("receiveAttack() increases Ship's hit count", () => {
  gameBoard.placeShip(testShip1, [3, 3]);
  gameBoard.receiveAttack([3, 3]);
  expect(gameBoard.board["3,3"]).toEqual({length: 4, hits: 1, hasSunk: false});
  gameBoard.receiveAttack([4, 3]);
  expect(gameBoard.board["4,3"]).toEqual({length: 4, hits: 2, hasSunk: false});
})

test("receiveAttack() can't attack twice in the same coordinate", () => {
  gameBoard.receiveAttack([1, 1]);
  expect(gameBoard.receiveAttack([1, 1])).toBe(false);
})

test("areAllShipsSunk() returns correctly", () => {
  gameBoard.placeShip(testShip2, [3, 4]);
  expect(gameBoard.areAllShipsSunk()).toBe(false);
  gameBoard.receiveAttack([3, 4]);
  gameBoard.receiveAttack([4, 4]);
  gameBoard.receiveAttack([5, 4]);
  expect(gameBoard.areAllShipsSunk()).toBe(true);
})