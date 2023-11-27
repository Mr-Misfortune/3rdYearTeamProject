// submit-recipe.js
const recipeForm = document.getElementById("recipe-form");
firebase.initializeApp(firebaseConfig);
db = firebase.firestore();
collection = db.collection("Recipes");

recipeForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const recipeName = document.getElementById("recipe-name").value;
  const ingredients = document.getElementById("ingredients").value;
  const instructions = document.getElementById("instructions").value;
  const dietaryTagsSelect = document.getElementById("dietary-tags");
  const dietaryTags = Array.from(dietaryTagsSelect.selectedOptions).map(
    (option) => option.value
  );

  const user = auth.currentUser;

  if (user) {
    // User is logged in, so save the recipe to Firestore
    db.collection("recipes")
      .add({
        userId: user.uid,
        recipeName,
        ingredients,
        instructions,
        dietaryTags,
      })
      .then((docRef) => {
        console.log("Recipe added with ID:", docRef.id);
        alert("Recipe submitted successfully!");
        // Clear the form or redirect to a confirmation page
      })
      .catch((error) => {
        console.error("Error adding recipe:", error);
        alert("Failed to submit recipe. Please try again.");
      });
  } else {
    // User is not logged in, prompt them to log in first
    alert("Please log in before submitting a recipe.");
  }
});
