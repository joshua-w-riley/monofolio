function sendEmail() {
    const email = "joshua.studio@proton.me";
    const subject = "Hello";
    const body = "I would like to get in touch with you!";
    
    const gmailUrl =
        "https://mail.google.com/mail/?view=cm&fs=1" +
        "&to=" + encodeURIComponent(email) +
        "&su=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

  // Try Gmail in browser
    const win = window.open(gmailUrl, "_blank");

  // Fallback if blocked or not available
    if (!win || win.closed || typeof win.closed === "undefined") {
        window.location.href =
        "mailto:" + email +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);
    }
}
