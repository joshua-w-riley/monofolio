const pages = document.querySelectorAll('.page');
const links = document.querySelectorAll('.nav-link');
const pageOrder = ['home', 'about', 'music', 'updates', 'contact'];

function isMobile() {
    return window.matchMedia('(max-width: 640px)').matches;
}

function resetDesktopPages() {
    if (!isMobile()) {
        const hash = window.location.hash.replace('#', '') || 'home';
        showPage(hash, false);
    }
}

window.addEventListener('resize', resetDesktopPages);

function updateNavState(id) {
    const activeIndex = pageOrder.indexOf(id);

    links.forEach(link => {
        const linkIndex = pageOrder.indexOf(link.dataset.page);
        const distance = linkIndex - activeIndex;

        link.classList.toggle('active', link.dataset.page === id);
        link.classList.toggle('is-prev', distance === -1);
        link.classList.toggle('is-next', distance === 1);
        link.classList.toggle(
            'is-hidden-mobile',
            isMobile() && link.dataset.page !== id && Math.abs(linkIndex - activeIndex) > 1
        );
    });
}

function showPage(id, updateUrl = true) {
    let found = false;

    if (isMobile()) {
        pages.forEach(page => {
            page.hidden = !pageOrder.includes(page.id);
            if (page.id === id) found = true;
        });

        const target = document.getElementById(id);

        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    } else {
        pages.forEach(page => {
            if (page.id === id) {
                page.hidden = false;
                found = true;
            } else {
                page.hidden = true;
            }
        });
    }

    updateNavState(id);

    if (!found) {
        const notFound = document.getElementById('not-found');
        if (notFound) notFound.hidden = false;
        if (updateUrl) history.replaceState(null, null, '#404');
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

const observer = new IntersectionObserver(entries => {
    if (!isMobile()) return;

    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.id;
            updateNavState(id);
            history.replaceState(null, '', `#${id}`);
        }
    });
}, {
    threshold: 0.68
});

pages.forEach(page => {
    if (pageOrder.includes(page.id)) {
        observer.observe(page);
    }
});

window.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash.replace('#', '') || 'home';
    showPage(hash, false);
});

window.addEventListener('popstate', () => {
    const hash = window.location.hash.replace('#', '') || 'home';
    showPage(hash, false);
});