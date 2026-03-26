document.addEventListener('DOMContentLoaded', () => {
    const inventoryData = [
        { id: 1, name: "Candela GentleLase Flash Lamp", category: "laser", brand: "Candela", condition: "New", price: "EGP 12,500", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB21T8N1hK_w06aG8p_eA-q5rJThew3Wz85H73I7M-0xZ4x5XpXq18Yf2bA8Vq72Oa4mB77m_fS8L3vj1s32mR8Rj3TjPzX6s5H5M0U8I0fD_A98A8u-2mB" },
        { id: 2, name: "Cynosure Elite+ Optical Fiber", category: "laser", brand: "Cynosure", condition: "New", price: "EGP 15,000", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQqA8QkMIF1y-S3D7Q23B1g3_N8tO2_6uN78i08nZ0X9_J9rV1mC4eI3Z7I8nJ_vP_M5n_2w0n1J6E9uO79I8R9W4U6tF3uK90vQ9w4bN_D5J2g2tN" },
        { id: 3, name: "GE Logiq e Ultrasound Probe", category: "sonar", brand: "GE Healthcare", condition: "Refurbished", price: "EGP 45,000", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD0_b8T3xS8C9JqW0T3c8E8Q7P90W9P9_pD8uX8a9R0P8P0H8kC9U3A6A8Q3T3W8R0J7W3c_P8nI9N8M8O2U9X3aT9N8fW8cW8J7yX8H8xQ7uE9V0c_q" },
        { id: 4, name: "Zimmer Cryo 6 Cooling Fluid", category: "consumables", brand: "Zimmer", condition: "New", price: "EGP 3,800", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8_P0E9M3bT6iG9H8_aW0Q2jD9tY3nN8T7oN7-zM2M4C5cW6rP1Y9yB2E6N7J2uW0R5J9xX9H2C6_M5n9N1P9tO9I2xO2Q9M8bU9tY2tN6M8T0_A8q" },
        { id: 5, name: "Philips Affiniti 70 Transducer", category: "sonar", brand: "Philips", condition: "New", price: "EGP 89,000", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1_O6D5A8nR1M8W9P_eW2N7pT6gE2tO4_tW5hT1dZ3D9U8K9J6G8V4R2J1Q2Y8H1U5N9qH0C7P2R9O6wS8oJ7R9fL3aC4Q8D9cI2X5R8yD4J8A0_X8" },
        { id: 6, name: "Alma Soprano ICE Refurbished", category: "refurbished", brand: "Alma Lasers", condition: "Refurbished", price: "Contact for Quote", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0Q6aQ2yX9rN9_7K4tO3_tE8G0pG9H8dE6jX9eC2eM8rC0X8W7O4dG8xT4E8Y7O9N3U7L7eD0P4C3E4C9I1tQ9xS5J2wM3N3N0I9uW5kE9Z2rX3qS_c" }
    ];

    const grid = document.getElementById('inventory-grid');
    const emptyState = document.getElementById('empty-state');
    const searchInput = document.getElementById('search-input');
    const filterBtns = document.querySelectorAll('.filter-btn');

    let currentFilter = 'all';
    let searchQuery = '';

    function renderGrid() {
        grid.innerHTML = '';
        
        const filteredData = inventoryData.filter(item => {
            const matchesCategory = currentFilter === 'all' || item.category === currentFilter;
            const matchesSearch = item.name.toLowerCase().includes(searchQuery) || item.brand.toLowerCase().includes(searchQuery);
            return matchesCategory && matchesSearch;
        });

        if (filteredData.length === 0) {
            grid.classList.add('hidden');
            emptyState.classList.remove('hidden');
            emptyState.classList.add('flex');
            return;
        }

        grid.classList.remove('hidden');
        emptyState.classList.add('hidden');
        emptyState.classList.remove('flex');

        filteredData.forEach((item, index) => {
            const delay = Math.min((index % 3) * 100, 300);
            const card = document.createElement('div');
            card.className = "bg-surface-container-lowest rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-outline-variant/15 hover:shadow-[0_10px_30px_rgba(125,18,94,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col group cursor-pointer";
            
            // Add AOS data attributes manually since innerHTML replacement ruins initial AOS bindings sometimes.
            // Better to trigger a quick animation class instead manually.
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms, box-shadow 0.3s ease, margin 0.3s ease`;
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50);

            card.innerHTML = `
                <div class="h-48 overflow-hidden relative">
                    <div class="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors z-10"></div>
                    <img src="${item.img}" alt="${item.name}" class="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500">
                    <span class="absolute top-4 right-4 z-20 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded bg-white/90 text-[#7d125e] backdrop-blur-sm shadow-sm">${item.condition}</span>
                </div>
                <div class="p-6 flex-1 flex flex-col">
                    <span class="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">${item.brand}</span>
                    <h3 class="font-bold text-lg mb-4 text-on-surface leading-tight">${item.name}</h3>
                    <div class="mt-auto flex items-end justify-between">
                        <div>
                            <p class="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider mb-0.5">Price / Est.</p>
                            <p class="font-black text-primary">${item.price}</p>
                        </div>
                        <button class="w-10 h-10 rounded-full bg-surface-container hover:bg-[#7d125e] text-on-surface-variant hover:text-white flex items-center justify-center transition-colors shadow-sm">
                            <span class="material-symbols-outlined text-sm">arrow_forward</span>
                        </button>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    // Event Listeners
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Update active styling
            filterBtns.forEach(b => {
                b.classList.remove('bg-[#7d125e]', 'text-white', 'shadow-md');
                b.classList.add('bg-surface-container-highest', 'text-on-surface');
            });
            const clicked = e.target;
            clicked.classList.remove('bg-surface-container-highest', 'text-on-surface');
            clicked.classList.add('bg-[#7d125e]', 'text-white', 'shadow-md');

            currentFilter = clicked.getAttribute('data-filter');
            renderGrid();
        });
    });

    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        renderGrid();
    });

    // Init
    // Fallback images (generic abstract geometric blocks) since real URLs might be broken in sandboxed iframes over time
    inventoryData.forEach(i => {
       i.img = 'https://picsum.photos/seed/' + i.id * 105 + '/400/300?grayscale'; 
    });

    renderGrid();
});
