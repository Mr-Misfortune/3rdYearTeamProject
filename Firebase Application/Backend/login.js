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
