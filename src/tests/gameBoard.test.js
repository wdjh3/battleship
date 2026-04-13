import { GameBoard } from "../models/gameBoard.js";

const gameBoard = new GameBoard();

test('gameBoard to not accept invalid coordinates', () => {
  const testCases = [
    [3, 11],
    [4, -2],
    [15, 4],
    [-3, 6],
  ]

  for (const testCase of testCases) {
    expect(gameBoard.receiveAttack(testCase)).toBe(false);
  }
})