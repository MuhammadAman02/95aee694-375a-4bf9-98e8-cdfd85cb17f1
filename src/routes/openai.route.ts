import { FastifyInstance } from 'fastify';
import { askQuestionHandler } from '../controllers/openai.controller';
import { askQuestionSchema } from '../schemas/openai.schema';

export async function openaiRoutes(app: FastifyInstance) {
  app.post('/api/ai/ask', {
    schema: askQuestionSchema,
    handler: askQuestionHandler,
  });
}