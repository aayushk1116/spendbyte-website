// SpendByte Landing Page Interaction Scripts

// Global Versioning Configuration
const APP_VERSION = "1.2.0";

const CHANGELOG = {
    "1.2.0": [
        { icon: "ph-diamonds-four", bg: "bg-gradient-1", title: "Glass + AMOLED", desc: "Beautiful blur effects and pure black backgrounds for a high-contrast premium design." },
        { icon: "ph-navigation-arrow", bg: "bg-gradient-6", title: "Floating Nav", desc: "A new, unobtrusive bottom pill indicator for buttery smooth screen transitions." },
        { icon: "ph-lightbulb", bg: "bg-gradient-3", title: "Smart Insights", desc: "AI-driven context on your spending habits directly on your main dashboard." },
        { icon: "ph-users-three", bg: "bg-gradient-2", title: "Advanced Split", desc: "Now supports detailed groups, participants, and quick settlement workflows." },
        { icon: "ph-vibrate", bg: "bg-gradient-4", title: "Haptics & Flow", desc: "Enhanced micro-interactions with rich haptic feedback across the entire application." }
    ],
    "1.1.0": [
        { icon: "ph-users-three", bg: "bg-gradient-1", title: "New Split Expense", desc: "Easily split bills with friends and automatically track who owes you and who you owe." },
        { icon: "ph-currency-inr", bg: "bg-gradient-6", title: "Default Currency", desc: "Set your default currency to ₹ INR for a seamless local experience." }
    ]
};

document.addEventListener('DOMContentLoaded', () => {

    // 0. Update dynamic versions & changelog
    document.querySelectorAll('.app-version').forEach(el => {
        el.textContent = APP_VERSION;
    });

    const metaDesc = document.getElementById('meta-desc');
    if (metaDesc) {
        metaDesc.content = `SpendByte v${APP_VERSION} - Track every rupee. Control every byte. Premium personal finance tracker for Android.`;
    }

    const changelogGrid = document.getElementById('changelog-grid');
    if (changelogGrid && CHANGELOG[APP_VERSION]) {
        changelogGrid.innerHTML = '';
        CHANGELOG[APP_VERSION].forEach((feat, i) => {
            const delay = (i % 3) + 1; // 1, 2, 3 delay classes
            changelogGrid.innerHTML += `
                <div class="feature-card reveal delay-${delay}">
                    <div class="feature-icon ${feat.bg}"><i class="ph ${feat.icon}"></i></div>
                    <h3>${feat.title}</h3>
                    <p>${feat.desc}</p>
                </div>
            `;
        });
    }

    // 1. Scroll Reveal Animation for elements fading in as they become visible
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, revealOptions);
    
    revealElements.forEach(el => revealObserver.observe(el));

    // 2. Navbar Background Blur and Shadow on Scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 12, 16, 0.9)';
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.5)';
        } else {
            navbar.style.background = 'rgba(10, 12, 16, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });

    // 3. Simple Carousel Implementation for Screenshots
    const items = document.querySelectorAll('.carousel-item');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentIndex = 2; // Default to 'Add Tx' mock which is index 2

    function updateCarousel() {
        items.forEach((item, index) => {
            item.classList.remove('active');
            
            // Core visibility logic
            if (index === currentIndex) {
                item.classList.add('active');
                item.style.display = 'flex';
            } else {
                // Show 1 adjacent item on each side for wider screens
                if (Math.abs(index - currentIndex) === 1 && window.innerWidth > 768) {
                    item.style.display = 'flex';
                } else if (window.innerWidth <= 768 && index !== currentIndex) {
                    item.style.display = 'none';
                } else {
                    item.style.display = 'none';
                }
            }
        });
        
        // Update nav button states
        if(prevBtn) {
            prevBtn.style.opacity = currentIndex === 0 ? '0.3' : '1';
            prevBtn.style.cursor = currentIndex === 0 ? 'not-allowed' : 'pointer';
        }
        
        if(nextBtn) {
            nextBtn.style.opacity = currentIndex === items.length - 1 ? '0.3' : '1';
            nextBtn.style.cursor = currentIndex === items.length - 1 ? 'not-allowed' : 'pointer';
        }
    }

    // Previous Button click
    if(prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });
    }

    // Next Button click
    if(nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentIndex < items.length - 1) {
                currentIndex++;
                updateCarousel();
            }
        });
    }

    // Handle clicks directly on carousel items (useful for adjacent items)
    items.forEach((item, index) => {
        item.addEventListener('click', () => {
            if (index !== currentIndex) {
                currentIndex = index;
                updateCarousel();
            }
        });
    });

    // Initial positioning
    updateCarousel();

    // Re-evaluate visibility logic if window resizes
    window.addEventListener('resize', updateCarousel);
});
