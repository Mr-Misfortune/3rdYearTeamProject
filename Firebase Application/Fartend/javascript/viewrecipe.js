import { db } from "./firebase.js";

// Helper function to insert line breaks dynamically
function insertLineBreaks(text, maxLineLength) {
  const wordsAndSentences = text.match(/\S+|\s*$/g);

  let currentLine = "";
  const lines = [];

  wordsAndSentences.forEach((wordOrSentence) => {
    const candidateLine =
      currentLine.length === 0
        ? wordOrSentence
        : `${currentLine} ${wordOrSentence}`;

    // Check if the candidate line exceeds the max length or contains a number followed by a period
    if (
      candidateLine.length <= maxLineLength &&
      !/\d\.$/.test(candidateLine) &&
      !/[.!?]$/.test(candidateLine)
    ) {
      currentLine = candidateLine;
    } else {
      lines.push(currentLine.trim());
      currentLine = wordOrSentence;
    }
  });

  // Add the last line if it's not empty
  if (currentLine.trim() !== "") {
    lines.push(currentLine.trim());
  }

  return lines.join("<br>");
}

document.addEventListener("DOMContentLoaded", () => {
  // Get the internalID from the query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const internalID = urlParams.get("internalID");

  console.log("internalID:", internalID);

  if (internalID) {
    // Retrieve the recipe details using the internalID
    const recipeRef = db
      .collection("Recipes")
      .where("internalID", "==", internalID);

    recipeRef
      .get()
      .then((querySnapshot) => {
        console.log("QuerySnapshot:", querySnapshot);

        if (!querySnapshot.empty) {
          const recipe = querySnapshot.docs[0].data();
          console.log("Retrieved Recipe:", recipe);
          displayRecipeDetails(recipe);
        } else {
          console.error("Recipe not found");
          // Handle the case where the recipe is not found
        }
      })
      .catch((error) => {
        console.error("Error getting recipe details:", error);
      });
  } else {
    console.error("InternalID not provided");
    // Handle the case where the internalID is not provided
  }
});
function displayRecipeDetails(recipe) {
  // Update specific elements with recipe details

  // Insert line breaks dynamically for ingredients
  const ingredientsWithLineBreaks = insertLineBreaks(recipe.ingredients, 50);

  // Insert line breaks dynamically for instructions
  const instructionsWithLineBreaks = insertLineBreaks(recipe.instructions, 80);

  document.getElementById(
    "recipeName"
  ).textContent = `Recipe Name: ${recipe.recipeName}`;
  document.getElementById(
    "submittedBy"
  ).textContent = `Submitted By: ${recipe.username}`;
  document.getElementById(
    "ingredientsContainer"
  ).innerHTML = `<h4>Ingredients:</h4>${recipe.ingredients}`;
  document.getElementById(
    "instructionsBox"
  ).innerHTML = `<p>${instructionsWithLineBreaks}</p>`;
  document.getElementById(
    "prepTime"
  ).textContent = `Prep Time: ${recipe.preptime}`;
  document.getElementById(
    "cookTime"
  ).textContent = `Cook Time: ${recipe.cooktime}`;
  document.getElementById("servings").textContent = `Serves: ${recipe.serves}`;
  document.getElementById(
    "allergens"
  ).textContent = `Allergens: ${recipe.dietaryTags.join(", ")}`;
  // Add more elements as needed
}

document.getElementById("homebutton").addEventListener("click", () => {
  window.location.href = "index.html";
});
