import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import TasksPage from './pages/TasksPage';
import ClubsPage from './pages/ClubsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/clubs" element={<ClubsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;