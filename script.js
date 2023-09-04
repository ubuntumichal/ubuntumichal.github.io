// Get the elements by their IDs
const startButton = document.getElementById("startButton");
const cardGame = document.getElementById("cardGame");
const drawButton = document.getElementById("drawButton");

// Add an event listener to the start button
startButton.addEventListener("click", () => {
    // Show the card game section
    cardGame.style.display = "flex";
});

// Add an event listener to the draw button
drawButton.addEventListener("click", () => {
    // Simulate drawing a card (replace this with your game logic)
    alert("You drew a Joker card!");
});
