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

    var editButton = document.querySelector('.edit-profile button');
    editButton.innerText = 'Edit Profile';
    editButton.setAttribute('onclick', 'editProfile()');
}
