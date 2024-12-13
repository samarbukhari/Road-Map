// Intersection Observer for fade-in animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '50px'
});

// Observe all phase elements
document.querySelectorAll('.phase').forEach(phase => {
    observer.observe(phase);
});

// Initialize floating blossoms
const floatingBlossoms = document.querySelectorAll('.floating-blossoms .blossom');
floatingBlossoms.forEach((blossom, index) => {
    // Random initial position
    blossom.style.left = `${Math.random() * 100}vw`;
    blossom.style.top = `${Math.random() * 100}vh`;
    
    // Random animation
    blossom.style.animation = `
        float-up ${5 + Math.random() * 5}s ease-in-out infinite ${index * 0.5}s,
        sparkle ${3 + Math.random() * 2}s ease-in-out infinite
    `;
});

// Add hover effect to phases
document.querySelectorAll('.phase-content').forEach(phase => {
    phase.addEventListener('mouseenter', () => {
        phase.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    phase.addEventListener('mouseleave', () => {
        phase.style.transform = 'translateY(0) scale(1)';
    });
});

// Footer blossom animations
document.querySelectorAll('.footer-blossom').forEach((blossom, index) => {
    blossom.style.animation = `float-up ${2 + index}s ease-in-out infinite ${index * 0.3}s`;
});

// Add parallax effect to blossoms on mouse move
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    floatingBlossoms.forEach(blossom => {
        const offsetX = (mouseX - 0.5) * 20;
        const offsetY = (mouseY - 0.5) * 20;
        blossom.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    });
});
