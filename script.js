const log = console.log;

const createGameBoard = function () {
  const x = [0, 1, 2]; // rows
  const y = [0, 1, 2]; //columns

  const winLocations = {
    firstRow: [
      [x[0], y[0]],
      [x[0], y[1]],
      [x[0], y[2]],
    ],
    secondRow: [
      [x[1], y[0]],
      [x[1], y[1]],
      [x[1], y[2]],
    ],
    thirdRow: [
      [x[0], y[0]],
      [x[1], y[1]],
      [x[2], y[2]],
    ],
    firstColumn: [
      [x[0], y[0]],
      [x[1], y[0]],
      [x[2], y[0]],
    ],
    secondColumn: [
      [x[0], y[1]],
      [x[1], y[1]],
      [x[2], y[1]],
    ],
    firstColumn: [
      [x[0], y[2]],
      [x[1], y[2]],
      [x[2], y[2]],
    ],
    leftDiagonal: [
      [x[0], y[0]],
      [x[1], y[1]],
      [x[2], y[2]],
    ],
    rightDiagonal: [
      [x[0], y[2]],
      [x[1], y[1]],
      [x[2], y[0]],
    ],
  };

  const grid = [
    winLocations.firstRow,
    winLocations.secondRow,
    winLocations.thirdRow,
  ];

  return { grid, winLocations };
};

function createPlayer(playerName) {
  const name = playerName;
  let score = 0;
  let locations = []; // stores the locations where the user has been to
  let moveCount = 0; // keeps track of how many times the user has moved

  const declareRoundWinner = () => score++;
  const move = (location) => locations.push(location);
  const getScore = () => score;
  const getName = () => name;
  const setName = (newName) => (name = newName);

  return {
    getName,
    setName,
    getScore,
    moveCount,
    locations,
    declareRoundWinner,
  };
}

const game = (function () {
  let player1 = createPlayer("X");
  let player2 = createPlayer("O");
  let roundCount = 0;
  let totalMovements = 0;
  const gameBoard = createGameBoard();

  const setPlayerName = () => {
    player1.setName(prompt("what is your name?"));
    player2.setName(prompt("what is your name?"));
  };

  const playerWonTheGame = (player) => {
    for (let property in gameBoard.winLocations) {
      let winCondition = gameBoard.winLocations[property];
      log(player.locations);
      if (player.locations.includes(winCondition)) {
        return true;
      }
      return false;
    }
  };

  const checkForTheWinner = (player1, player2) => {
    // checks if a player has won the game. If true, it returns the player. Otherwise, it returns undefined
    if (playerWonTheGame(player1)) return player1;
    if (playerWonTheGame(player2)) return player2;

    return undefined;
  };

  let start = () => {
    roundCount++;
  };

  return {
    player1,
    player2,
    gameBoard,
    setPlayerName,
    start,
    roundCount,
    checkForTheWinner,
  };
})();

game.player1.locations.push(game.gameBoard.winLocations.firstRow);

if (game.checkForTheWinner(game.player1, game.player2)) {
  log("win condition was found");
} else {
  log("something whent wrong");
}
