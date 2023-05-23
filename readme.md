```javascript
// JavaScript code for the game

// Define variables and arrays for cards, scores, and other game-related data
let dealerCards = [];
let playerCards = [];
let dealerScore = 0;
let playerScore = 0;
let deck = [];
let isSplit = false;
let betAmount = 0;
let playerBalance = 100;

// Function to create a new deck of cards
function createDeck() {
  // ...
}

// Function to get a random card from the deck
function getRandomCard() {
  // ...
}

// Function to deal a new card to a player (dealer or player)
function dealCard(player) {
  // ...
}

// Function to calculate the score of a hand
function calculateScore(cards) {
  // ...
}

// Function to update the score of a player
function updateScore(player) {
  // ...
}

// Function to show the cards of a player
function showCards(player) {
  // ...
}

// Function to disable player actions (hit, stand, double down)
function disableActions() {
  // ...
}

// Function to enable player actions (hit, stand, double down)
function enableActions() {
  // ...
}

// Event listener for the hit button
document.getElementById('hit-button').addEventListener('click', function() {
  // ...
});

// Event listener for the stand button
document.getElementById('stand-button').addEventListener('click', function() {
  // ...
});

// Event listener for the double down button
document.getElementById('double-down-button').addEventListener('click', function() {
  // ...
});

// Start the game
let deck = createDeck();
dealCard('dealer');
dealCard('dealer');
dealCard('player');
dealCard('player');

