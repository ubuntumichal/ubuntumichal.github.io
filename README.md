<!DOCTYPE html>
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
