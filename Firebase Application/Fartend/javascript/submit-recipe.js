import { db, auth } from "./firebase.js";
import { generateRandomString } from "./generator.js";

const recipeForm = document.getElementById("recipe-form");
const generalRecipesCollection = db.collection("Recipes");
const internalID = generateRandomString();

const checkIfInternalIDExists = async (internalID) => {
  try {
    const querySnapshot = await generalRecipesCollection
      .where("internalID", "==", internalID)
      .get();

    return !querySnapshot.empty;
  } catch (error) {
    console.error("Error checking internalID:", error);
    throw error; // Rethrow the error to handle it in the calling code
  }
};
document.getElementById("homebutton").addEventListener("click", () => {
  window.location.href = "index.html";
});

recipeForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const recipeName = document.getElementById("recipe-title").value;
  const ingredients = document.getElementById("ingredients").value;
  const instructions = document.getElementById("instructions").value;

  const preptime = document.getElementById("prep-time").value;
  const cooktime = document.getElementById("cook-time").value;
  const serves = document.getElementById("serves").value;
  const dietaryTagsSelect = document.getElementById("dietary-tags");
  const dietaryTags = Array.from(dietaryTagsSelect.selectedOptions).map(
    (option) => option.value
  );

  const user = auth.currentUser;

  if (user) {
    try {
      if (await checkIfInternalIDExists(internalID)) {
        console.log("internalID already exists");
        // Regenerate internalID or handle the situation accordingly
      } else {
        console.log("internalID does not exist");

        const userRecipesCollection = db.collection(user.uid);

        // Add to the general "Recipes" collection
        const generalRecipeRef = await generalRecipesCollection.add({
          userId: user.uid,
          username: user.displayName || user.email,
          internalID,
          recipeName,
          ingredients,
          instructions,
          preptime,
          cooktime,
          serves,
          dietaryTags,
        });

        console.log(
          "Recipe added to general collection with ID:",
          generalRecipeRef.id
        );

        // Show success alert
        alert("Recipe submitted successfully!");

        // Redirect to index.html
        window.location.href = "index.html";
      }
    } catch (error) {
      console.error("Error:", error);

      // Show error alert
      alert("Failed to submit recipe. Please try again.");
    }
  } else {
    alert("Please log in before submitting a recipe.");
  }
});
