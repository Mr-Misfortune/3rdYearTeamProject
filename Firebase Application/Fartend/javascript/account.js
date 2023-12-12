// Function to get saved profile data from localStorage
function getProfileFromStorage() {
    var savedName = localStorage.getItem('profileName');
    var savedEmail = localStorage.getItem('profileEmail');

    if (savedName && savedEmail) {
        document.getElementById('name').innerText = savedName;
        document.getElementById('email').innerText = savedEmail;
    }
}

// Function to save updated profile data to localStorage
function saveProfileToStorage(newName, newEmail) {
    localStorage.setItem('profileName', newName);
    localStorage.setItem('profileEmail', newEmail);
}

function editProfile() {
    var nameElement = document.getElementById('name');
    var emailElement = document.getElementById('email');

    var name = nameElement.innerText;
    var email = emailElement.innerText;

    nameElement.innerHTML = '<input type="text" id="newName" value="' + name + '">';
    emailElement.innerHTML = '<input type="email" id="newEmail" value="' + email + '">';

    var editButton = document.querySelector('.edit-profile button');
    editButton.innerText = 'Save';
    editButton.setAttribute('onclick', 'saveProfile()');
}

function saveProfile() {
    var newName = document.getElementById('newName').value;
    var newEmail = document.getElementById('newEmail').value;

    var nameElement = document.getElementById('name');
    var emailElement = document.getElementById('email');

    nameElement.innerHTML = newName;
    emailElement.innerHTML = newEmail;

    saveProfileToStorage(newName, newEmail);

    var editButton = document.querySelector('.edit-profile button');
    editButton.innerText = 'Edit Profile';
    editButton.setAttribute('onclick', 'editProfile()');
}

// Load saved profile data when the page loads
window.onload = getProfileFromStorage;
