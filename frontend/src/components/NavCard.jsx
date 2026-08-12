import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getBackground, setBackground } from '../backgroundStorage';

function NavCard({ cardKey, label, to }) {
  const [image, setImage] = useState(() => getBackground(cardKey));

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        setBackground(cardKey, reader.result);
        setImage(reader.result);
      } catch (err) {
        alert('This image is too large to save. Try a smaller file.');
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 260 }}>
      <Link to={to} style={{ textDecoration: 'none' }}>
        <div style={{
          width: 260,
          height: 160,
          borderRadius: 14,
          border: '2px solid white',
          backgroundImage: image ? `url(${image})` : undefined,
          backgroundColor: image ? undefined : 'rgba(255,255,255,0.15)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          cursor: 'pointer',
          transition: 'transform 0.15s ease'
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <label
            onClick={e => e.stopPropagation()}
            style={{
              position: 'absolute',
              top: 8,
              right: 8,
              width: 26,
              height: 26,
              borderRadius: '50%',
              backgroundColor: 'rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '0.8em'
            }}
          >
            +
            <input type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
          </label>
        </div>
      </Link>
      <span style={{
        marginTop: 10,
        fontFamily: "'Jersey 10', sans-serif",
        fontSize: '1.3em',
        color: 'white',
        textAlign: 'center'
      }}>
        {label}
      </span>
    </div>
  );
}

export default NavCard;