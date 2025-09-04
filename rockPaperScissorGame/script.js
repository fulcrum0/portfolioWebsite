const choiceBtns = document.querySelectorAll(".choice-btn");

const playerChoiceText = document.querySelector(".player-choice-text");
const cpuChoiceText = document.querySelector(".cpu-choice-text");

const gameTitle = document.querySelector(".game-title")

const scoreWonText = document.querySelector(".score-won-text");
const scoreDrawText = document.querySelector(".score-draw-text");
const scoreLostText = document.querySelector(".score-lost-text");

let playerResultValue = "";
let cpuResultValue = "";

const choiceEmoji = {
    rock: "✊",
    paper: "✋",
    scissors: "✌️"
}

choiceBtns.forEach((choiceBtn) => {
    choiceBtn.addEventListener("click", () => {
        choiceBtns.forEach(btn => {
            btn.style.pointerEvents = "none";
        })

        gameTitle.textContent = "Let's Play!"

        playerChoiceText.textContent = "✊";
        cpuChoiceText.textContent = "✊";

        playerResultValue = choiceBtn.value;
        cpuResultValue = getCpuResultValue();

        playerChoiceText.classList.add("player-choice-text-anim");
        cpuChoiceText.classList.add("cpu-choice-text-anim");

        setTimeout(() => {
            playerChoiceText.textContent = choiceEmoji[playerResultValue];
            cpuChoiceText.textContent = choiceEmoji[cpuResultValue];

            playerChoiceText.classList.remove("player-choice-text-anim");
            cpuChoiceText.classList.remove("cpu-choice-text-anim");

            showResultGame();

            choiceBtns.forEach(btn => {
                btn.style.pointerEvents = "visible";
            })
        }, 2000)

    })
})

function getCpuResultValue() {
    const cpuOptionsChoices = ["rock", "paper", "scissors"];
    const cpuRandomChoice = cpuOptionsChoices[Math.floor(Math.random() * cpuOptionsChoices.length)];
    return cpuRandomChoice;
}

function showResultGame() {
    if (playerResultValue == cpuResultValue) {
        gameTitle.textContent = "Draw!";
        scoreDrawText.textContent++;
    }
    else if (playerResultValue == "rock" && cpuResultValue == "scissors"
        ||
        playerResultValue == "paper" && cpuResultValue == "rock"
        ||
        playerResultValue == "scissors" && cpuResultValue == "paper") {
        gameTitle.textContent = "You won!"
        scoreWonText.textContent++;
    }
    else {
        gameTitle.textContent = "You lost!"
        scoreLostText.textContent++;
    }
}