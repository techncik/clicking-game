/* Scripts for buttongame.html */

let titleDiv = document.getElementById('title-screen');
let gameDiv = document.getElementById('game-screen');
let startButton = document.getElementById('start-button');
const progressDisplay = document.getElementById('progress-number');
const timerDisplay = document.getElementById('timer-display');
const bestTimeDisplay = document.getElementById('best-time-text');
const prevTimeDisplay = document.getElementById('previous-time-text');
let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;

let timeScore = 0;

let display = 0;


const button = document.getElementById('game-button');

const buttonHeight = 80;
const buttonWidth = 80;

const maxWidth = window.innerWidth - buttonWidth;
const maxHeight = window.innerHeight - buttonHeight;

let buttonClicks = 0;




/* Starts game, swapping from title screen to game screen */
function startGame() {
    titleDiv.style.display = 'none';
    gameDiv.style.display = 'block';
    buttonClicks = 0;
    resetTimer();
    startTimer();
    button.style.left = Math.floor(Math.random() * (maxWidth + 1)) + 'px';
    button.style.top = Math.floor(Math.random() * (maxHeight + 1)) + 'px';
}

function endGame() {
    gameDiv.style.display = 'none';
    titleDiv.style.display = 'block';
    startButton.style.verticalAlign = 'middle';
    stopTimer();

    

}

function buttonClicked() {
    buttonClicks++;
    progressDisplay.textContent = `${buttonClicks}/10`;

    if (buttonClicks === 10) {
        endGame();
        return;
    }

    button.style.left = Math.floor(Math.random() * (maxWidth + 1)) + 'px';
    button.style.top = Math.floor(Math.random() * (maxHeight + 1)) + 'px';
}

/* Adds a click to the button each time it is clicked */
window.addEventListener('DOMContentLoaded', () => {
    button.addEventListener('click', () => buttonClicked());
})

function startTimer() {

    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateTimer, 10);
        isRunning = true;
    }
}

function stopTimer() {
    if (isRunning) {
        clearInterval(timer);
        elapsedTime = Date.now() - startTime;
        isRunning = false;
    }
}

function resetTimer() {
    clearInterval(timer);
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    display.textContent = "00 00 00";

}

function updateTimer() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;

    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
    let seconds = Math.floor(elapsedTime / 1000 % 60);
    let milliseconds = Math.floor(elapsedTime % 1000 / 10);

    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');
    milliseconds = String(milliseconds).padStart(2, '0');

    timerDisplay.textContent = `${seconds} ${milliseconds}`;
}

