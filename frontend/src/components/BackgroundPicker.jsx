import { setBackground } from '../backgroundStorage';

function BackgroundPicker({ pageKey, onChange }) {
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        setBackground(pageKey, reader.result);
        onChange(reader.result);
      } catch (err) {
        alert('This file is too large to save as a background. Try a smaller GIF (under ~1MB) or a compressed version.');
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <label style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 28,
      height: 28,
      borderRadius: '50%',
      backgroundColor: '#333',
      color: 'white',
      cursor: 'pointer',
      fontSize: '0.9em'
    }}>
      +
      <input type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
    </label>
  );
}

export default BackgroundPicker;