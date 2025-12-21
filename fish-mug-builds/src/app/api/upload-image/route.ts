import { put } from '@vercel/blob';

export async function POST(req: Request) {
  try {
    const { dataUrl, filename } = await req.json();

    if (!dataUrl || typeof dataUrl !== 'string') {
      return Response.json({ error: 'dataUrl is required' }, { status: 400 });
    }

    // Extract base64 data and mime type from data URL
    const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
    if (!match) {
      return Response.json({ error: 'Invalid data URL format' }, { status: 400 });
    }

    const [, mimeType, base64Data] = match;
    const buffer = Buffer.from(base64Data, 'base64');

    // Generate filename with extension based on mime type
    const ext = mimeType.split('/')[1] || 'png';
    const name = filename || `image-${Date.now()}.${ext}`;

    const blob = await put(name, buffer, {
      access: 'public',
      contentType: mimeType,
    });

    return Response.json({ url: blob.url });
  } catch (error) {
    console.error('Blob upload error:', error);
    return Response.json(
      { error: error instanceof Error ? error.message : 'Upload failed' },
      { status: 500 }
    );
  }
}
