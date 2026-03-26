document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (!themeToggleBtn) return;
    
    themeToggleBtn.textContent = document.documentElement.classList.contains('dark') ? 'light_mode' : 'dark_mode';

    themeToggleBtn.addEventListener('click', () => {
        themeToggleBtn.style.transform = 'rotate(180deg)';
        setTimeout(() => themeToggleBtn.style.transform = '', 300);

        document.documentElement.classList.toggle('dark');
        const isDark = document.documentElement.classList.contains('dark');
        localStorage.theme = isDark ? 'dark' : 'light';
        
        themeToggleBtn.textContent = isDark ? 'light_mode' : 'dark_mode';
    });
});
