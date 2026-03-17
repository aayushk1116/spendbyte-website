// SpendByte Landing Page Interaction Scripts

document.addEventListener('DOMContentLoaded', () => {

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
