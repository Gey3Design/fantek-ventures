// Fan-Tek Ventures Limited - JavaScript
// All functionality for the website

'use strict';

// DOM Elements
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');
const header = document.getElementById('header');
const backToTop = document.getElementById('backToTop');
const currentYearSpan = document.getElementById('currentYear');
const quoteForm = document.getElementById('quoteForm');

// Mobile Menu Toggle
mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Back to top button visibility
    if (window.scrollY > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

// Back to top button click
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            const headerOffset = 90;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add entrance animations with Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and animated elements
const animatedElements = document.querySelectorAll(
    '.service-card, .value-card, .client-card, .vm-card, .gallery-item'
);

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Automatically update the footer year
if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
}

// Form Validation and Submission
if (quoteForm) {
    quoteForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = {
            fullname: document.getElementById('fullname').value.trim(),
            email: document.getElementById('email').value.trim(),
            company: document.getElementById('company').value.trim(),
            service: document.getElementById('service').value,
            message: document.getElementById('message').value.trim()
        };

        // Basic validation
        if (!formData.fullname || !formData.email) {
            alert('Please fill in all required fields (Name and Email)');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Please enter a valid email address');
            return;
        }

        // If you have a backend endpoint, submit the form
        // For now, we'll show a success message
        console.log('Form submitted:', formData);
        
        // Show success message
        alert('Thank you for your inquiry! We will get back to you shortly.');
        
        // Reset form
        quoteForm.reset();

        // If you want to actually submit to a PHP file, uncomment this:
        // this.submit();
    });
}

// Add loading state to form button
const submitBtn = document.querySelector('.submit-btn');
if (submitBtn && quoteForm) {
    quoteForm.addEventListener('submit', function() {
        submitBtn.disabled = true;
        submitBtn.textContent = 'SUBMITTING...';
        
        // Reset after 2 seconds (adjust based on your actual submission time)
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = 'SUBMIT ENQUIRY';
        }, 2000);
    });
}

// Gallery lightbox effect (optional enhancement)
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('click', function() {
        const img = this.querySelector('img');
        if (img) {
            // You can implement a lightbox here
            // For now, we'll just log the image src
            console.log('Gallery item clicked:', img.src);
            // You could open the image in a modal or lightbox
        }
    });
});

// Prevent default form submission if no action is set
document.querySelectorAll('form').forEach(form => {
    if (!form.hasAttribute('action') || form.getAttribute('action') === '') {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Form submission prevented - no action URL set');
        });
    }
});

// Add active state to navigation based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 150;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Remove active class from all links
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.style.color = '';
            });
            // Add active state to current link
            if (navLink) {
                navLink.style.color = 'var(--primary-color)';
            }
        }
    });
});

// Performance optimization: Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    // If you want to use lazy loading, add data-src to your images
    // and uncomment this:
    // document.querySelectorAll('img[data-src]').forEach(img => {
    //     imageObserver.observe(img);
    // });
}

// Console message
console.log('%cFan-Tek Ventures Limited', 'color: #E8431C; font-size: 24px; font-weight: bold;');
console.log('%cMarine & Oil Field Solutions', 'color: #666; font-size: 14px;');
console.log('%cWebsite powered by modern JavaScript', 'color: #333; font-size: 12px;');

// Error handling
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});