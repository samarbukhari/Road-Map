// Intersection Observer for fade-in animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Add a slight delay for each list item
            entry.target.querySelectorAll('li').forEach((item, index) => {
                item.style.animation = `fadeInUp 0.5s ease-out ${index * 0.1}s forwards`;
            });
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

// Initialize floating blossoms with improved randomization
const floatingBlossoms = document.querySelectorAll('.floating-blossoms .blossom');
floatingBlossoms.forEach((blossom, index) => {
    const size = 10 + Math.random() * 15;
    blossom.style.width = `${size}px`;
    blossom.style.height = `${size}px`;
    
    // Random initial position
    blossom.style.left = `${Math.random() * 100}vw`;
    blossom.style.top = `${Math.random() * 100}vh`;
    
    // Random animation with rotation
    blossom.style.animation = `
        float-up ${5 + Math.random() * 5}s ease-in-out infinite ${index * 0.5}s,
        sparkle ${3 + Math.random() * 2}s ease-in-out infinite,
        rotate ${10 + Math.random() * 10}s linear infinite
    `;
});

// Scroll progress indicator
const scrollProgress = document.querySelector('.scroll-progress');
window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = window.scrollY / windowHeight;
    scrollProgress.style.transform = `scaleX(${progress})`;
});

// Enhanced hover effects for phases
document.querySelectorAll('.phase-content').forEach(phase => {
    phase.addEventListener('mouseenter', () => {
        phase.style.transform = 'translateY(-8px) scale(1.02)';
        const blossom = phase.querySelector('.blossom-decoration');
        if (blossom) {
            blossom.style.transform = 'translateY(-50%) scale(1.1) rotate(45deg)';
        }
    });
    
    phase.addEventListener('mouseleave', () => {
        phase.style.transform = 'translateY(0) scale(1)';
        const blossom = phase.querySelector('.blossom-decoration');
        if (blossom) {
            blossom.style.transform = 'translateY(-50%) scale(1) rotate(0deg)';
        }
    });
});

// Footer blossom animations with random delays
document.querySelectorAll('.footer-blossom').forEach((blossom, index) => {
    blossom.style.animation = `
        float-up ${2 + index}s ease-in-out infinite ${index * 0.3}s,
        sparkle ${1.5 + Math.random()}s ease-in-out infinite ${Math.random()}s
    `;
});

// Smooth parallax effect on mouse move
let mouseX = 0, mouseY = 0;
let currentX = 0, currentY = 0;
const ease = 0.1;

document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
});

// Smooth animation loop for parallax
function animate() {
    currentX += (mouseX - currentX) * ease;
    currentY += (mouseY - currentY) * ease;
    
    floatingBlossoms.forEach(blossom => {
        blossom.style.transform = `translate(${currentX}px, ${currentY}px)`;
    });
    
    requestAnimationFrame(animate);
}

animate();

// Add touch event handling for mobile devices
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchmove', (e) => {
    if (!touchStartX || !touchStartY) return;

    const touchX = e.touches[0].clientX;
    const touchY = e.touches[0].clientY;

    mouseX = (touchX - touchStartX) / 50;
    mouseY = (touchY - touchStartY) / 50;
});
