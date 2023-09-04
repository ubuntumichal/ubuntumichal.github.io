// Array of Joker card images
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
];

// Function to reveal the card game section
function revealCardGame() {
    const cardGame = document.getElementById("cardGame");
    cardGame.style.display = "block";
}

// Function to set the default card image
function setDefaultCardImage() {
    const cardImage = document.getElementById("cardImage");
    cardImage.src = "joker-card-1.jpg"; // Set the default image to joker-card-1.jpg
}

// Function to draw a random Joker card
function drawCard() {
    const cardImage = document.getElementById("cardImage");
    const drawButton = document.getElementById("drawButton");

    // Disable the draw button temporarily
    drawButton.disabled = true;

    // Randomly select a Joker card from the array
    const randomIndex = Math.floor(Math.random() * jokerCards.length);
    const selectedCard = jokerCards[randomIndex];

    // Set the card image source
    cardImage.src = selectedCard;

    // Re-enable the draw button after a short delay
    setTimeout(() => {
        drawButton.disabled = false;
    }, 1000); // Adjust the delay as needed
}

// Add event listener to reveal the card game section
document.getElementById("hiddenTriggerLeft").addEventListener("click", revealCardGame);

// Add event listener to draw a card
document.getElementById("drawButton").addEventListener("click", drawCard);

// Set the default card image when the game is revealed
setDefaultCardImage();
