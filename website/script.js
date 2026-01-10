// QAPlay Landing Page - JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initScrollAnimations();
    initSmoothScrolling();
    initNavbarEffects();
    /**
 * Mobile Navigation Toggle
 */
    function initMobileMenu() {
        const menuToggle = document.getElementById('mobile-menu');
        const navLinks = document.querySelector('.nav-links');

        if (menuToggle && navLinks) {
            menuToggle.addEventListener('click', () => {
                menuToggle.classList.toggle('active');
                navLinks.classList.toggle('active');
                // Prevent scrolling when menu is open
                document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'initial';
            });

            // Close menu when a link is clicked
            const links = navLinks.querySelectorAll('a');
            links.forEach(link => {
                link.addEventListener('click', () => {
                    menuToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.style.overflow = 'initial';
                });
            });
        }
    }

    // Initialize all components when DOM is loaded
    document.addEventListener('DOMContentLoaded', () => {
        initDownloadButtons();
        initMobileMenu();
    });
});

/**
 * Scroll-triggered animations using Intersection Observer
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.feature-card, .tech-card, .step-card, .section-header'
    );

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Staggered animation delay
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

/**
 * Smooth scrolling for navigation links
 */
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Navbar effects on scroll
 */
function initNavbarEffects() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add/remove solid background based on scroll position
        if (currentScroll > 50) {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.8)';
            navbar.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });
}

/**
 * Download button click handlers
 */
function initDownloadButtons() {
    const downloadButtons = document.querySelectorAll('.btn-download');

    downloadButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();

            // Determine platform
            const isMac = button.querySelector('.btn-platform').textContent.includes('macOS');
            const platform = isMac ? 'macOS' : 'Windows';

            // Create download notification
            showNotification(`Preparing ${platform} download...`, 'info');

            // Simulate download - replace with actual download URLs
            setTimeout(() => {
                const macUrl = 'https://drive.google.com/u/0/uc?id=1NjaOGekRz-caLx1ec9CUvJ-Y6eFPj0AB&export=download&confirm=t';
                const winUrl = 'https://drive.google.com/u/0/uc?id=1TKzgKrx1zSg-SsXMFNQdhOQ_jyTUgV8H&export=download&confirm=t';

                if (isMac) {
                    showNotification('Opening macOS download page...', 'success');
                    window.open(macUrl, '_blank');
                } else {
                    showNotification('Opening Windows download page...', 'success');
                    window.open(winUrl, '_blank');
                }
            }, 1000);
        });
    });
}

/**
 * Show notification toast
 */
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span class="notification-icon">${type === 'success' ? '✓' : 'ℹ'}</span>
        <span class="notification-message">${message}</span>
    `;

    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '16px 24px',
        background: type === 'success'
            ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.9), rgba(22, 163, 74, 0.9))'
            : 'linear-gradient(135deg, rgba(139, 92, 246, 0.9), rgba(79, 70, 229, 0.9))',
        color: 'white',
        borderRadius: '12px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
        zIndex: '10000',
        opacity: '0',
        transform: 'translateY(20px)',
        transition: 'all 0.3s ease',
        fontFamily: 'Inter, sans-serif',
        fontSize: '0.95rem',
        fontWeight: '500'
    });

    document.body.appendChild(notification);

    // Animate in
    requestAnimationFrame(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    });

    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(20px)';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

/**
 * Add parallax effect to hero orbs
 */
document.addEventListener('mousemove', (e) => {
    const orbs = document.querySelectorAll('.gradient-orb');
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.02;
        const x = (clientX - centerX) * speed;
        const y = (clientY - centerY) * speed;
        orb.style.transform = `translate(${x}px, ${y}px)`;
    });
});

/**
 * Add hover effect to feature cards
 */
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});
