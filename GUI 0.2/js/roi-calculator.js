// js/roi-calculator.js
document.addEventListener('DOMContentLoaded', () => {
    const sliderRevenue = document.getElementById('sliderRevenue');
    const sliderDays = document.getElementById('sliderDays');
    const valRevenue = document.getElementById('valRevenue');
    const valDays = document.getElementById('valDays');
    const valTotalLoss = document.getElementById('valTotalLoss');

    if (!sliderRevenue || !sliderDays || !valRevenue || !valDays || !valTotalLoss) return;

    function formatCurrency(num) {
        return num.toLocaleString('en-US');
    }

    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            // easeOutQuart 
            let progress = Math.min((timestamp - startTimestamp) / duration, 1);
            progress = 1 - Math.pow(1 - progress, 4);
            
            obj.innerHTML = formatCurrency(Math.floor(progress * (end - start) + start));
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    function calculate() {
        const rev = parseInt(sliderRevenue.value, 10);
        const days = parseInt(sliderDays.value, 10);

        valRevenue.innerText = `EGP ${formatCurrency(rev)}`;
        valDays.innerText = `${days} Day${days > 1 ? 's' : ''}`;
        
        const total = rev * days;
        const currentDataVal = parseInt(valTotalLoss.getAttribute('data-val') || "0", 10);
        
        // Only run animation if the user is dragging, or initially
        // To be buttery smooth during rapid slider dragging, we just set the text if it's currently dragging,
        // but since we are doing 100ms it's fine.
        
        // If difference is small, snap to it, else animate. Actually, snapping is smoother for native range sliders.
        valTotalLoss.innerHTML = formatCurrency(total);
        valTotalLoss.setAttribute('data-val', total);
    }

    // Initialize
    calculate();

    sliderRevenue.addEventListener('input', calculate);
    sliderDays.addEventListener('input', calculate);
});
