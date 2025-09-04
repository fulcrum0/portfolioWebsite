const mainMenu = document.getElementById("main-menu");
const gameScreen = document.getElementById("game");
const settingsScreen = document.getElementById("settings");
const playBtn = document.getElementById("playButton");
const mmSettings = document.getElementById("mmSettingsButton");
const refresh = document.getElementById("refresh");
const pSettings = document.getElementById("pSettingsButton");
const pMainMenu = document.getElementById("pMainMenuButton");
const sReturn = document.getElementById("sReturn");
const gameContainer = document.getElementById("game-container");
const winScreen = document.getElementById("win-screen");
const winMainMenu = document.getElementById("wsMainMenu");
const result = document.getElementById("result");
const count = document.getElementById("moves");
const scoreInputBtn = document.getElementById("score-name-button");
let lastScreen = null;


// Main menu section buttons navigate
playBtn.onclick = function () {
    gameScreen.classList.remove("slide-left-in");
    mainMenu.classList.add("slide-top-out");
    count.textContent = 0;
    document.getElementById("result").textContent = 0;
    const cards = Array.from(gameContainer.children);
    cards.forEach(card => {
        card.classList.remove("matched");
    });
    setTimeout(() => {
        mainMenu.classList.add("hidden");
        mainMenu.classList.remove("slide-top-out");
        gameScreen.classList.remove("hidden");
        gameScreen.classList.add("slide-bottom-in");
    }, 300);

    setTimeout(() => {
        gameScreen.classList.remove("slide-bottom-in");
    }, 600);

    const shuffledCards = shuffleArray(cards);

    gameContainer.innerHTML = "";
    shuffledCards.forEach(card => {
        card.classList.remove("flipped");
        gameContainer.appendChild(card);
    });
};

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

mmSettings.onclick = function () {
    lastScreen = "mainMenu"
    mainMenu.classList.add("slide-left-out");
    setTimeout(() => {
        mainMenu.classList.add("hidden");  // make main menu hidden 
        mainMenu.classList.remove("slide-left-out"); // removes animation from main menu
        settingsScreen.classList.remove("hidden"); // makes settingsscreen visible
        settingsScreen.classList.add("slide-right-in"); // gives settingsscreen animation
    }, 300);// 300ms delay
    setTimeout(() => {
        settingsScreen.classList.remove("slide-right-in");
    }, 600); //600ms delay
}

//  Game section buttons navigate

pSettings.onclick = function () {
    lastScreen = "gameScreen"
    gameScreen.classList.add("slide-left-out");
    setTimeout(() => {
        gameScreen.classList.add("hidden");
        gameScreen.classList.remove("slide-left-out");
        settingsScreen.classList.remove("hidden");
        settingsScreen.classList.add("slide-right-in");
    }, 300);
    setTimeout(() => {
        settingsScreen.classList.remove("slide-right-in");
    }, 600);
}

pMainMenu.onclick = function () {
    mainMenu.classList.remove("slide-left-in");
    gameScreen.classList.add("slide-bottom-out");
    setTimeout(() => {
        gameScreen.classList.add("hidden");
        gameScreen.classList.remove("slide-bottom-out");
        mainMenu.classList.remove("hidden");
        mainMenu.classList.add("slide-top-in");
    }, 300);
    setTimeout(() => {
        mainMenu.classList.remove("slide-top-in");
    }, 600);
}

refresh.addEventListener("click", () => {
    count.textContent = 0;
    document.getElementById("result").textContent = 0;
    const cards = Array.from(gameContainer.children);
    cards.forEach(card => {
        card.classList.remove("matched");
        card.classList.remove("flipped");
        selectedCard = [];
        card.style.pointerEvents = "auto";
    })

    cards.forEach(card => card.classList.add("shuffle-animation"));

    setTimeout(() => {
        const shuffledCards = shuffleArray(cards);
        gameContainer.innerHTML = "";
        shuffledCards.forEach(card => {
            card.classList.remove("shuffle-animation");
            gameContainer.appendChild(card);
        });
    }, 500);
});

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Settings section buttons navigate

sReturn.onclick = function () {
    if (lastScreen === "mainMenu") {
        settingsScreen.classList.add("slide-right-out");
        setTimeout(() => {
            settingsScreen.classList.add("hidden");
            settingsScreen.classList.remove("slide-right-out");
            mainMenu.classList.remove("hidden");
            mainMenu.classList.add("slide-left-in");
        }, 300);
    }
    else {
        settingsScreen.classList.add("slide-right-out");
        setTimeout(() => {
            settingsScreen.classList.add("hidden");
            settingsScreen.classList.remove("slide-right-out");
            gameScreen.classList.remove("hidden");
            gameScreen.classList.add("slide-left-in");
        }, 300);
    }
}

// Sound settings
const audioElement = document.getElementById("background-music");
const soundControl = document.getElementById("sound");
const soundLabel = document.querySelector("label[for='sound']");

soundControl.addEventListener('input', function () {
    const volume = soundControl.value;
    audioElement.volume = volume / 100;
    soundLabel.textContent = soundControl.value;
});

// win situation

winMainMenu.onclick = function () {
    winScreen.classList.add("hidden");
    mainMenu.classList.remove("hidden");
}

// fullscreen setting
const fullscreen = document.getElementById("fullscreen");

fullscreen.addEventListener('change', () => {
    if (fullscreen.checked) {
        document.documentElement.requestFullscreen();
        document.documentElement.mozRequestFullScreen();
        document.documentElement.webkitRequestFullScreen();
        document.documentElement.msRequestFullScreen();
    }
    else {
        document.exitFullscreen();
        document.mozCancelFullScreen();
        document.webkitExitFullScreen();
        document.msExitFullScreen();
    }
});

// card onclick

const cards = document.querySelectorAll(".card");
let selectedCard = [];

cards.forEach(card => {
    card.addEventListener("click", () => {
        if (!card.classList.contains("flipped") && selectedCard.length < 2) {
            card.classList.toggle("flipped");
            card.classList.remove("shake");
            selectedCard.push(card);
            if (selectedCard.length == 2) {
                matchControl();
                count.textContent++;
                document.getElementById("result").textContent = count.textContent;
            }
        }
    });
});


// control if selected cards matched
function matchControl() {
    const [card1, card2] = selectedCard;
    const img1 = card1.querySelector(".back img").src;
    const img2 = card2.querySelector(".back img").src;
    if (img1 == img2) {
        selectedCard = [];
        card1.classList.add("matched");
        card2.classList.add("matched");
        checkAllMatched();
    }
    else {
        card1.style.pointerEvents = "none";
        card2.style.pointerEvents = "none";
        setTimeout(() => {
            card1.classList.add("wrong-shake");
            card2.classList.add("wrong-shake");
        }, 300);
        setTimeout(() => {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            card1.classList.remove("wrong-shake");
            card2.classList.remove("wrong-shake");
            selectedCard = [];
            card1.style.pointerEvents = "auto";
            card2.style.pointerEvents = "auto";
        }, 950); // delay time if they not matches
    }
}

// win screen
function checkAllMatched() {
    const allMatched = Array.from(cards).every(card => card.classList.contains("matched"));
    if (allMatched) {
        winScreen.classList.add("win-screen");
        winScreen.classList.remove("hidden");
    }
}

// ******
document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});

document.onkeydown = function (e) {
    if (e.keyCode == 123) {
        e.preventDefault();
        return false;
    }
}

// score save area
const scores = JSON.parse(localStorage.getItem("scores")) || [];

// score save function 
scoreInputBtn.addEventListener("click", function () {
    const playerName = document.getElementById("score-name").value.trim();
    const playerScore = parseInt(result.textContent, 10);

    if (!playerName) {
        alert("Please enter your name!");
        return;
    }

    const newScore = { name: playerName, score: playerScore, timestamp: Date.now() };
    scores.push(newScore);

    scores.sort((a, b) => {
        if (a.score === b.score) {
            return b.timestamp - a.timestamp;
        }
        return a.score - b.score;
    });

    if (scores.length > 5) {
        scores.pop();
    }

    const scoreContainer = document.querySelector(".score-container");
    scoreContainer.innerHTML = "";

    scores.forEach((entry) => {
        const newDiv = document.createElement("div");
        newDiv.classList.add("score-list");

        newDiv.innerHTML = `
            <label for="score" class="score-name">${entry.name}</label>
            <p class="score">${entry.score}</p>
        `;

        scoreContainer.appendChild(newDiv);
    });

    document.getElementById("score-name").value = "";
});

window.addEventListener("load", function () {
    const scoreContainer = document.querySelector(".score-container");

    const savedScores = JSON.parse(localStorage.getItem("scores")) || [];

    savedScores.forEach((entry) => {
        const newDiv = document.createElement("div");
        newDiv.classList.add("score-list");

        newDiv.innerHTML = `
            <label for="score" class="score-name">${entry.name}</label>
            <p class="score">${entry.score}</p>
        `;

        scoreContainer.appendChild(newDiv);
    });
});