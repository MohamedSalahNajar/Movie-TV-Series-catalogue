# 🎬 Movie & TV Series Catalogue

A simple movie and TV series catalogue website built with HTML, CSS, and JavaScript using The Movie Database (TMDB) API.

## Features

- 📺 Browse popular movies and TV shows
- 🔍 Search for any movie or TV series
- 📊 View detailed information (ratings, release dates, overview, genres)
- 🎨 Clean and responsive design
- ⚡ Fast and simple interface

## How to Use

### Step 1: Get a TMDB API Key

1. Go to [The Movie Database website](https://www.themoviedb.org/)
2. Create a free account (if you don't have one)
3. Go to your account settings
4. Click on "API" in the left sidebar
5. Request an API key (choose "Developer" option)
6. Fill out the form and accept the terms
7. Copy your API key

### Step 2: Add Your API Key

1. Open `script.js` file
2. Find the line that says: `const API_KEY = 'YOUR_API_KEY_HERE';`
3. Replace `YOUR_API_KEY_HERE` with your actual API key
4. Save the file

Example:
```javascript
const API_KEY = 'abc123def456ghi789jkl';
```

### Step 3: Run the Project

1. Open the `index.html` file in your web browser
   - You can double-click it, or
   - Right-click and choose "Open with" → your browser
2. Start browsing movies and TV shows!

## Project Structure

```
tmdb/
├── index.html      # Main HTML file
├── style.css       # Styling and layout
├── script.js       # JavaScript logic and API calls
└── README.md       # This file
```

## How It Works

1. **Movies/TV Toggle**: Switch between movies and TV shows using the navigation buttons
2. **Search**: Type a movie or show name and click "Search" to find specific titles
3. **View Details**: Click on any movie/show card to see more information in a popup modal
4. **Responsive**: Works on desktop, tablet, and mobile devices

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript (ES6+)
- TMDB API

## API Information

This project uses [The Movie Database (TMDB) API](https://www.themoviedb.org/documentation/api).

### API Endpoints Used:
- Popular movies: `/movie/popular`
- Popular TV shows: `/tv/popular`
- Search movies: `/search/movie`
- Search TV shows: `/search/tv`
- Movie/TV details: `/movie/{id}` or `/tv/{id}`

## Screenshots

The website includes:
- A beautiful gradient background
- Movie/TV show cards with posters and ratings
- A search bar to find specific titles
- A modal popup for detailed information
- Responsive design that works on all devices

## Tips for Students

- Make sure you keep your API key private (don't share it publicly)
- The API has a rate limit, so don't make too many requests too quickly
- You can customize the colors in `style.css` to make it your own
- Try adding more features like categories, trailers, or a favorites list!

## Troubleshooting

**Problem**: Nothing loads or I see "Error loading content"
- **Solution**: Make sure you added your API key correctly in `script.js`

**Problem**: Images don't show up
- **Solution**: Check your internet connection and make sure the TMDB API is working

**Problem**: Search doesn't work
- **Solution**: Make sure you're connected to the internet and have a valid API key

## License

This is a student project for educational purposes. The Movie Database (TMDB) API and data are subject to their terms of use.

---

Made with ❤️ for learning web development
