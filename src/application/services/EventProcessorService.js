import * as kafkaConsumer from '../../infrastructure/kafka/KafkaConsumer.js';
import * as activityUseCases from '../usecases/ActivityUseCases.js';

async function start() {
  await kafkaConsumer.subscribe(
    process.env.KAFKA_TOPIC, 
    async (message) => {
      console.log('Processing message for user:', message.userId);
      await activityUseCases.saveActivity(message);
      console.log('Activity saved for user:', message.userId);
    }
  );
  console.log('Event processor service started');
}

export { start };
