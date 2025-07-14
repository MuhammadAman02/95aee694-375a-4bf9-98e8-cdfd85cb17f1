import { FastifyRequest, FastifyReply } from 'fastify';
import { getAIAnswer } from '../services/openai.service';
import { AppError } from '../utils/AppError';

export async function askQuestionHandler(
  req: FastifyRequest<{ Body: { question: string; model?: string } }>,
  res: FastifyReply
) {
  try {
    const { question, model } = req.body;
    const result = await getAIAnswer(question, model);
    res.status(200).send(result);
  } catch (error: any) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).send({ error: error.message });
    }
    return res.status(500).send({ error: 'Internal server error' });
  }
}