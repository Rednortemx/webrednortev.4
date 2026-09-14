import { ImageResponse } from 'next/og';

export const socialImageAlt = 'Rednorte Inmobiliaria — Monterrey y Nuevo León';
export const socialImageSize = { width: 1200, height: 630 };
export const socialImageContentType = 'image/png';

export function createSocialImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: '#faf8f5',
          color: '#1a1208',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div style={{ width: 34, height: '100%', background: '#c4622d' }} />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '74px 82px 68px',
            width: '100%',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <div
              style={{
                width: 62,
                height: 62,
                borderRadius: 14,
                background: '#6b2737',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 31,
                fontWeight: 700,
              }}
            >
              R
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: 34, fontWeight: 700 }}>Rednorte Inmobiliaria</div>
              <div style={{ fontSize: 18, color: '#6b2737', letterSpacing: 3 }}>MONTERREY · NUEVO LEÓN</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 930 }}>
            <div style={{ fontSize: 64, lineHeight: 1.08, fontWeight: 700 }}>
              Compra, vende, renta e invierte en Monterrey
            </div>
            <div style={{ fontSize: 27, color: '#4a3728', marginTop: 26 }}>
              Asesoría inmobiliaria residencial, comercial e industrial
            </div>
          </div>
          <div style={{ display: 'flex', fontSize: 21, color: '#a04e22', fontWeight: 700 }}>
            rednorte.mx
          </div>
        </div>
      </div>
    ),
    socialImageSize,
  );
}
