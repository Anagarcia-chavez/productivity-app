import { useState, useEffect } from 'react';
import { getBookmarks, createBookmark, deleteBookmark } from '../api';

function SidePanel() {
  const [open, setOpen] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [label, setLabel] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (open) loadBookmarks();
  }, [open]);

  const loadBookmarks = async () => {
    const res = await getBookmarks();
    setBookmarks(res.data);
  };

  const handleAdd = async () => {
    if (!label || !url) return;
    await createBookmark({ label, url });
    setLabel('');
    setUrl('');
    loadBookmarks();
  };

  const handleDelete = async (id) => {
    await deleteBookmark(id);
    loadBookmarks();
  };

  return (
    <>
      <button
        onClick={() => setOpen(prev => !prev)}
        style={{
          position: 'fixed',
          top: '50%',
          right: open ? 260 : 0,
          transform: 'translateY(-50%)',
          zIndex: 100,
          backgroundColor: '#333',
          color: 'white',
          border: 'none',
          borderRadius: '8px 0 0 8px',
          padding: '14px 8px',
          cursor: 'pointer',
          transition: 'right 0.3s ease'
        }}
      >
        {open ? '→' : '←'}
      </button>

      <div style={{
        position: 'fixed',
        top: 0,
        right: open ? 0 : -280,
        width: 260,
        height: '100vh',
        backgroundColor: '#1c1c1c',
        color: 'white',
        padding: 20,
        boxSizing: 'border-box',
        zIndex: 99,
        transition: 'right 0.3s ease',
        overflowY: 'auto',
        fontFamily: "'Jersey 10', sans-serif"
      }}>
        <h2 style={{ textAlign: 'center' }}>Links</h2>

        <ul style={{ listStyle: 'none', padding: 0 }}>
          {bookmarks.map(b => (
            <li key={b._id} style={{ marginBottom: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <a href={b.url} target="_blank" rel="noreferrer" style={{ color: 'white' }}>{b.label}</a>
              <button onClick={() => handleDelete(b._id)} style={{ marginLeft: 8 }}>x</button>
            </li>
          ))}
        </ul>

        <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <input value={label} onChange={e => setLabel(e.target.value)} placeholder="Label" />
          <input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://..." />
          <button onClick={handleAdd}>Add Link</button>
        </div>
      </div>
    </>
  );
}

export default SidePanel;