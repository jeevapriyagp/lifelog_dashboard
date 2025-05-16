import React, { useState } from 'react';
import './Finder.css';

function Finder() 
{
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);

  const search = async () => {
    if (!query.trim()) return;
    try 
    {
      const res = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
      const data = await res.json();
      setResults(data);
      setSelected(null);
    } 
    catch (err) 
    {
      console.error('Fetch failed:', err);
    }
  };

  return (
    <div className="finder">
      <h2>TV Show Finder</h2>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search TV shows..."
      />
      <button onClick={search}>Search</button>

      <div className="results">
        {results.map((r, i) => (
          <div
            key={i}
            className="card"
            onClick={() => {
              console.log('Clicked:', r.show.name);
              setSelected(r.show);
            }}
            style={{ cursor: 'pointer' }}
          >
            <h3>{r.show.name}</h3>
            {r.show.image && (
              <img src={r.show.image.medium} alt={r.show.name} />
            )}
          </div>
        ))}
      </div>

      {selected && (
  <div className="details">
    <h2>{selected.name}</h2>

    {selected.summary && (
      <p dangerouslySetInnerHTML={{ __html: selected.summary }} />
    )}

    <p><strong>Language:</strong> {selected.language || 'N/A'}</p>
    <p><strong>Genres:</strong> {selected.genres?.join(', ') || 'N/A'}</p>
    <p><strong>Premiered:</strong> {selected.premiered || 'N/A'}</p>
    <p><strong>Status:</strong> {selected.status || 'N/A'}</p>

    <button onClick={() => setSelected(null)}>Close</button>
  </div>
)}

    </div>
  );
}

export default Finder;
