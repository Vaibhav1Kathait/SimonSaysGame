
let gameseq = [];
let userseq = [];
let started = false;
let level = 0;
let highestScore = 0; 
let currentScore = 0; 
let btns = ["yellow", "red", "purple", "green"];
let h2 = document.querySelector("h2");
let highestScoreDisplay = document.querySelector("#highest-score");
let currentScoreDisplay = document.querySelector("#current-score");

document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("game started");
        started = true;
        levelup();
    }
});

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function levelup() {
    userseq = [];
    level++;
    currentScore = level; // Update current score with the current level
    currentScoreDisplay.innerText = `Current Score: ${currentScore}`; // Update current score display
    h2.innerText = `Level ${level}`;
    let randIdx = Math.floor(Math.random() * 3);
    let randomColor = btns[randIdx];
    let randbtn = document.querySelector(`.${randomColor}`);
    gameseq.push(randomColor);
    console.log(randIdx);
    console.log(randbtn);
    console.log(randomColor);
    btnFlash(randbtn);
}

function checkans(idx) {
    if (userseq[idx] === gameseq[idx]) {
        if (userseq.length == gameseq.length) {
            setTimeout(levelup, 1000);
        }

    } else {
        h2.innerHTML = `Game Over! Your score was <b>${currentScore}</b> <br> Press any key to start, `;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);

        // Update highest score if necessary
        if (currentScore > highestScore) {
            highestScore = currentScore;
            highestScoreDisplay.innerText = `Highest Score: ${highestScore}`;
        }

        reset();
    }
}

function btnPress() {
    console.log(this);
    let btn = this;
    userFlash(this);

    usercolor = btn.getAttribute("id");
    userseq.push(usercolor);
    checkans(userseq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
    currentScore = 0; // Reset current score
    currentScoreDisplay.innerText = `Current Score: 0`; // Reset current score display
}
