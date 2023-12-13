import { db } from "./firebase.js";

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
  document.getElementById(
    "recipeName"
  ).textContent = `Recipe Name: ${recipe.recipeName}`;
  document.getElementById(
    "submittedBy"
  ).textContent = `Submitted By: ${recipe.submittedBy}`;
  document.getElementById(
    "measurementContainer"
  ).innerHTML = `<h4>Ingredients:</h4>${recipe.ingredients}`;
  document.getElementById("instructionsBox").textContent = recipe.instructions;
  document.getElementById(
    "prepTime"
  ).textContent = `Prep Time: ${recipe.prepTime}`;
  document.getElementById(
    "cookTime"
  ).textContent = `Cook Time: ${recipe.cookTime}`;
  document.getElementById(
    "servings"
  ).textContent = `Serves: ${recipe.servings}`;
  document.getElementById(
    "allergens"
  ).textContent = `Allergens: ${recipe.allergens.join(", ")}`;
  // Add more elements as needed

  // If you want to update the entire HTML content, you can use the following:
  // const recipeDetailsDiv = document.getElementById("recipe-details");
  // recipeDetailsDiv.innerHTML = `
  //   <h2>${recipe.recipeName}</h2>
  //   <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
  //   <p><strong>Instructions:</strong> ${recipe.instructions}</p>
  //   <!-- Add more details as needed -->
  // `;
}
