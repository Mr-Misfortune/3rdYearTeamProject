// login.js
document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        window.location.href = "index.html"; // Redirect to the main application page
      })
      .catch((error) => {
        console.error("Login error:", error.message);
        alert("Login failed. Please check your email and password.");
      });
  });
var loginform = document.getElementById("login-form");
var signupform = document.getElementById("create-account-form");
var buttons = document.getElementById("btn");

function signUp() {
  loginform.style.left = "-300px";
  signupform.style.left = "40px";
  buttons.style.left = "110px";
}

function login() {
  loginform.style.left = "40px";
  signupform.style.left = "440px";
  buttons.style.left = "0";
}
