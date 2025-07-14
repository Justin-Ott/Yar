import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDsnGxYFk6b0sWpXnCYsg0RcZXVuE-VFzw",
    authDomain: "yarr-6707d.firebaseapp.com",
    projectId: "yarr-6707d",
    storageBucket: "yarr-6707d.firebasestorage.app",
    messagingSenderId: "657347999774",
    appId: "1:657347999774:web:2d8bb0f17d7adfa01d960f",
    measurementId: "G-9M6XX2XYL0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// At the top of yar.js
const urlParams = new URLSearchParams(window.location.search);
const gameMode = urlParams.get('mode') || 'duo'; // default to duo

if (gameMode === 'solo') {
    // Hide Player 2 UI elements
    document.querySelector('.right-player').style.display = 'none';
    // Adjust logic to only use Player 1
    // (You may need to add checks throughout your code)
}

// Card image arrays
const aceCards = [
    "Cards/ace_v_1.png", "Cards/ace_v_2.png", "Cards/ace_v_3.png", "Cards/ace_v_4.png", "Cards/ace_v_5.png"
];
const twoCards = [
    "Cards/two_v_1.png", "Cards/two_v_2.png", "Cards/two_v_3.png", "Cards/two_v_4.png", "Cards/two_v_5.png"
];
const threeCards = [
    "Cards/three_v_1.png", "Cards/three_v_2.png", "Cards/three_v_3.png", "Cards/three_v_4.png", "Cards/three_v_5.png"
];
const fourCards = [
    "Cards/four_v_1.png", "Cards/four_v_2.png", "Cards/four_v_3.png", "Cards/four_v_4.png", "Cards/four_v_5.png"
];
const fiveCards = [
    "Cards/five_v_1.png", "Cards/five_v_2.png", "Cards/five_v_3.png", "Cards/five_v_4.png", "Cards/five_v_5.png"
];
const sixCards = [
    "Cards/six_v_1.png", "Cards/six_v_2.png", "Cards/six_v_3.png", "Cards/six_v_4.png", "Cards/six_v_5.png"
];

// Helper to pick a random element from an array
function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// Get a pool of 6 unique cards (one from each value)
function getCardPool() {
    return [
        pickRandom(aceCards),
        pickRandom(twoCards),
        pickRandom(threeCards),
        pickRandom(fourCards),
        pickRandom(fiveCards),
        pickRandom(sixCards)
    ];
}

// Shuffle an array (Fisher-Yates)
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Update card images with 5 unique cards (no duplicates)
function updateCardImages() {
    const cardIds = ["card1", "card2", "card3", "card4", "card5"];
    const cardPool = shuffle(getCardPool()).slice(0, 5);

    cardIds.forEach((id, idx) => {
        const buttonElement = document.getElementById(id);
        if (buttonElement) {
            const imgElement = buttonElement.querySelector("img");
            if (imgElement && !lockedCards[id]) {
                imgElement.src = cardPool[idx];
            }
        } else {
            console.error(`Element with id "${id}" not found.`);
        }
    });
}



// Assign card values based on image src
function cardTotals() {
    const cardIds = ["card1", "card2", "card3", "card4", "card5"];
    cardIds.forEach((id) => {
        const buttonElement = document.getElementById(id);
        if (buttonElement) {
            const imgElement = buttonElement.querySelector("img");
            if (imgElement && !lockedCards[id]) {
                const src = imgElement.src;
                if (src.includes("ace")) imgElement.setAttribute("value", 1);
                else if (src.includes("two")) imgElement.setAttribute("value", 2);
                else if (src.includes("three")) imgElement.setAttribute("value", 3);
                else if (src.includes("four")) imgElement.setAttribute("value", 4);
                else if (src.includes("five")) imgElement.setAttribute("value", 5);
                else if (src.includes("six")) imgElement.setAttribute("value", 6);
                console.log(`Card ${id} value: ${imgElement.getAttribute("value")}`);
            }
        } else {
            console.error(`Element with id "${id}" not found.`);
        }
    });
}

let currentPlayer = 1; // 1 for Player 1, 2 for Player 2

// Score state for each player
const scoresLockedP1 = {
    ones: false, twos: false, threes: false, fours: false, fives: false, sixes: false,
    duo: false, triple: false, quad: false, den_o_wolf: false, dragon_claw: false,
    yar: false, straight: false, full_house: false, chance: false, total: 0
};
const scoresLockedP2 = {
    ones: false, twos: false, threes: false, fours: false, fives: false, sixes: false,
    duo: false, triple: false, quad: false, den_o_wolf: false, dragon_claw: false,
    yar: false, straight: false, full_house: false, chance: false, total: 0
};

// Card lock state
const lockedCards = {
    card1: false, card2: false, card3: false, card4: false, card5: false
};

// Helper to get the correct scoresLocked object
function getScoresLocked() {
    return currentPlayer === 1 ? scoresLockedP1 : scoresLockedP2;
}

// Check if all scores are locked for both players
function areAllScoresLocked() {
    const allLocked = (scoresObj) => Object.keys(scoresObj).every(
        key => key === "total" || scoresObj[key] !== false
    );
    return allLocked(scoresLockedP1) && allLocked(scoresLockedP2);
}

// Update all scores
function updateScores() {
    const scoreKeys = [
    "ones", "twos", "threes", "fours", "fives", "sixes",
    "duo", "triple", "quad", "den_o_wolf", "dragon_claw",
    "yar", "straight", "full_house", "chance", "total"
    ];

    scoreKeys.forEach(key => {
    [1, 2].forEach(playerNum => {
        const btn = document.getElementById(`p${playerNum}_${key}_button`);
        if (btn) btn.addEventListener("click", lockButton);
    });
    });

    const cardIds = ["card1", "card2", "card3", "card4", "card5"];
    const cardElements = cardIds.map(id => {
        const buttonElement = document.getElementById(id);
        return buttonElement ? buttonElement.querySelector("img") : null;
    });

    const scores = {
        ones: 0, twos: 0, threes: 0, fours: 0, fives: 0, sixes: 0,
        duo: 0, triple: 0, quad: 0, den_o_wolf: 0, dragon_claw: 0,
        yar: 0, straight: 0, full_house: 0, chance: 0, total: 0
    };

    const frequencyMap = {};
    const cardValues = [];
    cardElements.forEach(imgElement => {
        if (imgElement) {
            const value = parseInt(imgElement.getAttribute("value"), 10);
            if (!isNaN(value)) {
                frequencyMap[value] = (frequencyMap[value] || 0) + 1;
                cardValues.push(value);
            }
        }
    });

    let highestDuoScore = 0;
    let highestTripleScore = 0;
    let highestQuadScore = 0;
    let YarScore = 0;
    for (const value in frequencyMap) {
        // This is where any multiple scores are checked 
        // Including duo, triple, quad, and yar
        if (frequencyMap[value] >= 2) { // At least 2 cards with this value
            const duoScore = value * 2; // Sum of the pair
            if (duoScore > highestDuoScore) {
                highestDuoScore = duoScore; // Tracks the highest duo score
            }
        }
        if (frequencyMap[value] >= 3) { // At least 3 cards with this value
            const TripleScore = value * 3; // Sum of the triple
            if (TripleScore > highestTripleScore) {
                highestTripleScore = TripleScore; // Track the highest triple score
            }
        }
        if (frequencyMap[value] >= 4) { // At least 4 cards with this value
            const QuadScore = value * 4; // Sum of the quad
            if (QuadScore > highestQuadScore) {
                highestQuadScore = QuadScore; // Track the highest quad score
            }
        }
        if (frequencyMap[value] >= 5) { // At least 4 cards with this value
            YarScore = 50; // Updates Yar score
        }
    }
    scores.duo = highestDuoScore; // Updates the duo score
    scores.triple = highestTripleScore; // Updates the triple score
    scores.quad = highestQuadScore; // Updates the quad score
    scores.yar = YarScore; // Updates the yar score 

    const duos = [];
    for (const value in frequencyMap) {
        if (frequencyMap[value] >= 2) { // Check if theres any duplicate cards
            duos.push(value); // Add the value to the duos array
        }
    }
    if (duos.length >= 2) { // At least two distinct duos
        scores.den_o_wolf = 25; // Update dragon claw score 2 duos
    } else {
        scores.den_o_wolf = 0; // Reset dragon claw score if 1 or less duos
    }
    let tripletValue = null;
    let pairValue = null;

    for (const value in frequencyMap) {
        if (frequencyMap[value] >= 3) {
            tripletValue = value; // Records the triplet's value
        }
        if (frequencyMap[value] >= 2 && value !== tripletValue) {
            pairValue = value; // Only if a pair that is not part of the triplet exists
        }
    }

    // Dragon Claw requires both a triplet and a distinct pair
    if (tripletValue !== null && pairValue !== null) {
        scores.dragon_claw = 35; // Update dragon claw score
    } else {
        scores.dragon_claw = 0; // Reset dragon claw score
    }

    // Sort card values in ascending order
    cardValues.sort((a, b) => a - b);

    // Creates a set of unique values for straight checking
    const uniqueValues = [...new Set(cardValues)];

    // Initial var for 4 or 5 unique cards in a row
    let isStraight4 = false;
    let isStraight5 = false;

    // Check foe 5 unique consecutive values
    if (uniqueValues.length === 5) {
        isStraight5 = uniqueValues.every((val, i, arr) => 
            i === 0 || val === arr[i - 1] + 1
        );
    }

    // Check for 4-card Straight (needs 4 unique consecutive values)
    if (!isStraight5 && uniqueValues.length >= 4) {
        // Check all possible 4-card sequences in the unique values
        for (let i = 0; i <= uniqueValues.length - 4; i++) {
            const sequence = uniqueValues.slice(i, i + 4);
            if (sequence.every((val, idx) => 
                idx === 0 || val === sequence[idx - 1] + 1
            )) {
                isStraight4 = true;
                break;
            }
        }
    }

    // Update Straight and full_house scores
    if (isStraight5) {
        scores.straight = 30; 
        scores.full_house = 40;
    } else if (isStraight4) {
        scores.straight = 30;
        scores.full_house = 0;
    } else {
        scores.straight = 0;
        scores.full_house = 0;
    }

    // Calculate scores based on card values
    cardElements.forEach(cardElement => {
        if (cardElement) {
            const value = parseInt(cardElement.getAttribute("value"), 10); // Gets the card value
            if (!isNaN(value)) {
                if (value === 1) {
                    scores.ones += 1;
                } else if (value === 2) {
                    scores.twos += 2;
                } else if (value === 3) {
                    scores.threes += 3;
                } else if (value === 4) {
                    scores.fours += 4;
                } else if (value === 5) {
                    scores.fives += 5;
                } else if (value === 6) {
                    scores.sixes += 6;
                }
            }
            if (!isNaN(value)) {
                scores.chance += value;
            }
        }
    });
    
    const scoresLocked = getScoresLocked();
    for (const key in scoresLocked) {
        if (scoresLocked.hasOwnProperty(key) && key !== "total") {
            scores.total += scoresLocked[key];
        }
    }
    
    

    // Update the button/scoreboard with the calculated scores
    // if and only if it is their first time being assigned
    scoreKeys.forEach(key => {
    const scoreElement = document.getElementById(`p${currentPlayer}_${key}_button`);
    if (scoreElement) {
        if (scoreElement.getAttribute("data-locked") !== "true") {
            scoreElement.textContent = scores[key];
            console.log(`Updated p${currentPlayer}_${key}_button with value: ${scores[key]}`);
        }
    } else {
        console.error(`Element with id "p${currentPlayer}_${key}_button" not found.`);
    }
});
}

function updateScoreButtonStates() {
    const scoreKeys = [
        "ones", "twos", "threes", "fours", "fives", "sixes",
        "duo", "triple", "quad", "den_o_wolf", "dragon_claw",
        "yar", "straight", "full_house", "chance", "total"
    ];

    // Disable other player's buttons, enable current player's unlocked buttons
    [1, 2].forEach(playerNum => {
        scoreKeys.forEach(key => {
            const btn = document.getElementById(`p${playerNum}_${key}_button`);
            if (btn) {
                if (playerNum === currentPlayer) {
                    // Enable if not locked
                    if (btn.getAttribute("data-locked") !== "true") {
                        btn.disabled = false;
                        btn.style.opacity = "1";
                        btn.style.pointerEvents = "auto";
                    } else {
                        btn.disabled = true;
                        btn.style.opacity = "0.6";
                        btn.style.pointerEvents = "none";
                    }
                } else {
                    // Always disable other player's buttons
                    btn.disabled = true;
                    btn.style.opacity = "0.6";
                    btn.style.pointerEvents = "none";
                }
            }
        });
    });
}

// Lock a score button
function lockButton(event) {
    const button = event.target;
    button.setAttribute("data-locked", "true");
    button.removeEventListener("click", lockButton);
    button.style.backgroundColor = "yellow";

    const scoreKey = button.id.replace(/^p[12]_/, "").replace("_button", "");
    const scoreValue = parseInt(button.textContent, 10);
    const scoresLocked = getScoresLocked();

    if (!isNaN(scoreValue)) {
    scoresLocked[scoreKey] = scoreValue;
    scoresLocked.total = 0;
    for (const key in scoresLocked) {
        if (key !== "total" && scoresLocked[key] !== false) {
            scoresLocked.total += scoresLocked[key];
        }
    }
    // Instantly update the total button for the current player
    const totalBtn = document.getElementById(`p${currentPlayer}_total_button`);
    if (totalBtn) {
        totalBtn.textContent = scoresLocked.total;
    }
}

    if (areAllScoresLocked()) {
        const gameOverScreen = document.getElementById("game-over-screen");
        gameOverScreen.style.display = "block";
        const totalScoreDisplay = document.getElementById("total-score-display");
        totalScoreDisplay.textContent =
            `Player 1: ${scoresLockedP1.total} | Player 2: ${scoresLockedP2.total}`;
        const whiteOverlay = document.getElementById("background-overlay");
        whiteOverlay.style.display = "block";
        return; // End game, don't switch player
    }

    // Unlock and update cards after locking a score
    const cardIds = ["card1", "card2", "card3", "card4", "card5"];
    cardIds.forEach((id) => {
        const buttonElement = document.getElementById(id);
        if (buttonElement) {
            const imgElement = buttonElement.querySelector("img");
            if (imgElement && lockedCards[id]) {
                const originalSrc = imgElement.getAttribute("data-original-src");
                if (originalSrc) imgElement.src = originalSrc;
                lockedCards[id] = false;
            }
        }
    });

    // Reset unlocked scores to 0
    const scoreKeys = [
    "ones", "twos", "threes", "fours", "fives", "sixes",
    "duo", "triple", "quad", "den_o_wolf", "dragon_claw",
    "yar", "straight", "full_house", "chance", //"total"
    ];
    scoreKeys.forEach(key => {
        const btn = document.getElementById(`p${currentPlayer}_${key}_button`);
        if (btn && btn.getAttribute("data-locked") !== "true") {
            btn.textContent = 0;
        }
    });

    // Switch to the other player
    // When switching players in solo mode, stay on Player 1
    if (gameMode === 'solo') {
        currentPlayer = 1;
    } else {
        currentPlayer = currentPlayer === 1 ? 2 : 1;
    }

    // After switching currentPlayer
    const currentPlayerLabel = document.getElementById("current-player-label");
    if (currentPlayerLabel) {
        currentPlayerLabel.textContent = `Current Player: Player ${currentPlayer}`;
    }

    updateScoreButtonStates(); 
    updateCardImages();
    cardTotals();
    updateScores();

    rerollCount = 0;
    const element = document.getElementById("reroll_count");
    element.textContent = 3 - rerollCount;
    console.log(`Player ${currentPlayer}'s turn!`);
}

var rerollCount = 0;

// Lock/unlock a card
function lockCard(event) {
    const buttonElement = event.currentTarget;
    const imgElement = buttonElement.querySelector("img");
    const cardId = buttonElement.id;

    if (!lockedCards[cardId]) {
        const originalSrc = imgElement.src;
        imgElement.setAttribute("data-original-src", originalSrc);
        const lockedSrc = originalSrc.replace(/\.png$/, '_locked.png');
        imgElement.src = lockedSrc;
        lockedCards[cardId] = true;
    } else {
        const originalSrc = imgElement.getAttribute("data-original-src");
        if (originalSrc) imgElement.src = originalSrc;
        lockedCards[cardId] = false;
    }
}

// Initialize event listeners and game state on page load
window.onload = () => {
    updateCardImages();
    cardTotals();
    updateScores();
    updateScoreButtonStates(); 

    const element = document.getElementById("reroll_count");
    element.textContent = 3 - rerollCount;

    // Score button listeners
    const scoreKeys = [
    "ones", "twos", "threes", "fours", "fives", "sixes",
    "duo", "triple", "quad", "den_o_wolf", "dragon_claw",
    "yar", "straight", "full_house", "chance", "total"
    ];

    scoreKeys.forEach(key => {
    [1, 2].forEach(playerNum => {
        const button = document.getElementById(`p${playerNum}_${key}_button`);
        if (button) button.addEventListener("click", lockButton);
        });
    });

    // Card button listeners
    const cardIds = ["card1", "card2", "card3", "card4", "card5"];
    cardIds.forEach(id => {
        const button = document.getElementById(id);
        if (button) button.addEventListener("click", lockCard);
    });

    if (gameMode === 'solo') {
        // Hide Player 2's UI elements
        const rightPlayer = document.querySelector('.right-player');
        if (rightPlayer) rightPlayer.style.display = 'none';

        // Optionally, hide Player 2's score buttons/board
        const p2Buttons = document.querySelectorAll('[id^="p2_"]');
        p2Buttons.forEach(btn => btn.style.display = 'none');
    }
};

// Reroll button
document.getElementById("reroll").addEventListener("click", () => {
    if (rerollCount < 3) {
        updateCardImages();
        cardTotals();
        updateScores();
        rerollCount++;
        console.log(`Reroll count: ${rerollCount}`);
        const element = document.getElementById("reroll_count");
        element.textContent = 3 - rerollCount;
    } else {
        console.log("No remaining rerolls");
    }
});

// Reset game button
document.getElementById("reset-game-button").addEventListener("click", () => {
    const gameOverScreen = document.getElementById("game-over-screen");
    gameOverScreen.style.display = "none";
    const whiteOverlay = document.getElementById("background-overlay");
    whiteOverlay.style.display = "none";

    // Reset both players' scoresLocked
    for (const key in scoresLockedP1) {
        if (key !== "total") scoresLockedP1[key] = false;
        else scoresLockedP1[key] = 0;
    }
    for (const key in scoresLockedP2) {
        if (key !== "total") scoresLockedP2[key] = false;
        else scoresLockedP2[key] = 0;
    }

    const cardIds = ["card1", "card2", "card3", "card4", "card5"];
    cardIds.forEach((id) => {
        lockedCards[id] = false;
    });

    // Unlock all score buttons for both players
    const scoreKeys = [
        "ones", "twos", "threes", "fours", "fives", "sixes",
        "duo", "triple", "quad", "den_o_wolf", "dragon_claw",
        "yar", "straight", "full_house", "chance"
    ];
    [1, 2].forEach(playerNum => {
        scoreKeys.forEach((key) => {
            const button = document.getElementById(`p${playerNum}_${key}_button`);
            if (button) {
                button.setAttribute("data-locked", "false");
                button.style.backgroundColor = "";
                button.addEventListener("click", lockButton);
            }
        });
    });

    currentPlayer = 1;
    updateCardImages();
    cardTotals();
    updateScores();

    rerollCount = 0;
    const element = document.getElementById("reroll_count");
    element.textContent = 3 - rerollCount;
});