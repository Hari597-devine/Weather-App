export default function UVIndex({ value }) {
  if (value == null) return null;

  const percentage = Math.min((value / 11) * 100, 100);

  return (
    <div className="glass uv">
      <h3 className="section-title">UV Index</h3>
      <div style={{ fontSize: '32px', fontWeight: '800', color: 'var(--accent-color)', margin: '6px 0' }}>{value}</div>
      <div style={{ width: '100%', height: '6px', background: 'rgba(0,0,0,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
        <div style={{ width: `${percentage}%`, height: '100%', background: 'var(--accent-color)' }}></div>
      </div>
    </div>
  );
}