import { app } from "./src/http/app";
import { env } from "./src/config/env";
import { runConsumer } from "./src/kafka/services/consumer";

app.listen({
  port: Number(env.NODE_PORT),
}, async () => {
  await runConsumer();
  console.log(`🚀 HTTP Server Running in localhost ${env.NODE_PORT} 🚀`);
});