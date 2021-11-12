"use strict";

function circle() {
  const circle = document.createElement("div");
  circle.classList.add("circle", "figure");
  return circle;
}

function cross() {
  const stick = document.createElement("div");
  const innerStick = document.createElement("div");
  const cross = document.createElement("div");
  stick.classList.add("stick", "parent");
  innerStick.classList.add("stick", "child");
  cross.classList.add("cross", "figure");

  stick.append(innerStick);
  cross.append(stick);

  return cross;
}

export { circle, cross };
