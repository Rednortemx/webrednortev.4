import { createSocialImage } from '@/lib/socialImage';
import { getSocialPreview, SOCIAL_PREVIEWS } from '@/lib/socialPreviews';

export const revalidate = 31536000;

export async function GET(_request, { params }) {
  const { key } = await params;
  if (!Object.prototype.hasOwnProperty.call(SOCIAL_PREVIEWS, key)) {
    return new Response('Imagen no encontrada', { status: 404 });
  }

  return createSocialImage(getSocialPreview(key));
}
