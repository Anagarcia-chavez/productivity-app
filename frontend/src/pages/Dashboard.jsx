import { Link } from 'react-router-dom';
import { buildCalendarUrl } from '../calendarConfig';
import PageWrapper from '../components/PageWrapper';
import NavCard from '../components/NavCard';

function Dashboard() {
  return (
    <PageWrapper pageKey="dashboard">
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: 160,
        backgroundColor: 'white',
        padding: '16px 20px',
        boxSizing: 'border-box',
        zIndex: 10
  }}>
</div>

      <h1 style={{ position: 'relative', zIndex: 20, textAlign: 'center', marginTop: 90 }}>Dashboard</h1>
      <Link to="/calendar" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div style={{ border: '2px solid white', borderRadius: 8, overflow: 'hidden', width: 320, margin: '20px auto', cursor: 'pointer' }}>
          <iframe
            src={buildCalendarUrl('AGENDA')}
            style={{ border: 0, width: '100%', height: 250, pointerEvents: 'none' }}
            title="Today's Events"
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
    </div>
  </PageWrapper>
  );
}

export default Dashboard;