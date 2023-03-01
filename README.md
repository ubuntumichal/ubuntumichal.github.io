<html>
<head>
  <title>XRP Blackjack</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>XRP Blackjack</h1>
  <p id="money-display">Money: 100 XRP</p>
  <p id="bet-display">Bet: 0 XRP</p>
  <div id="dealer-section">
    <h2>Dealer:</h2>
    <div id="dealer-hand"></div>
    <p id="dealer-score"></p>
  </div>
  <div id="player-section">
    <h2>Player:</h2>
    <div id="player-hand"></div>
    <p id="player-score"></p>
    <div id="player-buttons">
      <button id="hit-button">Hit</button>
      <button id="stand-button">Stand</button>
      <button id="deal-button">Deal</button>
    </div>
    <form id="bet-form">
      <label for="bet-input">Bet:</label>
      <input type="number" id="bet-input" name="bet" min="10" max="100" step="10">
      <button type="submit" id="bet-button">Place Bet</button>
    </form>
  </div>
 <script>
// define constants
const CARD_VALUES = {
  'ACE': 11,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  '10': 10,
  'JACK': 10,
  'QUEEN': 10,
  'KING': 10,
};
const CARDS = ['ACE', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'JACK', 'QUEEN', 'KING'];
const STARTING_MONEY = 100;
const MIN_BET = 10;
const MAX_BET = 100;

// define variables
let deck = [];
let dealerHand = [];
let playerHand = [];
let dealerScore = 0;
let playerScore = 0;
let money = STARTING_MONEY;
let bet = 0;

// set up event listeners
document.getElementById('deal-button').addEventListener('click', deal);
document.getElementById('hit-button').addEventListener('click', hit);
document.getElementById('stand-button').addEventListener('click', stand);

// initialize game
shuffleDeck();
updateMoney();
updateBet();

// define functions
function shuffleDeck() {
deck = [];
for (let i = 0; i < 4; i++) {
deck = deck.concat(CARDS);
}
deck = shuffleArray(deck);
}

function shuffleArray(array) {
let currentIndex = array.length;
let temporaryValue;
let randomIndex;

while (0 !== currentIndex) {
randomIndex = Math.floor(Math.random() * currentIndex);
currentIndex -= 1;
temporaryValue = array[currentIndex];
array[currentIndex] = array[randomIndex];
array[randomIndex] = temporaryValue;
}

return array;
}

function updateMoney() {
document.getElementById('money').innerHTML = Money: ${money};
}

function updateBet() {
document.getElementById('bet').innerHTML = Bet: ${bet};
}

function deal() {
// check if bet is within limits and player has enough money
if (bet < MIN_BET || bet > MAX_BET || bet > money) {
alert(Please enter a bet between ${MIN_BET} and ${MAX_BET} and within your budget of ${money}.);
return;
}

// reset scores and hands
dealerScore = 0;
playerScore = 0;
dealerHand = [];
playerHand = [];

// deal initial cards
dealerHand.push(deck.pop());
dealerScore += CARD_VALUES[dealerHand[0]];
updateDealerCards();

playerHand.push(deck.pop());
playerScore += CARD_VALUES[playerHand[0]];
updatePlayerCards();

dealerHand.push(deck.pop());
dealerScore += CARD_VALUES[dealerHand[1]];
updateDealerCards();

playerHand.push(deck.pop());
playerScore += CARD_VALUES[playerHand[1]];
updatePlayerCards();

// check if player has blackjack
if (playerScore === 21) {
endRound(true, 'Blackjack!');
return;
}

// check if dealer has blackjack
if (dealerScore === 21) {
endRound(false, 'Dealer has blackjack.');
return;
}

// enable/disable buttons
document.getElementById('deal-button').disabled = true;
document.getElementById('hit-button').disabled = false;
document.getElementById('stand-button').disabled = false;
}

function hit() {
// add card to player's hand
playerHand.push(deck.pop());
playerScore += CARD_VALUES[playerHand[playerHand.length - 1]];
updatePlayerCards();

// check if player busts
if (playerScore > 21) {
endRound(false, 'You bust!');
}

// check if player gets blackjack
if (playerScore === 21) {
stand();
}
}

function stand() {
// disable buttons
document.getElementById('hit-button').disabled = true;
document.getElementById('stand-button').disabled = true;

// reveal dealer's second card
updateDealerCards(true);

// dealer draws cards until score is at least 17
while (dealerScore < 17) {
dealerHand.push(deck.pop());
dealerScore += CARD_VALUES[dealerHand[dealerHand.length - 1]];
updateDealerCards();
}

// check if dealer busts
if (dealerScore > 21) {
endRound(true, 'Dealer busts!');
return;
}

// compare scores
if (dealerScore > playerScore) {
endRound(false, 'Dealer wins!');
} else if (dealerScore < playerScore) {
endRound(true, 'You win!');
} else {
endRound(true, 'Push!');
}
}

function endRound(playerWins, message) {
if (playerWins) {
money += bet;
} else {
money -= bet;
}
alert(message);
updateMoney();

// enable deal button and disable hit and stand buttons
document.getElementById('deal-button').disabled = false;
document.getElementById('hit-button').disabled = true;
document.getElementById('stand-button').disabled = true;
}

function updateDealerCards(revealSecondCard) {
let dealerCards = '';
for (let i = 0; i < dealerHand.length; i++) {
if (i === 1 && !revealSecondCard) {
dealerCards += '<div class="card back"></div>';
} else {
dealerCards += <div class="card ${dealerHand[i].toLowerCase()}"></div>;
}
}
document.getElementById('dealer-cards').innerHTML = dealerCards;
}

function updatePlayerCards() {
let playerCards = '';
for (let i = 0; i < playerHand.length; i++) {
playerCards += <div class="card ${playerHand[i].toLowerCase()}"></div>;
}
document.getElementById('player-cards').innerHTML = playerCards;
}
  </script>
</body>
</html>
