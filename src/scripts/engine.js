const state = {
    views: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"), 
        score: document.querySelector("#score") 
    },

    values: {
        timerId: null,
        hitPosition: null,
        result: null,
        currentTime: 60
    },

    actions: {
        countDown: setInterval(countDown, 1000),
        timerId: setInterval(randomSquare, 1000)
    }
}

function countDown() {
    state.values.currentTime--;
    state.views.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime < 0) {
        clearInterval(state.actions.countDown);
        clearInterval(state.actions.timerId);
        alert("The game has finished, pts: " + state.values.result);
    };
}

function playAudio(audioName) {
    let audio = new Audio(`./src/mp3/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
}

function randomSquare() {
    state.views.squares.forEach((square) => {
        square.classList.remove("enemy");
    })

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.views.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;

}

function AddListenerHitBox() {
    state.views.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                let currentScore = state.values.result++;
                state.views.score.textContent = currentScore;
                state.values.hitPosition = null;
                playAudio("hitAudio");
            }
        })
    })
}

function main() {
    AddListenerHitBox();
}

main();