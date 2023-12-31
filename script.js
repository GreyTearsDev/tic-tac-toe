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
  ]; // the winning conditions

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
  const resetMoveCount = () => {
    moveCount = 0;
  };
  const getScore = () => score;
  const setScore = () => score++;
  const resetLocations = () => {
    locations.length = 0;
  };
  const resetScore = () => {
    score = 0;
  };

  return {
    canMove,
    getScore,
    setScore,
    locations,
    move,
    getMoveCount,
    resetLocations,
    resetMoveCount,
    resetScore,
  };
};

const game = (function () {
  const gameBoard = createGameBoard();
  let roundCount = 1;
  let player1 = createPlayer();
  let player2 = createPlayer();
  player1.canMove = true;
  player2.canMove = false;

  const increaseRoundCount = () => {
    roundCount++;
  };

  const getRoundCount = () => {
    return roundCount;
  };

  const resetRoundCount = () => {
    roundCount = 1;
  };

  const getDesiredLocation = (locationIndex) => {
    gameBoard.grid.splice(locationIndex, 1, undefined); // replaces the value in the row with undefined so it cannot be chosen again
  };

  const playerWonTheRound = (player) => {
    let winLocations = gameBoard.winLocations;

    // //iterates over the 2d array containing the winning conditions
    if (player === player1) {
      for (let i = 0; i < winLocations.length; i++) {
        for (let j = 0; j < player1.locations.length; j++) {
          if (!player1.locations.includes(String(winLocations[i][j]))) break;
          if (j === winLocations[i].length - 1) {
            player1.setScore();
            return true; //return true if all locations in the win condition have been collected by the player
          }
        }
      }
      return false;
    } else {
      for (let i = 0; i < winLocations.length; i++) {
        for (let j = 0; j < player2.locations.length; j++) {
          if (!player2.locations.includes(String(winLocations[i][j]))) break;
          if (j === winLocations[i].length - 1) {
            player2.setScore();
            return true; //return true if all locations in the win condition have been collected by the player
          }
        }
      }
      return false;
    }
  };

  const declareRoundWinner = (player) => {
    if (playerWonTheRound(player)) {
      return true;
    }
  };

  const declareGameWinner = (player1, player2) => {
    if (player1.getScore() === player2.getScore()) return false;
    if (player1.getScore() > player2.getScore()) return player1;
    return player2;
  };

  const resetCanMove = () => {
    player1.canMove = true;
    player2.canMove = false;
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
    player1.resetMoveCount();
    player2.resetMoveCount();
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
    increaseRoundCount,
    resetRoundCount,
    getRoundCount,
    resetCanMove,
  };
})();

(function () {
  const startBtn = document.querySelector("#start-btn");
  const cells = document.querySelectorAll(".cell");
  const startScreen = document.querySelector("#start-screen");
  const gameBoardScreen = document.querySelector("#game-screen");
  const gameOverScreen = document.querySelector("#game-over-screen");
  const player1Score = document.querySelector("#player-one-score-value");
  const player2Score = document.querySelector("#player-two-score-value");
  const roundCounter = document.querySelector(".round-count");
  roundCounter.textContent = `Round ${game.roundCount}`;

  const resetGrid = () => {
    game.resetGameData();
    cells.forEach(function (cell) {
      cell.textContent = "";
    });
  };

  const displayMarks = (mark, markColor, cell) => {
    cell.textContent = mark;
    cell.style.color = markColor;
    cell.style.backgroundColor = "#fff";
  };

  const fullReset = () => {
    game.resetGameData();
    game.player1.resetScore();
    game.player2.resetScore();
    game.resetRoundCount();
    game.resetCanMove();
    player1Score.textContent = game.player1.getScore();
    player2Score.textContent = game.player2.getScore();
    roundCounter.textContent = `Round ${game.getRoundCount()}`;
    resetGrid();
  };

  const endTheGame = (winner) => {
    const finalResult = document.querySelector("#final-result");
    const player1InputName = document.querySelector("#player-one-name").value;
    const player2InputName = document.querySelector("#player-two-name").value;
    const restartBtn = document.querySelector("#restart");

    startScreen.style.display = "none";
    gameBoardScreen.style.display = "none";
    gameOverScreen.style.display = "flex";

    if (winner === false) {
      finalResult.textContent = "It is a Draw!";
    } else if (winner === game.player1) {
      if (player1InputName === "") {
        finalResult.textContent = `Player X won with ${winner.getScore()} points!`;
      } else {
        finalResult.textContent = `${player1InputName} won with ${winner.getScore()} points!`;
      }
    } else {
      if (player2InputName === "") {
        finalResult.textContent = `Player O won with ${winner.getScore()}!`;
      } else {
        finalResult.textContent = `${player2InputName} won with ${winner.getScore()} points!`;
      }
    }

    restartBtn.addEventListener("click", function () {
      fullReset();
      player1InputName.value = player1InputName;
      player2InputName.value = player2InputName;

      startScreen.style.display = "flex";
      gameBoardScreen.style.display = "none";
      gameOverScreen.style.display = "none";
    });
  };

  startBtn.addEventListener("click", function () {
    const player1Name = document.querySelector(".one");
    const player2Name = document.querySelector(".two");
    const player1InputName = document.querySelector("#player-one-name").value;
    const player2InputName = document.querySelector("#player-two-name").value;

    startScreen.style.display = "none";
    gameBoardScreen.style.display = "grid";
    gameOverScreen.style.display = "none";

    if (!player1InputName == "") {
      player1Name.textContent = player1InputName;
    }
    if (!player2InputName == "") {
      player2Name.textContent = player2InputName;
    }
  });

  cells.forEach((cell) => {
    cell.addEventListener("mouseenter", function () {
      cell.style.transition = "300ms";
      if (game.player1.canMove) {
        cell.style.backgroundColor = "rgba(4, 64, 64, 0.95)";
      } else {
        cell.style.backgroundColor = "rgba(140, 31, 40, 0.95)";
      }
    });

    cell.addEventListener("mouseleave", function () {
      cell.style.backgroundColor = "#fff";
      cell.style.opacity = "1";
    });

    cell.addEventListener("click", function () {
      let cellId = cell.id;

      // check if the cell has already been marked
      if (!game.gameBoard.grid.includes(Number(cellId))) return;

      if (game.player1.canMove) {
        game.movePlayer(game.player1, game.player2, cellId);
        displayMarks("X", "#044040", cell);

        if (
          game.player1.getMoveCount() > 2 &&
          game.declareRoundWinner(game.player1)
        ) {
          resetGrid();
          player1Score.textContent = game.player1.getScore();
          game.increaseRoundCount();
          roundCounter.textContent = `Round ${game.getRoundCount()}`;
        }
      } else {
        game.movePlayer(game.player1, game.player2, cellId);
        displayMarks("O", "#8c1f28", cell);

        if (
          game.player2.getMoveCount() > 2 &&
          game.declareRoundWinner(game.player2)
        ) {
          resetGrid();
          player2Score.textContent = game.player2.getScore();
          game.increaseRoundCount();
          roundCounter.textContent = `Round ${game.getRoundCount()}`;
        }
      }

      if (game.isADraw()) {
        resetGrid();
        game.increaseRoundCount();
        roundCounter.textContent = `Round ${game.getRoundCount()}`;
      }

      if (game.getRoundCount() > 3) {
        let winner = game.declareGameWinner(game.player1, game.player2);
        endTheGame(winner);
      }
    });
  });
})();
