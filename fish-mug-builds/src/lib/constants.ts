/**
 * Application constants and error messages
 */

export const ERROR_MESSAGES = {
  GENERATION_FAILED: 'Failed to generate image',
  EDITING_FAILED: 'Failed to edit image',
  VIDEO_GENERATION_FAILED: 'Failed to generate video',
  INVALID_MODEL: 'Invalid model specified',
  MISSING_PROMPT: 'Prompt is required',
  MISSING_IMAGE: 'Image is required for editing',
  NO_IMAGE_GENERATED: 'No image was generated',
  NO_EDITED_IMAGE: 'No edited image was generated',
  NO_VIDEO_GENERATED: 'No video was generated',
  AUTH_FAILED: 'Authentication failed',
  API_ERROR: 'API request failed',
  UNKNOWN_ERROR: 'An unknown error occurred',
};

export const MODEL_NAMES = {
  openai: 'GPT Image',
  gemini: 'Gemini Flash Image',
};

export const VIDEO_MODEL_NAMES = {
  'veo-3.0-fast-generate-preview': 'Veo 3 Fast',
  'veo-3.0-generate-preview': 'Veo 3',
  'sora-2': 'Sora 2',
  'sora-2-pro': 'Sora 2 Pro',
};
