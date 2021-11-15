"use strict";
import { cross, circle } from "./figures.js";

//Global variables
let turn = 0;
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
    if (square.innerHTML === "") {
      if (turn % 2 === 0) {
        square.append(cross());
        crosses++;
      } else {
        square.append(circle());
        circles++;
      }
      turn++;
    }
  }
}

function clear(event) {
  if (turn % 2 === 0) {
    if (event.target.classList.contains("stick")) {
      if (event.target.classList.contains("parent")) {
        event.target.parentNode.parentNode.removeChild(event.target.parentNode);
      } else {
        event.target.parentNode.parentNode.parentNode.removeChild(
          event.target.parentNode.parentNode
        );
      }
      crosses--;
    }
  } else {
    if (event.target.classList.contains("circle")) {
      event.target.parentNode.removeChild(event.target);
      circles--;
    }
  }
}

function play(e) {
  if (turn !== false) {
    const player = turn % 2 === 0 ? "cross" : "circle";

    if (turn < 6 || circles < 3 || crosses < 3) {
      write(e);
      if (turn >= 5) {
        const squares = document.querySelectorAll(".board__square");
        const status = [];
        for (let square of squares) {
          if (
            square.innerHTML &&
            square.children[0].classList.contains(player)
          ) {
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
    } else {
      clear(e);
    }
  }
}
