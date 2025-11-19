import IUserActivityRepository from '../../domain/repositories/IUserActivityRepository.js';
import ActivityModel from './UserActivitySchema.js';
import UserActivity from '../../domain/entities/UserActivity.js';

class UserActivityRepository extends IUserActivityRepository {
  async save(activity) {
    const data = {
      userId: activity.userId,
      eventType: activity.eventType,
      action: activity.action,
      metadata: activity.metadata,
      timestamp: activity.timestamp
    };
    
    const saved = await ActivityModel.create(data);
    return new UserActivity(saved);
  }
  
  async findAll(filters, limit, offset) {
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
    
    return results.map(function(doc) {
      return new UserActivity(doc);
    });
  }
  
  async count(filters) {
    let query = {};
    
    if (filters.userId) {
      query.userId = filters.userId;
    }
    if (filters.eventType) {
      query.eventType = filters.eventType;
    }
    
    return await ActivityModel.countDocuments(query);
  }
}

export default UserActivityRepository;
