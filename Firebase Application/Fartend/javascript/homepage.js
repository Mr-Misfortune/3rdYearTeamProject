//the code below is for a manual slideshow
/*var slideNum = 1;
showSlide(slideNum);

function btnPressed(n) {
  showSlide((slideNum += n));
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

  slides[slideNum - 1].style.display = "block";
} */

//the code below is for an automatic slideshow
slideNum = 0;
showSlides();

function showSlides() {
  let slides = document.getElementsByClassName("pics");

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slideNum++;

  if (slideNum > slides.length) {
    slideNum = 1; //reset to the first one
  }
  slides[slideNum - 1].style.display = "block";

  setTimeout(showSlides, 2500); //change every 2.5 seconds
}
=======
//the code below is for a manual slideshow
/*var slideNum = 1;
showSlide(slideNum);

function btnPressed(n) {
  showSlide((slideNum += n));
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

  slides[slideNum - 1].style.display = "block";
} */

//the code below is for an automatic slideshow
let slideNum = 0;
showSlides();

function showSlides() {
  let slides = document.getElementsByClassName("pics");

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slideNum++;

  if (slideNum > slides.length) {
    slideNum = 1; //reset to the first one
  }
  slides[slideNum - 1].style.display = "block";

  setTimeout(showSlides, 2500); //change every 2.5 seconds
}
>>>>>>> parent of 7196169 (firebase be working again >life)
*/
/*
<img class="pics" src="https://images.pexels.com/photos/775032/pexels-photo-775032.jpeg?auto=compress&cs=tinysrgb&w=600" style="width:750px; height: 860px;">
        <img class="pics" src="https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=600" style="width:750px; height: 860px;">
        <img class="pics" src="https://images.pexels.com/photos/2280545/pexels-photo-2280545.jpeg?auto=compress&cs=tinysrgb&w=600" style="width:750px; height: 860px;">
        <img class="pics" src="https://images.pexels.com/photos/842571/pexels-photo-842571.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" style="width:750px; height: 860px;">
        <img class="pics" src="https://images.pexels.com/photos/1633526/pexels-photo-1633526.jpeg?auto=compress&cs=tinysrgb&w=600" style="width:750px; height: 860px;">
        body background ="css/image1.jpeg"*/
