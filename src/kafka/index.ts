import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'kafka-client',
  brokers: ['localhost:9092'],
});

export default kafka;
