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
    featuredContainer.innerHTML = '<div class="loading">Loading projects...</div>';

    try {
        // Fetches all public events for your account
        const response = await fetch('https://api.github.com/users/fidelis123/events/public');
        const events = await response.json();

        // Pull out unique repos you pushed/contributed to that aren't yours
        const contributed = [];
        const seen = new Set();

        events.forEach(event => {
            const repo = event.repo;
            if (
                event.type === 'PushEvent' &&
                !repo.name.startsWith('fidelis123/') &&  // exclude your own
                !seen.has(repo.name)
            ) {
                seen.add(repo.name);
                contributed.push(repo);
            }
        });

        if (contributed.length > 0) {
            displayFeatured(contributed);
        } else {
            featuredContainer.innerHTML = '<div class="error">No contributed projects found.</div>';
        }

    } catch (error) {
        console.error('Error loading featured:', error);
        featuredContainer.innerHTML = '<div class="error">Failed to load projects.</div>';
    }
}

async function displayFeatured(repos) {
    const featuredContainer = document.getElementById('featured-container');

    // Fetch full details for each repo
    const detailed = await Promise.all(
        repos.map(repo =>
            fetch(`https://api.github.com/repos/${repo.}`)
                .then(res => res.json())
        )
    );

    featuredContainer.innerHTML = detailed.map(repo => `
        <div class="card">
            <div class="card_info">
                <h3 class="card_title">${repo.name}</h3>
                <p class="card_owner">by ${repo.owner.login}</p>
                <p class="card_desc">${repo.description || 'No description available'}</p>
                <div class="card_tags">
                    ${repo.language ? `<span class="tag">${repo.language}</span>` : ''}
                    <span class="tag">⭐ ${repo.stargazers_count}</span>
                </div>
            </div>
            <div class="card_links">
                <a href="${repo.html_url}" target="_blank" class="btn">View Repo</a>
                ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" class="btn btn_outline">Live Demo</a>` : ''}
            </div>
        </div>
    `).join('');
}






