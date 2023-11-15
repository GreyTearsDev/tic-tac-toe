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

  const winLocations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const grid = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  return { grid, winLocations };
};

function createPlayer(playerName) {
  const name = playerName;
  let score = 0;
  let locations = []; // stores the locations where the user has been to
  let moveCount = 0; // keeps track of how many times the user has moved
  let canMove;

  const declareRoundWinner = () => score++;
  const move = (location) => locations.push(location);
  const getScore = () => score;
  const getName = () => name;
  const setName = (newName) => (name = newName);

  return {
    canMove,
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
    return gameBoard.grid[rowIndex].splice(locationIndex, 1, undefined); // replaces the value in the row with undefined so it cannot be chosen again
  };

  const playerWonTheRound = (player) => {
    for (let property in gameBoard.winLocations) {
      let winCondition = gameBoard.winLocations[property];
      if (player.locations.includes(winCondition)) {
        player.score++;
        return true;
      }
      return false;
    }
  };

  const movePlayer = (player1, player2, location) => {
    if (player1.canMove) {
      player1.locations.push(location);
      player1.canMove = false;
      player2.canMove = true;
    } else {
      player2.locations.push(location);
      player2.canMove = false;
      player1.canMove = true;
    }
  };

  const displayGameWinner = (player) => log(`${player} won the game`);
  const displayRoundWinner = (player) => log(`${player} won the round`);

  // put it in a while loop to be checked every time someone plays from the moment the totalMoveCount reaches 5
  const checkForTheWinner = (player1, player2) => {
    // checks if a player has won the game. If true, it returns the player. Otherwise, it returns undefined
    if (playerWonTheRound(player1)) return player1;
    if (playerWonTheRound(player2)) return player2;
  };

  let play = () => {
    let grid = gameBoard.grid;
    let totalMoveCount = 0;
    let player1 = createPlayer("X");
    let player2 = createPlayer("O");
    let round = 1;
    let gameWinner;
    let roundWinner;

    player1.canMove = true;
    player2.canMove = false;

    movePlayer(player1, player2, grid[0][0]);
    log(
      `Player1 locations: ${player1.locations}. Player2 locations: ${player2.locations}`
    );

    movePlayer(player1, player2, grid[1][0]);
    log(
      `Player1 locations: ${player1.locations}. Player2 locations: ${player2.locations}`
    );
    movePlayer(player1, player2, grid[0][1]);
    log(
      `Player1 locations: ${player1.locations}. Player2 locations: ${player2.locations}`
    );
    movePlayer(player1, player2, grid[1][0]);
    log(
      `Player1 locations: ${player1.locations}. Player2 locations: ${player2.locations}`
    );
    movePlayer(player1, player2, grid[0][2]);
    log(
      `Player1 locations: ${player1.locations}. Player2 locations: ${player2.locations}`
    );

    log(grid);

    log(checkForTheWinner(player1, player2));

    // log(`round: ${round}`);
    // while (totalMoveCount !== 5) {
    //   //let the players make
    //   let player1Move = prompt("X enter a location");
    //   movePlayer(player1, player1Move);
    //   totalMoveCount++;

    //   if (totalMoveCount == 5) break;

    //   let player2Move = prompt("O enter a location");
    //   movePlayer(player2, player2Move);
    //   totalMoveCount++;
    // }

    // while (checkForTheWinner(player1, player2) === undefined) {
    //   let player1Move = prompt("X enter a location");
    //   movePlayer(player1, player1Move);
    //   if (playerWonTheRound(player1)) {
    //     roundWinner = player1;
    //     playerWonTheRound(player1);
    //     break;
    //   }

    //   let player2Move = prompt("O enter a location");
    //   movePlayer(player2, player2Move);
    //   if (playerWonTheRound(player2)) {
    //     roundWinner = player2;
    //     playerWonTheRound(player2);
    //     break;
    //   }
    // }

    // player1.score > player2.score
    //   ? (gameWinner = player1)
    //   : (gameWinner = player2);

    // if (winner !== undefined) {
    //   displayGameWinner(gameWinner);
    // }
  };

  return {
    gameBoard,
    setPlayerName,
    play,
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
