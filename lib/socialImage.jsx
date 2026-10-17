import { ImageResponse } from 'next/og';

export const socialImageAlt = 'Rednorte Inmobiliaria — Monterrey y Nuevo León';
export const socialImageSize = { width: 1200, height: 630 };
export const socialImageContentType = 'image/png';

export function createSocialImage(preview = {}) {
  const {
    eyebrow = 'REDNORTE INMOBILIARIA',
    title = 'Compra, vende, renta e invierte en Monterrey',
    description = 'Asesoría inmobiliaria residencial, comercial e industrial',
    accent = '#c4622d',
    panel = '#6b2737',
    mark = 'RN',
    visualLabel = 'MONTERREY · NUEVO LEÓN',
  } = preview;

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
            flex: '1 1 auto',
            minWidth: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <div
              style={{
                width: 62,
                height: 62,
                borderRadius: 14,
                background: panel,
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
              <div style={{ fontSize: 18, color: panel, letterSpacing: 3 }}>{eyebrow}</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 930 }}>
            <div style={{ fontSize: 57, lineHeight: 1.06, fontWeight: 700 }}>
              {title}
            </div>
            <div style={{ fontSize: 24, lineHeight: 1.35, color: '#4a3728', marginTop: 24 }}>
              {description}
            </div>
          </div>
          <div style={{ display: 'flex', fontSize: 21, color: accent, fontWeight: 700 }}>
            rednorte.mx
          </div>
        </div>
        <div
          style={{
            width: '34%',
            flexShrink: 0,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            background: panel,
            color: '#ffffff',
          }}
        >
          <div
            style={{
              position: 'absolute',
              width: 360,
              height: 360,
              borderRadius: 999,
              border: `2px solid ${accent}`,
              opacity: 0.55,
              top: -105,
              right: -115,
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: 230,
              height: 230,
              borderRadius: 999,
              background: accent,
              opacity: 0.18,
              bottom: -75,
              left: -60,
            }}
          />
          <div style={{ display: 'flex', fontSize: mark.length > 3 ? 58 : 86, fontWeight: 700, letterSpacing: -3 }}>
            {mark}
          </div>
          <div style={{ width: 82, height: 4, background: accent, margin: '28px 0 24px' }} />
          <div style={{ display: 'flex', maxWidth: 260, textAlign: 'center', fontSize: 17, lineHeight: 1.35, letterSpacing: 2.5 }}>
            {visualLabel}
          </div>
        </div>
      </div>
    ),
    socialImageSize,
  );
}
