const help = document.querySelector(".help");
const overlay = document.querySelector("#help");
const openHelpButton = document.querySelector(".helpButton");
const closeHelpButton = document.querySelector(".dismissHelp");
const hideCompetitiveCheck = document.querySelector("#hideCompetitiveCheck");
const storage = window.localStorage;
const hideCompetitive =
  storage.getItem("hideCompetitive") === "true" ? true : false;

//Show help if storage is false or has no data in it
if (!hideCompetitive) overlay.classList.remove("hidden");

//Set checkbox value according to user decision
hideCompetitiveCheck.checked = hideCompetitive;

closeHelpButton.onclick = () => {
  //Save user decision in storage
  storage.setItem("hideCompetitive", hideCompetitiveCheck.checked);
  //Close help modal
  help.classList.add("delete");
  overlay.classList.add("fading");
  setTimeout(() => {
    //Todo: Optimize class-based animation and avoid timeout
    overlay.classList.add("hidden");
  }, 300);
};

//Show help modal
openHelpButton.onclick = () => {
  overlay.classList.remove("fading", "hidden");
  help.classList.remove("delete");
};
