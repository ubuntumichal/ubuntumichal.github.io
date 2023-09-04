// Array of all 17 Joker card image filenames
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
    "joker-card-17.jpg"
];

// Function to randomly select a Joker card image
function drawJokerCard() {
    const randomIndex = Math.floor(Math.random() * jokerCards.length);
    const selectedCard = jokerCards[randomIndex];
    // Update the card image source
    document.getElementById("cardImage").src = selectedCard;
}

// Add an event listener to the trigger button
document.getElementById("hiddenTrigger").addEventListener("click", revealCardGame);

// Function to reveal the card game section
function revealCardGame() {
    document.getElementById("cardGame").style.display = "flex";
    // Initialize the card image with a default image (you can replace "default-card.jpg" with your actual card image)
    document.getElementById("cardImage").src = "default-card.jpg";
}

// Add an event listener to the draw button
document.getElementById("drawButton").addEventListener("click", drawJokerCard);

// Function to start the game
document.getElementById("startButton").addEventListener("click", revealCardGame);
