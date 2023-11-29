import { db, auth } from "./firebase.js";

const button = document.getElementById("submit");
const searchResults = document.getElementById("search-results");
button.addEventListener("click", searchRecipes);

function searchRecipes(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  const searchText = document.getElementById("search-query").value;
  console.log("Search Text:", searchText);

  const recipesRef = db.collection("Recipes");

  return recipesRef
    .where("recipeName", ">=", searchText)
    .where("recipeName", "<=", searchText + "\uf8ff")
    .get()
    .then((querySnapshot) => {
      console.log("Query Snapshot:", querySnapshot);

      const matchingRecipes = [];
      querySnapshot.forEach((doc) => {
        console.log("Document Data:", doc.data());
        matchingRecipes.push(doc.data());
      });

      console.log("Matching Recipes:", matchingRecipes);

      displayRecipes(matchingRecipes);
    })
    .catch((error) => {
      console.error("Error getting recipes:", error);
    });
}

// Attach the searchRecipes function to the form's submit event
document
  .getElementById("search-form")
  .addEventListener("submit", searchRecipes);

// Attach the searchRecipes function to the form's submit event
document
  .getElementById("search-form")
  .addEventListener("submit", searchRecipes);

function displayRecipes(recipes) {
  searchResults.innerHTML = "";

  if (recipes.length === 0) {
    // Display a message when no results are found
    const noResultsMessage = document.createElement("p");
    noResultsMessage.textContent = "No results found.";
    searchResults.appendChild(noResultsMessage);
  } else {
    // Display the matching recipes
    recipes.forEach((recipe) => {
      const recipeDiv = document.createElement("div");
      recipeDiv.innerHTML = `
            <h3>${recipe.recipeName}</h3>
        `;
      searchResults.appendChild(recipeDiv);
    });
  }

  searchResults.style.display = "block";
}
