import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 512, height: 512 };
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
          backgroundColor: '#000000',
        }}
      >
        <div
          style={{
            width: '85%',
            height: '85%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#050505',
            borderRadius: '96px',
            border: '24px solid #111111',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              fontFamily: 'system-ui, sans-serif',
              fontSize: 280,
              fontWeight: 900,
              letterSpacing: '-20px',
              transform: 'translateX(-10px) translateY(-25px)',
            }}
          >
            <span style={{ color: '#FFFFFF' }}>r</span>
            <span style={{ color: '#FFFFFF' }}>q</span>
            <span style={{ color: '#06b6d4' }}>.</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
