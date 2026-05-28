import OpenAI from 'openai';

let _openrouter: OpenAI | null = null;

function getOpenRouter() {
  if (!_openrouter) {
    _openrouter = new OpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: process.env.OPENROUTER_API_KEY,
    });
  }
  return _openrouter;
}

export default getOpenRouter;

export const MODELS = {
  basic_roast: 'openai/gpt-4o-mini',
  deep_validation: 'anthropic/claude-sonnet-4',
} as const;
