// Function to handle password reset
document.getElementById("resetButton").addEventListener("click", () => {
  handleResetPassword();
});

function handleResetPassword() {
  const user = firebase.auth().currentUser;

  if (user) {
    const email = user.email;

    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        // Password reset email sent!
        console.log(`Password reset email sent to ${email}`);
        // Show a browser popup
        alert("Reset email sent! Check your inbox.");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // Handle errors and display messages to the user
        console.error(`Error: ${errorCode} - ${errorMessage}`);
        // Show an error popup
        alert(`Error: ${errorCode} - ${errorMessage}`);
      });
  } else {
    // No user signed in
    console.error("No user signed in");
    // Show an error popup or redirect the user to the login page
    alert("You must be logged in to reset your password.");
    // Alternatively, you can redirect the user to the login page
    // window.location.href = '/login';
  }
}

// Function to handle account deletion
document.getElementById("deleteButton").addEventListener("click", () => {
  // Ask for confirmation
  const isConfirmed = confirm(
    "Are you sure you want to delete your account? This action is irreversible."
  );

  if (isConfirmed) {
    // If confirmed, proceed with account deletion
    handleDeleteAccount();
  }
});

function handleDeleteAccount() {
  const user = firebase.auth().currentUser;

  if (user) {
    user
      .delete()
      .then(() => {
        // User deleted.
        console.log("User account deleted");
        // Show a browser popup
        alert("Your account has been deleted.");
      })
      .catch((error) => {
        // An error occurred
        var errorCode = error.code;
        var errorMessage = error.message;
        // Handle errors and display messages to the user
        console.error(`Error: ${errorCode} - ${errorMessage}`);
        // Show an error popup
        alert(`Error: ${errorCode} - ${errorMessage}`);
      });
  } else {
    // No user signed in
    console.error("No user signed in");
    // Show an error popup or redirect the user to the login page
    alert("You must be logged in to delete your account.");
    // Alternatively, you can redirect the user to the login page
    // window.location.href = '/login';
  }
}
