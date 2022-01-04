const help = document.querySelector(".help");
const overlay = document.querySelector("#help");
const openHelpButton = document.querySelector(".helpButton");
const closeHelpButton = document.querySelector(".dismissHelp");

//Todo: Optimize class-based animation and avoid timeout

closeHelpButton.onclick = () => {
  help.classList.add("delete");
  overlay.classList.add("fading");
  setTimeout(() => {
    overlay.classList.add("hidden");
  }, 300);
};

openHelpButton.onclick = () => {
  overlay.classList.remove("fading", "hidden");
  help.classList.remove("delete");
};
