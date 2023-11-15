const log = console.log;

const createGameBoard = function () {
  const firstRow = [
    [0, 0],
    [0, 1],
    [0, 2],
  ];
  const secondRow = [
    [1, 0],
    [1, 1],
    [1, 2],
  ];
  const thirdRow = [
    [0, 0],
    [1, 1],
    [2, 2],
  ];

  const winLocations = {
    firstRow: [
      [0, 0],
      [0, 1],
      [0, 2],
    ],
    secondRow: [
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    thirdRow: [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    firstColumn: [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
    secondColumn: [
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    firstColumn: [
      [0, 2],
      [1, 2],
      [2, 2],
    ],
    leftDiagonal: [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    rightDiagonal: [
      [0, 2],
      [1, 1],
      [2, 0],
    ],
  };

  const grid = [firstRow, secondRow, thirdRow];

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
  const gameBoard = createGameBoard();

  const setPlayerName = () => {
    player1.setName(prompt("what is your name?"));
    player2.setName(prompt("what is your name?"));
  };

  const getDesiredLocation = (rowIndex, locationIndex) => {
    return gameBoard.grid[rowIndex].splice(locationIndex, 1);
  };
  const movePlayer = (player, location) => {
    player.locations.push(location);
  };

  const playerWonTheGame = (player) => {
    for (let property in gameBoard.winLocations) {
      let winCondition = gameBoard.winLocations[property];
      log(player.locations);
      if (player.locations.includes(winCondition)) {
        player.score++;
        return true;
      }
      return false;
    }
  };

  const displayWinner = (player) => log(`${player} won the game`);

  // put it in a while loop to be checked every time someone plays from the moment the totalMoveCount reaches 5
  const checkForTheWinner = (player1, player2) => {
    // checks if a player has won the game. If true, it returns the player. Otherwise, it returns undefined
    if (playerWonTheGame(player1)) return player1;
    if (playerWonTheGame(player2)) return player2;
  };

  let play = () => {
    let totalMoveCount = 0;
    let grid = gameBoard.grid;
    let player1 = createPlayer("X");
    let player2 = createPlayer("O");
    let roundCount = 1;
    let gameWinner;

    log(`round: ${roundCount++}`);
    for (let i = 5; totalMoveCount >= i; i--) {
      let player1Move = prompt("X enter a location");
      movePlayer(player1, player1Move);
      let player2Move = prompt("O enter a location");
      movePlayer(player2, player2Move);
    }

    while (checkForTheWinner(player1, player2) === undefined) {
      let player1Move = prompt("X enter a location");
      movePlayer(player1, player1Move);
      if (playerWonTheGame(player1)) {
        displayWinner(player1);
        break;
      }

      let player2Move = prompt("O enter a location");
      movePlayer(player2, player2Move);
      if (playerWonTheGame(player2)) {
        displayWinner(player2);
        break;
      }
    }

    if (roundCount == 2) {
      player1.score > player2.score
        ? (gameWinner = player1)
        : (gameWinner = player2);
    }
    if (roundCount == 3) {
      player1.score > player2.score
        ? (gameWinner = player1)
        : (gameWinner = player2);
    }
  };

  return {
    player1,
    player2,
    gameBoard,
    setPlayerName,
    play,
    roundCount,
    checkForTheWinner,
    movePlayer,
    getDesiredLocation,
  };
})();

game.play();

// let location = game.getDesiredLocation(0, 0);
// game.movePlayer(game.player1, location);
// location = game.getDesiredLocation(1, 2);
// game.movePlayer(game.player1, location);
// log(game.player1.locations);

//to do in ui: give each grid cell a tag representing its row and location within the row index
