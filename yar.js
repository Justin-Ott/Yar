// Array of card image paths
const cardImages = [
    "C:/Users/sgtjd/.AVisualStudioProjects/Try to Yar/Cards/two_of_clubs.png",
    "C:/Users/sgtjd/.AVisualStudioProjects/Try to Yar/Cards/three_of_clubs.png",
    "C:/Users/sgtjd/.AVisualStudioProjects/Try to Yar/Cards/four_of_clubs.png",
    "C:/Users/sgtjd/.AVisualStudioProjects/Try to Yar/Cards/five_of_clubs.png",
    "C:/Users/sgtjd/.AVisualStudioProjects/Try to Yar/Cards/six_of_clubs.png",
    "C:/Users/sgtjd/.AVisualStudioProjects/Try to Yar/Cards/ace_of_clubs.png",
    // Add more card image paths as needed
  ];
  
  // Function to get a random image from the array
  function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * cardImages.length);
    return cardImages[randomIndex];
  }
  
  // Function to update all card images
  function updateCardImages() {
    const cardIds = ["card1", "card2", "card3", "card4", "card5"];
    cardIds.forEach((id) => {
      const cardElement = document.getElementById(id);
      if (cardElement) {
        cardElement.src = getRandomImage();
      } else {
        console.error(`Element with id "${id}" not found.`);
      }
    });
  }
 
  function cardTotals() {
    const cardIds = ["card1", "card2", "card3", "card4", "card5"];
    cardIds.forEach((id) => {
      const cardElement = document.getElementById(id);
      if (cardElement) {
        const src = cardElement.src; // Get the src attribute of the image
  
        if (src.includes("ace_of_clubs.png")) {
          cardElement.setAttribute("value", 1); 
        } else if (src.includes("two_of_clubs.png")) {
          cardElement.setAttribute("value", 2);
        } else if (src.includes("three_of_clubs.png")) {
          cardElement.setAttribute("value", 3);
        } else if (src.includes("four_of_clubs.png")) {
          cardElement.setAttribute("value", 4);
        } else if (src.includes("five_of_clubs.png")) {
          cardElement.setAttribute("value", 5);
        } else if (src.includes("six_of_clubs.png")) {
          cardElement.setAttribute("value", 6);
        }
  
        console.log(`Card ${id} value: ${cardElement.getAttribute("data-value")}`);
      }
    });
  }

  //need to reset it to zero aswell as adding them
  function updateScores() {
    const scoreIds = [
      "ones_button", "twos_button", "threes_button", "fours_button", "fives_button", "sixes_button",
      "duo_button", "triple_button", "quad_button", "den_o_wolf_button", "dragon_claw_button", 
      "yar_button", "straight_button", "full_house_button", "chance_button"
    ];
  
    // Get all card elements
    const cardIds = ["card1", "card2", "card3", "card4", "card5"];
    const cardElements = cardIds.map(id => document.getElementById(id));
  
    // Initialize scores for each category
    const scores = {
      ones: 0,
      twos: 0,
      threes: 0,
      fours: 0,
      fives: 0,
      sixes: 0,
      duo: 0,
      triple: 0,
      quad: 0,
      den_o_wolf: 0,
      dragon_claw: 0,
      yar: 0,
      straight: 0,
      full_house: 0,
      chance: 0
    };
  
    // Create a frequency map to count occurrences of each value
    const frequencyMap = {};
    const cardValues = [];
    cardElements.forEach(cardElement => {
        if (cardElement) {
            const value = parseInt(cardElement.getAttribute("value"), 10);
            if (!isNaN(value)) {
                frequencyMap[value] = (frequencyMap[value] || 0) + 1;
                cardValues.push(value);
            }
        }
    });

    // Step 2: Calculate combo scores
    let highestDuoScore = 0;
    let highestTripleScore = 0;
    let highestQuadScore = 0;
    let highestYarScore = 0;
    for (const value in frequencyMap) {
        if (frequencyMap[value] >= 2) { // Check if there are at least 2 cards with this value
        const duoScore = value * 2; // Sum of the pair
        if (duoScore > highestDuoScore) {
            highestDuoScore = duoScore; // Track the highest duo score
        }
        }
        if (frequencyMap[value] >= 3) { // Check if there are at least 3 cards with this value
        const TripleScore = value * 3; // Sum of the triple
        if (TripleScore > highestTripleScore) {
            highestTripleScore = TripleScore; // Track the highest triple score
        }
        }
        if (frequencyMap[value] >= 4) { // Check if there are at least 4 cards with this value
        const QuadScore = value * 4; // Sum of the quad
        if (QuadScore > highestQuadScore) {
            highestQuadScore = QuadScore; // Track the highest quad score
        }
        }
        if (frequencyMap[value] >= 5) { // Check if there are at least 4 cards with this value
            highestYarScore = 50; // Track the highest quad score
        }
    }
    scores.duo = highestDuoScore; // Update the duo score
    scores.triple = highestTripleScore; // Update the duo score
    scores.quad = highestQuadScore; // Update the duo score
    scores.yar = highestYarScore; // Update the yar score

    const duos = [];
    for (const value in frequencyMap) {
        if (frequencyMap[value] >= 2) { // Check if it's a duo
            duos.push(value); // Add the value to the duos array
    }
    }
    if (duos.length >= 2) { // At least two distinct duos
        scores.den_o_wolf = 25; // Update dragon claw score
      } else {
        scores.den_o_wolf = 0; // Reset dragon claw score
      }
    for (const value in frequencyMap) {
        if (duos.length >=2){
            if (frequencyMap[value] >= 3) {
                scores.dragon_claw = 35; // Update dragon claw score
                } else {
                scores.dragon_claw = 0; // Reset dragon claw score
                }
            }
    }

    // Sort card values in ascending order
    cardValues.sort((a, b) => a - b);

    // Check for Straight (4 or 5 cards in a row)
    let isStraight4 = false;
    let isStraight5 = false;

    // Check for 5-card Straight
    if (cardValues.length === 5) {
        let isConsecutive = true;
        for (let i = 1; i < cardValues.length; i++) {
            if (cardValues[i] !== cardValues[i - 1] + 1) {
                isConsecutive = false;
                break;
            }
        }
        if (isConsecutive) {
            isStraight5 = true;
        }
    }

    // Check for 4-card Straight
    if (!isStraight5 && cardValues.length >= 4) {
        for (let i = 0; i <= cardValues.length - 4; i++) {
            let isConsecutive = true;
            for (let j = 1; j < 4; j++) {
                if (cardValues[i + j] !== cardValues[i + j - 1] + 1) {
                    isConsecutive = false;
                    break;
                }
            }
            if (isConsecutive) {
                isStraight4 = true;
                break;
            }
        }
    }

    // Update Straight score
    if (isStraight5) {
        scores.straight = 30; // Example score for 5-card Straight
        scores.full_house = 40;
    } else if (isStraight4) {
        scores.straight = 30; // Example score for 4-card Straight
        scores.full_house = 0;
    } else {
        scores.straight = 0;
        scores.full_house = 0;
    }

      // Calculate scores based on card values
    cardElements.forEach(cardElement => {
    if (cardElement) {
      const value = parseInt(cardElement.getAttribute("value"), 10); // Get the card value
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
        scores.chance += value
      }
    }
  });

  // Step 4: Update the DOM with the calculated scores
  scoreIds.forEach(id => {
    const scoreElement = document.getElementById(id);
    if (scoreElement) {
      // Remove "_button" from the ID to match the keys in the scores object
      const scoreKey = id.replace("_button", "");
      scoreElement.textContent = scores[scoreKey]; // Update the button text
      console.log(`Updated ${id} with value: ${scores[scoreKey]}`); // Debugging
    } else {
      console.error(`Element with id "${id}" not found.`); // Debugging
    }
  });
}
  
  // Update card images on page load
  window.onload = () => {
    updateCardImages();
    cardTotals();
    updateScores();
};
  
  // Add event listener to the reroll button
  document.getElementById("reroll").addEventListener("click", () => {
    updateCardImages();
    cardTotals();
    updateScores();
  });