<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>XRP Blackjack</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
<script // define constants
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
  document.getElementById('money').innerHTML = `Money: ${money}`;
}

function updateBet() {
  document.getElementById('bet').innerHTML = `Bet: ${bet}`;
}

function deal() {
  // check if bet is within limits and player has enough money
  if (bet < MIN_BET || bet > MAX_BET || bet > money) {
    alert(`Please enter a bet between ${MIN_BET} and ${MAX_BET} and within your budget of ${money}.`);
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
// deal another card to player
playerHand.push(deck.pop());
playerScore += CARD_VALUES[playerHand[playerHand.length - 1]];
updatePlayerCards();

// check if player busts
if (playerScore > 21) {
endRound(false, 'Bust!');
}
}

function stand() {
// reveal dealer's second card
updateDealerCards(true);

// dealer hits until score is 17 or greater
while (dealerScore < 17) {
dealerHand.push(deck.pop());
dealerScore += CARD_VALUES[dealerHand[dealerHand.length - 1]];
updateDealerCards(true);
}

// check if dealer busts
if (dealerScore > 21) {
endRound(true, 'Dealer busts!');
return;
}

// determine winner
if (playerScore > dealerScore) {
endRound(true, 'You win!');
} else if (playerScore < dealerScore) {
endRound(false, 'Dealer wins!');
} else {
endRound(false, 'Push!');
}
}

function endRound(playerWins, message) {
// display message
alert(message);

// update money and bet
if (playerWins) {
money += bet;
} else {
money -= bet;
}
bet = 0;
updateMoney();
updateBet();

// enable/disable buttons
document.getElementById('deal-button').disabled = false;
document.getElementById('hit-button').disabled = true;
document.getElementById('stand-button').disabled = true;
}

function updateDealerCards(showAll) {
const dealerCardsElement = document.getElementById('dealer-cards');
dealerCardsElement.innerHTML = 'Dealer's Hand<br>';
for (let i = 0; i < dealerHand.length; i++) {
if (i === 0 && !showAll) {
dealerCardsElement.innerHTML += 'XX<br>';
} else {
dealerCardsElement.innerHTML += ${dealerHand[i]}<br>;
}
}
}
function updatePlayerCards() {
const playerCardsElement = document.getElementById('player-cards');
playerCardsElement.innerHTML = 'Player's Hand<br>';
for (let i = 0; i < playerHand.length; i++) {
playerCardsElement.innerHTML += ${playerHand[i]}<br>;
}
}

function validateBet() {
const betInput = document.getElementById('bet-input');
const betAmount = Number(betInput.value);
if (betAmount < MIN_BET || betAmount > MAX_BET || betAmount > money) {
betInput.classList.add('is-invalid');
document.getElementById('bet-help').classList.add('invalid-feedback');
return false;
}
betInput.classList.remove('is-invalid');
document.getElementById('bet-help').classList.remove('invalid-feedback');
bet = betAmount;
return true;
}

document.getElementById('bet-input').addEventListener('input', validateBet);</script>
    <header>
      <h1>XRP Blackjack</h1>
      <div id="status">
        <p>Money: <span id="money"></span></p>
        <p>Bet: <span id="bet"></span></p>
      </div>
    </header>
    <main>
      <div id="dealer">
        <h2>Dealer's Hand</h2>
        <div id="dealer-cards"></div>
        <p id="dealer-score"></p>
      </div>
      <div id="player">
        <h2>Player's Hand</h2>
        <div id="player-cards"></div>
        <p id="player-score"></p>
      </div>
      <div id="buttons">
        <button id="deal-button">Deal</button>
        <button id="hit-button" disabled>Hit</button>
        <button id="stand-button" disabled>Stand</button>
      </div>
    </main>
  </body>
</html>
