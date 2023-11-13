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

function createPlayer(playerName) {
  const name = playerName;
  let score = 0;
  let moves = []; // stores the position of the moves the user makes

  const declareRoundWinner = () => score++;
  const move = (location) => moves.push(location);
  const getScore = () => score;
  const getName = () => name;

  return { getName, getScore, move, declareRoundWinner };
}
