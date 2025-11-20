import { Kafka } from 'kafkajs';

let producer = null;

async function connect() {
  const kafka = new Kafka({
    clientId: process.env.KAFKA_CLIENT_ID,
    brokers: [process.env.KAFKA_BROKERS]
  });
  
  producer = kafka.producer();
  await producer.connect();
  console.log('Kafka Producer connected');
}

async function publish(topic, message) {
  await producer.send({
    topic: topic,
    messages: [{ value: JSON.stringify(message) }]
  });
  console.log('Message sent to Kafka');
}

async function disconnect() {
  if (producer) {
    await producer.disconnect();
  }
}

export { connect, publish, disconnect };
