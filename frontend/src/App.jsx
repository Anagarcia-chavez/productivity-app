import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import TasksPage from './pages/TasksPage';
import ClubsPage from './pages/ClubsPage';
import CalendarPage from './pages/CalendarPage';
import PomodoroPage from './pages/PomodoroPage';
import SyllabusPage from './pages/SyllabusPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/clubs" element={<ClubsPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/pomodoro" element={<PomodoroPage />} />
        <Route path="/syllabus" element={<SyllabusPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;