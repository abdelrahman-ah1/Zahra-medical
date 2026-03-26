// js/animations.js
document.addEventListener('DOMContentLoaded', () => {
    // 1. Tag major sections to fade in
    const sections = document.querySelectorAll('main > section');
    sections.forEach((section) => {
        section.setAttribute('data-aos', 'fade-up');
        section.setAttribute('data-aos-duration', '800');
    });

    // 2. Tag cards for staggered fade-ups
    const cards = document.querySelectorAll('.rounded-2xl, .rounded-3xl, .rounded-\\[24px\\], .rounded-\\[32px\\]');
    
    // Sort cards strictly by their layout visual arrangement?
    // Actually standard querySelectorAll returns them in DOM order, which usually equates to visual top-to-bottom/left-to-right.
    
    let delayCounter = 0;
    cards.forEach((card) => {
        const tag = card.tagName.toLowerCase();
        // Ignore buttons, links, or very small decorative elements
        if (tag !== 'button' && tag !== 'a' && !card.classList.contains('w-12') && !card.classList.contains('h-12')) {
            card.setAttribute('data-aos', 'fade-up');
            // Stagger animation delay up to 3 blocks
            card.setAttribute('data-aos-delay', (delayCounter % 3) * 180);
            delayCounter++;
        }
    });

    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            once: true, // whether animation should happen only once - while scrolling down
            offset: 80, // offset (in px) from the original trigger point
            easing: 'ease-out-cubic',
        });
    }

    // 3. Global Scroll Progress Bar
    const progressBarContainer = document.createElement('div');
    progressBarContainer.className = 'fixed top-0 left-0 w-full h-[3px] z-[100] pointer-events-none bg-transparent';
    const progressBar = document.createElement('div');
    progressBar.className = 'h-full bg-gradient-to-r from-[#7d125e] to-[#ffc1e1] origin-left transition-all duration-100 ease-out shadow-[0_0_10px_rgba(155,47,119,0.5)]';
    progressBar.style.width = '0%';
    progressBarContainer.appendChild(progressBar);
    document.body.appendChild(progressBarContainer);

    // 4. Subtle Parallax for hero images
    const parallaxImages = document.querySelectorAll('header img.object-cover, .brand-section img');

    parallaxImages.forEach(img => {
        img.style.transformOrigin = 'center center';
        img.style.transform = 'scale(1.15)';
        if (img.parentElement && !img.parentElement.classList.contains('overflow-hidden')) {
            img.parentElement.classList.add('overflow-hidden');
        }
    });

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
                const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                
                if (height > 0) {
                    const scrolled = (winScroll / height) * 100;
                    progressBar.style.width = scrolled + '%';
                }

                parallaxImages.forEach(img => {
                    const speed = 0.12;
                    const yPos = (winScroll * speed);
                    img.style.transform = `translateY(${yPos}px) scale(1.15)`;
                });
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

});
