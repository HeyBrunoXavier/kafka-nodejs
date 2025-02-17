import kafka from "../index";

const consumer = kafka.consumer({ 
  groupId: 'consumer-group',
  sessionTimeout: 30000,
});

let isConsumerRunning = false;
const messages: { topic: string; value: string | undefined; }[] = [] ;

export async function runConsumer() {
  if (isConsumerRunning) {
    return;
  }
  
  try {
    await consumer.connect();    
    await consumer.subscribe({ topic: 'status_products', fromBeginning: true });
    await consumer.run({
      eachMessage: async ({ topic, message }) => {
        messages.push({
          topic,
          value: message.value?.toString(),
        });
      },
    });
  } catch (error) {
    console.error("Error in consumer:", error);
    await consumer.disconnect();
    isConsumerRunning = false;
  }
}

export async function getMessage(){
 return messages; 
}