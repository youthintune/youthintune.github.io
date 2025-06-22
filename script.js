const today = new Date().toISOString().split('T')[0];

// DOM Elements
const bookMusicianBtn = document.getElementById('bookMusicianBtn');
const footerBookBtn = document.getElementById('footerBookBtn');
const joinTeamBtn = document.getElementById('joinTeamBtn');
const footerJoinBtn = document.getElementById('footerJoinBtn');
const donateBtn = document.getElementById('donateBtn');
const footerDonateBtn = document.getElementById('footerDonateBtn');

const bookModal = document.getElementById('bookModal');
const joinModal = document.getElementById('joinModal');
const bookingForm = document.getElementById('bookingForm');

const closeModal = document.getElementById('closeModal');
const cancelModal = document.getElementById('cancelModal');
const closeJoinModal = document.getElementById('closeJoinModal');
const closeJoinBtn = document.getElementById('closeJoinBtn');

const toastContainer = document.getElementById('toastContainer');

// Set minimum date for date input
document.getElementById('eventDate').min = today;

// Toast function
function showToast(title, description) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <div class="toast-title">${title}</div>
        <div class="toast-description">${description}</div>
    `;
    
    toastContainer.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Remove toast after 4 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 4000);
}

// Modal functions
function openModal(modal) {
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    
    // Focus first input if it exists
    const firstInput = modal.querySelector('input, button');
    if (firstInput) {
        setTimeout(() => firstInput.focus(), 100);
    }
}

function closeModalFunc(modal) {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
}

// Event Listeners
bookMusicianBtn.addEventListener('click', () => openModal(bookModal));
footerBookBtn.addEventListener('click', () => openModal(bookModal));

joinTeamBtn.addEventListener('click', () => openModal(joinModal));
footerJoinBtn.addEventListener('click', () => openModal(joinModal));

closeModal.addEventListener('click', () => closeModalFunc(bookModal));
cancelModal.addEventListener('click', () => closeModalFunc(bookModal));

closeJoinModal.addEventListener('click', () => closeModalFunc(joinModal));
closeJoinBtn.addEventListener('click', () => closeModalFunc(joinModal));

// Close modals when clicking outside
bookModal.addEventListener('click', (e) => {
    if (e.target === bookModal) {
        closeModalFunc(bookModal);
    }
});

joinModal.addEventListener('click', (e) => {
    if (e.target === joinModal) {
        closeModalFunc(joinModal);
    }
});

// Close modals with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (bookModal.classList.contains('show')) {
            closeModalFunc(bookModal);
        }
        if (joinModal.classList.contains('show')) {
            closeModalFunc(joinModal);
        }
    }
});

// Form submission
bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(bookingForm);
    const data = Object.fromEntries(formData.entries());
    
    // Basic validation
    if (!bookingForm.checkValidity()) {
        bookingForm.reportValidity();
        return;
    }
    
    // Show success message
    showToast(
        'Request Submitted!',
        `Thanks, ${data.fullName}! Your request for ${data.eventDate} has been received.`
    );
    
    // Reset form and close modal
    bookingForm.reset();
    closeModalFunc(bookModal);
});

// Donate button handlers
function handleDonate() {
    showToast(
        'Thank you for your support!',
        'Redirecting to our donation platform...'
    );
}

donateBtn.addEventListener('click', handleDonate);
footerDonateBtn.addEventListener('click', handleDonate);

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Smooth scroll for any anchor links (if added later)
document.addEventListener('click', (e) => {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

console.log('Youth in Tune website loaded successfully!');