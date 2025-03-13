/* Scripts for buttongame.html */

let titleDiv = document.getElementById('title-screen');
let gameDiv = document.getElementById('game-screen');
let endScreen = document.getElementById('end-screen');
let display = 0;

/* Starts game, swapping from title screen to game screen */
function startGame() { 
    titleDiv.style.display = 'none';
    gameDiv.style.display = 'block';
    endScreen.style.display = 'none';
}

function endGame() {
    gameDiv.style.display = 'none';
    endScreen.style.display = 'block';
}
