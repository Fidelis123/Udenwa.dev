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








