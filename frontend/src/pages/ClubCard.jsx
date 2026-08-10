import { useEffect, useState } from 'react';
import { updateClub, getClubTasks, createClubTask, updateClubTask, deleteClubTask } from '../api';

function ClubCard({ club, onDeleteClub, onClubUpdated }) {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDue, setTaskDue] = useState('');
  const [linkLabel, setLinkLabel] = useState('');
  const [linkUrl, setLinkUrl] = useState('');

  useEffect(() => { loadTasks(); }, []);

  const loadTasks = async () => {
    const res = await getClubTasks(club._id);
    setTasks(res.data);
  };

  const handleAddTask = async () => {
    if (!taskTitle) return;
    await createClubTask({ clubId: club._id, title: taskTitle, dueDate: taskDue || null });
    setTaskTitle('');
    setTaskDue('');
    loadTasks();
  };

  const handleToggleTask = async (task) => {
    await updateClubTask(task._id, { completed: !task.completed });
    loadTasks();
  };

  const handleDeleteTask = async (id) => {
    await deleteClubTask(id);
    loadTasks();
  };

  const handleAddLink = async () => {
    if (!linkLabel || !linkUrl) return;
    const updatedLinks = [...club.links, { label: linkLabel, url: linkUrl }];
    await updateClub(club._id, { links: updatedLinks });
    setLinkLabel('');
    setLinkUrl('');
    onClubUpdated();
  };

  const handleDeleteLink = async (index) => {
    const updatedLinks = club.links.filter((_, i) => i !== index);
    await updateClub(club._id, { links: updatedLinks });
    onClubUpdated();
  };

  return (
    <div style={{ backgroundColor: 'rgba(255,255,255,0.85)', color: '#222', borderRadius: 12, padding: 16, textShadow: 'none' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>{club.name}</h2>
        <button onClick={() => onDeleteClub(club._id)}>Delete Club</button>
      </div>

      <div style={{ marginTop: 10 }}>
        <strong>Links:</strong>
        <ul style={{ paddingLeft: 18 }}>
          {club.links.map((link, i) => (
            <li key={i}>
              <a href={link.url} target="_blank" rel="noreferrer">{link.label}</a>
              <button onClick={() => handleDeleteLink(i)} style={{ marginLeft: 8 }}>x</button>
            </li>
          ))}
        </ul>
        <div style={{ display: 'flex', gap: 6 }}>
          <input value={linkLabel} onChange={e => setLinkLabel(e.target.value)} placeholder="Label (e.g. Gmail)" />
          <input value={linkUrl} onChange={e => setLinkUrl(e.target.value)} placeholder="https://..." />
          <button onClick={handleAddLink}>Add Link</button>
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <strong>To-Do's:</strong>
        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
          {tasks.map(t => (
            <li key={t._id} style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: t.completed ? 'line-through' : 'none', color: t.completed ? '#888' : '#222' }}>
              <input type="checkbox" checked={t.completed} onChange={() => handleToggleTask(t)} />
              <span>{t.title}</span>
              <span style={{ fontSize: '0.8em', color: '#666' }}>{t.dueDate ? new Date(t.dueDate).toLocaleDateString() : ''}</span>
              <button onClick={() => handleDeleteTask(t._id)}>Delete</button>
            </li>
          ))}
        </ul>
        <div style={{ display: 'flex', gap: 6 }}>
          <input value={taskTitle} onChange={e => setTaskTitle(e.target.value)} placeholder="New to-do" />
          <input type="date" value={taskDue} onChange={e => setTaskDue(e.target.value)} />
          <button onClick={handleAddTask}>Add</button>
        </div>
      </div>
    </div>
  );
}

export default ClubCard;