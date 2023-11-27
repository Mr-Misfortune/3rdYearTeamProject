// create-account.js
document
  .getElementById("create-account-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        alert("Account created successfully! You can now log in.");
        window.location.href = "login.html"; // Redirect to the login page
      })
      .catch((error) => {
        console.error("Account creation error:", error.message);
        alert("Account creation failed. Please try again.");
      });
  });
