const navSlide = () => {
    const burger = document.querySelector(".burger");
    const navLinks = document.querySelector(".nav-links");

    burger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        burger.classList.toggle("toggle");
    });
}

navSlide();

// Smooth Scrolling
$(document).ready(function () {

    $("a").on('click', function (event) {

        if (this.hash !== "") {
            event.preventDefault();

            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 750, function () {
                window.location.hash = hash;
            });
        }
    });
});

// Sticky Navbar
document.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    navbar.classList.toggle("sticky", window.scrollY > 1);
})

// Aos Codes
AOS.init({
    offset: 200,
    delay: 0,
    duration: 800
});