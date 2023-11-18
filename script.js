const log = console.log;

const createGameBoard = function () {
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

let createPlayer = function () {
  let name;
  let score = 0;
  let locations = []; // stores the locations where the user has been to
  let canMove; // keeps track of whether it is the users turn to play (true if yes. false if no)

  const move = (location) => locations.push(location);
  const getScore = () => score;
  const getName = () => name;
  const setName = (newName) => (name = newName);

  return {
    canMove,
    getName,
    setName,
    getScore,
    locations,
    declareRoundWinner,
    move,
  };
};

const game = (function () {
  const gameBoard = createGameBoard();
  let roundCount = 1;

  const setPlayersName = () => {
    player1.setName = document.querySelector("#x").textContent;
    player2.setName = document.querySelector("#o").textContent;
  };

  const getDesiredLocation = (locationIndex) => {
    return gameBoard.grid.splice(locationIndex, 1, undefined); // replaces the value in the row with undefined so it cannot be chosen again
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
      player1.move(location);
      player1.canMove = false;
      player2.canMove = true;
    } else {
      player2.move(location);
      player2.canMove = false;
      player1.canMove = true;
    }
  };

  const resetGameData = (player1, player2) => {
    player1.score = 0;
    player1.locations = [];
    player2.score = 0;
    player2.locations = [];
    gameBoard.grid = [0, 1, 2, 3, 4, 5, 6, 7, 8];
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
    let player1 = createPlayer("X");
    let player2 = createPlayer("O");
    let gameWinner;
    let roundWinner;

    player1.canMove = true;
    player2.canMove = false;

    movePlayer(player1, player2, grid[0]);
  };

  return {
    play,
    roundCount,
  };
})();

(function () {
  const startBtn = document.querySelector("#start-btn");

  startBtn.addEventListener("click", function () {
    const roundCounter = document.querySelector(".round-count");
    const player1Name = document.querySelector(".one");
    const player2Name = document.querySelector(".two");
    const startScreen = document.querySelector("#start-screen");
    const gameBoardScreen = document.querySelector("#game-screen");
    const gameOverScreen = document.querySelector("#game-over-screen");

    startScreen.style.display = "none";
    gameBoardScreen.style.display = "grid";
    gameOverScreen.style.display = "none";

    roundCounter.textContent = `Round ${game.roundCount}`;
    player1Name.textContent = document.querySelector("#player-one-name").value;
    player2Name.textContent = document.querySelector("#player-two-name").value;
  });
})();

// let location = game.getDesiredLocation(0, 0);
// game.movePlayer(game.player1, location);
// location = game.getDesiredLocation(1, 2);
// game.movePlayer(game.player1, location);
// log(game.player1.locations);

//to do in ui: give each grid cell a tag representing its row and location within the row index
