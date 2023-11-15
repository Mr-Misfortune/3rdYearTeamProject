var loginform = document.getElementById("login");
var signupform = document.getElementById("signUp");
var buttons = document.getElementById("btn");

function signUp(){
    loginform.style.left = "-300px";
    signupform.style.left = "40px";
    buttons.style.left = "110px";
}

function login(){
    loginform.style.left = "40px";
    signupform.style.left = "440px";
    buttons.style.left = "0";
}