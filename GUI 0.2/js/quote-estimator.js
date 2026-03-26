// js/quote-estimator.js
document.addEventListener('DOMContentLoaded', () => {
    const eqSelect = document.getElementById('calc-equipment');
    const qtyInput = document.getElementById('calc-quantity');
    const urgSelect = document.getElementById('calc-urgency');
    const odometer = document.getElementById('price-odometer');

    if (!eqSelect || !qtyInput || !urgSelect || !odometer) return;

    function calculateEstimate() {
        const basePrice = parseInt(eqSelect.value) || 0;
        let qty = parseInt(qtyInput.value) || 1;
        if (qty < 1) { qty = 1; qtyInput.value = 1; }
        
        const urgencyMultiplier = parseFloat(urgSelect.value) || 1;

        const total = basePrice * qty * urgencyMultiplier;
        
        const startVal = parseInt(odometer.getAttribute('data-val')) || basePrice;
        if (startVal !== total) {
            animateValue(odometer, startVal, total, 800);
            odometer.setAttribute('data-val', total);
        }
    }

    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            
            // Easing out function for smooth deceleration
            const easeOutQuint = 1 - Math.pow(1 - progress, 5);
            const current = Math.floor(start + (end - start) * easeOutQuint);
            
            obj.innerHTML = '$' + current.toLocaleString('en-US');
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                obj.innerHTML = '$' + end.toLocaleString('en-US'); // Ensure exact final value
            }
        };
        window.requestAnimationFrame(step);
    }

    eqSelect.addEventListener('change', calculateEstimate);
    qtyInput.addEventListener('input', calculateEstimate);
    urgSelect.addEventListener('change', calculateEstimate);

    // Initial calculation setup
    odometer.setAttribute('data-val', parseInt(eqSelect.value));
});
