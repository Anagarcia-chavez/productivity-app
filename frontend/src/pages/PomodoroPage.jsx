import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const DEFAULT_MODES = {
  work: { label: 'Focus', minutes: 25 },
  short: { label: 'Short Break', minutes: 5 },
  long: { label: 'Long Break', minutes: 15 },
};

function loadModes() {
  const saved = localStorage.getItem('pomodoroModes');
  if (saved) {
    const parsed = JSON.parse(saved);
    return {
      work: { label: 'Focus', minutes: parsed.work },
      short: { label: 'Short Break', minutes: parsed.short },
      long: { label: 'Long Break', minutes: parsed.long },
    };
  }
  return DEFAULT_MODES;
}

function PomodoroPage() {
    const [modes, setModes] = useState(loadModes());
    const [mode, setMode] = useState('work');
    const [secondsLeft, setSecondsLeft] = useState(modes.work.minutes * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [customWork, setCustomWork] = useState(modes.work.minutes);
    const [customShort, setCustomShort] = useState(modes.short.minutes);
    const [customLong, setCustomLong] = useState(modes.long.minutes);
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
    setSecondsLeft(modes[newMode].minutes * 60);
  };

  const saveSettings = () => {
  const updated = {
    work: Number(customWork),
    short: Number(customShort),
    long: Number(customLong),
  };
  localStorage.setItem('pomodoroModes', JSON.stringify(updated));
  const newModes = {
    work: { label: 'Focus', minutes: updated.work },
    short: { label: 'Short Break', minutes: updated.short },
    long: { label: 'Long Break', minutes: updated.long },
  };
  setModes(newModes);
  setIsRunning(false);
  setSecondsLeft(newModes[mode].minutes * 60);
  setShowSettings(false);
};

  const handleFile = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  if (file.size > 4 * 1024 * 1024) {
    alert('This file is large and may not save correctly. Try a smaller GIF or image if it fails.');
  }

  const reader = new FileReader();
  reader.onload = () => {
    try {
      setBackground(pageKey, reader.result);
      onChange(reader.result);
    } catch (err) {
      alert('Could not save this background, the file is likely too large for browser storage. Try a smaller file.');
    }
  };
  reader.readAsDataURL(file);
};

  const reset = () => {
    setIsRunning(false);
    setSecondsLeft(modes[mode].minutes * 60);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div style={{
        padding: 20,
        fontFamily: "'Jersey 10', sans-serif",
        minHeight: '100vh',
        boxSizing: 'border-box',
        backgroundImage: 'url(/vinyl_final.gif)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        color: 'white'
    }}>
      <Link to="/" style={{ display: 'inline-block', marginBottom: 10, color: 'white' }}>← Back</Link>
      
      <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '85vh',
      textAlign: 'center'
    }}>
        <h1 style={{ fontSize: '3em', marginBottom: 30, textShadow: '3px 3px 0 black, -3px -3px 0 black, 3px -3px 0 black, -3px 3px 0 black, 0 0 20px rgba(0,0,0,0.8)' }}>Pomodoro</h1>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 14, marginBottom: 30 }}>
        {Object.keys(modes).map(key => (
          <button
            key={key}
            onClick={() => switchMode(key)}
            style={{
              padding: '10px 20px',
              fontSize: '1.1em',
              fontFamily: "'Jersey 10', sans-serif",
              backgroundColor: mode === key ? 'rgba(226, 44, 44, 0.35)' : 'rgba(226, 44, 44, 0.35)',
              color: 'white',
              border: '1px solid white',
              borderRadius: 8,
              cursor: 'pointer'
            }}
          >
            {modes[key].label}
          </button>
        ))}
      </div>

<button
  onClick={() => setShowSettings(prev => !prev)}
  style={{
    marginBottom: 20,
    padding: '6px 14px',
    fontFamily: "'Jersey 10', sans-serif",
    backgroundColor: 'rgba(255,255,255,0.15)',
    color: 'white',
    border: '2px solid white',
    borderRadius: 20,
    cursor: 'pointer'
  }}>
  ⚙ Settings
</button>

{showSettings && (
  <div style={{
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    alignItems: 'center'
  }}>
    <div>
      <label>Focus (min): </label>
      <input type="number" value={customWork} onChange={e => setCustomWork(e.target.value)} style={{ width: 60 }} />
    </div>
    <div>
      <label>Short Break (min): </label>
      <input type="number" value={customShort} onChange={e => setCustomShort(e.target.value)} style={{ width: 60 }} />
    </div>
    <div>
      <label>Long Break (min): </label>
      <input type="number" value={customLong} onChange={e => setCustomLong(e.target.value)} style={{ width: 60 }} />
    </div>
    <button onClick={saveSettings} style={{
      padding: '8px 20px',
      fontFamily: "'Jersey 10', sans-serif",
      backgroundColor: 'rgba(255,255,255,0.25)',
      color: 'white',
      border: '2px solid white',
      borderRadius: 20,
      cursor: 'pointer'
    }}>
      Save
    </button>
  </div>
)}

      <div style={{ fontSize: '9em', marginBottom: 40, lineHeight: 1, textShadow: '3px 3px 0 black, -3px -3px 0 black, 3px -3px 0 black, -3px 3px 0 black, 0 0 20px rgba(0,0,0,0.8)' }}>{formatTime(secondsLeft)}</div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
        <button onClick={() => setIsRunning(prev => !prev)} style={{ 
            padding: '16px 32px',
            fontSize: '1.6em',
            fontFamily: "'Jersey 10', sans-serif",
            backgroundColor: 'rgba(226, 44, 44, 0.35)',
            color: 'white',
            border: '2px solid white',
            borderRadius: 20,
            cursor: 'pointer'
   }}>
    {isRunning ? 'Pause' : 'Start'}
        </button>
        <button onClick={reset} style={{ 
            padding: '16px 32px',
            fontSize: '1.6em',
            fontFamily: "'Jersey 10', sans-serif",
            backgroundColor: 'rgba(226, 44, 44, 0.35)',
            color: 'white',
            border: '2px solid white',
            borderRadius: 20,
            cursor: 'pointer'
   }}>
          Reset
        </button>
        </div>
      </div>
    </div>
  );
}

export default PomodoroPage;