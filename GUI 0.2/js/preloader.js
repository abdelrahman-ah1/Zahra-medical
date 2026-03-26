// ═══════════════════════════════════════════════════
// Zahra Medical — Preloader (first visit only)
// ═══════════════════════════════════════════════════

(function () {
    'use strict';

    // Only show preloader on first visit per session
    if (sessionStorage.getItem('zm_loaded')) return;
    sessionStorage.setItem('zm_loaded', 'true');

    function createPreloader() {
        const preloader = document.createElement('div');
        preloader.className = 'preloader';
        preloader.id = 'zm-preloader';
        preloader.innerHTML = `
            <img src="img/LOGO EN pur.png" alt="Zahra Medical" class="preloader-logo" />
            <div class="preloader-bar"><div class="preloader-bar-fill"></div></div>
        `;
        document.body.prepend(preloader);
    }

    function hidePreloader() {
        const preloader = document.getElementById('zm-preloader');
        if (preloader) {
            preloader.classList.add('hidden');
            setTimeout(() => preloader.remove(), 700);
        }
    }

    if (document.body) {
        createPreloader();
    } else {
        document.addEventListener('DOMContentLoaded', createPreloader);
    }

    window.addEventListener('load', () => {
        setTimeout(hidePreloader, 800);
    });

    setTimeout(hidePreloader, 3000);
})();
