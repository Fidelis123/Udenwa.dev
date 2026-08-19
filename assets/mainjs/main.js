/**
 * ============================================================================
 * UDENWA.DEV - CORE LOGIC, ANIMATIONS & INTERACTIONS
 * Author: Udenwa Fidelis Ojinkama
 * ============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    initTypingAnimation();
    initScrollEffects();
    initMobileNav();
    initSmoothScrolling();
    initScrollReveal();
    initStatCounters();
    initContactForm();
    initBackToTop();
    initFooterYear();
    initHorizontalSliders();
});

/* --------------------------------------------------------------------------
   1. Dynamic Typing Headline Animation
   -------------------------------------------------------------------------- */
function initTypingAnimation() {
    const typingElement = document.getElementById("typing-text");
    if (!typingElement) return;

    const roles = [
        "Full-Stack Web Developer",
        "Frontend Engineer",
        "Backend & API Developer",
        "React & JavaScript Specialist",
        "Problem Solver"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 80;
    const deletingSpeed = 40;
    const holdDuration = 1800;

    function typeLoop() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let delay = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentRole.length) {
            delay = holdDuration;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            delay = 400;
        }

        setTimeout(typeLoop, delay);
    }

    setTimeout(typeLoop, 500);
}

/* --------------------------------------------------------------------------
   2. Scroll Effects (Sticky Header, Scroll Progress & ScrollSpy)
   -------------------------------------------------------------------------- */
function initScrollEffects() {
    const header = document.getElementById("header");
    const progressBar = document.getElementById("scroll-progress");
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav_link");

    window.addEventListener("scroll", () => {
        const scrollY = window.scrollY;

        // Sticky Header shrink
        if (header) {
            if (scrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        }

        // Scroll Progress Bar
        if (progressBar) {
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollY / docHeight) * 100;
            progressBar.style.width = `${progress}%`;
        }

        // ScrollSpy Navigation
        let currentSectionId = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute("id");
            }
        });

        if (currentSectionId) {
            navLinks.forEach(link => {
                link.classList.remove("active");
                if (link.getAttribute("href") === `#${currentSectionId}`) {
                    link.classList.add("active");
                }
            });
        }
    });
}

/* --------------------------------------------------------------------------
   3. Mobile Navigation Toggle & Drawer Controls
   -------------------------------------------------------------------------- */
function initMobileNav() {
    const navToggle = document.getElementById("nav-toggle");
    const navClose = document.getElementById("nav-close");
    const navMenu = document.getElementById("nav_menu");
    const navBackdrop = document.getElementById("nav-backdrop");
    const navLinks = document.querySelectorAll(".nav_link");

    function openMenu() {
        if (navToggle) navToggle.classList.add("active");
        if (navMenu) navMenu.classList.add("active");
        if (navBackdrop) navBackdrop.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeMenu() {
        if (navToggle) navToggle.classList.remove("active");
        if (navMenu) navMenu.classList.remove("active");
        if (navBackdrop) navBackdrop.classList.remove("active");
        document.body.style.overflow = "auto";
    }

    if (navToggle && navMenu) {
        navToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            if (navMenu.classList.contains("active")) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Explicit Close Button
        if (navClose) {
            navClose.addEventListener("click", (e) => {
                e.stopPropagation();
                closeMenu();
            });
        }

        // Close on clicking the backdrop
        if (navBackdrop) {
            navBackdrop.addEventListener("click", closeMenu);
        }

        // Close menu on link click
        navLinks.forEach(link => {
            link.addEventListener("click", closeMenu);
        });

        // Close on escape key
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && navMenu.classList.contains("active")) {
                closeMenu();
            }
        });
    }
}

/* --------------------------------------------------------------------------
   4. Smooth Scrolling for Anchor Links
   -------------------------------------------------------------------------- */
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener("click", function(e) {
            const href = this.getAttribute("href");
            if (href === "#" || href === "") return;

            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                const offset = 80;
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = targetElement.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
}

/* --------------------------------------------------------------------------
   5. Scroll Reveal with Intersection Observer
   -------------------------------------------------------------------------- */
let revealObserver = null;

function initScrollReveal() {
    const revealElements = document.querySelectorAll(".reveal-fade, .reveal-left, .reveal-right, .reveal-scale");

    if ("IntersectionObserver" in window) {
        revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("revealed");
                    // unobserve once revealed for performance
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback for older browsers
        revealElements.forEach(el => el.classList.add("revealed"));
    }
}

// Global hook to observe dynamically rendered elements (e.g., project cards)
window.observeNewElements = function() {
    if (!revealObserver) return;
    const unrevealed = document.querySelectorAll(".reveal-fade:not(.revealed), .reveal-left:not(.revealed), .reveal-right:not(.revealed)");
    unrevealed.forEach(el => revealObserver.observe(el));
};

/* --------------------------------------------------------------------------
   6. Hero Statistics Number Counters
   -------------------------------------------------------------------------- */
function initStatCounters() {
    const statCards = document.querySelector(".hero-stats-container");
    if (!statCards) return;

    let countersStarted = false;

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !countersStarted) {
            countersStarted = true;
            const counters = document.querySelectorAll(".stat-number");
            
            counters.forEach(counter => {
                const target = +counter.getAttribute("data-target");
                const duration = 1800;
                const startTime = performance.now();

                function updateCounter(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // Ease out quadratic function
                    const easeProgress = 1 - (1 - progress) * (1 - progress);
                    const currentVal = Math.floor(easeProgress * target);
                    
                    counter.textContent = currentVal;

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                }

                requestAnimationFrame(updateCounter);
            });
        }
    }, { threshold: 0.3 });

    observer.observe(statCards);
}

/* --------------------------------------------------------------------------
   7. Toast Notification System
   -------------------------------------------------------------------------- */
function showToast(title, message, type = "success") {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;

    const iconClass = type === "success" ? "fa-circle-check" : "fa-circle-exclamation";

    toast.innerHTML = `
        <i class="fa-solid ${iconClass} toast-icon"></i>
        <div class="toast-content">
            <h4>${title}</h4>
            <p>${message}</p>
        </div>
        <div class="toast-progress"></div>
    `;

    container.appendChild(toast);

    // Trigger animation
    setTimeout(() => {
        toast.classList.add("show");
    }, 50);

    // Remove after 4 seconds
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 400);
    }, 4000);
}

/* --------------------------------------------------------------------------
   8. Contact Form with EmailJS & Toast Notifications
   -------------------------------------------------------------------------- */
function initContactForm() {
    const form = document.getElementById("contact-form");
    const submitBtn = document.getElementById("submit-btn");

    if (!form || !submitBtn) return;

    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const nameInput = form.querySelector("input[name='name']");
        const emailInput = form.querySelector("input[name='email']");
        const messageInput = form.querySelector("textarea[name='message']");

        if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
            showToast("Missing Information", "Please fill in all required fields.", "error");
            return;
        }

        // Set Loading State
        submitBtn.classList.add("loading");
        submitBtn.disabled = true;

        emailjs.sendForm("service_an49h5b", "template_rlesja3", this)
            .then(() => {
                showToast("Message Sent! 🚀", "Thank you for reaching out, I will reply promptly.", "success");
                form.reset();
            })
            .catch((error) => {
                console.error("EmailJS Error:", error);
                showToast("Transmission Error", "Failed to send message. Please reach out via WhatsApp or direct email.", "error");
            })
            .finally(() => {
                submitBtn.classList.remove("loading");
                submitBtn.disabled = false;
            });
    });
}

/* --------------------------------------------------------------------------
   9. Floating Back To Top Button
   -------------------------------------------------------------------------- */
function initBackToTop() {
    const backToTopBtn = document.getElementById("back-to-top");
    if (!backToTopBtn) return;

    window.addEventListener("scroll", () => {
        if (window.scrollY > 350) {
            backToTopBtn.classList.add("show");
        } else {
            backToTopBtn.classList.remove("show");
        }
    });

    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

/* --------------------------------------------------------------------------
   10. Dynamic Footer Year
   -------------------------------------------------------------------------- */
function initFooterYear() {
    const yearElem = document.getElementById("year");
    if (yearElem) {
        yearElem.textContent = new Date().getFullYear();
    }
}

/* --------------------------------------------------------------------------
   11. Horizontal Sliders (Skills & Projects)
   -------------------------------------------------------------------------- */
function setupHorizontalSlider(scrollContainerSelector, prevBtnSelector, nextBtnSelector, step = 320) {
    const scrollContainer = document.querySelector(scrollContainerSelector);
    const prevBtn = document.querySelector(prevBtnSelector);
    const nextBtn = document.querySelector(nextBtnSelector);

    if (!scrollContainer) return () => {};

    function updateArrowStates() {
        if (!prevBtn || !nextBtn) return;
        const maxScroll = Math.max(0, scrollContainer.scrollWidth - scrollContainer.clientWidth);
        prevBtn.disabled = scrollContainer.scrollLeft <= 5;
        nextBtn.disabled = scrollContainer.scrollLeft >= maxScroll - 5;
    }

    function getScrollStep() {
        const firstCard = scrollContainer.querySelector(".project-card, .skill-card");
        if (firstCard) {
            return firstCard.offsetWidth + 14;
        }
        return step;
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            scrollContainer.scrollBy({ left: -getScrollStep(), behavior: "smooth" });
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            scrollContainer.scrollBy({ left: getScrollStep(), behavior: "smooth" });
        });
    }

    scrollContainer.addEventListener("scroll", updateArrowStates, { passive: true });

    // Drag to scroll functionality
    let isDown = false;
    let startX;
    let scrollLeft;

    scrollContainer.addEventListener("mousedown", (e) => {
        isDown = true;
        scrollContainer.style.cursor = "grabbing";
        startX = e.pageX - scrollContainer.offsetLeft;
        scrollLeft = scrollContainer.scrollLeft;
    });

    scrollContainer.addEventListener("mouseleave", () => {
        isDown = false;
        scrollContainer.style.cursor = "default";
    });

    scrollContainer.addEventListener("mouseup", () => {
        isDown = false;
        scrollContainer.style.cursor = "default";
    });

    scrollContainer.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - scrollContainer.offsetLeft;
        const walk = (x - startX) * 1.5;
        scrollContainer.scrollLeft = scrollLeft - walk;
    });

    // Check states after layout calculation
    setTimeout(updateArrowStates, 300);
    window.addEventListener("resize", updateArrowStates, { passive: true });

    return updateArrowStates;
}

function initHorizontalSliders() {
    setupHorizontalSlider(".skills-scroll-container", "#skills-prev-btn", "#skills-next-btn", 280);
    const updateProjects = setupHorizontalSlider(".projects-scroll-container", "#projects-prev-btn", "#projects-next-btn", 370);
    window.updateProjectSliderArrows = updateProjects;
}
