const caseStudies = {
    futrak: {
        title: "Vendor App Redesign",
        category: "Systems Analysis & Software Engineering",
        pages: {
            overview: {
                title: "Vendor App Redesign",
                description: "Led the redesign of a core internal application, defining requirements, workflows, and technical design while coordinating development, testing, and release validation."
            },

            problem: {
                title: "The Problem",
                description: "The existing vendor-managed application used outdated technology, offered limited customization, and carried ongoing vendor costs. The goal was to replace it with an internally maintained system."
            },

            system: {
                title: "The System",
                description: "Redesigned data import and export workflows, consolidated two databases into one, reduced approximately 250 tables to 20, and updated the interface using a modern technology stack."
            },

            contribution: {
                title: "My Contribution",
                description: "Documented business workflows, defined requirements, led the database and interface redesign, and coordinated development, testing, and release validation."
            },

            outcome: {
                title: "The Outcome",
                description: "Validated a full year of reconciliation results against the vendor application and demonstrated the redesign to a key stakeholder."
            }
        }
    },

    interactiveLearning: {
        title: "Interactive Learning Application",
        category: "Full Stack Software Engineering",

        pages: {
            overview: {
                title: "Interactive Learning Application",
                description: "Superhero-themed learning app for K–12 students that taught software engineering basics through multiple-choice, fill-in-the-blank, and drag-and-drop challenges."
            },

            problem: {
                title: "The Problem",
                description: "Tempest Technologies needed a simple way to hold K–12 students' attention for 5–10 minutes at a career fair and introduce what software engineers do."
            },

            system: {
                title: "The System",
                description: "Students picked one of three superheroes and completed short challenges like multiple-choice, fill-in-the-blank, and drag-and-drop activities to learn basic programming ideas."
            },

            contribution: {
                title: "My Contribution",
                description: "I designed the user flow and interface in Figma, built the frontend, deployed the application to a virtual server, and presented it through a live demo to the Tempest Technologies team."
            },

            outcome: {
                title: "The Outcome",
                description: "Demoed to the full Tempest Technologies team and later cited as a successful internship project."
            }
        }
    },

    website: {
        title: "Personal Website Development",
        category: "Frontend Development & UX Design",
        status: "ongoing",

        pages: {
            overview: {
                title: "Personal Website Development",
                description: "Built a personal website so people can see my software engineering work, photography, music, and creative projects in one place."
            },

            problem: {
                title: "The Problem",
                description: "Bringing multiple creative mediums into one website can create bottlenecks in presentation and user flow."
            },

            system: {
                title: "The System",
                description: "A single-page website with clear sections, designed to keep everything light, fast, and easy to navigate."
            },

            contribution: {
                title: "My Contribution",
                description: "Built the website using HTML, CSS, and JavaScript, focusing on speed, content clarity, and ease of navigation."
            },

            outcome: {
                title: "The Outcome",
                description: "The website is live, easy to update, and brings my work across different creative mediums into one centralized location."
            }
        }
    }
};


document.addEventListener("DOMContentLoaded", () => {

    /* ========================================
       DOM ELEMENTS
    ======================================== */

    const systemsNav = document.getElementById("systems-nav");
    const systemsPage = document.getElementById("systems");

    const pills = document.querySelectorAll(".systems-pill");

    const stage = document.getElementById("systems-stage");
    const panel = stage?.querySelector(".systems-panel");

    const category = document.getElementById("systems-category");
    const title = document.getElementById("systems-title");
    const description = document.getElementById("systems-description");

    const prevButton = document.getElementById("systems-prev");
    const nextButton = document.getElementById("systems-next");

    const prevLabel = prevButton?.querySelector(".systems-page-label");
    const nextLabel = nextButton?.querySelector(".systems-page-label");

    const progressContainer = document.getElementById("systems-progress");

    const progressDots = progressContainer
        ? Array.from(progressContainer.querySelectorAll(".systems-dot"))
        : [];

    /* Card Elements */

    const systemsCard = document.getElementById("systems-card");
    const stepNumber = document.getElementById("systems-step-number");

    /* Navigation Help */

    const helpButton = document.querySelector(".systems-info-button");
    const helpTooltip = document.querySelector(".systems-info-tooltip");

    const helpContainer = helpButton?.closest(".systems-help");

    if (
        !systemsNav ||
        !systemsPage ||
        !stage ||
        !panel ||
        !category ||
        !title ||
        !description ||
        !prevButton ||
        !nextButton ||
        !prevLabel ||
        !nextLabel ||
        !progressContainer ||
        !systemsCard ||
        !stepNumber
    ) {
        console.warn("Systems: Required HTML elements not found.");
        return;
    }

    if (progressDots.length !== 5) {
        console.warn("Systems: Expected five progress dots.");
    }

    const steps = [
        "overview",
        "problem",
        "system",
        "contribution",
        "outcome"
    ];
    const stepLabels = {
        overview: "Overview",
        problem: "The Problem",
        system: "The System",
        contribution: "My Contribution",
        outcome: "The Outcome"
    };
    const initialProject = Array.from(pills).find(
        pill =>
            pill.getAttribute("aria-pressed") === "true" &&
            caseStudies[pill.dataset.system]
    );

    let currentProject = initialProject?.dataset.system || "futrak";
    let currentStep = 0;
    let helpOpen = false;

    function setHelpOpen(isOpen) {
        if (!helpButton || !helpTooltip) return;
        helpOpen = Boolean(isOpen);
        helpButton.setAttribute(
            "aria-expanded",
            String(helpOpen)
        );
        helpTooltip.setAttribute(
            "aria-hidden",
            String(!helpOpen)
        );
        helpTooltip.classList.toggle("visible", helpOpen);
        helpTooltip.inert = !helpOpen;
    }

    if (helpButton && helpTooltip) {
        setHelpOpen(false);
        /* Click to toggle */
        helpButton.addEventListener("click", (event) => {
            event.stopPropagation();
            setHelpOpen(!helpOpen);
        });

        /* Hover */
        if (window.matchMedia("(hover: hover)").matches) {
            helpContainer?.addEventListener("mouseenter", () => {
                setHelpOpen(true);
            });
            helpContainer?.addEventListener("mouseleave", () => {
                setHelpOpen(false);
            });
        }


        /* Close when clicking outside */
        document.addEventListener("pointerdown", (event) => {
            if (!helpOpen) return;
            if (
                !helpContainer?.contains(event.target)
            ) {
                setHelpOpen(false);
            }
        });

        /* Close when focus leaves */
        helpContainer?.addEventListener("focusout", (event) => {
            if (
                !helpContainer.contains(event.relatedTarget) &&
                !helpContainer.matches(":hover")
            ) {
                setHelpOpen(false);
            }
        });

        /* Escape */
        document.addEventListener("keydown", (event) => {
            if (event.key !== "Escape" || !helpOpen) return;
            setHelpOpen(false);
            helpButton.focus();
        });
    }

    function updateSystemsNav() {
        const isSystemsPage = !systemsPage.hidden;
        systemsNav.hidden = !isSystemsPage;
        if (!isSystemsPage) {
            setHelpOpen(false);
        }
    }
    const observer = new MutationObserver(updateSystemsNav);
    observer.observe(systemsPage, {
        attributes: true,
        attributeFilter: ["hidden"]
    });

    function updateCardAppearance() {
        const step = currentStep + 1;
        /* Update section number */
        stepNumber.textContent = String(step).padStart(2, "0");
        stepNumber.setAttribute(
            "aria-label",
            `Section ${step} of ${steps.length}`
        );

        /* Update pink glow */
        systemsCard.classList.remove(
            "step-1",
            "step-2",
            "step-3",
            "step-4",
            "step-5"
        );
        systemsCard.classList.add(`step-${step}`);
        systemsCard.dataset.step = String(step);
    }

    function updatePagination() {
        const previousStep = steps[currentStep - 1];
        const nextStep = steps[currentStep + 1];

        /* Previous */
        if (previousStep) {
            const label = stepLabels[previousStep];
            prevLabel.textContent = label;
            prevButton.disabled = false;
            prevButton.setAttribute(
                "aria-label",
                `Go to ${label}`
            );
        } else {
            prevLabel.textContent = "";
            prevButton.disabled = true;
            prevButton.setAttribute(
                "aria-label",
                "No previous section"
            );
        }

        /* Next */
        if (nextStep) {
            const label = stepLabels[nextStep];
            nextLabel.textContent = label;
            nextButton.disabled = false;
            nextButton.setAttribute(
                "aria-label",
                `Go to ${label}`
            );
        } else {
            nextLabel.textContent = "";
            nextButton.disabled = true;
            nextButton.setAttribute(
                "aria-label",
                "No next section"
            );

        }
        /* Progress Dots */
        progressDots.forEach((dot, index) => {
            const isActive = index === currentStep;
            dot.classList.toggle("active", isActive);
            if (isActive) {
                dot.setAttribute("aria-current", "step");
            } else {
                dot.removeAttribute("aria-current");
            }
        });
        progressContainer.setAttribute(
            "aria-label",
            `${stepLabels[steps[currentStep]]} — ${currentStep + 1} of ${steps.length}`
        );
    }

    function animateContent() {
        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;
        if (reduceMotion) return;
        panel.classList.remove("active");
        void panel.offsetWidth;
        panel.classList.add("active");
    }

    function renderCaseStudy() {
        const project = caseStudies[currentProject];
        if (!project) return;
        const step = steps[currentStep];
        const page = project.pages[step];
        if (!page) return;

        /* Update content */
        category.textContent = project.category;
        title.textContent = page.title;
        description.textContent = page.description;

        /* Update project pills */
        pills.forEach(pill => {
            const isActive = pill.dataset.system === currentProject;
            pill.classList.toggle("active", isActive);
            pill.setAttribute(
                "aria-pressed",
                String(isActive)
            );
        });

        /* Update card and pagination */
        updateCardAppearance();
        updatePagination();

        /* Animate panel */
        animateContent();

    }


    pills.forEach(pill => {

        pill.addEventListener("click", () => {

            const selectedProject = pill.dataset.system;

            if (!caseStudies[selectedProject]) return;

            currentProject = selectedProject;
            currentStep = 0;

            setHelpOpen(false);
            renderCaseStudy();

        });

    });

    function goToStep(index) {

        if (
            index < 0 ||
            index >= steps.length ||
            index === currentStep
        ) {
            return;
        }

        currentStep = index;
        renderCaseStudy();

    }


    nextButton.addEventListener("click", () => {
        goToStep(currentStep + 1);
    });

    prevButton.addEventListener("click", () => {
        goToStep(currentStep - 1);
    });


    /* ========================================
       KEYBOARD NAVIGATION
    ======================================== */
    document.addEventListener("keydown", (event) => {
        // Only active on Systems
        if (systemsPage.hidden) return;

        // Ignore modifiers
        if (
            event.altKey ||
            event.ctrlKey ||
            event.metaKey ||
            event.shiftKey
        ) {
            return;
        }

        // Ignore held keys
        if (event.repeat) return;

        // Don't interfere with inputs
        const target = event.target;
        if (
            target instanceof Element &&
            target.closest(
                "input, textarea, select, [contenteditable]:not([contenteditable='false'])"
            )
        ) {
            return;
        }

        /* Direct navigation: 1–5 */
        if (/^[1-5]$/.test(event.key)) {
            event.preventDefault();
            goToStep(Number(event.key) - 1);
            return;
        }


        /* Right arrow */
        if (event.key === "ArrowRight") {
            if (currentStep >= steps.length - 1) return;
            event.preventDefault();
            goToStep(currentStep + 1);
            return;
        }


        /* Left arrow */
        if (event.key === "ArrowLeft") {
            if (currentStep <= 0) return;
            event.preventDefault();
            goToStep(currentStep - 1);
        }
    });

    updateSystemsNav();
    renderCaseStudy();

});