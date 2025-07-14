import OpenAI from 'openai';
import { env } from '../config/env';
import { AppError } from '../utils/AppError';

const openai = new OpenAI({
  apiKey: env.VITE_OPENAI_API_KEY,
});

export async function getAIAnswer(question: string, model: string = 'gpt-3.5-turbo') {
  try {
    const completion = await openai.chat.completions.create({
      model,
      messages: [
        {
          role: 'user',
          content: question,
        },
      ],
      max_tokens: 1000,
      temperature: 0.7,
    });

    const answer = completion.choices[0]?.message?.content;
    
    if (!answer) {
      throw new AppError('No response received from OpenAI', 500);
    }

    return {
      question,
      answer,
      model,
      usage: completion.usage,
    };
  } catch (error: any) {
    console.error('OpenAI API Error:', error);
    
    if (error.code === 'insufficient_quota') {
      throw new AppError('OpenAI API quota exceeded', 429);
    }
    
    if (error.code === 'invalid_api_key') {
      throw new AppError('Invalid OpenAI API key', 401);
    }
    
    throw new AppError('Failed to get AI response', 500);
  }
}