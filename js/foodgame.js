import { currentWord } from "./words.js";

// Menu

const menuToggle = () => {
  let menu = document.querySelector("#menu");
  menu.classList.toggle("active");
};

const menuOpen = document.querySelector("#menuOpen");
menuOpen.addEventListener("click", menuToggle);

const menuClose = document.querySelector("#menuClose");
menuClose.addEventListener("click", menuToggle);

// Darkmode Toggle

let darkmodeStatus = false;

const darkmodeSwitch = document.querySelector("#darkmodeSwitch");

const darkmodeToggle = (status) => {
  let input = darkmodeSwitch.querySelector("label input");
  if (status) {
    input.checked = true;
    document.body.classList.add("darkmode");
    darkmodeStatus = true;
    window.localStorage.setItem("darkmodeStatus", true);
  } else {
    input.checked = false;
    document.body.classList.remove("darkmode");
    darkmodeStatus = false;
    window.localStorage.setItem("darkmodeStatus", false);
  }
};

darkmodeSwitch.addEventListener("click", () => {
  darkmodeToggle(!darkmodeStatus);
});

// Modal Window

const modalToggle = (target) => {
  target.classList.toggle("active");
};

const modalOpen = document.querySelectorAll(".modal-open");
modalOpen.forEach((e) => {
  e.addEventListener("click", () => {
    modalToggle(e.nextElementSibling);
  });
});

const modalClose = document.querySelectorAll(".modal-close");
modalClose.forEach((e) => {
  e.addEventListener("click", () => {
    modalToggle(e.closest(".modal-window"));
  });
});

//OverlayClose both Modal and Menu

const overlayClose = document.querySelectorAll(".overlay");
overlayClose.forEach((e) => {
  e.addEventListener("click", () => {
    e.parentElement.classList.toggle("active");
  });
});

// Share and Copy Data

var regex = /<br\s*[\/]?>/gi;

const shareDataDisplay = document.querySelector("#shareData");

const shareButton = document.querySelector("#share");
shareButton.addEventListener("click", () => {
  let shareData = {
    text: shareDataDisplay.innerHTML.replace(regex, "\n"),
  };
  navigator.share(shareData);
});

const copyButton = document.querySelector("#copy");
copyButton.addEventListener("click", () => {
  let shareData = {
    text: shareDataDisplay.innerHTML.replace(regex, "\n"),
  };
  navigator.clipboard.writeText(shareData.text);
  copyButton.querySelector("span.tooltiptext").innerHTML = "Copied!";
});

copyButton.addEventListener("mouseout", () => {
  copyButton.querySelector("span.tooltiptext").innerHTML = "Copy to Clipboard";
});

// countDown

const countDown = () => {
  const timer = setInterval(() => {
    const now = new Date();
    let tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    // Find the distance between now and the count down date
    const distance = tomorrow.getTime() - now.getTime();

    // Time calculations hours, minutes and seconds
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.querySelector("#nextwordTimer").innerHTML = `${("0" + hours).slice(
      -2
    )}:${("0" + minutes).slice(-2)}:${("0" + seconds).slice(-2)}`;

    if (distance < 0) {
      clearInterval(timer);
      resetGame();
    }
  });
};

countDown();

// Game Core

let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const keyboard = document.getElementById("keyboard");
const message = document.getElementById("message");
const board = document.querySelector("#board > span");
const statsDisplay = document.querySelector("#stats");
const ticketDisplay = document.querySelector("#ticket");

const displayToggle = (e, block) => {
  e.style.display = block ? "block" : "none";
};

let gameWon = 0;
let gamePlayed = 0;
let ticket = 6;
let gameStatus = "start";
let keyboardStatus;
let currentWordDashed;

const resetGame = () => {
  window.localStorage.removeItem("keyboardStatus");
  window.localStorage.removeItem("boardStatus");
  window.localStorage.removeItem("ticket");
  ticket = 0;
  blankKeyboard();
  blankBoard();
  start();
};

const start = function () {
  showBoard();
  showEyes(ticket);
  showTicket(ticket);
  showFood(ticket);
};

const showTicket = (ticket) => {
  ticketDisplay.innerHTML = `<i class="fa-solid fa-ticket"></i>&nbsp;x&nbsp;${ticket}`;

  if (ticket == 1) {
    ticketDisplay.classList.add("lastcoin");
  }
};

const deductFood = (target) => {
  displayToggle(document.querySelector(`#food${6 - target}`), false);
};

const showBoard = function () {
  board.innerHTML = currentWordDashed.join("");
};

const showEyes = (target) => {
  document.querySelectorAll(".eyes").forEach((e) => displayToggle(e, false));
  displayToggle(document.querySelector(`#eyes${target}`), true);
};

const showFood = (target) => {
  document.querySelectorAll(".food").forEach((e) => displayToggle(e, true));
  let remainingTicket = target;
  while (remainingTicket < 6) {
    deductFood(remainingTicket);
    remainingTicket++;
  }
};

const blankKeyboard = () => {
  letters.split("").forEach((letter) => {
    const html = `<div class="letter unhit" id="letter${letter}">${letter}</div>`;
    keyboard.insertAdjacentHTML("beforeend", html);
  });
};

const blankBoard = () => {
  currentWordDashed = currentWord()
    .todayWord.split("")
    .map((letter) => {
      if (letter === " ") return " ";
      else if (letter === "’") return "’";
      else if (letter === ",") return ",";
      else return "_";
    });
};

const loadLocalStorage = () => {
  darkmodeStatus =
    window.localStorage.getItem("darkmodeStatus") === "true" ? true : false;
  darkmodeToggle(darkmodeStatus);

  ticket = Number(window.localStorage.getItem("ticket")) || 6;

  if (window.localStorage.getItem("keyboardStatus")) {
    keyboard.innerHTML = window.localStorage.getItem("keyboardStatus");
  } else {
    blankKeyboard();
  }

  if (window.localStorage.getItem("boardStatus")) {
    board.innerHTML = window.localStorage.getItem("boardStatus");
    currentWordDashed = window.localStorage.getItem("boardStatus").split("");
  } else {
    blankBoard();
  }

  gameStatus = window.localStorage.getItem("gameStatus") || "start";

  gameWon = Number(window.localStorage.getItem("gameWon")) || 0;

  gamePlayed = Number(window.localStorage.getItem("gamePlayed")) || 0;
};

window.addEventListener("DOMContentLoaded", () => {
  loadLocalStorage();

  start();

  const allLetters = document.querySelectorAll(".letter.unhit");
  allLetters.forEach((e) =>
    e.addEventListener("click", (input) => {
      checkLetter(input.target.textContent);
    })
  );

  document.addEventListener("keyup", (input) => {
    let pattern = /[A-Z]/;
    let inputLetter = input.key.toUpperCase();
    if (pattern.test(inputLetter)) checkLetter(inputLetter);
  });
});

const checkLetter = function (e) {
  let pressedLetter = document.querySelector(`#letter${e}`);
  if (pressedLetter.classList.contains("unhit") && gameStatus !== "finish") {
    if (currentWord().todayWord.toUpperCase().split("").includes(e)) {
      currentWord()
        .todayWord.toUpperCase()
        .split("")
        .forEach((letter, i, arr) => {
          if (letter === e) {
            currentWordDashed[i] = letter;
            showBoard();
          }
        });
      deactivateLetter(true, pressedLetter);
    } else {
      ticket--;
      window.localStorage.setItem("ticket", ticket);
      showEyes(ticket);
      deductFood(ticket);
      showTicket(ticket);

      if (ticket) {
        ticketDisplay.classList.add("shake");
      }
      window.setTimeout(function () {
        ticketDisplay.classList.remove("shake");
      }, 300);

      deactivateLetter(false, pressedLetter);
    }

    window.localStorage.setItem("boardStatus", board.innerHTML);

    if (ticket == 0) {
      finish(false);
    }
    if (currentWord().todayWord.toUpperCase() === currentWordDashed.join("")) {
      finish(true);
    }
  }
};

const deactivateLetter = function (hit, pressedLetter) {
  pressedLetter.className = hit ? "letter hit" : "letter not-hit";
  window.localStorage.setItem("keyboardStatus", keyboard.innerHTML);
};

const finish = function (success) {
  if (success) {
    message.innerHTML = `<h1 class="won">WELL DONE!</h1>`;

    board.classList.add("won");
    keyboard.classList.add("won");
    showEyes("won");
  } else {
    message.innerHTML = `<h1 class="lost">YOU LOST!</h1>
    <div class="answer">The answer is: <br><span class="password">${
      currentWord().todayWord
    }</span></div>`;

    keyboard.classList.add("lost");
    board.classList.add("lost");
  }

  shareDataDisplay.innerHTML = `🍜🍡🍮🍤🍙🍣<br>${"✅".repeat(
    ticket
  )}${"❌".repeat(6 - ticket)}`;
  gameStatus = "finish";

  window.setTimeout(() => {
    statsDisplay.classList.toggle("active");
  }, 1000);
};
