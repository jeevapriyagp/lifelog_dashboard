import React, { useState, useEffect, useRef } from 'react';

const Journal = () => {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('journalNotes');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentTitle, setCurrentTitle] = useState('');
  const [currentNote, setCurrentNote] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('journalNotes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    if (inputRef.current && currentNote !== '') {
      inputRef.current.innerHTML = currentNote;
    }
  }, [currentNote]);

  const handleSave = () => {
    const newContent = inputRef.current.innerHTML;
    if (!newContent.trim() || !currentTitle.trim()) return;

    const date = new Date().toLocaleString();

    if (editIndex !== null) 
    {
      const updated = [...notes];
      updated[editIndex] = { ...updated[editIndex], title: currentTitle, content: newContent, date };
      setNotes(updated);
      setEditIndex(null);
    } 
    else 
    {
      setNotes([...notes, { title: currentTitle, content: newContent, date }]);
    }

    setCurrentTitle('');
    setCurrentNote('');
    if (inputRef.current) inputRef.current.innerHTML = '';
  };

  const handleEdit = (index) => {
    setCurrentTitle(notes[index].title);
    setCurrentNote(notes[index].content);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updated = notes.filter((_, i) => i !== index);
    setNotes(updated);
    if (editIndex === index) 
    {
      setCurrentTitle('');
      setCurrentNote('');
      setEditIndex(null);
    }
  };

  return (
    <div>
      <h2>My Journal</h2>

      <input
        type="text"
        placeholder="Title"
        value={currentTitle}
        onChange={(e) => setCurrentTitle(e.target.value)}
      />

      <div
        ref={inputRef}
        contentEditable
        placeholder="Write your note here..."
      ></div>

      <button
        onClick={handleSave}
      >
        {editIndex !== null ? 'Update Note' : 'Add Note'}
      </button>

      <div>
        {notes.map((note, index) => (
          <div
            key={index}
          >
            <h3>{note.title}</h3>
            <div dangerouslySetInnerHTML={{ __html: note.content }} />
            <div>{note.date}</div>
            <div>
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Journal;
