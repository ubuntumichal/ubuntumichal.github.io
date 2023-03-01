<html>
<head>
  <title>XRP Blackjack</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<script src="script.js"></script>
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
</body>
</html>
