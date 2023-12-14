import { db, auth } from "./firebase.js";

document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const displayName = document.getElementById("display-name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function (result) {
        alert("Account created successfully!");

        result.user.updateProfile({
          displayName: displayName,
        });
        window.location.href = "index.html";
      })
      .catch((error) => {
        console.error("Account creation error:", error.message);
        alert("Account creation failed. Please try again.");
      });
  });
