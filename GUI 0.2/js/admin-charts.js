document.addEventListener('DOMContentLoaded', () => {
    
    let revenueChart, failurePie;

    function renderCharts() {
        const isDark = document.documentElement.classList.contains('dark');
        const textColor = isDark ? '#94a3b8' : '#64748b'; // slate-400 / slate-500
        const gridColor = isDark ? 'rgba(30, 41, 59, 1)' : 'rgba(241, 245, 249, 1)'; // slate-800 / slate-100

        // Destroy existing for re-render if theme shifts
        if(revenueChart) revenueChart.destroy();
        if(failurePie) failurePie.destroy();
        [window.spark1, window.spark2, window.spark3, window.spark4].forEach(c => c && c.destroy());

        // Sparklines Configurations
        const createSparkline = (ctxId, dataValues, colorHex) => {
            const ctxCanvas = document.getElementById(ctxId);
            if(!ctxCanvas) return null;
            const ctx = ctxCanvas.getContext('2d');
            const gradient = ctx.createLinearGradient(0, 0, 0, 80);
            gradient.addColorStop(0, colorHex + '66'); // 40% opacity
            gradient.addColorStop(1, colorHex + '00'); // 0% opacity

            return new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                    datasets: [{
                        data: dataValues,
                        borderColor: colorHex,
                        backgroundColor: gradient,
                        borderWidth: 2,
                        tension: 0.4,
                        fill: true,
                        pointRadius: 0,
                        pointHoverRadius: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false }, tooltip: { enabled: false } },
                    scales: {
                        x: { display: false },
                        y: { display: false, min: Math.min(...dataValues) * 0.9, max: Math.max(...dataValues) * 1.1 }
                    },
                    layout: { padding: 0 }
                }
            });
        };

        window.spark1 = createSparkline('sparkline1', [120, 131, 125, 138, 140, 135, 142], '#3b82f6'); // Blue for SLAs
        window.spark2 = createSparkline('sparkline2', [5, 8, 4, 10, 6, 9, 12], '#ef4444'); // Red for Alerts
        window.spark3 = createSparkline('sparkline3', [1.8, 1.9, 2.1, 2.0, 2.2, 2.3, 2.4], '#10b981'); // Green for MRR
        window.spark4 = createSparkline('sparkline4', [90, 88, 85, 82, 80, 86, 84], '#7d125e'); // Plum for Inventory

        // 1. Revenue vs Repair Volume (Combo Chart)
        const ctxRev = document.getElementById('adminRevenueChart');
        if(!ctxRev) return;
        const ctxRevenue = ctxRev.getContext('2d');
        
        const gradientRev = ctxRevenue.createLinearGradient(0, 0, 0, 300);
        gradientRev.addColorStop(0, 'rgba(125, 18, 94, 0.4)');
        gradientRev.addColorStop(1, 'rgba(125, 18, 94, 0.0)');

        revenueChart = new Chart(ctxRevenue, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [
                    {
                        label: 'Revenue (EGP)',
                        data: [180000, 210000, 195000, 240000, 280000, 310000],
                        borderColor: '#7d125e',
                        backgroundColor: gradientRev,
                        borderWidth: 3,
                        tension: 0.4,
                        fill: true,
                        yAxisID: 'y'
                    },
                    {
                        label: 'Repairs Completed',
                        data: [42, 51, 48, 60, 75, 82],
                        type: 'bar',
                        backgroundColor: isDark ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)',
                        hoverBackgroundColor: 'rgba(59, 130, 246, 0.4)',
                        borderRadius: 4,
                        yAxisID: 'y1'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: { mode: 'index', intersect: false },
                plugins: {
                    legend: { position: 'top', labels: { color: textColor, font: { family: "'Plus Jakarta Sans', sans-serif", weight: 'bold' } } },
                    tooltip: { 
                        backgroundColor: isDark ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)', 
                        titleColor: isDark ? '#fff' : '#0f172a', 
                        bodyColor: isDark ? '#cbd5e1' : '#475569',
                        borderColor: isDark ? '#334155' : '#e2e8f0',
                        borderWidth: 1,
                        padding: 12,
                        boxPadding: 4,
                        usePointStyle: true,
                    }
                },
                scales: {
                    x: { grid: { display: false }, ticks: { color: textColor, font: { family: "'Plus Jakarta Sans', sans-serif" } } },
                    y: { 
                        type: 'linear', display: true, position: 'left', 
                        title: { display: true, text: 'Revenue (EGP)', color: textColor, font: { weight: 'bold' } },
                        grid: { color: gridColor }, ticks: { color: textColor }
                    },
                    y1: { 
                        type: 'linear', display: true, position: 'right', grid: { drawOnChartArea: false },
                        title: { display: true, text: 'Repair Volume', color: textColor, font: { weight: 'bold' } },
                        ticks: { color: textColor }
                    }
                }
            }
        });

        // 2. Failure Rate Pie Chart
        const ctxP = document.getElementById('adminFailurePie');
        if(!ctxP) return;
        const ctxPie = ctxP.getContext('2d');
        
        failurePie = new Chart(ctxPie, {
            type: 'doughnut',
            data: {
                labels: ['Laser Systems', 'Sonar Probes', 'Cooling Systems', 'Power Supply'],
                datasets: [{
                    data: [45, 25, 20, 10],
                    backgroundColor: [
                        '#7d125e', // Primary plum
                        '#3b82f6', // Blue
                        '#10b981', // Emerald
                        '#f59e0b'  // Amber
                    ],
                    borderWidth: isDark ? 2 : 0,
                    borderColor: isDark ? '#0f172a' : '#ffffff',
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: { position: 'bottom', labels: { padding: 20, color: textColor, font: { family: "'Plus Jakarta Sans', sans-serif", size: 11 } } }
                }
            }
        });
    }

    renderCharts();

    // Re-render on theme toggle
    window.addEventListener('themeChanged', () => {
        renderCharts();
    });
});
