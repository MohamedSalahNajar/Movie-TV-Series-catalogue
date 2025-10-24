// TMDB API Configuration
const API_KEY = '63d7f5564a0029be2192181278e04443';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const IMG_LARGE_URL = 'https://image.tmdb.org/t/p/original';

// Global variables
let currentType = 'movie';
let currentPage = 1;
let currentGenre = null;
let genres = [];

// DOM Elements
const mobileTabs = document.querySelectorAll('.mobile-tab');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.querySelector('.theme-icon');
const categoriesScroll = document.getElementById('categories-scroll');
const trendingContainer = document.getElementById('trending-container');
const popularContainer = document.getElementById('popular-container');
const topratedContainer = document.getElementById('toprated-container');
const resultsContainer = document.getElementById('results-container');
const categoryContainer = document.getElementById('category-container');
const contentSections = document.getElementById('content-sections');
const resultsSection = document.getElementById('results-section');
const categorySection = document.getElementById('category-section');
const categoryTitle = document.getElementById('category-title');
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
const closeModal = document.querySelector('.close');
const bottomNavBtns = document.querySelectorAll('.bottom-nav-btn');

// Initialize the app
function init() {
    initTheme();
    loadGenres();
    loadAllContent();
    setupEventListeners();
}

// Initialize theme from localStorage
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

// Toggle theme
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

// Update theme icon
function updateThemeIcon(theme) {
    themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
}

// Setup event listeners
function setupEventListeners() {
    // Mobile tab buttons
    mobileTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            mobileTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            currentType = this.getAttribute('data-type');
            currentPage = 1;
            currentGenre = null;
            searchInput.value = '';
            showHome();
        });
    });

    // Theme toggle button
    themeToggle.addEventListener('click', toggleTheme);

    // Search button
    searchBtn.addEventListener('click', performSearch);
    
    // Search on Enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Close modal
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking on background
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Bottom navigation
    bottomNavBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            handleBottomNav(action);
        });
    });
}

// Handle bottom navigation
function handleBottomNav(action) {
    bottomNavBtns.forEach(btn => btn.classList.remove('active'));
    
    switch(action) {
        case 'home':
            bottomNavBtns[0].classList.add('active');
            showHome();
            scrollToTop();
            break;
        case 'search':
            bottomNavBtns[1].classList.add('active');
            searchInput.focus();
            scrollToTop();
            break;
        case 'categories':
            bottomNavBtns[2].classList.add('active');
            scrollToCategories();
            break;
    }
}

// Show home view
function showHome() {
    contentSections.style.display = 'block';
    resultsSection.style.display = 'none';
    categorySection.style.display = 'none';
    loadGenres();
    loadAllContent();
}

// Scroll helpers
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToCategories() {
    const categoriesElement = document.querySelector('.mobile-categories');
    if (categoriesElement) {
        categoriesElement.scrollIntoView({ behavior: 'smooth' });
    }
}

// Load all genres/categories
async function loadGenres() {
    try {
        const url = `${BASE_URL}/genre/${currentType}/list?api_key=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        genres = data.genres || [];
        displayGenres();
    } catch (error) {
        console.error('Error loading genres:', error);
    }
}

// Display genres as chips
function displayGenres() {
    categoriesScroll.innerHTML = '';
    
    // Add "All" chip
    const allChip = document.createElement('button');
    allChip.className = 'category-chip active';
    allChip.textContent = 'All';
    allChip.addEventListener('click', () => {
        currentGenre = null;
        document.querySelectorAll('.category-chip').forEach(chip => chip.classList.remove('active'));
        allChip.classList.add('active');
        showHome();
    });
    categoriesScroll.appendChild(allChip);
    
    // Add genre chips
    genres.forEach(genre => {
        const chip = document.createElement('button');
        chip.className = 'category-chip';
        chip.textContent = genre.name;
        chip.addEventListener('click', () => {
            currentGenre = genre.id;
            document.querySelectorAll('.category-chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            loadByCategory(genre.id, genre.name);
        });
        categoriesScroll.appendChild(chip);
    });
}

// Load content by category
async function loadByCategory(genreId, genreName) {
    try {
        categoryContainer.innerHTML = '<div class="loading">Loading...</div>';
        contentSections.style.display = 'none';
        resultsSection.style.display = 'none';
        categorySection.style.display = 'block';
        categoryTitle.textContent = genreName;
        
        const url = `${BASE_URL}/discover/${currentType}?api_key=${API_KEY}&with_genres=${genreId}&sort_by=popularity.desc`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
            displayItems(data.results, categoryContainer);
        } else {
            categoryContainer.innerHTML = '<p class="loading">No items found.</p>';
        }
    } catch (error) {
        console.error('Error loading category:', error);
        categoryContainer.innerHTML = '<p class="loading">Error loading content.</p>';
    }
}

// Load all content sections
async function loadAllContent() {
    loadTrending();
    loadPopular();
    loadTopRated();
}

// Load trending content
async function loadTrending() {
    try {
        trendingContainer.innerHTML = '<div class="loading">Loading...</div>';
        const url = `${BASE_URL}/trending/${currentType}/day?api_key=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
            displayItems(data.results.slice(0, 10), trendingContainer);
        } else {
            trendingContainer.innerHTML = '<p class="loading">No items found.</p>';
        }
    } catch (error) {
        console.error('Error loading trending:', error);
        trendingContainer.innerHTML = '<p class="loading">Error loading content.</p>';
    }
}

// Load popular content
async function loadPopular() {
    try {
        popularContainer.innerHTML = '<div class="loading">Loading...</div>';
        const url = `${BASE_URL}/${currentType}/popular?api_key=${API_KEY}&page=${currentPage}`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
            displayItems(data.results.slice(0, 10), popularContainer);
        } else {
            popularContainer.innerHTML = '<p class="loading">No items found.</p>';
        }
    } catch (error) {
        console.error('Error loading popular items:', error);
        popularContainer.innerHTML = '<p class="loading">Error loading content.</p>';
    }
}

// Load top rated content
async function loadTopRated() {
    try {
        topratedContainer.innerHTML = '<div class="loading">Loading...</div>';
        const url = `${BASE_URL}/${currentType}/top_rated?api_key=${API_KEY}&page=${currentPage}`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
            displayItems(data.results.slice(0, 10), topratedContainer);
        } else {
            topratedContainer.innerHTML = '<p class="loading">No items found.</p>';
        }
    } catch (error) {
        console.error('Error loading top rated:', error);
        topratedContainer.innerHTML = '<p class="loading">Error loading content.</p>';
    }
}

// Perform search
async function performSearch() {
    const query = searchInput.value.trim();
    
    if (query === '') {
        return;
    }

    try {
        resultsContainer.innerHTML = '<div class="loading">Searching...</div>';
        contentSections.style.display = 'none';
        categorySection.style.display = 'none';
        resultsSection.style.display = 'block';
        
        bottomNavBtns.forEach(btn => btn.classList.remove('active'));
        bottomNavBtns[1].classList.add('active');

        const url = `${BASE_URL}/search/${currentType}?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
            displayItems(data.results, resultsContainer);
        } else {
            resultsContainer.innerHTML = '<p class="loading">No results found.</p>';
        }
    } catch (error) {
        console.error('Error searching:', error);
        resultsContainer.innerHTML = '<p class="loading">Error performing search.</p>';
    }
}

// Display items in the grid
function displayItems(items, container) {
    container.innerHTML = '';
    
    items.forEach(item => {
        const card = createMovieCard(item);
        container.appendChild(card);
    });
}

// Create a movie/show card
function createMovieCard(item) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    
    const title = item.title || item.name;
    const releaseDate = item.release_date || item.first_air_date || 'N/A';
    const year = releaseDate !== 'N/A' ? releaseDate.split('-')[0] : 'N/A';
    const posterPath = item.poster_path 
        ? `${IMG_BASE_URL}${item.poster_path}` 
        : 'https://via.placeholder.com/200x300?text=No+Image';
    const rating = item.vote_average ? item.vote_average.toFixed(1) : 'N/A';

    card.innerHTML = `
        <img src="${posterPath}" alt="${title}">
        <div class="movie-info">
            <div class="movie-title">${title}</div>
            <div class="movie-year">${year}</div>
            <div class="movie-rating">⭐ ${rating}</div>
        </div>
    `;

    // Click to show details
    card.addEventListener('click', () => showDetails(item.id));

    return card;
}

// Show item details in modal
async function showDetails(id) {
    try {
        const url = `${BASE_URL}/${currentType}/${id}?api_key=${API_KEY}`;
        const response = await fetch(url);
        const item = await response.json();
        
        const title = item.title || item.name;
        const releaseDate = item.release_date || item.first_air_date || 'N/A';
        const backdropPath = item.backdrop_path 
            ? `${IMG_LARGE_URL}${item.backdrop_path}` 
            : 'https://via.placeholder.com/800x400?text=No+Image';
        const rating = item.vote_average ? item.vote_average.toFixed(1) : 'N/A';
        const overview = item.overview || 'No description available.';
        const genres = item.genres ? item.genres.map(g => g.name).join(', ') : 'N/A';
        const runtime = item.runtime ? `${item.runtime} min` : (item.number_of_seasons ? `${item.number_of_seasons} seasons` : 'N/A');

        modalBody.innerHTML = `
            <div class="modal-header" style="background-image: url('${backdropPath}')">
                <div class="modal-overlay">
                    <h2 class="modal-title">${title}</h2>
                </div>
            </div>
            <div class="modal-details">
                <div class="detail-row">
                    <div class="detail-label">Rating</div>
                    <div>⭐ ${rating}/10</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Release Date</div>
                    <div>${releaseDate}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">${currentType === 'movie' ? 'Runtime' : 'Seasons'}</div>
                    <div>${runtime}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Genres</div>
                    <div>${genres}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Overview</div>
                    <div>${overview}</div>
                </div>
            </div>
        `;

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    } catch (error) {
        console.error('Error loading details:', error);
    }
}

// Start the app when page loads
window.addEventListener('DOMContentLoaded', init);

// Prevent pull-to-refresh on mobile
let touchStartY = 0;
document.addEventListener('touchstart', function(e) {
    touchStartY = e.touches[0].clientY;
}, { passive: false });

document.addEventListener('touchmove', function(e) {
    const touchY = e.touches[0].clientY;
    const touchYDelta = touchY - touchStartY;
    
    if (touchYDelta > 0 && window.scrollY === 0) {
        e.preventDefault();
    }
}, { passive: false });
