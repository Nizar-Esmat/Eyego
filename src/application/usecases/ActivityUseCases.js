import UserActivity from '../../domain/entities/UserActivity.js';
import * as kafkaProducer from '../../infrastructure/kafka/KafkaProducer.js';
import * as repository from '../../infrastructure/database/UserActivityRepository.js';

async function publishActivity(data) {
  const activity = new UserActivity(data);
  await kafkaProducer.publish(process.env.KAFKA_TOPIC, {
    userId: activity.userId,
    eventType: activity.eventType,
    action: activity.action,
    metadata: activity.metadata,
    timestamp: activity.timestamp
  });
}

async function getActivities(filters, limit, offset) {
  const total = await repository.count(filters);
  const data = await repository.findAll(filters, limit, offset);
  return { data, total };
}

async function saveActivity(data) {
  const activity = new UserActivity(data);
  return await repository.save(activity);
}

export { publishActivity, getActivities, saveActivity };
