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

// const modalOverlayClose = document.querySelectorAll(".modal-window.overlay");
// modalOverlayClose.forEach((e) => {
//   e.addEventListener("click", () => {
//     if (e.classList.contains("active")) modalToggle(e);
//   });
// });

// Game Core

let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const keyboard = document.getElementById("keyboard");
const message = document.getElementById("message");
const timer = document.querySelector("#timer");
const board = document.querySelector("#board > span");
const statsDisplay = document.querySelector("#stats");
const ticketDisplay = document.querySelector("#ticket");

const displayToggle = (e, block) => {
  e.style.display = block ? "block" : "none";
};

// const random = Math.floor(Math.random() * words.length);
// const password = words[random];
// const password = currentWord;
let fail = 0;
let ticket = 6;
let countDown;
let gameStatus = "start";
let keyboardStatus, coinStatus;
const start = function () {
  letters.split("").forEach((letter) => {
    const html = `<div class="letter unhit" id="letter${letter}">${letter}</div>`;
    keyboard.insertAdjacentHTML("beforeend", html);
  });
  showPassword();
  showEyes(ticket);
  showTicket(ticket);
};

window.addEventListener("DOMContentLoaded", () => {
  start();
  const loadLocalStorage = () => {
    darkmodeStatus =
      window.localStorage.getItem("darkmodeStatus") === "true" ? true : false;
    darkmodeToggle(darkmodeStatus);
    // ticket = window.localStorage.getItem("ticket");
    // gameStatus = window.localStorage.getItem("gameStatus");
    // keyboardStatus = window.localStorage.getItem("keyboardStatus");
    // coinStatus = window.localStorage.getItem("coinStatus");
    // buppyStatus = window.localStorage.getItem("buppyStatus");
    // timerStatus = window.localStorage.getItem("timerStatus");
    // boardStatus = window.localStorage.getItem("boardStatus");
    // modalToggle(document.querySelector("#stats"));
  };

  loadLocalStorage();

  const allLetters = document.querySelectorAll(".letter.unhit");
  allLetters.forEach((e) =>
    e.addEventListener("click", (input) => {
      checkLetter(input.target.textContent);
    })
  );

  document.addEventListener("keyup", (input) => {
    checkLetter(input.key.toUpperCase());
  });
});

const currentWordDashed = currentWord.split("").map((letter) => {
  if (letter === " ") return " ";
  else if (letter === "’") return "’";
  else if (letter === ",") return ",";
  else return "_";
});

const showTicket = (ticket) => {
  ticketDisplay.innerHTML = `<i class="fa-solid fa-ticket"></i>&nbsp;x&nbsp;${ticket}`;

  if (ticket == 1) {
    ticketDisplay.classList.add("lastcoin");
  }
};

const deductFood = (target) => {
  displayToggle(document.querySelector(`#food${6 - target}`), false);
};

const showPassword = function () {
  board.innerHTML = currentWordDashed.join("");
};

const showEyes = (target) => {
  document.querySelectorAll(".eyes").forEach((e) => displayToggle(e, false));
  displayToggle(document.querySelector(`#eyes${target}`), true);
};

const checkLetter = function (e) {
  let pressedLetter = document.querySelector(`#letter${e}`);
  if (pressedLetter.classList.contains("unhit") && gameStatus !== "finish") {
    if (currentWord.toUpperCase().split("").includes(e)) {
      currentWord
        .toUpperCase()
        .split("")
        .forEach((letter, i, arr) => {
          if (letter === e) {
            currentWordDashed[i] = letter;
            showPassword();
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
      }, 3000);

      deactivateLetter(false, pressedLetter);
    }
    if (ticket == 0) {
      finish(false);
    }
    if (currentWord.toUpperCase() === currentWordDashed.join("")) {
      finish(true);
    }
  }
};

const deactivateLetter = function (hit, pressedLetter) {
  pressedLetter.className = hit ? "letter hit" : "letter not-hit";
};

const finish = function (success) {
  if (success) {
    message.innerHTML = `<h1 class="won">WELL DONE!</h1><a class='btn'><i class="fa-solid fa-arrow-rotate-right"></i> PLAY AGAIN</a>`;

    board.classList.add("won");
    keyboard.classList.add("won");
    showEyes("won");

    clearInterval(countDown);
  } else {
    message.innerHTML = `<h1 class="lost">YOU LOST!</h1>
    <div class="answer">The answer is: <br><span class="password">${currentWord}</span></div><a class='btn'><i class="fa-solid fa-arrow-rotate-right"></i> TRY AGAIN</a>`;

    keyboard.classList.add("lost");
    board.classList.add("lost");

    clearInterval(countDown);
  }

  shareDataDisplay.innerHTML = `🍜🍡🍮🍤🍙🍣<br>${"✅".repeat(
    ticket
  )}${"❌".repeat(6 - ticket)}`;
  gameStatus = "finish";
  statsDisplay.classList.toggle("active");
  document
    .querySelector("#message a.btn")
    .addEventListener("click", () => location.reload());
};
const timerCount = function () {
  //Change time limit here
  let time = new Date(300000);
  const options = {
    minute: "2-digit",
    second: "2-digit",
  };
  const tick = function () {
    time -= 1000;
    timer.textContent = Intl.DateTimeFormat("en-US", options).format(time);
    if (time == 10000) {
      timer.classList.add("timeout");
    }
    if (time == 0) {
      finish(false);
      clearInterval(countDown);

      // all eyes off but Eyes6 on

      document
        .querySelectorAll(".eyes")
        .forEach((e) => displayToggle(e, false));
      showEyes(0);

      // all food off
      document
        .querySelectorAll("img[src^='img/food']")
        .forEach((e) => displayToggle(e, false));
    }
  };
  tick();
  countDown = setInterval(tick, 1000);
  return countDown;
};
timerCount();

const nextwordCountDown = () => {
  let currentDay = new Date();
  let nextDay = (currentDay.getDate() + 1).setHours(0, 0, 0, 0);
  console.log(nextDay - currentDay);
  const nextwordTimer = document.querySelector("#nextwordTimer");
  nextwordTimer.textContent = (nextDay - currentDay).toTimeString();
};

setInterval(nextwordCountDown, 1000);
