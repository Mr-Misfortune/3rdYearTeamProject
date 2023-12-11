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
  const recipeDetailsDiv = document.getElementById("recipe-details");
  recipeDetailsDiv.innerHTML = `
    <h2>${recipe.recipeName}</h2>
    <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
    <p><strong>Instructions:</strong> ${recipe.instructions}</p>
    <!-- Add more details as needed -->
  `;
}
