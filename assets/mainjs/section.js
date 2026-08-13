const skills = [
    { name: "HTML5",icon: "html5.png", alt: "HTML Image"},
    { name: "CSS-3", icon: "css-3.png" },
    { name: "Bootstrap", icon: "bootstrap.png" },
    { name: "Javascript", icon: "js.png" },
    { name: "PHP", icon: "php.png" },
    { name: "React", icon: "react.png", locked: false },
    { name: "Learning Next.js", icon: "next-js.png", locked: true },
    { name: "Learning Node.js", icon: "nodejs.png", locked: true },

];

function renderSkills() {
    const container = document.querySelector(".skill-items");
    if (!container) return;

    container.innerHTML = skills.map(skill => `
        <div class="skills__data${skill.locked ? "locked" : ""}">
            <div class="skills__names">
                <img src="./assets/iconimage/${skill.icon}" alt="${skill.name.toLowerCase()} image" class="icon">
                <span class="skills__name">${skill.name}</span>
            </div>
        </div>
        `).join("");
};
    document.addEventListener("DOMContentLoaded", renderSkills);


    const projects = [
    {
        title: "My portfolio",
        description: "On it already",
        image: "./assets/Backgroundimage/portfolio.png",
        alt: "portfolio image",
        url: "udenwa-dev.vercel.app",
        status: "live"
    },
    {
        title: "HKAI.SITE",
        description: "AI Learning Companion",
        image: "./assets/Backgroundimage/hkai.jpeg",
        alt: "HKAI.SITE logo",
        url: "https://hkai.site",
        status: "live"
    },
    {
        title: "Blaze shop demo",
        description: "Front-end project of an e-commerce website (html,css,javascript).",
        image: "./assets/Backgroundimage/blaze.shop.png",
        alt: "Shop project image",
        url: "https://blaze-shop-five.vercel.app",
        status: "demo"
    },
    {
        title: "Ude's shop demo",
        description: "Simple e-commerce website (React, vite)",
        image: "./assets/Backgroundimage/Ude-s-shop.png",
        alt: "Shop project image",
        url: "https://ude-s-shop-rpyh.vercel.app/",
        status: "demo"
    },
];

function renderProjects() {
    const container = document.querySelector("#project-grid");
    if (!container) return;

    container.innerHTML = projects.map(project => `
        <a href="${project.url}" target="_blank" class="project-card">
            <img src="${project.image}" alt="${project.alt}">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <span class="${project.status}-badge">
                <span class="${project.status}-dot"></span>
                ${project.status === "live" ? "Live" : "Demo"}
            </span>
        </a>
    `).join("");
}

document.addEventListener("DOMContentLoaded", renderProjects);
