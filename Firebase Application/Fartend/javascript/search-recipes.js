import { db } from "./firebase.js";

const button = document.getElementById("submit");
const searchResults = document.getElementById("searchResults");
button.addEventListener("click", searchRecipes);

const searchInput = document.getElementById("search-query");
const dietaryTagCheckboxes = document.getElementsByName("Tags");

searchInput.addEventListener("input", searchRecipes);
dietaryTagCheckboxes.forEach((checkbox) =>
  checkbox.addEventListener("change", searchRecipes)
);

function searchRecipes(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  const searchText = document
    .getElementById("search-query")
    .value.toLowerCase();
  const dietaryTags = Array.from(document.getElementsByName("Tags"))
    .filter((tagCheckbox) => tagCheckbox.checked)
    .map((checkedTag) => checkedTag.value.toLowerCase());

  console.log("Search Text:", searchText);
  console.log("Dietary Tags:", dietaryTags);

  const recipesRef = db.collection("Recipes");

  return recipesRef
    .get()
    .then((querySnapshot) => {
      const matchingRecipes = [];

      querySnapshot.forEach((doc) => {
        const recipe = doc.data();
        const recipeNameLower = recipe.recipeName.toLowerCase();
        if (
          recipeNameLower.includes(searchText) ||
          dietaryTags.some((tag) => recipe.dietaryTags.includes(tag))
        ) {
          matchingRecipes.push(recipe);
        }
      });

      console.log("Matching Recipes:", matchingRecipes);

      displayRecipes(matchingRecipes);
    })
    .catch((error) => {
      console.error("Error getting recipes:", error);
    });
}

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
      recipeDiv.classList.add("recipe-item"); // Add the CSS class

      recipeDiv.innerHTML = `
          <h3>${recipe.recipeName}</h3>
        `;

      // Attach an event listener to open the viewrecipe page on click
      recipeDiv.addEventListener("click", () => {
        openViewRecipePage(recipe.internalID);
      });

      searchResults.appendChild(recipeDiv);
    });
  }

  searchResults.style.display = "block";
}

// ... (Your existing code)

function openViewRecipePage(internalID) {
  // Redirect to the viewrecipe page with the internalID as a parameter
  window.location.href = `viewrecipe.html?internalID=${internalID}`;
}

document.getElementById("homebutton").addEventListener("click", () => {
  window.location.href = "index.html";
});
