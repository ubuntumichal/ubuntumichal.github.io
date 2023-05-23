<script>
    // JavaScript code for the game

    // Define variables and arrays for cards, scores, and other game-related data
    let dealerCards = [];
    let playerCards = [];
    let dealerScore = 0;
    let playerScore = 0;
    let deck = [];

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

// Function to enable player actions (hit, stand, double down)
function enableActions() {
  document.getElementById('hit-button').disabled = false;
}

// Event listener for the hit button
document.getElementById('hit-button').addEventListener('click', function() {
  dealCard('player');
  if (playerScore > 21) {
    endGame();
  }
});

// Event listener for the stand button
document.getElementById('stand-button').addEventListener('click', function() {
  endGame();
});

// Function to end the game and determine the winner
function endGame() {
  document.getElementById('hit-button').disabled = true;
  document.getElementById('stand-button').disabled = true;

  while (dealerScore < 17) {
    dealCard('dealer');
  }

  if (dealerScore > 21 || playerScore > dealerScore) {
    alert('You win!');
  } else if (dealerScore > playerScore) {
    alert('Dealer wins!');
  } else {
    alert('It\'s a tie!');
  }
}

// Start the game
deck = createDeck();
dealCard('dealer');
dealCard('dealer');
dealCard('player');
dealCard('player');
</script>
