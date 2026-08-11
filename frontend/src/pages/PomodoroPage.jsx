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
      
      <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '85vh',
      textAlign: 'center'
    }}>
        <h1 style={{ fontSize: '3em', marginBottom: 30 }}>Pomodoro</h1>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 14, marginBottom: 30 }}>
        {Object.keys(MODES).map(key => (
          <button
            key={key}
            onClick={() => switchMode(key)}
            style={{
              padding: '10px 20px',
              fontSize: '1.1em',
              backgroundColor: mode === key ? '#555' : '#222',
              color: 'white',
              border: '1px solid white',
              borderRadius: 8,
              cursor: 'pointer'
            }}
          >
            {MODES[key].label}
          </button>
        ))}
      </div>

      <div style={{ fontSize: '9em', marginBottom: 40, lineHeight: 1 }}>{formatTime(secondsLeft)}</div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
        <button onClick={() => setIsRunning(prev => !prev)} style={{ padding: '16px 32px', fontSize: '1.6em' }}>
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button onClick={reset} style={{ padding: '16px 32px', fontSize: '1.6em' }}>
          Reset
        </button>
        </div>
      </div>
    </PageWrapper>
  );
}

export default PomodoroPage;