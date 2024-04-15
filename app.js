let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector("#reset-button");
let newGameButton = document.querySelector("#newgame-button");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let line1 = document.querySelector("#cross-line1");
let line2 = document.querySelector("#cross-line2");
let line3 = document.querySelector("#cross-line3");
let line4 = document.querySelector("#cross-line4");
let line5 = document.querySelector("#cross-line5");
let line6 = document.querySelector("#cross-line6");
let line7 = document.querySelector("#cross-line7");
let line8 = document.querySelector("#cross-line8");

let turnO = true;
// playBackgroundSound();

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  playStartSound();
  turnO = true;
  enableBoxes();
  msg.innerText = "Turn of 'O'";
  hideLines();
};

//addng event listeners for all boxes

let count = 0;

boxes.forEach((box) => {
  box.addEventListener("click", (event) => {
    playClickSound();
    count++;
    if (turnO) {
      msg.innerText = "Turn of 'X'";
      box.innerText = "O";
      turnO = false;
    } else {
      msg.innerText = "Turn of 'O'";
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    checkWinner();
  });
});

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is '${winner}'`;
  msgContainer.classList.remove("hide");
  //we got winner so disable all the buttons
  disableBoxes();
};
const gameDraw = () => {
  playTieSound();
  msg.innerText = "Oops! Game is draw";
  msgContainer.classList.remove("hide");
};

const hideLines = () => {
  line1.classList.add("hide");
  line2.classList.add("hide");
  line3.classList.add("hide");
  line4.classList.add("hide");
  line5.classList.add("hide");
  line6.classList.add("hide");
  line7.classList.add("hide");
  line8.classList.add("hide");
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        console.log("winner", pos1Val);

        if (pattern[0] === 0 && pattern[2] === 2) {
          line1.classList.remove("hide");
        } else if (pattern[0] === 3 && pattern[2] === 5) {
          line3.classList.remove("hide");
        } else if (pattern[0] === 6 && pattern[2] === 8) {
          line2.classList.remove("hide");
        } else if (pattern[0] === 0 && pattern[2] === 6) {
          line4.classList.remove("hide");
        } else if (pattern[0] === 1 && pattern[2] === 7) {
          line5.classList.remove("hide");
        } else if (pattern[0] === 2 && pattern[2] === 8) {
          line6.classList.remove("hide");
        } else if (pattern[0] === 0 && pattern[2] === 8) {
          line8.classList.remove("hide");
        } else if (pattern[0] === 2 && pattern[2] === 6) {
          line7.classList.remove("hide");
        }

        showWinner(pos1Val);
        playWinSound();
        count = 0;
      }
      if (count == 9) {
        console.log("in draw");
        gameDraw();
        count = 0;
      }
    }
  }
};

const clickSound = document.getElementById('clickSound');
const markSound = document.getElementById('startSound');
const winSound = document.getElementById('winSound');
const tieSound = document.getElementById('tieSound');
const backgroundSound = document.getElementById('backgroundSound');

function playClickSound() {
  clickSound.currentTime = 0; // Reset playback position (optional)
  clickSound.play();
}

function playStartSound() {
  markSound.currentTime = 0;
  markSound.play();
}

function playWinSound() {
  winSound.currentTime = 0;
  winSound.play();
}

function playTieSound() {
  tieSound.currentTime = 0;
  tieSound.play();
}

function playBackgroundSound() {
  backgroundSound.currentTime = 0;
  backgroundSound.play();
}


newGameButton.addEventListener("click", resetGame);