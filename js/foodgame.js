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

  input.checked = status;
  darkmodeStatus = status;
  window.localStorage.setItem("darkmodeStatus", status);
  status
    ? document.body.classList.add("darkmode")
    : document.body.classList.remove("darkmode");
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
    modalToggle(e.parentElement);
    // e.parentElement.classList.toggle("active");
  });
});

// Share and Copy Data

var regex = /<br\s*[\/]?>/gi;

const shareDataDisplay = document.querySelector("#shareData");

const shareData = () => {
  return {
    text: `Buppy Word Game \n#${
      currentWord().gameId
    } ${ticket}/6 \n\n${shareDataDisplay.innerHTML.replace(regex, "\n")}`,
  };
};

const shareButton = document.querySelector("#share");
shareButton.addEventListener("click", () => {
  navigator.share(shareData());
});

const copyButton = document.querySelector("#copy");
copyButton.addEventListener("click", () => {
  navigator.clipboard.writeText(shareData().text);
  copyButton.querySelector("span.tooltiptext").innerHTML = "Copied!";
});

copyButton.addEventListener("mouseout", () => {
  copyButton.querySelector("span.tooltiptext").innerHTML = "Copy to clipboard";
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

    document.querySelector("#nextwordTimer").innerHTML = `<h1>Next word</h1>${(
      "0" + hours
    ).slice(-2)}:${("0" + minutes).slice(-2)}:${("0" + seconds).slice(-2)}`;

    if (distance > 0 && distance < 1000) {
      window.setTimeout(() => {
        newGame();
        statsDisplay.classList.remove("active");
      }, 800);
    }
  }, 1000);
};

countDown();

// Game Core

let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const keyboard = document.getElementById("keyboard");
const board = document.querySelector("#board > span");
const statsDisplay = document.querySelector("#stats");
const ticketDisplay = document.querySelector("#ticket");
const statsData = document.querySelector("#statsData");

const displayToggle = (e, block) => {
  e.style.display = block ? "block" : "none";
};

let gameWon = 0;
let gamePlayed = 0;
let foodCollected = 0;
let ticket;
let gameStatus;
let currentWordDashed;

const newGame = function () {
  window.localStorage.removeItem("boardStatus");
  window.localStorage.removeItem("keyboardStatus");
  window.localStorage.removeItem("ticket");
  window.localStorage.removeItem("gameStatus");
  window.localStorage.removeItem("shareData");

  blankBoard();
  blankKeyboard();

  ticket = 6;

  showEyes(ticket);
  showTicket(ticket);
  showFood(ticket);

  gameStatus = "start";

  shareDataDisplay.innerHTML = "N/A";
};

const oldGame = () => {
  gameStatus = window.localStorage.getItem("gameStatus");
  board.innerHTML = window.localStorage.getItem("boardStatus");
  keyboard.innerHTML = window.localStorage.getItem("keyboardStatus");

  // Add eventlistener of keyboard after loading from local storage
  keyboardClickEventListener();

  ticket = Number(window.localStorage.getItem("ticket"));

  if (gameStatus !== "finish") {
    currentWordDashed = window.localStorage.getItem("boardStatus").split("");
    showEyes(ticket);
  } else {
    window.setTimeout(() => {
      board.classList.add("animate__animated", "animate__bounce");
    }, 300);
    window.setTimeout(() => {
      statsDisplay.classList.toggle("active");
    }, 1500);

    if (ticket > 0) {
      showEyes("won");
      board.classList.add("won");
    } else {
      showEyes(ticket);
      board.classList.add("lost");
    }
  }

  // if (ticket == 0) board.classList.add("lost");
  showTicket(ticket);
  showFood(ticket);

  // shareDataDisplay.innerHTML = window.localStorage.getItem("shareData");
};

const showTicket = (ticket) => {
  ticketDisplay.classList.remove("lastTicket");
  ticketDisplay.innerHTML = `<i class="fa-solid fa-ticket"></i>&nbsp;x&nbsp;${ticket}`;

  if (ticket <= 1 && !ticketDisplay.classList.contains("lastTicket")) {
    ticketDisplay.classList.add("lastTicket");
  }
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
  keyboard.innerHTML = "";
  letters.split("").forEach((letter) => {
    let html = `<div class="letter unhit" id="letter${letter}">${letter}</div>`;
    keyboard.innerHTML += html;
  });
  keyboardClickEventListener();
};

const keyboardClickEventListener = () => {
  const allLetters = keyboard.querySelectorAll(".letter.unhit");
  allLetters.forEach((e) =>
    e.addEventListener("click", (input) => {
      checkLetter(input.target.textContent);
    })
  );
};

const blankBoard = () => {
  board.innerHTML = "";
  board.className = "";
  currentWordDashed = currentWord()
    .todayWord.split("")
    .map((letter) => {
      if (letter === " ") return " ";
      else if (letter === "’") return "’";
      else if (letter === ",") return ",";
      else return "_";
    });
  showBoard();
};

const deductFood = (target) => {
  displayToggle(document.querySelector(`#food${6 - target}`), false);
};

const showStatsData = () => {
  statsData.innerHTML = `
  <div class="stats-container">
    <div class="value"> ${gamePlayed}</div>
    <div class="label">Played</div>
  </div>
  <div class="stats-container">
    <div class="value">${
      gamePlayed ? Math.round((gameWon / gamePlayed) * 100) : 0
    }</div>
    <div class="label">Win&nbsp;%</div>
  </div>
  <div class="stats-container">
    <div class="value">${foodCollected}</div>
    <div class="label">Food<br>Collected</div>
  </div>
  <div class="stats-container">
    <div class="value">${
      gamePlayed ? Math.round((foodCollected / (gamePlayed * 6)) * 100) : 0
    }</div>
    <div class="label">Collected&nbsp;%</div>
  </div>
  `;
};

window.addEventListener("DOMContentLoaded", () => {
  // vh hix

  // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
  let vh = window.innerHeight * 0.01;
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  // load darkmode
  darkmodeStatus =
    window.localStorage.getItem("darkmodeStatus") === "true" ? true : false;
  darkmodeToggle(darkmodeStatus);

  if (
    !window.localStorage.getItem("gameId") ||
    Number(window.localStorage.getItem("gameId")) !== currentWord().gameId
  ) {
    newGame();
  } else {
    oldGame();
  }

  gameWon = Number(window.localStorage.getItem("gameWon")) || 0;

  gamePlayed = Number(window.localStorage.getItem("gamePlayed")) || 0;

  foodCollected = Number(window.localStorage.getItem("foodCollected")) || 0;

  shareDataDisplay.innerHTML =
    window.localStorage.getItem("shareData") || "N/A";

  showStatsData();

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

    window.localStorage.setItem("gameId", currentWord().gameId);

    window.localStorage.setItem("ticket", ticket);

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
    board.classList.add("won");

    showEyes("won");

    gameWon++;
    window.localStorage.setItem("gameWon", gameWon);
  } else {
    board.innerHTML = currentWord().todayWord;
    board.classList.add("lost");
  }

  window.setTimeout(() => {
    board.classList.add("animate__animated", "animate__bounce");
  }, 300);

  window.localStorage.setItem("boardStatus", board.innerHTML);
  window.localStorage.setItem("keyboardStatus", keyboard.innerHTML);

  gamePlayed++;
  window.localStorage.setItem("gamePlayed", gamePlayed);

  foodCollected += ticket;
  window.localStorage.setItem("foodCollected", foodCollected);

  shareDataDisplay.innerHTML = `🍜🍡🍮🍤🍙🍣<br>${"✅".repeat(
    ticket
  )}${"❌".repeat(6 - ticket)}`;
  window.localStorage.setItem("shareData", shareDataDisplay.innerHTML);

  gameStatus = "finish";
  window.localStorage.setItem("gameStatus", gameStatus);

  showStatsData();

  window.setTimeout(() => {
    statsDisplay.classList.toggle("active");
  }, 2000);
};

// vh fix eventlistener
window.addEventListener("resize", () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
});
