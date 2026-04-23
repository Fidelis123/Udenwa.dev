// handles smooth scrolling, navigation, and dynamic data loading //

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionallity
    
    initNavigation();
    initSmoothScrolling();
    loadFeatured();
    // loadSkills();
    // loadProjects();
     initScrollEffects();
});

/*
Initialize mobile navigation toggle
*/

function initNavigation () {
    const navToggle = document. querySelector ('.nav-toggle');
    const navList = document . querySelector ('.nav_list');

    if (navToggle &&  navList) {
        navToggle.addEventListener ('click', function() {
            navList.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // close menu when clicking on a link
        const navLinks = document.querySelectorAll ('.nav_link');
        navLinks. forEach(link => {
            link.addEventListener('click', function () {
                navList.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });    
    }
}

/**Initialize smooth scrolling for anchor links*/

function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement){
                const offsetTop = targetElement.offsetTop - 70;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                 });

                 // Update active nav link
                 updateActiveNavLink(targetId); 
            }
        });
    });
}


/* Update active navigation link based on scroll position */

function updateActiveNavLink(activeId) {
    const navLinks = document.querySelectorAll('.nav_link');

    navLinks.forEach(link => {
        link.classList.remove('active');

        if (link.getAttribute('href').substring(1) === activeId) {
            link.classList.add('active');
        }
    });

}

/** Initialize scroll effects (navbar background, active sections) */

function initScrollEffects() {
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');

    if (!navbar || !sections) {
        return;
    }


    window.addEventListener('scroll', function() {
        // Navbar background change on scroll
        if (window.scrollY > 100) {
            navbar.classList.add('active');
        } else {
            navbar.classList.remove('active');
        }

        // Update active nav link based on scroll position
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                currentSectionId = section.getAttribute('id');
            }
        });
        updateActiveNavLink(currentSectionId);
    });

}

/* Load featured from API and display them */

async function loadFeatured() {
    const featuredContainer = document.getElementById('featured-container');
    featuredContainer.innerHTML = '<div class="loading">Loading featured collaborations...</div>';

    try {
        // Search for Pull Requests created by you that were merged into other people's repos
        const query = encodeURIComponent('is:pr is:merged author:fidelis123 -user:fidelis123');
        const response = await fetch(`https://api.github.com/search/issues?q=${query}&per_page=6`);
        const data = await response.json();

        const contributedRepos = [];
        const seen = new Set();

        // Extract unique repository URLs from those Pull Requests
        data.items.forEach(pr => {
            const repoUrl = pr.repository_url;
            if (!seen.has(repoUrl)) {
                seen.add(repoUrl);
                contributedRepos.push(repoUrl);
            }
        });

        if (contributedRepos.length > 0) {
            displayFeatured(contributedRepos);
        } else {
            featuredContainer.innerHTML = '<div class="error">No featured collaborations found yet.</div>';
        }
    } catch (error) {
        console.error('Error:', error);
        featuredContainer.innerHTML = '<div class="error">Unable to load featured works.</div>';
    }
}

async function displayFeatured(repoUrls) {
    const featuredContainer = document.getElementById('featured-container');

    // Fetch full details for each unique repo
    const detailed = await Promise.all(
        repoUrls.map(url => fetch(url).then(res => res.json()))
    );

    featuredContainer.innerHTML = detailed.map(repo => `
        <div class="card effect">
            <div class="card_info">
                <h3 class="card_title">${repo.name.toUpperCase()}</h3>
                <p class="card_owner">Collaboration with <strong>${repo.owner.login}</strong></p>
                <p class="card_desc">${repo.description || 'Contributed to technical solutions and development.'}</p>
            </div>
            <div class="card_links">
                <a href="${repo.html_url}" target="_blank" class="btn">View Project</a>
            </div>
        </div>
    `).join('');
}






