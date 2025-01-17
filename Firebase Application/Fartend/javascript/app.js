import "https://www.gstatic.com/firebasejs/8.3.1/firebase-auth.js";
import "https://www.gstatic.com/firebasejs/8.3.1/firebase-firestore.js";
import { db, auth } from "./firebase.js";

const homeScreen = document.getElementById("home-page");
const accountTabContent = document.getElementById("account-tab-content");
const recipesTabContent = document.getElementById("recipes-tab-content");
const userNameDisplay = document.getElementById("user-name");
const userEmailDisplay = document.getElementById("user-email");
const recipeList = document.getElementById("recipe-list");
const authButton = document.getElementById("auth-button");
const createAccountButton = document.getElementById("create-account-button");
const searchRecipesButton = document.getElementById("search-tab");
const addRecipeButton = document.getElementById("submit-recipe-button");
document.getElementById("homebutton").addEventListener("click", () => {
  window.location.href = "index.html";
});

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
    userNameDisplay.innerHTML = `Name: ${user.displayName}`;
    userEmailDisplay.innerHTML = `Email: ${user.email}`;
    homeScreen.style.display = "block";
    accountTabContent.style.display = "none";
    recipesTabContent.style.display = "none";
    loadRecipes(user.uid);
    createAccountButton.style.display = "none"; // Hide the create account button when logged in
    addRecipeButton.style.display = "block"; // Show the add recipe button when logged in
  } else {
    // User is signed out
    userNameDisplay.innerHTML = `Name: Login to view your account details.`;
    userEmailDisplay.innerHTML = `Email: Login to view your account details.`;
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
    ? `<br><h4 class="header1">Welcome back, ${
        user.displayName || user.email
      }!</h4>`
    : `<br><h4 class = "header1">Welcome to RecipeRealm! <br> Login to explore more.</h4>`;
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
  window.location.href = "sub-recipe.html";
}

function loadRecipes(userId) {
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

        recipeButton.setAttribute("data-internal-id", doc.data().internalID);

        recipeButton.addEventListener("click", (event) => {
          const internalID =
            event.currentTarget.getAttribute("data-internal-id");

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
