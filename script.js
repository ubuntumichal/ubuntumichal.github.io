// Define variables and arrays for cards, scores, and other game-related data
let deck = [];
let dealerCards = [];
let playerCards = [];
let dealerScore = 0;
let playerScore = 0;

// Function to create a new deck of cards
function createDeck() {
  const suits = ['Hearts', 'Spades', 'Clubs', 'Diamonds'];
  const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  let deck = [];
  for (let suit of suits) {
    for (let value of values) {
      deck.push(`${value} of ${suit}`);
    }
  }
  return deck;
}

// Function to get a random card from the deck
function getRandomCard() {
  const randomIndex = Math.floor(Math.random() * deck.length);
  return deck.splice(randomIndex, 1)[0];
}

// Function to deal a new card to a player (dealer or player)
function dealCard(player) {
  const card = getRandomCard();
  if (player === 'dealer') {
    dealerCards.push(card);
    updateScore('dealer');
    showCards('dealer');
  } else if (player === 'player') {
    playerCards.push(card);
    updateScore('player');
    showCards('player');
  }
}

// Function to calculate the score of a hand
function calculateScore(cards) {
  let score = 0;
  let hasAce = false;
  for (let card of cards) {
    const value = card.split(' ')[0];
    if (value === 'A') {
      score += 11;
      hasAce = true;
    } else if (['K', 'Q', 'J'].includes(value)) {
      score += 10;
    } else {
      score += parseInt(value);
    }
  }
  if (hasAce && score > 21) {
    score -= 10;
  }
  return score;
}

// Function to update the score of a player
function updateScore(player) {
  if (player === 'dealer') {
    dealerScore = calculateScore(dealerCards);
    document.getElementById('dealer-score').textContent = `Score: ${dealerScore}`;
  } else if (player === 'player') {
    playerScore = calculateScore(playerCards);
    document.getElementById('player-score').textContent = `Score: ${playerScore}`;
  }
}

// Function to show the cards of a player
function showCards(player) {
  const cardsContainer = player === 'dealer' ? 'dealer-cards' : 'player-cards';
  const cards = player === 'dealer' ? dealerCards : playerCards;
  const cardsElement = document.getElementById(cardsContainer);
  cardsElement.innerHTML = ''; // Clear the existing cards

  for (let card of cards) {
    const cardElement = document.createElement('div');
    cardElement.textContent = card;
    cardsElement.appendChild(cardElement);
  }
}

// Function to start the game
function startGame() {
  deck = createDeck();
  dealCard('player');
  dealCard('player');
  dealCard('dealer');
  updateUI();
}

// Function to update the UI with player and dealer cards
function updateUI() {
  showCards('dealer');
  showCards('player');
  document.getElementById('dealer-score').textContent = `Score: ${dealerScore}`;
  document.getElementById('player-score').textContent = `Score: ${playerScore}`;
}

// Event listener for the start game button
document.getElementById('start-button').addEventListener('click', startGame);

// Function to check if the player or dealer has blackjack (score of 21)
function checkBlackjack() {
  if (playerScore === 21) {
    endGame('Player has blackjack! You win!');
  } else if (dealerScore === 21) {
    endGame('Dealer has blackjack! You lose!');
  }
}

// Function to check if the player or dealer has busted (score over 21)
function checkBust() {
  if (playerScore > 21) {
    endGame('Player busts! You lose!');
  } else if (dealerScore > 21) {
    endGame('Dealer busts! You win!');
  }
}

// Function to compare the final scores and determine the winner
function compareScores() {
  if (playerScore > dealerScore) {
    endGame('You win!');
  } else if (playerScore < dealerScore) {
    endGame('You lose!');
  } else {
    endGame('It\'s a tie!');
  }
}

// Function to end the game and display the result
function endGame(message) {
  document.getElementById('hit-button').disabled = true;
  document.getElementById('stand-button').disabled = true;
  document.getElementById('message').textContent = message;
}

// Event listener for the hit button
document.getElementById('hit-button').addEventListener('click', function() {
  dealCard('player');
  checkBlackjack();
  checkBust();
});

// Event listener for the stand button
document.getElementById('stand-button').addEventListener('click', function() {
  while (dealerScore < 17) {
    dealCard('dealer');
  }
  compareScores();
});

