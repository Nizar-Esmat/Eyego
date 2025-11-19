import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  userId: { type: String, required: true },
  eventType: { type: String, required: true },
  action: { type: String, required: true },
  metadata: { type: Object, default: {} },
  timestamp: { type: Date, default: Date.now }
});

schema.index({ userId: 1, timestamp: -1 });
schema.index({ eventType: 1 });

const ActivityModel = mongoose.model('Activity', schema);

export default ActivityModel;
