const translateFields = document.querySelectorAll(".translate");
const storage = window.localStorage;
const userLang =
  window.localStorage.getItem("custom_lang") ||
  navigator.language.substring(0, 2);

console.log(userLang);

const availableLangs = ["es", "gl"];
if (
  document.documentElement.lang !== userLang &&
  availableLangs.includes(userLang)
) {
  document.documentElement.lang = userLang;
}

for (let field of translateFields) {
  const index = field.dataset.i18n;

  translate(field, index, userLang);
}

function translate(field, index, language) {
  const translations = {
    es: {
      lang_select: "Idioma",
      competitive_title: "Modo Competitivo",
      competitive_description:
        "En esta versión de Tic-Tac-Toe cada jugador dispone de 3 fichas.\n\n Cuando ambos jugadores hayan colocado sus fichas sobre el tablero, deberán moverlas de una posición a otra hasta que aparezca un ganador",
      help_check: "No mostrar al abrir el juego.",
      common_ok: "Aceptar",
      player: "Jugador",
      restart: "Reiniciar",
    },
    gl: {
      lang_select: "Idioma",
      competitive_title: "Modo Competitivo",
      competitive_description:
        "Nesta versión do tres en raia cada xogador dispón de 3 fichas.\n\n Cando os dous xogadores teñan cadansúas fichas situadas no taboleiro, deberán movelas dunha posición a outra ata que apareza un gañador",
      help_check: "Non amosar ao abrir o xogo.",
      common_ok: "Aceptar",
      player: "Xogador",
      restart: "Reiniciar",
    },
  };

  if (translations[language] && translations[language][index]) {
    field.innerText = translations[language][index];
  }
}
