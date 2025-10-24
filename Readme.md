# 🎬 Movie & TV Series Catalogue

A fully responsive movie and TV series catalogue website built with HTML, CSS, and JavaScript using The Movie Database (TMDB) API. Works perfectly on desktop, tablet, and mobile devices!

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

1. Copy `config.example.js` to create a new file named `config.js`
2. Open `config.js` in a text editor
3. Replace `YOUR_TMDB_API_KEY_HERE` with your actual API key
4. Save the file

Example `config.js`:
```javascript
const CONFIG = {
    API_KEY: 'abc123def456ghi789jkl'
};
```

⚠️ **Important**: Never commit `config.js` to GitHub! It's already in `.gitignore` to protect your API key.

### Step 3: Run the Project

1. Open the `index.html` file in your web browser
   - You can double-click it, or
   - Right-click and choose "Open with" → your browser
2. Start browsing movies and TV shows!

## Project Structure

```
tmdb/
├── index.html           # Main HTML file
├── style.css            # Responsive styling (includes mobile @media queries)
├── script.js            # JavaScript logic
├── config.example.js    # Example config (copy to config.js)
├── config.js            # Your API key (DO NOT commit!)
├── .gitignore           # Protects config.js from Git
└── README.md            # Documentation
```

## How It Works

1. **Theme Toggle**: Click the 🌙/☀️ button to switch between themes (your preference is saved)
2. **Movies/TV Toggle**: Switch between movies and TV shows using the navigation buttons
3. **Browse Categories**: Click on genre buttons (Action, Comedy, Drama, etc.) to filter content
4. **Multiple Sections**: Scroll through Trending, Popular, and Top Rated sections
5. **Search**: Type a movie or show name and click "Search" to find specific titles
6. **View Details**: Click on any movie/show card to see more information in a popup modal
7. **Responsive**: Works on desktop, tablet, and mobile devices

## 📱 Responsive Design

The website is fully responsive and adapts to all screen sizes:

### **Desktop (> 1024px)**
- Multi-column grid layout
- Full navigation and search bar
- Hover effects and animations

### **Tablet (768px - 1024px)**
- Optimized 3-4 column grid
- Adjusted spacing and typography

### **Mobile (< 768px)**
- 2-column grid layout
- Horizontal scrolling categories
- Touch-optimized tap targets
- Sticky navigation
- Full-screen modals
- Tap feedback animations

### **Small Phones (< 480px)**
- Compact layout
- 2-column grid
- Optimized font sizes

### **Extra Small (< 375px)**
- Single column grid
- Stacked navigation

### **Landscape Mode**
- 3-column grid on mobile
- Optimized modal height

## Technologies Used

- HTML5
- CSS3 with Responsive @media queries
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
- **Fully Responsive Design** - One codebase that works on all devices:
  - Desktop, tablet, and mobile optimized
  - Touch-friendly on mobile with tap feedback
  - Horizontal scrolling categories on small screens
  - Full-screen modals on mobile devices
- Category/genre filter buttons for easy browsing
- Three content sections: Trending, Popular, and Top Rated
- Movie/TV show cards with posters and ratings
- A search bar to find specific titles
- Smooth animations and hover effects (desktop) / tap effects (mobile)
- A modal popup for detailed information
- Custom scrollbar styling

## 📲 Testing on Mobile Devices

### **Option 1: Browser DevTools**
1. Open the website in Chrome/Firefox
2. Press F12 to open DevTools
3. Click the device toggle icon (or Ctrl+Shift+M)
4. Select a mobile device from the dropdown

### **Option 2: Actual Mobile Device**
1. Host the files on a local server (e.g., Live Server extension in VS Code)
2. Get your computer's local IP address
3. Open `http://YOUR_IP:PORT/index.html` on your phone
4. Both devices must be on the same WiFi network

### **Option 3: GitHub Pages**
1. Push your code to GitHub (without config.js!)
2. Enable GitHub Pages in repository settings
3. Visit the GitHub Pages URL
4. Enter your API key when prompted (it's saved in your browser's localStorage)
5. Share the URL - visitors will need to enter their own API key

## 🚀 Deploying to GitHub Pages

This project is designed to work on GitHub Pages **without exposing your API key**:

### **How It Works:**
1. **Local Development**: Uses `config.js` (not committed to Git)
2. **GitHub Pages**: Prompts users to enter their own API key
3. **API Key Storage**: Saved in browser's localStorage (private to each user)

### **Deployment Steps:**

1. **Make sure `config.js` is NOT committed:**
   ```bash
   git status
   # config.js should NOT appear in the list
   ```

2. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Add movie catalogue website"
   git push origin main
   ```

3. **Enable GitHub Pages:**
   - Go to your repository settings
   - Click "Pages" in the left sidebar
   - Under "Source", select your branch (usually `main`)
   - Click "Save"
   - Your site will be live at: `https://username.github.io/repository-name/`

4. **First Visit:**
   - You'll see a prompt asking for your TMDB API key
   - Enter your key - it's saved securely in your browser
   - Click "Change API Key" in the footer to update it anytime

### **Sharing Your Project:**
- ✅ Anyone can use your site with their own API key
- ✅ Your API key stays private
- ✅ No server or backend needed
- ✅ 100% free hosting on GitHub Pages

## Tips for Students

- Make sure you keep your API key private (don't share it publicly)
- The API has a rate limit, so don't make too many requests too quickly
- You can customize the colors in `style.css` to make it your own
- Try adding more features like trailers, favorites list, or user ratings!
- Test the responsive design at different screen sizes using DevTools
- Use the "Change API Key" button in the footer if you need to update your key

## Troubleshooting

**Problem**: Prompt keeps asking for API key
- **Solution**: Make sure you're entering a valid TMDB API key. Get one from https://www.themoviedb.org/settings/api

**Problem**: "config.js not found" in console
- **Solution**: This is normal on GitHub Pages. The app will prompt you for an API key instead

**Problem**: Nothing loads or I see "Error loading content"
- **Solution**: 
  - Check if your API key is valid
  - Click "Change API Key" button and re-enter your key
  - Check browser console for error messages

**Problem**: Images don't show up
- **Solution**: Check your internet connection and make sure the TMDB API is working

**Problem**: API key not working after GitHub Pages deployment
- **Solution**: Clear localStorage and enter the key again. Open console and type: `localStorage.clear()` then refresh

**Problem**: Search doesn't work
- **Solution**: Make sure you're connected to the internet and have a valid API key

## License

This is a student project for educational purposes. The Movie Database (TMDB) API and data are subject to their terms of use.

---

Made with ❤️ for learning web development
