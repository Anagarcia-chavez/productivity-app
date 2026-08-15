import { Link } from 'react-router-dom';
import { buildCalendarUrl } from '../calendarConfig';
import { getBackground } from '../backgroundStorage';
import BackgroundPicker from '../components/BackgroundPicker';
import NavCard from '../components/NavCard';
import { useState, useEffect } from 'react';
import SpotifyCard from '../components/SpotifyCard';
import { getPlaylists, createPlaylist, deletePlaylist } from '../api';

function Dashboard() {
  const [headerImage, setHeaderImage] = useState(() => getBackground('dashboard_header'));
  const [playlists, setPlaylists] = useState([]);
  const [playlistLabel, setPlaylistLabel] = useState('');
  const [playlistUrl, setPlaylistUrl] = useState('');

  useEffect(() => { loadPlaylists(); }, []);

const loadPlaylists = async () => {
  const res = await getPlaylists();
  setPlaylists(res.data);
};

const handleAddPlaylist = async () => {
  if (!playlistLabel || !playlistUrl) return;
  await createPlaylist({ label: playlistLabel, url: playlistUrl });
  setPlaylistLabel('');
  setPlaylistUrl('');
  loadPlaylists();
};

const handleDeletePlaylist = async (id) => {
  await deletePlaylist(id);
  loadPlaylists();
};

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      backgroundImage: 'url(/grid.jpg)',
      boxSizing: 'border-box',
      fontFamily: "'Jersey 10', sans-serif"
    }}>
    
    <div style={{
      width: '100%',
      height: 250,
      position: 'relative',
      backgroundColor: headerImage ? undefined : 'white',
      backgroundImage: headerImage ? `url(${headerImage})` : undefined,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      boxSizing: 'border-box',
      zIndex: 10
    }}>
      <div style={{ position: 'absolute', top: 20, right: 20, zIndex: 30 }}>
        <BackgroundPicker pageKey="dashboard_header" onChange={setHeaderImage} />
      </div>
    </div>
      <div style={{ padding: '0 0px 20px 20px' }}>
      <h1 style={{ textAlign: 'center', margin: '20px 0' }}>Dashboard</h1>

      <Link to="/calendar" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div style={{ border: '2px solid white', borderRadius: 8, overflow: 'hidden', width: 820, margin: '30px auto', cursor: 'pointer' }}>
          <iframe
            src={buildCalendarUrl('WEEK')}
            style={{ border: 0, width: '100%', height: 600, pointerEvents: 'none' }}
            title="This Week"
          />
        </div>
      </Link>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 30,
        justifyContent: 'center',
        marginTop: 30
      }}>
        <NavCard cardKey="card_tasks" label="Tasks" to="/tasks" />
        <NavCard cardKey="card_clubs" label="Club To-Do's" to="/clubs" />
        <NavCard cardKey="card_pomodoro" label="Pomodoro" to="/pomodoro" />
        <NavCard cardKey="card_syllabus" label="Syllabus Upload" to="/syllabus" />

        <div style={{ marginTop: 40 }}>
  <h2 style={{ textAlign: 'center' }}>Playlists</h2>

  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 30, justifyContent: 'center', marginBottom: 20 }}>
    {playlists.map(p => (
      <SpotifyCard
        key={p._id}
        playlistUrl={p.url}
        label={p.label}
        onDelete={() => handleDeletePlaylist(p._id)}
      />
    ))}
  </div>

  <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
    <input value={playlistLabel} onChange={e => setPlaylistLabel(e.target.value)} placeholder="Playlist name" />
    <input value={playlistUrl} onChange={e => setPlaylistUrl(e.target.value)} placeholder="Spotify playlist link" style={{ width: 300 }} />
    <button onClick={handleAddPlaylist}>Add Playlist</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;