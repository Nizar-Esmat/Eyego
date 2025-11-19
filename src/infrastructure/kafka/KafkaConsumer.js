import { Kafka } from 'kafkajs';

class KafkaConsumer {
  constructor() {
    this.consumer = null;
  }
  
  async connect() {
    const kafka = new Kafka({
      clientId: process.env.KAFKA_CLIENT_ID,
      brokers: [process.env.KAFKA_BROKERS]
    });
    
    this.consumer = kafka.consumer({ 
      groupId: process.env.KAFKA_CONSUMER_GROUP 
    });
    
    await this.consumer.connect();
    console.log('Kafka Consumer connected');
  }
  
  async subscribe(topic, handler) {
    await this.consumer.subscribe({ topic: topic });
    
    await this.consumer.run({
      eachMessage: async function(payload) {
        const message = JSON.parse(payload.message.value.toString());
        await handler(message);
      }
    });
    
    console.log('Consumer started');
  }
  
  async disconnect() {
    if (this.consumer) {
      await this.consumer.disconnect();
    }
  }
}

export default KafkaConsumer;
