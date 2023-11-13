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

let activePlayer = 0;

score1El.textContent = 0;
score0El.textContent = 0;
diceEl.classList.add('hidden')

let currentScore = 0;

const setCurrentScore = (score) => {
    if (score === 1)
        toggleBackground()

    currentScore = score === 1 ? 0 : (currentScore + score)

    displayCurrentScore()

}
const toggleBackground = () => {
    player0El.classList.toggle('player--active')
    player1El.classList.toggle('player--active')
}
const displayCurrentScore = () => {
    activePlayer === 0 ? current0El.textContent = currentScore : current1El.textContent = currentScore
}
btnRoll.addEventListener('click', () => {
    const dice = Math.trunc(Math.random() * 6) + 1;

    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`

    if (dice === 1) {
        setCurrentScore(dice)
        activePlayer = activePlayer === 1 ? 0 : 1
        currentScore = 0;
        return
    }

    setCurrentScore(dice, activePlayer)
})