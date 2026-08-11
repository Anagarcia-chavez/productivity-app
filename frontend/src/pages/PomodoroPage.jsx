import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';

const MODES = {
  work: { label: 'Focus', minutes: 40 },
  short: { label: 'Short Break', minutes: 5 },
  long: { label: 'Long Break', minutes: 15 },
};

function PomodoroPage() {
  const [mode, setMode] = useState('work');
  const [secondsLeft, setSecondsLeft] = useState(MODES.work.minutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const switchMode = (newMode) => {
    setIsRunning(false);
    setMode(newMode);
    setSecondsLeft(MODES[newMode].minutes * 60);
  };

  const reset = () => {
    setIsRunning(false);
    setSecondsLeft(MODES[mode].minutes * 60);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <PageWrapper pageKey="pomodoro">
      <Link to="/" style={{ display: 'inline-block', marginBottom: 10, color: 'white' }}>← Back</Link>
      <h1>Pomodoro</h1>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 20 }}>
        {Object.keys(MODES).map(key => (
          <button
            key={key}
            onClick={() => switchMode(key)}
            style={{
              padding: '6px 12px',
              backgroundColor: mode === key ? '#555' : '#222',
              color: 'white',
              border: '1px solid white',
              borderRadius: 6,
              cursor: 'pointer'
            }}
          >
            {MODES[key].label}
          </button>
        ))}
      </div>

      <div style={{ fontSize: '5em', marginBottom: 20 }}>{formatTime(secondsLeft)}</div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
        <button onClick={() => setIsRunning(prev => !prev)} style={{ padding: '10px 20px', fontSize: '1.2em' }}>
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button onClick={reset} style={{ padding: '10px 20px', fontSize: '1.2em' }}>
          Reset
        </button>
      </div>
    </PageWrapper>
  );
}

export default PomodoroPage;