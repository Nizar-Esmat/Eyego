import { Kafka } from 'kafkajs';

class KafkaProducer {
  constructor() {
    this.producer = null;
  }
  
  async connect() {
    const kafka = new Kafka({
      clientId: process.env.KAFKA_CLIENT_ID,
      brokers: [process.env.KAFKA_BROKERS]
    });
    
    this.producer = kafka.producer();
    await this.producer.connect();
    console.log('Kafka Producer connected');
  }
  
  async publish(topic, message) {
    await this.producer.send({
      topic: topic,
      messages: [{ value: JSON.stringify(message) }]
    });
    console.log('Message sent to Kafka');
  }
  
  async disconnect() {
    if (this.producer) {
      await this.producer.disconnect();
    }
  }
}

export default KafkaProducer;
