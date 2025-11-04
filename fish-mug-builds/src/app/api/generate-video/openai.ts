/**
 * OpenAI Sora video generation handler
 */

import { openai } from '@/echo';
import { ERROR_MESSAGES } from '@/lib/constants';

/**
 * Initiates OpenAI Sora video generation
 */
export async function handleSoraGenerate(
  prompt: string,
  model: 'sora-2' | 'sora-2-pro',
  durationSeconds: number = 4,
  generateAudio: boolean = false,
  image?: string // Base64 encoded image or data URL (first frame)
): Promise<Response> {
  try {
    console.log('[Sora Gen] Starting video generation:', { prompt, model, durationSeconds });

    // Build the API request body
    const requestBody: Record<string, unknown> = {
      model,
      prompt,
      duration: durationSeconds.toString(), // API expects "4", "8", or "12"
      // Default resolution is 720x1280 (portrait)
    };

    // Add input reference image if provided
    if (image) {
      // Handle both data URLs and plain base64
      const base64Data = image.startsWith('data:')
        ? image.split(',')[1]
        : image;

      requestBody.input_reference = base64Data;
    }

    console.log('[Sora Gen] Calling OpenAI API with params:', {
      model: requestBody.model,
      promptLength: prompt.length,
      duration: requestBody.duration,
      hasImage: !!requestBody.input_reference,
    });

    // Use Echo's OpenAI client to make the request
    const response = await fetch('https://api.openai.com/v1/video/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Sora Gen] API Error:', errorText);
      throw new Error(`OpenAI API error: ${response.status} ${errorText}`);
    }

    const operation = await response.json();
    console.log('[Sora Gen] Operation created:', operation);

    // Return the operation in a format compatible with the video operations system
    return Response.json({
      name: operation.id || `sora-${Date.now()}`,
      done: false,
      operation: operation,
    });
  } catch (error) {
    console.error('[Sora Gen] ERROR:', error);
    console.error('[Sora Gen] Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      raw: error,
    });
    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : ERROR_MESSAGES.NO_VIDEO_GENERATED,
      },
      { status: 500 }
    );
  }
}

/**
 * Checks the status of a Sora video generation operation
 */
export async function checkSoraOperationStatus(
  operationId: string
): Promise<Response> {
  try {
    console.log('[Sora Status] Checking operation:', operationId);

    const response = await fetch(`https://api.openai.com/v1/video/generations/${operationId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Sora Status] API Error:', errorText);
      throw new Error(`OpenAI API error: ${response.status} ${errorText}`);
    }

    const operation = await response.json();
    console.log('[Sora Status] Operation status:', operation);

    // Transform to compatible format
    return Response.json({
      name: operation.id,
      done: operation.status === 'completed',
      operation: operation,
    });
  } catch (error) {
    console.error('[Sora Status] Error checking operation status:', error);
    return Response.json(
      {
        status: 'failed',
        error:
          error instanceof Error
            ? error.message
            : 'Failed to check operation status',
      },
      { status: 500 }
    );
  }
}
