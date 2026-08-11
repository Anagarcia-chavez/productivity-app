import { useState } from 'react';
import { getBackground } from '../backgroundStorage';
import BackgroundPicker from './BackgroundPicker';

function PageWrapper({ pageKey, children }) {
  const [bgImage, setBgImage] = useState(() => getBackground(pageKey));

  return (
    <div style={{
      padding: 20,
      fontFamily: "'Jersey 10', sans-serif",
      minHeight: '100vh',
      boxSizing: 'border-box',
      backgroundImage: bgImage ? `url(${bgImage})` : undefined,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      backgroundRepeat: 'no-repeat',
      width: '100%',
      color: 'white'
    }}>
      <div style={{ position: 'absolute', top: 20, right: 20 }}>
        <BackgroundPicker pageKey={pageKey} onChange={setBgImage} />
      </div>
      {children}
    </div>
  );
}

export default PageWrapper;