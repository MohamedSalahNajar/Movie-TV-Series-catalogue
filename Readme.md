# 🎬 Movie & TV Series Catalogue

A simple movie and TV series catalogue website built with HTML, CSS, and JavaScript using The Movie Database (TMDB) API.

## Features

- 🌓 **Light & Dark Mode** - Toggle between themes with a click (saves your preference)
- 🎬 Browse movies and TV shows with multiple sections:
  - 🔥 Trending Now
  - ⭐ Popular
  - 🏆 Top Rated
- 🎭 Filter by categories/genres (Action, Comedy, Drama, etc.)
- 🔍 Search for any movie or TV series
- 📊 View detailed information (ratings, release dates, overview, genres)
- 🎨 Professional design with smooth transitions
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

1. **Theme Toggle**: Click the "Light"/"Dark" button to switch between themes (your preference is saved)
2. **Movies/TV Toggle**: Switch between movies and TV shows using the navigation buttons
3. **Browse Categories**: Click on genre buttons (Action, Comedy, Drama, etc.) to filter content
4. **Multiple Sections**: Scroll through Trending, Popular, and Top Rated sections
5. **Search**: Type a movie or show name and click "Search" to find specific titles
6. **View Details**: Click on any movie/show card to see more information in a popup modal
7. **Responsive**: Works on desktop, tablet, and mobile devices

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript (ES6+)
- TMDB API

## API Information

This project uses [The Movie Database (TMDB) API](https://www.themoviedb.org/documentation/api).

### API Endpoints Used:
- Trending: `/trending/{movie|tv}/day`
- Popular: `/{movie|tv}/popular`
- Top Rated: `/{movie|tv}/top_rated`
- Genres: `/genre/{movie|tv}/list`
- Discover by genre: `/discover/{movie|tv}?with_genres={id}`
- Search: `/search/{movie|tv}`
- Details: `/{movie|tv}/{id}`

## What's Included

The website features:
- **Light & Dark Mode Toggle** with theme persistence (saves your choice)
  - Dark mode: Netflix-inspired with red accents
  - Light mode: Clean design with blue accents
- Category/genre filter buttons for easy browsing
- Three content sections: Trending, Popular, and Top Rated
- Movie/TV show cards with posters and ratings
- A search bar to find specific titles
- Smooth animations and hover effects
- A modal popup for detailed information
- Custom scrollbar styling
- Fully responsive design that works on all devices

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
