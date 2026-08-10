import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div style={{ padding: 20, fontFamily: "'Jersey 10', sans-serif", textAlign: 'center' }}>
      <h1>Dashboard</h1>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center', marginTop: 20 }}>
        <Link to="/tasks">Tasks</Link>
        <Link to="/clubs">Club To-Do's</Link>
      </nav>
    </div>
  );
}

export default Dashboard;