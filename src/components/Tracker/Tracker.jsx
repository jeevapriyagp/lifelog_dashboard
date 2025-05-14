import React, { useState, useEffect } from 'react'
import './Tracker.css'

function Tracker() 
{
  const [books, setBooks] = useState(() => {
    return JSON.parse(localStorage.getItem('books')) || []
  })

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [status, setStatus] = useState('want to read')
  const [completedDate, setCompletedDate] = useState('')
  const [progress, setProgress] = useState(0)
  const [editingIndex, setEditingIndex] = useState(null)
  const [visibleStatus, setVisibleStatus] = useState('')

  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books))
  }, [books])

  const addOrUpdateBook = () => {
    if (!title.trim() || !author.trim()) return

    const newBook = {
      title,
      author,
      status: progress === 100 ? 'read' : status,
      completedDate:
        progress === 100
          ? new Date().toISOString().split('T')[0]
          : status === 'read'
          ? completedDate
          : '',
      progress: status === 'reading' || progress > 0 ? progress : 0,
    }

    if (editingIndex !== null) 
    {
      const updated = [...books]
      updated[editingIndex] = newBook
      setBooks(updated)
      setEditingIndex(null)
    } 
    else 
    {
      setBooks([...books, newBook])
    }

    setTitle('')
    setAuthor('')
    setStatus('want to read')
    setCompletedDate('')
    setProgress(0)
  }

  const editBook = (index) => {
    const b = books[index]
    setTitle(b.title)
    setAuthor(b.author)
    setStatus(b.status)
    setCompletedDate(b.completedDate || '')
    setProgress(b.progress || 0)
    setEditingIndex(index)
  }

  const deleteBook = (index) => {
    const updated = books.filter((_, i) => i !== index)
    setBooks(updated)
  }

  const filteredBooks = books.filter((b) => b.status === visibleStatus)

  return (
    <div className="tracker-container">
      <h2>Book Tracker</h2>

      <div className="entry-bar">
        <input
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="want to read">Want to Read</option>
          <option value="reading">Reading</option>
          <option value="read">Read</option>
        </select>
        {status === 'reading' && (
          <input
            type="number"
            placeholder="Progress (%)"
            min="0"
            max="100"
            value={progress}
            onChange={(e) => {
              const val = Number(e.target.value)
              setProgress(val)
              if (val === 100) {
                setStatus('read')
                setCompletedDate(new Date().toISOString().split('T')[0])
              }
            }}
          />
        )}
        {status === 'read' && (
          <input
            type="date"
            value={completedDate}
            onChange={(e) => setCompletedDate(e.target.value)}
          />
        )}
        <button onClick={addOrUpdateBook}>
          {editingIndex !== null ? 'Update Book' : 'Add Book'}
        </button>
      </div>

      <div className="status-buttons">
        {['want to read', 'reading', 'read'].map((s) => (
          <button
            key={s}
            onClick={() => setVisibleStatus(visibleStatus === s ? '' : s)}
            className={visibleStatus === s ? 'active' : ''}
          >
            {s.toUpperCase()}
          </button>
        ))}
      </div>

      {visibleStatus && (
        <div className="book-list">
          {filteredBooks.length === 0 ? (
            <p>No books with status "{visibleStatus}"</p>
          ) : (
            <ul>
              {filteredBooks.map((book, i) => (
                <li key={i} className="book-item">
                  <div className="book-info">
                    <strong>{book.title}</strong> by {book.author}
                    {book.status === 'reading' && (
                      <div className="completed-date">
                        Progress: {book.progress || 0}%
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{ width: `${book.progress || 0}%` }}
                          />
                        </div>
                      </div>
                    )}
                    {book.status === 'read' && book.completedDate && (
                      <div className="completed-date">
                        Completed: {book.completedDate}
                      </div>
                    )}
                  </div>
                  <div className="book-actions">
                    <button onClick={() => editBook(books.indexOf(book))}>
                      Edit
                    </button>
                    <button onClick={() => deleteBook(books.indexOf(book))}>
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

export default Tracker
