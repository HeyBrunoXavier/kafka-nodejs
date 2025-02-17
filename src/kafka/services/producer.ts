import kafka from "../index";
const producer = kafka.producer();

export async function sendMessage(message: string) {
  try {
    await producer.connect();
    const recordMetadata = await producer.send({
      topic: 'status_products',
      messages: [{ value: message }],
    });
     
    if (recordMetadata.length > 0) {
      await producer.disconnect(); 
    }
  
  } catch (error) {
    console.error("Error sending message:", error);
    throw new Error("Failed to send message to Kafka");
  }
};
