import { Link } from 'react-router-dom';
import { buildCalendarUrl } from '../calendarConfig';

function CalendarPage() {
  return (
    <div style={{ padding: 20, fontFamily: "'Jersey 10', sans-serif", minHeight: '100vh', boxSizing: 'border-box', color: 'white' }}>
      <Link to="/" style={{ display: 'inline-block', marginBottom: 10, color: 'white' }}>← Back</Link>
      <h1 style={{ textAlign: 'center' }}>This Week</h1>
      <iframe
        src={buildCalendarUrl('WEEK')}
        style={{ border: 0, width: '100%', maxWidth: 900, height: 600, display: 'block', margin: '0 auto', borderRadius: 12 }}
        title="Weekly Calendar"
      />
    </div>
  );
}

export default CalendarPage;