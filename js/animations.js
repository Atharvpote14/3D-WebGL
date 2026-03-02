// Animation System - NOIR ATELIER
// GSAP + ScrollTrigger Implementation

class NoirAnimations {
    constructor() {
        this.init();
    }

    init() {
        // Register GSAP plugins
        gsap.registerPlugin(ScrollTrigger);

        // Initialize animations
        this.setupLoadingScreen();
        this.setupHeroAnimations();
        this.setupStatementAnimations();
        this.setupFeaturedStoryAnimations();
        this.setupHorizontalStrip();
        this.setupManifestoAnimations();
        this.setupContactAnimations();
        this.setupParallaxEffects();
        this.setupRefreshOnResize();
    }

    setupLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        const heroHeadline = document.querySelector('.hero-headline');

        // Hide loading screen after content loads
        window.addEventListener('load', () => {
            setTimeout(() => {
                loadingScreen.classList.add('is-hidden');
                heroHeadline.classList.add('is-loaded');
                
                // Remove loading screen from DOM after animation
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 1600);
            }, 800);
        });
    }

    setupHeroAnimations() {
        const heroHeadline = document.querySelector('.hero-headline');
        const heroSubtext = document.querySelector('.hero-subtext');
        const heroImage = document.querySelector('.hero-image');

        // Hero background parallax
        gsap.to(heroImage, {
            yPercent: -50,
            ease: "none",
            scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "bottom top",
                scrub: 1
            }
        });

        // Hero text letter spacing compression on scroll
        gsap.to(heroHeadline, {
            letterSpacing: "-0.05em",
            ease: "none",
            scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "50% top",
                scrub: 1
            }
        });
    }

    setupStatementAnimations() {
        const statementHeadline = document.querySelector('.statement-headline');
        const statementLines = statementHeadline.querySelectorAll('.line');

        // Mask reveal animation for statement lines
        statementLines.forEach((line, index) => {
            gsap.fromTo(line, 
                {
                    yPercent: 100,
                    opacity: 0
                },
                {
                    yPercent: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: "power3.out",
                    delay: index * 0.12,
                    scrollTrigger: {
                        trigger: ".statement",
                        start: "top 80%",
                        end: "bottom 60%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // Subtle upward movement on scroll
        gsap.fromTo(statementHeadline,
            {
                y: 30
            },
            {
                y: -10,
                ease: "none",
                scrollTrigger: {
                    trigger: ".statement",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                }
            }
        );
    }

    setupFeaturedStoryAnimations() {
        const featuredStory = document.querySelector('.featured-story');
        const featuredImage = document.querySelector('.featured-story-image');
        const featuredContent = document.querySelector('.featured-story-content');
        const imageWrapper = document.querySelector('.image-wrapper');

        // Image parallax effect
        gsap.to(imageWrapper, {
            yPercent: -20,
            ease: "none",
            scrollTrigger: {
                trigger: ".featured-story",
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            }
        });

        // Reveal animations
        gsap.fromTo(featuredImage,
            {
                yPercent: 40,
                opacity: 0,
                scale: 0.95
            },
            {
                yPercent: 0,
                opacity: 1,
                scale: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".featured-story",
                    start: "top 80%",
                    end: "bottom 60%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        gsap.fromTo(featuredContent,
            {
                yPercent: 40,
                opacity: 0
            },
            {
                yPercent: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                delay: 0.08,
                scrollTrigger: {
                    trigger: ".featured-story",
                    start: "top 80%",
                    end: "bottom 60%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    }

    setupHorizontalStrip() {
        const horizontalStrip = document.querySelector('.horizontal-strip');
        const stripTrack = document.querySelector('.horizontal-strip-track');
        const stripItems = document.querySelectorAll('.strip-item');

        // Calculate total width for horizontal scroll
        const getStripWidth = () => {
            return Array.from(stripItems).reduce((acc, item) => {
                const style = window.getComputedStyle(item);
                const gap = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
                return acc + item.offsetWidth + gap;
            }, 0);
        };

        const totalWidth = getStripWidth();
        const maxScroll = totalWidth - window.innerWidth;

        // Horizontal scroll animation
        if (window.innerWidth > 768) {
            // Reset the track transform for GSAP animation
            gsap.set(stripTrack, { 
                x: 0,
                y: "-50%" // Keep vertical centering
            });
            
            gsap.to(stripTrack, {
                x: -maxScroll,
                ease: "none",
                scrollTrigger: {
                    trigger: ".horizontal-strip",
                    start: "top top",
                    end: () => `+=${window.innerHeight * 1.5}`, // Reduced scroll distance for more intensity
                    scrub: 0.8, // Faster scrub for more responsive feel
                    pin: ".horizontal-strip",
                    pinSpacing: true,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        // Ensure smooth scrolling to the very end
                        const progress = Math.min(self.progress, 1);
                        gsap.set(stripTrack, { 
                            x: -maxScroll * progress,
                            y: "-50%" // Maintain vertical centering
                        });
                    }
                }
            });
        }

        // Reveal animations for strip items
        stripItems.forEach((item, index) => {
            gsap.fromTo(item,
                {
                    yPercent: 30,
                    opacity: 0,
                    scale: 0.9
                },
                {
                    yPercent: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    ease: "power3.out",
                    delay: index * 0.08,
                    scrollTrigger: {
                        trigger: ".horizontal-strip",
                        start: "top 80%",
                        end: "bottom 60%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });
    }

    setupManifestoAnimations() {
        const manifesto = document.querySelector('.manifesto');
        const manifestoContent = document.querySelector('.manifesto-content');
        const manifestoParagraphs = document.querySelectorAll('.manifesto-paragraph');

        // Main content reveal
        gsap.fromTo(manifestoContent,
            {
                yPercent: 60,
                opacity: 0
            },
            {
                yPercent: 0,
                opacity: 1,
                duration: 1.6,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".manifesto",
                    start: "top 80%",
                    end: "bottom 60%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        // Stagger paragraph reveals
        manifestoParagraphs.forEach((paragraph, index) => {
            gsap.fromTo(paragraph,
                {
                    yPercent: 30,
                    opacity: 0
                },
                {
                    yPercent: 0,
                    opacity: 0.9,
                    duration: 0.8,
                    ease: "power3.out",
                    delay: index * 0.12,
                    scrollTrigger: {
                        trigger: ".manifesto",
                        start: "top 70%",
                        end: "bottom 50%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });
    }

    setupContactAnimations() {
        const contactLinks = document.querySelectorAll('.contact-link');

        contactLinks.forEach((link, index) => {
            gsap.fromTo(link,
                {
                    yPercent: 30,
                    opacity: 0
                },
                {
                    yPercent: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power3.out",
                    delay: index * 0.08,
                    scrollTrigger: {
                        trigger: ".contact",
                        start: "top 80%",
                        end: "bottom 60%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });
    }

    setupParallaxEffects() {
        // General parallax for elements with data-speed attribute
        const parallaxElements = document.querySelectorAll('[data-speed]');
        
        parallaxElements.forEach(element => {
            const speed = parseFloat(element.dataset.speed) || 0.5;
            
            gsap.to(element, {
                yPercent: -50 * speed,
                ease: "none",
                scrollTrigger: {
                    trigger: element,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                }
            });
        });
    }

    setupRefreshOnResize() {
        // Refresh ScrollTrigger on window resize
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                ScrollTrigger.refresh();
            }, 250);
        });
    }

    // Public methods for manual control
    revealElement(element) {
        gsap.to(element, {
            opacity: 1,
            yPercent: 0,
            duration: 0.8,
            ease: "power3.out"
        });
    }

    hideElement(element) {
        gsap.to(element, {
            opacity: 0,
            yPercent: 20,
            duration: 0.6,
            ease: "power3.in"
        });
    }

    // Destroy method for cleanup
    destroy() {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }
}

// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.noirAnimations = new NoirAnimations();
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (window.noirAnimations) {
        window.noirAnimations.destroy();
    }
});
