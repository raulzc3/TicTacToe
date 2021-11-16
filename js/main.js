"use strict";
import { cross, circle } from "./figures.js";

//Global variables
let turn = 0;
let prevTile = null;
let clearEvent = null;
let crosses = 0;
let circles = 0;
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

//Adding listener to the squares
const squares = document.querySelectorAll(".board__square");
for (let square of squares) {
  square.onclick = (e) => {
    play(e);
  };
}
//Rematch button listener
document.querySelector(".rematch").onclick = (e) => {
  for (let square of squares) {
    if (square.innerHTML !== "") {
      square.innerHTML = "";
    }
    turn = 0;
    circles = 0;
    crosses = 0;
  }
};

function write(event) {
  if (event.target === event.currentTarget) {
    const square = event.target;
    if (square !== prevTile && square.innerHTML === "") {
      if (turn % 2 === 0) {
        square.append(cross());
        crosses++;
      } else {
        square.append(circle());
        circles++;
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
  if (turn % 2 === 0) {
    const figure = event.target.closest(".cross");
    if (figure) {
      figure.classList.add("fade");
      prevTile = figure.parentNode;
      crosses--;
    }
  } else {
    if (event.target.classList.contains("circle")) {
      event.target.classList.add("fade");
      prevTile = event.target.parentNode;
      circles--;
    }
  }
}

function checkWinner(player) {
  const squares = document.querySelectorAll(".board__square");
  const status = [];
  for (let square of squares) {
    if (square.innerHTML && square.children[0].classList.contains(player)) {
      status.push(1);
    } else {
      status.push(0);
    }
  }
  if (winningCombinations.indexOf(status.join()) !== -1) {
    turn = false;
    const winnerTiles = document.querySelectorAll(`.${player}`);
    for (let tile of winnerTiles) {
      tile.classList.add("winner");
    }
  }
}

function play(e) {
  if (turn !== false) {
    const player = turn % 2 === 0 ? "cross" : "circle";
    if (circles < 3 || crosses < 3) {
      write(e);
      if (turn >= 5) {
        checkWinner(player);
      }
    } else {
      fade(e, player);
    }
  }
}
