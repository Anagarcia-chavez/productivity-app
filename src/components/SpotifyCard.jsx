function SpotifyCard({ playlistUrl, label }) {
  const playlistId = playlistUrl.split('/playlist/')[1]?.split('?')[0];
  const embedUrl = `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 320 }}>
      <iframe
        src={embedUrl}
        width="320"
        height="152"
        style={{ borderRadius: 12, border: 'none' }}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title={label}
      />
      <span style={{
        marginTop: 8,
        fontFamily: "'Jersey 10', sans-serif",
        fontSize: '1.1em',
        color: 'white'
      }}>
        {label}
      </span>
    </div>
  );
}

export default SpotifyCard;