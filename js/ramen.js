let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const keyboard = document.getElementById("keyboard");
const message = document.getElementById("message");
const passwordBoard = [
  "Aeroplane",
  "Dinosaur",
  "Fire Engine",
  "Tank",
  "Zoo",
  "Truck",
  "Rocket",
  "Igloo",
  "Book",
  "Queen",
  "Tomato",
  "Chips",
  "Food",
  "Plate",
  "Pigeon",
  "Snake",
  "Bird",
  "Pig",
  "Oven",
  "Milk",
  "Orange",
  "Purple",
  "Rabbit",
  "Moon",
  "Sun",
  "Father",
  "Mother",
  "Door",
  "Window",
  "Bread",
  "Shoes",
  "Mouth",
  "Mouse",
  "King",
  "Flower",
  "Planet",
  "Arrow",
  "Money",
  "Summer",
  "Winter",
  "Spring",
];
const passwordDiv = document.querySelector("#board");
const imgDiv = document.querySelector("#buppyRamen");
const coins = document.querySelector("#coin-remain");
const random = Math.floor(Math.random() * passwordBoard.length);
const password = passwordBoard[random];
let fail = 0;
let countDown;
const start = function () {
  letters.split("").forEach((letter) => {
    const html = `<div class="letter">${letter}</div>`;
    keyboard.insertAdjacentHTML("beforeend", html);
  });
  showPassword();
  showHangman(fail);
};
window.onload = start;
const passwordDashed = password.split("").map((letter) => {
  if (letter === " ") return " ";
  else if (letter === "’") return "’";
  else if (letter === ",") return ",";
  else return "_";
});
const showPassword = function () {
  passwordDiv.innerHTML = passwordDashed.join("");
};
const showHangman = function (nr) {
  imgDiv.innerHTML = `<img src="img/${nr}.png" alt="" />`;
  if (nr) {
    imgDiv.classList.add("shake");
  }
  window.setTimeout(function () {
    imgDiv.classList.remove("shake");
  }, 300);
  // const stopshake = function () {};
};

const checkForLetter = function (e) {
  if (e.target.classList.contains("letter")) {
    if (password.toUpperCase().split("").includes(e.target.textContent)) {
      //   yes.play();
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
      //   no.play();
      fail++;
      showHangman(fail);
      coins.innerHTML = 6 - fail;
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
    imgDiv.classList.add("won");
    clearInterval(countDown);
  } else {
    message.innerHTML = `<h1 class="lost">YOU LOST!</h1>
    <div class="answer">The answer is: <br><span class="password">${password}</span></div><a class='btn'><i class="fa-solid fa-arrow-rotate-right"></i> TRY AGAIN</a>`;
    passwordDiv.classList.add("lost");
    clearInterval(countDown);
  }
  document
    .querySelector("a.btn")
    .addEventListener("click", () => location.reload());
};
const timer = function () {
  const timer = document.querySelector("#timer");
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
      showHangman(6);
    }
  };
  tick();
  countDown = setInterval(tick, 1000);
  return countDown;
};
timer();
