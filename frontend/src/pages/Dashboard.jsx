import { Link } from 'react-router-dom';
import { buildCalendarUrl } from '../calendarConfig';

function Dashboard() {
  return (
    <div style={{ padding: 20, fontFamily: "'Jersey 10', sans-serif", textAlign: 'center' }}>
      <h1>Dashboard</h1>

      <Link to="/calendar" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div style={{ border: '2px solid white', borderRadius: 8, overflow: 'hidden', width: 320, margin: '20px auto', cursor: 'pointer' }}>
          <iframe
            src={buildCalendarUrl('AGENDA')}
            style={{ border: 0, width: '100%', height: 250, pointerEvents: 'none' }}
            title="Today's Events"
          />
        </div>
      </Link>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center', marginTop: 20 }}>
        <Link to="/tasks">Tasks</Link>
        <Link to="/clubs">Club To-Do's</Link>
      </nav>
    </div>
  );
}

export default Dashboard;