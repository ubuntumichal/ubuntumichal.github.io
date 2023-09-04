// Array of Joker card image filenames
const jokerCards = [
    "joker-card-1.jpg",
    "joker-card-2.jpg",
    "joker-card-3.jpg",
    "joker-card-4.jpg",
    "joker-card-5.jpg",
    "joker-card-6.jpg",
    "joker-card-7.jpg",
    "joker-card-8.jpg",
    "joker-card-9.jpg",
    "joker-card-10.jpg",
    "joker-card-11.jpg",
    "joker-card-12.jpg",
    "joker-card-13.jpg",
    "joker-card-14.jpg",
    "joker-card-15.jpg",
    "joker-card-16.jpg",
    "joker-card-17.jpg",
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
