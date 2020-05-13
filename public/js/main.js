document.addEventListener("DOMContentLoaded", function(event) { 
    const navButton = document.querySelector(".nav-btn");
    const sideNav = document.querySelector(".side-nav");
    const closeNavButton = document.querySelector(".close-nav-btn");

    navButton.addEventListener("click", (e) => {
        sideNav.classList.add("active");
        closeNavButton.classList.add("active");
    })

    closeNavButton.addEventListener("click", (e) => {
        sideNav.classList.remove("active");
        closeNavButton.classList.remove("active");
    })
});

