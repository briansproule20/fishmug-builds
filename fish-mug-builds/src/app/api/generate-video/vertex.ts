/**
 * Google Gemini Veo video generation handler
 */

import { getEchoToken } from '@/echo';
import { ERROR_MESSAGES } from '@/lib/constants';
import {
  GenerateVideosOperation,
  GenerateVideosParameters,
  GoogleGenAI,
} from '@google/genai';
/**
 * Initiates Google Veo video generation and returns operation immediately
 */
export async function handleGeminiGenerate(
  prompt: string,
  model: 'veo-3.0-fast-generate-preview' | 'veo-3.0-generate-preview',
  durationSeconds: number = 4,
  generateAudio: boolean = false,
  image?: string, // Base64 encoded image or data URL (first frame)
  lastFrame?: string // Base64 encoded image or data URL (last frame)
): Promise<Response> {
  try {
    console.log('[Video Gen] Starting video generation:', { prompt, model, durationSeconds });

    const apiKey = await getEchoToken();
    console.log('[Video Gen] Got Echo token:', apiKey ? 'Token received' : 'No token');

    if (!apiKey) {
      console.error('[Video Gen] API key not configured');
      return Response.json(
        { error: 'API key not configured - check ECHO_APP_ID env variable' },
        { status: 500 }
      );
    }

    console.log('[Video Gen] Initializing GoogleGenAI client');
    const ai = new GoogleGenAI({
      apiKey,
      vertexai: true,
      httpOptions: {
        baseUrl: 'https://echo.router.merit.systems',
        apiVersion: 'v1',
      },
    });

    console.log('[Video Gen] Creating generate params');
    const generateParams: GenerateVideosParameters = {
      model,
      prompt,
      config: {
        durationSeconds,
        enhancePrompt: true,
        personGeneration: 'allow_all',
        generateAudio,
      },
    };

    // Add image if provided
    if (image) {
      // Handle both data URLs and plain base64
      const base64Data = image.startsWith('data:')
        ? image.split(',')[1]
        : image;

      generateParams.image = {
        imageBytes: base64Data,
        mimeType: 'image/jpeg', // Default to JPEG, could be made configurable
      };
    }

    // Add lastFrame if provided (only when there are 2+ images)
    if (lastFrame) {
      // Handle both data URLs and plain base64
      const lastFrameBase64Data = lastFrame.startsWith('data:')
        ? lastFrame.split(',')[1]
        : lastFrame;

      // Ensure config exists before setting lastFrame
      if (!generateParams.config) {
        generateParams.config = {};
      }

      generateParams.config.lastFrame = {
        imageBytes: lastFrameBase64Data,
        mimeType: 'image/jpeg', // Default to JPEG, could be made configurable
      };
    }

    console.log('[Video Gen] Calling ai.models.generateVideos with params:', {
      model: generateParams.model,
      promptLength: prompt.length,
      durationSeconds: generateParams.config?.durationSeconds,
      hasImage: !!generateParams.image,
      hasLastFrame: !!generateParams.config?.lastFrame,
    });
    console.log('[Video Gen] Full generateParams:', JSON.stringify(generateParams, null, 2));

    let operation;
    try {
      operation = await ai.models.generateVideos(generateParams);
      console.log('[Video Gen] Operation created:', operation.name);
    } catch (genError: unknown) {
      console.error('[Video Gen] generateVideos FAILED:', {
        error: genError,
        errorMessage: genError instanceof Error ? genError.message : 'Unknown',
        errorString: String(genError),
        errorType: typeof genError,
        errorConstructor: genError?.constructor?.name,
      });

      // Check if it's an HTTP error from Echo
      if (genError && typeof genError === 'object' && 'message' in genError) {
        const errorObj = genError as { message?: string; code?: number; status?: string };
        console.error('[Video Gen] Parsed error details:', {
          message: errorObj.message,
          code: errorObj.code,
          status: errorObj.status,
        });
      }

      throw genError; // Re-throw to be caught by outer catch
    }

    // Return the SDK operation directly - no wrapper needed
    return Response.json(operation);
  } catch (error) {
    console.error('[Video Gen] ERROR:', error);
    console.error('[Video Gen] Error details:', {
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
 * Checks the status of a video generation operation
 * Can accept either a full operation object or just the operation name
 */
export async function checkGeminiOperationStatus(
  operationOrName: GenerateVideosOperation | string
): Promise<Response> {
  try {
    const apiKey = await getEchoToken();

    if (!apiKey) {
      return Response.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({
      apiKey,
      vertexai: true,
      httpOptions: {
        baseUrl: 'https://echo.router.merit.systems',
        apiVersion: 'v1',
      },
    });

    // Handle both operation object and operation name string
    let operation: GenerateVideosOperation;
    if (typeof operationOrName === 'string') {
      operation = new GenerateVideosOperation();
      operation.name = operationOrName;
    } else {
      operation = operationOrName;
    }

    // Use the SDK method to check operation status
    const updatedOperation = await ai.operations.getVideosOperation({
      operation: operation,
    });

    // Just return the SDK operation response directly
    return Response.json(updatedOperation);
  } catch (error) {
    console.error('Error checking operation status:', error);
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
