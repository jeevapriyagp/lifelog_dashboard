# LifeLog - Personal Dashboard
LifeLog is a modular personal productivity dashboard built with React. It combines three key tools into one app:
- Book Tracker
- Finder Module (TV Show search using a public API)
- Journal Section

This project demonstrates React skills including component-based design, hooks, API integration, browser storage, and responsive UI development.

## Features
### 1. Tracker Module (Books)
- Add New Books with Title, Author, and Progress
- Edit Book Entries
- Delete Book Entries
- Automatic Completion Date (if progress is 100%)
- Book Status Filtering
- Visual Progress Bar for tracking
- Saves data in localStorage

### 2. Finder Module (TV Shows)
- Live Search with TVmaze API
- Rich Show Details, Each show displays:
    - Name
    - Poster image
    - Summary 
    - Language
    - Genres
    - Premiere date
    - Show status 
- Save Shows
- Duplicate Prevention
- Delete Saved Shows 
- Handles loading, empty results, and API errors

### 3. Journal
- Rich Text Entry with contentEditable
- Edit Existing Notes
- Auto-generated Date & Time
- LocalStorage Integration

## Tech Stack
- React (functional components + hooks)
- Vite for fast development setup
- CSS for styling
- TV Maze API for Finder module
- localStorage for data persistence

## UI Highlights
- Responsive design (mobile + desktop)
- Light/Dark mode toggle
- Clean layout using Flexbox/Grid
- Consistent and simple UI design

## Live Demo - Hosted in Vercel
https://lifelog-dashboard.vercel.app/

## Set Up Instructions
### Prerequisites
Make sure you have the following installed:
- Node.js
- npm

### Installation
1. Clone the repository
```
git clone https://github.com/jeevapriyagp/lifelog_dashboard.git
cd lifelog-dashboard
```

2. Install dependencies
```
npm install
```

### Run the Development Server
```
npm run dev
```
Then open your browser at: `http://localhost:5173` (or whatever port Vite shows in the terminal)

### Build for Production
```
npm run build
```

### Preview Production Build Locally
```
npm run preview
```
This starts a local server at http://localhost:4173 by default.

### Folder Structure
```
lifelog-dashboard
│__ public
|   |__ Lifelog-Logo.png
|
|__ src
|   |__ components
|   |   |__ Finder
|   |   |   |__ Finder.css
|   |   |   |__ Finder.jsx
|   |   |__ Journal
|   |   |   |__ Journal.css
|   |   |   |__ Journal.jsx
|   |   |__ Tracker
|   |       |__ Tracker.css
|   |       |__ Tracker.jsx
|   |__ App.css
|   |__ App.jsx
|   |__ index.css
|   |__ main.jsx   
|
|__ index.html
```

## Screenshots

### Tracker Module
![1](screenshots/Screenshot%20(136).png)
![2](screenshots/Screenshot%20(141).png)
![3](screenshots/Screenshot%20(143).png)
![4](screenshots/Screenshot%20(144).png)
![5](screenshots/Screenshot%20(145).png)
![6](screenshots/Screenshot%20(146).png)
![7](screenshots/Screenshot%20(147).png)
![8](screenshots/Screenshot%20(148).png)

### Finder Module
![1](screenshots/Screenshot%20(149).png)
![2](screenshots/Screenshot%20(150).png)
![3](screenshots/Screenshot%20(151).png)
![4](screenshots/Screenshot%20(152).png)

### Journal Module
![1](screenshots/Screenshot%20(153).png)
![2](screenshots/Screenshot%20(154).png)
![3](screenshots/Screenshot%20(155).png)


