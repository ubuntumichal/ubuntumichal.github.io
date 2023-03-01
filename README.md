<html>
<head>
  <title>XRP Blackjack</title>
  <link rel="stylesheet" href="style.css">
  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
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
  <script src="script.js"></script>
</body>
</html>

body {
  font-family: Arial, sans-serif;
  text-align: center;
}

h1 {
  margin-top: 50px;
  font-size: 3rem;
}

h2 {
  margin-top: 30px;
  font-size: 2rem;
}

#money-display, #bet-display {
  font-size: 1.5rem;
}

#dealer-section, #player-section {
  display: inline-block;
  margin-top: 50px;
}

#dealer-hand, #player-hand {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.card {
  width: 100px;
  height: 150px;
  border: 2px solid black;
  border-radius: 10px;
  background-color: white;
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card .suit {
  font-size: 1.5rem;
  margin-left: 5px;
}

.card .rank {
  font-size: 2.5rem;
  margin-top: 10px;
  margin-bottom: 5px;
  text-align: center;
}

.card .rank.red {
  color: red;
}

#player-buttons {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

#bet-form {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

#bet-form label {
  margin-right: 10px;
}

#bet-input {
  width: 60px;
  margin-right: 10px;
}
