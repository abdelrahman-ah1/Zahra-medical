// js/form-validation.js

// Global Toast Engine
window.showToast = function(message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'fixed bottom-24 md:bottom-8 right-4 md:right-8 z-[100] flex flex-col gap-3 pointer-events-none w-[calc(100%-2rem)] md:w-auto items-end';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    const isSuccess = type === 'success';
    const icon = isSuccess ? 'check_circle' : 'info';
    
    // Using clinical palette for success
    const bgClass = isSuccess ? 'bg-gradient-to-r from-[#7d125e] to-[#9b2f77]' : 'bg-surface-container-high';
    const textClass = isSuccess ? 'text-white' : 'text-on-surface';
    const borderClass = isSuccess ? 'border border-[#7d125e]/20' : 'border border-outline-variant/30';

    toast.className = `transform translate-y-12 opacity-0 transition-all duration-500 ease-out flex items-center gap-4 px-5 py-4 rounded-2xl shadow-[0_20px_40px_rgba(125,18,94,0.15)] ${bgClass} ${textClass} ${borderClass} w-full md:max-w-md pointer-events-auto`;
    toast.innerHTML = `
        <span class="material-symbols-outlined text-2xl drop-shadow-md" style="font-variation-settings: 'FILL' 1;">${icon}</span>
        <div class="flex-1">
            <h4 class="font-bold text-sm tracking-tight mb-0.5">${isSuccess ? 'Action Successful' : 'Information'}</h4>
            <p class="text-xs font-medium opacity-90 leading-relaxed">${message}</p>
        </div>
        <button class="ml-2 opacity-50 hover:opacity-100 hover:rotate-90 transition-all duration-300 grid place-items-center" onclick="this.parentElement.style.opacity='0'; setTimeout(() => this.parentElement.remove(), 500);">
            <span class="material-symbols-outlined text-sm">close</span>
        </button>
    `;

    container.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            toast.classList.remove('translate-y-12', 'opacity-0');
        });
    });

    // Auto remove
    setTimeout(() => {
        toast.classList.add('translate-y-12', 'opacity-0');
        setTimeout(() => {
            if (toast.parentElement) toast.remove();
        }, 500);
    }, 5000);
};


document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            const submitBtn = form.querySelector('button[type="submit"]');
            if (!submitBtn) return;

            const originalContent = submitBtn.innerHTML;
            const originalWidth = submitBtn.offsetWidth;
            
            // Set loading state
            submitBtn.style.width = originalWidth + 'px'; // prevent shrinking
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="material-symbols-outlined animate-spin inline-block align-middle mr-2">sync</span> Processing...';
            submitBtn.style.opacity = '0.9';
            submitBtn.style.cursor = 'wait';

            setTimeout(() => {
                submitBtn.innerHTML = '<span class="material-symbols-outlined inline-block align-middle mr-2">check_circle</span> Verified';
                
                submitBtn.style.background = '#059669'; 
                submitBtn.style.color = '#ffffff';
                submitBtn.style.opacity = '1';
                submitBtn.style.cursor = 'default';

                // Spawn Toast
                window.showToast('Your request has been securely processed. Our atelier team will follow up shortly.', 'success');

                // Optional: clear form
                form.reset();

                // Revert button after 3 seconds
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalContent;
                    submitBtn.style = ''; // clear inline styles
                }, 3000);
                
            }, 1200);
        });
    });
});
