// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links li');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    // Animate Links
    links.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
});

// Close mobile menu when clicking on a link
links.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        links.forEach(link => {
            link.style.animation = '';
        });
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Sticky header on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
});

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const subject = contactForm.querySelector('input[type="text"]:nth-of-type(2)').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Here you would typically send the form data to a server
        console.log({ name, email, subject, message });
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.skill-card, .project-card');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial state for animation
window.addEventListener('load', () => {
    const elements = document.querySelectorAll('.skill-card, .project-card');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    animateOnScroll();
});

window.addEventListener('scroll', animateOnScroll);

window.addEventListener('scroll', animateOnScroll);

// Magic Cursor
const cursor = document.getElementById('magic-cursor');
const ball = document.getElementById('ball');

if (cursor && ball) {
    let mouseX = -100;
    let mouseY = -100;
    let ballX = -100;
    let ballY = -100;
    let speed = 0.2;
    
    // Update cursor position
    function updateCursorPosition(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }
    
    // Animate cursor
    function updateCursor() {
        // Ease out animation
        const dx = mouseX - ballX;
        const dy = mouseY - ballY;
        ballX = ballX + dx * speed;
        ballY = ballY + dy * speed;
        
        // Apply position
        ball.style.transform = `translate(calc(${ballX}px - 50%), calc(${ballY}px - 50%)`;
        
        requestAnimationFrame(updateCursor);
    }
    
    // Initialize
    window.addEventListener('mousemove', updateCursorPosition);
    updateCursor();
    
    // Cursor effects for interactive elements
    const hoverElements = document.querySelectorAll('a, button, .btn, [data-cursor-hover]');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                ball.style.width = '10px';
                ball.style.height = '20px';
                ball.style.borderRadius = '10px';
            } else {
                ball.style.width = '50px';
                ball.style.height = '50px';
                ball.style.backgroundColor = 'var(--primary-color)';
            }
        });
        
        el.addEventListener('mouseleave', () => {
            ball.style.width = '30px';
            ball.style.height = '30px';
            ball.style.borderRadius = '50%';
            ball.style.backgroundColor = 'var(--light-color)';
        });
    });
}