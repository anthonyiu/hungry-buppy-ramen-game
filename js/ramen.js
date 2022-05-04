import { words } from "../js/words.js";

let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const keyboard = document.getElementById("keyboard");
const message = document.getElementById("message");
const timer = document.querySelector("#timer");
const passwordDiv = document.querySelector("#board");

const coins = document.querySelector("#coins");
const random = Math.floor(Math.random() * words.length);
const password = words[random];
let fail = 0;
let countDown;
const start = function () {
  letters.split("").forEach((letter) => {
    const html = `<div class="letter">${letter}</div>`;
    keyboard.insertAdjacentHTML("beforeend", html);
  });
  showPassword();
  showEyes(fail);
  showCoins(fail);
};
window.onload = start;
const passwordDashed = password.split("").map((letter) => {
  if (letter === " ") return " ";
  else if (letter === "’") return "’";
  else if (letter === ",") return ",";
  else return "_";
});

const showCoins = (e) => {
  coins.innerHTML = `C x ${6 - e}`;

  if (6 - e == 1) {
    coins.classList.add("lastcoin");
  }
};

const deductFood = (e) => {
  document.querySelector(`#food${e}`).style.display = "none";
};
const showPassword = function () {
  passwordDiv.innerHTML = passwordDashed.join("");
};
const showEyes = function (e) {
  if (e > 0) {
    document.querySelector(`#eyes${e - 1}`).style.display = "none";
  }
  if (e == "won") {
    document.querySelector(`#eyes${fail - 1}`).style.display = "none";
  }
  document.querySelector(`#eyes${e}`).style.display = "block";
};

const checkForLetter = function (e) {
  if (e.target.classList.contains("letter")) {
    if (password.toUpperCase().split("").includes(e.target.textContent)) {
      password
        .toUpperCase()
        .split("")
        .forEach((letter, i, arr) => {
          if (letter === e.target.textContent) {
            passwordDashed[i] = letter;
            showPassword();
          }
        });
      deactivateLetter(true, e.target);
    } else {
      fail++;
      showEyes(fail);
      deductFood(fail);
      showCoins(fail);

      if (fail) {
        coins.classList.add("shake");
      }
      window.setTimeout(function () {
        coins.classList.remove("shake");
      }, 300);

      deactivateLetter(false, e.target);
    }
    if (fail == 6) {
      finish(false);
    }
    if (password.toUpperCase() === passwordDashed.join("")) {
      finish(true);
    }
  }
};
keyboard.addEventListener("click", checkForLetter);
const deactivateLetter = function (hit, letter, audio) {
  letter.className = hit ? "letter hit" : "letter not-hit";
};
const finish = function (success) {
  if (success) {
    message.innerHTML = `<h1 class="won">WELL DONE!</h1><a class='btn'><i class="fa-solid fa-arrow-rotate-right"></i> PLAY AGAIN</a>`;

    passwordDiv.classList.add("won");
    keyboard.classList.add("won");
    showEyes("won");

    clearInterval(countDown);
  } else {
    message.innerHTML = `<h1 class="lost">YOU LOST!</h1>
    <div class="answer">The answer is: <br><span class="password">${password}</span></div><a class='btn'><i class="fa-solid fa-arrow-rotate-right"></i> TRY AGAIN</a>`;

    keyboard.classList.add("lost");
    passwordDiv.classList.add("lost");

    clearInterval(countDown);
  }
  document
    .querySelector("a.btn")
    .addEventListener("click", () => location.reload());
};
const timerCount = function () {
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

      // all eyes off but 6 on, all food off
      showEyes(6);
    }
  };
  tick();
  countDown = setInterval(tick, 1000);
  return countDown;
};
timerCount();
