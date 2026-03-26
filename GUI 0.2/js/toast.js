// ═══════════════════════════════════════════════════
// Zahra Medical — Toast Notification System
// ═══════════════════════════════════════════════════

window.ZahraToast = (function () {
    'use strict';

    let container = null;

    function ensureContainer() {
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            container.id = 'zm-toast-container';
            document.body.appendChild(container);
        }
        return container;
    }

    /**
     * Show a toast notification
     * @param {'success'|'error'|'info'} type
     * @param {string} message
     * @param {number} [duration=4000] ms
     */
    function show(type, message, duration) {
        duration = duration || 4000;
        const c = ensureContainer();

        const icons = {
            success: 'check_circle',
            error: 'error',
            info: 'info'
        };

        const toast = document.createElement('div');
        toast.className = 'toast toast-' + type;
        toast.innerHTML = '<span class="material-symbols-outlined" style="font-size:20px">' + (icons[type] || 'info') + '</span>' +
            '<span>' + message + '</span>';

        c.appendChild(toast);

        // Auto-dismiss
        setTimeout(function () {
            toast.classList.add('removing');
            setTimeout(function () { toast.remove(); }, 350);
        }, duration);

        return toast;
    }

    return {
        success: function (msg, dur) { return show('success', msg, dur); },
        error: function (msg, dur) { return show('error', msg, dur); },
        info: function (msg, dur) { return show('info', msg, dur); }
    };
})();
