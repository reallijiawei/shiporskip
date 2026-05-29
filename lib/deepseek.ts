import OpenAI from 'openai';

let _deepseek: OpenAI | null = null;

function getDeepSeek() {
  if (!_deepseek) {
    _deepseek = new OpenAI({
      baseURL: 'https://api.deepseek.com/v1',
      apiKey: process.env.DEEPSEEK_API_KEY,
    });
  }
  return _deepseek;
}

export default getDeepSeek;

export const DEEPSEEK_MODEL = 'deepseek-v4-pro';
