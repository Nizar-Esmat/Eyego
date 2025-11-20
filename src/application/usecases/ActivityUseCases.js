import * as kafkaProducer from '../../infrastructure/kafka/KafkaProducer.js';
import * as repository from '../../infrastructure/database/UserActivityRepository.js';

async function publishActivity(data) {
  await kafkaProducer.publish(process.env.KAFKA_TOPIC, {
    userId: data.userId,
    eventType: data.eventType,
    action: data.action,
    metadata: data.metadata,
    timestamp: data.timestamp || new Date()
  });
}

async function getActivities(filters, limit, offset) {
  const total = await repository.count(filters);
  const data = await repository.findAll(filters, limit, offset);
  return { data, total };
}

async function saveActivity(data) {
  return await repository.save(data);
}

export { publishActivity, getActivities, saveActivity };
