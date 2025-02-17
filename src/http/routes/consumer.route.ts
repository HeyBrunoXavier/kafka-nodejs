import type { FastifyInstance } from 'fastify';
import { getMessage } from '../../kafka/services/consumer';

export async function consumerRoute(app: FastifyInstance) {
  app.get('/', async (request, reply) => {
    try {
      const messages = await getMessage();
      return reply.status(200).send({ consumedMessages: messages });
    } catch (error) {
      console.error("Error consuming messages:", error);
      return reply.status(500).send({ error: 'Failed to consume messages' });
    }
  });
}