//the code below is for a manual slideshow
var slideNum = 1;
showSlide(slideNum);
      
function btnPressed(n) {
    showSlide(slideNum += n);
}
      
function showSlide(n) {
    var slides = document.getElementsByClassName("pics");
    
    if (n > slides.length) {
        slideNum = 1;
    }

    if (n < 1) {
        slideNum = slides.length;
    }
    
    for (var i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }

    slides[slideNum-1].style.display = "block";  
}

/*
//the code below is for an automatic slideshow
let slideNum = 0;
showSlides();

function showSlides() {
  let slides = document.getElementsByClassName("pics");

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slideNum++;

  if (slideNum > slides.length){
    slideNum = 1; //reset to the first one
}
  slides[slideNum-1].style.display = "block";

  setTimeout(showSlides, 2500); //change every 2.5 seconds
}
*/
