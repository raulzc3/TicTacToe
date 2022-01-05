const modal = document.querySelector("#langSelector .modal");
const overlay = document.querySelector("#langSelector");
const langButton = document.querySelector(".langButton");
const options = document.querySelectorAll(".langOption");
const storage = window.localStorage;
let customLang =
  storage.getItem("custom_lang") || navigator.language.substring(0, 2);

//Show language modal
langButton.onclick = () => {
  overlay.classList.remove("fading", "hidden");
  modal.classList.remove("delete");
};

const closeModal = (callBack) => {
  modal.classList.add("delete");
  overlay.classList.add("fading");
  setTimeout(() => {
    //Without this the animation doesn't work
    if (callBack) {
      callBack();
    }
    overlay.classList.add("hidden");
  }, 300);
};

for (let option of options) {
  const selection = option.dataset.lang;
  //Select or unselect button based on user language selection
  option.classList.toggle(
    "selected",
    selection === customLang || selection === customLang
  );

  option.onclick = (e) => {
    if (!option.classList.contains("selected")) {
      storage.setItem("custom_lang", selection);
      closeModal(() => {
        location.reload();
      });
    }
  };
}

overlay.onclick = (e) => {
  if (e.target === e.currentTarget) {
    closeModal();
  }
};
