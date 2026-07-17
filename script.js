// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// Update year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Smooth scroll for nav links (already handled by CSS, but good to have JS fallback/control)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Project category tabs
document.querySelectorAll('.proj-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        const target = tab.dataset.tab;

        // Update active tab button
        document.querySelectorAll('.proj-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Show matching category panel, hide others
        document.querySelectorAll('.projects-category').forEach(panel => {
            panel.classList.remove('active');
        });
        document.getElementById('proj-' + target).classList.add('active');

        // Re-observe newly visible cards so they animate in
        document.querySelectorAll('#proj-' + target + ' .animate-on-scroll').forEach(el => {
            el.classList.remove('visible');
            observer.observe(el);
        });
    });
});

