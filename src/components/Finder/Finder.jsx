import React, { useState, useEffect } from 'react';
import './Finder.css';

function Finder() 
{
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [savedShows, setSavedShows] = useState(() => {
    const saved = localStorage.getItem('savedShows');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('savedShows', JSON.stringify(savedShows));
  }, [savedShows]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 1) 
    {
      fetch(`https://api.tvmaze.com/search/shows?q=${value}`)
        .then(res => res.json())
        .then(data => {
          setResults(data.map(entry => entry.show));
        });
    } 
    else 
    {
      setResults([]);
    }
  };

  const handleSave = (show) => {
    if (!savedShows.find(saved => saved.id === show.id)) {
      setSavedShows([...savedShows, show]);
    }
  };

  const handleDelete = (id) => {
    setSavedShows(savedShows.filter(show => show.id !== id));
  };

  return (
    <div className="finder">
      <h2>TV Show Finder</h2>

      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search for a show"
        className="search-input"
      />

      <div className="results">
        {results.map(show => (
          <div key={show.id} className="show-card">
            <div className="card">
              <img src={show.image?.medium || ''} alt={show.name} />
              <button
                onClick={() => handleSave(show)}
                className="save-btn"
                disabled={savedShows.some(saved => saved.id === show.id)}
              >
                {savedShows.some(saved => saved.id === show.id) ? '✓ Saved' : '☆ Save'}
              </button>
            </div>
            <div className="details-box">
              <h3>{show.name}</h3>
              <p dangerouslySetInnerHTML={{ __html: show.summary }}></p>
              <p><strong>Language:</strong> {show.language}</p>
              <p><strong>Genres:</strong> {show.genres.join(', ')}</p>
              <p><strong>Premiered:</strong> {show.premiered}</p>
              <p><strong>Status:</strong> {show.status}</p>
            </div>
          </div>
        ))}
      </div>

      {savedShows.length > 0 && (
        <div className="saved-section">
          <h3>Saved Shows</h3>
          <div className="saved-grid">
            {savedShows.map(show => (
              <div key={show.id} className="saved-card">
                <img src={show.image?.medium || ''} alt={show.name} />
                <p>{show.name}</p>
                <button
                  onClick={() => handleDelete(show.id)}
                  className="delete-btn"
                >
                  🗑 Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Finder;
