let button = document.querySelector(".nav-car-models-catalogue-button");
let catalogue = document.querySelector(".nav-car-models-catalogue")

button.addEventListener("click", function () {
  catalogue.classList.toggle("open");
});

window.addEventListener("click", (e) => {
  if (e.target.classList !== "nav-car-models-catalogue") {
    if (e.target !== button) {
      catalogue.classList.remove("open");
    }
  }
});

let btnUp = $('#button-page-up');

$(window).scroll(function() {
  if ($(window).scrollTop() > 150) {
    btnUp.addClass('show');
  } else {
    btnUp.removeClass('show');
  }
});

btnUp.on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({scrollTop:0}, '300');
});

