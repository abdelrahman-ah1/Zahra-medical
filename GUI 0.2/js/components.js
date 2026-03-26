// ═══════════════════════════════════════════════════
// Zahra Medical — Shared Components Builder v2.0
// Premium Edition with scroll-aware header, FAB stack, 
// and enhanced footer
// ═══════════════════════════════════════════════════

const headerHTML = `
    <!-- TopNavBar -->
    <nav class="fixed top-0 w-full z-50 bg-white/85 dark:bg-slate-900/85 backdrop-blur-md shadow-sm dark:shadow-none font-plus-jakarta-sans antialiased tracking-tight transition-all duration-300" id="site-header-nav">
        <div class="flex justify-between items-center px-8 py-4 max-w-8xl mx-auto transition-all duration-300" id="header-inner">
            <div class="text-2xl font-bold tracking-tighter text-[#7d125e] dark:text-[#9b2f77]">
                <a href="index.html"><img alt="Zahra Medical Logo" class="h-12 w-auto object-contain transition-all duration-300" id="header-logo" src="img/LOGO EN pur.png" /></a>
            </div>
            <div class="hidden md:flex items-center gap-8" id="desktop-nav-links">
                <a class="nav-link font-semibold transition-colors duration-300 relative pb-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-[#7d125e] dark:after:bg-[#9b2f77] after:origin-left after:transition-transform after:duration-300" href="index.html">Home</a>
                <a class="nav-link font-semibold transition-colors duration-300 relative pb-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-[#7d125e] dark:after:bg-[#9b2f77] after:origin-left after:transition-transform after:duration-300" href="about.html">About</a>
                <a class="nav-link font-semibold transition-colors duration-300 relative pb-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-[#7d125e] dark:after:bg-[#9b2f77] after:origin-left after:transition-transform after:duration-300" href="reservation.html">Service</a>
                <a class="nav-link font-semibold transition-colors duration-300 relative pb-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-[#7d125e] dark:after:bg-[#9b2f77] after:origin-left after:transition-transform after:duration-300" href="feedback.html">Feedback</a>
                <a class="nav-link font-semibold transition-colors duration-300 relative pb-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-[#7d125e] dark:after:bg-[#9b2f77] after:origin-left after:transition-transform after:duration-300" href="contact.html">Contact</a>
            </div>
            <div class="flex items-center gap-4">
                <button id="theme-toggle-header" class="material-symbols-outlined text-slate-600 dark:text-slate-400 cursor-pointer scale-95 active:scale-90 transition-transform duration-300 hover:text-[#9b2f77] dark:hover:text-[#9b2f77]" aria-label="Toggle Dark Mode" title="Toggle Dark/Light Mode">dark_mode</button>
                <div class="h-6 w-[1px] bg-slate-200 dark:bg-slate-700 mx-1"></div>
                <div id="header-auth-section" class="flex items-center gap-3">
                    <a class="bg-gradient-to-br from-[#7d125e] to-[#9b2f77] text-white px-6 py-2 rounded-full font-semibold text-sm active:scale-95 transition-transform shadow-sm flex items-center btn-magnetic" href="sign_in_up.html">Login</a>
                </div>
            </div>
        </div>
        <div class="bg-slate-100 dark:bg-slate-800 h-[1px] opacity-15"></div>
    </nav>`;

const footerHTML = `
    <!-- Footer -->
    <footer class="bg-[#f9f9ff] dark:bg-slate-950 w-full py-12 px-8 mt-20 font-plus-jakarta-sans text-sm relative z-40 pb-32 md:pb-12">
        <div class="bg-[#e7e8ee] dark:bg-slate-800 h-[1px] mb-12"></div>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-8xl mx-auto">
            <div class="flex flex-col gap-4">
                <div class="text-xl font-bold text-[#7d125e]"><img loading="lazy" src="img/LOGO EN pur.png" class="h-12 w-auto object-contain" alt="Zahra Medical Logo"></div>
                <p class="text-slate-500 dark:text-slate-400 leading-relaxed">Precision maintenance. Bespoke care. Your technical partner in medical excellence.</p>
                <!-- Social Icons -->
                <div class="flex gap-3 mt-2">
                    <a href="#" class="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-[#7d125e] hover:text-white transition-all duration-300" aria-label="LinkedIn">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    </a>
                    <a href="#" class="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-gradient-to-br hover:from-[#f09433] hover:to-[#bc1888] hover:text-white transition-all duration-300" aria-label="Instagram">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                    </a>
                    <a href="#" class="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-[#1877f2] hover:text-white transition-all duration-300" aria-label="Facebook">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </a>
                </div>
            </div>
            <div>
                <h5 class="font-bold mb-6 text-slate-800 dark:text-slate-200">Solutions</h5>
                <ul class="flex flex-col gap-4">
                    <li><a class="text-slate-500 dark:text-slate-400 hover:text-[#9b2f77] transition-colors" href="reservation.html">B2B Solutions</a></li>
                    <li><a class="text-slate-500 dark:text-slate-400 hover:text-[#9b2f77] transition-colors" href="inventory.html">Consumer Store</a></li>
                    <li><a class="text-slate-500 dark:text-slate-400 hover:text-[#9b2f77] transition-colors" href="quote.html">Request Quote</a></li>
                </ul>
            </div>
            <div>
                <h5 class="font-bold mb-6 text-slate-800 dark:text-slate-200">Support</h5>
                <ul class="flex flex-col gap-4">
                    <li><a class="text-slate-500 dark:text-slate-400 hover:text-[#9b2f77] transition-colors" href="admin-dashboard.html">Technical Help</a></li>
                    <li><a class="text-slate-500 dark:text-slate-400 hover:text-[#9b2f77] transition-colors" href="contact.html">Contact Us</a></li>
                    <li><a class="text-slate-500 dark:text-slate-400 hover:text-[#9b2f77] transition-colors" href="feedback.html">Give Feedback</a></li>
                </ul>
            </div>
            <div>
                <h5 class="font-bold mb-6 text-slate-800 dark:text-slate-200">Stay Updated</h5>
                <p class="text-slate-500 dark:text-slate-400 text-xs mb-4 leading-relaxed">Get monthly maintenance tips and exclusive offers.</p>
                <form class="flex gap-2" onsubmit="event.preventDefault(); if(window.ZahraToast) ZahraToast.success('Subscribed successfully!'); this.reset();">
                    <input type="email" required placeholder="your@email.com" class="flex-1 bg-slate-100 dark:bg-slate-800 border-none rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-[#7d125e]/40 text-on-surface outline-none" />
                    <button type="submit" class="bg-[#7d125e] text-white px-3 py-2 rounded-lg text-xs font-bold hover:bg-[#9b2f77] transition-colors">Join</button>
                </form>
            </div>
        </div>
        <div class="max-w-8xl mx-auto pt-12 mt-12 border-t border-slate-200 dark:border-slate-800 text-slate-500 text-xs flex flex-col md:flex-row justify-between gap-4">
            <p>© 2026 Zahra Medical. Precision Maintenance. Bespoke Care.</p>
            <div class="flex gap-6 items-center">
                <div class="flex gap-2 items-center">
                    <span class="material-symbols-outlined text-sm">verified_user</span>
                    <span>ISO 9001 Certified</span>
                </div>
                <button onclick="window.scrollTo({top:0,behavior:'smooth'})" class="text-[#7d125e] dark:text-[#9b2f77] font-bold hover:underline flex items-center gap-1 cursor-pointer">
                    Back to top <span class="material-symbols-outlined text-sm">arrow_upward</span>
                </button>
            </div>
        </div>
    </footer>
    <!-- BottomNavBar (Mobile Only) -->
    <nav class="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 shadow-[0_-10px_30px_rgba(125,18,94,0.08)] rounded-t-[24px]" id="mobile-nav-links">
        <a href="index.html" class="mobile-link flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 active:bg-slate-100 dark:active:bg-slate-800 transition-all duration-300 rounded-[24px] px-6 py-2">
            <span class="material-symbols-outlined">home</span>
            <span class="text-[10px] font-bold uppercase tracking-wider mt-1">Home</span>
        </a>
        <a href="about.html" class="mobile-link flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 active:bg-slate-100 dark:active:bg-slate-800 transition-all duration-300 rounded-[24px] px-6 py-2">
            <span class="material-symbols-outlined">description</span>
            <span class="text-[10px] font-bold uppercase tracking-wider mt-1">About</span>
        </a>
        <a href="reservation.html" class="mobile-link flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 active:bg-slate-100 dark:active:bg-slate-800 transition-all duration-300 rounded-[24px] px-6 py-2">
            <span class="material-symbols-outlined">calendar_today</span>
            <span class="text-[10px] font-bold uppercase tracking-wider mt-1">Service</span>
        </a>
        <a href="feedback.html" class="mobile-link flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 active:bg-slate-100 dark:active:bg-slate-800 transition-all duration-300 rounded-[24px] px-6 py-2">
            <span class="material-symbols-outlined">rate_review</span>
            <span class="text-[10px] font-bold uppercase tracking-wider mt-1">Feedback</span>
        </a>
        <a href="contact.html" class="mobile-link flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 active:bg-slate-100 dark:active:bg-slate-800 transition-all duration-300 rounded-[24px] px-6 py-2">
            <span class="material-symbols-outlined">message</span>
            <span class="text-[10px] font-bold uppercase tracking-wider mt-1">Contact</span>
        </a>
    </nav>`;

// ── FAB Stack HTML ──────────────────────────────────────
const fabHTML = `
    <div class="fab-container" id="zm-fab-container">
        <button class="fab-btn fab-scroll-top" id="fab-scroll-top" onclick="window.scrollTo({top:0,behavior:'smooth'})" aria-label="Scroll to top" title="Back to top">
            <span class="material-symbols-outlined">arrow_upward</span>
        </button>
        <a href="https://wa.me/201110334424?text=Hi,%20I'd%20like%20to%20inquire%20about%20your%20services." target="_blank" class="fab-btn fab-whatsapp" aria-label="Chat on WhatsApp" title="Chat on WhatsApp">
            <div class="pulse-ring"></div>
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        </a>
    </div>`;

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inject Header and Footer
    const headerPlaceholder = document.getElementById('site-header-container');
    if (headerPlaceholder) {
        headerPlaceholder.innerHTML = headerHTML;
    }
    const footerPlaceholder = document.getElementById('site-footer-container');
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = footerHTML;
    }

    // 1b. Inject FAB stack (only on non-dashboard pages)
    if (!document.querySelector('#sidebar')) {
        document.body.insertAdjacentHTML('beforeend', fabHTML);
    }

    // 2. Active Link Highlighting logic
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    
    // Desktop Nav Highlighting
    const desktopLinks = document.querySelectorAll('#desktop-nav-links .nav-link');
    desktopLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '' && href === 'index.html')) {
            link.classList.remove('text-slate-600', 'dark:text-slate-400', 'after:scale-x-0', 'hover:after:scale-x-100', 'hover:text-[#9b2f77]');
            link.classList.add('text-[#7d125e]', 'dark:text-[#9b2f77]', 'after:scale-x-100');
        } else {
            link.classList.add('text-slate-600', 'dark:text-slate-400', 'after:scale-x-0', 'hover:after:scale-x-100', 'hover:text-[#9b2f77]');
            link.classList.remove('text-[#7d125e]', 'dark:text-[#9b2f77]', 'after:scale-x-100');
        }
    });

    // Mobile Nav Highlighting
    const mobileLinks = document.querySelectorAll('#mobile-nav-links .mobile-link');
    mobileLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '' && href === 'index.html')) {
            link.classList.remove('text-slate-400', 'dark:text-slate-500');
            link.classList.add('bg-[#9b2f77]', 'text-white', 'scale-[1.05]', 'shadow-md', 'hover:-translate-y-1');
        }
    });

    // 3. Theme Toggle hook for Header
    const injectedThemeBtn = document.getElementById('theme-toggle-header');
    if (injectedThemeBtn) {
        const updateIcon = () => {
            const isDark = document.documentElement.classList.contains('dark');
            injectedThemeBtn.innerText = isDark ? 'light_mode' : 'dark_mode';
        };
        updateIcon();

        injectedThemeBtn.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            if (document.documentElement.classList.contains('dark')) {
                localStorage.theme = 'dark';
            } else {
                localStorage.theme = 'light';
            }
            updateIcon();
            window.dispatchEvent(new Event('themeChanged'));
        });
        
        window.addEventListener('themeChanged', updateIcon);
    }

    // 4. Auth & Session Persistence logic
    const authSection = document.getElementById('header-auth-section');
    if (authSection) {
        const userName = localStorage.getItem('userName');
        const userAvatar = localStorage.getItem('userAvatar');
        
        if (userName) {
            authSection.innerHTML = `
                <div class="flex items-center gap-3">
                    <div class="hidden lg:block text-right">
                        <p class="text-[10px] font-extrabold text-[#7d125e] dark:text-[#9b2f77] uppercase tracking-widest leading-none mb-1">Authenticated</p>
                        <p class="text-xs font-bold text-slate-700 dark:text-slate-200">${userName}</p>
                    </div>
                    <a href="profile.html" class="relative group">
                        <div class="w-10 h-10 rounded-full border-2 border-[#7d125e]/20 overflow-hidden group-hover:border-[#7d125e] transition-all">
                            <img src="${userAvatar || 'https://ui-avatars.com/api/?name='+userName+'&background=7d125e&color=fff'}" class="w-full h-full object-cover">
                        </div>
                    </a>
                    <button onclick="handleLogout()" class="material-symbols-outlined text-slate-400 hover:text-error transition-colors text-xl" title="Logout">logout</button>
                </div>
            `;
        }
    }

    // 5. Scroll-Aware Header ──────────────────────────────
    const headerNav = document.getElementById('site-header-nav');
    const headerInner = document.getElementById('header-inner');
    const headerLogo = document.getElementById('header-logo');

    if (headerNav) {
        let lastScrollY = 0;
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollY = window.scrollY;

                    if (scrollY > 50) {
                        headerNav.classList.add('shadow-lg');
                        headerNav.classList.remove('shadow-sm');
                        if (headerInner) {
                            headerInner.style.paddingTop = '0.5rem';
                            headerInner.style.paddingBottom = '0.5rem';
                        }
                        if (headerLogo) headerLogo.style.height = '2rem';
                    } else {
                        headerNav.classList.remove('shadow-lg');
                        headerNav.classList.add('shadow-sm');
                        if (headerInner) {
                            headerInner.style.paddingTop = '';
                            headerInner.style.paddingBottom = '';
                        }
                        if (headerLogo) headerLogo.style.height = '';
                    }

                    lastScrollY = scrollY;
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    // 6. FAB Scroll Visibility ────────────────────────────
    const fabScrollTop = document.getElementById('fab-scroll-top');
    if (fabScrollTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                fabScrollTop.classList.add('visible');
            } else {
                fabScrollTop.classList.remove('visible');
            }
        }, { passive: true });

        // WhatsApp FAB is always visible (with entrance delay)
        const fabWa = document.querySelector('.fab-whatsapp');
        if (fabWa) {
            setTimeout(() => fabWa.classList.add('visible'), 3000);
        }
    }
});

function handleLogout() {
    localStorage.removeItem('userName');
    window.location.href = 'sign_in_up.html';
}
