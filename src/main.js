import './styles/main.css';
import { BackgroundShader } from './webgl/BackgroundShader.js';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const translations = {
    fr: {
        nav: { home: "Accueil", software: "Modules", about: "Vision", pricing: "Tarifs", contact: "Accès Beta", backToSuite: "← Retour à la suite" },
        hero: {
            subtitle: "La suite ultime d'outils IA pour After Effects & Premiere Pro. Automatisez le banal, libérez l'impossible.",
            cta1: "Explorer les Modules",
            cta2: "Voir le Reel"
        },
        products: {
            title: "La Suite <span class=\"gradient-text-primary\">Neex</span>",
            subtitle: "Des modules puissants. Imbattables ensemble.",
            lightgen: {
                title: "Dr LightGen",
                desc: "Rendu volumétrique IA. Re-éclairage PBR temps réel et Global Illumination pour After Effects."
            },
            rbackground: {
                title: "Dr RBackground",
                desc: "Rotoscopie IA en un clic. Segmentation au pixel près. Adieu fond vert.",
                gallery: {
                    title: "Interface & Contrôles",
                    subtitle: "Un espace de travail indépendant épuré, conçu pour le masquage rapide de qualité cinéma.",
                    a1Title: "Espace Neural Workspace",
                    a1Desc: "Interface autonome intuitive pour une rotoscopie vidéo instantanée en temps réel.",
                    a2Title: "Outils de Sélection IA",
                    a2Desc: "Sélectionnez rapidement les sujets à suivre, les pinceaux d'ajustement et les zones guidées par invite.",
                    a3Title: "Raffinement du Masque",
                    a3Desc: "Ajustez la douceur des contours, le suivi des cheveux, l'opacité et les filtres temporels d'optical flow.",
                    a4Title: "Rendu Haute Fidélité",
                    a4Desc: "Prévisualisation en temps réel des masques de canal alpha avec une transparence de contour ultra-précise."
                }
            },
            librarypro: {
                title: "Dr Library Pro",
                desc: "L'extension ultime pour Premiere Pro & After Effects. Accédez à des milliers de presets, VFX et transitions en un clic.",
                hero: {
                    desc: "L'extension ultime pour Premiere Pro et After Effects. Accédez à des milliers de presets, effets VFX et transitions en un clic.",
                    cta: "Télécharger la Version d'Essai"
                },
                features: {
                    title: "Fonctionnalités <span class=\"gradient-text-secondary\">Clés</span>",
                    f1Title: "Bibliothèque Infinite",
                    f1Desc: "Plus de 1000+ presets de texte, transitions, et étalonnages couleurs prêts à l'emploi.",
                    f2Title: "VFX Studio",
                    f2Desc: "Intègre des effets visuels de qualité cinéma : éclairs, fumée, particules, sans quitter votre timeline.",
                    f3Title: "Workflow Ultra-Rapide",
                    f3Desc: "Prévisualisation instantanée au survol. Glissez-déposez pour appliquer. Gagnez des heures de montage."
                },
                contact: {
                    title: "Prêt à créer ?",
                    cta: "Nous Contacter"
                },
                gallery: {
                    title: "Explorez les Ressources",
                    subtitle: "Accédez directement à des ressources premium depuis votre panneau After Effects & Premiere Pro.",
                    a1Title: "Modèles 3D & Objets",
                    a1Desc: "Des objets 3D haute qualité optimisés pour des rendus rapides.",
                    a2Title: "Matériaux PBR",
                    a2Desc: "Des textures sans couture (seamless) avec canaux de normales, rugosité et réflectivité.",
                    a3Title: "Environnements HDRI",
                    a3Desc: "Des cartes haute plage dynamique pour des éclairages de scène réalistes.",
                    a4Title: "Sound Design Cinéma",
                    a4Desc: "Une bibliothèque d'effets sonores (SFX) haute fidélité pour enrichir vos projets visuels.",
                    partners: '<span style="color: var(--text-primary); font-weight: 500;">Écosystème intégré :</span> Dr Library Pro se connecte directement aux plus grands registres d\'actifs. Téléchargez des milliers de modèles 3D, textures et HDRI sous licence CC0 issus de partenaires de référence comme <a href="https://polyhaven.com" target="_blank" rel="noopener noreferrer" style="color: var(--accent-primary); font-weight: 600; text-decoration: none; transition: color 0.3s;">Poly Haven</a> et <a href="https://sketchfab.com" target="_blank" rel="noopener noreferrer" style="color: var(--accent-primary); font-weight: 600; text-decoration: none; transition: color 0.3s;">Sketchfab</a> en un seul clic.'
                }
            }
        },
        about: {
            title: "Conçu pour la <span class=\"highlight\">Vitesse</span>",
            desc: "DR NEEX n'est pas juste une suite de plugins. C'est une nouvelle façon de penser la post-production. Nous combinons l'IA de pointe avec des workflows intuitifs."
        },
        showcase: {
            title: "DR NEEX <span class=\"gradient-text-primary\">en Action</span>",
            subtitle: "Découvrez la puissance de nos algorithmes de traitement d'images neuronaux temps réel."
        },
        contact: {
            title: "Rejoignez la <span class=\"gradient-text-secondary\">Révolution</span>",
            subtitle: "Obtenez un accès anticipé à la beta et commencez à créer.",
            placeholder: "votre_email",
            submit: "Demander l'Accès",
            successTitle: "Bienvenue dans la Beta !",
            successDesc: "Nous avons enregistré votre adresse : <span class=\"success-email\">{email}</span>.<br>Vous recevrez votre invitation très bientôt."
        },
        pricing: {
            title: "Tarifs & <span class=\"gradient-text-primary\">Abonnements</span>",
            subtitle: "Choisissez l'offre adaptée à votre workflow de production visuelle.",
            tiers: {
                trial: {
                    name: "Version d'Essai",
                    price: "0€",
                    period: "Gratuit",
                    desc: "1 mois d'accès complet offert (offre de lancement sur 5 mois, limite 1 compte/PC), puis bascule vers l'offre Trial standard (1h/mois).",
                    cta: "Télécharger"
                },
                pro: {
                    name: "Pro Mensuel",
                    price: "29€",
                    period: "/ mois",
                    desc: "Accès illimité à tous nos modules et fonctionnalités avancées.",
                    cta: "S'abonner"
                },
                lifetime: {
                    name: "Licence à Vie",
                    price: "399€",
                    period: "Achat unique",
                    desc: "La suite complète DR Concept à vie. Sans abonnement, mises à jour incluses.",
                    cta: "Acheter"
                }
            },
            features: {
                resolution: "Résolution Maximale",
                unlimited: "Illimitée (4K+)",
                timeLimit: "Quota de traitement",
                timeLimitVal: "1 heure / mois",
                bitDepth: "Profondeur de couleur",
                bitDepthVal: "10-bit max",
                bitDepthPro: "32-bit Linéaire (EXR)",
                models: "Modèles d'IA",
                modelsVal: "Standard uniquement",
                modelsPro: "Accès complet (SOTA)",
                alphaMatting: "Alpha Matting & Détourage",
                upscale: "Super Résolution (Upscale 4x)",
                compression: "Compression des exports",
                compressionVal: "Forte (Niveau 6)",
                compressionPro: "Personnalisable (Niveaux 1-9)",
                contour: "Options de contour",
                contourVal: "Standard / Rapide uniquement",
                contourPro: "Haute Qualité (Advanced)"
            },
            comparison: {
                title: "Comparatif Détaillé",
                feature: "Fonctionnalité",
                trial: "Trial",
                pro: "Pro & Lifetime"
            }
        }
    },
    en: {
        nav: { home: "Home", software: "Modules", about: "Vision", pricing: "Pricing", contact: "Get Access", backToSuite: "← Back to Suite" },
        hero: {
            subtitle: "The ultimate suite of AI tools for After Effects & Premiere Pro. Automate the mundane, unleash the impossible.",
            cta1: "Explore Modules",
            cta2: "Watch Reel"
        },
        products: {
            title: "The <span class=\"gradient-text-primary\">Neex Suite</span>",
            subtitle: "Powerful individual modules. Unstoppable together.",
            lightgen: {
                title: "Dr LightGen",
                desc: "AI Volumetric Rendering. Real-time PBR Relighting and Global Illumination for After Effects."
            },
            rbackground: {
                title: "Dr RBackground",
                desc: "One-click AI Rotoscoping. Pixel-perfect segmentation. Goodbye Green Screen.",
                gallery: {
                    title: "Interface & Controls",
                    subtitle: "A clean standalone workspace built for fast cinema-grade masking.",
                    a1Title: "Neural Workspace",
                    a1Desc: "Intuitive standalone interface for instant real-time video rotoscoping.",
                    a2Title: "AI Selection Tools",
                    a2Desc: "Quickly select tracking subjects, adjustment brushes and prompt-guided zones.",
                    a3Title: "Mask Refinement",
                    a3Desc: "Fine-tune edge softeness, hair tracking, opacity and optical flow temporal filters.",
                    a4Title: "High-Fidelity Output",
                    a4Desc: "Real-time preview of alpha channel masks with precise edge transparency."
                }
            },
            librarypro: {
                title: "Dr Library Pro",
                desc: "The ultimate extension for Premiere Pro & After Effects. Access thousands of presets, VFX and transitions in one click.",
                hero: {
                    desc: "The ultimate extension for Premiere Pro and After Effects. Access thousands of presets, VFX effects, and transitions in one click.",
                    cta: "Download Trial Version"
                },
                features: {
                    title: "Core <span class=\"gradient-text-secondary\">Capabilities</span>",
                    f1Title: "Infinite Library",
                    f1Desc: "Over 1000+ text presets, transitions, and color gradings ready to use.",
                    f2Title: "VFX Studio",
                    f2Desc: "Integrate cinema-quality visual effects: lightning, smoke, particles, without leaving your timeline.",
                    f3Title: "Ultra-Fast Workflow",
                    f3Desc: "Instant hover preview. Drag and drop to apply. Save hours of editing."
                },
                contact: {
                    title: "Ready to create?",
                    cta: "Contact Us"
                },
                gallery: {
                    title: "Explore the Library Assets",
                    subtitle: "Direct access to premium resources directly from your host panel.",
                    a1Title: "3D Models & Assets",
                    a1Desc: "High-quality objects optimized for fast rendering.",
                    a2Title: "PBR Materials",
                    a2Desc: "Seamless textures with full normal, roughness, and metalness maps.",
                    a3Title: "HDRI Lighting",
                    a3Desc: "High dynamic range maps for realistic scene lighting.",
                    a4Title: "Cinema Sound Design",
                    a4Desc: "High-fidelity SFX library to enhance your dynamic visual projects.",
                    partners: '<span style="color: var(--text-primary); font-weight: 500;">Integrated Ecosystem:</span> Dr Library Pro connects directly to major asset registries. Download thousands of CC0 models, textures and HDRIs from industry-standard partners like <a href="https://polyhaven.com" target="_blank" rel="noopener noreferrer" style="color: var(--accent-primary); font-weight: 600; text-decoration: none; transition: color 0.3s;">Poly Haven</a> and <a href="https://sketchfab.com" target="_blank" rel="noopener noreferrer" style="color: var(--accent-primary); font-weight: 600; text-decoration: none; transition: color 0.3s;">Sketchfab</a> in a single click.'
                }
            }
        },
        about: {
            title: "Built for <span class=\"highlight\">Speed</span>",
            desc: "DR NEEX isn't just a set of plugins. It's a new way to think about post-production. We combine state-of-the-art AI with intuitive workflows."
        },
        showcase: {
            title: "DR NEEX <span class=\"gradient-text-primary\">in Action</span>",
            subtitle: "Experience the power of our real-time neural VFX engine."
        },
        contact: {
            title: "Join the <span class=\"gradient-text-secondary\">Revolution</span>",
            subtitle: "Get early access to the beta and start creating.",
            placeholder: "enter_your_email",
            submit: "Request Access",
            successTitle: "Welcome to the Beta!",
            successDesc: "We've registered your email: <span class=\"success-email\">{email}</span>.<br>You will receive your invite token shortly."
        },
        pricing: {
            title: "Pricing & <span class=\"gradient-text-primary\">Subscriptions</span>",
            subtitle: "Choose the perfect plan for your visual production workflow.",
            tiers: {
                trial: {
                    name: "Trial Version",
                    price: "€0",
                    period: "Free",
                    desc: "1 month of free full access (launch offer for 5 months, limit 1 account/PC), then reverts to standard Trial (1h/month).",
                    cta: "Download"
                },
                pro: {
                    name: "Pro Monthly",
                    price: "€29",
                    period: "/ month",
                    desc: "Unlimited access to all modules and advanced features.",
                    cta: "Subscribe"
                },
                lifetime: {
                    name: "Lifetime License",
                    price: "€399",
                    period: "One-time purchase",
                    desc: "The full DR Concept suite forever. No subscription, free updates.",
                    cta: "Buy Now"
                }
            },
            features: {
                resolution: "Max Resolution",
                unlimited: "Unlimited (4K+)",
                timeLimit: "Processing Time",
                timeLimitVal: "1 hour / month",
                bitDepth: "Color Bit Depth",
                bitDepthVal: "10-bit max",
                bitDepthPro: "32-bit Linear (EXR)",
                models: "AI Models",
                modelsVal: "Standard only",
                modelsPro: "Full Access (SOTA)",
                alphaMatting: "Alpha Matting & Refinement",
                upscale: "4x Super Resolution",
                compression: "Export Compression",
                compressionVal: "Strong (Level 6)",
                compressionPro: "Customizable (Levels 1-9)",
                contour: "Contour Options",
                contourVal: "Standard / Fast only",
                contourPro: "High Quality (Advanced)"
            },
            comparison: {
                title: "Detailed Comparison",
                feature: "Feature",
                trial: "Trial",
                pro: "Pro & Lifetime"
            }
        }
    }
};

function setLanguage(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    const placeholders = document.querySelectorAll('[data-i18n-placeholder]');

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

    placeholders.forEach(el => {
        const keys = el.getAttribute('data-i18n-placeholder').split('.');
        let value = translations[lang];
        keys.forEach(k => { if (value) value = value[k]; });
        if (value) el.placeholder = value;
    });

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase() === lang) {
            btn.classList.add('active');
        }
    });

    const successDescEl = document.getElementById('success-desc');
    if (successDescEl) {
        const email = localStorage.getItem('dr_neex_registered_email') || '';
        successDescEl.innerHTML = translations[lang].contact.successDesc.replace('{email}', email);
    }

    localStorage.setItem('dr_neex_lang', lang);
    document.documentElement.lang = lang;
}

// Ensure setLanguage is globally available for inline onclick
window.setLanguage = setLanguage;

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lenis (Smooth Scroll)
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 1.5. Mobile Menu Toggle
    const menuTrigger = document.querySelector('.mobile-menu-trigger');
    const headerEl = document.querySelector('header');
    const navLinks = document.querySelectorAll('nav ul li a');

    if (menuTrigger && headerEl) {
        menuTrigger.addEventListener('click', () => {
            const isOpen = headerEl.classList.toggle('menu-open');
            if (isOpen) {
                lenis.stop();
                document.body.style.overflow = 'hidden';
            } else {
                lenis.start();
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (headerEl.classList.contains('menu-open')) {
                    headerEl.classList.remove('menu-open');
                    lenis.start();
                    document.body.style.overflow = '';
                }
            });
        });
    }

    // 2. Initialize WebGL Background
    new BackgroundShader('webgl-bg');



    // 4. GSAP Scroll Animations
    gsap.utils.toArray('.gsap-fade-up').forEach(element => {
        gsap.fromTo(element, 
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            }
        );
    });

    // 5. Header Scroll Effect
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

    // 6. Init Language
    const savedLang = localStorage.getItem('dr_neex_lang') || 'en';
    setLanguage(savedLang);

    // 7. Dynamic Year
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 8. Beta Access Form Handling
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        // Create dynamic error message container
        const errorMsg = document.createElement('div');
        errorMsg.className = 'form-error-msg';
        newsletterForm.appendChild(errorMsg);

        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const submitBtn = newsletterForm.querySelector('button[type="submit"]');

        newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Reset state
            errorMsg.classList.remove('visible');
            errorMsg.textContent = '';
            
            const email = emailInput.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!emailRegex.test(email)) {
                const currentLang = localStorage.getItem('dr_neex_lang') || 'en';
                errorMsg.textContent = currentLang === 'fr' ? 'Veuillez saisir un e-mail valide.' : 'Please enter a valid email.';
                errorMsg.classList.add('visible');
                return;
            }

            // Set loading state
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            emailInput.disabled = true;

            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        access_key: "e43ca25e-267a-4341-a226-fcd0f377f8bd",
                        email: email,
                        subject: "Nouvelle inscription Bêta - DR NEEX",
                        from_name: "Site DR NEEX"
                    }),
                });

                const result = await response.json();

                if (!response.ok || result.success === false) {
                    throw new Error(result.message || 'Error occurred');
                }

                // Save to localstorage
                localStorage.setItem('dr_neex_registered_email', email);

                const currentLang = localStorage.getItem('dr_neex_lang') || 'en';
                const successTitle = translations[currentLang].contact.successTitle;
                const successDesc = translations[currentLang].contact.successDesc.replace('{email}', email);

                const accessCard = document.querySelector('#access .access-card');
                if (accessCard) {
                    // Fade out existing content
                    gsap.to(accessCard.children, {
                        opacity: 0,
                        y: -20,
                        duration: 0.4,
                        stagger: 0.1,
                        onComplete: () => {
                            // Clear and inject success card
                            accessCard.innerHTML = `
                                <div class="access-success-panel">
                                    <div class="success-icon">✨</div>
                                    <h2 class="success-title" data-i18n="contact.successTitle">${successTitle}</h2>
                                    <p class="success-message" id="success-desc">${successDesc}</p>
                                </div>
                            `;
                        }
                    });
                }
            } catch (err) {
                console.error('Beta registration error:', err);
                const currentLang = localStorage.getItem('dr_neex_lang') || 'en';
                errorMsg.textContent = currentLang === 'fr' 
                    ? 'Impossible de se connecter au serveur. Veuillez réessayer.' 
                    : 'Unable to reach the server. Please try again.';
                errorMsg.classList.add('visible');
                
                // Reset button state
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                emailInput.disabled = false;
            }
        });
    }

    // 9. Check if already registered
    const registeredEmail = localStorage.getItem('dr_neex_registered_email');
    if (registeredEmail) {
        const accessCard = document.querySelector('#access .access-card');
        if (accessCard) {
            const currentLang = localStorage.getItem('dr_neex_lang') || 'en';
            const successTitle = translations[currentLang].contact.successTitle;
            const successDesc = translations[currentLang].contact.successDesc.replace('{email}', registeredEmail);
            accessCard.innerHTML = `
                <div class="access-success-panel">
                    <div class="success-icon">✨</div>
                    <h2 class="success-title" data-i18n="contact.successTitle">${successTitle}</h2>
                    <p class="success-message" id="success-desc">${successDesc}</p>
                </div>
            `;
        }
    }

    // 10. 3D Coverflow Carousel
    const carouselTrack = document.querySelector('.carousel-track');
    const cards = document.querySelectorAll('.carousel-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (carouselTrack && cards.length > 0) {
        let activeIndex = 0;
        let autoPlayInterval;

        function updateCarousel() {
            cards.forEach((card, index) => {
                const distance = index - activeIndex;
                const absDistance = Math.abs(distance);

                // Check if screen is mobile (max-width: 900px)
                const isMobile = window.innerWidth <= 900;
                const isUltraMobile = window.innerWidth <= 480;

                card.classList.remove('active');

                if (distance === 0) {
                    card.classList.add('active');
                    if (isMobile) {
                        card.style.transform = 'translate(-50%, -50%) scale(1) translateZ(0)';
                    } else {
                        card.style.transform = 'translate(-50%, -50%) translateZ(120px) rotateY(0deg)';
                    }
                    card.style.opacity = '1';
                    card.style.zIndex = '10';
                    card.style.pointerEvents = 'auto';

                    // Play video if card has one
                    const video = card.querySelector('video');
                    if (video) {
                        video.play().catch(() => {});
                    }
                } else {
                    // Pause video on inactive cards
                    const video = card.querySelector('video');
                    if (video) {
                        video.pause();
                    }

                    if (isUltraMobile) {
                        // On very small screens, hide inactive cards to avoid overlap issues
                        card.style.transform = 'translate(-50%, -50%) scale(0.6)';
                        card.style.opacity = '0';
                        card.style.zIndex = '1';
                        card.style.pointerEvents = 'none';
                    } else if (isMobile) {
                        // Basic 2D layout for mobile
                        const translateX = distance * 80;
                        card.style.transform = `translate(calc(-50% + ${translateX}px), -50%) scale(0.75)`;
                        card.style.opacity = '0.5';
                        card.style.zIndex = (10 - absDistance).toString();
                        card.style.pointerEvents = 'auto';
                    } else {
                        // Standard 3D Coverflow for desktop/tablets
                        const translateX = distance * 180 - (Math.sign(distance) * 40);
                        const translateZ = -120 * absDistance;
                        const rotateY = -45 * Math.sign(distance);
                        card.style.transform = `translate(calc(-50% + ${translateX}px), -50%) translateZ(${translateZ}px) rotateY(${rotateY}deg)`;
                        card.style.opacity = absDistance > 2 ? '0' : '0.6';
                        card.style.zIndex = (10 - absDistance).toString();
                        card.style.pointerEvents = absDistance > 2 ? 'none' : 'auto';
                    }
                }
            });
        }

        function slideNext() {
            activeIndex = (activeIndex + 1) % cards.length;
            updateCarousel();
        }

        function slidePrev() {
            activeIndex = (activeIndex - 1 + cards.length) % cards.length;
            updateCarousel();
        }

        function startAutoPlay() {
            if (!autoPlayInterval) {
                autoPlayInterval = setInterval(slideNext, 3000);
            }
        }

        function stopAutoPlay() {
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
                autoPlayInterval = null;
            }
        }

        // Event listeners for controls
        if (nextBtn) nextBtn.addEventListener('click', () => {
            slideNext();
            stopAutoPlay();
            startAutoPlay();
        });

        if (prevBtn) prevBtn.addEventListener('click', () => {
            slidePrev();
            stopAutoPlay();
            startAutoPlay();
        });

        // Click directly on a side card to focus it
        cards.forEach((card, index) => {
            card.addEventListener('click', () => {
                if (index !== activeIndex) {
                    activeIndex = index;
                    updateCarousel();
                    stopAutoPlay();
                    startAutoPlay();
                }
            });
        });

        // Pause autoplay on mouse hover
        const container = document.querySelector('.carousel-container');
        if (container) {
            container.addEventListener('mouseenter', stopAutoPlay);
            container.addEventListener('mouseleave', startAutoPlay);
        }

        // Handle window resize to adapt layout
        window.addEventListener('resize', updateCarousel);

        // Initial launch
        updateCarousel();
        startAutoPlay();
    }
});
