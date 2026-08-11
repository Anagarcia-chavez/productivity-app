import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getClubs, createClub, deleteClub, updateClub } from '../api';
import ClubCard from './ClubCard';
import PageWrapper from '../components/PageWrapper';

function ClubsPage() {
  const [clubs, setClubs] = useState([]);
  const [newClubName, setNewClubName] = useState('');

  useEffect(() => { loadClubs(); }, []);

  const loadClubs = async () => {
    const res = await getClubs();
    setClubs(res.data);
  };

  const handleAddClub = async () => {
    if (!newClubName) return;
    await createClub({ name: newClubName });
    setNewClubName('');
    loadClubs();
  };

  const handleDeleteClub = async (id) => {
    await deleteClub(id);
    loadClubs();
  };

  return (
    <PageWrapper pageKey="clubs">
      <Link to="/" style={{ display: 'inline-block', marginBottom: 10 }}>← Back</Link>
      <h1 style={{ textAlign: 'center' }}>Club To-Do's</h1>

      <div style={{ marginBottom: 20, display: 'flex', gap: 8, justifyContent: 'center' }}>
        <input value={newClubName} onChange={e => setNewClubName(e.target.value)} placeholder="New club name" />
        <button onClick={handleAddClub}>Add Club</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 700, margin: '0 auto' }}>
        {clubs.map(club => (
          <ClubCard key={club._id} club={club} onDeleteClub={handleDeleteClub} onClubUpdated={loadClubs} />
        ))}
      </div>
    </PageWrapper>
  );
}

export default ClubsPage;