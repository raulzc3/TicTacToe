"use strict";
import { cross, circle } from "./figures.js";

//Global variables
const tiles = document.querySelectorAll(".tile");
let turn = 0;
let prevTile = null;
let crosses = 0;
let circles = 0;
let winner = false;

const winningCombinations = [
  "1,1,1,0,0,0,0,0,0",
  "0,0,0,1,1,1,0,0,0",
  "0,0,0,0,0,0,1,1,1",
  "1,0,0,1,0,0,1,0,0",
  "0,1,0,0,1,0,0,1,0",
  "0,0,1,0,0,1,0,0,1",
  "1,0,0,0,1,0,0,0,1",
  "0,0,1,0,1,0,1,0,0",
];

//Adding listener to the tiles
for (let tile of tiles) {
  tile.onclick = (e) => {
    play(e);
  };
}
//Rematch button listener
document.querySelector(".rematch").onclick = (e) => {
  const figures = document.querySelectorAll(".figure");
  for (let figure of figures) {
    figure.classList.add("delete");
  }

  setTimeout(() => {
    for (let figure of figures) {
      figure.parentElement.removeChild(figure);
    }
  }, 400);
  winner = false;
  turn = 0;
  circles = 0;
  crosses = 0;
  togglePlayer("cross");
};

document.querySelector(".player").appendChild(cross("example"));

function togglePlayer(player) {
  const playerTile = document.querySelector(".player");
  if (player) {
    playerTile.children[0].classList.add("delete");
    setTimeout(() => {
      playerTile.removeChild(playerTile.children[0]);
      if (player === "cross") {
        playerTile.appendChild(cross("example"));
      } else if (player === "circle") {
        playerTile.appendChild(circle("example"));
      }
    }, 200);
  }
}

function write(event) {
  if (event.target === event.currentTarget) {
    const tile = event.target;
    if (tile !== prevTile && tile.innerHTML === "") {
      if (turn % 2 === 0) {
        tile.append(cross());
        crosses++;
        togglePlayer("circle");
      } else {
        tile.append(circle());
        circles++;
        togglePlayer("cross");
      }
      if (prevTile) {
        prevTile = null;
        clear();
      }
      turn++;
    }
  }
}

function clear() {
  const fadingFigure = document.querySelector(".fade");
  fadingFigure.parentNode.removeChild(fadingFigure);
}

function fade(event) {
  const target = event.target;

  if (turn % 2 === 0) {
    const figure = target.closest(".cross");
    if (figure) {
      figure.classList.add("fade");
      prevTile = figure.parentNode;
      crosses--;
    }
  } else {
    if (target.classList.contains("circle")) {
      target.classList.add("fade");
      prevTile = target.parentNode;
      circles--;
    }
  }
}

function checkWinner(player) {
  const status = [];
  for (let tile of tiles) {
    if (tile.innerHTML && tile.children[0].classList.contains(player)) {
      status.push(1);
    } else {
      status.push(0);
    }
  }
  if (winningCombinations.indexOf(status.join()) !== -1) {
    turn = false;
    winner = true;
    togglePlayer(player);
    const winnerTiles = document.querySelectorAll(`.${player}`);
    for (let tile of winnerTiles) {
      if (tile.classList.contains("figure")) {
        tile.classList.add("winner");
      }
    }
  }
}

function play(e) {
  if (!winner) {
    const player = turn % 2 === 0 ? "cross" : "circle";

    if (circles < 3 || crosses < 3) {
      write(e);
      if (turn >= 5) {
        checkWinner(player);
      }
    } else {
      fade(e);
    }
  }
}
