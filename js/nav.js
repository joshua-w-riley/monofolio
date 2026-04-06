document.addEventListener("DOMContentLoaded", () => {
    const indicator = document.querySelector(".nav-indicator");
    const links = document.querySelectorAll(".nav-link");
    const navbar = document.querySelector(".navbar");

    function moveIndicator(target) {
        const rect = target.getBoundingClientRect();
        const navRect = navbar.getBoundingClientRect();

        indicator.style.top =
            rect.top - navRect.top + rect.height / 2 - 3 + "px";
    }

    links.forEach(link => {
        link.addEventListener("click", () => {
            document.querySelector(".nav-link.active")?.classList.remove("active");
            link.classList.add("active");
            moveIndicator(link);
        });
    });

    const active = document.querySelector(".nav-link.active");
    if (active) moveIndicator(active);
});