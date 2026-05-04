// This file is required by the index.html file and will be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process. It has the same sandbox as a Chrome extension.

// This file is used to handle the navigation between different pages in the application.
// It listens for click events on buttons with the data-page attribute and shows the corresponding page while hiding the others.
const pages = document.querySelectorAll('.page');
const links = document.querySelectorAll('.nav-link');

function showPage(id, updateUrl = true) {
    let found = false;

    pages.forEach(page => {
        if (page.id === id) {
            page.hidden = false;
            found = true;
        } else {
            page.hidden = true;
        }
    });

    links.forEach(link => {
        link.classList.toggle('active', link.dataset.page === id);
    });

    if (!found) {
        const notFound = document.getElementById('not-found');
        if (notFound) {
            notFound.hidden = false;
        }

        if (updateUrl) {
            history.replaceState(null, null, '#404');
        }
        return;
    }

    if (updateUrl) {
        history.pushState(null, '', `#${id}`);
    }
}

links.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        showPage(link.dataset.page);
    });
});

window.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash.replace('#', '') || 'home';
    showPage(hash, false);
});

window.addEventListener('popstate', () => {
    const hash = window.location.hash.replace('#', '') || 'home';
    showPage(hash, false);
});

function openContactSection(event, contentName) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tab-button");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(contentName).style.display = "block";
    event.currentTarget.className += " active";
}
document.getElementById("defaultOpenContactSection").click();

showPage('home');