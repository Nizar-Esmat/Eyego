class EventProcessorService {
  constructor(kafkaConsumer, activityUseCases) {
    this.kafkaConsumer = kafkaConsumer;
    this.activityUseCases = activityUseCases;
  }
  
  async start() {
    await this.kafkaConsumer.subscribe(
      process.env.KAFKA_TOPIC, 
      async (message) => {
        console.log('Processing message for user:', message.userId);
        await this.activityUseCases.saveActivity(message);
        console.log('Activity saved for user:', message.userId);
      }
    );
    console.log('Event processor service started');
  }
}

export default EventProcessorService;
