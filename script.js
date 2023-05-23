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
    dealerScore = calculateScore(dealerCards);
  } else if (player === 'player') {
    playerCards.push(card);
    playerScore = calculateScore(playerCards);
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

// Function to check if the game is over
function isGameOver() {
  return playerScore > 21 || dealerScore > 21;
}

// Function to determine the winner
function getWinner() {
  if (playerScore === dealerScore) {
    return "It's a tie!";
  } else if (playerScore > dealerScore) {
    return "You win!";
  } else {
    return "Dealer wins!";
  }
}

// Function to start the game
function startGame() {
  deck = createDeck();
  dealCard('player');
  dealCard('player');
  dealCard('dealer');
  console.log('Player cards:', playerCards);
  console.log('Dealer cards:', dealerCards);
}

// Start the game
startGame();
dealCard('dealer');
dealCard('dealer');
dealCard('player');
dealCard('player');
console.log('Player cards:', playerCards);
console.log('Dealer cards:', dealerCards);
}

// Function to update the UI with player and dealer cards
function updateUI() {
  const dealerCardsElement = document.getElementById('dealer-cards');
  const playerCardsElement = document.getElementById('player-cards');
  
  dealerCardsElement.innerHTML = '';
  playerCardsElement.innerHTML = '';

  dealerCards.forEach(card => {
    const cardElement = document.createElement('div');
    cardElement.textContent = card;
    dealerCardsElement.appendChild(cardElement);
  });

  playerCards.forEach(card => {
    const cardElement = document.createElement('div');
    cardElement.textContent = card;
    playerCardsElement.appendChild(cardElement);
  });

  document.getElementById('dealer-score').textContent = `Score: ${dealerScore}`;
  document.getElementById('player-score').textContent = `Score: ${playerScore}`;
}

// Event listener for the start button
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('start-button').addEventListener('click', function() {
    startGame();
    updateUI();
  });
});
</script>
