// Game Data - Contains all story paths, choices, and images
const storyData = {
    start: {
        text: "Dr. Karthik embarks on a journey to uncover the secrets of Lord Krishna's anklet. Where will you begin?",
        choices: ["Visit Dwarka", "Travel to Vrindavan"],
        consequence: ["dwarka", "vrindavan"],
        image: "images/dwaraka.jpg"
    },
    dwarka: {
        text: "You arrive in Dwarka and hear about a hidden underwater temple. Do you dive in?",
        choices: ["Yes", "No"],
        consequence: ["underwaterTemple", "leaveDwarka"],
        image: "images/dwaraka.jpg"
    },
    vrindavan: {
        text: "In Vrindavan, you meet a mysterious sage who offers guidance. Do you listen?",
        choices: ["Listen", "Ignore"],
        consequence: ["sageAdvice", "moveOn"],
        image: "images/vrindhuvan.jpg"
    },
    underwaterTemple: {
        text: "You dive into the temple, but awaken an ancient guardian! Do you fight or flee?",
        choices: ["Fight", "Flee"],
        consequence: ["guardianFight", "escape"],
        image: "images/underwater.jpg"
    },
    guardianFight: {
        text: "You defeat the guardian and unlock a secret chamber! Do you enter or leave?",
        choices: ["Enter", "Leave"],
        consequence: ["secretChamber", "leaveWithRelic"],
        image: "images/fight.jpg"
    },
    secretChamber: {
        text: "Inside the chamber, you find inscriptions revealing Krishna's hidden path! You win!",
        choices: [],
        consequence: [],
        image: "images/chamber.jpg",
        isEnding: true
    },
    leaveWithRelic: {
        text: "You take the relic but get cursed! Game Over!",
        choices: [],
        consequence: [],
        image: "images/cursed.jpg",
        isEnding: true
    },
    escape: {
        text: "You flee safely but without any answers. Game Over!",
        choices: [],
        consequence: [],
        image: "images/escape.jpg",
        isEnding: true
    },
    sageAdvice: {
        text: "The sage tells you about a hidden scripture in Mathura. Do you go there?",
        choices: ["Yes", "No"],
        consequence: ["mathura", "ignoreSage"],
        image: "images/sage.jpg"
    },
    mathura: {
        text: "You find the scripture but a rival group is after it. Do you hide or confront them?",
        choices: ["Hide", "Confront"],
        consequence: ["hideScripture", "fightRivals"],
        image: "images/mathura.jpg"
    },
    hideScripture: {
        text: "You successfully hide the scripture and study it in secret. You win!",
        choices: [],
        consequence: [],
        image: "images/scriptures.jpg",
        isEnding: true
    },
    fightRivals: {
        text: "You bravely confront the rivals and retrieve the scripture! Do you read it or destroy it?",
        choices: ["Read it", "Destroy it"],
        consequence: ["readScripture", "destroyScripture"],
        image: "images/fight.jpg"
    },
    destroyScripture: {
        text: "The knowledge is lost forever. Game Over!",
        choices: [],
        consequence: [],
        image: "images/scriptures.jpg",
        isEnding: true
    },
    readScripture: {
        text: "The scripture reveals a path to an ancient secret chamber! You win!",
        choices: [],
        consequence: [],
        image: "images/read_scripture.jpg",
        isEnding: true
    },
    moveOn: {
        text: "You choose to ignore the sage and continue your journey. Do you seek a guide or continue alone?",
        choices: ["Seek guide", "Continue alone"],
        consequence: ["seekGuide", "continueAlone"],
        image: "images/move.jpg"
    }
};

// DOM Elements
const storySection = document.getElementById("story");
const choicesSection = document.getElementById("choices");
const storyImage = document.getElementById("storyImage");
const restartButton = document.getElementById("restartButton");
const addendumButton = document.getElementById("addendumButton");
const addendum = document.getElementById("addendum");

/**
 * Initializes the game
 */
function startGame() {
    try {
        restartButton.style.display = "none";
        updatePage("start");
    } catch (error) {
        console.error("Error starting game:", error);
        storySection.textContent = "The adventure failed to begin. Please refresh the page.";
    }
}

/**
 * Updates the game page with current story stage
 * @param {string} stage - The current stage of the story
 */
function updatePage(stage) {
    try {
        const storyPart = storyData[stage];
        
        if (!storyPart) {
            throw new Error(`Invalid story stage: ${stage}`);
        }
        
        // Update story text and image
        storySection.textContent = storyPart.text;
        storyImage.src = storyPart.image;
        storyImage.alt = `Illustration for: ${storyPart.text.substring(0, 50)}...`;
        
        // Clear previous choices
        choicesSection.innerHTML = "";
        
        // Show restart button for endings
        if (storyPart.isEnding) {
            restartButton.style.display = "block";
            return;
        }
        
        // Create choice buttons
        storyPart.choices.forEach((choice, index) => {
            const button = document.createElement("button");
            button.textContent = choice;
            button.className = "choice-button";
            button.addEventListener("click", () => {
                animateTransition(() => {
                    updatePage(storyPart.consequence[index]);
                });
            });
            choicesSection.appendChild(button);
        });
        
    } catch (error) {
        console.error("Error updating page:", error);
        storySection.textContent = "The story took an unexpected turn. Please restart your journey.";
        choicesSection.innerHTML = "";
        restartButton.style.display = "block";
    }
}

/**
 * Handles the animation between story transitions
 * @param {function} callback - Function to call after animation completes
 */
function animateTransition(callback) {
    storySection.style.animation = "fadeOut 0.3s ease";
    setTimeout(() => {
        callback();
        storySection.style.animation = "fadeIn 0.3s ease";
    }, 300);
}

/**
 * Restarts the game from the beginning
 */
function restartGame() {
    startGame();
}

/**
 * Toggles the visibility of the addendum section
 */
function toggleAddendum() {
    const isVisible = addendum.style.display === "block";
    addendum.style.display = isVisible ? "none" : "block";
    addendumButton.textContent = isVisible ? "Show addendum" : "Hide addendum";
}

// Initialize the game when window loads
window.addEventListener("load", () => {
    try {
        startGame();
        // Set last modified date
        document.getElementById('lastModified').textContent = document.lastModified;
    } catch (error) {
        console.error("Initialization error:", error);
        storySection.textContent = "Failed to load the adventure. Please try again later.";
    }
});