import { useState } from 'react';
import { Link } from 'react-router-dom';
import { parseSyllabus, createTask } from '../api';

function SyllabusPage() {
  const [inputMode, setInputMode] = useState('file'); // 'file' or 'text'
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const [className, setClassName] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleParse = async () => {
    setError('');
    setResult(null);
    setLoading(true);
    try {
      const formData = new FormData();
      if (inputMode === 'file' && file) {
        formData.append('file', file);
      } else if (inputMode === 'text' && text) {
        formData.append('text', text);
      } else {
        setError('Please provide a file or paste syllabus text.');
        setLoading(false);
        return;
      }
      const res = await parseSyllabus(formData);
      setResult(res.data);
    } catch (err) {
      setError('Something went wrong parsing the syllabus.');
    }
    setLoading(false);
  };

  const handleConfirmAdd = async () => {
    const finalClassName = className || result.className || 'Unnamed Class';
    for (const assignment of result.assignments) {
      await createTask({
        title: assignment.title,
        class: finalClassName,
        dueDate: assignment.dueDate || null
      });
    }
    setResult(null);
    setFile(null);
    setText('');
    alert('Tasks added!');
  };

  return (
    <div style={{ padding: 20, fontFamily: "'Jersey 10', sans-serif", minHeight: '100vh', boxSizing: 'border-box', color: 'white', textShadow: 'none' }}>
      <Link to="/" style={{ display: 'inline-block', marginBottom: 10, color: 'white' }}>← Back</Link>
      <h1 style={{ textAlign: 'center' }}>Syllabus Upload</h1>

      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 15 }}>
          <button onClick={() => setInputMode('file')} style={{ fontWeight: inputMode === 'file' ? 'bold' : 'normal' }}>Upload File</button>
          <button onClick={() => setInputMode('text')} style={{ fontWeight: inputMode === 'text' ? 'bold' : 'normal' }}>Paste Text</button>
        </div>

        <input
          value={className}
          onChange={e => setClassName(e.target.value)}
          placeholder="Class name (optional, we'll try to detect it)"
          style={{ width: '100%', marginBottom: 10, padding: 6 }}
        />

        {inputMode === 'file' ? (
          <input
            type="file"
            accept="application/pdf,image/*"
            onChange={e => setFile(e.target.files[0])}
            style={{ marginBottom: 10 }}
          />
        ) : (
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Paste syllabus text here"
            rows={8}
            style={{ width: '100%', marginBottom: 10, padding: 6 }}
          />
        )}

        <button onClick={handleParse} disabled={loading}>
          {loading ? 'Parsing...' : 'Extract Due Dates'}
        </button>

        {error && <p style={{ color: '#ff8080' }}>{error}</p>}

        {result && (
          <div style={{ backgroundColor: 'rgba(255,255,255,0.9)', color: '#222', borderRadius: 12, padding: 16, marginTop: 20 }}>
            <p><strong>Detected class:</strong> {result.className || 'Not found'}</p>
            <p><strong>Professor email:</strong> {result.professorEmail || 'Not found'}</p>
            <p><strong>Assignments found:</strong></p>
            <ul>
              {result.assignments.map((a, i) => (
                <li key={i}>{a.title} — {a.dueDate || 'no date found'}</li>
              ))}
            </ul>
            <button onClick={handleConfirmAdd}>Add These to Tasks</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SyllabusPage;