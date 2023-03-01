<html>
<head>
  <title>XRP Blackjack</title>
  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
</head>
<body>
  <h1>XRP Blackjack</h1>
  <p>Dealer: <span id="dealer-score"></span></p>
  <p>Player: <span id="player-score"></span></p>
  <p>
    <button id="deal-button">Deal</button>
    <button id="hit-button">Hit</button>
    <button id="stand-button">Stand</button>
  </p>
  <div id="dealer-cards"></div>
  <div id="player-cards"></div>
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
      dealerHand = [drawCard(), drawCard()];
      playerHand = [drawCard(), drawCard()];

  // update scores
  updateScores();

  // display cards
  displayCards();

  // check for blackjack
  if (dealerScore === 21 || playerScore === 21) {
    endGame();
    return;
  }
}

function hit() {
  // draw a card and add it to the player's hand
  playerHand.push(drawCard());

  // update scores
  updateScores();

  // display cards
  displayCards();

  // check for bust
  if (playerScore > 21) {
    endGame();
  }
}

function stand() {
  // dealer draws until they reach a score of 17 or higher
  while (dealerScore < 17) {
    dealerHand.push(drawCard());
    updateScores();
    displayCards();
  }

  endGame();
}

function drawCard() {
  // remove a card from the deck and return it
  return deck.pop();
}

function updateScores() {
  // reset scores
  dealerScore = 0;
  playerScore = 0;

  // calculate scores
  for (let card of dealerHand) {
    dealerScore += CARD_VALUES[card];
  }
  for (let card of playerHand) {
    playerScore += CARD_VALUES[card];
  }

  // adjust for aces
  if (dealerHand.includes('ACE') && dealerScore > 21) {
    dealerScore -= 10;
  }
  if (playerHand.includes('ACE') && playerScore > 21) {
    playerScore -= 10;
  }

  // update score display
  document.getElementById('dealer-score').innerHTML = dealerScore;
  document.getElementById('player-score').innerHTML = playerScore;
}

function displayCards() {
  // display dealer's cards
  let dealerCards = '';
  for (let i = 0; i < dealerHand.length; i++) {
    dealerCards += `<img src="cards/${dealerHand[i]}.png" alt="${dealerHand[i]}" />`;
  }
  document.getElementById('dealer-cards').innerHTML = dealerCards;

  // display player's cards
  let playerCards = '';
  for (let i = 0; i < playerHand.length; i++) {
    playerCards += `<img src="cards/${playerHand[i]}.png" alt="${playerHand[i]}" />`;
  }
  document.getElementById('player-cards').innerHTML = playerCards;
}

function endGame() {
  // determine winner and adjust money
  let winner;
  if (playerScore > 21 || (dealerScore <= 21 && dealerScore > playerScore)) {
    winner = 'dealer';
    money -= bet;
  } else if (dealerScore > 21 || playerScore > dealerScore) {
    winner = 'player';
    money += bet;
  } else {
    winner = 'tie';
  }

  // display winner and update money
  let message = `Dealer: ${dealerScore}, Player: ${playerScore}. `;
  if (winner === 'dealer') {
    message += 'Dealer wins.';
  } else if (winner === 'player') {
    message += 'Player wins!';
  } else {
    message += 'It\'s a tie!';
  }
  alert(message);
  updateMoney();

  // check if game is over
  if (money <= 0) {
    alert('Game over! You\'re out of money.');
    location.reload();
  } else {
    // reset bet and deal new hand
    bet = 0;
    updateBet();
    deal();

