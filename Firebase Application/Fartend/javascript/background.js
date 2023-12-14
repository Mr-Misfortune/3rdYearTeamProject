var images = [
  "https://images.pexels.com/photos/349610/pexels-photo-349610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/616401/pexels-photo-616401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/1414651/pexels-photo-1414651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  // Add as many images as you want
];
var i = 0;

setInterval(function () {
  document.body.style.backgroundImage = "url(" + images[i] + ")";
  i++;
  if (i == images.length) {
    i = 0;
  }
}, 5000); // Change image every 5 seconds
