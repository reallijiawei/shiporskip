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
  basic_roast: 'deepseek/deepseek-v4-pro',
  deep_validation: 'openai/gpt-5.5',
} as const;
