// Main Application - NOIR ATELIER
// Lenis Smooth Scroll + Core Functionality

class NoirAtelier {
    constructor() {
        this.init();
    }

    init() {
        this.setupSmoothScroll();
        this.setupMobileOptimizations();
        this.setupPerformanceOptimizations();
        this.setupAccessibility();
        this.setupImageLazyLoading();
        this.setupTouchInteractions();
    }

    setupSmoothScroll() {
        // Initialize Lenis smooth scroll
        this.lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        // Connect Lenis to GSAP ScrollTrigger
        this.lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            this.lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);
    }

    setupMobileOptimizations() {
        // Detect mobile devices
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // Adjust scroll settings for mobile
            this.lenis.options.duration = 0.8;
            this.lenis.options.smoothTouch = true;
            
            // Add touch classes
            document.body.classList.add('is-mobile');
            
            // Handle horizontal strip on mobile
            this.setupMobileHorizontalStrip();
        }

        // Handle resize events
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                const nowMobile = window.innerWidth <= 768;
                if (nowMobile !== isMobile) {
                    location.reload(); // Reload to apply mobile/desktop styles
                }
            }, 250);
        });
    }

    setupMobileHorizontalStrip() {
        const horizontalStrip = document.querySelector('.horizontal-strip');
        const stripTrack = document.querySelector('.horizontal-strip-track');
        
        if (horizontalStrip && stripTrack) {
            // Enable horizontal scrolling with snap points
            stripTrack.style.scrollSnapType = 'x mandatory';
            
            // Add snap alignment to items
            const stripItems = stripTrack.querySelectorAll('.strip-item');
            stripItems.forEach(item => {
                item.style.scrollSnapAlign = 'start';
            });
            
            // Smooth scroll for touch devices
            let isDown = false;
            let startX;
            let scrollLeft;

            stripTrack.addEventListener('mousedown', (e) => {
                isDown = true;
                startX = e.pageX - stripTrack.offsetLeft;
                scrollLeft = stripTrack.scrollLeft;
            });

            stripTrack.addEventListener('mouseleave', () => {
                isDown = false;
            });

            stripTrack.addEventListener('mouseup', () => {
                isDown = false;
            });

            stripTrack.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - stripTrack.offsetLeft;
                const walk = (x - startX) * 2;
                stripTrack.scrollLeft = scrollLeft - walk;
            });
        }
    }

    setupPerformanceOptimizations() {
        // Reduce motion for users who prefer it
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.body.classList.add('reduced-motion');
            this.lenis.options.duration = 0.3;
        }

        // Preload critical images
        this.preloadCriticalImages();

        // Setup intersection observer for lazy loading
        this.setupIntersectionObserver();

        // Debounce scroll events
        this.debounceScroll();
    }

    preloadCriticalImages() {
        const criticalImages = [
            'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80'
        ];

        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    setupIntersectionObserver() {
        // Observe elements for performance optimizations
        const observerOptions = {
            root: null,
            rootMargin: '50px',
            threshold: 0.1
        };

        this.intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-viewport');
                    
                    // Load lazy images
                    if (entry.target.tagName === 'IMG' && entry.target.dataset.src) {
                        entry.target.src = entry.target.dataset.src;
                        entry.target.removeAttribute('data-src');
                    }
                } else {
                    entry.target.classList.remove('in-viewport');
                }
            });
        }, observerOptions);

        // Observe relevant elements
        const elementsToObserve = document.querySelectorAll('section, .strip-item, .featured-story-image');
        elementsToObserve.forEach(el => this.intersectionObserver.observe(el));
    }

    setupImageLazyLoading() {
        // Native lazy loading with fallback
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        if ('loading' in HTMLImageElement.prototype) {
            // Browser supports native lazy loading
            images.forEach(img => {
                img.loading = 'lazy';
            });
        } else {
            // Fallback for older browsers
            this.setupIntersectionObserver();
        }
    }

    setupTouchInteractions() {
        // Enhanced touch interactions for mobile
        const touchElements = document.querySelectorAll('a, button, .strip-item');
        
        touchElements.forEach(element => {
            element.addEventListener('touchstart', () => {
                element.classList.add('touch-active');
            });

            element.addEventListener('touchend', () => {
                setTimeout(() => {
                    element.classList.remove('touch-active');
                }, 300);
            });
        });
    }

    setupAccessibility() {
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });

        // Focus management
        const focusableElements = document.querySelectorAll(
            'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
        );

        focusableElements.forEach(element => {
            element.addEventListener('focus', () => {
                element.classList.add('focused');
            });

            element.addEventListener('blur', () => {
                element.classList.remove('focused');
            });
        });

        // Screen reader announcements
        this.setupScreenReaderAnnouncements();
    }

    setupScreenReaderAnnouncements() {
        const announcer = document.createElement('div');
        announcer.setAttribute('aria-live', 'polite');
        announcer.setAttribute('aria-atomic', 'true');
        announcer.className = 'sr-only';
        announcer.style.cssText = `
            position: absolute;
            left: -10000px;
            width: 1px;
            height: 1px;
            overflow: hidden;
        `;
        document.body.appendChild(announcer);

        // Announce page changes
        this.announcer = announcer;
    }

    announce(message) {
        if (this.announcer) {
            this.announcer.textContent = message;
            setTimeout(() => {
                this.announcer.textContent = '';
            }, 1000);
        }
    }

    debounceScroll() {
        let ticking = false;
        
        const updateScrollState = () => {
            const scrollY = window.scrollY;
            const scrollDirection = scrollY > this.lastScrollY ? 'down' : 'up';
            
            // Update body classes for scroll-based styling
            document.body.classList.toggle('scrolling-down', scrollDirection === 'down');
            document.body.classList.toggle('scrolling-up', scrollDirection === 'up');
            
            this.lastScrollY = scrollY;
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollState);
                ticking = true;
            }
        });
    }

    // Public methods
    scrollToElement(element, duration = 1000) {
        const target = typeof element === 'string' ? document.querySelector(element) : element;
        if (target) {
            this.lenis.scrollTo(target, { duration: duration / 1000 });
        }
    }

    scrollToTop(duration = 1000) {
        this.lenis.scrollTo(0, { duration: duration / 1000 });
    }

    // Cleanup method
    destroy() {
        if (this.lenis) {
            this.lenis.destroy();
        }
        if (this.intersectionObserver) {
            this.intersectionObserver.disconnect();
        }
    }
}

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    window.noirAtelier = new NoirAtelier();
    
    // Global error handling
    window.addEventListener('error', (e) => {
        console.error('NOIR ATELIER Error:', e.error);
    });

    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`NOIR ATELIER loaded in ${loadTime}ms`);
        });
    }
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (window.noirAtelier) {
        window.noirAtelier.destroy();
    }
    if (window.noirAnimations) {
        window.noirAnimations.destroy();
    }
});
