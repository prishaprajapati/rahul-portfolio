/**
 * Rahul Mechanical & Product Design Engineer Portfolio
 * Simple & Lightweight Vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initNavbarScroll();
    initScrollProgress();
    initEducationCertificationTabs();
    initHeroRoleRotation();
});

/* 1. Dark/Light Theme Switcher */
function initThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    const icon = toggleBtn?.querySelector('.theme-icon');
    const htmlEl = document.documentElement;

    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlEl.setAttribute('data-theme', savedTheme);
    if (icon) icon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

    toggleBtn?.addEventListener('click', () => {
        const currentTheme = htmlEl.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        htmlEl.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        if (icon) icon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    });
}

/* 2. Navbar Scroll Active Link Highlight */
function initNavbarScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, { threshold: 0.3 });

    sections.forEach(sec => observer.observe(sec));
}

/* 3. Scroll Progress Bar */
function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        if (progressBar) progressBar.style.width = `${progress}%`;
    });
}

/* 4. Education and Certification Tabs */
function initEducationCertificationTabs() {
    const tabs = document.querySelectorAll('.edu-cert-tab');
    const panels = document.querySelectorAll('.edu-cert-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const selectedPanelId = tab.getAttribute('aria-controls');

            tabs.forEach(item => {
                const isSelected = item === tab;
                item.classList.toggle('active', isSelected);
                item.setAttribute('aria-selected', String(isSelected));
            });

            panels.forEach(panel => {
                panel.hidden = panel.id !== selectedPanelId;
            });
        });
    });
}

/* 5. Hero Role Rotation */
function initHeroRoleRotation() {
    const roleElement = document.getElementById('hero-role');
    const roles = ['Senior Design Engineer', 'Mechanical Engineer'];
    let roleIndex = 0;
    let characterIndex = 0;
    let isDeleting = false;
    const typingSpeed = 120;
    const deletingSpeed = 75;

    if (!roleElement) return;

    const animateRole = () => {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            characterIndex -= 1;
            roleElement.textContent = currentRole.slice(0, characterIndex);

            if (characterIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
            }
        } else {
            characterIndex += 1;
            roleElement.textContent = currentRole.slice(0, characterIndex);

            if (characterIndex === currentRole.length) {
                isDeleting = true;
            }
        }

        window.setTimeout(animateRole, isDeleting ? deletingSpeed : typingSpeed);
    };

    animateRole();
}

