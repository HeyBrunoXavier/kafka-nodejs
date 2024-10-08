import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";

/** API-ROUTES */
import { sendMessageRoute } from "./routes/send-message.route";
import { consumerRoute } from "./routes/consumer.route";

export const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: "*",
  methods: "*",
  allowedHeaders: "Content-Type,Authorization",
  exposedHeaders: "Authorization",
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(sendMessageRoute, {
  prefix: "v1/producer",
});

app.register(consumerRoute, {
  prefix: "v1/consumer"
})
