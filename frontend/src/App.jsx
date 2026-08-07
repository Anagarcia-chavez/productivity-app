import { useEffect, useState } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from './api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [className, setClassName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [sortMode, setSortMode] = useState('dueDate');
  const [classColors, setClassColors] = useState(() => {
    const saved = localStorage.getItem('classColors');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => { loadTasks(); }, []);
  useEffect(() => {
    localStorage.setItem('classColors', JSON.stringify(classColors));
  }, [classColors]);

  const loadTasks = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  const handleAdd = async () => {
    if (!title) return;
    await createTask({ title, class: className, dueDate: dueDate || null });
    setTitle('');
    setDueDate('');
    loadTasks();
  };

  const toggleComplete = async (task) => {
    await updateTask(task._id, { completed: !task.completed });
    loadTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    loadTasks();
  };

  const getColor = (cls) => classColors[cls] || '#888888';

  const setColor = (cls, color) => {
    setClassColors(prev => ({ ...prev, [cls]: color }));
  };

  const formatTimeLeft = (due) => {
  if (!due) return '—';
  const datePart = due.split('T')[0];
  const endOfDay = new Date(`${datePart}T23:59:59`);
  const diffMs = endOfDay - new Date();
  if (diffMs < 0) return 'Overdue';
  const hours = diffMs / (1000 * 60 * 60);
  if (hours < 24) return `${Math.floor(hours)}h left`;
  return `${Math.floor(hours / 24)}d left`;
};

  const distinctClasses = [...new Set(tasks.map(t => t.class).filter(Boolean))];

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortMode === 'class') {
      return (a.class || '').localeCompare(b.class || '');
    }
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    return new Date(a.dueDate) - new Date(b.dueDate);
  });

  return (
  <div style={{ padding: 20, fontFamily: "'Jersey 10', sans-serif", minHeight: '100vh', boxSizing: 'border-box' }}>
  <div style={{
    backgroundColor: 'rgba(255, 254, 254, 0.44)',
    borderRadius: 12,
    padding: 24,
    maxWidth: 900,
    margin: '0 auto',
    color: 'white'
  }}>
      <h1>Tasks</h1>

      <div style={{ marginBottom: 10, display: 'flex', gap: 8, alignItems: 'center' }}>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Assignment name" />
        <input value={className} onChange={e => setClassName(e.target.value)} placeholder="Class" />
        <input type="color" value={getColor(className || '')} onChange={e => setColor(className, e.target.value)} title="Pick a color for this class" />
        <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
        <button onClick={handleAdd}>Add</button>
      </div>

      {distinctClasses.length > 0 && (
        <div style={{ marginBottom: 15, fontSize: '0.9em' }}>
          <strong>Class colors: </strong>
          {distinctClasses.map(cls => (
            <span key={cls} style={{ marginRight: 12 }}>
              {cls}
              <input
                type="color"
                value={getColor(cls)}
                onChange={e => setColor(cls, e.target.value)}
                style={{ marginLeft: 4, verticalAlign: 'middle' }}
              />
            </span>
          ))}
        </div>
      )}

      <div style={{ marginBottom: 10 }}>
        <label>Sort by: </label>
        <select value={sortMode} onChange={e => setSortMode(e.target.value)}>
          <option value="dueDate">Due date</option>
          <option value="class">Class</option>
        </select>
      </div>

      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr style={{ textAlign: 'center', borderBottom: '2px solid #444' }}>
            <th style={{ padding: 8 }}>Class</th>
            <th style={{ padding: 8 }}>Assignment</th>
            <th style={{ padding: 8 }}>Due Date</th>
            <th style={{ padding: 8 }}>Time Left</th>
            <th style={{ padding: 8 }}></th>
          </tr>
        </thead>
        <tbody>
          {sortedTasks.map(t => (
            <tr key={t._id} style={{ borderBottom: '1px solid #333', textDecoration: t.completed ? 'line-through' : 'none' }}>
              <td style={{ padding: 8 }}>
                <span style={{
                  display: 'inline-block',
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  backgroundColor: getColor(t.class),
                  marginRight: 6
                }} />
                {t.class || '—'}
              </td>
              <td style={{ padding: 8, cursor: 'pointer' }} onClick={() => toggleComplete(t)}>{t.title}</td>
              <td style={{ padding: 8 }}>{t.dueDate ? new Date(t.dueDate).toLocaleDateString() : '—'}</td>
              <td style={{ padding: 8 }}>{formatTimeLeft(t.dueDate)}</td>
              <td style={{ padding: 8 }}>
                <button onClick={() => handleDelete(t._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;