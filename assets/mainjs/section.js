/**
 * ============================================================================
 * UDENWA.DEV - DATA & COMPONENT RENDERING
 * Author: Udenwa Fidelis Ojinkama
 * ============================================================================
 */

// Skills Data
const skillsData = [
    {
        name: "HTML5",
        icon: "html5.png",
        category: "Frontend Core",
        badge: "Proficient",
        learning: false
    },
    {
        name: "CSS3",
        icon: "css-3.png",
        category: "Styling & Animation",
        badge: "Proficient",
        learning: false
    },
    {
        name: "JavaScript (ES6+)",
        icon: "js.png",
        category: "Core Language",
        badge: "Advanced",
        learning: false
    },
    {
        name: "React.js",
        icon: "react.png",
        category: "Frontend Framework",
        badge: "Intermediate",
        learning: false
    },
    {
        name: "Bootstrap",
        icon: "bootstrap.png",
        category: "CSS Framework",
        badge: "Proficient",
        learning: false
    },
    {
        name: "PHP",
        icon: "php.png",
        category: "Backend Scripting",
        badge: "Intermediate",
        learning: false
    },
    {
        name: "Git & GitHub",
        icon: "github.png",
        category: "Version Control",
        badge: "Proficient",
        learning: false
    },
    {
        name: "Next.js",
        icon: "next-js.png",
        category: "React Framework",
        badge: "Exploring 🚀",
        learning: true
    },
    {
        name: "Node.js",
        icon: "nodejs.png",
        category: "Backend Runtime",
        badge: "Exploring 🚀",
        learning: true
    },
    {
        name: "Responsive Design",
        icon: "web.png",
        category: "Mobile First",
        badge: "Expert",
        learning: false
    }
];

// Projects Data
const projectsData = [
    {
        id: "udenwa-dev",
        title: "Udenwa.dev Portfolio",
        description: "High-performance personal developer portfolio engineered with modern dark glassmorphism, fluid animations, and interactive components.",
        image: "./assets/Backgroundimage/portfolio.png",
        alt: "Udenwa Portfolio Showcase",
        url: "https://udenwa-dev.vercel.app",
        github: "https://github.com/Fidelis123/Udenwa.dev",
        status: "live",
        categories: ["all", "fullstack", "live"],
        tags: ["HTML5", "CSS3", "JavaScript", "Glassmorphism"]
    },
    {
        id: "hkai-site",
        title: "HKAI.SITE",
        description: "An AI-powered learning companion platform delivering intelligent educational interactions, smart tutoring, and responsive user tooling.",
        image: "./assets/Backgroundimage/hkai.jpeg",
        alt: "HKAI.SITE AI Learning Companion",
        url: "https://hkai.site",
        github: "https://github.com/Fidelis123",
        status: "live",
        categories: ["all", "fullstack", "live"],
        tags: ["AI Platform", "Full-Stack", "JavaScript", "REST APIs"]
    },
    {
        id: "blaze-shop",
        title: "Blaze Shop E-Commerce",
        description: "A fast, responsive online storefront featuring dynamic product catalog browsing, cart operations, and mobile-optimized layouts.",
        image: "./assets/Backgroundimage/Blaze-update.png",
        alt: "Blaze Shop E-Commerce Store",
        url: "https://blaze-home-of-fashion-wkop.vercel.app",
        github: "https://github.com/Fidelis123",
        status: "demo",
        categories: ["all", "ecommerce"],
        tags: ["HTML5", "CSS3", "JavaScript", "E-Commerce"]
    },
    {
        id: "udes-shop",
        title: "Ude's Shop React Store",
        description: "Interactive e-commerce web application engineered with React & Vite for lightning-fast catalog navigation and reactive state management.",
        image: "./assets/Backgroundimage/Ude-s-shop.png",
        alt: "Ude's Shop React Store",
        url: "https://ude-s-shop-rpyh.vercel.app/",
        github: "https://github.com/Fidelis123",
        status: "demo",
        categories: ["all", "ecommerce"],
        tags: ["React", "Vite", "JavaScript", "SPA"]
    }
];

/**
 * Render Skills Grid
 */
function renderSkills() {
    const container = document.getElementById("skills-container");
    if (!container) return;

    container.innerHTML = skillsData.map(skill => `
        <div class="skill-card ${skill.learning ? 'learning' : ''}">
            <div class="skill-icon-wrap">
                <img src="./assets/iconimage/${skill.icon}" alt="${skill.name} icon" loading="lazy">
            </div>
            <div class="skill-details">
                <span class="skill-name">${skill.name}</span>
                <span class="skill-badge">${skill.badge}</span>
            </div>
        </div>
    `).join("");
}

/**
 * Render Projects Grid with Filter support
 */
function renderProjects(filter = "all") {
    const container = document.getElementById("project-grid");
    if (!container) return;

    const filteredProjects = projectsData.filter(project => {
        if (filter === "all") return true;
        return project.categories.includes(filter);
    });

    if (filteredProjects.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-secondary);">
                <i class="fa-solid fa-folder-open" style="font-size: 2rem; color: var(--accent-teal); margin-bottom: 12px; display: block;"></i>
                <p>No projects found in this category yet. Check back soon!</p>
            </div>
        `;
        return;
    }

    container.innerHTML = filteredProjects.map(project => `
        <article class="project-card reveal-fade" data-category="${project.categories.join(' ')}">
            <div class="project-img-box">
                <img src="${project.image}" alt="${project.alt}" loading="lazy">
                <span class="project-status-badge ${project.status}">
                    <span class="status-pulse-dot"></span>
                    ${project.status === "live" ? "Live Site" : "Demo"}
                </span>
            </div>

            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-desc">${project.description}</p>
                
                <div class="project-tech-stack">
                    ${project.tags.map(tag => `<span class="tech-pill">${tag}</span>`).join("")}
                </div>

                <div class="project-actions">
                    <a href="${project.url}" target="_blank" rel="noopener noreferrer" class="btn-project primary">
                        <span>Live Preview</span>
                        <i class="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>
                    <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn-project secondary" title="View Source Code">
                        <i class="fa-brands fa-github"></i>
                        <span>Code</span>
                    </a>
                </div>
            </div>
        </article>
    `).join("");

    // Trigger scroll reveal on new cards if reveal function is ready
    if (window.observeNewElements) {
        window.observeNewElements();
    }
}

/**
 * Initialize Category Filter Buttons
 */
function initProjectFilters() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    filterButtons.forEach(btn => {
        btn.addEventListener("click", function() {
            filterButtons.forEach(b => b.classList.remove("active"));
            this.classList.add("active");
            const filterValue = this.getAttribute("data-filter");
            renderProjects(filterValue);
            const scrollContainer = document.querySelector(".projects-scroll-container");
            if (scrollContainer) {
                scrollContainer.scrollLeft = 0;
            }
            if (window.updateProjectSliderArrows) {
                window.updateProjectSliderArrows();
            }
        });
    });
}

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", () => {
    renderSkills();
    renderProjects("all");
    initProjectFilters();
});
