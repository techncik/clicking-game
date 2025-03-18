/* Scripts for buttongame.html */
let titleDiv = document.getElementById('title-screen');
let gameDiv = document.getElementById('game-screen');
let startButton = document.getElementById('start-button');
const progressDisplay = document.getElementById('progress-number');
const timerDisplay = document.getElementById('timer-display');
const bestTimeDisplay = document.getElementById('bscore-text');
const prevTimeDisplay = document.getElementById('pscore-text');
const gameButton = document.getElementById('game-button');
const buttonHeight = 80;
const buttonWidth = 80;
const maxWidth = window.innerWidth - buttonWidth;
const maxHeight = window.innerHeight - buttonHeight;

let amountOfButtons = 10;
let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;
let bestTime = 0;
let runTime = 0;
let buttonClicks = 0;
let display = 0;



/* Starts game, swapping from title screen to game screen */
function startGame() {

    /* Display the game screen, hide title screen */
    titleDiv.style.display = 'none';
    gameDiv.style.display = 'block';

    /* Reset clicks and timer */
    buttonClicks = 0;
    progressDisplay.textContent = `${buttonClicks}/${amountOfButtons}`;
    resetTimer();

    /* Start timer and randomise position of the first button */
    startTimer();
    gameButton.style.left = Math.floor(Math.random() * (maxWidth + 1)) + 'px';
    gameButton.style.top = Math.floor(Math.random() * (maxHeight + 1)) + 'px';
}

/* Function to end the game */
function endGame() {

    stopTimer();

    /* Swap display from game screen to title screen */
    gameDiv.style.display = 'none';
    titleDiv.style.display = 'block';

    /* TODO; Reeset the start button */
    startButton.style.display = 'inline';
    

    /* Calculate and display the game time */
    let convTime = convertElapsedToHMSM(runTime);
    let hours = convTime[0];
    let minutes = convTime[1];
    let seconds = convTime[2];
    let milliseconds = convTime[3];

    /* Update previous time */
    prevTimeDisplay.textContent = `${seconds} ${milliseconds}`;

    /* See if current time is a new best time. If so update */
    if (bestTime === 0 || runTime < bestTime) {
        bestTime = runTime;
        bestTimeDisplay.textContent = `${seconds} ${milliseconds}`;
    }
}

/* Checks for the game button being clicked */
window.addEventListener('DOMContentLoaded', () => {
    gameButton.addEventListener('click', () => buttonClicked());
})

/* Function to handle logic when game button is clicked */
function buttonClicked() {

    /* Update number of clicks */
    buttonClicks++;
    progressDisplay.textContent = `${buttonClicks}/${amountOfButtons}`;

    /* End game is last button is clicked */
    if (buttonClicks === amountOfButtons) {
        endGame();
        return;
    }

    /* Randomise button position if game is not over */
    gameButton.style.left = Math.floor(Math.random() * (maxWidth + 1)) + 'px';
    gameButton.style.top = Math.floor(Math.random() * (maxHeight + 1)) + 'px';
}

/* Function to start the timer. Called when start button is pressed */
function startTimer() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateTimer, 10);
        isRunning = true;
    }
}

/* Function to stop timer. Called when 10th button is pressed */
function stopTimer() {
    if (isRunning) {
        clearInterval(timer);
        runTime = Date.now() - startTime;
        isRunning = false;
    }
}

/* Function to reset the timer. Called after game finishes */
function resetTimer() {
    clearInterval(timer);
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    display.textContent = "00 00";
}

/* Function is called repeatedly, displays the timer in the background of the
game */
function updateTimer() {

    /* Get current time and convert it to display format */
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;

    let convTime = convertElapsedToHMSM(elapsedTime);
    let hours = convTime[0];
    let minutes = convTime[1];
    let seconds = convTime[2];
    let milliseconds = convTime[3];

    /* Add padding and display timer on screen */
    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');
    milliseconds = String(milliseconds).padStart(2, '0');

    timerDisplay.textContent = `${seconds} ${milliseconds}`;
}

/* Convert raw timer format to readable hours, minutes, seconds, milliseconds */
function convertElapsedToHMSM(elapsedTime) {

    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
    let seconds = Math.floor(elapsedTime / 1000 % 60);
    let milliseconds = Math.floor(elapsedTime % 1000 / 10);

    return [hours, minutes, seconds, milliseconds];
}