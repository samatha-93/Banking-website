// Modal functionality
function showLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
}

function showRegisterModal() {
    document.getElementById('registerModal').style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}

// Form submission handling
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });

        // Here you would typically send the data to a server
        console.log('Login form submitted:', formObject);
        
        // Show success message
        alert('Login successful!');
        closeModal('loginModal');
        this.reset();
    });
}

const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });

        // Here you would typically send the data to a server
        console.log('Registration form submitted:', formObject);
        
        // Show success message
        alert('Registration successful! Please check your email for verification.');
        closeModal('registerModal');
        this.reset();
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });

        // Here you would typically send the data to a server
        console.log('Contact form submitted:', formObject);
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

// Add animation to service cards when they come into view
const serviceCards = document.querySelectorAll('.service-card');
const accountCards = document.querySelectorAll('.account-card');

const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Add initial styles for animation
serviceCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s, transform 0.5s';
    observer.observe(card);
});

accountCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s, transform 0.5s';
    observer.observe(card);
});

// Add scroll-to-top button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.className = 'scroll-to-top';
document.body.appendChild(scrollToTopBtn);

// Style the scroll-to-top button
scrollToTopBtn.style.position = 'fixed';
scrollToTopBtn.style.bottom = '20px';
scrollToTopBtn.style.right = '20px';
scrollToTopBtn.style.width = '50px';
scrollToTopBtn.style.height = '50px';
scrollToTopBtn.style.borderRadius = '50%';
scrollToTopBtn.style.backgroundColor = 'var(--secondary-color)';
scrollToTopBtn.style.color = 'white';
scrollToTopBtn.style.border = 'none';
scrollToTopBtn.style.cursor = 'pointer';
scrollToTopBtn.style.display = 'none';
scrollToTopBtn.style.fontSize = '24px';
scrollToTopBtn.style.transition = 'opacity 0.3s';

// Show/hide scroll-to-top button based on scroll position
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = 'block';
        scrollToTopBtn.style.opacity = '1';
    } else {
        scrollToTopBtn.style.opacity = '0';
        setTimeout(() => {
            if (window.pageYOffset <= 300) {
                scrollToTopBtn.style.display = 'none';
            }
        }, 300);
    }
});

// Scroll to top functionality
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Learn More button functionality
document.querySelectorAll('.learn-more-btn').forEach(button => {
    button.addEventListener('click', function() {
        const card = this.closest('.service-card');
        const serviceName = card.querySelector('h3').textContent;
        
        // Create a modal for service details
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.id = 'serviceModal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close" onclick="closeModal('serviceModal')">&times;</span>
                <h2>${serviceName} Details</h2>
                <div class="service-details">
                    <p>Here are the detailed features of our ${serviceName.toLowerCase()}:</p>
                    <ul>
                        <li>Competitive interest rates</li>
                        <li>24/7 online access</li>
                        <li>Dedicated customer support</li>
                        <li>Secure transactions</li>
                    </ul>
                    <button class="apply-btn" onclick="showRegisterModal()">Apply Now</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        modal.style.display = 'block';
    });
});

// Apply Now button functionality
document.querySelectorAll('.apply-btn').forEach(button => {
    button.addEventListener('click', function() {
        const card = this.closest('.account-card, .service-card');
        const accountType = card.querySelector('h3').textContent;
        
        // Show registration modal with pre-filled account type
        showRegisterModal();
        
        // You can add logic here to pre-fill the account type in the registration form
        console.log('Applying for:', accountType);
    });
});

// Quick Login Popup functionality
let quickLoginTimeout;

function showQuickLogin() {
    clearTimeout(quickLoginTimeout);
    const popup = document.getElementById('quickLoginPopup');
    popup.style.display = 'block';
}

function hideQuickLogin() {
    quickLoginTimeout = setTimeout(() => {
        const popup = document.getElementById('quickLoginPopup');
        popup.style.display = 'none';
    }, 300); // Small delay to allow moving to the popup
}

// Keep popup open when hovering over it
document.getElementById('quickLoginPopup').addEventListener('mouseover', () => {
    clearTimeout(quickLoginTimeout);
});

document.getElementById('quickLoginPopup').addEventListener('mouseout', () => {
    hideQuickLogin();
});

// Quick login form submission
const quickLoginForm = document.getElementById('quickLoginForm');
if (quickLoginForm) {
    quickLoginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });

        // Here you would typically send the data to a server
        console.log('Quick login form submitted:', formObject);
        
        // Show success message
        alert('Login successful!');
        this.reset();
        hideQuickLogin();
    });
}

// Social login buttons in quick login
document.querySelectorAll('.quick-login-social button').forEach(button => {
    button.addEventListener('click', function() {
        const provider = this.classList.contains('google-btn') ? 'Google' : 'Facebook';
        alert(`Redirecting to ${provider} login...`);
        // Here you would typically redirect to the social login page
    });
}); 