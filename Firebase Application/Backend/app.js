import "https://www.gstatic.com/firebasejs/8.3.1/firebase-auth.js";
import "https://www.gstatic.com/firebasejs/8.3.1/firebase-firestore.js";
import firebaseConfig from "./firebaseConfig.js";

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

const homeScreen = document.getElementById("home-screen");
const accountTabContent = document.getElementById("account-tab-content");
const recipesTabContent = document.getElementById("recipes-tab-content");
const userDisplay = document.getElementById("user-info");
const userEmailDisplay = document.getElementById("user-email");
const recipeList = document.getElementById("recipe-list");
const authButton = document.getElementById("auth-button");
const createAccountButton = document.getElementById("create-account-button");
const dietaryTagsFilter = document.getElementById("dietary-tags-filter");

const homeTab = document.getElementById("home-tab");
const accountTab = document.getElementById("account-tab");
const recipesTab = document.getElementById("recipes-tab");

homeTab.addEventListener("click", () => showTab("home-screen"));
accountTab.addEventListener("click", () => showTab("account-tab-content"));
recipesTab.addEventListener("click", () => showTab("recipes-tab-content"));
authButton.addEventListener("click", handleAuthAction);
createAccountButton.addEventListener("click", createAccount);
dietaryTagsFilter.addEventListener("change", updateRecipes);

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
  } else {
    // User is signed out
    userDisplay.innerHTML = "";
    userEmailDisplay.innerHTML = "";
    homeScreen.style.display = "block";
    accountTabContent.style.display = "none";
    recipesTabContent.style.display = "none";
    recipeList.innerHTML = "";
    createAccountButton.style.display = "block"; // Show the create account button when logged out
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

function loadRecipes(userId) {
  // Fetch and display user's recipes from Firestore
  db.collection("recipes")
    .where("userId", "==", userId)
    .get()
    .then((querySnapshot) => {
      recipeList.innerHTML = "";
      querySnapshot.forEach((doc) => {
        const recipeItem = document.createElement("li");
        recipeItem.textContent = doc.data().recipeName;
        recipeList.appendChild(recipeItem);
      });
    })
    .catch((error) => {
      console.error("Error loading recipes:", error);
    });
}

function updateRecipes() {
  // Update the displayed recipes based on search and dietary tags filter
  const searchTerm = searchInput.value.toLowerCase();
  const selectedDietaryTags = Array.from(dietaryTagsFilter.selectedOptions).map(
    (option) => option.value
  );

  db.collection("recipes")
    .where("recipeName", ">=", searchTerm)
    .where("recipeName", "<=", searchTerm + "\uf8ff")
    .where("dietaryTags", "array-contains-any", selectedDietaryTags)
    .get()
    .then((querySnapshot) => {
      recipeList.innerHTML = "";
      querySnapshot.forEach((doc) => {
        const recipeItem = document.createElement("li");
        recipeItem.textContent = doc.data().recipeName;
        recipeList.appendChild(recipeItem);
      });
    })
    .catch((error) => {
      console.error("Error searching recipes:", error);
    });
}
