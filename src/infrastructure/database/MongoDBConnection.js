import mongoose from 'mongoose';

class MongoDBConnection {
  async connect() {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');
  }
  
  async disconnect() {
    await mongoose.connection.close();
  }
}

export default MongoDBConnection;
