// Video data
const videos = [
    {
        id: 1,
        title: "Morning Routine That Changed My Life",
        description: "A day in the life showcasing my productive morning routine that helped me gain 100K followers",
        thumbnail: "https://images.pexels.com/photos/3768911/pexels-photo-3768911.jpeg?auto=compress&cs=tinysrgb&w=400&h=711",
        category: "tiktok",
        views: "2.3M",
        likes: "156K",
        date: "2024-01-15",
        duration: "0:30",
        tags: ["morning", "routine", "productivity", "lifestyle"]
    },
    {
        id: 2,
        title: "5-Minute Makeup Transformation",
        description: "Quick and easy makeup tutorial that went viral on Instagram reels",
        thumbnail: "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=400&h=711",
        category: "instagram",
        views: "1.8M",
        likes: "89K",
        date: "2024-01-12",
        duration: "0:45",
        tags: ["makeup", "tutorial", "beauty", "transformation"]
    },
    {
        id: 3,
        title: "Cooking Hacks That Actually Work",
        description: "Mind-blowing kitchen hacks that will change how you cook forever",
        thumbnail: "https://images.pexels.com/photos/4252131/pexels-photo-4252131.jpeg?auto=compress&cs=tinysrgb&w=400&h=711",
        category: "youtube",
        views: "3.1M",
        likes: "234K",
        date: "2024-01-10",
        duration: "2:15",
        tags: ["cooking", "hacks", "food", "kitchen"]
    },
    {
        id: 4,
        title: "Dance Challenge - Trending Now",
        description: "The latest dance trend that everyone's talking about on TikTok",
        thumbnail: "https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=400&h=711",
        category: "tiktok",
        views: "4.2M",
        likes: "567K",
        date: "2024-01-08",
        duration: "0:15",
        tags: ["dance", "challenge", "trending", "fun"]
    },
    {
        id: 5,
        title: "Room Makeover on a Budget",
        description: "Transforming my room with DIY decor ideas under $50",
        thumbnail: "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=400&h=711",
        category: "reels",
        views: "1.5M",
        likes: "78K",
        date: "2024-01-05",
        duration: "1:00",
        tags: ["diy", "decor", "budget", "room"]
    },
    {
        id: 6,
        title: "Workout Routine for Beginners",
        description: "Easy 10-minute workout that anyone can do at home",
        thumbnail: "https://images.pexels.com/photos/3768593/pexels-photo-3768593.jpeg?auto=compress&cs=tinysrgb&w=400&h=711",
        category: "instagram",
        views: "2.7M",
        likes: "123K",
        date: "2024-01-03",
        duration: "1:30",
        tags: ["fitness", "workout", "health", "beginner"]
    },
    {
        id: 7,
        title: "Street Food Adventure",
        description: "Trying the craziest street food combinations in the city",
        thumbnail: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400&h=711",
        category: "youtube",
        views: "1.9M",
        likes: "95K",
        date: "2024-01-01",
        duration: "3:20",
        tags: ["food", "street", "adventure", "travel"]
    },
    {
        id: 8,
        title: "Pet Training Tips That Work",
        description: "Simple tricks to train your pet in just 5 minutes a day",
        thumbnail: "https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=400&h=711",
        category: "tiktok",
        views: "876K",
        likes: "45K",
        date: "2023-12-28",
        duration: "0:25",
        tags: ["pets", "training", "tips", "animals"]
    }
];

// Global variables
let currentFilter = 'all';
let filteredVideos = videos;

// DOM elements
const header = document.getElementById('header');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileNav = document.getElementById('mobile-nav');
const videoGrid = document.getElementById('video-grid');
const videoModal = document.getElementById('video-modal');
const closeModalBtn = document.getElementById('close-modal');
const contactForm = document.getElementById('contact-form');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeLucideIcons();
    setupEventListeners();
    renderVideos();
    setupScrollEffects();
});

// Initialize Lucide icons
function initializeLucideIcons() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Setup event listeners
function setupEventListeners() {
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    
    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const category = e.target.dataset.category;
            setActiveFilter(category);
            filterVideos(category);
        });
    });
    
    // Modal close
    closeModalBtn.addEventListener('click', closeModal);
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            closeModal();
        }
    });
    
    // Contact form
    contactForm.addEventListener('submit', handleContactForm);
    
    // Escape key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            closeModal();
        }
    });
}

// Setup scroll effects
function setupScrollEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY > 50;
        header.classList.toggle('scrolled', scrolled);
    });
}

// Mobile menu functions
function toggleMobileMenu() {
    mobileNav.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    if (mobileNav.classList.contains('active')) {
        icon.setAttribute('data-lucide', 'x');
    } else {
        icon.setAttribute('data-lucide', 'menu');
    }
    initializeLucideIcons();
}

// Scroll functions
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
    // Close mobile menu if open
    mobileNav.classList.remove('active');
    const icon = mobileMenuBtn.querySelector('i');
    icon.setAttribute('data-lucide', 'menu');
    initializeLucideIcons();
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Video filtering functions
function setActiveFilter(category) {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        }
    });
    currentFilter = category;
}

function filterVideos(category) {
    if (category === 'all') {
        filteredVideos = videos;
    } else {
        filteredVideos = videos.filter(video => video.category === category);
    }
    renderVideos();
}

// Video rendering functions
function renderVideos() {
    videoGrid.innerHTML = '';
    
    if (filteredVideos.length === 0) {
        videoGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: rgba(255, 255, 255, 0.6);">
                <p style="font-size: 1.125rem;">No videos found for this category.</p>
            </div>
        `;
        return;
    }
    
    filteredVideos.forEach(video => {
        const videoCard = createVideoCard(video);
        videoGrid.appendChild(videoCard);
    });
}

function createVideoCard(video) {
    const card = document.createElement('div');
    card.className = 'video-card';
    card.onclick = () => openModal(video);
    
    const categoryClass = category-${video.category};
    
    card.innerHTML = `
        <div class="video-thumbnail">
            <img src="${video.thumbnail}" alt="${video.title}">
            <div class="video-overlay"></div>
            <div class="play-overlay">
                <div class="play-button">
                    <div class="play-triangle"></div>
                </div>
            </div>
            <div class="category-badge ${categoryClass}">
                ${video.category.toUpperCase()}
            </div>
        </div>
        <div class="video-info">
            <h3 class="video-title">${video.title}</h3>
            <p class="video-description">${video.description}</p>
            <div class="video-stats">
                <div class="video-metrics">
                    <div class="metric">
                        <i data-lucide="eye"></i>
                        <span>${video.views}</span>
                    </div>
                    <div class="metric">
                        <i data-lucide="heart"></i>
                        <span>${video.likes}</span>
                    </div>
                </div>
                <button class="share-btn">
                    <i data-lucide="share-2"></i>
                </button>
            </div>
        </div>
    `;
    
    // Initialize icons for this card
    setTimeout(() => {
        initializeLucideIcons();
    }, 0);
    
    return card;
}

// Modal functions
function openModal(video) {
    const modal = document.getElementById('video-modal');
    const categoryClass = category-${video.category};
    
    // Update modal content
    document.getElementById('modal-category').textContent = video.category.toUpperCase();
    document.getElementById('modal-category').className = category-badge ${categoryClass};
    document.getElementById('modal-title').textContent = video.title;
    document.getElementById('modal-thumbnail').src = video.thumbnail;
    document.getElementById('modal-video-title').textContent = video.title;
    document.getElementById('modal-video-description').textContent = video.description;
    document.getElementById('modal-views').textContent = video.views;
    document.getElementById('modal-likes').textContent = video.likes;
    document.getElementById('modal-date').textContent = video.date;
    document.getElementById('modal-duration').textContent = video.duration;
    
    // Update tags
    const tagsContainer = document.getElementById('modal-tags');
    tagsContainer.innerHTML = '';
    video.tags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = 'tag';
        tagElement.textContent = #${tag};
        tagsContainer.appendChild(tagElement);
    });
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Initialize icons
    initializeLucideIcons();
}

function closeModal() {
    const modal = document.getElementById('video-modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'unset';
}

// Contact form handler
function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    
    // Here you would typically send the data to a server
    console.log('Form submitted:', data);
    
    // Show success message (you can customize this)
    alert('Thank you for your message! I\'ll get back to you soon.');
    
    // Reset form
    e.target.reset();
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Make functions globally available
window.scrollToSection = scrollToSection;
window.scrollToTop = scrollToTop;
