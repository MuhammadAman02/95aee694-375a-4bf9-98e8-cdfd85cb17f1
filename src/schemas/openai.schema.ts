import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

const askQuestionZod = z.object({
  question: z.string().min(1, 'Question cannot be empty').max(1000, 'Question too long'),
  model: z.enum(['gpt-3.5-turbo', 'gpt-4', 'gpt-4-turbo-preview']).optional().default('gpt-3.5-turbo'),
});

const askQuestionResponseZod = z.object({
  question: z.string(),
  answer: z.string(),
  model: z.string(),
  usage: z.object({
    prompt_tokens: z.number(),
    completion_tokens: z.number(),
    total_tokens: z.number(),
  }).optional(),
});

export const askQuestionSchema = {
  tags: ["AI"],
  body: zodToJsonSchema(askQuestionZod),
  response: {
    200: zodToJsonSchema(askQuestionResponseZod),
  },
};