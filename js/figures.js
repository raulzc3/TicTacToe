"use strict";

function circle(classList) {
  const circle = document.createElement("div");
  circle.classList.add("circle", classList || "figure");
  return circle;
}

function cross(classList) {
  const stick = document.createElement("div");
  const innerStick = document.createElement("div");
  const cross = document.createElement("div");
  stick.classList.add("stick", "parent");
  innerStick.classList.add("stick", "child");
  cross.classList.add("cross", classList || "figure");

  stick.append(innerStick);
  cross.append(stick);

  return cross;
}

export { circle, cross };
