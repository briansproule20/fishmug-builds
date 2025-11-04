/**
 * API Route: Generate Video
 *
 * This route demonstrates Echo SDK integration with AI video generation:
 * - Supports Gemini Veo models and OpenAI Sora models
 * - Handles text-to-video generation
 * - Returns video URLs or operation status
 */

import {
  GenerateVideoRequest,
  validateGenerateVideoRequest,
} from './validation';
import { handleGeminiGenerate } from './vertex';
import { handleSoraGenerate } from './openai';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('[API Route] Received video generation request:', {
      model: body?.model,
      promptLength: body?.prompt?.length,
      durationSeconds: body?.durationSeconds,
      generateAudio: body?.generateAudio,
      hasImage: !!body?.image,
      hasLastFrame: !!body?.lastFrame,
    });

    const validation = validateGenerateVideoRequest(body);
    if (!validation.isValid) {
      console.error('[API Route] Validation failed:', validation.error);
      return Response.json(
        { error: validation.error!.message },
        { status: validation.error!.status }
      );
    }

    const {
      prompt,
      model,
      durationSeconds = 4,
      generateAudio = false,
      image,
      lastFrame,
    } = body as GenerateVideoRequest;

    // Route to appropriate handler based on model
    if (model === 'sora-2' || model === 'sora-2-pro') {
      console.log('[API Route] Routing to Sora handler');
      return handleSoraGenerate(
        prompt,
        model,
        durationSeconds,
        generateAudio,
        image
      );
    }

    // Default to Gemini Veo models
    console.log('[API Route] Routing to Gemini Veo handler');
    return handleGeminiGenerate(
      prompt,
      model as 'veo-3.0-fast-generate-preview' | 'veo-3.0-generate-preview',
      durationSeconds,
      generateAudio,
      image,
      lastFrame
    );
  } catch (error) {
    console.error('[API Route] Video generation error:', error);

    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Video generation failed. Please try again later.',
      },
      { status: 500 }
    );
  }
}
