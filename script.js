// TMDB API Configuration
// You need to get your own API key from https://www.themoviedb.org/settings/api
const API_KEY = '63d7f5564a0029be2192181278e04443'; // Replace with your TMDB API key
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const IMG_LARGE_URL = 'https://image.tmdb.org/t/p/original';

// Global variables
let currentType = 'movie';
let currentPage = 1;
let currentGenre = null;
let genres = [];

// DOM Elements
const navBtns = document.querySelectorAll('.nav-btn');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const themeToggle = document.getElementById('themeToggle');
const themeText = document.querySelector('.theme-text');
const categoriesList = document.getElementById('categories-list');
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

// Update theme button text
function updateThemeIcon(theme) {
    themeText.textContent = theme === 'dark' ? 'Light' : 'Dark';
}

// Setup event listeners
function setupEventListeners() {
    // Navigation buttons
    navBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            navBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentType = this.getAttribute('data-type');
            currentPage = 1;
            currentGenre = null;
            searchInput.value = '';
            contentSections.style.display = 'block';
            resultsSection.style.display = 'none';
            categorySection.style.display = 'none';
            loadGenres();
            loadAllContent();
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
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
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

// Display genres as category buttons
function displayGenres() {
    categoriesList.innerHTML = '';
    
    // Add "All" button
    const allBtn = document.createElement('button');
    allBtn.className = 'category-btn';
    allBtn.textContent = 'All';
    allBtn.addEventListener('click', () => {
        currentGenre = null;
        document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
        allBtn.classList.add('active');
        contentSections.style.display = 'block';
        categorySection.style.display = 'none';
        resultsSection.style.display = 'none';
    });
    categoriesList.appendChild(allBtn);
    
    // Add genre buttons
    genres.forEach(genre => {
        const btn = document.createElement('button');
        btn.className = 'category-btn';
        btn.textContent = genre.name;
        btn.addEventListener('click', () => {
            currentGenre = genre.id;
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            loadByCategory(genre.id, genre.name);
        });
        categoriesList.appendChild(btn);
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

// Load all content sections (trending, popular, top rated)
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
        alert('Please enter a search term!');
        return;
    }

    try {
        resultsContainer.innerHTML = '<div class="loading">Searching...</div>';
        contentSections.style.display = 'none';
        categorySection.style.display = 'none';
        resultsSection.style.display = 'block';

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
    } catch (error) {
        console.error('Error loading details:', error);
        alert('Error loading details. Please try again.');
    }
}

// Start the app when page loads
window.addEventListener('DOMContentLoaded', init);
