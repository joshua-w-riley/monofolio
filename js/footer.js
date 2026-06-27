const footer = document.querySelector("#site-footer");
const footerToggle = document.querySelector(".footer-toggle");
const footerDim = document.querySelector(".footer-dim");
const footerIcon = document.querySelector(".footer-toggle-icon");

function closeFooter() {
    footer.classList.remove("is-open");
    footerToggle.classList.remove("is-open");
    footerDim.classList.remove("is-visible");

    footer.setAttribute("aria-hidden", "true");
    footerToggle.setAttribute("aria-expanded", "false");
    footerToggle.setAttribute("aria-label", "Open footer");
    footerIcon.textContent = "⌄";

    setTimeout(() => {
        footerDim.hidden = true;
    }, 320);
}

function openFooter() {
    footer.classList.add("is-open");
    footerToggle.classList.add("is-open");
    footerDim.hidden = false;

    requestAnimationFrame(() => {
        footerDim.classList.add("is-visible");
    });

    footer.setAttribute("aria-hidden", "false");
    footerToggle.setAttribute("aria-expanded", "true");
    footerToggle.setAttribute("aria-label", "Close footer");
    footerIcon.textContent = "×";
}

footerToggle.addEventListener("click", () => {
    const isOpen = footer.classList.contains("is-open");

    if (isOpen) {
        closeFooter();
    } else {
        openFooter();
    }
});

footerDim.addEventListener("click", closeFooter);

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeFooter();
    }
});