document.addEventListener("DOMContentLoaded", () => {

    const loader = document.getElementById("loader");
    const content = document.querySelector(".content-container");

    if (sessionStorage.getItem("siteLoaded")) {
        return;
    }

    loader.classList.add("active");
    content.classList.add("loading");
    document.body.style.overflow = "hidden";

    const bar = new ldBar("#loaderBar");

    const duration = 1400; // total animation time (ms)
    const start = performance.now();

    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    function animate(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutCubic(progress);

        bar.set(eased * 100);

        if (progress < 1) {
        requestAnimationFrame(animate);
        } else {
        setTimeout(() => {
            loader.classList.remove("active");
            content.classList.remove("loading");
            document.body.style.overflow = "";
            sessionStorage.setItem("siteLoaded", "true");
        }, 250);
        }
    }

    requestAnimationFrame(animate);

});