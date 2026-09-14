import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

// Google solo muestra el favicon en los resultados de búsqueda si es
// cuadrado y de un tamaño múltiplo de 48px. El logo original es de
// 945x872, así que no cumplía y Google lo ignoraba aunque la pestaña del
// navegador sí lo mostrara. Aquí se genera un PNG cuadrado de 192x192 a
// partir del mismo logo, centrado y con un poco de aire para que no toque
// los bordes. Se genera al compilar en Vercel; el fondo queda transparente
// para que se vea igual que hasta ahora en la pestaña.

export const size = { width: 192, height: 192 };
export const contentType = 'image/png';

export default async function Icon() {
  const logo = await readFile(join(process.cwd(), 'public', 'logo.png'));
  const src = `data:image/png;base64,${logo.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img src={src} width={154} height={142} alt="" />
      </div>
    ),
    size
  );
}
