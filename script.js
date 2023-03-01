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
// deal a card to the player and update the score
playerHand.push(deck.pop());
playerScore += CARD_VALUES[playerHand[playerHand.length - 1]];
updatePlayerCards();

// check if player busts
if (playerScore > 21) {
endRound(false, 'Player busts.');
}
}

function stand() {
// disable hit and stand buttons
document.getElementById('hit-button').disabled = true;
document.getElementById('stand-button').disabled = true;

// reveal the dealer's facedown card
updateDealerCards(true);

// dealer hits until their score is 17 or higher
while (dealerScore < 17) {
dealerHand.push(deck.pop());
dealerScore += CARD_VALUES[dealerHand[dealerHand.length - 1]];
updateDealerCards(true);
}

// check if dealer busts
if (dealerScore > 21) {
endRound(true, 'Dealer busts.');
return;
}

// determine winner
if (playerScore > dealerScore) {
endRound(true, 'Player wins!');
} else if (playerScore < dealerScore) {
endRound(false, 'Dealer wins.');
} else {
endRound(false, 'Push.');
}
}

function updateDealerCards(revealSecondCard = false) {
let html = '';
for (let i = 0; i < dealerHand.length; i++) {
html += <div class="card">${revealSecondCard || i !== 1 ? dealerHand[i] : 'X'}</div>;
}
document.getElementById('dealer-cards').innerHTML = html;
document.getElementById('dealer-score').innerHTML = Score: ${revealSecondCard ? dealerScore : CARD_VALUES[dealerHand[0]]};
}

function updatePlayerCards() {
let html = '';
for (let i = 0; i < playerHand.length; i++) {
html += <div class="card">${playerHand[i]}</div>;
}
document.getElementById('player-cards').innerHTML = html;
document.getElementById('player-score').innerHTML = Score: ${playerScore};
}

function endRound(win, message) {
if (win) {
money += bet;
} else {
money -= bet;
}
updateMoney();
alert(message);

if (money < MIN_BET) {
alert('Game over. You are out of money.');
location.reload();
} else {
// reset bet and enable deal button
bet = 0;
updateBet();
document.getElementById('deal-button').disabled = false;
}
}
