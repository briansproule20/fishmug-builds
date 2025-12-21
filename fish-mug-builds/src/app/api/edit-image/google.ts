/**
 * Google Gemini image editing handler
 */

import { google } from '@/echo';
import { generateText } from 'ai';
import { getMediaTypeFromDataUrl } from '@/lib/image-utils';
import { ERROR_MESSAGES } from '@/lib/constants';

/**
 * Converts a URL to data URL format for Gemini
 */
async function urlToDataUrl(url: string): Promise<{ dataUrl: string; mediaType: string }> {
  // If it's already a data URL, extract info directly
  if (url.startsWith('data:')) {
    return {
      dataUrl: url,
      mediaType: getMediaTypeFromDataUrl(url),
    };
  }

  // Fetch from blob URL and convert to data URL
  const response = await fetch(url);
  const blob = await response.blob();
  const buffer = await blob.arrayBuffer();
  const base64 = Buffer.from(buffer).toString('base64');
  const mediaType = blob.type || 'image/png';

  return {
    dataUrl: `data:${mediaType};base64,${base64}`,
    mediaType,
  };
}

/**
 * Handles Google Gemini image editing
 */
export async function handleGoogleEdit(
  prompt: string,
  imageUrls: string[]
): Promise<Response> {
  try {
    // Convert all URLs to data URLs for Gemini
    const imageData = await Promise.all(imageUrls.map(urlToDataUrl));

    const content = [
      {
        type: 'text' as const,
        text: prompt,
      },
      ...imageData.map(({ dataUrl, mediaType }) => ({
        type: 'image' as const,
        image: dataUrl,
        mediaType,
      })),
    ];

    const result = await generateText({
      model: google('gemini-2.5-flash-image-preview'),
      prompt: [
        {
          role: 'user',
          content,
        },
      ],
    });

    const imageFile = result.files?.find(file =>
      file.mediaType?.startsWith('image/')
    );

    if (!imageFile) {
      return Response.json(
        { error: ERROR_MESSAGES.NO_EDITED_IMAGE },
        { status: 500 }
      );
    }

    return Response.json({
      imageUrl: `data:${imageFile.mediaType};base64,${imageFile.base64}`,
    });
  } catch (error) {
    console.error('Google image editing error:', error);
    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : ERROR_MESSAGES.NO_EDITED_IMAGE,
      },
      { status: 500 }
    );
  }
}
