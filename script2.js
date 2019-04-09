let randomNumber = Math.floor(Math.random() * 100) + 1;

const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');

const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');

let guessCount = 1
let resetButton;
guessField.focus();

function checkGuess () {
    let userGuess = Number(guessField.value);
    if (guessCount === 1) {
        guesses.textContent = 'Previous guesses: ';
    }
    guesses.textContent += userGuess + ', ';

    if (userGuess === randomNumber) {
        lastResult.textContent = 'Congratulations, you guessed correctly!';
        lastResult.style.backgroundColor = 'green';
        lowOrHi.textContent = '';
        setGameOver();
    }   else if (guessCount === 10) {
        lastResult.textContent = '!!!GAME OVER!!!';
        setGameOver();
    }   else {
        lastResult.textContent = 'Wrong!';
        lastResult.style.backgroundColor = 'red';
        if (userGuess < randomNumber) {
            lowOrHi.textContent = 'Too Low!';
        }   else if (userGuess > randomNumber) {
            lowOrHi.textContent = 'Too High!';
        }
    }
    guessCount++;
    guessField.value = '';
    guessField.focus();
}

function setGameOver() {
    guessField.disable = true;
    guessSubmit.disable = true;
    resetButton = document.createElement('button');
    resetButton.textContent = 'Start a new Game';
    document.body.appendChild(resetButton);
    resetButton.addEventListener('click', resetGame);
}

function resetGame () {
    guessCount = 1;

    const resetParas = document.querySelectorAll('.resetParas');
    for (let i = 0; i < resetParas.length; i++) {
        resetParas[i] = '';
    }

    resetButton.parentNode.removeChild(resetButton);

    guessField.disable = false;
    guessSubmit.disable = false;
    guessField.value = '';
    guessField.focus();

    lastResult.style.backgroundColor = 'white';

    randomNumber = Math.floor(Math.random() * 100) + 1;
}

function enterKey (event) {
    if (event.keyCode === 13) {
        checkGuess();
    }
}

guesses.style.backgroundColor = 'yellow'
guesses.style.fontSize = '200%';
guesses.style.padding = '10px';
guesses.style.boxShadow = '3px 3px 6px red';

guessSubmit.addEventListener('click', checkGuess);
guessField.addEventListener('keydown', enterKey);