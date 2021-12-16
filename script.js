const gameContainer = document.getElementById("game");
const moves = document.getElementById('moves');
const match = document.getElementById('match');
const start = document.querySelector('button');
const gameBoard = document.getElementById('gameBoard');
const reset = document.getElementById('reset');
const highScore = document.querySelector('#highScore');

highScore.innerText = `Best Score: ${localStorage.getItem('bestScore')}` || '';

let bestScore = localStorage.getItem('bestScore');



const COLORS = [
    "red",
    "blue",
    "green",
    "orange",
    "purple",
    "red",
    "blue",
    "green",
    "orange",
    "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

let shuffledColors = shuffle(COLORS);
let cards = [];
// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
    for (let color of colorArray) {
        // create a new div
        const newDiv = document.createElement("div");

        // give it a class attribute for the value we are looping over
        newDiv.classList.add(color);

        // call a function handleCardClick when a div is clicked on
        newDiv.addEventListener("click", handleCardClick);
        cards.push(newDiv);
        // append the div to the element with an id of game
        gameContainer.append(newDiv);
    }
}
let cardPair = [];
let turns = 0;
let matches = 0;
// TODO: Implement this function!
function handleCardClick(event) {
    // you can use event.target to see which element was clicked

    turns++;
    cardPair.push(event.target);
    event.target.removeEventListener('click', handleCardClick);
    event.target.style.backgroundColor = event.target.className;
    if (cardPair.length >= 2 && cardPair[0].className !== cardPair[1].className) {
        for (let card of cards) {
            card.removeEventListener('click', handleCardClick)
        }
        setTimeout(function () {
            for (let i = 0; i < cardPair.length; i++) {
                cardPair[i].style.backgroundColor = 'white';
            }
            cardPair = [];
            for (let card of cards) {
                card.addEventListener('click', handleCardClick)
            }
        }, 1000);
        count = 0;

    } else if (cardPair.length >= 2 && cardPair[0].className == cardPair[1].className) {
        count = 0;
        for (let card of cardPair) {
            card.removeEventListener('click', handleCardClick)
        }
        match.classList.toggle('hide');
        setTimeout(function () {
            match.classList.toggle('hide');
        }, 1000);
        matches++;
        cardPair = [];
    }
    if (matches == 5 && bestScore == null) {
        localStorage.setItem('bestScore', turns);
    }
    else if (matches == 5 && turns < bestScore) {
        localStorage.setItem('bestScore', turns);
    }
    moves.innerText = `Score: ${turns}`
    console.log(cardPair);
    console.log("you just clicked", event.target.className);
}

start.addEventListener('click', function (e) {
    start.parentElement.classList.toggle('start');
    start.classList.toggle('hide')
    gameBoard.classList.toggle('hide');
})

reset.addEventListener('click', function (e) {
    window.location.reload();
})
// when the DOM loads
createDivsForColors(shuffledColors);
