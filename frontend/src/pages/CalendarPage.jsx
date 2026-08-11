import { Link } from 'react-router-dom';
import { buildCalendarUrl } from '../calendarConfig';
import PageWrapper from '../components/PageWrapper';

function CalendarPage() {
  return (
    <PageWrapper pageKey="calendar">
      <Link to="/" style={{ display: 'inline-block', marginBottom: 10, color: 'white' }}>← Back</Link>
      <h1 style={{ textAlign: 'center' }}>This Week</h1>
      <iframe
        src={buildCalendarUrl('WEEK')}
        style={{ border: 0, width: '100%', maxWidth: 900, height: 600, display: 'block', margin: '0 auto', borderRadius: 12 }}
        title="Weekly Calendar"
      />
    </PageWrapper>
  );
}

export default CalendarPage;