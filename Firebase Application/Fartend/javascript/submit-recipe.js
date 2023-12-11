import { db, auth } from "./firebase.js";

const recipeForm = document.getElementById("recipe-form");
const generalRecipesCollection = db.collection("Recipes");

recipeForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const recipeName = document.getElementById("recipe-name").value;
  const ingredients = document.getElementById("ingredients").value;
  const instructions = document.getElementById("instructions").value;
  const dietaryTagsSelect = document.getElementById("dietary-tags");
  const dietaryTags = Array.from(dietaryTagsSelect.selectedOptions).map(
    (option) => option.value
  );

  const user = auth.currentUser; // Assuming you have Firebase Authentication properly set up

  if (user) {
    // User is logged in, so save the recipe to both general and user-specific collections
    const userRecipesCollection = db.collection(user.uid);

    // Add to the general "Recipes" collection
    generalRecipesCollection
      .add({
        userId: user.uid,
        recipeName,
        ingredients,
        instructions,
        dietaryTags,
      })
      .then((docRef) => {
        console.log("Recipe added to general collection with ID:", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding recipe to general collection:", error);
        alert("Failed to submit recipe. Please try again.");
      });

    // Add to the user-specific collection
    /* userRecipesCollection
      .add({
        recipeName,
        ingredients,
        instructions,
        dietaryTags,
      })
      .then((docRef) => {
        console.log(
          "Recipe added to user-specific collection with ID:",
          docRef.id
        );
        alert("Recipe submitted successfully!");
        // Clear the form or redirect to a confirmation page
      })
      .catch((error) => {
        console.error(
          "Error adding recipe to user-specific collection:",
          error
        );
        alert("Failed to submit recipe. Please try again.");
      });
  */
  } else {
    // User is not logged in, prompt them to log in first
    alert("Please log in before submitting a recipe.");
  }
});
