/**
 * OpenAI Sora video generation handler
 */

import { getEchoToken } from '@/echo';
import { ERROR_MESSAGES } from '@/lib/constants';
import OpenAI from 'openai';

const BASE_URL = process.env.BASE_URL || 'https://echo.router.merit.systems/v1';

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

    const apiKey = await getEchoToken();
    if (!apiKey) {
      return Response.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    // Create OpenAI client pointing to Echo router
    const openai = new OpenAI({
      apiKey,
      baseURL: BASE_URL,
    });

    const createParams: OpenAI.VideoCreateParams = {
      model: model as OpenAI.VideoModel,
      prompt,
      seconds: durationSeconds.toString() as "4" | "8" | "12",
      size: '1280x720', // Default landscape
    };

    // Add image reference if provided
    if (image) {
      try {
        const base64Data = image.startsWith('data:')
          ? image.split(',')[1]
          : image;

        const buffer = Buffer.from(base64Data, 'base64');
        const blob = new Blob([buffer], { type: 'image/jpeg' });
        const file = new File([blob], 'reference.jpg', { type: 'image/jpeg' });

        createParams.input_reference = file;
      } catch (error) {
        console.error('[Sora Gen] Error processing input image:', error);
      }
    }

    console.log('[Sora Gen] Calling OpenAI SDK with params:', {
      model: createParams.model,
      promptLength: prompt.length,
      seconds: createParams.seconds,
      hasImage: !!createParams.input_reference,
    });

    const video = await openai.videos.create(createParams);
    console.log('[Sora Gen] Video created:', video.id);

    return Response.json(video);
  } catch (error) {
    console.error('[Sora Gen] ERROR:', error);

    if (error instanceof OpenAI.APIError) {
      console.error('[Sora Gen] API Error details:', {
        status: error.status,
        message: error.message,
        error: error.error,
      });

      return Response.json(
        { error: error.message },
        { status: error.status || 500 }
      );
    }

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

    const apiKey = await getEchoToken();
    if (!apiKey) {
      return Response.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    const openai = new OpenAI({
      apiKey,
      baseURL: BASE_URL,
    });

    const video = await openai.videos.retrieve(operationId);
    console.log('[Sora Status] Video status:', video.status);

    return Response.json(video);
  } catch (error) {
    console.error('[Sora Status] Error checking operation status:', error);

    if (error instanceof OpenAI.APIError) {
      return Response.json(
        { error: error.message },
        { status: error.status || 500 }
      );
    }

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
