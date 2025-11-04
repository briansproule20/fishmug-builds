import { getEchoToken } from '@/echo';
import { GoogleGenAI } from '@google/genai';

export async function GET() {
  console.log('[Test] Starting video generation test');

  try {
    // Step 1: Check Echo token
    const apiKey = await getEchoToken();
    console.log('[Test] Step 1 - Got token:', apiKey ? 'YES' : 'NO');

    if (!apiKey) {
      return Response.json({ error: 'No API key', step: 1 }, { status: 500 });
    }

    // Step 2: Initialize client
    console.log('[Test] Step 2 - Initializing GoogleGenAI');
    const ai = new GoogleGenAI({
      apiKey,
      vertexai: true,
      httpOptions: {
        baseUrl: 'https://echo.router.merit.systems',
        apiVersion: 'v1',
      },
    });
    console.log('[Test] Step 2 - Client initialized');

    // Step 3: Try a simple generation
    console.log('[Test] Step 3 - Testing generateVideos');
    const operation = await ai.models.generateVideos({
      model: 'veo-3.0-fast-generate-preview',
      prompt: 'A cat playing with a ball',
      config: {
        durationSeconds: 4,
        enhancePrompt: true,
        personGeneration: 'allow_all',
        generateAudio: false,
        outputGcsUri: 'template-v1',
      },
    });

    console.log('[Test] Step 3 - Success! Operation:', operation.name);

    return Response.json({
      success: true,
      operationName: operation.name,
      done: operation.done,
    });
  } catch (error) {
    console.error('[Test] ERROR at some step:', {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      type: typeof error,
      keys: error && typeof error === 'object' ? Object.keys(error) : [],
    });

    return Response.json({
      error: error instanceof Error ? error.message : String(error),
      details: error && typeof error === 'object' ? JSON.stringify(error, null, 2) : undefined,
    }, { status: 500 });
  }
}
