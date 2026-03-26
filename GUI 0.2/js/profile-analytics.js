// js/profile-analytics.js
document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('uptimeChart');
    if (!ctx) return;

    if (typeof Chart === 'undefined') return;

    // Apply global defaults for a clean, modern aesthetic
    Chart.defaults.font.family = "'Plus Jakarta Sans', sans-serif";
    Chart.defaults.color = '#64748b'; // slate-500
    Chart.defaults.scale.grid.color = 'rgba(100, 116, 139, 0.1)';

    const isDarkMode = document.documentElement.classList.contains('dark');
    const primaryColor = '#9b2f77';
    
    // Gradient definitions handled during render frame
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
                {
                    label: 'Fleet Uptime (%)',
                    data: [96.5, 97.2, 98.1, 97.8, 98.4, 99.1],
                    borderColor: primaryColor,
                    backgroundColor: (context) => {
                        const chart = context.chart;
                        const {ctx, chartArea} = chart;
                        if (!chartArea) return null;
                        const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                        // Make gradient subtle
                        gradient.addColorStop(0, 'rgba(155, 47, 119, 0)');
                        gradient.addColorStop(1, 'rgba(155, 47, 119, 0.4)');
                        return gradient;
                    },
                    borderWidth: 4,
                    pointBackgroundColor: '#ffffff',
                    pointBorderColor: primaryColor,
                    pointBorderWidth: 2,
                    pointRadius: 5,
                    pointHoverRadius: 8,
                    fill: true,
                    tension: 0.4 // smooth modern wave curve
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false // We use our own UI for legends if needed
                },
                tooltip: {
                    backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                    titleColor: isDarkMode ? '#f8fafc' : '#0f172a',
                    bodyColor: isDarkMode ? '#cbd5e1' : '#475569',
                    borderColor: 'rgba(155, 47, 119, 0.2)',
                    borderWidth: 1,
                    padding: 12,
                    boxPadding: 6,
                    usePointStyle: true,
                    titleFont: { size: 13, weight: 'bold' }
                }
            },
            scales: {
                y: {
                    min: 94,
                    max: 100,
                    ticks: {
                        callback: function(value) { return value + '%' }
                    },
                    border: { display: false }
                },
                x: {
                    border: { display: false },
                    grid: { display: false }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index',
            },
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            }
        }
    });
});
