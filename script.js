const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.querySelectorAll(".play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessageRevealWord = document.getElementById("reveal-word");
const finalMessageRevealWord2 = document.getElementById("reveal-word2");

const win = document.querySelector(".popup-win");
const lose = document.querySelector(".popup-lose");
const ghosts = document.querySelector(".ghosts");
const input = document.querySelector(".mobileinput");
const hint = document.getElementById("hint");

const words = [
  "apple",
  "banana",
  "orange",
  "grape",
  "watermelon",
  "strawberry",
  "pear",
  "coconut",
  "cherry",
  "mango",
];

let selectWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

let count = 0;
let falseLetter = 0;
let trueLetter = 0;

function movingGhost() {
  ghosts.style.transform = `translateX(${
    (falseLetter - trueLetter + count) * (300 / selectWord.length)
  }px)`;
}

function displayWord() {
  wordEl.innerHTML = `
  ${selectWord
    .split("")
    .map(
      (letter) => `
      <span class="letter">
      ${correctLetters.includes(letter) ? letter : ""}
      </span>`
    )
    .join("")}`;

  const innerWord = wordEl.innerText.replace(/\n/g, "");

  if (innerWord === selectWord) {
    popup.style.display = "flex";
    finalMessageRevealWord.innerText = `...the name was: ${selectWord}`;
    win.classList.add("show");
  }
}

function displayLose() {
  finalMessageRevealWord2.innerText = `...the name was: ${selectWord}`;
  popup.style.display = "flex";
  lose.classList.add("show");
}

function updateWrongLettersEL() {
  wrongLettersEl.innerHTML = `
  ${wrongLetters.length > 0 ? "<p>Wrong</p> " : ""}
  ${wrongLetters.map((letter) => `<span> ${letter}</span>`)}
  `;

  if (wrongLetters.length === 5) {
    displayLose();
  }
}

function showNotification() {
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

window.addEventListener("keydown", (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    if (selectWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);

        trueLetter++;

        displayWord();
        movingGhost();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);

        falseLetter++;

        updateWrongLettersEL();
        movingGhost();
      } else {
        showNotification();
      }
    }
  }
});

hint.addEventListener("click", () => {
  count++;

  movingGhost();

  console.log(selectWord.length);

  if (selectWord.length <= 5) {
    if (count <= 2) {
      const hintLetter = selectWord.split("");

      const leftLetter = hintLetter.filter(
        (letter) => !wordEl.innerText.includes(letter)
      );

      correctLetters.push(leftLetter[0]);

      displayWord();
    } else {
      displayLose();
    }
  } else if (selectWord.length > 5) {
    if (count <= 3) {
      const hintLetter = selectWord.split("");

      const leftLetter = hintLetter.filter(
        (letter) => !wordEl.innerText.includes(letter)
      );

      correctLetters.push(leftLetter[0]);

      displayWord();
    } else {
      displayLose();
    }
  }
});

playAgainBtn.forEach((btn) =>
  btn.addEventListener("click", () => {
    correctLetters.splice(0);
    wrongLetters.splice(0);
    count = 0;
    falseLetter = 0;
    trueLetter = 0;

    selectWord = words[Math.floor(Math.random() * words.length)];

    displayWord();
    updateWrongLettersEL();

    input.value = "";
    ghosts.style.transform = "translateX(0)";
    popup.style.display = "none";
    win.classList.remove("show");
    lose.classList.remove("show");
  })
);

displayWord();
