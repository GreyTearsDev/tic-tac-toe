const log = console.log;

const createGameBoard = (function () {
  let x0 = [0, 1, 2];
  let x1 = [0, 1, 2];
  let x2 = [0, 1, 2];

  const grid = [x0, x1, x2];

  winningLocations = [
    [x0[0], x0[1], x0[2]],
    [x1[0], x1[1], x1[2]],
    [x2[0], x2[1], x2[2]],
    [x0[0], x1[0], x2[0]],
    [x0[1], x1[1], x2[1]],
    [x0[2], x1[2], x2[2]],
    [x0[0], x1[1], x2[2]],
    [x0[2], x1[1], x2[0]],
  ];

  return { grid, winningLocations };
})();

function createPlayer() {
  const name = player;
  let score = 0;
  let moves = []; // stores the position of the moves the user makes
  let moveCount = 0; // keeps track of how many times the user has moved

  const declareRoundWinner = () => score++;
  const move = (location) => moves.push(location);
  const getScore = () => score;
  const getName = () => name;
  const setName = (newName) => (name = newName);

  return { getName, setName, getScore, move, moveCount, declareRoundWinner };
}

const game = (function () {
  let player1 = createPlayer();
  let player2 = createPlayer();
  let roundCount = 0;

  const setPlayerName = () => {
    player1.setName(prompt("what is your name?"));
    player2.setName(prompt("what is your name?"));
  };

  let start = () => {};

  return {
    player1,
    player2,
    gameBoard,
    setPlayerName,
    start,
    roundCount,
  };
})();
