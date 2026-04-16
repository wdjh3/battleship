export { uiController };

const gameBoardNodeList = document.querySelectorAll(".gameboard");

const uiController = (() => {
  function start() {
    addCellsToGrid();
    addGameBoardListener();
  }

  return { start };
})();

function addCellsToGrid() {
  for (const gameBoardNode of gameBoardNodeList) {
    for (let i = 0; i < 100; i++) {
      const square = document.createElement("div");
      square.classList.add("grid-cell");
      square.dataset.x = (i % 10);
      square.dataset.y = (Math.floor(i / 10));

      gameBoardNode.appendChild(square);
    }
  }
}

function addGameBoardListener() {
  for (const gameBoardNode of gameBoardNodeList) {
    gameBoardNode.addEventListener('click', (e) => {
      console.log(e.target);
    })
  }
}