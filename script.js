const translations = {
    fr: {
        nav: {
            home: "Accueil",
            software: "Modules",
            about: "Vision",
            contact: "Accès Beta"
        },
        hero: {
            subtitle: "La suite ultime d'outils IA pour After Effects & Premiere Pro. Automatisez le banal, libérez l'impossible.",
            cta1: "Explorer les Modules",
            cta2: "Voir le Reel"
        },
        products: {
            title: "La Suite <span class=\"gradient-text-primary\">Neex</span>",
            subtitle: "Des modules puissants. Imbattables ensemble.",
            dlp: {
                desc: "Le gestionnaire d'actifs ultime. 5000+ VFX, Presets et Transitions disponibles instantanément."
            },
            drb: {
                desc: "Rotoscopie IA en un clic. Adieu fond vert."
            },
            d2v: {
                desc: "Transformez vos images 2D en actifs volumétriques 3D."
            },
            dsa: {
                desc: "Mise à l'échelle 4K/8K avec préservation des détails."
            }
        },
        about: {
            title: "Conçu pour la <span class=\"highlight\">Vitesse</span>",
            desc: "DR NEEX n'est pas juste une suite de plugins. C'est une nouvelle façon de penser la post-production. Nous combinons l'IA de pointe avec des workflows intuitifs."
        },
        contact: {
            title: "Rejoignez la <span class=\"gradient-text-secondary\">Révolution</span>",
            subtitle: "Obtenez un accès anticipé à la beta et commencez à créer.",
            placeholder: "votre_email",
            submit: "Demander l'Accès"
        }
    },
    en: {
        nav: {
            home: "Home",
            software: "Modules",
            about: "Vision",
            contact: "Get Access"
        },
        hero: {
            subtitle: "The ultimate suite of AI tools for After Effects & Premiere Pro. Automate the mundane, unleash the impossible.",
            cta1: "Explore Modules",
            cta2: "Watch Reel"
        },
        products: {
            title: "The <span class=\"gradient-text-primary\">Neex Suite</span>",
            subtitle: "Powerful individual modules. Unstoppable together.",
            dlp: {
                desc: "The ultimate asset manager. 5000+ VFX, Presets, and Transitions instantly available."
            },
            drb: {
                desc: "One-click AI Rotoscoping. Goodbye Green Screen."
            },
            d2v: {
                desc: "Turn 2D images into 3D volumetric assets."
            },
            dsa: {
                desc: "4K/8K Upscaling with detail preservation."
            }
        },
        about: {
            title: "Built for <span class=\"highlight\">Speed</span>",
            desc: "DR NEEX isn't just a set of plugins. It's a new way to think about post-production. We combine state-of-the-art AI with intuitive workflows."
        },
        contact: {
            title: "Join the <span class=\"gradient-text-secondary\">Revolution</span>",
            subtitle: "Get early access to the beta and start creating.",
            placeholder: "enter_your_email",
            submit: "Request Access"
        }
    }
};

function setLanguage(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    const placeholders = document.querySelectorAll('[data-i18n-placeholder]');

    // Update text content
    elements.forEach(el => {
        const keys = el.getAttribute('data-i18n').split('.');
        let value = translations[lang];
        keys.forEach(k => { if (value) value = value[k]; });

        if (value) {
            if (value.includes('<')) {
                el.innerHTML = value;
            } else {
                el.textContent = value;
            }
        }
    });

    // Update placeholders
    placeholders.forEach(el => {
        const keys = el.getAttribute('data-i18n-placeholder').split('.');
        let value = translations[lang];
        keys.forEach(k => { if (value) value = value[k]; });
        if (value) el.placeholder = value;
    });

    // Update active button state
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase() === lang) {
            btn.classList.add('active');
        }
    });

    // Save preference
    localStorage.setItem('dr_neex_lang', lang);
    document.documentElement.lang = lang;
}

document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor Logic
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (cursorDot && cursorOutline) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Consistent smooth follow
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 400, fill: "forwards" });
        });

        // Hover effects for cursor
        const interactiveElements = document.querySelectorAll('a, button, input');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorOutline.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorOutline.style.backgroundColor = 'transparent';
            });
        });
    }

    // Dynamic Year
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Initialize Language
    const savedLang = localStorage.getItem('dr_neex_lang') || 'en'; // Default to EN for tech feel
    setLanguage(savedLang);

    // Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // Header Scroll Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(3, 3, 4, 0.95)';
            header.style.padding = '1rem 0';
        } else {
            header.style.background = 'transparent';
            header.style.padding = '1.5rem 0';
        }
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile Menu Toggle (Simple implementation)
    const mobileTrigger = document.querySelector('.mobile-menu-trigger');
    const nav = document.querySelector('nav');

    if (mobileTrigger) {
        mobileTrigger.addEventListener('click', () => {
            nav.classList.toggle('active');
            // Toggle hamburger icon animation here if needed
        });
    }
});
