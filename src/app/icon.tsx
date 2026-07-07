import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#050505',
          color: '#FFFFFF',
          fontSize: 22,
          fontWeight: 800,
          fontFamily: 'system-ui, sans-serif',
          letterSpacing: '-2px',
          borderRadius: '4px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', transform: 'translateY(-1px)' }}>
          <span style={{ marginRight: '-2px' }}>r</span>
          <span>q</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
