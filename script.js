'use strict';

const player0El = document.querySelector('.player--0')
const player1El = document.querySelector('.player--1')
const score0El = document.querySelector('#score--0')
const score1El = document.querySelector('#score--1')
const current0El = document.querySelector('#current--0')
const current1El = document.querySelector('#current--1')

const diceEl = document.querySelector('.dice')
const btnNew = document.querySelector('.btn--new')
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')

let scores, activePlayer, currentScore, isPlaying;


const initializeGame = () => {
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    scores = [0, 0];
    activePlayer = 0;
    currentScore = 0;
    isPlaying = true;
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    diceEl.classList.add('hidden')
}
const setCurrentScore = (score) => {
    currentScore += score
    displayCurrentScore()
}
const setTotalScore = (score) => {
    scores[activePlayer] = score
    if (activePlayer === 0)
        score0El.textContent = score
    else {
        score1El.textContent = score
    }
}
const toggleBackground = () => {
    player0El.classList.toggle('player--active')
    player1El.classList.toggle('player--active')
}
const displayCurrentScore = () => {
    activePlayer === 0 ? current0El.textContent = currentScore : current1El.textContent = currentScore
}
const switchPlayer = () => {
    currentScore = 0;
    displayCurrentScore();
    toggleBackground();
    activePlayer = activePlayer === 1 ? 0 : 1;
}

btnRoll.addEventListener('click', () => {
    if(!isPlaying)
        return
    const dice = Math.trunc(Math.random() * 6) + 1;

    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`

    if (dice === 1) {
        setTotalScore(0);
        switchPlayer();
        return
    }

    setCurrentScore(dice)
})

btnHold.addEventListener('click', () => {
    const holdScore = currentScore + scores[activePlayer]
    setTotalScore(holdScore)

    if (scores[activePlayer] >= 100) {   
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
        document.querySelector(`.player--${activePlayer}`).classList.add('player--active')
        isPlaying = false;
        return
    }
    switchPlayer()
})

btnNew.addEventListener('click', initializeGame)

initializeGame();

