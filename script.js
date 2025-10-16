document.addEventListener('DOMContentLoaded', () => {

    // --- Navbar Scroll Effect ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Smooth Scrolling for Nav Links ---
    document.querySelectorAll('.nav-links a, .cta-button, .scroll-indicator a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
            // Close mobile nav on link click
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    // --- Fade-in & Slide-up on Scroll Animation ---
    const animatedElements = document.querySelectorAll('.content-section, .profile-photo-placeholder'); // Added profile-photo-placeholder
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // For the profile photo, also apply the slide-up specific class
                if (entry.target.classList.contains('profile-photo-placeholder')) {
                    entry.target.classList.add('slide-up-visible'); // Custom class for slide-up
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    animatedElements.forEach(element => {
        animationObserver.observe(element);
    });

    // --- Typewriter Effect ---
    const typewriterTextElement = document.querySelector('.typewriter-text');
    const texts = ["AI Enthusiast", "Data Scientist", "AI/ML Engineer", "Blockchain Exploler"];
    let textIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < texts[textIndex].length) {
            typewriterTextElement.textContent += texts[textIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, 100);
        } else {
            setTimeout(erase, 2000);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typewriterTextElement.textContent = texts[textIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, 50);
        } else {
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(type, 500);
        }
    }
    type();

    // --- Dark/Light Mode Toggle ---
    const themeToggle = document.getElementById('checkbox');
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.body.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'light') {
            themeToggle.checked = true;
        }
    }
    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            document.body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });

    // --- Hamburger Menu for Mobile ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

});