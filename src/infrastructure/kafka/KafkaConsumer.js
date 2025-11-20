import { Kafka } from 'kafkajs';

let consumer = null;

async function connect() {
  const kafka = new Kafka({
    clientId: process.env.KAFKA_CLIENT_ID,
    brokers: [process.env.KAFKA_BROKERS]
  });
  
  consumer = kafka.consumer({ 
    groupId: process.env.KAFKA_CONSUMER_GROUP 
  });
  
  await consumer.connect();
  console.log('Kafka Consumer connected');
}

async function subscribe(topic, handler) {
  await consumer.subscribe({ topic: topic });
  
  await consumer.run({
    eachMessage: async function(payload) {
      const message = JSON.parse(payload.message.value.toString());
      await handler(message);
    }
  });
  
  console.log('Consumer started');
}

async function disconnect() {
  if (consumer) {
    await consumer.disconnect();
  }
}

export { connect, subscribe, disconnect };
