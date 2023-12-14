import { db, auth } from "./firebase.js";
document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Automatically create a Firestore collection with the user's UID

        const userCollection = db.collection(user.uid);

        alert("Account created successfully! You can now log in.");
        window.location.href = "login.html"; // Redirect to the login page
      })
      .catch((error) => {
        console.error("Account creation error:", error.message);
        alert("Account creation failed. Please try again.");
      });
  });
