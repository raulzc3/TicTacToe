const help = document.querySelector("#help");
const openHelpButton = document.querySelector(".helpButton");
const closeHelpButton = document.querySelector(".dismissHelp");

//Todo: Add fade in and fade out animations

closeHelpButton.onclick = () => {
  help.classList.add("hidden");
};

openHelpButton.onclick = () => {
  help.classList.remove("hidden");
};
