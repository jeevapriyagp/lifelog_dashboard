import React, { useState, useEffect } from 'react'
import './Tracker.css'

function Tracker() 
{
  // State for books and form fields
  const [books, setBooks] = useState(() => {
    return JSON.parse(localStorage.getItem('books')) || []
  })

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [status, setStatus] = useState('want to read')
  const [completedDate, setCompletedDate] = useState('')
  const [progress, setProgress] = useState('') 
  const [editingIndex, setEditingIndex] = useState(null)
  const [visibleStatus, setVisibleStatus] = useState('')

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books))
  }, [books])

  // Add or update a book entry
  const addOrUpdateBook = () => {
    if (!title.trim() || !author.trim()) return

    const progressValue = progress === '' ? 0 : Number(progress)

    const newBook = {
      title,
      author,
      status: progressValue === 100 ? 'read' : status,
      completedDate:
        progressValue === 100
          ? new Date().toISOString().split('T')[0]
          : status === 'read'
          ? completedDate
          : '',
      progress: status === 'reading' || progressValue > 0 ? progressValue : 0,
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

    // Reset form
    setTitle('')
    setAuthor('')
    setStatus('want to read')
    setCompletedDate('')
    setProgress('')
  }

  // Load book details for editing
  const editBook = (index) => {
    const b = books[index]
    setTitle(b.title)
    setAuthor(b.author)
    setStatus(b.status)
    setCompletedDate(b.completedDate || '')
    setProgress(b.progress?.toString() || '') 
    setEditingIndex(index)
  }

  // Delete book
  const deleteBook = (index) => {
    setBooks(books.filter((_, i) => i !== index))
  }

  // Filter books by status
  const filteredBooks = books.filter((b) => b.status === visibleStatus)

  return (
    <div className="module-box">
      <h2>Track your Reading</h2>

      {/* Form fields */}
      <div className="entry-bar">
        <input
          className="input-field"
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="input-field"
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <select
          className="input-field"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="want to read">Want to Read</option>
          <option value="reading">Reading</option>
          <option value="read">Read</option>
        </select>

        {/* Conditional input for progress */}
        {status === 'reading' && (
          <input
            className="input-field"
            type="number"
            placeholder="Progress (%)"
            min="0"
            max="100"
            value={progress}
            onChange={(e) => {
              const val = e.target.value
              if (val === '') {
                setProgress('')
              } else {
                const num = Number(val)
                if (!isNaN(num)) {
                  setProgress(num)
                  if (num === 100) {
                    setStatus('read')
                    setCompletedDate(new Date().toISOString().split('T')[0])
                  }
                }
              }
            }}
          />
        )}

        {/* Conditional input for date */}
        {status === 'read' && (
          <input
            className="input-field"
            type="date"
            value={completedDate}
            onChange={(e) => setCompletedDate(e.target.value)}
          />
        )}

        {/* Submit button */}
        <button className="btn btn-primary" onClick={addOrUpdateBook}>
          {editingIndex !== null ? 'Update Book' : 'Add Book'}
        </button>
      </div>

      {/* Filter buttons */}
      <div className="status-buttons">
        {['want to read', 'reading', 'read'].map((s) => (
          <button
            key={s}
            onClick={() => setVisibleStatus(visibleStatus === s ? '' : s)}
            className={`btn ${visibleStatus === s ? 'btn-secondary' : 'btn-outline'}`}
          >
            {s.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Filtered book list */}
      {visibleStatus && (
        <div className="book-list">
          {filteredBooks.length === 0 ? (
            <p class="no-books-message">No books with status "{visibleStatus}"</p>
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
                    <button className="btn btn-secondary" onClick={() => editBook(i)}>
                      Edit
                    </button>
                    <button className="btn btn-danger" onClick={() => deleteBook(i)}>
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
