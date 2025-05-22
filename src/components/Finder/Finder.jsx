import React, { useState, useEffect } from 'react'
import './Finder.css'

function Finder() 
{
  // States for search query, results, and saved shows
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [savedShows, setSavedShows] = useState(() => {
    const saved = localStorage.getItem('savedShows')
    return saved ? JSON.parse(saved) : []
  })

  // Update localStorage when savedShows changes
  useEffect(() => {
    localStorage.setItem('savedShows', JSON.stringify(savedShows))
  }, [savedShows])

  // Handle search input and API call
  const handleSearch = (e) => {
    const value = e.target.value
    setQuery(value)

    if (value.length > 1) 
    {
      fetch(`https://api.tvmaze.com/search/shows?q=${value}`)
        .then(res => res.json())
        .then(data => {
          setResults(data.map(entry => entry.show))
        })
    } 
    else 
    {
      setResults([])
    }
  }

  // Save a show
  const handleSave = (show) => {
    if (!savedShows.find(saved => saved.id === show.id)) {
      setSavedShows([...savedShows, show])
    }
  }

  // Delete a saved show
  const handleDelete = (id) => {
    setSavedShows(savedShows.filter(show => show.id !== id))
  }

  return (
    <div className="module-box">
      <h2>Browse and Find TV Shows</h2>

      {/* Search input */}
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search for a show"
        className="input-field"
      />

      {/* Search results */}
      <div className="results">
        {results.map(show => (
          <div key={show.id} className="show-card">
            <div className="card">
              <img src={show.image?.medium || ''} alt={show.name} />
              <button
                onClick={() => handleSave(show)}
                className="btn btn-secondary"
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

      {/* Saved shows */}
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
                  className="btn btn-danger"
                >
                  🗑 Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Finder
