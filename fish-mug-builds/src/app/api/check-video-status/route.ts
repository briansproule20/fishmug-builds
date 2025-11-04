import { checkGeminiOperationStatus } from '../generate-video/vertex';
import { checkSoraOperationStatus } from '../generate-video/openai';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const operationData: string | undefined = body?.operationData;
    const operationName: string | undefined = body?.operationName;

    if (!operationData && !operationName) {
      return Response.json(
        { error: 'operationData or operationName is required' },
        { status: 400 }
      );
    }

    const opName = operationName || operationData!;

    // Route to appropriate handler based on operation name format
    // Sora operations have IDs that start with "sora-" or are simple strings
    // Gemini operations have names like "projects/.../operations/..."
    if (opName.includes('projects/') || opName.includes('operations/')) {
      // Gemini Veo operation
      return checkGeminiOperationStatus(opName);
    } else {
      // Assume Sora operation
      return checkSoraOperationStatus(opName);
    }
  } catch (error) {
    console.error('Error checking video status:', error);
    return Response.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
