import { GameBoard } from "../models/gameBoard.js";

const gameBoard = new GameBoard();

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

test("gameBoard to NOT place Ship out of bounds", () => {
  const testCases = [
    [3, 11],
    [4, -2],
    [15, 4],
    [-3, 6],
  ];

  for (const testCase of testCases) {
    expect(gameBoard.placeShip(testCase, 4, "horizontal")).toBe(false);
  }
});

test("gameBoard to NOT place Ship length out of bounds", () => {
  const testCases = [
    {
      "coords": [7, 3],
      "length": 4,
      "rotation": "horizontal",
    },
    {
      "coords": [7, 9],
      "length": 4,
      "rotation": "vertical",
    },
  ];

  for (const testCase of testCases) {
    expect(
      gameBoard.placeShip(
        testCase["coords"],
        testCase["length"],
        testCase["rotation"],
      ),
    ).toBe(false);
  }
});

test("gameBoard to place Ship at expected coordinates", () => {
  gameBoard.placeShip([3, 3], 4);
  expect(gameBoard.board["3,3"]).toEqual({
    length: 4,
    rotation: "horizontal",
    hits: 0,
    hasSunk: false,
  });
});

test("gameBoard to place Ship at expected coordinates and length", () => {
  gameBoard.placeShip([3, 3], 4);
  expect(gameBoard.board["3,3"]).toEqual({
    length: 4,
    rotation: "horizontal",
    hits: 0,
    hasSunk: false,
  });
  expect(gameBoard.board["4,3"]).toEqual({
    length: 4,
    rotation: "horizontal",
    hits: 0,
    hasSunk: false,
  });
  expect(gameBoard.board["5,3"]).toEqual({
    length: 4,
    rotation: "horizontal",
    hits: 0,
    hasSunk: false,
  });
  expect(gameBoard.board["6,3"]).toEqual({
    length: 4,
    rotation: "horizontal",
    hits: 0,
    hasSunk: false,
  });
  // Not overextend
  expect(gameBoard.board["7,3"]).toBeUndefined();
  // Tests if they're to the same reference
  expect(gameBoard.board["3,3"] === gameBoard.board["4,3"]).toBe(true);
});
