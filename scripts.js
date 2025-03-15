/* Scripts for buttongame.html */

let titleDiv = document.getElementById('title-screen');
let gameDiv = document.getElementById('game-screen');
let endScreen = document.getElementById('end-screen');
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
    endScreen.style.display = 'none';
    buttonClicks = 0;
    button.style.left = Math.floor(Math.random() * (maxWidth + 1)) + 'px';
    button.style.top = Math.floor(Math.random() * (maxHeight + 1)) + 'px';
}

function endGame() {
    gameDiv.style.display = 'none';
    endScreen.style.display = 'block';
}

function buttonClicked() {
    buttonClicks++;
    console.log(buttonClicks);
    if (buttonClicks === 10) {
        endGame();
    }

    button.style.left = Math.floor(Math.random() * (maxWidth + 1)) + 'px';
    button.style.top = Math.floor(Math.random() * (maxHeight + 1)) + 'px';
    
    
}

/* Adds a click to the button each time it is clicked */
window.addEventListener('DOMContentLoaded', () => {
    button.addEventListener('click', () => buttonClicked());
})

/* Need a game loop to keep checking the number of clicks*/