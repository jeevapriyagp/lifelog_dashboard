import React, { useState, useEffect, useRef } from 'react';
import './Journal.css';

const Journal = () => {
  // States for notes, title, content, and editing index
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('journalNotes');
    return saved ? JSON.parse(saved) : [];
  });

  const [title, setTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const contentRef = useRef(null);

  // Save notes to localStorage
  useEffect(() => {
    localStorage.setItem('journalNotes', JSON.stringify(notes));
  }, [notes]);

  // Save or update a note
  const handleSave = () => {
    const content = contentRef.current.innerHTML.trim();
    const trimmedTitle = title.trim();
    if (!content || !trimmedTitle) return;

    const date = new Date().toLocaleString();
    const newNote = { title: trimmedTitle, content, date };

    if (editIndex !== null) 
    {
      const updatedNotes = [...notes];
      updatedNotes[editIndex] = newNote;
      setNotes(updatedNotes);
      setEditIndex(null);
    } 
    else 
    {
      setNotes([...notes, newNote]);
    }

    setTitle('');
    setNoteContent('');
    if (contentRef.current) contentRef.current.innerHTML = '';
  };

  // Edit a selected note
  const handleEdit = (index) => {
    setTitle(notes[index].title);
    setNoteContent(notes[index].content);
    setEditIndex(index);

    setTimeout(() => {
      if (contentRef.current) {
        contentRef.current.innerHTML = notes[index].content;
      }
    }, 0);
  };

  // Delete a selected note
  const handleDelete = (index) => {
    const updated = notes.filter((_, i) => i !== index);
    setNotes(updated);
    if (editIndex === index) {
      setTitle('');
      setNoteContent('');
      setEditIndex(null);
    }
  };

  return (
    <div className="module-box">
      <h2>My Journal</h2>

      {/* Title input */}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input-field"
      />

      {/* Content editor */}
      <div
        ref={contentRef}
        contentEditable
        className="journal-editor"
        placeholder="Write your note here..."
        onInput={(e) => setNoteContent(e.currentTarget.innerHTML)}
        suppressContentEditableWarning
        style={{ direction: 'ltr', textAlign: 'left' }} 
      />

      {/* Save button */}
      <button onClick={handleSave} className="btn btn-primary">
        {editIndex !== null ? 'Update Note' : 'Add Note'}
      </button>

      {/* Notes display */}
      <div>
        {notes.length === 0 ? (
          <p>No journal entries yet</p>
        ) : (
          notes.map((note, index) => (
            <div key={index} className="journal-note">
              <h3>{note.title}</h3>
              <div dangerouslySetInnerHTML={{ __html: note.content }} />
              <small>{note.date}</small>
              <div>
                <button onClick={() => handleEdit(index)} className="btn btn-secondary">
                  Edit
                </button>
                <button onClick={() => handleDelete(index)} className="btn btn-danger">
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Journal;
