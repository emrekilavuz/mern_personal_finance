/*
// Smooth Scrolling
$(document).ready(function () {

    window.$("a").on('click', function (event) {
        console.log("çalışıyor");
        if (this.hash !== "") {
            event.preventDefault();
            
            var hash = this.hash;

            window.$('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 750, function () {
                window.location.hash = hash;
            });
        }
    });
});

*/
// Sticky Navbar
/*
document.addEventListener("scroll", () => {
    console.log("scroll");
    const navbar = document.querySelector(".navbar");
    navbar.classList.toggle("sticky", window.scrollY > 1);
});

*/

