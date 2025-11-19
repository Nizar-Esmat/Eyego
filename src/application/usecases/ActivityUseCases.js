import UserActivity from '../../domain/entities/UserActivity.js';

class ActivityUseCases {
  constructor(repository, kafkaProducer) {
    this.repository = repository;
    this.kafkaProducer = kafkaProducer;
  }
  
  async publishActivity(data) {
    const activity = new UserActivity(data);
    await this.kafkaProducer.publish(process.env.KAFKA_TOPIC, {
      userId: activity.userId,
      eventType: activity.eventType,
      action: activity.action,
      metadata: activity.metadata,
      timestamp: activity.timestamp
    });
  }
  
  async getActivities(filters, limit, offset) {
    const total = await this.repository.count(filters);
    const data = await this.repository.findAll(filters, limit, offset);
    return { data, total };
  }
  
  async saveActivity(data) {
    const activity = new UserActivity(data);
    return await this.repository.save(activity);
  }
}

export default ActivityUseCases;
