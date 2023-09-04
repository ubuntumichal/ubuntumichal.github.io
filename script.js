// Array of Joker card image filenames
const jokerCards = [
    "joker-card-1.jpg",
    "joker-card-2.jpg",
    // Add all your Joker card image filenames here
    // Ensure you have 52 images in the array
];

// Function to randomly select a Joker card image
function drawJokerCard() {
    const randomIndex = Math.floor(Math.random() * jokerCards.length);
    const selectedCard = jokerCards[randomIndex];
    // Update the card image source
    document.getElementById("cardImage").src = selectedCard;
}

// Add an event listener to the draw button
document.getElementById("drawButton").addEventListener("click", drawJokerCard);

// Function to reveal the card game section
document.getElementById("startButton").addEventListener("click", () => {
    document.getElementById("cardGame").style.display = "flex";
});
