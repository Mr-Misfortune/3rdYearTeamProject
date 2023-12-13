document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("form").addEventListener("submit", function (event) {

      //prevent form from being submitted if required fields aren't filled out
      event.preventDefault();
      
        //redirect to submission-received.html page
        window.location.href = "submission-received.html";
    });
});