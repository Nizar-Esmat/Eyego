import ActivityModel from './UserActivitySchema.js';

async function save(activity) {
  const saved = await ActivityModel.create(activity);
  return saved;
}

async function findAll(filters, limit, offset) {
  let query = {};
  
  if (filters.userId) {
    query.userId = filters.userId;
  }
  if (filters.eventType) {
    query.eventType = filters.eventType;
  }
  
  const results = await ActivityModel.find(query)
    .limit(limit)
    .skip(offset)
    .sort({ timestamp: -1 });
  
  return results;
}

async function count(filters) {
  let query = {};
  
  if (filters.userId) {
    query.userId = filters.userId;
  }
  if (filters.eventType) {
    query.eventType = filters.eventType;
  }
  
  return await ActivityModel.countDocuments(query);
}

export { save, findAll, count };
