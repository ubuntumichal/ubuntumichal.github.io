<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>XRP Blackjack</title>
    <link rel="stylesheet" href="styles.css" />
    <script src="script.js" defer></script>
  </head>
  <body>
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
