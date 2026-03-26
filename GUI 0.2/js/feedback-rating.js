document.addEventListener('DOMContentLoaded', () => {
    const starBtns = document.querySelectorAll('.star-btn');
    const ratingInput = document.getElementById('ratingInput');

    if (!starBtns.length) return;

    starBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const val = parseInt(btn.getAttribute('data-val'));
            ratingInput.value = val;

            // Optional: trigger custom popup validation hook if needed
            ratingInput.setCustomValidity('');

            // Remove existing animation class to allow re-trigger
            starBtns.forEach(b => {
                b.classList.remove('animate-star-glow');
                // Force basic reflow to restart animation reliably
                void b.offsetWidth;
            });

            starBtns.forEach((b, index) => {
                if (index < val) {
                    b.classList.remove('text-outline-variant');
                    b.classList.add('text-primary-container');
                    b.style.fontVariationSettings = "'FILL' 1";
                    
                    if (val === 5) {
                        setTimeout(() => {
                            b.classList.add('animate-star-glow');
                        }, index * 80);
                    }
                } else {
                    b.classList.add('text-outline-variant');
                    b.classList.remove('text-primary-container');
                    b.style.fontVariationSettings = "'FILL' 0";
                }
            });
        });
        
        // Hover effects to preview the fill visually
        btn.addEventListener('mouseenter', () => {
            const hoverVal = parseInt(btn.getAttribute('data-val'));
            starBtns.forEach((b, index) => {
                if (index < hoverVal && index >= parseInt(ratingInput.value)) {
                    b.style.opacity = '0.5';
                    b.classList.remove('text-outline-variant');
                    b.classList.add('text-primary-container');
                }
            });
        });
        
        btn.addEventListener('mouseleave', () => {
            const currentVal = parseInt(ratingInput.value);
            starBtns.forEach((b, index) => {
                b.style.opacity = '1';
                if (index >= currentVal) {
                    b.classList.add('text-outline-variant');
                    b.classList.remove('text-primary-container');
                }
            });
        });
    });
});
