import { z } from "zod";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { sendMessage } from "../../kafka/services/producer";

export const sendMessageRoute: FastifyPluginAsyncZod = async (app) => {
  app.post('/',    {
    schema: {
      body: z.object({
        message: z.string()
      }),
    },
  }, async (request, reply) => {
    const { message } = request.body as { message: string };
  
    await sendMessage(message)
  
    reply.code(201).send({message: "Message sent"})
  });
};

