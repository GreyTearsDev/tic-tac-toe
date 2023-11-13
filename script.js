const log = console.log;

function createGameBoard() {
  const createGrid = function () {
    return [
      [0, 1, 2],
      [0, 1, 2],
      [0, 1, 2],
    ];
  };
  return { createGrid };
}
