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
  let score = 0;
  let locations = []; // stores the locations where the user has been to
  let canMove; // keeps track of whether it is the users turn to play (true if yes. false if no)
  let moveCount = 0;

  const move = (location) => {
    locations.push(location);
    moveCount++;
  };

  const getMoveCount = () => {
    return moveCount;
  };
  const getScore = () => score;
  const setScore = () => score++;
  const resetLocations = () => {
    locations = [];
  };

  return {
    canMove,
    getScore,
    setScore,
    locations,
    move,
    getMoveCount,
    resetLocations,
  };
};

const game = (function () {
  const gameBoard = createGameBoard();
  let roundCount = 1;
  let player1 = createPlayer();
  let player2 = createPlayer();
  player1.canMove = true;
  player2.canMove = false;

  const getDesiredLocation = (locationIndex) => {
    gameBoard.grid.splice(locationIndex, 1, undefined); // replaces the value in the row with undefined so it cannot be chosen again
    log(gameBoard.grid);
  };

  const playerWonTheRound = (player) => {
    let winLocations = gameBoard.winLocations;

    //iterates over the 2d array containing the winning conditions
    for (let array of winLocations) {
      for (let i = 0; i < array.length; i++) {
        //checks if the player has been into the locations in the array
        if (!player.locations.includes(String(array[i]))) break;
        if (i == array.length - 1) return true; //return true if all locations int the win condition have been visited by the user
      }
    }
    return false;
  };

  const declareRoundWinner = (player) => {
    if (playerWonTheRound(player)) {
      roundCount++;
      player.setScore();
      log("someone won");
      resetGameData();
    }
  };

  const declareGameWinner = (player1, player2) => {
    player1.getScore() > player2.getScore() ? player1 : player2;
  };

  const isADraw = () => {
    if (player1.getMoveCount() + player2.getMoveCount() === 9) return true;
    return false;
  };

  const movePlayer = (player1, player2, location) => {
    if (gameBoard.grid[location] === undefined) return; // stops user from placing marker twice on the same cell
    getDesiredLocation(location); // makes the location unavailable for future plays

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

  const resetGameData = () => {
    player1.resetLocations();
    player2.resetLocations();
    gameBoard.grid = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  };

  return {
    roundCount,
    movePlayer,
    player1,
    player2,
    gameBoard,
    playerWonTheRound,
    declareRoundWinner,
    declareGameWinner,
    isADraw,
    resetGameData,
  };
})();

(function () {
  const startBtn = document.querySelector("#start-btn");
  const cells = document.querySelectorAll(".cell");
  const player1Name = document.querySelector(".one");
  const player2Name = document.querySelector(".two");

  player1Name.style.border = "5px solid white";

  cells.forEach((cell) =>
    cell.addEventListener("click", function () {
      let cellId = cell.id;

      if (game.gameBoard.grid.includes(Number(cellId))) {
        log(game.gameBoard.grid[cellId]);
        if (
          game.player1.canMove === true &&
          game.gameBoard.grid[cellId] !== undefined
        ) {
          game.movePlayer(game.player1, game.player2, cellId);
          cell.textContent = "X";
          cell.style.color = "#044040";
          player2Name.style.border = "5px solid white";
          player1Name.style.border = "none";
          log("player 1 movements: " + game.player1.getMoveCount());

          if (
            game.player1.getMoveCount() > 2 &&
            game.declareRoundWinner(game.player1)
          ) {
            log("1 won the game");
            resetGrid();
            // displayScore(game.player1, game.player2);
          }

          log("player 1 movements: " + game.player1.getMoveCount());
        } else {
          game.movePlayer(game.player1, game.player2, cellId);
          cell.textContent = "O";
          cell.style.color = "#8c1f28";
          player1Name.style.border = "5px solid white";
          player2Name.style.border = "none";

          if (
            game.player2.getMoveCount() > 2 &&
            game.declareRoundWinner(game.player2)
          ) {
            log("2 won the game");
            resetGrid();
            // displayScore(game.player1, game.player2);
          }
        }
      }
      if (game.isADraw()) {
        //show draw board
        resetGrid();
        game.resetGameData();
      }
      if (game.roundCount > 2) {
        let winner = game.declareGameWinner(game.player1, game.player2);
        log(winner);
      }
    })
  );

  startBtn.addEventListener("click", function () {
    const roundCounter = document.querySelector(".round-count");
    const player1Name = document.querySelector(".one");
    const player2Name = document.querySelector(".two");
    const player1InputName = document.querySelector("#player-one-name").value;
    const player2InputName = document.querySelector("#player-two-name").value;
    const startScreen = document.querySelector("#start-screen");
    const gameBoardScreen = document.querySelector("#game-screen");
    const gameOverScreen = document.querySelector("#game-over-screen");

    startScreen.style.display = "none";
    gameBoardScreen.style.display = "grid";
    gameOverScreen.style.display = "none";

    roundCounter.textContent = `Round ${game.roundCount}`;
    if (!player1InputName == "") {
      player1Name.textContent = player1InputName;
    }
    if (!player2InputName == "") {
      player2Name.textContent = player2InputName;
    }
  });

  const displayScore = (player1, player2) => {
    const player1Score = document.querySelector("#player-one-score-value");
    const player2Score = document.querySelector("#player-two-score-value");

    player1Score.textContent = player1.getScore();
    player2Score.textContent = player2.getScore();
  };

  const resetGrid = () => {
    cells.forEach(function (cell) {
      cell.textContent = "";
    });
    log("o");
  };
})();
