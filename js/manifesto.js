document.addEventListener("DOMContentLoaded", () => {
    const manifesto = document.getElementById("manifesto-text");

    if (!manifesto) return;

    const phrases = [
        "Working ≠ Usable.",
        "Simplicity is intentional.",
        "Design is a decision.",
        "Function follows thought.",
        "Consider less.",
        "Everything is a system."
    ];

    // Retrieve the last displayed phrase
    const previousIndex = Number(
        sessionStorage.getItem("lastManifestoIndex")
    );

    let randomIndex;

    do {
        randomIndex = Math.floor(Math.random() * phrases.length);
    } while (
        randomIndex === previousIndex &&
        phrases.length > 1
    );

    manifesto.textContent = phrases[randomIndex];

    // Remember the phrase for the next refresh
    sessionStorage.setItem(
        "lastManifestoIndex",
        randomIndex
    );
});