import "https://www.gstatic.com/firebasejs/8.3.1/firebase-auth.js";
import "https://www.gstatic.com/firebasejs/8.3.1/firebase-firestore.js";
import { db, auth } from "../firebase.js";

const homeScreen = document.getElementById("home-page");
const accountTabContent = document.getElementById("account-tab-content");
const recipesTabContent = document.getElementById("recipes-tab-content");
const userDisplay = document.getElementById("user-info");
const userEmailDisplay = document.getElementById("user-email");
const recipeList = document.getElementById("recipe-list");
const authButton = document.getElementById("auth-button");
const createAccountButton = document.getElementById("create-account-button");
const searchRecipesButton = document.getElementById("search-tab");
//const dietaryTagsFilter = document.getElementById("dietary-tags-filter");
const addRecipeButton = document.getElementById("submit-recipe-button");

const accountTab = document.getElementById("account-tab");
const recipesTab = document.getElementById("recipes-tab");
accountTab.addEventListener("click", () => showTab("account-tab-content"));
recipesTab.addEventListener("click", () => showTab("recipes-tab-content"));
authButton.addEventListener("click", handleAuthAction);
createAccountButton.addEventListener("click", createAccount);
searchRecipesButton.addEventListener("click", searchRecipes);
//dietaryTagsFilter.addEventListener("change", updateRecipes);
addRecipeButton.addEventListener("click", addRecipe);

auth.onAuthStateChanged((user) => {
  if (user) {
    // User is signed in
    userDisplay.innerHTML = `Welcome, ${user.displayName || user.email}!`;
    userEmailDisplay.innerHTML = `Email: ${user.email}`;
    homeScreen.style.display = "none";
    accountTabContent.style.display = "block";
    recipesTabContent.style.display = "none";
    loadRecipes(user.uid);
    createAccountButton.style.display = "none"; // Hide the create account button when logged in
    addRecipeButton.style.display = "block"; // Show the add recipe button when logged in
  } else {
    // User is signed out
    userDisplay.innerHTML = "";
    userEmailDisplay.innerHTML = "";
    homeScreen.style.display = "block";
    accountTabContent.style.display = "none";
    recipesTabContent.style.display = "none";
    recipeList.innerHTML = "";
    createAccountButton.style.display = "block"; // Show the create account button when logged out
    addRecipeButton.style.display = "none"; // Hide the add recipe button when logged in
  }

  // Update the button text based on the authentication state
  authButton.textContent = user ? "Logout" : "Login";

  // Update the home screen content based on the authentication state
  homeScreen.innerHTML = user
    ? `Welcome back, ${user.displayName || user.email}!`
    : "Welcome to the Recipe App! Log in to explore more.";
});

function showTab(tabId) {
  homeScreen.style.display = "none";
  accountTabContent.style.display = "none";
  recipesTabContent.style.display = "none";

  document.getElementById(tabId).style.display = "block";
}

function handleAuthAction() {
  const user = auth.currentUser;

  if (user) {
    // User is logged in, so log them out
    auth.signOut().then(() => {
      console.log("User signed out");
    });
  } else {
    // User is not logged in, so redirect to the login page
    window.location.href = "login.html";
  }
}

function createAccount() {
  // Redirect to the create account page
  window.location.href = "create-account.html";
}

function addRecipe() {
  // Redirect to the add recipe page
  window.location.href = "submit-recipe.html";
}

// ... (Your existing JavaScript code) ...

function loadRecipes(userId) {
  // Fetch and display user's recipes from Firestore
  db.collection("Recipes")
    .where("userId", "==", userId)
    .get()
    .then((querySnapshot) => {
      const recipeListContainer = document.getElementById("recipe-list");
      recipeListContainer.innerHTML = "";

      querySnapshot.forEach((doc) => {
        const recipeButton = document.createElement("div");
        recipeButton.classList.add("recipe-button");
        recipeButton.textContent = doc.data().recipeName;

        // Set data-internal-id attribute with the internalID from Firestore
        recipeButton.setAttribute("data-internal-id", doc.data().internalID);

        // Add click event listener to each recipe button
        recipeButton.addEventListener("click", (event) => {
          const internalID =
            event.currentTarget.getAttribute("data-internal-id");
          // Redirect to the view recipe page with the internalID as a query parameter
          window.location.href = `viewrecipe.html?internalID=${internalID}`;
        });

        recipeListContainer.appendChild(recipeButton);
      });
    })
    .catch((error) => {
      console.error("Error loading recipes:", error);
    });
}

function searchRecipes() {
  window.location.href = "search-recipes.html";
}
